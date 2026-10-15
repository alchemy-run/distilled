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
  sdkId: "Route53Resolver",
  serviceShapeName: "Route53Resolver",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "route53resolver" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-04-01");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://route53resolver.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://route53resolver.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://route53resolver.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()("AccessDeniedException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()("ConflictException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InternalServiceErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServiceErrorException>()(
    "InternalServiceErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()("InvalidNextTokenException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidParameterException
  extends /*@__PURE__*/ S.TaggedError<InvalidParameterException>()("InvalidParameterException", {
    message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
    FieldName: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class InvalidPolicyDocument
  extends /*@__PURE__*/ S.TaggedError<InvalidPolicyDocument>()("InvalidPolicyDocument", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidRequestException
  extends /*@__PURE__*/ S.TaggedError<InvalidRequestException>()("InvalidRequestException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class InvalidTagException
  extends /*@__PURE__*/ S.TaggedError<InvalidTagException>()("InvalidTagException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()("LimitExceededException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    ResourceType: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class ResourceExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceExistsException>()("ResourceExistsException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    ResourceType: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()("ResourceInUseException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    ResourceType: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()("ResourceNotFoundException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
    ResourceType: /*@__PURE__*/ S.optional(S.String),
  }) {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ResourceUnavailableException>()(
    "ResourceUnavailableException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      ResourceType: /*@__PURE__*/ S.optional(S.String),
    },
  ) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
  ) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()("ThrottlingException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class UnknownResourceException
  extends /*@__PURE__*/ S.TaggedError<UnknownResourceException>()("UnknownResourceException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()("ValidationException", {
    message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
  }) {}
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
export type ResolverEndpointType = "IPV6" | "IPV4" | "DUALSTACK" | (string & {});
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
export type DnsThreatProtection = "DGA" | "DNS_TUNNELING" | "DICTIONARY_DGA" | (string & {});
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
export type FirewallRuleGroupStatus = "COMPLETE" | "DELETING" | "UPDATING" | (string & {});
export type AccountId = string;
export type ShareStatus = "NOT_SHARED" | "SHARED_WITH_ME" | "SHARED_BY_ME" | (string & {});
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
export type RuleTypeOption = "FORWARD" | "SYSTEM" | "RECURSIVE" | "DELEGATE" | (string & {});
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
export type ResolverRuleStatus = "COMPLETE" | "DELETING" | "UPDATING" | "FAILED" | (string & {});
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
export type ResolverQueryLogConfigAssociationList = ResolverQueryLogConfigAssociation[];
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
export type FirewallDomainUpdateOperation = "ADD" | "REMOVE" | "REPLACE" | (string & {});
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
export type Validation = "ENABLE" | "DISABLE" | "USE_LOCAL_RESOURCE_SETTING" | (string & {});
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
 * If the rule group contains any rule configured with the `PartnerThreatProtection` rule type, the calling account must hold an active Amazon Web Services Marketplace subscription to the named partner. If the subscription is missing, the association request is rejected.
 */
export const associateFirewallRuleGroup: API.OperationMethod<
  AssociateFirewallRuleGroupRequest,
  AssociateFirewallRuleGroupResponse,
  AssociateFirewallRuleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<AssociateFirewallRuleGroupRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<AssociateFirewallRuleGroupResponse>,
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
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<AssociateResolverEndpointIpAddressRequest>,
  output: __S(56, __c7, 0) as any as S.Schema<AssociateResolverEndpointIpAddressResponse>,
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
}));

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
  input: __S(72, __c9, 0) as any as S.Schema<AssociateResolverQueryLogConfigRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<AssociateResolverQueryLogConfigResponse>,
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
}));

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
  input: __S(96, __c12, 0) as any as S.Schema<AssociateResolverRuleRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<AssociateResolverRuleResponse>,
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
}));

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
  input: __S(122, __c15, 2) as any as S.Schema<BatchCreateFirewallRuleRequest>,
  output: __S(125, __c15, 5) as any as S.Schema<BatchCreateFirewallRuleResponse>,
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
}));

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
  input: __S(146, __c18, 2) as any as S.Schema<BatchDeleteFirewallRuleRequest>,
  output: __S(149, __c18, 5) as any as S.Schema<BatchDeleteFirewallRuleResponse>,
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
}));

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
  input: __S(154, __c19, 2) as any as S.Schema<BatchUpdateFirewallRuleRequest>,
  output: __S(157, __c19, 5) as any as S.Schema<BatchUpdateFirewallRuleResponse>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<CreateFirewallDomainListRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<CreateFirewallDomainListResponse>,
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
}));

export type CreateFirewallRuleError =
  | AccessDeniedException
  | InternalServiceErrorException
  | LimitExceededException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a single DNS Firewall rule in the specified rule group. The rule can use any one of the following match sources, and the chosen source must be supplied through the matching request field -- they are mutually exclusive:
 *
 * - `FirewallDomainListId` -- match a customer-managed or Amazon Web Services-managed domain list.
 *
 * - `DnsThreatProtection` -- match a built-in DNS Firewall Advanced threat detector (`DGA`, `DNS_TUNNELING`, or `DICTIONARY_DGA`).
 *
 * - `FirewallRuleType` -- match one of the rule-type variants returned by ListFirewallRuleTypes: `FirewallAdvancedContentCategory`, `FirewallAdvancedThreatCategory`, `DnsThreatProtection`, or `PartnerThreatProtection`. The `PartnerThreatProtection` variant requires an active Amazon Web Services Marketplace subscription to the named partner product.
 *
 * For rules that require asynchronous provisioning (today, the `PartnerThreatProtection` rule type), the rule's `Status` begins at `CREATING` and transitions to `COMPLETE` once the rule is provisioned and the marketplace entitlement is verified. If provisioning fails, `Status` becomes `CREATION_FAILED` and `StatusMessage` contains a human-readable reason; the rule is then immutable and must be removed with DeleteFirewallRule.
 */
