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
const ns = /*@__PURE__*/ T.XmlNamespace(
  "http://elasticloadbalancing.amazonaws.com/doc/2012-06-01/",
);
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Elastic Load Balancing",
  serviceShapeName: "ElasticLoadBalancing_v7",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "elasticloadbalancing" });
const ver = /*@__PURE__*/ T.ServiceVersion("2012-06-01");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsQuery();
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
              `https://elasticloadbalancing-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://elasticloadbalancing.${Region}.amazonaws.com`);
            }
            return e(
              `https://elasticloadbalancing-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://elasticloadbalancing.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://elasticloadbalancing.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://elasticloadbalancing.{R}.{D}","properties":{},"headers":{}}');

export class AccessPointNotFoundException
  extends /*@__PURE__*/ S.TaggedError<AccessPointNotFoundException>()(
    "AccessPointNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "LoadBalancerNotFound", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class CertificateNotFoundException
  extends /*@__PURE__*/ S.TaggedError<CertificateNotFoundException>()(
    "CertificateNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "CertificateNotFound", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DependencyThrottleException
  extends /*@__PURE__*/ S.TaggedError<DependencyThrottleException>()(
    "DependencyThrottleException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DependencyThrottle", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DuplicateAccessPointNameException
  extends /*@__PURE__*/ S.TaggedError<DuplicateAccessPointNameException>()(
    "DuplicateAccessPointNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DuplicateLoadBalancerName", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DuplicateListenerException
  extends /*@__PURE__*/ S.TaggedError<DuplicateListenerException>()(
    "DuplicateListenerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DuplicateListener", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DuplicatePolicyNameException
  extends /*@__PURE__*/ S.TaggedError<DuplicatePolicyNameException>()(
    "DuplicatePolicyNameException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DuplicatePolicyName", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class DuplicateTagKeysException
  extends /*@__PURE__*/ S.TaggedError<DuplicateTagKeysException>()(
    "DuplicateTagKeysException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "DuplicateTagKeys", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidConfigurationRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidConfigurationRequestException>()(
    "InvalidConfigurationRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidConfigurationRequest", httpResponseCode: 409 }),
      /*@__PURE__*/ T.HttpError(409),
    ),
  ).pipe(C.withConflictError) {}
export class InvalidEndPointException
  extends /*@__PURE__*/ S.TaggedError<InvalidEndPointException>()(
    "InvalidEndPointException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidInstance", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSchemeException
  extends /*@__PURE__*/ S.TaggedError<InvalidSchemeException>()(
    "InvalidSchemeException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidScheme", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSecurityGroupException
  extends /*@__PURE__*/ S.TaggedError<InvalidSecurityGroupException>()(
    "InvalidSecurityGroupException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidSecurityGroup", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class InvalidSubnetException
  extends /*@__PURE__*/ S.TaggedError<InvalidSubnetException>()(
    "InvalidSubnetException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "InvalidSubnet", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class ListenerNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ListenerNotFoundException>()(
    "ListenerNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "ListenerNotFound", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class LoadBalancerAttributeNotFoundException
  extends /*@__PURE__*/ S.TaggedError<LoadBalancerAttributeNotFoundException>()(
    "LoadBalancerAttributeNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({
        code: "LoadBalancerAttributeNotFound",
        httpResponseCode: 400,
      }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class OperationNotPermittedException
  extends /*@__PURE__*/ S.TaggedError<OperationNotPermittedException>()(
    "OperationNotPermittedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "OperationNotPermitted", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class PolicyNotFoundException
  extends /*@__PURE__*/ S.TaggedError<PolicyNotFoundException>()(
    "PolicyNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "PolicyNotFound", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class PolicyTypeNotFoundException
  extends /*@__PURE__*/ S.TaggedError<PolicyTypeNotFoundException>()(
    "PolicyTypeNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "PolicyTypeNotFound", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class SubnetNotFoundException
  extends /*@__PURE__*/ S.TaggedError<SubnetNotFoundException>()(
    "SubnetNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "SubnetNotFound", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyAccessPointsException
  extends /*@__PURE__*/ S.TaggedError<TooManyAccessPointsException>()(
    "TooManyAccessPointsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TooManyLoadBalancers", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyPoliciesException
  extends /*@__PURE__*/ S.TaggedError<TooManyPoliciesException>()(
    "TooManyPoliciesException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TooManyPolicies", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "TooManyTags", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export class UnsupportedProtocolException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedProtocolException>()(
    "UnsupportedProtocolException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.AwsQueryError({ code: "UnsupportedProtocol", httpResponseCode: 400 }),
      /*@__PURE__*/ T.HttpError(400),
    ),
  ).pipe(C.withBadRequestError) {}
export type AccessPointName = string;
export type LoadBalancerNames = string[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value?: string;
}
export type TagList = Tag[];
export interface AddTagsInput {
  LoadBalancerNames: string[];
  Tags: Tag[];
}
export interface AddTagsOutput {}
export type SecurityGroupId = string;
export type SecurityGroups = string[];
export interface ApplySecurityGroupsToLoadBalancerInput {
  LoadBalancerName: string;
  SecurityGroups: string[];
}
export interface ApplySecurityGroupsToLoadBalancerOutput {
  SecurityGroups?: string[];
}
export type SubnetId = string;
export type Subnets = string[];
export interface AttachLoadBalancerToSubnetsInput {
  LoadBalancerName: string;
  Subnets: string[];
}
export interface AttachLoadBalancerToSubnetsOutput {
  Subnets?: string[];
}
export type HealthCheckTarget = string;
export type HealthCheckInterval = number;
export type HealthCheckTimeout = number;
export type UnhealthyThreshold = number;
export type HealthyThreshold = number;
export interface HealthCheck {
  Target: string;
  Interval: number;
  Timeout: number;
  UnhealthyThreshold: number;
  HealthyThreshold: number;
}
export interface ConfigureHealthCheckInput {
  LoadBalancerName: string;
  HealthCheck: HealthCheck;
}
export interface ConfigureHealthCheckOutput {
  HealthCheck?: HealthCheck;
}
export type PolicyName = string;
export type CookieName = string;
export interface CreateAppCookieStickinessPolicyInput {
  LoadBalancerName: string;
  PolicyName: string;
  CookieName: string;
}
export interface CreateAppCookieStickinessPolicyOutput {}
export type CookieExpirationPeriod = number;
export interface CreateLBCookieStickinessPolicyInput {
  LoadBalancerName: string;
  PolicyName: string;
  CookieExpirationPeriod?: number;
}
export interface CreateLBCookieStickinessPolicyOutput {}
export type Protocol = string;
export type AccessPointPort = number;
export type InstancePort = number;
export type SSLCertificateId = string;
export interface Listener {
  Protocol: string;
  LoadBalancerPort: number;
  InstanceProtocol?: string;
  InstancePort: number;
  SSLCertificateId?: string;
}
export type Listeners = Listener[];
export type AvailabilityZone = string;
export type AvailabilityZones = string[];
export type LoadBalancerScheme = string;
export interface CreateAccessPointInput {
  LoadBalancerName: string;
  Listeners: Listener[];
  AvailabilityZones?: string[];
  Subnets?: string[];
  SecurityGroups?: string[];
  Scheme?: string;
  Tags?: Tag[];
}
export type DNSName = string;
export interface CreateAccessPointOutput {
  DNSName?: string;
}
export interface CreateLoadBalancerListenerInput {
  LoadBalancerName: string;
  Listeners: Listener[];
}
export interface CreateLoadBalancerListenerOutput {}
export type PolicyTypeName = string;
export type AttributeName = string;
export type AttributeValue = string;
export interface PolicyAttribute {
  AttributeName?: string;
  AttributeValue?: string;
}
export type PolicyAttributes = PolicyAttribute[];
export interface CreateLoadBalancerPolicyInput {
  LoadBalancerName: string;
  PolicyName: string;
  PolicyTypeName: string;
  PolicyAttributes?: PolicyAttribute[];
}
export interface CreateLoadBalancerPolicyOutput {}
export interface DeleteAccessPointInput {
  LoadBalancerName: string;
}
export interface DeleteAccessPointOutput {}
export type Ports = number[];
export interface DeleteLoadBalancerListenerInput {
  LoadBalancerName: string;
  LoadBalancerPorts: number[];
}
export interface DeleteLoadBalancerListenerOutput {}
export interface DeleteLoadBalancerPolicyInput {
  LoadBalancerName: string;
  PolicyName: string;
}
export interface DeleteLoadBalancerPolicyOutput {}
export type InstanceId = string;
export interface Instance {
  InstanceId?: string;
}
export type Instances = Instance[];
export interface DeregisterEndPointsInput {
  LoadBalancerName: string;
  Instances: Instance[];
}
export interface DeregisterEndPointsOutput {
  Instances?: Instance[];
}
export type Marker = string;
export type PageSize = number;
export interface DescribeAccountLimitsInput {
  Marker?: string;
  PageSize?: number;
}
export type Name = string;
export type Max = string;
export interface Limit {
  Name?: string;
  Max?: string;
}
export type Limits = Limit[];
export interface DescribeAccountLimitsOutput {
  Limits?: Limit[];
  NextMarker?: string;
}
export interface DescribeEndPointStateInput {
  LoadBalancerName: string;
  Instances?: Instance[];
}
export type State = string;
export type ReasonCode = string;
export type Description = string;
export interface InstanceState {
  InstanceId?: string;
  State?: string;
  ReasonCode?: string;
  Description?: string;
}
export type InstanceStates = InstanceState[];
export interface DescribeEndPointStateOutput {
  InstanceStates?: InstanceState[];
}
export interface DescribeLoadBalancerAttributesInput {
  LoadBalancerName: string;
}
export type CrossZoneLoadBalancingEnabled = boolean;
export interface CrossZoneLoadBalancing {
  Enabled: boolean;
}
export type AccessLogEnabled = boolean;
export type S3BucketName = string;
export type AccessLogInterval = number;
export type AccessLogPrefix = string;
export interface AccessLog {
  Enabled: boolean;
  S3BucketName?: string;
  EmitInterval?: number;
  S3BucketPrefix?: string;
}
export type ConnectionDrainingEnabled = boolean;
export type ConnectionDrainingTimeout = number;
export interface ConnectionDraining {
  Enabled: boolean;
  Timeout?: number;
}
export type IdleTimeout = number;
export interface ConnectionSettings {
  IdleTimeout: number;
}
export type AdditionalAttributeKey = string;
export type AdditionalAttributeValue = string;
export interface AdditionalAttribute {
  Key?: string;
  Value?: string;
}
export type AdditionalAttributes = AdditionalAttribute[];
export interface LoadBalancerAttributes {
  CrossZoneLoadBalancing?: CrossZoneLoadBalancing;
  AccessLog?: AccessLog;
  ConnectionDraining?: ConnectionDraining;
  ConnectionSettings?: ConnectionSettings;
  AdditionalAttributes?: AdditionalAttribute[];
}
export interface DescribeLoadBalancerAttributesOutput {
  LoadBalancerAttributes?: LoadBalancerAttributes;
}
export type PolicyNames = string[];
export interface DescribeLoadBalancerPoliciesInput {
  LoadBalancerName?: string;
  PolicyNames?: string[];
}
export interface PolicyAttributeDescription {
  AttributeName?: string;
  AttributeValue?: string;
}
export type PolicyAttributeDescriptions = PolicyAttributeDescription[];
export interface PolicyDescription {
  PolicyName?: string;
  PolicyTypeName?: string;
  PolicyAttributeDescriptions?: PolicyAttributeDescription[];
}
export type PolicyDescriptions = PolicyDescription[];
export interface DescribeLoadBalancerPoliciesOutput {
  PolicyDescriptions?: PolicyDescription[];
}
export type PolicyTypeNames = string[];
export interface DescribeLoadBalancerPolicyTypesInput {
  PolicyTypeNames?: string[];
}
export type AttributeType = string;
export type DefaultValue = string;
export type Cardinality = string;
export interface PolicyAttributeTypeDescription {
  AttributeName?: string;
  AttributeType?: string;
  Description?: string;
  DefaultValue?: string;
  Cardinality?: string;
}
export type PolicyAttributeTypeDescriptions = PolicyAttributeTypeDescription[];
export interface PolicyTypeDescription {
  PolicyTypeName?: string;
  Description?: string;
  PolicyAttributeTypeDescriptions?: PolicyAttributeTypeDescription[];
}
export type PolicyTypeDescriptions = PolicyTypeDescription[];
export interface DescribeLoadBalancerPolicyTypesOutput {
  PolicyTypeDescriptions?: PolicyTypeDescription[];
}
export interface DescribeAccessPointsInput {
  LoadBalancerNames?: string[];
  Marker?: string;
  PageSize?: number;
}
export interface ListenerDescription {
  Listener?: Listener;
  PolicyNames?: string[];
}
export type ListenerDescriptions = ListenerDescription[];
export interface AppCookieStickinessPolicy {
  PolicyName?: string;
  CookieName?: string;
}
export type AppCookieStickinessPolicies = AppCookieStickinessPolicy[];
export interface LBCookieStickinessPolicy {
  PolicyName?: string;
  CookieExpirationPeriod?: number;
}
export type LBCookieStickinessPolicies = LBCookieStickinessPolicy[];
export interface Policies {
  AppCookieStickinessPolicies?: AppCookieStickinessPolicy[];
  LBCookieStickinessPolicies?: LBCookieStickinessPolicy[];
  OtherPolicies?: string[];
}
export interface BackendServerDescription {
  InstancePort?: number;
  PolicyNames?: string[];
}
export type BackendServerDescriptions = BackendServerDescription[];
export type VPCId = string;
export type SecurityGroupOwnerAlias = string;
export type SecurityGroupName = string;
export interface SourceSecurityGroup {
  OwnerAlias?: string;
  GroupName?: string;
}
export type CreatedTime = Date;
export interface LoadBalancerDescription {
  LoadBalancerName?: string;
  DNSName?: string;
  CanonicalHostedZoneName?: string;
  CanonicalHostedZoneNameID?: string;
  ListenerDescriptions?: ListenerDescription[];
  Policies?: Policies;
  BackendServerDescriptions?: BackendServerDescription[];
  AvailabilityZones?: string[];
  Subnets?: string[];
  VPCId?: string;
  Instances?: Instance[];
  HealthCheck?: HealthCheck;
  SourceSecurityGroup?: SourceSecurityGroup;
  SecurityGroups?: string[];
  CreatedTime?: Date;
  Scheme?: string;
}
export type LoadBalancerDescriptions = LoadBalancerDescription[];
export interface DescribeAccessPointsOutput {
  LoadBalancerDescriptions?: LoadBalancerDescription[];
  NextMarker?: string;
}
export type LoadBalancerNamesMax20 = string[];
export interface DescribeTagsInput {
  LoadBalancerNames: string[];
}
export interface TagDescription {
  LoadBalancerName?: string;
  Tags?: Tag[];
}
export type TagDescriptions = TagDescription[];
export interface DescribeTagsOutput {
  TagDescriptions?: TagDescription[];
}
export interface DetachLoadBalancerFromSubnetsInput {
  LoadBalancerName: string;
  Subnets: string[];
}
export interface DetachLoadBalancerFromSubnetsOutput {
  Subnets?: string[];
}
export interface RemoveAvailabilityZonesInput {
  LoadBalancerName: string;
  AvailabilityZones: string[];
}
export interface RemoveAvailabilityZonesOutput {
  AvailabilityZones?: string[];
}
export interface AddAvailabilityZonesInput {
  LoadBalancerName: string;
  AvailabilityZones: string[];
}
export interface AddAvailabilityZonesOutput {
  AvailabilityZones?: string[];
}
export interface ModifyLoadBalancerAttributesInput {
  LoadBalancerName: string;
  LoadBalancerAttributes: LoadBalancerAttributes;
}
export interface ModifyLoadBalancerAttributesOutput {
  LoadBalancerName?: string;
  LoadBalancerAttributes?: LoadBalancerAttributes;
}
export interface RegisterEndPointsInput {
  LoadBalancerName: string;
  Instances: Instance[];
}
export interface RegisterEndPointsOutput {
  Instances?: Instance[];
}
export interface TagKeyOnly {
  Key?: string;
}
export type TagKeyList = TagKeyOnly[];
export interface RemoveTagsInput {
  LoadBalancerNames: string[];
  Tags: TagKeyOnly[];
}
export interface RemoveTagsOutput {}
export interface SetLoadBalancerListenerSSLCertificateInput {
  LoadBalancerName: string;
  LoadBalancerPort: number;
  SSLCertificateId: string;
}
export interface SetLoadBalancerListenerSSLCertificateOutput {}
export type EndPointPort = number;
export interface SetLoadBalancerPoliciesForBackendServerInput {
  LoadBalancerName: string;
  InstancePort: number;
  PolicyNames: string[];
}
export interface SetLoadBalancerPoliciesForBackendServerOutput {}
export interface SetLoadBalancerPoliciesOfListenerInput {
  LoadBalancerName: string;
  LoadBalancerPort: number;
  PolicyNames: string[];
}
export interface SetLoadBalancerPoliciesOfListenerOutput {}
export type ErrorDescription = string;
export type AddTagsError =
  | AccessPointNotFoundException
  | DuplicateTagKeysException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds the specified tags to the specified load balancer. Each load balancer can have a maximum of 10 tags.
 *
 * Each tag consists of a key and an optional value. If a tag with the same key is already associated
 * with the load balancer, `AddTags` updates its value.
 *
 * For more information, see Tag Your Classic Load Balancer
 * in the *Classic Load Balancers Guide*.
 */
export const addTags: API.OperationMethod<
  AddTagsInput,
  AddTagsOutput,
  AddTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AddTagsInput>,
  output: __S(1, __c0, 1) as any as S.Schema<AddTagsOutput>,
  errors: [AccessPointNotFoundException, DuplicateTagKeysException, TooManyTagsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTags",
}));

export type ApplySecurityGroupsToLoadBalancerError =
  | AccessPointNotFoundException
  | InvalidConfigurationRequestException
  | InvalidSecurityGroupException
  | CommonErrors;
/**
 * Associates one or more security groups with your load balancer in a virtual private cloud (VPC). The specified security groups override the previously associated security groups.
 *
 * For more information, see Security Groups for Load Balancers in a VPC
 * in the *Classic Load Balancers Guide*.
 */
export const applySecurityGroupsToLoadBalancer: API.OperationMethod<
  ApplySecurityGroupsToLoadBalancerInput,
  ApplySecurityGroupsToLoadBalancerOutput,
  ApplySecurityGroupsToLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<ApplySecurityGroupsToLoadBalancerInput>,
  output: __S(49, __c3, 1) as any as S.Schema<ApplySecurityGroupsToLoadBalancerOutput>,
  errors: [
    AccessPointNotFoundException,
    InvalidConfigurationRequestException,
    InvalidSecurityGroupException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApplySecurityGroupsToLoadBalancer",
}));

export type AttachLoadBalancerToSubnetsError =
  | AccessPointNotFoundException
  | InvalidConfigurationRequestException
  | InvalidSubnetException
  | SubnetNotFoundException
  | CommonErrors;
/**
 * Adds one or more subnets to the set of configured subnets for the specified load balancer.
 *
 * The load balancer evenly distributes requests across all registered subnets.
 * For more information, see Add or Remove Subnets for Your Load Balancer in a VPC
 * in the *Classic Load Balancers Guide*.
 */
export const attachLoadBalancerToSubnets: API.OperationMethod<
  AttachLoadBalancerToSubnetsInput,
  AttachLoadBalancerToSubnetsOutput,
  AttachLoadBalancerToSubnetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<AttachLoadBalancerToSubnetsInput>,
  output: __S(81, __c5, 1) as any as S.Schema<AttachLoadBalancerToSubnetsOutput>,
  errors: [
    AccessPointNotFoundException,
    InvalidConfigurationRequestException,
    InvalidSubnetException,
    SubnetNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachLoadBalancerToSubnets",
}));

export type ConfigureHealthCheckError = AccessPointNotFoundException | CommonErrors;
/**
 * Specifies the health check settings to use when evaluating the health state of your EC2 instances.
 *
 * For more information, see Configure Health Checks for Your Load Balancer
 * in the *Classic Load Balancers Guide*.
 */
export const configureHealthCheck: API.OperationMethod<
  ConfigureHealthCheckInput,
  ConfigureHealthCheckOutput,
  ConfigureHealthCheckError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<ConfigureHealthCheckInput>,
  output: __S(113, __c7, 1) as any as S.Schema<ConfigureHealthCheckOutput>,
  errors: [AccessPointNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfigureHealthCheck",
}));

export type CreateAppCookieStickinessPolicyError =
  | AccessPointNotFoundException
  | DuplicatePolicyNameException
  | InvalidConfigurationRequestException
  | TooManyPoliciesException
  | CommonErrors;
/**
 * Generates a stickiness policy with sticky session lifetimes that follow that of an application-generated cookie. This policy can be associated only with HTTP/HTTPS listeners.
 *
 * This policy is similar to the policy created by CreateLBCookieStickinessPolicy,
 * except that the lifetime of the special Elastic Load Balancing cookie, `AWSELB`,
 * follows the lifetime of the application-generated cookie specified in the policy configuration.
 * The load balancer only inserts a new stickiness cookie when the application response
 * includes a new application cookie.
 *
 * If the application cookie is explicitly removed or expires, the session stops being sticky until a new application cookie is issued.
 *
 * For more information, see Application-Controlled Session Stickiness
 * in the *Classic Load Balancers Guide*.
 */
export const createAppCookieStickinessPolicy: API.OperationMethod<
  CreateAppCookieStickinessPolicyInput,
  CreateAppCookieStickinessPolicyOutput,
  CreateAppCookieStickinessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<CreateAppCookieStickinessPolicyInput>,
  output: __S(145, __c9, 1) as any as S.Schema<CreateAppCookieStickinessPolicyOutput>,
  errors: [
    AccessPointNotFoundException,
    DuplicatePolicyNameException,
    InvalidConfigurationRequestException,
    TooManyPoliciesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppCookieStickinessPolicy",
}));

export type CreateLBCookieStickinessPolicyError =
  | AccessPointNotFoundException
  | DuplicatePolicyNameException
  | InvalidConfigurationRequestException
  | TooManyPoliciesException
  | CommonErrors;
/**
 * Generates a stickiness policy with sticky session lifetimes controlled by the lifetime of the browser (user-agent) or a specified expiration period. This policy can be associated only with HTTP/HTTPS listeners.
 *
 * When a load balancer implements this policy, the load balancer uses a special cookie to track the instance for each request. When the load balancer receives a request, it first checks to see if this cookie is present in the request.
 * If so, the load balancer sends the request to the application server specified in the cookie. If not, the load balancer sends the request to a server that is chosen based on the existing load-balancing algorithm.
 *
 * A cookie is inserted into the response for binding subsequent requests from the same user to that server. The validity of the cookie is based on the cookie expiration time, which is specified in the policy configuration.
 *
 * For more information, see Duration-Based Session Stickiness
 * in the *Classic Load Balancers Guide*.
 */
export const createLBCookieStickinessPolicy: API.OperationMethod<
  CreateLBCookieStickinessPolicyInput,
  CreateLBCookieStickinessPolicyOutput,
  CreateLBCookieStickinessPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<CreateLBCookieStickinessPolicyInput>,
  output: __S(161, __c10, 1) as any as S.Schema<CreateLBCookieStickinessPolicyOutput>,
  errors: [
    AccessPointNotFoundException,
    DuplicatePolicyNameException,
    InvalidConfigurationRequestException,
    TooManyPoliciesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLBCookieStickinessPolicy",
}));

export type CreateLoadBalancerError =
  | CertificateNotFoundException
  | DuplicateAccessPointNameException
  | DuplicateTagKeysException
  | InvalidConfigurationRequestException
  | InvalidSchemeException
  | InvalidSecurityGroupException
  | InvalidSubnetException
  | OperationNotPermittedException
  | SubnetNotFoundException
  | TooManyAccessPointsException
  | TooManyTagsException
  | UnsupportedProtocolException
  | CommonErrors;
/**
 * Creates a Classic Load Balancer.
 *
 * You can add listeners, security groups, subnets, and tags when you create your load balancer,
 * or you can add them later using CreateLoadBalancerListeners,
 * ApplySecurityGroupsToLoadBalancer, AttachLoadBalancerToSubnets,
 * and AddTags.
 *
 * To describe your current load balancers, see DescribeLoadBalancers.
 * When you are finished with a load balancer, you can delete it using
 * DeleteLoadBalancer.
 *
 * You can create up to 20 load balancers per region per account.
 * You can request an increase for the number of load balancers for your account.
 * For more information, see Limits for Your Classic Load Balancer
 * in the *Classic Load Balancers Guide*.
 */
export const createLoadBalancer: API.OperationMethod<
  CreateAccessPointInput,
  CreateAccessPointOutput,
  CreateLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<CreateAccessPointInput>,
  output: __S(177, __c11, 1) as any as S.Schema<CreateAccessPointOutput>,
  errors: [
    CertificateNotFoundException,
    DuplicateAccessPointNameException,
    DuplicateTagKeysException,
    InvalidConfigurationRequestException,
    InvalidSchemeException,
    InvalidSecurityGroupException,
    InvalidSubnetException,
    OperationNotPermittedException,
    SubnetNotFoundException,
    TooManyAccessPointsException,
    TooManyTagsException,
    UnsupportedProtocolException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoadBalancer",
}));

export type CreateLoadBalancerListenersError =
  | AccessPointNotFoundException
  | CertificateNotFoundException
  | DuplicateListenerException
  | InvalidConfigurationRequestException
  | UnsupportedProtocolException
  | CommonErrors;
/**
 * Creates one or more listeners for the specified load balancer. If a listener with the specified port does not already exist, it is created; otherwise, the properties of the new listener must match the properties of the existing listener.
 *
 * For more information, see Listeners for Your Classic Load Balancer
 * in the *Classic Load Balancers Guide*.
 */
export const createLoadBalancerListeners: API.OperationMethod<
  CreateLoadBalancerListenerInput,
  CreateLoadBalancerListenerOutput,
  CreateLoadBalancerListenersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<CreateLoadBalancerListenerInput>,
  output: __S(241, __c15, 1) as any as S.Schema<CreateLoadBalancerListenerOutput>,
  errors: [
    AccessPointNotFoundException,
    CertificateNotFoundException,
    DuplicateListenerException,
    InvalidConfigurationRequestException,
    UnsupportedProtocolException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoadBalancerListeners",
}));

export type CreateLoadBalancerPolicyError =
  | AccessPointNotFoundException
  | DuplicatePolicyNameException
  | InvalidConfigurationRequestException
  | PolicyTypeNotFoundException
  | TooManyPoliciesException
  | CommonErrors;
/**
 * Creates a policy with the specified attributes for the specified load balancer.
 *
 * Policies are settings that are saved for your load balancer and that can be applied to the listener or the application server, depending on the policy type.
 */
export const createLoadBalancerPolicy: API.OperationMethod<
  CreateLoadBalancerPolicyInput,
  CreateLoadBalancerPolicyOutput,
  CreateLoadBalancerPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(258, __c16, 2) as any as S.Schema<CreateLoadBalancerPolicyInput>,
  output: __S(259, __c16, 3) as any as S.Schema<CreateLoadBalancerPolicyOutput>,
  errors: [
    AccessPointNotFoundException,
    DuplicatePolicyNameException,
    InvalidConfigurationRequestException,
    PolicyTypeNotFoundException,
    TooManyPoliciesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoadBalancerPolicy",
}));

export type DeleteLoadBalancerError = CommonErrors;
/**
 * Deletes the specified load balancer.
 *
 * If you are attempting to recreate a load balancer, you must reconfigure all settings. The DNS name associated with a deleted load balancer are no longer usable. The name and associated DNS record of the deleted load balancer no longer exist and traffic sent to any of its IP addresses is no longer delivered to your instances.
 *
 * If the load balancer does not exist or has already been deleted, the call to
 * `DeleteLoadBalancer` still succeeds.
 */
export const deleteLoadBalancer: API.OperationMethod<
  DeleteAccessPointInput,
  DeleteAccessPointOutput,
  DeleteLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<DeleteAccessPointInput>,
  output: __S(273, __c17, 1) as any as S.Schema<DeleteAccessPointOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoadBalancer",
}));

export type DeleteLoadBalancerListenersError = AccessPointNotFoundException | CommonErrors;
/**
 * Deletes the specified listeners from the specified load balancer.
 */
export const deleteLoadBalancerListeners: API.OperationMethod<
  DeleteLoadBalancerListenerInput,
  DeleteLoadBalancerListenerOutput,
  DeleteLoadBalancerListenersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(289, __c18, 1) as any as S.Schema<DeleteLoadBalancerListenerInput>,
  output: __S(290, __c18, 2) as any as S.Schema<DeleteLoadBalancerListenerOutput>,
  errors: [AccessPointNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoadBalancerListeners",
}));

export type DeleteLoadBalancerPolicyError =
  | AccessPointNotFoundException
  | InvalidConfigurationRequestException
  | CommonErrors;
/**
 * Deletes the specified policy from the specified load balancer. This policy must not be enabled for any listeners.
 */
export const deleteLoadBalancerPolicy: API.OperationMethod<
  DeleteLoadBalancerPolicyInput,
  DeleteLoadBalancerPolicyOutput,
  DeleteLoadBalancerPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<DeleteLoadBalancerPolicyInput>,
  output: __S(305, __c19, 1) as any as S.Schema<DeleteLoadBalancerPolicyOutput>,
  errors: [AccessPointNotFoundException, InvalidConfigurationRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoadBalancerPolicy",
}));

export type DeregisterInstancesFromLoadBalancerError =
  | AccessPointNotFoundException
  | InvalidEndPointException
  | CommonErrors;
/**
 * Deregisters the specified instances from the specified load balancer. After the instance is deregistered, it no longer receives traffic from the load balancer.
 *
 * You can use DescribeLoadBalancers to verify that the instance is deregistered from the load balancer.
 *
 * For more information, see Register or De-Register EC2 Instances
 * in the *Classic Load Balancers Guide*.
 */
export const deregisterInstancesFromLoadBalancer: API.OperationMethod<
  DeregisterEndPointsInput,
  DeregisterEndPointsOutput,
  DeregisterInstancesFromLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<DeregisterEndPointsInput>,
  output: __S(321, __c20, 1) as any as S.Schema<DeregisterEndPointsOutput>,
  errors: [AccessPointNotFoundException, InvalidEndPointException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterInstancesFromLoadBalancer",
}));

export type DescribeAccountLimitsError = CommonErrors;
/**
 * Describes the current Elastic Load Balancing resource limits for your AWS account.
 *
 * For more information, see Limits for Your Classic Load Balancer
 * in the *Classic Load Balancers Guide*.
 */
export const describeAccountLimits: API.OperationMethod<
  DescribeAccountLimitsInput,
  DescribeAccountLimitsOutput,
  DescribeAccountLimitsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<DescribeAccountLimitsInput>,
  output: __S(355, __c22, 3) as any as S.Schema<DescribeAccountLimitsOutput>,
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountLimits",
}));

export type DescribeInstanceHealthError =
  | AccessPointNotFoundException
  | InvalidEndPointException
  | CommonErrors;
/**
 * Describes the state of the specified instances with respect to the specified load balancer. If no instances are specified, the call describes the state of all instances that are currently registered with the load balancer. If instances are specified, their state is returned even if they are no longer registered with the load balancer. The state of terminated instances is not returned.
 */
export const describeInstanceHealth: API.OperationMethod<
  DescribeEndPointStateInput,
  DescribeEndPointStateOutput,
  DescribeInstanceHealthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<DescribeEndPointStateInput>,
  output: __S(371, __c23, 3) as any as S.Schema<DescribeEndPointStateOutput>,
  errors: [AccessPointNotFoundException, InvalidEndPointException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstanceHealth",
}));

export type DescribeLoadBalancerAttributesError =
  | AccessPointNotFoundException
  | LoadBalancerAttributeNotFoundException
  | CommonErrors;
/**
 * Describes the attributes for the specified load balancer.
 */
export const describeLoadBalancerAttributes: API.OperationMethod<
  DescribeLoadBalancerAttributesInput,
  DescribeLoadBalancerAttributesOutput,
  DescribeLoadBalancerAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<DescribeLoadBalancerAttributesInput>,
  output: __S(385, __c24, 1) as any as S.Schema<DescribeLoadBalancerAttributesOutput>,
  errors: [AccessPointNotFoundException, LoadBalancerAttributeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoadBalancerAttributes",
}));

export type DescribeLoadBalancerPoliciesError =
  | AccessPointNotFoundException
  | PolicyNotFoundException
  | CommonErrors;
/**
 * Describes the specified policies.
 *
 * If you specify a load balancer name, the action returns the descriptions of all policies created for the load balancer.
 * If you specify a policy name associated with your load balancer, the action returns the description of that policy.
 * If you don't specify a load balancer name, the action returns descriptions of the specified sample policies, or descriptions of all sample policies.
 * The names of the sample policies have the `ELBSample-` prefix.
 */
export const describeLoadBalancerPolicies: API.OperationMethod<
  DescribeLoadBalancerPoliciesInput,
  DescribeLoadBalancerPoliciesOutput,
  DescribeLoadBalancerPoliciesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<DescribeLoadBalancerPoliciesInput>,
  output: __S(421, __c26, 5) as any as S.Schema<DescribeLoadBalancerPoliciesOutput>,
  errors: [AccessPointNotFoundException, PolicyNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoadBalancerPolicies",
}));

export type DescribeLoadBalancerPolicyTypesError = PolicyTypeNotFoundException | CommonErrors;
/**
 * Describes the specified load balancer policy types or all load balancer policy types.
 *
 * The description of each type indicates how it can be used. For example,
 * some policies can be used only with layer 7 listeners,
 * some policies can be used only with layer 4 listeners,
 * and some policies can be used only with your EC2 instances.
 *
 * You can use CreateLoadBalancerPolicy to create a policy configuration for any of these policy types.
 * Then, depending on the policy type, use either SetLoadBalancerPoliciesOfListener or
 * SetLoadBalancerPoliciesForBackendServer to set the policy.
 */
export const describeLoadBalancerPolicyTypes: API.OperationMethod<
  DescribeLoadBalancerPolicyTypesInput,
  DescribeLoadBalancerPolicyTypesOutput,
  DescribeLoadBalancerPolicyTypesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(449, __c28, 1) as any as S.Schema<DescribeLoadBalancerPolicyTypesInput>,
  output: __S(454, __c28, 6) as any as S.Schema<DescribeLoadBalancerPolicyTypesOutput>,
  errors: [PolicyTypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoadBalancerPolicyTypes",
}));

export type DescribeLoadBalancersError =
  | AccessPointNotFoundException
  | DependencyThrottleException
  | CommonErrors;
/**
 * Describes the specified the load balancers. If no load balancers are specified, the call describes all of your load balancers.
 */
export const describeLoadBalancers: API.PaginatedOperationMethod<
  DescribeAccessPointsInput,
  DescribeAccessPointsOutput,
  DescribeLoadBalancersError,
  Credentials | HttpClient.HttpClient,
  LoadBalancerDescription
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<DescribeAccessPointsInput>,
  output: __S(477, __c29, 13) as any as S.Schema<DescribeAccessPointsOutput>,
  errors: [AccessPointNotFoundException, DependencyThrottleException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoadBalancers",
  pagination: {
    inputToken: "Marker",
    outputToken: "NextMarker",
    items: "LoadBalancerDescriptions",
  } as const,
})) as any;

export type DescribeTagsError = AccessPointNotFoundException | CommonErrors;
/**
 * Describes the tags associated with the specified load balancers.
 */
export const describeTags: API.OperationMethod<
  DescribeTagsInput,
  DescribeTagsOutput,
  DescribeTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(481, __c30, 1) as any as S.Schema<DescribeTagsInput>,
  output: __S(484, __c30, 4) as any as S.Schema<DescribeTagsOutput>,
  errors: [AccessPointNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
}));

export type DetachLoadBalancerFromSubnetsError =
  | AccessPointNotFoundException
  | InvalidConfigurationRequestException
  | CommonErrors;
/**
 * Removes the specified subnets from the set of configured subnets for the load balancer.
 *
 * After a subnet is removed, all EC2 instances registered with the load balancer
 * in the removed subnet go into the `OutOfService` state. Then,
 * the load balancer balances the traffic among the remaining routable subnets.
 */
export const detachLoadBalancerFromSubnets: API.OperationMethod<
  DetachLoadBalancerFromSubnetsInput,
  DetachLoadBalancerFromSubnetsOutput,
  DetachLoadBalancerFromSubnetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<DetachLoadBalancerFromSubnetsInput>,
  output: __S(497, __c31, 1) as any as S.Schema<DetachLoadBalancerFromSubnetsOutput>,
  errors: [AccessPointNotFoundException, InvalidConfigurationRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachLoadBalancerFromSubnets",
}));

export type DisableAvailabilityZonesForLoadBalancerError =
  | AccessPointNotFoundException
  | InvalidConfigurationRequestException
  | CommonErrors;
/**
 * Removes the specified Availability Zones from the set of Availability Zones for the specified load balancer
 * in EC2-Classic or a default VPC.
 *
 * For load balancers in a non-default VPC, use DetachLoadBalancerFromSubnets.
 *
 * There must be at least one Availability Zone registered with a load balancer at all times.
 * After an Availability Zone is removed, all instances registered with the load balancer that are in the removed
 * Availability Zone go into the `OutOfService` state. Then, the load balancer attempts to equally balance
 * the traffic among its remaining Availability Zones.
 *
 * For more information, see Add or Remove Availability Zones
 * in the *Classic Load Balancers Guide*.
 */
export const disableAvailabilityZonesForLoadBalancer: API.OperationMethod<
  RemoveAvailabilityZonesInput,
  RemoveAvailabilityZonesOutput,
  DisableAvailabilityZonesForLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<RemoveAvailabilityZonesInput>,
  output: __S(513, __c32, 1) as any as S.Schema<RemoveAvailabilityZonesOutput>,
  errors: [AccessPointNotFoundException, InvalidConfigurationRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableAvailabilityZonesForLoadBalancer",
}));

export type EnableAvailabilityZonesForLoadBalancerError =
  | AccessPointNotFoundException
  | CommonErrors;
/**
 * Adds the specified Availability Zones to the set of Availability Zones for the specified load balancer
 * in EC2-Classic or a default VPC.
 *
 * For load balancers in a non-default VPC, use AttachLoadBalancerToSubnets.
 *
 * The load balancer evenly distributes requests across all its registered Availability Zones
 * that contain instances. For more information, see Add or Remove Availability Zones
 * in the *Classic Load Balancers Guide*.
 */
export const enableAvailabilityZonesForLoadBalancer: API.OperationMethod<
  AddAvailabilityZonesInput,
  AddAvailabilityZonesOutput,
  EnableAvailabilityZonesForLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<AddAvailabilityZonesInput>,
  output: __S(529, __c33, 1) as any as S.Schema<AddAvailabilityZonesOutput>,
  errors: [AccessPointNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableAvailabilityZonesForLoadBalancer",
}));

export type ModifyLoadBalancerAttributesError =
  | AccessPointNotFoundException
  | InvalidConfigurationRequestException
  | LoadBalancerAttributeNotFoundException
  | CommonErrors;
/**
 * Modifies the attributes of the specified load balancer.
 *
 * You can modify the load balancer attributes, such as `AccessLogs`, `ConnectionDraining`, and
 * `CrossZoneLoadBalancing` by either enabling or disabling them. Or, you can modify the load balancer attribute
 * `ConnectionSettings` by specifying an idle connection timeout value for your load balancer.
 *
 * For more information, see the following in the *Classic Load Balancers Guide*:
 *
 * - Cross-Zone Load Balancing
 *
 * - Connection Draining
 *
 * - Access Logs
 *
 * - Idle Connection Timeout
 */
export const modifyLoadBalancerAttributes: API.OperationMethod<
  ModifyLoadBalancerAttributesInput,
  ModifyLoadBalancerAttributesOutput,
  ModifyLoadBalancerAttributesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<ModifyLoadBalancerAttributesInput>,
  output: __S(545, __c34, 1) as any as S.Schema<ModifyLoadBalancerAttributesOutput>,
  errors: [
    AccessPointNotFoundException,
    InvalidConfigurationRequestException,
    LoadBalancerAttributeNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyLoadBalancerAttributes",
}));

export type RegisterInstancesWithLoadBalancerError =
  | AccessPointNotFoundException
  | InvalidEndPointException
  | CommonErrors;
/**
 * Adds the specified instances to the specified load balancer.
 *
 * The instance must be a running instance in the same network as the load balancer (EC2-Classic or the same VPC). If you have EC2-Classic instances and a load balancer in a VPC with ClassicLink enabled, you can link the EC2-Classic instances to that VPC and then register the linked EC2-Classic instances with the load balancer in the VPC.
 *
 * Note that `RegisterInstanceWithLoadBalancer` completes when the request has been registered.
 * Instance registration takes a little time to complete. To check the state of the registered instances, use
 * DescribeLoadBalancers or DescribeInstanceHealth.
 *
 * After the instance is registered, it starts receiving traffic
 * and requests from the load balancer. Any instance that is not
 * in one of the Availability Zones registered for the load balancer
 * is moved to the `OutOfService` state. If an Availability Zone
 * is added to the load balancer later, any instances registered with the
 * load balancer move to the `InService` state.
 *
 * To deregister instances from a load balancer, use DeregisterInstancesFromLoadBalancer.
 *
 * For more information, see Register or De-Register EC2 Instances
 * in the *Classic Load Balancers Guide*.
 */
export const registerInstancesWithLoadBalancer: API.OperationMethod<
  RegisterEndPointsInput,
  RegisterEndPointsOutput,
  RegisterInstancesWithLoadBalancerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<RegisterEndPointsInput>,
  output: __S(561, __c35, 1) as any as S.Schema<RegisterEndPointsOutput>,
  errors: [AccessPointNotFoundException, InvalidEndPointException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterInstancesWithLoadBalancer",
}));

export type RemoveTagsError = AccessPointNotFoundException | CommonErrors;
/**
 * Removes one or more tags from the specified load balancer.
 */
export const removeTags: API.OperationMethod<
  RemoveTagsInput,
  RemoveTagsOutput,
  RemoveTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(578, __c36, 2) as any as S.Schema<RemoveTagsInput>,
  output: __S(579, __c36, 3) as any as S.Schema<RemoveTagsOutput>,
  errors: [AccessPointNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTags",
}));

export type SetLoadBalancerListenerSSLCertificateError =
  | AccessPointNotFoundException
  | CertificateNotFoundException
  | InvalidConfigurationRequestException
  | ListenerNotFoundException
  | UnsupportedProtocolException
  | CommonErrors;
/**
 * Sets the certificate that terminates the specified listener's SSL connections. The specified certificate replaces any prior certificate that was used on the same load balancer and port.
 *
 * For more information about updating your SSL certificate, see
 * Replace the SSL Certificate for Your Load Balancer
 * in the *Classic Load Balancers Guide*.
 */
export const setLoadBalancerListenerSSLCertificate: API.OperationMethod<
  SetLoadBalancerListenerSSLCertificateInput,
  SetLoadBalancerListenerSSLCertificateOutput,
  SetLoadBalancerListenerSSLCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<SetLoadBalancerListenerSSLCertificateInput>,
  output: __S(593, __c37, 1) as any as S.Schema<SetLoadBalancerListenerSSLCertificateOutput>,
  errors: [
    AccessPointNotFoundException,
    CertificateNotFoundException,
    InvalidConfigurationRequestException,
    ListenerNotFoundException,
    UnsupportedProtocolException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetLoadBalancerListenerSSLCertificate",
}));

export type SetLoadBalancerPoliciesForBackendServerError =
  | AccessPointNotFoundException
  | InvalidConfigurationRequestException
  | PolicyNotFoundException
  | CommonErrors;
/**
 * Replaces the set of policies associated with the specified port on which the EC2 instance is listening with a new set of policies.
 * At this time, only the back-end server authentication policy type can be applied to the instance ports; this policy type is composed of multiple public key policies.
 *
 * Each time you use `SetLoadBalancerPoliciesForBackendServer` to enable the policies,
 * use the `PolicyNames` parameter to list the policies that you want to enable.
 *
 * You can use DescribeLoadBalancers or DescribeLoadBalancerPolicies to verify that the policy
 * is associated with the EC2 instance.
 *
 * For more information about enabling back-end instance authentication, see Configure Back-end Instance Authentication
 * in the *Classic Load Balancers Guide*. For more information about Proxy Protocol, see
 * Configure Proxy Protocol Support
 * in the *Classic Load Balancers Guide*.
 */
export const setLoadBalancerPoliciesForBackendServer: API.OperationMethod<
  SetLoadBalancerPoliciesForBackendServerInput,
  SetLoadBalancerPoliciesForBackendServerOutput,
  SetLoadBalancerPoliciesForBackendServerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<SetLoadBalancerPoliciesForBackendServerInput>,
  output: __S(609, __c38, 1) as any as S.Schema<SetLoadBalancerPoliciesForBackendServerOutput>,
  errors: [
    AccessPointNotFoundException,
    InvalidConfigurationRequestException,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetLoadBalancerPoliciesForBackendServer",
}));

export type SetLoadBalancerPoliciesOfListenerError =
  | AccessPointNotFoundException
  | InvalidConfigurationRequestException
  | ListenerNotFoundException
  | PolicyNotFoundException
  | CommonErrors;
/**
 * Replaces the current set of policies for the specified load balancer port with the specified set of policies.
 *
 * To enable back-end server authentication, use SetLoadBalancerPoliciesForBackendServer.
 *
 * For more information about setting policies, see
 * Update the SSL Negotiation Configuration,
 * Duration-Based Session Stickiness, and
 * Application-Controlled Session Stickiness
 * in the *Classic Load Balancers Guide*.
 */
export const setLoadBalancerPoliciesOfListener: API.OperationMethod<
  SetLoadBalancerPoliciesOfListenerInput,
  SetLoadBalancerPoliciesOfListenerOutput,
  SetLoadBalancerPoliciesOfListenerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<SetLoadBalancerPoliciesOfListenerInput>,
  output: __S(625, __c39, 1) as any as S.Schema<SetLoadBalancerPoliciesOfListenerOutput>,
  errors: [
    AccessPointNotFoundException,
    InvalidConfigurationRequestException,
    ListenerNotFoundException,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetLoadBalancerPoliciesOfListener",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoadBalancerNames: __S(32, __c2, 0), Tags: __S(17, __c1, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddTagsInput" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "AddTagsOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.optional(S.String) })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(16, __c1, 0));
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
        S.Struct({ LoadBalancerName: S.String, SecurityGroups: __S(64, __c4, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ApplySecurityGroupsToLoadBalancerInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ SecurityGroups: S.optional(__S(64, __c4, 0)) }).pipe(ns),
      ).annotate({ identifier: "ApplySecurityGroupsToLoadBalancerOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.String, Subnets: __S(96, __c6, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AttachLoadBalancerToSubnetsInput" });
    case 1:
      return S.suspend(() => S.Struct({ Subnets: S.optional(__S(96, __c6, 0)) }).pipe(ns)).annotate(
        { identifier: "AttachLoadBalancerToSubnetsOutput" },
      );
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.String, HealthCheck: __S(128, __c8, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ConfigureHealthCheckInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ HealthCheck: S.optional(__S(128, __c8, 0)) }).pipe(ns),
      ).annotate({ identifier: "ConfigureHealthCheckOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Target: S.String,
          Interval: S.Number,
          Timeout: S.Number,
          UnhealthyThreshold: S.Number,
          HealthyThreshold: S.Number,
        }),
      ).annotate({ identifier: "HealthCheck" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.String, PolicyName: S.String, CookieName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAppCookieStickinessPolicyInput" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateAppCookieStickinessPolicyOutput",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LoadBalancerName: S.String,
          PolicyName: S.String,
          CookieExpirationPeriod: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLBCookieStickinessPolicyInput" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateLBCookieStickinessPolicyOutput",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LoadBalancerName: S.String,
          Listeners: __S(192, __c12, 0),
          AvailabilityZones: S.optional(__S(224, __c14, 0)),
          Subnets: S.optional(__S(96, __c6, 0)),
          SecurityGroups: S.optional(__S(64, __c4, 0)),
          Scheme: S.optional(S.String),
          Tags: S.optional(__S(17, __c1, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAccessPointInput" });
    case 1:
      return S.suspend(() => S.Struct({ DNSName: S.optional(S.String) }).pipe(ns)).annotate({
        identifier: "CreateAccessPointOutput",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(208, __c13, 0));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Protocol: S.String,
          LoadBalancerPort: S.Number,
          InstanceProtocol: S.optional(S.String),
          InstancePort: S.Number,
          SSLCertificateId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Listener" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.String, Listeners: __S(192, __c12, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateLoadBalancerListenerInput" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateLoadBalancerListenerOutput",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ AttributeName: S.optional(S.String), AttributeValue: S.optional(S.String) }),
      ).annotate({ identifier: "PolicyAttribute" });
    case 1:
      return S.Array(__S(256, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          LoadBalancerName: S.String,
          PolicyName: S.String,
          PolicyTypeName: S.String,
          PolicyAttributes: S.optional(__S(257, __c16, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateLoadBalancerPolicyInput" });
    case 3:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CreateLoadBalancerPolicyOutput",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAccessPointInput" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteAccessPointOutput",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Number);
    case 1:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.String, LoadBalancerPorts: __S(288, __c18, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLoadBalancerListenerInput" });
    case 2:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteLoadBalancerListenerOutput",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.String, PolicyName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLoadBalancerPolicyInput" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "DeleteLoadBalancerPolicyOutput",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.String, Instances: __S(337, __c21, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeregisterEndPointsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Instances: S.optional(__S(337, __c21, 1)) }).pipe(ns),
      ).annotate({ identifier: "DeregisterEndPointsOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ InstanceId: S.optional(S.String) })).annotate({
        identifier: "Instance",
      });
    case 1:
      return S.Array(__S(336, __c21, 0));
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Marker: S.optional(S.String), PageSize: S.optional(S.Number) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAccountLimitsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Max: S.optional(S.String) }),
      ).annotate({ identifier: "Limit" });
    case 2:
      return S.Array(__S(353, __c22, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Limits: S.optional(__S(354, __c22, 2)), NextMarker: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "DescribeAccountLimitsOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.String, Instances: S.optional(__S(337, __c21, 1)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeEndPointStateInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          InstanceId: S.optional(S.String),
          State: S.optional(S.String),
          ReasonCode: S.optional(S.String),
          Description: S.optional(S.String),
        }),
      ).annotate({ identifier: "InstanceState" });
    case 2:
      return S.Array(__S(369, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ InstanceStates: S.optional(__S(370, __c23, 2)) }).pipe(ns),
      ).annotate({ identifier: "DescribeEndPointStateOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLoadBalancerAttributesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ LoadBalancerAttributes: S.optional(__S(406, __c25, 6)) }).pipe(ns),
      ).annotate({ identifier: "DescribeLoadBalancerAttributesOutput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Enabled: S.Boolean })).annotate({
        identifier: "CrossZoneLoadBalancing",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Enabled: S.Boolean,
          S3BucketName: S.optional(S.String),
          EmitInterval: S.optional(S.Number),
          S3BucketPrefix: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccessLog" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Enabled: S.Boolean, Timeout: S.optional(S.Number) }),
      ).annotate({ identifier: "ConnectionDraining" });
    case 3:
      return S.suspend(() => S.Struct({ IdleTimeout: S.Number })).annotate({
        identifier: "ConnectionSettings",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ Key: S.optional(S.String), Value: S.optional(S.String) }),
      ).annotate({ identifier: "AdditionalAttribute" });
    case 5:
      return S.Array(__S(404, __c25, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          CrossZoneLoadBalancing: S.optional(__S(400, __c25, 0)),
          AccessLog: S.optional(__S(401, __c25, 1)),
          ConnectionDraining: S.optional(__S(402, __c25, 2)),
          ConnectionSettings: S.optional(__S(403, __c25, 3)),
          AdditionalAttributes: S.optional(__S(405, __c25, 5)),
        }),
      ).annotate({ identifier: "LoadBalancerAttributes" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LoadBalancerName: S.optional(S.String),
          PolicyNames: S.optional(__S(432, __c27, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeLoadBalancerPoliciesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AttributeName: S.optional(S.String), AttributeValue: S.optional(S.String) }),
      ).annotate({ identifier: "PolicyAttributeDescription" });
    case 2:
      return S.Array(__S(417, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          PolicyName: S.optional(S.String),
          PolicyTypeName: S.optional(S.String),
          PolicyAttributeDescriptions: S.optional(__S(418, __c26, 2)),
        }),
      ).annotate({ identifier: "PolicyDescription" });
    case 4:
      return S.Array(__S(419, __c26, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ PolicyDescriptions: S.optional(__S(420, __c26, 4)) }).pipe(ns),
      ).annotate({ identifier: "DescribeLoadBalancerPoliciesOutput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ PolicyTypeNames: S.optional(__S(448, __c28, 0)) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLoadBalancerPolicyTypesInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          AttributeName: S.optional(S.String),
          AttributeType: S.optional(S.String),
          Description: S.optional(S.String),
          DefaultValue: S.optional(S.String),
          Cardinality: S.optional(S.String),
        }),
      ).annotate({ identifier: "PolicyAttributeTypeDescription" });
    case 3:
      return S.Array(__S(450, __c28, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          PolicyTypeName: S.optional(S.String),
          Description: S.optional(S.String),
          PolicyAttributeTypeDescriptions: S.optional(__S(451, __c28, 3)),
        }),
      ).annotate({ identifier: "PolicyTypeDescription" });
    case 5:
      return S.Array(__S(452, __c28, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ PolicyTypeDescriptions: S.optional(__S(453, __c28, 5)) }).pipe(ns),
      ).annotate({ identifier: "DescribeLoadBalancerPolicyTypesOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LoadBalancerNames: S.optional(__S(32, __c2, 0)),
          Marker: S.optional(S.String),
          PageSize: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeAccessPointsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Listener: S.optional(__S(208, __c13, 0)),
          PolicyNames: S.optional(__S(432, __c27, 0)),
        }),
      ).annotate({ identifier: "ListenerDescription" });
    case 2:
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ PolicyName: S.optional(S.String), CookieName: S.optional(S.String) }),
      ).annotate({ identifier: "AppCookieStickinessPolicy" });
    case 4:
      return S.Array(__S(467, __c29, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          PolicyName: S.optional(S.String),
          CookieExpirationPeriod: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LBCookieStickinessPolicy" });
    case 6:
      return S.Array(__S(469, __c29, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          AppCookieStickinessPolicies: S.optional(__S(468, __c29, 4)),
          LBCookieStickinessPolicies: S.optional(__S(470, __c29, 6)),
          OtherPolicies: S.optional(__S(432, __c27, 0)),
        }),
      ).annotate({ identifier: "Policies" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          InstancePort: S.optional(S.Number),
          PolicyNames: S.optional(__S(432, __c27, 0)),
        }),
      ).annotate({ identifier: "BackendServerDescription" });
    case 9:
      return S.Array(__S(472, __c29, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ OwnerAlias: S.optional(S.String), GroupName: S.optional(S.String) }),
      ).annotate({ identifier: "SourceSecurityGroup" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          LoadBalancerName: S.optional(S.String),
          DNSName: S.optional(S.String),
          CanonicalHostedZoneName: S.optional(S.String),
          CanonicalHostedZoneNameID: S.optional(S.String),
          ListenerDescriptions: S.optional(__S(466, __c29, 2)),
          Policies: S.optional(__S(471, __c29, 7)),
          BackendServerDescriptions: S.optional(__S(473, __c29, 9)),
          AvailabilityZones: S.optional(__S(224, __c14, 0)),
          Subnets: S.optional(__S(96, __c6, 0)),
          VPCId: S.optional(S.String),
          Instances: S.optional(__S(337, __c21, 1)),
          HealthCheck: S.optional(__S(128, __c8, 0)),
          SourceSecurityGroup: S.optional(__S(474, __c29, 10)),
          SecurityGroups: S.optional(__S(64, __c4, 0)),
          CreatedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          Scheme: S.optional(S.String),
        }),
      ).annotate({ identifier: "LoadBalancerDescription" });
    case 12:
      return S.Array(__S(475, __c29, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          LoadBalancerDescriptions: S.optional(__S(476, __c29, 12)),
          NextMarker: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeAccessPointsOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({ LoadBalancerNames: __S(480, __c30, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeTagsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.optional(S.String), Tags: S.optional(__S(17, __c1, 1)) }),
      ).annotate({ identifier: "TagDescription" });
    case 3:
      return S.Array(__S(482, __c30, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ TagDescriptions: S.optional(__S(483, __c30, 3)) }).pipe(ns),
      ).annotate({ identifier: "DescribeTagsOutput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.String, Subnets: __S(96, __c6, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DetachLoadBalancerFromSubnetsInput" });
    case 1:
      return S.suspend(() => S.Struct({ Subnets: S.optional(__S(96, __c6, 0)) }).pipe(ns)).annotate(
        { identifier: "DetachLoadBalancerFromSubnetsOutput" },
      );
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.String, AvailabilityZones: __S(224, __c14, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RemoveAvailabilityZonesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AvailabilityZones: S.optional(__S(224, __c14, 0)) }).pipe(ns),
      ).annotate({ identifier: "RemoveAvailabilityZonesOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.String, AvailabilityZones: __S(224, __c14, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AddAvailabilityZonesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ AvailabilityZones: S.optional(__S(224, __c14, 0)) }).pipe(ns),
      ).annotate({ identifier: "AddAvailabilityZonesOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.String, LoadBalancerAttributes: __S(406, __c25, 6) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ModifyLoadBalancerAttributesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          LoadBalancerName: S.optional(S.String),
          LoadBalancerAttributes: S.optional(__S(406, __c25, 6)),
        }).pipe(ns),
      ).annotate({ identifier: "ModifyLoadBalancerAttributesOutput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ LoadBalancerName: S.String, Instances: __S(337, __c21, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RegisterEndPointsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Instances: S.optional(__S(337, __c21, 1)) }).pipe(ns),
      ).annotate({ identifier: "RegisterEndPointsOutput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.optional(S.String) })).annotate({
        identifier: "TagKeyOnly",
      });
    case 1:
      return S.Array(__S(576, __c36, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ LoadBalancerNames: __S(32, __c2, 0), Tags: __S(577, __c36, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RemoveTagsInput" });
    case 3:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({ identifier: "RemoveTagsOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LoadBalancerName: S.String,
          LoadBalancerPort: S.Number,
          SSLCertificateId: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetLoadBalancerListenerSSLCertificateInput" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SetLoadBalancerListenerSSLCertificateOutput",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LoadBalancerName: S.String,
          InstancePort: S.Number,
          PolicyNames: __S(432, __c27, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetLoadBalancerPoliciesForBackendServerInput" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SetLoadBalancerPoliciesForBackendServerOutput",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          LoadBalancerName: S.String,
          LoadBalancerPort: S.Number,
          PolicyNames: __S(432, __c27, 0),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SetLoadBalancerPoliciesOfListenerInput" });
    case 1:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "SetLoadBalancerPoliciesOfListenerOutput",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
