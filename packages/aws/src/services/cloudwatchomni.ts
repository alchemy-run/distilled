import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "CloudWatchOmni",
  serviceShapeName: "CloudWatchOmniFrontend",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "cloudwatch" });
const ver = /*@__PURE__*/ T.ServiceVersion("2025-01-01");
const proto = /*@__PURE__*/ T.SmithyProtocolsRpcv2Cbor();
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
              `https://cloudwatch-omni-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return e(
            `https://cloudwatch-omni.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
  '{"url":"https://cloudwatch-omni.{R}.api.aws","properties":{},"headers":{}}',
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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "CloudWatchOmni",
  service: "CloudWatchOmni",
  templates: false,
  propagate: TxXray.propagate,
} as const;

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
      conflictType: /*@__PURE__*/ S.optional(S.String),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      errorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      errorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class PolicyTooLargeException
  extends /*@__PURE__*/ S.TaggedError<PolicyTooLargeException>()(
    "PolicyTooLargeException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceType: /*@__PURE__*/ S.optional(S.String),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      errorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
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
      errorCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type DomainId = string;
export type SpaceId = string;
export type AccessGrantPrincipalType =
  | "IDC_USER"
  | "IDC_GROUP"
  | "IAM_USER"
  | "IAM_ROLE"
  | "IAM_ROOT"
  | "ACCESS_PROFILE"
  | "ALERT"
  | "AGENT"
  | (string & {});
export type PrincipalId = string;
export interface AccessGrantPrincipalAttribute {
  key: string;
  value: string;
}
export type AccessGrantPrincipalAttributeList = AccessGrantPrincipalAttribute[];
export interface AccessGrantPrincipal {
  principalType: AccessGrantPrincipalType;
  principalId?: string | undefined;
  principalAttributes?: AccessGrantPrincipalAttribute[] | undefined;
}
export type AccessGrantPermission =
  | "SPACE_ADMIN"
  | "READ"
  | "READ_WRITE_DELETE"
  | "CUSTOM"
  | (string & {});
export type ScopedActionName = string;
export type ScopedActionNameList = string[];
export type ResourceArnList = string[];
export type ResourceScopeTagMap = { [key: string]: string | undefined };
export type SignalType = "LOGS" | "TRACES" | (string & {});
export type SignalTypeList = SignalType[];
export type RowScopeOperator = "IN" | (string & {});
export type RowScopeValue = string;
export type RowScopeValueList = string[];
export interface RowScope {
  field: string;
  operator: RowScopeOperator;
  values: string[];
}
export type RowScopeGroup = RowScope[];
export type RowScopeGroupList = RowScope[][];
export interface ResourceScope {
  resourceType: string;
  resourceArns?: string[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  signalTypes?: SignalType[] | undefined;
  rowScopeGroups?: RowScope[][] | undefined;
}
export type ResourceScopeList = ResourceScope[];
export type StringList = string[];
export type ContextConditionsMap = { [key: string]: string[] | undefined };
export interface ScopedActions {
  actions: string[];
  resources?: ResourceScope[] | undefined;
  contextConditions?: { [key: string]: string[] | undefined } | undefined;
}
export type ScopedActionsList = ScopedActions[];
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type ClientToken = string;
export interface CreateAccessGrantInput {
  domainId: string;
  spaceId: string;
  name: string;
  principal: AccessGrantPrincipal;
  permission: AccessGrantPermission;
  scopedActions?: ScopedActions[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
}
export type GrantId = string;
export type Arn = string;
export type AccountId = string;
export type AccessGrantType = "SERVICE_MANAGED" | "CUSTOMER_MANAGED" | (string & {});
export interface AccessGrant {
  grantId: string;
  grantArn: string;
  name?: string | undefined;
  accountId: string;
  domainId: string;
  principal: AccessGrantPrincipal;
  permission: AccessGrantPermission;
  grantType: AccessGrantType;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
  spaceId: string;
  scopedActions?: ScopedActions[] | undefined;
}
export interface CreateAccessGrantOutput {
  accessGrant: AccessGrant;
}
export type AccessProfileName = string;
export interface CreateAccessProfileInput {
  spaceId: string;
  name: string;
  description?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
}
export type ProfileId = string;
export type AssumeStatus = "ALLOWED" | "DENIED" | (string & {});
export type AccessProfileType = "SERVICE_MANAGED" | "CUSTOMER_MANAGED" | (string & {});
export interface AccessProfile {
  profileId: string;
  spaceId: string;
  arn: string;
  name: string;
  description?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  assumeStatus?: AssumeStatus | undefined;
  profileType?: AccessProfileType | undefined;
}
export interface CreateAccessProfileOutput {
  accessProfile: AccessProfile;
}
export type QueryLanguage = "SQL" | "PROMQL" | (string & {});
export interface AlertRuleQuery {
  language: QueryLanguage;
  expression: string;
}
export type ThresholdMode = "COUNT_OF_RESULTS" | "FIELD_VALUE" | (string & {});
export type Comparator = "GT" | "LT" | "GTE" | "LTE" | (string & {});
export interface AlertCondition {
  thresholdMode?: ThresholdMode | undefined;
  thresholdField?: string | undefined;
  comparator?: Comparator | undefined;
  warningThreshold?: number | undefined;
  criticalThreshold?: number | undefined;
}
export interface AlertEvaluation {
  intervalSeconds: number;
  pendingDurationSeconds?: number | undefined;
  recoveryDurationSeconds?: number | undefined;
}
export type AlertState = "OK" | "WARNING" | "CRITICAL" | "NODATA" | (string & {});
export interface NoData {
  treatAs: AlertState;
}
export interface TelemetryRule {
  query?: AlertRuleQuery | undefined;
  condition?: AlertCondition | undefined;
  evaluation?: AlertEvaluation | undefined;
  noData?: NoData | undefined;
}
export type Rule = { telemetryRule: TelemetryRule };
export type AlertStateList = AlertState[];
export interface NotificationTrigger {
  stateValues?: AlertState[] | undefined;
}
export type NotificationTargetType = "sns" | "slack" | "pagerduty" | (string & {});
export type NotificationTargetMetadata = { [key: string]: string | undefined };
export interface NotificationTarget {
  type: NotificationTargetType;
  arn: string;
  metadata?: { [key: string]: string | undefined } | undefined;
}
export interface NotificationRule {
  trigger: NotificationTrigger;
  target: NotificationTarget;
}
export type NotificationRuleList = NotificationRule[];
export interface CreateAlertInput {
  spaceId: string;
  profileId: string;
  name: string;
  description?: string | undefined;
  rule: Rule;
  notificationsEnabled?: boolean | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  notificationRules?: NotificationRule[] | undefined;
  clientToken?: string | undefined;
}
export type AlertId = string;
export type NotificationStatus = "ENABLED" | "DISABLED" | (string & {});
export interface ContributorSummary {
  warningCount?: number | undefined;
  criticalCount?: number | undefined;
}
export interface AlertStateData {
  thresholdBreached?: number | undefined;
}
export interface AlertStateInfo {
  value: AlertState;
  transitionedAt?: Date | undefined;
  contributorSummary?: ContributorSummary | undefined;
  data?: AlertStateData | undefined;
}
export interface Alert {
  name: string;
  alertId?: string | undefined;
  description?: string | undefined;
  accountId: string;
  spaceId?: string | undefined;
  profileId?: string | undefined;
  rule: Rule;
  notificationStatus?: NotificationStatus | undefined;
  state?: AlertStateInfo | undefined;
  notificationRules?: NotificationRule[] | undefined;
  createdAt: Date;
  updatedAt: Date;
  alertArn: string;
}
export interface CreateAlertOutput {
  alertArn?: string | undefined;
  alert: Alert;
}
export type IdentityProvider = "IAM" | "IDC" | (string & {});
export type IdentityProviderList = IdentityProvider[];
export type IdentityCenterInstanceArn = string;
export interface IdentityCenterConfiguration {
  identityCenterInstanceArn?: string | undefined;
}
export interface IdentityProviderConfiguration {
  identityCenterConfiguration?: IdentityCenterConfiguration | undefined;
}
export interface CreateDomainInput {
  name: string;
  identityProviders: IdentityProvider[];
  identityProviderConfiguration?: IdentityProviderConfiguration | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
}
export type DomainStatus = "ACTIVE" | (string & {});
export interface Domain {
  domainId: string;
  domainArn: string;
  name?: string | undefined;
  identityProviders: IdentityProvider[];
  identityProviderConfiguration?: IdentityProviderConfiguration | undefined;
  domainEndpointUrl: string;
  customEndpointUrls?: string[] | undefined;
  identityCenterApplicationArn?: string | undefined;
  region: string;
  createdAt: Date;
  updatedAt: Date;
  status: DomainStatus;
}
export interface CreateDomainOutput {
  domain: Domain;
}
export type OrganizationGrantPrincipalType =
  | "IDC_USER"
  | "IDC_GROUP"
  | "IAM_USER"
  | "IAM_ROLE"
  | "IAM_ROOT"
  | (string & {});
export type OrganizationPrincipalId = string;
export interface OrganizationAccessGrantPrincipal {
  principalType: OrganizationGrantPrincipalType;
  principalId?: string | undefined;
  principalAttributes?: AccessGrantPrincipalAttribute[] | undefined;
}
export type OrganizationGrantPermission = "ADMIN" | (string & {});
export interface CreateDomainAccessGrantForOrganizationInput {
  domainId: string;
  name: string;
  principal: OrganizationAccessGrantPrincipal;
  permission: OrganizationGrantPermission;
  tags?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
}
export interface OrganizationAccessGrant {
  grantId: string;
  grantArn: string;
  name?: string | undefined;
  domainId: string;
  principal: OrganizationAccessGrantPrincipal;
  permission: OrganizationGrantPermission;
  grantType: AccessGrantType;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateDomainAccessGrantForOrganizationOutput {
  accessGrant: OrganizationAccessGrant;
}
export type IamRoleArn = string;
export interface CreateDomainForOrganizationInput {
  name: string;
  identityProviders: IdentityProvider[];
  identityProviderConfiguration?: IdentityProviderConfiguration | undefined;
  domainAccessRoleArn: string;
  tags?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
}
export interface OrganizationDomain {
  domainId: string;
  domainArn: string;
  name?: string | undefined;
  domainEndpointUrl: string;
  customEndpointUrls?: string[] | undefined;
  organizationId: string;
  ownerAccountId: string;
  identityProviders: IdentityProvider[];
  identityProviderConfiguration?: IdentityProviderConfiguration | undefined;
  identityCenterApplicationArn?: string | undefined;
  region: string;
  status: DomainStatus;
  domainAccessRoleArn?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateDomainForOrganizationOutput {
  organizationDomain: OrganizationDomain;
}
export type IntegrationType =
  | "AWS_CONFIG_SLREC"
  | "SLACK"
  | "EXTERNAL_AGENT"
  | "AWS_INTEGRATION"
  | (string & {});
export interface OAuthCodeCredential {
  authCode: string;
}
export type SensitiveString = string | redacted.Redacted<string>;
export interface OAuthClientCredential {
  clientId: string;
  clientSecret: string | redacted.Redacted<string>;
  providerId?: string | undefined;
}
export interface ApiKeyCredential {
  apiKeyValue: string | redacted.Redacted<string>;
}
export type IntegrationCredential =
  | {
      oauthCodeCredential: OAuthCodeCredential;
      oauthClientCredential?: undefined;
      apiKeyCredential?: undefined;
    }
  | {
      oauthCodeCredential?: undefined;
      oauthClientCredential: OAuthClientCredential;
      apiKeyCredential?: undefined;
    }
  | {
      oauthCodeCredential?: undefined;
      oauthClientCredential?: undefined;
      apiKeyCredential: ApiKeyCredential;
    };
export type StringMap = { [key: string]: string | undefined };
export interface CreateIntegrationInput {
  integrationType: IntegrationType;
  name: string;
  credential?: IntegrationCredential | undefined;
  integrationAttributes?: { [key: string]: string | undefined } | undefined;
  roleArn?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
}
export type IntegrationArn = string;
export type IntegrationStatus =
  | "ACTIVE"
  | "DELETED"
  | "PENDING"
  | "PENDING_OAUTH"
  | "ERROR"
  | "FAILED"
  | (string & {});
export type AuthType = "NONE" | "OAUTH2" | "API_KEY" | (string & {});
export type Scope = "ACCOUNT" | "ORGANIZATION" | (string & {});
export interface Integration {
  integrationId: string;
  integrationArn?: string | undefined;
  integrationType: IntegrationType;
  name: string;
  status: IntegrationStatus;
  authType?: AuthType | undefined;
  credentialArn?: string | undefined;
  roleArn?: string | undefined;
  integrationAttributes?: { [key: string]: string | undefined } | undefined;
  authorizationUrl?: string | undefined;
  errorMessage?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
  scope?: Scope | undefined;
}
export interface CreateIntegrationOutput {
  integration: Integration;
}
export interface CreateOmniDashboardInput {
  spaceId: string;
  name: string;
  body: string;
  description?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
}
export type DashboardId = string;
export interface OmniDashboard {
  dashboardId: string;
  arn: string;
  name: string;
  body: string;
  createdBy: string;
  description?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateOmniDashboardOutput {
  omniDashboard: OmniDashboard;
}
export interface CreateOneTimeDeepLinkCodeInput {
  domainId: string;
  ttlSeconds?: number | undefined;
  redirectUrl?: string | undefined;
}
export type DeepLinkCode = string | redacted.Redacted<string>;
export type DeepLinkUrl = string | redacted.Redacted<string>;
export interface CreateOneTimeDeepLinkCodeOutput {
  code: string | redacted.Redacted<string>;
  deepLinkUrl: string | redacted.Redacted<string>;
  expiresAt: Date;
}
export type EncryptionStrategy = "AWS_OWNED" | "CUSTOMER_MANAGED" | (string & {});
export type KmsKeyArn = string;
export interface EncryptionConfiguration {
  encryptionStrategy: EncryptionStrategy;
  kmsKeyArn?: string | undefined;
}
export interface CreateSpaceInput {
  name: string;
  domainId: string;
  dataAccessRoleArn: string;
  agentCoreEvaluationRoleArn?: string | undefined;
  encryptionConfiguration?: EncryptionConfiguration | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
}
export type SpaceStatus = "ACTIVE" | "SUSPENDED" | "MOVING" | (string & {});
export interface Space {
  spaceId: string;
  name: string;
  spaceArn: string;
  domainArn?: string | undefined;
  region: string;
  ownerAccountId: string;
  dataAccessRoleArn: string;
  createdAt: Date;
  updatedAt: Date;
  agentCoreEvaluationRoleArn?: string | undefined;
  status: SpaceStatus;
  statusReason?: string | undefined;
  encryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface CreateSpaceOutput {
  space: Space;
}
export type ViewName = string;
export type ViewDefinition = string;
export type ViewDescription = string;
export interface CreateViewRequest {
  name: string;
  definition: string;
  description?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
}
export type ViewType = "USER" | "MANAGED" | (string & {});
export interface CreateViewResponse {
  name: string;
  type: ViewType;
  description?: string | undefined;
  definition: string;
  createdAt: Date;
  updatedAt: Date;
  arn: string;
}
export interface DeleteAccessGrantInput {
  grantId: string;
}
export interface DeleteAccessGrantOutput {}
export interface DeleteAccessProfileInput {
  spaceId: string;
  profileId: string;
}
export interface DeleteAccessProfileOutput {}
export interface DeleteAlertInput {
  spaceId: string;
  alertId: string;
}
export interface DeleteAlertOutput {}
export interface DeleteDomainInput {
  domainId: string;
}
export interface DeleteDomainOutput {}
export interface DeleteDomainAccessGrantForOrganizationInput {
  grantId: string;
}
export interface DeleteDomainAccessGrantForOrganizationOutput {}
export interface DeleteDomainForOrganizationInput {
  domainId: string;
}
export interface DeleteDomainForOrganizationOutput {}
export type IntegrationIdentifier =
  | { integrationId: string; integrationArn?: undefined; integrationName?: undefined }
  | { integrationId?: undefined; integrationArn: string; integrationName?: undefined }
  | { integrationId?: undefined; integrationArn?: undefined; integrationName: string };
export interface DeleteIntegrationInput {
  identifier: IntegrationIdentifier;
}
export interface DeleteIntegrationOutput {}
export interface DeleteOmniDashboardInput {
  spaceId: string;
  dashboardId: string;
}
export interface DeleteOmniDashboardOutput {}
export interface DeleteSpaceInput {
  spaceId: string;
}
export interface DeleteSpaceOutput {}
export interface DeleteViewRequest {
  name: string;
}
export interface DeleteViewResponse {}
export interface GetAccessGrantInput {
  grantId: string;
}
export interface GetAccessGrantOutput {
  accessGrant: AccessGrant;
}
export interface GetAccessProfileInput {
  spaceId: string;
  profileId: string;
}
export interface GetAccessProfileOutput {
  accessProfile: AccessProfile;
}
export interface GetAlertInput {
  spaceId: string;
  alertId: string;
}
export interface GetAlertOutput {
  alert: Alert;
}
export type ContextGraphId = string;
export type NodeType = "SERVICE" | "RESOURCE" | "REMOTE_SERVICE" | (string & {});
export type ContextGraphName = string;
export type KeyFilterKey = string;
export type KeyFilterValue = string;
export type KeyFilterValues = string[];
export interface KeyFilter {
  key: string;
  values?: string[] | undefined;
}
export type KeyFilterList = KeyFilter[];
export type StringSet = string[];
export type NodeCategory =
  | "GEN_AI_AGENT"
  | "GEN_AI_MODEL"
  | "DATABASE"
  | "MESSAGING_QUEUE"
  | "COMPUTE"
  | "STORAGE"
  | "NETWORK"
  | (string & {});
export type NodeCategorySet = NodeCategory[];
export type Source =
  | "VPC_FLOW_LOG"
  | "CLOUDTRAIL"
  | "IAM_POLICY"
  | "CODE_SEMANTICS"
  | "TELEMETRY"
  | "AZURE_VNET_FLOW_LOG"
  | "ELB_ACCESS_LOG"
  | "CLOUDFRONT_ACCESS_LOG"
  | "S3_ACCESS_LOG"
  | "WAF_ACCESS_LOG"
  | "AWS_INTEGRATION"
  | "CONFIG"
  | (string & {});
export type SourceSet = Source[];
export interface NodeFilters {
  nodeId?: string | undefined;
  nodeType?: NodeType | undefined;
  name?: string | undefined;
  tags?: KeyFilter[] | undefined;
  telemetryAttributes?: KeyFilter[] | undefined;
  region?: string[] | undefined;
  cloudProvider?: string[] | undefined;
  sourceAccountId?: string[] | undefined;
  namespace?: string[] | undefined;
  category?: NodeCategory[] | undefined;
  stage?: string[] | undefined;
  sources?: Source[] | undefined;
}
export type EdgeType = "CALLS" | "ACCESSES" | "RUNS_ON" | (string & {});
export interface EdgeFilters {
  edgeId?: string | undefined;
  from?: string | undefined;
  to?: string | undefined;
  edgeType?: EdgeType | undefined;
  operations?: string[] | undefined;
  telemetryAttributes?: KeyFilter[] | undefined;
  sources?: Source[] | undefined;
}
export type PaginationToken = string;
export interface GetContextGraphInput {
  nodeFilters?: NodeFilters | undefined;
  edgeFilters?: EdgeFilters | undefined;
  startTime: Date;
  endTime: Date;
  depth?: number | undefined;
  maxResults?: number | undefined;
  maxEdgesPerNode?: number | undefined;
  includeMetadata?: boolean | undefined;
  nextToken?: string | undefined;
}
export type IntelligenceTagMap = { [key: string]: string | undefined };
export interface NodeProperties {
  region?: string | undefined;
  cloudProvider?: string | undefined;
  sourceAccountId?: string | undefined;
  namespace?: string | undefined;
  category?: NodeCategory | undefined;
  stage?: string | undefined;
}
export type ContextGraphAttributeMap = { [key: string]: string | undefined };
export type OperationName = string;
export type OperationIdentifierKey = string;
export type OperationIdentifierValue = string;
export type OperationIdentifierSet = { [key: string]: string | undefined };
export type OperationIdentifierSets = { [key: string]: string | undefined }[];
export type OperationDetails = {
  [key: string]: { [key: string]: string | undefined }[] | undefined;
};
export type Signal = "LOGS" | "METRICS" | "TRACES" | "CONFIG" | "UNKNOWN" | (string & {});
export type SignalSet = Signal[];
export type MetadataAttributeMap = { [key: string]: string | undefined };
export interface MetricSemantics {
  description?: string | undefined;
  unit?: string | undefined;
}
export type MetricAggregationTemporality = "delta" | "cumulative" | (string & {});
export type MetricMonotonicity = "monotonic" | "non_monotonic" | (string & {});
export interface MetricMetadata {
  name?: string | undefined;
  preferredStat?: string | undefined;
  metricType?: string | undefined;
  attributes?: { [key: string]: string | undefined } | undefined;
  semantics?: MetricSemantics | undefined;
  aggregationTemporality?: MetricAggregationTemporality | undefined;
  monotonicity?: MetricMonotonicity | undefined;
}
export type MetricMetadataList = MetricMetadata[];
export interface NodeSemantics {
  purpose?: string | undefined;
  language?: string | undefined;
  framework?: string | undefined;
  kind?: string | undefined;
  repository?: string | undefined;
}
export type LogMetadataAttributeMap = { [key: string]: string | undefined };
export interface LogMetadata {
  attributes?: { [key: string]: string | undefined } | undefined;
}
export type LogMetadataList = LogMetadata[];
export type TraceMetadataAttributeMap = { [key: string]: string | undefined };
export interface TraceMetadata {
  attributes?: { [key: string]: string | undefined } | undefined;
}
export type TraceMetadataList = TraceMetadata[];
export interface Metadata {
  metrics?: MetricMetadata[] | undefined;
  semantics?: NodeSemantics | undefined;
  logs?: LogMetadata[] | undefined;
  traces?: TraceMetadata[] | undefined;
}
export interface EdgeTrafficStats {
  bytes?: number | undefined;
  packets?: number | undefined;
  flows?: number | undefined;
  sentBytes?: number | undefined;
  receivedBytes?: number | undefined;
}
export interface EdgeProperties {
  protocol?: string | undefined;
  sourcePort?: string | undefined;
  destinationPort?: string | undefined;
  blocked?: boolean | undefined;
  errorCode?: string | undefined;
  httpStatusCode?: string | undefined;
  httpMethod?: string | undefined;
  serviceInitiated?: boolean | undefined;
  trafficStats?: EdgeTrafficStats | undefined;
}
export interface Edge {
  edgeId?: string | undefined;
  from?: string | undefined;
  to?: string | undefined;
  edgeType?: EdgeType | undefined;
  operations?: string[] | undefined;
  edgeProperties?: EdgeProperties | undefined;
  telemetryAttributes?: { [key: string]: string | undefined } | undefined;
  signalTypes?: Signal[] | undefined;
  sources?: Source[] | undefined;
  metadata?: Metadata | undefined;
  firstObservedAt?: Date | undefined;
  lastObservedAt?: Date | undefined;
}
export type EdgeList = Edge[];
export interface Node {
  nodeId?: string | undefined;
  nodeType?: NodeType | undefined;
  name?: string | undefined;
  alternateNames?: string[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  nodeProperties?: NodeProperties | undefined;
  telemetryAttributes?: { [key: string]: string | undefined } | undefined;
  operationDetails?:
    | { [key: string]: { [key: string]: string | undefined }[] | undefined }
    | undefined;
  signalTypes?: Signal[] | undefined;
  sources?: Source[] | undefined;
  metadata?: Metadata | undefined;
  firstObservedAt?: Date | undefined;
  lastObservedAt?: Date | undefined;
  edges?: Edge[] | undefined;
}
export type NodeList = Node[];
export interface GetContextGraphOutput {
  nodes: Node[];
  nextToken?: string | undefined;
}
export interface GetDomainInput {
  domainId: string;
}
export interface GetDomainOutput {
  domain: Domain;
}
export interface GetDomainAccessGrantForOrganizationInput {
  grantId: string;
}
export interface GetDomainAccessGrantForOrganizationOutput {
  accessGrant: OrganizationAccessGrant;
}
export interface GetDomainForOrganizationInput {
  domainId: string;
}
export interface GetDomainForOrganizationOutput {
  organizationDomain: OrganizationDomain;
}
export interface GetIntegrationInput {
  identifier: IntegrationIdentifier;
}
export interface GetIntegrationOutput {
  integration: Integration;
}
export interface GetIntelligenceConfigurationInput {}
export type IntelligenceKmsKeyArn = string;
export interface GetIntelligenceConfigurationOutput {
  accountId: string;
  kmsKeyArn?: string | undefined;
  updatedAt: Date;
  createdAt: Date;
}
export interface GetOmniDashboardInput {
  spaceId: string;
  dashboardId: string;
}
export interface GetOmniDashboardOutput {
  omniDashboard: OmniDashboard;
}
export interface GetSpaceInput {
  spaceId: string;
}
export interface GetSpaceOutput {
  space: Space;
}
export interface SpaceCredentialRequestContext {
  spaceId?: string | undefined;
  domainId?: string | undefined;
  targetAccountId?: string | undefined;
}
export type OrganizationCredentialType = "SPACE_OPERATION" | (string & {});
export interface GetSpaceCredentialsForOrganizationInput {
  context: SpaceCredentialRequestContext;
  credentialType: OrganizationCredentialType;
}
export type AccessKeyId = string | redacted.Redacted<string>;
export type SecretAccessKey = string | redacted.Redacted<string>;
export type SessionToken = string | redacted.Redacted<string>;
export interface AwsCredentials {
  accessKeyId: string | redacted.Redacted<string>;
  secretAccessKey: string | redacted.Redacted<string>;
  sessionToken: string | redacted.Redacted<string>;
  expiration: Date;
}
export interface GetSpaceCredentialsForOrganizationOutput {
  credentials: AwsCredentials;
}
export type DataAccessActionName = string;
export type DataAccessActionList = string[];
export interface DataAccessTarget {
  actions: string[];
}
export type DataAccessTargetList = DataAccessTarget[];
export type DataAccessAuditContext = { [key: string]: string | undefined };
export interface GetSpaceDataAccessInput {
  spaceId: string;
  targetScopes: DataAccessTarget[];
  durationSeconds?: number | undefined;
  auditContext?: { [key: string]: string | undefined } | undefined;
}
export interface GetSpaceDataAccessOutput {
  credentials: AwsCredentials;
}
export interface GetTelemetryQueryResultsRequest {
  queryId: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export type QueryStatus = "Running" | "Failed" | "Complete" | "Cancelled" | (string & {});
export type Row = { [key: string]: string | undefined };
export type RowList = { [key: string]: string | undefined }[];
export interface PartialResults {
  partialResultsDetected?: boolean | undefined;
}
export interface QueryStatistics {
  bytesScanned?: number | undefined;
  percentComplete?: number | undefined;
  recordsScanned?: number | undefined;
  recordsMatched?: number | undefined;
  partialResults?: PartialResults | undefined;
}
export interface GetTelemetryQueryResultsResponse {
  status: QueryStatus;
  rows?: { [key: string]: string | undefined }[] | undefined;
  nextToken?: string | undefined;
  statistics?: QueryStatistics | undefined;
}
export interface GetViewRequest {
  name: string;
}
export interface GetViewResponse {
  name: string;
  type: ViewType;
  description?: string | undefined;
  definition: string;
  createdAt: Date;
  updatedAt: Date;
  arn: string;
}
export type NextToken = string;
export interface ListAccessGrantsInput {
  domainId?: string | undefined;
  spaceId?: string | undefined;
  principalId?: string | undefined;
  principalType?: AccessGrantPrincipalType | undefined;
  permission?: AccessGrantPermission | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface AccessGrantSummary {
  grantId: string;
  grantArn: string;
  name?: string | undefined;
  domainId: string;
  principal: AccessGrantPrincipal;
  permission: AccessGrantPermission;
  grantType: AccessGrantType;
  spaceId: string;
}
export type AccessGrantSummaryList = AccessGrantSummary[];
export interface ListAccessGrantsOutput {
  items: AccessGrantSummary[];
  nextToken?: string | undefined;
}
export interface ListAccessProfilesInput {
  spaceId: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface AccessProfileSummary {
  profileId: string;
  arn: string;
  name: string;
  description?: string | undefined;
  profileType?: AccessProfileType | undefined;
}
export type AccessProfileSummaryList = AccessProfileSummary[];
export interface ListAccessProfilesOutput {
  items: AccessProfileSummary[];
  nextToken?: string | undefined;
}
export type AlertNameFilterList = string[];
export type AlertIdFilterList = string[];
export interface AlertFilterCriteria {
  names?: string[] | undefined;
  namePrefix?: string | undefined;
  ids?: string[] | undefined;
  stateValue?: AlertState[] | undefined;
  notificationsEnabled?: boolean | undefined;
}
export type AlertSortField = "NAME" | "STATE" | (string & {});
export type AlertSortOrder = "ASC" | "DESC" | (string & {});
export interface ListAlertsInput {
  spaceId: string;
  filterCriteria?: AlertFilterCriteria | undefined;
  sortBy?: AlertSortField | undefined;
  sortOrder?: AlertSortOrder | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface AlertSummary {
  name: string;
  alertId?: string | undefined;
  spaceId?: string | undefined;
  profileId?: string | undefined;
  notificationStatus?: NotificationStatus | undefined;
  state: AlertStateInfo;
  createdAt: Date;
  updatedAt: Date;
  alertArn: string;
}
export type AlertSummaryList = AlertSummary[];
export interface ListAlertsOutput {
  items: AlertSummary[];
  nextToken?: string | undefined;
}
export interface ListDomainAccessGrantsForOrganizationInput {
  domainId?: string | undefined;
  principalId?: string | undefined;
  principalType?: OrganizationGrantPrincipalType | undefined;
  permission?: OrganizationGrantPermission | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface OrganizationAccessGrantSummary {
  grantId: string;
  grantArn: string;
  name?: string | undefined;
  domainId: string;
  principal: OrganizationAccessGrantPrincipal;
  permission: OrganizationGrantPermission;
  grantType: AccessGrantType;
  createdAt: Date;
  updatedAt: Date;
}
export type OrganizationAccessGrantSummaryList = OrganizationAccessGrantSummary[];
export interface ListDomainAccessGrantsForOrganizationOutput {
  items: OrganizationAccessGrantSummary[];
  nextToken?: string | undefined;
}
export interface ListDomainsInput {
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface DomainSummary {
  domainId: string;
  domainArn?: string | undefined;
  name?: string | undefined;
  identityCenterInstanceArn?: string | undefined;
  region?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  status: DomainStatus;
}
export type DomainSummaryList = DomainSummary[];
export interface ListDomainsOutput {
  items: DomainSummary[];
  nextToken?: string | undefined;
}
export interface ListIntegrationsInput {
  integrationType?: IntegrationType | undefined;
  status?: IntegrationStatus | undefined;
  name?: string | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export type IntegrationList = Integration[];
export interface ListIntegrationsOutput {
  items: Integration[];
  nextToken?: string | undefined;
}
export interface ListOmniDashboardsInput {
  spaceId: string;
  namePrefix?: string | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface OmniDashboardSummary {
  dashboardId: string;
  arn: string;
  name: string;
  createdBy: string;
  description?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  createdAt: Date;
  updatedAt: Date;
}
export type OmniDashboardSummaryList = OmniDashboardSummary[];
export interface ListOmniDashboardsOutput {
  items: OmniDashboardSummary[];
  nextToken?: string | undefined;
}
export interface ListSpacesInput {
  domainId?: string | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface SpaceSummary {
  spaceId: string;
  name: string;
  spaceArn: string;
  domainArn?: string | undefined;
  region: string;
  ownerAccountId: string;
  status: SpaceStatus;
  statusReason?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}
export type SpaceSummaryList = SpaceSummary[];
export interface ListSpacesOutput {
  items: SpaceSummary[];
  nextToken?: string | undefined;
}
export interface ListSpacesForOrganizationInput {
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface ListSpacesForOrganizationOutput {
  items: SpaceSummary[];
  nextToken?: string | undefined;
}
export type TelemetryType = "LOGS" | "TRACES" | (string & {});
export interface ListTelemetryFieldsRequest {
  dataSetName: string;
  telemetryType?: TelemetryType | undefined;
  startTime?: Date | undefined;
  endTime?: Date | undefined;
  nextToken?: string | undefined;
}
export interface Field {
  name: string;
  children?: Field[] | undefined;
}
export type FieldList = Field[];
export interface ListTelemetryFieldsResponse {
  fields: Field[];
  nextToken?: string | undefined;
}
export interface ListTelemetryQuerySessionsRequest {
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface SessionSummary {
  sessionId: string;
  createdAt?: Date | undefined;
  lastActivityAt?: Date | undefined;
  sessionName?: string | undefined;
}
export type SessionSummaryList = SessionSummary[];
export interface ListTelemetryQuerySessionsResponse {
  sessions: SessionSummary[];
  nextToken?: string | undefined;
}
export interface ListViewsRequest {
  type?: ViewType | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface ViewSummary {
  name: string;
  type: ViewType;
  description?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}
export type ViewSummaryList = ViewSummary[];
export interface ListViewsResponse {
  items: ViewSummary[];
  nextToken?: string | undefined;
}
export interface PutIntelligenceConfigurationInput {
  kmsKeyArn?: string | undefined;
  removeKmsKey?: boolean | undefined;
  clientToken?: string | undefined;
}
export interface PutIntelligenceConfigurationOutput {
  accountId: string;
  kmsKeyArn?: string | undefined;
  updatedAt: Date;
  createdAt: Date;
}
export type SearchPrincipalsNextToken = string;
export interface SearchPrincipalsInput {
  domainId: string;
  searchQuery: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type PrincipalType = "USER" | "GROUP" | (string & {});
export interface PrincipalSearchResult {
  principalId: string;
  principalType: PrincipalType;
  displayName: string;
  userName?: string | undefined;
  description?: string | undefined;
}
export type PrincipalSearchResultList = PrincipalSearchResult[];
export interface SearchPrincipalsOutput {
  results: PrincipalSearchResult[];
  nextToken?: string | undefined;
}
export interface StartTelemetryQueryRequest {
  queryString: string;
  sessionId: string;
}
export interface StartTelemetryQueryResponse {
  queryId: string;
  sessionId: string;
}
export interface StartTelemetryQuerySessionRequest {
  sessionName?: string | undefined;
}
export interface StartTelemetryQuerySessionResponse {
  sessionId: string;
}
export interface StopTelemetryQueryRequest {
  queryId: string;
}
export interface StopTelemetryQueryResponse {}
export interface StopTelemetryQuerySessionRequest {
  sessionId: string;
}
export interface StopTelemetryQuerySessionResponse {}
export interface UpdateAccessProfileInput {
  spaceId: string;
  profileId: string;
  name?: string | undefined;
  description?: string | undefined;
}
export interface UpdateAccessProfileOutput {
  accessProfile: AccessProfile;
}
export interface UpdateAlertInput {
  spaceId: string;
  alertId: string;
  profileId?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  rule?: Rule | undefined;
  notificationsEnabled?: boolean | undefined;
  notificationRules?: NotificationRule[] | undefined;
}
export interface UpdateAlertOutput {}
export interface UpdateDomainInput {
  domainId: string;
  name?: string | undefined;
  identityProviders?: IdentityProvider[] | undefined;
  identityProviderConfiguration?: IdentityProviderConfiguration | undefined;
}
export interface UpdateDomainOutput {
  domain: Domain;
}
export interface UpdateDomainForOrganizationInput {
  domainId: string;
  name?: string | undefined;
  identityProviders?: IdentityProvider[] | undefined;
  identityProviderConfiguration?: IdentityProviderConfiguration | undefined;
}
export interface UpdateDomainForOrganizationOutput {
  organizationDomain: OrganizationDomain;
}
export interface UpdateIntegrationInput {
  identifier: IntegrationIdentifier;
  credential?: IntegrationCredential | undefined;
  integrationAttributes?: { [key: string]: string | undefined } | undefined;
  roleArn?: string | undefined;
}
export interface UpdateIntegrationOutput {
  integration?: Integration | undefined;
}
export interface UpdateOmniDashboardInput {
  spaceId: string;
  dashboardId: string;
  body?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
}
export interface UpdateOmniDashboardOutput {
  omniDashboard: OmniDashboard;
}
export interface UpdateSpaceInput {
  spaceId: string;
  name?: string | undefined;
  agentCoreEvaluationRoleArn?: string | undefined;
  encryptionConfiguration?: EncryptionConfiguration | undefined;
}
export interface UpdateSpaceOutput {
  space: Space;
}
export interface UpdateViewRequest {
  name: string;
  definition?: string | undefined;
  description?: string | undefined;
}
export interface UpdateViewResponse {
  name: string;
  type: ViewType;
  description?: string | undefined;
  definition: string;
  createdAt: Date;
  updatedAt: Date;
  arn: string;
}
export type CreateAccessGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an AccessGrant that authorizes a principal to perform a set of
 * actions on resources in a space.
 *
 * Optionally narrow the grant with scoped actions that limit it to specific
 * resources and fields. Use ListAccessGrants and GetAccessGrant to retrieve
 * grants, and DeleteAccessGrant to remove them.
 */
export const createAccessGrant: API.OperationMethod<
  CreateAccessGrantInput & RegionInput,
  CreateAccessGrantOutput,
  CreateAccessGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2528, __c79, 0) as any as S.Schema<CreateAccessGrantInput>,
  output: __S(2665, __c83, 9) as any as S.Schema<CreateAccessGrantOutput>,
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
  operationName: "CreateAccessGrant",
  telemetry: TELEMETRY,
  span: "CreateAccessGrant",
}));

export type CreateAccessProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an access profile in a space.
 *
 * Use GetAccessProfile and ListAccessProfiles to retrieve profiles,
 * and UpdateAccessProfile to modify one.
 */
export const createAccessProfile: API.OperationMethod<
  CreateAccessProfileInput & RegionInput,
  CreateAccessProfileOutput,
  CreateAccessProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<CreateAccessProfileInput>,
  output: __S(2753, __c86, 1) as any as S.Schema<CreateAccessProfileOutput>,
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
  operationName: "CreateAccessProfile",
  telemetry: TELEMETRY,
  span: "CreateAccessProfile",
}));

export type CreateAlertError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new alert within a space.
 *
 * Use GetAlert and ListAlerts to retrieve alerts, UpdateAlert to modify one,
 * and DeleteAlert to remove it.
 */
export const createAlert: API.OperationMethod<
  CreateAlertInput & RegionInput,
  CreateAlertOutput,
  CreateAlertError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateAlertInput>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateAlertOutput>,
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
  operationName: "CreateAlert",
  telemetry: TELEMETRY,
  span: "CreateAlert",
}));

export type CreateDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a domain with identity provider configuration.
 *
 * Use GetDomain to retrieve the domain, UpdateDomain to change its
 * configuration, and CreateSpace to add spaces within it.
 */
export const createDomain: API.OperationMethod<
  CreateDomainInput & RegionInput,
  CreateDomainOutput,
  CreateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<CreateDomainInput>,
  output: __S(193, __c6, 1) as any as S.Schema<CreateDomainOutput>,
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
  operationName: "CreateDomain",
  telemetry: TELEMETRY,
  span: "CreateDomain",
}));

export type CreateDomainAccessGrantForOrganizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an AccessGrant that authorizes a principal to administer an
 * organization domain.
 */
export const createDomainAccessGrantForOrganization: API.OperationMethod<
  CreateDomainAccessGrantForOrganizationInput & RegionInput,
  CreateDomainAccessGrantForOrganizationOutput,
  CreateDomainAccessGrantForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<CreateDomainAccessGrantForOrganizationInput>,
  output: __S(257, __c8, 1) as any as S.Schema<CreateDomainAccessGrantForOrganizationOutput>,
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
  operationName: "CreateDomainAccessGrantForOrganization",
  telemetry: TELEMETRY,
  span: "CreateDomainAccessGrantForOrganization",
}));

export type CreateDomainForOrganizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an organization-scoped domain for the caller's AWS Organization.
 * Only the organization's management account can call this operation.
 */
export const createDomainForOrganization: API.OperationMethod<
  CreateDomainForOrganizationInput & RegionInput,
  CreateDomainForOrganizationOutput,
  CreateDomainForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<CreateDomainForOrganizationInput>,
  output: __S(321, __c10, 1) as any as S.Schema<CreateDomainForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDomainForOrganization",
  telemetry: TELEMETRY,
  span: "CreateDomainForOrganization",
}));

export type CreateIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an integration with a third-party provider. Returns the integration
 * identifier and its initial status; when the provider requires interactive
 * consent, an authorization URL is returned for the user to complete setup.
 */
export const createIntegration: API.OperationMethod<
  CreateIntegrationInput & RegionInput,
  CreateIntegrationOutput,
  CreateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<CreateIntegrationInput>,
  output: __S(384, __c12, 0) as any as S.Schema<CreateIntegrationOutput>,
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
  operationName: "CreateIntegration",
  telemetry: TELEMETRY,
  span: "CreateIntegration",
}));

