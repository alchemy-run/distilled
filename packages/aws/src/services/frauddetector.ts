import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const ns = /*@__PURE__*/ T.XmlNamespace("http://hawksnest.amazonaws.com/doc/2019-11-15");
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "FraudDetector",
  serviceShapeName: "AWSHawksNestServiceFacade",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "frauddetector" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-11-15");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_1();
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://frauddetector.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://frauddetector.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://frauddetector.{R}.{D}","properties":{},"headers":{}}');

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
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ResourceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ResourceUnavailableException>()(
    "ResourceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type DataType = "STRING" | "INTEGER" | "FLOAT" | "BOOLEAN" | "DATETIME" | (string & {});
export type DataSource = "EVENT" | "MODEL_SCORE" | "EXTERNAL_MODEL_SCORE" | (string & {});
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
export type DetectorVersionStatus = "DRAFT" | "ACTIVE" | "INACTIVE" | (string & {});
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
export type TrainingDataSourceEnum = "EXTERNAL_EVENTS" | "INGESTED_EVENTS" | (string & {});
export type LabelMapper = { [key: string]: string[] | undefined };
export type UnlabeledEventsTreatment = "IGNORE" | "FRAUD" | "LEGIT" | "AUTO" | (string & {});
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
export type EventAttributeMap = { [key: string]: string | redacted.Redacted<string> | undefined };
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
  eventVariables?: { [key: string]: string | redacted.Redacted<string> | undefined };
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
export type EventVariableMap = { [key: string]: string | redacted.Redacted<string> | undefined };
export type ContentType = string;
export interface ModelEndpointDataBlob {
  byteBuffer?: Uint8Array;
  contentType?: string;
}
export type ExternalModelEndpointDataBlobMap = { [key: string]: ModelEndpointDataBlob | undefined };
export interface GetEventPredictionRequest {
  detectorId: string;
  detectorVersionId?: string;
  eventId: string;
  eventTypeName: string;
  entities: Entity[];
  eventTimestamp: string;
  eventVariables: { [key: string]: string | redacted.Redacted<string> | undefined };
  externalModelEndpointDataBlobs?: { [key: string]: ModelEndpointDataBlob | undefined };
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
export type ListOfAggregatedVariablesImpactExplanations = AggregatedVariablesImpactExplanation[];
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
export type ModelInputDataFormat = "TEXT_CSV" | "APPLICATION_JSON" | (string & {});
export type UseEventVariables = boolean;
export type ModelInputTemplate = string;
export interface ModelInputConfiguration {
  eventTypeName?: string;
  format?: ModelInputDataFormat;
  useEventVariables: boolean;
  jsonInputTemplate?: string;
  csvInputTemplate?: string;
}
export type ModelOutputDataFormat = "TEXT_CSV" | "APPLICATION_JSONLINES" | (string & {});
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
  eventVariables: { [key: string]: string | redacted.Redacted<string> | undefined };
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
export type ModelVersionStatus = "ACTIVE" | "INACTIVE" | "TRAINING_CANCELLED" | (string & {});
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
  input: __S(2370, __c74, 2) as any as S.Schema<BatchCreateVariableRequest>,
  output: __S(2373, __c74, 5) as any as S.Schema<BatchCreateVariableResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateVariable",
}));

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
  input: __S(2752, __c86, 0) as any as S.Schema<BatchGetVariableRequest>,
  output: __S(2755, __c86, 3) as any as S.Schema<BatchGetVariableResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetVariable",
}));

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
  input: __S(2848, __c89, 0) as any as S.Schema<CancelBatchImportJobRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<CancelBatchImportJobResult>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CancelBatchPredictionJobRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<CancelBatchPredictionJobResult>,
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
}));

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
  input: __S(32, __c1, 0) as any as S.Schema<CreateBatchImportJobRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<CreateBatchImportJobResult>,
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
}));

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
  input: __S(64, __c2, 0) as any as S.Schema<CreateBatchPredictionJobRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<CreateBatchPredictionJobResult>,
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
}));

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
  input: __S(96, __c3, 0) as any as S.Schema<CreateDetectorVersionRequest>,
  output: __S(97, __c3, 1) as any as S.Schema<CreateDetectorVersionResult>,
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
}));

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
  input: __S(224, __c7, 0) as any as S.Schema<CreateListRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<CreateListResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateList",
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<CreateModelRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<CreateModelResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModel",
}));

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
  input: __S(320, __c10, 0) as any as S.Schema<CreateModelVersionRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<CreateModelVersionResult>,
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
}));

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
  input: __S(480, __c15, 0) as any as S.Schema<CreateRuleRequest>,
  output: __S(512, __c16, 0) as any as S.Schema<CreateRuleResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRule",
}));

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
  input: __S(544, __c17, 0) as any as S.Schema<CreateVariableRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<CreateVariableResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateVariable",
}));

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
  input: __S(576, __c18, 0) as any as S.Schema<DeleteBatchImportJobRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<DeleteBatchImportJobResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBatchImportJob",
}));

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
  input: __S(608, __c19, 0) as any as S.Schema<DeleteBatchPredictionJobRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<DeleteBatchPredictionJobResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBatchPredictionJob",
}));

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
  input: __S(640, __c20, 0) as any as S.Schema<DeleteDetectorRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<DeleteDetectorResult>,
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
}));

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
  input: __S(672, __c21, 0) as any as S.Schema<DeleteDetectorVersionRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<DeleteDetectorVersionResult>,
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
}));

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
  input: __S(704, __c22, 0) as any as S.Schema<DeleteEntityTypeRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<DeleteEntityTypeResult>,
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
}));

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
  input: __S(736, __c23, 0) as any as S.Schema<DeleteEventRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<DeleteEventResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEvent",
}));

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
  input: __S(768, __c24, 0) as any as S.Schema<DeleteEventsByEventTypeRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<DeleteEventsByEventTypeResult>,
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
}));

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
  input: __S(800, __c25, 0) as any as S.Schema<DeleteEventTypeRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<DeleteEventTypeResult>,
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
}));

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
  input: __S(832, __c26, 0) as any as S.Schema<DeleteExternalModelRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<DeleteExternalModelResult>,
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
}));

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
  input: __S(864, __c27, 0) as any as S.Schema<DeleteLabelRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<DeleteLabelResult>,
  errors: [ConflictException, InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteLabel",
}));

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
  input: __S(896, __c28, 0) as any as S.Schema<DeleteListRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<DeleteListResult>,
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
}));

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
  input: __S(928, __c29, 0) as any as S.Schema<DeleteModelRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<DeleteModelResult>,
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
}));

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
  input: __S(960, __c30, 0) as any as S.Schema<DeleteModelVersionRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<DeleteModelVersionResult>,
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
}));

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
  input: __S(992, __c31, 0) as any as S.Schema<DeleteOutcomeRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<DeleteOutcomeResult>,
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
}));

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
  input: __S(1024, __c32, 0) as any as S.Schema<DeleteRuleRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<DeleteRuleResult>,
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
}));

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
  input: __S(1056, __c33, 0) as any as S.Schema<DeleteVariableRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<DeleteVariableResult>,
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
}));

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
  input: __S(1088, __c34, 0) as any as S.Schema<DescribeDetectorRequest>,
  output: __S(1091, __c34, 3) as any as S.Schema<DescribeDetectorResult>,
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
}));

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
  input: __S(1120, __c35, 0) as any as S.Schema<DescribeModelVersionsRequest>,
  output: __S(1147, __c35, 27) as any as S.Schema<DescribeModelVersionsResult>,
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
  input: __S(1152, __c36, 0) as any as S.Schema<GetBatchImportJobsRequest>,
  output: __S(1155, __c36, 3) as any as S.Schema<GetBatchImportJobsResult>,
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
  input: __S(1184, __c37, 0) as any as S.Schema<GetBatchPredictionJobsRequest>,
  output: __S(1187, __c37, 3) as any as S.Schema<GetBatchPredictionJobsResult>,
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
  input: __S(1216, __c38, 0) as any as S.Schema<GetDeleteEventsByEventTypeStatusRequest>,
  output: __S(1217, __c38, 1) as any as S.Schema<GetDeleteEventsByEventTypeStatusResult>,
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
}));

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
  input: __S(1248, __c39, 0) as any as S.Schema<GetDetectorsRequest>,
  output: __S(1251, __c39, 3) as any as S.Schema<GetDetectorsResult>,
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
  input: __S(1280, __c40, 0) as any as S.Schema<GetDetectorVersionRequest>,
  output: __S(1281, __c40, 1) as any as S.Schema<GetDetectorVersionResult>,
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
}));

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
  input: __S(1312, __c41, 0) as any as S.Schema<GetEntityTypesRequest>,
  output: __S(1313, __c41, 1) as any as S.Schema<GetEntityTypesResult>,
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
  input: __S(1376, __c43, 0) as any as S.Schema<GetEventRequest>,
  output: __S(1378, __c43, 2) as any as S.Schema<GetEventResult>,
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
}));

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
 * Evaluates an event against a detector version. If a version ID is not provided, the detector's (`ACTIVE`) version is used.
 */
