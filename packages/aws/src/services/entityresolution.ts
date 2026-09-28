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
  sdkId: "EntityResolution",
  target: "AWSVeniceService",
  version: "2018-05-10",
  sigv4: "entityresolution",
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
                `https://entityresolution-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://entityresolution-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://entityresolution.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://entityresolution.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ExceedsLimitException
  extends /*@__PURE__*/ TE.TaggedError(
    "ExceedsLimitException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message?: string;
    readonly quotaName?: string;
    readonly quotaValue?: number;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type VeniceGlobalArn = string;
export type StatementId = string;
export type StatementEffect = "Allow" | "Deny" | (string & {});
export type StatementAction = string;
export type StatementActionList = string[];
export type StatementPrincipal = string;
export type StatementPrincipalList = string[];
export type StatementCondition = string;
export interface AddPolicyStatementInput {
  arn: string;
  statementId: string;
  effect: StatementEffect;
  action: string[];
  principal: string[];
  condition?: string;
}
export type PolicyToken = string;
export type PolicyDocument = string;
export interface AddPolicyStatementOutput {
  arn: string;
  token: string;
  policy?: string;
}
export type EntityName = string;
export type HeaderSafeUniqueId = string;
export type UniqueIdList = string[];
export interface BatchDeleteUniqueIdInput {
  workflowName: string;
  inputSource?: string;
  uniqueIds: string[];
}
export type DeleteUniqueIdStatus = "COMPLETED" | "ACCEPTED" | (string & {});
export type DeleteUniqueIdErrorType =
  | "SERVICE_ERROR"
  | "VALIDATION_ERROR"
  | (string & {});
export interface DeleteUniqueIdError {
  uniqueId: string;
  errorType: DeleteUniqueIdErrorType;
}
export type DeleteUniqueIdErrorsList = DeleteUniqueIdError[];
export interface DeletedUniqueId {
  uniqueId: string;
}
export type DeletedUniqueIdList = DeletedUniqueId[];
export type DisconnectedUniqueIdsList = string[];
export interface BatchDeleteUniqueIdOutput {
  status: DeleteUniqueIdStatus;
  errors?: DeleteUniqueIdError[];
  deleted?: DeletedUniqueId[];
  disconnectedUniqueIds?: string[];
}
export type Description = string;
export type InputSourceARN = string;
export type IdNamespaceType = "SOURCE" | "TARGET" | (string & {});
export interface IdMappingWorkflowInputSource {
  inputSourceARN: string;
  schemaName?: string;
  type?: IdNamespaceType;
}
export type IdMappingWorkflowInputSourceConfig = IdMappingWorkflowInputSource[];
export type KMSArn = string;
export type S3Path = string;
export interface IdMappingWorkflowOutputSource {
  KMSArn?: string;
  outputS3Path: string;
}
export type IdMappingWorkflowOutputSourceConfig =
  IdMappingWorkflowOutputSource[];
export type IdMappingType = "PROVIDER" | "RULE_BASED" | (string & {});
export type AttributeName = string;
export type MatchingKeys = string[];
export interface Rule {
  ruleName: string;
  matchingKeys: string[];
}
export type RuleList = Rule[];
export type IdMappingWorkflowRuleDefinitionType =
  | "SOURCE"
  | "TARGET"
  | (string & {});
export type AttributeMatchingModel =
  | "ONE_TO_ONE"
  | "MANY_TO_MANY"
  | (string & {});
export type RecordMatchingModel =
  | "ONE_SOURCE_TO_ONE_TARGET"
  | "MANY_SOURCE_TO_ONE_TARGET"
  | (string & {});
export interface IdMappingRuleBasedProperties {
  rules?: Rule[];
  ruleDefinitionType: IdMappingWorkflowRuleDefinitionType;
  attributeMatchingModel: AttributeMatchingModel;
  recordMatchingModel: RecordMatchingModel;
}
export type ProviderServiceArn = string;
export interface IntermediateSourceConfiguration {
  intermediateS3Path: string;
}
export interface ProviderProperties {
  providerServiceArn: string;
  providerConfiguration?: any;
  intermediateSourceConfiguration?: IntermediateSourceConfiguration;
}
export interface IdMappingTechniques {
  idMappingType: IdMappingType;
  ruleBasedProperties?: IdMappingRuleBasedProperties;
  providerProperties?: ProviderProperties;
}
export type IdMappingIncrementalRunType = "ON_DEMAND" | (string & {});
export interface IdMappingIncrementalRunConfig {
  incrementalRunType?: IdMappingIncrementalRunType;
}
export type IdMappingRoleArn = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateIdMappingWorkflowInput {
  workflowName: string;
  description?: string;
  inputSourceConfig: IdMappingWorkflowInputSource[];
  outputSourceConfig?: IdMappingWorkflowOutputSource[];
  idMappingTechniques: IdMappingTechniques;
  incrementalRunConfig?: IdMappingIncrementalRunConfig;
  roleArn?: string;
  tags?: { [key: string]: string | undefined };
}
export type IdMappingWorkflowArn = string;
export interface CreateIdMappingWorkflowOutput {
  workflowName: string;
  workflowArn: string;
  description?: string;
  inputSourceConfig: IdMappingWorkflowInputSource[];
  outputSourceConfig?: IdMappingWorkflowOutputSource[];
  idMappingTechniques: IdMappingTechniques;
  incrementalRunConfig?: IdMappingIncrementalRunConfig;
  roleArn?: string;
}
export interface IdNamespaceInputSource {
  inputSourceARN: string;
  schemaName?: string;
}
export type IdNamespaceInputSourceConfig = IdNamespaceInputSource[];
export type IdMappingWorkflowRuleDefinitionTypeList =
  IdMappingWorkflowRuleDefinitionType[];
export type RecordMatchingModelList = RecordMatchingModel[];
export interface NamespaceRuleBasedProperties {
  rules?: Rule[];
  ruleDefinitionTypes?: IdMappingWorkflowRuleDefinitionType[];
  attributeMatchingModel?: AttributeMatchingModel;
  recordMatchingModels?: RecordMatchingModel[];
}
export interface NamespaceProviderProperties {
  providerServiceArn: string;
  providerConfiguration?: any;
}
export interface IdNamespaceIdMappingWorkflowProperties {
  idMappingType: IdMappingType;
  ruleBasedProperties?: NamespaceRuleBasedProperties;
  providerProperties?: NamespaceProviderProperties;
}
export type IdNamespaceIdMappingWorkflowPropertiesList =
  IdNamespaceIdMappingWorkflowProperties[];
export type RoleArn = string;
export interface CreateIdNamespaceInput {
  idNamespaceName: string;
  description?: string;
  inputSourceConfig?: IdNamespaceInputSource[];
  idMappingWorkflowProperties?: IdNamespaceIdMappingWorkflowProperties[];
  type: IdNamespaceType;
  roleArn?: string;
  tags?: { [key: string]: string | undefined };
}
export type IdNamespaceArn = string;
export interface CreateIdNamespaceOutput {
  idNamespaceName: string;
  idNamespaceArn: string;
  description?: string;
  inputSourceConfig?: IdNamespaceInputSource[];
  idMappingWorkflowProperties?: IdNamespaceIdMappingWorkflowProperties[];
  type: IdNamespaceType;
  roleArn?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export interface InputSource {
  inputSourceARN: string;
  schemaName: string;
  applyNormalization?: boolean;
}
export type InputSourceConfig = InputSource[];
export type OptionalS3Path = string;
export interface OutputAttribute {
  name: string;
  hashed?: boolean;
}
export type OutputAttributes = OutputAttribute[];
export type CustomerProfilesDomainArn = string;
export type CustomerProfilesObjectTypeArn = string;
export interface CustomerProfilesIntegrationConfig {
  domainArn: string;
  objectTypeArn: string;
}
export interface OutputSource {
  KMSArn?: string;
  outputS3Path?: string;
  output: OutputAttribute[];
  applyNormalization?: boolean;
  customerProfilesIntegrationConfig?: CustomerProfilesIntegrationConfig;
}
export type OutputSourceConfig = OutputSource[];
export type ResolutionType =
  | "RULE_MATCHING"
  | "ML_MATCHING"
  | "PROVIDER"
  | (string & {});
export type MatchPurpose = "IDENTIFIER_GENERATION" | "INDEXING" | (string & {});
export interface RuleBasedProperties {
  rules: Rule[];
  attributeMatchingModel: AttributeMatchingModel;
  matchPurpose?: MatchPurpose;
}
export interface RuleCondition {
  ruleName: string;
  condition: string;
}
export type RuleConditionList = RuleCondition[];
export interface MatchingConfig {
  enableTransitiveMatching?: boolean;
}
export interface RuleConditionProperties {
  rules: RuleCondition[];
  matchingConfig?: MatchingConfig;
}
export interface ResolutionTechniques {
  resolutionType: ResolutionType;
  ruleBasedProperties?: RuleBasedProperties;
  ruleConditionProperties?: RuleConditionProperties;
  enableRealTimeMatching?: boolean;
  providerProperties?: ProviderProperties;
}
export type IncrementalRunType = "IMMEDIATE" | (string & {});
export interface IncrementalRunConfig {
  incrementalRunType?: IncrementalRunType;
}
export interface CreateMatchingWorkflowInput {
  workflowName: string;
  description?: string;
  inputSourceConfig: InputSource[];
  outputSourceConfig: OutputSource[];
  resolutionTechniques: ResolutionTechniques;
  incrementalRunConfig?: IncrementalRunConfig;
  roleArn: string;
  tags?: { [key: string]: string | undefined };
}
export type MatchingWorkflowArn = string;
export interface CreateMatchingWorkflowOutput {
  workflowName: string;
  workflowArn: string;
  description?: string;
  inputSourceConfig: InputSource[];
  outputSourceConfig: OutputSource[];
  resolutionTechniques: ResolutionTechniques;
  incrementalRunConfig?: IncrementalRunConfig;
  roleArn: string;
}
export type SchemaAttributeType =
  | "NAME"
  | "NAME_FIRST"
  | "NAME_MIDDLE"
  | "NAME_LAST"
  | "ADDRESS"
  | "ADDRESS_STREET1"
  | "ADDRESS_STREET2"
  | "ADDRESS_STREET3"
  | "ADDRESS_CITY"
  | "ADDRESS_STATE"
  | "ADDRESS_COUNTRY"
  | "ADDRESS_POSTALCODE"
  | "PHONE"
  | "PHONE_NUMBER"
  | "PHONE_COUNTRYCODE"
  | "EMAIL_ADDRESS"
  | "UNIQUE_ID"
  | "DATE"
  | "STRING"
  | "PROVIDER_ID"
  | "IPV4"
  | "IPV6"
  | "MAID"
  | (string & {});
export interface SchemaInputAttribute {
  fieldName: string;
  type: SchemaAttributeType;
  groupName?: string;
  matchKey?: string;
  subType?: string;
  hashed?: boolean;
}
export type SchemaInputAttributes = SchemaInputAttribute[];
export interface CreateSchemaMappingInput {
  schemaName: string;
  description?: string;
  mappedInputFields: SchemaInputAttribute[];
  tags?: { [key: string]: string | undefined };
}
export type SchemaMappingArn = string;
export interface CreateSchemaMappingOutput {
  schemaName: string;
  schemaArn: string;
  description?: string;
  mappedInputFields: SchemaInputAttribute[];
}
export interface DeleteIdMappingWorkflowInput {
  workflowName: string;
}
export interface DeleteIdMappingWorkflowOutput {
  message: string;
}
export interface DeleteIdNamespaceInput {
  idNamespaceName: string;
}
export interface DeleteIdNamespaceOutput {
  message: string;
}
export interface DeleteMatchingWorkflowInput {
  workflowName: string;
}
export interface DeleteMatchingWorkflowOutput {
  message: string;
}
export interface DeletePolicyStatementInput {
  arn: string;
  statementId: string;
}
export interface DeletePolicyStatementOutput {
  arn: string;
  token: string;
  policy?: string;
}
export interface DeleteSchemaMappingInput {
  schemaName: string;
}
export interface DeleteSchemaMappingOutput {
  message: string;
}
export type UniqueId = string;
export type RecordAttributeMapString255 = { [key: string]: string | undefined };
export interface Record {
  inputSourceARN: string;
  uniqueId: string;
  recordAttributeMap: { [key: string]: string | undefined };
}
export type RecordList = Record[];
export type ProcessingType =
  | "CONSISTENT"
  | "EVENTUAL"
  | "EVENTUAL_NO_LOOKUP"
  | (string & {});
export interface GenerateMatchIdInput {
  workflowName: string;
  records: Record[];
  processingType?: ProcessingType;
}
export interface MatchedRecord {
  inputSourceARN: string;
  recordId: string;
}
export type MatchedRecordsList = MatchedRecord[];
export interface MatchGroup {
  records: MatchedRecord[];
  matchId: string;
  matchRule: string;
}
export type MatchGroupsList = MatchGroup[];
export type ErrorMessage = string;
export interface FailedRecord {
  inputSourceARN: string;
  uniqueId: string;
  errorMessage: string;
}
export type FailedRecordsList = FailedRecord[];
export interface GenerateMatchIdOutput {
  matchGroups: MatchGroup[];
  failedRecords: FailedRecord[];
}
export type EntityNameOrIdMappingWorkflowArn = string;
export type JobId = string;
export interface GetIdMappingJobInput {
  workflowName: string;
  jobId: string;
}
export type JobStatus =
  | "RUNNING"
  | "SUCCEEDED"
  | "FAILED"
  | "QUEUED"
  | (string & {});
export interface IdMappingJobMetrics {
  inputRecords?: number;
  totalRecordsProcessed?: number;
  recordsNotProcessed?: number;
  deleteRecordsProcessed?: number;
  totalMappedRecords?: number;
  totalMappedSourceRecords?: number;
  totalMappedTargetRecords?: number;
  uniqueRecordsLoaded?: number;
  newMappedRecords?: number;
  newMappedSourceRecords?: number;
  newMappedTargetRecords?: number;
  newUniqueRecordsLoaded?: number;
  mappedRecordsRemoved?: number;
  mappedSourceRecordsRemoved?: number;
  mappedTargetRecordsRemoved?: number;
}
export interface ErrorDetails {
  errorMessage?: string;
}
export interface IdMappingJobOutputSource {
  roleArn: string;
  outputS3Path: string;
  KMSArn?: string;
}
export type IdMappingJobOutputSourceConfig = IdMappingJobOutputSource[];
export type JobType = "BATCH" | "INCREMENTAL" | "DELETE_ONLY" | (string & {});
export interface GetIdMappingJobOutput {
  jobId: string;
  status: JobStatus;
  startTime: Date;
  endTime?: Date;
  metrics?: IdMappingJobMetrics;
  errorDetails?: ErrorDetails;
  outputSourceConfig?: IdMappingJobOutputSource[];
  jobType?: JobType;
}
export interface GetIdMappingWorkflowInput {
  workflowName: string;
}
export interface GetIdMappingWorkflowOutput {
  workflowName: string;
  workflowArn: string;
  description?: string;
  inputSourceConfig: IdMappingWorkflowInputSource[];
  outputSourceConfig?: IdMappingWorkflowOutputSource[];
  idMappingTechniques: IdMappingTechniques;
  createdAt: Date;
  updatedAt: Date;
  incrementalRunConfig?: IdMappingIncrementalRunConfig;
  roleArn?: string;
  tags?: { [key: string]: string | undefined };
}
export type EntityNameOrIdNamespaceArn = string;
export interface GetIdNamespaceInput {
  idNamespaceName: string;
}
export interface GetIdNamespaceOutput {
  idNamespaceName: string;
  idNamespaceArn: string;
  description?: string;
  inputSourceConfig?: IdNamespaceInputSource[];
  idMappingWorkflowProperties?: IdNamespaceIdMappingWorkflowProperties[];
  type: IdNamespaceType;
  roleArn?: string;
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
}
export type RecordAttributeMap = { [key: string]: string | undefined };
export interface GetMatchIdInput {
  workflowName: string;
  record: { [key: string]: string | undefined };
  applyNormalization?: boolean;
}
export interface GetMatchIdOutput {
  matchId?: string;
  matchRule?: string;
}
export interface GetMatchingJobInput {
  workflowName: string;
  jobId: string;
}
export interface JobMetrics {
  inputRecords?: number;
  totalRecordsProcessed?: number;
  recordsNotProcessed?: number;
  deleteRecordsProcessed?: number;
  matchIDs?: number;
}
export interface JobOutputSource {
  roleArn: string;
  outputS3Path: string;
  KMSArn?: string;
}
export type JobOutputSourceConfig = JobOutputSource[];
export interface GetMatchingJobOutput {
  jobId: string;
  status: JobStatus;
  startTime: Date;
  endTime?: Date;
  metrics?: JobMetrics;
  errorDetails?: ErrorDetails;
  outputSourceConfig?: JobOutputSource[];
}
export interface GetMatchingWorkflowInput {
  workflowName: string;
}
export interface GetMatchingWorkflowOutput {
  workflowName: string;
  workflowArn: string;
  description?: string;
  inputSourceConfig: InputSource[];
  outputSourceConfig: OutputSource[];
  resolutionTechniques: ResolutionTechniques;
  createdAt: Date;
  updatedAt: Date;
  incrementalRunConfig?: IncrementalRunConfig;
  roleArn: string;
  tags?: { [key: string]: string | undefined };
}
export interface GetPolicyInput {
  arn: string;
}
export interface GetPolicyOutput {
  arn: string;
  token: string;
  policy?: string;
}
export interface GetProviderServiceInput {
  providerName: string;
  providerServiceName: string;
}
export type ProviderServiceDisplayName = string;
export type ServiceType = "ASSIGNMENT" | "ID_MAPPING" | (string & {});
export interface ProviderIdNameSpaceConfiguration {
  description?: string;
  providerTargetConfigurationDefinition?: any;
  providerSourceConfigurationDefinition?: any;
}
export interface ProviderMarketplaceConfiguration {
  dataSetId: string;
  revisionId: string;
  assetId: string;
  listingId: string;
}
export type ProviderEndpointConfiguration = {
  marketplaceConfiguration: ProviderMarketplaceConfiguration;
};
export type AwsAccountId = string;
export type AwsAccountIdList = string[];
export type RequiredBucketActionsList = string[];
export interface ProviderIntermediateDataAccessConfiguration {
  awsAccountIds?: string[];
  requiredBucketActions?: string[];
}
export type SchemaList = string[];
export type Schemas = string[][];
export interface ProviderSchemaAttribute {
  fieldName: string;
  type: SchemaAttributeType;
  subType?: string;
  hashing?: boolean;
}
export type ProviderSchemaAttributes = ProviderSchemaAttribute[];
export interface ProviderComponentSchema {
  schemas?: string[][];
  providerSchemaAttributes?: ProviderSchemaAttribute[];
}
export interface GetProviderServiceOutput {
  providerName: string;
  providerServiceName: string;
  providerServiceDisplayName: string;
  providerServiceType: ServiceType;
  providerServiceArn: string;
  providerConfigurationDefinition?: any;
  providerIdNameSpaceConfiguration?: ProviderIdNameSpaceConfiguration;
  providerJobConfiguration?: any;
  providerEndpointConfiguration: ProviderEndpointConfiguration;
  anonymizedOutput: boolean;
  providerEntityOutputDefinition: any;
  providerIntermediateDataAccessConfiguration?: ProviderIntermediateDataAccessConfiguration;
  providerComponentSchema?: ProviderComponentSchema;
}
export interface GetSchemaMappingInput {
  schemaName: string;
}
export interface GetSchemaMappingOutput {
  schemaName: string;
  schemaArn: string;
  description?: string;
  mappedInputFields: SchemaInputAttribute[];
  createdAt: Date;
  updatedAt: Date;
  tags?: { [key: string]: string | undefined };
  hasWorkflows: boolean;
}
export type NextToken = string;
export interface ListIdMappingJobsInput {
  workflowName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface JobSummary {
  jobId: string;
  status: JobStatus;
  startTime: Date;
  endTime?: Date;
}
export type JobList = JobSummary[];
export interface ListIdMappingJobsOutput {
  jobs?: JobSummary[];
  nextToken?: string;
}
export interface ListIdMappingWorkflowsInput {
  nextToken?: string;
  maxResults?: number;
}
export interface IdMappingWorkflowSummary {
  workflowName: string;
  workflowArn: string;
  createdAt: Date;
  updatedAt: Date;
}
export type IdMappingWorkflowList = IdMappingWorkflowSummary[];
export interface ListIdMappingWorkflowsOutput {
  workflowSummaries?: IdMappingWorkflowSummary[];
  nextToken?: string;
}
export interface ListIdNamespacesInput {
  nextToken?: string;
  maxResults?: number;
}
export interface IdNamespaceIdMappingWorkflowMetadata {
  idMappingType: IdMappingType;
}
export type IdNamespaceIdMappingWorkflowMetadataList =
  IdNamespaceIdMappingWorkflowMetadata[];
export interface IdNamespaceSummary {
  idNamespaceName: string;
  idNamespaceArn: string;
  description?: string;
  idMappingWorkflowProperties?: IdNamespaceIdMappingWorkflowMetadata[];
  type: IdNamespaceType;
  createdAt: Date;
  updatedAt: Date;
}
export type IdNamespaceList = IdNamespaceSummary[];
export interface ListIdNamespacesOutput {
  idNamespaceSummaries?: IdNamespaceSummary[];
  nextToken?: string;
}
export interface ListMatchingJobsInput {
  workflowName: string;
  nextToken?: string;
  maxResults?: number;
}
export interface ListMatchingJobsOutput {
  jobs?: JobSummary[];
  nextToken?: string;
}
export interface ListMatchingWorkflowsInput {
  nextToken?: string;
  maxResults?: number;
}
export interface MatchingWorkflowSummary {
  workflowName: string;
  workflowArn: string;
  createdAt: Date;
  updatedAt: Date;
  resolutionType: ResolutionType;
}
export type MatchingWorkflowList = MatchingWorkflowSummary[];
export interface ListMatchingWorkflowsOutput {
  workflowSummaries?: MatchingWorkflowSummary[];
  nextToken?: string;
}
export interface ListProviderServicesInput {
  nextToken?: string;
  maxResults?: number;
  providerName?: string;
}
export interface ProviderServiceSummary {
  providerServiceArn: string;
  providerName: string;
  providerServiceDisplayName: string;
  providerServiceName: string;
  providerServiceType: ServiceType;
}
export type ProviderServiceList = ProviderServiceSummary[];
export interface ListProviderServicesOutput {
  providerServiceSummaries?: ProviderServiceSummary[];
  nextToken?: string;
}
export interface ListSchemaMappingsInput {
  nextToken?: string;
  maxResults?: number;
}
export interface SchemaMappingSummary {
  schemaName: string;
  schemaArn: string;
  createdAt: Date;
  updatedAt: Date;
  hasWorkflows: boolean;
}
export type SchemaMappingList = SchemaMappingSummary[];
export interface ListSchemaMappingsOutput {
  schemaList?: SchemaMappingSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags: { [key: string]: string | undefined };
}
export interface PutPolicyInput {
  arn: string;
  token?: string;
  policy: string;
}
export interface PutPolicyOutput {
  arn: string;
  token: string;
  policy?: string;
}
export interface StartIdMappingJobInput {
  workflowName: string;
  outputSourceConfig?: IdMappingJobOutputSource[];
  jobType?: JobType;
}
export interface StartIdMappingJobOutput {
  jobId: string;
  outputSourceConfig?: IdMappingJobOutputSource[];
  jobType?: JobType;
}
export interface StartMatchingJobInput {
  workflowName: string;
}
export interface StartMatchingJobOutput {
  jobId: string;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateIdMappingWorkflowInput {
  workflowName: string;
  description?: string;
  inputSourceConfig: IdMappingWorkflowInputSource[];
  outputSourceConfig?: IdMappingWorkflowOutputSource[];
  idMappingTechniques: IdMappingTechniques;
  incrementalRunConfig?: IdMappingIncrementalRunConfig;
  roleArn?: string;
}
export interface UpdateIdMappingWorkflowOutput {
  workflowName: string;
  workflowArn: string;
  description?: string;
  inputSourceConfig: IdMappingWorkflowInputSource[];
  outputSourceConfig?: IdMappingWorkflowOutputSource[];
  idMappingTechniques: IdMappingTechniques;
  incrementalRunConfig?: IdMappingIncrementalRunConfig;
  roleArn?: string;
}
export interface UpdateIdNamespaceInput {
  idNamespaceName: string;
  description?: string;
  inputSourceConfig?: IdNamespaceInputSource[];
  idMappingWorkflowProperties?: IdNamespaceIdMappingWorkflowProperties[];
  roleArn?: string;
}
export interface UpdateIdNamespaceOutput {
  idNamespaceName: string;
  idNamespaceArn: string;
  description?: string;
  inputSourceConfig?: IdNamespaceInputSource[];
  idMappingWorkflowProperties?: IdNamespaceIdMappingWorkflowProperties[];
  type: IdNamespaceType;
  roleArn?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface UpdateMatchingWorkflowInput {
  workflowName: string;
  description?: string;
  inputSourceConfig: InputSource[];
  outputSourceConfig: OutputSource[];
  resolutionTechniques: ResolutionTechniques;
  incrementalRunConfig?: IncrementalRunConfig;
  roleArn: string;
}
export interface UpdateMatchingWorkflowOutput {
  workflowName: string;
  description?: string;
  inputSourceConfig: InputSource[];
  outputSourceConfig: OutputSource[];
  resolutionTechniques: ResolutionTechniques;
  incrementalRunConfig?: IncrementalRunConfig;
  roleArn: string;
}
export interface UpdateSchemaMappingInput {
  schemaName: string;
  description?: string;
  mappedInputFields: SchemaInputAttribute[];
}
export interface UpdateSchemaMappingOutput {
  schemaName: string;
  schemaArn: string;
  description?: string;
  mappedInputFields: SchemaInputAttribute[];
}
export type AddPolicyStatementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds a policy statement object. To retrieve a list of existing policy statements, use the `GetPolicy` API.
 */
export const addPolicyStatement: API.OperationMethod<
  AddPolicyStatementInput,
  AddPolicyStatementOutput,
  AddPolicyStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /policies/{arn}/{statementId}",
    input: {
      arn: 0,
      statementId: 0,
      effect: 0,
      action: 0,
      principal: 0,
      condition: 0,
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
  operationName: "AddPolicyStatement",
})) as any;

export type BatchDeleteUniqueIdError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes multiple unique IDs in a matching workflow.
 */
export const batchDeleteUniqueId: API.OperationMethod<
  BatchDeleteUniqueIdInput,
  BatchDeleteUniqueIdOutput,
  BatchDeleteUniqueIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /matchingworkflows/{workflowName}/uniqueids",
    input: {
      workflowName: 0,
      inputSource: D.m({ header: "inputSource" }),
      uniqueIds: D.m({ header: "uniqueIds" }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteUniqueId",
})) as any;

export type CreateIdMappingWorkflowError =
  | AccessDeniedException
  | ConflictException
  | ExceedsLimitException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an `IdMappingWorkflow` object which stores the configuration of the data processing job to be run. Each `IdMappingWorkflow` must have a unique workflow name. To modify an existing workflow, use the UpdateIdMappingWorkflow API.
 *
 * Incremental processing is not supported for ID mapping workflows.
 */
export const createIdMappingWorkflow: API.OperationMethod<
  CreateIdMappingWorkflowInput,
  CreateIdMappingWorkflowOutput,
  CreateIdMappingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /idmappingworkflows",
    input: {
      workflowName: 0,
      description: 0,
      inputSourceConfig: D.list(i_IdMappingWorkflowInputSource),
      outputSourceConfig: D.list(i_IdMappingWorkflowOutputSource),
      idMappingTechniques: i_IdMappingTechniques,
      incrementalRunConfig: i_IdMappingIncrementalRunConfig,
      roleArn: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ExceedsLimitException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdMappingWorkflow",
})) as any;

export type CreateIdNamespaceError =
  | AccessDeniedException
  | ConflictException
  | ExceedsLimitException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an ID namespace object which will help customers provide metadata explaining their dataset and how to use it. Each ID namespace must have a unique name. To modify an existing ID namespace, use the UpdateIdNamespace API.
 */
export const createIdNamespace: API.OperationMethod<
  CreateIdNamespaceInput,
  CreateIdNamespaceOutput,
  CreateIdNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /idnamespaces",
    input: {
      idNamespaceName: 0,
      description: 0,
      inputSourceConfig: D.list(i_IdNamespaceInputSource),
      idMappingWorkflowProperties: D.list(
        i_IdNamespaceIdMappingWorkflowProperties,
      ),
      type: 0,
      roleArn: 0,
      tags: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ExceedsLimitException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateIdNamespace",
})) as any;

export type CreateMatchingWorkflowError =
  | AccessDeniedException
  | ConflictException
  | ExceedsLimitException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a matching workflow that defines the configuration for a data processing job. The workflow name must be unique. To modify an existing workflow, use `UpdateMatchingWorkflow`.
 *
 * For workflows where `resolutionType` is `PROVIDER`, incremental processing is not supported.
 */
export const createMatchingWorkflow: API.OperationMethod<
  CreateMatchingWorkflowInput,
  CreateMatchingWorkflowOutput,
  CreateMatchingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /matchingworkflows",
    input: {
      workflowName: 0,
      description: 0,
      inputSourceConfig: D.list(i_InputSource),
      outputSourceConfig: D.list(i_OutputSource),
      resolutionTechniques: i_ResolutionTechniques,
      incrementalRunConfig: i_IncrementalRunConfig,
      roleArn: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ExceedsLimitException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMatchingWorkflow",
})) as any;

export type CreateSchemaMappingError =
  | AccessDeniedException
  | ConflictException
  | ExceedsLimitException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a schema mapping, which defines the schema of the input customer records table. The `SchemaMapping` also provides Entity Resolution with some metadata about the table, such as the attribute types of the columns and which columns to match on.
 */
export const createSchemaMapping: API.OperationMethod<
  CreateSchemaMappingInput,
  CreateSchemaMappingOutput,
  CreateSchemaMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /schemas",
    input: {
      schemaName: 0,
      description: 0,
      mappedInputFields: D.list(i_SchemaInputAttribute),
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ExceedsLimitException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchemaMapping",
})) as any;

export type DeleteIdMappingWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the `IdMappingWorkflow` with a given name. This operation returns a `ResourceNotFoundException` if a workflow with the given name does not exist.
 */
export const deleteIdMappingWorkflow: API.OperationMethod<
  DeleteIdMappingWorkflowInput,
  DeleteIdMappingWorkflowOutput,
  DeleteIdMappingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /idmappingworkflows/{workflowName}",
    input: { workflowName: 0 },
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
  operationName: "DeleteIdMappingWorkflow",
})) as any;

export type DeleteIdNamespaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ConflictException
  | CommonErrors;
/**
 * Deletes the `IdNamespace` with a given name. This operation returns a `ResourceNotFoundException` if an ID namespace with the given name does not exist.
 */
export const deleteIdNamespace: API.OperationMethod<
  DeleteIdNamespaceInput,
  DeleteIdNamespaceOutput,
  DeleteIdNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /idnamespaces/{idNamespaceName}",
    input: { idNamespaceName: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ConflictException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteIdNamespace",
})) as any;

export type DeleteMatchingWorkflowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the `MatchingWorkflow` with a given name. This operation returns a `ResourceNotFoundException` if a workflow with the given name does not exist.
 */
export const deleteMatchingWorkflow: API.OperationMethod<
  DeleteMatchingWorkflowInput,
  DeleteMatchingWorkflowOutput,
  DeleteMatchingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /matchingworkflows/{workflowName}",
    input: { workflowName: 0 },
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
  operationName: "DeleteMatchingWorkflow",
})) as any;

export type DeletePolicyStatementError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the policy statement.
 */
export const deletePolicyStatement: API.OperationMethod<
  DeletePolicyStatementInput,
  DeletePolicyStatementOutput,
  DeletePolicyStatementError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /policies/{arn}/{statementId}",
    input: { arn: 0, statementId: 0 },
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
  operationName: "DeletePolicyStatement",
})) as any;

export type DeleteSchemaMappingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the `SchemaMapping` with a given name. This operation returns a `ResourceNotFoundException` if a schema with the given name does not exist. This operation will fail if there is a `MatchingWorkflow` object that references the `SchemaMapping` in the workflow's `InputSourceConfig`.
 */
export const deleteSchemaMapping: API.OperationMethod<
  DeleteSchemaMappingInput,
  DeleteSchemaMappingOutput,
  DeleteSchemaMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /schemas/{schemaName}",
    input: { schemaName: 0 },
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
  operationName: "DeleteSchemaMapping",
})) as any;

export type GenerateMatchIdError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates or retrieves Match IDs for records using a rule-based matching workflow. When you call this operation, it processes your records against the workflow's matching rules to identify potential matches. For existing records, it retrieves their Match IDs and associated rules. For records without matches, it generates new Match IDs. The operation saves results to Amazon S3.
 *
 * The processing type (`processingType`) you choose affects both the accuracy and response time of the operation. Additional charges apply for each API call, whether made through the Entity Resolution console or directly via the API. The rule-based matching workflow must exist and be active before calling this operation.
 */
export const generateMatchId: API.OperationMethod<
  GenerateMatchIdInput,
  GenerateMatchIdOutput,
  GenerateMatchIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /matchingworkflows/{workflowName}/generateMatches",
    input: {
      workflowName: 0,
      records: D.list({
        inputSourceARN: 0,
        uniqueId: 0,
        recordAttributeMap: 0,
      }),
      processingType: 0,
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
  operationName: "GenerateMatchId",
})) as any;

export type GetIdMappingJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the status, metrics, and errors (if there are any) that are associated with a job.
 */
export const getIdMappingJob: API.OperationMethod<
  GetIdMappingJobInput,
  GetIdMappingJobOutput,
  GetIdMappingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /idmappingworkflows/{workflowName}/jobs/{jobId}",
    input: { workflowName: 0, jobId: 0 },
    output: { startTime: D.ts, endTime: D.ts },
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
  operationName: "GetIdMappingJob",
})) as any;

export type GetIdMappingWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the `IdMappingWorkflow` with a given name, if it exists.
 */
export const getIdMappingWorkflow: API.OperationMethod<
  GetIdMappingWorkflowInput,
  GetIdMappingWorkflowOutput,
  GetIdMappingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /idmappingworkflows/{workflowName}",
    input: { workflowName: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetIdMappingWorkflow",
})) as any;

export type GetIdNamespaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the `IdNamespace` with a given name, if it exists.
 */
export const getIdNamespace: API.OperationMethod<
  GetIdNamespaceInput,
  GetIdNamespaceOutput,
  GetIdNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /idnamespaces/{idNamespaceName}",
    input: { idNamespaceName: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetIdNamespace",
})) as any;

export type GetMatchIdError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the corresponding Match ID of a customer record if the record has been processed in a rule-based matching workflow.
 *
 * You can call this API as a dry run of an incremental load on the rule-based matching workflow.
 */
export const getMatchId: API.OperationMethod<
  GetMatchIdInput,
  GetMatchIdOutput,
  GetMatchIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /matchingworkflows/{workflowName}/matches",
    input: { workflowName: 0, record: 0, applyNormalization: 0 },
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
  operationName: "GetMatchId",
})) as any;

export type GetMatchingJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the status, metrics, and errors (if there are any) that are associated with a job.
 */
export const getMatchingJob: API.OperationMethod<
  GetMatchingJobInput,
  GetMatchingJobOutput,
  GetMatchingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /matchingworkflows/{workflowName}/jobs/{jobId}",
    input: { workflowName: 0, jobId: 0 },
    output: { startTime: D.ts, endTime: D.ts },
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
  operationName: "GetMatchingJob",
})) as any;

export type GetMatchingWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the `MatchingWorkflow` with a given name, if it exists.
 */
export const getMatchingWorkflow: API.OperationMethod<
  GetMatchingWorkflowInput,
  GetMatchingWorkflowOutput,
  GetMatchingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /matchingworkflows/{workflowName}",
    input: { workflowName: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetMatchingWorkflow",
})) as any;

export type GetPolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the resource-based policy.
 */
export const getPolicy: API.OperationMethod<
  GetPolicyInput,
  GetPolicyOutput,
  GetPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /policies/{arn}", input: { arn: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPolicy",
})) as any;

export type GetProviderServiceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the `ProviderService` of a given name.
 */
export const getProviderService: API.OperationMethod<
  GetProviderServiceInput,
  GetProviderServiceOutput,
  GetProviderServiceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /providerservices/{providerName}/{providerServiceName}",
    input: { providerName: 0, providerServiceName: 0 },
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
  operationName: "GetProviderService",
})) as any;

export type GetSchemaMappingError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the SchemaMapping of a given name.
 */
export const getSchemaMapping: API.OperationMethod<
  GetSchemaMappingInput,
  GetSchemaMappingOutput,
  GetSchemaMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /schemas/{schemaName}",
    input: { schemaName: 0 },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "GetSchemaMapping",
})) as any;

export type ListIdMappingJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all ID mapping jobs for a given workflow.
 */
export const listIdMappingJobs: API.PaginatedOperationMethod<
  ListIdMappingJobsInput,
  ListIdMappingJobsOutput,
  ListIdMappingJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /idmappingworkflows/{workflowName}/jobs",
    input: {
      workflowName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { jobs: D.list(o_JobSummary) },
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
  operationName: "ListIdMappingJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIdMappingWorkflowsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all the `IdMappingWorkflows` that have been created for an Amazon Web Services account.
 */
export const listIdMappingWorkflows: API.PaginatedOperationMethod<
  ListIdMappingWorkflowsInput,
  ListIdMappingWorkflowsOutput,
  ListIdMappingWorkflowsError,
  Credentials | HttpClient.HttpClient,
  IdMappingWorkflowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /idmappingworkflows",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { workflowSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIdMappingWorkflows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workflowSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIdNamespacesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all ID namespaces.
 */
export const listIdNamespaces: API.PaginatedOperationMethod<
  ListIdNamespacesInput,
  ListIdNamespacesOutput,
  ListIdNamespacesError,
  Credentials | HttpClient.HttpClient,
  IdNamespaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /idnamespaces",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: {
      idNamespaceSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
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
  operationName: "ListIdNamespaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "idNamespaceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMatchingJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all jobs for a given workflow.
 */
export const listMatchingJobs: API.PaginatedOperationMethod<
  ListMatchingJobsInput,
  ListMatchingJobsOutput,
  ListMatchingJobsError,
  Credentials | HttpClient.HttpClient,
  JobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /matchingworkflows/{workflowName}/jobs",
    input: {
      workflowName: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { jobs: D.list(o_JobSummary) },
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
  operationName: "ListMatchingJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMatchingWorkflowsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all the `MatchingWorkflows` that have been created for an Amazon Web Services account.
 */
export const listMatchingWorkflows: API.PaginatedOperationMethod<
  ListMatchingWorkflowsInput,
  ListMatchingWorkflowsOutput,
  ListMatchingWorkflowsError,
  Credentials | HttpClient.HttpClient,
  MatchingWorkflowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /matchingworkflows",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { workflowSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMatchingWorkflows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "workflowSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListProviderServicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all the `ProviderServices` that are available in this Amazon Web Services Region.
 */
export const listProviderServices: API.PaginatedOperationMethod<
  ListProviderServicesInput,
  ListProviderServicesOutput,
  ListProviderServicesError,
  Credentials | HttpClient.HttpClient,
  ProviderServiceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /providerservices",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      providerName: D.m({ query: "providerName" }),
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
  operationName: "ListProviderServices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "providerServiceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSchemaMappingsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all the `SchemaMappings` that have been created for an Amazon Web Services account.
 */
export const listSchemaMappings: API.PaginatedOperationMethod<
  ListSchemaMappingsInput,
  ListSchemaMappingsOutput,
  ListSchemaMappingsError,
  Credentials | HttpClient.HttpClient,
  SchemaMappingSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /schemas",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
    output: { schemaList: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchemaMappings",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "schemaList",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Displays the tags associated with an Entity Resolution resource. In Entity Resolution, `SchemaMapping`, and `MatchingWorkflow` can be tagged.
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
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type PutPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the resource-based policy.
 */
export const putPolicy: API.OperationMethod<
  PutPolicyInput,
  PutPolicyOutput,
  PutPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /policies/{arn}",
    input: { arn: 0, token: 0, policy: 0 },
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
  operationName: "PutPolicy",
})) as any;

export type StartIdMappingJobError =
  | AccessDeniedException
  | ConflictException
  | ExceedsLimitException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the `IdMappingJob` of a workflow. The workflow must have previously been created using the `CreateIdMappingWorkflow` endpoint.
 */
export const startIdMappingJob: API.OperationMethod<
  StartIdMappingJobInput,
  StartIdMappingJobOutput,
  StartIdMappingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /idmappingworkflows/{workflowName}/jobs",
    input: {
      workflowName: 0,
      outputSourceConfig: D.list({ roleArn: 0, outputS3Path: 0, KMSArn: 0 }),
      jobType: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ExceedsLimitException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartIdMappingJob",
})) as any;

export type StartMatchingJobError =
  | AccessDeniedException
  | ConflictException
  | ExceedsLimitException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts the `MatchingJob` of a workflow. The workflow must have previously been created using the `CreateMatchingWorkflow` endpoint.
 */
export const startMatchingJob: API.OperationMethod<
  StartMatchingJobInput,
  StartMatchingJobOutput,
  StartMatchingJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /matchingworkflows/{workflowName}/jobs",
    input: { workflowName: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ExceedsLimitException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMatchingJob",
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified Entity Resolution resource. Tags can help you organize and categorize your resources. You can also use them to scope user permissions by granting a user permission to access or change only resources with certain tag values. In Entity Resolution, `SchemaMapping` and `MatchingWorkflow` can be tagged. Tags don't have any semantic meaning to Amazon Web Services and are interpreted strictly as strings of characters. You can use the `TagResource` action with a resource that already has tags. If you specify a new tag key, this tag is appended to the list of tags associated with the resource. If you specify a tag key that is already associated with the resource, the new tag value that you specify replaces the previous value for that tag.
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
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | CommonErrors;
/**
 * Removes one or more tags from the specified Entity Resolution resource. In Entity Resolution, `SchemaMapping`, and `MatchingWorkflow` can be tagged.
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
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateIdMappingWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing `IdMappingWorkflow`. This method is identical to CreateIdMappingWorkflow, except it uses an HTTP `PUT` request instead of a `POST` request, and the `IdMappingWorkflow` must already exist for the method to succeed.
 *
 * Incremental processing is not supported for ID mapping workflows.
 */
export const updateIdMappingWorkflow: API.OperationMethod<
  UpdateIdMappingWorkflowInput,
  UpdateIdMappingWorkflowOutput,
  UpdateIdMappingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /idmappingworkflows/{workflowName}",
    input: {
      workflowName: 0,
      description: 0,
      inputSourceConfig: D.list(i_IdMappingWorkflowInputSource),
      outputSourceConfig: D.list(i_IdMappingWorkflowOutputSource),
      idMappingTechniques: i_IdMappingTechniques,
      incrementalRunConfig: i_IdMappingIncrementalRunConfig,
      roleArn: 0,
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
  operationName: "UpdateIdMappingWorkflow",
})) as any;

export type UpdateIdNamespaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing ID namespace.
 */
export const updateIdNamespace: API.OperationMethod<
  UpdateIdNamespaceInput,
  UpdateIdNamespaceOutput,
  UpdateIdNamespaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /idnamespaces/{idNamespaceName}",
    input: {
      idNamespaceName: 0,
      description: 0,
      inputSourceConfig: D.list(i_IdNamespaceInputSource),
      idMappingWorkflowProperties: D.list(
        i_IdNamespaceIdMappingWorkflowProperties,
      ),
      roleArn: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "UpdateIdNamespace",
})) as any;

export type UpdateMatchingWorkflowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing matching workflow. The workflow must already exist for this operation to succeed.
 *
 * For workflows where `resolutionType` is `PROVIDER`, incremental processing is not supported.
 */
export const updateMatchingWorkflow: API.OperationMethod<
  UpdateMatchingWorkflowInput,
  UpdateMatchingWorkflowOutput,
  UpdateMatchingWorkflowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /matchingworkflows/{workflowName}",
    input: {
      workflowName: 0,
      description: 0,
      inputSourceConfig: D.list(i_InputSource),
      outputSourceConfig: D.list(i_OutputSource),
      resolutionTechniques: i_ResolutionTechniques,
      incrementalRunConfig: i_IncrementalRunConfig,
      roleArn: 0,
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
  operationName: "UpdateMatchingWorkflow",
})) as any;

export type UpdateSchemaMappingError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a schema mapping.
 *
 * A schema is immutable if it is being used by a workflow. Therefore, you can't update a schema mapping if it's associated with a workflow.
 */
export const updateSchemaMapping: API.OperationMethod<
  UpdateSchemaMappingInput,
  UpdateSchemaMappingOutput,
  UpdateSchemaMappingError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /schemas/{schemaName}",
    input: {
      schemaName: 0,
      description: 0,
      mappedInputFields: D.list(i_SchemaInputAttribute),
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
  operationName: "UpdateSchemaMapping",
})) as any;

const i_IdMappingIncrementalRunConfig: D.LazyStruct = () => ({
  incrementalRunType: 0,
});
const i_IdMappingTechniques: D.LazyStruct = () => ({
  idMappingType: 0,
  ruleBasedProperties: {
    rules: D.list(i_Rule),
    ruleDefinitionType: 0,
    attributeMatchingModel: 0,
    recordMatchingModel: 0,
  },
  providerProperties: i_ProviderProperties,
});
const i_IdMappingWorkflowInputSource: D.LazyStruct = () => ({
  inputSourceARN: 0,
  schemaName: 0,
  type: 0,
});
const i_IdMappingWorkflowOutputSource: D.LazyStruct = () => ({
  KMSArn: 0,
  outputS3Path: 0,
});
const i_IdNamespaceIdMappingWorkflowProperties: D.LazyStruct = () => ({
  idMappingType: 0,
  ruleBasedProperties: {
    rules: D.list(i_Rule),
    ruleDefinitionTypes: 0,
    attributeMatchingModel: 0,
    recordMatchingModels: 0,
  },
  providerProperties: { providerServiceArn: 0, providerConfiguration: 0 },
});
const i_IdNamespaceInputSource: D.LazyStruct = () => ({
  inputSourceARN: 0,
  schemaName: 0,
});
const i_IncrementalRunConfig: D.LazyStruct = () => ({ incrementalRunType: 0 });
const i_InputSource: D.LazyStruct = () => ({
  inputSourceARN: 0,
  schemaName: 0,
  applyNormalization: 0,
});
const i_OutputSource: D.LazyStruct = () => ({
  KMSArn: 0,
  outputS3Path: 0,
  output: D.list({ name: 0, hashed: 0 }),
  applyNormalization: 0,
  customerProfilesIntegrationConfig: { domainArn: 0, objectTypeArn: 0 },
});
const i_ResolutionTechniques: D.LazyStruct = () => ({
  resolutionType: 0,
  ruleBasedProperties: {
    rules: D.list(i_Rule),
    attributeMatchingModel: 0,
    matchPurpose: 0,
  },
  ruleConditionProperties: {
    rules: D.list({ ruleName: 0, condition: 0 }),
    matchingConfig: { enableTransitiveMatching: 0 },
  },
  enableRealTimeMatching: 0,
  providerProperties: i_ProviderProperties,
});
const i_SchemaInputAttribute: D.LazyStruct = () => ({
  fieldName: 0,
  type: 0,
  groupName: 0,
  matchKey: 0,
  subType: 0,
  hashed: 0,
});
const o_JobSummary: D.LazyStruct = () => ({ startTime: D.ts, endTime: D.ts });
const i_ProviderProperties: D.LazyStruct = () => ({
  providerServiceArn: 0,
  providerConfiguration: 0,
  intermediateSourceConfiguration: { intermediateS3Path: 0 },
});
const i_Rule: D.LazyStruct = () => ({ ruleName: 0, matchingKeys: 0 });
