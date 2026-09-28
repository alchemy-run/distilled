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
  sdkId: "resiliencehub",
  target: "AwsResilienceHub",
  version: "2020-04-30",
  sigv4: "resiliencehub",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://resiliencehub.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://resiliencehub.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string; readonly retryAfterSeconds?: number }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type Arn = string;
export type String255 = string;
export interface AcceptGroupingRecommendationEntry {
  groupingRecommendationId: string;
}
export type AcceptGroupingRecommendationEntries =
  AcceptGroupingRecommendationEntry[];
export interface AcceptResourceGroupingRecommendationsRequest {
  appArn: string;
  entries: AcceptGroupingRecommendationEntry[];
}
export type ErrorMessage = string;
export interface FailedGroupingRecommendationEntry {
  groupingRecommendationId: string;
  errorMessage: string;
}
export type FailedGroupingRecommendationEntries =
  FailedGroupingRecommendationEntry[];
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
export type UpdateRecommendationStatusRequestEntries =
  UpdateRecommendationStatusRequestEntry[];
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
export type EventType =
  | "ScheduledAssessmentFailure"
  | "DriftDetected"
  | (string & {});
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
export type AppDriftStatusType =
  | "NotChecked"
  | "NotDetected"
  | "Detected"
  | (string & {});
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
export type DisruptionType =
  | "Software"
  | "Hardware"
  | "AZ"
  | "Region"
  | (string & {});
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
export type AssessmentStatus =
  | "Pending"
  | "InProgress"
  | "Failed"
  | "Success"
  | (string & {});
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
export type CostFrequency =
  | "Hourly"
  | "Daily"
  | "Monthly"
  | "Yearly"
  | (string & {});
