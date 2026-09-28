import type * as HttpClient from "effect/unstable/http/HttpClient";
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
  sdkId: "amp",
  target: "AmazonPrometheusService",
  version: "2020-08-01",
  sigv4: "aps",
  protocol: restJson1Protocol,
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
                `https://aps-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://aps-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://aps.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://aps.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    readonly resourceId: string;
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
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
    readonly serviceCode: string;
    readonly quotaCode: string;
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
    readonly reason: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
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
export type AnomalyDetectorConfiguration = {
  randomCutForest: RandomCutForestConfiguration;
};
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
  | {
      ampConfiguration?: never;
      cloudWatchConfiguration: CloudWatchConfiguration;
    };
export type IamRoleArn = string;
export interface RoleConfiguration {
  sourceRoleArn?: string;
  targetRoleArn?: string;
}
export type OpenSearchDomainArn = string;
export interface OpenSearchExporterConfiguration {
  domainArn: string;
}
export type ExporterConfiguration = {
  openSearchConfiguration: OpenSearchExporterConfiguration;
};
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
export type ScraperLoggingDestination = {
  cloudWatchLogs: CloudWatchLogDestination;
};
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
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/alertmanager/definition",
    input: { workspaceId: 0, data: 0, clientToken: D.m({ idempotency: true }) },
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
  operationName: "CreateAlertManagerDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/anomalydetectors",
    input: {
      workspaceId: 0,
      alias: 0,
      evaluationIntervalInSeconds: 0,
      missingDataAction: i_AnomalyDetectorMissingDataAction,
      configuration: i_AnomalyDetectorConfiguration,
      labels: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
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
  operationName: "CreateAnomalyDetector",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/logging",
    input: {
      workspaceId: 0,
      logGroupArn: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/logging/query",
    input: {
      workspaceId: 0,
      destinations: D.list(i_LoggingDestination),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/rulegroupsnamespaces",
    input: {
      workspaceId: 0,
      name: 0,
      data: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
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
  operationName: "CreateRuleGroupsNamespace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /scrapers",
    input: {
      alias: 0,
      scrapeConfiguration: i_ScrapeConfiguration,
      source: {
        eksConfiguration: { clusterArn: 0, securityGroupIds: 0, subnetIds: 0 },
        vpcConfiguration: { securityGroupIds: 0, subnetIds: 0 },
      },
      destination: i_Destination,
      roleConfiguration: i_RoleConfiguration,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
      exporters: D.list(i_ExporterConfiguration),
    },
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
  operationName: "CreateScraper",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /workspaces",
    input: {
      alias: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
      kmsKeyArn: 0,
    },
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
  operationName: "CreateWorkspace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}/alertmanager/definition",
    input: {
      workspaceId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
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
  operationName: "DeleteAlertManagerDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}/anomalydetectors/{anomalyDetectorId}",
    input: {
      workspaceId: 0,
      anomalyDetectorId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
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
  operationName: "DeleteAnomalyDetector",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}/logging",
    input: {
      workspaceId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}/logging/query",
    input: {
      workspaceId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}/policy",
    input: {
      workspaceId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
      revisionId: D.m({ query: "revisionId" }),
    },
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
  operationName: "DeleteResourcePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}/rulegroupsnamespaces/{name}",
    input: {
      workspaceId: 0,
      name: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
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
  operationName: "DeleteRuleGroupsNamespace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /scrapers/{scraperId}",
    input: {
      scraperId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
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
  operationName: "DeleteScraper",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /scrapers/{scraperId}/logging-configuration",
    input: {
      scraperId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /workspaces/{workspaceId}",
    input: {
      workspaceId: 0,
      clientToken: D.m({ query: "clientToken", idempotency: true }),
    },
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
  operationName: "DeleteWorkspace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/alertmanager/definition",
    input: { workspaceId: 0 },
    output: {
      alertManagerDefinition: {
        data: D.blob,
        createdAt: D.ts,
        modifiedAt: D.ts,
      },
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
  operationName: "DescribeAlertManagerDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/anomalydetectors/{anomalyDetectorId}",
    input: { workspaceId: 0, anomalyDetectorId: 0 },
    output: { anomalyDetector: { createdAt: D.ts, modifiedAt: D.ts } },
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
  operationName: "DescribeAnomalyDetector",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/logging",
    input: { workspaceId: 0 },
    output: { loggingConfiguration: { createdAt: D.ts, modifiedAt: D.ts } },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeLoggingConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/logging/query",
    input: { workspaceId: 0 },
    output: {
      queryLoggingConfiguration: { createdAt: D.ts, modifiedAt: D.ts },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeQueryLoggingConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/policy",
    input: { workspaceId: 0 },
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
  operationName: "DescribeResourcePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/rulegroupsnamespaces/{name}",
    input: { workspaceId: 0, name: 0 },
    output: {
      ruleGroupsNamespace: { data: D.blob, createdAt: D.ts, modifiedAt: D.ts },
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
  operationName: "DescribeRuleGroupsNamespace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /scrapers/{scraperId}",
    input: { scraperId: 0 },
    output: {
      scraper: {
        createdAt: D.ts,
        lastModifiedAt: D.ts,
        scrapeConfiguration: { configurationBlob: D.blob },
      },
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
  operationName: "DescribeScraper",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /scrapers/{scraperId}/logging-configuration",
    input: { scraperId: 0 },
    output: { modifiedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeScraperLoggingConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}",
    input: { workspaceId: 0 },
    output: { workspace: { createdAt: D.ts } },
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
  operationName: "DescribeWorkspace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/configuration",
    input: { workspaceId: 0 },
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
  operationName: "DescribeWorkspaceConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /scraperconfiguration",
    input: {},
    output: { configuration: D.blob },
  },
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDefaultScraperConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/anomalydetectors",
    input: {
      workspaceId: 0,
      alias: D.m({ query: "alias" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { anomalyDetectors: D.list({ createdAt: D.ts, modifiedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "GET /workspaces/{workspaceId}/rulegroupsnamespaces",
    input: {
      workspaceId: 0,
      name: D.m({ query: "name" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      ruleGroupsNamespaces: D.list({ createdAt: D.ts, modifiedAt: D.ts }),
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
  descriptor: {
    service: svc,
    http: "GET /scrapers",
    input: {
      filters: D.m({ queryParams: true }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { scrapers: D.list({ createdAt: D.ts, lastModifiedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
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
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /workspaces",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      alias: D.m({ query: "alias" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { workspaces: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{workspaceId}/alertmanager/definition",
    input: { workspaceId: 0, data: 0, clientToken: D.m({ idempotency: true }) },
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
  operationName: "PutAlertManagerDefinition",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{workspaceId}/anomalydetectors/{anomalyDetectorId}",
    input: {
      workspaceId: 0,
      anomalyDetectorId: 0,
      evaluationIntervalInSeconds: 0,
      missingDataAction: i_AnomalyDetectorMissingDataAction,
      configuration: i_AnomalyDetectorConfiguration,
      labels: 0,
      clientToken: D.m({ idempotency: true }),
    },
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
  operationName: "PutAnomalyDetector",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{workspaceId}/policy",
    input: {
      workspaceId: 0,
      policyDocument: 0,
      clientToken: D.m({ idempotency: true }),
      revisionId: 0,
    },
    body: true,
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
  operationName: "PutResourcePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{workspaceId}/rulegroupsnamespaces/{name}",
    input: {
      workspaceId: 0,
      name: 0,
      data: 0,
      clientToken: D.m({ idempotency: true }),
    },
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
  operationName: "PutRuleGroupsNamespace",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
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
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
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
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{workspaceId}/logging",
    input: {
      workspaceId: 0,
      logGroupArn: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /workspaces/{workspaceId}/logging/query",
    input: {
      workspaceId: 0,
      destinations: D.list(i_LoggingDestination),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /scrapers/{scraperId}",
    input: {
      scraperId: 0,
      alias: 0,
      scrapeConfiguration: i_ScrapeConfiguration,
      destination: i_Destination,
      roleConfiguration: i_RoleConfiguration,
      clientToken: D.m({ idempotency: true }),
      exporters: D.list(i_ExporterConfiguration),
    },
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
  operationName: "UpdateScraper",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /scrapers/{scraperId}/logging-configuration",
    input: {
      scraperId: 0,
      loggingDestination: { cloudWatchLogs: i_CloudWatchLogDestination },
      scraperComponents: D.list({ type: 0, config: { options: 0 } }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /workspaces/{workspaceId}/alias",
    input: {
      workspaceId: 0,
      alias: 0,
      clientToken: D.m({ idempotency: true }),
    },
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
  operationName: "UpdateWorkspaceAlias",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /workspaces/{workspaceId}/configuration",
    input: {
      workspaceId: 0,
      clientToken: D.m({ idempotency: true }),
      limitsPerLabelSet: D.list({ limits: { maxSeries: 0 }, labelSet: 0 }),
      retentionPeriodInDays: 0,
      outOfOrderTimeWindowInSeconds: 0,
      ruleQueryOffsetInSeconds: 0,
    },
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
  operationName: "UpdateWorkspaceConfiguration",
})) as any;

const i_AnomalyDetectorConfiguration: D.LazyStruct = () => ({
  randomCutForest: {
    query: 0,
    shingleSize: 0,
    sampleSize: 0,
    ignoreNearExpectedFromAbove: i_IgnoreNearExpected,
    ignoreNearExpectedFromBelow: i_IgnoreNearExpected,
  },
});
const i_AnomalyDetectorMissingDataAction: D.LazyStruct = () => ({
  markAsAnomaly: 0,
  skip: 0,
});
const i_CloudWatchLogDestination: D.LazyStruct = () => ({ logGroupArn: 0 });
const i_Destination: D.LazyStruct = () => ({
  ampConfiguration: { workspaceArn: 0 },
  cloudWatchConfiguration: { datasetArn: 0 },
});
const i_ExporterConfiguration: D.LazyStruct = () => ({
  openSearchConfiguration: { domainArn: 0 },
});
const i_LoggingDestination: D.LazyStruct = () => ({
  cloudWatchLogs: i_CloudWatchLogDestination,
  filters: { qspThreshold: 0 },
});
const i_RoleConfiguration: D.LazyStruct = () => ({
  sourceRoleArn: 0,
  targetRoleArn: 0,
});
const i_ScrapeConfiguration: D.LazyStruct = () => ({ configurationBlob: 0 });
const i_IgnoreNearExpected: D.LazyStruct = () => ({ amount: 0, ratio: 0 });
