import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
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
  }) {}
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
  }) {}
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
export interface AssociateSubnetsRequest {
  UpdateToken?: string | undefined;
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  SubnetMappings: SubnetMapping[];
}
export interface AssociateSubnetsResponse {
  FirewallArn?: string | undefined;
  FirewallName?: string | undefined;
  SubnetMappings?: SubnetMapping[] | undefined;
  UpdateToken?: string | undefined;
}
export type InsertPosition = number;
export interface ProxyRuleGroupAttachment {
  ProxyRuleGroupName?: string | undefined;
  InsertPosition?: number | undefined;
}
export type ProxyRuleGroupAttachmentList = ProxyRuleGroupAttachment[];
export interface AttachRuleGroupsToProxyConfigurationRequest {
  ProxyConfigurationName?: string | undefined;
  ProxyConfigurationArn?: string | undefined;
  RuleGroups: ProxyRuleGroupAttachment[];
  UpdateToken: string;
}
export type Description = string;
export type CreateTime = Date;
export type DeleteTime = Date;
export type ProxyConfigRuleGroupType = string;
export type ProxyConfigRuleGroupPriority = number;
export interface ProxyConfigRuleGroup {
  ProxyRuleGroupName?: string | undefined;
  ProxyRuleGroupArn?: string | undefined;
  Type?: string | undefined;
  Priority?: number | undefined;
}
export type ProxyConfigRuleGroupSet = ProxyConfigRuleGroup[];
export type ProxyRulePhaseAction = "ALLOW" | "DENY" | "ALERT" | (string & {});
export interface ProxyConfigDefaultRulePhaseActionsRequest {
  PreDNS?: ProxyRulePhaseAction | undefined;
  PreREQUEST?: ProxyRulePhaseAction | undefined;
  PostRESPONSE?: ProxyRulePhaseAction | undefined;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface ProxyConfiguration {
  ProxyConfigurationName?: string | undefined;
  ProxyConfigurationArn?: string | undefined;
  Description?: string | undefined;
  CreateTime?: Date | undefined;
  DeleteTime?: Date | undefined;
  RuleGroups?: ProxyConfigRuleGroup[] | undefined;
  DefaultRulePhaseActions?: ProxyConfigDefaultRulePhaseActionsRequest | undefined;
  Tags?: Tag[] | undefined;
}
export interface AttachRuleGroupsToProxyConfigurationResponse {
  ProxyConfiguration?: ProxyConfiguration | undefined;
  UpdateToken?: string | undefined;
}
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
export type NatGatewayId = string;
export interface NatGatewayMapping {
  NatGatewayId: string;
}
export type NatGatewayMappingsList = NatGatewayMapping[];
export type NatGatewayPort = number;
export type ListenerPropertyType = "HTTP" | "HTTPS" | (string & {});
export interface ListenerProperty {
  Port?: number | undefined;
  Type?: ListenerPropertyType | undefined;
}
export type ListenerProperties = ListenerProperty[];
export interface ProxySettings {
  ListenerProperties: ListenerProperty[];
}
export interface VpcEndpoint {
  VpcId: string;
  SubnetMappings: SubnetMapping[];
}
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
  NatGatewayMappings?: NatGatewayMapping[] | undefined;
  ProxySettings?: ProxySettings | undefined;
  NoSourcePreservation?: boolean | undefined;
  VpcEndpoint?: VpcEndpoint | undefined;
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
  NatGatewayMappings?: NatGatewayMapping[] | undefined;
  ProxySettings?: ProxySettings | undefined;
  NoSourcePreservation?: boolean | undefined;
  VpcEndpoint?: VpcEndpoint | undefined;
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
}
export interface CreateFirewallPolicyRequest {
  FirewallPolicyName: string;
  FirewallPolicy: FirewallPolicy;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
  DryRun?: boolean | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
}
export type ResourceStatus = "ACTIVE" | "DELETING" | "ERROR" | (string & {});
export type RuleCapacity = number;
export type LastUpdateTime = Date;
export interface FirewallPolicyResponse {
  FirewallPolicyName: string;
  FirewallPolicyArn: string;
  FirewallPolicyId: string;
  Description?: string | undefined;
  FirewallPolicyStatus?: ResourceStatus | undefined;
  Tags?: Tag[] | undefined;
  ConsumedStatelessRuleCapacity?: number | undefined;
  ConsumedStatefulRuleCapacity?: number | undefined;
  ConsumedStatefulDomainCapacity?: number | undefined;
  NumberOfAssociations?: number | undefined;
  EncryptionConfiguration?: EncryptionConfiguration | undefined;
  LastModifiedTime?: Date | undefined;
}
export interface CreateFirewallPolicyResponse {
  UpdateToken: string;
  FirewallPolicyResponse: FirewallPolicyResponse;
}
export interface ListenerPropertyRequest {
  Port: number;
  Type: ListenerPropertyType;
}
export type ListenerPropertiesRequest = ListenerPropertyRequest[];
export type TlsInterceptMode = "ENABLED" | "DISABLED" | (string & {});
export interface TlsInterceptPropertiesRequest {
  PcaArn?: string | undefined;
  TlsInterceptMode?: TlsInterceptMode | undefined;
}
export interface CreateProxyRequest {
  ProxyName: string;
  NatGatewayId: string;
  ProxyConfigurationName?: string | undefined;
  ProxyConfigurationArn?: string | undefined;
  ListenerProperties?: ListenerPropertyRequest[] | undefined;
  TlsInterceptProperties: TlsInterceptPropertiesRequest;
  Tags?: Tag[] | undefined;
}
export type UpdateTime = Date;
export type FailureCode = string;
export type FailureMessage = string;
export type ProxyState =
  | "ATTACHING"
  | "ATTACHED"
  | "DETACHING"
  | "DETACHED"
  | "ATTACH_FAILED"
  | "DETACH_FAILED"
  | (string & {});
