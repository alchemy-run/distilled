import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "RTBFabric",
  service: "RTBFabric",
  propagate: TxXray.propagate,
} as const;

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
  responseLoggingPercentage?: number | undefined;
}
export type ResponderErrorMasking = ResponderErrorMaskingForHttpCode[];
export type CustomerProvidedId = string;
export interface LinkAttributes {
  responderErrorMasking?: ResponderErrorMaskingForHttpCode[] | undefined;
  customerProvidedId?: string | undefined;
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
  attributes?: LinkAttributes | undefined;
  logSettings: LinkLogSettings;
  timeoutInMillis?: number | undefined;
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
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export type LinkDirection = "RESPONSE" | "REQUEST" | (string & {});
export type Version = string;
export type FlowModuleName = string;
export type FlowModuleNameList = string[];
export interface NoBidModuleParameters {
  reason?: string | undefined;
  reasonCode?: number | undefined;
  passThroughPercentage?: number | undefined;
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
  noBidReasonCode?: number | undefined;
}
export interface HeaderTagAction {
  name: string;
  value: string;
}
export type Action =
  | { noBid: NoBidAction; headerTag?: undefined }
  | { noBid?: undefined; headerTag: HeaderTagAction };
export interface OpenRtbAttributeModuleParameters {
  filterType: FilterType;
  filterConfiguration: Filter[];
  action: Action;
  holdbackPercentage: number;
}
export interface RateLimiterModuleParameters {
  tps?: number | undefined;
}
export type ModuleParameters =
  | { noBid: NoBidModuleParameters; openRtbAttribute?: undefined; rateLimiter?: undefined }
  | {
      noBid?: undefined;
      openRtbAttribute: OpenRtbAttributeModuleParameters;
      rateLimiter?: undefined;
    }
  | { noBid?: undefined; openRtbAttribute?: undefined; rateLimiter: RateLimiterModuleParameters };
export interface ModuleConfiguration {
  version?: string | undefined;
  name: string;
  dependsOn?: string[] | undefined;
  moduleParameters?: ModuleParameters | undefined;
}
export type ModuleConfigurationList = ModuleConfiguration[];
export type ConnectivityType =
  | "DEFAULT"
  | "PUBLIC_INGRESS"
  | "PUBLIC_EGRESS"
  | "EXTERNAL_INBOUND"
  | (string & {});
export type ErrorCode =
  | "VPC_NOT_FOUND"
  | "EC2_SUBNET_NOT_FOUND"
  | "EC2_SECURITY_GROUP_NOT_FOUND"
  | "EC2_SUBNET_IP_EXHAUSTION"
  | "IAM_ASSUME_ROLE_ACCESS_DENIED"
  | "INTERNAL_ERROR"
  | (string & {});
export type AwsResourceId = string;
export type AwsResourceIdList = string[];
export interface ErrorDetail {
  code: ErrorCode;
  message: string;
  resourceIds?: string[] | undefined;
}
export type ErrorDetails = ErrorDetail[];
export interface AcceptLinkResponse {
  gatewayId: string;
  peerGatewayId: string;
  status: LinkStatus;
  createdAt: Date;
  updatedAt: Date;
  direction?: LinkDirection | undefined;
  flowModules?: ModuleConfiguration[] | undefined;
  pendingFlowModules?: ModuleConfiguration[] | undefined;
  attributes?: LinkAttributes | undefined;
  logSettings?: LinkLogSettings | undefined;
  connectivityType?: ConnectivityType | undefined;
  errorDetails?: ErrorDetail[] | undefined;
  linkId: string;
}
export type AcmCertificateArn = string;
export interface AssociateCertificateRequest {
  gatewayId: string;
  acmCertificateArn: string;
  clientToken?: string | undefined;
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
  clientToken?: string | undefined;
  gatewayId: string;
  attributes?: LinkAttributes | undefined;
  logSettings: LinkLogSettings;
  tags?: { [key: string]: string | undefined } | undefined;
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
  attributes?: LinkAttributes | undefined;
  httpResponderAllowed?: boolean | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  logSettings: LinkLogSettings;
  timeoutInMillis?: number | undefined;
}
export interface CreateLinkResponse {
  gatewayId: string;
  peerGatewayId: string;
  status: LinkStatus;
  createdAt: Date;
  updatedAt: Date;
  direction?: LinkDirection | undefined;
  flowModules?: ModuleConfiguration[] | undefined;
  pendingFlowModules?: ModuleConfiguration[] | undefined;
  attributes?: LinkAttributes | undefined;
  logSettings?: LinkLogSettings | undefined;
  connectivityType?: ConnectivityType | undefined;
  errorDetails?: ErrorDetail[] | undefined;
  linkId: string;
  customerProvidedId?: string | undefined;
}
export type RulePriority = number;
export interface QueryStringKeyValuePair {
  key: string;
  value: string;
}
export interface RuleCondition {
  hostHeader?: string | undefined;
  hostHeaderWildcard?: string | undefined;
  pathPrefix?: string | undefined;
  pathExact?: string | undefined;
  queryStringEquals?: QueryStringKeyValuePair | undefined;
  queryStringExists?: string | undefined;
}
export interface CreateLinkRoutingRuleRequest {
  clientToken?: string | undefined;
  gatewayId: string;
  linkId: string;
  priority: number;
  conditions: RuleCondition;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type RuleId = string;
export type RuleStatus =
  | "CREATION_IN_PROGRESS"
  | "ACTIVE"
  | "UPDATE_IN_PROGRESS"
  | "DELETION_IN_PROGRESS"
  | "DELETED"
  | "FAILED"
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export interface CreateLinkRoutingRuleResponse {
  ruleId: string;
  status: RuleStatus;
  createdAt: Date;
}
export type URL = string;
export interface CreateOutboundExternalLinkRequest {
  clientToken?: string | undefined;
  gatewayId: string;
  attributes?: LinkAttributes | undefined;
  publicEndpoint: string;
  logSettings: LinkLogSettings;
  tags?: { [key: string]: string | undefined } | undefined;
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
  clientToken?: string | undefined;
  description?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
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
  | "CREATE_FAILED"
  | "DELETE_FAILED"
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
  protocol?: Protocol | undefined;
  timeoutMs?: number | undefined;
  intervalSeconds?: number | undefined;
  statusCodeMatcher?: string | undefined;
  healthyThresholdCount?: number | undefined;
  unhealthyThresholdCount?: number | undefined;
}
export interface AutoScalingGroupsConfiguration {
  autoScalingGroupNames: string[];
  roleArn: string;
  healthCheckConfig?: HealthCheckConfig | undefined;
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
  | { autoScalingGroups: AutoScalingGroupsConfiguration; eksEndpoints?: undefined }
  | { autoScalingGroups?: undefined; eksEndpoints: EksEndpointsConfiguration };
export type GatewayType = "EXTERNAL" | "INTERNAL" | (string & {});
export type ClientRoutingPolicy =
  | "AVAILABILITY_ZONE_AFFINITY"
  | "ANY_AVAILABILITY_ZONE"
  | (string & {});
export interface CreateResponderGatewayRequest {
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  domainName?: string | undefined;
  port: number;
  protocol: Protocol;
  listenerConfig?: ListenerConfig | undefined;
  trustStoreConfiguration?: TrustStoreConfiguration | undefined;
  managedEndpointConfiguration?: ManagedEndpointConfiguration | undefined;
  clientToken?: string | undefined;
  description?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  gatewayType?: GatewayType | undefined;
  clientRoutingPolicy?: ClientRoutingPolicy | undefined;
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
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export interface CreateResponderGatewayResponse {
  gatewayId: string;
  status: ResponderGatewayStatus;
  listenerConfig?: ListenerConfig | undefined;
  externalInboundEndpoint?: string | undefined;
  clientRoutingPolicy?: ClientRoutingPolicy | undefined;
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
export type ModuleId = string;
export interface GetAvailableModuleRequest {
  moduleId: string;
}
export type ModuleArn = string;
export type ModuleName = string;
export type ModuleDescription = string;
export type SubscriptionType = "MARKETPLACE" | "PRIVATE" | "AWS_BUILT_IN" | (string & {});
export type SubscriptionStatus = "ACTIVE" | "EXPIRED" | (string & {});
export interface GetAvailableModuleResponse {
  moduleId: string;
  moduleArn: string;
  moduleName: string;
  description?: string | undefined;
  subscriptionType: SubscriptionType;
  subscriptionStatus: SubscriptionStatus;
  marketplaceProductId?: string | undefined;
  createdAt: Date;
}
export type SemanticVersion = string;
export interface GetAvailableModuleVersionRequest {
  moduleId: string;
  version: string;
}
export type ModuleVersionArn = string;
export type ModuleVersionStatus =
  | "CREATING"
  | "CREATE_FAILED"
  | "ACTIVE"
  | "DEPRECATED"
  | (string & {});
export type ModulePermission =
  | "READ_REQUEST_BODY"
  | "READ_REQUEST_HEADERS"
  | "MUTATE_REQUEST_BODY"
  | "ENRICH_REQUEST_HEADERS"
  | "ENRICH_REQUEST_EXT"
  | "FILTER"
  | (string & {});
export type ModulePermissionList = ModulePermission[];
export type ConfigurableAction =
  | "FILTER"
  | "ENRICH_REQUEST_EXT"
  | "ENRICH_REQUEST_HEADERS"
  | "OBSERVE"
  | (string & {});
export type ConfigurableActionList = ConfigurableAction[];
export type ConfigurationSchema = string;
export type ReleaseNotes = string;
export interface GetAvailableModuleVersionResponse {
  moduleId: string;
  version: string;
  moduleVersionArn: string;
  status: ModuleVersionStatus;
  permissions: ModulePermission[];
  configurableActions: ConfigurableAction[];
  configurationSchema?: string | undefined;
  releaseNotes?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}
export interface GetCertificateAssociationRequest {
  gatewayId: string;
  acmCertificateArn: string;
}
export interface GetCertificateAssociationResponse {
  gatewayId: string;
  acmCertificateArn: string;
  status: CertificateAssociationStatus;
  associatedAt?: Date | undefined;
  updatedAt?: Date | undefined;
  errorDetails?: ErrorDetail[] | undefined;
}
export interface GetInboundExternalLinkRequest {
  gatewayId: string;
  linkId: string;
}
export type LockToken = string;
export type FlowName = string;
export type SelectedActionList = ConfigurableAction[];
export type FailureMode = "OPEN" | "CLOSED" | (string & {});
export type ActivationPercentage = number;
export type ConfigurationValues = string;
export interface FlowModule {
  name: string;
  moduleVersionArn: string;
  selectedActions?: ConfigurableAction[] | undefined;
  failureMode?: FailureMode | undefined;
  activationPercentage?: number | undefined;
  configurationValues?: string | undefined;
}
export type FlowModuleList = FlowModule[];
export interface SequentialPipeline {
  modules: FlowModule[];
}
export interface FlowPhase {
  modules: FlowModule[];
}
export type FlowPhaseList = FlowPhase[];
export interface PhasedPipeline {
  phases: FlowPhase[];
}
export type FlowPipeline =
  | { sequential: SequentialPipeline; phased?: undefined }
  | { sequential?: undefined; phased: PhasedPipeline };
export interface Flow {
  name: string;
  pipeline: FlowPipeline;
}
export type FlowList = Flow[];
export interface GetInboundExternalLinkResponse {
  gatewayId: string;
  linkId: string;
  status: LinkStatus;
  domainName: string;
  flowModules?: ModuleConfiguration[] | undefined;
  pendingFlowModules?: ModuleConfiguration[] | undefined;
  attributes?: LinkAttributes | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  logSettings?: LinkLogSettings | undefined;
  connectivityType?: ConnectivityType | undefined;
  errorDetails?: ErrorDetail[] | undefined;
  lockToken?: string | undefined;
  flows?: Flow[] | undefined;
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
  direction?: LinkDirection | undefined;
  flowModules?: ModuleConfiguration[] | undefined;
  pendingFlowModules?: ModuleConfiguration[] | undefined;
  attributes?: LinkAttributes | undefined;
  logSettings?: LinkLogSettings | undefined;
  connectivityType?: ConnectivityType | undefined;
  errorDetails?: ErrorDetail[] | undefined;
  linkId: string;
  tags?: { [key: string]: string | undefined } | undefined;
  httpResponderAllowed?: boolean | undefined;
  timeoutInMillis?: number | undefined;
  lockToken?: string | undefined;
  flows?: Flow[] | undefined;
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
  tags?: { [key: string]: string | undefined } | undefined;
  errorDetails?: ErrorDetail[] | undefined;
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
  flowModules?: ModuleConfiguration[] | undefined;
  pendingFlowModules?: ModuleConfiguration[] | undefined;
  attributes?: LinkAttributes | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  logSettings?: LinkLogSettings | undefined;
  connectivityType?: ConnectivityType | undefined;
  errorDetails?: ErrorDetail[] | undefined;
  lockToken?: string | undefined;
  flows?: Flow[] | undefined;
}
export interface GetRequesterGatewayRequest {
  gatewayId: string;
}
export interface GetRequesterGatewayResponse {
  status: RequesterGatewayStatus;
  domainName: string;
  description?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  errorDetails?: ErrorDetail[] | undefined;
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  gatewayId: string;
  tags?: { [key: string]: string | undefined } | undefined;
  activeLinksCount?: number | undefined;
  totalLinksCount?: number | undefined;
}
export interface GetResponderGatewayRequest {
  gatewayId: string;
}
export interface GetResponderGatewayResponse {
  vpcId: string;
  subnetIds: string[];
  securityGroupIds: string[];
  status: ResponderGatewayStatus;
  description?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  errorDetails?: ErrorDetail[] | undefined;
  domainName?: string | undefined;
  port: number;
  protocol: Protocol;
  listenerConfig?: ListenerConfig | undefined;
  trustStoreConfiguration?: TrustStoreConfiguration | undefined;
  managedEndpointConfiguration?: ManagedEndpointConfiguration | undefined;
  gatewayId: string;
  tags?: { [key: string]: string | undefined } | undefined;
  activeLinksCount?: number | undefined;
  totalLinksCount?: number | undefined;
  linksRequestedCount?: number | undefined;
  gatewayType?: GatewayType | undefined;
  externalInboundEndpoint?: string | undefined;
  clientRoutingPolicy?: ClientRoutingPolicy | undefined;
}
export type UpdateId = string;
export interface GetUpdateRequest {
  gatewayId: string;
  updateId: string;
}
export type UpdateType =
  | "GATEWAY_CONFIG_UPDATE"
  | "LINK_CONFIG_UPDATE"
  | "LINK_FLOW_UPDATE"
  | "ROUTING_RULE_UPDATE"
  | (string & {});
export type UpdateStatus = "IN_PROGRESS" | "SUCCESSFUL" | "FAILED" | (string & {});
export interface LinkTarget {
  linkId: string;
}
export interface RoutingRuleTarget {
  linkId: string;
  ruleId: string;
}
export type UpdateTarget =
  | { gateway: Record<string, never>; link?: undefined; routingRule?: undefined }
  | { gateway?: undefined; link: LinkTarget; routingRule?: undefined }
  | { gateway?: undefined; link?: undefined; routingRule: RoutingRuleTarget };
export interface ResponderGatewayConfigParameters {
  description?: string | undefined;
  clientRoutingPolicy?: ClientRoutingPolicy | undefined;
  domainName?: string | undefined;
  port: number;
  protocol: Protocol;
  listenerConfig?: ListenerConfig | undefined;
  trustStoreConfiguration?: TrustStoreConfiguration | undefined;
  managedEndpointConfiguration?: ManagedEndpointConfiguration | undefined;
}
export interface LinkConfigParameters {
  logSettings?: LinkLogSettings | undefined;
  timeoutInMillis?: number | undefined;
}
export type LinkFlowParameters =
  | { modules: ModuleConfiguration[]; flows?: undefined }
  | { modules?: undefined; flows: Flow[] };
export interface RoutingRuleParameters {
  priority: number;
  conditions: RuleCondition;
}
export type UpdateParameters =
  | {
      responderGatewayConfig: ResponderGatewayConfigParameters;
      linkConfig?: undefined;
      linkFlow?: undefined;
      routingRule?: undefined;
    }
  | {
      responderGatewayConfig?: undefined;
      linkConfig: LinkConfigParameters;
      linkFlow?: undefined;
      routingRule?: undefined;
    }
  | {
      responderGatewayConfig?: undefined;
      linkConfig?: undefined;
      linkFlow: LinkFlowParameters;
      routingRule?: undefined;
    }
  | {
      responderGatewayConfig?: undefined;
      linkConfig?: undefined;
      linkFlow?: undefined;
      routingRule: RoutingRuleParameters;
    };
export interface Update {
  updateId: string;
  type: UpdateType;
  status: UpdateStatus;
  target: UpdateTarget;
  createdAt: Date;
  parameters?: UpdateParameters | undefined;
  errorDetails?: ErrorDetail[] | undefined;
}
export interface GetUpdateResponse {
  update: Update;
}
export interface ListAvailableModulesRequest {
  subscriptionType?: SubscriptionType | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface AvailableModuleSummary {
  moduleId: string;
  moduleArn: string;
  moduleName: string;
  subscriptionType: SubscriptionType;
  subscriptionStatus: SubscriptionStatus;
  marketplaceProductId?: string | undefined;
}
export type AvailableModuleSummaryList = AvailableModuleSummary[];
export interface ListAvailableModulesResponse {
  modules: AvailableModuleSummary[];
  nextToken?: string | undefined;
}
export interface ListAvailableModuleVersionsRequest {
  moduleId: string;
  status?: ModuleVersionStatus | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface AvailableModuleVersionSummary {
  version: string;
  moduleVersionArn: string;
  status: ModuleVersionStatus;
  createdAt: Date;
}
export type AvailableModuleVersionSummaryList = AvailableModuleVersionSummary[];
export interface ListAvailableModuleVersionsResponse {
  moduleId: string;
  versions: AvailableModuleVersionSummary[];
  nextToken?: string | undefined;
}
export interface ListCertificateAssociationsRequest {
  gatewayId: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface CertificateAssociationSummary {
  acmCertificateArn: string;
  status: CertificateAssociationStatus;
  associatedAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export type CertificateAssociationSummaryList = CertificateAssociationSummary[];
export interface ListCertificateAssociationsResponse {
  certificateAssociations: CertificateAssociationSummary[];
  nextToken?: string | undefined;
}
export interface ListLinkRoutingRulesRequest {
  gatewayId: string;
  linkId: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface LinkRoutingRuleSummary {
  ruleId: string;
  priority: number;
  conditions: RuleCondition;
  status: RuleStatus;
  createdAt: Date;
  updatedAt: Date;
  errorDetails?: ErrorDetail[] | undefined;
}
export type LinkRoutingRuleList = LinkRoutingRuleSummary[];
export interface ListLinkRoutingRulesResponse {
  rules?: LinkRoutingRuleSummary[] | undefined;
  nextToken?: string | undefined;
}
export interface ListLinksRequest {
  gatewayId: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface ListLinksResponseStructure {
  gatewayId: string;
  peerGatewayId: string;
  status: LinkStatus;
  createdAt: Date;
  updatedAt: Date;
  direction?: LinkDirection | undefined;
  flowModules?: ModuleConfiguration[] | undefined;
  pendingFlowModules?: ModuleConfiguration[] | undefined;
  attributes?: LinkAttributes | undefined;
  logSettings?: LinkLogSettings | undefined;
  connectivityType?: ConnectivityType | undefined;
  errorDetails?: ErrorDetail[] | undefined;
  linkId: string;
  tags?: { [key: string]: string | undefined } | undefined;
  publicEndpoint?: string | undefined;
}
export type LinkList = ListLinksResponseStructure[];
export interface ListLinksResponse {
  links?: ListLinksResponseStructure[] | undefined;
  nextToken?: string | undefined;
}
export interface ListRequesterGatewaysRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type GatewayIdList = string[];
export interface ListRequesterGatewaysResponse {
  gatewayIds?: string[] | undefined;
  nextToken?: string | undefined;
}
export interface ListResponderGatewaysRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface ListResponderGatewaysResponse {
  gatewayIds?: string[] | undefined;
  nextToken?: string | undefined;
}
export type RtbTaggableResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface ListUpdatesRequest {
  gatewayId: string;
  linkId?: string | undefined;
  ruleId?: string | undefined;
  type?: UpdateType | undefined;
  status?: UpdateStatus | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface UpdateSummary {
  updateId: string;
  type: UpdateType;
  status: UpdateStatus;
  createdAt: Date;
}
export type UpdateSummaryList = UpdateSummary[];
export interface ListUpdatesResponse {
  updates: UpdateSummary[];
  nextToken?: string | undefined;
}
export type ClientToken = string;
export interface PutLinkFlowsRequest {
  gatewayId: string;
  linkId: string;
  clientToken?: string | undefined;
  lockToken: string;
  flows: Flow[];
}
export interface PutLinkFlowsResponse {
  gatewayId: string;
  linkId: string;
  status: LinkStatus;
  updateId: string;
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
  direction?: LinkDirection | undefined;
  flowModules?: ModuleConfiguration[] | undefined;
  pendingFlowModules?: ModuleConfiguration[] | undefined;
  attributes?: LinkAttributes | undefined;
  logSettings?: LinkLogSettings | undefined;
  connectivityType?: ConnectivityType | undefined;
  errorDetails?: ErrorDetail[] | undefined;
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
  logSettings?: LinkLogSettings | undefined;
  timeoutInMillis?: number | undefined;
  clientToken?: string | undefined;
}
export interface UpdateLinkResponse {
  linkId: string;
  status: LinkStatus;
  updateId: string;
}
export interface UpdateLinkModuleFlowRequest {
  clientToken?: string | undefined;
  gatewayId: string;
  linkId: string;
  modules: ModuleConfiguration[];
}
export interface UpdateLinkModuleFlowResponse {
  gatewayId: string;
  linkId: string;
  status: LinkStatus;
  updateId: string;
}
export interface UpdateLinkRoutingRuleRequest {
  gatewayId: string;
  linkId: string;
  ruleId: string;
  priority: number;
  conditions: RuleCondition;
  clientToken?: string | undefined;
}
export interface UpdateLinkRoutingRuleResponse {
  ruleId: string;
  status: RuleStatus;
  updatedAt: Date;
  updateId: string;
}
export interface UpdateRequesterGatewayRequest {
  clientToken?: string | undefined;
  gatewayId: string;
  description?: string | undefined;
}
export interface UpdateRequesterGatewayResponse {
  gatewayId: string;
  status: RequesterGatewayStatus;
}
export interface UpdateResponderGatewayRequest {
  domainName?: string | undefined;
  port: number;
  protocol: Protocol;
  listenerConfig?: ListenerConfig | undefined;
  trustStoreConfiguration?: TrustStoreConfiguration | undefined;
  managedEndpointConfiguration?: ManagedEndpointConfiguration | undefined;
  clientToken?: string | undefined;
  gatewayId: string;
  description?: string | undefined;
  clientRoutingPolicy?: ClientRoutingPolicy | undefined;
}
export interface UpdateResponderGatewayResponse {
  gatewayId: string;
  status: ResponderGatewayStatus;
  clientRoutingPolicy?: ClientRoutingPolicy | undefined;
  updateId: string;
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
  AcceptLinkRequest & RegionInput,
  AcceptLinkResponse,
  AcceptLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<AcceptLinkRequest>,
  output: __S(816, __c51, 0) as any as S.Schema<AcceptLinkResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptLink",
  telemetry: TELEMETRY,
  span: "AcceptLink",
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
  AssociateCertificateRequest & RegionInput,
  AssociateCertificateResponse,
  AssociateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<AssociateCertificateRequest>,
  output: __S(896, __c56, 0) as any as S.Schema<AssociateCertificateResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateCertificate",
  telemetry: TELEMETRY,
  span: "AssociateCertificate",
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
  CreateInboundExternalLinkRequest & RegionInput,
  CreateInboundExternalLinkResponse,
  CreateInboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<CreateInboundExternalLinkRequest>,
  output: __S(913, __c57, 1) as any as S.Schema<CreateInboundExternalLinkResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInboundExternalLink",
  telemetry: TELEMETRY,
  span: "CreateInboundExternalLink",
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
  CreateLinkRequest & RegionInput,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLink",
  telemetry: TELEMETRY,
  span: "CreateLink",
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
  CreateLinkRoutingRuleRequest & RegionInput,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLinkRoutingRule",
  telemetry: TELEMETRY,
  span: "CreateLinkRoutingRule",
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
  CreateOutboundExternalLinkRequest & RegionInput,
  CreateOutboundExternalLinkResponse,
  CreateOutboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c3, 0) as any as S.Schema<CreateOutboundExternalLinkRequest>,
  output: __S(49, __c3, 1) as any as S.Schema<CreateOutboundExternalLinkResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOutboundExternalLink",
  telemetry: TELEMETRY,
  span: "CreateOutboundExternalLink",
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
  CreateRequesterGatewayRequest & RegionInput,
  CreateRequesterGatewayResponse,
  CreateRequesterGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<CreateRequesterGatewayRequest>,
  output: __S(65, __c4, 1) as any as S.Schema<CreateRequesterGatewayResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRequesterGateway",
  telemetry: TELEMETRY,
  span: "CreateRequesterGateway",
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
  CreateResponderGatewayRequest & RegionInput,
  CreateResponderGatewayResponse,
  CreateResponderGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<CreateResponderGatewayRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<CreateResponderGatewayResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResponderGateway",
  telemetry: TELEMETRY,
  span: "CreateResponderGateway",
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
  DeleteInboundExternalLinkRequest & RegionInput,
  DeleteInboundExternalLinkResponse,
  DeleteInboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<DeleteInboundExternalLinkRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteInboundExternalLinkResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInboundExternalLink",
  telemetry: TELEMETRY,
  span: "DeleteInboundExternalLink",
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
  DeleteLinkRequest & RegionInput,
  DeleteLinkResponse,
  DeleteLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DeleteLinkRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteLinkResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLink",
  telemetry: TELEMETRY,
  span: "DeleteLink",
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
  DeleteLinkRoutingRuleRequest & RegionInput,
  DeleteLinkRoutingRuleResponse,
  DeleteLinkRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<DeleteLinkRoutingRuleRequest>,
  output: __S(161, __c10, 1) as any as S.Schema<DeleteLinkRoutingRuleResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLinkRoutingRule",
  telemetry: TELEMETRY,
  span: "DeleteLinkRoutingRule",
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
  DeleteOutboundExternalLinkRequest & RegionInput,
  DeleteOutboundExternalLinkResponse,
  DeleteOutboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<DeleteOutboundExternalLinkRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteOutboundExternalLinkResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOutboundExternalLink",
  telemetry: TELEMETRY,
  span: "DeleteOutboundExternalLink",
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
  DeleteRequesterGatewayRequest & RegionInput,
  DeleteRequesterGatewayResponse,
  DeleteRequesterGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<DeleteRequesterGatewayRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<DeleteRequesterGatewayResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRequesterGateway",
  telemetry: TELEMETRY,
  span: "DeleteRequesterGateway",
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
  DeleteResponderGatewayRequest & RegionInput,
  DeleteResponderGatewayResponse,
  DeleteResponderGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DeleteResponderGatewayRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<DeleteResponderGatewayResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResponderGateway",
  telemetry: TELEMETRY,
  span: "DeleteResponderGateway",
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
  DisassociateCertificateRequest & RegionInput,
  DisassociateCertificateResponse,
  DisassociateCertificateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DisassociateCertificateRequest>,
  output: __S(896, __c56, 0) as any as S.Schema<DisassociateCertificateResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateCertificate",
  telemetry: TELEMETRY,
  span: "DisassociateCertificate",
}));

export type GetAvailableModuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a module that you can attach. If you can't attach the module, the operation returns ResourceNotFoundException, the same as for a missing one.
 */
export const getAvailableModule: API.OperationMethod<
  GetAvailableModuleRequest & RegionInput,
  GetAvailableModuleResponse,
  GetAvailableModuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<GetAvailableModuleRequest>,
  output: __S(257, __c16, 1) as any as S.Schema<GetAvailableModuleResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAvailableModule",
  telemetry: TELEMETRY,
  span: "GetAvailableModule",
}));

export type GetAvailableModuleVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns an ACTIVE or DEPRECATED version of a module that you can attach. If you can't attach the module, or the version is in another status, the operation returns ResourceNotFoundException, the same as for a missing one.
 */
export const getAvailableModuleVersion: API.OperationMethod<
  GetAvailableModuleVersionRequest & RegionInput,
  GetAvailableModuleVersionResponse,
  GetAvailableModuleVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<GetAvailableModuleVersionRequest>,
  output: __S(273, __c17, 1) as any as S.Schema<GetAvailableModuleVersionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAvailableModuleVersion",
  telemetry: TELEMETRY,
  span: "GetAvailableModuleVersion",
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
  GetCertificateAssociationRequest & RegionInput,
  GetCertificateAssociationResponse,
  GetCertificateAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<GetCertificateAssociationRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<GetCertificateAssociationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCertificateAssociation",
  telemetry: TELEMETRY,
  span: "GetCertificateAssociation",
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
  GetInboundExternalLinkRequest & RegionInput,
  GetInboundExternalLinkResponse,
  GetInboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<GetInboundExternalLinkRequest>,
  output: __S(305, __c19, 1) as any as S.Schema<GetInboundExternalLinkResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInboundExternalLink",
  telemetry: TELEMETRY,
  span: "GetInboundExternalLink",
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
  GetLinkRequest & RegionInput,
  GetLinkResponse,
  GetLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<GetLinkRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<GetLinkResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLink",
  telemetry: TELEMETRY,
  span: "GetLink",
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
  GetLinkRoutingRuleRequest & RegionInput,
  GetLinkRoutingRuleResponse,
  GetLinkRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<GetLinkRoutingRuleRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<GetLinkRoutingRuleResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLinkRoutingRule",
  telemetry: TELEMETRY,
  span: "GetLinkRoutingRule",
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
  GetOutboundExternalLinkRequest & RegionInput,
  GetOutboundExternalLinkResponse,
  GetOutboundExternalLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<GetOutboundExternalLinkRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<GetOutboundExternalLinkResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOutboundExternalLink",
  telemetry: TELEMETRY,
  span: "GetOutboundExternalLink",
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
  GetRequesterGatewayRequest & RegionInput,
  GetRequesterGatewayResponse,
  GetRequesterGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<GetRequesterGatewayRequest>,
  output: __S(385, __c24, 1) as any as S.Schema<GetRequesterGatewayResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRequesterGateway",
  telemetry: TELEMETRY,
  span: "GetRequesterGateway",
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
  GetResponderGatewayRequest & RegionInput,
  GetResponderGatewayResponse,
  GetResponderGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<GetResponderGatewayRequest>,
  output: __S(401, __c25, 1) as any as S.Schema<GetResponderGatewayResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResponderGateway",
  telemetry: TELEMETRY,
  span: "GetResponderGateway",
}));

export type GetUpdateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns ResourceNotFoundException for an updateId past the 90-day retention window, indistinguishable in the response from an id that never existed.
 */
export const getUpdate: API.OperationMethod<
  GetUpdateRequest & RegionInput,
  GetUpdateResponse,
  GetUpdateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<GetUpdateRequest>,
  output: __S(426, __c26, 10) as any as S.Schema<GetUpdateResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUpdate",
  telemetry: TELEMETRY,
  span: "GetUpdate",
}));

