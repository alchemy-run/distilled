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
  sdkId: "CleanRooms",
  target: "AWSBastionControlPlaneServiceLambda",
  version: "2022-02-17",
  sigv4: "cleanrooms",
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
                `https://cleanrooms-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://cleanrooms-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://cleanrooms.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://cleanrooms.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message?: string; readonly reason?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message?: string;
    readonly resourceId?: string;
    readonly resourceType?: string;
    readonly reason?: string;
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
    readonly message: string;
    readonly resourceId: string;
    readonly resourceType: string;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message: string;
    readonly quotaName: string;
    readonly quotaValue: number;
  }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly reason?: string;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type CollaborationIdentifier = string;
export type AnalysisTemplateArn = string;
export type AnalysisTemplateArnList = string[];
export interface BatchGetCollaborationAnalysisTemplateInput {
  collaborationIdentifier: string;
  analysisTemplateArns: string[];
}
export type AnalysisTemplateIdentifier = string;
export type UUID = string;
export type CollaborationArn = string;
export type ResourceDescription = string;
export type AccountId = string;
export type ResourceAlias = string;
export type TableAlias = string;
export type QueryTables = string[];
export interface AnalysisSchema {
  referencedTables?: string[];
}
export type AnalysisFormat = "SQL" | "PYSPARK_1_0" | (string & {});
export type AnalysisTemplateText = string | redacted.Redacted<string>;
export interface S3Location {
  bucket: string;
  key: string;
}
export interface AnalysisTemplateArtifact {
  location: S3Location;
}
export type AnalysisTemplateArtifactList = AnalysisTemplateArtifact[];
export type RoleArn = string;
export interface AnalysisTemplateArtifacts {
  entryPoint: AnalysisTemplateArtifact;
  additionalArtifacts?: AnalysisTemplateArtifact[];
  roleArn: string;
}
export type AnalysisSource =
  | { text: string | redacted.Redacted<string>; artifacts?: never }
  | { text?: never; artifacts: AnalysisTemplateArtifacts };
export interface Hash {
  sha256?: string;
}
export type HashList = Hash[];
export interface AnalysisTemplateArtifactMetadata {
  entryPointHash: Hash;
  additionalArtifactHashes?: Hash[];
}
export type AnalysisSourceMetadata = {
  artifacts: AnalysisTemplateArtifactMetadata;
};
export type ParameterName = string;
export type ParameterType =
  | "SMALLINT"
  | "INTEGER"
  | "BIGINT"
  | "DECIMAL"
  | "REAL"
  | "DOUBLE_PRECISION"
  | "BOOLEAN"
  | "CHAR"
  | "VARCHAR"
  | "DATE"
  | "TIMESTAMP"
  | "TIMESTAMPTZ"
  | "TIME"
  | "TIMETZ"
  | "VARBYTE"
  | "BINARY"
  | "BYTE"
  | "CHARACTER"
  | "DOUBLE"
  | "FLOAT"
  | "INT"
  | "LONG"
  | "NUMERIC"
  | "SHORT"
  | "STRING"
  | "TIMESTAMP_LTZ"
  | "TIMESTAMP_NTZ"
  | "TINYINT"
  | (string & {});
export type ParameterValue = string;
export interface AnalysisParameter {
  name: string;
  type: ParameterType;
  defaultValue?: string;
}
export type AnalysisParameterList = AnalysisParameter[];
export type AnalysisTemplateValidationType =
  | "DIFFERENTIAL_PRIVACY"
  | (string & {});
export type AnalysisTemplateValidationStatus =
  | "VALID"
  | "INVALID"
  | "UNABLE_TO_VALIDATE"
  | (string & {});
export interface AnalysisTemplateValidationStatusReason {
  message: string;
}
export type AnalysisTemplateValidationStatusReasonList =
  AnalysisTemplateValidationStatusReason[];
export interface AnalysisTemplateValidationStatusDetail {
  type: AnalysisTemplateValidationType;
  status: AnalysisTemplateValidationStatus;
  reasons?: AnalysisTemplateValidationStatusReason[];
}
export type AnalysisTemplateValidationStatusDetailList =
  AnalysisTemplateValidationStatusDetail[];
export type ErrorMessageType = "DETAILED" | (string & {});
export interface ErrorMessageConfiguration {
  type: ErrorMessageType;
}
export type MaxMembershipInferenceAttackScore = number;
export type SyntheticDataColumnName = string;
export type SyntheticDataColumnType =
  | "CATEGORICAL"
  | "NUMERICAL"
  | (string & {});
export interface SyntheticDataColumnProperties {
  columnName: string;
  columnType: SyntheticDataColumnType;
  isPredictiveValue: boolean;
}
export type ColumnMappingList = SyntheticDataColumnProperties[];
export interface ColumnClassificationDetails {
  columnMapping: SyntheticDataColumnProperties[];
}
export interface MLSyntheticDataParameters {
  epsilon: number;
  maxMembershipInferenceAttackScore: number;
  columnClassification: ColumnClassificationDetails;
}
export type SyntheticDataParameters = {
  mlSyntheticDataParameters: MLSyntheticDataParameters;
};
export interface CollaborationAnalysisTemplate {
  id: string;
  arn: string;
  collaborationId: string;
  collaborationArn: string;
  description?: string;
  creatorAccountId: string;
  name: string;
  createTime: Date;
  updateTime: Date;
  schema: AnalysisSchema;
  format: AnalysisFormat;
  source?: AnalysisSource;
  sourceMetadata?: AnalysisSourceMetadata;
  analysisParameters?: AnalysisParameter[];
  validations?: AnalysisTemplateValidationStatusDetail[];
  errorMessageConfiguration?: ErrorMessageConfiguration;
  syntheticDataParameters?: SyntheticDataParameters;
}
export type CollaborationAnalysisTemplateList = CollaborationAnalysisTemplate[];
export interface BatchGetCollaborationAnalysisTemplateError_ {
  arn: string;
  code: string;
  message: string;
}
export type BatchGetCollaborationAnalysisTemplateErrorList =
  BatchGetCollaborationAnalysisTemplateError_[];
export interface BatchGetCollaborationAnalysisTemplateOutput {
  collaborationAnalysisTemplates: CollaborationAnalysisTemplate[];
  errors: BatchGetCollaborationAnalysisTemplateError_[];
}
export type TableAliasList = string[];
export interface BatchGetSchemaInput {
  collaborationIdentifier: string;
  names: string[];
}
export type ColumnName = string;
export type ColumnTypeString = string;
export interface Column {
  name: string;
  type: string;
}
export type ColumnList = Column[];
export type AnalysisRuleType =
  | "AGGREGATION"
  | "LIST"
  | "CUSTOM"
  | "ID_MAPPING_TABLE"
  | (string & {});
export type AnalysisRuleTypeList = AnalysisRuleType[];
export type AnalysisMethod =
  | "DIRECT_QUERY"
  | "DIRECT_JOB"
  | "MULTIPLE"
  | (string & {});
export type SelectedAnalysisMethod =
  | "DIRECT_QUERY"
  | "DIRECT_JOB"
  | (string & {});
export type SelectedAnalysisMethods = SelectedAnalysisMethod[];
export type TableDescription = string;
export type SchemaType =
  | "TABLE"
  | "ID_MAPPING_TABLE"
  | "INTERMEDIATE_TABLE"
  | (string & {});
export type SchemaStatus = "READY" | "NOT_READY" | (string & {});
export type SchemaStatusReasonCode =
  | "ANALYSIS_RULE_MISSING"
  | "ANALYSIS_TEMPLATES_NOT_CONFIGURED"
  | "ANALYSIS_PROVIDERS_NOT_CONFIGURED"
  | "DIFFERENTIAL_PRIVACY_POLICY_NOT_CONFIGURED"
  | "ID_MAPPING_TABLE_NOT_POPULATED"
  | "COLLABORATION_ANALYSIS_RULE_NOT_CONFIGURED"
  | "ADDITIONAL_ANALYSES_NOT_CONFIGURED"
  | "RESULT_RECEIVERS_NOT_CONFIGURED"
  | "ADDITIONAL_ANALYSES_NOT_ALLOWED"
  | "RESULT_RECEIVERS_NOT_ALLOWED"
  | "ANALYSIS_RULE_TYPES_NOT_COMPATIBLE"
  | "INTERMEDIATE_TABLE_NOT_POPULATED"
  | "INTERMEDIATE_TABLE_ANALYSIS_RULE_MISSING"
  | "INTERMEDIATE_TABLE_BASE_TABLE_REMOVED"
  | "INTERMEDIATE_TABLE_INHERITED_CONSTRAINTS_VIOLATED"
  | "INTERMEDIATE_TABLE_DISALLOWED_BY_DATA_PROVIDER"
  | "INTERMEDIATE_TABLE_RETENTION_PERIOD_EXPIRED"
  | (string & {});
export interface SchemaStatusReason {
  code: SchemaStatusReasonCode;
  message: string;
}
export type SchemaStatusReasonList = SchemaStatusReason[];
export type SchemaConfiguration = "DIFFERENTIAL_PRIVACY" | (string & {});
export type SchemaConfigurationList = SchemaConfiguration[];
export type AnalysisType =
  | "DIRECT_ANALYSIS"
  | "ADDITIONAL_ANALYSIS"
  | (string & {});
export interface SchemaStatusDetail {
  status: SchemaStatus;
  reasons?: SchemaStatusReason[];
  analysisRuleType?: AnalysisRuleType;
  configurations?: SchemaConfiguration[];
  analysisType: AnalysisType;
}
export type SchemaStatusDetailList = SchemaStatusDetail[];
export type SchemaResourceArn = string;
export type IdNamespaceType = "SOURCE" | "TARGET" | (string & {});
export interface IdMappingTableInputSource {
  idNamespaceAssociationId: string;
  type: IdNamespaceType;
}
export type IdMappingTableInputSourceList = IdMappingTableInputSource[];
export interface IdMappingTableSchemaTypeProperties {
  idMappingTableInputSource: IdMappingTableInputSource[];
  idMappingTableId?: string;
}
export interface IntermediateTableSchemaTypeProperties {
  intermediateTableId: string;
}
export interface ConfiguredTableAssociationSchemaTypeProperties {
  configuredTableAssociationId: string;
}
export type SchemaTypeProperties =
  | {
      idMappingTable: IdMappingTableSchemaTypeProperties;
      intermediateTable?: never;
      configuredTableAssociation?: never;
    }
  | {
      idMappingTable?: never;
      intermediateTable: IntermediateTableSchemaTypeProperties;
      configuredTableAssociation?: never;
    }
  | {
      idMappingTable?: never;
      intermediateTable?: never;
      configuredTableAssociation: ConfiguredTableAssociationSchemaTypeProperties;
    };
export interface Schema {
  columns: Column[];
  partitionKeys: Column[];
  analysisRuleTypes: AnalysisRuleType[];
  analysisMethod?: AnalysisMethod;
  selectedAnalysisMethods?: SelectedAnalysisMethod[];
  creatorAccountId: string;
  name: string;
  collaborationId: string;
  collaborationArn: string;
  description: string;
  createTime: Date;
  updateTime: Date;
  type: SchemaType;
  schemaStatusDetails: SchemaStatusDetail[];
  resourceArn?: string;
  schemaTypeProperties?: SchemaTypeProperties;
}
export type SchemaList = Schema[];
export interface BatchGetSchemaError_ {
  name: string;
  code: string;
  message: string;
}
export type BatchGetSchemaErrorList = BatchGetSchemaError_[];
export interface BatchGetSchemaOutput {
  schemas: Schema[];
  errors: BatchGetSchemaError_[];
}
export interface SchemaAnalysisRuleRequest {
  name: string;
  type: AnalysisRuleType;
}
export type SchemaAnalysisRuleRequestList = SchemaAnalysisRuleRequest[];
export interface BatchGetSchemaAnalysisRuleInput {
  collaborationIdentifier: string;
  schemaAnalysisRuleRequests: SchemaAnalysisRuleRequest[];
}
export type AnalysisRuleColumnName = string;
export type AnalysisRuleColumnList = string[];
export type JoinOperator = string;
export type JoinOperatorsList = string[];
export type AdditionalAnalyses =
  | "ALLOWED"
  | "REQUIRED"
  | "NOT_ALLOWED"
  | (string & {});
export interface AnalysisRuleList {
  joinColumns: string[];
  allowedJoinOperators?: string[];
  listColumns: string[];
  additionalAnalyses?: AdditionalAnalyses;
}
export type AnalysisRuleColumnNameList = string[];
export type AggregateFunctionName = string;
export interface AggregateColumn {
  columnNames: string[];
  function: string;
}
export type AggregateColumnList = AggregateColumn[];
export type JoinRequiredOption = string;
export type ScalarFunctions = string;
export type ScalarFunctionsList = string[];
export type AggregationType = string;
export interface AggregationConstraint {
  columnName: string;
  minimum: number;
  type: string;
}
export type AggregationConstraints = AggregationConstraint[];
export interface AnalysisRuleAggregation {
  aggregateColumns: AggregateColumn[];
  joinColumns: string[];
  joinRequired?: string;
  allowedJoinOperators?: string[];
  dimensionColumns: string[];
  scalarFunctions: string[];
  outputConstraints: AggregationConstraint[];
  additionalAnalyses?: AdditionalAnalyses;
}
export type AnalysisTemplateArnOrQueryWildcard = string;
export type AllowedAnalysesList = string[];
export type AllowedAnalysisProviderList = string[];
export interface DifferentialPrivacyColumn {
  name: string;
}
export type DifferentialPrivacyColumnList = DifferentialPrivacyColumn[];
export interface DifferentialPrivacyConfiguration {
  columns: DifferentialPrivacyColumn[];
}
export type AggregationThresholdType = "COUNT_DISTINCT" | (string & {});
export interface OutputColumnThreshold {
  outputColumnName: string;
  minimumIdentityCount: number;
}
export type OutputColumnThresholdList = OutputColumnThreshold[];
export type AllowedAggregateExpressionType =
  | "COLUMNS_ONLY"
  | "ANY_EXPRESSION"
  | (string & {});
export interface AggregationThreshold {
  identityColumns: string[];
  minimumIdentityCount: number;
  type: AggregationThresholdType;
  outputColumnThresholds?: OutputColumnThreshold[];
  allowedAggregateExpressionType: AllowedAggregateExpressionType;
}
export type AggregationThresholdList = AggregationThreshold[];
export interface ComparisonControls {
  allowedLiteralComparisonColumns: string[];
  allowedColumnComparisonColumns: string[];
}
export type AllowedResultReceivers = string[];
export type AdditionalAnalysesResourceArn = string;
export type AllowedAdditionalAnalyses = string[];
export interface AnalysisRuleCustom {
  allowedAnalyses: string[];
  allowedAnalysisProviders?: string[];
  additionalAnalyses?: AdditionalAnalyses;
  disallowedOutputColumns?: string[];
  differentialPrivacy?: DifferentialPrivacyConfiguration;
  aggregationThresholds?: AggregationThreshold[];
  comparisonControls?: ComparisonControls;
  allowedResultReceivers?: string[];
  allowedAdditionalAnalyses?: string[];
}
export interface QueryConstraintRequireOverlap {
  columns?: string[];
}
export type QueryConstraint = { requireOverlap: QueryConstraintRequireOverlap };
export type QueryConstraintList = QueryConstraint[];
export interface AnalysisRuleIdMappingTable {
  joinColumns: string[];
  queryConstraints: QueryConstraint[];
  dimensionColumns?: string[];
}
export type AnalysisRulePolicyV1 =
  | {
      list: AnalysisRuleList;
      aggregation?: never;
      custom?: never;
      idMappingTable?: never;
    }
  | {
      list?: never;
      aggregation: AnalysisRuleAggregation;
      custom?: never;
      idMappingTable?: never;
    }
  | {
      list?: never;
      aggregation?: never;
      custom: AnalysisRuleCustom;
      idMappingTable?: never;
    }
  | {
      list?: never;
      aggregation?: never;
      custom?: never;
      idMappingTable: AnalysisRuleIdMappingTable;
    };
export type AnalysisRulePolicy = { v1: AnalysisRulePolicyV1 };
export interface ConfiguredTableAssociationAnalysisRuleList {
  allowedResultReceivers?: string[];
  allowedAdditionalAnalyses?: string[];
}
export interface ConfiguredTableAssociationAnalysisRuleAggregation {
  allowedResultReceivers?: string[];
  allowedAdditionalAnalyses?: string[];
}
export interface ConfiguredTableAssociationAnalysisRuleCustom {
  allowedResultReceivers?: string[];
  allowedAdditionalAnalyses?: string[];
}
export type ConfiguredTableAssociationAnalysisRulePolicyV1 =
  | {
      list: ConfiguredTableAssociationAnalysisRuleList;
      aggregation?: never;
      custom?: never;
    }
  | {
      list?: never;
      aggregation: ConfiguredTableAssociationAnalysisRuleAggregation;
      custom?: never;
    }
  | {
      list?: never;
      aggregation?: never;
      custom: ConfiguredTableAssociationAnalysisRuleCustom;
    };
export type ConfiguredTableAssociationAnalysisRulePolicy = {
  v1: ConfiguredTableAssociationAnalysisRulePolicyV1;
};
export interface ConsolidatedPolicyList {
  joinColumns: string[];
  allowedJoinOperators?: string[];
  listColumns: string[];
  additionalAnalyses?: AdditionalAnalyses;
  allowedResultReceivers?: string[];
  allowedAdditionalAnalyses?: string[];
}
export interface ConsolidatedPolicyAggregation {
  aggregateColumns: AggregateColumn[];
  joinColumns: string[];
  joinRequired?: string;
  allowedJoinOperators?: string[];
  dimensionColumns: string[];
  scalarFunctions: string[];
  outputConstraints: AggregationConstraint[];
  additionalAnalyses?: AdditionalAnalyses;
  allowedResultReceivers?: string[];
  allowedAdditionalAnalyses?: string[];
}
export interface ConsolidatedPolicyCustom {
  allowedAnalyses: string[];
  allowedAnalysisProviders?: string[];
  additionalAnalyses?: AdditionalAnalyses;
  disallowedOutputColumns?: string[];
  differentialPrivacy?: DifferentialPrivacyConfiguration;
  aggregationThresholds?: AggregationThreshold[];
  comparisonControls?: ComparisonControls;
  allowedResultReceivers?: string[];
  allowedAdditionalAnalyses?: string[];
}
export type ConsolidatedPolicyV1 =
  | { list: ConsolidatedPolicyList; aggregation?: never; custom?: never }
  | { list?: never; aggregation: ConsolidatedPolicyAggregation; custom?: never }
  | { list?: never; aggregation?: never; custom: ConsolidatedPolicyCustom };
export type ConsolidatedPolicy = { v1: ConsolidatedPolicyV1 };
export interface AnalysisRule {
  collaborationId: string;
  type: AnalysisRuleType;
  name: string;
  createTime: Date;
  updateTime: Date;
  policy: AnalysisRulePolicy;
  collaborationPolicy?: ConfiguredTableAssociationAnalysisRulePolicy;
  consolidatedPolicy?: ConsolidatedPolicy;
}
export type SchemaAnalysisRuleList = AnalysisRule[];
export interface BatchGetSchemaAnalysisRuleError_ {
  name: string;
  type: AnalysisRuleType;
  code: string;
  message: string;
}
export type BatchGetSchemaAnalysisRuleErrorList =
  BatchGetSchemaAnalysisRuleError_[];
export interface BatchGetSchemaAnalysisRuleOutput {
  analysisRules: AnalysisRule[];
  errors: BatchGetSchemaAnalysisRuleError_[];
}
export type MembershipIdentifier = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateAnalysisTemplateInput {
  description?: string;
  membershipIdentifier: string;
  name: string;
  format: AnalysisFormat;
  source: AnalysisSource;
  tags?: { [key: string]: string | undefined };
  analysisParameters?: AnalysisParameter[];
  schema?: AnalysisSchema;
  errorMessageConfiguration?: ErrorMessageConfiguration;
  syntheticDataParameters?: SyntheticDataParameters;
}
export type MembershipArn = string;
export interface AnalysisTemplate {
  id: string;
  arn: string;
  collaborationId: string;
  collaborationArn: string;
  membershipId: string;
  membershipArn: string;
  description?: string;
  name: string;
  createTime: Date;
  updateTime: Date;
  schema: AnalysisSchema;
  format: AnalysisFormat;
  source: AnalysisSource;
  sourceMetadata?: AnalysisSourceMetadata;
  analysisParameters?: AnalysisParameter[];
  validations?: AnalysisTemplateValidationStatusDetail[];
  errorMessageConfiguration?: ErrorMessageConfiguration;
  syntheticDataParameters?: SyntheticDataParameters;
}
export interface CreateAnalysisTemplateOutput {
  analysisTemplate: AnalysisTemplate;
}
export type MemberAbility =
  | "CAN_QUERY"
  | "CAN_RECEIVE_RESULTS"
  | "CAN_RUN_JOB"
  | "CAN_EXPORT_QUERY_ANALYSIS_LOG"
  | (string & {});
export type MemberAbilities = MemberAbility[];
export type CustomMLMemberAbility =
  | "CAN_RECEIVE_MODEL_OUTPUT"
  | "CAN_RECEIVE_INFERENCE_OUTPUT"
  | (string & {});
export type CustomMLMemberAbilities = CustomMLMemberAbility[];
export interface MLMemberAbilities {
  customMLMemberAbilities: CustomMLMemberAbility[];
}
export type DisplayName = string;
export interface QueryComputePaymentConfig {
  isResponsible: boolean;
}
export interface ModelTrainingPaymentConfig {
  isResponsible: boolean;
}
export interface ModelInferencePaymentConfig {
  isResponsible: boolean;
}
export interface SyntheticDataGenerationPaymentConfig {
  isResponsible: boolean;
}
export interface MLPaymentConfig {
  modelTraining?: ModelTrainingPaymentConfig;
  modelInference?: ModelInferencePaymentConfig;
  syntheticDataGeneration?: SyntheticDataGenerationPaymentConfig;
}
export interface JobComputePaymentConfig {
  isResponsible: boolean;
}
export interface PaymentConfiguration {
  queryCompute: QueryComputePaymentConfig;
  machineLearning?: MLPaymentConfig;
  jobCompute?: JobComputePaymentConfig;
}
export interface MemberSpecification {
  accountId: string;
  memberAbilities: MemberAbility[];
  mlMemberAbilities?: MLMemberAbilities;
  displayName: string;
  paymentConfiguration?: PaymentConfiguration;
}
export type MemberList = MemberSpecification[];
export type CollaborationName = string;
export type CollaborationDescription = string;
export interface DataEncryptionMetadata {
  allowCleartext: boolean;
  allowDuplicates: boolean;
  allowJoinsOnColumnsWithDifferentNames: boolean;
  preserveNulls: boolean;
}
export type CollaborationQueryLogStatus =
  | "ENABLED"
  | "DISABLED"
  | (string & {});
export type CollaborationJobLogStatus = "ENABLED" | "DISABLED" | (string & {});
export type AnalyticsEngine = "SPARK" | "CLEAN_ROOMS_SQL" | (string & {});
export type AutoApprovedChangeType =
  | "ADD_MEMBER"
  | "GRANT_RECEIVE_RESULTS_ABILITY"
  | "REVOKE_RECEIVE_RESULTS_ABILITY"
  | "GRANT_EXPORT_QUERY_ANALYSIS_LOG_ABILITY"
  | "REVOKE_EXPORT_QUERY_ANALYSIS_LOG_ABILITY"
  | (string & {});
export type AutoApprovedChangeTypeList = AutoApprovedChangeType[];
export type SupportedS3Region =
  | "us-west-1"
  | "us-west-2"
  | "us-east-1"
  | "us-east-2"
  | "af-south-1"
  | "ap-east-1"
  | "ap-east-2"
  | "ap-south-2"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-southeast-3"
  | "ap-southeast-5"
  | "ap-southeast-4"
  | "ap-southeast-7"
  | "ap-south-1"
  | "ap-northeast-3"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ca-central-1"
  | "ca-west-1"
  | "eu-south-1"
  | "eu-west-3"
  | "eu-south-2"
  | "eu-central-2"
  | "eu-central-1"
  | "eu-north-1"
  | "eu-west-1"
  | "eu-west-2"
  | "me-south-1"
  | "me-central-1"
  | "il-central-1"
  | "sa-east-1"
  | "mx-central-1"
  | (string & {});
export type AllowedResultRegions = SupportedS3Region[];
export interface CreateCollaborationInput {
  members: MemberSpecification[];
  name: string;
  description?: string;
  creatorMemberAbilities: MemberAbility[];
  creatorMLMemberAbilities?: MLMemberAbilities;
  creatorDisplayName: string;
  dataEncryptionMetadata?: DataEncryptionMetadata;
  queryLogStatus: CollaborationQueryLogStatus;
  jobLogStatus?: CollaborationJobLogStatus;
  tags?: { [key: string]: string | undefined };
  creatorPaymentConfiguration?: PaymentConfiguration;
  analyticsEngine?: AnalyticsEngine;
  autoApprovedChangeRequestTypes?: AutoApprovedChangeType[];
  allowedResultRegions?: SupportedS3Region[];
  isMetricsEnabled?: boolean;
}
export type MemberStatus = string;
export interface Collaboration {
  id: string;
  arn: string;
  name: string;
  description?: string;
  creatorAccountId: string;
  creatorDisplayName: string;
  createTime: Date;
  updateTime: Date;
  memberStatus: string;
  membershipId?: string;
  membershipArn?: string;
  dataEncryptionMetadata?: DataEncryptionMetadata;
  queryLogStatus: CollaborationQueryLogStatus;
  jobLogStatus?: CollaborationJobLogStatus;
  analyticsEngine?: AnalyticsEngine;
  autoApprovedChangeTypes?: AutoApprovedChangeType[];
  allowedResultRegions?: SupportedS3Region[];
  isMetricsEnabled?: boolean;
}
export interface CreateCollaborationOutput {
  collaboration: Collaboration;
}
export type ChangeSpecificationType =
  | "MEMBER"
  | "COLLABORATION"
  | (string & {});
export interface MemberChangeSpecification {
  accountId: string;
  memberAbilities: MemberAbility[];
  mlMemberAbilities?: MLMemberAbilities;
  paymentConfiguration?: PaymentConfiguration;
  displayName?: string;
}
export interface CollaborationChangeSpecification {
  autoApprovedChangeTypes?: AutoApprovedChangeType[];
}
export type ChangeSpecification =
  | { member: MemberChangeSpecification; collaboration?: never }
  | { member?: never; collaboration: CollaborationChangeSpecification };
export interface ChangeInput {
  specificationType: ChangeSpecificationType;
  specification: ChangeSpecification;
}
export type ChangeInputList = ChangeInput[];
export interface CreateCollaborationChangeRequestInput {
  collaborationIdentifier: string;
  changes: ChangeInput[];
}
export type ChangeRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "CANCELLED"
  | "DENIED"
  | "COMMITTED"
  | (string & {});
export type ChangeType =
  | "ADD_MEMBER"
  | "GRANT_RECEIVE_RESULTS_ABILITY"
  | "REVOKE_RECEIVE_RESULTS_ABILITY"
  | "EDIT_AUTO_APPROVED_CHANGE_TYPES"
  | "ADD_PAYER_CANDIDATE"
  | "REMOVE_PAYER_CANDIDATE"
  | "GRANT_CAN_RECEIVE_MODEL_OUTPUT"
  | "GRANT_CAN_RECEIVE_INFERENCE_OUTPUT"
  | "REVOKE_CAN_RECEIVE_MODEL_OUTPUT"
  | "REVOKE_CAN_RECEIVE_INFERENCE_OUTPUT"
  | "GRANT_EXPORT_QUERY_ANALYSIS_LOG_ABILITY"
  | "REVOKE_EXPORT_QUERY_ANALYSIS_LOG_ABILITY"
  | (string & {});
export type ChangeTypeList = ChangeType[];
export interface Change {
  specificationType: ChangeSpecificationType;
  specification: ChangeSpecification;
  types: ChangeType[];
}
export type ChangeList = Change[];
export type ApprovalStatus = "APPROVED" | "DENIED" | "PENDING" | (string & {});
export interface ApprovalStatusDetails {
  status: ApprovalStatus;
}
export type ApprovalStatuses = {
  [key: string]: ApprovalStatusDetails | undefined;
};
export interface CollaborationChangeRequest {
  id: string;
  collaborationId: string;
  createTime: Date;
  updateTime: Date;
  status: ChangeRequestStatus;
  isAutoApproved: boolean;
  changes: Change[];
  approvals?: { [key: string]: ApprovalStatusDetails | undefined };
}
export interface CreateCollaborationChangeRequestOutput {
  collaborationChangeRequest: CollaborationChangeRequest;
}
export type ConfiguredAudienceModelArn = string;
export type ConfiguredAudienceModelAssociationName = string;
export interface CreateConfiguredAudienceModelAssociationInput {
  membershipIdentifier: string;
  configuredAudienceModelArn: string;
  configuredAudienceModelAssociationName: string;
  manageResourcePolicies: boolean;
  tags?: { [key: string]: string | undefined };
  description?: string;
}
export type ConfiguredAudienceModelAssociationIdentifier = string;
export type ConfiguredAudienceModelAssociationArn = string;
export interface ConfiguredAudienceModelAssociation {
  id: string;
  arn: string;
  configuredAudienceModelArn: string;
  membershipId: string;
  membershipArn: string;
  collaborationId: string;
  collaborationArn: string;
  name: string;
  manageResourcePolicies: boolean;
  description?: string;
  createTime: Date;
  updateTime: Date;
}
export interface CreateConfiguredAudienceModelAssociationOutput {
  configuredAudienceModelAssociation: ConfiguredAudienceModelAssociation;
}
export type CommercialRegion =
  | "us-west-1"
  | "us-west-2"
  | "us-east-1"
  | "us-east-2"
  | "af-south-1"
  | "ap-east-1"
  | "ap-south-2"
  | "ap-southeast-1"
  | "ap-southeast-2"
  | "ap-southeast-3"
  | "ap-southeast-5"
  | "ap-southeast-4"
  | "ap-southeast-7"
  | "ap-south-1"
  | "ap-northeast-3"
  | "ap-northeast-1"
  | "ap-northeast-2"
  | "ca-central-1"
  | "ca-west-1"
  | "eu-south-1"
  | "eu-west-3"
  | "eu-south-2"
  | "eu-central-2"
  | "eu-central-1"
  | "eu-north-1"
  | "eu-west-1"
  | "eu-west-2"
  | "me-south-1"
  | "me-central-1"
  | "il-central-1"
  | "sa-east-1"
  | "mx-central-1"
  | "ap-east-2"
  | (string & {});
export type GlueTableName = string;
export type GlueDatabaseName = string;
export interface GlueTableReference {
  region?: CommercialRegion;
  tableName: string;
  databaseName: string;
}
export type SecretsManagerArn = string;
export type SnowflakeAccountIdentifier = string;
export type SnowflakeDatabaseName = string;
export type SnowflakeTableName = string;
export type SnowflakeSchemaName = string;
export interface SnowflakeTableSchemaV1 {
  columnName: string;
  columnType: string;
}
export type SnowflakeTableSchemaList = SnowflakeTableSchemaV1[];
export type SnowflakeTableSchema = { v1: SnowflakeTableSchemaV1[] };
export interface SnowflakeTableReference {
  secretArn: string;
  accountIdentifier: string;
  databaseName: string;
  tableName: string;
  schemaName: string;
  tableSchema: SnowflakeTableSchema;
}
export type AthenaWorkGroup = string;
export type AthenaOutputLocation = string;
export type AthenaDatabaseName = string;
export type AthenaTableName = string;
export type AthenaCatalogName = string;
export interface AthenaTableReference {
  region?: CommercialRegion;
  workGroup: string;
  outputLocation?: string;
  databaseName: string;
  tableName: string;
  catalogName?: string;
}
export type TableReference =
  | { glue: GlueTableReference; snowflake?: never; athena?: never }
  | { glue?: never; snowflake: SnowflakeTableReference; athena?: never }
  | { glue?: never; snowflake?: never; athena: AthenaTableReference };
export type AllowedColumnList = string[];
export interface CreateConfiguredTableInput {
  name: string;
  description?: string;
  tableReference: TableReference;
  allowedColumns: string[];
  analysisMethod: AnalysisMethod;
  selectedAnalysisMethods?: SelectedAnalysisMethod[];
  tags?: { [key: string]: string | undefined };
}
export type ConfiguredTableArn = string;
export type ConfiguredTableAnalysisRuleType =
  | "AGGREGATION"
  | "LIST"
  | "CUSTOM"
  | (string & {});
export type ConfiguredTableAnalysisRuleTypeList =
  ConfiguredTableAnalysisRuleType[];
export interface ConfiguredTable {
  id: string;
  arn: string;
  name: string;
  description?: string;
  tableReference: TableReference;
  createTime: Date;
  updateTime: Date;
  analysisRuleTypes: ConfiguredTableAnalysisRuleType[];
  analysisMethod: AnalysisMethod;
  allowedColumns: string[];
  selectedAnalysisMethods?: SelectedAnalysisMethod[];
}
export interface CreateConfiguredTableOutput {
  configuredTable: ConfiguredTable;
}
export type ConfiguredTableIdentifier = string;
export type ConfiguredTableAnalysisRulePolicyV1 =
  | { list: AnalysisRuleList; aggregation?: never; custom?: never }
  | { list?: never; aggregation: AnalysisRuleAggregation; custom?: never }
  | { list?: never; aggregation?: never; custom: AnalysisRuleCustom };
export type ConfiguredTableAnalysisRulePolicy = {
  v1: ConfiguredTableAnalysisRulePolicyV1;
};
export interface CreateConfiguredTableAnalysisRuleInput {
  configuredTableIdentifier: string;
  analysisRuleType: ConfiguredTableAnalysisRuleType;
  analysisRulePolicy: ConfiguredTableAnalysisRulePolicy;
}
export interface ConfiguredTableAnalysisRule {
  configuredTableId: string;
  configuredTableArn: string;
  policy: ConfiguredTableAnalysisRulePolicy;
  type: ConfiguredTableAnalysisRuleType;
  createTime: Date;
  updateTime: Date;
}
export interface CreateConfiguredTableAnalysisRuleOutput {
  analysisRule: ConfiguredTableAnalysisRule;
}
export interface CreateConfiguredTableAssociationInput {
  name: string;
  description?: string;
  membershipIdentifier: string;
  configuredTableIdentifier: string;
  roleArn: string;
  tags?: { [key: string]: string | undefined };
}
export type ConfiguredTableAssociationArn = string;
export type ConfiguredTableAssociationAnalysisRuleType =
  | "AGGREGATION"
  | "LIST"
  | "CUSTOM"
  | (string & {});
export type ConfiguredTableAssociationAnalysisRuleTypeList =
  ConfiguredTableAssociationAnalysisRuleType[];
export type ChildResourceType = "INTERMEDIATE_TABLE" | (string & {});
export type ResourceStatus =
  | "CREATED"
  | "POPULATE_STARTED"
  | "POPULATE_SUCCESS"
  | "POPULATE_FAILED"
  | "DISALLOWED_BY_DATA_PROVIDER"
  | "BASE_TABLE_REMOVED"
  | "RETENTION_PERIOD_EXPIRED"
  | (string & {});
export interface ChildResource {
  resourceId?: string;
  resourceType: ChildResourceType;
  resourceName: string;
  ownerAccountId: string;
  resourceStatus?: ResourceStatus;
}
export type ChildResourceList = ChildResource[];
export interface ConfiguredTableAssociation {
  arn: string;
  id: string;
  configuredTableId: string;
  configuredTableArn: string;
  membershipId: string;
  membershipArn: string;
  roleArn: string;
  name: string;
  description?: string;
  analysisRuleTypes?: ConfiguredTableAssociationAnalysisRuleType[];
  createTime: Date;
  updateTime: Date;
  childResources?: ChildResource[];
}
export interface CreateConfiguredTableAssociationOutput {
  configuredTableAssociation: ConfiguredTableAssociation;
}
export type ConfiguredTableAssociationIdentifier = string;
export interface CreateConfiguredTableAssociationAnalysisRuleInput {
  membershipIdentifier: string;
  configuredTableAssociationIdentifier: string;
  analysisRuleType: ConfiguredTableAssociationAnalysisRuleType;
  analysisRulePolicy: ConfiguredTableAssociationAnalysisRulePolicy;
}
export interface ConfiguredTableAssociationAnalysisRule {
  membershipIdentifier: string;
  configuredTableAssociationId: string;
  configuredTableAssociationArn: string;
  policy: ConfiguredTableAssociationAnalysisRulePolicy;
  type: ConfiguredTableAssociationAnalysisRuleType;
  createTime: Date;
  updateTime: Date;
}
export interface CreateConfiguredTableAssociationAnalysisRuleOutput {
  analysisRule: ConfiguredTableAssociationAnalysisRule;
}
export type IdMappingTableInputReferenceArn = string;
export interface IdMappingTableInputReferenceConfig {
  inputReferenceArn: string;
  manageResourcePolicies: boolean;
}
export type KMSKeyArn = string;
export interface CreateIdMappingTableInput {
  membershipIdentifier: string;
  name: string;
  description?: string;
  inputReferenceConfig: IdMappingTableInputReferenceConfig;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
}
export type IdMappingTableArn = string;
export interface IdMappingTableInputReferenceProperties {
  idMappingTableInputSource: IdMappingTableInputSource[];
}
export interface IdMappingTable {
  id: string;
  arn: string;
  inputReferenceConfig: IdMappingTableInputReferenceConfig;
  membershipId: string;
  membershipArn: string;
  collaborationId: string;
  collaborationArn: string;
  description?: string;
  name: string;
  createTime: Date;
  updateTime: Date;
  inputReferenceProperties: IdMappingTableInputReferenceProperties;
  kmsKeyArn?: string;
  childResources?: ChildResource[];
}
export interface CreateIdMappingTableOutput {
  idMappingTable: IdMappingTable;
}
export type IdNamespaceAssociationInputReferenceArn = string;
export interface IdNamespaceAssociationInputReferenceConfig {
  inputReferenceArn: string;
  manageResourcePolicies: boolean;
}
export type GenericResourceName = string;
export interface IdMappingConfig {
  allowUseAsDimensionColumn: boolean;
}
export interface CreateIdNamespaceAssociationInput {
  membershipIdentifier: string;
  inputReferenceConfig: IdNamespaceAssociationInputReferenceConfig;
  tags?: { [key: string]: string | undefined };
  name: string;
  description?: string;
  idMappingConfig?: IdMappingConfig;
}
export type IdNamespaceAssociationIdentifier = string;
export type IdNamespaceAssociationArn = string;
export type IdMappingWorkflowsSupported = any[];
export interface IdNamespaceAssociationInputReferenceProperties {
  idNamespaceType: IdNamespaceType;
  idMappingWorkflowsSupported: any[];
}
export interface IdNamespaceAssociation {
  id: string;
  arn: string;
  membershipId: string;
  membershipArn: string;
  collaborationId: string;
  collaborationArn: string;
  name: string;
  description?: string;
  createTime: Date;
  updateTime: Date;
  inputReferenceConfig: IdNamespaceAssociationInputReferenceConfig;
  inputReferenceProperties: IdNamespaceAssociationInputReferenceProperties;
  idMappingConfig?: IdMappingConfig;
}
export interface CreateIdNamespaceAssociationOutput {
  idNamespaceAssociation: IdNamespaceAssociation;
}
export interface PopulationAnalysisSqlParameters {
  queryString?: string;
  analysisTemplateArn?: string;
}
export type PopulationAnalysisConfiguration = {
  sqlParameters: PopulationAnalysisSqlParameters;
};
export interface CreateIntermediateTableInput {
  membershipIdentifier: string;
  name: string;
  description?: string;
  populationAnalysisConfiguration: PopulationAnalysisConfiguration;
  kmsKeyArn?: string;
  retentionInDays?: number;
  tags?: { [key: string]: string | undefined };
}
export type IntermediateTableArn = string;
export type IntermediateTableStatus =
  | "CREATED"
  | "POPULATE_STARTED"
  | "POPULATE_SUCCESS"
  | "POPULATE_FAILED"
  | "DISALLOWED_BY_DATA_PROVIDER"
  | "BASE_TABLE_REMOVED"
  | "RETENTION_PERIOD_EXPIRED"
  | (string & {});
export type BaseTableDependencyType =
  | "TABLE"
  | "INTERMEDIATE_TABLE"
  | "ID_MAPPING_TABLE"
  | (string & {});
export type BaseTableParentType = "DIRECT" | "INDIRECT" | (string & {});
export interface IntermediateTableDependency {
  id: string;
  name: string;
  type: BaseTableDependencyType;
  parentType: BaseTableParentType;
  creatorAccountId: string;
}
export type DependencyList = IntermediateTableDependency[];
export type AnalysisIdentifier = string;
export type PopulateIntermediateTableAnalysisType = "QUERY" | (string & {});
export type ParameterMap = { [key: string]: string | undefined };
export interface InheritedAdditionalAnalysesSource {
  name: string;
  id: string;
  type: BaseTableDependencyType;
  value: AdditionalAnalyses;
  sourceAccountId: string;
}
export type InheritedAdditionalAnalysesSourceList =
  InheritedAdditionalAnalysesSource[];
export interface InheritedAdditionalAnalyses {
  value: AdditionalAnalyses;
  sources: InheritedAdditionalAnalysesSource[];
}
export interface InheritedAllowedAdditionalAnalysesSource {
  name: string;
  id: string;
  type: BaseTableDependencyType;
  value: string[];
  sourceAccountId: string;
}
export type InheritedAllowedAdditionalAnalysesSourceList =
  InheritedAllowedAdditionalAnalysesSource[];
export interface InheritedAllowedAdditionalAnalyses {
  value: string[];
  sources: InheritedAllowedAdditionalAnalysesSource[];
}
export type AccountIdList = string[];
export interface InheritedAllowedResultReceiversSource {
  name: string;
  id: string;
  type: BaseTableDependencyType;
  value: string[];
  sourceAccountId: string;
}
export type InheritedAllowedResultReceiversSourceList =
  InheritedAllowedResultReceiversSource[];
export interface InheritedAllowedResultReceivers {
  value: string[];
  sources: InheritedAllowedResultReceiversSource[];
}
export interface ColumnLineageEntry {
  column: string;
  sourceColumn: string;
  sourceName: string;
  sourceId: string;
  sourceType: BaseTableDependencyType;
  sourceAccountId: string;
}
export type ColumnLineageList = ColumnLineageEntry[];
export interface InheritedDisallowedOutputColumns {
  value: string[];
  columnLineage: ColumnLineageEntry[];
}
export interface IntermediateTableInheritedConstraints {
  additionalAnalyses?: InheritedAdditionalAnalyses;
  allowedAdditionalAnalyses?: InheritedAllowedAdditionalAnalyses;
  allowedResultReceivers?: InheritedAllowedResultReceivers;
  disallowedOutputColumns?: InheritedDisallowedOutputColumns;
}
export interface IntermediateTableActiveVersion {
  versionId: string;
  analysisId: string;
  analysisType: PopulateIntermediateTableAnalysisType;
  kmsKeyArn?: string;
  parameters?: { [key: string]: string | undefined };
  inheritedConstraints: IntermediateTableInheritedConstraints;
  expirationTime?: Date;
}
export type IntermediateTableAnalysisRuleType = "CUSTOM" | (string & {});
export type IntermediateTableAnalysisRuleTypeList =
  IntermediateTableAnalysisRuleType[];
export interface IntermediateTableSchema {
  columns: Column[];
}
export interface IntermediateTable {
  id: string;
  arn: string;
  name: string;
  description?: string;
  membershipArn: string;
  membershipId: string;
  collaborationArn: string;
  collaborationId: string;
  childResources?: ChildResource[];
  createTime: Date;
  updateTime: Date;
  status: IntermediateTableStatus;
  statusReason?: string;
  kmsKeyArn?: string;
  populationAnalysisConfiguration: PopulationAnalysisConfiguration;
  retentionInDays?: number;
  tableDependencies?: IntermediateTableDependency[];
  intermediateTableVersion?: IntermediateTableActiveVersion;
  analysisRuleTypes?: IntermediateTableAnalysisRuleType[];
  schema?: IntermediateTableSchema;
}
export interface CreateIntermediateTableOutput {
  intermediateTable: IntermediateTable;
}
export type IntermediateTableIdentifier = string;
export interface IntermediateTableAnalysisRuleCustom {
  allowedAnalyses?: string[];
  additionalAnalyses?: AdditionalAnalyses;
  allowedAdditionalAnalyses?: string[];
  allowedAnalysisProviders?: string[];
  allowedResultReceivers?: string[];
  differentialPrivacy?: DifferentialPrivacyConfiguration;
  disallowedOutputColumns?: string[];
  aggregationThresholds?: AggregationThreshold[];
  comparisonControls?: ComparisonControls;
}
export type IntermediateTableAnalysisRulePolicyV1 = {
  custom: IntermediateTableAnalysisRuleCustom;
};
export type IntermediateTableAnalysisRulePolicy = {
  v1: IntermediateTableAnalysisRulePolicyV1;
};
export interface CreateIntermediateTableAnalysisRuleInput {
  membershipIdentifier: string;
  intermediateTableIdentifier: string;
  analysisRuleType: IntermediateTableAnalysisRuleType;
  analysisRulePolicy: IntermediateTableAnalysisRulePolicy;
}
export interface IntermediateTableAnalysisRule {
  intermediateTableIdentifier: string;
  intermediateTableArn: string;
  analysisRulePolicy: IntermediateTableAnalysisRulePolicy;
  analysisRuleType: IntermediateTableAnalysisRuleType;
  createTime: Date;
  updateTime: Date;
}
export interface CreateIntermediateTableAnalysisRuleOutput {
  analysisRule: IntermediateTableAnalysisRule;
}
export type MembershipQueryLogStatus = "ENABLED" | "DISABLED" | (string & {});
export type MembershipJobLogStatus = "ENABLED" | "DISABLED" | (string & {});
export type ResultFormat = "CSV" | "PARQUET" | (string & {});
export type KeyPrefix = string;
export interface ProtectedQueryS3OutputConfiguration {
  resultFormat: ResultFormat;
  bucket: string;
  keyPrefix?: string;
  singleFileOutput?: boolean;
}
export type MembershipProtectedQueryOutputConfiguration = {
  s3: ProtectedQueryS3OutputConfiguration;
};
export interface MembershipProtectedQueryResultConfiguration {
  outputConfiguration: MembershipProtectedQueryOutputConfiguration;
  roleArn?: string;
}
export interface ProtectedJobS3OutputConfigurationInput {
  bucket: string;
  keyPrefix?: string;
}
export type MembershipProtectedJobOutputConfiguration = {
  s3: ProtectedJobS3OutputConfigurationInput;
};
export interface MembershipProtectedJobResultConfiguration {
  outputConfiguration: MembershipProtectedJobOutputConfiguration;
  roleArn: string;
}
export interface MembershipQueryComputePaymentConfig {
  isResponsible: boolean;
}
export interface MembershipModelTrainingPaymentConfig {
  isResponsible: boolean;
}
export interface MembershipModelInferencePaymentConfig {
  isResponsible: boolean;
}
export interface MembershipSyntheticDataGenerationPaymentConfig {
  isResponsible: boolean;
}
export interface MembershipMLPaymentConfig {
  modelTraining?: MembershipModelTrainingPaymentConfig;
  modelInference?: MembershipModelInferencePaymentConfig;
  syntheticDataGeneration?: MembershipSyntheticDataGenerationPaymentConfig;
}
export interface MembershipJobComputePaymentConfig {
  isResponsible: boolean;
}
export interface MembershipPaymentConfiguration {
  queryCompute: MembershipQueryComputePaymentConfig;
  machineLearning?: MembershipMLPaymentConfig;
  jobCompute?: MembershipJobComputePaymentConfig;
}
export interface CreateMembershipInput {
  collaborationIdentifier: string;
  queryLogStatus: MembershipQueryLogStatus;
  jobLogStatus?: MembershipJobLogStatus;
  tags?: { [key: string]: string | undefined };
  defaultResultConfiguration?: MembershipProtectedQueryResultConfiguration;
  defaultJobResultConfiguration?: MembershipProtectedJobResultConfiguration;
  paymentConfiguration?: MembershipPaymentConfiguration;
  isMetricsEnabled?: boolean;
}
export type MembershipStatus = string;
export interface Membership {
  id: string;
  arn: string;
  collaborationArn: string;
  collaborationId: string;
  collaborationCreatorAccountId: string;
  collaborationCreatorDisplayName: string;
  collaborationName: string;
  createTime: Date;
  updateTime: Date;
  status: string;
  memberAbilities: MemberAbility[];
  mlMemberAbilities?: MLMemberAbilities;
  queryLogStatus: MembershipQueryLogStatus;
  jobLogStatus?: MembershipJobLogStatus;
  defaultResultConfiguration?: MembershipProtectedQueryResultConfiguration;
  defaultJobResultConfiguration?: MembershipProtectedJobResultConfiguration;
  paymentConfiguration: MembershipPaymentConfiguration;
  isMetricsEnabled?: boolean;
}
export interface CreateMembershipOutput {
  membership: Membership;
}
export type PrivacyBudgetTemplateAutoRefresh =
  | "CALENDAR_MONTH"
  | "NONE"
  | (string & {});
export type PrivacyBudgetType =
  | "DIFFERENTIAL_PRIVACY"
  | "ACCESS_BUDGET"
  | (string & {});
export type Epsilon = number;
export type UsersNoisePerQuery = number;
export interface DifferentialPrivacyTemplateParametersInput {
  epsilon: number;
  usersNoisePerQuery: number;
}
export type AccessBudgetType =
  | "CALENDAR_DAY"
  | "CALENDAR_MONTH"
  | "CALENDAR_WEEK"
  | "LIFETIME"
  | (string & {});
export type Budget = number;
export type AutoRefreshMode = "ENABLED" | "DISABLED" | (string & {});
export interface BudgetParameter {
  type: AccessBudgetType;
  budget: number;
  autoRefresh?: AutoRefreshMode;
}
export type BudgetParameters = BudgetParameter[];
export type BudgetedResourceArn = string;
export interface AccessBudgetsPrivacyTemplateParametersInput {
  budgetParameters: BudgetParameter[];
  resourceArn: string;
}
export type PrivacyBudgetTemplateParametersInput =
  | {
      differentialPrivacy: DifferentialPrivacyTemplateParametersInput;
      accessBudget?: never;
    }
  | {
      differentialPrivacy?: never;
      accessBudget: AccessBudgetsPrivacyTemplateParametersInput;
    };
export interface CreatePrivacyBudgetTemplateInput {
  membershipIdentifier: string;
  autoRefresh?: PrivacyBudgetTemplateAutoRefresh;
  privacyBudgetType: PrivacyBudgetType;
  parameters: PrivacyBudgetTemplateParametersInput;
  tags?: { [key: string]: string | undefined };
}
export type PrivacyBudgetTemplateIdentifier = string;
export type PrivacyBudgetTemplateArn = string;
export interface DifferentialPrivacyTemplateParametersOutput {
  epsilon: number;
  usersNoisePerQuery: number;
}
export interface AccessBudgetsPrivacyTemplateParametersOutput {
  budgetParameters: BudgetParameter[];
  resourceArn: string;
}
export type PrivacyBudgetTemplateParametersOutput =
  | {
      differentialPrivacy: DifferentialPrivacyTemplateParametersOutput;
      accessBudget?: never;
    }
  | {
      differentialPrivacy?: never;
      accessBudget: AccessBudgetsPrivacyTemplateParametersOutput;
    };
export interface PrivacyBudgetTemplate {
  id: string;
  arn: string;
  membershipId: string;
  membershipArn: string;
  collaborationId: string;
  collaborationArn: string;
  createTime: Date;
  updateTime: Date;
  privacyBudgetType: PrivacyBudgetType;
  autoRefresh: PrivacyBudgetTemplateAutoRefresh;
  parameters: PrivacyBudgetTemplateParametersOutput;
}
export interface CreatePrivacyBudgetTemplateOutput {
  privacyBudgetTemplate: PrivacyBudgetTemplate;
}
export interface DeleteAnalysisTemplateInput {
  membershipIdentifier: string;
  analysisTemplateIdentifier: string;
}
export interface DeleteAnalysisTemplateOutput {}
export interface DeleteCollaborationInput {
  collaborationIdentifier: string;
}
export interface DeleteCollaborationOutput {}
export interface DeleteConfiguredAudienceModelAssociationInput {
  configuredAudienceModelAssociationIdentifier: string;
  membershipIdentifier: string;
}
export interface DeleteConfiguredAudienceModelAssociationOutput {}
export interface DeleteConfiguredTableInput {
  configuredTableIdentifier: string;
}
export interface DeleteConfiguredTableOutput {}
export interface DeleteConfiguredTableAnalysisRuleInput {
  configuredTableIdentifier: string;
  analysisRuleType: ConfiguredTableAnalysisRuleType;
}
export interface DeleteConfiguredTableAnalysisRuleOutput {}
export interface DeleteConfiguredTableAssociationInput {
  configuredTableAssociationIdentifier: string;
  membershipIdentifier: string;
}
export interface DeleteConfiguredTableAssociationOutput {}
export interface DeleteConfiguredTableAssociationAnalysisRuleInput {
  membershipIdentifier: string;
  configuredTableAssociationIdentifier: string;
  analysisRuleType: ConfiguredTableAssociationAnalysisRuleType;
}
export interface DeleteConfiguredTableAssociationAnalysisRuleOutput {}
export interface DeleteIdMappingTableInput {
  idMappingTableIdentifier: string;
  membershipIdentifier: string;
}
export interface DeleteIdMappingTableOutput {}
export interface DeleteIdNamespaceAssociationInput {
  idNamespaceAssociationIdentifier: string;
  membershipIdentifier: string;
}
export interface DeleteIdNamespaceAssociationOutput {}
export interface DeleteIntermediateTableInput {
  membershipIdentifier: string;
  intermediateTableIdentifier: string;
}
export interface DeleteIntermediateTableOutput {}
export interface DeleteIntermediateTableAnalysisRuleInput {
  membershipIdentifier: string;
  intermediateTableIdentifier: string;
  analysisRuleType: IntermediateTableAnalysisRuleType;
}
export interface DeleteIntermediateTableAnalysisRuleOutput {}
export interface DeleteMemberInput {
  collaborationIdentifier: string;
  accountId: string;
}
export interface DeleteMemberOutput {}
export interface DeleteMembershipInput {
  membershipIdentifier: string;
}
export interface DeleteMembershipOutput {}
export interface DeletePrivacyBudgetTemplateInput {
  membershipIdentifier: string;
  privacyBudgetTemplateIdentifier: string;
}
export interface DeletePrivacyBudgetTemplateOutput {}
export interface DisallowIntermediateTableInput {
  membershipIdentifier: string;
  intermediateTableName: string;
  includeDescendants?: boolean;
}
export interface DisallowIntermediateTableOutput {}
export type AnalysisLogExportIdentifier = string;
export interface GetAnalysisLogExportInput {
  membershipIdentifier: string;
  analysisLogExportIdentifier: string;
}
export type LogExportAnalysisType = "PROTECTED_QUERY" | (string & {});
export type AnalysisLogExportStatus =
  | "IN_PROGRESS"
  | "SUCCESS"
  | "FAILED"
  | (string & {});
export interface AnalysisLogExportS3OutputConfiguration {
  bucket: string;
  keyPrefix?: string;
}
export interface AnalysisLogExportOutputConfiguration {
  s3: AnalysisLogExportS3OutputConfiguration;
}
export interface AnalysisLogExportResultConfiguration {
  outputConfiguration: AnalysisLogExportOutputConfiguration;
}
export interface AnalysisLogExportError {
  code: string;
  message: string;
}
export interface AnalysisLogExport {
  analysisLogExportId: string;
  analysisId: string;
  analysisType: LogExportAnalysisType;
  membershipId: string;
  status: AnalysisLogExportStatus;
  resultConfiguration: AnalysisLogExportResultConfiguration;
  createTime: Date;
  updateTime: Date;
  error?: AnalysisLogExportError;
}
export interface GetAnalysisLogExportOutput {
  analysisLogExport: AnalysisLogExport;
}
export interface GetAnalysisTemplateInput {
  membershipIdentifier: string;
  analysisTemplateIdentifier: string;
}
export interface GetAnalysisTemplateOutput {
  analysisTemplate: AnalysisTemplate;
}
export interface GetCollaborationInput {
  collaborationIdentifier: string;
}
export interface GetCollaborationOutput {
  collaboration: Collaboration;
}
export interface GetCollaborationAnalysisTemplateInput {
  collaborationIdentifier: string;
  analysisTemplateArn: string;
}
export interface GetCollaborationAnalysisTemplateOutput {
  collaborationAnalysisTemplate: CollaborationAnalysisTemplate;
}
export type CollaborationChangeRequestIdentifier = string;
export interface GetCollaborationChangeRequestInput {
  collaborationIdentifier: string;
  changeRequestIdentifier: string;
}
export interface GetCollaborationChangeRequestOutput {
  collaborationChangeRequest: CollaborationChangeRequest;
}
export interface GetCollaborationConfiguredAudienceModelAssociationInput {
  collaborationIdentifier: string;
  configuredAudienceModelAssociationIdentifier: string;
}
export interface CollaborationConfiguredAudienceModelAssociation {
  id: string;
  arn: string;
  collaborationId: string;
  collaborationArn: string;
  configuredAudienceModelArn: string;
  name: string;
  description?: string;
  creatorAccountId: string;
  createTime: Date;
  updateTime: Date;
}
export interface GetCollaborationConfiguredAudienceModelAssociationOutput {
  collaborationConfiguredAudienceModelAssociation: CollaborationConfiguredAudienceModelAssociation;
}
export interface GetCollaborationIdNamespaceAssociationInput {
  collaborationIdentifier: string;
  idNamespaceAssociationIdentifier: string;
}
export interface CollaborationIdNamespaceAssociation {
  id: string;
  arn: string;
  collaborationId: string;
  collaborationArn: string;
  name: string;
  description?: string;
  creatorAccountId: string;
  createTime: Date;
  updateTime: Date;
  inputReferenceConfig: IdNamespaceAssociationInputReferenceConfig;
  inputReferenceProperties: IdNamespaceAssociationInputReferenceProperties;
  idMappingConfig?: IdMappingConfig;
}
export interface GetCollaborationIdNamespaceAssociationOutput {
  collaborationIdNamespaceAssociation: CollaborationIdNamespaceAssociation;
}
export interface GetCollaborationPrivacyBudgetTemplateInput {
  collaborationIdentifier: string;
  privacyBudgetTemplateIdentifier: string;
}
export interface CollaborationPrivacyBudgetTemplate {
  id: string;
  arn: string;
  collaborationId: string;
  collaborationArn: string;
  creatorAccountId: string;
  createTime: Date;
  updateTime: Date;
  privacyBudgetType: PrivacyBudgetType;
  autoRefresh: PrivacyBudgetTemplateAutoRefresh;
  parameters: PrivacyBudgetTemplateParametersOutput;
}
export interface GetCollaborationPrivacyBudgetTemplateOutput {
  collaborationPrivacyBudgetTemplate: CollaborationPrivacyBudgetTemplate;
}
export interface GetConfiguredAudienceModelAssociationInput {
  configuredAudienceModelAssociationIdentifier: string;
  membershipIdentifier: string;
}
export interface GetConfiguredAudienceModelAssociationOutput {
  configuredAudienceModelAssociation: ConfiguredAudienceModelAssociation;
}
export interface GetConfiguredTableInput {
  configuredTableIdentifier: string;
}
export interface GetConfiguredTableOutput {
  configuredTable: ConfiguredTable;
}
export interface GetConfiguredTableAnalysisRuleInput {
  configuredTableIdentifier: string;
  analysisRuleType: ConfiguredTableAnalysisRuleType;
}
export interface GetConfiguredTableAnalysisRuleOutput {
  analysisRule: ConfiguredTableAnalysisRule;
}
export interface GetConfiguredTableAssociationInput {
  configuredTableAssociationIdentifier: string;
  membershipIdentifier: string;
}
export interface GetConfiguredTableAssociationOutput {
  configuredTableAssociation: ConfiguredTableAssociation;
}
export interface GetConfiguredTableAssociationAnalysisRuleInput {
  membershipIdentifier: string;
  configuredTableAssociationIdentifier: string;
  analysisRuleType: ConfiguredTableAssociationAnalysisRuleType;
}
export interface GetConfiguredTableAssociationAnalysisRuleOutput {
  analysisRule: ConfiguredTableAssociationAnalysisRule;
}
export interface GetIdMappingTableInput {
  idMappingTableIdentifier: string;
  membershipIdentifier: string;
}
export interface GetIdMappingTableOutput {
  idMappingTable: IdMappingTable;
}
export interface GetIdNamespaceAssociationInput {
  idNamespaceAssociationIdentifier: string;
  membershipIdentifier: string;
}
export interface GetIdNamespaceAssociationOutput {
  idNamespaceAssociation: IdNamespaceAssociation;
}
export interface GetIntermediateTableInput {
  intermediateTableIdentifier: string;
  membershipIdentifier: string;
}
export interface GetIntermediateTableOutput {
  intermediateTable: IntermediateTable;
}
export interface GetIntermediateTableAnalysisRuleInput {
  membershipIdentifier: string;
  intermediateTableIdentifier: string;
  analysisRuleType: IntermediateTableAnalysisRuleType;
}
export interface GetIntermediateTableAnalysisRuleOutput {
  analysisRule: IntermediateTableAnalysisRule;
}
export interface GetMembershipInput {
  membershipIdentifier: string;
}
export interface GetMembershipOutput {
  membership: Membership;
}
export interface GetPrivacyBudgetTemplateInput {
  membershipIdentifier: string;
  privacyBudgetTemplateIdentifier: string;
}
export interface GetPrivacyBudgetTemplateOutput {
  privacyBudgetTemplate: PrivacyBudgetTemplate;
}
export type ProtectedJobIdentifier = string;
export interface GetProtectedJobInput {
  membershipIdentifier: string;
  protectedJobIdentifier: string;
}
export type JobParameterName = string;
export type JobParameterValue = string;
export type JobParameterMap = { [key: string]: string | undefined };
export interface ProtectedJobParameters {
  analysisTemplateArn: string;
  parameters?: { [key: string]: string | undefined };
}
export type ProtectedJobStatus =
  | "SUBMITTED"
  | "STARTED"
  | "CANCELLED"
  | "CANCELLING"
  | "FAILED"
  | "SUCCESS"
  | (string & {});
export interface ProtectedJobS3OutputConfigurationOutput {
  bucket: string;
  keyPrefix?: string;
}
export interface ProtectedJobMemberOutputConfigurationOutput {
  accountId: string;
}
export type ProtectedJobOutputConfigurationOutput =
  | { s3: ProtectedJobS3OutputConfigurationOutput; member?: never }
  | { s3?: never; member: ProtectedJobMemberOutputConfigurationOutput };
export interface ProtectedJobResultConfigurationOutput {
  outputConfiguration: ProtectedJobOutputConfigurationOutput;
}
export interface BilledJobResourceUtilization {
  units: number;
}
export interface ProtectedJobStatistics {
  totalDurationInMillis?: number;
  billedResourceUtilization?: BilledJobResourceUtilization;
}
export interface ProtectedJobS3Output {
  location: string;
}
export interface ProtectedJobSingleMemberOutput {
  accountId: string;
}
export type ProtectedJobMemberOutputList = ProtectedJobSingleMemberOutput[];
export type ProtectedJobOutput =
  | { s3: ProtectedJobS3Output; memberList?: never }
  | { s3?: never; memberList: ProtectedJobSingleMemberOutput[] };
export interface ProtectedJobResult {
  output: ProtectedJobOutput;
}
export interface ProtectedJobError {
  message: string;
  code: string;
}
export type ProtectedJobWorkerComputeType = "CR.1X" | "CR.4X" | (string & {});
export type SparkPropertyKey = string;
export type SparkPropertyValue = string;
export type SparkProperties = { [key: string]: string | undefined };
export type WorkerComputeConfigurationProperties = {
  spark: { [key: string]: string | undefined };
};
export interface ProtectedJobWorkerComputeConfiguration {
  type: ProtectedJobWorkerComputeType;
  number: number;
  properties?: WorkerComputeConfigurationProperties;
}
export type ProtectedJobComputeConfiguration = {
  worker: ProtectedJobWorkerComputeConfiguration;
};
export interface ProtectedJob {
  id: string;
  membershipId: string;
  membershipArn: string;
  createTime: Date;
  jobParameters?: ProtectedJobParameters;
  status: ProtectedJobStatus;
  resultConfiguration?: ProtectedJobResultConfigurationOutput;
  statistics?: ProtectedJobStatistics;
  result?: ProtectedJobResult;
  error?: ProtectedJobError;
  computeConfiguration?: ProtectedJobComputeConfiguration;
  jobComputePayerAccountId?: string;
}
export interface GetProtectedJobOutput {
  protectedJob: ProtectedJob;
}
export type ProtectedQueryIdentifier = string;
export interface GetProtectedQueryInput {
  membershipIdentifier: string;
  protectedQueryIdentifier: string;
}
export interface ProtectedQuerySQLParameters {
  queryString?: string;
  analysisTemplateArn?: string;
  parameters?: { [key: string]: string | undefined };
}
export type ProtectedQueryStatus = string;
export interface ProtectedQueryMemberOutputConfiguration {
  accountId: string;
}
export type ProtectedQueryDistributeOutputConfigurationLocation =
  | { s3: ProtectedQueryS3OutputConfiguration; member?: never }
  | { s3?: never; member: ProtectedQueryMemberOutputConfiguration };
export type ProtectedQueryDistributeOutputConfigurationLocations =
  ProtectedQueryDistributeOutputConfigurationLocation[];
export interface ProtectedQueryDistributeOutputConfiguration {
  locations: ProtectedQueryDistributeOutputConfigurationLocation[];
}
export interface IntermediateTableOutputConfiguration {
  id: string;
  arn: string;
  name: string;
}
export type ProtectedQueryOutputConfiguration =
  | {
      s3: ProtectedQueryS3OutputConfiguration;
      member?: never;
      distribute?: never;
      intermediateTable?: never;
    }
  | {
      s3?: never;
      member: ProtectedQueryMemberOutputConfiguration;
      distribute?: never;
      intermediateTable?: never;
    }
  | {
      s3?: never;
      member?: never;
      distribute: ProtectedQueryDistributeOutputConfiguration;
      intermediateTable?: never;
    }
  | {
      s3?: never;
      member?: never;
      distribute?: never;
      intermediateTable: IntermediateTableOutputConfiguration;
    };
export interface ProtectedQueryResultConfiguration {
  outputConfiguration: ProtectedQueryOutputConfiguration;
}
export interface BilledResourceUtilization {
  units: number;
}
export interface ProtectedQueryStatistics {
  totalDurationInMillis?: number;
  billedResourceUtilization?: BilledResourceUtilization;
}
export interface ProtectedQueryS3Output {
  location: string;
}
export interface ProtectedQuerySingleMemberOutput {
  accountId: string;
}
export type ProtectedQueryMemberOutputList = ProtectedQuerySingleMemberOutput[];
export interface ProtectedQueryDistributeOutput {
  s3?: ProtectedQueryS3Output;
  memberList?: ProtectedQuerySingleMemberOutput[];
}
export type ProtectedQueryOutput =
  | { s3: ProtectedQueryS3Output; memberList?: never; distribute?: never }
  | {
      s3?: never;
      memberList: ProtectedQuerySingleMemberOutput[];
      distribute?: never;
    }
  | {
      s3?: never;
      memberList?: never;
      distribute: ProtectedQueryDistributeOutput;
    };
export interface ProtectedQueryResult {
  output: ProtectedQueryOutput;
}
export interface ProtectedQueryError {
  message: string;
  code: string;
}
export type DifferentialPrivacyAggregationType =
  | "AVG"
  | "COUNT"
  | "COUNT_DISTINCT"
  | "SUM"
  | "STDDEV"
  | (string & {});
export type DifferentialPrivacyAggregationExpression = string;
export interface DifferentialPrivacySensitivityParameters {
  aggregationType: DifferentialPrivacyAggregationType;
  aggregationExpression: string;
  userContributionLimit: number;
  minColumnValue?: number;
  maxColumnValue?: number;
}
export type DifferentialPrivacySensitivityParametersList =
  DifferentialPrivacySensitivityParameters[];
export interface DifferentialPrivacyParameters {
  sensitivityParameters: DifferentialPrivacySensitivityParameters[];
}
export type WorkerComputeType = "CR.1X" | "CR.4X" | "CR.8X" | (string & {});
export interface WorkerComputeConfiguration {
  type?: WorkerComputeType;
  number?: number;
  properties?: WorkerComputeConfigurationProperties;
}
export type ComputeConfiguration = { worker: WorkerComputeConfiguration };
export interface ProtectedQuery {
  id: string;
  membershipId: string;
  membershipArn: string;
  createTime: Date;
  sqlParameters?: ProtectedQuerySQLParameters;
  status: string;
  resultConfiguration?: ProtectedQueryResultConfiguration;
  statistics?: ProtectedQueryStatistics;
  result?: ProtectedQueryResult;
  error?: ProtectedQueryError;
  differentialPrivacy?: DifferentialPrivacyParameters;
  computeConfiguration?: ComputeConfiguration;
  queryComputePayerAccountId?: string;
}
export interface GetProtectedQueryOutput {
  protectedQuery: ProtectedQuery;
}
export interface GetSchemaInput {
  collaborationIdentifier: string;
  name: string;
}
export interface GetSchemaOutput {
  schema: Schema;
}
export interface GetSchemaAnalysisRuleInput {
  collaborationIdentifier: string;
  name: string;
  type: AnalysisRuleType;
}
export interface GetSchemaAnalysisRuleOutput {
  analysisRule: AnalysisRule;
}
export type PaginationToken = string;
export type MaxResults = number;
export interface ListAnalysisLogExportsInput {
  membershipIdentifier: string;
  analysisIdentifier?: string;
  status?: AnalysisLogExportStatus;
  nextToken?: string;
  maxResults?: number;
}
export interface AnalysisLogExportSummary {
  analysisLogExportId: string;
  analysisId: string;
  analysisType: LogExportAnalysisType;
  status: AnalysisLogExportStatus;
  createTime: Date;
}
export type AnalysisLogExportSummaryList = AnalysisLogExportSummary[];
export interface ListAnalysisLogExportsOutput {
  nextToken?: string;
  analysisLogExports: AnalysisLogExportSummary[];
}
export interface ListAnalysisTemplatesInput {
  membershipIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface AnalysisTemplateSummary {
  arn: string;
  createTime: Date;
  id: string;
  name: string;
  updateTime: Date;
  membershipArn: string;
  membershipId: string;
  collaborationArn: string;
  collaborationId: string;
  description?: string;
  isSyntheticData?: boolean;
}
export type AnalysisTemplateSummaryList = AnalysisTemplateSummary[];
export interface ListAnalysisTemplatesOutput {
  nextToken?: string;
  analysisTemplateSummaries: AnalysisTemplateSummary[];
}
export interface ListCollaborationAnalysisTemplatesInput {
  collaborationIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface CollaborationAnalysisTemplateSummary {
  arn: string;
  createTime: Date;
  id: string;
  name: string;
  updateTime: Date;
  collaborationArn: string;
  collaborationId: string;
  creatorAccountId: string;
  description?: string;
  isSyntheticData?: boolean;
}
export type CollaborationAnalysisTemplateSummaryList =
  CollaborationAnalysisTemplateSummary[];
export interface ListCollaborationAnalysisTemplatesOutput {
  nextToken?: string;
  collaborationAnalysisTemplateSummaries: CollaborationAnalysisTemplateSummary[];
}
export interface ListCollaborationChangeRequestsInput {
  collaborationIdentifier: string;
  status?: ChangeRequestStatus;
  nextToken?: string;
  maxResults?: number;
}
export interface CollaborationChangeRequestSummary {
  id: string;
  collaborationId: string;
  createTime: Date;
  updateTime: Date;
  status: ChangeRequestStatus;
  isAutoApproved: boolean;
  changes: Change[];
  approvals?: { [key: string]: ApprovalStatusDetails | undefined };
}
export type CollaborationChangeRequestSummaryList =
  CollaborationChangeRequestSummary[];
export interface ListCollaborationChangeRequestsOutput {
  collaborationChangeRequestSummaries: CollaborationChangeRequestSummary[];
  nextToken?: string;
}
export interface ListCollaborationConfiguredAudienceModelAssociationsInput {
  collaborationIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface CollaborationConfiguredAudienceModelAssociationSummary {
  arn: string;
  createTime: Date;
  id: string;
  name: string;
  updateTime: Date;
  collaborationArn: string;
  collaborationId: string;
  creatorAccountId: string;
  description?: string;
}
export type CollaborationConfiguredAudienceModelAssociationSummaryList =
  CollaborationConfiguredAudienceModelAssociationSummary[];
export interface ListCollaborationConfiguredAudienceModelAssociationsOutput {
  collaborationConfiguredAudienceModelAssociationSummaries: CollaborationConfiguredAudienceModelAssociationSummary[];
  nextToken?: string;
}
export interface ListCollaborationIdNamespaceAssociationsInput {
  collaborationIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface IdNamespaceAssociationInputReferencePropertiesSummary {
  idNamespaceType: IdNamespaceType;
}
export interface CollaborationIdNamespaceAssociationSummary {
  arn: string;
  createTime: Date;
  id: string;
  updateTime: Date;
  collaborationArn: string;
  collaborationId: string;
  creatorAccountId: string;
  inputReferenceConfig: IdNamespaceAssociationInputReferenceConfig;
  name: string;
  description?: string;
  inputReferenceProperties: IdNamespaceAssociationInputReferencePropertiesSummary;
}
export type CollaborationIdNamespaceAssociationSummaryList =
  CollaborationIdNamespaceAssociationSummary[];
export interface ListCollaborationIdNamespaceAssociationsOutput {
  nextToken?: string;
  collaborationIdNamespaceAssociationSummaries: CollaborationIdNamespaceAssociationSummary[];
}
export interface ListCollaborationPrivacyBudgetsInput {
  collaborationIdentifier: string;
  privacyBudgetType: PrivacyBudgetType;
  maxResults?: number;
  nextToken?: string;
  accessBudgetResourceArn?: string;
}
export interface DifferentialPrivacyPrivacyBudgetAggregation {
  type: DifferentialPrivacyAggregationType;
  maxCount: number;
  remainingCount: number;
}
export type DifferentialPrivacyPrivacyBudgetAggregationList =
  DifferentialPrivacyPrivacyBudgetAggregation[];
export interface DifferentialPrivacyPrivacyBudget {
  aggregations: DifferentialPrivacyPrivacyBudgetAggregation[];
  epsilon: number;
}
export type RemainingBudget = number;
export interface AccessBudgetDetails {
  startTime: Date;
  endTime?: Date;
  remainingBudget: number;
  budget: number;
  budgetType: AccessBudgetType;
  autoRefresh?: AutoRefreshMode;
}
export type AccessBudgetDetailsList = AccessBudgetDetails[];
export interface AccessBudget {
  resourceArn: string;
  details: AccessBudgetDetails[];
  aggregateRemainingBudget: number;
}
export type PrivacyBudget =
  | {
      differentialPrivacy: DifferentialPrivacyPrivacyBudget;
      accessBudget?: never;
    }
  | { differentialPrivacy?: never; accessBudget: AccessBudget };
export interface CollaborationPrivacyBudgetSummary {
  id: string;
  privacyBudgetTemplateId: string;
  privacyBudgetTemplateArn: string;
  collaborationId: string;
  collaborationArn: string;
  creatorAccountId: string;
  type: PrivacyBudgetType;
  createTime: Date;
  updateTime: Date;
  budget: PrivacyBudget;
}
export type CollaborationPrivacyBudgetSummaryList =
  CollaborationPrivacyBudgetSummary[];
export interface ListCollaborationPrivacyBudgetsOutput {
  collaborationPrivacyBudgetSummaries: CollaborationPrivacyBudgetSummary[];
  nextToken?: string;
}
export interface ListCollaborationPrivacyBudgetTemplatesInput {
  collaborationIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface CollaborationPrivacyBudgetTemplateSummary {
  id: string;
  arn: string;
  collaborationId: string;
  collaborationArn: string;
  creatorAccountId: string;
  privacyBudgetType: PrivacyBudgetType;
  createTime: Date;
  updateTime: Date;
}
export type CollaborationPrivacyBudgetTemplateSummaryList =
  CollaborationPrivacyBudgetTemplateSummary[];
export interface ListCollaborationPrivacyBudgetTemplatesOutput {
  nextToken?: string;
  collaborationPrivacyBudgetTemplateSummaries: CollaborationPrivacyBudgetTemplateSummary[];
}
export type FilterableMemberStatus = string;
export interface ListCollaborationsInput {
  nextToken?: string;
  maxResults?: number;
  memberStatus?: string;
}
export interface CollaborationSummary {
  id: string;
  arn: string;
  name: string;
  creatorAccountId: string;
  creatorDisplayName: string;
  createTime: Date;
  updateTime: Date;
  memberStatus: string;
  membershipId?: string;
  membershipArn?: string;
  analyticsEngine?: AnalyticsEngine;
}
export type CollaborationSummaryList = CollaborationSummary[];
export interface ListCollaborationsOutput {
  nextToken?: string;
  collaborationList: CollaborationSummary[];
}
export interface ListConfiguredAudienceModelAssociationsInput {
  membershipIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ConfiguredAudienceModelAssociationSummary {
  membershipId: string;
  membershipArn: string;
  collaborationArn: string;
  collaborationId: string;
  createTime: Date;
  updateTime: Date;
  id: string;
  arn: string;
  name: string;
  configuredAudienceModelArn: string;
  description?: string;
}
export type ConfiguredAudienceModelAssociationSummaryList =
  ConfiguredAudienceModelAssociationSummary[];
export interface ListConfiguredAudienceModelAssociationsOutput {
  configuredAudienceModelAssociationSummaries: ConfiguredAudienceModelAssociationSummary[];
  nextToken?: string;
}
export interface ListConfiguredTableAssociationsInput {
  membershipIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ConfiguredTableAssociationSummary {
  configuredTableId: string;
  membershipId: string;
  membershipArn: string;
  name: string;
  createTime: Date;
  updateTime: Date;
  id: string;
  arn: string;
  analysisRuleTypes?: ConfiguredTableAssociationAnalysisRuleType[];
}
export type ConfiguredTableAssociationSummaryList =
  ConfiguredTableAssociationSummary[];
export interface ListConfiguredTableAssociationsOutput {
  configuredTableAssociationSummaries: ConfiguredTableAssociationSummary[];
  nextToken?: string;
}
export interface ListConfiguredTablesInput {
  nextToken?: string;
  maxResults?: number;
}
export interface ConfiguredTableSummary {
  id: string;
  arn: string;
  name: string;
  createTime: Date;
  updateTime: Date;
  analysisRuleTypes: ConfiguredTableAnalysisRuleType[];
  analysisMethod: AnalysisMethod;
  selectedAnalysisMethods?: SelectedAnalysisMethod[];
}
export type ConfiguredTableSummaryList = ConfiguredTableSummary[];
export interface ListConfiguredTablesOutput {
  configuredTableSummaries: ConfiguredTableSummary[];
  nextToken?: string;
}
export interface ListIdMappingTablesInput {
  membershipIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface IdMappingTableSummary {
  collaborationArn: string;
  collaborationId: string;
  membershipId: string;
  membershipArn: string;
  createTime: Date;
  updateTime: Date;
  id: string;
  arn: string;
  description?: string;
  inputReferenceConfig: IdMappingTableInputReferenceConfig;
  name: string;
}
export type IdMappingTableSummaryList = IdMappingTableSummary[];
export interface ListIdMappingTablesOutput {
  idMappingTableSummaries: IdMappingTableSummary[];
  nextToken?: string;
}
export interface ListIdNamespaceAssociationsInput {
  membershipIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface IdNamespaceAssociationSummary {
  membershipId: string;
  membershipArn: string;
  collaborationArn: string;
  collaborationId: string;
  createTime: Date;
  updateTime: Date;
  id: string;
  arn: string;
  inputReferenceConfig: IdNamespaceAssociationInputReferenceConfig;
  name: string;
  description?: string;
  inputReferenceProperties: IdNamespaceAssociationInputReferencePropertiesSummary;
}
export type IdNamespaceAssociationSummaryList = IdNamespaceAssociationSummary[];
export interface ListIdNamespaceAssociationsOutput {
  nextToken?: string;
  idNamespaceAssociationSummaries: IdNamespaceAssociationSummary[];
}
export interface ListIntermediateTablesInput {
  membershipIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface IntermediateTableSummary {
  id: string;
  arn: string;
  name: string;
  description?: string;
  membershipArn: string;
  membershipId: string;
  collaborationArn: string;
  collaborationId: string;
  createTime: Date;
  updateTime: Date;
  status: IntermediateTableStatus;
  retentionInDays?: number;
  analysisRuleTypes?: IntermediateTableAnalysisRuleType[];
}
export type IntermediateTableSummaryList = IntermediateTableSummary[];
export interface ListIntermediateTablesOutput {
  intermediateTableSummaries: IntermediateTableSummary[];
  nextToken?: string;
}
export interface ListIntermediateTableVersionsInput {
  membershipIdentifier: string;
  intermediateTableIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export type IntermediateTableVersionStatus =
  | "POPULATE_STARTED"
  | "POPULATE_SUCCESS"
  | "POPULATE_FAILED"
  | "RETENTION_PERIOD_EXPIRED"
  | (string & {});
export interface IntermediateTableVersionSummary {
  versionId: string;
  tableId: string;
  createTime: Date;
  analysisId: string;
  status: IntermediateTableVersionStatus;
  analysisType: PopulateIntermediateTableAnalysisType;
  kmsKeyArn?: string;
  expirationTime?: Date;
}
export type IntermediateTableVersionSummaryList =
  IntermediateTableVersionSummary[];
export interface ListIntermediateTableVersionsOutput {
  intermediateTableVersionSummaries: IntermediateTableVersionSummary[];
  nextToken?: string;
}
export interface ListMembersInput {
  collaborationIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface MemberSummary {
  accountId: string;
  status: string;
  displayName: string;
  abilities: MemberAbility[];
  mlAbilities?: MLMemberAbilities;
  createTime: Date;
  updateTime: Date;
  membershipId?: string;
  membershipArn?: string;
  paymentConfiguration: PaymentConfiguration;
}
export type MemberSummaryList = MemberSummary[];
export interface ListMembersOutput {
  nextToken?: string;
  memberSummaries: MemberSummary[];
}
export interface ListMembershipsInput {
  nextToken?: string;
  maxResults?: number;
  status?: string;
}
export interface MembershipSummary {
  id: string;
  arn: string;
  collaborationArn: string;
  collaborationId: string;
  collaborationCreatorAccountId: string;
  collaborationCreatorDisplayName: string;
  collaborationName: string;
  createTime: Date;
  updateTime: Date;
  status: string;
  memberAbilities: MemberAbility[];
  mlMemberAbilities?: MLMemberAbilities;
  paymentConfiguration: MembershipPaymentConfiguration;
}
export type MembershipSummaryList = MembershipSummary[];
export interface ListMembershipsOutput {
  nextToken?: string;
  membershipSummaries: MembershipSummary[];
}
export interface ListPrivacyBudgetsInput {
  membershipIdentifier: string;
  privacyBudgetType: PrivacyBudgetType;
  nextToken?: string;
  maxResults?: number;
  accessBudgetResourceArn?: string;
}
export interface PrivacyBudgetSummary {
  id: string;
  privacyBudgetTemplateId: string;
  privacyBudgetTemplateArn: string;
  membershipId: string;
  membershipArn: string;
  collaborationId: string;
  collaborationArn: string;
  type: PrivacyBudgetType;
  createTime: Date;
  updateTime: Date;
  budget: PrivacyBudget;
}
export type PrivacyBudgetSummaryList = PrivacyBudgetSummary[];
export interface ListPrivacyBudgetsOutput {
  privacyBudgetSummaries: PrivacyBudgetSummary[];
  nextToken?: string;
}
export interface ListPrivacyBudgetTemplatesInput {
  membershipIdentifier: string;
  nextToken?: string;
  maxResults?: number;
}
export interface PrivacyBudgetTemplateSummary {
  id: string;
  arn: string;
  membershipId: string;
  membershipArn: string;
  collaborationId: string;
  collaborationArn: string;
  privacyBudgetType: PrivacyBudgetType;
  createTime: Date;
  updateTime: Date;
}
export type PrivacyBudgetTemplateSummaryList = PrivacyBudgetTemplateSummary[];
export interface ListPrivacyBudgetTemplatesOutput {
  nextToken?: string;
  privacyBudgetTemplateSummaries: PrivacyBudgetTemplateSummary[];
}
export interface ListProtectedJobsInput {
  membershipIdentifier: string;
  status?: ProtectedJobStatus;
  nextToken?: string;
  maxResults?: number;
}
export type ProtectedJobAnalysisType = "DIRECT_ANALYSIS" | (string & {});
export type ProtectedJobReceiverAccountIds = string[];
export interface ProtectedJobDirectAnalysisConfigurationDetails {
  receiverAccountIds?: string[];
}
export type ProtectedJobConfigurationDetails = {
  directAnalysisConfigurationDetails: ProtectedJobDirectAnalysisConfigurationDetails;
};
export interface ProtectedJobReceiverConfiguration {
  analysisType: ProtectedJobAnalysisType;
  configurationDetails?: ProtectedJobConfigurationDetails;
}
export type ProtectedJobReceiverConfigurations =
  ProtectedJobReceiverConfiguration[];
export interface ProtectedJobSummary {
  id: string;
  membershipId: string;
  membershipArn: string;
  createTime: Date;
  status: ProtectedJobStatus;
  receiverConfigurations: ProtectedJobReceiverConfiguration[];
  jobComputePayerAccountId?: string;
}
export type ProtectedJobSummaryList = ProtectedJobSummary[];
export interface ListProtectedJobsOutput {
  nextToken?: string;
  protectedJobs: ProtectedJobSummary[];
}
export interface ListProtectedQueriesInput {
  membershipIdentifier: string;
  status?: string;
  nextToken?: string;
  maxResults?: number;
}
export type ReceiverAccountIds = string[];
export interface DirectAnalysisConfigurationDetails {
  receiverAccountIds?: string[];
}
export type ConfigurationDetails = {
  directAnalysisConfigurationDetails: DirectAnalysisConfigurationDetails;
};
export interface ReceiverConfiguration {
  analysisType: AnalysisType;
  configurationDetails?: ConfigurationDetails;
}
export type ReceiverConfigurationsList = ReceiverConfiguration[];
export interface ProtectedQuerySummary {
  id: string;
  membershipId: string;
  membershipArn: string;
  createTime: Date;
  status: string;
  receiverConfigurations: ReceiverConfiguration[];
  queryComputePayerAccountId?: string;
  intermediateTableConfiguration?: IntermediateTableOutputConfiguration;
}
export type ProtectedQuerySummaryList = ProtectedQuerySummary[];
export interface ListProtectedQueriesOutput {
  nextToken?: string;
  protectedQueries: ProtectedQuerySummary[];
}
export interface ListSchemasInput {
  collaborationIdentifier: string;
  schemaType?: SchemaType;
  nextToken?: string;
  maxResults?: number;
}
export interface SchemaSummary {
  name: string;
  type: SchemaType;
  creatorAccountId: string;
  createTime: Date;
  updateTime: Date;
  collaborationId: string;
  collaborationArn: string;
  analysisRuleTypes: AnalysisRuleType[];
  analysisMethod?: AnalysisMethod;
  resourceArn?: string;
  selectedAnalysisMethods?: SelectedAnalysisMethod[];
}
export type SchemaSummaryList = SchemaSummary[];
export interface ListSchemasOutput {
  schemaSummaries: SchemaSummary[];
  nextToken?: string;
}
export type CleanroomsArn = string;
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags: { [key: string]: string | undefined };
}
export type JobType = "BATCH" | "INCREMENTAL" | "DELETE_ONLY" | (string & {});
export interface PopulateIdMappingTableInput {
  idMappingTableIdentifier: string;
  membershipIdentifier: string;
  jobType?: JobType;
}
export interface PopulateIdMappingTableOutput {
  idMappingJobId: string;
}
export type IntermediateTableComputeConfiguration = {
  queryComputeConfiguration: WorkerComputeConfiguration;
};
export interface PopulateIntermediateTableInput {
  intermediateTableIdentifier: string;
  membershipIdentifier: string;
  parameters?: { [key: string]: string | undefined };
  computeConfiguration?: IntermediateTableComputeConfiguration;
  analysisPayerAccountId?: string;
}
export interface PopulateIntermediateTableOutput {
  analysisId: string;
  analysisType: PopulateIntermediateTableAnalysisType;
  versionId: string;
}
export interface DifferentialPrivacyPreviewParametersInput {
  epsilon: number;
  usersNoisePerQuery: number;
}
export type PreviewPrivacyImpactParametersInput = {
  differentialPrivacy: DifferentialPrivacyPreviewParametersInput;
};
export interface PreviewPrivacyImpactInput {
  membershipIdentifier: string;
  parameters: PreviewPrivacyImpactParametersInput;
}
export interface DifferentialPrivacyPreviewAggregation {
  type: DifferentialPrivacyAggregationType;
  maxCount: number;
}
export type DifferentialPrivacyPreviewAggregationList =
  DifferentialPrivacyPreviewAggregation[];
export interface DifferentialPrivacyPrivacyImpact {
  aggregations: DifferentialPrivacyPreviewAggregation[];
}
export type PrivacyImpact = {
  differentialPrivacy: DifferentialPrivacyPrivacyImpact;
};
export interface PreviewPrivacyImpactOutput {
  privacyImpact: PrivacyImpact;
}
export interface StartAnalysisLogExportInput {
  membershipIdentifier: string;
  analysisId: string;
  analysisType: LogExportAnalysisType;
  resultConfiguration: AnalysisLogExportResultConfiguration;
}
export interface StartAnalysisLogExportOutput {
  analysisLogExport: AnalysisLogExport;
}
export type ProtectedJobType = "PYSPARK" | (string & {});
export interface ProtectedJobMemberOutputConfigurationInput {
  accountId: string;
}
export type ProtectedJobOutputConfigurationInput = {
  member: ProtectedJobMemberOutputConfigurationInput;
};
export interface ProtectedJobResultConfigurationInput {
  outputConfiguration: ProtectedJobOutputConfigurationInput;
}
export interface StartProtectedJobInput {
  type: ProtectedJobType;
  membershipIdentifier: string;
  jobParameters: ProtectedJobParameters;
  resultConfiguration?: ProtectedJobResultConfigurationInput;
  computeConfiguration?: ProtectedJobComputeConfiguration;
  jobComputePayerAccountId?: string;
}
export interface StartProtectedJobOutput {
  protectedJob: ProtectedJob;
}
export type ProtectedQueryType = string;
export interface StartProtectedQueryInput {
  type: string;
  membershipIdentifier: string;
  sqlParameters: ProtectedQuerySQLParameters;
  resultConfiguration?: ProtectedQueryResultConfiguration;
  computeConfiguration?: ComputeConfiguration;
  queryComputePayerAccountId?: string;
}
export interface StartProtectedQueryOutput {
  protectedQuery: ProtectedQuery;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeys = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateAnalysisTemplateInput {
  membershipIdentifier: string;
  analysisTemplateIdentifier: string;
  description?: string;
}
export interface UpdateAnalysisTemplateOutput {
  analysisTemplate: AnalysisTemplate;
}
export interface UpdateCollaborationInput {
  collaborationIdentifier: string;
  name?: string;
  description?: string;
  analyticsEngine?: AnalyticsEngine;
}
export interface UpdateCollaborationOutput {
  collaboration: Collaboration;
}
export type ChangeRequestAction =
  | "APPROVE"
  | "DENY"
  | "CANCEL"
  | "COMMIT"
  | (string & {});
export interface UpdateCollaborationChangeRequestInput {
  collaborationIdentifier: string;
  changeRequestIdentifier: string;
  action: ChangeRequestAction;
}
export interface UpdateCollaborationChangeRequestOutput {
  collaborationChangeRequest: CollaborationChangeRequest;
}
export interface UpdateConfiguredAudienceModelAssociationInput {
  configuredAudienceModelAssociationIdentifier: string;
  membershipIdentifier: string;
  description?: string;
  name?: string;
}
export interface UpdateConfiguredAudienceModelAssociationOutput {
  configuredAudienceModelAssociation: ConfiguredAudienceModelAssociation;
}
export interface UpdateConfiguredTableInput {
  configuredTableIdentifier: string;
  name?: string;
  description?: string;
  tableReference?: TableReference;
  allowedColumns?: string[];
  analysisMethod?: AnalysisMethod;
  selectedAnalysisMethods?: SelectedAnalysisMethod[];
}
export interface UpdateConfiguredTableOutput {
  configuredTable: ConfiguredTable;
}
export interface UpdateConfiguredTableAnalysisRuleInput {
  configuredTableIdentifier: string;
  analysisRuleType: ConfiguredTableAnalysisRuleType;
  analysisRulePolicy: ConfiguredTableAnalysisRulePolicy;
}
export interface UpdateConfiguredTableAnalysisRuleOutput {
  analysisRule: ConfiguredTableAnalysisRule;
}
export interface UpdateConfiguredTableAssociationInput {
  configuredTableAssociationIdentifier: string;
  membershipIdentifier: string;
  description?: string;
  roleArn?: string;
}
export interface UpdateConfiguredTableAssociationOutput {
  configuredTableAssociation: ConfiguredTableAssociation;
}
export interface UpdateConfiguredTableAssociationAnalysisRuleInput {
  membershipIdentifier: string;
  configuredTableAssociationIdentifier: string;
  analysisRuleType: ConfiguredTableAssociationAnalysisRuleType;
  analysisRulePolicy: ConfiguredTableAssociationAnalysisRulePolicy;
}
export interface UpdateConfiguredTableAssociationAnalysisRuleOutput {
  analysisRule: ConfiguredTableAssociationAnalysisRule;
}
export interface UpdateIdMappingTableInput {
  idMappingTableIdentifier: string;
  membershipIdentifier: string;
  description?: string;
  kmsKeyArn?: string;
}
export interface UpdateIdMappingTableOutput {
  idMappingTable: IdMappingTable;
}
export interface UpdateIdNamespaceAssociationInput {
  idNamespaceAssociationIdentifier: string;
  membershipIdentifier: string;
  name?: string;
  description?: string;
  idMappingConfig?: IdMappingConfig;
}
export interface UpdateIdNamespaceAssociationOutput {
  idNamespaceAssociation: IdNamespaceAssociation;
}
export type IntermediateTableColumnTypeString = string;
export interface IntermediateTableColumn {
  name: string;
  type: string;
}
export type IntermediateTableColumnList = IntermediateTableColumn[];
export interface UpdateIntermediateTableInput {
  intermediateTableIdentifier: string;
  membershipIdentifier: string;
  description?: string;
  kmsKeyArn?: string;
  columns?: IntermediateTableColumn[];
}
export interface UpdateIntermediateTableOutput {
  intermediateTable: IntermediateTable;
}
export interface UpdateIntermediateTableAnalysisRuleInput {
  membershipIdentifier: string;
  intermediateTableIdentifier: string;
  analysisRuleType: IntermediateTableAnalysisRuleType;
  analysisRulePolicy: IntermediateTableAnalysisRulePolicy;
}
export interface UpdateIntermediateTableAnalysisRuleOutput {
  analysisRule: IntermediateTableAnalysisRule;
}
export interface UpdateMembershipPaymentConfiguration {
  queryCompute?: MembershipQueryComputePaymentConfig;
  machineLearning?: MembershipMLPaymentConfig;
  jobCompute?: MembershipJobComputePaymentConfig;
}
export interface UpdateMembershipInput {
  membershipIdentifier: string;
  queryLogStatus?: MembershipQueryLogStatus;
  jobLogStatus?: MembershipJobLogStatus;
  defaultResultConfiguration?: MembershipProtectedQueryResultConfiguration;
  defaultJobResultConfiguration?: MembershipProtectedJobResultConfiguration;
  membershipPaymentConfiguration?: UpdateMembershipPaymentConfiguration;
}
export interface UpdateMembershipOutput {
  membership: Membership;
}
export interface DifferentialPrivacyTemplateUpdateParameters {
  epsilon?: number;
  usersNoisePerQuery?: number;
}
export interface AccessBudgetsPrivacyTemplateUpdateParameters {
  budgetParameters: BudgetParameter[];
}
export type PrivacyBudgetTemplateUpdateParameters =
  | {
      differentialPrivacy: DifferentialPrivacyTemplateUpdateParameters;
      accessBudget?: never;
    }
  | {
      differentialPrivacy?: never;
      accessBudget: AccessBudgetsPrivacyTemplateUpdateParameters;
    };
export interface UpdatePrivacyBudgetTemplateInput {
  membershipIdentifier: string;
  privacyBudgetTemplateIdentifier: string;
  privacyBudgetType: PrivacyBudgetType;
  parameters?: PrivacyBudgetTemplateUpdateParameters;
}
export interface UpdatePrivacyBudgetTemplateOutput {
  privacyBudgetTemplate: PrivacyBudgetTemplate;
}
export type TargetProtectedJobStatus = "CANCELLED" | (string & {});
export interface UpdateProtectedJobInput {
  membershipIdentifier: string;
  protectedJobIdentifier: string;
  targetStatus: TargetProtectedJobStatus;
}
export interface UpdateProtectedJobOutput {
  protectedJob: ProtectedJob;
}
export type TargetProtectedQueryStatus = string;
export interface UpdateProtectedQueryInput {
  membershipIdentifier: string;
  protectedQueryIdentifier: string;
  targetStatus: string;
}
export interface UpdateProtectedQueryOutput {
  protectedQuery: ProtectedQuery;
}
export type AccessDeniedExceptionReason = string;
export type ResourceType = string;
export type ValidationExceptionReason = string;
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type ConflictExceptionReason = string;
export type BatchGetCollaborationAnalysisTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple analysis templates within a collaboration by their Amazon Resource Names (ARNs).
 */
export const batchGetCollaborationAnalysisTemplate: API.OperationMethod<
  BatchGetCollaborationAnalysisTemplateInput,
  BatchGetCollaborationAnalysisTemplateOutput,
  BatchGetCollaborationAnalysisTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /collaborations/{collaborationIdentifier}/batch-analysistemplates",
    input: { collaborationIdentifier: 0, analysisTemplateArns: 0 },
    output: {
      collaborationAnalysisTemplates: D.list(o_CollaborationAnalysisTemplate),
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
  operationName: "BatchGetCollaborationAnalysisTemplate",
})) as any;

export type BatchGetSchemaError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple schemas by their identifiers.
 */
export const batchGetSchema: API.OperationMethod<
  BatchGetSchemaInput,
  BatchGetSchemaOutput,
  BatchGetSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /collaborations/{collaborationIdentifier}/batch-schema",
    input: { collaborationIdentifier: 0, names: 0 },
    output: { schemas: D.list(o_Schema) },
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
  operationName: "BatchGetSchema",
})) as any;

export type BatchGetSchemaAnalysisRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves multiple analysis rule schemas.
 */
export const batchGetSchemaAnalysisRule: API.OperationMethod<
  BatchGetSchemaAnalysisRuleInput,
  BatchGetSchemaAnalysisRuleOutput,
  BatchGetSchemaAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /collaborations/{collaborationIdentifier}/batch-schema-analysis-rule",
    input: {
      collaborationIdentifier: 0,
      schemaAnalysisRuleRequests: D.list({ name: 0, type: 0 }),
    },
    output: { analysisRules: D.list(o_AnalysisRule) },
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
  operationName: "BatchGetSchemaAnalysisRule",
})) as any;

export type CreateAnalysisTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new analysis template.
 */
export const createAnalysisTemplate: API.OperationMethod<
  CreateAnalysisTemplateInput,
  CreateAnalysisTemplateOutput,
  CreateAnalysisTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/analysistemplates",
    input: {
      description: 0,
      membershipIdentifier: 0,
      name: 0,
      format: 0,
      source: {
        text: 0,
        artifacts: {
          entryPoint: i_AnalysisTemplateArtifact,
          additionalArtifacts: D.list(i_AnalysisTemplateArtifact),
          roleArn: 0,
        },
      },
      tags: 0,
      analysisParameters: D.list({ name: 0, type: 0, defaultValue: 0 }),
      schema: { referencedTables: 0 },
      errorMessageConfiguration: { type: 0 },
      syntheticDataParameters: {
        mlSyntheticDataParameters: {
          epsilon: 0,
          maxMembershipInferenceAttackScore: 0,
          columnClassification: {
            columnMapping: D.list({
              columnName: 0,
              columnType: 0,
              isPredictiveValue: 0,
            }),
          },
        },
      },
    },
    output: { analysisTemplate: o_AnalysisTemplate },
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
  operationName: "CreateAnalysisTemplate",
})) as any;

export type CreateCollaborationError =
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new collaboration.
 */
export const createCollaboration: API.OperationMethod<
  CreateCollaborationInput,
  CreateCollaborationOutput,
  CreateCollaborationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /collaborations",
    input: {
      members: D.list({
        accountId: 0,
        memberAbilities: 0,
        mlMemberAbilities: i_MLMemberAbilities,
        displayName: 0,
        paymentConfiguration: i_PaymentConfiguration,
      }),
      name: 0,
      description: 0,
      creatorMemberAbilities: 0,
      creatorMLMemberAbilities: i_MLMemberAbilities,
      creatorDisplayName: 0,
      dataEncryptionMetadata: {
        allowCleartext: 0,
        allowDuplicates: 0,
        allowJoinsOnColumnsWithDifferentNames: 0,
        preserveNulls: 0,
      },
      queryLogStatus: 0,
      jobLogStatus: 0,
      tags: 0,
      creatorPaymentConfiguration: i_PaymentConfiguration,
      analyticsEngine: 0,
      autoApprovedChangeRequestTypes: 0,
      allowedResultRegions: 0,
      isMetricsEnabled: 0,
    },
    output: { collaboration: o_Collaboration },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateCollaboration",
})) as any;

export type CreateCollaborationChangeRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new change request to modify an existing collaboration. This enables post-creation modifications to collaborations through a structured API-driven approach.
 */
export const createCollaborationChangeRequest: API.OperationMethod<
  CreateCollaborationChangeRequestInput,
  CreateCollaborationChangeRequestOutput,
  CreateCollaborationChangeRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /collaborations/{collaborationIdentifier}/changeRequests",
    input: {
      collaborationIdentifier: 0,
      changes: D.list({
        specificationType: 0,
        specification: {
          member: {
            accountId: 0,
            memberAbilities: 0,
            mlMemberAbilities: i_MLMemberAbilities,
            paymentConfiguration: i_PaymentConfiguration,
            displayName: 0,
          },
          collaboration: { autoApprovedChangeTypes: 0 },
        },
      }),
    },
    output: { collaborationChangeRequest: o_CollaborationChangeRequest },
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
  operationName: "CreateCollaborationChangeRequest",
})) as any;

export type CreateConfiguredAudienceModelAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the details necessary to create a configured audience model association.
 */
export const createConfiguredAudienceModelAssociation: API.OperationMethod<
  CreateConfiguredAudienceModelAssociationInput,
  CreateConfiguredAudienceModelAssociationOutput,
  CreateConfiguredAudienceModelAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/configuredaudiencemodelassociations",
    input: {
      membershipIdentifier: 0,
      configuredAudienceModelArn: 0,
      configuredAudienceModelAssociationName: 0,
      manageResourcePolicies: 0,
      tags: 0,
      description: 0,
    },
    output: {
      configuredAudienceModelAssociation: o_ConfiguredAudienceModelAssociation,
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
  operationName: "CreateConfiguredAudienceModelAssociation",
})) as any;

export type CreateConfiguredTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new configured table resource.
 */
export const createConfiguredTable: API.OperationMethod<
  CreateConfiguredTableInput,
  CreateConfiguredTableOutput,
  CreateConfiguredTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /configuredTables",
    input: {
      name: 0,
      description: 0,
      tableReference: i_TableReference,
      allowedColumns: 0,
      analysisMethod: 0,
      selectedAnalysisMethods: 0,
      tags: 0,
    },
    output: { configuredTable: o_ConfiguredTable },
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
  operationName: "CreateConfiguredTable",
})) as any;

export type CreateConfiguredTableAnalysisRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new analysis rule for a configured table. Currently, only one analysis rule can be created for a given configured table.
 */
export const createConfiguredTableAnalysisRule: API.OperationMethod<
  CreateConfiguredTableAnalysisRuleInput,
  CreateConfiguredTableAnalysisRuleOutput,
  CreateConfiguredTableAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /configuredTables/{configuredTableIdentifier}/analysisRule",
    input: {
      configuredTableIdentifier: 0,
      analysisRuleType: 0,
      analysisRulePolicy: i_ConfiguredTableAnalysisRulePolicy,
    },
    output: { analysisRule: o_ConfiguredTableAnalysisRule },
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
  operationName: "CreateConfiguredTableAnalysisRule",
})) as any;

export type CreateConfiguredTableAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a configured table association. A configured table association links a configured table with a collaboration.
 */
export const createConfiguredTableAssociation: API.OperationMethod<
  CreateConfiguredTableAssociationInput,
  CreateConfiguredTableAssociationOutput,
  CreateConfiguredTableAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/configuredTableAssociations",
    input: {
      name: 0,
      description: 0,
      membershipIdentifier: 0,
      configuredTableIdentifier: 0,
      roleArn: 0,
      tags: 0,
    },
    output: { configuredTableAssociation: o_ConfiguredTableAssociation },
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
  operationName: "CreateConfiguredTableAssociation",
})) as any;

export type CreateConfiguredTableAssociationAnalysisRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new analysis rule for an associated configured table.
 */
export const createConfiguredTableAssociationAnalysisRule: API.OperationMethod<
  CreateConfiguredTableAssociationAnalysisRuleInput,
  CreateConfiguredTableAssociationAnalysisRuleOutput,
  CreateConfiguredTableAssociationAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/configuredTableAssociations/{configuredTableAssociationIdentifier}/analysisRule",
    input: {
      membershipIdentifier: 0,
      configuredTableAssociationIdentifier: 0,
      analysisRuleType: 0,
      analysisRulePolicy: i_ConfiguredTableAssociationAnalysisRulePolicy,
    },
    output: { analysisRule: o_ConfiguredTableAssociationAnalysisRule },
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
  operationName: "CreateConfiguredTableAssociationAnalysisRule",
})) as any;

export type CreateIdMappingTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an ID mapping table.
 */
export const createIdMappingTable: API.OperationMethod<
  CreateIdMappingTableInput,
  CreateIdMappingTableOutput,
  CreateIdMappingTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/idmappingtables",
    input: {
      membershipIdentifier: 0,
      name: 0,
      description: 0,
      inputReferenceConfig: { inputReferenceArn: 0, manageResourcePolicies: 0 },
      tags: 0,
      kmsKeyArn: 0,
    },
    output: { idMappingTable: o_IdMappingTable },
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
  operationName: "CreateIdMappingTable",
})) as any;

export type CreateIdNamespaceAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an ID namespace association.
 */
export const createIdNamespaceAssociation: API.OperationMethod<
  CreateIdNamespaceAssociationInput,
  CreateIdNamespaceAssociationOutput,
  CreateIdNamespaceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/idnamespaceassociations",
    input: {
      membershipIdentifier: 0,
      inputReferenceConfig: { inputReferenceArn: 0, manageResourcePolicies: 0 },
      tags: 0,
      name: 0,
      description: 0,
      idMappingConfig: i_IdMappingConfig,
    },
    output: { idNamespaceAssociation: o_IdNamespaceAssociation },
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
  operationName: "CreateIdNamespaceAssociation",
})) as any;

export type CreateIntermediateTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an intermediate table in a membership. The intermediate table is owned by the member with the CAN_QUERY ability. To populate the table with results, use `PopulateIntermediateTable`.
 */
export const createIntermediateTable: API.OperationMethod<
  CreateIntermediateTableInput,
  CreateIntermediateTableOutput,
  CreateIntermediateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/intermediateTables",
    input: {
      membershipIdentifier: 0,
      name: 0,
      description: 0,
      populationAnalysisConfiguration: {
        sqlParameters: { queryString: 0, analysisTemplateArn: 0 },
      },
      kmsKeyArn: 0,
      retentionInDays: 0,
      tags: 0,
    },
    output: { intermediateTable: o_IntermediateTable },
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
  operationName: "CreateIntermediateTable",
})) as any;

export type CreateIntermediateTableAnalysisRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an analysis rule for an intermediate table. Only the CUSTOM analysis rule type is supported. Only the intermediate table owner can call this operation.
 */
export const createIntermediateTableAnalysisRule: API.OperationMethod<
  CreateIntermediateTableAnalysisRuleInput,
  CreateIntermediateTableAnalysisRuleOutput,
  CreateIntermediateTableAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/intermediateTables/{intermediateTableIdentifier}/analysisRule",
    input: {
      membershipIdentifier: 0,
      intermediateTableIdentifier: 0,
      analysisRuleType: 0,
      analysisRulePolicy: i_IntermediateTableAnalysisRulePolicy,
    },
    output: { analysisRule: o_IntermediateTableAnalysisRule },
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
  operationName: "CreateIntermediateTableAnalysisRule",
})) as any;

export type CreateMembershipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a membership for a specific collaboration identifier and joins the collaboration.
 */
export const createMembership: API.OperationMethod<
  CreateMembershipInput,
  CreateMembershipOutput,
  CreateMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships",
    input: {
      collaborationIdentifier: 0,
      queryLogStatus: 0,
      jobLogStatus: 0,
      tags: 0,
      defaultResultConfiguration: i_MembershipProtectedQueryResultConfiguration,
      defaultJobResultConfiguration:
        i_MembershipProtectedJobResultConfiguration,
      paymentConfiguration: {
        queryCompute: i_MembershipQueryComputePaymentConfig,
        machineLearning: i_MembershipMLPaymentConfig,
        jobCompute: i_MembershipJobComputePaymentConfig,
      },
      isMetricsEnabled: 0,
    },
    output: { membership: o_Membership },
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
  operationName: "CreateMembership",
})) as any;

export type CreatePrivacyBudgetTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a privacy budget template for a specified collaboration. Each collaboration can have only one privacy budget template. If you need to change the privacy budget template, use the UpdatePrivacyBudgetTemplate operation.
 */
export const createPrivacyBudgetTemplate: API.OperationMethod<
  CreatePrivacyBudgetTemplateInput,
  CreatePrivacyBudgetTemplateOutput,
  CreatePrivacyBudgetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/privacybudgettemplates",
    input: {
      membershipIdentifier: 0,
      autoRefresh: 0,
      privacyBudgetType: 0,
      parameters: {
        differentialPrivacy: { epsilon: 0, usersNoisePerQuery: 0 },
        accessBudget: {
          budgetParameters: D.list(i_BudgetParameter),
          resourceArn: 0,
        },
      },
      tags: 0,
    },
    output: { privacyBudgetTemplate: o_PrivacyBudgetTemplate },
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
  operationName: "CreatePrivacyBudgetTemplate",
})) as any;

export type DeleteAnalysisTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an analysis template.
 */
export const deleteAnalysisTemplate: API.OperationMethod<
  DeleteAnalysisTemplateInput,
  DeleteAnalysisTemplateOutput,
  DeleteAnalysisTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /memberships/{membershipIdentifier}/analysistemplates/{analysisTemplateIdentifier}",
    input: { membershipIdentifier: 0, analysisTemplateIdentifier: 0 },
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
  operationName: "DeleteAnalysisTemplate",
})) as any;

export type DeleteCollaborationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a collaboration. It can only be called by the collaboration owner.
 */
export const deleteCollaboration: API.OperationMethod<
  DeleteCollaborationInput,
  DeleteCollaborationOutput,
  DeleteCollaborationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /collaborations/{collaborationIdentifier}",
    input: { collaborationIdentifier: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteCollaboration",
})) as any;

export type DeleteConfiguredAudienceModelAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the information necessary to delete a configured audience model association.
 */
export const deleteConfiguredAudienceModelAssociation: API.OperationMethod<
  DeleteConfiguredAudienceModelAssociationInput,
  DeleteConfiguredAudienceModelAssociationOutput,
  DeleteConfiguredAudienceModelAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /memberships/{membershipIdentifier}/configuredaudiencemodelassociations/{configuredAudienceModelAssociationIdentifier}",
    input: {
      configuredAudienceModelAssociationIdentifier: 0,
      membershipIdentifier: 0,
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
  operationName: "DeleteConfiguredAudienceModelAssociation",
})) as any;

export type DeleteConfiguredTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a configured table.
 */
export const deleteConfiguredTable: API.OperationMethod<
  DeleteConfiguredTableInput,
  DeleteConfiguredTableOutput,
  DeleteConfiguredTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /configuredTables/{configuredTableIdentifier}",
    input: { configuredTableIdentifier: 0 },
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
  operationName: "DeleteConfiguredTable",
})) as any;

export type DeleteConfiguredTableAnalysisRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a configured table analysis rule.
 */
export const deleteConfiguredTableAnalysisRule: API.OperationMethod<
  DeleteConfiguredTableAnalysisRuleInput,
  DeleteConfiguredTableAnalysisRuleOutput,
  DeleteConfiguredTableAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /configuredTables/{configuredTableIdentifier}/analysisRule/{analysisRuleType}",
    input: { configuredTableIdentifier: 0, analysisRuleType: 0 },
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
  operationName: "DeleteConfiguredTableAnalysisRule",
})) as any;

export type DeleteConfiguredTableAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a configured table association.
 */
export const deleteConfiguredTableAssociation: API.OperationMethod<
  DeleteConfiguredTableAssociationInput,
  DeleteConfiguredTableAssociationOutput,
  DeleteConfiguredTableAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /memberships/{membershipIdentifier}/configuredTableAssociations/{configuredTableAssociationIdentifier}",
    input: { configuredTableAssociationIdentifier: 0, membershipIdentifier: 0 },
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
  operationName: "DeleteConfiguredTableAssociation",
})) as any;

export type DeleteConfiguredTableAssociationAnalysisRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an analysis rule for a configured table association.
 */
export const deleteConfiguredTableAssociationAnalysisRule: API.OperationMethod<
  DeleteConfiguredTableAssociationAnalysisRuleInput,
  DeleteConfiguredTableAssociationAnalysisRuleOutput,
  DeleteConfiguredTableAssociationAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /memberships/{membershipIdentifier}/configuredTableAssociations/{configuredTableAssociationIdentifier}/analysisRule/{analysisRuleType}",
    input: {
      membershipIdentifier: 0,
      configuredTableAssociationIdentifier: 0,
      analysisRuleType: 0,
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
  operationName: "DeleteConfiguredTableAssociationAnalysisRule",
})) as any;

export type DeleteIdMappingTableError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an ID mapping table.
 */
export const deleteIdMappingTable: API.OperationMethod<
  DeleteIdMappingTableInput,
  DeleteIdMappingTableOutput,
  DeleteIdMappingTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /memberships/{membershipIdentifier}/idmappingtables/{idMappingTableIdentifier}",
    input: { idMappingTableIdentifier: 0, membershipIdentifier: 0 },
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
  operationName: "DeleteIdMappingTable",
})) as any;

export type DeleteIdNamespaceAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an ID namespace association.
 */
export const deleteIdNamespaceAssociation: API.OperationMethod<
  DeleteIdNamespaceAssociationInput,
  DeleteIdNamespaceAssociationOutput,
  DeleteIdNamespaceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /memberships/{membershipIdentifier}/idnamespaceassociations/{idNamespaceAssociationIdentifier}",
    input: { idNamespaceAssociationIdentifier: 0, membershipIdentifier: 0 },
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
  operationName: "DeleteIdNamespaceAssociation",
})) as any;

export type DeleteIntermediateTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an intermediate table. The delete is idempotent. Only the intermediate table owner can call this operation.
 */
export const deleteIntermediateTable: API.OperationMethod<
  DeleteIntermediateTableInput,
  DeleteIntermediateTableOutput,
  DeleteIntermediateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /memberships/{membershipIdentifier}/intermediateTables/{intermediateTableIdentifier}",
    input: { membershipIdentifier: 0, intermediateTableIdentifier: 0 },
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
  operationName: "DeleteIntermediateTable",
})) as any;

export type DeleteIntermediateTableAnalysisRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an analysis rule from an intermediate table. After the analysis rule is deleted, the intermediate table becomes unqueryable until a new analysis rule is attached. Only the intermediate table owner can call this operation.
 */
export const deleteIntermediateTableAnalysisRule: API.OperationMethod<
  DeleteIntermediateTableAnalysisRuleInput,
  DeleteIntermediateTableAnalysisRuleOutput,
  DeleteIntermediateTableAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /memberships/{membershipIdentifier}/intermediateTables/{intermediateTableIdentifier}/analysisRule/{analysisRuleType}",
    input: {
      membershipIdentifier: 0,
      intermediateTableIdentifier: 0,
      analysisRuleType: 0,
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
  operationName: "DeleteIntermediateTableAnalysisRule",
})) as any;

export type DeleteMemberError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified member from a collaboration. The removed member is placed in the Removed status and can't interact with the collaboration. The removed member's data is inaccessible to active members of the collaboration.
 */
export const deleteMember: API.OperationMethod<
  DeleteMemberInput,
  DeleteMemberOutput,
  DeleteMemberError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /collaborations/{collaborationIdentifier}/member/{accountId}",
    input: { collaborationIdentifier: 0, accountId: 0 },
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
  operationName: "DeleteMember",
})) as any;

export type DeleteMembershipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified membership. All resources under a membership must be deleted.
 */
export const deleteMembership: API.OperationMethod<
  DeleteMembershipInput,
  DeleteMembershipOutput,
  DeleteMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /memberships/{membershipIdentifier}",
    input: { membershipIdentifier: 0 },
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
  operationName: "DeleteMembership",
})) as any;

export type DeletePrivacyBudgetTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a privacy budget template for a specified collaboration.
 */
export const deletePrivacyBudgetTemplate: API.OperationMethod<
  DeletePrivacyBudgetTemplateInput,
  DeletePrivacyBudgetTemplateOutput,
  DeletePrivacyBudgetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /memberships/{membershipIdentifier}/privacybudgettemplates/{privacyBudgetTemplateIdentifier}",
    input: { membershipIdentifier: 0, privacyBudgetTemplateIdentifier: 0 },
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
  operationName: "DeletePrivacyBudgetTemplate",
})) as any;

export type DisallowIntermediateTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Marks an intermediate table as invalid when it references the caller's base table. The data provider (base table owner) calls this operation, not the intermediate table owner. By default, the operation also marks all descendant intermediate tables as invalid.
 */
export const disallowIntermediateTable: API.OperationMethod<
  DisallowIntermediateTableInput,
  DisallowIntermediateTableOutput,
  DisallowIntermediateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/disallowIntermediateTable",
    input: {
      membershipIdentifier: 0,
      intermediateTableName: 0,
      includeDescendants: 0,
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
  operationName: "DisallowIntermediateTable",
})) as any;

export type GetAnalysisLogExportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about an analysis log export, including its current status and, if the export failed, the reason for the failure.
 *
 * Poll this operation until the `status` is `SUCCESS` or `FAILED`. An export can't be canceled after it starts.
 */
export const getAnalysisLogExport: API.OperationMethod<
  GetAnalysisLogExportInput,
  GetAnalysisLogExportOutput,
  GetAnalysisLogExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/analysislogexports/{analysisLogExportIdentifier}",
    input: { membershipIdentifier: 0, analysisLogExportIdentifier: 0 },
    output: { analysisLogExport: o_AnalysisLogExport },
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
  operationName: "GetAnalysisLogExport",
})) as any;

export type GetAnalysisTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an analysis template.
 */
export const getAnalysisTemplate: API.OperationMethod<
  GetAnalysisTemplateInput,
  GetAnalysisTemplateOutput,
  GetAnalysisTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/analysistemplates/{analysisTemplateIdentifier}",
    input: { membershipIdentifier: 0, analysisTemplateIdentifier: 0 },
    output: { analysisTemplate: o_AnalysisTemplate },
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
  operationName: "GetAnalysisTemplate",
})) as any;

export type GetCollaborationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns metadata about a collaboration.
 */
export const getCollaboration: API.OperationMethod<
  GetCollaborationInput,
  GetCollaborationOutput,
  GetCollaborationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}",
    input: { collaborationIdentifier: 0 },
    output: { collaboration: o_Collaboration },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetCollaboration",
})) as any;

export type GetCollaborationAnalysisTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an analysis template within a collaboration.
 */
export const getCollaborationAnalysisTemplate: API.OperationMethod<
  GetCollaborationAnalysisTemplateInput,
  GetCollaborationAnalysisTemplateOutput,
  GetCollaborationAnalysisTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/analysistemplates/{analysisTemplateArn}",
    input: { collaborationIdentifier: 0, analysisTemplateArn: 0 },
    output: { collaborationAnalysisTemplate: o_CollaborationAnalysisTemplate },
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
  operationName: "GetCollaborationAnalysisTemplate",
})) as any;

export type GetCollaborationChangeRequestError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific collaboration change request.
 */
export const getCollaborationChangeRequest: API.OperationMethod<
  GetCollaborationChangeRequestInput,
  GetCollaborationChangeRequestOutput,
  GetCollaborationChangeRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/changeRequests/{changeRequestIdentifier}",
    input: { collaborationIdentifier: 0, changeRequestIdentifier: 0 },
    output: { collaborationChangeRequest: o_CollaborationChangeRequest },
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
  operationName: "GetCollaborationChangeRequest",
})) as any;

export type GetCollaborationConfiguredAudienceModelAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a configured audience model association within a collaboration.
 */
export const getCollaborationConfiguredAudienceModelAssociation: API.OperationMethod<
  GetCollaborationConfiguredAudienceModelAssociationInput,
  GetCollaborationConfiguredAudienceModelAssociationOutput,
  GetCollaborationConfiguredAudienceModelAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/configuredaudiencemodelassociations/{configuredAudienceModelAssociationIdentifier}",
    input: {
      collaborationIdentifier: 0,
      configuredAudienceModelAssociationIdentifier: 0,
    },
    output: {
      collaborationConfiguredAudienceModelAssociation: {
        createTime: D.ts,
        updateTime: D.ts,
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
  operationName: "GetCollaborationConfiguredAudienceModelAssociation",
})) as any;

export type GetCollaborationIdNamespaceAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an ID namespace association from a specific collaboration.
 */
export const getCollaborationIdNamespaceAssociation: API.OperationMethod<
  GetCollaborationIdNamespaceAssociationInput,
  GetCollaborationIdNamespaceAssociationOutput,
  GetCollaborationIdNamespaceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/idnamespaceassociations/{idNamespaceAssociationIdentifier}",
    input: { collaborationIdentifier: 0, idNamespaceAssociationIdentifier: 0 },
    output: {
      collaborationIdNamespaceAssociation: {
        createTime: D.ts,
        updateTime: D.ts,
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
  operationName: "GetCollaborationIdNamespaceAssociation",
})) as any;

export type GetCollaborationPrivacyBudgetTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about a specified privacy budget template.
 */
export const getCollaborationPrivacyBudgetTemplate: API.OperationMethod<
  GetCollaborationPrivacyBudgetTemplateInput,
  GetCollaborationPrivacyBudgetTemplateOutput,
  GetCollaborationPrivacyBudgetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/privacybudgettemplates/{privacyBudgetTemplateIdentifier}",
    input: { collaborationIdentifier: 0, privacyBudgetTemplateIdentifier: 0 },
    output: {
      collaborationPrivacyBudgetTemplate: {
        createTime: D.ts,
        updateTime: D.ts,
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
  operationName: "GetCollaborationPrivacyBudgetTemplate",
})) as any;

export type GetConfiguredAudienceModelAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a configured audience model association.
 */
export const getConfiguredAudienceModelAssociation: API.OperationMethod<
  GetConfiguredAudienceModelAssociationInput,
  GetConfiguredAudienceModelAssociationOutput,
  GetConfiguredAudienceModelAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/configuredaudiencemodelassociations/{configuredAudienceModelAssociationIdentifier}",
    input: {
      configuredAudienceModelAssociationIdentifier: 0,
      membershipIdentifier: 0,
    },
    output: {
      configuredAudienceModelAssociation: o_ConfiguredAudienceModelAssociation,
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
  operationName: "GetConfiguredAudienceModelAssociation",
})) as any;

export type GetConfiguredTableError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a configured table.
 */
export const getConfiguredTable: API.OperationMethod<
  GetConfiguredTableInput,
  GetConfiguredTableOutput,
  GetConfiguredTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /configuredTables/{configuredTableIdentifier}",
    input: { configuredTableIdentifier: 0 },
    output: { configuredTable: o_ConfiguredTable },
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
  operationName: "GetConfiguredTable",
})) as any;

export type GetConfiguredTableAnalysisRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a configured table analysis rule.
 */
export const getConfiguredTableAnalysisRule: API.OperationMethod<
  GetConfiguredTableAnalysisRuleInput,
  GetConfiguredTableAnalysisRuleOutput,
  GetConfiguredTableAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /configuredTables/{configuredTableIdentifier}/analysisRule/{analysisRuleType}",
    input: { configuredTableIdentifier: 0, analysisRuleType: 0 },
    output: { analysisRule: o_ConfiguredTableAnalysisRule },
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
  operationName: "GetConfiguredTableAnalysisRule",
})) as any;

export type GetConfiguredTableAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a configured table association.
 */
export const getConfiguredTableAssociation: API.OperationMethod<
  GetConfiguredTableAssociationInput,
  GetConfiguredTableAssociationOutput,
  GetConfiguredTableAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/configuredTableAssociations/{configuredTableAssociationIdentifier}",
    input: { configuredTableAssociationIdentifier: 0, membershipIdentifier: 0 },
    output: { configuredTableAssociation: o_ConfiguredTableAssociation },
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
  operationName: "GetConfiguredTableAssociation",
})) as any;

export type GetConfiguredTableAssociationAnalysisRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the analysis rule for a configured table association.
 */
export const getConfiguredTableAssociationAnalysisRule: API.OperationMethod<
  GetConfiguredTableAssociationAnalysisRuleInput,
  GetConfiguredTableAssociationAnalysisRuleOutput,
  GetConfiguredTableAssociationAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/configuredTableAssociations/{configuredTableAssociationIdentifier}/analysisRule/{analysisRuleType}",
    input: {
      membershipIdentifier: 0,
      configuredTableAssociationIdentifier: 0,
      analysisRuleType: 0,
    },
    output: { analysisRule: o_ConfiguredTableAssociationAnalysisRule },
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
  operationName: "GetConfiguredTableAssociationAnalysisRule",
})) as any;

export type GetIdMappingTableError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an ID mapping table.
 */
export const getIdMappingTable: API.OperationMethod<
  GetIdMappingTableInput,
  GetIdMappingTableOutput,
  GetIdMappingTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/idmappingtables/{idMappingTableIdentifier}",
    input: { idMappingTableIdentifier: 0, membershipIdentifier: 0 },
    output: { idMappingTable: o_IdMappingTable },
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
  operationName: "GetIdMappingTable",
})) as any;

export type GetIdNamespaceAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an ID namespace association.
 */
export const getIdNamespaceAssociation: API.OperationMethod<
  GetIdNamespaceAssociationInput,
  GetIdNamespaceAssociationOutput,
  GetIdNamespaceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/idnamespaceassociations/{idNamespaceAssociationIdentifier}",
    input: { idNamespaceAssociationIdentifier: 0, membershipIdentifier: 0 },
    output: { idNamespaceAssociation: o_IdNamespaceAssociation },
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
  operationName: "GetIdNamespaceAssociation",
})) as any;

export type GetIntermediateTableError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves an intermediate table. Returns the full details of the intermediate table, including schema, table dependencies, inherited constraints, child resources, and status. Only the intermediate table owner can call this operation.
 */
export const getIntermediateTable: API.OperationMethod<
  GetIntermediateTableInput,
  GetIntermediateTableOutput,
  GetIntermediateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/intermediateTables/{intermediateTableIdentifier}",
    input: { intermediateTableIdentifier: 0, membershipIdentifier: 0 },
    output: { intermediateTable: o_IntermediateTable },
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
  operationName: "GetIntermediateTable",
})) as any;

export type GetIntermediateTableAnalysisRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the analysis rule for an intermediate table.
 */
export const getIntermediateTableAnalysisRule: API.OperationMethod<
  GetIntermediateTableAnalysisRuleInput,
  GetIntermediateTableAnalysisRuleOutput,
  GetIntermediateTableAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/intermediateTables/{intermediateTableIdentifier}/analysisRule/{analysisRuleType}",
    input: {
      membershipIdentifier: 0,
      intermediateTableIdentifier: 0,
      analysisRuleType: 0,
    },
    output: { analysisRule: o_IntermediateTableAnalysisRule },
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
  operationName: "GetIntermediateTableAnalysisRule",
})) as any;

export type GetMembershipError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a specified membership for an identifier.
 */
export const getMembership: API.OperationMethod<
  GetMembershipInput,
  GetMembershipOutput,
  GetMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}",
    input: { membershipIdentifier: 0 },
    output: { membership: o_Membership },
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
  operationName: "GetMembership",
})) as any;

export type GetPrivacyBudgetTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details for a specified privacy budget template.
 */
export const getPrivacyBudgetTemplate: API.OperationMethod<
  GetPrivacyBudgetTemplateInput,
  GetPrivacyBudgetTemplateOutput,
  GetPrivacyBudgetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/privacybudgettemplates/{privacyBudgetTemplateIdentifier}",
    input: { membershipIdentifier: 0, privacyBudgetTemplateIdentifier: 0 },
    output: { privacyBudgetTemplate: o_PrivacyBudgetTemplate },
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
  operationName: "GetPrivacyBudgetTemplate",
})) as any;

export type GetProtectedJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns job processing metadata.
 */
export const getProtectedJob: API.OperationMethod<
  GetProtectedJobInput,
  GetProtectedJobOutput,
  GetProtectedJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/protectedJobs/{protectedJobIdentifier}",
    input: { membershipIdentifier: 0, protectedJobIdentifier: 0 },
    output: { protectedJob: o_ProtectedJob },
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
  operationName: "GetProtectedJob",
})) as any;

export type GetProtectedQueryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns query processing metadata.
 */
export const getProtectedQuery: API.OperationMethod<
  GetProtectedQueryInput,
  GetProtectedQueryOutput,
  GetProtectedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/protectedQueries/{protectedQueryIdentifier}",
    input: { membershipIdentifier: 0, protectedQueryIdentifier: 0 },
    output: { protectedQuery: o_ProtectedQuery },
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
  operationName: "GetProtectedQuery",
})) as any;

export type GetSchemaError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the schema for a relation within a collaboration.
 */
export const getSchema: API.OperationMethod<
  GetSchemaInput,
  GetSchemaOutput,
  GetSchemaError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/schemas/{name}",
    input: { collaborationIdentifier: 0, name: 0 },
    output: { schema: o_Schema },
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
  operationName: "GetSchema",
})) as any;

export type GetSchemaAnalysisRuleError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a schema analysis rule.
 */
export const getSchemaAnalysisRule: API.OperationMethod<
  GetSchemaAnalysisRuleInput,
  GetSchemaAnalysisRuleOutput,
  GetSchemaAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/schemas/{name}/analysisRule/{type}",
    input: { collaborationIdentifier: 0, name: 0, type: 0 },
    output: { analysisRule: o_AnalysisRule },
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
  operationName: "GetSchemaAnalysisRule",
})) as any;

export type ListAnalysisLogExportsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists analysis log exports, sorted by the most recent export. Results are paginated. Use the `nextToken` parameter to retrieve additional results.
 */
export const listAnalysisLogExports: API.PaginatedOperationMethod<
  ListAnalysisLogExportsInput,
  ListAnalysisLogExportsOutput,
  ListAnalysisLogExportsError,
  Credentials | HttpClient.HttpClient,
  AnalysisLogExportSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/analysislogexports",
    input: {
      membershipIdentifier: 0,
      analysisIdentifier: D.m({ query: "analysisIdentifier" }),
      status: D.m({ query: "status" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { analysisLogExports: D.list({ createTime: D.ts }) },
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
  operationName: "ListAnalysisLogExports",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "analysisLogExports",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAnalysisTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists analysis templates that the caller owns.
 */
export const listAnalysisTemplates: API.PaginatedOperationMethod<
  ListAnalysisTemplatesInput,
  ListAnalysisTemplatesOutput,
  ListAnalysisTemplatesError,
  Credentials | HttpClient.HttpClient,
  AnalysisTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/analysistemplates",
    input: {
      membershipIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      analysisTemplateSummaries: D.list({ createTime: D.ts, updateTime: D.ts }),
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
  operationName: "ListAnalysisTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "analysisTemplateSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationAnalysisTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists analysis templates within a collaboration.
 */
export const listCollaborationAnalysisTemplates: API.PaginatedOperationMethod<
  ListCollaborationAnalysisTemplatesInput,
  ListCollaborationAnalysisTemplatesOutput,
  ListCollaborationAnalysisTemplatesError,
  Credentials | HttpClient.HttpClient,
  CollaborationAnalysisTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/analysistemplates",
    input: {
      collaborationIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      collaborationAnalysisTemplateSummaries: D.list({
        createTime: D.ts,
        updateTime: D.ts,
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
  operationName: "ListCollaborationAnalysisTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationAnalysisTemplateSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationChangeRequestsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all change requests for a collaboration with pagination support. Returns change requests sorted by creation time.
 */
export const listCollaborationChangeRequests: API.PaginatedOperationMethod<
  ListCollaborationChangeRequestsInput,
  ListCollaborationChangeRequestsOutput,
  ListCollaborationChangeRequestsError,
  Credentials | HttpClient.HttpClient,
  CollaborationChangeRequestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/changeRequests",
    input: {
      collaborationIdentifier: 0,
      status: D.m({ query: "status" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      collaborationChangeRequestSummaries: D.list({
        createTime: D.ts,
        updateTime: D.ts,
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
  operationName: "ListCollaborationChangeRequests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationChangeRequestSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationConfiguredAudienceModelAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists configured audience model associations within a collaboration.
 */
export const listCollaborationConfiguredAudienceModelAssociations: API.PaginatedOperationMethod<
  ListCollaborationConfiguredAudienceModelAssociationsInput,
  ListCollaborationConfiguredAudienceModelAssociationsOutput,
  ListCollaborationConfiguredAudienceModelAssociationsError,
  Credentials | HttpClient.HttpClient,
  CollaborationConfiguredAudienceModelAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/configuredaudiencemodelassociations",
    input: {
      collaborationIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      collaborationConfiguredAudienceModelAssociationSummaries: D.list({
        createTime: D.ts,
        updateTime: D.ts,
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
  operationName: "ListCollaborationConfiguredAudienceModelAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationConfiguredAudienceModelAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationIdNamespaceAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the ID namespace associations in a collaboration.
 */
export const listCollaborationIdNamespaceAssociations: API.PaginatedOperationMethod<
  ListCollaborationIdNamespaceAssociationsInput,
  ListCollaborationIdNamespaceAssociationsOutput,
  ListCollaborationIdNamespaceAssociationsError,
  Credentials | HttpClient.HttpClient,
  CollaborationIdNamespaceAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/idnamespaceassociations",
    input: {
      collaborationIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      collaborationIdNamespaceAssociationSummaries: D.list({
        createTime: D.ts,
        updateTime: D.ts,
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
  operationName: "ListCollaborationIdNamespaceAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationIdNamespaceAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationPrivacyBudgetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns an array that summarizes each privacy budget in a specified collaboration. The summary includes the collaboration ARN, creation time, creating account, and privacy budget details.
 */
export const listCollaborationPrivacyBudgets: API.PaginatedOperationMethod<
  ListCollaborationPrivacyBudgetsInput,
  ListCollaborationPrivacyBudgetsOutput,
  ListCollaborationPrivacyBudgetsError,
  Credentials | HttpClient.HttpClient,
  CollaborationPrivacyBudgetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/privacybudgets",
    input: {
      collaborationIdentifier: 0,
      privacyBudgetType: D.m({ query: "privacyBudgetType" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      accessBudgetResourceArn: D.m({ query: "accessBudgetResourceArn" }),
    },
    output: {
      collaborationPrivacyBudgetSummaries: D.list({
        createTime: D.ts,
        updateTime: D.ts,
        budget: o_PrivacyBudget,
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
  operationName: "ListCollaborationPrivacyBudgets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationPrivacyBudgetSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationPrivacyBudgetTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns an array that summarizes each privacy budget template in a specified collaboration.
 */
export const listCollaborationPrivacyBudgetTemplates: API.PaginatedOperationMethod<
  ListCollaborationPrivacyBudgetTemplatesInput,
  ListCollaborationPrivacyBudgetTemplatesOutput,
  ListCollaborationPrivacyBudgetTemplatesError,
  Credentials | HttpClient.HttpClient,
  CollaborationPrivacyBudgetTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/privacybudgettemplates",
    input: {
      collaborationIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      collaborationPrivacyBudgetTemplateSummaries: D.list({
        createTime: D.ts,
        updateTime: D.ts,
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
  operationName: "ListCollaborationPrivacyBudgetTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationPrivacyBudgetTemplateSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListCollaborationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists collaborations the caller owns, is active in, or has been invited to.
 */
export const listCollaborations: API.PaginatedOperationMethod<
  ListCollaborationsInput,
  ListCollaborationsOutput,
  ListCollaborationsError,
  Credentials | HttpClient.HttpClient,
  CollaborationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      memberStatus: D.m({ query: "memberStatus" }),
    },
    output: {
      collaborationList: D.list({ createTime: D.ts, updateTime: D.ts }),
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
  operationName: "ListCollaborations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "collaborationList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfiguredAudienceModelAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about requested configured audience model associations.
 */
export const listConfiguredAudienceModelAssociations: API.PaginatedOperationMethod<
  ListConfiguredAudienceModelAssociationsInput,
  ListConfiguredAudienceModelAssociationsOutput,
  ListConfiguredAudienceModelAssociationsError,
  Credentials | HttpClient.HttpClient,
  ConfiguredAudienceModelAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/configuredaudiencemodelassociations",
    input: {
      membershipIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      configuredAudienceModelAssociationSummaries: D.list({
        createTime: D.ts,
        updateTime: D.ts,
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
  operationName: "ListConfiguredAudienceModelAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configuredAudienceModelAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfiguredTableAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists configured table associations for a membership.
 */
export const listConfiguredTableAssociations: API.PaginatedOperationMethod<
  ListConfiguredTableAssociationsInput,
  ListConfiguredTableAssociationsOutput,
  ListConfiguredTableAssociationsError,
  Credentials | HttpClient.HttpClient,
  ConfiguredTableAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/configuredTableAssociations",
    input: {
      membershipIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      configuredTableAssociationSummaries: D.list({
        createTime: D.ts,
        updateTime: D.ts,
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
  operationName: "ListConfiguredTableAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configuredTableAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListConfiguredTablesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists configured tables.
 */
export const listConfiguredTables: API.PaginatedOperationMethod<
  ListConfiguredTablesInput,
  ListConfiguredTablesOutput,
  ListConfiguredTablesError,
  Credentials | HttpClient.HttpClient,
  ConfiguredTableSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /configuredTables",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      configuredTableSummaries: D.list({ createTime: D.ts, updateTime: D.ts }),
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
  operationName: "ListConfiguredTables",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "configuredTableSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIdMappingTablesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of ID mapping tables.
 */
export const listIdMappingTables: API.PaginatedOperationMethod<
  ListIdMappingTablesInput,
  ListIdMappingTablesOutput,
  ListIdMappingTablesError,
  Credentials | HttpClient.HttpClient,
  IdMappingTableSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/idmappingtables",
    input: {
      membershipIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      idMappingTableSummaries: D.list({ createTime: D.ts, updateTime: D.ts }),
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
  operationName: "ListIdMappingTables",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "idMappingTableSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIdNamespaceAssociationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of ID namespace associations.
 */
export const listIdNamespaceAssociations: API.PaginatedOperationMethod<
  ListIdNamespaceAssociationsInput,
  ListIdNamespaceAssociationsOutput,
  ListIdNamespaceAssociationsError,
  Credentials | HttpClient.HttpClient,
  IdNamespaceAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/idnamespaceassociations",
    input: {
      membershipIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      idNamespaceAssociationSummaries: D.list({
        createTime: D.ts,
        updateTime: D.ts,
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
  operationName: "ListIdNamespaceAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "idNamespaceAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIntermediateTablesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists intermediate tables owned by the caller in a membership. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listIntermediateTables: API.PaginatedOperationMethod<
  ListIntermediateTablesInput,
  ListIntermediateTablesOutput,
  ListIntermediateTablesError,
  Credentials | HttpClient.HttpClient,
  IntermediateTableSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/intermediateTables",
    input: {
      membershipIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      intermediateTableSummaries: D.list({
        createTime: D.ts,
        updateTime: D.ts,
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
  operationName: "ListIntermediateTables",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "intermediateTableSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIntermediateTableVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the version history of an intermediate table. Each call to `PopulateIntermediateTable` creates a new version. We recommend using pagination to ensure that the operation returns quickly and successfully.
 */
export const listIntermediateTableVersions: API.PaginatedOperationMethod<
  ListIntermediateTableVersionsInput,
  ListIntermediateTableVersionsOutput,
  ListIntermediateTableVersionsError,
  Credentials | HttpClient.HttpClient,
  IntermediateTableVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/intermediateTables/{intermediateTableIdentifier}/versions",
    input: {
      membershipIdentifier: 0,
      intermediateTableIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      intermediateTableVersionSummaries: D.list({
        createTime: D.ts,
        expirationTime: D.ts,
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
  operationName: "ListIntermediateTableVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "intermediateTableVersionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMembersError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all members within a collaboration.
 */
export const listMembers: API.PaginatedOperationMethod<
  ListMembersInput,
  ListMembersOutput,
  ListMembersError,
  Credentials | HttpClient.HttpClient,
  MemberSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/members",
    input: {
      collaborationIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { memberSummaries: D.list({ createTime: D.ts, updateTime: D.ts }) },
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
  operationName: "ListMembers",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "memberSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMembershipsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all memberships resources within the caller's account.
 */
export const listMemberships: API.PaginatedOperationMethod<
  ListMembershipsInput,
  ListMembershipsOutput,
  ListMembershipsError,
  Credentials | HttpClient.HttpClient,
  MembershipSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      status: D.m({ query: "status" }),
    },
    output: {
      membershipSummaries: D.list({ createTime: D.ts, updateTime: D.ts }),
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
  operationName: "ListMemberships",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "membershipSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPrivacyBudgetsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed information about the privacy budgets in a specified membership.
 */
export const listPrivacyBudgets: API.PaginatedOperationMethod<
  ListPrivacyBudgetsInput,
  ListPrivacyBudgetsOutput,
  ListPrivacyBudgetsError,
  Credentials | HttpClient.HttpClient,
  PrivacyBudgetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/privacybudgets",
    input: {
      membershipIdentifier: 0,
      privacyBudgetType: D.m({ query: "privacyBudgetType" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      accessBudgetResourceArn: D.m({ query: "accessBudgetResourceArn" }),
    },
    output: {
      privacyBudgetSummaries: D.list({
        createTime: D.ts,
        updateTime: D.ts,
        budget: o_PrivacyBudget,
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
  operationName: "ListPrivacyBudgets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "privacyBudgetSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPrivacyBudgetTemplatesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns detailed information about the privacy budget templates in a specified membership.
 */
export const listPrivacyBudgetTemplates: API.PaginatedOperationMethod<
  ListPrivacyBudgetTemplatesInput,
  ListPrivacyBudgetTemplatesOutput,
  ListPrivacyBudgetTemplatesError,
  Credentials | HttpClient.HttpClient,
  PrivacyBudgetTemplateSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/privacybudgettemplates",
    input: {
      membershipIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      privacyBudgetTemplateSummaries: D.list({
        createTime: D.ts,
        updateTime: D.ts,
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
  operationName: "ListPrivacyBudgetTemplates",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "privacyBudgetTemplateSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProtectedJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists protected jobs, sorted by most recent job.
 */
export const listProtectedJobs: API.PaginatedOperationMethod<
  ListProtectedJobsInput,
  ListProtectedJobsOutput,
  ListProtectedJobsError,
  Credentials | HttpClient.HttpClient,
  ProtectedJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/protectedJobs",
    input: {
      membershipIdentifier: 0,
      status: D.m({ query: "status" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { protectedJobs: D.list({ createTime: D.ts }) },
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
  operationName: "ListProtectedJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "protectedJobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProtectedQueriesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists protected queries, sorted by the most recent query.
 */
export const listProtectedQueries: API.PaginatedOperationMethod<
  ListProtectedQueriesInput,
  ListProtectedQueriesOutput,
  ListProtectedQueriesError,
  Credentials | HttpClient.HttpClient,
  ProtectedQuerySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /memberships/{membershipIdentifier}/protectedQueries",
    input: {
      membershipIdentifier: 0,
      status: D.m({ query: "status" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { protectedQueries: D.list({ createTime: D.ts }) },
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
  operationName: "ListProtectedQueries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "protectedQueries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSchemasError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the schemas for relations within a collaboration.
 */
export const listSchemas: API.PaginatedOperationMethod<
  ListSchemasInput,
  ListSchemasOutput,
  ListSchemasError,
  Credentials | HttpClient.HttpClient,
  SchemaSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /collaborations/{collaborationIdentifier}/schemas",
    input: {
      collaborationIdentifier: 0,
      schemaType: D.m({ query: "schemaType" }),
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { schemaSummaries: D.list({ createTime: D.ts, updateTime: D.ts }) },
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
  operationName: "ListSchemas",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "schemaSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists all of the tags that have been added to a resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PopulateIdMappingTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Defines the information that's necessary to populate an ID mapping table.
 */
export const populateIdMappingTable: API.OperationMethod<
  PopulateIdMappingTableInput,
  PopulateIdMappingTableOutput,
  PopulateIdMappingTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/idmappingtables/{idMappingTableIdentifier}/populate",
    input: { idMappingTableIdentifier: 0, membershipIdentifier: 0, jobType: 0 },
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
  operationName: "PopulateIdMappingTable",
})) as any;

export type PopulateIntermediateTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Runs the stored query of an intermediate table and makes the results available for querying. Each call creates a new version. Use `GetProtectedQuery` with the returned analysis ID to track progress. Only the intermediate table owner can call this operation.
 */
export const populateIntermediateTable: API.OperationMethod<
  PopulateIntermediateTableInput,
  PopulateIntermediateTableOutput,
  PopulateIntermediateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/intermediateTables/{intermediateTableIdentifier}/populate",
    input: {
      intermediateTableIdentifier: 0,
      membershipIdentifier: 0,
      parameters: 0,
      computeConfiguration: {
        queryComputeConfiguration: i_WorkerComputeConfiguration,
      },
      analysisPayerAccountId: 0,
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
  operationName: "PopulateIntermediateTable",
})) as any;

export type PreviewPrivacyImpactError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * An estimate of the number of aggregation functions that the member who can query can run given epsilon and noise parameters.
 */
export const previewPrivacyImpact: API.OperationMethod<
  PreviewPrivacyImpactInput,
  PreviewPrivacyImpactOutput,
  PreviewPrivacyImpactError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/previewprivacyimpact",
    input: {
      membershipIdentifier: 0,
      parameters: {
        differentialPrivacy: { epsilon: 0, usersNoisePerQuery: 0 },
      },
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
  operationName: "PreviewPrivacyImpact",
})) as any;

export type StartAnalysisLogExportError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an export of the Apache Spark logs for a protected query to an Amazon S3 bucket that you own. Use the exported logs to diagnose a query that failed or that ran more slowly than you expected.
 *
 * Clean Rooms exports a redacted copy of the Spark logs instead of the raw logs. Analyze the exported logs with the tooling of your choice, such as Spark History Server. For details about what the exported logs contain, see https://docs.aws.amazon.com/clean-rooms/latest/userguide/export-analysis-logs-contents.html.
 *
 * The export runs asynchronously and returns with a `status` of `IN_PROGRESS`. Call `GetAnalysisLogExport` to poll for the final status.
 *
 * To use this operation, you must have the `CAN_EXPORT_QUERY_ANALYSIS_LOG` ability for your membership. You must also be the query runner or the query payer. Having the ability alone is not sufficient.
 *
 * The query must have reached a terminal state, and it must have reached the execution stage. A query that failed validation or that was canceled before it started produces no Spark logs.
 *
 * Log export isn't supported for queries that use differential privacy, and isn't supported for PySpark jobs.
 *
 * The destination bucket must be in the same Amazon Web Services Region as the collaboration. Cross-Region export isn't supported.
 *
 * For more information, see https://docs.aws.amazon.com/clean-rooms/latest/userguide/export-analysis-logs.html.
 */
export const startAnalysisLogExport: API.OperationMethod<
  StartAnalysisLogExportInput,
  StartAnalysisLogExportOutput,
  StartAnalysisLogExportError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/analysislogexports",
    input: {
      membershipIdentifier: 0,
      analysisId: 0,
      analysisType: 0,
      resultConfiguration: {
        outputConfiguration: { s3: { bucket: 0, keyPrefix: 0 } },
      },
    },
    output: { analysisLogExport: o_AnalysisLogExport },
    body: true,
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
  operationName: "StartAnalysisLogExport",
})) as any;

export type StartProtectedJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a protected job that is started by Clean Rooms.
 */
export const startProtectedJob: API.OperationMethod<
  StartProtectedJobInput,
  StartProtectedJobOutput,
  StartProtectedJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/protectedJobs",
    input: {
      type: 0,
      membershipIdentifier: 0,
      jobParameters: { analysisTemplateArn: 0, parameters: 0 },
      resultConfiguration: {
        outputConfiguration: { member: { accountId: 0 } },
      },
      computeConfiguration: {
        worker: {
          type: 0,
          number: 0,
          properties: i_WorkerComputeConfigurationProperties,
        },
      },
      jobComputePayerAccountId: 0,
    },
    output: { protectedJob: o_ProtectedJob },
    body: true,
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
  operationName: "StartProtectedJob",
})) as any;

export type StartProtectedQueryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a protected query that is started by Clean Rooms.
 */
export const startProtectedQuery: API.OperationMethod<
  StartProtectedQueryInput,
  StartProtectedQueryOutput,
  StartProtectedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memberships/{membershipIdentifier}/protectedQueries",
    input: {
      type: 0,
      membershipIdentifier: 0,
      sqlParameters: { queryString: 0, analysisTemplateArn: 0, parameters: 0 },
      resultConfiguration: {
        outputConfiguration: {
          s3: i_ProtectedQueryS3OutputConfiguration,
          member: i_ProtectedQueryMemberOutputConfiguration,
          distribute: {
            locations: D.list({
              s3: i_ProtectedQueryS3OutputConfiguration,
              member: i_ProtectedQueryMemberOutputConfiguration,
            }),
          },
          intermediateTable: { id: 0, arn: 0, name: 0 },
        },
      },
      computeConfiguration: { worker: i_WorkerComputeConfiguration },
      queryComputePayerAccountId: 0,
    },
    output: { protectedQuery: o_ProtectedQuery },
    body: true,
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
  operationName: "StartProtectedQuery",
})) as any;

export type TagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Tags a resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag or list of tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateAnalysisTemplateError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the analysis template metadata.
 */
export const updateAnalysisTemplate: API.OperationMethod<
  UpdateAnalysisTemplateInput,
  UpdateAnalysisTemplateOutput,
  UpdateAnalysisTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /memberships/{membershipIdentifier}/analysistemplates/{analysisTemplateIdentifier}",
    input: {
      membershipIdentifier: 0,
      analysisTemplateIdentifier: 0,
      description: 0,
    },
    output: { analysisTemplate: o_AnalysisTemplate },
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
  operationName: "UpdateAnalysisTemplate",
})) as any;

export type UpdateCollaborationError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates collaboration metadata and can only be called by the collaboration owner.
 */
export const updateCollaboration: API.OperationMethod<
  UpdateCollaborationInput,
  UpdateCollaborationOutput,
  UpdateCollaborationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /collaborations/{collaborationIdentifier}",
    input: {
      collaborationIdentifier: 0,
      name: 0,
      description: 0,
      analyticsEngine: 0,
    },
    output: { collaboration: o_Collaboration },
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
  operationName: "UpdateCollaboration",
})) as any;

export type UpdateCollaborationChangeRequestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing collaboration change request. This operation allows approval actions for pending change requests in collaborations (APPROVE, DENY, CANCEL, COMMIT).
 *
 * For change requests without automatic approval, a member in the collaboration can manually APPROVE or DENY a change request. The collaboration owner can manually CANCEL or COMMIT a change request.
 */
export const updateCollaborationChangeRequest: API.OperationMethod<
  UpdateCollaborationChangeRequestInput,
  UpdateCollaborationChangeRequestOutput,
  UpdateCollaborationChangeRequestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /collaborations/{collaborationIdentifier}/changeRequests/{changeRequestIdentifier}",
    input: {
      collaborationIdentifier: 0,
      changeRequestIdentifier: 0,
      action: 0,
    },
    output: { collaborationChangeRequest: o_CollaborationChangeRequest },
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
  operationName: "UpdateCollaborationChangeRequest",
})) as any;

export type UpdateConfiguredAudienceModelAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the details necessary to update a configured audience model association.
 */
export const updateConfiguredAudienceModelAssociation: API.OperationMethod<
  UpdateConfiguredAudienceModelAssociationInput,
  UpdateConfiguredAudienceModelAssociationOutput,
  UpdateConfiguredAudienceModelAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /memberships/{membershipIdentifier}/configuredaudiencemodelassociations/{configuredAudienceModelAssociationIdentifier}",
    input: {
      configuredAudienceModelAssociationIdentifier: 0,
      membershipIdentifier: 0,
      description: 0,
      name: 0,
    },
    output: {
      configuredAudienceModelAssociation: o_ConfiguredAudienceModelAssociation,
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
  operationName: "UpdateConfiguredAudienceModelAssociation",
})) as any;

export type UpdateConfiguredTableError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a configured table.
 */
export const updateConfiguredTable: API.OperationMethod<
  UpdateConfiguredTableInput,
  UpdateConfiguredTableOutput,
  UpdateConfiguredTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /configuredTables/{configuredTableIdentifier}",
    input: {
      configuredTableIdentifier: 0,
      name: 0,
      description: 0,
      tableReference: i_TableReference,
      allowedColumns: 0,
      analysisMethod: 0,
      selectedAnalysisMethods: 0,
    },
    output: { configuredTable: o_ConfiguredTable },
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
  operationName: "UpdateConfiguredTable",
})) as any;

export type UpdateConfiguredTableAnalysisRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a configured table analysis rule.
 */
export const updateConfiguredTableAnalysisRule: API.OperationMethod<
  UpdateConfiguredTableAnalysisRuleInput,
  UpdateConfiguredTableAnalysisRuleOutput,
  UpdateConfiguredTableAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /configuredTables/{configuredTableIdentifier}/analysisRule/{analysisRuleType}",
    input: {
      configuredTableIdentifier: 0,
      analysisRuleType: 0,
      analysisRulePolicy: i_ConfiguredTableAnalysisRulePolicy,
    },
    output: { analysisRule: o_ConfiguredTableAnalysisRule },
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
  operationName: "UpdateConfiguredTableAnalysisRule",
})) as any;

export type UpdateConfiguredTableAssociationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a configured table association.
 */
export const updateConfiguredTableAssociation: API.OperationMethod<
  UpdateConfiguredTableAssociationInput,
  UpdateConfiguredTableAssociationOutput,
  UpdateConfiguredTableAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /memberships/{membershipIdentifier}/configuredTableAssociations/{configuredTableAssociationIdentifier}",
    input: {
      configuredTableAssociationIdentifier: 0,
      membershipIdentifier: 0,
      description: 0,
      roleArn: 0,
    },
    output: { configuredTableAssociation: o_ConfiguredTableAssociation },
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
  operationName: "UpdateConfiguredTableAssociation",
})) as any;

export type UpdateConfiguredTableAssociationAnalysisRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the analysis rule for a configured table association.
 */
export const updateConfiguredTableAssociationAnalysisRule: API.OperationMethod<
  UpdateConfiguredTableAssociationAnalysisRuleInput,
  UpdateConfiguredTableAssociationAnalysisRuleOutput,
  UpdateConfiguredTableAssociationAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /memberships/{membershipIdentifier}/configuredTableAssociations/{configuredTableAssociationIdentifier}/analysisRule/{analysisRuleType}",
    input: {
      membershipIdentifier: 0,
      configuredTableAssociationIdentifier: 0,
      analysisRuleType: 0,
      analysisRulePolicy: i_ConfiguredTableAssociationAnalysisRulePolicy,
    },
    output: { analysisRule: o_ConfiguredTableAssociationAnalysisRule },
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
  operationName: "UpdateConfiguredTableAssociationAnalysisRule",
})) as any;

export type UpdateIdMappingTableError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the details that are necessary to update an ID mapping table.
 */
export const updateIdMappingTable: API.OperationMethod<
  UpdateIdMappingTableInput,
  UpdateIdMappingTableOutput,
  UpdateIdMappingTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /memberships/{membershipIdentifier}/idmappingtables/{idMappingTableIdentifier}",
    input: {
      idMappingTableIdentifier: 0,
      membershipIdentifier: 0,
      description: 0,
      kmsKeyArn: 0,
    },
    output: { idMappingTable: o_IdMappingTable },
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
  operationName: "UpdateIdMappingTable",
})) as any;

export type UpdateIdNamespaceAssociationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Provides the details that are necessary to update an ID namespace association.
 */
export const updateIdNamespaceAssociation: API.OperationMethod<
  UpdateIdNamespaceAssociationInput,
  UpdateIdNamespaceAssociationOutput,
  UpdateIdNamespaceAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /memberships/{membershipIdentifier}/idnamespaceassociations/{idNamespaceAssociationIdentifier}",
    input: {
      idNamespaceAssociationIdentifier: 0,
      membershipIdentifier: 0,
      name: 0,
      description: 0,
      idMappingConfig: i_IdMappingConfig,
    },
    output: { idNamespaceAssociation: o_IdNamespaceAssociation },
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
  operationName: "UpdateIdNamespaceAssociation",
})) as any;

export type UpdateIntermediateTableError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an intermediate table. You can update the description, KMS key ARN, and column types of existing columns. Only the intermediate table owner can call this operation.
 */
export const updateIntermediateTable: API.OperationMethod<
  UpdateIntermediateTableInput,
  UpdateIntermediateTableOutput,
  UpdateIntermediateTableError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /memberships/{membershipIdentifier}/intermediateTables/{intermediateTableIdentifier}",
    input: {
      intermediateTableIdentifier: 0,
      membershipIdentifier: 0,
      description: 0,
      kmsKeyArn: 0,
      columns: D.list({ name: 0, type: 0 }),
    },
    output: { intermediateTable: o_IntermediateTable },
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
  operationName: "UpdateIntermediateTable",
})) as any;

export type UpdateIntermediateTableAnalysisRuleError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the analysis rule policy for an intermediate table. Only the intermediate table owner can call this operation.
 */
export const updateIntermediateTableAnalysisRule: API.OperationMethod<
  UpdateIntermediateTableAnalysisRuleInput,
  UpdateIntermediateTableAnalysisRuleOutput,
  UpdateIntermediateTableAnalysisRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /memberships/{membershipIdentifier}/intermediateTables/{intermediateTableIdentifier}/analysisRule/{analysisRuleType}",
    input: {
      membershipIdentifier: 0,
      intermediateTableIdentifier: 0,
      analysisRuleType: 0,
      analysisRulePolicy: i_IntermediateTableAnalysisRulePolicy,
    },
    output: { analysisRule: o_IntermediateTableAnalysisRule },
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
  operationName: "UpdateIntermediateTableAnalysisRule",
})) as any;

export type UpdateMembershipError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a membership.
 */
export const updateMembership: API.OperationMethod<
  UpdateMembershipInput,
  UpdateMembershipOutput,
  UpdateMembershipError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /memberships/{membershipIdentifier}",
    input: {
      membershipIdentifier: 0,
      queryLogStatus: 0,
      jobLogStatus: 0,
      defaultResultConfiguration: i_MembershipProtectedQueryResultConfiguration,
      defaultJobResultConfiguration:
        i_MembershipProtectedJobResultConfiguration,
      membershipPaymentConfiguration: {
        queryCompute: i_MembershipQueryComputePaymentConfig,
        machineLearning: i_MembershipMLPaymentConfig,
        jobCompute: i_MembershipJobComputePaymentConfig,
      },
    },
    output: { membership: o_Membership },
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
  operationName: "UpdateMembership",
})) as any;

export type UpdatePrivacyBudgetTemplateError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the privacy budget template for the specified collaboration.
 */
export const updatePrivacyBudgetTemplate: API.OperationMethod<
  UpdatePrivacyBudgetTemplateInput,
  UpdatePrivacyBudgetTemplateOutput,
  UpdatePrivacyBudgetTemplateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /memberships/{membershipIdentifier}/privacybudgettemplates/{privacyBudgetTemplateIdentifier}",
    input: {
      membershipIdentifier: 0,
      privacyBudgetTemplateIdentifier: 0,
      privacyBudgetType: 0,
      parameters: {
        differentialPrivacy: { epsilon: 0, usersNoisePerQuery: 0 },
        accessBudget: { budgetParameters: D.list(i_BudgetParameter) },
      },
    },
    output: { privacyBudgetTemplate: o_PrivacyBudgetTemplate },
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
  operationName: "UpdatePrivacyBudgetTemplate",
})) as any;

export type UpdateProtectedJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the processing of a currently running job.
 */
export const updateProtectedJob: API.OperationMethod<
  UpdateProtectedJobInput,
  UpdateProtectedJobOutput,
  UpdateProtectedJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /memberships/{membershipIdentifier}/protectedJobs/{protectedJobIdentifier}",
    input: {
      membershipIdentifier: 0,
      protectedJobIdentifier: 0,
      targetStatus: 0,
    },
    output: { protectedJob: o_ProtectedJob },
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
  operationName: "UpdateProtectedJob",
})) as any;

export type UpdateProtectedQueryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the processing of a currently running query.
 */
export const updateProtectedQuery: API.OperationMethod<
  UpdateProtectedQueryInput,
  UpdateProtectedQueryOutput,
  UpdateProtectedQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /memberships/{membershipIdentifier}/protectedQueries/{protectedQueryIdentifier}",
    input: {
      membershipIdentifier: 0,
      protectedQueryIdentifier: 0,
      targetStatus: 0,
    },
    output: { protectedQuery: o_ProtectedQuery },
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
  operationName: "UpdateProtectedQuery",
})) as any;

const i_AnalysisTemplateArtifact: D.LazyStruct = () => ({
  location: { bucket: 0, key: 0 },
});
const i_BudgetParameter: D.LazyStruct = () => ({
  type: 0,
  budget: 0,
  autoRefresh: 0,
});
const i_ConfiguredTableAnalysisRulePolicy: D.LazyStruct = () => ({
  v1: {
    list: {
      joinColumns: 0,
      allowedJoinOperators: 0,
      listColumns: 0,
      additionalAnalyses: 0,
    },
    aggregation: {
      aggregateColumns: D.list({ columnNames: 0, function: 0 }),
      joinColumns: 0,
      joinRequired: 0,
      allowedJoinOperators: 0,
      dimensionColumns: 0,
      scalarFunctions: 0,
      outputConstraints: D.list({ columnName: 0, minimum: 0, type: 0 }),
      additionalAnalyses: 0,
    },
    custom: {
      allowedAnalyses: 0,
      allowedAnalysisProviders: 0,
      additionalAnalyses: 0,
      disallowedOutputColumns: 0,
      differentialPrivacy: i_DifferentialPrivacyConfiguration,
      aggregationThresholds: D.list(i_AggregationThreshold),
      comparisonControls: i_ComparisonControls,
      allowedResultReceivers: 0,
      allowedAdditionalAnalyses: 0,
    },
  },
});
const i_ConfiguredTableAssociationAnalysisRulePolicy: D.LazyStruct = () => ({
  v1: {
    list: { allowedResultReceivers: 0, allowedAdditionalAnalyses: 0 },
    aggregation: { allowedResultReceivers: 0, allowedAdditionalAnalyses: 0 },
    custom: { allowedResultReceivers: 0, allowedAdditionalAnalyses: 0 },
  },
});
const i_IdMappingConfig: D.LazyStruct = () => ({
  allowUseAsDimensionColumn: 0,
});
const i_IntermediateTableAnalysisRulePolicy: D.LazyStruct = () => ({
  v1: {
    custom: {
      allowedAnalyses: 0,
      additionalAnalyses: 0,
      allowedAdditionalAnalyses: 0,
      allowedAnalysisProviders: 0,
      allowedResultReceivers: 0,
      differentialPrivacy: i_DifferentialPrivacyConfiguration,
      disallowedOutputColumns: 0,
      aggregationThresholds: D.list(i_AggregationThreshold),
      comparisonControls: i_ComparisonControls,
    },
  },
});
const i_MLMemberAbilities: D.LazyStruct = () => ({
  customMLMemberAbilities: 0,
});
const i_MembershipJobComputePaymentConfig: D.LazyStruct = () => ({
  isResponsible: 0,
});
const i_MembershipMLPaymentConfig: D.LazyStruct = () => ({
  modelTraining: { isResponsible: 0 },
  modelInference: { isResponsible: 0 },
  syntheticDataGeneration: { isResponsible: 0 },
});
const i_MembershipProtectedJobResultConfiguration: D.LazyStruct = () => ({
  outputConfiguration: { s3: { bucket: 0, keyPrefix: 0 } },
  roleArn: 0,
});
const i_MembershipProtectedQueryResultConfiguration: D.LazyStruct = () => ({
  outputConfiguration: { s3: i_ProtectedQueryS3OutputConfiguration },
  roleArn: 0,
});
const i_MembershipQueryComputePaymentConfig: D.LazyStruct = () => ({
  isResponsible: 0,
});
const i_PaymentConfiguration: D.LazyStruct = () => ({
  queryCompute: { isResponsible: 0 },
  machineLearning: {
    modelTraining: { isResponsible: 0 },
    modelInference: { isResponsible: 0 },
    syntheticDataGeneration: { isResponsible: 0 },
  },
  jobCompute: { isResponsible: 0 },
});
const i_ProtectedQueryMemberOutputConfiguration: D.LazyStruct = () => ({
  accountId: 0,
});
const i_ProtectedQueryS3OutputConfiguration: D.LazyStruct = () => ({
  resultFormat: 0,
  bucket: 0,
  keyPrefix: 0,
  singleFileOutput: 0,
});
const i_TableReference: D.LazyStruct = () => ({
  glue: { region: 0, tableName: 0, databaseName: 0 },
  snowflake: {
    secretArn: 0,
    accountIdentifier: 0,
    databaseName: 0,
    tableName: 0,
    schemaName: 0,
    tableSchema: { v1: D.list({ columnName: 0, columnType: 0 }) },
  },
  athena: {
    region: 0,
    workGroup: 0,
    outputLocation: 0,
    databaseName: 0,
    tableName: 0,
    catalogName: 0,
  },
});
const i_WorkerComputeConfiguration: D.LazyStruct = () => ({
  type: 0,
  number: 0,
  properties: i_WorkerComputeConfigurationProperties,
});
const i_WorkerComputeConfigurationProperties: D.LazyStruct = () => ({
  spark: 0,
});
const o_AnalysisLogExport: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
const o_AnalysisRule: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
const o_AnalysisTemplate: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
  source: o_AnalysisSource,
});
const o_Collaboration: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
const o_CollaborationAnalysisTemplate: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
  source: o_AnalysisSource,
});
const o_CollaborationChangeRequest: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
const o_ConfiguredAudienceModelAssociation: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
const o_ConfiguredTable: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
const o_ConfiguredTableAnalysisRule: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
const o_ConfiguredTableAssociation: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
const o_ConfiguredTableAssociationAnalysisRule: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
const o_IdMappingTable: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
const o_IdNamespaceAssociation: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
const o_IntermediateTable: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
  intermediateTableVersion: { expirationTime: D.ts },
});
const o_IntermediateTableAnalysisRule: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
const o_Membership: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
const o_PrivacyBudget: D.LazyStruct = () => ({
  accessBudget: { details: D.list({ startTime: D.ts, endTime: D.ts }) },
});
const o_PrivacyBudgetTemplate: D.LazyStruct = () => ({
  createTime: D.ts,
  updateTime: D.ts,
});
const o_ProtectedJob: D.LazyStruct = () => ({ createTime: D.ts });
const o_ProtectedQuery: D.LazyStruct = () => ({ createTime: D.ts });
const o_Schema: D.LazyStruct = () => ({ createTime: D.ts, updateTime: D.ts });
const i_AggregationThreshold: D.LazyStruct = () => ({
  identityColumns: 0,
  minimumIdentityCount: 0,
  type: 0,
  outputColumnThresholds: D.list({
    outputColumnName: 0,
    minimumIdentityCount: 0,
  }),
  allowedAggregateExpressionType: 0,
});
const i_ComparisonControls: D.LazyStruct = () => ({
  allowedLiteralComparisonColumns: 0,
  allowedColumnComparisonColumns: 0,
});
const i_DifferentialPrivacyConfiguration: D.LazyStruct = () => ({
  columns: D.list({ name: 0 }),
});
const o_AnalysisSource: D.LazyStruct = () => ({ text: D.secret });
