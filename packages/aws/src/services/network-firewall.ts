import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_0Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "Network Firewall",
  target: "NetworkFirewall_20201112",
  version: "2020-11-12",
  sigv4: "network-firewall",
  protocol: awsJson1_0Protocol,
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://network-firewall.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://network-firewall.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InsufficientCapacityException
  extends /*@__PURE__*/ TE.TaggedError("InsufficientCapacityException")<{
    readonly message?: string;
  }> {}
export class InternalServerError
  extends /*@__PURE__*/ TE.TaggedError("InternalServerError")<{
    readonly message?: string;
  }> {}
export class InvalidOperationException
  extends /*@__PURE__*/ TE.TaggedError("InvalidOperationException")<{
    readonly message?: string;
  }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRequestException")<{
    readonly message?: string;
  }> {}
export class InvalidResourcePolicyException
  extends /*@__PURE__*/ TE.TaggedError("InvalidResourcePolicyException")<{
    readonly message?: string;
  }> {}
export class InvalidTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTokenException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
  }> {}
export class LogDestinationPermissionException
  extends /*@__PURE__*/ TE.TaggedError("LogDestinationPermissionException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
  }> {}
export class ResourceOwnerCheckException
  extends /*@__PURE__*/ TE.TaggedError("ResourceOwnerCheckException")<{
    readonly message?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError("ThrottlingException")<{
    readonly message?: string;
  }> {}
export class UnsupportedOperationException
  extends /*@__PURE__*/ TE.TaggedError("UnsupportedOperationException")<{
    readonly message?: string;
  }> {}
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
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  AvailabilityZoneMappings: AvailabilityZoneMapping[];
}
export interface AssociateAvailabilityZonesResponse {
  FirewallArn?: string;
  FirewallName?: string;
  AvailabilityZoneMappings?: AvailabilityZoneMapping[];
  UpdateToken?: string;
}
export interface AssociateFirewallPolicyRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  FirewallPolicyArn: string;
}
export interface AssociateFirewallPolicyResponse {
  FirewallArn?: string;
  FirewallName?: string;
  FirewallPolicyArn?: string;
  UpdateToken?: string;
}
export type CollectionMember_String = string;
export type IPAddressType = "DUALSTACK" | "IPV4" | "IPV6" | (string & {});
export interface SubnetMapping {
  SubnetId: string;
  IPAddressType?: IPAddressType;
}
export type SubnetMappings = SubnetMapping[];
export interface AssociateSubnetsRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  SubnetMappings: SubnetMapping[];
}
export interface AssociateSubnetsResponse {
  FirewallArn?: string;
  FirewallName?: string;
  SubnetMappings?: SubnetMapping[];
  UpdateToken?: string;
}
export type InsertPosition = number;
export interface ProxyRuleGroupAttachment {
  ProxyRuleGroupName?: string;
  InsertPosition?: number;
}
export type ProxyRuleGroupAttachmentList = ProxyRuleGroupAttachment[];
export interface AttachRuleGroupsToProxyConfigurationRequest {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  RuleGroups: ProxyRuleGroupAttachment[];
  UpdateToken: string;
}
export type Description = string;
export type CreateTime = Date;
export type DeleteTime = Date;
export type ProxyConfigRuleGroupType = string;
export type ProxyConfigRuleGroupPriority = number;
export interface ProxyConfigRuleGroup {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
  Type?: string;
  Priority?: number;
}
export type ProxyConfigRuleGroupSet = ProxyConfigRuleGroup[];
export type ProxyRulePhaseAction = "ALLOW" | "DENY" | "ALERT" | (string & {});
export interface ProxyConfigDefaultRulePhaseActionsRequest {
  PreDNS?: ProxyRulePhaseAction;
  PreREQUEST?: ProxyRulePhaseAction;
  PostRESPONSE?: ProxyRulePhaseAction;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface ProxyConfiguration {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  Description?: string;
  CreateTime?: Date;
  DeleteTime?: Date;
  RuleGroups?: ProxyConfigRuleGroup[];
  DefaultRulePhaseActions?: ProxyConfigDefaultRulePhaseActionsRequest;
  Tags?: Tag[];
}
export interface AttachRuleGroupsToProxyConfigurationResponse {
  ProxyConfiguration?: ProxyConfiguration;
  UpdateToken?: string;
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
  AttributeFilters?: ContainerAttribute[];
}
export type ContainerMonitoringConfigurations =
  ContainerMonitoringConfiguration[];
export interface CreateContainerAssociationRequest {
  ContainerAssociationName: string;
  Description?: string;
  Type: ContainerMonitoringType;
  ContainerMonitoringConfigurations: ContainerMonitoringConfiguration[];
  Tags?: Tag[];
}
export type ContainerAssociationStatus =
  | "ACTIVE"
  | "CREATING"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export interface CreateContainerAssociationResponse {
  ContainerAssociationName?: string;
  ContainerAssociationArn?: string;
  Description?: string;
  Type?: ContainerMonitoringType;
  ContainerMonitoringConfigurations?: ContainerMonitoringConfiguration[];
  Status?: ContainerAssociationStatus;
  Tags?: Tag[];
  UpdateToken?: string;
}
export type VpcId = string;
export type KeyId = string;
export type EncryptionType =
  | "CUSTOMER_KMS"
  | "AWS_OWNED_KMS_KEY"
  | (string & {});
export interface EncryptionConfiguration {
  KeyId?: string;
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
  Port?: number;
  Type?: ListenerPropertyType;
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
  VpcId?: string;
  SubnetMappings?: SubnetMapping[];
  DeleteProtection?: boolean;
  SubnetChangeProtection?: boolean;
  FirewallPolicyChangeProtection?: boolean;
  Description?: string;
  Tags?: Tag[];
  EncryptionConfiguration?: EncryptionConfiguration;
  EnabledAnalysisTypes?: EnabledAnalysisType[];
  TransitGatewayId?: string;
  AvailabilityZoneMappings?: AvailabilityZoneMapping[];
  AvailabilityZoneChangeProtection?: boolean;
  NatGatewayMappings?: NatGatewayMapping[];
  ProxySettings?: ProxySettings;
  NoSourcePreservation?: boolean;
  VpcEndpoint?: VpcEndpoint;
}
export type ResourceId = string;
export type NumberOfAssociations = number;
export type AWSAccountId = string;
export interface Firewall {
  FirewallName?: string;
  FirewallArn?: string;
  FirewallPolicyArn: string;
  VpcId: string;
  SubnetMappings: SubnetMapping[];
  DeleteProtection?: boolean;
  SubnetChangeProtection?: boolean;
  FirewallPolicyChangeProtection?: boolean;
  Description?: string;
  FirewallId: string;
  Tags?: Tag[];
  EncryptionConfiguration?: EncryptionConfiguration;
  NumberOfAssociations?: number;
  EnabledAnalysisTypes?: EnabledAnalysisType[];
  TransitGatewayId?: string;
  TransitGatewayOwnerAccountId?: string;
  AvailabilityZoneMappings?: AvailabilityZoneMapping[];
  AvailabilityZoneChangeProtection?: boolean;
  NatGatewayMappings?: NatGatewayMapping[];
  ProxySettings?: ProxySettings;
  NoSourcePreservation?: boolean;
  VpcEndpoint?: VpcEndpoint;
}
export type FirewallStatusValue =
  | "PROVISIONING"
  | "DELETING"
  | "READY"
  | "FAILED"
  | (string & {});
export type ConfigurationSyncState =
  | "PENDING"
  | "IN_SYNC"
  | "CAPACITY_CONSTRAINED"
  | (string & {});
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
  SubnetId?: string;
  EndpointId?: string;
  Status?: AttachmentStatus;
  StatusMessage?: string;
  DnsName?: string;
}
export type PerObjectSyncStatus =
  | "PENDING"
  | "IN_SYNC"
  | "CAPACITY_CONSTRAINED"
  | "NOT_SUBSCRIBED"
  | "DEPRECATED"
  | (string & {});
export interface PerObjectStatus {
  SyncStatus?: PerObjectSyncStatus;
  UpdateToken?: string;
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
  StatusMessage?: string;
  DnsName?: string;
}
export type NatGatewayAttachmentsList = NatGatewayAttachment[];
export interface SyncState {
  Attachment?: Attachment;
  Config?: { [key: string]: PerObjectStatus | undefined };
  NatGatewayAttachments?: NatGatewayAttachment[];
}
export type SyncStates = { [key: string]: SyncState | undefined };
export type CIDRCount = number;
export type IPSetArn = string;
export interface IPSetMetadata {
  ResolvedCIDRCount?: number;
}
export type IPSetMetadataMap = { [key: string]: IPSetMetadata | undefined };
export interface CIDRSummary {
  AvailableCIDRCount?: number;
  UtilizedCIDRCount?: number;
  IPSetReferences?: { [key: string]: IPSetMetadata | undefined };
}
export interface CapacityUsageSummary {
  CIDRs?: CIDRSummary;
}
export type AttachmentId = string;
export type TransitGatewayAttachmentSyncStateMessage = string;
export interface TransitGatewayAttachmentSyncState {
  AttachmentId?: string;
  TransitGatewayAttachmentStatus?: TransitGatewayAttachmentStatus;
  StatusMessage?: string;
}
export interface FirewallStatus {
  Status: FirewallStatusValue;
  ConfigurationSyncStateSummary: ConfigurationSyncState;
  SyncStates?: { [key: string]: SyncState | undefined };
  CapacityUsageSummary?: CapacityUsageSummary;
  TransitGatewayAttachmentSyncState?: TransitGatewayAttachmentSyncState;
}
export interface CreateFirewallResponse {
  Firewall?: Firewall;
  FirewallStatus?: FirewallStatus;
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
  PublishMetricAction?: PublishMetricAction;
}
export interface CustomAction {
  ActionName: string;
  ActionDefinition: ActionDefinition;
}
export type CustomActions = CustomAction[];
export type OverrideAction = "DROP_TO_ALERT" | (string & {});
export interface StatefulRuleGroupOverride {
  Action?: OverrideAction;
}
export type DeepThreatInspection = boolean;
export interface StatefulRuleGroupReference {
  ResourceArn: string;
  Priority?: number;
  Override?: StatefulRuleGroupOverride;
  DeepThreatInspection?: boolean;
}
export type StatefulRuleGroupReferences = StatefulRuleGroupReference[];
export type StatefulActions = string[];
export type RuleOrder = "DEFAULT_ACTION_ORDER" | "STRICT_ORDER" | (string & {});
export type StreamExceptionPolicy =
  | "DROP"
  | "CONTINUE"
  | "REJECT"
  | (string & {});
