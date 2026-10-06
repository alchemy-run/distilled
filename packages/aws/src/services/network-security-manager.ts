import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema";
import * as HttpClient from "effect/http/HttpClient";
import * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
const svc = T.AwsApiService({
  sdkId: "Network Security Manager",
  serviceShapeName: "PiccoloCustomerAPIService",
});
const auth = T.AwsAuthSigv4({ name: "network-security-manager" });
const ver = T.ServiceVersion("2025-10-30");
const proto = T.AwsProtocolsRestJson1();
const rules = T.EndpointResolver((p, _) => {
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
});

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.all(T.HttpError(500), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      quotaCode: S.optional(S.String),
      serviceCode: S.optional(S.String),
      resourceId: S.optional(S.String),
      resourceType: S.optional(S.String),
    },
    T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: S.String.pipe(T.ErrorMessage()), retryAfterSeconds: S.optional(S.Number) },
    T.all(T.HttpError(503), T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class TagPolicyViolationException
  extends /*@__PURE__*/ S.TaggedError<TagPolicyViolationException>()(
    "TagPolicyViolationException",
    { message: S.String.pipe(T.ErrorMessage()) },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: S.String.pipe(T.ErrorMessage()), retryAfterSeconds: S.optional(S.Number) },
    T.all(T.HttpError(429), T.Retryable({ throttling: true })),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: S.String.pipe(T.ErrorMessage()),
      reason: S.optional(
        S.suspend(() => ValidationExceptionReason).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      fieldList: S.optional(
        S.suspend(() => ValidationExceptionFieldList).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type IdempotencyToken = string;
export type DeploymentName = string;
export type Description = string;
export type EnableCrossAccountVisibility = boolean;
export interface DeploymentConfiguration {
  enableCrossAccountVisibility: boolean;
}
export const DeploymentConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ enableCrossAccountVisibility: S.Boolean }),
).annotate({ identifier: "DeploymentConfiguration" }) as any as S.Schema<DeploymentConfiguration>;
export type PolicyIdentifier = string;
export interface PolicyReference {
  policyIdentifier: string;
}
export const PolicyReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyIdentifier: S.String }),
).annotate({ identifier: "PolicyReference" }) as any as S.Schema<PolicyReference>;
export type PolicyReferenceList = PolicyReference[];
export const PolicyReferenceList = /*@__PURE__*/ S.Array(PolicyReference);
export type ScopeIdentifier = string;
export interface ScopeReference {
  scopeIdentifier: string;
}
export const ScopeReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scopeIdentifier: S.String }),
).annotate({ identifier: "ScopeReference" }) as any as S.Schema<ScopeReference>;
export type ScopeReferenceList = ScopeReference[];
export const ScopeReferenceList = /*@__PURE__*/ S.Array(ScopeReference);
export type IsPublished = boolean;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
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
export const CreateDeploymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    deploymentName: S.String,
    deploymentDescription: S.optional(S.String),
    deploymentConfiguration: DeploymentConfiguration,
    associatedPolicyList: PolicyReferenceList,
    associatedScopeList: ScopeReferenceList,
    isPublished: S.optional(S.Boolean),
    tags: S.optional(TagMap),
  }).pipe(T.all(T.Http({ method: "POST", uri: "/deployments" }), svc, auth, proto, ver, rules)),
).annotate({ identifier: "CreateDeploymentInput" }) as any as S.Schema<CreateDeploymentInput>;
export type DeploymentId = string;
export type DeploymentArn = string;
export type EntityStatus = "DRAFT" | "ACTIVE" | "DISABLED" | (string & {});
export const EntityStatus = S.String;

export type PolicyArn = string;
export interface AssociatedPolicy {
  policyArn: string;
}
export const AssociatedPolicy = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ policyArn: S.String }),
).annotate({ identifier: "AssociatedPolicy" }) as any as S.Schema<AssociatedPolicy>;
export type AssociatedPolicyList = AssociatedPolicy[];
export const AssociatedPolicyList = /*@__PURE__*/ S.Array(AssociatedPolicy);
export type ScopeArn = string;
export interface AssociatedScope {
  scopeArn: string;
}
export const AssociatedScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scopeArn: S.String }),
).annotate({ identifier: "AssociatedScope" }) as any as S.Schema<AssociatedScope>;
export type AssociatedScopeList = AssociatedScope[];
export const AssociatedScopeList = /*@__PURE__*/ S.Array(AssociatedScope);
export type EntityVersion = string;
export type UpdateToken = string;
export type IsSnapshot = boolean;
export type HasPublishedVersion = boolean;
export type PolicyFirewallType = "WAF" | "SHIELD_ADVANCED" | (string & {});
export const PolicyFirewallType = S.String;

export type DeploymentPolicyArnList = string[];
export const DeploymentPolicyArnList = /*@__PURE__*/ S.Array(S.String);
export type ScopeResourceType =
  | "AWS::ApiGateway::Stage"
  | "AWS::CloudFront::Distribution"
  | "AWS::EC2::EIP"
  | "AWS::ElasticLoadBalancingV2::LoadBalancer::application"
  | "AWS::ElasticLoadBalancing::LoadBalancer"
  | (string & {});
export const ScopeResourceType = S.String;

export type DeploymentResourceTypeList = ScopeResourceType[];
export const DeploymentResourceTypeList = /*@__PURE__*/ S.Array(ScopeResourceType);
export interface DeploymentCoverageEntry {
  firewallType: PolicyFirewallType;
  policyArns: string[];
  inScopeResourceTypes: ScopeResourceType[];
}
export const DeploymentCoverageEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    firewallType: PolicyFirewallType,
    policyArns: DeploymentPolicyArnList,
    inScopeResourceTypes: DeploymentResourceTypeList,
  }),
).annotate({ identifier: "DeploymentCoverageEntry" }) as any as S.Schema<DeploymentCoverageEntry>;
export type DeploymentCoverageList = DeploymentCoverageEntry[];
export const DeploymentCoverageList = /*@__PURE__*/ S.Array(DeploymentCoverageEntry);
export interface DeploymentWarningEntry {
  code: string;
  policyArn: string;
  message: string;
}
export const DeploymentWarningEntry = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ code: S.String, policyArn: S.String, message: S.String }),
).annotate({ identifier: "DeploymentWarningEntry" }) as any as S.Schema<DeploymentWarningEntry>;
export type DeploymentWarningList = DeploymentWarningEntry[];
export const DeploymentWarningList = /*@__PURE__*/ S.Array(DeploymentWarningEntry);
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
export const CreateDeploymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.String,
    deploymentArn: S.String,
    deploymentName: S.String,
    deploymentDescription: S.optional(S.String),
    status: EntityStatus,
    deploymentConfiguration: S.optional(DeploymentConfiguration),
    associatedPolicyList: AssociatedPolicyList,
    associatedScopeList: AssociatedScopeList,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    deploymentCoverage: S.optional(DeploymentCoverageList),
    warnings: S.optional(DeploymentWarningList),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "CreateDeploymentOutput" }) as any as S.Schema<CreateDeploymentOutput>;
export type DeploymentIdentifier = string;
export interface CreateDeploymentSnapshotInput {
  deploymentIdentifier: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateDeploymentSnapshotInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentIdentifier: S.String.pipe(T.HttpLabel("deploymentIdentifier")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
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
).annotate({
  identifier: "CreateDeploymentSnapshotInput",
}) as any as S.Schema<CreateDeploymentSnapshotInput>;
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
export const CreateDeploymentSnapshotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.String,
    deploymentArn: S.String,
    deploymentName: S.String,
    deploymentDescription: S.optional(S.String),
    status: EntityStatus,
    deploymentConfiguration: S.optional(DeploymentConfiguration),
    associatedPolicyList: AssociatedPolicyList,
    associatedScopeList: AssociatedScopeList,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "CreateDeploymentSnapshotOutput",
}) as any as S.Schema<CreateDeploymentSnapshotOutput>;
export type PolicyName = string;
export type Priority = number;
export type TemplateIdentifier = string;
export type RuleIdentifier = string;
export type TemplateOrRuleReference =
  | { templateIdentifier: string; ruleIdentifier?: never }
  | { templateIdentifier?: never; ruleIdentifier: string };
