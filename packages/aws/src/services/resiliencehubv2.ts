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
  sdkId: "resiliencehubv2",
  serviceShapeName: "NGRHServiceCore",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "resiliencehub" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-02-17");
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
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
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
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
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
        /*@__PURE__*/ S.suspend(() => __S(2209, __c69, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Arn = string;
export type AssertionText = string;
export type ClientToken = string;
export interface CreateAssertionRequest {
  serviceArn: string;
  text: string;
  clientToken?: string;
}
export type Uuid = string;
export type AssertionSource = "AI_GENERATED" | "USER" | (string & {});
export interface Assertion {
  serviceArn: string;
  assertionId: string;
  text: string;
  source: AssertionSource;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CreateAssertionResponse {
  assertion: Assertion;
}
export type TagKey = string;
export type TagValue = string;
export type TagValueList = string[];
export interface ResourceTag {
  key: string;
  values: string[];
}
export type ResourceTagList = ResourceTag[];
export type S3Url = string;
export type EksNamespace = string;
export type EksNamespaceList = string[];
export type EksLabelKey = string;
export type EksLabelValue = string;
export type EksLabelMap = { [key: string]: string | undefined };
export type EksLabelSelectorOperator =
  | "IN"
  | "NOT_IN"
  | "EXISTS"
  | "DOES_NOT_EXIST"
  | (string & {});
export type EksLabelValueList = string[];
export interface EksLabelSelectorRequirement {
  key: string;
  operator: EksLabelSelectorOperator;
  values?: string[];
}
export type EksLabelSelectorRequirementList = EksLabelSelectorRequirement[];
export interface EksLabelSelector {
  matchLabels?: { [key: string]: string | undefined };
  matchExpressions?: EksLabelSelectorRequirement[];
}
export interface EksSource {
  clusterArn: string;
  namespaces: string[];
  labelSelector?: EksLabelSelector;
}
export type ResourceConfiguration =
  | {
      resourceTags: ResourceTag[];
      cfnStackArn?: never;
      tfStateFileUrl?: never;
      eks?: never;
      designFileS3Url?: never;
    }
  | {
      resourceTags?: never;
      cfnStackArn: string;
      tfStateFileUrl?: never;
      eks?: never;
      designFileS3Url?: never;
    }
  | {
      resourceTags?: never;
      cfnStackArn?: never;
      tfStateFileUrl: string;
      eks?: never;
      designFileS3Url?: never;
    }
  | {
      resourceTags?: never;
      cfnStackArn?: never;
      tfStateFileUrl?: never;
      eks: EksSource;
      designFileS3Url?: never;
    }
  | {
      resourceTags?: never;
      cfnStackArn?: never;
      tfStateFileUrl?: never;
      eks?: never;
      designFileS3Url: string;
    };
export interface CreateInputSourceRequest {
  serviceArn: string;
  resourceConfiguration: ResourceConfiguration;
  clientToken?: string;
}
export type InputSourceId = string;
export interface CreateInputSourceResponse {
  serviceArn: string;
  inputSourceId: string;
}
export type EntityName = string;
export type LongDescription = string;
export interface AvailabilitySlo {
  target?: number;
}
export type MultiAzDisasterRecoveryApproach =
  | "ACTIVE_ACTIVE"
  | "HOT_STANDBY"
  | "WARM_STANDBY"
  | "PILOT_LIGHT"
  | "BACKUP_AND_RESTORE"
  | (string & {});
export interface MultiAzTargets {
  rtoInMinutes?: number;
  rpoInMinutes?: number;
  disasterRecoveryApproach?: MultiAzDisasterRecoveryApproach;
}
export type MultiRegionDisasterRecoveryApproach =
  | "ACTIVE_ACTIVE"
  | "HOT_STANDBY"
  | "WARM_STANDBY"
  | "PILOT_LIGHT"
  | "BACKUP_AND_RESTORE"
  | (string & {});
export interface MultiRegionTargets {
  rtoInMinutes?: number;
  rpoInMinutes?: number;
  disasterRecoveryApproach?: MultiRegionDisasterRecoveryApproach;
}
export interface DataRecoveryTargets {
  timeBetweenBackupsInMinutes?: number;
}
export type KmsKeyId = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreatePolicyRequest {
  name: string;
  description?: string;
  availabilitySlo?: AvailabilitySlo;
  multiAz?: MultiAzTargets;
  multiRegion?: MultiRegionTargets;
  dataRecovery?: DataRecoveryTargets;
  sharingEnabled?: boolean;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type OrganizationId = string;
export interface Policy {
  policyArn: string;
  name: string;
  description?: string;
  availabilitySlo?: AvailabilitySlo;
  multiAz?: MultiAzTargets;
  multiRegion?: MultiRegionTargets;
  dataRecovery?: DataRecoveryTargets;
  sharingEnabled?: boolean;
  organizationId?: string;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  associatedServiceCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CreatePolicyResponse {
  policy: Policy;
}
export type ReportType = "FAILURE_MODE" | "TESTING" | (string & {});
export interface CreateReportRequest {
  serviceArn: string;
  reportType: ReportType;
  clientToken?: string;
}
export type ReportGenerationStatus = "PENDING" | "SUCCEEDED" | "FAILED" | (string & {});
export type TestRunId = string;
export type ServiceOwnedArn = string;
export interface S3ReportOutput {
  s3ObjectKey: string;
}
export type ReportGenerationErrorCode =
  | "INSUFFICIENT_PERMISSIONS"
  | "CONFIGURATION_ERROR"
  | "INTERNAL_ERROR"
  | (string & {});
export interface FailedReportOutput {
  errorCode: ReportGenerationErrorCode;
  errorMessage?: string;
}
export type ReportOutput =
  | { s3ReportOutput: S3ReportOutput; failedReportOutput?: never }
  | { s3ReportOutput?: never; failedReportOutput: FailedReportOutput };
export interface ReportGenerationResult {
  reportType: ReportType;
  status: ReportGenerationStatus;
  serviceArn?: string;
  assessmentId?: string;
  testRunId?: string;
  testTemplateArn?: string;
  createdAt?: Date;
  reportOutput?: ReportOutput;
}
export interface CreateReportResponse {
  reportGenerationResult: ReportGenerationResult;
}
export type UserJourneyId = string;
export type UserJourneyIdList = string[];
export interface AssociatedSystem {
  systemArn: string;
  systemName?: string;
  userJourneyIds?: string[];
}
export type AssociatedSystemList = AssociatedSystem[];
export type AwsRegion = string;
export type RegionList = string[];
export type IamRoleName = string;
export type IamRoleArn = string;
export interface CrossAccountRole {
  crossAccountRoleArn: string;
  externalId?: string;
}
export type CrossAccountRoleList = CrossAccountRole[];
export interface PermissionModel {
  invokerRoleName: string;
  crossAccountRoles?: CrossAccountRole[];
}
export type DependencyDiscoveryInput = "ENABLED" | "DISABLED" | (string & {});
export type S3BucketPath = string;
export type AwsAccountId = string;
export interface S3ReportOutputConfiguration {
  bucketPath: string;
  bucketOwner: string;
}
export type ReportOutputConfiguration = { s3: S3ReportOutputConfiguration };
export type ReportOutputConfigurationList = ReportOutputConfiguration[];
export interface ServiceReportConfiguration {
  reportOutputs: ReportOutputConfiguration[];
}
export interface CreateServiceRequest {
  name: string;
  description?: string;
  associatedSystems?: AssociatedSystem[];
  policyArn?: string;
  regions: string[];
  permissionModel: PermissionModel;
  dependencyDiscovery?: DependencyDiscoveryInput;
  reportConfiguration?: ServiceReportConfiguration;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type DependencyDiscoveryStatus = "ENABLED" | "INITIALIZING" | "DISABLED" | (string & {});
export interface DependencyDiscoveryConfig {
  status: DependencyDiscoveryStatus;
  updatedAt?: Date;
  eligibleResourceCount?: number;
  message?: string;
}
export type PolicyValueSource = "SELF" | "CROSS_ACCOUNT" | (string & {});
export interface SloSource {
  value?: number;
  policyName?: string;
  source?: PolicyValueSource;
}
export interface TargetSource {
  value?: number;
  policyName?: string;
  source?: PolicyValueSource;
}
export interface DisasterRecoverySource {
  value?: string;
  policyName?: string;
  source?: PolicyValueSource;
}
export interface EffectivePolicyValues {
  availabilitySlo?: SloSource;
  multiAzRto?: TargetSource;
  multiAzRpo?: TargetSource;
  multiAzDrApproach?: DisasterRecoverySource;
  multiRegionRto?: TargetSource;
  multiRegionRpo?: TargetSource;
  multiRegionDrApproach?: DisasterRecoverySource;
  dataRecoveryTimeBetweenBackups?: TargetSource;
}
export type AchievabilityStatus = "ACHIEVABLE" | "NOT_ACHIEVABLE" | (string & {});
export interface Achievability {
  availabilitySlo?: AchievabilityStatus;
  multiAzRtoRpo?: AchievabilityStatus;
  multiRegionRtoRpo?: AchievabilityStatus;
  dataRecoveryTimeBetweenBackups?: AchievabilityStatus;
}
export type CostCurrency = "USD" | (string & {});
export interface AssessmentCost {
  amount?: number;
  currency?: CostCurrency;
}
export type ResourceDiscoveryRunStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "COMPLETED_WITH_FAILURES"
  | "NOT_STARTED"
  | (string & {});
export type ResourceDiscoveryErrorCode =
  | "INVALID_PERMISSIONS"
  | "STACK_NOT_FOUND"
  | "CLUSTER_NOT_FOUND"
  | "STATE_FILE_NOT_FOUND"
  | "ACCESS_DENIED"
  | "UNSUPPORTED_CLUSTER"
  | "INTERNAL_ERROR"
  | (string & {});
export interface ResourceDiscoveryStatus {
  status?: ResourceDiscoveryRunStatus;
  lastRunAt?: Date;
  errorCode?: ResourceDiscoveryErrorCode;
  errorMessage?: string;
}
export type AssessmentStatus =
  | "NOT_STARTED"
  | "PENDING"
  | "IN_PROGRESS"
  | "FAILED"
  | "SUCCESS"
  | (string & {});
export type OuId = string;
export type AccountId = string;
export interface Service {
  serviceArn: string;
  name: string;
  description?: string;
  associatedSystems?: AssociatedSystem[];
  policyArn?: string;
  regions?: string[];
  permissionModel?: PermissionModel;
  dependencyDiscovery?: DependencyDiscoveryConfig;
  effectivePolicyValues?: EffectivePolicyValues;
  achievability?: Achievability;
  reportConfiguration?: ServiceReportConfiguration;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  estimatedAssessmentCost?: AssessmentCost;
  resourceDiscovery?: ResourceDiscoveryStatus;
  assessmentStatus?: AssessmentStatus;
  rerunAssessment?: boolean;
  openFindingsCount?: number;
  resolvedFindingsCount?: number;
  organizationId?: string;
  ouId?: string;
  accountId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CreateServiceResponse {
  service: Service;
}
export type EntityLabel = string;
export type EntityDescription = string;
export type ServiceFunctionCriticality = "PRIMARY" | "SUPPLEMENTAL" | (string & {});
export interface CreateServiceFunctionRequest {
  name: string;
  serviceArn: string;
  description?: string;
  criticality: ServiceFunctionCriticality;
  clientToken?: string;
}
export type EntityId = string;
export type ServiceFunctionSource = "AI_GENERATED" | "USER" | (string & {});
export interface ServiceFunction {
  serviceArn: string;
  serviceFunctionId: string;
  name: string;
  description?: string;
  criticality: ServiceFunctionCriticality;
  resourceCount?: number;
  source?: ServiceFunctionSource;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CreateServiceFunctionResponse {
  serviceFunction: ServiceFunction;
}
export type ResourceList = string[];
export interface CreateServiceFunctionResourcesRequest {
  serviceArn: string;
  serviceFunctionId: string;
  resources: string[];
}
export interface CreateServiceFunctionResourcesResponse {
  serviceArn?: string;
  serviceFunctionId?: string;
  resources?: string[];
}
export interface CreateSystemRequest {
  name: string;
  description?: string;
  sharingEnabled?: boolean;
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export type SystemId = string;
export interface System {
  systemArn: string;
  systemId: string;
  name: string;
  description?: string;
  sharingEnabled?: boolean;
  tags?: { [key: string]: string | undefined };
  kmsKeyId?: string;
  organizationId?: string;
  ouId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CreateSystemResponse {
  system: System;
}
export interface LoggingConfiguration {
  s3BucketName?: string;
  cloudWatchLogGroupArn?: string;
  logSchemaVersion?: string;
}
export type StopConditionSource = "aws:cloudwatch:alarm" | "none" | (string & {});
export interface StopCondition {
  source: StopConditionSource;
  value: string;
}
export type StopConditionList = StopCondition[];
export type ParameterKey = string;
export type ParameterValue = string;
export type StringList = string[];
export type TestParameters = { [key: string]: string[] | undefined };
export interface CreateTestRequest {
  serviceArn: string;
  testTemplateArn: string;
  loggingConfiguration?: LoggingConfiguration;
  stopConditions?: StopCondition[];
  roleName?: string;
  parameters?: { [key: string]: string[] | undefined };
}
export type TestId = string;
export interface TestAction {
  actionId: string;
  description?: string;
  resourceType: string;
}
export type TestActionList = TestAction[];
export interface Test {
  testId: string;
  testTemplateArn: string;
  serviceArn: string;
  name: string;
  actions?: TestAction[];
  loggingConfiguration?: LoggingConfiguration;
  stopConditions?: StopCondition[];
  roleName?: string;
  parameters?: { [key: string]: string[] | undefined };
  totalTestRuns: number;
  successfulTestRuns: number;
  creationTime: Date;
}
export interface CreateTestResponse {
  test: Test;
}
export interface CreateUserJourneyRequest {
  systemArn: string;
  name: string;
  description?: string;
  policyArn?: string;
  clientToken?: string;
}
export interface UserJourney {
  userJourneyId: string;
  name: string;
  description?: string;
  policyArn?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface CreateUserJourneyResponse {
  userJourney: UserJourney;
}
export interface DeleteAssertionRequest {
  serviceArn: string;
  assertionId: string;
}
export interface DeleteAssertionResponse {
  assertionId?: string;
}
export interface DeleteInputSourceRequest {
  serviceArn: string;
  inputSourceId: string;
}
export interface DeleteInputSourceResponse {
  serviceArn: string;
  inputSourceId: string;
}
export interface DeletePolicyRequest {
  policyArn: string;
}
export interface DeletePolicyResponse {
  policyArn: string;
}
export interface DeleteServiceRequest {
  serviceArn: string;
}
export interface DeleteServiceResponse {
  serviceArn: string;
}
export interface DeleteServiceFunctionRequest {
  serviceArn: string;
  serviceFunctionId: string;
}
export interface DeleteServiceFunctionResponse {
  serviceFunctionId?: string;
}
export interface DeleteServiceFunctionResourcesRequest {
  serviceArn: string;
  serviceFunctionId: string;
  resources: string[];
}
export interface DeleteServiceFunctionResourcesResponse {
  serviceArn?: string;
  serviceFunctionId?: string;
  resources?: string[];
}
export interface DeleteSystemRequest {
  systemArn: string;
}
export interface DeleteSystemResponse {
  systemArn: string;
}
export interface DeleteTestRequest {
  testId: string;
  serviceArn: string;
}
export interface DeleteTestResponse {
  testId: string;
}
export type CloudWatchAlarmArn = string;
export interface SuccessCriteriaAlarmInput {
  alarmArn: string;
}
export interface ObservabilityAlarmInput {
  alarmArn: string;
}
export type TestSourceInput =
  | { successCriteriaAlarm: SuccessCriteriaAlarmInput; observabilityAlarm?: never }
  | { successCriteriaAlarm?: never; observabilityAlarm: ObservabilityAlarmInput };
export type TestSourceInputList = TestSourceInput[];
export interface DeleteTestSourcesRequest {
  testId: string;
  serviceArn: string;
  testSources: TestSourceInput[];
}
export interface DeleteTestSourcesResponse {}
export interface DeleteUserJourneyRequest {
  systemArn: string;
  userJourneyId: string;
}
export interface DeleteUserJourneyResponse {
  userJourneyId: string;
}
export interface GetDependencyInsightsRequest {
  serviceArn: string;
}
export type InsightsCategory =
  | "CROSS_REGION"
  | "NEW_DEPENDENCY"
  | "THIRD_PARTY"
  | "UNEVEN_USAGE"
  | "AWS_SERVICE"
  | (string & {});
export interface DependencyInsight {
  category: InsightsCategory;
  description: string;
}
export type DependencyInsightsList = DependencyInsight[];
export type DependencyInsightsStatus = "IN_PROGRESS" | "COMPLETED" | "FAILED" | (string & {});
export type DependencyInsightsErrorCode =
  | "INSUFFICIENT_DATA"
  | "LLM_GENERATION_FAILED"
  | "INTERNAL_ERROR"
  | (string & {});
export interface GetDependencyInsightsResponse {
  overview?: string;
  insights?: DependencyInsight[];
  status: DependencyInsightsStatus;
  createdAt?: Date;
  errorCode?: DependencyInsightsErrorCode;
  errorMessage?: string;
}
export interface GetFailureModeFindingRequest {
  findingId: string;
  serviceArn: string;
}
export type FailureCategory =
  | "SHARED_FATE"
  | "EXCESSIVE_LOAD"
  | "EXCESSIVE_LATENCY"
  | "MISCONFIGURATION_AND_BUGS"
  | "SINGLE_POINT_OF_FAILURE"
  | (string & {});
export type FindingStatus = "OPEN" | "RESOLVED" | "IRRELEVANT" | (string & {});
export type FindingSeverity = "LOW" | "MEDIUM" | "HIGH" | (string & {});
export type FunctionsList = string[];
export type PolicyComponent =
  | "AVAILABILITY_SLO"
  | "MULTI_AZ_DISASTER_RECOVERY"
  | "MULTI_REGION_DISASTER_RECOVERY"
  | "DATA_RECOVERY"
  | (string & {});
export type SuggestedChangesList = string[];
export interface InfrastructureAndCodeRecommendation {
  suggestedChanges?: string[];
}
export type InfrastructureAndCodeRecommendationsList = InfrastructureAndCodeRecommendation[];
export interface ObservabilityRecommendation {
  suggestedChanges?: string[];
}
export type ObservabilityRecommendationsList = ObservabilityRecommendation[];
export interface TestingRecommendation {
  suggestedChanges?: string[];
}
export type TestingRecommendationsList = TestingRecommendation[];
export interface Finding {
  findingId?: string;
  name?: string;
  description?: string;
  failureCategory?: FailureCategory;
  status?: FindingStatus;
  reasoning?: string;
  comment?: string;
  severity?: FindingSeverity;
  serviceFunctions?: string[];
  policyComponent?: PolicyComponent;
  infrastructureAndCodeRecommendations?: InfrastructureAndCodeRecommendation[];
  observabilityRecommendations?: ObservabilityRecommendation[];
  testingRecommendations?: TestingRecommendation[];
  updatedAt?: Date;
}
export interface GetFailureModeFindingResponse {
  finding?: Finding;
}
export interface GetPolicyRequest {
  policyArn: string;
}
export interface GetPolicyResponse {
  policy: Policy;
}
export interface GetServiceRequest {
  serviceArn: string;
}
export interface GetServiceResponse {
  service: Service;
}
export interface GetSystemRequest {
  systemArn: string;
}
export interface GetSystemResponse {
  system: System;
}
export interface GetTestRequest {
  testId: string;
  serviceArn: string;
}
export interface GetTestResponse {
  test: Test;
}
export interface GetTestRunRequest {
  testRunId: string;
  serviceArn: string;
}
export type TestRunStatus =
  | "INITIALIZING"
  | "RUNNING"
  | "STOPPING"
  | "PASSED"
  | "FAILED"
  | "STOPPED"
  | "ERROR"
  | (string & {});
export interface ExperimentDetails {
  experimentArn: string;
  details?: string;
}
export type ExperimentDetailsList = ExperimentDetails[];
export interface TestRunReportConfiguration {
  reportOutput: ReportOutputConfiguration[];
}
export interface TestRunPolicySnapshot {
  policyArn?: string;
  name?: string;
  availabilitySlo?: AvailabilitySlo;
  multiAz?: MultiAzTargets;
  multiRegion?: MultiRegionTargets;
  dataRecovery?: DataRecoveryTargets;
}
export type RegionSwitchExecutionId = string;
export type AccountTargeting = "SINGLE_ACCOUNT" | "MULTI_ACCOUNT" | (string & {});
export interface TestRun {
  testRunId: string;
  testId: string;
  status: TestRunStatus;
  serviceArn?: string;
  startedAt: Date;
  endedAt?: Date;
  experiments?: ExperimentDetails[];
  eventCount?: number;
  parameters?: { [key: string]: string[] | undefined };
  errorMessage?: string;
  stopConditions?: StopCondition[];
  loggingConfiguration?: LoggingConfiguration;
  roleName?: string;
  testTemplateArn: string;
  reportConfiguration?: TestRunReportConfiguration;
  policy?: TestRunPolicySnapshot;
  reportOutput?: ReportGenerationResult;
  regionSwitchPlanArn?: string;
  regionSwitchExecutionId?: string;
  permissionModel?: PermissionModel;
  regions?: string[];
  accountTargeting?: AccountTargeting;
}
export interface GetTestRunResponse {
  testRun: TestRun;
}
export interface GetTestTemplateRequest {
  testTemplateArn: string;
}
export type ParameterType = "STRING" | "STRING_LIST" | "INTEGER" | (string & {});
export interface TestTemplateParameter {
  name: string;
  description?: string;
  type: ParameterType;
  required: boolean;
  defaultValue?: string;
  maxValues?: number;
}
export type TestTemplateParameterList = TestTemplateParameter[];
export interface TestTemplate {
  testTemplateArn: string;
  name: string;
  description?: string;
  parameters?: TestTemplateParameter[];
  actions?: TestAction[];
}
export interface GetTestTemplateResponse {
  testTemplate: TestTemplate;
}
export interface GetUserJourneyRequest {
  systemArn: string;
  userJourneyId: string;
}
export interface GetUserJourneyResponse {
  userJourney: UserJourney;
}
export interface ImportAppRequest {
  v1AppArn: string;
  policyArn?: string;
  kmsKeyId?: string;
  skipManuallyAddedResources?: boolean;
  associatedSystems?: AssociatedSystem[];
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export interface ImportAppResponse {
  service: Service;
}
export interface ImportPolicyRequest {
  v1PolicyArn: string;
  kmsKeyId?: string;
  availabilitySlo?: AvailabilitySlo;
  multiAzDisasterRecoveryApproach?: MultiAzDisasterRecoveryApproach;
  multiRegionDisasterRecoveryApproach?: MultiRegionDisasterRecoveryApproach;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export interface ImportPolicyResponse {
  policy: Policy;
}
export type MaxResults = number;
export type NextToken = string;
export interface ListAssertionsRequest {
  serviceArn: string;
  source?: AssertionSource;
  maxResults?: number;
  nextToken?: string;
}
export type AssertionList = Assertion[];
export interface ListAssertionsResponse {
  assertions: Assertion[];
  nextToken?: string;
}
export type QueryGranularity = "HOURLY" | "DAILY" | (string & {});
export interface ListDependenciesRequest {
  serviceArn?: string;
  queryRangeStartTime?: Date;
  queryRangeEndTime?: Date;
  queryRangeGranularity?: QueryGranularity;
  maxResults?: number;
  nextToken?: string;
}
export interface QueryDataPoint {
  timestamp: Date;
  queryCount: number;
}
export type QueryDataPointList = QueryDataPoint[];
export interface QueryRange {
  startTime: Date;
  endTime: Date;
  granularity: QueryGranularity;
  dataPoints: QueryDataPoint[];
}
export type DependencyCriticality = "HARD" | "SOFT" | "UNKNOWN" | (string & {});
export interface DependencySummary {
  dependencyId: string;
  serviceArn: string;
  dependencyName: string;
  dnsName: string;
  location: string;
  lastDetectedTime: Date;
  sourceRegions: string[];
  provider?: string;
  queryRange: QueryRange;
  criticality: DependencyCriticality;
  comment?: string;
}
export type DependencySummaryList = DependencySummary[];
export interface ListDependenciesResponse {
  dependencySummaries: DependencySummary[];
  nextToken?: string;
}
export type AssessmentStatusList = AssessmentStatus[];
export type AssessmentSortField = "STARTED_AT" | (string & {});
export type SortOrder = "ASC" | "DESC" | (string & {});
export interface ListFailureModeAssessmentsRequest {
  serviceArn: string;
  assessmentStatuses?: AssessmentStatus[];
  startedAfter?: Date;
  endedBefore?: Date;
  sortBy?: AssessmentSortField;
  sortOrder?: SortOrder;
  maxResults?: number;
  nextToken?: string;
}
export type AssessmentStep =
  | "TOPOLOGY_GENERATION"
  | "INPUT_VALIDATION"
  | "DESIGN_ANALYSIS"
  | "TOPOLOGY_ENHANCEMENT"
  | "SERVICE_FUNCTION_GENERATION"
  | "POLICY_VALIDATION"
  | "RESILIENCE_ASSESSMENT"
  | "FAILURE_MODE_FINDINGS_CONSOLIDATION"
  | "FAILURE_MODE_FINDINGS_ENRICHMENT"
  | (string & {});
export type AssessmentErrorCode =
  | "INVALID_PERMISSIONS"
  | "CMK_ACCESS_DENIED"
  | "AGENT_ERROR"
  | "INTERNAL_ERROR"
  | "DESIGN_FILE_ACCESS_DENIED"
  | (string & {});
export interface AssessmentSummary {
  assessmentId: string;
  serviceArn: string;
  assessmentStatus?: AssessmentStatus;
  assessmentStep?: AssessmentStep;
  totalFindings?: number;
  startedAt?: Date;
  endedAt?: Date;
  errorMessage?: string;
  errorCode?: AssessmentErrorCode;
  assessmentCost?: AssessmentCost;
  billableAssessmentUnitCount?: number;
  achievability?: Achievability;
}
export type AssessmentSummaryList = AssessmentSummary[];
export interface ListFailureModeAssessmentsResponse {
  assessmentSummaries: AssessmentSummary[];
  nextToken?: string;
}
export interface ListFailureModeFindingsRequest {
  serviceArn: string;
  severity?: FindingSeverity;
  failureCategory?: FailureCategory;
  status?: FindingStatus;
  maxResults?: number;
  nextToken?: string;
}
export interface FindingSummary {
  serviceArn?: string;
  findingId?: string;
  name?: string;
  description?: string;
  failureCategory?: FailureCategory;
  severity?: FindingSeverity;
  status?: FindingStatus;
  policyComponent?: PolicyComponent;
  updatedAt?: Date;
}
export type FindingsList = FindingSummary[];
export interface ListFailureModeFindingsResponse {
  findingsSummary: FindingSummary[];
  nextToken?: string;
}
export type InputSourceType =
  | "CFN_STACK"
  | "TAGS"
  | "EKS"
  | "TERRAFORM"
  | "DESIGN_FILE"
  | "MONITORING"
  | (string & {});
export interface ListInputSourcesRequest {
  serviceArn: string;
  type?: InputSourceType;
  maxResults?: number;
  nextToken?: string;
}
export interface InputSourceSummary {
  inputSourceId: string;
  type?: InputSourceType;
  resourceTags?: ResourceTag[];
  cfnStackArn?: string;
  tfStateFileUrl?: string;
  eks?: EksSource;
  designFileS3Url?: string;
  createdAt?: Date;
}
export type InputSourceSummaryList = InputSourceSummary[];
export interface ListInputSourcesResponse {
  inputSourceSummaries: InputSourceSummary[];
  nextToken?: string;
}
export interface ListPoliciesRequest {
  accountId?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface PolicySummary {
  policyArn: string;
  name: string;
  availabilitySlo?: AvailabilitySlo;
  multiAz?: MultiAzTargets;
  multiRegion?: MultiRegionTargets;
  dataRecovery?: DataRecoveryTargets;
  sharingEnabled?: boolean;
  organizationId?: string;
  associatedServiceCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export type PolicySummaryList = PolicySummary[];
export interface ListPoliciesResponse {
  policySummaries: PolicySummary[];
  nextToken?: string;
}
export type PolicyEventType =
  | "POLICY_ATTACHED_TO_SERVICE"
  | "POLICY_DETACHED_FROM_SERVICE"
  | "POLICY_SHARING_REVOKED"
  | "POLICY_DELETED"
  | (string & {});
export type PolicyEventTypeList = PolicyEventType[];
export interface ListPolicyEventsRequest {
  policyArn: string;
  eventTypes?: PolicyEventType[];
  startTime?: Date;
  endTime?: Date;
  maxResults?: number;
  nextToken?: string;
}
export type ActorType = "USER" | "SYSTEM" | (string & {});
export interface EventActor {
  type: ActorType;
  principalId: string;
  accountId?: string;
  userName?: string;
}
export interface PolicyAttachedToServiceMetadata {
  serviceArn?: string;
  accountId?: string;
}
export interface PolicyDetachedFromServiceMetadata {
  serviceArn?: string;
  accountId?: string;
}
export interface PolicySharingRevokedMetadata {
  affectedServiceCount?: number;
}
export interface PolicyDeletedMetadata {
  affectedServiceCount?: number;
}
export type PolicyEventMetadata =
  | {
      policyAttachedToService: PolicyAttachedToServiceMetadata;
      policyDetachedFromService?: never;
      policySharingRevoked?: never;
      policyDeleted?: never;
    }
  | {
      policyAttachedToService?: never;
      policyDetachedFromService: PolicyDetachedFromServiceMetadata;
      policySharingRevoked?: never;
      policyDeleted?: never;
    }
  | {
      policyAttachedToService?: never;
      policyDetachedFromService?: never;
      policySharingRevoked: PolicySharingRevokedMetadata;
      policyDeleted?: never;
    }
  | {
      policyAttachedToService?: never;
      policyDetachedFromService?: never;
      policySharingRevoked?: never;
      policyDeleted: PolicyDeletedMetadata;
    };
export interface PolicyEventDetails {
  title: string;
  description: string;
  eventMetadata?: PolicyEventMetadata;
}
export interface PolicyEvent {
  eventId: string;
  timestamp: Date;
  eventType: PolicyEventType;
  policyArn: string;
  actor: EventActor;
  eventDetails: PolicyEventDetails;
}
export type PolicyEventList = PolicyEvent[];
export interface ListPolicyEventsResponse {
  events: PolicyEvent[];
  nextToken?: string;
}
export interface ListReportsRequest {
  serviceArn?: string;
  reportType?: ReportType;
  testRunId?: string;
  maxResults?: number;
  nextToken?: string;
}
export type ReportGenerationResultList = ReportGenerationResult[];
export interface ListReportsResponse {
  reportGenerationResults: ReportGenerationResult[];
  nextToken?: string;
}
export interface ListResolvedTestRunTargetResourcesRequest {
  testRunId: string;
  serviceArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type ResolvedTargetInformationKey = string;
export type ResolvedTargetInformationValue = string;
export type ResolvedTargetInformation = { [key: string]: string | undefined };
export interface ResolvedTargetResource {
  resourceType: string;
  targetName: string;
  targetInformation: { [key: string]: string | undefined };
}
export type ResolvedTargetResourceList = ResolvedTargetResource[];
export interface ListResolvedTestRunTargetResourcesResponse {
  resolvedTargetResources: ResolvedTargetResource[];
  nextToken?: string;
}
export type ResourceTypeFilter = string;
export type ResourceTypeFilterList = string[];
export interface ListResourcesRequest {
  serviceArn: string;
  serviceFunctionId?: string;
  awsRegion?: string;
  resourceTypes?: string[];
  billable?: boolean;
  maxResults?: number;
  nextToken?: string;
}
export interface InputSource {
  identifier: string;
  type: InputSourceType;
}
export interface Resource {
  identifier: string;
  awsRegion?: string;
  awsAccountId?: string;
  resourceType?: string;
}
export interface ServiceResource {
  resourceIdentifier: string;
  inputSource?: InputSource;
  resource: Resource;
}
export type ServiceResourceList = ServiceResource[];
export interface ListResourcesResponse {
  serviceFunctionId?: string;
  serviceResources?: ServiceResource[];
  nextToken?: string;
}
export type ServiceEventType =
  | "SERVICE_CREATED"
  | "SERVICE_DELETED"
  | "SERVICE_SYSTEM_ASSOCIATED"
  | "SERVICE_SYSTEM_DISASSOCIATED"
  | "SERVICE_RESOURCES_ASSOCIATED"
  | "SERVICE_RESOURCES_DISASSOCIATED"
  | "SERVICE_WORKFLOW_UPDATED"
  | "SERVICE_INPUT_SOURCES_UPDATED"
  | "SERVICE_POLICY_ASSOCIATED"
  | "SERVICE_POLICY_DISASSOCIATED"
  | "SERVICE_FUNCTION_CREATED"
  | "SERVICE_FUNCTION_UPDATED"
  | "SERVICE_FUNCTION_DELETED"
  | "SERVICE_FUNCTION_RESOURCES_ADDED"
  | "SERVICE_FUNCTION_RESOURCES_REMOVED"
  | "SERVICE_ACHIEVABILITY_UPDATED"
  | "ASSERTION_CREATED"
  | "ASSERTION_UPDATED"
  | "ASSERTION_DELETED"
  | (string & {});
export type ServiceEventTypeList = ServiceEventType[];
export interface ListServiceEventsRequest {
  serviceArn: string;
  eventTypes?: ServiceEventType[];
  startTime?: Date;
  endTime?: Date;
  maxResults?: number;
  nextToken?: string;
}
export interface ServiceCreatedMetadata {}
export interface ServiceDeletedMetadata {}
export interface ServiceSystemAssociatedMetadata {
  systemName?: string;
  systemArn?: string;
}
export interface ServiceSystemDisassociatedMetadata {
  systemId?: string;
  systemName?: string;
  systemArn?: string;
}
export type ResourceTypeList = string[];
export interface ServiceResourcesAssociatedMetadata {
  resourceCount?: number;
  resourceTypes?: string[];
}
export interface ServiceResourcesDisassociatedMetadata {
  resourceCount?: number;
  resourceTypes?: string[];
}
export interface ServiceWorkflowUpdatedMetadata {
  serviceFunctionId?: string;
  serviceFunctionName?: string;
}
export interface ServiceInputSourcesUpdatedMetadata {}
export interface ServicePolicyAssociatedMetadata {
  policyName?: string;
  policyArn?: string;
  policyOwnerAccountId?: string;
  policySource?: PolicyValueSource;
}
export type PolicyDisassociationReason =
  | "REPLACED_BY_UPDATE"
  | "SHARING_REVOKED"
  | "POLICY_DELETED"
  | (string & {});
export interface ServicePolicyDisassociatedMetadata {
  policyName?: string;
  policyArn?: string;
  policyOwnerAccountId?: string;
  policySource?: PolicyValueSource;
  reason?: PolicyDisassociationReason;
}
export interface ServiceFunctionCreatedMetadata {
  serviceFunctionId?: string;
  serviceFunctionName?: string;
}
export type ArnList = string[];
export interface ServiceFunctionUpdatedMetadata {
  serviceFunctionId?: string;
  serviceFunctionName?: string;
  resourcesAdded?: string[];
  resourcesRemoved?: string[];
}
export interface ServiceFunctionDeletedMetadata {
  serviceFunctionId?: string;
  serviceFunctionName?: string;
}
export interface ServiceFunctionResourcesAddedMetadata {
  serviceFunctionId?: string;
  serviceFunctionName?: string;
  resourcesAdded?: string[];
}
export interface ServiceFunctionResourcesRemovedMetadata {
  serviceFunctionId?: string;
  serviceFunctionName?: string;
  resourcesRemoved?: string[];
}
export interface ServiceAchievabilityUpdatedMetadata {
  assessmentId?: string;
  availabilitySlo?: string;
  multiAzRtoRpo?: string;
  multiRegionRtoRpo?: string;
}
export interface AssertionCreatedMetadata {
  assertionId?: string;
  assertionName?: string;
}
export interface AssertionUpdatedMetadata {
  assertionId?: string;
  assertionName?: string;
}
export interface AssertionDeletedMetadata {
  assertionId?: string;
  assertionName?: string;
}
export type ServiceEventMetadata =
  | {
      serviceCreated: ServiceCreatedMetadata;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted: ServiceDeletedMetadata;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated: ServiceSystemAssociatedMetadata;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated: ServiceSystemDisassociatedMetadata;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated: ServiceResourcesAssociatedMetadata;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated: ServiceResourcesDisassociatedMetadata;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated: ServiceWorkflowUpdatedMetadata;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated: ServiceInputSourcesUpdatedMetadata;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated: ServicePolicyAssociatedMetadata;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated: ServicePolicyDisassociatedMetadata;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated: ServiceFunctionCreatedMetadata;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated: ServiceFunctionUpdatedMetadata;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted: ServiceFunctionDeletedMetadata;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded: ServiceFunctionResourcesAddedMetadata;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved: ServiceFunctionResourcesRemovedMetadata;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated: ServiceAchievabilityUpdatedMetadata;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated: AssertionCreatedMetadata;
      assertionUpdated?: never;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated: AssertionUpdatedMetadata;
      assertionDeleted?: never;
    }
  | {
      serviceCreated?: never;
      serviceDeleted?: never;
      serviceSystemAssociated?: never;
      serviceSystemDisassociated?: never;
      serviceResourcesAssociated?: never;
      serviceResourcesDisassociated?: never;
      serviceWorkflowUpdated?: never;
      serviceInputSourcesUpdated?: never;
      servicePolicyAssociated?: never;
      servicePolicyDisassociated?: never;
      serviceFunctionCreated?: never;
      serviceFunctionUpdated?: never;
      serviceFunctionDeleted?: never;
      serviceFunctionResourcesAdded?: never;
      serviceFunctionResourcesRemoved?: never;
      serviceAchievabilityUpdated?: never;
      assertionCreated?: never;
      assertionUpdated?: never;
      assertionDeleted: AssertionDeletedMetadata;
    };
export interface ServiceEventDetails {
  title: string;
  description: string;
  eventMetadata?: ServiceEventMetadata;
}
export interface ServiceEvent {
  eventId: string;
  timestamp: Date;
  eventType: ServiceEventType;
  serviceArn: string;
  actor: EventActor;
  eventDetails: ServiceEventDetails;
}
export type ServiceEventList = ServiceEvent[];
export interface ListServiceEventsResponse {
  events: ServiceEvent[];
  nextToken?: string;
}
export interface ListServiceFunctionsRequest {
  serviceArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type ServiceFunctionList = ServiceFunction[];
export interface ListServiceFunctionsResponse {
  serviceFunctions: ServiceFunction[];
  nextToken?: string;
}
export interface ListServicesRequest {
  systemArn?: string;
  userJourneyId?: string;
  ouId?: string;
  accountId?: string;
  assessmentStatus?: AssessmentStatus;
  policyArn?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ServiceSummary {
  serviceArn: string;
  name: string;
  associatedSystems?: AssociatedSystem[];
  regions?: string[];
  policyArn?: string;
  assessmentStatus?: AssessmentStatus;
  openFindingsCount?: number;
  resolvedFindingsCount?: number;
  dependencyDiscovery?: DependencyDiscoveryConfig;
  achievability?: Achievability;
  organizationId?: string;
  ouId?: string;
  accountId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type ServiceSummaryList = ServiceSummary[];
export interface ListServicesResponse {
  serviceSummaries: ServiceSummary[];
  nextToken?: string;
}
export interface ListServiceTopologyEdgesRequest {
  serviceArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type TopologyType =
  | "CONTAINMENT"
  | "DATA_FLOW"
  | "OBSERVABILITY"
  | "PERMISSIONS"
  | (string & {});
export interface EdgePropertySummary {
  topologyType?: TopologyType;
  label?: string;
}
export type EdgePropertyList = EdgePropertySummary[];
export interface ServiceTopologyEdgeSummary {
  sourceResourceIdentifier: string;
  destinationResourceIdentifier: string;
  sourceRegion?: string;
  destinationRegion?: string;
  sourceAccount?: string;
  destinationAccount?: string;
  properties?: EdgePropertySummary[];
}
export type ServiceTopologyEdgeSummaryList = ServiceTopologyEdgeSummary[];
export interface ListServiceTopologyEdgesResponse {
  serviceTopologyEdgeSummaries?: ServiceTopologyEdgeSummary[];
  nextToken?: string;
}
export type SystemEventType =
  | "SYSTEM_CREATED"
  | "SYSTEM_DELETED"
  | "SYSTEM_USER_JOURNEY_CREATED"
  | "SYSTEM_USER_JOURNEY_UPDATED"
  | "SYSTEM_USER_JOURNEY_DELETED"
  | "SYSTEM_SERVICE_ASSOCIATED"
  | "SYSTEM_SERVICE_DISASSOCIATED"
  | "SYSTEM_POLICY_ASSOCIATED"
  | "SYSTEM_POLICY_DISASSOCIATED"
  | (string & {});
export type SystemEventTypeList = SystemEventType[];
export interface ListSystemEventsRequest {
  systemArn: string;
  eventTypes?: SystemEventType[];
  startTime?: Date;
  endTime?: Date;
  maxResults?: number;
  nextToken?: string;
}
export interface SystemCreatedMetadata {}
export interface SystemDeletedMetadata {}
export interface ServiceReference {
  serviceId?: string;
  serviceName?: string;
}
export type ServiceReferenceList = ServiceReference[];
export interface SystemUserJourneyCreatedMetadata {
  userJourneyName?: string;
  associatedServices?: ServiceReference[];
}
export interface StringChange {
  oldValue?: string;
  newValue?: string;
}
export interface ServiceReferenceChanges {
  added?: ServiceReference[];
  removed?: ServiceReference[];
}
export interface UserJourneyChanges {
  journeyDescription?: StringChange;
  associatedServices?: ServiceReferenceChanges;
}
export interface SystemUserJourneyUpdatedMetadata {
  userJourneyName?: string;
  changes?: UserJourneyChanges;
}
export interface SystemUserJourneyDeletedMetadata {
  userJourneyName?: string;
  associatedServicesAtDeletion?: ServiceReference[];
}
export type UserJourneyNameList = string[];
export interface SystemServiceAssociatedMetadata {
  serviceName?: string;
  serviceArn?: string;
  userJourneys?: string[];
}
export interface SystemServiceDisassociatedMetadata {
  serviceName?: string;
  serviceArn?: string;
  userJourneysAffected?: string[];
  comment?: string;
}
export interface SystemPolicyAssociatedMetadata {
  policyName?: string;
  policyArn?: string;
}
export interface SystemPolicyDisassociatedMetadata {
  policyName?: string;
  policyArn?: string;
}
export type SystemEventMetadata =
  | {
      systemCreated: SystemCreatedMetadata;
      systemDeleted?: never;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated?: never;
      systemServiceDisassociated?: never;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted: SystemDeletedMetadata;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated?: never;
      systemServiceDisassociated?: never;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted?: never;
      systemUserJourneyCreated: SystemUserJourneyCreatedMetadata;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated?: never;
      systemServiceDisassociated?: never;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted?: never;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated: SystemUserJourneyUpdatedMetadata;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated?: never;
      systemServiceDisassociated?: never;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted?: never;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted: SystemUserJourneyDeletedMetadata;
      systemServiceAssociated?: never;
      systemServiceDisassociated?: never;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted?: never;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated: SystemServiceAssociatedMetadata;
      systemServiceDisassociated?: never;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted?: never;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated?: never;
      systemServiceDisassociated: SystemServiceDisassociatedMetadata;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted?: never;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated?: never;
      systemServiceDisassociated?: never;
      systemPolicyAssociated: SystemPolicyAssociatedMetadata;
      systemPolicyDisassociated?: never;
    }
  | {
      systemCreated?: never;
      systemDeleted?: never;
      systemUserJourneyCreated?: never;
      systemUserJourneyUpdated?: never;
      systemUserJourneyDeleted?: never;
      systemServiceAssociated?: never;
      systemServiceDisassociated?: never;
      systemPolicyAssociated?: never;
      systemPolicyDisassociated: SystemPolicyDisassociatedMetadata;
    };
export interface SystemEventDetails {
  title: string;
  description: string;
  eventMetadata?: SystemEventMetadata;
}
export interface SystemEvent {
  eventId: string;
  timestamp: Date;
  eventType: SystemEventType;
  systemArn: string;
  actor: EventActor;
  eventDetails: SystemEventDetails;
}
export type SystemEventList = SystemEvent[];
export interface ListSystemEventsResponse {
  events: SystemEvent[];
  nextToken?: string;
}
export interface ListSystemsRequest {
  ouId?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface SystemSummary {
  systemId: string;
  name: string;
  systemArn?: string;
  userJourneysCount?: number;
  servicesCount?: number;
  organizationId?: string;
  ouId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type SystemSummaryList = SystemSummary[];
export interface ListSystemsResponse {
  systemSummaries: SystemSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListTestRunDependenciesRequest {
  testRunId: string;
  serviceArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type TestRunDependencySource = "DISCOVERED" | "MANUAL" | (string & {});
export interface TestRunDependencySummary {
  dependencyId?: string;
  dependencyName: string;
  dnsName: string;
  criticality: DependencyCriticality;
  source: TestRunDependencySource;
  location?: string;
  sourceRegions?: string[];
  provider?: string;
}
export type TestRunDependencySummaryList = TestRunDependencySummary[];
export interface ListTestRunDependenciesResponse {
  dependencies: TestRunDependencySummary[];
  nextToken?: string;
}
export interface ListTestRunEventsRequest {
  testRunId: string;
  serviceArn: string;
  startedAt?: Date;
  endedAt?: Date;
  maxResults?: number;
  nextToken?: string;
}
export type TestRunEventAttributeKey = string;
export type TestRunEventAttributeValue = string;
export type TestRunEventAttributes = { [key: string]: string | undefined };
export interface TestRunEvent {
  eventId: string;
  eventType: string;
  message: string;
  timestamp: Date;
  attributes?: { [key: string]: string | undefined };
}
export type TestRunEventList = TestRunEvent[];
export interface ListTestRunEventsResponse {
  events: TestRunEvent[];
  nextToken?: string;
}
export interface ListTestRunsRequest {
  serviceArn: string;
  testId?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface TestRunSummary {
  testRunId: string;
  status: TestRunStatus;
  startedAt: Date;
  endedAt?: Date;
  testTemplateArn: string;
  serviceArn?: string;
  errorMessage?: string;
  accountTargeting?: AccountTargeting;
}
export type TestRunSummaryList = TestRunSummary[];
export interface ListTestRunsResponse {
  testRuns: TestRunSummary[];
  nextToken?: string;
}
export type TestRunSourceArn = string;
export interface ListTestRunSourceEventsRequest {
  testRunId: string;
  serviceArn: string;
  sourceArn: string;
  maxResults?: number;
  nextToken?: string;
}
export type TestRunSourceEventType = "ALARM" | (string & {});
export type AlarmState = "OK" | "ALARM" | "INSUFFICIENT_DATA" | (string & {});
export interface AlarmStateChangeDetail {
  state: AlarmState;
  previousState?: AlarmState;
  reason?: string;
}
export type TestRunSourceEventErrorCode = "ACCESS_DENIED" | "INTERNAL_ERROR" | (string & {});
export interface TestRunSourceEventError {
  errorCode: TestRunSourceEventErrorCode;
  errorMessage: string;
}
export type TestRunSourceEventDetail =
  | { alarmStateChange: AlarmStateChangeDetail; error?: never }
  | { alarmStateChange?: never; error: TestRunSourceEventError };
export interface TestRunSourceEvent {
  timestamp: Date;
  sourceArn: string;
  eventType: TestRunSourceEventType;
  detail: TestRunSourceEventDetail;
}
export type TestRunSourceEventList = TestRunSourceEvent[];
export interface ListTestRunSourceEventsResponse {
  testRunSourceEvents: TestRunSourceEvent[];
  nextToken?: string;
}
export type TestRunSourceType = "SUCCESS_CRITERIA" | "OBSERVABILITY" | (string & {});
export interface ListTestRunSourcesRequest {
  testRunId: string;
  serviceArn: string;
  type?: TestRunSourceType;
  maxResults?: number;
  nextToken?: string;
}
export type TestSourceOutcome = "PASSED" | "FAILED" | "ERROR" | (string & {});
export interface TestRunSuccessCriteriaAlarmSummary {
  alarmArn: string;
  alarmName: string;
  region: string;
  accountId: string;
  outcome?: TestSourceOutcome;
  outcomeReason?: string;
}
export interface TestRunObservabilityAlarmSummary {
  alarmArn: string;
  alarmName: string;
  region: string;
  accountId: string;
}
export type TestRunSourceSummary =
  | { successCriteriaAlarm: TestRunSuccessCriteriaAlarmSummary; observabilityAlarm?: never }
  | { successCriteriaAlarm?: never; observabilityAlarm: TestRunObservabilityAlarmSummary };
export type TestRunSourceSummaryList = TestRunSourceSummary[];
export interface ListTestRunSourcesResponse {
  testRunSources: TestRunSourceSummary[];
  nextToken?: string;
}
export interface ListTestsRequest {
  serviceArn: string;
  maxResults?: number;
  nextToken?: string;
}
export interface TestSummary {
  testId: string;
  testTemplateArn: string;
  serviceArn: string;
  totalTestRuns: number;
  successfulTestRuns: number;
  creationTime: Date;
}
export type TestSummaryList = TestSummary[];
export interface ListTestsResponse {
  tests: TestSummary[];
  nextToken?: string;
}
export type TestSourceType = "SUCCESS_CRITERIA" | "OBSERVABILITY" | (string & {});
export interface ListTestSourcesRequest {
  testId: string;
  serviceArn: string;
  type?: TestSourceType;
  maxResults?: number;
  nextToken?: string;
}
export interface SuccessCriteriaAlarmSummary {
  alarmArn: string;
  alarmName: string;
  region: string;
  accountId: string;
  createdAt?: Date;
}
export interface ObservabilityAlarmSummary {
  alarmArn: string;
  alarmName: string;
  region: string;
  accountId: string;
  createdAt?: Date;
}
export type TestSourceSummary =
  | { successCriteriaAlarm: SuccessCriteriaAlarmSummary; observabilityAlarm?: never }
  | { successCriteriaAlarm?: never; observabilityAlarm: ObservabilityAlarmSummary };
export type TestSourceSummaryList = TestSourceSummary[];
export interface ListTestSourcesResponse {
  testSources: TestSourceSummary[];
  nextToken?: string;
}
export interface ListTestTemplatesRequest {}
export interface TestTemplateSummary {
  testTemplateArn: string;
  name: string;
  description: string;
}
export type TestTemplateSummaryList = TestTemplateSummary[];
export interface ListTestTemplatesResponse {
  testTemplates: TestTemplateSummary[];
}
export interface ListUserJourneysRequest {
  systemArn: string;
  maxResults?: number;
  nextToken?: string;
}
export interface UserJourneySummary {
  userJourneyId: string;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export type UserJourneySummaryList = UserJourneySummary[];
export interface ListUserJourneysResponse {
  userJourneySummaries: UserJourneySummary[];
  nextToken?: string;
}
export interface PutTestSourcesRequest {
  testId: string;
  serviceArn: string;
  testSources: TestSourceInput[];
}
export interface PutTestSourcesResponse {}
export interface StartDependencyInsightsRequest {
  serviceArn: string;
  clientToken?: string;
}
export interface StartDependencyInsightsResponse {
  status: DependencyInsightsStatus;
}
export interface StartFailureModeAssessmentRequest {
  serviceArn: string;
  clientToken?: string;
}
export interface StartFailureModeAssessmentResponse {
  assessmentId?: string;
  serviceArn?: string;
  assessmentStatus?: AssessmentStatus;
  startedAt?: Date;
}
export interface StartTestRunRequest {
  testId: string;
  serviceArn: string;
}
export type ExperimentArnList = string[];
export interface StartTestRunResponse {
  testRunId: string;
  status: TestRunStatus;
  experimentArns: string[];
}
export interface StopTestRunRequest {
  testRunId: string;
  serviceArn: string;
}
export interface StopTestRunResponse {
  testRunId: string;
  status: TestRunStatus;
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
export interface UpdateAssertionRequest {
  serviceArn: string;
  assertionId: string;
  text?: string;
}
export interface UpdateAssertionResponse {
  assertion: Assertion;
}
export interface UpdateDependencyRequest {
  serviceArn: string;
  dependencyId: string;
  criticality?: DependencyCriticality;
  comment?: string;
}
export interface UpdateDependencyResponse {
  dependencyId: string;
  dependencyName: string;
  location: string;
  criticality: DependencyCriticality;
  comment?: string;
  provider?: string;
  updatedAt: Date;
}
export interface UpdateFailureModeFindingRequest {
  findingId: string;
  status: FindingStatus;
  serviceArn: string;
  comment?: string;
}
export interface UpdateFailureModeFindingResponse {
  finding?: Finding;
}
export interface UpdatePolicyRequest {
  policyArn: string;
  description?: string;
  availabilitySlo?: AvailabilitySlo;
  multiAz?: MultiAzTargets;
  multiRegion?: MultiRegionTargets;
  dataRecovery?: DataRecoveryTargets;
  sharingEnabled?: boolean;
}
export interface UpdatePolicyResponse {
  policy: Policy;
}
export interface UpdateServiceRequest {
  serviceArn: string;
  description?: string;
  associatedSystems?: AssociatedSystem[];
  policyArn?: string;
  regions?: string[];
  permissionModel?: PermissionModel;
  dependencyDiscovery?: DependencyDiscoveryInput;
  reportConfiguration?: ServiceReportConfiguration;
}
export interface UpdateServiceResponse {
  service: Service;
}
export interface UpdateServiceFunctionRequest {
  serviceArn: string;
  serviceFunctionId: string;
  name?: string;
  description?: string;
  criticality?: ServiceFunctionCriticality;
}
export interface UpdateServiceFunctionResponse {
  serviceFunction: ServiceFunction;
}
export interface UpdateSystemRequest {
  systemArn: string;
  description?: string;
  sharingEnabled?: boolean;
}
export interface UpdateSystemResponse {
  system: System;
}
export interface UpdateTestRequest {
  testId: string;
  serviceArn: string;
  loggingConfiguration?: LoggingConfiguration;
  stopConditions?: StopCondition[];
  roleName?: string;
  parameters?: { [key: string]: string[] | undefined };
}
export interface UpdateTestResponse {
  test: Test;
}
export interface UpdateUserJourneyRequest {
  systemArn: string;
  userJourneyId: string;
  name?: string;
  description?: string;
  policyArn?: string;
}
export interface UpdateUserJourneyResponse {
  userJourney: UserJourney;
}
export type ValidationExceptionReason =
  | "INVALID_FIELD_VALUE"
  | "DUPLICATE_VALUE"
  | "MISSING_REQUIRED_FIELD"
  | "OTHER"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type CreateAssertionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a resilience assertion for a service.
 */
export const createAssertion: API.OperationMethod<
  CreateAssertionRequest,
  CreateAssertionResponse,
  CreateAssertionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2560, __c80, 0) as any as S.Schema<CreateAssertionRequest>,
  output: __S(2624, __c82, 0) as any as S.Schema<CreateAssertionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssertion",
}));

export type CreateInputSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an input source for a service.
 */
export const createInputSource: API.OperationMethod<
  CreateInputSourceRequest,
  CreateInputSourceResponse,
  CreateInputSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2977, __c93, 1) as any as S.Schema<CreateInputSourceRequest>,
  output: __S(3040, __c95, 0) as any as S.Schema<CreateInputSourceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInputSource",
}));

export type CreatePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a resilience policy that defines availability and disaster recovery requirements.
 */
export const createPolicy: API.OperationMethod<
  CreatePolicyRequest,
  CreatePolicyResponse,
  CreatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3136, __c98, 0) as any as S.Schema<CreatePolicyRequest>,
  output: __S(3201, __c100, 1) as any as S.Schema<CreatePolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePolicy",
}));

export type CreateReportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * On-demand report creation. Idempotent -- duplicate requests with same clientToken return existing result.
 */
export const createReport: API.OperationMethod<
  CreateReportRequest,
  CreateReportResponse,
  CreateReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateReportRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<CreateReportResponse>,
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
  operationName: "CreateReport",
}));

export type CreateServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a service.
 */
export const createService: API.OperationMethod<
  CreateServiceRequest,
  CreateServiceResponse,
  CreateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<CreateServiceRequest>,
  output: __S(230, __c7, 6) as any as S.Schema<CreateServiceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateService",
}));

export type CreateServiceFunctionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a service function within a service.
 */
export const createServiceFunction: API.OperationMethod<
  CreateServiceFunctionRequest,
  CreateServiceFunctionResponse,
  CreateServiceFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<CreateServiceFunctionRequest>,
  output: __S(320, __c10, 0) as any as S.Schema<CreateServiceFunctionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceFunction",
}));

export type CreateServiceFunctionResourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Associates resources with a service function.
 */
export const createServiceFunctionResources: API.OperationMethod<
  CreateServiceFunctionResourcesRequest,
  CreateServiceFunctionResourcesResponse,
  CreateServiceFunctionResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<CreateServiceFunctionResourcesRequest>,
  output: __S(384, __c12, 0) as any as S.Schema<CreateServiceFunctionResourcesResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateServiceFunctionResources",
}));

export type CreateSystemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a system that represents a logical grouping of services.
 */
export const createSystem: API.OperationMethod<
  CreateSystemRequest,
  CreateSystemResponse,
  CreateSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<CreateSystemRequest>,
  output: __S(449, __c14, 1) as any as S.Schema<CreateSystemResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSystem",
}));