export const getEventPrediction: API.OperationMethod<
  GetEventPredictionRequest,
  GetEventPredictionResult,
  GetEventPredictionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1442, __c45, 2) as any as S.Schema<GetEventPredictionRequest>,
  output: __S(1451, __c45, 11) as any as S.Schema<GetEventPredictionResult>,
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
}));

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
  input: __S(1504, __c47, 0) as any as S.Schema<GetEventPredictionMetadataRequest>,
  output: __S(1520, __c47, 16) as any as S.Schema<GetEventPredictionMetadataResult>,
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
}));

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
  input: __S(1536, __c48, 0) as any as S.Schema<GetEventTypesRequest>,
  output: __S(1540, __c48, 4) as any as S.Schema<GetEventTypesResult>,
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
  input: __S(1600, __c50, 0) as any as S.Schema<GetExternalModelsRequest>,
  output: __S(1603, __c50, 3) as any as S.Schema<GetExternalModelsResult>,
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
  input: __S(1664, __c52, 0) as any as S.Schema<GetKMSEncryptionKeyRequest>,
  output: __S(1666, __c52, 2) as any as S.Schema<GetKMSEncryptionKeyResult>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKMSEncryptionKey",
}));

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
  input: __S(1696, __c53, 0) as any as S.Schema<GetLabelsRequest>,
  output: __S(1697, __c53, 1) as any as S.Schema<GetLabelsResult>,
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
  input: __S(1728, __c54, 0) as any as S.Schema<GetListElementsRequest>,
  output: __S(1729, __c54, 1) as any as S.Schema<GetListElementsResult>,
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
  input: __S(1760, __c55, 0) as any as S.Schema<GetListsMetadataRequest>,
  output: __S(1763, __c55, 3) as any as S.Schema<GetListsMetadataResult>,
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
  input: __S(1792, __c56, 0) as any as S.Schema<GetModelsRequest>,
  output: __S(1795, __c56, 3) as any as S.Schema<GetModelsResult>,
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
  input: __S(1824, __c57, 0) as any as S.Schema<GetModelVersionRequest>,
  output: __S(1825, __c57, 1) as any as S.Schema<GetModelVersionResult>,
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
}));

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
  input: __S(1856, __c58, 0) as any as S.Schema<GetOutcomesRequest>,
  output: __S(1857, __c58, 1) as any as S.Schema<GetOutcomesResult>,
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
  input: __S(1888, __c59, 0) as any as S.Schema<GetRulesRequest>,
  output: __S(1891, __c59, 3) as any as S.Schema<GetRulesResult>,
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
  input: __S(1920, __c60, 0) as any as S.Schema<GetVariablesRequest>,
  output: __S(1921, __c60, 1) as any as S.Schema<GetVariablesResult>,
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
 * "value": "xyz" }"
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
  input: __S(1953, __c61, 1) as any as S.Schema<ListEventPredictionsRequest>,
  output: __S(1956, __c61, 4) as any as S.Schema<ListEventPredictionsResult>,
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
  input: __S(1984, __c62, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(1985, __c62, 1) as any as S.Schema<ListTagsForResourceResult>,
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
  input: __S(2016, __c63, 0) as any as S.Schema<PutDetectorRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<PutDetectorResult>,
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
}));

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
  input: __S(2048, __c64, 0) as any as S.Schema<PutEntityTypeRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<PutEntityTypeResult>,
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
}));

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
  input: __S(2080, __c65, 0) as any as S.Schema<PutEventTypeRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<PutEventTypeResult>,
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
}));

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
  input: __S(2112, __c66, 0) as any as S.Schema<PutExternalModelRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<PutExternalModelResult>,
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
}));

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
  input: __S(2144, __c67, 0) as any as S.Schema<PutKMSEncryptionKeyRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<PutKMSEncryptionKeyResult>,
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
}));

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
  input: __S(2176, __c68, 0) as any as S.Schema<PutLabelRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<PutLabelResult>,
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
}));

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
  input: __S(2208, __c69, 0) as any as S.Schema<PutOutcomeRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<PutOutcomeResult>,
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
}));

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
  input: __S(2240, __c70, 0) as any as S.Schema<SendEventRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<SendEventResult>,
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
}));

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
  input: __S(2272, __c71, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<TagResourceResult>,
  errors: [
    AccessDeniedException,
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
  input: __S(2304, __c72, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<UntagResourceResult>,
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(2336, __c73, 0) as any as S.Schema<UpdateDetectorVersionRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<UpdateDetectorVersionResult>,
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
}));

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
  input: __S(2432, __c76, 0) as any as S.Schema<UpdateDetectorVersionMetadataRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<UpdateDetectorVersionMetadataResult>,
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
}));