export const TemplateOrRuleReference = /*@__PURE__*/ S.Union([
  S.Struct({ templateIdentifier: S.String }),
  S.Struct({ ruleIdentifier: S.String }),
]);
export type TemplateAndRuleReferenceList = TemplateOrRuleReference[];
export const TemplateAndRuleReferenceList = /*@__PURE__*/ S.Array(TemplateOrRuleReference);
export type RemediationEnabled = boolean;
export type ResourcesCleanUp = boolean;
export type ExistingCustomerWebACLResolution =
  | "RETROFIT"
  | "OVERRIDE_ASSOCIATION"
  | "NO_REMEDIATION"
  | (string & {});
export const ExistingCustomerWebACLResolution = S.String;

export type WAFConflictResolutionOptions = "MERGE_WHERE_APPLICABLE" | (string & {});
export const WAFConflictResolutionOptions = S.String;

export interface WafConfig {
  existingCustomerWebACLResolution: ExistingCustomerWebACLResolution;
  conflictResolution: WAFConflictResolutionOptions;
}
export const WafConfig = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    existingCustomerWebACLResolution: ExistingCustomerWebACLResolution,
    conflictResolution: WAFConflictResolutionOptions,
  }),
).annotate({ identifier: "WafConfig" }) as any as S.Schema<WafConfig>;
export interface PolicyConfiguration {
  remediationEnabled: boolean;
  resourcesCleanUp: boolean;
  wafConfig?: WafConfig;
}
export const PolicyConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    remediationEnabled: S.Boolean,
    resourcesCleanUp: S.Boolean,
    wafConfig: S.optional(WafConfig),
  }),
).annotate({ identifier: "PolicyConfiguration" }) as any as S.Schema<PolicyConfiguration>;
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
export const CreatePolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    policyName: S.String,
    policyDescription: S.optional(S.String),
    priority: S.Number,
    associatedTemplateAndRuleList: S.optional(TemplateAndRuleReferenceList),
    firewallType: PolicyFirewallType,
    policyConfiguration: PolicyConfiguration,
    isPublished: S.optional(S.Boolean),
    tags: S.optional(TagMap),
  }).pipe(T.all(T.Http({ method: "POST", uri: "/policies" }), svc, auth, proto, ver, rules)),
).annotate({ identifier: "CreatePolicyInput" }) as any as S.Schema<CreatePolicyInput>;
export type PolicyId = string;
export type TemplateArn = string;
export type RuleArn = string;
export type AssociatedTemplateOrRule =
  | { templateArn: string; ruleArn?: never }
  | { templateArn?: never; ruleArn: string };
export const AssociatedTemplateOrRule = /*@__PURE__*/ S.Union([
  S.Struct({ templateArn: S.String }),
  S.Struct({ ruleArn: S.String }),
]);
export type AssociatedTemplateAndRuleList = AssociatedTemplateOrRule[];
export const AssociatedTemplateAndRuleList = /*@__PURE__*/ S.Array(AssociatedTemplateOrRule);
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
export const CreatePolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyId: S.String,
    policyArn: S.String,
    policyName: S.String,
    policyDescription: S.optional(S.String),
    status: EntityStatus,
    priority: S.Number,
    associatedTemplateAndRuleList: AssociatedTemplateAndRuleList,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    firewallType: PolicyFirewallType,
    policyConfiguration: S.optional(PolicyConfiguration),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "CreatePolicyOutput" }) as any as S.Schema<CreatePolicyOutput>;
export interface CreatePolicySnapshotInput {
  policyIdentifier: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreatePolicySnapshotInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyIdentifier: S.String.pipe(T.HttpLabel("policyIdentifier")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
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
).annotate({
  identifier: "CreatePolicySnapshotInput",
}) as any as S.Schema<CreatePolicySnapshotInput>;
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
export const CreatePolicySnapshotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyId: S.String,
    policyArn: S.String,
    policyName: S.String,
    policyDescription: S.optional(S.String),
    status: EntityStatus,
    priority: S.Number,
    associatedTemplateAndRuleList: AssociatedTemplateAndRuleList,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    firewallType: PolicyFirewallType,
    policyConfiguration: S.optional(PolicyConfiguration),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "CreatePolicySnapshotOutput",
}) as any as S.Schema<CreatePolicySnapshotOutput>;
export type RuleName = string;
export type RuleFirewallType = "WAF" | (string & {});
export const RuleFirewallType = S.String;

export type RuleType = "CONFIGURATION" | "INSPECTION" | (string & {});
export const RuleType = S.String;

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
export const CreateRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    ruleName: S.String,
    firewallType: RuleFirewallType,
    ruleType: RuleType,
    ruleDescription: S.optional(S.String),
    configuration: S.Any,
    isPublished: S.optional(S.Boolean),
    tags: S.optional(TagMap),
  }).pipe(T.all(T.Http({ method: "POST", uri: "/rules" }), svc, auth, proto, ver, rules)),
).annotate({ identifier: "CreateRuleInput" }) as any as S.Schema<CreateRuleInput>;
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
export const CreateRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.String,
    ruleArn: S.String,
    ruleName: S.String,
    firewallType: RuleFirewallType,
    ruleType: S.optional(RuleType),
    ruleDescription: S.optional(S.String),
    configuration: S.Any,
    status: EntityStatus,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "CreateRuleOutput" }) as any as S.Schema<CreateRuleOutput>;
export interface CreateRuleSnapshotInput {
  ruleIdentifier: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateRuleSnapshotInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleIdentifier: S.String.pipe(T.HttpLabel("ruleIdentifier")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
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
).annotate({ identifier: "CreateRuleSnapshotInput" }) as any as S.Schema<CreateRuleSnapshotInput>;
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
export const CreateRuleSnapshotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.String,
    ruleArn: S.String,
    ruleName: S.String,
    firewallType: RuleFirewallType,
    ruleType: S.optional(RuleType),
    ruleDescription: S.optional(S.String),
    configuration: S.Any,
    status: EntityStatus,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "CreateRuleSnapshotOutput" }) as any as S.Schema<CreateRuleSnapshotOutput>;
export type ScopeName = string;
export type AccountId = string;
export type AccountList = string[];
export const AccountList = /*@__PURE__*/ S.Array(S.String);
export type OrganizationalUnit = string;
export type OrganizationalUnitList = string[];
export const OrganizationalUnitList = /*@__PURE__*/ S.Array(S.String);
export interface AccountSet {
  accountIds?: string[];
  organizationalUnits?: string[];
}
export const AccountSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountIds: S.optional(AccountList),
    organizationalUnits: S.optional(OrganizationalUnitList),
  }),
).annotate({ identifier: "AccountSet" }) as any as S.Schema<AccountSet>;
export type AccountFilter =
  | { includeAll: Record<string, never>; include?: never; exclude?: never }
  | { includeAll?: never; include: AccountSet; exclude?: never }
  | { includeAll?: never; include?: never; exclude: AccountSet };
export const AccountFilter = /*@__PURE__*/ S.Union([
  S.Struct({ includeAll: S.Struct({}) }),
  S.Struct({ include: AccountSet }),
  S.Struct({ exclude: AccountSet }),
]);
export type Arn = string;
export type ResourceArnList = string[];
export const ResourceArnList = /*@__PURE__*/ S.Array(S.String);
export type StringMap = { [key: string]: string | undefined };
export const StringMap = /*@__PURE__*/ S.Record(S.String, S.String.pipe(S.optional));
export type Scheme = "internet-facing" | "internal" | (string & {});
export const Scheme = S.String;

export type IpAddressType = "ipv4" | "dualstack" | "dualstack-without-public-ipv4" | (string & {});
export const IpAddressType = S.String;

export interface AlbConfiguration {
  scheme?: Scheme;
  ipAddressType?: IpAddressType;
}
export const AlbConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ scheme: S.optional(Scheme), ipAddressType: S.optional(IpAddressType) }),
).annotate({ identifier: "AlbConfiguration" }) as any as S.Schema<AlbConfiguration>;
export type ResourceCriteria =
  | { tags: { [key: string]: string | undefined }; albConfig?: never }
  | { tags?: never; albConfig: AlbConfiguration };