export type CreateTestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a test for a service by configuring a test template. Each service has one test per template.
 */
export const createTest: API.OperationMethod<
  CreateTestRequest,
  CreateTestResponse,
  CreateTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<CreateTestRequest>,
  output: __S(577, __c18, 1) as any as S.Schema<CreateTestResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTest",
}));

export type CreateUserJourneyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a user journey within a system.
 */
export const createUserJourney: API.OperationMethod<
  CreateUserJourneyRequest,
  CreateUserJourneyResponse,
  CreateUserJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<CreateUserJourneyRequest>,
  output: __S(641, __c20, 1) as any as S.Schema<CreateUserJourneyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateUserJourney",
}));

export type DeleteAssertionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resilience assertion from a service.
 */
export const deleteAssertion: API.OperationMethod<
  DeleteAssertionRequest,
  DeleteAssertionResponse,
  DeleteAssertionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<DeleteAssertionRequest>,
  output: __S(673, __c21, 1) as any as S.Schema<DeleteAssertionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssertion",
}));

export type DeleteInputSourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an input source.
 */
export const deleteInputSource: API.OperationMethod<
  DeleteInputSourceRequest,
  DeleteInputSourceResponse,
  DeleteInputSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<DeleteInputSourceRequest>,
  output: __S(3040, __c95, 0) as any as S.Schema<DeleteInputSourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteInputSource",
}));

