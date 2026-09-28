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
  sdkId: "VPC Lattice",
  target: "MercuryControlPlane",
  version: "2022-11-30",
  sigv4: "vpc-lattice",
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
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"], {
    status: 403,
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type ServiceIdentifier = string;
export type ListenerIdentifier = string;
export type RuleIdentifier = string;
export type HttpMethod = string;
export type PathMatchExact = string;
export type PathMatchPrefix = string;
export type PathMatchType =
  | { exact: string; prefix?: never }
  | { exact?: never; prefix: string };
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
  | (string & {});
export type PortRange = string;
export type PortRangeList = string[];
export type ProtocolType = "TCP" | (string & {});
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
export type ResourceConfigurationDefinition =
  | { dnsResource: DnsResource; ipResource?: never; arnResource?: never }
  | { dnsResource?: never; ipResource: IpResource; arnResource?: never }
  | { dnsResource?: never; ipResource?: never; arnResource: ArnResource };
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
export type ResourceEndpointAssociationList =
  ResourceEndpointAssociationSummary[];
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
export type ServiceNetworkResourceAssociationList =
  ServiceNetworkResourceAssociationSummary[];
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
export type ServiceNetworkServiceAssociationList =
  ServiceNetworkServiceAssociationSummary[];
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
export type ServiceNetworkVpcAssociationList =
  ServiceNetworkVpcAssociationSummary[];
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
export type ServiceNetworkVpcEndpointAssociationList =
  ServiceNetworkEndpointAssociation[];
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
  descriptor: {
    service: svc,
    http: "PATCH /services/{serviceIdentifier}/listeners/{listenerIdentifier}/rules",
    input: {
      serviceIdentifier: 0,
      listenerIdentifier: 0,
      rules: D.list({
        ruleIdentifier: 0,
        match: i_RuleMatch,
        priority: 0,
        action: i_RuleAction,
      }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /accesslogsubscriptions",
    input: {
      clientToken: D.m({ idempotency: true }),
      resourceIdentifier: 0,
      destinationArn: 0,
      serviceNetworkLogType: 0,
      tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /services/{serviceIdentifier}/listeners",
    input: {
      serviceIdentifier: 0,
      name: 0,
      protocol: 0,
      port: 0,
      defaultAction: i_RuleAction,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
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
  operationName: "CreateListener",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /resourceconfigurations",
    input: {
      name: 0,
      type: 0,
      portRanges: 0,
      protocol: 0,
      resourceGatewayIdentifier: 0,
      resourceConfigurationGroupIdentifier: 0,
      resourceConfigurationDefinition: i_ResourceConfigurationDefinition,
      allowAssociationToShareableServiceNetwork: 0,
      customDomainName: 0,
      groupDomain: 0,
      domainVerificationIdentifier: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { createdAt: D.ts },
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
  operationName: "CreateResourceConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /resourcegateways",
    input: {
      clientToken: D.m({ idempotency: true }),
      name: 0,
      vpcIdentifier: 0,
      subnetIds: 0,
      securityGroupIds: 0,
      ipAddressType: 0,
      ipv4AddressesPerEni: 0,
      resourceConfigDnsResolution: 0,
      tags: 0,
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
  operationName: "CreateResourceGateway",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /services/{serviceIdentifier}/listeners/{listenerIdentifier}/rules",
    input: {
      serviceIdentifier: 0,
      listenerIdentifier: 0,
      name: 0,
      match: i_RuleMatch,
      priority: 0,
      action: i_RuleAction,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
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
  operationName: "CreateRule",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /services",
    input: {
      clientToken: D.m({ idempotency: true }),
      name: 0,
      tags: 0,
      customDomainName: 0,
      certificateArn: 0,
      authType: 0,
      idleTimeoutSeconds: 0,
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
  operationName: "CreateService",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /servicenetworks",
    input: {
      clientToken: D.m({ idempotency: true }),
      name: 0,
      authType: 0,
      tags: 0,
      sharingConfig: { enabled: 0 },
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
  operationName: "CreateServiceNetwork",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /servicenetworkresourceassociations",
    input: {
      clientToken: D.m({ idempotency: true }),
      resourceConfigurationIdentifier: 0,
      serviceNetworkIdentifier: 0,
      privateDnsEnabled: 0,
      tags: 0,
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
  operationName: "CreateServiceNetworkResourceAssociation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /servicenetworkserviceassociations",
    input: {
      clientToken: D.m({ idempotency: true }),
      serviceIdentifier: 0,
      serviceNetworkIdentifier: 0,
      tags: 0,
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
  operationName: "CreateServiceNetworkServiceAssociation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /servicenetworkvpcassociations",
    input: {
      clientToken: D.m({ idempotency: true }),
      serviceNetworkIdentifier: 0,
      vpcIdentifier: 0,
      privateDnsEnabled: 0,
      securityGroupIds: 0,
      tags: 0,
      dnsOptions: i_DnsOptions,
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
  operationName: "CreateServiceNetworkVpcAssociation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /targetgroups",
    input: {
      name: 0,
      type: 0,
      config: {
        port: 0,
        protocol: 0,
        protocolVersion: 0,
        ipAddressType: 0,
        vpcIdentifier: 0,
        healthCheck: i_HealthCheckConfig,
        lambdaEventStructureVersion: 0,
      },
      clientToken: D.m({ idempotency: true }),
      tags: 0,
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
  operationName: "CreateTargetGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /accesslogsubscriptions/{accessLogSubscriptionIdentifier}",
    input: { accessLogSubscriptionIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /authpolicy/{resourceIdentifier}",
    input: { resourceIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /domainverifications/{domainVerificationIdentifier}",
    input: { domainVerificationIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /services/{serviceIdentifier}/listeners/{listenerIdentifier}",
    input: { serviceIdentifier: 0, listenerIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /resourceconfigurations/{resourceConfigurationIdentifier}",
    input: { resourceConfigurationIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /resourceendpointassociations/{resourceEndpointAssociationIdentifier}",
    input: { resourceEndpointAssociationIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /resourcegateways/{resourceGatewayIdentifier}",
    input: { resourceGatewayIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /resourcepolicy/{resourceArn}",
    input: { resourceArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /services/{serviceIdentifier}/listeners/{listenerIdentifier}/rules/{ruleIdentifier}",
    input: { serviceIdentifier: 0, listenerIdentifier: 0, ruleIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /services/{serviceIdentifier}",
    input: { serviceIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /servicenetworks/{serviceNetworkIdentifier}",
    input: { serviceNetworkIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /servicenetworkresourceassociations/{serviceNetworkResourceAssociationIdentifier}",
    input: { serviceNetworkResourceAssociationIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /servicenetworkserviceassociations/{serviceNetworkServiceAssociationIdentifier}",
    input: { serviceNetworkServiceAssociationIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /servicenetworkvpcassociations/{serviceNetworkVpcAssociationIdentifier}",
    input: { serviceNetworkVpcAssociationIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /targetgroups/{targetGroupIdentifier}",
    input: { targetGroupIdentifier: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /targetgroups/{targetGroupIdentifier}/deregistertargets",
    input: { targetGroupIdentifier: 0, targets: D.list(i_Target) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /accesslogsubscriptions/{accessLogSubscriptionIdentifier}",
    input: { accessLogSubscriptionIdentifier: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /authpolicy/{resourceIdentifier}",
    input: { resourceIdentifier: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /domainverifications/{domainVerificationIdentifier}",
    input: { domainVerificationIdentifier: 0 },
    output: { createdAt: D.ts, lastVerifiedTime: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /services/{serviceIdentifier}/listeners/{listenerIdentifier}",
    input: { serviceIdentifier: 0, listenerIdentifier: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /resourceconfigurations/{resourceConfigurationIdentifier}",
    input: { resourceConfigurationIdentifier: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /resourcegateways/{resourceGatewayIdentifier}",
    input: { resourceGatewayIdentifier: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /resourcepolicy/{resourceArn}",
    input: { resourceArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /services/{serviceIdentifier}/listeners/{listenerIdentifier}/rules/{ruleIdentifier}",
    input: { serviceIdentifier: 0, listenerIdentifier: 0, ruleIdentifier: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /services/{serviceIdentifier}",
    input: { serviceIdentifier: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /servicenetworks/{serviceNetworkIdentifier}",
    input: { serviceNetworkIdentifier: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /servicenetworkresourceassociations/{serviceNetworkResourceAssociationIdentifier}",
    input: { serviceNetworkResourceAssociationIdentifier: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /servicenetworkserviceassociations/{serviceNetworkServiceAssociationIdentifier}",
    input: { serviceNetworkServiceAssociationIdentifier: 0 },
    output: { createdAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /servicenetworkvpcassociations/{serviceNetworkVpcAssociationIdentifier}",
    input: { serviceNetworkVpcAssociationIdentifier: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /targetgroups/{targetGroupIdentifier}",
    input: { targetGroupIdentifier: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /accesslogsubscriptions",
    input: {
      resourceIdentifier: D.m({ query: "resourceIdentifier" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /domainverifications",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts, lastVerifiedTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /services/{serviceIdentifier}/listeners",
    input: {
      serviceIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /resourceconfigurations",
    input: {
      resourceGatewayIdentifier: D.m({ query: "resourceGatewayIdentifier" }),
      resourceConfigurationGroupIdentifier: D.m({
        query: "resourceConfigurationGroupIdentifier",
      }),
      domainVerificationIdentifier: D.m({
        query: "domainVerificationIdentifier",
      }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /resourceendpointassociations",
    input: {
      resourceConfigurationIdentifier: D.m({
        query: "resourceConfigurationIdentifier",
      }),
      resourceEndpointAssociationIdentifier: D.m({
        query: "resourceEndpointAssociationIdentifier",
      }),
      vpcEndpointId: D.m({ query: "vpcEndpointId" }),
      vpcEndpointOwner: D.m({ query: "vpcEndpointOwner" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /resourcegateways",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /services/{serviceIdentifier}/listeners/{listenerIdentifier}/rules",
    input: {
      serviceIdentifier: 0,
      listenerIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /servicenetworkresourceassociations",
    input: {
      serviceNetworkIdentifier: D.m({ query: "serviceNetworkIdentifier" }),
      resourceConfigurationIdentifier: D.m({
        query: "resourceConfigurationIdentifier",
      }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      includeChildren: D.m({ query: "includeChildren" }),
    },
    output: { items: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /servicenetworks",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /servicenetworkserviceassociations",
    input: {
      serviceNetworkIdentifier: D.m({ query: "serviceNetworkIdentifier" }),
      serviceIdentifier: D.m({ query: "serviceIdentifier" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /servicenetworkvpcassociations",
    input: {
      serviceNetworkIdentifier: D.m({ query: "serviceNetworkIdentifier" }),
      vpcIdentifier: D.m({ query: "vpcIdentifier" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /servicenetworkvpcendpointassociations",
    input: {
      serviceNetworkIdentifier: D.m({ query: "serviceNetworkIdentifier" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /services",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /targetgroups",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      vpcIdentifier: D.m({ query: "vpcIdentifier" }),
      targetGroupType: D.m({ query: "targetGroupType" }),
    },
    output: { items: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
  },
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
 * Lists the targets for the target group. By default, all targets are included. You can use this API to check the health status of targets. You can also ﬁlter the results by target.
 */
export const listTargets: API.PaginatedOperationMethod<
  ListTargetsRequest,
  ListTargetsResponse,
  ListTargetsError,
  Credentials | HttpClient.HttpClient,
  TargetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /targetgroups/{targetGroupIdentifier}/listtargets",
    input: {
      targetGroupIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      targets: D.list(i_Target),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "PUT /authpolicy/{resourceIdentifier}",
    input: { resourceIdentifier: 0, policy: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /resourcepolicy/{resourceArn}",
    input: { resourceArn: 0, policy: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /targetgroups/{targetGroupIdentifier}/registertargets",
    input: { targetGroupIdentifier: 0, targets: D.list(i_Target) },
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
  operationName: "RegisterTargets",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /domainverifications",
    input: { clientToken: D.m({ idempotency: true }), domainName: 0, tags: 0 },
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
  operationName: "StartDomainVerification",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /accesslogsubscriptions/{accessLogSubscriptionIdentifier}",
    input: { accessLogSubscriptionIdentifier: 0, destinationArn: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /services/{serviceIdentifier}/listeners/{listenerIdentifier}",
    input: {
      serviceIdentifier: 0,
      listenerIdentifier: 0,
      defaultAction: i_RuleAction,
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
  operationName: "UpdateListener",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /resourceconfigurations/{resourceConfigurationIdentifier}",
    input: {
      resourceConfigurationIdentifier: 0,
      resourceConfigurationDefinition: i_ResourceConfigurationDefinition,
      allowAssociationToShareableServiceNetwork: 0,
      portRanges: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /resourcegateways/{resourceGatewayIdentifier}",
    input: { resourceGatewayIdentifier: 0, securityGroupIds: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /services/{serviceIdentifier}/listeners/{listenerIdentifier}/rules/{ruleIdentifier}",
    input: {
      serviceIdentifier: 0,
      listenerIdentifier: 0,
      ruleIdentifier: 0,
      match: i_RuleMatch,
      priority: 0,
      action: i_RuleAction,
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
  operationName: "UpdateRule",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /services/{serviceIdentifier}",
    input: {
      serviceIdentifier: 0,
      certificateArn: 0,
      authType: 0,
      idleTimeoutSeconds: 0,
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
  operationName: "UpdateService",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /servicenetworks/{serviceNetworkIdentifier}",
    input: { serviceNetworkIdentifier: 0, authType: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /servicenetworkvpcassociations/{serviceNetworkVpcAssociationIdentifier}",
    input: {
      serviceNetworkVpcAssociationIdentifier: 0,
      securityGroupIds: 0,
      privateDnsEnabled: 0,
      dnsOptions: i_DnsOptions,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /targetgroups/{targetGroupIdentifier}",
    input: { targetGroupIdentifier: 0, healthCheck: i_HealthCheckConfig },
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
  operationName: "UpdateTargetGroup",
})) as any;

const i_DnsOptions: D.LazyStruct = () => ({
  privateDnsPreference: 0,
  privateDnsSpecifiedDomains: 0,
});
const i_HealthCheckConfig: D.LazyStruct = () => ({
  enabled: 0,
  protocol: 0,
  protocolVersion: 0,
  port: 0,
  path: 0,
  healthCheckIntervalSeconds: 0,
  healthCheckTimeoutSeconds: 0,
  healthyThresholdCount: 0,
  unhealthyThresholdCount: 0,
  matcher: { httpCode: 0 },
});
const i_ResourceConfigurationDefinition: D.LazyStruct = () => ({
  dnsResource: { domainName: 0, ipAddressType: 0 },
  ipResource: { ipAddress: 0 },
  arnResource: { arn: 0 },
});
const i_RuleAction: D.LazyStruct = () => ({
  forward: { targetGroups: D.list({ targetGroupIdentifier: 0, weight: 0 }) },
  fixedResponse: { statusCode: 0 },
});
const i_RuleMatch: D.LazyStruct = () => ({
  httpMatch: {
    method: 0,
    pathMatch: { match: { exact: 0, prefix: 0 }, caseSensitive: 0 },
    headerMatches: D.list({
      name: 0,
      match: { exact: 0, prefix: 0, contains: 0 },
      caseSensitive: 0,
    }),
  },
});
const i_Target: D.LazyStruct = () => ({ id: 0, port: 0 });