export type TcpIdleTimeoutRangeBound = number;
export interface FlowTimeouts {
  TcpIdleTimeoutSeconds?: number;
}
export interface StatefulEngineOptions {
  RuleOrder?: RuleOrder;
  StreamExceptionPolicy?: StreamExceptionPolicy;
  FlowTimeouts?: FlowTimeouts;
}
export type RuleVariableName = string;
export type VariableDefinition = string;
export type VariableDefinitionList = string[];
export interface IPSet {
  Definition: string[];
}
export type IPSets = { [key: string]: IPSet | undefined };
export interface PolicyVariables {
  RuleVariables?: { [key: string]: IPSet | undefined };
}
export type EnableTLSSessionHolding = boolean;
export interface FirewallPolicy {
  StatelessRuleGroupReferences?: StatelessRuleGroupReference[];
  StatelessDefaultActions: string[];
  StatelessFragmentDefaultActions: string[];
  StatelessCustomActions?: CustomAction[];
  StatefulRuleGroupReferences?: StatefulRuleGroupReference[];
  StatefulDefaultActions?: string[];
  StatefulEngineOptions?: StatefulEngineOptions;
  TLSInspectionConfigurationArn?: string;
  PolicyVariables?: PolicyVariables;
  EnableTLSSessionHolding?: boolean;
}
export interface CreateFirewallPolicyRequest {
  FirewallPolicyName: string;
  FirewallPolicy: FirewallPolicy;
  Description?: string;
  Tags?: Tag[];
  DryRun?: boolean;
  EncryptionConfiguration?: EncryptionConfiguration;
}
export type ResourceStatus = "ACTIVE" | "DELETING" | "ERROR" | (string & {});
export type RuleCapacity = number;
export type LastUpdateTime = Date;
export interface FirewallPolicyResponse {
  FirewallPolicyName: string;
  FirewallPolicyArn: string;
  FirewallPolicyId: string;
  Description?: string;
  FirewallPolicyStatus?: ResourceStatus;
  Tags?: Tag[];
  ConsumedStatelessRuleCapacity?: number;
  ConsumedStatefulRuleCapacity?: number;
  ConsumedStatefulDomainCapacity?: number;
  NumberOfAssociations?: number;
  EncryptionConfiguration?: EncryptionConfiguration;
  LastModifiedTime?: Date;
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
  PcaArn?: string;
  TlsInterceptMode?: TlsInterceptMode;
}
export interface CreateProxyRequest {
  ProxyName: string;
  NatGatewayId: string;
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  ListenerProperties?: ListenerPropertyRequest[];
  TlsInterceptProperties: TlsInterceptPropertiesRequest;
  Tags?: Tag[];
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
export type ProxyModifyState =
  | "MODIFYING"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export interface TlsInterceptProperties {
  PcaArn?: string;
  TlsInterceptMode?: TlsInterceptMode;
}
export interface Proxy {
  CreateTime?: Date;
  DeleteTime?: Date;
  UpdateTime?: Date;
  FailureCode?: string;
  FailureMessage?: string;
  ProxyState?: ProxyState;
  ProxyModifyState?: ProxyModifyState;
  NatGatewayId?: string;
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  ProxyName?: string;
  ProxyArn?: string;
  ListenerProperties?: ListenerProperty[];
  TlsInterceptProperties?: TlsInterceptProperties;
  Tags?: Tag[];
}
export interface CreateProxyResponse {
  Proxy?: Proxy;
  UpdateToken?: string;
}
export type ResourceNameList = string[];
export type ResourceArnList = string[];
export interface CreateProxyConfigurationRequest {
  ProxyConfigurationName: string;
  Description?: string;
  RuleGroupNames?: string[];
  RuleGroupArns?: string[];
  DefaultRulePhaseActions: ProxyConfigDefaultRulePhaseActionsRequest;
  Tags?: Tag[];
}
export interface CreateProxyConfigurationResponse {
  ProxyConfiguration?: ProxyConfiguration;
  UpdateToken?: string;
}
export type ConditionOperator = string;
export type ConditionKey = string;
export type ProxyConditionValue = string;
export type ProxyConditionValueList = string[];
export interface ProxyRuleCondition {
  ConditionOperator?: string;
  ConditionKey?: string;
  ConditionValues?: string[];
}
export type ProxyRuleConditionList = ProxyRuleCondition[];
export interface ProxyRule {
  ProxyRuleName?: string;
  Description?: string;
  Action?: ProxyRulePhaseAction;
  Conditions?: ProxyRuleCondition[];
}
export type ProxyRuleList = ProxyRule[];
export interface ProxyRulesByRequestPhase {
  PreDNS?: ProxyRule[];
  PreREQUEST?: ProxyRule[];
  PostRESPONSE?: ProxyRule[];
}
export interface CreateProxyRuleGroupRequest {
  ProxyRuleGroupName: string;
  Description?: string;
  Rules?: ProxyRulesByRequestPhase;
  Tags?: Tag[];
}
export interface ProxyRuleGroup {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
  CreateTime?: Date;
  DeleteTime?: Date;
  Rules?: ProxyRulesByRequestPhase;
  Description?: string;
  Tags?: Tag[];
}
export interface CreateProxyRuleGroupResponse {
  ProxyRuleGroup?: ProxyRuleGroup;
  UpdateToken?: string;
}
export interface CreateProxyRule {
  ProxyRuleName?: string;
  Description?: string;
  Action?: ProxyRulePhaseAction;
  Conditions?: ProxyRuleCondition[];
  InsertPosition?: number;
}
export type CreateProxyRuleList = CreateProxyRule[];
export interface CreateProxyRulesByRequestPhase {
  PreDNS?: CreateProxyRule[];
  PreREQUEST?: CreateProxyRule[];
  PostRESPONSE?: CreateProxyRule[];
}
export interface CreateProxyRulesRequest {
  ProxyRuleGroupArn?: string;
  ProxyRuleGroupName?: string;
  Rules: CreateProxyRulesByRequestPhase;
}
export interface CreateProxyRulesResponse {
  ProxyRuleGroup?: ProxyRuleGroup;
  UpdateToken?: string;
}
export interface PortSet {
  Definition?: string[];
}
export type PortSets = { [key: string]: PortSet | undefined };
export interface RuleVariables {
  IPSets?: { [key: string]: IPSet | undefined };
  PortSets?: { [key: string]: PortSet | undefined };
}
export type IPSetReferenceName = string;
export interface IPSetReference {
  ReferenceArn?: string;
}
export type IPSetReferenceMap = { [key: string]: IPSetReference | undefined };
export interface ReferenceSets {
  IPSetReferences?: { [key: string]: IPSetReference | undefined };
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
export type StatefulAction =
  | "PASS"
  | "DROP"
  | "ALERT"
  | "REJECT"
  | (string & {});
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
  Settings?: string[];
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
export type TCPFlag =
  | "FIN"
  | "SYN"
  | "RST"
  | "PSH"
  | "ACK"
  | "URG"
  | "ECE"
  | "CWR"
  | (string & {});
export type Flags = TCPFlag[];
export interface TCPFlagField {
  Flags: TCPFlag[];
  Masks?: TCPFlag[];
}
export type TCPFlags = TCPFlagField[];
export interface MatchAttributes {
  Sources?: Address[];
  Destinations?: Address[];
  SourcePorts?: PortRange[];
  DestinationPorts?: PortRange[];
  Protocols?: number[];
  TCPFlags?: TCPFlagField[];
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
  CustomActions?: CustomAction[];
}
export interface RulesSource {
  RulesString?: string;
  RulesSourceList?: RulesSourceList;
  StatefulRules?: StatefulRule[];
  StatelessRulesAndCustomActions?: StatelessRulesAndCustomActions;
}
export interface StatefulRuleOptions {
  RuleOrder?: RuleOrder;
}
export interface RuleGroup {
  RuleVariables?: RuleVariables;
  ReferenceSets?: ReferenceSets;
  RulesSource: RulesSource;
  StatefulRuleOptions?: StatefulRuleOptions;
}
export type RuleGroupType =
  | "STATELESS"
  | "STATEFUL"
  | "STATEFUL_DOMAIN"
  | (string & {});
export interface SourceMetadata {
  SourceArn?: string;
  SourceUpdateToken?: string;
}
export type SummaryRuleOption = "SID" | "MSG" | "METADATA" | (string & {});
export type SummaryRuleOptions = SummaryRuleOption[];
export interface SummaryConfiguration {
  RuleOptions?: SummaryRuleOption[];
}
export interface CreateRuleGroupRequest {
  RuleGroupName: string;
  RuleGroup?: RuleGroup;
  Rules?: string;
  Type: RuleGroupType;
  Description?: string;
  Capacity: number;
  Tags?: Tag[];
  DryRun?: boolean;
  EncryptionConfiguration?: EncryptionConfiguration;
  SourceMetadata?: SourceMetadata;
  AnalyzeRuleGroup?: boolean;
  SummaryConfiguration?: SummaryConfiguration;
}
export type RuleIdList = string[];
export type IdentifiedType =
  | "STATELESS_RULE_FORWARDING_ASYMMETRICALLY"
  | "STATELESS_RULE_CONTAINS_TCP_FLAGS"
  | (string & {});
export interface AnalysisResult {
  IdentifiedRuleIds?: string[];
  IdentifiedType?: IdentifiedType;
  AnalysisDetail?: string;
}
export type AnalysisResultList = AnalysisResult[];
export interface RuleGroupResponse {
  RuleGroupArn: string;
  RuleGroupName: string;
  RuleGroupId: string;
  Description?: string;
  Type?: RuleGroupType;
  Capacity?: number;
  RuleGroupStatus?: ResourceStatus;
  Tags?: Tag[];
  ConsumedCapacity?: number;
  NumberOfAssociations?: number;
  EncryptionConfiguration?: EncryptionConfiguration;
  SourceMetadata?: SourceMetadata;
  SnsTopic?: string;
  LastModifiedTime?: Date;
  AnalysisResults?: AnalysisResult[];
  SummaryConfiguration?: SummaryConfiguration;
}
export interface CreateRuleGroupResponse {
  UpdateToken: string;
  RuleGroupResponse: RuleGroupResponse;
}
export interface ServerCertificate {
  ResourceArn?: string;
}
export type ServerCertificates = ServerCertificate[];
export interface ServerCertificateScope {
  Sources?: Address[];
  Destinations?: Address[];
  SourcePorts?: PortRange[];
  DestinationPorts?: PortRange[];
  Protocols?: number[];
}
export type ServerCertificateScopes = ServerCertificateScope[];
export type RevocationCheckAction = "PASS" | "DROP" | "REJECT" | (string & {});
export interface CheckCertificateRevocationStatusActions {
  RevokedStatusAction?: RevocationCheckAction;
  UnknownStatusAction?: RevocationCheckAction;
}
export interface ServerCertificateConfiguration {
  ServerCertificates?: ServerCertificate[];
  Scopes?: ServerCertificateScope[];
  CertificateAuthorityArn?: string;
  CheckCertificateRevocationStatus?: CheckCertificateRevocationStatusActions;
}
export type ServerCertificateConfigurations = ServerCertificateConfiguration[];
export interface TLSInspectionConfiguration {
  ServerCertificateConfigurations?: ServerCertificateConfiguration[];
}
export interface CreateTLSInspectionConfigurationRequest {
  TLSInspectionConfigurationName: string;
  TLSInspectionConfiguration: TLSInspectionConfiguration;
  Description?: string;
  Tags?: Tag[];
  EncryptionConfiguration?: EncryptionConfiguration;
}
export interface TlsCertificateData {
  CertificateArn?: string;
  CertificateSerial?: string;
  Status?: string;
  StatusMessage?: string;
}
export type Certificates = TlsCertificateData[];
export interface TLSInspectionConfigurationResponse {
  TLSInspectionConfigurationArn: string;
  TLSInspectionConfigurationName: string;
  TLSInspectionConfigurationId: string;
  TLSInspectionConfigurationStatus?: ResourceStatus;
  Description?: string;
  Tags?: Tag[];
  LastModifiedTime?: Date;
  NumberOfAssociations?: number;
  EncryptionConfiguration?: EncryptionConfiguration;
  Certificates?: TlsCertificateData[];
  CertificateAuthority?: TlsCertificateData;
}
export interface CreateTLSInspectionConfigurationResponse {
  UpdateToken: string;
  TLSInspectionConfigurationResponse: TLSInspectionConfigurationResponse;
}
export interface CreateVpcEndpointAssociationRequest {
  FirewallArn: string;
  VpcId: string;
  SubnetMapping: SubnetMapping;
  Description?: string;
  Tags?: Tag[];
}
export interface VpcEndpointAssociation {
  VpcEndpointAssociationId?: string;
  VpcEndpointAssociationArn: string;
  FirewallArn: string;
  VpcId: string;
  SubnetMapping: SubnetMapping;
  Description?: string;
  Tags?: Tag[];
}
export interface AZSyncState {
  Attachment?: Attachment;
}
export type AssociationSyncState = { [key: string]: AZSyncState | undefined };
export interface VpcEndpointAssociationStatus {
  Status: FirewallStatusValue;
  AssociationSyncState?: { [key: string]: AZSyncState | undefined };
}
export interface CreateVpcEndpointAssociationResponse {
  VpcEndpointAssociation?: VpcEndpointAssociation;
  VpcEndpointAssociationStatus?: VpcEndpointAssociationStatus;
}
export interface DeleteContainerAssociationRequest {
  ContainerAssociationName?: string;
  ContainerAssociationArn?: string;
}
export interface DeleteContainerAssociationResponse {
  ContainerAssociationName?: string;
  ContainerAssociationArn?: string;
  Status?: ContainerAssociationStatus;
}
export interface DeleteFirewallRequest {
  FirewallName?: string;
  FirewallArn?: string;
}
export interface DeleteFirewallResponse {
  Firewall?: Firewall;
  FirewallStatus?: FirewallStatus;
}
export interface DeleteFirewallPolicyRequest {
  FirewallPolicyName?: string;
  FirewallPolicyArn?: string;
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
  ProxyName?: string;
  ProxyArn?: string;
}
export interface DeleteProxyResponse {
  NatGatewayId?: string;
  ProxyName?: string;
  ProxyArn?: string;
}
export interface DeleteProxyConfigurationRequest {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
}
export interface DeleteProxyConfigurationResponse {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
}
export interface DeleteProxyRuleGroupRequest {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
}
export interface DeleteProxyRuleGroupResponse {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
}
export interface DeleteProxyRulesRequest {
  ProxyRuleGroupArn?: string;
  ProxyRuleGroupName?: string;
  Rules: string[];
}
export interface DeleteProxyRulesResponse {
  ProxyRuleGroup?: ProxyRuleGroup;
}
export interface DeleteResourcePolicyRequest {
  ResourceArn: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteRuleGroupRequest {
  RuleGroupName?: string;
  RuleGroupArn?: string;
  Type?: RuleGroupType;
}
export interface DeleteRuleGroupResponse {
  RuleGroupResponse: RuleGroupResponse;
}
export interface DeleteTLSInspectionConfigurationRequest {
  TLSInspectionConfigurationArn?: string;
  TLSInspectionConfigurationName?: string;
}
export interface DeleteTLSInspectionConfigurationResponse {
  TLSInspectionConfigurationResponse: TLSInspectionConfigurationResponse;
}
export interface DeleteVpcEndpointAssociationRequest {
  VpcEndpointAssociationArn: string;
}
export interface DeleteVpcEndpointAssociationResponse {
  VpcEndpointAssociation?: VpcEndpointAssociation;
  VpcEndpointAssociationStatus?: VpcEndpointAssociationStatus;
}
export interface DescribeContainerAssociationRequest {
  ContainerAssociationName?: string;
  ContainerAssociationArn?: string;
}
export type ContainerAssociationLastUpdatedTime = Date;
export interface DescribeContainerAssociationResponse {
  ContainerAssociationName?: string;
  ContainerAssociationArn?: string;
  Description?: string;
  Type?: ContainerMonitoringType;
  ContainerMonitoringConfigurations?: ContainerMonitoringConfiguration[];
  Status?: ContainerAssociationStatus;
  ResolvedCidrCount?: number;
  LastUpdatedTime?: Date;
  Tags?: Tag[];
  UpdateToken?: string;
}
export interface DescribeFirewallRequest {
  FirewallName?: string;
  FirewallArn?: string;
}
export interface DescribeFirewallResponse {
  UpdateToken?: string;
  Firewall?: Firewall;
  FirewallStatus?: FirewallStatus;
}
export interface DescribeFirewallMetadataRequest {
  FirewallArn?: string;
}
export interface AvailabilityZoneMetadata {
  IPAddressType?: IPAddressType;
}
export type SupportedAvailabilityZones = {
  [key: string]: AvailabilityZoneMetadata | undefined;
};
export interface DescribeFirewallMetadataResponse {
  FirewallArn?: string;
  FirewallPolicyArn?: string;
  Description?: string;
  Status?: FirewallStatusValue;
  SupportedAvailabilityZones?: {
    [key: string]: AvailabilityZoneMetadata | undefined;
  };
  TransitGatewayAttachmentId?: string;
}
export interface DescribeFirewallPolicyRequest {
  FirewallPolicyName?: string;
  FirewallPolicyArn?: string;
}
export interface DescribeFirewallPolicyResponse {
  UpdateToken: string;
  FirewallPolicyResponse: FirewallPolicyResponse;
  FirewallPolicy?: FirewallPolicy;
}
export type VpcEndpointId = string;
export type FlowOperationId = string;
export interface DescribeFlowOperationRequest {
  FirewallArn: string;
  AvailabilityZone?: string;
  VpcEndpointAssociationArn?: string;
  VpcEndpointId?: string;
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
  SourceAddress?: Address;
  DestinationAddress?: Address;
  SourcePort?: string;
  DestinationPort?: string;
  Protocols?: string[];
}
export type FlowFilters = FlowFilter[];
export interface FlowOperation {
  MinimumFlowAgeInSeconds?: number;
  FlowFilters?: FlowFilter[];
}
export interface DescribeFlowOperationResponse {
  FirewallArn?: string;
  AvailabilityZone?: string;
  VpcEndpointAssociationArn?: string;
  VpcEndpointId?: string;
  FlowOperationId?: string;
  FlowOperationType?: FlowOperationType;
  FlowOperationStatus?: FlowOperationStatus;
  StatusMessage?: string;
  FlowRequestTimestamp?: Date;
  FlowOperation?: FlowOperation;
}
export interface DescribeLoggingConfigurationRequest {
  FirewallArn?: string;
  FirewallName?: string;
}
export type LogType = "ALERT" | "FLOW" | "TLS" | (string & {});
export type LogDestinationType =
  | "S3"
  | "CloudWatchLogs"
  | "KinesisDataFirehose"
  | (string & {});
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
  FirewallArn?: string;
  LoggingConfiguration?: LoggingConfiguration;
  EnableMonitoringDashboard?: boolean;
}
export interface DescribeProxyRequest {
  ProxyName?: string;
  ProxyArn?: string;
}
export type VpcEndpointServiceName = string;
export type PrivateDNSName = string;
export interface DescribeProxyResource {
  ProxyName?: string;
  ProxyArn?: string;
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  NatGatewayId?: string;
  ProxyState?: ProxyState;
  ProxyModifyState?: ProxyModifyState;
  ListenerProperties?: ListenerProperty[];
  TlsInterceptProperties?: TlsInterceptProperties;
  VpcEndpointServiceName?: string;
  PrivateDNSName?: string;
  CreateTime?: Date;
  DeleteTime?: Date;
  UpdateTime?: Date;
  FailureCode?: string;
  FailureMessage?: string;
  Tags?: Tag[];
}
export interface DescribeProxyResponse {
  Proxy?: DescribeProxyResource;
  UpdateToken?: string;
}
export interface DescribeProxyConfigurationRequest {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
}
export interface DescribeProxyConfigurationResponse {
  ProxyConfiguration?: ProxyConfiguration;
  UpdateToken?: string;
}
export interface DescribeProxyRuleRequest {
  ProxyRuleName: string;
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
}
export interface DescribeProxyRuleResponse {
  ProxyRule?: ProxyRule;
  UpdateToken?: string;
}
export interface DescribeProxyRuleGroupRequest {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
}
export interface DescribeProxyRuleGroupResponse {
  ProxyRuleGroup?: ProxyRuleGroup;
  UpdateToken?: string;
}
export interface DescribeResourcePolicyRequest {
  ResourceArn: string;
}
export type PolicyString = string;
export interface DescribeResourcePolicyResponse {
  Policy?: string;
}
export interface DescribeRuleGroupRequest {
  RuleGroupName?: string;
  RuleGroupArn?: string;
  Type?: RuleGroupType;
  AnalyzeRuleGroup?: boolean;
}
export interface DescribeRuleGroupResponse {
  UpdateToken: string;
  RuleGroup?: RuleGroup;
  RuleGroupResponse: RuleGroupResponse;
}
export interface DescribeRuleGroupMetadataRequest {
  RuleGroupName?: string;
  RuleGroupArn?: string;
  Type?: RuleGroupType;
}
export type VendorName = string;
export type ProductId = string;
export type ListingName = string;
export interface DescribeRuleGroupMetadataResponse {
  RuleGroupArn: string;
  RuleGroupName: string;
  Description?: string;
  Type?: RuleGroupType;
  Capacity?: number;
  StatefulRuleOptions?: StatefulRuleOptions;
  LastModifiedTime?: Date;
  VendorName?: string;
  ProductId?: string;
  ListingName?: string;
}
export interface DescribeRuleGroupSummaryRequest {
  RuleGroupName?: string;
  RuleGroupArn?: string;
  Type?: RuleGroupType;
}
export interface RuleSummary {
  SID?: string;
  Msg?: string;
  Metadata?: string;
}
export type RuleSummaries = RuleSummary[];
export interface Summary {
  RuleSummaries?: RuleSummary[];
}
export interface DescribeRuleGroupSummaryResponse {
  RuleGroupName: string;
  Description?: string;
  Summary?: Summary;
}
export interface DescribeTLSInspectionConfigurationRequest {
  TLSInspectionConfigurationArn?: string;
  TLSInspectionConfigurationName?: string;
}
export interface DescribeTLSInspectionConfigurationResponse {
  UpdateToken: string;
  TLSInspectionConfiguration?: TLSInspectionConfiguration;
  TLSInspectionConfigurationResponse: TLSInspectionConfigurationResponse;
}
export interface DescribeVpcEndpointAssociationRequest {
  VpcEndpointAssociationArn: string;
}
export interface DescribeVpcEndpointAssociationResponse {
  VpcEndpointAssociation?: VpcEndpointAssociation;
  VpcEndpointAssociationStatus?: VpcEndpointAssociationStatus;
}
export interface DetachRuleGroupsFromProxyConfigurationRequest {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  RuleGroupNames?: string[];
  RuleGroupArns?: string[];
  UpdateToken: string;
}
export interface DetachRuleGroupsFromProxyConfigurationResponse {
  ProxyConfiguration?: ProxyConfiguration;
  UpdateToken?: string;
}
export interface DisassociateAvailabilityZonesRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  AvailabilityZoneMappings: AvailabilityZoneMapping[];
}
export interface DisassociateAvailabilityZonesResponse {
  FirewallArn?: string;
  FirewallName?: string;
  AvailabilityZoneMappings?: AvailabilityZoneMapping[];
  UpdateToken?: string;
}
export type AzSubnets = string[];
export interface DisassociateSubnetsRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  SubnetIds: string[];
}
export interface DisassociateSubnetsResponse {
  FirewallArn?: string;
  FirewallName?: string;
  SubnetMappings?: SubnetMapping[];
  UpdateToken?: string;
}
export type AnalysisReportId = string;
export type AnalysisReportNextToken = string;
export type PaginationMaxResults = number;
export interface GetAnalysisReportResultsRequest {
  FirewallName?: string;
  AnalysisReportId: string;
  FirewallArn?: string;
  NextToken?: string;
  MaxResults?: number;
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
  Count?: number;
}
export interface UniqueSources {
  Count?: number;
}
export interface AnalysisTypeReportResult {
  Protocol?: string;
  FirstAccessed?: Date;
  LastAccessed?: Date;
  Domain?: string;
  Hits?: Hits;
  UniqueSources?: UniqueSources;
}
export type AnalysisReportResults = AnalysisTypeReportResult[];
export interface GetAnalysisReportResultsResponse {
  Status?: string;
  StartTime?: Date;
  EndTime?: Date;
  ReportTime?: Date;
  AnalysisType?: EnabledAnalysisType;
  NextToken?: string;
  AnalysisReportResults?: AnalysisTypeReportResult[];
}
export type PaginationToken = string;
export interface ListAnalysisReportsRequest {
  FirewallName?: string;
  FirewallArn?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface AnalysisReport {
  AnalysisReportId?: string;
  AnalysisType?: EnabledAnalysisType;
  ReportTime?: Date;
  Status?: string;
}
export type AnalysisReports = AnalysisReport[];
export interface ListAnalysisReportsResponse {
  AnalysisReports?: AnalysisReport[];
  NextToken?: string;
}
export interface ListContainerAssociationsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface ContainerAssociationSummary {
  Arn?: string;
  Name?: string;
}
export type ContainerAssociations = ContainerAssociationSummary[];
export interface ListContainerAssociationsResponse {
  ContainerAssociations?: ContainerAssociationSummary[];
  NextToken?: string;
}
export interface ListFirewallPoliciesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface FirewallPolicyMetadata {
  Name?: string;
  Arn?: string;
}
export type FirewallPolicies = FirewallPolicyMetadata[];
export interface ListFirewallPoliciesResponse {
  NextToken?: string;
  FirewallPolicies?: FirewallPolicyMetadata[];
}
export type VpcIds = string[];
export interface ListFirewallsRequest {
  NextToken?: string;
  VpcIds?: string[];
  MaxResults?: number;
}
export interface FirewallMetadata {
  FirewallName?: string;
  FirewallArn?: string;
  TransitGatewayAttachmentId?: string;
}
export type Firewalls = FirewallMetadata[];
export interface ListFirewallsResponse {
  NextToken?: string;
  Firewalls?: FirewallMetadata[];
}
export interface ListFlowOperationResultsRequest {
  FirewallArn: string;
  FlowOperationId: string;
  NextToken?: string;
  MaxResults?: number;
  AvailabilityZone?: string;
  VpcEndpointId?: string;
  VpcEndpointAssociationArn?: string;
}
export type PacketCount = number;
export type ByteCount = number;
export interface Flow {
  SourceAddress?: Address;
  DestinationAddress?: Address;
  SourcePort?: string;
  DestinationPort?: string;
  Protocol?: string;
  Age?: number;
  PacketCount?: number;
  ByteCount?: number;
}
export type Flows = Flow[];
export interface ListFlowOperationResultsResponse {
  FirewallArn?: string;
  AvailabilityZone?: string;
  VpcEndpointAssociationArn?: string;
  VpcEndpointId?: string;
  FlowOperationId?: string;
  FlowOperationStatus?: FlowOperationStatus;
  StatusMessage?: string;
  FlowRequestTimestamp?: Date;
  Flows?: Flow[];
  NextToken?: string;
}
export interface ListFlowOperationsRequest {
  FirewallArn: string;
  AvailabilityZone?: string;
  VpcEndpointAssociationArn?: string;
  VpcEndpointId?: string;
  FlowOperationType?: FlowOperationType;
  NextToken?: string;
  MaxResults?: number;
}
export interface FlowOperationMetadata {
  FlowOperationId?: string;
  FlowOperationType?: FlowOperationType;
  FlowRequestTimestamp?: Date;
  FlowOperationStatus?: FlowOperationStatus;
}
export type FlowOperations = FlowOperationMetadata[];
export interface ListFlowOperationsResponse {
  FlowOperations?: FlowOperationMetadata[];
  NextToken?: string;
}
export interface ListProxiesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ProxyMetadata {
  Name?: string;
  Arn?: string;
}
export type Proxies = ProxyMetadata[];
export interface ListProxiesResponse {
  Proxies?: ProxyMetadata[];
  NextToken?: string;
}
export interface ListProxyConfigurationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ProxyConfigurationMetadata {
  Name?: string;
  Arn?: string;
}
export type ProxyConfigurations = ProxyConfigurationMetadata[];
export interface ListProxyConfigurationsResponse {
  ProxyConfigurations?: ProxyConfigurationMetadata[];
  NextToken?: string;
}
export interface ListProxyRuleGroupsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ProxyRuleGroupMetadata {
  Name?: string;
  Arn?: string;
}
export type ProxyRuleGroups = ProxyRuleGroupMetadata[];
export interface ListProxyRuleGroupsResponse {
  ProxyRuleGroups?: ProxyRuleGroupMetadata[];
  NextToken?: string;
}
export type ResourceManagedStatus = "MANAGED" | "ACCOUNT" | (string & {});
export type ResourceManagedType =
  | "AWS_MANAGED_THREAT_SIGNATURES"
  | "AWS_MANAGED_DOMAIN_LISTS"
  | "ACTIVE_THREAT_DEFENSE"
  | "PARTNER_MANAGED"
  | (string & {});
export type SubscriptionStatus =
  | "NOT_SUBSCRIBED"
  | "SUBSCRIBED"
  | (string & {});
export interface ListRuleGroupsRequest {
  NextToken?: string;
  MaxResults?: number;
  Scope?: ResourceManagedStatus;
  ManagedType?: ResourceManagedType;
  SubscriptionStatus?: SubscriptionStatus;
  Type?: RuleGroupType;
}
export interface RuleGroupMetadata {
  Name?: string;
  Arn?: string;
  VendorName?: string;
}
export type RuleGroups = RuleGroupMetadata[];
export interface ListRuleGroupsResponse {
  NextToken?: string;
  RuleGroups?: RuleGroupMetadata[];
}
export type TagsPaginationMaxResults = number;
export interface ListTagsForResourceRequest {
  NextToken?: string;
  MaxResults?: number;
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  NextToken?: string;
  Tags?: Tag[];
}
export interface ListTLSInspectionConfigurationsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface TLSInspectionConfigurationMetadata {
  Name?: string;
  Arn?: string;
}
export type TLSInspectionConfigurations = TLSInspectionConfigurationMetadata[];
export interface ListTLSInspectionConfigurationsResponse {
  NextToken?: string;
  TLSInspectionConfigurations?: TLSInspectionConfigurationMetadata[];
}
export interface ListVpcEndpointAssociationsRequest {
  NextToken?: string;
  MaxResults?: number;
  FirewallArn?: string;
}
export interface VpcEndpointAssociationMetadata {
  VpcEndpointAssociationArn?: string;
}
export type VpcEndpointAssociations = VpcEndpointAssociationMetadata[];
export interface ListVpcEndpointAssociationsResponse {
  NextToken?: string;
  VpcEndpointAssociations?: VpcEndpointAssociationMetadata[];
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
  FirewallName?: string;
  FirewallArn?: string;
  AnalysisType: EnabledAnalysisType;
}
export interface StartAnalysisReportResponse {
  AnalysisReportId: string;
}
export interface StartFlowCaptureRequest {
  FirewallArn: string;
  AvailabilityZone?: string;
  VpcEndpointAssociationArn?: string;
  VpcEndpointId?: string;
  MinimumFlowAgeInSeconds?: number;
  FlowFilters: FlowFilter[];
}
export interface StartFlowCaptureResponse {
  FirewallArn?: string;
  FlowOperationId?: string;
  FlowOperationStatus?: FlowOperationStatus;
}
export interface StartFlowFlushRequest {
  FirewallArn: string;
  AvailabilityZone?: string;
  VpcEndpointAssociationArn?: string;
  VpcEndpointId?: string;
  MinimumFlowAgeInSeconds?: number;
  FlowFilters: FlowFilter[];
}
export interface StartFlowFlushResponse {
  FirewallArn?: string;
  FlowOperationId?: string;
  FlowOperationStatus?: FlowOperationStatus;
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
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  AvailabilityZoneChangeProtection: boolean;
}
export interface UpdateAvailabilityZoneChangeProtectionResponse {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  AvailabilityZoneChangeProtection?: boolean;
}
export interface UpdateContainerAssociationRequest {
  ContainerAssociationName?: string;
  ContainerAssociationArn?: string;
  Description?: string;
  Type: ContainerMonitoringType;
  ContainerMonitoringConfigurations: ContainerMonitoringConfiguration[];
  Tags?: Tag[];
  UpdateToken: string;
}
export interface UpdateContainerAssociationResponse {
  ContainerAssociationName?: string;
  ContainerAssociationArn?: string;
  Description?: string;
  Type?: ContainerMonitoringType;
  ContainerMonitoringConfigurations?: ContainerMonitoringConfiguration[];
  Status?: ContainerAssociationStatus;
  Tags?: Tag[];
  UpdateToken?: string;
}
export interface UpdateFirewallAnalysisSettingsRequest {
  EnabledAnalysisTypes?: EnabledAnalysisType[];
  FirewallArn?: string;
  FirewallName?: string;
  UpdateToken?: string;
}
export interface UpdateFirewallAnalysisSettingsResponse {
  EnabledAnalysisTypes?: EnabledAnalysisType[];
  FirewallArn?: string;
  FirewallName?: string;
  UpdateToken?: string;
}
export interface UpdateFirewallDeleteProtectionRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  DeleteProtection: boolean;
}
export interface UpdateFirewallDeleteProtectionResponse {
  FirewallArn?: string;
  FirewallName?: string;
  DeleteProtection?: boolean;
  UpdateToken?: string;
}
export interface UpdateFirewallDescriptionRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  Description?: string;
}
export interface UpdateFirewallDescriptionResponse {
  FirewallArn?: string;
  FirewallName?: string;
  Description?: string;
  UpdateToken?: string;
}
export interface UpdateFirewallEncryptionConfigurationRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  EncryptionConfiguration?: EncryptionConfiguration;
}
export interface UpdateFirewallEncryptionConfigurationResponse {
  FirewallArn?: string;
  FirewallName?: string;
  UpdateToken?: string;
  EncryptionConfiguration?: EncryptionConfiguration;
}
export interface UpdateFirewallPolicyRequest {
  UpdateToken: string;
  FirewallPolicyArn?: string;
  FirewallPolicyName?: string;
  FirewallPolicy: FirewallPolicy;
  Description?: string;
  DryRun?: boolean;
  EncryptionConfiguration?: EncryptionConfiguration;
}
export interface UpdateFirewallPolicyResponse {
  UpdateToken: string;
  FirewallPolicyResponse: FirewallPolicyResponse;
}
export interface UpdateFirewallPolicyChangeProtectionRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  FirewallPolicyChangeProtection: boolean;
}
export interface UpdateFirewallPolicyChangeProtectionResponse {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  FirewallPolicyChangeProtection?: boolean;
}
export interface UpdateLoggingConfigurationRequest {
  FirewallArn?: string;
  FirewallName?: string;
  LoggingConfiguration?: LoggingConfiguration;
  EnableMonitoringDashboard?: boolean;
}
export interface UpdateLoggingConfigurationResponse {
  FirewallArn?: string;
  FirewallName?: string;
  LoggingConfiguration?: LoggingConfiguration;
  EnableMonitoringDashboard?: boolean;
}
export interface UpdateProxyRequest {
  NatGatewayId: string;
  ProxyName?: string;
  ProxyArn?: string;
  ListenerPropertiesToAdd?: ListenerPropertyRequest[];
  ListenerPropertiesToRemove?: ListenerPropertyRequest[];
  TlsInterceptProperties?: TlsInterceptPropertiesRequest;
  UpdateToken: string;
}
export interface UpdateProxyResponse {
  Proxy?: Proxy;
  UpdateToken?: string;
}
export interface UpdateProxyConfigurationRequest {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  DefaultRulePhaseActions: ProxyConfigDefaultRulePhaseActionsRequest;
  UpdateToken: string;
}
export interface UpdateProxyConfigurationResponse {
  ProxyConfiguration?: ProxyConfiguration;
  UpdateToken?: string;
}
export interface UpdateProxyRuleRequest {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
  ProxyRuleName: string;
  Description?: string;
  Action?: ProxyRulePhaseAction;
  AddConditions?: ProxyRuleCondition[];
  RemoveConditions?: ProxyRuleCondition[];
  UpdateToken: string;
}
export interface UpdateProxyRuleResponse {
  ProxyRule?: ProxyRule;
  RemovedConditions?: ProxyRuleCondition[];
  UpdateToken?: string;
}
export interface ProxyRuleGroupPriority {
  ProxyRuleGroupName?: string;
  NewPosition?: number;
}
export type ProxyRuleGroupPriorityList = ProxyRuleGroupPriority[];
export interface UpdateProxyRuleGroupPrioritiesRequest {
  ProxyConfigurationName?: string;
  ProxyConfigurationArn?: string;
  RuleGroups: ProxyRuleGroupPriority[];
  UpdateToken: string;
}
export type ProxyRuleGroupPriorityResultPriority = number;
export interface ProxyRuleGroupPriorityResult {
  ProxyRuleGroupName?: string;
  Priority?: number;
}
export type ProxyRuleGroupPriorityResultList = ProxyRuleGroupPriorityResult[];
export interface UpdateProxyRuleGroupPrioritiesResponse {
  ProxyRuleGroups?: ProxyRuleGroupPriorityResult[];
  UpdateToken?: string;
}
export type RuleGroupRequestPhase =
  | "PRE_DNS"
  | "PRE_REQ"
  | "POST_RES"
  | (string & {});