export const createFirewallRule: API.OperationMethod<
  CreateFirewallRuleRequest,
  CreateFirewallRuleResponse,
  CreateFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<CreateFirewallRuleRequest>,
  output: __S(184, __c23, 0) as any as S.Schema<CreateFirewallRuleResponse>,
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
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<CreateFirewallRuleGroupRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<CreateFirewallRuleGroupResponse>,
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
}));

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
 *
 * This operation applies to first-generation Outposts only. On second-generation Outposts, Resolver
 * is enabled by default and managed automatically by Amazon Web Services, so you don't need to create it.
 */
export const createOutpostResolver: API.OperationMethod<
  CreateOutpostResolverRequest,
  CreateOutpostResolverResponse,
  CreateOutpostResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<CreateOutpostResolverRequest>,
  output: __S(224, __c28, 0) as any as S.Schema<CreateOutpostResolverResponse>,
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
}));

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
  input: __S(234, __c29, 2) as any as S.Schema<CreateResolverEndpointRequest>,
  output: __S(56, __c7, 0) as any as S.Schema<CreateResolverEndpointResponse>,
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
}));

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
  input: __S(240, __c30, 0) as any as S.Schema<CreateResolverQueryLogConfigRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<CreateResolverQueryLogConfigResponse>,
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
}));

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
  input: __S(264, __c33, 0) as any as S.Schema<CreateResolverRuleRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<CreateResolverRuleResponse>,
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
}));

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
  input: __S(288, __c36, 0) as any as S.Schema<DeleteFirewallDomainListRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<DeleteFirewallDomainListResponse>,
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
}));

export type DeleteFirewallRuleError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified firewall rule. Identify the rule using either `FirewallDomainListId` (for domain-list and DNS Firewall Advanced rules) or `FirewallThreatProtectionId` (for partner-managed and DNS Firewall Advanced rules) -- together with `FirewallRuleGroupId`.
 *
 * `DeleteFirewallRule` is the only operation that succeeds against a rule whose `Status` is `CREATION_FAILED`.
 */
export const deleteFirewallRule: API.OperationMethod<
  DeleteFirewallRuleRequest,
  DeleteFirewallRuleResponse,
  DeleteFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<DeleteFirewallRuleRequest>,
  output: __S(184, __c23, 0) as any as S.Schema<DeleteFirewallRuleResponse>,
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
}));

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
  input: __S(304, __c38, 0) as any as S.Schema<DeleteFirewallRuleGroupRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<DeleteFirewallRuleGroupResponse>,
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
}));

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
 *
 * This operation applies to first-generation Outposts only. On second-generation Outposts, Resolver
 * is managed automatically by Amazon Web Services and can't be deleted directly. To opt out of Resolver on
 * second-generation Outposts, contact Amazon Web Services Support.
 */
