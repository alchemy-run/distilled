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
  sdkId: "resiliencehubv2",
  target: "NGRHServiceCore",
  version: "2026-02-17",
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string; readonly retryAfterSeconds?: number }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason?: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
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
export interface EksSource {
  clusterArn: string;
  namespaces: string[];
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
  kmsKeyId?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export interface Policy {
  policyArn: string;
  name: string;
  description?: string;
  availabilitySlo?: AvailabilitySlo;
  multiAz?: MultiAzTargets;
  multiRegion?: MultiRegionTargets;
  dataRecovery?: DataRecoveryTargets;
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
export type ReportGenerationStatus =
  | "PENDING"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
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
export type DependencyDiscoveryStatus =
  | "ENABLED"
  | "INITIALIZING"
  | "DISABLED"
  | (string & {});
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
export type AchievabilityStatus =
  | "ACHIEVABLE"
  | "NOT_ACHIEVABLE"
  | (string & {});
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
export type OrganizationId = string;
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
export type ServiceFunctionCriticality =
  | "PRIMARY"
  | "SUPPLEMENTAL"
  | (string & {});
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
export type StopConditionSource =
  | "aws:cloudwatch:alarm"
  | "none"
  | (string & {});
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
  | {
      successCriteriaAlarm: SuccessCriteriaAlarmInput;
      observabilityAlarm?: never;
    }
  | {
      successCriteriaAlarm?: never;
      observabilityAlarm: ObservabilityAlarmInput;
    };
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
export type InfrastructureAndCodeRecommendationsList =
  InfrastructureAndCodeRecommendation[];
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
export type AccountTargeting =
  | "SINGLE_ACCOUNT"
  | "MULTI_ACCOUNT"
  | (string & {});
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
export type ParameterType =
  | "STRING"
  | "STRING_LIST"
  | "INTEGER"
  | (string & {});
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
  associatedServiceCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
export type PolicySummaryList = PolicySummary[];
export interface ListPoliciesResponse {
  policySummaries: PolicySummary[];
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
export type ActorType = "USER" | "SYSTEM" | (string & {});
export interface EventActor {
  type: ActorType;
  principalId: string;
  accountId?: string;
  userName?: string;
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
}
export interface ServicePolicyDisassociatedMetadata {
  policyName?: string;
  policyArn?: string;
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
export type TestRunSourceType =
  | "SUCCESS_CRITERIA"
  | "OBSERVABILITY"
  | (string & {});
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
  | {
      successCriteriaAlarm: TestRunSuccessCriteriaAlarmSummary;
      observabilityAlarm?: never;
    }
  | {
      successCriteriaAlarm?: never;
      observabilityAlarm: TestRunObservabilityAlarmSummary;
    };
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
export type TestSourceType =
  | "SUCCESS_CRITERIA"
  | "OBSERVABILITY"
  | (string & {});
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
  | {
      successCriteriaAlarm: SuccessCriteriaAlarmSummary;
      observabilityAlarm?: never;
    }
  | {
      successCriteriaAlarm?: never;
      observabilityAlarm: ObservabilityAlarmSummary;
    };
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
  descriptor: {
    service: svc,
    http: "POST /v2/create-assertion",
    input: { serviceArn: 0, text: 0, clientToken: D.m({ idempotency: true }) },
    output: { assertion: o_Assertion },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/create-input-source",
    input: {
      serviceArn: 0,
      resourceConfiguration: {
        resourceTags: D.list({ key: 0, values: 0 }),
        cfnStackArn: 0,
        tfStateFileUrl: 0,
        eks: { clusterArn: 0, namespaces: 0 },
        designFileS3Url: 0,
      },
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInputSource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/create-policy",
    input: {
      name: 0,
      description: 0,
      availabilitySlo: i_AvailabilitySlo,
      multiAz: i_MultiAzTargets,
      multiRegion: i_MultiRegionTargets,
      dataRecovery: i_DataRecoveryTargets,
      kmsKeyId: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { policy: o_Policy },
    body: true,
  },
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
})) as any;

export type CreateReportError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * On-demand report creation. Idempotent — duplicate requests with same clientToken return existing result.
 */
export const createReport: API.OperationMethod<
  CreateReportRequest,
  CreateReportResponse,
  CreateReportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/create-report",
    input: {
      serviceArn: 0,
      reportType: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { reportGenerationResult: o_ReportGenerationResult },
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
  operationName: "CreateReport",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/create-service",
    input: {
      name: 0,
      description: 0,
      associatedSystems: D.list(i_AssociatedSystem),
      policyArn: 0,
      regions: 0,
      permissionModel: i_PermissionModel,
      dependencyDiscovery: 0,
      reportConfiguration: i_ServiceReportConfiguration,
      kmsKeyId: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { service: o_Service },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/create-service-function",
    input: {
      name: 0,
      serviceArn: 0,
      description: 0,
      criticality: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { serviceFunction: o_ServiceFunction },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/create-service-function-resources",
    input: { serviceArn: 0, serviceFunctionId: 0, resources: 0 },
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
  operationName: "CreateServiceFunctionResources",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/create-system",
    input: {
      name: 0,
      description: 0,
      sharingEnabled: 0,
      kmsKeyId: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { system: o_System },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/create-test",
    input: {
      serviceArn: 0,
      testTemplateArn: 0,
      loggingConfiguration: i_LoggingConfiguration,
      stopConditions: D.list(i_StopCondition),
      roleName: 0,
      parameters: 0,
    },
    output: { test: o_Test },
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
  operationName: "CreateTest",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/create-user-journey",
    input: {
      systemArn: 0,
      name: 0,
      description: 0,
      policyArn: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { userJourney: o_UserJourney },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/delete-assertion",
    input: { serviceArn: 0, assertionId: 0 },
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
  operationName: "DeleteAssertion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/delete-input-source",
    input: { serviceArn: 0, inputSourceId: 0 },
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
  operationName: "DeleteInputSource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/delete-policy",
    input: { policyArn: 0 },
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
  operationName: "DeletePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/delete-service",
    input: { serviceArn: 0 },
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
  operationName: "DeleteService",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/delete-function",
    input: { serviceArn: 0, serviceFunctionId: 0 },
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
  operationName: "DeleteServiceFunction",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/delete-service-function-resources",
    input: { serviceArn: 0, serviceFunctionId: 0, resources: 0 },
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
  operationName: "DeleteServiceFunctionResources",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/delete-system",
    input: { systemArn: 0 },
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
  operationName: "DeleteSystem",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/delete-test",
    input: { testId: 0, serviceArn: 0 },
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
  operationName: "DeleteTest",
})) as any;

export type DeleteTestSourcesError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes monitoring sources from a test. The operation is transactional and idempotent — removing a source that is not attached is a no-op.
 */
export const deleteTestSources: API.OperationMethod<
  DeleteTestSourcesRequest,
  DeleteTestSourcesResponse,
  DeleteTestSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/delete-test-sources",
    input: { testId: 0, serviceArn: 0, testSources: D.list(i_TestSourceInput) },
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
  operationName: "DeleteTestSources",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/delete-user-journey",
    input: { systemArn: 0, userJourneyId: 0 },
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
  operationName: "DeleteUserJourney",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/get-failure-mode-finding",
    input: {
      findingId: D.m({ query: "findingId" }),
      serviceArn: D.m({ query: "serviceArn" }),
    },
    output: { finding: o_Finding },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFailureModeFinding",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/get-policy",
    input: { policyArn: D.m({ query: "policyArn" }) },
    output: { policy: o_Policy },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/get-service",
    input: { serviceArn: D.m({ query: "serviceArn" }) },
    output: { service: o_Service },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetService",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/get-system",
    input: { systemArn: D.m({ query: "systemArn" }) },
    output: { system: o_System },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSystem",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/get-test",
    input: {
      testId: D.m({ query: "testId" }),
      serviceArn: D.m({ query: "serviceArn" }),
    },
    output: { test: o_Test },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTest",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/get-test-run",
    input: {
      testRunId: D.m({ query: "testRunId" }),
      serviceArn: D.m({ query: "serviceArn" }),
    },
    output: {
      testRun: {
        startedAt: D.ts,
        endedAt: D.ts,
        reportOutput: o_ReportGenerationResult,
      },
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
  operationName: "GetTestRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/get-test-template",
    input: { testTemplateArn: D.m({ query: "testTemplateArn" }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTestTemplate",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/get-user-journey",
    input: {
      systemArn: D.m({ query: "systemArn" }),
      userJourneyId: D.m({ query: "userJourneyId" }),
    },
    output: { userJourney: o_UserJourney },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUserJourney",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/import-app",
    input: {
      v1AppArn: 0,
      policyArn: 0,
      kmsKeyId: 0,
      skipManuallyAddedResources: 0,
      associatedSystems: D.list(i_AssociatedSystem),
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { service: o_Service },
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
  operationName: "ImportApp",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/import-policy",
    input: {
      v1PolicyArn: 0,
      kmsKeyId: 0,
      availabilitySlo: i_AvailabilitySlo,
      multiAzDisasterRecoveryApproach: 0,
      multiRegionDisasterRecoveryApproach: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { policy: o_Policy },
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
  operationName: "ImportPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/list-assertions",
    input: {
      serviceArn: D.m({ query: "serviceArn" }),
      source: D.m({ query: "source" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { assertions: D.list(o_Assertion) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v2/list-dependencies",
    input: {
      serviceArn: D.m({ query: "serviceArn" }),
      queryRangeStartTime: D.m({
        query: "queryRangeStartTime",
        shape: D.tsAs("epoch-seconds"),
      }),
      queryRangeEndTime: D.m({
        query: "queryRangeEndTime",
        shape: D.tsAs("epoch-seconds"),
      }),
      queryRangeGranularity: D.m({ query: "queryRangeGranularity" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      dependencySummaries: D.list({
        lastDetectedTime: D.ts,
        queryRange: {
          startTime: D.ts,
          endTime: D.ts,
          dataPoints: D.list({ timestamp: D.ts }),
        },
      }),
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
  descriptor: {
    service: svc,
    http: "GET /v2/list-failure-mode-assessments",
    input: {
      serviceArn: D.m({ query: "serviceArn" }),
      assessmentStatuses: D.m({ query: "assessmentStatuses" }),
      startedAfter: D.m({
        query: "startedAfter",
        shape: D.tsAs("epoch-seconds"),
      }),
      endedBefore: D.m({
        query: "endedBefore",
        shape: D.tsAs("epoch-seconds"),
      }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { assessmentSummaries: D.list({ startedAt: D.ts, endedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v2/list-failure-mode-findings",
    input: {
      serviceArn: D.m({ query: "serviceArn" }),
      severity: D.m({ query: "severity" }),
      failureCategory: D.m({ query: "failureCategory" }),
      status: D.m({ query: "status" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { findingsSummary: D.list({ updatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v2/list-input-sources",
    input: {
      serviceArn: D.m({ query: "serviceArn" }),
      type: D.m({ query: "type" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { inputSourceSummaries: D.list({ createdAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v2/list-policies",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { policySummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v2/list-reports",
    input: {
      serviceArn: D.m({ query: "serviceArn" }),
      reportType: D.m({ query: "reportType" }),
      testRunId: D.m({ query: "testRunId" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { reportGenerationResults: D.list(o_ReportGenerationResult) },
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
  descriptor: {
    service: svc,
    http: "GET /v2/test-runs/{testRunId}/resolved-target-resources",
    input: {
      testRunId: 0,
      serviceArn: D.m({ query: "serviceArn" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
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
  descriptor: {
    service: svc,
    http: "GET /v2/list-resources",
    input: {
      serviceArn: D.m({ query: "serviceArn" }),
      serviceFunctionId: D.m({ query: "serviceFunctionId" }),
      awsRegion: D.m({ query: "awsRegion" }),
      resourceTypes: D.m({ query: "resourceTypes" }),
      billable: D.m({ query: "billable" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
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
  descriptor: {
    service: svc,
    http: "GET /v2/list-service-events",
    input: {
      serviceArn: D.m({ query: "serviceArn" }),
      eventTypes: D.m({ query: "eventTypes" }),
      startTime: D.m({ query: "startTime", shape: D.tsAs("epoch-seconds") }),
      endTime: D.m({ query: "endTime", shape: D.tsAs("epoch-seconds") }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { events: D.list({ timestamp: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v2/list-functions",
    input: {
      serviceArn: D.m({ query: "serviceArn" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { serviceFunctions: D.list(o_ServiceFunction) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v2/list-services",
    input: {
      systemArn: D.m({ query: "systemArn" }),
      userJourneyId: D.m({ query: "userJourneyId" }),
      ouId: D.m({ query: "ouId" }),
      accountId: D.m({ query: "accountId" }),
      assessmentStatus: D.m({ query: "assessmentStatus" }),
      policyArn: D.m({ query: "policyArn" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      serviceSummaries: D.list({
        dependencyDiscovery: o_DependencyDiscoveryConfig,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v2/list-service-topology-edges",
    input: {
      serviceArn: D.m({ query: "serviceArn" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v2/list-system-events",
    input: {
      systemArn: D.m({ query: "systemArn" }),
      eventTypes: D.m({ query: "eventTypes" }),
      startTime: D.m({ query: "startTime", shape: D.tsAs("epoch-seconds") }),
      endTime: D.m({ query: "endTime", shape: D.tsAs("epoch-seconds") }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { events: D.list({ timestamp: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v2/list-systems",
    input: {
      ouId: D.m({ query: "ouId" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { systemSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v2/tags/{resourceArn}",
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
  descriptor: {
    service: svc,
    http: "GET /v2/test-runs/{testRunId}/events",
    input: {
      testRunId: 0,
      serviceArn: D.m({ query: "serviceArn" }),
      startedAt: D.m({ query: "startedAt", shape: D.tsAs("epoch-seconds") }),
      endedAt: D.m({ query: "endedAt", shape: D.tsAs("epoch-seconds") }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { events: D.list({ timestamp: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v2/list-test-runs",
    input: {
      serviceArn: D.m({ query: "serviceArn" }),
      testId: D.m({ query: "testId" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { testRuns: D.list({ startedAt: D.ts, endedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v2/test-runs/{testRunId}/sources",
    input: {
      testRunId: 0,
      serviceArn: D.m({ query: "serviceArn" }),
      type: D.m({ query: "type" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
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
  descriptor: {
    service: svc,
    http: "GET /v2/list-tests",
    input: {
      serviceArn: D.m({ query: "serviceArn" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { tests: D.list({ creationTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /v2/tests/{testId}/sources",
    input: {
      testId: 0,
      serviceArn: D.m({ query: "serviceArn" }),
      type: D.m({ query: "type" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      testSources: D.list({
        successCriteriaAlarm: { createdAt: D.ts },
        observabilityAlarm: { createdAt: D.ts },
      }),
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
  descriptor: { service: svc, http: "GET /v2/list-test-templates", input: {} },
  errors: [AccessDeniedException, InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTestTemplates",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /v2/list-user-journeys",
    input: {
      systemArn: D.m({ query: "systemArn" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      userJourneySummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
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
 * Adds or updates the monitoring sources on a test. The operation is transactional — either every source is written or the call fails and nothing is written.
 */
export const putTestSources: API.OperationMethod<
  PutTestSourcesRequest,
  PutTestSourcesResponse,
  PutTestSourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v2/put-test-sources",
    input: { testId: 0, serviceArn: 0, testSources: D.list(i_TestSourceInput) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/start-failure-mode-assessment",
    input: { serviceArn: 0, clientToken: D.m({ idempotency: true }) },
    output: { startedAt: D.ts },
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
  operationName: "StartFailureModeAssessment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/start-test-run",
    input: { testId: 0, serviceArn: 0 },
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
  operationName: "StartTestRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/stop-test-run",
    input: { testRunId: 0, serviceArn: 0 },
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
  operationName: "StopTestRun",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/tags/{resourceArn}",
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
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v2/tags/{resourceArn}",
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
  descriptor: {
    service: svc,
    http: "POST /v2/update-assertion",
    input: { serviceArn: 0, assertionId: 0, text: 0 },
    output: { assertion: o_Assertion },
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
  operationName: "UpdateAssertion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/update-dependency",
    input: { serviceArn: 0, dependencyId: 0, criticality: 0, comment: 0 },
    output: { updatedAt: D.ts },
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
  operationName: "UpdateDependency",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/update-failure-mode-finding",
    input: { findingId: 0, status: 0, serviceArn: 0, comment: 0 },
    output: { finding: o_Finding },
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
  operationName: "UpdateFailureModeFinding",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/update-policy",
    input: {
      policyArn: 0,
      description: 0,
      availabilitySlo: i_AvailabilitySlo,
      multiAz: i_MultiAzTargets,
      multiRegion: i_MultiRegionTargets,
      dataRecovery: i_DataRecoveryTargets,
    },
    output: { policy: o_Policy },
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
  operationName: "UpdatePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/update-service",
    input: {
      serviceArn: 0,
      description: 0,
      associatedSystems: D.list(i_AssociatedSystem),
      policyArn: 0,
      regions: 0,
      permissionModel: i_PermissionModel,
      dependencyDiscovery: 0,
      reportConfiguration: i_ServiceReportConfiguration,
    },
    output: { service: o_Service },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/update-function",
    input: {
      serviceArn: 0,
      serviceFunctionId: 0,
      name: 0,
      description: 0,
      criticality: 0,
    },
    output: { serviceFunction: o_ServiceFunction },
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
  operationName: "UpdateServiceFunction",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/update-system",
    input: { systemArn: 0, description: 0, sharingEnabled: 0 },
    output: { system: o_System },
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
  operationName: "UpdateSystem",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/update-test",
    input: {
      testId: 0,
      serviceArn: 0,
      loggingConfiguration: i_LoggingConfiguration,
      stopConditions: D.list(i_StopCondition),
      roleName: 0,
      parameters: 0,
    },
    output: { test: o_Test },
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
  operationName: "UpdateTest",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /v2/update-user-journey",
    input: {
      systemArn: 0,
      userJourneyId: 0,
      name: 0,
      description: 0,
      policyArn: 0,
    },
    output: { userJourney: o_UserJourney },
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
  operationName: "UpdateUserJourney",
})) as any;

const i_AssociatedSystem: D.LazyStruct = () => ({
  systemArn: 0,
  systemName: 0,
  userJourneyIds: 0,
});
const i_AvailabilitySlo: D.LazyStruct = () => ({ target: 0 });
const i_DataRecoveryTargets: D.LazyStruct = () => ({
  timeBetweenBackupsInMinutes: 0,
});
const i_LoggingConfiguration: D.LazyStruct = () => ({
  s3BucketName: 0,
  cloudWatchLogGroupArn: 0,
  logSchemaVersion: 0,
});
const i_MultiAzTargets: D.LazyStruct = () => ({
  rtoInMinutes: 0,
  rpoInMinutes: 0,
  disasterRecoveryApproach: 0,
});
const i_MultiRegionTargets: D.LazyStruct = () => ({
  rtoInMinutes: 0,
  rpoInMinutes: 0,
  disasterRecoveryApproach: 0,
});
const i_PermissionModel: D.LazyStruct = () => ({
  invokerRoleName: 0,
  crossAccountRoles: D.list({ crossAccountRoleArn: 0, externalId: 0 }),
});
const i_ServiceReportConfiguration: D.LazyStruct = () => ({
  reportOutputs: D.list({ s3: { bucketPath: 0, bucketOwner: 0 } }),
});
const i_StopCondition: D.LazyStruct = () => ({ source: 0, value: 0 });
const i_TestSourceInput: D.LazyStruct = () => ({
  successCriteriaAlarm: { alarmArn: 0 },
  observabilityAlarm: { alarmArn: 0 },
});
const o_Assertion: D.LazyStruct = () => ({ createdAt: D.ts, updatedAt: D.ts });
const o_DependencyDiscoveryConfig: D.LazyStruct = () => ({ updatedAt: D.ts });
const o_Finding: D.LazyStruct = () => ({ updatedAt: D.ts });
const o_Policy: D.LazyStruct = () => ({ createdAt: D.ts, updatedAt: D.ts });
const o_ReportGenerationResult: D.LazyStruct = () => ({ createdAt: D.ts });
const o_Service: D.LazyStruct = () => ({
  dependencyDiscovery: o_DependencyDiscoveryConfig,
  resourceDiscovery: { lastRunAt: D.ts },
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_ServiceFunction: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_System: D.LazyStruct = () => ({ createdAt: D.ts, updatedAt: D.ts });
const o_Test: D.LazyStruct = () => ({ creationTime: D.ts });
const o_UserJourney: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
