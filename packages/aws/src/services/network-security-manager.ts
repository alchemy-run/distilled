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
  sdkId: "Network Security Manager",
  serviceShapeName: "PiccoloCustomerAPIService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "network-security-manager" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-10-30");
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
              `https://network-security-manager-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://network-security-manager.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://network-security-manager.{R}.api.aws","properties":{},"headers":{}}',
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
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
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
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(503), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class TagPolicyViolationException
  extends /*@__PURE__*/ S.TaggedError<TagPolicyViolationException>()(
    "TagPolicyViolationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number),
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
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(945, __c59, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type IdempotencyToken = string;
export type DeploymentName = string;
export type Description = string;
export type EnableCrossAccountVisibility = boolean;
export interface DeploymentConfiguration {
  enableCrossAccountVisibility: boolean;
}
export type PolicyIdentifier = string;
export interface PolicyReference {
  policyIdentifier: string;
}
export type PolicyReferenceList = PolicyReference[];
export type ScopeIdentifier = string;
export interface ScopeReference {
  scopeIdentifier: string;
}
export type ScopeReferenceList = ScopeReference[];
export type IsPublished = boolean;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateDeploymentInput {
  clientToken?: string;
  deploymentName: string;
  deploymentDescription?: string;
  deploymentConfiguration: DeploymentConfiguration;
  associatedPolicyList: PolicyReference[];
  associatedScopeList: ScopeReference[];
  isPublished?: boolean;
  tags?: { [key: string]: string | undefined };
}
export type DeploymentId = string;
export type DeploymentArn = string;
export type EntityStatus = "DRAFT" | "ACTIVE" | "DISABLED" | (string & {});
export type PolicyArn = string;
export interface AssociatedPolicy {
  policyArn: string;
}
export type AssociatedPolicyList = AssociatedPolicy[];
export type ScopeArn = string;
export interface AssociatedScope {
  scopeArn: string;
}
export type AssociatedScopeList = AssociatedScope[];
export type EntityVersion = string;
export type UpdateToken = string;
export type IsSnapshot = boolean;
export type HasPublishedVersion = boolean;
export type PolicyFirewallType = "WAF" | "SHIELD_ADVANCED" | (string & {});
export type DeploymentPolicyArnList = string[];
export type ScopeResourceType =
  | "AWS::ApiGateway::Stage"
  | "AWS::CloudFront::Distribution"
  | "AWS::EC2::EIP"
  | "AWS::ElasticLoadBalancingV2::LoadBalancer::application"
  | "AWS::ElasticLoadBalancing::LoadBalancer"
  | (string & {});
export type DeploymentResourceTypeList = ScopeResourceType[];
export interface DeploymentCoverageEntry {
  firewallType: PolicyFirewallType;
  policyArns: string[];
  inScopeResourceTypes: ScopeResourceType[];
}
export type DeploymentCoverageList = DeploymentCoverageEntry[];
export interface DeploymentWarningEntry {
  code: string;
  policyArn: string;
  message: string;
}
export type DeploymentWarningList = DeploymentWarningEntry[];
export interface CreateDeploymentOutput {
  deploymentId: string;
  deploymentArn: string;
  deploymentName: string;
  deploymentDescription?: string;
  status: EntityStatus;
  deploymentConfiguration?: DeploymentConfiguration;
  associatedPolicyList: AssociatedPolicy[];
  associatedScopeList: AssociatedScope[];
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  deploymentCoverage?: DeploymentCoverageEntry[];
  warnings?: DeploymentWarningEntry[];
  updatedAt?: Date;
}
export type DeploymentIdentifier = string;
export interface CreateDeploymentSnapshotInput {
  deploymentIdentifier: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateDeploymentSnapshotOutput {
  deploymentId: string;
  deploymentArn: string;
  deploymentName: string;
  deploymentDescription?: string;
  status: EntityStatus;
  deploymentConfiguration?: DeploymentConfiguration;
  associatedPolicyList: AssociatedPolicy[];
  associatedScopeList: AssociatedScope[];
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  updatedAt?: Date;
}
export type PolicyName = string;
export type Priority = number;
export type TemplateIdentifier = string;
export type RuleIdentifier = string;
export type TemplateOrRuleReference =
  | { templateIdentifier: string; ruleIdentifier?: never }
  | { templateIdentifier?: never; ruleIdentifier: string };
export type TemplateAndRuleReferenceList = TemplateOrRuleReference[];
export type RemediationEnabled = boolean;
export type ResourcesCleanUp = boolean;
export type ExistingCustomerWebACLResolution =
  | "RETROFIT"
  | "OVERRIDE_ASSOCIATION"
  | "NO_REMEDIATION"
  | (string & {});
export type WAFConflictResolutionOptions = "MERGE_WHERE_APPLICABLE" | (string & {});
export interface WafConfig {
  existingCustomerWebACLResolution: ExistingCustomerWebACLResolution;
  conflictResolution: WAFConflictResolutionOptions;
}
export interface PolicyConfiguration {
  remediationEnabled: boolean;
  resourcesCleanUp: boolean;
  wafConfig?: WafConfig;
}
export interface CreatePolicyInput {
  clientToken?: string;
  policyName: string;
  policyDescription?: string;
  priority: number;
  associatedTemplateAndRuleList?: TemplateOrRuleReference[];
  firewallType: PolicyFirewallType;
  policyConfiguration: PolicyConfiguration;
  isPublished?: boolean;
  tags?: { [key: string]: string | undefined };
}
export type PolicyId = string;
export type TemplateArn = string;
export type RuleArn = string;
export type AssociatedTemplateOrRule =
  | { templateArn: string; ruleArn?: never }
  | { templateArn?: never; ruleArn: string };
export type AssociatedTemplateAndRuleList = AssociatedTemplateOrRule[];
export interface CreatePolicyOutput {
  policyId: string;
  policyArn: string;
  policyName: string;
  policyDescription?: string;
  status: EntityStatus;
  priority: number;
  associatedTemplateAndRuleList: AssociatedTemplateOrRule[];
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  firewallType: PolicyFirewallType;
  policyConfiguration?: PolicyConfiguration;
  updatedAt?: Date;
}
export interface CreatePolicySnapshotInput {
  policyIdentifier: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreatePolicySnapshotOutput {
  policyId: string;
  policyArn: string;
  policyName: string;
  policyDescription?: string;
  status: EntityStatus;
  priority: number;
  associatedTemplateAndRuleList: AssociatedTemplateOrRule[];
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  firewallType: PolicyFirewallType;
  policyConfiguration?: PolicyConfiguration;
  updatedAt?: Date;
}
export type RuleName = string;
export type RuleFirewallType = "WAF" | (string & {});
export type RuleType = "CONFIGURATION" | "INSPECTION" | (string & {});
export type JsonDocument = unknown;
export interface CreateRuleInput {
  clientToken?: string;
  ruleName: string;
  firewallType: RuleFirewallType;
  ruleType: RuleType;
  ruleDescription?: string;
  configuration: any;
  isPublished?: boolean;
  tags?: { [key: string]: string | undefined };
}
export type RuleId = string;
export interface CreateRuleOutput {
  ruleId: string;
  ruleArn: string;
  ruleName: string;
  firewallType: RuleFirewallType;
  ruleType?: RuleType;
  ruleDescription?: string;
  configuration: any;
  status: EntityStatus;
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  updatedAt?: Date;
}
export interface CreateRuleSnapshotInput {
  ruleIdentifier: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateRuleSnapshotOutput {
  ruleId: string;
  ruleArn: string;
  ruleName: string;
  firewallType: RuleFirewallType;
  ruleType?: RuleType;
  ruleDescription?: string;
  configuration: any;
  status: EntityStatus;
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  updatedAt?: Date;
}
export type ScopeName = string;
export type AccountId = string;
export type AccountList = string[];
export type OrganizationalUnit = string;
export type OrganizationalUnitList = string[];
export interface AccountSet {
  accountIds?: string[];
  organizationalUnits?: string[];
}
export type AccountFilter =
  | { includeAll: Record<string, never>; include?: never; exclude?: never }
  | { includeAll?: never; include: AccountSet; exclude?: never }
  | { includeAll?: never; include?: never; exclude: AccountSet };
export type Arn = string;
export type ResourceArnList = string[];
export type StringMap = { [key: string]: string | undefined };
export type Scheme = "internet-facing" | "internal" | (string & {});
export type IpAddressType = "ipv4" | "dualstack" | "dualstack-without-public-ipv4" | (string & {});
export interface AlbConfiguration {
  scheme?: Scheme;
  ipAddressType?: IpAddressType;
}
export type ResourceCriteria =
  | { tags: { [key: string]: string | undefined }; albConfig?: never }
  | { tags?: never; albConfig: AlbConfiguration };
export type ResourceLogicalExpressionList = ResourceLogicalExpression[];
export type ResourceLogicalExpression =
  | { criteria: ResourceCriteria; and?: never; or?: never; not?: never }
  | { criteria?: never; and: ResourceLogicalExpression[]; or?: never; not?: never }
  | { criteria?: never; and?: never; or: ResourceLogicalExpression[]; not?: never }
  | { criteria?: never; and?: never; or?: never; not: ResourceLogicalExpression };
export interface ResourceSet {
  explicitArns?: string[];
  expression?: ResourceLogicalExpression;
}
export interface ResourceScope {
  includeAll?: boolean;
  include?: ResourceSet;
  exclude?: ResourceSet;
}
export type ResourceScopeMap = { [key in ScopeResourceType]?: ResourceScope };
export interface ScopeConfiguration {
  accountFilter?: AccountFilter;
  resourceScopes: { [key: string]: ResourceScope | undefined };
}
export interface CreateScopeInput {
  clientToken?: string;
  scopeName: string;
  scopeDescription?: string;
  scopeConfiguration: ScopeConfiguration;
  isPublished?: boolean;
  tags?: { [key: string]: string | undefined };
}
export type ScopeId = string;
export interface CreateScopeOutput {
  scopeId: string;
  scopeArn: string;
  scopeName: string;
  scopeDescription?: string;
  scopeConfiguration?: ScopeConfiguration;
  status: EntityStatus;
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  updatedAt?: Date;
}
export interface CreateScopeSnapshotInput {
  scopeIdentifier: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateScopeSnapshotOutput {
  scopeId: string;
  scopeArn: string;
  scopeName: string;
  scopeDescription?: string;
  scopeConfiguration?: ScopeConfiguration;
  status: EntityStatus;
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  updatedAt?: Date;
}
export type TemplateName = string;
export interface RuleReference {
  ruleIdentifier: string;
}
export type RuleReferenceList = RuleReference[];
export type TemplateFirewallType = "WAF" | (string & {});
export interface CreateTemplateInput {
  clientToken?: string;
  templateName: string;
  templateDescription?: string;
  associatedRuleList: RuleReference[];
  firewallType: TemplateFirewallType;
  isPublished?: boolean;
  tags?: { [key: string]: string | undefined };
}
export type TemplateId = string;
export interface AssociatedRule {
  ruleArn: string;
}
export type AssociatedRuleList = AssociatedRule[];
export interface CreateTemplateOutput {
  templateId: string;
  templateArn: string;
  templateName: string;
  templateDescription?: string;
  status: EntityStatus;
  version: string;
  associatedRuleList: AssociatedRule[];
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  firewallType: TemplateFirewallType;
  updatedAt?: Date;
}
export interface CreateTemplateSnapshotInput {
  templateIdentifier: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateTemplateSnapshotOutput {
  templateId: string;
  templateArn: string;
  templateName: string;
  templateDescription?: string;
  status: EntityStatus;
  version: string;
  associatedRuleList: AssociatedRule[];
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  firewallType: TemplateFirewallType;
  updatedAt?: Date;
}
export interface DeleteAdminAccountRequest {
  accountId: string;
}
export interface DeleteAdminAccountResponse {}
export interface DeleteDeploymentInput {
  deploymentIdentifier: string;
}
export interface DeleteDeploymentResponse {}
export interface DeletePolicyInput {
  policyIdentifier: string;
}
export interface DeletePolicyResponse {}
export interface DeleteRuleInput {
  ruleIdentifier: string;
}
export interface DeleteRuleResponse {}
export interface DeleteScopeInput {
  scopeIdentifier: string;
}
export interface DeleteScopeResponse {}
export interface DeleteTemplateInput {
  templateIdentifier: string;
}
export interface DeleteTemplateResponse {}
export type SensitiveString = string | redacted.Redacted<string>;
export type WAFConfigDataType =
  | "DefaultAction"
  | "VisibilityConfig"
  | "CaptchaConfig"
  | "ChallengeConfig"
  | "CustomResponseBodies"
  | "LoggingConfiguration"
  | "DataProtectionConfig"
  | "AssociationConfig"
  | "OnSourceDDoSProtectionConfig"
  | "TokenDomains"
  | (string & {});
export interface GenerateRuleConfigurationRequest {
  prompt: string | redacted.Redacted<string>;
  ruleFirewallType: RuleFirewallType;
  ruleType: RuleType;
  wafConfigDataType?: WAFConfigDataType;
  currentConfiguration?: string;
  clientToken?: string;
}
export interface GenerateRuleConfigurationResponse {
  configuration: string;
  description?: string;
}
export interface GetAdminAccountRequest {
  accountId: string;
}
export type AdminPriority = number;
export type SensitiveAccountName = string | redacted.Redacted<string>;
export type SensitiveAccountEmail = string | redacted.Redacted<string>;
export interface AccountReference {
  accountId: string;
  name?: string | redacted.Redacted<string>;
  email?: string | redacted.Redacted<string>;
}
export type AccountReferenceList = AccountReference[];
export type OrganizationalUnitId = string;
export interface OrganizationalUnitReference {
  ouId: string;
  name?: string;
}
export type OrganizationalUnitReferenceList = OrganizationalUnitReference[];
export interface AdminScopeSelection {
  accounts?: AccountReference[];
  organizationalUnits?: OrganizationalUnitReference[];
}
export type AdminScopeFilter =
  | { includeAll: Record<string, never>; includeOnly?: never; excludeOnly?: never }
  | { includeAll?: never; includeOnly: AdminScopeSelection; excludeOnly?: never }
  | { includeAll?: never; includeOnly?: never; excludeOnly: AdminScopeSelection };
export type FirewallTypeList = PolicyFirewallType[];
export interface AdminFirewallTypeScope {
  allFirewallTypesEnabled?: boolean;
  firewallTypes?: PolicyFirewallType[];
}
export interface AdminScope {
  scopeFilter?: AdminScopeFilter;
  firewallTypeScope?: AdminFirewallTypeScope;
}
export type AdminAccountStatus = "ONBOARDED" | "OFFBOARDED" | (string & {});
export interface AdminAccountDetails {
  adminAccount: string;
  priority: number;
  adminScope?: AdminScope;
  status?: AdminAccountStatus;
}
export interface GetAdminAccountResponse {
  adminAccountDetails?: AdminAccountDetails;
}
export interface GetDeploymentInput {
  deploymentIdentifier: string;
}
export interface GetDeploymentOutput {
  deploymentId: string;
  deploymentArn: string;
  deploymentName: string;
  deploymentDescription?: string;
  status: EntityStatus;
  deploymentConfiguration?: DeploymentConfiguration;
  associatedPolicyList: AssociatedPolicy[];
  associatedScopeList: AssociatedScope[];
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  updatedAt?: Date;
  deploymentCoverage?: DeploymentCoverageEntry[];
  warnings?: DeploymentWarningEntry[];
}
export interface GetPolicyInput {
  policyIdentifier: string;
}
export interface GetPolicyOutput {
  policyId: string;
  policyArn: string;
  policyName: string;
  policyDescription?: string;
  status: EntityStatus;
  priority: number;
  associatedTemplateAndRuleList: AssociatedTemplateOrRule[];
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  firewallType: PolicyFirewallType;
  policyConfiguration?: PolicyConfiguration;
  updatedAt?: Date;
}
export interface GetRuleInput {
  ruleIdentifier: string;
}
export interface GetRuleOutput {
  ruleId: string;
  ruleArn: string;
  ruleName: string;
  firewallType: RuleFirewallType;
  ruleType?: RuleType;
  ruleDescription?: string;
  configuration: any;
  status: EntityStatus;
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  updatedAt?: Date;
}
export interface GetScopeInput {
  scopeIdentifier: string;
}
export interface GetScopeOutput {
  scopeId: string;
  scopeArn: string;
  scopeName: string;
  scopeDescription?: string;
  scopeConfiguration?: ScopeConfiguration;
  status: EntityStatus;
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  updatedAt?: Date;
}
export interface GetTemplateInput {
  templateIdentifier: string;
}
export interface GetTemplateOutput {
  templateId: string;
  templateArn: string;
  templateName: string;
  templateDescription?: string;
  status: EntityStatus;
  version: string;
  associatedRuleList: AssociatedRule[];
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  firewallType: TemplateFirewallType;
  updatedAt?: Date;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListAdminAccountsRequest {
  maxResults?: number;
  nextToken?: string;
}
export type SensitiveName = string | redacted.Redacted<string>;
export type SensitiveEmail = string | redacted.Redacted<string>;
export interface AdminAccountSummary {
  accountId: string;
  priority?: number;
  name?: string | redacted.Redacted<string>;
  email?: string | redacted.Redacted<string>;
}
export type AdminAccountSummaryList = AdminAccountSummary[];
export interface ListAdminAccountsResponse {
  nextToken?: string;
  adminAccounts: AdminAccountSummary[];
}
export type SynchronizationStatus = "IN_SYNC" | "OUT_OF_SYNC" | "NOT_APPLICABLE" | (string & {});
export interface ListAggregateResourceSynchronizationStatusesInput {
  synchronizationStatus?: SynchronizationStatus;
  maxResults?: number;
  nextToken?: string;
}
export type ResourceType =
  | "AWS::ApiGateway::Stage"
  | "AWS::CloudFront::Distribution"
  | "AWS::EC2::EIP"
  | "AWS::ElasticLoadBalancingV2::LoadBalancer::application"
  | "AWS::ElasticLoadBalancing::LoadBalancer"
  | "AWS::WAFv2::WebACL"
  | "AWS::Shield::Protection"
  | "AWS::ShieldRegional::Protection"
  | (string & {});
export interface ConfigurationIssue {
  configurationName?: string;
  expectedValue?: string;
  actualValue?: string;
}
export type ConfigurationIssueList = ConfigurationIssue[];
export interface InvalidFirewallReasons {
  incorrectSingleValueConfigurations?: ConfigurationIssue[];
  missingAppendableConfigurationValues?: ConfigurationIssue[];
  unexpectedAppendableConfigurationValues?: ConfigurationIssue[];
  incorrectAppendableConfigurationOrder?: ConfigurationIssue[];
  missingMergeableConfigurationValues?: ConfigurationIssue[];
  unexpectedMergeableConfigurationValues?: ConfigurationIssue[];
}
export type FirewallSyncReason =
  | { missingFirewall: string; invalidFirewall?: never }
  | { missingFirewall?: never; invalidFirewall: InvalidFirewallReasons };
export type OutOfSyncReasons = { [key in PolicyFirewallType]?: FirewallSyncReason };
export interface NotVisibleMarker {
  reason: string;
}
export type OutOfSyncReasonsView =
  | { reasons: { [key: string]: FirewallSyncReason | undefined }; notVisible?: never }
  | { reasons?: never; notVisible: NotVisibleMarker };
export interface RemediationIssueDetails {
  issueType?: string;
  message?: string;
  correctiveAction?: string;
}
export type RemediationIssues = { [key in PolicyFirewallType]?: RemediationIssueDetails };
export type RemediationIssuesView =
  | { issues: { [key: string]: RemediationIssueDetails | undefined }; notVisible?: never }
  | { issues?: never; notVisible: NotVisibleMarker };
export interface ResourceSynchronizationStatusSummary {
  synchronizationStatus: SynchronizationStatus;
  accountId: string;
  resourceArn: string;
  deploymentArn?: string;
  resourceType?: ResourceType;
  updatedAt: Date;
  outOfSyncReasons?: OutOfSyncReasonsView;
  remediationIssues?: RemediationIssuesView;
  evaluatedAt?: Date;
}
export type ResourceSynchronizationStatusSummaryList = ResourceSynchronizationStatusSummary[];
export interface ListAggregateResourceSynchronizationStatusesOutput {
  nextToken?: string;
  resourceSynchronizationStatuses: ResourceSynchronizationStatusSummary[];
}
export type EntityStatusFilter = "ACTIVE" | "DRAFT" | "DISABLED" | (string & {});
export interface ListDeploymentsInput {
  maxResults?: number;
  nextToken?: string;
  status?: EntityStatusFilter;
}
export interface DeploymentSummary {
  deploymentId: string;
  deploymentArn: string;
  deploymentName?: string;
  status?: EntityStatus;
  version?: string;
  hasPublishedVersion?: boolean;
  updatedAt?: Date;
}
export type DeploymentSummaryList = DeploymentSummary[];
export interface ListDeploymentsOutput {
  nextToken?: string;
  deployments: DeploymentSummary[];
}
export interface ListDeploymentSnapshotsInput {
  deploymentIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListDeploymentSnapshotsOutput {
  nextToken?: string;
  snapshots: DeploymentSummary[];
}
export interface ListPoliciesInput {
  maxResults?: number;
  nextToken?: string;
  status?: EntityStatusFilter;
}
export interface PolicySummary {
  policyId: string;
  policyArn: string;
  policyName?: string;
  status?: EntityStatus;
  version?: string;
  hasPublishedVersion?: boolean;
  firewallType?: PolicyFirewallType;
  priority?: number;
  updatedAt?: Date;
}
export type PolicySummaryList = PolicySummary[];
export interface ListPoliciesOutput {
  nextToken?: string;
  policies: PolicySummary[];
}
export interface ListPolicySnapshotsInput {
  policyIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListPolicySnapshotsOutput {
  nextToken?: string;
  snapshots: PolicySummary[];
}
export type ResourceIdentifier = string;
export interface ListResourceAssociationsInput {
  resourceIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export type ServiceResourceType =
  | "Rule"
  | "Template"
  | "Policy"
  | "Deployment"
  | "Scope"
  | (string & {});
export interface ResourceAssociation {
  arn: string;
  resourceType: ServiceResourceType;
}
export type ResourceAssociationList = ResourceAssociation[];
export interface ListResourceAssociationsOutput {
  nextToken?: string;
  resourceAssociations: ResourceAssociation[];
}
export interface ListResourceSynchronizationStatusesInput {
  deploymentIdentifier: string;
  synchronizationStatus?: SynchronizationStatus;
  maxResults?: number;
  nextToken?: string;
}
export interface ListResourceSynchronizationStatusesOutput {
  nextToken?: string;
  resourceSynchronizationStatuses: ResourceSynchronizationStatusSummary[];
}
export interface ListRulesInput {
  maxResults?: number;
  nextToken?: string;
  status?: EntityStatusFilter;
}
export interface RuleSummary {
  ruleId: string;
  ruleArn: string;
  ruleName: string;
  firewallType?: RuleFirewallType;
  ruleType?: RuleType;
  status?: EntityStatus;
  version?: string;
  hasPublishedVersion?: boolean;
  updatedAt?: Date;
}
export type RuleSummaryList = RuleSummary[];
export interface ListRulesOutput {
  nextToken?: string;
  rules: RuleSummary[];
}
export interface ListRuleSnapshotsInput {
  ruleIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListRuleSnapshotsOutput {
  nextToken?: string;
  snapshots: RuleSummary[];
}
export interface ListScopesInput {
  maxResults?: number;
  nextToken?: string;
  status?: EntityStatusFilter;
}
export interface ScopeSummary {
  scopeId: string;
  scopeArn: string;
  scopeName?: string;
  status?: EntityStatus;
  version?: string;
  hasPublishedVersion?: boolean;
  updatedAt?: Date;
}
export type ScopeSummaryList = ScopeSummary[];
export interface ListScopesOutput {
  nextToken?: string;
  scopes: ScopeSummary[];
}
export interface ListScopeSnapshotsInput {
  scopeIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListScopeSnapshotsOutput {
  nextToken?: string;
  snapshots: ScopeSummary[];
}
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export interface ListTemplatesInput {
  maxResults?: number;
  nextToken?: string;
  status?: EntityStatusFilter;
}
export interface TemplateSummary {
  templateId: string;
  templateArn: string;
  templateName: string;
  status?: EntityStatus;
  version?: string;
  hasPublishedVersion?: boolean;
  firewallType?: TemplateFirewallType;
  updatedAt?: Date;
}
export type TemplateSummaryList = TemplateSummary[];
export interface ListTemplatesOutput {
  nextToken?: string;
  templates: TemplateSummary[];
}
export interface ListTemplateSnapshotsInput {
  templateIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListTemplateSnapshotsOutput {
  nextToken?: string;
  snapshots: TemplateSummary[];
}
export type AccountIdList = string[];
export type OrganizationalUnitIdList = string[];
export interface AdminScopeSelectionInput {
  accounts?: string[];
  organizationalUnits?: string[];
}
export type AdminScopeFilterInput =
  | { includeAll: Record<string, never>; includeOnly?: never; excludeOnly?: never }
  | { includeAll?: never; includeOnly: AdminScopeSelectionInput; excludeOnly?: never }
  | { includeAll?: never; includeOnly?: never; excludeOnly: AdminScopeSelectionInput };
export interface AdminScopeInput {
  scopeFilter?: AdminScopeFilterInput;
  firewallTypeScope?: AdminFirewallTypeScope;
}
export interface PutAdminAccountRequest {
  accountId: string;
  priority: number;
  adminScope?: AdminScopeInput;
}
export interface PutAdminAccountResponse {
  adminAccountDetails?: AdminAccountDetails;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateDeploymentInput {
  deploymentIdentifier: string;
  updateToken: string;
  deploymentDescription?: string;
  deploymentConfiguration?: DeploymentConfiguration;
  associatedPolicyList?: PolicyReference[];
  associatedScopeList?: ScopeReference[];
  isPublished: boolean;
  clientToken?: string;
}
export interface UpdateDeploymentOutput {
  deploymentId: string;
  deploymentArn: string;
  deploymentName: string;
  deploymentDescription?: string;
  status: EntityStatus;
  deploymentConfiguration?: DeploymentConfiguration;
  associatedPolicyList: AssociatedPolicy[];
  associatedScopeList: AssociatedScope[];
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  deploymentCoverage?: DeploymentCoverageEntry[];
  warnings?: DeploymentWarningEntry[];
  updatedAt?: Date;
}
export interface UpdatePolicyInput {
  policyIdentifier: string;
  updateToken: string;
  policyDescription?: string;
  priority?: number;
  associatedTemplateAndRuleList?: TemplateOrRuleReference[];
  policyConfiguration?: PolicyConfiguration;
  isPublished: boolean;
  clientToken?: string;
}
export interface UpdatePolicyOutput {
  policyId: string;
  policyArn: string;
  policyName: string;
  policyDescription?: string;
  status: EntityStatus;
  priority: number;
  associatedTemplateAndRuleList: AssociatedTemplateOrRule[];
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  firewallType: PolicyFirewallType;
  policyConfiguration?: PolicyConfiguration;
  updatedAt?: Date;
}
export interface UpdateRuleInput {
  ruleIdentifier: string;
  updateToken: string;
  ruleType?: RuleType;
  ruleDescription?: string;
  configuration?: any;
  isPublished: boolean;
  clientToken?: string;
}
export interface UpdateRuleOutput {
  ruleId: string;
  ruleArn: string;
  ruleName: string;
  firewallType: RuleFirewallType;
  ruleType?: RuleType;
  ruleDescription?: string;
  configuration: any;
  status: EntityStatus;
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  updatedAt?: Date;
}
export interface UpdateScopeInput {
  scopeIdentifier: string;
  updateToken: string;
  scopeDescription?: string;
  scopeConfiguration?: ScopeConfiguration;
  isPublished: boolean;
  clientToken?: string;
}
export interface UpdateScopeOutput {
  scopeId: string;
  scopeArn: string;
  scopeName: string;
  scopeDescription?: string;
  scopeConfiguration?: ScopeConfiguration;
  status: EntityStatus;
  version: string;
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  updatedAt?: Date;
}
export interface UpdateTemplateInput {
  templateIdentifier: string;
  updateToken: string;
  templateDescription?: string;
  associatedRuleList?: RuleReference[];
  isPublished: boolean;
  clientToken?: string;
}
export interface UpdateTemplateOutput {
  templateId: string;
  templateArn: string;
  templateName: string;
  templateDescription?: string;
  status: EntityStatus;
  version: string;
  associatedRuleList: AssociatedRule[];
  updateToken?: string;
  isSnapshot?: boolean;
  hasPublishedVersion?: boolean;
  firewallType: TemplateFirewallType;
  updatedAt?: Date;
}
export type ValidationExceptionReason =
  | "ACCOUNT_NOT_ONBOARDED"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CreateDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | TagPolicyViolationException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a deployment. A deployment applies one or more policies to the accounts and resources selected by a scope. Use `isPublished` to create the deployment in published (`ACTIVE`) or draft (`DRAFT`) state. The response includes coverage information and any warnings about the deployment.
 */
export const createDeployment: API.OperationMethod<
  CreateDeploymentInput,
  CreateDeploymentOutput,
  CreateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<CreateDeploymentInput>,
  output: __S(1060, __c66, 4) as any as S.Schema<CreateDeploymentOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    TagPolicyViolationException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDeployment",
}));

export type CreateDeploymentSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot of the current published version of the specified deployment.
 */
export const createDeploymentSnapshot: API.OperationMethod<
  CreateDeploymentSnapshotInput,
  CreateDeploymentSnapshotOutput,
  CreateDeploymentSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateDeploymentSnapshotInput>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateDeploymentSnapshotOutput>,
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
  operationName: "CreateDeploymentSnapshot",
}));

export type CreatePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | TagPolicyViolationException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a policy. A policy combines templates and rules with enforcement settings for a firewall type, such as AWS WAF or AWS Shield Advanced. Use `isPublished` to create the policy in published (`ACTIVE`) or draft (`DRAFT`) state.
 */
export const createPolicy: API.OperationMethod<
  CreatePolicyInput,
  CreatePolicyOutput,
  CreatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c1, 0) as any as S.Schema<CreatePolicyInput>,
  output: __S(36, __c2, 4) as any as S.Schema<CreatePolicyOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    TagPolicyViolationException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicy",
}));

export type CreatePolicySnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot of the current published version of the specified policy.
 */
export const createPolicySnapshot: API.OperationMethod<
  CreatePolicySnapshotInput,
  CreatePolicySnapshotOutput,
  CreatePolicySnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<CreatePolicySnapshotInput>,
  output: __S(36, __c2, 4) as any as S.Schema<CreatePolicySnapshotOutput>,
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
  operationName: "CreatePolicySnapshot",
}));

export type CreateRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | TagPolicyViolationException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a rule. A rule defines a network security configuration to enforce, such as an AWS WAF rule group or configuration data. Use `isPublished` to create the rule in published (`ACTIVE`) or draft (`DRAFT`) state.
 */
export const createRule: API.OperationMethod<
  CreateRuleInput,
  CreateRuleOutput,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<CreateRuleInput>,
  output: __S(96, __c6, 0) as any as S.Schema<CreateRuleOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    TagPolicyViolationException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRule",
}));

export type CreateRuleSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot of the current published version of the specified rule. A snapshot is an immutable, versioned copy that other resources can reference.
 */
export const createRuleSnapshot: API.OperationMethod<
  CreateRuleSnapshotInput,
  CreateRuleSnapshotOutput,
  CreateRuleSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<CreateRuleSnapshotInput>,
  output: __S(96, __c6, 0) as any as S.Schema<CreateRuleSnapshotOutput>,
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
  operationName: "CreateRuleSnapshot",
}));

export type CreateScopeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | TagPolicyViolationException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a scope. A scope selects the accounts and resources that a deployment applies to. Use `isPublished` to create the scope in published (`ACTIVE`) or draft (`DRAFT`) state.
 */
export const createScope: API.OperationMethod<
  CreateScopeInput,
  CreateScopeOutput,
  CreateScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<CreateScopeInput>,
  output: __S(154, __c9, 10) as any as S.Schema<CreateScopeOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    TagPolicyViolationException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScope",
}));

export type CreateScopeSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot of the current published version of the specified scope.
 */
export const createScopeSnapshot: API.OperationMethod<
  CreateScopeSnapshotInput,
  CreateScopeSnapshotOutput,
  CreateScopeSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<CreateScopeSnapshotInput>,
  output: __S(154, __c9, 10) as any as S.Schema<CreateScopeSnapshotOutput>,
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
  operationName: "CreateScopeSnapshot",
}));

export type CreateTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | TagPolicyViolationException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a template. A template groups one or more rules to simplify reuse across policies. You can also associate rules with a policy directly, without a template. Use `isPublished` to create the template in published (`ACTIVE`) or draft (`DRAFT`) state.
 */
export const createTemplate: API.OperationMethod<
  CreateTemplateInput,
  CreateTemplateOutput,
  CreateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<CreateTemplateInput>,
  output: __S(194, __c12, 2) as any as S.Schema<CreateTemplateOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    TagPolicyViolationException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTemplate",
}));

export type CreateTemplateSnapshotError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a snapshot of the current published version of the specified template.
 */
export const createTemplateSnapshot: API.OperationMethod<
  CreateTemplateSnapshotInput,
  CreateTemplateSnapshotOutput,
  CreateTemplateSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<CreateTemplateSnapshotInput>,
  output: __S(194, __c12, 2) as any as S.Schema<CreateTemplateSnapshotOutput>,
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
  operationName: "CreateTemplateSnapshot",
}));

export type DeleteAdminAccountError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified AWS Network Security Manager administrator account.
 */
export const deleteAdminAccount: API.OperationMethod<
  DeleteAdminAccountRequest,
  DeleteAdminAccountResponse,
  DeleteAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DeleteAdminAccountRequest>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteAdminAccountResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAdminAccount",
}));

export type DeleteDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified deployment.
 */
export const deleteDeployment: API.OperationMethod<
  DeleteDeploymentInput,
  DeleteDeploymentResponse,
  DeleteDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<DeleteDeploymentInput>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteDeploymentResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDeployment",
}));

export type DeletePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified policy.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyInput,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<DeletePolicyInput>,
  output: __S(256, __c16, 0) as any as S.Schema<DeletePolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
}));

export type DeleteRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified rule.
 */
export const deleteRule: API.OperationMethod<
  DeleteRuleInput,
  DeleteRuleResponse,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<DeleteRuleInput>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteRuleResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRule",
}));

export type DeleteScopeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified scope.
 */
export const deleteScope: API.OperationMethod<
  DeleteScopeInput,
  DeleteScopeResponse,
  DeleteScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<DeleteScopeInput>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteScopeResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScope",
}));

export type DeleteTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified template.
 */
export const deleteTemplate: API.OperationMethod<
  DeleteTemplateInput,
  DeleteTemplateResponse,
  DeleteTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<DeleteTemplateInput>,
  output: __S(256, __c16, 0) as any as S.Schema<DeleteTemplateResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTemplate",
}));

export type GenerateRuleConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates a rule configuration from a natural-language description. Provide a prompt along with the rule's firewall type and rule type. The service returns a configuration that you can use when you create or update a rule. If you also provide an existing configuration, the service edits that configuration instead of generating a new one.
 */
export const generateRuleConfiguration: API.OperationMethod<
  GenerateRuleConfigurationRequest,
  GenerateRuleConfigurationResponse,
  GenerateRuleConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<GenerateRuleConfigurationRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<GenerateRuleConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateRuleConfiguration",
}));

export type GetAdminAccountError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of the specified AWS Network Security Manager administrator account.
 */
export const getAdminAccount: API.OperationMethod<
  GetAdminAccountRequest,
  GetAdminAccountResponse,
  GetAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<GetAdminAccountRequest>,
  output: __S(393, __c24, 9) as any as S.Schema<GetAdminAccountResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdminAccount",
}));

export type GetDeploymentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of the specified deployment, including coverage information and any warnings.
 */
export const getDeployment: API.OperationMethod<
  GetDeploymentInput,
  GetDeploymentOutput,
  GetDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<GetDeploymentInput>,
  output: __S(401, __c25, 1) as any as S.Schema<GetDeploymentOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeployment",
}));

export type GetPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of the specified policy.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyInput,
  GetPolicyOutput,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<GetPolicyInput>,
  output: __S(36, __c2, 4) as any as S.Schema<GetPolicyOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
}));

export type GetRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of the specified rule.
 */
export const getRule: API.OperationMethod<
  GetRuleInput,
  GetRuleOutput,
  GetRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<GetRuleInput>,
  output: __S(96, __c6, 0) as any as S.Schema<GetRuleOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRule",
}));

export type GetScopeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of the specified scope.
 */
export const getScope: API.OperationMethod<
  GetScopeInput,
  GetScopeOutput,
  GetScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<GetScopeInput>,
  output: __S(154, __c9, 10) as any as S.Schema<GetScopeOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScope",
}));

export type GetTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of the specified template.
 */
export const getTemplate: API.OperationMethod<
  GetTemplateInput,
  GetTemplateOutput,
  GetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<GetTemplateInput>,
  output: __S(194, __c12, 2) as any as S.Schema<GetTemplateOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTemplate",
}));

export type ListAdminAccountsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the AWS Network Security Manager administrator accounts in the organization.
 */
export const listAdminAccounts: API.PaginatedOperationMethod<
  ListAdminAccountsRequest,
  ListAdminAccountsResponse,
  ListAdminAccountsError,
  Credentials | HttpClient.HttpClient,
  AdminAccountSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<ListAdminAccountsRequest>,
  output: __S(483, __c30, 3) as any as S.Schema<ListAdminAccountsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAdminAccounts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "adminAccounts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAggregateResourceSynchronizationStatusesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the aggregated synchronization statuses of resources across the deployments in your administrator account. You can filter the results by synchronization status and page through them.
 */
export const listAggregateResourceSynchronizationStatuses: API.PaginatedOperationMethod<
  ListAggregateResourceSynchronizationStatusesInput,
  ListAggregateResourceSynchronizationStatusesOutput,
  ListAggregateResourceSynchronizationStatusesError,
  Credentials | HttpClient.HttpClient,
  ResourceSynchronizationStatusSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ListAggregateResourceSynchronizationStatusesInput>,
  output: __S(
    524,
    __c32,
    12,
  ) as any as S.Schema<ListAggregateResourceSynchronizationStatusesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAggregateResourceSynchronizationStatuses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resourceSynchronizationStatuses",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDeploymentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the deployments in the account. You can filter the results by status and page through them using `maxResults` and `nextToken`.
 */
export const listDeployments: API.PaginatedOperationMethod<
  ListDeploymentsInput,
  ListDeploymentsOutput,
  ListDeploymentsError,
  Credentials | HttpClient.HttpClient,
  DeploymentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<ListDeploymentsInput>,
  output: __S(529, __c33, 1) as any as S.Schema<ListDeploymentsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "deployments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDeploymentSnapshotsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the snapshots of the specified deployment.
 */
export const listDeploymentSnapshots: API.PaginatedOperationMethod<
  ListDeploymentSnapshotsInput,
  ListDeploymentSnapshotsOutput,
  ListDeploymentSnapshotsError,
  Credentials | HttpClient.HttpClient,
  DeploymentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<ListDeploymentSnapshotsInput>,
  output: __S(561, __c35, 1) as any as S.Schema<ListDeploymentSnapshotsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeploymentSnapshots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "snapshots",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPoliciesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the policies in the account. You can filter the results by status and page through them using `maxResults` and `nextToken`.
 */
export const listPolicies: API.PaginatedOperationMethod<
  ListPoliciesInput,
  ListPoliciesOutput,
  ListPoliciesError,
  Credentials | HttpClient.HttpClient,
  PolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<ListPoliciesInput>,
  output: __S(577, __c36, 1) as any as S.Schema<ListPoliciesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicySnapshotsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the snapshots of the specified policy.
 */
export const listPolicySnapshots: API.PaginatedOperationMethod<
  ListPolicySnapshotsInput,
  ListPolicySnapshotsOutput,
  ListPolicySnapshotsError,
  Credentials | HttpClient.HttpClient,
  PolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<ListPolicySnapshotsInput>,
  output: __S(609, __c38, 1) as any as S.Schema<ListPolicySnapshotsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicySnapshots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "snapshots",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourceAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the resources associated with the specified resource.
 */
export const listResourceAssociations: API.PaginatedOperationMethod<
  ListResourceAssociationsInput,
  ListResourceAssociationsOutput,
  ListResourceAssociationsError,
  Credentials | HttpClient.HttpClient,
  ResourceAssociation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<ListResourceAssociationsInput>,
  output: __S(627, __c39, 3) as any as S.Schema<ListResourceAssociationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resourceAssociations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourceSynchronizationStatusesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the synchronization statuses of the resources covered by the specified deployment. You can filter the results by synchronization status and page through them.
 */
export const listResourceSynchronizationStatuses: API.PaginatedOperationMethod<
  ListResourceSynchronizationStatusesInput,
  ListResourceSynchronizationStatusesOutput,
  ListResourceSynchronizationStatusesError,
  Credentials | HttpClient.HttpClient,
  ResourceSynchronizationStatusSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<ListResourceSynchronizationStatusesInput>,
  output: __S(524, __c32, 12) as any as S.Schema<ListResourceSynchronizationStatusesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceSynchronizationStatuses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resourceSynchronizationStatuses",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRulesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the rules in the account. You can filter the results by status and page through them using `maxResults` and `nextToken`.
 */
export const listRules: API.PaginatedOperationMethod<
  ListRulesInput,
  ListRulesOutput,
  ListRulesError,
  Credentials | HttpClient.HttpClient,
  RuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<ListRulesInput>,
  output: __S(657, __c41, 1) as any as S.Schema<ListRulesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "rules",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRuleSnapshotsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the snapshots of the specified rule.
 */
export const listRuleSnapshots: API.PaginatedOperationMethod<
  ListRuleSnapshotsInput,
  ListRuleSnapshotsOutput,
  ListRuleSnapshotsError,
  Credentials | HttpClient.HttpClient,
  RuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<ListRuleSnapshotsInput>,
  output: __S(689, __c43, 1) as any as S.Schema<ListRuleSnapshotsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleSnapshots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "snapshots",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListScopesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the scopes in the account. You can filter the results by status and page through them using `maxResults` and `nextToken`.
 */
export const listScopes: API.PaginatedOperationMethod<
  ListScopesInput,
  ListScopesOutput,
  ListScopesError,
  Credentials | HttpClient.HttpClient,
  ScopeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<ListScopesInput>,
  output: __S(705, __c44, 1) as any as S.Schema<ListScopesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScopes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scopes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListScopeSnapshotsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the snapshots of the specified scope.
 */
export const listScopeSnapshots: API.PaginatedOperationMethod<
  ListScopeSnapshotsInput,
  ListScopeSnapshotsOutput,
  ListScopeSnapshotsError,
  Credentials | HttpClient.HttpClient,
  ScopeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<ListScopeSnapshotsInput>,
  output: __S(737, __c46, 1) as any as S.Schema<ListScopeSnapshotsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScopeSnapshots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "snapshots",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags associated with the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(753, __c47, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the templates in the account. You can filter the results by status and page through them using `maxResults` and `nextToken`.
 */
export const listTemplates: API.PaginatedOperationMethod<
  ListTemplatesInput,
  ListTemplatesOutput,
  ListTemplatesError,
  Credentials | HttpClient.HttpClient,
  TemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<ListTemplatesInput>,
  output: __S(769, __c48, 1) as any as S.Schema<ListTemplatesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "templates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTemplateSnapshotsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the snapshots of the specified template.
 */
export const listTemplateSnapshots: API.PaginatedOperationMethod<
  ListTemplateSnapshotsInput,
  ListTemplateSnapshotsOutput,
  ListTemplateSnapshotsError,
  Credentials | HttpClient.HttpClient,
  TemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<ListTemplateSnapshotsInput>,
  output: __S(801, __c50, 1) as any as S.Schema<ListTemplateSnapshotsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTemplateSnapshots",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "snapshots",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutAdminAccountError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the AWS account that serves as an AWS Network Security Manager administrator account, and optionally configures the scope of resources that the administrator can manage.
 *
 * You can't set an administrator account again immediately after you remove it, or while the service creates its service-linked role. Retry the request after a few minutes.
 */
export const putAdminAccount: API.OperationMethod<
  PutAdminAccountRequest,
  PutAdminAccountResponse,
  PutAdminAccountError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(819, __c51, 3) as any as S.Schema<PutAdminAccountRequest>,
  output: __S(393, __c24, 9) as any as S.Schema<PutAdminAccountResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAdminAccount",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TagPolicyViolationException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or overwrites the specified tags on the given resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<TagResourceInput>,
  output: __S(256, __c16, 0) as any as S.Schema<TagResourceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TagPolicyViolationException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TagPolicyViolationException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified tags from the given resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(256, __c16, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TagPolicyViolationException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified deployment. To prevent conflicting concurrent updates, provide the current `updateToken`. Use `isPublished` to publish the update or keep the deployment as a draft.
 */
export const updateDeployment: API.OperationMethod<
  UpdateDeploymentInput,
  UpdateDeploymentOutput,
  UpdateDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<UpdateDeploymentInput>,
  output: __S(1060, __c66, 4) as any as S.Schema<UpdateDeploymentOutput>,
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
  operationName: "UpdateDeployment",
}));

export type UpdatePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified policy. To prevent conflicting concurrent updates, provide the current `updateToken`. Use `isPublished` to publish the update or keep the policy as a draft.
 */
export const updatePolicy: API.OperationMethod<
  UpdatePolicyInput,
  UpdatePolicyOutput,
  UpdatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<UpdatePolicyInput>,
  output: __S(36, __c2, 4) as any as S.Schema<UpdatePolicyOutput>,
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
  operationName: "UpdatePolicy",
}));

export type UpdateRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified rule. To prevent conflicting concurrent updates, provide the current `updateToken`. Use `isPublished` to publish the update or keep the rule as a draft.
 */
export const updateRule: API.OperationMethod<
  UpdateRuleInput,
  UpdateRuleOutput,
  UpdateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<UpdateRuleInput>,
  output: __S(96, __c6, 0) as any as S.Schema<UpdateRuleOutput>,
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
  operationName: "UpdateRule",
}));

export type UpdateScopeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified scope. To prevent conflicting concurrent updates, provide the current `updateToken`. Use `isPublished` to publish the update or keep the scope as a draft.
 */
export const updateScope: API.OperationMethod<
  UpdateScopeInput,
  UpdateScopeOutput,
  UpdateScopeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<UpdateScopeInput>,
  output: __S(154, __c9, 10) as any as S.Schema<UpdateScopeOutput>,
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
  operationName: "UpdateScope",
}));

export type UpdateTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified template. To prevent conflicting concurrent updates, provide the current `updateToken`. Use `isPublished` to publish the update or keep the template as a draft.
 */
export const updateTemplate: API.OperationMethod<
  UpdateTemplateInput,
  UpdateTemplateOutput,
  UpdateTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<UpdateTemplateInput>,
  output: __S(194, __c12, 2) as any as S.Schema<UpdateTemplateOutput>,
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
  operationName: "UpdateTemplate",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentIdentifier: S.String.pipe(T.HttpLabel("deploymentIdentifier")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(976, __c61, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/deployments/{deploymentIdentifier}/snapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDeploymentSnapshotInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.String,
          deploymentArn: S.String,
          deploymentName: S.String,
          deploymentDescription: S.optional(S.String),
          status: S.String,
          deploymentConfiguration: S.optional(__S(992, __c62, 0)),
          associatedPolicyList: __S(994, __c62, 2),
          associatedScopeList: __S(996, __c62, 4),
          version: S.String,
          updateToken: S.optional(S.String),
          isSnapshot: S.optional(S.Boolean),
          hasPublishedVersion: S.optional(S.Boolean),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateDeploymentSnapshotOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          policyName: S.String,
          policyDescription: S.optional(S.String),
          priority: S.Number,
          associatedTemplateAndRuleList: S.optional(__S(49, __c3, 1)),
          firewallType: S.String,
          policyConfiguration: __S(33, __c2, 1),
          isPublished: S.optional(S.Boolean),
          tags: S.optional(__S(976, __c61, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/policies" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePolicyInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ existingCustomerWebACLResolution: S.String, conflictResolution: S.String }),
      ).annotate({ identifier: "WafConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          remediationEnabled: S.Boolean,
          resourcesCleanUp: S.Boolean,
          wafConfig: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "PolicyConfiguration" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ templateArn: S.String }),
        /*@__PURE__*/ S.Struct({ ruleArn: S.String }),
      ]);
    case 3:
      return S.Array(__S(34, __c2, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          policyId: S.String,
          policyArn: S.String,
          policyName: S.String,
          policyDescription: S.optional(S.String),
          status: S.String,
          priority: S.Number,
          associatedTemplateAndRuleList: __S(35, __c2, 3),
          version: S.String,
          updateToken: S.optional(S.String),
          isSnapshot: S.optional(S.Boolean),
          hasPublishedVersion: S.optional(S.Boolean),
          firewallType: S.String,
          policyConfiguration: S.optional(__S(33, __c2, 1)),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreatePolicyOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ templateIdentifier: S.String }),
        /*@__PURE__*/ S.Struct({ ruleIdentifier: S.String }),
      ]);
    case 1:
      return S.Array(__S(48, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyIdentifier: S.String.pipe(T.HttpLabel("policyIdentifier")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(976, __c61, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/policies/{policyIdentifier}/snapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePolicySnapshotInput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ruleName: S.String,
          firewallType: S.String,
          ruleType: S.String,
          ruleDescription: S.optional(S.String),
          configuration: S.Any,
          isPublished: S.optional(S.Boolean),
          tags: S.optional(__S(976, __c61, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/rules" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRuleInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleId: S.String,
          ruleArn: S.String,
          ruleName: S.String,
          firewallType: S.String,
          ruleType: S.optional(S.String),
          ruleDescription: S.optional(S.String),
          configuration: S.Any,
          status: S.String,
          version: S.String,
          updateToken: S.optional(S.String),
          isSnapshot: S.optional(S.Boolean),
          hasPublishedVersion: S.optional(S.Boolean),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateRuleOutput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleIdentifier: S.String.pipe(T.HttpLabel("ruleIdentifier")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(976, __c61, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/rules/{ruleIdentifier}/snapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRuleSnapshotInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          scopeName: S.String,
          scopeDescription: S.optional(S.String),
          scopeConfiguration: __S(153, __c9, 9),
          isPublished: S.optional(S.Boolean),
          tags: S.optional(__S(976, __c61, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/scopes" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateScopeInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountIds: S.optional(__S(1008, __c63, 0)),
          organizationalUnits: S.optional(__S(1008, __c63, 0)),
        }),
      ).annotate({ identifier: "AccountSet" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ includeAll: /*@__PURE__*/ S.Struct({}) }),
        /*@__PURE__*/ S.Struct({ include: __S(144, __c9, 0) }),
        /*@__PURE__*/ S.Struct({ exclude: __S(144, __c9, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({ scheme: S.optional(S.String), ipAddressType: S.optional(S.String) }),
      ).annotate({ identifier: "AlbConfiguration" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ tags: __S(976, __c61, 0) }),
        /*@__PURE__*/ S.Struct({ albConfig: __S(146, __c9, 2) }),
      ]);
    case 4:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(149, __c9, 5)).annotate({
          identifier: "ResourceLogicalExpression",
        }),
      );
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ criteria: __S(147, __c9, 3) }),
        /*@__PURE__*/ S.Struct({
          and: /*@__PURE__*/ S.suspend(() => __S(148, __c9, 4)).annotate({
            identifier: "ResourceLogicalExpressionList",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          or: /*@__PURE__*/ S.suspend(() => __S(148, __c9, 4)).annotate({
            identifier: "ResourceLogicalExpressionList",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          not: /*@__PURE__*/ S.suspend(() => __S(149, __c9, 5)).annotate({
            identifier: "ResourceLogicalExpression",
          }),
        }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          explicitArns: S.optional(__S(1008, __c63, 0)),
          expression: S.optional(__S(149, __c9, 5)),
        }),
      ).annotate({ identifier: "ResourceSet" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          includeAll: S.optional(S.Boolean),
          include: S.optional(__S(150, __c9, 6)),
          exclude: S.optional(__S(150, __c9, 6)),
        }),
      ).annotate({ identifier: "ResourceScope" });
    case 8:
      return S.Record(S.String, /*@__PURE__*/ __S(151, __c9, 7).pipe(S.optional));
    case 9:
      return S.suspend(() =>
        S.Struct({
          accountFilter: S.optional(__S(145, __c9, 1)),
          resourceScopes: __S(152, __c9, 8),
        }),
      ).annotate({ identifier: "ScopeConfiguration" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          scopeId: S.String,
          scopeArn: S.String,
          scopeName: S.String,
          scopeDescription: S.optional(S.String),
          scopeConfiguration: S.optional(__S(153, __c9, 9)),
          status: S.String,
          version: S.String,
          updateToken: S.optional(S.String),
          isSnapshot: S.optional(S.Boolean),
          hasPublishedVersion: S.optional(S.Boolean),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateScopeOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scopeIdentifier: S.String.pipe(T.HttpLabel("scopeIdentifier")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(976, __c61, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/scopes/{scopeIdentifier}/snapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateScopeSnapshotInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          templateName: S.String,
          templateDescription: S.optional(S.String),
          associatedRuleList: __S(209, __c13, 1),
          firewallType: S.String,
          isPublished: S.optional(S.Boolean),
          tags: S.optional(__S(976, __c61, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/templates" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateTemplateInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ruleArn: S.String })).annotate({
        identifier: "AssociatedRule",
      });
    case 1:
      return S.Array(__S(192, __c12, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          templateId: S.String,
          templateArn: S.String,
          templateName: S.String,
          templateDescription: S.optional(S.String),
          status: S.String,
          version: S.String,
          associatedRuleList: __S(193, __c12, 1),
          updateToken: S.optional(S.String),
          isSnapshot: S.optional(S.Boolean),
          hasPublishedVersion: S.optional(S.Boolean),
          firewallType: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateTemplateOutput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ruleIdentifier: S.String })).annotate({
        identifier: "RuleReference",
      });
    case 1:
      return S.Array(__S(208, __c13, 0));
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateIdentifier: S.String.pipe(T.HttpLabel("templateIdentifier")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(976, __c61, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/templates/{templateIdentifier}/snapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateTemplateSnapshotInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountId: S.String.pipe(T.HttpLabel("accountId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/admin-account/{accountId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAdminAccountRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAdminAccountResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentIdentifier: S.String.pipe(T.HttpLabel("deploymentIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/deployments/{deploymentIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDeploymentInput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyIdentifier: S.String.pipe(T.HttpLabel("policyIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/policies/{policyIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePolicyInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ruleIdentifier: S.String.pipe(T.HttpLabel("ruleIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/rules/{ruleIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRuleInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scopeIdentifier: S.String.pipe(T.HttpLabel("scopeIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/scopes/{scopeIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteScopeInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ templateIdentifier: S.String.pipe(T.HttpLabel("templateIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/templates/{templateIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTemplateInput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          prompt: SensitiveString,
          ruleFirewallType: S.String,
          ruleType: S.String,
          wafConfigDataType: S.optional(S.String),
          currentConfiguration: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/GenerateRuleConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GenerateRuleConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ configuration: S.String, description: S.optional(S.String) }),
      ).annotate({ identifier: "GenerateRuleConfigurationResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ accountId: S.String.pipe(T.HttpLabel("accountId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/admin-account/{accountId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAdminAccountRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          name: S.optional(SensitiveString),
          email: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AccountReference" });
    case 1:
      return S.Array(__S(384, __c24, 0));
    case 2:
      return S.suspend(() => S.Struct({ ouId: S.String, name: S.optional(S.String) })).annotate({
        identifier: "OrganizationalUnitReference",
      });
    case 3:
      return S.Array(__S(386, __c24, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          accounts: S.optional(__S(385, __c24, 1)),
          organizationalUnits: S.optional(__S(387, __c24, 3)),
        }),
      ).annotate({ identifier: "AdminScopeSelection" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ includeAll: /*@__PURE__*/ S.Struct({}) }),
        /*@__PURE__*/ S.Struct({ includeOnly: __S(388, __c24, 4) }),
        /*@__PURE__*/ S.Struct({ excludeOnly: __S(388, __c24, 4) }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          allFirewallTypesEnabled: S.optional(S.Boolean),
          firewallTypes: S.optional(__S(1024, __c64, 0)),
        }),
      ).annotate({ identifier: "AdminFirewallTypeScope" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          scopeFilter: S.optional(__S(389, __c24, 5)),
          firewallTypeScope: S.optional(__S(390, __c24, 6)),
        }),
      ).annotate({ identifier: "AdminScope" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          adminAccount: S.String,
          priority: S.Number,
          adminScope: S.optional(__S(391, __c24, 7)),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "AdminAccountDetails" });
    case 9:
      return S.suspend(() =>
        S.Struct({ adminAccountDetails: S.optional(__S(392, __c24, 8)) }),
      ).annotate({ identifier: "GetAdminAccountResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ deploymentIdentifier: S.String.pipe(T.HttpLabel("deploymentIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/deployments/{deploymentIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDeploymentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.String,
          deploymentArn: S.String,
          deploymentName: S.String,
          deploymentDescription: S.optional(S.String),
          status: S.String,
          deploymentConfiguration: S.optional(__S(992, __c62, 0)),
          associatedPolicyList: __S(994, __c62, 2),
          associatedScopeList: __S(996, __c62, 4),
          version: S.String,
          updateToken: S.optional(S.String),
          isSnapshot: S.optional(S.Boolean),
          hasPublishedVersion: S.optional(S.Boolean),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          deploymentCoverage: S.optional(__S(1041, __c65, 1)),
          warnings: S.optional(__S(1043, __c65, 3)),
        }),
      ).annotate({ identifier: "GetDeploymentOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyIdentifier: S.String.pipe(T.HttpLabel("policyIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/policies/{policyIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPolicyInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ruleIdentifier: S.String.pipe(T.HttpLabel("ruleIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/rules/{ruleIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRuleInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scopeIdentifier: S.String.pipe(T.HttpLabel("scopeIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/scopes/{scopeIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetScopeInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ templateIdentifier: S.String.pipe(T.HttpLabel("templateIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/templates/{templateIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTemplateInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/admin-accounts" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAdminAccountsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          priority: S.optional(S.Number),
          name: S.optional(SensitiveString),
          email: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AdminAccountSummary" });
    case 2:
      return S.Array(__S(481, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), adminAccounts: __S(482, __c30, 2) }),
      ).annotate({ identifier: "ListAdminAccountsResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          synchronizationStatus: S.optional(S.String).pipe(T.HttpQuery("synchronizationStatus")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/aggregate-sync-statuses" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAggregateResourceSynchronizationStatusesInput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          configurationName: S.optional(S.String),
          expectedValue: S.optional(S.String),
          actualValue: S.optional(S.String),
        }),
      ).annotate({ identifier: "ConfigurationIssue" });
    case 1:
      return S.Array(__S(512, __c32, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          incorrectSingleValueConfigurations: S.optional(__S(513, __c32, 1)),
          missingAppendableConfigurationValues: S.optional(__S(513, __c32, 1)),
          unexpectedAppendableConfigurationValues: S.optional(__S(513, __c32, 1)),
          incorrectAppendableConfigurationOrder: S.optional(__S(513, __c32, 1)),
          missingMergeableConfigurationValues: S.optional(__S(513, __c32, 1)),
          unexpectedMergeableConfigurationValues: S.optional(__S(513, __c32, 1)),
        }),
      ).annotate({ identifier: "InvalidFirewallReasons" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ missingFirewall: S.String }),
        /*@__PURE__*/ S.Struct({ invalidFirewall: __S(514, __c32, 2) }),
      ]);
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(515, __c32, 3).pipe(S.optional));
    case 5:
      return S.suspend(() => S.Struct({ reason: S.String })).annotate({
        identifier: "NotVisibleMarker",
      });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ reasons: __S(516, __c32, 4) }),
        /*@__PURE__*/ S.Struct({ notVisible: __S(517, __c32, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          issueType: S.optional(S.String),
          message: S.optional(S.String),
          correctiveAction: S.optional(S.String),
        }),
      ).annotate({ identifier: "RemediationIssueDetails" });
    case 8:
      return S.Record(S.String, /*@__PURE__*/ __S(519, __c32, 7).pipe(S.optional));
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ issues: __S(520, __c32, 8) }),
        /*@__PURE__*/ S.Struct({ notVisible: __S(517, __c32, 5) }),
      ]);
    case 10:
      return S.suspend(() =>
        S.Struct({
          synchronizationStatus: S.String,
          accountId: S.String,
          resourceArn: S.String,
          deploymentArn: S.optional(S.String),
          resourceType: S.optional(S.String),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          outOfSyncReasons: S.optional(__S(518, __c32, 6)),
          remediationIssues: S.optional(__S(521, __c32, 9)),
          evaluatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ResourceSynchronizationStatusSummary" });
    case 11:
      return S.Array(__S(522, __c32, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          resourceSynchronizationStatuses: __S(523, __c32, 11),
        }),
      ).annotate({ identifier: "ListAggregateResourceSynchronizationStatusesOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/deployments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDeploymentsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), deployments: __S(545, __c34, 1) }),
      ).annotate({ identifier: "ListDeploymentsOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.String,
          deploymentArn: S.String,
          deploymentName: S.optional(S.String),
          status: S.optional(S.String),
          version: S.optional(S.String),
          hasPublishedVersion: S.optional(S.Boolean),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "DeploymentSummary" });
    case 1:
      return S.Array(__S(544, __c34, 0));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentIdentifier: S.String.pipe(T.HttpLabel("deploymentIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/deployments/{deploymentIdentifier}/snapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDeploymentSnapshotsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), snapshots: __S(545, __c34, 1) }),
      ).annotate({ identifier: "ListDeploymentSnapshotsOutput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/policies" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPoliciesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), policies: __S(593, __c37, 1) }),
      ).annotate({ identifier: "ListPoliciesOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyId: S.String,
          policyArn: S.String,
          policyName: S.optional(S.String),
          status: S.optional(S.String),
          version: S.optional(S.String),
          hasPublishedVersion: S.optional(S.Boolean),
          firewallType: S.optional(S.String),
          priority: S.optional(S.Number),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "PolicySummary" });
    case 1:
      return S.Array(__S(592, __c37, 0));
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyIdentifier: S.String.pipe(T.HttpLabel("policyIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/policies/{policyIdentifier}/snapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPolicySnapshotsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), snapshots: __S(593, __c37, 1) }),
      ).annotate({ identifier: "ListPolicySnapshotsOutput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceIdentifier: S.String.pipe(T.HttpQuery("resourceIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/resource-associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourceAssociationsInput" });
    case 1:
      return S.suspend(() => S.Struct({ arn: S.String, resourceType: S.String })).annotate({
        identifier: "ResourceAssociation",
      });
    case 2:
      return S.Array(__S(625, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), resourceAssociations: __S(626, __c39, 2) }),
      ).annotate({ identifier: "ListResourceAssociationsOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentIdentifier: S.String.pipe(T.HttpQuery("deploymentIdentifier")),
          synchronizationStatus: S.optional(S.String).pipe(T.HttpQuery("synchronizationStatus")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/resource-sync-statuses" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourceSynchronizationStatusesInput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/rules" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListRulesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), rules: __S(673, __c42, 1) }),
      ).annotate({ identifier: "ListRulesOutput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleId: S.String,
          ruleArn: S.String,
          ruleName: S.String,
          firewallType: S.optional(S.String),
          ruleType: S.optional(S.String),
          status: S.optional(S.String),
          version: S.optional(S.String),
          hasPublishedVersion: S.optional(S.Boolean),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "RuleSummary" });
    case 1:
      return S.Array(__S(672, __c42, 0));
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleIdentifier: S.String.pipe(T.HttpLabel("ruleIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/rules/{ruleIdentifier}/snapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRuleSnapshotsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), snapshots: __S(673, __c42, 1) }),
      ).annotate({ identifier: "ListRuleSnapshotsOutput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/scopes" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListScopesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), scopes: __S(721, __c45, 1) }),
      ).annotate({ identifier: "ListScopesOutput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scopeId: S.String,
          scopeArn: S.String,
          scopeName: S.optional(S.String),
          status: S.optional(S.String),
          version: S.optional(S.String),
          hasPublishedVersion: S.optional(S.Boolean),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ScopeSummary" });
    case 1:
      return S.Array(__S(720, __c45, 0));
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scopeIdentifier: S.String.pipe(T.HttpLabel("scopeIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/scopes/{scopeIdentifier}/snapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListScopeSnapshotsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), snapshots: __S(721, __c45, 1) }),
      ).annotate({ identifier: "ListScopeSnapshotsOutput" });
  }
}
function __c47(j: number): any {
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
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(976, __c61, 0)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/templates" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTemplatesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), templates: __S(785, __c49, 1) }),
      ).annotate({ identifier: "ListTemplatesOutput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateId: S.String,
          templateArn: S.String,
          templateName: S.String,
          status: S.optional(S.String),
          version: S.optional(S.String),
          hasPublishedVersion: S.optional(S.Boolean),
          firewallType: S.optional(S.String),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "TemplateSummary" });
    case 1:
      return S.Array(__S(784, __c49, 0));
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateIdentifier: S.String.pipe(T.HttpLabel("templateIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/templates/{templateIdentifier}/snapshots" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTemplateSnapshotsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), snapshots: __S(785, __c49, 1) }),
      ).annotate({ identifier: "ListTemplateSnapshotsOutput" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accounts: S.optional(__S(1008, __c63, 0)),
          organizationalUnits: S.optional(__S(1008, __c63, 0)),
        }),
      ).annotate({ identifier: "AdminScopeSelectionInput" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ includeAll: /*@__PURE__*/ S.Struct({}) }),
        /*@__PURE__*/ S.Struct({ includeOnly: __S(816, __c51, 0) }),
        /*@__PURE__*/ S.Struct({ excludeOnly: __S(816, __c51, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          scopeFilter: S.optional(__S(817, __c51, 1)),
          firewallTypeScope: S.optional(__S(390, __c24, 6)),
        }),
      ).annotate({ identifier: "AdminScopeInput" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          priority: S.Number,
          adminScope: S.optional(__S(818, __c51, 2)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/admin-account" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutAdminAccountRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(976, __c61, 0),
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
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(1008, __c63, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deploymentIdentifier: S.String.pipe(T.HttpLabel("deploymentIdentifier")),
          updateToken: S.String,
          deploymentDescription: S.optional(S.String),
          deploymentConfiguration: S.optional(__S(992, __c62, 0)),
          associatedPolicyList: S.optional(__S(1057, __c66, 1)),
          associatedScopeList: S.optional(__S(1059, __c66, 3)),
          isPublished: S.Boolean,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/deployments/{deploymentIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDeploymentInput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyIdentifier: S.String.pipe(T.HttpLabel("policyIdentifier")),
          updateToken: S.String,
          policyDescription: S.optional(S.String),
          priority: S.optional(S.Number),
          associatedTemplateAndRuleList: S.optional(__S(49, __c3, 1)),
          policyConfiguration: S.optional(__S(33, __c2, 1)),
          isPublished: S.Boolean,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/policies/{policyIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePolicyInput" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleIdentifier: S.String.pipe(T.HttpLabel("ruleIdentifier")),
          updateToken: S.String,
          ruleType: S.optional(S.String),
          ruleDescription: S.optional(S.String),
          configuration: S.optional(S.Any),
          isPublished: S.Boolean,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/rules/{ruleIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRuleInput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scopeIdentifier: S.String.pipe(T.HttpLabel("scopeIdentifier")),
          updateToken: S.String,
          scopeDescription: S.optional(S.String),
          scopeConfiguration: S.optional(__S(153, __c9, 9)),
          isPublished: S.Boolean,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/scopes/{scopeIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateScopeInput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templateIdentifier: S.String.pipe(T.HttpLabel("templateIdentifier")),
          updateToken: S.String,
          templateDescription: S.optional(S.String),
          associatedRuleList: S.optional(__S(209, __c13, 1)),
          isPublished: S.Boolean,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/templates/{templateIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateTemplateInput" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(944, __c59, 0));
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          deploymentName: S.String,
          deploymentDescription: S.optional(S.String),
          deploymentConfiguration: __S(992, __c62, 0),
          associatedPolicyList: __S(1057, __c66, 1),
          associatedScopeList: __S(1059, __c66, 3),
          isPublished: S.optional(S.Boolean),
          tags: S.optional(__S(976, __c61, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/deployments" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateDeploymentInput" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ enableCrossAccountVisibility: S.Boolean })).annotate({
        identifier: "DeploymentConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ policyArn: S.String })).annotate({
        identifier: "AssociatedPolicy",
      });
    case 2:
      return S.Array(__S(993, __c62, 1));
    case 3:
      return S.suspend(() => S.Struct({ scopeArn: S.String })).annotate({
        identifier: "AssociatedScope",
      });
    case 4:
      return S.Array(__S(995, __c62, 3));
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          firewallType: S.String,
          policyArns: __S(1008, __c63, 0),
          inScopeResourceTypes: __S(1024, __c64, 0),
        }),
      ).annotate({ identifier: "DeploymentCoverageEntry" });
    case 1:
      return S.Array(__S(1040, __c65, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ code: S.String, policyArn: S.String, message: S.String }),
      ).annotate({ identifier: "DeploymentWarningEntry" });
    case 3:
      return S.Array(__S(1042, __c65, 2));
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ policyIdentifier: S.String })).annotate({
        identifier: "PolicyReference",
      });
    case 1:
      return S.Array(__S(1056, __c66, 0));
    case 2:
      return S.suspend(() => S.Struct({ scopeIdentifier: S.String })).annotate({
        identifier: "ScopeReference",
      });
    case 3:
      return S.Array(__S(1058, __c66, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          deploymentId: S.String,
          deploymentArn: S.String,
          deploymentName: S.String,
          deploymentDescription: S.optional(S.String),
          status: S.String,
          deploymentConfiguration: S.optional(__S(992, __c62, 0)),
          associatedPolicyList: __S(994, __c62, 2),
          associatedScopeList: __S(996, __c62, 4),
          version: S.String,
          updateToken: S.optional(S.String),
          isSnapshot: S.optional(S.Boolean),
          hasPublishedVersion: S.optional(S.Boolean),
          deploymentCoverage: S.optional(__S(1041, __c65, 1)),
          warnings: S.optional(__S(1043, __c65, 3)),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CreateDeploymentOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