export type UpdateDetectorVersionStatusError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the detector version's status. You can perform the following promotions or
 * demotions using `UpdateDetectorVersionStatus`: `DRAFT` to `ACTIVE`, `ACTIVE` to `INACTIVE`, and `INACTIVE` to `ACTIVE`.
 */
export const updateDetectorVersionStatus: API.OperationMethod<
  UpdateDetectorVersionStatusRequest,
  UpdateDetectorVersionStatusResult,
  UpdateDetectorVersionStatusError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<UpdateDetectorVersionStatusRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<UpdateDetectorVersionStatusResult>,
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
}));

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
  input: __S(2496, __c78, 0) as any as S.Schema<UpdateEventLabelRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<UpdateEventLabelResult>,
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
}));

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
  input: __S(2528, __c79, 0) as any as S.Schema<UpdateListRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<UpdateListResult>,
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
}));

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
  input: __S(2560, __c80, 0) as any as S.Schema<UpdateModelRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<UpdateModelResult>,
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
}));

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
  input: __S(2592, __c81, 0) as any as S.Schema<UpdateModelVersionRequest>,
  output: __S(448, __c14, 0) as any as S.Schema<UpdateModelVersionResult>,
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
}));

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
  input: __S(2624, __c82, 0) as any as S.Schema<UpdateModelVersionStatusRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<UpdateModelVersionStatusResult>,
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
}));

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
  input: __S(2656, __c83, 0) as any as S.Schema<UpdateRuleMetadataRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<UpdateRuleMetadataResult>,
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
}));

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
  input: __S(2688, __c84, 0) as any as S.Schema<UpdateRuleVersionRequest>,
  output: __S(512, __c16, 0) as any as S.Schema<UpdateRuleVersionResult>,
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
}));

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
  input: __S(2720, __c85, 0) as any as S.Schema<UpdateVariableRequest>,
  output: __S(2880, __c90, 0) as any as S.Schema<UpdateVariableResult>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelBatchPredictionJobRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          inputPath: S.String,
          outputPath: S.String,
          eventTypeName: S.String,
          iamRoleArn: S.String,
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBatchImportJobRequest" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          inputPath: S.String,
          outputPath: S.String,
          eventTypeName: S.String,
          detectorName: S.String,
          detectorVersion: S.optional(S.String),
          iamRoleArn: S.String,
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateBatchPredictionJobRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          detectorId: S.String,
          description: S.optional(S.String),
          externalModelEndpoints: S.optional(__S(2784, __c87, 0)),
          rules: __S(192, __c6, 0),
          modelVersions: S.optional(__S(193, __c6, 1)),
          ruleExecutionMode: S.optional(S.String),
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateDetectorVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          detectorId: S.optional(S.String),
          detectorVersionId: S.optional(S.String),
          status: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateDetectorVersionResult" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ detectorId: S.String, ruleId: S.String, ruleVersion: S.String }),
      ).annotate({ identifier: "Rule" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String,
          modelType: S.String,
          modelVersionNumber: S.String,
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ModelVersion" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(128, __c4, 0));
    case 1:
      return S.Array(__S(160, __c5, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          elements: S.optional(__S(256, __c8, 0)),
          variableType: S.optional(S.String),
          description: S.optional(S.String),
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateListRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String,
          modelType: S.String,
          description: S.optional(S.String),
          eventTypeName: S.String,
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateModelRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String,
          modelType: S.String,
          trainingDataSource: S.String,
          trainingDataSchema: __S(354, __c11, 2),
          externalEventsDetail: S.optional(__S(416, __c13, 0)),
          ingestedEventsDetail: S.optional(__S(417, __c13, 1)),
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateModelVersionRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(2784, __c87, 0).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          labelMapper: S.optional(__S(352, __c11, 0)),
          unlabeledEventsTreatment: S.optional(S.String),
        }),
      ).annotate({ identifier: "LabelSchema" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          modelVariables: __S(2784, __c87, 0),
          labelSchema: S.optional(__S(353, __c11, 1)),
        }),
      ).annotate({ identifier: "TrainingDataSchema" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ startTime: S.String, endTime: S.String })).annotate({
        identifier: "IngestedEventsTimeWindow",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ dataLocation: S.String, dataAccessRoleArn: S.String }),
      ).annotate({ identifier: "ExternalEventsDetail" });
    case 1:
      return S.suspend(() => S.Struct({ ingestedEventsTimeWindow: __S(384, __c12, 0) })).annotate({
        identifier: "IngestedEventsDetail",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelId: S.optional(S.String),
          modelType: S.optional(S.String),
          modelVersionNumber: S.optional(S.String),
          status: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "CreateModelVersionResult" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleId: S.String,
          detectorId: S.String,
          description: S.optional(S.String),
          expression: SensitiveString,
          language: S.String,
          outcomes: __S(2784, __c87, 0),
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRuleRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ rule: S.optional(__S(128, __c4, 0)) }).pipe(ns)).annotate({
        identifier: "CreateRuleResult",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          dataType: S.String,
          dataSource: S.String,
          defaultValue: S.String,
          description: S.optional(S.String),
          variableType: S.optional(S.String),
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateVariableRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteBatchImportJobRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteBatchPredictionJobRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ detectorId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDetectorRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ detectorId: S.String, detectorVersionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteDetectorVersionRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEntityTypeRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          eventTypeName: S.String,
          deleteAuditHistory: S.optional(S.Boolean),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteEventRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ eventTypeName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEventsByEventTypeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventTypeName: S.optional(S.String),
          eventsDeletionStatus: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DeleteEventsByEventTypeResult" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteEventTypeRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ modelEndpoint: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteExternalModelRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteLabelRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteListRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ modelId: S.String, modelType: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteModelRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ modelId: S.String, modelType: S.String, modelVersionNumber: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteModelVersionRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteOutcomeRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ rule: __S(128, __c4, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteRuleRequest" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteVariableRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          detectorId: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeDetectorRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          detectorVersionId: S.optional(S.String),
          status: S.optional(S.String),
          description: S.optional(S.String),
          lastUpdatedTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "DetectorVersionSummary" });
    case 2:
      return S.Array(__S(1089, __c34, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          detectorId: S.optional(S.String),
          detectorVersionSummaries: S.optional(__S(1090, __c34, 2)),
          nextToken: S.optional(S.String),
          arn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeDetectorResult" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelId: S.optional(S.String),
          modelVersionNumber: S.optional(S.String),
          modelType: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DescribeModelVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          title: S.optional(S.String),
          content: S.optional(S.String),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "FileValidationMessage" });
    case 2:
      return S.Array(__S(1121, __c35, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          fieldName: S.optional(S.String),
          identifier: S.optional(S.String),
          title: S.optional(S.String),
          content: S.optional(S.String),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "FieldValidationMessage" });
    case 4:
      return S.Array(__S(1123, __c35, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          fileLevelMessages: S.optional(__S(1122, __c35, 2)),
          fieldLevelMessages: S.optional(__S(1124, __c35, 4)),
        }),
      ).annotate({ identifier: "DataValidationMetrics" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          fpr: S.optional(S.Number),
          precision: S.optional(S.Number),
          tpr: S.optional(S.Number),
          threshold: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MetricDataPoint" });
    case 7:
      return S.Array(__S(1126, __c35, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ auc: S.optional(S.Number), metricDataPoints: S.optional(__S(1127, __c35, 7)) }),
      ).annotate({ identifier: "TrainingMetrics" });
    case 9:
      return S.suspend(() =>
        S.Struct({ variableName: S.String, variableType: S.String, variableImportance: S.Number }),
      ).annotate({ identifier: "LogOddsMetric" });
    case 10:
      return S.Array(__S(1129, __c35, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ logOddsMetrics: S.optional(__S(1130, __c35, 10)) }),
      ).annotate({ identifier: "VariableImportanceMetrics" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          dataValidationMetrics: S.optional(__S(1125, __c35, 5)),
          trainingMetrics: S.optional(__S(1128, __c35, 8)),
          variableImportanceMetrics: S.optional(__S(1131, __c35, 11)),
        }),
      ).annotate({ identifier: "TrainingResult" });
    case 13:
      return S.suspend(() =>
        S.Struct({ lowerBoundValue: S.Number, upperBoundValue: S.Number }),
      ).annotate({ identifier: "UncertaintyRange" });
    case 14:
      return S.suspend(() =>
        S.Struct({ auc: S.optional(S.Number), uncertaintyRange: S.optional(__S(1133, __c35, 13)) }),
      ).annotate({ identifier: "OFIModelPerformance" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          metricDataPoints: S.optional(__S(1127, __c35, 7)),
          modelPerformance: S.optional(__S(1134, __c35, 14)),
        }),
      ).annotate({ identifier: "OFITrainingMetricsValue" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          cr: S.optional(S.Number),
          adr: S.optional(S.Number),
          threshold: S.optional(S.Number),
          atodr: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ATIMetricDataPoint" });
    case 17:
      return S.Array(__S(1136, __c35, 16));
    case 18:
      return S.suspend(() => S.Struct({ asi: S.optional(S.Number) })).annotate({
        identifier: "ATIModelPerformance",
      });
    case 19:
      return S.suspend(() =>
        S.Struct({
          metricDataPoints: S.optional(__S(1137, __c35, 17)),
          modelPerformance: S.optional(__S(1138, __c35, 18)),
        }),
      ).annotate({ identifier: "ATITrainingMetricsValue" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          ofi: S.optional(__S(1135, __c35, 15)),
          tfi: S.optional(__S(1135, __c35, 15)),
          ati: S.optional(__S(1139, __c35, 19)),
        }),
      ).annotate({ identifier: "TrainingMetricsV2" });
    case 21:
      return S.suspend(() =>
        S.Struct({ variableNames: __S(2784, __c87, 0), aggregatedVariablesImportance: S.Number }),
      ).annotate({ identifier: "AggregatedLogOddsMetric" });
    case 22:
      return S.Array(__S(1141, __c35, 21));
    case 23:
      return S.suspend(() =>
        S.Struct({ logOddsMetrics: S.optional(__S(1142, __c35, 22)) }),
      ).annotate({ identifier: "AggregatedVariablesImportanceMetrics" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          dataValidationMetrics: S.optional(__S(1125, __c35, 5)),
          trainingMetricsV2: S.optional(__S(1140, __c35, 20)),
          variableImportanceMetrics: S.optional(__S(1131, __c35, 11)),
          aggregatedVariablesImportanceMetrics: S.optional(__S(1143, __c35, 23)),
        }),
      ).annotate({ identifier: "TrainingResultV2" });
    case 25:
      return S.suspend(() =>
        S.Struct({
          modelId: S.optional(S.String),
          modelType: S.optional(S.String),
          modelVersionNumber: S.optional(S.String),
          status: S.optional(S.String),
          trainingDataSource: S.optional(S.String),
          trainingDataSchema: S.optional(__S(354, __c11, 2)),
          externalEventsDetail: S.optional(__S(416, __c13, 0)),
          ingestedEventsDetail: S.optional(__S(417, __c13, 1)),
          trainingResult: S.optional(__S(1132, __c35, 12)),
          lastUpdatedTime: S.optional(S.String),
          createdTime: S.optional(S.String),
          arn: S.optional(S.String),
          trainingResultV2: S.optional(__S(1144, __c35, 24)),
        }),
      ).annotate({ identifier: "ModelVersionDetail" });
    case 26:
      return S.Array(__S(1145, __c35, 25));
    case 27:
      return S.suspend(() =>
        S.Struct({
          modelVersionDetails: S.optional(__S(1146, __c35, 26)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "DescribeModelVersionsResult" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetBatchImportJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.optional(S.String),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
          startTime: S.optional(S.String),
          completionTime: S.optional(S.String),
          inputPath: S.optional(S.String),
          outputPath: S.optional(S.String),
          eventTypeName: S.optional(S.String),
          iamRoleArn: S.optional(S.String),
          arn: S.optional(S.String),
          processedRecordsCount: S.optional(S.Number),
          failedRecordsCount: S.optional(S.Number),
          totalRecordsCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "BatchImport" });
    case 2:
      return S.Array(__S(1153, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          batchImports: S.optional(__S(1154, __c36, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetBatchImportJobsResult" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetBatchPredictionJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.optional(S.String),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
          startTime: S.optional(S.String),
          completionTime: S.optional(S.String),
          lastHeartbeatTime: S.optional(S.String),
          inputPath: S.optional(S.String),
          outputPath: S.optional(S.String),
          eventTypeName: S.optional(S.String),
          detectorName: S.optional(S.String),
          detectorVersion: S.optional(S.String),
          iamRoleArn: S.optional(S.String),
          arn: S.optional(S.String),
          processedRecordsCount: S.optional(S.Number),
          totalRecordsCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "BatchPrediction" });
    case 2:
      return S.Array(__S(1185, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          batchPredictions: S.optional(__S(1186, __c37, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetBatchPredictionJobsResult" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ eventTypeName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDeleteEventsByEventTypeStatusRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventTypeName: S.optional(S.String),
          eventsDeletionStatus: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetDeleteEventsByEventTypeStatusResult" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          detectorId: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetDetectorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          detectorId: S.optional(S.String),
          description: S.optional(S.String),
          eventTypeName: S.optional(S.String),
          lastUpdatedTime: S.optional(S.String),
          createdTime: S.optional(S.String),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Detector" });
    case 2:
      return S.Array(__S(1249, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          detectors: S.optional(__S(1250, __c39, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetDetectorsResult" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ detectorId: S.String, detectorVersionId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetDetectorVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          detectorId: S.optional(S.String),
          detectorVersionId: S.optional(S.String),
          description: S.optional(S.String),
          externalModelEndpoints: S.optional(__S(2784, __c87, 0)),
          modelVersions: S.optional(__S(193, __c6, 1)),
          rules: S.optional(__S(192, __c6, 0)),
          status: S.optional(S.String),
          lastUpdatedTime: S.optional(S.String),
          createdTime: S.optional(S.String),
          ruleExecutionMode: S.optional(S.String),
          arn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetDetectorVersionResult" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetEntityTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          entityTypes: S.optional(__S(1345, __c42, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetEntityTypesResult" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          lastUpdatedTime: S.optional(S.String),
          createdTime: S.optional(S.String),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "EntityType" });
    case 1:
      return S.Array(__S(1344, __c42, 0));
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ eventId: S.String, eventTypeName: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetEventRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventId: S.optional(S.String),
          eventTypeName: S.optional(S.String),
          eventTimestamp: S.optional(S.String),
          eventVariables: S.optional(__S(1408, __c44, 0)),
          currentLabel: S.optional(S.String),
          labelTimestamp: S.optional(S.String),
          entities: S.optional(__S(1410, __c44, 2)),
        }),
      ).annotate({ identifier: "Event" });
    case 2:
      return S.suspend(() =>
        S.Struct({ event: S.optional(__S(1377, __c43, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetEventResult" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
    case 1:
      return S.suspend(() => S.Struct({ entityType: S.String, entityId: S.String })).annotate({
        identifier: "Entity",
      });
    case 2:
      return S.Array(__S(1409, __c44, 1));
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ byteBuffer: S.optional(T.Blob), contentType: S.optional(S.String) }),
      ).annotate({ identifier: "ModelEndpointDataBlob" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(1440, __c45, 0).pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          detectorId: S.String,
          detectorVersionId: S.optional(S.String),
          eventId: S.String,
          eventTypeName: S.String,
          entities: __S(1410, __c44, 2),
          eventTimestamp: S.String,
          eventVariables: __S(1408, __c44, 0),
          externalModelEndpointDataBlobs: S.optional(__S(1441, __c45, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetEventPredictionRequest" });
    case 3:
      return S.Record(S.String, /*@__PURE__*/ S.Number.pipe(S.optional));
    case 4:
      return S.suspend(() =>
        S.Struct({
          modelVersion: S.optional(__S(160, __c5, 0)),
          scores: S.optional(__S(1443, __c45, 3)),
        }),
      ).annotate({ identifier: "ModelScores" });
    case 5:
      return S.Array(__S(1444, __c45, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ ruleId: S.optional(S.String), outcomes: S.optional(__S(2784, __c87, 0)) }),
      ).annotate({ identifier: "RuleResult" });
    case 7:
      return S.Array(__S(1446, __c45, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ modelEndpoint: S.optional(S.String), modelSource: S.optional(S.String) }),
      ).annotate({ identifier: "ExternalModelSummary" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          externalModel: S.optional(__S(1448, __c45, 8)),
          outputs: S.optional(__S(1472, __c46, 0)),
        }),
      ).annotate({ identifier: "ExternalModelOutputs" });
    case 10:
      return S.Array(__S(1449, __c45, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          modelScores: S.optional(__S(1445, __c45, 5)),
          ruleResults: S.optional(__S(1447, __c45, 7)),
          externalModelOutputs: S.optional(__S(1450, __c45, 10)),
        }).pipe(ns),
      ).annotate({ identifier: "GetEventPredictionResult" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          eventTypeName: S.String,
          detectorId: S.String,
          detectorVersionId: S.String,
          predictionTimestamp: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetEventPredictionMetadataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(SensitiveString),
          value: S.optional(SensitiveString),
          source: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "EventVariableSummary" });
    case 2:
      return S.Array(__S(1505, __c47, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ruleId: S.optional(S.String),
          ruleVersion: S.optional(S.String),
          expression: S.optional(SensitiveString),
          expressionWithValues: S.optional(SensitiveString),
          outcomes: S.optional(__S(2784, __c87, 0)),
          evaluated: S.optional(S.Boolean),
          matched: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "EvaluatedRule" });
    case 4:
      return S.Array(__S(1507, __c47, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          eventVariableName: S.optional(S.String),
          relativeImpact: S.optional(S.String),
          logOddsImpact: S.optional(S.Number),
        }),
      ).annotate({ identifier: "VariableImpactExplanation" });
    case 6:
      return S.Array(__S(1509, __c47, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          eventVariableNames: S.optional(__S(2784, __c87, 0)),
          relativeImpact: S.optional(S.String),
          logOddsImpact: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AggregatedVariablesImpactExplanation" });
    case 8:
      return S.Array(__S(1511, __c47, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          variableImpactExplanations: S.optional(__S(1510, __c47, 6)),
          aggregatedVariablesImpactExplanations: S.optional(__S(1512, __c47, 8)),
        }),
      ).annotate({ identifier: "PredictionExplanations" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          outputVariableName: S.optional(S.String),
          evaluationScore: S.optional(S.String),
          predictionExplanations: S.optional(__S(1513, __c47, 9)),
        }),
      ).annotate({ identifier: "ModelVersionEvaluation" });
    case 11:
      return S.Array(__S(1514, __c47, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          modelId: S.optional(S.String),
          modelVersion: S.optional(S.String),
          modelType: S.optional(S.String),
          evaluations: S.optional(__S(1515, __c47, 11)),
        }),
      ).annotate({ identifier: "EvaluatedModelVersion" });
    case 13:
      return S.Array(__S(1516, __c47, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          modelEndpoint: S.optional(S.String),
          useEventVariables: S.optional(S.Boolean),
          inputVariables: S.optional(__S(1472, __c46, 0)),
          outputVariables: S.optional(__S(1472, __c46, 0)),
        }),
      ).annotate({ identifier: "EvaluatedExternalModel" });
    case 15:
      return S.Array(__S(1518, __c47, 14));
    case 16:
      return S.suspend(() =>
        S.Struct({
          eventId: S.optional(S.String),
          eventTypeName: S.optional(S.String),
          entityId: S.optional(S.String),
          entityType: S.optional(S.String),
          eventTimestamp: S.optional(S.String),
          detectorId: S.optional(S.String),
          detectorVersionId: S.optional(S.String),
          detectorVersionStatus: S.optional(S.String),
          eventVariables: S.optional(__S(1506, __c47, 2)),
          rules: S.optional(__S(1508, __c47, 4)),
          ruleExecutionMode: S.optional(S.String),
          outcomes: S.optional(__S(2784, __c87, 0)),
          evaluatedModelVersions: S.optional(__S(1517, __c47, 13)),
          evaluatedExternalModels: S.optional(__S(1519, __c47, 15)),
          predictionTimestamp: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetEventPredictionMetadataResult" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetEventTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          numberOfEvents: S.optional(S.Number),
          eventDataSizeInBytes: S.optional(S.Number),
          leastRecentEvent: S.optional(S.String),
          mostRecentEvent: S.optional(S.String),
          lastUpdatedTime: S.optional(S.String),
        }),
      ).annotate({ identifier: "IngestedEventStatistics" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          eventVariables: S.optional(__S(2784, __c87, 0)),
          labels: S.optional(__S(2784, __c87, 0)),
          entityTypes: S.optional(__S(2784, __c87, 0)),
          eventIngestion: S.optional(S.String),
          ingestedEventStatistics: S.optional(__S(1537, __c48, 1)),
          lastUpdatedTime: S.optional(S.String),
          createdTime: S.optional(S.String),
          arn: S.optional(S.String),
          eventOrchestration: S.optional(__S(1568, __c49, 0)),
        }),
      ).annotate({ identifier: "EventType" });
    case 3:
      return S.Array(__S(1538, __c48, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          eventTypes: S.optional(__S(1539, __c48, 3)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetEventTypesResult" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ eventBridgeEnabled: S.Boolean })).annotate({
        identifier: "EventOrchestration",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelEndpoint: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetExternalModelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          modelEndpoint: S.optional(S.String),
          modelSource: S.optional(S.String),
          invokeModelEndpointRoleArn: S.optional(S.String),
          inputConfiguration: S.optional(__S(1632, __c51, 0)),
          outputConfiguration: S.optional(__S(1633, __c51, 1)),
          modelEndpointStatus: S.optional(S.String),
          lastUpdatedTime: S.optional(S.String),
          createdTime: S.optional(S.String),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExternalModel" });
    case 2:
      return S.Array(__S(1601, __c50, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          externalModels: S.optional(__S(1602, __c50, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetExternalModelsResult" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventTypeName: S.optional(S.String),
          format: S.optional(S.String),
          useEventVariables: S.Boolean,
          jsonInputTemplate: S.optional(S.String),
          csvInputTemplate: S.optional(S.String),
        }),
      ).annotate({ identifier: "ModelInputConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          format: S.String,
          jsonKeyToVariableMap: S.optional(__S(1472, __c46, 0)),
          csvIndexToVariableMap: S.optional(__S(1472, __c46, 0)),
        }),
      ).annotate({ identifier: "ModelOutputConfiguration" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetKMSEncryptionKeyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ kmsEncryptionKeyArn: S.optional(S.String) })).annotate({
        identifier: "KMSKey",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({ kmsKey: S.optional(__S(1665, __c52, 1)) }).pipe(ns),
      ).annotate({ identifier: "GetKMSEncryptionKeyResult" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetLabelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ labels: S.optional(__S(1345, __c42, 1)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "GetLabelsResult" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetListElementsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ elements: S.optional(__S(256, __c8, 0)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "GetListElementsResult" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetListsMetadataRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          variableType: S.optional(S.String),
          createdTime: S.optional(S.String),
          updatedTime: S.optional(S.String),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "AllowDenyList" });
    case 2:
      return S.Array(__S(1761, __c55, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ lists: S.optional(__S(1762, __c55, 2)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "GetListsMetadataResult" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelId: S.optional(S.String),
          modelType: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetModelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          modelId: S.optional(S.String),
          modelType: S.optional(S.String),
          description: S.optional(S.String),
          eventTypeName: S.optional(S.String),
          createdTime: S.optional(S.String),
          lastUpdatedTime: S.optional(S.String),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Model" });
    case 2:
      return S.Array(__S(1793, __c56, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String), models: S.optional(__S(1794, __c56, 2)) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "GetModelsResult" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ modelId: S.String, modelType: S.String, modelVersionNumber: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetModelVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          modelId: S.optional(S.String),
          modelType: S.optional(S.String),
          modelVersionNumber: S.optional(S.String),
          trainingDataSource: S.optional(S.String),
          trainingDataSchema: S.optional(__S(354, __c11, 2)),
          externalEventsDetail: S.optional(__S(416, __c13, 0)),
          ingestedEventsDetail: S.optional(__S(417, __c13, 1)),
          status: S.optional(S.String),
          arn: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetModelVersionResult" });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetOutcomesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          outcomes: S.optional(__S(1345, __c42, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetOutcomesResult" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ruleId: S.optional(S.String),
          detectorId: S.String,
          ruleVersion: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ruleId: S.optional(S.String),
          description: S.optional(S.String),
          detectorId: S.optional(S.String),
          ruleVersion: S.optional(S.String),
          expression: S.optional(SensitiveString),
          language: S.optional(S.String),
          outcomes: S.optional(__S(2784, __c87, 0)),
          lastUpdatedTime: S.optional(S.String),
          createdTime: S.optional(S.String),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuleDetail" });
    case 2:
      return S.Array(__S(1889, __c59, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          ruleDetails: S.optional(__S(1890, __c59, 2)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetRulesResult" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetVariablesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          variables: S.optional(__S(2817, __c88, 1)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "GetVariablesResult" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ value: S.optional(S.String) })).annotate({
        identifier: "FilterCondition",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventId: S.optional(__S(1952, __c61, 0)),
          eventType: S.optional(__S(1952, __c61, 0)),
          detectorId: S.optional(__S(1952, __c61, 0)),
          detectorVersionId: S.optional(__S(1952, __c61, 0)),
          predictionTimeRange: S.optional(__S(384, __c12, 0)),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEventPredictionsRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          eventId: S.optional(S.String),
          eventTypeName: S.optional(S.String),
          eventTimestamp: S.optional(S.String),
          predictionTimestamp: S.optional(S.String),
          detectorId: S.optional(S.String),
          detectorVersionId: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventPredictionSummary" });
    case 3:
      return S.Array(__S(1954, __c61, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          eventPredictionSummaries: S.optional(__S(1955, __c61, 3)),
          nextToken: S.optional(S.String),
        }).pipe(ns),
      ).annotate({ identifier: "ListEventPredictionsResult" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceARN: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ tags: S.optional(__S(2401, __c75, 1)), nextToken: S.optional(S.String) }).pipe(
          ns,
        ),
      ).annotate({ identifier: "ListTagsForResourceResult" });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          detectorId: S.String,
          description: S.optional(S.String),
          eventTypeName: S.String,
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutDetectorRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutEntityTypeRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          eventVariables: __S(2784, __c87, 0),
          labels: S.optional(__S(2784, __c87, 0)),
          entityTypes: __S(2784, __c87, 0),
          eventIngestion: S.optional(S.String),
          tags: S.optional(__S(2401, __c75, 1)),
          eventOrchestration: S.optional(__S(1568, __c49, 0)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutEventTypeRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelEndpoint: S.String,
          modelSource: S.String,
          invokeModelEndpointRoleArn: S.String,
          inputConfiguration: __S(1632, __c51, 0),
          outputConfiguration: __S(1633, __c51, 1),
          modelEndpointStatus: S.String,
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutExternalModelRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ kmsEncryptionKeyArn: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutKMSEncryptionKeyRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutLabelRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "PutOutcomeRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          eventTypeName: S.String,
          eventTimestamp: S.String,
          eventVariables: __S(1408, __c44, 0),
          assignedLabel: S.optional(S.String),
          labelTimestamp: S.optional(S.String),
          entities: __S(1410, __c44, 2),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SendEventRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceARN: S.String, tags: __S(2401, __c75, 1) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceARN: S.String, tagKeys: __S(2784, __c87, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          detectorId: S.String,
          detectorVersionId: S.String,
          externalModelEndpoints: __S(2784, __c87, 0),
          rules: __S(192, __c6, 0),
          description: S.optional(S.String),
          modelVersions: S.optional(__S(193, __c6, 1)),
          ruleExecutionMode: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateDetectorVersionRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          dataType: S.optional(S.String),
          dataSource: S.optional(S.String),
          defaultValue: S.optional(S.String),
          description: S.optional(S.String),
          variableType: S.optional(S.String),
        }),
      ).annotate({ identifier: "VariableEntry" });
    case 1:
      return S.Array(__S(2368, __c74, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          variableEntries: __S(2369, __c74, 1),
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchCreateVariableRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          code: S.optional(S.Number),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchCreateVariableError" });
    case 4:
      return S.Array(__S(2371, __c74, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ errors: S.optional(__S(2372, __c74, 4)) }).pipe(ns),
      ).annotate({ identifier: "BatchCreateVariableResult" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(2400, __c75, 0));
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ detectorId: S.String, detectorVersionId: S.String, description: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateDetectorVersionMetadataRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ detectorId: S.String, detectorVersionId: S.String, status: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateDetectorVersionStatusRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          eventTypeName: S.String,
          assignedLabel: S.String,
          labelTimestamp: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateEventLabelRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          elements: S.optional(__S(256, __c8, 0)),
          description: S.optional(S.String),
          updateMode: S.optional(S.String),
          variableType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateListRequest" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String,
          modelType: S.String,
          description: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateModelRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String,
          modelType: S.String,
          majorVersionNumber: S.String,
          externalEventsDetail: S.optional(__S(416, __c13, 0)),
          ingestedEventsDetail: S.optional(__S(417, __c13, 1)),
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateModelVersionRequest" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String,
          modelType: S.String,
          modelVersionNumber: S.String,
          status: S.String,
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateModelVersionStatusRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ rule: __S(128, __c4, 0), description: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateRuleMetadataRequest" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          rule: __S(128, __c4, 0),
          description: S.optional(S.String),
          expression: SensitiveString,
          language: S.String,
          outcomes: __S(2784, __c87, 0),
          tags: S.optional(__S(2401, __c75, 1)),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateRuleVersionRequest" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          defaultValue: S.optional(S.String),
          description: S.optional(S.String),
          variableType: S.optional(S.String),
        }).pipe(T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateVariableRequest" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ names: __S(2784, __c87, 0) }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "BatchGetVariableRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          code: S.optional(S.Number),
          message: S.optional(S.String),
        }),
      ).annotate({ identifier: "BatchGetVariableError" });
    case 2:
      return S.Array(__S(2753, __c86, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          variables: S.optional(__S(2817, __c88, 1)),
          errors: S.optional(__S(2754, __c86, 2)),
        }).pipe(ns),
      ).annotate({ identifier: "BatchGetVariableResult" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          dataType: S.optional(S.String),
          dataSource: S.optional(S.String),
          defaultValue: S.optional(S.String),
          description: S.optional(S.String),
          variableType: S.optional(S.String),
          lastUpdatedTime: S.optional(S.String),
          createdTime: S.optional(S.String),
          arn: S.optional(S.String),
        }),
      ).annotate({ identifier: "Variable" });
    case 1:
      return S.Array(__S(2816, __c88, 0));
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobId: S.String }).pipe(
          T.all(ns, T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CancelBatchImportJobRequest" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({}).pipe(ns)).annotate({
        identifier: "CancelBatchImportJobResult",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
