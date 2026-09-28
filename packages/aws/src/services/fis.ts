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
  sdkId: "fis",
  target: "FaultInjectionSimulator",
  version: "2020-12-01",
  sigv4: "fis",
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
                `https://fis-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
                return e(`https://fis.${Region}.amazonaws.com`);
              }
              return e(
                `https://fis-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://fis.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://fis.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type ClientToken = string;
export type ExperimentTemplateDescription = string;
export type StopConditionSource = string;
export type StopConditionValue = string;
export interface CreateExperimentTemplateStopConditionInput {
  source: string;
  value?: string;
}
export type CreateExperimentTemplateStopConditionInputList =
  CreateExperimentTemplateStopConditionInput[];
export type ExperimentTemplateTargetName = string;
export type TargetResourceTypeId = string;
export type ResourceArn = string;
export type ResourceArnList = string[];
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type ExperimentTemplateTargetFilterPath = string;
export type ExperimentTemplateTargetFilterValue = string;
export type ExperimentTemplateTargetFilterValues = string[];
export interface ExperimentTemplateTargetInputFilter {
  path: string;
  values: string[];
}
export type ExperimentTemplateTargetFilterInputList =
  ExperimentTemplateTargetInputFilter[];
export type ExperimentTemplateTargetSelectionMode = string;
export type ExperimentTemplateTargetParameterName = string;
export type ExperimentTemplateTargetParameterValue = string;
export type ExperimentTemplateTargetParameterMap = {
  [key: string]: string | undefined;
};
export interface CreateExperimentTemplateTargetInput {
  resourceType: string;
  resourceArns?: string[];
  resourceTags?: { [key: string]: string | undefined };
  filters?: ExperimentTemplateTargetInputFilter[];
  selectionMode: string;
  parameters?: { [key: string]: string | undefined };
}
export type CreateExperimentTemplateTargetInputMap = {
  [key: string]: CreateExperimentTemplateTargetInput | undefined;
};
export type ExperimentTemplateActionName = string;
export type ActionId = string;
export type ExperimentTemplateActionDescription = string;
export type ExperimentTemplateActionParameterName = string;
export type ExperimentTemplateActionParameter = string;
export type ExperimentTemplateActionParameterMap = {
  [key: string]: string | undefined;
};
export type ExperimentTemplateActionTargetName = string;
export type ExperimentTemplateActionTargetMap = {
  [key: string]: string | undefined;
};
export type ExperimentTemplateActionStartAfter = string;
export type ExperimentTemplateActionStartAfterList = string[];
export interface CreateExperimentTemplateActionInput {
  actionId: string;
  description?: string;
  parameters?: { [key: string]: string | undefined };
  targets?: { [key: string]: string | undefined };
  startAfter?: string[];
}
export type CreateExperimentTemplateActionInputMap = {
  [key: string]: CreateExperimentTemplateActionInput | undefined;
};
export type RoleArn = string;
export type CloudWatchLogGroupArn = string;
export interface ExperimentTemplateCloudWatchLogsLogConfigurationInput {
  logGroupArn: string;
}
export type S3BucketName = string;
export type S3ObjectKey = string;
export interface ExperimentTemplateS3LogConfigurationInput {
  bucketName: string;
  prefix?: string;
}
export type LogSchemaVersion = number;
export interface CreateExperimentTemplateLogConfigurationInput {
  cloudWatchLogsConfiguration?: ExperimentTemplateCloudWatchLogsLogConfigurationInput;
  s3Configuration?: ExperimentTemplateS3LogConfigurationInput;
  logSchemaVersion: number;
}
export type AccountTargeting =
  | "single-account"
  | "multi-account"
  | (string & {});
export type EmptyTargetResolutionMode = "fail" | "skip" | (string & {});
export interface CreateExperimentTemplateExperimentOptionsInput {
  accountTargeting?: AccountTargeting;
  emptyTargetResolutionMode?: EmptyTargetResolutionMode;
}
export type ReportConfigurationS3OutputPrefix = string;
export interface ReportConfigurationS3OutputInput {
  bucketName?: string;
  prefix?: string;
}
export interface ExperimentTemplateReportConfigurationOutputsInput {
  s3Configuration?: ReportConfigurationS3OutputInput;
}
export type ReportConfigurationCloudWatchDashboardIdentifier = string;
export interface ReportConfigurationCloudWatchDashboardInput {
  dashboardIdentifier?: string;
}
export type ReportConfigurationCloudWatchDashboardInputList =
  ReportConfigurationCloudWatchDashboardInput[];
export interface ExperimentTemplateReportConfigurationDataSourcesInput {
  cloudWatchDashboards?: ReportConfigurationCloudWatchDashboardInput[];
}
export type ReportConfigurationDuration = string;
export interface CreateExperimentTemplateReportConfigurationInput {
  outputs?: ExperimentTemplateReportConfigurationOutputsInput;
  dataSources?: ExperimentTemplateReportConfigurationDataSourcesInput;
  preExperimentDuration?: string;
  postExperimentDuration?: string;
}
export interface CreateExperimentTemplateRequest {
  clientToken: string;
  description: string;
  stopConditions: CreateExperimentTemplateStopConditionInput[];
  targets?: { [key: string]: CreateExperimentTemplateTargetInput | undefined };
  actions: { [key: string]: CreateExperimentTemplateActionInput | undefined };
  roleArn: string;
  tags?: { [key: string]: string | undefined };
  logConfiguration?: CreateExperimentTemplateLogConfigurationInput;
  experimentOptions?: CreateExperimentTemplateExperimentOptionsInput;
  experimentReportConfiguration?: CreateExperimentTemplateReportConfigurationInput;
}
export type ExperimentTemplateId = string;
export interface ExperimentTemplateTargetFilter {
  path?: string;
  values?: string[];
}
export type ExperimentTemplateTargetFilterList =
  ExperimentTemplateTargetFilter[];
export interface ExperimentTemplateTarget {
  resourceType?: string;
  resourceArns?: string[];
  resourceTags?: { [key: string]: string | undefined };
  filters?: ExperimentTemplateTargetFilter[];
  selectionMode?: string;
  parameters?: { [key: string]: string | undefined };
}
export type ExperimentTemplateTargetMap = {
  [key: string]: ExperimentTemplateTarget | undefined;
};
export interface ExperimentTemplateAction {
  actionId?: string;
  description?: string;
  parameters?: { [key: string]: string | undefined };
  targets?: { [key: string]: string | undefined };
  startAfter?: string[];
}
export type ExperimentTemplateActionMap = {
  [key: string]: ExperimentTemplateAction | undefined;
};
export interface ExperimentTemplateStopCondition {
  source?: string;
  value?: string;
}
export type ExperimentTemplateStopConditionList =
  ExperimentTemplateStopCondition[];
export type CreationTime = Date;
export type LastUpdateTime = Date;
export interface ExperimentTemplateCloudWatchLogsLogConfiguration {
  logGroupArn?: string;
}
export interface ExperimentTemplateS3LogConfiguration {
  bucketName?: string;
  prefix?: string;
}
export interface ExperimentTemplateLogConfiguration {
  cloudWatchLogsConfiguration?: ExperimentTemplateCloudWatchLogsLogConfiguration;
  s3Configuration?: ExperimentTemplateS3LogConfiguration;
  logSchemaVersion?: number;
}
export interface ExperimentTemplateExperimentOptions {
  accountTargeting?: AccountTargeting;
  emptyTargetResolutionMode?: EmptyTargetResolutionMode;
}
export type TargetAccountConfigurationsCount = number;
export interface ReportConfigurationS3Output {
  bucketName?: string;
  prefix?: string;
}
export interface ExperimentTemplateReportConfigurationOutputs {
  s3Configuration?: ReportConfigurationS3Output;
}
export interface ExperimentTemplateReportConfigurationCloudWatchDashboard {
  dashboardIdentifier?: string;
}
export type ExperimentTemplateReportConfigurationCloudWatchDashboardList =
  ExperimentTemplateReportConfigurationCloudWatchDashboard[];
export interface ExperimentTemplateReportConfigurationDataSources {
  cloudWatchDashboards?: ExperimentTemplateReportConfigurationCloudWatchDashboard[];
}
export interface ExperimentTemplateReportConfiguration {
  outputs?: ExperimentTemplateReportConfigurationOutputs;
  dataSources?: ExperimentTemplateReportConfigurationDataSources;
  preExperimentDuration?: string;
  postExperimentDuration?: string;
}
export interface ExperimentTemplate {
  id?: string;
  arn?: string;
  description?: string;
  targets?: { [key: string]: ExperimentTemplateTarget | undefined };
  actions?: { [key: string]: ExperimentTemplateAction | undefined };
  stopConditions?: ExperimentTemplateStopCondition[];
  creationTime?: Date;
  lastUpdateTime?: Date;
  roleArn?: string;
  tags?: { [key: string]: string | undefined };
  logConfiguration?: ExperimentTemplateLogConfiguration;
  experimentOptions?: ExperimentTemplateExperimentOptions;
  targetAccountConfigurationsCount?: number;
  experimentReportConfiguration?: ExperimentTemplateReportConfiguration;
}
export interface CreateExperimentTemplateResponse {
  experimentTemplate?: ExperimentTemplate;
}
export type TargetAccountId = string;
export type TargetAccountConfigurationDescription = string;
export interface CreateTargetAccountConfigurationRequest {
  clientToken?: string;
  experimentTemplateId: string;
  accountId: string;
  roleArn: string;
  description?: string;
}
export interface TargetAccountConfiguration {
  roleArn?: string;
  accountId?: string;
  description?: string;
}
export interface CreateTargetAccountConfigurationResponse {
  targetAccountConfiguration?: TargetAccountConfiguration;
}
export interface DeleteExperimentTemplateRequest {
  id: string;
}
export interface DeleteExperimentTemplateResponse {
  experimentTemplate?: ExperimentTemplate;
}
export interface DeleteTargetAccountConfigurationRequest {
  experimentTemplateId: string;
  accountId: string;
}
export interface DeleteTargetAccountConfigurationResponse {
  targetAccountConfiguration?: TargetAccountConfiguration;
}
export interface GetActionRequest {
  id: string;
}
export type ActionDescription = string;
export type ActionParameterName = string;
export type ActionParameterDescription = string;
export type ActionParameterRequired = boolean;
export interface ActionParameter {
  description?: string;
  required?: boolean;
}
export type ActionParameterMap = { [key: string]: ActionParameter | undefined };
export type ActionTargetName = string;
export interface ActionTarget {
  resourceType?: string;
}
export type ActionTargetMap = { [key: string]: ActionTarget | undefined };
export interface Action {
  id?: string;
  arn?: string;
  description?: string;
  parameters?: { [key: string]: ActionParameter | undefined };
  targets?: { [key: string]: ActionTarget | undefined };
  tags?: { [key: string]: string | undefined };
}
export interface GetActionResponse {
  action?: Action;
}
export type ExperimentId = string;
export interface GetExperimentRequest {
  id: string;
}
export type ExperimentStatus =
  | "pending"
  | "initiating"
  | "running"
  | "completed"
  | "stopping"
  | "stopped"
  | "failed"
  | "cancelled"
  | (string & {});
export type ExperimentStatusReason = string;
export type ExperimentErrorAccountId = string;
export type ExperimentErrorCode = string;
export type ExperimentErrorLocation = string;
export interface ExperimentError {
  accountId?: string;
  code?: string;
  location?: string;
}
export interface ExperimentState {
  status?: ExperimentStatus;
  reason?: string;
  error?: ExperimentError;
}
export type ExperimentTargetName = string;
export type ExperimentTargetFilterPath = string;
export type ExperimentTargetFilterValue = string;
export type ExperimentTargetFilterValues = string[];
export interface ExperimentTargetFilter {
  path?: string;
  values?: string[];
}
export type ExperimentTargetFilterList = ExperimentTargetFilter[];
export type ExperimentTargetSelectionMode = string;
export type ExperimentTargetParameterName = string;
export type ExperimentTargetParameterValue = string;
export type ExperimentTargetParameterMap = {
  [key: string]: string | undefined;
};
export interface ExperimentTarget {
  resourceType?: string;
  resourceArns?: string[];
  resourceTags?: { [key: string]: string | undefined };
  filters?: ExperimentTargetFilter[];
  selectionMode?: string;
  parameters?: { [key: string]: string | undefined };
}
export type ExperimentTargetMap = {
  [key: string]: ExperimentTarget | undefined;
};
export type ExperimentActionName = string;
export type ExperimentActionDescription = string;
export type ExperimentActionParameterName = string;
export type ExperimentActionParameter = string;
export type ExperimentActionParameterMap = {
  [key: string]: string | undefined;
};
export type ExperimentActionTargetName = string;
export type ExperimentActionTargetMap = { [key: string]: string | undefined };
export type ExperimentActionStartAfter = string;
export type ExperimentActionStartAfterList = string[];
export type ExperimentActionStatus =
  | "pending"
  | "initiating"
  | "running"
  | "completed"
  | "cancelled"
  | "stopping"
  | "stopped"
  | "failed"
  | "skipped"
  | (string & {});
export type ExperimentActionStatusReason = string;
export interface ExperimentActionState {
  status?: ExperimentActionStatus;
  reason?: string;
}
export type ExperimentActionStartTime = Date;
export type ExperimentActionEndTime = Date;
export interface ExperimentAction {
  actionId?: string;
  description?: string;
  parameters?: { [key: string]: string | undefined };
  targets?: { [key: string]: string | undefined };
  startAfter?: string[];
  state?: ExperimentActionState;
  startTime?: Date;
  endTime?: Date;
}
export type ExperimentActionMap = {
  [key: string]: ExperimentAction | undefined;
};
export interface ExperimentStopCondition {
  source?: string;
  value?: string;
}
export type ExperimentStopConditionList = ExperimentStopCondition[];
export type ExperimentStartTime = Date;
export type ExperimentEndTime = Date;
export interface ExperimentCloudWatchLogsLogConfiguration {
  logGroupArn?: string;
}
export interface ExperimentS3LogConfiguration {
  bucketName?: string;
  prefix?: string;
}
export interface ExperimentLogConfiguration {
  cloudWatchLogsConfiguration?: ExperimentCloudWatchLogsLogConfiguration;
  s3Configuration?: ExperimentS3LogConfiguration;
  logSchemaVersion?: number;
}
export type ActionsMode = "skip-all" | "run-all" | (string & {});
export interface ExperimentOptions {
  accountTargeting?: AccountTargeting;
  emptyTargetResolutionMode?: EmptyTargetResolutionMode;
  actionsMode?: ActionsMode;
}
export interface ExperimentReportConfigurationOutputsS3Configuration {
  bucketName?: string;
  prefix?: string;
}
export interface ExperimentReportConfigurationOutputs {
  s3Configuration?: ExperimentReportConfigurationOutputsS3Configuration;
}
export interface ExperimentReportConfigurationCloudWatchDashboard {
  dashboardIdentifier?: string;
}
export type ExperimentReportConfigurationCloudWatchDashboardList =
  ExperimentReportConfigurationCloudWatchDashboard[];
export interface ExperimentReportConfigurationDataSources {
  cloudWatchDashboards?: ExperimentReportConfigurationCloudWatchDashboard[];
}
export interface ExperimentReportConfiguration {
  outputs?: ExperimentReportConfigurationOutputs;
  dataSources?: ExperimentReportConfigurationDataSources;
  preExperimentDuration?: string;
  postExperimentDuration?: string;
}
export type ExperimentReportStatus =
  | "pending"
  | "running"
  | "completed"
  | "cancelled"
  | "failed"
  | (string & {});
export type ExperimentReportReason = string;
export type ExperimentReportErrorCode = string;
export interface ExperimentReportError {
  code?: string;
}
export interface ExperimentReportState {
  status?: ExperimentReportStatus;
  reason?: string;
  error?: ExperimentReportError;
}
export type ExperimentReportS3ReportArn = string;
export type ExperimentReportS3ReportType = string;
export interface ExperimentReportS3Report {
  arn?: string;
  reportType?: string;
}
export type ExperimentReportS3ReportList = ExperimentReportS3Report[];
export interface ExperimentReport {
  state?: ExperimentReportState;
  s3Reports?: ExperimentReportS3Report[];
}
export interface Experiment {
  id?: string;
  arn?: string;
  experimentTemplateId?: string;
  roleArn?: string;
  state?: ExperimentState;
  targets?: { [key: string]: ExperimentTarget | undefined };
  actions?: { [key: string]: ExperimentAction | undefined };
  stopConditions?: ExperimentStopCondition[];
  creationTime?: Date;
  startTime?: Date;
  endTime?: Date;
  tags?: { [key: string]: string | undefined };
  logConfiguration?: ExperimentLogConfiguration;
  experimentOptions?: ExperimentOptions;
  targetAccountConfigurationsCount?: number;
  experimentReportConfiguration?: ExperimentReportConfiguration;
  experimentReport?: ExperimentReport;
}
export interface GetExperimentResponse {
  experiment?: Experiment;
}
export interface GetExperimentTargetAccountConfigurationRequest {
  experimentId: string;
  accountId: string;
}
export interface ExperimentTargetAccountConfiguration {
  roleArn?: string;
  accountId?: string;
  description?: string;
}
export interface GetExperimentTargetAccountConfigurationResponse {
  targetAccountConfiguration?: ExperimentTargetAccountConfiguration;
}
export interface GetExperimentTemplateRequest {
  id: string;
}
export interface GetExperimentTemplateResponse {
  experimentTemplate?: ExperimentTemplate;
}
export type SafetyLeverId = string;
export interface GetSafetyLeverRequest {
  id: string;
}
export type SafetyLeverStatus =
  | "disengaged"
  | "engaged"
  | "engaging"
  | (string & {});
export type SafetyLeverStatusReason = string;
export interface SafetyLeverState {
  status?: SafetyLeverStatus;
  reason?: string;
}
export interface SafetyLever {
  id?: string;
  arn?: string;
  state?: SafetyLeverState;
}
export interface GetSafetyLeverResponse {
  safetyLever?: SafetyLever;
}
export interface GetTargetAccountConfigurationRequest {
  experimentTemplateId: string;
  accountId: string;
}
export interface GetTargetAccountConfigurationResponse {
  targetAccountConfiguration?: TargetAccountConfiguration;
}
export interface GetTargetResourceTypeRequest {
  resourceType: string;
}
export type TargetResourceTypeDescription = string;
export type TargetResourceTypeParameterName = string;
export type TargetResourceTypeParameterDescription = string;
export type TargetResourceTypeParameterRequired = boolean;
export interface TargetResourceTypeParameter {
  description?: string;
  required?: boolean;
}
export type TargetResourceTypeParameterMap = {
  [key: string]: TargetResourceTypeParameter | undefined;
};
export interface TargetResourceType {
  resourceType?: string;
  description?: string;
  parameters?: { [key: string]: TargetResourceTypeParameter | undefined };
}
export interface GetTargetResourceTypeResponse {
  targetResourceType?: TargetResourceType;
}
export type ListActionsMaxResults = number;
export type NextToken = string;
export interface ListActionsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface ActionSummary {
  id?: string;
  arn?: string;
  description?: string;
  targets?: { [key: string]: ActionTarget | undefined };
  tags?: { [key: string]: string | undefined };
}
export type ActionSummaryList = ActionSummary[];
export interface ListActionsResponse {
  actions?: ActionSummary[];
  nextToken?: string;
}
export type ListExperimentResolvedTargetsMaxResults = number;
export type TargetName = string;
export interface ListExperimentResolvedTargetsRequest {
  experimentId: string;
  maxResults?: number;
  nextToken?: string;
  targetName?: string;
}
export type TargetInformationKey = string;
export type TargetInformationValue = string;
export type TargetInformationMap = { [key: string]: string | undefined };
export interface ResolvedTarget {
  resourceType?: string;
  targetName?: string;
  targetInformation?: { [key: string]: string | undefined };
}
export type ResolvedTargetList = ResolvedTarget[];
export interface ListExperimentResolvedTargetsResponse {
  resolvedTargets?: ResolvedTarget[];
  nextToken?: string;
}
export type ListExperimentsMaxResults = number;
export interface ListExperimentsRequest {
  maxResults?: number;
  nextToken?: string;
  experimentTemplateId?: string;
}
export interface ExperimentSummary {
  id?: string;
  arn?: string;
  experimentTemplateId?: string;
  state?: ExperimentState;
  creationTime?: Date;
  tags?: { [key: string]: string | undefined };
  experimentOptions?: ExperimentOptions;
}
export type ExperimentSummaryList = ExperimentSummary[];
export interface ListExperimentsResponse {
  experiments?: ExperimentSummary[];
  nextToken?: string;
}
export interface ListExperimentTargetAccountConfigurationsRequest {
  experimentId: string;
  nextToken?: string;
}
export interface ExperimentTargetAccountConfigurationSummary {
  roleArn?: string;
  accountId?: string;
  description?: string;
}
export type ExperimentTargetAccountConfigurationList =
  ExperimentTargetAccountConfigurationSummary[];
export interface ListExperimentTargetAccountConfigurationsResponse {
  targetAccountConfigurations?: ExperimentTargetAccountConfigurationSummary[];
  nextToken?: string;
}
export type ListExperimentTemplatesMaxResults = number;
export interface ListExperimentTemplatesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface ExperimentTemplateSummary {
  id?: string;
  arn?: string;
  description?: string;
  creationTime?: Date;
  lastUpdateTime?: Date;
  tags?: { [key: string]: string | undefined };
}
export type ExperimentTemplateSummaryList = ExperimentTemplateSummary[];
export interface ListExperimentTemplatesResponse {
  experimentTemplates?: ExperimentTemplateSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type ListTargetAccountConfigurationsMaxResults = number;
export interface ListTargetAccountConfigurationsRequest {
  experimentTemplateId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface TargetAccountConfigurationSummary {
  roleArn?: string;
  accountId?: string;
  description?: string;
}
export type TargetAccountConfigurationList =
  TargetAccountConfigurationSummary[];
export interface ListTargetAccountConfigurationsResponse {
  targetAccountConfigurations?: TargetAccountConfigurationSummary[];
  nextToken?: string;
}
export type ListTargetResourceTypesMaxResults = number;
export interface ListTargetResourceTypesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface TargetResourceTypeSummary {
  resourceType?: string;
  description?: string;
}
export type TargetResourceTypeSummaryList = TargetResourceTypeSummary[];
export interface ListTargetResourceTypesResponse {
  targetResourceTypes?: TargetResourceTypeSummary[];
  nextToken?: string;
}
export interface StartExperimentExperimentOptionsInput {
  actionsMode?: ActionsMode;
}
export interface StartExperimentRequest {
  clientToken: string;
  experimentTemplateId: string;
  experimentOptions?: StartExperimentExperimentOptionsInput;
  tags?: { [key: string]: string | undefined };
}
export interface StartExperimentResponse {
  experiment?: Experiment;
}
export interface StopExperimentRequest {
  id: string;
}
export interface StopExperimentResponse {
  experiment?: Experiment;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys?: string[];
}
export interface UntagResourceResponse {}
export interface UpdateExperimentTemplateStopConditionInput {
  source: string;
  value?: string;
}
export type UpdateExperimentTemplateStopConditionInputList =
  UpdateExperimentTemplateStopConditionInput[];
export interface UpdateExperimentTemplateTargetInput {
  resourceType: string;
  resourceArns?: string[];
  resourceTags?: { [key: string]: string | undefined };
  filters?: ExperimentTemplateTargetInputFilter[];
  selectionMode: string;
  parameters?: { [key: string]: string | undefined };
}
export type UpdateExperimentTemplateTargetInputMap = {
  [key: string]: UpdateExperimentTemplateTargetInput | undefined;
};
export interface UpdateExperimentTemplateActionInputItem {
  actionId?: string;
  description?: string;
  parameters?: { [key: string]: string | undefined };
  targets?: { [key: string]: string | undefined };
  startAfter?: string[];
}
export type UpdateExperimentTemplateActionInputMap = {
  [key: string]: UpdateExperimentTemplateActionInputItem | undefined;
};
export interface UpdateExperimentTemplateLogConfigurationInput {
  cloudWatchLogsConfiguration?: ExperimentTemplateCloudWatchLogsLogConfigurationInput;
  s3Configuration?: ExperimentTemplateS3LogConfigurationInput;
  logSchemaVersion?: number;
}
export interface UpdateExperimentTemplateExperimentOptionsInput {
  emptyTargetResolutionMode?: EmptyTargetResolutionMode;
}
export interface UpdateExperimentTemplateReportConfigurationInput {
  outputs?: ExperimentTemplateReportConfigurationOutputsInput;
  dataSources?: ExperimentTemplateReportConfigurationDataSourcesInput;
  preExperimentDuration?: string;
  postExperimentDuration?: string;
}
export interface UpdateExperimentTemplateRequest {
  id: string;
  description?: string;
  stopConditions?: UpdateExperimentTemplateStopConditionInput[];
  targets?: { [key: string]: UpdateExperimentTemplateTargetInput | undefined };
  actions?: {
    [key: string]: UpdateExperimentTemplateActionInputItem | undefined;
  };
  roleArn?: string;
  logConfiguration?: UpdateExperimentTemplateLogConfigurationInput;
  experimentOptions?: UpdateExperimentTemplateExperimentOptionsInput;
  experimentReportConfiguration?: UpdateExperimentTemplateReportConfigurationInput;
}
export interface UpdateExperimentTemplateResponse {
  experimentTemplate?: ExperimentTemplate;
}
export type SafetyLeverStatusInput = "disengaged" | "engaged" | (string & {});
export interface UpdateSafetyLeverStateInput {
  status: SafetyLeverStatusInput;
  reason: string;
}
export interface UpdateSafetyLeverStateRequest {
  id: string;
  state: UpdateSafetyLeverStateInput;
}
export interface UpdateSafetyLeverStateResponse {
  safetyLever?: SafetyLever;
}
export interface UpdateTargetAccountConfigurationRequest {
  experimentTemplateId: string;
  accountId: string;
  roleArn?: string;
  description?: string;
}
export interface UpdateTargetAccountConfigurationResponse {
  targetAccountConfiguration?: TargetAccountConfiguration;
}
export type ExceptionMessage = string;
export type CreateExperimentTemplateError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an experiment template.
 *
 * An experiment template includes the following components:
 *
 * - **Targets**: A target can be a specific resource in
 * your Amazon Web Services environment, or one or more resources that match criteria that you
 * specify, for example, resources that have specific tags.
 *
 * - **Actions**: The actions to carry out on the
 * target. You can specify multiple actions, the duration of each action, and when to start each action during an experiment.
 *
 * - **Stop conditions**: If a stop condition is
 * triggered while an experiment is running, the experiment is automatically
 * stopped. You can define a stop condition as a CloudWatch alarm.
 *
 * For more information, see experiment templates
 * in the *Fault Injection Service User Guide*.
 */
export const createExperimentTemplate: API.OperationMethod<
  CreateExperimentTemplateRequest,
  CreateExperimentTemplateResponse,
  CreateExperimentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /experimentTemplates",
    input: {
      clientToken: D.m({ idempotency: true }),
      description: 0,
      stopConditions: D.list({ source: 0, value: 0 }),
      targets: D.map({
        resourceType: 0,
        resourceArns: 0,
        resourceTags: 0,
        filters: D.list(i_ExperimentTemplateTargetInputFilter),
        selectionMode: 0,
        parameters: 0,
      }),
      actions: D.map({
        actionId: 0,
        description: 0,
        parameters: 0,
        targets: 0,
        startAfter: 0,
      }),
      roleArn: 0,
      tags: 0,
      logConfiguration: {
        cloudWatchLogsConfiguration:
          i_ExperimentTemplateCloudWatchLogsLogConfigurationInput,
        s3Configuration: i_ExperimentTemplateS3LogConfigurationInput,
        logSchemaVersion: 0,
      },
      experimentOptions: { accountTargeting: 0, emptyTargetResolutionMode: 0 },
      experimentReportConfiguration: {
        outputs: i_ExperimentTemplateReportConfigurationOutputsInput,
        dataSources: i_ExperimentTemplateReportConfigurationDataSourcesInput,
        preExperimentDuration: 0,
        postExperimentDuration: 0,
      },
    },
    output: { experimentTemplate: o_ExperimentTemplate },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateExperimentTemplate",
})) as any;

export type CreateTargetAccountConfigurationError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a target account configuration for the experiment template. A target account configuration
 * is required when `accountTargeting` of `experimentOptions` is set to `multi-account`.
 * For more information, see experiment options
 * in the *Fault Injection Service User Guide*.
 */
export const createTargetAccountConfiguration: API.OperationMethod<
  CreateTargetAccountConfigurationRequest,
  CreateTargetAccountConfigurationResponse,
  CreateTargetAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /experimentTemplates/{experimentTemplateId}/targetAccountConfigurations/{accountId}",
    input: {
      clientToken: D.m({ idempotency: true }),
      experimentTemplateId: 0,
      accountId: 0,
      roleArn: 0,
      description: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTargetAccountConfiguration",
})) as any;

export type DeleteExperimentTemplateError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified experiment template.
 */
export const deleteExperimentTemplate: API.OperationMethod<
  DeleteExperimentTemplateRequest,
  DeleteExperimentTemplateResponse,
  DeleteExperimentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /experimentTemplates/{id}",
    input: { id: 0 },
    output: { experimentTemplate: o_ExperimentTemplate },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExperimentTemplate",
})) as any;

export type DeleteTargetAccountConfigurationError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified target account configuration of the experiment template.
 */
export const deleteTargetAccountConfiguration: API.OperationMethod<
  DeleteTargetAccountConfigurationRequest,
  DeleteTargetAccountConfigurationResponse,
  DeleteTargetAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /experimentTemplates/{experimentTemplateId}/targetAccountConfigurations/{accountId}",
    input: { experimentTemplateId: 0, accountId: 0 },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTargetAccountConfiguration",
})) as any;

export type GetActionError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified FIS action.
 */
export const getAction: API.OperationMethod<
  GetActionRequest,
  GetActionResponse,
  GetActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /actions/{id}", input: { id: 0 } },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAction",
})) as any;

export type GetExperimentError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified experiment.
 */
export const getExperiment: API.OperationMethod<
  GetExperimentRequest,
  GetExperimentResponse,
  GetExperimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /experiments/{id}",
    input: { id: 0 },
    output: { experiment: o_Experiment },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExperiment",
})) as any;

export type GetExperimentTargetAccountConfigurationError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified target account configuration of the experiment.
 */
export const getExperimentTargetAccountConfiguration: API.OperationMethod<
  GetExperimentTargetAccountConfigurationRequest,
  GetExperimentTargetAccountConfigurationResponse,
  GetExperimentTargetAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /experiments/{experimentId}/targetAccountConfigurations/{accountId}",
    input: { experimentId: 0, accountId: 0 },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExperimentTargetAccountConfiguration",
})) as any;

export type GetExperimentTemplateError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified experiment template.
 */
export const getExperimentTemplate: API.OperationMethod<
  GetExperimentTemplateRequest,
  GetExperimentTemplateResponse,
  GetExperimentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /experimentTemplates/{id}",
    input: { id: 0 },
    output: { experimentTemplate: o_ExperimentTemplate },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetExperimentTemplate",
})) as any;

export type GetSafetyLeverError = ResourceNotFoundException | CommonErrors;
/**
 * Gets information about the specified safety lever.
 */
export const getSafetyLever: API.OperationMethod<
  GetSafetyLeverRequest,
  GetSafetyLeverResponse,
  GetSafetyLeverError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /safetyLevers/{id}",
    input: { id: 0 },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSafetyLever",
})) as any;

export type GetTargetAccountConfigurationError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified target account configuration of the experiment template.
 */
export const getTargetAccountConfiguration: API.OperationMethod<
  GetTargetAccountConfigurationRequest,
  GetTargetAccountConfigurationResponse,
  GetTargetAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /experimentTemplates/{experimentTemplateId}/targetAccountConfigurations/{accountId}",
    input: { experimentTemplateId: 0, accountId: 0 },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTargetAccountConfiguration",
})) as any;

export type GetTargetResourceTypeError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about the specified resource type.
 */
export const getTargetResourceType: API.OperationMethod<
  GetTargetResourceTypeRequest,
  GetTargetResourceTypeResponse,
  GetTargetResourceTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /targetResourceTypes/{resourceType}",
    input: { resourceType: 0 },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTargetResourceType",
})) as any;

export type ListActionsError = ValidationException | CommonErrors;
/**
 * Lists the available FIS actions.
 */
export const listActions: API.PaginatedOperationMethod<
  ListActionsRequest,
  ListActionsResponse,
  ListActionsError,
  Credentials | HttpClient.HttpClient,
  ActionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /actions",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExperimentResolvedTargetsError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the resolved targets information of the specified experiment.
 */
export const listExperimentResolvedTargets: API.PaginatedOperationMethod<
  ListExperimentResolvedTargetsRequest,
  ListExperimentResolvedTargetsResponse,
  ListExperimentResolvedTargetsError,
  Credentials | HttpClient.HttpClient,
  ResolvedTarget
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /experiments/{experimentId}/resolvedTargets",
    input: {
      experimentId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      targetName: D.m({ query: "targetName" }),
    },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExperimentResolvedTargets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resolvedTargets",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExperimentsError = ValidationException | CommonErrors;
/**
 * Lists your experiments.
 */
export const listExperiments: API.PaginatedOperationMethod<
  ListExperimentsRequest,
  ListExperimentsResponse,
  ListExperimentsError,
  Credentials | HttpClient.HttpClient,
  ExperimentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /experiments",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      experimentTemplateId: D.m({ query: "experimentTemplateId" }),
    },
    output: { experiments: D.list({ creationTime: D.ts }) },
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExperiments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "experiments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExperimentTargetAccountConfigurationsError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the target account configurations of the specified experiment.
 */
export const listExperimentTargetAccountConfigurations: API.OperationMethod<
  ListExperimentTargetAccountConfigurationsRequest,
  ListExperimentTargetAccountConfigurationsResponse,
  ListExperimentTargetAccountConfigurationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /experiments/{experimentId}/targetAccountConfigurations",
    input: { experimentId: 0, nextToken: D.m({ query: "nextToken" }) },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExperimentTargetAccountConfigurations",
})) as any;

export type ListExperimentTemplatesError = ValidationException | CommonErrors;
/**
 * Lists your experiment templates.
 */
export const listExperimentTemplates: API.PaginatedOperationMethod<
  ListExperimentTemplatesRequest,
  ListExperimentTemplatesResponse,
  ListExperimentTemplatesError,
  Credentials | HttpClient.HttpClient,
  ExperimentTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /experimentTemplates",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      experimentTemplates: D.list({ creationTime: D.ts, lastUpdateTime: D.ts }),
    },
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExperimentTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "experimentTemplates",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = CommonErrors;
/**
 * Lists the tags for the specified resource.
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
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTargetAccountConfigurationsError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the target account configurations of the specified experiment template.
 */
export const listTargetAccountConfigurations: API.PaginatedOperationMethod<
  ListTargetAccountConfigurationsRequest,
  ListTargetAccountConfigurationsResponse,
  ListTargetAccountConfigurationsError,
  Credentials | HttpClient.HttpClient,
  TargetAccountConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /experimentTemplates/{experimentTemplateId}/targetAccountConfigurations",
    input: {
      experimentTemplateId: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargetAccountConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "targetAccountConfigurations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTargetResourceTypesError = ValidationException | CommonErrors;
/**
 * Lists the target resource types.
 */
export const listTargetResourceTypes: API.PaginatedOperationMethod<
  ListTargetResourceTypesRequest,
  ListTargetResourceTypesResponse,
  ListTargetResourceTypesError,
  Credentials | HttpClient.HttpClient,
  TargetResourceTypeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /targetResourceTypes",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargetResourceTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "targetResourceTypes",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartExperimentError =
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Starts running an experiment from the specified experiment template.
 */
export const startExperiment: API.OperationMethod<
  StartExperimentRequest,
  StartExperimentResponse,
  StartExperimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /experiments",
    input: {
      clientToken: D.m({ idempotency: true }),
      experimentTemplateId: 0,
      experimentOptions: { actionsMode: 0 },
      tags: 0,
    },
    output: { experiment: o_Experiment },
    body: true,
  },
  errors: [
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartExperiment",
})) as any;

export type StopExperimentError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops the specified experiment.
 */
export const stopExperiment: API.OperationMethod<
  StopExperimentRequest,
  StopExperimentResponse,
  StopExperimentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /experiments/{id}",
    input: { id: 0 },
    output: { experiment: o_Experiment },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopExperiment",
})) as any;

export type TagResourceError = CommonErrors;
/**
 * Applies the specified tags to the specified resource.
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
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError = CommonErrors;
/**
 * Removes the specified tags from the specified resource.
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
  errors: [],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateExperimentTemplateError =
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified experiment template.
 */
export const updateExperimentTemplate: API.OperationMethod<
  UpdateExperimentTemplateRequest,
  UpdateExperimentTemplateResponse,
  UpdateExperimentTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /experimentTemplates/{id}",
    input: {
      id: 0,
      description: 0,
      stopConditions: D.list({ source: 0, value: 0 }),
      targets: D.map({
        resourceType: 0,
        resourceArns: 0,
        resourceTags: 0,
        filters: D.list(i_ExperimentTemplateTargetInputFilter),
        selectionMode: 0,
        parameters: 0,
      }),
      actions: D.map({
        actionId: 0,
        description: 0,
        parameters: 0,
        targets: 0,
        startAfter: 0,
      }),
      roleArn: 0,
      logConfiguration: {
        cloudWatchLogsConfiguration:
          i_ExperimentTemplateCloudWatchLogsLogConfigurationInput,
        s3Configuration: i_ExperimentTemplateS3LogConfigurationInput,
        logSchemaVersion: 0,
      },
      experimentOptions: { emptyTargetResolutionMode: 0 },
      experimentReportConfiguration: {
        outputs: i_ExperimentTemplateReportConfigurationOutputsInput,
        dataSources: i_ExperimentTemplateReportConfigurationDataSourcesInput,
        preExperimentDuration: 0,
        postExperimentDuration: 0,
      },
    },
    output: { experimentTemplate: o_ExperimentTemplate },
    body: true,
  },
  errors: [
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateExperimentTemplate",
})) as any;

export type UpdateSafetyLeverStateError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified safety lever state.
 */
export const updateSafetyLeverState: API.OperationMethod<
  UpdateSafetyLeverStateRequest,
  UpdateSafetyLeverStateResponse,
  UpdateSafetyLeverStateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /safetyLevers/{id}/state",
    input: { id: 0, state: { status: 0, reason: 0 } },
    body: true,
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSafetyLeverState",
})) as any;

export type UpdateTargetAccountConfigurationError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the target account configuration for the specified experiment template.
 */
export const updateTargetAccountConfiguration: API.OperationMethod<
  UpdateTargetAccountConfigurationRequest,
  UpdateTargetAccountConfigurationResponse,
  UpdateTargetAccountConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /experimentTemplates/{experimentTemplateId}/targetAccountConfigurations/{accountId}",
    input: {
      experimentTemplateId: 0,
      accountId: 0,
      roleArn: 0,
      description: 0,
    },
    body: true,
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTargetAccountConfiguration",
})) as any;

const i_ExperimentTemplateCloudWatchLogsLogConfigurationInput: D.LazyStruct =
  () => ({ logGroupArn: 0 });
const i_ExperimentTemplateReportConfigurationDataSourcesInput: D.LazyStruct =
  () => ({ cloudWatchDashboards: D.list({ dashboardIdentifier: 0 }) });
const i_ExperimentTemplateReportConfigurationOutputsInput: D.LazyStruct =
  () => ({ s3Configuration: { bucketName: 0, prefix: 0 } });
const i_ExperimentTemplateS3LogConfigurationInput: D.LazyStruct = () => ({
  bucketName: 0,
  prefix: 0,
});
const i_ExperimentTemplateTargetInputFilter: D.LazyStruct = () => ({
  path: 0,
  values: 0,
});
const o_Experiment: D.LazyStruct = () => ({
  actions: D.map({ startTime: D.ts, endTime: D.ts }),
  creationTime: D.ts,
  startTime: D.ts,
  endTime: D.ts,
});
const o_ExperimentTemplate: D.LazyStruct = () => ({
  creationTime: D.ts,
  lastUpdateTime: D.ts,
});
