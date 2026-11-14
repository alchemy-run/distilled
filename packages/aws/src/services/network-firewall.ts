import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Network Firewall",
  serviceShapeName: "NetworkFirewall_20201112",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "network-firewall" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-11-12");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
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
              `https://network-firewall-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://network-firewall-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://network-firewall.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://network-firewall.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://network-firewall.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "NetworkFirewall",
  service: "NetworkFirewall",
  templates: false,
  propagate: TxXray.propagate,
} as const;

export class InsufficientCapacityException
  extends /*@__PURE__*/ S.TaggedError<InsufficientCapacityException>()(
    "InsufficientCapacityException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InternalServerError
  extends /*@__PURE__*/ S.TaggedError<InternalServerError>()("InternalServerError", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidOperationException
  extends /*@__PURE__*/ S.TaggedError<InvalidOperationException>()("InvalidOperationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()("InvalidRequestException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidResourcePolicyException
  extends /*@__PURE__*/ S.TaggedError<InvalidResourcePolicyException>()(
    "InvalidResourcePolicyException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidTokenException>()("InvalidTokenException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withThrottlingError, C.withRetryableError) {}
export class LogDestinationPermissionException
  extends /*@__PURE__*/ S.TaggedError<LogDestinationPermissionException>()(
    "LogDestinationPermissionException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ResourceOwnerCheckException
  extends /*@__PURE__*/ S.TaggedError<ResourceOwnerCheckException>()(
    "ResourceOwnerCheckException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()("ThrottlingException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withThrottlingError, C.withRetryableError) {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ S.TaggedError<UnsupportedOperationException>()(
    "UnsupportedOperationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export type TransitGatewayAttachmentId = string;
export interface AcceptNetworkFirewallTransitGatewayAttachmentRequest {
  TransitGatewayAttachmentId: string;
}
export type TransitGatewayAttachmentStatus =
  | "CREATING"
  | "DELETING"
  | "DELETED"
  | "FAILED"
  | "ERROR"
  | "READY"
  | "PENDING_ACCEPTANCE"
  | "REJECTING"
  | "REJECTED"
  | (string & {});
export interface AcceptNetworkFirewallTransitGatewayAttachmentResponse {
  TransitGatewayAttachmentId: string;
  TransitGatewayAttachmentStatus: TransitGatewayAttachmentStatus;
}
export type UpdateToken = string;
export type ResourceArn = string;
export type ResourceName = string;
export type AvailabilityZoneMappingString = string;
export interface AvailabilityZoneMapping {
  AvailabilityZone: string;
}
export type AvailabilityZoneMappings = AvailabilityZoneMapping[];
export interface AssociateAvailabilityZonesRequest {
  UpdateToken?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  AvailabilityZoneMappings: AvailabilityZoneMapping[];
}
export interface AssociateAvailabilityZonesResponse {
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  AvailabilityZoneMappings?: AvailabilityZoneMapping[] | undefined;
  UpdateToken?: string | undefined;
}
export interface AssociateFirewallPolicyRequest {
  UpdateToken?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  FirewallPolicyArn: string;
}
export interface AssociateFirewallPolicyResponse {
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  FirewallPolicyArn?: string | undefined;
  UpdateToken?: string | undefined;
}
export type CollectionMember_String = string;
export type IPAddressType = "DUALSTACK" | "IPV4" | "IPV6" | (string & {});
export interface SubnetMapping {
  SubnetId: string;
  IPAddressType?: IPAddressType | undefined;
}
export type SubnetMappings = SubnetMapping[];
export type NatGatewayAllocationIdList = string[];
export type NatGatewayPrivateIpList = string[];
export interface NatGatewayCreateMapping {
  SubnetId: string;
  AllocationIds?: string[] | undefined;
  PrivateIps?: string[] | undefined;
}
export type NatGatewayCreateMappingsList = NatGatewayCreateMapping[];
export interface AssociateSubnetsRequest {
  UpdateToken?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  SubnetMappings: SubnetMapping[];
  NatGatewayCreateMappings?: NatGatewayCreateMapping[] | undefined;
}
export interface AssociateSubnetsResponse {
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  SubnetMappings?: SubnetMapping[] | undefined;
  UpdateToken?: string | undefined;
}
export type Description = string;
export type ContainerMonitoringType = "ECS" | "EKS" | (string & {});
export type ContainerAttributeKey = string;
export type ContainerAttributeValue = string;
export interface ContainerAttribute {
  Key: string;
  Value: string;
}
export type ContainerAttributes = ContainerAttribute[];
export interface ContainerMonitoringConfiguration {
  ClusterArn: string;
  AttributeFilters?: ContainerAttribute[] | undefined;
}
export type ContainerMonitoringConfigurations = ContainerMonitoringConfiguration[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateContainerAssociationRequest {
  ContainerAssociationName: string;
  Description?: string | undefined;
  Type: ContainerMonitoringType;
  ContainerMonitoringConfigurations: ContainerMonitoringConfiguration[];
  Tags?: Tag[] | undefined;
}
export type ContainerAssociationStatus =
  | "ACTIVE"
  | "CREATING"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export interface CreateContainerAssociationResponse {
  ContainerAssociationName?: string | undefined;
  ContainerAssociationArn?: string | undefined;
  Description?: string | undefined;
  Type?: ContainerMonitoringType | undefined;
  ContainerMonitoringConfigurations?: ContainerMonitoringConfiguration[] | undefined;
  Status?: ContainerAssociationStatus | undefined;
  Tags?: Tag[] | undefined;
  UpdateToken?: string | undefined;
}
export type VpcId = string;
export type KeyId = string;
export type EncryptionType = "CUSTOMER_KMS" | "AWS_OWNED_KMS_KEY" | (string & {});
export interface EncryptionConfiguration {
  KeyId?: string | undefined;
  Type: EncryptionType;
}
export type EnabledAnalysisType = "TLS_SNI" | "HTTP_HOST" | (string & {});
export type EnabledAnalysisTypes = EnabledAnalysisType[];
export type TransitGatewayId = string;
export type NatGatewayPort = number;
export type ListenerPropertyType = "HTTP" | "HTTPS" | (string & {});
export interface ListenerProperty {
  Port?: number | undefined;
  Type?: ListenerPropertyType | undefined;
}
export type ListenerProperties = ListenerProperty[];
export type ProxyDomainName = string;
export interface ProxySettings {
  ListenerProperties: ListenerProperty[];
  CertificateArn?: string | undefined;
  DomainName?: string | undefined;
}
export interface VpcEndpoint {
  VpcId: string;
  SubnetMappings: SubnetMapping[];
}
export type TransparentFilteringNatScope = "NAT_ALL" | "NAT_NONE" | (string & {});
export interface CreateFirewallRequest {
  FirewallName: string;
  FirewallPolicyArn: string;
  VpcId?: string | undefined;
  SubnetMappings?: SubnetMapping[] | undefined;
  DeleteProtection?: boolean | undefined;
  SubnetChangeProtection?: boolean | undefined;
  FirewallPolicyChangeProtection?: boolean | undefined;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  EnabledAnalysisTypes?: EnabledAnalysisType[] | undefined;
  TransitGatewayId?: string | undefined;
  AvailabilityZoneMappings?: AvailabilityZoneMapping[] | undefined;
  AvailabilityZoneChangeProtection?: boolean | undefined;
  NatGatewayCreateMappings?: NatGatewayCreateMapping[] | undefined;
  ProxySettings?: ProxySettings | undefined;
  VpcEndpoint?: VpcEndpoint | undefined;
  TransparentFilteringNatScope?: TransparentFilteringNatScope | undefined;
}
export type ResourceId = string;
export type NumberOfAssociations = number;
export type AWSAccountId = string;
export interface Firewall {
  FirewallName?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallPolicyArn: string;
  VpcId: string;
  SubnetMappings: SubnetMapping[];
  DeleteProtection?: boolean | undefined;
  SubnetChangeProtection?: boolean | undefined;
  FirewallPolicyChangeProtection?: boolean | undefined;
  Description?: string | undefined;
  FirewallId: string;
  Tags?: Tag[] | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  NumberOfAssociations?: number | undefined;
  EnabledAnalysisTypes?: EnabledAnalysisType[] | undefined;
  TransitGatewayId?: string | undefined;
  TransitGatewayOwnerAccountId?: string | undefined;
  AvailabilityZoneMappings?: AvailabilityZoneMapping[] | undefined;
  AvailabilityZoneChangeProtection?: boolean | undefined;
  NatGatewayCreateMappings?: NatGatewayCreateMapping[] | undefined;
  ProxySettings?: ProxySettings | undefined;
  VpcEndpoint?: VpcEndpoint | undefined;
  TransparentFilteringNatScope?: TransparentFilteringNatScope | undefined;
}
export type FirewallStatusValue = "PROVISIONING" | "DELETING" | "READY" | "FAILED" | (string & {});
export type ConfigurationSyncState = "PENDING" | "IN_SYNC" | "CAPACITY_CONSTRAINED" | (string & {});
export type AvailabilityZone = string;
export type AzSubnet = string;
export type EndpointId = string;
export type AttachmentStatus =
  | "CREATING"
  | "DELETING"
  | "FAILED"
  | "ERROR"
  | "SCALING"
  | "READY"
  | (string & {});
export type StatusMessage = string;
export type DnsName = string;
export interface Attachment {
  SubnetId?: string | undefined;
  EndpointId?: string | undefined;
  Status?: AttachmentStatus | undefined;
  StatusMessage?: string | undefined;
  DnsName?: string | undefined;
}
export type PerObjectSyncStatus =
  | "PENDING"
  | "IN_SYNC"
  | "CAPACITY_CONSTRAINED"
  | "NOT_SUBSCRIBED"
  | "DEPRECATED"
  | (string & {});
export interface PerObjectStatus {
  SyncStatus?: PerObjectSyncStatus | undefined;
  UpdateToken?: string | undefined;
}
export type SyncStateConfig = { [key: string]: PerObjectStatus | undefined };
export type NatGatewayId = string;
export type NatGatewayAttachmentStatus =
  | "CREATING"
  | "READY"
  | "UPDATING"
  | "FAILED"
  | "DELETING"
  | (string & {});
export type StatusReason = string;
export interface NatGatewayAttachment {
  NatGatewayId: string;
  Status: NatGatewayAttachmentStatus;
  StatusMessage?: string | undefined;
  DnsName?: string | undefined;
}
export type NatGatewayAttachmentsList = NatGatewayAttachment[];
export interface SyncState {
  Attachment?: Attachment | undefined;
  Config?: { [key: string]: PerObjectStatus | undefined } | undefined;
  NatGatewayAttachments?: NatGatewayAttachment[] | undefined;
}
export type SyncStates = { [key: string]: SyncState | undefined };
export type CIDRCount = number;
export type IPSetArn = string;
export interface IPSetMetadata {
  ResolvedCIDRCount?: number | undefined;
}
export type IPSetMetadataMap = { [key: string]: IPSetMetadata | undefined };
export interface CIDRSummary {
  AvailableCIDRCount?: number | undefined;
  UtilizedCIDRCount?: number | undefined;
  IPSetReferences?: { [key: string]: IPSetMetadata | undefined } | undefined;
}
export interface CapacityUsageSummary {
  CIDRs?: CIDRSummary | undefined;
}
export type AttachmentId = string;
export type TransitGatewayAttachmentSyncStateMessage = string;
export interface TransitGatewayAttachmentSyncState {
  AttachmentId?: string | undefined;
  TransitGatewayAttachmentStatus?: TransitGatewayAttachmentStatus | undefined;
  StatusMessage?: string | undefined;
}
export interface FirewallStatus {
  Status: FirewallStatusValue;
  ConfigurationSyncStateSummary: ConfigurationSyncState;
  SyncStates?: { [key: string]: SyncState | undefined } | undefined;
  CapacityUsageSummary?: CapacityUsageSummary | undefined;
  TransitGatewayAttachmentSyncState?: TransitGatewayAttachmentSyncState | undefined;
}
export interface CreateFirewallResponse {
  Firewall?: Firewall | undefined;
  FirewallStatus?: FirewallStatus | undefined;
}
export type Priority = number;
export interface StatelessRuleGroupReference {
  ResourceArn: string;
  Priority: number;
}
export type StatelessRuleGroupReferences = StatelessRuleGroupReference[];
export type StatelessActions = string[];
export type ActionName = string;
export type DimensionValue = string;
export interface Dimension {
  Value: string;
}
export type Dimensions = Dimension[];
export interface PublishMetricAction {
  Dimensions: Dimension[];
}
export interface ActionDefinition {
  PublishMetricAction?: PublishMetricAction | undefined;
}
export interface CustomAction {
  ActionName: string;
  ActionDefinition: ActionDefinition;
}
export type CustomActions = CustomAction[];
export type OverrideAction = "DROP_TO_ALERT" | (string & {});
export interface StatefulRuleGroupOverride {
  Action?: OverrideAction | undefined;
}
export type DeepThreatInspection = boolean;
export interface StatefulRuleGroupReference {
  ResourceArn: string;
  Priority?: number | undefined;
  Override?: StatefulRuleGroupOverride | undefined;
  DeepThreatInspection?: boolean | undefined;
}
export type StatefulRuleGroupReferences = StatefulRuleGroupReference[];
export type StatefulActions = string[];
export type RuleOrder = "DEFAULT_ACTION_ORDER" | "STRICT_ORDER" | (string & {});
export type StreamExceptionPolicy = "DROP" | "CONTINUE" | "REJECT" | (string & {});
export type TcpIdleTimeoutRangeBound = number;
export interface FlowTimeouts {
  TcpIdleTimeoutSeconds?: number | undefined;
}
export interface StatefulEngineOptions {
  RuleOrder?: RuleOrder | undefined;
  StreamExceptionPolicy?: StreamExceptionPolicy | undefined;
  FlowTimeouts?: FlowTimeouts | undefined;
}
export type RuleVariableName = string;
export type VariableDefinition = string;
export type VariableDefinitionList = string[];
export interface IPSet {
  Definition: string[];
}
export type IPSets = { [key: string]: IPSet | undefined };
export interface PolicyVariables {
  RuleVariables?: { [key: string]: IPSet | undefined } | undefined;
}
export type EnableTLSSessionHolding = boolean;
export type Route53ResolvedIPValidationAction = "REJECT" | "DROP" | "ALERT" | (string & {});
export type DNSFirewallRuleGroupId = string;
export type DNSExpiryExceptionPolicy = "REJECT" | "DROP" | "CONTINUE" | (string & {});
export type AddressDefinition = string;
export interface Address {
  AddressDefinition: string;
}
export type Route53ResolvedIPValidationAddresses = Address[];
export interface Route53ResolvedIPValidation {
  Action: Route53ResolvedIPValidationAction;
  DNSFirewallRuleGroupId: string;
  DNSExpiryExceptionPolicy: DNSExpiryExceptionPolicy;
  BypassDestinationValidationIPRanges?: Address[] | undefined;
  SourceIPRanges?: Address[] | undefined;
}
export interface FirewallPolicy {
  StatelessRuleGroupReferences?: StatelessRuleGroupReference[] | undefined;
  StatelessDefaultActions: string[];
  StatelessFragmentDefaultActions: string[];
  StatelessCustomActions?: CustomAction[] | undefined;
  StatefulRuleGroupReferences?: StatefulRuleGroupReference[] | undefined;
  StatefulDefaultActions?: string[] | undefined;
  StatefulEngineOptions?: StatefulEngineOptions | undefined;
  TLSInspectionConfigurationArn?: string | undefined;
  PolicyVariables?: PolicyVariables | undefined;
  EnableTLSSessionHolding?: boolean | undefined;
  Route53ResolvedIPValidation?: Route53ResolvedIPValidation | undefined;
}
export interface CreateFirewallPolicyRequest {
  FirewallPolicyName: string;
  FirewallPolicy: FirewallPolicy;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
  DryRun?: boolean | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export type ResourceStatus = "ACTIVE" | "DELETING" | "ERROR" | "UPDATING" | (string & {});
export type ResourceStatusMessage = string;
export type RuleCapacity = number;
export type FirewallPolicyErrorCode =
  | "DNS_FIREWALL_RULE_GROUP_UNAVAILABLE"
  | "ROUTE53_RESOLVED_IP_VALIDATION_MISSING"
  | (string & {});
export type FirewallPolicyErrorResourceId = string;
export interface FirewallPolicyError {
  Code: FirewallPolicyErrorCode;
  Message: string;
  ResourceId?: string | undefined;
}
export type FirewallPolicyErrors = FirewallPolicyError[];
export type LastUpdateTime = Date;
export interface FirewallPolicyResponse {
  FirewallPolicyName: string;
  FirewallPolicyArn: string;
  FirewallPolicyId: string;
  Description?: string | undefined;
  FirewallPolicyStatus?: ResourceStatus | undefined;
  StatusMessage?: string | undefined;
  Tags?: Tag[] | undefined;
  ConsumedStatelessRuleCapacity?: number | undefined;
  ConsumedStatefulRuleCapacity?: number | undefined;
  ConsumedStatefulDomainCapacity?: number | undefined;
  NumberOfAssociations?: number | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  Errors?: FirewallPolicyError[] | undefined;
  LastModifiedTime?: Date | undefined;
}
export interface CreateFirewallPolicyResponse {
  UpdateToken: string;
  FirewallPolicyResponse: FirewallPolicyResponse;
}
export type RulesString = string;
export type FirewallRuleAction =
  | "ACCEPT"
  | "DROP"
  | "REJECT"
  | "REJECT_DST"
  | "REJECT_BOTH"
  | (string & {});
export type ActionScope = "FLOW" | "TX" | "HOOK" | "PACKET" | (string & {});
export type HookKey =
  | "TCP_ALL"
  | "TCP_FLOW_START"
  | "TCP_PRE_FLOW"
  | "TCP_PRE_STREAM"
  | "SCTP_ALL"
  | "SCTP_FLOW_START"
  | "SCTP_PRE_FLOW"
  | "SCTP_PRE_STREAM"
  | "IPV6_ALL"
  | "IPV6_FLOW_START"
  | "IPV6_PRE_FLOW"
  | "IPV6_PRE_STREAM"
  | "ICMPV6_ALL"
  | "ICMPV6_FLOW_START"
  | "ICMPV6_PRE_FLOW"
  | "ICMPV6_PRE_STREAM"
  | "UDP_ALL"
  | "UDP_FLOW_START"
  | "UDP_PRE_FLOW"
  | "UDP_PRE_STREAM"
  | "ICMP_ALL"
  | "ICMP_FLOW_START"
  | "ICMP_PRE_FLOW"
  | "ICMP_PRE_STREAM"
  | "ICMPV4_ALL"
  | "ICMPV4_FLOW_START"
  | "ICMPV4_PRE_FLOW"
  | "ICMPV4_PRE_STREAM"
  | "IP_ALL"
  | "IP_FLOW_START"
  | "IP_PRE_FLOW"
  | "IP_PRE_STREAM"
  | "IPV4_ALL"
  | "IPV4_FLOW_START"
  | "IPV4_PRE_FLOW"
  | "IPV4_PRE_STREAM"
  | "TLS_CLIENT_STARTED"
  | "TLS_CLIENT_HELLO"
  | "TLS_CLIENT_CERT"
  | "TLS_CLIENT_DATA"
  | "TLS_CLIENT_FINISHED"
  | "TLS_SERVER_STARTED"
  | "TLS_SERVER_HELLO"
  | "TLS_SERVER_CERT"
  | "TLS_SERVER_DATA"
  | "TLS_SERVER_FINISHED"
  | "HTTP1_REQUEST_STARTED"
  | "HTTP1_REQUEST_LINE"
  | "HTTP1_REQUEST_HEADERS"
  | "HTTP1_REQUEST_BODY"
  | "HTTP1_REQUEST_TRAILER"
  | "HTTP1_REQUEST_COMPLETE"
  | "HTTP1_RESPONSE_STARTED"
  | "HTTP1_RESPONSE_LINE"
  | "HTTP1_RESPONSE_HEADERS"
  | "HTTP1_RESPONSE_BODY"
  | "HTTP1_RESPONSE_TRAILER"
  | "HTTP1_RESPONSE_COMPLETE"
  | "HTTP2_STREAM_REQUEST_STARTED"
  | "HTTP2_STREAM_REQUEST_HEADERS"
  | "HTTP2_STREAM_REQUEST_DATA"
  | "HTTP2_STREAM_REQUEST_CLOSED"
  | "HTTP2_STREAM_REQUEST_COMPLETE"
  | "HTTP2_STREAM_RESPONSE_STARTED"
  | "HTTP2_STREAM_RESPONSE_HEADERS"
  | "HTTP2_STREAM_RESPONSE_DATA"
  | "HTTP2_STREAM_RESPONSE_CLOSED"
  | "HTTP2_STREAM_RESPONSE_COMPLETE"
  | "HTTP2_GLOBAL_REQUEST_STARTED"
  | "HTTP2_GLOBAL_REQUEST_COMPLETE"
  | "HTTP2_GLOBAL_RESPONSE_STARTED"
  | "HTTP2_GLOBAL_RESPONSE_COMPLETE"
  | "DOH2_STREAM_REQUEST_STARTED"
  | "DOH2_STREAM_REQUEST_HEADERS"
  | "DOH2_STREAM_REQUEST_DATA"
  | "DOH2_STREAM_REQUEST_CLOSED"
  | "DOH2_STREAM_REQUEST_COMPLETE"
  | "DOH2_STREAM_RESPONSE_STARTED"
  | "DOH2_STREAM_RESPONSE_HEADERS"
  | "DOH2_STREAM_RESPONSE_DATA"
  | "DOH2_STREAM_RESPONSE_CLOSED"
  | "DOH2_STREAM_RESPONSE_COMPLETE"
  | "DOH2_GLOBAL_REQUEST_STARTED"
  | "DOH2_GLOBAL_REQUEST_COMPLETE"
  | "DOH2_GLOBAL_RESPONSE_STARTED"
  | "DOH2_GLOBAL_RESPONSE_COMPLETE"
  | "DNS_REQUEST_STARTED"
  | "DNS_REQUEST_COMPLETE"
  | "DNS_RESPONSE_STARTED"
  | "DNS_RESPONSE_COMPLETE"
  | "SMTP_REQUEST_STARTED"
  | "SMTP_REQUEST_DATA"
  | "SMTP_REQUEST_COMPLETE"
  | "SMTP_RESPONSE_STARTED"
  | "SMTP_RESPONSE_DATA"
  | "SMTP_RESPONSE_COMPLETE"
  | "FTP_REQUEST_STARTED"
  | "FTP_REQUEST_COMPLETE"
  | "FTP_RESPONSE_STARTED"
  | "FTP_RESPONSE_COMPLETE"
  | "FTP_DATA_REQUEST_STARTED"
  | "FTP_DATA_REQUEST_COMPLETE"
  | "FTP_DATA_RESPONSE_STARTED"
  | "FTP_DATA_RESPONSE_COMPLETE"
  | "SMB_REQUEST_STARTED"
  | "SMB_REQUEST_COMPLETE"
  | "SMB_RESPONSE_STARTED"
  | "SMB_RESPONSE_COMPLETE"
  | "DCERPC_REQUEST_STARTED"
  | "DCERPC_REQUEST_COMPLETE"
  | "DCERPC_RESPONSE_STARTED"
  | "DCERPC_RESPONSE_COMPLETE"
  | "NFS_REQUEST_STARTED"
  | "NFS_REQUEST_COMPLETE"
  | "NFS_RESPONSE_STARTED"
  | "NFS_RESPONSE_COMPLETE"
  | "KRB5_REQUEST_STARTED"
  | "KRB5_REQUEST_COMPLETE"
  | "KRB5_RESPONSE_STARTED"
  | "KRB5_RESPONSE_COMPLETE"
  | "IKE_REQUEST_STARTED"
  | "IKE_REQUEST_COMPLETE"
  | "IKE_RESPONSE_STARTED"
  | "IKE_RESPONSE_COMPLETE"
  | "TFTP_REQUEST_STARTED"
  | "TFTP_REQUEST_COMPLETE"
  | "TFTP_RESPONSE_STARTED"
  | "TFTP_RESPONSE_COMPLETE"
  | "DHCP_REQUEST_STARTED"
  | "DHCP_REQUEST_COMPLETE"
  | "DHCP_RESPONSE_STARTED"
  | "DHCP_RESPONSE_COMPLETE"
  | "QUIC_REQUEST_STARTED"
  | "QUIC_REQUEST_COMPLETE"
  | "QUIC_RESPONSE_STARTED"
  | "QUIC_RESPONSE_COMPLETE"
  | "RDP_REQUEST_STARTED"
  | "RDP_REQUEST_COMPLETE"
  | "RDP_RESPONSE_STARTED"
  | "RDP_RESPONSE_COMPLETE"
  | "RFB_REQUEST_STARTED"
  | "RFB_REQUEST_COMPLETE"
  | "RFB_RESPONSE_STARTED"
  | "RFB_RESPONSE_COMPLETE"
  | "MQTT_REQUEST_STARTED"
  | "MQTT_REQUEST_COMPLETE"
  | "MQTT_RESPONSE_STARTED"
  | "MQTT_RESPONSE_COMPLETE"
  | "PGSQL_REQUEST_STARTED"
  | "PGSQL_REQUEST_COMPLETE"
  | "PGSQL_RESPONSE_STARTED"
  | "PGSQL_RESPONSE_COMPLETE"
  | "SNMP_REQUEST_STARTED"
  | "SNMP_REQUEST_COMPLETE"
  | "SNMP_RESPONSE_STARTED"
  | "SNMP_RESPONSE_COMPLETE"
  | "NTP_REQUEST_STARTED"
  | "NTP_REQUEST_COMPLETE"
  | "NTP_RESPONSE_STARTED"
  | "NTP_RESPONSE_COMPLETE"
  | "TELNET_REQUEST_STARTED"
  | "TELNET_REQUEST_COMPLETE"
  | "TELNET_RESPONSE_STARTED"
  | "TELNET_RESPONSE_COMPLETE"
  | "WEBSOCKET_REQUEST_STARTED"
  | "WEBSOCKET_REQUEST_COMPLETE"
  | "WEBSOCKET_RESPONSE_STARTED"
  | "WEBSOCKET_RESPONSE_COMPLETE"
  | "LDAP_REQUEST_STARTED"
  | "LDAP_REQUEST_COMPLETE"
  | "LDAP_RESPONSE_STARTED"
  | "LDAP_RESPONSE_COMPLETE"
  | "POP3_REQUEST_STARTED"
  | "POP3_REQUEST_COMPLETE"
  | "POP3_RESPONSE_STARTED"
  | "POP3_RESPONSE_COMPLETE"
  | "MDNS_REQUEST_STARTED"
  | "MDNS_REQUEST_COMPLETE"
  | "MDNS_RESPONSE_STARTED"
  | "MDNS_RESPONSE_COMPLETE"
  | "BITTORRENT_DHT_REQUEST_STARTED"
  | "BITTORRENT_DHT_REQUEST_COMPLETE"
  | "BITTORRENT_DHT_RESPONSE_STARTED"
  | "BITTORRENT_DHT_RESPONSE_COMPLETE"
  | "DNP3_REQUEST_STARTED"
  | "DNP3_REQUEST_COMPLETE"
  | "DNP3_RESPONSE_STARTED"
  | "DNP3_RESPONSE_COMPLETE"
  | "SSH_REQUEST_IN_PROGRESS"
  | "SSH_REQUEST_BANNER_WAIT_EOL"
  | "SSH_REQUEST_BANNER_DONE"
  | "SSH_REQUEST_FINISHED"
  | "SSH_RESPONSE_IN_PROGRESS"
  | "SSH_RESPONSE_BANNER_WAIT_EOL"
  | "SSH_RESPONSE_BANNER_DONE"
  | "SSH_RESPONSE_FINISHED"
  | (string & {});
export type FirewallRuleProtocol =
  | "IP"
  | "TCP"
  | "UDP"
  | "ICMP"
  | "HTTP"
  | "FTP"
  | "TLS"
  | "SMB"
  | "DNS"
  | "DCERPC"
  | "SSH"
  | "SMTP"
  | "MSN"
  | "KRB5"
  | "IKEV2"
  | "TFTP"
  | "NTP"
  | "DHCP"
  | "HTTP2"
  | "QUIC"
  | "ICMPV4"
  | "ICMPV6"
  | "SCTP"
  | "IPV4"
  | "IPV6"
  | "DOH2"
  | "FTP_DATA"
  | "NFS"
  | "RDP"
  | "RFB"
  | "MQTT"
  | "PGSQL"
  | "SNMP"
  | "TELNET"
  | "WEBSOCKET"
  | "LDAP"
  | "POP3"
  | "MDNS"
  | "BITTORRENT_DHT"
  | "DNP3"
  | (string & {});
export type Source = string;
export type Destination = string;
export type Port = string;
export type Keyword = string;
export type Setting = string;
export type Settings = string[];
export interface RuleOption {
  Keyword: string;
  Settings?: string[] | undefined;
}
export type RuleOptions = RuleOption[];
export type AcceptPriorHooks = boolean;
export type AlertEnabled = boolean;
export type BypassIPSEnabled = boolean;
export type RuleEnabled = boolean;
export type RuleDescriptionText = string;
export interface RuleMetadata {
  RuleEnabled?: boolean | undefined;
  RuleDescription?: string | undefined;
}
export interface FirewallRule {
  Action: FirewallRuleAction;
  ActionScope: ActionScope;
  Hook: HookKey;
  Protocol: FirewallRuleProtocol;
  SourceIPs?: string | undefined;
  DestIPs?: string | undefined;
  SourcePorts?: string | undefined;
  DestPorts?: string | undefined;
  RuleOptions?: RuleOption[] | undefined;
  AcceptPriorHooks?: boolean | undefined;
  AlertEnabled?: boolean | undefined;
  BypassIPSEnabled?: boolean | undefined;
  RuleMetadata?: RuleMetadata | undefined;
}
export type FirewallRules = FirewallRule[];
export type RuleTargets = string[];
export type TargetType = "TLS_SNI" | "HTTP_HOST" | "AWS_ROUTE_53_RESOLVED_DOMAIN" | (string & {});
export type TargetTypes = TargetType[];
export type GeneratedRulesType =
  | "ALLOWLIST"
  | "DENYLIST"
  | "REJECTLIST"
  | "ALERTLIST"
  | (string & {});
export interface RulesSourceList {
  Targets: string[];
  TargetTypes: TargetType[];
  GeneratedRulesType: GeneratedRulesType;
}
export interface FirewallRulesSource {
  RulesString?: string | undefined;
  FirewallRules?: FirewallRule[] | undefined;
  RulesSourceList?: RulesSourceList | undefined;
}
export interface PortSet {
  Definition?: string[] | undefined;
}
export type PortSets = { [key: string]: PortSet | undefined };
export interface RuleVariables {
  IPSets?: { [key: string]: IPSet | undefined } | undefined;
  PortSets?: { [key: string]: PortSet | undefined } | undefined;
}
export type IPSetReferenceName = string;
export interface IPSetReference {
  ReferenceArn?: string | undefined;
}
export type IPSetReferenceMap = { [key: string]: IPSetReference | undefined };
export interface ReferenceSets {
  IPSetReferences?: { [key: string]: IPSetReference | undefined } | undefined;
}
export interface FirewallRuleGroup {
  RulesSource: FirewallRulesSource;
  RuleVariables?: RuleVariables | undefined;
  ReferenceSets?: ReferenceSets | undefined;
}
export interface FirewallRuleGroupEntry {
  Priority?: number | undefined;
  ResourceArn?: string | undefined;
  InlineRuleGroup?: FirewallRuleGroup | undefined;
}
export type FirewallRuleGroupEntries = FirewallRuleGroupEntry[];
export interface IpsRulesSource {
  RulesString?: string | undefined;
}
export interface IpsRuleGroup {
  RulesSource: IpsRulesSource;
  RuleVariables?: RuleVariables | undefined;
  ReferenceSets?: ReferenceSets | undefined;
}
export interface IpsRuleGroupOverride {
  Action?: OverrideAction | undefined;
}
export interface IpsRuleGroupEntry {
  ResourceArn?: string | undefined;
  InlineRuleGroup?: IpsRuleGroup | undefined;
  Override?: IpsRuleGroupOverride | undefined;
}
export type IpsRuleGroupEntries = IpsRuleGroupEntry[];
export type PolicyMode = "ENFORCE" | "MONITOR" | (string & {});
export type PolicyDefaultAction = "DROP" | "ACCEPT" | "REJECT" | "ALERT" | (string & {});
export type StreamExceptionPolicyV2 = "DROP" | "REJECT" | (string & {});
export interface StatefulEngineOptionsV2 {
  StreamExceptionPolicy?: StreamExceptionPolicyV2 | undefined;
  FlowTimeouts?: FlowTimeouts | undefined;
}
export interface FirewallPolicyV2 {
  FirewallRuleGroupEntries?: FirewallRuleGroupEntry[] | undefined;
  IpsRuleGroupEntries?: IpsRuleGroupEntry[] | undefined;
  PolicyMode?: PolicyMode | undefined;
  FirewallDefaultAction?: PolicyDefaultAction | undefined;
  StatefulEngineOptions?: StatefulEngineOptionsV2 | undefined;
  TLSInspectionConfigurationArn?: string | undefined;
  PolicyVariables?: PolicyVariables | undefined;
  Route53ResolvedIPValidation?: Route53ResolvedIPValidation | undefined;
}
export interface CreateFirewallPolicyV2Request {
  FirewallPolicyV2Name: string;
  FirewallPolicyV2: FirewallPolicyV2;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
  DryRun?: boolean | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface FirewallPolicyV2Response {
  FirewallPolicyV2Name: string;
  FirewallPolicyV2Arn: string;
  FirewallPolicyV2Id: string;
  Description?: string | undefined;
  FirewallPolicyV2Status?: ResourceStatus | undefined;
  StatusMessage?: string | undefined;
  Tags?: Tag[] | undefined;
  ConsumedFirewallRuleCapacity?: number | undefined;
  ConsumedIpsRuleCapacity?: number | undefined;
  ConsumedIpsDomainCapacity?: number | undefined;
  NumberOfAssociations?: number | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  Errors?: FirewallPolicyError[] | undefined;
  LastModifiedTime?: Date | undefined;
}
export interface CreateFirewallPolicyV2Response {
  UpdateToken: string;
  FirewallPolicyV2Response: FirewallPolicyV2Response;
}
export type StatefulAction = "PASS" | "DROP" | "ALERT" | "REJECT" | (string & {});
export type StatefulRuleProtocol =
  | "IP"
  | "TCP"
  | "UDP"
  | "ICMP"
  | "HTTP"
  | "FTP"
  | "TLS"
  | "SMB"
  | "DNS"
  | "DCERPC"
  | "SSH"
  | "SMTP"
  | "IMAP"
  | "MSN"
  | "KRB5"
  | "IKEV2"
  | "TFTP"
  | "NTP"
  | "DHCP"
  | "HTTP2"
  | "QUIC"
  | (string & {});
export type StatefulRuleDirection = "FORWARD" | "ANY" | (string & {});
export interface Header {
  Protocol: StatefulRuleProtocol;
  Source: string;
  SourcePort: string;
  Direction: StatefulRuleDirection;
  Destination: string;
  DestinationPort: string;
}
export interface StatefulRule {
  Action: StatefulAction;
  Header: Header;
  RuleOptions: RuleOption[];
}
export type StatefulRules = StatefulRule[];
export type Addresses = Address[];
export type PortRangeBound = number;
export interface PortRange {
  FromPort: number;
  ToPort: number;
}
export type PortRanges = PortRange[];
export type ProtocolNumber = number;
export type ProtocolNumbers = number[];
export type TCPFlag = "FIN" | "SYN" | "RST" | "PSH" | "ACK" | "URG" | "ECE" | "CWR" | (string & {});
export type Flags = TCPFlag[];
export interface TCPFlagField {
  Flags: TCPFlag[];
  Masks?: TCPFlag[] | undefined;
}
export type TCPFlags = TCPFlagField[];
export interface MatchAttributes {
  Sources?: Address[] | undefined;
  Destinations?: Address[] | undefined;
  SourcePorts?: PortRange[] | undefined;
  DestinationPorts?: PortRange[] | undefined;
  Protocols?: number[] | undefined;
  TCPFlags?: TCPFlagField[] | undefined;
}
export interface RuleDefinition {
  MatchAttributes: MatchAttributes;
  Actions: string[];
}
export interface StatelessRule {
  RuleDefinition: RuleDefinition;
  Priority: number;
}
export type StatelessRules = StatelessRule[];
export interface StatelessRulesAndCustomActions {
  StatelessRules: StatelessRule[];
  CustomActions?: CustomAction[] | undefined;
}
export interface RulesSource {
  RulesString?: string | undefined;
  RulesSourceList?: RulesSourceList | undefined;
  StatefulRules?: StatefulRule[] | undefined;
  StatelessRulesAndCustomActions?: StatelessRulesAndCustomActions | undefined;
}
export interface StatefulRuleOptions {
  RuleOrder?: RuleOrder | undefined;
}
export interface RuleGroup {
  RuleVariables?: RuleVariables | undefined;
  ReferenceSets?: ReferenceSets | undefined;
  RulesSource: RulesSource;
  StatefulRuleOptions?: StatefulRuleOptions | undefined;
}
export type RuleGroupType =
  | "STATELESS"
  | "STATEFUL"
  | "STATEFUL_DOMAIN"
  | "FIREWALL"
  | "IPS"
  | (string & {});
export interface SourceMetadata {
  SourceArn?: string | undefined;
  SourceUpdateToken?: string | undefined;
}
export type SummaryRuleOption = "SID" | "MSG" | "METADATA" | (string & {});
export type SummaryRuleOptions = SummaryRuleOption[];
export interface SummaryConfiguration {
  RuleOptions?: SummaryRuleOption[] | undefined;
}
export interface CreateRuleGroupRequest {
  RuleGroupName: string;
  RuleGroup?: RuleGroup | undefined;
  FirewallRuleGroup?: FirewallRuleGroup | undefined;
  IpsRuleGroup?: IpsRuleGroup | undefined;
  Rules?: string | undefined;
  Type: RuleGroupType;
  Description?: string | undefined;
  Capacity: number;
  Tags?: Tag[] | undefined;
  DryRun?: boolean | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  SourceMetadata?: SourceMetadata | undefined;
  AnalyzeRuleGroup?: boolean | undefined;
  SummaryConfiguration?: SummaryConfiguration | undefined;
}
export type RuleIdList = string[];
export type IdentifiedType =
  | "STATELESS_RULE_FORWARDING_ASYMMETRICALLY"
  | "STATELESS_RULE_CONTAINS_TCP_FLAGS"
  | (string & {});
export interface AnalysisResult {
  IdentifiedRuleIds?: string[] | undefined;
  IdentifiedType?: IdentifiedType | undefined;
  AnalysisDetail?: string | undefined;
}
export type AnalysisResultList = AnalysisResult[];
export interface RuleGroupResponse {
  RuleGroupArn: string;
  RuleGroupName: string;
  RuleGroupId: string;
  Description?: string | undefined;
  Type?: RuleGroupType | undefined;
  Capacity?: number | undefined;
  RuleGroupStatus?: ResourceStatus | undefined;
  Tags?: Tag[] | undefined;
  ConsumedCapacity?: number | undefined;
  NumberOfAssociations?: number | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  SourceMetadata?: SourceMetadata | undefined;
  SnsTopic?: string | undefined;
  LastModifiedTime?: Date | undefined;
  AnalysisResults?: AnalysisResult[] | undefined;
  SummaryConfiguration?: SummaryConfiguration | undefined;
}
export interface CreateRuleGroupResponse {
  UpdateToken: string;
  RuleGroupResponse: RuleGroupResponse;
}
export interface ServerCertificate {
  ResourceArn?: string | undefined;
}
export type ServerCertificates = ServerCertificate[];
export type TLSInspectionDomain = string;
export type TLSInspectionDomains = string[];
export interface DomainMatch {
  Domains: string[];
}
export type DecryptionAction = "DECRYPT" | "BYPASS" | (string & {});
export type TLSInspectionScopeDeploymentMode =
  | "TRANSPARENT_FIREWALL_ONLY"
  | "EXPLICIT_PROXY_ONLY"
  | "ALL"
  | (string & {});
export interface ServerCertificateScope {
  Sources?: Address[] | undefined;
  Destinations?: Address[] | undefined;
  SourcePorts?: PortRange[] | undefined;
  DestinationPorts?: PortRange[] | undefined;
  Protocols?: number[] | undefined;
  DomainMatch?: DomainMatch | undefined;
  DecryptionAction?: DecryptionAction | undefined;
  DeploymentMode?: TLSInspectionScopeDeploymentMode | undefined;
}
export type ServerCertificateScopes = ServerCertificateScope[];
export type RevocationCheckAction = "PASS" | "DROP" | "REJECT" | (string & {});
export interface CheckCertificateRevocationStatusActions {
  RevokedStatusAction?: RevocationCheckAction | undefined;
  UnknownStatusAction?: RevocationCheckAction | undefined;
}
export interface ServerCertificateConfiguration {
  ServerCertificates?: ServerCertificate[] | undefined;
  Scopes?: ServerCertificateScope[] | undefined;
  CertificateAuthorityArn?: string | undefined;
  CheckCertificateRevocationStatus?: CheckCertificateRevocationStatusActions | undefined;
  DefaultDecryptionBehavior?: DecryptionAction | undefined;
}
export type ServerCertificateConfigurations = ServerCertificateConfiguration[];
export interface TLSInspectionConfiguration {
  ServerCertificateConfigurations?: ServerCertificateConfiguration[] | undefined;
}
export interface CreateTLSInspectionConfigurationRequest {
  TLSInspectionConfigurationName: string;
  TLSInspectionConfiguration: TLSInspectionConfiguration;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface TlsCertificateData {
  CertificateArn?: string | undefined;
  CertificateSerial?: string | undefined;
  Status?: string | undefined;
  StatusMessage?: string | undefined;
}
export type Certificates = TlsCertificateData[];
export interface TLSInspectionConfigurationResponse {
  TLSInspectionConfigurationArn: string;
  TLSInspectionConfigurationName: string;
  TLSInspectionConfigurationId: string;
  TLSInspectionConfigurationStatus?: ResourceStatus | undefined;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
  LastModifiedTime?: Date | undefined;
  NumberOfAssociations?: number | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  Certificates?: TlsCertificateData[] | undefined;
  CertificateAuthority?: TlsCertificateData | undefined;
}
export interface CreateTLSInspectionConfigurationResponse {
  UpdateToken: string;
  TLSInspectionConfigurationResponse: TLSInspectionConfigurationResponse;
}
export interface CreateVpcEndpointAssociationRequest {
  FirewallArn: string;
  VpcId: string;
  SubnetMapping: SubnetMapping;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface VpcEndpointAssociation {
  VpcEndpointAssociationId?: string | undefined;
  VpcEndpointAssociationArn: string;
  FirewallArn: string;
  VpcId: string;
  SubnetMapping: SubnetMapping;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface AZSyncState {
  Attachment?: Attachment | undefined;
}
export type AssociationSyncState = { [key: string]: AZSyncState | undefined };
export interface VpcEndpointAssociationStatus {
  Status: FirewallStatusValue;
  AssociationSyncState?: { [key: string]: AZSyncState | undefined } | undefined;
}
export interface CreateVpcEndpointAssociationResponse {
  VpcEndpointAssociation?: VpcEndpointAssociation | undefined;
  VpcEndpointAssociationStatus?: VpcEndpointAssociationStatus | undefined;
}
export interface DeleteContainerAssociationRequest {
  ContainerAssociationName?: string | undefined;
  ContainerAssociationArn?: string | undefined;
}
export interface DeleteContainerAssociationResponse {
  ContainerAssociationName?: string | undefined;
  ContainerAssociationArn?: string | undefined;
  Status?: ContainerAssociationStatus | undefined;
}
export interface DeleteFirewallRequest {
  FirewallName?: string | undefined;
  FirewallArn?: string | undefined;
  DeleteAssociatedNatGateways?: boolean | undefined;
}
export interface DeleteFirewallResponse {
  Firewall?: Firewall | undefined;
  FirewallStatus?: FirewallStatus | undefined;
}
export interface DeleteFirewallPolicyRequest {
  FirewallPolicyName?: string | undefined;
  FirewallPolicyArn?: string | undefined;
}
export interface DeleteFirewallPolicyResponse {
  FirewallPolicyResponse: FirewallPolicyResponse;
}
export interface DeleteFirewallPolicyV2Request {
  FirewallPolicyV2Arn?: string | undefined;
  FirewallPolicyV2Name?: string | undefined;
}
export interface DeleteFirewallPolicyV2Response {
  FirewallPolicyV2Response: FirewallPolicyV2Response;
}
export interface DeleteNetworkFirewallTransitGatewayAttachmentRequest {
  TransitGatewayAttachmentId: string;
}
export interface DeleteNetworkFirewallTransitGatewayAttachmentResponse {
  TransitGatewayAttachmentId: string;
  TransitGatewayAttachmentStatus: TransitGatewayAttachmentStatus;
}
export interface DeleteProxyRequest {
  NatGatewayId: string;
  ProxyName?: string | undefined;
  ProxyArn?: string | undefined;
}
export interface DeleteProxyResponse {
  NatGatewayId?: string | undefined;
  ProxyName?: string | undefined;
  ProxyArn?: string | undefined;
}
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteRuleGroupRequest {
  RuleGroupName?: string | undefined;
  RuleGroupArn?: string | undefined;
  Type?: RuleGroupType | undefined;
}
export interface DeleteRuleGroupResponse {
  RuleGroupResponse: RuleGroupResponse;
}
export interface DeleteTLSInspectionConfigurationRequest {
  TLSInspectionConfigurationArn?: string | undefined;
  TLSInspectionConfigurationName?: string | undefined;
}
export interface DeleteTLSInspectionConfigurationResponse {
  TLSInspectionConfigurationResponse: TLSInspectionConfigurationResponse;
}
export interface DeleteVpcEndpointAssociationRequest {
  VpcEndpointAssociationArn: string;
}
export interface DeleteVpcEndpointAssociationResponse {
  VpcEndpointAssociation?: VpcEndpointAssociation | undefined;
  VpcEndpointAssociationStatus?: VpcEndpointAssociationStatus | undefined;
}
export interface DescribeContainerAssociationRequest {
  ContainerAssociationName?: string | undefined;
  ContainerAssociationArn?: string | undefined;
}
export type ContainerAssociationLastUpdatedTime = Date;
export interface DescribeContainerAssociationResponse {
  ContainerAssociationName?: string | undefined;
  ContainerAssociationArn?: string | undefined;
  Description?: string | undefined;
  Type?: ContainerMonitoringType | undefined;
  ContainerMonitoringConfigurations?: ContainerMonitoringConfiguration[] | undefined;
  Status?: ContainerAssociationStatus | undefined;
  ResolvedCidrCount?: number | undefined;
  LastUpdatedTime?: Date | undefined;
  Tags?: Tag[] | undefined;
  UpdateToken?: string | undefined;
}
export interface DescribeFirewallRequest {
  FirewallName?: string | undefined;
  FirewallArn?: string | undefined;
}
export interface DescribeFirewallResponse {
  UpdateToken?: string | undefined;
  Firewall?: Firewall | undefined;
  FirewallStatus?: FirewallStatus | undefined;
}
export interface DescribeFirewallMetadataRequest {
  FirewallArn?: string | undefined;
}
export interface AvailabilityZoneMetadata {
  IPAddressType?: IPAddressType | undefined;
}
export type SupportedAvailabilityZones = { [key: string]: AvailabilityZoneMetadata | undefined };
export interface DescribeFirewallMetadataResponse {
  FirewallArn?: string | undefined;
  FirewallPolicyArn?: string | undefined;
  Description?: string | undefined;
  Status?: FirewallStatusValue | undefined;
  SupportedAvailabilityZones?: { [key: string]: AvailabilityZoneMetadata | undefined } | undefined;
  TransitGatewayAttachmentId?: string | undefined;
}
export interface DescribeFirewallPolicyRequest {
  FirewallPolicyName?: string | undefined;
  FirewallPolicyArn?: string | undefined;
}
export interface DescribeFirewallPolicyResponse {
  UpdateToken: string;
  FirewallPolicyResponse: FirewallPolicyResponse;
  FirewallPolicy?: FirewallPolicy | undefined;
}
export type RuleOutputFormat = "FIREWALL_RULES" | "RULES_STRING" | (string & {});
export interface DescribeFirewallPolicyV2Request {
  FirewallPolicyV2Arn?: string | undefined;
  FirewallPolicyV2Name?: string | undefined;
  RuleOutputFormat?: RuleOutputFormat | undefined;
}
export interface DescribeFirewallPolicyV2Response {
  UpdateToken: string;
  FirewallPolicyV2Response: FirewallPolicyV2Response;
  FirewallPolicyV2?: FirewallPolicyV2 | undefined;
}
export type AvailabilityZoneId = string;
export type VpcEndpointId = string;
export type FlowOperationId = string;
export interface DescribeFlowOperationRequest {
  FirewallArn: string;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  VpcEndpointAssociationArn?: string | undefined;
  VpcEndpointId?: string | undefined;
  FlowOperationId: string;
}
export type FlowOperationType = "FLOW_FLUSH" | "FLOW_CAPTURE" | (string & {});
export type FlowOperationStatus =
  | "COMPLETED"
  | "IN_PROGRESS"
  | "FAILED"
  | "COMPLETED_WITH_ERRORS"
  | (string & {});
export type FlowRequestTimestamp = Date;
export type Age = number;
export type ProtocolString = string;
export type ProtocolStrings = string[];
export interface FlowFilter {
  SourceAddress?: Address | undefined;
  DestinationAddress?: Address | undefined;
  SourcePort?: string | undefined;
  DestinationPort?: string | undefined;
  Protocols?: string[] | undefined;
}
export type FlowFilters = FlowFilter[];
export interface FlowOperation {
  MinimumFlowAgeInSeconds?: number | undefined;
  FlowFilters?: FlowFilter[] | undefined;
}
export interface DescribeFlowOperationResponse {
  FirewallArn?: string | undefined;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  VpcEndpointAssociationArn?: string | undefined;
  VpcEndpointId?: string | undefined;
  FlowOperationId?: string | undefined;
  FlowOperationType?: FlowOperationType | undefined;
  FlowOperationStatus?: FlowOperationStatus | undefined;
  StatusMessage?: string | undefined;
  FlowRequestTimestamp?: Date | undefined;
  FlowOperation?: FlowOperation | undefined;
}
export interface DescribeLoggingConfigurationRequest {
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
}
export type LogType = "ALERT" | "FLOW" | "TLS" | (string & {});
export type LogDestinationType = "S3" | "CloudWatchLogs" | "KinesisDataFirehose" | (string & {});
export type HashMapKey = string;
export type HashMapValue = string;
export type LogDestinationMap = { [key: string]: string | undefined };
export interface LogDestinationConfig {
  LogType: LogType;
  LogDestinationType: LogDestinationType;
  LogDestination: { [key: string]: string | undefined };
}
export type LogDestinationConfigs = LogDestinationConfig[];
export interface LoggingConfiguration {
  LogDestinationConfigs: LogDestinationConfig[];
}
export type EnableMonitoringDashboard = boolean;
export interface DescribeLoggingConfigurationResponse {
  FirewallArn?: string | undefined;
  LoggingConfiguration?: LoggingConfiguration | undefined;
  EnableMonitoringDashboard?: boolean | undefined;
}
export interface DescribeProxyRequest {
  ProxyName?: string | undefined;
  ProxyArn?: string | undefined;
}
export type ProxyState =
  | "ATTACHING"
  | "ATTACHED"
  | "DETACHING"
  | "DETACHED"
  | "ATTACH_FAILED"
  | "DETACH_FAILED"
  | (string & {});
export type ProxyModifyState = "MODIFYING" | "COMPLETED" | "FAILED" | (string & {});
export type TlsInterceptMode = "ENABLED" | "DISABLED" | (string & {});
export interface TlsInterceptProperties {
  PcaArn?: string | undefined;
  TlsInterceptMode?: TlsInterceptMode | undefined;
}
export type VpcEndpointServiceName = string;
export type PrivateDNSName = string;
export type CreateTime = Date;
export type DeleteTime = Date;
export type UpdateTime = Date;
export type FailureCode = string;
export type FailureMessage = string;
export interface DescribeProxyResource {
  ProxyName?: string | undefined;
  ProxyArn?: string | undefined;
  ProxyConfigurationName?: string | undefined;
  ProxyConfigurationArn?: string | undefined;
  NatGatewayId?: string | undefined;
  ProxyState?: ProxyState | undefined;
  ProxyModifyState?: ProxyModifyState | undefined;
  ListenerProperties?: ListenerProperty[] | undefined;
  TlsInterceptProperties?: TlsInterceptProperties | undefined;
  VpcEndpointServiceName?: string | undefined;
  PrivateDNSName?: string | undefined;
  CreateTime?: Date | undefined;
  DeleteTime?: Date | undefined;
  UpdateTime?: Date | undefined;
  FailureCode?: string | undefined;
  FailureMessage?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface DescribeProxyResponse {
  Proxy?: DescribeProxyResource | undefined;
  UpdateToken?: string | undefined;
}
export interface DescribeResourcePolicyRequest {
  ResourceArn: string;
}
export type PolicyString = string;
export interface DescribeResourcePolicyResponse {
  Policy?: string | undefined;
}
export interface DescribeRuleGroupRequest {
  RuleGroupName?: string | undefined;
  RuleGroupArn?: string | undefined;
  Type?: RuleGroupType | undefined;
  AnalyzeRuleGroup?: boolean | undefined;
  RuleOutputFormat?: RuleOutputFormat | undefined;
}
export interface DescribeRuleGroupResponse {
  UpdateToken: string;
  RuleGroup?: RuleGroup | undefined;
  FirewallRuleGroup?: FirewallRuleGroup | undefined;
  IpsRuleGroup?: IpsRuleGroup | undefined;
  RuleGroupResponse: RuleGroupResponse;
}
export interface DescribeRuleGroupMetadataRequest {
  RuleGroupName?: string | undefined;
  RuleGroupArn?: string | undefined;
  Type?: RuleGroupType | undefined;
}
export type VendorName = string;
export type ProductId = string;
export type ListingName = string;
export interface DescribeRuleGroupMetadataResponse {
  RuleGroupArn: string;
  RuleGroupName: string;
  Description?: string | undefined;
  Type?: RuleGroupType | undefined;
  Capacity?: number | undefined;
  StatefulRuleOptions?: StatefulRuleOptions | undefined;
  LastModifiedTime?: Date | undefined;
  VendorName?: string | undefined;
  ProductId?: string | undefined;
  ListingName?: string | undefined;
}
export interface DescribeRuleGroupSummaryRequest {
  RuleGroupName?: string | undefined;
  RuleGroupArn?: string | undefined;
  Type?: RuleGroupType | undefined;
}
export interface RuleSummary {
  SID?: string | undefined;
  Msg?: string | undefined;
  Metadata?: string | undefined;
}
export type RuleSummaries = RuleSummary[];
export interface Summary {
  RuleSummaries?: RuleSummary[] | undefined;
}
export interface DescribeRuleGroupSummaryResponse {
  RuleGroupName: string;
  Description?: string | undefined;
  Summary?: Summary | undefined;
}
export interface DescribeTLSInspectionConfigurationRequest {
  TLSInspectionConfigurationArn?: string | undefined;
  TLSInspectionConfigurationName?: string | undefined;
}
export interface DescribeTLSInspectionConfigurationResponse {
  UpdateToken: string;
  TLSInspectionConfiguration?: TLSInspectionConfiguration | undefined;
  TLSInspectionConfigurationResponse: TLSInspectionConfigurationResponse;
}
export interface DescribeVpcEndpointAssociationRequest {
  VpcEndpointAssociationArn: string;
}
export interface DescribeVpcEndpointAssociationResponse {
  VpcEndpointAssociation?: VpcEndpointAssociation | undefined;
  VpcEndpointAssociationStatus?: VpcEndpointAssociationStatus | undefined;
}
export interface DisassociateAvailabilityZonesRequest {
  UpdateToken?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  AvailabilityZoneMappings: AvailabilityZoneMapping[];
}
export interface DisassociateAvailabilityZonesResponse {
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  AvailabilityZoneMappings?: AvailabilityZoneMapping[] | undefined;
  UpdateToken?: string | undefined;
}
export type AzSubnets = string[];
export interface DisassociateSubnetsRequest {
  UpdateToken?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  SubnetIds: string[];
}
export interface DisassociateSubnetsResponse {
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  SubnetMappings?: SubnetMapping[] | undefined;
  UpdateToken?: string | undefined;
}
export type AnalysisReportId = string;
export type AnalysisReportNextToken = string;
export type PaginationMaxResults = number;
export interface GetAnalysisReportResultsRequest {
  FirewallName?: string | undefined;
  AnalysisReportId: string;
  FirewallArn?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export type Status = string;
export type StartTime = Date;
export type EndTime = Date;
export type ReportTime = Date;
export type FirstAccessed = Date;
export type LastAccessed = Date;
export type Domain = string;
export type Count = number;
export interface Hits {
  Count?: number | undefined;
}
export interface UniqueSources {
  Count?: number | undefined;
}
export interface AnalysisTypeReportResult {
  Protocol?: string | undefined;
  FirstAccessed?: Date | undefined;
  LastAccessed?: Date | undefined;
  Domain?: string | undefined;
  Hits?: Hits | undefined;
  UniqueSources?: UniqueSources | undefined;
}
export type AnalysisReportResults = AnalysisTypeReportResult[];
export interface GetAnalysisReportResultsResponse {
  Status?: string | undefined;
  StartTime?: Date | undefined;
  EndTime?: Date | undefined;
  ReportTime?: Date | undefined;
  AnalysisType?: EnabledAnalysisType | undefined;
  NextToken?: string | undefined;
  AnalysisReportResults?: AnalysisTypeReportResult[] | undefined;
}
export type PaginationToken = string;
export interface ListAnalysisReportsRequest {
  FirewallName?: string | undefined;
  FirewallArn?: string | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface AnalysisReport {
  AnalysisReportId?: string | undefined;
  AnalysisType?: EnabledAnalysisType | undefined;
  ReportTime?: Date | undefined;
  Status?: string | undefined;
}
export type AnalysisReports = AnalysisReport[];
export interface ListAnalysisReportsResponse {
  AnalysisReports?: AnalysisReport[] | undefined;
  NextToken?: string | undefined;
}
export interface ListContainerAssociationsRequest {
  MaxResults?: number | undefined;
  NextToken?: string | undefined;
}
export interface ContainerAssociationSummary {
  Arn?: string | undefined;
  Name?: string | undefined;
}
export type ContainerAssociations = ContainerAssociationSummary[];
export interface ListContainerAssociationsResponse {
  ContainerAssociations?: ContainerAssociationSummary[] | undefined;
  NextToken?: string | undefined;
}
export interface ListFirewallPoliciesRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface FirewallPolicyMetadata {
  Name?: string | undefined;
  Arn?: string | undefined;
}
export type FirewallPolicies = FirewallPolicyMetadata[];
export interface ListFirewallPoliciesResponse {
  NextToken?: string | undefined;
  FirewallPolicies?: FirewallPolicyMetadata[] | undefined;
}
export interface ListFirewallPoliciesV2Request {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface FirewallPolicyV2Metadata {
  Name?: string | undefined;
  Arn?: string | undefined;
}
export type FirewallPoliciesV2 = FirewallPolicyV2Metadata[];
export interface ListFirewallPoliciesV2Response {
  NextToken?: string | undefined;
  FirewallPoliciesV2: FirewallPolicyV2Metadata[];
}
export type VpcIds = string[];
export interface ListFirewallsRequest {
  NextToken?: string | undefined;
  VpcIds?: string[] | undefined;
  MaxResults?: number | undefined;
}
export interface FirewallMetadata {
  FirewallName?: string | undefined;
  FirewallArn?: string | undefined;
  TransitGatewayAttachmentId?: string | undefined;
}
export type Firewalls = FirewallMetadata[];
export interface ListFirewallsResponse {
  NextToken?: string | undefined;
  Firewalls?: FirewallMetadata[] | undefined;
}
export interface ListFlowOperationResultsRequest {
  FirewallArn: string;
  FlowOperationId: string;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  VpcEndpointId?: string | undefined;
  VpcEndpointAssociationArn?: string | undefined;
}
export type PacketCount = number;
export type ByteCount = number;
export interface Flow {
  SourceAddress?: Address | undefined;
  DestinationAddress?: Address | undefined;
  SourcePort?: string | undefined;
  DestinationPort?: string | undefined;
  Protocol?: string | undefined;
  Age?: number | undefined;
  PacketCount?: number | undefined;
  ByteCount?: number | undefined;
}
export type Flows = Flow[];
export interface ListFlowOperationResultsResponse {
  FirewallArn?: string | undefined;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  VpcEndpointAssociationArn?: string | undefined;
  VpcEndpointId?: string | undefined;
  FlowOperationId?: string | undefined;
  FlowOperationStatus?: FlowOperationStatus | undefined;
  StatusMessage?: string | undefined;
  FlowRequestTimestamp?: Date | undefined;
  Flows?: Flow[] | undefined;
  NextToken?: string | undefined;
}
export interface ListFlowOperationsRequest {
  FirewallArn: string;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  VpcEndpointAssociationArn?: string | undefined;
  VpcEndpointId?: string | undefined;
  FlowOperationType?: FlowOperationType | undefined;
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface FlowOperationMetadata {
  FlowOperationId?: string | undefined;
  FlowOperationType?: FlowOperationType | undefined;
  FlowRequestTimestamp?: Date | undefined;
  FlowOperationStatus?: FlowOperationStatus | undefined;
}
export type FlowOperations = FlowOperationMetadata[];
export interface ListFlowOperationsResponse {
  FlowOperations?: FlowOperationMetadata[] | undefined;
  NextToken?: string | undefined;
}
export type ResourceManagedStatus = "MANAGED" | "ACCOUNT" | (string & {});
export type ResourceManagedType =
  | "AWS_MANAGED_THREAT_SIGNATURES"
  | "AWS_MANAGED_DOMAIN_LISTS"
  | "ACTIVE_THREAT_DEFENSE"
  | "PARTNER_MANAGED"
  | (string & {});
export type SubscriptionStatus = "NOT_SUBSCRIBED" | "SUBSCRIBED" | (string & {});
export interface ListRuleGroupsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  Scope?: ResourceManagedStatus | undefined;
  ManagedType?: ResourceManagedType | undefined;
  SubscriptionStatus?: SubscriptionStatus | undefined;
  Type?: RuleGroupType | undefined;
}
export interface RuleGroupMetadata {
  Name?: string | undefined;
  Arn?: string | undefined;
  VendorName?: string | undefined;
}
export type RuleGroups = RuleGroupMetadata[];
export interface ListRuleGroupsResponse {
  NextToken?: string | undefined;
  RuleGroups?: RuleGroupMetadata[] | undefined;
}
export type TagsPaginationMaxResults = number;
export interface ListTagsForResourceRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  NextToken?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface ListTLSInspectionConfigurationsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface TLSInspectionConfigurationMetadata {
  Name?: string | undefined;
  Arn?: string | undefined;
}
export type TLSInspectionConfigurations = TLSInspectionConfigurationMetadata[];
export interface ListTLSInspectionConfigurationsResponse {
  NextToken?: string | undefined;
  TLSInspectionConfigurations?: TLSInspectionConfigurationMetadata[] | undefined;
}
export interface ListVpcEndpointAssociationsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
  FirewallArn?: string | undefined;
}
export interface VpcEndpointAssociationMetadata {
  VpcEndpointAssociationArn?: string | undefined;
}
export type VpcEndpointAssociations = VpcEndpointAssociationMetadata[];
export interface ListVpcEndpointAssociationsResponse {
  NextToken?: string | undefined;
  VpcEndpointAssociations?: VpcEndpointAssociationMetadata[] | undefined;
}
export interface PutResourcePolicyRequest {
  ResourceArn: string;
  Policy: string;
}
export interface PutResourcePolicyResponse {}
export interface RejectNetworkFirewallTransitGatewayAttachmentRequest {
  TransitGatewayAttachmentId: string;
}
export interface RejectNetworkFirewallTransitGatewayAttachmentResponse {
  TransitGatewayAttachmentId: string;
  TransitGatewayAttachmentStatus: TransitGatewayAttachmentStatus;
}
export interface StartAnalysisReportRequest {
  FirewallName?: string | undefined;
  FirewallArn?: string | undefined;
  AnalysisType: EnabledAnalysisType;
}
export interface StartAnalysisReportResponse {
  AnalysisReportId: string;
}
export interface StartFlowCaptureRequest {
  FirewallArn: string;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  VpcEndpointAssociationArn?: string | undefined;
  VpcEndpointId?: string | undefined;
  MinimumFlowAgeInSeconds?: number | undefined;
  FlowFilters: FlowFilter[];
}
export interface StartFlowCaptureResponse {
  FirewallArn?: string | undefined;
  FlowOperationId?: string | undefined;
  FlowOperationStatus?: FlowOperationStatus | undefined;
}
export interface StartFlowFlushRequest {
  FirewallArn: string;
  AvailabilityZone?: string | undefined;
  AvailabilityZoneId?: string | undefined;
  VpcEndpointAssociationArn?: string | undefined;
  VpcEndpointId?: string | undefined;
  MinimumFlowAgeInSeconds?: number | undefined;
  FlowFilters: FlowFilter[];
}
export interface StartFlowFlushResponse {
  FirewallArn?: string | undefined;
  FlowOperationId?: string | undefined;
  FlowOperationStatus?: FlowOperationStatus | undefined;
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAvailabilityZoneChangeProtectionRequest {
  UpdateToken?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  AvailabilityZoneChangeProtection: boolean;
}
export interface UpdateAvailabilityZoneChangeProtectionResponse {
  UpdateToken?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  AvailabilityZoneChangeProtection?: boolean | undefined;
}
export interface UpdateContainerAssociationRequest {
  ContainerAssociationName?: string | undefined;
  ContainerAssociationArn?: string | undefined;
  Description?: string | undefined;
  Type: ContainerMonitoringType;
  ContainerMonitoringConfigurations: ContainerMonitoringConfiguration[];
  Tags?: Tag[] | undefined;
  UpdateToken: string;
}
export interface UpdateContainerAssociationResponse {
  ContainerAssociationName?: string | undefined;
  ContainerAssociationArn?: string | undefined;
  Description?: string | undefined;
  Type?: ContainerMonitoringType | undefined;
  ContainerMonitoringConfigurations?: ContainerMonitoringConfiguration[] | undefined;
  Status?: ContainerAssociationStatus | undefined;
  Tags?: Tag[] | undefined;
  UpdateToken?: string | undefined;
}
export interface UpdateFirewallAnalysisSettingsRequest {
  EnabledAnalysisTypes?: EnabledAnalysisType[] | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  UpdateToken?: string | undefined;
}
export interface UpdateFirewallAnalysisSettingsResponse {
  EnabledAnalysisTypes?: EnabledAnalysisType[] | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  UpdateToken?: string | undefined;
}
export interface UpdateFirewallDeleteProtectionRequest {
  UpdateToken?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  DeleteProtection: boolean;
}
export interface UpdateFirewallDeleteProtectionResponse {
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  DeleteProtection?: boolean | undefined;
  UpdateToken?: string | undefined;
}
export interface UpdateFirewallDescriptionRequest {
  UpdateToken?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  Description?: string | undefined;
}
export interface UpdateFirewallDescriptionResponse {
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  Description?: string | undefined;
  UpdateToken?: string | undefined;
}
export interface UpdateFirewallEncryptionConfigurationRequest {
  UpdateToken?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface UpdateFirewallEncryptionConfigurationResponse {
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  UpdateToken?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface UpdateFirewallPolicyRequest {
  UpdateToken: string;
  FirewallPolicyArn?: string | undefined;
  FirewallPolicyName?: string | undefined;
  FirewallPolicy: FirewallPolicy;
  Description?: string | undefined;
  DryRun?: boolean | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface UpdateFirewallPolicyResponse {
  UpdateToken: string;
  FirewallPolicyResponse: FirewallPolicyResponse;
}
export interface UpdateFirewallPolicyChangeProtectionRequest {
  UpdateToken?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  FirewallPolicyChangeProtection: boolean;
}
export interface UpdateFirewallPolicyChangeProtectionResponse {
  UpdateToken?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  FirewallPolicyChangeProtection?: boolean | undefined;
}
export interface UpdateFirewallPolicyV2Request {
  UpdateToken: string;
  FirewallPolicyV2Arn?: string | undefined;
  FirewallPolicyV2Name?: string | undefined;
  FirewallPolicyV2: FirewallPolicyV2;
  Description?: string | undefined;
  DryRun?: boolean | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface UpdateFirewallPolicyV2Response {
  UpdateToken: string;
  FirewallPolicyV2Response: FirewallPolicyV2Response;
}
export interface UpdateLoggingConfigurationRequest {
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  LoggingConfiguration?: LoggingConfiguration | undefined;
  EnableMonitoringDashboard?: boolean | undefined;
}
export interface UpdateLoggingConfigurationResponse {
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  LoggingConfiguration?: LoggingConfiguration | undefined;
  EnableMonitoringDashboard?: boolean | undefined;
}
export interface UpdateProxySettingsRequest {
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  UpdateToken?: string | undefined;
  ProxySettings?: ProxySettings | undefined;
}
export interface UpdateProxySettingsResponse {
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  UpdateToken?: string | undefined;
  ProxySettings?: ProxySettings | undefined;
}
export interface UpdateRuleGroupRequest {
  UpdateToken: string;
  RuleGroupArn?: string | undefined;
  RuleGroupName?: string | undefined;
  RuleGroup?: RuleGroup | undefined;
  FirewallRuleGroup?: FirewallRuleGroup | undefined;
  IpsRuleGroup?: IpsRuleGroup | undefined;
  Rules?: string | undefined;
  Type?: RuleGroupType | undefined;
  Description?: string | undefined;
  DryRun?: boolean | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  SourceMetadata?: SourceMetadata | undefined;
  AnalyzeRuleGroup?: boolean | undefined;
  SummaryConfiguration?: SummaryConfiguration | undefined;
}
export interface UpdateRuleGroupResponse {
  UpdateToken: string;
  RuleGroupResponse: RuleGroupResponse;
}
export interface UpdateSubnetChangeProtectionRequest {
  UpdateToken?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  SubnetChangeProtection: boolean;
}
export interface UpdateSubnetChangeProtectionResponse {
  UpdateToken?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  SubnetChangeProtection?: boolean | undefined;
}
export interface UpdateTLSInspectionConfigurationRequest {
  TLSInspectionConfigurationArn?: string | undefined;
  TLSInspectionConfigurationName?: string | undefined;
  TLSInspectionConfiguration: TLSInspectionConfiguration;
  Description?: string | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  UpdateToken: string;
}
export interface UpdateTLSInspectionConfigurationResponse {
  UpdateToken: string;
  TLSInspectionConfigurationResponse: TLSInspectionConfigurationResponse;
}
export type ErrorMessage = string;
export type AcceptNetworkFirewallTransitGatewayAttachmentError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Accepts a transit gateway attachment request for Network Firewall. When you accept the attachment request, Network Firewall creates the necessary routing components to enable traffic flow between the transit gateway and firewall endpoints.
 *
 * You must accept a transit gateway attachment to complete the creation of a transit gateway-attached firewall, unless auto-accept is enabled on the transit gateway. After acceptance, use DescribeFirewall to verify the firewall status.
 *
 * To reject an attachment instead of accepting it, use RejectNetworkFirewallTransitGatewayAttachment.
 *
 * It can take several minutes for the attachment acceptance to complete and the firewall to become available.
 */
export const acceptNetworkFirewallTransitGatewayAttachment: API.OperationMethod<
  AcceptNetworkFirewallTransitGatewayAttachmentRequest & RegionInput,
  AcceptNetworkFirewallTransitGatewayAttachmentResponse,
  AcceptNetworkFirewallTransitGatewayAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AcceptNetworkFirewallTransitGatewayAttachmentRequest>,
  output: __S(
    16,
    __c1,
    0,
  ) as any as S.Schema<AcceptNetworkFirewallTransitGatewayAttachmentResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptNetworkFirewallTransitGatewayAttachment",
  telemetry: TELEMETRY,
  span: "AcceptNetworkFirewallTransitGatewayAttachment",
}));

export type AssociateAvailabilityZonesError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates the specified Availability Zones with a transit gateway-attached firewall. For each Availability Zone, Network Firewall creates a firewall endpoint to process traffic. You can specify one or more Availability Zones where you want to deploy the firewall.
 *
 * After adding Availability Zones, you must update your transit gateway route tables to direct traffic through the new firewall endpoints. Use DescribeFirewall to monitor the status of the new endpoints.
 */
export const associateAvailabilityZones: API.OperationMethod<
  AssociateAvailabilityZonesRequest & RegionInput,
  AssociateAvailabilityZonesResponse,
  AssociateAvailabilityZonesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<AssociateAvailabilityZonesRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<AssociateAvailabilityZonesResponse>,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAvailabilityZones",
  telemetry: TELEMETRY,
  span: "AssociateAvailabilityZones",
}));

export type AssociateFirewallPolicyError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a FirewallPolicy to a Firewall.
 *
 * A firewall policy defines how to monitor and manage your VPC network traffic, using a
 * collection of inspection rule groups and other settings. Each firewall requires one
 * firewall policy association, and you can use the same firewall policy for multiple
 * firewalls.
 */
export const associateFirewallPolicy: API.OperationMethod<
  AssociateFirewallPolicyRequest & RegionInput,
  AssociateFirewallPolicyResponse,
  AssociateFirewallPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<AssociateFirewallPolicyRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<AssociateFirewallPolicyResponse>,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFirewallPolicy",
  telemetry: TELEMETRY,
  span: "AssociateFirewallPolicy",
}));

export type AssociateSubnetsError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates the specified subnets in the Amazon VPC to the firewall. You can specify one
 * subnet for each of the Availability Zones that the VPC spans.
 *
 * This request creates an Network Firewall firewall endpoint in each of the subnets. To
 * enable the firewall's protections, you must also modify the VPC's route tables for each
 * subnet's Availability Zone, to redirect the traffic that's coming into and going out of the
 * zone through the firewall endpoint.
 *
 * For a proxy mode firewall, use this operation to add Availability Zones to the firewall. For each subnet, specify a NAT gateway in `NatGatewayCreateMappings` in the same Availability Zone. You can't add an Availability Zone that the firewall already uses. The firewall keeps working in its other Availability Zones while Network Firewall sets up the new one. If Network Firewall can't set up the new Availability Zone, it removes the Availability Zone from the firewall. It also deletes the NAT gateway that it created there. The Availability Zone's `Attachment` status shows the reason. You can then add the Availability Zone again.
 */
export const associateSubnets: API.OperationMethod<
  AssociateSubnetsRequest & RegionInput,
  AssociateSubnetsResponse,
  AssociateSubnetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<AssociateSubnetsRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<AssociateSubnetsResponse>,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateSubnets",
  telemetry: TELEMETRY,
  span: "AssociateSubnets",
}));

export type CreateContainerAssociationError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a Network Firewall container association. The association monitors container lifecycle events in your
 * Amazon ECS or Amazon EKS clusters and resolves running container addresses for use in firewall rules.
 */
export const createContainerAssociation: API.OperationMethod<
  CreateContainerAssociationRequest & RegionInput,
  CreateContainerAssociationResponse,
  CreateContainerAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<CreateContainerAssociationRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<CreateContainerAssociationResponse>,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContainerAssociation",
  telemetry: TELEMETRY,
  span: "CreateContainerAssociation",
}));

export type CreateFirewallError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an Network Firewall Firewall and accompanying FirewallStatus for a VPC.
 *
 * The firewall defines the configuration settings for an Network Firewall firewall. The settings that you can define at creation include the firewall policy, the subnets in your VPC to use for the firewall endpoints, and any tags that are attached to the firewall Amazon Web Services resource.
 *
 * After you create a firewall, you can provide additional settings, like the logging configuration.
 *
 * To update the settings for a firewall, you use the operations that apply to the settings
 * themselves, for example UpdateLoggingConfiguration, AssociateSubnets, and UpdateFirewallDeleteProtection.
 *
 * To manage a firewall's tags, use the standard Amazon Web Services resource tagging operations, ListTagsForResource, TagResource, and UntagResource.
 *
 * To retrieve information about firewalls, use ListFirewalls and DescribeFirewall.
 *
 * To generate a report on the last 30 days of traffic monitored by a firewall, use StartAnalysisReport.
 *
 * To create a proxy mode firewall, specify `VpcEndpoint` and `NatGatewayCreateMappings` instead of `VpcId` and `SubnetMappings`. A proxy mode firewall is an explicit forward proxy. Your clients send HTTP and HTTPS proxy requests to the firewall's proxy DNS name, which `DescribeFirewall` returns in each Availability Zone's `Attachment`. The firewall evaluates proxy traffic with the stateful rules in its firewall policy, and sends allowed traffic out through the NAT gateway in the same Availability Zone. Your clients don't need route table changes. In each Availability Zone, the firewall has one endpoint and one NAT gateway, which Network Firewall creates for you.
 */
export const createFirewall: API.OperationMethod<
  CreateFirewallRequest & RegionInput,
  CreateFirewallResponse,
  CreateFirewallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<CreateFirewallRequest>,
  output: __S(320, __c20, 0) as any as S.Schema<CreateFirewallResponse>,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFirewall",
  telemetry: TELEMETRY,
  span: "CreateFirewall",
}));

export type CreateFirewallPolicyError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates the firewall policy for the firewall according to the specifications.
 *
 * An Network Firewall firewall policy defines the behavior of a firewall, in a collection of
 * stateless and stateful rule groups and other settings. You can use one firewall policy for
 * multiple firewalls.
 */
export const createFirewallPolicy: API.OperationMethod<
  CreateFirewallPolicyRequest & RegionInput,
  CreateFirewallPolicyResponse,
  CreateFirewallPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<CreateFirewallPolicyRequest>,
  output: __S(528, __c33, 0) as any as S.Schema<CreateFirewallPolicyResponse>,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFirewallPolicy",
  telemetry: TELEMETRY,
  span: "CreateFirewallPolicy",
}));

export type CreateFirewallPolicyV2Error =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a Next Generation policy according to the specifications.
 *
 * A Next Generation policy defines the behavior of a firewall in a collection of firewall engine and IPS engine rule groups and other settings. You can use one firewall policy for multiple firewalls. For more information, see Next Generation policies in the *Network Firewall Developer Guide*.
 */
export const createFirewallPolicyV2: API.OperationMethod<
  CreateFirewallPolicyV2Request & RegionInput,
  CreateFirewallPolicyV2Response,
  CreateFirewallPolicyV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<CreateFirewallPolicyV2Request>,
  output: __S(608, __c38, 0) as any as S.Schema<CreateFirewallPolicyV2Response>,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFirewallPolicyV2",
  telemetry: TELEMETRY,
  span: "CreateFirewallPolicyV2",
}));

export type CreateRuleGroupError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates the specified stateless or stateful rule group, which includes the rules for
 * network traffic inspection, a capacity setting, and tags.
 *
 * You provide your rule group specification in your request using either
 * `RuleGroup` or `Rules`.
 */
export const createRuleGroup: API.OperationMethod<
  CreateRuleGroupRequest & RegionInput,
  CreateRuleGroupResponse,
  CreateRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<CreateRuleGroupRequest>,
  output: __S(704, __c44, 0) as any as S.Schema<CreateRuleGroupResponse>,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRuleGroup",
  telemetry: TELEMETRY,
  span: "CreateRuleGroup",
}));

export type CreateTLSInspectionConfigurationError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an Network Firewall TLS inspection configuration. Network Firewall uses TLS inspection configurations to decrypt your firewall's inbound and outbound SSL/TLS traffic. After decryption, Network Firewall inspects the traffic according to your firewall policy's stateful rules, and then re-encrypts it before sending it to its destination. You can enable inspection of your firewall's inbound traffic, outbound traffic, or both. To use TLS inspection with your firewall, you must first import or provision certificates using ACM, create a TLS inspection configuration, add that configuration to a new firewall policy, and then associate that policy with your firewall.
 *
 * To update the settings for a TLS inspection configuration, use UpdateTLSInspectionConfiguration.
 *
 * To manage a TLS inspection configuration's tags, use the standard Amazon Web Services resource tagging operations, ListTagsForResource, TagResource, and UntagResource.
 *
 * To retrieve information about TLS inspection configurations, use ListTLSInspectionConfigurations and DescribeTLSInspectionConfiguration.
 *
 * For more information about TLS inspection configurations, see Inspecting SSL/TLS traffic with TLS
 * inspection configurations in the *Network Firewall Developer Guide*.
 */
export const createTLSInspectionConfiguration: API.OperationMethod<
  CreateTLSInspectionConfigurationRequest & RegionInput,
  CreateTLSInspectionConfigurationResponse,
  CreateTLSInspectionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<CreateTLSInspectionConfigurationRequest>,
  output: __S(768, __c48, 0) as any as S.Schema<CreateTLSInspectionConfigurationResponse>,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTLSInspectionConfiguration",
  telemetry: TELEMETRY,
  span: "CreateTLSInspectionConfiguration",
}));

export type CreateVpcEndpointAssociationError =
  | InsufficientCapacityException
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a firewall endpoint for an Network Firewall firewall. This type of firewall endpoint is independent of the firewall endpoints that you specify in the `Firewall` itself, and you define it in addition to those endpoints after the firewall has been created. You can define a VPC endpoint association using a different VPC than the one you used in the firewall specifications.
 */
export const createVpcEndpointAssociation: API.OperationMethod<
  CreateVpcEndpointAssociationRequest & RegionInput,
  CreateVpcEndpointAssociationResponse,
  CreateVpcEndpointAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<CreateVpcEndpointAssociationRequest>,
  output: __S(804, __c50, 4) as any as S.Schema<CreateVpcEndpointAssociationResponse>,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVpcEndpointAssociation",
  telemetry: TELEMETRY,
  span: "CreateVpcEndpointAssociation",
}));

export type DeleteContainerAssociationError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a container association. The resource transitions to a `DELETING` state. Deletion is
 * asynchronous - Network Firewall returns immediately while cleanup proceeds in the background. You can't delete a
 * container association while a rule group references it.
 */
export const deleteContainerAssociation: API.OperationMethod<
  DeleteContainerAssociationRequest & RegionInput,
  DeleteContainerAssociationResponse,
  DeleteContainerAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<DeleteContainerAssociationRequest>,
  output: __S(817, __c51, 1) as any as S.Schema<DeleteContainerAssociationResponse>,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContainerAssociation",
  telemetry: TELEMETRY,
  span: "DeleteContainerAssociation",
}));

export type DeleteFirewallError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the specified Firewall and its FirewallStatus.
 * This operation requires the firewall's `DeleteProtection` flag to be
 * `FALSE`. You can't revert this operation.
 *
 * You can check whether a firewall is
 * in use by reviewing the route tables for the Availability Zones where you have
 * firewall subnet mappings. Retrieve the subnet mappings by calling DescribeFirewall.
 * You define and update the route tables through Amazon VPC. As needed, update the route tables for the
 * zones to remove the firewall endpoints. When the route tables no longer use the firewall endpoints,
 * you can remove the firewall safely.
 *
 * To delete a firewall, remove the delete protection if you need to using UpdateFirewallDeleteProtection,
 * then delete the firewall by calling DeleteFirewall.
 *
 * Deleting a proxy mode firewall detaches its NAT gateways. To also delete the NAT gateways that Network Firewall created for the firewall, specify `DeleteAssociatedNatGateways`.
 */
export const deleteFirewall: API.OperationMethod<
  DeleteFirewallRequest & RegionInput,
  DeleteFirewallResponse,
  DeleteFirewallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<DeleteFirewallRequest>,
  output: __S(320, __c20, 0) as any as S.Schema<DeleteFirewallResponse>,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFirewall",
  telemetry: TELEMETRY,
  span: "DeleteFirewall",
}));

export type DeleteFirewallPolicyError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the specified FirewallPolicy.
 */
export const deleteFirewallPolicy: API.OperationMethod<
  DeleteFirewallPolicyRequest & RegionInput,
  DeleteFirewallPolicyResponse,
  DeleteFirewallPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<DeleteFirewallPolicyRequest>,
  output: __S(849, __c53, 1) as any as S.Schema<DeleteFirewallPolicyResponse>,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFirewallPolicy",
  telemetry: TELEMETRY,
  span: "DeleteFirewallPolicy",
}));

export type DeleteFirewallPolicyV2Error =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the specified FirewallPolicyV2.
 */
export const deleteFirewallPolicyV2: API.OperationMethod<
  DeleteFirewallPolicyV2Request & RegionInput,
  DeleteFirewallPolicyV2Response,
  DeleteFirewallPolicyV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<DeleteFirewallPolicyV2Request>,
  output: __S(865, __c54, 1) as any as S.Schema<DeleteFirewallPolicyV2Response>,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFirewallPolicyV2",
  telemetry: TELEMETRY,
  span: "DeleteFirewallPolicyV2",
}));

export type DeleteNetworkFirewallTransitGatewayAttachmentError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a transit gateway attachment from a Network Firewall. Either the firewall owner or the transit gateway owner can delete the attachment.
 *
 * After you delete a transit gateway attachment, traffic will no longer flow through the firewall endpoints.
 *
 * After you initiate the delete operation, use DescribeFirewall to monitor the deletion status.
 */
export const deleteNetworkFirewallTransitGatewayAttachment: API.OperationMethod<
  DeleteNetworkFirewallTransitGatewayAttachmentRequest & RegionInput,
  DeleteNetworkFirewallTransitGatewayAttachmentResponse,
  DeleteNetworkFirewallTransitGatewayAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    880,
    __c55,
    0,
  ) as any as S.Schema<DeleteNetworkFirewallTransitGatewayAttachmentRequest>,
  output: __S(
    16,
    __c1,
    0,
  ) as any as S.Schema<DeleteNetworkFirewallTransitGatewayAttachmentResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetworkFirewallTransitGatewayAttachment",
  telemetry: TELEMETRY,
  span: "DeleteNetworkFirewallTransitGatewayAttachment",
}));

export type DeleteProxyError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the specified proxy.
 *
 * Detaches a Proxy configuration from a NAT Gateway.
 */
export const deleteProxy: API.OperationMethod<
  DeleteProxyRequest & RegionInput,
  DeleteProxyResponse,
  DeleteProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<DeleteProxyRequest>,
  output: __S(897, __c56, 1) as any as S.Schema<DeleteProxyResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProxy",
  telemetry: TELEMETRY,
  span: "DeleteProxy",
}));

export type DeleteResourcePolicyError =
  | InternalServerError
  | InvalidRequestException
  | InvalidResourcePolicyException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a resource policy that you created in a PutResourcePolicy request.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest & RegionInput,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(928, __c58, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidResourcePolicyException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
  telemetry: TELEMETRY,
  span: "DeleteResourcePolicy",
}));

export type DeleteRuleGroupError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Deletes the specified RuleGroup.
 */
export const deleteRuleGroup: API.OperationMethod<
  DeleteRuleGroupRequest & RegionInput,
  DeleteRuleGroupResponse,
  DeleteRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(944, __c59, 0) as any as S.Schema<DeleteRuleGroupRequest>,
  output: __S(945, __c59, 1) as any as S.Schema<DeleteRuleGroupResponse>,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRuleGroup",
  telemetry: TELEMETRY,
  span: "DeleteRuleGroup",
}));

export type DeleteTLSInspectionConfigurationError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified TLSInspectionConfiguration.
 */
export const deleteTLSInspectionConfiguration: API.OperationMethod<
  DeleteTLSInspectionConfigurationRequest & RegionInput,
  DeleteTLSInspectionConfigurationResponse,
  DeleteTLSInspectionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<DeleteTLSInspectionConfigurationRequest>,
  output: __S(961, __c60, 1) as any as S.Schema<DeleteTLSInspectionConfigurationResponse>,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTLSInspectionConfiguration",
  telemetry: TELEMETRY,
  span: "DeleteTLSInspectionConfiguration",
}));

export type DeleteVpcEndpointAssociationError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified VpcEndpointAssociation.
 *
 * You can check whether an endpoint association is
 * in use by reviewing the route tables for the Availability Zones where you have the endpoint subnet mapping.
 * You can retrieve the subnet mapping by calling DescribeVpcEndpointAssociation.
 * You define and update the route tables through Amazon VPC. As needed, update the route tables for the
 * Availability Zone to remove the firewall endpoint for the association. When the route tables no longer use the firewall endpoint,
 * you can remove the endpoint association safely.
 */
export const deleteVpcEndpointAssociation: API.OperationMethod<
  DeleteVpcEndpointAssociationRequest & RegionInput,
  DeleteVpcEndpointAssociationResponse,
  DeleteVpcEndpointAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<DeleteVpcEndpointAssociationRequest>,
  output: __S(804, __c50, 4) as any as S.Schema<DeleteVpcEndpointAssociationResponse>,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVpcEndpointAssociation",
  telemetry: TELEMETRY,
  span: "DeleteVpcEndpointAssociation",
}));

export type DescribeContainerAssociationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the configuration and status of a container association.
 */
export const describeContainerAssociation: API.OperationMethod<
  DescribeContainerAssociationRequest & RegionInput,
  DescribeContainerAssociationResponse,
  DescribeContainerAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c62, 0) as any as S.Schema<DescribeContainerAssociationRequest>,
  output: __S(993, __c62, 1) as any as S.Schema<DescribeContainerAssociationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContainerAssociation",
  telemetry: TELEMETRY,
  span: "DescribeContainerAssociation",
}));

export type DescribeFirewallError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified firewall.
 */
export const describeFirewall: API.OperationMethod<
  DescribeFirewallRequest & RegionInput,
  DescribeFirewallResponse,
  DescribeFirewallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<DescribeFirewallRequest>,
  output: __S(1009, __c63, 1) as any as S.Schema<DescribeFirewallResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFirewall",
  telemetry: TELEMETRY,
  span: "DescribeFirewall",
}));

export type DescribeFirewallMetadataError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the high-level information about a firewall, including the Availability Zones where the Firewall is
 * currently in use.
 */
export const describeFirewallMetadata: API.OperationMethod<
  DescribeFirewallMetadataRequest & RegionInput,
  DescribeFirewallMetadataResponse,
  DescribeFirewallMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<DescribeFirewallMetadataRequest>,
  output: __S(1027, __c64, 3) as any as S.Schema<DescribeFirewallMetadataResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFirewallMetadata",
  telemetry: TELEMETRY,
  span: "DescribeFirewallMetadata",
}));

export type DescribeFirewallPolicyError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified firewall policy.
 */
export const describeFirewallPolicy: API.OperationMethod<
  DescribeFirewallPolicyRequest & RegionInput,
  DescribeFirewallPolicyResponse,
  DescribeFirewallPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1040, __c65, 0) as any as S.Schema<DescribeFirewallPolicyRequest>,
  output: __S(1041, __c65, 1) as any as S.Schema<DescribeFirewallPolicyResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFirewallPolicy",
  telemetry: TELEMETRY,
  span: "DescribeFirewallPolicy",
}));

export type DescribeFirewallPolicyV2Error =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified Next Generation policy.
 */
export const describeFirewallPolicyV2: API.OperationMethod<
  DescribeFirewallPolicyV2Request & RegionInput,
  DescribeFirewallPolicyV2Response,
  DescribeFirewallPolicyV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<DescribeFirewallPolicyV2Request>,
  output: __S(1057, __c66, 1) as any as S.Schema<DescribeFirewallPolicyV2Response>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFirewallPolicyV2",
  telemetry: TELEMETRY,
  span: "DescribeFirewallPolicyV2",
}));

export type DescribeFlowOperationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns key information about a specific flow operation.
 */
export const describeFlowOperation: API.OperationMethod<
  DescribeFlowOperationRequest & RegionInput,
  DescribeFlowOperationResponse,
  DescribeFlowOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1072, __c67, 0) as any as S.Schema<DescribeFlowOperationRequest>,
  output: __S(1074, __c67, 2) as any as S.Schema<DescribeFlowOperationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFlowOperation",
  telemetry: TELEMETRY,
  span: "DescribeFlowOperation",
}));

export type DescribeLoggingConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the logging configuration for the specified firewall.
 */
export const describeLoggingConfiguration: API.OperationMethod<
  DescribeLoggingConfigurationRequest & RegionInput,
  DescribeLoggingConfigurationResponse,
  DescribeLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1104, __c69, 0) as any as S.Schema<DescribeLoggingConfigurationRequest>,
  output: __S(1105, __c69, 1) as any as S.Schema<DescribeLoggingConfigurationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoggingConfiguration",
  telemetry: TELEMETRY,
  span: "DescribeLoggingConfiguration",
}));

export type DescribeProxyError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified proxy.
 */
export const describeProxy: API.OperationMethod<
  DescribeProxyRequest & RegionInput,
  DescribeProxyResponse,
  DescribeProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1136, __c71, 0) as any as S.Schema<DescribeProxyRequest>,
  output: __S(1139, __c71, 3) as any as S.Schema<DescribeProxyResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProxy",
  telemetry: TELEMETRY,
  span: "DescribeProxy",
}));

export type DescribeResourcePolicyError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a resource policy that you created in a PutResourcePolicy request.
 */
export const describeResourcePolicy: API.OperationMethod<
  DescribeResourcePolicyRequest & RegionInput,
  DescribeResourcePolicyResponse,
  DescribeResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c72, 0) as any as S.Schema<DescribeResourcePolicyRequest>,
  output: __S(1153, __c72, 1) as any as S.Schema<DescribeResourcePolicyResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourcePolicy",
  telemetry: TELEMETRY,
  span: "DescribeResourcePolicy",
}));

export type DescribeRuleGroupError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified rule group.
 */
export const describeRuleGroup: API.OperationMethod<
  DescribeRuleGroupRequest & RegionInput,
  DescribeRuleGroupResponse,
  DescribeRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1168, __c73, 0) as any as S.Schema<DescribeRuleGroupRequest>,
  output: __S(1169, __c73, 1) as any as S.Schema<DescribeRuleGroupResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuleGroup",
  telemetry: TELEMETRY,
  span: "DescribeRuleGroup",
}));

export type DescribeRuleGroupMetadataError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * High-level information about a rule group, returned by operations like create and describe.
 * You can use the information provided in the metadata to retrieve and manage a rule group.
 * You can retrieve all objects for a rule group by calling DescribeRuleGroup.
 */
export const describeRuleGroupMetadata: API.OperationMethod<
  DescribeRuleGroupMetadataRequest & RegionInput,
  DescribeRuleGroupMetadataResponse,
  DescribeRuleGroupMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c74, 0) as any as S.Schema<DescribeRuleGroupMetadataRequest>,
  output: __S(1185, __c74, 1) as any as S.Schema<DescribeRuleGroupMetadataResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuleGroupMetadata",
  telemetry: TELEMETRY,
  span: "DescribeRuleGroupMetadata",
}));

export type DescribeRuleGroupSummaryError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns detailed information for a stateful rule group.
 *
 * For active threat defense Amazon Web Services managed rule groups, this operation provides insight into the protections enabled by the rule group, based on Suricata rule metadata fields. Summaries are available for rule groups you manage and for active threat defense Amazon Web Services managed rule groups.
 *
 * To modify how threat information appears in summaries, use the `SummaryConfiguration` parameter in UpdateRuleGroup.
 */
export const describeRuleGroupSummary: API.OperationMethod<
  DescribeRuleGroupSummaryRequest & RegionInput,
  DescribeRuleGroupSummaryResponse,
  DescribeRuleGroupSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1200, __c75, 0) as any as S.Schema<DescribeRuleGroupSummaryRequest>,
  output: __S(1204, __c75, 4) as any as S.Schema<DescribeRuleGroupSummaryResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuleGroupSummary",
  telemetry: TELEMETRY,
  span: "DescribeRuleGroupSummary",
}));

export type DescribeTLSInspectionConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified TLS inspection configuration.
 */
export const describeTLSInspectionConfiguration: API.OperationMethod<
  DescribeTLSInspectionConfigurationRequest & RegionInput,
  DescribeTLSInspectionConfigurationResponse,
  DescribeTLSInspectionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<DescribeTLSInspectionConfigurationRequest>,
  output: __S(1217, __c76, 1) as any as S.Schema<DescribeTLSInspectionConfigurationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTLSInspectionConfiguration",
  telemetry: TELEMETRY,
  span: "DescribeTLSInspectionConfiguration",
}));

export type DescribeVpcEndpointAssociationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data object for the specified VPC endpoint association.
 */
export const describeVpcEndpointAssociation: API.OperationMethod<
  DescribeVpcEndpointAssociationRequest & RegionInput,
  DescribeVpcEndpointAssociationResponse,
  DescribeVpcEndpointAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1232, __c77, 0) as any as S.Schema<DescribeVpcEndpointAssociationRequest>,
  output: __S(804, __c50, 4) as any as S.Schema<DescribeVpcEndpointAssociationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcEndpointAssociation",
  telemetry: TELEMETRY,
  span: "DescribeVpcEndpointAssociation",
}));

export type DisassociateAvailabilityZonesError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the specified Availability Zone associations from a transit gateway-attached firewall. This removes the firewall endpoints from these Availability Zones and stops traffic filtering in those zones. Before removing an Availability Zone, ensure you've updated your transit gateway route tables to redirect traffic appropriately.
 *
 * If `AvailabilityZoneChangeProtection` is enabled, you must first disable it using UpdateAvailabilityZoneChangeProtection.
 *
 * To verify the status of your Availability Zone changes, use DescribeFirewall.
 */
export const disassociateAvailabilityZones: API.OperationMethod<
  DisassociateAvailabilityZonesRequest & RegionInput,
  DisassociateAvailabilityZonesResponse,
  DisassociateAvailabilityZonesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c78, 0) as any as S.Schema<DisassociateAvailabilityZonesRequest>,
  output: __S(64, __c4, 0) as any as S.Schema<DisassociateAvailabilityZonesResponse>,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAvailabilityZones",
  telemetry: TELEMETRY,
  span: "DisassociateAvailabilityZones",
}));

export type DisassociateSubnetsError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the specified subnet associations from the firewall. This removes the
 * firewall endpoints from the subnets and removes any network filtering protections that the endpoints
 * were providing.
 *
 * For a proxy mode firewall, this also removes the firewall's proxy DNS record in the Availability Zone and detaches the Availability Zone's NAT gateway from the firewall. Network Firewall keeps the NAT gateway. You can't remove the firewall's last Availability Zone. To do that, delete the firewall. If a VPC endpoint association exists in the Availability Zone, delete it first.
 */
export const disassociateSubnets: API.OperationMethod<
  DisassociateSubnetsRequest & RegionInput,
  DisassociateSubnetsResponse,
  DisassociateSubnetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1264, __c79, 0) as any as S.Schema<DisassociateSubnetsRequest>,
  output: __S(176, __c11, 0) as any as S.Schema<DisassociateSubnetsResponse>,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateSubnets",
  telemetry: TELEMETRY,
  span: "DisassociateSubnets",
}));

export type GetAnalysisReportResultsError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * The results of a `COMPLETED` analysis report generated with StartAnalysisReport.
 *
 * For more information, see AnalysisTypeReportResult.
 */
export const getAnalysisReportResults: API.PaginatedOperationMethod<
  GetAnalysisReportResultsRequest & RegionInput,
  GetAnalysisReportResultsResponse,
  GetAnalysisReportResultsError,
  Credentials | HttpClient.HttpClient,
  AnalysisTypeReportResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1280, __c80, 0) as any as S.Schema<GetAnalysisReportResultsRequest>,
  output: __S(1284, __c80, 4) as any as S.Schema<GetAnalysisReportResultsResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAnalysisReportResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AnalysisReportResults",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetAnalysisReportResults",
})) as any;

export type ListAnalysisReportsError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of all traffic analysis reports generated within the last 30 days.
 */
export const listAnalysisReports: API.PaginatedOperationMethod<
  ListAnalysisReportsRequest & RegionInput,
  ListAnalysisReportsResponse,
  ListAnalysisReportsError,
  Credentials | HttpClient.HttpClient,
  AnalysisReport
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1296, __c81, 0) as any as S.Schema<ListAnalysisReportsRequest>,
  output: __S(1299, __c81, 3) as any as S.Schema<ListAnalysisReportsResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnalysisReports",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AnalysisReports",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAnalysisReports",
})) as any;

export type ListContainerAssociationsError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the container associations in your account and Region. Use the `NextToken`
 * parameter in subsequent requests to retrieve additional results.
 */
export const listContainerAssociations: API.PaginatedOperationMethod<
  ListContainerAssociationsRequest & RegionInput,
  ListContainerAssociationsResponse,
  ListContainerAssociationsError,
  Credentials | HttpClient.HttpClient,
  ContainerAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1312, __c82, 0) as any as S.Schema<ListContainerAssociationsRequest>,
  output: __S(1315, __c82, 3) as any as S.Schema<ListContainerAssociationsResponse>,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContainerAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ContainerAssociations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListContainerAssociations",
})) as any;

export type ListFirewallPoliciesError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the firewall policies that you have defined. Depending on
 * your setting for max results and the number of firewall policies, a single call might not
 * return the full list.
 */
export const listFirewallPolicies: API.PaginatedOperationMethod<
  ListFirewallPoliciesRequest & RegionInput,
  ListFirewallPoliciesResponse,
  ListFirewallPoliciesError,
  Credentials | HttpClient.HttpClient,
  FirewallPolicyMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1328, __c83, 0) as any as S.Schema<ListFirewallPoliciesRequest>,
  output: __S(1329, __c83, 1) as any as S.Schema<ListFirewallPoliciesResponse>,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFirewallPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FirewallPolicies",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFirewallPolicies",
})) as any;

export type ListFirewallPoliciesV2Error =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the Next Generation policies that you have defined. Depending on your setting for max results and the number of firewall policies, a single call might not return the full list.
 */
export const listFirewallPoliciesV2: API.PaginatedOperationMethod<
  ListFirewallPoliciesV2Request & RegionInput,
  ListFirewallPoliciesV2Response,
  ListFirewallPoliciesV2Error,
  Credentials | HttpClient.HttpClient,
  FirewallPolicyV2Metadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<ListFirewallPoliciesV2Request>,
  output: __S(1361, __c85, 1) as any as S.Schema<ListFirewallPoliciesV2Response>,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFirewallPoliciesV2",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FirewallPoliciesV2",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFirewallPoliciesV2",
})) as any;

export type ListFirewallsError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the firewalls that you have defined. If you provide VPC
 * identifiers in your request, this returns only the firewalls for those VPCs.
 *
 * Depending on your setting for max results and the number of firewalls, a single call
 * might not return the full list.
 */
export const listFirewalls: API.PaginatedOperationMethod<
  ListFirewallsRequest & RegionInput,
  ListFirewallsResponse,
  ListFirewallsError,
  Credentials | HttpClient.HttpClient,
  FirewallMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1376, __c86, 0) as any as S.Schema<ListFirewallsRequest>,
  output: __S(1379, __c86, 3) as any as S.Schema<ListFirewallsResponse>,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFirewalls",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Firewalls",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFirewalls",
})) as any;

export type ListFlowOperationResultsError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the results of a specific flow operation.
 *
 * Flow operations let you manage the flows tracked in the flow table, also known as the firewall table.
 *
 * A flow is network traffic that is monitored by a firewall, either by stateful or stateless rules.
 * For traffic to be considered part of a flow, it must share Destination, DestinationPort, Direction, Protocol, Source, and SourcePort.
 */
export const listFlowOperationResults: API.PaginatedOperationMethod<
  ListFlowOperationResultsRequest & RegionInput,
  ListFlowOperationResultsResponse,
  ListFlowOperationResultsError,
  Credentials | HttpClient.HttpClient,
  Flow
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1392, __c87, 0) as any as S.Schema<ListFlowOperationResultsRequest>,
  output: __S(1395, __c87, 3) as any as S.Schema<ListFlowOperationResultsResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlowOperationResults",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Flows",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFlowOperationResults",
})) as any;

export type ListFlowOperationsError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns a list of all flow operations ran in a specific firewall.
 * You can optionally narrow the request scope by specifying the operation type or Availability Zone associated with a firewall's flow operations.
 *
 * Flow operations let you manage the flows tracked in the flow table, also known as the firewall table.
 *
 * A flow is network traffic that is monitored by a firewall, either by stateful or stateless rules.
 * For traffic to be considered part of a flow, it must share Destination, DestinationPort, Direction, Protocol, Source, and SourcePort.
 */
export const listFlowOperations: API.PaginatedOperationMethod<
  ListFlowOperationsRequest & RegionInput,
  ListFlowOperationsResponse,
  ListFlowOperationsError,
  Credentials | HttpClient.HttpClient,
  FlowOperationMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1408, __c88, 0) as any as S.Schema<ListFlowOperationsRequest>,
  output: __S(1411, __c88, 3) as any as S.Schema<ListFlowOperationsResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlowOperations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FlowOperations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFlowOperations",
})) as any;

export type ListRuleGroupsError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the rule groups that you have defined. Depending on your
 * setting for max results and the number of rule groups, a single call might not return the
 * full list.
 */
export const listRuleGroups: API.PaginatedOperationMethod<
  ListRuleGroupsRequest & RegionInput,
  ListRuleGroupsResponse,
  ListRuleGroupsError,
  Credentials | HttpClient.HttpClient,
  RuleGroupMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1424, __c89, 0) as any as S.Schema<ListRuleGroupsRequest>,
  output: __S(1427, __c89, 3) as any as S.Schema<ListRuleGroupsResponse>,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "RuleGroups",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListRuleGroups",
})) as any;

export type ListTagsForResourceError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the tags associated with the specified resource. Tags are key:value pairs that
 * you can use to categorize and manage your resources, for purposes like billing. For
 * example, you might set the tag key to "customer" and the value to the customer name or ID.
 * You can specify one or more tags to add to each Amazon Web Services resource, up to 50 tags for a
 * resource.
 *
 * You can tag the Amazon Web Services resources that you manage through Network Firewall: firewalls, firewall
 * policies, and rule groups.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1440, __c90, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1441, __c90, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
})) as any;

export type ListTLSInspectionConfigurationsError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the TLS inspection configurations that you have defined. Depending on your setting for max results and the number of TLS inspection configurations, a single call might not return the full list.
 */
export const listTLSInspectionConfigurations: API.PaginatedOperationMethod<
  ListTLSInspectionConfigurationsRequest & RegionInput,
  ListTLSInspectionConfigurationsResponse,
  ListTLSInspectionConfigurationsError,
  Credentials | HttpClient.HttpClient,
  TLSInspectionConfigurationMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1456, __c91, 0) as any as S.Schema<ListTLSInspectionConfigurationsRequest>,
  output: __S(1457, __c91, 1) as any as S.Schema<ListTLSInspectionConfigurationsResponse>,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTLSInspectionConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TLSInspectionConfigurations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTLSInspectionConfigurations",
})) as any;

export type ListVpcEndpointAssociationsError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the VPC endpoint associations that you have defined. If you specify a fireawll,
 * this returns only the endpoint associations for that firewall.
 *
 * Depending on your setting for max results and the number of associations, a single call
 * might not return the full list.
 */
export const listVpcEndpointAssociations: API.PaginatedOperationMethod<
  ListVpcEndpointAssociationsRequest & RegionInput,
  ListVpcEndpointAssociationsResponse,
  ListVpcEndpointAssociationsError,
  Credentials | HttpClient.HttpClient,
  VpcEndpointAssociationMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1472, __c92, 0) as any as S.Schema<ListVpcEndpointAssociationsRequest>,
  output: __S(1475, __c92, 3) as any as S.Schema<ListVpcEndpointAssociationsResponse>,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcEndpointAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "VpcEndpointAssociations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListVpcEndpointAssociations",
})) as any;

export type PutResourcePolicyError =
  | InternalServerError
  | InvalidRequestException
  | InvalidResourcePolicyException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates or updates an IAM policy for your rule group, firewall policy, or firewall. Use this to share these resources between accounts. This operation works in conjunction with the Amazon Web Services Resource Access Manager (RAM) service to manage resource sharing for Network Firewall.
 *
 * For information about using sharing with Network Firewall resources, see
 * Sharing Network Firewall resources in the *Network Firewall Developer Guide*.
 *
 * Use this operation to create or update a resource policy for your Network Firewall rule group, firewall policy, or firewall. In the resource policy, you specify the accounts that you want to share the Network Firewall resource with and the operations that you want the accounts to be able to perform.
 *
 * When you add an account in the resource policy, you then run the following Resource Access Manager (RAM) operations to access and accept the shared resource.
 *
 * - GetResourceShareInvitations - Returns the Amazon Resource Names (ARNs) of the resource share invitations.
 *
 * - AcceptResourceShareInvitation - Accepts the share invitation for a specified resource share.
 *
 * For additional information about resource sharing using RAM, see Resource Access Manager User Guide.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest & RegionInput,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1488, __c93, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(928, __c58, 0) as any as S.Schema<PutResourcePolicyResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidResourcePolicyException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
  telemetry: TELEMETRY,
  span: "PutResourcePolicy",
}));

export type RejectNetworkFirewallTransitGatewayAttachmentError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Rejects a transit gateway attachment request for Network Firewall. When you reject the attachment request, Network Firewall cancels the creation of routing components between the transit gateway and firewall endpoints.
 *
 * Only the transit gateway owner can reject the attachment. After rejection, no traffic will flow through the firewall endpoints for this attachment.
 *
 * Use DescribeFirewall to monitor the rejection status. To accept the attachment instead of rejecting it, use AcceptNetworkFirewallTransitGatewayAttachment.
 *
 * Once rejected, you cannot reverse this action. To establish connectivity, you must create a new transit gateway-attached firewall.
 */
export const rejectNetworkFirewallTransitGatewayAttachment: API.OperationMethod<
  RejectNetworkFirewallTransitGatewayAttachmentRequest & RegionInput,
  RejectNetworkFirewallTransitGatewayAttachmentResponse,
  RejectNetworkFirewallTransitGatewayAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    1504,
    __c94,
    0,
  ) as any as S.Schema<RejectNetworkFirewallTransitGatewayAttachmentRequest>,
  output: __S(
    16,
    __c1,
    0,
  ) as any as S.Schema<RejectNetworkFirewallTransitGatewayAttachmentResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectNetworkFirewallTransitGatewayAttachment",
  telemetry: TELEMETRY,
  span: "RejectNetworkFirewallTransitGatewayAttachment",
}));

export type StartAnalysisReportError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Generates a traffic analysis report for the timeframe and traffic type you specify.
 *
 * For information on the contents of a traffic analysis report, see AnalysisReport.
 */
export const startAnalysisReport: API.OperationMethod<
  StartAnalysisReportRequest & RegionInput,
  StartAnalysisReportResponse,
  StartAnalysisReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1520, __c95, 0) as any as S.Schema<StartAnalysisReportRequest>,
  output: __S(1521, __c95, 1) as any as S.Schema<StartAnalysisReportResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAnalysisReport",
  telemetry: TELEMETRY,
  span: "StartAnalysisReport",
}));

export type StartFlowCaptureError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Begins capturing the flows in a firewall, according to the filters you define.
 * Captures are similar, but not identical to snapshots. Capture operations provide visibility into flows that are not closed and are tracked by a firewall's flow table.
 * Unlike snapshots, captures are a time-boxed view.
 *
 * A flow is network traffic that is monitored by a firewall, either by stateful or stateless rules.
 * For traffic to be considered part of a flow, it must share Destination, DestinationPort, Direction, Protocol, Source, and SourcePort.
 *
 * To avoid encountering operation limits, you should avoid starting captures with broad filters, like wide IP ranges.
 * Instead, we recommend you define more specific criteria with `FlowFilters`, like narrow IP ranges, ports, or protocols.
 */
export const startFlowCapture: API.OperationMethod<
  StartFlowCaptureRequest & RegionInput,
  StartFlowCaptureResponse,
  StartFlowCaptureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c96, 0) as any as S.Schema<StartFlowCaptureRequest>,
  output: __S(1552, __c97, 0) as any as S.Schema<StartFlowCaptureResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFlowCapture",
  telemetry: TELEMETRY,
  span: "StartFlowCapture",
}));

export type StartFlowFlushError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Begins the flushing of traffic from the firewall, according to the filters you define.
 * When the operation starts, impacted flows are temporarily marked as timed out before the Suricata engine prunes,
 * or flushes, the flows from the firewall table.
 *
 * While the flush completes, impacted flows are processed as midstream traffic. This may result in a
 * temporary increase in midstream traffic metrics. We recommend that you double check your stream exception policy
 * before you perform a flush operation.
 */
export const startFlowFlush: API.OperationMethod<
  StartFlowFlushRequest & RegionInput,
  StartFlowFlushResponse,
  StartFlowFlushError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c98, 0) as any as S.Schema<StartFlowFlushRequest>,
  output: __S(1552, __c97, 0) as any as S.Schema<StartFlowFlushResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFlowFlush",
  telemetry: TELEMETRY,
  span: "StartFlowFlush",
}));

export type TagResourceError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource. Tags are key:value pairs that you can
 * use to categorize and manage your resources, for purposes like billing. For example, you
 * might set the tag key to "customer" and the value to the customer name or ID. You can
 * specify one or more tags to add to each Amazon Web Services resource, up to 50 tags for a resource.
 *
 * You can tag the Amazon Web Services resources that you manage through Network Firewall: firewalls, firewall
 * policies, and rule groups.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1584, __c99, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(928, __c58, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the tags with the specified keys from the specified resource. Tags are key:value
 * pairs that you can use to categorize and manage your resources, for purposes like billing.
 * For example, you might set the tag key to "customer" and the value to the customer name or
 * ID. You can specify one or more tags to add to each Amazon Web Services resource, up to 50 tags for a
 * resource.
 *
 * You can manage tags for the Amazon Web Services resources that you manage through Network Firewall:
 * firewalls, firewall policies, and rule groups.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c100, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(928, __c58, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateAvailabilityZoneChangeProtectionError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ResourceOwnerCheckException
  | ThrottlingException
  | CommonErrors;
/**
 * Modifies the `AvailabilityZoneChangeProtection` setting for a transit gateway-attached firewall. When enabled, this setting prevents accidental changes to the firewall's Availability Zone configuration. This helps protect against disrupting traffic flow in production environments.
 *
 * When enabled, you must disable this protection before using AssociateAvailabilityZones or DisassociateAvailabilityZones to modify the firewall's Availability Zone configuration.
 */
export const updateAvailabilityZoneChangeProtection: API.OperationMethod<
  UpdateAvailabilityZoneChangeProtectionRequest & RegionInput,
  UpdateAvailabilityZoneChangeProtectionResponse,
  UpdateAvailabilityZoneChangeProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1616, __c101, 0) as any as S.Schema<UpdateAvailabilityZoneChangeProtectionRequest>,
  output: __S(1617, __c101, 1) as any as S.Schema<UpdateAvailabilityZoneChangeProtectionResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ResourceOwnerCheckException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAvailabilityZoneChangeProtection",
  telemetry: TELEMETRY,
  span: "UpdateAvailabilityZoneChangeProtection",
}));

export type UpdateContainerAssociationError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the monitoring configurations and description of a container association. You can't change the container
 * type after creation. Provide an update token to enable optimistic concurrency control.
 */
export const updateContainerAssociation: API.OperationMethod<
  UpdateContainerAssociationRequest & RegionInput,
  UpdateContainerAssociationResponse,
  UpdateContainerAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c102, 0) as any as S.Schema<UpdateContainerAssociationRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<UpdateContainerAssociationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContainerAssociation",
  telemetry: TELEMETRY,
  span: "UpdateContainerAssociation",
}));

export type UpdateFirewallAnalysisSettingsError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Enables specific types of firewall analysis on a specific firewall you define.
 */
export const updateFirewallAnalysisSettings: API.OperationMethod<
  UpdateFirewallAnalysisSettingsRequest & RegionInput,
  UpdateFirewallAnalysisSettingsResponse,
  UpdateFirewallAnalysisSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1648, __c103, 0) as any as S.Schema<UpdateFirewallAnalysisSettingsRequest>,
  output: __S(1649, __c103, 1) as any as S.Schema<UpdateFirewallAnalysisSettingsResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallAnalysisSettings",
  telemetry: TELEMETRY,
  span: "UpdateFirewallAnalysisSettings",
}));

export type UpdateFirewallDeleteProtectionError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ResourceOwnerCheckException
  | ThrottlingException
  | CommonErrors;
/**
 * Modifies the flag, `DeleteProtection`, which indicates whether it is possible
 * to delete the firewall. If the flag is set to `TRUE`, the firewall is protected
 * against deletion. This setting helps protect against accidentally deleting a firewall
 * that's in use.
 */
export const updateFirewallDeleteProtection: API.OperationMethod<
  UpdateFirewallDeleteProtectionRequest & RegionInput,
  UpdateFirewallDeleteProtectionResponse,
  UpdateFirewallDeleteProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c104, 0) as any as S.Schema<UpdateFirewallDeleteProtectionRequest>,
  output: __S(1665, __c104, 1) as any as S.Schema<UpdateFirewallDeleteProtectionResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ResourceOwnerCheckException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallDeleteProtection",
  telemetry: TELEMETRY,
  span: "UpdateFirewallDeleteProtection",
}));

export type UpdateFirewallDescriptionError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Modifies the description for the specified firewall. Use the description to help you
 * identify the firewall when you're working with it.
 */
export const updateFirewallDescription: API.OperationMethod<
  UpdateFirewallDescriptionRequest & RegionInput,
  UpdateFirewallDescriptionResponse,
  UpdateFirewallDescriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1680, __c105, 0) as any as S.Schema<UpdateFirewallDescriptionRequest>,
  output: __S(1681, __c105, 1) as any as S.Schema<UpdateFirewallDescriptionResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallDescription",
  telemetry: TELEMETRY,
  span: "UpdateFirewallDescription",
}));

export type UpdateFirewallEncryptionConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ResourceOwnerCheckException
  | ThrottlingException
  | CommonErrors;
/**
 * A complex type that contains settings for encryption of your firewall resources.
 */
export const updateFirewallEncryptionConfiguration: API.OperationMethod<
  UpdateFirewallEncryptionConfigurationRequest & RegionInput,
  UpdateFirewallEncryptionConfigurationResponse,
  UpdateFirewallEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c106, 0) as any as S.Schema<UpdateFirewallEncryptionConfigurationRequest>,
  output: __S(1697, __c106, 1) as any as S.Schema<UpdateFirewallEncryptionConfigurationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ResourceOwnerCheckException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallEncryptionConfiguration",
  telemetry: TELEMETRY,
  span: "UpdateFirewallEncryptionConfiguration",
}));

export type UpdateFirewallPolicyError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the properties of the specified firewall policy.
 */
export const updateFirewallPolicy: API.OperationMethod<
  UpdateFirewallPolicyRequest & RegionInput,
  UpdateFirewallPolicyResponse,
  UpdateFirewallPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1712, __c107, 0) as any as S.Schema<UpdateFirewallPolicyRequest>,
  output: __S(528, __c33, 0) as any as S.Schema<UpdateFirewallPolicyResponse>,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallPolicy",
  telemetry: TELEMETRY,
  span: "UpdateFirewallPolicy",
}));

export type UpdateFirewallPolicyChangeProtectionError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ResourceOwnerCheckException
  | ThrottlingException
  | CommonErrors;
/**
 * Modifies the flag, `ChangeProtection`, which indicates whether it
 * is possible to change the firewall. If the flag is set to `TRUE`, the firewall is protected
 * from changes. This setting helps protect against accidentally changing a firewall that's in use.
 */
export const updateFirewallPolicyChangeProtection: API.OperationMethod<
  UpdateFirewallPolicyChangeProtectionRequest & RegionInput,
  UpdateFirewallPolicyChangeProtectionResponse,
  UpdateFirewallPolicyChangeProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c108, 0) as any as S.Schema<UpdateFirewallPolicyChangeProtectionRequest>,
  output: __S(1729, __c108, 1) as any as S.Schema<UpdateFirewallPolicyChangeProtectionResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ResourceOwnerCheckException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallPolicyChangeProtection",
  telemetry: TELEMETRY,
  span: "UpdateFirewallPolicyChangeProtection",
}));

export type UpdateFirewallPolicyV2Error =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the properties of the specified Next Generation policy.
 */
export const updateFirewallPolicyV2: API.OperationMethod<
  UpdateFirewallPolicyV2Request & RegionInput,
  UpdateFirewallPolicyV2Response,
  UpdateFirewallPolicyV2Error,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1744, __c109, 0) as any as S.Schema<UpdateFirewallPolicyV2Request>,
  output: __S(608, __c38, 0) as any as S.Schema<UpdateFirewallPolicyV2Response>,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallPolicyV2",
  telemetry: TELEMETRY,
  span: "UpdateFirewallPolicyV2",
}));

export type UpdateLoggingConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | LogDestinationPermissionException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Sets the logging configuration for the specified firewall.
 *
 * To change the logging configuration, retrieve the LoggingConfiguration by calling DescribeLoggingConfiguration, then change it and provide
 * the modified object to this update call. You must change the logging configuration one
 * LogDestinationConfig at a time inside the retrieved LoggingConfiguration object.
 *
 * You can perform only one of the following actions in any call to
 * `UpdateLoggingConfiguration`:
 *
 * - Create a new log destination object by adding a single
 * `LogDestinationConfig` array element to
 * `LogDestinationConfigs`.
 *
 * - Delete a log destination object by removing a single
 * `LogDestinationConfig` array element from
 * `LogDestinationConfigs`.
 *
 * - Change the `LogDestination` setting in a single
 * `LogDestinationConfig` array element.
 *
 * You can't change the `LogDestinationType` or `LogType` in a
 * `LogDestinationConfig`. To change these settings, delete the existing
 * `LogDestinationConfig` object and create a new one, using two separate calls
 * to this update operation.
 */
export const updateLoggingConfiguration: API.OperationMethod<
  UpdateLoggingConfigurationRequest & RegionInput,
  UpdateLoggingConfigurationResponse,
  UpdateLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c110, 0) as any as S.Schema<UpdateLoggingConfigurationRequest>,
  output: __S(1761, __c110, 1) as any as S.Schema<UpdateLoggingConfigurationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    LogDestinationPermissionException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLoggingConfiguration",
  telemetry: TELEMETRY,
  span: "UpdateLoggingConfiguration",
}));

export type UpdateProxySettingsError =
  | InternalServerError
  | InvalidOperationException
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ResourceOwnerCheckException
  | ThrottlingException
  | CommonErrors;
/**
 * Modifies the proxy settings of a proxy mode firewall. Use this operation to change the ports and protocols on which the firewall's proxy listens for traffic. The new listeners take effect without recreating the firewall.
 *
 * The `ProxySettings` that you provide replace the firewall's current proxy settings. If you created the firewall with your own `CertificateArn` and `DomainName`, you must specify the same values in every request. You can't change or remove them.
 */
export const updateProxySettings: API.OperationMethod<
  UpdateProxySettingsRequest & RegionInput,
  UpdateProxySettingsResponse,
  UpdateProxySettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1776, __c111, 0) as any as S.Schema<UpdateProxySettingsRequest>,
  output: __S(1777, __c111, 1) as any as S.Schema<UpdateProxySettingsResponse>,
  errors: [
    InternalServerError,
    InvalidOperationException,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ResourceOwnerCheckException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxySettings",
  telemetry: TELEMETRY,
  span: "UpdateProxySettings",
}));

export type UpdateRuleGroupError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the rule settings for the specified rule group. You use a rule group by
 * reference in one or more firewall policies. When you modify a rule group, you modify all
 * firewall policies that use the rule group.
 *
 * To update a rule group, first call DescribeRuleGroup to retrieve the
 * current RuleGroup object, update the object as needed, and then provide
 * the updated object to this call.
 */
export const updateRuleGroup: API.OperationMethod<
  UpdateRuleGroupRequest & RegionInput,
  UpdateRuleGroupResponse,
  UpdateRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c112, 0) as any as S.Schema<UpdateRuleGroupRequest>,
  output: __S(704, __c44, 0) as any as S.Schema<UpdateRuleGroupResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRuleGroup",
  telemetry: TELEMETRY,
  span: "UpdateRuleGroup",
}));

export type UpdateSubnetChangeProtectionError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ResourceOwnerCheckException
  | ThrottlingException
  | CommonErrors;
/**
 *
 */
export const updateSubnetChangeProtection: API.OperationMethod<
  UpdateSubnetChangeProtectionRequest & RegionInput,
  UpdateSubnetChangeProtectionResponse,
  UpdateSubnetChangeProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1808, __c113, 0) as any as S.Schema<UpdateSubnetChangeProtectionRequest>,
  output: __S(1809, __c113, 1) as any as S.Schema<UpdateSubnetChangeProtectionResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ResourceOwnerCheckException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSubnetChangeProtection",
  telemetry: TELEMETRY,
  span: "UpdateSubnetChangeProtection",
}));

export type UpdateTLSInspectionConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | InvalidTokenException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the TLS inspection configuration settings for the specified TLS inspection configuration. You use a TLS inspection configuration by
 * referencing it in one or more firewall policies. When you modify a TLS inspection configuration, you modify all
 * firewall policies that use the TLS inspection configuration.
 *
 * To update a TLS inspection configuration, first call DescribeTLSInspectionConfiguration to retrieve the
 * current TLSInspectionConfiguration object, update the object as needed, and then provide
 * the updated object to this call.
 */
export const updateTLSInspectionConfiguration: API.OperationMethod<
  UpdateTLSInspectionConfigurationRequest & RegionInput,
  UpdateTLSInspectionConfigurationResponse,
  UpdateTLSInspectionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c114, 0) as any as S.Schema<UpdateTLSInspectionConfigurationRequest>,
  output: __S(768, __c48, 0) as any as S.Schema<UpdateTLSInspectionConfigurationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTLSInspectionConfiguration",
  telemetry: TELEMETRY,
  span: "UpdateTLSInspectionConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TransitGatewayAttachmentId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AcceptNetworkFirewallTransitGatewayAttachmentRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TransitGatewayAttachmentId: S.String,
          TransitGatewayAttachmentStatus: S.String,
        }),
      ).annotate({ identifier: "AcceptNetworkFirewallTransitGatewayAttachmentResponse" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          AvailabilityZoneMappings: __S(49, __c3, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateAvailabilityZonesRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AvailabilityZone: S.String })).annotate({
        identifier: "AvailabilityZoneMapping",
      });
    case 1:
      return S.Array(__S(48, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          AvailabilityZoneMappings: S.optional(__S(49, __c3, 1)),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociateAvailabilityZonesResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          FirewallPolicyArn: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateFirewallPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          FirewallPolicyArn: S.optional(S.String),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociateFirewallPolicyResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          SubnetMappings: __S(160, __c10, 0),
          NatGatewayCreateMappings: S.optional(__S(145, __c9, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateSubnetsRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubnetId: S.String, IPAddressType: S.optional(S.String) }),
      ).annotate({ identifier: "SubnetMapping" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetId: S.String,
          AllocationIds: S.optional(__S(112, __c7, 0)),
          PrivateIps: S.optional(__S(112, __c7, 0)),
        }),
      ).annotate({ identifier: "NatGatewayCreateMapping" });
    case 1:
      return S.Array(__S(144, __c9, 0));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(128, __c8, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          SubnetMappings: S.optional(__S(160, __c10, 0)),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociateSubnetsResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContainerAssociationName: S.String,
          Description: S.optional(S.String),
          Type: S.String,
          ContainerMonitoringConfigurations: __S(225, __c14, 1),
          Tags: S.optional(__S(209, __c13, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateContainerAssociationRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "ContainerAttribute",
      });
    case 1:
      return S.Array(__S(208, __c13, 0));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterArn: S.String, AttributeFilters: S.optional(__S(209, __c13, 1)) }),
      ).annotate({ identifier: "ContainerMonitoringConfiguration" });
    case 1:
      return S.Array(__S(224, __c14, 0));
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContainerAssociationName: S.optional(S.String),
          ContainerAssociationArn: S.optional(S.String),
          Description: S.optional(S.String),
          Type: S.optional(S.String),
          ContainerMonitoringConfigurations: S.optional(__S(225, __c14, 1)),
          Status: S.optional(S.String),
          Tags: S.optional(__S(209, __c13, 1)),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateContainerAssociationResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallName: S.String,
          FirewallPolicyArn: S.String,
          VpcId: S.optional(S.String),
          SubnetMappings: S.optional(__S(160, __c10, 0)),
          DeleteProtection: S.optional(S.Boolean),
          SubnetChangeProtection: S.optional(S.Boolean),
          FirewallPolicyChangeProtection: S.optional(S.Boolean),
          Description: S.optional(S.String),
          Tags: S.optional(__S(209, __c13, 1)),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
          EnabledAnalysisTypes: S.optional(__S(288, __c18, 0)),
          TransitGatewayId: S.optional(S.String),
          AvailabilityZoneMappings: S.optional(__S(49, __c3, 1)),
          AvailabilityZoneChangeProtection: S.optional(S.Boolean),
          NatGatewayCreateMappings: S.optional(__S(145, __c9, 1)),
          ProxySettings: S.optional(__S(368, __c23, 0)),
          VpcEndpoint: S.optional(__S(336, __c21, 0)),
          TransparentFilteringNatScope: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFirewallRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ KeyId: S.optional(S.String), Type: S.String })).annotate({
        identifier: "EncryptionConfiguration",
      });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SubnetId: S.optional(S.String),
          EndpointId: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          DnsName: S.optional(S.String),
        }),
      ).annotate({ identifier: "Attachment" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Firewall: S.optional(__S(337, __c21, 1)),
          FirewallStatus: S.optional(__S(349, __c21, 13)),
        }),
      ).annotate({ identifier: "CreateFirewallResponse" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcId: S.String, SubnetMappings: __S(160, __c10, 0) }),
      ).annotate({ identifier: "VpcEndpoint" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FirewallName: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallPolicyArn: S.String,
          VpcId: S.String,
          SubnetMappings: __S(160, __c10, 0),
          DeleteProtection: S.optional(S.Boolean),
          SubnetChangeProtection: S.optional(S.Boolean),
          FirewallPolicyChangeProtection: S.optional(S.Boolean),
          Description: S.optional(S.String),
          FirewallId: S.String,
          Tags: S.optional(__S(209, __c13, 1)),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
          NumberOfAssociations: S.optional(S.Number),
          EnabledAnalysisTypes: S.optional(__S(288, __c18, 0)),
          TransitGatewayId: S.optional(S.String),
          TransitGatewayOwnerAccountId: S.optional(S.String),
          AvailabilityZoneMappings: S.optional(__S(49, __c3, 1)),
          AvailabilityZoneChangeProtection: S.optional(S.Boolean),
          NatGatewayCreateMappings: S.optional(__S(145, __c9, 1)),
          ProxySettings: S.optional(__S(368, __c23, 0)),
          VpcEndpoint: S.optional(__S(336, __c21, 0)),
          TransparentFilteringNatScope: S.optional(S.String),
        }),
      ).annotate({ identifier: "Firewall" });
    case 2:
      return S.suspend(() =>
        S.Struct({ SyncStatus: S.optional(S.String), UpdateToken: S.optional(S.String) }),
      ).annotate({ identifier: "PerObjectStatus" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(338, __c21, 2).pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          NatGatewayId: S.String,
          Status: S.String,
          StatusMessage: S.optional(S.String),
          DnsName: S.optional(S.String),
        }),
      ).annotate({ identifier: "NatGatewayAttachment" });
    case 5:
      return S.Array(__S(340, __c21, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          Attachment: S.optional(__S(304, __c19, 0)),
          Config: S.optional(__S(339, __c21, 3)),
          NatGatewayAttachments: S.optional(__S(341, __c21, 5)),
        }),
      ).annotate({ identifier: "SyncState" });
    case 7:
      return S.Record(S.String, /*@__PURE__*/ __S(342, __c21, 6).pipe(S.optional));
    case 8:
      return S.suspend(() => S.Struct({ ResolvedCIDRCount: S.optional(S.Number) })).annotate({
        identifier: "IPSetMetadata",
      });
    case 9:
      return S.Record(S.String, /*@__PURE__*/ __S(344, __c21, 8).pipe(S.optional));
    case 10:
      return S.suspend(() =>
        S.Struct({
          AvailableCIDRCount: S.optional(S.Number),
          UtilizedCIDRCount: S.optional(S.Number),
          IPSetReferences: S.optional(__S(345, __c21, 9)),
        }),
      ).annotate({ identifier: "CIDRSummary" });
    case 11:
      return S.suspend(() => S.Struct({ CIDRs: S.optional(__S(346, __c21, 10)) })).annotate({
        identifier: "CapacityUsageSummary",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({
          AttachmentId: S.optional(S.String),
          TransitGatewayAttachmentStatus: S.optional(S.String),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "TransitGatewayAttachmentSyncState" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          Status: S.String,
          ConfigurationSyncStateSummary: S.String,
          SyncStates: S.optional(__S(343, __c21, 7)),
          CapacityUsageSummary: S.optional(__S(347, __c21, 11)),
          TransitGatewayAttachmentSyncState: S.optional(__S(348, __c21, 12)),
        }),
      ).annotate({ identifier: "FirewallStatus" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Port: S.optional(S.Number), Type: S.optional(S.String) }),
      ).annotate({ identifier: "ListenerProperty" });
    case 1:
      return S.Array(__S(352, __c22, 0));
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ListenerProperties: __S(353, __c22, 1),
          CertificateArn: S.optional(S.String),
          DomainName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProxySettings" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallPolicyName: S.String,
          FirewallPolicy: __S(517, __c32, 5),
          Description: S.optional(S.String),
          Tags: S.optional(__S(209, __c13, 1)),
          DryRun: S.optional(S.Boolean),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFirewallPolicyRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AddressDefinition: S.String })).annotate({
        identifier: "Address",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(400, __c25, 0));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Definition: __S(112, __c7, 0) })).annotate({
        identifier: "IPSet",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(432, __c27, 0).pipe(S.optional));
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Code: S.String, Message: S.String, ResourceId: S.optional(S.String) }),
      ).annotate({ identifier: "FirewallPolicyError" });
    case 1:
      return S.Array(__S(448, __c28, 0));
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Action: S.optional(S.String) })).annotate({
        identifier: "StatefulRuleGroupOverride",
      });
    case 1:
      return S.suspend(() => S.Struct({ TcpIdleTimeoutSeconds: S.optional(S.Number) })).annotate({
        identifier: "FlowTimeouts",
      });
    case 2:
      return S.suspend(() => S.Struct({ RuleVariables: S.optional(__S(433, __c27, 1)) })).annotate({
        identifier: "PolicyVariables",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Action: S.String,
          DNSFirewallRuleGroupId: S.String,
          DNSExpiryExceptionPolicy: S.String,
          BypassDestinationValidationIPRanges: S.optional(__S(416, __c26, 0)),
          SourceIPRanges: S.optional(__S(416, __c26, 0)),
        }),
      ).annotate({ identifier: "Route53ResolvedIPValidation" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Value: S.String })).annotate({ identifier: "Dimension" });
    case 1:
      return S.Array(__S(480, __c30, 0));
    case 2:
      return S.suspend(() => S.Struct({ Dimensions: __S(481, __c30, 1) })).annotate({
        identifier: "PublishMetricAction",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ PublishMetricAction: S.optional(__S(482, __c30, 2)) }),
      ).annotate({ identifier: "ActionDefinition" });
    case 4:
      return S.suspend(() =>
        S.Struct({ ActionName: S.String, ActionDefinition: __S(483, __c30, 3) }),
      ).annotate({ identifier: "CustomAction" });
    case 5:
      return S.Array(__S(484, __c30, 4));
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallPolicyName: S.String,
          FirewallPolicyArn: S.String,
          FirewallPolicyId: S.String,
          Description: S.optional(S.String),
          FirewallPolicyStatus: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          Tags: S.optional(__S(209, __c13, 1)),
          ConsumedStatelessRuleCapacity: S.optional(S.Number),
          ConsumedStatefulRuleCapacity: S.optional(S.Number),
          ConsumedStatefulDomainCapacity: S.optional(S.Number),
          NumberOfAssociations: S.optional(S.Number),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
          Errors: S.optional(__S(449, __c28, 1)),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "FirewallPolicyResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ResourceArn: S.String, Priority: S.Number })).annotate({
        identifier: "StatelessRuleGroupReference",
      });
    case 1:
      return S.Array(__S(512, __c32, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          Priority: S.optional(S.Number),
          Override: S.optional(__S(464, __c29, 0)),
          DeepThreatInspection: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "StatefulRuleGroupReference" });
    case 3:
      return S.Array(__S(514, __c32, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          RuleOrder: S.optional(S.String),
          StreamExceptionPolicy: S.optional(S.String),
          FlowTimeouts: S.optional(__S(465, __c29, 1)),
        }),
      ).annotate({ identifier: "StatefulEngineOptions" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          StatelessRuleGroupReferences: S.optional(__S(513, __c32, 1)),
          StatelessDefaultActions: __S(112, __c7, 0),
          StatelessFragmentDefaultActions: __S(112, __c7, 0),
          StatelessCustomActions: S.optional(__S(485, __c30, 5)),
          StatefulRuleGroupReferences: S.optional(__S(515, __c32, 3)),
          StatefulDefaultActions: S.optional(__S(112, __c7, 0)),
          StatefulEngineOptions: S.optional(__S(516, __c32, 4)),
          TLSInspectionConfigurationArn: S.optional(S.String),
          PolicyVariables: S.optional(__S(466, __c29, 2)),
          EnableTLSSessionHolding: S.optional(S.Boolean),
          Route53ResolvedIPValidation: S.optional(__S(467, __c29, 3)),
        }),
      ).annotate({ identifier: "FirewallPolicy" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UpdateToken: S.String, FirewallPolicyResponse: __S(496, __c31, 0) }),
      ).annotate({ identifier: "CreateFirewallPolicyResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallPolicyV2Name: S.String,
          FirewallPolicyV2: __S(597, __c37, 5),
          Description: S.optional(S.String),
          Tags: S.optional(__S(209, __c13, 1)),
          DryRun: S.optional(S.Boolean),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFirewallPolicyV2Request" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Keyword: S.String, Settings: S.optional(__S(112, __c7, 0)) }),
      ).annotate({ identifier: "RuleOption" });
    case 1:
      return S.Array(__S(560, __c35, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ RuleEnabled: S.optional(S.Boolean), RuleDescription: S.optional(S.String) }),
      ).annotate({ identifier: "RuleMetadata" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Action: S.String,
          ActionScope: S.String,
          Hook: S.String,
          Protocol: S.String,
          SourceIPs: S.optional(S.String),
          DestIPs: S.optional(S.String),
          SourcePorts: S.optional(S.String),
          DestPorts: S.optional(S.String),
          RuleOptions: S.optional(__S(561, __c35, 1)),
          AcceptPriorHooks: S.optional(S.Boolean),
          AlertEnabled: S.optional(S.Boolean),
          BypassIPSEnabled: S.optional(S.Boolean),
          RuleMetadata: S.optional(__S(562, __c35, 2)),
        }),
      ).annotate({ identifier: "FirewallRule" });
    case 4:
      return S.Array(__S(563, __c35, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Targets: __S(112, __c7, 0),
          TargetTypes: __S(288, __c18, 0),
          GeneratedRulesType: S.String,
        }),
      ).annotate({ identifier: "RulesSourceList" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          RulesString: S.optional(S.String),
          FirewallRules: S.optional(__S(564, __c35, 4)),
          RulesSourceList: S.optional(__S(565, __c35, 5)),
        }),
      ).annotate({ identifier: "FirewallRulesSource" });
    case 7:
      return S.suspend(() => S.Struct({ Definition: S.optional(__S(112, __c7, 0)) })).annotate({
        identifier: "PortSet",
      });
    case 8:
      return S.Record(S.String, /*@__PURE__*/ __S(567, __c35, 7).pipe(S.optional));
    case 9:
      return S.suspend(() =>
        S.Struct({
          IPSets: S.optional(__S(433, __c27, 1)),
          PortSets: S.optional(__S(568, __c35, 8)),
        }),
      ).annotate({ identifier: "RuleVariables" });
    case 10:
      return S.suspend(() => S.Struct({ ReferenceArn: S.optional(S.String) })).annotate({
        identifier: "IPSetReference",
      });
    case 11:
      return S.Record(S.String, /*@__PURE__*/ __S(570, __c35, 10).pipe(S.optional));
    case 12:
      return S.suspend(() =>
        S.Struct({ IPSetReferences: S.optional(__S(571, __c35, 11)) }),
      ).annotate({ identifier: "ReferenceSets" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          RulesSource: __S(566, __c35, 6),
          RuleVariables: S.optional(__S(569, __c35, 9)),
          ReferenceSets: S.optional(__S(572, __c35, 12)),
        }),
      ).annotate({ identifier: "FirewallRuleGroup" });
    case 14:
      return S.suspend(() => S.Struct({ RulesString: S.optional(S.String) })).annotate({
        identifier: "IpsRulesSource",
      });
    case 15:
      return S.suspend(() =>
        S.Struct({
          RulesSource: __S(574, __c35, 14),
          RuleVariables: S.optional(__S(569, __c35, 9)),
          ReferenceSets: S.optional(__S(572, __c35, 12)),
        }),
      ).annotate({ identifier: "IpsRuleGroup" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallPolicyV2Name: S.String,
          FirewallPolicyV2Arn: S.String,
          FirewallPolicyV2Id: S.String,
          Description: S.optional(S.String),
          FirewallPolicyV2Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          Tags: S.optional(__S(209, __c13, 1)),
          ConsumedFirewallRuleCapacity: S.optional(S.Number),
          ConsumedIpsRuleCapacity: S.optional(S.Number),
          ConsumedIpsDomainCapacity: S.optional(S.Number),
          NumberOfAssociations: S.optional(S.Number),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
          Errors: S.optional(__S(449, __c28, 1)),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "FirewallPolicyV2Response" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Priority: S.optional(S.Number),
          ResourceArn: S.optional(S.String),
          InlineRuleGroup: S.optional(__S(573, __c35, 13)),
        }),
      ).annotate({ identifier: "FirewallRuleGroupEntry" });
    case 1:
      return S.Array(__S(592, __c37, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          InlineRuleGroup: S.optional(__S(575, __c35, 15)),
          Override: S.optional(__S(464, __c29, 0)),
        }),
      ).annotate({ identifier: "IpsRuleGroupEntry" });
    case 3:
      return S.Array(__S(594, __c37, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          StreamExceptionPolicy: S.optional(S.String),
          FlowTimeouts: S.optional(__S(465, __c29, 1)),
        }),
      ).annotate({ identifier: "StatefulEngineOptionsV2" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          FirewallRuleGroupEntries: S.optional(__S(593, __c37, 1)),
          IpsRuleGroupEntries: S.optional(__S(595, __c37, 3)),
          PolicyMode: S.optional(S.String),
          FirewallDefaultAction: S.optional(S.String),
          StatefulEngineOptions: S.optional(__S(596, __c37, 4)),
          TLSInspectionConfigurationArn: S.optional(S.String),
          PolicyVariables: S.optional(__S(466, __c29, 2)),
          Route53ResolvedIPValidation: S.optional(__S(467, __c29, 3)),
        }),
      ).annotate({ identifier: "FirewallPolicyV2" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UpdateToken: S.String, FirewallPolicyV2Response: __S(576, __c36, 0) }),
      ).annotate({ identifier: "CreateFirewallPolicyV2Response" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleGroupName: S.String,
          RuleGroup: S.optional(__S(699, __c43, 11)),
          FirewallRuleGroup: S.optional(__S(573, __c35, 13)),
          IpsRuleGroup: S.optional(__S(575, __c35, 15)),
          Rules: S.optional(S.String),
          Type: S.String,
          Description: S.optional(S.String),
          Capacity: S.Number,
          Tags: S.optional(__S(209, __c13, 1)),
          DryRun: S.optional(S.Boolean),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
          SourceMetadata: S.optional(__S(656, __c41, 0)),
          AnalyzeRuleGroup: S.optional(S.Boolean),
          SummaryConfiguration: S.optional(__S(657, __c41, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRuleGroupRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ FromPort: S.Number, ToPort: S.Number })).annotate({
        identifier: "PortRange",
      });
    case 1:
      return S.Array(__S(640, __c40, 0));
    case 2:
      return S.Array(S.Number);
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SourceArn: S.optional(S.String), SourceUpdateToken: S.optional(S.String) }),
      ).annotate({ identifier: "SourceMetadata" });
    case 1:
      return S.suspend(() => S.Struct({ RuleOptions: S.optional(__S(288, __c18, 0)) })).annotate({
        identifier: "SummaryConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          IdentifiedRuleIds: S.optional(__S(112, __c7, 0)),
          IdentifiedType: S.optional(S.String),
          AnalysisDetail: S.optional(S.String),
        }),
      ).annotate({ identifier: "AnalysisResult" });
    case 3:
      return S.Array(__S(658, __c41, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          RuleGroupArn: S.String,
          RuleGroupName: S.String,
          RuleGroupId: S.String,
          Description: S.optional(S.String),
          Type: S.optional(S.String),
          Capacity: S.optional(S.Number),
          RuleGroupStatus: S.optional(S.String),
          Tags: S.optional(__S(209, __c13, 1)),
          ConsumedCapacity: S.optional(S.Number),
          NumberOfAssociations: S.optional(S.Number),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
          SourceMetadata: S.optional(__S(656, __c41, 0)),
          SnsTopic: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AnalysisResults: S.optional(__S(659, __c41, 3)),
          SummaryConfiguration: S.optional(__S(657, __c41, 1)),
        }),
      ).annotate({ identifier: "RuleGroupResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RuleOrder: S.optional(S.String) })).annotate({
        identifier: "StatefulRuleOptions",
      });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Protocol: S.String,
          Source: S.String,
          SourcePort: S.String,
          Direction: S.String,
          Destination: S.String,
          DestinationPort: S.String,
        }),
      ).annotate({ identifier: "Header" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Action: S.String, Header: __S(688, __c43, 0), RuleOptions: __S(561, __c35, 1) }),
      ).annotate({ identifier: "StatefulRule" });
    case 2:
      return S.Array(__S(689, __c43, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Flags: __S(288, __c18, 0), Masks: S.optional(__S(288, __c18, 0)) }),
      ).annotate({ identifier: "TCPFlagField" });
    case 4:
      return S.Array(__S(691, __c43, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          Sources: S.optional(__S(416, __c26, 0)),
          Destinations: S.optional(__S(416, __c26, 0)),
          SourcePorts: S.optional(__S(641, __c40, 1)),
          DestinationPorts: S.optional(__S(641, __c40, 1)),
          Protocols: S.optional(__S(642, __c40, 2)),
          TCPFlags: S.optional(__S(692, __c43, 4)),
        }),
      ).annotate({ identifier: "MatchAttributes" });
    case 6:
      return S.suspend(() =>
        S.Struct({ MatchAttributes: __S(693, __c43, 5), Actions: __S(112, __c7, 0) }),
      ).annotate({ identifier: "RuleDefinition" });
    case 7:
      return S.suspend(() =>
        S.Struct({ RuleDefinition: __S(694, __c43, 6), Priority: S.Number }),
      ).annotate({ identifier: "StatelessRule" });
    case 8:
      return S.Array(__S(695, __c43, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          StatelessRules: __S(696, __c43, 8),
          CustomActions: S.optional(__S(485, __c30, 5)),
        }),
      ).annotate({ identifier: "StatelessRulesAndCustomActions" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          RulesString: S.optional(S.String),
          RulesSourceList: S.optional(__S(565, __c35, 5)),
          StatefulRules: S.optional(__S(690, __c43, 2)),
          StatelessRulesAndCustomActions: S.optional(__S(697, __c43, 9)),
        }),
      ).annotate({ identifier: "RulesSource" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          RuleVariables: S.optional(__S(569, __c35, 9)),
          ReferenceSets: S.optional(__S(572, __c35, 12)),
          RulesSource: __S(698, __c43, 10),
          StatefulRuleOptions: S.optional(__S(672, __c42, 0)),
        }),
      ).annotate({ identifier: "RuleGroup" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UpdateToken: S.String, RuleGroupResponse: __S(660, __c41, 4) }),
      ).annotate({ identifier: "CreateRuleGroupResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TLSInspectionConfigurationName: S.String,
          TLSInspectionConfiguration: __S(760, __c47, 8),
          Description: S.optional(S.String),
          Tags: S.optional(__S(209, __c13, 1)),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTLSInspectionConfigurationRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CertificateArn: S.optional(S.String),
          CertificateSerial: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "TlsCertificateData" });
    case 1:
      return S.Array(__S(736, __c46, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TLSInspectionConfigurationArn: S.String,
          TLSInspectionConfigurationName: S.String,
          TLSInspectionConfigurationId: S.String,
          TLSInspectionConfigurationStatus: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(209, __c13, 1)),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NumberOfAssociations: S.optional(S.Number),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
          Certificates: S.optional(__S(737, __c46, 1)),
          CertificateAuthority: S.optional(__S(736, __c46, 0)),
        }),
      ).annotate({ identifier: "TLSInspectionConfigurationResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ResourceArn: S.optional(S.String) })).annotate({
        identifier: "ServerCertificate",
      });
    case 1:
      return S.Array(__S(752, __c47, 0));
    case 2:
      return S.suspend(() => S.Struct({ Domains: __S(112, __c7, 0) })).annotate({
        identifier: "DomainMatch",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          Sources: S.optional(__S(416, __c26, 0)),
          Destinations: S.optional(__S(416, __c26, 0)),
          SourcePorts: S.optional(__S(641, __c40, 1)),
          DestinationPorts: S.optional(__S(641, __c40, 1)),
          Protocols: S.optional(__S(642, __c40, 2)),
          DomainMatch: S.optional(__S(754, __c47, 2)),
          DecryptionAction: S.optional(S.String),
          DeploymentMode: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServerCertificateScope" });
    case 4:
      return S.Array(__S(755, __c47, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          RevokedStatusAction: S.optional(S.String),
          UnknownStatusAction: S.optional(S.String),
        }),
      ).annotate({ identifier: "CheckCertificateRevocationStatusActions" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          ServerCertificates: S.optional(__S(753, __c47, 1)),
          Scopes: S.optional(__S(756, __c47, 4)),
          CertificateAuthorityArn: S.optional(S.String),
          CheckCertificateRevocationStatus: S.optional(__S(757, __c47, 5)),
          DefaultDecryptionBehavior: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServerCertificateConfiguration" });
    case 7:
      return S.Array(__S(758, __c47, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ ServerCertificateConfigurations: S.optional(__S(759, __c47, 7)) }),
      ).annotate({ identifier: "TLSInspectionConfiguration" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UpdateToken: S.String, TLSInspectionConfigurationResponse: __S(738, __c46, 2) }),
      ).annotate({ identifier: "CreateTLSInspectionConfigurationResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.String,
          VpcId: S.String,
          SubnetMapping: __S(128, __c8, 0),
          Description: S.optional(S.String),
          Tags: S.optional(__S(209, __c13, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateVpcEndpointAssociationRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VpcEndpointAssociationId: S.optional(S.String),
          VpcEndpointAssociationArn: S.String,
          FirewallArn: S.String,
          VpcId: S.String,
          SubnetMapping: __S(128, __c8, 0),
          Description: S.optional(S.String),
          Tags: S.optional(__S(209, __c13, 1)),
        }),
      ).annotate({ identifier: "VpcEndpointAssociation" });
    case 1:
      return S.suspend(() => S.Struct({ Attachment: S.optional(__S(304, __c19, 0)) })).annotate({
        identifier: "AZSyncState",
      });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(801, __c50, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({ Status: S.String, AssociationSyncState: S.optional(__S(802, __c50, 2)) }),
      ).annotate({ identifier: "VpcEndpointAssociationStatus" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          VpcEndpointAssociation: S.optional(__S(800, __c50, 0)),
          VpcEndpointAssociationStatus: S.optional(__S(803, __c50, 3)),
        }),
      ).annotate({ identifier: "CreateVpcEndpointAssociationResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContainerAssociationName: S.optional(S.String),
          ContainerAssociationArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteContainerAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContainerAssociationName: S.optional(S.String),
          ContainerAssociationArn: S.optional(S.String),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteContainerAssociationResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallName: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          DeleteAssociatedNatGateways: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteFirewallRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallPolicyName: S.optional(S.String),
          FirewallPolicyArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteFirewallPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ FirewallPolicyResponse: __S(496, __c31, 0) })).annotate({
        identifier: "DeleteFirewallPolicyResponse",
      });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallPolicyV2Arn: S.optional(S.String),
          FirewallPolicyV2Name: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteFirewallPolicyV2Request" });
    case 1:
      return S.suspend(() => S.Struct({ FirewallPolicyV2Response: __S(576, __c36, 0) })).annotate({
        identifier: "DeleteFirewallPolicyV2Response",
      });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TransitGatewayAttachmentId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteNetworkFirewallTransitGatewayAttachmentRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NatGatewayId: S.String,
          ProxyName: S.optional(S.String),
          ProxyArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteProxyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NatGatewayId: S.optional(S.String),
          ProxyName: S.optional(S.String),
          ProxyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteProxyResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteResourcePolicyResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleGroupName: S.optional(S.String),
          RuleGroupArn: S.optional(S.String),
          Type: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteRuleGroupRequest" });
    case 1:
      return S.suspend(() => S.Struct({ RuleGroupResponse: __S(660, __c41, 4) })).annotate({
        identifier: "DeleteRuleGroupResponse",
      });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TLSInspectionConfigurationArn: S.optional(S.String),
          TLSInspectionConfigurationName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteTLSInspectionConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ TLSInspectionConfigurationResponse: __S(738, __c46, 2) }),
      ).annotate({ identifier: "DeleteTLSInspectionConfigurationResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcEndpointAssociationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteVpcEndpointAssociationRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContainerAssociationName: S.optional(S.String),
          ContainerAssociationArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeContainerAssociationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ContainerAssociationName: S.optional(S.String),
          ContainerAssociationArn: S.optional(S.String),
          Description: S.optional(S.String),
          Type: S.optional(S.String),
          ContainerMonitoringConfigurations: S.optional(__S(225, __c14, 1)),
          Status: S.optional(S.String),
          ResolvedCidrCount: S.optional(S.Number),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(209, __c13, 1)),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeContainerAssociationResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FirewallName: S.optional(S.String), FirewallArn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFirewallRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          Firewall: S.optional(__S(337, __c21, 1)),
          FirewallStatus: S.optional(__S(349, __c21, 13)),
        }),
      ).annotate({ identifier: "DescribeFirewallResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FirewallArn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeFirewallMetadataRequest" });
    case 1:
      return S.suspend(() => S.Struct({ IPAddressType: S.optional(S.String) })).annotate({
        identifier: "AvailabilityZoneMetadata",
      });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(1025, __c64, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallPolicyArn: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          SupportedAvailabilityZones: S.optional(__S(1026, __c64, 2)),
          TransitGatewayAttachmentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeFirewallMetadataResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallPolicyName: S.optional(S.String),
          FirewallPolicyArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeFirewallPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.String,
          FirewallPolicyResponse: __S(496, __c31, 0),
          FirewallPolicy: S.optional(__S(517, __c32, 5)),
        }),
      ).annotate({ identifier: "DescribeFirewallPolicyResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallPolicyV2Arn: S.optional(S.String),
          FirewallPolicyV2Name: S.optional(S.String),
          RuleOutputFormat: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeFirewallPolicyV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.String,
          FirewallPolicyV2Response: __S(576, __c36, 0),
          FirewallPolicyV2: S.optional(__S(597, __c37, 5)),
        }),
      ).annotate({ identifier: "DescribeFirewallPolicyV2Response" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.String,
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          VpcEndpointAssociationArn: S.optional(S.String),
          VpcEndpointId: S.optional(S.String),
          FlowOperationId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeFlowOperationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MinimumFlowAgeInSeconds: S.optional(S.Number),
          FlowFilters: S.optional(__S(1089, __c68, 1)),
        }),
      ).annotate({ identifier: "FlowOperation" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          VpcEndpointAssociationArn: S.optional(S.String),
          VpcEndpointId: S.optional(S.String),
          FlowOperationId: S.optional(S.String),
          FlowOperationType: S.optional(S.String),
          FlowOperationStatus: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          FlowRequestTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FlowOperation: S.optional(__S(1073, __c67, 1)),
        }),
      ).annotate({ identifier: "DescribeFlowOperationResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceAddress: S.optional(__S(400, __c25, 0)),
          DestinationAddress: S.optional(__S(400, __c25, 0)),
          SourcePort: S.optional(S.String),
          DestinationPort: S.optional(S.String),
          Protocols: S.optional(__S(112, __c7, 0)),
        }),
      ).annotate({ identifier: "FlowFilter" });
    case 1:
      return S.Array(__S(1088, __c68, 0));
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FirewallArn: S.optional(S.String), FirewallName: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeLoggingConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          LoggingConfiguration: S.optional(__S(1123, __c70, 3)),
          EnableMonitoringDashboard: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DescribeLoggingConfigurationResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          LogType: S.String,
          LogDestinationType: S.String,
          LogDestination: __S(1120, __c70, 0),
        }),
      ).annotate({ identifier: "LogDestinationConfig" });
    case 2:
      return S.Array(__S(1121, __c70, 1));
    case 3:
      return S.suspend(() => S.Struct({ LogDestinationConfigs: __S(1122, __c70, 2) })).annotate({
        identifier: "LoggingConfiguration",
      });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProxyName: S.optional(S.String), ProxyArn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeProxyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ PcaArn: S.optional(S.String), TlsInterceptMode: S.optional(S.String) }),
      ).annotate({ identifier: "TlsInterceptProperties" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProxyName: S.optional(S.String),
          ProxyArn: S.optional(S.String),
          ProxyConfigurationName: S.optional(S.String),
          ProxyConfigurationArn: S.optional(S.String),
          NatGatewayId: S.optional(S.String),
          ProxyState: S.optional(S.String),
          ProxyModifyState: S.optional(S.String),
          ListenerProperties: S.optional(__S(353, __c22, 1)),
          TlsInterceptProperties: S.optional(__S(1137, __c71, 1)),
          VpcEndpointServiceName: S.optional(S.String),
          PrivateDNSName: S.optional(S.String),
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeleteTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureCode: S.optional(S.String),
          FailureMessage: S.optional(S.String),
          Tags: S.optional(__S(209, __c13, 1)),
        }),
      ).annotate({ identifier: "DescribeProxyResource" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Proxy: S.optional(__S(1138, __c71, 2)), UpdateToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeProxyResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeResourcePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Policy: S.optional(S.String) })).annotate({
        identifier: "DescribeResourcePolicyResponse",
      });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleGroupName: S.optional(S.String),
          RuleGroupArn: S.optional(S.String),
          Type: S.optional(S.String),
          AnalyzeRuleGroup: S.optional(S.Boolean),
          RuleOutputFormat: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRuleGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.String,
          RuleGroup: S.optional(__S(699, __c43, 11)),
          FirewallRuleGroup: S.optional(__S(573, __c35, 13)),
          IpsRuleGroup: S.optional(__S(575, __c35, 15)),
          RuleGroupResponse: __S(660, __c41, 4),
        }),
      ).annotate({ identifier: "DescribeRuleGroupResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleGroupName: S.optional(S.String),
          RuleGroupArn: S.optional(S.String),
          Type: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRuleGroupMetadataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          RuleGroupArn: S.String,
          RuleGroupName: S.String,
          Description: S.optional(S.String),
          Type: S.optional(S.String),
          Capacity: S.optional(S.Number),
          StatefulRuleOptions: S.optional(__S(672, __c42, 0)),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VendorName: S.optional(S.String),
          ProductId: S.optional(S.String),
          ListingName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeRuleGroupMetadataResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleGroupName: S.optional(S.String),
          RuleGroupArn: S.optional(S.String),
          Type: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRuleGroupSummaryRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SID: S.optional(S.String),
          Msg: S.optional(S.String),
          Metadata: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuleSummary" });
    case 2:
      return S.Array(__S(1201, __c75, 1));
    case 3:
      return S.suspend(() => S.Struct({ RuleSummaries: S.optional(__S(1202, __c75, 2)) })).annotate(
        { identifier: "Summary" },
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          RuleGroupName: S.String,
          Description: S.optional(S.String),
          Summary: S.optional(__S(1203, __c75, 3)),
        }),
      ).annotate({ identifier: "DescribeRuleGroupSummaryResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TLSInspectionConfigurationArn: S.optional(S.String),
          TLSInspectionConfigurationName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeTLSInspectionConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.String,
          TLSInspectionConfiguration: S.optional(__S(760, __c47, 8)),
          TLSInspectionConfigurationResponse: __S(738, __c46, 2),
        }),
      ).annotate({ identifier: "DescribeTLSInspectionConfigurationResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcEndpointAssociationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeVpcEndpointAssociationRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          AvailabilityZoneMappings: __S(49, __c3, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateAvailabilityZonesRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          SubnetIds: __S(112, __c7, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateSubnetsRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallName: S.optional(S.String),
          AnalysisReportId: S.String,
          FirewallArn: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetAnalysisReportResultsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Count: S.optional(S.Number) })).annotate({
        identifier: "Hits",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Protocol: S.optional(S.String),
          FirstAccessed: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastAccessed: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Domain: S.optional(S.String),
          Hits: S.optional(__S(1281, __c80, 1)),
          UniqueSources: S.optional(__S(1281, __c80, 1)),
        }),
      ).annotate({ identifier: "AnalysisTypeReportResult" });
    case 3:
      return S.Array(__S(1282, __c80, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReportTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AnalysisType: S.optional(S.String),
          NextToken: S.optional(S.String),
          AnalysisReportResults: S.optional(__S(1283, __c80, 3)),
        }),
      ).annotate({ identifier: "GetAnalysisReportResultsResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallName: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAnalysisReportsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          AnalysisReportId: S.optional(S.String),
          AnalysisType: S.optional(S.String),
          ReportTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AnalysisReport" });
    case 2:
      return S.Array(__S(1297, __c81, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AnalysisReports: S.optional(__S(1298, __c81, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAnalysisReportsResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListContainerAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Name: S.optional(S.String) }),
      ).annotate({ identifier: "ContainerAssociationSummary" });
    case 2:
      return S.Array(__S(1313, __c82, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ContainerAssociations: S.optional(__S(1314, __c82, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListContainerAssociationsResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFirewallPoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          FirewallPolicies: S.optional(__S(1345, __c84, 1)),
        }),
      ).annotate({ identifier: "ListFirewallPoliciesResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Arn: S.optional(S.String) }),
      ).annotate({ identifier: "FirewallPolicyMetadata" });
    case 1:
      return S.Array(__S(1344, __c84, 0));
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFirewallPoliciesV2Request" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), FirewallPoliciesV2: __S(1345, __c84, 1) }),
      ).annotate({ identifier: "ListFirewallPoliciesV2Response" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          VpcIds: S.optional(__S(112, __c7, 0)),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFirewallsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FirewallName: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          TransitGatewayAttachmentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "FirewallMetadata" });
    case 2:
      return S.Array(__S(1377, __c86, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Firewalls: S.optional(__S(1378, __c86, 2)) }),
      ).annotate({ identifier: "ListFirewallsResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.String,
          FlowOperationId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          VpcEndpointId: S.optional(S.String),
          VpcEndpointAssociationArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFlowOperationResultsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceAddress: S.optional(__S(400, __c25, 0)),
          DestinationAddress: S.optional(__S(400, __c25, 0)),
          SourcePort: S.optional(S.String),
          DestinationPort: S.optional(S.String),
          Protocol: S.optional(S.String),
          Age: S.optional(S.Number),
          PacketCount: S.optional(S.Number),
          ByteCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Flow" });
    case 2:
      return S.Array(__S(1393, __c87, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          VpcEndpointAssociationArn: S.optional(S.String),
          VpcEndpointId: S.optional(S.String),
          FlowOperationId: S.optional(S.String),
          FlowOperationStatus: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          FlowRequestTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Flows: S.optional(__S(1394, __c87, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFlowOperationResultsResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.String,
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          VpcEndpointAssociationArn: S.optional(S.String),
          VpcEndpointId: S.optional(S.String),
          FlowOperationType: S.optional(S.String),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFlowOperationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FlowOperationId: S.optional(S.String),
          FlowOperationType: S.optional(S.String),
          FlowRequestTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FlowOperationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "FlowOperationMetadata" });
    case 2:
      return S.Array(__S(1409, __c88, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FlowOperations: S.optional(__S(1410, __c88, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFlowOperationsResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          Scope: S.optional(S.String),
          ManagedType: S.optional(S.String),
          SubscriptionStatus: S.optional(S.String),
          Type: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRuleGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          Arn: S.optional(S.String),
          VendorName: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuleGroupMetadata" });
    case 2:
      return S.Array(__S(1425, __c89, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), RuleGroups: S.optional(__S(1426, __c89, 2)) }),
      ).annotate({ identifier: "ListRuleGroupsResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          ResourceArn: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Tags: S.optional(__S(209, __c13, 1)) }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTLSInspectionConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          TLSInspectionConfigurations: S.optional(__S(1345, __c84, 1)),
        }),
      ).annotate({ identifier: "ListTLSInspectionConfigurationsResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          FirewallArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListVpcEndpointAssociationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ VpcEndpointAssociationArn: S.optional(S.String) }),
      ).annotate({ identifier: "VpcEndpointAssociationMetadata" });
    case 2:
      return S.Array(__S(1473, __c92, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          VpcEndpointAssociations: S.optional(__S(1474, __c92, 2)),
        }),
      ).annotate({ identifier: "ListVpcEndpointAssociationsResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Policy: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TransitGatewayAttachmentId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RejectNetworkFirewallTransitGatewayAttachmentRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallName: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          AnalysisType: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartAnalysisReportRequest" });
    case 1:
      return S.suspend(() => S.Struct({ AnalysisReportId: S.String })).annotate({
        identifier: "StartAnalysisReportResponse",
      });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.String,
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          VpcEndpointAssociationArn: S.optional(S.String),
          VpcEndpointId: S.optional(S.String),
          MinimumFlowAgeInSeconds: S.optional(S.Number),
          FlowFilters: __S(1089, __c68, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartFlowCaptureRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FlowOperationId: S.optional(S.String),
          FlowOperationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartFlowCaptureResponse" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.String,
          AvailabilityZone: S.optional(S.String),
          AvailabilityZoneId: S.optional(S.String),
          VpcEndpointAssociationArn: S.optional(S.String),
          VpcEndpointId: S.optional(S.String),
          MinimumFlowAgeInSeconds: S.optional(S.Number),
          FlowFilters: __S(1089, __c68, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartFlowFlushRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(209, __c13, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(112, __c7, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          AvailabilityZoneChangeProtection: S.Boolean,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAvailabilityZoneChangeProtectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          AvailabilityZoneChangeProtection: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpdateAvailabilityZoneChangeProtectionResponse" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContainerAssociationName: S.optional(S.String),
          ContainerAssociationArn: S.optional(S.String),
          Description: S.optional(S.String),
          Type: S.String,
          ContainerMonitoringConfigurations: __S(225, __c14, 1),
          Tags: S.optional(__S(209, __c13, 1)),
          UpdateToken: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateContainerAssociationRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnabledAnalysisTypes: S.optional(__S(288, __c18, 0)),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          UpdateToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFirewallAnalysisSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EnabledAnalysisTypes: S.optional(__S(288, __c18, 0)),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateFirewallAnalysisSettingsResponse" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          DeleteProtection: S.Boolean,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFirewallDeleteProtectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          DeleteProtection: S.optional(S.Boolean),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateFirewallDeleteProtectionResponse" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          Description: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFirewallDescriptionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          Description: S.optional(S.String),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateFirewallDescriptionResponse" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFirewallEncryptionConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          UpdateToken: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
        }),
      ).annotate({ identifier: "UpdateFirewallEncryptionConfigurationResponse" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.String,
          FirewallPolicyArn: S.optional(S.String),
          FirewallPolicyName: S.optional(S.String),
          FirewallPolicy: __S(517, __c32, 5),
          Description: S.optional(S.String),
          DryRun: S.optional(S.Boolean),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFirewallPolicyRequest" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          FirewallPolicyChangeProtection: S.Boolean,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFirewallPolicyChangeProtectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          FirewallPolicyChangeProtection: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpdateFirewallPolicyChangeProtectionResponse" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.String,
          FirewallPolicyV2Arn: S.optional(S.String),
          FirewallPolicyV2Name: S.optional(S.String),
          FirewallPolicyV2: __S(597, __c37, 5),
          Description: S.optional(S.String),
          DryRun: S.optional(S.Boolean),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFirewallPolicyV2Request" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          LoggingConfiguration: S.optional(__S(1123, __c70, 3)),
          EnableMonitoringDashboard: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLoggingConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          LoggingConfiguration: S.optional(__S(1123, __c70, 3)),
          EnableMonitoringDashboard: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpdateLoggingConfigurationResponse" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          UpdateToken: S.optional(S.String),
          ProxySettings: S.optional(__S(368, __c23, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProxySettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          UpdateToken: S.optional(S.String),
          ProxySettings: S.optional(__S(368, __c23, 0)),
        }),
      ).annotate({ identifier: "UpdateProxySettingsResponse" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.String,
          RuleGroupArn: S.optional(S.String),
          RuleGroupName: S.optional(S.String),
          RuleGroup: S.optional(__S(699, __c43, 11)),
          FirewallRuleGroup: S.optional(__S(573, __c35, 13)),
          IpsRuleGroup: S.optional(__S(575, __c35, 15)),
          Rules: S.optional(S.String),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
          DryRun: S.optional(S.Boolean),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
          SourceMetadata: S.optional(__S(656, __c41, 0)),
          AnalyzeRuleGroup: S.optional(S.Boolean),
          SummaryConfiguration: S.optional(__S(657, __c41, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateRuleGroupRequest" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          SubnetChangeProtection: S.Boolean,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSubnetChangeProtectionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          SubnetChangeProtection: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpdateSubnetChangeProtectionResponse" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TLSInspectionConfigurationArn: S.optional(S.String),
          TLSInspectionConfigurationName: S.optional(S.String),
          TLSInspectionConfiguration: __S(760, __c47, 8),
          Description: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(272, __c17, 0)),
          UpdateToken: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateTLSInspectionConfigurationRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