export type CreateOmniDashboardError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new dashboard within a space.
 *
 * Use GetOmniDashboard and ListOmniDashboards to retrieve dashboards,
 * UpdateOmniDashboard to modify one, and DeleteOmniDashboard to remove it.
 */
export const createOmniDashboard: API.OperationMethod<
  CreateOmniDashboardInput & RegionInput,
  CreateOmniDashboardOutput,
  CreateOmniDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<CreateOmniDashboardInput>,
  output: __S(513, __c16, 1) as any as S.Schema<CreateOmniDashboardOutput>,
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
  operationName: "CreateOmniDashboard",
  telemetry: TELEMETRY,
  span: "CreateOmniDashboard",
}));

export type CreateOneTimeDeepLinkCodeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates a one-time code for deep-link authentication.
 *
 * Direct the user's browser to the returned deepLinkUrl before it expires. The code is
 * exchanged for an authenticated, domain-scoped session and can be used only once.
 */
export const createOneTimeDeepLinkCode: API.OperationMethod<
  CreateOneTimeDeepLinkCodeInput & RegionInput,
  CreateOneTimeDeepLinkCodeOutput,
  CreateOneTimeDeepLinkCodeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<CreateOneTimeDeepLinkCodeInput>,
  output: __S(545, __c17, 1) as any as S.Schema<CreateOneTimeDeepLinkCodeOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateOneTimeDeepLinkCode",
  telemetry: TELEMETRY,
  span: "CreateOneTimeDeepLinkCode",
}));

