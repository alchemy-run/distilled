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
  sdkId: "EntityResolution",
  serviceShapeName: "AWSVeniceService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "entityresolution" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-05-10");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://entityresolution.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://entityresolution.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://entityresolution.{R}.{D}","properties":{},"headers":{}}');

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
export class ExceedsLimitException
  extends /*@__PURE__*/ S.TaggedError<ExceedsLimitException>()(
    "ExceedsLimitException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      quotaName: /*@__PURE__*/ S.optional(S.String),
      quotaValue: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type DeleteUniqueIdErrorType = "SERVICE_ERROR" | "VALIDATION_ERROR" | (string & {});
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
export type IdMappingWorkflowOutputSourceConfig = IdMappingWorkflowOutputSource[];
export type IdMappingType = "PROVIDER" | "RULE_BASED" | (string & {});
export type AttributeName = string;
export type MatchingKeys = string[];
export interface Rule {
  ruleName: string;
  matchingKeys: string[];
}
export type RuleList = Rule[];
export type IdMappingWorkflowRuleDefinitionType = "SOURCE" | "TARGET" | (string & {});
export type AttributeMatchingModel = "ONE_TO_ONE" | "MANY_TO_MANY" | (string & {});
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
export type IdMappingWorkflowRuleDefinitionTypeList = IdMappingWorkflowRuleDefinitionType[];
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
export type IdNamespaceIdMappingWorkflowPropertiesList = IdNamespaceIdMappingWorkflowProperties[];
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
export type ResolutionType = "RULE_MATCHING" | "ML_MATCHING" | "PROVIDER" | (string & {});
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
export type ProcessingType = "CONSISTENT" | "EVENTUAL" | "EVENTUAL_NO_LOOKUP" | (string & {});
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
export type JobStatus = "RUNNING" | "SUCCEEDED" | "FAILED" | "QUEUED" | (string & {});
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
export type IdNamespaceIdMappingWorkflowMetadataList = IdNamespaceIdMappingWorkflowMetadata[];
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
  input: __S(720, __c45, 0) as any as S.Schema<AddPolicyStatementInput>,
  output: __S(736, __c46, 0) as any as S.Schema<AddPolicyStatementOutput>,
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
}));

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
  input: __S(768, __c48, 0) as any as S.Schema<BatchDeleteUniqueIdInput>,
  output: __S(773, __c48, 5) as any as S.Schema<BatchDeleteUniqueIdOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteUniqueId",
}));

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
  input: __S(784, __c49, 0) as any as S.Schema<CreateIdMappingWorkflowInput>,
  output: __S(864, __c54, 0) as any as S.Schema<CreateIdMappingWorkflowOutput>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateIdNamespaceInput>,
  output: __S(16, __c1, 0) as any as S.Schema<CreateIdNamespaceOutput>,
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
}));

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
  input: __S(48, __c3, 0) as any as S.Schema<CreateMatchingWorkflowInput>,
  output: __S(49, __c3, 1) as any as S.Schema<CreateMatchingWorkflowOutput>,
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
}));

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
  input: __S(80, __c5, 0) as any as S.Schema<CreateSchemaMappingInput>,
  output: __S(112, __c7, 0) as any as S.Schema<CreateSchemaMappingOutput>,
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
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<DeleteIdMappingWorkflowInput>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteIdMappingWorkflowOutput>,
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
}));

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
  input: __S(160, __c10, 0) as any as S.Schema<DeleteIdNamespaceInput>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteIdNamespaceOutput>,
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
}));

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
  input: __S(176, __c11, 0) as any as S.Schema<DeleteMatchingWorkflowInput>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteMatchingWorkflowOutput>,
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
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<DeletePolicyStatementInput>,
  output: __S(736, __c46, 0) as any as S.Schema<DeletePolicyStatementOutput>,
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
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<DeleteSchemaMappingInput>,
  output: __S(144, __c9, 0) as any as S.Schema<DeleteSchemaMappingOutput>,
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
}));

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
  input: __S(226, __c14, 2) as any as S.Schema<GenerateMatchIdInput>,
  output: __S(233, __c14, 9) as any as S.Schema<GenerateMatchIdOutput>,
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
}));

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
  input: __S(240, __c15, 0) as any as S.Schema<GetIdMappingJobInput>,
  output: __S(242, __c15, 2) as any as S.Schema<GetIdMappingJobOutput>,
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
}));

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
  input: __S(288, __c18, 0) as any as S.Schema<GetIdMappingWorkflowInput>,
  output: __S(289, __c18, 1) as any as S.Schema<GetIdMappingWorkflowOutput>,
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
}));

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
  input: __S(304, __c19, 0) as any as S.Schema<GetIdNamespaceInput>,
  output: __S(16, __c1, 0) as any as S.Schema<GetIdNamespaceOutput>,
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
}));

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
  input: __S(320, __c20, 0) as any as S.Schema<GetMatchIdInput>,
  output: __S(321, __c20, 1) as any as S.Schema<GetMatchIdOutput>,
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
}));

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
  input: __S(336, __c21, 0) as any as S.Schema<GetMatchingJobInput>,
  output: __S(338, __c21, 2) as any as S.Schema<GetMatchingJobOutput>,
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
}));

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
  input: __S(352, __c22, 0) as any as S.Schema<GetMatchingWorkflowInput>,
  output: __S(353, __c22, 1) as any as S.Schema<GetMatchingWorkflowOutput>,
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
}));

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
  input: __S(368, __c23, 0) as any as S.Schema<GetPolicyInput>,
  output: __S(736, __c46, 0) as any as S.Schema<GetPolicyOutput>,
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
}));

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
  input: __S(384, __c24, 0) as any as S.Schema<GetProviderServiceInput>,
  output: __S(393, __c24, 9) as any as S.Schema<GetProviderServiceOutput>,
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
}));

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
  input: __S(400, __c25, 0) as any as S.Schema<GetSchemaMappingInput>,
  output: __S(401, __c25, 1) as any as S.Schema<GetSchemaMappingOutput>,
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
}));

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
  input: __S(416, __c26, 0) as any as S.Schema<ListIdMappingJobsInput>,
  output: __S(434, __c27, 2) as any as S.Schema<ListIdMappingJobsOutput>,
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
  input: __S(448, __c28, 0) as any as S.Schema<ListIdMappingWorkflowsInput>,
  output: __S(451, __c28, 3) as any as S.Schema<ListIdMappingWorkflowsOutput>,
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
  input: __S(464, __c29, 0) as any as S.Schema<ListIdNamespacesInput>,
  output: __S(469, __c29, 5) as any as S.Schema<ListIdNamespacesOutput>,
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
  input: __S(480, __c30, 0) as any as S.Schema<ListMatchingJobsInput>,
  output: __S(434, __c27, 2) as any as S.Schema<ListMatchingJobsOutput>,
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
  input: __S(496, __c31, 0) as any as S.Schema<ListMatchingWorkflowsInput>,
  output: __S(499, __c31, 3) as any as S.Schema<ListMatchingWorkflowsOutput>,
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
  input: __S(512, __c32, 0) as any as S.Schema<ListProviderServicesInput>,
  output: __S(515, __c32, 3) as any as S.Schema<ListProviderServicesOutput>,
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
  input: __S(528, __c33, 0) as any as S.Schema<ListSchemaMappingsInput>,
  output: __S(531, __c33, 3) as any as S.Schema<ListSchemaMappingsOutput>,
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
  input: __S(544, __c34, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(545, __c34, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(560, __c35, 0) as any as S.Schema<PutPolicyInput>,
  output: __S(736, __c46, 0) as any as S.Schema<PutPolicyOutput>,
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
}));

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
  input: __S(576, __c36, 0) as any as S.Schema<StartIdMappingJobInput>,
  output: __S(577, __c36, 1) as any as S.Schema<StartIdMappingJobOutput>,
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
}));

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
  input: __S(592, __c37, 0) as any as S.Schema<StartMatchingJobInput>,
  output: __S(593, __c37, 1) as any as S.Schema<StartMatchingJobOutput>,
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
}));

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
  input: __S(608, __c38, 0) as any as S.Schema<TagResourceInput>,
  output: __S(624, __c39, 0) as any as S.Schema<TagResourceOutput>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = InternalServerException | ResourceNotFoundException | CommonErrors;