export const deleteOutpostResolver: API.OperationMethod<
  DeleteOutpostResolverRequest,
  DeleteOutpostResolverResponse,
  DeleteOutpostResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<DeleteOutpostResolverRequest>,
  output: __S(224, __c28, 0) as any as S.Schema<DeleteOutpostResolverResponse>,
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
}));

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
  input: __S(320, __c40, 0) as any as S.Schema<DeleteResolverEndpointRequest>,
  output: __S(56, __c7, 0) as any as S.Schema<DeleteResolverEndpointResponse>,
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
}));

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
  input: __S(328, __c41, 0) as any as S.Schema<DeleteResolverQueryLogConfigRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<DeleteResolverQueryLogConfigResponse>,
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
}));

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
  input: __S(336, __c42, 0) as any as S.Schema<DeleteResolverRuleRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<DeleteResolverRuleResponse>,
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
}));

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
  input: __S(344, __c43, 0) as any as S.Schema<DisassociateFirewallRuleGroupRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<DisassociateFirewallRuleGroupResponse>,
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
}));

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
  input: __S(352, __c44, 0) as any as S.Schema<DisassociateResolverEndpointIpAddressRequest>,
  output: __S(56, __c7, 0) as any as S.Schema<DisassociateResolverEndpointIpAddressResponse>,
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
}));

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
  input: __S(360, __c45, 0) as any as S.Schema<DisassociateResolverQueryLogConfigRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<DisassociateResolverQueryLogConfigResponse>,
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
}));

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
  input: __S(368, __c46, 0) as any as S.Schema<DisassociateResolverRuleRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<DisassociateResolverRuleResponse>,
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
}));

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
  input: __S(376, __c47, 0) as any as S.Schema<GetFirewallConfigRequest>,
  output: __S(392, __c49, 0) as any as S.Schema<GetFirewallConfigResponse>,
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
}));

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
  input: __S(400, __c50, 0) as any as S.Schema<GetFirewallDomainListRequest>,
  output: __S(169, __c21, 1) as any as S.Schema<GetFirewallDomainListResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFirewallDomainList",
}));

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
  input: __S(408, __c51, 0) as any as S.Schema<GetFirewallRuleGroupRequest>,
  output: __S(201, __c25, 1) as any as S.Schema<GetFirewallRuleGroupResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFirewallRuleGroup",
}));

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
  input: __S(416, __c52, 0) as any as S.Schema<GetFirewallRuleGroupAssociationRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<GetFirewallRuleGroupAssociationResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFirewallRuleGroupAssociation",
}));

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
  input: __S(424, __c53, 0) as any as S.Schema<GetFirewallRuleGroupPolicyRequest>,
  output: __S(425, __c53, 1) as any as S.Schema<GetFirewallRuleGroupPolicyResponse>,
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
}));

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
  input: __S(432, __c54, 0) as any as S.Schema<GetOutpostResolverRequest>,
  output: __S(224, __c28, 0) as any as S.Schema<GetOutpostResolverResponse>,
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
}));

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
  input: __S(440, __c55, 0) as any as S.Schema<GetResolverConfigRequest>,
  output: __S(456, __c57, 0) as any as S.Schema<GetResolverConfigResponse>,
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
}));

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
  input: __S(464, __c58, 0) as any as S.Schema<GetResolverDnssecConfigRequest>,
  output: __S(480, __c60, 0) as any as S.Schema<GetResolverDnssecConfigResponse>,
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
}));

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
  input: __S(488, __c61, 0) as any as S.Schema<GetResolverEndpointRequest>,
  output: __S(56, __c7, 0) as any as S.Schema<GetResolverEndpointResponse>,
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResolverEndpoint",
}));

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
  input: __S(496, __c62, 0) as any as S.Schema<GetResolverQueryLogConfigRequest>,
  output: __S(248, __c31, 0) as any as S.Schema<GetResolverQueryLogConfigResponse>,
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
}));

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
  input: __S(504, __c63, 0) as any as S.Schema<GetResolverQueryLogConfigAssociationRequest>,
  output: __S(80, __c10, 0) as any as S.Schema<GetResolverQueryLogConfigAssociationResponse>,
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
}));

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
  input: __S(512, __c64, 0) as any as S.Schema<GetResolverQueryLogConfigPolicyRequest>,
  output: __S(513, __c64, 1) as any as S.Schema<GetResolverQueryLogConfigPolicyResponse>,
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
}));

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
  input: __S(520, __c65, 0) as any as S.Schema<GetResolverRuleRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<GetResolverRuleResponse>,
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResolverRule",
}));

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
  input: __S(528, __c66, 0) as any as S.Schema<GetResolverRuleAssociationRequest>,
  output: __S(104, __c13, 0) as any as S.Schema<GetResolverRuleAssociationResponse>,
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResolverRuleAssociation",
}));

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
  input: __S(536, __c67, 0) as any as S.Schema<GetResolverRulePolicyRequest>,
  output: __S(537, __c67, 1) as any as S.Schema<GetResolverRulePolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    UnknownResourceException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResolverRulePolicy",
}));

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
  input: __S(544, __c68, 0) as any as S.Schema<ImportFirewallDomainsRequest>,
  output: __S(552, __c69, 0) as any as S.Schema<ImportFirewallDomainsResponse>,
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
}));

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
  input: __S(560, __c70, 0) as any as S.Schema<ListFirewallConfigsRequest>,
  output: __S(562, __c70, 2) as any as S.Schema<ListFirewallConfigsResponse>,
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
  input: __S(568, __c71, 0) as any as S.Schema<ListFirewallDomainListsRequest>,
  output: __S(571, __c71, 3) as any as S.Schema<ListFirewallDomainListsResponse>,
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
  input: __S(576, __c72, 0) as any as S.Schema<ListFirewallDomainsRequest>,
  output: __S(577, __c72, 1) as any as S.Schema<ListFirewallDomainsResponse>,
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
  input: __S(584, __c73, 0) as any as S.Schema<ListFirewallRuleGroupAssociationsRequest>,
  output: __S(586, __c73, 2) as any as S.Schema<ListFirewallRuleGroupAssociationsResponse>,
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
  input: __S(592, __c74, 0) as any as S.Schema<ListFirewallRuleGroupsRequest>,
  output: __S(595, __c74, 3) as any as S.Schema<ListFirewallRuleGroupsResponse>,
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
  input: __S(600, __c75, 0) as any as S.Schema<ListFirewallRulesRequest>,
  output: __S(601, __c75, 1) as any as S.Schema<ListFirewallRulesResponse>,
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
 * Retrieves the rule-type variants that can be used in the `FirewallRuleType` field of CreateFirewallRule and UpdateFirewallRule. Each returned FirewallRuleTypeDefinition identifies one variant + value combination -- for example, `FirewallAdvancedContentCategory` + `VIOLENCE_AND_HATE_SPEECH`, or `PartnerThreatProtection` + a partner-managed feed.
 *
 * The supported `RuleType` filter values are `FirewallAdvancedContentCategory`, `FirewallAdvancedThreatCategory`, `DnsThreatProtection`, and `PartnerThreatProtection`. When a returned definition's variant requires an external subscription (currently only `PartnerThreatProtection`), the response also includes a SubscriptionInfo identifying the Amazon Web Services Marketplace product that backs it; absence of `SubscriptionInfo` means the variant is fully managed by Amazon Web Services and requires no separate subscription.
 */