export type CreateSpaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a space in a domain.
 *
 * Use GetSpace to retrieve the space, ListSpaces to enumerate spaces,
 * UpdateSpace to modify it, and DeleteSpace to remove it.
 */
export const createSpace: API.OperationMethod<
  CreateSpaceInput & RegionInput,
  CreateSpaceOutput,
  CreateSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<CreateSpaceInput>,
  output: __S(610, __c19, 2) as any as S.Schema<CreateSpaceOutput>,
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
  operationName: "CreateSpace",
  telemetry: TELEMETRY,
  span: "CreateSpace",
}));

export type CreateViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new SQL view.
 *
 * A view is a named, reusable SQL query that can be referenced from
 * telemetry queries. View names must be unique within the account and
 * region. Only USER views can be created -- MANAGED views are provisioned
 * by AWS.
 */
export const createView: API.OperationMethod<
  CreateViewRequest & RegionInput,
  CreateViewResponse,
  CreateViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<CreateViewRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<CreateViewResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateView",
  telemetry: TELEMETRY,
  span: "CreateView",
}));

export type DeleteAccessGrantError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes an existing AccessGrant, revoking the access it granted.
 *
 * A service-managed grant cannot be deleted.
 */
export const deleteAccessGrant: API.OperationMethod<
  DeleteAccessGrantInput & RegionInput,
  DeleteAccessGrantOutput,
  DeleteAccessGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<DeleteAccessGrantInput>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteAccessGrantOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessGrant",
  telemetry: TELEMETRY,
  span: "DeleteAccessGrant",
}));

