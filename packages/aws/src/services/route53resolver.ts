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
  sdkId: "Route53Resolver",
  target: "Route53Resolver",
  version: "2018-04-01",
  sigv4: "route53resolver",
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
                `https://route53resolver-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (Region === "us-gov-east-1") {
                return e("https://route53resolver.us-gov-east-1.amazonaws.com");
              }
              if (Region === "us-gov-west-1") {
                return e("https://route53resolver.us-gov-west-1.amazonaws.com");
              }
              return e(
                `https://route53resolver-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://route53resolver.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://route53resolver.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class AccessDeniedException
  extends /*@__PURE__*/ TE.TaggedError("AccessDeniedException", ["AuthError"])<{
    readonly message?: string;
  }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException")<{
    readonly message?: string;
  }> {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ TE.TaggedError("InternalServiceErrorException")<{
    readonly message?: string;
  }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError("InvalidNextTokenException")<{
    readonly message?: string;
  }> {}
export class InvalidParameterException
  extends /*@__PURE__*/ TE.TaggedError("InvalidParameterException")<{
    readonly message: string;
    readonly FieldName?: string;
  }> {}
export class InvalidPolicyDocument
  extends /*@__PURE__*/ TE.TaggedError("InvalidPolicyDocument")<{
    readonly message?: string;
  }> {}
export class InvalidRequestException
  extends /*@__PURE__*/ TE.TaggedError("InvalidRequestException")<{
    readonly message?: string;
  }> {}
export class InvalidTagException
  extends /*@__PURE__*/ TE.TaggedError("InvalidTagException")<{
    readonly message?: string;
  }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError("LimitExceededException")<{
    readonly message?: string;
    readonly ResourceType?: string;
  }> {}
export class ResourceExistsException
  extends /*@__PURE__*/ TE.TaggedError("ResourceExistsException")<{
    readonly message?: string;
    readonly ResourceType?: string;
  }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError("ResourceInUseException")<{
    readonly message?: string;
    readonly ResourceType?: string;
  }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError("ResourceNotFoundException")<{
    readonly message?: string;
    readonly ResourceType?: string;
  }> {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError("ResourceUnavailableException")<{
    readonly message?: string;
    readonly ResourceType?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError("ServiceQuotaExceededException")<{
    readonly message?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError("ThrottlingException")<{
    readonly message?: string;
  }> {}
export class UnknownResourceException
  extends /*@__PURE__*/ TE.TaggedError("UnknownResourceException")<{
    readonly message?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError("ValidationException")<{
    readonly message?: string;
  }> {}
export type CreatorRequestId = string;
export type ResourceId = string;
export type Priority = number;
export type Name = string;
export type MutationProtectionStatus = "ENABLED" | "DISABLED" | (string & {});
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface AssociateFirewallRuleGroupRequest {
  CreatorRequestId: string;
  FirewallRuleGroupId: string;
  VpcId: string;
  Priority: number;
  Name: string;
  MutationProtection?: MutationProtectionStatus;
  Tags?: Tag[];
}
export type Arn = string;
export type ServicePrinciple = string;
export type FirewallRuleGroupAssociationStatus =
  | "COMPLETE"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export type StatusMessage = string;
export type Rfc3339TimeString = string;
export interface FirewallRuleGroupAssociation {
  Id?: string;
  Arn?: string;
  FirewallRuleGroupId?: string;
  VpcId?: string;
  Name?: string;
  Priority?: number;
  MutationProtection?: MutationProtectionStatus;
  ManagedOwnerName?: string;
  Status?: FirewallRuleGroupAssociationStatus;
  StatusMessage?: string;
  CreatorRequestId?: string;
  CreationTime?: string;
  ModificationTime?: string;
}
export interface AssociateFirewallRuleGroupResponse {
  FirewallRuleGroupAssociation?: FirewallRuleGroupAssociation;
}
export type SubnetId = string;
export type Ip = string;
export type Ipv6 = string;
export interface IpAddressUpdate {
  IpId?: string;
  SubnetId?: string;
  Ip?: string;
  Ipv6?: string;
}
export interface AssociateResolverEndpointIpAddressRequest {
  ResolverEndpointId: string;
  IpAddress: IpAddressUpdate;
}
export type SecurityGroupIds = string[];
export type ResolverEndpointDirection =
  | "INBOUND"
  | "OUTBOUND"
  | "INBOUND_DELEGATION"
  | (string & {});
export type IpAddressCount = number;
export type ResolverEndpointStatus =
  | "CREATING"
  | "OPERATIONAL"
  | "UPDATING"
  | "AUTO_RECOVERING"
  | "ACTION_NEEDED"
  | "DELETING"
  | (string & {});
export type OutpostArn = string;
export type OutpostInstanceType = string;
export type ResolverEndpointType =
  | "IPV6"
  | "IPV4"
  | "DUALSTACK"
  | (string & {});
export type Protocol = "DoH" | "Do53" | "DoH-FIPS" | (string & {});
export type ProtocolList = Protocol[];
export type RniEnhancedMetricsEnabled = boolean;
export type TargetNameServerMetricsEnabled = boolean;
export type Dns64Enabled = boolean;
export type Ipv6InternetAccessEnabled = boolean;
export interface ResolverEndpoint {
  Id?: string;
  CreatorRequestId?: string;
  Arn?: string;
  Name?: string;
  SecurityGroupIds?: string[];
  Direction?: ResolverEndpointDirection;
  IpAddressCount?: number;
  HostVPCId?: string;
  Status?: ResolverEndpointStatus;
  StatusMessage?: string;
  CreationTime?: string;
  ModificationTime?: string;
  OutpostArn?: string;
  PreferredInstanceType?: string;
  ResolverEndpointType?: ResolverEndpointType;
  Protocols?: Protocol[];
  RniEnhancedMetricsEnabled?: boolean;
  TargetNameServerMetricsEnabled?: boolean;
  Dns64Enabled?: boolean;
  Ipv6InternetAccessEnabled?: boolean;
}
export interface AssociateResolverEndpointIpAddressResponse {
  ResolverEndpoint?: ResolverEndpoint;
}
export interface AssociateResolverQueryLogConfigRequest {
  ResolverQueryLogConfigId: string;
  ResourceId: string;
}
export type ResolverQueryLogConfigAssociationStatus =
  | "CREATING"
  | "ACTIVE"
  | "ACTION_NEEDED"
  | "DELETING"
  | "FAILED"
  | (string & {});
export type ResolverQueryLogConfigAssociationError =
  | "NONE"
  | "DESTINATION_NOT_FOUND"
  | "ACCESS_DENIED"
  | "INTERNAL_SERVICE_ERROR"
  | (string & {});
export type ResolverQueryLogConfigAssociationErrorMessage = string;
export interface ResolverQueryLogConfigAssociation {
  Id?: string;
  ResolverQueryLogConfigId?: string;
  ResourceId?: string;
  Status?: ResolverQueryLogConfigAssociationStatus;
  Error?: ResolverQueryLogConfigAssociationError;
  ErrorMessage?: string;
  CreationTime?: string;
}
export interface AssociateResolverQueryLogConfigResponse {
  ResolverQueryLogConfigAssociation?: ResolverQueryLogConfigAssociation;
}
export interface AssociateResolverRuleRequest {
  ResolverRuleId: string;
  Name?: string;
  VPCId: string;
}
export type ResolverRuleAssociationStatus =
  | "CREATING"
  | "COMPLETE"
  | "DELETING"
  | "FAILED"
  | "OVERRIDDEN"
  | (string & {});
export interface ResolverRuleAssociation {
  Id?: string;
  ResolverRuleId?: string;
  Name?: string;
  VPCId?: string;
  Status?: ResolverRuleAssociationStatus;
  StatusMessage?: string;
}
export interface AssociateResolverRuleResponse {
  ResolverRuleAssociation?: ResolverRuleAssociation;
}
export type Action = "ALLOW" | "BLOCK" | "ALERT" | (string & {});
export type BlockResponse = "NODATA" | "NXDOMAIN" | "OVERRIDE" | (string & {});
export type BlockOverrideDomain = string;
export type BlockOverrideDnsType = "CNAME" | (string & {});
export type BlockOverrideTtl = number;
export type FirewallDomainRedirectionAction =
  | "INSPECT_REDIRECTION_DOMAIN"
  | "TRUST_REDIRECTION_DOMAIN"
  | (string & {});
export type Qtype = string;
export type DnsThreatProtection =
  | "DGA"
  | "DNS_TUNNELING"
  | "DICTIONARY_DGA"
  | (string & {});
export type ConfidenceThreshold = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export type PartnerValue = string;
export interface PartnerThreatProtectionConfig {
  Partner: string;
}
export type FirewallAdvancedContentCategoryValue = string;
export interface FirewallAdvancedContentCategoryConfig {
  Category: string;
}
export type FirewallAdvancedThreatCategoryValue = string;
export interface FirewallAdvancedThreatCategoryConfig {
  Category: string;
}
export type DnsThreatProtectionRuleTypeValue = string;
export interface DnsThreatProtectionRuleTypeConfig {
  Value: string;
  ConfidenceThreshold: ConfidenceThreshold;
}
export interface FirewallRuleType {
  PartnerThreatProtection?: PartnerThreatProtectionConfig;
  FirewallAdvancedContentCategory?: FirewallAdvancedContentCategoryConfig;
  FirewallAdvancedThreatCategory?: FirewallAdvancedThreatCategoryConfig;
  DnsThreatProtection?: DnsThreatProtectionRuleTypeConfig;
}
export interface CreateFirewallRuleEntry {
  CreatorRequestId: string;
  FirewallRuleGroupId: string;
  FirewallDomainListId?: string;
  Priority: number;
  Action: Action;
  BlockResponse?: BlockResponse;
  BlockOverrideDomain?: string;
  BlockOverrideDnsType?: BlockOverrideDnsType;
  BlockOverrideTtl?: number;
  Name: string;
  FirewallDomainRedirectionAction?: FirewallDomainRedirectionAction;
  Qtype?: string;
  DnsThreatProtection?: DnsThreatProtection;
  ConfidenceThreshold?: ConfidenceThreshold;
  FirewallRuleType?: FirewallRuleType;
}
export type CreateFirewallRuleEntries = CreateFirewallRuleEntry[];
export interface BatchCreateFirewallRuleRequest {
  CreateFirewallRuleEntries: CreateFirewallRuleEntry[];
}
export type Unsigned = number;
export type FirewallRuleStatus = string;
export type FirewallRuleStatusMessage = string;
export interface FirewallRule {
  FirewallRuleGroupId?: string;
  FirewallDomainListId?: string;
  FirewallThreatProtectionId?: string;
  Name?: string;
  Priority?: number;
  Action?: Action;
  BlockResponse?: BlockResponse;
  BlockOverrideDomain?: string;
  BlockOverrideDnsType?: BlockOverrideDnsType;
  BlockOverrideTtl?: number;
  CreatorRequestId?: string;
  CreationTime?: string;
  ModificationTime?: string;
  FirewallDomainRedirectionAction?: FirewallDomainRedirectionAction;
  Qtype?: string;
  DnsThreatProtection?: DnsThreatProtection;
  ConfidenceThreshold?: ConfidenceThreshold;
  FirewallRuleType?: FirewallRuleType;
  Status?: string;
  StatusMessage?: string;
}
export type FirewallRules = FirewallRule[];
export interface BatchCreateFirewallRuleError_ {
  FirewallRule?: CreateFirewallRuleEntry;
  Code?: string;
  Message?: string;
}
export type BatchCreateFirewallRuleErrors = BatchCreateFirewallRuleError_[];
export interface BatchCreateFirewallRuleResponse {
  CreatedFirewallRules?: FirewallRule[];
  CreateErrors?: BatchCreateFirewallRuleError_[];
}
export interface DeleteFirewallRuleEntry {
  FirewallRuleGroupId: string;
  FirewallDomainListId?: string;
  FirewallThreatProtectionId?: string;
  Qtype?: string;
}
export type DeleteFirewallRuleEntries = DeleteFirewallRuleEntry[];
export interface BatchDeleteFirewallRuleRequest {
  DeleteFirewallRuleEntries: DeleteFirewallRuleEntry[];
}
export interface BatchDeleteFirewallRuleError_ {
  FirewallRule?: DeleteFirewallRuleEntry;
  Code?: string;
  Message?: string;
}
export type BatchDeleteFirewallRuleErrors = BatchDeleteFirewallRuleError_[];
export interface BatchDeleteFirewallRuleResponse {
  DeletedFirewallRules?: FirewallRule[];
  DeleteErrors?: BatchDeleteFirewallRuleError_[];
}
export interface UpdateFirewallRuleEntry {
  FirewallRuleGroupId: string;
  FirewallDomainListId?: string;
  FirewallThreatProtectionId?: string;
  Priority?: number;
  Action?: Action;
  BlockResponse?: BlockResponse;
  BlockOverrideDomain?: string;
  BlockOverrideDnsType?: BlockOverrideDnsType;
  BlockOverrideTtl?: number;
  Name?: string;
  FirewallDomainRedirectionAction?: FirewallDomainRedirectionAction;
  Qtype?: string;
  DnsThreatProtection?: DnsThreatProtection;
  ConfidenceThreshold?: ConfidenceThreshold;
  FirewallRuleType?: FirewallRuleType;
}
export type UpdateFirewallRuleEntries = UpdateFirewallRuleEntry[];
export interface BatchUpdateFirewallRuleRequest {
  UpdateFirewallRuleEntries: UpdateFirewallRuleEntry[];
}
export interface BatchUpdateFirewallRuleError_ {
  FirewallRule?: UpdateFirewallRuleEntry;
  Code?: string;
  Message?: string;
}
export type BatchUpdateFirewallRuleErrors = BatchUpdateFirewallRuleError_[];
export interface BatchUpdateFirewallRuleResponse {
  UpdatedFirewallRules?: FirewallRule[];
  UpdateErrors?: BatchUpdateFirewallRuleError_[];
}
export interface CreateFirewallDomainListRequest {
  CreatorRequestId: string;
  Name: string;
  Tags?: Tag[];
}
export type FirewallDomainListStatus =
  | "COMPLETE"
  | "COMPLETE_IMPORT_FAILED"
  | "IMPORTING"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export type Category = string;
export type DomainListType = "THREAT" | "CONTENT" | (string & {});
export interface FirewallDomainList {
  Id?: string;
  Arn?: string;
  Name?: string;
  DomainCount?: number;
  Status?: FirewallDomainListStatus;
  StatusMessage?: string;
  ManagedOwnerName?: string;
  CreatorRequestId?: string;
  CreationTime?: string;
  ModificationTime?: string;
  Category?: string;
  ManagedListType?: DomainListType;
}
export interface CreateFirewallDomainListResponse {
  FirewallDomainList?: FirewallDomainList;
}
export interface CreateFirewallRuleRequest {
  CreatorRequestId: string;
  FirewallRuleGroupId: string;
  FirewallDomainListId?: string;
  Priority: number;
  Action: Action;
  BlockResponse?: BlockResponse;
  BlockOverrideDomain?: string;
  BlockOverrideDnsType?: BlockOverrideDnsType;
  BlockOverrideTtl?: number;
  Name: string;
  FirewallDomainRedirectionAction?: FirewallDomainRedirectionAction;
  Qtype?: string;
  DnsThreatProtection?: DnsThreatProtection;
  ConfidenceThreshold?: ConfidenceThreshold;
  FirewallRuleType?: FirewallRuleType;
}
export interface CreateFirewallRuleResponse {
  FirewallRule?: FirewallRule;
}
export interface CreateFirewallRuleGroupRequest {
  CreatorRequestId: string;
  Name: string;
  Tags?: Tag[];
}
export type FirewallRuleGroupStatus =
  | "COMPLETE"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export type AccountId = string;
export type ShareStatus =
  | "NOT_SHARED"
  | "SHARED_WITH_ME"
  | "SHARED_BY_ME"
  | (string & {});
export interface FirewallRuleGroup {
  Id?: string;
  Arn?: string;
  Name?: string;
  RuleCount?: number;
  Status?: FirewallRuleGroupStatus;
  StatusMessage?: string;
  OwnerId?: string;
  CreatorRequestId?: string;
  ShareStatus?: ShareStatus;
  CreationTime?: string;
  ModificationTime?: string;
}
export interface CreateFirewallRuleGroupResponse {
  FirewallRuleGroup?: FirewallRuleGroup;
}
export type OutpostResolverName = string;
export type InstanceCount = number;
export interface CreateOutpostResolverRequest {
  CreatorRequestId: string;
  Name: string;
  InstanceCount?: number;
  PreferredInstanceType: string;
  OutpostArn: string;
  Tags?: Tag[];
}
export type OutpostResolverStatus =
  | "CREATING"
  | "OPERATIONAL"
  | "UPDATING"
  | "DELETING"
  | "ACTION_NEEDED"
  | "FAILED_CREATION"
  | "FAILED_DELETION"
  | (string & {});
export type OutpostResolverStatusMessage = string;
export interface OutpostResolver {
  Arn?: string;
  CreationTime?: string;
  ModificationTime?: string;
  CreatorRequestId?: string;
  Id?: string;
  InstanceCount?: number;
  PreferredInstanceType?: string;
  Name?: string;
  Status?: OutpostResolverStatus;
  StatusMessage?: string;
  OutpostArn?: string;
}
export interface CreateOutpostResolverResponse {
  OutpostResolver?: OutpostResolver;
}
export interface IpAddressRequest {
  SubnetId: string;
  Ip?: string;
  Ipv6?: string;
}
export type IpAddressesRequest = IpAddressRequest[];
export interface CreateResolverEndpointRequest {
  CreatorRequestId: string;
  Name?: string;
  SecurityGroupIds: string[];
  Direction: ResolverEndpointDirection;
  IpAddresses: IpAddressRequest[];
  OutpostArn?: string;
  PreferredInstanceType?: string;
  Tags?: Tag[];
  ResolverEndpointType?: ResolverEndpointType;
  Protocols?: Protocol[];
  RniEnhancedMetricsEnabled?: boolean;
  TargetNameServerMetricsEnabled?: boolean;
  Dns64Enabled?: boolean;
  Ipv6InternetAccessEnabled?: boolean;
}
export interface CreateResolverEndpointResponse {
  ResolverEndpoint?: ResolverEndpoint;
}
export type ResolverQueryLogConfigName = string;
export type DestinationArn = string;
export interface CreateResolverQueryLogConfigRequest {
  Name: string;
  DestinationArn: string;
  CreatorRequestId: string;
  Tags?: Tag[];
}
export type ResolverQueryLogConfigStatus =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | "FAILED"
  | (string & {});
export type Count = number;
export interface ResolverQueryLogConfig {
  Id?: string;
  OwnerId?: string;
  Status?: ResolverQueryLogConfigStatus;
  ShareStatus?: ShareStatus;
  AssociationCount?: number;
  Arn?: string;
  Name?: string;
  DestinationArn?: string;
  CreatorRequestId?: string;
  CreationTime?: string;
}
export interface CreateResolverQueryLogConfigResponse {
  ResolverQueryLogConfig?: ResolverQueryLogConfig;
}
export type RuleTypeOption =
  | "FORWARD"
  | "SYSTEM"
  | "RECURSIVE"
  | "DELEGATE"
  | (string & {});
export type DomainName = string;
export type Port = number;
export type ServerNameIndication = string;
export interface TargetAddress {
  Ip?: string;
  Port?: number;
  Ipv6?: string;
  Protocol?: Protocol;
  ServerNameIndication?: string;
}
export type TargetList = TargetAddress[];
export type DelegationRecord = string;
export interface CreateResolverRuleRequest {
  CreatorRequestId: string;
  Name?: string;
  RuleType: RuleTypeOption;
  DomainName?: string;
  TargetIps?: TargetAddress[];
  ResolverEndpointId?: string;
  Tags?: Tag[];
  DelegationRecord?: string;
}
export type ResolverRuleStatus =
  | "COMPLETE"
  | "DELETING"
  | "UPDATING"
  | "FAILED"
  | (string & {});
export interface ResolverRule {
  Id?: string;
  CreatorRequestId?: string;
  Arn?: string;
  DomainName?: string;
  Status?: ResolverRuleStatus;
  StatusMessage?: string;
  RuleType?: RuleTypeOption;
  Name?: string;
  TargetIps?: TargetAddress[];
  ResolverEndpointId?: string;
  OwnerId?: string;
  ShareStatus?: ShareStatus;
  CreationTime?: string;
  ModificationTime?: string;
  DelegationRecord?: string;
}
export interface CreateResolverRuleResponse {
  ResolverRule?: ResolverRule;
}
export interface DeleteFirewallDomainListRequest {
  FirewallDomainListId: string;
}
export interface DeleteFirewallDomainListResponse {
  FirewallDomainList?: FirewallDomainList;
}
export interface DeleteFirewallRuleRequest {
  FirewallRuleGroupId: string;
  FirewallDomainListId?: string;
  FirewallThreatProtectionId?: string;
  Qtype?: string;
}
export interface DeleteFirewallRuleResponse {
  FirewallRule?: FirewallRule;
}
export interface DeleteFirewallRuleGroupRequest {
  FirewallRuleGroupId: string;
}
export interface DeleteFirewallRuleGroupResponse {
  FirewallRuleGroup?: FirewallRuleGroup;
}
export interface DeleteOutpostResolverRequest {
  Id: string;
}
export interface DeleteOutpostResolverResponse {
  OutpostResolver?: OutpostResolver;
}
export interface DeleteResolverEndpointRequest {
  ResolverEndpointId: string;
}
export interface DeleteResolverEndpointResponse {
  ResolverEndpoint?: ResolverEndpoint;
}
export interface DeleteResolverQueryLogConfigRequest {
  ResolverQueryLogConfigId: string;
}
export interface DeleteResolverQueryLogConfigResponse {
  ResolverQueryLogConfig?: ResolverQueryLogConfig;
}
export interface DeleteResolverRuleRequest {
  ResolverRuleId: string;
}
export interface DeleteResolverRuleResponse {
  ResolverRule?: ResolverRule;
}
export interface DisassociateFirewallRuleGroupRequest {
  FirewallRuleGroupAssociationId: string;
}
export interface DisassociateFirewallRuleGroupResponse {
  FirewallRuleGroupAssociation?: FirewallRuleGroupAssociation;
}
export interface DisassociateResolverEndpointIpAddressRequest {
  ResolverEndpointId: string;
  IpAddress: IpAddressUpdate;
}
export interface DisassociateResolverEndpointIpAddressResponse {
  ResolverEndpoint?: ResolverEndpoint;
}
export interface DisassociateResolverQueryLogConfigRequest {
  ResolverQueryLogConfigId: string;
  ResourceId: string;
}
export interface DisassociateResolverQueryLogConfigResponse {
  ResolverQueryLogConfigAssociation?: ResolverQueryLogConfigAssociation;
}
export interface DisassociateResolverRuleRequest {
  VPCId: string;
  ResolverRuleId: string;
}
export interface DisassociateResolverRuleResponse {
  ResolverRuleAssociation?: ResolverRuleAssociation;
}
export interface GetFirewallConfigRequest {
  ResourceId: string;
}
export type FirewallFailOpenStatus =
  | "ENABLED"
  | "DISABLED"
  | "USE_LOCAL_RESOURCE_SETTING"
  | (string & {});
export interface FirewallConfig {
  Id?: string;
  ResourceId?: string;
  OwnerId?: string;
  FirewallFailOpen?: FirewallFailOpenStatus;
}
export interface GetFirewallConfigResponse {
  FirewallConfig?: FirewallConfig;
}
export interface GetFirewallDomainListRequest {
  FirewallDomainListId: string;
}
export interface GetFirewallDomainListResponse {
  FirewallDomainList?: FirewallDomainList;
}
export interface GetFirewallRuleGroupRequest {
  FirewallRuleGroupId: string;
}
export interface GetFirewallRuleGroupResponse {
  FirewallRuleGroup?: FirewallRuleGroup;
}
export interface GetFirewallRuleGroupAssociationRequest {
  FirewallRuleGroupAssociationId: string;
}
export interface GetFirewallRuleGroupAssociationResponse {
  FirewallRuleGroupAssociation?: FirewallRuleGroupAssociation;
}
export interface GetFirewallRuleGroupPolicyRequest {
  Arn: string;
}
export type FirewallRuleGroupPolicy = string;
export interface GetFirewallRuleGroupPolicyResponse {
  FirewallRuleGroupPolicy?: string;
}
export interface GetOutpostResolverRequest {
  Id: string;
}
export interface GetOutpostResolverResponse {
  OutpostResolver?: OutpostResolver;
}
export interface GetResolverConfigRequest {
  ResourceId: string;
}
export type ResolverAutodefinedReverseStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "DISABLED"
  | "UPDATING_TO_USE_LOCAL_RESOURCE_SETTING"
  | "USE_LOCAL_RESOURCE_SETTING"
  | (string & {});
export interface ResolverConfig {
  Id?: string;
  ResourceId?: string;
  OwnerId?: string;
  AutodefinedReverse?: ResolverAutodefinedReverseStatus;
}
export interface GetResolverConfigResponse {
  ResolverConfig?: ResolverConfig;
}
export interface GetResolverDnssecConfigRequest {
  ResourceId: string;
}
export type ResolverDNSSECValidationStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "DISABLED"
  | "UPDATING_TO_USE_LOCAL_RESOURCE_SETTING"
  | "USE_LOCAL_RESOURCE_SETTING"
  | (string & {});
export interface ResolverDnssecConfig {
  Id?: string;
  OwnerId?: string;
  ResourceId?: string;
  ValidationStatus?: ResolverDNSSECValidationStatus;
}
export interface GetResolverDnssecConfigResponse {
  ResolverDNSSECConfig?: ResolverDnssecConfig;
}
export interface GetResolverEndpointRequest {
  ResolverEndpointId: string;
}
export interface GetResolverEndpointResponse {
  ResolverEndpoint?: ResolverEndpoint;
}
export interface GetResolverQueryLogConfigRequest {
  ResolverQueryLogConfigId: string;
}
export interface GetResolverQueryLogConfigResponse {
  ResolverQueryLogConfig?: ResolverQueryLogConfig;
}
export interface GetResolverQueryLogConfigAssociationRequest {
  ResolverQueryLogConfigAssociationId: string;
}
export interface GetResolverQueryLogConfigAssociationResponse {
  ResolverQueryLogConfigAssociation?: ResolverQueryLogConfigAssociation;
}
export interface GetResolverQueryLogConfigPolicyRequest {
  Arn: string;
}
export type ResolverQueryLogConfigPolicy = string;
export interface GetResolverQueryLogConfigPolicyResponse {
  ResolverQueryLogConfigPolicy?: string;
}
export interface GetResolverRuleRequest {
  ResolverRuleId: string;
}
export interface GetResolverRuleResponse {
  ResolverRule?: ResolverRule;
}
export interface GetResolverRuleAssociationRequest {
  ResolverRuleAssociationId: string;
}
export interface GetResolverRuleAssociationResponse {
  ResolverRuleAssociation?: ResolverRuleAssociation;
}
export interface GetResolverRulePolicyRequest {
  Arn: string;
}
export type ResolverRulePolicy = string;
export interface GetResolverRulePolicyResponse {
  ResolverRulePolicy?: string;
}
export type FirewallDomainImportOperation = "REPLACE" | (string & {});
export type DomainListFileUrl = string;
export interface ImportFirewallDomainsRequest {
  FirewallDomainListId: string;
  Operation: FirewallDomainImportOperation;
  DomainFileUrl: string;
}
export interface ImportFirewallDomainsResponse {
  Id?: string;
  Name?: string;
  Status?: FirewallDomainListStatus;
  StatusMessage?: string;
}
export type ListFirewallConfigsMaxResult = number;
export type NextToken = string;
export interface ListFirewallConfigsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type FirewallConfigList = FirewallConfig[];
export interface ListFirewallConfigsResponse {
  NextToken?: string;
  FirewallConfigs?: FirewallConfig[];
}
export type MaxResults = number;
export interface ListFirewallDomainListsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface FirewallDomainListMetadata {
  Id?: string;
  Arn?: string;
  Name?: string;
  CreatorRequestId?: string;
  ManagedOwnerName?: string;
  ManagedListType?: DomainListType;
  Category?: string;
}
export type FirewallDomainListMetadataList = FirewallDomainListMetadata[];
export interface ListFirewallDomainListsResponse {
  NextToken?: string;
  FirewallDomainLists?: FirewallDomainListMetadata[];
}
export type ListDomainMaxResults = number;
export interface ListFirewallDomainsRequest {
  FirewallDomainListId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type FirewallDomainName = string;
export type FirewallDomains = string[];
export interface ListFirewallDomainsResponse {
  NextToken?: string;
  Domains?: string[];
}
export interface ListFirewallRuleGroupAssociationsRequest {
  FirewallRuleGroupId?: string;
  VpcId?: string;
  Priority?: number;
  Status?: FirewallRuleGroupAssociationStatus;
  MaxResults?: number;
  NextToken?: string;
}
export type FirewallRuleGroupAssociations = FirewallRuleGroupAssociation[];
export interface ListFirewallRuleGroupAssociationsResponse {
  NextToken?: string;
  FirewallRuleGroupAssociations?: FirewallRuleGroupAssociation[];
}
export interface ListFirewallRuleGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export interface FirewallRuleGroupMetadata {
  Id?: string;
  Arn?: string;
  Name?: string;
  OwnerId?: string;
  CreatorRequestId?: string;
  ShareStatus?: ShareStatus;
}
export type FirewallRuleGroupMetadataList = FirewallRuleGroupMetadata[];
export interface ListFirewallRuleGroupsResponse {
  NextToken?: string;
  FirewallRuleGroups?: FirewallRuleGroupMetadata[];
}
export interface ListFirewallRulesRequest {
  FirewallRuleGroupId: string;
  Priority?: number;
  Action?: Action;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListFirewallRulesResponse {
  NextToken?: string;
  FirewallRules?: FirewallRule[];
}
export type RuleTypeName = string;
export interface ListFirewallRuleTypesRequest {
  RuleType?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type RuleTypeValue = string;
export type DisplayName = string;
export type RuleTypeDescription = string;
export type VendorName = string;
export type ProductId = string;
export interface SubscriptionInfo {
  VendorName?: string;
  ProductId?: string;
}
export interface FirewallRuleTypeDefinition {
  RuleType?: string;
  Value?: string;
  DisplayName?: string;
  Description?: string;
  SubscriptionInfo?: SubscriptionInfo;
}
export type FirewallRuleTypeDefinitions = FirewallRuleTypeDefinition[];
export interface ListFirewallRuleTypesResponse {
  FirewallRuleTypes?: FirewallRuleTypeDefinition[];
  NextToken?: string;
}
export interface ListOutpostResolversRequest {
  OutpostArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export type OutpostResolverList = OutpostResolver[];
export interface ListOutpostResolversResponse {
  OutpostResolvers?: OutpostResolver[];
  NextToken?: string;
}
export type ListResolverConfigsMaxResult = number;
export interface ListResolverConfigsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export type ResolverConfigList = ResolverConfig[];
export interface ListResolverConfigsResponse {
  NextToken?: string;
  ResolverConfigs?: ResolverConfig[];
}
export type FilterName = string;
export type FilterValue = string;
export type FilterValues = string[];
export interface Filter {
  Name?: string;
  Values?: string[];
}
export type Filters = Filter[];
export interface ListResolverDnssecConfigsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export type ResolverDnssecConfigList = ResolverDnssecConfig[];
export interface ListResolverDnssecConfigsResponse {
  NextToken?: string;
  ResolverDnssecConfigs?: ResolverDnssecConfig[];
}
export interface ListResolverEndpointIpAddressesRequest {
  ResolverEndpointId: string;
  MaxResults?: number;
  NextToken?: string;
}
export type IpAddressStatus =
  | "CREATING"
  | "FAILED_CREATION"
  | "FAILED_CREATION_INSUFFICIENT_EC2_CAPACITY_IN_OUTPOST"
  | "ATTACHING"
  | "ATTACHED"
  | "REMAP_DETACHING"
  | "REMAP_ATTACHING"
  | "DETACHING"
  | "FAILED_RESOURCE_GONE"
  | "DELETING"
  | "DELETE_FAILED_FAS_EXPIRED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "ISOLATED"
  | (string & {});
export interface IpAddressResponse {
  IpId?: string;
  SubnetId?: string;
  Ip?: string;
  Ipv6?: string;
  Status?: IpAddressStatus;
  StatusMessage?: string;
  CreationTime?: string;
  ModificationTime?: string;
}
export type IpAddressesResponse = IpAddressResponse[];
export interface ListResolverEndpointIpAddressesResponse {
  NextToken?: string;
  MaxResults?: number;
  IpAddresses?: IpAddressResponse[];
}
export interface ListResolverEndpointsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export type ResolverEndpoints = ResolverEndpoint[];
export interface ListResolverEndpointsResponse {
  NextToken?: string;
  MaxResults?: number;
  ResolverEndpoints?: ResolverEndpoint[];
}
export type SortByKey = string;
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface ListResolverQueryLogConfigAssociationsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
  SortBy?: string;
  SortOrder?: SortOrder;
}
export type ResolverQueryLogConfigAssociationList =
  ResolverQueryLogConfigAssociation[];
export interface ListResolverQueryLogConfigAssociationsResponse {
  NextToken?: string;
  TotalCount?: number;
  TotalFilteredCount?: number;
  ResolverQueryLogConfigAssociations?: ResolverQueryLogConfigAssociation[];
}
export interface ListResolverQueryLogConfigsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
  SortBy?: string;
  SortOrder?: SortOrder;
}
export type ResolverQueryLogConfigList = ResolverQueryLogConfig[];
export interface ListResolverQueryLogConfigsResponse {
  NextToken?: string;
  TotalCount?: number;
  TotalFilteredCount?: number;
  ResolverQueryLogConfigs?: ResolverQueryLogConfig[];
}
export interface ListResolverRuleAssociationsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export type ResolverRuleAssociations = ResolverRuleAssociation[];
export interface ListResolverRuleAssociationsResponse {
  NextToken?: string;
  MaxResults?: number;
  ResolverRuleAssociations?: ResolverRuleAssociation[];
}
export interface ListResolverRulesRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export type ResolverRules = ResolverRule[];
export interface ListResolverRulesResponse {
  NextToken?: string;
  MaxResults?: number;
  ResolverRules?: ResolverRule[];
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
  NextToken?: string;
}
export interface PutFirewallRuleGroupPolicyRequest {
  Arn: string;
  FirewallRuleGroupPolicy: string;
}
export interface PutFirewallRuleGroupPolicyResponse {
  ReturnValue?: boolean;
}
export interface PutResolverQueryLogConfigPolicyRequest {
  Arn: string;
  ResolverQueryLogConfigPolicy: string;
}
export interface PutResolverQueryLogConfigPolicyResponse {
  ReturnValue?: boolean;
}
export interface PutResolverRulePolicyRequest {
  Arn: string;
  ResolverRulePolicy: string;
}
export interface PutResolverRulePolicyResponse {
  ReturnValue?: boolean;
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
export interface UpdateFirewallConfigRequest {
  ResourceId: string;
  FirewallFailOpen: FirewallFailOpenStatus;
}
export interface UpdateFirewallConfigResponse {
  FirewallConfig?: FirewallConfig;
}
export type FirewallDomainUpdateOperation =
  | "ADD"
  | "REMOVE"
  | "REPLACE"
  | (string & {});
export interface UpdateFirewallDomainsRequest {
  FirewallDomainListId: string;
  Operation: FirewallDomainUpdateOperation;
  Domains: string[];
}
export interface UpdateFirewallDomainsResponse {
  Id?: string;
  Name?: string;
  Status?: FirewallDomainListStatus;
  StatusMessage?: string;
}
export interface UpdateFirewallRuleRequest {
  FirewallRuleGroupId: string;
  FirewallDomainListId?: string;
  FirewallThreatProtectionId?: string;
  Priority?: number;
  Action?: Action;
  BlockResponse?: BlockResponse;
  BlockOverrideDomain?: string;
  BlockOverrideDnsType?: BlockOverrideDnsType;
  BlockOverrideTtl?: number;
  Name?: string;
  FirewallDomainRedirectionAction?: FirewallDomainRedirectionAction;
  Qtype?: string;
  DnsThreatProtection?: DnsThreatProtection;
  ConfidenceThreshold?: ConfidenceThreshold;
  FirewallRuleType?: FirewallRuleType;
}
export interface UpdateFirewallRuleResponse {
  FirewallRule?: FirewallRule;
}
export interface UpdateFirewallRuleGroupAssociationRequest {
  FirewallRuleGroupAssociationId: string;
  Priority?: number;
  MutationProtection?: MutationProtectionStatus;
  Name?: string;
}
export interface UpdateFirewallRuleGroupAssociationResponse {
  FirewallRuleGroupAssociation?: FirewallRuleGroupAssociation;
}
export interface UpdateOutpostResolverRequest {
  Id: string;
  Name?: string;
  InstanceCount?: number;
  PreferredInstanceType?: string;
}
export interface UpdateOutpostResolverResponse {
  OutpostResolver?: OutpostResolver;
}
export type AutodefinedReverseFlag =
  | "ENABLE"
  | "DISABLE"
  | "USE_LOCAL_RESOURCE_SETTING"
  | (string & {});
export interface UpdateResolverConfigRequest {
  ResourceId: string;
  AutodefinedReverseFlag: AutodefinedReverseFlag;
}
export interface UpdateResolverConfigResponse {
  ResolverConfig?: ResolverConfig;
}
export type Validation =
  | "ENABLE"
  | "DISABLE"
  | "USE_LOCAL_RESOURCE_SETTING"
  | (string & {});
export interface UpdateResolverDnssecConfigRequest {
  ResourceId: string;
  Validation: Validation;
}
export interface UpdateResolverDnssecConfigResponse {
  ResolverDNSSECConfig?: ResolverDnssecConfig;
}
export interface UpdateIpAddress {
  IpId: string;
  Ipv6: string;
}
export type UpdateIpAddresses = UpdateIpAddress[];
export interface UpdateResolverEndpointRequest {
  ResolverEndpointId: string;
  Name?: string;
  ResolverEndpointType?: ResolverEndpointType;
  UpdateIpAddresses?: UpdateIpAddress[];
  Protocols?: Protocol[];
  RniEnhancedMetricsEnabled?: boolean;
  TargetNameServerMetricsEnabled?: boolean;
  Dns64Enabled?: boolean;
  Ipv6InternetAccessEnabled?: boolean;
}
export interface UpdateResolverEndpointResponse {
  ResolverEndpoint?: ResolverEndpoint;
}
export interface ResolverRuleConfig {
  Name?: string;
  TargetIps?: TargetAddress[];
  ResolverEndpointId?: string;
}
export interface UpdateResolverRuleRequest {
  ResolverRuleId: string;
  Config: ResolverRuleConfig;
}
export interface UpdateResolverRuleResponse {
  ResolverRule?: ResolverRule;
}
export type ExceptionMessage = string;
export type AssociateFirewallRuleGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a FirewallRuleGroup with a VPC, to provide DNS filtering for the VPC.
 *
 * If the rule group contains any rule configured with the `PartnerThreatProtection` rule type, the calling account must hold an active AWS Marketplace subscription to the named partner. If the subscription is missing, the association request is rejected.
 */
export const associateFirewallRuleGroup: API.OperationMethod<
  AssociateFirewallRuleGroupRequest,
  AssociateFirewallRuleGroupResponse,
  AssociateFirewallRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CreatorRequestId: D.m({ idempotency: true }),
      FirewallRuleGroupId: 0,
      VpcId: 0,
      Priority: 0,
      Name: 0,
      MutationProtection: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFirewallRuleGroup",
})) as any;

export type AssociateResolverEndpointIpAddressError =
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds IP addresses to an inbound or an outbound Resolver endpoint. If you want to add more than one IP address,
 * submit one `AssociateResolverEndpointIpAddress` request for each IP address.
 *
 * To remove an IP address from an endpoint, see
 * DisassociateResolverEndpointIpAddress.
 */
export const associateResolverEndpointIpAddress: API.OperationMethod<
  AssociateResolverEndpointIpAddressRequest,
  AssociateResolverEndpointIpAddressResponse,
  AssociateResolverEndpointIpAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResolverEndpointId: 0, IpAddress: i_IpAddressUpdate },
  },
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateResolverEndpointIpAddress",
})) as any;

