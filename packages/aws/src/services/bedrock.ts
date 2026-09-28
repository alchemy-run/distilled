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
  sdkId: "Bedrock",
  target: "AmazonBedrockControlPlaneService",
  version: "2023-04-20",
  sigv4: "bedrock",
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
                `https://bedrock-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://bedrock-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://bedrock.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://bedrock.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  extends /*@__PURE__*/ TE.TaggedError(
    "ConflictException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceInUseException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceInUseException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError"],
    { status: 503 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly resourceName?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type AutomatedReasoningPolicyDescription =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyFormatVersion = string;
export type AutomatedReasoningPolicyDefinitionTypeName =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyDefinitionTypeDescription =
  | string
  | redacted.Redacted<string>;
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
export type AutomatedReasoningPolicyDefinitionTypeList =
  AutomatedReasoningPolicyDefinitionType[];
export type AutomatedReasoningPolicyDefinitionRuleId = string;
export type AutomatedReasoningPolicyDefinitionRuleExpression =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyDefinitionRuleAlternateExpression =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyDefinitionRule {
  id: string;
  expression: string | redacted.Redacted<string>;
  alternateExpression?: string | redacted.Redacted<string>;
}
export type AutomatedReasoningPolicyDefinitionRuleList =
  AutomatedReasoningPolicyDefinitionRule[];
export type AutomatedReasoningPolicyDefinitionVariableName =
  | string
  | redacted.Redacted<string>;
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
export type AutomatedReasoningPolicyTestGuardContent =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyTestQueryContent =
  | string
  | redacted.Redacted<string>;
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
export type CustomModelDataSource = {
  modelPackageArnDataSource: ModelPackageArnDataSource;
};
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
export type ApplicationType =
  | "ModelEvaluation"
  | "RagEvaluation"
  | (string & {});
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
export type EvaluatorModelConfig = {
  bedrockEvaluatorModels: BedrockEvaluatorModel[];
};
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
export type AutomatedEvaluationCustomMetrics =
  AutomatedEvaluationCustomMetricSource[];
export interface CustomMetricBedrockEvaluatorModel {
  modelIdentifier: string;
}
export type CustomMetricBedrockEvaluatorModels =
  CustomMetricBedrockEvaluatorModel[];
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
  | {
      bedrockModel?: never;
      precomputedInferenceSource: EvaluationPrecomputedInferenceSource;
    };
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
export type AttributeType =
  | "STRING"
  | "NUMBER"
  | "BOOLEAN"
  | "STRING_LIST"
  | (string & {});
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
export type VectorSearchRerankingConfigurationType =
  | "BEDROCK_RERANKING_MODEL"
  | (string & {});
export type BedrockRerankingModelArn = string;
export interface VectorSearchBedrockRerankingModelConfiguration {
  modelArn: string;
  additionalModelRequestFields?: { [key: string]: any | undefined };
}
export type RerankingMetadataSelectionMode =
  | "SELECTIVE"
  | "ALL"
  | (string & {});
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
export type RetrieveAndGenerateType =
  | "KNOWLEDGE_BASE"
  | "EXTERNAL_SOURCES"
  | (string & {});
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
  | {
      retrieveConfig?: never;
      retrieveAndGenerateConfig: RetrieveAndGenerateConfiguration;
    };
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
  | {
      knowledgeBaseConfig: KnowledgeBaseConfig;
      precomputedRagSourceConfig?: never;
    }
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
export type GuardrailFilterStrength =
  | "NONE"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
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
export type GuardrailContentFiltersTierName =
  | "CLASSIC"
  | "STANDARD"
  | (string & {});
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
export type GuardrailSensitiveInformationAction =
  | "BLOCK"
  | "ANONYMIZE"
  | "NONE"
  | (string & {});
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
export type GuardrailContextualGroundingFilterType =
  | "GROUNDING"
  | "RELEVANCE"
  | (string & {});
export type GuardrailContextualGroundingAction =
  | "BLOCK"
  | "NONE"
  | (string & {});
export interface GuardrailContextualGroundingFilterConfig {
  type: GuardrailContextualGroundingFilterType;
  threshold: number;
  action?: GuardrailContextualGroundingAction;
  enabled?: boolean;
}
export type GuardrailContextualGroundingFiltersConfig =
  GuardrailContextualGroundingFilterConfig[];
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
  | {
      equals?: never;
      notEquals?: never;
      andAll: RequestMetadataBaseFilters[];
      orAll?: never;
    }
  | {
      equals?: never;
      notEquals?: never;
      andAll?: never;
      orAll: RequestMetadataBaseFilters[];
    };
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
export type ModelCustomizationHyperParameters = {
  [key: string]: string | undefined;
};
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
export type AutomatedReasoningPolicyScenarioExpression =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningPolicyUpdateFromScenarioFeedbackAnnotation {
  ruleIds?: string[];
  scenarioExpression: string | redacted.Redacted<string>;
  feedback?: string | redacted.Redacted<string>;
}
export type AutomatedReasoningPolicyAnnotationIngestContent =
  | string
  | redacted.Redacted<string>;
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
export type AutomatedReasoningPolicyAnnotationList =
  AutomatedReasoningPolicyAnnotation[];
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
export type AutomatedReasoningPolicyBuildDocumentName =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyBuildDocumentContentType =
  | "pdf"
  | "txt"
  | (string & {});
export type AutomatedReasoningPolicyBuildDocumentDescription =
  | string
  | redacted.Redacted<string>;
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
export type AutomatedReasoningPolicyDefinitionTypeNameList = (
  | string
  | redacted.Redacted<string>
)[];
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
export type AutomatedReasoningPolicyDisjointRuleSetList =
  AutomatedReasoningPolicyDisjointRuleSet[];
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
export type AutomatedReasoningPolicyAnnotationStatus =
  | "APPLIED"
  | "FAILED"
  | (string & {});
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
export type AutomatedReasoningPolicyBuildMessageType =
  | "INFO"
  | "WARNING"
  | "ERROR"
  | (string & {});
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
export type AutomatedReasoningPolicyBuildStepList =
  AutomatedReasoningPolicyBuildStep[];
export interface AutomatedReasoningPolicyBuildLogEntry {
  annotation: AutomatedReasoningPolicyAnnotation;
  status: AutomatedReasoningPolicyAnnotationStatus;
  buildSteps: AutomatedReasoningPolicyBuildStep[];
}
export type AutomatedReasoningPolicyBuildLogEntryList =
  AutomatedReasoningPolicyBuildLogEntry[];
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
export type AutomatedReasoningPolicyScenarioList =
  AutomatedReasoningPolicyScenario[];
export interface AutomatedReasoningPolicyScenarios {
  policyScenarios: AutomatedReasoningPolicyScenario[];
}
export type AutomatedReasoningPolicyBuildResultAssetName =
  | string
  | redacted.Redacted<string>;
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
export type AutomatedReasoningPolicyBuildDocumentBlob =
  | Uint8Array
  | redacted.Redacted<Uint8Array>;
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
export type AutomatedReasoningPolicyJustificationText =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyJustificationList = (
  | string
  | redacted.Redacted<string>
)[];
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
export type AutomatedReasoningPolicyStatementText =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningPolicyLineNumberList = number[];
export interface AutomatedReasoningPolicyStatementLocation {
  lines: number[];
}
export interface AutomatedReasoningPolicyAtomicStatement {
  id: string;
  text: string | redacted.Redacted<string>;
  location: AutomatedReasoningPolicyStatementLocation;
}
export type AutomatedReasoningPolicyAtomicStatementList =
  AutomatedReasoningPolicyAtomicStatement[];
export type AutomatedReasoningPolicyLineText =
  | string
  | redacted.Redacted<string>;
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
export type AutomatedReasoningPolicyAnnotatedChunkList =
  AutomatedReasoningPolicyAnnotatedChunk[];
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
  ruleReports: {
    [key: string]: AutomatedReasoningPolicyRuleReport | undefined;
  };
  variableReports: {
    [key: string]: AutomatedReasoningPolicyVariableReport | undefined;
  };
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
export type AutomatedReasoningLogicStatementContent =
  | string
  | redacted.Redacted<string>;
export type AutomatedReasoningNaturalLanguageStatementContent =
  | string
  | redacted.Redacted<string>;
export interface AutomatedReasoningLogicStatement {
  logic: string | redacted.Redacted<string>;
  naturalLanguage?: string | redacted.Redacted<string>;
}
export type AutomatedReasoningLogicStatementList =
  AutomatedReasoningLogicStatement[];
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
export type AutomatedReasoningCheckTranslationList =
  AutomatedReasoningCheckTranslation[];
export interface AutomatedReasoningCheckTranslationOption {
  translations?: AutomatedReasoningCheckTranslation[];
}
export type AutomatedReasoningCheckTranslationOptionList =
  AutomatedReasoningCheckTranslationOption[];
export type AutomatedReasoningCheckDifferenceScenarioList =
  AutomatedReasoningCheckScenario[];
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
export type AutomatedReasoningCheckFindingList =
  AutomatedReasoningCheckFinding[];
export type AutomatedReasoningPolicyTestRunResult =
  | "PASSED"
  | "FAILED"
  | (string & {});
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
export type CustomModelDeploymentStatus =
  | "Creating"
  | "Active"
  | "Failed"
  | (string & {});
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
export type FoundationModelLifecycleStatus =
  | "ACTIVE"
  | "LEGACY"
  | (string & {});
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
export type AgreementStatus =
  | "AVAILABLE"
  | "PENDING"
  | "NOT_AVAILABLE"
  | "ERROR"
  | (string & {});
export interface AgreementAvailability {
  status: AgreementStatus;
  errorMessage?: string;
}
export type AuthorizationStatus =
  | "AUTHORIZED"
  | "NOT_AUTHORIZED"
  | (string & {});
export type EntitlementAvailability =
  | "AVAILABLE"
  | "NOT_AVAILABLE"
  | (string & {});
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
export type GuardrailContextualGroundingFilters =
  GuardrailContextualGroundingFilter[];
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
export type GuardrailFailureRecommendations = (
  | string
  | redacted.Redacted<string>
)[];
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
export type InferenceProfileType =
  | "SYSTEM_DEFINED"
  | "APPLICATION"
  | (string & {});
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
export type ModelCopyJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | (string & {});
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
export type ModelImportJobStatus =
  | "InProgress"
  | "Completed"
  | "Failed"
  | (string & {});
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
  models: (PromptRouterTargetModel & {
    modelArn: PromptRouterTargetModelArn;
  })[];
  fallbackModel: PromptRouterTargetModel & {
    modelArn: PromptRouterTargetModelArn;
  };
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
export type AdvancedPromptOptimizationJobSummaries =
  AdvancedPromptOptimizationJobSummary[];
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
export type AutomatedReasoningPolicySummaries =
  AutomatedReasoningPolicySummary[];
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
export type AutomatedReasoningPolicyTestCaseList =
  AutomatedReasoningPolicyTestCase[];
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
export type AutomatedReasoningPolicyTestList =
  AutomatedReasoningPolicyTestResult[];
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
export type SelectiveGuardingMode =
  | "SELECTIVE"
  | "COMPREHENSIVE"
  | (string & {});
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
export type MarketplaceModelEndpointSummaries =
  MarketplaceModelEndpointSummary[];
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
    models: (PromptRouterTargetModel & {
      modelArn: PromptRouterTargetModelArn;
    })[];
    fallbackModel: PromptRouterTargetModel & {
      modelArn: PromptRouterTargetModelArn;
    };
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
export type AutomatedReasoningPolicyBuildFeedback =
  | string
  | redacted.Redacted<string>;
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
  descriptor: {
    service: svc,
    http: "POST /advanced-prompt-optimization-job/batch-delete",
    input: { jobIdentifiers: 0 },
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
  operationName: "BatchDeleteAdvancedPromptOptimizationJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /evaluation-jobs/batch-delete",
    input: { jobIdentifiers: 0 },
    output: {
      errors: D.list({ jobIdentifier: D.secret }),
      evaluationJobs: D.list({ jobIdentifier: D.secret }),
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
  operationName: "BatchDeleteEvaluationJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/cancel",
    input: { policyArn: 0, buildWorkflowId: 0 },
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
  operationName: "CancelAutomatedReasoningPolicyBuildWorkflow",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /advanced-prompt-optimization-jobs",
    input: {
      jobName: 0,
      jobDescription: 0,
      clientToken: D.m({ idempotency: true }),
      inputConfig: { s3Uri: 0 },
      outputConfig: { s3Uri: 0 },
      encryptionKeyArn: 0,
      tags: D.list(i_Tag),
      modelConfigurations: D.list({
        modelId: 0,
        inferenceConfig: {
          maxTokens: 0,
          temperature: 0,
          topP: 0,
          stopSequences: 0,
        },
        additionalModelRequestFields: 0,
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
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAdvancedPromptOptimizationJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /automated-reasoning-policies",
    input: {
      name: 0,
      description: 0,
      clientRequestToken: D.m({ idempotency: true }),
      policyDefinition: i_AutomatedReasoningPolicyDefinition,
      kmsKeyId: 0,
      tags: D.list(i_Tag),
    },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      updatedAt: D.ts,
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
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAutomatedReasoningPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /automated-reasoning-policies/{policyArn}/test-cases",
    input: {
      policyArn: 0,
      guardContent: 0,
      queryContent: 0,
      expectedAggregatedFindingsResult: 0,
      clientRequestToken: D.m({ idempotency: true }),
      confidenceThreshold: 0,
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
  operationName: "CreateAutomatedReasoningPolicyTestCase",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /automated-reasoning-policies/{policyArn}/versions",
    input: {
      policyArn: 0,
      clientRequestToken: D.m({ idempotency: true }),
      lastUpdatedDefinitionHash: 0,
      tags: D.list(i_Tag),
    },
    output: { name: D.secret, description: D.secret, createdAt: D.ts },
    body: true,
  },
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
})) as any;

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
 * - `customModelDataSource` — Specify a SageMaker AI model package ARN. Amazon Bedrock resolves the model package to retrieve the model artifacts. This is the preferred method for new SageMaker AI training outputs.
 *
 * - `modelSourceConfig` — Specify an Amazon S3 URI pointing to the Amazon-managed Amazon S3 bucket containing your model artifacts.
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
  descriptor: {
    service: svc,
    http: "POST /custom-models/create-custom-model",
    input: {
      modelName: 0,
      modelSourceConfig: i_ModelDataSource,
      customModelDataSource: {
        modelPackageArnDataSource: { modelPackageArn: 0 },
      },
      modelKmsKeyArn: 0,
      roleArn: 0,
      modelTags: D.list(i_Tag),
      clientRequestToken: D.m({ idempotency: true }),
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
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCustomModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /model-customization/custom-model-deployments",
    input: {
      modelDeploymentName: 0,
      modelArn: 0,
      description: 0,
      tags: D.list(i_Tag),
      clientRequestToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /evaluation-jobs",
    input: {
      jobName: 0,
      jobDescription: 0,
      clientRequestToken: D.m({ idempotency: true }),
      roleArn: 0,
      customerEncryptionKeyId: 0,
      jobTags: D.list(i_Tag),
      applicationType: 0,
      evaluationConfig: {
        automated: {
          datasetMetricConfigs: D.list(i_EvaluationDatasetMetricConfig),
          evaluatorModelConfig: {
            bedrockEvaluatorModels: D.list({ modelIdentifier: 0 }),
          },
          customMetricConfig: {
            customMetrics: D.list({
              customMetricDefinition: {
                name: 0,
                instructions: 0,
                ratingScale: D.list({
                  definition: 0,
                  value: { stringValue: 0, floatValue: 0 },
                }),
              },
            }),
            evaluatorModelConfig: {
              bedrockEvaluatorModels: D.list({ modelIdentifier: 0 }),
            },
          },
        },
        human: {
          humanWorkflowConfig: { flowDefinitionArn: 0, instructions: 0 },
          customMetrics: D.list({ name: 0, description: 0, ratingMethod: 0 }),
          datasetMetricConfigs: D.list(i_EvaluationDatasetMetricConfig),
        },
      },
      inferenceConfig: {
        models: D.list({
          bedrockModel: {
            modelIdentifier: 0,
            inferenceParams: 0,
            performanceConfig: { latency: 0 },
          },
          precomputedInferenceSource: { inferenceSourceIdentifier: 0 },
        }),
        ragConfigs: D.list({
          knowledgeBaseConfig: {
            retrieveConfig: {
              knowledgeBaseId: 0,
              knowledgeBaseRetrievalConfiguration:
                i_KnowledgeBaseRetrievalConfiguration,
            },
            retrieveAndGenerateConfig: {
              type: 0,
              knowledgeBaseConfiguration: {
                knowledgeBaseId: 0,
                modelArn: 0,
                retrievalConfiguration: i_KnowledgeBaseRetrievalConfiguration,
                generationConfiguration: {
                  promptTemplate: i_PromptTemplate,
                  guardrailConfiguration: i_GuardrailConfiguration,
                  kbInferenceConfig: i_KbInferenceConfig,
                  additionalModelRequestFields: 0,
                },
                orchestrationConfiguration: {
                  queryTransformationConfiguration: { type: 0 },
                },
              },
              externalSourcesConfiguration: {
                modelArn: 0,
                sources: D.list({
                  sourceType: 0,
                  s3Location: { uri: 0 },
                  byteContent: { identifier: 0, contentType: 0, data: 0 },
                }),
                generationConfiguration: {
                  promptTemplate: i_PromptTemplate,
                  guardrailConfiguration: i_GuardrailConfiguration,
                  kbInferenceConfig: i_KbInferenceConfig,
                  additionalModelRequestFields: 0,
                },
              },
            },
          },
          precomputedRagSourceConfig: {
            retrieveSourceConfig: { ragSourceIdentifier: 0 },
            retrieveAndGenerateSourceConfig: { ragSourceIdentifier: 0 },
          },
        }),
      },
      outputDataConfig: { s3Uri: 0 },
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
  operationName: "CreateEvaluationJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /create-foundation-model-agreement",
    input: { offerToken: 0, modelId: 0 },
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
  operationName: "CreateFoundationModelAgreement",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /guardrails",
    input: {
      name: 0,
      description: 0,
      topicPolicyConfig: i_GuardrailTopicPolicyConfig,
      contentPolicyConfig: i_GuardrailContentPolicyConfig,
      wordPolicyConfig: i_GuardrailWordPolicyConfig,
      sensitiveInformationPolicyConfig:
        i_GuardrailSensitiveInformationPolicyConfig,
      contextualGroundingPolicyConfig:
        i_GuardrailContextualGroundingPolicyConfig,
      automatedReasoningPolicyConfig: i_GuardrailAutomatedReasoningPolicyConfig,
      crossRegionConfig: i_GuardrailCrossRegionConfig,
      blockedInputMessaging: 0,
      blockedOutputsMessaging: 0,
      kmsKeyId: 0,
      tags: D.list(i_Tag),
      clientRequestToken: D.m({ idempotency: true }),
    },
    output: { createdAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /guardrails/{guardrailIdentifier}",
    input: {
      guardrailIdentifier: 0,
      description: 0,
      clientRequestToken: D.m({ idempotency: true }),
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
  operationName: "CreateGuardrailVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /inference-profiles",
    input: {
      inferenceProfileName: 0,
      description: 0,
      clientRequestToken: D.m({ idempotency: true }),
      modelSource: { copyFrom: 0 },
      tags: D.list(i_Tag),
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
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInferenceProfile",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /marketplace-model/endpoints",
    input: {
      modelSourceIdentifier: 0,
      endpointConfig: i_EndpointConfig,
      acceptEula: 0,
      endpointName: 0,
      clientRequestToken: D.m({ idempotency: true }),
      tags: D.list(i_Tag),
    },
    output: { marketplaceModelEndpoint: o_MarketplaceModelEndpoint },
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
  operationName: "CreateMarketplaceModelEndpoint",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /model-copy-jobs",
    input: {
      sourceModelArn: 0,
      targetModelName: 0,
      modelKmsKeyId: 0,
      targetModelTags: D.list(i_Tag),
      clientRequestToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    TooManyTagsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelCopyJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /model-customization-jobs",
    input: {
      jobName: 0,
      customModelName: 0,
      roleArn: 0,
      clientRequestToken: D.m({ idempotency: true }),
      baseModelIdentifier: 0,
      customizationType: 0,
      customModelKmsKeyId: 0,
      jobTags: D.list(i_Tag),
      customModelTags: D.list(i_Tag),
      trainingDataConfig: {
        s3Uri: 0,
        invocationLogsConfig: {
          usePromptResponse: 0,
          invocationLogSource: { s3Uri: 0 },
          requestMetadataFilters: {
            equals: 0,
            notEquals: 0,
            andAll: D.list(i_RequestMetadataBaseFilters),
            orAll: D.list(i_RequestMetadataBaseFilters),
          },
        },
      },
      validationDataConfig: { validators: D.list({ s3Uri: 0 }) },
      outputDataConfig: { s3Uri: 0 },
      hyperParameters: 0,
      vpcConfig: i_VpcConfig,
      customizationConfig: {
        distillationConfig: {
          teacherModelConfig: {
            teacherModelIdentifier: 0,
            maxResponseLengthForInference: 0,
          },
        },
        rftConfig: {
          graderConfig: { lambdaGrader: { lambdaArn: 0 } },
          hyperParameters: {
            epochCount: 0,
            batchSize: 0,
            learningRate: 0,
            maxPromptLength: 0,
            trainingSamplePerPrompt: 0,
            inferenceMaxTokens: 0,
            reasoningEffort: 0,
            evalInterval: 0,
          },
        },
      },
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
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelCustomizationJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /model-import-jobs",
    input: {
      jobName: 0,
      importedModelName: 0,
      roleArn: 0,
      modelDataSource: i_ModelDataSource,
      jobTags: D.list(i_Tag),
      importedModelTags: D.list(i_Tag),
      clientRequestToken: 0,
      vpcConfig: i_VpcConfig,
      importedModelKmsKeyId: 0,
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
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateModelImportJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /model-invocation-job",
    input: {
      jobName: 0,
      roleArn: 0,
      clientRequestToken: D.m({ idempotency: true }),
      modelId: 0,
      inputDataConfig: {
        s3InputDataConfig: { s3InputFormat: 0, s3Uri: 0, s3BucketOwner: 0 },
      },
      outputDataConfig: {
        s3OutputDataConfig: {
          s3Uri: 0,
          s3EncryptionKeyId: 0,
          s3BucketOwner: 0,
        },
      },
      vpcConfig: i_VpcConfig,
      timeoutDurationInHours: 0,
      tags: D.list(i_Tag),
      modelInvocationType: 0,
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
  operationName: "CreateModelInvocationJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prompt-routers",
    input: {
      clientRequestToken: D.m({ idempotency: true }),
      promptRouterName: 0,
      models: D.list(i_PromptRouterTargetModel),
      description: 0,
      routingCriteria: { responseQualityDifference: 0 },
      fallbackModel: i_PromptRouterTargetModel,
      tags: D.list(i_Tag),
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
    TooManyTagsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePromptRouter",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /provisioned-model-throughput",
    input: {
      clientRequestToken: D.m({ idempotency: true }),
      modelUnits: 0,
      provisionedModelName: 0,
      modelId: 0,
      commitmentDuration: 0,
      tags: D.list(i_Tag),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /automated-reasoning-policies/{policyArn}",
    input: { policyArn: 0, force: D.m({ query: "force" }) },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}",
    input: {
      policyArn: 0,
      buildWorkflowId: 0,
      lastUpdatedAt: D.m({ query: "updatedAt" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /automated-reasoning-policies/{policyArn}/test-cases/{testCaseId}",
    input: {
      policyArn: 0,
      testCaseId: 0,
      lastUpdatedAt: D.m({ query: "updatedAt" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /custom-models/{modelIdentifier}",
    input: { modelIdentifier: 0 },
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
  operationName: "DeleteCustomModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /model-customization/custom-model-deployments/{customModelDeploymentIdentifier}",
    input: { customModelDeploymentIdentifier: 0 },
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
  operationName: "DeleteCustomModelDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /enforcedGuardrailsConfiguration/{configId}",
    input: { configId: 0 },
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
  operationName: "DeleteEnforcedGuardrailConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-foundation-model-agreement",
    input: { modelId: 0 },
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
  operationName: "DeleteFoundationModelAgreement",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /guardrails/{guardrailIdentifier}",
    input: {
      guardrailIdentifier: 0,
      guardrailVersion: D.m({ query: "guardrailVersion" }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /imported-models/{modelIdentifier}",
    input: { modelIdentifier: 0 },
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
  operationName: "DeleteImportedModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /inference-profiles/{inferenceProfileIdentifier}",
    input: { inferenceProfileIdentifier: 0 },
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
  operationName: "DeleteInferenceProfile",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /marketplace-model/endpoints/{endpointArn}",
    input: { endpointArn: 0 },
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
  operationName: "DeleteMarketplaceModelEndpoint",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /logging/modelinvocations",
    input: {},
  },
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteModelInvocationLoggingConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prompt-routers/{promptRouterArn}",
    input: { promptRouterArn: 0 },
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
  operationName: "DeletePromptRouter",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /provisioned-model-throughput/{provisionedModelId}",
    input: { provisionedModelId: 0 },
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
  operationName: "DeleteProvisionedModelThroughput",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /resource-policy/{resourceArn}",
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
  operationName: "DeleteResourcePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /marketplace-model/endpoints/{endpointArn}/registration",
    input: { endpointArn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /automated-reasoning-policies/{policyArn}/export",
    input: { policyArn: 0 },
    output: {
      policyDefinition: D.m({
        payload: true,
        shape: o_AutomatedReasoningPolicyDefinition,
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
  operationName: "ExportAutomatedReasoningPolicyVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /data-retention",
    input: {},
    output: { updatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountDataRetention",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /advanced-prompt-optimization-jobs/{jobIdentifier}",
    input: { jobIdentifier: 0 },
    output: { creationTime: D.ts, lastModifiedTime: D.ts },
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
  operationName: "GetAdvancedPromptOptimizationJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /automated-reasoning-policies/{policyArn}",
    input: { policyArn: 0 },
    output: {
      name: D.secret,
      description: D.secret,
      createdAt: D.ts,
      updatedAt: D.ts,
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
  operationName: "GetAutomatedReasoningPolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/annotations",
    input: { policyArn: 0, buildWorkflowId: 0 },
    output: {
      name: D.secret,
      annotations: D.list(o_AutomatedReasoningPolicyAnnotation),
      updatedAt: D.ts,
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
  operationName: "GetAutomatedReasoningPolicyAnnotations",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}",
    input: { policyArn: 0, buildWorkflowId: 0 },
    output: {
      documentName: D.secret,
      documentDescription: D.secret,
      createdAt: D.ts,
      updatedAt: D.ts,
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
  operationName: "GetAutomatedReasoningPolicyBuildWorkflow",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/result-assets",
    input: {
      policyArn: 0,
      buildWorkflowId: 0,
      assetType: D.m({ query: "assetType" }),
      assetId: D.m({ query: "assetId" }),
    },
    output: {
      buildWorkflowAssets: {
        policyDefinition: o_AutomatedReasoningPolicyDefinition,
        qualityReport: {
          unusedTypes: D.list(D.secret),
          unusedTypeValues: D.list({ typeName: D.secret }),
          unusedVariables: D.list(D.secret),
          disjointRuleSets: D.list({ variables: D.list(D.secret) }),
        },
        buildLog: {
          entries: D.list({
            annotation: o_AutomatedReasoningPolicyAnnotation,
            buildSteps: D.list({
              context: {
                mutation: {
                  addType: { type: o_AutomatedReasoningPolicyDefinitionType },
                  updateType: {
                    type: o_AutomatedReasoningPolicyDefinitionType,
                  },
                  deleteType: { name: D.secret },
                  addVariable: {
                    variable: o_AutomatedReasoningPolicyDefinitionVariable,
                  },
                  updateVariable: {
                    variable: o_AutomatedReasoningPolicyDefinitionVariable,
                  },
                  deleteVariable: { name: D.secret },
                  addRule: { rule: o_AutomatedReasoningPolicyDefinitionRule },
                  updateRule: {
                    rule: o_AutomatedReasoningPolicyDefinitionRule,
                  },
                },
              },
              priorElement: {
                policyDefinitionVariable:
                  o_AutomatedReasoningPolicyDefinitionVariable,
                policyDefinitionType: o_AutomatedReasoningPolicyDefinitionType,
                policyDefinitionRule: o_AutomatedReasoningPolicyDefinitionRule,
              },
            }),
          }),
        },
        generatedTestCases: {
          generatedTestCases: D.list({
            queryContent: D.secret,
            guardContent: D.secret,
          }),
        },
        policyScenarios: {
          policyScenarios: D.list(o_AutomatedReasoningPolicyScenario),
        },
        assetManifest: { entries: D.list({ assetName: D.secret }) },
        document: {
          document: D.secretBlob,
          documentName: D.secret,
          documentDescription: D.secret,
        },
        fidelityReport: {
          ruleReports: D.map({
            groundingJustifications: D.list(D.secret),
            accuracyJustification: D.secret,
          }),
          variableReports: D.map({
            policyVariable: D.secret,
            groundingJustifications: D.list(D.secret),
            accuracyJustification: D.secret,
          }),
          documentSources: D.list({
            documentName: D.secret,
            atomicStatements: D.list({ text: D.secret }),
            documentContent: D.list({
              content: D.list({ line: { lineText: D.secret } }),
            }),
          }),
        },
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
  operationName: "GetAutomatedReasoningPolicyBuildWorkflowResultAssets",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/scenarios",
    input: { policyArn: 0, buildWorkflowId: 0 },
    output: { scenario: o_AutomatedReasoningPolicyScenario },
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
  operationName: "GetAutomatedReasoningPolicyNextScenario",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /automated-reasoning-policies/{policyArn}/test-cases/{testCaseId}",
    input: { policyArn: 0, testCaseId: 0 },
    output: { testCase: o_AutomatedReasoningPolicyTestCase },
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
  operationName: "GetAutomatedReasoningPolicyTestCase",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/test-cases/{testCaseId}/test-results",
    input: { policyArn: 0, buildWorkflowId: 0, testCaseId: 0 },
    output: { testResult: o_AutomatedReasoningPolicyTestResult },
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
  operationName: "GetAutomatedReasoningPolicyTestResult",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /custom-models/{modelIdentifier}",
    input: { modelIdentifier: 0 },
    output: { creationTime: D.ts },
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
  operationName: "GetCustomModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /model-customization/custom-model-deployments/{customModelDeploymentIdentifier}",
    input: { customModelDeploymentIdentifier: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
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
  operationName: "GetCustomModelDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /evaluation-jobs/{jobIdentifier}",
    input: { jobIdentifier: 0 },
    output: {
      jobDescription: D.secret,
      evaluationConfig: {
        automated: {
          datasetMetricConfigs: D.list(o_EvaluationDatasetMetricConfig),
          customMetricConfig: {
            customMetrics: D.list({
              customMetricDefinition: { name: D.secret },
            }),
          },
        },
        human: {
          humanWorkflowConfig: { instructions: D.secret },
          customMetrics: D.list({ name: D.secret, description: D.secret }),
          datasetMetricConfigs: D.list(o_EvaluationDatasetMetricConfig),
        },
      },
      inferenceConfig: {
        models: D.list({ bedrockModel: { inferenceParams: D.secret } }),
        ragConfigs: D.list({
          knowledgeBaseConfig: {
            retrieveAndGenerateConfig: {
              knowledgeBaseConfiguration: {
                generationConfiguration: { promptTemplate: o_PromptTemplate },
              },
              externalSourcesConfiguration: {
                sources: D.list({
                  byteContent: { identifier: D.secret, data: D.secretBlob },
                }),
                generationConfiguration: { promptTemplate: o_PromptTemplate },
              },
            },
          },
        }),
      },
      creationTime: D.ts,
      lastModifiedTime: D.ts,
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
  operationName: "GetEvaluationJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /foundation-models/{modelIdentifier}",
    input: { modelIdentifier: 0 },
    output: { modelDetails: { modelLifecycle: o_FoundationModelLifecycle } },
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
  operationName: "GetFoundationModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /foundation-model-availability/{modelId}",
    input: { modelId: 0 },
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
  operationName: "GetFoundationModelAvailability",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /guardrails/{guardrailIdentifier}",
    input: {
      guardrailIdentifier: 0,
      guardrailVersion: D.m({ query: "guardrailVersion" }),
    },
    output: {
      name: D.secret,
      description: D.secret,
      topicPolicy: {
        topics: D.list({
          name: D.secret,
          definition: D.secret,
          examples: D.list(D.secret),
          inputAction: D.secret,
          outputAction: D.secret,
        }),
        tier: { tierName: D.secret },
      },
      contentPolicy: {
        filters: D.list({
          inputModalities: D.list(D.secret),
          outputModalities: D.list(D.secret),
          inputAction: D.secret,
          outputAction: D.secret,
        }),
        tier: { tierName: D.secret },
      },
      wordPolicy: {
        words: D.list({ inputAction: D.secret, outputAction: D.secret }),
        managedWordLists: D.list({
          inputAction: D.secret,
          outputAction: D.secret,
        }),
      },
      contextualGroundingPolicy: { filters: D.list({ action: D.secret }) },
      createdAt: D.ts,
      updatedAt: D.ts,
      statusReasons: D.list(D.secret),
      failureRecommendations: D.list(D.secret),
      blockedInputMessaging: D.secret,
      blockedOutputsMessaging: D.secret,
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
  operationName: "GetGuardrail",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /imported-models/{modelIdentifier}",
    input: { modelIdentifier: 0 },
    output: { creationTime: D.ts },
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
  operationName: "GetImportedModel",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /inference-profiles/{inferenceProfileIdentifier}",
    input: { inferenceProfileIdentifier: 0 },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetInferenceProfile",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /marketplace-model/endpoints/{endpointArn}",
    input: { endpointArn: 0 },
    output: { marketplaceModelEndpoint: o_MarketplaceModelEndpoint },
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
  operationName: "GetMarketplaceModelEndpoint",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /model-copy-jobs/{jobArn}",
    input: { jobArn: 0 },
    output: { creationTime: D.ts },
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
  operationName: "GetModelCopyJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /model-customization-jobs/{jobIdentifier}",
    input: { jobIdentifier: 0 },
    output: {
      statusDetails: o_StatusDetails,
      creationTime: D.ts,
      lastModifiedTime: D.ts,
      endTime: D.ts,
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
  operationName: "GetModelCustomizationJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /model-import-jobs/{jobIdentifier}",
    input: { jobIdentifier: 0 },
    output: { creationTime: D.ts, lastModifiedTime: D.ts, endTime: D.ts },
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
  operationName: "GetModelImportJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /model-invocation-job/{jobIdentifier}",
    input: { jobIdentifier: 0 },
    output: {
      message: D.secret,
      submitTime: D.ts,
      lastModifiedTime: D.ts,
      endTime: D.ts,
      jobExpirationTime: D.ts,
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
  operationName: "GetModelInvocationJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /logging/modelinvocations",
    input: {},
  },
  errors: [AccessDeniedException, InternalServerException, ThrottlingException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetModelInvocationLoggingConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prompt-routers/{promptRouterArn}",
    input: { promptRouterArn: 0 },
    output: { description: D.secret, createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetPromptRouter",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /provisioned-model-throughput/{provisionedModelId}",
    input: { provisionedModelId: 0 },
    output: {
      creationTime: D.ts,
      lastModifiedTime: D.ts,
      commitmentExpirationTime: D.ts,
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
  operationName: "GetProvisionedModelThroughput",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /resource-policy/{resourceArn}",
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
  operationName: "GetResourcePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /use-case-for-model-access",
    input: {},
    output: { formData: D.blob },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetUseCaseForModelAccess",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /advanced-prompt-optimization-jobs",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
    },
    output: {
      jobSummaries: D.list({ creationTime: D.ts, lastModifiedTime: D.ts }),
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
  descriptor: {
    service: svc,
    http: "GET /automated-reasoning-policies",
    input: {
      policyArn: D.m({ query: "policyArn" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      automatedReasoningPolicySummaries: D.list({
        name: D.secret,
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
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
  descriptor: {
    service: svc,
    http: "GET /automated-reasoning-policies/{policyArn}/build-workflows",
    input: {
      policyArn: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      automatedReasoningPolicyBuildWorkflowSummaries: D.list({
        createdAt: D.ts,
        updatedAt: D.ts,
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
  descriptor: {
    service: svc,
    http: "GET /automated-reasoning-policies/{policyArn}/test-cases",
    input: {
      policyArn: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { testCases: D.list(o_AutomatedReasoningPolicyTestCase) },
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
  descriptor: {
    service: svc,
    http: "GET /automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/test-results",
    input: {
      policyArn: 0,
      buildWorkflowId: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { testResults: D.list(o_AutomatedReasoningPolicyTestResult) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /model-customization/custom-model-deployments",
    input: {
      createdBefore: D.m({ query: "createdBefore" }),
      createdAfter: D.m({ query: "createdAfter" }),
      nameContains: D.m({ query: "nameContains" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
      statusEquals: D.m({ query: "statusEquals" }),
      modelArnEquals: D.m({ query: "modelArnEquals" }),
    },
    output: {
      modelDeploymentSummaries: D.list({
        createdAt: D.ts,
        lastUpdatedAt: D.ts,
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
  descriptor: {
    service: svc,
    http: "GET /custom-models",
    input: {
      creationTimeBefore: D.m({ query: "creationTimeBefore" }),
      creationTimeAfter: D.m({ query: "creationTimeAfter" }),
      nameContains: D.m({ query: "nameContains" }),
      baseModelArnEquals: D.m({ query: "baseModelArnEquals" }),
      foundationModelArnEquals: D.m({ query: "foundationModelArnEquals" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
      isOwned: D.m({ query: "isOwned" }),
      modelStatus: D.m({ query: "modelStatus" }),
    },
    output: { modelSummaries: D.list({ creationTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /enforcedGuardrailsConfiguration",
    input: { nextToken: D.m({ query: "nextToken" }) },
    output: { guardrailsConfig: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "GET /evaluation-jobs",
    input: {
      creationTimeAfter: D.m({ query: "creationTimeAfter" }),
      creationTimeBefore: D.m({ query: "creationTimeBefore" }),
      statusEquals: D.m({ query: "statusEquals" }),
      applicationTypeEquals: D.m({ query: "applicationTypeEquals" }),
      nameContains: D.m({ query: "nameContains" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
    },
    output: { jobSummaries: D.list({ creationTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /list-foundation-model-agreement-offers/{modelId}",
    input: { modelId: 0, offerType: D.m({ query: "offerType" }) },
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
  operationName: "ListFoundationModelAgreementOffers",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /foundation-models",
    input: {
      byProvider: D.m({ query: "byProvider" }),
      byCustomizationType: D.m({ query: "byCustomizationType" }),
      byOutputModality: D.m({ query: "byOutputModality" }),
      byInferenceType: D.m({ query: "byInferenceType" }),
    },
    output: {
      modelSummaries: D.list({ modelLifecycle: o_FoundationModelLifecycle }),
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
  operationName: "ListFoundationModels",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /guardrails",
    input: {
      guardrailIdentifier: D.m({ query: "guardrailIdentifier" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      guardrails: D.list({
        name: D.secret,
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
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
  descriptor: {
    service: svc,
    http: "GET /imported-models",
    input: {
      creationTimeBefore: D.m({ query: "creationTimeBefore" }),
      creationTimeAfter: D.m({ query: "creationTimeAfter" }),
      nameContains: D.m({ query: "nameContains" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
    },
    output: { modelSummaries: D.list({ creationTime: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /inference-profiles",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      typeEquals: D.m({ query: "type" }),
    },
    output: {
      inferenceProfileSummaries: D.list({
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
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
  descriptor: {
    service: svc,
    http: "GET /marketplace-model/endpoints",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      modelSourceEquals: D.m({ query: "modelSourceIdentifier" }),
    },
    output: {
      marketplaceModelEndpoints: D.list({ createdAt: D.ts, updatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    http: "GET /model-copy-jobs",
    input: {
      creationTimeAfter: D.m({ query: "creationTimeAfter" }),
      creationTimeBefore: D.m({ query: "creationTimeBefore" }),
      statusEquals: D.m({ query: "statusEquals" }),
      sourceAccountEquals: D.m({ query: "sourceAccountEquals" }),
      sourceModelArnEquals: D.m({ query: "sourceModelArnEquals" }),
      targetModelNameContains: D.m({ query: "outputModelNameContains" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
    },
    output: { modelCopyJobSummaries: D.list({ creationTime: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "GET /model-customization-jobs",
    input: {
      creationTimeAfter: D.m({ query: "creationTimeAfter" }),
      creationTimeBefore: D.m({ query: "creationTimeBefore" }),
      statusEquals: D.m({ query: "statusEquals" }),
      nameContains: D.m({ query: "nameContains" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
    },
    output: {
      modelCustomizationJobSummaries: D.list({
        statusDetails: o_StatusDetails,
        lastModifiedTime: D.ts,
        creationTime: D.ts,
        endTime: D.ts,
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
  descriptor: {
    service: svc,
    http: "GET /model-import-jobs",
    input: {
      creationTimeAfter: D.m({ query: "creationTimeAfter" }),
      creationTimeBefore: D.m({ query: "creationTimeBefore" }),
      statusEquals: D.m({ query: "statusEquals" }),
      nameContains: D.m({ query: "nameContains" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
    },
    output: {
      modelImportJobSummaries: D.list({
        lastModifiedTime: D.ts,
        creationTime: D.ts,
        endTime: D.ts,
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
  descriptor: {
    service: svc,
    http: "GET /model-invocation-jobs",
    input: {
      submitTimeAfter: D.m({ query: "submitTimeAfter" }),
      submitTimeBefore: D.m({ query: "submitTimeBefore" }),
      statusEquals: D.m({ query: "statusEquals" }),
      nameContains: D.m({ query: "nameContains" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
    },
    output: {
      invocationJobSummaries: D.list({
        message: D.secret,
        submitTime: D.ts,
        lastModifiedTime: D.ts,
        endTime: D.ts,
        jobExpirationTime: D.ts,
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
  descriptor: {
    service: svc,
    http: "GET /prompt-routers",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      type: D.m({ query: "type" }),
    },
    output: {
      promptRouterSummaries: D.list({
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
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
  descriptor: {
    service: svc,
    http: "GET /provisioned-model-throughputs",
    input: {
      creationTimeAfter: D.m({ query: "creationTimeAfter" }),
      creationTimeBefore: D.m({ query: "creationTimeBefore" }),
      statusEquals: D.m({ query: "statusEquals" }),
      modelArnEquals: D.m({ query: "modelArnEquals" }),
      nameContains: D.m({ query: "nameContains" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      sortBy: D.m({ query: "sortBy" }),
      sortOrder: D.m({ query: "sortOrder" }),
    },
    output: {
      provisionedModelSummaries: D.list({
        commitmentExpirationTime: D.ts,
        creationTime: D.ts,
        lastModifiedTime: D.ts,
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
  descriptor: {
    service: svc,
    http: "POST /listTagsForResource",
    input: { resourceARN: 0 },
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
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /data-retention",
    input: { mode: 0 },
    output: { updatedAt: D.ts },
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
  operationName: "PutAccountDataRetention",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /enforcedGuardrailsConfiguration",
    input: {
      configId: 0,
      guardrailInferenceConfig: {
        guardrailIdentifier: 0,
        guardrailVersion: 0,
        selectiveContentGuarding: { system: 0, messages: 0 },
        modelEnforcement: { includedModels: 0, excludedModels: 0 },
      },
    },
    output: { updatedAt: D.ts },
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
  operationName: "PutEnforcedGuardrailConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /logging/modelinvocations",
    input: {
      loggingConfig: {
        cloudWatchConfig: {
          logGroupName: 0,
          roleArn: 0,
          largeDataDeliveryS3Config: i_S3Config,
        },
        s3Config: i_S3Config,
        textDataDeliveryEnabled: 0,
        imageDataDeliveryEnabled: 0,
        embeddingDataDeliveryEnabled: 0,
        videoDataDeliveryEnabled: 0,
        audioDataDeliveryEnabled: 0,
      },
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
  operationName: "PutModelInvocationLoggingConfiguration",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /resource-policy",
    input: { resourceArn: 0, resourcePolicy: 0 },
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
  operationName: "PutResourcePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /use-case-for-model-access",
    input: { formData: 0 },
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
  operationName: "PutUseCaseForModelAccess",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /marketplace-model/endpoints/{endpointIdentifier}/registration",
    input: { endpointIdentifier: 0, modelSourceIdentifier: 0 },
    output: { marketplaceModelEndpoint: o_MarketplaceModelEndpoint },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowType}/start",
    input: {
      policyArn: 0,
      buildWorkflowType: 0,
      clientRequestToken: D.m({
        header: "x-amz-client-token",
        idempotency: true,
      }),
      sourceContent: D.m({
        payload: true,
        shape: {
          policyDefinition: i_AutomatedReasoningPolicyDefinition,
          workflowContent: {
            documents: D.list(i_AutomatedReasoningPolicyBuildWorkflowDocument),
            policyRepairAssets: {
              annotations: D.list(i_AutomatedReasoningPolicyAnnotation),
            },
            generateFidelityReportContent: {
              documents: D.list(
                i_AutomatedReasoningPolicyBuildWorkflowDocument,
              ),
            },
            iterativeRefinementContent: {
              documents: D.list(
                i_AutomatedReasoningPolicyBuildWorkflowDocument,
              ),
              feedback: 0,
            },
          },
        },
      }),
    },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/test-workflows",
    input: {
      policyArn: 0,
      buildWorkflowId: 0,
      testCaseIds: 0,
      clientRequestToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /advanced-prompt-optimization-jobs/{jobIdentifier}/stop",
    input: { jobIdentifier: 0 },
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
  operationName: "StopAdvancedPromptOptimizationJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /evaluation-job/{jobIdentifier}/stop",
    input: { jobIdentifier: 0 },
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
  operationName: "StopEvaluationJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /model-customization-jobs/{jobIdentifier}/stop",
    input: { jobIdentifier: 0 },
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
  operationName: "StopModelCustomizationJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /model-invocation-job/{jobIdentifier}/stop",
    input: { jobIdentifier: 0 },
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
  operationName: "StopModelInvocationJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tagResource",
    input: { resourceARN: 0, tags: D.list(i_Tag) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /untagResource",
    input: { resourceARN: 0, tagKeys: 0 },
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
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /automated-reasoning-policies/{policyArn}",
    input: {
      policyArn: 0,
      policyDefinition: i_AutomatedReasoningPolicyDefinition,
      name: 0,
      description: 0,
    },
    output: { name: D.secret, updatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /automated-reasoning-policies/{policyArn}/build-workflows/{buildWorkflowId}/annotations",
    input: {
      policyArn: 0,
      buildWorkflowId: 0,
      annotations: D.list(i_AutomatedReasoningPolicyAnnotation),
      lastUpdatedAnnotationSetHash: 0,
    },
    output: { updatedAt: D.ts },
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
  operationName: "UpdateAutomatedReasoningPolicyAnnotations",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /automated-reasoning-policies/{policyArn}/test-cases/{testCaseId}",
    input: {
      policyArn: 0,
      testCaseId: 0,
      guardContent: 0,
      queryContent: 0,
      lastUpdatedAt: D.tsAs("date-time"),
      expectedAggregatedFindingsResult: 0,
      confidenceThreshold: 0,
      clientRequestToken: D.m({ idempotency: true }),
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /model-customization/custom-model-deployments/{customModelDeploymentIdentifier}",
    input: { modelArn: 0, customModelDeploymentIdentifier: 0 },
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
  operationName: "UpdateCustomModelDeployment",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /guardrails/{guardrailIdentifier}",
    input: {
      guardrailIdentifier: 0,
      name: 0,
      description: 0,
      topicPolicyConfig: i_GuardrailTopicPolicyConfig,
      contentPolicyConfig: i_GuardrailContentPolicyConfig,
      wordPolicyConfig: i_GuardrailWordPolicyConfig,
      sensitiveInformationPolicyConfig:
        i_GuardrailSensitiveInformationPolicyConfig,
      contextualGroundingPolicyConfig:
        i_GuardrailContextualGroundingPolicyConfig,
      automatedReasoningPolicyConfig: i_GuardrailAutomatedReasoningPolicyConfig,
      crossRegionConfig: i_GuardrailCrossRegionConfig,
      blockedInputMessaging: 0,
      blockedOutputsMessaging: 0,
      kmsKeyId: 0,
    },
    output: { updatedAt: D.ts },
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
  operationName: "UpdateGuardrail",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /marketplace-model/endpoints/{endpointArn}",
    input: {
      endpointArn: 0,
      endpointConfig: i_EndpointConfig,
      clientRequestToken: D.m({ idempotency: true }),
    },
    output: { marketplaceModelEndpoint: o_MarketplaceModelEndpoint },
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
  operationName: "UpdateMarketplaceModelEndpoint",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /provisioned-model-throughput/{provisionedModelId}",
    input: {
      provisionedModelId: 0,
      desiredProvisionedModelName: 0,
      desiredModelId: 0,
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
  operationName: "UpdateProvisionedModelThroughput",
})) as any;

const i_AutomatedReasoningPolicyAnnotation: D.LazyStruct = () => ({
  addType: {
    name: 0,
    description: 0,
    values: D.list(i_AutomatedReasoningPolicyDefinitionTypeValue),
  },
  updateType: {
    name: 0,
    newName: 0,
    description: 0,
    values: D.list({
      addTypeValue: { value: 0, description: 0 },
      updateTypeValue: { value: 0, newValue: 0, description: 0 },
      deleteTypeValue: { value: 0 },
    }),
  },
  deleteType: { name: 0 },
  addVariable: { name: 0, type: 0, description: 0 },
  updateVariable: { name: 0, newName: 0, description: 0 },
  deleteVariable: { name: 0 },
  addRule: { expression: 0 },
  updateRule: { ruleId: 0, expression: 0 },
  deleteRule: { ruleId: 0 },
  addRuleFromNaturalLanguage: { naturalLanguage: 0 },
  updateFromRulesFeedback: { ruleIds: 0, feedback: 0 },
  updateFromScenarioFeedback: {
    ruleIds: 0,
    scenarioExpression: 0,
    feedback: 0,
  },
  ingestContent: { content: 0 },
});
const i_AutomatedReasoningPolicyBuildWorkflowDocument: D.LazyStruct = () => ({
  document: 0,
  documentContentType: 0,
  documentName: 0,
  documentDescription: 0,
});
const i_AutomatedReasoningPolicyDefinition: D.LazyStruct = () => ({
  version: 0,
  types: D.list({
    name: 0,
    description: 0,
    values: D.list(i_AutomatedReasoningPolicyDefinitionTypeValue),
  }),
  rules: D.list({ id: 0, expression: 0, alternateExpression: 0 }),
  variables: D.list({ name: 0, type: 0, description: 0 }),
});
const i_EndpointConfig: D.LazyStruct = () => ({
  sageMaker: {
    initialInstanceCount: 0,
    instanceType: 0,
    executionRole: 0,
    kmsEncryptionKey: 0,
    vpc: i_VpcConfig,
  },
});
const i_EvaluationDatasetMetricConfig: D.LazyStruct = () => ({
  taskType: 0,
  dataset: { name: 0, datasetLocation: { s3Uri: 0 } },
  metricNames: 0,
});
const i_GuardrailAutomatedReasoningPolicyConfig: D.LazyStruct = () => ({
  policies: 0,
  confidenceThreshold: 0,
});
const i_GuardrailConfiguration: D.LazyStruct = () => ({
  guardrailId: 0,
  guardrailVersion: 0,
});
const i_GuardrailContentPolicyConfig: D.LazyStruct = () => ({
  filtersConfig: D.list({
    type: 0,
    inputStrength: 0,
    outputStrength: 0,
    inputModalities: 0,
    outputModalities: 0,
    inputAction: 0,
    outputAction: 0,
    inputEnabled: 0,
    outputEnabled: 0,
  }),
  tierConfig: { tierName: 0 },
});
const i_GuardrailContextualGroundingPolicyConfig: D.LazyStruct = () => ({
  filtersConfig: D.list({ type: 0, threshold: 0, action: 0, enabled: 0 }),
});
const i_GuardrailCrossRegionConfig: D.LazyStruct = () => ({
  guardrailProfileIdentifier: 0,
});
const i_GuardrailSensitiveInformationPolicyConfig: D.LazyStruct = () => ({
  piiEntitiesConfig: D.list({
    type: 0,
    action: 0,
    inputAction: 0,
    outputAction: 0,
    inputEnabled: 0,
    outputEnabled: 0,
  }),
  regexesConfig: D.list({
    name: 0,
    description: 0,
    pattern: 0,
    action: 0,
    inputAction: 0,
    outputAction: 0,
    inputEnabled: 0,
    outputEnabled: 0,
  }),
});
const i_GuardrailTopicPolicyConfig: D.LazyStruct = () => ({
  topicsConfig: D.list({
    name: 0,
    definition: 0,
    examples: 0,
    type: 0,
    inputAction: 0,
    outputAction: 0,
    inputEnabled: 0,
    outputEnabled: 0,
  }),
  tierConfig: { tierName: 0 },
});
const i_GuardrailWordPolicyConfig: D.LazyStruct = () => ({
  wordsConfig: D.list({
    text: 0,
    inputAction: 0,
    outputAction: 0,
    inputEnabled: 0,
    outputEnabled: 0,
  }),
  managedWordListsConfig: D.list({
    type: 0,
    inputAction: 0,
    outputAction: 0,
    inputEnabled: 0,
    outputEnabled: 0,
  }),
});
const i_KbInferenceConfig: D.LazyStruct = () => ({
  textInferenceConfig: {
    temperature: 0,
    topP: 0,
    maxTokens: 0,
    stopSequences: 0,
  },
});
const i_KnowledgeBaseRetrievalConfiguration: D.LazyStruct = () => ({
  vectorSearchConfiguration: {
    numberOfResults: 0,
    overrideSearchType: 0,
    filter: i_RetrievalFilter,
    implicitFilterConfiguration: {
      metadataAttributes: D.list({ key: 0, type: 0, description: 0 }),
      modelArn: 0,
    },
    rerankingConfiguration: {
      type: 0,
      bedrockRerankingConfiguration: {
        modelConfiguration: { modelArn: 0, additionalModelRequestFields: 0 },
        numberOfRerankedResults: 0,
        metadataConfiguration: {
          selectionMode: 0,
          selectiveModeConfiguration: {
            fieldsToInclude: D.list(i_FieldForReranking),
            fieldsToExclude: D.list(i_FieldForReranking),
          },
        },
      },
    },
  },
});
const i_ModelDataSource: D.LazyStruct = () => ({ s3DataSource: { s3Uri: 0 } });
const i_PromptRouterTargetModel: D.LazyStruct = () => ({ modelArn: 0 });
const i_PromptTemplate: D.LazyStruct = () => ({ textPromptTemplate: 0 });
const i_RequestMetadataBaseFilters: D.LazyStruct = () => ({
  equals: 0,
  notEquals: 0,
});
const i_S3Config: D.LazyStruct = () => ({ bucketName: 0, keyPrefix: 0 });
const i_Tag: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_VpcConfig: D.LazyStruct = () => ({ subnetIds: 0, securityGroupIds: 0 });
const o_AutomatedReasoningPolicyAnnotation: D.LazyStruct = () => ({
  addType: {
    name: D.secret,
    description: D.secret,
    values: D.list(o_AutomatedReasoningPolicyDefinitionTypeValue),
  },
  updateType: {
    name: D.secret,
    newName: D.secret,
    description: D.secret,
    values: D.list({
      addTypeValue: { description: D.secret },
      updateTypeValue: { description: D.secret },
    }),
  },
  deleteType: { name: D.secret },
  addVariable: { name: D.secret, type: D.secret, description: D.secret },
  updateVariable: { name: D.secret, newName: D.secret, description: D.secret },
  deleteVariable: { name: D.secret },
  addRule: { expression: D.secret },
  updateRule: { expression: D.secret },
  addRuleFromNaturalLanguage: { naturalLanguage: D.secret },
  updateFromRulesFeedback: { feedback: D.secret },
  updateFromScenarioFeedback: {
    scenarioExpression: D.secret,
    feedback: D.secret,
  },
  ingestContent: { content: D.secret },
});
const o_AutomatedReasoningPolicyDefinition: D.LazyStruct = () => ({
  types: D.list(o_AutomatedReasoningPolicyDefinitionType),
  rules: D.list(o_AutomatedReasoningPolicyDefinitionRule),
  variables: D.list(o_AutomatedReasoningPolicyDefinitionVariable),
});
const o_AutomatedReasoningPolicyDefinitionRule: D.LazyStruct = () => ({
  expression: D.secret,
  alternateExpression: D.secret,
});
const o_AutomatedReasoningPolicyDefinitionType: D.LazyStruct = () => ({
  name: D.secret,
  description: D.secret,
  values: D.list(o_AutomatedReasoningPolicyDefinitionTypeValue),
});
const o_AutomatedReasoningPolicyDefinitionVariable: D.LazyStruct = () => ({
  name: D.secret,
  type: D.secret,
  description: D.secret,
});
const o_AutomatedReasoningPolicyScenario: D.LazyStruct = () => ({
  expression: D.secret,
  alternateExpression: D.secret,
});
const o_AutomatedReasoningPolicyTestCase: D.LazyStruct = () => ({
  guardContent: D.secret,
  queryContent: D.secret,
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_AutomatedReasoningPolicyTestResult: D.LazyStruct = () => ({
  testCase: o_AutomatedReasoningPolicyTestCase,
  testFindings: D.list({
    valid: {
      translation: o_AutomatedReasoningCheckTranslation,
      claimsTrueScenario: o_AutomatedReasoningCheckScenario,
      logicWarning: o_AutomatedReasoningCheckLogicWarning,
    },
    invalid: {
      translation: o_AutomatedReasoningCheckTranslation,
      logicWarning: o_AutomatedReasoningCheckLogicWarning,
    },
    satisfiable: {
      translation: o_AutomatedReasoningCheckTranslation,
      claimsTrueScenario: o_AutomatedReasoningCheckScenario,
      claimsFalseScenario: o_AutomatedReasoningCheckScenario,
      logicWarning: o_AutomatedReasoningCheckLogicWarning,
    },
    impossible: {
      translation: o_AutomatedReasoningCheckTranslation,
      logicWarning: o_AutomatedReasoningCheckLogicWarning,
    },
    translationAmbiguous: {
      options: D.list({
        translations: D.list(o_AutomatedReasoningCheckTranslation),
      }),
      differenceScenarios: D.list(o_AutomatedReasoningCheckScenario),
    },
  }),
  updatedAt: D.ts,
});
const o_EvaluationDatasetMetricConfig: D.LazyStruct = () => ({
  dataset: { name: D.secret },
  metricNames: D.list(D.secret),
});
const o_FoundationModelLifecycle: D.LazyStruct = () => ({
  startOfLifeTime: D.ts,
  endOfLifeTime: D.ts,
  legacyTime: D.ts,
  publicExtendedAccessTime: D.ts,
});
const o_MarketplaceModelEndpoint: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_PromptTemplate: D.LazyStruct = () => ({ textPromptTemplate: D.secret });
const o_StatusDetails: D.LazyStruct = () => ({
  validationDetails: { creationTime: D.ts, lastModifiedTime: D.ts },
  dataProcessingDetails: { creationTime: D.ts, lastModifiedTime: D.ts },
  trainingDetails: { creationTime: D.ts, lastModifiedTime: D.ts },
});
const i_AutomatedReasoningPolicyDefinitionTypeValue: D.LazyStruct = () => ({
  value: 0,
  description: 0,
});
const i_FieldForReranking: D.LazyStruct = () => ({ fieldName: 0 });
const i_RetrievalFilter: D.LazyStruct = () => ({
  equals: i_FilterAttribute,
  notEquals: i_FilterAttribute,
  greaterThan: i_FilterAttribute,
  greaterThanOrEquals: i_FilterAttribute,
  lessThan: i_FilterAttribute,
  lessThanOrEquals: i_FilterAttribute,
  in: i_FilterAttribute,
  notIn: i_FilterAttribute,
  startsWith: i_FilterAttribute,
  listContains: i_FilterAttribute,
  stringContains: i_FilterAttribute,
  andAll: D.list(i_RetrievalFilter),
  orAll: D.list(i_RetrievalFilter),
});
const o_AutomatedReasoningCheckLogicWarning: D.LazyStruct = () => ({
  premises: D.list(o_AutomatedReasoningLogicStatement),
  claims: D.list(o_AutomatedReasoningLogicStatement),
});
const o_AutomatedReasoningCheckScenario: D.LazyStruct = () => ({
  statements: D.list(o_AutomatedReasoningLogicStatement),
});
const o_AutomatedReasoningCheckTranslation: D.LazyStruct = () => ({
  premises: D.list(o_AutomatedReasoningLogicStatement),
  claims: D.list(o_AutomatedReasoningLogicStatement),
  untranslatedPremises: D.list(o_AutomatedReasoningCheckInputTextReference),
  untranslatedClaims: D.list(o_AutomatedReasoningCheckInputTextReference),
});
const o_AutomatedReasoningPolicyDefinitionTypeValue: D.LazyStruct = () => ({
  description: D.secret,
});
const i_FilterAttribute: D.LazyStruct = () => ({ key: 0, value: 0 });
const o_AutomatedReasoningCheckInputTextReference: D.LazyStruct = () => ({
  text: D.secret,
});
const o_AutomatedReasoningLogicStatement: D.LazyStruct = () => ({
  logic: D.secret,
  naturalLanguage: D.secret,
});