export type DeleteAccessProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes an access profile.
 *
 * An access profile cannot be deleted while access grants reference it.
 */
export const deleteAccessProfile: API.OperationMethod<
  DeleteAccessProfileInput & RegionInput,
  DeleteAccessProfileOutput,
  DeleteAccessProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<DeleteAccessProfileInput>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteAccessProfileOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAccessProfile",
  telemetry: TELEMETRY,
  span: "DeleteAccessProfile",
}));

export type DeleteAlertError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an alert by its identifier.
 *
 * Idempotent: deleting an alert that has already been removed succeeds without error.
 */
export const deleteAlert: API.OperationMethod<
  DeleteAlertInput & RegionInput,
  DeleteAlertOutput,
  DeleteAlertError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<DeleteAlertInput>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteAlertOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAlert",
  telemetry: TELEMETRY,
  span: "DeleteAlert",
}));

export type DeleteDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a domain and all of its resources. Call this operation in the Region
 * where the domain was created.
 *
 * A domain cannot be deleted while it contains spaces.
 */
export const deleteDomain: API.OperationMethod<
  DeleteDomainInput & RegionInput,
  DeleteDomainOutput,
  DeleteDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<DeleteDomainInput>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteDomainOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomain",
  telemetry: TELEMETRY,
  span: "DeleteDomain",
}));

export type DeleteDomainAccessGrantForOrganizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes an existing organization access grant, revoking the access it
 * granted.
 *
 * A service-managed grant cannot be deleted.
 */
export const deleteDomainAccessGrantForOrganization: API.OperationMethod<
  DeleteDomainAccessGrantForOrganizationInput & RegionInput,
  DeleteDomainAccessGrantForOrganizationOutput,
  DeleteDomainAccessGrantForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<DeleteDomainAccessGrantForOrganizationInput>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteDomainAccessGrantForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainAccessGrantForOrganization",
  telemetry: TELEMETRY,
  span: "DeleteDomainAccessGrantForOrganization",
}));

export type DeleteDomainForOrganizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes an organization domain and all of its resources. Call this operation in the
 * Region where the domain was created.
 *
 * A domain cannot be deleted while it contains spaces.
 */
export const deleteDomainForOrganization: API.OperationMethod<
  DeleteDomainForOrganizationInput & RegionInput,
  DeleteDomainForOrganizationOutput,
  DeleteDomainForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<DeleteDomainForOrganizationInput>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteDomainForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDomainForOrganization",
  telemetry: TELEMETRY,
  span: "DeleteDomainForOrganization",
}));

export type DeleteIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an integration. Returns the resulting status.
 */
export const deleteIntegration: API.OperationMethod<
  DeleteIntegrationInput & RegionInput,
  DeleteIntegrationOutput,
  DeleteIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<DeleteIntegrationInput>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteIntegrationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIntegration",
  telemetry: TELEMETRY,
  span: "DeleteIntegration",
}));

export type DeleteOmniDashboardError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a dashboard from a space.
 */
export const deleteOmniDashboard: API.OperationMethod<
  DeleteOmniDashboardInput & RegionInput,
  DeleteOmniDashboardOutput,
  DeleteOmniDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<DeleteOmniDashboardInput>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteOmniDashboardOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOmniDashboard",
  telemetry: TELEMETRY,
  span: "DeleteOmniDashboard",
}));

export type DeleteSpaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a space and all of its resources.
 */
export const deleteSpace: API.OperationMethod<
  DeleteSpaceInput & RegionInput,
  DeleteSpaceOutput,
  DeleteSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<DeleteSpaceInput>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteSpaceOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSpace",
  telemetry: TELEMETRY,
  span: "DeleteSpace",
}));

export type DeleteViewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified view.
 *
 * Queries that reference the view fail after it is deleted. Managed views
 * cannot be deleted.
 */
export const deleteView: API.OperationMethod<
  DeleteViewRequest & RegionInput,
  DeleteViewResponse,
  DeleteViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<DeleteViewRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteViewResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteView",
  telemetry: TELEMETRY,
  span: "DeleteView",
}));

export type GetAccessGrantError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the full detail of a single AccessGrant by ID.
 */
export const getAccessGrant: API.OperationMethod<
  GetAccessGrantInput & RegionInput,
  GetAccessGrantOutput,
  GetAccessGrantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<GetAccessGrantInput>,
  output: __S(2665, __c83, 9) as any as S.Schema<GetAccessGrantOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessGrant",
  telemetry: TELEMETRY,
  span: "GetAccessGrant",
}));

export type GetAccessProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an access profile by ID.
 *
 * The response indicates whether the calling principal is currently allowed to
 * assume the profile.
 */
export const getAccessProfile: API.OperationMethod<
  GetAccessProfileInput & RegionInput,
  GetAccessProfileOutput,
  GetAccessProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<GetAccessProfileInput>,
  output: __S(2753, __c86, 1) as any as S.Schema<GetAccessProfileOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccessProfile",
  telemetry: TELEMETRY,
  span: "GetAccessProfile",
}));

