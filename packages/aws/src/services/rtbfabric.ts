import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "RTBFabric", serviceShapeName: "RTBFabric" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "rtbfabric" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-05-15");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
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
              `https://rtbfabric-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true && UseDualStack === false) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://rtbfabric-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseFIPS === false && UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://rtbfabric.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://rtbfabric.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://rtbfabric.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type GatewayId = string;
export type LinkId = string;
export type ResponderErrorMaskingAction = "NO_BID" | "PASSTHROUGH" | (string & {});
export type ResponderErrorMaskingLoggingType = "NONE" | "METRIC" | "RESPONSE" | (string & {});
export type ResponderErrorMaskingLoggingTypes = ResponderErrorMaskingLoggingType[];
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
  | { noBid: NoBidModuleParameters; openRtbAttribute?: never; rateLimiter?: never }
  | { noBid?: never; openRtbAttribute: OpenRtbAttributeModuleParameters; rateLimiter?: never }
  | { noBid?: never; openRtbAttribute?: never; rateLimiter: RateLimiterModuleParameters };
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
export type CertificateAuthorityCertificates = (string | redacted.Redacted<string>)[];
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
export type ClientRoutingPolicy =
  | "AVAILABILITY_ZONE_AFFINITY"
  | "ANY_AVAILABILITY_ZONE"
  | (string & {});
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
  clientRoutingPolicy?: ClientRoutingPolicy;
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
  clientRoutingPolicy?: ClientRoutingPolicy;
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
  clientRoutingPolicy?: ClientRoutingPolicy;
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
  clientRoutingPolicy?: ClientRoutingPolicy;
}
export interface UpdateResponderGatewayResponse {
  gatewayId: string;
  status: ResponderGatewayStatus;
  clientRoutingPolicy?: ClientRoutingPolicy;
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
  input: __S(640, __c40, 0) as any as S.Schema<AcceptLinkRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<AcceptLinkResponse>,
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
}));

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
  input: __S(752, __c47, 0) as any as S.Schema<AssociateCertificateRequest>,
  output: __S(768, __c48, 0) as any as S.Schema<AssociateCertificateResponse>,
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
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<CreateInboundExternalLinkRequest>,
  output: __S(785, __c49, 1) as any as S.Schema<CreateInboundExternalLinkResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateLinkRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateLinkResponse>,
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
}));

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
  input: __S(16, __c1, 0) as any as S.Schema<CreateLinkRoutingRuleRequest>,
  output: __S(17, __c1, 1) as any as S.Schema<CreateLinkRoutingRuleResponse>,
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
}));

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
  input: __S(48, __c3, 0) as any as S.Schema<CreateOutboundExternalLinkRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<CreateOutboundExternalLinkResponse>,
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
}));

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
  input: __S(80, __c5, 0) as any as S.Schema<CreateRequesterGatewayRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<CreateRequesterGatewayResponse>,
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
}));

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
  input: __S(96, __c6, 0) as any as S.Schema<CreateResponderGatewayRequest>,
  output: __S(97, __c6, 1) as any as S.Schema<CreateResponderGatewayResponse>,
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
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<DeleteInboundExternalLinkRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteInboundExternalLinkResponse>,
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
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<DeleteLinkRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteLinkResponse>,
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
}));

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
  input: __S(176, __c11, 0) as any as S.Schema<DeleteLinkRoutingRuleRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<DeleteLinkRoutingRuleResponse>,
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
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<DeleteOutboundExternalLinkRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteOutboundExternalLinkResponse>,
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
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<DeleteRequesterGatewayRequest>,
  output: __S(224, __c14, 0) as any as S.Schema<DeleteRequesterGatewayResponse>,
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
}));

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
  input: __S(240, __c15, 0) as any as S.Schema<DeleteResponderGatewayRequest>,
  output: __S(224, __c14, 0) as any as S.Schema<DeleteResponderGatewayResponse>,
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
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<DisassociateCertificateRequest>,
  output: __S(768, __c48, 0) as any as S.Schema<DisassociateCertificateResponse>,
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
}));

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
  input: __S(272, __c17, 0) as any as S.Schema<GetCertificateAssociationRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<GetCertificateAssociationResponse>,
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
}));

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
  input: __S(288, __c18, 0) as any as S.Schema<GetInboundExternalLinkRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<GetInboundExternalLinkResponse>,
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
}));

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
  input: __S(304, __c19, 0) as any as S.Schema<GetLinkRequest>,
  output: __S(305, __c19, 1) as any as S.Schema<GetLinkResponse>,
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
}));

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
  input: __S(320, __c20, 0) as any as S.Schema<GetLinkRoutingRuleRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<GetLinkRoutingRuleResponse>,
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
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<GetOutboundExternalLinkRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<GetOutboundExternalLinkResponse>,
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
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<GetRequesterGatewayRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<GetRequesterGatewayResponse>,
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
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<GetResponderGatewayRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<GetResponderGatewayResponse>,
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
}));

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
  input: __S(384, __c24, 0) as any as S.Schema<ListCertificateAssociationsRequest>,
  output: __S(387, __c24, 3) as any as S.Schema<ListCertificateAssociationsResponse>,
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
  input: __S(400, __c25, 0) as any as S.Schema<ListLinkRoutingRulesRequest>,
  output: __S(403, __c25, 3) as any as S.Schema<ListLinkRoutingRulesResponse>,
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
  input: __S(416, __c26, 0) as any as S.Schema<ListLinksRequest>,
  output: __S(419, __c26, 3) as any as S.Schema<ListLinksResponse>,
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
  input: __S(432, __c27, 0) as any as S.Schema<ListRequesterGatewaysRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<ListRequesterGatewaysResponse>,
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
  input: __S(464, __c29, 0) as any as S.Schema<ListResponderGatewaysRequest>,
  output: __S(448, __c28, 0) as any as S.Schema<ListResponderGatewaysResponse>,
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
  input: __S(480, __c30, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(481, __c30, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

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
  input: __S(496, __c31, 0) as any as S.Schema<RejectLinkRequest>,
  output: __S(688, __c43, 0) as any as S.Schema<RejectLinkResponse>,
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
}));

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
  input: __S(512, __c32, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(528, __c33, 0) as any as S.Schema<TagResourceResponse>,
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
  input: __S(544, __c34, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(528, __c33, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(560, __c35, 0) as any as S.Schema<UpdateLinkRequest>,
  output: __S(144, __c9, 0) as any as S.Schema<UpdateLinkResponse>,
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
}));

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
  input: __S(576, __c36, 0) as any as S.Schema<UpdateLinkModuleFlowRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<UpdateLinkModuleFlowResponse>,
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
}));

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
  input: __S(592, __c37, 0) as any as S.Schema<UpdateLinkRoutingRuleRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<UpdateLinkRoutingRuleResponse>,
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
}));

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
  input: __S(608, __c38, 0) as any as S.Schema<UpdateRequesterGatewayRequest>,
  output: __S(224, __c14, 0) as any as S.Schema<UpdateRequesterGatewayResponse>,
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
}));

export type UpdateResponderGatewayError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the description, Auto Scaling group managed endpoint configuration, trust store configuration, and client routing policy of a responder gateway. This operation also updates the `protocols` list in the listener configuration.
 *
 * You cannot change the `domainName`, `port`, and `protocol` values that you set when you create a responder gateway. To change any of them, delete the gateway and create a new one.
 */
export const updateResponderGateway: API.OperationMethod<
  UpdateResponderGatewayRequest,
  UpdateResponderGatewayResponse,
  UpdateResponderGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<UpdateResponderGatewayRequest>,
  output: __S(625, __c39, 1) as any as S.Schema<UpdateResponderGatewayResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          peerGatewayId: S.String,
          attributes: S.optional(__S(722, __c45, 2)),
          httpResponderAllowed: S.optional(S.Boolean),
          tags: S.optional(__S(800, __c50, 0)),
          logSettings: __S(738, __c46, 2),
          timeoutInMillis: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/gateway/{gatewayId}/create-link" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLinkRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String,
          peerGatewayId: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          direction: S.optional(S.String),
          flowModules: S.optional(__S(684, __c42, 12)),
          pendingFlowModules: S.optional(__S(684, __c42, 12)),
          attributes: S.optional(__S(722, __c45, 2)),
          logSettings: S.optional(__S(738, __c46, 2)),
          connectivityType: S.optional(S.String),
          linkId: S.String,
          customerProvidedId: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateLinkResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.String.pipe(T.IdempotencyToken()),
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
          priority: S.Number,
          conditions: __S(33, __c2, 1),
          tags: S.optional(__S(800, __c50, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/responder-gateway/{gatewayId}/link/{linkId}/routing-rule",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLinkRoutingRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ruleId: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CreateLinkRoutingRuleResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "QueryStringKeyValuePair",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          hostHeader: S.optional(S.String),
          hostHeaderWildcard: S.optional(S.String),
          pathPrefix: S.optional(S.String),
          pathExact: S.optional(S.String),
          queryStringEquals: S.optional(__S(32, __c2, 0)),
          queryStringExists: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuleCondition" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.String.pipe(T.IdempotencyToken()),
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          attributes: S.optional(__S(722, __c45, 2)),
          publicEndpoint: S.String,
          logSettings: __S(738, __c46, 2),
          tags: S.optional(__S(800, __c50, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/requester-gateway/{gatewayId}/outbound-external-link",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateOutboundExternalLinkRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ gatewayId: S.String, linkId: S.String, status: S.String }),
      ).annotate({ identifier: "CreateOutboundExternalLinkResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.String,
          subnetIds: __S(656, __c41, 0),
          securityGroupIds: __S(656, __c41, 0),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          description: S.optional(S.String),
          tags: S.optional(__S(800, __c50, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/requester-gateway" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRequesterGatewayRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ gatewayId: S.String, domainName: S.String, status: S.String }),
      ).annotate({ identifier: "CreateRequesterGatewayResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.String,
          subnetIds: __S(656, __c41, 0),
          securityGroupIds: __S(656, __c41, 0),
          domainName: S.optional(S.String),
          port: S.Number,
          protocol: S.String,
          listenerConfig: S.optional(__S(112, __c7, 0)),
          trustStoreConfiguration: S.optional(__S(114, __c7, 2)),
          managedEndpointConfiguration: S.optional(__S(118, __c7, 6)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          description: S.optional(S.String),
          tags: S.optional(__S(800, __c50, 0)),
          gatewayType: S.optional(S.String),
          clientRoutingPolicy: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/responder-gateway" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateResponderGatewayRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String,
          status: S.String,
          listenerConfig: S.optional(__S(112, __c7, 0)),
          externalInboundEndpoint: S.optional(S.String),
          clientRoutingPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateResponderGatewayResponse" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ protocols: __S(704, __c44, 0) })).annotate({
        identifier: "ListenerConfig",
      });
    case 1:
      return S.Array(SensitiveString);
    case 2:
      return S.suspend(() =>
        S.Struct({ certificateAuthorityCertificates: __S(113, __c7, 1) }),
      ).annotate({ identifier: "TrustStoreConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          port: S.Number,
          path: S.String,
          protocol: S.optional(S.String),
          timeoutMs: S.optional(S.Number),
          intervalSeconds: S.optional(S.Number),
          statusCodeMatcher: S.optional(S.String),
          healthyThresholdCount: S.optional(S.Number),
          unhealthyThresholdCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "HealthCheckConfig" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          autoScalingGroupNames: __S(656, __c41, 0),
          roleArn: S.String,
          healthCheckConfig: S.optional(__S(115, __c7, 3)),
        }),
      ).annotate({ identifier: "AutoScalingGroupsConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          endpointsResourceName: S.String,
          endpointsResourceNamespace: S.String,
          clusterApiServerEndpointUri: S.String,
          clusterApiServerCaCertificateChain: SensitiveString,
          clusterName: S.String,
          roleArn: S.String,
        }),
      ).annotate({ identifier: "EksEndpointsConfiguration" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ autoScalingGroups: __S(116, __c7, 4) }),
        /*@__PURE__*/ S.Struct({ eksEndpoints: __S(117, __c7, 5) }),
      ]);
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/responder-gateway/{gatewayId}/inbound-external-link/{linkId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInboundExternalLinkRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ linkId: S.String, status: S.String })).annotate({
        identifier: "DeleteInboundExternalLinkResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/gateway/{gatewayId}/link/{linkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLinkRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
          ruleId: S.String.pipe(T.HttpLabel("ruleId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/responder-gateway/{gatewayId}/link/{linkId}/routing-rule/{ruleId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLinkRoutingRuleRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ruleId: S.String, status: S.String })).annotate({
        identifier: "DeleteLinkRoutingRuleResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/requester-gateway/{gatewayId}/outbound-external-link/{linkId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteOutboundExternalLinkRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ gatewayId: S.String.pipe(T.HttpLabel("gatewayId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/requester-gateway/{gatewayId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRequesterGatewayRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ gatewayId: S.String, status: S.String })).annotate({
        identifier: "DeleteRequesterGatewayResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ gatewayId: S.String.pipe(T.HttpLabel("gatewayId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/responder-gateway/{gatewayId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResponderGatewayRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          acmCertificateArn: S.String.pipe(T.HttpQuery("acmCertificateArn")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/responder-gateway/{gatewayId}/certificate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateCertificateRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          acmCertificateArn: S.String.pipe(T.HttpQuery("acmCertificateArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/responder-gateway/{gatewayId}/certificate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCertificateAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String,
          acmCertificateArn: S.String,
          status: S.String,
          associatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetCertificateAssociationResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/responder-gateway/{gatewayId}/inbound-external-link/{linkId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInboundExternalLinkRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String,
          linkId: S.String,
          status: S.String,
          domainName: S.String,
          flowModules: S.optional(__S(684, __c42, 12)),
          pendingFlowModules: S.optional(__S(684, __c42, 12)),
          attributes: S.optional(__S(722, __c45, 2)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(800, __c50, 0)),
          logSettings: S.optional(__S(738, __c46, 2)),
          connectivityType: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetInboundExternalLinkResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/gateway/{gatewayId}/link/{linkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLinkRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String,
          peerGatewayId: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          direction: S.optional(S.String),
          flowModules: S.optional(__S(684, __c42, 12)),
          pendingFlowModules: S.optional(__S(684, __c42, 12)),
          attributes: S.optional(__S(722, __c45, 2)),
          logSettings: S.optional(__S(738, __c46, 2)),
          connectivityType: S.optional(S.String),
          linkId: S.String,
          tags: S.optional(__S(800, __c50, 0)),
          httpResponderAllowed: S.optional(S.Boolean),
          timeoutInMillis: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetLinkResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
          ruleId: S.String.pipe(T.HttpLabel("ruleId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/responder-gateway/{gatewayId}/link/{linkId}/routing-rule/{ruleId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetLinkRoutingRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String,
          linkId: S.String,
          ruleId: S.String,
          priority: S.Number,
          conditions: __S(33, __c2, 1),
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(800, __c50, 0)),
        }),
      ).annotate({ identifier: "GetLinkRoutingRuleResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/requester-gateway/{gatewayId}/outbound-external-link/{linkId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetOutboundExternalLinkRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String,
          linkId: S.String,
          status: S.String,
          publicEndpoint: S.String,
          flowModules: S.optional(__S(684, __c42, 12)),
          pendingFlowModules: S.optional(__S(684, __c42, 12)),
          attributes: S.optional(__S(722, __c45, 2)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(800, __c50, 0)),
          logSettings: S.optional(__S(738, __c46, 2)),
          connectivityType: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetOutboundExternalLinkResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ gatewayId: S.String.pipe(T.HttpLabel("gatewayId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/requester-gateway/{gatewayId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRequesterGatewayRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          domainName: S.String,
          description: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          vpcId: S.String,
          subnetIds: __S(656, __c41, 0),
          securityGroupIds: __S(656, __c41, 0),
          gatewayId: S.String,
          tags: S.optional(__S(800, __c50, 0)),
          activeLinksCount: S.optional(S.Number),
          totalLinksCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetRequesterGatewayResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ gatewayId: S.String.pipe(T.HttpLabel("gatewayId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/responder-gateway/{gatewayId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResponderGatewayRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.String,
          subnetIds: __S(656, __c41, 0),
          securityGroupIds: __S(656, __c41, 0),
          status: S.String,
          description: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          domainName: S.optional(S.String),
          port: S.Number,
          protocol: S.String,
          listenerConfig: S.optional(__S(112, __c7, 0)),
          trustStoreConfiguration: S.optional(__S(114, __c7, 2)),
          managedEndpointConfiguration: S.optional(__S(118, __c7, 6)),
          gatewayId: S.String,
          tags: S.optional(__S(800, __c50, 0)),
          activeLinksCount: S.optional(S.Number),
          totalLinksCount: S.optional(S.Number),
          linksRequestedCount: S.optional(S.Number),
          gatewayType: S.optional(S.String),
          externalInboundEndpoint: S.optional(S.String),
          clientRoutingPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetResponderGatewayResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/responder-gateway/{gatewayId}/certificates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCertificateAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          acmCertificateArn: S.String,
          status: S.String,
          associatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "CertificateAssociationSummary" });
    case 2:
      return S.Array(__S(385, __c24, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ certificateAssociations: __S(386, __c24, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCertificateAssociationsResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/responder-gateway/{gatewayId}/link/{linkId}/routing-rules",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLinkRoutingRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ruleId: S.String,
          priority: S.Number,
          conditions: __S(33, __c2, 1),
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "LinkRoutingRuleSummary" });
    case 2:
      return S.Array(__S(401, __c25, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ rules: S.optional(__S(402, __c25, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLinkRoutingRulesResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/gateway/{gatewayId}/links/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListLinksRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String,
          peerGatewayId: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          direction: S.optional(S.String),
          flowModules: S.optional(__S(684, __c42, 12)),
          pendingFlowModules: S.optional(__S(684, __c42, 12)),
          attributes: S.optional(__S(722, __c45, 2)),
          logSettings: S.optional(__S(738, __c46, 2)),
          connectivityType: S.optional(S.String),
          linkId: S.String,
          tags: S.optional(__S(800, __c50, 0)),
          publicEndpoint: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListLinksResponseStructure" });
    case 2:
      return S.Array(__S(417, __c26, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ links: S.optional(__S(418, __c26, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLinksResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/requester-gateways" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRequesterGatewaysRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ gatewayIds: S.optional(__S(656, __c41, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRequesterGatewaysResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/responder-gateways" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResponderGatewaysRequest" });
  }
}
function __c30(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(800, __c50, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/gateway/{gatewayId}/link/{linkId}/reject" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RejectLinkRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(800, __c50, 0),
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
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(656, __c41, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
          logSettings: S.optional(__S(738, __c46, 2)),
          timeoutInMillis: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/gateway/{gatewayId}/link/{linkId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLinkRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.String.pipe(T.IdempotencyToken()),
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
          modules: __S(684, __c42, 12),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/gateway/{gatewayId}/link/{linkId}/module-flow" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLinkModuleFlowRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
          ruleId: S.String.pipe(T.HttpLabel("ruleId")),
          priority: S.Number,
          conditions: __S(33, __c2, 1),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/responder-gateway/{gatewayId}/link/{linkId}/routing-rule/{ruleId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLinkRoutingRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ruleId: S.String,
          status: S.String,
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "UpdateLinkRoutingRuleResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.String.pipe(T.IdempotencyToken()),
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/requester-gateway/{gatewayId}/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRequesterGatewayRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainName: S.optional(S.String),
          port: S.Number,
          protocol: S.String,
          listenerConfig: S.optional(__S(112, __c7, 0)),
          trustStoreConfiguration: S.optional(__S(114, __c7, 2)),
          managedEndpointConfiguration: S.optional(__S(118, __c7, 6)),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          description: S.optional(S.String),
          clientRoutingPolicy: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/responder-gateway/{gatewayId}/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateResponderGatewayRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String,
          status: S.String,
          clientRoutingPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateResponderGatewayResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
          attributes: S.optional(__S(722, __c45, 2)),
          logSettings: __S(738, __c46, 2),
          timeoutInMillis: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/gateway/{gatewayId}/link/{linkId}/accept" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AcceptLinkRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          reason: S.optional(S.String),
          reasonCode: S.optional(S.Number),
          passThroughPercentage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "NoBidModuleParameters" });
    case 1:
      return S.suspend(() => S.Struct({ path: S.String, values: __S(656, __c41, 0) })).annotate({
        identifier: "FilterCriterion",
      });
    case 2:
      return S.Array(__S(673, __c42, 1));
    case 3:
      return S.suspend(() => S.Struct({ criteria: __S(674, __c42, 2) })).annotate({
        identifier: "Filter",
      });
    case 4:
      return S.Array(__S(675, __c42, 3));
    case 5:
      return S.suspend(() => S.Struct({ noBidReasonCode: S.optional(S.Number) })).annotate({
        identifier: "NoBidAction",
      });
    case 6:
      return S.suspend(() => S.Struct({ name: S.String, value: S.String })).annotate({
        identifier: "HeaderTagAction",
      });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ noBid: __S(677, __c42, 5) }),
        /*@__PURE__*/ S.Struct({ headerTag: __S(678, __c42, 6) }),
      ]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          filterType: S.String,
          filterConfiguration: __S(676, __c42, 4),
          action: __S(679, __c42, 7),
          holdbackPercentage: S.Number,
        }),
      ).annotate({ identifier: "OpenRtbAttributeModuleParameters" });
    case 9:
      return S.suspend(() => S.Struct({ tps: S.optional(S.Number) })).annotate({
        identifier: "RateLimiterModuleParameters",
      });
    case 10:
      return S.Union([
        /*@__PURE__*/ S.Struct({ noBid: __S(672, __c42, 0) }),
        /*@__PURE__*/ S.Struct({ openRtbAttribute: __S(680, __c42, 8) }),
        /*@__PURE__*/ S.Struct({ rateLimiter: __S(681, __c42, 9) }),
      ]);
    case 11:
      return S.suspend(() =>
        S.Struct({
          version: S.optional(S.String),
          name: S.String,
          dependsOn: S.optional(__S(656, __c41, 0)),
          moduleParameters: S.optional(__S(682, __c42, 10)),
        }),
      ).annotate({ identifier: "ModuleConfiguration" });
    case 12:
      return S.Array(__S(683, __c42, 11));
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String,
          peerGatewayId: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          direction: S.optional(S.String),
          flowModules: S.optional(__S(684, __c42, 12)),
          pendingFlowModules: S.optional(__S(684, __c42, 12)),
          attributes: S.optional(__S(722, __c45, 2)),
          logSettings: S.optional(__S(738, __c46, 2)),
          connectivityType: S.optional(S.String),
          linkId: S.String,
        }),
      ).annotate({ identifier: "AcceptLinkResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          httpCode: S.String,
          action: S.String,
          loggingTypes: __S(704, __c44, 0),
          responseLoggingPercentage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ResponderErrorMaskingForHttpCode" });
    case 1:
      return S.Array(__S(720, __c45, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          responderErrorMasking: S.optional(__S(721, __c45, 1)),
          customerProvidedId: S.optional(S.String),
        }),
      ).annotate({ identifier: "LinkAttributes" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ errorLog: S.Number, filterLog: S.Number })).annotate({
        identifier: "LinkApplicationLogSampling",
      });
    case 1:
      return S.suspend(() => S.Struct({ sampling: __S(736, __c46, 0) })).annotate({
        identifier: "LinkApplicationLogConfiguration",
      });
    case 2:
      return S.suspend(() => S.Struct({ applicationLogs: __S(737, __c46, 1) })).annotate({
        identifier: "LinkLogSettings",
      });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          acmCertificateArn: S.String,
          clientToken: S.String.pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/responder-gateway/{gatewayId}/certificate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateCertificateRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ gatewayId: S.String, acmCertificateArn: S.String, status: S.String }),
      ).annotate({ identifier: "AssociateCertificateResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.String.pipe(T.IdempotencyToken()),
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          attributes: S.optional(__S(722, __c45, 2)),
          logSettings: __S(738, __c46, 2),
          tags: S.optional(__S(800, __c50, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/responder-gateway/{gatewayId}/inbound-external-link" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateInboundExternalLinkRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ gatewayId: S.String, linkId: S.String, status: S.String, domainName: S.String }),
      ).annotate({ identifier: "CreateInboundExternalLinkResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
