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
  sdkId: "Route53GlobalResolver",
  target: "EC2DNSGlobalResolverCustomerAPI",
  version: "2022-09-27",
  sigv4: "route53globalresolver",
  protocol: restJson1Protocol,
  rules: (p, _) => {
    const { UseFIPS = false, Endpoint, Region } = p;
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
      return e(Endpoint);
    }
    if (Region != null) {
      {
        const PartitionResult = _.partition(Region);
        if (PartitionResult != null && PartitionResult !== false) {
          if (UseFIPS === true) {
            return e(
              `https://route53globalresolver-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://route53globalresolver.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
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
  })<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429, headers: { retryAfterSeconds: ["Retry-After", "num"] } },
  )<{
    readonly message: string;
    readonly serviceCode?: string;
    readonly quotaCode?: string;
    readonly retryAfterSeconds?: number;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type HostedZoneId = string;
export type ResourceArn = string;
export type ResourceName = string;
export interface AssociateHostedZoneInput {
  hostedZoneId: string;
  resourceArn: string;
  name: string;
}
export type ResourceId = string;
export type HostedZoneName = string;
export type ISO8601TimeString = Date;
export type HostedZoneAssociationStatus =
  | "CREATING"
  | "OPERATIONAL"
  | "DELETING"
  | (string & {});
export interface AssociateHostedZoneOutput {
  id: string;
  resourceArn: string;
  hostedZoneId: string;
  hostedZoneName: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: HostedZoneAssociationStatus;
}
export type FirewallRuleAction = "ALLOW" | "ALERT" | "BLOCK" | (string & {});
export type BlockOverrideDnsQueryType = "CNAME" | (string & {});
export type Domain = string;
export type BlockOverrideTtl = number;
export type FirewallBlockResponse =
  | "NODATA"
  | "NXDOMAIN"
  | "OVERRIDE"
  | (string & {});
export type ClientToken = string;
export type ConfidenceThreshold = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export type ResourceDescription = string;
export type DnsAdvancedProtection =
  | "DGA"
  | "DNS_TUNNELING"
  | "DICTIONARY_DGA"
  | (string & {});
export type FirewallRulePriority = number;
export type DnsQueryType = string;
export interface BatchCreateFirewallRuleInputItem {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  clientToken: string;
  confidenceThreshold?: ConfidenceThreshold;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  name: string;
  priority?: number;
  dnsViewId: string;
  qType?: string;
}
export type BatchCreateFirewallRuleInputItems =
  BatchCreateFirewallRuleInputItem[];
export interface BatchCreateFirewallRuleInput {
  firewallRules: BatchCreateFirewallRuleInputItem[];
}
export type CRResourceStatus =
  | "CREATING"
  | "OPERATIONAL"
  | "UPDATING"
  | "DELETING"
  | (string & {});
export interface BatchCreateFirewallRuleResult {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  clientToken: string;
  confidenceThreshold?: ConfidenceThreshold;
  createdAt?: Date;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  id?: string;
  managedDomainListName?: string;
  name: string;
  priority?: number;
  dnsViewId: string;
  queryType?: string;
  status?: CRResourceStatus;
  updatedAt?: Date;
}
export interface BatchCreateFirewallRuleOutputItem {
  firewallRule: BatchCreateFirewallRuleResult;
  code: number;
  message?: string;
}
export type BatchCreateFirewallRuleOutputItems =
  BatchCreateFirewallRuleOutputItem[];
export interface BatchCreateFirewallRuleOutput {
  failures: BatchCreateFirewallRuleOutputItem[];
  successes: BatchCreateFirewallRuleOutputItem[];
}
export interface BatchDeleteFirewallRuleInputItem {
  firewallRuleId: string;
}
export type BatchDeleteFirewallRuleInputItems =
  BatchDeleteFirewallRuleInputItem[];
export interface BatchDeleteFirewallRuleInput {
  firewallRules: BatchDeleteFirewallRuleInputItem[];
}
export interface BatchDeleteFirewallRuleResult {
  clientToken?: string;
  id: string;
  name?: string;
  status?: CRResourceStatus;
}
export interface BatchDeleteFirewallRuleOutputItem {
  firewallRule: BatchDeleteFirewallRuleResult;
  code: number;
  message?: string;
}
export type BatchDeleteFirewallRuleOutputItems =
  BatchDeleteFirewallRuleOutputItem[];
export interface BatchDeleteFirewallRuleOutput {
  failures: BatchDeleteFirewallRuleOutputItem[];
  successes: BatchDeleteFirewallRuleOutputItem[];
}
export interface BatchUpdateFirewallRuleInputItem {
  action?: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  confidenceThreshold?: ConfidenceThreshold;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallRuleId: string;
  name?: string;
  priority?: number;
}
export type BatchUpdateFirewallRuleInputItems =
  BatchUpdateFirewallRuleInputItem[];
export interface BatchUpdateFirewallRuleInput {
  firewallRules: BatchUpdateFirewallRuleInputItem[];
}
export interface BatchUpdateFirewallRuleResult {
  action?: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  clientToken?: string;
  confidenceThreshold?: ConfidenceThreshold;
  createdAt?: Date;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  id: string;
  name?: string;
  priority?: number;
  dnsViewId?: string;
  queryType?: string;
  status?: CRResourceStatus;
  updatedAt?: Date;
}
export interface BatchUpdateFirewallRuleOutputItem {
  firewallRule: BatchUpdateFirewallRuleResult;
  code: number;
  message?: string;
}
export type BatchUpdateFirewallRuleOutputItems =
  BatchUpdateFirewallRuleOutputItem[];
export interface BatchUpdateFirewallRuleOutput {
  failures: BatchUpdateFirewallRuleOutputItem[];
  successes: BatchUpdateFirewallRuleOutputItem[];
}
export type Cidr = string;
export type IpAddressType = "IPV4" | "IPV6" | (string & {});
export type ResourceNameShort = string;
export type DnsProtocol = "DO53" | "DOH" | "DOT" | (string & {});
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export interface CreateAccessSourceInput {
  cidr: string;
  clientToken?: string;
  ipAddressType?: IpAddressType;
  name?: string;
  dnsViewId: string;
  protocol: DnsProtocol;
  tags?: { [key: string]: string | undefined };
}
export interface CreateAccessSourceOutput {
  arn: string;
  cidr: string;
  createdAt: Date;
  id: string;
  ipAddressType: IpAddressType;
  name?: string;
  dnsViewId: string;
  protocol: DnsProtocol;
  status: CRResourceStatus;
  updatedAt: Date;
}
export interface CreateAccessTokenInput {
  clientToken?: string;
  dnsViewId: string;
  expiresAt?: Date;
  name?: string;
  tags?: { [key: string]: string | undefined };
}
export type TokenStatus =
  | "CREATING"
  | "OPERATIONAL"
  | "DELETING"
  | (string & {});
export type AccessTokenValue = string | redacted.Redacted<string>;
export interface CreateAccessTokenOutput {
  id: string;
  arn: string;
  clientToken?: string;
  createdAt: Date;
  dnsViewId: string;
  expiresAt: Date;
  name?: string;
  status: TokenStatus;
  value: string | redacted.Redacted<string>;
}
export type DnsSecValidationType = "ENABLED" | "DISABLED" | (string & {});
export type EdnsClientSubnetType = "ENABLED" | "DISABLED" | (string & {});
export type FirewallRulesFailOpenType = "ENABLED" | "DISABLED" | (string & {});
export interface CreateDNSViewInput {
  globalResolverId: string;
  clientToken?: string;
  name: string;
  dnssecValidation?: DnsSecValidationType;
  ednsClientSubnet?: EdnsClientSubnetType;
  firewallRulesFailOpen?: FirewallRulesFailOpenType;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export type ProfileResourceStatus =
  | "CREATING"
  | "OPERATIONAL"
  | "UPDATING"
  | "ENABLING"
  | "DISABLING"
  | "DISABLED"
  | "DELETING"
  | (string & {});
export interface CreateDNSViewOutput {
  id: string;
  arn: string;
  clientToken?: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
}
export interface CreateFirewallDomainListInput {
  clientToken?: string;
  globalResolverId: string;
  description?: string;
  name: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateFirewallDomainListOutput {
  arn: string;
  globalResolverId: string;
  createdAt: Date;
  description?: string;
  domainCount: number;
  id: string;
  name: string;
  status: CRResourceStatus;
  updatedAt: Date;
}
export interface CreateFirewallRuleInput {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  clientToken?: string;
  confidenceThreshold?: ConfidenceThreshold;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  name: string;
  priority?: number;
  dnsViewId: string;
  qType?: string;
}
export interface CreateFirewallRuleOutput {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  confidenceThreshold?: ConfidenceThreshold;
  createdAt: Date;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  id: string;
  name: string;
  priority: number;
  dnsViewId: string;
  queryType?: string;
  status: CRResourceStatus;
  updatedAt: Date;
}
export type GlobalResolverIpAddressType = "IPV4" | "DUAL_STACK" | (string & {});
export type Region = string;
export type Regions = string[];
export interface CreateGlobalResolverInput {
  clientToken?: string;
  description?: string;
  ipAddressType?: GlobalResolverIpAddressType;
  name: string;
  observabilityRegion?: string;
  regions: string[];
  tags?: { [key: string]: string | undefined };
}
export type Sni = string;
export type IPv4Address = string;
export type IPv4Addresses = string[];
export type IPv6Address = string;
export type IPv6Addresses = string[];
export interface CreateGlobalResolverOutput {
  id: string;
  arn: string;
  clientToken: string;
  createdAt: Date;
  description?: string;
  dnsName: string;
  ipAddressType?: GlobalResolverIpAddressType;
  ipv4Addresses: string[];
  ipv6Addresses?: string[];
  name: string;
  observabilityRegion?: string;
  regions: string[];
  status: CRResourceStatus;
  updatedAt: Date;
}
export interface DeleteAccessSourceInput {
  accessSourceId: string;
}
export interface DeleteAccessSourceOutput {
  arn: string;
  cidr: string;
  createdAt: Date;
  id: string;
  ipAddressType: IpAddressType;
  name?: string;
  dnsViewId: string;
  protocol: DnsProtocol;
  status: CRResourceStatus;
  updatedAt: Date;
}
export interface DeleteAccessTokenInput {
  accessTokenId: string;
}
export interface DeleteAccessTokenOutput {
  id: string;
  status: TokenStatus;
  deletedAt: Date;
}
export interface DeleteDNSViewInput {
  dnsViewId: string;
}
export interface DeleteDNSViewOutput {
  id: string;
  arn: string;
  clientToken?: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
}
export interface DeleteFirewallDomainListInput {
  firewallDomainListId: string;
}
export interface DeleteFirewallDomainListOutput {
  arn: string;
  id: string;
  name: string;
  status: CRResourceStatus;
}
export interface DeleteFirewallRuleInput {
  firewallRuleId: string;
}
export interface DeleteFirewallRuleOutput {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  confidenceThreshold?: ConfidenceThreshold;
  createdAt: Date;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  id: string;
  name: string;
  priority: number;
  dnsViewId: string;
  queryType?: string;
  status: CRResourceStatus;
  updatedAt: Date;
}
export interface DeleteGlobalResolverInput {
  globalResolverId: string;
}
export interface DeleteGlobalResolverOutput {
  id: string;
  arn: string;
  clientToken: string;
  dnsName: string;
  observabilityRegion?: string;
  name: string;
  description?: string;
  regions: string[];
  createdAt: Date;
  updatedAt: Date;
  status: CRResourceStatus;
  ipv4Addresses: string[];
  ipv6Addresses?: string[];
  ipAddressType?: GlobalResolverIpAddressType;
}
export interface DisableDNSViewInput {
  dnsViewId: string;
}
export interface DisableDNSViewOutput {
  id: string;
  arn: string;
  clientToken?: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
}
export interface DisassociateHostedZoneInput {
  hostedZoneId: string;
  resourceArn: string;
}
export interface DisassociateHostedZoneOutput {
  id: string;
  resourceArn: string;
  hostedZoneId: string;
  hostedZoneName: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: HostedZoneAssociationStatus;
}
export interface EnableDNSViewInput {
  dnsViewId: string;
}
export interface EnableDNSViewOutput {
  id: string;
  arn: string;
  clientToken?: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
}
export interface GetAccessSourceInput {
  accessSourceId: string;
}
export interface GetAccessSourceOutput {
  arn: string;
  cidr: string;
  createdAt: Date;
  id: string;
  ipAddressType: IpAddressType;
  name?: string;
  dnsViewId: string;
  protocol: DnsProtocol;
  status: CRResourceStatus;
  updatedAt: Date;
}
export interface GetAccessTokenInput {
  accessTokenId: string;
}
export interface GetAccessTokenOutput {
  id: string;
  arn: string;
  clientToken?: string;
  createdAt: Date;
  dnsViewId: string;
  expiresAt: Date;
  globalResolverId: string;
  name?: string;
  status: TokenStatus;
  updatedAt: Date;
  value: string | redacted.Redacted<string>;
}
export interface GetDNSViewInput {
  dnsViewId: string;
}
export interface GetDNSViewOutput {
  id: string;
  arn: string;
  clientToken?: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
}
export interface GetFirewallDomainListInput {
  firewallDomainListId: string;
}
export interface GetFirewallDomainListOutput {
  arn: string;
  globalResolverId: string;
  clientToken?: string;
  createdAt: Date;
  description?: string;
  domainCount: number;
  id: string;
  name: string;
  status: CRResourceStatus;
  statusMessage?: string;
  updatedAt: Date;
}
export interface GetFirewallRuleInput {
  firewallRuleId: string;
}
export interface GetFirewallRuleOutput {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  confidenceThreshold?: ConfidenceThreshold;
  createdAt: Date;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  id: string;
  name: string;
  priority: number;
  dnsViewId: string;
  queryType?: string;
  status: CRResourceStatus;
  updatedAt: Date;
}
export interface GetGlobalResolverInput {
  globalResolverId: string;
}
export interface GetGlobalResolverOutput {
  id: string;
  arn: string;
  clientToken: string;
  dnsName: string;
  observabilityRegion?: string;
  name: string;
  description?: string;
  regions: string[];
  createdAt: Date;
  updatedAt: Date;
  status: CRResourceStatus;
  ipv4Addresses: string[];
  ipv6Addresses?: string[];
  ipAddressType?: GlobalResolverIpAddressType;
}
export interface GetHostedZoneAssociationInput {
  hostedZoneAssociationId: string;
}
export interface GetHostedZoneAssociationOutput {
  id: string;
  resourceArn: string;
  hostedZoneId: string;
  hostedZoneName: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: HostedZoneAssociationStatus;
}
export interface GetManagedFirewallDomainListInput {
  managedFirewallDomainListId: string;
}
export interface GetManagedFirewallDomainListOutput {
  description?: string;
  id: string;
  name: string;
  managedListType: string;
}
export interface ImportFirewallDomainsInput {
  domainFileUrl: string;
  firewallDomainListId: string;
  operation: string;
}
export interface ImportFirewallDomainsOutput {
  id: string;
  name: string;
  status: CRResourceStatus;
}
export type Strings = string[];
export type Filters = { [key: string]: string[] | undefined };
export interface ListAccessSourcesInput {
  maxResults?: number;
  nextToken?: string;
  filters?: { [key: string]: string[] | undefined };
}
export interface AccessSourcesItem {
  arn: string;
  cidr: string;
  createdAt: Date;
  id: string;
  ipAddressType: IpAddressType;
  name?: string;
  dnsViewId: string;
  protocol: DnsProtocol;
  status: CRResourceStatus;
  updatedAt: Date;
}
export type AccessSources = AccessSourcesItem[];
export interface ListAccessSourcesOutput {
  nextToken?: string;
  accessSources: AccessSourcesItem[];
}
export interface ListAccessTokensInput {
  maxResults?: number;
  nextToken?: string;
  dnsViewId: string;
  filters?: { [key: string]: string[] | undefined };
}
export interface AccessTokenItem {
  id: string;
  arn: string;
  createdAt: Date;
  dnsViewId: string;
  expiresAt: Date;
  globalResolverId: string;
  name?: string;
  status: TokenStatus;
  updatedAt: Date;
}
export type AccessTokens = AccessTokenItem[];
export interface ListAccessTokensOutput {
  nextToken?: string;
  accessTokens?: AccessTokenItem[];
}
export interface ListDNSViewsInput {
  maxResults?: number;
  nextToken?: string;
  globalResolverId: string;
}
export interface DNSViewSummary {
  id: string;
  arn: string;
  clientToken: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
}
export type DNSViews = DNSViewSummary[];
export interface ListDNSViewsOutput {
  nextToken?: string;
  dnsViews: DNSViewSummary[];
}
export interface ListFirewallDomainListsInput {
  maxResults?: number;
  nextToken?: string;
  globalResolverId?: string;
}
export interface FirewallDomainListsItem {
  arn: string;
  globalResolverId: string;
  createdAt: Date;
  description?: string;
  id: string;
  name: string;
  status: CRResourceStatus;
  updatedAt: Date;
}
export type FirewallDomainLists = FirewallDomainListsItem[];
export interface ListFirewallDomainListsOutput {
  nextToken?: string;
  firewallDomainLists: FirewallDomainListsItem[];
}
export interface ListFirewallDomainsInput {
  maxResults?: number;
  nextToken?: string;
  firewallDomainListId: string;
}
export type Domains = string[];
export interface ListFirewallDomainsOutput {
  nextToken?: string;
  domains: string[];
}
export interface ListFirewallRulesInput {
  maxResults?: number;
  nextToken?: string;
  dnsViewId: string;
  filters?: { [key: string]: string[] | undefined };
}
export interface FirewallRulesItem {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  confidenceThreshold?: ConfidenceThreshold;
  createdAt: Date;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  id: string;
  name: string;
  priority: number;
  dnsViewId: string;
  queryType?: string;
  status: CRResourceStatus;
  updatedAt: Date;
}
export type FirewallRules = FirewallRulesItem[];
export interface ListFirewallRulesOutput {
  nextToken?: string;
  firewallRules: FirewallRulesItem[];
}
export interface ListGlobalResolversInput {
  maxResults?: number;
  nextToken?: string;
}
export interface GlobalResolversItem {
  id: string;
  arn: string;
  clientToken: string;
  dnsName: string;
  observabilityRegion?: string;
  name: string;
  description?: string;
  regions: string[];
  createdAt: Date;
  updatedAt: Date;
  status: CRResourceStatus;
  ipv4Addresses: string[];
  ipv6Addresses?: string[];
  ipAddressType?: GlobalResolverIpAddressType;
}
export type GlobalResolvers = GlobalResolversItem[];
export interface ListGlobalResolversOutput {
  nextToken?: string;
  globalResolvers: GlobalResolversItem[];
}
export interface ListHostedZoneAssociationsInput {
  maxResults?: number;
  nextToken?: string;
  resourceArn?: string;
}
export interface HostedZoneAssociationSummary {
  id: string;
  resourceArn: string;
  hostedZoneId: string;
  hostedZoneName: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: HostedZoneAssociationStatus;
}
export type HostedZoneAssociations = HostedZoneAssociationSummary[];
export interface ListHostedZoneAssociationsOutput {
  nextToken?: string;
  hostedZoneAssociations: HostedZoneAssociationSummary[];
}
export interface ListManagedFirewallDomainListsInput {
  maxResults?: number;
  nextToken?: string;
  managedFirewallDomainListType: string;
}
export interface ManagedFirewallDomainListsItem {
  description?: string;
  id: string;
  name: string;
  managedListType: string;
}
export type ManagedFirewallDomainLists = ManagedFirewallDomainListsItem[];
export interface ListManagedFirewallDomainListsOutput {
  nextToken?: string;
  managedFirewallDomainLists: ManagedFirewallDomainListsItem[];
}
export interface ListSharedDNSViewsInput {
  maxResults?: number;
  nextToken?: string;
}
export type AccountId = string;
export interface SharedDNSViewSummary {
  id: string;
  arn: string;
  clientToken: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
  ownerAccountId: string;
}
export type SharedDNSViews = SharedDNSViewSummary[];
export interface ListSharedDNSViewsOutput {
  nextToken?: string;
  dnsViews: SharedDNSViewSummary[];
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAccessSourceInput {
  accessSourceId: string;
  cidr?: string;
  ipAddressType?: IpAddressType;
  name?: string;
  protocol?: DnsProtocol;
}
export interface UpdateAccessSourceOutput {
  arn: string;
  cidr: string;
  createdAt: Date;
  id: string;
  ipAddressType: IpAddressType;
  name?: string;
  dnsViewId: string;
  protocol: DnsProtocol;
  status: CRResourceStatus;
  updatedAt: Date;
}
export interface UpdateAccessTokenInput {
  accessTokenId: string;
  name: string;
}
export interface UpdateAccessTokenOutput {
  id: string;
  name: string;
}
export interface UpdateDNSViewInput {
  dnsViewId: string;
  name?: string;
  description?: string;
  dnssecValidation?: DnsSecValidationType;
  ednsClientSubnet?: EdnsClientSubnetType;
  firewallRulesFailOpen?: FirewallRulesFailOpenType;
}
export interface UpdateDNSViewOutput {
  id: string;
  arn: string;
  clientToken?: string;
  dnssecValidation: DnsSecValidationType;
  ednsClientSubnet: EdnsClientSubnetType;
  firewallRulesFailOpen: FirewallRulesFailOpenType;
  name: string;
  description?: string;
  globalResolverId: string;
  createdAt: Date;
  updatedAt: Date;
  status: ProfileResourceStatus;
}
export interface UpdateFirewallDomainsInput {
  domains: string[];
  firewallDomainListId: string;
  operation: string;
}
export interface UpdateFirewallDomainsOutput {
  id: string;
  name: string;
  status: CRResourceStatus;
}
export interface UpdateFirewallRuleInput {
  action?: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  clientToken: string;
  confidenceThreshold?: ConfidenceThreshold;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallRuleId: string;
  name?: string;
  priority?: number;
}
export interface UpdateFirewallRuleOutput {
  action: FirewallRuleAction;
  blockOverrideDnsType?: BlockOverrideDnsQueryType;
  blockOverrideDomain?: string;
  blockOverrideTtl?: number;
  blockResponse?: FirewallBlockResponse;
  confidenceThreshold?: ConfidenceThreshold;
  createdAt: Date;
  description?: string;
  dnsAdvancedProtection?: DnsAdvancedProtection;
  firewallDomainListId?: string;
  id: string;
  name: string;
  priority: number;
  dnsViewId: string;
  queryType?: string;
  status: CRResourceStatus;
  updatedAt: Date;
}
export interface UpdateGlobalResolverInput {
  globalResolverId: string;
  name?: string;
  observabilityRegion?: string;
  description?: string;
  ipAddressType?: GlobalResolverIpAddressType;
  regions?: string[];
}
export interface UpdateGlobalResolverOutput {
  id: string;
  arn: string;
  clientToken: string;
  dnsName: string;
  observabilityRegion?: string;
  name: string;
  description?: string;
  regions: string[];
  createdAt: Date;
  updatedAt: Date;
  status: CRResourceStatus;
  ipv4Addresses: string[];
  ipv6Addresses?: string[];
  ipAddressType?: GlobalResolverIpAddressType;
}
export interface UpdateHostedZoneAssociationInput {
  hostedZoneAssociationId: string;
  name?: string;
}
export interface UpdateHostedZoneAssociationOutput {
  id: string;
  resourceArn: string;
  hostedZoneId: string;
  hostedZoneName: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  status: HostedZoneAssociationStatus;
}
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateHostedZoneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a Route 53 private hosted zone with a Route 53 Global Resolver resource. This allows the resolver to resolve DNS queries for the private hosted zone from anywhere globally.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const associateHostedZone: API.OperationMethod<
  AssociateHostedZoneInput,
  AssociateHostedZoneOutput,
  AssociateHostedZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /hosted-zone-associations/{hostedZoneId}",
    input: { hostedZoneId: 0, resourceArn: 0, name: 0 },
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
  operationName: "AssociateHostedZone",
})) as any;

export type BatchCreateFirewallRuleError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates multiple DNS firewall rules in a single operation. This is more efficient than creating rules individually when you need to set up multiple rules at once.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const batchCreateFirewallRule: API.OperationMethod<
  BatchCreateFirewallRuleInput,
  BatchCreateFirewallRuleOutput,
  BatchCreateFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /firewall-rules/batch-create",
    input: {
      firewallRules: D.list({
        action: 0,
        blockOverrideDnsType: 0,
        blockOverrideDomain: 0,
        blockOverrideTtl: 0,
        blockResponse: 0,
        clientToken: 0,
        confidenceThreshold: 0,
        description: 0,
        dnsAdvancedProtection: 0,
        firewallDomainListId: 0,
        name: 0,
        priority: 0,
        dnsViewId: 0,
        qType: 0,
      }),
    },
    output: {
      failures: D.list(o_BatchCreateFirewallRuleOutputItem),
      successes: D.list(o_BatchCreateFirewallRuleOutputItem),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateFirewallRule",
})) as any;

export type BatchDeleteFirewallRuleError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes multiple DNS firewall rules in a single operation. This is more efficient than deleting rules individually.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const batchDeleteFirewallRule: API.OperationMethod<
  BatchDeleteFirewallRuleInput,
  BatchDeleteFirewallRuleOutput,
  BatchDeleteFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /firewall-rules/batch-delete",
    input: { firewallRules: D.list({ firewallRuleId: 0 }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteFirewallRule",
})) as any;

export type BatchUpdateFirewallRuleError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple DNS firewall rules in a single operation. This is more efficient than updating rules individually.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const batchUpdateFirewallRule: API.OperationMethod<
  BatchUpdateFirewallRuleInput,
  BatchUpdateFirewallRuleOutput,
  BatchUpdateFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /firewall-rules/batch-update",
    input: {
      firewallRules: D.list({
        action: 0,
        blockOverrideDnsType: 0,
        blockOverrideDomain: 0,
        blockOverrideTtl: 0,
        blockResponse: 0,
        confidenceThreshold: 0,
        description: 0,
        dnsAdvancedProtection: 0,
        firewallRuleId: 0,
        name: 0,
        priority: 0,
      }),
    },
    output: {
      failures: D.list(o_BatchUpdateFirewallRuleOutputItem),
      successes: D.list(o_BatchUpdateFirewallRuleOutputItem),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateFirewallRule",
})) as any;

export type CreateAccessSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an access source for a DNS view. Access sources define IP addresses or CIDR ranges that are allowed to send DNS queries to the Route 53 Global Resolver, along with the permitted DNS protocols.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const createAccessSource: API.OperationMethod<
  CreateAccessSourceInput,
  CreateAccessSourceOutput,
  CreateAccessSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /access-sources",
    input: {
      cidr: 0,
      clientToken: D.m({ idempotency: true }),
      ipAddressType: 0,
      name: 0,
      dnsViewId: 0,
      protocol: 0,
      tags: 0,
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
  operationName: "CreateAccessSource",
})) as any;

export type CreateAccessTokenError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an access token for a DNS view. Access tokens provide token-based authentication for DNS-over-HTTPS (DoH) and DNS-over-TLS (DoT) connections to the Route 53 Global Resolver.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const createAccessToken: API.OperationMethod<
  CreateAccessTokenInput,
  CreateAccessTokenOutput,
  CreateAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tokens/{dnsViewId}",
    input: {
      clientToken: D.m({ idempotency: true }),
      dnsViewId: 0,
      expiresAt: D.tsAs("date-time"),
      name: 0,
      tags: 0,
    },
    output: { createdAt: D.ts, expiresAt: D.ts, value: D.secret },
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
  operationName: "CreateAccessToken",
})) as any;

export type CreateDNSViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a DNS view within a Route 53 Global Resolver. A DNS view models end users, user groups, networks, and devices, and serves as a parent resource that holds configurations controlling access, authorization, DNS firewall rules, and forwarding rules.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const createDNSView: API.OperationMethod<
  CreateDNSViewInput,
  CreateDNSViewOutput,
  CreateDNSViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /dns-views/{globalResolverId}",
    input: {
      globalResolverId: 0,
      clientToken: D.m({ idempotency: true }),
      name: 0,
      dnssecValidation: 0,
      ednsClientSubnet: 0,
      firewallRulesFailOpen: 0,
      description: 0,
      tags: 0,
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
  operationName: "CreateDNSView",
})) as any;

export type CreateFirewallDomainListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a firewall domain list. Domain lists are reusable sets of domain specifications that you use in DNS firewall rules to allow, block, or alert on DNS queries to specific domains.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const createFirewallDomainList: API.OperationMethod<
  CreateFirewallDomainListInput,
  CreateFirewallDomainListOutput,
  CreateFirewallDomainListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /firewall-domain-lists/{globalResolverId}",
    input: {
      clientToken: D.m({ idempotency: true }),
      globalResolverId: 0,
      description: 0,
      name: 0,
      tags: 0,
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
  operationName: "CreateFirewallDomainList",
})) as any;

export type CreateFirewallRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a DNS firewall rule. Firewall rules define actions (ALLOW, BLOCK, or ALERT) to take on DNS queries that match specified domain lists, managed domain lists, or advanced threat protections.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const createFirewallRule: API.OperationMethod<
  CreateFirewallRuleInput,
  CreateFirewallRuleOutput,
  CreateFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /firewall-rules",
    input: {
      action: 0,
      blockOverrideDnsType: 0,
      blockOverrideDomain: 0,
      blockOverrideTtl: 0,
      blockResponse: 0,
      clientToken: D.m({ idempotency: true }),
      confidenceThreshold: 0,
      description: 0,
      dnsAdvancedProtection: 0,
      firewallDomainListId: 0,
      name: 0,
      priority: 0,
      dnsViewId: 0,
      qType: 0,
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
  operationName: "CreateFirewallRule",
})) as any;

export type CreateGlobalResolverError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Route 53 Global Resolver instance. A Route 53 Global Resolver is a global, internet-accessible DNS resolver that provides secure DNS resolution for both public and private domains through global anycast IP addresses.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const createGlobalResolver: API.OperationMethod<
  CreateGlobalResolverInput,
  CreateGlobalResolverOutput,
  CreateGlobalResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /global-resolver",
    input: {
      clientToken: D.m({ idempotency: true }),
      description: 0,
      ipAddressType: 0,
      name: 0,
      observabilityRegion: 0,
      regions: 0,
      tags: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGlobalResolver",
})) as any;

export type DeleteAccessSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an access source. This operation cannot be undone.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const deleteAccessSource: API.OperationMethod<
  DeleteAccessSourceInput,
  DeleteAccessSourceOutput,
  DeleteAccessSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /access-sources/{accessSourceId}",
    input: { accessSourceId: 0 },
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
  operationName: "DeleteAccessSource",
})) as any;

export type DeleteAccessTokenError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an access token. This operation cannot be undone.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const deleteAccessToken: API.OperationMethod<
  DeleteAccessTokenInput,
  DeleteAccessTokenOutput,
  DeleteAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tokens/{accessTokenId}",
    input: { accessTokenId: 0 },
    output: { deletedAt: D.ts },
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
  operationName: "DeleteAccessToken",
})) as any;

export type DeleteDNSViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a DNS view. This operation cannot be undone.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const deleteDNSView: API.OperationMethod<
  DeleteDNSViewInput,
  DeleteDNSViewOutput,
  DeleteDNSViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /dns-views/{dnsViewId}",
    input: { dnsViewId: 0 },
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
  operationName: "DeleteDNSView",
})) as any;

export type DeleteFirewallDomainListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a firewall domain list. This operation cannot be undone.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const deleteFirewallDomainList: API.OperationMethod<
  DeleteFirewallDomainListInput,
  DeleteFirewallDomainListOutput,
  DeleteFirewallDomainListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /firewall-domain-lists/{firewallDomainListId}",
    input: { firewallDomainListId: 0 },
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
  operationName: "DeleteFirewallDomainList",
})) as any;

export type DeleteFirewallRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a DNS firewall rule. This operation cannot be undone.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const deleteFirewallRule: API.OperationMethod<
  DeleteFirewallRuleInput,
  DeleteFirewallRuleOutput,
  DeleteFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /firewall-rules/{firewallRuleId}",
    input: { firewallRuleId: 0 },
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
  operationName: "DeleteFirewallRule",
})) as any;

export type DeleteGlobalResolverError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Route 53 Global Resolver instance. This operation cannot be undone. All associated DNS views, access sources, tokens, and firewall rules are also deleted.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const deleteGlobalResolver: API.OperationMethod<
  DeleteGlobalResolverInput,
  DeleteGlobalResolverOutput,
  DeleteGlobalResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /global-resolver/{globalResolverId}",
    input: { globalResolverId: 0 },
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
  operationName: "DeleteGlobalResolver",
})) as any;

export type DisableDNSViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disables a DNS view, preventing it from serving DNS queries.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const disableDNSView: API.OperationMethod<
  DisableDNSViewInput,
  DisableDNSViewOutput,
  DisableDNSViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /dns-views/{dnsViewId}/disable",
    input: { dnsViewId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "DisableDNSView",
})) as any;

export type DisassociateHostedZoneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a Route 53 private hosted zone from a Route 53 Global Resolver resource.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const disassociateHostedZone: API.OperationMethod<
  DisassociateHostedZoneInput,
  DisassociateHostedZoneOutput,
  DisassociateHostedZoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /hosted-zone-associations/hosted-zone/{hostedZoneId}/resource-arn/{resourceArn+}",
    input: { hostedZoneId: 0, resourceArn: 0 },
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
  operationName: "DisassociateHostedZone",
})) as any;

export type EnableDNSViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables a disabled DNS view, allowing it to serve DNS queries again.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const enableDNSView: API.OperationMethod<
  EnableDNSViewInput,
  EnableDNSViewOutput,
  EnableDNSViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /dns-views/{dnsViewId}/enable",
    input: { dnsViewId: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "EnableDNSView",
})) as any;

export type GetAccessSourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an access source.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getAccessSource: API.OperationMethod<
  GetAccessSourceInput,
  GetAccessSourceOutput,
  GetAccessSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /access-sources/{accessSourceId}",
    input: { accessSourceId: 0 },
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
  operationName: "GetAccessSource",
})) as any;

export type GetAccessTokenError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an access token.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getAccessToken: API.OperationMethod<
  GetAccessTokenInput,
  GetAccessTokenOutput,
  GetAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tokens/{accessTokenId}",
    input: { accessTokenId: 0 },
    output: {
      createdAt: D.ts,
      expiresAt: D.ts,
      updatedAt: D.ts,
      value: D.secret,
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
  operationName: "GetAccessToken",
})) as any;

export type GetDNSViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a DNS view.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getDNSView: API.OperationMethod<
  GetDNSViewInput,
  GetDNSViewOutput,
  GetDNSViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /dns-views/{dnsViewId}",
    input: { dnsViewId: 0 },
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
  operationName: "GetDNSView",
})) as any;

export type GetFirewallDomainListError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a firewall domain list.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getFirewallDomainList: API.OperationMethod<
  GetFirewallDomainListInput,
  GetFirewallDomainListOutput,
  GetFirewallDomainListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /firewall-domain-lists/{firewallDomainListId}",
    input: { firewallDomainListId: 0 },
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
  operationName: "GetFirewallDomainList",
})) as any;

export type GetFirewallRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a DNS firewall rule.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getFirewallRule: API.OperationMethod<
  GetFirewallRuleInput,
  GetFirewallRuleOutput,
  GetFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /firewall-rules/{firewallRuleId}",
    input: { firewallRuleId: 0 },
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
  operationName: "GetFirewallRule",
})) as any;

export type GetGlobalResolverError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a Route 53 Global Resolver instance.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getGlobalResolver: API.OperationMethod<
  GetGlobalResolverInput,
  GetGlobalResolverOutput,
  GetGlobalResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-resolver/{globalResolverId}",
    input: { globalResolverId: 0 },
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
  operationName: "GetGlobalResolver",
})) as any;

export type GetHostedZoneAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a hosted zone association.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getHostedZoneAssociation: API.OperationMethod<
  GetHostedZoneAssociationInput,
  GetHostedZoneAssociationOutput,
  GetHostedZoneAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /hosted-zone-associations/{hostedZoneAssociationId}",
    input: { hostedZoneAssociationId: 0 },
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
  operationName: "GetHostedZoneAssociation",
})) as any;

export type GetManagedFirewallDomainListError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an Amazon Web Services-managed firewall domain list. Managed domain lists contain domains associated with malicious activity, content categories, or specific threats.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const getManagedFirewallDomainList: API.OperationMethod<
  GetManagedFirewallDomainListInput,
  GetManagedFirewallDomainListOutput,
  GetManagedFirewallDomainListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /managed-firewall-domain-lists/{managedFirewallDomainListId}",
    input: { managedFirewallDomainListId: 0 },
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
  operationName: "GetManagedFirewallDomainList",
})) as any;

export type ImportFirewallDomainsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Imports a list of domains from an Amazon S3 file into a firewall domain list. The file should contain one domain per line.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const importFirewallDomains: API.OperationMethod<
  ImportFirewallDomainsInput,
  ImportFirewallDomainsOutput,
  ImportFirewallDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /firewall-domain-lists/{firewallDomainListId}/domains/s3_file_url",
    input: { domainFileUrl: 0, firewallDomainListId: 0, operation: 0 },
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
  operationName: "ImportFirewallDomains",
})) as any;

export type ListAccessSourcesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all access sources with pagination support.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listAccessSources: API.PaginatedOperationMethod<
  ListAccessSourcesInput,
  ListAccessSourcesOutput,
  ListAccessSourcesError,
  Credentials | HttpClient.HttpClient,
  AccessSourcesItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /access-sources",
    input: {
      maxResults: D.m({ query: "max_results" }),
      nextToken: D.m({ query: "next_token" }),
      filters: D.m({ queryParams: true }),
    },
    output: { accessSources: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accessSources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAccessTokensError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all access tokens for a DNS view with pagination support.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listAccessTokens: API.PaginatedOperationMethod<
  ListAccessTokensInput,
  ListAccessTokensOutput,
  ListAccessTokensError,
  Credentials | HttpClient.HttpClient,
  AccessTokenItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /tokens/dns-view/{dnsViewId}",
    input: {
      maxResults: D.m({ query: "max_results" }),
      nextToken: D.m({ query: "next_token" }),
      dnsViewId: 0,
      filters: D.m({ queryParams: true }),
    },
    output: {
      accessTokens: D.list({
        createdAt: D.ts,
        expiresAt: D.ts,
        updatedAt: D.ts,
      }),
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
  operationName: "ListAccessTokens",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "accessTokens",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDNSViewsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all DNS views for a Route 53 Global Resolver with pagination support.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listDNSViews: API.PaginatedOperationMethod<
  ListDNSViewsInput,
  ListDNSViewsOutput,
  ListDNSViewsError,
  Credentials | HttpClient.HttpClient,
  DNSViewSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /dns-views/resolver/{globalResolverId}",
    input: {
      maxResults: D.m({ query: "max_results" }),
      nextToken: D.m({ query: "next_token" }),
      globalResolverId: 0,
    },
    output: { dnsViews: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
  operationName: "ListDNSViews",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dnsViews",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFirewallDomainListsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all firewall domain lists for a Route 53 Global Resolver with pagination support.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listFirewallDomainLists: API.PaginatedOperationMethod<
  ListFirewallDomainListsInput,
  ListFirewallDomainListsOutput,
  ListFirewallDomainListsError,
  Credentials | HttpClient.HttpClient,
  FirewallDomainListsItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /firewall-domain-lists",
    input: {
      maxResults: D.m({ query: "max_results" }),
      nextToken: D.m({ query: "next_token" }),
      globalResolverId: D.m({ query: "global_resolver_id" }),
    },
    output: {
      firewallDomainLists: D.list({ createdAt: D.ts, updatedAt: D.ts }),
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
  operationName: "ListFirewallDomainLists",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "firewallDomainLists",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFirewallDomainsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the domains in DNS Firewall domain list you have created.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listFirewallDomains: API.PaginatedOperationMethod<
  ListFirewallDomainsInput,
  ListFirewallDomainsOutput,
  ListFirewallDomainsError,
  Credentials | HttpClient.HttpClient,
  Domain
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /firewall-domain-lists/{firewallDomainListId}/domains",
    input: {
      maxResults: D.m({ query: "max_results" }),
      nextToken: D.m({ query: "next_token" }),
      firewallDomainListId: 0,
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
  operationName: "ListFirewallDomains",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "domains",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFirewallRulesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all DNS firewall rules for a DNS view with pagination support.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listFirewallRules: API.PaginatedOperationMethod<
  ListFirewallRulesInput,
  ListFirewallRulesOutput,
  ListFirewallRulesError,
  Credentials | HttpClient.HttpClient,
  FirewallRulesItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /firewall-rules",
    input: {
      maxResults: D.m({ query: "max_results" }),
      nextToken: D.m({ query: "next_token" }),
      dnsViewId: D.m({ query: "dnsview_id" }),
      filters: D.m({ queryParams: true }),
    },
    output: { firewallRules: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
  operationName: "ListFirewallRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "firewallRules",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListGlobalResolversError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Route 53 Global Resolver instances in your account with pagination support.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listGlobalResolvers: API.PaginatedOperationMethod<
  ListGlobalResolversInput,
  ListGlobalResolversOutput,
  ListGlobalResolversError,
  Credentials | HttpClient.HttpClient,
  GlobalResolversItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /global-resolver",
    input: {
      maxResults: D.m({ query: "max_results" }),
      nextToken: D.m({ query: "next_token" }),
    },
    output: { globalResolvers: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGlobalResolvers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "globalResolvers",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListHostedZoneAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists hosted zone associations with pagination support. Specify a DNS view through the `resourceArn` parameter to list the hosted zone associations for that DNS view, or omit it to list all hosted zone associations in your Amazon Web Services account.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listHostedZoneAssociations: API.PaginatedOperationMethod<
  ListHostedZoneAssociationsInput,
  ListHostedZoneAssociationsOutput,
  ListHostedZoneAssociationsError,
  Credentials | HttpClient.HttpClient,
  HostedZoneAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /hosted-zone-associations",
    input: {
      maxResults: D.m({ query: "max_results" }),
      nextToken: D.m({ query: "next_token" }),
      resourceArn: D.m({ query: "resourceArn" }),
    },
    output: {
      hostedZoneAssociations: D.list({ createdAt: D.ts, updatedAt: D.ts }),
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
  operationName: "ListHostedZoneAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "hostedZoneAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListManagedFirewallDomainListsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of the Amazon Web Services Managed DNS Lists and the categories for DNS Firewall. The categories are either `THREAT` or `CONTENT`.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listManagedFirewallDomainLists: API.PaginatedOperationMethod<
  ListManagedFirewallDomainListsInput,
  ListManagedFirewallDomainListsOutput,
  ListManagedFirewallDomainListsError,
  Credentials | HttpClient.HttpClient,
  ManagedFirewallDomainListsItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /list-managed-firewall-domain-lists/{managedFirewallDomainListType}",
    input: {
      maxResults: D.m({ query: "max_results" }),
      nextToken: D.m({ query: "next_token" }),
      managedFirewallDomainListType: 0,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListManagedFirewallDomainLists",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "managedFirewallDomainLists",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSharedDNSViewsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the DNS views that have been shared with your Amazon Web Services account through Amazon Web Services Resource Access Manager (Amazon Web Services RAM), with pagination support.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listSharedDNSViews: API.PaginatedOperationMethod<
  ListSharedDNSViewsInput,
  ListSharedDNSViewsOutput,
  ListSharedDNSViewsError,
  Credentials | HttpClient.HttpClient,
  SharedDNSViewSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /shared-dns-views",
    input: {
      maxResults: D.m({ query: "max_results" }),
      nextToken: D.m({ query: "next_token" }),
    },
    output: { dnsViews: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSharedDNSViews",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dnsViews",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Lists the tags associated with a Route 53 Global Resolver resource.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /get-all-tags",
    input: { resourceArn: 0 },
    body: true,
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates tags for a Route 53 Global Resolver resource. Tags are key-value pairs that help you organize and identify your resources.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tag-resource",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a Route 53 Global Resolver resource.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /untag-resource",
    input: { resourceArn: 0, tagKeys: 0 },
    body: true,
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAccessSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an access source.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const updateAccessSource: API.OperationMethod<
  UpdateAccessSourceInput,
  UpdateAccessSourceOutput,
  UpdateAccessSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /access-sources/{accessSourceId}",
    input: {
      accessSourceId: 0,
      cidr: 0,
      ipAddressType: 0,
      name: 0,
      protocol: 0,
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
  operationName: "UpdateAccessSource",
})) as any;

export type UpdateAccessTokenError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an access token.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const updateAccessToken: API.OperationMethod<
  UpdateAccessTokenInput,
  UpdateAccessTokenOutput,
  UpdateAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /tokens/{accessTokenId}",
    input: { accessTokenId: 0, name: 0 },
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
  operationName: "UpdateAccessToken",
})) as any;

export type UpdateDNSViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a DNS view.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const updateDNSView: API.OperationMethod<
  UpdateDNSViewInput,
  UpdateDNSViewOutput,
  UpdateDNSViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /dns-views/{dnsViewId}",
    input: {
      dnsViewId: 0,
      name: 0,
      description: 0,
      dnssecValidation: 0,
      ednsClientSubnet: 0,
      firewallRulesFailOpen: 0,
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
  operationName: "UpdateDNSView",
})) as any;

export type UpdateFirewallDomainsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a DNS Firewall domain list from an array of specified domains.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const updateFirewallDomains: API.OperationMethod<
  UpdateFirewallDomainsInput,
  UpdateFirewallDomainsOutput,
  UpdateFirewallDomainsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /firewall-domain-lists/{firewallDomainListId}/domains",
    input: { domains: 0, firewallDomainListId: 0, operation: 0 },
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
  operationName: "UpdateFirewallDomains",
})) as any;

export type UpdateFirewallRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a DNS firewall rule.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const updateFirewallRule: API.OperationMethod<
  UpdateFirewallRuleInput,
  UpdateFirewallRuleOutput,
  UpdateFirewallRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /firewall-rules/{firewallRuleId}",
    input: {
      action: 0,
      blockOverrideDnsType: 0,
      blockOverrideDomain: 0,
      blockOverrideTtl: 0,
      blockResponse: 0,
      clientToken: D.m({ idempotency: true }),
      confidenceThreshold: 0,
      description: 0,
      dnsAdvancedProtection: 0,
      firewallRuleId: 0,
      name: 0,
      priority: 0,
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
  operationName: "UpdateFirewallRule",
})) as any;

export type UpdateGlobalResolverError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a Route 53 Global Resolver instance. You can modify the name, description, and observability Region.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const updateGlobalResolver: API.OperationMethod<
  UpdateGlobalResolverInput,
  UpdateGlobalResolverOutput,
  UpdateGlobalResolverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /global-resolver/{globalResolverId}",
    input: {
      globalResolverId: 0,
      name: 0,
      observabilityRegion: 0,
      description: 0,
      ipAddressType: 0,
      regions: 0,
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
  operationName: "UpdateGlobalResolver",
})) as any;

export type UpdateHostedZoneAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a hosted zone association.
 *
 * Route 53 Global Resolver is a global service that supports resolvers in multiple Amazon Web Services Regions but you must specify the US East (Ohio) Region to create, update, or otherwise work with Route 53 Global Resolver resources. That is, for example, specify `--region us-east-2` on Amazon Web Services CLI commands.
 */
export const updateHostedZoneAssociation: API.OperationMethod<
  UpdateHostedZoneAssociationInput,
  UpdateHostedZoneAssociationOutput,
  UpdateHostedZoneAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /hosted-zone-associations/{hostedZoneAssociationId}",
    input: { hostedZoneAssociationId: 0, name: 0 },
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
  operationName: "UpdateHostedZoneAssociation",
})) as any;

const o_BatchCreateFirewallRuleOutputItem: D.LazyStruct = () => ({
  firewallRule: { createdAt: D.ts, updatedAt: D.ts },
});
const o_BatchUpdateFirewallRuleOutputItem: D.LazyStruct = () => ({
  firewallRule: { createdAt: D.ts, updatedAt: D.ts },
});