export type GetAlertError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a single alert by its identifier.
 *
 * Use ListAlerts to enumerate alerts in the space.
 */
export const getAlert: API.OperationMethod<
  GetAlertInput & RegionInput,
  GetAlertOutput,
  GetAlertError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<GetAlertInput>,
  output: __S(1153, __c36, 1) as any as S.Schema<GetAlertOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAlert",
  telemetry: TELEMETRY,
  span: "GetAlert",
}));

export type GetContextGraphError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Queries the context graph with filtering, traversal, and pagination support.
 *
 * Pagination note: nodes and edges are returned together as a coherent
 * subgraph. Pagination cursors advance over nodes (the primary collection);
 * each page includes all edges connecting nodes within that page. Callers
 * should treat nodes as the paginated collection and edges as supplementary
 * relationship data attached to those nodes.
 */
export const getContextGraph: API.PaginatedOperationMethod<
  GetContextGraphInput & RegionInput,
  GetContextGraphOutput,
  GetContextGraphError,
  Credentials | HttpClient.HttpClient,
  Node
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1188, __c37, 4) as any as S.Schema<GetContextGraphInput>,
  output: __S(1204, __c37, 20) as any as S.Schema<GetContextGraphOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContextGraph",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "nodes",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetContextGraph",
})) as any;

export type GetDomainError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a domain by ID.
 */
export const getDomain: API.OperationMethod<
  GetDomainInput & RegionInput,
  GetDomainOutput,
  GetDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<GetDomainInput>,
  output: __S(193, __c6, 1) as any as S.Schema<GetDomainOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomain",
  telemetry: TELEMETRY,
  span: "GetDomain",
}));

export type GetDomainAccessGrantForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the full detail of a single organization access grant by ID.
 */
export const getDomainAccessGrantForOrganization: API.OperationMethod<
  GetDomainAccessGrantForOrganizationInput & RegionInput,
  GetDomainAccessGrantForOrganizationOutput,
  GetDomainAccessGrantForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<GetDomainAccessGrantForOrganizationInput>,
  output: __S(257, __c8, 1) as any as S.Schema<GetDomainAccessGrantForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainAccessGrantForOrganization",
  telemetry: TELEMETRY,
  span: "GetDomainAccessGrantForOrganization",
}));

export type GetDomainForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of an organization domain by ID.
 */
export const getDomainForOrganization: API.OperationMethod<
  GetDomainForOrganizationInput & RegionInput,
  GetDomainForOrganizationOutput,
  GetDomainForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<GetDomainForOrganizationInput>,
  output: __S(321, __c10, 1) as any as S.Schema<GetDomainForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDomainForOrganization",
  telemetry: TELEMETRY,
  span: "GetDomainForOrganization",
}));

export type GetIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details of a single integration, identified by its identifier,
 * Amazon Resource Name, or name.
 */
export const getIntegration: API.OperationMethod<
  GetIntegrationInput & RegionInput,
  GetIntegrationOutput,
  GetIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<GetIntegrationInput>,
  output: __S(384, __c12, 0) as any as S.Schema<GetIntegrationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntegration",
  telemetry: TELEMETRY,
  span: "GetIntegration",
}));

export type GetIntelligenceConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the intelligence configuration for the calling account.
 * Account is identified via FAS (caller identity).
 * Returns the default configuration if none exists yet.
 */
export const getIntelligenceConfiguration: API.OperationMethod<
  GetIntelligenceConfigurationInput & RegionInput,
  GetIntelligenceConfigurationOutput,
  GetIntelligenceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<GetIntelligenceConfigurationInput>,
  output: __S(1408, __c44, 0) as any as S.Schema<GetIntelligenceConfigurationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIntelligenceConfiguration",
  telemetry: TELEMETRY,
  span: "GetIntelligenceConfiguration",
}));

export type GetOmniDashboardError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a dashboard by ID within a space.
 */
export const getOmniDashboard: API.OperationMethod<
  GetOmniDashboardInput & RegionInput,
  GetOmniDashboardOutput,
  GetOmniDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<GetOmniDashboardInput>,
  output: __S(513, __c16, 1) as any as S.Schema<GetOmniDashboardOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOmniDashboard",
  telemetry: TELEMETRY,
  span: "GetOmniDashboard",
}));

export type GetSpaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a space by ID.
 */
export const getSpace: API.OperationMethod<
  GetSpaceInput & RegionInput,
  GetSpaceOutput,
  GetSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<GetSpaceInput>,
  output: __S(610, __c19, 2) as any as S.Schema<GetSpaceOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpace",
  telemetry: TELEMETRY,
  span: "GetSpace",
}));

export type GetSpaceCredentialsForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns temporary credentials for a space in an organization member account.
 * The credentials are valid for one hour.
 *
 * The caller must be the organization's management account or a delegated
 * administrator with access to the target space. The target account must be an
 * active member of the same organization as the domain, and the space must
 * already exist.
 */
export const getSpaceCredentialsForOrganization: API.OperationMethod<
  GetSpaceCredentialsForOrganizationInput & RegionInput,
  GetSpaceCredentialsForOrganizationOutput,
  GetSpaceCredentialsForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1505, __c47, 1) as any as S.Schema<GetSpaceCredentialsForOrganizationInput>,
  output: __S(1537, __c48, 1) as any as S.Schema<GetSpaceCredentialsForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpaceCredentialsForOrganization",
  telemetry: TELEMETRY,
  span: "GetSpaceCredentialsForOrganization",
}));

export type GetSpaceDataAccessError =
  | AccessDeniedException
  | InternalServerException
  | PolicyTooLargeException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns temporary credentials for working with data in a space, limited to the actions
 * you request.
 *
 * The credentials allow only the requested actions that can be granted in the space and
 * that your access grants allow. Requested actions that cannot be conferred are ignored
 * rather than rejected.
 */
export const getSpaceDataAccess: API.OperationMethod<
  GetSpaceDataAccessInput & RegionInput,
  GetSpaceDataAccessOutput,
  GetSpaceDataAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1570, __c49, 2) as any as S.Schema<GetSpaceDataAccessInput>,
  output: __S(1537, __c48, 1) as any as S.Schema<GetSpaceDataAccessOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    PolicyTooLargeException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpaceDataAccess",
  telemetry: TELEMETRY,
  span: "GetSpaceDataAccess",
}));

export type GetTelemetryQueryResultsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the results for the specified query.
 */
export const getTelemetryQueryResults: API.PaginatedOperationMethod<
  GetTelemetryQueryResultsRequest & RegionInput,
  GetTelemetryQueryResultsResponse,
  GetTelemetryQueryResultsError,
  Credentials | HttpClient.HttpClient,
  { [key: string]: string | undefined }
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<GetTelemetryQueryResultsRequest>,
  output: __S(1603, __c50, 3) as any as S.Schema<GetTelemetryQueryResultsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTelemetryQueryResults",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "rows",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "GetTelemetryQueryResults",
})) as any;

export type GetViewError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the definition and metadata of the specified view.
 */
export const getView: API.OperationMethod<
  GetViewRequest & RegionInput,
  GetViewResponse,
  GetViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<GetViewRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<GetViewResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetView",
  telemetry: TELEMETRY,
  span: "GetView",
}));

export type ListAccessGrantsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns AccessGrants, with optional filtering by domain, space, principal, or
 * permission. A grant is returned only when it matches every filter supplied.
 * With no filters, returns the grants for the current account and Region.
 */
export const listAccessGrants: API.PaginatedOperationMethod<
  ListAccessGrantsInput & RegionInput,
  ListAccessGrantsOutput,
  ListAccessGrantsError,
  Credentials | HttpClient.HttpClient,
  AccessGrantSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<ListAccessGrantsInput>,
  output: __S(1667, __c52, 3) as any as S.Schema<ListAccessGrantsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessGrants",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAccessGrants",
})) as any;

export type ListAccessProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the access profiles in a space.
 */
export const listAccessProfiles: API.PaginatedOperationMethod<
  ListAccessProfilesInput & RegionInput,
  ListAccessProfilesOutput,
  ListAccessProfilesError,
  Credentials | HttpClient.HttpClient,
  AccessProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<ListAccessProfilesInput>,
  output: __S(1699, __c53, 3) as any as S.Schema<ListAccessProfilesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAccessProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAccessProfiles",
})) as any;

export type ListAlertsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists alerts within a space, optionally filtered by exact name(s),
 * a single name prefix, or exact alertId(s), with pagination.
 *
 * Use GetAlert to retrieve a single alert's full detail.
 */
export const listAlerts: API.PaginatedOperationMethod<
  ListAlertsInput & RegionInput,
  ListAlertsOutput,
  ListAlertsError,
  Credentials | HttpClient.HttpClient,
  AlertSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1729, __c54, 1) as any as S.Schema<ListAlertsInput>,
  output: __S(1732, __c54, 4) as any as S.Schema<ListAlertsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAlerts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListAlerts",
})) as any;

export type ListDomainAccessGrantsForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns organization-level domain access grants, with optional filtering by
 * domain, principal, or permission. A grant is returned only when it matches
 * every filter supplied. With no filters, returns the grants for the caller's
 * organization.
 */
export const listDomainAccessGrantsForOrganization: API.PaginatedOperationMethod<
  ListDomainAccessGrantsForOrganizationInput & RegionInput,
  ListDomainAccessGrantsForOrganizationOutput,
  ListDomainAccessGrantsForOrganizationError,
  Credentials | HttpClient.HttpClient,
  OrganizationAccessGrantSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<ListDomainAccessGrantsForOrganizationInput>,
  output: __S(1763, __c55, 3) as any as S.Schema<ListDomainAccessGrantsForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomainAccessGrantsForOrganization",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDomainAccessGrantsForOrganization",
})) as any;

export type ListDomainsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the caller's domains: the account-scoped domain and the
 * organization-scoped domain, if either exists. At most two domains are returned.
 */
export const listDomains: API.PaginatedOperationMethod<
  ListDomainsInput & RegionInput,
  ListDomainsOutput,
  ListDomainsError,
  Credentials | HttpClient.HttpClient,
  DomainSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<ListDomainsInput>,
  output: __S(1795, __c56, 3) as any as S.Schema<ListDomainsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDomains",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDomains",
})) as any;

export type ListIntegrationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the integrations in the account, optionally filtered by type, status,
 * or name. Results are paginated.
 */
export const listIntegrations: API.PaginatedOperationMethod<
  ListIntegrationsInput & RegionInput,
  ListIntegrationsOutput,
  ListIntegrationsError,
  Credentials | HttpClient.HttpClient,
  Integration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1824, __c57, 0) as any as S.Schema<ListIntegrationsInput>,
  output: __S(1826, __c57, 2) as any as S.Schema<ListIntegrationsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIntegrations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListIntegrations",
})) as any;

export type ListOmniDashboardsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the dashboards in a space, optionally filtered by name prefix.
 */
export const listOmniDashboards: API.PaginatedOperationMethod<
  ListOmniDashboardsInput & RegionInput,
  ListOmniDashboardsOutput,
  ListOmniDashboardsError,
  Credentials | HttpClient.HttpClient,
  OmniDashboardSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<ListOmniDashboardsInput>,
  output: __S(1859, __c58, 3) as any as S.Schema<ListOmniDashboardsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListOmniDashboards",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListOmniDashboards",
})) as any;

export type ListSpacesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the spaces in the account, optionally filtered by domain.
 */
export const listSpaces: API.PaginatedOperationMethod<
  ListSpacesInput & RegionInput,
  ListSpacesOutput,
  ListSpacesError,
  Credentials | HttpClient.HttpClient,
  SpaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<ListSpacesInput>,
  output: __S(1922, __c60, 2) as any as S.Schema<ListSpacesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSpaces",
})) as any;

export type ListSpacesForOrganizationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the spaces across all member accounts in the organization.
 */
export const listSpacesForOrganization: API.PaginatedOperationMethod<
  ListSpacesForOrganizationInput & RegionInput,
  ListSpacesForOrganizationOutput,
  ListSpacesForOrganizationError,
  Credentials | HttpClient.HttpClient,
  SpaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<ListSpacesForOrganizationInput>,
  output: __S(1922, __c60, 2) as any as S.Schema<ListSpacesForOrganizationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpacesForOrganization",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSpacesForOrganization",
})) as any;

export type ListTelemetryFieldsError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists fields available for telemetry queries.
 *
 * Returns a list of fields included in the specified dataset, granular
 * to telemetry type. Returned field names reflect the exact stored casing
 * and are case-sensitive when referenced in query expressions; the query
 * engine does not normalize identifier case.
 */