export type ListAvailableModulesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the modules that you can attach, newest first by `createdAt`. Results are paginated. Use `nextToken` to get the next page.
 */
export const listAvailableModules: API.PaginatedOperationMethod<
  ListAvailableModulesRequest & RegionInput,
  ListAvailableModulesResponse,
  ListAvailableModulesError,
  Credentials | HttpClient.HttpClient,
  AvailableModuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<ListAvailableModulesRequest>,
  output: __S(435, __c27, 3) as any as S.Schema<ListAvailableModulesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableModules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "modules",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAvailableModules",
})) as any;

export type ListAvailableModuleVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the ACTIVE and DEPRECATED versions of a module that you can attach, highest version first (numerically by MAJOR, then MINOR, then PATCH). If you can't attach the module, the operation returns ResourceNotFoundException, the same as for a missing one. If the module has no ACTIVE or DEPRECATED versions, the operation returns an empty list. The operation lists DEPRECATED versions so that you can inspect one that you've attached, but you can't attach them. Results are paginated. Use `nextToken` to get the next page.
 */
export const listAvailableModuleVersions: API.PaginatedOperationMethod<
  ListAvailableModuleVersionsRequest & RegionInput,
  ListAvailableModuleVersionsResponse,
  ListAvailableModuleVersionsError,
  Credentials | HttpClient.HttpClient,
  AvailableModuleVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<ListAvailableModuleVersionsRequest>,
  output: __S(451, __c28, 3) as any as S.Schema<ListAvailableModuleVersionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAvailableModuleVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "versions",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAvailableModuleVersions",
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
  ListCertificateAssociationsRequest & RegionInput,
  ListCertificateAssociationsResponse,
  ListCertificateAssociationsError,
  Credentials | HttpClient.HttpClient,
  CertificateAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<ListCertificateAssociationsRequest>,
  output: __S(467, __c29, 3) as any as S.Schema<ListCertificateAssociationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCertificateAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "certificateAssociations",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListCertificateAssociations",
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
  ListLinkRoutingRulesRequest & RegionInput,
  ListLinkRoutingRulesResponse,
  ListLinkRoutingRulesError,
  Credentials | HttpClient.HttpClient,
  LinkRoutingRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<ListLinkRoutingRulesRequest>,
  output: __S(483, __c30, 3) as any as S.Schema<ListLinkRoutingRulesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLinkRoutingRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "rules",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListLinkRoutingRules",
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
  ListLinksRequest & RegionInput,
  ListLinksResponse,
  ListLinksError,
  Credentials | HttpClient.HttpClient,
  ListLinksResponseStructure
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ListLinksRequest>,
  output: __S(499, __c31, 3) as any as S.Schema<ListLinksResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLinks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "links",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListLinks",
})) as any;