export type AssociateResolverQueryLogConfigError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates an Amazon VPC with a specified query logging configuration. Route 53 Resolver logs DNS queries that originate in all of the Amazon VPCs
 * that are associated with a specified query logging configuration. To associate more than one VPC with a configuration, submit one `AssociateResolverQueryLogConfig`
 * request for each VPC.
 *
 * The VPCs that you associate with a query logging configuration must be in the same Region as the configuration.
 *
 * To remove a VPC from a query logging configuration, see
 * DisassociateResolverQueryLogConfig.
 */
export const associateResolverQueryLogConfig: API.OperationMethod<
  AssociateResolverQueryLogConfigRequest,
  AssociateResolverQueryLogConfigResponse,
  AssociateResolverQueryLogConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResolverQueryLogConfigId: 0, ResourceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateResolverQueryLogConfig",
})) as any;

export type AssociateResolverRuleError =
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Associates a Resolver rule with a VPC. When you associate a rule with a VPC, Resolver forwards all DNS queries
 * for the domain name that is specified in the rule and that originate in the VPC. The queries are forwarded to the
 * IP addresses for the DNS resolvers that are specified in the rule. For more information about rules, see
 * CreateResolverRule.
 */
export const associateResolverRule: API.OperationMethod<
  AssociateResolverRuleRequest,
  AssociateResolverRuleResponse,
  AssociateResolverRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResolverRuleId: 0, Name: 0, VPCId: 0 } },
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateResolverRule",
})) as any;