export const listFirewallRuleTypes: API.PaginatedOperationMethod<
  ListFirewallRuleTypesRequest,
  ListFirewallRuleTypesResponse,
  ListFirewallRuleTypesError,
  Credentials | HttpClient.HttpClient,
  FirewallRuleTypeDefinition
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c76, 0) as any as S.Schema<ListFirewallRuleTypesRequest>,
  output: __S(612, __c76, 4) as any as S.Schema<ListFirewallRuleTypesResponse>,
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
  input: __S(616, __c77, 0) as any as S.Schema<ListOutpostResolversRequest>,
  output: __S(618, __c77, 2) as any as S.Schema<ListOutpostResolversResponse>,
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
  input: __S(624, __c78, 0) as any as S.Schema<ListResolverConfigsRequest>,
  output: __S(626, __c78, 2) as any as S.Schema<ListResolverConfigsResponse>,
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
  input: __S(632, __c79, 0) as any as S.Schema<ListResolverDnssecConfigsRequest>,
  output: __S(634, __c79, 2) as any as S.Schema<ListResolverDnssecConfigsResponse>,
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
  input: __S(648, __c81, 0) as any as S.Schema<ListResolverEndpointIpAddressesRequest>,
  output: __S(651, __c81, 3) as any as S.Schema<ListResolverEndpointIpAddressesResponse>,
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
  input: __S(656, __c82, 0) as any as S.Schema<ListResolverEndpointsRequest>,
  output: __S(658, __c82, 2) as any as S.Schema<ListResolverEndpointsResponse>,
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
  input: __S(664, __c83, 0) as any as S.Schema<ListResolverQueryLogConfigAssociationsRequest>,
  output: __S(666, __c83, 2) as any as S.Schema<ListResolverQueryLogConfigAssociationsResponse>,
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
  input: __S(672, __c84, 0) as any as S.Schema<ListResolverQueryLogConfigsRequest>,
  output: __S(674, __c84, 2) as any as S.Schema<ListResolverQueryLogConfigsResponse>,
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
  input: __S(680, __c85, 0) as any as S.Schema<ListResolverRuleAssociationsRequest>,
  output: __S(682, __c85, 2) as any as S.Schema<ListResolverRuleAssociationsResponse>,
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
  input: __S(688, __c86, 0) as any as S.Schema<ListResolverRulesRequest>,
  output: __S(690, __c86, 2) as any as S.Schema<ListResolverRulesResponse>,
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
  input: __S(696, __c87, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(697, __c87, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
  input: __S(704, __c88, 0) as any as S.Schema<PutFirewallRuleGroupPolicyRequest>,
  output: __S(712, __c89, 0) as any as S.Schema<PutFirewallRuleGroupPolicyResponse>,
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
}));

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
  input: __S(720, __c90, 0) as any as S.Schema<PutResolverQueryLogConfigPolicyRequest>,
  output: __S(712, __c89, 0) as any as S.Schema<PutResolverQueryLogConfigPolicyResponse>,
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
}));

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
  input: __S(728, __c91, 0) as any as S.Schema<PutResolverRulePolicyRequest>,
  output: __S(712, __c89, 0) as any as S.Schema<PutResolverRulePolicyResponse>,
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
}));

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
  input: __S(736, __c92, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(744, __c93, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(752, __c94, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(744, __c93, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(760, __c95, 0) as any as S.Schema<UpdateFirewallConfigRequest>,
  output: __S(392, __c49, 0) as any as S.Schema<UpdateFirewallConfigResponse>,
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
}));

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
  input: __S(768, __c96, 0) as any as S.Schema<UpdateFirewallDomainsRequest>,
  output: __S(552, __c69, 0) as any as S.Schema<UpdateFirewallDomainsResponse>,
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
}));

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
  input: __S(776, __c97, 0) as any as S.Schema<UpdateFirewallRuleRequest>,
  output: __S(184, __c23, 0) as any as S.Schema<UpdateFirewallRuleResponse>,
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
}));

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
  input: __S(784, __c98, 0) as any as S.Schema<UpdateFirewallRuleGroupAssociationRequest>,
  output: __S(24, __c3, 0) as any as S.Schema<UpdateFirewallRuleGroupAssociationResponse>,
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
}));

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
 *
 * This operation applies to first-generation Outposts only. On second-generation Outposts, Resolver
 * is managed automatically by Amazon Web Services and can't be updated directly.
 */