export const ResourceCriteria = /*@__PURE__*/ S.Union([
  S.Struct({ tags: StringMap }),
  S.Struct({ albConfig: AlbConfiguration }),
]);
export type ResourceLogicalExpressionList = ResourceLogicalExpression[];
export const ResourceLogicalExpressionList = /*@__PURE__*/ S.Array(
  S.suspend(() => ResourceLogicalExpression).annotate({ identifier: "ResourceLogicalExpression" }),
) as any as S.Schema<ResourceLogicalExpressionList>;
export type ResourceLogicalExpression =
  | { criteria: ResourceCriteria; and?: never; or?: never; not?: never }
  | { criteria?: never; and: ResourceLogicalExpression[]; or?: never; not?: never }
  | { criteria?: never; and?: never; or: ResourceLogicalExpression[]; not?: never }
  | { criteria?: never; and?: never; or?: never; not: ResourceLogicalExpression };
export const ResourceLogicalExpression = /*@__PURE__*/ S.Union([
  S.Struct({ criteria: ResourceCriteria }),
  S.Struct({
    and: S.suspend(() => ResourceLogicalExpressionList).annotate({
      identifier: "ResourceLogicalExpressionList",
    }),
  }),
  S.Struct({
    or: S.suspend(() => ResourceLogicalExpressionList).annotate({
      identifier: "ResourceLogicalExpressionList",
    }),
  }),
  S.Struct({
    not: S.suspend(() => ResourceLogicalExpression).annotate({
      identifier: "ResourceLogicalExpression",
    }),
  }),
]) as any as S.Schema<ResourceLogicalExpression>;
export interface ResourceSet {
  explicitArns?: string[];
  expression?: ResourceLogicalExpression;
}
export const ResourceSet = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    explicitArns: S.optional(ResourceArnList),
    expression: S.optional(ResourceLogicalExpression),
  }),
).annotate({ identifier: "ResourceSet" }) as any as S.Schema<ResourceSet>;
export interface ResourceScope {
  includeAll?: boolean;
  include?: ResourceSet;
  exclude?: ResourceSet;
}
export const ResourceScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    includeAll: S.optional(S.Boolean),
    include: S.optional(ResourceSet),
    exclude: S.optional(ResourceSet),
  }),
).annotate({ identifier: "ResourceScope" }) as any as S.Schema<ResourceScope>;
export type ResourceScopeMap = { [key in ScopeResourceType]?: ResourceScope };
export const ResourceScopeMap = /*@__PURE__*/ S.Record(
  ScopeResourceType,
  ResourceScope.pipe(S.optional),
);
export interface ScopeConfiguration {
  accountFilter?: AccountFilter;
  resourceScopes: { [key: string]: ResourceScope | undefined };
}
export const ScopeConfiguration = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ accountFilter: S.optional(AccountFilter), resourceScopes: ResourceScopeMap }),
).annotate({ identifier: "ScopeConfiguration" }) as any as S.Schema<ScopeConfiguration>;
export interface CreateScopeInput {
  clientToken?: string;
  scopeName: string;
  scopeDescription?: string;
  scopeConfiguration: ScopeConfiguration;
  isPublished?: boolean;
  tags?: { [key: string]: string | undefined };
}
export const CreateScopeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    scopeName: S.String,
    scopeDescription: S.optional(S.String),
    scopeConfiguration: ScopeConfiguration,
    isPublished: S.optional(S.Boolean),
    tags: S.optional(TagMap),
  }).pipe(T.all(T.Http({ method: "POST", uri: "/scopes" }), svc, auth, proto, ver, rules)),
).annotate({ identifier: "CreateScopeInput" }) as any as S.Schema<CreateScopeInput>;
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
export const CreateScopeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scopeId: S.String,
    scopeArn: S.String,
    scopeName: S.String,
    scopeDescription: S.optional(S.String),
    scopeConfiguration: S.optional(ScopeConfiguration),
    status: EntityStatus,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "CreateScopeOutput" }) as any as S.Schema<CreateScopeOutput>;
export interface CreateScopeSnapshotInput {
  scopeIdentifier: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateScopeSnapshotInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scopeIdentifier: S.String.pipe(T.HttpLabel("scopeIdentifier")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
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
).annotate({ identifier: "CreateScopeSnapshotInput" }) as any as S.Schema<CreateScopeSnapshotInput>;
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
export const CreateScopeSnapshotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scopeId: S.String,
    scopeArn: S.String,
    scopeName: S.String,
    scopeDescription: S.optional(S.String),
    scopeConfiguration: S.optional(ScopeConfiguration),
    status: EntityStatus,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "CreateScopeSnapshotOutput",
}) as any as S.Schema<CreateScopeSnapshotOutput>;
export type TemplateName = string;
export interface RuleReference {
  ruleIdentifier: string;
}
export const RuleReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ruleIdentifier: S.String }),
).annotate({ identifier: "RuleReference" }) as any as S.Schema<RuleReference>;
export type RuleReferenceList = RuleReference[];
export const RuleReferenceList = /*@__PURE__*/ S.Array(RuleReference);
export type TemplateFirewallType = "WAF" | (string & {});
export const TemplateFirewallType = S.String;

export interface CreateTemplateInput {
  clientToken?: string;
  templateName: string;
  templateDescription?: string;
  associatedRuleList: RuleReference[];
  firewallType: TemplateFirewallType;
  isPublished?: boolean;
  tags?: { [key: string]: string | undefined };
}
export const CreateTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    templateName: S.String,
    templateDescription: S.optional(S.String),
    associatedRuleList: RuleReferenceList,
    firewallType: TemplateFirewallType,
    isPublished: S.optional(S.Boolean),
    tags: S.optional(TagMap),
  }).pipe(T.all(T.Http({ method: "POST", uri: "/templates" }), svc, auth, proto, ver, rules)),
).annotate({ identifier: "CreateTemplateInput" }) as any as S.Schema<CreateTemplateInput>;
export type TemplateId = string;
export interface AssociatedRule {
  ruleArn: string;
}
export const AssociatedRule = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ruleArn: S.String }),
).annotate({ identifier: "AssociatedRule" }) as any as S.Schema<AssociatedRule>;
export type AssociatedRuleList = AssociatedRule[];
export const AssociatedRuleList = /*@__PURE__*/ S.Array(AssociatedRule);
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
export const CreateTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateId: S.String,
    templateArn: S.String,
    templateName: S.String,
    templateDescription: S.optional(S.String),
    status: EntityStatus,
    version: S.String,
    associatedRuleList: AssociatedRuleList,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    firewallType: TemplateFirewallType,
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "CreateTemplateOutput" }) as any as S.Schema<CreateTemplateOutput>;
export interface CreateTemplateSnapshotInput {
  templateIdentifier: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateTemplateSnapshotInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateIdentifier: S.String.pipe(T.HttpLabel("templateIdentifier")),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
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
).annotate({
  identifier: "CreateTemplateSnapshotInput",
}) as any as S.Schema<CreateTemplateSnapshotInput>;
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
export const CreateTemplateSnapshotOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateId: S.String,
    templateArn: S.String,
    templateName: S.String,
    templateDescription: S.optional(S.String),
    status: EntityStatus,
    version: S.String,
    associatedRuleList: AssociatedRuleList,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    firewallType: TemplateFirewallType,
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "CreateTemplateSnapshotOutput",
}) as any as S.Schema<CreateTemplateSnapshotOutput>;
export interface DeleteAdminAccountRequest {
  accountId: string;
}
export const DeleteAdminAccountRequest = /*@__PURE__*/ S.suspend(() =>
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
).annotate({
  identifier: "DeleteAdminAccountRequest",
}) as any as S.Schema<DeleteAdminAccountRequest>;
export interface DeleteAdminAccountResponse {}
export const DeleteAdminAccountResponse = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteAdminAccountResponse",
}) as any as S.Schema<DeleteAdminAccountResponse>;
export interface DeleteDeploymentInput {
  deploymentIdentifier: string;
}
export const DeleteDeploymentInput = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "DeleteDeploymentInput" }) as any as S.Schema<DeleteDeploymentInput>;
export interface DeleteDeploymentResponse {}
export const DeleteDeploymentResponse = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteDeploymentResponse",
}) as any as S.Schema<DeleteDeploymentResponse>;
export interface DeletePolicyInput {
  policyIdentifier: string;
}
export const DeletePolicyInput = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "DeletePolicyInput" }) as any as S.Schema<DeletePolicyInput>;
export interface DeletePolicyResponse {}
export const DeletePolicyResponse = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "DeletePolicyResponse",
}) as any as S.Schema<DeletePolicyResponse>;
export interface DeleteRuleInput {
  ruleIdentifier: string;
}
export const DeleteRuleInput = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "DeleteRuleInput" }) as any as S.Schema<DeleteRuleInput>;
export interface DeleteRuleResponse {}
export const DeleteRuleResponse = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteRuleResponse",
}) as any as S.Schema<DeleteRuleResponse>;
export interface DeleteScopeInput {
  scopeIdentifier: string;
}
export const DeleteScopeInput = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "DeleteScopeInput" }) as any as S.Schema<DeleteScopeInput>;
export interface DeleteScopeResponse {}
export const DeleteScopeResponse = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteScopeResponse",
}) as any as S.Schema<DeleteScopeResponse>;
export interface DeleteTemplateInput {
  templateIdentifier: string;
}
export const DeleteTemplateInput = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "DeleteTemplateInput" }) as any as S.Schema<DeleteTemplateInput>;
export interface DeleteTemplateResponse {}
export const DeleteTemplateResponse = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteTemplateResponse",
}) as any as S.Schema<DeleteTemplateResponse>;
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
export const WAFConfigDataType = S.String;