export type BatchCreateFirewallRuleError =
  | AccessDeniedException
  | InternalServiceErrorException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates multiple DNS Firewall rules in the specified rule group.
 */
export const batchCreateFirewallRule: API.OperationMethod<
  BatchCreateFirewallRuleRequest,
  BatchCreateFirewallRuleResponse,
  BatchCreateFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CreateFirewallRuleEntries: D.list({
        CreatorRequestId: 0,
        FirewallRuleGroupId: 0,
        FirewallDomainListId: 0,
        Priority: 0,
        Action: 0,
        BlockResponse: 0,
        BlockOverrideDomain: 0,
        BlockOverrideDnsType: 0,
        BlockOverrideTtl: 0,
        Name: 0,
        FirewallDomainRedirectionAction: 0,
        Qtype: 0,
        DnsThreatProtection: 0,
        ConfidenceThreshold: 0,
        FirewallRuleType: i_FirewallRuleType,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateFirewallRule",
})) as any;

export type BatchDeleteFirewallRuleError =
  | AccessDeniedException
  | InternalServiceErrorException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes multiple DNS Firewall rules from the specified rule group.
 */
export const batchDeleteFirewallRule: API.OperationMethod<
  BatchDeleteFirewallRuleRequest,
  BatchDeleteFirewallRuleResponse,
  BatchDeleteFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      DeleteFirewallRuleEntries: D.list({
        FirewallRuleGroupId: 0,
        FirewallDomainListId: 0,
        FirewallThreatProtectionId: 0,
        Qtype: 0,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteFirewallRule",
})) as any;

