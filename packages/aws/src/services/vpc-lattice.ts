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
  sdkId: "VPC Lattice",
  serviceShapeName: "MercuryControlPlane",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "vpc-lattice" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-11-30");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://vpc-lattice.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://vpc-lattice.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://vpc-lattice.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: S.String,
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(529, __c66, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ServiceIdentifier = string;
export type ListenerIdentifier = string;
export type RuleIdentifier = string;
export type HttpMethod = string;
export type PathMatchExact = string;
export type PathMatchPrefix = string;
export type PathMatchType = { exact: string; prefix?: never } | { exact?: never; prefix: string };
export interface PathMatch {
  match: PathMatchType;
  caseSensitive?: boolean;
}
export type HeaderMatchName = string;
export type HeaderMatchExact = string;
export type HeaderMatchPrefix = string;
export type HeaderMatchContains = string;
export type HeaderMatchType =
  | { exact: string; prefix?: never; contains?: never }
  | { exact?: never; prefix: string; contains?: never }
  | { exact?: never; prefix?: never; contains: string };
export interface HeaderMatch {
  name: string;
  match: HeaderMatchType;
  caseSensitive?: boolean;
}
export type HeaderMatchList = HeaderMatch[];
export interface HttpMatch {
  method?: string;
  pathMatch?: PathMatch;
  headerMatches?: HeaderMatch[];
}
export type RuleMatch = { httpMatch: HttpMatch };
export type RulePriority = number;
export type TargetGroupIdentifier = string;
export type TargetGroupWeight = number;
export interface WeightedTargetGroup {
  targetGroupIdentifier: string;
  weight?: number;
}
export type WeightedTargetGroupList = WeightedTargetGroup[];
export interface ForwardAction {
  targetGroups: WeightedTargetGroup[];
}
export type HttpStatusCode = number;
export interface FixedResponseAction {
  statusCode: number;
}
export type RuleAction =
  | { forward: ForwardAction; fixedResponse?: never }
  | { forward?: never; fixedResponse: FixedResponseAction };
export interface RuleUpdate {
  ruleIdentifier: string;
  match?: RuleMatch;
  priority?: number;
  action?: RuleAction;
}
export type RuleUpdateList = RuleUpdate[];
export interface BatchUpdateRuleRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
  rules: RuleUpdate[];
}
export type RuleArn = string;
export type RuleId = string;
export type RuleName = string;
export interface RuleUpdateSuccess {
  arn?: string;
  id?: string;
  name?: string;
  isDefault?: boolean;
  match?: RuleMatch;
  priority?: number;
  action?: RuleAction;
}
export type RuleUpdateSuccessList = RuleUpdateSuccess[];
export type FailureCode = string;
export type FailureMessage = string;
export interface RuleUpdateFailure {
  ruleIdentifier?: string;
  failureCode?: string;
  failureMessage?: string;
}
export type RuleUpdateFailureList = RuleUpdateFailure[];
export interface BatchUpdateRuleResponse {
  successful?: RuleUpdateSuccess[];
  unsuccessful?: RuleUpdateFailure[];
}
export type ClientToken = string;
export type ResourceIdentifier = string;
export type AccessLogDestinationArn = string;
export type ServiceNetworkLogType = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateAccessLogSubscriptionRequest {
  clientToken?: string;
  resourceIdentifier: string;
  destinationArn: string;
  serviceNetworkLogType?: string;
  tags?: { [key: string]: string | undefined };
}
export type AccessLogSubscriptionId = string;
export type AccessLogSubscriptionArn = string;
export type ResourceId = string;
export type ResourceArn = string;
export interface CreateAccessLogSubscriptionResponse {
  id: string;
  arn: string;
  resourceId: string;
  resourceArn: string;
  serviceNetworkLogType?: string;
  destinationArn: string;
}
export type ListenerName = string;
export type ListenerProtocol = string;
export type Port = number;
export interface CreateListenerRequest {
  serviceIdentifier: string;
  name: string;
  protocol: string;
  port?: number;
  defaultAction: RuleAction;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type ListenerArn = string;
export type ListenerId = string;
export type ServiceArn = string;
export type ServiceId = string;
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
export type ResourceConfigurationName = string;
export type ResourceConfigurationType =
  | "GROUP"
  | "CHILD"
  | "SINGLE"
  | "ARN"
  | "CIDR"
  | (string & {});
export type PortRange = string;
export type PortRangeList = string[];
export type ProtocolType = "TCP" | "TCP_UDP" | (string & {});
export type ResourceGatewayIdentifier = string;
export type ResourceConfigurationIdentifier = string;
export type DomainName = string;
export type ResourceConfigurationIpAddressType = string;
export interface DnsResource {
  domainName?: string;
  ipAddressType?: string;
}
export type IpAddress = string;
export interface IpResource {
  ipAddress?: string;
}
export type WildcardArn = string;
export interface ArnResource {
  arn?: string;
}
export type CidrRange = string;
export type CidrRangeList = string[];
export interface CidrResource {
  cidrRanges?: string[];
}
export type ResourceConfigurationDefinition =
  | { dnsResource: DnsResource; ipResource?: never; arnResource?: never; cidrResource?: never }
  | { dnsResource?: never; ipResource: IpResource; arnResource?: never; cidrResource?: never }
  | { dnsResource?: never; ipResource?: never; arnResource: ArnResource; cidrResource?: never }
  | { dnsResource?: never; ipResource?: never; arnResource?: never; cidrResource: CidrResource };
export type DomainVerificationIdentifier = string;
export interface CreateResourceConfigurationRequest {
  name: string;
  type: ResourceConfigurationType;
  portRanges?: string[];
  protocol?: ProtocolType;
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
export type ResourceConfigurationId = string;
export type ResourceConfigurationArn = string;
export type ResourceGatewayId = string;
export type ResourceConfigurationStatus = string;
export type DomainVerificationId = string;
export type DomainVerificationArn = string;
export interface CreateResourceConfigurationResponse {
  id?: string;
  name?: string;
  arn?: string;
  resourceGatewayId?: string;
  resourceConfigurationGroupId?: string;
  type?: ResourceConfigurationType;
  portRanges?: string[];
  protocol?: ProtocolType;
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
export type ResourceGatewayName = string;
export type VpcId = string;
export type SubnetId = string;
export type SubnetList = string[];
export type SecurityGroupId = string;
export type SecurityGroupList = string[];
export type ResourceGatewayIpAddressType = string;
export type Ipv4AddressesPerEni = number;
export type ResourceConfigDnsResolution = string;
export interface CreateResourceGatewayRequest {
  clientToken?: string;
  name: string;
  vpcIdentifier?: string;
  subnetIds?: string[];
  securityGroupIds?: string[];
  ipAddressType?: string;
  ipv4AddressesPerEni?: number;
  resourceConfigDnsResolution?: string;
  tags?: { [key: string]: string | undefined };
}
export type ResourceGatewayArn = string;
export type ResourceGatewayStatus = string;
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
  resourceConfigDnsResolution?: string;
}
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
export interface CreateRuleResponse {
  arn?: string;
  id?: string;
  name?: string;
  match?: RuleMatch;
  priority?: number;
  action?: RuleAction;
}
export type ServiceName = string;
export type ServiceCustomDomainName = string;
export type CertificateArn = string;
export type AuthType = string;
export type IdleTimeoutSeconds = number;
export interface CreateServiceRequest {
  clientToken?: string;
  name: string;
  tags?: { [key: string]: string | undefined };
  customDomainName?: string;
  certificateArn?: string;
  authType?: string;
  idleTimeoutSeconds?: number;
}
export type ServiceStatus = string;
export interface DnsEntry {
  domainName?: string;
  hostedZoneId?: string;
}
export interface CreateServiceResponse {
  id?: string;
  arn?: string;
  name?: string;
  customDomainName?: string;
  certificateArn?: string;
  status?: string;
  authType?: string;
  idleTimeoutSeconds?: number;
  dnsEntry?: DnsEntry;
}
export type ServiceNetworkName = string;
export interface SharingConfig {
  enabled?: boolean;
}
export interface CreateServiceNetworkRequest {
  clientToken?: string;
  name: string;
  authType?: string;
  tags?: { [key: string]: string | undefined };
  sharingConfig?: SharingConfig;
}
export type ServiceNetworkId = string;
export type ServiceNetworkArn = string;
export interface CreateServiceNetworkResponse {
  id?: string;
  name?: string;
  arn?: string;
  sharingConfig?: SharingConfig;
  authType?: string;
}
export type ServiceNetworkIdentifierWithoutRegex = string;
export interface CreateServiceNetworkResourceAssociationRequest {
  clientToken?: string;
  resourceConfigurationIdentifier: string;
  serviceNetworkIdentifier: string;
  privateDnsEnabled?: boolean;
  tags?: { [key: string]: string | undefined };
}
export type ServiceNetworkResourceAssociationId = string;
export type ServiceNetworkResourceAssociationArn = string;
export type ServiceNetworkResourceAssociationStatus = string;
export type AccountId = string;
export interface CreateServiceNetworkResourceAssociationResponse {
  id?: string;
  arn?: string;
  status?: string;
  createdBy?: string;
  privateDnsEnabled?: boolean;
}
export type ServiceNetworkIdentifier = string;
export interface CreateServiceNetworkServiceAssociationRequest {
  clientToken?: string;
  serviceIdentifier: string;
  serviceNetworkIdentifier: string;
  tags?: { [key: string]: string | undefined };
}
export type ServiceNetworkServiceAssociationIdentifier = string;
export type ServiceNetworkServiceAssociationStatus = string;
export type ServiceNetworkServiceAssociationArn = string;
export interface CreateServiceNetworkServiceAssociationResponse {
  id?: string;
  status?: string;
  arn?: string;
  createdBy?: string;
  customDomainName?: string;
  dnsEntry?: DnsEntry;
}
export type PrivateDnsPreference = string;
export type PrivateDnsSpecifiedDomain = string;
export type PrivateDnsSpecifiedDomainsList = string[];
export interface DnsOptions {
  privateDnsPreference?: string;
  privateDnsSpecifiedDomains?: string[];
}
export interface CreateServiceNetworkVpcAssociationRequest {
  clientToken?: string;
  serviceNetworkIdentifier: string;
  vpcIdentifier: string;
  privateDnsEnabled?: boolean;
  securityGroupIds?: string[];
  tags?: { [key: string]: string | undefined };
  dnsOptions?: DnsOptions;
}
export type ServiceNetworkVpcAssociationId = string;
export type ServiceNetworkVpcAssociationStatus = string;
export type ServiceNetworkVpcAssociationArn = string;
export interface CreateServiceNetworkVpcAssociationResponse {
  id?: string;
  status?: string;
  arn?: string;
  createdBy?: string;
  securityGroupIds?: string[];
  privateDnsEnabled?: boolean;
  dnsOptions?: DnsOptions;
}
export type TargetGroupName = string;
export type TargetGroupType = string;
export type TargetGroupProtocol = string;
export type TargetGroupProtocolVersion = string;
export type IpAddressType = string;
export type HealthCheckProtocolVersion = string;
export type HealthCheckPort = number;
export type HealthCheckPath = string;
export type HealthCheckIntervalSeconds = number;
export type HealthCheckTimeoutSeconds = number;
export type HealthyThresholdCount = number;
export type UnhealthyThresholdCount = number;
export type HttpCodeMatcher = string;
export type Matcher = { httpCode: string };
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
export type LambdaEventStructureVersion = string;
export interface TargetGroupConfig {
  port?: number;
  protocol?: string;
  protocolVersion?: string;
  ipAddressType?: string;
  vpcIdentifier?: string;
  healthCheck?: HealthCheckConfig;
  lambdaEventStructureVersion?: string;
}
export interface CreateTargetGroupRequest {
  name: string;
  type: string;
  config?: TargetGroupConfig;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type TargetGroupId = string;
export type TargetGroupArn = string;
export type TargetGroupStatus = string;
export interface CreateTargetGroupResponse {
  id?: string;
  arn?: string;
  name?: string;
  type?: string;
  config?: TargetGroupConfig;
  status?: string;
}
export type AccessLogSubscriptionIdentifier = string;
export interface DeleteAccessLogSubscriptionRequest {
  accessLogSubscriptionIdentifier: string;
}
export interface DeleteAccessLogSubscriptionResponse {}
export interface DeleteAuthPolicyRequest {
  resourceIdentifier: string;
}
export interface DeleteAuthPolicyResponse {}
export interface DeleteDomainVerificationRequest {
  domainVerificationIdentifier: string;
}
export interface DeleteDomainVerificationResponse {}
export interface DeleteListenerRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
}
export interface DeleteListenerResponse {}
export interface DeleteResourceConfigurationRequest {
  resourceConfigurationIdentifier: string;
}
export interface DeleteResourceConfigurationResponse {}
export type ResourceEndpointAssociationIdentifier = string;
export interface DeleteResourceEndpointAssociationRequest {
  resourceEndpointAssociationIdentifier: string;
}
export type ResourceEndpointAssociationId = string;
export type ResourceEndpointAssociationArn = string;
export type VpcEndpointId = string;
export interface DeleteResourceEndpointAssociationResponse {
  id?: string;
  arn?: string;
  resourceConfigurationId?: string;
  resourceConfigurationArn?: string;
  vpcEndpointId?: string;
}
export interface DeleteResourceGatewayRequest {
  resourceGatewayIdentifier: string;
}
export interface DeleteResourceGatewayResponse {
  id?: string;
  arn?: string;
  name?: string;
  status?: string;
}
export interface DeleteResourcePolicyRequest {
  resourceArn: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteRuleRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
  ruleIdentifier: string;
}
export interface DeleteRuleResponse {}
export interface DeleteServiceRequest {
  serviceIdentifier: string;
}
export interface DeleteServiceResponse {
  id?: string;
  arn?: string;
  name?: string;
  status?: string;
}
export interface DeleteServiceNetworkRequest {
  serviceNetworkIdentifier: string;
}
export interface DeleteServiceNetworkResponse {}
export type ServiceNetworkResourceAssociationIdentifier = string;
export interface DeleteServiceNetworkResourceAssociationRequest {
  serviceNetworkResourceAssociationIdentifier: string;
}
export interface DeleteServiceNetworkResourceAssociationResponse {
  id?: string;
  arn?: string;
  status?: string;
}
export interface DeleteServiceNetworkServiceAssociationRequest {
  serviceNetworkServiceAssociationIdentifier: string;
}
export interface DeleteServiceNetworkServiceAssociationResponse {
  id?: string;
  status?: string;
  arn?: string;
}
export type ServiceNetworkVpcAssociationIdentifier = string;
export interface DeleteServiceNetworkVpcAssociationRequest {
  serviceNetworkVpcAssociationIdentifier: string;
}
export interface DeleteServiceNetworkVpcAssociationResponse {
  id?: string;
  status?: string;
  arn?: string;
}
export interface DeleteTargetGroupRequest {
  targetGroupIdentifier: string;
}
export interface DeleteTargetGroupResponse {
  id?: string;
  arn?: string;
  status?: string;
}
export interface Target {
  id: string;
  port?: number;
}
export type TargetList = Target[];
export interface DeregisterTargetsRequest {
  targetGroupIdentifier: string;
  targets: Target[];
}
export interface TargetFailure {
  id?: string;
  port?: number;
  failureCode?: string;
  failureMessage?: string;
}
export type TargetFailureList = TargetFailure[];
export interface DeregisterTargetsResponse {
  successful?: Target[];
  unsuccessful?: TargetFailure[];
}
export interface GetAccessLogSubscriptionRequest {
  accessLogSubscriptionIdentifier: string;
}
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
export interface GetAuthPolicyRequest {
  resourceIdentifier: string;
}
export type AuthPolicyString = string;
export type AuthPolicyState = string;
export interface GetAuthPolicyResponse {
  policy?: string;
  state?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export interface GetDomainVerificationRequest {
  domainVerificationIdentifier: string;
}
export type VerificationStatus = string;
export interface TxtMethodConfig {
  value: string;
  name: string;
}
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
export interface GetListenerRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
}
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
export interface GetResourceConfigurationRequest {
  resourceConfigurationIdentifier: string;
}
export interface GetResourceConfigurationResponse {
  id?: string;
  name?: string;
  arn?: string;
  resourceGatewayId?: string;
  resourceConfigurationGroupId?: string;
  type?: ResourceConfigurationType;
  allowAssociationToShareableServiceNetwork?: boolean;
  portRanges?: string[];
  protocol?: ProtocolType;
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
export interface GetResourceGatewayRequest {
  resourceGatewayIdentifier: string;
}
export interface GetResourceGatewayResponse {
  name?: string;
  id?: string;
  arn?: string;
  status?: string;
  vpcId?: string;
  subnetIds?: string[];
  serviceManaged?: boolean;
  managedBy?: string;
  securityGroupIds?: string[];
  ipAddressType?: string;
  ipv4AddressesPerEni?: number;
  resourceConfigDnsResolution?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export interface GetResourcePolicyRequest {
  resourceArn: string;
}
export type PolicyString = string;
export interface GetResourcePolicyResponse {
  policy?: string;
}
export interface GetRuleRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
  ruleIdentifier: string;
}
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
export interface GetServiceRequest {
  serviceIdentifier: string;
}
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
  idleTimeoutSeconds?: number;
  failureCode?: string;
  failureMessage?: string;
}
export interface GetServiceNetworkRequest {
  serviceNetworkIdentifier: string;
}
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
export interface GetServiceNetworkResourceAssociationRequest {
  serviceNetworkResourceAssociationIdentifier: string;
}
export type ServiceNetworkNameWithoutRegex = string;
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
export interface GetServiceNetworkServiceAssociationRequest {
  serviceNetworkServiceAssociationIdentifier: string;
}
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
export interface GetServiceNetworkVpcAssociationRequest {
  serviceNetworkVpcAssociationIdentifier: string;
}
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
export interface GetTargetGroupRequest {
  targetGroupIdentifier: string;
}
export type ServiceArnList = string[];
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
export type MaxResults = number;
export type NextToken = string;
export interface ListAccessLogSubscriptionsRequest {
  resourceIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
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
export type AccessLogSubscriptionList = AccessLogSubscriptionSummary[];
export interface ListAccessLogSubscriptionsResponse {
  items: AccessLogSubscriptionSummary[];
  nextToken?: string;
}
export interface ListDomainVerificationsRequest {
  maxResults?: number;
  nextToken?: string;
}
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
export type DomainVerificationList = DomainVerificationSummary[];
export interface ListDomainVerificationsResponse {
  items: DomainVerificationSummary[];
  nextToken?: string;
}
export interface ListListenersRequest {
  serviceIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListenerSummary {
  arn?: string;
  id?: string;
  name?: string;
  protocol?: string;
  port?: number;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export type ListenerSummaryList = ListenerSummary[];
export interface ListListenersResponse {
  items: ListenerSummary[];
  nextToken?: string;
}
export interface ListResourceConfigurationsRequest {
  resourceGatewayIdentifier?: string;
  resourceConfigurationGroupIdentifier?: string;
  domainVerificationIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ResourceConfigurationSummary {
  id?: string;
  name?: string;
  arn?: string;
  resourceGatewayId?: string;
  resourceConfigurationGroupId?: string;
  type?: ResourceConfigurationType;
  status?: string;
  amazonManaged?: boolean;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  customDomainName?: string;
  domainVerificationId?: string;
  groupDomain?: string;
}
export type ResourceConfigurationSummaryList = ResourceConfigurationSummary[];
export interface ListResourceConfigurationsResponse {
  items?: ResourceConfigurationSummary[];
  nextToken?: string;
}
export type VpcEndpointOwner = string;
export interface ListResourceEndpointAssociationsRequest {
  resourceConfigurationIdentifier: string;
  resourceEndpointAssociationIdentifier?: string;
  vpcEndpointId?: string;
  vpcEndpointOwner?: string;
  maxResults?: number;
  nextToken?: string;
}
export type PayerResponsibilityScope = "ResourceGatewayCharges" | (string & {});
export type PayerResponsibilityPayer =
  | "VpcEndpointAccount"
  | "ResourceGatewayAccount"
  | (string & {});
export interface PayerResponsibilityEntry {
  scope?: PayerResponsibilityScope;
  payerResponsibilityType?: PayerResponsibilityPayer;
}
export type PayerResponsibilityList = PayerResponsibilityEntry[];
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
  payerResponsibility?: PayerResponsibilityEntry[];
}
export type ResourceEndpointAssociationList = ResourceEndpointAssociationSummary[];
export interface ListResourceEndpointAssociationsResponse {
  items: ResourceEndpointAssociationSummary[];
  nextToken?: string;
}
export interface ListResourceGatewaysRequest {
  maxResults?: number;
  nextToken?: string;
}
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
  resourceConfigDnsResolution?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export type ResourceGatewayList = ResourceGatewaySummary[];
export interface ListResourceGatewaysResponse {
  items?: ResourceGatewaySummary[];
  nextToken?: string;
}
export interface ListRulesRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface RuleSummary {
  arn?: string;
  id?: string;
  name?: string;
  isDefault?: boolean;
  priority?: number;
  createdAt?: Date;
  lastUpdatedAt?: Date;
}
export type RuleSummaryList = RuleSummary[];
export interface ListRulesResponse {
  items: RuleSummary[];
  nextToken?: string;
}
export interface ListServiceNetworkResourceAssociationsRequest {
  serviceNetworkIdentifier?: string;
  resourceConfigurationIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
  includeChildren?: boolean;
}
export type ServiceNetworkArnWithoutRegex = string;
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
export type ServiceNetworkResourceAssociationList = ServiceNetworkResourceAssociationSummary[];
export interface ListServiceNetworkResourceAssociationsResponse {
  items: ServiceNetworkResourceAssociationSummary[];
  nextToken?: string;
}
export interface ListServiceNetworksRequest {
  maxResults?: number;
  nextToken?: string;
}
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
export type ServiceNetworkList = ServiceNetworkSummary[];
export interface ListServiceNetworksResponse {
  items: ServiceNetworkSummary[];
  nextToken?: string;
}
export interface ListServiceNetworkServiceAssociationsRequest {
  serviceNetworkIdentifier?: string;
  serviceIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
}
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
export type ServiceNetworkServiceAssociationList = ServiceNetworkServiceAssociationSummary[];
export interface ListServiceNetworkServiceAssociationsResponse {
  items: ServiceNetworkServiceAssociationSummary[];
  nextToken?: string;
}
export interface ListServiceNetworkVpcAssociationsRequest {
  serviceNetworkIdentifier?: string;
  vpcIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
}
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
export type ServiceNetworkVpcAssociationList = ServiceNetworkVpcAssociationSummary[];
export interface ListServiceNetworkVpcAssociationsResponse {
  items: ServiceNetworkVpcAssociationSummary[];
  nextToken?: string;
}
export interface ListServiceNetworkVpcEndpointAssociationsRequest {
  serviceNetworkIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ServiceNetworkEndpointAssociation {
  vpcEndpointId?: string;
  vpcId?: string;
  vpcEndpointOwnerId?: string;
  id?: string;
  state?: string;
  serviceNetworkArn?: string;
  createdAt?: Date;
}
export type ServiceNetworkVpcEndpointAssociationList = ServiceNetworkEndpointAssociation[];
export interface ListServiceNetworkVpcEndpointAssociationsResponse {
  items: ServiceNetworkEndpointAssociation[];
  nextToken?: string;
}
export interface ListServicesRequest {
  maxResults?: number;
  nextToken?: string;
}
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
export type ServiceList = ServiceSummary[];
export interface ListServicesResponse {
  items?: ServiceSummary[];
  nextToken?: string;
}
export type Arn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListTargetGroupsRequest {
  maxResults?: number;
  nextToken?: string;
  vpcIdentifier?: string;
  targetGroupType?: string;
}
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
export type TargetGroupList = TargetGroupSummary[];
export interface ListTargetGroupsResponse {
  items?: TargetGroupSummary[];
  nextToken?: string;
}
export interface ListTargetsRequest {
  targetGroupIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  targets?: Target[];
}
export type TargetStatus = string;
export interface TargetSummary {
  id?: string;
  port?: number;
  status?: string;
  reasonCode?: string;
}
export type TargetSummaryList = TargetSummary[];
export interface ListTargetsResponse {
  items: TargetSummary[];
  nextToken?: string;
}
export interface PutAuthPolicyRequest {
  resourceIdentifier: string;
  policy: string;
}
export interface PutAuthPolicyResponse {
  policy?: string;
  state?: string;
}
export interface PutResourcePolicyRequest {
  resourceArn: string;
  policy: string;
}
export interface PutResourcePolicyResponse {}
export interface RegisterTargetsRequest {
  targetGroupIdentifier: string;
  targets: Target[];
}
export interface RegisterTargetsResponse {
  successful?: Target[];
  unsuccessful?: TargetFailure[];
}
export interface StartDomainVerificationRequest {
  clientToken?: string;
  domainName: string;
  tags?: { [key: string]: string | undefined };
}
export interface StartDomainVerificationResponse {
  id: string;
  arn: string;
  domainName: string;
  status: string;
  txtMethodConfig?: TxtMethodConfig;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAccessLogSubscriptionRequest {
  accessLogSubscriptionIdentifier: string;
  destinationArn: string;
}
export interface UpdateAccessLogSubscriptionResponse {
  id: string;
  arn: string;
  resourceId: string;
  resourceArn: string;
  destinationArn: string;
}
export interface UpdateListenerRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
  defaultAction: RuleAction;
}
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
export interface UpdateResourceConfigurationRequest {
  resourceConfigurationIdentifier: string;
  resourceConfigurationDefinition?: ResourceConfigurationDefinition;
  allowAssociationToShareableServiceNetwork?: boolean;
  portRanges?: string[];
}
export interface UpdateResourceConfigurationResponse {
  id?: string;
  name?: string;
  arn?: string;
  resourceGatewayId?: string;
  resourceConfigurationGroupId?: string;
  type?: ResourceConfigurationType;
  portRanges?: string[];
  allowAssociationToShareableServiceNetwork?: boolean;
  protocol?: ProtocolType;
  status?: string;
  resourceConfigurationDefinition?: ResourceConfigurationDefinition;
}
export interface UpdateResourceGatewayRequest {
  resourceGatewayIdentifier: string;
  securityGroupIds?: string[];
}
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
export interface UpdateRuleRequest {
  serviceIdentifier: string;
  listenerIdentifier: string;
  ruleIdentifier: string;
  match?: RuleMatch;
  priority?: number;
  action?: RuleAction;
}
export interface UpdateRuleResponse {
  arn?: string;
  id?: string;
  name?: string;
  isDefault?: boolean;
  match?: RuleMatch;
  priority?: number;
  action?: RuleAction;
}
export interface UpdateServiceRequest {
  serviceIdentifier: string;
  certificateArn?: string;
  authType?: string;
  idleTimeoutSeconds?: number;
}
export interface UpdateServiceResponse {
  id?: string;
  arn?: string;
  name?: string;
  customDomainName?: string;
  certificateArn?: string;
  authType?: string;
  idleTimeoutSeconds?: number;
}
export interface UpdateServiceNetworkRequest {
  serviceNetworkIdentifier: string;
  authType: string;
}
export interface UpdateServiceNetworkResponse {
  id?: string;
  name?: string;
  arn?: string;
  authType?: string;
}
export interface UpdateServiceNetworkVpcAssociationRequest {
  serviceNetworkVpcAssociationIdentifier: string;
  securityGroupIds?: string[];
  privateDnsEnabled?: boolean;
  dnsOptions?: DnsOptions;
}
export interface UpdateServiceNetworkVpcAssociationResponse {
  id?: string;
  arn?: string;
  status?: string;
  createdBy?: string;
  securityGroupIds?: string[];
  privateDnsEnabled?: boolean;
  dnsOptions?: DnsOptions;
}
export interface UpdateTargetGroupRequest {
  targetGroupIdentifier: string;
  healthCheck: HealthCheckConfig;
}
export interface UpdateTargetGroupResponse {
  id?: string;
  arn?: string;
  name?: string;
  type?: string;
  config?: TargetGroupConfig;
  status?: string;
}
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(618, __c77, 2) as any as S.Schema<BatchUpdateRuleRequest>,
  output: __S(622, __c77, 6) as any as S.Schema<BatchUpdateRuleResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateRule",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(728, __c91, 0) as any as S.Schema<CreateAccessLogSubscriptionRequest>,
  output: __S(729, __c91, 1) as any as S.Schema<CreateAccessLogSubscriptionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAccessLogSubscription",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(744, __c93, 0) as any as S.Schema<CreateListenerRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<CreateListenerResponse>,
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
  operationName: "CreateListener",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateResourceConfigurationRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateResourceConfigurationResponse>,
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
  operationName: "CreateResourceConfiguration",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<CreateResourceGatewayRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<CreateResourceGatewayResponse>,
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
  operationName: "CreateResourceGateway",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<CreateRuleRequest>,
  output: __S(33, __c4, 1) as any as S.Schema<CreateRuleResponse>,
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
  operationName: "CreateRule",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<CreateServiceRequest>,
  output: __S(41, __c5, 1) as any as S.Schema<CreateServiceResponse>,
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
  operationName: "CreateService",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c7, 0) as any as S.Schema<CreateServiceNetworkRequest>,
  output: __S(57, __c7, 1) as any as S.Schema<CreateServiceNetworkResponse>,
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
  operationName: "CreateServiceNetwork",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(72, __c9, 0) as any as S.Schema<CreateServiceNetworkResourceAssociationRequest>,
  output: __S(73, __c9, 1) as any as S.Schema<CreateServiceNetworkResourceAssociationResponse>,
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
  operationName: "CreateServiceNetworkResourceAssociation",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<CreateServiceNetworkServiceAssociationRequest>,
  output: __S(81, __c10, 1) as any as S.Schema<CreateServiceNetworkServiceAssociationResponse>,
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
  operationName: "CreateServiceNetworkServiceAssociation",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c11, 0) as any as S.Schema<CreateServiceNetworkVpcAssociationRequest>,
  output: __S(89, __c11, 1) as any as S.Schema<CreateServiceNetworkVpcAssociationResponse>,
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
  operationName: "CreateServiceNetworkVpcAssociation",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<CreateTargetGroupRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<CreateTargetGroupResponse>,
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
  operationName: "CreateTargetGroup",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<DeleteAccessLogSubscriptionRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DeleteAccessLogSubscriptionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessLogSubscription",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<DeleteAuthPolicyRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DeleteAuthPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAuthPolicy",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<DeleteDomainVerificationRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DeleteDomainVerificationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainVerification",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<DeleteListenerRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DeleteListenerResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteListener",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<DeleteResourceConfigurationRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DeleteResourceConfigurationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceConfiguration",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<DeleteResourceEndpointAssociationRequest>,
  output: __S(177, __c22, 1) as any as S.Schema<DeleteResourceEndpointAssociationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceEndpointAssociation",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<DeleteResourceGatewayRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<DeleteResourceGatewayResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceGateway",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<DeleteRuleRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DeleteRuleResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRule",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<DeleteServiceRequest>,
  output: __S(192, __c24, 0) as any as S.Schema<DeleteServiceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteService",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<DeleteServiceNetworkRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<DeleteServiceNetworkResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceNetwork",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<DeleteServiceNetworkResourceAssociationRequest>,
  output: __S(240, __c30, 0) as any as S.Schema<DeleteServiceNetworkResourceAssociationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceNetworkResourceAssociation",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<DeleteServiceNetworkServiceAssociationRequest>,
  output: __S(256, __c32, 0) as any as S.Schema<DeleteServiceNetworkServiceAssociationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceNetworkServiceAssociation",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<DeleteServiceNetworkVpcAssociationRequest>,
  output: __S(256, __c32, 0) as any as S.Schema<DeleteServiceNetworkVpcAssociationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceNetworkVpcAssociation",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c34, 0) as any as S.Schema<DeleteTargetGroupRequest>,
  output: __S(240, __c30, 0) as any as S.Schema<DeleteTargetGroupResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTargetGroup",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<DeregisterTargetsRequest>,
  output: __S(298, __c37, 2) as any as S.Schema<DeregisterTargetsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterTargets",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c38, 0) as any as S.Schema<GetAccessLogSubscriptionRequest>,
  output: __S(312, __c39, 0) as any as S.Schema<GetAccessLogSubscriptionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessLogSubscription",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<GetAuthPolicyRequest>,
  output: __S(321, __c40, 1) as any as S.Schema<GetAuthPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAuthPolicy",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<GetDomainVerificationRequest>,
  output: __S(336, __c42, 0) as any as S.Schema<GetDomainVerificationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainVerification",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c44, 0) as any as S.Schema<GetListenerRequest>,
  output: __S(353, __c44, 1) as any as S.Schema<GetListenerResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetListener",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<GetResourceConfigurationRequest>,
  output: __S(361, __c45, 1) as any as S.Schema<GetResourceConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceConfiguration",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c46, 0) as any as S.Schema<GetResourceGatewayRequest>,
  output: __S(369, __c46, 1) as any as S.Schema<GetResourceGatewayResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceGateway",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(376, __c47, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(377, __c47, 1) as any as S.Schema<GetResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c48, 0) as any as S.Schema<GetRuleRequest>,
  output: __S(385, __c48, 1) as any as S.Schema<GetRuleResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRule",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(392, __c49, 0) as any as S.Schema<GetServiceRequest>,
  output: __S(393, __c49, 1) as any as S.Schema<GetServiceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetService",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c50, 0) as any as S.Schema<GetServiceNetworkRequest>,
  output: __S(401, __c50, 1) as any as S.Schema<GetServiceNetworkResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceNetwork",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(408, __c51, 0) as any as S.Schema<GetServiceNetworkResourceAssociationRequest>,
  output: __S(409, __c51, 1) as any as S.Schema<GetServiceNetworkResourceAssociationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceNetworkResourceAssociation",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c52, 0) as any as S.Schema<GetServiceNetworkServiceAssociationRequest>,
  output: __S(417, __c52, 1) as any as S.Schema<GetServiceNetworkServiceAssociationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceNetworkServiceAssociation",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(424, __c53, 0) as any as S.Schema<GetServiceNetworkVpcAssociationRequest>,
  output: __S(425, __c53, 1) as any as S.Schema<GetServiceNetworkVpcAssociationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetServiceNetworkVpcAssociation",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c54, 0) as any as S.Schema<GetTargetGroupRequest>,
  output: __S(433, __c54, 1) as any as S.Schema<GetTargetGroupResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTargetGroup",
}));

export type ListAccessLogSubscriptionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the access log subscriptions for the specified service network or service.
 */
export const listAccessLogSubscriptions: API.PaginatedOperationMethod<
  ListAccessLogSubscriptionsRequest,
  ListAccessLogSubscriptionsResponse,
  ListAccessLogSubscriptionsError,
  Credentials | HttpClient.HttpClient,
  AccessLogSubscriptionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(440, __c55, 0) as any as S.Schema<ListAccessLogSubscriptionsRequest>,
  output: __S(442, __c55, 2) as any as S.Schema<ListAccessLogSubscriptionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessLogSubscriptions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

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
export const listDomainVerifications: API.PaginatedOperationMethod<
  ListDomainVerificationsRequest,
  ListDomainVerificationsResponse,
  ListDomainVerificationsError,
  Credentials | HttpClient.HttpClient,
  DomainVerificationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(448, __c56, 0) as any as S.Schema<ListDomainVerificationsRequest>,
  output: __S(450, __c56, 2) as any as S.Schema<ListDomainVerificationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainVerifications",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

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
export const listListeners: API.PaginatedOperationMethod<
  ListListenersRequest,
  ListListenersResponse,
  ListListenersError,
  Credentials | HttpClient.HttpClient,
  ListenerSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(456, __c57, 0) as any as S.Schema<ListListenersRequest>,
  output: __S(459, __c57, 3) as any as S.Schema<ListListenersResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListListeners",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourceConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the resource configurations owned by or shared with this account.
 */
export const listResourceConfigurations: API.PaginatedOperationMethod<
  ListResourceConfigurationsRequest,
  ListResourceConfigurationsResponse,
  ListResourceConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ResourceConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(464, __c58, 0) as any as S.Schema<ListResourceConfigurationsRequest>,
  output: __S(467, __c58, 3) as any as S.Schema<ListResourceConfigurationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourceEndpointAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the associations for the specified VPC endpoint.
 */
export const listResourceEndpointAssociations: API.PaginatedOperationMethod<
  ListResourceEndpointAssociationsRequest,
  ListResourceEndpointAssociationsResponse,
  ListResourceEndpointAssociationsError,
  Credentials | HttpClient.HttpClient,
  ResourceEndpointAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(472, __c59, 0) as any as S.Schema<ListResourceEndpointAssociationsRequest>,
  output: __S(477, __c59, 5) as any as S.Schema<ListResourceEndpointAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceEndpointAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourceGatewaysError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the resource gateways that you own or that were shared with you.
 */
export const listResourceGateways: API.PaginatedOperationMethod<
  ListResourceGatewaysRequest,
  ListResourceGatewaysResponse,
  ListResourceGatewaysError,
  Credentials | HttpClient.HttpClient,
  ResourceGatewaySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c60, 0) as any as S.Schema<ListResourceGatewaysRequest>,
  output: __S(483, __c60, 3) as any as S.Schema<ListResourceGatewaysResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceGateways",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

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
export const listRules: API.PaginatedOperationMethod<
  ListRulesRequest,
  ListRulesResponse,
  ListRulesError,
  Credentials | HttpClient.HttpClient,
  RuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(488, __c61, 0) as any as S.Schema<ListRulesRequest>,
  output: __S(491, __c61, 3) as any as S.Schema<ListRulesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceNetworkResourceAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the associations between a service network and a resource configuration.
 */