export interface GenerateRuleConfigurationRequest {
  prompt: string | redacted.Redacted<string>;
  ruleFirewallType: RuleFirewallType;
  ruleType: RuleType;
  wafConfigDataType?: WAFConfigDataType;
  currentConfiguration?: string;
  clientToken?: string;
}
export const GenerateRuleConfigurationRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    prompt: SensitiveString,
    ruleFirewallType: RuleFirewallType,
    ruleType: RuleType,
    wafConfigDataType: S.optional(WAFConfigDataType),
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
).annotate({
  identifier: "GenerateRuleConfigurationRequest",
}) as any as S.Schema<GenerateRuleConfigurationRequest>;
export interface GenerateRuleConfigurationResponse {
  configuration: string;
  description?: string;
}
export const GenerateRuleConfigurationResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ configuration: S.String, description: S.optional(S.String) }),
).annotate({
  identifier: "GenerateRuleConfigurationResponse",
}) as any as S.Schema<GenerateRuleConfigurationResponse>;
export interface GetAdminAccountRequest {
  accountId: string;
}
export const GetAdminAccountRequest = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "GetAdminAccountRequest" }) as any as S.Schema<GetAdminAccountRequest>;
export type AdminPriority = number;
export type SensitiveAccountName = string | redacted.Redacted<string>;
export type SensitiveAccountEmail = string | redacted.Redacted<string>;
export interface AccountReference {
  accountId: string;
  name?: string | redacted.Redacted<string>;
  email?: string | redacted.Redacted<string>;
}
export const AccountReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.String,
    name: S.optional(SensitiveString),
    email: S.optional(SensitiveString),
  }),
).annotate({ identifier: "AccountReference" }) as any as S.Schema<AccountReference>;
export type AccountReferenceList = AccountReference[];
export const AccountReferenceList = /*@__PURE__*/ S.Array(AccountReference);
export type OrganizationalUnitId = string;
export interface OrganizationalUnitReference {
  ouId: string;
  name?: string;
}
export const OrganizationalUnitReference = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ouId: S.String, name: S.optional(S.String) }),
).annotate({
  identifier: "OrganizationalUnitReference",
}) as any as S.Schema<OrganizationalUnitReference>;
export type OrganizationalUnitReferenceList = OrganizationalUnitReference[];
export const OrganizationalUnitReferenceList = /*@__PURE__*/ S.Array(OrganizationalUnitReference);
export interface AdminScopeSelection {
  accounts?: AccountReference[];
  organizationalUnits?: OrganizationalUnitReference[];
}
export const AdminScopeSelection = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accounts: S.optional(AccountReferenceList),
    organizationalUnits: S.optional(OrganizationalUnitReferenceList),
  }),
).annotate({ identifier: "AdminScopeSelection" }) as any as S.Schema<AdminScopeSelection>;
export type AdminScopeFilter =
  | { includeAll: Record<string, never>; includeOnly?: never; excludeOnly?: never }
  | { includeAll?: never; includeOnly: AdminScopeSelection; excludeOnly?: never }
  | { includeAll?: never; includeOnly?: never; excludeOnly: AdminScopeSelection };
export const AdminScopeFilter = /*@__PURE__*/ S.Union([
  S.Struct({ includeAll: S.Struct({}) }),
  S.Struct({ includeOnly: AdminScopeSelection }),
  S.Struct({ excludeOnly: AdminScopeSelection }),
]);
export type FirewallTypeList = PolicyFirewallType[];
export const FirewallTypeList = /*@__PURE__*/ S.Array(PolicyFirewallType);
export interface AdminFirewallTypeScope {
  allFirewallTypesEnabled?: boolean;
  firewallTypes?: PolicyFirewallType[];
}
export const AdminFirewallTypeScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    allFirewallTypesEnabled: S.optional(S.Boolean),
    firewallTypes: S.optional(FirewallTypeList),
  }),
).annotate({ identifier: "AdminFirewallTypeScope" }) as any as S.Schema<AdminFirewallTypeScope>;
export interface AdminScope {
  scopeFilter?: AdminScopeFilter;
  firewallTypeScope?: AdminFirewallTypeScope;
}
export const AdminScope = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scopeFilter: S.optional(AdminScopeFilter),
    firewallTypeScope: S.optional(AdminFirewallTypeScope),
  }),
).annotate({ identifier: "AdminScope" }) as any as S.Schema<AdminScope>;
export type AdminAccountStatus = "ONBOARDED" | "OFFBOARDED" | (string & {});
export const AdminAccountStatus = S.String;

export interface AdminAccountDetails {
  adminAccount: string;
  priority: number;
  adminScope?: AdminScope;
  status?: AdminAccountStatus;
}
export const AdminAccountDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    adminAccount: S.String,
    priority: S.Number,
    adminScope: S.optional(AdminScope),
    status: S.optional(AdminAccountStatus),
  }),
).annotate({ identifier: "AdminAccountDetails" }) as any as S.Schema<AdminAccountDetails>;
export interface GetAdminAccountResponse {
  adminAccountDetails?: AdminAccountDetails;
}
export const GetAdminAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ adminAccountDetails: S.optional(AdminAccountDetails) }),
).annotate({ identifier: "GetAdminAccountResponse" }) as any as S.Schema<GetAdminAccountResponse>;
export interface GetDeploymentInput {
  deploymentIdentifier: string;
}
export const GetDeploymentInput = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "GetDeploymentInput" }) as any as S.Schema<GetDeploymentInput>;
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
export const GetDeploymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.String,
    deploymentArn: S.String,
    deploymentName: S.String,
    deploymentDescription: S.optional(S.String),
    status: EntityStatus,
    deploymentConfiguration: S.optional(DeploymentConfiguration),
    associatedPolicyList: AssociatedPolicyList,
    associatedScopeList: AssociatedScopeList,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
    deploymentCoverage: S.optional(DeploymentCoverageList),
    warnings: S.optional(DeploymentWarningList),
  }),
).annotate({ identifier: "GetDeploymentOutput" }) as any as S.Schema<GetDeploymentOutput>;
export interface GetPolicyInput {
  policyIdentifier: string;
}
export const GetPolicyInput = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "GetPolicyInput" }) as any as S.Schema<GetPolicyInput>;
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
export const GetPolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyId: S.String,
    policyArn: S.String,
    policyName: S.String,
    policyDescription: S.optional(S.String),
    status: EntityStatus,
    priority: S.Number,
    associatedTemplateAndRuleList: AssociatedTemplateAndRuleList,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    firewallType: PolicyFirewallType,
    policyConfiguration: S.optional(PolicyConfiguration),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "GetPolicyOutput" }) as any as S.Schema<GetPolicyOutput>;
export interface GetRuleInput {
  ruleIdentifier: string;
}
export const GetRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ ruleIdentifier: S.String.pipe(T.HttpLabel("ruleIdentifier")) }).pipe(
    T.all(T.Http({ method: "GET", uri: "/rules/{ruleIdentifier}" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "GetRuleInput" }) as any as S.Schema<GetRuleInput>;
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
export const GetRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.String,
    ruleArn: S.String,
    ruleName: S.String,
    firewallType: RuleFirewallType,
    ruleType: S.optional(RuleType),
    ruleDescription: S.optional(S.String),
    configuration: S.Any,
    status: EntityStatus,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "GetRuleOutput" }) as any as S.Schema<GetRuleOutput>;