export type DeletePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a resilience policy.
 */
export const deletePolicy: API.OperationMethod<
  DeletePolicyRequest,
  DeletePolicyResponse,
  DeletePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<DeletePolicyRequest>,
  output: __S(737, __c23, 1) as any as S.Schema<DeletePolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePolicy",
}));

export type DeleteServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a service.
 */
export const deleteService: API.OperationMethod<
  DeleteServiceRequest,
  DeleteServiceResponse,
  DeleteServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<DeleteServiceRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<DeleteServiceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteService",
}));

export type DeleteServiceFunctionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a service function.
 */
export const deleteServiceFunction: API.OperationMethod<
  DeleteServiceFunctionRequest,
  DeleteServiceFunctionResponse,
  DeleteServiceFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<DeleteServiceFunctionRequest>,
  output: __S(801, __c25, 1) as any as S.Schema<DeleteServiceFunctionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceFunction",
}));

export type DeleteServiceFunctionResourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes resources from a service function.
 */
export const deleteServiceFunctionResources: API.OperationMethod<
  DeleteServiceFunctionResourcesRequest,
  DeleteServiceFunctionResourcesResponse,
  DeleteServiceFunctionResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<DeleteServiceFunctionResourcesRequest>,
  output: __S(384, __c12, 0) as any as S.Schema<DeleteServiceFunctionResourcesResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteServiceFunctionResources",
}));

