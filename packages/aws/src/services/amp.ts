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
  sdkId: "amp",
  serviceShapeName: "AmazonPrometheusService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "aps" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-08-01");
const proto = /*@__PURE__*/ T.AwsProtocolsRestJson1();
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
              `https://aps-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://aps-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://aps.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://aps.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://aps.{R}.{D}","properties":{},"headers":{}}');

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
      resourceId: S.String,
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
      resourceId: S.String,
      resourceType: S.String,
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: S.String,
      resourceType: S.String,
      serviceCode: S.String,
      quotaCode: S.String,
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
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: S.String,
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(425, __c53, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type WorkspaceId = string;
export type AlertManagerDefinitionData = Uint8Array;
export type IdempotencyToken = string;
export interface CreateAlertManagerDefinitionRequest {
  workspaceId: string;
  data: Uint8Array;
  clientToken?: string;
}
export type AlertManagerDefinitionStatusCode = string;
export interface AlertManagerDefinitionStatus {
  statusCode: string;
  statusReason?: string;
}
export interface CreateAlertManagerDefinitionResponse {
  status: AlertManagerDefinitionStatus;
}
export type AnomalyDetectorAlias = string;
export type AnomalyDetectorEvaluationInterval = number;
export type AnomalyDetectorMissingDataAction =
  | { markAsAnomaly: boolean; skip?: never }
  | { markAsAnomaly?: never; skip: boolean };
export type RandomCutForestQuery = string;
export type IgnoreNearExpected =
  | { amount: number; ratio?: never }
  | { amount?: never; ratio: number };
export interface RandomCutForestConfiguration {
  query: string;
  shingleSize?: number;
  sampleSize?: number;
  ignoreNearExpectedFromAbove?: IgnoreNearExpected;
  ignoreNearExpectedFromBelow?: IgnoreNearExpected;
}
export type AnomalyDetectorConfiguration = { randomCutForest: RandomCutForestConfiguration };
export type PrometheusMetricLabelKey = string;
export type PrometheusMetricLabelValue = string;
export type PrometheusMetricLabelMap = { [key: string]: string | undefined };
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateAnomalyDetectorRequest {
  workspaceId: string;
  alias: string;
  evaluationIntervalInSeconds?: number;
  missingDataAction?: AnomalyDetectorMissingDataAction;
  configuration: AnomalyDetectorConfiguration;
  labels?: { [key: string]: string | undefined };
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type AnomalyDetectorId = string;
export type AnomalyDetectorArn = string;
export type AnomalyDetectorStatusCode =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "CREATION_FAILED"
  | "UPDATE_FAILED"
  | "DELETION_FAILED"
  | (string & {});
export interface AnomalyDetectorStatus {
  statusCode: AnomalyDetectorStatusCode;
  statusReason?: string;
}
export interface CreateAnomalyDetectorResponse {
  anomalyDetectorId: string;
  arn: string;
  status: AnomalyDetectorStatus;
  tags?: { [key: string]: string | undefined };
}
export type LogGroupArn = string;
export interface CreateLoggingConfigurationRequest {
  workspaceId: string;
  logGroupArn: string;
  clientToken?: string;
}
export type LoggingConfigurationStatusCode = string;
export interface LoggingConfigurationStatus {
  statusCode: string;
  statusReason?: string;
}
export interface CreateLoggingConfigurationResponse {
  status: LoggingConfigurationStatus;
}
export interface CloudWatchLogDestination {
  logGroupArn: string;
}
export interface LoggingFilter {
  qspThreshold: number;
}
export interface LoggingDestination {
  cloudWatchLogs: CloudWatchLogDestination;
  filters: LoggingFilter;
}
export type LoggingDestinations = LoggingDestination[];
export interface CreateQueryLoggingConfigurationRequest {
  workspaceId: string;
  destinations: LoggingDestination[];
  clientToken?: string;
}
export type QueryLoggingConfigurationStatusCode = string;
export interface QueryLoggingConfigurationStatus {
  statusCode: string;
  statusReason?: string;
}
export interface CreateQueryLoggingConfigurationResponse {
  status: QueryLoggingConfigurationStatus;
}
export type RuleGroupsNamespaceName = string;
export type RuleGroupsNamespaceData = Uint8Array;
export interface CreateRuleGroupsNamespaceRequest {
  workspaceId: string;
  name: string;
  data: Uint8Array;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type RuleGroupsNamespaceArn = string;
export type RuleGroupsNamespaceStatusCode = string;
export interface RuleGroupsNamespaceStatus {
  statusCode: string;
  statusReason?: string;
}
export interface CreateRuleGroupsNamespaceResponse {
  name: string;
  arn: string;
  status: RuleGroupsNamespaceStatus;
  tags?: { [key: string]: string | undefined };
}
export type ScraperAlias = string;
export type ScrapeConfiguration = { configurationBlob: Uint8Array };
export type ClusterArn = string;
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export type SubnetId = string;
export type SubnetIds = string[];
export interface EksConfiguration {
  clusterArn: string;
  securityGroupIds?: string[];
  subnetIds: string[];
}
export interface VpcConfiguration {
  securityGroupIds: string[];
  subnetIds: string[];
}
export type Source =
  | { eksConfiguration: EksConfiguration; vpcConfiguration?: never }
  | { eksConfiguration?: never; vpcConfiguration: VpcConfiguration };
export type WorkspaceArn = string;
export interface AmpConfiguration {
  workspaceArn: string;
}
export type CloudWatchDatasetArn = string;
export interface CloudWatchConfiguration {
  datasetArn: string;
}
export type Destination =
  | { ampConfiguration: AmpConfiguration; cloudWatchConfiguration?: never }
  | { ampConfiguration?: never; cloudWatchConfiguration: CloudWatchConfiguration };
export type IamRoleArn = string;
export interface RoleConfiguration {
  sourceRoleArn?: string;
  targetRoleArn?: string;
}
export type OpenSearchDomainArn = string;
export interface OpenSearchExporterConfiguration {
  domainArn: string;
}
export type ExporterConfiguration = { openSearchConfiguration: OpenSearchExporterConfiguration };
export type ExporterList = ExporterConfiguration[];
export interface CreateScraperRequest {
  alias?: string;
  scrapeConfiguration: ScrapeConfiguration;
  source: Source;
  destination: Destination;
  roleConfiguration?: RoleConfiguration;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  exporters?: ExporterConfiguration[];
}
export type ScraperId = string;
export type ScraperArn = string;
export type ScraperStatusCode = string;
export interface ScraperStatus {
  statusCode: string;
}
export interface CreateScraperResponse {
  scraperId: string;
  arn: string;
  status: ScraperStatus;
  tags?: { [key: string]: string | undefined };
}
export type WorkspaceAlias = string;
export type KmsKeyArn = string;
export interface CreateWorkspaceRequest {
  alias?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export type WorkspaceStatusCode = string;
export interface WorkspaceStatus {
  statusCode: string;
}
export interface CreateWorkspaceResponse {
  workspaceId: string;
  arn: string;
  status: WorkspaceStatus;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export interface DeleteAlertManagerDefinitionRequest {
  workspaceId: string;
  clientToken?: string;
}
export interface DeleteAlertManagerDefinitionResponse {}
export interface DeleteAnomalyDetectorRequest {
  workspaceId: string;
  anomalyDetectorId: string;
  clientToken?: string;
}
export interface DeleteAnomalyDetectorResponse {}
export interface DeleteLoggingConfigurationRequest {
  workspaceId: string;
  clientToken?: string;
}
export interface DeleteLoggingConfigurationResponse {}
export interface DeleteQueryLoggingConfigurationRequest {
  workspaceId: string;
  clientToken?: string;
}
export interface DeleteQueryLoggingConfigurationResponse {}
export interface DeleteResourcePolicyRequest {
  workspaceId: string;
  clientToken?: string;
  revisionId?: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeleteRuleGroupsNamespaceRequest {
  workspaceId: string;
  name: string;
  clientToken?: string;
}
export interface DeleteRuleGroupsNamespaceResponse {}
export interface DeleteScraperRequest {
  scraperId: string;
  clientToken?: string;
}
export interface DeleteScraperResponse {
  scraperId: string;
  status: ScraperStatus;
}
export interface DeleteScraperLoggingConfigurationRequest {
  scraperId: string;
  clientToken?: string;
}
export interface DeleteScraperLoggingConfigurationResponse {}
export interface DeleteWorkspaceRequest {
  workspaceId: string;
  clientToken?: string;
}
export interface DeleteWorkspaceResponse {}
export interface DescribeAlertManagerDefinitionRequest {
  workspaceId: string;
}
export interface AlertManagerDefinitionDescription {
  status: AlertManagerDefinitionStatus;
  data?: Uint8Array;
  createdAt: Date;
  modifiedAt: Date;
}
export interface DescribeAlertManagerDefinitionResponse {
  alertManagerDefinition: AlertManagerDefinitionDescription;
}
export interface DescribeAnomalyDetectorRequest {
  workspaceId: string;
  anomalyDetectorId: string;
}
export interface AnomalyDetectorDescription {
  arn: string;
  anomalyDetectorId: string;
  alias: string;
  evaluationIntervalInSeconds?: number;
  missingDataAction?: AnomalyDetectorMissingDataAction;
  configuration?: AnomalyDetectorConfiguration;
  labels?: { [key: string]: string | undefined };
  status: AnomalyDetectorStatus;
  createdAt: Date;
  modifiedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export interface DescribeAnomalyDetectorResponse {
  anomalyDetector: AnomalyDetectorDescription;
}
export interface DescribeLoggingConfigurationRequest {
  workspaceId: string;
}
export interface LoggingConfigurationMetadata {
  status: LoggingConfigurationStatus;
  workspace: string;
  logGroupArn: string;
  createdAt: Date;
  modifiedAt: Date;
}
export interface DescribeLoggingConfigurationResponse {
  loggingConfiguration: LoggingConfigurationMetadata;
}
export interface DescribeQueryLoggingConfigurationRequest {
  workspaceId: string;
}
export interface QueryLoggingConfigurationMetadata {
  status: QueryLoggingConfigurationStatus;
  workspace: string;
  destinations: LoggingDestination[];
  createdAt: Date;
  modifiedAt: Date;
}
export interface DescribeQueryLoggingConfigurationResponse {
  queryLoggingConfiguration: QueryLoggingConfigurationMetadata;
}
export interface DescribeResourcePolicyRequest {
  workspaceId: string;
}
export type WorkspacePolicyStatusCode = string;
export interface DescribeResourcePolicyResponse {
  policyDocument: string;
  policyStatus: string;
  revisionId: string;
}
export interface DescribeRuleGroupsNamespaceRequest {
  workspaceId: string;
  name: string;
}
export interface RuleGroupsNamespaceDescription {
  arn: string;
  name: string;
  status: RuleGroupsNamespaceStatus;
  data?: Uint8Array;
  createdAt: Date;
  modifiedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export interface DescribeRuleGroupsNamespaceResponse {
  ruleGroupsNamespace: RuleGroupsNamespaceDescription;
}
export interface DescribeScraperRequest {
  scraperId: string;
}
export type StatusReason = string;
export interface ScraperDescription {
  alias?: string;
  scraperId: string;
  arn: string;
  roleArn: string;
  status: ScraperStatus;
  createdAt: Date;
  lastModifiedAt: Date;
  tags?: { [key: string]: string | undefined };
  statusReason?: string;
  scrapeConfiguration: ScrapeConfiguration;
  source: Source;
  destination: Destination;
  roleConfiguration?: RoleConfiguration;
  exporters?: ExporterConfiguration[];
}
export interface DescribeScraperResponse {
  scraper: ScraperDescription;
}
export interface DescribeScraperLoggingConfigurationRequest {
  scraperId: string;
}
export type ScraperLoggingConfigurationStatusCode = string;
export interface ScraperLoggingConfigurationStatus {
  statusCode: string;
  statusReason?: string;
}
export type ScraperLoggingDestination = { cloudWatchLogs: CloudWatchLogDestination };
export type ScraperComponentType = string;
export type StringMap = { [key: string]: string | undefined };
export interface ComponentConfig {
  options?: { [key: string]: string | undefined };
}
export interface ScraperComponent {
  type: string;
  config?: ComponentConfig;
}
export type ScraperComponents = ScraperComponent[];
export interface DescribeScraperLoggingConfigurationResponse {
  status: ScraperLoggingConfigurationStatus;
  scraperId: string;
  loggingDestination: ScraperLoggingDestination;
  scraperComponents: ScraperComponent[];
  modifiedAt: Date;
}
export interface DescribeWorkspaceRequest {
  workspaceId: string;
}
export type Uri = string;
export interface WorkspaceDescription {
  workspaceId: string;
  alias?: string;
  arn: string;
  status: WorkspaceStatus;
  prometheusEndpoint?: string;
  createdAt: Date;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export interface DescribeWorkspaceResponse {
  workspace: WorkspaceDescription;
}
export interface DescribeWorkspaceConfigurationRequest {
  workspaceId: string;
}
export type WorkspaceConfigurationStatusCode = string;
export interface WorkspaceConfigurationStatus {
  statusCode: string;
  statusReason?: string;
}
export interface LimitsPerLabelSetEntry {
  maxSeries?: number;
}
export type LabelName = string;
export type LabelValue = string;
export type LabelSet = { [key: string]: string | undefined };
export interface LimitsPerLabelSet {
  limits: LimitsPerLabelSetEntry;
  labelSet: { [key: string]: string | undefined };
}
export type LimitsPerLabelSetList = LimitsPerLabelSet[];
export interface WorkspaceConfigurationDescription {
  status: WorkspaceConfigurationStatus;
  limitsPerLabelSet?: LimitsPerLabelSet[];
  retentionPeriodInDays?: number;
  outOfOrderTimeWindowInSeconds?: number;
  ruleQueryOffsetInSeconds?: number;
}
export interface DescribeWorkspaceConfigurationResponse {
  workspaceConfiguration: WorkspaceConfigurationDescription;
}
export interface GetDefaultScraperConfigurationRequest {}
export interface GetDefaultScraperConfigurationResponse {
  configuration: Uint8Array;
}
export type PaginationToken = string;
export interface ListAnomalyDetectorsRequest {
  workspaceId: string;
  alias?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface AnomalyDetectorSummary {
  arn: string;
  anomalyDetectorId: string;
  alias: string;
  status: AnomalyDetectorStatus;
  createdAt: Date;
  modifiedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export type AnomalyDetectorSummaryList = AnomalyDetectorSummary[];
export interface ListAnomalyDetectorsResponse {
  anomalyDetectors: AnomalyDetectorSummary[];
  nextToken?: string;
}
export interface ListRuleGroupsNamespacesRequest {
  workspaceId: string;
  name?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface RuleGroupsNamespaceSummary {
  arn: string;
  name: string;
  status: RuleGroupsNamespaceStatus;
  createdAt: Date;
  modifiedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export type RuleGroupsNamespaceSummaryList = RuleGroupsNamespaceSummary[];
export interface ListRuleGroupsNamespacesResponse {
  ruleGroupsNamespaces: RuleGroupsNamespaceSummary[];
  nextToken?: string;
}
export type FilterKey = string;
export type FilterValue = string;
export type FilterValues = string[];
export type ScraperFilters = { [key: string]: string[] | undefined };
export interface ListScrapersRequest {
  filters?: { [key: string]: string[] | undefined };
  nextToken?: string;
  maxResults?: number;
}
export interface ScraperSummary {
  alias?: string;
  scraperId: string;
  arn: string;
  roleArn: string;
  status: ScraperStatus;
  createdAt: Date;
  lastModifiedAt: Date;
  tags?: { [key: string]: string | undefined };
  statusReason?: string;
  source: Source;
  destination: Destination;
  roleConfiguration?: RoleConfiguration;
  exporters?: ExporterConfiguration[];
}
export type ScraperSummaryList = ScraperSummary[];
export interface ListScrapersResponse {
  scrapers: ScraperSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListWorkspacesRequest {
  nextToken?: string;
  alias?: string;
  maxResults?: number;
}
export interface WorkspaceSummary {
  workspaceId: string;
  alias?: string;
  arn: string;
  status: WorkspaceStatus;
  createdAt: Date;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export type WorkspaceSummaryList = WorkspaceSummary[];
export interface ListWorkspacesResponse {
  workspaces: WorkspaceSummary[];
  nextToken?: string;
}
export interface PutAlertManagerDefinitionRequest {
  workspaceId: string;
  data: Uint8Array;
  clientToken?: string;
}
export interface PutAlertManagerDefinitionResponse {
  status: AlertManagerDefinitionStatus;
}
export interface PutAnomalyDetectorRequest {
  workspaceId: string;
  anomalyDetectorId: string;
  evaluationIntervalInSeconds?: number;
  missingDataAction?: AnomalyDetectorMissingDataAction;
  configuration: AnomalyDetectorConfiguration;
  labels?: { [key: string]: string | undefined };
  clientToken?: string;
}
export interface PutAnomalyDetectorResponse {
  anomalyDetectorId: string;
  arn: string;
  status: AnomalyDetectorStatus;
  tags?: { [key: string]: string | undefined };
}
export interface PutResourcePolicyRequest {
  workspaceId: string;
  policyDocument: string;
  clientToken?: string;
  revisionId?: string;
}
export interface PutResourcePolicyResponse {
  policyStatus: string;
  revisionId: string;
}
export interface PutRuleGroupsNamespaceRequest {
  workspaceId: string;
  name: string;
  data: Uint8Array;
  clientToken?: string;
}
export interface PutRuleGroupsNamespaceResponse {
  name: string;
  arn: string;
  status: RuleGroupsNamespaceStatus;
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
export interface UpdateLoggingConfigurationRequest {
  workspaceId: string;
  logGroupArn: string;
  clientToken?: string;
}
export interface UpdateLoggingConfigurationResponse {
  status: LoggingConfigurationStatus;
}
export interface UpdateQueryLoggingConfigurationRequest {
  workspaceId: string;
  destinations: LoggingDestination[];
  clientToken?: string;
}
export interface UpdateQueryLoggingConfigurationResponse {
  status: QueryLoggingConfigurationStatus;
}
export interface UpdateScraperRequest {
  scraperId: string;
  alias?: string;
  scrapeConfiguration?: ScrapeConfiguration;
  destination?: Destination;
  roleConfiguration?: RoleConfiguration;
  clientToken?: string;
  exporters?: ExporterConfiguration[];
}
export interface UpdateScraperResponse {
  scraperId: string;
  arn: string;
  status: ScraperStatus;
  tags?: { [key: string]: string | undefined };
}
export interface UpdateScraperLoggingConfigurationRequest {
  scraperId: string;
  loggingDestination: ScraperLoggingDestination;
  scraperComponents?: ScraperComponent[];
}
export interface UpdateScraperLoggingConfigurationResponse {
  status: ScraperLoggingConfigurationStatus;
}
export interface UpdateWorkspaceAliasRequest {
  workspaceId: string;
  alias?: string;
  clientToken?: string;
}
export interface UpdateWorkspaceAliasResponse {}
export interface UpdateWorkspaceConfigurationRequest {
  workspaceId: string;
  clientToken?: string;
  limitsPerLabelSet?: LimitsPerLabelSet[];
  retentionPeriodInDays?: number;
  outOfOrderTimeWindowInSeconds?: number;
  ruleQueryOffsetInSeconds?: number;
}
export interface UpdateWorkspaceConfigurationResponse {
  status: WorkspaceConfigurationStatus;
}
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CreateAlertManagerDefinitionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `CreateAlertManagerDefinition` operation creates the alert manager definition in a workspace. If a workspace already has an alert manager definition, don't use this operation to update it. Instead, use `PutAlertManagerDefinition`.
 */
export const createAlertManagerDefinition: API.OperationMethod<
  CreateAlertManagerDefinitionRequest,
  CreateAlertManagerDefinitionResponse,
  CreateAlertManagerDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c54, 0) as any as S.Schema<CreateAlertManagerDefinitionRequest>,
  output: __S(448, __c56, 0) as any as S.Schema<CreateAlertManagerDefinitionResponse>,
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
  operationName: "CreateAlertManagerDefinition",
}));

export type CreateAnomalyDetectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an anomaly detector within a workspace using the Random Cut Forest algorithm for time-series analysis. The anomaly detector analyzes Amazon Managed Service for Prometheus metrics to identify unusual patterns and behaviors.
 */
export const createAnomalyDetector: API.OperationMethod<
  CreateAnomalyDetectorRequest,
  CreateAnomalyDetectorResponse,
  CreateAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(456, __c57, 0) as any as S.Schema<CreateAnomalyDetectorRequest>,
  output: __S(488, __c61, 0) as any as S.Schema<CreateAnomalyDetectorResponse>,
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
  operationName: "CreateAnomalyDetector",
}));

export type CreateLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * The `CreateLoggingConfiguration` operation creates rules and alerting logging configuration for the workspace. Use this operation to set the CloudWatch log group to which the logs will be published to.
 *
 * These logging configurations are only for rules and alerting logs.
 */
export const createLoggingConfiguration: API.OperationMethod<
  CreateLoggingConfigurationRequest,
  CreateLoggingConfigurationResponse,
  CreateLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c62, 0) as any as S.Schema<CreateLoggingConfigurationRequest>,
  output: __S(448, __c56, 0) as any as S.Schema<CreateLoggingConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateLoggingConfiguration",
}));

export type CreateQueryLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Creates a query logging configuration for the specified workspace. This operation enables logging of queries that exceed the specified QSP threshold.
 */
export const createQueryLoggingConfiguration: API.OperationMethod<
  CreateQueryLoggingConfigurationRequest,
  CreateQueryLoggingConfigurationResponse,
  CreateQueryLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateQueryLoggingConfigurationRequest>,
  output: __S(448, __c56, 0) as any as S.Schema<CreateQueryLoggingConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQueryLoggingConfiguration",
}));

export type CreateRuleGroupsNamespaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `CreateRuleGroupsNamespace` operation creates a rule groups namespace within a workspace. A rule groups namespace is associated with exactly one rules file. A workspace can have multiple rule groups namespaces.
 *
 * The combined length of a rule group namespace and a rule group name cannot exceed 721 UTF-8 bytes.
 *
 * Use this operation only to create new rule groups namespaces. To update an existing rule groups namespace, use `PutRuleGroupsNamespace`.
 */
export const createRuleGroupsNamespace: API.OperationMethod<
  CreateRuleGroupsNamespaceRequest,
  CreateRuleGroupsNamespaceResponse,
  CreateRuleGroupsNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(24, __c3, 0) as any as S.Schema<CreateRuleGroupsNamespaceRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<CreateRuleGroupsNamespaceResponse>,
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
  operationName: "CreateRuleGroupsNamespace",
}));

export type CreateScraperError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a scraper to collect metrics from Prometheus-compatible sources. The scraper sends the collected metrics to Amazon Managed Service for Prometheus workspaces or CloudWatch datasets. You can configure scrapers to collect metrics from Amazon EKS clusters, Amazon MSK clusters, or from VPC-based sources that support DNS-based service discovery. Scrapers are flexible. You can configure a scraper to control which metrics to collect, the frequency of collection, which transformations to apply to the metrics, and more.
 *
 * An IAM role will be created for you that Amazon Managed Service for Prometheus uses to access the metrics in your source. You must configure this role with a policy that allows it to scrape metrics from your source. For Amazon EKS sources, see Configuring your Amazon EKS cluster in the *Amazon Managed Service for Prometheus User Guide*.
 *
 * The `scrapeConfiguration` parameter contains the base-64 encoded YAML configuration for the scraper.
 *
 * When creating a scraper, the service creates a `Network Interface` in each **Availability Zone** that are passed into `CreateScraper` through subnets. These network interfaces are used to connect to your source within the VPC for scraping metrics.
 *
 * For more information about collectors, including what metrics are collected, and how to configure the scraper, see Using an Amazon Web Services managed collector in the *Amazon Managed Service for Prometheus User Guide*.
 */
export const createScraper: API.OperationMethod<
  CreateScraperRequest,
  CreateScraperResponse,
  CreateScraperError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<CreateScraperRequest>,
  output: __S(88, __c11, 0) as any as S.Schema<CreateScraperResponse>,
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
  operationName: "CreateScraper",
}));

export type CreateWorkspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Prometheus workspace. A workspace is a logical space dedicated to the storage and querying of Prometheus metrics. You can have one or more workspaces in each Region in your account.
 */
export const createWorkspace: API.OperationMethod<
  CreateWorkspaceRequest,
  CreateWorkspaceResponse,
  CreateWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<CreateWorkspaceRequest>,
  output: __S(97, __c12, 1) as any as S.Schema<CreateWorkspaceResponse>,
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
  operationName: "CreateWorkspace",
}));

export type DeleteAlertManagerDefinitionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the alert manager definition from a workspace.
 */
export const deleteAlertManagerDefinition: API.OperationMethod<
  DeleteAlertManagerDefinitionRequest,
  DeleteAlertManagerDefinitionResponse,
  DeleteAlertManagerDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(104, __c13, 0) as any as S.Schema<DeleteAlertManagerDefinitionRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<DeleteAlertManagerDefinitionResponse>,
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
  operationName: "DeleteAlertManagerDefinition",
}));

export type DeleteAnomalyDetectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes an anomaly detector from a workspace. This operation is idempotent.
 */
export const deleteAnomalyDetector: API.OperationMethod<
  DeleteAnomalyDetectorRequest,
  DeleteAnomalyDetectorResponse,
  DeleteAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(120, __c15, 0) as any as S.Schema<DeleteAnomalyDetectorRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<DeleteAnomalyDetectorResponse>,
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
  operationName: "DeleteAnomalyDetector",
}));

export type DeleteLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the rules and alerting logging configuration for a workspace.
 *
 * These logging configurations are only for rules and alerting logs.
 */
export const deleteLoggingConfiguration: API.OperationMethod<
  DeleteLoggingConfigurationRequest,
  DeleteLoggingConfigurationResponse,
  DeleteLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<DeleteLoggingConfigurationRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<DeleteLoggingConfigurationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLoggingConfiguration",
}));

export type DeleteQueryLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the query logging configuration for the specified workspace.
 */
export const deleteQueryLoggingConfiguration: API.OperationMethod<
  DeleteQueryLoggingConfigurationRequest,
  DeleteQueryLoggingConfigurationResponse,
  DeleteQueryLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(136, __c17, 0) as any as S.Schema<DeleteQueryLoggingConfigurationRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<DeleteQueryLoggingConfigurationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQueryLoggingConfiguration",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource-based policy attached to an Amazon Managed Service for Prometheus workspace.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
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
  operationName: "DeleteResourcePolicy",
}));

export type DeleteRuleGroupsNamespaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes one rule groups namespace and its associated rule groups definition.
 */
export const deleteRuleGroupsNamespace: API.OperationMethod<
  DeleteRuleGroupsNamespaceRequest,
  DeleteRuleGroupsNamespaceResponse,
  DeleteRuleGroupsNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(152, __c19, 0) as any as S.Schema<DeleteRuleGroupsNamespaceRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<DeleteRuleGroupsNamespaceResponse>,
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
  operationName: "DeleteRuleGroupsNamespace",
}));

export type DeleteScraperError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `DeleteScraper` operation deletes one scraper, and stops any metrics collection that the scraper performs.
 */
export const deleteScraper: API.OperationMethod<
  DeleteScraperRequest,
  DeleteScraperResponse,
  DeleteScraperError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<DeleteScraperRequest>,
  output: __S(161, __c20, 1) as any as S.Schema<DeleteScraperResponse>,
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
  operationName: "DeleteScraper",
}));

export type DeleteScraperLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the logging configuration for a Amazon Managed Service for Prometheus scraper.
 */
export const deleteScraperLoggingConfiguration: API.OperationMethod<
  DeleteScraperLoggingConfigurationRequest,
  DeleteScraperLoggingConfigurationResponse,
  DeleteScraperLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<DeleteScraperLoggingConfigurationRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<DeleteScraperLoggingConfigurationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScraperLoggingConfiguration",
}));

export type DeleteWorkspaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an existing workspace.
 *
 * When you delete a workspace, the data that has been ingested into it is not immediately deleted. It will be permanently deleted within one month.
 */
export const deleteWorkspace: API.OperationMethod<
  DeleteWorkspaceRequest,
  DeleteWorkspaceResponse,
  DeleteWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<DeleteWorkspaceRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<DeleteWorkspaceResponse>,
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
  operationName: "DeleteWorkspace",
}));

export type DescribeAlertManagerDefinitionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the full information about the alert manager definition for a workspace.
 */
export const describeAlertManagerDefinition: API.OperationMethod<
  DescribeAlertManagerDefinitionRequest,
  DescribeAlertManagerDefinitionResponse,
  DescribeAlertManagerDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<DescribeAlertManagerDefinitionRequest>,
  output: __S(186, __c23, 2) as any as S.Schema<DescribeAlertManagerDefinitionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAlertManagerDefinition",
}));

export type DescribeAnomalyDetectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific anomaly detector, including its status and configuration.
 */
export const describeAnomalyDetector: API.OperationMethod<
  DescribeAnomalyDetectorRequest,
  DescribeAnomalyDetectorResponse,
  DescribeAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<DescribeAnomalyDetectorRequest>,
  output: __S(194, __c24, 2) as any as S.Schema<DescribeAnomalyDetectorResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAnomalyDetector",
}));

export type DescribeLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns complete information about the current rules and alerting logging configuration of the workspace.
 *
 * These logging configurations are only for rules and alerting logs.
 */
export const describeLoggingConfiguration: API.OperationMethod<
  DescribeLoggingConfigurationRequest,
  DescribeLoggingConfigurationResponse,
  DescribeLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<DescribeLoggingConfigurationRequest>,
  output: __S(202, __c25, 2) as any as S.Schema<DescribeLoggingConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoggingConfiguration",
}));

export type DescribeQueryLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of the query logging configuration for the specified workspace.
 */
export const describeQueryLoggingConfiguration: API.OperationMethod<
  DescribeQueryLoggingConfigurationRequest,
  DescribeQueryLoggingConfigurationResponse,
  DescribeQueryLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<DescribeQueryLoggingConfigurationRequest>,
  output: __S(210, __c26, 2) as any as S.Schema<DescribeQueryLoggingConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQueryLoggingConfiguration",
}));

export type DescribeResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about the resource-based policy attached to an Amazon Managed Service for Prometheus workspace.
 */
export const describeResourcePolicy: API.OperationMethod<
  DescribeResourcePolicyRequest,
  DescribeResourcePolicyResponse,
  DescribeResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<DescribeResourcePolicyRequest>,
  output: __S(217, __c27, 1) as any as S.Schema<DescribeResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourcePolicy",
}));

export type DescribeRuleGroupsNamespaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns complete information about one rule groups namespace. To retrieve a list of rule groups namespaces, use `ListRuleGroupsNamespaces`.
 */
export const describeRuleGroupsNamespace: API.OperationMethod<
  DescribeRuleGroupsNamespaceRequest,
  DescribeRuleGroupsNamespaceResponse,
  DescribeRuleGroupsNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<DescribeRuleGroupsNamespaceRequest>,
  output: __S(226, __c28, 2) as any as S.Schema<DescribeRuleGroupsNamespaceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeRuleGroupsNamespace",
}));

export type DescribeScraperError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `DescribeScraper` operation displays information about an existing scraper.
 */
export const describeScraper: API.OperationMethod<
  DescribeScraperRequest,
  DescribeScraperResponse,
  DescribeScraperError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<DescribeScraperRequest>,
  output: __S(234, __c29, 2) as any as S.Schema<DescribeScraperResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScraper",
}));

export type DescribeScraperLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Describes the logging configuration for a Amazon Managed Service for Prometheus scraper.
 */
export const describeScraperLoggingConfiguration: API.OperationMethod<
  DescribeScraperLoggingConfigurationRequest,
  DescribeScraperLoggingConfigurationResponse,
  DescribeScraperLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c30, 0) as any as S.Schema<DescribeScraperLoggingConfigurationRequest>,
  output: __S(241, __c30, 1) as any as S.Schema<DescribeScraperLoggingConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScraperLoggingConfiguration",
}));

export type DescribeWorkspaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an existing workspace.
 */
export const describeWorkspace: API.OperationMethod<
  DescribeWorkspaceRequest,
  DescribeWorkspaceResponse,
  DescribeWorkspaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c32, 0) as any as S.Schema<DescribeWorkspaceRequest>,
  output: __S(258, __c32, 2) as any as S.Schema<DescribeWorkspaceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspace",
}));

export type DescribeWorkspaceConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to return information about the configuration of a workspace. The configuration details returned include workspace configuration status, label set limits, and retention period.
 */
export const describeWorkspaceConfiguration: API.OperationMethod<
  DescribeWorkspaceConfigurationRequest,
  DescribeWorkspaceConfigurationResponse,
  DescribeWorkspaceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(264, __c33, 0) as any as S.Schema<DescribeWorkspaceConfigurationRequest>,
  output: __S(266, __c33, 2) as any as S.Schema<DescribeWorkspaceConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeWorkspaceConfiguration",
}));

export type GetDefaultScraperConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * The `GetDefaultScraperConfiguration` operation returns the default scraper configuration used when Amazon EKS creates a scraper for you.
 */
export const getDefaultScraperConfiguration: API.OperationMethod<
  GetDefaultScraperConfigurationRequest,
  GetDefaultScraperConfigurationResponse,
  GetDefaultScraperConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(280, __c35, 0) as any as S.Schema<GetDefaultScraperConfigurationRequest>,
  output: __S(281, __c35, 1) as any as S.Schema<GetDefaultScraperConfigurationResponse>,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDefaultScraperConfiguration",
}));

export type ListAnomalyDetectorsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of anomaly detectors for a workspace with optional filtering by alias.
 */
export const listAnomalyDetectors: API.PaginatedOperationMethod<
  ListAnomalyDetectorsRequest,
  ListAnomalyDetectorsResponse,
  ListAnomalyDetectorsError,
  Credentials | HttpClient.HttpClient,
  AnomalyDetectorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(288, __c36, 0) as any as S.Schema<ListAnomalyDetectorsRequest>,
  output: __S(291, __c36, 3) as any as S.Schema<ListAnomalyDetectorsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAnomalyDetectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "anomalyDetectors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRuleGroupsNamespacesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of rule groups namespaces in a workspace.
 */
export const listRuleGroupsNamespaces: API.PaginatedOperationMethod<
  ListRuleGroupsNamespacesRequest,
  ListRuleGroupsNamespacesResponse,
  ListRuleGroupsNamespacesError,
  Credentials | HttpClient.HttpClient,
  RuleGroupsNamespaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(296, __c37, 0) as any as S.Schema<ListRuleGroupsNamespacesRequest>,
  output: __S(299, __c37, 3) as any as S.Schema<ListRuleGroupsNamespacesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRuleGroupsNamespaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ruleGroupsNamespaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListScrapersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `ListScrapers` operation lists all of the scrapers in your account. This includes scrapers being created or deleted. You can optionally filter the returned list.
 */
export const listScrapers: API.PaginatedOperationMethod<
  ListScrapersRequest,
  ListScrapersResponse,
  ListScrapersError,
  Credentials | HttpClient.HttpClient,
  ScraperSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(305, __c38, 1) as any as S.Schema<ListScrapersRequest>,
  output: __S(308, __c38, 4) as any as S.Schema<ListScrapersResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScrapers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scrapers",
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
 * The `ListTagsForResource` operation returns the tags that are associated with an Amazon Managed Service for Prometheus resource. Currently, the only resources that can be tagged are scrapers, workspaces, and rule groups namespaces.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(312, __c39, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(313, __c39, 1) as any as S.Schema<ListTagsForResourceResponse>,
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

export type ListWorkspacesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the Amazon Managed Service for Prometheus workspaces in your account. This includes workspaces being created or deleted.
 */
export const listWorkspaces: API.PaginatedOperationMethod<
  ListWorkspacesRequest,
  ListWorkspacesResponse,
  ListWorkspacesError,
  Credentials | HttpClient.HttpClient,
  WorkspaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(320, __c40, 0) as any as S.Schema<ListWorkspacesRequest>,
  output: __S(323, __c40, 3) as any as S.Schema<ListWorkspacesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListWorkspaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workspaces",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutAlertManagerDefinitionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing alert manager definition in a workspace. If the workspace does not already have an alert manager definition, don't use this operation to create it. Instead, use `CreateAlertManagerDefinition`.
 */
export const putAlertManagerDefinition: API.OperationMethod<
  PutAlertManagerDefinitionRequest,
  PutAlertManagerDefinitionResponse,
  PutAlertManagerDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(328, __c41, 0) as any as S.Schema<PutAlertManagerDefinitionRequest>,
  output: __S(448, __c56, 0) as any as S.Schema<PutAlertManagerDefinitionResponse>,
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
  operationName: "PutAlertManagerDefinition",
}));

export type PutAnomalyDetectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * When you call `PutAnomalyDetector`, the operation creates a new anomaly detector if one doesn't exist, or updates an existing one. Each call to this operation triggers a complete retraining of the detector, which includes querying the minimum required samples and backfilling the detector with historical data. This process occurs regardless of whether you're making a minor change like updating the evaluation interval or making more substantial modifications. The operation serves as the single method for creating, updating, and retraining anomaly detectors.
 */
export const putAnomalyDetector: API.OperationMethod<
  PutAnomalyDetectorRequest,
  PutAnomalyDetectorResponse,
  PutAnomalyDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c42, 0) as any as S.Schema<PutAnomalyDetectorRequest>,
  output: __S(488, __c61, 0) as any as S.Schema<PutAnomalyDetectorResponse>,
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
  operationName: "PutAnomalyDetector",
}));

export type PutResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a resource-based policy for an Amazon Managed Service for Prometheus workspace. Use resource-based policies to grant permissions to other AWS accounts or services to access your workspace.
 *
 * Only Prometheus-compatible APIs can be used for workspace sharing. You can add non-Prometheus-compatible APIs to the policy, but they will be ignored. For more information, see Prometheus-compatible APIs in the *Amazon Managed Service for Prometheus User Guide*.
 *
 * If your workspace uses customer-managed KMS keys for encryption, you must grant the principals in your resource-based policy access to those KMS keys. You can do this by creating KMS grants. For more information, see CreateGrant in the *AWS Key Management Service API Reference* and Encryption at rest in the *Amazon Managed Service for Prometheus User Guide*.
 *
 * For more information about working with IAM, see Using Amazon Managed Service for Prometheus with IAM in the *Amazon Managed Service for Prometheus User Guide*.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(344, __c43, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(345, __c43, 1) as any as S.Schema<PutResourcePolicyResponse>,
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
  operationName: "PutResourcePolicy",
}));

export type PutRuleGroupsNamespaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing rule groups namespace within a workspace. A rule groups namespace is associated with exactly one rules file. A workspace can have multiple rule groups namespaces.
 *
 * The combined length of a rule group namespace and a rule group name cannot exceed 721 UTF-8 bytes.
 *
 * Use this operation only to update existing rule groups namespaces. To create a new rule groups namespace, use `CreateRuleGroupsNamespace`.
 *
 * You can't use this operation to add tags to an existing rule groups namespace. Instead, use `TagResource`.
 */
export const putRuleGroupsNamespace: API.OperationMethod<
  PutRuleGroupsNamespaceRequest,
  PutRuleGroupsNamespaceResponse,
  PutRuleGroupsNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c44, 0) as any as S.Schema<PutRuleGroupsNamespaceRequest>,
  output: __S(32, __c4, 0) as any as S.Schema<PutRuleGroupsNamespaceResponse>,
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
  operationName: "PutRuleGroupsNamespace",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * The `TagResource` operation associates tags with an Amazon Managed Service for Prometheus resource. The only resources that can be tagged are rule groups namespaces, scrapers, and workspaces.
 *
 * If you specify a new tag key for the resource, this tag is appended to the list of tags associated with the resource. If you specify a tag key that is already associated with the resource, the new tag value that you specify replaces the previous value for that tag. To remove a tag, use `UntagResource`.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(360, __c45, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
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
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified tags from an Amazon Managed Service for Prometheus resource. The only resources that can be tagged are rule groups namespaces, scrapers, and workspaces.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c46, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the log group ARN or the workspace ID of the current rules and alerting logging configuration.
 *
 * These logging configurations are only for rules and alerting logs.
 */
export const updateLoggingConfiguration: API.OperationMethod<
  UpdateLoggingConfigurationRequest,
  UpdateLoggingConfigurationResponse,
  UpdateLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(376, __c47, 0) as any as S.Schema<UpdateLoggingConfigurationRequest>,
  output: __S(448, __c56, 0) as any as S.Schema<UpdateLoggingConfigurationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateLoggingConfiguration",
}));

export type UpdateQueryLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the query logging configuration for the specified workspace.
 */
export const updateQueryLoggingConfiguration: API.OperationMethod<
  UpdateQueryLoggingConfigurationRequest,
  UpdateQueryLoggingConfigurationResponse,
  UpdateQueryLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c48, 0) as any as S.Schema<UpdateQueryLoggingConfigurationRequest>,
  output: __S(448, __c56, 0) as any as S.Schema<UpdateQueryLoggingConfigurationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQueryLoggingConfiguration",
}));

export type UpdateScraperError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing scraper.
 *
 * You can't use this function to update the source from which the scraper is collecting metrics. To change the source, delete the scraper and create a new one.
 */
export const updateScraper: API.OperationMethod<
  UpdateScraperRequest,
  UpdateScraperResponse,
  UpdateScraperError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(392, __c49, 0) as any as S.Schema<UpdateScraperRequest>,
  output: __S(88, __c11, 0) as any as S.Schema<UpdateScraperResponse>,
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
  operationName: "UpdateScraper",
}));

export type UpdateScraperLoggingConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the logging configuration for a Amazon Managed Service for Prometheus scraper.
 */
export const updateScraperLoggingConfiguration: API.OperationMethod<
  UpdateScraperLoggingConfigurationRequest,
  UpdateScraperLoggingConfigurationResponse,
  UpdateScraperLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c50, 0) as any as S.Schema<UpdateScraperLoggingConfigurationRequest>,
  output: __S(448, __c56, 0) as any as S.Schema<UpdateScraperLoggingConfigurationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateScraperLoggingConfiguration",
}));

export type UpdateWorkspaceAliasError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the alias of an existing workspace.
 */
export const updateWorkspaceAlias: API.OperationMethod<
  UpdateWorkspaceAliasRequest,
  UpdateWorkspaceAliasResponse,
  UpdateWorkspaceAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(408, __c51, 0) as any as S.Schema<UpdateWorkspaceAliasRequest>,
  output: __S(112, __c14, 0) as any as S.Schema<UpdateWorkspaceAliasResponse>,
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
  operationName: "UpdateWorkspaceAlias",
}));

export type UpdateWorkspaceConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Use this operation to create or update the label sets, label set limits, and retention period of a workspace.
 *
 * You must specify at least one of `limitsPerLabelSet` or `retentionPeriodInDays` for the request to be valid.
 */
export const updateWorkspaceConfiguration: API.OperationMethod<
  UpdateWorkspaceConfigurationRequest,
  UpdateWorkspaceConfigurationResponse,
  UpdateWorkspaceConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c52, 0) as any as S.Schema<UpdateWorkspaceConfigurationRequest>,
  output: __S(448, __c56, 0) as any as S.Schema<UpdateWorkspaceConfigurationResponse>,
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
  operationName: "UpdateWorkspaceConfiguration",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          destinations: __S(18, __c2, 2),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/logging/query" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateQueryLoggingConfigurationRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ logGroupArn: S.String })).annotate({
        identifier: "CloudWatchLogDestination",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ qspThreshold: S.Number })).annotate({
        identifier: "LoggingFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ cloudWatchLogs: __S(8, __c1, 0), filters: __S(16, __c2, 0) }),
      ).annotate({ identifier: "LoggingDestination" });
    case 2:
      return S.Array(__S(17, __c2, 1));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          name: S.String,
          data: T.Blob,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(464, __c58, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/rulegroupsnamespaces" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRuleGroupsNamespaceRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          status: __S(440, __c55, 0),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "CreateRuleGroupsNamespaceResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          alias: S.optional(S.String),
          scrapeConfiguration: __S(80, __c10, 0),
          source: __S(58, __c7, 2),
          destination: __S(74, __c9, 2),
          roleConfiguration: S.optional(__S(75, __c9, 3)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(464, __c58, 0)),
          exporters: S.optional(__S(78, __c9, 6)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/scrapers" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateScraperRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ statusCode: S.String })).annotate({
        identifier: "ScraperStatus",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clusterArn: S.String,
          securityGroupIds: S.optional(__S(64, __c8, 0)),
          subnetIds: __S(64, __c8, 0),
        }),
      ).annotate({ identifier: "EksConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({ securityGroupIds: __S(64, __c8, 0), subnetIds: __S(64, __c8, 0) }),
      ).annotate({ identifier: "VpcConfiguration" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ eksConfiguration: __S(56, __c7, 0) }),
        /*@__PURE__*/ S.Struct({ vpcConfiguration: __S(57, __c7, 1) }),
      ]);
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ workspaceArn: S.String })).annotate({
        identifier: "AmpConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ datasetArn: S.String })).annotate({
        identifier: "CloudWatchConfiguration",
      });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ ampConfiguration: __S(72, __c9, 0) }),
        /*@__PURE__*/ S.Struct({ cloudWatchConfiguration: __S(73, __c9, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({ sourceRoleArn: S.optional(S.String), targetRoleArn: S.optional(S.String) }),
      ).annotate({ identifier: "RoleConfiguration" });
    case 4:
      return S.suspend(() => S.Struct({ domainArn: S.String })).annotate({
        identifier: "OpenSearchExporterConfiguration",
      });
    case 5:
      return S.Union([/*@__PURE__*/ S.Struct({ openSearchConfiguration: __S(76, __c9, 4) })]);
    case 6:
      return S.Array(__S(77, __c9, 5));
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ configurationBlob: T.Blob })]);
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scraperId: S.String,
          arn: S.String,
          status: __S(48, __c6, 0),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "CreateScraperResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          alias: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(464, __c58, 0)),
          kmsKeyArn: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/workspaces" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateWorkspaceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String,
          arn: S.String,
          status: __S(48, __c6, 0),
          tags: S.optional(__S(464, __c58, 0)),
          kmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateWorkspaceResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}/alertmanager/definition" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAlertManagerDefinitionRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "DeleteAlertManagerDefinitionResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          anomalyDetectorId: S.String.pipe(T.HttpLabel("anomalyDetectorId")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/workspaces/{workspaceId}/anomalydetectors/{anomalyDetectorId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAnomalyDetectorRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}/logging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteLoggingConfigurationRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}/logging/query" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteQueryLoggingConfigurationRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
          revisionId: S.optional(S.String).pipe(T.HttpQuery("revisionId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          name: S.String.pipe(T.HttpLabel("name")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/workspaces/{workspaceId}/rulegroupsnamespaces/{name}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRuleGroupsNamespaceRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scraperId: S.String.pipe(T.HttpLabel("scraperId")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/scrapers/{scraperId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteScraperRequest" });
    case 1:
      return S.suspend(() => S.Struct({ scraperId: S.String, status: __S(48, __c6, 0) })).annotate({
        identifier: "DeleteScraperResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scraperId: S.String.pipe(T.HttpLabel("scraperId")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/scrapers/{scraperId}/logging-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteScraperLoggingConfigurationRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          clientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/workspaces/{workspaceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteWorkspaceRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/alertmanager/definition" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAlertManagerDefinitionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: __S(440, __c55, 0),
          data: S.optional(T.Blob),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "AlertManagerDefinitionDescription" });
    case 2:
      return S.suspend(() => S.Struct({ alertManagerDefinition: __S(185, __c23, 1) })).annotate({
        identifier: "DescribeAlertManagerDefinitionResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          anomalyDetectorId: S.String.pipe(T.HttpLabel("anomalyDetectorId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/workspaces/{workspaceId}/anomalydetectors/{anomalyDetectorId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAnomalyDetectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          anomalyDetectorId: S.String,
          alias: S.String,
          evaluationIntervalInSeconds: S.optional(S.Number),
          missingDataAction: S.optional(__S(480, __c60, 0)),
          configuration: S.optional(__S(483, __c60, 3)),
          labels: S.optional(__S(464, __c58, 0)),
          status: __S(472, __c59, 0),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "AnomalyDetectorDescription" });
    case 2:
      return S.suspend(() => S.Struct({ anomalyDetector: __S(193, __c24, 1) })).annotate({
        identifier: "DescribeAnomalyDetectorResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/logging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeLoggingConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: __S(440, __c55, 0),
          workspace: S.String,
          logGroupArn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "LoggingConfigurationMetadata" });
    case 2:
      return S.suspend(() => S.Struct({ loggingConfiguration: __S(201, __c25, 1) })).annotate({
        identifier: "DescribeLoggingConfigurationResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/logging/query" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeQueryLoggingConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: __S(440, __c55, 0),
          workspace: S.String,
          destinations: __S(18, __c2, 2),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "QueryLoggingConfigurationMetadata" });
    case 2:
      return S.suspend(() => S.Struct({ queryLoggingConfiguration: __S(209, __c26, 1) })).annotate({
        identifier: "DescribeQueryLoggingConfigurationResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeResourcePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ policyDocument: S.String, policyStatus: S.String, revisionId: S.String }),
      ).annotate({ identifier: "DescribeResourcePolicyResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          name: S.String.pipe(T.HttpLabel("name")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/rulegroupsnamespaces/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeRuleGroupsNamespaceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          status: __S(440, __c55, 0),
          data: S.optional(T.Blob),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "RuleGroupsNamespaceDescription" });
    case 2:
      return S.suspend(() => S.Struct({ ruleGroupsNamespace: __S(225, __c28, 1) })).annotate({
        identifier: "DescribeRuleGroupsNamespaceResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scraperId: S.String.pipe(T.HttpLabel("scraperId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/scrapers/{scraperId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeScraperRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          alias: S.optional(S.String),
          scraperId: S.String,
          arn: S.String,
          roleArn: S.String,
          status: __S(48, __c6, 0),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(464, __c58, 0)),
          statusReason: S.optional(S.String),
          scrapeConfiguration: __S(80, __c10, 0),
          source: __S(58, __c7, 2),
          destination: __S(74, __c9, 2),
          roleConfiguration: S.optional(__S(75, __c9, 3)),
          exporters: S.optional(__S(78, __c9, 6)),
        }),
      ).annotate({ identifier: "ScraperDescription" });
    case 2:
      return S.suspend(() => S.Struct({ scraper: __S(233, __c29, 1) })).annotate({
        identifier: "DescribeScraperResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scraperId: S.String.pipe(T.HttpLabel("scraperId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/scrapers/{scraperId}/logging-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeScraperLoggingConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: __S(440, __c55, 0),
          scraperId: S.String,
          loggingDestination: __S(248, __c31, 0),
          scraperComponents: __S(251, __c31, 3),
          modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "DescribeScraperLoggingConfigurationResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ cloudWatchLogs: __S(8, __c1, 0) })]);
    case 1:
      return S.suspend(() => S.Struct({ options: S.optional(__S(464, __c58, 0)) })).annotate({
        identifier: "ComponentConfig",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ type: S.String, config: S.optional(__S(249, __c31, 1)) }),
      ).annotate({ identifier: "ScraperComponent" });
    case 3:
      return S.Array(__S(250, __c31, 2));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeWorkspaceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String,
          alias: S.optional(S.String),
          arn: S.String,
          status: __S(48, __c6, 0),
          prometheusEndpoint: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(464, __c58, 0)),
          kmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkspaceDescription" });
    case 2:
      return S.suspend(() => S.Struct({ workspace: __S(257, __c32, 1) })).annotate({
        identifier: "DescribeWorkspaceResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workspaceId: S.String.pipe(T.HttpLabel("workspaceId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeWorkspaceConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          status: __S(440, __c55, 0),
          limitsPerLabelSet: S.optional(__S(274, __c34, 2)),
          retentionPeriodInDays: S.optional(S.Number),
          outOfOrderTimeWindowInSeconds: S.optional(S.Number),
          ruleQueryOffsetInSeconds: S.optional(S.Number),
        }),
      ).annotate({ identifier: "WorkspaceConfigurationDescription" });
    case 2:
      return S.suspend(() => S.Struct({ workspaceConfiguration: __S(265, __c33, 1) })).annotate({
        identifier: "DescribeWorkspaceConfigurationResponse",
      });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ maxSeries: S.optional(S.Number) })).annotate({
        identifier: "LimitsPerLabelSetEntry",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ limits: __S(272, __c34, 0), labelSet: __S(464, __c58, 0) }),
      ).annotate({ identifier: "LimitsPerLabelSet" });
    case 2:
      return S.Array(__S(273, __c34, 1));
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/scraperconfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDefaultScraperConfigurationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ configuration: T.Blob })).annotate({
        identifier: "GetDefaultScraperConfigurationResponse",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          alias: S.optional(S.String).pipe(T.HttpQuery("alias")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/anomalydetectors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAnomalyDetectorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          anomalyDetectorId: S.String,
          alias: S.String,
          status: __S(472, __c59, 0),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "AnomalyDetectorSummary" });
    case 2:
      return S.Array(__S(289, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ anomalyDetectors: __S(290, __c36, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAnomalyDetectorsResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          name: S.optional(S.String).pipe(T.HttpQuery("name")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/workspaces/{workspaceId}/rulegroupsnamespaces" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRuleGroupsNamespacesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          status: __S(440, __c55, 0),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "RuleGroupsNamespaceSummary" });
    case 2:
      return S.Array(__S(297, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ ruleGroupsNamespaces: __S(298, __c37, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRuleGroupsNamespacesResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(64, __c8, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(304, __c38, 0)).pipe(T.HttpQueryParams()),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/scrapers" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListScrapersRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          alias: S.optional(S.String),
          scraperId: S.String,
          arn: S.String,
          roleArn: S.String,
          status: __S(48, __c6, 0),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(464, __c58, 0)),
          statusReason: S.optional(S.String),
          source: __S(58, __c7, 2),
          destination: __S(74, __c9, 2),
          roleConfiguration: S.optional(__S(75, __c9, 3)),
          exporters: S.optional(__S(78, __c9, 6)),
        }),
      ).annotate({ identifier: "ScraperSummary" });
    case 3:
      return S.Array(__S(306, __c38, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ scrapers: __S(307, __c38, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListScrapersResponse" });
  }
}
function __c39(j: number): any {
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
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(464, __c58, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          alias: S.optional(S.String).pipe(T.HttpQuery("alias")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/workspaces" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListWorkspacesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String,
          alias: S.optional(S.String),
          arn: S.String,
          status: __S(48, __c6, 0),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(464, __c58, 0)),
          kmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "WorkspaceSummary" });
    case 2:
      return S.Array(__S(321, __c40, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ workspaces: __S(322, __c40, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListWorkspacesResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          data: T.Blob,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}/alertmanager/definition" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAlertManagerDefinitionRequest" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          anomalyDetectorId: S.String.pipe(T.HttpLabel("anomalyDetectorId")),
          evaluationIntervalInSeconds: S.optional(S.Number),
          missingDataAction: S.optional(__S(480, __c60, 0)),
          configuration: __S(483, __c60, 3),
          labels: S.optional(__S(464, __c58, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/workspaces/{workspaceId}/anomalydetectors/{anomalyDetectorId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutAnomalyDetectorRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          policyDocument: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          revisionId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ policyStatus: S.String, revisionId: S.String })).annotate({
        identifier: "PutResourcePolicyResponse",
      });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          name: S.String.pipe(T.HttpLabel("name")),
          data: T.Blob,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}/rulegroupsnamespaces/{name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutRuleGroupsNamespaceRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(464, __c58, 0),
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
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(64, __c8, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          logGroupArn: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}/logging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateLoggingConfigurationRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          destinations: __S(18, __c2, 2),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/workspaces/{workspaceId}/logging/query" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateQueryLoggingConfigurationRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scraperId: S.String.pipe(T.HttpLabel("scraperId")),
          alias: S.optional(S.String),
          scrapeConfiguration: S.optional(__S(80, __c10, 0)),
          destination: S.optional(__S(74, __c9, 2)),
          roleConfiguration: S.optional(__S(75, __c9, 3)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          exporters: S.optional(__S(78, __c9, 6)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/scrapers/{scraperId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateScraperRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          scraperId: S.String.pipe(T.HttpLabel("scraperId")),
          loggingDestination: __S(248, __c31, 0),
          scraperComponents: S.optional(__S(251, __c31, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/scrapers/{scraperId}/logging-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateScraperLoggingConfigurationRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          alias: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/alias" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWorkspaceAliasRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          limitsPerLabelSet: S.optional(__S(274, __c34, 2)),
          retentionPeriodInDays: S.optional(S.Number),
          outOfOrderTimeWindowInSeconds: S.optional(S.Number),
          ruleQueryOffsetInSeconds: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/workspaces/{workspaceId}/configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateWorkspaceConfigurationRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(424, __c53, 0));
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          data: T.Blob,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/alertmanager/definition" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAlertManagerDefinitionRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ statusCode: S.String, statusReason: S.optional(S.String) }),
      ).annotate({ identifier: "AlertManagerDefinitionStatus" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ status: __S(440, __c55, 0) })).annotate({
        identifier: "CreateAlertManagerDefinitionResponse",
      });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          alias: S.String,
          evaluationIntervalInSeconds: S.optional(S.Number),
          missingDataAction: S.optional(__S(480, __c60, 0)),
          configuration: __S(483, __c60, 3),
          labels: S.optional(__S(464, __c58, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(464, __c58, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/anomalydetectors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAnomalyDetectorRequest" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ statusCode: S.String, statusReason: S.optional(S.String) }),
      ).annotate({ identifier: "AnomalyDetectorStatus" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ markAsAnomaly: S.Boolean }),
        /*@__PURE__*/ S.Struct({ skip: S.Boolean }),
      ]);
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ amount: S.Number }),
        /*@__PURE__*/ S.Struct({ ratio: S.Number }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          query: S.String,
          shingleSize: S.optional(S.Number),
          sampleSize: S.optional(S.Number),
          ignoreNearExpectedFromAbove: S.optional(__S(481, __c60, 1)),
          ignoreNearExpectedFromBelow: S.optional(__S(481, __c60, 1)),
        }),
      ).annotate({ identifier: "RandomCutForestConfiguration" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ randomCutForest: __S(482, __c60, 2) })]);
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          anomalyDetectorId: S.String,
          arn: S.String,
          status: __S(472, __c59, 0),
          tags: S.optional(__S(464, __c58, 0)),
        }),
      ).annotate({ identifier: "CreateAnomalyDetectorResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workspaceId: S.String.pipe(T.HttpLabel("workspaceId")),
          logGroupArn: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/workspaces/{workspaceId}/logging" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateLoggingConfigurationRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