export type BatchUpdateFirewallRuleError =
  | AccessDeniedException
  | InternalServiceErrorException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple DNS Firewall rules in the specified rule group.
 */
export const batchUpdateFirewallRule: API.OperationMethod<
  BatchUpdateFirewallRuleRequest,
  BatchUpdateFirewallRuleResponse,
  BatchUpdateFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      UpdateFirewallRuleEntries: D.list({
        FirewallRuleGroupId: 0,
        FirewallDomainListId: 0,
        FirewallThreatProtectionId: 0,
        Priority: 0,
        Action: 0,
        BlockResponse: 0,
        BlockOverrideDomain: 0,
        BlockOverrideDnsType: 0,
        BlockOverrideTtl: 0,
        Name: 0,
        FirewallDomainRedirectionAction: 0,
        Qtype: 0,
        DnsThreatProtection: 0,
        ConfidenceThreshold: 0,
        FirewallRuleType: i_FirewallRuleType,
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateFirewallRule",
})) as any;

export type CreateFirewallDomainListError =
  | AccessDeniedException
  | InternalServiceErrorException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an empty firewall domain list for use in DNS Firewall rules. You can populate the domains for the new list with a file, using ImportFirewallDomains, or with domain strings, using UpdateFirewallDomains.
 */
export const createFirewallDomainList: API.OperationMethod<
  CreateFirewallDomainListRequest,
  CreateFirewallDomainListResponse,
  CreateFirewallDomainListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CreatorRequestId: D.m({ idempotency: true }),
      Name: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFirewallDomainList",
})) as any;