export interface GetScopeInput {
  scopeIdentifier: string;
}
export const GetScopeInput = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "GetScopeInput" }) as any as S.Schema<GetScopeInput>;
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
export const GetScopeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scopeId: S.String,
    scopeArn: S.String,
    scopeName: S.String,
    scopeDescription: S.optional(S.String),
    scopeConfiguration: S.optional(ScopeConfiguration),
    status: EntityStatus,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "GetScopeOutput" }) as any as S.Schema<GetScopeOutput>;
export interface GetTemplateInput {
  templateIdentifier: string;
}
export const GetTemplateInput = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "GetTemplateInput" }) as any as S.Schema<GetTemplateInput>;
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
export const GetTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateId: S.String,
    templateArn: S.String,
    templateName: S.String,
    templateDescription: S.optional(S.String),
    status: EntityStatus,
    version: S.String,
    associatedRuleList: AssociatedRuleList,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    firewallType: TemplateFirewallType,
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "GetTemplateOutput" }) as any as S.Schema<GetTemplateOutput>;
export type MaxResults = number;
export type NextToken = string;
export interface ListAdminAccountsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListAdminAccountsRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(T.all(T.Http({ method: "GET", uri: "/admin-accounts" }), svc, auth, proto, ver, rules)),
).annotate({ identifier: "ListAdminAccountsRequest" }) as any as S.Schema<ListAdminAccountsRequest>;
export type SensitiveName = string | redacted.Redacted<string>;
export type SensitiveEmail = string | redacted.Redacted<string>;
export interface AdminAccountSummary {
  accountId: string;
  priority?: number;
  name?: string | redacted.Redacted<string>;
  email?: string | redacted.Redacted<string>;
}
export const AdminAccountSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.String,
    priority: S.optional(S.Number),
    name: S.optional(SensitiveString),
    email: S.optional(SensitiveString),
  }),
).annotate({ identifier: "AdminAccountSummary" }) as any as S.Schema<AdminAccountSummary>;
export type AdminAccountSummaryList = AdminAccountSummary[];
export const AdminAccountSummaryList = /*@__PURE__*/ S.Array(AdminAccountSummary);
export interface ListAdminAccountsResponse {
  nextToken?: string;
  adminAccounts: AdminAccountSummary[];
}
export const ListAdminAccountsResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), adminAccounts: AdminAccountSummaryList }),
).annotate({
  identifier: "ListAdminAccountsResponse",
}) as any as S.Schema<ListAdminAccountsResponse>;
export type SynchronizationStatus = "IN_SYNC" | "OUT_OF_SYNC" | "NOT_APPLICABLE" | (string & {});
export const SynchronizationStatus = S.String;

export interface ListAggregateResourceSynchronizationStatusesInput {
  synchronizationStatus?: SynchronizationStatus;
  maxResults?: number;
  nextToken?: string;
}
export const ListAggregateResourceSynchronizationStatusesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    synchronizationStatus: S.optional(SynchronizationStatus).pipe(
      T.HttpQuery("synchronizationStatus"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(T.Http({ method: "GET", uri: "/aggregate-sync-statuses" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListAggregateResourceSynchronizationStatusesInput",
}) as any as S.Schema<ListAggregateResourceSynchronizationStatusesInput>;
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
export const ResourceType = S.String;

export interface ConfigurationIssue {
  configurationName?: string;
  expectedValue?: string;
  actualValue?: string;
}
export const ConfigurationIssue = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    configurationName: S.optional(S.String),
    expectedValue: S.optional(S.String),
    actualValue: S.optional(S.String),
  }),
).annotate({ identifier: "ConfigurationIssue" }) as any as S.Schema<ConfigurationIssue>;
export type ConfigurationIssueList = ConfigurationIssue[];
export const ConfigurationIssueList = /*@__PURE__*/ S.Array(ConfigurationIssue);
export interface InvalidFirewallReasons {
  incorrectSingleValueConfigurations?: ConfigurationIssue[];
  missingAppendableConfigurationValues?: ConfigurationIssue[];
  unexpectedAppendableConfigurationValues?: ConfigurationIssue[];
  incorrectAppendableConfigurationOrder?: ConfigurationIssue[];
  missingMergeableConfigurationValues?: ConfigurationIssue[];
  unexpectedMergeableConfigurationValues?: ConfigurationIssue[];
}
export const InvalidFirewallReasons = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    incorrectSingleValueConfigurations: S.optional(ConfigurationIssueList),
    missingAppendableConfigurationValues: S.optional(ConfigurationIssueList),
    unexpectedAppendableConfigurationValues: S.optional(ConfigurationIssueList),
    incorrectAppendableConfigurationOrder: S.optional(ConfigurationIssueList),
    missingMergeableConfigurationValues: S.optional(ConfigurationIssueList),
    unexpectedMergeableConfigurationValues: S.optional(ConfigurationIssueList),
  }),
).annotate({ identifier: "InvalidFirewallReasons" }) as any as S.Schema<InvalidFirewallReasons>;
export type FirewallSyncReason =
  | { missingFirewall: string; invalidFirewall?: never }
  | { missingFirewall?: never; invalidFirewall: InvalidFirewallReasons };
export const FirewallSyncReason = /*@__PURE__*/ S.Union([
  S.Struct({ missingFirewall: S.String }),
  S.Struct({ invalidFirewall: InvalidFirewallReasons }),
]);
export type OutOfSyncReasons = { [key in PolicyFirewallType]?: FirewallSyncReason };
export const OutOfSyncReasons = /*@__PURE__*/ S.Record(
  PolicyFirewallType,
  FirewallSyncReason.pipe(S.optional),
);
export interface NotVisibleMarker {
  reason: string;
}
export const NotVisibleMarker = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ reason: S.String }),
).annotate({ identifier: "NotVisibleMarker" }) as any as S.Schema<NotVisibleMarker>;
export type OutOfSyncReasonsView =
  | { reasons: { [key: string]: FirewallSyncReason | undefined }; notVisible?: never }
  | { reasons?: never; notVisible: NotVisibleMarker };
export const OutOfSyncReasonsView = /*@__PURE__*/ S.Union([
  S.Struct({ reasons: OutOfSyncReasons }),
  S.Struct({ notVisible: NotVisibleMarker }),
]);
export interface RemediationIssueDetails {
  issueType?: string;
  message?: string;
  correctiveAction?: string;
}
export const RemediationIssueDetails = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    issueType: S.optional(S.String),
    message: S.optional(S.String),
    correctiveAction: S.optional(S.String),
  }),
).annotate({ identifier: "RemediationIssueDetails" }) as any as S.Schema<RemediationIssueDetails>;
export type RemediationIssues = { [key in PolicyFirewallType]?: RemediationIssueDetails };
export const RemediationIssues = /*@__PURE__*/ S.Record(
  PolicyFirewallType,
  RemediationIssueDetails.pipe(S.optional),
);
export type RemediationIssuesView =
  | { issues: { [key: string]: RemediationIssueDetails | undefined }; notVisible?: never }
  | { issues?: never; notVisible: NotVisibleMarker };
export const RemediationIssuesView = /*@__PURE__*/ S.Union([
  S.Struct({ issues: RemediationIssues }),
  S.Struct({ notVisible: NotVisibleMarker }),
]);
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
export const ResourceSynchronizationStatusSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    synchronizationStatus: SynchronizationStatus,
    accountId: S.String,
    resourceArn: S.String,
    deploymentArn: S.optional(S.String),
    resourceType: S.optional(ResourceType),
    updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
    outOfSyncReasons: S.optional(OutOfSyncReasonsView),
    remediationIssues: S.optional(RemediationIssuesView),
    evaluatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({
  identifier: "ResourceSynchronizationStatusSummary",
}) as any as S.Schema<ResourceSynchronizationStatusSummary>;
export type ResourceSynchronizationStatusSummaryList = ResourceSynchronizationStatusSummary[];
export const ResourceSynchronizationStatusSummaryList = /*@__PURE__*/ S.Array(
  ResourceSynchronizationStatusSummary,
);
export interface ListAggregateResourceSynchronizationStatusesOutput {
  nextToken?: string;
  resourceSynchronizationStatuses: ResourceSynchronizationStatusSummary[];
}
export const ListAggregateResourceSynchronizationStatusesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    resourceSynchronizationStatuses: ResourceSynchronizationStatusSummaryList,
  }),
).annotate({
  identifier: "ListAggregateResourceSynchronizationStatusesOutput",
}) as any as S.Schema<ListAggregateResourceSynchronizationStatusesOutput>;
export type EntityStatusFilter = "ACTIVE" | "DRAFT" | "DISABLED" | (string & {});
export const EntityStatusFilter = S.String;