export const updateOutpostResolver: API.OperationMethod<
  UpdateOutpostResolverRequest,
  UpdateOutpostResolverResponse,
  UpdateOutpostResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(792, __c99, 0) as any as S.Schema<UpdateOutpostResolverRequest>,
  output: __S(224, __c28, 0) as any as S.Schema<UpdateOutpostResolverResponse>,
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
}));

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
  input: __S(800, __c100, 0) as any as S.Schema<UpdateResolverConfigRequest>,
  output: __S(456, __c57, 0) as any as S.Schema<UpdateResolverConfigResponse>,
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
}));

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
  input: __S(808, __c101, 0) as any as S.Schema<UpdateResolverDnssecConfigRequest>,
  output: __S(480, __c60, 0) as any as S.Schema<UpdateResolverDnssecConfigResponse>,
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
}));

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
  input: __S(818, __c102, 2) as any as S.Schema<UpdateResolverEndpointRequest>,
  output: __S(56, __c7, 0) as any as S.Schema<UpdateResolverEndpointResponse>,
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
}));

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
  input: __S(825, __c103, 1) as any as S.Schema<UpdateResolverRuleRequest>,
  output: __S(280, __c35, 0) as any as S.Schema<UpdateResolverRuleResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreatorRequestId: S.String.pipe(T.IdempotencyToken()),
          FirewallRuleGroupId: S.String,
          VpcId: S.String,
          Priority: S.Number,
          Name: S.String,
          MutationProtection: S.optional(S.String),
          Tags: S.optional(__S(9, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "AssociateFirewallRuleGroupRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(8, __c1, 0));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          FirewallRuleGroupId: S.optional(S.String),
          VpcId: S.optional(S.String),
          Name: S.optional(S.String),
          Priority: S.optional(S.Number),
          MutationProtection: S.optional(S.String),
          ManagedOwnerName: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          CreatorRequestId: S.optional(S.String),
          CreationTime: S.optional(S.String),
          ModificationTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "FirewallRuleGroupAssociation" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FirewallRuleGroupAssociation: S.optional(__S(16, __c2, 0)) }),
      ).annotate({ identifier: "AssociateFirewallRuleGroupResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverEndpointId: S.String, IpAddress: __S(64, __c8, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateResolverEndpointIpAddressRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          CreatorRequestId: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          SecurityGroupIds: S.optional(__S(40, __c5, 0)),
          Direction: S.optional(S.String),
          IpAddressCount: S.optional(S.Number),
          HostVPCId: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          CreationTime: S.optional(S.String),
          ModificationTime: S.optional(S.String),
          OutpostArn: S.optional(S.String),
          PreferredInstanceType: S.optional(S.String),
          ResolverEndpointType: S.optional(S.String),
          Protocols: S.optional(__S(48, __c6, 0)),
          RniEnhancedMetricsEnabled: S.optional(S.Boolean),
          TargetNameServerMetricsEnabled: S.optional(S.Boolean),
          Dns64Enabled: S.optional(S.Boolean),
          Ipv6InternetAccessEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ResolverEndpoint" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ResolverEndpoint: S.optional(__S(49, __c6, 1)) })).annotate(
        { identifier: "AssociateResolverEndpointIpAddressResponse" },
      );
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          IpId: S.optional(S.String),
          SubnetId: S.optional(S.String),
          Ip: S.optional(S.String),
          Ipv6: S.optional(S.String),
        }),
      ).annotate({ identifier: "IpAddressUpdate" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverQueryLogConfigId: S.String, ResourceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateResolverQueryLogConfigRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverQueryLogConfigAssociation: S.optional(__S(88, __c11, 0)) }),
      ).annotate({ identifier: "AssociateResolverQueryLogConfigResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ResolverQueryLogConfigId: S.optional(S.String),
          ResourceId: S.optional(S.String),
          Status: S.optional(S.String),
          Error: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          CreationTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResolverQueryLogConfigAssociation" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverRuleId: S.String, Name: S.optional(S.String), VPCId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "AssociateResolverRuleRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverRuleAssociation: S.optional(__S(112, __c14, 0)) }),
      ).annotate({ identifier: "AssociateResolverRuleResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ResolverRuleId: S.optional(S.String),
          Name: S.optional(S.String),
          VPCId: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResolverRuleAssociation" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreatorRequestId: S.String,
          FirewallRuleGroupId: S.String,
          FirewallDomainListId: S.optional(S.String),
          Priority: S.Number,
          Action: S.String,
          BlockResponse: S.optional(S.String),
          BlockOverrideDomain: S.optional(S.String),
          BlockOverrideDnsType: S.optional(S.String),
          BlockOverrideTtl: S.optional(S.Number),
          Name: S.String,
          FirewallDomainRedirectionAction: S.optional(S.String),
          Qtype: S.optional(S.String),
          DnsThreatProtection: S.optional(S.String),
          ConfidenceThreshold: S.optional(S.String),
          FirewallRuleType: S.optional(__S(131, __c16, 3)),
        }),
      ).annotate({ identifier: "CreateFirewallRuleEntry" });
    case 1:
      return S.Array(__S(120, __c15, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ CreateFirewallRuleEntries: __S(121, __c15, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchCreateFirewallRuleRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FirewallRule: S.optional(__S(120, __c15, 0)),
          Code: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchCreateFirewallRuleError" });
    case 4:
      return S.Array(__S(123, __c15, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          CreatedFirewallRules: S.optional(__S(136, __c17, 0)),
          CreateErrors: S.optional(__S(124, __c15, 4)),
        }),
      ).annotate({ identifier: "BatchCreateFirewallRuleResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Partner: S.String })).annotate({
        identifier: "PartnerThreatProtectionConfig",
      });
    case 1:
      return S.suspend(() => S.Struct({ Category: S.String })).annotate({
        identifier: "FirewallAdvancedContentCategoryConfig",
      });
    case 2:
      return S.suspend(() => S.Struct({ Value: S.String, ConfidenceThreshold: S.String })).annotate(
        { identifier: "DnsThreatProtectionRuleTypeConfig" },
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          PartnerThreatProtection: S.optional(__S(128, __c16, 0)),
          FirewallAdvancedContentCategory: S.optional(__S(129, __c16, 1)),
          FirewallAdvancedThreatCategory: S.optional(__S(129, __c16, 1)),
          DnsThreatProtection: S.optional(__S(130, __c16, 2)),
        }),
      ).annotate({ identifier: "FirewallRuleType" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          FirewallRuleGroupId: S.optional(S.String),
          FirewallDomainListId: S.optional(S.String),
          FirewallThreatProtectionId: S.optional(S.String),
          Name: S.optional(S.String),
          Priority: S.optional(S.Number),
          Action: S.optional(S.String),
          BlockResponse: S.optional(S.String),
          BlockOverrideDomain: S.optional(S.String),
          BlockOverrideDnsType: S.optional(S.String),
          BlockOverrideTtl: S.optional(S.Number),
          CreatorRequestId: S.optional(S.String),
          CreationTime: S.optional(S.String),
          ModificationTime: S.optional(S.String),
          FirewallDomainRedirectionAction: S.optional(S.String),
          Qtype: S.optional(S.String),
          DnsThreatProtection: S.optional(S.String),
          ConfidenceThreshold: S.optional(S.String),
          FirewallRuleType: S.optional(__S(131, __c16, 3)),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "FirewallRule" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(132, __c16, 4));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallRuleGroupId: S.String,
          FirewallDomainListId: S.optional(S.String),
          FirewallThreatProtectionId: S.optional(S.String),
          Qtype: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteFirewallRuleEntry" });
    case 1:
      return S.Array(__S(144, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ DeleteFirewallRuleEntries: __S(145, __c18, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchDeleteFirewallRuleRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FirewallRule: S.optional(__S(144, __c18, 0)),
          Code: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchDeleteFirewallRuleError" });
    case 4:
      return S.Array(__S(147, __c18, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          DeletedFirewallRules: S.optional(__S(136, __c17, 0)),
          DeleteErrors: S.optional(__S(148, __c18, 4)),
        }),
      ).annotate({ identifier: "BatchDeleteFirewallRuleResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallRuleGroupId: S.String,
          FirewallDomainListId: S.optional(S.String),
          FirewallThreatProtectionId: S.optional(S.String),
          Priority: S.optional(S.Number),
          Action: S.optional(S.String),
          BlockResponse: S.optional(S.String),
          BlockOverrideDomain: S.optional(S.String),
          BlockOverrideDnsType: S.optional(S.String),
          BlockOverrideTtl: S.optional(S.Number),
          Name: S.optional(S.String),
          FirewallDomainRedirectionAction: S.optional(S.String),
          Qtype: S.optional(S.String),
          DnsThreatProtection: S.optional(S.String),
          ConfidenceThreshold: S.optional(S.String),
          FirewallRuleType: S.optional(__S(131, __c16, 3)),
        }),
      ).annotate({ identifier: "UpdateFirewallRuleEntry" });
    case 1:
      return S.Array(__S(152, __c19, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ UpdateFirewallRuleEntries: __S(153, __c19, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchUpdateFirewallRuleRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          FirewallRule: S.optional(__S(152, __c19, 0)),
          Code: S.optional(S.String),
          Message: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchUpdateFirewallRuleError" });
    case 4:
      return S.Array(__S(155, __c19, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          UpdatedFirewallRules: S.optional(__S(136, __c17, 0)),
          UpdateErrors: S.optional(__S(156, __c19, 4)),
        }),
      ).annotate({ identifier: "BatchUpdateFirewallRuleResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreatorRequestId: S.String.pipe(T.IdempotencyToken()),
          Name: S.String,
          Tags: S.optional(__S(9, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFirewallDomainListRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          DomainCount: S.optional(S.Number),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          ManagedOwnerName: S.optional(S.String),
          CreatorRequestId: S.optional(S.String),
          CreationTime: S.optional(S.String),
          ModificationTime: S.optional(S.String),
          Category: S.optional(S.String),
          ManagedListType: S.optional(S.String),
        }),
      ).annotate({ identifier: "FirewallDomainList" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FirewallDomainList: S.optional(__S(168, __c21, 0)) }),
      ).annotate({ identifier: "CreateFirewallDomainListResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreatorRequestId: S.String.pipe(T.IdempotencyToken()),
          FirewallRuleGroupId: S.String,
          FirewallDomainListId: S.optional(S.String),
          Priority: S.Number,
          Action: S.String,
          BlockResponse: S.optional(S.String),
          BlockOverrideDomain: S.optional(S.String),
          BlockOverrideDnsType: S.optional(S.String),
          BlockOverrideTtl: S.optional(S.Number),
          Name: S.String,
          FirewallDomainRedirectionAction: S.optional(S.String),
          Qtype: S.optional(S.String),
          DnsThreatProtection: S.optional(S.String),
          ConfidenceThreshold: S.optional(S.String),
          FirewallRuleType: S.optional(__S(131, __c16, 3)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFirewallRuleRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ FirewallRule: S.optional(__S(132, __c16, 4)) })).annotate({
        identifier: "CreateFirewallRuleResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreatorRequestId: S.String.pipe(T.IdempotencyToken()),
          Name: S.String,
          Tags: S.optional(__S(9, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFirewallRuleGroupRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          RuleCount: S.optional(S.Number),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          OwnerId: S.optional(S.String),
          CreatorRequestId: S.optional(S.String),
          ShareStatus: S.optional(S.String),
          CreationTime: S.optional(S.String),
          ModificationTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "FirewallRuleGroup" });
    case 1:
      return S.suspend(() =>
        S.Struct({ FirewallRuleGroup: S.optional(__S(200, __c25, 0)) }),
      ).annotate({ identifier: "CreateFirewallRuleGroupResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreatorRequestId: S.String,
          Name: S.String,
          InstanceCount: S.optional(S.Number),
          PreferredInstanceType: S.String,
          OutpostArn: S.String,
          Tags: S.optional(__S(9, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateOutpostResolverRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          CreationTime: S.optional(S.String),
          ModificationTime: S.optional(S.String),
          CreatorRequestId: S.optional(S.String),
          Id: S.optional(S.String),
          InstanceCount: S.optional(S.Number),
          PreferredInstanceType: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          OutpostArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "OutpostResolver" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ OutpostResolver: S.optional(__S(216, __c27, 0)) }),
      ).annotate({ identifier: "CreateOutpostResolverResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ SubnetId: S.String, Ip: S.optional(S.String), Ipv6: S.optional(S.String) }),
      ).annotate({ identifier: "IpAddressRequest" });
    case 1:
      return S.Array(__S(232, __c29, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          CreatorRequestId: S.String,
          Name: S.optional(S.String),
          SecurityGroupIds: __S(40, __c5, 0),
          Direction: S.String,
          IpAddresses: __S(233, __c29, 1),
          OutpostArn: S.optional(S.String),
          PreferredInstanceType: S.optional(S.String),
          Tags: S.optional(__S(9, __c1, 1)),
          ResolverEndpointType: S.optional(S.String),
          Protocols: S.optional(__S(48, __c6, 0)),
          RniEnhancedMetricsEnabled: S.optional(S.Boolean),
          TargetNameServerMetricsEnabled: S.optional(S.Boolean),
          Dns64Enabled: S.optional(S.Boolean),
          Ipv6InternetAccessEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateResolverEndpointRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          DestinationArn: S.String,
          CreatorRequestId: S.String.pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(9, __c1, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateResolverQueryLogConfigRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverQueryLogConfig: S.optional(__S(256, __c32, 0)) }),
      ).annotate({ identifier: "CreateResolverQueryLogConfigResponse" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          OwnerId: S.optional(S.String),
          Status: S.optional(S.String),
          ShareStatus: S.optional(S.String),
          AssociationCount: S.optional(S.Number),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          DestinationArn: S.optional(S.String),
          CreatorRequestId: S.optional(S.String),
          CreationTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResolverQueryLogConfig" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          CreatorRequestId: S.String,
          Name: S.optional(S.String),
          RuleType: S.String,
          DomainName: S.optional(S.String),
          TargetIps: S.optional(__S(273, __c34, 1)),
          ResolverEndpointId: S.optional(S.String),
          Tags: S.optional(__S(9, __c1, 1)),
          DelegationRecord: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateResolverRuleRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Ip: S.optional(S.String),
          Port: S.optional(S.Number),
          Ipv6: S.optional(S.String),
          Protocol: S.optional(S.String),
          ServerNameIndication: S.optional(S.String),
        }),
      ).annotate({ identifier: "TargetAddress" });
    case 1:
      return S.Array(__S(272, __c34, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          CreatorRequestId: S.optional(S.String),
          Arn: S.optional(S.String),
          DomainName: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          RuleType: S.optional(S.String),
          Name: S.optional(S.String),
          TargetIps: S.optional(__S(273, __c34, 1)),
          ResolverEndpointId: S.optional(S.String),
          OwnerId: S.optional(S.String),
          ShareStatus: S.optional(S.String),
          CreationTime: S.optional(S.String),
          ModificationTime: S.optional(S.String),
          DelegationRecord: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResolverRule" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ResolverRule: S.optional(__S(274, __c34, 2)) })).annotate({
        identifier: "CreateResolverRuleResponse",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FirewallDomainListId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteFirewallDomainListRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallRuleGroupId: S.String,
          FirewallDomainListId: S.optional(S.String),
          FirewallThreatProtectionId: S.optional(S.String),
          Qtype: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteFirewallRuleRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FirewallRuleGroupId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteFirewallRuleGroupRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteOutpostResolverRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverEndpointId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResolverEndpointRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverQueryLogConfigId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResolverQueryLogConfigRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverRuleId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteResolverRuleRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FirewallRuleGroupAssociationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateFirewallRuleGroupRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverEndpointId: S.String, IpAddress: __S(64, __c8, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateResolverEndpointIpAddressRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverQueryLogConfigId: S.String, ResourceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateResolverQueryLogConfigRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ VPCId: S.String, ResolverRuleId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DisassociateResolverRuleRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetFirewallConfigRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ResourceId: S.optional(S.String),
          OwnerId: S.optional(S.String),
          FirewallFailOpen: S.optional(S.String),
        }),
      ).annotate({ identifier: "FirewallConfig" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ FirewallConfig: S.optional(__S(384, __c48, 0)) })).annotate(
        { identifier: "GetFirewallConfigResponse" },
      );
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FirewallDomainListId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetFirewallDomainListRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FirewallRuleGroupId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetFirewallRuleGroupRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ FirewallRuleGroupAssociationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetFirewallRuleGroupAssociationRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetFirewallRuleGroupPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ FirewallRuleGroupPolicy: S.optional(S.String) })).annotate({
        identifier: "GetFirewallRuleGroupPolicyResponse",
      });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Id: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetOutpostResolverRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResolverConfigRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          ResourceId: S.optional(S.String),
          OwnerId: S.optional(S.String),
          AutodefinedReverse: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResolverConfig" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ResolverConfig: S.optional(__S(448, __c56, 0)) })).annotate(
        { identifier: "GetResolverConfigResponse" },
      );
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResolverDnssecConfigRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          OwnerId: S.optional(S.String),
          ResourceId: S.optional(S.String),
          ValidationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResolverDnssecConfig" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverDNSSECConfig: S.optional(__S(472, __c59, 0)) }),
      ).annotate({ identifier: "GetResolverDnssecConfigResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverEndpointId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResolverEndpointRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverQueryLogConfigId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResolverQueryLogConfigRequest" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverQueryLogConfigAssociationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResolverQueryLogConfigAssociationRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResolverQueryLogConfigPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResolverQueryLogConfigPolicy: S.optional(S.String) }),
      ).annotate({ identifier: "GetResolverQueryLogConfigPolicyResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverRuleId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResolverRuleRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResolverRuleAssociationId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResolverRuleAssociationRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetResolverRulePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ ResolverRulePolicy: S.optional(S.String) })).annotate({
        identifier: "GetResolverRulePolicyResponse",
      });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallDomainListId: S.String,
          Operation: S.String,
          DomainFileUrl: S.String,
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ImportFirewallDomainsRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Name: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ImportFirewallDomainsResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFirewallConfigsRequest" });
    case 1:
      return S.Array(__S(384, __c48, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          FirewallConfigs: S.optional(__S(561, __c70, 1)),
        }),
      ).annotate({ identifier: "ListFirewallConfigsResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFirewallDomainListsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          CreatorRequestId: S.optional(S.String),
          ManagedOwnerName: S.optional(S.String),
          ManagedListType: S.optional(S.String),
          Category: S.optional(S.String),
        }),
      ).annotate({ identifier: "FirewallDomainListMetadata" });
    case 2:
      return S.Array(__S(569, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          FirewallDomainLists: S.optional(__S(570, __c71, 2)),
        }),
      ).annotate({ identifier: "ListFirewallDomainListsResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallDomainListId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFirewallDomainsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Domains: S.optional(__S(40, __c5, 0)) }),
      ).annotate({ identifier: "ListFirewallDomainsResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallRuleGroupId: S.optional(S.String),
          VpcId: S.optional(S.String),
          Priority: S.optional(S.Number),
          Status: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFirewallRuleGroupAssociationsRequest" });
    case 1:
      return S.Array(__S(16, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          FirewallRuleGroupAssociations: S.optional(__S(585, __c73, 1)),
        }),
      ).annotate({ identifier: "ListFirewallRuleGroupAssociationsResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFirewallRuleGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Id: S.optional(S.String),
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          OwnerId: S.optional(S.String),
          CreatorRequestId: S.optional(S.String),
          ShareStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "FirewallRuleGroupMetadata" });
    case 2:
      return S.Array(__S(593, __c74, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          FirewallRuleGroups: S.optional(__S(594, __c74, 2)),
        }),
      ).annotate({ identifier: "ListFirewallRuleGroupsResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallRuleGroupId: S.String,
          Priority: S.optional(S.Number),
          Action: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFirewallRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          FirewallRules: S.optional(__S(136, __c17, 0)),
        }),
      ).annotate({ identifier: "ListFirewallRulesResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RuleType: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFirewallRuleTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ VendorName: S.optional(S.String), ProductId: S.optional(S.String) }),
      ).annotate({ identifier: "SubscriptionInfo" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          RuleType: S.optional(S.String),
          Value: S.optional(S.String),
          DisplayName: S.optional(S.String),
          Description: S.optional(S.String),
          SubscriptionInfo: S.optional(__S(609, __c76, 1)),
        }),
      ).annotate({ identifier: "FirewallRuleTypeDefinition" });
    case 3:
      return S.Array(__S(610, __c76, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          FirewallRuleTypes: S.optional(__S(611, __c76, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListFirewallRuleTypesResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          OutpostArn: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOutpostResolversRequest" });
    case 1:
      return S.Array(__S(216, __c27, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          OutpostResolvers: S.optional(__S(617, __c77, 1)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListOutpostResolversResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ MaxResults: S.optional(S.Number), NextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListResolverConfigsRequest" });
    case 1:
      return S.Array(__S(448, __c56, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ResolverConfigs: S.optional(__S(625, __c78, 1)),
        }),
      ).annotate({ identifier: "ListResolverConfigsResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(641, __c80, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResolverDnssecConfigsRequest" });
    case 1:
      return S.Array(__S(472, __c59, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          ResolverDnssecConfigs: S.optional(__S(633, __c79, 1)),
        }),
      ).annotate({ identifier: "ListResolverDnssecConfigsResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.optional(S.String), Values: S.optional(__S(40, __c5, 0)) }),
      ).annotate({ identifier: "Filter" });
    case 1:
      return S.Array(__S(640, __c80, 0));
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResolverEndpointId: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResolverEndpointIpAddressesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          IpId: S.optional(S.String),
          SubnetId: S.optional(S.String),
          Ip: S.optional(S.String),
          Ipv6: S.optional(S.String),
          Status: S.optional(S.String),
          StatusMessage: S.optional(S.String),
          CreationTime: S.optional(S.String),
          ModificationTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "IpAddressResponse" });
    case 2:
      return S.Array(__S(649, __c81, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          IpAddresses: S.optional(__S(650, __c81, 2)),
        }),
      ).annotate({ identifier: "ListResolverEndpointIpAddressesResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(641, __c80, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResolverEndpointsRequest" });
    case 1:
      return S.Array(__S(49, __c6, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          ResolverEndpoints: S.optional(__S(657, __c82, 1)),
        }),
      ).annotate({ identifier: "ListResolverEndpointsResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(641, __c80, 1)),
          SortBy: S.optional(S.String),
          SortOrder: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResolverQueryLogConfigAssociationsRequest" });
    case 1:
      return S.Array(__S(88, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          TotalCount: S.optional(S.Number),
          TotalFilteredCount: S.optional(S.Number),
          ResolverQueryLogConfigAssociations: S.optional(__S(665, __c83, 1)),
        }),
      ).annotate({ identifier: "ListResolverQueryLogConfigAssociationsResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(641, __c80, 1)),
          SortBy: S.optional(S.String),
          SortOrder: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResolverQueryLogConfigsRequest" });
    case 1:
      return S.Array(__S(256, __c32, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          TotalCount: S.optional(S.Number),
          TotalFilteredCount: S.optional(S.Number),
          ResolverQueryLogConfigs: S.optional(__S(673, __c84, 1)),
        }),
      ).annotate({ identifier: "ListResolverQueryLogConfigsResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(641, __c80, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResolverRuleAssociationsRequest" });
    case 1:
      return S.Array(__S(112, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          ResolverRuleAssociations: S.optional(__S(681, __c85, 1)),
        }),
      ).annotate({ identifier: "ListResolverRuleAssociationsResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          Filters: S.optional(__S(641, __c80, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListResolverRulesRequest" });
    case 1:
      return S.Array(__S(274, __c34, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
          ResolverRules: S.optional(__S(689, __c86, 1)),
        }),
      ).annotate({ identifier: "ListResolverRulesResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String,
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Tags: S.optional(__S(9, __c1, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagsForResourceResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, FirewallRuleGroupPolicy: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutFirewallRuleGroupPolicyRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ReturnValue: S.optional(S.Boolean) })).annotate({
        identifier: "PutFirewallRuleGroupPolicyResponse",
      });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, ResolverQueryLogConfigPolicy: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutResolverQueryLogConfigPolicyRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, ResolverRulePolicy: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutResolverRulePolicyRequest" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, Tags: __S(9, __c1, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String, TagKeys: __S(40, __c5, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String, FirewallFailOpen: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateFirewallConfigRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallDomainListId: S.String,
          Operation: S.String,
          Domains: __S(40, __c5, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFirewallDomainsRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallRuleGroupId: S.String,
          FirewallDomainListId: S.optional(S.String),
          FirewallThreatProtectionId: S.optional(S.String),
          Priority: S.optional(S.Number),
          Action: S.optional(S.String),
          BlockResponse: S.optional(S.String),
          BlockOverrideDomain: S.optional(S.String),
          BlockOverrideDnsType: S.optional(S.String),
          BlockOverrideTtl: S.optional(S.Number),
          Name: S.optional(S.String),
          FirewallDomainRedirectionAction: S.optional(S.String),
          Qtype: S.optional(S.String),
          DnsThreatProtection: S.optional(S.String),
          ConfidenceThreshold: S.optional(S.String),
          FirewallRuleType: S.optional(__S(131, __c16, 3)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFirewallRuleRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          FirewallRuleGroupAssociationId: S.String,
          Priority: S.optional(S.Number),
          MutationProtection: S.optional(S.String),
          Name: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateFirewallRuleGroupAssociationRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Id: S.String,
          Name: S.optional(S.String),
          InstanceCount: S.optional(S.Number),
          PreferredInstanceType: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateOutpostResolverRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String, AutodefinedReverseFlag: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateResolverConfigRequest" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceId: S.String, Validation: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateResolverDnssecConfigRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ IpId: S.String, Ipv6: S.String })).annotate({
        identifier: "UpdateIpAddress",
      });
    case 1:
      return S.Array(__S(816, __c102, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          ResolverEndpointId: S.String,
          Name: S.optional(S.String),
          ResolverEndpointType: S.optional(S.String),
          UpdateIpAddresses: S.optional(__S(817, __c102, 1)),
          Protocols: S.optional(__S(48, __c6, 0)),
          RniEnhancedMetricsEnabled: S.optional(S.Boolean),
          TargetNameServerMetricsEnabled: S.optional(S.Boolean),
          Dns64Enabled: S.optional(S.Boolean),
          Ipv6InternetAccessEnabled: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateResolverEndpointRequest" });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.optional(S.String),
          TargetIps: S.optional(__S(273, __c34, 1)),
          ResolverEndpointId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResolverRuleConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResolverRuleId: S.String, Config: __S(824, __c103, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateResolverRuleRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