/**
 * Removes one or more tags from the specified Entity Resolution resource. In Entity Resolution, `SchemaMapping`, and `MatchingWorkflow` can be tagged.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(624, __c39, 0) as any as S.Schema<UntagResourceOutput>,
  errors: [InternalServerException, ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

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
  input: __S(656, __c41, 0) as any as S.Schema<UpdateIdMappingWorkflowInput>,
  output: __S(864, __c54, 0) as any as S.Schema<UpdateIdMappingWorkflowOutput>,
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
}));

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
  input: __S(672, __c42, 0) as any as S.Schema<UpdateIdNamespaceInput>,
  output: __S(673, __c42, 1) as any as S.Schema<UpdateIdNamespaceOutput>,
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
}));

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
  input: __S(688, __c43, 0) as any as S.Schema<UpdateMatchingWorkflowInput>,
  output: __S(689, __c43, 1) as any as S.Schema<UpdateMatchingWorkflowOutput>,
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
}));

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
  input: __S(704, __c44, 0) as any as S.Schema<UpdateSchemaMappingInput>,
  output: __S(112, __c7, 0) as any as S.Schema<UpdateSchemaMappingOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          idNamespaceName: S.String,
          description: S.optional(S.String),
          inputSourceConfig: S.optional(__S(33, __c2, 1)),
          idMappingWorkflowProperties: S.optional(__S(38, __c2, 6)),
          type: S.String,
          roleArn: S.optional(S.String),
          tags: S.optional(__S(800, __c50, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/idnamespaces" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateIdNamespaceInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          idNamespaceName: S.String,
          idNamespaceArn: S.String,
          description: S.optional(S.String),
          inputSourceConfig: S.optional(__S(33, __c2, 1)),
          idMappingWorkflowProperties: S.optional(__S(38, __c2, 6)),
          type: S.String,
          roleArn: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(800, __c50, 0)),
        }),
      ).annotate({ identifier: "CreateIdNamespaceOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ inputSourceARN: S.String, schemaName: S.optional(S.String) }),
      ).annotate({ identifier: "IdNamespaceInputSource" });
    case 1:
      return S.Array(__S(32, __c2, 0));
    case 2:
      return S.Array(S.String);
    case 3:
      return S.suspend(() =>
        S.Struct({
          rules: S.optional(__S(817, __c51, 1)),
          ruleDefinitionTypes: S.optional(__S(34, __c2, 2)),
          attributeMatchingModel: S.optional(S.String),
          recordMatchingModels: S.optional(__S(34, __c2, 2)),
        }),
      ).annotate({ identifier: "NamespaceRuleBasedProperties" });
    case 4:
      return S.suspend(() =>
        S.Struct({ providerServiceArn: S.String, providerConfiguration: S.optional(S.Any) }),
      ).annotate({ identifier: "NamespaceProviderProperties" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          idMappingType: S.String,
          ruleBasedProperties: S.optional(__S(35, __c2, 3)),
          providerProperties: S.optional(__S(36, __c2, 4)),
        }),
      ).annotate({ identifier: "IdNamespaceIdMappingWorkflowProperties" });
    case 6:
      return S.Array(__S(37, __c2, 5));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String,
          description: S.optional(S.String),
          inputSourceConfig: __S(65, __c4, 1),
          outputSourceConfig: __S(70, __c4, 6),
          resolutionTechniques: __S(76, __c4, 12),
          incrementalRunConfig: S.optional(__S(834, __c52, 2)),
          roleArn: S.String,
          tags: S.optional(__S(800, __c50, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/matchingworkflows" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateMatchingWorkflowInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String,
          workflowArn: S.String,
          description: S.optional(S.String),
          inputSourceConfig: __S(65, __c4, 1),
          outputSourceConfig: __S(70, __c4, 6),
          resolutionTechniques: __S(76, __c4, 12),
          incrementalRunConfig: S.optional(__S(834, __c52, 2)),
          roleArn: S.String,
        }),
      ).annotate({ identifier: "CreateMatchingWorkflowOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          inputSourceARN: S.String,
          schemaName: S.String,
          applyNormalization: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "InputSource" });
    case 1:
      return S.Array(__S(64, __c4, 0));
    case 2:
      return S.suspend(() => S.Struct({ name: S.String, hashed: S.optional(S.Boolean) })).annotate({
        identifier: "OutputAttribute",
      });
    case 3:
      return S.Array(__S(66, __c4, 2));
    case 4:
      return S.suspend(() => S.Struct({ domainArn: S.String, objectTypeArn: S.String })).annotate({
        identifier: "CustomerProfilesIntegrationConfig",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          KMSArn: S.optional(S.String),
          outputS3Path: S.optional(S.String),
          output: __S(67, __c4, 3),
          applyNormalization: S.optional(S.Boolean),
          customerProfilesIntegrationConfig: S.optional(__S(68, __c4, 4)),
        }),
      ).annotate({ identifier: "OutputSource" });
    case 6:
      return S.Array(__S(69, __c4, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          rules: __S(817, __c51, 1),
          attributeMatchingModel: S.String,
          matchPurpose: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuleBasedProperties" });
    case 8:
      return S.suspend(() => S.Struct({ ruleName: S.String, condition: S.String })).annotate({
        identifier: "RuleCondition",
      });
    case 9:
      return S.Array(__S(72, __c4, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({ enableTransitiveMatching: S.optional(S.Boolean) }),
      ).annotate({ identifier: "MatchingConfig" });
    case 11:
      return S.suspend(() =>
        S.Struct({ rules: __S(73, __c4, 9), matchingConfig: S.optional(__S(74, __c4, 10)) }),
      ).annotate({ identifier: "RuleConditionProperties" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          resolutionType: S.String,
          ruleBasedProperties: S.optional(__S(71, __c4, 7)),
          ruleConditionProperties: S.optional(__S(75, __c4, 11)),
          enableRealTimeMatching: S.optional(S.Boolean),
          providerProperties: S.optional(__S(833, __c52, 1)),
        }),
      ).annotate({ identifier: "ResolutionTechniques" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          schemaName: S.String,
          description: S.optional(S.String),
          mappedInputFields: __S(97, __c6, 1),
          tags: S.optional(__S(800, __c50, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/schemas" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSchemaMappingInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          fieldName: S.String,
          type: S.String,
          groupName: S.optional(S.String),
          matchKey: S.optional(S.String),
          subType: S.optional(S.String),
          hashed: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "SchemaInputAttribute" });
    case 1:
      return S.Array(__S(96, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          schemaName: S.String,
          schemaArn: S.String,
          description: S.optional(S.String),
          mappedInputFields: __S(97, __c6, 1),
        }),
      ).annotate({ identifier: "CreateSchemaMappingOutput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workflowName: S.String.pipe(T.HttpLabel("workflowName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/idmappingworkflows/{workflowName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteIdMappingWorkflowInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ message: S.String })).annotate({
        identifier: "DeleteIdMappingWorkflowOutput",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ idNamespaceName: S.String.pipe(T.HttpLabel("idNamespaceName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/idnamespaces/{idNamespaceName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteIdNamespaceInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workflowName: S.String.pipe(T.HttpLabel("workflowName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/matchingworkflows/{workflowName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMatchingWorkflowInput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          statementId: S.String.pipe(T.HttpLabel("statementId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/policies/{arn}/{statementId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePolicyStatementInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ schemaName: S.String.pipe(T.HttpLabel("schemaName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/schemas/{schemaName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteSchemaMappingInput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          inputSourceARN: S.String,
          uniqueId: S.String,
          recordAttributeMap: __S(800, __c50, 0),
        }),
      ).annotate({ identifier: "Record" });
    case 1:
      return S.Array(__S(224, __c14, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String.pipe(T.HttpLabel("workflowName")),
          records: __S(225, __c14, 1),
          processingType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/matchingworkflows/{workflowName}/generateMatches" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GenerateMatchIdInput" });
    case 3:
      return S.suspend(() => S.Struct({ inputSourceARN: S.String, recordId: S.String })).annotate({
        identifier: "MatchedRecord",
      });
    case 4:
      return S.Array(__S(227, __c14, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ records: __S(228, __c14, 4), matchId: S.String, matchRule: S.String }),
      ).annotate({ identifier: "MatchGroup" });
    case 6:
      return S.Array(__S(229, __c14, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ inputSourceARN: S.String, uniqueId: S.String, errorMessage: S.String }),
      ).annotate({ identifier: "FailedRecord" });
    case 8:
      return S.Array(__S(231, __c14, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ matchGroups: __S(230, __c14, 6), failedRecords: __S(232, __c14, 8) }),
      ).annotate({ identifier: "GenerateMatchIdOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String.pipe(T.HttpLabel("workflowName")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/idmappingworkflows/{workflowName}/jobs/{jobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIdMappingJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          inputRecords: S.optional(S.Number),
          totalRecordsProcessed: S.optional(S.Number),
          recordsNotProcessed: S.optional(S.Number),
          deleteRecordsProcessed: S.optional(S.Number),
          totalMappedRecords: S.optional(S.Number),
          totalMappedSourceRecords: S.optional(S.Number),
          totalMappedTargetRecords: S.optional(S.Number),
          uniqueRecordsLoaded: S.optional(S.Number),
          newMappedRecords: S.optional(S.Number),
          newMappedSourceRecords: S.optional(S.Number),
          newMappedTargetRecords: S.optional(S.Number),
          newUniqueRecordsLoaded: S.optional(S.Number),
          mappedRecordsRemoved: S.optional(S.Number),
          mappedSourceRecordsRemoved: S.optional(S.Number),
          mappedTargetRecordsRemoved: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IdMappingJobMetrics" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          status: S.String,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          metrics: S.optional(__S(241, __c15, 1)),
          errorDetails: S.optional(__S(256, __c16, 0)),
          outputSourceConfig: S.optional(__S(273, __c17, 1)),
          jobType: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetIdMappingJobOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ errorMessage: S.optional(S.String) })).annotate({
        identifier: "ErrorDetails",
      });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ roleArn: S.String, outputS3Path: S.String, KMSArn: S.optional(S.String) }),
      ).annotate({ identifier: "IdMappingJobOutputSource" });
    case 1:
      return S.Array(__S(272, __c17, 0));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workflowName: S.String.pipe(T.HttpLabel("workflowName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/idmappingworkflows/{workflowName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIdMappingWorkflowInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String,
          workflowArn: S.String,
          description: S.optional(S.String),
          inputSourceConfig: __S(849, __c53, 1),
          outputSourceConfig: S.optional(__S(851, __c53, 3)),
          idMappingTechniques: __S(853, __c53, 5),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          incrementalRunConfig: S.optional(__S(834, __c52, 2)),
          roleArn: S.optional(S.String),
          tags: S.optional(__S(800, __c50, 0)),
        }),
      ).annotate({ identifier: "GetIdMappingWorkflowOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ idNamespaceName: S.String.pipe(T.HttpLabel("idNamespaceName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/idnamespaces/{idNamespaceName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIdNamespaceInput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String.pipe(T.HttpLabel("workflowName")),
          record: __S(800, __c50, 0),
          applyNormalization: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/matchingworkflows/{workflowName}/matches" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMatchIdInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ matchId: S.optional(S.String), matchRule: S.optional(S.String) }),
      ).annotate({ identifier: "GetMatchIdOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String.pipe(T.HttpLabel("workflowName")),
          jobId: S.String.pipe(T.HttpLabel("jobId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/matchingworkflows/{workflowName}/jobs/{jobId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMatchingJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          inputRecords: S.optional(S.Number),
          totalRecordsProcessed: S.optional(S.Number),
          recordsNotProcessed: S.optional(S.Number),
          deleteRecordsProcessed: S.optional(S.Number),
          matchIDs: S.optional(S.Number),
        }),
      ).annotate({ identifier: "JobMetrics" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          status: S.String,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          metrics: S.optional(__S(337, __c21, 1)),
          errorDetails: S.optional(__S(256, __c16, 0)),
          outputSourceConfig: S.optional(__S(273, __c17, 1)),
        }),
      ).annotate({ identifier: "GetMatchingJobOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workflowName: S.String.pipe(T.HttpLabel("workflowName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/matchingworkflows/{workflowName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMatchingWorkflowInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String,
          workflowArn: S.String,
          description: S.optional(S.String),
          inputSourceConfig: __S(65, __c4, 1),
          outputSourceConfig: __S(70, __c4, 6),
          resolutionTechniques: __S(76, __c4, 12),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          incrementalRunConfig: S.optional(__S(834, __c52, 2)),
          roleArn: S.String,
          tags: S.optional(__S(800, __c50, 0)),
        }),
      ).annotate({ identifier: "GetMatchingWorkflowOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String.pipe(T.HttpLabel("arn")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/policies/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetPolicyInput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          providerName: S.String.pipe(T.HttpLabel("providerName")),
          providerServiceName: S.String.pipe(T.HttpLabel("providerServiceName")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/providerservices/{providerName}/{providerServiceName}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProviderServiceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          providerTargetConfigurationDefinition: S.optional(S.Any),
          providerSourceConfigurationDefinition: S.optional(S.Any),
        }),
      ).annotate({ identifier: "ProviderIdNameSpaceConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          dataSetId: S.String,
          revisionId: S.String,
          assetId: S.String,
          listingId: S.String,
        }),
      ).annotate({ identifier: "ProviderMarketplaceConfiguration" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ marketplaceConfiguration: __S(386, __c24, 2) })]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          awsAccountIds: S.optional(__S(752, __c47, 0)),
          requiredBucketActions: S.optional(__S(752, __c47, 0)),
        }),
      ).annotate({ identifier: "ProviderIntermediateDataAccessConfiguration" });
    case 5:
      return S.Array(__S(752, __c47, 0));
    case 6:
      return S.suspend(() =>
        S.Struct({
          fieldName: S.String,
          type: S.String,
          subType: S.optional(S.String),
          hashing: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ProviderSchemaAttribute" });
    case 7:
      return S.Array(__S(390, __c24, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({
          schemas: S.optional(__S(389, __c24, 5)),
          providerSchemaAttributes: S.optional(__S(391, __c24, 7)),
        }),
      ).annotate({ identifier: "ProviderComponentSchema" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          providerName: S.String,
          providerServiceName: S.String,
          providerServiceDisplayName: S.String,
          providerServiceType: S.String,
          providerServiceArn: S.String,
          providerConfigurationDefinition: S.optional(S.Any),
          providerIdNameSpaceConfiguration: S.optional(__S(385, __c24, 1)),
          providerJobConfiguration: S.optional(S.Any),
          providerEndpointConfiguration: __S(387, __c24, 3),
          anonymizedOutput: S.Boolean,
          providerEntityOutputDefinition: S.Any,
          providerIntermediateDataAccessConfiguration: S.optional(__S(388, __c24, 4)),
          providerComponentSchema: S.optional(__S(392, __c24, 8)),
        }),
      ).annotate({ identifier: "GetProviderServiceOutput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ schemaName: S.String.pipe(T.HttpLabel("schemaName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/schemas/{schemaName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSchemaMappingInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          schemaName: S.String,
          schemaArn: S.String,
          description: S.optional(S.String),
          mappedInputFields: __S(97, __c6, 1),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          tags: S.optional(__S(800, __c50, 0)),
          hasWorkflows: S.Boolean,
        }),
      ).annotate({ identifier: "GetSchemaMappingOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String.pipe(T.HttpLabel("workflowName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/idmappingworkflows/{workflowName}/jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIdMappingJobsInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          status: S.String,
          startTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          endTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "JobSummary" });
    case 1:
      return S.Array(__S(432, __c27, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ jobs: S.optional(__S(433, __c27, 1)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListIdMappingJobsOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/idmappingworkflows" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIdMappingWorkflowsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String,
          workflowArn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "IdMappingWorkflowSummary" });
    case 2:
      return S.Array(__S(449, __c28, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          workflowSummaries: S.optional(__S(450, __c28, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListIdMappingWorkflowsOutput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/idnamespaces" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListIdNamespacesInput" });
    case 1:
      return S.suspend(() => S.Struct({ idMappingType: S.String })).annotate({
        identifier: "IdNamespaceIdMappingWorkflowMetadata",
      });
    case 2:
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          idNamespaceName: S.String,
          idNamespaceArn: S.String,
          description: S.optional(S.String),
          idMappingWorkflowProperties: S.optional(__S(466, __c29, 2)),
          type: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "IdNamespaceSummary" });
    case 4:
      return S.Array(__S(467, __c29, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          idNamespaceSummaries: S.optional(__S(468, __c29, 4)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListIdNamespacesOutput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String.pipe(T.HttpLabel("workflowName")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/matchingworkflows/{workflowName}/jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMatchingJobsInput" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/matchingworkflows" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListMatchingWorkflowsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String,
          workflowArn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          resolutionType: S.String,
        }),
      ).annotate({ identifier: "MatchingWorkflowSummary" });
    case 2:
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          workflowSummaries: S.optional(__S(498, __c31, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListMatchingWorkflowsOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          providerName: S.optional(S.String).pipe(T.HttpQuery("providerName")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/providerservices" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListProviderServicesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          providerServiceArn: S.String,
          providerName: S.String,
          providerServiceDisplayName: S.String,
          providerServiceName: S.String,
          providerServiceType: S.String,
        }),
      ).annotate({ identifier: "ProviderServiceSummary" });
    case 2:
      return S.Array(__S(513, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          providerServiceSummaries: S.optional(__S(514, __c32, 2)),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListProviderServicesOutput" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/schemas" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSchemaMappingsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          schemaName: S.String,
          schemaArn: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          hasWorkflows: S.Boolean,
        }),
      ).annotate({ identifier: "SchemaMappingSummary" });
    case 2:
      return S.Array(__S(529, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ schemaList: S.optional(__S(530, __c33, 2)), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSchemaMappingsOutput" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: __S(800, __c50, 0) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          token: S.optional(S.String),
          policy: S.String,
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/policies/{arn}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "PutPolicyInput" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String.pipe(T.HttpLabel("workflowName")),
          outputSourceConfig: S.optional(__S(273, __c17, 1)),
          jobType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/idmappingworkflows/{workflowName}/jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartIdMappingJobInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          jobId: S.String,
          outputSourceConfig: S.optional(__S(273, __c17, 1)),
          jobType: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartIdMappingJobOutput" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workflowName: S.String.pipe(T.HttpLabel("workflowName")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/matchingworkflows/{workflowName}/jobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMatchingJobInput" });
    case 1:
      return S.suspend(() => S.Struct({ jobId: S.String })).annotate({
        identifier: "StartMatchingJobOutput",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(800, __c50, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceOutput" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(752, __c47, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String.pipe(T.HttpLabel("workflowName")),
          description: S.optional(S.String),
          inputSourceConfig: __S(849, __c53, 1),
          outputSourceConfig: S.optional(__S(851, __c53, 3)),
          idMappingTechniques: __S(853, __c53, 5),
          incrementalRunConfig: S.optional(__S(834, __c52, 2)),
          roleArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/idmappingworkflows/{workflowName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateIdMappingWorkflowInput" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          idNamespaceName: S.String.pipe(T.HttpLabel("idNamespaceName")),
          description: S.optional(S.String),
          inputSourceConfig: S.optional(__S(33, __c2, 1)),
          idMappingWorkflowProperties: S.optional(__S(38, __c2, 6)),
          roleArn: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/idnamespaces/{idNamespaceName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateIdNamespaceInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          idNamespaceName: S.String,
          idNamespaceArn: S.String,
          description: S.optional(S.String),
          inputSourceConfig: S.optional(__S(33, __c2, 1)),
          idMappingWorkflowProperties: S.optional(__S(38, __c2, 6)),
          type: S.String,
          roleArn: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "UpdateIdNamespaceOutput" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String.pipe(T.HttpLabel("workflowName")),
          description: S.optional(S.String),
          inputSourceConfig: __S(65, __c4, 1),
          outputSourceConfig: __S(70, __c4, 6),
          resolutionTechniques: __S(76, __c4, 12),
          incrementalRunConfig: S.optional(__S(834, __c52, 2)),
          roleArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/matchingworkflows/{workflowName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMatchingWorkflowInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String,
          description: S.optional(S.String),
          inputSourceConfig: __S(65, __c4, 1),
          outputSourceConfig: __S(70, __c4, 6),
          resolutionTechniques: __S(76, __c4, 12),
          incrementalRunConfig: S.optional(__S(834, __c52, 2)),
          roleArn: S.String,
        }),
      ).annotate({ identifier: "UpdateMatchingWorkflowOutput" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          schemaName: S.String.pipe(T.HttpLabel("schemaName")),
          description: S.optional(S.String),
          mappedInputFields: __S(97, __c6, 1),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/schemas/{schemaName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateSchemaMappingInput" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          arn: S.String.pipe(T.HttpLabel("arn")),
          statementId: S.String.pipe(T.HttpLabel("statementId")),
          effect: S.String,
          action: __S(752, __c47, 0),
          principal: __S(752, __c47, 0),
          condition: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/policies/{arn}/{statementId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AddPolicyStatementInput" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ arn: S.String, token: S.String, policy: S.optional(S.String) }),
      ).annotate({ identifier: "AddPolicyStatementOutput" });
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
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String.pipe(T.HttpLabel("workflowName")),
          inputSource: S.optional(S.String).pipe(T.HttpHeader("inputSource")),
          uniqueIds: __S(752, __c47, 0).pipe(T.HttpHeader("uniqueIds")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/matchingworkflows/{workflowName}/uniqueids" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteUniqueIdInput" });
    case 1:
      return S.suspend(() => S.Struct({ uniqueId: S.String, errorType: S.String })).annotate({
        identifier: "DeleteUniqueIdError",
      });
    case 2:
      return S.Array(__S(769, __c48, 1));
    case 3:
      return S.suspend(() => S.Struct({ uniqueId: S.String })).annotate({
        identifier: "DeletedUniqueId",
      });
    case 4:
      return S.Array(__S(771, __c48, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          status: S.String,
          errors: S.optional(__S(770, __c48, 2)),
          deleted: S.optional(__S(772, __c48, 4)),
          disconnectedUniqueIds: S.optional(__S(752, __c47, 0)),
        }),
      ).annotate({ identifier: "BatchDeleteUniqueIdOutput" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String,
          description: S.optional(S.String),
          inputSourceConfig: __S(849, __c53, 1),
          outputSourceConfig: S.optional(__S(851, __c53, 3)),
          idMappingTechniques: __S(853, __c53, 5),
          incrementalRunConfig: S.optional(__S(834, __c52, 2)),
          roleArn: S.optional(S.String),
          tags: S.optional(__S(800, __c50, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/idmappingworkflows" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateIdMappingWorkflowInput" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ruleName: S.String, matchingKeys: __S(752, __c47, 0) }),
      ).annotate({ identifier: "Rule" });
    case 1:
      return S.Array(__S(816, __c51, 0));
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ intermediateS3Path: S.String })).annotate({
        identifier: "IntermediateSourceConfiguration",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          providerServiceArn: S.String,
          providerConfiguration: S.optional(S.Any),
          intermediateSourceConfiguration: S.optional(__S(832, __c52, 0)),
        }),
      ).annotate({ identifier: "ProviderProperties" });
    case 2:
      return S.suspend(() => S.Struct({ incrementalRunType: S.optional(S.String) })).annotate({
        identifier: "IdMappingIncrementalRunConfig",
      });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          inputSourceARN: S.String,
          schemaName: S.optional(S.String),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "IdMappingWorkflowInputSource" });
    case 1:
      return S.Array(__S(848, __c53, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ KMSArn: S.optional(S.String), outputS3Path: S.String }),
      ).annotate({ identifier: "IdMappingWorkflowOutputSource" });
    case 3:
      return S.Array(__S(850, __c53, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          rules: S.optional(__S(817, __c51, 1)),
          ruleDefinitionType: S.String,
          attributeMatchingModel: S.String,
          recordMatchingModel: S.String,
        }),
      ).annotate({ identifier: "IdMappingRuleBasedProperties" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          idMappingType: S.String,
          ruleBasedProperties: S.optional(__S(852, __c53, 4)),
          providerProperties: S.optional(__S(833, __c52, 1)),
        }),
      ).annotate({ identifier: "IdMappingTechniques" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workflowName: S.String,
          workflowArn: S.String,
          description: S.optional(S.String),
          inputSourceConfig: __S(849, __c53, 1),
          outputSourceConfig: S.optional(__S(851, __c53, 3)),
          idMappingTechniques: __S(853, __c53, 5),
          incrementalRunConfig: S.optional(__S(834, __c52, 2)),
          roleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateIdMappingWorkflowOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