export const listTelemetryFields: API.PaginatedOperationMethod<
  ListTelemetryFieldsRequest & RegionInput,
  ListTelemetryFieldsResponse,
  ListTelemetryFieldsError,
  Credentials | HttpClient.HttpClient,
  Field
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1984, __c62, 0) as any as S.Schema<ListTelemetryFieldsRequest>,
  output: __S(1987, __c62, 3) as any as S.Schema<ListTelemetryFieldsResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTelemetryFields",
  pagination: { inputToken: "nextToken", outputToken: "nextToken", items: "fields" } as const,
  telemetry: TELEMETRY,
  span: "ListTelemetryFields",
})) as any;

export type ListTelemetryQuerySessionsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists telemetry query sessions.
 *
 * Returns a list of telemetry query sessions owned by the caller.
 */
export const listTelemetryQuerySessions: API.PaginatedOperationMethod<
  ListTelemetryQuerySessionsRequest & RegionInput,
  ListTelemetryQuerySessionsResponse,
  ListTelemetryQuerySessionsError,
  Credentials | HttpClient.HttpClient,
  SessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<ListTelemetryQuerySessionsRequest>,
  output: __S(2019, __c63, 3) as any as S.Schema<ListTelemetryQuerySessionsResponse>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTelemetryQuerySessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessions",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListTelemetryQuerySessions",
})) as any;

export type ListViewsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the views in the caller's account and region.
 *
 * Returns a summary for each view, optionally filtered by view type. View
 * definitions are not included -- use GetView to retrieve them.
 */
export const listViews: API.PaginatedOperationMethod<
  ListViewsRequest & RegionInput,
  ListViewsResponse,
  ListViewsError,
  Credentials | HttpClient.HttpClient,
  ViewSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2048, __c64, 0) as any as S.Schema<ListViewsRequest>,
  output: __S(2051, __c64, 3) as any as S.Schema<ListViewsResponse>,
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListViews",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListViews",
})) as any;

export type PutIntelligenceConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates the intelligence configuration for the calling account.
 * Account is identified via FAS (caller identity).
 */
export const putIntelligenceConfiguration: API.OperationMethod<
  PutIntelligenceConfigurationInput & RegionInput,
  PutIntelligenceConfigurationOutput,
  PutIntelligenceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<PutIntelligenceConfigurationInput>,
  output: __S(1408, __c44, 0) as any as S.Schema<PutIntelligenceConfigurationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutIntelligenceConfiguration",
  telemetry: TELEMETRY,
  span: "PutIntelligenceConfiguration",
}));

export type SearchPrincipalsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches Identity Center for users and groups in a domain. The domain must be
 * configured with Identity Center.
 *
 * To grant access to a result, pass its principalId to CreateAccessGrant with a
 * principalType of IDC_USER for a user or IDC_GROUP for a group.
 */
export const searchPrincipals: API.PaginatedOperationMethod<
  SearchPrincipalsInput & RegionInput,
  SearchPrincipalsOutput,
  SearchPrincipalsError,
  Credentials | HttpClient.HttpClient,
  PrincipalSearchResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2112, __c66, 0) as any as S.Schema<SearchPrincipalsInput>,
  output: __S(2115, __c66, 3) as any as S.Schema<SearchPrincipalsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchPrincipals",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "results",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "SearchPrincipals",
})) as any;

export type StartTelemetryQueryError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a telemetry query within a session.
 *
 * Submits the provided query string for execution in the specified
 * session. Use GetTelemetryQueryResults to poll for results and check
 * query status.
 */
export const startTelemetryQuery: API.OperationMethod<
  StartTelemetryQueryRequest & RegionInput,
  StartTelemetryQueryResponse,
  StartTelemetryQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<StartTelemetryQueryRequest>,
  output: __S(2145, __c67, 1) as any as S.Schema<StartTelemetryQueryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTelemetryQuery",
  telemetry: TELEMETRY,
  span: "StartTelemetryQuery",
}));

export type StartTelemetryQuerySessionError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new telemetry query session.
 *
 * A session provides a logical grouping for one or more telemetry queries.
 * The returned session ID is required when starting queries via
 * StartTelemetryQuery.
 */
export const startTelemetryQuerySession: API.OperationMethod<
  StartTelemetryQuerySessionRequest & RegionInput,
  StartTelemetryQuerySessionResponse,
  StartTelemetryQuerySessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2176, __c68, 0) as any as S.Schema<StartTelemetryQuerySessionRequest>,
  output: __S(2177, __c68, 1) as any as S.Schema<StartTelemetryQuerySessionResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTelemetryQuerySession",
  telemetry: TELEMETRY,
  span: "StartTelemetryQuerySession",
}));

export type StopTelemetryQueryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a running telemetry query.
 */
export const stopTelemetryQuery: API.OperationMethod<
  StopTelemetryQueryRequest & RegionInput,
  StopTelemetryQueryResponse,
  StopTelemetryQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<StopTelemetryQueryRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<StopTelemetryQueryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTelemetryQuery",
  telemetry: TELEMETRY,
  span: "StopTelemetryQuery",
}));

export type StopTelemetryQuerySessionError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a telemetry query session.
 *
 * Terminates the specified session. After a session is stopped it cannot
 * be reused.
 */
export const stopTelemetryQuerySession: API.OperationMethod<
  StopTelemetryQuerySessionRequest & RegionInput,
  StopTelemetryQuerySessionResponse,
  StopTelemetryQuerySessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<StopTelemetryQuerySessionRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<StopTelemetryQuerySessionResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTelemetryQuerySession",
  telemetry: TELEMETRY,
  span: "StopTelemetryQuerySession",
}));

export type UpdateAccessProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the name or description of an access profile.
 *
 * Only the provided fields are changed; omitted fields are left unchanged.
 */
export const updateAccessProfile: API.OperationMethod<
  UpdateAccessProfileInput & RegionInput,
  UpdateAccessProfileOutput,
  UpdateAccessProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<UpdateAccessProfileInput>,
  output: __S(2753, __c86, 1) as any as S.Schema<UpdateAccessProfileOutput>,
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
  operationName: "UpdateAccessProfile",
  telemetry: TELEMETRY,
  span: "UpdateAccessProfile",
}));

export type UpdateAlertError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing alert.
 *
 * Only non-null fields overwrite existing values.
 */
export const updateAlert: API.OperationMethod<
  UpdateAlertInput & RegionInput,
  UpdateAlertOutput,
  UpdateAlertError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2304, __c72, 0) as any as S.Schema<UpdateAlertInput>,
  output: __S(736, __c23, 0) as any as S.Schema<UpdateAlertOutput>,
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
  operationName: "UpdateAlert",
  telemetry: TELEMETRY,
  span: "UpdateAlert",
}));

export type UpdateDomainError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a domain's name or identity provider configuration.
 *
 * Only the provided fields are changed; omitted fields are left unchanged.
 * Renaming a domain also changes the endpoint URLs derived from its name.
 */
export const updateDomain: API.OperationMethod<
  UpdateDomainInput & RegionInput,
  UpdateDomainOutput,
  UpdateDomainError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<UpdateDomainInput>,
  output: __S(193, __c6, 1) as any as S.Schema<UpdateDomainOutput>,
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
  operationName: "UpdateDomain",
  telemetry: TELEMETRY,
  span: "UpdateDomain",
}));

export type UpdateDomainForOrganizationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an organization domain's name or identity provider configuration. Call this
 * operation in the Region where the domain was created.
 *
 * Only the provided fields are changed; omitted fields are left unchanged.
 * Renaming a domain also changes the endpoint URLs derived from its name.
 */
export const updateDomainForOrganization: API.OperationMethod<
  UpdateDomainForOrganizationInput & RegionInput,
  UpdateDomainForOrganizationOutput,
  UpdateDomainForOrganizationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2368, __c74, 0) as any as S.Schema<UpdateDomainForOrganizationInput>,
  output: __S(321, __c10, 1) as any as S.Schema<UpdateDomainForOrganizationOutput>,
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
  operationName: "UpdateDomainForOrganization",
  telemetry: TELEMETRY,
  span: "UpdateDomainForOrganization",
}));

export type UpdateIntegrationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing integration, identified by its id, ARN, or name. Only the
 * fields you provide are changed.
 */
export const updateIntegration: API.OperationMethod<
  UpdateIntegrationInput & RegionInput,
  UpdateIntegrationOutput,
  UpdateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2400, __c75, 0) as any as S.Schema<UpdateIntegrationInput>,
  output: __S(2401, __c75, 1) as any as S.Schema<UpdateIntegrationOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateIntegration",
  telemetry: TELEMETRY,
  span: "UpdateIntegration",
}));

export type UpdateOmniDashboardError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing dashboard within a space.
 *
 * Only the provided fields are changed; omitted fields are left unchanged.
 */
export const updateOmniDashboard: API.OperationMethod<
  UpdateOmniDashboardInput & RegionInput,
  UpdateOmniDashboardOutput,
  UpdateOmniDashboardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2432, __c76, 0) as any as S.Schema<UpdateOmniDashboardInput>,
  output: __S(513, __c16, 1) as any as S.Schema<UpdateOmniDashboardOutput>,
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
  operationName: "UpdateOmniDashboard",
  telemetry: TELEMETRY,
  span: "UpdateOmniDashboard",
}));

export type UpdateSpaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a space.
 *
 * Only the provided fields are changed; omitted fields are left unchanged.
 */
export const updateSpace: API.OperationMethod<
  UpdateSpaceInput & RegionInput,
  UpdateSpaceOutput,
  UpdateSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<UpdateSpaceInput>,
  output: __S(610, __c19, 2) as any as S.Schema<UpdateSpaceOutput>,
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
  operationName: "UpdateSpace",
  telemetry: TELEMETRY,
  span: "UpdateSpace",
}));

export type UpdateViewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing view's definition and/or description.
 *
 * Only the fields you provide are changed. Managed views cannot be
 * updated.
 */