export const listServiceNetworkResourceAssociations: API.PaginatedOperationMethod<
  ListServiceNetworkResourceAssociationsRequest,
  ListServiceNetworkResourceAssociationsResponse,
  ListServiceNetworkResourceAssociationsError,
  Credentials | HttpClient.HttpClient,
  ServiceNetworkResourceAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c62, 0) as any as S.Schema<ListServiceNetworkResourceAssociationsRequest>,
  output: __S(499, __c62, 3) as any as S.Schema<ListServiceNetworkResourceAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceNetworkResourceAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceNetworksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the service networks owned by or shared with this account. The account ID in the ARN shows which account owns the service network.
 */
export const listServiceNetworks: API.PaginatedOperationMethod<
  ListServiceNetworksRequest,
  ListServiceNetworksResponse,
  ListServiceNetworksError,
  Credentials | HttpClient.HttpClient,
  ServiceNetworkSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(504, __c63, 0) as any as S.Schema<ListServiceNetworksRequest>,
  output: __S(507, __c63, 3) as any as S.Schema<ListServiceNetworksResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceNetworks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

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
export const listServiceNetworkServiceAssociations: API.PaginatedOperationMethod<
  ListServiceNetworkServiceAssociationsRequest,
  ListServiceNetworkServiceAssociationsResponse,
  ListServiceNetworkServiceAssociationsError,
  Credentials | HttpClient.HttpClient,
  ServiceNetworkServiceAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c64, 0) as any as S.Schema<ListServiceNetworkServiceAssociationsRequest>,
  output: __S(515, __c64, 3) as any as S.Schema<ListServiceNetworkServiceAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceNetworkServiceAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceNetworkVpcAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the associations between a service network and a VPC. You can filter the list either by VPC or service network. You must provide either the ID of the service network identifier or the ID of the VPC.
 */