export type ProxyModifyState = "MODIFYING" | "COMPLETED" | "FAILED" | (string & {});
export interface TlsInterceptProperties {
  PcaArn?: string | undefined;
  TlsInterceptMode?: TlsInterceptMode | undefined;
}
export interface Proxy {
  CreateTime?: Date | undefined;
  DeleteTime?: Date | undefined;
  UpdateTime?: Date | undefined;
  FailureCode?: string | undefined;
  FailureMessage?: string | undefined;
  ProxyState?: ProxyState | undefined;
  ProxyModifyState?: ProxyModifyState | undefined;
  NatGatewayId?: string | undefined;
  ProxyConfigurationName?: string | undefined;
  ProxyConfigurationArn?: string | undefined;
  ProxyName?: string | undefined;
  ProxyArn?: string | undefined;
  ListenerProperties?: ListenerProperty[] | undefined;
  TlsInterceptProperties?: TlsInterceptProperties | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateProxyResponse {
  Proxy?: Proxy | undefined;
  UpdateToken?: string | undefined;
}
export type ResourceNameList = string[];
export type ResourceArnList = string[];
export interface CreateProxyConfigurationRequest {
  ProxyConfigurationName: string;
  Description?: string | undefined;
  RuleGroupNames?: string[] | undefined;
  RuleGroupArns?: string[] | undefined;
  DefaultRulePhaseActions: ProxyConfigDefaultRulePhaseActionsRequest;
  Tags?: Tag[] | undefined;
}
export interface CreateProxyConfigurationResponse {
  ProxyConfiguration?: ProxyConfiguration | undefined;
  UpdateToken?: string | undefined;
}
export type ConditionOperator = string;
export type ConditionKey = string;
export type ProxyConditionValue = string;
export type ProxyConditionValueList = string[];
export interface ProxyRuleCondition {
  ConditionOperator?: string | undefined;
  ConditionKey?: string | undefined;
  ConditionValues?: string[] | undefined;
}
export type ProxyRuleConditionList = ProxyRuleCondition[];
export interface ProxyRule {
  ProxyRuleName?: string | undefined;
  Description?: string | undefined;
  Action?: ProxyRulePhaseAction | undefined;
  Conditions?: ProxyRuleCondition[] | undefined;
}
export type ProxyRuleList = ProxyRule[];
export interface ProxyRulesByRequestPhase {
  PreDNS?: ProxyRule[] | undefined;
  PreREQUEST?: ProxyRule[] | undefined;
  PostRESPONSE?: ProxyRule[] | undefined;
}
export interface CreateProxyRuleGroupRequest {
  ProxyRuleGroupName: string;
  Description?: string | undefined;
  Rules?: ProxyRulesByRequestPhase | undefined;
  Tags?: Tag[] | undefined;
}
export interface ProxyRuleGroup {
  ProxyRuleGroupName?: string | undefined;
  ProxyRuleGroupArn?: string | undefined;
  CreateTime?: Date | undefined;
  DeleteTime?: Date | undefined;
  Rules?: ProxyRulesByRequestPhase | undefined;
  Description?: string | undefined;
  Tags?: Tag[] | undefined;
}
export interface CreateProxyRuleGroupResponse {
  ProxyRuleGroup?: ProxyRuleGroup | undefined;
  UpdateToken?: string | undefined;
}
export interface CreateProxyRule {
  ProxyRuleName?: string | undefined;
  Description?: string | undefined;
  Action?: ProxyRulePhaseAction | undefined;
  Conditions?: ProxyRuleCondition[] | undefined;
  InsertPosition?: number | undefined;
}
export type CreateProxyRuleList = CreateProxyRule[];
export interface CreateProxyRulesByRequestPhase {
  PreDNS?: CreateProxyRule[] | undefined;
  PreREQUEST?: CreateProxyRule[] | undefined;
  PostRESPONSE?: CreateProxyRule[] | undefined;
}
export interface CreateProxyRulesRequest {
  ProxyRuleGroupArn?: string | undefined;
  ProxyRuleGroupName?: string | undefined;
  Rules: CreateProxyRulesByRequestPhase;
}
export interface CreateProxyRulesResponse {
  ProxyRuleGroup?: ProxyRuleGroup | undefined;
  UpdateToken?: string | undefined;
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
export type RulesString = string;
export type RuleTargets = string[];
export type TargetType = "TLS_SNI" | "HTTP_HOST" | (string & {});
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
export type Source = string;
export type Port = string;
export type StatefulRuleDirection = "FORWARD" | "ANY" | (string & {});
export type Destination = string;
export interface Header {
  Protocol: StatefulRuleProtocol;
  Source: string;
  SourcePort: string;
  Direction: StatefulRuleDirection;
  Destination: string;
  DestinationPort: string;
}
export type Keyword = string;
export type Setting = string;
export type Settings = string[];
export interface RuleOption {
  Keyword: string;
  Settings?: string[] | undefined;
}
export type RuleOptions = RuleOption[];
export interface StatefulRule {
  Action: StatefulAction;
  Header: Header;
  RuleOptions: RuleOption[];
}
export type StatefulRules = StatefulRule[];
export type AddressDefinition = string;
export interface Address {
  AddressDefinition: string;
}
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
export type RuleGroupType = "STATELESS" | "STATEFUL" | "STATEFUL_DOMAIN" | (string & {});
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
export interface ServerCertificateScope {
  Sources?: Address[] | undefined;
  Destinations?: Address[] | undefined;
  SourcePorts?: PortRange[] | undefined;
  DestinationPorts?: PortRange[] | undefined;
  Protocols?: number[] | undefined;
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
export interface DeleteProxyConfigurationRequest {
  ProxyConfigurationName?: string | undefined;
  ProxyConfigurationArn?: string | undefined;
}
export interface DeleteProxyConfigurationResponse {
  ProxyConfigurationName?: string | undefined;
  ProxyConfigurationArn?: string | undefined;
}
export interface DeleteProxyRuleGroupRequest {
  ProxyRuleGroupName?: string | undefined;
  ProxyRuleGroupArn?: string | undefined;
}
export interface DeleteProxyRuleGroupResponse {
  ProxyRuleGroupName?: string | undefined;
  ProxyRuleGroupArn?: string | undefined;
}
export interface DeleteProxyRulesRequest {
  ProxyRuleGroupArn?: string | undefined;
  ProxyRuleGroupName?: string | undefined;
  Rules: string[];
}
export interface DeleteProxyRulesResponse {
  ProxyRuleGroup?: ProxyRuleGroup | undefined;
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
export type VpcEndpointId = string;
export type FlowOperationId = string;
export interface DescribeFlowOperationRequest {
  FirewallArn: string;
  AvailabilityZone?: string | undefined;
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
export type VpcEndpointServiceName = string;
export type PrivateDNSName = string;
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
export interface DescribeProxyConfigurationRequest {
  ProxyConfigurationName?: string | undefined;
  ProxyConfigurationArn?: string | undefined;
}
export interface DescribeProxyConfigurationResponse {
  ProxyConfiguration?: ProxyConfiguration | undefined;
  UpdateToken?: string | undefined;
}
export interface DescribeProxyRuleRequest {
  ProxyRuleName: string;
  ProxyRuleGroupName?: string | undefined;
  ProxyRuleGroupArn?: string | undefined;
}
export interface DescribeProxyRuleResponse {
  ProxyRule?: ProxyRule | undefined;
  UpdateToken?: string | undefined;
}
export interface DescribeProxyRuleGroupRequest {
  ProxyRuleGroupName?: string | undefined;
  ProxyRuleGroupArn?: string | undefined;
}
export interface DescribeProxyRuleGroupResponse {
  ProxyRuleGroup?: ProxyRuleGroup | undefined;
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
}
export interface DescribeRuleGroupResponse {
  UpdateToken: string;
  RuleGroup?: RuleGroup | undefined;
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
export interface DetachRuleGroupsFromProxyConfigurationRequest {
  ProxyConfigurationName?: string | undefined;
  ProxyConfigurationArn?: string | undefined;
  RuleGroupNames?: string[] | undefined;
  RuleGroupArns?: string[] | undefined;
  UpdateToken: string;
}
export interface DetachRuleGroupsFromProxyConfigurationResponse {
  ProxyConfiguration?: ProxyConfiguration | undefined;
  UpdateToken?: string | undefined;
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
export interface ListProxiesRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface ProxyMetadata {
  Name?: string | undefined;
  Arn?: string | undefined;
}
export type Proxies = ProxyMetadata[];
export interface ListProxiesResponse {
  Proxies?: ProxyMetadata[] | undefined;
  NextToken?: string | undefined;
}
export interface ListProxyConfigurationsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface ProxyConfigurationMetadata {
  Name?: string | undefined;
  Arn?: string | undefined;
}
export type ProxyConfigurations = ProxyConfigurationMetadata[];
export interface ListProxyConfigurationsResponse {
  ProxyConfigurations?: ProxyConfigurationMetadata[] | undefined;
  NextToken?: string | undefined;
}
export interface ListProxyRuleGroupsRequest {
  NextToken?: string | undefined;
  MaxResults?: number | undefined;
}
export interface ProxyRuleGroupMetadata {
  Name?: string | undefined;
  Arn?: string | undefined;
}
export type ProxyRuleGroups = ProxyRuleGroupMetadata[];
export interface ListProxyRuleGroupsResponse {
  ProxyRuleGroups?: ProxyRuleGroupMetadata[] | undefined;
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
export interface UpdateProxyRequest {
  NatGatewayId: string;
  ProxyName?: string | undefined;
  ProxyArn?: string | undefined;
  ListenerPropertiesToAdd?: ListenerPropertyRequest[] | undefined;
  ListenerPropertiesToRemove?: ListenerPropertyRequest[] | undefined;
  TlsInterceptProperties?: TlsInterceptPropertiesRequest | undefined;
  UpdateToken: string;
}
export interface UpdateProxyResponse {
  Proxy?: Proxy | undefined;
  UpdateToken?: string | undefined;
}
export interface UpdateProxyConfigurationRequest {
  ProxyConfigurationName?: string | undefined;
  ProxyConfigurationArn?: string | undefined;
  DefaultRulePhaseActions: ProxyConfigDefaultRulePhaseActionsRequest;
  UpdateToken: string;
}
export interface UpdateProxyConfigurationResponse {
  ProxyConfiguration?: ProxyConfiguration | undefined;
  UpdateToken?: string | undefined;
}
export interface UpdateProxyRuleRequest {
  ProxyRuleGroupName?: string | undefined;
  ProxyRuleGroupArn?: string | undefined;
  ProxyRuleName: string;
  Description?: string | undefined;
  Action?: ProxyRulePhaseAction | undefined;
  AddConditions?: ProxyRuleCondition[] | undefined;
  RemoveConditions?: ProxyRuleCondition[] | undefined;
  UpdateToken: string;
}
export interface UpdateProxyRuleResponse {
  ProxyRule?: ProxyRule | undefined;
  RemovedConditions?: ProxyRuleCondition[] | undefined;
  UpdateToken?: string | undefined;
}
export interface ProxyRuleGroupPriority {
  ProxyRuleGroupName?: string | undefined;
  NewPosition?: number | undefined;
}
export type ProxyRuleGroupPriorityList = ProxyRuleGroupPriority[];
export interface UpdateProxyRuleGroupPrioritiesRequest {
  ProxyConfigurationName?: string | undefined;
  ProxyConfigurationArn?: string | undefined;
  RuleGroups: ProxyRuleGroupPriority[];
  UpdateToken: string;
}
export type ProxyRuleGroupPriorityResultPriority = number;
export interface ProxyRuleGroupPriorityResult {
  ProxyRuleGroupName?: string | undefined;
  Priority?: number | undefined;
}
export type ProxyRuleGroupPriorityResultList = ProxyRuleGroupPriorityResult[];
export interface UpdateProxyRuleGroupPrioritiesResponse {
  ProxyRuleGroups?: ProxyRuleGroupPriorityResult[] | undefined;
  UpdateToken?: string | undefined;
}
export type RuleGroupRequestPhase = "PRE_DNS" | "PRE_REQ" | "POST_RES" | (string & {});
export interface ProxyRulePriority {
  ProxyRuleName?: string | undefined;
  NewPosition?: number | undefined;
}
export type ProxyRulePriorityList = ProxyRulePriority[];
export interface UpdateProxyRulePrioritiesRequest {
  ProxyRuleGroupName?: string | undefined;
  ProxyRuleGroupArn?: string | undefined;
  RuleGroupRequestPhase: RuleGroupRequestPhase;
  Rules: ProxyRulePriority[];
  UpdateToken: string;
}
export interface UpdateProxyRulePrioritiesResponse {
  ProxyRuleGroupName?: string | undefined;
  ProxyRuleGroupArn?: string | undefined;
  RuleGroupRequestPhase?: RuleGroupRequestPhase | undefined;
  Rules?: ProxyRulePriority[] | undefined;
  UpdateToken?: string | undefined;
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
    32,
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
  input: __S(64, __c2, 0) as any as S.Schema<AssociateAvailabilityZonesRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<AssociateAvailabilityZonesResponse>,
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
  input: __S(160, __c5, 0) as any as S.Schema<AssociateFirewallPolicyRequest>,
  output: __S(161, __c5, 1) as any as S.Schema<AssociateFirewallPolicyResponse>,
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
 */
export const associateSubnets: API.OperationMethod<
  AssociateSubnetsRequest & RegionInput,
  AssociateSubnetsResponse,
  AssociateSubnetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<AssociateSubnetsRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<AssociateSubnetsResponse>,
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

export type AttachRuleGroupsToProxyConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Attaches ProxyRuleGroup resources to a ProxyConfiguration
 *
 * A Proxy Configuration defines the monitoring and protection behavior for a Proxy. The details of the behavior are defined in the rule groups that you add to your configuration.
 */
export const attachRuleGroupsToProxyConfiguration: API.OperationMethod<
  AttachRuleGroupsToProxyConfigurationRequest & RegionInput,
  AttachRuleGroupsToProxyConfigurationResponse,
  AttachRuleGroupsToProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(322, __c10, 2) as any as S.Schema<AttachRuleGroupsToProxyConfigurationRequest>,
  output: __S(388, __c12, 4) as any as S.Schema<AttachRuleGroupsToProxyConfigurationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachRuleGroupsToProxyConfiguration",
  telemetry: TELEMETRY,
  span: "AttachRuleGroupsToProxyConfiguration",
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
  input: __S(416, __c13, 0) as any as S.Schema<CreateContainerAssociationRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<CreateContainerAssociationResponse>,
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
 */
export const createFirewall: API.OperationMethod<
  CreateFirewallRequest & RegionInput,
  CreateFirewallResponse,
  CreateFirewallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<CreateFirewallRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<CreateFirewallResponse>,
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
  input: __S(768, __c24, 0) as any as S.Schema<CreateFirewallPolicyRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<CreateFirewallPolicyResponse>,
  errors: [
    InsufficientCapacityException,
    InternalServerError,
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

export type CreateProxyError =
  | InternalServerError
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Creates an Network Firewall Proxy
 *
 * Attaches a Proxy configuration to a NAT Gateway.
 *
 * To manage a proxy's tags, use the standard Amazon Web Services resource tagging operations, ListTagsForResource, TagResource, and UntagResource.
 *
 * To retrieve information about proxies, use ListProxies and DescribeProxy.
 */
export const createProxy: API.OperationMethod<
  CreateProxyRequest & RegionInput,
  CreateProxyResponse,
  CreateProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<CreateProxyRequest>,
  output: __S(1027, __c32, 3) as any as S.Schema<CreateProxyResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProxy",
  telemetry: TELEMETRY,
  span: "CreateProxy",
}));

export type CreateProxyConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an Network Firewall ProxyConfiguration
 *
 * A Proxy Configuration defines the monitoring and protection behavior for a Proxy. The details of the behavior are defined in the rule groups that you add to your configuration.
 *
 * To manage a proxy configuration's tags, use the standard Amazon Web Services resource tagging operations, ListTagsForResource, TagResource, and UntagResource.
 *
 * To retrieve information about proxies, use ListProxyConfigurations and DescribeProxyConfiguration.
 */
export const createProxyConfiguration: API.OperationMethod<
  CreateProxyConfigurationRequest & RegionInput,
  CreateProxyConfigurationResponse,
  CreateProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<CreateProxyConfigurationRequest>,
  output: __S(388, __c12, 4) as any as S.Schema<CreateProxyConfigurationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProxyConfiguration",
  telemetry: TELEMETRY,
  span: "CreateProxyConfiguration",
}));

export type CreateProxyRuleGroupError =
  | InternalServerError
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates an Network Firewall ProxyRuleGroup
 *
 * Collections of related proxy filtering rules. Rule groups help you manage and reuse sets of rules across multiple proxy configurations.
 *
 * To manage a proxy rule group's tags, use the standard Amazon Web Services resource tagging operations, ListTagsForResource, TagResource, and UntagResource.
 *
 * To retrieve information about proxy rule groups, use ListProxyRuleGroups and DescribeProxyRuleGroup.
 *
 * To retrieve information about individual proxy rules, use DescribeProxyRuleGroup and DescribeProxyRule.
 */
export const createProxyRuleGroup: API.OperationMethod<
  CreateProxyRuleGroupRequest & RegionInput,
  CreateProxyRuleGroupResponse,
  CreateProxyRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<CreateProxyRuleGroupRequest>,
  output: __S(1184, __c37, 0) as any as S.Schema<CreateProxyRuleGroupResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProxyRuleGroup",
  telemetry: TELEMETRY,
  span: "CreateProxyRuleGroup",
}));

export type CreateProxyRulesError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates Network Firewall ProxyRule resources.
 *
 * Attaches new proxy rule(s) to an existing proxy rule group.
 *
 * To retrieve information about individual proxy rules, use DescribeProxyRuleGroup and DescribeProxyRule.
 */
export const createProxyRules: API.OperationMethod<
  CreateProxyRulesRequest & RegionInput,
  CreateProxyRulesResponse,
  CreateProxyRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1219, __c38, 3) as any as S.Schema<CreateProxyRulesRequest>,
  output: __S(1184, __c37, 0) as any as S.Schema<CreateProxyRulesResponse>,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProxyRules",
  telemetry: TELEMETRY,
  span: "CreateProxyRules",
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
  input: __S(1248, __c39, 0) as any as S.Schema<CreateRuleGroupRequest>,
  output: __S(1440, __c45, 0) as any as S.Schema<CreateRuleGroupResponse>,
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
  input: __S(1472, __c46, 0) as any as S.Schema<CreateTLSInspectionConfigurationRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<CreateTLSInspectionConfigurationResponse>,
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
  input: __S(1600, __c50, 0) as any as S.Schema<CreateVpcEndpointAssociationRequest>,
  output: __S(1636, __c51, 4) as any as S.Schema<CreateVpcEndpointAssociationResponse>,
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
  input: __S(1664, __c52, 0) as any as S.Schema<DeleteContainerAssociationRequest>,
  output: __S(1665, __c52, 1) as any as S.Schema<DeleteContainerAssociationResponse>,
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
 */