export interface ListDeploymentsInput {
  maxResults?: number;
  nextToken?: string;
  status?: EntityStatusFilter;
}
export const ListDeploymentsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    status: S.optional(EntityStatusFilter).pipe(T.HttpQuery("status")),
  }).pipe(T.all(T.Http({ method: "GET", uri: "/deployments" }), svc, auth, proto, ver, rules)),
).annotate({ identifier: "ListDeploymentsInput" }) as any as S.Schema<ListDeploymentsInput>;
export interface DeploymentSummary {
  deploymentId: string;
  deploymentArn: string;
  deploymentName?: string;
  status?: EntityStatus;
  version?: string;
  hasPublishedVersion?: boolean;
  updatedAt?: Date;
}
export const DeploymentSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.String,
    deploymentArn: S.String,
    deploymentName: S.optional(S.String),
    status: S.optional(EntityStatus),
    version: S.optional(S.String),
    hasPublishedVersion: S.optional(S.Boolean),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "DeploymentSummary" }) as any as S.Schema<DeploymentSummary>;
export type DeploymentSummaryList = DeploymentSummary[];
export const DeploymentSummaryList = /*@__PURE__*/ S.Array(DeploymentSummary);
export interface ListDeploymentsOutput {
  nextToken?: string;
  deployments: DeploymentSummary[];
}
export const ListDeploymentsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), deployments: DeploymentSummaryList }),
).annotate({ identifier: "ListDeploymentsOutput" }) as any as S.Schema<ListDeploymentsOutput>;
export interface ListDeploymentSnapshotsInput {
  deploymentIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListDeploymentSnapshotsInput = /*@__PURE__*/ S.suspend(() =>
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
).annotate({
  identifier: "ListDeploymentSnapshotsInput",
}) as any as S.Schema<ListDeploymentSnapshotsInput>;
export interface ListDeploymentSnapshotsOutput {
  nextToken?: string;
  snapshots: DeploymentSummary[];
}
export const ListDeploymentSnapshotsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), snapshots: DeploymentSummaryList }),
).annotate({
  identifier: "ListDeploymentSnapshotsOutput",
}) as any as S.Schema<ListDeploymentSnapshotsOutput>;
export interface ListPoliciesInput {
  maxResults?: number;
  nextToken?: string;
  status?: EntityStatusFilter;
}
export const ListPoliciesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    status: S.optional(EntityStatusFilter).pipe(T.HttpQuery("status")),
  }).pipe(T.all(T.Http({ method: "GET", uri: "/policies" }), svc, auth, proto, ver, rules)),
).annotate({ identifier: "ListPoliciesInput" }) as any as S.Schema<ListPoliciesInput>;
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
export const PolicySummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyId: S.String,
    policyArn: S.String,
    policyName: S.optional(S.String),
    status: S.optional(EntityStatus),
    version: S.optional(S.String),
    hasPublishedVersion: S.optional(S.Boolean),
    firewallType: S.optional(PolicyFirewallType),
    priority: S.optional(S.Number),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "PolicySummary" }) as any as S.Schema<PolicySummary>;
export type PolicySummaryList = PolicySummary[];
export const PolicySummaryList = /*@__PURE__*/ S.Array(PolicySummary);
export interface ListPoliciesOutput {
  nextToken?: string;
  policies: PolicySummary[];
}
export const ListPoliciesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), policies: PolicySummaryList }),
).annotate({ identifier: "ListPoliciesOutput" }) as any as S.Schema<ListPoliciesOutput>;
export interface ListPolicySnapshotsInput {
  policyIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListPolicySnapshotsInput = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "ListPolicySnapshotsInput" }) as any as S.Schema<ListPolicySnapshotsInput>;
export interface ListPolicySnapshotsOutput {
  nextToken?: string;
  snapshots: PolicySummary[];
}
export const ListPolicySnapshotsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), snapshots: PolicySummaryList }),
).annotate({
  identifier: "ListPolicySnapshotsOutput",
}) as any as S.Schema<ListPolicySnapshotsOutput>;
export type ResourceIdentifier = string;
export interface ListResourceAssociationsInput {
  resourceIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListResourceAssociationsInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceIdentifier: S.String.pipe(T.HttpQuery("resourceIdentifier")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(T.Http({ method: "GET", uri: "/resource-associations" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResourceAssociationsInput",
}) as any as S.Schema<ListResourceAssociationsInput>;
export type ServiceResourceType =
  | "Rule"
  | "Template"
  | "Policy"
  | "Deployment"
  | "Scope"
  | (string & {});
export const ServiceResourceType = S.String;

export interface ResourceAssociation {
  arn: string;
  resourceType: ServiceResourceType;
}
export const ResourceAssociation = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ arn: S.String, resourceType: ServiceResourceType }),
).annotate({ identifier: "ResourceAssociation" }) as any as S.Schema<ResourceAssociation>;
export type ResourceAssociationList = ResourceAssociation[];
export const ResourceAssociationList = /*@__PURE__*/ S.Array(ResourceAssociation);
export interface ListResourceAssociationsOutput {
  nextToken?: string;
  resourceAssociations: ResourceAssociation[];
}
export const ListResourceAssociationsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), resourceAssociations: ResourceAssociationList }),
).annotate({
  identifier: "ListResourceAssociationsOutput",
}) as any as S.Schema<ListResourceAssociationsOutput>;
export interface ListResourceSynchronizationStatusesInput {
  deploymentIdentifier: string;
  synchronizationStatus?: SynchronizationStatus;
  maxResults?: number;
  nextToken?: string;
}
export const ListResourceSynchronizationStatusesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentIdentifier: S.String.pipe(T.HttpQuery("deploymentIdentifier")),
    synchronizationStatus: S.optional(SynchronizationStatus).pipe(
      T.HttpQuery("synchronizationStatus"),
    ),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(T.Http({ method: "GET", uri: "/resource-sync-statuses" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListResourceSynchronizationStatusesInput",
}) as any as S.Schema<ListResourceSynchronizationStatusesInput>;
export interface ListResourceSynchronizationStatusesOutput {
  nextToken?: string;
  resourceSynchronizationStatuses: ResourceSynchronizationStatusSummary[];
}
export const ListResourceSynchronizationStatusesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String),
    resourceSynchronizationStatuses: ResourceSynchronizationStatusSummaryList,
  }),
).annotate({
  identifier: "ListResourceSynchronizationStatusesOutput",
}) as any as S.Schema<ListResourceSynchronizationStatusesOutput>;
export interface ListRulesInput {
  maxResults?: number;
  nextToken?: string;
  status?: EntityStatusFilter;
}
export const ListRulesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    status: S.optional(EntityStatusFilter).pipe(T.HttpQuery("status")),
  }).pipe(T.all(T.Http({ method: "GET", uri: "/rules" }), svc, auth, proto, ver, rules)),
).annotate({ identifier: "ListRulesInput" }) as any as S.Schema<ListRulesInput>;
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
export const RuleSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.String,
    ruleArn: S.String,
    ruleName: S.String,
    firewallType: S.optional(RuleFirewallType),
    ruleType: S.optional(RuleType),
    status: S.optional(EntityStatus),
    version: S.optional(S.String),
    hasPublishedVersion: S.optional(S.Boolean),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "RuleSummary" }) as any as S.Schema<RuleSummary>;
export type RuleSummaryList = RuleSummary[];
export const RuleSummaryList = /*@__PURE__*/ S.Array(RuleSummary);
export interface ListRulesOutput {
  nextToken?: string;
  rules: RuleSummary[];
}
export const ListRulesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), rules: RuleSummaryList }),
).annotate({ identifier: "ListRulesOutput" }) as any as S.Schema<ListRulesOutput>;
export interface ListRuleSnapshotsInput {
  ruleIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListRuleSnapshotsInput = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "ListRuleSnapshotsInput" }) as any as S.Schema<ListRuleSnapshotsInput>;
