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
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Bedrock",
  serviceShapeName: "AmazonBedrockControlPlaneService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "bedrock" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-04-20");
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
              `https://bedrock-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://bedrock-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://bedrock.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://bedrock.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://bedrock.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceInUseException
  extends /*@__PURE__*/ S.TaggedError<ResourceInUseException>()(
    "ResourceInUseException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(503),
  ).pipe(C.withServerError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type AdvancedPromptOptimizationJobIdentifier = string;
export type AdvancedPromptOptimizationJobIdentifiers = string[];
export interface BatchDeleteAdvancedPromptOptimizationJobRequest {
  jobIdentifiers: string[];
}
export interface BatchDeleteAdvancedPromptOptimizationJobError_ {
  jobIdentifier: string;
  code: string;
  message?: string;
}
export type BatchDeleteAdvancedPromptOptimizationJobErrors =
  BatchDeleteAdvancedPromptOptimizationJobError_[];
export type AdvancedPromptOptimizationJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "PartiallyCompleted"
  | "Stopping"
  | "Stopped"
  | "Deleting"
  | (string & {});
export interface BatchDeleteAdvancedPromptOptimizationJobItem {
  jobIdentifier: string;
  jobStatus: AdvancedPromptOptimizationJobStatus;
}
export type BatchDeleteAdvancedPromptOptimizationJobItems =
  BatchDeleteAdvancedPromptOptimizationJobItem[];
export interface BatchDeleteAdvancedPromptOptimizationJobResponse {
  errors: BatchDeleteAdvancedPromptOptimizationJobError_[];
  advancedPromptOptimizationJobs: BatchDeleteAdvancedPromptOptimizationJobItem[];
}
export type EvaluationJobIdentifier = string | redacted.Redacted<string>;
export type EvaluationJobIdentifiers = (string | redacted.Redacted<string>)[];
export interface BatchDeleteEvaluationJobRequest {
  jobIdentifiers: (string | redacted.Redacted<string>)[];
}
export interface BatchDeleteEvaluationJobError_ {
  jobIdentifier: string | redacted.Redacted<string>;
  code: string;
  message?: string;
}
export type BatchDeleteEvaluationJobErrors = BatchDeleteEvaluationJobError_[];
export type EvaluationJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | "Deleting"
  | (string & {});
export interface BatchDeleteEvaluationJobItem {
  jobIdentifier: string | redacted.Redacted<string>;
  jobStatus: EvaluationJobStatus;
}
export type BatchDeleteEvaluationJobItems = BatchDeleteEvaluationJobItem[];
export interface BatchDeleteEvaluationJobResponse {
  errors: BatchDeleteEvaluationJobError_[];
  evaluationJobs: BatchDeleteEvaluationJobItem[];
}
export type AutomatedReasoningPolicyArn = string;
export type AutomatedReasoningPolicyBuildWorkflowId = string;
export interface CancelAutomatedReasoningPolicyBuildWorkflowRequest {
  policyArn: string;
  buildWorkflowId: string;
}
export interface CancelAutomatedReasoningPolicyBuildWorkflowResponse {}
export type AdvancedPromptOptimizationJobName = string;
export type AdvancedPromptOptimizationJobDescription = string;
export type IdempotencyToken = string;
export type S3Uri = string;
export interface AdvancedPromptOptimizationInputConfig {
  s3Uri: string;
}
export type S3UriFolder = string;
export interface AdvancedPromptOptimizationOutputConfig {
  s3Uri: string;
}
export type KmsKeyArn = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export type AdvancedPromptOptimizationModelIdentifier = string;
export type NonEmptyStringList = string[];
export interface InferenceConfiguration {
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  stopSequences?: string[];
}
export type AdditionalModelRequestFieldsKey = string;
export type AdditionalModelRequestFieldsValue = unknown;
export type AdditionalModelRequestFields = { [key: string]: any | undefined };
export interface ModelConfiguration {
  modelId: string;
  inferenceConfig?: InferenceConfiguration;
  additionalModelRequestFields?: { [key: string]: any | undefined };
}
export type ModelConfigurations = ModelConfiguration[];
export interface CreateAdvancedPromptOptimizationJobRequest {
  jobName: string;
  jobDescription?: string;
  clientToken?: string;
  inputConfig: AdvancedPromptOptimizationInputConfig;
  outputConfig: AdvancedPromptOptimizationOutputConfig;
  encryptionKeyArn?: string;
  tags?: Tag[];
  modelConfigurations: ModelConfiguration[];
}
export type AdvancedPromptOptimizationJobArn = string;
export interface CreateAdvancedPromptOptimizationJobResponse {
  jobArn: string;
}
export type AutomatedReasoningPolicyName = string | redacted.Redacted<string>;
export type AutomatedReasoningPolicyDescription = string | redacted.Redacted<string>;
export type AutomatedReasoningPolicyFormatVersion = string;
export type AutomatedReasoningPolicyDefinitionTypeName = string | redacted.Redacted<string>;
export type AutomatedReasoningPolicyDefinitionTypeDescription = string | redacted.Redacted<string>;
export type AutomatedReasoningPolicyDefinitionTypeValueName = string;
export type AutomatedReasoningPolicyDefinitionTypeValueDescription =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyDefinitionTypeValue {
  value: string;
  description?: string | redacted.Redacted<string>;
}
export type AutomatedReasoningPolicyDefinitionTypeValueList =
  AutomatedReasoningPolicyDefinitionTypeValue[];
export interface AutomatedReasoningPolicyDefinitionType {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  values: AutomatedReasoningPolicyDefinitionTypeValue[];
}
export type AutomatedReasoningPolicyDefinitionTypeList = AutomatedReasoningPolicyDefinitionType[];
export type AutomatedReasoningPolicyDefinitionRuleId = string;
export type AutomatedReasoningPolicyDefinitionRuleExpression = string | redacted.Redacted<string>;
export type AutomatedReasoningPolicyDefinitionRuleAlternateExpression =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyDefinitionRule {
  id: string;
  expression: string | redacted.Redacted<string>;
  alternateExpression?: string | redacted.Redacted<string>;
}
export type AutomatedReasoningPolicyDefinitionRuleList = AutomatedReasoningPolicyDefinitionRule[];
export type AutomatedReasoningPolicyDefinitionVariableName = string | redacted.Redacted<string>;
export type AutomatedReasoningPolicyDefinitionVariableDescription =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyDefinitionVariable {
  name: string | redacted.Redacted<string>;
  type: string | redacted.Redacted<string>;
  description: string | redacted.Redacted<string>;
}
export type AutomatedReasoningPolicyDefinitionVariableList =
  AutomatedReasoningPolicyDefinitionVariable[];
export interface AutomatedReasoningPolicyDefinition {
  version?: string;
  types?: AutomatedReasoningPolicyDefinitionType[];
  rules?: AutomatedReasoningPolicyDefinitionRule[];
  variables?: AutomatedReasoningPolicyDefinitionVariable[];
}
export type KmsKeyId = string;
export interface CreateAutomatedReasoningPolicyRequest {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  clientRequestToken?: string;
  policyDefinition?: AutomatedReasoningPolicyDefinition;
  kmsKeyId?: string;
  tags?: Tag[];
}
export type AutomatedReasoningPolicyVersion = string;
export type AutomatedReasoningPolicyHash = string;
export interface CreateAutomatedReasoningPolicyResponse {
  policyArn: string;
  version: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  definitionHash?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type AutomatedReasoningPolicyTestGuardContent = string | redacted.Redacted<string>;
export type AutomatedReasoningPolicyTestQueryContent = string | redacted.Redacted<string>;
export type AutomatedReasoningCheckResult =
  | "VALID"
  | "INVALID"
  | "SATISFIABLE"
  | "IMPOSSIBLE"
  | "TRANSLATION_AMBIGUOUS"
  | "TOO_COMPLEX"
  | "NO_TRANSLATION"
  | (string & {});
export type AutomatedReasoningCheckTranslationConfidence = number;
export interface CreateAutomatedReasoningPolicyTestCaseRequest {
  policyArn: string;
  guardContent: string | redacted.Redacted<string>;
  queryContent?: string | redacted.Redacted<string>;
  expectedAggregatedFindingsResult: AutomatedReasoningCheckResult;
  clientRequestToken?: string;
  confidenceThreshold?: number;
}
export type AutomatedReasoningPolicyTestCaseId = string;
export interface CreateAutomatedReasoningPolicyTestCaseResponse {
  policyArn: string;
  testCaseId: string;
}
export interface CreateAutomatedReasoningPolicyVersionRequest {
  policyArn: string;
  clientRequestToken?: string;
  lastUpdatedDefinitionHash: string;
  tags?: Tag[];
}
export interface CreateAutomatedReasoningPolicyVersionResponse {
  policyArn: string;
  version: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  definitionHash: string;
  createdAt: Date;
}
export type CustomModelName = string;
export interface S3DataSource {
  s3Uri: string;
}
export type ModelDataSource = { s3DataSource: S3DataSource };
export type ModelPackageArn = string;
export interface ModelPackageArnDataSource {
  modelPackageArn: string;
}
export type CustomModelDataSource = { modelPackageArnDataSource: ModelPackageArnDataSource };
export type RoleArn = string;
export interface CreateCustomModelRequest {
  modelName: string;
  modelSourceConfig?: ModelDataSource;
  customModelDataSource?: CustomModelDataSource;
  modelKmsKeyArn?: string;
  roleArn?: string;
  modelTags?: Tag[];
  clientRequestToken?: string;
}
export type ModelArn = string;
export interface CreateCustomModelResponse {
  modelArn: string;
}
export type ModelDeploymentName = string;
export type CustomModelArn = string;
export type CustomModelDeploymentDescription = string;
export interface CreateCustomModelDeploymentRequest {
  modelDeploymentName: string;
  modelArn: string;
  description?: string;
  tags?: Tag[];
  clientRequestToken?: string;
}
export type CustomModelDeploymentArn = string;
export interface CreateCustomModelDeploymentResponse {
  customModelDeploymentArn: string;
}
export type EvaluationJobName = string;
export type EvaluationJobDescription = string | redacted.Redacted<string>;
export type ApplicationType = "ModelEvaluation" | "RagEvaluation" | (string & {});
export type EvaluationTaskType =
  | "Summarization"
  | "Classification"
  | "QuestionAndAnswer"
  | "Generation"
  | "Custom"
  | (string & {});
export type EvaluationDatasetName = string | redacted.Redacted<string>;
export type EvaluationDatasetLocation = { s3Uri: string };
export interface EvaluationDataset {
  name: string | redacted.Redacted<string>;
  datasetLocation?: EvaluationDatasetLocation;
}
export type EvaluationMetricName = string | redacted.Redacted<string>;
export type EvaluationMetricNames = (string | redacted.Redacted<string>)[];
export interface EvaluationDatasetMetricConfig {
  taskType: EvaluationTaskType;
  dataset: EvaluationDataset;
  metricNames: (string | redacted.Redacted<string>)[];
}
export type EvaluationDatasetMetricConfigs = EvaluationDatasetMetricConfig[];
export type EvaluatorModelIdentifier = string;
export interface BedrockEvaluatorModel {
  modelIdentifier: string;
}
export type BedrockEvaluatorModels = BedrockEvaluatorModel[];
export type EvaluatorModelConfig = { bedrockEvaluatorModels: BedrockEvaluatorModel[] };
export type MetricName = string | redacted.Redacted<string>;
export type CustomMetricInstructions = string;
export type RatingScaleItemDefinition = string;
export type RatingScaleItemValue =
  | { stringValue: string; floatValue?: never }
  | { stringValue?: never; floatValue: number };
export interface RatingScaleItem {
  definition: string;
  value: RatingScaleItemValue;
}
export type RatingScale = RatingScaleItem[];
export interface CustomMetricDefinition {
  name: string | redacted.Redacted<string>;
  instructions: string;
  ratingScale?: RatingScaleItem[];
}
export type AutomatedEvaluationCustomMetricSource = {
  customMetricDefinition: CustomMetricDefinition;
};
export type AutomatedEvaluationCustomMetrics = AutomatedEvaluationCustomMetricSource[];
export interface CustomMetricBedrockEvaluatorModel {
  modelIdentifier: string;
}
export type CustomMetricBedrockEvaluatorModels = CustomMetricBedrockEvaluatorModel[];
export interface CustomMetricEvaluatorModelConfig {
  bedrockEvaluatorModels: CustomMetricBedrockEvaluatorModel[];
}
export interface AutomatedEvaluationCustomMetricConfig {
  customMetrics: AutomatedEvaluationCustomMetricSource[];
  evaluatorModelConfig: CustomMetricEvaluatorModelConfig;
}
export interface AutomatedEvaluationConfig {
  datasetMetricConfigs: EvaluationDatasetMetricConfig[];
  evaluatorModelConfig?: EvaluatorModelConfig;
  customMetricConfig?: AutomatedEvaluationCustomMetricConfig;
}
export type SageMakerFlowDefinitionArn = string;
export type HumanTaskInstructions = string | redacted.Redacted<string>;
export interface HumanWorkflowConfig {
  flowDefinitionArn: string;
  instructions?: string | redacted.Redacted<string>;
}
export type EvaluationMetricDescription = string | redacted.Redacted<string>;
export type EvaluationRatingMethod = string;
export interface HumanEvaluationCustomMetric {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  ratingMethod: string;
}
export type HumanEvaluationCustomMetrics = HumanEvaluationCustomMetric[];
export interface HumanEvaluationConfig {
  humanWorkflowConfig?: HumanWorkflowConfig;
  customMetrics?: HumanEvaluationCustomMetric[];
  datasetMetricConfigs: EvaluationDatasetMetricConfig[];
}
export type EvaluationConfig =
  | { automated: AutomatedEvaluationConfig; human?: never }
  | { automated?: never; human: HumanEvaluationConfig };
export type EvaluationBedrockModelIdentifier = string;
export type EvaluationModelInferenceParams = string | redacted.Redacted<string>;
export type PerformanceConfigLatency = "standard" | "optimized" | (string & {});
export interface PerformanceConfiguration {
  latency?: PerformanceConfigLatency;
}
export interface EvaluationBedrockModel {
  modelIdentifier: string;
  inferenceParams?: string | redacted.Redacted<string>;
  performanceConfig?: PerformanceConfiguration;
}
export type EvaluationPrecomputedInferenceSourceIdentifier = string;
export interface EvaluationPrecomputedInferenceSource {
  inferenceSourceIdentifier: string;
}
export type EvaluationModelConfig =
  | { bedrockModel: EvaluationBedrockModel; precomputedInferenceSource?: never }
  | { bedrockModel?: never; precomputedInferenceSource: EvaluationPrecomputedInferenceSource };
export type EvaluationModelConfigs = EvaluationModelConfig[];
export type KnowledgeBaseId = string;
export type SearchType = "HYBRID" | "SEMANTIC" | (string & {});
export type FilterKey = string;
export type FilterValue = unknown;
export interface FilterAttribute {
  key: string;
  value: any;
}
export type RetrievalFilterList = RetrievalFilter[];
export type RetrievalFilter =
  | {
      equals: FilterAttribute;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals: FilterAttribute;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan: FilterAttribute;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals: FilterAttribute;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan: FilterAttribute;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals: FilterAttribute;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in: FilterAttribute;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn: FilterAttribute;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith: FilterAttribute;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains: FilterAttribute;
      stringContains?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains: FilterAttribute;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll: RetrievalFilter[];
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      greaterThan?: never;
      greaterThanOrEquals?: never;
      lessThan?: never;
      lessThanOrEquals?: never;
      in?: never;
      notIn?: never;
      startsWith?: never;
      listContains?: never;
      stringContains?: never;
      andAll?: never;
      orAll: RetrievalFilter[];
    };
export type AttributeType = "STRING" | "NUMBER" | "BOOLEAN" | "STRING_LIST" | (string & {});
export interface MetadataAttributeSchema {
  key: string;
  type: AttributeType;
  description: string;
}
export type MetadataAttributeSchemaList = MetadataAttributeSchema[];
export type BedrockModelArn = string;
export interface ImplicitFilterConfiguration {
  metadataAttributes: MetadataAttributeSchema[];
  modelArn: string;
}
export type VectorSearchRerankingConfigurationType = "BEDROCK_RERANKING_MODEL" | (string & {});
export type BedrockRerankingModelArn = string;
export interface VectorSearchBedrockRerankingModelConfiguration {
  modelArn: string;
  additionalModelRequestFields?: { [key: string]: any | undefined };
}
export type RerankingMetadataSelectionMode = "SELECTIVE" | "ALL" | (string & {});
export interface FieldForReranking {
  fieldName: string;
}
export type FieldsForReranking = FieldForReranking[];
export type RerankingMetadataSelectiveModeConfiguration =
  | { fieldsToInclude: FieldForReranking[]; fieldsToExclude?: never }
  | { fieldsToInclude?: never; fieldsToExclude: FieldForReranking[] };
export interface MetadataConfigurationForReranking {
  selectionMode: RerankingMetadataSelectionMode;
  selectiveModeConfiguration?: RerankingMetadataSelectiveModeConfiguration;
}
export interface VectorSearchBedrockRerankingConfiguration {
  modelConfiguration: VectorSearchBedrockRerankingModelConfiguration;
  numberOfRerankedResults?: number;
  metadataConfiguration?: MetadataConfigurationForReranking;
}
export interface VectorSearchRerankingConfiguration {
  type: VectorSearchRerankingConfigurationType;
  bedrockRerankingConfiguration?: VectorSearchBedrockRerankingConfiguration;
}
export interface KnowledgeBaseVectorSearchConfiguration {
  numberOfResults?: number;
  overrideSearchType?: SearchType;
  filter?: RetrievalFilter;
  implicitFilterConfiguration?: ImplicitFilterConfiguration;
  rerankingConfiguration?: VectorSearchRerankingConfiguration;
}
export interface KnowledgeBaseRetrievalConfiguration {
  vectorSearchConfiguration: KnowledgeBaseVectorSearchConfiguration;
}
export interface RetrieveConfig {
  knowledgeBaseId: string;
  knowledgeBaseRetrievalConfiguration: KnowledgeBaseRetrievalConfiguration;
}
export type RetrieveAndGenerateType = "KNOWLEDGE_BASE" | "EXTERNAL_SOURCES" | (string & {});
export type TextPromptTemplate = string | redacted.Redacted<string>;
export interface PromptTemplate {
  textPromptTemplate?: string | redacted.Redacted<string>;
}
export interface GuardrailConfiguration {
  guardrailId: string;
  guardrailVersion: string;
}
export type Temperature = number;
export type TopP = number;
export type MaxTokens = number;
export type RAGStopSequences = string[];
export interface TextInferenceConfig {
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  stopSequences?: string[];
}
export interface KbInferenceConfig {
  textInferenceConfig?: TextInferenceConfig;
}
export interface GenerationConfiguration {
  promptTemplate?: PromptTemplate;
  guardrailConfiguration?: GuardrailConfiguration;
  kbInferenceConfig?: KbInferenceConfig;
  additionalModelRequestFields?: { [key: string]: any | undefined };
}
export type QueryTransformationType = "QUERY_DECOMPOSITION" | (string & {});
export interface QueryTransformationConfiguration {
  type: QueryTransformationType;
}
export interface OrchestrationConfiguration {
  queryTransformationConfiguration: QueryTransformationConfiguration;
}
export interface KnowledgeBaseRetrieveAndGenerateConfiguration {
  knowledgeBaseId: string;
  modelArn: string;
  retrievalConfiguration?: KnowledgeBaseRetrievalConfiguration;
  generationConfiguration?: GenerationConfiguration;
  orchestrationConfiguration?: OrchestrationConfiguration;
}
export type ExternalSourceType = "S3" | "BYTE_CONTENT" | (string & {});
export type KBS3Uri = string;
export interface S3ObjectDoc {
  uri: string;
}
export type Identifier = string | redacted.Redacted<string>;
export type ContentType = string;
export type ByteContentBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface ByteContentDoc {
  identifier: string | redacted.Redacted<string>;
  contentType: string;
  data: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface ExternalSource {
  sourceType: ExternalSourceType;
  s3Location?: S3ObjectDoc;
  byteContent?: ByteContentDoc;
}
export type ExternalSources = ExternalSource[];
export interface ExternalSourcesGenerationConfiguration {
  promptTemplate?: PromptTemplate;
  guardrailConfiguration?: GuardrailConfiguration;
  kbInferenceConfig?: KbInferenceConfig;
  additionalModelRequestFields?: { [key: string]: any | undefined };
}
export interface ExternalSourcesRetrieveAndGenerateConfiguration {
  modelArn: string;
  sources: ExternalSource[];
  generationConfiguration?: ExternalSourcesGenerationConfiguration;
}
export interface RetrieveAndGenerateConfiguration {
  type: RetrieveAndGenerateType;
  knowledgeBaseConfiguration?: KnowledgeBaseRetrieveAndGenerateConfiguration;
  externalSourcesConfiguration?: ExternalSourcesRetrieveAndGenerateConfiguration;
}
export type KnowledgeBaseConfig =
  | { retrieveConfig: RetrieveConfig; retrieveAndGenerateConfig?: never }
  | { retrieveConfig?: never; retrieveAndGenerateConfig: RetrieveAndGenerateConfiguration };
export type EvaluationPrecomputedRagSourceIdentifier = string;
export interface EvaluationPrecomputedRetrieveSourceConfig {
  ragSourceIdentifier: string;
}
export interface EvaluationPrecomputedRetrieveAndGenerateSourceConfig {
  ragSourceIdentifier: string;
}
export type EvaluationPrecomputedRagSourceConfig =
  | {
      retrieveSourceConfig: EvaluationPrecomputedRetrieveSourceConfig;
      retrieveAndGenerateSourceConfig?: never;
    }
  | {
      retrieveSourceConfig?: never;
      retrieveAndGenerateSourceConfig: EvaluationPrecomputedRetrieveAndGenerateSourceConfig;
    };
export type RAGConfig =
  | { knowledgeBaseConfig: KnowledgeBaseConfig; precomputedRagSourceConfig?: never }
  | {
      knowledgeBaseConfig?: never;
      precomputedRagSourceConfig: EvaluationPrecomputedRagSourceConfig;
    };
export type RagConfigs = RAGConfig[];
export type EvaluationInferenceConfig =
  | { models: EvaluationModelConfig[]; ragConfigs?: never }
  | { models?: never; ragConfigs: RAGConfig[] };
export interface EvaluationOutputDataConfig {
  s3Uri: string;
}
export interface CreateEvaluationJobRequest {
  jobName: string;
  jobDescription?: string | redacted.Redacted<string>;
  clientRequestToken?: string;
  roleArn: string;
  customerEncryptionKeyId?: string;
  jobTags?: Tag[];
  applicationType?: ApplicationType;
  evaluationConfig: EvaluationConfig;
  inferenceConfig: EvaluationInferenceConfig;
  outputDataConfig: EvaluationOutputDataConfig;
}
export type EvaluationJobArn = string;
export interface CreateEvaluationJobResponse {
  jobArn: string;
}
export type OfferToken = string;
export type BedrockModelId = string;
export interface CreateFoundationModelAgreementRequest {
  offerToken: string;
  modelId: string;
}
export interface CreateFoundationModelAgreementResponse {
  modelId: string;
}
export type GuardrailName = string | redacted.Redacted<string>;
export type GuardrailDescription = string | redacted.Redacted<string>;
export type GuardrailTopicName = string | redacted.Redacted<string>;
export type GuardrailTopicDefinition = string | redacted.Redacted<string>;
export type GuardrailTopicExample = string | redacted.Redacted<string>;
export type GuardrailTopicExamples = (string | redacted.Redacted<string>)[];
export type GuardrailTopicType = "DENY" | (string & {});
export type GuardrailTopicAction = "BLOCK" | "NONE" | (string & {});
export interface GuardrailTopicConfig {
  name: string | redacted.Redacted<string>;
  definition: string | redacted.Redacted<string>;
  examples?: (string | redacted.Redacted<string>)[];
  type: GuardrailTopicType;
  inputAction?: GuardrailTopicAction;
  outputAction?: GuardrailTopicAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export type GuardrailTopicsConfig = GuardrailTopicConfig[];
export type GuardrailTopicsTierName = "CLASSIC" | "STANDARD" | (string & {});
export interface GuardrailTopicsTierConfig {
  tierName: GuardrailTopicsTierName;
}
export interface GuardrailTopicPolicyConfig {
  topicsConfig: GuardrailTopicConfig[];
  tierConfig?: GuardrailTopicsTierConfig;
}
export type GuardrailContentFilterType =
  | "SEXUAL"
  | "VIOLENCE"
  | "HATE"
  | "INSULTS"
  | "MISCONDUCT"
  | "PROMPT_ATTACK"
  | (string & {});
export type GuardrailFilterStrength = "NONE" | "LOW" | "MEDIUM" | "HIGH" | (string & {});
export type GuardrailModality = "TEXT" | "IMAGE" | (string & {});
export type GuardrailModalities = GuardrailModality[];
export type GuardrailContentFilterAction = "BLOCK" | "NONE" | (string & {});
export interface GuardrailContentFilterConfig {
  type: GuardrailContentFilterType;
  inputStrength: GuardrailFilterStrength;
  outputStrength: GuardrailFilterStrength;
  inputModalities?: GuardrailModality[];
  outputModalities?: GuardrailModality[];
  inputAction?: GuardrailContentFilterAction;
  outputAction?: GuardrailContentFilterAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export type GuardrailContentFiltersConfig = GuardrailContentFilterConfig[];
export type GuardrailContentFiltersTierName = "CLASSIC" | "STANDARD" | (string & {});
export interface GuardrailContentFiltersTierConfig {
  tierName: GuardrailContentFiltersTierName;
}
export interface GuardrailContentPolicyConfig {
  filtersConfig: GuardrailContentFilterConfig[];
  tierConfig?: GuardrailContentFiltersTierConfig;
}
export type GuardrailWordAction = "BLOCK" | "NONE" | (string & {});
export interface GuardrailWordConfig {
  text: string;
  inputAction?: GuardrailWordAction;
  outputAction?: GuardrailWordAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export type GuardrailWordsConfig = GuardrailWordConfig[];
export type GuardrailManagedWordsType = "PROFANITY" | (string & {});
export interface GuardrailManagedWordsConfig {
  type: GuardrailManagedWordsType;
  inputAction?: GuardrailWordAction;
  outputAction?: GuardrailWordAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export type GuardrailManagedWordListsConfig = GuardrailManagedWordsConfig[];
export interface GuardrailWordPolicyConfig {
  wordsConfig?: GuardrailWordConfig[];
  managedWordListsConfig?: GuardrailManagedWordsConfig[];
}
export type GuardrailPiiEntityType =
  | "ADDRESS"
  | "AGE"
  | "AWS_ACCESS_KEY"
  | "AWS_SECRET_KEY"
  | "CA_HEALTH_NUMBER"
  | "CA_SOCIAL_INSURANCE_NUMBER"
  | "CREDIT_DEBIT_CARD_CVV"
  | "CREDIT_DEBIT_CARD_EXPIRY"
  | "CREDIT_DEBIT_CARD_NUMBER"
  | "DRIVER_ID"
  | "EMAIL"
  | "INTERNATIONAL_BANK_ACCOUNT_NUMBER"
  | "IP_ADDRESS"
  | "LICENSE_PLATE"
  | "MAC_ADDRESS"
  | "NAME"
  | "PASSWORD"
  | "PHONE"
  | "PIN"
  | "SWIFT_CODE"
  | "UK_NATIONAL_HEALTH_SERVICE_NUMBER"
  | "UK_NATIONAL_INSURANCE_NUMBER"
  | "UK_UNIQUE_TAXPAYER_REFERENCE_NUMBER"
  | "URL"
  | "USERNAME"
  | "US_BANK_ACCOUNT_NUMBER"
  | "US_BANK_ROUTING_NUMBER"
  | "US_INDIVIDUAL_TAX_IDENTIFICATION_NUMBER"
  | "US_PASSPORT_NUMBER"
  | "US_SOCIAL_SECURITY_NUMBER"
  | "VEHICLE_IDENTIFICATION_NUMBER"
  | (string & {});
export type GuardrailSensitiveInformationAction = "BLOCK" | "ANONYMIZE" | "NONE" | (string & {});
export interface GuardrailPiiEntityConfig {
  type: GuardrailPiiEntityType;
  action: GuardrailSensitiveInformationAction;
  inputAction?: GuardrailSensitiveInformationAction;
  outputAction?: GuardrailSensitiveInformationAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export type GuardrailPiiEntitiesConfig = GuardrailPiiEntityConfig[];
export interface GuardrailRegexConfig {
  name: string;
  description?: string;
  pattern: string;
  action: GuardrailSensitiveInformationAction;
  inputAction?: GuardrailSensitiveInformationAction;
  outputAction?: GuardrailSensitiveInformationAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export type GuardrailRegexesConfig = GuardrailRegexConfig[];
export interface GuardrailSensitiveInformationPolicyConfig {
  piiEntitiesConfig?: GuardrailPiiEntityConfig[];
  regexesConfig?: GuardrailRegexConfig[];
}
export type GuardrailContextualGroundingFilterType = "GROUNDING" | "RELEVANCE" | (string & {});
export type GuardrailContextualGroundingAction = "BLOCK" | "NONE" | (string & {});
export interface GuardrailContextualGroundingFilterConfig {
  type: GuardrailContextualGroundingFilterType;
  threshold: number;
  action?: GuardrailContextualGroundingAction;
  enabled?: boolean;
}
export type GuardrailContextualGroundingFiltersConfig = GuardrailContextualGroundingFilterConfig[];
export interface GuardrailContextualGroundingPolicyConfig {
  filtersConfig: GuardrailContextualGroundingFilterConfig[];
}
export type AutomatedReasoningPolicyArnList = string[];
export type AutomatedReasoningConfidenceFilterThreshold = number;
export interface GuardrailAutomatedReasoningPolicyConfig {
  policies: string[];
  confidenceThreshold?: number;
}
export type GuardrailCrossRegionGuardrailProfileIdentifier = string;
export interface GuardrailCrossRegionConfig {
  guardrailProfileIdentifier: string;
}
export type GuardrailBlockedMessaging = string | redacted.Redacted<string>;
export interface CreateGuardrailRequest {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  topicPolicyConfig?: GuardrailTopicPolicyConfig;
  contentPolicyConfig?: GuardrailContentPolicyConfig;
  wordPolicyConfig?: GuardrailWordPolicyConfig;
  sensitiveInformationPolicyConfig?: GuardrailSensitiveInformationPolicyConfig;
  contextualGroundingPolicyConfig?: GuardrailContextualGroundingPolicyConfig;
  automatedReasoningPolicyConfig?: GuardrailAutomatedReasoningPolicyConfig;
  crossRegionConfig?: GuardrailCrossRegionConfig;
  blockedInputMessaging: string | redacted.Redacted<string>;
  blockedOutputsMessaging: string | redacted.Redacted<string>;
  kmsKeyId?: string;
  tags?: Tag[];
  clientRequestToken?: string;
}
export type GuardrailId = string;
export type GuardrailArn = string;
export type GuardrailDraftVersion = string;
export interface CreateGuardrailResponse {
  guardrailId: string;
  guardrailArn: string;
  version: string;
  createdAt: Date;
}
export type GuardrailIdentifier = string;
export interface CreateGuardrailVersionRequest {
  guardrailIdentifier: string;
  description?: string | redacted.Redacted<string>;
  clientRequestToken?: string;
}
export type GuardrailNumericalVersion = string;
export interface CreateGuardrailVersionResponse {
  guardrailId: string;
  version: string;
}
export type InferenceProfileName = string;
export type InferenceProfileDescription = string | redacted.Redacted<string>;
export type InferenceProfileModelSourceArn = string;
export type InferenceProfileModelSource = { copyFrom: string };
export interface CreateInferenceProfileRequest {
  inferenceProfileName: string;
  description?: string | redacted.Redacted<string>;
  clientRequestToken?: string;
  modelSource: InferenceProfileModelSource;
  tags?: Tag[];
}
export type InferenceProfileArn = string;
export type InferenceProfileStatus = "ACTIVE" | (string & {});
export interface CreateInferenceProfileResponse {
  inferenceProfileArn: string;
  status?: InferenceProfileStatus;
}
export type ModelSourceIdentifier = string;
export type InstanceCount = number;
export type InstanceType = string;
export type SubnetId = string;
export type SubnetIds = string[];
export type SecurityGroupId = string;
export type SecurityGroupIds = string[];
export interface VpcConfig {
  subnetIds: string[];
  securityGroupIds: string[];
}
export interface SageMakerEndpoint {
  initialInstanceCount: number;
  instanceType: string;
  executionRole: string;
  kmsEncryptionKey?: string;
  vpc?: VpcConfig;
}
export type EndpointConfig = { sageMaker: SageMakerEndpoint };
export type AcceptEula = boolean;
export type EndpointName = string;
export interface CreateMarketplaceModelEndpointRequest {
  modelSourceIdentifier: string;
  endpointConfig: EndpointConfig;
  acceptEula?: boolean;
  endpointName: string;
  clientRequestToken?: string;
  tags?: Tag[];
}
export type Arn = string;
export type Status = "REGISTERED" | "INCOMPATIBLE_ENDPOINT" | (string & {});
export interface MarketplaceModelEndpoint {
  endpointArn: string;
  modelSourceIdentifier: string;
  status?: Status;
  statusMessage?: string;
  createdAt: Date;
  updatedAt: Date;
  endpointConfig: EndpointConfig;
  endpointStatus: string;
  endpointStatusMessage?: string;
}
export interface CreateMarketplaceModelEndpointResponse {
  marketplaceModelEndpoint: MarketplaceModelEndpoint;
}
export interface CreateModelCopyJobRequest {
  sourceModelArn: string;
  targetModelName: string;
  modelKmsKeyId?: string;
  targetModelTags?: Tag[];
  clientRequestToken?: string;
}
export type ModelCopyJobArn = string;
export interface CreateModelCopyJobResponse {
  jobArn: string;
}
export type JobName = string;
export type BaseModelIdentifier = string;
export type CustomizationType =
  | "FINE_TUNING"
  | "CONTINUED_PRE_TRAINING"
  | "DISTILLATION"
  | "REINFORCEMENT_FINE_TUNING"
  | "IMPORTED"
  | (string & {});
export type UsePromptResponse = boolean;
export type InvocationLogSource = { s3Uri: string };
export type RequestMetadataMap = { [key: string]: string | undefined };
export interface RequestMetadataBaseFilters {
  equals?: { [key: string]: string | undefined };
  notEquals?: { [key: string]: string | undefined };
}
export type RequestMetadataFiltersList = RequestMetadataBaseFilters[];
export type RequestMetadataFilters =
  | {
      equals: { [key: string]: string | undefined };
      notEquals?: never;
      andAll?: never;
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals: { [key: string]: string | undefined };
      andAll?: never;
      orAll?: never;
    }
  | { equals?: never; notEquals?: never; andAll: RequestMetadataBaseFilters[]; orAll?: never }
  | { equals?: never; notEquals?: never; andAll?: never; orAll: RequestMetadataBaseFilters[] };
export interface InvocationLogsConfig {
  usePromptResponse?: boolean;
  invocationLogSource: InvocationLogSource;
  requestMetadataFilters?: RequestMetadataFilters;
}
export interface TrainingDataConfig {
  s3Uri?: string;
  invocationLogsConfig?: InvocationLogsConfig;
}
export interface Validator {
  s3Uri: string;
}
export type Validators = Validator[];
export interface ValidationDataConfig {
  validators: Validator[];
}
export interface OutputDataConfig {
  s3Uri: string;
}
export type ModelCustomizationHyperParameters = { [key: string]: string | undefined };
export type TeacherModelIdentifier = string;
export interface TeacherModelConfig {
  teacherModelIdentifier: string;
  maxResponseLengthForInference?: number;
}
export interface DistillationConfig {
  teacherModelConfig: TeacherModelConfig;
}
export type LambdaArn = string;
export interface LambdaGraderConfig {
  lambdaArn: string;
}
export type GraderConfig = { lambdaGrader: LambdaGraderConfig };
export type EpochCount = number;
export type RFTBatchSize = number;
export type RFTLearningRate = number;
export type RFTMaxPromptLength = number;
export type RFTTrainingSamplePerPrompt = number;
export type RFTInferenceMaxTokens = number;
export type ReasoningEffort = "low" | "medium" | "high" | (string & {});
export type RFTEvalInterval = number;
export interface RFTHyperParameters {
  epochCount?: number;
  batchSize?: number;
  learningRate?: number;
  maxPromptLength?: number;
  trainingSamplePerPrompt?: number;
  inferenceMaxTokens?: number;
  reasoningEffort?: ReasoningEffort;
  evalInterval?: number;
}
export interface RFTConfig {
  graderConfig?: GraderConfig;
  hyperParameters?: RFTHyperParameters;
}
export type CustomizationConfig =
  | { distillationConfig: DistillationConfig; rftConfig?: never }
  | { distillationConfig?: never; rftConfig: RFTConfig };
export interface CreateModelCustomizationJobRequest {
  jobName: string;
  customModelName: string;
  roleArn: string;
  clientRequestToken?: string;
  baseModelIdentifier: string;
  customizationType?: CustomizationType;
  customModelKmsKeyId?: string;
  jobTags?: Tag[];
  customModelTags?: Tag[];
  trainingDataConfig: TrainingDataConfig;
  validationDataConfig?: ValidationDataConfig;
  outputDataConfig: OutputDataConfig;
  hyperParameters?: { [key: string]: string | undefined };
  vpcConfig?: VpcConfig;
  customizationConfig?: CustomizationConfig;
}
export type ModelCustomizationJobArn = string;
export interface CreateModelCustomizationJobResponse {
  jobArn: string;
}
export type ImportedModelName = string;
export interface CreateModelImportJobRequest {
  jobName: string;
  importedModelName: string;
  roleArn: string;
  modelDataSource: ModelDataSource;
  jobTags?: Tag[];
  importedModelTags?: Tag[];
  clientRequestToken?: string;
  vpcConfig?: VpcConfig;
  importedModelKmsKeyId?: string;
}
export type ModelImportJobArn = string;
export interface CreateModelImportJobResponse {
  jobArn: string;
}
export type ModelInvocationJobName = string;
export type ModelInvocationIdempotencyToken = string;
export type ModelId = string;
export type S3InputFormat = "JSONL" | (string & {});
export type AccountId = string;
export interface ModelInvocationJobS3InputDataConfig {
  s3InputFormat?: S3InputFormat;
  s3Uri: string;
  s3BucketOwner?: string;
}
export type ModelInvocationJobInputDataConfig = {
  s3InputDataConfig: ModelInvocationJobS3InputDataConfig;
};
export interface ModelInvocationJobS3OutputDataConfig {
  s3Uri: string;
  s3EncryptionKeyId?: string;
  s3BucketOwner?: string;
}
export type ModelInvocationJobOutputDataConfig = {
  s3OutputDataConfig: ModelInvocationJobS3OutputDataConfig;
};
export type ModelInvocationJobTimeoutDurationInHours = number;
export type ModelInvocationType = "InvokeModel" | "Converse" | (string & {});
export interface CreateModelInvocationJobRequest {
  jobName: string;
  roleArn: string;
  clientRequestToken?: string;
  modelId: string;
  inputDataConfig: ModelInvocationJobInputDataConfig;
  outputDataConfig: ModelInvocationJobOutputDataConfig;
  vpcConfig?: VpcConfig;
  timeoutDurationInHours?: number;
  tags?: Tag[];
  modelInvocationType?: ModelInvocationType;
}
export type ModelInvocationJobArn = string;
export interface CreateModelInvocationJobResponse {
  jobArn: string;
}
export type PromptRouterName = string;
export type PromptRouterTargetModelArn = string;
export interface PromptRouterTargetModel {
  modelArn?: string;
}
export type PromptRouterTargetModels = PromptRouterTargetModel[];
export type PromptRouterDescription = string | redacted.Redacted<string>;
export interface RoutingCriteria {
  responseQualityDifference: number;
}
export interface CreatePromptRouterRequest {
  clientRequestToken?: string;
  promptRouterName: string;
  models: PromptRouterTargetModel[];
  description?: string | redacted.Redacted<string>;
  routingCriteria: RoutingCriteria;
  fallbackModel: PromptRouterTargetModel;
  tags?: Tag[];
}
export type PromptRouterArn = string;
export interface CreatePromptRouterResponse {
  promptRouterArn?: string;
}
export type PositiveInteger = number;
export type ProvisionedModelName = string;
export type ModelIdentifier = string;
export type CommitmentDuration = "OneMonth" | "SixMonths" | (string & {});
export interface CreateProvisionedModelThroughputRequest {
  clientRequestToken?: string;
  modelUnits: number;
  provisionedModelName: string;
  modelId: string;
  commitmentDuration?: CommitmentDuration;
  tags?: Tag[];
}
export type ProvisionedModelArn = string;
export interface CreateProvisionedModelThroughputResponse {
  provisionedModelArn: string;
}
export interface DeleteAutomatedReasoningPolicyRequest {
  policyArn: string;
  force?: boolean;
}
export interface DeleteAutomatedReasoningPolicyResponse {}
export interface DeleteAutomatedReasoningPolicyBuildWorkflowRequest {
  policyArn: string;
  buildWorkflowId: string;
  lastUpdatedAt: Date;
}
export interface DeleteAutomatedReasoningPolicyBuildWorkflowResponse {}
export interface DeleteAutomatedReasoningPolicyTestCaseRequest {
  policyArn: string;
  testCaseId: string;
  lastUpdatedAt: Date;
}
export interface DeleteAutomatedReasoningPolicyTestCaseResponse {}
export interface DeleteCustomModelRequest {
  modelIdentifier: string;
}
export interface DeleteCustomModelResponse {}
export type CustomModelDeploymentIdentifier = string;
export interface DeleteCustomModelDeploymentRequest {
  customModelDeploymentIdentifier: string;
}
export interface DeleteCustomModelDeploymentResponse {}
export type AccountEnforcedGuardrailConfigurationId = string;
export interface DeleteEnforcedGuardrailConfigurationRequest {
  configId: string;
}
export interface DeleteEnforcedGuardrailConfigurationResponse {}
export interface DeleteFoundationModelAgreementRequest {
  modelId: string;
}
export interface DeleteFoundationModelAgreementResponse {}
export interface DeleteGuardrailRequest {
  guardrailIdentifier: string;
  guardrailVersion?: string;
}
export interface DeleteGuardrailResponse {}
export type ImportedModelIdentifier = string;
export interface DeleteImportedModelRequest {
  modelIdentifier: string;
}
export interface DeleteImportedModelResponse {}
export type InferenceProfileIdentifier = string;
export interface DeleteInferenceProfileRequest {
  inferenceProfileIdentifier: string;
}
export interface DeleteInferenceProfileResponse {}
export interface DeleteMarketplaceModelEndpointRequest {
  endpointArn: string;
}
export interface DeleteMarketplaceModelEndpointResponse {}
export interface DeleteModelInvocationLoggingConfigurationRequest {}
export interface DeleteModelInvocationLoggingConfigurationResponse {}
export interface DeletePromptRouterRequest {
  promptRouterArn: string;
}
export interface DeletePromptRouterResponse {}
export type ProvisionedModelId = string;
export interface DeleteProvisionedModelThroughputRequest {
  provisionedModelId: string;
}
export interface DeleteProvisionedModelThroughputResponse {}
export type ResourcePolicyResourceArn = string;
export interface DeleteResourcePolicyRequest {
  resourceArn: string;
}
export interface DeleteResourcePolicyResponse {}
export interface DeregisterMarketplaceModelEndpointRequest {
  endpointArn: string;
}
export interface DeregisterMarketplaceModelEndpointResponse {}
export interface ExportAutomatedReasoningPolicyVersionRequest {
  policyArn: string;
}
export interface ExportAutomatedReasoningPolicyVersionResponse {
  policyDefinition: AutomatedReasoningPolicyDefinition;
}
export interface GetAccountDataRetentionRequest {}
export type DataRetentionMode =
  | "default"
  | "none"
  | "aws_review"
  | "provider_data_share"
  | "inherit"
  | (string & {});
export interface GetAccountDataRetentionResponse {
  mode: DataRetentionMode;
  updatedAt?: Date;
}
export interface GetAdvancedPromptOptimizationJobRequest {
  jobIdentifier: string;
}
export type ErrorMessage = string;
export interface GetAdvancedPromptOptimizationJobResponse {
  jobArn: string;
  jobName: string;
  jobDescription?: string;
  jobStatus: AdvancedPromptOptimizationJobStatus;
  inputConfig: AdvancedPromptOptimizationInputConfig;
  outputConfig: AdvancedPromptOptimizationOutputConfig;
  encryptionKeyArn?: string;
  creationTime: Date;
  lastModifiedTime?: Date;
  failureMessage?: string;
  modelConfigurations: ModelConfiguration[];
}
export interface GetAutomatedReasoningPolicyRequest {
  policyArn: string;
}
export type AutomatedReasoningPolicyId = string;
export interface GetAutomatedReasoningPolicyResponse {
  policyArn: string;
  name: string | redacted.Redacted<string>;
  version: string;
  policyId: string;
  description?: string | redacted.Redacted<string>;
  definitionHash: string;
  kmsKeyArn?: string;
  createdAt?: Date;
  updatedAt: Date;
}
export interface GetAutomatedReasoningPolicyAnnotationsRequest {
  policyArn: string;
  buildWorkflowId: string;
}
export interface AutomatedReasoningPolicyAddTypeAnnotation {
  name: string | redacted.Redacted<string>;
  description: string | redacted.Redacted<string>;
  values: AutomatedReasoningPolicyDefinitionTypeValue[];
}
export interface AutomatedReasoningPolicyAddTypeValue {
  value: string;
  description?: string | redacted.Redacted<string>;
}
export interface AutomatedReasoningPolicyUpdateTypeValue {
  value: string;
  newValue?: string;
  description?: string | redacted.Redacted<string>;
}
export interface AutomatedReasoningPolicyDeleteTypeValue {
  value: string;
}
export type AutomatedReasoningPolicyTypeValueAnnotation =
  | {
      addTypeValue: AutomatedReasoningPolicyAddTypeValue;
      updateTypeValue?: never;
      deleteTypeValue?: never;
    }
  | {
      addTypeValue?: never;
      updateTypeValue: AutomatedReasoningPolicyUpdateTypeValue;
      deleteTypeValue?: never;
    }
  | {
      addTypeValue?: never;
      updateTypeValue?: never;
      deleteTypeValue: AutomatedReasoningPolicyDeleteTypeValue;
    };
export type AutomatedReasoningPolicyTypeValueAnnotationList =
  AutomatedReasoningPolicyTypeValueAnnotation[];
export interface AutomatedReasoningPolicyUpdateTypeAnnotation {
  name: string | redacted.Redacted<string>;
  newName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  values: AutomatedReasoningPolicyTypeValueAnnotation[];
}
export interface AutomatedReasoningPolicyDeleteTypeAnnotation {
  name: string | redacted.Redacted<string>;
}
export interface AutomatedReasoningPolicyAddVariableAnnotation {
  name: string | redacted.Redacted<string>;
  type: string | redacted.Redacted<string>;
  description: string | redacted.Redacted<string>;
}
export interface AutomatedReasoningPolicyUpdateVariableAnnotation {
  name: string | redacted.Redacted<string>;
  newName?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
}
export interface AutomatedReasoningPolicyDeleteVariableAnnotation {
  name: string | redacted.Redacted<string>;
}
export interface AutomatedReasoningPolicyAddRuleAnnotation {
  expression: string | redacted.Redacted<string>;
}
export interface AutomatedReasoningPolicyUpdateRuleAnnotation {
  ruleId: string;
  expression: string | redacted.Redacted<string>;
}
export interface AutomatedReasoningPolicyDeleteRuleAnnotation {
  ruleId: string;
}
export type AutomatedReasoningPolicyAnnotationRuleNaturalLanguage =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyAddRuleFromNaturalLanguageAnnotation {
  naturalLanguage: string | redacted.Redacted<string>;
}
export type AutomatedReasoningPolicyDefinitionRuleIdList = string[];
export type AutomatedReasoningPolicyAnnotationFeedbackNaturalLanguage =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyUpdateFromRuleFeedbackAnnotation {
  ruleIds?: string[];
  feedback: string | redacted.Redacted<string>;
}
export type AutomatedReasoningPolicyScenarioExpression = string | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyUpdateFromScenarioFeedbackAnnotation {
  ruleIds?: string[];
  scenarioExpression: string | redacted.Redacted<string>;
  feedback?: string | redacted.Redacted<string>;
}
export type AutomatedReasoningPolicyAnnotationIngestContent = string | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyIngestContentAnnotation {
  content: string | redacted.Redacted<string>;
}
export type AutomatedReasoningPolicyAnnotation =
  | {
      addType: AutomatedReasoningPolicyAddTypeAnnotation;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType: AutomatedReasoningPolicyUpdateTypeAnnotation;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType: AutomatedReasoningPolicyDeleteTypeAnnotation;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable: AutomatedReasoningPolicyAddVariableAnnotation;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable: AutomatedReasoningPolicyUpdateVariableAnnotation;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable: AutomatedReasoningPolicyDeleteVariableAnnotation;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule: AutomatedReasoningPolicyAddRuleAnnotation;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule: AutomatedReasoningPolicyUpdateRuleAnnotation;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule: AutomatedReasoningPolicyDeleteRuleAnnotation;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage: AutomatedReasoningPolicyAddRuleFromNaturalLanguageAnnotation;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback: AutomatedReasoningPolicyUpdateFromRuleFeedbackAnnotation;
      updateFromScenarioFeedback?: never;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback: AutomatedReasoningPolicyUpdateFromScenarioFeedbackAnnotation;
      ingestContent?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
      addRuleFromNaturalLanguage?: never;
      updateFromRulesFeedback?: never;
      updateFromScenarioFeedback?: never;
      ingestContent: AutomatedReasoningPolicyIngestContentAnnotation;
    };
export type AutomatedReasoningPolicyAnnotationList = AutomatedReasoningPolicyAnnotation[];
export interface GetAutomatedReasoningPolicyAnnotationsResponse {
  policyArn: string;
  name: string | redacted.Redacted<string>;
  buildWorkflowId: string;
  annotations: AutomatedReasoningPolicyAnnotation[];
  annotationSetHash: string;
  updatedAt: Date;
}
export interface GetAutomatedReasoningPolicyBuildWorkflowRequest {
  policyArn: string;
  buildWorkflowId: string;
}
export type AutomatedReasoningPolicyBuildWorkflowStatus =
  | "SCHEDULED"
  | "CANCEL_REQUESTED"
  | "PREPROCESSING"
  | "BUILDING"
  | "TESTING"
  | "COMPLETED"
  | "FAILED"
  | "CANCELLED"
  | (string & {});
export type AutomatedReasoningPolicyBuildWorkflowType =
  | "INGEST_CONTENT"
  | "REFINE_POLICY"
  | "IMPORT_POLICY"
  | "GENERATE_FIDELITY_REPORT"
  | "GENERATE_POLICY_SCENARIOS"
  | "RESOLVE_POLICY_AMBIGUITIES"
  | "ITERATIVELY_REFINE_POLICY"
  | (string & {});
export type AutomatedReasoningPolicyBuildDocumentName = string | redacted.Redacted<string>;
export type AutomatedReasoningPolicyBuildDocumentContentType = "pdf" | "txt" | (string & {});
export type AutomatedReasoningPolicyBuildDocumentDescription = string | redacted.Redacted<string>;
export interface GetAutomatedReasoningPolicyBuildWorkflowResponse {
  policyArn: string;
  buildWorkflowId: string;
  status: AutomatedReasoningPolicyBuildWorkflowStatus;
  buildWorkflowType: AutomatedReasoningPolicyBuildWorkflowType;
  documentName?: string | redacted.Redacted<string>;
  documentContentType?: AutomatedReasoningPolicyBuildDocumentContentType;
  documentDescription?: string | redacted.Redacted<string>;
  createdAt: Date;
  updatedAt: Date;
}
export type AutomatedReasoningPolicyBuildResultAssetType =
  | "BUILD_LOG"
  | "QUALITY_REPORT"
  | "POLICY_DEFINITION"
  | "GENERATED_TEST_CASES"
  | "POLICY_SCENARIOS"
  | "FIDELITY_REPORT"
  | "ASSET_MANIFEST"
  | "SOURCE_DOCUMENT"
  | (string & {});
export type AutomatedReasoningPolicyBuildResultAssetId = string;
export interface GetAutomatedReasoningPolicyBuildWorkflowResultAssetsRequest {
  policyArn: string;
  buildWorkflowId: string;
  assetType: AutomatedReasoningPolicyBuildResultAssetType;
  assetId?: string;
}
export type AutomatedReasoningPolicyDefinitionTypeNameList = (string | redacted.Redacted<string>)[];
export interface AutomatedReasoningPolicyDefinitionTypeValuePair {
  typeName: string | redacted.Redacted<string>;
  valueName: string;
}
export type AutomatedReasoningPolicyDefinitionTypeValuePairList =
  AutomatedReasoningPolicyDefinitionTypeValuePair[];
export type AutomatedReasoningPolicyDefinitionVariableNameList = (
  | string
  | redacted.Redacted<string>
)[];
export type AutomatedReasoningPolicyConflictedRuleIdList = string[];
export type AutomatedReasoningPolicyDisjointedRuleIdList = string[];
export interface AutomatedReasoningPolicyDisjointRuleSet {
  variables: (string | redacted.Redacted<string>)[];
  rules: string[];
}
export type AutomatedReasoningPolicyDisjointRuleSetList = AutomatedReasoningPolicyDisjointRuleSet[];
export interface AutomatedReasoningPolicyDefinitionQualityReport {
  typeCount: number;
  variableCount: number;
  ruleCount: number;
  unusedTypes: (string | redacted.Redacted<string>)[];
  unusedTypeValues: AutomatedReasoningPolicyDefinitionTypeValuePair[];
  unusedVariables: (string | redacted.Redacted<string>)[];
  conflictingRules: string[];
  disjointRuleSets: AutomatedReasoningPolicyDisjointRuleSet[];
}
export type AutomatedReasoningPolicyAnnotationStatus = "APPLIED" | "FAILED" | (string & {});
export interface AutomatedReasoningPolicyPlanning {}
export interface AutomatedReasoningPolicyAddTypeMutation {
  type: AutomatedReasoningPolicyDefinitionType;
}
export interface AutomatedReasoningPolicyUpdateTypeMutation {
  type: AutomatedReasoningPolicyDefinitionType;
}
export interface AutomatedReasoningPolicyDeleteTypeMutation {
  name: string | redacted.Redacted<string>;
}
export interface AutomatedReasoningPolicyAddVariableMutation {
  variable: AutomatedReasoningPolicyDefinitionVariable;
}
export interface AutomatedReasoningPolicyUpdateVariableMutation {
  variable: AutomatedReasoningPolicyDefinitionVariable;
}
export interface AutomatedReasoningPolicyDeleteVariableMutation {
  name: string | redacted.Redacted<string>;
}
export interface AutomatedReasoningPolicyAddRuleMutation {
  rule: AutomatedReasoningPolicyDefinitionRule;
}
export interface AutomatedReasoningPolicyUpdateRuleMutation {
  rule: AutomatedReasoningPolicyDefinitionRule;
}
export interface AutomatedReasoningPolicyDeleteRuleMutation {
  id: string;
}
export type AutomatedReasoningPolicyMutation =
  | {
      addType: AutomatedReasoningPolicyAddTypeMutation;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType: AutomatedReasoningPolicyUpdateTypeMutation;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType: AutomatedReasoningPolicyDeleteTypeMutation;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable: AutomatedReasoningPolicyAddVariableMutation;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable: AutomatedReasoningPolicyUpdateVariableMutation;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable: AutomatedReasoningPolicyDeleteVariableMutation;
      addRule?: never;
      updateRule?: never;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule: AutomatedReasoningPolicyAddRuleMutation;
      updateRule?: never;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule: AutomatedReasoningPolicyUpdateRuleMutation;
      deleteRule?: never;
    }
  | {
      addType?: never;
      updateType?: never;
      deleteType?: never;
      addVariable?: never;
      updateVariable?: never;
      deleteVariable?: never;
      addRule?: never;
      updateRule?: never;
      deleteRule: AutomatedReasoningPolicyDeleteRuleMutation;
    };
export type AutomatedReasoningPolicyBuildStepContext =
  | { planning: AutomatedReasoningPolicyPlanning; mutation?: never }
  | { planning?: never; mutation: AutomatedReasoningPolicyMutation };
export type AutomatedReasoningPolicyDefinitionElement =
  | {
      policyDefinitionVariable: AutomatedReasoningPolicyDefinitionVariable;
      policyDefinitionType?: never;
      policyDefinitionRule?: never;
    }
  | {
      policyDefinitionVariable?: never;
      policyDefinitionType: AutomatedReasoningPolicyDefinitionType;
      policyDefinitionRule?: never;
    }
  | {
      policyDefinitionVariable?: never;
      policyDefinitionType?: never;
      policyDefinitionRule: AutomatedReasoningPolicyDefinitionRule;
    };
export type AutomatedReasoningPolicyBuildMessageType = "INFO" | "WARNING" | "ERROR" | (string & {});
export interface AutomatedReasoningPolicyBuildStepMessage {
  message: string;
  messageType: AutomatedReasoningPolicyBuildMessageType;
}
export type AutomatedReasoningPolicyBuildStepMessageList =
  AutomatedReasoningPolicyBuildStepMessage[];
export interface AutomatedReasoningPolicyBuildStep {
  context: AutomatedReasoningPolicyBuildStepContext;
  priorElement?: AutomatedReasoningPolicyDefinitionElement;
  messages: AutomatedReasoningPolicyBuildStepMessage[];
}
export type AutomatedReasoningPolicyBuildStepList = AutomatedReasoningPolicyBuildStep[];
export interface AutomatedReasoningPolicyBuildLogEntry {
  annotation: AutomatedReasoningPolicyAnnotation;
  status: AutomatedReasoningPolicyAnnotationStatus;
  buildSteps: AutomatedReasoningPolicyBuildStep[];
}
export type AutomatedReasoningPolicyBuildLogEntryList = AutomatedReasoningPolicyBuildLogEntry[];
export interface AutomatedReasoningPolicyBuildLog {
  entries: AutomatedReasoningPolicyBuildLogEntry[];
}
export interface AutomatedReasoningPolicyGeneratedTestCase {
  queryContent: string | redacted.Redacted<string>;
  guardContent: string | redacted.Redacted<string>;
  expectedAggregatedFindingsResult: AutomatedReasoningCheckResult;
}
export type AutomatedReasoningPolicyGeneratedTestCaseList =
  AutomatedReasoningPolicyGeneratedTestCase[];
export interface AutomatedReasoningPolicyGeneratedTestCases {
  generatedTestCases: AutomatedReasoningPolicyGeneratedTestCase[];
}
export type AutomatedReasoningPolicyScenarioAlternateExpression =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyScenario {
  expression: string | redacted.Redacted<string>;
  alternateExpression: string | redacted.Redacted<string>;
  expectedResult: AutomatedReasoningCheckResult;
  ruleIds: string[];
}
export type AutomatedReasoningPolicyScenarioList = AutomatedReasoningPolicyScenario[];
export interface AutomatedReasoningPolicyScenarios {
  policyScenarios: AutomatedReasoningPolicyScenario[];
}
export type AutomatedReasoningPolicyBuildResultAssetName = string | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyBuildResultAssetManifestEntry {
  assetType: AutomatedReasoningPolicyBuildResultAssetType;
  assetName?: string | redacted.Redacted<string>;
  assetId?: string;
}
export type AutomatedReasoningPolicyBuildResultAssetManifestList =
  AutomatedReasoningPolicyBuildResultAssetManifestEntry[];
export interface AutomatedReasoningPolicyBuildResultAssetManifest {
  entries: AutomatedReasoningPolicyBuildResultAssetManifestEntry[];
}
export type AutomatedReasoningPolicyBuildDocumentBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export type AutomatedReasoningPolicyDocumentSha256 = string;
export interface AutomatedReasoningPolicySourceDocument {
  document: Uint8Array | redacted.Redacted<Uint8Array>;
  documentContentType: AutomatedReasoningPolicyBuildDocumentContentType;
  documentName: string | redacted.Redacted<string>;
  documentDescription?: string | redacted.Redacted<string>;
  documentHash: string;
}
export type AutomatedReasoningPolicyCoverageScore = number;
export type AutomatedReasoningPolicyAccuracyScore = number;
export type AutomatedReasoningPolicyDocumentId = string;
export type AutomatedReasoningPolicyStatementId = string;
export interface AutomatedReasoningPolicyStatementReference {
  documentId: string;
  statementId: string;
}
export type AutomatedReasoningPolicyStatementReferenceList =
  AutomatedReasoningPolicyStatementReference[];
export type AutomatedReasoningPolicyJustificationText = string | redacted.Redacted<string>;
export type AutomatedReasoningPolicyJustificationList = (string | redacted.Redacted<string>)[];
export interface AutomatedReasoningPolicyRuleReport {
  rule: string;
  groundingStatements?: AutomatedReasoningPolicyStatementReference[];
  groundingJustifications?: (string | redacted.Redacted<string>)[];
  accuracyScore?: number;
  accuracyJustification?: string | redacted.Redacted<string>;
}
export type AutomatedReasoningPolicyRuleReportMap = {
  [key: string]: AutomatedReasoningPolicyRuleReport | undefined;
};
export interface AutomatedReasoningPolicyVariableReport {
  policyVariable: string | redacted.Redacted<string>;
  groundingStatements?: AutomatedReasoningPolicyStatementReference[];
  groundingJustifications?: (string | redacted.Redacted<string>)[];
  accuracyScore?: number;
  accuracyJustification?: string | redacted.Redacted<string>;
}
export type AutomatedReasoningPolicyVariableReportMap = {
  [key: string]: AutomatedReasoningPolicyVariableReport | undefined;
};
export type AutomatedReasoningPolicyStatementText = string | redacted.Redacted<string>;
export type AutomatedReasoningPolicyLineNumberList = number[];
export interface AutomatedReasoningPolicyStatementLocation {
  lines: number[];
}
export interface AutomatedReasoningPolicyAtomicStatement {
  id: string;
  text: string | redacted.Redacted<string>;
  location: AutomatedReasoningPolicyStatementLocation;
}
export type AutomatedReasoningPolicyAtomicStatementList = AutomatedReasoningPolicyAtomicStatement[];
export type AutomatedReasoningPolicyLineText = string | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyAnnotatedLine {
  lineNumber?: number;
  lineText?: string | redacted.Redacted<string>;
}
export type AutomatedReasoningPolicyAnnotatedContent = {
  line: AutomatedReasoningPolicyAnnotatedLine;
};
export type AutomatedReasoningPolicyAnnotatedContentList =
  AutomatedReasoningPolicyAnnotatedContent[];
export interface AutomatedReasoningPolicyAnnotatedChunk {
  pageNumber?: number;
  content: AutomatedReasoningPolicyAnnotatedContent[];
}
export type AutomatedReasoningPolicyAnnotatedChunkList = AutomatedReasoningPolicyAnnotatedChunk[];
export interface AutomatedReasoningPolicyReportSourceDocument {
  documentName: string | redacted.Redacted<string>;
  documentHash: string;
  documentId: string;
  atomicStatements: AutomatedReasoningPolicyAtomicStatement[];
  documentContent: AutomatedReasoningPolicyAnnotatedChunk[];
}
export type AutomatedReasoningPolicyReportSourceDocumentList =
  AutomatedReasoningPolicyReportSourceDocument[];
export interface AutomatedReasoningPolicyFidelityReport {
  coverageScore: number;
  accuracyScore: number;
  ruleReports: { [key: string]: AutomatedReasoningPolicyRuleReport | undefined };
  variableReports: { [key: string]: AutomatedReasoningPolicyVariableReport | undefined };
  documentSources: AutomatedReasoningPolicyReportSourceDocument[];
}
export type AutomatedReasoningPolicyBuildResultAssets =
  | {
      policyDefinition: AutomatedReasoningPolicyDefinition;
      qualityReport?: never;
      buildLog?: never;
      generatedTestCases?: never;
      policyScenarios?: never;
      assetManifest?: never;
      document?: never;
      fidelityReport?: never;
    }
  | {
      policyDefinition?: never;
      qualityReport: AutomatedReasoningPolicyDefinitionQualityReport;
      buildLog?: never;
      generatedTestCases?: never;
      policyScenarios?: never;
      assetManifest?: never;
      document?: never;
      fidelityReport?: never;
    }
  | {
      policyDefinition?: never;
      qualityReport?: never;
      buildLog: AutomatedReasoningPolicyBuildLog;
      generatedTestCases?: never;
      policyScenarios?: never;
      assetManifest?: never;
      document?: never;
      fidelityReport?: never;
    }
  | {
      policyDefinition?: never;
      qualityReport?: never;
      buildLog?: never;
      generatedTestCases: AutomatedReasoningPolicyGeneratedTestCases;
      policyScenarios?: never;
      assetManifest?: never;
      document?: never;
      fidelityReport?: never;
    }
  | {
      policyDefinition?: never;
      qualityReport?: never;
      buildLog?: never;
      generatedTestCases?: never;
      policyScenarios: AutomatedReasoningPolicyScenarios;
      assetManifest?: never;
      document?: never;
      fidelityReport?: never;
    }
  | {
      policyDefinition?: never;
      qualityReport?: never;
      buildLog?: never;
      generatedTestCases?: never;
      policyScenarios?: never;
      assetManifest: AutomatedReasoningPolicyBuildResultAssetManifest;
      document?: never;
      fidelityReport?: never;
    }
  | {
      policyDefinition?: never;
      qualityReport?: never;
      buildLog?: never;
      generatedTestCases?: never;
      policyScenarios?: never;
      assetManifest?: never;
      document: AutomatedReasoningPolicySourceDocument;
      fidelityReport?: never;
    }
  | {
      policyDefinition?: never;
      qualityReport?: never;
      buildLog?: never;
      generatedTestCases?: never;
      policyScenarios?: never;
      assetManifest?: never;
      document?: never;
      fidelityReport: AutomatedReasoningPolicyFidelityReport;
    };
export interface GetAutomatedReasoningPolicyBuildWorkflowResultAssetsResponse {
  policyArn: string;
  buildWorkflowId: string;
  buildWorkflowAssets?: AutomatedReasoningPolicyBuildResultAssets;
}
export interface GetAutomatedReasoningPolicyNextScenarioRequest {
  policyArn: string;
  buildWorkflowId: string;
}
export interface GetAutomatedReasoningPolicyNextScenarioResponse {
  policyArn: string;
  scenario?: AutomatedReasoningPolicyScenario;
}
export interface GetAutomatedReasoningPolicyTestCaseRequest {
  policyArn: string;
  testCaseId: string;
}
export interface AutomatedReasoningPolicyTestCase {
  testCaseId: string;
  guardContent: string | redacted.Redacted<string>;
  queryContent?: string | redacted.Redacted<string>;
  expectedAggregatedFindingsResult?: AutomatedReasoningCheckResult;
  createdAt: Date;
  updatedAt: Date;
  confidenceThreshold?: number;
}
export interface GetAutomatedReasoningPolicyTestCaseResponse {
  policyArn: string;
  testCase: AutomatedReasoningPolicyTestCase;
}
export interface GetAutomatedReasoningPolicyTestResultRequest {
  policyArn: string;
  buildWorkflowId: string;
  testCaseId: string;
}
export type AutomatedReasoningPolicyTestRunStatus =
  | "NOT_STARTED"
  | "SCHEDULED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | (string & {});
export type AutomatedReasoningLogicStatementContent = string | redacted.Redacted<string>;
export type AutomatedReasoningNaturalLanguageStatementContent = string | redacted.Redacted<string>;
export interface AutomatedReasoningLogicStatement {
  logic: string | redacted.Redacted<string>;
  naturalLanguage?: string | redacted.Redacted<string>;
}
export type AutomatedReasoningLogicStatementList = AutomatedReasoningLogicStatement[];
export interface AutomatedReasoningCheckInputTextReference {
  text?: string | redacted.Redacted<string>;
}
export type AutomatedReasoningCheckInputTextReferenceList =
  AutomatedReasoningCheckInputTextReference[];
export interface AutomatedReasoningCheckTranslation {
  premises?: AutomatedReasoningLogicStatement[];
  claims: AutomatedReasoningLogicStatement[];
  untranslatedPremises?: AutomatedReasoningCheckInputTextReference[];
  untranslatedClaims?: AutomatedReasoningCheckInputTextReference[];
  confidence: number;
}
export interface AutomatedReasoningCheckScenario {
  statements?: AutomatedReasoningLogicStatement[];
}
export interface AutomatedReasoningCheckRule {
  id?: string;
  policyVersionArn?: string;
}
export type AutomatedReasoningCheckRuleList = AutomatedReasoningCheckRule[];
export type AutomatedReasoningCheckLogicWarningType =
  | "ALWAYS_TRUE"
  | "ALWAYS_FALSE"
  | (string & {});
export interface AutomatedReasoningCheckLogicWarning {
  type?: AutomatedReasoningCheckLogicWarningType;
  premises?: AutomatedReasoningLogicStatement[];
  claims?: AutomatedReasoningLogicStatement[];
}
export interface AutomatedReasoningCheckValidFinding {
  translation?: AutomatedReasoningCheckTranslation;
  claimsTrueScenario?: AutomatedReasoningCheckScenario;
  supportingRules?: AutomatedReasoningCheckRule[];
  logicWarning?: AutomatedReasoningCheckLogicWarning;
}
export interface AutomatedReasoningCheckInvalidFinding {
  translation?: AutomatedReasoningCheckTranslation;
  contradictingRules?: AutomatedReasoningCheckRule[];
  logicWarning?: AutomatedReasoningCheckLogicWarning;
}
export interface AutomatedReasoningCheckSatisfiableFinding {
  translation?: AutomatedReasoningCheckTranslation;
  claimsTrueScenario?: AutomatedReasoningCheckScenario;
  claimsFalseScenario?: AutomatedReasoningCheckScenario;
  logicWarning?: AutomatedReasoningCheckLogicWarning;
}
export interface AutomatedReasoningCheckImpossibleFinding {
  translation?: AutomatedReasoningCheckTranslation;
  contradictingRules?: AutomatedReasoningCheckRule[];
  logicWarning?: AutomatedReasoningCheckLogicWarning;
}
export type AutomatedReasoningCheckTranslationList = AutomatedReasoningCheckTranslation[];
export interface AutomatedReasoningCheckTranslationOption {
  translations?: AutomatedReasoningCheckTranslation[];
}
export type AutomatedReasoningCheckTranslationOptionList =
  AutomatedReasoningCheckTranslationOption[];
export type AutomatedReasoningCheckDifferenceScenarioList = AutomatedReasoningCheckScenario[];
export interface AutomatedReasoningCheckTranslationAmbiguousFinding {
  options?: AutomatedReasoningCheckTranslationOption[];
  differenceScenarios?: AutomatedReasoningCheckScenario[];
}
export interface AutomatedReasoningCheckTooComplexFinding {}
export interface AutomatedReasoningCheckNoTranslationsFinding {}
export type AutomatedReasoningCheckFinding =
  | {
      valid: AutomatedReasoningCheckValidFinding;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid: AutomatedReasoningCheckInvalidFinding;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable: AutomatedReasoningCheckSatisfiableFinding;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible: AutomatedReasoningCheckImpossibleFinding;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous: AutomatedReasoningCheckTranslationAmbiguousFinding;
      tooComplex?: never;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex: AutomatedReasoningCheckTooComplexFinding;
      noTranslations?: never;
    }
  | {
      valid?: never;
      invalid?: never;
      satisfiable?: never;
      impossible?: never;
      translationAmbiguous?: never;
      tooComplex?: never;
      noTranslations: AutomatedReasoningCheckNoTranslationsFinding;
    };
export type AutomatedReasoningCheckFindingList = AutomatedReasoningCheckFinding[];
export type AutomatedReasoningPolicyTestRunResult = "PASSED" | "FAILED" | (string & {});
export interface AutomatedReasoningPolicyTestResult {
  testCase: AutomatedReasoningPolicyTestCase;
  policyArn: string;
  testRunStatus: AutomatedReasoningPolicyTestRunStatus;
  testFindings?: AutomatedReasoningCheckFinding[];
  testRunResult?: AutomatedReasoningPolicyTestRunResult;
  aggregatedTestFindingsResult?: AutomatedReasoningCheckResult;
  updatedAt: Date;
}
export interface GetAutomatedReasoningPolicyTestResultResponse {
  testResult: AutomatedReasoningPolicyTestResult;
}
export interface GetCustomModelRequest {
  modelIdentifier: string;
}
export type MetricFloat = number;
export interface TrainingMetrics {
  trainingLoss?: number;
}
export interface ValidatorMetric {
  validationLoss?: number;
}
export type ValidationMetrics = ValidatorMetric[];
export type ModelStatus = "Active" | "Creating" | "Failed" | (string & {});
export interface GetCustomModelResponse {
  modelArn: string;
  modelName: string;
  jobName?: string;
  jobArn?: string;
  baseModelArn?: string;
  customizationType?: CustomizationType;
  modelKmsKeyArn?: string;
  hyperParameters?: { [key: string]: string | undefined };
  trainingDataConfig?: TrainingDataConfig;
  validationDataConfig?: ValidationDataConfig;
  outputDataConfig?: OutputDataConfig;
  trainingMetrics?: TrainingMetrics;
  validationMetrics?: ValidatorMetric[];
  creationTime: Date;
  customizationConfig?: CustomizationConfig;
  modelStatus?: ModelStatus;
  failureMessage?: string;
}
export interface GetCustomModelDeploymentRequest {
  customModelDeploymentIdentifier: string;
}
export type CustomModelDeploymentStatus = "Creating" | "Active" | "Failed" | (string & {});
export type CustomModelDeploymentUpdateStatus =
  | "Updating"
  | "UpdateCompleted"
  | "UpdateFailed"
  | (string & {});
export interface CustomModelDeploymentUpdateDetails {
  modelArn: string;
  updateStatus: CustomModelDeploymentUpdateStatus;
}
export interface GetCustomModelDeploymentResponse {
  customModelDeploymentArn: string;
  modelDeploymentName: string;
  modelArn: string;
  createdAt: Date;
  status: CustomModelDeploymentStatus;
  description?: string;
  updateDetails?: CustomModelDeploymentUpdateDetails;
  failureMessage?: string;
  lastUpdatedAt?: Date;
}
export interface GetEvaluationJobRequest {
  jobIdentifier: string | redacted.Redacted<string>;
}
export type EvaluationJobType = "Human" | "Automated" | (string & {});
export type ErrorMessages = string[];
export interface GetEvaluationJobResponse {
  jobName: string;
  status: EvaluationJobStatus;
  jobArn: string;
  jobDescription?: string | redacted.Redacted<string>;
  roleArn: string;
  customerEncryptionKeyId?: string;
  jobType: EvaluationJobType;
  applicationType?: ApplicationType;
  evaluationConfig: EvaluationConfig;
  inferenceConfig: EvaluationInferenceConfig;
  outputDataConfig: EvaluationOutputDataConfig;
  creationTime: Date;
  lastModifiedTime?: Date;
  failureMessages?: string[];
}
export type GetFoundationModelIdentifier = string;
export interface GetFoundationModelRequest {
  modelIdentifier: string;
}
export type FoundationModelArn = string;
export type BrandedName = string;
export type ModelModality = "TEXT" | "IMAGE" | "EMBEDDING" | (string & {});
export type ModelModalityList = ModelModality[];
export type ModelCustomization =
  | "FINE_TUNING"
  | "CONTINUED_PRE_TRAINING"
  | "DISTILLATION"
  | (string & {});
export type ModelCustomizationList = ModelCustomization[];
export type InferenceType = "ON_DEMAND" | "PROVISIONED" | (string & {});
export type InferenceTypeList = InferenceType[];
export type FoundationModelLifecycleStatus = "ACTIVE" | "LEGACY" | (string & {});
export interface FoundationModelLifecycle {
  status: FoundationModelLifecycleStatus;
  startOfLifeTime?: Date;
  endOfLifeTime?: Date;
  legacyTime?: Date;
  publicExtendedAccessTime?: Date;
}
export interface FoundationModelDetails {
  modelArn: string;
  modelId: string;
  modelName?: string;
  providerName?: string;
  inputModalities?: ModelModality[];
  outputModalities?: ModelModality[];
  responseStreamingSupported?: boolean;
  customizationsSupported?: ModelCustomization[];
  inferenceTypesSupported?: InferenceType[];
  modelLifecycle?: FoundationModelLifecycle;
}
export interface GetFoundationModelResponse {
  modelDetails?: FoundationModelDetails;
}
export interface GetFoundationModelAvailabilityRequest {
  modelId: string;
}
export type AgreementStatus = "AVAILABLE" | "PENDING" | "NOT_AVAILABLE" | "ERROR" | (string & {});
export interface AgreementAvailability {
  status: AgreementStatus;
  errorMessage?: string;
}
export type AuthorizationStatus = "AUTHORIZED" | "NOT_AUTHORIZED" | (string & {});
export type EntitlementAvailability = "AVAILABLE" | "NOT_AVAILABLE" | (string & {});
export type RegionAvailability = "AVAILABLE" | "NOT_AVAILABLE" | (string & {});
export interface GetFoundationModelAvailabilityResponse {
  modelId: string;
  agreementAvailability: AgreementAvailability;
  authorizationStatus: AuthorizationStatus;
  entitlementAvailability: EntitlementAvailability;
  regionAvailability: RegionAvailability;
}
export type GuardrailVersion = string;
export interface GetGuardrailRequest {
  guardrailIdentifier: string;
  guardrailVersion?: string;
}
export type GuardrailStatus =
  | "CREATING"
  | "UPDATING"
  | "VERSIONING"
  | "READY"
  | "FAILED"
  | "DELETING"
  | (string & {});
export interface GuardrailTopic {
  name: string | redacted.Redacted<string>;
  definition: string | redacted.Redacted<string>;
  examples?: (string | redacted.Redacted<string>)[];
  type?: GuardrailTopicType;
  inputAction?: GuardrailTopicAction;
  outputAction?: GuardrailTopicAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export type GuardrailTopics = GuardrailTopic[];
export interface GuardrailTopicsTier {
  tierName: GuardrailTopicsTierName;
}
export interface GuardrailTopicPolicy {
  topics: GuardrailTopic[];
  tier?: GuardrailTopicsTier;
}
export interface GuardrailContentFilter {
  type: GuardrailContentFilterType;
  inputStrength: GuardrailFilterStrength;
  outputStrength: GuardrailFilterStrength;
  inputModalities?: GuardrailModality[];
  outputModalities?: GuardrailModality[];
  inputAction?: GuardrailContentFilterAction;
  outputAction?: GuardrailContentFilterAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export type GuardrailContentFilters = GuardrailContentFilter[];
export interface GuardrailContentFiltersTier {
  tierName: GuardrailContentFiltersTierName;
}
export interface GuardrailContentPolicy {
  filters?: GuardrailContentFilter[];
  tier?: GuardrailContentFiltersTier;
}
export interface GuardrailWord {
  text: string;
  inputAction?: GuardrailWordAction;
  outputAction?: GuardrailWordAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export type GuardrailWords = GuardrailWord[];
export interface GuardrailManagedWords {
  type: GuardrailManagedWordsType;
  inputAction?: GuardrailWordAction;
  outputAction?: GuardrailWordAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export type GuardrailManagedWordLists = GuardrailManagedWords[];
export interface GuardrailWordPolicy {
  words?: GuardrailWord[];
  managedWordLists?: GuardrailManagedWords[];
}
export interface GuardrailPiiEntity {
  type: GuardrailPiiEntityType;
  action: GuardrailSensitiveInformationAction;
  inputAction?: GuardrailSensitiveInformationAction;
  outputAction?: GuardrailSensitiveInformationAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export type GuardrailPiiEntities = GuardrailPiiEntity[];
export interface GuardrailRegex {
  name: string;
  description?: string;
  pattern: string;
  action: GuardrailSensitiveInformationAction;
  inputAction?: GuardrailSensitiveInformationAction;
  outputAction?: GuardrailSensitiveInformationAction;
  inputEnabled?: boolean;
  outputEnabled?: boolean;
}
export type GuardrailRegexes = GuardrailRegex[];
export interface GuardrailSensitiveInformationPolicy {
  piiEntities?: GuardrailPiiEntity[];
  regexes?: GuardrailRegex[];
}
export interface GuardrailContextualGroundingFilter {
  type: GuardrailContextualGroundingFilterType;
  threshold: number;
  action?: GuardrailContextualGroundingAction;
  enabled?: boolean;
}
export type GuardrailContextualGroundingFilters = GuardrailContextualGroundingFilter[];
export interface GuardrailContextualGroundingPolicy {
  filters: GuardrailContextualGroundingFilter[];
}
export interface GuardrailAutomatedReasoningPolicy {
  policies: string[];
  confidenceThreshold?: number;
}
export type GuardrailCrossRegionGuardrailProfileId = string;
export type GuardrailCrossRegionGuardrailProfileArn = string;
export interface GuardrailCrossRegionDetails {
  guardrailProfileId?: string;
  guardrailProfileArn?: string;
}
export type GuardrailStatusReason = string | redacted.Redacted<string>;
export type GuardrailStatusReasons = (string | redacted.Redacted<string>)[];
export type GuardrailFailureRecommendation = string | redacted.Redacted<string>;
export type GuardrailFailureRecommendations = (string | redacted.Redacted<string>)[];
export interface GetGuardrailResponse {
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  guardrailId: string;
  guardrailArn: string;
  version: string;
  status: GuardrailStatus;
  topicPolicy?: GuardrailTopicPolicy;
  contentPolicy?: GuardrailContentPolicy;
  wordPolicy?: GuardrailWordPolicy;
  sensitiveInformationPolicy?: GuardrailSensitiveInformationPolicy;
  contextualGroundingPolicy?: GuardrailContextualGroundingPolicy;
  automatedReasoningPolicy?: GuardrailAutomatedReasoningPolicy;
  crossRegionDetails?: GuardrailCrossRegionDetails;
  createdAt: Date;
  updatedAt: Date;
  statusReasons?: (string | redacted.Redacted<string>)[];
  failureRecommendations?: (string | redacted.Redacted<string>)[];
  blockedInputMessaging: string | redacted.Redacted<string>;
  blockedOutputsMessaging: string | redacted.Redacted<string>;
  kmsKeyArn?: string;
}
export interface GetImportedModelRequest {
  modelIdentifier: string;
}
export type ImportedModelArn = string;
export type InstructSupported = boolean;
export type CustomModelUnitsVersion = string;
export interface CustomModelUnits {
  customModelUnitsPerModelCopy?: number;
  customModelUnitsVersion?: string;
}
export interface GetImportedModelResponse {
  modelArn?: string;
  modelName?: string;
  jobName?: string;
  jobArn?: string;
  modelDataSource?: ModelDataSource;
  creationTime?: Date;
  modelArchitecture?: string;
  modelKmsKeyArn?: string;
  instructSupported?: boolean;
  customModelUnits?: CustomModelUnits;
}
export interface GetInferenceProfileRequest {
  inferenceProfileIdentifier: string;
}
export interface InferenceProfileModel {
  modelArn?: string;
}
export type InferenceProfileModels = InferenceProfileModel[];
export type InferenceProfileId = string;
export type InferenceProfileType = "SYSTEM_DEFINED" | "APPLICATION" | (string & {});
export interface GetInferenceProfileResponse {
  inferenceProfileName: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  updatedAt?: Date;
  inferenceProfileArn: string;
  models: InferenceProfileModel[];
  inferenceProfileId: string;
  status: InferenceProfileStatus;
  type: InferenceProfileType;
}
export interface GetMarketplaceModelEndpointRequest {
  endpointArn: string;
}
export interface GetMarketplaceModelEndpointResponse {
  marketplaceModelEndpoint?: MarketplaceModelEndpoint;
}
export interface GetModelCopyJobRequest {
  jobArn: string;
}
export type ModelCopyJobStatus = "InProgress" | "Completed" | "Failed" | (string & {});
export interface GetModelCopyJobResponse {
  jobArn: string;
  status: ModelCopyJobStatus;
  creationTime: Date;
  targetModelArn: string;
  targetModelName?: string;
  sourceAccountId: string;
  sourceModelArn: string;
  targetModelKmsKeyArn?: string;
  targetModelTags?: Tag[];
  failureMessage?: string;
  sourceModelName?: string;
}
export type ModelCustomizationJobIdentifier = string;
export interface GetModelCustomizationJobRequest {
  jobIdentifier: string;
}
export type ModelCustomizationJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export type JobStatusDetails =
  | "InProgress"
  | "Completed"
  | "Stopping"
  | "Stopped"
  | "Failed"
  | "NotStarted"
  | (string & {});
export interface ValidationDetails {
  status?: JobStatusDetails;
  creationTime?: Date;
  lastModifiedTime?: Date;
}
export interface DataProcessingDetails {
  status?: JobStatusDetails;
  creationTime?: Date;
  lastModifiedTime?: Date;
}
export interface TrainingDetails {
  status?: JobStatusDetails;
  creationTime?: Date;
  lastModifiedTime?: Date;
}
export interface StatusDetails {
  validationDetails?: ValidationDetails;
  dataProcessingDetails?: DataProcessingDetails;
  trainingDetails?: TrainingDetails;
}
export interface GetModelCustomizationJobResponse {
  jobArn: string;
  jobName: string;
  outputModelName: string;
  outputModelArn?: string;
  clientRequestToken?: string;
  roleArn: string;
  status?: ModelCustomizationJobStatus;
  statusDetails?: StatusDetails;
  failureMessage?: string;
  creationTime: Date;
  lastModifiedTime?: Date;
  endTime?: Date;
  baseModelArn: string;
  hyperParameters?: { [key: string]: string | undefined };
  trainingDataConfig: TrainingDataConfig;
  validationDataConfig: ValidationDataConfig;
  outputDataConfig: OutputDataConfig;
  customizationType?: CustomizationType;
  outputModelKmsKeyArn?: string;
  trainingMetrics?: TrainingMetrics;
  validationMetrics?: ValidatorMetric[];
  vpcConfig?: VpcConfig;
  customizationConfig?: CustomizationConfig;
}
export type ModelImportJobIdentifier = string;
export interface GetModelImportJobRequest {
  jobIdentifier: string;
}
export type ModelImportJobStatus = "InProgress" | "Completed" | "Failed" | (string & {});
export interface GetModelImportJobResponse {
  jobArn?: string;
  jobName?: string;
  importedModelName?: string;
  importedModelArn?: string;
  roleArn?: string;
  modelDataSource?: ModelDataSource;
  status?: ModelImportJobStatus;
  failureMessage?: string;
  creationTime?: Date;
  lastModifiedTime?: Date;
  endTime?: Date;
  vpcConfig?: VpcConfig;
  importedModelKmsKeyArn?: string;
}
export type ModelInvocationJobIdentifier = string;
export interface GetModelInvocationJobRequest {
  jobIdentifier: string;
}
export type ModelInvocationJobStatus =
  | "Submitted"
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | "PartiallyCompleted"
  | "Expired"
  | "Validating"
  | "Scheduled"
  | (string & {});
export type Message = string | redacted.Redacted<string>;
export type NonNegativeLong = number;
export interface GetModelInvocationJobResponse {
  jobArn: string;
  jobName?: string;
  modelId: string;
  clientRequestToken?: string;
  roleArn: string;
  status?: ModelInvocationJobStatus;
  message?: string | redacted.Redacted<string>;
  submitTime: Date;
  lastModifiedTime?: Date;
  endTime?: Date;
  inputDataConfig: ModelInvocationJobInputDataConfig;
  outputDataConfig: ModelInvocationJobOutputDataConfig;
  vpcConfig?: VpcConfig;
  timeoutDurationInHours?: number;
  jobExpirationTime?: Date;
  modelInvocationType?: ModelInvocationType;
  totalRecordCount?: number;
  processedRecordCount?: number;
  successRecordCount?: number;
  errorRecordCount?: number;
}
export interface GetModelInvocationLoggingConfigurationRequest {}
export type LogGroupName = string;
export type BucketName = string;
export type KeyPrefix = string;
export interface S3Config {
  bucketName: string;
  keyPrefix?: string;
}
export interface CloudWatchConfig {
  logGroupName: string;
  roleArn: string;
  largeDataDeliveryS3Config?: S3Config;
}
export interface LoggingConfig {
  cloudWatchConfig?: CloudWatchConfig;
  s3Config?: S3Config;
  textDataDeliveryEnabled?: boolean;
  imageDataDeliveryEnabled?: boolean;
  embeddingDataDeliveryEnabled?: boolean;
  videoDataDeliveryEnabled?: boolean;
  audioDataDeliveryEnabled?: boolean;
}
export interface GetModelInvocationLoggingConfigurationResponse {
  loggingConfig?: LoggingConfig;
}
export interface GetPromptRouterRequest {
  promptRouterArn: string;
}
export type PromptRouterStatus = "AVAILABLE" | (string & {});
export type PromptRouterType = "custom" | "default" | (string & {});
export interface GetPromptRouterResponse {
  promptRouterName: string;
  routingCriteria: RoutingCriteria;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  updatedAt?: Date;
  promptRouterArn: string;
  models: (PromptRouterTargetModel & { modelArn: PromptRouterTargetModelArn })[];
  fallbackModel: PromptRouterTargetModel & { modelArn: PromptRouterTargetModelArn };
  status: PromptRouterStatus;
  type: PromptRouterType;
}
export interface GetProvisionedModelThroughputRequest {
  provisionedModelId: string;
}
export type ProvisionedModelStatus =
  | "Creating"
  | "InService"
  | "Updating"
  | "Failed"
  | (string & {});
export interface GetProvisionedModelThroughputResponse {
  modelUnits: number;
  desiredModelUnits: number;
  provisionedModelName: string;
  provisionedModelArn: string;
  modelArn: string;
  desiredModelArn: string;
  foundationModelArn: string;
  status: ProvisionedModelStatus;
  creationTime: Date;
  lastModifiedTime: Date;
  failureMessage?: string;
  commitmentDuration?: CommitmentDuration;
  commitmentExpirationTime?: Date;
}
export interface GetResourcePolicyRequest {
  resourceArn: string;
}
export type ResourcePolicyDocument = string;
export interface GetResourcePolicyResponse {
  resourcePolicy?: string;
}
export interface GetUseCaseForModelAccessRequest {}
export type AcknowledgementFormDataBody = Uint8Array;
export interface GetUseCaseForModelAccessResponse {
  formData: Uint8Array;
}
export type MaxResults = number;
export type PaginationToken = string;
export type SortJobsBy = "CreationTime" | (string & {});
export type SortOrder = "Ascending" | "Descending" | (string & {});
export interface ListAdvancedPromptOptimizationJobsRequest {
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortJobsBy;
  sortOrder?: SortOrder;
}
export interface AdvancedPromptOptimizationJobSummary {
  jobArn: string;
  jobName: string;
  jobStatus: AdvancedPromptOptimizationJobStatus;
  creationTime: Date;
  lastModifiedTime?: Date;
}
export type AdvancedPromptOptimizationJobSummaries = AdvancedPromptOptimizationJobSummary[];
export interface ListAdvancedPromptOptimizationJobsResponse {
  jobSummaries?: AdvancedPromptOptimizationJobSummary[];
  nextToken?: string;
}
export interface ListAutomatedReasoningPoliciesRequest {
  policyArn?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface AutomatedReasoningPolicySummary {
  policyArn: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  version: string;
  policyId: string;
  createdAt: Date;
  updatedAt: Date;
}
export type AutomatedReasoningPolicySummaries = AutomatedReasoningPolicySummary[];
export interface ListAutomatedReasoningPoliciesResponse {
  automatedReasoningPolicySummaries: AutomatedReasoningPolicySummary[];
  nextToken?: string;
}
export interface ListAutomatedReasoningPolicyBuildWorkflowsRequest {
  policyArn: string;
  nextToken?: string;
  maxResults?: number;
}
export interface AutomatedReasoningPolicyBuildWorkflowSummary {
  policyArn: string;
  buildWorkflowId: string;
  status: AutomatedReasoningPolicyBuildWorkflowStatus;
  buildWorkflowType: AutomatedReasoningPolicyBuildWorkflowType;
  createdAt: Date;
  updatedAt: Date;
}
export type AutomatedReasoningPolicyBuildWorkflowSummaries =
  AutomatedReasoningPolicyBuildWorkflowSummary[];
export interface ListAutomatedReasoningPolicyBuildWorkflowsResponse {
  automatedReasoningPolicyBuildWorkflowSummaries: AutomatedReasoningPolicyBuildWorkflowSummary[];
  nextToken?: string;
}
export interface ListAutomatedReasoningPolicyTestCasesRequest {
  policyArn: string;
  nextToken?: string;
  maxResults?: number;
}
export type AutomatedReasoningPolicyTestCaseList = AutomatedReasoningPolicyTestCase[];
export interface ListAutomatedReasoningPolicyTestCasesResponse {
  testCases: AutomatedReasoningPolicyTestCase[];
  nextToken?: string;
}
export interface ListAutomatedReasoningPolicyTestResultsRequest {
  policyArn: string;
  buildWorkflowId: string;
  nextToken?: string;
  maxResults?: number;
}
export type AutomatedReasoningPolicyTestList = AutomatedReasoningPolicyTestResult[];
export interface ListAutomatedReasoningPolicyTestResultsResponse {
  testResults: AutomatedReasoningPolicyTestResult[];
  nextToken?: string;
}
export type SortModelsBy = "CreationTime" | (string & {});
export interface ListCustomModelDeploymentsRequest {
  createdBefore?: Date;
  createdAfter?: Date;
  nameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortModelsBy;
  sortOrder?: SortOrder;
  statusEquals?: CustomModelDeploymentStatus;
  modelArnEquals?: string;
}
export interface CustomModelDeploymentSummary {
  customModelDeploymentArn: string;
  customModelDeploymentName: string;
  modelArn: string;
  createdAt: Date;
  status: CustomModelDeploymentStatus;
  lastUpdatedAt?: Date;
  failureMessage?: string;
}
export type CustomModelDeploymentSummaryList = CustomModelDeploymentSummary[];
export interface ListCustomModelDeploymentsResponse {
  nextToken?: string;
  modelDeploymentSummaries?: CustomModelDeploymentSummary[];
}
export interface ListCustomModelsRequest {
  creationTimeBefore?: Date;
  creationTimeAfter?: Date;
  nameContains?: string;
  baseModelArnEquals?: string;
  foundationModelArnEquals?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortModelsBy;
  sortOrder?: SortOrder;
  isOwned?: boolean;
  modelStatus?: ModelStatus;
}
export type ModelName = string;
export interface CustomModelSummary {
  modelArn: string;
  modelName: string;
  creationTime: Date;
  baseModelArn: string;
  baseModelName: string;
  customizationType?: CustomizationType;
  ownerAccountId?: string;
  modelStatus?: ModelStatus;
}
export type CustomModelSummaryList = CustomModelSummary[];
export interface ListCustomModelsResponse {
  nextToken?: string;
  modelSummaries?: CustomModelSummary[];
}
export interface ListEnforcedGuardrailsConfigurationRequest {
  nextToken?: string;
}
export type InputTags = "HONOR" | "IGNORE" | (string & {});
export type SelectiveGuardingMode = "SELECTIVE" | "COMPREHENSIVE" | (string & {});
export interface SelectiveContentGuarding {
  system?: SelectiveGuardingMode;
  messages?: SelectiveGuardingMode;
}
export type ConfigurationOwner = string;
export type IncludedModelId = string;
export type IncludedModelsList = string[];
export type ExcludedModelId = string;
export type ExcludedModelsList = string[];
export interface ModelEnforcement {
  includedModels: string[];
  excludedModels: string[];
}
export interface AccountEnforcedGuardrailOutputConfiguration {
  configId?: string;
  guardrailArn?: string;
  guardrailId?: string;
  inputTags?: InputTags;
  selectiveContentGuarding?: SelectiveContentGuarding;
  guardrailVersion?: string;
  createdAt?: Date;
  createdBy?: string;
  updatedAt?: Date;
  updatedBy?: string;
  owner?: string;
  modelEnforcement?: ModelEnforcement;
}
export type AccountEnforcedGuardrailsOutputConfiguration =
  AccountEnforcedGuardrailOutputConfiguration[];
export interface ListEnforcedGuardrailsConfigurationResponse {
  guardrailsConfig: AccountEnforcedGuardrailOutputConfiguration[];
  nextToken?: string;
}
export interface ListEvaluationJobsRequest {
  creationTimeAfter?: Date;
  creationTimeBefore?: Date;
  statusEquals?: EvaluationJobStatus;
  applicationTypeEquals?: ApplicationType;
  nameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortJobsBy;
  sortOrder?: SortOrder;
}
export type EvaluationTaskTypes = EvaluationTaskType[];
export type EvaluationBedrockModelIdentifiers = string[];
export type EvaluationBedrockKnowledgeBaseIdentifiers = string[];
export type EvaluatorModelIdentifiers = string[];
export type EvaluationPrecomputedInferenceSourceIdentifiers = string[];
export interface EvaluationModelConfigSummary {
  bedrockModelIdentifiers?: string[];
  precomputedInferenceSourceIdentifiers?: string[];
}
export type EvaluationPrecomputedRagSourceIdentifiers = string[];
export interface EvaluationRagConfigSummary {
  bedrockKnowledgeBaseIdentifiers?: string[];
  precomputedRagSourceIdentifiers?: string[];
}
export interface EvaluationInferenceConfigSummary {
  modelConfigSummary?: EvaluationModelConfigSummary;
  ragConfigSummary?: EvaluationRagConfigSummary;
}
export interface EvaluationSummary {
  jobArn: string;
  jobName: string;
  status: EvaluationJobStatus;
  creationTime: Date;
  jobType: EvaluationJobType;
  evaluationTaskTypes: EvaluationTaskType[];
  modelIdentifiers?: string[];
  ragIdentifiers?: string[];
  evaluatorModelIdentifiers?: string[];
  customMetricsEvaluatorModelIdentifiers?: string[];
  inferenceConfigSummary?: EvaluationInferenceConfigSummary;
  applicationType?: ApplicationType;
}
export type EvaluationSummaries = EvaluationSummary[];
export interface ListEvaluationJobsResponse {
  nextToken?: string;
  jobSummaries?: EvaluationSummary[];
}
export type OfferType = "ALL" | "PUBLIC" | (string & {});
export interface ListFoundationModelAgreementOffersRequest {
  modelId: string;
  offerType?: OfferType;
}
export type OfferId = string;
export interface DimensionalPriceRate {
  dimension?: string;
  price?: string;
  description?: string;
  unit?: string;
}
export type RateCard = DimensionalPriceRate[];
export interface PricingTerm {
  rateCard: DimensionalPriceRate[];
}
export interface LegalTerm {
  url?: string;
}
export interface SupportTerm {
  refundPolicyDescription?: string;
}
export interface ValidityTerm {
  agreementDuration?: string;
}
export interface TermDetails {
  usageBasedPricingTerm: PricingTerm;
  legalTerm: LegalTerm;
  supportTerm: SupportTerm;
  validityTerm?: ValidityTerm;
}
export interface Offer {
  offerId?: string;
  offerToken: string;
  termDetails: TermDetails;
}
export type Offers = Offer[];
export interface ListFoundationModelAgreementOffersResponse {
  modelId: string;
  offers: Offer[];
}
export type Provider = string;
export interface ListFoundationModelsRequest {
  byProvider?: string;
  byCustomizationType?: ModelCustomization;
  byOutputModality?: ModelModality;
  byInferenceType?: InferenceType;
}
export interface FoundationModelSummary {
  modelArn: string;
  modelId: string;
  modelName?: string;
  providerName?: string;
  inputModalities?: ModelModality[];
  outputModalities?: ModelModality[];
  responseStreamingSupported?: boolean;
  customizationsSupported?: ModelCustomization[];
  inferenceTypesSupported?: InferenceType[];
  modelLifecycle?: FoundationModelLifecycle;
}
export type FoundationModelSummaryList = FoundationModelSummary[];
export interface ListFoundationModelsResponse {
  modelSummaries?: FoundationModelSummary[];
}
export interface ListGuardrailsRequest {
  guardrailIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface GuardrailSummary {
  id: string;
  arn: string;
  status: GuardrailStatus;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  version: string;
  createdAt: Date;
  updatedAt: Date;
  crossRegionDetails?: GuardrailCrossRegionDetails;
}
export type GuardrailSummaries = GuardrailSummary[];
export interface ListGuardrailsResponse {
  guardrails: GuardrailSummary[];
  nextToken?: string;
}
export interface ListImportedModelsRequest {
  creationTimeBefore?: Date;
  creationTimeAfter?: Date;
  nameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortModelsBy;
  sortOrder?: SortOrder;
}
export type ModelArchitecture = string;
export interface ImportedModelSummary {
  modelArn: string;
  modelName: string;
  creationTime: Date;
  instructSupported?: boolean;
  modelArchitecture?: string;
}
export type ImportedModelSummaryList = ImportedModelSummary[];
export interface ListImportedModelsResponse {
  nextToken?: string;
  modelSummaries?: ImportedModelSummary[];
}
export interface ListInferenceProfilesRequest {
  maxResults?: number;
  nextToken?: string;
  typeEquals?: InferenceProfileType;
}
export interface InferenceProfileSummary {
  inferenceProfileName: string;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  updatedAt?: Date;
  inferenceProfileArn: string;
  models: InferenceProfileModel[];
  inferenceProfileId: string;
  status: InferenceProfileStatus;
  type: InferenceProfileType;
}
export type InferenceProfileSummaries = InferenceProfileSummary[];
export interface ListInferenceProfilesResponse {
  inferenceProfileSummaries?: InferenceProfileSummary[];
  nextToken?: string;
}
export interface ListMarketplaceModelEndpointsRequest {
  maxResults?: number;
  nextToken?: string;
  modelSourceEquals?: string;
}
export interface MarketplaceModelEndpointSummary {
  endpointArn: string;
  modelSourceIdentifier: string;
  status?: Status;
  statusMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type MarketplaceModelEndpointSummaries = MarketplaceModelEndpointSummary[];
export interface ListMarketplaceModelEndpointsResponse {
  marketplaceModelEndpoints?: MarketplaceModelEndpointSummary[];
  nextToken?: string;
}
export interface ListModelCopyJobsRequest {
  creationTimeAfter?: Date;
  creationTimeBefore?: Date;
  statusEquals?: ModelCopyJobStatus;
  sourceAccountEquals?: string;
  sourceModelArnEquals?: string;
  targetModelNameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortJobsBy;
  sortOrder?: SortOrder;
}
export interface ModelCopyJobSummary {
  jobArn: string;
  status: ModelCopyJobStatus;
  creationTime: Date;
  targetModelArn: string;
  targetModelName?: string;
  sourceAccountId: string;
  sourceModelArn: string;
  targetModelKmsKeyArn?: string;
  targetModelTags?: Tag[];
  failureMessage?: string;
  sourceModelName?: string;
}
export type ModelCopyJobSummaries = ModelCopyJobSummary[];
export interface ListModelCopyJobsResponse {
  nextToken?: string;
  modelCopyJobSummaries?: ModelCopyJobSummary[];
}
export type FineTuningJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | "Stopping"
  | "Stopped"
  | (string & {});
export interface ListModelCustomizationJobsRequest {
  creationTimeAfter?: Date;
  creationTimeBefore?: Date;
  statusEquals?: FineTuningJobStatus;
  nameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortJobsBy;
  sortOrder?: SortOrder;
}
export interface ModelCustomizationJobSummary {
  jobArn: string;
  baseModelArn: string;
  jobName: string;
  status: ModelCustomizationJobStatus;
  statusDetails?: StatusDetails;
  lastModifiedTime?: Date;
  creationTime: Date;
  endTime?: Date;
  customModelArn?: string;
  customModelName?: string;
  customizationType?: CustomizationType;
}
export type ModelCustomizationJobSummaries = ModelCustomizationJobSummary[];
export interface ListModelCustomizationJobsResponse {
  nextToken?: string;
  modelCustomizationJobSummaries?: ModelCustomizationJobSummary[];
}
export interface ListModelImportJobsRequest {
  creationTimeAfter?: Date;
  creationTimeBefore?: Date;
  statusEquals?: ModelImportJobStatus;
  nameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortJobsBy;
  sortOrder?: SortOrder;
}
export interface ModelImportJobSummary {
  jobArn: string;
  jobName: string;
  status: ModelImportJobStatus;
  lastModifiedTime?: Date;
  creationTime: Date;
  endTime?: Date;
  importedModelArn?: string;
  importedModelName?: string;
}
export type ModelImportJobSummaries = ModelImportJobSummary[];
export interface ListModelImportJobsResponse {
  nextToken?: string;
  modelImportJobSummaries?: ModelImportJobSummary[];
}
export interface ListModelInvocationJobsRequest {
  submitTimeAfter?: Date;
  submitTimeBefore?: Date;
  statusEquals?: ModelInvocationJobStatus;
  nameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortJobsBy;
  sortOrder?: SortOrder;
}
export interface ModelInvocationJobSummary {
  jobArn: string;
  jobName: string;
  modelId: string;
  clientRequestToken?: string;
  roleArn: string;
  status?: ModelInvocationJobStatus;
  message?: string | redacted.Redacted<string>;
  submitTime: Date;
  lastModifiedTime?: Date;
  endTime?: Date;
  inputDataConfig: ModelInvocationJobInputDataConfig;
  outputDataConfig: ModelInvocationJobOutputDataConfig;
  vpcConfig?: VpcConfig;
  timeoutDurationInHours?: number;
  jobExpirationTime?: Date;
  modelInvocationType?: ModelInvocationType;
  totalRecordCount?: number;
  processedRecordCount?: number;
  successRecordCount?: number;
  errorRecordCount?: number;
}
export type ModelInvocationJobSummaries = ModelInvocationJobSummary[];
export interface ListModelInvocationJobsResponse {
  nextToken?: string;
  invocationJobSummaries?: ModelInvocationJobSummary[];
}
export interface ListPromptRoutersRequest {
  maxResults?: number;
  nextToken?: string;
  type?: PromptRouterType;
}
export interface PromptRouterSummary {
  promptRouterName: string;
  routingCriteria: RoutingCriteria;
  description?: string | redacted.Redacted<string>;
  createdAt?: Date;
  updatedAt?: Date;
  promptRouterArn: string;
  models: PromptRouterTargetModel[];
  fallbackModel: PromptRouterTargetModel;
  status: PromptRouterStatus;
  type: PromptRouterType;
}
export type PromptRouterSummaries = PromptRouterSummary[];
export interface ListPromptRoutersResponse {
  promptRouterSummaries?: (PromptRouterSummary & {
    models: (PromptRouterTargetModel & { modelArn: PromptRouterTargetModelArn })[];
    fallbackModel: PromptRouterTargetModel & { modelArn: PromptRouterTargetModelArn };
  })[];
  nextToken?: string;
}
export type SortByProvisionedModels = "CreationTime" | (string & {});
export interface ListProvisionedModelThroughputsRequest {
  creationTimeAfter?: Date;
  creationTimeBefore?: Date;
  statusEquals?: ProvisionedModelStatus;
  modelArnEquals?: string;
  nameContains?: string;
  maxResults?: number;
  nextToken?: string;
  sortBy?: SortByProvisionedModels;
  sortOrder?: SortOrder;
}
export interface ProvisionedModelSummary {
  provisionedModelName: string;
  provisionedModelArn: string;
  modelArn: string;
  desiredModelArn: string;
  foundationModelArn: string;
  modelUnits: number;
  desiredModelUnits: number;
  status: ProvisionedModelStatus;
  commitmentDuration?: CommitmentDuration;
  commitmentExpirationTime?: Date;
  creationTime: Date;
  lastModifiedTime: Date;
}
export type ProvisionedModelSummaries = ProvisionedModelSummary[];
export interface ListProvisionedModelThroughputsResponse {
  nextToken?: string;
  provisionedModelSummaries?: ProvisionedModelSummary[];
}
export type TaggableResourcesArn = string;
export interface ListTagsForResourceRequest {
  resourceARN: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export interface PutAccountDataRetentionRequest {
  mode: DataRetentionMode;
}
export interface PutAccountDataRetentionResponse {
  mode: DataRetentionMode;
  updatedAt?: Date;
}
export interface AccountEnforcedGuardrailInferenceInputConfiguration {
  guardrailIdentifier: string;
  guardrailVersion: string;
  selectiveContentGuarding?: SelectiveContentGuarding;
  modelEnforcement?: ModelEnforcement;
}
export interface PutEnforcedGuardrailConfigurationRequest {
  configId?: string;
  guardrailInferenceConfig: AccountEnforcedGuardrailInferenceInputConfiguration;
}
export interface PutEnforcedGuardrailConfigurationResponse {
  configId?: string;
  updatedAt?: Date;
  updatedBy?: string;
}
export interface PutModelInvocationLoggingConfigurationRequest {
  loggingConfig: LoggingConfig;
}
export interface PutModelInvocationLoggingConfigurationResponse {}
export interface PutResourcePolicyRequest {
  resourceArn: string;
  resourcePolicy: string;
}
export interface PutResourcePolicyResponse {
  resourceArn?: string;
}
export interface PutUseCaseForModelAccessRequest {
  formData: Uint8Array;
}
export interface PutUseCaseForModelAccessResponse {}
export interface RegisterMarketplaceModelEndpointRequest {
  endpointIdentifier: string;
  modelSourceIdentifier: string;
}
export interface RegisterMarketplaceModelEndpointResponse {
  marketplaceModelEndpoint: MarketplaceModelEndpoint;
}
export interface AutomatedReasoningPolicyBuildWorkflowDocument {
  document: Uint8Array | redacted.Redacted<Uint8Array>;
  documentContentType: AutomatedReasoningPolicyBuildDocumentContentType;
  documentName: string | redacted.Redacted<string>;
  documentDescription?: string | redacted.Redacted<string>;
}
export type AutomatedReasoningPolicyBuildWorkflowDocumentList =
  AutomatedReasoningPolicyBuildWorkflowDocument[];
export interface AutomatedReasoningPolicyBuildWorkflowRepairContent {
  annotations: AutomatedReasoningPolicyAnnotation[];
}
export type AutomatedReasoningPolicyGenerateFidelityReportDocumentList =
  AutomatedReasoningPolicyBuildWorkflowDocument[];
export type AutomatedReasoningPolicyGenerateFidelityReportContent = {
  documents: AutomatedReasoningPolicyBuildWorkflowDocument[];
};
export type AutomatedReasoningPolicyIterativeRefinementDocumentList =
  AutomatedReasoningPolicyBuildWorkflowDocument[];
export type AutomatedReasoningPolicyBuildFeedback = string | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyIterativeRefinementContent {
  documents: AutomatedReasoningPolicyBuildWorkflowDocument[];
  feedback?: string | redacted.Redacted<string>;
}
export type AutomatedReasoningPolicyWorkflowTypeContent =
  | {
      documents: AutomatedReasoningPolicyBuildWorkflowDocument[];
      policyRepairAssets?: never;
      generateFidelityReportContent?: never;
      iterativeRefinementContent?: never;
    }
  | {
      documents?: never;
      policyRepairAssets: AutomatedReasoningPolicyBuildWorkflowRepairContent;
      generateFidelityReportContent?: never;
      iterativeRefinementContent?: never;
    }
  | {
      documents?: never;
      policyRepairAssets?: never;
      generateFidelityReportContent: AutomatedReasoningPolicyGenerateFidelityReportContent;
      iterativeRefinementContent?: never;
    }
  | {
      documents?: never;
      policyRepairAssets?: never;
      generateFidelityReportContent?: never;
      iterativeRefinementContent: AutomatedReasoningPolicyIterativeRefinementContent;
    };
export interface AutomatedReasoningPolicyBuildWorkflowSource {
  policyDefinition?: AutomatedReasoningPolicyDefinition;
  workflowContent?: AutomatedReasoningPolicyWorkflowTypeContent;
}
export interface StartAutomatedReasoningPolicyBuildWorkflowRequest {
  policyArn: string;
  buildWorkflowType: AutomatedReasoningPolicyBuildWorkflowType;
  clientRequestToken?: string;
  sourceContent: AutomatedReasoningPolicyBuildWorkflowSource;
}
export interface StartAutomatedReasoningPolicyBuildWorkflowResponse {
  policyArn: string;
  buildWorkflowId: string;
}
export type AutomatedReasoningPolicyTestCaseIdList = string[];
export interface StartAutomatedReasoningPolicyTestWorkflowRequest {
  policyArn: string;
  buildWorkflowId: string;
  testCaseIds?: string[];
  clientRequestToken?: string;
}
export interface StartAutomatedReasoningPolicyTestWorkflowResponse {
  policyArn: string;
}
export interface StopAdvancedPromptOptimizationJobRequest {
  jobIdentifier: string;
}
export interface StopAdvancedPromptOptimizationJobResponse {}
export interface StopEvaluationJobRequest {
  jobIdentifier: string | redacted.Redacted<string>;
}
export interface StopEvaluationJobResponse {}
export interface StopModelCustomizationJobRequest {
  jobIdentifier: string;
}
export interface StopModelCustomizationJobResponse {}
export interface StopModelInvocationJobRequest {
  jobIdentifier: string;
}
export interface StopModelInvocationJobResponse {}
export interface TagResourceRequest {
  resourceARN: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceARN: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateAutomatedReasoningPolicyRequest {
  policyArn: string;
  policyDefinition: AutomatedReasoningPolicyDefinition;
  name?: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
}
export interface UpdateAutomatedReasoningPolicyResponse {
  policyArn: string;
  name: string | redacted.Redacted<string>;
  definitionHash: string;
  updatedAt: Date;
}
export interface UpdateAutomatedReasoningPolicyAnnotationsRequest {
  policyArn: string;
  buildWorkflowId: string;
  annotations: AutomatedReasoningPolicyAnnotation[];
  lastUpdatedAnnotationSetHash: string;
}
export interface UpdateAutomatedReasoningPolicyAnnotationsResponse {
  policyArn: string;
  buildWorkflowId: string;
  annotationSetHash: string;
  updatedAt: Date;
}
export interface UpdateAutomatedReasoningPolicyTestCaseRequest {
  policyArn: string;
  testCaseId: string;
  guardContent: string | redacted.Redacted<string>;
  queryContent?: string | redacted.Redacted<string>;
  lastUpdatedAt: Date;
  expectedAggregatedFindingsResult: AutomatedReasoningCheckResult;
  confidenceThreshold?: number;
  clientRequestToken?: string;
}
export interface UpdateAutomatedReasoningPolicyTestCaseResponse {
  policyArn: string;
  testCaseId: string;
}
export interface UpdateCustomModelDeploymentRequest {
  modelArn: string;
  customModelDeploymentIdentifier: string;
}
export interface UpdateCustomModelDeploymentResponse {
  customModelDeploymentArn: string;
}
export interface UpdateGuardrailRequest {
  guardrailIdentifier: string;
  name: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  topicPolicyConfig?: GuardrailTopicPolicyConfig;
  contentPolicyConfig?: GuardrailContentPolicyConfig;
  wordPolicyConfig?: GuardrailWordPolicyConfig;
  sensitiveInformationPolicyConfig?: GuardrailSensitiveInformationPolicyConfig;
  contextualGroundingPolicyConfig?: GuardrailContextualGroundingPolicyConfig;
  automatedReasoningPolicyConfig?: GuardrailAutomatedReasoningPolicyConfig;
  crossRegionConfig?: GuardrailCrossRegionConfig;
  blockedInputMessaging: string | redacted.Redacted<string>;
  blockedOutputsMessaging: string | redacted.Redacted<string>;
  kmsKeyId?: string;
}
export interface UpdateGuardrailResponse {
  guardrailId: string;
  guardrailArn: string;
  version: string;
  updatedAt: Date;
}
export interface UpdateMarketplaceModelEndpointRequest {
  endpointArn: string;
  endpointConfig: EndpointConfig;
  clientRequestToken?: string;
}
export interface UpdateMarketplaceModelEndpointResponse {
  marketplaceModelEndpoint: MarketplaceModelEndpoint;
}
export interface UpdateProvisionedModelThroughputRequest {
  provisionedModelId: string;
  desiredProvisionedModelName?: string;
  desiredModelId?: string;
}
export interface UpdateProvisionedModelThroughputResponse {}
export type NonBlankString = string;
export type BatchDeleteAdvancedPromptOptimizationJobError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes one or more advanced prompt optimization jobs.
 */
export const batchDeleteAdvancedPromptOptimizationJob: API.OperationMethod<
  BatchDeleteAdvancedPromptOptimizationJobRequest,
  BatchDeleteAdvancedPromptOptimizationJobResponse,
  BatchDeleteAdvancedPromptOptimizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<BatchDeleteAdvancedPromptOptimizationJobRequest>,
  output: __S(5, __c0, 5) as any as S.Schema<BatchDeleteAdvancedPromptOptimizationJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteAdvancedPromptOptimizationJob",
}));

export type BatchDeleteEvaluationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a batch of evaluation jobs. An evaluation job can only be deleted if it has following status `FAILED`, `COMPLETED`, and `STOPPED`. You can request up to 25 model evaluation jobs be deleted in a single request.
 */
export const batchDeleteEvaluationJob: API.OperationMethod<
  BatchDeleteEvaluationJobRequest,
  BatchDeleteEvaluationJobResponse,
  BatchDeleteEvaluationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c12, 0) as any as S.Schema<BatchDeleteEvaluationJobRequest>,
  output: __S(389, __c12, 5) as any as S.Schema<BatchDeleteEvaluationJobResponse>,
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
  operationName: "BatchDeleteEvaluationJob",
}));

export type CancelAutomatedReasoningPolicyBuildWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Cancels a running Automated Reasoning policy build workflow. This stops the policy generation process and prevents further processing of the source documents.
 */
export const cancelAutomatedReasoningPolicyBuildWorkflow: API.OperationMethod<
  CancelAutomatedReasoningPolicyBuildWorkflowRequest,
  CancelAutomatedReasoningPolicyBuildWorkflowResponse,
  CancelAutomatedReasoningPolicyBuildWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<CancelAutomatedReasoningPolicyBuildWorkflowRequest>,
  output: __S(
    736,
    __c23,
    0,
  ) as any as S.Schema<CancelAutomatedReasoningPolicyBuildWorkflowResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelAutomatedReasoningPolicyBuildWorkflow",
}));

export type CreateAdvancedPromptOptimizationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates an advanced prompt optimization job. The job optimizes your prompt templates for specific models using your evaluation dataset and criteria.
 */
export const createAdvancedPromptOptimizationJob: API.OperationMethod<
  CreateAdvancedPromptOptimizationJobRequest,
  CreateAdvancedPromptOptimizationJobResponse,
  CreateAdvancedPromptOptimizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<CreateAdvancedPromptOptimizationJobRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<CreateAdvancedPromptOptimizationJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAdvancedPromptOptimizationJob",
}));

export type CreateAutomatedReasoningPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Automated Reasoning policy for Amazon Bedrock Guardrails. Automated Reasoning policies use mathematical techniques to detect hallucinations, suggest corrections, and highlight unstated assumptions in the responses of your GenAI application.
 *
 * To create a policy, you upload a source document that describes the rules that you're encoding. Automated Reasoning extracts important concepts from the source document that will become variables in the policy and infers policy rules.
 */
export const createAutomatedReasoningPolicy: API.OperationMethod<
  CreateAutomatedReasoningPolicyRequest,
  CreateAutomatedReasoningPolicyResponse,
  CreateAutomatedReasoningPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<CreateAutomatedReasoningPolicyRequest>,
  output: __S(961, __c30, 1) as any as S.Schema<CreateAutomatedReasoningPolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutomatedReasoningPolicy",
}));

export type CreateAutomatedReasoningPolicyTestCaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a test for an Automated Reasoning policy. Tests validate that your policy works as expected by providing sample inputs and expected outcomes. Use tests to verify policy behavior before deploying to production.
 */
export const createAutomatedReasoningPolicyTestCase: API.OperationMethod<
  CreateAutomatedReasoningPolicyTestCaseRequest,
  CreateAutomatedReasoningPolicyTestCaseResponse,
  CreateAutomatedReasoningPolicyTestCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<CreateAutomatedReasoningPolicyTestCaseRequest>,
  output: __S(1088, __c34, 0) as any as S.Schema<CreateAutomatedReasoningPolicyTestCaseResponse>,
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
  operationName: "CreateAutomatedReasoningPolicyTestCase",
}));

export type CreateAutomatedReasoningPolicyVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new version of an existing Automated Reasoning policy. This allows you to iterate on your policy rules while maintaining previous versions for rollback or comparison purposes.
 */
export const createAutomatedReasoningPolicyVersion: API.OperationMethod<
  CreateAutomatedReasoningPolicyVersionRequest,
  CreateAutomatedReasoningPolicyVersionResponse,
  CreateAutomatedReasoningPolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<CreateAutomatedReasoningPolicyVersionRequest>,
  output: __S(1121, __c35, 1) as any as S.Schema<CreateAutomatedReasoningPolicyVersionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutomatedReasoningPolicyVersion",
}));

export type CreateCustomModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new custom model in Amazon Bedrock. After the model is active, you can use it for inference.
 *
 * You can provide the model data source in one of the following ways:
 *
 * - `customModelDataSource` -- Specify a SageMaker AI model package ARN. Amazon Bedrock resolves the model package to retrieve the model artifacts. This is the preferred method for new SageMaker AI training outputs.
 *
 * - `modelSourceConfig` -- Specify an Amazon S3 URI pointing to the Amazon-managed Amazon S3 bucket containing your model artifacts.
 *
 * To use the model for inference, you must purchase Provisioned Throughput for it. You can't use On-demand inference with these custom models. For more information about Provisioned Throughput, see Provisioned Throughput.
 *
 * The model appears in `ListCustomModels` with a `customizationType` of `imported`. To track the status of the new model, you use the `GetCustomModel` API operation. The model can be in the following states:
 *
 * - `Creating` - Initial state during validation and registration
 *
 * - `Active` - Model is ready for use in inference
 *
 * - `Failed` - Creation process encountered an error
 *
 * **Related APIs**
 *
 * - GetCustomModel
 *
 * - ListCustomModels
 *
 * - DeleteCustomModel
 */
export const createCustomModel: API.OperationMethod<
  CreateCustomModelRequest,
  CreateCustomModelResponse,
  CreateCustomModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1154, __c36, 2) as any as S.Schema<CreateCustomModelRequest>,
  output: __S(1155, __c36, 3) as any as S.Schema<CreateCustomModelResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomModel",
}));

export type CreateCustomModelDeploymentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Deploys a custom model for on-demand inference in Amazon Bedrock. After you deploy your custom model, you use the deployment's Amazon Resource Name (ARN) as the `modelId` parameter when you submit prompts and generate responses with model inference.
 *
 * For more information about setting up on-demand inference for custom models, see Set up inference for a custom model.
 *
 * The following actions are related to the `CreateCustomModelDeployment` operation:
 *
 * - GetCustomModelDeployment
 *
 * - ListCustomModelDeployments
 *
 * - DeleteCustomModelDeployment
 */
export const createCustomModelDeployment: API.OperationMethod<
  CreateCustomModelDeploymentRequest,
  CreateCustomModelDeploymentResponse,
  CreateCustomModelDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<CreateCustomModelDeploymentRequest>,
  output: __S(1248, __c39, 0) as any as S.Schema<CreateCustomModelDeploymentResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomModelDeployment",
}));

export type CreateEvaluationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an evaluation job.
 */
export const createEvaluationJob: API.OperationMethod<
  CreateEvaluationJobRequest,
  CreateEvaluationJobResponse,
  CreateEvaluationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<CreateEvaluationJobRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<CreateEvaluationJobResponse>,
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
  operationName: "CreateEvaluationJob",
}));

export type CreateFoundationModelAgreementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Request a model access agreement for the specified model.
 */
export const createFoundationModelAgreement: API.OperationMethod<
  CreateFoundationModelAgreementRequest,
  CreateFoundationModelAgreementResponse,
  CreateFoundationModelAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<CreateFoundationModelAgreementRequest>,
  output: __S(1409, __c44, 1) as any as S.Schema<CreateFoundationModelAgreementResponse>,
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
  operationName: "CreateFoundationModelAgreement",
}));

export type CreateGuardrailError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a guardrail to block topics and to implement safeguards for your generative AI applications.
 *
 * You can configure the following policies in a guardrail to avoid undesirable and harmful content, filter out denied topics and words, and remove sensitive information for privacy protection.
 *
 * - **Content filters** - Adjust filter strengths to block input prompts or model responses containing harmful content.
 *
 * - **Denied topics** - Define a set of topics that are undesirable in the context of your application. These topics will be blocked if detected in user queries or model responses.
 *
 * - **Word filters** - Configure filters to block undesirable words, phrases, and profanity. Such words can include offensive terms, competitor names etc.
 *
 * - **Sensitive information filters** - Block or mask sensitive information such as personally identifiable information (PII) or custom regex in user inputs and model responses.
 *
 * In addition to the above policies, you can also configure the messages to be returned to the user if a user input or model response is in violation of the policies defined in the guardrail.
 *
 * For more information, see Amazon Bedrock Guardrails in the *Amazon Bedrock User Guide*.
 */
export const createGuardrail: API.OperationMethod<
  CreateGuardrailRequest,
  CreateGuardrailResponse,
  CreateGuardrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<CreateGuardrailRequest>,
  output: __S(1441, __c45, 1) as any as S.Schema<CreateGuardrailResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGuardrail",
}));

export type CreateGuardrailVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a version of the guardrail. Use this API to create a snapshot of the guardrail when you are satisfied with a configuration, or to compare the configuration with another version.
 */
export const createGuardrailVersion: API.OperationMethod<
  CreateGuardrailVersionRequest,
  CreateGuardrailVersionResponse,
  CreateGuardrailVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c49, 0) as any as S.Schema<CreateGuardrailVersionRequest>,
  output: __S(1569, __c49, 1) as any as S.Schema<CreateGuardrailVersionResponse>,
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
  operationName: "CreateGuardrailVersion",
}));

export type CreateInferenceProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates an application inference profile to track metrics and costs when invoking a model. To create an application inference profile for a foundation model in one region, specify the ARN of the model in that region. To create an application inference profile for a foundation model across multiple regions, specify the ARN of the system-defined inference profile that contains the regions that you want to route requests to. For more information, see Increase throughput and resilience with cross-region inference in Amazon Bedrock. in the Amazon Bedrock User Guide.
 */
export const createInferenceProfile: API.OperationMethod<
  CreateInferenceProfileRequest,
  CreateInferenceProfileResponse,
  CreateInferenceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1601, __c50, 1) as any as S.Schema<CreateInferenceProfileRequest>,
  output: __S(1602, __c50, 2) as any as S.Schema<CreateInferenceProfileResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInferenceProfile",
}));

export type CreateMarketplaceModelEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an endpoint for a model from Amazon Bedrock Marketplace. The endpoint is hosted by Amazon SageMaker.
 */
export const createMarketplaceModelEndpoint: API.OperationMethod<
  CreateMarketplaceModelEndpointRequest,
  CreateMarketplaceModelEndpointResponse,
  CreateMarketplaceModelEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<CreateMarketplaceModelEndpointRequest>,
  output: __S(1664, __c52, 0) as any as S.Schema<CreateMarketplaceModelEndpointResponse>,
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
  operationName: "CreateMarketplaceModelEndpoint",
}));

export type CreateModelCopyJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Copies a model to another region so that it can be used there. For more information, see Copy models to be used in other regions in the Amazon Bedrock User Guide.
 */
export const createModelCopyJob: API.OperationMethod<
  CreateModelCopyJobRequest,
  CreateModelCopyJobResponse,
  CreateModelCopyJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<CreateModelCopyJobRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<CreateModelCopyJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelCopyJob",
}));

export type CreateModelCustomizationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a fine-tuning job to customize a base model.
 *
 * You specify the base foundation model and the location of the training data. After the model-customization job completes successfully, your custom model resource will be ready to use. Amazon Bedrock returns validation loss metrics and output generations after the job completes.
 *
 * For information on the format of training and validation data, see Prepare the datasets.
 *
 * Model-customization jobs are asynchronous and the completion time depends on the base model and the training/validation data size. To monitor a job, use the `GetModelCustomizationJob` operation to retrieve the job status.
 *
 * For more information, see Custom models in the Amazon Bedrock User Guide.
 */
export const createModelCustomizationJob: API.OperationMethod<
  CreateModelCustomizationJobRequest,
  CreateModelCustomizationJobResponse,
  CreateModelCustomizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<CreateModelCustomizationJobRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<CreateModelCustomizationJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelCustomizationJob",
}));

export type CreateModelImportJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a model import job to import model that you have customized in other environments, such as Amazon SageMaker. For more information, see Import a customized model
 */
export const createModelImportJob: API.OperationMethod<
  CreateModelImportJobRequest,
  CreateModelImportJobResponse,
  CreateModelImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<CreateModelImportJobRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<CreateModelImportJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelImportJob",
}));

export type CreateModelInvocationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a batch inference job to invoke a model on multiple prompts. Format your data according to Format your inference data and upload it to an Amazon S3 bucket. For more information, see Process multiple prompts with batch inference.
 *
 * The response returns a `jobArn` that you can use to stop or get details about the job.
 */
export const createModelInvocationJob: API.OperationMethod<
  CreateModelInvocationJobRequest,
  CreateModelInvocationJobResponse,
  CreateModelInvocationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<CreateModelInvocationJobRequest>,
  output: __S(864, __c27, 0) as any as S.Schema<CreateModelInvocationJobResponse>,
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
  operationName: "CreateModelInvocationJob",
}));

export type CreatePromptRouterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a prompt router that manages the routing of requests between multiple foundation models based on the routing criteria.
 */
export const createPromptRouter: API.OperationMethod<
  CreatePromptRouterRequest,
  CreatePromptRouterResponse,
  CreatePromptRouterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<CreatePromptRouterRequest>,
  output: __S(1953, __c61, 1) as any as S.Schema<CreatePromptRouterResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePromptRouter",
}));

export type CreateProvisionedModelThroughputError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Creates dedicated throughput for a base or custom model with the model units and for the duration that you specify. For pricing details, see Amazon Bedrock Pricing. For more information, see Provisioned Throughput in the Amazon Bedrock User Guide.
 */
export const createProvisionedModelThroughput: API.OperationMethod<
  CreateProvisionedModelThroughputRequest,
  CreateProvisionedModelThroughputResponse,
  CreateProvisionedModelThroughputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2048, __c64, 0) as any as S.Schema<CreateProvisionedModelThroughputRequest>,
  output: __S(2049, __c64, 1) as any as S.Schema<CreateProvisionedModelThroughputResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateProvisionedModelThroughput",
}));

export type DeleteAutomatedReasoningPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Automated Reasoning policy or policy version. This operation is idempotent. If you delete a policy more than once, each call succeeds. Deleting a policy removes it permanently and cannot be undone.
 */
export const deleteAutomatedReasoningPolicy: API.OperationMethod<
  DeleteAutomatedReasoningPolicyRequest,
  DeleteAutomatedReasoningPolicyResponse,
  DeleteAutomatedReasoningPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<DeleteAutomatedReasoningPolicyRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteAutomatedReasoningPolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutomatedReasoningPolicy",
}));

export type DeleteAutomatedReasoningPolicyBuildWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Automated Reasoning policy build workflow and its associated artifacts. This permanently removes the workflow history and any generated assets.
 */
export const deleteAutomatedReasoningPolicyBuildWorkflow: API.OperationMethod<
  DeleteAutomatedReasoningPolicyBuildWorkflowRequest,
  DeleteAutomatedReasoningPolicyBuildWorkflowResponse,
  DeleteAutomatedReasoningPolicyBuildWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2112, __c66, 0) as any as S.Schema<DeleteAutomatedReasoningPolicyBuildWorkflowRequest>,
  output: __S(
    736,
    __c23,
    0,
  ) as any as S.Schema<DeleteAutomatedReasoningPolicyBuildWorkflowResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutomatedReasoningPolicyBuildWorkflow",
}));

export type DeleteAutomatedReasoningPolicyTestCaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an Automated Reasoning policy test. This operation is idempotent; if you delete a test more than once, each call succeeds.
 */
export const deleteAutomatedReasoningPolicyTestCase: API.OperationMethod<
  DeleteAutomatedReasoningPolicyTestCaseRequest,
  DeleteAutomatedReasoningPolicyTestCaseResponse,
  DeleteAutomatedReasoningPolicyTestCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<DeleteAutomatedReasoningPolicyTestCaseRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteAutomatedReasoningPolicyTestCaseResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAutomatedReasoningPolicyTestCase",
}));

export type DeleteCustomModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom model that you created earlier. For more information, see Custom models in the Amazon Bedrock User Guide.
 */
export const deleteCustomModel: API.OperationMethod<
  DeleteCustomModelRequest,
  DeleteCustomModelResponse,
  DeleteCustomModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2176, __c68, 0) as any as S.Schema<DeleteCustomModelRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteCustomModelResponse>,
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
  operationName: "DeleteCustomModel",
}));

export type DeleteCustomModelDeploymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom model deployment. This operation stops the deployment and removes it from your account. After deletion, the deployment ARN can no longer be used for inference requests.
 *
 * The following actions are related to the `DeleteCustomModelDeployment` operation:
 *
 * - CreateCustomModelDeployment
 *
 * - GetCustomModelDeployment
 *
 * - ListCustomModelDeployments
 */
export const deleteCustomModelDeployment: API.OperationMethod<
  DeleteCustomModelDeploymentRequest,
  DeleteCustomModelDeploymentResponse,
  DeleteCustomModelDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<DeleteCustomModelDeploymentRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteCustomModelDeploymentResponse>,
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
  operationName: "DeleteCustomModelDeployment",
}));

export type DeleteEnforcedGuardrailConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the account-level enforced guardrail configuration.
 */
export const deleteEnforcedGuardrailConfiguration: API.OperationMethod<
  DeleteEnforcedGuardrailConfigurationRequest,
  DeleteEnforcedGuardrailConfigurationResponse,
  DeleteEnforcedGuardrailConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<DeleteEnforcedGuardrailConfigurationRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteEnforcedGuardrailConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEnforcedGuardrailConfiguration",
}));

export type DeleteFoundationModelAgreementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Delete the model access agreement for the specified model.
 */
export const deleteFoundationModelAgreement: API.OperationMethod<
  DeleteFoundationModelAgreementRequest,
  DeleteFoundationModelAgreementResponse,
  DeleteFoundationModelAgreementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<DeleteFoundationModelAgreementRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteFoundationModelAgreementResponse>,
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
  operationName: "DeleteFoundationModelAgreement",
}));

export type DeleteGuardrailError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a guardrail.
 *
 * - To delete a guardrail, only specify the ARN of the guardrail in the `guardrailIdentifier` field. If you delete a guardrail, all of its versions will be deleted.
 *
 * - To delete a version of a guardrail, specify the ARN of the guardrail in the `guardrailIdentifier` field and the version in the `guardrailVersion` field.
 */
export const deleteGuardrail: API.OperationMethod<
  DeleteGuardrailRequest,
  DeleteGuardrailResponse,
  DeleteGuardrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2304, __c72, 0) as any as S.Schema<DeleteGuardrailRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteGuardrailResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGuardrail",
}));

export type DeleteImportedModelError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a custom model that you imported earlier. For more information, see Import a customized model in the Amazon Bedrock User Guide.
 */
export const deleteImportedModel: API.OperationMethod<
  DeleteImportedModelRequest,
  DeleteImportedModelResponse,
  DeleteImportedModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<DeleteImportedModelRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteImportedModelResponse>,
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
  operationName: "DeleteImportedModel",
}));

export type DeleteInferenceProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an application inference profile. For more information, see Increase throughput and resilience with cross-region inference in Amazon Bedrock. in the Amazon Bedrock User Guide.
 */
export const deleteInferenceProfile: API.OperationMethod<
  DeleteInferenceProfileRequest,
  DeleteInferenceProfileResponse,
  DeleteInferenceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2368, __c74, 0) as any as S.Schema<DeleteInferenceProfileRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteInferenceProfileResponse>,
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
  operationName: "DeleteInferenceProfile",
}));

export type DeleteMarketplaceModelEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an endpoint for a model from Amazon Bedrock Marketplace.
 */
export const deleteMarketplaceModelEndpoint: API.OperationMethod<
  DeleteMarketplaceModelEndpointRequest,
  DeleteMarketplaceModelEndpointResponse,
  DeleteMarketplaceModelEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2400, __c75, 0) as any as S.Schema<DeleteMarketplaceModelEndpointRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteMarketplaceModelEndpointResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMarketplaceModelEndpoint",
}));

export type DeleteModelInvocationLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Delete the invocation logging.
 */
export const deleteModelInvocationLoggingConfiguration: API.OperationMethod<
  DeleteModelInvocationLoggingConfigurationRequest,
  DeleteModelInvocationLoggingConfigurationResponse,
  DeleteModelInvocationLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2432, __c76, 0) as any as S.Schema<DeleteModelInvocationLoggingConfigurationRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteModelInvocationLoggingConfigurationResponse>,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModelInvocationLoggingConfiguration",
}));

export type DeletePromptRouterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified prompt router. This action cannot be undone.
 */
export const deletePromptRouter: API.OperationMethod<
  DeletePromptRouterRequest,
  DeletePromptRouterResponse,
  DeletePromptRouterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2464, __c77, 0) as any as S.Schema<DeletePromptRouterRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeletePromptRouterResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeletePromptRouter",
}));

export type DeleteProvisionedModelThroughputError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Provisioned Throughput. You can't delete a Provisioned Throughput before the commitment term is over. For more information, see Provisioned Throughput in the Amazon Bedrock User Guide.
 */
export const deleteProvisionedModelThroughput: API.OperationMethod<
  DeleteProvisionedModelThroughputRequest,
  DeleteProvisionedModelThroughputResponse,
  DeleteProvisionedModelThroughputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2496, __c78, 0) as any as S.Schema<DeleteProvisionedModelThroughputRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteProvisionedModelThroughputResponse>,
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
  operationName: "DeleteProvisionedModelThroughput",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a previously created Bedrock resource policy.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2528, __c79, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeleteResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteResourcePolicy",
}));

export type DeregisterMarketplaceModelEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deregisters an endpoint for a model from Amazon Bedrock Marketplace. This operation removes the endpoint's association with Amazon Bedrock but does not delete the underlying Amazon SageMaker endpoint.
 */
export const deregisterMarketplaceModelEndpoint: API.OperationMethod<
  DeregisterMarketplaceModelEndpointRequest,
  DeregisterMarketplaceModelEndpointResponse,
  DeregisterMarketplaceModelEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2560, __c80, 0) as any as S.Schema<DeregisterMarketplaceModelEndpointRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<DeregisterMarketplaceModelEndpointResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeregisterMarketplaceModelEndpoint",
}));

export type ExportAutomatedReasoningPolicyVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Exports the policy definition for an Automated Reasoning policy version. Returns the complete policy definition including rules, variables, and custom variable types in a structured format.
 */
export const exportAutomatedReasoningPolicyVersion: API.OperationMethod<
  ExportAutomatedReasoningPolicyVersionRequest,
  ExportAutomatedReasoningPolicyVersionResponse,
  ExportAutomatedReasoningPolicyVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2592, __c81, 0) as any as S.Schema<ExportAutomatedReasoningPolicyVersionRequest>,
  output: __S(2593, __c81, 1) as any as S.Schema<ExportAutomatedReasoningPolicyVersionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportAutomatedReasoningPolicyVersion",
}));

export type GetAccountDataRetentionError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the account-wide data retention mode for Amazon Bedrock.
 */
export const getAccountDataRetention: API.OperationMethod<
  GetAccountDataRetentionRequest,
  GetAccountDataRetentionResponse,
  GetAccountDataRetentionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2624, __c82, 0) as any as S.Schema<GetAccountDataRetentionRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<GetAccountDataRetentionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountDataRetention",
}));

export type GetAdvancedPromptOptimizationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an advanced prompt optimization job.
 */
export const getAdvancedPromptOptimizationJob: API.OperationMethod<
  GetAdvancedPromptOptimizationJobRequest,
  GetAdvancedPromptOptimizationJobResponse,
  GetAdvancedPromptOptimizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2688, __c84, 0) as any as S.Schema<GetAdvancedPromptOptimizationJobRequest>,
  output: __S(2689, __c84, 1) as any as S.Schema<GetAdvancedPromptOptimizationJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAdvancedPromptOptimizationJob",
}));

export type GetAutomatedReasoningPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about an Automated Reasoning policy or policy version. Returns information including the policy definition, metadata, and timestamps.
 */
export const getAutomatedReasoningPolicy: API.OperationMethod<
  GetAutomatedReasoningPolicyRequest,
  GetAutomatedReasoningPolicyResponse,
  GetAutomatedReasoningPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<GetAutomatedReasoningPolicyRequest>,
  output: __S(2721, __c85, 1) as any as S.Schema<GetAutomatedReasoningPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedReasoningPolicy",
}));

export type GetAutomatedReasoningPolicyAnnotationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the current annotations for an Automated Reasoning policy build workflow. Annotations contain corrections to the rules, variables and types to be applied to the policy.
 */
export const getAutomatedReasoningPolicyAnnotations: API.OperationMethod<
  GetAutomatedReasoningPolicyAnnotationsRequest,
  GetAutomatedReasoningPolicyAnnotationsResponse,
  GetAutomatedReasoningPolicyAnnotationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2752, __c86, 0) as any as S.Schema<GetAutomatedReasoningPolicyAnnotationsRequest>,
  output: __S(2753, __c86, 1) as any as S.Schema<GetAutomatedReasoningPolicyAnnotationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedReasoningPolicyAnnotations",
}));

export type GetAutomatedReasoningPolicyBuildWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about an Automated Reasoning policy build workflow, including its status, configuration, and metadata.
 */
export const getAutomatedReasoningPolicyBuildWorkflow: API.OperationMethod<
  GetAutomatedReasoningPolicyBuildWorkflowRequest,
  GetAutomatedReasoningPolicyBuildWorkflowResponse,
  GetAutomatedReasoningPolicyBuildWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2848, __c89, 0) as any as S.Schema<GetAutomatedReasoningPolicyBuildWorkflowRequest>,
  output: __S(2849, __c89, 1) as any as S.Schema<GetAutomatedReasoningPolicyBuildWorkflowResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedReasoningPolicyBuildWorkflow",
}));

export type GetAutomatedReasoningPolicyBuildWorkflowResultAssetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resulting assets from a completed Automated Reasoning policy build workflow, including build logs, quality reports, and generated policy artifacts.
 */
export const getAutomatedReasoningPolicyBuildWorkflowResultAssets: API.OperationMethod<
  GetAutomatedReasoningPolicyBuildWorkflowResultAssetsRequest,
  GetAutomatedReasoningPolicyBuildWorkflowResultAssetsResponse,
  GetAutomatedReasoningPolicyBuildWorkflowResultAssetsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(
    2880,
    __c90,
    0,
  ) as any as S.Schema<GetAutomatedReasoningPolicyBuildWorkflowResultAssetsRequest>,
  output: __S(
    2928,
    __c91,
    16,
  ) as any as S.Schema<GetAutomatedReasoningPolicyBuildWorkflowResultAssetsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedReasoningPolicyBuildWorkflowResultAssets",
}));

export type GetAutomatedReasoningPolicyNextScenarioError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the next test scenario for validating an Automated Reasoning policy. This is used during the interactive policy refinement process to test policy behavior.
 */
export const getAutomatedReasoningPolicyNextScenario: API.OperationMethod<
  GetAutomatedReasoningPolicyNextScenarioRequest,
  GetAutomatedReasoningPolicyNextScenarioResponse,
  GetAutomatedReasoningPolicyNextScenarioError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2976, __c93, 0) as any as S.Schema<GetAutomatedReasoningPolicyNextScenarioRequest>,
  output: __S(2977, __c93, 1) as any as S.Schema<GetAutomatedReasoningPolicyNextScenarioResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedReasoningPolicyNextScenario",
}));

export type GetAutomatedReasoningPolicyTestCaseError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a specific Automated Reasoning policy test.
 */
export const getAutomatedReasoningPolicyTestCase: API.OperationMethod<
  GetAutomatedReasoningPolicyTestCaseRequest,
  GetAutomatedReasoningPolicyTestCaseResponse,
  GetAutomatedReasoningPolicyTestCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<GetAutomatedReasoningPolicyTestCaseRequest>,
  output: __S(3009, __c94, 1) as any as S.Schema<GetAutomatedReasoningPolicyTestCaseResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedReasoningPolicyTestCase",
}));

export type GetAutomatedReasoningPolicyTestResultError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the test result for a specific Automated Reasoning policy test. Returns detailed validation findings and execution status.
 */
export const getAutomatedReasoningPolicyTestResult: API.OperationMethod<
  GetAutomatedReasoningPolicyTestResultRequest,
  GetAutomatedReasoningPolicyTestResultResponse,
  GetAutomatedReasoningPolicyTestResultError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3072, __c96, 0) as any as S.Schema<GetAutomatedReasoningPolicyTestResultRequest>,
  output: __S(3073, __c96, 1) as any as S.Schema<GetAutomatedReasoningPolicyTestResultResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAutomatedReasoningPolicyTestResult",
}));

export type GetCustomModelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the properties associated with a Amazon Bedrock custom model that you have created. For more information, see Custom models in the Amazon Bedrock User Guide.
 */
export const getCustomModel: API.OperationMethod<
  GetCustomModelRequest,
  GetCustomModelResponse,
  GetCustomModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3136, __c98, 0) as any as S.Schema<GetCustomModelRequest>,
  output: __S(3137, __c98, 1) as any as S.Schema<GetCustomModelResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomModel",
}));

export type GetCustomModelDeploymentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a custom model deployment, including its status, configuration, and metadata. Use this operation to monitor the deployment status and retrieve details needed for inference requests.
 *
 * The following actions are related to the `GetCustomModelDeployment` operation:
 *
 * - CreateCustomModelDeployment
 *
 * - ListCustomModelDeployments
 *
 * - DeleteCustomModelDeployment
 */
export const getCustomModelDeployment: API.OperationMethod<
  GetCustomModelDeploymentRequest,
  GetCustomModelDeploymentResponse,
  GetCustomModelDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3200, __c100, 0) as any as S.Schema<GetCustomModelDeploymentRequest>,
  output: __S(3202, __c100, 2) as any as S.Schema<GetCustomModelDeploymentResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCustomModelDeployment",
}));

export type GetEvaluationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an evaluation job, such as the status of the job.
 */
export const getEvaluationJob: API.OperationMethod<
  GetEvaluationJobRequest,
  GetEvaluationJobResponse,
  GetEvaluationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3232, __c101, 0) as any as S.Schema<GetEvaluationJobRequest>,
  output: __S(3233, __c101, 1) as any as S.Schema<GetEvaluationJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvaluationJob",
}));

export type GetFoundationModelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get details about a Amazon Bedrock foundation model.
 */
export const getFoundationModel: API.OperationMethod<
  GetFoundationModelRequest,
  GetFoundationModelResponse,
  GetFoundationModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3264, __c102, 0) as any as S.Schema<GetFoundationModelRequest>,
  output: __S(3265, __c102, 1) as any as S.Schema<GetFoundationModelResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFoundationModel",
}));

export type GetFoundationModelAvailabilityError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get information about the Foundation model availability.
 */
export const getFoundationModelAvailability: API.OperationMethod<
  GetFoundationModelAvailabilityRequest,
  GetFoundationModelAvailabilityResponse,
  GetFoundationModelAvailabilityError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3328, __c104, 0) as any as S.Schema<GetFoundationModelAvailabilityRequest>,
  output: __S(3330, __c104, 2) as any as S.Schema<GetFoundationModelAvailabilityResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFoundationModelAvailability",
}));

export type GetGuardrailError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details about a guardrail. If you don't specify a version, the response returns details for the `DRAFT` version.
 */
export const getGuardrail: API.OperationMethod<
  GetGuardrailRequest,
  GetGuardrailResponse,
  GetGuardrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3360, __c105, 0) as any as S.Schema<GetGuardrailRequest>,
  output: __S(3368, __c105, 8) as any as S.Schema<GetGuardrailResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGuardrail",
}));

export type GetImportedModelError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets properties associated with a customized model you imported.
 */
export const getImportedModel: API.OperationMethod<
  GetImportedModelRequest,
  GetImportedModelResponse,
  GetImportedModelError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3424, __c107, 0) as any as S.Schema<GetImportedModelRequest>,
  output: __S(3426, __c107, 2) as any as S.Schema<GetImportedModelResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportedModel",
}));

export type GetInferenceProfileError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an inference profile. For more information, see Increase throughput and resilience with cross-region inference in Amazon Bedrock. in the Amazon Bedrock User Guide.
 */
export const getInferenceProfile: API.OperationMethod<
  GetInferenceProfileRequest,
  GetInferenceProfileResponse,
  GetInferenceProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3456, __c108, 0) as any as S.Schema<GetInferenceProfileRequest>,
  output: __S(3488, __c109, 0) as any as S.Schema<GetInferenceProfileResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetInferenceProfile",
}));

export type GetMarketplaceModelEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a specific endpoint for a model from Amazon Bedrock Marketplace.
 */
export const getMarketplaceModelEndpoint: API.OperationMethod<
  GetMarketplaceModelEndpointRequest,
  GetMarketplaceModelEndpointResponse,
  GetMarketplaceModelEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3520, __c110, 0) as any as S.Schema<GetMarketplaceModelEndpointRequest>,
  output: __S(3521, __c110, 1) as any as S.Schema<GetMarketplaceModelEndpointResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMarketplaceModelEndpoint",
}));

export type GetModelCopyJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a model copy job. For more information, see Copy models to be used in other regions in the Amazon Bedrock User Guide.
 */
export const getModelCopyJob: API.OperationMethod<
  GetModelCopyJobRequest,
  GetModelCopyJobResponse,
  GetModelCopyJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3552, __c111, 0) as any as S.Schema<GetModelCopyJobRequest>,
  output: __S(3584, __c112, 0) as any as S.Schema<GetModelCopyJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelCopyJob",
}));

export type GetModelCustomizationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the properties associated with a model-customization job, including the status of the job. For more information, see Custom models in the Amazon Bedrock User Guide.
 */
export const getModelCustomizationJob: API.OperationMethod<
  GetModelCustomizationJobRequest,
  GetModelCustomizationJobResponse,
  GetModelCustomizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3616, __c113, 0) as any as S.Schema<GetModelCustomizationJobRequest>,
  output: __S(3617, __c113, 1) as any as S.Schema<GetModelCustomizationJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelCustomizationJob",
}));

export type GetModelImportJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the properties associated with import model job, including the status of the job. For more information, see Import a customized model in the Amazon Bedrock User Guide.
 */
export const getModelImportJob: API.OperationMethod<
  GetModelImportJobRequest,
  GetModelImportJobResponse,
  GetModelImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3680, __c115, 0) as any as S.Schema<GetModelImportJobRequest>,
  output: __S(3681, __c115, 1) as any as S.Schema<GetModelImportJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelImportJob",
}));

export type GetModelInvocationJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details about a batch inference job. For more information, see Monitor batch inference jobs
 */
export const getModelInvocationJob: API.OperationMethod<
  GetModelInvocationJobRequest,
  GetModelInvocationJobResponse,
  GetModelInvocationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3712, __c116, 0) as any as S.Schema<GetModelInvocationJobRequest>,
  output: __S(3713, __c116, 1) as any as S.Schema<GetModelInvocationJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelInvocationJob",
}));

export type GetModelInvocationLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | CommonErrors;
/**
 * Get the current configuration values for model invocation logging.
 */
export const getModelInvocationLoggingConfiguration: API.OperationMethod<
  GetModelInvocationLoggingConfigurationRequest,
  GetModelInvocationLoggingConfigurationResponse,
  GetModelInvocationLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3744, __c117, 0) as any as S.Schema<GetModelInvocationLoggingConfigurationRequest>,
  output: __S(3745, __c117, 1) as any as S.Schema<GetModelInvocationLoggingConfigurationResponse>,
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelInvocationLoggingConfiguration",
}));

export type GetPromptRouterError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a prompt router.
 */
export const getPromptRouter: API.OperationMethod<
  GetPromptRouterRequest,
  GetPromptRouterResponse,
  GetPromptRouterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3808, __c119, 0) as any as S.Schema<GetPromptRouterRequest>,
  output: __S(3840, __c120, 0) as any as S.Schema<GetPromptRouterResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPromptRouter",
}));

export type GetProvisionedModelThroughputError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for a Provisioned Throughput. For more information, see Provisioned Throughput in the Amazon Bedrock User Guide.
 */
export const getProvisionedModelThroughput: API.OperationMethod<
  GetProvisionedModelThroughputRequest,
  GetProvisionedModelThroughputResponse,
  GetProvisionedModelThroughputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3872, __c121, 0) as any as S.Schema<GetProvisionedModelThroughputRequest>,
  output: __S(3873, __c121, 1) as any as S.Schema<GetProvisionedModelThroughputResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetProvisionedModelThroughput",
}));

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the resource policy document for a Bedrock resource
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3904, __c122, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(3905, __c122, 1) as any as S.Schema<GetResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePolicy",
}));

export type GetUseCaseForModelAccessError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get usecase for model access.
 */
export const getUseCaseForModelAccess: API.OperationMethod<
  GetUseCaseForModelAccessRequest,
  GetUseCaseForModelAccessResponse,
  GetUseCaseForModelAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3936, __c123, 0) as any as S.Schema<GetUseCaseForModelAccessRequest>,
  output: __S(3937, __c123, 1) as any as S.Schema<GetUseCaseForModelAccessResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUseCaseForModelAccess",
}));

export type ListAdvancedPromptOptimizationJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the advanced prompt optimization jobs in your account.
 */
export const listAdvancedPromptOptimizationJobs: API.PaginatedOperationMethod<
  ListAdvancedPromptOptimizationJobsRequest,
  ListAdvancedPromptOptimizationJobsResponse,
  ListAdvancedPromptOptimizationJobsError,
  Credentials | HttpClient.HttpClient,
  AdvancedPromptOptimizationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(3968, __c124, 0) as any as S.Schema<ListAdvancedPromptOptimizationJobsRequest>,
  output: __S(3971, __c124, 3) as any as S.Schema<ListAdvancedPromptOptimizationJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAdvancedPromptOptimizationJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomatedReasoningPoliciesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all Automated Reasoning policies in your account, with optional filtering by policy ARN. This helps you manage and discover existing policies.
 */
export const listAutomatedReasoningPolicies: API.PaginatedOperationMethod<
  ListAutomatedReasoningPoliciesRequest,
  ListAutomatedReasoningPoliciesResponse,
  ListAutomatedReasoningPoliciesError,
  Credentials | HttpClient.HttpClient,
  AutomatedReasoningPolicySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4000, __c125, 0) as any as S.Schema<ListAutomatedReasoningPoliciesRequest>,
  output: __S(4003, __c125, 3) as any as S.Schema<ListAutomatedReasoningPoliciesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomatedReasoningPolicies",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "automatedReasoningPolicySummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomatedReasoningPolicyBuildWorkflowsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all build workflows for an Automated Reasoning policy, showing the history of policy creation and modification attempts.
 */
export const listAutomatedReasoningPolicyBuildWorkflows: API.PaginatedOperationMethod<
  ListAutomatedReasoningPolicyBuildWorkflowsRequest,
  ListAutomatedReasoningPolicyBuildWorkflowsResponse,
  ListAutomatedReasoningPolicyBuildWorkflowsError,
  Credentials | HttpClient.HttpClient,
  AutomatedReasoningPolicyBuildWorkflowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4032, __c126, 0) as any as S.Schema<ListAutomatedReasoningPolicyBuildWorkflowsRequest>,
  output: __S(
    4035,
    __c126,
    3,
  ) as any as S.Schema<ListAutomatedReasoningPolicyBuildWorkflowsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomatedReasoningPolicyBuildWorkflows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "automatedReasoningPolicyBuildWorkflowSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomatedReasoningPolicyTestCasesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists tests for an Automated Reasoning policy. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listAutomatedReasoningPolicyTestCases: API.PaginatedOperationMethod<
  ListAutomatedReasoningPolicyTestCasesRequest,
  ListAutomatedReasoningPolicyTestCasesResponse,
  ListAutomatedReasoningPolicyTestCasesError,
  Credentials | HttpClient.HttpClient,
  AutomatedReasoningPolicyTestCase
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4064, __c127, 0) as any as S.Schema<ListAutomatedReasoningPolicyTestCasesRequest>,
  output: __S(4066, __c127, 2) as any as S.Schema<ListAutomatedReasoningPolicyTestCasesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomatedReasoningPolicyTestCases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "testCases",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAutomatedReasoningPolicyTestResultsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists test results for an Automated Reasoning policy, showing how the policy performed against various test scenarios and validation checks.
 */
export const listAutomatedReasoningPolicyTestResults: API.PaginatedOperationMethod<
  ListAutomatedReasoningPolicyTestResultsRequest,
  ListAutomatedReasoningPolicyTestResultsResponse,
  ListAutomatedReasoningPolicyTestResultsError,
  Credentials | HttpClient.HttpClient,
  AutomatedReasoningPolicyTestResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4096, __c128, 0) as any as S.Schema<ListAutomatedReasoningPolicyTestResultsRequest>,
  output: __S(4098, __c128, 2) as any as S.Schema<ListAutomatedReasoningPolicyTestResultsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAutomatedReasoningPolicyTestResults",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "testResults",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCustomModelDeploymentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists custom model deployments in your account. You can filter the results by creation time, name, status, and associated model. Use this operation to manage and monitor your custom model deployments.
 *
 * We recommend using pagination to ensure that the operation returns quickly and successfully.
 *
 * The following actions are related to the `ListCustomModelDeployments` operation:
 *
 * - CreateCustomModelDeployment
 *
 * - GetCustomModelDeployment
 *
 * - DeleteCustomModelDeployment
 */
export const listCustomModelDeployments: API.PaginatedOperationMethod<
  ListCustomModelDeploymentsRequest,
  ListCustomModelDeploymentsResponse,
  ListCustomModelDeploymentsError,
  Credentials | HttpClient.HttpClient,
  CustomModelDeploymentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4128, __c129, 0) as any as S.Schema<ListCustomModelDeploymentsRequest>,
  output: __S(4131, __c129, 3) as any as S.Schema<ListCustomModelDeploymentsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomModelDeployments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "modelDeploymentSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCustomModelsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the custom models that you have created with the `CreateModelCustomizationJob` operation.
 *
 * For more information, see Custom models in the Amazon Bedrock User Guide.
 */
export const listCustomModels: API.PaginatedOperationMethod<
  ListCustomModelsRequest,
  ListCustomModelsResponse,
  ListCustomModelsError,
  Credentials | HttpClient.HttpClient,
  CustomModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4160, __c130, 0) as any as S.Schema<ListCustomModelsRequest>,
  output: __S(4163, __c130, 3) as any as S.Schema<ListCustomModelsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListCustomModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "modelSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListEnforcedGuardrailsConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the account-level enforced guardrail configurations.
 */
export const listEnforcedGuardrailsConfiguration: API.PaginatedOperationMethod<
  ListEnforcedGuardrailsConfigurationRequest,
  ListEnforcedGuardrailsConfigurationResponse,
  ListEnforcedGuardrailsConfigurationError,
  Credentials | HttpClient.HttpClient,
  AccountEnforcedGuardrailOutputConfiguration
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4192, __c131, 0) as any as S.Schema<ListEnforcedGuardrailsConfigurationRequest>,
  output: __S(4195, __c131, 3) as any as S.Schema<ListEnforcedGuardrailsConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEnforcedGuardrailsConfiguration",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "guardrailsConfig",
  } as const,
})) as any;

export type ListEvaluationJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all existing evaluation jobs.
 */
export const listEvaluationJobs: API.PaginatedOperationMethod<
  ListEvaluationJobsRequest,
  ListEvaluationJobsResponse,
  ListEvaluationJobsError,
  Credentials | HttpClient.HttpClient,
  EvaluationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4256, __c133, 0) as any as S.Schema<ListEvaluationJobsRequest>,
  output: __S(4262, __c133, 6) as any as S.Schema<ListEvaluationJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEvaluationJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFoundationModelAgreementOffersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the offers associated with the specified model.
 */
export const listFoundationModelAgreementOffers: API.OperationMethod<
  ListFoundationModelAgreementOffersRequest,
  ListFoundationModelAgreementOffersResponse,
  ListFoundationModelAgreementOffersError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4288, __c134, 0) as any as S.Schema<ListFoundationModelAgreementOffersRequest>,
  output: __S(4298, __c134, 10) as any as S.Schema<ListFoundationModelAgreementOffersResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFoundationModelAgreementOffers",
}));

export type ListFoundationModelsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists Amazon Bedrock foundation models that you can use. You can filter the results with the request parameters. For more information, see Foundation models in the Amazon Bedrock User Guide.
 */
export const listFoundationModels: API.OperationMethod<
  ListFoundationModelsRequest,
  ListFoundationModelsResponse,
  ListFoundationModelsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4320, __c135, 0) as any as S.Schema<ListFoundationModelsRequest>,
  output: __S(4322, __c135, 2) as any as S.Schema<ListFoundationModelsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFoundationModels",
}));

export type ListGuardrailsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists details about all the guardrails in an account. To list the `DRAFT` version of all your guardrails, don't specify the `guardrailIdentifier` field. To list all versions of a guardrail, specify the ARN of the guardrail in the `guardrailIdentifier` field.
 *
 * You can set the maximum number of results to return in a response in the `maxResults` field. If there are more results than the number you set, the response returns a `nextToken` that you can send in another `ListGuardrails` request to see the next batch of results.
 */
export const listGuardrails: API.PaginatedOperationMethod<
  ListGuardrailsRequest,
  ListGuardrailsResponse,
  ListGuardrailsError,
  Credentials | HttpClient.HttpClient,
  GuardrailSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4352, __c136, 0) as any as S.Schema<ListGuardrailsRequest>,
  output: __S(4355, __c136, 3) as any as S.Schema<ListGuardrailsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGuardrails",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "guardrails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportedModelsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of models you've imported. You can filter the results to return based on one or more criteria. For more information, see Import a customized model in the Amazon Bedrock User Guide.
 */
export const listImportedModels: API.PaginatedOperationMethod<
  ListImportedModelsRequest,
  ListImportedModelsResponse,
  ListImportedModelsError,
  Credentials | HttpClient.HttpClient,
  ImportedModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4384, __c137, 0) as any as S.Schema<ListImportedModelsRequest>,
  output: __S(4387, __c137, 3) as any as S.Schema<ListImportedModelsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportedModels",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "modelSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInferenceProfilesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of inference profiles that you can use. For more information, see Increase throughput and resilience with cross-region inference in Amazon Bedrock. in the Amazon Bedrock User Guide.
 */
export const listInferenceProfiles: API.PaginatedOperationMethod<
  ListInferenceProfilesRequest,
  ListInferenceProfilesResponse,
  ListInferenceProfilesError,
  Credentials | HttpClient.HttpClient,
  InferenceProfileSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4416, __c138, 0) as any as S.Schema<ListInferenceProfilesRequest>,
  output: __S(4418, __c138, 2) as any as S.Schema<ListInferenceProfilesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListInferenceProfiles",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "inferenceProfileSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMarketplaceModelEndpointsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the endpoints for models from Amazon Bedrock Marketplace in your Amazon Web Services account.
 */
export const listMarketplaceModelEndpoints: API.PaginatedOperationMethod<
  ListMarketplaceModelEndpointsRequest,
  ListMarketplaceModelEndpointsResponse,
  ListMarketplaceModelEndpointsError,
  Credentials | HttpClient.HttpClient,
  MarketplaceModelEndpointSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4448, __c139, 0) as any as S.Schema<ListMarketplaceModelEndpointsRequest>,
  output: __S(4451, __c139, 3) as any as S.Schema<ListMarketplaceModelEndpointsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMarketplaceModelEndpoints",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "marketplaceModelEndpoints",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListModelCopyJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of model copy jobs that you have submitted. You can filter the jobs to return based on one or more criteria. For more information, see Copy models to be used in other regions in the Amazon Bedrock User Guide.
 */
export const listModelCopyJobs: API.PaginatedOperationMethod<
  ListModelCopyJobsRequest,
  ListModelCopyJobsResponse,
  ListModelCopyJobsError,
  Credentials | HttpClient.HttpClient,
  ModelCopyJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4480, __c140, 0) as any as S.Schema<ListModelCopyJobsRequest>,
  output: __S(4482, __c140, 2) as any as S.Schema<ListModelCopyJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelCopyJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "modelCopyJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListModelCustomizationJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of model customization jobs that you have submitted. You can filter the jobs to return based on one or more criteria.
 *
 * For more information, see Custom models in the Amazon Bedrock User Guide.
 */
export const listModelCustomizationJobs: API.PaginatedOperationMethod<
  ListModelCustomizationJobsRequest,
  ListModelCustomizationJobsResponse,
  ListModelCustomizationJobsError,
  Credentials | HttpClient.HttpClient,
  ModelCustomizationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4512, __c141, 0) as any as S.Schema<ListModelCustomizationJobsRequest>,
  output: __S(4515, __c141, 3) as any as S.Schema<ListModelCustomizationJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelCustomizationJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "modelCustomizationJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListModelImportJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of import jobs you've submitted. You can filter the results to return based on one or more criteria. For more information, see Import a customized model in the Amazon Bedrock User Guide.
 */
export const listModelImportJobs: API.PaginatedOperationMethod<
  ListModelImportJobsRequest,
  ListModelImportJobsResponse,
  ListModelImportJobsError,
  Credentials | HttpClient.HttpClient,
  ModelImportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4544, __c142, 0) as any as S.Schema<ListModelImportJobsRequest>,
  output: __S(4547, __c142, 3) as any as S.Schema<ListModelImportJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelImportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "modelImportJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListModelInvocationJobsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all batch inference jobs in the account. For more information, see View details about a batch inference job.
 */
export const listModelInvocationJobs: API.PaginatedOperationMethod<
  ListModelInvocationJobsRequest,
  ListModelInvocationJobsResponse,
  ListModelInvocationJobsError,
  Credentials | HttpClient.HttpClient,
  ModelInvocationJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4576, __c143, 0) as any as S.Schema<ListModelInvocationJobsRequest>,
  output: __S(4579, __c143, 3) as any as S.Schema<ListModelInvocationJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListModelInvocationJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "invocationJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPromptRoutersError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of prompt routers.
 */
export const listPromptRouters: API.PaginatedOperationMethod<
  ListPromptRoutersRequest,
  ListPromptRoutersResponse,
  ListPromptRoutersError,
  Credentials | HttpClient.HttpClient,
  PromptRouterSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4608, __c144, 0) as any as S.Schema<ListPromptRoutersRequest>,
  output: __S(4610, __c144, 2) as any as S.Schema<ListPromptRoutersResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPromptRouters",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "promptRouterSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProvisionedModelThroughputsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the Provisioned Throughputs in the account. For more information, see Provisioned Throughput in the Amazon Bedrock User Guide.
 */
export const listProvisionedModelThroughputs: API.PaginatedOperationMethod<
  ListProvisionedModelThroughputsRequest,
  ListProvisionedModelThroughputsResponse,
  ListProvisionedModelThroughputsError,
  Credentials | HttpClient.HttpClient,
  ProvisionedModelSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(4640, __c145, 0) as any as S.Schema<ListProvisionedModelThroughputsRequest>,
  output: __S(4643, __c145, 3) as any as S.Schema<ListProvisionedModelThroughputsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListProvisionedModelThroughputs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "provisionedModelSummaries",
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
 * List the tags associated with the specified resource.
 *
 * For more information, see Tagging resources in the Amazon Bedrock User Guide.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4672, __c146, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(4673, __c146, 1) as any as S.Schema<ListTagsForResourceResponse>,
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

export type PutAccountDataRetentionError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the account-wide data retention mode for Amazon Bedrock.
 */
export const putAccountDataRetention: API.OperationMethod<
  PutAccountDataRetentionRequest,
  PutAccountDataRetentionResponse,
  PutAccountDataRetentionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4704, __c147, 0) as any as S.Schema<PutAccountDataRetentionRequest>,
  output: __S(2656, __c83, 0) as any as S.Schema<PutAccountDataRetentionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutAccountDataRetention",
}));

export type PutEnforcedGuardrailConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sets the account-level enforced guardrail configuration.
 */
export const putEnforcedGuardrailConfiguration: API.OperationMethod<
  PutEnforcedGuardrailConfigurationRequest,
  PutEnforcedGuardrailConfigurationResponse,
  PutEnforcedGuardrailConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4737, __c148, 1) as any as S.Schema<PutEnforcedGuardrailConfigurationRequest>,
  output: __S(4738, __c148, 2) as any as S.Schema<PutEnforcedGuardrailConfigurationResponse>,
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
  operationName: "PutEnforcedGuardrailConfiguration",
}));

export type PutModelInvocationLoggingConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Set the configuration values for model invocation logging.
 */
export const putModelInvocationLoggingConfiguration: API.OperationMethod<
  PutModelInvocationLoggingConfigurationRequest,
  PutModelInvocationLoggingConfigurationResponse,
  PutModelInvocationLoggingConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4768, __c149, 0) as any as S.Schema<PutModelInvocationLoggingConfigurationRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<PutModelInvocationLoggingConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutModelInvocationLoggingConfiguration",
}));

export type PutResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a resource policy for a Bedrock resource.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(65, __c2, 1) as any as S.Schema<PutResourcePolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutResourcePolicy",
}));

export type PutUseCaseForModelAccessError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Put usecase for model access.
 */
export const putUseCaseForModelAccess: API.OperationMethod<
  PutUseCaseForModelAccessRequest,
  PutUseCaseForModelAccessResponse,
  PutUseCaseForModelAccessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c3, 0) as any as S.Schema<PutUseCaseForModelAccessRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<PutUseCaseForModelAccessResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutUseCaseForModelAccess",
}));

export type RegisterMarketplaceModelEndpointError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Registers an existing Amazon SageMaker endpoint with Amazon Bedrock Marketplace, allowing it to be used with Amazon Bedrock APIs.
 */
export const registerMarketplaceModelEndpoint: API.OperationMethod<
  RegisterMarketplaceModelEndpointRequest,
  RegisterMarketplaceModelEndpointResponse,
  RegisterMarketplaceModelEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(128, __c4, 0) as any as S.Schema<RegisterMarketplaceModelEndpointRequest>,
  output: __S(1664, __c52, 0) as any as S.Schema<RegisterMarketplaceModelEndpointResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RegisterMarketplaceModelEndpoint",
}));

export type StartAutomatedReasoningPolicyBuildWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a new build workflow for an Automated Reasoning policy. This initiates the process of analyzing source documents and generating policy rules, variables, and types.
 */
export const startAutomatedReasoningPolicyBuildWorkflow: API.OperationMethod<
  StartAutomatedReasoningPolicyBuildWorkflowRequest,
  StartAutomatedReasoningPolicyBuildWorkflowResponse,
  StartAutomatedReasoningPolicyBuildWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(167, __c5, 7) as any as S.Schema<StartAutomatedReasoningPolicyBuildWorkflowRequest>,
  output: __S(168, __c5, 8) as any as S.Schema<StartAutomatedReasoningPolicyBuildWorkflowResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAutomatedReasoningPolicyBuildWorkflow",
}));

export type StartAutomatedReasoningPolicyTestWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Initiates a test workflow to validate Automated Reasoning policy tests. The workflow executes the specified tests against the policy and generates validation results.
 */
export const startAutomatedReasoningPolicyTestWorkflow: API.OperationMethod<
  StartAutomatedReasoningPolicyTestWorkflowRequest,
  StartAutomatedReasoningPolicyTestWorkflowResponse,
  StartAutomatedReasoningPolicyTestWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c6, 0) as any as S.Schema<StartAutomatedReasoningPolicyTestWorkflowRequest>,
  output: __S(193, __c6, 1) as any as S.Schema<StartAutomatedReasoningPolicyTestWorkflowResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartAutomatedReasoningPolicyTestWorkflow",
}));

export type StopAdvancedPromptOptimizationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an advanced prompt optimization job that is in progress.
 */
export const stopAdvancedPromptOptimizationJob: API.OperationMethod<
  StopAdvancedPromptOptimizationJobRequest,
  StopAdvancedPromptOptimizationJobResponse,
  StopAdvancedPromptOptimizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c7, 0) as any as S.Schema<StopAdvancedPromptOptimizationJobRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<StopAdvancedPromptOptimizationJobResponse>,
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
  operationName: "StopAdvancedPromptOptimizationJob",
}));

export type StopEvaluationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an evaluation job that is current being created or running.
 */
export const stopEvaluationJob: API.OperationMethod<
  StopEvaluationJobRequest,
  StopEvaluationJobResponse,
  StopEvaluationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c8, 0) as any as S.Schema<StopEvaluationJobRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<StopEvaluationJobResponse>,
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
  operationName: "StopEvaluationJob",
}));

export type StopModelCustomizationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an active model customization job. For more information, see Custom models in the Amazon Bedrock User Guide.
 */
export const stopModelCustomizationJob: API.OperationMethod<
  StopModelCustomizationJobRequest,
  StopModelCustomizationJobResponse,
  StopModelCustomizationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c9, 0) as any as S.Schema<StopModelCustomizationJobRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<StopModelCustomizationJobResponse>,
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
  operationName: "StopModelCustomizationJob",
}));

export type StopModelInvocationJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a batch inference job. You're only charged for tokens that were already processed. For more information, see Stop a batch inference job.
 */
export const stopModelInvocationJob: API.OperationMethod<
  StopModelInvocationJobRequest,
  StopModelInvocationJobResponse,
  StopModelInvocationJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c10, 0) as any as S.Schema<StopModelInvocationJobRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<StopModelInvocationJobResponse>,
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
  operationName: "StopModelInvocationJob",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Associate tags with a resource. For more information, see Tagging resources in the Amazon Bedrock User Guide.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyTagsException,
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
 * Remove one or more tags from a resource. For more information, see Tagging resources in the Amazon Bedrock User Guide.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<UntagResourceResponse>,
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

export type UpdateAutomatedReasoningPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | TooManyTagsException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Automated Reasoning policy with new rules, variables, or configuration. This creates a new version of the policy while preserving the previous version.
 */
export const updateAutomatedReasoningPolicy: API.OperationMethod<
  UpdateAutomatedReasoningPolicyRequest,
  UpdateAutomatedReasoningPolicyResponse,
  UpdateAutomatedReasoningPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c15, 0) as any as S.Schema<UpdateAutomatedReasoningPolicyRequest>,
  output: __S(481, __c15, 1) as any as S.Schema<UpdateAutomatedReasoningPolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutomatedReasoningPolicy",
}));

export type UpdateAutomatedReasoningPolicyAnnotationsError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the annotations for an Automated Reasoning policy build workflow. This allows you to modify extracted rules, variables, and types before finalizing the policy.
 */
export const updateAutomatedReasoningPolicyAnnotations: API.OperationMethod<
  UpdateAutomatedReasoningPolicyAnnotationsRequest,
  UpdateAutomatedReasoningPolicyAnnotationsResponse,
  UpdateAutomatedReasoningPolicyAnnotationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c16, 0) as any as S.Schema<UpdateAutomatedReasoningPolicyAnnotationsRequest>,
  output: __S(513, __c16, 1) as any as S.Schema<UpdateAutomatedReasoningPolicyAnnotationsResponse>,
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
  operationName: "UpdateAutomatedReasoningPolicyAnnotations",
}));

export type UpdateAutomatedReasoningPolicyTestCaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceInUseException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Automated Reasoning policy test. You can modify the content, query, expected result, and confidence threshold.
 */
export const updateAutomatedReasoningPolicyTestCase: API.OperationMethod<
  UpdateAutomatedReasoningPolicyTestCaseRequest,
  UpdateAutomatedReasoningPolicyTestCaseResponse,
  UpdateAutomatedReasoningPolicyTestCaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(544, __c17, 0) as any as S.Schema<UpdateAutomatedReasoningPolicyTestCaseRequest>,
  output: __S(1088, __c34, 0) as any as S.Schema<UpdateAutomatedReasoningPolicyTestCaseResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceInUseException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAutomatedReasoningPolicyTestCase",
}));

export type UpdateCustomModelDeploymentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a custom model deployment with a new custom model. This allows you to deploy updated models without creating new deployment endpoints.
 */
export const updateCustomModelDeployment: API.OperationMethod<
  UpdateCustomModelDeploymentRequest,
  UpdateCustomModelDeploymentResponse,
  UpdateCustomModelDeploymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<UpdateCustomModelDeploymentRequest>,
  output: __S(1248, __c39, 0) as any as S.Schema<UpdateCustomModelDeploymentResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateCustomModelDeployment",
}));

export type UpdateGuardrailError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a guardrail with the values you specify.
 *
 * - Specify a `name` and optional `description`.
 *
 * - Specify messages for when the guardrail successfully blocks a prompt or a model response in the `blockedInputMessaging` and `blockedOutputsMessaging` fields.
 *
 * - Specify topics for the guardrail to deny in the `topicPolicyConfig` object. Each GuardrailTopicConfig object in the `topicsConfig` list pertains to one topic.
 *
 * - Give a `name` and `description` so that the guardrail can properly identify the topic.
 *
 * - Specify `DENY` in the `type` field.
 *
 * - (Optional) Provide up to five prompts that you would categorize as belonging to the topic in the `examples` list.
 *
 * - Specify filter strengths for the harmful categories defined in Amazon Bedrock in the `contentPolicyConfig` object. Each GuardrailContentFilterConfig object in the `filtersConfig` list pertains to a harmful category. For more information, see Content filters. For more information about the fields in a content filter, see GuardrailContentFilterConfig.
 *
 * - Specify the category in the `type` field.
 *
 * - Specify the strength of the filter for prompts in the `inputStrength` field and for model responses in the `strength` field of the GuardrailContentFilterConfig.
 *
 * - (Optional) For security, include the ARN of a KMS key in the `kmsKeyId` field.
 */
export const updateGuardrail: API.OperationMethod<
  UpdateGuardrailRequest,
  UpdateGuardrailResponse,
  UpdateGuardrailError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<UpdateGuardrailRequest>,
  output: __S(609, __c19, 1) as any as S.Schema<UpdateGuardrailResponse>,
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
  operationName: "UpdateGuardrail",
}));

export type UpdateMarketplaceModelEndpointError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an existing endpoint for a model from Amazon Bedrock Marketplace.
 */
export const updateMarketplaceModelEndpoint: API.OperationMethod<
  UpdateMarketplaceModelEndpointRequest,
  UpdateMarketplaceModelEndpointResponse,
  UpdateMarketplaceModelEndpointError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<UpdateMarketplaceModelEndpointRequest>,
  output: __S(1664, __c52, 0) as any as S.Schema<UpdateMarketplaceModelEndpointResponse>,
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
  operationName: "UpdateMarketplaceModelEndpoint",
}));

export type UpdateProvisionedModelThroughputError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the name or associated model for a Provisioned Throughput. For more information, see Provisioned Throughput in the Amazon Bedrock User Guide.
 */
export const updateProvisionedModelThroughput: API.OperationMethod<
  UpdateProvisionedModelThroughputRequest,
  UpdateProvisionedModelThroughputResponse,
  UpdateProvisionedModelThroughputError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<UpdateProvisionedModelThroughputRequest>,
  output: __S(736, __c23, 0) as any as S.Schema<UpdateProvisionedModelThroughputResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateProvisionedModelThroughput",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobIdentifiers: __S(32, __c1, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/advanced-prompt-optimization-job/batch-delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteAdvancedPromptOptimizationJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ jobIdentifier: S.String, code: S.String, message: S.optional(S.String) }),
      ).annotate({ identifier: "BatchDeleteAdvancedPromptOptimizationJobError" });
    case 2:
      return S.Array(__S(1, __c0, 1));
    case 3:
      return S.suspend(() => S.Struct({ jobIdentifier: S.String, jobStatus: S.String })).annotate({
        identifier: "BatchDeleteAdvancedPromptOptimizationJobItem",
      });
    case 4:
      return S.Array(__S(3, __c0, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ errors: __S(2, __c0, 2), advancedPromptOptimizationJobs: __S(4, __c0, 4) }),
      ).annotate({ identifier: "BatchDeleteAdvancedPromptOptimizationJobResponse" });
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
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, resourcePolicy: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/resource-policy" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ resourceArn: S.optional(S.String) })).annotate({
        identifier: "PutResourcePolicyResponse",
      });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ formData: T.Blob }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/use-case-for-model-access" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutUseCaseForModelAccessRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          endpointIdentifier: S.String.pipe(T.HttpLabel("endpointIdentifier")),
          modelSourceIdentifier: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/marketplace-model/endpoints/{endpointIdentifier}/registration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RegisterMarketplaceModelEndpointRequest" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          document: SensitiveBlob,
          documentContentType: S.String,
          documentName: SensitiveString,
          documentDescription: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyBuildWorkflowDocument" });
    case 1:
      return S.Array(__S(160, __c5, 0));
    case 2:
      return S.suspend(() => S.Struct({ annotations: __S(2784, __c87, 0) })).annotate({
        identifier: "AutomatedReasoningPolicyBuildWorkflowRepairContent",
      });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ documents: __S(161, __c5, 1) })]);
    case 4:
      return S.suspend(() =>
        S.Struct({ documents: __S(161, __c5, 1), feedback: S.optional(SensitiveString) }),
      ).annotate({ identifier: "AutomatedReasoningPolicyIterativeRefinementContent" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ documents: __S(161, __c5, 1) }),
        /*@__PURE__*/ S.Struct({ policyRepairAssets: __S(162, __c5, 2) }),
        /*@__PURE__*/ S.Struct({ generateFidelityReportContent: __S(163, __c5, 3) }),
        /*@__PURE__*/ S.Struct({ iterativeRefinementContent: __S(164, __c5, 4) }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          policyDefinition: S.optional(__S(1029, __c32, 5)),
          workflowContent: S.optional(__S(165, __c5, 5)),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyBuildWorkflowSource" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          buildWorkflowType: S.String.pipe(T.HttpLabel("buildWorkflowType")),
          clientRequestToken: S.optional(S.String).pipe(
            T.HttpHeader("x-amz-client-token"),
            T.IdempotencyToken(),
          ),
          sourceContent: __S(166, __c5, 6)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "AutomatedReasoningPolicyBuildWorkflowSource" }),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowType}/start",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartAutomatedReasoningPolicyBuildWorkflowRequest" });
    case 8:
      return S.suspend(() => S.Struct({ policyArn: S.String, buildWorkflowId: S.String })).annotate(
        { identifier: "StartAutomatedReasoningPolicyBuildWorkflowResponse" },
      );
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
          testCaseIds: S.optional(__S(32, __c1, 0)),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/test-workflows",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartAutomatedReasoningPolicyTestWorkflowRequest" });
    case 1:
      return S.suspend(() => S.Struct({ policyArn: S.String })).annotate({
        identifier: "StartAutomatedReasoningPolicyTestWorkflowResponse",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")) }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/advanced-prompt-optimization-jobs/{jobIdentifier}/stop",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopAdvancedPromptOptimizationJobRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobIdentifier: SensitiveString.pipe(T.HttpLabel("jobIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/evaluation-job/{jobIdentifier}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopEvaluationJobRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/model-customization-jobs/{jobIdentifier}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopModelCustomizationJobRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/model-invocation-job/{jobIdentifier}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopModelInvocationJobRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceARN: S.String, tags: __S(801, __c25, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/tagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobIdentifiers: __S(416, __c13, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/evaluation-jobs/batch-delete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteEvaluationJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ jobIdentifier: SensitiveString, code: S.String, message: S.optional(S.String) }),
      ).annotate({ identifier: "BatchDeleteEvaluationJobError" });
    case 2:
      return S.Array(__S(385, __c12, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ jobIdentifier: SensitiveString, jobStatus: S.String }),
      ).annotate({ identifier: "BatchDeleteEvaluationJobItem" });
    case 4:
      return S.Array(__S(387, __c12, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ errors: __S(386, __c12, 2), evaluationJobs: __S(388, __c12, 4) }),
      ).annotate({ identifier: "BatchDeleteEvaluationJobResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceARN: S.String, tagKeys: __S(32, __c1, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/untagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          policyDefinition: __S(1029, __c32, 5),
          name: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/automated-reasoning-policies/{policyArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAutomatedReasoningPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String,
          name: SensitiveString,
          definitionHash: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "UpdateAutomatedReasoningPolicyResponse" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
          annotations: __S(2784, __c87, 0),
          lastUpdatedAnnotationSetHash: S.String,
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/annotations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAutomatedReasoningPolicyAnnotationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String,
          buildWorkflowId: S.String,
          annotationSetHash: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "UpdateAutomatedReasoningPolicyAnnotationsResponse" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          testCaseId: S.String.pipe(T.HttpLabel("testCaseId")),
          guardContent: SensitiveString,
          queryContent: S.optional(SensitiveString),
          lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          expectedAggregatedFindingsResult: S.String,
          confidenceThreshold: S.optional(S.Number),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/automated-reasoning-policies/{policyArn}/test-cases/{testCaseId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAutomatedReasoningPolicyTestCaseRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelArn: S.String,
          customModelDeploymentIdentifier: S.String.pipe(
            T.HttpLabel("customModelDeploymentIdentifier"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "PATCH",
              uri: "/model-customization/custom-model-deployments/{customModelDeploymentIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateCustomModelDeploymentRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          guardrailIdentifier: S.String.pipe(T.HttpLabel("guardrailIdentifier")),
          name: SensitiveString,
          description: S.optional(SensitiveString),
          topicPolicyConfig: S.optional(__S(1474, __c46, 2)),
          contentPolicyConfig: S.optional(__S(1475, __c46, 3)),
          wordPolicyConfig: S.optional(__S(1476, __c46, 4)),
          sensitiveInformationPolicyConfig: S.optional(__S(1477, __c46, 5)),
          contextualGroundingPolicyConfig: S.optional(__S(1478, __c46, 6)),
          automatedReasoningPolicyConfig: S.optional(__S(1549, __c48, 13)),
          crossRegionConfig: S.optional(__S(1479, __c46, 7)),
          blockedInputMessaging: SensitiveString,
          blockedOutputsMessaging: SensitiveString,
          kmsKeyId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/guardrails/{guardrailIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGuardrailRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          guardrailId: S.String,
          guardrailArn: S.String,
          version: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "UpdateGuardrailResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          endpointArn: S.String.pipe(T.HttpLabel("endpointArn")),
          endpointConfig: __S(1729, __c54, 1),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/marketplace-model/endpoints/{endpointArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMarketplaceModelEndpointRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          provisionedModelId: S.String.pipe(T.HttpLabel("provisionedModelId")),
          desiredProvisionedModelName: S.optional(S.String),
          desiredModelId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/provisioned-model-throughput/{provisionedModelId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProvisionedModelThroughputRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/cancel",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelAutomatedReasoningPolicyBuildWorkflowRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "CancelAutomatedReasoningPolicyBuildWorkflowResponse",
      });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobName: S.String,
          jobDescription: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          inputConfig: __S(832, __c26, 0),
          outputConfig: __S(832, __c26, 0),
          encryptionKeyArn: S.optional(S.String),
          tags: S.optional(__S(801, __c25, 1)),
          modelConfigurations: __S(930, __c29, 2),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/advanced-prompt-optimization-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAdvancedPromptOptimizationJobRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(800, __c25, 0));
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ s3Uri: S.String })).annotate({
        identifier: "AdvancedPromptOptimizationInputConfig",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ jobArn: S.String })).annotate({
        identifier: "CreateAdvancedPromptOptimizationJobResponse",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.Any.pipe(S.optional));
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxTokens: S.optional(S.Number),
          temperature: S.optional(S.Number),
          topP: S.optional(S.Number),
          stopSequences: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "InferenceConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String,
          inferenceConfig: S.optional(__S(928, __c29, 0)),
          additionalModelRequestFields: S.optional(__S(896, __c28, 0)),
        }),
      ).annotate({ identifier: "ModelConfiguration" });
    case 2:
      return S.Array(__S(929, __c29, 1));
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          description: S.optional(SensitiveString),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          policyDefinition: S.optional(__S(1029, __c32, 5)),
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(801, __c25, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/automated-reasoning-policies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAutomatedReasoningPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String,
          version: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          definitionHash: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateAutomatedReasoningPolicyResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ value: S.String, description: S.optional(SensitiveString) }),
      ).annotate({ identifier: "AutomatedReasoningPolicyDefinitionTypeValue" });
    case 1:
      return S.Array(__S(992, __c31, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ name: SensitiveString, type: SensitiveString, description: SensitiveString }),
      ).annotate({ identifier: "AutomatedReasoningPolicyDefinitionVariable" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          description: S.optional(SensitiveString),
          values: __S(993, __c31, 1),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyDefinitionType" });
    case 1:
      return S.Array(__S(1024, __c32, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          expression: SensitiveString,
          alternateExpression: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyDefinitionRule" });
    case 3:
      return S.Array(__S(1026, __c32, 2));
    case 4:
      return S.Array(__S(994, __c31, 2));
    case 5:
      return S.suspend(() =>
        S.Struct({
          version: S.optional(S.String),
          types: S.optional(__S(1025, __c32, 1)),
          rules: S.optional(__S(1027, __c32, 3)),
          variables: S.optional(__S(1028, __c32, 4)),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyDefinition" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          guardContent: SensitiveString,
          queryContent: S.optional(SensitiveString),
          expectedAggregatedFindingsResult: S.String,
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          confidenceThreshold: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/automated-reasoning-policies/{policyArn}/test-cases" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAutomatedReasoningPolicyTestCaseRequest" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ policyArn: S.String, testCaseId: S.String })).annotate({
        identifier: "CreateAutomatedReasoningPolicyTestCaseResponse",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          lastUpdatedDefinitionHash: S.String,
          tags: S.optional(__S(801, __c25, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/automated-reasoning-policies/{policyArn}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAutomatedReasoningPolicyVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String,
          version: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          definitionHash: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateAutomatedReasoningPolicyVersionResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ modelPackageArn: S.String })).annotate({
        identifier: "ModelPackageArnDataSource",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ modelPackageArnDataSource: __S(1152, __c36, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          modelName: S.String,
          modelSourceConfig: S.optional(__S(1184, __c37, 0)),
          customModelDataSource: S.optional(__S(1153, __c36, 1)),
          modelKmsKeyArn: S.optional(S.String),
          roleArn: S.optional(S.String),
          modelTags: S.optional(__S(801, __c25, 1)),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/custom-models/create-custom-model" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCustomModelRequest" });
    case 3:
      return S.suspend(() => S.Struct({ modelArn: S.String })).annotate({
        identifier: "CreateCustomModelResponse",
      });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ s3DataSource: __S(832, __c26, 0) })]);
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelDeploymentName: S.String,
          modelArn: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(801, __c25, 1)),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/model-customization/custom-model-deployments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateCustomModelDeploymentRequest" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ customModelDeploymentArn: S.String })).annotate({
        identifier: "CreateCustomModelDeploymentResponse",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobName: S.String,
          jobDescription: S.optional(SensitiveString),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          roleArn: S.String,
          customerEncryptionKeyId: S.optional(S.String),
          jobTags: S.optional(__S(801, __c25, 1)),
          applicationType: S.optional(S.String),
          evaluationConfig: __S(1363, __c42, 19),
          inferenceConfig: __S(1404, __c43, 28),
          outputDataConfig: __S(832, __c26, 0),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/evaluation-jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateEvaluationJobRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ s3Uri: S.String })]);
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: SensitiveString, datasetLocation: S.optional(__S(1312, __c41, 0)) }),
      ).annotate({ identifier: "EvaluationDataset" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          taskType: S.String,
          dataset: __S(1344, __c42, 0),
          metricNames: __S(416, __c13, 0),
        }),
      ).annotate({ identifier: "EvaluationDatasetMetricConfig" });
    case 2:
      return S.Array(__S(1345, __c42, 1));
    case 3:
      return S.suspend(() => S.Struct({ modelIdentifier: S.String })).annotate({
        identifier: "BedrockEvaluatorModel",
      });
    case 4:
      return S.Array(__S(1347, __c42, 3));
    case 5:
      return S.Union([/*@__PURE__*/ S.Struct({ bedrockEvaluatorModels: __S(1348, __c42, 4) })]);
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ stringValue: S.String }),
        /*@__PURE__*/ S.Struct({ floatValue: S.Number }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({ definition: S.String, value: __S(1350, __c42, 6) }),
      ).annotate({ identifier: "RatingScaleItem" });
    case 8:
      return S.Array(__S(1351, __c42, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          instructions: S.String,
          ratingScale: S.optional(__S(1352, __c42, 8)),
        }),
      ).annotate({ identifier: "CustomMetricDefinition" });
    case 10:
      return S.Union([/*@__PURE__*/ S.Struct({ customMetricDefinition: __S(1353, __c42, 9) })]);
    case 11:
      return S.Array(__S(1354, __c42, 10));
    case 12:
      return S.suspend(() => S.Struct({ bedrockEvaluatorModels: __S(1348, __c42, 4) })).annotate({
        identifier: "CustomMetricEvaluatorModelConfig",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          customMetrics: __S(1355, __c42, 11),
          evaluatorModelConfig: __S(1356, __c42, 12),
        }),
      ).annotate({ identifier: "AutomatedEvaluationCustomMetricConfig" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          datasetMetricConfigs: __S(1346, __c42, 2),
          evaluatorModelConfig: S.optional(__S(1349, __c42, 5)),
          customMetricConfig: S.optional(__S(1357, __c42, 13)),
        }),
      ).annotate({ identifier: "AutomatedEvaluationConfig" });
    case 15:
      return S.suspend(() =>
        S.Struct({ flowDefinitionArn: S.String, instructions: S.optional(SensitiveString) }),
      ).annotate({ identifier: "HumanWorkflowConfig" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          description: S.optional(SensitiveString),
          ratingMethod: S.String,
        }),
      ).annotate({ identifier: "HumanEvaluationCustomMetric" });
    case 17:
      return S.Array(__S(1360, __c42, 16));
    case 18:
      return S.suspend(() =>
        S.Struct({
          humanWorkflowConfig: S.optional(__S(1359, __c42, 15)),
          customMetrics: S.optional(__S(1361, __c42, 17)),
          datasetMetricConfigs: __S(1346, __c42, 2),
        }),
      ).annotate({ identifier: "HumanEvaluationConfig" });
    case 19:
      return S.Union([
        /*@__PURE__*/ S.Struct({ automated: __S(1358, __c42, 14) }),
        /*@__PURE__*/ S.Struct({ human: __S(1362, __c42, 18) }),
      ]);
    case 20:
      return S.suspend(() => S.Struct({ latency: S.optional(S.String) })).annotate({
        identifier: "PerformanceConfiguration",
      });
    case 21:
      return S.suspend(() =>
        S.Struct({
          modelIdentifier: S.String,
          inferenceParams: S.optional(SensitiveString),
          performanceConfig: S.optional(__S(1364, __c42, 20)),
        }),
      ).annotate({ identifier: "EvaluationBedrockModel" });
    case 22:
      return S.suspend(() => S.Struct({ inferenceSourceIdentifier: S.String })).annotate({
        identifier: "EvaluationPrecomputedInferenceSource",
      });
    case 23:
      return S.Union([
        /*@__PURE__*/ S.Struct({ bedrockModel: __S(1365, __c42, 21) }),
        /*@__PURE__*/ S.Struct({ precomputedInferenceSource: __S(1366, __c42, 22) }),
      ]);
    case 24:
      return S.Array(__S(1367, __c42, 23));
    case 25:
      return S.suspend(() => S.Struct({ key: S.String, value: S.Any })).annotate({
        identifier: "FilterAttribute",
      });
    case 26:
      return S.Array(
        /*@__PURE__*/ S.suspend(() => __S(1371, __c42, 27)).annotate({
          identifier: "RetrievalFilter",
        }),
      );
    case 27:
      return S.Union([
        /*@__PURE__*/ S.Struct({ equals: __S(1369, __c42, 25) }),
        /*@__PURE__*/ S.Struct({ notEquals: __S(1369, __c42, 25) }),
        /*@__PURE__*/ S.Struct({ greaterThan: __S(1369, __c42, 25) }),
        /*@__PURE__*/ S.Struct({ greaterThanOrEquals: __S(1369, __c42, 25) }),
        /*@__PURE__*/ S.Struct({ lessThan: __S(1369, __c42, 25) }),
        /*@__PURE__*/ S.Struct({ lessThanOrEquals: __S(1369, __c42, 25) }),
        /*@__PURE__*/ S.Struct({ in: __S(1369, __c42, 25) }),
        /*@__PURE__*/ S.Struct({ notIn: __S(1369, __c42, 25) }),
        /*@__PURE__*/ S.Struct({ startsWith: __S(1369, __c42, 25) }),
        /*@__PURE__*/ S.Struct({ listContains: __S(1369, __c42, 25) }),
        /*@__PURE__*/ S.Struct({ stringContains: __S(1369, __c42, 25) }),
        /*@__PURE__*/ S.Struct({
          andAll: /*@__PURE__*/ S.suspend(() => __S(1370, __c42, 26)).annotate({
            identifier: "RetrievalFilterList",
          }),
        }),
        /*@__PURE__*/ S.Struct({
          orAll: /*@__PURE__*/ S.suspend(() => __S(1370, __c42, 26)).annotate({
            identifier: "RetrievalFilterList",
          }),
        }),
      ]);
    case 28:
      return S.suspend(() =>
        S.Struct({ key: S.String, type: S.String, description: S.String }),
      ).annotate({ identifier: "MetadataAttributeSchema" });
    case 29:
      return S.Array(__S(1372, __c42, 28));
    case 30:
      return S.suspend(() =>
        S.Struct({ metadataAttributes: __S(1373, __c42, 29), modelArn: S.String }),
      ).annotate({ identifier: "ImplicitFilterConfiguration" });
    case 31:
      return S.suspend(() =>
        S.Struct({
          modelArn: S.String,
          additionalModelRequestFields: S.optional(__S(896, __c28, 0)),
        }),
      ).annotate({ identifier: "VectorSearchBedrockRerankingModelConfiguration" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ fieldName: S.String })).annotate({
        identifier: "FieldForReranking",
      });
    case 1:
      return S.Array(__S(1376, __c43, 0));
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ fieldsToInclude: __S(1377, __c43, 1) }),
        /*@__PURE__*/ S.Struct({ fieldsToExclude: __S(1377, __c43, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          selectionMode: S.String,
          selectiveModeConfiguration: S.optional(__S(1378, __c43, 2)),
        }),
      ).annotate({ identifier: "MetadataConfigurationForReranking" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          modelConfiguration: __S(1375, __c42, 31),
          numberOfRerankedResults: S.optional(S.Number),
          metadataConfiguration: S.optional(__S(1379, __c43, 3)),
        }),
      ).annotate({ identifier: "VectorSearchBedrockRerankingConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          bedrockRerankingConfiguration: S.optional(__S(1380, __c43, 4)),
        }),
      ).annotate({ identifier: "VectorSearchRerankingConfiguration" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          numberOfResults: S.optional(S.Number),
          overrideSearchType: S.optional(S.String),
          filter: S.optional(__S(1371, __c42, 27)),
          implicitFilterConfiguration: S.optional(__S(1374, __c42, 30)),
          rerankingConfiguration: S.optional(__S(1381, __c43, 5)),
        }),
      ).annotate({ identifier: "KnowledgeBaseVectorSearchConfiguration" });
    case 7:
      return S.suspend(() => S.Struct({ vectorSearchConfiguration: __S(1382, __c43, 6) })).annotate(
        { identifier: "KnowledgeBaseRetrievalConfiguration" },
      );
    case 8:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          knowledgeBaseRetrievalConfiguration: __S(1383, __c43, 7),
        }),
      ).annotate({ identifier: "RetrieveConfig" });
    case 9:
      return S.suspend(() =>
        S.Struct({ textPromptTemplate: S.optional(SensitiveString) }),
      ).annotate({ identifier: "PromptTemplate" });
    case 10:
      return S.suspend(() =>
        S.Struct({ guardrailId: S.String, guardrailVersion: S.String }),
      ).annotate({ identifier: "GuardrailConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          temperature: S.optional(S.Number),
          topP: S.optional(S.Number),
          maxTokens: S.optional(S.Number),
          stopSequences: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "TextInferenceConfig" });
    case 12:
      return S.suspend(() =>
        S.Struct({ textInferenceConfig: S.optional(__S(1387, __c43, 11)) }),
      ).annotate({ identifier: "KbInferenceConfig" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          promptTemplate: S.optional(__S(1385, __c43, 9)),
          guardrailConfiguration: S.optional(__S(1386, __c43, 10)),
          kbInferenceConfig: S.optional(__S(1388, __c43, 12)),
          additionalModelRequestFields: S.optional(__S(896, __c28, 0)),
        }),
      ).annotate({ identifier: "GenerationConfiguration" });
    case 14:
      return S.suspend(() => S.Struct({ type: S.String })).annotate({
        identifier: "QueryTransformationConfiguration",
      });
    case 15:
      return S.suspend(() =>
        S.Struct({ queryTransformationConfiguration: __S(1390, __c43, 14) }),
      ).annotate({ identifier: "OrchestrationConfiguration" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          modelArn: S.String,
          retrievalConfiguration: S.optional(__S(1383, __c43, 7)),
          generationConfiguration: S.optional(__S(1389, __c43, 13)),
          orchestrationConfiguration: S.optional(__S(1391, __c43, 15)),
        }),
      ).annotate({ identifier: "KnowledgeBaseRetrieveAndGenerateConfiguration" });
    case 17:
      return S.suspend(() => S.Struct({ uri: S.String })).annotate({ identifier: "S3ObjectDoc" });
    case 18:
      return S.suspend(() =>
        S.Struct({ identifier: SensitiveString, contentType: S.String, data: SensitiveBlob }),
      ).annotate({ identifier: "ByteContentDoc" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          sourceType: S.String,
          s3Location: S.optional(__S(1393, __c43, 17)),
          byteContent: S.optional(__S(1394, __c43, 18)),
        }),
      ).annotate({ identifier: "ExternalSource" });
    case 20:
      return S.Array(__S(1395, __c43, 19));
    case 21:
      return S.suspend(() =>
        S.Struct({
          modelArn: S.String,
          sources: __S(1396, __c43, 20),
          generationConfiguration: S.optional(__S(1389, __c43, 13)),
        }),
      ).annotate({ identifier: "ExternalSourcesRetrieveAndGenerateConfiguration" });
    case 22:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          knowledgeBaseConfiguration: S.optional(__S(1392, __c43, 16)),
          externalSourcesConfiguration: S.optional(__S(1397, __c43, 21)),
        }),
      ).annotate({ identifier: "RetrieveAndGenerateConfiguration" });
    case 23:
      return S.Union([
        /*@__PURE__*/ S.Struct({ retrieveConfig: __S(1384, __c43, 8) }),
        /*@__PURE__*/ S.Struct({ retrieveAndGenerateConfig: __S(1398, __c43, 22) }),
      ]);
    case 24:
      return S.suspend(() => S.Struct({ ragSourceIdentifier: S.String })).annotate({
        identifier: "EvaluationPrecomputedRetrieveSourceConfig",
      });
    case 25:
      return S.Union([
        /*@__PURE__*/ S.Struct({ retrieveSourceConfig: __S(1400, __c43, 24) }),
        /*@__PURE__*/ S.Struct({ retrieveAndGenerateSourceConfig: __S(1400, __c43, 24) }),
      ]);
    case 26:
      return S.Union([
        /*@__PURE__*/ S.Struct({ knowledgeBaseConfig: __S(1399, __c43, 23) }),
        /*@__PURE__*/ S.Struct({ precomputedRagSourceConfig: __S(1401, __c43, 25) }),
      ]);
    case 27:
      return S.Array(__S(1402, __c43, 26));
    case 28:
      return S.Union([
        /*@__PURE__*/ S.Struct({ models: __S(1368, __c42, 24) }),
        /*@__PURE__*/ S.Struct({ ragConfigs: __S(1403, __c43, 27) }),
      ]);
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ offerToken: S.String, modelId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/create-foundation-model-agreement" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFoundationModelAgreementRequest" });
    case 1:
      return S.suspend(() => S.Struct({ modelId: S.String })).annotate({
        identifier: "CreateFoundationModelAgreementResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          description: S.optional(SensitiveString),
          topicPolicyConfig: S.optional(__S(1474, __c46, 2)),
          contentPolicyConfig: S.optional(__S(1475, __c46, 3)),
          wordPolicyConfig: S.optional(__S(1476, __c46, 4)),
          sensitiveInformationPolicyConfig: S.optional(__S(1477, __c46, 5)),
          contextualGroundingPolicyConfig: S.optional(__S(1478, __c46, 6)),
          automatedReasoningPolicyConfig: S.optional(__S(1549, __c48, 13)),
          crossRegionConfig: S.optional(__S(1479, __c46, 7)),
          blockedInputMessaging: SensitiveString,
          blockedOutputsMessaging: SensitiveString,
          kmsKeyId: S.optional(S.String),
          tags: S.optional(__S(801, __c25, 1)),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/guardrails" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateGuardrailRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          guardrailId: S.String,
          guardrailArn: S.String,
          version: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateGuardrailResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          definition: SensitiveString,
          examples: S.optional(__S(416, __c13, 0)),
          type: S.String,
          inputAction: S.optional(S.String),
          outputAction: S.optional(S.String),
          inputEnabled: S.optional(S.Boolean),
          outputEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GuardrailTopicConfig" });
    case 1:
      return S.Array(__S(1472, __c46, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          topicsConfig: __S(1473, __c46, 1),
          tierConfig: S.optional(__S(1536, __c48, 0)),
        }),
      ).annotate({ identifier: "GuardrailTopicPolicyConfig" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          filtersConfig: __S(1538, __c48, 2),
          tierConfig: S.optional(__S(1536, __c48, 0)),
        }),
      ).annotate({ identifier: "GuardrailContentPolicyConfig" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          wordsConfig: S.optional(__S(1540, __c48, 4)),
          managedWordListsConfig: S.optional(__S(1542, __c48, 6)),
        }),
      ).annotate({ identifier: "GuardrailWordPolicyConfig" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          piiEntitiesConfig: S.optional(__S(1544, __c48, 8)),
          regexesConfig: S.optional(__S(1546, __c48, 10)),
        }),
      ).annotate({ identifier: "GuardrailSensitiveInformationPolicyConfig" });
    case 6:
      return S.suspend(() => S.Struct({ filtersConfig: __S(1548, __c48, 12) })).annotate({
        identifier: "GuardrailContextualGroundingPolicyConfig",
      });
    case 7:
      return S.suspend(() => S.Struct({ guardrailProfileIdentifier: S.String })).annotate({
        identifier: "GuardrailCrossRegionConfig",
      });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ tierName: S.String })).annotate({
        identifier: "GuardrailTopicsTierConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          inputStrength: S.String,
          outputStrength: S.String,
          inputModalities: S.optional(__S(1504, __c47, 0)),
          outputModalities: S.optional(__S(1504, __c47, 0)),
          inputAction: S.optional(S.String),
          outputAction: S.optional(S.String),
          inputEnabled: S.optional(S.Boolean),
          outputEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GuardrailContentFilterConfig" });
    case 2:
      return S.Array(__S(1537, __c48, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          text: S.String,
          inputAction: S.optional(S.String),
          outputAction: S.optional(S.String),
          inputEnabled: S.optional(S.Boolean),
          outputEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GuardrailWordConfig" });
    case 4:
      return S.Array(__S(1539, __c48, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          inputAction: S.optional(S.String),
          outputAction: S.optional(S.String),
          inputEnabled: S.optional(S.Boolean),
          outputEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GuardrailManagedWordsConfig" });
    case 6:
      return S.Array(__S(1541, __c48, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          action: S.String,
          inputAction: S.optional(S.String),
          outputAction: S.optional(S.String),
          inputEnabled: S.optional(S.Boolean),
          outputEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GuardrailPiiEntityConfig" });
    case 8:
      return S.Array(__S(1543, __c48, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          pattern: S.String,
          action: S.String,
          inputAction: S.optional(S.String),
          outputAction: S.optional(S.String),
          inputEnabled: S.optional(S.Boolean),
          outputEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GuardrailRegexConfig" });
    case 10:
      return S.Array(__S(1545, __c48, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          threshold: S.Number,
          action: S.optional(S.String),
          enabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GuardrailContextualGroundingFilterConfig" });
    case 12:
      return S.Array(__S(1547, __c48, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({ policies: __S(32, __c1, 0), confidenceThreshold: S.optional(S.Number) }),
      ).annotate({ identifier: "GuardrailAutomatedReasoningPolicyConfig" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          guardrailIdentifier: S.String.pipe(T.HttpLabel("guardrailIdentifier")),
          description: S.optional(SensitiveString),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/guardrails/{guardrailIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateGuardrailVersionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ guardrailId: S.String, version: S.String })).annotate({
        identifier: "CreateGuardrailVersionResponse",
      });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ copyFrom: S.String })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          inferenceProfileName: S.String,
          description: S.optional(SensitiveString),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          modelSource: __S(1600, __c50, 0),
          tags: S.optional(__S(801, __c25, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/inference-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateInferenceProfileRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ inferenceProfileArn: S.String, status: S.optional(S.String) }),
      ).annotate({ identifier: "CreateInferenceProfileResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelSourceIdentifier: S.String,
          endpointConfig: __S(1729, __c54, 1),
          acceptEula: S.optional(S.Boolean),
          endpointName: S.String,
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(801, __c25, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/marketplace-model/endpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMarketplaceModelEndpointRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ marketplaceModelEndpoint: __S(1730, __c54, 2) })).annotate({
        identifier: "CreateMarketplaceModelEndpointResponse",
      });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ subnetIds: __S(32, __c1, 0), securityGroupIds: __S(32, __c1, 0) }),
      ).annotate({ identifier: "VpcConfig" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          initialInstanceCount: S.Number,
          instanceType: S.String,
          executionRole: S.String,
          kmsEncryptionKey: S.optional(S.String),
          vpc: S.optional(__S(1696, __c53, 0)),
        }),
      ).annotate({ identifier: "SageMakerEndpoint" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ sageMaker: __S(1728, __c54, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          endpointArn: S.String,
          modelSourceIdentifier: S.String,
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endpointConfig: __S(1729, __c54, 1),
          endpointStatus: S.String,
          endpointStatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "MarketplaceModelEndpoint" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceModelArn: S.String,
          targetModelName: S.String,
          modelKmsKeyId: S.optional(S.String),
          targetModelTags: S.optional(__S(801, __c25, 1)),
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/model-copy-jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateModelCopyJobRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobName: S.String,
          customModelName: S.String,
          roleArn: S.String,
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          baseModelIdentifier: S.String,
          customizationType: S.optional(S.String),
          customModelKmsKeyId: S.optional(S.String),
          jobTags: S.optional(__S(801, __c25, 1)),
          customModelTags: S.optional(__S(801, __c25, 1)),
          trainingDataConfig: __S(1829, __c57, 5),
          validationDataConfig: S.optional(__S(1831, __c57, 7)),
          outputDataConfig: __S(832, __c26, 0),
          hyperParameters: S.optional(__S(1824, __c57, 0)),
          vpcConfig: S.optional(__S(1696, __c53, 0)),
          customizationConfig: S.optional(__S(1838, __c57, 14)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/model-customization-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateModelCustomizationJobRequest" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          equals: S.optional(__S(1824, __c57, 0)),
          notEquals: S.optional(__S(1824, __c57, 0)),
        }),
      ).annotate({ identifier: "RequestMetadataBaseFilters" });
    case 2:
      return S.Array(__S(1825, __c57, 1));
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ equals: __S(1824, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ notEquals: __S(1824, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ andAll: __S(1826, __c57, 2) }),
        /*@__PURE__*/ S.Struct({ orAll: __S(1826, __c57, 2) }),
      ]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          usePromptResponse: S.optional(S.Boolean),
          invocationLogSource: __S(1312, __c41, 0),
          requestMetadataFilters: S.optional(__S(1827, __c57, 3)),
        }),
      ).annotate({ identifier: "InvocationLogsConfig" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          s3Uri: S.optional(S.String),
          invocationLogsConfig: S.optional(__S(1828, __c57, 4)),
        }),
      ).annotate({ identifier: "TrainingDataConfig" });
    case 6:
      return S.Array(__S(832, __c26, 0));
    case 7:
      return S.suspend(() => S.Struct({ validators: __S(1830, __c57, 6) })).annotate({
        identifier: "ValidationDataConfig",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          teacherModelIdentifier: S.String,
          maxResponseLengthForInference: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TeacherModelConfig" });
    case 9:
      return S.suspend(() => S.Struct({ teacherModelConfig: __S(1832, __c57, 8) })).annotate({
        identifier: "DistillationConfig",
      });
    case 10:
      return S.suspend(() => S.Struct({ lambdaArn: S.String })).annotate({
        identifier: "LambdaGraderConfig",
      });
    case 11:
      return S.Union([/*@__PURE__*/ S.Struct({ lambdaGrader: __S(1834, __c57, 10) })]);
    case 12:
      return S.suspend(() =>
        S.Struct({
          epochCount: S.optional(S.Number),
          batchSize: S.optional(S.Number),
          learningRate: S.optional(S.Number),
          maxPromptLength: S.optional(S.Number),
          trainingSamplePerPrompt: S.optional(S.Number),
          inferenceMaxTokens: S.optional(S.Number),
          reasoningEffort: S.optional(S.String),
          evalInterval: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RFTHyperParameters" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          graderConfig: S.optional(__S(1835, __c57, 11)),
          hyperParameters: S.optional(__S(1836, __c57, 12)),
        }),
      ).annotate({ identifier: "RFTConfig" });
    case 14:
      return S.Union([
        /*@__PURE__*/ S.Struct({ distillationConfig: __S(1833, __c57, 9) }),
        /*@__PURE__*/ S.Struct({ rftConfig: __S(1837, __c57, 13) }),
      ]);
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobName: S.String,
          importedModelName: S.String,
          roleArn: S.String,
          modelDataSource: __S(1184, __c37, 0),
          jobTags: S.optional(__S(801, __c25, 1)),
          importedModelTags: S.optional(__S(801, __c25, 1)),
          clientRequestToken: S.optional(S.String),
          vpcConfig: S.optional(__S(1696, __c53, 0)),
          importedModelKmsKeyId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/model-import-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateModelImportJobRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobName: S.String,
          roleArn: S.String,
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          modelId: S.String,
          inputDataConfig: __S(1921, __c60, 1),
          outputDataConfig: __S(1923, __c60, 3),
          vpcConfig: S.optional(__S(1696, __c53, 0)),
          timeoutDurationInHours: S.optional(S.Number),
          tags: S.optional(__S(801, __c25, 1)),
          modelInvocationType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/model-invocation-job" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateModelInvocationJobRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          s3InputFormat: S.optional(S.String),
          s3Uri: S.String,
          s3BucketOwner: S.optional(S.String),
        }),
      ).annotate({ identifier: "ModelInvocationJobS3InputDataConfig" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ s3InputDataConfig: __S(1920, __c60, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          s3Uri: S.String,
          s3EncryptionKeyId: S.optional(S.String),
          s3BucketOwner: S.optional(S.String),
        }),
      ).annotate({ identifier: "ModelInvocationJobS3OutputDataConfig" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ s3OutputDataConfig: __S(1922, __c60, 2) })]);
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          promptRouterName: S.String,
          models: __S(1985, __c62, 1),
          description: S.optional(SensitiveString),
          routingCriteria: __S(2016, __c63, 0),
          fallbackModel: __S(1984, __c62, 0),
          tags: S.optional(__S(801, __c25, 1)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/prompt-routers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreatePromptRouterRequest" });
    case 1:
      return S.suspend(() => S.Struct({ promptRouterArn: S.optional(S.String) })).annotate({
        identifier: "CreatePromptRouterResponse",
      });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ modelArn: S.optional(S.String) })).annotate({
        identifier: "PromptRouterTargetModel",
      });
    case 1:
      return S.Array(__S(1984, __c62, 0));
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ responseQualityDifference: S.Number })).annotate({
        identifier: "RoutingCriteria",
      });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          modelUnits: S.Number,
          provisionedModelName: S.String,
          modelId: S.String,
          commitmentDuration: S.optional(S.String),
          tags: S.optional(__S(801, __c25, 1)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/provisioned-model-throughput" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateProvisionedModelThroughputRequest" });
    case 1:
      return S.suspend(() => S.Struct({ provisionedModelArn: S.String })).annotate({
        identifier: "CreateProvisionedModelThroughputResponse",
      });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          force: S.optional(S.Boolean).pipe(T.HttpQuery("force")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/automated-reasoning-policies/{policyArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAutomatedReasoningPolicyRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
          lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")).pipe(
            T.HttpQuery("updatedAt"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAutomatedReasoningPolicyBuildWorkflowRequest" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          testCaseId: S.String.pipe(T.HttpLabel("testCaseId")),
          lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")).pipe(
            T.HttpQuery("updatedAt"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/automated-reasoning-policies/{policyArn}/test-cases/{testCaseId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAutomatedReasoningPolicyTestCaseRequest" });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ modelIdentifier: S.String.pipe(T.HttpLabel("modelIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/custom-models/{modelIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCustomModelRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          customModelDeploymentIdentifier: S.String.pipe(
            T.HttpLabel("customModelDeploymentIdentifier"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/model-customization/custom-model-deployments/{customModelDeploymentIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCustomModelDeploymentRequest" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ configId: S.String.pipe(T.HttpLabel("configId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/enforcedGuardrailsConfiguration/{configId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEnforcedGuardrailConfigurationRequest" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ modelId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/delete-foundation-model-agreement" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFoundationModelAgreementRequest" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          guardrailIdentifier: S.String.pipe(T.HttpLabel("guardrailIdentifier")),
          guardrailVersion: S.optional(S.String).pipe(T.HttpQuery("guardrailVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/guardrails/{guardrailIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteGuardrailRequest" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ modelIdentifier: S.String.pipe(T.HttpLabel("modelIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/imported-models/{modelIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteImportedModelRequest" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          inferenceProfileIdentifier: S.String.pipe(T.HttpLabel("inferenceProfileIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/inference-profiles/{inferenceProfileIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteInferenceProfileRequest" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ endpointArn: S.String.pipe(T.HttpLabel("endpointArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/marketplace-model/endpoints/{endpointArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMarketplaceModelEndpointRequest" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/logging/modelinvocations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteModelInvocationLoggingConfigurationRequest" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ promptRouterArn: S.String.pipe(T.HttpLabel("promptRouterArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prompt-routers/{promptRouterArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePromptRouterRequest" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ provisionedModelId: S.String.pipe(T.HttpLabel("provisionedModelId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/provisioned-model-throughput/{provisionedModelId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProvisionedModelThroughputRequest" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/resource-policy/{resourceArn}" }),
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
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ endpointArn: S.String.pipe(T.HttpLabel("endpointArn")) }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/marketplace-model/endpoints/{endpointArn}/registration",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeregisterMarketplaceModelEndpointRequest" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyArn: S.String.pipe(T.HttpLabel("policyArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/automated-reasoning-policies/{policyArn}/export" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ExportAutomatedReasoningPolicyVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyDefinition: __S(1029, __c32, 5)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "AutomatedReasoningPolicyDefinition" }),
        }),
      ).annotate({ identifier: "ExportAutomatedReasoningPolicyVersionResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(T.Http({ method: "GET", uri: "/data-retention" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAccountDataRetentionRequest" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          mode: S.String,
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetAccountDataRetentionResponse" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/advanced-prompt-optimization-jobs/{jobIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAdvancedPromptOptimizationJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.String,
          jobName: S.String,
          jobDescription: S.optional(S.String),
          jobStatus: S.String,
          inputConfig: __S(832, __c26, 0),
          outputConfig: __S(832, __c26, 0),
          encryptionKeyArn: S.optional(S.String),
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          failureMessage: S.optional(S.String),
          modelConfigurations: __S(930, __c29, 2),
        }),
      ).annotate({ identifier: "GetAdvancedPromptOptimizationJobResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ policyArn: S.String.pipe(T.HttpLabel("policyArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/automated-reasoning-policies/{policyArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAutomatedReasoningPolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String,
          name: SensitiveString,
          version: S.String,
          policyId: S.String,
          description: S.optional(SensitiveString),
          definitionHash: S.String,
          kmsKeyArn: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetAutomatedReasoningPolicyResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/annotations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAutomatedReasoningPolicyAnnotationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String,
          name: SensitiveString,
          buildWorkflowId: S.String,
          annotations: __S(2784, __c87, 0),
          annotationSetHash: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetAutomatedReasoningPolicyAnnotationsResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(2831, __c88, 15));
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          description: SensitiveString,
          values: __S(993, __c31, 1),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyAddTypeAnnotation" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          value: S.String,
          newValue: S.optional(S.String),
          description: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyUpdateTypeValue" });
    case 2:
      return S.suspend(() => S.Struct({ value: S.String })).annotate({
        identifier: "AutomatedReasoningPolicyDeleteTypeValue",
      });
    case 3:
      return S.Union([
        /*@__PURE__*/ S.Struct({ addTypeValue: __S(992, __c31, 0) }),
        /*@__PURE__*/ S.Struct({ updateTypeValue: __S(2817, __c88, 1) }),
        /*@__PURE__*/ S.Struct({ deleteTypeValue: __S(2818, __c88, 2) }),
      ]);
    case 4:
      return S.Array(__S(2819, __c88, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          newName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          values: __S(2820, __c88, 4),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyUpdateTypeAnnotation" });
    case 6:
      return S.suspend(() => S.Struct({ name: SensitiveString })).annotate({
        identifier: "AutomatedReasoningPolicyDeleteTypeAnnotation",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          newName: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyUpdateVariableAnnotation" });
    case 8:
      return S.suspend(() => S.Struct({ expression: SensitiveString })).annotate({
        identifier: "AutomatedReasoningPolicyAddRuleAnnotation",
      });
    case 9:
      return S.suspend(() => S.Struct({ ruleId: S.String, expression: SensitiveString })).annotate({
        identifier: "AutomatedReasoningPolicyUpdateRuleAnnotation",
      });
    case 10:
      return S.suspend(() => S.Struct({ ruleId: S.String })).annotate({
        identifier: "AutomatedReasoningPolicyDeleteRuleAnnotation",
      });
    case 11:
      return S.suspend(() => S.Struct({ naturalLanguage: SensitiveString })).annotate({
        identifier: "AutomatedReasoningPolicyAddRuleFromNaturalLanguageAnnotation",
      });
    case 12:
      return S.suspend(() =>
        S.Struct({ ruleIds: S.optional(__S(32, __c1, 0)), feedback: SensitiveString }),
      ).annotate({ identifier: "AutomatedReasoningPolicyUpdateFromRuleFeedbackAnnotation" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          ruleIds: S.optional(__S(32, __c1, 0)),
          scenarioExpression: SensitiveString,
          feedback: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyUpdateFromScenarioFeedbackAnnotation" });
    case 14:
      return S.suspend(() => S.Struct({ content: SensitiveString })).annotate({
        identifier: "AutomatedReasoningPolicyIngestContentAnnotation",
      });
    case 15:
      return S.Union([
        /*@__PURE__*/ S.Struct({ addType: __S(2816, __c88, 0) }),
        /*@__PURE__*/ S.Struct({ updateType: __S(2821, __c88, 5) }),
        /*@__PURE__*/ S.Struct({ deleteType: __S(2822, __c88, 6) }),
        /*@__PURE__*/ S.Struct({ addVariable: __S(994, __c31, 2) }),
        /*@__PURE__*/ S.Struct({ updateVariable: __S(2823, __c88, 7) }),
        /*@__PURE__*/ S.Struct({ deleteVariable: __S(2822, __c88, 6) }),
        /*@__PURE__*/ S.Struct({ addRule: __S(2824, __c88, 8) }),
        /*@__PURE__*/ S.Struct({ updateRule: __S(2825, __c88, 9) }),
        /*@__PURE__*/ S.Struct({ deleteRule: __S(2826, __c88, 10) }),
        /*@__PURE__*/ S.Struct({ addRuleFromNaturalLanguage: __S(2827, __c88, 11) }),
        /*@__PURE__*/ S.Struct({ updateFromRulesFeedback: __S(2828, __c88, 12) }),
        /*@__PURE__*/ S.Struct({ updateFromScenarioFeedback: __S(2829, __c88, 13) }),
        /*@__PURE__*/ S.Struct({ ingestContent: __S(2830, __c88, 14) }),
      ]);
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAutomatedReasoningPolicyBuildWorkflowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String,
          buildWorkflowId: S.String,
          status: S.String,
          buildWorkflowType: S.String,
          documentName: S.optional(SensitiveString),
          documentContentType: S.optional(S.String),
          documentDescription: S.optional(SensitiveString),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "GetAutomatedReasoningPolicyBuildWorkflowResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
          assetType: S.String.pipe(T.HttpQuery("assetType")),
          assetId: S.optional(S.String).pipe(T.HttpQuery("assetId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/result-assets",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAutomatedReasoningPolicyBuildWorkflowResultAssetsRequest" });
    case 1:
      return S.suspend(() => S.Struct({ typeName: SensitiveString, valueName: S.String })).annotate(
        { identifier: "AutomatedReasoningPolicyDefinitionTypeValuePair" },
      );
    case 2:
      return S.Array(__S(2881, __c90, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ variables: __S(416, __c13, 0), rules: __S(32, __c1, 0) }),
      ).annotate({ identifier: "AutomatedReasoningPolicyDisjointRuleSet" });
    case 4:
      return S.Array(__S(2883, __c90, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          typeCount: S.Number,
          variableCount: S.Number,
          ruleCount: S.Number,
          unusedTypes: __S(416, __c13, 0),
          unusedTypeValues: __S(2882, __c90, 2),
          unusedVariables: __S(416, __c13, 0),
          conflictingRules: __S(32, __c1, 0),
          disjointRuleSets: __S(2884, __c90, 4),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyDefinitionQualityReport" });
    case 6:
      return S.suspend(() => S.Struct({ type: __S(1024, __c32, 0) })).annotate({
        identifier: "AutomatedReasoningPolicyAddTypeMutation",
      });
    case 7:
      return S.suspend(() => S.Struct({ variable: __S(994, __c31, 2) })).annotate({
        identifier: "AutomatedReasoningPolicyAddVariableMutation",
      });
    case 8:
      return S.suspend(() => S.Struct({ rule: __S(1026, __c32, 2) })).annotate({
        identifier: "AutomatedReasoningPolicyAddRuleMutation",
      });
    case 9:
      return S.suspend(() => S.Struct({ id: S.String })).annotate({
        identifier: "AutomatedReasoningPolicyDeleteRuleMutation",
      });
    case 10:
      return S.Union([
        /*@__PURE__*/ S.Struct({ addType: __S(2886, __c90, 6) }),
        /*@__PURE__*/ S.Struct({ updateType: __S(2886, __c90, 6) }),
        /*@__PURE__*/ S.Struct({ deleteType: __S(2822, __c88, 6) }),
        /*@__PURE__*/ S.Struct({ addVariable: __S(2887, __c90, 7) }),
        /*@__PURE__*/ S.Struct({ updateVariable: __S(2887, __c90, 7) }),
        /*@__PURE__*/ S.Struct({ deleteVariable: __S(2822, __c88, 6) }),
        /*@__PURE__*/ S.Struct({ addRule: __S(2888, __c90, 8) }),
        /*@__PURE__*/ S.Struct({ updateRule: __S(2888, __c90, 8) }),
        /*@__PURE__*/ S.Struct({ deleteRule: __S(2889, __c90, 9) }),
      ]);
    case 11:
      return S.Union([
        /*@__PURE__*/ S.Struct({ planning: __S(736, __c23, 0) }),
        /*@__PURE__*/ S.Struct({ mutation: __S(2890, __c90, 10) }),
      ]);
    case 12:
      return S.Union([
        /*@__PURE__*/ S.Struct({ policyDefinitionVariable: __S(994, __c31, 2) }),
        /*@__PURE__*/ S.Struct({ policyDefinitionType: __S(1024, __c32, 0) }),
        /*@__PURE__*/ S.Struct({ policyDefinitionRule: __S(1026, __c32, 2) }),
      ]);
    case 13:
      return S.suspend(() => S.Struct({ message: S.String, messageType: S.String })).annotate({
        identifier: "AutomatedReasoningPolicyBuildStepMessage",
      });
    case 14:
      return S.Array(__S(2893, __c90, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          context: __S(2891, __c90, 11),
          priorElement: S.optional(__S(2892, __c90, 12)),
          messages: __S(2894, __c90, 14),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyBuildStep" });
    case 16:
      return S.Array(__S(2895, __c90, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          annotation: __S(2831, __c88, 15),
          status: S.String,
          buildSteps: __S(2896, __c90, 16),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyBuildLogEntry" });
    case 18:
      return S.Array(__S(2897, __c90, 17));
    case 19:
      return S.suspend(() => S.Struct({ entries: __S(2898, __c90, 18) })).annotate({
        identifier: "AutomatedReasoningPolicyBuildLog",
      });
    case 20:
      return S.suspend(() =>
        S.Struct({
          queryContent: SensitiveString,
          guardContent: SensitiveString,
          expectedAggregatedFindingsResult: S.String,
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyGeneratedTestCase" });
    case 21:
      return S.Array(__S(2900, __c90, 20));
    case 22:
      return S.suspend(() => S.Struct({ generatedTestCases: __S(2901, __c90, 21) })).annotate({
        identifier: "AutomatedReasoningPolicyGeneratedTestCases",
      });
    case 23:
      return S.Array(__S(2944, __c92, 0));
    case 24:
      return S.suspend(() => S.Struct({ policyScenarios: __S(2903, __c90, 23) })).annotate({
        identifier: "AutomatedReasoningPolicyScenarios",
      });
    case 25:
      return S.suspend(() =>
        S.Struct({
          assetType: S.String,
          assetName: S.optional(SensitiveString),
          assetId: S.optional(S.String),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyBuildResultAssetManifestEntry" });
    case 26:
      return S.Array(__S(2905, __c90, 25));
    case 27:
      return S.suspend(() => S.Struct({ entries: __S(2906, __c90, 26) })).annotate({
        identifier: "AutomatedReasoningPolicyBuildResultAssetManifest",
      });
    case 28:
      return S.suspend(() =>
        S.Struct({
          document: SensitiveBlob,
          documentContentType: S.String,
          documentName: SensitiveString,
          documentDescription: S.optional(SensitiveString),
          documentHash: S.String,
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicySourceDocument" });
    case 29:
      return S.suspend(() => S.Struct({ documentId: S.String, statementId: S.String })).annotate({
        identifier: "AutomatedReasoningPolicyStatementReference",
      });
    case 30:
      return S.Array(__S(2909, __c90, 29));
    case 31:
      return S.suspend(() =>
        S.Struct({
          rule: S.String,
          groundingStatements: S.optional(__S(2910, __c90, 30)),
          groundingJustifications: S.optional(__S(416, __c13, 0)),
          accuracyScore: S.optional(S.Number),
          accuracyJustification: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyRuleReport" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ __S(2911, __c90, 31).pipe(S.optional));
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyVariable: SensitiveString,
          groundingStatements: S.optional(__S(2910, __c90, 30)),
          groundingJustifications: S.optional(__S(416, __c13, 0)),
          accuracyScore: S.optional(S.Number),
          accuracyJustification: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyVariableReport" });
    case 2:
      return S.Record(S.String, /*@__PURE__*/ __S(2913, __c91, 1).pipe(S.optional));
    case 3:
      return S.Array(S.Number);
    case 4:
      return S.suspend(() => S.Struct({ lines: __S(2915, __c91, 3) })).annotate({
        identifier: "AutomatedReasoningPolicyStatementLocation",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({ id: S.String, text: SensitiveString, location: __S(2916, __c91, 4) }),
      ).annotate({ identifier: "AutomatedReasoningPolicyAtomicStatement" });
    case 6:
      return S.Array(__S(2917, __c91, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ lineNumber: S.optional(S.Number), lineText: S.optional(SensitiveString) }),
      ).annotate({ identifier: "AutomatedReasoningPolicyAnnotatedLine" });
    case 8:
      return S.Union([/*@__PURE__*/ S.Struct({ line: __S(2919, __c91, 7) })]);
    case 9:
      return S.Array(__S(2920, __c91, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ pageNumber: S.optional(S.Number), content: __S(2921, __c91, 9) }),
      ).annotate({ identifier: "AutomatedReasoningPolicyAnnotatedChunk" });
    case 11:
      return S.Array(__S(2922, __c91, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          documentName: SensitiveString,
          documentHash: S.String,
          documentId: S.String,
          atomicStatements: __S(2918, __c91, 6),
          documentContent: __S(2923, __c91, 11),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyReportSourceDocument" });
    case 13:
      return S.Array(__S(2924, __c91, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          coverageScore: S.Number,
          accuracyScore: S.Number,
          ruleReports: __S(2912, __c91, 0),
          variableReports: __S(2914, __c91, 2),
          documentSources: __S(2925, __c91, 13),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyFidelityReport" });
    case 15:
      return S.Union([
        /*@__PURE__*/ S.Struct({ policyDefinition: __S(1029, __c32, 5) }),
        /*@__PURE__*/ S.Struct({ qualityReport: __S(2885, __c90, 5) }),
        /*@__PURE__*/ S.Struct({ buildLog: __S(2899, __c90, 19) }),
        /*@__PURE__*/ S.Struct({ generatedTestCases: __S(2902, __c90, 22) }),
        /*@__PURE__*/ S.Struct({ policyScenarios: __S(2904, __c90, 24) }),
        /*@__PURE__*/ S.Struct({ assetManifest: __S(2907, __c90, 27) }),
        /*@__PURE__*/ S.Struct({ document: __S(2908, __c90, 28) }),
        /*@__PURE__*/ S.Struct({ fidelityReport: __S(2926, __c91, 14) }),
      ]);
    case 16:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String,
          buildWorkflowId: S.String,
          buildWorkflowAssets: S.optional(__S(2927, __c91, 15)),
        }),
      ).annotate({ identifier: "GetAutomatedReasoningPolicyBuildWorkflowResultAssetsResponse" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          expression: SensitiveString,
          alternateExpression: SensitiveString,
          expectedResult: S.String,
          ruleIds: __S(32, __c1, 0),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyScenario" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/scenarios",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAutomatedReasoningPolicyNextScenarioRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ policyArn: S.String, scenario: S.optional(__S(2944, __c92, 0)) }),
      ).annotate({ identifier: "GetAutomatedReasoningPolicyNextScenarioResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          testCaseId: S.String.pipe(T.HttpLabel("testCaseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/automated-reasoning-policies/{policyArn}/test-cases/{testCaseId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAutomatedReasoningPolicyTestCaseRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ policyArn: S.String, testCase: __S(3040, __c95, 0) }),
      ).annotate({ identifier: "GetAutomatedReasoningPolicyTestCaseResponse" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          testCaseId: S.String,
          guardContent: SensitiveString,
          queryContent: S.optional(SensitiveString),
          expectedAggregatedFindingsResult: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          confidenceThreshold: S.optional(S.Number),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyTestCase" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
          testCaseId: S.String.pipe(T.HttpLabel("testCaseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/test-cases/{testCaseId}/test-results",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAutomatedReasoningPolicyTestResultRequest" });
    case 1:
      return S.suspend(() => S.Struct({ testResult: __S(3123, __c97, 19) })).annotate({
        identifier: "GetAutomatedReasoningPolicyTestResultResponse",
      });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ logic: SensitiveString, naturalLanguage: S.optional(SensitiveString) }),
      ).annotate({ identifier: "AutomatedReasoningLogicStatement" });
    case 1:
      return S.Array(__S(3104, __c97, 0));
    case 2:
      return S.suspend(() => S.Struct({ text: S.optional(SensitiveString) })).annotate({
        identifier: "AutomatedReasoningCheckInputTextReference",
      });
    case 3:
      return S.Array(__S(3106, __c97, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          premises: S.optional(__S(3105, __c97, 1)),
          claims: __S(3105, __c97, 1),
          untranslatedPremises: S.optional(__S(3107, __c97, 3)),
          untranslatedClaims: S.optional(__S(3107, __c97, 3)),
          confidence: S.Number,
        }),
      ).annotate({ identifier: "AutomatedReasoningCheckTranslation" });
    case 5:
      return S.suspend(() => S.Struct({ statements: S.optional(__S(3105, __c97, 1)) })).annotate({
        identifier: "AutomatedReasoningCheckScenario",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({ id: S.optional(S.String), policyVersionArn: S.optional(S.String) }),
      ).annotate({ identifier: "AutomatedReasoningCheckRule" });
    case 7:
      return S.Array(__S(3110, __c97, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          type: S.optional(S.String),
          premises: S.optional(__S(3105, __c97, 1)),
          claims: S.optional(__S(3105, __c97, 1)),
        }),
      ).annotate({ identifier: "AutomatedReasoningCheckLogicWarning" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          translation: S.optional(__S(3108, __c97, 4)),
          claimsTrueScenario: S.optional(__S(3109, __c97, 5)),
          supportingRules: S.optional(__S(3111, __c97, 7)),
          logicWarning: S.optional(__S(3112, __c97, 8)),
        }),
      ).annotate({ identifier: "AutomatedReasoningCheckValidFinding" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          translation: S.optional(__S(3108, __c97, 4)),
          contradictingRules: S.optional(__S(3111, __c97, 7)),
          logicWarning: S.optional(__S(3112, __c97, 8)),
        }),
      ).annotate({ identifier: "AutomatedReasoningCheckInvalidFinding" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          translation: S.optional(__S(3108, __c97, 4)),
          claimsTrueScenario: S.optional(__S(3109, __c97, 5)),
          claimsFalseScenario: S.optional(__S(3109, __c97, 5)),
          logicWarning: S.optional(__S(3112, __c97, 8)),
        }),
      ).annotate({ identifier: "AutomatedReasoningCheckSatisfiableFinding" });
    case 12:
      return S.Array(__S(3108, __c97, 4));
    case 13:
      return S.suspend(() => S.Struct({ translations: S.optional(__S(3116, __c97, 12)) })).annotate(
        { identifier: "AutomatedReasoningCheckTranslationOption" },
      );
    case 14:
      return S.Array(__S(3117, __c97, 13));
    case 15:
      return S.Array(__S(3109, __c97, 5));
    case 16:
      return S.suspend(() =>
        S.Struct({
          options: S.optional(__S(3118, __c97, 14)),
          differenceScenarios: S.optional(__S(3119, __c97, 15)),
        }),
      ).annotate({ identifier: "AutomatedReasoningCheckTranslationAmbiguousFinding" });
    case 17:
      return S.Union([
        /*@__PURE__*/ S.Struct({ valid: __S(3113, __c97, 9) }),
        /*@__PURE__*/ S.Struct({ invalid: __S(3114, __c97, 10) }),
        /*@__PURE__*/ S.Struct({ satisfiable: __S(3115, __c97, 11) }),
        /*@__PURE__*/ S.Struct({ impossible: __S(3114, __c97, 10) }),
        /*@__PURE__*/ S.Struct({ translationAmbiguous: __S(3120, __c97, 16) }),
        /*@__PURE__*/ S.Struct({ tooComplex: __S(736, __c23, 0) }),
        /*@__PURE__*/ S.Struct({ noTranslations: __S(736, __c23, 0) }),
      ]);
    case 18:
      return S.Array(__S(3121, __c97, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          testCase: __S(3040, __c95, 0),
          policyArn: S.String,
          testRunStatus: S.String,
          testFindings: S.optional(__S(3122, __c97, 18)),
          testRunResult: S.optional(S.String),
          aggregatedTestFindingsResult: S.optional(S.String),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyTestResult" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ modelIdentifier: S.String.pipe(T.HttpLabel("modelIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/custom-models/{modelIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCustomModelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          modelArn: S.String,
          modelName: S.String,
          jobName: S.optional(S.String),
          jobArn: S.optional(S.String),
          baseModelArn: S.optional(S.String),
          customizationType: S.optional(S.String),
          modelKmsKeyArn: S.optional(S.String),
          hyperParameters: S.optional(__S(1824, __c57, 0)),
          trainingDataConfig: S.optional(__S(1829, __c57, 5)),
          validationDataConfig: S.optional(__S(1831, __c57, 7)),
          outputDataConfig: S.optional(__S(832, __c26, 0)),
          trainingMetrics: S.optional(__S(3168, __c99, 0)),
          validationMetrics: S.optional(__S(3170, __c99, 2)),
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          customizationConfig: S.optional(__S(1838, __c57, 14)),
          modelStatus: S.optional(S.String),
          failureMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetCustomModelResponse" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ trainingLoss: S.optional(S.Number) })).annotate({
        identifier: "TrainingMetrics",
      });
    case 1:
      return S.suspend(() => S.Struct({ validationLoss: S.optional(S.Number) })).annotate({
        identifier: "ValidatorMetric",
      });
    case 2:
      return S.Array(__S(3169, __c99, 1));
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          customModelDeploymentIdentifier: S.String.pipe(
            T.HttpLabel("customModelDeploymentIdentifier"),
          ),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/model-customization/custom-model-deployments/{customModelDeploymentIdentifier}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCustomModelDeploymentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ modelArn: S.String, updateStatus: S.String })).annotate({
        identifier: "CustomModelDeploymentUpdateDetails",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          customModelDeploymentArn: S.String,
          modelDeploymentName: S.String,
          modelArn: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
          description: S.optional(S.String),
          updateDetails: S.optional(__S(3201, __c100, 1)),
          failureMessage: S.optional(S.String),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetCustomModelDeploymentResponse" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobIdentifier: SensitiveString.pipe(T.HttpLabel("jobIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/evaluation-jobs/{jobIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEvaluationJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobName: S.String,
          status: S.String,
          jobArn: S.String,
          jobDescription: S.optional(SensitiveString),
          roleArn: S.String,
          customerEncryptionKeyId: S.optional(S.String),
          jobType: S.String,
          applicationType: S.optional(S.String),
          evaluationConfig: __S(1363, __c42, 19),
          inferenceConfig: __S(1404, __c43, 28),
          outputDataConfig: __S(832, __c26, 0),
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          failureMessages: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "GetEvaluationJobResponse" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ modelIdentifier: S.String.pipe(T.HttpLabel("modelIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/foundation-models/{modelIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFoundationModelRequest" });
    case 1:
      return S.suspend(() => S.Struct({ modelDetails: S.optional(__S(3297, __c103, 1)) })).annotate(
        { identifier: "GetFoundationModelResponse" },
      );
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          startOfLifeTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endOfLifeTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          legacyTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          publicExtendedAccessTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "FoundationModelLifecycle" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          modelArn: S.String,
          modelId: S.String,
          modelName: S.optional(S.String),
          providerName: S.optional(S.String),
          inputModalities: S.optional(__S(1504, __c47, 0)),
          outputModalities: S.optional(__S(1504, __c47, 0)),
          responseStreamingSupported: S.optional(S.Boolean),
          customizationsSupported: S.optional(__S(1504, __c47, 0)),
          inferenceTypesSupported: S.optional(__S(1504, __c47, 0)),
          modelLifecycle: S.optional(__S(3296, __c103, 0)),
        }),
      ).annotate({ identifier: "FoundationModelDetails" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ modelId: S.String.pipe(T.HttpLabel("modelId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/foundation-model-availability/{modelId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFoundationModelAvailabilityRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ status: S.String, errorMessage: S.optional(S.String) }),
      ).annotate({ identifier: "AgreementAvailability" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String,
          agreementAvailability: __S(3329, __c104, 1),
          authorizationStatus: S.String,
          entitlementAvailability: S.String,
          regionAvailability: S.String,
        }),
      ).annotate({ identifier: "GetFoundationModelAvailabilityResponse" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          guardrailIdentifier: S.String.pipe(T.HttpLabel("guardrailIdentifier")),
          guardrailVersion: S.optional(S.String).pipe(T.HttpQuery("guardrailVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/guardrails/{guardrailIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGuardrailRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          definition: SensitiveString,
          examples: S.optional(__S(416, __c13, 0)),
          type: S.optional(S.String),
          inputAction: S.optional(S.String),
          outputAction: S.optional(S.String),
          inputEnabled: S.optional(S.Boolean),
          outputEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GuardrailTopic" });
    case 2:
      return S.Array(__S(3361, __c105, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ topics: __S(3362, __c105, 2), tier: S.optional(__S(1536, __c48, 0)) }),
      ).annotate({ identifier: "GuardrailTopicPolicy" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          filters: S.optional(__S(1538, __c48, 2)),
          tier: S.optional(__S(1536, __c48, 0)),
        }),
      ).annotate({ identifier: "GuardrailContentPolicy" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          words: S.optional(__S(1540, __c48, 4)),
          managedWordLists: S.optional(__S(1542, __c48, 6)),
        }),
      ).annotate({ identifier: "GuardrailWordPolicy" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          piiEntities: S.optional(__S(1544, __c48, 8)),
          regexes: S.optional(__S(1546, __c48, 10)),
        }),
      ).annotate({ identifier: "GuardrailSensitiveInformationPolicy" });
    case 7:
      return S.suspend(() => S.Struct({ filters: __S(1548, __c48, 12) })).annotate({
        identifier: "GuardrailContextualGroundingPolicy",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          description: S.optional(SensitiveString),
          guardrailId: S.String,
          guardrailArn: S.String,
          version: S.String,
          status: S.String,
          topicPolicy: S.optional(__S(3363, __c105, 3)),
          contentPolicy: S.optional(__S(3364, __c105, 4)),
          wordPolicy: S.optional(__S(3365, __c105, 5)),
          sensitiveInformationPolicy: S.optional(__S(3366, __c105, 6)),
          contextualGroundingPolicy: S.optional(__S(3367, __c105, 7)),
          automatedReasoningPolicy: S.optional(__S(1549, __c48, 13)),
          crossRegionDetails: S.optional(__S(3392, __c106, 0)),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          statusReasons: S.optional(__S(416, __c13, 0)),
          failureRecommendations: S.optional(__S(416, __c13, 0)),
          blockedInputMessaging: SensitiveString,
          blockedOutputsMessaging: SensitiveString,
          kmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetGuardrailResponse" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          guardrailProfileId: S.optional(S.String),
          guardrailProfileArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GuardrailCrossRegionDetails" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ modelIdentifier: S.String.pipe(T.HttpLabel("modelIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/imported-models/{modelIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetImportedModelRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          customModelUnitsPerModelCopy: S.optional(S.Number),
          customModelUnitsVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomModelUnits" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          modelArn: S.optional(S.String),
          modelName: S.optional(S.String),
          jobName: S.optional(S.String),
          jobArn: S.optional(S.String),
          modelDataSource: S.optional(__S(1184, __c37, 0)),
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          modelArchitecture: S.optional(S.String),
          modelKmsKeyArn: S.optional(S.String),
          instructSupported: S.optional(S.Boolean),
          customModelUnits: S.optional(__S(3425, __c107, 1)),
        }),
      ).annotate({ identifier: "GetImportedModelResponse" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          inferenceProfileIdentifier: S.String.pipe(T.HttpLabel("inferenceProfileIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/inference-profiles/{inferenceProfileIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetInferenceProfileRequest" });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          inferenceProfileName: S.String,
          description: S.optional(SensitiveString),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          inferenceProfileArn: S.String,
          models: __S(1985, __c62, 1),
          inferenceProfileId: S.String,
          status: S.String,
          type: S.String,
        }),
      ).annotate({ identifier: "GetInferenceProfileResponse" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ endpointArn: S.String.pipe(T.HttpLabel("endpointArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/marketplace-model/endpoints/{endpointArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMarketplaceModelEndpointRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ marketplaceModelEndpoint: S.optional(__S(1730, __c54, 2)) }),
      ).annotate({ identifier: "GetMarketplaceModelEndpointResponse" });
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobArn: S.String.pipe(T.HttpLabel("jobArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/model-copy-jobs/{jobArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetModelCopyJobRequest" });
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.String,
          status: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          targetModelArn: S.String,
          targetModelName: S.optional(S.String),
          sourceAccountId: S.String,
          sourceModelArn: S.String,
          targetModelKmsKeyArn: S.optional(S.String),
          targetModelTags: S.optional(__S(801, __c25, 1)),
          failureMessage: S.optional(S.String),
          sourceModelName: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetModelCopyJobResponse" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/model-customization-jobs/{jobIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetModelCustomizationJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.String,
          jobName: S.String,
          outputModelName: S.String,
          outputModelArn: S.optional(S.String),
          clientRequestToken: S.optional(S.String),
          roleArn: S.String,
          status: S.optional(S.String),
          statusDetails: S.optional(__S(3649, __c114, 1)),
          failureMessage: S.optional(S.String),
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          baseModelArn: S.String,
          hyperParameters: S.optional(__S(1824, __c57, 0)),
          trainingDataConfig: __S(1829, __c57, 5),
          validationDataConfig: __S(1831, __c57, 7),
          outputDataConfig: __S(832, __c26, 0),
          customizationType: S.optional(S.String),
          outputModelKmsKeyArn: S.optional(S.String),
          trainingMetrics: S.optional(__S(3168, __c99, 0)),
          validationMetrics: S.optional(__S(3170, __c99, 2)),
          vpcConfig: S.optional(__S(1696, __c53, 0)),
          customizationConfig: S.optional(__S(1838, __c57, 14)),
        }),
      ).annotate({ identifier: "GetModelCustomizationJobResponse" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          status: S.optional(S.String),
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "ValidationDetails" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          validationDetails: S.optional(__S(3648, __c114, 0)),
          dataProcessingDetails: S.optional(__S(3648, __c114, 0)),
          trainingDetails: S.optional(__S(3648, __c114, 0)),
        }),
      ).annotate({ identifier: "StatusDetails" });
  }
}
function __c115(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/model-import-jobs/{jobIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetModelImportJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.optional(S.String),
          jobName: S.optional(S.String),
          importedModelName: S.optional(S.String),
          importedModelArn: S.optional(S.String),
          roleArn: S.optional(S.String),
          modelDataSource: S.optional(__S(1184, __c37, 0)),
          status: S.optional(S.String),
          failureMessage: S.optional(S.String),
          creationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          vpcConfig: S.optional(__S(1696, __c53, 0)),
          importedModelKmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetModelImportJobResponse" });
  }
}
function __c116(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ jobIdentifier: S.String.pipe(T.HttpLabel("jobIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/model-invocation-job/{jobIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetModelInvocationJobRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.String,
          jobName: S.optional(S.String),
          modelId: S.String,
          clientRequestToken: S.optional(S.String),
          roleArn: S.String,
          status: S.optional(S.String),
          message: S.optional(SensitiveString),
          submitTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          inputDataConfig: __S(1921, __c60, 1),
          outputDataConfig: __S(1923, __c60, 3),
          vpcConfig: S.optional(__S(1696, __c53, 0)),
          timeoutDurationInHours: S.optional(S.Number),
          jobExpirationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          modelInvocationType: S.optional(S.String),
          totalRecordCount: S.optional(S.Number),
          processedRecordCount: S.optional(S.Number),
          successRecordCount: S.optional(S.Number),
          errorRecordCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "GetModelInvocationJobResponse" });
  }
}
function __c117(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/logging/modelinvocations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetModelInvocationLoggingConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ loggingConfig: S.optional(__S(3778, __c118, 2)) }),
      ).annotate({ identifier: "GetModelInvocationLoggingConfigurationResponse" });
  }
}
function __c118(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bucketName: S.String, keyPrefix: S.optional(S.String) }),
      ).annotate({ identifier: "S3Config" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.String,
          roleArn: S.String,
          largeDataDeliveryS3Config: S.optional(__S(3776, __c118, 0)),
        }),
      ).annotate({ identifier: "CloudWatchConfig" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          cloudWatchConfig: S.optional(__S(3777, __c118, 1)),
          s3Config: S.optional(__S(3776, __c118, 0)),
          textDataDeliveryEnabled: S.optional(S.Boolean),
          imageDataDeliveryEnabled: S.optional(S.Boolean),
          embeddingDataDeliveryEnabled: S.optional(S.Boolean),
          videoDataDeliveryEnabled: S.optional(S.Boolean),
          audioDataDeliveryEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "LoggingConfig" });
  }
}
function __c119(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ promptRouterArn: S.String.pipe(T.HttpLabel("promptRouterArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prompt-routers/{promptRouterArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPromptRouterRequest" });
  }
}
function __c120(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          promptRouterName: S.String,
          routingCriteria: __S(2016, __c63, 0),
          description: S.optional(SensitiveString),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          promptRouterArn: S.String,
          models: __S(1985, __c62, 1),
          fallbackModel: __S(1984, __c62, 0),
          status: S.String,
          type: S.String,
        }),
      ).annotate({ identifier: "GetPromptRouterResponse" });
  }
}
function __c121(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ provisionedModelId: S.String.pipe(T.HttpLabel("provisionedModelId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/provisioned-model-throughput/{provisionedModelId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProvisionedModelThroughputRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          modelUnits: S.Number,
          desiredModelUnits: S.Number,
          provisionedModelName: S.String,
          provisionedModelArn: S.String,
          modelArn: S.String,
          desiredModelArn: S.String,
          foundationModelArn: S.String,
          status: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          failureMessage: S.optional(S.String),
          commitmentDuration: S.optional(S.String),
          commitmentExpirationTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
        }),
      ).annotate({ identifier: "GetProvisionedModelThroughputResponse" });
  }
}
function __c122(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/resource-policy/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ resourcePolicy: S.optional(S.String) })).annotate({
        identifier: "GetResourcePolicyResponse",
      });
  }
}
function __c123(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/use-case-for-model-access" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetUseCaseForModelAccessRequest" });
    case 1:
      return S.suspend(() => S.Struct({ formData: T.Blob })).annotate({
        identifier: "GetUseCaseForModelAccessResponse",
      });
  }
}
function __c124(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/advanced-prompt-optimization-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAdvancedPromptOptimizationJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.String,
          jobName: S.String,
          jobStatus: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "AdvancedPromptOptimizationJobSummary" });
    case 2:
      return S.Array(__S(3969, __c124, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          jobSummaries: S.optional(__S(3970, __c124, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAdvancedPromptOptimizationJobsResponse" });
  }
}
function __c125(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.optional(S.String).pipe(T.HttpQuery("policyArn")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/automated-reasoning-policies" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAutomatedReasoningPoliciesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          version: S.String,
          policyId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicySummary" });
    case 2:
      return S.Array(__S(4001, __c125, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          automatedReasoningPolicySummaries: __S(4002, __c125, 2),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAutomatedReasoningPoliciesResponse" });
  }
}
function __c126(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/automated-reasoning-policies/{policyArn}/build-workflows",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAutomatedReasoningPolicyBuildWorkflowsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String,
          buildWorkflowId: S.String,
          status: S.String,
          buildWorkflowType: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "AutomatedReasoningPolicyBuildWorkflowSummary" });
    case 2:
      return S.Array(__S(4033, __c126, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          automatedReasoningPolicyBuildWorkflowSummaries: __S(4034, __c126, 2),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAutomatedReasoningPolicyBuildWorkflowsResponse" });
  }
}
function __c127(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/automated-reasoning-policies/{policyArn}/test-cases" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAutomatedReasoningPolicyTestCasesRequest" });
    case 1:
      return S.Array(__S(3040, __c95, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ testCases: __S(4065, __c127, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAutomatedReasoningPolicyTestCasesResponse" });
  }
}
function __c128(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          policyArn: S.String.pipe(T.HttpLabel("policyArn")),
          buildWorkflowId: S.String.pipe(T.HttpLabel("buildWorkflowId")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/test-results",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAutomatedReasoningPolicyTestResultsRequest" });
    case 1:
      return S.Array(__S(3123, __c97, 19));
    case 2:
      return S.suspend(() =>
        S.Struct({ testResults: __S(4097, __c128, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAutomatedReasoningPolicyTestResultsResponse" });
  }
}
function __c129(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          createdBefore: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("createdBefore"),
          ),
          createdAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("createdAfter"),
          ),
          nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
          statusEquals: S.optional(S.String).pipe(T.HttpQuery("statusEquals")),
          modelArnEquals: S.optional(S.String).pipe(T.HttpQuery("modelArnEquals")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/model-customization/custom-model-deployments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCustomModelDeploymentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          customModelDeploymentArn: S.String,
          customModelDeploymentName: S.String,
          modelArn: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          failureMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomModelDeploymentSummary" });
    case 2:
      return S.Array(__S(4129, __c129, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          modelDeploymentSummaries: S.optional(__S(4130, __c129, 2)),
        }),
      ).annotate({ identifier: "ListCustomModelDeploymentsResponse" });
  }
}
function __c130(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          creationTimeBefore: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ).pipe(T.HttpQuery("creationTimeBefore")),
          creationTimeAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("creationTimeAfter"),
          ),
          nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
          baseModelArnEquals: S.optional(S.String).pipe(T.HttpQuery("baseModelArnEquals")),
          foundationModelArnEquals: S.optional(S.String).pipe(
            T.HttpQuery("foundationModelArnEquals"),
          ),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
          isOwned: S.optional(S.Boolean).pipe(T.HttpQuery("isOwned")),
          modelStatus: S.optional(S.String).pipe(T.HttpQuery("modelStatus")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/custom-models" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListCustomModelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          modelArn: S.String,
          modelName: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          baseModelArn: S.String,
          baseModelName: S.String,
          customizationType: S.optional(S.String),
          ownerAccountId: S.optional(S.String),
          modelStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "CustomModelSummary" });
    case 2:
      return S.Array(__S(4161, __c130, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          modelSummaries: S.optional(__S(4162, __c130, 2)),
        }),
      ).annotate({ identifier: "ListCustomModelsResponse" });
  }
}
function __c131(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/enforcedGuardrailsConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEnforcedGuardrailsConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          configId: S.optional(S.String),
          guardrailArn: S.optional(S.String),
          guardrailId: S.optional(S.String),
          inputTags: S.optional(S.String),
          selectiveContentGuarding: S.optional(__S(4224, __c132, 0)),
          guardrailVersion: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          createdBy: S.optional(S.String),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
          owner: S.optional(S.String),
          modelEnforcement: S.optional(__S(4225, __c132, 1)),
        }),
      ).annotate({ identifier: "AccountEnforcedGuardrailOutputConfiguration" });
    case 2:
      return S.Array(__S(4193, __c131, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ guardrailsConfig: __S(4194, __c131, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEnforcedGuardrailsConfigurationResponse" });
  }
}
function __c132(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ system: S.optional(S.String), messages: S.optional(S.String) }),
      ).annotate({ identifier: "SelectiveContentGuarding" });
    case 1:
      return S.suspend(() =>
        S.Struct({ includedModels: __S(32, __c1, 0), excludedModels: __S(32, __c1, 0) }),
      ).annotate({ identifier: "ModelEnforcement" });
  }
}
function __c133(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          creationTimeAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("creationTimeAfter"),
          ),
          creationTimeBefore: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ).pipe(T.HttpQuery("creationTimeBefore")),
          statusEquals: S.optional(S.String).pipe(T.HttpQuery("statusEquals")),
          applicationTypeEquals: S.optional(S.String).pipe(T.HttpQuery("applicationTypeEquals")),
          nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/evaluation-jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEvaluationJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          bedrockModelIdentifiers: S.optional(__S(32, __c1, 0)),
          precomputedInferenceSourceIdentifiers: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "EvaluationModelConfigSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          bedrockKnowledgeBaseIdentifiers: S.optional(__S(32, __c1, 0)),
          precomputedRagSourceIdentifiers: S.optional(__S(32, __c1, 0)),
        }),
      ).annotate({ identifier: "EvaluationRagConfigSummary" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          modelConfigSummary: S.optional(__S(4257, __c133, 1)),
          ragConfigSummary: S.optional(__S(4258, __c133, 2)),
        }),
      ).annotate({ identifier: "EvaluationInferenceConfigSummary" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.String,
          jobName: S.String,
          status: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          jobType: S.String,
          evaluationTaskTypes: __S(1504, __c47, 0),
          modelIdentifiers: S.optional(__S(32, __c1, 0)),
          ragIdentifiers: S.optional(__S(32, __c1, 0)),
          evaluatorModelIdentifiers: S.optional(__S(32, __c1, 0)),
          customMetricsEvaluatorModelIdentifiers: S.optional(__S(32, __c1, 0)),
          inferenceConfigSummary: S.optional(__S(4259, __c133, 3)),
          applicationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "EvaluationSummary" });
    case 5:
      return S.Array(__S(4260, __c133, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          jobSummaries: S.optional(__S(4261, __c133, 5)),
        }),
      ).annotate({ identifier: "ListEvaluationJobsResponse" });
  }
}
function __c134(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String.pipe(T.HttpLabel("modelId")),
          offerType: S.optional(S.String).pipe(T.HttpQuery("offerType")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/list-foundation-model-agreement-offers/{modelId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFoundationModelAgreementOffersRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          dimension: S.optional(S.String),
          price: S.optional(S.String),
          description: S.optional(S.String),
          unit: S.optional(S.String),
        }),
      ).annotate({ identifier: "DimensionalPriceRate" });
    case 2:
      return S.Array(__S(4289, __c134, 1));
    case 3:
      return S.suspend(() => S.Struct({ rateCard: __S(4290, __c134, 2) })).annotate({
        identifier: "PricingTerm",
      });
    case 4:
      return S.suspend(() => S.Struct({ url: S.optional(S.String) })).annotate({
        identifier: "LegalTerm",
      });
    case 5:
      return S.suspend(() => S.Struct({ refundPolicyDescription: S.optional(S.String) })).annotate({
        identifier: "SupportTerm",
      });
    case 6:
      return S.suspend(() => S.Struct({ agreementDuration: S.optional(S.String) })).annotate({
        identifier: "ValidityTerm",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          usageBasedPricingTerm: __S(4291, __c134, 3),
          legalTerm: __S(4292, __c134, 4),
          supportTerm: __S(4293, __c134, 5),
          validityTerm: S.optional(__S(4294, __c134, 6)),
        }),
      ).annotate({ identifier: "TermDetails" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          offerId: S.optional(S.String),
          offerToken: S.String,
          termDetails: __S(4295, __c134, 7),
        }),
      ).annotate({ identifier: "Offer" });
    case 9:
      return S.Array(__S(4296, __c134, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ modelId: S.String, offers: __S(4297, __c134, 9) }),
      ).annotate({ identifier: "ListFoundationModelAgreementOffersResponse" });
  }
}
function __c135(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          byProvider: S.optional(S.String).pipe(T.HttpQuery("byProvider")),
          byCustomizationType: S.optional(S.String).pipe(T.HttpQuery("byCustomizationType")),
          byOutputModality: S.optional(S.String).pipe(T.HttpQuery("byOutputModality")),
          byInferenceType: S.optional(S.String).pipe(T.HttpQuery("byInferenceType")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/foundation-models" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFoundationModelsRequest" });
    case 1:
      return S.Array(__S(3297, __c103, 1));
    case 2:
      return S.suspend(() =>
        S.Struct({ modelSummaries: S.optional(__S(4321, __c135, 1)) }),
      ).annotate({ identifier: "ListFoundationModelsResponse" });
  }
}
function __c136(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          guardrailIdentifier: S.optional(S.String).pipe(T.HttpQuery("guardrailIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/guardrails" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListGuardrailsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          status: S.String,
          name: SensitiveString,
          description: S.optional(SensitiveString),
          version: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          crossRegionDetails: S.optional(__S(3392, __c106, 0)),
        }),
      ).annotate({ identifier: "GuardrailSummary" });
    case 2:
      return S.Array(__S(4353, __c136, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ guardrails: __S(4354, __c136, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListGuardrailsResponse" });
  }
}
function __c137(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          creationTimeBefore: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ).pipe(T.HttpQuery("creationTimeBefore")),
          creationTimeAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("creationTimeAfter"),
          ),
          nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/imported-models" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListImportedModelsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          modelArn: S.String,
          modelName: S.String,
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          instructSupported: S.optional(S.Boolean),
          modelArchitecture: S.optional(S.String),
        }),
      ).annotate({ identifier: "ImportedModelSummary" });
    case 2:
      return S.Array(__S(4385, __c137, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          modelSummaries: S.optional(__S(4386, __c137, 2)),
        }),
      ).annotate({ identifier: "ListImportedModelsResponse" });
  }
}
function __c138(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          typeEquals: S.optional(S.String).pipe(T.HttpQuery("type")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/inference-profiles" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListInferenceProfilesRequest" });
    case 1:
      return S.Array(__S(3488, __c109, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          inferenceProfileSummaries: S.optional(__S(4417, __c138, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListInferenceProfilesResponse" });
  }
}
function __c139(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          modelSourceEquals: S.optional(S.String).pipe(T.HttpQuery("modelSourceIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/marketplace-model/endpoints" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMarketplaceModelEndpointsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          endpointArn: S.String,
          modelSourceIdentifier: S.String,
          status: S.optional(S.String),
          statusMessage: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "MarketplaceModelEndpointSummary" });
    case 2:
      return S.Array(__S(4449, __c139, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          marketplaceModelEndpoints: S.optional(__S(4450, __c139, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMarketplaceModelEndpointsResponse" });
  }
}
function __c140(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          creationTimeAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("creationTimeAfter"),
          ),
          creationTimeBefore: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ).pipe(T.HttpQuery("creationTimeBefore")),
          statusEquals: S.optional(S.String).pipe(T.HttpQuery("statusEquals")),
          sourceAccountEquals: S.optional(S.String).pipe(T.HttpQuery("sourceAccountEquals")),
          sourceModelArnEquals: S.optional(S.String).pipe(T.HttpQuery("sourceModelArnEquals")),
          targetModelNameContains: S.optional(S.String).pipe(
            T.HttpQuery("outputModelNameContains"),
          ),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/model-copy-jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListModelCopyJobsRequest" });
    case 1:
      return S.Array(__S(3584, __c112, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          modelCopyJobSummaries: S.optional(__S(4481, __c140, 1)),
        }),
      ).annotate({ identifier: "ListModelCopyJobsResponse" });
  }
}
function __c141(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          creationTimeAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("creationTimeAfter"),
          ),
          creationTimeBefore: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ).pipe(T.HttpQuery("creationTimeBefore")),
          statusEquals: S.optional(S.String).pipe(T.HttpQuery("statusEquals")),
          nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/model-customization-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListModelCustomizationJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.String,
          baseModelArn: S.String,
          jobName: S.String,
          status: S.String,
          statusDetails: S.optional(__S(3649, __c114, 1)),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          customModelArn: S.optional(S.String),
          customModelName: S.optional(S.String),
          customizationType: S.optional(S.String),
        }),
      ).annotate({ identifier: "ModelCustomizationJobSummary" });
    case 2:
      return S.Array(__S(4513, __c141, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          modelCustomizationJobSummaries: S.optional(__S(4514, __c141, 2)),
        }),
      ).annotate({ identifier: "ListModelCustomizationJobsResponse" });
  }
}
function __c142(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          creationTimeAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("creationTimeAfter"),
          ),
          creationTimeBefore: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ).pipe(T.HttpQuery("creationTimeBefore")),
          statusEquals: S.optional(S.String).pipe(T.HttpQuery("statusEquals")),
          nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/model-import-jobs" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListModelImportJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.String,
          jobName: S.String,
          status: S.String,
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          importedModelArn: S.optional(S.String),
          importedModelName: S.optional(S.String),
        }),
      ).annotate({ identifier: "ModelImportJobSummary" });
    case 2:
      return S.Array(__S(4545, __c142, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          modelImportJobSummaries: S.optional(__S(4546, __c142, 2)),
        }),
      ).annotate({ identifier: "ListModelImportJobsResponse" });
  }
}
function __c143(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          submitTimeAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("submitTimeAfter"),
          ),
          submitTimeBefore: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("submitTimeBefore"),
          ),
          statusEquals: S.optional(S.String).pipe(T.HttpQuery("statusEquals")),
          nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/model-invocation-jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListModelInvocationJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobArn: S.String,
          jobName: S.String,
          modelId: S.String,
          clientRequestToken: S.optional(S.String),
          roleArn: S.String,
          status: S.optional(S.String),
          message: S.optional(SensitiveString),
          submitTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          inputDataConfig: __S(1921, __c60, 1),
          outputDataConfig: __S(1923, __c60, 3),
          vpcConfig: S.optional(__S(1696, __c53, 0)),
          timeoutDurationInHours: S.optional(S.Number),
          jobExpirationTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          modelInvocationType: S.optional(S.String),
          totalRecordCount: S.optional(S.Number),
          processedRecordCount: S.optional(S.Number),
          successRecordCount: S.optional(S.Number),
          errorRecordCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ModelInvocationJobSummary" });
    case 2:
      return S.Array(__S(4577, __c143, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          invocationJobSummaries: S.optional(__S(4578, __c143, 2)),
        }),
      ).annotate({ identifier: "ListModelInvocationJobsResponse" });
  }
}
function __c144(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          type: S.optional(S.String).pipe(T.HttpQuery("type")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/prompt-routers" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListPromptRoutersRequest" });
    case 1:
      return S.Array(__S(3840, __c120, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          promptRouterSummaries: S.optional(__S(4609, __c144, 1)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListPromptRoutersResponse" });
  }
}
function __c145(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          creationTimeAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))).pipe(
            T.HttpQuery("creationTimeAfter"),
          ),
          creationTimeBefore: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ).pipe(T.HttpQuery("creationTimeBefore")),
          statusEquals: S.optional(S.String).pipe(T.HttpQuery("statusEquals")),
          modelArnEquals: S.optional(S.String).pipe(T.HttpQuery("modelArnEquals")),
          nameContains: S.optional(S.String).pipe(T.HttpQuery("nameContains")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          sortBy: S.optional(S.String).pipe(T.HttpQuery("sortBy")),
          sortOrder: S.optional(S.String).pipe(T.HttpQuery("sortOrder")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/provisioned-model-throughputs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListProvisionedModelThroughputsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          provisionedModelName: S.String,
          provisionedModelArn: S.String,
          modelArn: S.String,
          desiredModelArn: S.String,
          foundationModelArn: S.String,
          modelUnits: S.Number,
          desiredModelUnits: S.Number,
          status: S.String,
          commitmentDuration: S.optional(S.String),
          commitmentExpirationTime: S.optional(
            T.DateFromString.pipe(T.TimestampFormat("date-time")),
          ),
          creationTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastModifiedTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ProvisionedModelSummary" });
    case 2:
      return S.Array(__S(4641, __c145, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String),
          provisionedModelSummaries: S.optional(__S(4642, __c145, 2)),
        }),
      ).annotate({ identifier: "ListProvisionedModelThroughputsResponse" });
  }
}
function __c146(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceARN: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listTagsForResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(801, __c25, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c147(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ mode: S.String }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/data-retention" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutAccountDataRetentionRequest" });
  }
}
function __c148(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          guardrailIdentifier: S.String,
          guardrailVersion: S.String,
          selectiveContentGuarding: S.optional(__S(4224, __c132, 0)),
          modelEnforcement: S.optional(__S(4225, __c132, 1)),
        }),
      ).annotate({ identifier: "AccountEnforcedGuardrailInferenceInputConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          configId: S.optional(S.String),
          guardrailInferenceConfig: __S(4736, __c148, 0),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/enforcedGuardrailsConfiguration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutEnforcedGuardrailConfigurationRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          configId: S.optional(S.String),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedBy: S.optional(S.String),
        }),
      ).annotate({ identifier: "PutEnforcedGuardrailConfigurationResponse" });
  }
}
function __c149(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ loggingConfig: __S(3778, __c118, 2) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/logging/modelinvocations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutModelInvocationLoggingConfigurationRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