export const deleteFirewall: API.OperationMethod<
  DeleteFirewallRequest & RegionInput,
  DeleteFirewallResponse,
  DeleteFirewallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<DeleteFirewallRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<DeleteFirewallResponse>,
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
  input: __S(1728, __c54, 0) as any as S.Schema<DeleteFirewallPolicyRequest>,
  output: __S(1729, __c54, 1) as any as S.Schema<DeleteFirewallPolicyResponse>,
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
    1760,
    __c55,
    0,
  ) as any as S.Schema<DeleteNetworkFirewallTransitGatewayAttachmentRequest>,
  output: __S(
    32,
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
 * Deletes the specified Proxy.
 *
 * Detaches a Proxy configuration from a NAT Gateway.
 */
export const deleteProxy: API.OperationMethod<
  DeleteProxyRequest & RegionInput,
  DeleteProxyResponse,
  DeleteProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<DeleteProxyRequest>,
  output: __S(1793, __c56, 1) as any as S.Schema<DeleteProxyResponse>,
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

export type DeleteProxyConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified ProxyConfiguration.
 */
export const deleteProxyConfiguration: API.OperationMethod<
  DeleteProxyConfigurationRequest & RegionInput,
  DeleteProxyConfigurationResponse,
  DeleteProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1824, __c57, 0) as any as S.Schema<DeleteProxyConfigurationRequest>,
  output: __S(1825, __c57, 1) as any as S.Schema<DeleteProxyConfigurationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProxyConfiguration",
  telemetry: TELEMETRY,
  span: "DeleteProxyConfiguration",
}));

export type DeleteProxyRuleGroupError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified ProxyRuleGroup.
 */
export const deleteProxyRuleGroup: API.OperationMethod<
  DeleteProxyRuleGroupRequest & RegionInput,
  DeleteProxyRuleGroupResponse,
  DeleteProxyRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<DeleteProxyRuleGroupRequest>,
  output: __S(1857, __c58, 1) as any as S.Schema<DeleteProxyRuleGroupResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProxyRuleGroup",
  telemetry: TELEMETRY,
  span: "DeleteProxyRuleGroup",
}));

export type DeleteProxyRulesError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified ProxyRule(s). currently attached to a ProxyRuleGroup
 */
export const deleteProxyRules: API.OperationMethod<
  DeleteProxyRulesRequest & RegionInput,
  DeleteProxyRulesResponse,
  DeleteProxyRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<DeleteProxyRulesRequest>,
  output: __S(1889, __c59, 1) as any as S.Schema<DeleteProxyRulesResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProxyRules",
  telemetry: TELEMETRY,
  span: "DeleteProxyRules",
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
  input: __S(1920, __c60, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(1952, __c61, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
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
  input: __S(1984, __c62, 0) as any as S.Schema<DeleteRuleGroupRequest>,
  output: __S(1985, __c62, 1) as any as S.Schema<DeleteRuleGroupResponse>,
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
  input: __S(2016, __c63, 0) as any as S.Schema<DeleteTLSInspectionConfigurationRequest>,
  output: __S(2017, __c63, 1) as any as S.Schema<DeleteTLSInspectionConfigurationResponse>,
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
  input: __S(2048, __c64, 0) as any as S.Schema<DeleteVpcEndpointAssociationRequest>,
  output: __S(1636, __c51, 4) as any as S.Schema<DeleteVpcEndpointAssociationResponse>,
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
  input: __S(2080, __c65, 0) as any as S.Schema<DescribeContainerAssociationRequest>,
  output: __S(2081, __c65, 1) as any as S.Schema<DescribeContainerAssociationResponse>,
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
  input: __S(2112, __c66, 0) as any as S.Schema<DescribeFirewallRequest>,
  output: __S(2113, __c66, 1) as any as S.Schema<DescribeFirewallResponse>,
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
  input: __S(2144, __c67, 0) as any as S.Schema<DescribeFirewallMetadataRequest>,
  output: __S(2147, __c67, 3) as any as S.Schema<DescribeFirewallMetadataResponse>,
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
  input: __S(2176, __c68, 0) as any as S.Schema<DescribeFirewallPolicyRequest>,
  output: __S(2177, __c68, 1) as any as S.Schema<DescribeFirewallPolicyResponse>,
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
  input: __S(2208, __c69, 0) as any as S.Schema<DescribeFlowOperationRequest>,
  output: __S(2210, __c69, 2) as any as S.Schema<DescribeFlowOperationResponse>,
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
  input: __S(2272, __c71, 0) as any as S.Schema<DescribeLoggingConfigurationRequest>,
  output: __S(2273, __c71, 1) as any as S.Schema<DescribeLoggingConfigurationResponse>,
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
  input: __S(2336, __c73, 0) as any as S.Schema<DescribeProxyRequest>,
  output: __S(2338, __c73, 2) as any as S.Schema<DescribeProxyResponse>,
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

export type DescribeProxyConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified proxy configuration.
 */
export const describeProxyConfiguration: API.OperationMethod<
  DescribeProxyConfigurationRequest & RegionInput,
  DescribeProxyConfigurationResponse,
  DescribeProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2368, __c74, 0) as any as S.Schema<DescribeProxyConfigurationRequest>,
  output: __S(388, __c12, 4) as any as S.Schema<DescribeProxyConfigurationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProxyConfiguration",
  telemetry: TELEMETRY,
  span: "DescribeProxyConfiguration",
}));

export type DescribeProxyRuleError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified proxy configuration for the specified proxy rule group.
 */
export const describeProxyRule: API.OperationMethod<
  DescribeProxyRuleRequest & RegionInput,
  DescribeProxyRuleResponse,
  DescribeProxyRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2400, __c75, 0) as any as S.Schema<DescribeProxyRuleRequest>,
  output: __S(2401, __c75, 1) as any as S.Schema<DescribeProxyRuleResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProxyRule",
  telemetry: TELEMETRY,
  span: "DescribeProxyRule",
}));

export type DescribeProxyRuleGroupError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Returns the data objects for the specified proxy rule group.
 */
export const describeProxyRuleGroup: API.OperationMethod<
  DescribeProxyRuleGroupRequest & RegionInput,
  DescribeProxyRuleGroupResponse,
  DescribeProxyRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2432, __c76, 0) as any as S.Schema<DescribeProxyRuleGroupRequest>,
  output: __S(1184, __c37, 0) as any as S.Schema<DescribeProxyRuleGroupResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProxyRuleGroup",
  telemetry: TELEMETRY,
  span: "DescribeProxyRuleGroup",
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
  input: __S(2464, __c77, 0) as any as S.Schema<DescribeResourcePolicyRequest>,
  output: __S(2465, __c77, 1) as any as S.Schema<DescribeResourcePolicyResponse>,
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
  input: __S(2496, __c78, 0) as any as S.Schema<DescribeRuleGroupRequest>,
  output: __S(2497, __c78, 1) as any as S.Schema<DescribeRuleGroupResponse>,
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
  input: __S(2528, __c79, 0) as any as S.Schema<DescribeRuleGroupMetadataRequest>,
  output: __S(2529, __c79, 1) as any as S.Schema<DescribeRuleGroupMetadataResponse>,
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
  input: __S(2560, __c80, 0) as any as S.Schema<DescribeRuleGroupSummaryRequest>,
  output: __S(2564, __c80, 4) as any as S.Schema<DescribeRuleGroupSummaryResponse>,
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
  input: __S(2592, __c81, 0) as any as S.Schema<DescribeTLSInspectionConfigurationRequest>,
  output: __S(2593, __c81, 1) as any as S.Schema<DescribeTLSInspectionConfigurationResponse>,
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
  input: __S(2624, __c82, 0) as any as S.Schema<DescribeVpcEndpointAssociationRequest>,
  output: __S(1636, __c51, 4) as any as S.Schema<DescribeVpcEndpointAssociationResponse>,
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

export type DetachRuleGroupsFromProxyConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Detaches ProxyRuleGroup resources from a ProxyConfiguration
 *
 * A Proxy Configuration defines the monitoring and protection behavior for a Proxy. The details of the behavior are defined in the rule groups that you add to your configuration.
 */
export const detachRuleGroupsFromProxyConfiguration: API.OperationMethod<
  DetachRuleGroupsFromProxyConfigurationRequest & RegionInput,
  DetachRuleGroupsFromProxyConfigurationResponse,
  DetachRuleGroupsFromProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2656, __c83, 0) as any as S.Schema<DetachRuleGroupsFromProxyConfigurationRequest>,
  output: __S(388, __c12, 4) as any as S.Schema<DetachRuleGroupsFromProxyConfigurationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachRuleGroupsFromProxyConfiguration",
  telemetry: TELEMETRY,
  span: "DetachRuleGroupsFromProxyConfiguration",
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
  input: __S(2688, __c84, 0) as any as S.Schema<DisassociateAvailabilityZonesRequest>,
  output: __S(128, __c4, 0) as any as S.Schema<DisassociateAvailabilityZonesResponse>,
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
 */