export type CreateFirewallRuleError =
  | AccessDeniedException
  | InternalServiceErrorException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a single DNS Firewall rule in the specified rule group. The rule can use any one of the following match sources, and the chosen source must be supplied through the matching request field — they are mutually exclusive:
 *
 * - `FirewallDomainListId` — match a customer-managed or AWS-managed domain list.
 *
 * - `DnsThreatProtection` — match a built-in DNS Firewall Advanced threat detector (`DGA`, `DNS_TUNNELING`, or `DICTIONARY_DGA`).
 *
 * - `FirewallRuleType` — match one of the rule-type variants returned by ListFirewallRuleTypes: `FirewallAdvancedContentCategory`, `FirewallAdvancedThreatCategory`, `DnsThreatProtection`, or `PartnerThreatProtection`. The `PartnerThreatProtection` variant requires an active AWS Marketplace subscription to the named partner product.
 *
 * For rules that require asynchronous provisioning (today, the `PartnerThreatProtection` rule type), the rule's `Status` begins at `CREATING` and transitions to `COMPLETE` once the rule is provisioned and the marketplace entitlement is verified. If provisioning fails, `Status` becomes `CREATION_FAILED` and `StatusMessage` contains a human-readable reason; the rule is then immutable and must be removed with DeleteFirewallRule.
 */
export const createFirewallRule: API.OperationMethod<
  CreateFirewallRuleRequest,
  CreateFirewallRuleResponse,
  CreateFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CreatorRequestId: D.m({ idempotency: true }),
      FirewallRuleGroupId: 0,
      FirewallDomainListId: 0,
      Priority: 0,
      Action: 0,
      BlockResponse: 0,
      BlockOverrideDomain: 0,
      BlockOverrideDnsType: 0,
      BlockOverrideTtl: 0,
      Name: 0,
      FirewallDomainRedirectionAction: 0,
      Qtype: 0,
      DnsThreatProtection: 0,
      ConfidenceThreshold: 0,
      FirewallRuleType: i_FirewallRuleType,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFirewallRule",
})) as any;

export type CreateFirewallRuleGroupError =
  | AccessDeniedException
  | InternalServiceErrorException
  | LimitExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an empty DNS Firewall rule group for filtering DNS network traffic in a VPC. You can add rules to the new rule group
 * by calling CreateFirewallRule.
 */
export const createFirewallRuleGroup: API.OperationMethod<
  CreateFirewallRuleGroupRequest,
  CreateFirewallRuleGroupResponse,
  CreateFirewallRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CreatorRequestId: D.m({ idempotency: true }),
      Name: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFirewallRuleGroup",
})) as any;

export type CreateOutpostResolverError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Route 53 Resolver on an Outpost.
 */
export const createOutpostResolver: API.OperationMethod<
  CreateOutpostResolverRequest,
  CreateOutpostResolverResponse,
  CreateOutpostResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CreatorRequestId: 0,
      Name: 0,
      InstanceCount: 0,
      PreferredInstanceType: 0,
      OutpostArn: 0,
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOutpostResolver",
})) as any;

export type CreateResolverEndpointError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a Resolver endpoint. There are two types of Resolver endpoints, inbound and outbound:
 *
 * - An *inbound Resolver endpoint* forwards DNS queries to the DNS service for a VPC
 * from your network.
 *
 * - An *outbound Resolver endpoint* forwards DNS queries from the DNS service for a VPC
 * to your network.
 */
export const createResolverEndpoint: API.OperationMethod<
  CreateResolverEndpointRequest,
  CreateResolverEndpointResponse,
  CreateResolverEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CreatorRequestId: 0,
      Name: 0,
      SecurityGroupIds: 0,
      Direction: 0,
      IpAddresses: D.list({ SubnetId: 0, Ip: 0, Ipv6: 0 }),
      OutpostArn: 0,
      PreferredInstanceType: 0,
      Tags: D.list(i_Tag),
      ResolverEndpointType: 0,
      Protocols: 0,
      RniEnhancedMetricsEnabled: 0,
      TargetNameServerMetricsEnabled: 0,
      Dns64Enabled: 0,
      Ipv6InternetAccessEnabled: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResolverEndpoint",
})) as any;

export type CreateResolverQueryLogConfigError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Creates a Resolver query logging configuration, which defines where you want Resolver to save DNS query logs that originate in your VPCs.
 * Resolver can log queries only for VPCs that are in the same Region as the query logging configuration.
 *
 * To specify which VPCs you want to log queries for, you use `AssociateResolverQueryLogConfig`. For more information, see
 * AssociateResolverQueryLogConfig.
 *
 * You can optionally use Resource Access Manager (RAM) to share a query logging configuration with other Amazon Web Services accounts. The other accounts
 * can then associate VPCs with the configuration. The query logs that Resolver creates for a configuration include all DNS queries that originate in all
 * VPCs that are associated with the configuration.
 */
export const createResolverQueryLogConfig: API.OperationMethod<
  CreateResolverQueryLogConfigRequest,
  CreateResolverQueryLogConfigResponse,
  CreateResolverQueryLogConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      Name: 0,
      DestinationArn: 0,
      CreatorRequestId: D.m({ idempotency: true }),
      Tags: D.list(i_Tag),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResolverQueryLogConfig",
})) as any;

export type CreateResolverRuleError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceExistsException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * For DNS queries that originate in your VPCs, specifies which Resolver endpoint the queries pass through,
 * one domain name that you want to forward to your network, and the IP addresses of the DNS resolvers in your network.
 */
export const createResolverRule: API.OperationMethod<
  CreateResolverRuleRequest,
  CreateResolverRuleResponse,
  CreateResolverRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      CreatorRequestId: 0,
      Name: 0,
      RuleType: 0,
      DomainName: 0,
      TargetIps: D.list(i_TargetAddress),
      ResolverEndpointId: 0,
      Tags: D.list(i_Tag),
      DelegationRecord: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateResolverRule",
})) as any;

export type DeleteFirewallDomainListError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes the specified domain list.
 */
export const deleteFirewallDomainList: API.OperationMethod<
  DeleteFirewallDomainListRequest,
  DeleteFirewallDomainListResponse,
  DeleteFirewallDomainListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FirewallDomainListId: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFirewallDomainList",
})) as any;

