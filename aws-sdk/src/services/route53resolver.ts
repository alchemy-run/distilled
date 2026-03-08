import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Route53Resolver",
  serviceShapeName: "Route53Resolver",
});
const auth = T.AwsAuthSigv4({ name: "route53resolver" });
const ver = T.ServiceVersion("2018-04-01");
const proto = T.AwsProtocolsAwsJson1_1();
const rules = T.EndpointResolver((p, _) => {
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
});

//# Newtypes
export type CreatorRequestId = string;
export type ResourceId = string;
export type Priority = number;
export type Name = string;
export type TagKey = string;
export type TagValue = string;
export type Arn = string;
export type ServicePrinciple = string;
export type StatusMessage = string;
export type Rfc3339TimeString = string;
export type ExceptionMessage = string;
export type SubnetId = string;
export type Ip = string;
export type Ipv6 = string;
export type IpAddressCount = number;
export type OutpostArn = string;
export type OutpostInstanceType = string;
export type RniEnhancedMetricsEnabled = boolean;
export type TargetNameServerMetricsEnabled = boolean;
export type ResolverQueryLogConfigAssociationErrorMessage = string;
export type Unsigned = number;
export type BlockOverrideDomain = string;
export type BlockOverrideTtl = number;
export type Qtype = string;
export type AccountId = string;
export type OutpostResolverName = string;
export type InstanceCount = number;
export type OutpostResolverStatusMessage = string;
export type ResolverQueryLogConfigName = string;
export type DestinationArn = string;
export type Count = number;
export type DomainName = string;
export type Port = number;
export type ServerNameIndication = string;
export type DelegationRecord = string;
export type FirewallRuleGroupPolicy = string;
export type ResolverQueryLogConfigPolicy = string;
export type ResolverRulePolicy = string;
export type DomainListFileUrl = string;
export type ListFirewallConfigsMaxResult = number;
export type NextToken = string;
export type MaxResults = number;
export type ListDomainMaxResults = number;
export type FirewallDomainName = string;
export type ListResolverConfigsMaxResult = number;
export type FilterName = string;
export type FilterValue = string;
export type SortByKey = string;

//# Schemas
export type MutationProtectionStatus = "ENABLED" | "DISABLED" | (string & {});
export const MutationProtectionStatus = S.String;
export interface Tag {
  Key: string;
  Value: string;
}
export const Tag = S.suspend(() =>
  S.Struct({ Key: S.String, Value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = S.Array(Tag);
export interface AssociateFirewallRuleGroupRequest {
  CreatorRequestId: string;
  FirewallRuleGroupId: string;
  VpcId: string;
  Priority: number;
  Name: string;
  MutationProtection?: MutationProtectionStatus;
  Tags?: Tag[];
}
export const AssociateFirewallRuleGroupRequest = S.suspend(() =>
  S.Struct({
    CreatorRequestId: S.String.pipe(T.IdempotencyToken()),
    FirewallRuleGroupId: S.String,
    VpcId: S.String,
    Priority: S.Number,
    Name: S.String,
    MutationProtection: S.optional(MutationProtectionStatus),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateFirewallRuleGroupRequest",
}) as any as S.Schema<AssociateFirewallRuleGroupRequest>;
export type FirewallRuleGroupAssociationStatus =
  | "COMPLETE"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export const FirewallRuleGroupAssociationStatus = S.String;
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
export const FirewallRuleGroupAssociation = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    FirewallRuleGroupId: S.optional(S.String),
    VpcId: S.optional(S.String),
    Name: S.optional(S.String),
    Priority: S.optional(S.Number),
    MutationProtection: S.optional(MutationProtectionStatus),
    ManagedOwnerName: S.optional(S.String),
    Status: S.optional(FirewallRuleGroupAssociationStatus),
    StatusMessage: S.optional(S.String),
    CreatorRequestId: S.optional(S.String),
    CreationTime: S.optional(S.String),
    ModificationTime: S.optional(S.String),
  }),
).annotate({
  identifier: "FirewallRuleGroupAssociation",
}) as any as S.Schema<FirewallRuleGroupAssociation>;
export interface AssociateFirewallRuleGroupResponse {
  FirewallRuleGroupAssociation?: FirewallRuleGroupAssociation;
}
export const AssociateFirewallRuleGroupResponse = S.suspend(() =>
  S.Struct({
    FirewallRuleGroupAssociation: S.optional(FirewallRuleGroupAssociation),
  }),
).annotate({
  identifier: "AssociateFirewallRuleGroupResponse",
}) as any as S.Schema<AssociateFirewallRuleGroupResponse>;
export interface IpAddressUpdate {
  IpId?: string;
  SubnetId?: string;
  Ip?: string;
  Ipv6?: string;
}
export const IpAddressUpdate = S.suspend(() =>
  S.Struct({
    IpId: S.optional(S.String),
    SubnetId: S.optional(S.String),
    Ip: S.optional(S.String),
    Ipv6: S.optional(S.String),
  }),
).annotate({
  identifier: "IpAddressUpdate",
}) as any as S.Schema<IpAddressUpdate>;
export interface AssociateResolverEndpointIpAddressRequest {
  ResolverEndpointId: string;
  IpAddress: IpAddressUpdate;
}
export const AssociateResolverEndpointIpAddressRequest = S.suspend(() =>
  S.Struct({ ResolverEndpointId: S.String, IpAddress: IpAddressUpdate }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateResolverEndpointIpAddressRequest",
}) as any as S.Schema<AssociateResolverEndpointIpAddressRequest>;
export type SecurityGroupIds = string[];
export const SecurityGroupIds = S.Array(S.String);
export type ResolverEndpointDirection =
  | "INBOUND"
  | "OUTBOUND"
  | "INBOUND_DELEGATION"
  | (string & {});
export const ResolverEndpointDirection = S.String;
export type ResolverEndpointStatus =
  | "CREATING"
  | "OPERATIONAL"
  | "UPDATING"
  | "AUTO_RECOVERING"
  | "ACTION_NEEDED"
  | "DELETING"
  | (string & {});
export const ResolverEndpointStatus = S.String;
export type ResolverEndpointType =
  | "IPV6"
  | "IPV4"
  | "DUALSTACK"
  | (string & {});
export const ResolverEndpointType = S.String;
export type Protocol = "DoH" | "Do53" | "DoH-FIPS" | (string & {});
export const Protocol = S.String;
export type ProtocolList = Protocol[];
export const ProtocolList = S.Array(Protocol);
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
}
export const ResolverEndpoint = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    CreatorRequestId: S.optional(S.String),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    SecurityGroupIds: S.optional(SecurityGroupIds),
    Direction: S.optional(ResolverEndpointDirection),
    IpAddressCount: S.optional(S.Number),
    HostVPCId: S.optional(S.String),
    Status: S.optional(ResolverEndpointStatus),
    StatusMessage: S.optional(S.String),
    CreationTime: S.optional(S.String),
    ModificationTime: S.optional(S.String),
    OutpostArn: S.optional(S.String),
    PreferredInstanceType: S.optional(S.String),
    ResolverEndpointType: S.optional(ResolverEndpointType),
    Protocols: S.optional(ProtocolList),
    RniEnhancedMetricsEnabled: S.optional(S.Boolean),
    TargetNameServerMetricsEnabled: S.optional(S.Boolean),
  }),
).annotate({
  identifier: "ResolverEndpoint",
}) as any as S.Schema<ResolverEndpoint>;
export interface AssociateResolverEndpointIpAddressResponse {
  ResolverEndpoint?: ResolverEndpoint;
}
export const AssociateResolverEndpointIpAddressResponse = S.suspend(() =>
  S.Struct({ ResolverEndpoint: S.optional(ResolverEndpoint) }),
).annotate({
  identifier: "AssociateResolverEndpointIpAddressResponse",
}) as any as S.Schema<AssociateResolverEndpointIpAddressResponse>;
export interface AssociateResolverQueryLogConfigRequest {
  ResolverQueryLogConfigId: string;
  ResourceId: string;
}
export const AssociateResolverQueryLogConfigRequest = S.suspend(() =>
  S.Struct({ ResolverQueryLogConfigId: S.String, ResourceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateResolverQueryLogConfigRequest",
}) as any as S.Schema<AssociateResolverQueryLogConfigRequest>;
export type ResolverQueryLogConfigAssociationStatus =
  | "CREATING"
  | "ACTIVE"
  | "ACTION_NEEDED"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const ResolverQueryLogConfigAssociationStatus = S.String;
export type ResolverQueryLogConfigAssociationError =
  | "NONE"
  | "DESTINATION_NOT_FOUND"
  | "ACCESS_DENIED"
  | "INTERNAL_SERVICE_ERROR"
  | (string & {});
export const ResolverQueryLogConfigAssociationError = S.String;
export interface ResolverQueryLogConfigAssociation {
  Id?: string;
  ResolverQueryLogConfigId?: string;
  ResourceId?: string;
  Status?: ResolverQueryLogConfigAssociationStatus;
  Error?: ResolverQueryLogConfigAssociationError;
  ErrorMessage?: string;
  CreationTime?: string;
}
export const ResolverQueryLogConfigAssociation = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ResolverQueryLogConfigId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    Status: S.optional(ResolverQueryLogConfigAssociationStatus),
    Error: S.optional(ResolverQueryLogConfigAssociationError),
    ErrorMessage: S.optional(S.String),
    CreationTime: S.optional(S.String),
  }),
).annotate({
  identifier: "ResolverQueryLogConfigAssociation",
}) as any as S.Schema<ResolverQueryLogConfigAssociation>;
export interface AssociateResolverQueryLogConfigResponse {
  ResolverQueryLogConfigAssociation?: ResolverQueryLogConfigAssociation;
}
export const AssociateResolverQueryLogConfigResponse = S.suspend(() =>
  S.Struct({
    ResolverQueryLogConfigAssociation: S.optional(
      ResolverQueryLogConfigAssociation,
    ),
  }),
).annotate({
  identifier: "AssociateResolverQueryLogConfigResponse",
}) as any as S.Schema<AssociateResolverQueryLogConfigResponse>;
export interface AssociateResolverRuleRequest {
  ResolverRuleId: string;
  Name?: string;
  VPCId: string;
}
export const AssociateResolverRuleRequest = S.suspend(() =>
  S.Struct({
    ResolverRuleId: S.String,
    Name: S.optional(S.String),
    VPCId: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "AssociateResolverRuleRequest",
}) as any as S.Schema<AssociateResolverRuleRequest>;
export type ResolverRuleAssociationStatus =
  | "CREATING"
  | "COMPLETE"
  | "DELETING"
  | "FAILED"
  | "OVERRIDDEN"
  | (string & {});
export const ResolverRuleAssociationStatus = S.String;
export interface ResolverRuleAssociation {
  Id?: string;
  ResolverRuleId?: string;
  Name?: string;
  VPCId?: string;
  Status?: ResolverRuleAssociationStatus;
  StatusMessage?: string;
}
export const ResolverRuleAssociation = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ResolverRuleId: S.optional(S.String),
    Name: S.optional(S.String),
    VPCId: S.optional(S.String),
    Status: S.optional(ResolverRuleAssociationStatus),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ResolverRuleAssociation",
}) as any as S.Schema<ResolverRuleAssociation>;
export interface AssociateResolverRuleResponse {
  ResolverRuleAssociation?: ResolverRuleAssociation;
}
export const AssociateResolverRuleResponse = S.suspend(() =>
  S.Struct({ ResolverRuleAssociation: S.optional(ResolverRuleAssociation) }),
).annotate({
  identifier: "AssociateResolverRuleResponse",
}) as any as S.Schema<AssociateResolverRuleResponse>;
export interface CreateFirewallDomainListRequest {
  CreatorRequestId: string;
  Name: string;
  Tags?: Tag[];
}
export const CreateFirewallDomainListRequest = S.suspend(() =>
  S.Struct({
    CreatorRequestId: S.String.pipe(T.IdempotencyToken()),
    Name: S.String,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateFirewallDomainListRequest",
}) as any as S.Schema<CreateFirewallDomainListRequest>;
export type FirewallDomainListStatus =
  | "COMPLETE"
  | "COMPLETE_IMPORT_FAILED"
  | "IMPORTING"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export const FirewallDomainListStatus = S.String;
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
}
export const FirewallDomainList = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    DomainCount: S.optional(S.Number),
    Status: S.optional(FirewallDomainListStatus),
    StatusMessage: S.optional(S.String),
    ManagedOwnerName: S.optional(S.String),
    CreatorRequestId: S.optional(S.String),
    CreationTime: S.optional(S.String),
    ModificationTime: S.optional(S.String),
  }),
).annotate({
  identifier: "FirewallDomainList",
}) as any as S.Schema<FirewallDomainList>;
export interface CreateFirewallDomainListResponse {
  FirewallDomainList?: FirewallDomainList;
}
export const CreateFirewallDomainListResponse = S.suspend(() =>
  S.Struct({ FirewallDomainList: S.optional(FirewallDomainList) }),
).annotate({
  identifier: "CreateFirewallDomainListResponse",
}) as any as S.Schema<CreateFirewallDomainListResponse>;
export type Action = "ALLOW" | "BLOCK" | "ALERT" | (string & {});
export const Action = S.String;
export type BlockResponse = "NODATA" | "NXDOMAIN" | "OVERRIDE" | (string & {});
export const BlockResponse = S.String;
export type BlockOverrideDnsType = "CNAME" | (string & {});
export const BlockOverrideDnsType = S.String;
export type FirewallDomainRedirectionAction =
  | "INSPECT_REDIRECTION_DOMAIN"
  | "TRUST_REDIRECTION_DOMAIN"
  | (string & {});