export const disassociateSubnets: API.OperationMethod<
  DisassociateSubnetsRequest & RegionInput,
  DisassociateSubnetsResponse,
  DisassociateSubnetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<DisassociateSubnetsRequest>,
  output: __S(288, __c9, 0) as any as S.Schema<DisassociateSubnetsResponse>,
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
  input: __S(2752, __c86, 0) as any as S.Schema<GetAnalysisReportResultsRequest>,
  output: __S(2756, __c86, 4) as any as S.Schema<GetAnalysisReportResultsResponse>,
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
  input: __S(2784, __c87, 0) as any as S.Schema<ListAnalysisReportsRequest>,
  output: __S(2787, __c87, 3) as any as S.Schema<ListAnalysisReportsResponse>,
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
  input: __S(2816, __c88, 0) as any as S.Schema<ListContainerAssociationsRequest>,
  output: __S(2819, __c88, 3) as any as S.Schema<ListContainerAssociationsResponse>,
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
  input: __S(2848, __c89, 0) as any as S.Schema<ListFirewallPoliciesRequest>,
  output: __S(2849, __c89, 1) as any as S.Schema<ListFirewallPoliciesResponse>,
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
  input: __S(2912, __c91, 0) as any as S.Schema<ListFirewallsRequest>,
  output: __S(2915, __c91, 3) as any as S.Schema<ListFirewallsResponse>,
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
  input: __S(2944, __c92, 0) as any as S.Schema<ListFlowOperationResultsRequest>,
  output: __S(2947, __c92, 3) as any as S.Schema<ListFlowOperationResultsResponse>,
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
  input: __S(2976, __c93, 0) as any as S.Schema<ListFlowOperationsRequest>,
  output: __S(2979, __c93, 3) as any as S.Schema<ListFlowOperationsResponse>,
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

export type ListProxiesError =
  | InternalServerError
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the proxies that you have defined. Depending on
 * your setting for max results and the number of proxies, a single call might not
 * return the full list.
 */
export const listProxies: API.PaginatedOperationMethod<
  ListProxiesRequest & RegionInput,
  ListProxiesResponse,
  ListProxiesError,
  Credentials | HttpClient.HttpClient,
  ProxyMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<ListProxiesRequest>,
  output: __S(3009, __c94, 1) as any as S.Schema<ListProxiesResponse>,
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProxies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Proxies",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListProxies",
})) as any;

export type ListProxyConfigurationsError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the proxy configuration that you have defined. Depending on
 * your setting for max results and the number of proxy configurations, a single call might not
 * return the full list.
 */
export const listProxyConfigurations: API.PaginatedOperationMethod<
  ListProxyConfigurationsRequest & RegionInput,
  ListProxyConfigurationsResponse,
  ListProxyConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ProxyConfigurationMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3040, __c95, 0) as any as S.Schema<ListProxyConfigurationsRequest>,
  output: __S(3041, __c95, 1) as any as S.Schema<ListProxyConfigurationsResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProxyConfigurations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProxyConfigurations",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListProxyConfigurations",
})) as any;

export type ListProxyRuleGroupsError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the metadata for the proxy rule groups that you have defined. Depending on
 * your setting for max results and the number of proxy rule groups, a single call might not
 * return the full list.
 */
export const listProxyRuleGroups: API.PaginatedOperationMethod<
  ListProxyRuleGroupsRequest & RegionInput,
  ListProxyRuleGroupsResponse,
  ListProxyRuleGroupsError,
  Credentials | HttpClient.HttpClient,
  ProxyRuleGroupMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3072, __c96, 0) as any as S.Schema<ListProxyRuleGroupsRequest>,
  output: __S(3073, __c96, 1) as any as S.Schema<ListProxyRuleGroupsResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProxyRuleGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProxyRuleGroups",
    pageSize: "MaxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListProxyRuleGroups",
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
  input: __S(3104, __c97, 0) as any as S.Schema<ListRuleGroupsRequest>,
  output: __S(3107, __c97, 3) as any as S.Schema<ListRuleGroupsResponse>,
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
  input: __S(3136, __c98, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(3137, __c98, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
  input: __S(3168, __c99, 0) as any as S.Schema<ListTLSInspectionConfigurationsRequest>,
  output: __S(3169, __c99, 1) as any as S.Schema<ListTLSInspectionConfigurationsResponse>,
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
  input: __S(3200, __c100, 0) as any as S.Schema<ListVpcEndpointAssociationsRequest>,
  output: __S(3203, __c100, 3) as any as S.Schema<ListVpcEndpointAssociationsResponse>,
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
  input: __S(3232, __c101, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(1952, __c61, 0) as any as S.Schema<PutResourcePolicyResponse>,
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
    3264,
    __c102,
    0,
  ) as any as S.Schema<RejectNetworkFirewallTransitGatewayAttachmentRequest>,
  output: __S(
    32,
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
  input: __S(3296, __c103, 0) as any as S.Schema<StartAnalysisReportRequest>,
  output: __S(3297, __c103, 1) as any as S.Schema<StartAnalysisReportResponse>,
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
  input: __S(3328, __c104, 0) as any as S.Schema<StartFlowCaptureRequest>,
  output: __S(3360, __c105, 0) as any as S.Schema<StartFlowCaptureResponse>,
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
  input: __S(3392, __c106, 0) as any as S.Schema<StartFlowFlushRequest>,
  output: __S(3360, __c105, 0) as any as S.Schema<StartFlowFlushResponse>,
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
  input: __S(3424, __c107, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1952, __c61, 0) as any as S.Schema<TagResourceResponse>,
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
  input: __S(3456, __c108, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1952, __c61, 0) as any as S.Schema<UntagResourceResponse>,
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
  input: __S(3488, __c109, 0) as any as S.Schema<UpdateAvailabilityZoneChangeProtectionRequest>,
  output: __S(3489, __c109, 1) as any as S.Schema<UpdateAvailabilityZoneChangeProtectionResponse>,
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
  input: __S(3520, __c110, 0) as any as S.Schema<UpdateContainerAssociationRequest>,
  output: __S(480, __c15, 0) as any as S.Schema<UpdateContainerAssociationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    InvalidTokenException,
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
  input: __S(3552, __c111, 0) as any as S.Schema<UpdateFirewallAnalysisSettingsRequest>,
  output: __S(3553, __c111, 1) as any as S.Schema<UpdateFirewallAnalysisSettingsResponse>,
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
  input: __S(3584, __c112, 0) as any as S.Schema<UpdateFirewallDeleteProtectionRequest>,
  output: __S(3585, __c112, 1) as any as S.Schema<UpdateFirewallDeleteProtectionResponse>,
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
  input: __S(3616, __c113, 0) as any as S.Schema<UpdateFirewallDescriptionRequest>,
  output: __S(3617, __c113, 1) as any as S.Schema<UpdateFirewallDescriptionResponse>,
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
  input: __S(3648, __c114, 0) as any as S.Schema<UpdateFirewallEncryptionConfigurationRequest>,
  output: __S(3649, __c114, 1) as any as S.Schema<UpdateFirewallEncryptionConfigurationResponse>,
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
  input: __S(3680, __c115, 0) as any as S.Schema<UpdateFirewallPolicyRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<UpdateFirewallPolicyResponse>,
  errors: [
    InternalServerError,
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
  input: __S(3712, __c116, 0) as any as S.Schema<UpdateFirewallPolicyChangeProtectionRequest>,
  output: __S(3713, __c116, 1) as any as S.Schema<UpdateFirewallPolicyChangeProtectionResponse>,
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
  input: __S(3744, __c117, 0) as any as S.Schema<UpdateLoggingConfigurationRequest>,
  output: __S(3745, __c117, 1) as any as S.Schema<UpdateLoggingConfigurationResponse>,
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

export type UpdateProxyError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | UnsupportedOperationException
  | CommonErrors;
/**
 * Updates the properties of the specified proxy.
 */
export const updateProxy: API.OperationMethod<
  UpdateProxyRequest & RegionInput,
  UpdateProxyResponse,
  UpdateProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3776, __c118, 0) as any as S.Schema<UpdateProxyRequest>,
  output: __S(1027, __c32, 3) as any as S.Schema<UpdateProxyResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
    UnsupportedOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxy",
  telemetry: TELEMETRY,
  span: "UpdateProxy",
}));

export type UpdateProxyConfigurationError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the properties of the specified proxy configuration.
 */
export const updateProxyConfiguration: API.OperationMethod<
  UpdateProxyConfigurationRequest & RegionInput,
  UpdateProxyConfigurationResponse,
  UpdateProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3808, __c119, 0) as any as S.Schema<UpdateProxyConfigurationRequest>,
  output: __S(388, __c12, 4) as any as S.Schema<UpdateProxyConfigurationResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxyConfiguration",
  telemetry: TELEMETRY,
  span: "UpdateProxyConfiguration",
}));

export type UpdateProxyRuleError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the properties of the specified proxy rule.
 */
export const updateProxyRule: API.OperationMethod<
  UpdateProxyRuleRequest & RegionInput,
  UpdateProxyRuleResponse,
  UpdateProxyRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3840, __c120, 0) as any as S.Schema<UpdateProxyRuleRequest>,
  output: __S(3841, __c120, 1) as any as S.Schema<UpdateProxyRuleResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxyRule",
  telemetry: TELEMETRY,
  span: "UpdateProxyRule",
}));

export type UpdateProxyRuleGroupPrioritiesError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates proxy rule group priorities within a proxy configuration.
 */
export const updateProxyRuleGroupPriorities: API.OperationMethod<
  UpdateProxyRuleGroupPrioritiesRequest & RegionInput,
  UpdateProxyRuleGroupPrioritiesResponse,
  UpdateProxyRuleGroupPrioritiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3874, __c121, 2) as any as S.Schema<UpdateProxyRuleGroupPrioritiesRequest>,
  output: __S(3877, __c121, 5) as any as S.Schema<UpdateProxyRuleGroupPrioritiesResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxyRuleGroupPriorities",
  telemetry: TELEMETRY,
  span: "UpdateProxyRuleGroupPriorities",
}));

export type UpdateProxyRulePrioritiesError =
  | InternalServerError
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates proxy rule priorities within a proxy rule group.
 */
export const updateProxyRulePriorities: API.OperationMethod<
  UpdateProxyRulePrioritiesRequest & RegionInput,
  UpdateProxyRulePrioritiesResponse,
  UpdateProxyRulePrioritiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3906, __c122, 2) as any as S.Schema<UpdateProxyRulePrioritiesRequest>,
  output: __S(3907, __c122, 3) as any as S.Schema<UpdateProxyRulePrioritiesResponse>,
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxyRulePriorities",
  telemetry: TELEMETRY,
  span: "UpdateProxyRulePriorities",
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
 * Modifies the proxy listener configuration of a proxy mode firewall. Proxy mode firewalls are created with `NoSourcePreservation` set to `TRUE`. Use this operation to change the ports and protocols on which the firewall's proxy listens for traffic.
 */