export type DeleteSystemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a system.
 */
export const deleteSystem: API.OperationMethod<
  DeleteSystemRequest,
  DeleteSystemResponse,
  DeleteSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<DeleteSystemRequest>,
  output: __S(865, __c27, 1) as any as S.Schema<DeleteSystemResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSystem",
}));

export type DeleteTestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a test.
 */
export const deleteTest: API.OperationMethod<
  DeleteTestRequest,
  DeleteTestResponse,
  DeleteTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<DeleteTestRequest>,
  output: __S(897, __c28, 1) as any as S.Schema<DeleteTestResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTest",
}));

export type DeleteTestSourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes monitoring sources from a test. The operation is transactional and idempotent -- removing a source that is not attached is a no-op.
 */
export const deleteTestSources: API.OperationMethod<
  DeleteTestSourcesRequest,
  DeleteTestSourcesResponse,
  DeleteTestSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(928, __c29, 0) as any as S.Schema<DeleteTestSourcesRequest>,
  output: __S(960, __c30, 0) as any as S.Schema<DeleteTestSourcesResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTestSources",
}));

export type DeleteUserJourneyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a user journey.
 */
export const deleteUserJourney: API.OperationMethod<
  DeleteUserJourneyRequest,
  DeleteUserJourneyResponse,
  DeleteUserJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<DeleteUserJourneyRequest>,
  output: __S(1025, __c32, 1) as any as S.Schema<DeleteUserJourneyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteUserJourney",
}));

export type GetDependencyInsightsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the dependency insights generated for a service. The response reports the current generation status; insights are populated once generation has completed. If generation failed, the response includes an error code, whose possible values are listed under the response's errorCode field, and a message describing the cause. To use this operation, you must have the `resiliencehub:GetDependencyInsights` permission on the service.
 */
export const getDependencyInsights: API.OperationMethod<
  GetDependencyInsightsRequest,
  GetDependencyInsightsResponse,
  GetDependencyInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<GetDependencyInsightsRequest>,
  output: __S(1059, __c33, 3) as any as S.Schema<GetDependencyInsightsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDependencyInsights",
}));

export type GetFailureModeFindingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a finding by findingId.
 */
export const getFailureModeFinding: API.OperationMethod<
  GetFailureModeFindingRequest,
  GetFailureModeFindingResponse,
  GetFailureModeFindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<GetFailureModeFindingRequest>,
  output: __S(1123, __c35, 3) as any as S.Schema<GetFailureModeFindingResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFailureModeFinding",
}));

export type GetPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a resilience policy by ARN.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyRequest,
  GetPolicyResponse,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<GetPolicyRequest>,
  output: __S(3201, __c100, 1) as any as S.Schema<GetPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
}));

export type GetServiceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a service by ARN.
 */
export const getService: API.OperationMethod<
  GetServiceRequest,
  GetServiceResponse,
  GetServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<GetServiceRequest>,
  output: __S(230, __c7, 6) as any as S.Schema<GetServiceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetService",
}));

export type GetSystemError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a system by ARN.
 */
export const getSystem: API.OperationMethod<
  GetSystemRequest,
  GetSystemResponse,
  GetSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<GetSystemRequest>,
  output: __S(449, __c14, 1) as any as S.Schema<GetSystemResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSystem",
}));

export type GetTestError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a test by ID.
 */
export const getTest: API.OperationMethod<
  GetTestRequest,
  GetTestResponse,
  GetTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<GetTestRequest>,
  output: __S(577, __c18, 1) as any as S.Schema<GetTestResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTest",
}));

export type GetTestRunError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a test run by ID, including its status, results, and the configuration snapshotted when the run started.
 */
export const getTestRun: API.OperationMethod<
  GetTestRunRequest,
  GetTestRunResponse,
  GetTestRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<GetTestRunRequest>,
  output: __S(1286, __c40, 6) as any as S.Schema<GetTestRunResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTestRun",
}));

export type GetTestTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a resilience test template by ARN, including the parameters it accepts and the fault actions it runs.
 */