export interface ProxyRulePriority {
  ProxyRuleName?: string;
  NewPosition?: number;
}
export type ProxyRulePriorityList = ProxyRulePriority[];
export interface UpdateProxyRulePrioritiesRequest {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
  RuleGroupRequestPhase: RuleGroupRequestPhase;
  Rules: ProxyRulePriority[];
  UpdateToken: string;
}
export interface UpdateProxyRulePrioritiesResponse {
  ProxyRuleGroupName?: string;
  ProxyRuleGroupArn?: string;
  RuleGroupRequestPhase?: RuleGroupRequestPhase;
  Rules?: ProxyRulePriority[];
  UpdateToken?: string;
}
export interface UpdateProxySettingsRequest {
  FirewallArn?: string;
  FirewallName?: string;
  UpdateToken?: string;
  ProxySettings?: ProxySettings;
}
export interface UpdateProxySettingsResponse {
  FirewallArn?: string;
  FirewallName?: string;
  UpdateToken?: string;
  ProxySettings?: ProxySettings;
}
export interface UpdateRuleGroupRequest {
  UpdateToken: string;
  RuleGroupArn?: string;
  RuleGroupName?: string;
  RuleGroup?: RuleGroup;
  Rules?: string;
  Type?: RuleGroupType;
  Description?: string;
  DryRun?: boolean;
  EncryptionConfiguration?: EncryptionConfiguration;
  SourceMetadata?: SourceMetadata;
  AnalyzeRuleGroup?: boolean;
  SummaryConfiguration?: SummaryConfiguration;
}
export interface UpdateRuleGroupResponse {
  UpdateToken: string;
  RuleGroupResponse: RuleGroupResponse;
}
export interface UpdateSubnetChangeProtectionRequest {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  SubnetChangeProtection: boolean;
}
export interface UpdateSubnetChangeProtectionResponse {
  UpdateToken?: string;
  FirewallArn?: string;
  FirewallName?: string;
  SubnetChangeProtection?: boolean;
}
export interface UpdateTLSInspectionConfigurationRequest {
  TLSInspectionConfigurationArn?: string;
  TLSInspectionConfigurationName?: string;
  TLSInspectionConfiguration: TLSInspectionConfiguration;
  Description?: string;
  EncryptionConfiguration?: EncryptionConfiguration;
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
  AcceptNetworkFirewallTransitGatewayAttachmentRequest,
  AcceptNetworkFirewallTransitGatewayAttachmentResponse,
  AcceptNetworkFirewallTransitGatewayAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TransitGatewayAttachmentId: 0 } },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptNetworkFirewallTransitGatewayAttachment",
})) as any;

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
  AssociateAvailabilityZonesRequest,
  AssociateAvailabilityZonesResponse,
  AssociateAvailabilityZonesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UpdateToken: 0,
      FirewallArn: 0,
      FirewallName: 0,
      AvailabilityZoneMappings: D.list(i_AvailabilityZoneMapping),
    },
  },
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
})) as any;

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
  AssociateFirewallPolicyRequest,
  AssociateFirewallPolicyResponse,
  AssociateFirewallPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UpdateToken: 0,
      FirewallArn: 0,
      FirewallName: 0,
      FirewallPolicyArn: 0,
    },
  },
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
})) as any;

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
  AssociateSubnetsRequest,
  AssociateSubnetsResponse,
  AssociateSubnetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UpdateToken: 0,
      FirewallArn: 0,
      FirewallName: 0,
      SubnetMappings: D.list(i_SubnetMapping),
    },
  },
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
})) as any;

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
  AttachRuleGroupsToProxyConfigurationRequest,
  AttachRuleGroupsToProxyConfigurationResponse,
  AttachRuleGroupsToProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProxyConfigurationName: 0,
      ProxyConfigurationArn: 0,
      RuleGroups: D.list({ ProxyRuleGroupName: 0, InsertPosition: 0 }),
      UpdateToken: 0,
    },
    output: { ProxyConfiguration: o_ProxyConfiguration },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AttachRuleGroupsToProxyConfiguration",
})) as any;

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
  CreateContainerAssociationRequest,
  CreateContainerAssociationResponse,
  CreateContainerAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ContainerAssociationName: 0,
      Description: 0,
      Type: 0,
      ContainerMonitoringConfigurations: D.list(
        i_ContainerMonitoringConfiguration,
      ),
      Tags: D.list(i_Tag),
    },
  },
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
})) as any;

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
  CreateFirewallRequest,
  CreateFirewallResponse,
  CreateFirewallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallName: 0,
      FirewallPolicyArn: 0,
      VpcId: 0,
      SubnetMappings: D.list(i_SubnetMapping),
      DeleteProtection: 0,
      SubnetChangeProtection: 0,
      FirewallPolicyChangeProtection: 0,
      Description: 0,
      Tags: D.list(i_Tag),
      EncryptionConfiguration: i_EncryptionConfiguration,
      EnabledAnalysisTypes: 0,
      TransitGatewayId: 0,
      AvailabilityZoneMappings: D.list(i_AvailabilityZoneMapping),
      AvailabilityZoneChangeProtection: 0,
      NatGatewayMappings: D.list({ NatGatewayId: 0 }),
      ProxySettings: i_ProxySettings,
      NoSourcePreservation: 0,
      VpcEndpoint: { VpcId: 0, SubnetMappings: D.list(i_SubnetMapping) },
    },
  },
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
})) as any;

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
  CreateFirewallPolicyRequest,
  CreateFirewallPolicyResponse,
  CreateFirewallPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallPolicyName: 0,
      FirewallPolicy: i_FirewallPolicy,
      Description: 0,
      Tags: D.list(i_Tag),
      DryRun: 0,
      EncryptionConfiguration: i_EncryptionConfiguration,
    },
    output: { FirewallPolicyResponse: o_FirewallPolicyResponse },
  },
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
})) as any;

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
  CreateProxyRequest,
  CreateProxyResponse,
  CreateProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProxyName: 0,
      NatGatewayId: 0,
      ProxyConfigurationName: 0,
      ProxyConfigurationArn: 0,
      ListenerProperties: D.list(i_ListenerPropertyRequest),
      TlsInterceptProperties: i_TlsInterceptPropertiesRequest,
      Tags: D.list(i_Tag),
    },
    output: { Proxy: o_Proxy },
  },
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
})) as any;

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
  CreateProxyConfigurationRequest,
  CreateProxyConfigurationResponse,
  CreateProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProxyConfigurationName: 0,
      Description: 0,
      RuleGroupNames: 0,
      RuleGroupArns: 0,
      DefaultRulePhaseActions: i_ProxyConfigDefaultRulePhaseActionsRequest,
      Tags: D.list(i_Tag),
    },
    output: { ProxyConfiguration: o_ProxyConfiguration },
  },
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
})) as any;

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
  CreateProxyRuleGroupRequest,
  CreateProxyRuleGroupResponse,
  CreateProxyRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProxyRuleGroupName: 0,
      Description: 0,
      Rules: {
        PreDNS: D.list(i_ProxyRule),
        PreREQUEST: D.list(i_ProxyRule),
        PostRESPONSE: D.list(i_ProxyRule),
      },
      Tags: D.list(i_Tag),
    },
    output: { ProxyRuleGroup: o_ProxyRuleGroup },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProxyRuleGroup",
})) as any;

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
  CreateProxyRulesRequest,
  CreateProxyRulesResponse,
  CreateProxyRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProxyRuleGroupArn: 0,
      ProxyRuleGroupName: 0,
      Rules: {
        PreDNS: D.list(i_CreateProxyRule),
        PreREQUEST: D.list(i_CreateProxyRule),
        PostRESPONSE: D.list(i_CreateProxyRule),
      },
    },
    output: { ProxyRuleGroup: o_ProxyRuleGroup },
  },
  errors: [InternalServerError, InvalidRequestException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProxyRules",
})) as any;

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
  CreateRuleGroupRequest,
  CreateRuleGroupResponse,
  CreateRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      RuleGroupName: 0,
      RuleGroup: i_RuleGroup,
      Rules: 0,
      Type: 0,
      Description: 0,
      Capacity: 0,
      Tags: D.list(i_Tag),
      DryRun: 0,
      EncryptionConfiguration: i_EncryptionConfiguration,
      SourceMetadata: i_SourceMetadata,
      AnalyzeRuleGroup: 0,
      SummaryConfiguration: i_SummaryConfiguration,
    },
    output: { RuleGroupResponse: o_RuleGroupResponse },
  },
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
})) as any;

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
  CreateTLSInspectionConfigurationRequest,
  CreateTLSInspectionConfigurationResponse,
  CreateTLSInspectionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TLSInspectionConfigurationName: 0,
      TLSInspectionConfiguration: i_TLSInspectionConfiguration,
      Description: 0,
      Tags: D.list(i_Tag),
      EncryptionConfiguration: i_EncryptionConfiguration,
    },
    output: {
      TLSInspectionConfigurationResponse: o_TLSInspectionConfigurationResponse,
    },
  },
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
})) as any;

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
  CreateVpcEndpointAssociationRequest,
  CreateVpcEndpointAssociationResponse,
  CreateVpcEndpointAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallArn: 0,
      VpcId: 0,
      SubnetMapping: i_SubnetMapping,
      Description: 0,
      Tags: D.list(i_Tag),
    },
  },
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
})) as any;

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
  DeleteContainerAssociationRequest,
  DeleteContainerAssociationResponse,
  DeleteContainerAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ContainerAssociationName: 0, ContainerAssociationArn: 0 },
  },
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
})) as any;

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
  DeleteFirewallRequest,
  DeleteFirewallResponse,
  DeleteFirewallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FirewallName: 0, FirewallArn: 0 } },
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
})) as any;

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
  DeleteFirewallPolicyRequest,
  DeleteFirewallPolicyResponse,
  DeleteFirewallPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { FirewallPolicyName: 0, FirewallPolicyArn: 0 },
    output: { FirewallPolicyResponse: o_FirewallPolicyResponse },
  },
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
})) as any;

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
  DeleteNetworkFirewallTransitGatewayAttachmentRequest,
  DeleteNetworkFirewallTransitGatewayAttachmentResponse,
  DeleteNetworkFirewallTransitGatewayAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TransitGatewayAttachmentId: 0 } },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNetworkFirewallTransitGatewayAttachment",
})) as any;

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
  DeleteProxyRequest,
  DeleteProxyResponse,
  DeleteProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NatGatewayId: 0, ProxyName: 0, ProxyArn: 0 },
  },
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
})) as any;

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
  DeleteProxyConfigurationRequest,
  DeleteProxyConfigurationResponse,
  DeleteProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProxyConfigurationName: 0, ProxyConfigurationArn: 0 },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProxyConfiguration",
})) as any;

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
  DeleteProxyRuleGroupRequest,
  DeleteProxyRuleGroupResponse,
  DeleteProxyRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProxyRuleGroupName: 0, ProxyRuleGroupArn: 0 },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProxyRuleGroup",
})) as any;

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
  DeleteProxyRulesRequest,
  DeleteProxyRulesResponse,
  DeleteProxyRulesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProxyRuleGroupArn: 0, ProxyRuleGroupName: 0, Rules: 0 },
    output: { ProxyRuleGroup: o_ProxyRuleGroup },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProxyRules",
})) as any;

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
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
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
})) as any;

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
  DeleteRuleGroupRequest,
  DeleteRuleGroupResponse,
  DeleteRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RuleGroupName: 0, RuleGroupArn: 0, Type: 0 },
    output: { RuleGroupResponse: o_RuleGroupResponse },
  },
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
})) as any;

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
  DeleteTLSInspectionConfigurationRequest,
  DeleteTLSInspectionConfigurationResponse,
  DeleteTLSInspectionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TLSInspectionConfigurationArn: 0,
      TLSInspectionConfigurationName: 0,
    },
    output: {
      TLSInspectionConfigurationResponse: o_TLSInspectionConfigurationResponse,
    },
  },
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
})) as any;

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
  DeleteVpcEndpointAssociationRequest,
  DeleteVpcEndpointAssociationResponse,
  DeleteVpcEndpointAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { VpcEndpointAssociationArn: 0 } },
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
})) as any;

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
  DescribeContainerAssociationRequest,
  DescribeContainerAssociationResponse,
  DescribeContainerAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ContainerAssociationName: 0, ContainerAssociationArn: 0 },
    output: { LastUpdatedTime: D.ts },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeContainerAssociation",
})) as any;

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
  DescribeFirewallRequest,
  DescribeFirewallResponse,
  DescribeFirewallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FirewallName: 0, FirewallArn: 0 } },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFirewall",
})) as any;

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
  DescribeFirewallMetadataRequest,
  DescribeFirewallMetadataResponse,
  DescribeFirewallMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FirewallArn: 0 } },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFirewallMetadata",
})) as any;

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
  DescribeFirewallPolicyRequest,
  DescribeFirewallPolicyResponse,
  DescribeFirewallPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { FirewallPolicyName: 0, FirewallPolicyArn: 0 },
    output: { FirewallPolicyResponse: o_FirewallPolicyResponse },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFirewallPolicy",
})) as any;

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
  DescribeFlowOperationRequest,
  DescribeFlowOperationResponse,
  DescribeFlowOperationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallArn: 0,
      AvailabilityZone: 0,
      VpcEndpointAssociationArn: 0,
      VpcEndpointId: 0,
      FlowOperationId: 0,
    },
    output: { FlowRequestTimestamp: D.ts },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeFlowOperation",
})) as any;

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
  DescribeLoggingConfigurationRequest,
  DescribeLoggingConfigurationResponse,
  DescribeLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FirewallArn: 0, FirewallName: 0 } },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoggingConfiguration",
})) as any;

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
  DescribeProxyRequest,
  DescribeProxyResponse,
  DescribeProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProxyName: 0, ProxyArn: 0 },
    output: { Proxy: { CreateTime: D.ts, DeleteTime: D.ts, UpdateTime: D.ts } },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProxy",
})) as any;

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
  DescribeProxyConfigurationRequest,
  DescribeProxyConfigurationResponse,
  DescribeProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProxyConfigurationName: 0, ProxyConfigurationArn: 0 },
    output: { ProxyConfiguration: o_ProxyConfiguration },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProxyConfiguration",
})) as any;

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
  DescribeProxyRuleRequest,
  DescribeProxyRuleResponse,
  DescribeProxyRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProxyRuleName: 0, ProxyRuleGroupName: 0, ProxyRuleGroupArn: 0 },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProxyRule",
})) as any;

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
  DescribeProxyRuleGroupRequest,
  DescribeProxyRuleGroupResponse,
  DescribeProxyRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ProxyRuleGroupName: 0, ProxyRuleGroupArn: 0 },
    output: { ProxyRuleGroup: o_ProxyRuleGroup },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeProxyRuleGroup",
})) as any;

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
  DescribeResourcePolicyRequest,
  DescribeResourcePolicyResponse,
  DescribeResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourcePolicy",
})) as any;

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
  DescribeRuleGroupRequest,
  DescribeRuleGroupResponse,
  DescribeRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RuleGroupName: 0, RuleGroupArn: 0, Type: 0, AnalyzeRuleGroup: 0 },
    output: { RuleGroupResponse: o_RuleGroupResponse },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuleGroup",
})) as any;

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
  DescribeRuleGroupMetadataRequest,
  DescribeRuleGroupMetadataResponse,
  DescribeRuleGroupMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RuleGroupName: 0, RuleGroupArn: 0, Type: 0 },
    output: { LastModifiedTime: D.ts },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuleGroupMetadata",
})) as any;

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
  DescribeRuleGroupSummaryRequest,
  DescribeRuleGroupSummaryResponse,
  DescribeRuleGroupSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { RuleGroupName: 0, RuleGroupArn: 0, Type: 0 },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuleGroupSummary",
})) as any;

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
  DescribeTLSInspectionConfigurationRequest,
  DescribeTLSInspectionConfigurationResponse,
  DescribeTLSInspectionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TLSInspectionConfigurationArn: 0,
      TLSInspectionConfigurationName: 0,
    },
    output: {
      TLSInspectionConfigurationResponse: o_TLSInspectionConfigurationResponse,
    },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTLSInspectionConfiguration",
})) as any;

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
  DescribeVpcEndpointAssociationRequest,
  DescribeVpcEndpointAssociationResponse,
  DescribeVpcEndpointAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { VpcEndpointAssociationArn: 0 } },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeVpcEndpointAssociation",
})) as any;

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
  DetachRuleGroupsFromProxyConfigurationRequest,
  DetachRuleGroupsFromProxyConfigurationResponse,
  DetachRuleGroupsFromProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProxyConfigurationName: 0,
      ProxyConfigurationArn: 0,
      RuleGroupNames: 0,
      RuleGroupArns: 0,
      UpdateToken: 0,
    },
    output: { ProxyConfiguration: o_ProxyConfiguration },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DetachRuleGroupsFromProxyConfiguration",
})) as any;

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
  DisassociateAvailabilityZonesRequest,
  DisassociateAvailabilityZonesResponse,
  DisassociateAvailabilityZonesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UpdateToken: 0,
      FirewallArn: 0,
      FirewallName: 0,
      AvailabilityZoneMappings: D.list(i_AvailabilityZoneMapping),
    },
  },
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
})) as any;

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
  DisassociateSubnetsRequest,
  DisassociateSubnetsResponse,
  DisassociateSubnetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UpdateToken: 0, FirewallArn: 0, FirewallName: 0, SubnetIds: 0 },
  },
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
})) as any;

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
  GetAnalysisReportResultsRequest,
  GetAnalysisReportResultsResponse,
  GetAnalysisReportResultsError,
  Credentials | HttpClient.HttpClient,
  AnalysisTypeReportResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallName: 0,
      AnalysisReportId: 0,
      FirewallArn: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: {
      StartTime: D.ts,
      EndTime: D.ts,
      ReportTime: D.ts,
      AnalysisReportResults: D.list({
        FirstAccessed: D.ts,
        LastAccessed: D.ts,
      }),
    },
  },
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
  ListAnalysisReportsRequest,
  ListAnalysisReportsResponse,
  ListAnalysisReportsError,
  Credentials | HttpClient.HttpClient,
  AnalysisReport
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { FirewallName: 0, FirewallArn: 0, NextToken: 0, MaxResults: 0 },
    output: { AnalysisReports: D.list({ ReportTime: D.ts }) },
  },
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
  ListContainerAssociationsRequest,
  ListContainerAssociationsResponse,
  ListContainerAssociationsError,
  Credentials | HttpClient.HttpClient,
  ContainerAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
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
  ListFirewallPoliciesRequest,
  ListFirewallPoliciesResponse,
  ListFirewallPoliciesError,
  Credentials | HttpClient.HttpClient,
  FirewallPolicyMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
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
  ListFirewallsRequest,
  ListFirewallsResponse,
  ListFirewallsError,
  Credentials | HttpClient.HttpClient,
  FirewallMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, VpcIds: 0, MaxResults: 0 },
  },
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
  ListFlowOperationResultsRequest,
  ListFlowOperationResultsResponse,
  ListFlowOperationResultsError,
  Credentials | HttpClient.HttpClient,
  Flow
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallArn: 0,
      FlowOperationId: 0,
      NextToken: 0,
      MaxResults: 0,
      AvailabilityZone: 0,
      VpcEndpointId: 0,
      VpcEndpointAssociationArn: 0,
    },
    output: { FlowRequestTimestamp: D.ts },
  },
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
  ListFlowOperationsRequest,
  ListFlowOperationsResponse,
  ListFlowOperationsError,
  Credentials | HttpClient.HttpClient,
  FlowOperationMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallArn: 0,
      AvailabilityZone: 0,
      VpcEndpointAssociationArn: 0,
      VpcEndpointId: 0,
      FlowOperationType: 0,
      NextToken: 0,
      MaxResults: 0,
    },
    output: { FlowOperations: D.list({ FlowRequestTimestamp: D.ts }) },
  },
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
  ListProxiesRequest,
  ListProxiesResponse,
  ListProxiesError,
  Credentials | HttpClient.HttpClient,
  ProxyMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
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
  ListProxyConfigurationsRequest,
  ListProxyConfigurationsResponse,
  ListProxyConfigurationsError,
  Credentials | HttpClient.HttpClient,
  ProxyConfigurationMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
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
  ListProxyRuleGroupsRequest,
  ListProxyRuleGroupsResponse,
  ListProxyRuleGroupsError,
  Credentials | HttpClient.HttpClient,
  ProxyRuleGroupMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
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
  ListRuleGroupsRequest,
  ListRuleGroupsResponse,
  ListRuleGroupsError,
  Credentials | HttpClient.HttpClient,
  RuleGroupMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      NextToken: 0,
      MaxResults: 0,
      Scope: 0,
      ManagedType: 0,
      SubscriptionStatus: 0,
      Type: 0,
    },
  },
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
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  Tag
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, ResourceArn: 0 },
  },
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
  ListTLSInspectionConfigurationsRequest,
  ListTLSInspectionConfigurationsResponse,
  ListTLSInspectionConfigurationsError,
  Credentials | HttpClient.HttpClient,
  TLSInspectionConfigurationMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
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
  ListVpcEndpointAssociationsRequest,
  ListVpcEndpointAssociationsResponse,
  ListVpcEndpointAssociationsError,
  Credentials | HttpClient.HttpClient,
  VpcEndpointAssociationMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0, FirewallArn: 0 },
  },
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
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Policy: 0 } },
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
})) as any;

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
  RejectNetworkFirewallTransitGatewayAttachmentRequest,
  RejectNetworkFirewallTransitGatewayAttachmentResponse,
  RejectNetworkFirewallTransitGatewayAttachmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { TransitGatewayAttachmentId: 0 } },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectNetworkFirewallTransitGatewayAttachment",
})) as any;

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
  StartAnalysisReportRequest,
  StartAnalysisReportResponse,
  StartAnalysisReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { FirewallName: 0, FirewallArn: 0, AnalysisType: 0 },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAnalysisReport",
})) as any;

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
  StartFlowCaptureRequest,
  StartFlowCaptureResponse,
  StartFlowCaptureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallArn: 0,
      AvailabilityZone: 0,
      VpcEndpointAssociationArn: 0,
      VpcEndpointId: 0,
      MinimumFlowAgeInSeconds: 0,
      FlowFilters: D.list(i_FlowFilter),
    },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFlowCapture",
})) as any;

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
  StartFlowFlushRequest,
  StartFlowFlushResponse,
  StartFlowFlushError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallArn: 0,
      AvailabilityZone: 0,
      VpcEndpointAssociationArn: 0,
      VpcEndpointId: 0,
      MinimumFlowAgeInSeconds: 0,
      FlowFilters: D.list(i_FlowFilter),
    },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFlowFlush",
})) as any;

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
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  UpdateAvailabilityZoneChangeProtectionRequest,
  UpdateAvailabilityZoneChangeProtectionResponse,
  UpdateAvailabilityZoneChangeProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UpdateToken: 0,
      FirewallArn: 0,
      FirewallName: 0,
      AvailabilityZoneChangeProtection: 0,
    },
  },
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
})) as any;

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
  UpdateContainerAssociationRequest,
  UpdateContainerAssociationResponse,
  UpdateContainerAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ContainerAssociationName: 0,
      ContainerAssociationArn: 0,
      Description: 0,
      Type: 0,
      ContainerMonitoringConfigurations: D.list(
        i_ContainerMonitoringConfiguration,
      ),
      Tags: D.list(i_Tag),
      UpdateToken: 0,
    },
  },
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
})) as any;

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
  UpdateFirewallAnalysisSettingsRequest,
  UpdateFirewallAnalysisSettingsResponse,
  UpdateFirewallAnalysisSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      EnabledAnalysisTypes: 0,
      FirewallArn: 0,
      FirewallName: 0,
      UpdateToken: 0,
    },
  },
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
})) as any;

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
  UpdateFirewallDeleteProtectionRequest,
  UpdateFirewallDeleteProtectionResponse,
  UpdateFirewallDeleteProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UpdateToken: 0,
      FirewallArn: 0,
      FirewallName: 0,
      DeleteProtection: 0,
    },
  },
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
})) as any;

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
  UpdateFirewallDescriptionRequest,
  UpdateFirewallDescriptionResponse,
  UpdateFirewallDescriptionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { UpdateToken: 0, FirewallArn: 0, FirewallName: 0, Description: 0 },
  },
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
})) as any;

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
  UpdateFirewallEncryptionConfigurationRequest,
  UpdateFirewallEncryptionConfigurationResponse,
  UpdateFirewallEncryptionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UpdateToken: 0,
      FirewallArn: 0,
      FirewallName: 0,
      EncryptionConfiguration: i_EncryptionConfiguration,
    },
  },
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
})) as any;

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
  UpdateFirewallPolicyRequest,
  UpdateFirewallPolicyResponse,
  UpdateFirewallPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UpdateToken: 0,
      FirewallPolicyArn: 0,
      FirewallPolicyName: 0,
      FirewallPolicy: i_FirewallPolicy,
      Description: 0,
      DryRun: 0,
      EncryptionConfiguration: i_EncryptionConfiguration,
    },
    output: { FirewallPolicyResponse: o_FirewallPolicyResponse },
  },
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
})) as any;

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
  UpdateFirewallPolicyChangeProtectionRequest,
  UpdateFirewallPolicyChangeProtectionResponse,
  UpdateFirewallPolicyChangeProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UpdateToken: 0,
      FirewallArn: 0,
      FirewallName: 0,
      FirewallPolicyChangeProtection: 0,
    },
  },
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
})) as any;

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
  UpdateLoggingConfigurationRequest,
  UpdateLoggingConfigurationResponse,
  UpdateLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallArn: 0,
      FirewallName: 0,
      LoggingConfiguration: {
        LogDestinationConfigs: D.list({
          LogType: 0,
          LogDestinationType: 0,
          LogDestination: 0,
        }),
      },
      EnableMonitoringDashboard: 0,
    },
  },
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
})) as any;

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
  UpdateProxyRequest,
  UpdateProxyResponse,
  UpdateProxyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      NatGatewayId: 0,
      ProxyName: 0,
      ProxyArn: 0,
      ListenerPropertiesToAdd: D.list(i_ListenerPropertyRequest),
      ListenerPropertiesToRemove: D.list(i_ListenerPropertyRequest),
      TlsInterceptProperties: i_TlsInterceptPropertiesRequest,
      UpdateToken: 0,
    },
    output: { Proxy: o_Proxy },
  },
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
})) as any;

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
  UpdateProxyConfigurationRequest,
  UpdateProxyConfigurationResponse,
  UpdateProxyConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProxyConfigurationName: 0,
      ProxyConfigurationArn: 0,
      DefaultRulePhaseActions: i_ProxyConfigDefaultRulePhaseActionsRequest,
      UpdateToken: 0,
    },
    output: { ProxyConfiguration: o_ProxyConfiguration },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxyConfiguration",
})) as any;

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
  UpdateProxyRuleRequest,
  UpdateProxyRuleResponse,
  UpdateProxyRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProxyRuleGroupName: 0,
      ProxyRuleGroupArn: 0,
      ProxyRuleName: 0,
      Description: 0,
      Action: 0,
      AddConditions: D.list(i_ProxyRuleCondition),
      RemoveConditions: D.list(i_ProxyRuleCondition),
      UpdateToken: 0,
    },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxyRule",
})) as any;

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
  UpdateProxyRuleGroupPrioritiesRequest,
  UpdateProxyRuleGroupPrioritiesResponse,
  UpdateProxyRuleGroupPrioritiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProxyConfigurationName: 0,
      ProxyConfigurationArn: 0,
      RuleGroups: D.list({ ProxyRuleGroupName: 0, NewPosition: 0 }),
      UpdateToken: 0,
    },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxyRuleGroupPriorities",
})) as any;

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
  UpdateProxyRulePrioritiesRequest,
  UpdateProxyRulePrioritiesResponse,
  UpdateProxyRulePrioritiesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProxyRuleGroupName: 0,
      ProxyRuleGroupArn: 0,
      RuleGroupRequestPhase: 0,
      Rules: D.list({ ProxyRuleName: 0, NewPosition: 0 }),
      UpdateToken: 0,
    },
  },
  errors: [
    InternalServerError,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProxyRulePriorities",
})) as any;

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
  UpdateProxySettingsRequest,
  UpdateProxySettingsResponse,
  UpdateProxySettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallArn: 0,
      FirewallName: 0,
      UpdateToken: 0,
      ProxySettings: i_ProxySettings,
    },
  },
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
})) as any;

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
  UpdateRuleGroupRequest,
  UpdateRuleGroupResponse,
  UpdateRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UpdateToken: 0,
      RuleGroupArn: 0,
      RuleGroupName: 0,
      RuleGroup: i_RuleGroup,
      Rules: 0,
      Type: 0,
      Description: 0,
      DryRun: 0,
      EncryptionConfiguration: i_EncryptionConfiguration,
      SourceMetadata: i_SourceMetadata,
      AnalyzeRuleGroup: 0,
      SummaryConfiguration: i_SummaryConfiguration,
    },
    output: { RuleGroupResponse: o_RuleGroupResponse },
  },
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
})) as any;

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
  UpdateSubnetChangeProtectionRequest,
  UpdateSubnetChangeProtectionResponse,
  UpdateSubnetChangeProtectionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UpdateToken: 0,
      FirewallArn: 0,
      FirewallName: 0,
      SubnetChangeProtection: 0,
    },
  },
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
})) as any;

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
  UpdateTLSInspectionConfigurationRequest,
  UpdateTLSInspectionConfigurationResponse,
  UpdateTLSInspectionConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      TLSInspectionConfigurationArn: 0,
      TLSInspectionConfigurationName: 0,
      TLSInspectionConfiguration: i_TLSInspectionConfiguration,
      Description: 0,
      EncryptionConfiguration: i_EncryptionConfiguration,
      UpdateToken: 0,
    },
    output: {
      TLSInspectionConfigurationResponse: o_TLSInspectionConfigurationResponse,
    },
  },
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
})) as any;

