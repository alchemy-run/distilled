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
  sdkId: "resiliencehub",
  serviceShapeName: "AwsResilienceHub",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "resiliencehub" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-04-30");
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
              `https://resiliencehub-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://resiliencehub-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://resiliencehub.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://resiliencehub.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://resiliencehub.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Arn = string;
export type String255 = string;
export interface AcceptGroupingRecommendationEntry {
  groupingRecommendationId: string;
}
export type AcceptGroupingRecommendationEntries = AcceptGroupingRecommendationEntry[];
export interface AcceptResourceGroupingRecommendationsRequest {
  appArn: string;
  entries: AcceptGroupingRecommendationEntry[];
}
export type ErrorMessage = string;
export interface FailedGroupingRecommendationEntry {
  groupingRecommendationId: string;
  errorMessage: string;
}
export type FailedGroupingRecommendationEntries = FailedGroupingRecommendationEntry[];
export interface AcceptResourceGroupingRecommendationsResponse {
  appArn: string;
  failedEntries: FailedGroupingRecommendationEntry[];
}
export type EntityName = string;
export type ResourceMappingType =
  | "CfnStack"
  | "Resource"
  | "AppRegistryApp"
  | "ResourceGroup"
  | "Terraform"
  | "EKS"
  | (string & {});
export type PhysicalIdentifierType = "Arn" | "Native" | (string & {});
export type AwsRegion = string;
export type CustomerId = string;
export interface PhysicalResourceId {
  identifier: string;
  type: PhysicalIdentifierType;
  awsRegion?: string;
  awsAccountId?: string;
}
export interface ResourceMapping {
  resourceName?: string;
  logicalStackName?: string;
  appRegistryAppName?: string;
  resourceGroupName?: string;
  mappingType: ResourceMappingType;
  physicalResourceId: PhysicalResourceId;
  terraformSourceName?: string;
  eksSourceName?: string;
}
export type ResourceMappingList = ResourceMapping[];
export interface AddDraftAppVersionResourceMappingsRequest {
  appArn: string;
  resourceMappings: ResourceMapping[];
}
export type EntityVersion = string;
export interface AddDraftAppVersionResourceMappingsResponse {
  appArn: string;
  appVersion: string;
  resourceMappings: ResourceMapping[];
}
export type SpecReferenceId = string;
export type String500 = string;
export interface UpdateRecommendationStatusItem {
  resourceId?: string;
  targetAccountId?: string;
  targetRegion?: string;
}
export type EntityName255 = string;
export type ExcludeRecommendationReason =
  | "AlreadyImplemented"
  | "NotRelevant"
  | "ComplexityOfImplementation"
  | (string & {});
export interface UpdateRecommendationStatusRequestEntry {
  entryId: string;
  referenceId: string;
  item?: UpdateRecommendationStatusItem;
  excluded: boolean;
  appComponentId?: string;
  excludeReason?: ExcludeRecommendationReason;
}
export type UpdateRecommendationStatusRequestEntries = UpdateRecommendationStatusRequestEntry[];
export interface BatchUpdateRecommendationStatusRequest {
  appArn: string;
  requestEntries: UpdateRecommendationStatusRequestEntry[];
}
export interface BatchUpdateRecommendationStatusSuccessfulEntry {
  entryId: string;
  referenceId: string;
  item?: UpdateRecommendationStatusItem;
  excluded: boolean;
  appComponentId?: string;
  excludeReason?: ExcludeRecommendationReason;
}
export type BatchUpdateRecommendationStatusSuccessfulEntries =
  BatchUpdateRecommendationStatusSuccessfulEntry[];
export interface BatchUpdateRecommendationStatusFailedEntry {
  entryId: string;
  errorMessage: string;
}
export type BatchUpdateRecommendationStatusFailedEntries =
  BatchUpdateRecommendationStatusFailedEntry[];
export interface BatchUpdateRecommendationStatusResponse {
  appArn: string;
  successfulEntries: BatchUpdateRecommendationStatusSuccessfulEntry[];
  failedEntries: BatchUpdateRecommendationStatusFailedEntry[];
}
export type EntityDescription = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type ClientToken = string;
export type AppAssessmentScheduleType = "Disabled" | "Daily" | (string & {});
export type PermissionModelType = "LegacyIAMUser" | "RoleBased" | (string & {});
export type IamRoleName = string;
export type IamRoleArn = string;
export type IamRoleArnList = string[];
export interface PermissionModel {
  type: PermissionModelType;
  invokerRoleName?: string;
  crossAccountRoleArns?: string[];
}
export type EventType = "ScheduledAssessmentFailure" | "DriftDetected" | (string & {});
export interface EventSubscription {
  name: string;
  eventType: EventType;
  snsTopicArn?: string;
}
export type EventSubscriptionList = EventSubscription[];
export interface CreateAppRequest {
  name: string;
  description?: string;
  policyArn?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
  assessmentSchedule?: AppAssessmentScheduleType;
  permissionModel?: PermissionModel;
  eventSubscriptions?: EventSubscription[];
  awsApplicationArn?: string;
}
export type AppStatusType = "Active" | "Deleting" | (string & {});
export type AppComplianceStatusType =
  | "PolicyBreached"
  | "PolicyMet"
  | "NotAssessed"
  | "ChangesDetected"
  | "NotApplicable"
  | "MissingPolicy"
  | (string & {});
export type AppDriftStatusType = "NotChecked" | "NotDetected" | "Detected" | (string & {});
export interface App {
  appArn: string;
  name: string;
  description?: string;
  policyArn?: string;
  creationTime: Date;
  status?: AppStatusType;
  complianceStatus?: AppComplianceStatusType;
  lastAppComplianceEvaluationTime?: Date;
  resiliencyScore?: number;
  lastResiliencyScoreEvaluationTime?: Date;
  tags?: { [key: string]: string | undefined };
  assessmentSchedule?: AppAssessmentScheduleType;
  permissionModel?: PermissionModel;
  eventSubscriptions?: EventSubscription[];
  driftStatus?: AppDriftStatusType;
  lastDriftEvaluationTime?: Date;
  rtoInSecs?: number;
  rpoInSecs?: number;
  awsApplicationArn?: string;
}
export interface CreateAppResponse {
  app: App;
}
export type String128WithoutWhitespace = string;
export type String1024 = string;
export type AdditionalInfoValueList = string[];
export type AdditionalInfoMap = { [key: string]: string[] | undefined };
export interface CreateAppVersionAppComponentRequest {
  appArn: string;
  id?: string;
  name: string;
  type: string;
  additionalInfo?: { [key: string]: string[] | undefined };
  clientToken?: string;
}
export interface AppComponent {
  name: string;
  type: string;
  id?: string;
  additionalInfo?: { [key: string]: string[] | undefined };
}
export interface CreateAppVersionAppComponentResponse {
  appArn: string;
  appVersion: string;
  appComponent?: AppComponent;
}
export interface LogicalResourceId {
  identifier: string;
  logicalStackName?: string;
  resourceGroupName?: string;
  terraformSourceName?: string;
  eksSourceName?: string;
}
export type String2048 = string;
export type AppComponentNameList = string[];
export interface CreateAppVersionResourceRequest {
  appArn: string;
  resourceName?: string;
  logicalResourceId: LogicalResourceId;
  physicalResourceId: string;
  awsRegion?: string;
  awsAccountId?: string;
  resourceType: string;
  appComponents: string[];
  additionalInfo?: { [key: string]: string[] | undefined };
  clientToken?: string;
}
export type AppComponentList = AppComponent[];
export type ResourceSourceType = "AppTemplate" | "Discovered" | (string & {});
export interface PhysicalResource {
  resourceName?: string;
  logicalResourceId: LogicalResourceId;
  physicalResourceId: PhysicalResourceId;
  resourceType: string;
  appComponents?: AppComponent[];
  additionalInfo?: { [key: string]: string[] | undefined };
  excluded?: boolean;
  sourceType?: ResourceSourceType;
  parentResourceName?: string;
}
export interface CreateAppVersionResourceResponse {
  appArn: string;
  appVersion: string;
  physicalResource?: PhysicalResource;
}
export type Uuid = string;
export type RecommendationIdList = string[];
export type TemplateFormat = "CfnYaml" | "CfnJson" | (string & {});
export type RenderRecommendationType = "Alarm" | "Sop" | "Test" | (string & {});
export type RenderRecommendationTypeList = RenderRecommendationType[];
export interface CreateRecommendationTemplateRequest {
  recommendationIds?: string[];
  format?: TemplateFormat;
  recommendationTypes?: RenderRecommendationType[];
  assessmentArn: string;
  name: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
  bucketName?: string;
}
export interface S3Location {
  bucket?: string;
  prefix?: string;
}
export type RecommendationTemplateStatus =
  | "Pending"
  | "InProgress"
  | "Failed"
  | "Success"
  | (string & {});
export interface RecommendationTemplate {
  templatesLocation?: S3Location;
  assessmentArn: string;
  appArn?: string;
  recommendationIds?: string[];
  recommendationTypes: RenderRecommendationType[];
  format: TemplateFormat;
  recommendationTemplateArn: string;
  message?: string;
  status: RecommendationTemplateStatus;
  name: string;
  startTime?: Date;
  endTime?: Date;
  tags?: { [key: string]: string | undefined };
  needsReplacements?: boolean;
}
export interface CreateRecommendationTemplateResponse {
  recommendationTemplate?: RecommendationTemplate;
}
export type DataLocationConstraint =
  | "AnyLocation"
  | "SameContinent"
  | "SameCountry"
  | (string & {});
export type ResiliencyPolicyTier =
  | "MissionCritical"
  | "Critical"
  | "Important"
  | "CoreServices"
  | "NonCritical"
  | "NotApplicable"
  | (string & {});
export type DisruptionType = "Software" | "Hardware" | "AZ" | "Region" | (string & {});
export type Seconds = number;
export interface FailurePolicy {
  rtoInSecs: number;
  rpoInSecs: number;
}
export type DisruptionPolicy = { [key in DisruptionType]?: FailurePolicy };
export interface CreateResiliencyPolicyRequest {
  policyName: string;
  policyDescription?: string;
  dataLocationConstraint?: DataLocationConstraint;
  tier: ResiliencyPolicyTier;
  policy: { [key: string]: FailurePolicy | undefined };
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type EstimatedCostTier = "L1" | "L2" | "L3" | "L4" | (string & {});
export interface ResiliencyPolicy {
  policyArn?: string;
  policyName?: string;
  policyDescription?: string;
  dataLocationConstraint?: DataLocationConstraint;
  tier?: ResiliencyPolicyTier;
  estimatedCostTier?: EstimatedCostTier;
  policy?: { [key: string]: FailurePolicy | undefined };
  creationTime?: Date;
  tags?: { [key: string]: string | undefined };
}
export interface CreateResiliencyPolicyResponse {
  policy: ResiliencyPolicy;
}
export interface DeleteAppRequest {
  appArn: string;
  forceDelete?: boolean;
  clientToken?: string;
}
export interface DeleteAppResponse {
  appArn: string;
}
export interface DeleteAppAssessmentRequest {
  assessmentArn: string;
  clientToken?: string;
}
export type AssessmentStatus = "Pending" | "InProgress" | "Failed" | "Success" | (string & {});
export interface DeleteAppAssessmentResponse {
  assessmentArn: string;
  assessmentStatus: AssessmentStatus;
}
export type S3Url = string;
export interface TerraformSource {
  s3StateFileUrl: string;
}
export type EksNamespace = string;
export interface EksSourceClusterNamespace {
  eksClusterArn: string;
  namespace: string;
}
export interface DeleteAppInputSourceRequest {
  appArn: string;
  sourceArn?: string;
  terraformSource?: TerraformSource;
  clientToken?: string;
  eksSourceClusterNamespace?: EksSourceClusterNamespace;
}
export interface AppInputSource {
  sourceName?: string;
  importType: ResourceMappingType;
  sourceArn?: string;
  terraformSource?: TerraformSource;
  resourceCount?: number;
  eksSourceClusterNamespace?: EksSourceClusterNamespace;
}
export interface DeleteAppInputSourceResponse {
  appArn?: string;
  appInputSource?: AppInputSource;
}
export interface DeleteAppVersionAppComponentRequest {
  appArn: string;
  id: string;
  clientToken?: string;
}
export interface DeleteAppVersionAppComponentResponse {
  appArn: string;
  appVersion: string;
  appComponent?: AppComponent;
}
export interface DeleteAppVersionResourceRequest {
  appArn: string;
  resourceName?: string;
  logicalResourceId?: LogicalResourceId;
  physicalResourceId?: string;
  awsRegion?: string;
  awsAccountId?: string;
  clientToken?: string;
}
export interface DeleteAppVersionResourceResponse {
  appArn: string;
  appVersion: string;
  physicalResource?: PhysicalResource;
}
export interface DeleteRecommendationTemplateRequest {
  recommendationTemplateArn: string;
  clientToken?: string;
}
export interface DeleteRecommendationTemplateResponse {
  recommendationTemplateArn: string;
  status: RecommendationTemplateStatus;
}
export interface DeleteResiliencyPolicyRequest {
  policyArn: string;
  clientToken?: string;
}
export interface DeleteResiliencyPolicyResponse {
  policyArn: string;
}
export interface DescribeAppRequest {
  appArn: string;
}
export interface DescribeAppResponse {
  app: App;
}
export interface DescribeAppAssessmentRequest {
  assessmentArn: string;
}
export type AssessmentInvoker = "User" | "System" | (string & {});
export type CurrencyCode = string;
export type CostFrequency = "Hourly" | "Daily" | "Monthly" | "Yearly" | (string & {});
export interface Cost {
  amount: number;
  currency: string;
  frequency: CostFrequency;
}
export type DisruptionResiliencyScore = { [key in DisruptionType]?: number };
export type ResiliencyScoreType = "Compliance" | "Test" | "Alarm" | "Sop" | (string & {});
export interface ScoringComponentResiliencyScore {
  score?: number;
  possibleScore?: number;
  outstandingCount?: number;
  excludedCount?: number;
}
export type ScoringComponentResiliencyScores = {
  [key in ResiliencyScoreType]?: ScoringComponentResiliencyScore;
};
export interface ResiliencyScore {
  score: number;
  disruptionScore: { [key: string]: number | undefined };
  componentScore?: { [key: string]: ScoringComponentResiliencyScore | undefined };
}
export type ComplianceStatus =
  | "PolicyBreached"
  | "PolicyMet"
  | "NotApplicable"
  | "MissingPolicy"
  | (string & {});
export interface DisruptionCompliance {
  achievableRtoInSecs?: number;
  currentRtoInSecs?: number;
  rtoReferenceId?: string;
  rtoDescription?: string;
  currentRpoInSecs?: number;
  rpoReferenceId?: string;
  rpoDescription?: string;
  complianceStatus: ComplianceStatus;
  achievableRpoInSecs?: number;
  message?: string;
}
export type AssessmentCompliance = { [key in DisruptionType]?: DisruptionCompliance };
export interface ResourceError {
  logicalResourceId?: string;
  physicalResourceId?: string;
  reason?: string;
}
export type ResourceErrorList = ResourceError[];
export interface ResourceErrorsDetails {
  resourceErrors?: ResourceError[];
  hasMoreErrors?: boolean;
}
export type DriftStatus = "NotChecked" | "NotDetected" | "Detected" | (string & {});
export interface AssessmentRiskRecommendation {
  risk?: string;
  recommendation?: string;
  appComponents?: string[];
}
export type AssessmentRiskRecommendationList = AssessmentRiskRecommendation[];
export interface AssessmentSummary {
  summary?: string;
  riskRecommendations?: AssessmentRiskRecommendation[];
}
export interface AppAssessment {
  appArn?: string;
  appVersion?: string;
  invoker: AssessmentInvoker;
  cost?: Cost;
  resiliencyScore?: ResiliencyScore;
  compliance?: { [key: string]: DisruptionCompliance | undefined };
  complianceStatus?: ComplianceStatus;
  assessmentStatus: AssessmentStatus;
  startTime?: Date;
  endTime?: Date;
  message?: string;
  assessmentName?: string;
  assessmentArn: string;
  policy?: ResiliencyPolicy;
  tags?: { [key: string]: string | undefined };
  resourceErrorsDetails?: ResourceErrorsDetails;
  versionName?: string;
  driftStatus?: DriftStatus;
  summary?: AssessmentSummary;
}
export interface DescribeAppAssessmentResponse {
  assessment: AppAssessment;
}
export interface DescribeAppVersionRequest {
  appArn: string;
  appVersion: string;
}
export interface DescribeAppVersionResponse {
  appArn: string;
  appVersion: string;
  additionalInfo?: { [key: string]: string[] | undefined };
}
export interface DescribeAppVersionAppComponentRequest {
  appArn: string;
  appVersion: string;
  id: string;
}
export interface DescribeAppVersionAppComponentResponse {
  appArn: string;
  appVersion: string;
  appComponent?: AppComponent;
}
export interface DescribeAppVersionResourceRequest {
  appArn: string;
  appVersion: string;
  resourceName?: string;
  logicalResourceId?: LogicalResourceId;
  physicalResourceId?: string;
  awsRegion?: string;
  awsAccountId?: string;
}
export interface DescribeAppVersionResourceResponse {
  appArn: string;
  appVersion: string;
  physicalResource?: PhysicalResource;
}
export interface DescribeAppVersionResourcesResolutionStatusRequest {
  appArn: string;
  appVersion: string;
  resolutionId?: string;
}
export type ResourceResolutionStatusType =
  | "Pending"
  | "InProgress"
  | "Failed"
  | "Success"
  | (string & {});
export interface DescribeAppVersionResourcesResolutionStatusResponse {
  appArn: string;
  appVersion: string;
  resolutionId: string;
  status: ResourceResolutionStatusType;
  errorMessage?: string;
}
export interface DescribeAppVersionTemplateRequest {
  appArn: string;
  appVersion: string;
}
export type AppTemplateBody = string;
export interface DescribeAppVersionTemplateResponse {
  appArn: string;
  appVersion: string;
  appTemplateBody: string;
}
export interface DescribeDraftAppVersionResourcesImportStatusRequest {
  appArn: string;
}
export type ResourceImportStatusType =
  | "Pending"
  | "InProgress"
  | "Failed"
  | "Success"
  | (string & {});
export interface ErrorDetail {
  errorMessage?: string;
}
export type ErrorDetailList = ErrorDetail[];
export interface DescribeDraftAppVersionResourcesImportStatusResponse {
  appArn: string;
  appVersion: string;
  status: ResourceImportStatusType;
  statusChangeTime: Date;
  errorMessage?: string;
  errorDetails?: ErrorDetail[];
}
export interface DescribeMetricsExportRequest {
  metricsExportId: string;
}
export type MetricsExportStatusType =
  | "Pending"
  | "InProgress"
  | "Failed"
  | "Success"
  | (string & {});
export interface DescribeMetricsExportResponse {
  metricsExportId: string;
  status: MetricsExportStatusType;
  exportLocation?: S3Location;
  errorMessage?: string;
}
export interface DescribeResiliencyPolicyRequest {
  policyArn: string;
}
export interface DescribeResiliencyPolicyResponse {
  policy: ResiliencyPolicy;
}
export interface DescribeResourceGroupingRecommendationTaskRequest {
  appArn: string;
  groupingId?: string;
}
export type ResourcesGroupingRecGenStatusType =
  | "Pending"
  | "InProgress"
  | "Failed"
  | "Success"
  | (string & {});
export interface DescribeResourceGroupingRecommendationTaskResponse {
  groupingId: string;
  status: ResourcesGroupingRecGenStatusType;
  errorMessage?: string;
}
export type ArnList = string[];
export type TerraformSourceList = TerraformSource[];
export type ResourceImportStrategyType = "AddOnly" | "ReplaceAll" | (string & {});
export type EksNamespaceList = string[];
export interface EksSource {
  eksClusterArn: string;
  namespaces: string[];
}
export type EksSourceList = EksSource[];
export interface ImportResourcesToDraftAppVersionRequest {
  appArn: string;
  sourceArns?: string[];
  terraformSources?: TerraformSource[];
  importStrategy?: ResourceImportStrategyType;
  eksSources?: EksSource[];
}
export interface ImportResourcesToDraftAppVersionResponse {
  appArn: string;
  appVersion: string;
  sourceArns?: string[];
  status: ResourceImportStatusType;
  terraformSources?: TerraformSource[];
  eksSources?: EksSource[];
}
export type NextToken = string;
export type MaxResults = number;
export interface ListAlarmRecommendationsRequest {
  assessmentArn: string;
  nextToken?: string;
  maxResults?: number;
}
export type AlarmType = "Metric" | "Composite" | "Canary" | "Logs" | "Event" | (string & {});
export type EntityId = string;
export interface Experiment {
  experimentArn?: string;
  experimentTemplateId?: string;
}
export interface Alarm {
  alarmArn?: string;
  source?: string;
}
export interface RecommendationItem {
  resourceId?: string;
  targetAccountId?: string;
  targetRegion?: string;
  alreadyImplemented?: boolean;
  excluded?: boolean;
  excludeReason?: ExcludeRecommendationReason;
  latestDiscoveredExperiment?: Experiment;
  discoveredAlarm?: Alarm;
}
export type RecommendationItemList = RecommendationItem[];
export type RecommendationStatus =
  | "Implemented"
  | "Inactive"
  | "NotImplemented"
  | "Excluded"
  | (string & {});
export interface AlarmRecommendation {
  recommendationId: string;
  referenceId: string;
  name: string;
  description?: string;
  type: AlarmType;
  appComponentName?: string;
  items?: RecommendationItem[];
  prerequisite?: string;
  appComponentNames?: string[];
  recommendationStatus?: RecommendationStatus;
}
export type AlarmRecommendationList = AlarmRecommendation[];
export interface ListAlarmRecommendationsResponse {
  alarmRecommendations: AlarmRecommendation[];
  nextToken?: string;
}
export interface ListAppAssessmentComplianceDriftsRequest {
  assessmentArn: string;
  nextToken?: string;
  maxResults?: number;
}
export type DriftType =
  | "ApplicationCompliance"
  | "AppComponentResiliencyComplianceStatus"
  | (string & {});
export type DifferenceType = "NotEqual" | "Added" | "Removed" | (string & {});
export interface ComplianceDrift {
  entityId?: string;
  entityType?: string;
  driftType?: DriftType;
  appId?: string;
  appVersion?: string;
  expectedReferenceId?: string;
  expectedValue?: { [key: string]: DisruptionCompliance | undefined };
  actualReferenceId?: string;
  actualValue?: { [key: string]: DisruptionCompliance | undefined };
  diffType?: DifferenceType;
}
export type ComplianceDriftList = ComplianceDrift[];
export interface ListAppAssessmentComplianceDriftsResponse {
  complianceDrifts: ComplianceDrift[];
  nextToken?: string;
}
export interface ListAppAssessmentResourceDriftsRequest {
  assessmentArn: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ResourceIdentifier {
  logicalResourceId?: LogicalResourceId;
  resourceType?: string;
}
export interface ResourceDrift {
  appArn?: string;
  appVersion?: string;
  referenceId?: string;
  resourceIdentifier?: ResourceIdentifier;
  diffType?: DifferenceType;
}
export type ResourceDriftList = ResourceDrift[];
export interface ListAppAssessmentResourceDriftsResponse {
  resourceDrifts: ResourceDrift[];
  nextToken?: string;
}
export type AssessmentStatusList = AssessmentStatus[];
export interface ListAppAssessmentsRequest {
  appArn?: string;
  assessmentName?: string;
  assessmentStatus?: AssessmentStatus[];
  complianceStatus?: ComplianceStatus;
  invoker?: AssessmentInvoker;
  reverseOrder?: boolean;
  nextToken?: string;
  maxResults?: number;
}
export interface AppAssessmentSummary {
  appArn?: string;
  appVersion?: string;
  assessmentStatus: AssessmentStatus;
  invoker?: AssessmentInvoker;
  startTime?: Date;
  endTime?: Date;
  message?: string;
  assessmentName?: string;
  assessmentArn: string;
  complianceStatus?: ComplianceStatus;
  cost?: Cost;
  resiliencyScore?: number;
  versionName?: string;
  driftStatus?: DriftStatus;
}
export type AppAssessmentSummaryList = AppAssessmentSummary[];
export interface ListAppAssessmentsResponse {
  nextToken?: string;
  assessmentSummaries: AppAssessmentSummary[];
}
export interface ListAppComponentCompliancesRequest {
  nextToken?: string;
  maxResults?: number;
  assessmentArn: string;
}
export interface AppComponentCompliance {
  cost?: Cost;
  appComponentName?: string;
  compliance?: { [key: string]: DisruptionCompliance | undefined };
  message?: string;
  status?: ComplianceStatus;
  resiliencyScore?: ResiliencyScore;
}
export type ComponentCompliancesList = AppComponentCompliance[];
export interface ListAppComponentCompliancesResponse {
  componentCompliances: AppComponentCompliance[];
  nextToken?: string;
}
export interface ListAppComponentRecommendationsRequest {
  assessmentArn: string;
  nextToken?: string;
  maxResults?: number;
}
export type RecommendationComplianceStatus =
  | "BreachedUnattainable"
  | "BreachedCanMeet"
  | "MetCanImprove"
  | "MissingPolicy"
  | (string & {});
export interface RecommendationDisruptionCompliance {
  expectedComplianceStatus: ComplianceStatus;
  expectedRtoInSecs?: number;
  expectedRtoDescription?: string;
  expectedRpoInSecs?: number;
  expectedRpoDescription?: string;
}
export type RecommendationCompliance = {
  [key in DisruptionType]?: RecommendationDisruptionCompliance;
};
export type ConfigRecommendationOptimizationType =
  | "LeastCost"
  | "LeastChange"
  | "BestAZRecovery"
  | "LeastErrors"
  | "BestAttainable"
  | "BestRegionRecovery"
  | (string & {});
export type SuggestedChangesList = string[];
export type HaArchitecture =
  | "MultiSite"
  | "WarmStandby"
  | "PilotLight"
  | "BackupAndRestore"
  | "NoRecoveryPlan"
  | (string & {});
export interface ConfigRecommendation {
  cost?: Cost;
  appComponentName?: string;
  compliance?: { [key: string]: DisruptionCompliance | undefined };
  recommendationCompliance?: { [key: string]: RecommendationDisruptionCompliance | undefined };
  optimizationType: ConfigRecommendationOptimizationType;
  name: string;
  description?: string;
  suggestedChanges?: string[];
  haArchitecture?: HaArchitecture;
  referenceId: string;
}
export type ConfigRecommendationList = ConfigRecommendation[];
export interface ComponentRecommendation {
  appComponentName: string;
  recommendationStatus: RecommendationComplianceStatus;
  configRecommendations: ConfigRecommendation[];
}
export type ComponentRecommendationList = ComponentRecommendation[];
export interface ListAppComponentRecommendationsResponse {
  componentRecommendations: ComponentRecommendation[];
  nextToken?: string;
}
export interface ListAppInputSourcesRequest {
  appArn: string;
  appVersion: string;
  nextToken?: string;
  maxResults?: number;
}
export type AppInputSourceList = AppInputSource[];
export interface ListAppInputSourcesResponse {
  appInputSources: AppInputSource[];
  nextToken?: string;
}
export interface ListAppsRequest {
  nextToken?: string;
  maxResults?: number;
  name?: string;
  appArn?: string;
  fromLastAssessmentTime?: Date;
  toLastAssessmentTime?: Date;
  reverseOrder?: boolean;
  awsApplicationArn?: string;
}
export interface AppSummary {
  appArn: string;
  name: string;
  description?: string;
  creationTime: Date;
  complianceStatus?: AppComplianceStatusType;
  resiliencyScore?: number;
  assessmentSchedule?: AppAssessmentScheduleType;
  status?: AppStatusType;
  driftStatus?: AppDriftStatusType;
  lastAppComplianceEvaluationTime?: Date;
  rtoInSecs?: number;
  rpoInSecs?: number;
  awsApplicationArn?: string;
}
export type AppSummaryList = AppSummary[];
export interface ListAppsResponse {
  appSummaries: AppSummary[];
  nextToken?: string;
}
export interface ListAppVersionAppComponentsRequest {
  appArn: string;
  appVersion: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListAppVersionAppComponentsResponse {
  appArn: string;
  appVersion: string;
  appComponents?: AppComponent[];
  nextToken?: string;
}
export interface ListAppVersionResourceMappingsRequest {
  appArn: string;
  appVersion: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListAppVersionResourceMappingsResponse {
  resourceMappings: ResourceMapping[];
  nextToken?: string;
}
export interface ListAppVersionResourcesRequest {
  appArn: string;
  appVersion: string;
  resolutionId?: string;
  nextToken?: string;
  maxResults?: number;
}
export type PhysicalResourceList = PhysicalResource[];
export interface ListAppVersionResourcesResponse {
  physicalResources: PhysicalResource[];
  resolutionId: string;
  nextToken?: string;
}
export interface ListAppVersionsRequest {
  appArn: string;
  nextToken?: string;
  maxResults?: number;
  startTime?: Date;
  endTime?: Date;
}
export interface AppVersionSummary {
  appVersion: string;
  identifier?: number;
  creationTime?: Date;
  versionName?: string;
}
export type AppVersionList = AppVersionSummary[];
export interface ListAppVersionsResponse {
  appVersions: AppVersionSummary[];
  nextToken?: string;
}
export type FieldAggregationType = "Min" | "Max" | "Sum" | "Avg" | "Count" | (string & {});
export interface Field {
  name: string;
  aggregation?: FieldAggregationType;
}
export type FieldList = Field[];
export type ConditionOperatorType =
  | "Equals"
  | "NotEquals"
  | "GreaterThen"
  | "GreaterOrEquals"
  | "LessThen"
  | "LessOrEquals"
  | (string & {});
export interface Condition {
  field: string;
  operator: ConditionOperatorType;
  value?: string;
}
export type ConditionList = Condition[];
export interface Sort {
  field: string;
  ascending?: boolean;
}
export type SortList = Sort[];
export interface ListMetricsRequest {
  nextToken?: string;
  maxResults?: number;
  fields?: Field[];
  dataSource?: string;
  conditions?: Condition[];
  sorts?: Sort[];
}
export type Row = string[];
export type RowList = string[][];
export interface ListMetricsResponse {
  rows: string[][];
  nextToken?: string;
}
export type RecommendationTemplateStatusList = RecommendationTemplateStatus[];
export interface ListRecommendationTemplatesRequest {
  assessmentArn?: string;
  reverseOrder?: boolean;
  status?: RecommendationTemplateStatus[];
  recommendationTemplateArn?: string;
  name?: string;
  nextToken?: string;
  maxResults?: number;
}
export type RecommendationTemplateList = RecommendationTemplate[];
export interface ListRecommendationTemplatesResponse {
  nextToken?: string;
  recommendationTemplates?: RecommendationTemplate[];
}
export interface ListResiliencyPoliciesRequest {
  policyName?: string;
  nextToken?: string;
  maxResults?: number;
}
export type ResiliencyPolicies = ResiliencyPolicy[];
export interface ListResiliencyPoliciesResponse {
  resiliencyPolicies: ResiliencyPolicy[];
  nextToken?: string;
}
export interface ListResourceGroupingRecommendationsRequest {
  appArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface GroupingAppComponent {
  appComponentId: string;
  appComponentType: string;
  appComponentName: string;
}
export type String255List = string[];
export interface GroupingResource {
  resourceName: string;
  resourceType: string;
  physicalResourceId: PhysicalResourceId;
  logicalResourceId: LogicalResourceId;
  sourceAppComponentIds: string[];
}
export type GroupingResourceList = GroupingResource[];
export type GroupingRecommendationStatusType =
  | "Accepted"
  | "Rejected"
  | "PendingDecision"
  | (string & {});
export type GroupingRecommendationConfidenceLevel = "High" | "Medium" | (string & {});
export type GroupingRecommendationRejectionReason =
  | "DistinctBusinessPurpose"
  | "SeparateDataConcern"
  | "DistinctUserGroupHandling"
  | "Other"
  | (string & {});
export interface GroupingRecommendation {
  groupingRecommendationId: string;
  groupingAppComponent: GroupingAppComponent;
  resources: GroupingResource[];
  score: number;
  recommendationReasons: string[];
  status: GroupingRecommendationStatusType;
  confidenceLevel: GroupingRecommendationConfidenceLevel;
  creationTime: Date;
  rejectionReason?: GroupingRecommendationRejectionReason;
}
export type GroupingRecommendationList = GroupingRecommendation[];
export interface ListResourceGroupingRecommendationsResponse {
  groupingRecommendations: GroupingRecommendation[];
  nextToken?: string;
}
export interface ListSopRecommendationsRequest {
  nextToken?: string;
  maxResults?: number;
  assessmentArn: string;
}
export type SopServiceType = "SSM" | (string & {});
export type DocumentName = string;
export interface SopRecommendation {
  serviceType: SopServiceType;
  appComponentName?: string;
  description?: string;
  recommendationId: string;
  name?: string;
  items?: RecommendationItem[];
  referenceId: string;
  prerequisite?: string;
  recommendationStatus?: RecommendationStatus;
}
export type SopRecommendationList = SopRecommendation[];
export interface ListSopRecommendationsResponse {
  nextToken?: string;
  sopRecommendations: SopRecommendation[];
}
export interface ListSuggestedResiliencyPoliciesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface ListSuggestedResiliencyPoliciesResponse {
  resiliencyPolicies: ResiliencyPolicy[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListTestRecommendationsRequest {
  nextToken?: string;
  maxResults?: number;
  assessmentArn: string;
}
export type TestRisk = "Small" | "Medium" | "High" | (string & {});
export type TestType = "Software" | "Hardware" | "AZ" | "Region" | (string & {});
export type AlarmReferenceIdList = string[];
export interface TestRecommendation {
  recommendationId?: string;
  referenceId: string;
  appComponentId?: string;
  appComponentName?: string;
  name?: string;
  intent?: string;
  risk?: TestRisk;
  type?: TestType;
  description?: string;
  items?: RecommendationItem[];
  prerequisite?: string;
  dependsOnAlarms?: string[];
  recommendationStatus?: RecommendationStatus;
}
export type TestRecommendationList = TestRecommendation[];
export interface ListTestRecommendationsResponse {
  nextToken?: string;
  testRecommendations: TestRecommendation[];
}
export interface ListUnsupportedAppVersionResourcesRequest {
  appArn: string;
  appVersion: string;
  resolutionId?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface UnsupportedResource {
  logicalResourceId: LogicalResourceId;
  physicalResourceId: PhysicalResourceId;
  resourceType: string;
  unsupportedResourceStatus?: string;
}
export type UnsupportedResourceList = UnsupportedResource[];
export interface ListUnsupportedAppVersionResourcesResponse {
  unsupportedResources: UnsupportedResource[];
  resolutionId: string;
  nextToken?: string;
}
export interface PublishAppVersionRequest {
  appArn: string;
  versionName?: string;
}
export interface PublishAppVersionResponse {
  appArn: string;
  appVersion?: string;
  identifier?: number;
  versionName?: string;
}
export interface PutDraftAppVersionTemplateRequest {
  appArn: string;
  appTemplateBody: string;
}
export interface PutDraftAppVersionTemplateResponse {
  appArn?: string;
  appVersion?: string;
}
export interface RejectGroupingRecommendationEntry {
  groupingRecommendationId: string;
  rejectionReason?: GroupingRecommendationRejectionReason;
}
export type RejectGroupingRecommendationEntries = RejectGroupingRecommendationEntry[];
export interface RejectResourceGroupingRecommendationsRequest {
  appArn: string;
  entries: RejectGroupingRecommendationEntry[];
}
export interface RejectResourceGroupingRecommendationsResponse {
  appArn: string;
  failedEntries: FailedGroupingRecommendationEntry[];
}
export type EntityNameList = string[];
export interface RemoveDraftAppVersionResourceMappingsRequest {
  appArn: string;
  resourceNames?: string[];
  logicalStackNames?: string[];
  appRegistryAppNames?: string[];
  resourceGroupNames?: string[];
  terraformSourceNames?: string[];
  eksSourceNames?: string[];
}
export interface RemoveDraftAppVersionResourceMappingsResponse {
  appArn?: string;
  appVersion?: string;
}
export interface ResolveAppVersionResourcesRequest {
  appArn: string;
  appVersion: string;
}
export interface ResolveAppVersionResourcesResponse {
  appArn: string;
  appVersion: string;
  resolutionId: string;
  status: ResourceResolutionStatusType;
}
export interface StartAppAssessmentRequest {
  appArn: string;
  appVersion: string;
  assessmentName: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface StartAppAssessmentResponse {
  assessment: AppAssessment;
}
export interface StartMetricsExportRequest {
  bucketName?: string;
  clientToken?: string;
}
export interface StartMetricsExportResponse {
  metricsExportId: string;
  status: MetricsExportStatusType;
}
export interface StartResourceGroupingRecommendationTaskRequest {
  appArn: string;
}
export interface StartResourceGroupingRecommendationTaskResponse {
  appArn: string;
  groupingId: string;
  status: ResourcesGroupingRecGenStatusType;
  errorMessage?: string;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAppRequest {
  appArn: string;
  description?: string;
  policyArn?: string;
  clearResiliencyPolicyArn?: boolean;
  assessmentSchedule?: AppAssessmentScheduleType;
  permissionModel?: PermissionModel;
  eventSubscriptions?: EventSubscription[];
}
export interface UpdateAppResponse {
  app: App;
}
export interface UpdateAppVersionRequest {
  appArn: string;
  additionalInfo?: { [key: string]: string[] | undefined };
}
export interface UpdateAppVersionResponse {
  appArn: string;
  appVersion: string;
  additionalInfo?: { [key: string]: string[] | undefined };
}
export interface UpdateAppVersionAppComponentRequest {
  appArn: string;
  id: string;
  name?: string;
  type?: string;
  additionalInfo?: { [key: string]: string[] | undefined };
}
export interface UpdateAppVersionAppComponentResponse {
  appArn: string;
  appVersion: string;
  appComponent?: AppComponent;
}
export interface UpdateAppVersionResourceRequest {
  appArn: string;
  resourceName?: string;
  logicalResourceId?: LogicalResourceId;
  physicalResourceId?: string;
  awsRegion?: string;
  awsAccountId?: string;
  resourceType?: string;
  appComponents?: string[];
  additionalInfo?: { [key: string]: string[] | undefined };
  excluded?: boolean;
}
export interface UpdateAppVersionResourceResponse {
  appArn: string;
  appVersion: string;
  physicalResource?: PhysicalResource;
}
export interface UpdateResiliencyPolicyRequest {
  policyArn: string;
  policyName?: string;
  policyDescription?: string;
  dataLocationConstraint?: DataLocationConstraint;
  tier?: ResiliencyPolicyTier;
  policy?: { [key: string]: FailurePolicy | undefined };
}
export interface UpdateResiliencyPolicyResponse {
  policy: ResiliencyPolicy;
}
export type ResourceId = string;
export type ResourceType = string;
export type RetryAfterSeconds = number;
export type AcceptResourceGroupingRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Accepts the resource grouping recommendations suggested by Resilience Hub for your application.
 */
export const acceptResourceGroupingRecommendations: API.OperationMethod<
  AcceptResourceGroupingRecommendationsRequest,
  AcceptResourceGroupingRecommendationsResponse,
  AcceptResourceGroupingRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1378, __c86, 2) as any as S.Schema<AcceptResourceGroupingRecommendationsRequest>,
  output: __S(1394, __c87, 2) as any as S.Schema<AcceptResourceGroupingRecommendationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AcceptResourceGroupingRecommendations",
}));

export type AddDraftAppVersionResourceMappingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds the source of resource-maps to the draft version of an application. During
 * assessment, Resilience Hub will use these resource-maps to resolve the latest physical
 * ID for each resource in the application template. For more information about different types
 * of resources supported by Resilience Hub and how to add them in your application, see
 * Step
 * 2: How is your application managed? in the Resilience Hub User Guide.
 */
export const addDraftAppVersionResourceMappings: API.OperationMethod<
  AddDraftAppVersionResourceMappingsRequest,
  AddDraftAppVersionResourceMappingsResponse,
  AddDraftAppVersionResourceMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c88, 0) as any as S.Schema<AddDraftAppVersionResourceMappingsRequest>,
  output: __S(1409, __c88, 1) as any as S.Schema<AddDraftAppVersionResourceMappingsResponse>,
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
  operationName: "AddDraftAppVersionResourceMappings",
}));

export type BatchUpdateRecommendationStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Enables you to include or exclude one or more operational recommendations.
 */
export const batchUpdateRecommendationStatus: API.OperationMethod<
  BatchUpdateRecommendationStatusRequest,
  BatchUpdateRecommendationStatusResponse,
  BatchUpdateRecommendationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1459, __c91, 3) as any as S.Schema<BatchUpdateRecommendationStatusRequest>,
  output: __S(1462, __c91, 6) as any as S.Schema<BatchUpdateRecommendationStatusResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateRecommendationStatus",
}));

export type CreateAppError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Resilience Hub application. An Resilience Hub application is a
 * collection of Amazon Web Services resources structured to prevent and recover Amazon Web Services application disruptions. To describe a Resilience Hub application, you provide an
 * application name, resources from one or more CloudFormation stacks, Resource Groups, Terraform state files, AppRegistry applications, and an appropriate
 * resiliency policy. In addition, you can also add resources that are located on Amazon Elastic Kubernetes Service (Amazon EKS) clusters as optional resources. For more information
 * about the number of resources supported per application, see Service
 * quotas.
 *
 * After you create an Resilience Hub application, you publish it so that you can run
 * a resiliency assessment on it. You can then use recommendations from the assessment to improve
 * resiliency by running another assessment, comparing results, and then iterating the process
 * until you achieve your goals for recovery time objective (RTO) and recovery point objective
 * (RPO).
 */
export const createApp: API.OperationMethod<
  CreateAppRequest,
  CreateAppResponse,
  CreateAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateAppRequest>,
  output: __S(52, __c3, 4) as any as S.Schema<CreateAppResponse>,
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
  operationName: "CreateApp",
}));

export type CreateAppVersionAppComponentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new Application Component in the Resilience Hub application.
 *
 * This API updates the Resilience Hub application draft version. To use this
 * Application Component for running assessments, you must publish the Resilience Hub
 * application using the `PublishAppVersion` API.
 */
export const createAppVersionAppComponent: API.OperationMethod<
  CreateAppVersionAppComponentRequest,
  CreateAppVersionAppComponentResponse,
  CreateAppVersionAppComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c4, 0) as any as S.Schema<CreateAppVersionAppComponentRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<CreateAppVersionAppComponentResponse>,
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
  operationName: "CreateAppVersionAppComponent",
}));

export type CreateAppVersionResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a resource to the Resilience Hub application and assigns it to the specified
 * Application Components. If you specify a new Application Component, Resilience Hub will
 * automatically create the Application Component.
 *
 * - This action has no effect outside Resilience Hub.
 *
 * - This API updates the Resilience Hub application draft version. To use this
 * resource for running resiliency assessments, you must publish the Resilience Hub
 * application using the `PublishAppVersion` API.
 *
 * - To update application version with new `physicalResourceID`, you must
 * call `ResolveAppVersionResources` API.
 */
export const createAppVersionResource: API.OperationMethod<
  CreateAppVersionResourceRequest,
  CreateAppVersionResourceResponse,
  CreateAppVersionResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c8, 0) as any as S.Schema<CreateAppVersionResourceRequest>,
  output: __S(192, __c12, 0) as any as S.Schema<CreateAppVersionResourceResponse>,
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
  operationName: "CreateAppVersionResource",
}));

export type CreateRecommendationTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new recommendation template for the Resilience Hub application.
 */
export const createRecommendationTemplate: API.OperationMethod<
  CreateRecommendationTemplateRequest,
  CreateRecommendationTemplateResponse,
  CreateRecommendationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<CreateRecommendationTemplateRequest>,
  output: __S(209, __c13, 1) as any as S.Schema<CreateRecommendationTemplateResponse>,
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
  operationName: "CreateRecommendationTemplate",
}));

export type CreateResiliencyPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a resiliency policy for an application.
 *
 * Resilience Hub allows you to provide a value of zero for `rtoInSecs`
 * and `rpoInSecs` of your resiliency policy. But, while assessing your application,
 * the lowest possible assessment result is near zero. Hence, if you provide value zero for
 * `rtoInSecs` and `rpoInSecs`, the estimated workload RTO and
 * estimated workload RPO result will be near zero and the Compliance
 * status for your application will be set to Policy
 * breached.
 */
export const createResiliencyPolicy: API.OperationMethod<
  CreateResiliencyPolicyRequest,
  CreateResiliencyPolicyResponse,
  CreateResiliencyPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<CreateResiliencyPolicyRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<CreateResiliencyPolicyResponse>,
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
  operationName: "CreateResiliencyPolicy",
}));

export type DeleteAppError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Resilience Hub application. This is a destructive action that can't be
 * undone.
 */
export const deleteApp: API.OperationMethod<
  DeleteAppRequest,
  DeleteAppResponse,
  DeleteAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<DeleteAppRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<DeleteAppResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteApp",
}));

export type DeleteAppAssessmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Resilience Hub application assessment. This is a destructive action
 * that can't be undone.
 */
export const deleteAppAssessment: API.OperationMethod<
  DeleteAppAssessmentRequest,
  DeleteAppAssessmentResponse,
  DeleteAppAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<DeleteAppAssessmentRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<DeleteAppAssessmentResponse>,
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
  operationName: "DeleteAppAssessment",
}));

export type DeleteAppInputSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the input source and all of its imported resources from the Resilience Hub
 * application.
 */
export const deleteAppInputSource: API.OperationMethod<
  DeleteAppInputSourceRequest,
  DeleteAppInputSourceResponse,
  DeleteAppInputSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<DeleteAppInputSourceRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<DeleteAppInputSourceResponse>,
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
  operationName: "DeleteAppInputSource",
}));

export type DeleteAppVersionAppComponentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Application Component from the Resilience Hub application.
 *
 * - This API updates the Resilience Hub application draft version. To use this
 * Application Component for running assessments, you must publish the Resilience Hub
 * application using the `PublishAppVersion` API.
 *
 * - You will not be able to delete an Application Component if it has resources associated
 * with it.
 */
export const deleteAppVersionAppComponent: API.OperationMethod<
  DeleteAppVersionAppComponentRequest,
  DeleteAppVersionAppComponentResponse,
  DeleteAppVersionAppComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<DeleteAppVersionAppComponentRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<DeleteAppVersionAppComponentResponse>,
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
  operationName: "DeleteAppVersionAppComponent",
}));

export type DeleteAppVersionResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resource from the Resilience Hub application.
 *
 * - You can only delete a manually added resource. To exclude non-manually added
 * resources, use the `UpdateAppVersionResource` API.
 *
 * - This action has no effect outside Resilience Hub.
 *
 * - This API updates the Resilience Hub application draft version. To use this
 * resource for running resiliency assessments, you must publish the Resilience Hub
 * application using the `PublishAppVersion` API.
 */
export const deleteAppVersionResource: API.OperationMethod<
  DeleteAppVersionResourceRequest,
  DeleteAppVersionResourceResponse,
  DeleteAppVersionResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<DeleteAppVersionResourceRequest>,
  output: __S(192, __c12, 0) as any as S.Schema<DeleteAppVersionResourceResponse>,
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
  operationName: "DeleteAppVersionResource",
}));

export type DeleteRecommendationTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a recommendation template. This is a destructive action that can't be
 * undone.
 */
export const deleteRecommendationTemplate: API.OperationMethod<
  DeleteRecommendationTemplateRequest,
  DeleteRecommendationTemplateResponse,
  DeleteRecommendationTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<DeleteRecommendationTemplateRequest>,
  output: __S(433, __c27, 1) as any as S.Schema<DeleteRecommendationTemplateResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRecommendationTemplate",
}));

export type DeleteResiliencyPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resiliency policy. This is a destructive action that can't be undone.
 */
export const deleteResiliencyPolicy: API.OperationMethod<
  DeleteResiliencyPolicyRequest,
  DeleteResiliencyPolicyResponse,
  DeleteResiliencyPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<DeleteResiliencyPolicyRequest>,
  output: __S(449, __c28, 1) as any as S.Schema<DeleteResiliencyPolicyResponse>,
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
  operationName: "DeleteResiliencyPolicy",
}));

export type DescribeAppError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes an Resilience Hub application.
 */
export const describeApp: API.OperationMethod<
  DescribeAppRequest,
  DescribeAppResponse,
  DescribeAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<DescribeAppRequest>,
  output: __S(52, __c3, 4) as any as S.Schema<DescribeAppResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeApp",
}));

export type DescribeAppAssessmentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes an assessment for an Resilience Hub application.
 */
export const describeAppAssessment: API.OperationMethod<
  DescribeAppAssessmentRequest,
  DescribeAppAssessmentResponse,
  DescribeAppAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<DescribeAppAssessmentRequest>,
  output: __S(551, __c34, 7) as any as S.Schema<DescribeAppAssessmentResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppAssessment",
}));

export type DescribeAppVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the Resilience Hub application version.
 */
export const describeAppVersion: API.OperationMethod<
  DescribeAppVersionRequest,
  DescribeAppVersionResponse,
  DescribeAppVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<DescribeAppVersionRequest>,
  output: __S(576, __c36, 0) as any as S.Schema<DescribeAppVersionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppVersion",
}));

export type DescribeAppVersionAppComponentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes an Application Component in the Resilience Hub application.
 */
export const describeAppVersionAppComponent: API.OperationMethod<
  DescribeAppVersionAppComponentRequest,
  DescribeAppVersionAppComponentResponse,
  DescribeAppVersionAppComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<DescribeAppVersionAppComponentRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<DescribeAppVersionAppComponentResponse>,
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
  operationName: "DescribeAppVersionAppComponent",
}));

export type DescribeAppVersionResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes a resource of the Resilience Hub application.
 *
 * This API accepts only one of the following parameters to describe the resource:
 *
 * - `resourceName`
 *
 * - `logicalResourceId`
 *
 * - `physicalResourceId` (Along with `physicalResourceId`, you can
 * also provide `awsAccountId`, and `awsRegion`)
 */
export const describeAppVersionResource: API.OperationMethod<
  DescribeAppVersionResourceRequest,
  DescribeAppVersionResourceResponse,
  DescribeAppVersionResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<DescribeAppVersionResourceRequest>,
  output: __S(192, __c12, 0) as any as S.Schema<DescribeAppVersionResourceResponse>,
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
  operationName: "DescribeAppVersionResource",
}));

export type DescribeAppVersionResourcesResolutionStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the resolution status for the specified resolution identifier for an application
 * version. If `resolutionId` is not specified, the current resolution status is
 * returned.
 */
export const describeAppVersionResourcesResolutionStatus: API.OperationMethod<
  DescribeAppVersionResourcesResolutionStatusRequest,
  DescribeAppVersionResourcesResolutionStatusResponse,
  DescribeAppVersionResourcesResolutionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<DescribeAppVersionResourcesResolutionStatusRequest>,
  output: __S(
    625,
    __c39,
    1,
  ) as any as S.Schema<DescribeAppVersionResourcesResolutionStatusResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppVersionResourcesResolutionStatus",
}));

export type DescribeAppVersionTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes details about an Resilience Hub application.
 */
export const describeAppVersionTemplate: API.OperationMethod<
  DescribeAppVersionTemplateRequest,
  DescribeAppVersionTemplateResponse,
  DescribeAppVersionTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<DescribeAppVersionTemplateRequest>,
  output: __S(641, __c40, 1) as any as S.Schema<DescribeAppVersionTemplateResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeAppVersionTemplate",
}));

export type DescribeDraftAppVersionResourcesImportStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the status of importing resources to an application version.
 *
 * If you get a 404 error with
 * `ResourceImportStatusNotFoundAppMetadataException`, you must call
 * `importResourcesToDraftAppVersion` after creating the application and before
 * calling `describeDraftAppVersionResourcesImportStatus` to obtain the
 * status.
 */
export const describeDraftAppVersionResourcesImportStatus: API.OperationMethod<
  DescribeDraftAppVersionResourcesImportStatusRequest,
  DescribeDraftAppVersionResourcesImportStatusResponse,
  DescribeDraftAppVersionResourcesImportStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<DescribeDraftAppVersionResourcesImportStatusRequest>,
  output: __S(
    659,
    __c41,
    3,
  ) as any as S.Schema<DescribeDraftAppVersionResourcesImportStatusResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDraftAppVersionResourcesImportStatus",
}));

export type DescribeMetricsExportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the metrics of the application configuration being exported.
 */
export const describeMetricsExport: API.OperationMethod<
  DescribeMetricsExportRequest,
  DescribeMetricsExportResponse,
  DescribeMetricsExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<DescribeMetricsExportRequest>,
  output: __S(673, __c42, 1) as any as S.Schema<DescribeMetricsExportResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeMetricsExport",
}));

export type DescribeResiliencyPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes a specified resiliency policy for an Resilience Hub application. The
 * returned policy object includes creation time, data location constraints, the Amazon Resource
 * Name (ARN) for the policy, tags, tier, and more.
 */
export const describeResiliencyPolicy: API.OperationMethod<
  DescribeResiliencyPolicyRequest,
  DescribeResiliencyPolicyResponse,
  DescribeResiliencyPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<DescribeResiliencyPolicyRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<DescribeResiliencyPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResiliencyPolicy",
}));

export type DescribeResourceGroupingRecommendationTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Describes the resource grouping recommendation tasks run by Resilience Hub for your application.
 */
export const describeResourceGroupingRecommendationTask: API.OperationMethod<
  DescribeResourceGroupingRecommendationTaskRequest,
  DescribeResourceGroupingRecommendationTaskResponse,
  DescribeResourceGroupingRecommendationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<DescribeResourceGroupingRecommendationTaskRequest>,
  output: __S(705, __c44, 1) as any as S.Schema<DescribeResourceGroupingRecommendationTaskResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeResourceGroupingRecommendationTask",
}));

export type ImportResourcesToDraftAppVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Imports resources to Resilience Hub application draft version from different input
 * sources. For more information about the input sources supported by Resilience Hub, see
 * Discover the structure and describe your Resilience Hub application.
 */
export const importResourcesToDraftAppVersion: API.OperationMethod<
  ImportResourcesToDraftAppVersionRequest,
  ImportResourcesToDraftAppVersionResponse,
  ImportResourcesToDraftAppVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(723, __c45, 3) as any as S.Schema<ImportResourcesToDraftAppVersionRequest>,
  output: __S(724, __c45, 4) as any as S.Schema<ImportResourcesToDraftAppVersionResponse>,
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
  operationName: "ImportResourcesToDraftAppVersion",
}));

export type ListAlarmRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the alarm recommendations for an Resilience Hub application.
 */
export const listAlarmRecommendations: API.PaginatedOperationMethod<
  ListAlarmRecommendationsRequest,
  ListAlarmRecommendationsResponse,
  ListAlarmRecommendationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<ListAlarmRecommendationsRequest>,
  output: __S(739, __c46, 3) as any as S.Schema<ListAlarmRecommendationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAlarmRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAppAssessmentComplianceDriftsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List of compliance drifts that were detected while running an
 * assessment.
 */
export const listAppAssessmentComplianceDrifts: API.PaginatedOperationMethod<
  ListAppAssessmentComplianceDriftsRequest,
  ListAppAssessmentComplianceDriftsResponse,
  ListAppAssessmentComplianceDriftsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<ListAppAssessmentComplianceDriftsRequest>,
  output: __S(771, __c48, 3) as any as S.Schema<ListAppAssessmentComplianceDriftsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppAssessmentComplianceDrifts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAppAssessmentResourceDriftsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List of resource drifts that were detected while running an
 * assessment.
 */
export const listAppAssessmentResourceDrifts: API.PaginatedOperationMethod<
  ListAppAssessmentResourceDriftsRequest,
  ListAppAssessmentResourceDriftsResponse,
  ListAppAssessmentResourceDriftsError,
  Credentials | HttpClient.HttpClient,
  ResourceDrift
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<ListAppAssessmentResourceDriftsRequest>,
  output: __S(788, __c49, 4) as any as S.Schema<ListAppAssessmentResourceDriftsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppAssessmentResourceDrifts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resourceDrifts",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAppAssessmentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the assessments for an Resilience Hub application. You can use request
 * parameters to refine the results for the response object.
 */
export const listAppAssessments: API.PaginatedOperationMethod<
  ListAppAssessmentsRequest,
  ListAppAssessmentsResponse,
  ListAppAssessmentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<ListAppAssessmentsRequest>,
  output: __S(803, __c50, 3) as any as S.Schema<ListAppAssessmentsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppAssessments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAppComponentCompliancesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the compliances for an Resilience Hub Application Component.
 */
export const listAppComponentCompliances: API.PaginatedOperationMethod<
  ListAppComponentCompliancesRequest,
  ListAppComponentCompliancesResponse,
  ListAppComponentCompliancesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<ListAppComponentCompliancesRequest>,
  output: __S(819, __c51, 3) as any as S.Schema<ListAppComponentCompliancesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppComponentCompliances",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAppComponentRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the recommendations for an Resilience Hub Application Component.
 */
export const listAppComponentRecommendations: API.PaginatedOperationMethod<
  ListAppComponentRecommendationsRequest,
  ListAppComponentRecommendationsResponse,
  ListAppComponentRecommendationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<ListAppComponentRecommendationsRequest>,
  output: __S(839, __c52, 7) as any as S.Schema<ListAppComponentRecommendationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppComponentRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAppInputSourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the input sources of the Resilience Hub application. For more
 * information about the input sources supported by Resilience Hub, see Discover
 * the structure and describe your Resilience Hub application.
 */
export const listAppInputSources: API.PaginatedOperationMethod<
  ListAppInputSourcesRequest,
  ListAppInputSourcesResponse,
  ListAppInputSourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<ListAppInputSourcesRequest>,
  output: __S(850, __c53, 2) as any as S.Schema<ListAppInputSourcesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppInputSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAppsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists your Resilience Hub applications.
 *
 * You can filter applications using only one filter at a time or without using any filter.
 * If you try to filter applications using multiple filters, you will get the following
 * error:
 *
 * An error occurred (ValidationException) when calling the ListApps operation: Only
 * one filter is supported for this operation.
 */
export const listApps: API.PaginatedOperationMethod<
  ListAppsRequest,
  ListAppsResponse,
  ListAppsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<ListAppsRequest>,
  output: __S(867, __c54, 3) as any as S.Schema<ListAppsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListApps",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAppVersionAppComponentsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the Application Components in the Resilience Hub application.
 */
export const listAppVersionAppComponents: API.PaginatedOperationMethod<
  ListAppVersionAppComponentsRequest,
  ListAppVersionAppComponentsResponse,
  ListAppVersionAppComponentsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(880, __c55, 0) as any as S.Schema<ListAppVersionAppComponentsRequest>,
  output: __S(881, __c55, 1) as any as S.Schema<ListAppVersionAppComponentsResponse>,
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
  operationName: "ListAppVersionAppComponents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAppVersionResourceMappingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists how the resources in an application version are mapped/sourced from. Mappings can be
 * physical resource identifiers, CloudFormation stacks, resource-groups, or an application registry
 * app.
 */
export const listAppVersionResourceMappings: API.PaginatedOperationMethod<
  ListAppVersionResourceMappingsRequest,
  ListAppVersionResourceMappingsResponse,
  ListAppVersionResourceMappingsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(896, __c56, 0) as any as S.Schema<ListAppVersionResourceMappingsRequest>,
  output: __S(897, __c56, 1) as any as S.Schema<ListAppVersionResourceMappingsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppVersionResourceMappings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAppVersionResourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all the resources in an Resilience Hub application.
 */
export const listAppVersionResources: API.PaginatedOperationMethod<
  ListAppVersionResourcesRequest,
  ListAppVersionResourcesResponse,
  ListAppVersionResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(912, __c57, 0) as any as S.Schema<ListAppVersionResourcesRequest>,
  output: __S(914, __c57, 2) as any as S.Schema<ListAppVersionResourcesResponse>,
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
  operationName: "ListAppVersionResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAppVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the different versions for the Resilience Hub applications.
 */
export const listAppVersions: API.PaginatedOperationMethod<
  ListAppVersionsRequest,
  ListAppVersionsResponse,
  ListAppVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(928, __c58, 0) as any as S.Schema<ListAppVersionsRequest>,
  output: __S(931, __c58, 3) as any as S.Schema<ListAppVersionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAppVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMetricsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the metrics that can be exported.
 */
export const listMetrics: API.PaginatedOperationMethod<
  ListMetricsRequest,
  ListMetricsResponse,
  ListMetricsError,
  Credentials | HttpClient.HttpClient,
  String255[]
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(950, __c59, 6) as any as S.Schema<ListMetricsRequest>,
  output: __S(952, __c59, 8) as any as S.Schema<ListMetricsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMetrics",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "rows",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendationTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the recommendation templates for the Resilience Hub applications.
 */
export const listRecommendationTemplates: API.PaginatedOperationMethod<
  ListRecommendationTemplatesRequest,
  ListRecommendationTemplatesResponse,
  ListRecommendationTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(960, __c60, 0) as any as S.Schema<ListRecommendationTemplatesRequest>,
  output: __S(962, __c60, 2) as any as S.Schema<ListRecommendationTemplatesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRecommendationTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResiliencyPoliciesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the resiliency policies for the Resilience Hub applications.
 */
export const listResiliencyPolicies: API.PaginatedOperationMethod<
  ListResiliencyPoliciesRequest,
  ListResiliencyPoliciesResponse,
  ListResiliencyPoliciesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(976, __c61, 0) as any as S.Schema<ListResiliencyPoliciesRequest>,
  output: __S(993, __c62, 1) as any as S.Schema<ListResiliencyPoliciesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResiliencyPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourceGroupingRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the resource grouping recommendations suggested by Resilience Hub for your application.
 */
export const listResourceGroupingRecommendations: API.PaginatedOperationMethod<
  ListResourceGroupingRecommendationsRequest,
  ListResourceGroupingRecommendationsResponse,
  ListResourceGroupingRecommendationsError,
  Credentials | HttpClient.HttpClient,
  GroupingRecommendation
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1008, __c63, 0) as any as S.Schema<ListResourceGroupingRecommendationsRequest>,
  output: __S(1014, __c63, 6) as any as S.Schema<ListResourceGroupingRecommendationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResourceGroupingRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "groupingRecommendations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSopRecommendationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the standard operating procedure (SOP) recommendations for the Resilience Hub applications.
 */
export const listSopRecommendations: API.PaginatedOperationMethod<
  ListSopRecommendationsRequest,
  ListSopRecommendationsResponse,
  ListSopRecommendationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1024, __c64, 0) as any as S.Schema<ListSopRecommendationsRequest>,
  output: __S(1027, __c64, 3) as any as S.Schema<ListSopRecommendationsResponse>,
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
  operationName: "ListSopRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSuggestedResiliencyPoliciesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the suggested resiliency policies for the Resilience Hub
 * applications.
 */
export const listSuggestedResiliencyPolicies: API.PaginatedOperationMethod<
  ListSuggestedResiliencyPoliciesRequest,
  ListSuggestedResiliencyPoliciesResponse,
  ListSuggestedResiliencyPoliciesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1040, __c65, 0) as any as S.Schema<ListSuggestedResiliencyPoliciesRequest>,
  output: __S(993, __c62, 1) as any as S.Schema<ListSuggestedResiliencyPoliciesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSuggestedResiliencyPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
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
 * Lists the tags for your resources in your Resilience Hub applications.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c66, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1057, __c66, 1) as any as S.Schema<ListTagsForResourceResponse>,
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

export type ListTestRecommendationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the test recommendations for the Resilience Hub application.
 */
export const listTestRecommendations: API.PaginatedOperationMethod<
  ListTestRecommendationsRequest,
  ListTestRecommendationsResponse,
  ListTestRecommendationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1072, __c67, 0) as any as S.Schema<ListTestRecommendationsRequest>,
  output: __S(1075, __c67, 3) as any as S.Schema<ListTestRecommendationsResponse>,
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
  operationName: "ListTestRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListUnsupportedAppVersionResourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the resources that are not currently supported in Resilience Hub. An
 * unsupported resource is a resource that exists in the object that was used to create an app,
 * but is not supported by Resilience Hub.
 */
export const listUnsupportedAppVersionResources: API.PaginatedOperationMethod<
  ListUnsupportedAppVersionResourcesRequest,
  ListUnsupportedAppVersionResourcesResponse,
  ListUnsupportedAppVersionResourcesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1088, __c68, 0) as any as S.Schema<ListUnsupportedAppVersionResourcesRequest>,
  output: __S(1091, __c68, 3) as any as S.Schema<ListUnsupportedAppVersionResourcesResponse>,
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
  operationName: "ListUnsupportedAppVersionResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PublishAppVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Publishes a new version of a specific Resilience Hub application.
 */
export const publishAppVersion: API.OperationMethod<
  PublishAppVersionRequest,
  PublishAppVersionResponse,
  PublishAppVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1104, __c69, 0) as any as S.Schema<PublishAppVersionRequest>,
  output: __S(1105, __c69, 1) as any as S.Schema<PublishAppVersionResponse>,
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
  operationName: "PublishAppVersion",
}));

export type PutDraftAppVersionTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates the app template for an Resilience Hub application draft
 * version.
 */
export const putDraftAppVersionTemplate: API.OperationMethod<
  PutDraftAppVersionTemplateRequest,
  PutDraftAppVersionTemplateResponse,
  PutDraftAppVersionTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c70, 0) as any as S.Schema<PutDraftAppVersionTemplateRequest>,
  output: __S(1136, __c71, 0) as any as S.Schema<PutDraftAppVersionTemplateResponse>,
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
  operationName: "PutDraftAppVersionTemplate",
}));

export type RejectResourceGroupingRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Rejects resource grouping recommendations.
 */
export const rejectResourceGroupingRecommendations: API.OperationMethod<
  RejectResourceGroupingRecommendationsRequest,
  RejectResourceGroupingRecommendationsResponse,
  RejectResourceGroupingRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1154, __c72, 2) as any as S.Schema<RejectResourceGroupingRecommendationsRequest>,
  output: __S(1394, __c87, 2) as any as S.Schema<RejectResourceGroupingRecommendationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RejectResourceGroupingRecommendations",
}));

export type RemoveDraftAppVersionResourceMappingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes resource mappings from a draft application version.
 */
export const removeDraftAppVersionResourceMappings: API.OperationMethod<
  RemoveDraftAppVersionResourceMappingsRequest,
  RemoveDraftAppVersionResourceMappingsResponse,
  RemoveDraftAppVersionResourceMappingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1168, __c73, 0) as any as S.Schema<RemoveDraftAppVersionResourceMappingsRequest>,
  output: __S(1136, __c71, 0) as any as S.Schema<RemoveDraftAppVersionResourceMappingsResponse>,
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
  operationName: "RemoveDraftAppVersionResourceMappings",
}));

export type ResolveAppVersionResourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Resolves the resources for an application version.
 */
export const resolveAppVersionResources: API.OperationMethod<
  ResolveAppVersionResourcesRequest,
  ResolveAppVersionResourcesResponse,
  ResolveAppVersionResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c74, 0) as any as S.Schema<ResolveAppVersionResourcesRequest>,
  output: __S(1185, __c74, 1) as any as S.Schema<ResolveAppVersionResourcesResponse>,
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
  operationName: "ResolveAppVersionResources",
}));

export type StartAppAssessmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new application assessment for an application.
 */
export const startAppAssessment: API.OperationMethod<
  StartAppAssessmentRequest,
  StartAppAssessmentResponse,
  StartAppAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1200, __c75, 0) as any as S.Schema<StartAppAssessmentRequest>,
  output: __S(551, __c34, 7) as any as S.Schema<StartAppAssessmentResponse>,
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
  operationName: "StartAppAssessment",
}));

export type StartMetricsExportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates the export task of metrics.
 */
export const startMetricsExport: API.OperationMethod<
  StartMetricsExportRequest,
  StartMetricsExportResponse,
  StartMetricsExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c76, 0) as any as S.Schema<StartMetricsExportRequest>,
  output: __S(1217, __c76, 1) as any as S.Schema<StartMetricsExportResponse>,
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
  operationName: "StartMetricsExport",
}));

export type StartResourceGroupingRecommendationTaskError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts grouping recommendation task.
 */
export const startResourceGroupingRecommendationTask: API.OperationMethod<
  StartResourceGroupingRecommendationTaskRequest,
  StartResourceGroupingRecommendationTaskResponse,
  StartResourceGroupingRecommendationTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1232, __c77, 0) as any as S.Schema<StartResourceGroupingRecommendationTaskRequest>,
  output: __S(1233, __c77, 1) as any as S.Schema<StartResourceGroupingRecommendationTaskResponse>,
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
  operationName: "StartResourceGroupingRecommendationTask",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Applies one or more tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c78, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(1264, __c79, 0) as any as S.Schema<TagResourceResponse>,
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
 * Removes one or more tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c80, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(1264, __c79, 0) as any as S.Schema<UntagResourceResponse>,
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

export type UpdateAppError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an application.
 */
export const updateApp: API.OperationMethod<
  UpdateAppRequest,
  UpdateAppResponse,
  UpdateAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1296, __c81, 0) as any as S.Schema<UpdateAppRequest>,
  output: __S(52, __c3, 4) as any as S.Schema<UpdateAppResponse>,
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
  operationName: "UpdateApp",
}));

export type UpdateAppVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the Resilience Hub application version.
 *
 * This API updates the Resilience Hub application draft version. To use this
 * information for running resiliency assessments, you must publish the Resilience Hub
 * application using the `PublishAppVersion` API.
 */
export const updateAppVersion: API.OperationMethod<
  UpdateAppVersionRequest,
  UpdateAppVersionResponse,
  UpdateAppVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c82, 0) as any as S.Schema<UpdateAppVersionRequest>,
  output: __S(576, __c36, 0) as any as S.Schema<UpdateAppVersionResponse>,
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
  operationName: "UpdateAppVersion",
}));

export type UpdateAppVersionAppComponentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Application Component in the Resilience Hub application.
 *
 * This API updates the Resilience Hub application draft version. To use this
 * Application Component for running assessments, you must publish the Resilience Hub
 * application using the `PublishAppVersion` API.
 */
export const updateAppVersionAppComponent: API.OperationMethod<
  UpdateAppVersionAppComponentRequest,
  UpdateAppVersionAppComponentResponse,
  UpdateAppVersionAppComponentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1328, __c83, 0) as any as S.Schema<UpdateAppVersionAppComponentRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<UpdateAppVersionAppComponentResponse>,
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
  operationName: "UpdateAppVersionAppComponent",
}));

export type UpdateAppVersionResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the resource details in the Resilience Hub application.
 *
 * - This action has no effect outside Resilience Hub.
 *
 * - This API updates the Resilience Hub application draft version. To use this
 * resource for running resiliency assessments, you must publish the Resilience Hub
 * application using the `PublishAppVersion` API.
 *
 * - To update application version with new `physicalResourceID`, you must
 * call `ResolveAppVersionResources` API.
 */
export const updateAppVersionResource: API.OperationMethod<
  UpdateAppVersionResourceRequest,
  UpdateAppVersionResourceResponse,
  UpdateAppVersionResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c84, 0) as any as S.Schema<UpdateAppVersionResourceRequest>,
  output: __S(192, __c12, 0) as any as S.Schema<UpdateAppVersionResourceResponse>,
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
  operationName: "UpdateAppVersionResource",
}));

export type UpdateResiliencyPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a resiliency policy.
 *
 * Resilience Hub allows you to provide a value of zero for `rtoInSecs`
 * and `rpoInSecs` of your resiliency policy. But, while assessing your application,
 * the lowest possible assessment result is near zero. Hence, if you provide value zero for
 * `rtoInSecs` and `rpoInSecs`, the estimated workload RTO and
 * estimated workload RPO result will be near zero and the Compliance
 * status for your application will be set to Policy
 * breached.
 */
export const updateResiliencyPolicy: API.OperationMethod<
  UpdateResiliencyPolicyRequest,
  UpdateResiliencyPolicyResponse,
  UpdateResiliencyPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1360, __c85, 0) as any as S.Schema<UpdateResiliencyPolicyRequest>,
  output: __S(304, __c19, 0) as any as S.Schema<UpdateResiliencyPolicyResponse>,
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
  operationName: "UpdateResiliencyPolicy",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          policyArn: S.optional(S.String),
          tags: S.optional(__S(32, __c2, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          assessmentSchedule: S.optional(S.String),
          permissionModel: S.optional(__S(48, __c3, 0)),
          eventSubscriptions: S.optional(__S(50, __c3, 2)),
          awsApplicationArn: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/create-app" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAppRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
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
          type: S.String,
          invokerRoleName: S.optional(S.String),
          crossAccountRoleArns: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "PermissionModel" });
    case 1:
      return S.suspend(() =>
        S.Struct({ name: S.String, eventType: S.String, snsTopicArn: S.optional(S.String) }),
      ).annotate({ identifier: "EventSubscription" });
    case 2:
      return S.Array(__S(49, __c3, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          policyArn: S.optional(S.String),
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          status: S.optional(S.String),
          complianceStatus: S.optional(S.String),
          lastAppComplianceEvaluationTime: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          resiliencyScore: S.optional(S.Number),
          lastResiliencyScoreEvaluationTime: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          tags: S.optional(__S(32, __c2, 0)),
          assessmentSchedule: S.optional(S.String),
          permissionModel: S.optional(__S(48, __c3, 0)),
          eventSubscriptions: S.optional(__S(50, __c3, 2)),
          driftStatus: S.optional(S.String),
          lastDriftEvaluationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          rtoInSecs: S.optional(S.Number),
          rpoInSecs: S.optional(S.Number),
          awsApplicationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "App" });
    case 4:
      return S.suspend(() => S.Struct({ app: __S(51, __c3, 3) })).annotate({
        identifier: "CreateAppResponse",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          id: S.optional(S.String),
          name: S.String,
          type: S.String,
          additionalInfo: S.optional(__S(80, __c5, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/create-app-version-app-component" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAppVersionAppComponentRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(16, __c1, 0).pipe(S.optional));
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          id: S.optional(S.String),
          additionalInfo: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "AppComponent" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          appComponent: S.optional(__S(96, __c6, 0)),
        }),
      ).annotate({ identifier: "CreateAppVersionAppComponentResponse" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          resourceName: S.optional(S.String),
          logicalResourceId: __S(144, __c9, 0),
          physicalResourceId: S.String,
          awsRegion: S.optional(S.String),
          awsAccountId: S.optional(S.String),
          resourceType: S.String,
          appComponents: __S(16, __c1, 0),
          additionalInfo: S.optional(__S(80, __c5, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/create-app-version-resource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAppVersionResourceRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          logicalStackName: S.optional(S.String),
          resourceGroupName: S.optional(S.String),
          terraformSourceName: S.optional(S.String),
          eksSourceName: S.optional(S.String),
        }),
      ).annotate({ identifier: "LogicalResourceId" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(96, __c6, 0));
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceName: S.optional(S.String),
          logicalResourceId: __S(144, __c9, 0),
          physicalResourceId: __S(1424, __c89, 0),
          resourceType: S.String,
          appComponents: S.optional(__S(160, __c10, 0)),
          additionalInfo: S.optional(__S(80, __c5, 0)),
          excluded: S.optional(S.Boolean),
          sourceType: S.optional(S.String),
          parentResourceName: S.optional(S.String),
        }),
      ).annotate({ identifier: "PhysicalResource" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          physicalResource: S.optional(__S(176, __c11, 0)),
        }),
      ).annotate({ identifier: "CreateAppVersionResourceResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          recommendationIds: S.optional(__S(16, __c1, 0)),
          format: S.optional(S.String),
          recommendationTypes: S.optional(__S(240, __c15, 0)),
          assessmentArn: S.String,
          name: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(32, __c2, 0)),
          bucketName: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/create-recommendation-template" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateRecommendationTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ recommendationTemplate: S.optional(__S(256, __c16, 0)) }),
      ).annotate({ identifier: "CreateRecommendationTemplateResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucket: S.optional(S.String), prefix: S.optional(S.String) }),
      ).annotate({ identifier: "S3Location" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          templatesLocation: S.optional(__S(224, __c14, 0)),
          assessmentArn: S.String,
          appArn: S.optional(S.String),
          recommendationIds: S.optional(__S(16, __c1, 0)),
          recommendationTypes: __S(240, __c15, 0),
          format: S.String,
          recommendationTemplateArn: S.String,
          message: S.optional(S.String),
          status: S.String,
          name: S.String,
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(32, __c2, 0)),
          needsReplacements: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "RecommendationTemplate" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.String,
          policyDescription: S.optional(S.String),
          dataLocationConstraint: S.optional(S.String),
          tier: S.String,
          policy: __S(289, __c18, 1),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(32, __c2, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/create-resiliency-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateResiliencyPolicyRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ rtoInSecs: S.Number, rpoInSecs: S.Number })).annotate({
        identifier: "FailurePolicy",
      });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(288, __c18, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.optional(S.String),
          policyName: S.optional(S.String),
          policyDescription: S.optional(S.String),
          dataLocationConstraint: S.optional(S.String),
          tier: S.optional(S.String),
          estimatedCostTier: S.optional(S.String),
          policy: S.optional(__S(289, __c18, 1)),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "ResiliencyPolicy" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ policy: __S(290, __c18, 2) })).annotate({
        identifier: "CreateResiliencyPolicyResponse",
      });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          forceDelete: S.optional(S.Boolean),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/delete-app" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteAppRequest" });
    case 1:
      return S.suspend(() => S.Struct({ appArn: S.String })).annotate({
        identifier: "DeleteAppResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assessmentArn: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delete-app-assessment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAppAssessmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ assessmentArn: S.String, assessmentStatus: S.String }),
      ).annotate({ identifier: "DeleteAppAssessmentResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          sourceArn: S.optional(S.String),
          terraformSource: S.optional(__S(368, __c23, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          eksSourceClusterNamespace: S.optional(__S(384, __c24, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delete-app-input-source" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAppInputSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ appArn: S.optional(S.String), appInputSource: S.optional(__S(385, __c24, 1)) }),
      ).annotate({ identifier: "DeleteAppInputSourceResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ s3StateFileUrl: S.String })).annotate({
        identifier: "TerraformSource",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ eksClusterArn: S.String, namespace: S.String })).annotate({
        identifier: "EksSourceClusterNamespace",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sourceName: S.optional(S.String),
          importType: S.String,
          sourceArn: S.optional(S.String),
          terraformSource: S.optional(__S(368, __c23, 0)),
          resourceCount: S.optional(S.Number),
          eksSourceClusterNamespace: S.optional(__S(384, __c24, 0)),
        }),
      ).annotate({ identifier: "AppInputSource" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          id: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delete-app-version-app-component" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAppVersionAppComponentRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          resourceName: S.optional(S.String),
          logicalResourceId: S.optional(__S(144, __c9, 0)),
          physicalResourceId: S.optional(S.String),
          awsRegion: S.optional(S.String),
          awsAccountId: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delete-app-version-resource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAppVersionResourceRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          recommendationTemplateArn: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delete-recommendation-template" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRecommendationTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ recommendationTemplateArn: S.String, status: S.String }),
      ).annotate({ identifier: "DeleteRecommendationTemplateResponse" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delete-resiliency-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResiliencyPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ policyArn: S.String })).annotate({
        identifier: "DeleteResiliencyPolicyResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/describe-app" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DescribeAppRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assessmentArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/describe-app-assessment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAppAssessmentRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          achievableRtoInSecs: S.optional(S.Number),
          currentRtoInSecs: S.optional(S.Number),
          rtoReferenceId: S.optional(S.String),
          rtoDescription: S.optional(S.String),
          currentRpoInSecs: S.optional(S.Number),
          rpoReferenceId: S.optional(S.String),
          rpoDescription: S.optional(S.String),
          complianceStatus: S.String,
          achievableRpoInSecs: S.optional(S.Number),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "DisruptionCompliance" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(496, __c31, 0).pipe(S.optional));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ amount: S.Number, currency: S.String, frequency: S.String }),
      ).annotate({ identifier: "Cost" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          score: S.optional(S.Number),
          possibleScore: S.optional(S.Number),
          outstandingCount: S.optional(S.Number),
          excludedCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ScoringComponentResiliencyScore" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(529, __c33, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          score: S.Number,
          disruptionScore: __S(528, __c33, 0),
          componentScore: S.optional(__S(530, __c33, 2)),
        }),
      ).annotate({ identifier: "ResiliencyScore" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          logicalResourceId: S.optional(S.String),
          physicalResourceId: S.optional(S.String),
          reason: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceError" });
    case 1:
      return S.Array(__S(544, __c34, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          resourceErrors: S.optional(__S(545, __c34, 1)),
          hasMoreErrors: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ResourceErrorsDetails" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          risk: S.optional(S.String),
          recommendation: S.optional(S.String),
          appComponents: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "AssessmentRiskRecommendation" });
    case 4:
      return S.Array(__S(547, __c34, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          summary: S.optional(S.String),
          riskRecommendations: S.optional(__S(548, __c34, 4)),
        }),
      ).annotate({ identifier: "AssessmentSummary" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          appArn: S.optional(S.String),
          appVersion: S.optional(S.String),
          invoker: S.String,
          cost: S.optional(__S(512, __c32, 0)),
          resiliencyScore: S.optional(__S(531, __c33, 3)),
          compliance: S.optional(__S(497, __c31, 1)),
          complianceStatus: S.optional(S.String),
          assessmentStatus: S.String,
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          message: S.optional(S.String),
          assessmentName: S.optional(S.String),
          assessmentArn: S.String,
          policy: S.optional(__S(290, __c18, 2)),
          tags: S.optional(__S(32, __c2, 0)),
          resourceErrorsDetails: S.optional(__S(546, __c34, 2)),
          versionName: S.optional(S.String),
          driftStatus: S.optional(S.String),
          summary: S.optional(__S(549, __c34, 5)),
        }),
      ).annotate({ identifier: "AppAssessment" });
    case 7:
      return S.suspend(() => S.Struct({ assessment: __S(550, __c34, 6) })).annotate({
        identifier: "DescribeAppAssessmentResponse",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appArn: S.String, appVersion: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/describe-app-version" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAppVersionRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          additionalInfo: S.optional(__S(80, __c5, 0)),
        }),
      ).annotate({ identifier: "DescribeAppVersionResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appArn: S.String, appVersion: S.String, id: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/describe-app-version-app-component" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAppVersionAppComponentRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          resourceName: S.optional(S.String),
          logicalResourceId: S.optional(__S(144, __c9, 0)),
          physicalResourceId: S.optional(S.String),
          awsRegion: S.optional(S.String),
          awsAccountId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/describe-app-version-resource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAppVersionResourceRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          resolutionId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/describe-app-version-resources-resolution-status" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAppVersionResourcesResolutionStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          resolutionId: S.String,
          status: S.String,
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeAppVersionResourcesResolutionStatusResponse" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appArn: S.String, appVersion: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/describe-app-version-template" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeAppVersionTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ appArn: S.String, appVersion: S.String, appTemplateBody: S.String }),
      ).annotate({ identifier: "DescribeAppVersionTemplateResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/describe-draft-app-version-resources-import-status" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeDraftAppVersionResourcesImportStatusRequest" });
    case 1:
      return S.suspend(() => S.Struct({ errorMessage: S.optional(S.String) })).annotate({
        identifier: "ErrorDetail",
      });
    case 2:
      return S.Array(__S(657, __c41, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          status: S.String,
          statusChangeTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          errorMessage: S.optional(S.String),
          errorDetails: S.optional(__S(658, __c41, 2)),
        }),
      ).annotate({ identifier: "DescribeDraftAppVersionResourcesImportStatusResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ metricsExportId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/describe-metrics-export" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeMetricsExportRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          metricsExportId: S.String,
          status: S.String,
          exportLocation: S.optional(__S(224, __c14, 0)),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "DescribeMetricsExportResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/describe-resiliency-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeResiliencyPolicyRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appArn: S.String, groupingId: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/describe-resource-grouping-recommendation-task" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeResourceGroupingRecommendationTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ groupingId: S.String, status: S.String, errorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "DescribeResourceGroupingRecommendationTaskResponse" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(368, __c23, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ eksClusterArn: S.String, namespaces: __S(16, __c1, 0) }),
      ).annotate({ identifier: "EksSource" });
    case 2:
      return S.Array(__S(721, __c45, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          sourceArns: S.optional(__S(16, __c1, 0)),
          terraformSources: S.optional(__S(720, __c45, 0)),
          importStrategy: S.optional(S.String),
          eksSources: S.optional(__S(722, __c45, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/import-resources-to-draft-app-version" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ImportResourcesToDraftAppVersionRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          sourceArns: S.optional(__S(16, __c1, 0)),
          status: S.String,
          terraformSources: S.optional(__S(720, __c45, 0)),
          eksSources: S.optional(__S(722, __c45, 2)),
        }),
      ).annotate({ identifier: "ImportResourcesToDraftAppVersionResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assessmentArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-alarm-recommendations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAlarmRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recommendationId: S.String,
          referenceId: S.String,
          name: S.String,
          description: S.optional(S.String),
          type: S.String,
          appComponentName: S.optional(S.String),
          items: S.optional(__S(755, __c47, 3)),
          prerequisite: S.optional(S.String),
          appComponentNames: S.optional(__S(16, __c1, 0)),
          recommendationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "AlarmRecommendation" });
    case 2:
      return S.Array(__S(737, __c46, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ alarmRecommendations: __S(738, __c46, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAlarmRecommendationsResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          experimentArn: S.optional(S.String),
          experimentTemplateId: S.optional(S.String),
        }),
      ).annotate({ identifier: "Experiment" });
    case 1:
      return S.suspend(() =>
        S.Struct({ alarmArn: S.optional(S.String), source: S.optional(S.String) }),
      ).annotate({ identifier: "Alarm" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          resourceId: S.optional(S.String),
          targetAccountId: S.optional(S.String),
          targetRegion: S.optional(S.String),
          alreadyImplemented: S.optional(S.Boolean),
          excluded: S.optional(S.Boolean),
          excludeReason: S.optional(S.String),
          latestDiscoveredExperiment: S.optional(__S(752, __c47, 0)),
          discoveredAlarm: S.optional(__S(753, __c47, 1)),
        }),
      ).annotate({ identifier: "RecommendationItem" });
    case 3:
      return S.Array(__S(754, __c47, 2));
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assessmentArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-app-assessment-compliance-drifts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAppAssessmentComplianceDriftsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          entityId: S.optional(S.String),
          entityType: S.optional(S.String),
          driftType: S.optional(S.String),
          appId: S.optional(S.String),
          appVersion: S.optional(S.String),
          expectedReferenceId: S.optional(S.String),
          expectedValue: S.optional(__S(497, __c31, 1)),
          actualReferenceId: S.optional(S.String),
          actualValue: S.optional(__S(497, __c31, 1)),
          diffType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ComplianceDrift" });
    case 2:
      return S.Array(__S(769, __c48, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ complianceDrifts: __S(770, __c48, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAppAssessmentComplianceDriftsResponse" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assessmentArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-app-assessment-resource-drifts" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAppAssessmentResourceDriftsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          logicalResourceId: S.optional(__S(144, __c9, 0)),
          resourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceIdentifier" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          appArn: S.optional(S.String),
          appVersion: S.optional(S.String),
          referenceId: S.optional(S.String),
          resourceIdentifier: S.optional(__S(785, __c49, 1)),
          diffType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceDrift" });
    case 3:
      return S.Array(__S(786, __c49, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ resourceDrifts: __S(787, __c49, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAppAssessmentResourceDriftsResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.optional(S.String).pipe(T.HttpQuery("appArn")),
          assessmentName: S.optional(S.String).pipe(T.HttpQuery("assessmentName")),
          assessmentStatus: S.optional(__S(240, __c15, 0)).pipe(T.HttpQuery("assessmentStatus")),
          complianceStatus: S.optional(S.String).pipe(T.HttpQuery("complianceStatus")),
          invoker: S.optional(S.String).pipe(T.HttpQuery("invoker")),
          reverseOrder: S.optional(S.Boolean).pipe(T.HttpQuery("reverseOrder")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/list-app-assessments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAppAssessmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          appArn: S.optional(S.String),
          appVersion: S.optional(S.String),
          assessmentStatus: S.String,
          invoker: S.optional(S.String),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          message: S.optional(S.String),
          assessmentName: S.optional(S.String),
          assessmentArn: S.String,
          complianceStatus: S.optional(S.String),
          cost: S.optional(__S(512, __c32, 0)),
          resiliencyScore: S.optional(S.Number),
          versionName: S.optional(S.String),
          driftStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "AppAssessmentSummary" });
    case 2:
      return S.Array(__S(801, __c50, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), assessmentSummaries: __S(802, __c50, 2) }),
      ).annotate({ identifier: "ListAppAssessmentsResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          assessmentArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-app-component-compliances" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAppComponentCompliancesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          cost: S.optional(__S(512, __c32, 0)),
          appComponentName: S.optional(S.String),
          compliance: S.optional(__S(497, __c31, 1)),
          message: S.optional(S.String),
          status: S.optional(S.String),
          resiliencyScore: S.optional(__S(531, __c33, 3)),
        }),
      ).annotate({ identifier: "AppComponentCompliance" });
    case 2:
      return S.Array(__S(817, __c51, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ componentCompliances: __S(818, __c51, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAppComponentCompliancesResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assessmentArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-app-component-recommendations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAppComponentRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          expectedComplianceStatus: S.String,
          expectedRtoInSecs: S.optional(S.Number),
          expectedRtoDescription: S.optional(S.String),
          expectedRpoInSecs: S.optional(S.Number),
          expectedRpoDescription: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecommendationDisruptionCompliance" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(833, __c52, 1).pipe(S.optional));
    case 3:
      return S.suspend(() =>
        S.Struct({
          cost: S.optional(__S(512, __c32, 0)),
          appComponentName: S.optional(S.String),
          compliance: S.optional(__S(497, __c31, 1)),
          recommendationCompliance: S.optional(__S(834, __c52, 2)),
          optimizationType: S.String,
          name: S.String,
          description: S.optional(S.String),
          suggestedChanges: S.optional(__S(16, __c1, 0)),
          haArchitecture: S.optional(S.String),
          referenceId: S.String,
        }),
      ).annotate({ identifier: "ConfigRecommendation" });
    case 4:
      return S.Array(__S(835, __c52, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          appComponentName: S.String,
          recommendationStatus: S.String,
          configRecommendations: __S(836, __c52, 4),
        }),
      ).annotate({ identifier: "ComponentRecommendation" });
    case 6:
      return S.Array(__S(837, __c52, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ componentRecommendations: __S(838, __c52, 6), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAppComponentRecommendationsResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-app-input-sources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAppInputSourcesRequest" });
    case 1:
      return S.Array(__S(385, __c24, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ appInputSources: __S(849, __c53, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAppInputSourcesResponse" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          name: S.optional(S.String).pipe(T.HttpQuery("name")),
          appArn: S.optional(S.String).pipe(T.HttpQuery("appArn")),
          fromLastAssessmentTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("fromLastAssessmentTime"),
          ),
          toLastAssessmentTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("toLastAssessmentTime"),
          ),
          reverseOrder: S.optional(S.Boolean).pipe(T.HttpQuery("reverseOrder")),
          awsApplicationArn: S.optional(S.String).pipe(T.HttpQuery("awsApplicationArn")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/list-apps" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAppsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          complianceStatus: S.optional(S.String),
          resiliencyScore: S.optional(S.Number),
          assessmentSchedule: S.optional(S.String),
          status: S.optional(S.String),
          driftStatus: S.optional(S.String),
          lastAppComplianceEvaluationTime: S.optional(
            S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          ),
          rtoInSecs: S.optional(S.Number),
          rpoInSecs: S.optional(S.Number),
          awsApplicationArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AppSummary" });
    case 2:
      return S.Array(__S(865, __c54, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ appSummaries: __S(866, __c54, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAppsResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-app-version-app-components" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAppVersionAppComponentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          appComponents: S.optional(__S(160, __c10, 0)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAppVersionAppComponentsResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-app-version-resource-mappings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAppVersionResourceMappingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ resourceMappings: __S(1441, __c90, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAppVersionResourceMappingsResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          resolutionId: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-app-version-resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAppVersionResourcesRequest" });
    case 1:
      return S.Array(__S(176, __c11, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          physicalResources: __S(913, __c57, 1),
          resolutionId: S.String,
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAppVersionResourcesResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-app-versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAppVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          appVersion: S.String,
          identifier: S.optional(S.Number),
          creationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          versionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "AppVersionSummary" });
    case 2:
      return S.Array(__S(929, __c58, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ appVersions: __S(930, __c58, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAppVersionsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, aggregation: S.optional(S.String) }),
      ).annotate({ identifier: "Field" });
    case 1:
      return S.Array(__S(944, __c59, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ field: S.String, operator: S.String, value: S.optional(S.String) }),
      ).annotate({ identifier: "Condition" });
    case 3:
      return S.Array(__S(946, __c59, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ field: S.String, ascending: S.optional(S.Boolean) }),
      ).annotate({ identifier: "Sort" });
    case 5:
      return S.Array(__S(948, __c59, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          fields: S.optional(__S(945, __c59, 1)),
          dataSource: S.optional(S.String),
          conditions: S.optional(__S(947, __c59, 3)),
          sorts: S.optional(__S(949, __c59, 5)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/list-metrics" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMetricsRequest" });
    case 7:
      return S.Array(__S(16, __c1, 0));
    case 8:
      return S.suspend(() =>
        S.Struct({ rows: __S(951, __c59, 7), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMetricsResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assessmentArn: S.optional(S.String).pipe(T.HttpQuery("assessmentArn")),
          reverseOrder: S.optional(S.Boolean).pipe(T.HttpQuery("reverseOrder")),
          status: S.optional(__S(240, __c15, 0)).pipe(T.HttpQuery("status")),
          recommendationTemplateArn: S.optional(S.String).pipe(
            T.HttpQuery("recommendationTemplateArn"),
          ),
          name: S.optional(S.String).pipe(T.HttpQuery("name")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/list-recommendation-templates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListRecommendationTemplatesRequest" });
    case 1:
      return S.Array(__S(256, __c16, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          recommendationTemplates: S.optional(__S(961, __c60, 1)),
        }),
      ).annotate({ identifier: "ListRecommendationTemplatesResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyName: S.optional(S.String).pipe(T.HttpQuery("policyName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/list-resiliency-policies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResiliencyPoliciesRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(290, __c18, 2));
    case 1:
      return S.suspend(() =>
        S.Struct({ resiliencyPolicies: __S(992, __c62, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListResiliencyPoliciesResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.optional(S.String).pipe(T.HttpQuery("appArn")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/list-resource-grouping-recommendations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResourceGroupingRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          appComponentId: S.String,
          appComponentType: S.String,
          appComponentName: S.String,
        }),
      ).annotate({ identifier: "GroupingAppComponent" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          resourceName: S.String,
          resourceType: S.String,
          physicalResourceId: __S(1424, __c89, 0),
          logicalResourceId: __S(144, __c9, 0),
          sourceAppComponentIds: __S(16, __c1, 0),
        }),
      ).annotate({ identifier: "GroupingResource" });
    case 3:
      return S.Array(__S(1010, __c63, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          groupingRecommendationId: S.String,
          groupingAppComponent: __S(1009, __c63, 1),
          resources: __S(1011, __c63, 3),
          score: S.Number,
          recommendationReasons: __S(16, __c1, 0),
          status: S.String,
          confidenceLevel: S.String,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          rejectionReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GroupingRecommendation" });
    case 5:
      return S.Array(__S(1012, __c63, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ groupingRecommendations: __S(1013, __c63, 5), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListResourceGroupingRecommendationsResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          assessmentArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-sop-recommendations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSopRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          serviceType: S.String,
          appComponentName: S.optional(S.String),
          description: S.optional(S.String),
          recommendationId: S.String,
          name: S.optional(S.String),
          items: S.optional(__S(755, __c47, 3)),
          referenceId: S.String,
          prerequisite: S.optional(S.String),
          recommendationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "SopRecommendation" });
    case 2:
      return S.Array(__S(1025, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), sopRecommendations: __S(1026, __c64, 2) }),
      ).annotate({ identifier: "ListSopRecommendationsResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/list-suggested-resiliency-policies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSuggestedResiliencyPoliciesRequest" });
  }
}
function __c66(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(32, __c2, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
          assessmentArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-test-recommendations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTestRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recommendationId: S.optional(S.String),
          referenceId: S.String,
          appComponentId: S.optional(S.String),
          appComponentName: S.optional(S.String),
          name: S.optional(S.String),
          intent: S.optional(S.String),
          risk: S.optional(S.String),
          type: S.optional(S.String),
          description: S.optional(S.String),
          items: S.optional(__S(755, __c47, 3)),
          prerequisite: S.optional(S.String),
          dependsOnAlarms: S.optional(__S(16, __c1, 0)),
          recommendationStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "TestRecommendation" });
    case 2:
      return S.Array(__S(1073, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), testRecommendations: __S(1074, __c67, 2) }),
      ).annotate({ identifier: "ListTestRecommendationsResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          resolutionId: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-unsupported-app-version-resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListUnsupportedAppVersionResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          logicalResourceId: __S(144, __c9, 0),
          physicalResourceId: __S(1424, __c89, 0),
          resourceType: S.String,
          unsupportedResourceStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "UnsupportedResource" });
    case 2:
      return S.Array(__S(1089, __c68, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          unsupportedResources: __S(1090, __c68, 2),
          resolutionId: S.String,
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListUnsupportedAppVersionResourcesResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appArn: S.String, versionName: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/publish-app-version" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PublishAppVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.optional(S.String),
          identifier: S.optional(S.Number),
          versionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "PublishAppVersionResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appArn: S.String, appTemplateBody: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/put-draft-app-version-template" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutDraftAppVersionTemplateRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appArn: S.optional(S.String), appVersion: S.optional(S.String) }),
      ).annotate({ identifier: "PutDraftAppVersionTemplateResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ groupingRecommendationId: S.String, rejectionReason: S.optional(S.String) }),
      ).annotate({ identifier: "RejectGroupingRecommendationEntry" });
    case 1:
      return S.Array(__S(1152, __c72, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ appArn: S.String, entries: __S(1153, __c72, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/reject-resource-grouping-recommendations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RejectResourceGroupingRecommendationsRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          resourceNames: S.optional(__S(16, __c1, 0)),
          logicalStackNames: S.optional(__S(16, __c1, 0)),
          appRegistryAppNames: S.optional(__S(16, __c1, 0)),
          resourceGroupNames: S.optional(__S(16, __c1, 0)),
          terraformSourceNames: S.optional(__S(16, __c1, 0)),
          eksSourceNames: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/remove-draft-app-version-resource-mappings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveDraftAppVersionResourceMappingsRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appArn: S.String, appVersion: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/resolve-app-version-resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ResolveAppVersionResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          resolutionId: S.String,
          status: S.String,
        }),
      ).annotate({ identifier: "ResolveAppVersionResourcesResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          appVersion: S.String,
          assessmentName: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(32, __c2, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/start-app-assessment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartAppAssessmentRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          bucketName: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/start-metrics-export" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMetricsExportRequest" });
    case 1:
      return S.suspend(() => S.Struct({ metricsExportId: S.String, status: S.String })).annotate({
        identifier: "StartMetricsExportResponse",
      });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/start-resource-grouping-recommendation-task" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartResourceGroupingRecommendationTaskRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          groupingId: S.String,
          status: S.String,
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartResourceGroupingRecommendationTaskResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(32, __c2, 0),
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
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(16, __c1, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          description: S.optional(S.String),
          policyArn: S.optional(S.String),
          clearResiliencyPolicyArn: S.optional(S.Boolean),
          assessmentSchedule: S.optional(S.String),
          permissionModel: S.optional(__S(48, __c3, 0)),
          eventSubscriptions: S.optional(__S(50, __c3, 2)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/update-app" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateAppRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appArn: S.String, additionalInfo: S.optional(__S(80, __c5, 0)) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-app-version" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAppVersionRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          id: S.String,
          name: S.optional(S.String),
          type: S.optional(S.String),
          additionalInfo: S.optional(__S(80, __c5, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-app-version-app-component" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAppVersionAppComponentRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          resourceName: S.optional(S.String),
          logicalResourceId: S.optional(__S(144, __c9, 0)),
          physicalResourceId: S.optional(S.String),
          awsRegion: S.optional(S.String),
          awsAccountId: S.optional(S.String),
          resourceType: S.optional(S.String),
          appComponents: S.optional(__S(16, __c1, 0)),
          additionalInfo: S.optional(__S(80, __c5, 0)),
          excluded: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-app-version-resource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAppVersionResourceRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String,
          policyName: S.optional(S.String),
          policyDescription: S.optional(S.String),
          dataLocationConstraint: S.optional(S.String),
          tier: S.optional(S.String),
          policy: S.optional(__S(289, __c18, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-resiliency-policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateResiliencyPolicyRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ groupingRecommendationId: S.String })).annotate({
        identifier: "AcceptGroupingRecommendationEntry",
      });
    case 1:
      return S.Array(__S(1376, __c86, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ appArn: S.String, entries: __S(1377, __c86, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/accept-resource-grouping-recommendations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AcceptResourceGroupingRecommendationsRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ groupingRecommendationId: S.String, errorMessage: S.String }),
      ).annotate({ identifier: "FailedGroupingRecommendationEntry" });
    case 1:
      return S.Array(__S(1392, __c87, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ appArn: S.String, failedEntries: __S(1393, __c87, 1) }),
      ).annotate({ identifier: "AcceptResourceGroupingRecommendationsResponse" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appArn: S.String, resourceMappings: __S(1441, __c90, 1) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/add-draft-app-version-resource-mappings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AddDraftAppVersionResourceMappingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ appArn: S.String, appVersion: S.String, resourceMappings: __S(1441, __c90, 1) }),
      ).annotate({ identifier: "AddDraftAppVersionResourceMappingsResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          type: S.String,
          awsRegion: S.optional(S.String),
          awsAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "PhysicalResourceId" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceName: S.optional(S.String),
          logicalStackName: S.optional(S.String),
          appRegistryAppName: S.optional(S.String),
          resourceGroupName: S.optional(S.String),
          mappingType: S.String,
          physicalResourceId: __S(1424, __c89, 0),
          terraformSourceName: S.optional(S.String),
          eksSourceName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceMapping" });
    case 1:
      return S.Array(__S(1440, __c90, 0));
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceId: S.optional(S.String),
          targetAccountId: S.optional(S.String),
          targetRegion: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateRecommendationStatusItem" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          entryId: S.String,
          referenceId: S.String,
          item: S.optional(__S(1456, __c91, 0)),
          excluded: S.Boolean,
          appComponentId: S.optional(S.String),
          excludeReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "UpdateRecommendationStatusRequestEntry" });
    case 2:
      return S.Array(__S(1457, __c91, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ appArn: S.String, requestEntries: __S(1458, __c91, 2) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/batch-update-recommendation-status" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateRecommendationStatusRequest" });
    case 4:
      return S.suspend(() => S.Struct({ entryId: S.String, errorMessage: S.String })).annotate({
        identifier: "BatchUpdateRecommendationStatusFailedEntry",
      });
    case 5:
      return S.Array(__S(1460, __c91, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          appArn: S.String,
          successfulEntries: __S(1458, __c91, 2),
          failedEntries: __S(1461, __c91, 5),
        }),
      ).annotate({ identifier: "BatchUpdateRecommendationStatusResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