export const getTestTemplate: API.OperationMethod<
  GetTestTemplateRequest,
  GetTestTemplateResponse,
  GetTestTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1312, __c41, 0) as any as S.Schema<GetTestTemplateRequest>,
  output: __S(1316, __c41, 4) as any as S.Schema<GetTestTemplateResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTestTemplate",
}));

export type GetUserJourneyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a user journey.
 */
export const getUserJourney: API.OperationMethod<
  GetUserJourneyRequest,
  GetUserJourneyResponse,
  GetUserJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<GetUserJourneyRequest>,
  output: __S(641, __c20, 1) as any as S.Schema<GetUserJourneyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserJourney",
}));

export type ImportAppError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Imports a V1 app into the V2 resource model, creating a service with the same name.
 */
export const importApp: API.OperationMethod<
  ImportAppRequest,
  ImportAppResponse,
  ImportAppError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1376, __c43, 0) as any as S.Schema<ImportAppRequest>,
  output: __S(230, __c7, 6) as any as S.Schema<ImportAppResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportApp",
}));

export type ImportPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Imports a V1 policy into V2, mapping RTO/RPO values from V1 scenarios.
 */
export const importPolicy: API.OperationMethod<
  ImportPolicyRequest,
  ImportPolicyResponse,
  ImportPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<ImportPolicyRequest>,
  output: __S(3201, __c100, 1) as any as S.Schema<ImportPolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ImportPolicy",
}));

export type ListAssertionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists resilience assertions for a service.
 */
export const listAssertions: API.PaginatedOperationMethod<
  ListAssertionsRequest,
  ListAssertionsResponse,
  ListAssertionsError,
  Credentials | HttpClient.HttpClient,
  Assertion
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<ListAssertionsRequest>,
  output: __S(1442, __c45, 2) as any as S.Schema<ListAssertionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssertions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assertions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDependenciesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists dependencies discovered for services.
 */
export const listDependencies: API.PaginatedOperationMethod<
  ListDependenciesRequest,
  ListDependenciesResponse,
  ListDependenciesError,
  Credentials | HttpClient.HttpClient,
  DependencySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<ListDependenciesRequest>,
  output: __S(1478, __c46, 6) as any as S.Schema<ListDependenciesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDependencies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dependencySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFailureModeAssessmentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists failure mode assessments.
 */
export const listFailureModeAssessments: API.PaginatedOperationMethod<
  ListFailureModeAssessmentsRequest,
  ListFailureModeAssessmentsResponse,
  ListFailureModeAssessmentsError,
  Credentials | HttpClient.HttpClient,
  AssessmentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1504, __c47, 0) as any as S.Schema<ListFailureModeAssessmentsRequest>,
  output: __S(1507, __c47, 3) as any as S.Schema<ListFailureModeAssessmentsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFailureModeAssessments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assessmentSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFailureModeFindingsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List findings.
 */
export const listFailureModeFindings: API.PaginatedOperationMethod<
  ListFailureModeFindingsRequest,
  ListFailureModeFindingsResponse,
  ListFailureModeFindingsError,
  Credentials | HttpClient.HttpClient,
  FindingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1568, __c49, 0) as any as S.Schema<ListFailureModeFindingsRequest>,
  output: __S(1571, __c49, 3) as any as S.Schema<ListFailureModeFindingsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFailureModeFindings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "findingsSummary",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInputSourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists input sources for a service.
 */
export const listInputSources: API.PaginatedOperationMethod<
  ListInputSourcesRequest,
  ListInputSourcesResponse,
  ListInputSourcesError,
  Credentials | HttpClient.HttpClient,
  InputSourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<ListInputSourcesRequest>,
  output: __S(1603, __c50, 3) as any as S.Schema<ListInputSourcesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInputSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "inputSourceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPoliciesError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists resilience policies.
 */
export const listPolicies: API.PaginatedOperationMethod<
  ListPoliciesRequest,
  ListPoliciesResponse,
  ListPoliciesError,
  Credentials | HttpClient.HttpClient,
  PolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<ListPoliciesRequest>,
  output: __S(1635, __c51, 3) as any as S.Schema<ListPoliciesResponse>,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "policySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPolicyEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists events for a resilience policy, including services that started or stopped using it, changes to cross-account sharing, and deletion of the policy.
 */
export const listPolicyEvents: API.PaginatedOperationMethod<
  ListPolicyEventsRequest,
  ListPolicyEventsResponse,
  ListPolicyEventsError,
  Credentials | HttpClient.HttpClient,
  PolicyEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<ListPolicyEventsRequest>,
  output: __S(1671, __c52, 7) as any as S.Schema<ListPolicyEventsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPolicyEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListReportsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List reports for a service, or all reports owned by the account if serviceArn is not provided.
 */
export const listReports: API.PaginatedOperationMethod<
  ListReportsRequest,
  ListReportsResponse,
  ListReportsError,
  Credentials | HttpClient.HttpClient,
  ReportGenerationResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<ListReportsRequest>,
  output: __S(1730, __c54, 2) as any as S.Schema<ListReportsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListReports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "reportGenerationResults",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResolvedTestRunTargetResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the AWS resources that AWS Fault Injection Service (AWS FIS) resolved as targets for a test run.
 */
export const listResolvedTestRunTargetResources: API.PaginatedOperationMethod<
  ListResolvedTestRunTargetResourcesRequest,
  ListResolvedTestRunTargetResourcesResponse,
  ListResolvedTestRunTargetResourcesError,
  Credentials | HttpClient.HttpClient,
  ResolvedTargetResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<ListResolvedTestRunTargetResourcesRequest>,
  output: __S(1763, __c55, 3) as any as S.Schema<ListResolvedTestRunTargetResourcesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResolvedTestRunTargetResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resolvedTargetResources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * List resources.
 */
export const listResources: API.PaginatedOperationMethod<
  ListResourcesRequest,
  ListResourcesResponse,
  ListResourcesError,
  Credentials | HttpClient.HttpClient,
  ServiceResource
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<ListResourcesRequest>,
  output: __S(1797, __c56, 5) as any as S.Schema<ListResourcesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceResources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists events for a service.
 */
export const listServiceEvents: API.PaginatedOperationMethod<
  ListServiceEventsRequest,
  ListServiceEventsResponse,
  ListServiceEventsError,
  Credentials | HttpClient.HttpClient,
  ServiceEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1824, __c57, 0) as any as S.Schema<ListServiceEventsRequest>,
  output: __S(1840, __c57, 16) as any as S.Schema<ListServiceEventsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceFunctionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists service functions for a service.
 */
export const listServiceFunctions: API.PaginatedOperationMethod<
  ListServiceFunctionsRequest,
  ListServiceFunctionsResponse,
  ListServiceFunctionsError,
  Credentials | HttpClient.HttpClient,
  ServiceFunction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<ListServiceFunctionsRequest>,
  output: __S(1858, __c58, 2) as any as S.Schema<ListServiceFunctionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceFunctions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceFunctions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServicesError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists services.
 */
export const listServices: API.PaginatedOperationMethod<
  ListServicesRequest,
  ListServicesResponse,
  ListServicesError,
  Credentials | HttpClient.HttpClient,
  ServiceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<ListServicesRequest>,
  output: __S(1891, __c59, 3) as any as S.Schema<ListServicesResponse>,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListServiceTopologyEdgesError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists topology edges for a service.
 */
export const listServiceTopologyEdges: API.PaginatedOperationMethod<
  ListServiceTopologyEdgesRequest,
  ListServiceTopologyEdgesResponse,
  ListServiceTopologyEdgesError,
  Credentials | HttpClient.HttpClient,
  ServiceTopologyEdgeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<ListServiceTopologyEdgesRequest>,
  output: __S(1925, __c60, 5) as any as S.Schema<ListServiceTopologyEdgesResponse>,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListServiceTopologyEdges",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "serviceTopologyEdgeSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSystemEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists events for a system.
 */
export const listSystemEvents: API.PaginatedOperationMethod<
  ListSystemEventsRequest,
  ListSystemEventsResponse,
  ListSystemEventsError,
  Credentials | HttpClient.HttpClient,
  SystemEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<ListSystemEventsRequest>,
  output: __S(1968, __c61, 16) as any as S.Schema<ListSystemEventsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSystemEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSystemsError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists systems.
 */
export const listSystems: API.PaginatedOperationMethod<
  ListSystemsRequest,
  ListSystemsResponse,
  ListSystemsError,
  Credentials | HttpClient.HttpClient,
  SystemSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(1984, __c62, 0) as any as S.Schema<ListSystemsRequest>,
  output: __S(1987, __c62, 3) as any as S.Schema<ListSystemsResponse>,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSystems",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "systemSummaries",
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
 * Lists the tags for a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2017, __c63, 1) as any as S.Schema<ListTagsForResourceResponse>,
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

export type ListTestRunDependenciesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the dependencies that a test run blocked. Each dependency reflects the discovered classification captured when the run started, so results do not change if a dependency is reclassified after the run.
 */
export const listTestRunDependencies: API.PaginatedOperationMethod<
  ListTestRunDependenciesRequest,
  ListTestRunDependenciesResponse,
  ListTestRunDependenciesError,
  Credentials | HttpClient.HttpClient,
  TestRunDependencySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2048, __c64, 0) as any as S.Schema<ListTestRunDependenciesRequest>,
  output: __S(2051, __c64, 3) as any as S.Schema<ListTestRunDependenciesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestRunDependencies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dependencies",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestRunEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the events in a test run's timeline.
 */
export const listTestRunEvents: API.PaginatedOperationMethod<
  ListTestRunEventsRequest,
  ListTestRunEventsResponse,
  ListTestRunEventsError,
  Credentials | HttpClient.HttpClient,
  TestRunEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<ListTestRunEventsRequest>,
  output: __S(2083, __c65, 3) as any as S.Schema<ListTestRunEventsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestRunEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestRunsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the runs of a test, or all test runs for a service.
 */
export const listTestRuns: API.PaginatedOperationMethod<
  ListTestRunsRequest,
  ListTestRunsResponse,
  ListTestRunsError,
  Credentials | HttpClient.HttpClient,
  TestRunSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2112, __c66, 0) as any as S.Schema<ListTestRunsRequest>,
  output: __S(2115, __c66, 3) as any as S.Schema<ListTestRunsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestRuns",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "testRuns",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestRunSourceEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the state-change events observed for a test run monitoring source. Events are returned for one source per call, in chronological order.
 */
export const listTestRunSourceEvents: API.PaginatedOperationMethod<
  ListTestRunSourceEventsRequest,
  ListTestRunSourceEventsResponse,
  ListTestRunSourceEventsError,
  Credentials | HttpClient.HttpClient,
  TestRunSourceEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<ListTestRunSourceEventsRequest>,
  output: __S(2150, __c67, 6) as any as S.Schema<ListTestRunSourceEventsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestRunSourceEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "testRunSourceEvents",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestRunSourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the monitoring source snapshots captured for a test run, optionally filtered by type.
 */
export const listTestRunSources: API.PaginatedOperationMethod<
  ListTestRunSourcesRequest,
  ListTestRunSourcesResponse,
  ListTestRunSourcesError,
  Credentials | HttpClient.HttpClient,
  TestRunSourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2176, __c68, 0) as any as S.Schema<ListTestRunSourcesRequest>,
  output: __S(2181, __c68, 5) as any as S.Schema<ListTestRunSourcesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestRunSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "testRunSources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tests configured for a service.
 */
export const listTests: API.PaginatedOperationMethod<
  ListTestsRequest,
  ListTestsResponse,
  ListTestsError,
  Credentials | HttpClient.HttpClient,
  TestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<ListTestsRequest>,
  output: __S(2243, __c70, 3) as any as S.Schema<ListTestsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tests",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestSourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the monitoring sources attached to a test, optionally filtered by type.
 */
export const listTestSources: API.PaginatedOperationMethod<
  ListTestSourcesRequest,
  ListTestSourcesResponse,
  ListTestSourcesError,
  Credentials | HttpClient.HttpClient,
  TestSourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<ListTestSourcesRequest>,
  output: __S(2276, __c71, 4) as any as S.Schema<ListTestSourcesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "testSources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTestTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ValidationException
  | CommonErrors;
/**
 * Lists the available resilience test templates. A test template is a pre-configured, AWS recommended test that defines which resilience capability to validate.
 */
export const listTestTemplates: API.OperationMethod<
  ListTestTemplatesRequest,
  ListTestTemplatesResponse,
  ListTestTemplatesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2304, __c72, 0) as any as S.Schema<ListTestTemplatesRequest>,
  output: __S(2307, __c72, 3) as any as S.Schema<ListTestTemplatesResponse>,
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestTemplates",
}));

export type ListUserJourneysError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists user journeys for a system.
 */
export const listUserJourneys: API.PaginatedOperationMethod<
  ListUserJourneysRequest,
  ListUserJourneysResponse,
  ListUserJourneysError,
  Credentials | HttpClient.HttpClient,
  UserJourneySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<ListUserJourneysRequest>,
  output: __S(2339, __c73, 3) as any as S.Schema<ListUserJourneysResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListUserJourneys",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "userJourneySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutTestSourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Adds or updates the monitoring sources on a test. The operation is transactional -- either every source is written or the call fails and nothing is written.
 */
export const putTestSources: API.OperationMethod<
  PutTestSourcesRequest,
  PutTestSourcesResponse,
  PutTestSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2368, __c74, 0) as any as S.Schema<PutTestSourcesRequest>,
  output: __S(960, __c30, 0) as any as S.Schema<PutTestSourcesResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutTestSources",
}));

export type StartDependencyInsightsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts generating dependency insights for a service. Generation runs asynchronously; the response returns the initial status, and you retrieve the results with GetDependencyInsights. To use this operation, you must have the `resiliencehub:StartDependencyInsights` permission on the service.
 */
export const startDependencyInsights: API.OperationMethod<
  StartDependencyInsightsRequest,
  StartDependencyInsightsResponse,
  StartDependencyInsightsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2400, __c75, 0) as any as S.Schema<StartDependencyInsightsRequest>,
  output: __S(2401, __c75, 1) as any as S.Schema<StartDependencyInsightsResponse>,
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
  operationName: "StartDependencyInsights",
}));

export type StartFailureModeAssessmentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a failure mode assessment.
 */
export const startFailureModeAssessment: API.OperationMethod<
  StartFailureModeAssessmentRequest,
  StartFailureModeAssessmentResponse,
  StartFailureModeAssessmentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2432, __c76, 0) as any as S.Schema<StartFailureModeAssessmentRequest>,
  output: __S(2433, __c76, 1) as any as S.Schema<StartFailureModeAssessmentResponse>,
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
  operationName: "StartFailureModeAssessment",
}));

export type StartTestRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Starts a run of a test. Each run scopes to the current resources in the service and produces a pass or fail outcome.
 */
export const startTestRun: API.OperationMethod<
  StartTestRunRequest,
  StartTestRunResponse,
  StartTestRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<StartTestRunRequest>,
  output: __S(2465, __c77, 1) as any as S.Schema<StartTestRunResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTestRun",
}));

export type StopTestRunError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Stops an in-progress test run.
 */
export const stopTestRun: API.OperationMethod<
  StopTestRunRequest,
  StopTestRunResponse,
  StopTestRunError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2496, __c78, 0) as any as S.Schema<StopTestRunRequest>,
  output: __S(2497, __c78, 1) as any as S.Schema<StopTestRunResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopTestRun",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2528, __c79, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(960, __c30, 0) as any as S.Schema<TagResourceResponse>,
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
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2656, __c83, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(960, __c30, 0) as any as S.Schema<UntagResourceResponse>,
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

export type UpdateAssertionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a resilience assertion.
 */
export const updateAssertion: API.OperationMethod<
  UpdateAssertionRequest,
  UpdateAssertionResponse,
  UpdateAssertionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2688, __c84, 0) as any as S.Schema<UpdateAssertionRequest>,
  output: __S(2624, __c82, 0) as any as S.Schema<UpdateAssertionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAssertion",
}));

export type UpdateDependencyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a dependency classification.
 */
export const updateDependency: API.OperationMethod<
  UpdateDependencyRequest,
  UpdateDependencyResponse,
  UpdateDependencyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<UpdateDependencyRequest>,
  output: __S(2721, __c85, 1) as any as S.Schema<UpdateDependencyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDependency",
}));

export type UpdateFailureModeFindingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing finding.
 */