export const updateView: API.OperationMethod<
  UpdateViewRequest & RegionInput,
  UpdateViewResponse,
  UpdateViewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2496, __c78, 0) as any as S.Schema<UpdateViewRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<UpdateViewResponse>,
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
  operationName: "UpdateView",
  telemetry: TELEMETRY,
  span: "UpdateView",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          profileId: S.String,
          name: S.String,
          description: S.optional(S.String),
          rule: __S(101, __c3, 5),
          notificationsEnabled: S.optional(S.Boolean),
          tags: S.optional(__S(2688, __c84, 0)),
          notificationRules: S.optional(__S(105, __c3, 9)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAlertInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ alertArn: S.optional(S.String), alert: __S(32, __c1, 0) }),
      ).annotate({ identifier: "CreateAlertOutput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          alertId: S.optional(S.String),
          description: S.optional(S.String),
          accountId: S.String,
          spaceId: S.optional(S.String),
          profileId: S.optional(S.String),
          rule: __S(101, __c3, 5),
          notificationStatus: S.optional(S.String),
          state: S.optional(__S(66, __c2, 2)),
          notificationRules: S.optional(__S(105, __c3, 9)),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          alertArn: S.String,
        }),
      ).annotate({ identifier: "Alert" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ warningCount: S.optional(S.Number), criticalCount: S.optional(S.Number) }),
      ).annotate({ identifier: "ContributorSummary" });
    case 1:
      return S.suspend(() => S.Struct({ thresholdBreached: S.optional(S.Number) })).annotate({
        identifier: "AlertStateData",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          value: S.String,
          transitionedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          contributorSummary: S.optional(__S(64, __c2, 0)),
          data: S.optional(__S(65, __c2, 1)),
        }),
      ).annotate({ identifier: "AlertStateInfo" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ language: S.String, expression: S.String })).annotate({
        identifier: "AlertRuleQuery",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          thresholdMode: S.optional(S.String),
          thresholdField: S.optional(S.String),
          comparator: S.optional(S.String),
          warningThreshold: S.optional(S.Number),
          criticalThreshold: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AlertCondition" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          intervalSeconds: S.Number,
          pendingDurationSeconds: S.optional(S.Number),
          recoveryDurationSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AlertEvaluation" });
    case 3:
      return S.suspend(() => S.Struct({ treatAs: S.String })).annotate({ identifier: "NoData" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          query: S.optional(__S(96, __c3, 0)),
          condition: S.optional(__S(97, __c3, 1)),
          evaluation: S.optional(__S(98, __c3, 2)),
          noData: S.optional(__S(99, __c3, 3)),
        }),
      ).annotate({ identifier: "TelemetryRule" });
    case 5:
      return S.Union([/*@__PURE__*/ S.Struct({ telemetryRule: __S(100, __c3, 4) })]);
    case 6:
      return S.suspend(() => S.Struct({ stateValues: S.optional(__S(2560, __c80, 0)) })).annotate({
        identifier: "NotificationTrigger",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({ type: S.String, arn: S.String, metadata: S.optional(__S(2688, __c84, 0)) }),
      ).annotate({ identifier: "NotificationTarget" });
    case 8:
      return S.suspend(() =>
        S.Struct({ trigger: __S(102, __c3, 6), target: __S(103, __c3, 7) }),
      ).annotate({ identifier: "NotificationRule" });
    case 9:
      return S.Array(__S(104, __c3, 8));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          identityProviders: __S(2560, __c80, 0),
          identityProviderConfiguration: S.optional(__S(161, __c5, 1)),
          tags: S.optional(__S(2688, __c84, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDomainInput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identityCenterInstanceArn: S.optional(S.String) }),
      ).annotate({ identifier: "IdentityCenterConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ identityCenterConfiguration: S.optional(__S(160, __c5, 0)) }),
      ).annotate({ identifier: "IdentityProviderConfiguration" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          domainArn: S.String,
          name: S.optional(S.String),
          identityProviders: __S(2560, __c80, 0),
          identityProviderConfiguration: S.optional(__S(161, __c5, 1)),
          domainEndpointUrl: S.String,
          customEndpointUrls: S.optional(__S(2592, __c81, 0)),
          identityCenterApplicationArn: S.optional(S.String),
          region: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
        }),
      ).annotate({ identifier: "Domain" });
    case 1:
      return S.suspend(() => S.Struct({ domain: __S(192, __c6, 0) })).annotate({
        identifier: "CreateDomainOutput",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          name: S.String,
          principal: __S(2626, __c82, 2),
          permission: S.String,
          tags: S.optional(__S(2688, __c84, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDomainAccessGrantForOrganizationInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          grantId: S.String,
          grantArn: S.String,
          name: S.optional(S.String),
          domainId: S.String,
          principal: __S(2626, __c82, 2),
          permission: S.String,
          grantType: S.String,
          createdBy: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "OrganizationAccessGrant" });
    case 1:
      return S.suspend(() => S.Struct({ accessGrant: __S(256, __c8, 0) })).annotate({
        identifier: "CreateDomainAccessGrantForOrganizationOutput",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          identityProviders: __S(2560, __c80, 0),
          identityProviderConfiguration: S.optional(__S(161, __c5, 1)),
          domainAccessRoleArn: S.String,
          tags: S.optional(__S(2688, __c84, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDomainForOrganizationInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          domainArn: S.String,
          name: S.optional(S.String),
          domainEndpointUrl: S.String,
          customEndpointUrls: S.optional(__S(2592, __c81, 0)),
          organizationId: S.String,
          ownerAccountId: S.String,
          identityProviders: __S(2560, __c80, 0),
          identityProviderConfiguration: S.optional(__S(161, __c5, 1)),
          identityCenterApplicationArn: S.optional(S.String),
          region: S.String,
          status: S.String,
          domainAccessRoleArn: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "OrganizationDomain" });
    case 1:
      return S.suspend(() => S.Struct({ organizationDomain: __S(320, __c10, 0) })).annotate({
        identifier: "CreateDomainForOrganizationOutput",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          integrationType: S.String,
          name: S.String,
          credential: S.optional(__S(451, __c14, 3)),
          integrationAttributes: S.optional(__S(2688, __c84, 0)),
          roleArn: S.optional(S.String),
          tags: S.optional(__S(2688, __c84, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateIntegrationInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ integration: __S(416, __c13, 0) })).annotate({
        identifier: "CreateIntegrationOutput",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          integrationId: S.String,
          integrationArn: S.optional(S.String),
          integrationType: S.String,
          name: S.String,
          status: S.String,
          authType: S.optional(S.String),
          credentialArn: S.optional(S.String),
          roleArn: S.optional(S.String),
          integrationAttributes: S.optional(__S(2688, __c84, 0)),
          authorizationUrl: S.optional(S.String),
          errorMessage: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          scope: S.optional(S.String),
        }),
      ).annotate({ identifier: "Integration" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ authCode: S.String })).annotate({
        identifier: "OAuthCodeCredential",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          clientId: S.String,
          clientSecret: SensitiveString,
          providerId: S.optional(S.String),
        }),
      ).annotate({ identifier: "OAuthClientCredential" });
    case 2:
      return S.suspend(() => S.Struct({ apiKeyValue: SensitiveString })).annotate({
        identifier: "ApiKeyCredential",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ oauthCodeCredential: __S(448, __c14, 0) }),
        /*@__PURE__*/ S.Struct({ oauthClientCredential: __S(449, __c14, 1) }),
        /*@__PURE__*/ S.Struct({ apiKeyCredential: __S(450, __c14, 2) }),
      ]);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          name: S.String,
          body: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(2688, __c84, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateOmniDashboardInput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dashboardId: S.String,
          arn: S.String,
          name: S.String,
          body: S.String,
          createdBy: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(2688, __c84, 0)),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "OmniDashboard" });
    case 1:
      return S.suspend(() => S.Struct({ omniDashboard: __S(512, __c16, 0) })).annotate({
        identifier: "CreateOmniDashboardOutput",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          ttlSeconds: S.optional(S.Number),
          redirectUrl: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateOneTimeDeepLinkCodeInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          code: SensitiveString,
          deepLinkUrl: SensitiveString,
          expiresAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CreateOneTimeDeepLinkCodeOutput" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          domainId: S.String,
          dataAccessRoleArn: S.String,
          agentCoreEvaluationRoleArn: S.optional(S.String),
          encryptionConfiguration: S.optional(__S(608, __c19, 0)),
          tags: S.optional(__S(2688, __c84, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSpaceInput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ encryptionStrategy: S.String, kmsKeyArn: S.optional(S.String) }),
      ).annotate({ identifier: "EncryptionConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          name: S.String,
          spaceArn: S.String,
          domainArn: S.optional(S.String),
          region: S.String,
          ownerAccountId: S.String,
          dataAccessRoleArn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          agentCoreEvaluationRoleArn: S.optional(S.String),
          status: S.String,
          statusReason: S.optional(S.String),
          encryptionConfiguration: S.optional(__S(608, __c19, 0)),
        }),
      ).annotate({ identifier: "Space" });
    case 2:
      return S.suspend(() => S.Struct({ space: __S(609, __c19, 1) })).annotate({
        identifier: "CreateSpaceOutput",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          definition: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(2688, __c84, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateViewRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          description: S.optional(S.String),
          definition: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          arn: S.String,
        }),
      ).annotate({ identifier: "CreateViewResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ grantId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAccessGrantInput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAccessGrantOutput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ spaceId: S.String, profileId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAccessProfileInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ spaceId: S.String, alertId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAlertInput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDomainInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ grantId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDomainAccessGrantForOrganizationInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDomainForOrganizationInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: __S(960, __c30, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteIntegrationInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ integrationId: S.String }),
        /*@__PURE__*/ S.Struct({ integrationArn: S.String }),
        /*@__PURE__*/ S.Struct({ integrationName: S.String }),
      ]);
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ spaceId: S.String, dashboardId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteOmniDashboardInput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ spaceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSpaceInput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteViewRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ grantId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAccessGrantInput" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ spaceId: S.String, profileId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAccessProfileInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ spaceId: S.String, alertId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAlertInput" });
    case 1:
      return S.suspend(() => S.Struct({ alert: __S(32, __c1, 0) })).annotate({
        identifier: "GetAlertOutput",
      });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ key: S.String, values: S.optional(__S(2592, __c81, 0)) }),
      ).annotate({ identifier: "KeyFilter" });
    case 1:
      return S.Array(__S(1184, __c37, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nodeId: S.optional(S.String),
          nodeType: S.optional(S.String),
          name: S.optional(S.String),
          tags: S.optional(__S(1185, __c37, 1)),
          telemetryAttributes: S.optional(__S(1185, __c37, 1)),
          region: S.optional(__S(2592, __c81, 0)),
          cloudProvider: S.optional(__S(2592, __c81, 0)),
          sourceAccountId: S.optional(__S(2592, __c81, 0)),
          namespace: S.optional(__S(2592, __c81, 0)),
          category: S.optional(__S(2560, __c80, 0)),
          stage: S.optional(__S(2592, __c81, 0)),
          sources: S.optional(__S(2560, __c80, 0)),
        }),
      ).annotate({ identifier: "NodeFilters" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          edgeId: S.optional(S.String),
          from: S.optional(S.String),
          to: S.optional(S.String),
          edgeType: S.optional(S.String),
          operations: S.optional(__S(2592, __c81, 0)),
          telemetryAttributes: S.optional(__S(1185, __c37, 1)),
          sources: S.optional(__S(2560, __c80, 0)),
        }),
      ).annotate({ identifier: "EdgeFilters" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          nodeFilters: S.optional(__S(1186, __c37, 2)),
          edgeFilters: S.optional(__S(1187, __c37, 3)),
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          depth: S.optional(S.Number),
          maxResults: S.optional(S.Number),
          maxEdgesPerNode: S.optional(S.Number),
          includeMetadata: S.optional(S.Boolean),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetContextGraphInput" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          region: S.optional(S.String),
          cloudProvider: S.optional(S.String),
          sourceAccountId: S.optional(S.String),
          namespace: S.optional(S.String),
          category: S.optional(S.String),
          stage: S.optional(S.String),
        }),
      ).annotate({ identifier: "NodeProperties" });
    case 6:
      return S.Record(S.String, /*@__PURE__*/ __S(1216, __c38, 0).pipe(S.optional));
    case 7:
      return S.suspend(() =>
        S.Struct({ description: S.optional(S.String), unit: S.optional(S.String) }),
      ).annotate({ identifier: "MetricSemantics" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          preferredStat: S.optional(S.String),
          metricType: S.optional(S.String),
          attributes: S.optional(__S(2688, __c84, 0)),
          semantics: S.optional(__S(1191, __c37, 7)),
          aggregationTemporality: S.optional(S.String),
          monotonicity: S.optional(S.String),
        }),
      ).annotate({ identifier: "MetricMetadata" });
    case 9:
      return S.Array(__S(1192, __c37, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          purpose: S.optional(S.String),
          language: S.optional(S.String),
          framework: S.optional(S.String),
          kind: S.optional(S.String),
          repository: S.optional(S.String),
        }),
      ).annotate({ identifier: "NodeSemantics" });
    case 11:
      return S.suspend(() => S.Struct({ attributes: S.optional(__S(2688, __c84, 0)) })).annotate({
        identifier: "LogMetadata",
      });
    case 12:
      return S.Array(__S(1195, __c37, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          metrics: S.optional(__S(1193, __c37, 9)),
          semantics: S.optional(__S(1194, __c37, 10)),
          logs: S.optional(__S(1196, __c37, 12)),
          traces: S.optional(__S(1196, __c37, 12)),
        }),
      ).annotate({ identifier: "Metadata" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          bytes: S.optional(S.Number),
          packets: S.optional(S.Number),
          flows: S.optional(S.Number),
          sentBytes: S.optional(S.Number),
          receivedBytes: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EdgeTrafficStats" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          protocol: S.optional(S.String),
          sourcePort: S.optional(S.String),
          destinationPort: S.optional(S.String),
          blocked: S.optional(S.Boolean),
          errorCode: S.optional(S.String),
          httpStatusCode: S.optional(S.String),
          httpMethod: S.optional(S.String),
          serviceInitiated: S.optional(S.Boolean),
          trafficStats: S.optional(__S(1198, __c37, 14)),
        }),
      ).annotate({ identifier: "EdgeProperties" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          edgeId: S.optional(S.String),
          from: S.optional(S.String),
          to: S.optional(S.String),
          edgeType: S.optional(S.String),
          operations: S.optional(__S(2592, __c81, 0)),
          edgeProperties: S.optional(__S(1199, __c37, 15)),
          telemetryAttributes: S.optional(__S(2688, __c84, 0)),
          signalTypes: S.optional(__S(2560, __c80, 0)),
          sources: S.optional(__S(2560, __c80, 0)),
          metadata: S.optional(__S(1197, __c37, 13)),
          firstObservedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastObservedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Edge" });
    case 17:
      return S.Array(__S(1200, __c37, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          nodeId: S.optional(S.String),
          nodeType: S.optional(S.String),
          name: S.optional(S.String),
          alternateNames: S.optional(__S(2592, __c81, 0)),
          tags: S.optional(__S(2688, __c84, 0)),
          nodeProperties: S.optional(__S(1189, __c37, 5)),
          telemetryAttributes: S.optional(__S(2688, __c84, 0)),
          operationDetails: S.optional(__S(1190, __c37, 6)),
          signalTypes: S.optional(__S(2560, __c80, 0)),
          sources: S.optional(__S(2560, __c80, 0)),
          metadata: S.optional(__S(1197, __c37, 13)),
          firstObservedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastObservedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          edges: S.optional(__S(1201, __c37, 17)),
        }),
      ).annotate({ identifier: "Node" });
    case 19:
      return S.Array(__S(1202, __c37, 18));
    case 20:
      return S.suspend(() =>
        S.Struct({ nodes: __S(1203, __c37, 19), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "GetContextGraphOutput" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2688, __c84, 0));
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDomainInput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ grantId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDomainAccessGrantForOrganizationInput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ domainId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDomainForOrganizationInput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ identifier: __S(960, __c30, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIntegrationInput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetIntelligenceConfigurationInput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountId: S.String,
          kmsKeyArn: S.optional(S.String),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetIntelligenceConfigurationOutput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ spaceId: S.String, dashboardId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetOmniDashboardInput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ spaceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSpaceInput" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.optional(S.String),
          domainId: S.optional(S.String),
          targetAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SpaceCredentialRequestContext" });
    case 1:
      return S.suspend(() =>
        S.Struct({ context: __S(1504, __c47, 0), credentialType: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSpaceCredentialsForOrganizationInput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accessKeyId: SensitiveString,
          secretAccessKey: SensitiveString,
          sessionToken: SensitiveString,
          expiration: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "AwsCredentials" });
    case 1:
      return S.suspend(() => S.Struct({ credentials: __S(1536, __c48, 0) })).annotate({
        identifier: "GetSpaceCredentialsForOrganizationOutput",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ actions: __S(2592, __c81, 0) })).annotate({
        identifier: "DataAccessTarget",
      });
    case 1:
      return S.Array(__S(1568, __c49, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          targetScopes: __S(1569, __c49, 1),
          durationSeconds: S.optional(S.Number),
          auditContext: S.optional(__S(2688, __c84, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetSpaceDataAccessInput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          queryId: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetTelemetryQueryResultsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ partialResultsDetected: S.optional(S.Boolean) })).annotate({
        identifier: "PartialResults",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          bytesScanned: S.optional(S.Number),
          percentComplete: S.optional(S.Number),
          recordsScanned: S.optional(S.Number),
          recordsMatched: S.optional(S.Number),
          partialResults: S.optional(__S(1601, __c50, 1)),
        }),
      ).annotate({ identifier: "QueryStatistics" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          rows: S.optional(__S(1216, __c38, 0)),
          nextToken: S.optional(S.String),
          statistics: S.optional(__S(1602, __c50, 2)),
        }),
      ).annotate({ identifier: "GetTelemetryQueryResultsResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetViewRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          spaceId: S.optional(S.String),
          principalId: S.optional(S.String),
          principalType: S.optional(S.String),
          permission: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAccessGrantsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          grantId: S.String,
          grantArn: S.String,
          name: S.optional(S.String),
          domainId: S.String,
          principal: __S(2626, __c82, 2),
          permission: S.String,
          grantType: S.String,
          spaceId: S.String,
        }),
      ).annotate({ identifier: "AccessGrantSummary" });
    case 2:
      return S.Array(__S(1665, __c52, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1666, __c52, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccessGrantsOutput" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAccessProfilesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          profileId: S.String,
          arn: S.String,
          name: S.String,
          description: S.optional(S.String),
          profileType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccessProfileSummary" });
    case 2:
      return S.Array(__S(1697, __c53, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1698, __c53, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAccessProfilesOutput" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          names: S.optional(__S(2592, __c81, 0)),
          namePrefix: S.optional(S.String),
          ids: S.optional(__S(2592, __c81, 0)),
          stateValue: S.optional(__S(2560, __c80, 0)),
          notificationsEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "AlertFilterCriteria" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          filterCriteria: S.optional(__S(1728, __c54, 0)),
          sortBy: S.optional(S.String),
          sortOrder: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAlertsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          alertId: S.optional(S.String),
          spaceId: S.optional(S.String),
          profileId: S.optional(S.String),
          notificationStatus: S.optional(S.String),
          state: __S(66, __c2, 2),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          alertArn: S.String,
        }),
      ).annotate({ identifier: "AlertSummary" });
    case 3:
      return S.Array(__S(1730, __c54, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ items: __S(1731, __c54, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAlertsOutput" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          principalId: S.optional(S.String),
          principalType: S.optional(S.String),
          permission: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListDomainAccessGrantsForOrganizationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          grantId: S.String,
          grantArn: S.String,
          name: S.optional(S.String),
          domainId: S.String,
          principal: __S(2626, __c82, 2),
          permission: S.String,
          grantType: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "OrganizationAccessGrantSummary" });
    case 2:
      return S.Array(__S(1761, __c55, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1762, __c55, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDomainAccessGrantsForOrganizationOutput" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDomainsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          domainArn: S.optional(S.String),
          name: S.optional(S.String),
          identityCenterInstanceArn: S.optional(S.String),
          region: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.String,
        }),
      ).annotate({ identifier: "DomainSummary" });
    case 2:
      return S.Array(__S(1793, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1794, __c56, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDomainsOutput" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          integrationType: S.optional(S.String),
          status: S.optional(S.String),
          name: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListIntegrationsInput" });
    case 1:
      return S.Array(__S(416, __c13, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: __S(1825, __c57, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListIntegrationsOutput" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          namePrefix: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListOmniDashboardsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dashboardId: S.String,
          arn: S.String,
          name: S.String,
          createdBy: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(2688, __c84, 0)),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "OmniDashboardSummary" });
    case 2:
      return S.Array(__S(1857, __c58, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(1858, __c58, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListOmniDashboardsOutput" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSpacesInput" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          name: S.String,
          spaceArn: S.String,
          domainArn: S.optional(S.String),
          region: S.String,
          ownerAccountId: S.String,
          status: S.String,
          statusReason: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "SpaceSummary" });
    case 1:
      return S.Array(__S(1920, __c60, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ items: __S(1921, __c60, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSpacesOutput" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSpacesForOrganizationInput" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataSetName: S.String,
          telemetryType: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTelemetryFieldsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          children: S.optional(
            S.suspend(() => __S(1986, __c62, 2)).annotate({ identifier: "FieldList" }),
          ),
        }),
      ).annotate({ identifier: "Field" });
    case 2:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<Field> => __S(1985, __c62, 1)).annotate({
          identifier: "Field",
        }),
      );
    case 3:
      return S.suspend(() =>
        S.Struct({ fields: __S(1986, __c62, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTelemetryFieldsResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), maxResults: S.optional(S.Number) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTelemetryQuerySessionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.String,
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          lastActivityAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          sessionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "SessionSummary" });
    case 2:
      return S.Array(__S(2017, __c63, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ sessions: __S(2018, __c63, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTelemetryQuerySessionsResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListViewsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          description: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ViewSummary" });
    case 2:
      return S.Array(__S(2049, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(2050, __c64, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListViewsResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          kmsKeyArn: S.optional(S.String),
          removeKmsKey: S.optional(S.Boolean),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutIntelligenceConfigurationInput" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          searchQuery: S.String,
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SearchPrincipalsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          principalId: S.String,
          principalType: S.String,
          displayName: S.String,
          userName: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "PrincipalSearchResult" });
    case 2:
      return S.Array(__S(2113, __c66, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ results: __S(2114, __c66, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchPrincipalsOutput" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ queryString: S.String, sessionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartTelemetryQueryRequest" });
    case 1:
      return S.suspend(() => S.Struct({ queryId: S.String, sessionId: S.String })).annotate({
        identifier: "StartTelemetryQueryResponse",
      });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sessionName: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartTelemetryQuerySessionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ sessionId: S.String })).annotate({
        identifier: "StartTelemetryQuerySessionResponse",
      });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ queryId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopTelemetryQueryRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ sessionId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopTelemetryQuerySessionRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          profileId: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAccessProfileInput" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          alertId: S.String,
          profileId: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          rule: S.optional(__S(101, __c3, 5)),
          notificationsEnabled: S.optional(S.Boolean),
          notificationRules: S.optional(__S(105, __c3, 9)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateAlertInput" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          name: S.optional(S.String),
          identityProviders: S.optional(__S(2560, __c80, 0)),
          identityProviderConfiguration: S.optional(__S(161, __c5, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDomainInput" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          name: S.optional(S.String),
          identityProviders: S.optional(__S(2560, __c80, 0)),
          identityProviderConfiguration: S.optional(__S(161, __c5, 1)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDomainForOrganizationInput" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: __S(960, __c30, 0),
          credential: S.optional(__S(451, __c14, 3)),
          integrationAttributes: S.optional(__S(2688, __c84, 0)),
          roleArn: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateIntegrationInput" });
    case 1:
      return S.suspend(() => S.Struct({ integration: S.optional(__S(416, __c13, 0)) })).annotate({
        identifier: "UpdateIntegrationOutput",
      });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          dashboardId: S.String,
          body: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateOmniDashboardInput" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          name: S.optional(S.String),
          agentCoreEvaluationRoleArn: S.optional(S.String),
          encryptionConfiguration: S.optional(__S(608, __c19, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSpaceInput" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          definition: S.optional(S.String),
          description: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateViewRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          domainId: S.String,
          spaceId: S.String,
          name: S.String,
          principal: __S(2626, __c82, 2),
          permission: S.String,
          scopedActions: S.optional(__S(2663, __c83, 7)),
          tags: S.optional(__S(2688, __c84, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAccessGrantInput" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "AccessGrantPrincipalAttribute",
      });
    case 1:
      return S.Array(__S(2624, __c82, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          principalType: S.String,
          principalId: S.optional(S.String),
          principalAttributes: S.optional(__S(2625, __c82, 1)),
        }),
      ).annotate({ identifier: "AccessGrantPrincipal" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ field: S.String, operator: S.String, values: __S(2592, __c81, 0) }),
      ).annotate({ identifier: "RowScope" });
    case 1:
      return S.Array(__S(2656, __c83, 0));
    case 2:
      return S.Array(__S(2657, __c83, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.String,
          resourceArns: S.optional(__S(2592, __c81, 0)),
          tags: S.optional(__S(2688, __c84, 0)),
          signalTypes: S.optional(__S(2560, __c80, 0)),
          rowScopeGroups: S.optional(__S(2658, __c83, 2)),
        }),
      ).annotate({ identifier: "ResourceScope" });
    case 4:
      return S.Array(__S(2659, __c83, 3));
    case 5:
      return S.Record(S.String, /*@__PURE__*/ __S(2592, __c81, 0).pipe(S.optional));
    case 6:
      return S.suspend(() =>
        S.Struct({
          actions: __S(2592, __c81, 0),
          resources: S.optional(__S(2660, __c83, 4)),
          contextConditions: S.optional(__S(2661, __c83, 5)),
        }),
      ).annotate({ identifier: "ScopedActions" });
    case 7:
      return S.Array(__S(2662, __c83, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          grantId: S.String,
          grantArn: S.String,
          name: S.optional(S.String),
          accountId: S.String,
          domainId: S.String,
          principal: __S(2626, __c82, 2),
          permission: S.String,
          grantType: S.String,
          createdBy: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          spaceId: S.String,
          scopedActions: S.optional(__S(2663, __c83, 7)),
        }),
      ).annotate({ identifier: "AccessGrant" });
    case 9:
      return S.suspend(() => S.Struct({ accessGrant: __S(2664, __c83, 8) })).annotate({
        identifier: "CreateAccessGrantOutput",
      });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          name: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(2688, __c84, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAccessProfileInput" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          profileId: S.String,
          spaceId: S.String,
          arn: S.String,
          name: S.String,
          description: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          assumeStatus: S.optional(S.String),
          profileType: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccessProfile" });
    case 1:
      return S.suspend(() => S.Struct({ accessProfile: __S(2752, __c86, 0) })).annotate({
        identifier: "CreateAccessProfileOutput",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