export type ListRequesterGatewaysError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists requester gateways.
 */
export const listRequesterGateways: API.PaginatedOperationMethod<
  ListRequesterGatewaysRequest & RegionInput,
  ListRequesterGatewaysResponse,
  ListRequesterGatewaysError,
  Credentials | HttpClient.HttpClient,
  GatewayId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<ListRequesterGatewaysRequest>,
  output: __S(528, __c33, 0) as any as S.Schema<ListRequesterGatewaysResponse>,
  errors: [InternalServerException, ValidationException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRequesterGateways",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "gatewayIds",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListRequesterGateways",
})) as any;

export type ListResponderGatewaysError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists reponder gateways.
 */
export const listResponderGateways: API.PaginatedOperationMethod<
  ListResponderGatewaysRequest & RegionInput,
  ListResponderGatewaysResponse,
  ListResponderGatewaysError,
  Credentials | HttpClient.HttpClient,
  GatewayId
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<ListResponderGatewaysRequest>,
  output: __S(528, __c33, 0) as any as S.Schema<ListResponderGatewaysResponse>,
  errors: [InternalServerException, ValidationException],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResponderGateways",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "gatewayIds",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListResponderGateways",
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
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(561, __c35, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type ListUpdatesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the updates on a gateway. Results are paginated. Use `nextToken` to get the next page.
 */
export const listUpdates: API.PaginatedOperationMethod<
  ListUpdatesRequest & RegionInput,
  ListUpdatesResponse,
  ListUpdatesError,
  Credentials | HttpClient.HttpClient,
  UpdateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<ListUpdatesRequest>,
  output: __S(579, __c36, 3) as any as S.Schema<ListUpdatesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUpdates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "updates",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListUpdates",
})) as any;