export interface ListRuleSnapshotsOutput {
  nextToken?: string;
  snapshots: RuleSummary[];
}
export const ListRuleSnapshotsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), snapshots: RuleSummaryList }),
).annotate({ identifier: "ListRuleSnapshotsOutput" }) as any as S.Schema<ListRuleSnapshotsOutput>;
export interface ListScopesInput {
  maxResults?: number;
  nextToken?: string;
  status?: EntityStatusFilter;
}
export const ListScopesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    status: S.optional(EntityStatusFilter).pipe(T.HttpQuery("status")),
  }).pipe(T.all(T.Http({ method: "GET", uri: "/scopes" }), svc, auth, proto, ver, rules)),
).annotate({ identifier: "ListScopesInput" }) as any as S.Schema<ListScopesInput>;
export interface ScopeSummary {
  scopeId: string;
  scopeArn: string;
  scopeName?: string;
  status?: EntityStatus;
  version?: string;
  hasPublishedVersion?: boolean;
  updatedAt?: Date;
}
export const ScopeSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scopeId: S.String,
    scopeArn: S.String,
    scopeName: S.optional(S.String),
    status: S.optional(EntityStatus),
    version: S.optional(S.String),
    hasPublishedVersion: S.optional(S.Boolean),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "ScopeSummary" }) as any as S.Schema<ScopeSummary>;
export type ScopeSummaryList = ScopeSummary[];
export const ScopeSummaryList = /*@__PURE__*/ S.Array(ScopeSummary);
export interface ListScopesOutput {
  nextToken?: string;
  scopes: ScopeSummary[];
}
export const ListScopesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), scopes: ScopeSummaryList }),
).annotate({ identifier: "ListScopesOutput" }) as any as S.Schema<ListScopesOutput>;
export interface ListScopeSnapshotsInput {
  scopeIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListScopeSnapshotsInput = /*@__PURE__*/ S.suspend(() =>
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
).annotate({ identifier: "ListScopeSnapshotsInput" }) as any as S.Schema<ListScopeSnapshotsInput>;
export interface ListScopeSnapshotsOutput {
  nextToken?: string;
  snapshots: ScopeSummary[];
}
export const ListScopeSnapshotsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), snapshots: ScopeSummaryList }),
).annotate({ identifier: "ListScopeSnapshotsOutput" }) as any as S.Schema<ListScopeSnapshotsOutput>;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export const ListTagsForResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(T.Http({ method: "GET", uri: "/tags/{resourceArn}" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "ListTagsForResourceInput" }) as any as S.Schema<ListTagsForResourceInput>;
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface ListTemplatesInput {
  maxResults?: number;
  nextToken?: string;
  status?: EntityStatusFilter;
}
export const ListTemplatesInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    status: S.optional(EntityStatusFilter).pipe(T.HttpQuery("status")),
  }).pipe(T.all(T.Http({ method: "GET", uri: "/templates" }), svc, auth, proto, ver, rules)),
).annotate({ identifier: "ListTemplatesInput" }) as any as S.Schema<ListTemplatesInput>;
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
export const TemplateSummary = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateId: S.String,
    templateArn: S.String,
    templateName: S.String,
    status: S.optional(EntityStatus),
    version: S.optional(S.String),
    hasPublishedVersion: S.optional(S.Boolean),
    firewallType: S.optional(TemplateFirewallType),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "TemplateSummary" }) as any as S.Schema<TemplateSummary>;
export type TemplateSummaryList = TemplateSummary[];
export const TemplateSummaryList = /*@__PURE__*/ S.Array(TemplateSummary);
export interface ListTemplatesOutput {
  nextToken?: string;
  templates: TemplateSummary[];
}
export const ListTemplatesOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), templates: TemplateSummaryList }),
).annotate({ identifier: "ListTemplatesOutput" }) as any as S.Schema<ListTemplatesOutput>;
export interface ListTemplateSnapshotsInput {
  templateIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListTemplateSnapshotsInput = /*@__PURE__*/ S.suspend(() =>
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
).annotate({
  identifier: "ListTemplateSnapshotsInput",
}) as any as S.Schema<ListTemplateSnapshotsInput>;
export interface ListTemplateSnapshotsOutput {
  nextToken?: string;
  snapshots: TemplateSummary[];
}
export const ListTemplateSnapshotsOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ nextToken: S.optional(S.String), snapshots: TemplateSummaryList }),
).annotate({
  identifier: "ListTemplateSnapshotsOutput",
}) as any as S.Schema<ListTemplateSnapshotsOutput>;
export type AccountIdList = string[];
export const AccountIdList = /*@__PURE__*/ S.Array(S.String);
export type OrganizationalUnitIdList = string[];
export const OrganizationalUnitIdList = /*@__PURE__*/ S.Array(S.String);
export interface AdminScopeSelectionInput {
  accounts?: string[];
  organizationalUnits?: string[];
}
export const AdminScopeSelectionInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accounts: S.optional(AccountIdList),
    organizationalUnits: S.optional(OrganizationalUnitIdList),
  }),
).annotate({ identifier: "AdminScopeSelectionInput" }) as any as S.Schema<AdminScopeSelectionInput>;
export type AdminScopeFilterInput =
  | { includeAll: Record<string, never>; includeOnly?: never; excludeOnly?: never }
  | { includeAll?: never; includeOnly: AdminScopeSelectionInput; excludeOnly?: never }
  | { includeAll?: never; includeOnly?: never; excludeOnly: AdminScopeSelectionInput };
export const AdminScopeFilterInput = /*@__PURE__*/ S.Union([
  S.Struct({ includeAll: S.Struct({}) }),
  S.Struct({ includeOnly: AdminScopeSelectionInput }),
  S.Struct({ excludeOnly: AdminScopeSelectionInput }),
]);
export interface AdminScopeInput {
  scopeFilter?: AdminScopeFilterInput;
  firewallTypeScope?: AdminFirewallTypeScope;
}
export const AdminScopeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scopeFilter: S.optional(AdminScopeFilterInput),
    firewallTypeScope: S.optional(AdminFirewallTypeScope),
  }),
).annotate({ identifier: "AdminScopeInput" }) as any as S.Schema<AdminScopeInput>;
export interface PutAdminAccountRequest {
  accountId: string;
  priority: number;
  adminScope?: AdminScopeInput;
}
export const PutAdminAccountRequest = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    accountId: S.String,
    priority: S.Number,
    adminScope: S.optional(AdminScopeInput),
  }).pipe(T.all(T.Http({ method: "PUT", uri: "/admin-account" }), svc, auth, proto, ver, rules)),
).annotate({ identifier: "PutAdminAccountRequest" }) as any as S.Schema<PutAdminAccountRequest>;
export interface PutAdminAccountResponse {
  adminAccountDetails?: AdminAccountDetails;
}
export const PutAdminAccountResponse = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ adminAccountDetails: S.optional(AdminAccountDetails) }),
).annotate({ identifier: "PutAdminAccountResponse" }) as any as S.Schema<PutAdminAccountResponse>;
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")), tags: TagMap }).pipe(
    T.all(T.Http({ method: "POST", uri: "/tags/{resourceArn}" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "TagResourceInput" }) as any as S.Schema<TagResourceInput>;
export interface TagResourceOutput {}
export const TagResourceOutput = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = /*@__PURE__*/ S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }), svc, auth, proto, ver, rules),
  ),
).annotate({ identifier: "UntagResourceInput" }) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceOutput {}
export const UntagResourceOutput = /*@__PURE__*/ S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
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
export const UpdateDeploymentInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentIdentifier: S.String.pipe(T.HttpLabel("deploymentIdentifier")),
    updateToken: S.String,
    deploymentDescription: S.optional(S.String),
    deploymentConfiguration: S.optional(DeploymentConfiguration),
    associatedPolicyList: S.optional(PolicyReferenceList),
    associatedScopeList: S.optional(ScopeReferenceList),
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
).annotate({ identifier: "UpdateDeploymentInput" }) as any as S.Schema<UpdateDeploymentInput>;
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
export const UpdateDeploymentOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    deploymentId: S.String,
    deploymentArn: S.String,
    deploymentName: S.String,
    deploymentDescription: S.optional(S.String),
    status: EntityStatus,
    deploymentConfiguration: S.optional(DeploymentConfiguration),
    associatedPolicyList: AssociatedPolicyList,
    associatedScopeList: AssociatedScopeList,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    deploymentCoverage: S.optional(DeploymentCoverageList),
    warnings: S.optional(DeploymentWarningList),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "UpdateDeploymentOutput" }) as any as S.Schema<UpdateDeploymentOutput>;
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
export const UpdatePolicyInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyIdentifier: S.String.pipe(T.HttpLabel("policyIdentifier")),
    updateToken: S.String,
    policyDescription: S.optional(S.String),
    priority: S.optional(S.Number),
    associatedTemplateAndRuleList: S.optional(TemplateAndRuleReferenceList),
    policyConfiguration: S.optional(PolicyConfiguration),
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
).annotate({ identifier: "UpdatePolicyInput" }) as any as S.Schema<UpdatePolicyInput>;
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
export const UpdatePolicyOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    policyId: S.String,
    policyArn: S.String,
    policyName: S.String,
    policyDescription: S.optional(S.String),
    status: EntityStatus,
    priority: S.Number,
    associatedTemplateAndRuleList: AssociatedTemplateAndRuleList,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    firewallType: PolicyFirewallType,
    policyConfiguration: S.optional(PolicyConfiguration),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "UpdatePolicyOutput" }) as any as S.Schema<UpdatePolicyOutput>;