export type DeleteFirewallRuleError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified firewall rule. Identify the rule using either `FirewallDomainListId` (for domain-list and DNS Firewall Advanced rules) or `FirewallThreatProtectionId` (for partner-managed and DNS Firewall Advanced rules) — together with `FirewallRuleGroupId`.
 *
 * `DeleteFirewallRule` is the only operation that succeeds against a rule whose `Status` is `CREATION_FAILED`.
 */
export const deleteFirewallRule: API.OperationMethod<
  DeleteFirewallRuleRequest,
  DeleteFirewallRuleResponse,
  DeleteFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallRuleGroupId: 0,
      FirewallDomainListId: 0,
      FirewallThreatProtectionId: 0,
      Qtype: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFirewallRule",
})) as any;

export type DeleteFirewallRuleGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified firewall rule group.
 */
export const deleteFirewallRuleGroup: API.OperationMethod<
  DeleteFirewallRuleGroupRequest,
  DeleteFirewallRuleGroupResponse,
  DeleteFirewallRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FirewallRuleGroupId: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFirewallRuleGroup",
})) as any;

export type DeleteOutpostResolverError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Resolver on the Outpost.
 */
export const deleteOutpostResolver: API.OperationMethod<
  DeleteOutpostResolverRequest,
  DeleteOutpostResolverResponse,
  DeleteOutpostResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Id: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOutpostResolver",
})) as any;

export type DeleteResolverEndpointError =
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a Resolver endpoint. The effect of deleting a Resolver endpoint depends on whether it's an inbound or an outbound
 * Resolver endpoint:
 *
 * - **Inbound**: DNS queries from your network are no longer routed
 * to the DNS service for the specified VPC.
 *
 * - **Outbound**: DNS queries from a VPC are no longer routed to your network.
 */
export const deleteResolverEndpoint: API.OperationMethod<
  DeleteResolverEndpointRequest,
  DeleteResolverEndpointResponse,
  DeleteResolverEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResolverEndpointId: 0 } },
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResolverEndpoint",
})) as any;

export type DeleteResolverQueryLogConfigError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a query logging configuration. When you delete a configuration, Resolver stops logging DNS queries for all of the Amazon VPCs that are
 * associated with the configuration. This also applies if the query logging configuration is shared with other Amazon Web Services accounts, and
 * the other accounts have associated VPCs with the shared configuration.
 *
 * Before you can delete a query logging configuration, you must first disassociate all VPCs from the configuration. See
 * DisassociateResolverQueryLogConfig.
 *
 * If you used Resource Access Manager (RAM) to share a query logging configuration with other accounts, you must stop sharing
 * the configuration before you can delete a configuration. The accounts that you shared the configuration with can first disassociate VPCs
 * that they associated with the configuration, but that's not necessary. If you stop sharing the configuration, those VPCs are automatically
 * disassociated from the configuration.
 */
export const deleteResolverQueryLogConfig: API.OperationMethod<
  DeleteResolverQueryLogConfigRequest,
  DeleteResolverQueryLogConfigResponse,
  DeleteResolverQueryLogConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResolverQueryLogConfigId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResolverQueryLogConfig",
})) as any;

export type DeleteResolverRuleError =
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Deletes a Resolver rule. Before you can delete a Resolver rule, you must disassociate it from all the VPCs that you
 * associated the Resolver rule with. For more information, see
 * DisassociateResolverRule.
 */
export const deleteResolverRule: API.OperationMethod<
  DeleteResolverRuleRequest,
  DeleteResolverRuleResponse,
  DeleteResolverRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResolverRuleId: 0 } },
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResolverRule",
})) as any;

export type DisassociateFirewallRuleGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a FirewallRuleGroup from a VPC, to remove DNS filtering from the VPC.
 */
export const disassociateFirewallRuleGroup: API.OperationMethod<
  DisassociateFirewallRuleGroupRequest,
  DisassociateFirewallRuleGroupResponse,
  DisassociateFirewallRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FirewallRuleGroupAssociationId: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFirewallRuleGroup",
})) as any;

export type DisassociateResolverEndpointIpAddressError =
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceExistsException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes IP addresses from an inbound or an outbound Resolver endpoint. If you want to remove more than one IP address,
 * submit one `DisassociateResolverEndpointIpAddress` request for each IP address.
 *
 * To add an IP address to an endpoint, see
 * AssociateResolverEndpointIpAddress.
 */
export const disassociateResolverEndpointIpAddress: API.OperationMethod<
  DisassociateResolverEndpointIpAddressRequest,
  DisassociateResolverEndpointIpAddressResponse,
  DisassociateResolverEndpointIpAddressError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResolverEndpointId: 0, IpAddress: i_IpAddressUpdate },
  },
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResolverEndpointIpAddress",
})) as any;

export type DisassociateResolverQueryLogConfigError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Disassociates a VPC from a query logging configuration.
 *
 * Before you can delete a query logging configuration, you must first disassociate all VPCs
 * from the configuration. If you used Resource Access Manager (RAM) to share a
 * query logging configuration with other accounts, VPCs can be disassociated from the
 * configuration in the following ways:
 *
 * - The accounts that you shared the configuration with can disassociate VPCs from the configuration.
 *
 * - You can stop sharing the configuration.
 */
export const disassociateResolverQueryLogConfig: API.OperationMethod<
  DisassociateResolverQueryLogConfigRequest,
  DisassociateResolverQueryLogConfigResponse,
  DisassociateResolverQueryLogConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResolverQueryLogConfigId: 0, ResourceId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResolverQueryLogConfig",
})) as any;

export type DisassociateResolverRuleError =
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes the association between a specified Resolver rule and a specified VPC.
 *
 * If you disassociate a Resolver rule from a VPC, Resolver stops forwarding DNS queries for the
 * domain name that you specified in the Resolver rule.
 */
export const disassociateResolverRule: API.OperationMethod<
  DisassociateResolverRuleRequest,
  DisassociateResolverRuleResponse,
  DisassociateResolverRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { VPCId: 0, ResolverRuleId: 0 } },
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateResolverRule",
})) as any;

export type GetFirewallConfigError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the configuration of the firewall behavior provided by DNS Firewall for a
 * single VPC from Amazon Virtual Private Cloud (Amazon VPC).
 */
export const getFirewallConfig: API.OperationMethod<
  GetFirewallConfigRequest,
  GetFirewallConfigResponse,
  GetFirewallConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFirewallConfig",
})) as any;

export type GetFirewallDomainListError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the specified firewall domain list.
 */
export const getFirewallDomainList: API.OperationMethod<
  GetFirewallDomainListRequest,
  GetFirewallDomainListResponse,
  GetFirewallDomainListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FirewallDomainListId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFirewallDomainList",
})) as any;

export type GetFirewallRuleGroupError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves the specified firewall rule group.
 */
export const getFirewallRuleGroup: API.OperationMethod<
  GetFirewallRuleGroupRequest,
  GetFirewallRuleGroupResponse,
  GetFirewallRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FirewallRuleGroupId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFirewallRuleGroup",
})) as any;

export type GetFirewallRuleGroupAssociationError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Retrieves a firewall rule group association, which enables DNS filtering for a VPC with one rule group. A VPC can have more than one firewall rule group association, and a rule group can be associated with more than one VPC.
 */
export const getFirewallRuleGroupAssociation: API.OperationMethod<
  GetFirewallRuleGroupAssociationRequest,
  GetFirewallRuleGroupAssociationResponse,
  GetFirewallRuleGroupAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { FirewallRuleGroupAssociationId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFirewallRuleGroupAssociation",
})) as any;

export type GetFirewallRuleGroupPolicyError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the Identity and Access Management (Amazon Web Services IAM) policy for sharing the
 * specified rule group. You can use the policy to share the rule group using Resource Access Manager (RAM).
 */
export const getFirewallRuleGroupPolicy: API.OperationMethod<
  GetFirewallRuleGroupPolicyRequest,
  GetFirewallRuleGroupPolicyResponse,
  GetFirewallRuleGroupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Arn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFirewallRuleGroupPolicy",
})) as any;

export type GetOutpostResolverError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a specified Resolver on the Outpost, such as its instance count and
 * type, name, and the current status of the Resolver.
 */
export const getOutpostResolver: API.OperationMethod<
  GetOutpostResolverRequest,
  GetOutpostResolverResponse,
  GetOutpostResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Id: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOutpostResolver",
})) as any;

export type GetResolverConfigError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the behavior configuration of Route 53 Resolver behavior for a single VPC from
 * Amazon Virtual Private Cloud.
 */
export const getResolverConfig: API.OperationMethod<
  GetResolverConfigRequest,
  GetResolverConfigResponse,
  GetResolverConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResolverConfig",
})) as any;

export type GetResolverDnssecConfigError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets DNSSEC validation information for a specified resource.
 */
export const getResolverDnssecConfig: API.OperationMethod<
  GetResolverDnssecConfigRequest,
  GetResolverDnssecConfigResponse,
  GetResolverDnssecConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResolverDnssecConfig",
})) as any;

export type GetResolverEndpointError =
  | InternalServiceErrorException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a specified Resolver endpoint, such as whether it's an inbound or an outbound Resolver endpoint, and the
 * current status of the endpoint.
 */
export const getResolverEndpoint: API.OperationMethod<
  GetResolverEndpointRequest,
  GetResolverEndpointResponse,
  GetResolverEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResolverEndpointId: 0 } },
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResolverEndpoint",
})) as any;

export type GetResolverQueryLogConfigError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a specified Resolver query logging configuration, such as the number of VPCs that the configuration
 * is logging queries for and the location that logs are sent to.
 */
export const getResolverQueryLogConfig: API.OperationMethod<
  GetResolverQueryLogConfigRequest,
  GetResolverQueryLogConfigResponse,
  GetResolverQueryLogConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResolverQueryLogConfigId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResolverQueryLogConfig",
})) as any;

export type GetResolverQueryLogConfigAssociationError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a specified association between a Resolver query logging configuration and an Amazon VPC. When you associate a VPC
 * with a query logging configuration, Resolver logs DNS queries that originate in that VPC.
 */
export const getResolverQueryLogConfigAssociation: API.OperationMethod<
  GetResolverQueryLogConfigAssociationRequest,
  GetResolverQueryLogConfigAssociationResponse,
  GetResolverQueryLogConfigAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResolverQueryLogConfigAssociationId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResolverQueryLogConfigAssociation",
})) as any;

