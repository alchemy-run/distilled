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
  sdkId: "WellArchitected",
  target: "WellArchitectedApiServiceLambda",
  version: "2020-03-31",
  sigv4: "wellarchitected",
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
                `https://wellarchitected-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://wellarchitected-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://wellarchitected.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://wellarchitected.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
    readonly ResourceId?: string;
    readonly ResourceType?: string;
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
    readonly ResourceId?: string;
    readonly ResourceType?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message?: string;
    readonly ResourceId?: string;
    readonly ResourceType?: string;
    readonly QuotaCode?: string;
    readonly ServiceCode?: string;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{
    readonly message?: string;
    readonly QuotaCode?: string;
    readonly ServiceCode?: string;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly Reason?: ValidationExceptionReason;
    readonly Fields?: ValidationExceptionField[];
  }> {}
export type WorkloadId = string;
export type LensAlias = string;
export type LensAliases = string[];
export interface AssociateLensesInput {
  WorkloadId: string;
  LensAliases?: string[];
}
export interface AssociateLensesResponse {}
export type ProfileArn = string;
export type ProfileArns = string[];
export interface AssociateProfilesInput {
  WorkloadId: string;
  ProfileArns?: string[];
}
export interface AssociateProfilesResponse {}
export type AgentProfileArn = string;
export type SensitiveString = string | redacted.Redacted<string>;
export type ContextType = "APPLICATION" | (string & {});
export type ContextAccountIdList = string[];
export type ContextRegionList = string[];
export type ContextAwsServiceList = string[];
export type ContextResourceTypeList = string[];
export interface ContextResourceTag {
  key: string;
  value: string;
}
export type ContextResourceTagList = ContextResourceTag[];
export type ApplicationType =
  | "SAS"
  | "DESKTOP_APPLICATION"
  | "OTHER"
  | (string & {});
export type Criticality =
  | "MISSION_CRITICAL"
  | "BUSINESS_CRITICAL"
  | "NON_CRITICAL"
  | "TEST_DEVELOPMENT"
  | (string & {});
export interface ContextContent {
  accountIds?: string[];
  regions?: string[];
  awsServices?: string[];
  resourceTypes?: string[];
  resourceTags?: ContextResourceTag[];
  applicationOverview?: string | redacted.Redacted<string>;
  industry?: string | redacted.Redacted<string>;
  applicationType?: ApplicationType;
  criticality?: Criticality;
  architectureOverview?: string | redacted.Redacted<string>;
  additionalContext?: string | redacted.Redacted<string>;
}
export interface CreateAgentContextRequest {
  clientToken?: string;
  profileArn: string;
  title: string | redacted.Redacted<string>;
  contextType: ContextType;
  content: ContextContent;
}
export type UUID = string;
export interface ContextSummary {
  id: string;
  profileArn: string;
  title: string | redacted.Redacted<string>;
  contextType: ContextType;
  content: ContextContent;
  applicationType?: ApplicationType;
  criticality?: Criticality;
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export interface CreateAgentContextResponse {
  context: ContextSummary;
}
export type Pillar =
  | "COST_OPTIMIZATION"
  | "SECURITY"
  | "RESILIENCE"
  | "PERFORMANCE"
  | "OPERATIONAL_EXCELLENCE"
  | (string & {});
export type Pillars = Pillar[];
export interface CreateAgentGoalRequest {
  clientToken?: string;
  profileArn: string;
  pillars: Pillar[];
  title: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
}
export interface GoalSummary {
  id: string;
  profileArn: string;
  pillars: Pillar[];
  title: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export interface CreateAgentGoalResponse {
  goal: GoalSummary;
}
export type RoleArn = string;
export type AccountId = string;
export type Region = string;
export type Regions = string[];
export interface AggregationConfiguration {
  accountId: string;
  regions: string[];
  accessRoleArn: string;
}
export type AggregationConfigurations = AggregationConfiguration[];
export interface Tag {
  key: string;
  value: string;
}
export type Tags = Tag[];
export interface CreateAgentProfileRequest {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  businessOverview?: string | redacted.Redacted<string>;
  pillars: Pillar[];
  deletionProtection?: boolean;
  executionRoleArn: string;
  aggregationConfiguration: AggregationConfiguration[];
  clientToken?: string;
  tags?: Tag[];
}
export type FieldErrorPath = string;
export type FieldErrorMessage = string;
export type FieldErrors = { [key: string]: string | undefined };
export interface CreateAgentProfileResponse {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  businessOverview?: string | redacted.Redacted<string>;
  pillars: Pillar[];
  deletionProtection?: boolean;
  executionRoleArn: string;
  aggregationConfiguration: AggregationConfiguration[];
  arn: string;
  eligibleForScheduledGeneration?: boolean;
  eligibleForArchitectureGeneration?: boolean;
  fieldErrors?: { [key: string]: string | undefined };
  tags?: Tag[];
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export type SharedWith = string;
export type ClientRequestToken = string;
export interface CreateLensShareInput {
  LensAlias: string;
  SharedWith?: string;
  ClientRequestToken?: string;
}
export type ShareId = string;
export interface CreateLensShareOutput {
  ShareId?: string;
}
export type LensVersion = string;
export type IsMajorVersion = boolean;
export interface CreateLensVersionInput {
  LensAlias: string;
  LensVersion?: string;
  IsMajorVersion?: boolean;
  ClientRequestToken?: string;
}
export type LensArn = string;
export interface CreateLensVersionOutput {
  LensArn?: string;
  LensVersion?: string;
}
export type MilestoneName = string;
export interface CreateMilestoneInput {
  WorkloadId: string;
  MilestoneName?: string;
  ClientRequestToken?: string;
}
export type MilestoneNumber = number;
export interface CreateMilestoneOutput {
  WorkloadId?: string;
  MilestoneNumber?: number;
}
export type ProfileName = string;
export type ProfileDescription = string;
export type QuestionId = string;
export type ChoiceId = string;
export type SelectedProfileChoiceIds = string[];
export interface ProfileQuestionUpdate {
  QuestionId?: string;
  SelectedChoiceIds?: string[];
}
export type ProfileQuestionUpdates = ProfileQuestionUpdate[];
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateProfileInput {
  ProfileName?: string;
  ProfileDescription?: string;
  ProfileQuestions?: ProfileQuestionUpdate[];
  ClientRequestToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export type ProfileVersion = string;
export interface CreateProfileOutput {
  ProfileArn?: string;
  ProfileVersion?: string;
}
export interface CreateProfileShareInput {
  ProfileArn: string;
  SharedWith?: string;
  ClientRequestToken?: string;
}
export interface CreateProfileShareOutput {
  ShareId?: string;
  ProfileArn?: string;
}
export type TemplateName = string;
export type TemplateDescription = string;
export type ReviewTemplateLenses = string[];
export type Notes = string;
export interface CreateReviewTemplateInput {
  TemplateName?: string;
  Description?: string;
  Lenses?: string[];
  Notes?: string;
  Tags?: { [key: string]: string | undefined };
  ClientRequestToken?: string;
}
export type TemplateArn = string;
export interface CreateReviewTemplateOutput {
  TemplateArn?: string;
}
export interface CreateTemplateShareInput {
  TemplateArn: string;
  SharedWith?: string;
  ClientRequestToken?: string;
}
export interface CreateTemplateShareOutput {
  TemplateArn?: string;
  ShareId?: string;
}
export type WorkloadName = string;
export type WorkloadDescription = string;
export type WorkloadEnvironment =
  | "PRODUCTION"
  | "PREPRODUCTION"
  | (string & {});
export type AwsAccountId = string;
export type WorkloadAccountIds = string[];
export type AwsRegion = string;
export type WorkloadAwsRegions = string[];
export type WorkloadNonAwsRegion = string;
export type WorkloadNonAwsRegions = string[];
export type PillarId = string;
export type WorkloadPillarPriorities = string[];
export type WorkloadArchitecturalDesign = string;
export type WorkloadReviewOwner = string;
export type WorkloadIndustryType = string;
export type WorkloadIndustry = string;
export type WorkloadLenses = string[];
export type TrustedAdvisorIntegrationStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type DefinitionType =
  | "WORKLOAD_METADATA"
  | "APP_REGISTRY"
  | (string & {});
export type WorkloadResourceDefinition = DefinitionType[];
export interface WorkloadDiscoveryConfig {
  TrustedAdvisorIntegrationStatus?: TrustedAdvisorIntegrationStatus;
  WorkloadResourceDefinition?: DefinitionType[];
}
export type ApplicationArn = string;
export type WorkloadApplications = string[];
export type WorkloadProfileArns = string[];
export type ReviewTemplateArns = string[];
export type WorkloadIssueManagementStatus =
  | "ENABLED"
  | "DISABLED"
  | "INHERIT"
  | (string & {});
export type IssueManagementType = "AUTO" | "MANUAL" | (string & {});
export type JiraProjectKey = string;
export interface WorkloadJiraConfigurationInput {
  IssueManagementStatus?: WorkloadIssueManagementStatus;
  IssueManagementType?: IssueManagementType;
  JiraProjectKey?: string;
}
export interface CreateWorkloadInput {
  WorkloadName?: string;
  Description?: string;
  Environment?: WorkloadEnvironment;
  AccountIds?: string[];
  AwsRegions?: string[];
  NonAwsRegions?: string[];
  PillarPriorities?: string[];
  ArchitecturalDesign?: string;
  ReviewOwner?: string;
  IndustryType?: string;
  Industry?: string;
  Lenses?: string[];
  Notes?: string;
  ClientRequestToken?: string;
  Tags?: { [key: string]: string | undefined };
  DiscoveryConfig?: WorkloadDiscoveryConfig;
  Applications?: string[];
  ProfileArns?: string[];
  ReviewTemplateArns?: string[];
  JiraConfiguration?: WorkloadJiraConfigurationInput;
}
export type WorkloadArn = string;
export interface CreateWorkloadOutput {
  WorkloadId?: string;
  WorkloadArn?: string;
}
export type PermissionType = "READONLY" | "CONTRIBUTOR" | (string & {});
export interface CreateWorkloadShareInput {
  WorkloadId: string;
  SharedWith?: string;
  PermissionType?: PermissionType;
  ClientRequestToken?: string;
}
export interface CreateWorkloadShareOutput {
  WorkloadId?: string;
  ShareId?: string;
}
export interface DeleteAgentContextRequest {
  profileArn: string;
  id: string;
}
export interface DeleteAgentContextResponse {}
export interface DeleteAgentGoalRequest {
  profileArn: string;
  id: string;
}
export interface DeleteAgentGoalResponse {}
export interface DeleteAgentProfileRequest {
  profileArn: string;
}
export interface DeleteAgentProfileResponse {}
export type LensStatusType = "ALL" | "DRAFT" | "PUBLISHED" | (string & {});
export interface DeleteLensInput {
  LensAlias: string;
  ClientRequestToken?: string;
  LensStatus?: LensStatusType;
}
export interface DeleteLensResponse {}
export interface DeleteLensShareInput {
  ShareId: string;
  LensAlias: string;
  ClientRequestToken?: string;
}
export interface DeleteLensShareResponse {}
export interface DeleteProfileInput {
  ProfileArn: string;
  ClientRequestToken?: string;
}
export interface DeleteProfileResponse {}
export interface DeleteProfileShareInput {
  ShareId: string;
  ProfileArn: string;
  ClientRequestToken?: string;
}
export interface DeleteProfileShareResponse {}
export interface DeleteReviewTemplateInput {
  TemplateArn: string;
  ClientRequestToken?: string;
}
export interface DeleteReviewTemplateResponse {}
export interface DeleteTemplateShareInput {
  ShareId: string;
  TemplateArn: string;
  ClientRequestToken?: string;
}
export interface DeleteTemplateShareResponse {}
export interface DeleteWorkloadInput {
  WorkloadId: string;
  ClientRequestToken?: string;
}
export interface DeleteWorkloadResponse {}
export interface DeleteWorkloadShareInput {
  ShareId: string;
  WorkloadId: string;
  ClientRequestToken?: string;
}
export interface DeleteWorkloadShareResponse {}
export interface DisassociateLensesInput {
  WorkloadId: string;
  LensAliases?: string[];
}
export interface DisassociateLensesResponse {}
export interface DisassociateProfilesInput {
  WorkloadId: string;
  ProfileArns?: string[];
}
export interface DisassociateProfilesResponse {}
export interface ExportLensInput {
  LensAlias: string;
  LensVersion?: string;
}
export type LensJSON = string;
export interface ExportLensOutput {
  LensJSON?: string;
}
export interface GetAgentContextRequest {
  profileArn: string;
  id: string;
}
export interface GetAgentContextResponse {
  context: ContextSummary;
}
export interface GetAgentGoalRequest {
  profileArn: string;
  id: string;
}
export interface GetAgentGoalResponse {
  goal: GoalSummary;
}
export interface GetAgentProfileRequest {
  profileArn: string;
}
export interface GetAgentProfileResponse {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  businessOverview?: string | redacted.Redacted<string>;
  pillars: Pillar[];
  deletionProtection?: boolean;
  executionRoleArn: string;
  aggregationConfiguration: AggregationConfiguration[];
  arn: string;
  eligibleForScheduledGeneration?: boolean;
  eligibleForArchitectureGeneration?: boolean;
  fieldErrors?: { [key: string]: string | undefined };
  tags?: Tag[];
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export type AgentRecommendationArn = string;
export type RemediationType =
  | "AUTO_REMEDIATION"
  | "CONSOLE"
  | "CLI"
  | "SDK"
  | "IAC"
  | "MCP"
  | (string & {});
export interface GetAgentRecommendationRequest {
  recommendationArn: string;
  remediationType?: RemediationType;
}
export type RecommendationArn = string;
export type RecommendationType =
  | "RESOURCE"
  | "ARCHITECTURE"
  | "APPLICATION"
  | (string & {});
export type Priority = "HIGH" | "MEDIUM" | "LOW" | (string & {});
export type Effort = "LARGE" | "MEDIUM" | "SMALL" | (string & {});
export type RecommendationStatus =
  | "ACTIVE"
  | "SUPPRESSED"
  | "COMPLETED"
  | (string & {});
export type RecommendationState = "OPEN" | "CLOSED" | (string & {});
export type ImpactCategory = "HIGH" | "MEDIUM" | "LOW" | (string & {});
export interface Roi {
  estimate?: string;
  detail: string;
}
export type StringList = string[];
export type ImpactDetail = string;
export type ImpactDetails = string[];
export interface Insight {
  usagePattern: string;
  signalsDetected?: string;
}
export type InsightList = Insight[];
export type Highlight = string;
export type Highlights = string[];
export type RecommendedFixStep = string;
export type RecommendedFixSteps = string[];
export interface RemediationSummary {
  recommendation: string;
  steps: string[];
}
export interface CrossPillarBenefit {
  pillar: Pillar;
  title: string;
  description: string;
  impact: ImpactCategory;
}
export type CrossPillarBenefits = CrossPillarBenefit[];
export type RiskRating = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export interface TradeOff {
  pillar: Pillar;
  title: string;
  description: string;
  risk: RiskRating;
  mitigation: string;
  riskExplanation?: string;
}
export type TradeOffs = TradeOff[];
export type RecommendationSource =
  | "TRUSTED_ADVISOR"
  | "COST_EXPLORER"
  | "CLOUDWATCH"
  | "WELL_ARCHITECTED_TOOL"
  | "WELL_ARCHITECTED_AGENT"
  | "CUSTOMER_IAC"
  | (string & {});
export type RecommendationSourceList = RecommendationSource[];
export interface RecommendationGoal {
  title: string;
}
export type RecommendationGoals = RecommendationGoal[];
export interface RemediationStep {
  title?: string | redacted.Redacted<string>;
  content: string | redacted.Redacted<string>;
}
export type RemediationSteps = RemediationStep[];
export interface ResourceLink {
  url: string;
  title?: string;
}
export type ResourceLinks = ResourceLink[];
export interface AgentRecommendationRemediation {
  recommendationArn: string;
  type: RemediationType;
  steps: RemediationStep[];
  resourceLinks?: ResourceLink[];
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export type AgentRecommendationRemediations = AgentRecommendationRemediation[];
export interface GetAgentRecommendationResponse {
  recommendationArn: string;
  profileArn: string;
  title: string | redacted.Redacted<string>;
  description: string | redacted.Redacted<string>;
  type: RecommendationType;
  pillar: Pillar;
  priority: Priority;
  effort: Effort;
  status: RecommendationStatus;
  state: RecommendationState;
  updateReason?: string | redacted.Redacted<string>;
  impact: ImpactCategory;
  roi: Roi;
  numberOfResources?: number;
  awsServices?: string[];
  businessUnits?: string[];
  applications?: string[];
  impactDetails: string[];
  insights: Insight[];
  highlights: string[];
  remediationSummary: RemediationSummary;
  crossPillarBenefits?: CrossPillarBenefit[];
  tradeOffs?: TradeOff[];
  sources?: RecommendationSource[];
  goals?: RecommendationGoal[];
  tags?: Tag[];
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
  remediations?: AgentRecommendationRemediation[];
}
export interface GetAgentRecommendationGenerationRequest {
  profileArn: string;
  generationId: string;
}
export type GenerationStatus =
  | "QUEUED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "ERROR"
  | (string & {});
export type GoalIdList = string[];
export type ItemId = string;
export type ItemIds = string[];
export interface PillarItem {
  pillar: Pillar;
  ids: string[];
}
export type PillarItems = PillarItem[];
export interface Scope {
  pillars: Pillar[];
  goalIds?: string[];
  items?: PillarItem[];
}
export interface Progress {
  stepsCompleted: number;
  totalSteps: number;
  completionPercentage: number;
}
export interface ErrorDetails {
  code: string;
  message: string;
}
export interface GetAgentRecommendationGenerationResponse {
  id: string;
  profileArn: string;
  name?: string;
  status: GenerationStatus;
  estimatedCompletionTime?: Date;
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
  additionalContext?: any;
  scope?: Scope;
  startedAt?: Date;
  endedAt?: Date;
  progress?: Progress;
  errorDetails?: ErrorDetails;
}
export interface GetAnswerInput {
  WorkloadId: string;
  LensAlias: string;
  QuestionId: string;
  MilestoneNumber?: number;
}
export type QuestionTitle = string;
export type QuestionDescription = string;
export type ImprovementPlanUrl = string;
export type HelpfulResourceUrl = string;
export type DisplayText = string;
export type ChoiceTitle = string;
export type ChoiceDescription = string;
export type ChoiceContentDisplayText = string;
export type ChoiceContentUrl = string;
export interface ChoiceContent {
  DisplayText?: string;
  Url?: string;
}
export type AdditionalResourceType =
  | "HELPFUL_RESOURCE"
  | "IMPROVEMENT_PLAN"
  | (string & {});
export type Urls = ChoiceContent[];
export interface AdditionalResources {
  Type?: AdditionalResourceType;
  Content?: ChoiceContent[];
}
export type AdditionalResourcesList = AdditionalResources[];
export interface Choice {
  ChoiceId?: string;
  Title?: string;
  Description?: string;
  HelpfulResource?: ChoiceContent;
  ImprovementPlan?: ChoiceContent;
  AdditionalResources?: AdditionalResources[];
}
export type Choices = Choice[];
export type SelectedChoices = string[];
export type ChoiceStatus =
  | "SELECTED"
  | "NOT_APPLICABLE"
  | "UNSELECTED"
  | (string & {});
export type ChoiceReason =
  | "OUT_OF_SCOPE"
  | "BUSINESS_PRIORITIES"
  | "ARCHITECTURE_CONSTRAINTS"
  | "OTHER"
  | "NONE"
  | (string & {});
export type ChoiceNotes = string;
export interface ChoiceAnswer {
  ChoiceId?: string;
  Status?: ChoiceStatus;
  Reason?: ChoiceReason;
  Notes?: string;
}
export type ChoiceAnswers = ChoiceAnswer[];
export type IsApplicable = boolean;
export type Risk =
  | "UNANSWERED"
  | "HIGH"
  | "MEDIUM"
  | "NONE"
  | "NOT_APPLICABLE"
  | (string & {});
export type AnswerReason =
  | "OUT_OF_SCOPE"
  | "BUSINESS_PRIORITIES"
  | "ARCHITECTURE_CONSTRAINTS"
  | "OTHER"
  | "NONE"
  | (string & {});
export type JiraIssueUrl = string;
export interface JiraConfiguration {
  JiraIssueUrl?: string;
  LastSyncedTime?: Date;
}
export interface Answer {
  QuestionId?: string;
  PillarId?: string;
  QuestionTitle?: string;
  QuestionDescription?: string;
  ImprovementPlanUrl?: string;
  HelpfulResourceUrl?: string;
  HelpfulResourceDisplayText?: string;
  Choices?: Choice[];
  SelectedChoices?: string[];
  ChoiceAnswers?: ChoiceAnswer[];
  IsApplicable?: boolean;
  Risk?: Risk;
  Notes?: string;
  Reason?: AnswerReason;
  JiraConfiguration?: JiraConfiguration;
}
export interface GetAnswerOutput {
  WorkloadId?: string;
  MilestoneNumber?: number;
  LensAlias?: string;
  LensArn?: string;
  Answer?: Answer;
}
export type ReportFormat = "PDF" | "JSON" | (string & {});
export type IncludeSharedResources = boolean;
export type NextToken = string;
export type MaxResults = number;
export interface GetConsolidatedReportInput {
  Format?: ReportFormat;
  IncludeSharedResources?: boolean;
  NextToken?: string;
  MaxResults?: number;
}
export type MetricType = "WORKLOAD" | (string & {});
export type Count = number;
export type RiskCounts = { [key in Risk]?: number };
export interface BestPractice {
  ChoiceId?: string;
  ChoiceTitle?: string;
}
export type BestPractices = BestPractice[];
export interface QuestionMetric {
  QuestionId?: string;
  Risk?: Risk;
  BestPractices?: BestPractice[];
}
export type QuestionMetrics = QuestionMetric[];
export interface PillarMetric {
  PillarId?: string;
  RiskCounts?: { [key: string]: number | undefined };
  Questions?: QuestionMetric[];
}
export type PillarMetrics = PillarMetric[];
export interface LensMetric {
  LensArn?: string;
  Pillars?: PillarMetric[];
  RiskCounts?: { [key: string]: number | undefined };
}
export type LensMetrics = LensMetric[];
export type LensesAppliedCount = number;
export interface ConsolidatedReportMetric {
  MetricType?: MetricType;
  RiskCounts?: { [key: string]: number | undefined };
  WorkloadId?: string;
  WorkloadName?: string;
  WorkloadArn?: string;
  UpdatedAt?: Date;
  Lenses?: LensMetric[];
  LensesAppliedCount?: number;
}
export type ConsolidatedReportMetrics = ConsolidatedReportMetric[];
export type Base64String = string;
export interface GetConsolidatedReportOutput {
  Metrics?: ConsolidatedReportMetric[];
  NextToken?: string;
  Base64String?: string;
}
export interface GetGlobalSettingsRequest {}
export type OrganizationSharingStatus = "ENABLED" | "DISABLED" | (string & {});
export type DiscoveryIntegrationStatus = "ENABLED" | "DISABLED" | (string & {});
export type IntegrationStatus = "CONFIGURED" | "NOT_CONFIGURED" | (string & {});
export type AccountJiraIssueManagementStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type Subdomain = string;
export type StatusMessage = string;
export interface AccountJiraConfigurationOutput {
  IntegrationStatus?: IntegrationStatus;
  IssueManagementStatus?: AccountJiraIssueManagementStatus;
  IssueManagementType?: IssueManagementType;
  Subdomain?: string;
  JiraProjectKey?: string;
  StatusMessage?: string;
}
export interface GetGlobalSettingsOutput {
  OrganizationSharingStatus?: OrganizationSharingStatus;
  DiscoveryIntegrationStatus?: DiscoveryIntegrationStatus;
  JiraConfiguration?: AccountJiraConfigurationOutput;
}
export interface GetLensInput {
  LensAlias: string;
  LensVersion?: string;
}
export type LensName = string;
export type LensDescription = string;
export type LensOwner = string;
export type ShareInvitationId = string;
export interface Lens {
  LensArn?: string;
  LensVersion?: string;
  Name?: string;
  Description?: string;
  Owner?: string;
  ShareInvitationId?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface GetLensOutput {
  Lens?: Lens;
}
export interface GetLensReviewInput {
  WorkloadId: string;
  LensAlias: string;
  MilestoneNumber?: number;
}
export type LensStatus =
  | "CURRENT"
  | "NOT_CURRENT"
  | "DEPRECATED"
  | "DELETED"
  | "UNSHARED"
  | (string & {});
export type PillarName = string;
export interface PillarReviewSummary {
  PillarId?: string;
  PillarName?: string;
  Notes?: string;
  RiskCounts?: { [key: string]: number | undefined };
  PrioritizedRiskCounts?: { [key: string]: number | undefined };
}
export type PillarReviewSummaries = PillarReviewSummary[];
export type SelectedQuestionId = string;
export type SelectedQuestionIds = string[];
export interface SelectedPillar {
  PillarId?: string;
  SelectedQuestionIds?: string[];
}
export type SelectedPillars = SelectedPillar[];
export interface JiraSelectedQuestionConfiguration {
  SelectedPillars?: SelectedPillar[];
}
export interface WorkloadProfile {
  ProfileArn?: string;
  ProfileVersion?: string;
}
export type WorkloadProfiles = WorkloadProfile[];
export interface LensReview {
  LensAlias?: string;
  LensArn?: string;
  LensVersion?: string;
  LensName?: string;
  LensStatus?: LensStatus;
  PillarReviewSummaries?: PillarReviewSummary[];
  JiraConfiguration?: JiraSelectedQuestionConfiguration;
  UpdatedAt?: Date;
  Notes?: string;
  RiskCounts?: { [key: string]: number | undefined };
  NextToken?: string;
  Profiles?: WorkloadProfile[];
  PrioritizedRiskCounts?: { [key: string]: number | undefined };
}
export interface GetLensReviewOutput {
  WorkloadId?: string;
  MilestoneNumber?: number;
  LensReview?: LensReview;
}
export interface GetLensReviewReportInput {
  WorkloadId: string;
  LensAlias: string;
  MilestoneNumber?: number;
}
export interface LensReviewReport {
  LensAlias?: string;
  LensArn?: string;
  Base64String?: string;
}
export interface GetLensReviewReportOutput {
  WorkloadId?: string;
  MilestoneNumber?: number;
  LensReviewReport?: LensReviewReport;
}
export interface GetLensVersionDifferenceInput {
  LensAlias: string;
  BaseLensVersion?: string;
  TargetLensVersion?: string;
}
export type DifferenceStatus = "UPDATED" | "NEW" | "DELETED" | (string & {});
export interface QuestionDifference {
  QuestionId?: string;
  QuestionTitle?: string;
  DifferenceStatus?: DifferenceStatus;
}
export type QuestionDifferences = QuestionDifference[];
export interface PillarDifference {
  PillarId?: string;
  PillarName?: string;
  DifferenceStatus?: DifferenceStatus;
  QuestionDifferences?: QuestionDifference[];
}
export type PillarDifferences = PillarDifference[];
export interface VersionDifferences {
  PillarDifferences?: PillarDifference[];
}
export interface GetLensVersionDifferenceOutput {
  LensAlias?: string;
  LensArn?: string;
  BaseLensVersion?: string;
  TargetLensVersion?: string;
  LatestLensVersion?: string;
  VersionDifferences?: VersionDifferences;
}
export interface GetMilestoneInput {
  WorkloadId: string;
  MilestoneNumber: number;
}
export type IsReviewOwnerUpdateAcknowledged = boolean;
export type WorkloadImprovementStatus =
  | "NOT_APPLICABLE"
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETE"
  | "RISK_ACKNOWLEDGED"
  | (string & {});
export interface WorkloadJiraConfigurationOutput {
  IssueManagementStatus?: WorkloadIssueManagementStatus;
  IssueManagementType?: IssueManagementType;
  JiraProjectKey?: string;
  StatusMessage?: string;
}
export interface Workload {
  WorkloadId?: string;
  WorkloadArn?: string;
  WorkloadName?: string;
  Description?: string;
  Environment?: WorkloadEnvironment;
  UpdatedAt?: Date;
  AccountIds?: string[];
  AwsRegions?: string[];
  NonAwsRegions?: string[];
  ArchitecturalDesign?: string;
  ReviewOwner?: string;
  ReviewRestrictionDate?: Date;
  IsReviewOwnerUpdateAcknowledged?: boolean;
  IndustryType?: string;
  Industry?: string;
  Notes?: string;
  ImprovementStatus?: WorkloadImprovementStatus;
  RiskCounts?: { [key: string]: number | undefined };
  PillarPriorities?: string[];
  Lenses?: string[];
  Owner?: string;
  ShareInvitationId?: string;
  Tags?: { [key: string]: string | undefined };
  DiscoveryConfig?: WorkloadDiscoveryConfig;
  Applications?: string[];
  Profiles?: WorkloadProfile[];
  PrioritizedRiskCounts?: { [key: string]: number | undefined };
  JiraConfiguration?: WorkloadJiraConfigurationOutput;
}
export interface Milestone {
  MilestoneNumber?: number;
  MilestoneName?: string;
  RecordedAt?: Date;
  Workload?: Workload;
}
export interface GetMilestoneOutput {
  WorkloadId?: string;
  Milestone?: Milestone;
}
export interface GetProfileInput {
  ProfileArn: string;
  ProfileVersion?: string;
}
export interface ProfileChoice {
  ChoiceId?: string;
  ChoiceTitle?: string;
  ChoiceDescription?: string;
}
export type ProfileQuestionChoices = ProfileChoice[];
export type SelectedChoiceIds = string[];
export type MinSelectedProfileChoices = number;
export type MaxSelectedProfileChoices = number;
export interface ProfileQuestion {
  QuestionId?: string;
  QuestionTitle?: string;
  QuestionDescription?: string;
  QuestionChoices?: ProfileChoice[];
  SelectedChoiceIds?: string[];
  MinSelectedChoices?: number;
  MaxSelectedChoices?: number;
}
export type ProfileQuestions = ProfileQuestion[];
export interface Profile {
  ProfileArn?: string;
  ProfileVersion?: string;
  ProfileName?: string;
  ProfileDescription?: string;
  ProfileQuestions?: ProfileQuestion[];
  Owner?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  ShareInvitationId?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface GetProfileOutput {
  Profile?: Profile;
}
export interface GetProfileTemplateInput {}
export interface ProfileTemplateChoice {
  ChoiceId?: string;
  ChoiceTitle?: string;
  ChoiceDescription?: string;
}
export type ProfileTemplateQuestionChoices = ProfileTemplateChoice[];
export interface ProfileTemplateQuestion {
  QuestionId?: string;
  QuestionTitle?: string;
  QuestionDescription?: string;
  QuestionChoices?: ProfileTemplateChoice[];
  MinSelectedChoices?: number;
  MaxSelectedChoices?: number;
}
export type TemplateQuestions = ProfileTemplateQuestion[];
export interface ProfileTemplate {
  TemplateName?: string;
  TemplateQuestions?: ProfileTemplateQuestion[];
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export interface GetProfileTemplateOutput {
  ProfileTemplate?: ProfileTemplate;
}
export interface GetReviewTemplateInput {
  TemplateArn: string;
}
export type Question = "UNANSWERED" | "ANSWERED" | (string & {});
export type QuestionCounts = { [key in Question]?: number };
export type ReviewTemplateUpdateStatus =
  | "CURRENT"
  | "LENS_NOT_CURRENT"
  | (string & {});
export interface ReviewTemplate {
  Description?: string;
  Lenses?: string[];
  Notes?: string;
  QuestionCounts?: { [key: string]: number | undefined };
  Owner?: string;
  UpdatedAt?: Date;
  TemplateArn?: string;
  TemplateName?: string;
  Tags?: { [key: string]: string | undefined };
  UpdateStatus?: ReviewTemplateUpdateStatus;
  ShareInvitationId?: string;
}
export interface GetReviewTemplateOutput {
  ReviewTemplate?: ReviewTemplate;
}
export interface GetReviewTemplateAnswerInput {
  TemplateArn: string;
  LensAlias: string;
  QuestionId: string;
}
export type ReviewTemplateAnswerStatus =
  | "UNANSWERED"
  | "ANSWERED"
  | (string & {});
export interface ReviewTemplateAnswer {
  QuestionId?: string;
  PillarId?: string;
  QuestionTitle?: string;
  QuestionDescription?: string;
  ImprovementPlanUrl?: string;
  HelpfulResourceUrl?: string;
  HelpfulResourceDisplayText?: string;
  Choices?: Choice[];
  SelectedChoices?: string[];
  ChoiceAnswers?: ChoiceAnswer[];
  IsApplicable?: boolean;
  AnswerStatus?: ReviewTemplateAnswerStatus;
  Notes?: string;
  Reason?: AnswerReason;
}
export interface GetReviewTemplateAnswerOutput {
  TemplateArn?: string;
  LensAlias?: string;
  Answer?: ReviewTemplateAnswer;
}
export interface GetReviewTemplateLensReviewInput {
  TemplateArn: string;
  LensAlias: string;
}
export interface ReviewTemplatePillarReviewSummary {
  PillarId?: string;
  PillarName?: string;
  Notes?: string;
  QuestionCounts?: { [key: string]: number | undefined };
}
export type ReviewTemplatePillarReviewSummaries =
  ReviewTemplatePillarReviewSummary[];
export interface ReviewTemplateLensReview {
  LensAlias?: string;
  LensArn?: string;
  LensVersion?: string;
  LensName?: string;
  LensStatus?: LensStatus;
  PillarReviewSummaries?: ReviewTemplatePillarReviewSummary[];
  UpdatedAt?: Date;
  Notes?: string;
  QuestionCounts?: { [key: string]: number | undefined };
  NextToken?: string;
}
export interface GetReviewTemplateLensReviewOutput {
  TemplateArn?: string;
  LensReview?: ReviewTemplateLensReview;
}
export interface GetWorkloadInput {
  WorkloadId: string;
}
export interface GetWorkloadOutput {
  Workload?: Workload;
}
export interface ImportLensInput {
  LensAlias?: string;
  JSONString?: string;
  ClientRequestToken?: string;
  Tags?: { [key: string]: string | undefined };
}
export type ImportLensStatus =
  | "IN_PROGRESS"
  | "COMPLETE"
  | "ERROR"
  | (string & {});
export interface ImportLensOutput {
  LensArn?: string;
  Status?: ImportLensStatus;
}
export interface ListAgentContextsRequest {
  profileArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type ContextSummaries = ContextSummary[];
export interface ListAgentContextsResponse {
  items: ContextSummary[];
  nextToken?: string;
}
export interface ListAgentGoalsRequest {
  profileArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type GoalSummaries = GoalSummary[];
export interface ListAgentGoalsResponse {
  items: GoalSummary[];
  nextToken?: string;
}
export interface ListAgentProfilesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface AgentProfileSummary {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  businessOverview?: string | redacted.Redacted<string>;
  pillars: Pillar[];
  deletionProtection?: boolean;
  executionRoleArn: string;
  aggregationConfiguration: AggregationConfiguration[];
  arn: string;
  eligibleForScheduledGeneration?: boolean;
  eligibleForArchitectureGeneration?: boolean;
  fieldErrors?: { [key: string]: string | undefined };
  tags?: Tag[];
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export type AgentProfileSummaries = AgentProfileSummary[];
export interface ListAgentProfilesResponse {
  items: AgentProfileSummary[];
  nextToken?: string;
}
export interface ListAgentRecommendationGenerationsRequest {
  profileArn: string;
  recommendationType?: RecommendationType;
  maxResults?: number;
  nextToken?: string;
}
export interface AgentRecommendationGenerationSummary {
  id: string;
  profileArn: string;
  name?: string;
  status: GenerationStatus;
  estimatedCompletionTime?: Date;
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export type AgentRecommendationGenerationSummaries =
  AgentRecommendationGenerationSummary[];
export interface ListAgentRecommendationGenerationsResponse {
  items: AgentRecommendationGenerationSummary[];
  nextToken?: string;
}
export type RecommendationItemType =
  | "AWS_RESOURCE"
  | "RECOMMENDATION"
  | (string & {});
export interface ListAgentRecommendationItemsRequest {
  recommendationArn: string;
  type?: RecommendationItemType;
  maxResults?: number;
  nextToken?: string;
}
export interface AgentRecommendationItemSummary {
  id: string;
  recommendationArn: string;
  type: RecommendationItemType;
  metadata: any;
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export type AgentRecommendationItemSummaries = AgentRecommendationItemSummary[];
export interface ListAgentRecommendationItemsResponse {
  items: AgentRecommendationItemSummary[];
  nextToken?: string;
}
export interface ListAgentRecommendationsRequest {
  profileArn: string;
  maxResults?: number;
  nextToken?: string;
  state?: RecommendationState;
  pillar?: Pillar;
}
export interface AgentRecommendationSummary {
  recommendationArn: string;
  profileArn: string;
  title: string | redacted.Redacted<string>;
  description: string | redacted.Redacted<string>;
  type: RecommendationType;
  pillar: Pillar;
  priority: Priority;
  effort: Effort;
  status: RecommendationStatus;
  state: RecommendationState;
  updateReason?: string | redacted.Redacted<string>;
  impact: ImpactCategory;
  roi: Roi;
  numberOfResources?: number;
  awsServices?: string[];
  businessUnits?: string[];
  applications?: string[];
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export type AgentRecommendationSummaries = AgentRecommendationSummary[];
export interface ListAgentRecommendationsResponse {
  items: AgentRecommendationSummary[];
  nextToken?: string;
}
export type QuestionPriority = "PRIORITIZED" | "NONE" | (string & {});
export interface ListAnswersInput {
  WorkloadId: string;
  LensAlias: string;
  PillarId?: string;
  MilestoneNumber?: number;
  NextToken?: string;
  MaxResults?: number;
  QuestionPriority?: QuestionPriority;
}
export interface ChoiceAnswerSummary {
  ChoiceId?: string;
  Status?: ChoiceStatus;
  Reason?: ChoiceReason;
}
export type ChoiceAnswerSummaries = ChoiceAnswerSummary[];
export type QuestionType = "PRIORITIZED" | "NON_PRIORITIZED" | (string & {});
export interface AnswerSummary {
  QuestionId?: string;
  PillarId?: string;
  QuestionTitle?: string;
  Choices?: Choice[];
  SelectedChoices?: string[];
  ChoiceAnswerSummaries?: ChoiceAnswerSummary[];
  IsApplicable?: boolean;
  Risk?: Risk;
  Reason?: AnswerReason;
  QuestionType?: QuestionType;
  JiraConfiguration?: JiraConfiguration;
}
export type AnswerSummaries = AnswerSummary[];
export interface ListAnswersOutput {
  WorkloadId?: string;
  MilestoneNumber?: number;
  LensAlias?: string;
  LensArn?: string;
  AnswerSummaries?: AnswerSummary[];
  NextToken?: string;
}
export interface ListCheckDetailsInput {
  WorkloadId: string;
  NextToken?: string;
  MaxResults?: number;
  LensArn?: string;
  PillarId?: string;
  QuestionId?: string;
  ChoiceId?: string;
}
export type CheckId = string;
export type CheckName = string;
export type CheckDescription = string;
export type CheckProvider = "TRUSTED_ADVISOR" | (string & {});
export type CheckStatus =
  | "OKAY"
  | "WARNING"
  | "ERROR"
  | "NOT_AVAILABLE"
  | "FETCH_FAILED"
  | (string & {});
export type FlaggedResources = number;
export type CheckFailureReason =
  | "ASSUME_ROLE_ERROR"
  | "ACCESS_DENIED"
  | "UNKNOWN_ERROR"
  | "PREMIUM_SUPPORT_REQUIRED"
  | (string & {});
export interface CheckDetail {
  Id?: string;
  Name?: string;
  Description?: string;
  Provider?: CheckProvider;
  LensArn?: string;
  PillarId?: string;
  QuestionId?: string;
  ChoiceId?: string;
  Status?: CheckStatus;
  AccountId?: string;
  FlaggedResources?: number;
  Reason?: CheckFailureReason;
  UpdatedAt?: Date;
}
export type CheckDetails = CheckDetail[];
export interface ListCheckDetailsOutput {
  CheckDetails?: CheckDetail[];
  NextToken?: string;
}
export interface ListCheckSummariesInput {
  WorkloadId: string;
  NextToken?: string;
  MaxResults?: number;
  LensArn?: string;
  PillarId?: string;
  QuestionId?: string;
  ChoiceId?: string;
}
export type CheckStatusCount = number;
export type AccountSummary = { [key in CheckStatus]?: number };
export interface CheckSummary {
  Id?: string;
  Name?: string;
  Provider?: CheckProvider;
  Description?: string;
  UpdatedAt?: Date;
  LensArn?: string;
  PillarId?: string;
  QuestionId?: string;
  ChoiceId?: string;
  Status?: CheckStatus;
  AccountSummary?: { [key: string]: number | undefined };
}
export type CheckSummaries = CheckSummary[];
export interface ListCheckSummariesOutput {
  CheckSummaries?: CheckSummary[];
  NextToken?: string;
}
export type LensType =
  | "AWS_OFFICIAL"
  | "CUSTOM_SHARED"
  | "CUSTOM_SELF"
  | (string & {});
export interface ListLensesInput {
  NextToken?: string;
  MaxResults?: number;
  LensType?: LensType;
  LensStatus?: LensStatusType;
  LensName?: string;
}
export interface LensSummary {
  LensArn?: string;
  LensAlias?: string;
  LensName?: string;
  LensType?: LensType;
  Description?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
  LensVersion?: string;
  Owner?: string;
  LensStatus?: LensStatus;
}
export type LensSummaries = LensSummary[];
export interface ListLensesOutput {
  LensSummaries?: LensSummary[];
  NextToken?: string;
}
export interface ListLensReviewImprovementsInput {
  WorkloadId: string;
  LensAlias: string;
  PillarId?: string;
  MilestoneNumber?: number;
  NextToken?: string;
  MaxResults?: number;
  QuestionPriority?: QuestionPriority;
}
export interface ChoiceImprovementPlan {
  ChoiceId?: string;
  DisplayText?: string;
  ImprovementPlanUrl?: string;
}
export type ChoiceImprovementPlans = ChoiceImprovementPlan[];
export interface ImprovementSummary {
  QuestionId?: string;
  PillarId?: string;
  QuestionTitle?: string;
  Risk?: Risk;
  ImprovementPlanUrl?: string;
  ImprovementPlans?: ChoiceImprovementPlan[];
  JiraConfiguration?: JiraConfiguration;
}
export type ImprovementSummaries = ImprovementSummary[];
export interface ListLensReviewImprovementsOutput {
  WorkloadId?: string;
  MilestoneNumber?: number;
  LensAlias?: string;
  LensArn?: string;
  ImprovementSummaries?: ImprovementSummary[];
  NextToken?: string;
}
export interface ListLensReviewsInput {
  WorkloadId: string;
  MilestoneNumber?: number;
  NextToken?: string;
  MaxResults?: number;
}
export interface LensReviewSummary {
  LensAlias?: string;
  LensArn?: string;
  LensVersion?: string;
  LensName?: string;
  LensStatus?: LensStatus;
  UpdatedAt?: Date;
  RiskCounts?: { [key: string]: number | undefined };
  Profiles?: WorkloadProfile[];
  PrioritizedRiskCounts?: { [key: string]: number | undefined };
}
export type LensReviewSummaries = LensReviewSummary[];
export interface ListLensReviewsOutput {
  WorkloadId?: string;
  MilestoneNumber?: number;
  LensReviewSummaries?: LensReviewSummary[];
  NextToken?: string;
}
export type SharedWithPrefix = string;
export type ShareStatus =
  | "ACCEPTED"
  | "REJECTED"
  | "PENDING"
  | "REVOKED"
  | "EXPIRED"
  | "ASSOCIATING"
  | "ASSOCIATED"
  | "FAILED"
  | (string & {});
export interface ListLensSharesInput {
  LensAlias: string;
  SharedWithPrefix?: string;
  NextToken?: string;
  MaxResults?: number;
  Status?: ShareStatus;
}
export interface LensShareSummary {
  ShareId?: string;
  SharedWith?: string;
  Status?: ShareStatus;
  StatusMessage?: string;
}
export type LensShareSummaries = LensShareSummary[];
export interface ListLensSharesOutput {
  LensShareSummaries?: LensShareSummary[];
  NextToken?: string;
}
export interface ListMilestonesInput {
  WorkloadId: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface WorkloadSummary {
  WorkloadId?: string;
  WorkloadArn?: string;
  WorkloadName?: string;
  Owner?: string;
  UpdatedAt?: Date;
  Lenses?: string[];
  RiskCounts?: { [key: string]: number | undefined };
  ImprovementStatus?: WorkloadImprovementStatus;
  Profiles?: WorkloadProfile[];
  PrioritizedRiskCounts?: { [key: string]: number | undefined };
}
export interface MilestoneSummary {
  MilestoneNumber?: number;
  MilestoneName?: string;
  RecordedAt?: Date;
  WorkloadSummary?: WorkloadSummary;
}
export type MilestoneSummaries = MilestoneSummary[];
export interface ListMilestonesOutput {
  WorkloadId?: string;
  MilestoneSummaries?: MilestoneSummary[];
  NextToken?: string;
}
export type ResourceArn = string;
export interface ListNotificationsInput {
  WorkloadId?: string;
  NextToken?: string;
  MaxResults?: number;
  ResourceArn?: string;
}
export type NotificationType =
  | "LENS_VERSION_UPGRADED"
  | "LENS_VERSION_DEPRECATED"
  | (string & {});
export interface LensUpgradeSummary {
  WorkloadId?: string;
  WorkloadName?: string;
  LensAlias?: string;
  LensArn?: string;
  CurrentLensVersion?: string;
  LatestLensVersion?: string;
  ResourceArn?: string;
  ResourceName?: string;
}
export interface NotificationSummary {
  Type?: NotificationType;
  LensUpgradeSummary?: LensUpgradeSummary;
}
export type NotificationSummaries = NotificationSummary[];
export interface ListNotificationsOutput {
  NotificationSummaries?: NotificationSummary[];
  NextToken?: string;
}
export interface ListProfileNotificationsInput {
  WorkloadId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type ProfileNotificationType =
  | "PROFILE_ANSWERS_UPDATED"
  | "PROFILE_DELETED"
  | (string & {});
export interface ProfileNotificationSummary {
  CurrentProfileVersion?: string;
  LatestProfileVersion?: string;
  Type?: ProfileNotificationType;
  ProfileArn?: string;
  ProfileName?: string;
  WorkloadId?: string;
  WorkloadName?: string;
}
export type ProfileNotificationSummaries = ProfileNotificationSummary[];
export interface ListProfileNotificationsOutput {
  NotificationSummaries?: ProfileNotificationSummary[];
  NextToken?: string;
}
export type ProfileNamePrefix = string;
export type ProfileOwnerType = "SELF" | "SHARED" | (string & {});
export interface ListProfilesInput {
  ProfileNamePrefix?: string;
  ProfileOwnerType?: ProfileOwnerType;
  NextToken?: string;
  MaxResults?: number;
}
export interface ProfileSummary {
  ProfileArn?: string;
  ProfileVersion?: string;
  ProfileName?: string;
  ProfileDescription?: string;
  Owner?: string;
  CreatedAt?: Date;
  UpdatedAt?: Date;
}
export type ProfileSummaries = ProfileSummary[];
export interface ListProfilesOutput {
  ProfileSummaries?: ProfileSummary[];
  NextToken?: string;
}
export interface ListProfileSharesInput {
  ProfileArn: string;
  SharedWithPrefix?: string;
  NextToken?: string;
  MaxResults?: number;
  Status?: ShareStatus;
}
export interface ProfileShareSummary {
  ShareId?: string;
  SharedWith?: string;
  Status?: ShareStatus;
  StatusMessage?: string;
}
export type ProfileShareSummaries = ProfileShareSummary[];
export interface ListProfileSharesOutput {
  ProfileShareSummaries?: ProfileShareSummary[];
  NextToken?: string;
}
export interface ListReviewTemplateAnswersInput {
  TemplateArn: string;
  LensAlias: string;
  PillarId?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ReviewTemplateAnswerSummary {
  QuestionId?: string;
  PillarId?: string;
  QuestionTitle?: string;
  Choices?: Choice[];
  SelectedChoices?: string[];
  ChoiceAnswerSummaries?: ChoiceAnswerSummary[];
  IsApplicable?: boolean;
  AnswerStatus?: ReviewTemplateAnswerStatus;
  Reason?: AnswerReason;
  QuestionType?: QuestionType;
}
export type ReviewTemplateAnswerSummaries = ReviewTemplateAnswerSummary[];
export interface ListReviewTemplateAnswersOutput {
  TemplateArn?: string;
  LensAlias?: string;
  AnswerSummaries?: ReviewTemplateAnswerSummary[];
  NextToken?: string;
}
export interface ListReviewTemplatesInput {
  NextToken?: string;
  MaxResults?: number;
}
export interface ReviewTemplateSummary {
  Description?: string;
  Lenses?: string[];
  Owner?: string;
  UpdatedAt?: Date;
  TemplateArn?: string;
  TemplateName?: string;
  UpdateStatus?: ReviewTemplateUpdateStatus;
}
export type ReviewTemplates = ReviewTemplateSummary[];
export interface ListReviewTemplatesOutput {
  ReviewTemplates?: ReviewTemplateSummary[];
  NextToken?: string;
}
export type WorkloadNamePrefix = string;
export type LensNamePrefix = string;
export type ShareResourceType =
  | "WORKLOAD"
  | "LENS"
  | "PROFILE"
  | "TEMPLATE"
  | (string & {});
export type TemplateNamePrefix = string;
export interface ListShareInvitationsInput {
  WorkloadNamePrefix?: string;
  LensNamePrefix?: string;
  ShareResourceType?: ShareResourceType;
  NextToken?: string;
  MaxResults?: number;
  ProfileNamePrefix?: string;
  TemplateNamePrefix?: string;
}
export interface ShareInvitationSummary {
  ShareInvitationId?: string;
  SharedBy?: string;
  SharedWith?: string;
  PermissionType?: PermissionType;
  ShareResourceType?: ShareResourceType;
  WorkloadName?: string;
  WorkloadId?: string;
  LensName?: string;
  LensArn?: string;
  ProfileName?: string;
  ProfileArn?: string;
  TemplateName?: string;
  TemplateArn?: string;
}
export type ShareInvitationSummaries = ShareInvitationSummary[];
export interface ListShareInvitationsOutput {
  ShareInvitationSummaries?: ShareInvitationSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceInput {
  WorkloadArn: string;
}
export interface ListTagsForResourceOutput {
  Tags?: { [key: string]: string | undefined };
}
export interface ListTemplateSharesInput {
  TemplateArn: string;
  SharedWithPrefix?: string;
  NextToken?: string;
  MaxResults?: number;
  Status?: ShareStatus;
}
export interface TemplateShareSummary {
  ShareId?: string;
  SharedWith?: string;
  Status?: ShareStatus;
  StatusMessage?: string;
}
export type TemplateShareSummaries = TemplateShareSummary[];
export interface ListTemplateSharesOutput {
  TemplateArn?: string;
  TemplateShareSummaries?: TemplateShareSummary[];
  NextToken?: string;
}
export interface ListWorkloadsInput {
  WorkloadNamePrefix?: string;
  NextToken?: string;
  MaxResults?: number;
}
export type WorkloadSummaries = WorkloadSummary[];
export interface ListWorkloadsOutput {
  WorkloadSummaries?: WorkloadSummary[];
  NextToken?: string;
}
export interface ListWorkloadSharesInput {
  WorkloadId: string;
  SharedWithPrefix?: string;
  NextToken?: string;
  MaxResults?: number;
  Status?: ShareStatus;
}
export interface WorkloadShareSummary {
  ShareId?: string;
  SharedWith?: string;
  PermissionType?: PermissionType;
  Status?: ShareStatus;
  StatusMessage?: string;
}
export type WorkloadShareSummaries = WorkloadShareSummary[];
export interface ListWorkloadSharesOutput {
  WorkloadId?: string;
  WorkloadShareSummaries?: WorkloadShareSummary[];
  NextToken?: string;
}
export type RecommendationFeedbackType =
  | "USEFUL"
  | "NOT_USEFUL"
  | (string & {});
export type FeedbackCategory =
  | "OTHER"
  | "RECOMMENDATION_NOT_RELEVANT"
  | "RESOURCE_NOT_IMPORTANT"
  | "RESOURCE_TYPE_NOT_IMPORTANT"
  | "RECOMMENDATION_INCORRECT"
  | (string & {});
export interface PutAgentRecommendationFeedbackRequest {
  recommendationArn: string;
  type: RecommendationFeedbackType;
  feedbackCategory?: FeedbackCategory;
  comments?: string;
}
export interface PutAgentRecommendationFeedbackResponse {}
export type RecommendationTypes = RecommendationType[];
export interface StartAgentRecommendationGenerationRequest {
  profileArn: string;
  types: RecommendationType[];
  name?: string;
  additionalContext?: any;
  scope: Scope;
}
export interface StartAgentRecommendationGenerationResponse {
  id: string;
  profileArn: string;
  name?: string;
  status: GenerationStatus;
  estimatedCompletionTime?: Date;
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export interface TagResourceInput {
  WorkloadArn: string;
  Tags?: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  WorkloadArn: string;
  TagKeys?: string[];
}
export interface UntagResourceOutput {}
export interface UpdateAgentContextRequest {
  clientToken?: string;
  profileArn: string;
  id: string;
  title?: string | redacted.Redacted<string>;
  content?: ContextContent;
}
export interface UpdateAgentContextResponse {
  context: ContextSummary;
}
export interface UpdateAgentGoalRequest {
  clientToken?: string;
  profileArn: string;
  id: string;
  pillars?: Pillar[];
  title?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
}
export interface UpdateAgentGoalResponse {
  goal: GoalSummary;
}
export interface UpdateAgentProfileRequest {
  clientToken?: string;
  profileArn: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  executionRoleArn?: string;
  aggregationConfiguration?: AggregationConfiguration[];
  businessOverview?: string | redacted.Redacted<string>;
  pillars?: Pillar[];
  deletionProtection?: boolean;
}
export interface UpdateAgentProfileResponse {
  name: string;
  displayName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  businessOverview?: string | redacted.Redacted<string>;
  pillars: Pillar[];
  deletionProtection?: boolean;
  executionRoleArn: string;
  aggregationConfiguration: AggregationConfiguration[];
  arn: string;
  eligibleForScheduledGeneration?: boolean;
  eligibleForArchitectureGeneration?: boolean;
  fieldErrors?: { [key: string]: string | undefined };
  tags?: Tag[];
  createdBy: string;
  createdAt: Date;
  lastModifiedBy?: string;
  lastModifiedAt?: Date;
}
export interface UpdateAgentRecommendationStatusRequest {
  recommendationArn: string;
  status: RecommendationStatus;
  updateReason?: string | redacted.Redacted<string>;
}
export interface UpdateAgentRecommendationStatusResponse {}
export interface ChoiceUpdate {
  Status?: ChoiceStatus;
  Reason?: ChoiceReason;
  Notes?: string;
}
export type ChoiceUpdates = { [key: string]: ChoiceUpdate | undefined };
export interface UpdateAnswerInput {
  WorkloadId: string;
  LensAlias: string;
  QuestionId: string;
  SelectedChoices?: string[];
  ChoiceUpdates?: { [key: string]: ChoiceUpdate | undefined };
  Notes?: string;
  IsApplicable?: boolean;
  Reason?: AnswerReason;
}
export interface UpdateAnswerOutput {
  WorkloadId?: string;
  LensAlias?: string;
  LensArn?: string;
  Answer?: Answer;
}
export type IntegrationStatusInput = "NOT_CONFIGURED" | (string & {});
export interface AccountJiraConfigurationInput {
  IssueManagementStatus?: AccountJiraIssueManagementStatus;
  IssueManagementType?: IssueManagementType;
  JiraProjectKey?: string;
  IntegrationStatus?: IntegrationStatusInput;
}
export interface UpdateGlobalSettingsInput {
  OrganizationSharingStatus?: OrganizationSharingStatus;
  DiscoveryIntegrationStatus?: DiscoveryIntegrationStatus;
  JiraConfiguration?: AccountJiraConfigurationInput;
}
export interface UpdateGlobalSettingsResponse {}
export type IntegratingService = "JIRA" | (string & {});
export interface UpdateIntegrationInput {
  WorkloadId: string;
  ClientRequestToken?: string;
  IntegratingService?: IntegratingService;
}
export interface UpdateIntegrationResponse {}
export type PillarNotes = { [key: string]: string | undefined };
export interface UpdateLensReviewInput {
  WorkloadId: string;
  LensAlias: string;
  LensNotes?: string;
  PillarNotes?: { [key: string]: string | undefined };
  JiraConfiguration?: JiraSelectedQuestionConfiguration;
}
export interface UpdateLensReviewOutput {
  WorkloadId?: string;
  LensReview?: LensReview;
}
export interface UpdateProfileInput {
  ProfileArn: string;
  ProfileDescription?: string;
  ProfileQuestions?: ProfileQuestionUpdate[];
}
export interface UpdateProfileOutput {
  Profile?: Profile;
}
export type ReviewTemplateLensAliases = string[];
export interface UpdateReviewTemplateInput {
  TemplateArn: string;
  TemplateName?: string;
  Description?: string;
  Notes?: string;
  LensesToAssociate?: string[];
  LensesToDisassociate?: string[];
}
export interface UpdateReviewTemplateOutput {
  ReviewTemplate?: ReviewTemplate;
}
export interface UpdateReviewTemplateAnswerInput {
  TemplateArn: string;
  LensAlias: string;
  QuestionId: string;
  SelectedChoices?: string[];
  ChoiceUpdates?: { [key: string]: ChoiceUpdate | undefined };
  Notes?: string;
  IsApplicable?: boolean;
  Reason?: AnswerReason;
}
export interface UpdateReviewTemplateAnswerOutput {
  TemplateArn?: string;
  LensAlias?: string;
  Answer?: ReviewTemplateAnswer;
}
export interface UpdateReviewTemplateLensReviewInput {
  TemplateArn: string;
  LensAlias: string;
  LensNotes?: string;
  PillarNotes?: { [key: string]: string | undefined };
}
export interface UpdateReviewTemplateLensReviewOutput {
  TemplateArn?: string;
  LensReview?: ReviewTemplateLensReview;
}
export type ShareInvitationAction = "ACCEPT" | "REJECT" | (string & {});
export interface UpdateShareInvitationInput {
  ShareInvitationId: string;
  ShareInvitationAction?: ShareInvitationAction;
}
export interface ShareInvitation {
  ShareInvitationId?: string;
  ShareResourceType?: ShareResourceType;
  WorkloadId?: string;
  LensAlias?: string;
  LensArn?: string;
  ProfileArn?: string;
  TemplateArn?: string;
}
export interface UpdateShareInvitationOutput {
  ShareInvitation?: ShareInvitation;
}
export interface UpdateWorkloadInput {
  WorkloadId: string;
  WorkloadName?: string;
  Description?: string;
  Environment?: WorkloadEnvironment;
  AccountIds?: string[];
  AwsRegions?: string[];
  NonAwsRegions?: string[];
  PillarPriorities?: string[];
  ArchitecturalDesign?: string;
  ReviewOwner?: string;
  IsReviewOwnerUpdateAcknowledged?: boolean;
  IndustryType?: string;
  Industry?: string;
  Notes?: string;
  ImprovementStatus?: WorkloadImprovementStatus;
  DiscoveryConfig?: WorkloadDiscoveryConfig;
  Applications?: string[];
  JiraConfiguration?: WorkloadJiraConfigurationInput;
}
export interface UpdateWorkloadOutput {
  Workload?: Workload;
}
export interface UpdateWorkloadShareInput {
  ShareId: string;
  WorkloadId: string;
  PermissionType?: PermissionType;
}
export interface WorkloadShare {
  ShareId?: string;
  SharedBy?: string;
  SharedWith?: string;
  PermissionType?: PermissionType;
  Status?: ShareStatus;
  WorkloadName?: string;
  WorkloadId?: string;
}
export interface UpdateWorkloadShareOutput {
  WorkloadId?: string;
  WorkloadShare?: WorkloadShare;
}
export interface UpgradeLensReviewInput {
  WorkloadId: string;
  LensAlias: string;
  MilestoneName?: string;
  ClientRequestToken?: string;
}
export interface UpgradeLensReviewResponse {}
export interface UpgradeProfileVersionInput {
  WorkloadId: string;
  ProfileArn: string;
  MilestoneName?: string;
  ClientRequestToken?: string;
}
export interface UpgradeProfileVersionResponse {}
export interface UpgradeReviewTemplateLensReviewInput {
  TemplateArn: string;
  LensAlias: string;
  ClientRequestToken?: string;
}
export interface UpgradeReviewTemplateLensReviewResponse {}
export type ExceptionMessage = string;
export type ExceptionResourceId = string;
export type ExceptionResourceType = string;
export type QuotaCode = string;
export type ServiceCode = string;
export type ValidationExceptionReason =
  | "UNKNOWN_OPERATION"
  | "CANNOT_PARSE"
  | "FIELD_VALIDATION_FAILED"
  | "OTHER"
  | (string & {});
export type ValidationExceptionFieldName = string;
export interface ValidationExceptionField {
  Name?: string;
  Message?: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateLensesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associate a lens to a workload.
 *
 * Up to 10 lenses can be associated with a workload in a single API operation. A maximum of 20 lenses can be associated with a workload.
 *
 * **Disclaimer**
 *
 * By accessing and/or applying custom lenses created by another Amazon Web Services user or account, you acknowledge that custom lenses created by other users and shared with you are Third Party Content as defined in the Amazon Web Services Customer Agreement.
 */
export const associateLenses: API.OperationMethod<
  AssociateLensesInput,
  AssociateLensesResponse,
  AssociateLensesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /workloads/{WorkloadId}/associateLenses",
    input: { WorkloadId: 0, LensAliases: 0 },
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
  operationName: "AssociateLenses",
})) as any;

export type AssociateProfilesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associate a profile with a workload.
 */
export const associateProfiles: API.OperationMethod<
  AssociateProfilesInput,
  AssociateProfilesResponse,
  AssociateProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /workloads/{WorkloadId}/associateProfiles",
    input: { WorkloadId: 0, ProfileArns: 0 },
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
  operationName: "AssociateProfiles",
})) as any;

export type CreateAgentContextError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a context associated with an optimization profile. Contexts provide application and environment information used during recommendation generation.
 */
export const createAgentContext: API.OperationMethod<
  CreateAgentContextRequest,
  CreateAgentContextResponse,
  CreateAgentContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /api/v1/agent-profiles/{profileArn}/contexts",
    input: {
      clientToken: D.m({ idempotency: true }),
      profileArn: 0,
      title: 0,
      contextType: 0,
      content: i_ContextContent,
    },
    output: { context: o_ContextSummary },
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
  operationName: "CreateAgentContext",
})) as any;

export type CreateAgentGoalError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an optimization goal associated with a profile. Goals define specific targets and objectives for the optimization process.
 */
export const createAgentGoal: API.OperationMethod<
  CreateAgentGoalRequest,
  CreateAgentGoalResponse,
  CreateAgentGoalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /api/v1/agent-profiles/{profileArn}/goals",
    input: {
      clientToken: D.m({ idempotency: true }),
      profileArn: 0,
      pillars: 0,
      title: 0,
      description: 0,
    },
    output: { goal: o_GoalSummary },
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
  operationName: "CreateAgentGoal",
})) as any;

export type CreateAgentProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an optimization profile that defines the scope and configuration for generating recommendations. A profile specifies the execution role, target pillars, and aggregation settings for analyzing your Amazon Web Services resources.
 */
export const createAgentProfile: API.OperationMethod<
  CreateAgentProfileRequest,
  CreateAgentProfileResponse,
  CreateAgentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /api/v1/agent-profiles",
    input: {
      name: 0,
      displayName: 0,
      description: 0,
      businessOverview: 0,
      pillars: 0,
      deletionProtection: 0,
      executionRoleArn: 0,
      aggregationConfiguration: D.list(i_AggregationConfiguration),
      clientToken: D.m({ idempotency: true }),
      tags: D.list({ key: 0, value: 0 }),
    },
    output: {
      displayName: D.secret,
      description: D.secret,
      businessOverview: D.secret,
      createdAt: D.ts,
      lastModifiedAt: D.ts,
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
  operationName: "CreateAgentProfile",
})) as any;

export type CreateLensShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a lens share.
 *
 * The owner of a lens can share it with other Amazon Web Services accounts, users, an organization, and organizational units (OUs) in the same Amazon Web Services Region. Lenses provided by Amazon Web Services (Amazon Web Services Official Content) cannot be shared.
 *
 * Shared access to a lens is not removed until the lens invitation is deleted.
 *
 * If you share a lens with an organization or OU, all accounts in the organization or OU are granted access to the lens.
 *
 * For more information, see Sharing a custom lens in the *Well-Architected Tool User Guide*.
 *
 * **Disclaimer**
 *
 * By sharing your custom lenses with other Amazon Web Services accounts, you acknowledge that Amazon Web Services will make your custom lenses available to those other accounts. Those other accounts may continue to access and use your shared custom lenses even if you delete the custom lenses from your own Amazon Web Services account or terminate your Amazon Web Services account.
 */
export const createLensShare: API.OperationMethod<
  CreateLensShareInput,
  CreateLensShareOutput,
  CreateLensShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /lenses/{LensAlias}/shares",
    input: {
      LensAlias: 0,
      SharedWith: 0,
      ClientRequestToken: D.m({ idempotency: true }),
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
  operationName: "CreateLensShare",
})) as any;

export type CreateLensVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new lens version.
 *
 * A lens can have up to 100 versions.
 *
 * Use this operation to publish a new lens version after you have imported a lens. The `LensAlias` is used to identify the lens to be published. The owner of a lens can share the lens with other Amazon Web Services accounts and users in the same Amazon Web Services Region. Only the owner of a lens can delete it.
 */
export const createLensVersion: API.OperationMethod<
  CreateLensVersionInput,
  CreateLensVersionOutput,
  CreateLensVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /lenses/{LensAlias}/versions",
    input: {
      LensAlias: 0,
      LensVersion: 0,
      IsMajorVersion: 0,
      ClientRequestToken: D.m({ idempotency: true }),
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
  operationName: "CreateLensVersion",
})) as any;

export type CreateMilestoneError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a milestone for an existing workload.
 */
export const createMilestone: API.OperationMethod<
  CreateMilestoneInput,
  CreateMilestoneOutput,
  CreateMilestoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workloads/{WorkloadId}/milestones",
    input: {
      WorkloadId: 0,
      MilestoneName: 0,
      ClientRequestToken: D.m({ idempotency: true }),
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
  operationName: "CreateMilestone",
})) as any;

export type CreateProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a profile.
 */
export const createProfile: API.OperationMethod<
  CreateProfileInput,
  CreateProfileOutput,
  CreateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /profiles",
    input: {
      ProfileName: 0,
      ProfileDescription: 0,
      ProfileQuestions: D.list(i_ProfileQuestionUpdate),
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: 0,
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
  operationName: "CreateProfile",
})) as any;

export type CreateProfileShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a profile share.
 */
export const createProfileShare: API.OperationMethod<
  CreateProfileShareInput,
  CreateProfileShareOutput,
  CreateProfileShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /profiles/{ProfileArn}/shares",
    input: {
      ProfileArn: 0,
      SharedWith: 0,
      ClientRequestToken: D.m({ idempotency: true }),
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
  operationName: "CreateProfileShare",
})) as any;

export type CreateReviewTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a review template.
 *
 * **Disclaimer**
 *
 * Do not include or gather personal identifiable information (PII) of end users or other identifiable individuals in or via your review templates. If your review template or those shared with you and used in your account do include or collect PII you are responsible for: ensuring that the included PII is processed in accordance with applicable law, providing adequate privacy notices, and obtaining necessary consents for processing such data.
 */
export const createReviewTemplate: API.OperationMethod<
  CreateReviewTemplateInput,
  CreateReviewTemplateOutput,
  CreateReviewTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /reviewTemplates",
    input: {
      TemplateName: 0,
      Description: 0,
      Lenses: 0,
      Notes: 0,
      Tags: 0,
      ClientRequestToken: D.m({ idempotency: true }),
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
  operationName: "CreateReviewTemplate",
})) as any;

export type CreateTemplateShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a review template share.
 *
 * The owner of a review template can share it with other Amazon Web Services accounts, users, an organization, and organizational units (OUs) in the same Amazon Web Services Region.
 *
 * Shared access to a review template is not removed until the review template share invitation is deleted.
 *
 * If you share a review template with an organization or OU, all accounts in the organization or OU are granted access to the review template.
 *
 * **Disclaimer**
 *
 * By sharing your review template with other Amazon Web Services accounts, you acknowledge that Amazon Web Services will make your review template available to those other accounts.
 */
export const createTemplateShare: API.OperationMethod<
  CreateTemplateShareInput,
  CreateTemplateShareOutput,
  CreateTemplateShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /templates/shares/{TemplateArn}",
    input: {
      TemplateArn: 0,
      SharedWith: 0,
      ClientRequestToken: D.m({ idempotency: true }),
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
  operationName: "CreateTemplateShare",
})) as any;

export type CreateWorkloadError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new workload.
 *
 * The owner of a workload can share the workload with other Amazon Web Services accounts, users, an organization, and organizational units (OUs) in the same Amazon Web Services Region. Only the owner of a workload can delete it.
 *
 * For more information, see Defining a Workload in the *Well-Architected Tool User Guide*.
 *
 * Either `AwsRegions`, `NonAwsRegions`, or both must be specified when creating a workload.
 *
 * You also must specify `ReviewOwner`, even though the parameter is listed as not being required in the following section.
 *
 * When creating a workload using a review template, you must have the following IAM permissions:
 *
 * - `wellarchitected:GetReviewTemplate`
 *
 * - `wellarchitected:GetReviewTemplateAnswer`
 *
 * - `wellarchitected:ListReviewTemplateAnswers`
 *
 * - `wellarchitected:GetReviewTemplateLensReview`
 */
export const createWorkload: API.OperationMethod<
  CreateWorkloadInput,
  CreateWorkloadOutput,
  CreateWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workloads",
    input: {
      WorkloadName: 0,
      Description: 0,
      Environment: 0,
      AccountIds: 0,
      AwsRegions: 0,
      NonAwsRegions: 0,
      PillarPriorities: 0,
      ArchitecturalDesign: 0,
      ReviewOwner: 0,
      IndustryType: 0,
      Industry: 0,
      Lenses: 0,
      Notes: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: 0,
      DiscoveryConfig: i_WorkloadDiscoveryConfig,
      Applications: 0,
      ProfileArns: 0,
      ReviewTemplateArns: 0,
      JiraConfiguration: i_WorkloadJiraConfigurationInput,
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
  operationName: "CreateWorkload",
})) as any;

export type CreateWorkloadShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a workload share.
 *
 * The owner of a workload can share it with other Amazon Web Services accounts and users in the same Amazon Web Services Region. Shared access to a workload is not removed until the workload invitation is deleted.
 *
 * If you share a workload with an organization or OU, all accounts in the organization or OU are granted access to the workload.
 *
 * For more information, see Sharing a workload in the *Well-Architected Tool User Guide*.
 */
export const createWorkloadShare: API.OperationMethod<
  CreateWorkloadShareInput,
  CreateWorkloadShareOutput,
  CreateWorkloadShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workloads/{WorkloadId}/shares",
    input: {
      WorkloadId: 0,
      SharedWith: 0,
      PermissionType: 0,
      ClientRequestToken: D.m({ idempotency: true }),
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
  operationName: "CreateWorkloadShare",
})) as any;

export type DeleteAgentContextError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a context associated with a profile.
 */
export const deleteAgentContext: API.OperationMethod<
  DeleteAgentContextRequest,
  DeleteAgentContextResponse,
  DeleteAgentContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/agent-profiles/{profileArn}/contexts/{id}",
    input: { profileArn: 0, id: 0 },
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
  operationName: "DeleteAgentContext",
})) as any;

export type DeleteAgentGoalError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an optimization goal from a profile.
 */
export const deleteAgentGoal: API.OperationMethod<
  DeleteAgentGoalRequest,
  DeleteAgentGoalResponse,
  DeleteAgentGoalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/agent-profiles/{profileArn}/goals/{id}",
    input: { profileArn: 0, id: 0 },
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
  operationName: "DeleteAgentGoal",
})) as any;

export type DeleteAgentProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an optimization profile and its associated configuration. This action cannot be undone.
 */
export const deleteAgentProfile: API.OperationMethod<
  DeleteAgentProfileRequest,
  DeleteAgentProfileResponse,
  DeleteAgentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /api/v1/agent-profiles/{profileArn}",
    input: { profileArn: 0 },
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
  operationName: "DeleteAgentProfile",
})) as any;

export type DeleteLensError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an existing lens.
 *
 * Only the owner of a lens can delete it. After the lens is deleted, Amazon Web Services accounts and users that you shared the lens with can continue to use it, but they will no longer be able to apply it to new workloads.
 *
 * **Disclaimer**
 *
 * By sharing your custom lenses with other Amazon Web Services accounts, you acknowledge that Amazon Web Services will make your custom lenses available to those other accounts. Those other accounts may continue to access and use your shared custom lenses even if you delete the custom lenses from your own Amazon Web Services account or terminate your Amazon Web Services account.
 */
export const deleteLens: API.OperationMethod<
  DeleteLensInput,
  DeleteLensResponse,
  DeleteLensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /lenses/{LensAlias}",
    input: {
      LensAlias: 0,
      ClientRequestToken: D.m({
        query: "ClientRequestToken",
        idempotency: true,
      }),
      LensStatus: D.m({ query: "LensStatus" }),
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
  operationName: "DeleteLens",
})) as any;

export type DeleteLensShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a lens share.
 *
 * After the lens share is deleted, Amazon Web Services accounts, users, organizations, and organizational units (OUs) that you shared the lens with can continue to use it, but they will no longer be able to apply it to new workloads.
 *
 * **Disclaimer**
 *
 * By sharing your custom lenses with other Amazon Web Services accounts, you acknowledge that Amazon Web Services will make your custom lenses available to those other accounts. Those other accounts may continue to access and use your shared custom lenses even if you delete the custom lenses from your own Amazon Web Services account or terminate your Amazon Web Services account.
 */
export const deleteLensShare: API.OperationMethod<
  DeleteLensShareInput,
  DeleteLensShareResponse,
  DeleteLensShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /lenses/{LensAlias}/shares/{ShareId}",
    input: {
      ShareId: 0,
      LensAlias: 0,
      ClientRequestToken: D.m({
        query: "ClientRequestToken",
        idempotency: true,
      }),
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
  operationName: "DeleteLensShare",
})) as any;

export type DeleteProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a profile.
 *
 * **Disclaimer**
 *
 * By sharing your profile with other Amazon Web Services accounts, you acknowledge that Amazon Web Services will make your profile available to those other accounts. Those other accounts may continue to access and use your shared profile even if you delete the profile from your own Amazon Web Services account or terminate your Amazon Web Services account.
 */
export const deleteProfile: API.OperationMethod<
  DeleteProfileInput,
  DeleteProfileResponse,
  DeleteProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /profiles/{ProfileArn}",
    input: {
      ProfileArn: 0,
      ClientRequestToken: D.m({
        query: "ClientRequestToken",
        idempotency: true,
      }),
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
  operationName: "DeleteProfile",
})) as any;

export type DeleteProfileShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a profile share.
 */
export const deleteProfileShare: API.OperationMethod<
  DeleteProfileShareInput,
  DeleteProfileShareResponse,
  DeleteProfileShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /profiles/{ProfileArn}/shares/{ShareId}",
    input: {
      ShareId: 0,
      ProfileArn: 0,
      ClientRequestToken: D.m({
        query: "ClientRequestToken",
        idempotency: true,
      }),
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
  operationName: "DeleteProfileShare",
})) as any;

export type DeleteReviewTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a review template.
 *
 * Only the owner of a review template can delete it.
 *
 * After the review template is deleted, Amazon Web Services accounts, users, organizations, and organizational units (OUs) that you shared the review template with will no longer be able to apply it to new workloads.
 */
export const deleteReviewTemplate: API.OperationMethod<
  DeleteReviewTemplateInput,
  DeleteReviewTemplateResponse,
  DeleteReviewTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /reviewTemplates/{TemplateArn}",
    input: {
      TemplateArn: 0,
      ClientRequestToken: D.m({
        query: "ClientRequestToken",
        idempotency: true,
      }),
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
  operationName: "DeleteReviewTemplate",
})) as any;

export type DeleteTemplateShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a review template share.
 *
 * After the review template share is deleted, Amazon Web Services accounts, users, organizations, and organizational units (OUs) that you shared the review template with will no longer be able to apply it to new workloads.
 */
export const deleteTemplateShare: API.OperationMethod<
  DeleteTemplateShareInput,
  DeleteTemplateShareResponse,
  DeleteTemplateShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /templates/shares/{TemplateArn}/{ShareId}",
    input: {
      ShareId: 0,
      TemplateArn: 0,
      ClientRequestToken: D.m({
        query: "ClientRequestToken",
        idempotency: true,
      }),
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
  operationName: "DeleteTemplateShare",
})) as any;

export type DeleteWorkloadError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete an existing workload.
 */
export const deleteWorkload: API.OperationMethod<
  DeleteWorkloadInput,
  DeleteWorkloadResponse,
  DeleteWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workloads/{WorkloadId}",
    input: {
      WorkloadId: 0,
      ClientRequestToken: D.m({
        query: "ClientRequestToken",
        idempotency: true,
      }),
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
  operationName: "DeleteWorkload",
})) as any;

export type DeleteWorkloadShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete a workload share.
 */
export const deleteWorkloadShare: API.OperationMethod<
  DeleteWorkloadShareInput,
  DeleteWorkloadShareResponse,
  DeleteWorkloadShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /workloads/{WorkloadId}/shares/{ShareId}",
    input: {
      ShareId: 0,
      WorkloadId: 0,
      ClientRequestToken: D.m({
        query: "ClientRequestToken",
        idempotency: true,
      }),
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
  operationName: "DeleteWorkloadShare",
})) as any;

export type DisassociateLensesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociate a lens from a workload.
 *
 * Up to 10 lenses can be disassociated from a workload in a single API operation.
 *
 * The Amazon Web Services Well-Architected Framework lens (`wellarchitected`) cannot be removed from a workload.
 */
export const disassociateLenses: API.OperationMethod<
  DisassociateLensesInput,
  DisassociateLensesResponse,
  DisassociateLensesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /workloads/{WorkloadId}/disassociateLenses",
    input: { WorkloadId: 0, LensAliases: 0 },
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
  operationName: "DisassociateLenses",
})) as any;

export type DisassociateProfilesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociate a profile from a workload.
 */
export const disassociateProfiles: API.OperationMethod<
  DisassociateProfilesInput,
  DisassociateProfilesResponse,
  DisassociateProfilesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /workloads/{WorkloadId}/disassociateProfiles",
    input: { WorkloadId: 0, ProfileArns: 0 },
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
  operationName: "DisassociateProfiles",
})) as any;

export type ExportLensError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Export an existing lens.
 *
 * Only the owner of a lens can export it. Lenses provided by Amazon Web Services (Amazon Web Services Official Content) cannot be exported.
 *
 * Lenses are defined in JSON. For more information, see JSON format specification in the *Well-Architected Tool User Guide*.
 *
 * **Disclaimer**
 *
 * Do not include or gather personal identifiable information (PII) of end users or other identifiable individuals in or via your custom lenses. If your custom lens or those shared with you and used in your account do include or collect PII you are responsible for: ensuring that the included PII is processed in accordance with applicable law, providing adequate privacy notices, and obtaining necessary consents for processing such data.
 */
export const exportLens: API.OperationMethod<
  ExportLensInput,
  ExportLensOutput,
  ExportLensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /lenses/{LensAlias}/export",
    input: { LensAlias: 0, LensVersion: D.m({ query: "LensVersion" }) },
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
  operationName: "ExportLens",
})) as any;

export type GetAgentContextError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific context associated with a profile.
 */
export const getAgentContext: API.OperationMethod<
  GetAgentContextRequest,
  GetAgentContextResponse,
  GetAgentContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/agent-profiles/{profileArn}/contexts/{id}",
    input: { profileArn: 0, id: 0 },
    output: { context: o_ContextSummary },
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
  operationName: "GetAgentContext",
})) as any;

export type GetAgentGoalError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific optimization goal.
 */
export const getAgentGoal: API.OperationMethod<
  GetAgentGoalRequest,
  GetAgentGoalResponse,
  GetAgentGoalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/agent-profiles/{profileArn}/goals/{id}",
    input: { profileArn: 0, id: 0 },
    output: { goal: o_GoalSummary },
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
  operationName: "GetAgentGoal",
})) as any;

export type GetAgentProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about an optimization profile, including its configuration and metadata.
 */
export const getAgentProfile: API.OperationMethod<
  GetAgentProfileRequest,
  GetAgentProfileResponse,
  GetAgentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/agent-profiles/{profileArn}",
    input: { profileArn: 0 },
    output: {
      displayName: D.secret,
      description: D.secret,
      businessOverview: D.secret,
      createdAt: D.ts,
      lastModifiedAt: D.ts,
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
  operationName: "GetAgentProfile",
})) as any;

export type GetAgentRecommendationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific optimization recommendation, including its impact analysis, content, and implementation guidance.
 */
export const getAgentRecommendation: API.OperationMethod<
  GetAgentRecommendationRequest,
  GetAgentRecommendationResponse,
  GetAgentRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/agent-recommendations/{recommendationArn}",
    input: {
      recommendationArn: 0,
      remediationType: D.m({ query: "remediationType" }),
    },
    output: {
      title: D.secret,
      description: D.secret,
      updateReason: D.secret,
      createdAt: D.ts,
      lastModifiedAt: D.ts,
      remediations: D.list({
        steps: D.list({ title: D.secret, content: D.secret }),
        createdAt: D.ts,
        lastModifiedAt: D.ts,
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
  operationName: "GetAgentRecommendation",
})) as any;

export type GetAgentRecommendationGenerationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a recommendation generation process, including its status, progress, and results. Recommendation generation is asynchronous: poll this operation until status reaches a terminal value of COMPLETED (results are ready) or ERROR (see errorDetails). Intermediate values are QUEUED and IN_PROGRESS.
 */
export const getAgentRecommendationGeneration: API.OperationMethod<
  GetAgentRecommendationGenerationRequest,
  GetAgentRecommendationGenerationResponse,
  GetAgentRecommendationGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/agent-profiles/{profileArn}/generations/{generationId}",
    input: { profileArn: 0, generationId: 0 },
    output: {
      estimatedCompletionTime: D.ts,
      createdAt: D.ts,
      lastModifiedAt: D.ts,
      startedAt: D.ts,
      endedAt: D.ts,
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
  operationName: "GetAgentRecommendationGeneration",
})) as any;

export type GetAnswerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the answer to a specific question in a workload review.
 */
export const getAnswer: API.OperationMethod<
  GetAnswerInput,
  GetAnswerOutput,
  GetAnswerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workloads/{WorkloadId}/lensReviews/{LensAlias}/answers/{QuestionId}",
    input: {
      WorkloadId: 0,
      LensAlias: 0,
      QuestionId: 0,
      MilestoneNumber: D.m({ query: "MilestoneNumber" }),
    },
    output: { Answer: o_Answer },
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
  operationName: "GetAnswer",
})) as any;

export type GetConsolidatedReportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a consolidated report of your workloads.
 *
 * You can optionally choose to include workloads that have been shared with you.
 */
export const getConsolidatedReport: API.PaginatedOperationMethod<
  GetConsolidatedReportInput,
  GetConsolidatedReportOutput,
  GetConsolidatedReportError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /consolidatedReport",
    input: {
      Format: D.m({ query: "Format" }),
      IncludeSharedResources: D.m({ query: "IncludeSharedResources" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: { Metrics: D.list({ UpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetConsolidatedReport",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type GetGlobalSettingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Global settings for all workloads.
 */
export const getGlobalSettings: API.OperationMethod<
  GetGlobalSettingsRequest,
  GetGlobalSettingsOutput,
  GetGlobalSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /global-settings" },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGlobalSettings",
})) as any;

export type GetLensError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get an existing lens.
 */
export const getLens: API.OperationMethod<
  GetLensInput,
  GetLensOutput,
  GetLensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /lenses/{LensAlias}",
    input: { LensAlias: 0, LensVersion: D.m({ query: "LensVersion" }) },
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
  operationName: "GetLens",
})) as any;

export type GetLensReviewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get lens review.
 */
export const getLensReview: API.OperationMethod<
  GetLensReviewInput,
  GetLensReviewOutput,
  GetLensReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workloads/{WorkloadId}/lensReviews/{LensAlias}",
    input: {
      WorkloadId: 0,
      LensAlias: 0,
      MilestoneNumber: D.m({ query: "MilestoneNumber" }),
    },
    output: { LensReview: o_LensReview },
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
  operationName: "GetLensReview",
})) as any;

export type GetLensReviewReportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get lens review report.
 */
export const getLensReviewReport: API.OperationMethod<
  GetLensReviewReportInput,
  GetLensReviewReportOutput,
  GetLensReviewReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workloads/{WorkloadId}/lensReviews/{LensAlias}/report",
    input: {
      WorkloadId: 0,
      LensAlias: 0,
      MilestoneNumber: D.m({ query: "MilestoneNumber" }),
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
  operationName: "GetLensReviewReport",
})) as any;

export type GetLensVersionDifferenceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get lens version differences.
 */
export const getLensVersionDifference: API.OperationMethod<
  GetLensVersionDifferenceInput,
  GetLensVersionDifferenceOutput,
  GetLensVersionDifferenceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /lenses/{LensAlias}/versionDifference",
    input: {
      LensAlias: 0,
      BaseLensVersion: D.m({ query: "BaseLensVersion" }),
      TargetLensVersion: D.m({ query: "TargetLensVersion" }),
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
  operationName: "GetLensVersionDifference",
})) as any;

export type GetMilestoneError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a milestone for an existing workload.
 */
export const getMilestone: API.OperationMethod<
  GetMilestoneInput,
  GetMilestoneOutput,
  GetMilestoneError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workloads/{WorkloadId}/milestones/{MilestoneNumber}",
    input: { WorkloadId: 0, MilestoneNumber: 0 },
    output: { Milestone: { RecordedAt: D.ts, Workload: o_Workload } },
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
  operationName: "GetMilestone",
})) as any;

export type GetProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get profile information.
 */
export const getProfile: API.OperationMethod<
  GetProfileInput,
  GetProfileOutput,
  GetProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /profiles/{ProfileArn}",
    input: { ProfileArn: 0, ProfileVersion: D.m({ query: "ProfileVersion" }) },
    output: { Profile: o_Profile },
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
  operationName: "GetProfile",
})) as any;

export type GetProfileTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get profile template.
 */
export const getProfileTemplate: API.OperationMethod<
  GetProfileTemplateInput,
  GetProfileTemplateOutput,
  GetProfileTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /profileTemplate",
    input: {},
    output: { ProfileTemplate: { CreatedAt: D.ts, UpdatedAt: D.ts } },
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
  operationName: "GetProfileTemplate",
})) as any;

export type GetReviewTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get review template.
 */
export const getReviewTemplate: API.OperationMethod<
  GetReviewTemplateInput,
  GetReviewTemplateOutput,
  GetReviewTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /reviewTemplates/{TemplateArn}",
    input: { TemplateArn: 0 },
    output: { ReviewTemplate: o_ReviewTemplate },
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
  operationName: "GetReviewTemplate",
})) as any;

export type GetReviewTemplateAnswerError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get review template answer.
 */
export const getReviewTemplateAnswer: API.OperationMethod<
  GetReviewTemplateAnswerInput,
  GetReviewTemplateAnswerOutput,
  GetReviewTemplateAnswerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /reviewTemplates/{TemplateArn}/lensReviews/{LensAlias}/answers/{QuestionId}",
    input: { TemplateArn: 0, LensAlias: 0, QuestionId: 0 },
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
  operationName: "GetReviewTemplateAnswer",
})) as any;

export type GetReviewTemplateLensReviewError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a lens review associated with a review template.
 */
export const getReviewTemplateLensReview: API.OperationMethod<
  GetReviewTemplateLensReviewInput,
  GetReviewTemplateLensReviewOutput,
  GetReviewTemplateLensReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /reviewTemplates/{TemplateArn}/lensReviews/{LensAlias}",
    input: { TemplateArn: 0, LensAlias: 0 },
    output: { LensReview: o_ReviewTemplateLensReview },
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
  operationName: "GetReviewTemplateLensReview",
})) as any;

export type GetWorkloadError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get an existing workload.
 */
export const getWorkload: API.OperationMethod<
  GetWorkloadInput,
  GetWorkloadOutput,
  GetWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /workloads/{WorkloadId}",
    input: { WorkloadId: 0 },
    output: { Workload: o_Workload },
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
  operationName: "GetWorkload",
})) as any;

export type ImportLensError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Import a new custom lens or update an existing custom lens.
 *
 * To update an existing custom lens, specify its ARN as the `LensAlias`. If no ARN is specified, a new custom lens is created.
 *
 * The new or updated lens will have a status of `DRAFT`. The lens cannot be applied to workloads or shared with other Amazon Web Services accounts until it's published with CreateLensVersion.
 *
 * Lenses are defined in JSON. For more information, see JSON format specification in the *Well-Architected Tool User Guide*.
 *
 * A custom lens cannot exceed 500 KB in size.
 *
 * **Disclaimer**
 *
 * Do not include or gather personal identifiable information (PII) of end users or other identifiable individuals in or via your custom lenses. If your custom lens or those shared with you and used in your account do include or collect PII you are responsible for: ensuring that the included PII is processed in accordance with applicable law, providing adequate privacy notices, and obtaining necessary consents for processing such data.
 */
export const importLens: API.OperationMethod<
  ImportLensInput,
  ImportLensOutput,
  ImportLensError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /importLens",
    input: {
      LensAlias: 0,
      JSONString: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: 0,
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
  operationName: "ImportLens",
})) as any;

export type ListAgentContextsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists contexts associated with a profile.
 */
export const listAgentContexts: API.PaginatedOperationMethod<
  ListAgentContextsRequest,
  ListAgentContextsResponse,
  ListAgentContextsError,
  Credentials | HttpClient.HttpClient,
  ContextSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/agent-profiles/{profileArn}/contexts",
    input: {
      profileArn: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list(o_ContextSummary) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentContexts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentGoalsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists optimization goals associated with a specified profile. Goals define specific targets and objectives for the optimization process.
 */
export const listAgentGoals: API.PaginatedOperationMethod<
  ListAgentGoalsRequest,
  ListAgentGoalsResponse,
  ListAgentGoalsError,
  Credentials | HttpClient.HttpClient,
  GoalSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/agent-profiles/{profileArn}/goals",
    input: {
      profileArn: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list(o_GoalSummary) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentGoals",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists optimization profiles in your account. Profiles define the scope and configuration for generating optimization recommendations.
 */
export const listAgentProfiles: API.PaginatedOperationMethod<
  ListAgentProfilesRequest,
  ListAgentProfilesResponse,
  ListAgentProfilesError,
  Credentials | HttpClient.HttpClient,
  AgentProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/agent-profiles",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      items: D.list({
        displayName: D.secret,
        description: D.secret,
        businessOverview: D.secret,
        createdAt: D.ts,
        lastModifiedAt: D.ts,
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
  operationName: "ListAgentProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentRecommendationGenerationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists recommendation generation processes for a specified profile.
 */
export const listAgentRecommendationGenerations: API.PaginatedOperationMethod<
  ListAgentRecommendationGenerationsRequest,
  ListAgentRecommendationGenerationsResponse,
  ListAgentRecommendationGenerationsError,
  Credentials | HttpClient.HttpClient,
  AgentRecommendationGenerationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/agent-profiles/{profileArn}/generations",
    input: {
      profileArn: 0,
      recommendationType: D.m({ query: "RecommendationType" }),
      maxResults: D.m({ query: "MaxResults" }),
      nextToken: D.m({ query: "NextToken" }),
    },
    output: {
      items: D.list({
        estimatedCompletionTime: D.ts,
        createdAt: D.ts,
        lastModifiedAt: D.ts,
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
  operationName: "ListAgentRecommendationGenerations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentRecommendationItemsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists recommendation items for a specific recommendation. Recommendation items provide detailed information about individual optimization opportunities.
 */
export const listAgentRecommendationItems: API.PaginatedOperationMethod<
  ListAgentRecommendationItemsRequest,
  ListAgentRecommendationItemsResponse,
  ListAgentRecommendationItemsError,
  Credentials | HttpClient.HttpClient,
  AgentRecommendationItemSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/agent-recommendations/{recommendationArn}/items",
    input: {
      recommendationArn: 0,
      type: D.m({ query: "type" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { items: D.list({ createdAt: D.ts, lastModifiedAt: D.ts }) },
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
  operationName: "ListAgentRecommendationItems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists active optimization recommendations for a specified profile with optional filtering by state.
 */
export const listAgentRecommendations: API.PaginatedOperationMethod<
  ListAgentRecommendationsRequest,
  ListAgentRecommendationsResponse,
  ListAgentRecommendationsError,
  Credentials | HttpClient.HttpClient,
  AgentRecommendationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /api/v1/agent-profiles/{profileArn}/recommendations",
    input: {
      profileArn: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      state: D.m({ query: "state" }),
      pillar: D.m({ query: "pillar" }),
    },
    output: {
      items: D.list({
        title: D.secret,
        description: D.secret,
        updateReason: D.secret,
        createdAt: D.ts,
        lastModifiedAt: D.ts,
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
  operationName: "ListAgentRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAnswersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List of answers for a particular workload and lens.
 */
export const listAnswers: API.PaginatedOperationMethod<
  ListAnswersInput,
  ListAnswersOutput,
  ListAnswersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workloads/{WorkloadId}/lensReviews/{LensAlias}/answers",
    input: {
      WorkloadId: 0,
      LensAlias: 0,
      PillarId: D.m({ query: "PillarId" }),
      MilestoneNumber: D.m({ query: "MilestoneNumber" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      QuestionPriority: D.m({ query: "QuestionPriority" }),
    },
    output: {
      AnswerSummaries: D.list({ JiraConfiguration: o_JiraConfiguration }),
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
  operationName: "ListAnswers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCheckDetailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List of Trusted Advisor check details by account related to the workload.
 */
export const listCheckDetails: API.PaginatedOperationMethod<
  ListCheckDetailsInput,
  ListCheckDetailsOutput,
  ListCheckDetailsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workloads/{WorkloadId}/checks",
    input: {
      WorkloadId: 0,
      NextToken: 0,
      MaxResults: 0,
      LensArn: 0,
      PillarId: 0,
      QuestionId: 0,
      ChoiceId: 0,
    },
    output: { CheckDetails: D.list({ UpdatedAt: D.ts }) },
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
  operationName: "ListCheckDetails",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListCheckSummariesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List of Trusted Advisor checks summarized for all accounts related to the workload.
 */
export const listCheckSummaries: API.PaginatedOperationMethod<
  ListCheckSummariesInput,
  ListCheckSummariesOutput,
  ListCheckSummariesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workloads/{WorkloadId}/checkSummaries",
    input: {
      WorkloadId: 0,
      NextToken: 0,
      MaxResults: 0,
      LensArn: 0,
      PillarId: 0,
      QuestionId: 0,
      ChoiceId: 0,
    },
    output: { CheckSummaries: D.list({ UpdatedAt: D.ts }) },
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
  operationName: "ListCheckSummaries",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLensesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the available lenses.
 */
export const listLenses: API.PaginatedOperationMethod<
  ListLensesInput,
  ListLensesOutput,
  ListLensesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /lenses",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      LensType: D.m({ query: "LensType" }),
      LensStatus: D.m({ query: "LensStatus" }),
      LensName: D.m({ query: "LensName" }),
    },
    output: { LensSummaries: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListLenses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLensReviewImprovementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the improvements of a particular lens review.
 */
export const listLensReviewImprovements: API.PaginatedOperationMethod<
  ListLensReviewImprovementsInput,
  ListLensReviewImprovementsOutput,
  ListLensReviewImprovementsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workloads/{WorkloadId}/lensReviews/{LensAlias}/improvements",
    input: {
      WorkloadId: 0,
      LensAlias: 0,
      PillarId: D.m({ query: "PillarId" }),
      MilestoneNumber: D.m({ query: "MilestoneNumber" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      QuestionPriority: D.m({ query: "QuestionPriority" }),
    },
    output: {
      ImprovementSummaries: D.list({ JiraConfiguration: o_JiraConfiguration }),
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
  operationName: "ListLensReviewImprovements",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLensReviewsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List lens reviews for a particular workload.
 */
export const listLensReviews: API.PaginatedOperationMethod<
  ListLensReviewsInput,
  ListLensReviewsOutput,
  ListLensReviewsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workloads/{WorkloadId}/lensReviews",
    input: {
      WorkloadId: 0,
      MilestoneNumber: D.m({ query: "MilestoneNumber" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: { LensReviewSummaries: D.list({ UpdatedAt: D.ts }) },
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
  operationName: "ListLensReviews",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListLensSharesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the lens shares associated with the lens.
 */
export const listLensShares: API.PaginatedOperationMethod<
  ListLensSharesInput,
  ListLensSharesOutput,
  ListLensSharesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /lenses/{LensAlias}/shares",
    input: {
      LensAlias: 0,
      SharedWithPrefix: D.m({ query: "SharedWithPrefix" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      Status: D.m({ query: "Status" }),
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
  operationName: "ListLensShares",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListMilestonesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List all milestones for an existing workload.
 */
export const listMilestones: API.PaginatedOperationMethod<
  ListMilestonesInput,
  ListMilestonesOutput,
  ListMilestonesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workloads/{WorkloadId}/milestonesSummaries",
    input: { WorkloadId: 0, NextToken: 0, MaxResults: 0 },
    output: {
      MilestoneSummaries: D.list({
        RecordedAt: D.ts,
        WorkloadSummary: o_WorkloadSummary,
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
  operationName: "ListMilestones",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNotificationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List lens notifications.
 */
export const listNotifications: API.PaginatedOperationMethod<
  ListNotificationsInput,
  ListNotificationsOutput,
  ListNotificationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /notifications",
    input: { WorkloadId: 0, NextToken: 0, MaxResults: 0, ResourceArn: 0 },
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
  operationName: "ListNotifications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProfileNotificationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List profile notifications.
 */
export const listProfileNotifications: API.PaginatedOperationMethod<
  ListProfileNotificationsInput,
  ListProfileNotificationsOutput,
  ListProfileNotificationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /profileNotifications",
    input: {
      WorkloadId: D.m({ query: "WorkloadId" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
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
  operationName: "ListProfileNotifications",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List profiles.
 */
export const listProfiles: API.PaginatedOperationMethod<
  ListProfilesInput,
  ListProfilesOutput,
  ListProfilesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /profileSummaries",
    input: {
      ProfileNamePrefix: D.m({ query: "ProfileNamePrefix" }),
      ProfileOwnerType: D.m({ query: "ProfileOwnerType" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: { ProfileSummaries: D.list({ CreatedAt: D.ts, UpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProfiles",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListProfileSharesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List profile shares.
 */
export const listProfileShares: API.PaginatedOperationMethod<
  ListProfileSharesInput,
  ListProfileSharesOutput,
  ListProfileSharesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /profiles/{ProfileArn}/shares",
    input: {
      ProfileArn: 0,
      SharedWithPrefix: D.m({ query: "SharedWithPrefix" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      Status: D.m({ query: "Status" }),
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
  operationName: "ListProfileShares",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReviewTemplateAnswersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the answers of a review template.
 */
export const listReviewTemplateAnswers: API.PaginatedOperationMethod<
  ListReviewTemplateAnswersInput,
  ListReviewTemplateAnswersOutput,
  ListReviewTemplateAnswersError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /reviewTemplates/{TemplateArn}/lensReviews/{LensAlias}/answers",
    input: {
      TemplateArn: 0,
      LensAlias: 0,
      PillarId: D.m({ query: "PillarId" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
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
  operationName: "ListReviewTemplateAnswers",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListReviewTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List review templates.
 */
export const listReviewTemplates: API.PaginatedOperationMethod<
  ListReviewTemplatesInput,
  ListReviewTemplatesOutput,
  ListReviewTemplatesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /reviewTemplates",
    input: {
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: { ReviewTemplates: D.list({ UpdatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReviewTemplates",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListShareInvitationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the share invitations.
 *
 * `WorkloadNamePrefix`, `LensNamePrefix`, `ProfileNamePrefix`, and `TemplateNamePrefix` are mutually exclusive. Use the parameter that matches your `ShareResourceType`.
 */
export const listShareInvitations: API.PaginatedOperationMethod<
  ListShareInvitationsInput,
  ListShareInvitationsOutput,
  ListShareInvitationsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /shareInvitations",
    input: {
      WorkloadNamePrefix: D.m({ query: "WorkloadNamePrefix" }),
      LensNamePrefix: D.m({ query: "LensNamePrefix" }),
      ShareResourceType: D.m({ query: "ShareResourceType" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      ProfileNamePrefix: D.m({ query: "ProfileNamePrefix" }),
      TemplateNamePrefix: D.m({ query: "TemplateNamePrefix" }),
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
  operationName: "ListShareInvitations",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * List the tags for a resource.
 *
 * The WorkloadArn parameter can be a workload ARN, a custom lens ARN, a profile ARN, or review template ARN.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{WorkloadArn}",
    input: { WorkloadArn: 0 },
  },
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTemplateSharesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List review template shares.
 */
export const listTemplateShares: API.PaginatedOperationMethod<
  ListTemplateSharesInput,
  ListTemplateSharesOutput,
  ListTemplateSharesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /templates/shares/{TemplateArn}",
    input: {
      TemplateArn: 0,
      SharedWithPrefix: D.m({ query: "SharedWithPrefix" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      Status: D.m({ query: "Status" }),
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
  operationName: "ListTemplateShares",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkloadsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Paginated list of workloads.
 */
export const listWorkloads: API.PaginatedOperationMethod<
  ListWorkloadsInput,
  ListWorkloadsOutput,
  ListWorkloadsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /workloadsSummaries",
    input: { WorkloadNamePrefix: 0, NextToken: 0, MaxResults: 0 },
    output: { WorkloadSummaries: D.list(o_WorkloadSummary) },
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
  operationName: "ListWorkloads",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListWorkloadSharesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List the workload shares associated with the workload.
 */
export const listWorkloadShares: API.PaginatedOperationMethod<
  ListWorkloadSharesInput,
  ListWorkloadSharesOutput,
  ListWorkloadSharesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /workloads/{WorkloadId}/shares",
    input: {
      WorkloadId: 0,
      SharedWithPrefix: D.m({ query: "SharedWithPrefix" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
      Status: D.m({ query: "Status" }),
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
  operationName: "ListWorkloadShares",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutAgentRecommendationFeedbackError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits user feedback on a recommendation to help improve future optimization suggestions and track implementation outcomes.
 */
export const putAgentRecommendationFeedback: API.OperationMethod<
  PutAgentRecommendationFeedbackRequest,
  PutAgentRecommendationFeedbackResponse,
  PutAgentRecommendationFeedbackError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /api/v1/agent-recommendations/{recommendationArn}/feedback",
    input: { recommendationArn: 0, type: 0, feedbackCategory: 0, comments: 0 },
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
  operationName: "PutAgentRecommendationFeedback",
})) as any;

export type StartAgentRecommendationGenerationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a new recommendation generation process for the specified optimization profile. This asynchronous operation analyzes your Amazon Web Services resources and generates optimization recommendations based on the configured pillars and scope. Use GetAgentRecommendationGeneration to check status.
 */
export const startAgentRecommendationGeneration: API.OperationMethod<
  StartAgentRecommendationGenerationRequest,
  StartAgentRecommendationGenerationResponse,
  StartAgentRecommendationGenerationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /api/v1/agent-profiles/{profileArn}/generations",
    input: {
      profileArn: 0,
      types: 0,
      name: 0,
      additionalContext: 0,
      scope: { pillars: 0, goalIds: 0, items: D.list({ pillar: 0, ids: 0 }) },
    },
    output: {
      estimatedCompletionTime: D.ts,
      createdAt: D.ts,
      lastModifiedAt: D.ts,
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
  operationName: "StartAgentRecommendationGeneration",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Adds one or more tags to the specified resource.
 *
 * The WorkloadArn parameter can be a workload ARN, a custom lens ARN, a profile ARN, or review template ARN.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{WorkloadArn}",
    input: { WorkloadArn: 0, Tags: 0 },
    body: true,
  },
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Deletes specified tags from a resource.
 *
 * The WorkloadArn parameter can be a workload ARN, a custom lens ARN, a profile ARN, or review template ARN.
 *
 * To specify multiple tags, use separate **tagKeys** parameters, for example:
 *
 * `DELETE /tags/WorkloadArn?tagKeys=key1&tagKeys=key2`
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{WorkloadArn}",
    input: { WorkloadArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAgentContextError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing context associated with a profile.
 */
export const updateAgentContext: API.OperationMethod<
  UpdateAgentContextRequest,
  UpdateAgentContextResponse,
  UpdateAgentContextError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /api/v1/agent-profiles/{profileArn}/contexts/{id}",
    input: {
      clientToken: D.m({ idempotency: true }),
      profileArn: 0,
      id: 0,
      title: 0,
      content: i_ContextContent,
    },
    output: { context: o_ContextSummary },
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
  operationName: "UpdateAgentContext",
})) as any;

export type UpdateAgentGoalError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the pillars and title of an existing goal associated with a profile.
 */
export const updateAgentGoal: API.OperationMethod<
  UpdateAgentGoalRequest,
  UpdateAgentGoalResponse,
  UpdateAgentGoalError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /api/v1/agent-profiles/{profileArn}/goals/{id}",
    input: {
      clientToken: D.m({ idempotency: true }),
      profileArn: 0,
      id: 0,
      pillars: 0,
      title: 0,
      description: 0,
    },
    output: { goal: o_GoalSummary },
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
  operationName: "UpdateAgentGoal",
})) as any;

export type UpdateAgentProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing optimization profile's configuration, including its pillars, execution role, and aggregation settings.
 */
export const updateAgentProfile: API.OperationMethod<
  UpdateAgentProfileRequest,
  UpdateAgentProfileResponse,
  UpdateAgentProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /api/v1/agent-profiles/{profileArn}",
    input: {
      clientToken: D.m({ idempotency: true }),
      profileArn: 0,
      displayName: 0,
      description: 0,
      executionRoleArn: 0,
      aggregationConfiguration: D.list(i_AggregationConfiguration),
      businessOverview: 0,
      pillars: 0,
      deletionProtection: 0,
    },
    output: {
      displayName: D.secret,
      description: D.secret,
      businessOverview: D.secret,
      createdAt: D.ts,
      lastModifiedAt: D.ts,
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
  operationName: "UpdateAgentProfile",
})) as any;

export type UpdateAgentRecommendationStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of a recommendation to track its progress through the implementation lifecycle.
 */
export const updateAgentRecommendationStatus: API.OperationMethod<
  UpdateAgentRecommendationStatusRequest,
  UpdateAgentRecommendationStatusResponse,
  UpdateAgentRecommendationStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /api/v1/agent-recommendations/{recommendationArn}/status",
    input: { recommendationArn: 0, status: 0, updateReason: 0 },
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
  operationName: "UpdateAgentRecommendationStatus",
})) as any;

export type UpdateAnswerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update the answer to a specific question in a workload review.
 */
export const updateAnswer: API.OperationMethod<
  UpdateAnswerInput,
  UpdateAnswerOutput,
  UpdateAnswerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /workloads/{WorkloadId}/lensReviews/{LensAlias}/answers/{QuestionId}",
    input: {
      WorkloadId: 0,
      LensAlias: 0,
      QuestionId: 0,
      SelectedChoices: 0,
      ChoiceUpdates: D.map(i_ChoiceUpdate),
      Notes: 0,
      IsApplicable: 0,
      Reason: 0,
    },
    output: { Answer: o_Answer },
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
  operationName: "UpdateAnswer",
})) as any;

export type UpdateGlobalSettingsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update whether the Amazon Web Services account is opted into organization sharing and discovery integration features.
 */
export const updateGlobalSettings: API.OperationMethod<
  UpdateGlobalSettingsInput,
  UpdateGlobalSettingsResponse,
  UpdateGlobalSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /global-settings",
    input: {
      OrganizationSharingStatus: 0,
      DiscoveryIntegrationStatus: 0,
      JiraConfiguration: {
        IssueManagementStatus: 0,
        IssueManagementType: 0,
        JiraProjectKey: 0,
        IntegrationStatus: 0,
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGlobalSettings",
})) as any;

export type UpdateIntegrationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update integration features.
 */
export const updateIntegration: API.OperationMethod<
  UpdateIntegrationInput,
  UpdateIntegrationResponse,
  UpdateIntegrationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /workloads/{WorkloadId}/updateIntegration",
    input: {
      WorkloadId: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      IntegratingService: 0,
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
  operationName: "UpdateIntegration",
})) as any;

export type UpdateLensReviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update lens review for a particular workload.
 */
export const updateLensReview: API.OperationMethod<
  UpdateLensReviewInput,
  UpdateLensReviewOutput,
  UpdateLensReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /workloads/{WorkloadId}/lensReviews/{LensAlias}",
    input: {
      WorkloadId: 0,
      LensAlias: 0,
      LensNotes: 0,
      PillarNotes: 0,
      JiraConfiguration: {
        SelectedPillars: D.list({ PillarId: 0, SelectedQuestionIds: 0 }),
      },
    },
    output: { LensReview: o_LensReview },
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
  operationName: "UpdateLensReview",
})) as any;

export type UpdateProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a profile.
 */
export const updateProfile: API.OperationMethod<
  UpdateProfileInput,
  UpdateProfileOutput,
  UpdateProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /profiles/{ProfileArn}",
    input: {
      ProfileArn: 0,
      ProfileDescription: 0,
      ProfileQuestions: D.list(i_ProfileQuestionUpdate),
    },
    output: { Profile: o_Profile },
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
  operationName: "UpdateProfile",
})) as any;

export type UpdateReviewTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a review template.
 */
export const updateReviewTemplate: API.OperationMethod<
  UpdateReviewTemplateInput,
  UpdateReviewTemplateOutput,
  UpdateReviewTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /reviewTemplates/{TemplateArn}",
    input: {
      TemplateArn: 0,
      TemplateName: 0,
      Description: 0,
      Notes: 0,
      LensesToAssociate: 0,
      LensesToDisassociate: 0,
    },
    output: { ReviewTemplate: o_ReviewTemplate },
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
  operationName: "UpdateReviewTemplate",
})) as any;

export type UpdateReviewTemplateAnswerError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a review template answer.
 */
export const updateReviewTemplateAnswer: API.OperationMethod<
  UpdateReviewTemplateAnswerInput,
  UpdateReviewTemplateAnswerOutput,
  UpdateReviewTemplateAnswerError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /reviewTemplates/{TemplateArn}/lensReviews/{LensAlias}/answers/{QuestionId}",
    input: {
      TemplateArn: 0,
      LensAlias: 0,
      QuestionId: 0,
      SelectedChoices: 0,
      ChoiceUpdates: D.map(i_ChoiceUpdate),
      Notes: 0,
      IsApplicable: 0,
      Reason: 0,
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
  operationName: "UpdateReviewTemplateAnswer",
})) as any;

export type UpdateReviewTemplateLensReviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a lens review associated with a review template.
 */
export const updateReviewTemplateLensReview: API.OperationMethod<
  UpdateReviewTemplateLensReviewInput,
  UpdateReviewTemplateLensReviewOutput,
  UpdateReviewTemplateLensReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /reviewTemplates/{TemplateArn}/lensReviews/{LensAlias}",
    input: { TemplateArn: 0, LensAlias: 0, LensNotes: 0, PillarNotes: 0 },
    output: { LensReview: o_ReviewTemplateLensReview },
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
  operationName: "UpdateReviewTemplateLensReview",
})) as any;

export type UpdateShareInvitationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a workload or custom lens share invitation.
 *
 * This API operation can be called independently of any resource. Previous documentation implied that a workload ARN must be specified.
 */
export const updateShareInvitation: API.OperationMethod<
  UpdateShareInvitationInput,
  UpdateShareInvitationOutput,
  UpdateShareInvitationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /shareInvitations/{ShareInvitationId}",
    input: { ShareInvitationId: 0, ShareInvitationAction: 0 },
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
  operationName: "UpdateShareInvitation",
})) as any;

export type UpdateWorkloadError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update an existing workload.
 */
export const updateWorkload: API.OperationMethod<
  UpdateWorkloadInput,
  UpdateWorkloadOutput,
  UpdateWorkloadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /workloads/{WorkloadId}",
    input: {
      WorkloadId: 0,
      WorkloadName: 0,
      Description: 0,
      Environment: 0,
      AccountIds: 0,
      AwsRegions: 0,
      NonAwsRegions: 0,
      PillarPriorities: 0,
      ArchitecturalDesign: 0,
      ReviewOwner: 0,
      IsReviewOwnerUpdateAcknowledged: 0,
      IndustryType: 0,
      Industry: 0,
      Notes: 0,
      ImprovementStatus: 0,
      DiscoveryConfig: i_WorkloadDiscoveryConfig,
      Applications: 0,
      JiraConfiguration: i_WorkloadJiraConfigurationInput,
    },
    output: { Workload: o_Workload },
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
  operationName: "UpdateWorkload",
})) as any;

export type UpdateWorkloadShareError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Update a workload share.
 */
export const updateWorkloadShare: API.OperationMethod<
  UpdateWorkloadShareInput,
  UpdateWorkloadShareOutput,
  UpdateWorkloadShareError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /workloads/{WorkloadId}/shares/{ShareId}",
    input: { ShareId: 0, WorkloadId: 0, PermissionType: 0 },
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
  operationName: "UpdateWorkloadShare",
})) as any;

export type UpgradeLensReviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Upgrade lens review for a particular workload.
 */
export const upgradeLensReview: API.OperationMethod<
  UpgradeLensReviewInput,
  UpgradeLensReviewResponse,
  UpgradeLensReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workloads/{WorkloadId}/lensReviews/{LensAlias}/upgrade",
    input: {
      WorkloadId: 0,
      LensAlias: 0,
      MilestoneName: 0,
      ClientRequestToken: 0,
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
  operationName: "UpgradeLensReview",
})) as any;

export type UpgradeProfileVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Upgrade a profile.
 */
export const upgradeProfileVersion: API.OperationMethod<
  UpgradeProfileVersionInput,
  UpgradeProfileVersionResponse,
  UpgradeProfileVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /workloads/{WorkloadId}/profiles/{ProfileArn}/upgrade",
    input: {
      WorkloadId: 0,
      ProfileArn: 0,
      MilestoneName: 0,
      ClientRequestToken: D.m({ idempotency: true }),
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
  operationName: "UpgradeProfileVersion",
})) as any;

export type UpgradeReviewTemplateLensReviewError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Upgrade the lens review of a review template.
 */
export const upgradeReviewTemplateLensReview: API.OperationMethod<
  UpgradeReviewTemplateLensReviewInput,
  UpgradeReviewTemplateLensReviewResponse,
  UpgradeReviewTemplateLensReviewError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /reviewTemplates/{TemplateArn}/lensReviews/{LensAlias}/upgrade",
    input: { TemplateArn: 0, LensAlias: 0, ClientRequestToken: 0 },
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
  operationName: "UpgradeReviewTemplateLensReview",
})) as any;

const i_AggregationConfiguration: D.LazyStruct = () => ({
  accountId: 0,
  regions: 0,
  accessRoleArn: 0,
});
const i_ChoiceUpdate: D.LazyStruct = () => ({ Status: 0, Reason: 0, Notes: 0 });
const i_ContextContent: D.LazyStruct = () => ({
  accountIds: 0,
  regions: 0,
  awsServices: 0,
  resourceTypes: 0,
  resourceTags: D.list({ key: 0, value: 0 }),
  applicationOverview: 0,
  industry: 0,
  applicationType: 0,
  criticality: 0,
  architectureOverview: 0,
  additionalContext: 0,
});
const i_ProfileQuestionUpdate: D.LazyStruct = () => ({
  QuestionId: 0,
  SelectedChoiceIds: 0,
});
const i_WorkloadDiscoveryConfig: D.LazyStruct = () => ({
  TrustedAdvisorIntegrationStatus: 0,
  WorkloadResourceDefinition: 0,
});
const i_WorkloadJiraConfigurationInput: D.LazyStruct = () => ({
  IssueManagementStatus: 0,
  IssueManagementType: 0,
  JiraProjectKey: 0,
});
const o_Answer: D.LazyStruct = () => ({
  JiraConfiguration: o_JiraConfiguration,
});
const o_ContextSummary: D.LazyStruct = () => ({
  title: D.secret,
  content: {
    applicationOverview: D.secret,
    industry: D.secret,
    architectureOverview: D.secret,
    additionalContext: D.secret,
  },
  createdAt: D.ts,
  lastModifiedAt: D.ts,
});
const o_GoalSummary: D.LazyStruct = () => ({
  title: D.secret,
  description: D.secret,
  createdAt: D.ts,
  lastModifiedAt: D.ts,
});
const o_JiraConfiguration: D.LazyStruct = () => ({ LastSyncedTime: D.ts });
const o_LensReview: D.LazyStruct = () => ({ UpdatedAt: D.ts });
const o_Profile: D.LazyStruct = () => ({ CreatedAt: D.ts, UpdatedAt: D.ts });
const o_ReviewTemplate: D.LazyStruct = () => ({ UpdatedAt: D.ts });
const o_ReviewTemplateLensReview: D.LazyStruct = () => ({ UpdatedAt: D.ts });
const o_Workload: D.LazyStruct = () => ({
  UpdatedAt: D.ts,
  ReviewRestrictionDate: D.ts,
});
const o_WorkloadSummary: D.LazyStruct = () => ({ UpdatedAt: D.ts });