export const FirewallDomainRedirectionAction = S.String;
export type DnsThreatProtection =
  | "DGA"
  | "DNS_TUNNELING"
  | "DICTIONARY_DGA"
  | (string & {});
export const DnsThreatProtection = S.String;
export type ConfidenceThreshold = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export const ConfidenceThreshold = S.String;
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
}
export const CreateFirewallRuleRequest = S.suspend(() =>
  S.Struct({
    CreatorRequestId: S.String.pipe(T.IdempotencyToken()),
    FirewallRuleGroupId: S.String,
    FirewallDomainListId: S.optional(S.String),
    Priority: S.Number,
    Action: Action,
    BlockResponse: S.optional(BlockResponse),
    BlockOverrideDomain: S.optional(S.String),
    BlockOverrideDnsType: S.optional(BlockOverrideDnsType),
    BlockOverrideTtl: S.optional(S.Number),
    Name: S.String,
    FirewallDomainRedirectionAction: S.optional(
      FirewallDomainRedirectionAction,
    ),
    Qtype: S.optional(S.String),
    DnsThreatProtection: S.optional(DnsThreatProtection),
    ConfidenceThreshold: S.optional(ConfidenceThreshold),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateFirewallRuleRequest",
}) as any as S.Schema<CreateFirewallRuleRequest>;
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
}
export const FirewallRule = S.suspend(() =>
  S.Struct({
    FirewallRuleGroupId: S.optional(S.String),
    FirewallDomainListId: S.optional(S.String),
    FirewallThreatProtectionId: S.optional(S.String),
    Name: S.optional(S.String),
    Priority: S.optional(S.Number),
    Action: S.optional(Action),
    BlockResponse: S.optional(BlockResponse),
    BlockOverrideDomain: S.optional(S.String),
    BlockOverrideDnsType: S.optional(BlockOverrideDnsType),
    BlockOverrideTtl: S.optional(S.Number),
    CreatorRequestId: S.optional(S.String),
    CreationTime: S.optional(S.String),
    ModificationTime: S.optional(S.String),
    FirewallDomainRedirectionAction: S.optional(
      FirewallDomainRedirectionAction,
    ),
    Qtype: S.optional(S.String),
    DnsThreatProtection: S.optional(DnsThreatProtection),
    ConfidenceThreshold: S.optional(ConfidenceThreshold),
  }),
).annotate({ identifier: "FirewallRule" }) as any as S.Schema<FirewallRule>;
export interface CreateFirewallRuleResponse {
  FirewallRule?: FirewallRule;
}
export const CreateFirewallRuleResponse = S.suspend(() =>
  S.Struct({ FirewallRule: S.optional(FirewallRule) }),
).annotate({
  identifier: "CreateFirewallRuleResponse",
}) as any as S.Schema<CreateFirewallRuleResponse>;
export interface CreateFirewallRuleGroupRequest {
  CreatorRequestId: string;
  Name: string;
  Tags?: Tag[];
}
export const CreateFirewallRuleGroupRequest = S.suspend(() =>
  S.Struct({
    CreatorRequestId: S.String.pipe(T.IdempotencyToken()),
    Name: S.String,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateFirewallRuleGroupRequest",
}) as any as S.Schema<CreateFirewallRuleGroupRequest>;
export type FirewallRuleGroupStatus =
  | "COMPLETE"
  | "DELETING"
  | "UPDATING"
  | (string & {});
export const FirewallRuleGroupStatus = S.String;
export type ShareStatus =
  | "NOT_SHARED"
  | "SHARED_WITH_ME"
  | "SHARED_BY_ME"
  | (string & {});
export const ShareStatus = S.String;
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
export const FirewallRuleGroup = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    RuleCount: S.optional(S.Number),
    Status: S.optional(FirewallRuleGroupStatus),
    StatusMessage: S.optional(S.String),
    OwnerId: S.optional(S.String),
    CreatorRequestId: S.optional(S.String),
    ShareStatus: S.optional(ShareStatus),
    CreationTime: S.optional(S.String),
    ModificationTime: S.optional(S.String),
  }),
).annotate({
  identifier: "FirewallRuleGroup",
}) as any as S.Schema<FirewallRuleGroup>;
export interface CreateFirewallRuleGroupResponse {
  FirewallRuleGroup?: FirewallRuleGroup;
}
export const CreateFirewallRuleGroupResponse = S.suspend(() =>
  S.Struct({ FirewallRuleGroup: S.optional(FirewallRuleGroup) }),
).annotate({
  identifier: "CreateFirewallRuleGroupResponse",
}) as any as S.Schema<CreateFirewallRuleGroupResponse>;
export interface CreateOutpostResolverRequest {
  CreatorRequestId: string;
  Name: string;
  InstanceCount?: number;
  PreferredInstanceType: string;
  OutpostArn: string;
  Tags?: Tag[];
}
export const CreateOutpostResolverRequest = S.suspend(() =>
  S.Struct({
    CreatorRequestId: S.String,
    Name: S.String,
    InstanceCount: S.optional(S.Number),
    PreferredInstanceType: S.String,
    OutpostArn: S.String,
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateOutpostResolverRequest",
}) as any as S.Schema<CreateOutpostResolverRequest>;
export type OutpostResolverStatus =
  | "CREATING"
  | "OPERATIONAL"
  | "UPDATING"
  | "DELETING"
  | "ACTION_NEEDED"
  | "FAILED_CREATION"
  | "FAILED_DELETION"
  | (string & {});
export const OutpostResolverStatus = S.String;
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
export const OutpostResolver = S.suspend(() =>
  S.Struct({
    Arn: S.optional(S.String),
    CreationTime: S.optional(S.String),
    ModificationTime: S.optional(S.String),
    CreatorRequestId: S.optional(S.String),
    Id: S.optional(S.String),
    InstanceCount: S.optional(S.Number),
    PreferredInstanceType: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(OutpostResolverStatus),
    StatusMessage: S.optional(S.String),
    OutpostArn: S.optional(S.String),
  }),
).annotate({
  identifier: "OutpostResolver",
}) as any as S.Schema<OutpostResolver>;
export interface CreateOutpostResolverResponse {
  OutpostResolver?: OutpostResolver;
}
export const CreateOutpostResolverResponse = S.suspend(() =>
  S.Struct({ OutpostResolver: S.optional(OutpostResolver) }),
).annotate({
  identifier: "CreateOutpostResolverResponse",
}) as any as S.Schema<CreateOutpostResolverResponse>;
export interface IpAddressRequest {
  SubnetId: string;
  Ip?: string;
  Ipv6?: string;
}
export const IpAddressRequest = S.suspend(() =>
  S.Struct({
    SubnetId: S.String,
    Ip: S.optional(S.String),
    Ipv6: S.optional(S.String),
  }),
).annotate({
  identifier: "IpAddressRequest",
}) as any as S.Schema<IpAddressRequest>;
export type IpAddressesRequest = IpAddressRequest[];
export const IpAddressesRequest = S.Array(IpAddressRequest);
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
}
export const CreateResolverEndpointRequest = S.suspend(() =>
  S.Struct({
    CreatorRequestId: S.String,
    Name: S.optional(S.String),
    SecurityGroupIds: SecurityGroupIds,
    Direction: ResolverEndpointDirection,
    IpAddresses: IpAddressesRequest,
    OutpostArn: S.optional(S.String),
    PreferredInstanceType: S.optional(S.String),
    Tags: S.optional(TagList),
    ResolverEndpointType: S.optional(ResolverEndpointType),
    Protocols: S.optional(ProtocolList),
    RniEnhancedMetricsEnabled: S.optional(S.Boolean),
    TargetNameServerMetricsEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateResolverEndpointRequest",
}) as any as S.Schema<CreateResolverEndpointRequest>;
export interface CreateResolverEndpointResponse {
  ResolverEndpoint?: ResolverEndpoint;
}
export const CreateResolverEndpointResponse = S.suspend(() =>
  S.Struct({ ResolverEndpoint: S.optional(ResolverEndpoint) }),
).annotate({
  identifier: "CreateResolverEndpointResponse",
}) as any as S.Schema<CreateResolverEndpointResponse>;
export interface CreateResolverQueryLogConfigRequest {
  Name: string;
  DestinationArn: string;
  CreatorRequestId: string;
  Tags?: Tag[];
}
export const CreateResolverQueryLogConfigRequest = S.suspend(() =>
  S.Struct({
    Name: S.String,
    DestinationArn: S.String,
    CreatorRequestId: S.String.pipe(T.IdempotencyToken()),
    Tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateResolverQueryLogConfigRequest",
}) as any as S.Schema<CreateResolverQueryLogConfigRequest>;
export type ResolverQueryLogConfigStatus =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | "FAILED"
  | (string & {});
export const ResolverQueryLogConfigStatus = S.String;
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
export const ResolverQueryLogConfig = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    OwnerId: S.optional(S.String),
    Status: S.optional(ResolverQueryLogConfigStatus),
    ShareStatus: S.optional(ShareStatus),
    AssociationCount: S.optional(S.Number),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    DestinationArn: S.optional(S.String),
    CreatorRequestId: S.optional(S.String),
    CreationTime: S.optional(S.String),
  }),
).annotate({
  identifier: "ResolverQueryLogConfig",
}) as any as S.Schema<ResolverQueryLogConfig>;
export interface CreateResolverQueryLogConfigResponse {
  ResolverQueryLogConfig?: ResolverQueryLogConfig;
}
export const CreateResolverQueryLogConfigResponse = S.suspend(() =>
  S.Struct({ ResolverQueryLogConfig: S.optional(ResolverQueryLogConfig) }),
).annotate({
  identifier: "CreateResolverQueryLogConfigResponse",
}) as any as S.Schema<CreateResolverQueryLogConfigResponse>;
export type RuleTypeOption =
  | "FORWARD"
  | "SYSTEM"
  | "RECURSIVE"
  | "DELEGATE"
  | (string & {});
