import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsQueryProtocol } from "../protocols/aws-query.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Elastic Load Balancing",
  target: "ElasticLoadBalancing_v7",
  version: "2012-06-01",
  sigv4: "elasticloadbalancing",
  protocol: awsQueryProtocol,
  xmlns: "http://elasticloadbalancing.amazonaws.com/doc/2012-06-01/",
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
                return e(
                  `https://elasticloadbalancing.${Region}.amazonaws.com`,
                );
              }
              return e(
                `https://elasticloadbalancing-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://elasticloadbalancing.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://elasticloadbalancing.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessPointNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "AccessPointNotFoundException",
    ["BadRequestError"],
    { code: "LoadBalancerNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class CertificateNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "CertificateNotFoundException",
    ["BadRequestError"],
    { code: "CertificateNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class DependencyThrottleException
  extends /*@__PURE__*/ TE.TaggedError(
    "DependencyThrottleException",
    ["BadRequestError"],
    { code: "DependencyThrottle", status: 400 },
  )<{ readonly message?: string }> {}
export class DuplicateAccessPointNameException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateAccessPointNameException",
    ["BadRequestError"],
    { code: "DuplicateLoadBalancerName", status: 400 },
  )<{ readonly message?: string }> {}
export class DuplicateListenerException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateListenerException",
    ["BadRequestError"],
    { code: "DuplicateListener", status: 400 },
  )<{ readonly message?: string }> {}
export class DuplicatePolicyNameException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicatePolicyNameException",
    ["BadRequestError"],
    { code: "DuplicatePolicyName", status: 400 },
  )<{ readonly message?: string }> {}
export class DuplicateTagKeysException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateTagKeysException",
    ["BadRequestError"],
    { code: "DuplicateTagKeys", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidConfigurationRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidConfigurationRequestException",
    ["ConflictError"],
    { code: "InvalidConfigurationRequest", status: 409 },
  )<{ readonly message?: string }> {}
export class InvalidEndPointException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidEndPointException",
    ["BadRequestError"],
    { code: "InvalidInstance", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSchemeException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSchemeException",
    ["BadRequestError"],
    { code: "InvalidScheme", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSecurityGroupException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSecurityGroupException",
    ["BadRequestError"],
    { code: "InvalidSecurityGroup", status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidSubnetException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidSubnetException",
    ["BadRequestError"],
    { code: "InvalidSubnet", status: 400 },
  )<{ readonly message?: string }> {}
export class ListenerNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ListenerNotFoundException",
    ["BadRequestError"],
    { code: "ListenerNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class LoadBalancerAttributeNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "LoadBalancerAttributeNotFoundException",
    ["BadRequestError"],
    { code: "LoadBalancerAttributeNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class OperationNotPermittedException
  extends /*@__PURE__*/ TE.TaggedError(
    "OperationNotPermittedException",
    ["BadRequestError"],
    { code: "OperationNotPermitted", status: 400 },
  )<{ readonly message?: string }> {}
export class PolicyNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "PolicyNotFoundException",
    ["BadRequestError"],
    { code: "PolicyNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class PolicyTypeNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "PolicyTypeNotFoundException",
    ["BadRequestError"],
    { code: "PolicyTypeNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class SubnetNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "SubnetNotFoundException",
    ["BadRequestError"],
    { code: "SubnetNotFound", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyAccessPointsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyAccessPointsException",
    ["BadRequestError"],
    { code: "TooManyLoadBalancers", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyPoliciesException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyPoliciesException",
    ["BadRequestError"],
    { code: "TooManyPolicies", status: 400 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { code: "TooManyTags", status: 400 },
  )<{ readonly message?: string }> {}
export class UnsupportedProtocolException
  extends /*@__PURE__*/ TE.TaggedError(
    "UnsupportedProtocolException",
    ["BadRequestError"],
    { code: "UnsupportedProtocol", status: 400 },
  )<{ readonly message?: string }> {}
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
  descriptor: {
    service: svc,
    input: { LoadBalancerNames: 0, Tags: D.list(i_Tag) },
  },
  errors: [
    AccessPointNotFoundException,
    DuplicateTagKeysException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AddTags",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, SecurityGroups: 0 },
    output: { SecurityGroups: D.list() },
  },
  errors: [
    AccessPointNotFoundException,
    InvalidConfigurationRequestException,
    InvalidSecurityGroupException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ApplySecurityGroupsToLoadBalancer",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, Subnets: 0 },
    output: { Subnets: D.list() },
  },
  errors: [
    AccessPointNotFoundException,
    InvalidConfigurationRequestException,
    InvalidSubnetException,
    SubnetNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachLoadBalancerToSubnets",
})) as any;

export type ConfigureHealthCheckError =
  | AccessPointNotFoundException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: {
      LoadBalancerName: 0,
      HealthCheck: {
        Target: 0,
        Interval: 0,
        Timeout: 0,
        UnhealthyThreshold: 0,
        HealthyThreshold: 0,
      },
    },
    output: { HealthCheck: o_HealthCheck },
  },
  errors: [AccessPointNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ConfigureHealthCheck",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, PolicyName: 0, CookieName: 0 },
  },
  errors: [
    AccessPointNotFoundException,
    DuplicatePolicyNameException,
    InvalidConfigurationRequestException,
    TooManyPoliciesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAppCookieStickinessPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, PolicyName: 0, CookieExpirationPeriod: 0 },
  },
  errors: [
    AccessPointNotFoundException,
    DuplicatePolicyNameException,
    InvalidConfigurationRequestException,
    TooManyPoliciesException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLBCookieStickinessPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      LoadBalancerName: 0,
      Listeners: D.list(i_Listener),
      AvailabilityZones: 0,
      Subnets: 0,
      SecurityGroups: 0,
      Scheme: 0,
      Tags: D.list(i_Tag),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, Listeners: D.list(i_Listener) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      LoadBalancerName: 0,
      PolicyName: 0,
      PolicyTypeName: 0,
      PolicyAttributes: D.list({ AttributeName: 0, AttributeValue: 0 }),
    },
  },
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
})) as any;

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
  descriptor: { service: svc, input: { LoadBalancerName: 0 } },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoadBalancer",
})) as any;

export type DeleteLoadBalancerListenersError =
  | AccessPointNotFoundException
  | CommonErrors;
/**
 * Deletes the specified listeners from the specified load balancer.
 */
export const deleteLoadBalancerListeners: API.OperationMethod<
  DeleteLoadBalancerListenerInput,
  DeleteLoadBalancerListenerOutput,
  DeleteLoadBalancerListenersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, LoadBalancerPorts: 0 },
  },
  errors: [AccessPointNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoadBalancerListeners",
})) as any;

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
  descriptor: { service: svc, input: { LoadBalancerName: 0, PolicyName: 0 } },
  errors: [AccessPointNotFoundException, InvalidConfigurationRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoadBalancerPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, Instances: D.list(i_Instance) },
    output: { Instances: D.list({}) },
  },
  errors: [AccessPointNotFoundException, InvalidEndPointException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterInstancesFromLoadBalancer",
})) as any;

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
  descriptor: {
    service: svc,
    input: { Marker: 0, PageSize: 0 },
    output: { Limits: D.list({}) },
  },
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAccountLimits",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, Instances: D.list(i_Instance) },
    output: { InstanceStates: D.list({}) },
  },
  errors: [AccessPointNotFoundException, InvalidEndPointException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeInstanceHealth",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0 },
    output: { LoadBalancerAttributes: o_LoadBalancerAttributes },
  },
  errors: [
    AccessPointNotFoundException,
    LoadBalancerAttributeNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoadBalancerAttributes",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, PolicyNames: 0 },
    output: {
      PolicyDescriptions: D.list({ PolicyAttributeDescriptions: D.list({}) }),
    },
  },
  errors: [AccessPointNotFoundException, PolicyNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoadBalancerPolicies",
})) as any;

export type DescribeLoadBalancerPolicyTypesError =
  | PolicyTypeNotFoundException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    input: { PolicyTypeNames: 0 },
    output: {
      PolicyTypeDescriptions: D.list({
        PolicyAttributeTypeDescriptions: D.list({}),
      }),
    },
  },
  errors: [PolicyTypeNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoadBalancerPolicyTypes",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerNames: 0, Marker: 0, PageSize: 0 },
    output: {
      LoadBalancerDescriptions: D.list({
        ListenerDescriptions: D.list({
          Listener: { LoadBalancerPort: D.num, InstancePort: D.num },
          PolicyNames: D.list(),
        }),
        Policies: {
          AppCookieStickinessPolicies: D.list({}),
          LBCookieStickinessPolicies: D.list({ CookieExpirationPeriod: D.num }),
          OtherPolicies: D.list(),
        },
        BackendServerDescriptions: D.list({
          InstancePort: D.num,
          PolicyNames: D.list(),
        }),
        AvailabilityZones: D.list(),
        Subnets: D.list(),
        Instances: D.list({}),
        HealthCheck: o_HealthCheck,
        SourceSecurityGroup: {},
        SecurityGroups: D.list(),
        CreatedTime: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    input: { LoadBalancerNames: 0 },
    output: { TagDescriptions: D.list({ Tags: D.list({}) }) },
  },
  errors: [AccessPointNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTags",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, Subnets: 0 },
    output: { Subnets: D.list() },
  },
  errors: [AccessPointNotFoundException, InvalidConfigurationRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachLoadBalancerFromSubnets",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, AvailabilityZones: 0 },
    output: { AvailabilityZones: D.list() },
  },
  errors: [AccessPointNotFoundException, InvalidConfigurationRequestException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisableAvailabilityZonesForLoadBalancer",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, AvailabilityZones: 0 },
    output: { AvailabilityZones: D.list() },
  },
  errors: [AccessPointNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "EnableAvailabilityZonesForLoadBalancer",
})) as any;

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
  descriptor: {
    service: svc,
    input: {
      LoadBalancerName: 0,
      LoadBalancerAttributes: {
        CrossZoneLoadBalancing: { Enabled: 0 },
        AccessLog: {
          Enabled: 0,
          S3BucketName: 0,
          EmitInterval: 0,
          S3BucketPrefix: 0,
        },
        ConnectionDraining: { Enabled: 0, Timeout: 0 },
        ConnectionSettings: { IdleTimeout: 0 },
        AdditionalAttributes: D.list({ Key: 0, Value: 0 }),
      },
    },
    output: { LoadBalancerAttributes: o_LoadBalancerAttributes },
  },
  errors: [
    AccessPointNotFoundException,
    InvalidConfigurationRequestException,
    LoadBalancerAttributeNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ModifyLoadBalancerAttributes",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, Instances: D.list(i_Instance) },
    output: { Instances: D.list({}) },
  },
  errors: [AccessPointNotFoundException, InvalidEndPointException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterInstancesWithLoadBalancer",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerNames: 0, Tags: D.list({ Key: 0 }) },
  },
  errors: [AccessPointNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveTags",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, LoadBalancerPort: 0, SSLCertificateId: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, InstancePort: 0, PolicyNames: 0 },
  },
  errors: [
    AccessPointNotFoundException,
    InvalidConfigurationRequestException,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetLoadBalancerPoliciesForBackendServer",
})) as any;

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
  descriptor: {
    service: svc,
    input: { LoadBalancerName: 0, LoadBalancerPort: 0, PolicyNames: 0 },
  },
  errors: [
    AccessPointNotFoundException,
    InvalidConfigurationRequestException,
    ListenerNotFoundException,
    PolicyNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SetLoadBalancerPoliciesOfListener",
})) as any;

const i_Instance: D.LazyStruct = () => ({ InstanceId: 0 });
const i_Listener: D.LazyStruct = () => ({
  Protocol: 0,
  LoadBalancerPort: 0,
  InstanceProtocol: 0,
  InstancePort: 0,
  SSLCertificateId: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_HealthCheck: D.LazyStruct = () => ({
  Interval: D.num,
  Timeout: D.num,
  UnhealthyThreshold: D.num,
  HealthyThreshold: D.num,
});
const o_LoadBalancerAttributes: D.LazyStruct = () => ({
  CrossZoneLoadBalancing: { Enabled: D.bool },
  AccessLog: { Enabled: D.bool, EmitInterval: D.num },
  ConnectionDraining: { Enabled: D.bool, Timeout: D.num },
  ConnectionSettings: { IdleTimeout: D.num },
  AdditionalAttributes: D.list({}),
});
