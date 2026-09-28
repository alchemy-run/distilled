import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as API from "@distilled.cloud/core/api";
import * as D from "@distilled.cloud/core/shape";
import * as TE from "@distilled.cloud/core/error-class";
import { AwsProtocol } from "../protocol.ts";
import { awsJson1_1Protocol } from "../protocols/aws-json.ts";
import { Retry } from "../retry.ts";
import type * as T from "../types.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
const svc: T.ServiceInfo = {
  sdkId: "FraudDetector",
  target: "AWSHawksNestServiceFacade",
  version: "2019-11-15",
  sigv4: "frauddetector",
  protocol: awsJson1_1Protocol,
  xmlns: "http://hawksnest.amazonaws.com/doc/2019-11-15",
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
                `https://frauddetector-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://frauddetector-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://frauddetector.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://frauddetector.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  )<{ readonly message: string }> {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceUnavailableException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export interface VariableEntry {
  name?: string;
  dataType?: string;
  dataSource?: string;
  defaultValue?: string;
  description?: string;
  variableType?: string;
}
export type VariableEntryList = VariableEntry[];
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export interface BatchCreateVariableRequest {
  variableEntries: VariableEntry[];
  tags?: Tag[];
}
export type Integer2 = number;
export interface BatchCreateVariableError_ {
  name?: string;
  code?: number;
  message?: string;
}
export type BatchCreateVariableErrorList = BatchCreateVariableError_[];
export interface BatchCreateVariableResult {
  errors?: BatchCreateVariableError_[];
}
export type NameList = string[];
export interface BatchGetVariableRequest {
  names: string[];
}
export type DataType =
  | "STRING"
  | "INTEGER"
  | "FLOAT"
  | "BOOLEAN"
  | "DATETIME"
  | (string & {});
export type DataSource =
  | "EVENT"
  | "MODEL_SCORE"
  | "EXTERNAL_MODEL_SCORE"
  | (string & {});
export type FraudDetectorArn = string;
export interface Variable {
  name?: string;
  dataType?: DataType;
  dataSource?: DataSource;
  defaultValue?: string;
  description?: string;
  variableType?: string;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
}
export type VariableList = Variable[];
export interface BatchGetVariableError_ {
  name?: string;
  code?: number;
  message?: string;
}
export type BatchGetVariableErrorList = BatchGetVariableError_[];
export interface BatchGetVariableResult {
  variables?: Variable[];
  errors?: BatchGetVariableError_[];
}
export type Identifier = string;
export interface CancelBatchImportJobRequest {
  jobId: string;
}
export interface CancelBatchImportJobResult {}
export interface CancelBatchPredictionJobRequest {
  jobId: string;
}
export interface CancelBatchPredictionJobResult {}
export type S3BucketLocation = string;
export type IamRoleArn = string;
export interface CreateBatchImportJobRequest {
  jobId: string;
  inputPath: string;
  outputPath: string;
  eventTypeName: string;
  iamRoleArn: string;
  tags?: Tag[];
}
export interface CreateBatchImportJobResult {}
export type WholeNumberVersionString = string;
export interface CreateBatchPredictionJobRequest {
  jobId: string;
  inputPath: string;
  outputPath: string;
  eventTypeName: string;
  detectorName: string;
  detectorVersion?: string;
  iamRoleArn: string;
  tags?: Tag[];
}
export interface CreateBatchPredictionJobResult {}
export type Description = string;
export type ListOfStrings = string[];
export interface Rule {
  detectorId: string;
  ruleId: string;
  ruleVersion: string;
}
export type RuleList = Rule[];
export type ModelIdentifier = string;
export type ModelTypeEnum =
  | "ONLINE_FRAUD_INSIGHTS"
  | "TRANSACTION_FRAUD_INSIGHTS"
  | "ACCOUNT_TAKEOVER_INSIGHTS"
  | (string & {});
export type FloatVersionString = string;
export interface ModelVersion {
  modelId: string;
  modelType: ModelTypeEnum;
  modelVersionNumber: string;
  arn?: string;
}
export type ListOfModelVersions = ModelVersion[];
export type RuleExecutionMode = "ALL_MATCHED" | "FIRST_MATCHED" | (string & {});
export interface CreateDetectorVersionRequest {
  detectorId: string;
  description?: string;
  externalModelEndpoints?: string[];
  rules: Rule[];
  modelVersions?: ModelVersion[];
  ruleExecutionMode?: RuleExecutionMode;
  tags?: Tag[];
}
export type DetectorVersionStatus =
  | "DRAFT"
  | "ACTIVE"
  | "INACTIVE"
  | (string & {});
export interface CreateDetectorVersionResult {
  detectorId?: string;
  detectorVersionId?: string;
  status?: DetectorVersionStatus;
}
export type NoDashIdentifier = string;
export type Elements = string | redacted.Redacted<string>;
export type ElementsList = (string | redacted.Redacted<string>)[];
export type VariableType = string;
export interface CreateListRequest {
  name: string;
  elements?: (string | redacted.Redacted<string>)[];
  variableType?: string;
  description?: string;
  tags?: Tag[];
}
export interface CreateListResult {}
export interface CreateModelRequest {
  modelId: string;
  modelType: ModelTypeEnum;
  description?: string;
  eventTypeName: string;
  tags?: Tag[];
}
export interface CreateModelResult {}
export type TrainingDataSourceEnum =
  | "EXTERNAL_EVENTS"
  | "INGESTED_EVENTS"
  | (string & {});
export type LabelMapper = { [key: string]: string[] | undefined };
export type UnlabeledEventsTreatment =
  | "IGNORE"
  | "FRAUD"
  | "LEGIT"
  | "AUTO"
  | (string & {});
export interface LabelSchema {
  labelMapper?: { [key: string]: string[] | undefined };
  unlabeledEventsTreatment?: UnlabeledEventsTreatment;
}
export interface TrainingDataSchema {
  modelVariables: string[];
  labelSchema?: LabelSchema;
}
export interface ExternalEventsDetail {
  dataLocation: string;
  dataAccessRoleArn: string;
}
export interface IngestedEventsTimeWindow {
  startTime: string;
  endTime: string;
}
export interface IngestedEventsDetail {
  ingestedEventsTimeWindow: IngestedEventsTimeWindow;
}
export interface CreateModelVersionRequest {
  modelId: string;
  modelType: ModelTypeEnum;
  trainingDataSource: TrainingDataSourceEnum;
  trainingDataSchema: TrainingDataSchema;
  externalEventsDetail?: ExternalEventsDetail;
  ingestedEventsDetail?: IngestedEventsDetail;
  tags?: Tag[];
}
export interface CreateModelVersionResult {
  modelId?: string;
  modelType?: ModelTypeEnum;
  modelVersionNumber?: string;
  status?: string;
}
export type RuleExpression = string | redacted.Redacted<string>;
export type Language = "DETECTORPL" | (string & {});
export type NonEmptyListOfStrings = string[];
export interface CreateRuleRequest {
  ruleId: string;
  detectorId: string;
  description?: string;
  expression: string | redacted.Redacted<string>;
  language: Language;
  outcomes: string[];
  tags?: Tag[];
}
export interface CreateRuleResult {
  rule?: Rule;
}
export interface CreateVariableRequest {
  name: string;
  dataType: DataType;
  dataSource: DataSource;
  defaultValue: string;
  description?: string;
  variableType?: string;
  tags?: Tag[];
}
export interface CreateVariableResult {}
export interface DeleteBatchImportJobRequest {
  jobId: string;
}
export interface DeleteBatchImportJobResult {}
export interface DeleteBatchPredictionJobRequest {
  jobId: string;
}
export interface DeleteBatchPredictionJobResult {}
export interface DeleteDetectorRequest {
  detectorId: string;
}
export interface DeleteDetectorResult {}
export interface DeleteDetectorVersionRequest {
  detectorId: string;
  detectorVersionId: string;
}
export interface DeleteDetectorVersionResult {}
export interface DeleteEntityTypeRequest {
  name: string;
}
export interface DeleteEntityTypeResult {}
export type DeleteAuditHistory = boolean;
export interface DeleteEventRequest {
  eventId: string;
  eventTypeName: string;
  deleteAuditHistory?: boolean;
}
export interface DeleteEventResult {}
export interface DeleteEventsByEventTypeRequest {
  eventTypeName: string;
}
export interface DeleteEventsByEventTypeResult {
  eventTypeName?: string;
  eventsDeletionStatus?: string;
}
export interface DeleteEventTypeRequest {
  name: string;
}
export interface DeleteEventTypeResult {}
export type SageMakerEndpointIdentifier = string;
export interface DeleteExternalModelRequest {
  modelEndpoint: string;
}
export interface DeleteExternalModelResult {}
export interface DeleteLabelRequest {
  name: string;
}
export interface DeleteLabelResult {}
export interface DeleteListRequest {
  name: string;
}
export interface DeleteListResult {}
export interface DeleteModelRequest {
  modelId: string;
  modelType: ModelTypeEnum;
}
export interface DeleteModelResult {}
export interface DeleteModelVersionRequest {
  modelId: string;
  modelType: ModelTypeEnum;
  modelVersionNumber: string;
}
export interface DeleteModelVersionResult {}
export interface DeleteOutcomeRequest {
  name: string;
}
export interface DeleteOutcomeResult {}
export interface DeleteRuleRequest {
  rule: Rule;
}
export interface DeleteRuleResult {}
export interface DeleteVariableRequest {
  name: string;
}
export interface DeleteVariableResult {}
export type DetectorVersionMaxResults = number;
export interface DescribeDetectorRequest {
  detectorId: string;
  nextToken?: string;
  maxResults?: number;
}
export interface DetectorVersionSummary {
  detectorVersionId?: string;
  status?: DetectorVersionStatus;
  description?: string;
  lastUpdatedTime?: string;
}
export type DetectorVersionSummaryList = DetectorVersionSummary[];
export interface DescribeDetectorResult {
  detectorId?: string;
  detectorVersionSummaries?: DetectorVersionSummary[];
  nextToken?: string;
  arn?: string;
}
export type ModelsMaxPageSize = number;
export interface DescribeModelVersionsRequest {
  modelId?: string;
  modelVersionNumber?: string;
  modelType?: ModelTypeEnum;
  nextToken?: string;
  maxResults?: number;
}
export interface FileValidationMessage {
  title?: string;
  content?: string;
  type?: string;
}
export type FileValidationMessageList = FileValidationMessage[];
export interface FieldValidationMessage {
  fieldName?: string;
  identifier?: string;
  title?: string;
  content?: string;
  type?: string;
}
export type FieldValidationMessageList = FieldValidationMessage[];
export interface DataValidationMetrics {
  fileLevelMessages?: FileValidationMessage[];
  fieldLevelMessages?: FieldValidationMessage[];
}
export interface MetricDataPoint {
  fpr?: number;
  precision?: number;
  tpr?: number;
  threshold?: number;
}
export type MetricDataPointsList = MetricDataPoint[];
export interface TrainingMetrics {
  auc?: number;
  metricDataPoints?: MetricDataPoint[];
}
export interface LogOddsMetric {
  variableName: string;
  variableType: string;
  variableImportance: number;
}
export type ListOfLogOddsMetrics = LogOddsMetric[];
export interface VariableImportanceMetrics {
  logOddsMetrics?: LogOddsMetric[];
}
export interface TrainingResult {
  dataValidationMetrics?: DataValidationMetrics;
  trainingMetrics?: TrainingMetrics;
  variableImportanceMetrics?: VariableImportanceMetrics;
}
export interface OFIMetricDataPoint {
  fpr?: number;
  precision?: number;
  tpr?: number;
  threshold?: number;
}
export type OFIMetricDataPointsList = OFIMetricDataPoint[];
export interface UncertaintyRange {
  lowerBoundValue: number;
  upperBoundValue: number;
}
export interface OFIModelPerformance {
  auc?: number;
  uncertaintyRange?: UncertaintyRange;
}
export interface OFITrainingMetricsValue {
  metricDataPoints?: OFIMetricDataPoint[];
  modelPerformance?: OFIModelPerformance;
}
export interface TFIMetricDataPoint {
  fpr?: number;
  precision?: number;
  tpr?: number;
  threshold?: number;
}
export type TFIMetricDataPointsList = TFIMetricDataPoint[];
export interface TFIModelPerformance {
  auc?: number;
  uncertaintyRange?: UncertaintyRange;
}
export interface TFITrainingMetricsValue {
  metricDataPoints?: TFIMetricDataPoint[];
  modelPerformance?: TFIModelPerformance;
}
export interface ATIMetricDataPoint {
  cr?: number;
  adr?: number;
  threshold?: number;
  atodr?: number;
}
export type ATIMetricDataPointsList = ATIMetricDataPoint[];
export interface ATIModelPerformance {
  asi?: number;
}
export interface ATITrainingMetricsValue {
  metricDataPoints?: ATIMetricDataPoint[];
  modelPerformance?: ATIModelPerformance;
}
export interface TrainingMetricsV2 {
  ofi?: OFITrainingMetricsValue;
  tfi?: TFITrainingMetricsValue;
  ati?: ATITrainingMetricsValue;
}
export interface AggregatedLogOddsMetric {
  variableNames: string[];
  aggregatedVariablesImportance: number;
}
export type ListOfAggregatedLogOddsMetrics = AggregatedLogOddsMetric[];
export interface AggregatedVariablesImportanceMetrics {
  logOddsMetrics?: AggregatedLogOddsMetric[];
}
export interface TrainingResultV2 {
  dataValidationMetrics?: DataValidationMetrics;
  trainingMetricsV2?: TrainingMetricsV2;
  variableImportanceMetrics?: VariableImportanceMetrics;
  aggregatedVariablesImportanceMetrics?: AggregatedVariablesImportanceMetrics;
}
export interface ModelVersionDetail {
  modelId?: string;
  modelType?: ModelTypeEnum;
  modelVersionNumber?: string;
  status?: string;
  trainingDataSource?: TrainingDataSourceEnum;
  trainingDataSchema?: TrainingDataSchema;
  externalEventsDetail?: ExternalEventsDetail;
  ingestedEventsDetail?: IngestedEventsDetail;
  trainingResult?: TrainingResult;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
  trainingResultV2?: TrainingResultV2;
}
export type ModelVersionDetailList = ModelVersionDetail[];
export interface DescribeModelVersionsResult {
  modelVersionDetails?: ModelVersionDetail[];
  nextToken?: string;
}
export type BatchImportsMaxPageSize = number;
export interface GetBatchImportJobsRequest {
  jobId?: string;
  maxResults?: number;
  nextToken?: string;
}
export type AsyncJobStatus =
  | "IN_PROGRESS_INITIALIZING"
  | "IN_PROGRESS"
  | "CANCEL_IN_PROGRESS"
  | "CANCELED"
  | "COMPLETE"
  | "FAILED"
  | (string & {});
export interface BatchImport {
  jobId?: string;
  status?: AsyncJobStatus;
  failureReason?: string;
  startTime?: string;
  completionTime?: string;
  inputPath?: string;
  outputPath?: string;
  eventTypeName?: string;
  iamRoleArn?: string;
  arn?: string;
  processedRecordsCount?: number;
  failedRecordsCount?: number;
  totalRecordsCount?: number;
}
export type BatchImportList = BatchImport[];
export interface GetBatchImportJobsResult {
  batchImports?: BatchImport[];
  nextToken?: string;
}
export type BatchPredictionsMaxPageSize = number;
export interface GetBatchPredictionJobsRequest {
  jobId?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface BatchPrediction {
  jobId?: string;
  status?: AsyncJobStatus;
  failureReason?: string;
  startTime?: string;
  completionTime?: string;
  lastHeartbeatTime?: string;
  inputPath?: string;
  outputPath?: string;
  eventTypeName?: string;
  detectorName?: string;
  detectorVersion?: string;
  iamRoleArn?: string;
  arn?: string;
  processedRecordsCount?: number;
  totalRecordsCount?: number;
}
export type BatchPredictionList = BatchPrediction[];
export interface GetBatchPredictionJobsResult {
  batchPredictions?: BatchPrediction[];
  nextToken?: string;
}
export interface GetDeleteEventsByEventTypeStatusRequest {
  eventTypeName: string;
}
export interface GetDeleteEventsByEventTypeStatusResult {
  eventTypeName?: string;
  eventsDeletionStatus?: AsyncJobStatus;
}
export type DetectorsMaxResults = number;
export interface GetDetectorsRequest {
  detectorId?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface Detector {
  detectorId?: string;
  description?: string;
  eventTypeName?: string;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
}
export type DetectorList = Detector[];
export interface GetDetectorsResult {
  detectors?: Detector[];
  nextToken?: string;
}
export interface GetDetectorVersionRequest {
  detectorId: string;
  detectorVersionId: string;
}
export interface GetDetectorVersionResult {
  detectorId?: string;
  detectorVersionId?: string;
  description?: string;
  externalModelEndpoints?: string[];
  modelVersions?: ModelVersion[];
  rules?: Rule[];
  status?: DetectorVersionStatus;
  lastUpdatedTime?: string;
  createdTime?: string;
  ruleExecutionMode?: RuleExecutionMode;
  arn?: string;
}
export type EntityTypesMaxResults = number;
export interface GetEntityTypesRequest {
  name?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface EntityType {
  name?: string;
  description?: string;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
}
export type EntityTypeList = EntityType[];
export interface GetEntityTypesResult {
  entityTypes?: EntityType[];
  nextToken?: string;
}
export interface GetEventRequest {
  eventId: string;
  eventTypeName: string;
}
export type AttributeKey = string;
export type AttributeValue = string | redacted.Redacted<string>;
export type EventAttributeMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type EntityRestrictedString = string;
export interface Entity {
  entityType: string;
  entityId: string;
}
export type ListOfEntities = Entity[];
export interface Event {
  eventId?: string;
  eventTypeName?: string;
  eventTimestamp?: string;
  eventVariables?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  currentLabel?: string;
  labelTimestamp?: string;
  entities?: Entity[];
}
export interface GetEventResult {
  event?: Event;
}
export type UtcTimestampISO8601 = string;
export type VariableName = string;
export type VariableValue = string | redacted.Redacted<string>;
export type EventVariableMap = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type ContentType = string;
export interface ModelEndpointDataBlob {
  byteBuffer?: Uint8Array;
  contentType?: string;
}
export type ExternalModelEndpointDataBlobMap = {
  [key: string]: ModelEndpointDataBlob | undefined;
};
export interface GetEventPredictionRequest {
  detectorId: string;
  detectorVersionId?: string;
  eventId: string;
  eventTypeName: string;
  entities: Entity[];
  eventTimestamp: string;
  eventVariables: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  externalModelEndpointDataBlobs?: {
    [key: string]: ModelEndpointDataBlob | undefined;
  };
}
export type ModelPredictionMap = { [key: string]: number | undefined };
export interface ModelScores {
  modelVersion?: ModelVersion;
  scores?: { [key: string]: number | undefined };
}
export type ListOfModelScores = ModelScores[];
export interface RuleResult {
  ruleId?: string;
  outcomes?: string[];
}
export type ListOfRuleResults = RuleResult[];
export type ModelSource = "SAGEMAKER" | (string & {});
export interface ExternalModelSummary {
  modelEndpoint?: string;
  modelSource?: ModelSource;
}
export type ExternalModelPredictionMap = { [key: string]: string | undefined };
export interface ExternalModelOutputs {
  externalModel?: ExternalModelSummary;
  outputs?: { [key: string]: string | undefined };
}
export type ListOfExternalModelOutputs = ExternalModelOutputs[];
export interface GetEventPredictionResult {
  modelScores?: ModelScores[];
  ruleResults?: RuleResult[];
  externalModelOutputs?: ExternalModelOutputs[];
}
export interface GetEventPredictionMetadataRequest {
  eventId: string;
  eventTypeName: string;
  detectorId: string;
  detectorVersionId: string;
  predictionTimestamp: string;
}
export type SensitiveString = string | redacted.Redacted<string>;
export interface EventVariableSummary {
  name?: string | redacted.Redacted<string>;
  value?: string | redacted.Redacted<string>;
  source?: string | redacted.Redacted<string>;
}
export type ListOfEventVariableSummaries = EventVariableSummary[];
export interface EvaluatedRule {
  ruleId?: string;
  ruleVersion?: string;
  expression?: string | redacted.Redacted<string>;
  expressionWithValues?: string | redacted.Redacted<string>;
  outcomes?: string[];
  evaluated?: boolean;
  matched?: boolean;
}
export type EvaluatedRuleList = EvaluatedRule[];
export interface VariableImpactExplanation {
  eventVariableName?: string;
  relativeImpact?: string;
  logOddsImpact?: number;
}
export type ListOfVariableImpactExplanations = VariableImpactExplanation[];
export interface AggregatedVariablesImpactExplanation {
  eventVariableNames?: string[];
  relativeImpact?: string;
  logOddsImpact?: number;
}
export type ListOfAggregatedVariablesImpactExplanations =
  AggregatedVariablesImpactExplanation[];
export interface PredictionExplanations {
  variableImpactExplanations?: VariableImpactExplanation[];
  aggregatedVariablesImpactExplanations?: AggregatedVariablesImpactExplanation[];
}
export interface ModelVersionEvaluation {
  outputVariableName?: string;
  evaluationScore?: string;
  predictionExplanations?: PredictionExplanations;
}
export type ListOfModelVersionEvaluations = ModelVersionEvaluation[];
export interface EvaluatedModelVersion {
  modelId?: string;
  modelVersion?: string;
  modelType?: string;
  evaluations?: ModelVersionEvaluation[];
}
export type ListOfEvaluatedModelVersions = EvaluatedModelVersion[];
export type MapOfStrings = { [key: string]: string | undefined };
export interface EvaluatedExternalModel {
  modelEndpoint?: string;
  useEventVariables?: boolean;
  inputVariables?: { [key: string]: string | undefined };
  outputVariables?: { [key: string]: string | undefined };
}
export type ListOfEvaluatedExternalModels = EvaluatedExternalModel[];
export interface GetEventPredictionMetadataResult {
  eventId?: string;
  eventTypeName?: string;
  entityId?: string;
  entityType?: string;
  eventTimestamp?: string;
  detectorId?: string;
  detectorVersionId?: string;
  detectorVersionStatus?: string;
  eventVariables?: EventVariableSummary[];
  rules?: EvaluatedRule[];
  ruleExecutionMode?: RuleExecutionMode;
  outcomes?: string[];
  evaluatedModelVersions?: EvaluatedModelVersion[];
  evaluatedExternalModels?: EvaluatedExternalModel[];
  predictionTimestamp?: string;
}
export type EventTypesMaxResults = number;
export interface GetEventTypesRequest {
  name?: string;
  nextToken?: string;
  maxResults?: number;
}
export type EventIngestion = "ENABLED" | "DISABLED" | (string & {});
export interface IngestedEventStatistics {
  numberOfEvents?: number;
  eventDataSizeInBytes?: number;
  leastRecentEvent?: string;
  mostRecentEvent?: string;
  lastUpdatedTime?: string;
}
export interface EventOrchestration {
  eventBridgeEnabled: boolean;
}
export interface EventType {
  name?: string;
  description?: string;
  eventVariables?: string[];
  labels?: string[];
  entityTypes?: string[];
  eventIngestion?: EventIngestion;
  ingestedEventStatistics?: IngestedEventStatistics;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
  eventOrchestration?: EventOrchestration;
}
export type EventTypeList = EventType[];
export interface GetEventTypesResult {
  eventTypes?: EventType[];
  nextToken?: string;
}
export type ExternalModelsMaxResults = number;
export interface GetExternalModelsRequest {
  modelEndpoint?: string;
  nextToken?: string;
  maxResults?: number;
}
export type ModelInputDataFormat =
  | "TEXT_CSV"
  | "APPLICATION_JSON"
  | (string & {});
export type UseEventVariables = boolean;
export type ModelInputTemplate = string;
export interface ModelInputConfiguration {
  eventTypeName?: string;
  format?: ModelInputDataFormat;
  useEventVariables: boolean;
  jsonInputTemplate?: string;
  csvInputTemplate?: string;
}
export type ModelOutputDataFormat =
  | "TEXT_CSV"
  | "APPLICATION_JSONLINES"
  | (string & {});
export type JsonKeyToVariableMap = { [key: string]: string | undefined };
export type CsvIndexToVariableMap = { [key: string]: string | undefined };
export interface ModelOutputConfiguration {
  format: ModelOutputDataFormat;
  jsonKeyToVariableMap?: { [key: string]: string | undefined };
  csvIndexToVariableMap?: { [key: string]: string | undefined };
}
export type ModelEndpointStatus = "ASSOCIATED" | "DISSOCIATED" | (string & {});
export interface ExternalModel {
  modelEndpoint?: string;
  modelSource?: ModelSource;
  invokeModelEndpointRoleArn?: string;
  inputConfiguration?: ModelInputConfiguration;
  outputConfiguration?: ModelOutputConfiguration;
  modelEndpointStatus?: ModelEndpointStatus;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
}
export type ExternalModelList = ExternalModel[];
export interface GetExternalModelsResult {
  externalModels?: ExternalModel[];
  nextToken?: string;
}
export interface GetKMSEncryptionKeyRequest {}
export type KmsEncryptionKeyArn = string;
export interface KMSKey {
  kmsEncryptionKeyArn?: string;
}
export interface GetKMSEncryptionKeyResult {
  kmsKey?: KMSKey;
}
export type LabelsMaxResults = number;
export interface GetLabelsRequest {
  name?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface Label {
  name?: string;
  description?: string;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
}
export type LabelList = Label[];
export interface GetLabelsResult {
  labels?: Label[];
  nextToken?: string;
}
export type NextToken = string;
export type ListsElementsMaxResults = number;
export interface GetListElementsRequest {
  name: string;
  nextToken?: string;
  maxResults?: number;
}
export interface GetListElementsResult {
  elements?: (string | redacted.Redacted<string>)[];
  nextToken?: string;
}
export type ListsMetadataMaxResults = number;
export interface GetListsMetadataRequest {
  name?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface AllowDenyList {
  name: string;
  description?: string;
  variableType?: string;
  createdTime?: string;
  updatedTime?: string;
  arn?: string;
}
export type AllowDenyLists = AllowDenyList[];
export interface GetListsMetadataResult {
  lists?: AllowDenyList[];
  nextToken?: string;
}
export interface GetModelsRequest {
  modelId?: string;
  modelType?: ModelTypeEnum;
  nextToken?: string;
  maxResults?: number;
}
export interface Model {
  modelId?: string;
  modelType?: ModelTypeEnum;
  description?: string;
  eventTypeName?: string;
  createdTime?: string;
  lastUpdatedTime?: string;
  arn?: string;
}
export type ModelList = Model[];
export interface GetModelsResult {
  nextToken?: string;
  models?: Model[];
}
export interface GetModelVersionRequest {
  modelId: string;
  modelType: ModelTypeEnum;
  modelVersionNumber: string;
}
export interface GetModelVersionResult {
  modelId?: string;
  modelType?: ModelTypeEnum;
  modelVersionNumber?: string;
  trainingDataSource?: TrainingDataSourceEnum;
  trainingDataSchema?: TrainingDataSchema;
  externalEventsDetail?: ExternalEventsDetail;
  ingestedEventsDetail?: IngestedEventsDetail;
  status?: string;
  arn?: string;
}
export type OutcomesMaxResults = number;
export interface GetOutcomesRequest {
  name?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface Outcome {
  name?: string;
  description?: string;
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
}
export type OutcomeList = Outcome[];
export interface GetOutcomesResult {
  outcomes?: Outcome[];
  nextToken?: string;
}
export type RulesMaxResults = number;
export interface GetRulesRequest {
  ruleId?: string;
  detectorId: string;
  ruleVersion?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface RuleDetail {
  ruleId?: string;
  description?: string;
  detectorId?: string;
  ruleVersion?: string;
  expression?: string | redacted.Redacted<string>;
  language?: Language;
  outcomes?: string[];
  lastUpdatedTime?: string;
  createdTime?: string;
  arn?: string;
}
export type RuleDetailList = RuleDetail[];
export interface GetRulesResult {
  ruleDetails?: RuleDetail[];
  nextToken?: string;
}
export type VariablesMaxResults = number;
export interface GetVariablesRequest {
  name?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface GetVariablesResult {
  variables?: Variable[];
  nextToken?: string;
}
export type FilterString = string;
export interface FilterCondition {
  value?: string;
}
export interface PredictionTimeRange {
  startTime: string;
  endTime: string;
}
export type EventPredictionsMaxResults = number;
export interface ListEventPredictionsRequest {
  eventId?: FilterCondition;
  eventType?: FilterCondition;
  detectorId?: FilterCondition;
  detectorVersionId?: FilterCondition;
  predictionTimeRange?: PredictionTimeRange;
  nextToken?: string;
  maxResults?: number;
}
export interface EventPredictionSummary {
  eventId?: string;
  eventTypeName?: string;
  eventTimestamp?: string;
  predictionTimestamp?: string;
  detectorId?: string;
  detectorVersionId?: string;
}
export type ListOfEventPredictionSummaries = EventPredictionSummary[];
export interface ListEventPredictionsResult {
  eventPredictionSummaries?: EventPredictionSummary[];
  nextToken?: string;
}
export type TagsMaxResults = number;
export interface ListTagsForResourceRequest {
  resourceARN: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListTagsForResourceResult {
  tags?: Tag[];
  nextToken?: string;
}
export interface PutDetectorRequest {
  detectorId: string;
  description?: string;
  eventTypeName: string;
  tags?: Tag[];
}
export interface PutDetectorResult {}
export interface PutEntityTypeRequest {
  name: string;
  description?: string;
  tags?: Tag[];
}
export interface PutEntityTypeResult {}
export interface PutEventTypeRequest {
  name: string;
  description?: string;
  eventVariables: string[];
  labels?: string[];
  entityTypes: string[];
  eventIngestion?: EventIngestion;
  tags?: Tag[];
  eventOrchestration?: EventOrchestration;
}
export interface PutEventTypeResult {}
export interface PutExternalModelRequest {
  modelEndpoint: string;
  modelSource: ModelSource;
  invokeModelEndpointRoleArn: string;
  inputConfiguration: ModelInputConfiguration;
  outputConfiguration: ModelOutputConfiguration;
  modelEndpointStatus: ModelEndpointStatus;
  tags?: Tag[];
}
export interface PutExternalModelResult {}
export interface PutKMSEncryptionKeyRequest {
  kmsEncryptionKeyArn: string;
}
export interface PutKMSEncryptionKeyResult {}
export interface PutLabelRequest {
  name: string;
  description?: string;
  tags?: Tag[];
}
export interface PutLabelResult {}
export interface PutOutcomeRequest {
  name: string;
  description?: string;
  tags?: Tag[];
}
export interface PutOutcomeResult {}
export interface SendEventRequest {
  eventId: string;
  eventTypeName: string;
  eventTimestamp: string;
  eventVariables: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  assignedLabel?: string;
  labelTimestamp?: string;
  entities: Entity[];
}
export interface SendEventResult {}
export interface TagResourceRequest {
  resourceARN: string;
  tags: Tag[];
}
export interface TagResourceResult {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceARN: string;
  tagKeys: string[];
}
export interface UntagResourceResult {}
export interface UpdateDetectorVersionRequest {
  detectorId: string;
  detectorVersionId: string;
  externalModelEndpoints: string[];
  rules: Rule[];
  description?: string;
  modelVersions?: ModelVersion[];
  ruleExecutionMode?: RuleExecutionMode;
}
export interface UpdateDetectorVersionResult {}
export interface UpdateDetectorVersionMetadataRequest {
  detectorId: string;
  detectorVersionId: string;
  description: string;
}
export interface UpdateDetectorVersionMetadataResult {}
export interface UpdateDetectorVersionStatusRequest {
  detectorId: string;
  detectorVersionId: string;
  status: DetectorVersionStatus;
}
export interface UpdateDetectorVersionStatusResult {}
export interface UpdateEventLabelRequest {
  eventId: string;
  eventTypeName: string;
  assignedLabel: string;
  labelTimestamp: string;
}
export interface UpdateEventLabelResult {}
export type ListUpdateMode = "REPLACE" | "APPEND" | "REMOVE" | (string & {});
export interface UpdateListRequest {
  name: string;
  elements?: (string | redacted.Redacted<string>)[];
  description?: string;
  updateMode?: ListUpdateMode;
  variableType?: string;
}
export interface UpdateListResult {}
export interface UpdateModelRequest {
  modelId: string;
  modelType: ModelTypeEnum;
  description?: string;
}
export interface UpdateModelResult {}
export interface UpdateModelVersionRequest {
  modelId: string;
  modelType: ModelTypeEnum;
  majorVersionNumber: string;
  externalEventsDetail?: ExternalEventsDetail;
  ingestedEventsDetail?: IngestedEventsDetail;
  tags?: Tag[];
}
export interface UpdateModelVersionResult {
  modelId?: string;
  modelType?: ModelTypeEnum;
  modelVersionNumber?: string;
  status?: string;
}
export type ModelVersionStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "TRAINING_CANCELLED"
  | (string & {});
export interface UpdateModelVersionStatusRequest {
  modelId: string;
  modelType: ModelTypeEnum;
  modelVersionNumber: string;
  status: ModelVersionStatus;
}
export interface UpdateModelVersionStatusResult {}
export interface UpdateRuleMetadataRequest {
  rule: Rule;
  description: string;
}
export interface UpdateRuleMetadataResult {}
export interface UpdateRuleVersionRequest {
  rule: Rule;
  description?: string;
  expression: string | redacted.Redacted<string>;
  language: Language;
  outcomes: string[];
  tags?: Tag[];
}
export interface UpdateRuleVersionResult {
  rule?: Rule;
}
export interface UpdateVariableRequest {
  name: string;
  defaultValue?: string;
  description?: string;
  variableType?: string;
}
export interface UpdateVariableResult {}
export type BatchCreateVariableError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a batch of variables.
 */
export const batchCreateVariable: API.OperationMethod<
  BatchCreateVariableRequest,
  BatchCreateVariableResult,
  BatchCreateVariableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      variableEntries: D.list({
        name: 0,
        dataType: 0,
        dataSource: 0,
        defaultValue: 0,
        description: 0,
        variableType: 0,
      }),
      tags: D.list(i_Tag),
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
  operationName: "BatchCreateVariable",
})) as any;

export type BatchGetVariableError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a batch of variables.
 */
export const batchGetVariable: API.OperationMethod<
  BatchGetVariableRequest,
  BatchGetVariableResult,
  BatchGetVariableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { names: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetVariable",
})) as any;

export type CancelBatchImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels an in-progress batch import job.
 */
export const cancelBatchImportJob: API.OperationMethod<
  CancelBatchImportJobRequest,
  CancelBatchImportJobResult,
  CancelBatchImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { jobId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelBatchImportJob",
})) as any;

export type CancelBatchPredictionJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels the specified batch prediction job.
 */
export const cancelBatchPredictionJob: API.OperationMethod<
  CancelBatchPredictionJobRequest,
  CancelBatchPredictionJobResult,
  CancelBatchPredictionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { jobId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelBatchPredictionJob",
})) as any;

export type CreateBatchImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a batch import job.
 */
export const createBatchImportJob: API.OperationMethod<
  CreateBatchImportJobRequest,
  CreateBatchImportJobResult,
  CreateBatchImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      jobId: 0,
      inputPath: 0,
      outputPath: 0,
      eventTypeName: 0,
      iamRoleArn: 0,
      tags: D.list(i_Tag),
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
  operationName: "CreateBatchImportJob",
})) as any;

export type CreateBatchPredictionJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a batch prediction job.
 */
export const createBatchPredictionJob: API.OperationMethod<
  CreateBatchPredictionJobRequest,
  CreateBatchPredictionJobResult,
  CreateBatchPredictionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      jobId: 0,
      inputPath: 0,
      outputPath: 0,
      eventTypeName: 0,
      detectorName: 0,
      detectorVersion: 0,
      iamRoleArn: 0,
      tags: D.list(i_Tag),
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
  operationName: "CreateBatchPredictionJob",
})) as any;

export type CreateDetectorVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a detector version. The detector version starts in a `DRAFT` status.
 */
export const createDetectorVersion: API.OperationMethod<
  CreateDetectorVersionRequest,
  CreateDetectorVersionResult,
  CreateDetectorVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      detectorId: 0,
      description: 0,
      externalModelEndpoints: 0,
      rules: D.list(i_Rule),
      modelVersions: D.list(i_ModelVersion),
      ruleExecutionMode: 0,
      tags: D.list(i_Tag),
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
  operationName: "CreateDetectorVersion",
})) as any;

export type CreateListError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a list.
 *
 * List is a set of input data for a variable in your event dataset. You use the input data in a rule that's associated with your detector.
 * For more information, see Lists.
 */
export const createList: API.OperationMethod<
  CreateListRequest,
  CreateListResult,
  CreateListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      elements: 0,
      variableType: 0,
      description: 0,
      tags: D.list(i_Tag),
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
  operationName: "CreateList",
})) as any;

export type CreateModelError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a model using the specified model type.
 */
export const createModel: API.OperationMethod<
  CreateModelRequest,
  CreateModelResult,
  CreateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      modelId: 0,
      modelType: 0,
      description: 0,
      eventTypeName: 0,
      tags: D.list(i_Tag),
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
  operationName: "CreateModel",
})) as any;

export type CreateModelVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a version of the model using the specified model type and model id.
 */
export const createModelVersion: API.OperationMethod<
  CreateModelVersionRequest,
  CreateModelVersionResult,
  CreateModelVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      modelId: 0,
      modelType: 0,
      trainingDataSource: 0,
      trainingDataSchema: {
        modelVariables: 0,
        labelSchema: { labelMapper: 0, unlabeledEventsTreatment: 0 },
      },
      externalEventsDetail: i_ExternalEventsDetail,
      ingestedEventsDetail: i_IngestedEventsDetail,
      tags: D.list(i_Tag),
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
  operationName: "CreateModelVersion",
})) as any;

export type CreateRuleError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a rule for use with the specified detector.
 */
export const createRule: API.OperationMethod<
  CreateRuleRequest,
  CreateRuleResult,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      ruleId: 0,
      detectorId: 0,
      description: 0,
      expression: 0,
      language: 0,
      outcomes: 0,
      tags: D.list(i_Tag),
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
  operationName: "CreateRule",
})) as any;

export type CreateVariableError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a variable.
 */
export const createVariable: API.OperationMethod<
  CreateVariableRequest,
  CreateVariableResult,
  CreateVariableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      dataType: 0,
      dataSource: 0,
      defaultValue: 0,
      description: 0,
      variableType: 0,
      tags: D.list(i_Tag),
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
  operationName: "CreateVariable",
})) as any;

export type DeleteBatchImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified batch import job ID record. This action does not delete the data that was batch imported.
 */
export const deleteBatchImportJob: API.OperationMethod<
  DeleteBatchImportJobRequest,
  DeleteBatchImportJobResult,
  DeleteBatchImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { jobId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBatchImportJob",
})) as any;

export type DeleteBatchPredictionJobError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a batch prediction job.
 */
export const deleteBatchPredictionJob: API.OperationMethod<
  DeleteBatchPredictionJobRequest,
  DeleteBatchPredictionJobResult,
  DeleteBatchPredictionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { jobId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBatchPredictionJob",
})) as any;

export type DeleteDetectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the detector. Before deleting a detector, you must first delete all detector versions and rule versions associated with the detector.
 *
 * When you delete a detector, Amazon Fraud Detector permanently deletes the detector and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteDetector: API.OperationMethod<
  DeleteDetectorRequest,
  DeleteDetectorResult,
  DeleteDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { detectorId: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDetector",
})) as any;

export type DeleteDetectorVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the detector version. You cannot delete detector versions that are in `ACTIVE` status.
 *
 * When you delete a detector version, Amazon Fraud Detector permanently deletes the detector and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteDetectorVersion: API.OperationMethod<
  DeleteDetectorVersionRequest,
  DeleteDetectorVersionResult,
  DeleteDetectorVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { detectorId: 0, detectorVersionId: 0 } },
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
  operationName: "DeleteDetectorVersion",
})) as any;

export type DeleteEntityTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an entity type.
 *
 * You cannot delete an entity type that is included in an event type.
 *
 * When you delete an entity type, Amazon Fraud Detector permanently deletes that entity type and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteEntityType: API.OperationMethod<
  DeleteEntityTypeRequest,
  DeleteEntityTypeResult,
  DeleteEntityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEntityType",
})) as any;

export type DeleteEventError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified event.
 *
 * When you delete an event, Amazon Fraud Detector permanently deletes that event and the event data is no longer stored in Amazon Fraud Detector.
 * If `deleteAuditHistory` is `True`, event data is available through search for up to 30 seconds after the delete operation is completed.
 */
export const deleteEvent: API.OperationMethod<
  DeleteEventRequest,
  DeleteEventResult,
  DeleteEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { eventId: 0, eventTypeName: 0, deleteAuditHistory: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEvent",
})) as any;

export type DeleteEventsByEventTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes all events of a particular event type.
 */
export const deleteEventsByEventType: API.OperationMethod<
  DeleteEventsByEventTypeRequest,
  DeleteEventsByEventTypeResult,
  DeleteEventsByEventTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { eventTypeName: 0 } },
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
  operationName: "DeleteEventsByEventType",
})) as any;

export type DeleteEventTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an event type.
 *
 * You cannot delete an event type that is used in a detector or a model.
 *
 * When you delete an event type, Amazon Fraud Detector permanently deletes that event type and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteEventType: API.OperationMethod<
  DeleteEventTypeRequest,
  DeleteEventTypeResult,
  DeleteEventTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEventType",
})) as any;

export type DeleteExternalModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a SageMaker model from Amazon Fraud Detector.
 *
 * You can remove an Amazon SageMaker model if it is not associated with a detector version. Removing a SageMaker model disconnects it from Amazon Fraud Detector, but the model remains available in SageMaker.
 */
export const deleteExternalModel: API.OperationMethod<
  DeleteExternalModelRequest,
  DeleteExternalModelResult,
  DeleteExternalModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { modelEndpoint: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteExternalModel",
})) as any;

export type DeleteLabelError =
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a label.
 *
 * You cannot delete labels that are included in an event type in Amazon Fraud Detector.
 *
 * You cannot delete a label assigned to an event ID. You must first delete the relevant event ID.
 *
 * When you delete a label, Amazon Fraud Detector permanently deletes that label and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteLabel: API.OperationMethod<
  DeleteLabelRequest,
  DeleteLabelResult,
  DeleteLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLabel",
})) as any;

export type DeleteListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the list, provided it is not used in a rule.
 *
 * When you delete a list, Amazon Fraud Detector permanently deletes that list and the elements in the list.
 */
export const deleteList: API.OperationMethod<
  DeleteListRequest,
  DeleteListResult,
  DeleteListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteList",
})) as any;

export type DeleteModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a model.
 *
 * You can delete models and model versions in Amazon Fraud Detector, provided that they are not associated with a detector version.
 *
 * When you delete a model, Amazon Fraud Detector permanently deletes that model and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteModel: API.OperationMethod<
  DeleteModelRequest,
  DeleteModelResult,
  DeleteModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { modelId: 0, modelType: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModel",
})) as any;

export type DeleteModelVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a model version.
 *
 * You can delete models and model versions in Amazon Fraud Detector, provided that they are not associated with a detector version.
 *
 * When you delete a model version, Amazon Fraud Detector permanently deletes that model version and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteModelVersion: API.OperationMethod<
  DeleteModelVersionRequest,
  DeleteModelVersionResult,
  DeleteModelVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { modelId: 0, modelType: 0, modelVersionNumber: 0 },
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
  operationName: "DeleteModelVersion",
})) as any;

export type DeleteOutcomeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an outcome.
 *
 * You cannot delete an outcome that is used in a rule version.
 *
 * When you delete an outcome, Amazon Fraud Detector permanently deletes that outcome and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteOutcome: API.OperationMethod<
  DeleteOutcomeRequest,
  DeleteOutcomeResult,
  DeleteOutcomeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteOutcome",
})) as any;

export type DeleteRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the rule. You cannot delete a rule if it is used by an `ACTIVE` or `INACTIVE` detector version.
 *
 * When you delete a rule, Amazon Fraud Detector permanently deletes that rule and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResult,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { rule: i_Rule } },
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
})) as any;

export type DeleteVariableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a variable.
 *
 * You can't delete variables that are included in an event type in Amazon Fraud Detector.
 *
 * Amazon Fraud Detector automatically deletes model output variables and SageMaker model output variables when you delete the model. You can't delete these variables manually.
 *
 * When you delete a variable, Amazon Fraud Detector permanently deletes that variable and the data is no longer stored in Amazon Fraud Detector.
 */
export const deleteVariable: API.OperationMethod<
  DeleteVariableRequest,
  DeleteVariableResult,
  DeleteVariableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { name: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteVariable",
})) as any;

export type DescribeDetectorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all versions for a specified detector.
 */
export const describeDetector: API.OperationMethod<
  DescribeDetectorRequest,
  DescribeDetectorResult,
  DescribeDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { detectorId: 0, nextToken: 0, maxResults: 0 },
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
  operationName: "DescribeDetector",
})) as any;

export type DescribeModelVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all of the model versions for the specified model type or for the specified model type and model ID. You can also get details for a single, specified model version.
 */
export const describeModelVersions: API.PaginatedOperationMethod<
  DescribeModelVersionsRequest,
  DescribeModelVersionsResult,
  DescribeModelVersionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      modelId: 0,
      modelVersionNumber: 0,
      modelType: 0,
      nextToken: 0,
      maxResults: 0,
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
  operationName: "DescribeModelVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBatchImportJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all batch import jobs or a specific job of the specified ID. This is a paginated API. If you provide a null `maxResults`,
 * this action retrieves a maximum of 50 records per page. If you provide a `maxResults`, the value must be between 1 and 50.
 * To get the next page results, provide the pagination token from the `GetBatchImportJobsResponse` as part of your request.
 * A null pagination token fetches the records from the beginning.
 */
export const getBatchImportJobs: API.PaginatedOperationMethod<
  GetBatchImportJobsRequest,
  GetBatchImportJobsResult,
  GetBatchImportJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { jobId: 0, maxResults: 0, nextToken: 0 },
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
  operationName: "GetBatchImportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetBatchPredictionJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all batch prediction jobs or a specific job if you specify a job ID. This is a paginated API. If you provide a null maxResults, this action retrieves a maximum of 50 records per page. If you provide a maxResults, the value must be between 1 and 50. To get the next page results, provide the pagination token from the GetBatchPredictionJobsResponse as part of your request. A null pagination token fetches the records from the beginning.
 */
export const getBatchPredictionJobs: API.PaginatedOperationMethod<
  GetBatchPredictionJobsRequest,
  GetBatchPredictionJobsResult,
  GetBatchPredictionJobsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { jobId: 0, maxResults: 0, nextToken: 0 },
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
  operationName: "GetBatchPredictionJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetDeleteEventsByEventTypeStatusError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the status of a `DeleteEventsByEventType` action.
 */
export const getDeleteEventsByEventTypeStatus: API.OperationMethod<
  GetDeleteEventsByEventTypeStatusRequest,
  GetDeleteEventsByEventTypeStatusResult,
  GetDeleteEventsByEventTypeStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { eventTypeName: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDeleteEventsByEventTypeStatus",
})) as any;

export type GetDetectorsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all detectors or a single detector if a `detectorId` is specified. This is a paginated API. If you
 * provide a null `maxResults`, this action retrieves a maximum of 10 records
 * per page. If you provide a `maxResults`, the value must be between 5 and 10.
 * To get the next page results, provide the pagination token from the
 * `GetDetectorsResponse` as part of your request. A null pagination token
 * fetches the records from the beginning.
 */
export const getDetectors: API.PaginatedOperationMethod<
  GetDetectorsRequest,
  GetDetectorsResult,
  GetDetectorsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { detectorId: 0, nextToken: 0, maxResults: 0 },
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
  operationName: "GetDetectors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetDetectorVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a particular detector version.
 */
export const getDetectorVersion: API.OperationMethod<
  GetDetectorVersionRequest,
  GetDetectorVersionResult,
  GetDetectorVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { detectorId: 0, detectorVersionId: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDetectorVersion",
})) as any;

export type GetEntityTypesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all entity types or a specific entity type if a name is specified. This is a paginated API. If you
 * provide a null `maxResults`, this action retrieves a maximum of 10 records
 * per page. If you provide a `maxResults`, the value must be between 5 and 10.
 * To get the next page results, provide the pagination token from the
 * `GetEntityTypesResponse` as part of your request. A null pagination token
 * fetches the records from the beginning.
 */
export const getEntityTypes: API.PaginatedOperationMethod<
  GetEntityTypesRequest,
  GetEntityTypesResult,
  GetEntityTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { name: 0, nextToken: 0, maxResults: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEntityTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details of events stored with Amazon Fraud Detector. This action does not retrieve prediction results.
 */
export const getEvent: API.OperationMethod<
  GetEventRequest,
  GetEventResult,
  GetEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { eventId: 0, eventTypeName: 0 },
    output: { event: { eventVariables: D.map(D.secret) } },
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
  operationName: "GetEvent",
})) as any;

export type GetEventPredictionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ResourceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Evaluates an event against a detector version. If a version ID is not provided, the detector’s (`ACTIVE`) version is used.
 */
export const getEventPrediction: API.OperationMethod<
  GetEventPredictionRequest,
  GetEventPredictionResult,
  GetEventPredictionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      detectorId: 0,
      detectorVersionId: 0,
      eventId: 0,
      eventTypeName: 0,
      entities: D.list(i_Entity),
      eventTimestamp: 0,
      eventVariables: 0,
      externalModelEndpointDataBlobs: D.map({ byteBuffer: 0, contentType: 0 }),
    },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ResourceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventPrediction",
})) as any;

export type GetEventPredictionMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details of the past fraud predictions for the specified event ID, event type, detector ID, and detector version ID that was generated in the specified time period.
 */
export const getEventPredictionMetadata: API.OperationMethod<
  GetEventPredictionMetadataRequest,
  GetEventPredictionMetadataResult,
  GetEventPredictionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      eventId: 0,
      eventTypeName: 0,
      detectorId: 0,
      detectorVersionId: 0,
      predictionTimestamp: 0,
    },
    output: {
      eventVariables: D.list({
        name: D.secret,
        value: D.secret,
        source: D.secret,
      }),
      rules: D.list({ expression: D.secret, expressionWithValues: D.secret }),
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
  operationName: "GetEventPredictionMetadata",
})) as any;

export type GetEventTypesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all event types or a specific event type if name is provided. This is a paginated API. If you
 * provide a null `maxResults`, this action retrieves a maximum of 10 records
 * per page. If you provide a `maxResults`, the value must be between 5 and 10.
 * To get the next page results, provide the pagination token from the
 * `GetEventTypesResponse` as part of your request. A null pagination token
 * fetches the records from the beginning.
 */
export const getEventTypes: API.PaginatedOperationMethod<
  GetEventTypesRequest,
  GetEventTypesResult,
  GetEventTypesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { name: 0, nextToken: 0, maxResults: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEventTypes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetExternalModelsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details for one or more Amazon SageMaker models that have been imported into the
 * service. This is a paginated API. If you provide a null `maxResults`, this
 * actions retrieves a maximum of 10 records per page. If you provide a
 * `maxResults`, the value must be between 5 and 10. To get the next page
 * results, provide the pagination token from the `GetExternalModelsResult` as part
 * of your request. A null pagination token fetches the records from the beginning.
 */
export const getExternalModels: API.PaginatedOperationMethod<
  GetExternalModelsRequest,
  GetExternalModelsResult,
  GetExternalModelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { modelEndpoint: 0, nextToken: 0, maxResults: 0 },
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
  operationName: "GetExternalModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetKMSEncryptionKeyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | CommonErrors;
/**
 * Gets the encryption key if a KMS key has been specified to be used to encrypt content in Amazon Fraud Detector.
 */
export const getKMSEncryptionKey: API.OperationMethod<
  GetKMSEncryptionKeyRequest,
  GetKMSEncryptionKeyResult,
  GetKMSEncryptionKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKMSEncryptionKey",
})) as any;

export type GetLabelsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all labels or a specific label if name is provided. This is a paginated API. If you
 * provide a null `maxResults`, this action retrieves a maximum of 50 records
 * per page. If you provide a `maxResults`, the value must be between 10 and 50.
 * To get the next page results, provide the pagination token from the
 * `GetGetLabelsResponse` as part of your request. A null pagination token
 * fetches the records from the beginning.
 */
export const getLabels: API.PaginatedOperationMethod<
  GetLabelsRequest,
  GetLabelsResult,
  GetLabelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { name: 0, nextToken: 0, maxResults: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetLabels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetListElementsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all the elements in the specified list.
 */
export const getListElements: API.PaginatedOperationMethod<
  GetListElementsRequest,
  GetListElementsResult,
  GetListElementsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { name: 0, nextToken: 0, maxResults: 0 },
    output: { elements: D.list(D.secret) },
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
  operationName: "GetListElements",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetListsMetadataError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the metadata of either all the lists under the account or the specified list.
 */
export const getListsMetadata: API.PaginatedOperationMethod<
  GetListsMetadataRequest,
  GetListsMetadataResult,
  GetListsMetadataError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { name: 0, nextToken: 0, maxResults: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetListsMetadata",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetModelsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets one or more models. Gets all models for the Amazon Web Services account if no model type and no model id provided. Gets all models for the Amazon Web Services account and model type, if the model type is specified but model id is not provided. Gets a specific model if (model type, model id) tuple is specified.
 *
 * This is a paginated API. If you
 * provide a null `maxResults`, this action retrieves a maximum of 10 records
 * per page. If you provide a `maxResults`, the value must be between 1 and 10.
 * To get the next page results, provide the pagination token from the
 * response as part of your request. A null pagination token
 * fetches the records from the beginning.
 */
export const getModels: API.PaginatedOperationMethod<
  GetModelsRequest,
  GetModelsResult,
  GetModelsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { modelId: 0, modelType: 0, nextToken: 0, maxResults: 0 },
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
  operationName: "GetModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetModelVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the details of the specified model version.
 */
export const getModelVersion: API.OperationMethod<
  GetModelVersionRequest,
  GetModelVersionResult,
  GetModelVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { modelId: 0, modelType: 0, modelVersionNumber: 0 },
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
  operationName: "GetModelVersion",
})) as any;

export type GetOutcomesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets one or more outcomes. This is a paginated
 * API. If you provide a null `maxResults`, this actions retrieves a maximum of
 * 100 records per page. If you provide a `maxResults`, the value must be
 * between 50 and 100. To get the next page results, provide the pagination token from the
 * `GetOutcomesResult` as part of your request. A null pagination token
 * fetches the records from the beginning.
 */
export const getOutcomes: API.PaginatedOperationMethod<
  GetOutcomesRequest,
  GetOutcomesResult,
  GetOutcomesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { name: 0, nextToken: 0, maxResults: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetOutcomes",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetRulesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get all rules for a detector (paginated) if `ruleId` and `ruleVersion` are not specified. Gets all rules for the detector and the `ruleId` if present (paginated). Gets a specific rule if both the `ruleId` and the `ruleVersion` are specified.
 *
 * This is a paginated API. Providing null maxResults results in retrieving maximum of 100 records per page. If you provide maxResults the value must be between 50 and 100. To get the next page result, a provide a pagination token from GetRulesResult as part of your request. Null pagination token fetches the records from the beginning.
 */
export const getRules: API.PaginatedOperationMethod<
  GetRulesRequest,
  GetRulesResult,
  GetRulesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      ruleId: 0,
      detectorId: 0,
      ruleVersion: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { ruleDetails: D.list({ expression: D.secret }) },
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
  operationName: "GetRules",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type GetVariablesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets all of the variables or the specific variable. This is a
 * paginated API. Providing null `maxSizePerPage` results in retrieving maximum of
 * 100 records per page. If you provide `maxSizePerPage` the value must be between
 * 50 and 100. To get the next page result, a provide a pagination token from
 * `GetVariablesResult` as part of your request. Null pagination token
 * fetches the records from the beginning.
 */
export const getVariables: API.PaginatedOperationMethod<
  GetVariablesRequest,
  GetVariablesResult,
  GetVariablesError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: { service: svc, input: { name: 0, nextToken: 0, maxResults: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVariables",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEventPredictionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a list of past predictions. The list can be filtered by detector ID, detector version ID, event ID, event type, or by specifying a time period.
 * If filter is not specified, the most recent prediction is returned.
 *
 * For example, the following filter lists all past predictions for `xyz` event type -
 * {
 * "eventType":{
 * "value": "xyz" }”
 * }
 *
 * This is a paginated API. If you provide a null `maxResults`, this action will retrieve a maximum of 10 records per page.
 * If you provide a `maxResults`, the value must be between 50 and 100. To get the next page results, provide
 * the `nextToken` from the response as part of your request. A null `nextToken` fetches the records from the beginning.
 */
export const listEventPredictions: API.PaginatedOperationMethod<
  ListEventPredictionsRequest,
  ListEventPredictionsResult,
  ListEventPredictionsError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: {
      eventId: i_FilterCondition,
      eventType: i_FilterCondition,
      detectorId: i_FilterCondition,
      detectorVersionId: i_FilterCondition,
      predictionTimeRange: { startTime: 0, endTime: 0 },
      nextToken: 0,
      maxResults: 0,
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
  operationName: "ListEventPredictions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all tags associated with the resource. This is a paginated API. To get the next page results, provide the pagination token from the
 * response as part of your request. A null pagination token
 * fetches the records from the beginning.
 */
export const listTagsForResource: API.PaginatedOperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient,
  unknown
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    input: { resourceARN: 0, nextToken: 0, maxResults: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PutDetectorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates a detector.
 */
export const putDetector: API.OperationMethod<
  PutDetectorRequest,
  PutDetectorResult,
  PutDetectorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      detectorId: 0,
      description: 0,
      eventTypeName: 0,
      tags: D.list(i_Tag),
    },
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
  operationName: "PutDetector",
})) as any;

export type PutEntityTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates an entity type. An entity represents who is performing the event. As part of a fraud prediction, you pass the entity ID to indicate the specific entity who performed the event. An entity type classifies the entity. Example classifications include customer, merchant, or account.
 */
export const putEntityType: API.OperationMethod<
  PutEntityTypeRequest,
  PutEntityTypeResult,
  PutEntityTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0, description: 0, tags: D.list(i_Tag) },
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
  operationName: "PutEntityType",
})) as any;

export type PutEventTypeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates an event type. An event is a business activity that is evaluated for fraud risk. With Amazon Fraud Detector, you generate fraud predictions for events. An event type defines the structure for an event sent to Amazon Fraud Detector. This includes the variables sent as part of the event, the entity performing the event (such as a customer), and the labels that classify the event. Example event types include online payment transactions, account registrations, and authentications.
 */
export const putEventType: API.OperationMethod<
  PutEventTypeRequest,
  PutEventTypeResult,
  PutEventTypeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      description: 0,
      eventVariables: 0,
      labels: 0,
      entityTypes: 0,
      eventIngestion: 0,
      tags: D.list(i_Tag),
      eventOrchestration: { eventBridgeEnabled: 0 },
    },
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
  operationName: "PutEventType",
})) as any;

export type PutExternalModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates an Amazon SageMaker model endpoint. You can also use this action to update the configuration of the model endpoint, including the IAM role and/or the mapped variables.
 */
export const putExternalModel: API.OperationMethod<
  PutExternalModelRequest,
  PutExternalModelResult,
  PutExternalModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      modelEndpoint: 0,
      modelSource: 0,
      invokeModelEndpointRoleArn: 0,
      inputConfiguration: {
        eventTypeName: 0,
        format: 0,
        useEventVariables: 0,
        jsonInputTemplate: 0,
        csvInputTemplate: 0,
      },
      outputConfiguration: {
        format: 0,
        jsonKeyToVariableMap: 0,
        csvIndexToVariableMap: 0,
      },
      modelEndpointStatus: 0,
      tags: D.list(i_Tag),
    },
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
  operationName: "PutExternalModel",
})) as any;

export type PutKMSEncryptionKeyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Specifies the KMS key to be used to encrypt content in Amazon Fraud Detector.
 */
export const putKMSEncryptionKey: API.OperationMethod<
  PutKMSEncryptionKeyRequest,
  PutKMSEncryptionKeyResult,
  PutKMSEncryptionKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { kmsEncryptionKeyArn: 0 } },
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
  operationName: "PutKMSEncryptionKey",
})) as any;

export type PutLabelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates label. A label classifies an event as fraudulent or legitimate. Labels are associated with event types and used to train supervised machine learning models in Amazon Fraud Detector.
 */
export const putLabel: API.OperationMethod<
  PutLabelRequest,
  PutLabelResult,
  PutLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0, description: 0, tags: D.list(i_Tag) },
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
  operationName: "PutLabel",
})) as any;

export type PutOutcomeError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates or updates an outcome.
 */
export const putOutcome: API.OperationMethod<
  PutOutcomeRequest,
  PutOutcomeResult,
  PutOutcomeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0, description: 0, tags: D.list(i_Tag) },
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
  operationName: "PutOutcome",
})) as any;

export type SendEventError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stores events in Amazon Fraud Detector without generating fraud predictions for those events. For example, you can use `SendEvent` to upload a historical dataset, which you can then later use to train a model.
 */
export const sendEvent: API.OperationMethod<
  SendEventRequest,
  SendEventResult,
  SendEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      eventId: 0,
      eventTypeName: 0,
      eventTimestamp: 0,
      eventVariables: 0,
      assignedLabel: 0,
      labelTimestamp: 0,
      entities: D.list(i_Entity),
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
  operationName: "SendEvent",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns tags to a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResult,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceARN: 0, tags: D.list(i_Tag) } },
  errors: [
    AccessDeniedException,
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
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResult,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { resourceARN: 0, tagKeys: 0 } },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateDetectorVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a detector version. The detector version attributes that you can update include models, external model endpoints, rules, rule execution mode, and description. You can only update a `DRAFT` detector version.
 */
export const updateDetectorVersion: API.OperationMethod<
  UpdateDetectorVersionRequest,
  UpdateDetectorVersionResult,
  UpdateDetectorVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      detectorId: 0,
      detectorVersionId: 0,
      externalModelEndpoints: 0,
      rules: D.list(i_Rule),
      description: 0,
      modelVersions: D.list(i_ModelVersion),
      ruleExecutionMode: 0,
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
  operationName: "UpdateDetectorVersion",
})) as any;

export type UpdateDetectorVersionMetadataError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the detector version's description. You can update the metadata for any detector version (`DRAFT, ACTIVE,` or
 * `INACTIVE`).
 */
export const updateDetectorVersionMetadata: API.OperationMethod<
  UpdateDetectorVersionMetadataRequest,
  UpdateDetectorVersionMetadataResult,
  UpdateDetectorVersionMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { detectorId: 0, detectorVersionId: 0, description: 0 },
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
  operationName: "UpdateDetectorVersionMetadata",
})) as any;

export type UpdateDetectorVersionStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the detector version’s status. You can perform the following promotions or
 * demotions using `UpdateDetectorVersionStatus`: `DRAFT` to `ACTIVE`, `ACTIVE` to `INACTIVE`, and `INACTIVE` to `ACTIVE`.
 */
export const updateDetectorVersionStatus: API.OperationMethod<
  UpdateDetectorVersionStatusRequest,
  UpdateDetectorVersionStatusResult,
  UpdateDetectorVersionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { detectorId: 0, detectorVersionId: 0, status: 0 },
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
  operationName: "UpdateDetectorVersionStatus",
})) as any;

export type UpdateEventLabelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified event with a new label.
 */
export const updateEventLabel: API.OperationMethod<
  UpdateEventLabelRequest,
  UpdateEventLabelResult,
  UpdateEventLabelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      eventId: 0,
      eventTypeName: 0,
      assignedLabel: 0,
      labelTimestamp: 0,
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
  operationName: "UpdateEventLabel",
})) as any;

export type UpdateListError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a list.
 */
export const updateList: API.OperationMethod<
  UpdateListRequest,
  UpdateListResult,
  UpdateListError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      name: 0,
      elements: 0,
      description: 0,
      updateMode: 0,
      variableType: 0,
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
  operationName: "UpdateList",
})) as any;

export type UpdateModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates model description.
 */
export const updateModel: API.OperationMethod<
  UpdateModelRequest,
  UpdateModelResult,
  UpdateModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { modelId: 0, modelType: 0, description: 0 },
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
  operationName: "UpdateModel",
})) as any;

export type UpdateModelVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a model version. Updating a model version retrains an existing model version using updated training data and produces a new minor version of the model. You can update the training data set location and data access role attributes using this action. This action creates and trains a new minor version of the model, for example version 1.01, 1.02, 1.03.
 */
export const updateModelVersion: API.OperationMethod<
  UpdateModelVersionRequest,
  UpdateModelVersionResult,
  UpdateModelVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      modelId: 0,
      modelType: 0,
      majorVersionNumber: 0,
      externalEventsDetail: i_ExternalEventsDetail,
      ingestedEventsDetail: i_IngestedEventsDetail,
      tags: D.list(i_Tag),
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
  operationName: "UpdateModelVersion",
})) as any;

export type UpdateModelVersionStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the status of a model version.
 *
 * You can perform the following status updates:
 *
 * - Change the `TRAINING_IN_PROGRESS` status to `TRAINING_CANCELLED`.
 *
 * - Change the `TRAINING_COMPLETE` status to `ACTIVE`.
 *
 * - Change `ACTIVE` to `INACTIVE`.
 */
export const updateModelVersionStatus: API.OperationMethod<
  UpdateModelVersionStatusRequest,
  UpdateModelVersionStatusResult,
  UpdateModelVersionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { modelId: 0, modelType: 0, modelVersionNumber: 0, status: 0 },
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
  operationName: "UpdateModelVersionStatus",
})) as any;

export type UpdateRuleMetadataError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a rule's metadata. The description attribute can be updated.
 */
export const updateRuleMetadata: API.OperationMethod<
  UpdateRuleMetadataRequest,
  UpdateRuleMetadataResult,
  UpdateRuleMetadataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, input: { rule: i_Rule, description: 0 } },
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
  operationName: "UpdateRuleMetadata",
})) as any;

export type UpdateRuleVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a rule version resulting in a new rule version. Updates a rule version resulting in a new rule version (version 1, 2, 3 ...).
 */
export const updateRuleVersion: API.OperationMethod<
  UpdateRuleVersionRequest,
  UpdateRuleVersionResult,
  UpdateRuleVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: {
      rule: i_Rule,
      description: 0,
      expression: 0,
      language: 0,
      outcomes: 0,
      tags: D.list(i_Tag),
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
  operationName: "UpdateRuleVersion",
})) as any;

export type UpdateVariableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a variable.
 */
export const updateVariable: API.OperationMethod<
  UpdateVariableRequest,
  UpdateVariableResult,
  UpdateVariableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    input: { name: 0, defaultValue: 0, description: 0, variableType: 0 },
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
  operationName: "UpdateVariable",
})) as any;

const i_Entity: D.LazyStruct = () => ({ entityType: 0, entityId: 0 });
const i_ExternalEventsDetail: D.LazyStruct = () => ({
  dataLocation: 0,
  dataAccessRoleArn: 0,
});
const i_FilterCondition: D.LazyStruct = () => ({ value: 0 });
const i_IngestedEventsDetail: D.LazyStruct = () => ({
  ingestedEventsTimeWindow: { startTime: 0, endTime: 0 },
});
const i_ModelVersion: D.LazyStruct = () => ({
  modelId: 0,
  modelType: 0,
  modelVersionNumber: 0,
  arn: 0,
});
const i_Rule: D.LazyStruct = () => ({
  detectorId: 0,
  ruleId: 0,
  ruleVersion: 0,
});
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