export const RuleTypeOption = S.String;
export interface TargetAddress {
  Ip?: string;
  Port?: number;
  Ipv6?: string;
  Protocol?: Protocol;
  ServerNameIndication?: string;
}
export const TargetAddress = S.suspend(() =>
  S.Struct({
    Ip: S.optional(S.String),
    Port: S.optional(S.Number),
    Ipv6: S.optional(S.String),
    Protocol: S.optional(Protocol),
    ServerNameIndication: S.optional(S.String),
  }),
).annotate({ identifier: "TargetAddress" }) as any as S.Schema<TargetAddress>;
export type TargetList = TargetAddress[];
export const TargetList = S.Array(TargetAddress);
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
export const CreateResolverRuleRequest = S.suspend(() =>
  S.Struct({
    CreatorRequestId: S.String,
    Name: S.optional(S.String),
    RuleType: RuleTypeOption,
    DomainName: S.optional(S.String),
    TargetIps: S.optional(TargetList),
    ResolverEndpointId: S.optional(S.String),
    Tags: S.optional(TagList),
    DelegationRecord: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "CreateResolverRuleRequest",
}) as any as S.Schema<CreateResolverRuleRequest>;
export type ResolverRuleStatus =
  | "COMPLETE"
  | "DELETING"
  | "UPDATING"
  | "FAILED"
  | (string & {});
export const ResolverRuleStatus = S.String;
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
export const ResolverRule = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    CreatorRequestId: S.optional(S.String),
    Arn: S.optional(S.String),
    DomainName: S.optional(S.String),
    Status: S.optional(ResolverRuleStatus),
    StatusMessage: S.optional(S.String),
    RuleType: S.optional(RuleTypeOption),
    Name: S.optional(S.String),
    TargetIps: S.optional(TargetList),
    ResolverEndpointId: S.optional(S.String),
    OwnerId: S.optional(S.String),
    ShareStatus: S.optional(ShareStatus),
    CreationTime: S.optional(S.String),
    ModificationTime: S.optional(S.String),
    DelegationRecord: S.optional(S.String),
  }),
).annotate({ identifier: "ResolverRule" }) as any as S.Schema<ResolverRule>;
export interface CreateResolverRuleResponse {
  ResolverRule?: ResolverRule;
}
export const CreateResolverRuleResponse = S.suspend(() =>
  S.Struct({ ResolverRule: S.optional(ResolverRule) }),
).annotate({
  identifier: "CreateResolverRuleResponse",
}) as any as S.Schema<CreateResolverRuleResponse>;
export interface DeleteFirewallDomainListRequest {
  FirewallDomainListId: string;
}
export const DeleteFirewallDomainListRequest = S.suspend(() =>
  S.Struct({ FirewallDomainListId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteFirewallDomainListRequest",
}) as any as S.Schema<DeleteFirewallDomainListRequest>;
export interface DeleteFirewallDomainListResponse {
  FirewallDomainList?: FirewallDomainList;
}
export const DeleteFirewallDomainListResponse = S.suspend(() =>
  S.Struct({ FirewallDomainList: S.optional(FirewallDomainList) }),
).annotate({
  identifier: "DeleteFirewallDomainListResponse",
}) as any as S.Schema<DeleteFirewallDomainListResponse>;
export interface DeleteFirewallRuleRequest {
  FirewallRuleGroupId: string;
  FirewallDomainListId?: string;
  FirewallThreatProtectionId?: string;
  Qtype?: string;
}
export const DeleteFirewallRuleRequest = S.suspend(() =>
  S.Struct({
    FirewallRuleGroupId: S.String,
    FirewallDomainListId: S.optional(S.String),
    FirewallThreatProtectionId: S.optional(S.String),
    Qtype: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteFirewallRuleRequest",
}) as any as S.Schema<DeleteFirewallRuleRequest>;
export interface DeleteFirewallRuleResponse {
  FirewallRule?: FirewallRule;
}
export const DeleteFirewallRuleResponse = S.suspend(() =>
  S.Struct({ FirewallRule: S.optional(FirewallRule) }),
).annotate({
  identifier: "DeleteFirewallRuleResponse",
}) as any as S.Schema<DeleteFirewallRuleResponse>;
export interface DeleteFirewallRuleGroupRequest {
  FirewallRuleGroupId: string;
}
export const DeleteFirewallRuleGroupRequest = S.suspend(() =>
  S.Struct({ FirewallRuleGroupId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteFirewallRuleGroupRequest",
}) as any as S.Schema<DeleteFirewallRuleGroupRequest>;
export interface DeleteFirewallRuleGroupResponse {
  FirewallRuleGroup?: FirewallRuleGroup;
}
export const DeleteFirewallRuleGroupResponse = S.suspend(() =>
  S.Struct({ FirewallRuleGroup: S.optional(FirewallRuleGroup) }),
).annotate({
  identifier: "DeleteFirewallRuleGroupResponse",
}) as any as S.Schema<DeleteFirewallRuleGroupResponse>;
export interface DeleteOutpostResolverRequest {
  Id: string;
}
export const DeleteOutpostResolverRequest = S.suspend(() =>
  S.Struct({ Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteOutpostResolverRequest",
}) as any as S.Schema<DeleteOutpostResolverRequest>;
export interface DeleteOutpostResolverResponse {
  OutpostResolver?: OutpostResolver;
}
export const DeleteOutpostResolverResponse = S.suspend(() =>
  S.Struct({ OutpostResolver: S.optional(OutpostResolver) }),
).annotate({
  identifier: "DeleteOutpostResolverResponse",
}) as any as S.Schema<DeleteOutpostResolverResponse>;
export interface DeleteResolverEndpointRequest {
  ResolverEndpointId: string;
}
export const DeleteResolverEndpointRequest = S.suspend(() =>
  S.Struct({ ResolverEndpointId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteResolverEndpointRequest",
}) as any as S.Schema<DeleteResolverEndpointRequest>;
export interface DeleteResolverEndpointResponse {
  ResolverEndpoint?: ResolverEndpoint;
}
export const DeleteResolverEndpointResponse = S.suspend(() =>
  S.Struct({ ResolverEndpoint: S.optional(ResolverEndpoint) }),
).annotate({
  identifier: "DeleteResolverEndpointResponse",
}) as any as S.Schema<DeleteResolverEndpointResponse>;
export interface DeleteResolverQueryLogConfigRequest {
  ResolverQueryLogConfigId: string;
}
export const DeleteResolverQueryLogConfigRequest = S.suspend(() =>
  S.Struct({ ResolverQueryLogConfigId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteResolverQueryLogConfigRequest",
}) as any as S.Schema<DeleteResolverQueryLogConfigRequest>;
export interface DeleteResolverQueryLogConfigResponse {
  ResolverQueryLogConfig?: ResolverQueryLogConfig;
}
export const DeleteResolverQueryLogConfigResponse = S.suspend(() =>
  S.Struct({ ResolverQueryLogConfig: S.optional(ResolverQueryLogConfig) }),
).annotate({
  identifier: "DeleteResolverQueryLogConfigResponse",
}) as any as S.Schema<DeleteResolverQueryLogConfigResponse>;
export interface DeleteResolverRuleRequest {
  ResolverRuleId: string;
}
export const DeleteResolverRuleRequest = S.suspend(() =>
  S.Struct({ ResolverRuleId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DeleteResolverRuleRequest",
}) as any as S.Schema<DeleteResolverRuleRequest>;
export interface DeleteResolverRuleResponse {
  ResolverRule?: ResolverRule;
}
export const DeleteResolverRuleResponse = S.suspend(() =>
  S.Struct({ ResolverRule: S.optional(ResolverRule) }),
).annotate({
  identifier: "DeleteResolverRuleResponse",
}) as any as S.Schema<DeleteResolverRuleResponse>;
export interface DisassociateFirewallRuleGroupRequest {
  FirewallRuleGroupAssociationId: string;
}
export const DisassociateFirewallRuleGroupRequest = S.suspend(() =>
  S.Struct({ FirewallRuleGroupAssociationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateFirewallRuleGroupRequest",
}) as any as S.Schema<DisassociateFirewallRuleGroupRequest>;
export interface DisassociateFirewallRuleGroupResponse {
  FirewallRuleGroupAssociation?: FirewallRuleGroupAssociation;
}
export const DisassociateFirewallRuleGroupResponse = S.suspend(() =>
  S.Struct({
    FirewallRuleGroupAssociation: S.optional(FirewallRuleGroupAssociation),
  }),
).annotate({
  identifier: "DisassociateFirewallRuleGroupResponse",
}) as any as S.Schema<DisassociateFirewallRuleGroupResponse>;
export interface DisassociateResolverEndpointIpAddressRequest {
  ResolverEndpointId: string;
  IpAddress: IpAddressUpdate;
}
export const DisassociateResolverEndpointIpAddressRequest = S.suspend(() =>
  S.Struct({ ResolverEndpointId: S.String, IpAddress: IpAddressUpdate }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateResolverEndpointIpAddressRequest",
}) as any as S.Schema<DisassociateResolverEndpointIpAddressRequest>;
export interface DisassociateResolverEndpointIpAddressResponse {
  ResolverEndpoint?: ResolverEndpoint;
}
export const DisassociateResolverEndpointIpAddressResponse = S.suspend(() =>
  S.Struct({ ResolverEndpoint: S.optional(ResolverEndpoint) }),
).annotate({
  identifier: "DisassociateResolverEndpointIpAddressResponse",
}) as any as S.Schema<DisassociateResolverEndpointIpAddressResponse>;
export interface DisassociateResolverQueryLogConfigRequest {
  ResolverQueryLogConfigId: string;
  ResourceId: string;
}
export const DisassociateResolverQueryLogConfigRequest = S.suspend(() =>
  S.Struct({ ResolverQueryLogConfigId: S.String, ResourceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateResolverQueryLogConfigRequest",
}) as any as S.Schema<DisassociateResolverQueryLogConfigRequest>;
export interface DisassociateResolverQueryLogConfigResponse {
  ResolverQueryLogConfigAssociation?: ResolverQueryLogConfigAssociation;
}
export const DisassociateResolverQueryLogConfigResponse = S.suspend(() =>
  S.Struct({
    ResolverQueryLogConfigAssociation: S.optional(
      ResolverQueryLogConfigAssociation,
    ),
  }),
).annotate({
  identifier: "DisassociateResolverQueryLogConfigResponse",
}) as any as S.Schema<DisassociateResolverQueryLogConfigResponse>;
export interface DisassociateResolverRuleRequest {
  VPCId: string;
  ResolverRuleId: string;
}
export const DisassociateResolverRuleRequest = S.suspend(() =>
  S.Struct({ VPCId: S.String, ResolverRuleId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "DisassociateResolverRuleRequest",
}) as any as S.Schema<DisassociateResolverRuleRequest>;
export interface DisassociateResolverRuleResponse {
  ResolverRuleAssociation?: ResolverRuleAssociation;
}
export const DisassociateResolverRuleResponse = S.suspend(() =>
  S.Struct({ ResolverRuleAssociation: S.optional(ResolverRuleAssociation) }),
).annotate({
  identifier: "DisassociateResolverRuleResponse",
}) as any as S.Schema<DisassociateResolverRuleResponse>;
export interface GetFirewallConfigRequest {
  ResourceId: string;
}
export const GetFirewallConfigRequest = S.suspend(() =>
  S.Struct({ ResourceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetFirewallConfigRequest",
}) as any as S.Schema<GetFirewallConfigRequest>;
export type FirewallFailOpenStatus =
  | "ENABLED"
  | "DISABLED"
  | "USE_LOCAL_RESOURCE_SETTING"
  | (string & {});
export const FirewallFailOpenStatus = S.String;
export interface FirewallConfig {
  Id?: string;
  ResourceId?: string;
  OwnerId?: string;
  FirewallFailOpen?: FirewallFailOpenStatus;
}
export const FirewallConfig = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ResourceId: S.optional(S.String),
    OwnerId: S.optional(S.String),
    FirewallFailOpen: S.optional(FirewallFailOpenStatus),
  }),
).annotate({ identifier: "FirewallConfig" }) as any as S.Schema<FirewallConfig>;
export interface GetFirewallConfigResponse {
  FirewallConfig?: FirewallConfig;
}
export const GetFirewallConfigResponse = S.suspend(() =>
  S.Struct({ FirewallConfig: S.optional(FirewallConfig) }),
).annotate({
  identifier: "GetFirewallConfigResponse",
}) as any as S.Schema<GetFirewallConfigResponse>;
export interface GetFirewallDomainListRequest {
  FirewallDomainListId: string;
}
export const GetFirewallDomainListRequest = S.suspend(() =>
  S.Struct({ FirewallDomainListId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetFirewallDomainListRequest",
}) as any as S.Schema<GetFirewallDomainListRequest>;
export interface GetFirewallDomainListResponse {
  FirewallDomainList?: FirewallDomainList;
}
export const GetFirewallDomainListResponse = S.suspend(() =>
  S.Struct({ FirewallDomainList: S.optional(FirewallDomainList) }),
).annotate({
  identifier: "GetFirewallDomainListResponse",
}) as any as S.Schema<GetFirewallDomainListResponse>;
export interface GetFirewallRuleGroupRequest {
  FirewallRuleGroupId: string;
}
export const GetFirewallRuleGroupRequest = S.suspend(() =>
  S.Struct({ FirewallRuleGroupId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetFirewallRuleGroupRequest",
}) as any as S.Schema<GetFirewallRuleGroupRequest>;
export interface GetFirewallRuleGroupResponse {
  FirewallRuleGroup?: FirewallRuleGroup;
}
export const GetFirewallRuleGroupResponse = S.suspend(() =>
  S.Struct({ FirewallRuleGroup: S.optional(FirewallRuleGroup) }),
).annotate({
  identifier: "GetFirewallRuleGroupResponse",
}) as any as S.Schema<GetFirewallRuleGroupResponse>;
export interface GetFirewallRuleGroupAssociationRequest {
  FirewallRuleGroupAssociationId: string;
}
export const GetFirewallRuleGroupAssociationRequest = S.suspend(() =>
  S.Struct({ FirewallRuleGroupAssociationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetFirewallRuleGroupAssociationRequest",
}) as any as S.Schema<GetFirewallRuleGroupAssociationRequest>;
export interface GetFirewallRuleGroupAssociationResponse {
  FirewallRuleGroupAssociation?: FirewallRuleGroupAssociation;
}
export const GetFirewallRuleGroupAssociationResponse = S.suspend(() =>
  S.Struct({
    FirewallRuleGroupAssociation: S.optional(FirewallRuleGroupAssociation),
  }),
).annotate({
  identifier: "GetFirewallRuleGroupAssociationResponse",
}) as any as S.Schema<GetFirewallRuleGroupAssociationResponse>;
export interface GetFirewallRuleGroupPolicyRequest {
  Arn: string;
}
export const GetFirewallRuleGroupPolicyRequest = S.suspend(() =>
  S.Struct({ Arn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetFirewallRuleGroupPolicyRequest",
}) as any as S.Schema<GetFirewallRuleGroupPolicyRequest>;
export interface GetFirewallRuleGroupPolicyResponse {
  FirewallRuleGroupPolicy?: string;
}
export const GetFirewallRuleGroupPolicyResponse = S.suspend(() =>
  S.Struct({ FirewallRuleGroupPolicy: S.optional(S.String) }),
).annotate({
  identifier: "GetFirewallRuleGroupPolicyResponse",
}) as any as S.Schema<GetFirewallRuleGroupPolicyResponse>;
export interface GetOutpostResolverRequest {
  Id: string;
}
export const GetOutpostResolverRequest = S.suspend(() =>
  S.Struct({ Id: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetOutpostResolverRequest",
}) as any as S.Schema<GetOutpostResolverRequest>;
export interface GetOutpostResolverResponse {
  OutpostResolver?: OutpostResolver;
}
export const GetOutpostResolverResponse = S.suspend(() =>
  S.Struct({ OutpostResolver: S.optional(OutpostResolver) }),
).annotate({
  identifier: "GetOutpostResolverResponse",
}) as any as S.Schema<GetOutpostResolverResponse>;
export interface GetResolverConfigRequest {
  ResourceId: string;
}
export const GetResolverConfigRequest = S.suspend(() =>
  S.Struct({ ResourceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResolverConfigRequest",
}) as any as S.Schema<GetResolverConfigRequest>;
export type ResolverAutodefinedReverseStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "DISABLED"
  | "UPDATING_TO_USE_LOCAL_RESOURCE_SETTING"
  | "USE_LOCAL_RESOURCE_SETTING"
  | (string & {});
export const ResolverAutodefinedReverseStatus = S.String;
export interface ResolverConfig {
  Id?: string;
  ResourceId?: string;
  OwnerId?: string;
  AutodefinedReverse?: ResolverAutodefinedReverseStatus;
}
export const ResolverConfig = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    ResourceId: S.optional(S.String),
    OwnerId: S.optional(S.String),
    AutodefinedReverse: S.optional(ResolverAutodefinedReverseStatus),
  }),
).annotate({ identifier: "ResolverConfig" }) as any as S.Schema<ResolverConfig>;
export interface GetResolverConfigResponse {
  ResolverConfig?: ResolverConfig;
}
export const GetResolverConfigResponse = S.suspend(() =>
  S.Struct({ ResolverConfig: S.optional(ResolverConfig) }),
).annotate({
  identifier: "GetResolverConfigResponse",
}) as any as S.Schema<GetResolverConfigResponse>;
export interface GetResolverDnssecConfigRequest {
  ResourceId: string;
}
export const GetResolverDnssecConfigRequest = S.suspend(() =>
  S.Struct({ ResourceId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResolverDnssecConfigRequest",
}) as any as S.Schema<GetResolverDnssecConfigRequest>;
export type ResolverDNSSECValidationStatus =
  | "ENABLING"
  | "ENABLED"
  | "DISABLING"
  | "DISABLED"
  | "UPDATING_TO_USE_LOCAL_RESOURCE_SETTING"
  | "USE_LOCAL_RESOURCE_SETTING"
  | (string & {});
export const ResolverDNSSECValidationStatus = S.String;
export interface ResolverDnssecConfig {
  Id?: string;
  OwnerId?: string;
  ResourceId?: string;
  ValidationStatus?: ResolverDNSSECValidationStatus;
}
export const ResolverDnssecConfig = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    OwnerId: S.optional(S.String),
    ResourceId: S.optional(S.String),
    ValidationStatus: S.optional(ResolverDNSSECValidationStatus),
  }),
).annotate({
  identifier: "ResolverDnssecConfig",
}) as any as S.Schema<ResolverDnssecConfig>;
export interface GetResolverDnssecConfigResponse {
  ResolverDNSSECConfig?: ResolverDnssecConfig;
}
export const GetResolverDnssecConfigResponse = S.suspend(() =>
  S.Struct({ ResolverDNSSECConfig: S.optional(ResolverDnssecConfig) }),
).annotate({
  identifier: "GetResolverDnssecConfigResponse",
}) as any as S.Schema<GetResolverDnssecConfigResponse>;
export interface GetResolverEndpointRequest {
  ResolverEndpointId: string;
}
export const GetResolverEndpointRequest = S.suspend(() =>
  S.Struct({ ResolverEndpointId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResolverEndpointRequest",
}) as any as S.Schema<GetResolverEndpointRequest>;
export interface GetResolverEndpointResponse {
  ResolverEndpoint?: ResolverEndpoint;
}
export const GetResolverEndpointResponse = S.suspend(() =>
  S.Struct({ ResolverEndpoint: S.optional(ResolverEndpoint) }),
).annotate({
  identifier: "GetResolverEndpointResponse",
}) as any as S.Schema<GetResolverEndpointResponse>;
export interface GetResolverQueryLogConfigRequest {
  ResolverQueryLogConfigId: string;
}
export const GetResolverQueryLogConfigRequest = S.suspend(() =>
  S.Struct({ ResolverQueryLogConfigId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResolverQueryLogConfigRequest",
}) as any as S.Schema<GetResolverQueryLogConfigRequest>;
export interface GetResolverQueryLogConfigResponse {
  ResolverQueryLogConfig?: ResolverQueryLogConfig;
}
export const GetResolverQueryLogConfigResponse = S.suspend(() =>
  S.Struct({ ResolverQueryLogConfig: S.optional(ResolverQueryLogConfig) }),
).annotate({
  identifier: "GetResolverQueryLogConfigResponse",
}) as any as S.Schema<GetResolverQueryLogConfigResponse>;
export interface GetResolverQueryLogConfigAssociationRequest {
  ResolverQueryLogConfigAssociationId: string;
}
export const GetResolverQueryLogConfigAssociationRequest = S.suspend(() =>
  S.Struct({ ResolverQueryLogConfigAssociationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResolverQueryLogConfigAssociationRequest",
}) as any as S.Schema<GetResolverQueryLogConfigAssociationRequest>;
export interface GetResolverQueryLogConfigAssociationResponse {
  ResolverQueryLogConfigAssociation?: ResolverQueryLogConfigAssociation;
}
export const GetResolverQueryLogConfigAssociationResponse = S.suspend(() =>
  S.Struct({
    ResolverQueryLogConfigAssociation: S.optional(
      ResolverQueryLogConfigAssociation,
    ),
  }),
).annotate({
  identifier: "GetResolverQueryLogConfigAssociationResponse",
}) as any as S.Schema<GetResolverQueryLogConfigAssociationResponse>;
export interface GetResolverQueryLogConfigPolicyRequest {
  Arn: string;
}
export const GetResolverQueryLogConfigPolicyRequest = S.suspend(() =>
  S.Struct({ Arn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResolverQueryLogConfigPolicyRequest",
}) as any as S.Schema<GetResolverQueryLogConfigPolicyRequest>;
export interface GetResolverQueryLogConfigPolicyResponse {
  ResolverQueryLogConfigPolicy?: string;
}
export const GetResolverQueryLogConfigPolicyResponse = S.suspend(() =>
  S.Struct({ ResolverQueryLogConfigPolicy: S.optional(S.String) }),
).annotate({
  identifier: "GetResolverQueryLogConfigPolicyResponse",
}) as any as S.Schema<GetResolverQueryLogConfigPolicyResponse>;
export interface GetResolverRuleRequest {
  ResolverRuleId: string;
}
export const GetResolverRuleRequest = S.suspend(() =>
  S.Struct({ ResolverRuleId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResolverRuleRequest",
}) as any as S.Schema<GetResolverRuleRequest>;
export interface GetResolverRuleResponse {
  ResolverRule?: ResolverRule;
}
export const GetResolverRuleResponse = S.suspend(() =>
  S.Struct({ ResolverRule: S.optional(ResolverRule) }),
).annotate({
  identifier: "GetResolverRuleResponse",
}) as any as S.Schema<GetResolverRuleResponse>;
export interface GetResolverRuleAssociationRequest {
  ResolverRuleAssociationId: string;
}
export const GetResolverRuleAssociationRequest = S.suspend(() =>
  S.Struct({ ResolverRuleAssociationId: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResolverRuleAssociationRequest",
}) as any as S.Schema<GetResolverRuleAssociationRequest>;
export interface GetResolverRuleAssociationResponse {
  ResolverRuleAssociation?: ResolverRuleAssociation;
}
export const GetResolverRuleAssociationResponse = S.suspend(() =>
  S.Struct({ ResolverRuleAssociation: S.optional(ResolverRuleAssociation) }),
).annotate({
  identifier: "GetResolverRuleAssociationResponse",
}) as any as S.Schema<GetResolverRuleAssociationResponse>;
export interface GetResolverRulePolicyRequest {
  Arn: string;
}
export const GetResolverRulePolicyRequest = S.suspend(() =>
  S.Struct({ Arn: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetResolverRulePolicyRequest",
}) as any as S.Schema<GetResolverRulePolicyRequest>;
export interface GetResolverRulePolicyResponse {
  ResolverRulePolicy?: string;
}
export const GetResolverRulePolicyResponse = S.suspend(() =>
  S.Struct({ ResolverRulePolicy: S.optional(S.String) }),
).annotate({
  identifier: "GetResolverRulePolicyResponse",
}) as any as S.Schema<GetResolverRulePolicyResponse>;
export type FirewallDomainImportOperation = "REPLACE" | (string & {});
export const FirewallDomainImportOperation = S.String;
export interface ImportFirewallDomainsRequest {
  FirewallDomainListId: string;
  Operation: FirewallDomainImportOperation;
  DomainFileUrl: string;
}
export const ImportFirewallDomainsRequest = S.suspend(() =>
  S.Struct({
    FirewallDomainListId: S.String,
    Operation: FirewallDomainImportOperation,
    DomainFileUrl: S.String,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ImportFirewallDomainsRequest",
}) as any as S.Schema<ImportFirewallDomainsRequest>;
export interface ImportFirewallDomainsResponse {
  Id?: string;
  Name?: string;
  Status?: FirewallDomainListStatus;
  StatusMessage?: string;
}
export const ImportFirewallDomainsResponse = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(FirewallDomainListStatus),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "ImportFirewallDomainsResponse",
}) as any as S.Schema<ImportFirewallDomainsResponse>;
export interface ListFirewallConfigsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListFirewallConfigsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFirewallConfigsRequest",
}) as any as S.Schema<ListFirewallConfigsRequest>;
export type FirewallConfigList = FirewallConfig[];
export const FirewallConfigList = S.Array(FirewallConfig);
export interface ListFirewallConfigsResponse {
  NextToken?: string;
  FirewallConfigs?: FirewallConfig[];
}
export const ListFirewallConfigsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    FirewallConfigs: S.optional(FirewallConfigList),
  }),
).annotate({
  identifier: "ListFirewallConfigsResponse",
}) as any as S.Schema<ListFirewallConfigsResponse>;
export interface ListFirewallDomainListsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListFirewallDomainListsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFirewallDomainListsRequest",
}) as any as S.Schema<ListFirewallDomainListsRequest>;
export interface FirewallDomainListMetadata {
  Id?: string;
  Arn?: string;
  Name?: string;
  CreatorRequestId?: string;
  ManagedOwnerName?: string;
}
export const FirewallDomainListMetadata = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    CreatorRequestId: S.optional(S.String),
    ManagedOwnerName: S.optional(S.String),
  }),
).annotate({
  identifier: "FirewallDomainListMetadata",
}) as any as S.Schema<FirewallDomainListMetadata>;
export type FirewallDomainListMetadataList = FirewallDomainListMetadata[];
export const FirewallDomainListMetadataList = S.Array(
  FirewallDomainListMetadata,
);
export interface ListFirewallDomainListsResponse {
  NextToken?: string;
  FirewallDomainLists?: FirewallDomainListMetadata[];
}
export const ListFirewallDomainListsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    FirewallDomainLists: S.optional(FirewallDomainListMetadataList),
  }),
).annotate({
  identifier: "ListFirewallDomainListsResponse",
}) as any as S.Schema<ListFirewallDomainListsResponse>;
export interface ListFirewallDomainsRequest {
  FirewallDomainListId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListFirewallDomainsRequest = S.suspend(() =>
  S.Struct({
    FirewallDomainListId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFirewallDomainsRequest",
}) as any as S.Schema<ListFirewallDomainsRequest>;
export type FirewallDomains = string[];
export const FirewallDomains = S.Array(S.String);
export interface ListFirewallDomainsResponse {
  NextToken?: string;
  Domains?: string[];
}
export const ListFirewallDomainsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    Domains: S.optional(FirewallDomains),
  }),
).annotate({
  identifier: "ListFirewallDomainsResponse",
}) as any as S.Schema<ListFirewallDomainsResponse>;
export interface ListFirewallRuleGroupAssociationsRequest {
  FirewallRuleGroupId?: string;
  VpcId?: string;
  Priority?: number;
  Status?: FirewallRuleGroupAssociationStatus;
  MaxResults?: number;
  NextToken?: string;
}
export const ListFirewallRuleGroupAssociationsRequest = S.suspend(() =>
  S.Struct({
    FirewallRuleGroupId: S.optional(S.String),
    VpcId: S.optional(S.String),
    Priority: S.optional(S.Number),
    Status: S.optional(FirewallRuleGroupAssociationStatus),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFirewallRuleGroupAssociationsRequest",
}) as any as S.Schema<ListFirewallRuleGroupAssociationsRequest>;
export type FirewallRuleGroupAssociations = FirewallRuleGroupAssociation[];
export const FirewallRuleGroupAssociations = S.Array(
  FirewallRuleGroupAssociation,
);
export interface ListFirewallRuleGroupAssociationsResponse {
  NextToken?: string;
  FirewallRuleGroupAssociations?: FirewallRuleGroupAssociation[];
}
export const ListFirewallRuleGroupAssociationsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    FirewallRuleGroupAssociations: S.optional(FirewallRuleGroupAssociations),
  }),
).annotate({
  identifier: "ListFirewallRuleGroupAssociationsResponse",
}) as any as S.Schema<ListFirewallRuleGroupAssociationsResponse>;
export interface ListFirewallRuleGroupsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListFirewallRuleGroupsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFirewallRuleGroupsRequest",
}) as any as S.Schema<ListFirewallRuleGroupsRequest>;
export interface FirewallRuleGroupMetadata {
  Id?: string;
  Arn?: string;
  Name?: string;
  OwnerId?: string;
  CreatorRequestId?: string;
  ShareStatus?: ShareStatus;
}
export const FirewallRuleGroupMetadata = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Arn: S.optional(S.String),
    Name: S.optional(S.String),
    OwnerId: S.optional(S.String),
    CreatorRequestId: S.optional(S.String),
    ShareStatus: S.optional(ShareStatus),
  }),
).annotate({
  identifier: "FirewallRuleGroupMetadata",
}) as any as S.Schema<FirewallRuleGroupMetadata>;
export type FirewallRuleGroupMetadataList = FirewallRuleGroupMetadata[];
export const FirewallRuleGroupMetadataList = S.Array(FirewallRuleGroupMetadata);
export interface ListFirewallRuleGroupsResponse {
  NextToken?: string;
  FirewallRuleGroups?: FirewallRuleGroupMetadata[];
}
export const ListFirewallRuleGroupsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    FirewallRuleGroups: S.optional(FirewallRuleGroupMetadataList),
  }),
).annotate({
  identifier: "ListFirewallRuleGroupsResponse",
}) as any as S.Schema<ListFirewallRuleGroupsResponse>;
export interface ListFirewallRulesRequest {
  FirewallRuleGroupId: string;
  Priority?: number;
  Action?: Action;
  MaxResults?: number;
  NextToken?: string;
}
export const ListFirewallRulesRequest = S.suspend(() =>
  S.Struct({
    FirewallRuleGroupId: S.String,
    Priority: S.optional(S.Number),
    Action: S.optional(Action),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListFirewallRulesRequest",
}) as any as S.Schema<ListFirewallRulesRequest>;
export type FirewallRules = FirewallRule[];
export const FirewallRules = S.Array(FirewallRule);
export interface ListFirewallRulesResponse {
  NextToken?: string;
  FirewallRules?: FirewallRule[];
}
export const ListFirewallRulesResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    FirewallRules: S.optional(FirewallRules),
  }),
).annotate({
  identifier: "ListFirewallRulesResponse",
}) as any as S.Schema<ListFirewallRulesResponse>;
export interface ListOutpostResolversRequest {
  OutpostArn?: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListOutpostResolversRequest = S.suspend(() =>
  S.Struct({
    OutpostArn: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListOutpostResolversRequest",
}) as any as S.Schema<ListOutpostResolversRequest>;
export type OutpostResolverList = OutpostResolver[];
export const OutpostResolverList = S.Array(OutpostResolver);
export interface ListOutpostResolversResponse {
  OutpostResolvers?: OutpostResolver[];
  NextToken?: string;
}
export const ListOutpostResolversResponse = S.suspend(() =>
  S.Struct({
    OutpostResolvers: S.optional(OutpostResolverList),
    NextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListOutpostResolversResponse",
}) as any as S.Schema<ListOutpostResolversResponse>;
export interface ListResolverConfigsRequest {
  MaxResults?: number;
  NextToken?: string;
}
export const ListResolverConfigsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResolverConfigsRequest",
}) as any as S.Schema<ListResolverConfigsRequest>;
export type ResolverConfigList = ResolverConfig[];
export const ResolverConfigList = S.Array(ResolverConfig);
export interface ListResolverConfigsResponse {
  NextToken?: string;
  ResolverConfigs?: ResolverConfig[];
}
export const ListResolverConfigsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ResolverConfigs: S.optional(ResolverConfigList),
  }),
).annotate({
  identifier: "ListResolverConfigsResponse",
}) as any as S.Schema<ListResolverConfigsResponse>;
export type FilterValues = string[];
export const FilterValues = S.Array(S.String);
export interface Filter {
  Name?: string;
  Values?: string[];
}
export const Filter = S.suspend(() =>
  S.Struct({ Name: S.optional(S.String), Values: S.optional(FilterValues) }),
).annotate({ identifier: "Filter" }) as any as S.Schema<Filter>;
export type Filters = Filter[];
export const Filters = S.Array(Filter);
export interface ListResolverDnssecConfigsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export const ListResolverDnssecConfigsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResolverDnssecConfigsRequest",
}) as any as S.Schema<ListResolverDnssecConfigsRequest>;
export type ResolverDnssecConfigList = ResolverDnssecConfig[];
export const ResolverDnssecConfigList = S.Array(ResolverDnssecConfig);
export interface ListResolverDnssecConfigsResponse {
  NextToken?: string;
  ResolverDnssecConfigs?: ResolverDnssecConfig[];
}
export const ListResolverDnssecConfigsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    ResolverDnssecConfigs: S.optional(ResolverDnssecConfigList),
  }),
).annotate({
  identifier: "ListResolverDnssecConfigsResponse",
}) as any as S.Schema<ListResolverDnssecConfigsResponse>;
export interface ListResolverEndpointIpAddressesRequest {
  ResolverEndpointId: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListResolverEndpointIpAddressesRequest = S.suspend(() =>
  S.Struct({
    ResolverEndpointId: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResolverEndpointIpAddressesRequest",
}) as any as S.Schema<ListResolverEndpointIpAddressesRequest>;
export type IpAddressStatus =
  | "CREATING"
  | "FAILED_CREATION"
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
export const IpAddressStatus = S.String;
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
export const IpAddressResponse = S.suspend(() =>
  S.Struct({
    IpId: S.optional(S.String),
    SubnetId: S.optional(S.String),
    Ip: S.optional(S.String),
    Ipv6: S.optional(S.String),
    Status: S.optional(IpAddressStatus),
    StatusMessage: S.optional(S.String),
    CreationTime: S.optional(S.String),
    ModificationTime: S.optional(S.String),
  }),
).annotate({
  identifier: "IpAddressResponse",
}) as any as S.Schema<IpAddressResponse>;
export type IpAddressesResponse = IpAddressResponse[];
export const IpAddressesResponse = S.Array(IpAddressResponse);
export interface ListResolverEndpointIpAddressesResponse {
  NextToken?: string;
  MaxResults?: number;
  IpAddresses?: IpAddressResponse[];
}
export const ListResolverEndpointIpAddressesResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    IpAddresses: S.optional(IpAddressesResponse),
  }),
).annotate({
  identifier: "ListResolverEndpointIpAddressesResponse",
}) as any as S.Schema<ListResolverEndpointIpAddressesResponse>;
export interface ListResolverEndpointsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export const ListResolverEndpointsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResolverEndpointsRequest",
}) as any as S.Schema<ListResolverEndpointsRequest>;
export type ResolverEndpoints = ResolverEndpoint[];
export const ResolverEndpoints = S.Array(ResolverEndpoint);
export interface ListResolverEndpointsResponse {
  NextToken?: string;
  MaxResults?: number;
  ResolverEndpoints?: ResolverEndpoint[];
}
export const ListResolverEndpointsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ResolverEndpoints: S.optional(ResolverEndpoints),
  }),
).annotate({
  identifier: "ListResolverEndpointsResponse",
}) as any as S.Schema<ListResolverEndpointsResponse>;
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export const SortOrder = S.String;
export interface ListResolverQueryLogConfigAssociationsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
  SortBy?: string;
  SortOrder?: SortOrder;
}
export const ListResolverQueryLogConfigAssociationsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(Filters),
    SortBy: S.optional(S.String),
    SortOrder: S.optional(SortOrder),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResolverQueryLogConfigAssociationsRequest",
}) as any as S.Schema<ListResolverQueryLogConfigAssociationsRequest>;
export type ResolverQueryLogConfigAssociationList =
  ResolverQueryLogConfigAssociation[];