export type GetResolverQueryLogConfigPolicyError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | UnknownResourceException
  | CommonErrors;
/**
 * Gets information about a query logging policy. A query logging policy specifies the Resolver query logging
 * operations and resources that you want to allow another Amazon Web Services account to be able to use.
 */
export const getResolverQueryLogConfigPolicy: API.OperationMethod<
  GetResolverQueryLogConfigPolicyRequest,
  GetResolverQueryLogConfigPolicyResponse,
  GetResolverQueryLogConfigPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Arn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResolverQueryLogConfigPolicy",
})) as any;

export type GetResolverRuleError =
  | InternalServiceErrorException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about a specified Resolver rule, such as the domain name that the rule forwards DNS queries for and the ID of the
 * outbound Resolver endpoint that the rule is associated with.
 */
export const getResolverRule: API.OperationMethod<
  GetResolverRuleRequest,
  GetResolverRuleResponse,
  GetResolverRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResolverRuleId: 0 } },
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResolverRule",
})) as any;

export type GetResolverRuleAssociationError =
  | InternalServiceErrorException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets information about an association between a specified Resolver rule and a VPC. You associate a Resolver rule and a VPC using
 * AssociateResolverRule.
 */
export const getResolverRuleAssociation: API.OperationMethod<
  GetResolverRuleAssociationRequest,
  GetResolverRuleAssociationResponse,
  GetResolverRuleAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResolverRuleAssociationId: 0 } },
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResolverRuleAssociation",
})) as any;

export type GetResolverRulePolicyError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | UnknownResourceException
  | CommonErrors;
/**
 * Gets information about the Resolver rule policy for a specified rule. A Resolver rule policy includes the rule that you want to share
 * with another account, the account that you want to share the rule with, and the Resolver operations that you want to allow the account to use.
 */
export const getResolverRulePolicy: API.OperationMethod<
  GetResolverRulePolicyRequest,
  GetResolverRulePolicyResponse,
  GetResolverRulePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Arn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResolverRulePolicy",
})) as any;

export type ImportFirewallDomainsError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Imports domain names from a file into a domain list, for use in a DNS firewall rule group.
 *
 * Each domain specification in your domain list must satisfy the following
 * requirements:
 *
 * - It can optionally start with `*` (asterisk).
 *
 * - With the exception of the optional starting asterisk, it must only contain
 * the following characters: `A-Z`, `a-z`,
 * `0-9`, `-` (hyphen).
 *
 * - It must be from 1-255 characters in length.
 */
export const importFirewallDomains: API.OperationMethod<
  ImportFirewallDomainsRequest,
  ImportFirewallDomainsResponse,
  ImportFirewallDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { FirewallDomainListId: 0, Operation: 0, DomainFileUrl: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportFirewallDomains",
})) as any;

export type ListFirewallConfigsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the firewall configurations that you have defined. DNS Firewall uses the configurations to manage firewall behavior for your VPCs.
 *
 * A single call might return only a partial list of the configurations. For information, see `MaxResults`.
 */
export const listFirewallConfigs: API.PaginatedOperationMethod<
  ListFirewallConfigsRequest,
  ListFirewallConfigsResponse,
  ListFirewallConfigsError,
  Credentials | HttpClient.HttpClient,
  FirewallConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFirewallConfigs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FirewallConfigs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFirewallDomainListsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the firewall domain lists that you have defined. For each firewall domain list, you can retrieve the domains that are defined for a list by calling ListFirewallDomains.
 *
 * A single call to this list operation might return only a partial list of the domain lists. For information, see `MaxResults`.
 */
export const listFirewallDomainLists: API.PaginatedOperationMethod<
  ListFirewallDomainListsRequest,
  ListFirewallDomainListsResponse,
  ListFirewallDomainListsError,
  Credentials | HttpClient.HttpClient,
  FirewallDomainListMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFirewallDomainLists",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FirewallDomainLists",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFirewallDomainsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the domains that you have defined for the specified firewall domain list.
 *
 * A single call might return only a partial list of the domains. For information, see `MaxResults`.
 */
export const listFirewallDomains: API.PaginatedOperationMethod<
  ListFirewallDomainsRequest,
  ListFirewallDomainsResponse,
  ListFirewallDomainsError,
  Credentials | HttpClient.HttpClient,
  FirewallDomainName
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { FirewallDomainListId: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFirewallDomains",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Domains",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFirewallRuleGroupAssociationsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the firewall rule group associations that you have defined. Each association enables DNS filtering for a VPC with one rule group.
 *
 * A single call might return only a partial list of the associations. For information, see `MaxResults`.
 */
export const listFirewallRuleGroupAssociations: API.PaginatedOperationMethod<
  ListFirewallRuleGroupAssociationsRequest,
  ListFirewallRuleGroupAssociationsResponse,
  ListFirewallRuleGroupAssociationsError,
  Credentials | HttpClient.HttpClient,
  FirewallRuleGroupAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallRuleGroupId: 0,
      VpcId: 0,
      Priority: 0,
      Status: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFirewallRuleGroupAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FirewallRuleGroupAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFirewallRuleGroupsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the minimal high-level information for the rule groups that you have defined.
 *
 * A single call might return only a partial list of the rule groups. For information, see `MaxResults`.
 */
export const listFirewallRuleGroups: API.PaginatedOperationMethod<
  ListFirewallRuleGroupsRequest,
  ListFirewallRuleGroupsResponse,
  ListFirewallRuleGroupsError,
  Credentials | HttpClient.HttpClient,
  FirewallRuleGroupMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFirewallRuleGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FirewallRuleGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFirewallRulesError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the firewall rules that you have defined for the specified firewall rule group. DNS Firewall uses the rules in a rule group to filter DNS network traffic for a VPC.
 *
 * A single call might return only a partial list of the rules. For information, see `MaxResults`.
 *
 * For rules that require asynchronous provisioning, the response includes `Status` (see FirewallRuleStatus) and, on failure, `StatusMessage` with the reason.
 */
export const listFirewallRules: API.PaginatedOperationMethod<
  ListFirewallRulesRequest,
  ListFirewallRulesResponse,
  ListFirewallRulesError,
  Credentials | HttpClient.HttpClient,
  FirewallRule
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallRuleGroupId: 0,
      Priority: 0,
      Action: 0,
      MaxResults: 0,
      NextToken: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFirewallRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FirewallRules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListFirewallRuleTypesError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the rule-type variants that can be used in the `FirewallRuleType` field of CreateFirewallRule and UpdateFirewallRule. Each returned FirewallRuleTypeDefinition identifies one variant + value combination — for example, `FirewallAdvancedContentCategory` + `VIOLENCE_AND_HATE_SPEECH`, or `PartnerThreatProtection` + a partner-managed feed.
 *
 * The supported `RuleType` filter values are `FirewallAdvancedContentCategory`, `FirewallAdvancedThreatCategory`, `DnsThreatProtection`, and `PartnerThreatProtection`. When a returned definition's variant requires an external subscription (currently only `PartnerThreatProtection`), the response also includes a SubscriptionInfo identifying the AWS Marketplace product that backs it; absence of `SubscriptionInfo` means the variant is fully managed by AWS and requires no separate subscription.
 */
export const listFirewallRuleTypes: API.PaginatedOperationMethod<
  ListFirewallRuleTypesRequest,
  ListFirewallRuleTypesResponse,
  ListFirewallRuleTypesError,
  Credentials | HttpClient.HttpClient,
  FirewallRuleTypeDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { RuleType: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFirewallRuleTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FirewallRuleTypes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListOutpostResolversError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the Resolvers on Outposts that were created using the current Amazon Web Services account.
 */
export const listOutpostResolvers: API.PaginatedOperationMethod<
  ListOutpostResolversRequest,
  ListOutpostResolversResponse,
  ListOutpostResolversError,
  Credentials | HttpClient.HttpClient,
  OutpostResolver
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { OutpostArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOutpostResolvers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OutpostResolvers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResolverConfigsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | InvalidRequestException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the Resolver configurations that you have defined.
 * Route 53 Resolver uses the configurations to manage DNS resolution behavior for your VPCs.
 */
export const listResolverConfigs: API.PaginatedOperationMethod<
  ListResolverConfigsRequest,
  ListResolverConfigsResponse,
  ListResolverConfigsError,
  Credentials | HttpClient.HttpClient,
  ResolverConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { MaxResults: 0, NextToken: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResolverConfigs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResolverConfigs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResolverDnssecConfigsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the configurations for DNSSEC validation that are associated with the current Amazon Web Services account.
 */
export const listResolverDnssecConfigs: API.PaginatedOperationMethod<
  ListResolverDnssecConfigsRequest,
  ListResolverDnssecConfigsResponse,
  ListResolverDnssecConfigsError,
  Credentials | HttpClient.HttpClient,
  ResolverDnssecConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, Filters: D.list(i_Filter) },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResolverDnssecConfigs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResolverDnssecConfigs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResolverEndpointIpAddressesError =
  | InternalServiceErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the IP addresses for a specified Resolver endpoint.
 */
export const listResolverEndpointIpAddresses: API.PaginatedOperationMethod<
  ListResolverEndpointIpAddressesRequest,
  ListResolverEndpointIpAddressesResponse,
  ListResolverEndpointIpAddressesError,
  Credentials | HttpClient.HttpClient,
  IpAddressResponse
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { ResolverEndpointId: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResolverEndpointIpAddresses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IpAddresses",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResolverEndpointsError =
  | InternalServiceErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists all the Resolver endpoints that were created using the current Amazon Web Services account.
 */
export const listResolverEndpoints: API.PaginatedOperationMethod<
  ListResolverEndpointsRequest,
  ListResolverEndpointsResponse,
  ListResolverEndpointsError,
  Credentials | HttpClient.HttpClient,
  ResolverEndpoint
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, Filters: D.list(i_Filter) },
  },
  errors: [
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResolverEndpoints",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResolverEndpoints",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResolverQueryLogConfigAssociationsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists information about associations between Amazon VPCs and query logging configurations.
 */
export const listResolverQueryLogConfigAssociations: API.PaginatedOperationMethod<
  ListResolverQueryLogConfigAssociationsRequest,
  ListResolverQueryLogConfigAssociationsResponse,
  ListResolverQueryLogConfigAssociationsError,
  Credentials | HttpClient.HttpClient,
  ResolverQueryLogConfigAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list(i_Filter),
      SortBy: 0,
      SortOrder: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResolverQueryLogConfigAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResolverQueryLogConfigAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResolverQueryLogConfigsError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists information about the specified query logging configurations. Each configuration defines where you want Resolver to save
 * DNS query logs and specifies the VPCs that you want to log queries for.
 */
export const listResolverQueryLogConfigs: API.PaginatedOperationMethod<
  ListResolverQueryLogConfigsRequest,
  ListResolverQueryLogConfigsResponse,
  ListResolverQueryLogConfigsError,
  Credentials | HttpClient.HttpClient,
  ResolverQueryLogConfig
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      MaxResults: 0,
      NextToken: 0,
      Filters: D.list(i_Filter),
      SortBy: 0,
      SortOrder: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResolverQueryLogConfigs",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResolverQueryLogConfigs",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResolverRuleAssociationsError =
  | InternalServiceErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the associations that were created between Resolver rules and VPCs using the current Amazon Web Services account.
 */
export const listResolverRuleAssociations: API.PaginatedOperationMethod<
  ListResolverRuleAssociationsRequest,
  ListResolverRuleAssociationsResponse,
  ListResolverRuleAssociationsError,
  Credentials | HttpClient.HttpClient,
  ResolverRuleAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, Filters: D.list(i_Filter) },
  },
  errors: [
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResolverRuleAssociations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResolverRuleAssociations",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListResolverRulesError =
  | InternalServiceErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | InvalidRequestException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the Resolver rules that were created using the current Amazon Web Services account.
 */
export const listResolverRules: API.PaginatedOperationMethod<
  ListResolverRulesRequest,
  ListResolverRulesResponse,
  ListResolverRulesError,
  Credentials | HttpClient.HttpClient,
  ResolverRule
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { MaxResults: 0, NextToken: 0, Filters: D.list(i_Filter) },
  },
  errors: [
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResolverRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResolverRules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServiceErrorException
  | InvalidNextTokenException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Lists the tags that you associated with the specified resource.
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
    input: { ResourceArn: 0, MaxResults: 0, NextToken: 0 },
  },
  errors: [
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
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

export type PutFirewallRuleGroupPolicyError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Attaches an Identity and Access Management (Amazon Web Services IAM) policy for sharing the rule
 * group. You can use the policy to share the rule group using Resource Access Manager
 * (RAM).
 */
export const putFirewallRuleGroupPolicy: API.OperationMethod<
  PutFirewallRuleGroupPolicyRequest,
  PutFirewallRuleGroupPolicyResponse,
  PutFirewallRuleGroupPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Arn: 0, FirewallRuleGroupPolicy: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFirewallRuleGroupPolicy",
})) as any;