const i_AvailabilityZoneMapping: D.LazyStruct = () => ({ AvailabilityZone: 0 });
const i_ContainerMonitoringConfiguration: D.LazyStruct = () => ({
  ClusterArn: 0,
  AttributeFilters: D.list({ Key: 0, Value: 0 }),
});
const i_CreateProxyRule: D.LazyStruct = () => ({
  ProxyRuleName: 0,
  Description: 0,
  Action: 0,
  Conditions: D.list(i_ProxyRuleCondition),
  InsertPosition: 0,
});
const i_EncryptionConfiguration: D.LazyStruct = () => ({ KeyId: 0, Type: 0 });
const i_FirewallPolicy: D.LazyStruct = () => ({
  StatelessRuleGroupReferences: D.list({ ResourceArn: 0, Priority: 0 }),
  StatelessDefaultActions: 0,
  StatelessFragmentDefaultActions: 0,
  StatelessCustomActions: D.list(i_CustomAction),
  StatefulRuleGroupReferences: D.list({
    ResourceArn: 0,
    Priority: 0,
    Override: { Action: 0 },
    DeepThreatInspection: 0,
  }),
  StatefulDefaultActions: 0,
  StatefulEngineOptions: {
    RuleOrder: 0,
    StreamExceptionPolicy: 0,
    FlowTimeouts: { TcpIdleTimeoutSeconds: 0 },
  },
  TLSInspectionConfigurationArn: 0,
  PolicyVariables: { RuleVariables: D.map(i_IPSet) },
  EnableTLSSessionHolding: 0,
});
const i_FlowFilter: D.LazyStruct = () => ({
  SourceAddress: i_Address,
  DestinationAddress: i_Address,
  SourcePort: 0,
  DestinationPort: 0,
  Protocols: 0,
});
const i_ListenerPropertyRequest: D.LazyStruct = () => ({ Port: 0, Type: 0 });
const i_ProxyConfigDefaultRulePhaseActionsRequest: D.LazyStruct = () => ({
  PreDNS: 0,
  PreREQUEST: 0,
  PostRESPONSE: 0,
});
const i_ProxyRule: D.LazyStruct = () => ({
  ProxyRuleName: 0,
  Description: 0,
  Action: 0,
  Conditions: D.list(i_ProxyRuleCondition),
});
const i_ProxyRuleCondition: D.LazyStruct = () => ({
  ConditionOperator: 0,
  ConditionKey: 0,
  ConditionValues: 0,
});
const i_ProxySettings: D.LazyStruct = () => ({
  ListenerProperties: D.list({ Port: 0, Type: 0 }),
});
const i_RuleGroup: D.LazyStruct = () => ({
  RuleVariables: { IPSets: D.map(i_IPSet), PortSets: D.map({ Definition: 0 }) },
  ReferenceSets: { IPSetReferences: D.map({ ReferenceArn: 0 }) },
  RulesSource: {
    RulesString: 0,
    RulesSourceList: { Targets: 0, TargetTypes: 0, GeneratedRulesType: 0 },
    StatefulRules: D.list({
      Action: 0,
      Header: {
        Protocol: 0,
        Source: 0,
        SourcePort: 0,
        Direction: 0,
        Destination: 0,
        DestinationPort: 0,
      },
      RuleOptions: D.list({ Keyword: 0, Settings: 0 }),
    }),
    StatelessRulesAndCustomActions: {
      StatelessRules: D.list({
        RuleDefinition: {
          MatchAttributes: {
            Sources: D.list(i_Address),
            Destinations: D.list(i_Address),
            SourcePorts: D.list(i_PortRange),
            DestinationPorts: D.list(i_PortRange),
            Protocols: 0,
            TCPFlags: D.list({ Flags: 0, Masks: 0 }),
          },
          Actions: 0,
        },
        Priority: 0,
      }),
      CustomActions: D.list(i_CustomAction),
    },
  },
  StatefulRuleOptions: { RuleOrder: 0 },
});
const i_SourceMetadata: D.LazyStruct = () => ({
  SourceArn: 0,
  SourceUpdateToken: 0,
});
const i_SubnetMapping: D.LazyStruct = () => ({ SubnetId: 0, IPAddressType: 0 });
const i_SummaryConfiguration: D.LazyStruct = () => ({ RuleOptions: 0 });
const i_TLSInspectionConfiguration: D.LazyStruct = () => ({
  ServerCertificateConfigurations: D.list({
    ServerCertificates: D.list({ ResourceArn: 0 }),
    Scopes: D.list({
      Sources: D.list(i_Address),
      Destinations: D.list(i_Address),
      SourcePorts: D.list(i_PortRange),
      DestinationPorts: D.list(i_PortRange),
      Protocols: 0,
    }),
    CertificateAuthorityArn: 0,
    CheckCertificateRevocationStatus: {
      RevokedStatusAction: 0,
      UnknownStatusAction: 0,
    },
  }),
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TlsInterceptPropertiesRequest: D.LazyStruct = () => ({
  PcaArn: 0,
  TlsInterceptMode: 0,
});
const o_FirewallPolicyResponse: D.LazyStruct = () => ({
  LastModifiedTime: D.ts,
});
const o_Proxy: D.LazyStruct = () => ({
  CreateTime: D.ts,
  DeleteTime: D.ts,
  UpdateTime: D.ts,
});
const o_ProxyConfiguration: D.LazyStruct = () => ({
  CreateTime: D.ts,
  DeleteTime: D.ts,
});
const o_ProxyRuleGroup: D.LazyStruct = () => ({
  CreateTime: D.ts,
  DeleteTime: D.ts,
});
const o_RuleGroupResponse: D.LazyStruct = () => ({ LastModifiedTime: D.ts });
const o_TLSInspectionConfigurationResponse: D.LazyStruct = () => ({
  LastModifiedTime: D.ts,
});
const i_Address: D.LazyStruct = () => ({ AddressDefinition: 0 });
const i_CustomAction: D.LazyStruct = () => ({
  ActionName: 0,
  ActionDefinition: {
    PublishMetricAction: { Dimensions: D.list({ Value: 0 }) },
  },
});
const i_IPSet: D.LazyStruct = () => ({ Definition: 0 });
const i_PortRange: D.LazyStruct = () => ({ FromPort: 0, ToPort: 0 });