export const ResolverQueryLogConfigAssociationList = S.Array(
  ResolverQueryLogConfigAssociation,
);
export interface ListResolverQueryLogConfigAssociationsResponse {
  NextToken?: string;
  TotalCount?: number;
  TotalFilteredCount?: number;
  ResolverQueryLogConfigAssociations?: ResolverQueryLogConfigAssociation[];
}
export const ListResolverQueryLogConfigAssociationsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    TotalCount: S.optional(S.Number),
    TotalFilteredCount: S.optional(S.Number),
    ResolverQueryLogConfigAssociations: S.optional(
      ResolverQueryLogConfigAssociationList,
    ),
  }),
).annotate({
  identifier: "ListResolverQueryLogConfigAssociationsResponse",
}) as any as S.Schema<ListResolverQueryLogConfigAssociationsResponse>;
export interface ListResolverQueryLogConfigsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
  SortBy?: string;
  SortOrder?: SortOrder;
}
export const ListResolverQueryLogConfigsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(Filters),
    SortBy: S.optional(S.String),
    SortOrder: S.optional(SortOrder),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResolverQueryLogConfigsRequest",
}) as any as S.Schema<ListResolverQueryLogConfigsRequest>;
export type ResolverQueryLogConfigList = ResolverQueryLogConfig[];
export const ResolverQueryLogConfigList = S.Array(ResolverQueryLogConfig);
export interface ListResolverQueryLogConfigsResponse {
  NextToken?: string;
  TotalCount?: number;
  TotalFilteredCount?: number;
  ResolverQueryLogConfigs?: ResolverQueryLogConfig[];
}
export const ListResolverQueryLogConfigsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    TotalCount: S.optional(S.Number),
    TotalFilteredCount: S.optional(S.Number),
    ResolverQueryLogConfigs: S.optional(ResolverQueryLogConfigList),
  }),
).annotate({
  identifier: "ListResolverQueryLogConfigsResponse",
}) as any as S.Schema<ListResolverQueryLogConfigsResponse>;
export interface ListResolverRuleAssociationsRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export const ListResolverRuleAssociationsRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResolverRuleAssociationsRequest",
}) as any as S.Schema<ListResolverRuleAssociationsRequest>;
export type ResolverRuleAssociations = ResolverRuleAssociation[];
export const ResolverRuleAssociations = S.Array(ResolverRuleAssociation);
export interface ListResolverRuleAssociationsResponse {
  NextToken?: string;
  MaxResults?: number;
  ResolverRuleAssociations?: ResolverRuleAssociation[];
}
export const ListResolverRuleAssociationsResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ResolverRuleAssociations: S.optional(ResolverRuleAssociations),
  }),
).annotate({
  identifier: "ListResolverRuleAssociationsResponse",
}) as any as S.Schema<ListResolverRuleAssociationsResponse>;
export interface ListResolverRulesRequest {
  MaxResults?: number;
  NextToken?: string;
  Filters?: Filter[];
}
export const ListResolverRulesRequest = S.suspend(() =>
  S.Struct({
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
    Filters: S.optional(Filters),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResolverRulesRequest",
}) as any as S.Schema<ListResolverRulesRequest>;
export type ResolverRules = ResolverRule[];
export const ResolverRules = S.Array(ResolverRule);
export interface ListResolverRulesResponse {
  NextToken?: string;
  MaxResults?: number;
  ResolverRules?: ResolverRule[];
}
export const ListResolverRulesResponse = S.suspend(() =>
  S.Struct({
    NextToken: S.optional(S.String),
    MaxResults: S.optional(S.Number),
    ResolverRules: S.optional(ResolverRules),
  }),
).annotate({
  identifier: "ListResolverRulesResponse",
}) as any as S.Schema<ListResolverRulesResponse>;
export interface ListTagsForResourceRequest {
  ResourceArn: string;
  MaxResults?: number;
  NextToken?: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({
    ResourceArn: S.String,
    MaxResults: S.optional(S.Number),
    NextToken: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
  NextToken?: string;
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ Tags: S.optional(TagList), NextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface PutFirewallRuleGroupPolicyRequest {
  Arn: string;
  FirewallRuleGroupPolicy: string;
}
export const PutFirewallRuleGroupPolicyRequest = S.suspend(() =>
  S.Struct({ Arn: S.String, FirewallRuleGroupPolicy: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutFirewallRuleGroupPolicyRequest",
}) as any as S.Schema<PutFirewallRuleGroupPolicyRequest>;
export interface PutFirewallRuleGroupPolicyResponse {
  ReturnValue?: boolean;
}
export const PutFirewallRuleGroupPolicyResponse = S.suspend(() =>
  S.Struct({ ReturnValue: S.optional(S.Boolean) }),
).annotate({
  identifier: "PutFirewallRuleGroupPolicyResponse",
}) as any as S.Schema<PutFirewallRuleGroupPolicyResponse>;
export interface PutResolverQueryLogConfigPolicyRequest {
  Arn: string;
  ResolverQueryLogConfigPolicy: string;
}
export const PutResolverQueryLogConfigPolicyRequest = S.suspend(() =>
  S.Struct({ Arn: S.String, ResolverQueryLogConfigPolicy: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutResolverQueryLogConfigPolicyRequest",
}) as any as S.Schema<PutResolverQueryLogConfigPolicyRequest>;
export interface PutResolverQueryLogConfigPolicyResponse {
  ReturnValue?: boolean;
}
export const PutResolverQueryLogConfigPolicyResponse = S.suspend(() =>
  S.Struct({ ReturnValue: S.optional(S.Boolean) }),
).annotate({
  identifier: "PutResolverQueryLogConfigPolicyResponse",
}) as any as S.Schema<PutResolverQueryLogConfigPolicyResponse>;
export interface PutResolverRulePolicyRequest {
  Arn: string;
  ResolverRulePolicy: string;
}
export const PutResolverRulePolicyRequest = S.suspend(() =>
  S.Struct({ Arn: S.String, ResolverRulePolicy: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "PutResolverRulePolicyRequest",
}) as any as S.Schema<PutResolverRulePolicyRequest>;
export interface PutResolverRulePolicyResponse {
  ReturnValue?: boolean;
}
export const PutResolverRulePolicyResponse = S.suspend(() =>
  S.Struct({ ReturnValue: S.optional(S.Boolean) }),
).annotate({
  identifier: "PutResolverRulePolicyResponse",
}) as any as S.Schema<PutResolverRulePolicyResponse>;
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String, Tags: TagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({ ResourceArn: S.String, TagKeys: TagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface UpdateFirewallConfigRequest {
  ResourceId: string;
  FirewallFailOpen: FirewallFailOpenStatus;
}
export const UpdateFirewallConfigRequest = S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    FirewallFailOpen: FirewallFailOpenStatus,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateFirewallConfigRequest",
}) as any as S.Schema<UpdateFirewallConfigRequest>;
export interface UpdateFirewallConfigResponse {
  FirewallConfig?: FirewallConfig;
}
export const UpdateFirewallConfigResponse = S.suspend(() =>
  S.Struct({ FirewallConfig: S.optional(FirewallConfig) }),
).annotate({
  identifier: "UpdateFirewallConfigResponse",
}) as any as S.Schema<UpdateFirewallConfigResponse>;
export type FirewallDomainUpdateOperation =
  | "ADD"
  | "REMOVE"
  | "REPLACE"
  | (string & {});
export const FirewallDomainUpdateOperation = S.String;
export interface UpdateFirewallDomainsRequest {
  FirewallDomainListId: string;
  Operation: FirewallDomainUpdateOperation;
  Domains: string[];
}
export const UpdateFirewallDomainsRequest = S.suspend(() =>
  S.Struct({
    FirewallDomainListId: S.String,
    Operation: FirewallDomainUpdateOperation,
    Domains: FirewallDomains,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateFirewallDomainsRequest",
}) as any as S.Schema<UpdateFirewallDomainsRequest>;
export interface UpdateFirewallDomainsResponse {
  Id?: string;
  Name?: string;
  Status?: FirewallDomainListStatus;
  StatusMessage?: string;
}
export const UpdateFirewallDomainsResponse = S.suspend(() =>
  S.Struct({
    Id: S.optional(S.String),
    Name: S.optional(S.String),
    Status: S.optional(FirewallDomainListStatus),
    StatusMessage: S.optional(S.String),
  }),
).annotate({
  identifier: "UpdateFirewallDomainsResponse",
}) as any as S.Schema<UpdateFirewallDomainsResponse>;
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
}
export const UpdateFirewallRuleRequest = S.suspend(() =>
  S.Struct({
    FirewallRuleGroupId: S.String,
    FirewallDomainListId: S.optional(S.String),
    FirewallThreatProtectionId: S.optional(S.String),
    Priority: S.optional(S.Number),
    Action: S.optional(Action),
    BlockResponse: S.optional(BlockResponse),
    BlockOverrideDomain: S.optional(S.String),
    BlockOverrideDnsType: S.optional(BlockOverrideDnsType),
    BlockOverrideTtl: S.optional(S.Number),
    Name: S.optional(S.String),
    FirewallDomainRedirectionAction: S.optional(
      FirewallDomainRedirectionAction,
    ),
    Qtype: S.optional(S.String),
    DnsThreatProtection: S.optional(DnsThreatProtection),
    ConfidenceThreshold: S.optional(ConfidenceThreshold),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateFirewallRuleRequest",
}) as any as S.Schema<UpdateFirewallRuleRequest>;
export interface UpdateFirewallRuleResponse {
  FirewallRule?: FirewallRule;
}
export const UpdateFirewallRuleResponse = S.suspend(() =>
  S.Struct({ FirewallRule: S.optional(FirewallRule) }),
).annotate({
  identifier: "UpdateFirewallRuleResponse",
}) as any as S.Schema<UpdateFirewallRuleResponse>;
export interface UpdateFirewallRuleGroupAssociationRequest {
  FirewallRuleGroupAssociationId: string;
  Priority?: number;
  MutationProtection?: MutationProtectionStatus;
  Name?: string;
}
export const UpdateFirewallRuleGroupAssociationRequest = S.suspend(() =>
  S.Struct({
    FirewallRuleGroupAssociationId: S.String,
    Priority: S.optional(S.Number),
    MutationProtection: S.optional(MutationProtectionStatus),
    Name: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateFirewallRuleGroupAssociationRequest",
}) as any as S.Schema<UpdateFirewallRuleGroupAssociationRequest>;
export interface UpdateFirewallRuleGroupAssociationResponse {
  FirewallRuleGroupAssociation?: FirewallRuleGroupAssociation;
}
export const UpdateFirewallRuleGroupAssociationResponse = S.suspend(() =>
  S.Struct({
    FirewallRuleGroupAssociation: S.optional(FirewallRuleGroupAssociation),
  }),
).annotate({
  identifier: "UpdateFirewallRuleGroupAssociationResponse",
}) as any as S.Schema<UpdateFirewallRuleGroupAssociationResponse>;
export interface UpdateOutpostResolverRequest {
  Id: string;
  Name?: string;
  InstanceCount?: number;
  PreferredInstanceType?: string;
}
export const UpdateOutpostResolverRequest = S.suspend(() =>
  S.Struct({
    Id: S.String,
    Name: S.optional(S.String),
    InstanceCount: S.optional(S.Number),
    PreferredInstanceType: S.optional(S.String),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateOutpostResolverRequest",
}) as any as S.Schema<UpdateOutpostResolverRequest>;
export interface UpdateOutpostResolverResponse {
  OutpostResolver?: OutpostResolver;
}
export const UpdateOutpostResolverResponse = S.suspend(() =>
  S.Struct({ OutpostResolver: S.optional(OutpostResolver) }),
).annotate({
  identifier: "UpdateOutpostResolverResponse",
}) as any as S.Schema<UpdateOutpostResolverResponse>;
export type AutodefinedReverseFlag =
  | "ENABLE"
  | "DISABLE"
  | "USE_LOCAL_RESOURCE_SETTING"
  | (string & {});
export const AutodefinedReverseFlag = S.String;
export interface UpdateResolverConfigRequest {
  ResourceId: string;
  AutodefinedReverseFlag: AutodefinedReverseFlag;
}
export const UpdateResolverConfigRequest = S.suspend(() =>
  S.Struct({
    ResourceId: S.String,
    AutodefinedReverseFlag: AutodefinedReverseFlag,
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateResolverConfigRequest",
}) as any as S.Schema<UpdateResolverConfigRequest>;
export interface UpdateResolverConfigResponse {
  ResolverConfig?: ResolverConfig;
}
export const UpdateResolverConfigResponse = S.suspend(() =>
  S.Struct({ ResolverConfig: S.optional(ResolverConfig) }),
).annotate({
  identifier: "UpdateResolverConfigResponse",
}) as any as S.Schema<UpdateResolverConfigResponse>;
export type Validation =
  | "ENABLE"
  | "DISABLE"
  | "USE_LOCAL_RESOURCE_SETTING"
  | (string & {});
export const Validation = S.String;
export interface UpdateResolverDnssecConfigRequest {
  ResourceId: string;
  Validation: Validation;
}
export const UpdateResolverDnssecConfigRequest = S.suspend(() =>
  S.Struct({ ResourceId: S.String, Validation: Validation }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateResolverDnssecConfigRequest",
}) as any as S.Schema<UpdateResolverDnssecConfigRequest>;
export interface UpdateResolverDnssecConfigResponse {
  ResolverDNSSECConfig?: ResolverDnssecConfig;
}
export const UpdateResolverDnssecConfigResponse = S.suspend(() =>
  S.Struct({ ResolverDNSSECConfig: S.optional(ResolverDnssecConfig) }),
).annotate({
  identifier: "UpdateResolverDnssecConfigResponse",
}) as any as S.Schema<UpdateResolverDnssecConfigResponse>;
export interface UpdateIpAddress {
  IpId: string;
  Ipv6: string;
}
export const UpdateIpAddress = S.suspend(() =>
  S.Struct({ IpId: S.String, Ipv6: S.String }),
).annotate({
  identifier: "UpdateIpAddress",
}) as any as S.Schema<UpdateIpAddress>;
export type UpdateIpAddresses = UpdateIpAddress[];
export const UpdateIpAddresses = S.Array(UpdateIpAddress);
export interface UpdateResolverEndpointRequest {
  ResolverEndpointId: string;
  Name?: string;
  ResolverEndpointType?: ResolverEndpointType;
  UpdateIpAddresses?: UpdateIpAddress[];
  Protocols?: Protocol[];
  RniEnhancedMetricsEnabled?: boolean;
  TargetNameServerMetricsEnabled?: boolean;
}
export const UpdateResolverEndpointRequest = S.suspend(() =>
  S.Struct({
    ResolverEndpointId: S.String,
    Name: S.optional(S.String),
    ResolverEndpointType: S.optional(ResolverEndpointType),
    UpdateIpAddresses: S.optional(UpdateIpAddresses),
    Protocols: S.optional(ProtocolList),
    RniEnhancedMetricsEnabled: S.optional(S.Boolean),
    TargetNameServerMetricsEnabled: S.optional(S.Boolean),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateResolverEndpointRequest",
}) as any as S.Schema<UpdateResolverEndpointRequest>;
export interface UpdateResolverEndpointResponse {
  ResolverEndpoint?: ResolverEndpoint;
}
export const UpdateResolverEndpointResponse = S.suspend(() =>
  S.Struct({ ResolverEndpoint: S.optional(ResolverEndpoint) }),
).annotate({
  identifier: "UpdateResolverEndpointResponse",
}) as any as S.Schema<UpdateResolverEndpointResponse>;
export interface ResolverRuleConfig {
  Name?: string;
  TargetIps?: TargetAddress[];
  ResolverEndpointId?: string;
}
export const ResolverRuleConfig = S.suspend(() =>
  S.Struct({
    Name: S.optional(S.String),
    TargetIps: S.optional(TargetList),
    ResolverEndpointId: S.optional(S.String),
  }),
).annotate({
  identifier: "ResolverRuleConfig",
}) as any as S.Schema<ResolverRuleConfig>;
export interface UpdateResolverRuleRequest {
  ResolverRuleId: string;
  Config: ResolverRuleConfig;
}
export const UpdateResolverRuleRequest = S.suspend(() =>
  S.Struct({ ResolverRuleId: S.String, Config: ResolverRuleConfig }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UpdateResolverRuleRequest",
}) as any as S.Schema<UpdateResolverRuleRequest>;
export interface UpdateResolverRuleResponse {
  ResolverRule?: ResolverRule;
}
export const UpdateResolverRuleResponse = S.suspend(() =>
  S.Struct({ ResolverRule: S.optional(ResolverRule) }),
).annotate({
  identifier: "UpdateResolverRuleResponse",
}) as any as S.Schema<UpdateResolverRuleResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { Message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { Message: S.optional(S.String) },
) {}
export class InternalServiceErrorException extends S.TaggedErrorClass<InternalServiceErrorException>()(
  "InternalServiceErrorException",
  { Message: S.optional(S.String) },
) {}
export class LimitExceededException extends S.TaggedErrorClass<LimitExceededException>()(
  "LimitExceededException",
  { Message: S.optional(S.String), ResourceType: S.optional(S.String) },
) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { Message: S.optional(S.String), ResourceType: S.optional(S.String) },
) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { Message: S.optional(S.String) },
) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { Message: S.optional(S.String) },
) {}
export class InvalidParameterException extends S.TaggedErrorClass<InvalidParameterException>()(
  "InvalidParameterException",
  { Message: S.String, FieldName: S.optional(S.String) },
) {}
export class InvalidRequestException extends S.TaggedErrorClass<InvalidRequestException>()(
  "InvalidRequestException",
  { Message: S.optional(S.String) },
) {}
export class ResourceExistsException extends S.TaggedErrorClass<ResourceExistsException>()(
  "ResourceExistsException",
  { Message: S.optional(S.String), ResourceType: S.optional(S.String) },
) {}
export class ResourceUnavailableException extends S.TaggedErrorClass<ResourceUnavailableException>()(
  "ResourceUnavailableException",
  { Message: S.optional(S.String), ResourceType: S.optional(S.String) },
) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { Message: S.optional(S.String) },
) {}
export class ResourceInUseException extends S.TaggedErrorClass<ResourceInUseException>()(
  "ResourceInUseException",
  { Message: S.optional(S.String), ResourceType: S.optional(S.String) },
) {}
export class UnknownResourceException extends S.TaggedErrorClass<UnknownResourceException>()(
  "UnknownResourceException",
  { Message: S.optional(S.String) },
) {}
export class InvalidNextTokenException extends S.TaggedErrorClass<InvalidNextTokenException>()(
  "InvalidNextTokenException",
  { Message: S.optional(S.String) },
) {}
export class InvalidPolicyDocument extends S.TaggedErrorClass<InvalidPolicyDocument>()(
  "InvalidPolicyDocument",
  { Message: S.optional(S.String) },
) {}
export class InvalidTagException extends S.TaggedErrorClass<InvalidTagException>()(
  "InvalidTagException",
  { Message: S.optional(S.String) },
) {}

//# Operations
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
 */
export const associateFirewallRuleGroup: API.OperationMethod<
  AssociateFirewallRuleGroupRequest,
  AssociateFirewallRuleGroupResponse,
  AssociateFirewallRuleGroupError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateFirewallRuleGroupRequest,
  output: AssociateFirewallRuleGroupResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateResolverEndpointIpAddressRequest,
  output: AssociateResolverEndpointIpAddressResponse,
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateResolverQueryLogConfigRequest,
  output: AssociateResolverQueryLogConfigResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateResolverRuleRequest,
  output: AssociateResolverRuleResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateFirewallDomainListRequest,
  output: CreateFirewallDomainListResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
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
 * Creates a single DNS Firewall rule in the specified rule group, using the specified domain list.
 */
export const createFirewallRule: API.OperationMethod<
  CreateFirewallRuleRequest,
  CreateFirewallRuleResponse,
  CreateFirewallRuleError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateFirewallRuleRequest,
  output: CreateFirewallRuleResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateFirewallRuleGroupRequest,
  output: CreateFirewallRuleGroupResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    LimitExceededException,
    ThrottlingException,
    ValidationException,
  ],
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
 */
export const createOutpostResolver: API.OperationMethod<
  CreateOutpostResolverRequest,
  CreateOutpostResolverResponse,
  CreateOutpostResolverError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateOutpostResolverRequest,
  output: CreateOutpostResolverResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateResolverEndpointRequest,
  output: CreateResolverEndpointResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateResolverQueryLogConfigRequest,
  output: CreateResolverQueryLogConfigResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateResolverRuleRequest,
  output: CreateResolverRuleResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteFirewallDomainListRequest,
  output: DeleteFirewallDomainListResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
export type DeleteFirewallRuleError =
  | AccessDeniedException
  | InternalServiceErrorException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified firewall rule.
 */
export const deleteFirewallRule: API.OperationMethod<
  DeleteFirewallRuleRequest,
  DeleteFirewallRuleResponse,
  DeleteFirewallRuleError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteFirewallRuleRequest,
  output: DeleteFirewallRuleResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteFirewallRuleGroupRequest,
  output: DeleteFirewallRuleGroupResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
 */
export const deleteOutpostResolver: API.OperationMethod<
  DeleteOutpostResolverRequest,
  DeleteOutpostResolverResponse,
  DeleteOutpostResolverError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteOutpostResolverRequest,
  output: DeleteOutpostResolverResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteResolverEndpointRequest,
  output: DeleteResolverEndpointResponse,
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteResolverQueryLogConfigRequest,
  output: DeleteResolverQueryLogConfigResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
export type DeleteResolverRuleError =
  | InternalServiceErrorException
  | InvalidParameterException
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteResolverRuleRequest,
  output: DeleteResolverRuleResponse,
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateFirewallRuleGroupRequest,
  output: DisassociateFirewallRuleGroupResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateResolverEndpointIpAddressRequest,
  output: DisassociateResolverEndpointIpAddressResponse,
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceExistsException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateResolverQueryLogConfigRequest,
  output: DisassociateResolverQueryLogConfigResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
}));
export type DisassociateResolverRuleError =
  | InternalServiceErrorException
  | InvalidParameterException
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateResolverRuleRequest,
  output: DisassociateResolverRuleResponse,
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFirewallConfigRequest,
  output: GetFirewallConfigResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFirewallDomainListRequest,
  output: GetFirewallDomainListResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFirewallRuleGroupRequest,
  output: GetFirewallRuleGroupResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFirewallRuleGroupAssociationRequest,
  output: GetFirewallRuleGroupAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFirewallRuleGroupPolicyRequest,
  output: GetFirewallRuleGroupPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetOutpostResolverRequest,
  output: GetOutpostResolverResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResolverConfigRequest,
  output: GetResolverConfigResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResolverDnssecConfigRequest,
  output: GetResolverDnssecConfigResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResolverEndpointRequest,
  output: GetResolverEndpointResponse,
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResolverQueryLogConfigRequest,
  output: GetResolverQueryLogConfigResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResolverQueryLogConfigAssociationRequest,
  output: GetResolverQueryLogConfigAssociationResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResolverQueryLogConfigPolicyRequest,
  output: GetResolverQueryLogConfigPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    UnknownResourceException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResolverRuleRequest,
  output: GetResolverRuleResponse,
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResolverRuleAssociationRequest,
  output: GetResolverRuleAssociationResponse,
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetResolverRulePolicyRequest,
  output: GetResolverRulePolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    UnknownResourceException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ImportFirewallDomainsRequest,
  output: ImportFirewallDomainsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
export const listFirewallConfigs: API.OperationMethod<
  ListFirewallConfigsRequest,
  ListFirewallConfigsResponse,
  ListFirewallConfigsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFirewallConfigsRequest,
  ) => stream.Stream<
    ListFirewallConfigsResponse,
    ListFirewallConfigsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFirewallConfigsRequest,
  ) => stream.Stream<
    FirewallConfig,
    ListFirewallConfigsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFirewallConfigsRequest,
  output: ListFirewallConfigsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FirewallConfigs",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listFirewallDomainLists: API.OperationMethod<
  ListFirewallDomainListsRequest,
  ListFirewallDomainListsResponse,
  ListFirewallDomainListsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFirewallDomainListsRequest,
  ) => stream.Stream<
    ListFirewallDomainListsResponse,
    ListFirewallDomainListsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFirewallDomainListsRequest,
  ) => stream.Stream<
    FirewallDomainListMetadata,
    ListFirewallDomainListsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFirewallDomainListsRequest,
  output: ListFirewallDomainListsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FirewallDomainLists",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listFirewallDomains: API.OperationMethod<
  ListFirewallDomainsRequest,
  ListFirewallDomainsResponse,
  ListFirewallDomainsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFirewallDomainsRequest,
  ) => stream.Stream<
    ListFirewallDomainsResponse,
    ListFirewallDomainsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFirewallDomainsRequest,
  ) => stream.Stream<
    FirewallDomainName,
    ListFirewallDomainsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFirewallDomainsRequest,
  output: ListFirewallDomainsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Domains",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listFirewallRuleGroupAssociations: API.OperationMethod<
  ListFirewallRuleGroupAssociationsRequest,
  ListFirewallRuleGroupAssociationsResponse,
  ListFirewallRuleGroupAssociationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFirewallRuleGroupAssociationsRequest,
  ) => stream.Stream<
    ListFirewallRuleGroupAssociationsResponse,
    ListFirewallRuleGroupAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFirewallRuleGroupAssociationsRequest,
  ) => stream.Stream<
    FirewallRuleGroupAssociation,
    ListFirewallRuleGroupAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFirewallRuleGroupAssociationsRequest,
  output: ListFirewallRuleGroupAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FirewallRuleGroupAssociations",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listFirewallRuleGroups: API.OperationMethod<
  ListFirewallRuleGroupsRequest,
  ListFirewallRuleGroupsResponse,
  ListFirewallRuleGroupsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFirewallRuleGroupsRequest,
  ) => stream.Stream<
    ListFirewallRuleGroupsResponse,
    ListFirewallRuleGroupsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFirewallRuleGroupsRequest,
  ) => stream.Stream<
    FirewallRuleGroupMetadata,
    ListFirewallRuleGroupsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFirewallRuleGroupsRequest,
  output: ListFirewallRuleGroupsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FirewallRuleGroups",
    pageSize: "MaxResults",
  } as const,
}));
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
 */