export interface UpdateRuleInput {
  ruleIdentifier: string;
  updateToken: string;
  ruleType?: RuleType;
  ruleDescription?: string;
  configuration?: any;
  isPublished: boolean;
  clientToken?: string;
}
export const UpdateRuleInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleIdentifier: S.String.pipe(T.HttpLabel("ruleIdentifier")),
    updateToken: S.String,
    ruleType: S.optional(RuleType),
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
).annotate({ identifier: "UpdateRuleInput" }) as any as S.Schema<UpdateRuleInput>;
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
export const UpdateRuleOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    ruleId: S.String,
    ruleArn: S.String,
    ruleName: S.String,
    firewallType: RuleFirewallType,
    ruleType: S.optional(RuleType),
    ruleDescription: S.optional(S.String),
    configuration: S.Any,
    status: EntityStatus,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "UpdateRuleOutput" }) as any as S.Schema<UpdateRuleOutput>;
export interface UpdateScopeInput {
  scopeIdentifier: string;
  updateToken: string;
  scopeDescription?: string;
  scopeConfiguration?: ScopeConfiguration;
  isPublished: boolean;
  clientToken?: string;
}
export const UpdateScopeInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scopeIdentifier: S.String.pipe(T.HttpLabel("scopeIdentifier")),
    updateToken: S.String,
    scopeDescription: S.optional(S.String),
    scopeConfiguration: S.optional(ScopeConfiguration),
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
).annotate({ identifier: "UpdateScopeInput" }) as any as S.Schema<UpdateScopeInput>;
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
export const UpdateScopeOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    scopeId: S.String,
    scopeArn: S.String,
    scopeName: S.String,
    scopeDescription: S.optional(S.String),
    scopeConfiguration: S.optional(ScopeConfiguration),
    status: EntityStatus,
    version: S.String,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "UpdateScopeOutput" }) as any as S.Schema<UpdateScopeOutput>;
export interface UpdateTemplateInput {
  templateIdentifier: string;
  updateToken: string;
  templateDescription?: string;
  associatedRuleList?: RuleReference[];
  isPublished: boolean;
  clientToken?: string;
}
export const UpdateTemplateInput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateIdentifier: S.String.pipe(T.HttpLabel("templateIdentifier")),
    updateToken: S.String,
    templateDescription: S.optional(S.String),
    associatedRuleList: S.optional(RuleReferenceList),
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
).annotate({ identifier: "UpdateTemplateInput" }) as any as S.Schema<UpdateTemplateInput>;
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
export const UpdateTemplateOutput = /*@__PURE__*/ S.suspend(() =>
  S.Struct({
    templateId: S.String,
    templateArn: S.String,
    templateName: S.String,
    templateDescription: S.optional(S.String),
    status: EntityStatus,
    version: S.String,
    associatedRuleList: AssociatedRuleList,
    updateToken: S.optional(S.String),
    isSnapshot: S.optional(S.Boolean),
    hasPublishedVersion: S.optional(S.Boolean),
    firewallType: TemplateFirewallType,
    updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
  }),
).annotate({ identifier: "UpdateTemplateOutput" }) as any as S.Schema<UpdateTemplateOutput>;
export type ValidationExceptionReason =
  | "ACCOUNT_NOT_ONBOARDED"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
export const ValidationExceptionReason = S.String;

export interface ValidationExceptionField {
  name: string;
  message: string;
}
export const ValidationExceptionField = /*@__PURE__*/ S.suspend(() =>
  S.Struct({ name: S.String, message: S.String }),
).annotate({ identifier: "ValidationExceptionField" }) as any as S.Schema<ValidationExceptionField>;
export type ValidationExceptionFieldList = ValidationExceptionField[];
export const ValidationExceptionFieldList = /*@__PURE__*/ S.Array(ValidationExceptionField);
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
  input: CreateDeploymentInput,
  output: CreateDeploymentOutput,
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
  input: CreateDeploymentSnapshotInput,
  output: CreateDeploymentSnapshotOutput,
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
  input: CreatePolicyInput,
  output: CreatePolicyOutput,
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
  input: CreatePolicySnapshotInput,
  output: CreatePolicySnapshotOutput,
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
  input: CreateRuleInput,
  output: CreateRuleOutput,
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
  input: CreateRuleSnapshotInput,
  output: CreateRuleSnapshotOutput,
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
  input: CreateScopeInput,
  output: CreateScopeOutput,
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
  input: CreateScopeSnapshotInput,
  output: CreateScopeSnapshotOutput,
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
  input: CreateTemplateInput,
  output: CreateTemplateOutput,
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
  input: CreateTemplateSnapshotInput,
  output: CreateTemplateSnapshotOutput,
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
  input: DeleteAdminAccountRequest,
  output: DeleteAdminAccountResponse,
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
  input: DeleteDeploymentInput,
  output: DeleteDeploymentResponse,
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
  input: DeletePolicyInput,
  output: DeletePolicyResponse,
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
  input: DeleteRuleInput,
  output: DeleteRuleResponse,
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
  input: DeleteScopeInput,
  output: DeleteScopeResponse,
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
  input: DeleteTemplateInput,
  output: DeleteTemplateResponse,
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
  input: GenerateRuleConfigurationRequest,
  output: GenerateRuleConfigurationResponse,
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
  input: GetAdminAccountRequest,
  output: GetAdminAccountResponse,
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
  input: GetDeploymentInput,
  output: GetDeploymentOutput,
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
  input: GetPolicyInput,
  output: GetPolicyOutput,
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
  input: GetRuleInput,
  output: GetRuleOutput,
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
  input: GetScopeInput,
  output: GetScopeOutput,
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
  input: GetTemplateInput,
  output: GetTemplateOutput,
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
  input: ListAdminAccountsRequest,
  output: ListAdminAccountsResponse,
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
  input: ListAggregateResourceSynchronizationStatusesInput,
  output: ListAggregateResourceSynchronizationStatusesOutput,
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
  input: ListDeploymentsInput,
  output: ListDeploymentsOutput,
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
  input: ListDeploymentSnapshotsInput,
  output: ListDeploymentSnapshotsOutput,
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
  input: ListPoliciesInput,
  output: ListPoliciesOutput,
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
  input: ListPolicySnapshotsInput,
  output: ListPolicySnapshotsOutput,
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
  input: ListResourceAssociationsInput,
  output: ListResourceAssociationsOutput,
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
  input: ListResourceSynchronizationStatusesInput,
  output: ListResourceSynchronizationStatusesOutput,
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
  input: ListRulesInput,
  output: ListRulesOutput,
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
  input: ListRuleSnapshotsInput,
  output: ListRuleSnapshotsOutput,
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
  input: ListScopesInput,
  output: ListScopesOutput,
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
  input: ListScopeSnapshotsInput,
  output: ListScopeSnapshotsOutput,
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
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
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
  input: ListTemplatesInput,
  output: ListTemplatesOutput,
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
  input: ListTemplateSnapshotsInput,
  output: ListTemplateSnapshotsOutput,
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
  input: PutAdminAccountRequest,
  output: PutAdminAccountResponse,
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
  input: TagResourceInput,
  output: TagResourceOutput,
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
  input: UntagResourceInput,
  output: UntagResourceOutput,
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
  input: UpdateDeploymentInput,
  output: UpdateDeploymentOutput,
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
  input: UpdatePolicyInput,
  output: UpdatePolicyOutput,
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
  input: UpdateRuleInput,
  output: UpdateRuleOutput,
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
  input: UpdateScopeInput,
  output: UpdateScopeOutput,
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
  input: UpdateTemplateInput,
  output: UpdateTemplateOutput,
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