export type PutLinkFlowsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Replaces a link's flow configuration. The change applies asynchronously. The call returns once the change is accepted, and the link serves its prior flows until the update commits atomically. RTB Fabric validates the request before accepting it, and a request that fails validation changes nothing. After the call, use GetLink. Once the change completes, the link's status is ACTIVE again and its flows show the change.
 */
export const putLinkFlows: API.OperationMethod<
  PutLinkFlowsRequest & RegionInput,
  PutLinkFlowsResponse,
  PutLinkFlowsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<PutLinkFlowsRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<PutLinkFlowsResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutLinkFlows",
  telemetry: TELEMETRY,
  span: "PutLinkFlows",
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
  RejectLinkRequest & RegionInput,
  RejectLinkResponse,
  RejectLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<RejectLinkRequest>,
  output: __S(816, __c51, 0) as any as S.Schema<RejectLinkResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectLink",
  telemetry: TELEMETRY,
  span: "RejectLink",
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
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
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
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(640, __c40, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
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
  UpdateLinkRequest & RegionInput,
  UpdateLinkResponse,
  UpdateLinkError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<UpdateLinkRequest>,
  output: __S(673, __c42, 1) as any as S.Schema<UpdateLinkResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLink",
  telemetry: TELEMETRY,
  span: "UpdateLink",
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
  UpdateLinkModuleFlowRequest & RegionInput,
  UpdateLinkModuleFlowResponse,
  UpdateLinkModuleFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<UpdateLinkModuleFlowRequest>,
  output: __S(689, __c43, 1) as any as S.Schema<UpdateLinkModuleFlowResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLinkModuleFlow",
  telemetry: TELEMETRY,
  span: "UpdateLinkModuleFlow",
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
  UpdateLinkRoutingRuleRequest & RegionInput,
  UpdateLinkRoutingRuleResponse,
  UpdateLinkRoutingRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<UpdateLinkRoutingRuleRequest>,
  output: __S(705, __c44, 1) as any as S.Schema<UpdateLinkRoutingRuleResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLinkRoutingRule",
  telemetry: TELEMETRY,
  span: "UpdateLinkRoutingRule",
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
  UpdateRequesterGatewayRequest & RegionInput,
  UpdateRequesterGatewayResponse,
  UpdateRequesterGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<UpdateRequesterGatewayRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<UpdateRequesterGatewayResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRequesterGateway",
  telemetry: TELEMETRY,
  span: "UpdateRequesterGateway",
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
  UpdateResponderGatewayRequest & RegionInput,
  UpdateResponderGatewayResponse,
  UpdateResponderGatewayError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<UpdateResponderGatewayRequest>,
  output: __S(737, __c46, 1) as any as S.Schema<UpdateResponderGatewayResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResponderGateway",
  telemetry: TELEMETRY,
  span: "UpdateResponderGateway",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          peerGatewayId: S.String,
          attributes: S.optional(__S(866, __c54, 2)),
          httpResponderAllowed: S.optional(S.Boolean),
          tags: S.optional(__S(928, __c58, 0)),
          logSettings: __S(850, __c53, 2),
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
          flowModules: S.optional(__S(812, __c50, 12)),
          pendingFlowModules: S.optional(__S(812, __c50, 12)),
          attributes: S.optional(__S(866, __c54, 2)),
          logSettings: S.optional(__S(850, __c53, 2)),
          connectivityType: S.optional(S.String),
          errorDetails: S.optional(__S(785, __c49, 1)),
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
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
          priority: S.Number,
          conditions: __S(33, __c2, 1),
          tags: S.optional(__S(928, __c58, 0)),
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
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          attributes: S.optional(__S(866, __c54, 2)),
          publicEndpoint: S.String,
          logSettings: __S(850, __c53, 2),
          tags: S.optional(__S(928, __c58, 0)),
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
    case 1:
      return S.suspend(() =>
        S.Struct({ gatewayId: S.String, linkId: S.String, status: S.String }),
      ).annotate({ identifier: "CreateOutboundExternalLinkResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.String,
          subnetIds: __S(768, __c48, 0),
          securityGroupIds: __S(768, __c48, 0),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          description: S.optional(S.String),
          tags: S.optional(__S(928, __c58, 0)),
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
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          vpcId: S.String,
          subnetIds: __S(768, __c48, 0),
          securityGroupIds: __S(768, __c48, 0),
          domainName: S.optional(S.String),
          port: S.Number,
          protocol: S.String,
          listenerConfig: S.optional(__S(96, __c6, 0)),
          trustStoreConfiguration: S.optional(__S(98, __c6, 2)),
          managedEndpointConfiguration: S.optional(__S(102, __c6, 6)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          description: S.optional(S.String),
          tags: S.optional(__S(928, __c58, 0)),
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
          listenerConfig: S.optional(__S(96, __c6, 0)),
          externalInboundEndpoint: S.optional(S.String),
          clientRoutingPolicy: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateResponderGatewayResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ protocols: __S(832, __c52, 0) })).annotate({
        identifier: "ListenerConfig",
      });
    case 1:
      return S.Array(SensitiveString);
    case 2:
      return S.suspend(() =>
        S.Struct({ certificateAuthorityCertificates: __S(97, __c6, 1) }),
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
          autoScalingGroupNames: __S(768, __c48, 0),
          roleArn: S.String,
          healthCheckConfig: S.optional(__S(99, __c6, 3)),
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
        /*@__PURE__*/ S.Struct({ autoScalingGroups: __S(100, __c6, 4) }),
        /*@__PURE__*/ S.Struct({ eksEndpoints: __S(101, __c6, 5) }),
      ]);
  }
}
function __c7(j: number): any {
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
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ linkId: S.String, status: S.String })).annotate({
        identifier: "DeleteInboundExternalLinkResponse",
      });
  }
}
function __c9(j: number): any {
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
function __c10(j: number): any {
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
function __c11(j: number): any {
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
function __c12(j: number): any {
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
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ gatewayId: S.String, status: S.String })).annotate({
        identifier: "DeleteRequesterGatewayResponse",
      });
  }
}
function __c14(j: number): any {
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
function __c15(j: number): any {
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
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ moduleId: S.String.pipe(T.HttpLabel("moduleId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/available-modules/{moduleId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAvailableModuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          moduleId: S.String,
          moduleArn: S.String,
          moduleName: S.String,
          description: S.optional(S.String),
          subscriptionType: S.String,
          subscriptionStatus: S.String,
          marketplaceProductId: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetAvailableModuleResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          moduleId: S.String.pipe(T.HttpLabel("moduleId")),
          version: S.String.pipe(T.HttpLabel("version")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/available-modules/{moduleId}/versions/{version}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAvailableModuleVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          moduleId: S.String,
          version: S.String,
          moduleVersionArn: S.String,
          status: S.String,
          permissions: __S(832, __c52, 0),
          configurableActions: __S(832, __c52, 0),
          configurationSchema: S.optional(S.String),
          releaseNotes: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetAvailableModuleVersionResponse" });
  }
}
function __c18(j: number): any {
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
          errorDetails: S.optional(__S(785, __c49, 1)),
        }),
      ).annotate({ identifier: "GetCertificateAssociationResponse" });
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
          flowModules: S.optional(__S(812, __c50, 12)),
          pendingFlowModules: S.optional(__S(812, __c50, 12)),
          attributes: S.optional(__S(866, __c54, 2)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(928, __c58, 0)),
          logSettings: S.optional(__S(850, __c53, 2)),
          connectivityType: S.optional(S.String),
          errorDetails: S.optional(__S(785, __c49, 1)),
          lockToken: S.optional(S.String),
          flows: S.optional(__S(327, __c20, 7)),
        }),
      ).annotate({ identifier: "GetInboundExternalLinkResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          moduleVersionArn: S.String,
          selectedActions: S.optional(__S(832, __c52, 0)),
          failureMode: S.optional(S.String),
          activationPercentage: S.optional(S.Number),
          configurationValues: S.optional(S.String),
        }),
      ).annotate({ identifier: "FlowModule" });
    case 1:
      return S.Array(__S(320, __c20, 0));
    case 2:
      return S.suspend(() => S.Struct({ modules: __S(321, __c20, 1) })).annotate({
        identifier: "SequentialPipeline",
      });
    case 3:
      return S.Array(__S(322, __c20, 2));
    case 4:
      return S.suspend(() => S.Struct({ phases: __S(323, __c20, 3) })).annotate({
        identifier: "PhasedPipeline",
      });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ sequential: __S(322, __c20, 2) }),
        /*@__PURE__*/ S.Struct({ phased: __S(324, __c20, 4) }),
      ]);
    case 6:
      return S.suspend(() => S.Struct({ name: S.String, pipeline: __S(325, __c20, 5) })).annotate({
        identifier: "Flow",
      });
    case 7:
      return S.Array(__S(326, __c20, 6));
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
          flowModules: S.optional(__S(812, __c50, 12)),
          pendingFlowModules: S.optional(__S(812, __c50, 12)),
          attributes: S.optional(__S(866, __c54, 2)),
          logSettings: S.optional(__S(850, __c53, 2)),
          connectivityType: S.optional(S.String),
          errorDetails: S.optional(__S(785, __c49, 1)),
          linkId: S.String,
          tags: S.optional(__S(928, __c58, 0)),
          httpResponderAllowed: S.optional(S.Boolean),
          timeoutInMillis: S.optional(S.Number),
          lockToken: S.optional(S.String),
          flows: S.optional(__S(327, __c20, 7)),
        }),
      ).annotate({ identifier: "GetLinkResponse" });
  }
}
function __c22(j: number): any {
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
          tags: S.optional(__S(928, __c58, 0)),
          errorDetails: S.optional(__S(785, __c49, 1)),
        }),
      ).annotate({ identifier: "GetLinkRoutingRuleResponse" });
  }
}
function __c23(j: number): any {
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
          flowModules: S.optional(__S(812, __c50, 12)),
          pendingFlowModules: S.optional(__S(812, __c50, 12)),
          attributes: S.optional(__S(866, __c54, 2)),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(928, __c58, 0)),
          logSettings: S.optional(__S(850, __c53, 2)),
          connectivityType: S.optional(S.String),
          errorDetails: S.optional(__S(785, __c49, 1)),
          lockToken: S.optional(S.String),
          flows: S.optional(__S(327, __c20, 7)),
        }),
      ).annotate({ identifier: "GetOutboundExternalLinkResponse" });
  }
}
function __c24(j: number): any {
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
          errorDetails: S.optional(__S(785, __c49, 1)),
          vpcId: S.String,
          subnetIds: __S(768, __c48, 0),
          securityGroupIds: __S(768, __c48, 0),
          gatewayId: S.String,
          tags: S.optional(__S(928, __c58, 0)),
          activeLinksCount: S.optional(S.Number),
          totalLinksCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetRequesterGatewayResponse" });
  }
}
function __c25(j: number): any {
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
          subnetIds: __S(768, __c48, 0),
          securityGroupIds: __S(768, __c48, 0),
          status: S.String,
          description: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          errorDetails: S.optional(__S(785, __c49, 1)),
          domainName: S.optional(S.String),
          port: S.Number,
          protocol: S.String,
          listenerConfig: S.optional(__S(96, __c6, 0)),
          trustStoreConfiguration: S.optional(__S(98, __c6, 2)),
          managedEndpointConfiguration: S.optional(__S(102, __c6, 6)),
          gatewayId: S.String,
          tags: S.optional(__S(928, __c58, 0)),
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
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          updateId: S.String.pipe(T.HttpLabel("updateId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/gateway/{gatewayId}/updates/{updateId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUpdateRequest" });
    case 1:
      return S.suspend(() => S.Struct({ linkId: S.String })).annotate({ identifier: "LinkTarget" });
    case 2:
      return S.suspend(() => S.Struct({ linkId: S.String, ruleId: S.String })).annotate({
        identifier: "RoutingRuleTarget",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ gateway: /*@__PURE__*/ S.Struct({}) }),
        /*@__PURE__*/ S.Struct({ link: __S(417, __c26, 1) }),
        /*@__PURE__*/ S.Struct({ routingRule: __S(418, __c26, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          clientRoutingPolicy: S.optional(S.String),
          domainName: S.optional(S.String),
          port: S.Number,
          protocol: S.String,
          listenerConfig: S.optional(__S(96, __c6, 0)),
          trustStoreConfiguration: S.optional(__S(98, __c6, 2)),
          managedEndpointConfiguration: S.optional(__S(102, __c6, 6)),
        }),
      ).annotate({ identifier: "ResponderGatewayConfigParameters" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          logSettings: S.optional(__S(850, __c53, 2)),
          timeoutInMillis: S.optional(S.Number),
        }),
      ).annotate({ identifier: "LinkConfigParameters" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ modules: __S(812, __c50, 12) }),
        /*@__PURE__*/ S.Struct({ flows: __S(327, __c20, 7) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({ priority: S.Number, conditions: __S(33, __c2, 1) }),
      ).annotate({ identifier: "RoutingRuleParameters" });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ responderGatewayConfig: __S(420, __c26, 4) }),
        /*@__PURE__*/ S.Struct({ linkConfig: __S(421, __c26, 5) }),
        /*@__PURE__*/ S.Struct({ linkFlow: __S(422, __c26, 6) }),
        /*@__PURE__*/ S.Struct({ routingRule: __S(423, __c26, 7) }),
      ]);
    case 9:
      return S.suspend(() =>
        S.Struct({
          updateId: S.String,
          type: S.String,
          status: S.String,
          target: __S(419, __c26, 3),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          parameters: S.optional(__S(424, __c26, 8)),
          errorDetails: S.optional(__S(785, __c49, 1)),
        }),
      ).annotate({ identifier: "Update" });
    case 10:
      return S.suspend(() => S.Struct({ update: __S(425, __c26, 9) })).annotate({
        identifier: "GetUpdateResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          subscriptionType: S.optional(S.String).pipe(T.HttpQuery("subscriptionType")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/available-modules" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAvailableModulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          moduleId: S.String,
          moduleArn: S.String,
          moduleName: S.String,
          subscriptionType: S.String,
          subscriptionStatus: S.String,
          marketplaceProductId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AvailableModuleSummary" });
    case 2:
      return S.Array(__S(433, __c27, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ modules: __S(434, __c27, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAvailableModulesResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          moduleId: S.String.pipe(T.HttpLabel("moduleId")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/available-modules/{moduleId}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAvailableModuleVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          version: S.String,
          moduleVersionArn: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "AvailableModuleVersionSummary" });
    case 2:
      return S.Array(__S(449, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          moduleId: S.String,
          versions: __S(450, __c28, 2),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAvailableModuleVersionsResponse" });
  }
}
function __c29(j: number): any {
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
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ certificateAssociations: __S(466, __c29, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCertificateAssociationsResponse" });
  }
}
function __c30(j: number): any {
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
          errorDetails: S.optional(__S(785, __c49, 1)),
        }),
      ).annotate({ identifier: "LinkRoutingRuleSummary" });
    case 2:
      return S.Array(__S(481, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ rules: S.optional(__S(482, __c30, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLinkRoutingRulesResponse" });
  }
}
function __c31(j: number): any {
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
          flowModules: S.optional(__S(812, __c50, 12)),
          pendingFlowModules: S.optional(__S(812, __c50, 12)),
          attributes: S.optional(__S(866, __c54, 2)),
          logSettings: S.optional(__S(850, __c53, 2)),
          connectivityType: S.optional(S.String),
          errorDetails: S.optional(__S(785, __c49, 1)),
          linkId: S.String,
          tags: S.optional(__S(928, __c58, 0)),
          publicEndpoint: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListLinksResponseStructure" });
    case 2:
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ links: S.optional(__S(498, __c31, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListLinksResponse" });
  }
}
function __c32(j: number): any {
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
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ gatewayIds: S.optional(__S(768, __c48, 0)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRequesterGatewaysResponse" });
  }
}
function __c34(j: number): any {
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
function __c35(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(928, __c58, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.optional(S.String).pipe(T.HttpQuery("linkId")),
          ruleId: S.optional(S.String).pipe(T.HttpQuery("ruleId")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/gateway/{gatewayId}/updates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListUpdatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          updateId: S.String,
          type: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "UpdateSummary" });
    case 2:
      return S.Array(__S(577, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ updates: __S(578, __c36, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListUpdatesResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          lockToken: S.String,
          flows: __S(327, __c20, 7),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/gateway/{gatewayId}/link/{linkId}/flows" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutLinkFlowsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ gatewayId: S.String, linkId: S.String, status: S.String, updateId: S.String }),
      ).annotate({ identifier: "PutLinkFlowsResponse" });
  }
}
function __c38(j: number): any {
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
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(928, __c58, 0),
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
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(768, __c48, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
          logSettings: S.optional(__S(850, __c53, 2)),
          timeoutInMillis: S.optional(S.Number),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
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
    case 1:
      return S.suspend(() =>
        S.Struct({ linkId: S.String, status: S.String, updateId: S.optional(S.String) }),
      ).annotate({ identifier: "UpdateLinkResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
          modules: __S(812, __c50, 12),
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
    case 1:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String,
          linkId: S.String,
          status: S.String,
          updateId: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateLinkModuleFlowResponse" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
          ruleId: S.String.pipe(T.HttpLabel("ruleId")),
          priority: S.Number,
          conditions: __S(33, __c2, 1),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
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
          updateId: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateLinkRoutingRuleResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
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
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainName: S.optional(S.String),
          port: S.Number,
          protocol: S.String,
          listenerConfig: S.optional(__S(96, __c6, 0)),
          trustStoreConfiguration: S.optional(__S(98, __c6, 2)),
          managedEndpointConfiguration: S.optional(__S(102, __c6, 6)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
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
          updateId: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateResponderGatewayResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          linkId: S.String.pipe(T.HttpLabel("linkId")),
          attributes: S.optional(__S(866, __c54, 2)),
          logSettings: __S(850, __c53, 2),
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
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          code: S.String,
          message: S.String,
          resourceIds: S.optional(__S(768, __c48, 0)),
        }),
      ).annotate({ identifier: "ErrorDetail" });
    case 1:
      return S.Array(__S(784, __c49, 0));
  }
}
function __c50(j: number): any {
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
      return S.suspend(() => S.Struct({ path: S.String, values: __S(768, __c48, 0) })).annotate({
        identifier: "FilterCriterion",
      });
    case 2:
      return S.Array(__S(801, __c50, 1));
    case 3:
      return S.suspend(() => S.Struct({ criteria: __S(802, __c50, 2) })).annotate({
        identifier: "Filter",
      });
    case 4:
      return S.Array(__S(803, __c50, 3));
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
        /*@__PURE__*/ S.Struct({ noBid: __S(805, __c50, 5) }),
        /*@__PURE__*/ S.Struct({ headerTag: __S(806, __c50, 6) }),
      ]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          filterType: S.String,
          filterConfiguration: __S(804, __c50, 4),
          action: __S(807, __c50, 7),
          holdbackPercentage: S.Number,
        }),
      ).annotate({ identifier: "OpenRtbAttributeModuleParameters" });
    case 9:
      return S.suspend(() => S.Struct({ tps: S.optional(S.Number) })).annotate({
        identifier: "RateLimiterModuleParameters",
      });
    case 10:
      return S.Union([
        /*@__PURE__*/ S.Struct({ noBid: __S(800, __c50, 0) }),
        /*@__PURE__*/ S.Struct({ openRtbAttribute: __S(808, __c50, 8) }),
        /*@__PURE__*/ S.Struct({ rateLimiter: __S(809, __c50, 9) }),
      ]);
    case 11:
      return S.suspend(() =>
        S.Struct({
          version: S.optional(S.String),
          name: S.String,
          dependsOn: S.optional(__S(768, __c48, 0)),
          moduleParameters: S.optional(__S(810, __c50, 10)),
        }),
      ).annotate({ identifier: "ModuleConfiguration" });
    case 12:
      return S.Array(__S(811, __c50, 11));
  }
}
function __c51(j: number): any {
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
          flowModules: S.optional(__S(812, __c50, 12)),
          pendingFlowModules: S.optional(__S(812, __c50, 12)),
          attributes: S.optional(__S(866, __c54, 2)),
          logSettings: S.optional(__S(850, __c53, 2)),
          connectivityType: S.optional(S.String),
          errorDetails: S.optional(__S(785, __c49, 1)),
          linkId: S.String,
        }),
      ).annotate({ identifier: "AcceptLinkResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ errorLog: S.Number, filterLog: S.Number })).annotate({
        identifier: "LinkApplicationLogSampling",
      });
    case 1:
      return S.suspend(() => S.Struct({ sampling: __S(848, __c53, 0) })).annotate({
        identifier: "LinkApplicationLogConfiguration",
      });
    case 2:
      return S.suspend(() => S.Struct({ applicationLogs: __S(849, __c53, 1) })).annotate({
        identifier: "LinkLogSettings",
      });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          httpCode: S.String,
          action: S.String,
          loggingTypes: __S(832, __c52, 0),
          responseLoggingPercentage: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ResponderErrorMaskingForHttpCode" });
    case 1:
      return S.Array(__S(864, __c54, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          responderErrorMasking: S.optional(__S(865, __c54, 1)),
          customerProvidedId: S.optional(S.String),
        }),
      ).annotate({ identifier: "LinkAttributes" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          acmCertificateArn: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
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
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ gatewayId: S.String, acmCertificateArn: S.String, status: S.String }),
      ).annotate({ identifier: "AssociateCertificateResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          gatewayId: S.String.pipe(T.HttpLabel("gatewayId")),
          attributes: S.optional(__S(866, __c54, 2)),
          logSettings: __S(850, __c53, 2),
          tags: S.optional(__S(928, __c58, 0)),
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
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