export const updateProxySettings: API.OperationMethod<
  UpdateProxySettingsRequest & RegionInput,
  UpdateProxySettingsResponse,
  UpdateProxySettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3936, __c123, 0) as any as S.Schema<UpdateProxySettingsRequest>,
  output: __S(3937, __c123, 1) as any as S.Schema<UpdateProxySettingsResponse>,
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
  input: __S(3968, __c124, 0) as any as S.Schema<UpdateRuleGroupRequest>,
  output: __S(1440, __c45, 0) as any as S.Schema<UpdateRuleGroupResponse>,
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
  input: __S(4000, __c125, 0) as any as S.Schema<UpdateSubnetChangeProtectionRequest>,
  output: __S(4001, __c125, 1) as any as S.Schema<UpdateSubnetChangeProtectionResponse>,
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
  input: __S(4032, __c126, 0) as any as S.Schema<UpdateTLSInspectionConfigurationRequest>,
  output: __S(1568, __c49, 0) as any as S.Schema<UpdateTLSInspectionConfigurationResponse>,
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
          AvailabilityZoneMappings: __S(97, __c3, 1),
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
      return S.Array(__S(96, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          AvailabilityZoneMappings: S.optional(__S(97, __c3, 1)),
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
          SubnetMappings: __S(256, __c8, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateSubnetsRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubnetId: S.String, IPAddressType: S.optional(S.String) }),
      ).annotate({ identifier: "SubnetMapping" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(224, __c7, 0));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          SubnetMappings: S.optional(__S(256, __c8, 0)),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "AssociateSubnetsResponse" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleGroupName: S.optional(S.String),
          InsertPosition: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ProxyRuleGroupAttachment" });
    case 1:
      return S.Array(__S(320, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProxyConfigurationName: S.optional(S.String),
          ProxyConfigurationArn: S.optional(S.String),
          RuleGroups: __S(321, __c10, 1),
          UpdateToken: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AttachRuleGroupsToProxyConfigurationRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(352, __c11, 0));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleGroupName: S.optional(S.String),
          ProxyRuleGroupArn: S.optional(S.String),
          Type: S.optional(S.String),
          Priority: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ProxyConfigRuleGroup" });
    case 1:
      return S.Array(__S(384, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          PreDNS: S.optional(S.String),
          PreREQUEST: S.optional(S.String),
          PostRESPONSE: S.optional(S.String),
        }),
      ).annotate({ identifier: "ProxyConfigDefaultRulePhaseActionsRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProxyConfigurationName: S.optional(S.String),
          ProxyConfigurationArn: S.optional(S.String),
          Description: S.optional(S.String),
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeleteTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RuleGroups: S.optional(__S(385, __c12, 1)),
          DefaultRulePhaseActions: S.optional(__S(386, __c12, 2)),
          Tags: S.optional(__S(353, __c11, 1)),
        }),
      ).annotate({ identifier: "ProxyConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          ProxyConfiguration: S.optional(__S(387, __c12, 3)),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "AttachRuleGroupsToProxyConfigurationResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContainerAssociationName: S.String,
          Description: S.optional(S.String),
          Type: S.String,
          ContainerMonitoringConfigurations: __S(449, __c14, 1),
          Tags: S.optional(__S(353, __c11, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateContainerAssociationRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ClusterArn: S.String, AttributeFilters: S.optional(__S(353, __c11, 1)) }),
      ).annotate({ identifier: "ContainerMonitoringConfiguration" });
    case 1:
      return S.Array(__S(448, __c14, 0));
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
          ContainerMonitoringConfigurations: S.optional(__S(449, __c14, 1)),
          Status: S.optional(S.String),
          Tags: S.optional(__S(353, __c11, 1)),
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
          SubnetMappings: S.optional(__S(256, __c8, 0)),
          DeleteProtection: S.optional(S.Boolean),
          SubnetChangeProtection: S.optional(S.Boolean),
          FirewallPolicyChangeProtection: S.optional(S.Boolean),
          Description: S.optional(S.String),
          Tags: S.optional(__S(353, __c11, 1)),
          EncryptionConfiguration: S.optional(__S(544, __c17, 0)),
          EnabledAnalysisTypes: S.optional(__S(608, __c19, 0)),
          TransitGatewayId: S.optional(S.String),
          AvailabilityZoneMappings: S.optional(__S(97, __c3, 1)),
          AvailabilityZoneChangeProtection: S.optional(S.Boolean),
          NatGatewayMappings: S.optional(__S(705, __c22, 1)),
          ProxySettings: S.optional(__S(736, __c23, 0)),
          NoSourcePreservation: S.optional(S.Boolean),
          VpcEndpoint: S.optional(__S(706, __c22, 2)),
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
      return S.suspend(() =>
        S.Struct({ Port: S.optional(S.Number), Type: S.optional(S.String) }),
      ).annotate({ identifier: "ListenerProperty" });
    case 1:
      return S.Array(__S(576, __c18, 0));
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c20(j: number): any {
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
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Firewall: S.optional(__S(707, __c22, 3)),
          FirewallStatus: S.optional(__S(719, __c22, 15)),
        }),
      ).annotate({ identifier: "CreateFirewallResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ NatGatewayId: S.String })).annotate({
        identifier: "NatGatewayMapping",
      });
    case 1:
      return S.Array(__S(704, __c22, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ VpcId: S.String, SubnetMappings: __S(256, __c8, 0) }),
      ).annotate({ identifier: "VpcEndpoint" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FirewallName: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallPolicyArn: S.String,
          VpcId: S.String,
          SubnetMappings: __S(256, __c8, 0),
          DeleteProtection: S.optional(S.Boolean),
          SubnetChangeProtection: S.optional(S.Boolean),
          FirewallPolicyChangeProtection: S.optional(S.Boolean),
          Description: S.optional(S.String),
          FirewallId: S.String,
          Tags: S.optional(__S(353, __c11, 1)),
          EncryptionConfiguration: S.optional(__S(544, __c17, 0)),
          NumberOfAssociations: S.optional(S.Number),
          EnabledAnalysisTypes: S.optional(__S(608, __c19, 0)),
          TransitGatewayId: S.optional(S.String),
          TransitGatewayOwnerAccountId: S.optional(S.String),
          AvailabilityZoneMappings: S.optional(__S(97, __c3, 1)),
          AvailabilityZoneChangeProtection: S.optional(S.Boolean),
          NatGatewayMappings: S.optional(__S(705, __c22, 1)),
          ProxySettings: S.optional(__S(736, __c23, 0)),
          NoSourcePreservation: S.optional(S.Boolean),
          VpcEndpoint: S.optional(__S(706, __c22, 2)),
        }),
      ).annotate({ identifier: "Firewall" });
    case 4:
      return S.suspend(() =>
        S.Struct({ SyncStatus: S.optional(S.String), UpdateToken: S.optional(S.String) }),
      ).annotate({ identifier: "PerObjectStatus" });
    case 5:
      return S.Record(S.String, /*@__PURE__*/ __S(708, __c22, 4).pipe(S.optional));
    case 6:
      return S.suspend(() =>
        S.Struct({
          NatGatewayId: S.String,
          Status: S.String,
          StatusMessage: S.optional(S.String),
          DnsName: S.optional(S.String),
        }),
      ).annotate({ identifier: "NatGatewayAttachment" });
    case 7:
      return S.Array(__S(710, __c22, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          Attachment: S.optional(__S(640, __c20, 0)),
          Config: S.optional(__S(709, __c22, 5)),
          NatGatewayAttachments: S.optional(__S(711, __c22, 7)),
        }),
      ).annotate({ identifier: "SyncState" });
    case 9:
      return S.Record(S.String, /*@__PURE__*/ __S(712, __c22, 8).pipe(S.optional));
    case 10:
      return S.suspend(() => S.Struct({ ResolvedCIDRCount: S.optional(S.Number) })).annotate({
        identifier: "IPSetMetadata",
      });
    case 11:
      return S.Record(S.String, /*@__PURE__*/ __S(714, __c22, 10).pipe(S.optional));
    case 12:
      return S.suspend(() =>
        S.Struct({
          AvailableCIDRCount: S.optional(S.Number),
          UtilizedCIDRCount: S.optional(S.Number),
          IPSetReferences: S.optional(__S(715, __c22, 11)),
        }),
      ).annotate({ identifier: "CIDRSummary" });
    case 13:
      return S.suspend(() => S.Struct({ CIDRs: S.optional(__S(716, __c22, 12)) })).annotate({
        identifier: "CapacityUsageSummary",
      });
    case 14:
      return S.suspend(() =>
        S.Struct({
          AttachmentId: S.optional(S.String),
          TransitGatewayAttachmentStatus: S.optional(S.String),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "TransitGatewayAttachmentSyncState" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          Status: S.String,
          ConfigurationSyncStateSummary: S.String,
          SyncStates: S.optional(__S(713, __c22, 9)),
          CapacityUsageSummary: S.optional(__S(717, __c22, 13)),
          TransitGatewayAttachmentSyncState: S.optional(__S(718, __c22, 14)),
        }),
      ).annotate({ identifier: "FirewallStatus" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ListenerProperties: __S(577, __c18, 1) })).annotate({
        identifier: "ProxySettings",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallPolicyName: S.String,
          FirewallPolicy: __S(904, __c28, 8),
          Description: S.optional(S.String),
          Tags: S.optional(__S(353, __c11, 1)),
          DryRun: S.optional(S.Boolean),
          EncryptionConfiguration: S.optional(__S(544, __c17, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFirewallPolicyRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Value: S.String })).annotate({ identifier: "Dimension" });
    case 1:
      return S.Array(__S(832, __c26, 0));
    case 2:
      return S.suspend(() => S.Struct({ Dimensions: __S(833, __c26, 1) })).annotate({
        identifier: "PublishMetricAction",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ PublishMetricAction: S.optional(__S(834, __c26, 2)) }),
      ).annotate({ identifier: "ActionDefinition" });
    case 4:
      return S.suspend(() =>
        S.Struct({ ActionName: S.String, ActionDefinition: __S(835, __c26, 3) }),
      ).annotate({ identifier: "CustomAction" });
    case 5:
      return S.Array(__S(836, __c26, 4));
    case 6:
      return S.suspend(() => S.Struct({ Definition: __S(800, __c25, 0) })).annotate({
        identifier: "IPSet",
      });
    case 7:
      return S.Record(S.String, /*@__PURE__*/ __S(838, __c26, 6).pipe(S.optional));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallPolicyName: S.String,
          FirewallPolicyArn: S.String,
          FirewallPolicyId: S.String,
          Description: S.optional(S.String),
          FirewallPolicyStatus: S.optional(S.String),
          Tags: S.optional(__S(353, __c11, 1)),
          ConsumedStatelessRuleCapacity: S.optional(S.Number),
          ConsumedStatefulRuleCapacity: S.optional(S.Number),
          ConsumedStatefulDomainCapacity: S.optional(S.Number),
          NumberOfAssociations: S.optional(S.Number),
          EncryptionConfiguration: S.optional(__S(544, __c17, 0)),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "FirewallPolicyResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ResourceArn: S.String, Priority: S.Number })).annotate({
        identifier: "StatelessRuleGroupReference",
      });
    case 1:
      return S.Array(__S(896, __c28, 0));
    case 2:
      return S.suspend(() => S.Struct({ Action: S.optional(S.String) })).annotate({
        identifier: "StatefulRuleGroupOverride",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          Priority: S.optional(S.Number),
          Override: S.optional(__S(898, __c28, 2)),
          DeepThreatInspection: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "StatefulRuleGroupReference" });
    case 4:
      return S.Array(__S(899, __c28, 3));
    case 5:
      return S.suspend(() => S.Struct({ TcpIdleTimeoutSeconds: S.optional(S.Number) })).annotate({
        identifier: "FlowTimeouts",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          RuleOrder: S.optional(S.String),
          StreamExceptionPolicy: S.optional(S.String),
          FlowTimeouts: S.optional(__S(901, __c28, 5)),
        }),
      ).annotate({ identifier: "StatefulEngineOptions" });
    case 7:
      return S.suspend(() => S.Struct({ RuleVariables: S.optional(__S(839, __c26, 7)) })).annotate({
        identifier: "PolicyVariables",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          StatelessRuleGroupReferences: S.optional(__S(897, __c28, 1)),
          StatelessDefaultActions: __S(800, __c25, 0),
          StatelessFragmentDefaultActions: __S(800, __c25, 0),
          StatelessCustomActions: S.optional(__S(837, __c26, 5)),
          StatefulRuleGroupReferences: S.optional(__S(900, __c28, 4)),
          StatefulDefaultActions: S.optional(__S(800, __c25, 0)),
          StatefulEngineOptions: S.optional(__S(902, __c28, 6)),
          TLSInspectionConfigurationArn: S.optional(S.String),
          PolicyVariables: S.optional(__S(903, __c28, 7)),
          EnableTLSSessionHolding: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "FirewallPolicy" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UpdateToken: S.String, FirewallPolicyResponse: __S(864, __c27, 0) }),
      ).annotate({ identifier: "CreateFirewallPolicyResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyName: S.String,
          NatGatewayId: S.String,
          ProxyConfigurationName: S.optional(S.String),
          ProxyConfigurationArn: S.optional(S.String),
          ListenerProperties: S.optional(__S(1025, __c32, 1)),
          TlsInterceptProperties: __S(992, __c31, 0),
          Tags: S.optional(__S(353, __c11, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProxyRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ PcaArn: S.optional(S.String), TlsInterceptMode: S.optional(S.String) }),
      ).annotate({ identifier: "TlsInterceptPropertiesRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Port: S.Number, Type: S.String })).annotate({
        identifier: "ListenerPropertyRequest",
      });
    case 1:
      return S.Array(__S(1024, __c32, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeleteTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureCode: S.optional(S.String),
          FailureMessage: S.optional(S.String),
          ProxyState: S.optional(S.String),
          ProxyModifyState: S.optional(S.String),
          NatGatewayId: S.optional(S.String),
          ProxyConfigurationName: S.optional(S.String),
          ProxyConfigurationArn: S.optional(S.String),
          ProxyName: S.optional(S.String),
          ProxyArn: S.optional(S.String),
          ListenerProperties: S.optional(__S(577, __c18, 1)),
          TlsInterceptProperties: S.optional(__S(992, __c31, 0)),
          Tags: S.optional(__S(353, __c11, 1)),
        }),
      ).annotate({ identifier: "Proxy" });
    case 3:
      return S.suspend(() =>
        S.Struct({ Proxy: S.optional(__S(1026, __c32, 2)), UpdateToken: S.optional(S.String) }),
      ).annotate({ identifier: "CreateProxyResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyConfigurationName: S.String,
          Description: S.optional(S.String),
          RuleGroupNames: S.optional(__S(800, __c25, 0)),
          RuleGroupArns: S.optional(__S(800, __c25, 0)),
          DefaultRulePhaseActions: __S(386, __c12, 2),
          Tags: S.optional(__S(353, __c11, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProxyConfigurationRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleGroupName: S.String,
          Description: S.optional(S.String),
          Rules: S.optional(__S(1153, __c36, 1)),
          Tags: S.optional(__S(353, __c11, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProxyRuleGroupRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ConditionOperator: S.optional(S.String),
          ConditionKey: S.optional(S.String),
          ConditionValues: S.optional(__S(800, __c25, 0)),
        }),
      ).annotate({ identifier: "ProxyRuleCondition" });
    case 1:
      return S.Array(__S(1120, __c35, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleName: S.optional(S.String),
          Description: S.optional(S.String),
          Action: S.optional(S.String),
          Conditions: S.optional(__S(1121, __c35, 1)),
        }),
      ).annotate({ identifier: "ProxyRule" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1122, __c35, 2));
    case 1:
      return S.suspend(() =>
        S.Struct({
          PreDNS: S.optional(__S(1152, __c36, 0)),
          PreREQUEST: S.optional(__S(1152, __c36, 0)),
          PostRESPONSE: S.optional(__S(1152, __c36, 0)),
        }),
      ).annotate({ identifier: "ProxyRulesByRequestPhase" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleGroupName: S.optional(S.String),
          ProxyRuleGroupArn: S.optional(S.String),
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeleteTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Rules: S.optional(__S(1153, __c36, 1)),
          Description: S.optional(S.String),
          Tags: S.optional(__S(353, __c11, 1)),
        }),
      ).annotate({ identifier: "ProxyRuleGroup" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleGroup: S.optional(__S(1154, __c36, 2)),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateProxyRuleGroupResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleName: S.optional(S.String),
          Description: S.optional(S.String),
          Action: S.optional(S.String),
          Conditions: S.optional(__S(1121, __c35, 1)),
          InsertPosition: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CreateProxyRule" });
    case 1:
      return S.Array(__S(1216, __c38, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          PreDNS: S.optional(__S(1217, __c38, 1)),
          PreREQUEST: S.optional(__S(1217, __c38, 1)),
          PostRESPONSE: S.optional(__S(1217, __c38, 1)),
        }),
      ).annotate({ identifier: "CreateProxyRulesByRequestPhase" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleGroupArn: S.optional(S.String),
          ProxyRuleGroupName: S.optional(S.String),
          Rules: __S(1218, __c38, 2),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateProxyRulesRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleGroupName: S.String,
          RuleGroup: S.optional(__S(1428, __c44, 20)),
          Rules: S.optional(S.String),
          Type: S.String,
          Description: S.optional(S.String),
          Capacity: S.Number,
          Tags: S.optional(__S(353, __c11, 1)),
          DryRun: S.optional(S.Boolean),
          EncryptionConfiguration: S.optional(__S(544, __c17, 0)),
          SourceMetadata: S.optional(__S(1344, __c42, 0)),
          AnalyzeRuleGroup: S.optional(S.Boolean),
          SummaryConfiguration: S.optional(__S(1345, __c42, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRuleGroupRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ AddressDefinition: S.String })).annotate({
        identifier: "Address",
      });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1280, __c40, 0));
    case 1:
      return S.suspend(() => S.Struct({ FromPort: S.Number, ToPort: S.Number })).annotate({
        identifier: "PortRange",
      });
    case 2:
      return S.Array(__S(1313, __c41, 1));
    case 3:
      return S.Array(S.Number);
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SourceArn: S.optional(S.String), SourceUpdateToken: S.optional(S.String) }),
      ).annotate({ identifier: "SourceMetadata" });
    case 1:
      return S.suspend(() => S.Struct({ RuleOptions: S.optional(__S(608, __c19, 0)) })).annotate({
        identifier: "SummaryConfiguration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          IdentifiedRuleIds: S.optional(__S(800, __c25, 0)),
          IdentifiedType: S.optional(S.String),
          AnalysisDetail: S.optional(S.String),
        }),
      ).annotate({ identifier: "AnalysisResult" });
    case 3:
      return S.Array(__S(1346, __c42, 2));
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
          Tags: S.optional(__S(353, __c11, 1)),
          ConsumedCapacity: S.optional(S.Number),
          NumberOfAssociations: S.optional(S.Number),
          EncryptionConfiguration: S.optional(__S(544, __c17, 0)),
          SourceMetadata: S.optional(__S(1344, __c42, 0)),
          SnsTopic: S.optional(S.String),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AnalysisResults: S.optional(__S(1347, __c42, 3)),
          SummaryConfiguration: S.optional(__S(1345, __c42, 1)),
        }),
      ).annotate({ identifier: "RuleGroupResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ RuleOrder: S.optional(S.String) })).annotate({
        identifier: "StatefulRuleOptions",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Definition: S.optional(__S(800, __c25, 0)) })).annotate({
        identifier: "PortSet",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(1408, __c44, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          IPSets: S.optional(__S(839, __c26, 7)),
          PortSets: S.optional(__S(1409, __c44, 1)),
        }),
      ).annotate({ identifier: "RuleVariables" });
    case 3:
      return S.suspend(() => S.Struct({ ReferenceArn: S.optional(S.String) })).annotate({
        identifier: "IPSetReference",
      });
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(1411, __c44, 3).pipe(S.optional));
    case 5:
      return S.suspend(() =>
        S.Struct({ IPSetReferences: S.optional(__S(1412, __c44, 4)) }),
      ).annotate({ identifier: "ReferenceSets" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          Targets: __S(800, __c25, 0),
          TargetTypes: __S(608, __c19, 0),
          GeneratedRulesType: S.String,
        }),
      ).annotate({ identifier: "RulesSourceList" });
    case 7:
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
    case 8:
      return S.suspend(() =>
        S.Struct({ Keyword: S.String, Settings: S.optional(__S(800, __c25, 0)) }),
      ).annotate({ identifier: "RuleOption" });
    case 9:
      return S.Array(__S(1416, __c44, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          Action: S.String,
          Header: __S(1415, __c44, 7),
          RuleOptions: __S(1417, __c44, 9),
        }),
      ).annotate({ identifier: "StatefulRule" });
    case 11:
      return S.Array(__S(1418, __c44, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({ Flags: __S(608, __c19, 0), Masks: S.optional(__S(608, __c19, 0)) }),
      ).annotate({ identifier: "TCPFlagField" });
    case 13:
      return S.Array(__S(1420, __c44, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          Sources: S.optional(__S(1312, __c41, 0)),
          Destinations: S.optional(__S(1312, __c41, 0)),
          SourcePorts: S.optional(__S(1314, __c41, 2)),
          DestinationPorts: S.optional(__S(1314, __c41, 2)),
          Protocols: S.optional(__S(1315, __c41, 3)),
          TCPFlags: S.optional(__S(1421, __c44, 13)),
        }),
      ).annotate({ identifier: "MatchAttributes" });
    case 15:
      return S.suspend(() =>
        S.Struct({ MatchAttributes: __S(1422, __c44, 14), Actions: __S(800, __c25, 0) }),
      ).annotate({ identifier: "RuleDefinition" });
    case 16:
      return S.suspend(() =>
        S.Struct({ RuleDefinition: __S(1423, __c44, 15), Priority: S.Number }),
      ).annotate({ identifier: "StatelessRule" });
    case 17:
      return S.Array(__S(1424, __c44, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          StatelessRules: __S(1425, __c44, 17),
          CustomActions: S.optional(__S(837, __c26, 5)),
        }),
      ).annotate({ identifier: "StatelessRulesAndCustomActions" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          RulesString: S.optional(S.String),
          RulesSourceList: S.optional(__S(1414, __c44, 6)),
          StatefulRules: S.optional(__S(1419, __c44, 11)),
          StatelessRulesAndCustomActions: S.optional(__S(1426, __c44, 18)),
        }),
      ).annotate({ identifier: "RulesSource" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          RuleVariables: S.optional(__S(1410, __c44, 2)),
          ReferenceSets: S.optional(__S(1413, __c44, 5)),
          RulesSource: __S(1427, __c44, 19),
          StatefulRuleOptions: S.optional(__S(1376, __c43, 0)),
        }),
      ).annotate({ identifier: "RuleGroup" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UpdateToken: S.String, RuleGroupResponse: __S(1348, __c42, 4) }),
      ).annotate({ identifier: "CreateRuleGroupResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TLSInspectionConfigurationName: S.String,
          TLSInspectionConfiguration: __S(1543, __c48, 7),
          Description: S.optional(S.String),
          Tags: S.optional(__S(353, __c11, 1)),
          EncryptionConfiguration: S.optional(__S(544, __c17, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTLSInspectionConfigurationRequest" });
  }
}
function __c47(j: number): any {
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
      return S.Array(__S(1504, __c47, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          TLSInspectionConfigurationArn: S.String,
          TLSInspectionConfigurationName: S.String,
          TLSInspectionConfigurationId: S.String,
          TLSInspectionConfigurationStatus: S.optional(S.String),
          Description: S.optional(S.String),
          Tags: S.optional(__S(353, __c11, 1)),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          NumberOfAssociations: S.optional(S.Number),
          EncryptionConfiguration: S.optional(__S(544, __c17, 0)),
          Certificates: S.optional(__S(1505, __c47, 1)),
          CertificateAuthority: S.optional(__S(1504, __c47, 0)),
        }),
      ).annotate({ identifier: "TLSInspectionConfigurationResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ResourceArn: S.optional(S.String) })).annotate({
        identifier: "ServerCertificate",
      });
    case 1:
      return S.Array(__S(1536, __c48, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Sources: S.optional(__S(1312, __c41, 0)),
          Destinations: S.optional(__S(1312, __c41, 0)),
          SourcePorts: S.optional(__S(1314, __c41, 2)),
          DestinationPorts: S.optional(__S(1314, __c41, 2)),
          Protocols: S.optional(__S(1315, __c41, 3)),
        }),
      ).annotate({ identifier: "ServerCertificateScope" });
    case 3:
      return S.Array(__S(1538, __c48, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          RevokedStatusAction: S.optional(S.String),
          UnknownStatusAction: S.optional(S.String),
        }),
      ).annotate({ identifier: "CheckCertificateRevocationStatusActions" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          ServerCertificates: S.optional(__S(1537, __c48, 1)),
          Scopes: S.optional(__S(1539, __c48, 3)),
          CertificateAuthorityArn: S.optional(S.String),
          CheckCertificateRevocationStatus: S.optional(__S(1540, __c48, 4)),
        }),
      ).annotate({ identifier: "ServerCertificateConfiguration" });
    case 6:
      return S.Array(__S(1541, __c48, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ ServerCertificateConfigurations: S.optional(__S(1542, __c48, 6)) }),
      ).annotate({ identifier: "TLSInspectionConfiguration" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.String,
          TLSInspectionConfigurationResponse: __S(1506, __c47, 2),
        }),
      ).annotate({ identifier: "CreateTLSInspectionConfigurationResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.String,
          VpcId: S.String,
          SubnetMapping: __S(224, __c7, 0),
          Description: S.optional(S.String),
          Tags: S.optional(__S(353, __c11, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateVpcEndpointAssociationRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          VpcEndpointAssociationId: S.optional(S.String),
          VpcEndpointAssociationArn: S.String,
          FirewallArn: S.String,
          VpcId: S.String,
          SubnetMapping: __S(224, __c7, 0),
          Description: S.optional(S.String),
          Tags: S.optional(__S(353, __c11, 1)),
        }),
      ).annotate({ identifier: "VpcEndpointAssociation" });
    case 1:
      return S.suspend(() => S.Struct({ Attachment: S.optional(__S(640, __c20, 0)) })).annotate({
        identifier: "AZSyncState",
      });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(1633, __c51, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({ Status: S.String, AssociationSyncState: S.optional(__S(1634, __c51, 2)) }),
      ).annotate({ identifier: "VpcEndpointAssociationStatus" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          VpcEndpointAssociation: S.optional(__S(1632, __c51, 0)),
          VpcEndpointAssociationStatus: S.optional(__S(1635, __c51, 3)),
        }),
      ).annotate({ identifier: "CreateVpcEndpointAssociationResponse" });
  }
}
function __c52(j: number): any {
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
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FirewallName: S.optional(S.String), FirewallArn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteFirewallRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallPolicyName: S.optional(S.String),
          FirewallPolicyArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteFirewallPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ FirewallPolicyResponse: __S(864, __c27, 0) })).annotate({
        identifier: "DeleteFirewallPolicyResponse",
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
        S.Struct({
          ProxyConfigurationName: S.optional(S.String),
          ProxyConfigurationArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteProxyConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProxyConfigurationName: S.optional(S.String),
          ProxyConfigurationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteProxyConfigurationResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleGroupName: S.optional(S.String),
          ProxyRuleGroupArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteProxyRuleGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleGroupName: S.optional(S.String),
          ProxyRuleGroupArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteProxyRuleGroupResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleGroupArn: S.optional(S.String),
          ProxyRuleGroupName: S.optional(S.String),
          Rules: __S(800, __c25, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteProxyRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ProxyRuleGroup: S.optional(__S(1154, __c36, 2)) }),
      ).annotate({ identifier: "DeleteProxyRulesResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteResourcePolicyResponse" });
  }
}
function __c62(j: number): any {
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
      return S.suspend(() => S.Struct({ RuleGroupResponse: __S(1348, __c42, 4) })).annotate({
        identifier: "DeleteRuleGroupResponse",
      });
  }
}
function __c63(j: number): any {
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
        S.Struct({ TLSInspectionConfigurationResponse: __S(1506, __c47, 2) }),
      ).annotate({ identifier: "DeleteTLSInspectionConfigurationResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcEndpointAssociationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteVpcEndpointAssociationRequest" });
  }
}
function __c65(j: number): any {
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
          ContainerMonitoringConfigurations: S.optional(__S(449, __c14, 1)),
          Status: S.optional(S.String),
          ResolvedCidrCount: S.optional(S.Number),
          LastUpdatedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(353, __c11, 1)),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeContainerAssociationResponse" });
  }
}
function __c66(j: number): any {
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
          Firewall: S.optional(__S(707, __c22, 3)),
          FirewallStatus: S.optional(__S(719, __c22, 15)),
        }),
      ).annotate({ identifier: "DescribeFirewallResponse" });
  }
}
function __c67(j: number): any {
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
      return S.Record(S.String, /*@__PURE__*/ __S(2145, __c67, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallPolicyArn: S.optional(S.String),
          Description: S.optional(S.String),
          Status: S.optional(S.String),
          SupportedAvailabilityZones: S.optional(__S(2146, __c67, 2)),
          TransitGatewayAttachmentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeFirewallMetadataResponse" });
  }
}
function __c68(j: number): any {
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
          FirewallPolicyResponse: __S(864, __c27, 0),
          FirewallPolicy: S.optional(__S(904, __c28, 8)),
        }),
      ).annotate({ identifier: "DescribeFirewallPolicyResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.String,
          AvailabilityZone: S.optional(S.String),
          VpcEndpointAssociationArn: S.optional(S.String),
          VpcEndpointId: S.optional(S.String),
          FlowOperationId: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeFlowOperationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MinimumFlowAgeInSeconds: S.optional(S.Number),
          FlowFilters: S.optional(__S(2241, __c70, 1)),
        }),
      ).annotate({ identifier: "FlowOperation" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          VpcEndpointAssociationArn: S.optional(S.String),
          VpcEndpointId: S.optional(S.String),
          FlowOperationId: S.optional(S.String),
          FlowOperationType: S.optional(S.String),
          FlowOperationStatus: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          FlowRequestTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FlowOperation: S.optional(__S(2209, __c69, 1)),
        }),
      ).annotate({ identifier: "DescribeFlowOperationResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          SourceAddress: S.optional(__S(1280, __c40, 0)),
          DestinationAddress: S.optional(__S(1280, __c40, 0)),
          SourcePort: S.optional(S.String),
          DestinationPort: S.optional(S.String),
          Protocols: S.optional(__S(800, __c25, 0)),
        }),
      ).annotate({ identifier: "FlowFilter" });
    case 1:
      return S.Array(__S(2240, __c70, 0));
  }
}
function __c71(j: number): any {
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
          LoggingConfiguration: S.optional(__S(2307, __c72, 3)),
          EnableMonitoringDashboard: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "DescribeLoggingConfigurationResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          LogType: S.String,
          LogDestinationType: S.String,
          LogDestination: __S(2304, __c72, 0),
        }),
      ).annotate({ identifier: "LogDestinationConfig" });
    case 2:
      return S.Array(__S(2305, __c72, 1));
    case 3:
      return S.suspend(() => S.Struct({ LogDestinationConfigs: __S(2306, __c72, 2) })).annotate({
        identifier: "LoggingConfiguration",
      });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProxyName: S.optional(S.String), ProxyArn: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeProxyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProxyName: S.optional(S.String),
          ProxyArn: S.optional(S.String),
          ProxyConfigurationName: S.optional(S.String),
          ProxyConfigurationArn: S.optional(S.String),
          NatGatewayId: S.optional(S.String),
          ProxyState: S.optional(S.String),
          ProxyModifyState: S.optional(S.String),
          ListenerProperties: S.optional(__S(577, __c18, 1)),
          TlsInterceptProperties: S.optional(__S(992, __c31, 0)),
          VpcEndpointServiceName: S.optional(S.String),
          PrivateDNSName: S.optional(S.String),
          CreateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          DeleteTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          UpdateTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          FailureCode: S.optional(S.String),
          FailureMessage: S.optional(S.String),
          Tags: S.optional(__S(353, __c11, 1)),
        }),
      ).annotate({ identifier: "DescribeProxyResource" });
    case 2:
      return S.suspend(() =>
        S.Struct({ Proxy: S.optional(__S(2337, __c73, 1)), UpdateToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeProxyResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyConfigurationName: S.optional(S.String),
          ProxyConfigurationArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeProxyConfigurationRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleName: S.String,
          ProxyRuleGroupName: S.optional(S.String),
          ProxyRuleGroupArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeProxyRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ProxyRule: S.optional(__S(1122, __c35, 2)), UpdateToken: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeProxyRuleResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleGroupName: S.optional(S.String),
          ProxyRuleGroupArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeProxyRuleGroupRequest" });
  }
}
function __c77(j: number): any {
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
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleGroupName: S.optional(S.String),
          RuleGroupArn: S.optional(S.String),
          Type: S.optional(S.String),
          AnalyzeRuleGroup: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeRuleGroupRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.String,
          RuleGroup: S.optional(__S(1428, __c44, 20)),
          RuleGroupResponse: __S(1348, __c42, 4),
        }),
      ).annotate({ identifier: "DescribeRuleGroupResponse" });
  }
}
function __c79(j: number): any {
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
          StatefulRuleOptions: S.optional(__S(1376, __c43, 0)),
          LastModifiedTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          VendorName: S.optional(S.String),
          ProductId: S.optional(S.String),
          ListingName: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeRuleGroupMetadataResponse" });
  }
}
function __c80(j: number): any {
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
      return S.Array(__S(2561, __c80, 1));
    case 3:
      return S.suspend(() => S.Struct({ RuleSummaries: S.optional(__S(2562, __c80, 2)) })).annotate(
        { identifier: "Summary" },
      );
    case 4:
      return S.suspend(() =>
        S.Struct({
          RuleGroupName: S.String,
          Description: S.optional(S.String),
          Summary: S.optional(__S(2563, __c80, 3)),
        }),
      ).annotate({ identifier: "DescribeRuleGroupSummaryResponse" });
  }
}
function __c81(j: number): any {
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
          TLSInspectionConfiguration: S.optional(__S(1543, __c48, 7)),
          TLSInspectionConfigurationResponse: __S(1506, __c47, 2),
        }),
      ).annotate({ identifier: "DescribeTLSInspectionConfigurationResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VpcEndpointAssociationArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeVpcEndpointAssociationRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyConfigurationName: S.optional(S.String),
          ProxyConfigurationArn: S.optional(S.String),
          RuleGroupNames: S.optional(__S(800, __c25, 0)),
          RuleGroupArns: S.optional(__S(800, __c25, 0)),
          UpdateToken: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DetachRuleGroupsFromProxyConfigurationRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          AvailabilityZoneMappings: __S(97, __c3, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateAvailabilityZonesRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          SubnetIds: __S(800, __c25, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DisassociateSubnetsRequest" });
  }
}
function __c86(j: number): any {
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
          Hits: S.optional(__S(2753, __c86, 1)),
          UniqueSources: S.optional(__S(2753, __c86, 1)),
        }),
      ).annotate({ identifier: "AnalysisTypeReportResult" });
    case 3:
      return S.Array(__S(2754, __c86, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Status: S.optional(S.String),
          StartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          ReportTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          AnalysisType: S.optional(S.String),
          NextToken: S.optional(S.String),
          AnalysisReportResults: S.optional(__S(2755, __c86, 3)),
        }),
      ).annotate({ identifier: "GetAnalysisReportResultsResponse" });
  }
}
function __c87(j: number): any {
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
      return S.Array(__S(2785, __c87, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          AnalysisReports: S.optional(__S(2786, __c87, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAnalysisReportsResponse" });
  }
}
function __c88(j: number): any {
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
      return S.Array(__S(2817, __c88, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ContainerAssociations: S.optional(__S(2818, __c88, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListContainerAssociationsResponse" });
  }
}
function __c89(j: number): any {
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
          FirewallPolicies: S.optional(__S(2881, __c90, 1)),
        }),
      ).annotate({ identifier: "ListFirewallPoliciesResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Arn: S.optional(S.String) }),
      ).annotate({ identifier: "FirewallPolicyMetadata" });
    case 1:
      return S.Array(__S(2880, __c90, 0));
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          VpcIds: S.optional(__S(800, __c25, 0)),
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
      return S.Array(__S(2913, __c91, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Firewalls: S.optional(__S(2914, __c91, 2)) }),
      ).annotate({ identifier: "ListFirewallsResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.String,
          FlowOperationId: S.String,
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          AvailabilityZone: S.optional(S.String),
          VpcEndpointId: S.optional(S.String),
          VpcEndpointAssociationArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFlowOperationResultsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          SourceAddress: S.optional(__S(1280, __c40, 0)),
          DestinationAddress: S.optional(__S(1280, __c40, 0)),
          SourcePort: S.optional(S.String),
          DestinationPort: S.optional(S.String),
          Protocol: S.optional(S.String),
          Age: S.optional(S.Number),
          PacketCount: S.optional(S.Number),
          ByteCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Flow" });
    case 2:
      return S.Array(__S(2945, __c92, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          AvailabilityZone: S.optional(S.String),
          VpcEndpointAssociationArn: S.optional(S.String),
          VpcEndpointId: S.optional(S.String),
          FlowOperationId: S.optional(S.String),
          FlowOperationStatus: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          FlowRequestTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Flows: S.optional(__S(2946, __c92, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFlowOperationResultsResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.String,
          AvailabilityZone: S.optional(S.String),
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
      return S.Array(__S(2977, __c93, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          FlowOperations: S.optional(__S(2978, __c93, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFlowOperationsResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListProxiesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Proxies: S.optional(__S(2881, __c90, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListProxiesResponse" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListProxyConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProxyConfigurations: S.optional(__S(2881, __c90, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProxyConfigurationsResponse" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), MaxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListProxyRuleGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleGroups: S.optional(__S(2881, __c90, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProxyRuleGroupsResponse" });
  }
}
function __c97(j: number): any {
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
      return S.Array(__S(3105, __c97, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), RuleGroups: S.optional(__S(3106, __c97, 2)) }),
      ).annotate({ identifier: "ListRuleGroupsResponse" });
  }
}
function __c98(j: number): any {
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
        S.Struct({ NextToken: S.optional(S.String), Tags: S.optional(__S(353, __c11, 1)) }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c99(j: number): any {
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
          TLSInspectionConfigurations: S.optional(__S(2881, __c90, 1)),
        }),
      ).annotate({ identifier: "ListTLSInspectionConfigurationsResponse" });
  }
}
function __c100(j: number): any {
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
      return S.Array(__S(3201, __c100, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          VpcEndpointAssociations: S.optional(__S(3202, __c100, 2)),
        }),
      ).annotate({ identifier: "ListVpcEndpointAssociationsResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Policy: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TransitGatewayAttachmentId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "RejectNetworkFirewallTransitGatewayAttachmentRequest" });
  }
}
function __c103(j: number): any {
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
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.String,
          AvailabilityZone: S.optional(S.String),
          VpcEndpointAssociationArn: S.optional(S.String),
          VpcEndpointId: S.optional(S.String),
          MinimumFlowAgeInSeconds: S.optional(S.Number),
          FlowFilters: __S(2241, __c70, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartFlowCaptureRequest" });
  }
}
function __c105(j: number): any {
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
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.String,
          AvailabilityZone: S.optional(S.String),
          VpcEndpointAssociationArn: S.optional(S.String),
          VpcEndpointId: S.optional(S.String),
          MinimumFlowAgeInSeconds: S.optional(S.Number),
          FlowFilters: __S(2241, __c70, 1),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "StartFlowFlushRequest" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(353, __c11, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(800, __c25, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c109(j: number): any {
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
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ContainerAssociationName: S.optional(S.String),
          ContainerAssociationArn: S.optional(S.String),
          Description: S.optional(S.String),
          Type: S.String,
          ContainerMonitoringConfigurations: __S(449, __c14, 1),
          Tags: S.optional(__S(353, __c11, 1)),
          UpdateToken: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateContainerAssociationRequest" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EnabledAnalysisTypes: S.optional(__S(608, __c19, 0)),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          UpdateToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFirewallAnalysisSettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          EnabledAnalysisTypes: S.optional(__S(608, __c19, 0)),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateFirewallAnalysisSettingsResponse" });
  }
}
function __c112(j: number): any {
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
function __c113(j: number): any {
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
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.optional(S.String),
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(544, __c17, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFirewallEncryptionConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          UpdateToken: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(544, __c17, 0)),
        }),
      ).annotate({ identifier: "UpdateFirewallEncryptionConfigurationResponse" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.String,
          FirewallPolicyArn: S.optional(S.String),
          FirewallPolicyName: S.optional(S.String),
          FirewallPolicy: __S(904, __c28, 8),
          Description: S.optional(S.String),
          DryRun: S.optional(S.Boolean),
          EncryptionConfiguration: S.optional(__S(544, __c17, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFirewallPolicyRequest" });
  }
}
function __c116(j: number): any {
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
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          LoggingConfiguration: S.optional(__S(2307, __c72, 3)),
          EnableMonitoringDashboard: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateLoggingConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          LoggingConfiguration: S.optional(__S(2307, __c72, 3)),
          EnableMonitoringDashboard: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "UpdateLoggingConfigurationResponse" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NatGatewayId: S.String,
          ProxyName: S.optional(S.String),
          ProxyArn: S.optional(S.String),
          ListenerPropertiesToAdd: S.optional(__S(1025, __c32, 1)),
          ListenerPropertiesToRemove: S.optional(__S(1025, __c32, 1)),
          TlsInterceptProperties: S.optional(__S(992, __c31, 0)),
          UpdateToken: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProxyRequest" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyConfigurationName: S.optional(S.String),
          ProxyConfigurationArn: S.optional(S.String),
          DefaultRulePhaseActions: __S(386, __c12, 2),
          UpdateToken: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProxyConfigurationRequest" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleGroupName: S.optional(S.String),
          ProxyRuleGroupArn: S.optional(S.String),
          ProxyRuleName: S.String,
          Description: S.optional(S.String),
          Action: S.optional(S.String),
          AddConditions: S.optional(__S(1121, __c35, 1)),
          RemoveConditions: S.optional(__S(1121, __c35, 1)),
          UpdateToken: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProxyRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ProxyRule: S.optional(__S(1122, __c35, 2)),
          RemovedConditions: S.optional(__S(1121, __c35, 1)),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateProxyRuleResponse" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProxyRuleGroupName: S.optional(S.String), NewPosition: S.optional(S.Number) }),
      ).annotate({ identifier: "ProxyRuleGroupPriority" });
    case 1:
      return S.Array(__S(3872, __c121, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProxyConfigurationName: S.optional(S.String),
          ProxyConfigurationArn: S.optional(S.String),
          RuleGroups: __S(3873, __c121, 1),
          UpdateToken: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProxyRuleGroupPrioritiesRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({ ProxyRuleGroupName: S.optional(S.String), Priority: S.optional(S.Number) }),
      ).annotate({ identifier: "ProxyRuleGroupPriorityResult" });
    case 4:
      return S.Array(__S(3875, __c121, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleGroups: S.optional(__S(3876, __c121, 4)),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateProxyRuleGroupPrioritiesResponse" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ProxyRuleName: S.optional(S.String), NewPosition: S.optional(S.Number) }),
      ).annotate({ identifier: "ProxyRulePriority" });
    case 1:
      return S.Array(__S(3904, __c122, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleGroupName: S.optional(S.String),
          ProxyRuleGroupArn: S.optional(S.String),
          RuleGroupRequestPhase: S.String,
          Rules: __S(3905, __c122, 1),
          UpdateToken: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProxyRulePrioritiesRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          ProxyRuleGroupName: S.optional(S.String),
          ProxyRuleGroupArn: S.optional(S.String),
          RuleGroupRequestPhase: S.optional(S.String),
          Rules: S.optional(__S(3905, __c122, 1)),
          UpdateToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateProxyRulePrioritiesResponse" });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          UpdateToken: S.optional(S.String),
          ProxySettings: S.optional(__S(736, __c23, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateProxySettingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          FirewallArn: S.optional(S.String),
          FirewallName: S.optional(S.String),
          UpdateToken: S.optional(S.String),
          ProxySettings: S.optional(__S(736, __c23, 0)),
        }),
      ).annotate({ identifier: "UpdateProxySettingsResponse" });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          UpdateToken: S.String,
          RuleGroupArn: S.optional(S.String),
          RuleGroupName: S.optional(S.String),
          RuleGroup: S.optional(__S(1428, __c44, 20)),
          Rules: S.optional(S.String),
          Type: S.optional(S.String),
          Description: S.optional(S.String),
          DryRun: S.optional(S.Boolean),
          EncryptionConfiguration: S.optional(__S(544, __c17, 0)),
          SourceMetadata: S.optional(__S(1344, __c42, 0)),
          AnalyzeRuleGroup: S.optional(S.Boolean),
          SummaryConfiguration: S.optional(__S(1345, __c42, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateRuleGroupRequest" });
  }
}
function __c125(j: number): any {
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
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TLSInspectionConfigurationArn: S.optional(S.String),
          TLSInspectionConfigurationName: S.optional(S.String),
          TLSInspectionConfiguration: __S(1543, __c48, 7),
          Description: S.optional(S.String),
          EncryptionConfiguration: S.optional(__S(544, __c17, 0)),
          UpdateToken: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateTLSInspectionConfigurationRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