export const listServiceNetworkVpcAssociations: API.PaginatedOperationMethod<
  ListServiceNetworkVpcAssociationsRequest,
  ListServiceNetworkVpcAssociationsResponse,
  ListServiceNetworkVpcAssociationsError,
  Credentials | HttpClient.HttpClient,
  ServiceNetworkVpcAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(520, __c65, 0) as any as S.Schema<ListServiceNetworkVpcAssociationsRequest>,
  output: __S(523, __c65, 3) as any as S.Schema<ListServiceNetworkVpcAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceNetworkVpcAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceNetworkVpcEndpointAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the associations between a service network and a VPC endpoint.
 */
export const listServiceNetworkVpcEndpointAssociations: API.PaginatedOperationMethod<
  ListServiceNetworkVpcEndpointAssociationsRequest,
  ListServiceNetworkVpcEndpointAssociationsResponse,
  ListServiceNetworkVpcEndpointAssociationsError,
  Credentials | HttpClient.HttpClient,
  ServiceNetworkEndpointAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(536, __c67, 0) as any as S.Schema<ListServiceNetworkVpcEndpointAssociationsRequest>,
  output: __S(539, __c67, 3) as any as S.Schema<ListServiceNetworkVpcEndpointAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceNetworkVpcEndpointAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the services owned by the caller account or shared with the caller account.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesRequest,
  ListServicesResponse,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  ServiceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c68, 0) as any as S.Schema<ListServicesRequest>,
  output: __S(547, __c68, 3) as any as S.Schema<ListServicesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(552, __c69, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(553, __c69, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
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
export const listTargetGroups: API.PaginatedOperationMethod<
  ListTargetGroupsRequest,
  ListTargetGroupsResponse,
  ListTargetGroupsError,
  Credentials | HttpClient.HttpClient,
  TargetGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(560, __c70, 0) as any as S.Schema<ListTargetGroupsRequest>,
  output: __S(563, __c70, 3) as any as S.Schema<ListTargetGroupsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargetGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTargetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the targets for the target group. By default, all targets are included. You can use this API to check the health status of targets. You can also U+FB01lter the results by target.
 */
export const listTargets: API.PaginatedOperationMethod<
  ListTargetsRequest,
  ListTargetsResponse,
  ListTargetsError,
  Credentials | HttpClient.HttpClient,
  TargetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(568, __c71, 0) as any as S.Schema<ListTargetsRequest>,
  output: __S(571, __c71, 3) as any as S.Schema<ListTargetsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c72, 0) as any as S.Schema<PutAuthPolicyRequest>,
  output: __S(577, __c72, 1) as any as S.Schema<PutAuthPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAuthPolicy",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(584, __c73, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<PutResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c74, 0) as any as S.Schema<RegisterTargetsRequest>,
  output: __S(298, __c37, 2) as any as S.Schema<RegisterTargetsResponse>,
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
  operationName: "RegisterTargets",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(600, __c75, 0) as any as S.Schema<StartDomainVerificationRequest>,
  output: __S(601, __c75, 1) as any as S.Schema<StartDomainVerificationResponse>,
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
  operationName: "StartDomainVerification",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c76, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(648, __c81, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(136, __c17, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c82, 0) as any as S.Schema<UpdateAccessLogSubscriptionRequest>,
  output: __S(657, __c82, 1) as any as S.Schema<UpdateAccessLogSubscriptionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccessLogSubscription",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(664, __c83, 0) as any as S.Schema<UpdateListenerRequest>,
  output: __S(752, __c94, 0) as any as S.Schema<UpdateListenerResponse>,
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
  operationName: "UpdateListener",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c84, 0) as any as S.Schema<UpdateResourceConfigurationRequest>,
  output: __S(673, __c84, 1) as any as S.Schema<UpdateResourceConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceConfiguration",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(680, __c85, 0) as any as S.Schema<UpdateResourceGatewayRequest>,
  output: __S(681, __c85, 1) as any as S.Schema<UpdateResourceGatewayResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResourceGateway",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c86, 0) as any as S.Schema<UpdateRuleRequest>,
  output: __S(632, __c79, 0) as any as S.Schema<UpdateRuleResponse>,
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
  operationName: "UpdateRule",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(696, __c87, 0) as any as S.Schema<UpdateServiceRequest>,
  output: __S(697, __c87, 1) as any as S.Schema<UpdateServiceResponse>,
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
  operationName: "UpdateService",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c88, 0) as any as S.Schema<UpdateServiceNetworkRequest>,
  output: __S(705, __c88, 1) as any as S.Schema<UpdateServiceNetworkResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceNetwork",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(712, __c89, 0) as any as S.Schema<UpdateServiceNetworkVpcAssociationRequest>,
  output: __S(713, __c89, 1) as any as S.Schema<UpdateServiceNetworkVpcAssociationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceNetworkVpcAssociation",
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
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c90, 0) as any as S.Schema<UpdateTargetGroupRequest>,
  output: __S(120, __c15, 0) as any as S.Schema<UpdateTargetGroupResponse>,
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
  operationName: "UpdateTargetGroup",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          portRanges: S.optional(__S(8, __c1, 0)),
          protocol: S.optional(S.String),
          resourceGatewayIdentifier: S.optional(S.String),
          resourceConfigurationGroupIdentifier: S.optional(S.String),
          resourceConfigurationDefinition: S.optional(__S(20, __c2, 4)),
          allowAssociationToShareableServiceNetwork: S.optional(S.Boolean),
          customDomainName: S.optional(S.String),
          groupDomain: S.optional(S.String),
          domainVerificationIdentifier: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(736, __c92, 0)),
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
      ).annotate({ identifier: "CreateResourceConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          resourceGatewayId: S.optional(S.String),
          resourceConfigurationGroupId: S.optional(S.String),
          type: S.optional(S.String),
          portRanges: S.optional(__S(8, __c1, 0)),
          protocol: S.optional(S.String),
          status: S.optional(S.String),
          resourceConfigurationDefinition: S.optional(__S(20, __c2, 4)),
          allowAssociationToShareableServiceNetwork: S.optional(S.Boolean),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          failureReason: S.optional(S.String),
          customDomainName: S.optional(S.String),
          domainVerificationId: S.optional(S.String),
          groupDomain: S.optional(S.String),
          domainVerificationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateResourceConfigurationResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainName: S.optional(S.String), ipAddressType: S.optional(S.String) }),
      ).annotate({ identifier: "DnsResource" });
    case 1:
      return S.suspend(() => S.Struct({ ipAddress: S.optional(S.String) })).annotate({
        identifier: "IpResource",
      });
    case 2:
      return S.suspend(() => S.Struct({ arn: S.optional(S.String) })).annotate({
        identifier: "ArnResource",
      });
    case 3:
      return S.suspend(() => S.Struct({ cidrRanges: S.optional(__S(8, __c1, 0)) })).annotate({
        identifier: "CidrResource",
      });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ dnsResource: __S(16, __c2, 0) }),
        /*@__PURE__*/ S.Struct({ ipResource: __S(17, __c2, 1) }),
        /*@__PURE__*/ S.Struct({ arnResource: __S(18, __c2, 2) }),
        /*@__PURE__*/ S.Struct({ cidrResource: __S(19, __c2, 3) }),
      ]);
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          name: S.String,
          vpcIdentifier: S.optional(S.String),
          subnetIds: S.optional(__S(8, __c1, 0)),
          securityGroupIds: S.optional(__S(8, __c1, 0)),
          ipAddressType: S.optional(S.String),
          ipv4AddressesPerEni: S.optional(S.Number),
          resourceConfigDnsResolution: S.optional(S.String),
          tags: S.optional(__S(736, __c92, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/resourcegateways" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateResourceGatewayRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          id: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
          vpcIdentifier: S.optional(S.String),
          subnetIds: S.optional(__S(8, __c1, 0)),
          securityGroupIds: S.optional(__S(8, __c1, 0)),
          ipAddressType: S.optional(S.String),
          ipv4AddressesPerEni: S.optional(S.Number),
          resourceConfigDnsResolution: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateResourceGatewayResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
          listenerIdentifier: S.String.pipe(T.HttpLabel("listenerIdentifier")),
          name: S.String,
          match: __S(630, __c78, 6),
          priority: S.Number,
          action: __S(644, __c80, 4),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(736, __c92, 0)),
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
      ).annotate({ identifier: "CreateRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          id: S.optional(S.String),
          name: S.optional(S.String),
          match: S.optional(__S(630, __c78, 6)),
          priority: S.optional(S.Number),
          action: S.optional(__S(644, __c80, 4)),
        }),
      ).annotate({ identifier: "CreateRuleResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          name: S.String,
          tags: S.optional(__S(736, __c92, 0)),
          customDomainName: S.optional(S.String),
          certificateArn: S.optional(S.String),
          authType: S.optional(S.String),
          idleTimeoutSeconds: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/services" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateServiceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          customDomainName: S.optional(S.String),
          certificateArn: S.optional(S.String),
          status: S.optional(S.String),
          authType: S.optional(S.String),
          idleTimeoutSeconds: S.optional(S.Number),
          dnsEntry: S.optional(__S(48, __c6, 0)),
        }),
      ).annotate({ identifier: "CreateServiceResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainName: S.optional(S.String), hostedZoneId: S.optional(S.String) }),
      ).annotate({ identifier: "DnsEntry" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          name: S.String,
          authType: S.optional(S.String),
          tags: S.optional(__S(736, __c92, 0)),
          sharingConfig: S.optional(__S(64, __c8, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/servicenetworks" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateServiceNetworkRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          sharingConfig: S.optional(__S(64, __c8, 0)),
          authType: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateServiceNetworkResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ enabled: S.optional(S.Boolean) })).annotate({
        identifier: "SharingConfig",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          resourceConfigurationIdentifier: S.String,
          serviceNetworkIdentifier: S.String,
          privateDnsEnabled: S.optional(S.Boolean),
          tags: S.optional(__S(736, __c92, 0)),
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
      ).annotate({ identifier: "CreateServiceNetworkResourceAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
          createdBy: S.optional(S.String),
          privateDnsEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CreateServiceNetworkResourceAssociationResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          serviceIdentifier: S.String,
          serviceNetworkIdentifier: S.String,
          tags: S.optional(__S(736, __c92, 0)),
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
      ).annotate({ identifier: "CreateServiceNetworkServiceAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          status: S.optional(S.String),
          arn: S.optional(S.String),
          createdBy: S.optional(S.String),
          customDomainName: S.optional(S.String),
          dnsEntry: S.optional(__S(48, __c6, 0)),
        }),
      ).annotate({ identifier: "CreateServiceNetworkServiceAssociationResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          serviceNetworkIdentifier: S.String,
          vpcIdentifier: S.String,
          privateDnsEnabled: S.optional(S.Boolean),
          securityGroupIds: S.optional(__S(8, __c1, 0)),
          tags: S.optional(__S(736, __c92, 0)),
          dnsOptions: S.optional(__S(96, __c12, 0)),
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
      ).annotate({ identifier: "CreateServiceNetworkVpcAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          status: S.optional(S.String),
          arn: S.optional(S.String),
          createdBy: S.optional(S.String),
          securityGroupIds: S.optional(__S(8, __c1, 0)),
          privateDnsEnabled: S.optional(S.Boolean),
          dnsOptions: S.optional(__S(96, __c12, 0)),
        }),
      ).annotate({ identifier: "CreateServiceNetworkVpcAssociationResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          privateDnsPreference: S.optional(S.String),
          privateDnsSpecifiedDomains: S.optional(__S(8, __c1, 0)),
        }),
      ).annotate({ identifier: "DnsOptions" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          config: S.optional(__S(114, __c14, 2)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(736, __c92, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/targetgroups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateTargetGroupRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ httpCode: S.String })]);
    case 1:
      return S.suspend(() =>
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
          matcher: S.optional(__S(112, __c14, 0)),
        }),
      ).annotate({ identifier: "HealthCheckConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          port: S.optional(S.Number),
          protocol: S.optional(S.String),
          protocolVersion: S.optional(S.String),
          ipAddressType: S.optional(S.String),
          vpcIdentifier: S.optional(S.String),
          healthCheck: S.optional(__S(113, __c14, 1)),
          lambdaEventStructureVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "TargetGroupConfig" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          type: S.optional(S.String),
          config: S.optional(__S(114, __c14, 2)),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateTargetGroupResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DeleteAccessLogSubscriptionRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteAccessLogSubscriptionResponse",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceIdentifier: S.String.pipe(T.HttpLabel("resourceIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/authpolicy/{resourceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAuthPolicyRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainVerificationIdentifier: S.String.pipe(T.HttpLabel("domainVerificationIdentifier")),
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
      ).annotate({ identifier: "DeleteDomainVerificationRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DeleteListenerRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DeleteResourceConfigurationRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DeleteResourceEndpointAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          resourceConfigurationId: S.optional(S.String),
          resourceConfigurationArn: S.optional(S.String),
          vpcEndpointId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteResourceEndpointAssociationResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceGatewayIdentifier: S.String.pipe(T.HttpLabel("resourceGatewayIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/resourcegateways/{resourceGatewayIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourceGatewayRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteResourceGatewayResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DeleteRuleRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/services/{serviceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteServiceRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceNetworkIdentifier: S.String.pipe(T.HttpLabel("serviceNetworkIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/servicenetworks/{serviceNetworkIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteServiceNetworkRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DeleteServiceNetworkResourceAssociationRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteServiceNetworkResourceAssociationResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DeleteServiceNetworkServiceAssociationRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          status: S.optional(S.String),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteServiceNetworkServiceAssociationResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "DeleteServiceNetworkVpcAssociationRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targetGroupIdentifier: S.String.pipe(T.HttpLabel("targetGroupIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/targetgroups/{targetGroupIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTargetGroupRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targetGroupIdentifier: S.String.pipe(T.HttpLabel("targetGroupIdentifier")),
          targets: __S(289, __c36, 1),
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
      ).annotate({ identifier: "DeregisterTargetsRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ id: S.String, port: S.optional(S.Number) })).annotate({
        identifier: "Target",
      });
    case 1:
      return S.Array(__S(288, __c36, 0));
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          port: S.optional(S.Number),
          failureCode: S.optional(S.String),
          failureMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "TargetFailure" });
    case 1:
      return S.Array(__S(296, __c37, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          successful: S.optional(__S(289, __c36, 1)),
          unsuccessful: S.optional(__S(297, __c37, 1)),
        }),
      ).annotate({ identifier: "DeregisterTargetsResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "GetAccessLogSubscriptionRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "GetAccessLogSubscriptionResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceIdentifier: S.String.pipe(T.HttpLabel("resourceIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/authpolicy/{resourceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAuthPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policy: S.optional(S.String),
          state: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetAuthPolicyResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainVerificationIdentifier: S.String.pipe(T.HttpLabel("domainVerificationIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/domainverifications/{domainVerificationIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDomainVerificationRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          domainName: S.String,
          status: S.String,
          txtMethodConfig: S.optional(__S(344, __c43, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastVerifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          tags: S.optional(__S(736, __c92, 0)),
        }),
      ).annotate({ identifier: "GetDomainVerificationResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ value: S.String, name: S.String })).annotate({
        identifier: "TxtMethodConfig",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "GetListenerRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          id: S.optional(S.String),
          name: S.optional(S.String),
          protocol: S.optional(S.String),
          port: S.optional(S.Number),
          serviceArn: S.optional(S.String),
          serviceId: S.optional(S.String),
          defaultAction: S.optional(__S(644, __c80, 4)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetListenerResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "GetResourceConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          resourceGatewayId: S.optional(S.String),
          resourceConfigurationGroupId: S.optional(S.String),
          type: S.optional(S.String),
          allowAssociationToShareableServiceNetwork: S.optional(S.Boolean),
          portRanges: S.optional(__S(8, __c1, 0)),
          protocol: S.optional(S.String),
          customDomainName: S.optional(S.String),
          status: S.optional(S.String),
          resourceConfigurationDefinition: S.optional(__S(20, __c2, 4)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          amazonManaged: S.optional(S.Boolean),
          failureReason: S.optional(S.String),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          domainVerificationId: S.optional(S.String),
          domainVerificationArn: S.optional(S.String),
          domainVerificationStatus: S.optional(S.String),
          groupDomain: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetResourceConfigurationResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceGatewayIdentifier: S.String.pipe(T.HttpLabel("resourceGatewayIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/resourcegateways/{resourceGatewayIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourceGatewayRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          id: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
          vpcId: S.optional(S.String),
          subnetIds: S.optional(__S(8, __c1, 0)),
          serviceManaged: S.optional(S.Boolean),
          managedBy: S.optional(S.String),
          securityGroupIds: S.optional(__S(8, __c1, 0)),
          ipAddressType: S.optional(S.String),
          ipv4AddressesPerEni: S.optional(S.Number),
          resourceConfigDnsResolution: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetResourceGatewayResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "GetResourcePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ policy: S.optional(S.String) })).annotate({
        identifier: "GetResourcePolicyResponse",
      });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "GetRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          id: S.optional(S.String),
          name: S.optional(S.String),
          isDefault: S.optional(S.Boolean),
          match: S.optional(__S(630, __c78, 6)),
          priority: S.optional(S.Number),
          action: S.optional(__S(644, __c80, 4)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetRuleResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/services/{serviceIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetServiceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          dnsEntry: S.optional(__S(48, __c6, 0)),
          customDomainName: S.optional(S.String),
          certificateArn: S.optional(S.String),
          status: S.optional(S.String),
          authType: S.optional(S.String),
          idleTimeoutSeconds: S.optional(S.Number),
          failureCode: S.optional(S.String),
          failureMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetServiceResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceNetworkIdentifier: S.String.pipe(T.HttpLabel("serviceNetworkIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/servicenetworks/{serviceNetworkIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetServiceNetworkRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          arn: S.optional(S.String),
          authType: S.optional(S.String),
          sharingConfig: S.optional(__S(64, __c8, 0)),
          numberOfAssociatedVPCs: S.optional(S.Number),
          numberOfAssociatedServices: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetServiceNetworkResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "GetServiceNetworkResourceAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
          createdBy: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          resourceConfigurationId: S.optional(S.String),
          resourceConfigurationArn: S.optional(S.String),
          resourceConfigurationName: S.optional(S.String),
          serviceNetworkId: S.optional(S.String),
          serviceNetworkArn: S.optional(S.String),
          serviceNetworkName: S.optional(S.String),
          failureReason: S.optional(S.String),
          failureCode: S.optional(S.String),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          privateDnsEntry: S.optional(__S(48, __c6, 0)),
          privateDnsEnabled: S.optional(S.Boolean),
          dnsEntry: S.optional(__S(48, __c6, 0)),
          isManagedAssociation: S.optional(S.Boolean),
          domainVerificationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetServiceNetworkResourceAssociationResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "GetServiceNetworkServiceAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          status: S.optional(S.String),
          arn: S.optional(S.String),
          createdBy: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          serviceId: S.optional(S.String),
          serviceName: S.optional(S.String),
          serviceArn: S.optional(S.String),
          serviceNetworkId: S.optional(S.String),
          serviceNetworkName: S.optional(S.String),
          serviceNetworkArn: S.optional(S.String),
          dnsEntry: S.optional(__S(48, __c6, 0)),
          customDomainName: S.optional(S.String),
          failureMessage: S.optional(S.String),
          failureCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetServiceNetworkServiceAssociationResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "GetServiceNetworkVpcAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          status: S.optional(S.String),
          arn: S.optional(S.String),
          createdBy: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          serviceNetworkId: S.optional(S.String),
          serviceNetworkName: S.optional(S.String),
          serviceNetworkArn: S.optional(S.String),
          vpcId: S.optional(S.String),
          securityGroupIds: S.optional(__S(8, __c1, 0)),
          privateDnsEnabled: S.optional(S.Boolean),
          failureMessage: S.optional(S.String),
          failureCode: S.optional(S.String),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          dnsOptions: S.optional(__S(96, __c12, 0)),
        }),
      ).annotate({ identifier: "GetServiceNetworkVpcAssociationResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "GetTargetGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          type: S.optional(S.String),
          config: S.optional(__S(114, __c14, 2)),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          status: S.optional(S.String),
          serviceArns: S.optional(__S(8, __c1, 0)),
          failureMessage: S.optional(S.String),
          failureCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetTargetGroupResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListAccessLogSubscriptionsRequest" });
    case 1:
      return S.Array(__S(312, __c39, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: __S(441, __c55, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccessLogSubscriptionsResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListDomainVerificationsRequest" });
    case 1:
      return S.Array(__S(336, __c42, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: __S(449, __c56, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDomainVerificationsResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListListenersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          id: S.optional(S.String),
          name: S.optional(S.String),
          protocol: S.optional(S.String),
          port: S.optional(S.Number),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ListenerSummary" });
    case 2:
      return S.Array(__S(457, __c57, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(458, __c57, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListListenersResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListResourceConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          resourceGatewayId: S.optional(S.String),
          resourceConfigurationGroupId: S.optional(S.String),
          type: S.optional(S.String),
          status: S.optional(S.String),
          amazonManaged: S.optional(S.Boolean),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          customDomainName: S.optional(S.String),
          domainVerificationId: S.optional(S.String),
          groupDomain: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceConfigurationSummary" });
    case 2:
      return S.Array(__S(465, __c58, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(466, __c58, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListResourceConfigurationsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceConfigurationIdentifier: S.String.pipe(
            T.HttpQuery("resourceConfigurationIdentifier"),
          ),
          resourceEndpointAssociationIdentifier: S.optional(S.String).pipe(
            T.HttpQuery("resourceEndpointAssociationIdentifier"),
          ),
          vpcEndpointId: S.optional(S.String).pipe(T.HttpQuery("vpcEndpointId")),
          vpcEndpointOwner: S.optional(S.String).pipe(T.HttpQuery("vpcEndpointOwner")),
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
      ).annotate({ identifier: "ListResourceEndpointAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ scope: S.optional(S.String), payerResponsibilityType: S.optional(S.String) }),
      ).annotate({ identifier: "PayerResponsibilityEntry" });
    case 2:
      return S.Array(__S(473, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          resourceConfigurationId: S.optional(S.String),
          resourceConfigurationArn: S.optional(S.String),
          resourceConfigurationName: S.optional(S.String),
          vpcEndpointId: S.optional(S.String),
          vpcEndpointOwner: S.optional(S.String),
          createdBy: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          payerResponsibility: S.optional(__S(474, __c59, 2)),
        }),
      ).annotate({ identifier: "ResourceEndpointAssociationSummary" });
    case 4:
      return S.Array(__S(475, __c59, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ items: __S(476, __c59, 4), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListResourceEndpointAssociationsResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/resourcegateways" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListResourceGatewaysRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          id: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
          vpcIdentifier: S.optional(S.String),
          subnetIds: S.optional(__S(8, __c1, 0)),
          securityGroupIds: S.optional(__S(8, __c1, 0)),
          ipAddressType: S.optional(S.String),
          ipv4AddressesPerEni: S.optional(S.Number),
          resourceConfigDnsResolution: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ResourceGatewaySummary" });
    case 2:
      return S.Array(__S(481, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(482, __c60, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListResourceGatewaysResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          id: S.optional(S.String),
          name: S.optional(S.String),
          isDefault: S.optional(S.Boolean),
          priority: S.optional(S.Number),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "RuleSummary" });
    case 2:
      return S.Array(__S(489, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(490, __c61, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRulesResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListServiceNetworkResourceAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
          createdBy: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          resourceConfigurationId: S.optional(S.String),
          resourceConfigurationArn: S.optional(S.String),
          resourceConfigurationName: S.optional(S.String),
          serviceNetworkId: S.optional(S.String),
          serviceNetworkArn: S.optional(S.String),
          serviceNetworkName: S.optional(S.String),
          dnsEntry: S.optional(__S(48, __c6, 0)),
          privateDnsEntry: S.optional(__S(48, __c6, 0)),
          isManagedAssociation: S.optional(S.Boolean),
          failureCode: S.optional(S.String),
          privateDnsEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ServiceNetworkResourceAssociationSummary" });
    case 2:
      return S.Array(__S(497, __c62, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(498, __c62, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListServiceNetworkResourceAssociationsResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/servicenetworks" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListServiceNetworksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          numberOfAssociatedVPCs: S.optional(S.Number),
          numberOfAssociatedServices: S.optional(S.Number),
          numberOfAssociatedResourceConfigurations: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ServiceNetworkSummary" });
    case 2:
      return S.Array(__S(505, __c63, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(506, __c63, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListServiceNetworksResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceNetworkIdentifier: S.optional(S.String).pipe(
            T.HttpQuery("serviceNetworkIdentifier"),
          ),
          serviceIdentifier: S.optional(S.String).pipe(T.HttpQuery("serviceIdentifier")),
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
      ).annotate({ identifier: "ListServiceNetworkServiceAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          status: S.optional(S.String),
          arn: S.optional(S.String),
          createdBy: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          serviceId: S.optional(S.String),
          serviceName: S.optional(S.String),
          serviceArn: S.optional(S.String),
          serviceNetworkId: S.optional(S.String),
          serviceNetworkName: S.optional(S.String),
          serviceNetworkArn: S.optional(S.String),
          dnsEntry: S.optional(__S(48, __c6, 0)),
          customDomainName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceNetworkServiceAssociationSummary" });
    case 2:
      return S.Array(__S(513, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(514, __c64, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListServiceNetworkServiceAssociationsResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListServiceNetworkVpcAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
          createdBy: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          serviceNetworkId: S.optional(S.String),
          serviceNetworkName: S.optional(S.String),
          serviceNetworkArn: S.optional(S.String),
          privateDnsEnabled: S.optional(S.Boolean),
          dnsOptions: S.optional(__S(96, __c12, 0)),
          vpcId: S.optional(S.String),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ServiceNetworkVpcAssociationSummary" });
    case 2:
      return S.Array(__S(521, __c65, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(522, __c65, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListServiceNetworkVpcAssociationsResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(528, __c66, 0));
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceNetworkIdentifier: S.String.pipe(T.HttpQuery("serviceNetworkIdentifier")),
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
      ).annotate({ identifier: "ListServiceNetworkVpcEndpointAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vpcEndpointId: S.optional(S.String),
          vpcId: S.optional(S.String),
          vpcEndpointOwnerId: S.optional(S.String),
          id: S.optional(S.String),
          state: S.optional(S.String),
          serviceNetworkArn: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ServiceNetworkEndpointAssociation" });
    case 2:
      return S.Array(__S(537, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(538, __c67, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListServiceNetworkVpcEndpointAssociationsResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/services" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListServicesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          dnsEntry: S.optional(__S(48, __c6, 0)),
          customDomainName: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceSummary" });
    case 2:
      return S.Array(__S(545, __c68, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(546, __c68, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListServicesResponse" });
  }
}
function __c69(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(736, __c92, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          vpcIdentifier: S.optional(S.String).pipe(T.HttpQuery("vpcIdentifier")),
          targetGroupType: S.optional(S.String).pipe(T.HttpQuery("targetGroupType")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/targetgroups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTargetGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          type: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          port: S.optional(S.Number),
          protocol: S.optional(S.String),
          ipAddressType: S.optional(S.String),
          vpcIdentifier: S.optional(S.String),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          status: S.optional(S.String),
          serviceArns: S.optional(__S(8, __c1, 0)),
          lambdaEventStructureVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "TargetGroupSummary" });
    case 2:
      return S.Array(__S(561, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: S.optional(__S(562, __c70, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTargetGroupsResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targetGroupIdentifier: S.String.pipe(T.HttpLabel("targetGroupIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          targets: S.optional(__S(289, __c36, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/targetgroups/{targetGroupIdentifier}/listtargets" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTargetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          port: S.optional(S.Number),
          status: S.optional(S.String),
          reasonCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "TargetSummary" });
    case 2:
      return S.Array(__S(569, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(570, __c71, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTargetsResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "PutAuthPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ policy: S.optional(S.String), state: S.optional(S.String) }),
      ).annotate({ identifier: "PutAuthPolicyResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")), policy: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/resourcepolicy/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targetGroupIdentifier: S.String.pipe(T.HttpLabel("targetGroupIdentifier")),
          targets: __S(289, __c36, 1),
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
      ).annotate({ identifier: "RegisterTargetsRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          domainName: S.String,
          tags: S.optional(__S(736, __c92, 0)),
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
      ).annotate({ identifier: "StartDomainVerificationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          domainName: S.String,
          status: S.String,
          txtMethodConfig: S.optional(__S(344, __c43, 0)),
        }),
      ).annotate({ identifier: "StartDomainVerificationResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(736, __c92, 0),
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
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleIdentifier: S.String,
          match: S.optional(__S(630, __c78, 6)),
          priority: S.optional(S.Number),
          action: S.optional(__S(644, __c80, 4)),
        }),
      ).annotate({ identifier: "RuleUpdate" });
    case 1:
      return S.Array(__S(616, __c77, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
          listenerIdentifier: S.String.pipe(T.HttpLabel("listenerIdentifier")),
          rules: __S(617, __c77, 1),
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
      ).annotate({ identifier: "BatchUpdateRuleRequest" });
    case 3:
      return S.Array(__S(632, __c79, 0));
    case 4:
      return S.suspend(() =>
        S.Struct({
          ruleIdentifier: S.optional(S.String),
          failureCode: S.optional(S.String),
          failureMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuleUpdateFailure" });
    case 5:
      return S.Array(__S(620, __c77, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          successful: S.optional(__S(619, __c77, 3)),
          unsuccessful: S.optional(__S(621, __c77, 5)),
        }),
      ).annotate({ identifier: "BatchUpdateRuleResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ exact: S.String }),
        /*@__PURE__*/ S.Struct({ prefix: S.String }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({ match: __S(624, __c78, 0), caseSensitive: S.optional(S.Boolean) }),
      ).annotate({ identifier: "PathMatch" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ exact: S.String }),
        /*@__PURE__*/ S.Struct({ prefix: S.String }),
        /*@__PURE__*/ S.Struct({ contains: S.String }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          match: __S(626, __c78, 2),
          caseSensitive: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "HeaderMatch" });
    case 4:
      return S.Array(__S(627, __c78, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          method: S.optional(S.String),
          pathMatch: S.optional(__S(625, __c78, 1)),
          headerMatches: S.optional(__S(628, __c78, 4)),
        }),
      ).annotate({ identifier: "HttpMatch" });
    case 6:
      return S.Union([/*@__PURE__*/ S.Struct({ httpMatch: __S(629, __c78, 5) })]);
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          id: S.optional(S.String),
          name: S.optional(S.String),
          isDefault: S.optional(S.Boolean),
          match: S.optional(__S(630, __c78, 6)),
          priority: S.optional(S.Number),
          action: S.optional(__S(644, __c80, 4)),
        }),
      ).annotate({ identifier: "RuleUpdateSuccess" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ targetGroupIdentifier: S.String, weight: S.optional(S.Number) }),
      ).annotate({ identifier: "WeightedTargetGroup" });
    case 1:
      return S.Array(__S(640, __c80, 0));
    case 2:
      return S.suspend(() => S.Struct({ targetGroups: __S(641, __c80, 1) })).annotate({
        identifier: "ForwardAction",
      });
    case 3:
      return S.suspend(() => S.Struct({ statusCode: S.Number })).annotate({
        identifier: "FixedResponseAction",
      });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ forward: __S(642, __c80, 2) }),
        /*@__PURE__*/ S.Struct({ fixedResponse: __S(643, __c80, 3) }),
      ]);
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(8, __c1, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "UpdateAccessLogSubscriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          resourceId: S.String,
          resourceArn: S.String,
          destinationArn: S.String,
        }),
      ).annotate({ identifier: "UpdateAccessLogSubscriptionResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
          listenerIdentifier: S.String.pipe(T.HttpLabel("listenerIdentifier")),
          defaultAction: __S(644, __c80, 4),
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
      ).annotate({ identifier: "UpdateListenerRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceConfigurationIdentifier: S.String.pipe(
            T.HttpLabel("resourceConfigurationIdentifier"),
          ),
          resourceConfigurationDefinition: S.optional(__S(20, __c2, 4)),
          allowAssociationToShareableServiceNetwork: S.optional(S.Boolean),
          portRanges: S.optional(__S(8, __c1, 0)),
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
      ).annotate({ identifier: "UpdateResourceConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          resourceGatewayId: S.optional(S.String),
          resourceConfigurationGroupId: S.optional(S.String),
          type: S.optional(S.String),
          portRanges: S.optional(__S(8, __c1, 0)),
          allowAssociationToShareableServiceNetwork: S.optional(S.Boolean),
          protocol: S.optional(S.String),
          status: S.optional(S.String),
          resourceConfigurationDefinition: S.optional(__S(20, __c2, 4)),
        }),
      ).annotate({ identifier: "UpdateResourceConfigurationResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceGatewayIdentifier: S.String.pipe(T.HttpLabel("resourceGatewayIdentifier")),
          securityGroupIds: S.optional(__S(8, __c1, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/resourcegateways/{resourceGatewayIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateResourceGatewayRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          id: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
          vpcId: S.optional(S.String),
          subnetIds: S.optional(__S(8, __c1, 0)),
          securityGroupIds: S.optional(__S(8, __c1, 0)),
          ipAddressType: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateResourceGatewayResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
          listenerIdentifier: S.String.pipe(T.HttpLabel("listenerIdentifier")),
          ruleIdentifier: S.String.pipe(T.HttpLabel("ruleIdentifier")),
          match: S.optional(__S(630, __c78, 6)),
          priority: S.optional(S.Number),
          action: S.optional(__S(644, __c80, 4)),
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
      ).annotate({ identifier: "UpdateRuleRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
          certificateArn: S.optional(S.String),
          authType: S.optional(S.String),
          idleTimeoutSeconds: S.optional(S.Number),
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
      ).annotate({ identifier: "UpdateServiceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          name: S.optional(S.String),
          customDomainName: S.optional(S.String),
          certificateArn: S.optional(S.String),
          authType: S.optional(S.String),
          idleTimeoutSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "UpdateServiceResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceNetworkIdentifier: S.String.pipe(T.HttpLabel("serviceNetworkIdentifier")),
          authType: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/servicenetworks/{serviceNetworkIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateServiceNetworkRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          name: S.optional(S.String),
          arn: S.optional(S.String),
          authType: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateServiceNetworkResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceNetworkVpcAssociationIdentifier: S.String.pipe(
            T.HttpLabel("serviceNetworkVpcAssociationIdentifier"),
          ),
          securityGroupIds: S.optional(__S(8, __c1, 0)),
          privateDnsEnabled: S.optional(S.Boolean),
          dnsOptions: S.optional(__S(96, __c12, 0)),
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
      ).annotate({ identifier: "UpdateServiceNetworkVpcAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.optional(S.String),
          arn: S.optional(S.String),
          status: S.optional(S.String),
          createdBy: S.optional(S.String),
          securityGroupIds: S.optional(__S(8, __c1, 0)),
          privateDnsEnabled: S.optional(S.Boolean),
          dnsOptions: S.optional(__S(96, __c12, 0)),
        }),
      ).annotate({ identifier: "UpdateServiceNetworkVpcAssociationResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          targetGroupIdentifier: S.String.pipe(T.HttpLabel("targetGroupIdentifier")),
          healthCheck: __S(113, __c14, 1),
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
      ).annotate({ identifier: "UpdateTargetGroupRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          resourceIdentifier: S.String,
          destinationArn: S.String,
          serviceNetworkLogType: S.optional(S.String),
          tags: S.optional(__S(736, __c92, 0)),
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
      ).annotate({ identifier: "CreateAccessLogSubscriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          resourceId: S.String,
          resourceArn: S.String,
          serviceNetworkLogType: S.optional(S.String),
          destinationArn: S.String,
        }),
      ).annotate({ identifier: "CreateAccessLogSubscriptionResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceIdentifier: S.String.pipe(T.HttpLabel("serviceIdentifier")),
          name: S.String,
          protocol: S.String,
          port: S.optional(S.Number),
          defaultAction: __S(644, __c80, 4),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(736, __c92, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/services/{serviceIdentifier}/listeners" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateListenerRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.optional(S.String),
          id: S.optional(S.String),
          name: S.optional(S.String),
          protocol: S.optional(S.String),
          port: S.optional(S.Number),
          serviceArn: S.optional(S.String),
          serviceId: S.optional(S.String),
          defaultAction: S.optional(__S(644, __c80, 4)),
        }),
      ).annotate({ identifier: "CreateListenerResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
