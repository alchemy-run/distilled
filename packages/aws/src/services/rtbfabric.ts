import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
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
  sdkId: "RTBFabric",
  target: "RTBFabric",
  version: "2023-05-15",
  sigv4: "rtbfabric",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseDualStack = false, UseFIPS = false, Endpoint, Region } = p;
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
                `https://rtbfabric-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true && UseDualStack === false) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://rtbfabric-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseFIPS === false && UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://rtbfabric.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://rtbfabric.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type GatewayId = string;
export type LinkId = string;
export type ResponderErrorMaskingAction =
  | "NO_BID"
  | "PASSTHROUGH"
  | (string & {});
export type ResponderErrorMaskingLoggingType =
  | "NONE"
  | "METRIC"
  | "RESPONSE"
  | (string & {});
export type ResponderErrorMaskingLoggingTypes =
  ResponderErrorMaskingLoggingType[];
export interface ResponderErrorMaskingForHttpCode {
  httpCode: string;
  action: ResponderErrorMaskingAction;
  loggingTypes: ResponderErrorMaskingLoggingType[];
  responseLoggingPercentage?: number;
}
export type ResponderErrorMasking = ResponderErrorMaskingForHttpCode[];
export type CustomerProvidedId = string;
export interface LinkAttributes {
  responderErrorMasking?: ResponderErrorMaskingForHttpCode[];
  customerProvidedId?: string;
}
export interface LinkApplicationLogSampling {
  errorLog: number;
  filterLog: number;
}
export interface LinkApplicationLogConfiguration {
  sampling: LinkApplicationLogSampling;
}
export interface LinkLogSettings {
  applicationLogs: LinkApplicationLogConfiguration;
}
export type LinkTimeoutInMillis = number;
export interface AcceptLinkRequest {
  gatewayId: string;
  linkId: string;
  attributes?: LinkAttributes;
  logSettings: LinkLogSettings;
  timeoutInMillis?: number;
}
export type LinkStatus =
  | "PENDING_CREATION"
  | "PENDING_REQUEST"
  | "REQUESTED"
  | "ACCEPTED"
  | "ACTIVE"
  | "REJECTED"
  | "FAILED"
  | "PENDING_DELETION"
  | "DELETED"
  | "PENDING_UPDATE"
  | "PENDING_ISOLATION"
  | "ISOLATED"
  | "PENDING_RESTORATION"
  | (string & {});
export type LinkDirection = "RESPONSE" | "REQUEST" | (string & {});
export type Version = string;
export type FlowModuleName = string;
export type FlowModuleNameList = string[];
export interface NoBidModuleParameters {
  reason?: string;
  reasonCode?: number;
  passThroughPercentage?: number;
}
export type FilterType = "INCLUDE" | "EXCLUDE" | (string & {});
export type ValueList = string[];
export interface FilterCriterion {
  path: string;
  values: string[];
}
export type FilterCriteria = FilterCriterion[];
export interface Filter {
  criteria: FilterCriterion[];
}
export type FilterConfiguration = Filter[];
export interface NoBidAction {
  noBidReasonCode?: number;
}
export interface HeaderTagAction {
  name: string;
  value: string;
}
export type Action =
  | { noBid: NoBidAction; headerTag?: never }
  | { noBid?: never; headerTag: HeaderTagAction };
export interface OpenRtbAttributeModuleParameters {
  filterType: FilterType;
  filterConfiguration: Filter[];
  action: Action;
  holdbackPercentage: number;
}
export interface RateLimiterModuleParameters {
  tps?: number;
}
export type ModuleParameters =
  | {
      noBid: NoBidModuleParameters;
      openRtbAttribute?: never;
      rateLimiter?: never;
    }
  | {
      noBid?: never;
      openRtbAttribute: OpenRtbAttributeModuleParameters;
      rateLimiter?: never;
    }
  | {
      noBid?: never;
      openRtbAttribute?: never;
      rateLimiter: RateLimiterModuleParameters;
    };
export interface ModuleConfiguration {
  version?: string;
  name: string;
  dependsOn?: string[];
  moduleParameters?: ModuleParameters;
}
export type ModuleConfigurationList = ModuleConfiguration[];
export type ConnectivityType =
  | "DEFAULT"
  | "PUBLIC_INGRESS"
  | "PUBLIC_EGRESS"
  | "EXTERNAL_INBOUND"
  | (string & {});
export interface AcceptLinkResponse {
  gatewayId: string;
  peerGatewayId: string;
  status: LinkStatus;
  createdAt: Date;
  updatedAt: Date;
  direction?: LinkDirection;
  flowModules?: ModuleConfiguration[];
  pendingFlowModules?: ModuleConfiguration[];
  attributes?: LinkAttributes;
  logSettings?: LinkLogSettings;
  connectivityType?: ConnectivityType;
  linkId: string;
}
export type AcmCertificateArn = string;
export interface AssociateCertificateRequest {
  gatewayId: string;
  acmCertificateArn: string;
  clientToken: string;
}
export type CertificateAssociationStatus =
  | "PENDING_ASSOCIATION"
  | "ASSOCIATED"
  | "PENDING_DISASSOCIATION"
  | "DISASSOCIATED"
  | "FAILED"
  | (string & {});
export interface AssociateCertificateResponse {
  gatewayId: string;
  acmCertificateArn: string;
  status: CertificateAssociationStatus;
}
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export interface CreateInboundExternalLinkRequest {
  clientToken: string;
  gatewayId: string;
  attributes?: LinkAttributes;
  logSettings: LinkLogSettings;
  tags?: { [key: string]: string | undefined };
}
export type DomainName = string;
export interface CreateInboundExternalLinkResponse {
  gatewayId: string;
  linkId: string;
  status: LinkStatus;
  domainName: string;
}
export interface CreateLinkRequest {
  gatewayId: string;
  peerGatewayId: string;
  attributes?: LinkAttributes;
  httpResponderAllowed?: boolean;
  tags?: { [key: string]: string | undefined };
  logSettings: LinkLogSettings;
  timeoutInMillis?: number;
}
export interface CreateLinkResponse {
  gatewayId: string;
  peerGatewayId: string;
  status: LinkStatus;
  createdAt: Date;
  updatedAt: Date;
  direction?: LinkDirection;
  flowModules?: ModuleConfiguration[];
  pendingFlowModules?: ModuleConfiguration[];
  attributes?: LinkAttributes;
  logSettings?: LinkLogSettings;
  connectivityType?: ConnectivityType;
  linkId: string;
  customerProvidedId?: string;
}
export type RulePriority = number;
export interface QueryStringKeyValuePair {
  key: string;
  value: string;
}
export interface RuleCondition {
  hostHeader?: string;
  hostHeaderWildcard?: string;
  pathPrefix?: string;
  pathExact?: string;
  queryStringEquals?: QueryStringKeyValuePair;
  queryStringExists?: string;
}
export interface CreateLinkRoutingRuleRequest {
  clientToken: string;
  gatewayId: string;
  linkId: string;
  priority: number;
  conditions: RuleCondition;
  tags?: { [key: string]: string | undefined };
}
export type RuleId = string;
export type RuleStatus =
  | "CREATION_IN_PROGRESS"
  | "ACTIVE"
  | "UPDATE_IN_PROGRESS"
  | "DELETION_IN_PROGRESS"
  | "DELETED"
  | "FAILED"
  | (string & {});
export interface CreateLinkRoutingRuleResponse {
  ruleId: string;
  status: RuleStatus;
  createdAt: Date;
}
export type URL = string;
export interface CreateOutboundExternalLinkRequest {
  clientToken: string;
  gatewayId: string;
  attributes?: LinkAttributes;
  publicEndpoint: string;
  logSettings: LinkLogSettings;
  tags?: { [key: string]: string | undefined };
}
export interface CreateOutboundExternalLinkResponse {
  gatewayId: string;
  linkId: string;
  status: LinkStatus;
}
export type VpcId = string;
export type SubnetId = string;
export type SubnetIdList = string[];
export type SecurityGroupId = string;
export type SecurityGroupIdList = string[];
export interface CreateRequesterGatewayRequest {
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  clientToken: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export type RequesterGatewayStatus =
  | "PENDING_CREATION"
  | "ACTIVE"
  | "PENDING_DELETION"
  | "DELETED"
  | "ERROR"
  | "PENDING_UPDATE"
  | "ISOLATED"
  | "PENDING_ISOLATION"
  | "PENDING_RESTORATION"
  | (string & {});
export interface CreateRequesterGatewayResponse {
  gatewayId: string;
  domainName: string;
  status: RequesterGatewayStatus;
}
export type Protocol = "HTTP" | "HTTPS" | (string & {});
export type ProtocolList = Protocol[];
export interface ListenerConfig {
  protocols: Protocol[];
}
export type Base64EncodedCertificateChain = string | redacted.Redacted<string>;
export type CertificateAuthorityCertificates = (
  | string
  | redacted.Redacted<string>
)[];
export interface TrustStoreConfiguration {
  certificateAuthorityCertificates: (string | redacted.Redacted<string>)[];
}
export type AutoScalingGroupName = string;
export type AutoScalingGroupNameList = string[];
export type StatusCodeMatcher = string;
export interface HealthCheckConfig {
  port: number;
  path: string;
  protocol?: Protocol;
  timeoutMs?: number;
  intervalSeconds?: number;
  statusCodeMatcher?: string;
  healthyThresholdCount?: number;
  unhealthyThresholdCount?: number;
}
export interface AutoScalingGroupsConfiguration {
  autoScalingGroupNames: string[];
  roleArn: string;
  healthCheckConfig?: HealthCheckConfig;
}
export type KubernetesEndpointsResourceName = string;
export type KubernetesNamespace = string;
export type URI = string;
export type KubernetesClusterName = string;
export interface EksEndpointsConfiguration {
  endpointsResourceName: string;
  endpointsResourceNamespace: string;
  clusterApiServerEndpointUri: string;
  clusterApiServerCaCertificateChain: string | redacted.Redacted<string>;
  clusterName: string;
  roleArn: string;
}
export type ManagedEndpointConfiguration =
  | { autoScalingGroups: AutoScalingGroupsConfiguration; eksEndpoints?: never }
  | { autoScalingGroups?: never; eksEndpoints: EksEndpointsConfiguration };
export type GatewayType = "EXTERNAL" | "INTERNAL" | (string & {});
export interface CreateResponderGatewayRequest {
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  domainName?: string;
  port: number;
  protocol: Protocol;
  listenerConfig?: ListenerConfig;
  trustStoreConfiguration?: TrustStoreConfiguration;
  managedEndpointConfiguration?: ManagedEndpointConfiguration;
  clientToken: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  gatewayType?: GatewayType;
}
export type ResponderGatewayStatus =
  | "PENDING_CREATION"
  | "ACTIVE"
  | "PENDING_DELETION"
  | "DELETED"
  | "ERROR"
  | "PENDING_UPDATE"
  | "ISOLATED"
  | "PENDING_ISOLATION"
  | "PENDING_RESTORATION"
  | (string & {});
export interface CreateResponderGatewayResponse {
  gatewayId: string;
  status: ResponderGatewayStatus;
  listenerConfig?: ListenerConfig;
  externalInboundEndpoint?: string;
}
export interface DeleteInboundExternalLinkRequest {
  gatewayId: string;
  linkId: string;
}
export interface DeleteInboundExternalLinkResponse {
  linkId: string;
  status: LinkStatus;
}
export interface DeleteLinkRequest {
  gatewayId: string;
  linkId: string;
}
export interface DeleteLinkResponse {
  linkId: string;
  status: LinkStatus;
}
export interface DeleteLinkRoutingRuleRequest {
  gatewayId: string;
  linkId: string;
  ruleId: string;
}
export interface DeleteLinkRoutingRuleResponse {
  ruleId: string;
  status: RuleStatus;
}
export interface DeleteOutboundExternalLinkRequest {
  gatewayId: string;
  linkId: string;
}
export interface DeleteOutboundExternalLinkResponse {
  linkId: string;
  status: LinkStatus;
}
export interface DeleteRequesterGatewayRequest {
  gatewayId: string;
}
export interface DeleteRequesterGatewayResponse {
  gatewayId: string;
  status: RequesterGatewayStatus;
}
export interface DeleteResponderGatewayRequest {
  gatewayId: string;
}
export interface DeleteResponderGatewayResponse {
  gatewayId: string;
  status: ResponderGatewayStatus;
}
export interface DisassociateCertificateRequest {
  gatewayId: string;
  acmCertificateArn: string;
}
export interface DisassociateCertificateResponse {
  gatewayId: string;
  acmCertificateArn: string;
  status: CertificateAssociationStatus;
}
export interface GetCertificateAssociationRequest {
  gatewayId: string;
  acmCertificateArn: string;
}
export interface GetCertificateAssociationResponse {
  gatewayId: string;
  acmCertificateArn: string;
  status: CertificateAssociationStatus;
  associatedAt?: Date;
  updatedAt?: Date;
}
export interface GetInboundExternalLinkRequest {
  gatewayId: string;
  linkId: string;
}
export interface GetInboundExternalLinkResponse {
  gatewayId: string;
  linkId: string;
  status: LinkStatus;
  domainName: string;
  flowModules?: ModuleConfiguration[];
  pendingFlowModules?: ModuleConfiguration[];
  attributes?: LinkAttributes;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: { [key: string]: string | undefined };
  logSettings?: LinkLogSettings;
  connectivityType?: ConnectivityType;
}
export interface GetLinkRequest {
  gatewayId: string;
  linkId: string;
}
export interface GetLinkResponse {
  gatewayId: string;
  peerGatewayId: string;
  status: LinkStatus;
  createdAt: Date;
  updatedAt: Date;
  direction?: LinkDirection;
  flowModules?: ModuleConfiguration[];
  pendingFlowModules?: ModuleConfiguration[];
  attributes?: LinkAttributes;
  logSettings?: LinkLogSettings;
  connectivityType?: ConnectivityType;
  linkId: string;
  tags?: { [key: string]: string | undefined };
  httpResponderAllowed?: boolean;
  timeoutInMillis?: number;
}
export interface GetLinkRoutingRuleRequest {
  gatewayId: string;
  linkId: string;
  ruleId: string;
}
export interface GetLinkRoutingRuleResponse {
  gatewayId: string;
  linkId: string;
  ruleId: string;
  priority: number;
  conditions: RuleCondition;
  status: RuleStatus;
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export interface GetOutboundExternalLinkRequest {
  gatewayId: string;
  linkId: string;
}
export interface GetOutboundExternalLinkResponse {
  gatewayId: string;
  linkId: string;
  status: LinkStatus;
  publicEndpoint: string;
  flowModules?: ModuleConfiguration[];
  pendingFlowModules?: ModuleConfiguration[];
  attributes?: LinkAttributes;
  createdAt?: Date;
  updatedAt?: Date;
  tags?: { [key: string]: string | undefined };
  logSettings?: LinkLogSettings;
  connectivityType?: ConnectivityType;
}
export interface GetRequesterGatewayRequest {
  gatewayId: string;
}
export interface GetRequesterGatewayResponse {
  status: RequesterGatewayStatus;
  domainName: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  gatewayId: string;
  tags?: { [key: string]: string | undefined };
  activeLinksCount?: number;
  totalLinksCount?: number;
}
export interface GetResponderGatewayRequest {
  gatewayId: string;
}
export interface GetResponderGatewayResponse {
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  status: ResponderGatewayStatus;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  domainName?: string;
  port: number;
  protocol: Protocol;
  listenerConfig?: ListenerConfig;
  trustStoreConfiguration?: TrustStoreConfiguration;
  managedEndpointConfiguration?: ManagedEndpointConfiguration;
  gatewayId: string;
  tags?: { [key: string]: string | undefined };
  activeLinksCount?: number;
  totalLinksCount?: number;
  linksRequestedCount?: number;
  gatewayType?: GatewayType;
  externalInboundEndpoint?: string;
}
export interface ListCertificateAssociationsRequest {
  gatewayId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface CertificateAssociationSummary {
  acmCertificateArn: string;
  status: CertificateAssociationStatus;
  associatedAt?: Date;
  updatedAt?: Date;
}
export type CertificateAssociationSummaryList = CertificateAssociationSummary[];
export interface ListCertificateAssociationsResponse {
  certificateAssociations: CertificateAssociationSummary[];
  nextToken?: string;
}
export interface ListLinkRoutingRulesRequest {
  gatewayId: string;
  linkId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface LinkRoutingRuleSummary {
  ruleId: string;
  priority: number;
  conditions: RuleCondition;
  status: RuleStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type LinkRoutingRuleList = LinkRoutingRuleSummary[];
export interface ListLinkRoutingRulesResponse {
  rules?: LinkRoutingRuleSummary[];
  nextToken?: string;
}
export interface ListLinksRequest {
  gatewayId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListLinksResponseStructure {
  gatewayId: string;
  peerGatewayId: string;
  status: LinkStatus;
  createdAt: Date;
  updatedAt: Date;
  direction?: LinkDirection;
  flowModules?: ModuleConfiguration[];
  pendingFlowModules?: ModuleConfiguration[];
  attributes?: LinkAttributes;
  logSettings?: LinkLogSettings;
  connectivityType?: ConnectivityType;
  linkId: string;
  tags?: { [key: string]: string | undefined };
  publicEndpoint?: string;
}
export type LinkList = ListLinksResponseStructure[];
export interface ListLinksResponse {
  links?: ListLinksResponseStructure[];
  nextToken?: string;
}
export interface ListRequesterGatewaysRequest {
  maxResults?: number;
  nextToken?: string;
}
export type GatewayIdList = string[];
export interface ListRequesterGatewaysResponse {
  gatewayIds?: string[];
  nextToken?: string;
}
export interface ListResponderGatewaysRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface ListResponderGatewaysResponse {
  gatewayIds?: string[];
  nextToken?: string;
}
export type RtbTaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface RejectLinkRequest {
  gatewayId: string;
  linkId: string;
}
export interface RejectLinkResponse {
  gatewayId: string;
  peerGatewayId: string;
  status: LinkStatus;
  createdAt: Date;
  updatedAt: Date;
  direction?: LinkDirection;
  flowModules?: ModuleConfiguration[];
  pendingFlowModules?: ModuleConfiguration[];
  attributes?: LinkAttributes;
  logSettings?: LinkLogSettings;
  connectivityType?: ConnectivityType;
  linkId: string;
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
export interface UpdateLinkRequest {
  gatewayId: string;
  linkId: string;
  logSettings?: LinkLogSettings;
  timeoutInMillis?: number;
}
export interface UpdateLinkResponse {
  linkId: string;
  status: LinkStatus;
}
export interface UpdateLinkModuleFlowRequest {
  clientToken: string;
  gatewayId: string;
  linkId: string;
  modules: ModuleConfiguration[];
}
export interface UpdateLinkModuleFlowResponse {
  gatewayId: string;
  linkId: string;
  status: LinkStatus;
}
export interface UpdateLinkRoutingRuleRequest {
  gatewayId: string;
  linkId: string;
  ruleId: string;
  priority: number;
  conditions: RuleCondition;
}
export interface UpdateLinkRoutingRuleResponse {
  ruleId: string;
  status: RuleStatus;
  updatedAt: Date;
}
export interface UpdateRequesterGatewayRequest {
  clientToken: string;
  gatewayId: string;
  description?: string;
}
export interface UpdateRequesterGatewayResponse {
  gatewayId: string;
  status: RequesterGatewayStatus;
}
export interface UpdateResponderGatewayRequest {
  domainName?: string;
  port: number;
  protocol: Protocol;
  listenerConfig?: ListenerConfig;
  trustStoreConfiguration?: TrustStoreConfiguration;
  managedEndpointConfiguration?: ManagedEndpointConfiguration;
  clientToken: string;
  gatewayId: string;
  description?: string;
}
export interface UpdateResponderGatewayResponse {
  gatewayId: string;
  status: ResponderGatewayStatus;
}
export type AcceptLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts a link request between gateways.
 *
 * When a requester gateway requests to link with a responder gateway, the responder can use this operation to accept the link request and establish the connection.
 */
export const acceptLink: API.OperationMethod<
  AcceptLinkRequest,
  AcceptLinkResponse,
  AcceptLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /gateway/{gatewayId}/link/{linkId}/accept",
    input: {
      gatewayId: 0,
      linkId: 0,
      attributes: i_LinkAttributes,
      logSettings: i_LinkLogSettings,
      timeoutInMillis: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "AcceptLink",
})) as any;

export type AssociateCertificateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates an ACM certificate with a responder gateway.
 */
export const associateCertificate: API.OperationMethod<
  AssociateCertificateRequest,
  AssociateCertificateResponse,
  AssociateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /responder-gateway/{gatewayId}/certificate",
    input: {
      gatewayId: 0,
      acmCertificateArn: 0,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "AssociateCertificate",
})) as any;

export type CreateInboundExternalLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an inbound external link.
 */
export const createInboundExternalLink: API.OperationMethod<
  CreateInboundExternalLinkRequest,
  CreateInboundExternalLinkResponse,
  CreateInboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /responder-gateway/{gatewayId}/inbound-external-link",
    input: {
      clientToken: D.m({ idempotency: true }),
      gatewayId: 0,
      attributes: i_LinkAttributes,
      logSettings: i_LinkLogSettings,
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
  operationName: "CreateInboundExternalLink",
})) as any;

export type CreateLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new link between gateways.
 *
 * Establishes a connection that allows gateways to communicate and exchange bid requests and responses.
 */
export const createLink: API.OperationMethod<
  CreateLinkRequest,
  CreateLinkResponse,
  CreateLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /gateway/{gatewayId}/create-link",
    input: {
      gatewayId: 0,
      peerGatewayId: 0,
      attributes: i_LinkAttributes,
      httpResponderAllowed: 0,
      tags: 0,
      logSettings: i_LinkLogSettings,
      timeoutInMillis: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "CreateLink",
})) as any;

export type CreateLinkRoutingRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a routing rule for a link.
 *
 * Routing rules use priority-based evaluation where lower priority numbers are evaluated first. Each rule specifies conditions that must all match for the rule to apply.
 */
export const createLinkRoutingRule: API.OperationMethod<
  CreateLinkRoutingRuleRequest,
  CreateLinkRoutingRuleResponse,
  CreateLinkRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /responder-gateway/{gatewayId}/link/{linkId}/routing-rule",
    input: {
      clientToken: D.m({ idempotency: true }),
      gatewayId: 0,
      linkId: 0,
      priority: 0,
      conditions: i_RuleCondition,
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
  operationName: "CreateLinkRoutingRule",
})) as any;

export type CreateOutboundExternalLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an outbound external link.
 */
export const createOutboundExternalLink: API.OperationMethod<
  CreateOutboundExternalLinkRequest,
  CreateOutboundExternalLinkResponse,
  CreateOutboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /requester-gateway/{gatewayId}/outbound-external-link",
    input: {
      clientToken: D.m({ idempotency: true }),
      gatewayId: 0,
      attributes: i_LinkAttributes,
      publicEndpoint: 0,
      logSettings: i_LinkLogSettings,
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
  operationName: "CreateOutboundExternalLink",
})) as any;

export type CreateRequesterGatewayError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a requester gateway.
 */
export const createRequesterGateway: API.OperationMethod<
  CreateRequesterGatewayRequest,
  CreateRequesterGatewayResponse,
  CreateRequesterGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /requester-gateway",
    input: {
      vpcId: 0,
      subnetIds: 0,
      securityGroupIds: 0,
      clientToken: D.m({ idempotency: true }),
      description: 0,
      tags: 0,
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
  operationName: "CreateRequesterGateway",
})) as any;

export type CreateResponderGatewayError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a responder gateway.
 *
 * A domain name or managed endpoint is required.
 */
export const createResponderGateway: API.OperationMethod<
  CreateResponderGatewayRequest,
  CreateResponderGatewayResponse,
  CreateResponderGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /responder-gateway",
    input: {
      vpcId: 0,
      subnetIds: 0,
      securityGroupIds: 0,
      domainName: 0,
      port: 0,
      protocol: 0,
      listenerConfig: i_ListenerConfig,
      trustStoreConfiguration: i_TrustStoreConfiguration,
      managedEndpointConfiguration: i_ManagedEndpointConfiguration,
      clientToken: D.m({ idempotency: true }),
      description: 0,
      tags: 0,
      gatewayType: 0,
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
  operationName: "CreateResponderGateway",
})) as any;

export type DeleteInboundExternalLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an inbound external link.
 */
export const deleteInboundExternalLink: API.OperationMethod<
  DeleteInboundExternalLinkRequest,
  DeleteInboundExternalLinkResponse,
  DeleteInboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /responder-gateway/{gatewayId}/inbound-external-link/{linkId}",
    input: { gatewayId: 0, linkId: 0 },
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
  operationName: "DeleteInboundExternalLink",
})) as any;

export type DeleteLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a link between gateways.
 *
 * Permanently removes the connection between gateways. This action cannot be undone.
 */
export const deleteLink: API.OperationMethod<
  DeleteLinkRequest,
  DeleteLinkResponse,
  DeleteLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /gateway/{gatewayId}/link/{linkId}",
    input: { gatewayId: 0, linkId: 0 },
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
  operationName: "DeleteLink",
})) as any;

export type DeleteLinkRoutingRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a routing rule from a link.
 */
export const deleteLinkRoutingRule: API.OperationMethod<
  DeleteLinkRoutingRuleRequest,
  DeleteLinkRoutingRuleResponse,
  DeleteLinkRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /responder-gateway/{gatewayId}/link/{linkId}/routing-rule/{ruleId}",
    input: { gatewayId: 0, linkId: 0, ruleId: 0 },
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
  operationName: "DeleteLinkRoutingRule",
})) as any;

export type DeleteOutboundExternalLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an outbound external link.
 */
export const deleteOutboundExternalLink: API.OperationMethod<
  DeleteOutboundExternalLinkRequest,
  DeleteOutboundExternalLinkResponse,
  DeleteOutboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /requester-gateway/{gatewayId}/outbound-external-link/{linkId}",
    input: { gatewayId: 0, linkId: 0 },
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
  operationName: "DeleteOutboundExternalLink",
})) as any;

export type DeleteRequesterGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a requester gateway.
 */
export const deleteRequesterGateway: API.OperationMethod<
  DeleteRequesterGatewayRequest,
  DeleteRequesterGatewayResponse,
  DeleteRequesterGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /requester-gateway/{gatewayId}",
    input: { gatewayId: 0 },
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
  operationName: "DeleteRequesterGateway",
})) as any;

export type DeleteResponderGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a responder gateway.
 */
export const deleteResponderGateway: API.OperationMethod<
  DeleteResponderGatewayRequest,
  DeleteResponderGatewayResponse,
  DeleteResponderGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /responder-gateway/{gatewayId}",
    input: { gatewayId: 0 },
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
  operationName: "DeleteResponderGateway",
})) as any;

export type DisassociateCertificateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a certificate association from a responder gateway.
 */
export const disassociateCertificate: API.OperationMethod<
  DisassociateCertificateRequest,
  DisassociateCertificateResponse,
  DisassociateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /responder-gateway/{gatewayId}/certificate",
    input: {
      gatewayId: 0,
      acmCertificateArn: D.m({ query: "acmCertificateArn" }),
    },
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
  operationName: "DisassociateCertificate",
})) as any;

export type GetCertificateAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a certificate association with a responder gateway.
 */
export const getCertificateAssociation: API.OperationMethod<
  GetCertificateAssociationRequest,
  GetCertificateAssociationResponse,
  GetCertificateAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /responder-gateway/{gatewayId}/certificate",
    input: {
      gatewayId: 0,
      acmCertificateArn: D.m({ query: "acmCertificateArn" }),
    },
    output: { associatedAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetCertificateAssociation",
})) as any;

export type GetInboundExternalLinkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an inbound external link.
 */
export const getInboundExternalLink: API.OperationMethod<
  GetInboundExternalLinkRequest,
  GetInboundExternalLinkResponse,
  GetInboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /responder-gateway/{gatewayId}/inbound-external-link/{linkId}",
    input: { gatewayId: 0, linkId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetInboundExternalLink",
})) as any;

export type GetLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a link between gateways.
 *
 * Returns detailed information about the link configuration, status, and associated gateways.
 */
export const getLink: API.OperationMethod<
  GetLinkRequest,
  GetLinkResponse,
  GetLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /gateway/{gatewayId}/link/{linkId}",
    input: { gatewayId: 0, linkId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetLink",
})) as any;

export type GetLinkRoutingRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a routing rule for a link.
 */
export const getLinkRoutingRule: API.OperationMethod<
  GetLinkRoutingRuleRequest,
  GetLinkRoutingRuleResponse,
  GetLinkRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /responder-gateway/{gatewayId}/link/{linkId}/routing-rule/{ruleId}",
    input: { gatewayId: 0, linkId: 0, ruleId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetLinkRoutingRule",
})) as any;

export type GetOutboundExternalLinkError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an outbound external link.
 */
export const getOutboundExternalLink: API.OperationMethod<
  GetOutboundExternalLinkRequest,
  GetOutboundExternalLinkResponse,
  GetOutboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /requester-gateway/{gatewayId}/outbound-external-link/{linkId}",
    input: { gatewayId: 0, linkId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetOutboundExternalLink",
})) as any;

export type GetRequesterGatewayError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a requester gateway.
 */
export const getRequesterGateway: API.OperationMethod<
  GetRequesterGatewayRequest,
  GetRequesterGatewayResponse,
  GetRequesterGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /requester-gateway/{gatewayId}",
    input: { gatewayId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetRequesterGateway",
})) as any;

export type GetResponderGatewayError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a responder gateway.
 */
export const getResponderGateway: API.OperationMethod<
  GetResponderGatewayRequest,
  GetResponderGatewayResponse,
  GetResponderGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /responder-gateway/{gatewayId}",
    input: { gatewayId: 0 },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      trustStoreConfiguration: {
        certificateAuthorityCertificates: D.list(D.secret),
      },
      managedEndpointConfiguration: {
        eksEndpoints: { clusterApiServerCaCertificateChain: D.secret },
      },
    },
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
  operationName: "GetResponderGateway",
})) as any;

export type ListCertificateAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the certificate associations for a responder gateway.
 */
export const listCertificateAssociations: API.PaginatedOperationMethod<
  ListCertificateAssociationsRequest,
  ListCertificateAssociationsResponse,
  ListCertificateAssociationsError,
  Credentials | HttpClient.HttpClient,
  CertificateAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /responder-gateway/{gatewayId}/certificates",
    input: {
      gatewayId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      certificateAssociations: D.list({ associatedAt: D.ts, updatedAt: D.ts }),
    },
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
  operationName: "ListCertificateAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "certificateAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLinkRoutingRulesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the routing rules for a link.
 */
export const listLinkRoutingRules: API.PaginatedOperationMethod<
  ListLinkRoutingRulesRequest,
  ListLinkRoutingRulesResponse,
  ListLinkRoutingRulesError,
  Credentials | HttpClient.HttpClient,
  LinkRoutingRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /responder-gateway/{gatewayId}/link/{linkId}/routing-rules",
    input: {
      gatewayId: 0,
      linkId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { rules: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
  operationName: "ListLinkRoutingRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "rules",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListLinksError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists links associated with gateways.
 *
 * Returns a list of all links for the specified gateways, including their status and configuration details.
 */
export const listLinks: API.PaginatedOperationMethod<
  ListLinksRequest,
  ListLinksResponse,
  ListLinksError,
  Credentials | HttpClient.HttpClient,
  ListLinksResponseStructure
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /gateway/{gatewayId}/links/",
    input: {
      gatewayId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { links: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
  operationName: "ListLinks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "links",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRequesterGatewaysError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists requester gateways.
 */
export const listRequesterGateways: API.PaginatedOperationMethod<
  ListRequesterGatewaysRequest,
  ListRequesterGatewaysResponse,
  ListRequesterGatewaysError,
  Credentials | HttpClient.HttpClient,
  GatewayId
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /requester-gateways",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRequesterGateways",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "gatewayIds",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResponderGatewaysError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists reponder gateways.
 */
export const listResponderGateways: API.PaginatedOperationMethod<
  ListResponderGatewaysRequest,
  ListResponderGatewaysResponse,
  ListResponderGatewaysError,
  Credentials | HttpClient.HttpClient,
  GatewayId
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /responder-gateways",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResponderGateways",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "gatewayIds",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists tags for a resource.
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
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type RejectLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rejects a link request between gateways.
 *
 * When a requester gateway requests to link with a responder gateway, the responder can use this operation to decline the link request.
 */
export const rejectLink: API.OperationMethod<
  RejectLinkRequest,
  RejectLinkResponse,
  RejectLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /gateway/{gatewayId}/link/{linkId}/reject",
    input: { gatewayId: 0, linkId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "RejectLink",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified resource.
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
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag or tags from a resource.
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
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateLinkError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a link between gateways.
 *
 * Allows you to modify settings and parameters for an existing link.
 */
export const updateLink: API.OperationMethod<
  UpdateLinkRequest,
  UpdateLinkResponse,
  UpdateLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /gateway/{gatewayId}/link/{linkId}",
    input: {
      gatewayId: 0,
      linkId: 0,
      logSettings: i_LinkLogSettings,
      timeoutInMillis: 0,
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
  operationName: "UpdateLink",
})) as any;

export type UpdateLinkModuleFlowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a link module flow.
 */
export const updateLinkModuleFlow: API.OperationMethod<
  UpdateLinkModuleFlowRequest,
  UpdateLinkModuleFlowResponse,
  UpdateLinkModuleFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /gateway/{gatewayId}/link/{linkId}/module-flow",
    input: {
      clientToken: D.m({ idempotency: true }),
      gatewayId: 0,
      linkId: 0,
      modules: D.list({
        version: 0,
        name: 0,
        dependsOn: 0,
        moduleParameters: {
          noBid: { reason: 0, reasonCode: 0, passThroughPercentage: 0 },
          openRtbAttribute: {
            filterType: 0,
            filterConfiguration: D.list({
              criteria: D.list({ path: 0, values: 0 }),
            }),
            action: {
              noBid: { noBidReasonCode: 0 },
              headerTag: { name: 0, value: 0 },
            },
            holdbackPercentage: 0,
          },
          rateLimiter: { tps: 0 },
        },
      }),
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
  operationName: "UpdateLinkModuleFlow",
})) as any;

export type UpdateLinkRoutingRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a routing rule for a link.
 */
export const updateLinkRoutingRule: API.OperationMethod<
  UpdateLinkRoutingRuleRequest,
  UpdateLinkRoutingRuleResponse,
  UpdateLinkRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /responder-gateway/{gatewayId}/link/{linkId}/routing-rule/{ruleId}",
    input: {
      gatewayId: 0,
      linkId: 0,
      ruleId: 0,
      priority: 0,
      conditions: i_RuleCondition,
    },
    output: { updatedAt: D.ts },
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
  operationName: "UpdateLinkRoutingRule",
})) as any;

export type UpdateRequesterGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a requester gateway.
 */
export const updateRequesterGateway: API.OperationMethod<
  UpdateRequesterGatewayRequest,
  UpdateRequesterGatewayResponse,
  UpdateRequesterGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /requester-gateway/{gatewayId}/update",
    input: {
      clientToken: D.m({ idempotency: true }),
      gatewayId: 0,
      description: 0,
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
  operationName: "UpdateRequesterGateway",
})) as any;

export type UpdateResponderGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a responder gateway.
 */
export const updateResponderGateway: API.OperationMethod<
  UpdateResponderGatewayRequest,
  UpdateResponderGatewayResponse,
  UpdateResponderGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /responder-gateway/{gatewayId}/update",
    input: {
      domainName: 0,
      port: 0,
      protocol: 0,
      listenerConfig: i_ListenerConfig,
      trustStoreConfiguration: i_TrustStoreConfiguration,
      managedEndpointConfiguration: i_ManagedEndpointConfiguration,
      clientToken: D.m({ idempotency: true }),
      gatewayId: 0,
      description: 0,
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
  operationName: "UpdateResponderGateway",
})) as any;

const i_LinkAttributes: D.LazyStruct = () => ({
  responderErrorMasking: D.list({
    httpCode: 0,
    action: 0,
    loggingTypes: 0,
    responseLoggingPercentage: 0,
  }),
  customerProvidedId: 0,
});
const i_LinkLogSettings: D.LazyStruct = () => ({
  applicationLogs: { sampling: { errorLog: 0, filterLog: 0 } },
});
const i_ListenerConfig: D.LazyStruct = () => ({ protocols: 0 });
const i_ManagedEndpointConfiguration: D.LazyStruct = () => ({
  autoScalingGroups: {
    autoScalingGroupNames: 0,
    roleArn: 0,
    healthCheckConfig: {
      port: 0,
      path: 0,
      protocol: 0,
      timeoutMs: 0,
      intervalSeconds: 0,
      statusCodeMatcher: 0,
      healthyThresholdCount: 0,
      unhealthyThresholdCount: 0,
    },
  },
  eksEndpoints: {
    endpointsResourceName: 0,
    endpointsResourceNamespace: 0,
    clusterApiServerEndpointUri: 0,
    clusterApiServerCaCertificateChain: 0,
    clusterName: 0,
    roleArn: 0,
  },
});
const i_RuleCondition: D.LazyStruct = () => ({
  hostHeader: 0,
  hostHeaderWildcard: 0,
  pathPrefix: 0,
  pathExact: 0,
  queryStringEquals: { key: 0, value: 0 },
  queryStringExists: 0,
});
const i_TrustStoreConfiguration: D.LazyStruct = () => ({
  certificateAuthorityCertificates: 0,
});
