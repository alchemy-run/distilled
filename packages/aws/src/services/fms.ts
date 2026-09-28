import type * as HttpClient from "effect/unstable/http/HttpClient";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "FMS",
  target: "AWSFMS_20180101",
  version: "2018-01-01",
  sigv4: "fms",
  protocol: awsJson1_1Protocol,
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
                `https://fms-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://fms-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://fms.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://fms.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class InternalErrorException
  extends /*@__PURE__*/ TE.TaggedError("InternalErrorException", [
    "ServerError",
  ])<{ readonly message?: string }> {}
export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError("InvalidInputException")<{
    readonly message?: string;
  }> {}
export class InvalidOperationException
  extends /*@__PURE__*/ TE.TaggedError("InvalidOperationException")<{
    readonly message?: string;
  }> {}
export class InvalidTypeException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTypeException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
  }> {}
export type AWSAccountId = string;
export interface AssociateAdminAccountRequest {
  AdminAccount: string;
}
export interface AssociateAdminAccountResponse {}
export type ThirdPartyFirewall =
  | "PALO_ALTO_NETWORKS_CLOUD_NGFW"
  | "FORTIGATE_CLOUD_NATIVE_FIREWALL"
  | (string & {});
export interface AssociateThirdPartyFirewallRequest {
  ThirdPartyFirewall: ThirdPartyFirewall;
}
export type ThirdPartyFirewallAssociationStatus =
  | "ONBOARDING"
  | "ONBOARD_COMPLETE"
  | "OFFBOARDING"
  | "OFFBOARD_COMPLETE"
  | "NOT_EXIST"
  | (string & {});
export interface AssociateThirdPartyFirewallResponse {
  ThirdPartyFirewallStatus?: ThirdPartyFirewallAssociationStatus;
}
export type Identifier = string;
export type IdentifierList = string[];
export interface BatchAssociateResourceRequest {
  ResourceSetIdentifier: string;
  Items: string[];
}
export type FailedItemReason =
  | "NOT_VALID_ARN"
  | "NOT_VALID_PARTITION"
  | "NOT_VALID_REGION"
  | "NOT_VALID_SERVICE"
  | "NOT_VALID_RESOURCE_TYPE"
  | "NOT_VALID_ACCOUNT_ID"
  | (string & {});
export interface FailedItem {
  URI?: string;
  Reason?: FailedItemReason;
}
export type FailedItemList = FailedItem[];
export interface BatchAssociateResourceResponse {
  ResourceSetIdentifier: string;
  FailedItems: FailedItem[];
}
export interface BatchDisassociateResourceRequest {
  ResourceSetIdentifier: string;
  Items: string[];
}
export interface BatchDisassociateResourceResponse {
  ResourceSetIdentifier: string;
  FailedItems: FailedItem[];
}
export type ListId = string;
export interface DeleteAppsListRequest {
  ListId: string;
}
export interface DeleteAppsListResponse {}
export interface DeleteNotificationChannelRequest {}
export interface DeleteNotificationChannelResponse {}
export type PolicyId = string;
export interface DeletePolicyRequest {
  PolicyId: string;
  DeleteAllPolicyResources?: boolean;
}
export interface DeletePolicyResponse {}
export interface DeleteProtocolsListRequest {
  ListId: string;
}
export interface DeleteProtocolsListResponse {}
export type Base62Id = string;
export interface DeleteResourceSetRequest {
  Identifier: string;
}
export interface DeleteResourceSetResponse {}
export interface DisassociateAdminAccountRequest {}
export interface DisassociateAdminAccountResponse {}
export interface DisassociateThirdPartyFirewallRequest {
  ThirdPartyFirewall: ThirdPartyFirewall;
}
export interface DisassociateThirdPartyFirewallResponse {
  ThirdPartyFirewallStatus?: ThirdPartyFirewallAssociationStatus;
}
export interface GetAdminAccountRequest {}
export type AccountRoleStatus =
  | "READY"
  | "CREATING"
  | "PENDING_DELETION"
  | "DELETING"
  | "DELETED"
  | (string & {});
export interface GetAdminAccountResponse {
  AdminAccount?: string;
  RoleStatus?: AccountRoleStatus;
}
export interface GetAdminScopeRequest {
  AdminAccount: string;
}
export type AccountIdList = string[];
export interface AccountScope {
  Accounts?: string[];
  AllAccountsEnabled?: boolean;
  ExcludeSpecifiedAccounts?: boolean;
}
export type OrganizationalUnitId = string;
export type OrganizationalUnitIdList = string[];
export interface OrganizationalUnitScope {
  OrganizationalUnits?: string[];
  AllOrganizationalUnitsEnabled?: boolean;
  ExcludeSpecifiedOrganizationalUnits?: boolean;
}
export type AWSRegion = string;
export type AWSRegionList = string[];
export interface RegionScope {
  Regions?: string[];
  AllRegionsEnabled?: boolean;
}
export type SecurityServiceType =
  | "WAF"
  | "WAFV2"
  | "SHIELD_ADVANCED"
  | "SECURITY_GROUPS_COMMON"
  | "SECURITY_GROUPS_CONTENT_AUDIT"
  | "SECURITY_GROUPS_USAGE_AUDIT"
  | "NETWORK_FIREWALL"
  | "DNS_FIREWALL"
  | "THIRD_PARTY_FIREWALL"
  | "IMPORT_NETWORK_FIREWALL"
  | "NETWORK_ACL_COMMON"
  | (string & {});
export type SecurityServiceTypeList = SecurityServiceType[];
export interface PolicyTypeScope {
  PolicyTypes?: SecurityServiceType[];
  AllPolicyTypesEnabled?: boolean;
}
export interface AdminScope {
  AccountScope?: AccountScope;
  OrganizationalUnitScope?: OrganizationalUnitScope;
  RegionScope?: RegionScope;
  PolicyTypeScope?: PolicyTypeScope;
}
export type OrganizationStatus =
  | "ONBOARDING"
  | "ONBOARDING_COMPLETE"
  | "OFFBOARDING"
  | "OFFBOARDING_COMPLETE"
  | (string & {});
export interface GetAdminScopeResponse {
  AdminScope?: AdminScope;
  Status?: OrganizationStatus;
}
export interface GetAppsListRequest {
  ListId: string;
  DefaultList?: boolean;
}
export type ResourceName = string;
export type UpdateToken = string;
export type Protocol = string;
export type IPPortNumber = number;
export interface App {
  AppName: string;
  Protocol: string;
  Port: number;
}
export type AppsList = App[];
export type PreviousListVersion = string;
export type PreviousAppsList = { [key: string]: App[] | undefined };
export interface AppsListData {
  ListId?: string;
  ListName: string;
  ListUpdateToken?: string;
  CreateTime?: Date;
  LastUpdateTime?: Date;
  AppsList: App[];
  PreviousAppsList?: { [key: string]: App[] | undefined };
}
export type ResourceArn = string;
export interface GetAppsListResponse {
  AppsList?: AppsListData;
  AppsListArn?: string;
}
export interface GetComplianceDetailRequest {
  PolicyId: string;
  MemberAccount: string;
}
export type ResourceId = string;
export type ViolationReason =
  | "WEB_ACL_MISSING_RULE_GROUP"
  | "RESOURCE_MISSING_WEB_ACL"
  | "RESOURCE_INCORRECT_WEB_ACL"
  | "RESOURCE_MISSING_SHIELD_PROTECTION"
  | "RESOURCE_MISSING_WEB_ACL_OR_SHIELD_PROTECTION"
  | "RESOURCE_MISSING_SECURITY_GROUP"
  | "RESOURCE_VIOLATES_AUDIT_SECURITY_GROUP"
  | "SECURITY_GROUP_UNUSED"
  | "SECURITY_GROUP_REDUNDANT"
  | "FMS_CREATED_SECURITY_GROUP_EDITED"
  | "MISSING_FIREWALL"
  | "MISSING_FIREWALL_SUBNET_IN_AZ"
  | "MISSING_EXPECTED_ROUTE_TABLE"
  | "NETWORK_FIREWALL_POLICY_MODIFIED"
  | "FIREWALL_SUBNET_IS_OUT_OF_SCOPE"
  | "INTERNET_GATEWAY_MISSING_EXPECTED_ROUTE"
  | "FIREWALL_SUBNET_MISSING_EXPECTED_ROUTE"
  | "UNEXPECTED_FIREWALL_ROUTES"
  | "UNEXPECTED_TARGET_GATEWAY_ROUTES"
  | "TRAFFIC_INSPECTION_CROSSES_AZ_BOUNDARY"
  | "INVALID_ROUTE_CONFIGURATION"
  | "MISSING_TARGET_GATEWAY"
  | "INTERNET_TRAFFIC_NOT_INSPECTED"
  | "BLACK_HOLE_ROUTE_DETECTED"
  | "BLACK_HOLE_ROUTE_DETECTED_IN_FIREWALL_SUBNET"
  | "RESOURCE_MISSING_DNS_FIREWALL"
  | "ROUTE_HAS_OUT_OF_SCOPE_ENDPOINT"
  | "FIREWALL_SUBNET_MISSING_VPCE_ENDPOINT"
  | "INVALID_NETWORK_ACL_ENTRY"
  | "WEB_ACL_CONFIGURATION_OR_SCOPE_OF_USE"
  | (string & {});
export type ResourceType = string;
export type LengthBoundedString = string;
export type ComplianceViolatorMetadata = { [key: string]: string | undefined };
export interface ComplianceViolator {
  ResourceId?: string;
  ViolationReason?: ViolationReason;
  ResourceType?: string;
  Metadata?: { [key: string]: string | undefined };
}
export type ComplianceViolators = ComplianceViolator[];
export type DependentServiceName =
  | "AWSCONFIG"
  | "AWSWAF"
  | "AWSSHIELD_ADVANCED"
  | "AWSVPC"
  | (string & {});
export type DetailedInfo = string;
export type IssueInfoMap = { [key in DependentServiceName]?: string };
export interface PolicyComplianceDetail {
  PolicyOwner?: string;
  PolicyId?: string;
  MemberAccount?: string;
  Violators?: ComplianceViolator[];
  EvaluationLimitExceeded?: boolean;
  ExpiredAt?: Date;
  IssueInfoMap?: { [key: string]: string | undefined };
}
export interface GetComplianceDetailResponse {
  PolicyComplianceDetail?: PolicyComplianceDetail;
}
export interface GetNotificationChannelRequest {}
export interface GetNotificationChannelResponse {
  SnsTopicArn?: string;
  SnsRoleName?: string;
}
export interface GetPolicyRequest {
  PolicyId: string;
}
export type PolicyUpdateToken = string;
export type ManagedServiceData = string;
export type FirewallDeploymentModel =
  | "CENTRALIZED"
  | "DISTRIBUTED"
  | (string & {});
export interface NetworkFirewallPolicy {
  FirewallDeploymentModel?: FirewallDeploymentModel;
}
export interface ThirdPartyFirewallPolicy {
  FirewallDeploymentModel?: FirewallDeploymentModel;
}
export type IntegerObject = number;
export interface NetworkAclIcmpTypeCode {
  Code?: number;
  Type?: number;
}
export type IPPortNumberInteger = number;
export interface NetworkAclPortRange {
  From?: number;
  To?: number;
}
export type LengthBoundedNonEmptyString = string;
export type NetworkAclRuleAction = "allow" | "deny" | (string & {});
export interface NetworkAclEntry {
  IcmpTypeCode?: NetworkAclIcmpTypeCode;
  Protocol: string;
  PortRange?: NetworkAclPortRange;
  CidrBlock?: string;
  Ipv6CidrBlock?: string;
  RuleAction: NetworkAclRuleAction;
  Egress: boolean;
}
export type NetworkAclEntries = NetworkAclEntry[];
export interface NetworkAclEntrySet {
  FirstEntries?: NetworkAclEntry[];
  ForceRemediateForFirstEntries: boolean;
  LastEntries?: NetworkAclEntry[];
  ForceRemediateForLastEntries: boolean;
}
export interface NetworkAclCommonPolicy {
  NetworkAclEntrySet: NetworkAclEntrySet;
}
export interface PolicyOption {
  NetworkFirewallPolicy?: NetworkFirewallPolicy;
  ThirdPartyFirewallPolicy?: ThirdPartyFirewallPolicy;
  NetworkAclCommonPolicy?: NetworkAclCommonPolicy;
}
export interface SecurityServicePolicyData {
  Type: SecurityServiceType;
  ManagedServiceData?: string;
  PolicyOption?: PolicyOption;
}
export type ResourceTypeList = string[];
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export interface ResourceTag {
  Key: string;
  Value?: string;
}
export type ResourceTags = ResourceTag[];
export type CustomerPolicyScopeIdType = "ACCOUNT" | "ORG_UNIT" | (string & {});
export type CustomerPolicyScopeId = string;
export type CustomerPolicyScopeIdList = string[];
export type CustomerPolicyScopeMap = {
  [key in CustomerPolicyScopeIdType]?: string[];
};
export type ResourceSetIds = string[];
export type ResourceDescription = string;
export type CustomerPolicyStatus =
  | "ACTIVE"
  | "OUT_OF_ADMIN_SCOPE"
  | (string & {});
export type ResourceTagLogicalOperator = "AND" | "OR" | (string & {});
export interface Policy {
  PolicyId?: string;
  PolicyName: string;
  PolicyUpdateToken?: string;
  SecurityServicePolicyData: SecurityServicePolicyData;
  ResourceType: string;
  ResourceTypeList?: string[];
  ResourceTags?: ResourceTag[];
  ExcludeResourceTags: boolean;
  RemediationEnabled: boolean;
  DeleteUnusedFMManagedResources?: boolean;
  IncludeMap?: { [key: string]: string[] | undefined };
  ExcludeMap?: { [key: string]: string[] | undefined };
  ResourceSetIds?: string[];
  PolicyDescription?: string;
  PolicyStatus?: CustomerPolicyStatus;
  ResourceTagLogicalOperator?: ResourceTagLogicalOperator;
}
export interface GetPolicyResponse {
  Policy?: Policy;
  PolicyArn?: string;
}
export type PaginationToken = string;
export type PaginationMaxResults = number;
export interface GetProtectionStatusRequest {
  PolicyId: string;
  MemberAccountId?: string;
  StartTime?: Date;
  EndTime?: Date;
  NextToken?: string;
  MaxResults?: number;
}
export type ProtectionData = string;
export interface GetProtectionStatusResponse {
  AdminAccountId?: string;
  ServiceType?: SecurityServiceType;
  Data?: string;
  NextToken?: string;
}
export interface GetProtocolsListRequest {
  ListId: string;
  DefaultList?: boolean;
}
export type ProtocolsList = string[];
export type PreviousProtocolsList = { [key: string]: string[] | undefined };
export interface ProtocolsListData {
  ListId?: string;
  ListName: string;
  ListUpdateToken?: string;
  CreateTime?: Date;
  LastUpdateTime?: Date;
  ProtocolsList: string[];
  PreviousProtocolsList?: { [key: string]: string[] | undefined };
}
export interface GetProtocolsListResponse {
  ProtocolsList?: ProtocolsListData;
  ProtocolsListArn?: string;
}
export interface GetResourceSetRequest {
  Identifier: string;
}
export type Name = string;
export type Description = string;
export type ResourceSetStatus = "ACTIVE" | "OUT_OF_ADMIN_SCOPE" | (string & {});
export interface ResourceSet {
  Id?: string;
  Name: string;
  Description?: string;
  UpdateToken?: string;
  ResourceTypeList: string[];
  LastUpdateTime?: Date;
  ResourceSetStatus?: ResourceSetStatus;
}
export interface GetResourceSetResponse {
  ResourceSet: ResourceSet;
  ResourceSetArn: string;
}
export interface GetThirdPartyFirewallAssociationStatusRequest {
  ThirdPartyFirewall: ThirdPartyFirewall;
}
export type MarketplaceSubscriptionOnboardingStatus =
  | "NO_SUBSCRIPTION"
  | "NOT_COMPLETE"
  | "COMPLETE"
  | (string & {});
export interface GetThirdPartyFirewallAssociationStatusResponse {
  ThirdPartyFirewallStatus?: ThirdPartyFirewallAssociationStatus;
  MarketplaceOnboardingStatus?: MarketplaceSubscriptionOnboardingStatus;
}
export interface GetViolationDetailsRequest {
  PolicyId: string;
  MemberAccount: string;
  ResourceId: string;
  ResourceType: string;
}
export type ViolationTarget = string;
export type ReferenceRule = string;
export type TargetViolationReason = string;
export type TargetViolationReasons = string[];
export interface PartialMatch {
  Reference?: string;
  TargetViolationReasons?: string[];
}
export type PartialMatches = PartialMatch[];
export type RemediationActionType = "REMOVE" | "MODIFY" | (string & {});
export type RemediationActionDescription = string;
export type CIDR = string;
export interface SecurityGroupRuleDescription {
  IPV4Range?: string;
  IPV6Range?: string;
  PrefixListId?: string;
  Protocol?: string;
  FromPort?: number;
  ToPort?: number;
}
export interface SecurityGroupRemediationAction {
  RemediationActionType?: RemediationActionType;
  Description?: string;
  RemediationResult?: SecurityGroupRuleDescription;
  IsDefaultAction?: boolean;
}
export type SecurityGroupRemediationActions = SecurityGroupRemediationAction[];
export interface AwsVPCSecurityGroupViolation {
  ViolationTarget?: string;
  ViolationTargetDescription?: string;
  PartialMatches?: PartialMatch[];
  PossibleSecurityGroupRemediationActions?: SecurityGroupRemediationAction[];
}
export type ResourceIdList = string[];
export interface AwsEc2NetworkInterfaceViolation {
  ViolationTarget?: string;
  ViolatingSecurityGroups?: string[];
}
export type AwsEc2NetworkInterfaceViolations =
  AwsEc2NetworkInterfaceViolation[];
export interface AwsEc2InstanceViolation {
  ViolationTarget?: string;
  AwsEc2NetworkInterfaceViolations?: AwsEc2NetworkInterfaceViolation[];
}
export interface NetworkFirewallMissingFirewallViolation {
  ViolationTarget?: string;
  VPC?: string;
  AvailabilityZone?: string;
  TargetViolationReason?: string;
}
export interface NetworkFirewallMissingSubnetViolation {
  ViolationTarget?: string;
  VPC?: string;
  AvailabilityZone?: string;
  TargetViolationReason?: string;
}
export interface NetworkFirewallMissingExpectedRTViolation {
  ViolationTarget?: string;
  VPC?: string;
  AvailabilityZone?: string;
  CurrentRouteTable?: string;
  ExpectedRouteTable?: string;
}
export type NetworkFirewallResourceName = string;
export type StatelessRuleGroupPriority = number;
export interface StatelessRuleGroup {
  RuleGroupName?: string;
  ResourceId?: string;
  Priority?: number;
}
export type StatelessRuleGroupList = StatelessRuleGroup[];
export type NetworkFirewallAction = string;
export type NetworkFirewallActionList = string[];
export type PriorityNumber = number;
export type NetworkFirewallOverrideAction = "DROP_TO_ALERT" | (string & {});
export interface NetworkFirewallStatefulRuleGroupOverride {
  Action?: NetworkFirewallOverrideAction;
}
export interface StatefulRuleGroup {
  RuleGroupName?: string;
  ResourceId?: string;
  Priority?: number;
  Override?: NetworkFirewallStatefulRuleGroupOverride;
}
export type StatefulRuleGroupList = StatefulRuleGroup[];
export type RuleOrder = "STRICT_ORDER" | "DEFAULT_ACTION_ORDER" | (string & {});
export type StreamExceptionPolicy =
  | "DROP"
  | "CONTINUE"
  | "REJECT"
  | "FMS_IGNORE"
  | (string & {});
export interface StatefulEngineOptions {
  RuleOrder?: RuleOrder;
  StreamExceptionPolicy?: StreamExceptionPolicy;
}
export interface NetworkFirewallPolicyDescription {
  StatelessRuleGroups?: StatelessRuleGroup[];
  StatelessDefaultActions?: string[];
  StatelessFragmentDefaultActions?: string[];
  StatelessCustomActions?: string[];
  StatefulRuleGroups?: StatefulRuleGroup[];
  StatefulDefaultActions?: string[];
  StatefulEngineOptions?: StatefulEngineOptions;
}
export interface NetworkFirewallPolicyModifiedViolation {
  ViolationTarget?: string;
  CurrentPolicyDescription?: NetworkFirewallPolicyDescription;
  ExpectedPolicyDescription?: NetworkFirewallPolicyDescription;
}
export type DestinationType = "IPV4" | "IPV6" | "PREFIX_LIST" | (string & {});
export type TargetType =
  | "GATEWAY"
  | "CARRIER_GATEWAY"
  | "INSTANCE"
  | "LOCAL_GATEWAY"
  | "NAT_GATEWAY"
  | "NETWORK_INTERFACE"
  | "VPC_ENDPOINT"
  | "VPC_PEERING_CONNECTION"
  | "EGRESS_ONLY_INTERNET_GATEWAY"
  | "TRANSIT_GATEWAY"
  | (string & {});
export interface Route {
  DestinationType?: DestinationType;
  TargetType?: TargetType;
  Destination?: string;
  Target?: string;
}
export type Routes = Route[];
export type LengthBoundedStringList = string[];
export interface ExpectedRoute {
  IpV4Cidr?: string;
  PrefixListId?: string;
  IpV6Cidr?: string;
  ContributingSubnets?: string[];
  AllowedTargets?: string[];
  RouteTableId?: string;
}
export type ExpectedRoutes = ExpectedRoute[];
export interface NetworkFirewallInternetTrafficNotInspectedViolation {
  SubnetId?: string;
  SubnetAvailabilityZone?: string;
  RouteTableId?: string;
  ViolatingRoutes?: Route[];
  IsRouteTableUsedInDifferentAZ?: boolean;
  CurrentFirewallSubnetRouteTable?: string;
  ExpectedFirewallEndpoint?: string;
  FirewallSubnetId?: string;
  ExpectedFirewallSubnetRoutes?: ExpectedRoute[];
  ActualFirewallSubnetRoutes?: Route[];
  InternetGatewayId?: string;
  CurrentInternetGatewayRouteTable?: string;
  ExpectedInternetGatewayRoutes?: ExpectedRoute[];
  ActualInternetGatewayRoutes?: Route[];
  VpcId?: string;
}
export interface NetworkFirewallInvalidRouteConfigurationViolation {
  AffectedSubnets?: string[];
  RouteTableId?: string;
  IsRouteTableUsedInDifferentAZ?: boolean;
  ViolatingRoute?: Route;
  CurrentFirewallSubnetRouteTable?: string;
  ExpectedFirewallEndpoint?: string;
  ActualFirewallEndpoint?: string;
  ExpectedFirewallSubnetId?: string;
  ActualFirewallSubnetId?: string;
  ExpectedFirewallSubnetRoutes?: ExpectedRoute[];
  ActualFirewallSubnetRoutes?: Route[];
  InternetGatewayId?: string;
  CurrentInternetGatewayRouteTable?: string;
  ExpectedInternetGatewayRoutes?: ExpectedRoute[];
  ActualInternetGatewayRoutes?: Route[];
  VpcId?: string;
}
export interface NetworkFirewallBlackHoleRouteDetectedViolation {
  ViolationTarget?: string;
  RouteTableId?: string;
  VpcId?: string;
  ViolatingRoutes?: Route[];
}
export interface NetworkFirewallUnexpectedFirewallRoutesViolation {
  FirewallSubnetId?: string;
  ViolatingRoutes?: Route[];
  RouteTableId?: string;
  FirewallEndpoint?: string;
  VpcId?: string;
}
export interface NetworkFirewallUnexpectedGatewayRoutesViolation {
  GatewayId?: string;
  ViolatingRoutes?: Route[];
  RouteTableId?: string;
  VpcId?: string;
}
export interface NetworkFirewallMissingExpectedRoutesViolation {
  ViolationTarget?: string;
  ExpectedRoutes?: ExpectedRoute[];
  VpcId?: string;
}
export type DnsRuleGroupPriority = number;
export type DnsRuleGroupPriorities = number[];
export interface DnsRuleGroupPriorityConflictViolation {
  ViolationTarget?: string;
  ViolationTargetDescription?: string;
  ConflictingPriority?: number;
  ConflictingPolicyId?: string;
  UnavailablePriorities?: number[];
}
export interface DnsDuplicateRuleGroupViolation {
  ViolationTarget?: string;
  ViolationTargetDescription?: string;
}
export type BasicInteger = number;
export interface DnsRuleGroupLimitExceededViolation {
  ViolationTarget?: string;
  ViolationTargetDescription?: string;
  NumberOfRuleGroupsAlreadyAssociated?: number;
}
export interface FirewallSubnetIsOutOfScopeViolation {
  FirewallSubnetId?: string;
  VpcId?: string;
  SubnetAvailabilityZone?: string;
  SubnetAvailabilityZoneId?: string;
  VpcEndpointId?: string;
}
export interface RouteHasOutOfScopeEndpointViolation {
  SubnetId?: string;
  VpcId?: string;
  RouteTableId?: string;
  ViolatingRoutes?: Route[];
  SubnetAvailabilityZone?: string;
  SubnetAvailabilityZoneId?: string;
  CurrentFirewallSubnetRouteTable?: string;
  FirewallSubnetId?: string;
  FirewallSubnetRoutes?: Route[];
  InternetGatewayId?: string;
  CurrentInternetGatewayRouteTable?: string;
  InternetGatewayRoutes?: Route[];
}
export interface ThirdPartyFirewallMissingFirewallViolation {
  ViolationTarget?: string;
  VPC?: string;
  AvailabilityZone?: string;
  TargetViolationReason?: string;
}
export interface ThirdPartyFirewallMissingSubnetViolation {
  ViolationTarget?: string;
  VPC?: string;
  AvailabilityZone?: string;
  TargetViolationReason?: string;
}
export interface ThirdPartyFirewallMissingExpectedRouteTableViolation {
  ViolationTarget?: string;
  VPC?: string;
  AvailabilityZone?: string;
  CurrentRouteTable?: string;
  ExpectedRouteTable?: string;
}
export interface FirewallSubnetMissingVPCEndpointViolation {
  FirewallSubnetId?: string;
  VpcId?: string;
  SubnetAvailabilityZone?: string;
  SubnetAvailabilityZoneId?: string;
}
export type IntegerObjectMinimum0 = number;
export type EntryType =
  | "FMS_MANAGED_FIRST_ENTRY"
  | "FMS_MANAGED_LAST_ENTRY"
  | "CUSTOM_ENTRY"
  | (string & {});
export interface EntryDescription {
  EntryDetail?: NetworkAclEntry;
  EntryRuleNumber?: number;
  EntryType?: EntryType;
}
export type EntriesWithConflicts = EntryDescription[];
export type EntryViolationReason =
  | "MISSING_EXPECTED_ENTRY"
  | "INCORRECT_ENTRY_ORDER"
  | "ENTRY_CONFLICT"
  | (string & {});
export type EntryViolationReasons = EntryViolationReason[];
export interface EntryViolation {
  ExpectedEntry?: EntryDescription;
  ExpectedEvaluationOrder?: string;
  ActualEvaluationOrder?: string;
  EntryAtExpectedEvaluationOrder?: EntryDescription;
  EntriesWithConflicts?: EntryDescription[];
  EntryViolationReasons?: EntryViolationReason[];
}
export type EntryViolations = EntryViolation[];
export interface InvalidNetworkAclEntriesViolation {
  Vpc?: string;
  Subnet?: string;
  SubnetAvailabilityZone?: string;
  CurrentAssociatedNetworkAcl?: string;
  EntryViolations?: EntryViolation[];
}
export interface ActionTarget {
  ResourceId?: string;
  Description?: string;
}
export interface EC2CreateRouteAction {
  Description?: string;
  DestinationCidrBlock?: string;
  DestinationPrefixListId?: string;
  DestinationIpv6CidrBlock?: string;
  VpcEndpointId?: ActionTarget;
  GatewayId?: ActionTarget;
  RouteTableId: ActionTarget;
}
export interface EC2ReplaceRouteAction {
  Description?: string;
  DestinationCidrBlock?: string;
  DestinationPrefixListId?: string;
  DestinationIpv6CidrBlock?: string;
  GatewayId?: ActionTarget;
  RouteTableId: ActionTarget;
}
export interface EC2DeleteRouteAction {
  Description?: string;
  DestinationCidrBlock?: string;
  DestinationPrefixListId?: string;
  DestinationIpv6CidrBlock?: string;
  RouteTableId: ActionTarget;
}
export interface EC2CopyRouteTableAction {
  Description?: string;
  VpcId: ActionTarget;
  RouteTableId: ActionTarget;
}
export interface EC2ReplaceRouteTableAssociationAction {
  Description?: string;
  AssociationId: ActionTarget;
  RouteTableId: ActionTarget;
}
export interface EC2AssociateRouteTableAction {
  Description?: string;
  RouteTableId: ActionTarget;
  SubnetId?: ActionTarget;
  GatewayId?: ActionTarget;
}
export interface EC2CreateRouteTableAction {
  Description?: string;
  VpcId: ActionTarget;
}
export interface FMSPolicyUpdateFirewallCreationConfigAction {
  Description?: string;
  FirewallCreationConfig?: string;
}
export interface CreateNetworkAclAction {
  Description?: string;
  Vpc?: ActionTarget;
  FMSCanRemediate?: boolean;
}
export interface ReplaceNetworkAclAssociationAction {
  Description?: string;
  AssociationId?: ActionTarget;
  NetworkAclId?: ActionTarget;
  FMSCanRemediate?: boolean;
}
export type EntriesDescription = EntryDescription[];
export interface CreateNetworkAclEntriesAction {
  Description?: string;
  NetworkAclId?: ActionTarget;
  NetworkAclEntriesToBeCreated?: EntryDescription[];
  FMSCanRemediate?: boolean;
}
export interface DeleteNetworkAclEntriesAction {
  Description?: string;
  NetworkAclId?: ActionTarget;
  NetworkAclEntriesToBeDeleted?: EntryDescription[];
  FMSCanRemediate?: boolean;
}
export interface RemediationAction {
  Description?: string;
  EC2CreateRouteAction?: EC2CreateRouteAction;
  EC2ReplaceRouteAction?: EC2ReplaceRouteAction;
  EC2DeleteRouteAction?: EC2DeleteRouteAction;
  EC2CopyRouteTableAction?: EC2CopyRouteTableAction;
  EC2ReplaceRouteTableAssociationAction?: EC2ReplaceRouteTableAssociationAction;
  EC2AssociateRouteTableAction?: EC2AssociateRouteTableAction;
  EC2CreateRouteTableAction?: EC2CreateRouteTableAction;
  FMSPolicyUpdateFirewallCreationConfigAction?: FMSPolicyUpdateFirewallCreationConfigAction;
  CreateNetworkAclAction?: CreateNetworkAclAction;
  ReplaceNetworkAclAssociationAction?: ReplaceNetworkAclAssociationAction;
  CreateNetworkAclEntriesAction?: CreateNetworkAclEntriesAction;
  DeleteNetworkAclEntriesAction?: DeleteNetworkAclEntriesAction;
}
export interface RemediationActionWithOrder {
  RemediationAction?: RemediationAction;
  Order?: number;
}
export type OrderedRemediationActions = RemediationActionWithOrder[];
export interface PossibleRemediationAction {
  Description?: string;
  OrderedRemediationActions: RemediationActionWithOrder[];
  IsDefaultAction?: boolean;
}
export type PossibleRemediationActionList = PossibleRemediationAction[];
export interface PossibleRemediationActions {
  Description?: string;
  Actions?: PossibleRemediationAction[];
}
export interface WebACLHasIncompatibleConfigurationViolation {
  WebACLArn?: string;
  Description?: string;
}
export type ResourceArnList = string[];
export interface WebACLHasOutOfScopeResourcesViolation {
  WebACLArn?: string;
  OutOfScopeResourceList?: string[];
}
export interface ResourceViolation {
  AwsVPCSecurityGroupViolation?: AwsVPCSecurityGroupViolation;
  AwsEc2NetworkInterfaceViolation?: AwsEc2NetworkInterfaceViolation;
  AwsEc2InstanceViolation?: AwsEc2InstanceViolation;
  NetworkFirewallMissingFirewallViolation?: NetworkFirewallMissingFirewallViolation;
  NetworkFirewallMissingSubnetViolation?: NetworkFirewallMissingSubnetViolation;
  NetworkFirewallMissingExpectedRTViolation?: NetworkFirewallMissingExpectedRTViolation;
  NetworkFirewallPolicyModifiedViolation?: NetworkFirewallPolicyModifiedViolation;
  NetworkFirewallInternetTrafficNotInspectedViolation?: NetworkFirewallInternetTrafficNotInspectedViolation;
  NetworkFirewallInvalidRouteConfigurationViolation?: NetworkFirewallInvalidRouteConfigurationViolation;
  NetworkFirewallBlackHoleRouteDetectedViolation?: NetworkFirewallBlackHoleRouteDetectedViolation;
  NetworkFirewallUnexpectedFirewallRoutesViolation?: NetworkFirewallUnexpectedFirewallRoutesViolation;
  NetworkFirewallUnexpectedGatewayRoutesViolation?: NetworkFirewallUnexpectedGatewayRoutesViolation;
  NetworkFirewallMissingExpectedRoutesViolation?: NetworkFirewallMissingExpectedRoutesViolation;
  DnsRuleGroupPriorityConflictViolation?: DnsRuleGroupPriorityConflictViolation;
  DnsDuplicateRuleGroupViolation?: DnsDuplicateRuleGroupViolation;
  DnsRuleGroupLimitExceededViolation?: DnsRuleGroupLimitExceededViolation;
  FirewallSubnetIsOutOfScopeViolation?: FirewallSubnetIsOutOfScopeViolation;
  RouteHasOutOfScopeEndpointViolation?: RouteHasOutOfScopeEndpointViolation;
  ThirdPartyFirewallMissingFirewallViolation?: ThirdPartyFirewallMissingFirewallViolation;
  ThirdPartyFirewallMissingSubnetViolation?: ThirdPartyFirewallMissingSubnetViolation;
  ThirdPartyFirewallMissingExpectedRouteTableViolation?: ThirdPartyFirewallMissingExpectedRouteTableViolation;
  FirewallSubnetMissingVPCEndpointViolation?: FirewallSubnetMissingVPCEndpointViolation;
  InvalidNetworkAclEntriesViolation?: InvalidNetworkAclEntriesViolation;
  PossibleRemediationActions?: PossibleRemediationActions;
  WebACLHasIncompatibleConfigurationViolation?: WebACLHasIncompatibleConfigurationViolation;
  WebACLHasOutOfScopeResourcesViolation?: WebACLHasOutOfScopeResourcesViolation;
}
export type ResourceViolations = ResourceViolation[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface ViolationDetail {
  PolicyId: string;
  MemberAccount: string;
  ResourceId: string;
  ResourceType: string;
  ResourceViolations: ResourceViolation[];
  ResourceTags?: Tag[];
  ResourceDescription?: string;
}
export interface GetViolationDetailsResponse {
  ViolationDetail?: ViolationDetail;
}
export interface ListAdminAccountsForOrganizationRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface AdminAccountSummary {
  AdminAccount?: string;
  DefaultAdmin?: boolean;
  Status?: OrganizationStatus;
}
export type AdminAccountSummaryList = AdminAccountSummary[];
export interface ListAdminAccountsForOrganizationResponse {
  AdminAccounts?: AdminAccountSummary[];
  NextToken?: string;
}
export interface ListAdminsManagingAccountRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ListAdminsManagingAccountResponse {
  AdminAccounts?: string[];
  NextToken?: string;
}
export interface ListAppsListsRequest {
  DefaultLists?: boolean;
  NextToken?: string;
  MaxResults: number;
}
export interface AppsListDataSummary {
  ListArn?: string;
  ListId?: string;
  ListName?: string;
  AppsList?: App[];
}
export type AppsListsData = AppsListDataSummary[];
export interface ListAppsListsResponse {
  AppsLists?: AppsListDataSummary[];
  NextToken?: string;
}
export interface ListComplianceStatusRequest {
  PolicyId: string;
  NextToken?: string;
  MaxResults?: number;
}
export type PolicyComplianceStatusType =
  | "COMPLIANT"
  | "NON_COMPLIANT"
  | (string & {});
export type ResourceCount = number;
export interface EvaluationResult {
  ComplianceStatus?: PolicyComplianceStatusType;
  ViolatorCount?: number;
  EvaluationLimitExceeded?: boolean;
}
export type EvaluationResults = EvaluationResult[];
export interface PolicyComplianceStatus {
  PolicyOwner?: string;
  PolicyId?: string;
  PolicyName?: string;
  MemberAccount?: string;
  EvaluationResults?: EvaluationResult[];
  LastUpdated?: Date;
  IssueInfoMap?: { [key: string]: string | undefined };
}
export type PolicyComplianceStatusList = PolicyComplianceStatus[];
export interface ListComplianceStatusResponse {
  PolicyComplianceStatusList?: PolicyComplianceStatus[];
  NextToken?: string;
}
export type AWSAccountIdList = string[];
export interface ListDiscoveredResourcesRequest {
  MemberAccountIds: string[];
  ResourceType: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface DiscoveredResource {
  URI?: string;
  AccountId?: string;
  Type?: string;
  Name?: string;
}
export type DiscoveredResourceList = DiscoveredResource[];
export interface ListDiscoveredResourcesResponse {
  Items?: DiscoveredResource[];
  NextToken?: string;
}
export interface ListMemberAccountsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export type MemberAccounts = string[];
export interface ListMemberAccountsResponse {
  MemberAccounts?: string[];
  NextToken?: string;
}
export interface ListPoliciesRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface PolicySummary {
  PolicyArn?: string;
  PolicyId?: string;
  PolicyName?: string;
  ResourceType?: string;
  SecurityServiceType?: SecurityServiceType;
  RemediationEnabled?: boolean;
  DeleteUnusedFMManagedResources?: boolean;
  PolicyStatus?: CustomerPolicyStatus;
}
export type PolicySummaryList = PolicySummary[];
export interface ListPoliciesResponse {
  PolicyList?: PolicySummary[];
  NextToken?: string;
}
export interface ListProtocolsListsRequest {
  DefaultLists?: boolean;
  NextToken?: string;
  MaxResults: number;
}
export interface ProtocolsListDataSummary {
  ListArn?: string;
  ListId?: string;
  ListName?: string;
  ProtocolsList?: string[];
}
export type ProtocolsListsData = ProtocolsListDataSummary[];
export interface ListProtocolsListsResponse {
  ProtocolsLists?: ProtocolsListDataSummary[];
  NextToken?: string;
}
export interface ListResourceSetResourcesRequest {
  Identifier: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface Resource {
  URI: string;
  AccountId?: string;
}
export type ResourceList = Resource[];
export interface ListResourceSetResourcesResponse {
  Items: Resource[];
  NextToken?: string;
}
export interface ListResourceSetsRequest {
  NextToken?: string;
  MaxResults?: number;
}
export interface ResourceSetSummary {
  Id?: string;
  Name?: string;
  Description?: string;
  LastUpdateTime?: Date;
  ResourceSetStatus?: ResourceSetStatus;
}
export type ResourceSetSummaryList = ResourceSetSummary[];
export interface ListResourceSetsResponse {
  ResourceSets?: ResourceSetSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  TagList?: Tag[];
}
export interface ListThirdPartyFirewallFirewallPoliciesRequest {
  ThirdPartyFirewall: ThirdPartyFirewall;
  NextToken?: string;
  MaxResults: number;
}
export type FirewallPolicyId = string;
export type FirewallPolicyName = string;
export interface ThirdPartyFirewallFirewallPolicy {
  FirewallPolicyId?: string;
  FirewallPolicyName?: string;
}
export type ThirdPartyFirewallFirewallPolicies =
  ThirdPartyFirewallFirewallPolicy[];
export interface ListThirdPartyFirewallFirewallPoliciesResponse {
  ThirdPartyFirewallFirewallPolicies?: ThirdPartyFirewallFirewallPolicy[];
  NextToken?: string;
}
export interface PutAdminAccountRequest {
  AdminAccount: string;
  AdminScope?: AdminScope;
}
export interface PutAdminAccountResponse {}
export interface PutAppsListRequest {
  AppsList: AppsListData;
  TagList?: Tag[];
}
export interface PutAppsListResponse {
  AppsList?: AppsListData;
  AppsListArn?: string;
}
export interface PutNotificationChannelRequest {
  SnsTopicArn: string;
  SnsRoleName: string;
}
export interface PutNotificationChannelResponse {}
export interface PutPolicyRequest {
  Policy: Policy;
  TagList?: Tag[];
}
export interface PutPolicyResponse {
  Policy?: Policy;
  PolicyArn?: string;
}
export interface PutProtocolsListRequest {
  ProtocolsList: ProtocolsListData;
  TagList?: Tag[];
}
export interface PutProtocolsListResponse {
  ProtocolsList?: ProtocolsListData;
  ProtocolsListArn?: string;
}
export interface PutResourceSetRequest {
  ResourceSet: ResourceSet;
  TagList?: Tag[];
}
export interface PutResourceSetResponse {
  ResourceSet: ResourceSet;
  ResourceSetArn: string;
}
export interface TagResourceRequest {
  ResourceArn: string;
  TagList: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export type ErrorMessage = string;
export type AssociateAdminAccountError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Sets a Firewall Manager default administrator account. The Firewall Manager default administrator account can manage third-party firewalls and has full administrative scope that allows administration of all policy types, accounts, organizational units, and Regions. This account must be a member account of the organization in Organizations whose resources you want to protect.
 *
 * For information about working with Firewall Manager administrator accounts, see Managing Firewall Manager administrators in the *Firewall Manager Developer Guide*.
 */
export const associateAdminAccount: API.OperationMethod<
  AssociateAdminAccountRequest,
  AssociateAdminAccountResponse,
  AssociateAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AdminAccount: 0 } },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateAdminAccount",
})) as any;

export type AssociateThirdPartyFirewallError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Sets the Firewall Manager policy administrator as a tenant administrator of a third-party firewall service. A tenant is an instance of the third-party firewall service that's associated with your Amazon Web Services customer account.
 */
export const associateThirdPartyFirewall: API.OperationMethod<
  AssociateThirdPartyFirewallRequest,
  AssociateThirdPartyFirewallResponse,
  AssociateThirdPartyFirewallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ThirdPartyFirewall: 0 } },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateThirdPartyFirewall",
})) as any;

export type BatchAssociateResourceError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Associate resources to a Firewall Manager resource set.
 */
export const batchAssociateResource: API.OperationMethod<
  BatchAssociateResourceRequest,
  BatchAssociateResourceResponse,
  BatchAssociateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceSetIdentifier: 0, Items: 0 } },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchAssociateResource",
})) as any;

export type BatchDisassociateResourceError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates resources from a Firewall Manager resource set.
 */
export const batchDisassociateResource: API.OperationMethod<
  BatchDisassociateResourceRequest,
  BatchDisassociateResourceResponse,
  BatchDisassociateResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceSetIdentifier: 0, Items: 0 } },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDisassociateResource",
})) as any;

export type DeleteAppsListError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Permanently deletes an Firewall Manager applications list.
 */
export const deleteAppsList: API.OperationMethod<
  DeleteAppsListRequest,
  DeleteAppsListResponse,
  DeleteAppsListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ListId: 0 } },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAppsList",
})) as any;

export type DeleteNotificationChannelError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes an Firewall Manager association with the IAM role and the Amazon Simple
 * Notification Service (SNS) topic that is used to record Firewall Manager SNS logs.
 */
export const deleteNotificationChannel: API.OperationMethod<
  DeleteNotificationChannelRequest,
  DeleteNotificationChannelResponse,
  DeleteNotificationChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotificationChannel",
})) as any;

export type DeletePolicyError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Permanently deletes an Firewall Manager policy.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PolicyId: 0, DeleteAllPolicyResources: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
})) as any;

export type DeleteProtocolsListError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Permanently deletes an Firewall Manager protocols list.
 */
export const deleteProtocolsList: API.OperationMethod<
  DeleteProtocolsListRequest,
  DeleteProtocolsListResponse,
  DeleteProtocolsListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ListId: 0 } },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteProtocolsList",
})) as any;

export type DeleteResourceSetError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes the specified ResourceSet.
 */
export const deleteResourceSet: API.OperationMethod<
  DeleteResourceSetRequest,
  DeleteResourceSetResponse,
  DeleteResourceSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Identifier: 0 } },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourceSet",
})) as any;

export type DisassociateAdminAccountError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates an Firewall Manager administrator account. To set a different account as an Firewall Manager administrator, submit a PutAdminAccount request. To set an account as a default administrator account, you must submit an AssociateAdminAccount request.
 *
 * Disassociation of the default administrator account follows the first in, last out principle. If you are the default administrator, all Firewall Manager administrators within the organization must first disassociate their accounts before you can disassociate your account.
 */
export const disassociateAdminAccount: API.OperationMethod<
  DisassociateAdminAccountRequest,
  DisassociateAdminAccountResponse,
  DisassociateAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateAdminAccount",
})) as any;

export type DisassociateThirdPartyFirewallError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Disassociates a Firewall Manager policy administrator from a third-party firewall tenant. When you call `DisassociateThirdPartyFirewall`, the third-party firewall vendor deletes all of the firewalls that are associated with the account.
 */
export const disassociateThirdPartyFirewall: API.OperationMethod<
  DisassociateThirdPartyFirewallRequest,
  DisassociateThirdPartyFirewallResponse,
  DisassociateThirdPartyFirewallError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ThirdPartyFirewall: 0 } },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateThirdPartyFirewall",
})) as any;

export type GetAdminAccountError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns the Organizations account that is associated with Firewall Manager
 * as the Firewall Manager default administrator.
 */
export const getAdminAccount: API.OperationMethod<
  GetAdminAccountRequest,
  GetAdminAccountResponse,
  GetAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdminAccount",
})) as any;

export type GetAdminScopeError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about the specified account's administrative scope. The administrative scope defines the resources that an Firewall Manager administrator can manage.
 */
export const getAdminScope: API.OperationMethod<
  GetAdminScopeRequest,
  GetAdminScopeResponse,
  GetAdminScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { AdminAccount: 0 } },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdminScope",
})) as any;

export type GetAppsListError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about the specified Firewall Manager applications list.
 */
export const getAppsList: API.OperationMethod<
  GetAppsListRequest,
  GetAppsListResponse,
  GetAppsListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ListId: 0, DefaultList: 0 },
    output: { AppsList: o_AppsListData },
  },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAppsList",
})) as any;

export type GetComplianceDetailError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns detailed compliance information about the specified member account. Details
 * include resources that are in and out of compliance with the specified policy.
 *
 * The reasons for resources being considered compliant depend on the Firewall Manager policy type.
 */
export const getComplianceDetail: API.OperationMethod<
  GetComplianceDetailRequest,
  GetComplianceDetailResponse,
  GetComplianceDetailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PolicyId: 0, MemberAccount: 0 },
    output: { PolicyComplianceDetail: { ExpiredAt: D.ts } },
  },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetComplianceDetail",
})) as any;

export type GetNotificationChannelError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Information
 * about the Amazon Simple Notification Service (SNS) topic that is used to
 * record Firewall Manager SNS logs.
 */
export const getNotificationChannel: API.OperationMethod<
  GetNotificationChannelRequest,
  GetNotificationChannelResponse,
  GetNotificationChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: {} },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetNotificationChannel",
})) as any;

export type GetPolicyError =
  | InternalErrorException
  | InvalidOperationException
  | InvalidTypeException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about the specified Firewall Manager policy.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { PolicyId: 0 } },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    InvalidTypeException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
})) as any;

export type GetProtectionStatusError =
  | InternalErrorException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * If you created a Shield Advanced policy, returns policy-level attack summary information
 * in the event of a potential DDoS attack. Other policy types are currently unsupported.
 */
export const getProtectionStatus: API.OperationMethod<
  GetProtectionStatusRequest,
  GetProtectionStatusResponse,
  GetProtectionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      PolicyId: 0,
      MemberAccountId: 0,
      StartTime: 0,
      EndTime: 0,
      NextToken: 0,
      MaxResults: 0,
    },
  },
  errors: [
    InternalErrorException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProtectionStatus",
})) as any;

export type GetProtocolsListError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns information about the specified Firewall Manager protocols list.
 */
export const getProtocolsList: API.OperationMethod<
  GetProtocolsListRequest,
  GetProtocolsListResponse,
  GetProtocolsListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ListId: 0, DefaultList: 0 },
    output: { ProtocolsList: o_ProtocolsListData },
  },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProtocolsList",
})) as any;

export type GetResourceSetError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Gets information about a specific resource set.
 */
export const getResourceSet: API.OperationMethod<
  GetResourceSetRequest,
  GetResourceSetResponse,
  GetResourceSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Identifier: 0 },
    output: { ResourceSet: o_ResourceSet },
  },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceSet",
})) as any;

export type GetThirdPartyFirewallAssociationStatusError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * The onboarding status of a Firewall Manager admin account to third-party firewall vendor tenant.
 */
export const getThirdPartyFirewallAssociationStatus: API.OperationMethod<
  GetThirdPartyFirewallAssociationStatusRequest,
  GetThirdPartyFirewallAssociationStatusResponse,
  GetThirdPartyFirewallAssociationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ThirdPartyFirewall: 0 } },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetThirdPartyFirewallAssociationStatus",
})) as any;

export type GetViolationDetailsError =
  | InternalErrorException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves violations for a resource based on the specified Firewall Manager policy and Amazon Web Services account.
 */
export const getViolationDetails: API.OperationMethod<
  GetViolationDetailsRequest,
  GetViolationDetailsResponse,
  GetViolationDetailsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { PolicyId: 0, MemberAccount: 0, ResourceId: 0, ResourceType: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetViolationDetails",
})) as any;

export type ListAdminAccountsForOrganizationError =
  | InternalErrorException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a `AdminAccounts` object that lists the Firewall Manager administrators within the organization that are onboarded to Firewall Manager by AssociateAdminAccount.
 *
 * This operation can be called only from the organization's management account.
 */
export const listAdminAccountsForOrganization: API.PaginatedOperationMethod<
  ListAdminAccountsForOrganizationRequest,
  ListAdminAccountsForOrganizationResponse,
  ListAdminAccountsForOrganizationError,
  Credentials | HttpClient.HttpClient,
  AdminAccountSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAdminAccountsForOrganization",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AdminAccounts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAdminsManagingAccountError =
  | InternalErrorException
  | InvalidInputException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Lists the accounts that are managing the specified Organizations member account. This is useful for any member account so that they can view the accounts who are managing their account. This operation only returns the managing administrators that have the requested account within their AdminScope.
 */
export const listAdminsManagingAccount: API.PaginatedOperationMethod<
  ListAdminsManagingAccountRequest,
  ListAdminsManagingAccountResponse,
  ListAdminsManagingAccountError,
  Credentials | HttpClient.HttpClient,
  AWSAccountId
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
  errors: [
    InternalErrorException,
    InvalidInputException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAdminsManagingAccount",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AdminAccounts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListAppsListsError =
  | InternalErrorException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an array of `AppsListDataSummary` objects.
 */
export const listAppsLists: API.PaginatedOperationMethod<
  ListAppsListsRequest,
  ListAppsListsResponse,
  ListAppsListsError,
  Credentials | HttpClient.HttpClient,
  AppsListDataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DefaultLists: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppsLists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "AppsLists",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListComplianceStatusError =
  | InternalErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an array of `PolicyComplianceStatus` objects. Use
 * `PolicyComplianceStatus` to get a summary of which member accounts are protected
 * by the specified policy.
 */
export const listComplianceStatus: API.PaginatedOperationMethod<
  ListComplianceStatusRequest,
  ListComplianceStatusResponse,
  ListComplianceStatusError,
  Credentials | HttpClient.HttpClient,
  PolicyComplianceStatus
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { PolicyId: 0, NextToken: 0, MaxResults: 0 },
    output: { PolicyComplianceStatusList: D.list({ LastUpdated: D.ts }) },
  },
  errors: [InternalErrorException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListComplianceStatus",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PolicyComplianceStatusList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListDiscoveredResourcesError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | CommonErrors;
/**
 * Returns an array of resources in the organization's accounts that are available to be associated with a resource set.
 */
export const listDiscoveredResources: API.OperationMethod<
  ListDiscoveredResourcesRequest,
  ListDiscoveredResourcesResponse,
  ListDiscoveredResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      MemberAccountIds: 0,
      ResourceType: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDiscoveredResources",
})) as any;

export type ListMemberAccountsError =
  | InternalErrorException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns a `MemberAccounts` object that lists the member accounts in the
 * administrator's Amazon Web Services organization.
 *
 * Either an Firewall Manager administrator or the organization's management account can make this request.
 */
export const listMemberAccounts: API.PaginatedOperationMethod<
  ListMemberAccountsRequest,
  ListMemberAccountsResponse,
  ListMemberAccountsError,
  Credentials | HttpClient.HttpClient,
  AWSAccountId
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
  errors: [InternalErrorException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMemberAccounts",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "MemberAccounts",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListPoliciesError =
  | InternalErrorException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an array of `PolicySummary` objects.
 */
export const listPolicies: API.PaginatedOperationMethod<
  ListPoliciesRequest,
  ListPoliciesResponse,
  ListPoliciesError,
  Credentials | HttpClient.HttpClient,
  PolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { NextToken: 0, MaxResults: 0 } },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "PolicyList",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProtocolsListsError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an array of `ProtocolsListDataSummary` objects.
 */
export const listProtocolsLists: API.PaginatedOperationMethod<
  ListProtocolsListsRequest,
  ListProtocolsListsResponse,
  ListProtocolsListsError,
  Credentials | HttpClient.HttpClient,
  ProtocolsListDataSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { DefaultLists: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProtocolsLists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ProtocolsLists",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResourceSetResourcesError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Returns an array of resources that are currently associated to a resource set.
 */
export const listResourceSetResources: API.OperationMethod<
  ListResourceSetResourcesRequest,
  ListResourceSetResourcesResponse,
  ListResourceSetResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Identifier: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceSetResources",
})) as any;

export type ListResourceSetsError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | CommonErrors;
/**
 * Returns an array of `ResourceSetSummary` objects.
 */
export const listResourceSets: API.OperationMethod<
  ListResourceSetsRequest,
  ListResourceSetsResponse,
  ListResourceSetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { NextToken: 0, MaxResults: 0 },
    output: { ResourceSets: D.list({ LastUpdateTime: D.ts }) },
  },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceSets",
})) as any;

export type ListTagsForResourceError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves the list of tags for the specified Amazon Web Services resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0 } },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListThirdPartyFirewallFirewallPoliciesError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Retrieves a list of all of the third-party firewall policies that are associated with the third-party firewall administrator's account.
 */
export const listThirdPartyFirewallFirewallPolicies: API.PaginatedOperationMethod<
  ListThirdPartyFirewallFirewallPoliciesRequest,
  ListThirdPartyFirewallFirewallPoliciesResponse,
  ListThirdPartyFirewallFirewallPoliciesError,
  Credentials | HttpClient.HttpClient,
  ThirdPartyFirewallFirewallPolicy
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ThirdPartyFirewall: 0, NextToken: 0, MaxResults: 0 },
  },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListThirdPartyFirewallFirewallPolicies",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ThirdPartyFirewallFirewallPolicies",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutAdminAccountError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates or updates an Firewall Manager administrator account. The account must be a member of the organization that was onboarded to Firewall Manager by AssociateAdminAccount. Only the organization's management account can create an Firewall Manager administrator account. When you create an Firewall Manager administrator account, the service checks to see if the account is already a delegated administrator within Organizations. If the account isn't a delegated administrator, Firewall Manager calls Organizations to delegate the account within Organizations. For more information about administrator accounts within Organizations, see
 * Managing the Amazon Web Services Accounts in Your Organization.
 */
export const putAdminAccount: API.OperationMethod<
  PutAdminAccountRequest,
  PutAdminAccountResponse,
  PutAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AdminAccount: 0,
      AdminScope: {
        AccountScope: {
          Accounts: 0,
          AllAccountsEnabled: 0,
          ExcludeSpecifiedAccounts: 0,
        },
        OrganizationalUnitScope: {
          OrganizationalUnits: 0,
          AllOrganizationalUnitsEnabled: 0,
          ExcludeSpecifiedOrganizationalUnits: 0,
        },
        RegionScope: { Regions: 0, AllRegionsEnabled: 0 },
        PolicyTypeScope: { PolicyTypes: 0, AllPolicyTypesEnabled: 0 },
      },
    },
  },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAdminAccount",
})) as any;

export type PutAppsListError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an Firewall Manager applications list.
 */
export const putAppsList: API.OperationMethod<
  PutAppsListRequest,
  PutAppsListResponse,
  PutAppsListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      AppsList: {
        ListId: 0,
        ListName: 0,
        ListUpdateToken: 0,
        CreateTime: 0,
        LastUpdateTime: 0,
        AppsList: D.list(i_App),
        PreviousAppsList: D.map(D.list(i_App)),
      },
      TagList: D.list(i_Tag),
    },
    output: { AppsList: o_AppsListData },
  },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAppsList",
})) as any;

export type PutNotificationChannelError =
  | InternalErrorException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Designates the IAM role and Amazon Simple Notification Service (SNS) topic that
 * Firewall Manager uses to record SNS logs.
 *
 * To perform this action outside of the console, you must first configure the SNS topic's access policy to allow the `SnsRoleName` to publish SNS logs. If the `SnsRoleName` provided is a role other than the `AWSServiceRoleForFMS` service-linked role, this role must have a trust relationship configured to allow the Firewall Manager service principal `fms.amazonaws.com` to assume this role. For information about configuring an SNS access policy, see
 * Service roles for Firewall Manager in the *Firewall Manager Developer Guide*.
 */
export const putNotificationChannel: API.OperationMethod<
  PutNotificationChannelRequest,
  PutNotificationChannelResponse,
  PutNotificationChannelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { SnsTopicArn: 0, SnsRoleName: 0 } },
  errors: [
    InternalErrorException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutNotificationChannel",
})) as any;

export type PutPolicyError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | InvalidTypeException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an Firewall Manager policy.
 *
 * A Firewall Manager policy is specific to the individual policy type. If you want to enforce multiple
 * policy types across accounts, you can create multiple policies. You can create more than one
 * policy for each type.
 *
 * If you add a new account to an organization that you created with Organizations, Firewall Manager
 * automatically applies the policy to the resources in that account that are within scope of
 * the policy.
 *
 * Firewall Manager provides the following types of policies:
 *
 * - **WAF policy** - This policy applies WAF web ACL
 * protections to specified accounts and resources.
 *
 * - **Shield Advanced policy** - This policy applies Shield Advanced
 * protection to specified accounts and resources.
 *
 * - **Security Groups policy** - This type of policy gives you
 * control over security groups that are in use throughout your organization in
 * Organizations and lets you enforce a baseline set of rules across your organization.
 *
 * - **Network ACL policy** - This type of policy gives you
 * control over the network ACLs that are in use throughout your organization in
 * Organizations and lets you enforce a baseline set of first and last network ACL rules across your organization.
 *
 * - **Network Firewall policy** - This policy applies
 * Network Firewall protection to your organization's VPCs.
 *
 * - **DNS Firewall policy** - This policy applies
 * Amazon Route 53 Resolver DNS Firewall protections to your organization's VPCs.
 *
 * - **Third-party firewall policy** - This policy applies third-party firewall protections. Third-party firewalls are available by subscription through the Amazon Web Services Marketplace console at Amazon Web Services Marketplace.
 *
 * - **Palo Alto Networks Cloud NGFW policy** - This policy applies Palo Alto Networks Cloud Next Generation Firewall (NGFW) protections and Palo Alto Networks Cloud NGFW rulestacks to your organization's VPCs.
 *
 * - **Fortigate CNF policy** - This policy applies
 * Fortigate Cloud Native Firewall (CNF) protections. Fortigate CNF is a cloud-centered solution that blocks Zero-Day threats and secures cloud infrastructures with industry-leading advanced threat prevention, smart web application firewalls (WAF), and API protection.
 */
export const putPolicy: API.OperationMethod<
  PutPolicyRequest,
  PutPolicyResponse,
  PutPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Policy: {
        PolicyId: 0,
        PolicyName: 0,
        PolicyUpdateToken: 0,
        SecurityServicePolicyData: {
          Type: 0,
          ManagedServiceData: 0,
          PolicyOption: {
            NetworkFirewallPolicy: { FirewallDeploymentModel: 0 },
            ThirdPartyFirewallPolicy: { FirewallDeploymentModel: 0 },
            NetworkAclCommonPolicy: {
              NetworkAclEntrySet: {
                FirstEntries: D.list(i_NetworkAclEntry),
                ForceRemediateForFirstEntries: 0,
                LastEntries: D.list(i_NetworkAclEntry),
                ForceRemediateForLastEntries: 0,
              },
            },
          },
        },
        ResourceType: 0,
        ResourceTypeList: 0,
        ResourceTags: D.list({ Key: 0, Value: 0 }),
        ExcludeResourceTags: 0,
        RemediationEnabled: 0,
        DeleteUnusedFMManagedResources: 0,
        IncludeMap: 0,
        ExcludeMap: 0,
        ResourceSetIds: 0,
        PolicyDescription: 0,
        PolicyStatus: 0,
        ResourceTagLogicalOperator: 0,
      },
      TagList: D.list(i_Tag),
    },
  },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    InvalidTypeException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutPolicy",
})) as any;

export type PutProtocolsListError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Creates an Firewall Manager protocols list.
 */
export const putProtocolsList: API.OperationMethod<
  PutProtocolsListRequest,
  PutProtocolsListResponse,
  PutProtocolsListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ProtocolsList: {
        ListId: 0,
        ListName: 0,
        ListUpdateToken: 0,
        CreateTime: 0,
        LastUpdateTime: 0,
        ProtocolsList: 0,
        PreviousProtocolsList: 0,
      },
      TagList: D.list(i_Tag),
    },
    output: { ProtocolsList: o_ProtocolsListData },
  },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutProtocolsList",
})) as any;

export type PutResourceSetError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | CommonErrors;
/**
 * Creates the resource set.
 *
 * An Firewall Manager resource set defines the resources to import into an Firewall Manager policy from another Amazon Web Services service.
 */
export const putResourceSet: API.OperationMethod<
  PutResourceSetRequest,
  PutResourceSetResponse,
  PutResourceSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResourceSet: {
        Id: 0,
        Name: 0,
        Description: 0,
        UpdateToken: 0,
        ResourceTypeList: 0,
        LastUpdateTime: 0,
        ResourceSetStatus: 0,
      },
      TagList: D.list(i_Tag),
    },
    output: { ResourceSet: o_ResourceSet },
  },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourceSet",
})) as any;

export type TagResourceError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | LimitExceededException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more tags to an Amazon Web Services resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceArn: 0, TagList: D.list(i_Tag) },
  },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    LimitExceededException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalErrorException
  | InvalidInputException
  | InvalidOperationException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from an Amazon Web Services resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [
    InternalErrorException,
    InvalidInputException,
    InvalidOperationException,
    ResourceNotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

const i_App: D.LazyStruct = () => ({ AppName: 0, Protocol: 0, Port: 0 });
const i_NetworkAclEntry: D.LazyStruct = () => ({
  IcmpTypeCode: { Code: 0, Type: 0 },
  Protocol: 0,
  PortRange: { From: 0, To: 0 },
  CidrBlock: 0,
  Ipv6CidrBlock: 0,
  RuleAction: 0,
  Egress: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const o_AppsListData: D.LazyStruct = () => ({
  CreateTime: D.ts,
  LastUpdateTime: D.ts,
});
const o_ProtocolsListData: D.LazyStruct = () => ({
  CreateTime: D.ts,
  LastUpdateTime: D.ts,
});
const o_ResourceSet: D.LazyStruct = () => ({ LastUpdateTime: D.ts });