export const listFirewallRules: API.OperationMethod<
  ListFirewallRulesRequest,
  ListFirewallRulesResponse,
  ListFirewallRulesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFirewallRulesRequest,
  ) => stream.Stream<
    ListFirewallRulesResponse,
    ListFirewallRulesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFirewallRulesRequest,
  ) => stream.Stream<
    FirewallRule,
    ListFirewallRulesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFirewallRulesRequest,
  output: ListFirewallRulesResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "FirewallRules",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listOutpostResolvers: API.OperationMethod<
  ListOutpostResolversRequest,
  ListOutpostResolversResponse,
  ListOutpostResolversError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListOutpostResolversRequest,
  ) => stream.Stream<
    ListOutpostResolversResponse,
    ListOutpostResolversError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListOutpostResolversRequest,
  ) => stream.Stream<
    OutpostResolver,
    ListOutpostResolversError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListOutpostResolversRequest,
  output: ListOutpostResolversResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "OutpostResolvers",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listResolverConfigs: API.OperationMethod<
  ListResolverConfigsRequest,
  ListResolverConfigsResponse,
  ListResolverConfigsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListResolverConfigsRequest,
  ) => stream.Stream<
    ListResolverConfigsResponse,
    ListResolverConfigsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListResolverConfigsRequest,
  ) => stream.Stream<
    ResolverConfig,
    ListResolverConfigsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResolverConfigsRequest,
  output: ListResolverConfigsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResolverConfigs",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listResolverDnssecConfigs: API.OperationMethod<
  ListResolverDnssecConfigsRequest,
  ListResolverDnssecConfigsResponse,
  ListResolverDnssecConfigsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListResolverDnssecConfigsRequest,
  ) => stream.Stream<
    ListResolverDnssecConfigsResponse,
    ListResolverDnssecConfigsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListResolverDnssecConfigsRequest,
  ) => stream.Stream<
    ResolverDnssecConfig,
    ListResolverDnssecConfigsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResolverDnssecConfigsRequest,
  output: ListResolverDnssecConfigsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
    ThrottlingException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResolverDnssecConfigs",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listResolverEndpointIpAddresses: API.OperationMethod<
  ListResolverEndpointIpAddressesRequest,
  ListResolverEndpointIpAddressesResponse,
  ListResolverEndpointIpAddressesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListResolverEndpointIpAddressesRequest,
  ) => stream.Stream<
    ListResolverEndpointIpAddressesResponse,
    ListResolverEndpointIpAddressesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListResolverEndpointIpAddressesRequest,
  ) => stream.Stream<
    IpAddressResponse,
    ListResolverEndpointIpAddressesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResolverEndpointIpAddressesRequest,
  output: ListResolverEndpointIpAddressesResponse,
  errors: [
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "IpAddresses",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listResolverEndpoints: API.OperationMethod<
  ListResolverEndpointsRequest,
  ListResolverEndpointsResponse,
  ListResolverEndpointsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListResolverEndpointsRequest,
  ) => stream.Stream<
    ListResolverEndpointsResponse,
    ListResolverEndpointsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListResolverEndpointsRequest,
  ) => stream.Stream<
    ResolverEndpoint,
    ListResolverEndpointsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResolverEndpointsRequest,
  output: ListResolverEndpointsResponse,
  errors: [
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
    ThrottlingException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResolverEndpoints",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listResolverQueryLogConfigAssociations: API.OperationMethod<
  ListResolverQueryLogConfigAssociationsRequest,
  ListResolverQueryLogConfigAssociationsResponse,
  ListResolverQueryLogConfigAssociationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListResolverQueryLogConfigAssociationsRequest,
  ) => stream.Stream<
    ListResolverQueryLogConfigAssociationsResponse,
    ListResolverQueryLogConfigAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListResolverQueryLogConfigAssociationsRequest,
  ) => stream.Stream<
    ResolverQueryLogConfigAssociation,
    ListResolverQueryLogConfigAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResolverQueryLogConfigAssociationsRequest,
  output: ListResolverQueryLogConfigAssociationsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    LimitExceededException,
    ThrottlingException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResolverQueryLogConfigAssociations",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listResolverQueryLogConfigs: API.OperationMethod<
  ListResolverQueryLogConfigsRequest,
  ListResolverQueryLogConfigsResponse,
  ListResolverQueryLogConfigsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListResolverQueryLogConfigsRequest,
  ) => stream.Stream<
    ListResolverQueryLogConfigsResponse,
    ListResolverQueryLogConfigsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListResolverQueryLogConfigsRequest,
  ) => stream.Stream<
    ResolverQueryLogConfig,
    ListResolverQueryLogConfigsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResolverQueryLogConfigsRequest,
  output: ListResolverQueryLogConfigsResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
    ThrottlingException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResolverQueryLogConfigs",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listResolverRuleAssociations: API.OperationMethod<
  ListResolverRuleAssociationsRequest,
  ListResolverRuleAssociationsResponse,
  ListResolverRuleAssociationsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListResolverRuleAssociationsRequest,
  ) => stream.Stream<
    ListResolverRuleAssociationsResponse,
    ListResolverRuleAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListResolverRuleAssociationsRequest,
  ) => stream.Stream<
    ResolverRuleAssociation,
    ListResolverRuleAssociationsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResolverRuleAssociationsRequest,
  output: ListResolverRuleAssociationsResponse,
  errors: [
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
    ThrottlingException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResolverRuleAssociations",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listResolverRules: API.OperationMethod<
  ListResolverRulesRequest,
  ListResolverRulesResponse,
  ListResolverRulesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListResolverRulesRequest,
  ) => stream.Stream<
    ListResolverRulesResponse,
    ListResolverRulesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListResolverRulesRequest,
  ) => stream.Stream<
    ResolverRule,
    ListResolverRulesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListResolverRulesRequest,
  output: ListResolverRulesResponse,
  errors: [
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
    ThrottlingException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResolverRules",
    pageSize: "MaxResults",
  } as const,
}));
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
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListTagsForResourceRequest,
  ) => stream.Stream<
    ListTagsForResourceResponse,
    ListTagsForResourceError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListTagsForResourceRequest,
  ) => stream.Stream<
    Tag,
    ListTagsForResourceError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    InternalServiceErrorException,
    InvalidNextTokenException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Tags",
    pageSize: "MaxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutFirewallRuleGroupPolicyRequest,
  output: PutFirewallRuleGroupPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutResolverQueryLogConfigPolicyRequest,
  output: PutResolverQueryLogConfigPolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidPolicyDocument,
    InvalidRequestException,
    UnknownResourceException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PutResolverRulePolicyRequest,
  output: PutResolverRulePolicyResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidPolicyDocument,
    UnknownResourceException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    InvalidTagException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFirewallConfigRequest,
  output: UpdateFirewallConfigResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFirewallDomainsRequest,
  output: UpdateFirewallDomainsResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    LimitExceededException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
 * Updates the specified firewall rule.
 */
export const updateFirewallRule: API.OperationMethod<
  UpdateFirewallRuleRequest,
  UpdateFirewallRuleResponse,
  UpdateFirewallRuleError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFirewallRuleRequest,
  output: UpdateFirewallRuleResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFirewallRuleGroupAssociationRequest,
  output: UpdateFirewallRuleGroupAssociationResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
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
 */
export const updateOutpostResolver: API.OperationMethod<
  UpdateOutpostResolverRequest,
  UpdateOutpostResolverResponse,
  UpdateOutpostResolverError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateOutpostResolverRequest,
  output: UpdateOutpostResolverResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServiceErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateResolverConfigRequest,
  output: UpdateResolverConfigResponse,
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateResolverDnssecConfigRequest,
  output: UpdateResolverDnssecConfigResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateResolverEndpointRequest,
  output: UpdateResolverEndpointResponse,
  errors: [
    AccessDeniedException,
    InternalServiceErrorException,
    InvalidParameterException,
    InvalidRequestException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateResolverRuleRequest,
  output: UpdateResolverRuleResponse,
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
}));
