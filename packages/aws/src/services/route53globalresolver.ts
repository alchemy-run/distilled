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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Route53GlobalResolver",
  serviceShapeName: "EC2DNSGlobalResolverCustomerAPI",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "route53globalresolver" });
const ver = /*@__PURE__*/ T.ServiceVersion("2022-09-27");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
const rules = /*@__PURE__*/ T.EndpointResolver(
  (p, _) => {
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
        return err("Invalid Configuration: FIPS and custom endpoint are not supported");
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
  '{"url":"https://route53globalresolver.{R}.api.aws","properties":{},"headers":{}}',
  [
    "cn-north-1",
    "cn-northwest-1",
    "aws-cn-global",
    "us-iso-east-1",
    "us-iso-west-1",
    "aws-iso-global",
    "us-isob-east-1",
    "aws-iso-b-global",
    "aws-iso-f-global",
    "us-isof-east-1",
    "us-isof-south-1",
    "eusc-de-east-1",
  ],
);

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: S.String,
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number).pipe(
        /*@__PURE__*/ T.HttpHeader("Retry-After"),
      ),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(441, __c55, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type HostedZoneAssociationStatus = "CREATING" | "OPERATIONAL" | "DELETING" | (string & {});
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
export type FirewallBlockResponse = "NODATA" | "NXDOMAIN" | "OVERRIDE" | (string & {});
export type ClientToken = string;
export type ConfidenceThreshold = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export type ResourceDescription = string;
export type DnsAdvancedProtection = "DGA" | "DNS_TUNNELING" | "DICTIONARY_DGA" | (string & {});
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
export type BatchCreateFirewallRuleInputItems = BatchCreateFirewallRuleInputItem[];
export interface BatchCreateFirewallRuleInput {
  firewallRules: BatchCreateFirewallRuleInputItem[];
}
export type CRResourceStatus = "CREATING" | "OPERATIONAL" | "UPDATING" | "DELETING" | (string & {});
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
export type BatchCreateFirewallRuleOutputItems = BatchCreateFirewallRuleOutputItem[];
export interface BatchCreateFirewallRuleOutput {
  failures: BatchCreateFirewallRuleOutputItem[];
  successes: BatchCreateFirewallRuleOutputItem[];
}
export interface BatchDeleteFirewallRuleInputItem {
  firewallRuleId: string;
}
export type BatchDeleteFirewallRuleInputItems = BatchDeleteFirewallRuleInputItem[];
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
export type BatchDeleteFirewallRuleOutputItems = BatchDeleteFirewallRuleOutputItem[];
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
export type BatchUpdateFirewallRuleInputItems = BatchUpdateFirewallRuleInputItem[];
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
export type BatchUpdateFirewallRuleOutputItems = BatchUpdateFirewallRuleOutputItem[];
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
export type TokenStatus = "CREATING" | "OPERATIONAL" | "DELETING" | (string & {});
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
  input: __S(448, __c56, 0) as any as S.Schema<AssociateHostedZoneInput>,
  output: __S(456, __c57, 0) as any as S.Schema<AssociateHostedZoneOutput>,
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
}));

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
  input: __S(466, __c58, 2) as any as S.Schema<BatchCreateFirewallRuleInput>,
  output: __S(470, __c58, 6) as any as S.Schema<BatchCreateFirewallRuleOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateFirewallRule",
}));

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
  input: __S(474, __c59, 2) as any as S.Schema<BatchDeleteFirewallRuleInput>,
  output: __S(478, __c59, 6) as any as S.Schema<BatchDeleteFirewallRuleOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteFirewallRule",
}));

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
  input: __S(2, __c0, 2) as any as S.Schema<BatchUpdateFirewallRuleInput>,
  output: __S(6, __c0, 6) as any as S.Schema<BatchUpdateFirewallRuleOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateFirewallRule",
}));

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
  input: __S(8, __c1, 0) as any as S.Schema<CreateAccessSourceInput>,
  output: __S(24, __c3, 0) as any as S.Schema<CreateAccessSourceOutput>,
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
}));

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
  input: __S(32, __c4, 0) as any as S.Schema<CreateAccessTokenInput>,
  output: __S(33, __c4, 1) as any as S.Schema<CreateAccessTokenOutput>,
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
}));

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
  input: __S(40, __c5, 0) as any as S.Schema<CreateDNSViewInput>,
  output: __S(48, __c6, 0) as any as S.Schema<CreateDNSViewOutput>,
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
}));

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
  input: __S(56, __c7, 0) as any as S.Schema<CreateFirewallDomainListInput>,
  output: __S(57, __c7, 1) as any as S.Schema<CreateFirewallDomainListOutput>,
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
}));

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
  input: __S(64, __c8, 0) as any as S.Schema<CreateFirewallRuleInput>,
  output: __S(72, __c9, 0) as any as S.Schema<CreateFirewallRuleOutput>,
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
}));

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
  input: __S(80, __c10, 0) as any as S.Schema<CreateGlobalResolverInput>,
  output: __S(81, __c10, 1) as any as S.Schema<CreateGlobalResolverOutput>,
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
}));

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
  input: __S(96, __c12, 0) as any as S.Schema<DeleteAccessSourceInput>,
  output: __S(24, __c3, 0) as any as S.Schema<DeleteAccessSourceOutput>,
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
}));

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
  input: __S(104, __c13, 0) as any as S.Schema<DeleteAccessTokenInput>,
  output: __S(105, __c13, 1) as any as S.Schema<DeleteAccessTokenOutput>,
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
}));

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
  input: __S(112, __c14, 0) as any as S.Schema<DeleteDNSViewInput>,
  output: __S(48, __c6, 0) as any as S.Schema<DeleteDNSViewOutput>,
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
}));

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
  input: __S(120, __c15, 0) as any as S.Schema<DeleteFirewallDomainListInput>,
  output: __S(121, __c15, 1) as any as S.Schema<DeleteFirewallDomainListOutput>,
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
}));

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
  input: __S(128, __c16, 0) as any as S.Schema<DeleteFirewallRuleInput>,
  output: __S(72, __c9, 0) as any as S.Schema<DeleteFirewallRuleOutput>,
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
}));

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
  input: __S(136, __c17, 0) as any as S.Schema<DeleteGlobalResolverInput>,
  output: __S(144, __c18, 0) as any as S.Schema<DeleteGlobalResolverOutput>,
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
}));

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
  input: __S(152, __c19, 0) as any as S.Schema<DisableDNSViewInput>,
  output: __S(48, __c6, 0) as any as S.Schema<DisableDNSViewOutput>,
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
}));

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
  input: __S(160, __c20, 0) as any as S.Schema<DisassociateHostedZoneInput>,
  output: __S(456, __c57, 0) as any as S.Schema<DisassociateHostedZoneOutput>,
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
}));

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
  input: __S(168, __c21, 0) as any as S.Schema<EnableDNSViewInput>,
  output: __S(48, __c6, 0) as any as S.Schema<EnableDNSViewOutput>,
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
}));

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
  input: __S(176, __c22, 0) as any as S.Schema<GetAccessSourceInput>,
  output: __S(24, __c3, 0) as any as S.Schema<GetAccessSourceOutput>,
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
}));

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
  input: __S(184, __c23, 0) as any as S.Schema<GetAccessTokenInput>,
  output: __S(185, __c23, 1) as any as S.Schema<GetAccessTokenOutput>,
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
}));

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
  input: __S(192, __c24, 0) as any as S.Schema<GetDNSViewInput>,
  output: __S(48, __c6, 0) as any as S.Schema<GetDNSViewOutput>,
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
}));

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
  input: __S(200, __c25, 0) as any as S.Schema<GetFirewallDomainListInput>,
  output: __S(201, __c25, 1) as any as S.Schema<GetFirewallDomainListOutput>,
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
}));

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
  input: __S(208, __c26, 0) as any as S.Schema<GetFirewallRuleInput>,
  output: __S(72, __c9, 0) as any as S.Schema<GetFirewallRuleOutput>,
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
}));

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
  input: __S(216, __c27, 0) as any as S.Schema<GetGlobalResolverInput>,
  output: __S(144, __c18, 0) as any as S.Schema<GetGlobalResolverOutput>,
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
}));

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
  input: __S(224, __c28, 0) as any as S.Schema<GetHostedZoneAssociationInput>,
  output: __S(456, __c57, 0) as any as S.Schema<GetHostedZoneAssociationOutput>,
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
}));

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
  input: __S(232, __c29, 0) as any as S.Schema<GetManagedFirewallDomainListInput>,
  output: __S(240, __c30, 0) as any as S.Schema<GetManagedFirewallDomainListOutput>,
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
}));

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
  input: __S(248, __c31, 0) as any as S.Schema<ImportFirewallDomainsInput>,
  output: __S(256, __c32, 0) as any as S.Schema<ImportFirewallDomainsOutput>,
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
}));

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
  input: __S(264, __c33, 0) as any as S.Schema<ListAccessSourcesInput>,
  output: __S(266, __c33, 2) as any as S.Schema<ListAccessSourcesOutput>,
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
  input: __S(280, __c35, 0) as any as S.Schema<ListAccessTokensInput>,
  output: __S(283, __c35, 3) as any as S.Schema<ListAccessTokensOutput>,
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
  input: __S(288, __c36, 0) as any as S.Schema<ListDNSViewsInput>,
  output: __S(291, __c36, 3) as any as S.Schema<ListDNSViewsOutput>,
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
  input: __S(296, __c37, 0) as any as S.Schema<ListFirewallDomainListsInput>,
  output: __S(299, __c37, 3) as any as S.Schema<ListFirewallDomainListsOutput>,
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
  input: __S(304, __c38, 0) as any as S.Schema<ListFirewallDomainsInput>,
  output: __S(305, __c38, 1) as any as S.Schema<ListFirewallDomainsOutput>,
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
  input: __S(312, __c39, 0) as any as S.Schema<ListFirewallRulesInput>,
  output: __S(314, __c39, 2) as any as S.Schema<ListFirewallRulesOutput>,
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
  input: __S(320, __c40, 0) as any as S.Schema<ListGlobalResolversInput>,
  output: __S(322, __c40, 2) as any as S.Schema<ListGlobalResolversOutput>,
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
  input: __S(328, __c41, 0) as any as S.Schema<ListHostedZoneAssociationsInput>,
  output: __S(330, __c41, 2) as any as S.Schema<ListHostedZoneAssociationsOutput>,
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
  input: __S(336, __c42, 0) as any as S.Schema<ListManagedFirewallDomainListsInput>,
  output: __S(338, __c42, 2) as any as S.Schema<ListManagedFirewallDomainListsOutput>,
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
  input: __S(344, __c43, 0) as any as S.Schema<ListSharedDNSViewsInput>,
  output: __S(347, __c43, 3) as any as S.Schema<ListSharedDNSViewsOutput>,
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
  input: __S(352, __c44, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(353, __c44, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(360, __c45, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(368, __c46, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ResourceNotFoundException, ServiceQuotaExceededException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | ValidationException | CommonErrors;
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
  input: __S(376, __c47, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(368, __c46, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(384, __c48, 0) as any as S.Schema<UpdateAccessSourceInput>,
  output: __S(24, __c3, 0) as any as S.Schema<UpdateAccessSourceOutput>,
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
}));

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
  input: __S(392, __c49, 0) as any as S.Schema<UpdateAccessTokenInput>,
  output: __S(393, __c49, 1) as any as S.Schema<UpdateAccessTokenOutput>,
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
}));

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
  input: __S(400, __c50, 0) as any as S.Schema<UpdateDNSViewInput>,
  output: __S(48, __c6, 0) as any as S.Schema<UpdateDNSViewOutput>,
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
}));

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
  input: __S(408, __c51, 0) as any as S.Schema<UpdateFirewallDomainsInput>,
  output: __S(256, __c32, 0) as any as S.Schema<UpdateFirewallDomainsOutput>,
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
}));

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
  input: __S(416, __c52, 0) as any as S.Schema<UpdateFirewallRuleInput>,
  output: __S(72, __c9, 0) as any as S.Schema<UpdateFirewallRuleOutput>,
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
}));

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
  input: __S(424, __c53, 0) as any as S.Schema<UpdateGlobalResolverInput>,
  output: __S(144, __c18, 0) as any as S.Schema<UpdateGlobalResolverOutput>,
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
}));

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
  input: __S(432, __c54, 0) as any as S.Schema<UpdateHostedZoneAssociationInput>,
  output: __S(456, __c57, 0) as any as S.Schema<UpdateHostedZoneAssociationOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          action: S.optional(S.String),
          blockOverrideDnsType: S.optional(S.String),
          blockOverrideDomain: S.optional(S.String),
          blockOverrideTtl: S.optional(S.Number),
          blockResponse: S.optional(S.String),
          confidenceThreshold: S.optional(S.String),
          description: S.optional(S.String),
          dnsAdvancedProtection: S.optional(S.String),
          firewallRuleId: S.String,
          name: S.optional(S.String),
          priority: S.optional(S.Number),
        }),
      ).annotate({ identifier: "BatchUpdateFirewallRuleInputItem" });
    case 1:
      return S.Array(__S(0, __c0, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ firewallRules: __S(1, __c0, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/firewall-rules/batch-update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateFirewallRuleInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          action: S.optional(S.String),
          blockOverrideDnsType: S.optional(S.String),
          blockOverrideDomain: S.optional(S.String),
          blockOverrideTtl: S.optional(S.Number),
          blockResponse: S.optional(S.String),
          clientToken: S.optional(S.String),
          confidenceThreshold: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          description: S.optional(S.String),
          dnsAdvancedProtection: S.optional(S.String),
          firewallDomainListId: S.optional(S.String),
          id: S.String,
          name: S.optional(S.String),
          priority: S.optional(S.Number),
          dnsViewId: S.optional(S.String),
          queryType: S.optional(S.String),
          status: S.optional(S.String),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "BatchUpdateFirewallRuleResult" });
    case 4:
      return S.suspend(() =>
        S.Struct({ firewallRule: __S(3, __c0, 3), code: S.Number, message: S.optional(S.String) }),
      ).annotate({ identifier: "BatchUpdateFirewallRuleOutputItem" });
    case 5:
      return S.Array(__S(4, __c0, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ failures: __S(5, __c0, 5), successes: __S(5, __c0, 5) }),
      ).annotate({ identifier: "BatchUpdateFirewallRuleOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          cidr: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ipAddressType: S.optional(S.String),
          name: S.optional(S.String),
          dnsViewId: S.String,
          protocol: S.String,
          tags: S.optional(__S(16, __c2, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/access-sources" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAccessSourceInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          cidr: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          id: S.String,
          ipAddressType: S.String,
          name: S.optional(S.String),
          dnsViewId: S.String,
          protocol: S.String,
          status: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateAccessSourceOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          dnsViewId: S.String.pipe(T.HttpLabel("dnsViewId")),
          expiresAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          name: S.optional(S.String),
          tags: S.optional(__S(16, __c2, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tokens/{dnsViewId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAccessTokenInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          clientToken: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          dnsViewId: S.String,
          expiresAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          name: S.optional(S.String),
          status: S.String,
          value: SensitiveString,
        }),
      ).annotate({ identifier: "CreateAccessTokenOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          globalResolverId: S.String.pipe(T.HttpLabel("globalResolverId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          name: S.String,
          dnssecValidation: S.optional(S.String),
          ednsClientSubnet: S.optional(S.String),
          firewallRulesFailOpen: S.optional(S.String),
          description: S.optional(S.String),
          tags: S.optional(__S(16, __c2, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/dns-views/{globalResolverId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDNSViewInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          clientToken: S.optional(S.String),
          dnssecValidation: S.String,
          ednsClientSubnet: S.String,
          firewallRulesFailOpen: S.String,
          name: S.String,
          description: S.optional(S.String),
          globalResolverId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
        }),
      ).annotate({ identifier: "CreateDNSViewOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          globalResolverId: S.String.pipe(T.HttpLabel("globalResolverId")),
          description: S.optional(S.String),
          name: S.String,
          tags: S.optional(__S(16, __c2, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/firewall-domain-lists/{globalResolverId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFirewallDomainListInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          globalResolverId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          description: S.optional(S.String),
          domainCount: S.Number,
          id: S.String,
          name: S.String,
          status: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateFirewallDomainListOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          action: S.String,
          blockOverrideDnsType: S.optional(S.String),
          blockOverrideDomain: S.optional(S.String),
          blockOverrideTtl: S.optional(S.Number),
          blockResponse: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          confidenceThreshold: S.optional(S.String),
          description: S.optional(S.String),
          dnsAdvancedProtection: S.optional(S.String),
          firewallDomainListId: S.optional(S.String),
          name: S.String,
          priority: S.optional(S.Number),
          dnsViewId: S.String,
          qType: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/firewall-rules" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateFirewallRuleInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          action: S.String,
          blockOverrideDnsType: S.optional(S.String),
          blockOverrideDomain: S.optional(S.String),
          blockOverrideTtl: S.optional(S.Number),
          blockResponse: S.optional(S.String),
          confidenceThreshold: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          description: S.optional(S.String),
          dnsAdvancedProtection: S.optional(S.String),
          firewallDomainListId: S.optional(S.String),
          id: S.String,
          name: S.String,
          priority: S.Number,
          dnsViewId: S.String,
          queryType: S.optional(S.String),
          status: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateFirewallRuleOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          description: S.optional(S.String),
          ipAddressType: S.optional(S.String),
          name: S.String,
          observabilityRegion: S.optional(S.String),
          regions: __S(88, __c11, 0),
          tags: S.optional(__S(16, __c2, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/global-resolver" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateGlobalResolverInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          clientToken: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          description: S.optional(S.String),
          dnsName: S.String,
          ipAddressType: S.optional(S.String),
          ipv4Addresses: __S(88, __c11, 0),
          ipv6Addresses: S.optional(__S(88, __c11, 0)),
          name: S.String,
          observabilityRegion: S.optional(S.String),
          regions: __S(88, __c11, 0),
          status: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateGlobalResolverOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accessSourceId: S.String.pipe(T.HttpLabel("accessSourceId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/access-sources/{accessSourceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAccessSourceInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accessTokenId: S.String.pipe(T.HttpLabel("accessTokenId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tokens/{accessTokenId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAccessTokenInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          status: S.String,
          deletedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "DeleteAccessTokenOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ dnsViewId: S.String.pipe(T.HttpLabel("dnsViewId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/dns-views/{dnsViewId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDNSViewInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ firewallDomainListId: S.String.pipe(T.HttpLabel("firewallDomainListId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/firewall-domain-lists/{firewallDomainListId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFirewallDomainListInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ arn: S.String, id: S.String, name: S.String, status: S.String }),
      ).annotate({ identifier: "DeleteFirewallDomainListOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ firewallRuleId: S.String.pipe(T.HttpLabel("firewallRuleId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/firewall-rules/{firewallRuleId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFirewallRuleInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ globalResolverId: S.String.pipe(T.HttpLabel("globalResolverId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/global-resolver/{globalResolverId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteGlobalResolverInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          clientToken: S.String,
          dnsName: S.String,
          observabilityRegion: S.optional(S.String),
          name: S.String,
          description: S.optional(S.String),
          regions: __S(88, __c11, 0),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
          ipv4Addresses: __S(88, __c11, 0),
          ipv6Addresses: S.optional(__S(88, __c11, 0)),
          ipAddressType: S.optional(S.String),
        }),
      ).annotate({ identifier: "DeleteGlobalResolverOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ dnsViewId: S.String.pipe(T.HttpLabel("dnsViewId")) }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/dns-views/{dnsViewId}/disable" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisableDNSViewInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          hostedZoneId: S.String.pipe(T.HttpLabel("hostedZoneId")),
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/hosted-zone-associations/hosted-zone/{hostedZoneId}/resource-arn/{resourceArn+}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateHostedZoneInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ dnsViewId: S.String.pipe(T.HttpLabel("dnsViewId")) }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/dns-views/{dnsViewId}/enable" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "EnableDNSViewInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accessSourceId: S.String.pipe(T.HttpLabel("accessSourceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/access-sources/{accessSourceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccessSourceInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accessTokenId: S.String.pipe(T.HttpLabel("accessTokenId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tokens/{accessTokenId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccessTokenInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          clientToken: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          dnsViewId: S.String,
          expiresAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          globalResolverId: S.String,
          name: S.optional(S.String),
          status: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          value: SensitiveString,
        }),
      ).annotate({ identifier: "GetAccessTokenOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ dnsViewId: S.String.pipe(T.HttpLabel("dnsViewId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/dns-views/{dnsViewId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDNSViewInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ firewallDomainListId: S.String.pipe(T.HttpLabel("firewallDomainListId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/firewall-domain-lists/{firewallDomainListId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFirewallDomainListInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          globalResolverId: S.String,
          clientToken: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          description: S.optional(S.String),
          domainCount: S.Number,
          id: S.String,
          name: S.String,
          status: S.String,
          statusMessage: S.optional(S.String),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetFirewallDomainListOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ firewallRuleId: S.String.pipe(T.HttpLabel("firewallRuleId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/firewall-rules/{firewallRuleId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFirewallRuleInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ globalResolverId: S.String.pipe(T.HttpLabel("globalResolverId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/global-resolver/{globalResolverId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGlobalResolverInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          hostedZoneAssociationId: S.String.pipe(T.HttpLabel("hostedZoneAssociationId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/hosted-zone-associations/{hostedZoneAssociationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetHostedZoneAssociationInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          managedFirewallDomainListId: S.String.pipe(T.HttpLabel("managedFirewallDomainListId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/managed-firewall-domain-lists/{managedFirewallDomainListId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetManagedFirewallDomainListInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          id: S.String,
          name: S.String,
          managedListType: S.String,
        }),
      ).annotate({ identifier: "GetManagedFirewallDomainListOutput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainFileUrl: S.String,
          firewallDomainListId: S.String.pipe(T.HttpLabel("firewallDomainListId")),
          operation: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/firewall-domain-lists/{firewallDomainListId}/domains/s3_file_url",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ImportFirewallDomainsInput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ id: S.String, name: S.String, status: S.String })).annotate(
        { identifier: "ImportFirewallDomainsOutput" },
      );
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
          filters: S.optional(__S(272, __c34, 0)).pipe(T.HttpQueryParams()),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/access-sources" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAccessSourcesInput" });
    case 1:
      return S.Array(__S(24, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), accessSources: __S(265, __c33, 1) }),
      ).annotate({ identifier: "ListAccessSourcesOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(88, __c11, 0).pipe(S.optional));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
          dnsViewId: S.String.pipe(T.HttpLabel("dnsViewId")),
          filters: S.optional(__S(272, __c34, 0)).pipe(T.HttpQueryParams()),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tokens/dns-view/{dnsViewId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAccessTokensInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          dnsViewId: S.String,
          expiresAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          globalResolverId: S.String,
          name: S.optional(S.String),
          status: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "AccessTokenItem" });
    case 2:
      return S.Array(__S(281, __c35, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), accessTokens: S.optional(__S(282, __c35, 2)) }),
      ).annotate({ identifier: "ListAccessTokensOutput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
          globalResolverId: S.String.pipe(T.HttpLabel("globalResolverId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/dns-views/resolver/{globalResolverId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDNSViewsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          clientToken: S.String,
          dnssecValidation: S.String,
          ednsClientSubnet: S.String,
          firewallRulesFailOpen: S.String,
          name: S.String,
          description: S.optional(S.String),
          globalResolverId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
        }),
      ).annotate({ identifier: "DNSViewSummary" });
    case 2:
      return S.Array(__S(289, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), dnsViews: __S(290, __c36, 2) }),
      ).annotate({ identifier: "ListDNSViewsOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
          globalResolverId: S.optional(S.String).pipe(T.HttpQuery("global_resolver_id")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/firewall-domain-lists" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFirewallDomainListsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          globalResolverId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          description: S.optional(S.String),
          id: S.String,
          name: S.String,
          status: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "FirewallDomainListsItem" });
    case 2:
      return S.Array(__S(297, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), firewallDomainLists: __S(298, __c37, 2) }),
      ).annotate({ identifier: "ListFirewallDomainListsOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
          firewallDomainListId: S.String.pipe(T.HttpLabel("firewallDomainListId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/firewall-domain-lists/{firewallDomainListId}/domains" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFirewallDomainsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), domains: __S(88, __c11, 0) }),
      ).annotate({ identifier: "ListFirewallDomainsOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
          dnsViewId: S.String.pipe(T.HttpQuery("dnsview_id")),
          filters: S.optional(__S(272, __c34, 0)).pipe(T.HttpQueryParams()),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/firewall-rules" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFirewallRulesInput" });
    case 1:
      return S.Array(__S(72, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), firewallRules: __S(313, __c39, 1) }),
      ).annotate({ identifier: "ListFirewallRulesOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/global-resolver" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListGlobalResolversInput" });
    case 1:
      return S.Array(__S(144, __c18, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), globalResolvers: __S(321, __c40, 1) }),
      ).annotate({ identifier: "ListGlobalResolversOutput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
          resourceArn: S.optional(S.String).pipe(T.HttpQuery("resourceArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/hosted-zone-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListHostedZoneAssociationsInput" });
    case 1:
      return S.Array(__S(456, __c57, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), hostedZoneAssociations: __S(329, __c41, 1) }),
      ).annotate({ identifier: "ListHostedZoneAssociationsOutput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
          managedFirewallDomainListType: S.String.pipe(
            T.HttpLabel("managedFirewallDomainListType"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/list-managed-firewall-domain-lists/{managedFirewallDomainListType}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListManagedFirewallDomainListsInput" });
    case 1:
      return S.Array(__S(240, __c30, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          managedFirewallDomainLists: __S(337, __c42, 1),
        }),
      ).annotate({ identifier: "ListManagedFirewallDomainListsOutput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("max_results")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("next_token")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/shared-dns-views" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSharedDNSViewsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          clientToken: S.String,
          dnssecValidation: S.String,
          ednsClientSubnet: S.String,
          firewallRulesFailOpen: S.String,
          name: S.String,
          description: S.optional(S.String),
          globalResolverId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
          ownerAccountId: S.String,
        }),
      ).annotate({ identifier: "SharedDNSViewSummary" });
    case 2:
      return S.Array(__S(345, __c43, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), dnsViews: __S(346, __c43, 2) }),
      ).annotate({ identifier: "ListSharedDNSViewsOutput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/get-all-tags" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(16, __c2, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(16, __c2, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/tag-resource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(88, __c11, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/untag-resource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accessSourceId: S.String.pipe(T.HttpLabel("accessSourceId")),
          cidr: S.optional(S.String),
          ipAddressType: S.optional(S.String),
          name: S.optional(S.String),
          protocol: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/access-sources/{accessSourceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAccessSourceInput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accessTokenId: S.String.pipe(T.HttpLabel("accessTokenId")),
          name: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/tokens/{accessTokenId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAccessTokenInput" });
    case 1:
      return S.suspend(() => S.Struct({ id: S.String, name: S.String })).annotate({
        identifier: "UpdateAccessTokenOutput",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dnsViewId: S.String.pipe(T.HttpLabel("dnsViewId")),
          name: S.optional(S.String),
          description: S.optional(S.String),
          dnssecValidation: S.optional(S.String),
          ednsClientSubnet: S.optional(S.String),
          firewallRulesFailOpen: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/dns-views/{dnsViewId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDNSViewInput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domains: __S(88, __c11, 0),
          firewallDomainListId: S.String.pipe(T.HttpLabel("firewallDomainListId")),
          operation: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/firewall-domain-lists/{firewallDomainListId}/domains",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFirewallDomainsInput" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          action: S.optional(S.String),
          blockOverrideDnsType: S.optional(S.String),
          blockOverrideDomain: S.optional(S.String),
          blockOverrideTtl: S.optional(S.Number),
          blockResponse: S.optional(S.String),
          clientToken: S.String.pipe(T.IdempotencyToken()),
          confidenceThreshold: S.optional(S.String),
          description: S.optional(S.String),
          dnsAdvancedProtection: S.optional(S.String),
          firewallRuleId: S.String.pipe(T.HttpLabel("firewallRuleId")),
          name: S.optional(S.String),
          priority: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/firewall-rules/{firewallRuleId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFirewallRuleInput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          globalResolverId: S.String.pipe(T.HttpLabel("globalResolverId")),
          name: S.optional(S.String),
          observabilityRegion: S.optional(S.String),
          description: S.optional(S.String),
          ipAddressType: S.optional(S.String),
          regions: S.optional(__S(88, __c11, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/global-resolver/{globalResolverId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGlobalResolverInput" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          hostedZoneAssociationId: S.String.pipe(T.HttpLabel("hostedZoneAssociationId")),
          name: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/hosted-zone-associations/{hostedZoneAssociationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateHostedZoneAssociationInput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(440, __c55, 0));
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          hostedZoneId: S.String.pipe(T.HttpLabel("hostedZoneId")),
          resourceArn: S.String,
          name: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/hosted-zone-associations/{hostedZoneId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateHostedZoneInput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          resourceArn: S.String,
          hostedZoneId: S.String,
          hostedZoneName: S.String,
          name: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
        }),
      ).annotate({ identifier: "AssociateHostedZoneOutput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          action: S.String,
          blockOverrideDnsType: S.optional(S.String),
          blockOverrideDomain: S.optional(S.String),
          blockOverrideTtl: S.optional(S.Number),
          blockResponse: S.optional(S.String),
          clientToken: S.String,
          confidenceThreshold: S.optional(S.String),
          description: S.optional(S.String),
          dnsAdvancedProtection: S.optional(S.String),
          firewallDomainListId: S.optional(S.String),
          name: S.String,
          priority: S.optional(S.Number),
          dnsViewId: S.String,
          qType: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchCreateFirewallRuleInputItem" });
    case 1:
      return S.Array(__S(464, __c58, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ firewallRules: __S(465, __c58, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/firewall-rules/batch-create" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchCreateFirewallRuleInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          action: S.String,
          blockOverrideDnsType: S.optional(S.String),
          blockOverrideDomain: S.optional(S.String),
          blockOverrideTtl: S.optional(S.Number),
          blockResponse: S.optional(S.String),
          clientToken: S.String,
          confidenceThreshold: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          description: S.optional(S.String),
          dnsAdvancedProtection: S.optional(S.String),
          firewallDomainListId: S.optional(S.String),
          id: S.optional(S.String),
          managedDomainListName: S.optional(S.String),
          name: S.String,
          priority: S.optional(S.Number),
          dnsViewId: S.String,
          queryType: S.optional(S.String),
          status: S.optional(S.String),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "BatchCreateFirewallRuleResult" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          firewallRule: __S(467, __c58, 3),
          code: S.Number,
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchCreateFirewallRuleOutputItem" });
    case 5:
      return S.Array(__S(468, __c58, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ failures: __S(469, __c58, 5), successes: __S(469, __c58, 5) }),
      ).annotate({ identifier: "BatchCreateFirewallRuleOutput" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ firewallRuleId: S.String })).annotate({
        identifier: "BatchDeleteFirewallRuleInputItem",
      });
    case 1:
      return S.Array(__S(472, __c59, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ firewallRules: __S(473, __c59, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/firewall-rules/batch-delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteFirewallRuleInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String),
          id: S.String,
          name: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchDeleteFirewallRuleResult" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          firewallRule: __S(475, __c59, 3),
          code: S.Number,
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchDeleteFirewallRuleOutputItem" });
    case 5:
      return S.Array(__S(476, __c59, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ failures: __S(477, __c59, 5), successes: __S(477, __c59, 5) }),
      ).annotate({ identifier: "BatchDeleteFirewallRuleOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