export const updateFailureModeFinding: API.OperationMethod<
  UpdateFailureModeFindingRequest,
  UpdateFailureModeFindingResponse,
  UpdateFailureModeFindingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2752, __c86, 0) as any as S.Schema<UpdateFailureModeFindingRequest>,
  output: __S(1123, __c35, 3) as any as S.Schema<UpdateFailureModeFindingResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFailureModeFinding",
}));

export type UpdatePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing resilience policy.
 */
export const updatePolicy: API.OperationMethod<
  UpdatePolicyRequest,
  UpdatePolicyResponse,
  UpdatePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<UpdatePolicyRequest>,
  output: __S(3201, __c100, 1) as any as S.Schema<UpdatePolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePolicy",
}));

export type UpdateServiceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing service.
 */
export const updateService: API.OperationMethod<
  UpdateServiceRequest,
  UpdateServiceResponse,
  UpdateServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2816, __c88, 0) as any as S.Schema<UpdateServiceRequest>,
  output: __S(230, __c7, 6) as any as S.Schema<UpdateServiceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateService",
}));

export type UpdateServiceFunctionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a service function.
 */
export const updateServiceFunction: API.OperationMethod<
  UpdateServiceFunctionRequest,
  UpdateServiceFunctionResponse,
  UpdateServiceFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2848, __c89, 0) as any as S.Schema<UpdateServiceFunctionRequest>,
  output: __S(320, __c10, 0) as any as S.Schema<UpdateServiceFunctionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateServiceFunction",
}));

export type UpdateSystemError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing system.
 */
export const updateSystem: API.OperationMethod<
  UpdateSystemRequest,
  UpdateSystemResponse,
  UpdateSystemError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2880, __c90, 0) as any as S.Schema<UpdateSystemRequest>,
  output: __S(449, __c14, 1) as any as S.Schema<UpdateSystemResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSystem",
}));

export type UpdateTestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing test.
 */
export const updateTest: API.OperationMethod<
  UpdateTestRequest,
  UpdateTestResponse,
  UpdateTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2912, __c91, 0) as any as S.Schema<UpdateTestRequest>,
  output: __S(577, __c18, 1) as any as S.Schema<UpdateTestResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateTest",
}));

export type UpdateUserJourneyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing user journey.
 */