export type PutResolverQueryLogConfigPolicyError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidPolicyDocument
  | InvalidRequestException
  | UnknownResourceException
  | CommonErrors;
/**
 * Specifies an Amazon Web Services account that you want to share a query logging configuration with, the query logging configuration that you want to share,
 * and the operations that you want the account to be able to perform on the configuration.
 */
export const putResolverQueryLogConfigPolicy: API.OperationMethod<
  PutResolverQueryLogConfigPolicyRequest,
  PutResolverQueryLogConfigPolicyResponse,
  PutResolverQueryLogConfigPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Arn: 0, ResolverQueryLogConfigPolicy: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidPolicyDocument,
    InvalidRequestException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResolverQueryLogConfigPolicy",
})) as any;

export type PutResolverRulePolicyError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidPolicyDocument
  | UnknownResourceException
  | CommonErrors;
/**
 * Specifies an Amazon Web Services rule that you want to share with another account, the account that you want to share the rule with,
 * and the operations that you want the account to be able to perform on the rule.
 */
export const putResolverRulePolicy: API.OperationMethod<
  PutResolverRulePolicyRequest,
  PutResolverRulePolicyResponse,
  PutResolverRulePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { Arn: 0, ResolverRulePolicy: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidPolicyDocument,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResolverRulePolicy",
})) as any;

export type TagResourceError =
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | InvalidTagException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Adds one or more tags to a specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, Tags: D.list(i_Tag) } },
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    InvalidTagException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Removes one or more tags from a specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceArn: 0, TagKeys: 0 } },
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateFirewallConfigError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of the firewall behavior provided by DNS Firewall for a single
 * VPC from Amazon Virtual Private Cloud (Amazon VPC).
 */
export const updateFirewallConfig: API.OperationMethod<
  UpdateFirewallConfigRequest,
  UpdateFirewallConfigResponse,
  UpdateFirewallConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceId: 0, FirewallFailOpen: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallConfig",
})) as any;

export type UpdateFirewallDomainsError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the firewall domain list from an array of domain specifications.
 */
export const updateFirewallDomains: API.OperationMethod<
  UpdateFirewallDomainsRequest,
  UpdateFirewallDomainsResponse,
  UpdateFirewallDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { FirewallDomainListId: 0, Operation: 0, Domains: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallDomains",
})) as any;

export type UpdateFirewallRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified firewall rule. The rule's `FirewallRuleType`, `FirewallDomainListId`, and top-level `DnsThreatProtection` match source cannot be changed after creation. Rules whose `Status` is `CREATING` or `CREATION_FAILED` cannot be updated; remove a failed rule with DeleteFirewallRule.
 */
export const updateFirewallRule: API.OperationMethod<
  UpdateFirewallRuleRequest,
  UpdateFirewallRuleResponse,
  UpdateFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallRuleGroupId: 0,
      FirewallDomainListId: 0,
      FirewallThreatProtectionId: 0,
      Priority: 0,
      Action: 0,
      BlockResponse: 0,
      BlockOverrideDomain: 0,
      BlockOverrideDnsType: 0,
      BlockOverrideTtl: 0,
      Name: 0,
      FirewallDomainRedirectionAction: 0,
      Qtype: 0,
      DnsThreatProtection: 0,
      ConfidenceThreshold: 0,
      FirewallRuleType: i_FirewallRuleType,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallRule",
})) as any;

export type UpdateFirewallRuleGroupAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Changes the association of a FirewallRuleGroup with a VPC. The association enables DNS filtering for the VPC.
 */
export const updateFirewallRuleGroupAssociation: API.OperationMethod<
  UpdateFirewallRuleGroupAssociationRequest,
  UpdateFirewallRuleGroupAssociationResponse,
  UpdateFirewallRuleGroupAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      FirewallRuleGroupAssociationId: 0,
      Priority: 0,
      MutationProtection: 0,
      Name: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFirewallRuleGroupAssociation",
})) as any;

export type UpdateOutpostResolverError =
  | AccessDeniedException
  | ConflictException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * You can use `UpdateOutpostResolver` to update the instance count, type, or name of a Resolver on an Outpost.
 */
export const updateOutpostResolver: API.OperationMethod<
  UpdateOutpostResolverRequest,
  UpdateOutpostResolverResponse,
  UpdateOutpostResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { Id: 0, Name: 0, InstanceCount: 0, PreferredInstanceType: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateOutpostResolver",
})) as any;

export type UpdateResolverConfigError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the behavior configuration of Route 53 Resolver behavior for a single VPC from
 * Amazon Virtual Private Cloud.
 */
export const updateResolverConfig: API.OperationMethod<
  UpdateResolverConfigRequest,
  UpdateResolverConfigResponse,
  UpdateResolverConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { ResourceId: 0, AutodefinedReverseFlag: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResolverConfig",
})) as any;

export type UpdateResolverDnssecConfigError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates an existing DNSSEC validation configuration. If there is no existing DNSSEC validation configuration, one is created.
 */
export const updateResolverDnssecConfig: API.OperationMethod<
  UpdateResolverDnssecConfigRequest,
  UpdateResolverDnssecConfigResponse,
  UpdateResolverDnssecConfigError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { ResourceId: 0, Validation: 0 } },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResolverDnssecConfig",
})) as any;

export type UpdateResolverEndpointError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates the name, or endpoint type for an inbound or an outbound Resolver endpoint.
 * You can only update between IPV4 and DUALSTACK, IPV6 endpoint type can't be updated to other type.
 */
export const updateResolverEndpoint: API.OperationMethod<
  UpdateResolverEndpointRequest,
  UpdateResolverEndpointResponse,
  UpdateResolverEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResolverEndpointId: 0,
      Name: 0,
      ResolverEndpointType: 0,
      UpdateIpAddresses: D.list({ IpId: 0, Ipv6: 0 }),
      Protocols: 0,
      RniEnhancedMetricsEnabled: 0,
      TargetNameServerMetricsEnabled: 0,
      Dns64Enabled: 0,
      Ipv6InternetAccessEnabled: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResolverEndpoint",
})) as any;

export type UpdateResolverRuleError =
  | AccessDeniedException
  | InternalServiceErrorException
  | InvalidParameterException
  | InvalidRequestException
  | LimitExceededException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | CommonErrors;
/**
 * Updates settings for a specified Resolver rule. `ResolverRuleId` is required, and all other parameters are optional.
 * If you don't specify a parameter, it retains its current value.
 */
export const updateResolverRule: API.OperationMethod<
  UpdateResolverRuleRequest,
  UpdateResolverRuleResponse,
  UpdateResolverRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ResolverRuleId: 0,
      Config: {
        Name: 0,
        TargetIps: D.list(i_TargetAddress),
        ResolverEndpointId: 0,
      },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateResolverRule",
})) as any;

const i_Filter: D.LazyStruct = () => ({ Name: 0, Values: 0 });
const i_FirewallRuleType: D.LazyStruct = () => ({
  PartnerThreatProtection: { Partner: 0 },
  FirewallAdvancedContentCategory: { Category: 0 },
  FirewallAdvancedThreatCategory: { Category: 0 },
  DnsThreatProtection: { Value: 0, ConfidenceThreshold: 0 },
});
const i_IpAddressUpdate: D.LazyStruct = () => ({
  IpId: 0,
  SubnetId: 0,
  Ip: 0,
  Ipv6: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_TargetAddress: D.LazyStruct = () => ({
  Ip: 0,
  Port: 0,
  Ipv6: 0,
  Protocol: 0,
  ServerNameIndication: 0,
});