export interface Cost {
  amount: number;
  currency: string;
  frequency: CostFrequency;
}
export type DisruptionResiliencyScore = { [key in DisruptionType]?: number };
export type ResiliencyScoreType =
  | "Compliance"
  | "Test"
  | "Alarm"
  | "Sop"
  | (string & {});
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
  componentScore?: {
    [key: string]: ScoringComponentResiliencyScore | undefined;
  };
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
export type AssessmentCompliance = {
  [key in DisruptionType]?: DisruptionCompliance;
};
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
export type DriftStatus =
  | "NotChecked"
  | "NotDetected"
  | "Detected"
  | (string & {});
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
export type ResourceImportStrategyType =
  | "AddOnly"
  | "ReplaceAll"
  | (string & {});
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
export type AlarmType =
  | "Metric"
  | "Composite"
  | "Canary"
  | "Logs"
  | "Event"
  | (string & {});
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
  recommendationCompliance?: {
    [key: string]: RecommendationDisruptionCompliance | undefined;
  };
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
export type FieldAggregationType =
  | "Min"
  | "Max"
  | "Sum"
  | "Avg"
  | "Count"
  | (string & {});
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
export type GroupingRecommendationConfidenceLevel =
  | "High"
  | "Medium"
  | (string & {});
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
export type TestType =
  | "Software"
  | "Hardware"
  | "AZ"
  | "Region"
  | (string & {});
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
export type RejectGroupingRecommendationEntries =
  RejectGroupingRecommendationEntry[];
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
  descriptor: {
    service: svc,
    http: "POST /accept-resource-grouping-recommendations",
    input: { appArn: 0, entries: D.list({ groupingRecommendationId: 0 }) },
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
  operationName: "AcceptResourceGroupingRecommendations",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /add-draft-app-version-resource-mappings",
    input: {
      appArn: 0,
      resourceMappings: D.list({
        resourceName: 0,
        logicalStackName: 0,
        appRegistryAppName: 0,
        resourceGroupName: 0,
        mappingType: 0,
        physicalResourceId: {
          identifier: 0,
          type: 0,
          awsRegion: 0,
          awsAccountId: 0,
        },
        terraformSourceName: 0,
        eksSourceName: 0,
      }),
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
  operationName: "AddDraftAppVersionResourceMappings",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /batch-update-recommendation-status",
    input: {
      appArn: 0,
      requestEntries: D.list({
        entryId: 0,
        referenceId: 0,
        item: { resourceId: 0, targetAccountId: 0, targetRegion: 0 },
        excluded: 0,
        appComponentId: 0,
        excludeReason: 0,
      }),
    },
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
  operationName: "BatchUpdateRecommendationStatus",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /create-app",
    input: {
      name: 0,
      description: 0,
      policyArn: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
      assessmentSchedule: 0,
      permissionModel: i_PermissionModel,
      eventSubscriptions: D.list(i_EventSubscription),
      awsApplicationArn: 0,
    },
    output: { app: o_App },
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
  operationName: "CreateApp",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /create-app-version-app-component",
    input: {
      appArn: 0,
      id: 0,
      name: 0,
      type: 0,
      additionalInfo: 0,
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
  operationName: "CreateAppVersionAppComponent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /create-app-version-resource",
    input: {
      appArn: 0,
      resourceName: 0,
      logicalResourceId: i_LogicalResourceId,
      physicalResourceId: 0,
      awsRegion: 0,
      awsAccountId: 0,
      resourceType: 0,
      appComponents: 0,
      additionalInfo: 0,
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
  operationName: "CreateAppVersionResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /create-recommendation-template",
    input: {
      recommendationIds: 0,
      format: 0,
      recommendationTypes: 0,
      assessmentArn: 0,
      name: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
      bucketName: 0,
    },
    output: { recommendationTemplate: o_RecommendationTemplate },
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
  operationName: "CreateRecommendationTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /create-resiliency-policy",
    input: {
      policyName: 0,
      policyDescription: 0,
      dataLocationConstraint: 0,
      tier: 0,
      policy: D.map(i_FailurePolicy),
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { policy: o_ResiliencyPolicy },
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
  operationName: "CreateResiliencyPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-app",
    input: {
      appArn: 0,
      forceDelete: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-app-assessment",
    input: { assessmentArn: 0, clientToken: D.m({ idempotency: true }) },
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
  operationName: "DeleteAppAssessment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-app-input-source",
    input: {
      appArn: 0,
      sourceArn: 0,
      terraformSource: i_TerraformSource,
      clientToken: D.m({ idempotency: true }),
      eksSourceClusterNamespace: { eksClusterArn: 0, namespace: 0 },
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
  operationName: "DeleteAppInputSource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-app-version-app-component",
    input: { appArn: 0, id: 0, clientToken: D.m({ idempotency: true }) },
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
  operationName: "DeleteAppVersionAppComponent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-app-version-resource",
    input: {
      appArn: 0,
      resourceName: 0,
      logicalResourceId: i_LogicalResourceId,
      physicalResourceId: 0,
      awsRegion: 0,
      awsAccountId: 0,
      clientToken: D.m({ idempotency: true }),
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
  operationName: "DeleteAppVersionResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-recommendation-template",
    input: {
      recommendationTemplateArn: 0,
      clientToken: D.m({ idempotency: true }),
    },
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
  operationName: "DeleteRecommendationTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-resiliency-policy",
    input: { policyArn: 0, clientToken: D.m({ idempotency: true }) },
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
  operationName: "DeleteResiliencyPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describe-app",
    input: { appArn: 0 },
    output: { app: o_App },
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
  operationName: "DescribeApp",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describe-app-assessment",
    input: { assessmentArn: 0 },
    output: { assessment: o_AppAssessment },
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
  operationName: "DescribeAppAssessment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describe-app-version",
    input: { appArn: 0, appVersion: 0 },
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
  operationName: "DescribeAppVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describe-app-version-app-component",
    input: { appArn: 0, appVersion: 0, id: 0 },
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
  operationName: "DescribeAppVersionAppComponent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describe-app-version-resource",
    input: {
      appArn: 0,
      appVersion: 0,
      resourceName: 0,
      logicalResourceId: i_LogicalResourceId,
      physicalResourceId: 0,
      awsRegion: 0,
      awsAccountId: 0,
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
  operationName: "DescribeAppVersionResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describe-app-version-resources-resolution-status",
    input: { appArn: 0, appVersion: 0, resolutionId: 0 },
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
  operationName: "DescribeAppVersionResourcesResolutionStatus",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describe-app-version-template",
    input: { appArn: 0, appVersion: 0 },
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
  operationName: "DescribeAppVersionTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describe-draft-app-version-resources-import-status",
    input: { appArn: 0 },
    output: { statusChangeTime: D.ts },
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
  operationName: "DescribeDraftAppVersionResourcesImportStatus",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describe-metrics-export",
    input: { metricsExportId: 0 },
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
  operationName: "DescribeMetricsExport",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describe-resiliency-policy",
    input: { policyArn: 0 },
    output: { policy: o_ResiliencyPolicy },
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
  operationName: "DescribeResiliencyPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describe-resource-grouping-recommendation-task",
    input: { appArn: 0, groupingId: 0 },
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
  operationName: "DescribeResourceGroupingRecommendationTask",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /import-resources-to-draft-app-version",
    input: {
      appArn: 0,
      sourceArns: 0,
      terraformSources: D.list(i_TerraformSource),
      importStrategy: 0,
      eksSources: D.list({ eksClusterArn: 0, namespaces: 0 }),
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
  operationName: "ImportResourcesToDraftAppVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /list-alarm-recommendations",
    input: { assessmentArn: 0, nextToken: 0, maxResults: 0 },
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
  descriptor: {
    service: svc,
    http: "POST /list-app-assessment-compliance-drifts",
    input: { assessmentArn: 0, nextToken: 0, maxResults: 0 },
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
  descriptor: {
    service: svc,
    http: "POST /list-app-assessment-resource-drifts",
    input: { assessmentArn: 0, nextToken: 0, maxResults: 0 },
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
  descriptor: {
    service: svc,
    http: "GET /list-app-assessments",
    input: {
      appArn: D.m({ query: "appArn" }),
      assessmentName: D.m({ query: "assessmentName" }),
      assessmentStatus: D.m({ query: "assessmentStatus" }),
      complianceStatus: D.m({ query: "complianceStatus" }),
      invoker: D.m({ query: "invoker" }),
      reverseOrder: D.m({ query: "reverseOrder" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { assessmentSummaries: D.list({ startTime: D.ts, endTime: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "POST /list-app-component-compliances",
    input: { nextToken: 0, maxResults: 0, assessmentArn: 0 },
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
  descriptor: {
    service: svc,
    http: "POST /list-app-component-recommendations",
    input: { assessmentArn: 0, nextToken: 0, maxResults: 0 },
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
  descriptor: {
    service: svc,
    http: "POST /list-app-input-sources",
    input: { appArn: 0, appVersion: 0, nextToken: 0, maxResults: 0 },
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
  descriptor: {
    service: svc,
    http: "GET /list-apps",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      name: D.m({ query: "name" }),
      appArn: D.m({ query: "appArn" }),
      fromLastAssessmentTime: D.m({
        query: "fromLastAssessmentTime",
        shape: D.tsAs("epoch-seconds"),
      }),
      toLastAssessmentTime: D.m({
        query: "toLastAssessmentTime",
        shape: D.tsAs("epoch-seconds"),
      }),
      reverseOrder: D.m({ query: "reverseOrder" }),
      awsApplicationArn: D.m({ query: "awsApplicationArn" }),
    },
    output: {
      appSummaries: D.list({
        creationTime: D.ts,
        lastAppComplianceEvaluationTime: D.ts,
      }),
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
  descriptor: {
    service: svc,
    http: "POST /list-app-version-app-components",
    input: { appArn: 0, appVersion: 0, nextToken: 0, maxResults: 0 },
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
  descriptor: {
    service: svc,
    http: "POST /list-app-version-resource-mappings",
    input: { appArn: 0, appVersion: 0, nextToken: 0, maxResults: 0 },
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
  descriptor: {
    service: svc,
    http: "POST /list-app-version-resources",
    input: {
      appArn: 0,
      appVersion: 0,
      resolutionId: 0,
      nextToken: 0,
      maxResults: 0,
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
  descriptor: {
    service: svc,
    http: "POST /list-app-versions",
    input: { appArn: 0, nextToken: 0, maxResults: 0, startTime: 0, endTime: 0 },
    output: { appVersions: D.list({ creationTime: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /list-metrics",
    input: {
      nextToken: 0,
      maxResults: 0,
      fields: D.list({ name: 0, aggregation: 0 }),
      dataSource: 0,
      conditions: D.list({ field: 0, operator: 0, value: 0 }),
      sorts: D.list({ field: 0, ascending: 0 }),
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
  descriptor: {
    service: svc,
    http: "GET /list-recommendation-templates",
    input: {
      assessmentArn: D.m({ query: "assessmentArn" }),
      reverseOrder: D.m({ query: "reverseOrder" }),
      status: D.m({ query: "status" }),
      recommendationTemplateArn: D.m({ query: "recommendationTemplateArn" }),
      name: D.m({ query: "name" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { recommendationTemplates: D.list(o_RecommendationTemplate) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /list-resiliency-policies",
    input: {
      policyName: D.m({ query: "policyName" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { resiliencyPolicies: D.list(o_ResiliencyPolicy) },
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
  descriptor: {
    service: svc,
    http: "GET /list-resource-grouping-recommendations",
    input: {
      appArn: D.m({ query: "appArn" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { groupingRecommendations: D.list({ creationTime: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "POST /list-sop-recommendations",
    input: { nextToken: 0, maxResults: 0, assessmentArn: 0 },
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
  descriptor: {
    service: svc,
    http: "GET /list-suggested-resiliency-policies",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { resiliencyPolicies: D.list(o_ResiliencyPolicy) },
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
  descriptor: {
    service: svc,
    http: "POST /list-test-recommendations",
    input: { nextToken: 0, maxResults: 0, assessmentArn: 0 },
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
  descriptor: {
    service: svc,
    http: "POST /list-unsupported-app-version-resources",
    input: {
      appArn: 0,
      appVersion: 0,
      resolutionId: 0,
      nextToken: 0,
      maxResults: 0,
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
  descriptor: {
    service: svc,
    http: "POST /publish-app-version",
    input: { appArn: 0, versionName: 0 },
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
  operationName: "PublishAppVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /put-draft-app-version-template",
    input: { appArn: 0, appTemplateBody: 0 },
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
  operationName: "PutDraftAppVersionTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /reject-resource-grouping-recommendations",
    input: {
      appArn: 0,
      entries: D.list({ groupingRecommendationId: 0, rejectionReason: 0 }),
    },
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
  operationName: "RejectResourceGroupingRecommendations",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /remove-draft-app-version-resource-mappings",
    input: {
      appArn: 0,
      resourceNames: 0,
      logicalStackNames: 0,
      appRegistryAppNames: 0,
      resourceGroupNames: 0,
      terraformSourceNames: 0,
      eksSourceNames: 0,
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
  operationName: "RemoveDraftAppVersionResourceMappings",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /resolve-app-version-resources",
    input: { appArn: 0, appVersion: 0 },
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
  operationName: "ResolveAppVersionResources",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /start-app-assessment",
    input: {
      appArn: 0,
      appVersion: 0,
      assessmentName: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { assessment: o_AppAssessment },
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
  operationName: "StartAppAssessment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /start-metrics-export",
    input: { bucketName: 0, clientToken: D.m({ idempotency: true }) },
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
  operationName: "StartMetricsExport",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /start-resource-grouping-recommendation-task",
    input: { appArn: 0 },
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
  operationName: "StartResourceGroupingRecommendationTask",
})) as any;

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
 * Removes one or more tags from a resource.
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
  descriptor: {
    service: svc,
    http: "POST /update-app",
    input: {
      appArn: 0,
      description: 0,
      policyArn: 0,
      clearResiliencyPolicyArn: 0,
      assessmentSchedule: 0,
      permissionModel: i_PermissionModel,
      eventSubscriptions: D.list(i_EventSubscription),
    },
    output: { app: o_App },
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
  operationName: "UpdateApp",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /update-app-version",
    input: { appArn: 0, additionalInfo: 0 },
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
  operationName: "UpdateAppVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /update-app-version-app-component",
    input: { appArn: 0, id: 0, name: 0, type: 0, additionalInfo: 0 },
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
  operationName: "UpdateAppVersionAppComponent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /update-app-version-resource",
    input: {
      appArn: 0,
      resourceName: 0,
      logicalResourceId: i_LogicalResourceId,
      physicalResourceId: 0,
      awsRegion: 0,
      awsAccountId: 0,
      resourceType: 0,
      appComponents: 0,
      additionalInfo: 0,
      excluded: 0,
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
  operationName: "UpdateAppVersionResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /update-resiliency-policy",
    input: {
      policyArn: 0,
      policyName: 0,
      policyDescription: 0,
      dataLocationConstraint: 0,
      tier: 0,
      policy: D.map(i_FailurePolicy),
    },
    output: { policy: o_ResiliencyPolicy },
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
  operationName: "UpdateResiliencyPolicy",
})) as any;

const i_EventSubscription: D.LazyStruct = () => ({
  name: 0,
  eventType: 0,
  snsTopicArn: 0,
});
const i_FailurePolicy: D.LazyStruct = () => ({ rtoInSecs: 0, rpoInSecs: 0 });
const i_LogicalResourceId: D.LazyStruct = () => ({
  identifier: 0,
  logicalStackName: 0,
  resourceGroupName: 0,
  terraformSourceName: 0,
  eksSourceName: 0,
});
const i_PermissionModel: D.LazyStruct = () => ({
  type: 0,
  invokerRoleName: 0,
  crossAccountRoleArns: 0,
});
const i_TerraformSource: D.LazyStruct = () => ({ s3StateFileUrl: 0 });
const o_App: D.LazyStruct = () => ({
  creationTime: D.ts,
  lastAppComplianceEvaluationTime: D.ts,
  lastResiliencyScoreEvaluationTime: D.ts,
  lastDriftEvaluationTime: D.ts,
});
const o_AppAssessment: D.LazyStruct = () => ({
  startTime: D.ts,
  endTime: D.ts,
  policy: o_ResiliencyPolicy,
});
const o_RecommendationTemplate: D.LazyStruct = () => ({
  startTime: D.ts,
  endTime: D.ts,
});
const o_ResiliencyPolicy: D.LazyStruct = () => ({ creationTime: D.ts });