export const updateUserJourney: API.OperationMethod<
  UpdateUserJourneyRequest,
  UpdateUserJourneyResponse,
  UpdateUserJourneyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<UpdateUserJourneyRequest>,
  output: __S(641, __c20, 1) as any as S.Schema<UpdateUserJourneyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateUserJourney",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          reportType: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/create-report" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateReportRequest" });
    case 1:
      return S.suspend(() => S.Struct({ reportGenerationResult: __S(35, __c1, 3) })).annotate({
        identifier: "CreateReportResponse",
      });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ s3ObjectKey: S.String })).annotate({
        identifier: "S3ReportOutput",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ errorCode: S.String, errorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "FailedReportOutput" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ s3ReportOutput: __S(32, __c1, 0) }),
        /*@__PURE__*/ S.Struct({ failedReportOutput: __S(33, __c1, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          reportType: S.String,
          status: S.String,
          serviceArn: S.optional(S.String),
          assessmentId: S.optional(S.String),
          testRunId: S.optional(S.String),
          testTemplateArn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          reportOutput: S.optional(__S(34, __c1, 2)),
        }),
      ).annotate({ identifier: "ReportGenerationResult" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          associatedSystems: S.optional(__S(193, __c6, 1)),
          policyArn: S.optional(S.String),
          regions: __S(3008, __c94, 0),
          permissionModel: __S(98, __c3, 2),
          dependencyDiscovery: S.optional(S.String),
          reportConfiguration: S.optional(__S(224, __c7, 0)),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(3104, __c97, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/create-service" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateServiceRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ crossAccountRoleArn: S.String, externalId: S.optional(S.String) }),
      ).annotate({ identifier: "CrossAccountRole" });
    case 1:
      return S.Array(__S(96, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ invokerRoleName: S.String, crossAccountRoles: S.optional(__S(97, __c3, 1)) }),
      ).annotate({ identifier: "PermissionModel" });
    case 3:
      return S.suspend(() => S.Struct({ bucketPath: S.String, bucketOwner: S.String })).annotate({
        identifier: "S3ReportOutputConfiguration",
      });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ s3: __S(99, __c3, 3) })]);
    case 5:
      return S.Array(__S(100, __c3, 4));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          availabilitySlo: S.optional(S.String),
          multiAzRtoRpo: S.optional(S.String),
          multiRegionRtoRpo: S.optional(S.String),
          dataRecoveryTimeBetweenBackups: S.optional(S.String),
        }),
      ).annotate({ identifier: "Achievability" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ amount: S.optional(S.Number), currency: S.optional(S.String) }),
      ).annotate({ identifier: "AssessmentCost" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          systemArn: S.String,
          systemName: S.optional(S.String),
          userJourneyIds: S.optional(__S(3008, __c94, 0)),
        }),
      ).annotate({ identifier: "AssociatedSystem" });
    case 1:
      return S.Array(__S(192, __c6, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          eligibleResourceCount: S.optional(S.Number),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "DependencyDiscoveryConfig" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ reportOutputs: __S(101, __c3, 5) })).annotate({
        identifier: "ServiceReportConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          value: S.optional(S.Number),
          policyName: S.optional(S.String),
          source: S.optional(S.String),
        }),
      ).annotate({ identifier: "SloSource" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          value: S.optional(S.String),
          policyName: S.optional(S.String),
          source: S.optional(S.String),
        }),
      ).annotate({ identifier: "DisasterRecoverySource" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          availabilitySlo: S.optional(__S(225, __c7, 1)),
          multiAzRto: S.optional(__S(225, __c7, 1)),
          multiAzRpo: S.optional(__S(225, __c7, 1)),
          multiAzDrApproach: S.optional(__S(226, __c7, 2)),
          multiRegionRto: S.optional(__S(225, __c7, 1)),
          multiRegionRpo: S.optional(__S(225, __c7, 1)),
          multiRegionDrApproach: S.optional(__S(226, __c7, 2)),
          dataRecoveryTimeBetweenBackups: S.optional(__S(225, __c7, 1)),
        }),
      ).annotate({ identifier: "EffectivePolicyValues" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          lastRunAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ResourceDiscoveryStatus" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          associatedSystems: S.optional(__S(193, __c6, 1)),
          policyArn: S.optional(S.String),
          regions: S.optional(__S(3008, __c94, 0)),
          permissionModel: S.optional(__S(98, __c3, 2)),
          dependencyDiscovery: S.optional(__S(194, __c6, 2)),
          effectivePolicyValues: S.optional(__S(227, __c7, 3)),
          achievability: S.optional(__S(128, __c4, 0)),
          reportConfiguration: S.optional(__S(224, __c7, 0)),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(3104, __c97, 0)),
          estimatedAssessmentCost: S.optional(__S(160, __c5, 0)),
          resourceDiscovery: S.optional(__S(228, __c7, 4)),
          assessmentStatus: S.optional(S.String),
          rerunAssessment: S.optional(S.Boolean),
          openFindingsCount: S.optional(S.Number),
          resolvedFindingsCount: S.optional(S.Number),
          organizationId: S.optional(S.String),
          ouId: S.optional(S.String),
          accountId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Service" });
    case 6:
      return S.suspend(() => S.Struct({ service: __S(229, __c7, 5) })).annotate({
        identifier: "CreateServiceResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          serviceArn: S.String,
          description: S.optional(S.String),
          criticality: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/create-service-function" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateServiceFunctionRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          serviceFunctionId: S.String,
          name: S.String,
          description: S.optional(S.String),
          criticality: S.String,
          resourceCount: S.optional(S.Number),
          source: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ServiceFunction" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ serviceFunction: __S(288, __c9, 0) })).annotate({
        identifier: "CreateServiceFunctionResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          serviceFunctionId: S.String,
          resources: __S(3008, __c94, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/create-service-function-resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateServiceFunctionResourcesRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.optional(S.String),
          serviceFunctionId: S.optional(S.String),
          resources: S.optional(__S(3008, __c94, 0)),
        }),
      ).annotate({ identifier: "CreateServiceFunctionResourcesResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          sharingEnabled: S.optional(S.Boolean),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(3104, __c97, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/create-system" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateSystemRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          systemArn: S.String,
          systemId: S.String,
          name: S.String,
          description: S.optional(S.String),
          sharingEnabled: S.optional(S.Boolean),
          tags: S.optional(__S(3104, __c97, 0)),
          kmsKeyId: S.optional(S.String),
          organizationId: S.optional(S.String),
          ouId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "System" });
    case 1:
      return S.suspend(() => S.Struct({ system: __S(448, __c14, 0) })).annotate({
        identifier: "CreateSystemResponse",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          testTemplateArn: S.String,
          loggingConfiguration: S.optional(__S(512, __c16, 0)),
          stopConditions: S.optional(__S(514, __c16, 2)),
          roleName: S.optional(S.String),
          parameters: S.optional(__S(515, __c16, 3)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/create-test" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateTestRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          s3BucketName: S.optional(S.String),
          cloudWatchLogGroupArn: S.optional(S.String),
          logSchemaVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "LoggingConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ source: S.String, value: S.String })).annotate({
        identifier: "StopCondition",
      });
    case 2:
      return S.Array(__S(513, __c16, 1));
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(3008, __c94, 0).pipe(S.optional));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ actionId: S.String, description: S.optional(S.String), resourceType: S.String }),
      ).annotate({ identifier: "TestAction" });
    case 1:
      return S.Array(__S(544, __c17, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          testId: S.String,
          testTemplateArn: S.String,
          serviceArn: S.String,
          name: S.String,
          actions: S.optional(__S(545, __c17, 1)),
          loggingConfiguration: S.optional(__S(512, __c16, 0)),
          stopConditions: S.optional(__S(514, __c16, 2)),
          roleName: S.optional(S.String),
          parameters: S.optional(__S(515, __c16, 3)),
          totalTestRuns: S.Number,
          successfulTestRuns: S.Number,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "Test" });
    case 1:
      return S.suspend(() => S.Struct({ test: __S(576, __c18, 0) })).annotate({
        identifier: "CreateTestResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          systemArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          policyArn: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/create-user-journey" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateUserJourneyRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userJourneyId: S.String,
          name: S.String,
          description: S.optional(S.String),
          policyArn: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UserJourney" });
    case 1:
      return S.suspend(() => S.Struct({ userJourney: __S(640, __c20, 0) })).annotate({
        identifier: "CreateUserJourneyResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceArn: S.String, assertionId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/delete-assertion" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAssertionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ assertionId: S.optional(S.String) })).annotate({
        identifier: "DeleteAssertionResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceArn: S.String, inputSourceId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/delete-input-source" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInputSourceRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/delete-policy" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeletePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ policyArn: S.String })).annotate({
        identifier: "DeletePolicyResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/delete-service" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteServiceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ serviceArn: S.String })).annotate({
        identifier: "DeleteServiceResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceArn: S.String, serviceFunctionId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/delete-function" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteServiceFunctionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ serviceFunctionId: S.optional(S.String) })).annotate({
        identifier: "DeleteServiceFunctionResponse",
      });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          serviceFunctionId: S.String,
          resources: __S(3008, __c94, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/delete-service-function-resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteServiceFunctionResourcesRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ systemArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/delete-system" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSystemRequest" });
    case 1:
      return S.suspend(() => S.Struct({ systemArn: S.String })).annotate({
        identifier: "DeleteSystemResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ testId: S.String, serviceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/delete-test" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTestRequest" });
    case 1:
      return S.suspend(() => S.Struct({ testId: S.String })).annotate({
        identifier: "DeleteTestResponse",
      });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ testId: S.String, serviceArn: S.String, testSources: __S(994, __c31, 2) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/delete-test-sources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteTestSourcesRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteTestSourcesResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ alarmArn: S.String })).annotate({
        identifier: "SuccessCriteriaAlarmInput",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ successCriteriaAlarm: __S(992, __c31, 0) }),
        /*@__PURE__*/ S.Struct({ observabilityAlarm: __S(992, __c31, 0) }),
      ]);
    case 2:
      return S.Array(__S(993, __c31, 1));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ systemArn: S.String, userJourneyId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/delete-user-journey" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteUserJourneyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ userJourneyId: S.String })).annotate({
        identifier: "DeleteUserJourneyResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceArn: S.String.pipe(T.HttpQuery("serviceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/get-dependency-insights" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDependencyInsightsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ category: S.String, description: S.String })).annotate({
        identifier: "DependencyInsight",
      });
    case 2:
      return S.Array(__S(1057, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          overview: S.optional(S.String),
          insights: S.optional(__S(1058, __c33, 2)),
          status: S.String,
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetDependencyInsightsResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          findingId: S.String.pipe(T.HttpQuery("findingId")),
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/get-failure-mode-finding" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFailureModeFindingRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ suggestedChanges: S.optional(__S(3008, __c94, 0)) }),
      ).annotate({ identifier: "InfrastructureAndCodeRecommendation" });
    case 1:
      return S.Array(__S(1120, __c35, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          findingId: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          failureCategory: S.optional(S.String),
          status: S.optional(S.String),
          reasoning: S.optional(S.String),
          comment: S.optional(S.String),
          severity: S.optional(S.String),
          serviceFunctions: S.optional(__S(3008, __c94, 0)),
          policyComponent: S.optional(S.String),
          infrastructureAndCodeRecommendations: S.optional(__S(1121, __c35, 1)),
          observabilityRecommendations: S.optional(__S(1121, __c35, 1)),
          testingRecommendations: S.optional(__S(1121, __c35, 1)),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Finding" });
    case 3:
      return S.suspend(() => S.Struct({ finding: S.optional(__S(1122, __c35, 2)) })).annotate({
        identifier: "GetFailureModeFindingResponse",
      });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyArn: S.String.pipe(T.HttpQuery("policyArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/get-policy" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPolicyRequest" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceArn: S.String.pipe(T.HttpQuery("serviceArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/get-service" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetServiceRequest" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ systemArn: S.String.pipe(T.HttpQuery("systemArn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/get-system" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSystemRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          testId: S.String.pipe(T.HttpQuery("testId")),
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/get-test" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTestRequest" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          testRunId: S.String.pipe(T.HttpQuery("testRunId")),
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/get-test-run" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetTestRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ experimentArn: S.String, details: S.optional(S.String) }),
      ).annotate({ identifier: "ExperimentDetails" });
    case 2:
      return S.Array(__S(1281, __c40, 1));
    case 3:
      return S.suspend(() => S.Struct({ reportOutput: __S(101, __c3, 5) })).annotate({
        identifier: "TestRunReportConfiguration",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.optional(S.String),
          name: S.optional(S.String),
          availabilitySlo: S.optional(__S(3168, __c99, 0)),
          multiAz: S.optional(__S(3169, __c99, 1)),
          multiRegion: S.optional(__S(3169, __c99, 1)),
          dataRecovery: S.optional(__S(3170, __c99, 2)),
        }),
      ).annotate({ identifier: "TestRunPolicySnapshot" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          testRunId: S.String,
          testId: S.String,
          status: S.String,
          serviceArn: S.optional(S.String),
          startedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          experiments: S.optional(__S(1282, __c40, 2)),
          eventCount: S.optional(S.Number),
          parameters: S.optional(__S(515, __c16, 3)),
          errorMessage: S.optional(S.String),
          stopConditions: S.optional(__S(514, __c16, 2)),
          loggingConfiguration: S.optional(__S(512, __c16, 0)),
          roleName: S.optional(S.String),
          testTemplateArn: S.String,
          reportConfiguration: S.optional(__S(1283, __c40, 3)),
          policy: S.optional(__S(1284, __c40, 4)),
          reportOutput: S.optional(__S(35, __c1, 3)),
          regionSwitchPlanArn: S.optional(S.String),
          regionSwitchExecutionId: S.optional(S.String),
          permissionModel: S.optional(__S(98, __c3, 2)),
          regions: S.optional(__S(3008, __c94, 0)),
          accountTargeting: S.optional(S.String),
        }),
      ).annotate({ identifier: "TestRun" });
    case 6:
      return S.suspend(() => S.Struct({ testRun: __S(1285, __c40, 5) })).annotate({
        identifier: "GetTestRunResponse",
      });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ testTemplateArn: S.String.pipe(T.HttpQuery("testTemplateArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/get-test-template" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTestTemplateRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          type: S.String,
          required: S.Boolean,
          defaultValue: S.optional(S.String),
          maxValues: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TestTemplateParameter" });
    case 2:
      return S.Array(__S(1313, __c41, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          testTemplateArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          parameters: S.optional(__S(1314, __c41, 2)),
          actions: S.optional(__S(545, __c17, 1)),
        }),
      ).annotate({ identifier: "TestTemplate" });
    case 4:
      return S.suspend(() => S.Struct({ testTemplate: __S(1315, __c41, 3) })).annotate({
        identifier: "GetTestTemplateResponse",
      });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          systemArn: S.String.pipe(T.HttpQuery("systemArn")),
          userJourneyId: S.String.pipe(T.HttpQuery("userJourneyId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/get-user-journey" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUserJourneyRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          v1AppArn: S.String,
          policyArn: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          skipManuallyAddedResources: S.optional(S.Boolean),
          associatedSystems: S.optional(__S(193, __c6, 1)),
          tags: S.optional(__S(3104, __c97, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/import-app" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ImportAppRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          v1PolicyArn: S.String,
          kmsKeyId: S.optional(S.String),
          availabilitySlo: S.optional(__S(3168, __c99, 0)),
          multiAzDisasterRecoveryApproach: S.optional(S.String),
          multiRegionDisasterRecoveryApproach: S.optional(S.String),
          tags: S.optional(__S(3104, __c97, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/import-policy" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ImportPolicyRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          source: S.optional(S.String).pipe(T.HttpQuery("source")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/list-assertions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssertionsRequest" });
    case 1:
      return S.Array(__S(2592, __c81, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ assertions: __S(1441, __c45, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssertionsResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.optional(S.String).pipe(T.HttpQuery("serviceArn")),
          queryRangeStartTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("queryRangeStartTime"),
          ),
          queryRangeEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("queryRangeEndTime"),
          ),
          queryRangeGranularity: S.optional(S.String).pipe(T.HttpQuery("queryRangeGranularity")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/list-dependencies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDependenciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          queryCount: S.Number,
        }),
      ).annotate({ identifier: "QueryDataPoint" });
    case 2:
      return S.Array(__S(1473, __c46, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          granularity: S.String,
          dataPoints: __S(1474, __c46, 2),
        }),
      ).annotate({ identifier: "QueryRange" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          dependencyId: S.String,
          serviceArn: S.String,
          dependencyName: S.String,
          dnsName: S.String,
          location: S.String,
          lastDetectedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          sourceRegions: __S(3008, __c94, 0),
          provider: S.optional(S.String),
          queryRange: __S(1475, __c46, 3),
          criticality: S.String,
          comment: S.optional(S.String),
        }),
      ).annotate({ identifier: "DependencySummary" });
    case 5:
      return S.Array(__S(1476, __c46, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ dependencySummaries: __S(1477, __c46, 5), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDependenciesResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          assessmentStatuses: S.optional(__S(1536, __c48, 0)).pipe(
            T.HttpQuery("assessmentStatuses"),
          ),
          startedAfter: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("startedAfter"),
          ),
          endedBefore: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("endedBefore"),
          ),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/list-failure-mode-assessments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFailureModeAssessmentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          assessmentId: S.String,
          serviceArn: S.String,
          assessmentStatus: S.optional(S.String),
          assessmentStep: S.optional(S.String),
          totalFindings: S.optional(S.Number),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          errorMessage: S.optional(S.String),
          errorCode: S.optional(S.String),
          assessmentCost: S.optional(__S(160, __c5, 0)),
          billableAssessmentUnitCount: S.optional(S.Number),
          achievability: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "AssessmentSummary" });
    case 2:
      return S.Array(__S(1505, __c47, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ assessmentSummaries: __S(1506, __c47, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFailureModeAssessmentsResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          severity: S.optional(S.String).pipe(T.HttpQuery("severity")),
          failureCategory: S.optional(S.String).pipe(T.HttpQuery("failureCategory")),
          status: S.optional(S.String).pipe(T.HttpQuery("status")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/list-failure-mode-findings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFailureModeFindingsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.optional(S.String),
          findingId: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          failureCategory: S.optional(S.String),
          severity: S.optional(S.String),
          status: S.optional(S.String),
          policyComponent: S.optional(S.String),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "FindingSummary" });
    case 2:
      return S.Array(__S(1569, __c49, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ findingsSummary: __S(1570, __c49, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFailureModeFindingsResponse" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/list-input-sources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListInputSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          inputSourceId: S.String,
          type: S.optional(S.String),
          resourceTags: S.optional(__S(3073, __c96, 1)),
          cfnStackArn: S.optional(S.String),
          tfStateFileUrl: S.optional(S.String),
          eks: S.optional(__S(3077, __c96, 5)),
          designFileS3Url: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "InputSourceSummary" });
    case 2:
      return S.Array(__S(1601, __c50, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ inputSourceSummaries: __S(1602, __c50, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListInputSourcesResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          accountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/list-policies" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String,
          name: S.String,
          availabilitySlo: S.optional(__S(3168, __c99, 0)),
          multiAz: S.optional(__S(3169, __c99, 1)),
          multiRegion: S.optional(__S(3169, __c99, 1)),
          dataRecovery: S.optional(__S(3170, __c99, 2)),
          sharingEnabled: S.optional(S.Boolean),
          organizationId: S.optional(S.String),
          associatedServiceCount: S.optional(S.Number),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "PolicySummary" });
    case 2:
      return S.Array(__S(1633, __c51, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ policySummaries: __S(1634, __c51, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPoliciesResponse" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpQuery("policyArn")),
          eventTypes: S.optional(__S(1536, __c48, 0)).pipe(T.HttpQuery("eventTypes")),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("startTime"),
          ),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("endTime"),
          ),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/list-policy-events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPolicyEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ serviceArn: S.optional(S.String), accountId: S.optional(S.String) }),
      ).annotate({ identifier: "PolicyAttachedToServiceMetadata" });
    case 2:
      return S.suspend(() => S.Struct({ affectedServiceCount: S.optional(S.Number) })).annotate({
        identifier: "PolicySharingRevokedMetadata",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ policyAttachedToService: __S(1665, __c52, 1) }),
        /*@__PURE__*/ S.Struct({ policyDetachedFromService: __S(1665, __c52, 1) }),
        /*@__PURE__*/ S.Struct({ policySharingRevoked: __S(1666, __c52, 2) }),
        /*@__PURE__*/ S.Struct({ policyDeleted: __S(1666, __c52, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          description: S.String,
          eventMetadata: S.optional(__S(1667, __c52, 3)),
        }),
      ).annotate({ identifier: "PolicyEventDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          eventType: S.String,
          policyArn: S.String,
          actor: __S(1696, __c53, 0),
          eventDetails: __S(1668, __c52, 4),
        }),
      ).annotate({ identifier: "PolicyEvent" });
    case 6:
      return S.Array(__S(1669, __c52, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ events: __S(1670, __c52, 6), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPolicyEventsResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          principalId: S.String,
          accountId: S.optional(S.String),
          userName: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventActor" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.optional(S.String).pipe(T.HttpQuery("serviceArn")),
          reportType: S.optional(S.String).pipe(T.HttpQuery("reportType")),
          testRunId: S.optional(S.String).pipe(T.HttpQuery("testRunId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/list-reports" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListReportsRequest" });
    case 1:
      return S.Array(__S(35, __c1, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({ reportGenerationResults: __S(1729, __c54, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListReportsResponse" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          testRunId: S.String.pipe(T.HttpLabel("testRunId")),
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/test-runs/{testRunId}/resolved-target-resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListResolvedTestRunTargetResourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceType: S.String,
          targetName: S.String,
          targetInformation: __S(3104, __c97, 0),
        }),
      ).annotate({ identifier: "ResolvedTargetResource" });
    case 2:
      return S.Array(__S(1761, __c55, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ resolvedTargetResources: __S(1762, __c55, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListResolvedTestRunTargetResourcesResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          serviceFunctionId: S.optional(S.String).pipe(T.HttpQuery("serviceFunctionId")),
          awsRegion: S.optional(S.String).pipe(T.HttpQuery("awsRegion")),
          resourceTypes: S.optional(__S(3008, __c94, 0)).pipe(T.HttpQuery("resourceTypes")),
          billable: S.optional(S.Boolean).pipe(T.HttpQuery("billable")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/list-resources" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListResourcesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ identifier: S.String, type: S.String })).annotate({
        identifier: "InputSource",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          identifier: S.String,
          awsRegion: S.optional(S.String),
          awsAccountId: S.optional(S.String),
          resourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "Resource" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          resourceIdentifier: S.String,
          inputSource: S.optional(__S(1793, __c56, 1)),
          resource: __S(1794, __c56, 2),
        }),
      ).annotate({ identifier: "ServiceResource" });
    case 4:
      return S.Array(__S(1795, __c56, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          serviceFunctionId: S.optional(S.String),
          serviceResources: S.optional(__S(1796, __c56, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListResourcesResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          eventTypes: S.optional(__S(1536, __c48, 0)).pipe(T.HttpQuery("eventTypes")),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("startTime"),
          ),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("endTime"),
          ),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/list-service-events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListServiceEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ systemName: S.optional(S.String), systemArn: S.optional(S.String) }),
      ).annotate({ identifier: "ServiceSystemAssociatedMetadata" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          systemId: S.optional(S.String),
          systemName: S.optional(S.String),
          systemArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceSystemDisassociatedMetadata" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          resourceCount: S.optional(S.Number),
          resourceTypes: S.optional(__S(3008, __c94, 0)),
        }),
      ).annotate({ identifier: "ServiceResourcesAssociatedMetadata" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          serviceFunctionId: S.optional(S.String),
          serviceFunctionName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceWorkflowUpdatedMetadata" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          policyName: S.optional(S.String),
          policyArn: S.optional(S.String),
          policyOwnerAccountId: S.optional(S.String),
          policySource: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServicePolicyAssociatedMetadata" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          policyName: S.optional(S.String),
          policyArn: S.optional(S.String),
          policyOwnerAccountId: S.optional(S.String),
          policySource: S.optional(S.String),
          reason: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServicePolicyDisassociatedMetadata" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          serviceFunctionId: S.optional(S.String),
          serviceFunctionName: S.optional(S.String),
          resourcesAdded: S.optional(__S(3008, __c94, 0)),
          resourcesRemoved: S.optional(__S(3008, __c94, 0)),
        }),
      ).annotate({ identifier: "ServiceFunctionUpdatedMetadata" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          serviceFunctionId: S.optional(S.String),
          serviceFunctionName: S.optional(S.String),
          resourcesAdded: S.optional(__S(3008, __c94, 0)),
        }),
      ).annotate({ identifier: "ServiceFunctionResourcesAddedMetadata" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          serviceFunctionId: S.optional(S.String),
          serviceFunctionName: S.optional(S.String),
          resourcesRemoved: S.optional(__S(3008, __c94, 0)),
        }),
      ).annotate({ identifier: "ServiceFunctionResourcesRemovedMetadata" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          assessmentId: S.optional(S.String),
          availabilitySlo: S.optional(S.String),
          multiAzRtoRpo: S.optional(S.String),
          multiRegionRtoRpo: S.optional(S.String),
        }),
      ).annotate({ identifier: "ServiceAchievabilityUpdatedMetadata" });
    case 11:
      return S.suspend(() =>
        S.Struct({ assertionId: S.optional(S.String), assertionName: S.optional(S.String) }),
      ).annotate({ identifier: "AssertionCreatedMetadata" });
    case 12:
      return S.Union([
        /*@__PURE__*/ S.Struct({ serviceCreated: __S(960, __c30, 0) }),
        /*@__PURE__*/ S.Struct({ serviceDeleted: __S(960, __c30, 0) }),
        /*@__PURE__*/ S.Struct({ serviceSystemAssociated: __S(1825, __c57, 1) }),
        /*@__PURE__*/ S.Struct({ serviceSystemDisassociated: __S(1826, __c57, 2) }),
        /*@__PURE__*/ S.Struct({ serviceResourcesAssociated: __S(1827, __c57, 3) }),
        /*@__PURE__*/ S.Struct({ serviceResourcesDisassociated: __S(1827, __c57, 3) }),
        /*@__PURE__*/ S.Struct({ serviceWorkflowUpdated: __S(1828, __c57, 4) }),
        /*@__PURE__*/ S.Struct({ serviceInputSourcesUpdated: __S(960, __c30, 0) }),
        /*@__PURE__*/ S.Struct({ servicePolicyAssociated: __S(1829, __c57, 5) }),
        /*@__PURE__*/ S.Struct({ servicePolicyDisassociated: __S(1830, __c57, 6) }),
        /*@__PURE__*/ S.Struct({ serviceFunctionCreated: __S(1828, __c57, 4) }),
        /*@__PURE__*/ S.Struct({ serviceFunctionUpdated: __S(1831, __c57, 7) }),
        /*@__PURE__*/ S.Struct({ serviceFunctionDeleted: __S(1828, __c57, 4) }),
        /*@__PURE__*/ S.Struct({ serviceFunctionResourcesAdded: __S(1832, __c57, 8) }),
        /*@__PURE__*/ S.Struct({ serviceFunctionResourcesRemoved: __S(1833, __c57, 9) }),
        /*@__PURE__*/ S.Struct({ serviceAchievabilityUpdated: __S(1834, __c57, 10) }),
        /*@__PURE__*/ S.Struct({ assertionCreated: __S(1835, __c57, 11) }),
        /*@__PURE__*/ S.Struct({ assertionUpdated: __S(1835, __c57, 11) }),
        /*@__PURE__*/ S.Struct({ assertionDeleted: __S(1835, __c57, 11) }),
      ]);
    case 13:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          description: S.String,
          eventMetadata: S.optional(__S(1836, __c57, 12)),
        }),
      ).annotate({ identifier: "ServiceEventDetails" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          eventType: S.String,
          serviceArn: S.String,
          actor: __S(1696, __c53, 0),
          eventDetails: __S(1837, __c57, 13),
        }),
      ).annotate({ identifier: "ServiceEvent" });
    case 15:
      return S.Array(__S(1838, __c57, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({ events: __S(1839, __c57, 15), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListServiceEventsResponse" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/list-functions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListServiceFunctionsRequest" });
    case 1:
      return S.Array(__S(288, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ serviceFunctions: __S(1857, __c58, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListServiceFunctionsResponse" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          systemArn: S.optional(S.String).pipe(T.HttpQuery("systemArn")),
          userJourneyId: S.optional(S.String).pipe(T.HttpQuery("userJourneyId")),
          ouId: S.optional(S.String).pipe(T.HttpQuery("ouId")),
          accountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
          assessmentStatus: S.optional(S.String).pipe(T.HttpQuery("assessmentStatus")),
          policyArn: S.optional(S.String).pipe(T.HttpQuery("policyArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/list-services" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListServicesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          name: S.String,
          associatedSystems: S.optional(__S(193, __c6, 1)),
          regions: S.optional(__S(3008, __c94, 0)),
          policyArn: S.optional(S.String),
          assessmentStatus: S.optional(S.String),
          openFindingsCount: S.optional(S.Number),
          resolvedFindingsCount: S.optional(S.Number),
          dependencyDiscovery: S.optional(__S(194, __c6, 2)),
          achievability: S.optional(__S(128, __c4, 0)),
          organizationId: S.optional(S.String),
          ouId: S.optional(S.String),
          accountId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "ServiceSummary" });
    case 2:
      return S.Array(__S(1889, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ serviceSummaries: __S(1890, __c59, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListServicesResponse" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/list-service-topology-edges" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListServiceTopologyEdgesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ topologyType: S.optional(S.String), label: S.optional(S.String) }),
      ).annotate({ identifier: "EdgePropertySummary" });
    case 2:
      return S.Array(__S(1921, __c60, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          sourceResourceIdentifier: S.String,
          destinationResourceIdentifier: S.String,
          sourceRegion: S.optional(S.String),
          destinationRegion: S.optional(S.String),
          sourceAccount: S.optional(S.String),
          destinationAccount: S.optional(S.String),
          properties: S.optional(__S(1922, __c60, 2)),
        }),
      ).annotate({ identifier: "ServiceTopologyEdgeSummary" });
    case 4:
      return S.Array(__S(1923, __c60, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          serviceTopologyEdgeSummaries: S.optional(__S(1924, __c60, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListServiceTopologyEdgesResponse" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          systemArn: S.String.pipe(T.HttpQuery("systemArn")),
          eventTypes: S.optional(__S(1536, __c48, 0)).pipe(T.HttpQuery("eventTypes")),
          startTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("startTime"),
          ),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("endTime"),
          ),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/list-system-events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSystemEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ serviceId: S.optional(S.String), serviceName: S.optional(S.String) }),
      ).annotate({ identifier: "ServiceReference" });
    case 2:
      return S.Array(__S(1953, __c61, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          userJourneyName: S.optional(S.String),
          associatedServices: S.optional(__S(1954, __c61, 2)),
        }),
      ).annotate({ identifier: "SystemUserJourneyCreatedMetadata" });
    case 4:
      return S.suspend(() =>
        S.Struct({ oldValue: S.optional(S.String), newValue: S.optional(S.String) }),
      ).annotate({ identifier: "StringChange" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          added: S.optional(__S(1954, __c61, 2)),
          removed: S.optional(__S(1954, __c61, 2)),
        }),
      ).annotate({ identifier: "ServiceReferenceChanges" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          journeyDescription: S.optional(__S(1956, __c61, 4)),
          associatedServices: S.optional(__S(1957, __c61, 5)),
        }),
      ).annotate({ identifier: "UserJourneyChanges" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          userJourneyName: S.optional(S.String),
          changes: S.optional(__S(1958, __c61, 6)),
        }),
      ).annotate({ identifier: "SystemUserJourneyUpdatedMetadata" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          userJourneyName: S.optional(S.String),
          associatedServicesAtDeletion: S.optional(__S(1954, __c61, 2)),
        }),
      ).annotate({ identifier: "SystemUserJourneyDeletedMetadata" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.optional(S.String),
          serviceArn: S.optional(S.String),
          userJourneys: S.optional(__S(3008, __c94, 0)),
        }),
      ).annotate({ identifier: "SystemServiceAssociatedMetadata" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          serviceName: S.optional(S.String),
          serviceArn: S.optional(S.String),
          userJourneysAffected: S.optional(__S(3008, __c94, 0)),
          comment: S.optional(S.String),
        }),
      ).annotate({ identifier: "SystemServiceDisassociatedMetadata" });
    case 11:
      return S.suspend(() =>
        S.Struct({ policyName: S.optional(S.String), policyArn: S.optional(S.String) }),
      ).annotate({ identifier: "SystemPolicyAssociatedMetadata" });
    case 12:
      return S.Union([
        /*@__PURE__*/ S.Struct({ systemCreated: __S(960, __c30, 0) }),
        /*@__PURE__*/ S.Struct({ systemDeleted: __S(960, __c30, 0) }),
        /*@__PURE__*/ S.Struct({ systemUserJourneyCreated: __S(1955, __c61, 3) }),
        /*@__PURE__*/ S.Struct({ systemUserJourneyUpdated: __S(1959, __c61, 7) }),
        /*@__PURE__*/ S.Struct({ systemUserJourneyDeleted: __S(1960, __c61, 8) }),
        /*@__PURE__*/ S.Struct({ systemServiceAssociated: __S(1961, __c61, 9) }),
        /*@__PURE__*/ S.Struct({ systemServiceDisassociated: __S(1962, __c61, 10) }),
        /*@__PURE__*/ S.Struct({ systemPolicyAssociated: __S(1963, __c61, 11) }),
        /*@__PURE__*/ S.Struct({ systemPolicyDisassociated: __S(1963, __c61, 11) }),
      ]);
    case 13:
      return S.suspend(() =>
        S.Struct({
          title: S.String,
          description: S.String,
          eventMetadata: S.optional(__S(1964, __c61, 12)),
        }),
      ).annotate({ identifier: "SystemEventDetails" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          eventType: S.String,
          systemArn: S.String,
          actor: __S(1696, __c53, 0),
          eventDetails: __S(1965, __c61, 13),
        }),
      ).annotate({ identifier: "SystemEvent" });
    case 15:
      return S.Array(__S(1966, __c61, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({ events: __S(1967, __c61, 15), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSystemEventsResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ouId: S.optional(S.String).pipe(T.HttpQuery("ouId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/list-systems" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSystemsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          systemId: S.String,
          name: S.String,
          systemArn: S.optional(S.String),
          userJourneysCount: S.optional(S.Number),
          servicesCount: S.optional(S.Number),
          organizationId: S.optional(S.String),
          ouId: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SystemSummary" });
    case 2:
      return S.Array(__S(1985, __c62, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ systemSummaries: __S(1986, __c62, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSystemsResponse" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(3104, __c97, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          testRunId: S.String.pipe(T.HttpLabel("testRunId")),
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/test-runs/{testRunId}/dependencies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTestRunDependenciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dependencyId: S.optional(S.String),
          dependencyName: S.String,
          dnsName: S.String,
          criticality: S.String,
          source: S.String,
          location: S.optional(S.String),
          sourceRegions: S.optional(__S(3008, __c94, 0)),
          provider: S.optional(S.String),
        }),
      ).annotate({ identifier: "TestRunDependencySummary" });
    case 2:
      return S.Array(__S(2049, __c64, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ dependencies: __S(2050, __c64, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTestRunDependenciesResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          testRunId: S.String.pipe(T.HttpLabel("testRunId")),
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("startedAt"),
          ),
          endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))).pipe(
            T.HttpQuery("endedAt"),
          ),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/test-runs/{testRunId}/events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTestRunEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          eventType: S.String,
          message: S.String,
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          attributes: S.optional(__S(3104, __c97, 0)),
        }),
      ).annotate({ identifier: "TestRunEvent" });
    case 2:
      return S.Array(__S(2081, __c65, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ events: __S(2082, __c65, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTestRunEventsResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          testId: S.optional(S.String).pipe(T.HttpQuery("testId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/list-test-runs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTestRunsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          testRunId: S.String,
          status: S.String,
          startedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          testTemplateArn: S.String,
          serviceArn: S.optional(S.String),
          errorMessage: S.optional(S.String),
          accountTargeting: S.optional(S.String),
        }),
      ).annotate({ identifier: "TestRunSummary" });
    case 2:
      return S.Array(__S(2113, __c66, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ testRuns: __S(2114, __c66, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTestRunsResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          testRunId: S.String.pipe(T.HttpLabel("testRunId")),
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          sourceArn: S.String.pipe(T.HttpQuery("sourceArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/test-runs/{testRunId}/source-events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTestRunSourceEventsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          state: S.String,
          previousState: S.optional(S.String),
          reason: S.optional(S.String),
        }),
      ).annotate({ identifier: "AlarmStateChangeDetail" });
    case 2:
      return S.suspend(() => S.Struct({ errorCode: S.String, errorMessage: S.String })).annotate({
        identifier: "TestRunSourceEventError",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ alarmStateChange: __S(2145, __c67, 1) }),
        /*@__PURE__*/ S.Struct({ error: __S(2146, __c67, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          sourceArn: S.String,
          eventType: S.String,
          detail: __S(2147, __c67, 3),
        }),
      ).annotate({ identifier: "TestRunSourceEvent" });
    case 5:
      return S.Array(__S(2148, __c67, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ testRunSourceEvents: __S(2149, __c67, 5), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTestRunSourceEventsResponse" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          testRunId: S.String.pipe(T.HttpLabel("testRunId")),
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/test-runs/{testRunId}/sources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTestRunSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          alarmArn: S.String,
          alarmName: S.String,
          region: S.String,
          accountId: S.String,
          outcome: S.optional(S.String),
          outcomeReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "TestRunSuccessCriteriaAlarmSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          alarmArn: S.String,
          alarmName: S.String,
          region: S.String,
          accountId: S.String,
        }),
      ).annotate({ identifier: "TestRunObservabilityAlarmSummary" });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ successCriteriaAlarm: __S(2177, __c68, 1) }),
        /*@__PURE__*/ S.Struct({ observabilityAlarm: __S(2178, __c68, 2) }),
      ]);
    case 4:
      return S.Array(__S(2179, __c68, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ testRunSources: __S(2180, __c68, 4), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTestRunSourcesResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(2208, __c69, 0));
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v2/list-tests" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTestsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          testId: S.String,
          testTemplateArn: S.String,
          serviceArn: S.String,
          totalTestRuns: S.Number,
          successfulTestRuns: S.Number,
          creationTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "TestSummary" });
    case 2:
      return S.Array(__S(2241, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ tests: __S(2242, __c70, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTestsResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          testId: S.String.pipe(T.HttpLabel("testId")),
          serviceArn: S.String.pipe(T.HttpQuery("serviceArn")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/tests/{testId}/sources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTestSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          alarmArn: S.String,
          alarmName: S.String,
          region: S.String,
          accountId: S.String,
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "SuccessCriteriaAlarmSummary" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ successCriteriaAlarm: __S(2273, __c71, 1) }),
        /*@__PURE__*/ S.Struct({ observabilityAlarm: __S(2273, __c71, 1) }),
      ]);
    case 3:
      return S.Array(__S(2274, __c71, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ testSources: __S(2275, __c71, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTestSourcesResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/list-test-templates" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTestTemplatesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ testTemplateArn: S.String, name: S.String, description: S.String }),
      ).annotate({ identifier: "TestTemplateSummary" });
    case 2:
      return S.Array(__S(2305, __c72, 1));
    case 3:
      return S.suspend(() => S.Struct({ testTemplates: __S(2306, __c72, 2) })).annotate({
        identifier: "ListTestTemplatesResponse",
      });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          systemArn: S.String.pipe(T.HttpQuery("systemArn")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v2/list-user-journeys" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListUserJourneysRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          userJourneyId: S.String,
          name: S.String,
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "UserJourneySummary" });
    case 2:
      return S.Array(__S(2337, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ userJourneySummaries: __S(2338, __c73, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListUserJourneysResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ testId: S.String, serviceArn: S.String, testSources: __S(994, __c31, 2) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/put-test-sources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutTestSourcesRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/start-dependency-insights" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartDependencyInsightsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ status: S.String })).annotate({
        identifier: "StartDependencyInsightsResponse",
      });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/start-failure-mode-assessment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartFailureModeAssessmentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          assessmentId: S.optional(S.String),
          serviceArn: S.optional(S.String),
          assessmentStatus: S.optional(S.String),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "StartFailureModeAssessmentResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ testId: S.String, serviceArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/start-test-run" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartTestRunRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ testRunId: S.String, status: S.String, experimentArns: __S(3008, __c94, 0) }),
      ).annotate({ identifier: "StartTestRunResponse" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ testRunId: S.String, serviceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/stop-test-run" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StopTestRunRequest" });
    case 1:
      return S.suspend(() => S.Struct({ testRunId: S.String, status: S.String })).annotate({
        identifier: "StopTestRunResponse",
      });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(3104, __c97, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/tags/{resourceArn}" }),
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
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          text: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/create-assertion" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAssertionRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          assertionId: S.String,
          text: S.String,
          source: S.String,
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Assertion" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ assertion: __S(2592, __c81, 0) })).annotate({
        identifier: "CreateAssertionResponse",
      });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(3008, __c94, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v2/tags/{resourceArn}" }),
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
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ serviceArn: S.String, assertionId: S.String, text: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/update-assertion" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAssertionRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          dependencyId: S.String,
          criticality: S.optional(S.String),
          comment: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/update-dependency" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDependencyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dependencyId: S.String,
          dependencyName: S.String,
          location: S.String,
          criticality: S.String,
          comment: S.optional(S.String),
          provider: S.optional(S.String),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "UpdateDependencyResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          findingId: S.String,
          status: S.String,
          serviceArn: S.String,
          comment: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/update-failure-mode-finding" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFailureModeFindingRequest" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String,
          description: S.optional(S.String),
          availabilitySlo: S.optional(__S(3168, __c99, 0)),
          multiAz: S.optional(__S(3169, __c99, 1)),
          multiRegion: S.optional(__S(3169, __c99, 1)),
          dataRecovery: S.optional(__S(3170, __c99, 2)),
          sharingEnabled: S.optional(S.Boolean),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/update-policy" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdatePolicyRequest" });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          description: S.optional(S.String),
          associatedSystems: S.optional(__S(193, __c6, 1)),
          policyArn: S.optional(S.String),
          regions: S.optional(__S(3008, __c94, 0)),
          permissionModel: S.optional(__S(98, __c3, 2)),
          dependencyDiscovery: S.optional(S.String),
          reportConfiguration: S.optional(__S(224, __c7, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/update-service" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateServiceRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          serviceFunctionId: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          criticality: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/update-function" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateServiceFunctionRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          systemArn: S.String,
          description: S.optional(S.String),
          sharingEnabled: S.optional(S.Boolean),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/update-system" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateSystemRequest" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          testId: S.String,
          serviceArn: S.String,
          loggingConfiguration: S.optional(__S(512, __c16, 0)),
          stopConditions: S.optional(__S(514, __c16, 2)),
          roleName: S.optional(S.String),
          parameters: S.optional(__S(515, __c16, 3)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/update-test" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateTestRequest" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          systemArn: S.String,
          userJourneyId: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          policyArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/update-user-journey" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateUserJourneyRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ resourceTags: __S(3073, __c96, 1) }),
        /*@__PURE__*/ S.Struct({ cfnStackArn: S.String }),
        /*@__PURE__*/ S.Struct({ tfStateFileUrl: S.String }),
        /*@__PURE__*/ S.Struct({ eks: __S(3077, __c96, 5) }),
        /*@__PURE__*/ S.Struct({ designFileS3Url: S.String }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          serviceArn: S.String,
          resourceConfiguration: __S(2976, __c93, 0),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v2/create-input-source" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateInputSourceRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ serviceArn: S.String, inputSourceId: S.String })).annotate({
        identifier: "CreateInputSourceResponse",
      });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, values: __S(3008, __c94, 0) })).annotate({
        identifier: "ResourceTag",
      });
    case 1:
      return S.Array(__S(3072, __c96, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ key: S.String, operator: S.String, values: S.optional(__S(3008, __c94, 0)) }),
      ).annotate({ identifier: "EksLabelSelectorRequirement" });
    case 3:
      return S.Array(__S(3074, __c96, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          matchLabels: S.optional(__S(3104, __c97, 0)),
          matchExpressions: S.optional(__S(3075, __c96, 3)),
        }),
      ).annotate({ identifier: "EksLabelSelector" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          clusterArn: S.String,
          namespaces: __S(3008, __c94, 0),
          labelSelector: S.optional(__S(3076, __c96, 4)),
        }),
      ).annotate({ identifier: "EksSource" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          availabilitySlo: S.optional(__S(3168, __c99, 0)),
          multiAz: S.optional(__S(3169, __c99, 1)),
          multiRegion: S.optional(__S(3169, __c99, 1)),
          dataRecovery: S.optional(__S(3170, __c99, 2)),
          sharingEnabled: S.optional(S.Boolean),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(3104, __c97, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v2/create-policy" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreatePolicyRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ target: S.optional(S.Number) })).annotate({
        identifier: "AvailabilitySlo",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          rtoInMinutes: S.optional(S.Number),
          rpoInMinutes: S.optional(S.Number),
          disasterRecoveryApproach: S.optional(S.String),
        }),
      ).annotate({ identifier: "MultiAzTargets" });
    case 2:
      return S.suspend(() =>
        S.Struct({ timeBetweenBackupsInMinutes: S.optional(S.Number) }),
      ).annotate({ identifier: "DataRecoveryTargets" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          availabilitySlo: S.optional(__S(3168, __c99, 0)),
          multiAz: S.optional(__S(3169, __c99, 1)),
          multiRegion: S.optional(__S(3169, __c99, 1)),
          dataRecovery: S.optional(__S(3170, __c99, 2)),
          sharingEnabled: S.optional(S.Boolean),
          organizationId: S.optional(S.String),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(3104, __c97, 0)),
          associatedServiceCount: S.optional(S.Number),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "Policy" });
    case 1:
      return S.suspend(() => S.Struct({ policy: __S(3200, __c100, 0) })).annotate({
        identifier: "CreatePolicyResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
