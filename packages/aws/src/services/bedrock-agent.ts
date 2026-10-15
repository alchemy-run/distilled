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
  sdkId: "Bedrock Agent",
  serviceShapeName: "AmazonBedrockAgentBuildTimeLambda",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "bedrock" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-06-05");
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
              `https://bedrock-agent-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://bedrock-agent-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://bedrock-agent.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://bedrock-agent.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://bedrock-agent.{R}.{D}","properties":{},"headers":{}}');

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
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
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
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(2465, __c77, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type Id = string;
export type DraftVersion = string;
export type AgentAliasArn = string;
export interface AgentDescriptor {
  aliasArn?: string;
}
export type Name = string;
export type CollaborationInstruction = string | redacted.Redacted<string>;
export type RelayConversationHistory = "TO_COLLABORATOR" | "DISABLED" | (string & {});
export type ClientToken = string;
export interface AssociateAgentCollaboratorRequest {
  agentId: string;
  agentVersion: string;
  agentDescriptor: AgentDescriptor;
  collaboratorName: string;
  collaborationInstruction: string | redacted.Redacted<string>;
  relayConversationHistory?: RelayConversationHistory;
  clientToken?: string;
}
export type Version = string;
export interface AgentCollaborator {
  agentId: string;
  agentVersion: string;
  agentDescriptor: AgentDescriptor;
  collaboratorId: string;
  collaborationInstruction: string | redacted.Redacted<string>;
  collaboratorName: string;
  createdAt: Date;
  lastUpdatedAt: Date;
  relayConversationHistory?: RelayConversationHistory;
  clientToken?: string;
}
export interface AssociateAgentCollaboratorResponse {
  agentCollaborator: AgentCollaborator;
}
export type Description = string;
export type KnowledgeBaseState = "ENABLED" | "DISABLED" | (string & {});
export interface AssociateAgentKnowledgeBaseRequest {
  agentId: string;
  agentVersion: string;
  knowledgeBaseId: string;
  description: string;
  knowledgeBaseState?: KnowledgeBaseState;
}
export interface AgentKnowledgeBase {
  agentId: string;
  agentVersion: string;
  knowledgeBaseId: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  knowledgeBaseState: KnowledgeBaseState;
}
export interface AssociateAgentKnowledgeBaseResponse {
  agentKnowledgeBase: AgentKnowledgeBase;
}
export type Instruction = string | redacted.Redacted<string>;
export type ModelIdentifier = string;
export type OrchestrationType = "DEFAULT" | "CUSTOM_ORCHESTRATION" | (string & {});
export type LambdaArn = string;
export type OrchestrationExecutor = { lambda: string };
export interface CustomOrchestration {
  executor?: OrchestrationExecutor;
}
export type SessionTTL = number;
export type AgentRoleArn = string;
export type KmsKeyArn = string;
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export type PromptType =
  | "PRE_PROCESSING"
  | "ORCHESTRATION"
  | "POST_PROCESSING"
  | "KNOWLEDGE_BASE_RESPONSE_GENERATION"
  | "MEMORY_SUMMARIZATION"
  | (string & {});
export type CreationMode = "DEFAULT" | "OVERRIDDEN" | (string & {});
export type PromptState = "ENABLED" | "DISABLED" | (string & {});
export type BasePromptTemplate = string | redacted.Redacted<string>;
export type Temperature = number;
export type TopP = number;
export type TopK = number;
export type MaximumLength = number;
export type StopSequences = string[];
export interface InferenceConfiguration {
  temperature?: number;
  topP?: number;
  topK?: number;
  maximumLength?: number;
  stopSequences?: string[];
}
export interface PromptConfiguration {
  promptType?: PromptType;
  promptCreationMode?: CreationMode;
  promptState?: PromptState;
  basePromptTemplate?: string | redacted.Redacted<string>;
  inferenceConfiguration?: InferenceConfiguration;
  parserMode?: CreationMode;
  foundationModel?: string;
  additionalModelRequestFields?: any;
}
export type PromptConfigurations = PromptConfiguration[];
export interface PromptOverrideConfiguration {
  promptConfigurations: PromptConfiguration[];
  overrideLambda?: string;
}
export type GuardrailIdentifier = string;
export type GuardrailVersion = string;
export interface GuardrailConfiguration {
  guardrailIdentifier?: string;
  guardrailVersion?: string;
}
export type MemoryType = "SESSION_SUMMARY" | (string & {});
export type EnabledMemoryTypes = MemoryType[];
export type StorageDays = number;
export type MaxRecentSessions = number;
export interface SessionSummaryConfiguration {
  maxRecentSessions?: number;
}
export interface MemoryConfiguration {
  enabledMemoryTypes: MemoryType[];
  storageDays?: number;
  sessionSummaryConfiguration?: SessionSummaryConfiguration;
}
export type AgentCollaboration = "SUPERVISOR" | "SUPERVISOR_ROUTER" | "DISABLED" | (string & {});
export interface CreateAgentRequest {
  agentName: string;
  clientToken?: string;
  instruction?: string | redacted.Redacted<string>;
  foundationModel?: string;
  description?: string;
  orchestrationType?: OrchestrationType;
  customOrchestration?: CustomOrchestration;
  idleSessionTTLInSeconds?: number;
  agentResourceRoleArn?: string;
  customerEncryptionKeyArn?: string;
  tags?: { [key: string]: string | undefined };
  promptOverrideConfiguration?: PromptOverrideConfiguration;
  guardrailConfiguration?: GuardrailConfiguration;
  memoryConfiguration?: MemoryConfiguration;
  agentCollaboration?: AgentCollaboration;
}
export type AgentArn = string;
export type AgentStatus =
  | "CREATING"
  | "PREPARING"
  | "PREPARED"
  | "NOT_PREPARED"
  | "DELETING"
  | "FAILED"
  | "VERSIONING"
  | "UPDATING"
  | (string & {});
export type FailureReason = string;
export type FailureReasons = string[];
export type RecommendedAction = string;
export type RecommendedActions = string[];
export interface Agent {
  agentId: string;
  agentName: string;
  agentArn: string;
  agentVersion?: string;
  clientToken?: string;
  instruction?: string | redacted.Redacted<string>;
  agentStatus: AgentStatus;
  foundationModel?: string;
  description?: string;
  orchestrationType?: OrchestrationType;
  customOrchestration?: CustomOrchestration;
  idleSessionTTLInSeconds: number;
  agentResourceRoleArn: string;
  customerEncryptionKeyArn?: string;
  createdAt: Date;
  updatedAt: Date;
  preparedAt?: Date;
  failureReasons?: string[];
  recommendedActions?: string[];
  promptOverrideConfiguration?: PromptOverrideConfiguration;
  guardrailConfiguration?: GuardrailConfiguration;
  memoryConfiguration?: MemoryConfiguration;
  agentCollaboration?: AgentCollaboration;
}
export interface CreateAgentResponse {
  agent: Agent;
}
export type ActionGroupSignature =
  | "AMAZON.UserInput"
  | "AMAZON.CodeInterpreter"
  | "ANTHROPIC.Computer"
  | "ANTHROPIC.Bash"
  | "ANTHROPIC.TextEditor"
  | (string & {});
export type ActionGroupSignatureParams = { [key: string]: string | undefined };
export type CustomControlMethod = "RETURN_CONTROL" | (string & {});
export type ActionGroupExecutor =
  | { lambda: string; customControl?: never }
  | { lambda?: never; customControl: CustomControlMethod };
export type S3BucketName = string;
export type S3ObjectKey = string;
export interface S3Identifier {
  s3BucketName?: string;
  s3ObjectKey?: string;
}
export type Payload = string | redacted.Redacted<string>;
export type APISchema =
  | { s3: S3Identifier; payload?: never }
  | { s3?: never; payload: string | redacted.Redacted<string> };
export type ActionGroupState = "ENABLED" | "DISABLED" | (string & {});
export type FunctionDescription = string;
export type ParameterDescription = string;
export type Type = "string" | "number" | "integer" | "boolean" | "array" | (string & {});
export interface ParameterDetail {
  description?: string;
  type: Type;
  required?: boolean;
}
export type ParameterMap = { [key: string]: ParameterDetail | undefined };
export type RequireConfirmation = "ENABLED" | "DISABLED" | (string & {});
export interface Function {
  name: string;
  description?: string;
  parameters?: { [key: string]: ParameterDetail | undefined };
  requireConfirmation?: RequireConfirmation;
}
export type Functions = Function[];
export type FunctionSchema = { functions: Function[] };
export interface CreateAgentActionGroupRequest {
  agentId: string;
  agentVersion: string;
  actionGroupName: string;
  clientToken?: string;
  description?: string;
  parentActionGroupSignature?: ActionGroupSignature;
  parentActionGroupSignatureParams?: { [key: string]: string | undefined };
  actionGroupExecutor?: ActionGroupExecutor;
  apiSchema?: APISchema;
  actionGroupState?: ActionGroupState;
  functionSchema?: FunctionSchema;
}
export interface AgentActionGroup {
  agentId: string;
  agentVersion: string;
  actionGroupId: string;
  actionGroupName: string;
  clientToken?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  parentActionSignature?: ActionGroupSignature;
  parentActionGroupSignatureParams?: { [key: string]: string | undefined };
  actionGroupExecutor?: ActionGroupExecutor;
  apiSchema?: APISchema;
  functionSchema?: FunctionSchema;
  actionGroupState: ActionGroupState;
}
export interface CreateAgentActionGroupResponse {
  agentActionGroup: AgentActionGroup;
}
export type ProvisionedModelIdentifier = string;
export interface AgentAliasRoutingConfigurationListItem {
  agentVersion?: string;
  provisionedThroughput?: string;
}
export type AgentAliasRoutingConfiguration = AgentAliasRoutingConfigurationListItem[];
export interface CreateAgentAliasRequest {
  agentId: string;
  agentAliasName: string;
  clientToken?: string;
  description?: string;
  routingConfiguration?: AgentAliasRoutingConfigurationListItem[];
  tags?: { [key: string]: string | undefined };
}
export type AgentAliasId = string;
export interface AgentAliasHistoryEvent {
  routingConfiguration?: AgentAliasRoutingConfigurationListItem[];
  endDate?: Date;
  startDate?: Date;
}
export type AgentAliasHistoryEvents = AgentAliasHistoryEvent[];
export type AgentAliasStatus =
  | "CREATING"
  | "PREPARED"
  | "FAILED"
  | "UPDATING"
  | "DELETING"
  | "DISSOCIATED"
  | (string & {});
export type AliasInvocationState = "ACCEPT_INVOCATIONS" | "REJECT_INVOCATIONS" | (string & {});
export interface AgentAlias {
  agentId: string;
  agentAliasId: string;
  agentAliasName: string;
  agentAliasArn: string;
  clientToken?: string;
  description?: string;
  routingConfiguration: AgentAliasRoutingConfigurationListItem[];
  createdAt: Date;
  updatedAt: Date;
  agentAliasHistoryEvents?: AgentAliasHistoryEvent[];
  agentAliasStatus: AgentAliasStatus;
  failureReasons?: string[];
  aliasInvocationState?: AliasInvocationState;
}
export interface CreateAgentAliasResponse {
  agentAlias: AgentAlias;
}
export type DataSourceType =
  | "S3"
  | "WEB"
  | "CONFLUENCE"
  | "SALESFORCE"
  | "SHAREPOINT"
  | "CUSTOM"
  | "REDSHIFT_METADATA"
  | "MANAGED_KNOWLEDGE_BASE_CONNECTOR"
  | (string & {});
export type EnabledOrDisabledState = "ENABLED" | "DISABLED" | (string & {});
export interface DeletionProtectionConfiguration {
  deletionProtectionStatus: EnabledOrDisabledState;
  deletionProtectionThreshold?: number;
}
export interface ImageExtractionConfiguration {
  imageExtractionStatus: EnabledOrDisabledState;
}
export interface AudioExtractionConfiguration {
  audioExtractionStatus: EnabledOrDisabledState;
}
export interface VideoExtractionConfiguration {
  videoExtractionStatus: EnabledOrDisabledState;
}
export interface MediaExtractionConfiguration {
  imageExtractionConfiguration?: ImageExtractionConfiguration;
  audioExtractionConfiguration?: AudioExtractionConfiguration;
  videoExtractionConfiguration?: VideoExtractionConfiguration;
}
export interface DailySchedule {}
export type DayOfWeek =
  | "SUNDAY"
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | (string & {});
export interface WeeklySchedule {
  dayOfWeek: DayOfWeek;
}
export type DayOfMonthNumber = number;
export interface LastDayOfMonth {}
export type DayOfMonth =
  | { dayNumber: number; lastDayOfMonth?: never }
  | { dayNumber?: never; lastDayOfMonth: LastDayOfMonth };
export interface MonthlySchedule {
  dayOfMonth: DayOfMonth;
}
export type SyncSchedule =
  | { daily: DailySchedule; weekly?: never; monthly?: never }
  | { daily?: never; weekly: WeeklySchedule; monthly?: never }
  | { daily?: never; weekly?: never; monthly: MonthlySchedule };
export interface ManagedKnowledgeBaseConnectorConfiguration {
  deletionProtectionConfiguration?: DeletionProtectionConfiguration;
  mediaExtractionConfiguration?: MediaExtractionConfiguration;
  connectorParameters?: any;
  syncSchedule?: SyncSchedule;
}
export type S3BucketArn = string;
export type S3Prefix = string | redacted.Redacted<string>;
export type S3Prefixes = (string | redacted.Redacted<string>)[];
export type BucketOwnerAccountId = string;
export interface S3DataSourceConfiguration {
  bucketArn: string;
  inclusionPrefixes?: (string | redacted.Redacted<string>)[];
  bucketOwnerAccountId?: string;
}
export type Url = string;
export interface SeedUrl {
  url?: string;
}
export type SeedUrls = SeedUrl[];
export interface UrlConfiguration {
  seedUrls?: SeedUrl[];
}
export interface WebSourceConfiguration {
  urlConfiguration: UrlConfiguration;
}
export interface WebCrawlerLimits {
  rateLimit?: number;
  maxPages?: number;
}
export type FilterPattern = string | redacted.Redacted<string>;
export type FilterList = (string | redacted.Redacted<string>)[];
export type WebScopeType = "HOST_ONLY" | "SUBDOMAINS" | (string & {});
export type UserAgent = string | redacted.Redacted<string>;
export type UserAgentHeader = string | redacted.Redacted<string>;
export interface WebCrawlerConfiguration {
  crawlerLimits?: WebCrawlerLimits;
  inclusionFilters?: (string | redacted.Redacted<string>)[];
  exclusionFilters?: (string | redacted.Redacted<string>)[];
  scope?: WebScopeType;
  userAgent?: string | redacted.Redacted<string>;
  userAgentHeader?: string | redacted.Redacted<string>;
}
export interface WebDataSourceConfiguration {
  sourceConfiguration: WebSourceConfiguration;
  crawlerConfiguration?: WebCrawlerConfiguration;
}
export type HttpsUrl = string;
export type ConfluenceHostType = "SAAS" | (string & {});
export type ConfluenceAuthType = "BASIC" | "OAUTH2_CLIENT_CREDENTIALS" | (string & {});
export type SecretArn = string;
export interface ConfluenceSourceConfiguration {
  hostUrl: string;
  hostType: ConfluenceHostType;
  authType: ConfluenceAuthType;
  credentialsSecretArn: string;
}
export type CrawlFilterConfigurationType = "PATTERN" | (string & {});
export type FilteredObjectType = string | redacted.Redacted<string>;
export interface PatternObjectFilter {
  objectType: string | redacted.Redacted<string>;
  inclusionFilters?: (string | redacted.Redacted<string>)[];
  exclusionFilters?: (string | redacted.Redacted<string>)[];
}
export type PatternObjectFilterList = PatternObjectFilter[];
export interface PatternObjectFilterConfiguration {
  filters: PatternObjectFilter[];
}
export interface CrawlFilterConfiguration {
  type: CrawlFilterConfigurationType;
  patternObjectFilter?: PatternObjectFilterConfiguration;
}
export interface ConfluenceCrawlerConfiguration {
  filterConfiguration?: CrawlFilterConfiguration;
}
export interface ConfluenceDataSourceConfiguration {
  sourceConfiguration: ConfluenceSourceConfiguration;
  crawlerConfiguration?: ConfluenceCrawlerConfiguration;
}
export type SalesforceAuthType = "OAUTH2_CLIENT_CREDENTIALS" | (string & {});
export interface SalesforceSourceConfiguration {
  hostUrl: string;
  authType: SalesforceAuthType;
  credentialsSecretArn: string;
}
export interface SalesforceCrawlerConfiguration {
  filterConfiguration?: CrawlFilterConfiguration;
}
export interface SalesforceDataSourceConfiguration {
  sourceConfiguration: SalesforceSourceConfiguration;
  crawlerConfiguration?: SalesforceCrawlerConfiguration;
}
export type Microsoft365TenantId = string;
export type SharePointDomain = string;
export type SharePointSiteUrls = string[];
export type SharePointHostType = "ONLINE" | (string & {});
export type SharePointAuthType =
  | "OAUTH2_CLIENT_CREDENTIALS"
  | "OAUTH2_SHAREPOINT_APP_ONLY_CLIENT_CREDENTIALS"
  | (string & {});
export interface SharePointSourceConfiguration {
  tenantId?: string;
  domain: string;
  siteUrls: string[];
  hostType: SharePointHostType;
  authType: SharePointAuthType;
  credentialsSecretArn: string;
}
export interface SharePointCrawlerConfiguration {
  filterConfiguration?: CrawlFilterConfiguration;
}
export interface SharePointDataSourceConfiguration {
  sourceConfiguration: SharePointSourceConfiguration;
  crawlerConfiguration?: SharePointCrawlerConfiguration;
}
export interface DataSourceConfiguration {
  type: DataSourceType;
  managedKnowledgeBaseConnectorConfiguration?: ManagedKnowledgeBaseConnectorConfiguration;
  s3Configuration?: S3DataSourceConfiguration;
  webConfiguration?: WebDataSourceConfiguration;
  confluenceConfiguration?: ConfluenceDataSourceConfiguration;
  salesforceConfiguration?: SalesforceDataSourceConfiguration;
  sharePointConfiguration?: SharePointDataSourceConfiguration;
}
export type DataDeletionPolicy = "RETAIN" | "DELETE" | (string & {});
export interface ServerSideEncryptionConfiguration {
  kmsKeyArn?: string;
}
export type ChunkingStrategy = "FIXED_SIZE" | "NONE" | "HIERARCHICAL" | "SEMANTIC" | (string & {});
export interface FixedSizeChunkingConfiguration {
  maxTokens: number;
  overlapPercentage: number;
}
export interface HierarchicalChunkingLevelConfiguration {
  maxTokens: number;
}
export type HierarchicalChunkingLevelConfigurations = HierarchicalChunkingLevelConfiguration[];
export interface HierarchicalChunkingConfiguration {
  levelConfigurations: HierarchicalChunkingLevelConfiguration[];
  overlapTokens: number;
}
export interface SemanticChunkingConfiguration {
  maxTokens: number;
  bufferSize: number;
  breakpointPercentileThreshold: number;
}
export interface ChunkingConfiguration {
  chunkingStrategy: ChunkingStrategy;
  fixedSizeChunkingConfiguration?: FixedSizeChunkingConfiguration;
  hierarchicalChunkingConfiguration?: HierarchicalChunkingConfiguration;
  semanticChunkingConfiguration?: SemanticChunkingConfiguration;
}
export type S3BucketUri = string;
export interface S3Location {
  uri: string;
}
export interface IntermediateStorage {
  s3Location: S3Location;
}
export interface TransformationLambdaConfiguration {
  lambdaArn: string;
}
export interface TransformationFunction {
  transformationLambdaConfiguration: TransformationLambdaConfiguration;
}
export type StepType = "POST_CHUNKING" | (string & {});
export interface Transformation {
  transformationFunction: TransformationFunction;
  stepToApply: StepType;
}
export type Transformations = Transformation[];
export interface CustomTransformationConfiguration {
  intermediateStorage: IntermediateStorage;
  transformations: Transformation[];
}
export type ParsingStrategy =
  | "BEDROCK_FOUNDATION_MODEL"
  | "BEDROCK_DATA_AUTOMATION"
  | "SMART_PARSING"
  | "MULTI_MODAL_EMBEDDINGS"
  | (string & {});
export type BedrockModelArn = string;
export type ParsingPromptText = string;
export interface ParsingPrompt {
  parsingPromptText: string;
}
export type ParsingModality = "MULTIMODAL" | (string & {});
export interface BedrockFoundationModelConfiguration {
  modelArn: string;
  parsingPrompt?: ParsingPrompt;
  parsingModality?: ParsingModality;
}
export interface BedrockDataAutomationConfiguration {
  parsingModality?: ParsingModality;
}
export interface ParsingConfiguration {
  parsingStrategy: ParsingStrategy;
  bedrockFoundationModelConfiguration?: BedrockFoundationModelConfiguration;
  bedrockDataAutomationConfiguration?: BedrockDataAutomationConfiguration;
}
export type ContextEnrichmentType = "BEDROCK_FOUNDATION_MODEL" | (string & {});
export type EnrichmentStrategyMethod = "CHUNK_ENTITY_EXTRACTION" | (string & {});
export interface EnrichmentStrategyConfiguration {
  method: EnrichmentStrategyMethod;
}
export interface BedrockFoundationModelContextEnrichmentConfiguration {
  enrichmentStrategyConfiguration: EnrichmentStrategyConfiguration;
  modelArn: string;
}
export interface ContextEnrichmentConfiguration {
  type: ContextEnrichmentType;
  bedrockFoundationModelConfiguration?: BedrockFoundationModelContextEnrichmentConfiguration;
}
export interface VectorIngestionConfiguration {
  chunkingConfiguration?: ChunkingConfiguration;
  customTransformationConfiguration?: CustomTransformationConfiguration;
  parsingConfiguration?: ParsingConfiguration;
  contextEnrichmentConfiguration?: ContextEnrichmentConfiguration;
}
export interface CreateDataSourceRequest {
  knowledgeBaseId: string;
  clientToken?: string;
  name: string;
  description?: string;
  dataSourceConfiguration: DataSourceConfiguration;
  dataDeletionPolicy?: DataDeletionPolicy;
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  vectorIngestionConfiguration?: VectorIngestionConfiguration;
}
export type DataSourceStatus =
  | "AVAILABLE"
  | "DELETING"
  | "DELETE_UNSUCCESSFUL"
  | "CREATING"
  | "UPDATING"
  | "FAILED"
  | (string & {});
export interface DataSource {
  knowledgeBaseId: string;
  dataSourceId: string;
  name: string;
  status: DataSourceStatus;
  description?: string;
  dataSourceConfiguration: DataSourceConfiguration;
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  vectorIngestionConfiguration?: VectorIngestionConfiguration;
  dataDeletionPolicy?: DataDeletionPolicy;
  createdAt: Date;
  updatedAt: Date;
  failureReasons?: string[];
}
export interface CreateDataSourceResponse {
  dataSource: DataSource;
}
export type FlowName = string;
export type FlowDescription = string;
export type FlowExecutionRoleArn = string;
export type FlowNodeName = string;
export type FlowNodeType =
  | "Input"
  | "Output"
  | "KnowledgeBase"
  | "Condition"
  | "Lex"
  | "Prompt"
  | "LambdaFunction"
  | "Storage"
  | "Agent"
  | "Retrieval"
  | "Iterator"
  | "Collector"
  | "InlineCode"
  | "Loop"
  | "LoopInput"
  | "LoopController"
  | (string & {});
export interface InputFlowNodeConfiguration {}
export interface OutputFlowNodeConfiguration {}
export type FlowKnowledgeBaseId = string;
export type KnowledgeBaseModelIdentifier = string;
export type KnowledgeBaseTextPrompt = string | redacted.Redacted<string>;
export interface KnowledgeBasePromptTemplate {
  textPromptTemplate?: string | redacted.Redacted<string>;
}
export interface PromptModelInferenceConfiguration {
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  stopSequences?: string[];
}
export type PromptInferenceConfiguration = { text: PromptModelInferenceConfiguration };
export type VectorSearchRerankingConfigurationType = "BEDROCK_RERANKING_MODEL" | (string & {});
export type BedrockRerankingModelArn = string;
export type AdditionalModelRequestFieldsKey = string;
export type AdditionalModelRequestFieldsValue = unknown;
export type AdditionalModelRequestFields = { [key: string]: any | undefined };
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
export type PerformanceConfigLatency = "standard" | "optimized" | (string & {});
export interface PerformanceConfiguration {
  latency?: PerformanceConfigLatency;
}
export interface KnowledgeBaseOrchestrationConfiguration {
  promptTemplate?: KnowledgeBasePromptTemplate;
  inferenceConfig?: PromptInferenceConfiguration;
  additionalModelRequestFields?: { [key: string]: any | undefined };
  performanceConfig?: PerformanceConfiguration;
}
export interface KnowledgeBaseFlowNodeConfiguration {
  knowledgeBaseId: string;
  modelId?: string;
  guardrailConfiguration?: GuardrailConfiguration;
  numberOfResults?: number;
  promptTemplate?: KnowledgeBasePromptTemplate;
  inferenceConfiguration?: PromptInferenceConfiguration;
  rerankingConfiguration?: VectorSearchRerankingConfiguration;
  orchestrationConfiguration?: KnowledgeBaseOrchestrationConfiguration;
}
export type FlowConditionName = string;
export type FlowConditionExpression = string | redacted.Redacted<string>;
export interface FlowCondition {
  name: string;
  expression?: string | redacted.Redacted<string>;
}
export type FlowConditions = FlowCondition[];
export interface ConditionFlowNodeConfiguration {
  conditions: FlowCondition[];
}
export type FlowLexBotAliasArn = string;
export type FlowLexBotLocaleId = string;
export interface LexFlowNodeConfiguration {
  botAliasArn: string;
  localeId: string;
}
export type FlowPromptArn = string;
export interface PromptFlowNodeResourceConfiguration {
  promptArn: string;
}
export type PromptTemplateType = "TEXT" | "CHAT" | (string & {});
export type TextPrompt = string | redacted.Redacted<string>;
export type CachePointType = "default" | (string & {});
export interface CachePointBlock {
  type: CachePointType;
}
export type PromptInputVariableName = string;
export interface PromptInputVariable {
  name?: string;
}
export type PromptInputVariablesList = PromptInputVariable[];
export interface TextPromptTemplateConfiguration {
  text: string | redacted.Redacted<string>;
  cachePoint?: CachePointBlock;
  inputVariables?: PromptInputVariable[];
}
export type ConversationRole = "user" | "assistant" | (string & {});
export type ContentBlock =
  | { text: string; cachePoint?: never }
  | { text?: never; cachePoint: CachePointBlock };
export type ContentBlocks = ContentBlock[];
export interface Message {
  role: ConversationRole;
  content: ContentBlock[];
}
export type Messages = Message[];
export type NonEmptyString = string;
export type SystemContentBlock =
  | { text: string; cachePoint?: never }
  | { text?: never; cachePoint: CachePointBlock };
export type SystemContentBlocks = SystemContentBlock[];
export type ToolName = string;
export type ToolInputSchema = { json: any };
export interface ToolSpecification {
  name: string;
  description?: string;
  inputSchema: ToolInputSchema;
  strict?: boolean;
}
export type Tool =
  | { toolSpec: ToolSpecification; cachePoint?: never }
  | { toolSpec?: never; cachePoint: CachePointBlock };
export type Tools = Tool[];
export interface AutoToolChoice {}
export interface AnyToolChoice {}
export interface SpecificToolChoice {
  name: string;
}
export type ToolChoice =
  | { auto: AutoToolChoice; any?: never; tool?: never }
  | { auto?: never; any: AnyToolChoice; tool?: never }
  | { auto?: never; any?: never; tool: SpecificToolChoice };
export interface ToolConfiguration {
  tools: Tool[];
  toolChoice?: ToolChoice;
}
export interface ChatPromptTemplateConfiguration {
  messages: Message[];
  system?: SystemContentBlock[];
  inputVariables?: PromptInputVariable[];
  toolConfiguration?: ToolConfiguration;
}
export type PromptTemplateConfiguration =
  | { text: TextPromptTemplateConfiguration; chat?: never }
  | { text?: never; chat: ChatPromptTemplateConfiguration };
export type FlowPromptModelIdentifier = string;
export interface PromptFlowNodeInlineConfiguration {
  templateType: PromptTemplateType;
  templateConfiguration: PromptTemplateConfiguration;
  modelId: string;
  inferenceConfiguration?: PromptInferenceConfiguration;
  additionalModelRequestFields?: any;
}
export type PromptFlowNodeSourceConfiguration =
  | { resource: PromptFlowNodeResourceConfiguration; inline?: never }
  | { resource?: never; inline: PromptFlowNodeInlineConfiguration };
export interface PromptFlowNodeConfiguration {
  sourceConfiguration: PromptFlowNodeSourceConfiguration;
  guardrailConfiguration?: GuardrailConfiguration;
}
export type FlowLambdaArn = string;
export interface LambdaFunctionFlowNodeConfiguration {
  lambdaArn: string;
}
export type FlowS3BucketName = string;
export interface StorageFlowNodeS3Configuration {
  bucketName: string;
}
export type StorageFlowNodeServiceConfiguration = { s3: StorageFlowNodeS3Configuration };
export interface StorageFlowNodeConfiguration {
  serviceConfiguration: StorageFlowNodeServiceConfiguration;
}
export type FlowAgentAliasArn = string;
export interface AgentFlowNodeConfiguration {
  agentAliasArn: string;
}
export interface RetrievalFlowNodeS3Configuration {
  bucketName: string;
}
export type RetrievalFlowNodeServiceConfiguration = { s3: RetrievalFlowNodeS3Configuration };
export interface RetrievalFlowNodeConfiguration {
  serviceConfiguration: RetrievalFlowNodeServiceConfiguration;
}
export interface IteratorFlowNodeConfiguration {}
export interface CollectorFlowNodeConfiguration {}
export type InlineCode = string | redacted.Redacted<string>;
export type SupportedLanguages = "Python_3" | (string & {});
export interface InlineCodeFlowNodeConfiguration {
  code: string | redacted.Redacted<string>;
  language: SupportedLanguages;
}
export interface LoopFlowNodeConfiguration {
  definition: FlowDefinition;
}
export interface LoopInputFlowNodeConfiguration {}
export interface LoopControllerFlowNodeConfiguration {
  continueCondition: FlowCondition;
  maxIterations?: number;
}
export type FlowNodeConfiguration =
  | {
      input: InputFlowNodeConfiguration;
      output?: never;
      knowledgeBase?: never;
      condition?: never;
      lex?: never;
      prompt?: never;
      lambdaFunction?: never;
      storage?: never;
      agent?: never;
      retrieval?: never;
      iterator?: never;
      collector?: never;
      inlineCode?: never;
      loop?: never;
      loopInput?: never;
      loopController?: never;
    }
  | {
      input?: never;
      output: OutputFlowNodeConfiguration;
      knowledgeBase?: never;
      condition?: never;
      lex?: never;
      prompt?: never;
      lambdaFunction?: never;
      storage?: never;
      agent?: never;
      retrieval?: never;
      iterator?: never;
      collector?: never;
      inlineCode?: never;
      loop?: never;
      loopInput?: never;
      loopController?: never;
    }
  | {
      input?: never;
      output?: never;
      knowledgeBase: KnowledgeBaseFlowNodeConfiguration;
      condition?: never;
      lex?: never;
      prompt?: never;
      lambdaFunction?: never;
      storage?: never;
      agent?: never;
      retrieval?: never;
      iterator?: never;
      collector?: never;
      inlineCode?: never;
      loop?: never;
      loopInput?: never;
      loopController?: never;
    }
  | {
      input?: never;
      output?: never;
      knowledgeBase?: never;
      condition: ConditionFlowNodeConfiguration;
      lex?: never;
      prompt?: never;
      lambdaFunction?: never;
      storage?: never;
      agent?: never;
      retrieval?: never;
      iterator?: never;
      collector?: never;
      inlineCode?: never;
      loop?: never;
      loopInput?: never;
      loopController?: never;
    }
  | {
      input?: never;
      output?: never;
      knowledgeBase?: never;
      condition?: never;
      lex: LexFlowNodeConfiguration;
      prompt?: never;
      lambdaFunction?: never;
      storage?: never;
      agent?: never;
      retrieval?: never;
      iterator?: never;
      collector?: never;
      inlineCode?: never;
      loop?: never;
      loopInput?: never;
      loopController?: never;
    }
  | {
      input?: never;
      output?: never;
      knowledgeBase?: never;
      condition?: never;
      lex?: never;
      prompt: PromptFlowNodeConfiguration;
      lambdaFunction?: never;
      storage?: never;
      agent?: never;
      retrieval?: never;
      iterator?: never;
      collector?: never;
      inlineCode?: never;
      loop?: never;
      loopInput?: never;
      loopController?: never;
    }
  | {
      input?: never;
      output?: never;
      knowledgeBase?: never;
      condition?: never;
      lex?: never;
      prompt?: never;
      lambdaFunction: LambdaFunctionFlowNodeConfiguration;
      storage?: never;
      agent?: never;
      retrieval?: never;
      iterator?: never;
      collector?: never;
      inlineCode?: never;
      loop?: never;
      loopInput?: never;
      loopController?: never;
    }
  | {
      input?: never;
      output?: never;
      knowledgeBase?: never;
      condition?: never;
      lex?: never;
      prompt?: never;
      lambdaFunction?: never;
      storage: StorageFlowNodeConfiguration;
      agent?: never;
      retrieval?: never;
      iterator?: never;
      collector?: never;
      inlineCode?: never;
      loop?: never;
      loopInput?: never;
      loopController?: never;
    }
  | {
      input?: never;
      output?: never;
      knowledgeBase?: never;
      condition?: never;
      lex?: never;
      prompt?: never;
      lambdaFunction?: never;
      storage?: never;
      agent: AgentFlowNodeConfiguration;
      retrieval?: never;
      iterator?: never;
      collector?: never;
      inlineCode?: never;
      loop?: never;
      loopInput?: never;
      loopController?: never;
    }
  | {
      input?: never;
      output?: never;
      knowledgeBase?: never;
      condition?: never;
      lex?: never;
      prompt?: never;
      lambdaFunction?: never;
      storage?: never;
      agent?: never;
      retrieval: RetrievalFlowNodeConfiguration;
      iterator?: never;
      collector?: never;
      inlineCode?: never;
      loop?: never;
      loopInput?: never;
      loopController?: never;
    }
  | {
      input?: never;
      output?: never;
      knowledgeBase?: never;
      condition?: never;
      lex?: never;
      prompt?: never;
      lambdaFunction?: never;
      storage?: never;
      agent?: never;
      retrieval?: never;
      iterator: IteratorFlowNodeConfiguration;
      collector?: never;
      inlineCode?: never;
      loop?: never;
      loopInput?: never;
      loopController?: never;
    }
  | {
      input?: never;
      output?: never;
      knowledgeBase?: never;
      condition?: never;
      lex?: never;
      prompt?: never;
      lambdaFunction?: never;
      storage?: never;
      agent?: never;
      retrieval?: never;
      iterator?: never;
      collector: CollectorFlowNodeConfiguration;
      inlineCode?: never;
      loop?: never;
      loopInput?: never;
      loopController?: never;
    }
  | {
      input?: never;
      output?: never;
      knowledgeBase?: never;
      condition?: never;
      lex?: never;
      prompt?: never;
      lambdaFunction?: never;
      storage?: never;
      agent?: never;
      retrieval?: never;
      iterator?: never;
      collector?: never;
      inlineCode: InlineCodeFlowNodeConfiguration;
      loop?: never;
      loopInput?: never;
      loopController?: never;
    }
  | {
      input?: never;
      output?: never;
      knowledgeBase?: never;
      condition?: never;
      lex?: never;
      prompt?: never;
      lambdaFunction?: never;
      storage?: never;
      agent?: never;
      retrieval?: never;
      iterator?: never;
      collector?: never;
      inlineCode?: never;
      loop: LoopFlowNodeConfiguration;
      loopInput?: never;
      loopController?: never;
    }
  | {
      input?: never;
      output?: never;
      knowledgeBase?: never;
      condition?: never;
      lex?: never;
      prompt?: never;
      lambdaFunction?: never;
      storage?: never;
      agent?: never;
      retrieval?: never;
      iterator?: never;
      collector?: never;
      inlineCode?: never;
      loop?: never;
      loopInput: LoopInputFlowNodeConfiguration;
      loopController?: never;
    }
  | {
      input?: never;
      output?: never;
      knowledgeBase?: never;
      condition?: never;
      lex?: never;
      prompt?: never;
      lambdaFunction?: never;
      storage?: never;
      agent?: never;
      retrieval?: never;
      iterator?: never;
      collector?: never;
      inlineCode?: never;
      loop?: never;
      loopInput?: never;
      loopController: LoopControllerFlowNodeConfiguration;
    };
export type FlowNodeInputName = string;
export type FlowNodeIODataType =
  | "String"
  | "Number"
  | "Boolean"
  | "Object"
  | "Array"
  | (string & {});
export type FlowNodeInputExpression = string | redacted.Redacted<string>;
export type FlowNodeInputCategory =
  | "LoopCondition"
  | "ReturnValueToLoopStart"
  | "ExitLoop"
  | (string & {});
export interface FlowNodeInput {
  name: string;
  type: FlowNodeIODataType;
  expression: string | redacted.Redacted<string>;
  category?: FlowNodeInputCategory;
}
export type FlowNodeInputs = FlowNodeInput[];
export type FlowNodeOutputName = string;
export interface FlowNodeOutput {
  name: string;
  type: FlowNodeIODataType;
}
export type FlowNodeOutputs = FlowNodeOutput[];
export interface FlowNode {
  name: string;
  type: FlowNodeType;
  configuration?: FlowNodeConfiguration;
  inputs?: FlowNodeInput[];
  outputs?: FlowNodeOutput[];
}
export type FlowNodes = FlowNode[];
export type FlowConnectionType = "Data" | "Conditional" | (string & {});
export type FlowConnectionName = string;
export interface FlowDataConnectionConfiguration {
  sourceOutput: string;
  targetInput: string;
}
export interface FlowConditionalConnectionConfiguration {
  condition: string;
}
export type FlowConnectionConfiguration =
  | { data: FlowDataConnectionConfiguration; conditional?: never }
  | { data?: never; conditional: FlowConditionalConnectionConfiguration };
export interface FlowConnection {
  type: FlowConnectionType;
  name: string;
  source: string;
  target: string;
  configuration?: FlowConnectionConfiguration;
}
export type FlowConnections = FlowConnection[];
export interface FlowDefinition {
  nodes?: FlowNode[];
  connections?: FlowConnection[];
}
export interface CreateFlowRequest {
  name: string;
  description?: string;
  executionRoleArn: string;
  customerEncryptionKeyArn?: string;
  definition?: FlowDefinition;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type FlowId = string;
export type FlowArn = string;
export type FlowStatus = "Failed" | "Prepared" | "Preparing" | "NotPrepared" | (string & {});
export interface CreateFlowResponse {
  name: string;
  description?: string;
  executionRoleArn: string;
  customerEncryptionKeyArn?: string;
  id: string;
  arn: string;
  status: FlowStatus;
  createdAt: Date;
  updatedAt: Date;
  version: string;
  definition?: FlowDefinition;
}
export interface FlowAliasRoutingConfigurationListItem {
  flowVersion?: string;
}
export type FlowAliasRoutingConfiguration = FlowAliasRoutingConfigurationListItem[];
export type ConcurrencyType = "Automatic" | "Manual" | (string & {});
export interface FlowAliasConcurrencyConfiguration {
  type: ConcurrencyType;
  maxConcurrency?: number;
}
export type FlowIdentifier = string;
export interface CreateFlowAliasRequest {
  name: string;
  description?: string;
  routingConfiguration: FlowAliasRoutingConfigurationListItem[];
  concurrencyConfiguration?: FlowAliasConcurrencyConfiguration;
  flowIdentifier: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type FlowAliasId = string;
export type FlowAliasArn = string;
export interface CreateFlowAliasResponse {
  name: string;
  description?: string;
  routingConfiguration: FlowAliasRoutingConfigurationListItem[];
  concurrencyConfiguration?: FlowAliasConcurrencyConfiguration;
  flowId: string;
  id: string;
  arn: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface CreateFlowVersionRequest {
  flowIdentifier: string;
  description?: string;
  clientToken?: string;
}
export type NumericalVersion = string;
export interface CreateFlowVersionResponse {
  name: string;
  description?: string;
  executionRoleArn: string;
  customerEncryptionKeyArn?: string;
  id: string;
  arn: string;
  status: FlowStatus;
  createdAt: Date;
  version: string;
  definition?: FlowDefinition;
}
export type KnowledgeBaseRoleArn = string;
export type KnowledgeBaseType = "VECTOR" | "KENDRA" | "SQL" | "MANAGED" | (string & {});
export type BedrockEmbeddingModelArn = string;
export type Dimensions = number;
export type EmbeddingDataType = "FLOAT32" | "BINARY" | (string & {});
export interface AudioSegmentationConfiguration {
  fixedLengthDuration: number;
}
export interface AudioConfiguration {
  segmentationConfiguration: AudioSegmentationConfiguration;
}
export type AudioConfigurations = AudioConfiguration[];
export interface VideoSegmentationConfiguration {
  fixedLengthDuration: number;
}
export interface VideoConfiguration {
  segmentationConfiguration: VideoSegmentationConfiguration;
}
export type VideoConfigurations = VideoConfiguration[];
export interface BedrockEmbeddingModelConfiguration {
  dimensions?: number;
  embeddingDataType?: EmbeddingDataType;
  audio?: AudioConfiguration[];
  video?: VideoConfiguration[];
  modelConfiguration?: any;
}
export interface EmbeddingModelConfiguration {
  bedrockEmbeddingModelConfiguration?: BedrockEmbeddingModelConfiguration;
}
export type SupplementalDataStorageLocationType = "S3" | (string & {});
export interface SupplementalDataStorageLocation {
  type: SupplementalDataStorageLocationType;
  s3Location?: S3Location;
}
export type SupplementalDataStorageLocations = SupplementalDataStorageLocation[];
export interface SupplementalDataStorageConfiguration {
  storageLocations: SupplementalDataStorageLocation[];
}
export interface VectorKnowledgeBaseConfiguration {
  embeddingModelArn: string;
  embeddingModelConfiguration?: EmbeddingModelConfiguration;
  supplementalDataStorageConfiguration?: SupplementalDataStorageConfiguration;
}
export type EmbeddingModelType = "CUSTOM" | "MANAGED" | (string & {});
export interface ManagedKnowledgeBaseConfiguration {
  embeddingModelType?: EmbeddingModelType;
  embeddingModelArn?: string;
  embeddingModelConfiguration?: EmbeddingModelConfiguration;
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  supplementalDataStorageConfiguration?: SupplementalDataStorageConfiguration;
}
export type KendraIndexArn = string;
export interface KendraKnowledgeBaseConfiguration {
  kendraIndexArn: string;
}
export type QueryEngineType = "REDSHIFT" | (string & {});
export type RedshiftQueryEngineStorageType = "REDSHIFT" | "AWS_DATA_CATALOG" | (string & {});
export type AwsDataCatalogTableName = string;
export type AwsDataCatalogTableNames = string[];
export interface RedshiftQueryEngineAwsDataCatalogStorageConfiguration {
  tableNames: string[];
}
export type RedshiftDatabase = string;
export interface RedshiftQueryEngineRedshiftStorageConfiguration {
  databaseName: string;
}
export interface RedshiftQueryEngineStorageConfiguration {
  type: RedshiftQueryEngineStorageType;
  awsDataCatalogConfiguration?: RedshiftQueryEngineAwsDataCatalogStorageConfiguration;
  redshiftConfiguration?: RedshiftQueryEngineRedshiftStorageConfiguration;
}
export type RedshiftQueryEngineStorageConfigurations = RedshiftQueryEngineStorageConfiguration[];
export type RedshiftQueryEngineType = "SERVERLESS" | "PROVISIONED" | (string & {});
export type WorkgroupArn = string;
export type RedshiftServerlessAuthType = "IAM" | "USERNAME_PASSWORD" | (string & {});
export interface RedshiftServerlessAuthConfiguration {
  type: RedshiftServerlessAuthType;
  usernamePasswordSecretArn?: string;
}
export interface RedshiftServerlessConfiguration {
  workgroupArn: string;
  authConfiguration: RedshiftServerlessAuthConfiguration;
}
export type RedshiftClusterIdentifier = string;
export type RedshiftProvisionedAuthType = "IAM" | "USERNAME_PASSWORD" | "USERNAME" | (string & {});
export interface RedshiftProvisionedAuthConfiguration {
  type: RedshiftProvisionedAuthType;
  databaseUser?: string;
  usernamePasswordSecretArn?: string;
}
export interface RedshiftProvisionedConfiguration {
  clusterIdentifier: string;
  authConfiguration: RedshiftProvisionedAuthConfiguration;
}
export interface RedshiftQueryEngineConfiguration {
  type: RedshiftQueryEngineType;
  serverlessConfiguration?: RedshiftServerlessConfiguration;
  provisionedConfiguration?: RedshiftProvisionedConfiguration;
}
export type QueryExecutionTimeoutSeconds = number;
export type QueryGenerationTableName = string;
export type DescriptionString = string;
export type IncludeExclude = "INCLUDE" | "EXCLUDE" | (string & {});
export type QueryGenerationColumnName = string;
export interface QueryGenerationColumn {
  name?: string;
  description?: string;
  inclusion?: IncludeExclude;
}
export type QueryGenerationColumns = QueryGenerationColumn[];
export interface QueryGenerationTable {
  name: string;
  description?: string;
  inclusion?: IncludeExclude;
  columns?: QueryGenerationColumn[];
}
export type QueryGenerationTables = QueryGenerationTable[];
export type NaturalLanguageString = string;
export type SqlString = string;
export interface CuratedQuery {
  naturalLanguage: string;
  sql: string;
}
export type CuratedQueries = CuratedQuery[];
export interface QueryGenerationContext {
  tables?: QueryGenerationTable[];
  curatedQueries?: CuratedQuery[];
}
export interface QueryGenerationConfiguration {
  executionTimeoutSeconds?: number;
  generationContext?: QueryGenerationContext;
}
export interface RedshiftConfiguration {
  storageConfigurations: RedshiftQueryEngineStorageConfiguration[];
  queryEngineConfiguration: RedshiftQueryEngineConfiguration;
  queryGenerationConfiguration?: QueryGenerationConfiguration;
}
export interface SqlKnowledgeBaseConfiguration {
  type: QueryEngineType;
  redshiftConfiguration?: RedshiftConfiguration;
}
export interface KnowledgeBaseConfiguration {
  type: KnowledgeBaseType;
  vectorKnowledgeBaseConfiguration?: VectorKnowledgeBaseConfiguration;
  managedKnowledgeBaseConfiguration?: ManagedKnowledgeBaseConfiguration;
  kendraKnowledgeBaseConfiguration?: KendraKnowledgeBaseConfiguration;
  sqlKnowledgeBaseConfiguration?: SqlKnowledgeBaseConfiguration;
}
export type KnowledgeBaseStorageType =
  | "OPENSEARCH_SERVERLESS"
  | "PINECONE"
  | "REDIS_ENTERPRISE_CLOUD"
  | "RDS"
  | "MONGO_DB_ATLAS"
  | "NEPTUNE_ANALYTICS"
  | "OPENSEARCH_MANAGED_CLUSTER"
  | "S3_VECTORS"
  | (string & {});
export type OpenSearchServerlessCollectionArn = string;
export type OpenSearchServerlessIndexName = string;
export type FieldName = string;
export interface OpenSearchServerlessFieldMapping {
  vectorField: string;
  textField: string;
  metadataField: string;
}
export interface OpenSearchServerlessConfiguration {
  collectionArn: string;
  vectorIndexName: string;
  fieldMapping: OpenSearchServerlessFieldMapping;
}
export type OpenSearchManagedClusterDomainEndpoint = string;
export type OpenSearchManagedClusterDomainArn = string;
export type OpenSearchManagedClusterIndexName = string | redacted.Redacted<string>;
export interface OpenSearchManagedClusterFieldMapping {
  vectorField: string;
  textField: string;
  metadataField: string;
}
export interface OpenSearchManagedClusterConfiguration {
  domainEndpoint: string;
  domainArn: string;
  vectorIndexName: string | redacted.Redacted<string>;
  fieldMapping: OpenSearchManagedClusterFieldMapping;
}
export type PineconeConnectionString = string;
export type PineconeNamespace = string;
export interface PineconeFieldMapping {
  textField: string;
  metadataField: string;
}
export interface PineconeConfiguration {
  connectionString: string;
  credentialsSecretArn: string;
  namespace?: string;
  fieldMapping: PineconeFieldMapping;
}
export type RedisEnterpriseCloudEndpoint = string;
export type RedisEnterpriseCloudIndexName = string;
export interface RedisEnterpriseCloudFieldMapping {
  vectorField: string;
  textField: string;
  metadataField: string;
}
export interface RedisEnterpriseCloudConfiguration {
  endpoint: string;
  vectorIndexName: string;
  credentialsSecretArn: string;
  fieldMapping: RedisEnterpriseCloudFieldMapping;
}
export type RdsArn = string;
export type RdsDatabaseName = string;
export type RdsTableName = string;
export type ColumnName = string;
export interface RdsFieldMapping {
  primaryKeyField: string;
  vectorField: string;
  textField: string;
  metadataField: string;
  customMetadataField?: string;
}
export interface RdsConfiguration {
  resourceArn: string;
  credentialsSecretArn: string;
  databaseName: string;
  tableName: string;
  fieldMapping: RdsFieldMapping;
}
export type MongoDbAtlasEndpoint = string;
export type MongoDbAtlasDatabaseName = string;
export type MongoDbAtlasCollectionName = string;
export type MongoDbAtlasIndexName = string;
export interface MongoDbAtlasFieldMapping {
  vectorField: string;
  textField: string;
  metadataField: string;
}
export type MongoDbAtlasEndpointServiceName = string;
export interface MongoDbAtlasConfiguration {
  endpoint: string;
  databaseName: string;
  collectionName: string;
  vectorIndexName: string;
  credentialsSecretArn: string;
  fieldMapping: MongoDbAtlasFieldMapping;
  endpointServiceName?: string;
  textIndexName?: string;
}
export type GraphArn = string | redacted.Redacted<string>;
export interface NeptuneAnalyticsFieldMapping {
  textField: string;
  metadataField: string;
}
export interface NeptuneAnalyticsConfiguration {
  graphArn: string | redacted.Redacted<string>;
  fieldMapping: NeptuneAnalyticsFieldMapping;
}
export type VectorBucketArn = string | redacted.Redacted<string>;
export type IndexArn = string | redacted.Redacted<string>;
export type IndexName = string | redacted.Redacted<string>;
export interface S3VectorsConfiguration {
  vectorBucketArn?: string | redacted.Redacted<string>;
  indexArn?: string | redacted.Redacted<string>;
  indexName?: string | redacted.Redacted<string>;
}
export interface StorageConfiguration {
  type: KnowledgeBaseStorageType;
  opensearchServerlessConfiguration?: OpenSearchServerlessConfiguration;
  opensearchManagedClusterConfiguration?: OpenSearchManagedClusterConfiguration;
  pineconeConfiguration?: PineconeConfiguration;
  redisEnterpriseCloudConfiguration?: RedisEnterpriseCloudConfiguration;
  rdsConfiguration?: RdsConfiguration;
  mongoDbAtlasConfiguration?: MongoDbAtlasConfiguration;
  neptuneAnalyticsConfiguration?: NeptuneAnalyticsConfiguration;
  s3VectorsConfiguration?: S3VectorsConfiguration;
}
export interface CreateKnowledgeBaseRequest {
  clientToken?: string;
  name: string;
  description?: string;
  roleArn: string;
  knowledgeBaseConfiguration: KnowledgeBaseConfiguration;
  storageConfiguration?: StorageConfiguration;
  tags?: { [key: string]: string | undefined };
}
export type KnowledgeBaseArn = string;
export type KnowledgeBaseStatus =
  | "CREATING"
  | "ACTIVE"
  | "DELETING"
  | "UPDATING"
  | "FAILED"
  | "DELETE_UNSUCCESSFUL"
  | "UPDATE_UNSUCCESSFUL"
  | (string & {});
export interface KnowledgeBase {
  knowledgeBaseId: string;
  name: string;
  knowledgeBaseArn: string;
  description?: string;
  roleArn: string;
  knowledgeBaseConfiguration: KnowledgeBaseConfiguration;
  storageConfiguration?: StorageConfiguration;
  status: KnowledgeBaseStatus;
  createdAt: Date;
  updatedAt: Date;
  failureReasons?: string[];
}
export interface CreateKnowledgeBaseResponse {
  knowledgeBase: KnowledgeBase;
}
export type PromptName = string;
export type PromptDescription = string;
export type PromptVariantName = string;
export type PromptModelIdentifier = string;
export type PromptMetadataKey = string | redacted.Redacted<string>;
export type PromptMetadataValue = string | redacted.Redacted<string>;
export interface PromptMetadataEntry {
  key: string | redacted.Redacted<string>;
  value: string | redacted.Redacted<string>;
}
export type PromptMetadataList = PromptMetadataEntry[];
export interface PromptAgentResource {
  agentIdentifier: string;
}
export type PromptGenAiResource = { agent: PromptAgentResource };
export interface PromptVariant {
  name: string;
  templateType: PromptTemplateType;
  templateConfiguration: PromptTemplateConfiguration;
  modelId?: string;
  inferenceConfiguration?: PromptInferenceConfiguration;
  metadata?: PromptMetadataEntry[];
  additionalModelRequestFields?: any;
  genAiResource?: PromptGenAiResource;
}
export type PromptVariantList = PromptVariant[];
export interface CreatePromptRequest {
  name: string;
  description?: string;
  customerEncryptionKeyArn?: string;
  defaultVariant?: string;
  variants?: PromptVariant[];
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type PromptId = string;
export type PromptArn = string;
export interface CreatePromptResponse {
  name: string;
  description?: string;
  customerEncryptionKeyArn?: string;
  defaultVariant?: string;
  variants?: PromptVariant[];
  id: string;
  arn: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
}
export type PromptIdentifier = string;
export interface CreatePromptVersionRequest {
  promptIdentifier: string;
  description?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreatePromptVersionResponse {
  name: string;
  description?: string;
  customerEncryptionKeyArn?: string;
  defaultVariant?: string;
  variants?: PromptVariant[];
  id: string;
  arn: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
}
export type VpcId = string;
export type SubnetId = string;
export type SubnetIdList = string[];
export type ResourceTarget = string;
export type Port = number;
export type VpcProtocol = "HTTP" | "HTTPS" | (string & {});
export type VpcResolutionMode = "PUBLIC" | "IN_VPC" | (string & {});
export type HostHeader = string;
export type TlsServerName = string;
export type VpcConfigurationName = string;
export type VpcConfigurationDescription = string;
export interface CreateVpcConfigurationRequest {
  knowledgeBaseId: string;
  clientToken?: string;
  vpcId: string;
  subnetIds: string[];
  resourceTarget: string;
  port: number;
  protocol: VpcProtocol;
  resolutionMode: VpcResolutionMode;
  hostHeader?: string;
  tlsServerName?: string;
  name?: string;
  description?: string;
}
export type VpcConfigurationId = string;
export type VpcConfigurationStatus =
  | "CREATING"
  | "CREATED"
  | "DELETING"
  | "CREATE_FAILED"
  | "DELETE_FAILED"
  | (string & {});
export interface CreateVpcConfigurationResponse {
  vpcConfigurationId: string;
  status: VpcConfigurationStatus;
}
export interface DeleteAgentRequest {
  agentId: string;
  skipResourceInUseCheck?: boolean;
}
export interface DeleteAgentResponse {
  agentId: string;
  agentStatus: AgentStatus;
}
export interface DeleteAgentActionGroupRequest {
  agentId: string;
  agentVersion: string;
  actionGroupId: string;
  skipResourceInUseCheck?: boolean;
}
export interface DeleteAgentActionGroupResponse {}
export interface DeleteAgentAliasRequest {
  agentId: string;
  agentAliasId: string;
}
export interface DeleteAgentAliasResponse {
  agentId: string;
  agentAliasId: string;
  agentAliasStatus: AgentAliasStatus;
}
export interface DeleteAgentVersionRequest {
  agentId: string;
  agentVersion: string;
  skipResourceInUseCheck?: boolean;
}
export interface DeleteAgentVersionResponse {
  agentId: string;
  agentVersion: string;
  agentStatus: AgentStatus;
}
export interface DeleteDataSourceRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
}
export interface DeleteDataSourceResponse {
  knowledgeBaseId: string;
  dataSourceId: string;
  status: DataSourceStatus;
}
export interface DeleteFlowRequest {
  flowIdentifier: string;
  skipResourceInUseCheck?: boolean;
}
export interface DeleteFlowResponse {
  id: string;
}
export type FlowAliasIdentifier = string;
export interface DeleteFlowAliasRequest {
  flowIdentifier: string;
  aliasIdentifier: string;
}
export interface DeleteFlowAliasResponse {
  flowId: string;
  id: string;
}
export interface DeleteFlowVersionRequest {
  flowIdentifier: string;
  flowVersion: string;
  skipResourceInUseCheck?: boolean;
}
export interface DeleteFlowVersionResponse {
  id: string;
  version: string;
}
export interface DeleteKnowledgeBaseRequest {
  knowledgeBaseId: string;
}
export interface DeleteKnowledgeBaseResponse {
  knowledgeBaseId: string;
  status: KnowledgeBaseStatus;
}
export type ContentDataSourceType = "CUSTOM" | "S3" | (string & {});
export interface CustomDocumentIdentifier {
  id: string;
}
export interface DocumentIdentifier {
  dataSourceType: ContentDataSourceType;
  s3?: S3Location;
  custom?: CustomDocumentIdentifier;
}
export type DocumentIdentifiers = DocumentIdentifier[];
export interface DeleteKnowledgeBaseDocumentsRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
  clientToken?: string;
  documentIdentifiers: DocumentIdentifier[];
}
export type DocumentStatus =
  | "INDEXED"
  | "PARTIALLY_INDEXED"
  | "PENDING"
  | "FAILED"
  | "METADATA_PARTIALLY_INDEXED"
  | "METADATA_UPDATE_FAILED"
  | "IGNORED"
  | "NOT_FOUND"
  | "STARTING"
  | "IN_PROGRESS"
  | "DELETING"
  | "DELETE_IN_PROGRESS"
  | (string & {});
export interface KnowledgeBaseDocumentDetail {
  knowledgeBaseId: string;
  dataSourceId: string;
  status: DocumentStatus;
  identifier: DocumentIdentifier;
  statusReason?: string;
  updatedAt?: Date;
}
export type KnowledgeBaseDocumentDetails = KnowledgeBaseDocumentDetail[];
export interface DeleteKnowledgeBaseDocumentsResponse {
  documentDetails?: KnowledgeBaseDocumentDetail[];
}
export interface DeletePromptRequest {
  promptIdentifier: string;
  promptVersion?: string;
}
export interface DeletePromptResponse {
  id: string;
  version?: string;
}
export type ResourceArn = string;
export type RevisionId = string;
export interface DeleteResourcePolicyRequest {
  resourceArn: string;
  expectedRevisionId?: string;
}
export interface DeleteResourcePolicyResponse {
  resourceArn: string;
  revisionId?: string;
}
export interface DeleteVpcConfigurationRequest {
  knowledgeBaseId: string;
  vpcConfigurationId: string;
}
export interface DeleteVpcConfigurationResponse {
  vpcConfigurationId: string;
  status: VpcConfigurationStatus;
}
export interface DisassociateAgentCollaboratorRequest {
  agentId: string;
  agentVersion: string;
  collaboratorId: string;
}
export interface DisassociateAgentCollaboratorResponse {}
export interface DisassociateAgentKnowledgeBaseRequest {
  agentId: string;
  agentVersion: string;
  knowledgeBaseId: string;
}
export interface DisassociateAgentKnowledgeBaseResponse {}
export interface GetAgentRequest {
  agentId: string;
}
export interface GetAgentResponse {
  agent: Agent;
}
export interface GetAgentActionGroupRequest {
  agentId: string;
  agentVersion: string;
  actionGroupId: string;
}
export interface GetAgentActionGroupResponse {
  agentActionGroup: AgentActionGroup;
}
export interface GetAgentAliasRequest {
  agentId: string;
  agentAliasId: string;
}
export interface GetAgentAliasResponse {
  agentAlias: AgentAlias;
}
export interface GetAgentCollaboratorRequest {
  agentId: string;
  agentVersion: string;
  collaboratorId: string;
}
export interface GetAgentCollaboratorResponse {
  agentCollaborator: AgentCollaborator;
}
export interface GetAgentKnowledgeBaseRequest {
  agentId: string;
  agentVersion: string;
  knowledgeBaseId: string;
}
export interface GetAgentKnowledgeBaseResponse {
  agentKnowledgeBase: AgentKnowledgeBase;
}
export interface GetAgentVersionRequest {
  agentId: string;
  agentVersion: string;
}
export interface AgentVersion {
  agentId: string;
  agentName: string;
  agentArn: string;
  version: string;
  instruction?: string | redacted.Redacted<string>;
  agentStatus: AgentStatus;
  foundationModel?: string;
  description?: string;
  idleSessionTTLInSeconds: number;
  agentResourceRoleArn: string;
  customerEncryptionKeyArn?: string;
  createdAt: Date;
  updatedAt: Date;
  failureReasons?: string[];
  recommendedActions?: string[];
  promptOverrideConfiguration?: PromptOverrideConfiguration;
  guardrailConfiguration?: GuardrailConfiguration;
  memoryConfiguration?: MemoryConfiguration;
  agentCollaboration?: AgentCollaboration;
}
export interface GetAgentVersionResponse {
  agentVersion: AgentVersion;
}
export interface GetDataSourceRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
}
export interface GetDataSourceResponse {
  dataSource: DataSource;
}
export type IncludedData = "ALL_DATA" | "METADATA_ONLY" | (string & {});
export interface GetFlowRequest {
  flowIdentifier: string;
  includedData?: IncludedData;
}
export type NonBlankString = string;
export type FlowValidationSeverity = "Warning" | "Error" | (string & {});
export interface CyclicConnectionFlowValidationDetails {
  connection: string;
}
export interface DuplicateConnectionsFlowValidationDetails {
  source: string;
  target: string;
}
export interface DuplicateConditionExpressionFlowValidationDetails {
  node: string;
  expression: string | redacted.Redacted<string>;
}
export interface UnreachableNodeFlowValidationDetails {
  node: string;
}
export interface UnknownConnectionSourceFlowValidationDetails {
  connection: string;
}
export interface UnknownConnectionSourceOutputFlowValidationDetails {
  connection: string;
}
export interface UnknownConnectionTargetFlowValidationDetails {
  connection: string;
}
export interface UnknownConnectionTargetInputFlowValidationDetails {
  connection: string;
}
export interface UnknownConnectionConditionFlowValidationDetails {
  connection: string;
}
export type ErrorMessage = string;
export interface MalformedConditionExpressionFlowValidationDetails {
  node: string;
  condition: string;
  cause: string;
}
export interface MalformedNodeInputExpressionFlowValidationDetails {
  node: string;
  input: string;
  cause: string;
}
export interface MismatchedNodeInputTypeFlowValidationDetails {
  node: string;
  input: string;
  expectedType: FlowNodeIODataType;
}
export interface MismatchedNodeOutputTypeFlowValidationDetails {
  node: string;
  output: string;
  expectedType: FlowNodeIODataType;
}
export interface IncompatibleConnectionDataTypeFlowValidationDetails {
  connection: string;
}
export interface MissingConnectionConfigurationFlowValidationDetails {
  connection: string;
}
export interface MissingDefaultConditionFlowValidationDetails {
  node: string;
}
export interface MissingEndingNodesFlowValidationDetails {}
export interface MissingNodeConfigurationFlowValidationDetails {
  node: string;
}
export interface MissingNodeInputFlowValidationDetails {
  node: string;
  input: string;
}
export interface MissingNodeOutputFlowValidationDetails {
  node: string;
  output: string;
}
export interface MissingStartingNodesFlowValidationDetails {}
export interface MultipleNodeInputConnectionsFlowValidationDetails {
  node: string;
  input: string;
}
export interface UnfulfilledNodeInputFlowValidationDetails {
  node: string;
  input: string;
}
export interface UnsatisfiedConnectionConditionsFlowValidationDetails {
  connection: string;
}
export interface UnspecifiedFlowValidationDetails {}
export interface UnknownNodeInputFlowValidationDetails {
  node: string;
  input: string;
}
export interface UnknownNodeOutputFlowValidationDetails {
  node: string;
  output: string;
}
export interface MissingLoopInputNodeFlowValidationDetails {
  loopNode: string;
}
export interface MissingLoopControllerNodeFlowValidationDetails {
  loopNode: string;
}
export interface MultipleLoopInputNodesFlowValidationDetails {
  loopNode: string;
}
export interface MultipleLoopControllerNodesFlowValidationDetails {
  loopNode: string;
}
export type IncompatibleLoopNodeType =
  | "Input"
  | "Condition"
  | "Iterator"
  | "Collector"
  | (string & {});
export interface LoopIncompatibleNodeTypeFlowValidationDetails {
  node: string;
  incompatibleNodeType: IncompatibleLoopNodeType;
  incompatibleNodeName: string;
}
export interface InvalidLoopBoundaryFlowValidationDetails {
  connection: string;
  source: string;
  target: string;
}
export type FlowValidationDetails =
  | {
      cyclicConnection: CyclicConnectionFlowValidationDetails;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections: DuplicateConnectionsFlowValidationDetails;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression: DuplicateConditionExpressionFlowValidationDetails;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode: UnreachableNodeFlowValidationDetails;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource: UnknownConnectionSourceFlowValidationDetails;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput: UnknownConnectionSourceOutputFlowValidationDetails;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget: UnknownConnectionTargetFlowValidationDetails;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput: UnknownConnectionTargetInputFlowValidationDetails;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition: UnknownConnectionConditionFlowValidationDetails;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression: MalformedConditionExpressionFlowValidationDetails;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression: MalformedNodeInputExpressionFlowValidationDetails;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType: MismatchedNodeInputTypeFlowValidationDetails;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType: MismatchedNodeOutputTypeFlowValidationDetails;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType: IncompatibleConnectionDataTypeFlowValidationDetails;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration: MissingConnectionConfigurationFlowValidationDetails;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition: MissingDefaultConditionFlowValidationDetails;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes: MissingEndingNodesFlowValidationDetails;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration: MissingNodeConfigurationFlowValidationDetails;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput: MissingNodeInputFlowValidationDetails;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput: MissingNodeOutputFlowValidationDetails;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes: MissingStartingNodesFlowValidationDetails;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections: MultipleNodeInputConnectionsFlowValidationDetails;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput: UnfulfilledNodeInputFlowValidationDetails;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions: UnsatisfiedConnectionConditionsFlowValidationDetails;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified: UnspecifiedFlowValidationDetails;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput: UnknownNodeInputFlowValidationDetails;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput: UnknownNodeOutputFlowValidationDetails;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode: MissingLoopInputNodeFlowValidationDetails;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode: MissingLoopControllerNodeFlowValidationDetails;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes: MultipleLoopInputNodesFlowValidationDetails;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes: MultipleLoopControllerNodesFlowValidationDetails;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType: LoopIncompatibleNodeTypeFlowValidationDetails;
      invalidLoopBoundary?: never;
    }
  | {
      cyclicConnection?: never;
      duplicateConnections?: never;
      duplicateConditionExpression?: never;
      unreachableNode?: never;
      unknownConnectionSource?: never;
      unknownConnectionSourceOutput?: never;
      unknownConnectionTarget?: never;
      unknownConnectionTargetInput?: never;
      unknownConnectionCondition?: never;
      malformedConditionExpression?: never;
      malformedNodeInputExpression?: never;
      mismatchedNodeInputType?: never;
      mismatchedNodeOutputType?: never;
      incompatibleConnectionDataType?: never;
      missingConnectionConfiguration?: never;
      missingDefaultCondition?: never;
      missingEndingNodes?: never;
      missingNodeConfiguration?: never;
      missingNodeInput?: never;
      missingNodeOutput?: never;
      missingStartingNodes?: never;
      multipleNodeInputConnections?: never;
      unfulfilledNodeInput?: never;
      unsatisfiedConnectionConditions?: never;
      unspecified?: never;
      unknownNodeInput?: never;
      unknownNodeOutput?: never;
      missingLoopInputNode?: never;
      missingLoopControllerNode?: never;
      multipleLoopInputNodes?: never;
      multipleLoopControllerNodes?: never;
      loopIncompatibleNodeType?: never;
      invalidLoopBoundary: InvalidLoopBoundaryFlowValidationDetails;
    };
export type FlowValidationType =
  | "CyclicConnection"
  | "DuplicateConnections"
  | "DuplicateConditionExpression"
  | "UnreachableNode"
  | "UnknownConnectionSource"
  | "UnknownConnectionSourceOutput"
  | "UnknownConnectionTarget"
  | "UnknownConnectionTargetInput"
  | "UnknownConnectionCondition"
  | "MalformedConditionExpression"
  | "MalformedNodeInputExpression"
  | "MismatchedNodeInputType"
  | "MismatchedNodeOutputType"
  | "IncompatibleConnectionDataType"
  | "MissingConnectionConfiguration"
  | "MissingDefaultCondition"
  | "MissingEndingNodes"
  | "MissingNodeConfiguration"
  | "MissingNodeInput"
  | "MissingNodeOutput"
  | "MissingStartingNodes"
  | "MultipleNodeInputConnections"
  | "UnfulfilledNodeInput"
  | "UnsatisfiedConnectionConditions"
  | "Unspecified"
  | "UnknownNodeInput"
  | "UnknownNodeOutput"
  | "MissingLoopInputNode"
  | "MissingLoopControllerNode"
  | "MultipleLoopInputNodes"
  | "MultipleLoopControllerNodes"
  | "LoopIncompatibleNodeType"
  | "InvalidLoopBoundary"
  | (string & {});
export interface FlowValidation {
  message: string;
  severity: FlowValidationSeverity;
  details?: FlowValidationDetails;
  type?: FlowValidationType;
}
export type FlowValidations = FlowValidation[];
export interface GetFlowResponse {
  name: string;
  description?: string;
  executionRoleArn: string;
  customerEncryptionKeyArn?: string;
  id: string;
  arn: string;
  status: FlowStatus;
  createdAt: Date;
  updatedAt: Date;
  version: string;
  definition?: FlowDefinition;
  validations?: FlowValidation[];
}
export interface GetFlowAliasRequest {
  flowIdentifier: string;
  aliasIdentifier: string;
}
export interface GetFlowAliasResponse {
  name: string;
  description?: string;
  routingConfiguration: FlowAliasRoutingConfigurationListItem[];
  concurrencyConfiguration?: FlowAliasConcurrencyConfiguration;
  flowId: string;
  id: string;
  arn: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface GetFlowVersionRequest {
  flowIdentifier: string;
  flowVersion: string;
  includedData?: IncludedData;
}
export interface GetFlowVersionResponse {
  name: string;
  description?: string;
  executionRoleArn: string;
  customerEncryptionKeyArn?: string;
  id: string;
  arn: string;
  status: FlowStatus;
  createdAt: Date;
  version: string;
  definition?: FlowDefinition;
}
export interface GetIngestionJobRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
  ingestionJobId: string;
}
export type IngestionJobStatus =
  | "STARTING"
  | "IN_PROGRESS"
  | "COMPLETE"
  | "FAILED"
  | "STOPPING"
  | "STOPPED"
  | (string & {});
export interface IngestionJobStatistics {
  numberOfDocumentsScanned?: number;
  numberOfMetadataDocumentsScanned?: number;
  numberOfNewDocumentsIndexed?: number;
  numberOfModifiedDocumentsIndexed?: number;
  numberOfMetadataDocumentsModified?: number;
  numberOfDocumentsDeleted?: number;
  numberOfDocumentsFailed?: number;
  numberOfDocumentsSkipped?: number;
}
export interface IngestionJob {
  knowledgeBaseId: string;
  dataSourceId: string;
  ingestionJobId: string;
  description?: string;
  status: IngestionJobStatus;
  statistics?: IngestionJobStatistics;
  failureReasons?: string[];
  startedAt: Date;
  updatedAt: Date;
  textReadyAt?: Date;
}
export interface GetIngestionJobResponse {
  ingestionJob: IngestionJob;
}
export interface GetKnowledgeBaseRequest {
  knowledgeBaseId: string;
}
export interface GetKnowledgeBaseResponse {
  knowledgeBase: KnowledgeBase;
}
export interface GetKnowledgeBaseDocumentsRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
  documentIdentifiers: DocumentIdentifier[];
}
export interface GetKnowledgeBaseDocumentsResponse {
  documentDetails?: KnowledgeBaseDocumentDetail[];
}
export interface GetPromptRequest {
  promptIdentifier: string;
  promptVersion?: string;
  includedData?: IncludedData;
}
export interface GetPromptResponse {
  name: string;
  description?: string;
  customerEncryptionKeyArn?: string;
  defaultVariant?: string;
  variants?: PromptVariant[];
  id: string;
  arn: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface GetResourcePolicyRequest {
  resourceArn: string;
}
export type ResourcePolicy = string;
export interface GetResourcePolicyResponse {
  resourceArn: string;
  policy: string;
  revisionId: string;
}
export interface GetVpcConfigurationRequest {
  knowledgeBaseId: string;
  vpcConfigurationId: string;
}
export type VpcConfigurationStatusMessage = string;
export interface VpcConfiguration {
  vpcConfigurationId: string;
  status: VpcConfigurationStatus;
  statusMessage?: string;
  vpcId: string;
  subnetIds: string[];
  resourceTarget: string;
  port: number;
  protocol: VpcProtocol;
  resolutionMode: VpcResolutionMode;
  hostHeader?: string;
  tlsServerName?: string;
  name?: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface GetVpcConfigurationResponse {
  vpcConfiguration: VpcConfiguration;
}
export type MetadataSourceType = "IN_LINE_ATTRIBUTE" | "S3_LOCATION" | (string & {});
export type Key = string | redacted.Redacted<string>;
export type MetadataValueType = "BOOLEAN" | "NUMBER" | "STRING" | "STRING_LIST" | (string & {});
export type NumberValue = number;
export type StringValue = string | redacted.Redacted<string>;
export type StringListValue = (string | redacted.Redacted<string>)[];
export interface MetadataAttributeValue {
  type: MetadataValueType;
  numberValue?: number;
  booleanValue?: boolean;
  stringValue?: string | redacted.Redacted<string>;
  stringListValue?: (string | redacted.Redacted<string>)[];
}
export interface MetadataAttribute {
  key: string | redacted.Redacted<string>;
  value: MetadataAttributeValue;
}
export type MetadataAttributes = MetadataAttribute[];
export type S3ObjectUri = string;
export interface CustomS3Location {
  uri: string;
  bucketOwnerAccountId?: string;
}
export type AccessControlPrincipalType = "USER" | (string & {});
export type AccessControlAccess = "ALLOW" | "DENY" | (string & {});
export interface DocumentAccessControlEntry {
  name: string;
  type: AccessControlPrincipalType;
  access: AccessControlAccess;
}
export type DocumentAccessControlList = DocumentAccessControlEntry[];
export interface DocumentMetadata {
  type: MetadataSourceType;
  inlineAttributes?: MetadataAttribute[];
  s3Location?: CustomS3Location;
  accessControlList?: DocumentAccessControlEntry[];
}
export type CustomSourceType = "IN_LINE" | "S3_LOCATION" | (string & {});
export type InlineContentType = "BYTE" | "TEXT" | (string & {});
export type ByteContentBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface ByteContentDoc {
  mimeType: string;
  data: Uint8Array | redacted.Redacted<Uint8Array>;
}
export type Data = string | redacted.Redacted<string>;
export interface TextContentDoc {
  data: string | redacted.Redacted<string>;
}
export interface InlineContent {
  type: InlineContentType;
  byteContent?: ByteContentDoc;
  textContent?: TextContentDoc;
}
export interface CustomContent {
  customDocumentIdentifier: CustomDocumentIdentifier;
  sourceType: CustomSourceType;
  s3Location?: CustomS3Location;
  inlineContent?: InlineContent;
}
export interface S3Content {
  s3Location: S3Location;
}
export interface DocumentContent {
  dataSourceType: ContentDataSourceType;
  custom?: CustomContent;
  s3?: S3Content;
}
export interface KnowledgeBaseDocument {
  metadata?: DocumentMetadata;
  content: DocumentContent;
}
export type KnowledgeBaseDocuments = KnowledgeBaseDocument[];
export interface IngestKnowledgeBaseDocumentsRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
  clientToken?: string;
  documents: KnowledgeBaseDocument[];
}
export interface IngestKnowledgeBaseDocumentsResponse {
  documentDetails?: KnowledgeBaseDocumentDetail[];
}
export type MaxResults = number;
export type NextToken = string;
export interface ListAgentActionGroupsRequest {
  agentId: string;
  agentVersion: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ActionGroupSummary {
  actionGroupId: string;
  actionGroupName: string;
  actionGroupState: ActionGroupState;
  description?: string;
  updatedAt: Date;
}
export type ActionGroupSummaries = ActionGroupSummary[];
export interface ListAgentActionGroupsResponse {
  actionGroupSummaries: ActionGroupSummary[];
  nextToken?: string;
}
export interface ListAgentAliasesRequest {
  agentId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface AgentAliasSummary {
  agentAliasId: string;
  agentAliasName: string;
  description?: string;
  routingConfiguration?: AgentAliasRoutingConfigurationListItem[];
  agentAliasStatus: AgentAliasStatus;
  createdAt: Date;
  updatedAt: Date;
  aliasInvocationState?: AliasInvocationState;
}
export type AgentAliasSummaries = AgentAliasSummary[];
export interface ListAgentAliasesResponse {
  agentAliasSummaries: AgentAliasSummary[];
  nextToken?: string;
}
export interface ListAgentCollaboratorsRequest {
  agentId: string;
  agentVersion: string;
  maxResults?: number;
  nextToken?: string;
}
export interface AgentCollaboratorSummary {
  agentId: string;
  agentVersion: string;
  collaboratorId: string;
  agentDescriptor: AgentDescriptor;
  collaborationInstruction: string | redacted.Redacted<string>;
  relayConversationHistory: RelayConversationHistory;
  collaboratorName: string;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export type AgentCollaboratorSummaries = AgentCollaboratorSummary[];
export interface ListAgentCollaboratorsResponse {
  agentCollaboratorSummaries: AgentCollaboratorSummary[];
  nextToken?: string;
}
export interface ListAgentKnowledgeBasesRequest {
  agentId: string;
  agentVersion: string;
  maxResults?: number;
  nextToken?: string;
}
export interface AgentKnowledgeBaseSummary {
  knowledgeBaseId: string;
  description?: string;
  knowledgeBaseState: KnowledgeBaseState;
  updatedAt: Date;
}
export type AgentKnowledgeBaseSummaries = AgentKnowledgeBaseSummary[];
export interface ListAgentKnowledgeBasesResponse {
  agentKnowledgeBaseSummaries: AgentKnowledgeBaseSummary[];
  nextToken?: string;
}
export interface ListAgentsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface AgentSummary {
  agentId: string;
  agentName: string;
  agentStatus: AgentStatus;
  description?: string;
  updatedAt: Date;
  latestAgentVersion?: string;
  guardrailConfiguration?: GuardrailConfiguration;
}
export type AgentSummaries = AgentSummary[];
export interface ListAgentsResponse {
  agentSummaries: AgentSummary[];
  nextToken?: string;
}
export interface ListAgentVersionsRequest {
  agentId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface AgentVersionSummary {
  agentName: string;
  agentStatus: AgentStatus;
  agentVersion: string;
  createdAt: Date;
  updatedAt: Date;
  description?: string;
  guardrailConfiguration?: GuardrailConfiguration;
}
export type AgentVersionSummaries = AgentVersionSummary[];
export interface ListAgentVersionsResponse {
  agentVersionSummaries: AgentVersionSummary[];
  nextToken?: string;
}
export interface ListDataSourcesRequest {
  knowledgeBaseId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface DataSourceSummary {
  knowledgeBaseId: string;
  dataSourceId: string;
  name: string;
  status: DataSourceStatus;
  description?: string;
  updatedAt: Date;
}
export type DataSourceSummaries = DataSourceSummary[];
export interface ListDataSourcesResponse {
  dataSourceSummaries: DataSourceSummary[];
  nextToken?: string;
}
export interface ListFlowAliasesRequest {
  flowIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface FlowAliasSummary {
  name: string;
  description?: string;
  routingConfiguration: FlowAliasRoutingConfigurationListItem[];
  concurrencyConfiguration?: FlowAliasConcurrencyConfiguration;
  flowId: string;
  id: string;
  arn: string;
  createdAt: Date;
  updatedAt: Date;
}
export type FlowAliasSummaries = FlowAliasSummary[];
export interface ListFlowAliasesResponse {
  flowAliasSummaries: FlowAliasSummary[];
  nextToken?: string;
}
export interface ListFlowsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface FlowSummary {
  name: string;
  description?: string;
  id: string;
  arn: string;
  status: FlowStatus;
  createdAt: Date;
  updatedAt: Date;
  version: string;
}
export type FlowSummaries = FlowSummary[];
export interface ListFlowsResponse {
  flowSummaries: FlowSummary[];
  nextToken?: string;
}
export interface ListFlowVersionsRequest {
  flowIdentifier: string;
  maxResults?: number;
  nextToken?: string;
}
export interface FlowVersionSummary {
  id: string;
  arn: string;
  status: FlowStatus;
  createdAt: Date;
  version: string;
}
export type FlowVersionSummaries = FlowVersionSummary[];
export interface ListFlowVersionsResponse {
  flowVersionSummaries: FlowVersionSummary[];
  nextToken?: string;
}
export type IngestionJobFilterAttribute = "STATUS" | (string & {});
export type IngestionJobFilterOperator = "EQ" | (string & {});
export type IngestionJobFilterValue = string;
export type IngestionJobFilterValues = string[];
export interface IngestionJobFilter {
  attribute: IngestionJobFilterAttribute;
  operator: IngestionJobFilterOperator;
  values: string[];
}
export type IngestionJobFilters = IngestionJobFilter[];
export type IngestionJobSortByAttribute = "STATUS" | "STARTED_AT" | (string & {});
export type SortOrder = "ASCENDING" | "DESCENDING" | (string & {});
export interface IngestionJobSortBy {
  attribute: IngestionJobSortByAttribute;
  order: SortOrder;
}
export interface ListIngestionJobsRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
  filters?: IngestionJobFilter[];
  sortBy?: IngestionJobSortBy;
  maxResults?: number;
  nextToken?: string;
}
export interface IngestionJobSummary {
  knowledgeBaseId: string;
  dataSourceId: string;
  ingestionJobId: string;
  description?: string;
  status: IngestionJobStatus;
  startedAt: Date;
  updatedAt: Date;
  textReadyAt?: Date;
  statistics?: IngestionJobStatistics;
}
export type IngestionJobSummaries = IngestionJobSummary[];
export interface ListIngestionJobsResponse {
  ingestionJobSummaries: IngestionJobSummary[];
  nextToken?: string;
}
export interface ListKnowledgeBaseDocumentsRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ListKnowledgeBaseDocumentsResponse {
  documentDetails: KnowledgeBaseDocumentDetail[];
  nextToken?: string;
}
export interface ListKnowledgeBasesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface KnowledgeBaseSummary {
  knowledgeBaseId: string;
  name: string;
  description?: string;
  status: KnowledgeBaseStatus;
  updatedAt: Date;
}
export type KnowledgeBaseSummaries = KnowledgeBaseSummary[];
export interface ListKnowledgeBasesResponse {
  knowledgeBaseSummaries: KnowledgeBaseSummary[];
  nextToken?: string;
}
export interface ListPromptsRequest {
  promptIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface PromptSummary {
  name: string;
  description?: string;
  id: string;
  arn: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
}
export type PromptSummaries = PromptSummary[];
export interface ListPromptsResponse {
  promptSummaries: PromptSummary[];
  nextToken?: string;
}
export type TaggableResourcesArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface ListVpcConfigurationsRequest {
  knowledgeBaseId: string;
  statusFilter?: VpcConfigurationStatus;
  maxResults?: number;
  nextToken?: string;
}
export interface VpcConfigurationSummary {
  vpcConfigurationId: string;
  status: VpcConfigurationStatus;
  statusMessage?: string;
  vpcId: string;
  resourceTarget: string;
  port: number;
  protocol: VpcProtocol;
  resolutionMode: VpcResolutionMode;
  hostHeader?: string;
  tlsServerName?: string;
  name?: string;
  description?: string;
  createdAt: Date;
}
export type VpcConfigurationSummaryList = VpcConfigurationSummary[];
export interface ListVpcConfigurationsResponse {
  items: VpcConfigurationSummary[];
  nextToken?: string;
}
export interface PrepareAgentRequest {
  agentId: string;
}
export interface PrepareAgentResponse {
  agentId: string;
  agentStatus: AgentStatus;
  agentVersion: string;
  preparedAt: Date;
}
export interface PrepareFlowRequest {
  flowIdentifier: string;
}
export interface PrepareFlowResponse {
  id: string;
  status: FlowStatus;
}
export interface PutResourcePolicyRequest {
  resourceArn: string;
  policy: string;
  expectedRevisionId?: string;
}
export interface PutResourcePolicyResponse {
  resourceArn: string;
  revisionId: string;
}
export interface StartIngestionJobRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
  clientToken?: string;
  description?: string;
}
export interface StartIngestionJobResponse {
  ingestionJob: IngestionJob;
}
export interface StopIngestionJobRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
  ingestionJobId: string;
}
export interface StopIngestionJobResponse {
  ingestionJob: IngestionJob;
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
export interface UpdateAgentRequest {
  agentId: string;
  agentName: string;
  instruction?: string | redacted.Redacted<string>;
  foundationModel?: string;
  description?: string;
  orchestrationType?: OrchestrationType;
  customOrchestration?: CustomOrchestration;
  idleSessionTTLInSeconds?: number;
  agentResourceRoleArn: string;
  customerEncryptionKeyArn?: string;
  promptOverrideConfiguration?: PromptOverrideConfiguration;
  guardrailConfiguration?: GuardrailConfiguration;
  memoryConfiguration?: MemoryConfiguration;
  agentCollaboration?: AgentCollaboration;
}
export interface UpdateAgentResponse {
  agent: Agent;
}
export interface UpdateAgentActionGroupRequest {
  agentId: string;
  agentVersion: string;
  actionGroupId: string;
  actionGroupName: string;
  description?: string;
  parentActionGroupSignature?: ActionGroupSignature;
  parentActionGroupSignatureParams?: { [key: string]: string | undefined };
  actionGroupExecutor?: ActionGroupExecutor;
  actionGroupState?: ActionGroupState;
  apiSchema?: APISchema;
  functionSchema?: FunctionSchema;
}
export interface UpdateAgentActionGroupResponse {
  agentActionGroup: AgentActionGroup;
}
export interface UpdateAgentAliasRequest {
  agentId: string;
  agentAliasId: string;
  agentAliasName: string;
  description?: string;
  routingConfiguration?: AgentAliasRoutingConfigurationListItem[];
  aliasInvocationState?: AliasInvocationState;
}
export interface UpdateAgentAliasResponse {
  agentAlias: AgentAlias;
}
export interface UpdateAgentCollaboratorRequest {
  agentId: string;
  agentVersion: string;
  collaboratorId: string;
  agentDescriptor: AgentDescriptor;
  collaboratorName: string;
  collaborationInstruction: string | redacted.Redacted<string>;
  relayConversationHistory?: RelayConversationHistory;
}
export interface UpdateAgentCollaboratorResponse {
  agentCollaborator: AgentCollaborator;
}
export interface UpdateAgentKnowledgeBaseRequest {
  agentId: string;
  agentVersion: string;
  knowledgeBaseId: string;
  description?: string;
  knowledgeBaseState?: KnowledgeBaseState;
}
export interface UpdateAgentKnowledgeBaseResponse {
  agentKnowledgeBase: AgentKnowledgeBase;
}
export interface UpdateDataSourceRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
  name: string;
  description?: string;
  dataSourceConfiguration: DataSourceConfiguration;
  dataDeletionPolicy?: DataDeletionPolicy;
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  vectorIngestionConfiguration?: VectorIngestionConfiguration;
}
export interface UpdateDataSourceResponse {
  dataSource: DataSource;
}
export interface UpdateFlowRequest {
  name: string;
  description?: string;
  executionRoleArn: string;
  customerEncryptionKeyArn?: string;
  definition?: FlowDefinition;
  flowIdentifier: string;
}
export interface UpdateFlowResponse {
  name: string;
  description?: string;
  executionRoleArn: string;
  customerEncryptionKeyArn?: string;
  id: string;
  arn: string;
  status: FlowStatus;
  createdAt: Date;
  updatedAt: Date;
  version: string;
  definition?: FlowDefinition;
}
export interface UpdateFlowAliasRequest {
  name: string;
  description?: string;
  routingConfiguration: FlowAliasRoutingConfigurationListItem[];
  concurrencyConfiguration?: FlowAliasConcurrencyConfiguration;
  flowIdentifier: string;
  aliasIdentifier: string;
}
export interface UpdateFlowAliasResponse {
  name: string;
  description?: string;
  routingConfiguration: FlowAliasRoutingConfigurationListItem[];
  concurrencyConfiguration?: FlowAliasConcurrencyConfiguration;
  flowId: string;
  id: string;
  arn: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface UpdateKnowledgeBaseRequest {
  knowledgeBaseId: string;
  name: string;
  description?: string;
  roleArn: string;
  knowledgeBaseConfiguration: KnowledgeBaseConfiguration;
  storageConfiguration?: StorageConfiguration;
}
export interface UpdateKnowledgeBaseResponse {
  knowledgeBase: KnowledgeBase;
}
export interface UpdatePromptRequest {
  name: string;
  description?: string;
  customerEncryptionKeyArn?: string;
  defaultVariant?: string;
  variants?: PromptVariant[];
  promptIdentifier: string;
}
export interface UpdatePromptResponse {
  name: string;
  description?: string;
  customerEncryptionKeyArn?: string;
  defaultVariant?: string;
  variants?: PromptVariant[];
  id: string;
  arn: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface ValidateFlowDefinitionRequest {
  definition: FlowDefinition;
}
export interface ValidateFlowDefinitionResponse {
  validations: FlowValidation[];
}
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type AssociateAgentCollaboratorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Makes an agent a collaborator for another agent.
 */
export const associateAgentCollaborator: API.OperationMethod<
  AssociateAgentCollaboratorRequest,
  AssociateAgentCollaboratorResponse,
  AssociateAgentCollaboratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2816, __c88, 0) as any as S.Schema<AssociateAgentCollaboratorRequest>,
  output: __S(2881, __c90, 1) as any as S.Schema<AssociateAgentCollaboratorResponse>,
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
  operationName: "AssociateAgentCollaborator",
}));

export type AssociateAgentKnowledgeBaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a knowledge base with an agent. If a knowledge base is associated and its `indexState` is set to `Enabled`, the agent queries the knowledge base for information to augment its response to the user.
 */
export const associateAgentKnowledgeBase: API.OperationMethod<
  AssociateAgentKnowledgeBaseRequest,
  AssociateAgentKnowledgeBaseResponse,
  AssociateAgentKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3232, __c101, 0) as any as S.Schema<AssociateAgentKnowledgeBaseRequest>,
  output: __S(3265, __c102, 1) as any as S.Schema<AssociateAgentKnowledgeBaseResponse>,
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
  operationName: "AssociateAgentKnowledgeBase",
}));

export type CreateAgentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Bedrock Agents (now Amazon Bedrock Agents Classic) is no longer open to new customers. For capabilities similar to Bedrock Agents Classic, explore Amazon Bedrock AgentCore. Existing customers can continue to use the service as normal. For more information, see Amazon Bedrock Agents Classic availability change.
 *
 * Creates an agent that orchestrates interactions between foundation models, data sources, software applications, user conversations, and APIs to carry out tasks to help customers.
 *
 * - Specify the following fields for security purposes.
 *
 * - `agentResourceRoleArn` - The Amazon Resource Name (ARN) of the role with permissions to invoke API operations on an agent.
 *
 * - (Optional) `customerEncryptionKeyArn` - The Amazon Resource Name (ARN) of a KMS key to encrypt the creation of the agent.
 *
 * - (Optional) `idleSessionTTLinSeconds` - Specify the number of seconds for which the agent should maintain session information. After this time expires, the subsequent `InvokeAgent` request begins a new session.
 *
 * - To enable your agent to retain conversational context across multiple sessions, include a `memoryConfiguration` object. For more information, see Configure memory.
 *
 * - To override the default prompt behavior for agent orchestration and to use advanced prompts, include a `promptOverrideConfiguration` object. For more information, see Advanced prompts.
 *
 * - If your agent fails to be created, the response returns a list of `failureReasons` alongside a list of `recommendedActions` for you to troubleshoot.
 *
 * - The agent instructions will not be honored if your agent has only one knowledge base, uses default prompts, has no action group, and user input is disabled.
 */
export const createAgent: API.OperationMethod<
  CreateAgentRequest,
  CreateAgentResponse,
  CreateAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3488, __c109, 0) as any as S.Schema<CreateAgentRequest>,
  output: __S(3651, __c114, 3) as any as S.Schema<CreateAgentResponse>,
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
  operationName: "CreateAgent",
}));

export type CreateAgentActionGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an action group for an agent. An action group represents the actions that an agent can carry out for the customer by defining the APIs that an agent can call and the logic for calling them.
 *
 * To allow your agent to request the user for additional information when trying to complete a task, add an action group with the `parentActionGroupSignature` field set to `AMAZON.UserInput`.
 *
 * To allow your agent to generate, run, and troubleshoot code when trying to complete a task, add an action group with the `parentActionGroupSignature` field set to `AMAZON.CodeInterpreter`.
 *
 * You must leave the `description`, `apiSchema`, and `actionGroupExecutor` fields blank for this action group. During orchestration, if your agent determines that it needs to invoke an API in an action group, but doesn't have enough information to complete the API request, it will invoke this action group instead and return an Observation reprompting the user for more information.
 */
export const createAgentActionGroup: API.OperationMethod<
  CreateAgentActionGroupRequest,
  CreateAgentActionGroupResponse,
  CreateAgentActionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateAgentActionGroupRequest>,
  output: __S(41, __c1, 9) as any as S.Schema<CreateAgentActionGroupResponse>,
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
  operationName: "CreateAgentActionGroup",
}));

export type CreateAgentAliasError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an alias of an agent that can be used to deploy the agent.
 */
export const createAgentAlias: API.OperationMethod<
  CreateAgentAliasRequest,
  CreateAgentAliasResponse,
  CreateAgentAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c2, 0) as any as S.Schema<CreateAgentAliasRequest>,
  output: __S(131, __c4, 3) as any as S.Schema<CreateAgentAliasResponse>,
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
  operationName: "CreateAgentAlias",
}));

export type CreateDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Connects a knowledge base to a data source. You specify the configuration for the specific data source service in the `dataSourceConfiguration` field.
 *
 * You can't change the `chunkingConfiguration` after you create the data source connector.
 */
export const createDataSource: API.OperationMethod<
  CreateDataSourceRequest,
  CreateDataSourceResponse,
  CreateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c5, 0) as any as S.Schema<CreateDataSourceRequest>,
  output: __S(401, __c12, 17) as any as S.Schema<CreateDataSourceResponse>,
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
  operationName: "CreateDataSource",
}));

export type CreateFlowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a prompt flow that you can use to send an input through various steps to yield an output. Configure nodes, each of which corresponds to a step of the flow, and create connections between the nodes to create paths to different outputs. For more information, see How it works and Create a flow in Amazon Bedrock in the Amazon Bedrock User Guide.
 */
export const createFlow: API.OperationMethod<
  CreateFlowRequest,
  CreateFlowResponse,
  CreateFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c13, 0) as any as S.Schema<CreateFlowRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<CreateFlowResponse>,
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
  operationName: "CreateFlow",
}));

export type CreateFlowAliasError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an alias of a flow for deployment. For more information, see Deploy a flow in Amazon Bedrock in the Amazon Bedrock User Guide.
 */
export const createFlowAlias: API.OperationMethod<
  CreateFlowAliasRequest,
  CreateFlowAliasResponse,
  CreateFlowAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(576, __c18, 0) as any as S.Schema<CreateFlowAliasRequest>,
  output: __S(611, __c19, 3) as any as S.Schema<CreateFlowAliasResponse>,
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
  operationName: "CreateFlowAlias",
}));

export type CreateFlowVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a version of the flow that you can deploy. For more information, see Deploy a flow in Amazon Bedrock in the Amazon Bedrock User Guide.
 */
export const createFlowVersion: API.OperationMethod<
  CreateFlowVersionRequest,
  CreateFlowVersionResponse,
  CreateFlowVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c20, 0) as any as S.Schema<CreateFlowVersionRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<CreateFlowVersionResponse>,
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
  operationName: "CreateFlowVersion",
}));

export type CreateKnowledgeBaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a knowledge base. A knowledge base contains your data sources so that Large Language Models (LLMs) can use your data. To create a knowledge base, you must first set up your data sources and configure a supported vector store. For more information, see Set up a knowledge base.
 *
 * To create a managed knowledge base, provide a `managedKnowledgeBaseConfiguration` during creation. For more information, see Build a managed knowledge base.
 *
 * - Provide the `name` and an optional `description`.
 *
 * - Provide the Amazon Resource Name (ARN) with permissions to create a knowledge base in the `roleArn` field.
 *
 * - For managed knowledge bases, set `embeddingModelType` to `MANAGED` to use the service-managed embedding model, or `CUSTOM` with an `embeddingModelArn` to use your own. To use your own KMS key for encryption, provide the ARN in `serverSideEncryptionConfiguration`. No vector store configuration is required for managed knowledge bases.
 *
 * - For self-managed knowledge bases, provide the embedding model to use in the `embeddingModelArn` field in the `knowledgeBaseConfiguration` object.
 *
 * - For self-managed knowledge bases, provide the configuration for your vector store in the `storageConfiguration` object.
 *
 * - For an Amazon OpenSearch Service database, use the `opensearchServerlessConfiguration` object. For more information, see Create a vector store in Amazon OpenSearch Service.
 *
 * - For an Amazon Aurora database, use the `RdsConfiguration` object. For more information, see Create a vector store in Amazon Aurora.
 *
 * - For a Pinecone database, use the `pineconeConfiguration` object. For more information, see Create a vector store in Pinecone.
 *
 * - For a Redis Enterprise Cloud database, use the `redisEnterpriseCloudConfiguration` object. For more information, see Create a vector store in Redis Enterprise Cloud.
 */
export const createKnowledgeBase: API.OperationMethod<
  CreateKnowledgeBaseRequest,
  CreateKnowledgeBaseResponse,
  CreateKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c22, 0) as any as S.Schema<CreateKnowledgeBaseRequest>,
  output: __S(780, __c24, 12) as any as S.Schema<CreateKnowledgeBaseResponse>,
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
  operationName: "CreateKnowledgeBase",
}));

export type CreatePromptError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a prompt in your prompt library that you can add to a flow. For more information, see Prompt management in Amazon Bedrock, Create a prompt using Prompt management and Prompt flows in Amazon Bedrock in the Amazon Bedrock User Guide.
 */
export const createPrompt: API.OperationMethod<
  CreatePromptRequest,
  CreatePromptResponse,
  CreatePromptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<CreatePromptRequest>,
  output: __S(838, __c26, 6) as any as S.Schema<CreatePromptResponse>,
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
  operationName: "CreatePrompt",
}));

export type CreatePromptVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a static snapshot of your prompt that can be deployed to production. For more information, see Deploy prompts using Prompt management by creating versions in the Amazon Bedrock User Guide.
 */
export const createPromptVersion: API.OperationMethod<
  CreatePromptVersionRequest,
  CreatePromptVersionResponse,
  CreatePromptVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<CreatePromptVersionRequest>,
  output: __S(838, __c26, 6) as any as S.Schema<CreatePromptVersionResponse>,
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
  operationName: "CreatePromptVersion",
}));

export type CreateVpcConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a VPC configuration that lets a knowledge base connect to a resource in your private VPC. This operation is asynchronous: it returns a `vpcConfigurationId` with status `CREATING`. Poll `GetVpcConfiguration` until the status becomes `CREATED` or `CREATE_FAILED`.
 */
export const createVpcConfiguration: API.OperationMethod<
  CreateVpcConfigurationRequest,
  CreateVpcConfigurationResponse,
  CreateVpcConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<CreateVpcConfigurationRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<CreateVpcConfigurationResponse>,
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
  operationName: "CreateVpcConfiguration",
}));

export type DeleteAgentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an agent.
 */
export const deleteAgent: API.OperationMethod<
  DeleteAgentRequest,
  DeleteAgentResponse,
  DeleteAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<DeleteAgentRequest>,
  output: __S(961, __c30, 1) as any as S.Schema<DeleteAgentResponse>,
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
  operationName: "DeleteAgent",
}));

export type DeleteAgentActionGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an action group in an agent.
 */
export const deleteAgentActionGroup: API.OperationMethod<
  DeleteAgentActionGroupRequest,
  DeleteAgentActionGroupResponse,
  DeleteAgentActionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<DeleteAgentActionGroupRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<DeleteAgentActionGroupResponse>,
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
  operationName: "DeleteAgentActionGroup",
}));

export type DeleteAgentAliasError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an alias of an agent.
 */
export const deleteAgentAlias: API.OperationMethod<
  DeleteAgentAliasRequest,
  DeleteAgentAliasResponse,
  DeleteAgentAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1024, __c32, 0) as any as S.Schema<DeleteAgentAliasRequest>,
  output: __S(1025, __c32, 1) as any as S.Schema<DeleteAgentAliasResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgentAlias",
}));

export type DeleteAgentVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a version of an agent.
 */
export const deleteAgentVersion: API.OperationMethod<
  DeleteAgentVersionRequest,
  DeleteAgentVersionResponse,
  DeleteAgentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1056, __c33, 0) as any as S.Schema<DeleteAgentVersionRequest>,
  output: __S(1057, __c33, 1) as any as S.Schema<DeleteAgentVersionResponse>,
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
  operationName: "DeleteAgentVersion",
}));

export type DeleteDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a data source from a knowledge base.
 */
export const deleteDataSource: API.OperationMethod<
  DeleteDataSourceRequest,
  DeleteDataSourceResponse,
  DeleteDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1088, __c34, 0) as any as S.Schema<DeleteDataSourceRequest>,
  output: __S(1089, __c34, 1) as any as S.Schema<DeleteDataSourceResponse>,
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
  operationName: "DeleteDataSource",
}));

export type DeleteFlowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a flow.
 */
export const deleteFlow: API.OperationMethod<
  DeleteFlowRequest,
  DeleteFlowResponse,
  DeleteFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<DeleteFlowRequest>,
  output: __S(1152, __c36, 0) as any as S.Schema<DeleteFlowResponse>,
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
  operationName: "DeleteFlow",
}));

export type DeleteFlowAliasError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an alias of a flow.
 */
export const deleteFlowAlias: API.OperationMethod<
  DeleteFlowAliasRequest,
  DeleteFlowAliasResponse,
  DeleteFlowAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<DeleteFlowAliasRequest>,
  output: __S(1185, __c37, 1) as any as S.Schema<DeleteFlowAliasResponse>,
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
  operationName: "DeleteFlowAlias",
}));

export type DeleteFlowVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a version of a flow.
 */
export const deleteFlowVersion: API.OperationMethod<
  DeleteFlowVersionRequest,
  DeleteFlowVersionResponse,
  DeleteFlowVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1216, __c38, 0) as any as S.Schema<DeleteFlowVersionRequest>,
  output: __S(1217, __c38, 1) as any as S.Schema<DeleteFlowVersionResponse>,
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
  operationName: "DeleteFlowVersion",
}));

export type DeleteKnowledgeBaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a knowledge base. Before deleting a knowledge base, you should disassociate the knowledge base from any agents that it is associated with by making a DisassociateAgentKnowledgeBase request.
 */
export const deleteKnowledgeBase: API.OperationMethod<
  DeleteKnowledgeBaseRequest,
  DeleteKnowledgeBaseResponse,
  DeleteKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1248, __c39, 0) as any as S.Schema<DeleteKnowledgeBaseRequest>,
  output: __S(1249, __c39, 1) as any as S.Schema<DeleteKnowledgeBaseResponse>,
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
  operationName: "DeleteKnowledgeBase",
}));

export type DeleteKnowledgeBaseDocumentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes documents from a data source and syncs the changes to the knowledge base that is connected to it. For more information, see Ingest changes directly into a knowledge base in the Amazon Bedrock User Guide.
 */
export const deleteKnowledgeBaseDocuments: API.OperationMethod<
  DeleteKnowledgeBaseDocumentsRequest,
  DeleteKnowledgeBaseDocumentsResponse,
  DeleteKnowledgeBaseDocumentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1280, __c40, 0) as any as S.Schema<DeleteKnowledgeBaseDocumentsRequest>,
  output: __S(1344, __c42, 0) as any as S.Schema<DeleteKnowledgeBaseDocumentsResponse>,
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
  operationName: "DeleteKnowledgeBaseDocuments",
}));

export type DeletePromptError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a prompt or a version of it, depending on whether you include the `promptVersion` field or not. For more information, see Delete prompts from the Prompt management tool and Delete a version of a prompt from the Prompt management tool in the Amazon Bedrock User Guide.
 */
export const deletePrompt: API.OperationMethod<
  DeletePromptRequest,
  DeletePromptResponse,
  DeletePromptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1408, __c44, 0) as any as S.Schema<DeletePromptRequest>,
  output: __S(1409, __c44, 1) as any as S.Schema<DeletePromptResponse>,
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
  operationName: "DeletePrompt",
}));

export type DeleteResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the resource policy associated with a knowledge base. After deletion, other AWS accounts can no longer access the knowledge base using cross-account permissions.
 */
export const deleteResourcePolicy: API.OperationMethod<
  DeleteResourcePolicyRequest,
  DeleteResourcePolicyResponse,
  DeleteResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1440, __c45, 0) as any as S.Schema<DeleteResourcePolicyRequest>,
  output: __S(1441, __c45, 1) as any as S.Schema<DeleteResourcePolicyResponse>,
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
  operationName: "DeleteResourcePolicy",
}));

export type DeleteVpcConfigurationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a VPC configuration. This operation is asynchronous: it returns status `DELETING`. Poll `GetVpcConfiguration` until it returns a `ResourceNotFoundException`, indicating the configuration is deleted. Delete requests are idempotent and safe to retry.
 */
export const deleteVpcConfiguration: API.OperationMethod<
  DeleteVpcConfigurationRequest,
  DeleteVpcConfigurationResponse,
  DeleteVpcConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<DeleteVpcConfigurationRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<DeleteVpcConfigurationResponse>,
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
  operationName: "DeleteVpcConfiguration",
}));

export type DisassociateAgentCollaboratorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates an agent collaborator.
 */
export const disassociateAgentCollaborator: API.OperationMethod<
  DisassociateAgentCollaboratorRequest,
  DisassociateAgentCollaboratorResponse,
  DisassociateAgentCollaboratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c47, 0) as any as S.Schema<DisassociateAgentCollaboratorRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<DisassociateAgentCollaboratorResponse>,
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
  operationName: "DisassociateAgentCollaborator",
}));

export type DisassociateAgentKnowledgeBaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Disassociates a knowledge base from an agent.
 */
export const disassociateAgentKnowledgeBase: API.OperationMethod<
  DisassociateAgentKnowledgeBaseRequest,
  DisassociateAgentKnowledgeBaseResponse,
  DisassociateAgentKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c48, 0) as any as S.Schema<DisassociateAgentKnowledgeBaseRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<DisassociateAgentKnowledgeBaseResponse>,
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
  operationName: "DisassociateAgentKnowledgeBase",
}));

export type GetAgentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an agent.
 */
export const getAgent: API.OperationMethod<
  GetAgentRequest,
  GetAgentResponse,
  GetAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c49, 0) as any as S.Schema<GetAgentRequest>,
  output: __S(3651, __c114, 3) as any as S.Schema<GetAgentResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgent",
}));

export type GetAgentActionGroupError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an action group for an agent.
 */
export const getAgentActionGroup: API.OperationMethod<
  GetAgentActionGroupRequest,
  GetAgentActionGroupResponse,
  GetAgentActionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<GetAgentActionGroupRequest>,
  output: __S(41, __c1, 9) as any as S.Schema<GetAgentActionGroupResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentActionGroup",
}));

export type GetAgentAliasError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about an alias of an agent.
 */
export const getAgentAlias: API.OperationMethod<
  GetAgentAliasRequest,
  GetAgentAliasResponse,
  GetAgentAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<GetAgentAliasRequest>,
  output: __S(131, __c4, 3) as any as S.Schema<GetAgentAliasResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentAlias",
}));

export type GetAgentCollaboratorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an agent's collaborator.
 */
export const getAgentCollaborator: API.OperationMethod<
  GetAgentCollaboratorRequest,
  GetAgentCollaboratorResponse,
  GetAgentCollaboratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<GetAgentCollaboratorRequest>,
  output: __S(2881, __c90, 1) as any as S.Schema<GetAgentCollaboratorResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentCollaborator",
}));

export type GetAgentKnowledgeBaseError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a knowledge base associated with an agent.
 */
export const getAgentKnowledgeBase: API.OperationMethod<
  GetAgentKnowledgeBaseRequest,
  GetAgentKnowledgeBaseResponse,
  GetAgentKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1696, __c53, 0) as any as S.Schema<GetAgentKnowledgeBaseRequest>,
  output: __S(3265, __c102, 1) as any as S.Schema<GetAgentKnowledgeBaseResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentKnowledgeBase",
}));

export type GetAgentVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets details about a version of an agent.
 */
export const getAgentVersion: API.OperationMethod<
  GetAgentVersionRequest,
  GetAgentVersionResponse,
  GetAgentVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<GetAgentVersionRequest>,
  output: __S(1730, __c54, 2) as any as S.Schema<GetAgentVersionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentVersion",
}));

export type GetDataSourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a data source.
 */
export const getDataSource: API.OperationMethod<
  GetDataSourceRequest,
  GetDataSourceResponse,
  GetDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<GetDataSourceRequest>,
  output: __S(401, __c12, 17) as any as S.Schema<GetDataSourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDataSource",
}));

export type GetFlowError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a flow. For more information, see Manage a flow in Amazon Bedrock in the Amazon Bedrock User Guide.
 */
export const getFlow: API.OperationMethod<
  GetFlowRequest,
  GetFlowResponse,
  GetFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1792, __c56, 0) as any as S.Schema<GetFlowRequest>,
  output: __S(1793, __c56, 1) as any as S.Schema<GetFlowResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFlow",
}));

export type GetFlowAliasError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a flow. For more information, see Deploy a flow in Amazon Bedrock in the Amazon Bedrock User Guide.
 */
export const getFlowAlias: API.OperationMethod<
  GetFlowAliasRequest,
  GetFlowAliasResponse,
  GetFlowAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<GetFlowAliasRequest>,
  output: __S(611, __c19, 3) as any as S.Schema<GetFlowAliasResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFlowAlias",
}));

export type GetFlowVersionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a version of a flow. For more information, see Deploy a flow in Amazon Bedrock in the Amazon Bedrock User Guide.
 */
export const getFlowVersion: API.OperationMethod<
  GetFlowVersionRequest,
  GetFlowVersionResponse,
  GetFlowVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1888, __c59, 0) as any as S.Schema<GetFlowVersionRequest>,
  output: __S(672, __c21, 0) as any as S.Schema<GetFlowVersionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFlowVersion",
}));

export type GetIngestionJobError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a data ingestion job. Data sources are ingested into your knowledge base so that Large Language Models (LLMs) can use your data.
 */
export const getIngestionJob: API.OperationMethod<
  GetIngestionJobRequest,
  GetIngestionJobResponse,
  GetIngestionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<GetIngestionJobRequest>,
  output: __S(1985, __c62, 1) as any as S.Schema<GetIngestionJobResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetIngestionJob",
}));

export type GetKnowledgeBaseError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a knowledge base.
 */
export const getKnowledgeBase: API.OperationMethod<
  GetKnowledgeBaseRequest,
  GetKnowledgeBaseResponse,
  GetKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<GetKnowledgeBaseRequest>,
  output: __S(780, __c24, 12) as any as S.Schema<GetKnowledgeBaseResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKnowledgeBase",
}));

export type GetKnowledgeBaseDocumentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves specific documents from a data source that is connected to a knowledge base. For more information, see Ingest changes directly into a knowledge base in the Amazon Bedrock User Guide.
 */
export const getKnowledgeBaseDocuments: API.OperationMethod<
  GetKnowledgeBaseDocumentsRequest,
  GetKnowledgeBaseDocumentsResponse,
  GetKnowledgeBaseDocumentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2048, __c64, 0) as any as S.Schema<GetKnowledgeBaseDocumentsRequest>,
  output: __S(1344, __c42, 0) as any as S.Schema<GetKnowledgeBaseDocumentsResponse>,
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
  operationName: "GetKnowledgeBaseDocuments",
}));

export type GetPromptError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the working draft (`DRAFT` version) of a prompt or a version of it, depending on whether you include the `promptVersion` field or not. For more information, see View information about prompts using Prompt management and View information about a version of your prompt in the Amazon Bedrock User Guide.
 */
export const getPrompt: API.OperationMethod<
  GetPromptRequest,
  GetPromptResponse,
  GetPromptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2080, __c65, 0) as any as S.Schema<GetPromptRequest>,
  output: __S(838, __c26, 6) as any as S.Schema<GetPromptResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetPrompt",
}));

export type GetResourcePolicyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resource policy associated with a knowledge base.
 */
export const getResourcePolicy: API.OperationMethod<
  GetResourcePolicyRequest,
  GetResourcePolicyResponse,
  GetResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2112, __c66, 0) as any as S.Schema<GetResourcePolicyRequest>,
  output: __S(2113, __c66, 1) as any as S.Schema<GetResourcePolicyResponse>,
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

export type GetVpcConfigurationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details and current status of a single VPC configuration. Use this operation to poll for the outcome of an asynchronous create or delete.
 */
export const getVpcConfiguration: API.OperationMethod<
  GetVpcConfigurationRequest,
  GetVpcConfigurationResponse,
  GetVpcConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2144, __c67, 0) as any as S.Schema<GetVpcConfigurationRequest>,
  output: __S(2146, __c67, 2) as any as S.Schema<GetVpcConfigurationResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetVpcConfiguration",
}));

export type IngestKnowledgeBaseDocumentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Ingests documents directly into the knowledge base that is connected to the data source. The `dataSourceType` specified in the content for each document must match the type of the data source that you specify in the header. For more information, see Ingest changes directly into a knowledge base in the Amazon Bedrock User Guide.
 */
export const ingestKnowledgeBaseDocuments: API.OperationMethod<
  IngestKnowledgeBaseDocumentsRequest,
  IngestKnowledgeBaseDocumentsResponse,
  IngestKnowledgeBaseDocumentsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2190, __c68, 14) as any as S.Schema<IngestKnowledgeBaseDocumentsRequest>,
  output: __S(1344, __c42, 0) as any as S.Schema<IngestKnowledgeBaseDocumentsResponse>,
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
  operationName: "IngestKnowledgeBaseDocuments",
}));

export type ListAgentActionGroupsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the action groups for an agent and information about each one.
 */
export const listAgentActionGroups: API.PaginatedOperationMethod<
  ListAgentActionGroupsRequest,
  ListAgentActionGroupsResponse,
  ListAgentActionGroupsError,
  Credentials | HttpClient.HttpClient,
  ActionGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2208, __c69, 0) as any as S.Schema<ListAgentActionGroupsRequest>,
  output: __S(2211, __c69, 3) as any as S.Schema<ListAgentActionGroupsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentActionGroups",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actionGroupSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentAliasesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the aliases of an agent and information about each one.
 */
export const listAgentAliases: API.PaginatedOperationMethod<
  ListAgentAliasesRequest,
  ListAgentAliasesResponse,
  ListAgentAliasesError,
  Credentials | HttpClient.HttpClient,
  AgentAliasSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<ListAgentAliasesRequest>,
  output: __S(2243, __c70, 3) as any as S.Schema<ListAgentAliasesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentAliases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentAliasSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentCollaboratorsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieve a list of an agent's collaborators.
 */
export const listAgentCollaborators: API.PaginatedOperationMethod<
  ListAgentCollaboratorsRequest,
  ListAgentCollaboratorsResponse,
  ListAgentCollaboratorsError,
  Credentials | HttpClient.HttpClient,
  AgentCollaboratorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<ListAgentCollaboratorsRequest>,
  output: __S(2275, __c71, 3) as any as S.Schema<ListAgentCollaboratorsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentCollaborators",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentCollaboratorSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentKnowledgeBasesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists knowledge bases associated with an agent and information about each one.
 */
export const listAgentKnowledgeBases: API.PaginatedOperationMethod<
  ListAgentKnowledgeBasesRequest,
  ListAgentKnowledgeBasesResponse,
  ListAgentKnowledgeBasesError,
  Credentials | HttpClient.HttpClient,
  AgentKnowledgeBaseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2304, __c72, 0) as any as S.Schema<ListAgentKnowledgeBasesRequest>,
  output: __S(2307, __c72, 3) as any as S.Schema<ListAgentKnowledgeBasesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentKnowledgeBases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentKnowledgeBaseSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the agents belonging to an account and information about each agent.
 */
export const listAgents: API.PaginatedOperationMethod<
  ListAgentsRequest,
  ListAgentsResponse,
  ListAgentsError,
  Credentials | HttpClient.HttpClient,
  AgentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<ListAgentsRequest>,
  output: __S(2339, __c73, 3) as any as S.Schema<ListAgentsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAgentVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the versions of an agent and information about each version.
 */
export const listAgentVersions: API.PaginatedOperationMethod<
  ListAgentVersionsRequest,
  ListAgentVersionsResponse,
  ListAgentVersionsError,
  Credentials | HttpClient.HttpClient,
  AgentVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2368, __c74, 0) as any as S.Schema<ListAgentVersionsRequest>,
  output: __S(2371, __c74, 3) as any as S.Schema<ListAgentVersionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAgentVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "agentVersionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDataSourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the data sources in a knowledge base and information about each one.
 */
export const listDataSources: API.PaginatedOperationMethod<
  ListDataSourcesRequest,
  ListDataSourcesResponse,
  ListDataSourcesError,
  Credentials | HttpClient.HttpClient,
  DataSourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2400, __c75, 0) as any as S.Schema<ListDataSourcesRequest>,
  output: __S(2403, __c75, 3) as any as S.Schema<ListDataSourcesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDataSources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dataSourceSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFlowAliasesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of aliases for a flow.
 */
export const listFlowAliases: API.PaginatedOperationMethod<
  ListFlowAliasesRequest,
  ListFlowAliasesResponse,
  ListFlowAliasesError,
  Credentials | HttpClient.HttpClient,
  FlowAliasSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2432, __c76, 0) as any as S.Schema<ListFlowAliasesRequest>,
  output: __S(2434, __c76, 2) as any as S.Schema<ListFlowAliasesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlowAliases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "flowAliasSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFlowsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of flows and information about each flow. For more information, see Manage a flow in Amazon Bedrock in the Amazon Bedrock User Guide.
 */
export const listFlows: API.PaginatedOperationMethod<
  ListFlowsRequest,
  ListFlowsResponse,
  ListFlowsError,
  Credentials | HttpClient.HttpClient,
  FlowSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2496, __c78, 0) as any as S.Schema<ListFlowsRequest>,
  output: __S(2499, __c78, 3) as any as S.Schema<ListFlowsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlows",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "flowSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFlowVersionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of information about each flow. For more information, see Deploy a flow in Amazon Bedrock in the Amazon Bedrock User Guide.
 */
export const listFlowVersions: API.PaginatedOperationMethod<
  ListFlowVersionsRequest,
  ListFlowVersionsResponse,
  ListFlowVersionsError,
  Credentials | HttpClient.HttpClient,
  FlowVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2528, __c79, 0) as any as S.Schema<ListFlowVersionsRequest>,
  output: __S(2531, __c79, 3) as any as S.Schema<ListFlowVersionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFlowVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "flowVersionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListIngestionJobsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the data ingestion jobs for a data source. The list also includes information about each job.
 */
export const listIngestionJobs: API.PaginatedOperationMethod<
  ListIngestionJobsRequest,
  ListIngestionJobsResponse,
  ListIngestionJobsError,
  Credentials | HttpClient.HttpClient,
  IngestionJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2563, __c80, 3) as any as S.Schema<ListIngestionJobsRequest>,
  output: __S(2566, __c80, 6) as any as S.Schema<ListIngestionJobsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListIngestionJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "ingestionJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListKnowledgeBaseDocumentsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves all the documents contained in a data source that is connected to a knowledge base. For more information, see Ingest changes directly into a knowledge base in the Amazon Bedrock User Guide.
 */
export const listKnowledgeBaseDocuments: API.PaginatedOperationMethod<
  ListKnowledgeBaseDocumentsRequest,
  ListKnowledgeBaseDocumentsResponse,
  ListKnowledgeBaseDocumentsError,
  Credentials | HttpClient.HttpClient,
  KnowledgeBaseDocumentDetail
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2592, __c81, 0) as any as S.Schema<ListKnowledgeBaseDocumentsRequest>,
  output: __S(2593, __c81, 1) as any as S.Schema<ListKnowledgeBaseDocumentsResponse>,
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
  operationName: "ListKnowledgeBaseDocuments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "documentDetails",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListKnowledgeBasesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the knowledge bases in an account. The list also includesinformation about each knowledge base.
 */
export const listKnowledgeBases: API.PaginatedOperationMethod<
  ListKnowledgeBasesRequest,
  ListKnowledgeBasesResponse,
  ListKnowledgeBasesError,
  Credentials | HttpClient.HttpClient,
  KnowledgeBaseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2624, __c82, 0) as any as S.Schema<ListKnowledgeBasesRequest>,
  output: __S(2627, __c82, 3) as any as S.Schema<ListKnowledgeBasesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListKnowledgeBases",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "knowledgeBaseSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPromptsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns either information about the working draft (`DRAFT` version) of each prompt in an account, or information about of all versions of a prompt, depending on whether you include the `promptIdentifier` field or not. For more information, see View information about prompts using Prompt management in the Amazon Bedrock User Guide.
 */
export const listPrompts: API.PaginatedOperationMethod<
  ListPromptsRequest,
  ListPromptsResponse,
  ListPromptsError,
  Credentials | HttpClient.HttpClient,
  PromptSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2656, __c83, 0) as any as S.Schema<ListPromptsRequest>,
  output: __S(2659, __c83, 3) as any as S.Schema<ListPromptsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListPrompts",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "promptSummaries",
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
 * List all the tags for the resource you specify.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2688, __c84, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(2689, __c84, 1) as any as S.Schema<ListTagsForResourceResponse>,
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

export type ListVpcConfigurationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of the VPC configurations for a knowledge base. You can optionally filter by status. Use the `nextToken` parameter to retrieve additional results.
 */
export const listVpcConfigurations: API.PaginatedOperationMethod<
  ListVpcConfigurationsRequest,
  ListVpcConfigurationsResponse,
  ListVpcConfigurationsError,
  Credentials | HttpClient.HttpClient,
  VpcConfigurationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2720, __c85, 0) as any as S.Schema<ListVpcConfigurationsRequest>,
  output: __S(2723, __c85, 3) as any as S.Schema<ListVpcConfigurationsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListVpcConfigurations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "items",
    pageSize: "maxResults",
  } as const,
})) as any;

export type PrepareAgentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a `DRAFT` version of the agent that can be used for internal testing.
 */
export const prepareAgent: API.OperationMethod<
  PrepareAgentRequest,
  PrepareAgentResponse,
  PrepareAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2752, __c86, 0) as any as S.Schema<PrepareAgentRequest>,
  output: __S(2753, __c86, 1) as any as S.Schema<PrepareAgentResponse>,
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
  operationName: "PrepareAgent",
}));

export type PrepareFlowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Prepares the `DRAFT` version of a flow so that it can be invoked. For more information, see Test a flow in Amazon Bedrock in the Amazon Bedrock User Guide.
 */
export const prepareFlow: API.OperationMethod<
  PrepareFlowRequest,
  PrepareFlowResponse,
  PrepareFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<PrepareFlowRequest>,
  output: __S(2785, __c87, 1) as any as S.Schema<PrepareFlowResponse>,
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
  operationName: "PrepareFlow",
}));

export type PutResourcePolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Associates a resource policy with a knowledge base. A resource policy allows other AWS accounts to access the knowledge base. For more information, see Cross-account access for knowledge bases.
 */
export const putResourcePolicy: API.OperationMethod<
  PutResourcePolicyRequest,
  PutResourcePolicyResponse,
  PutResourcePolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2912, __c91, 0) as any as S.Schema<PutResourcePolicyRequest>,
  output: __S(2913, __c91, 1) as any as S.Schema<PutResourcePolicyResponse>,
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
  operationName: "PutResourcePolicy",
}));

export type StartIngestionJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Begins a data ingestion job. Data sources are ingested into your knowledge base so that Large Language Models (LLMs) can use your data.
 */
export const startIngestionJob: API.OperationMethod<
  StartIngestionJobRequest,
  StartIngestionJobResponse,
  StartIngestionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<StartIngestionJobRequest>,
  output: __S(1985, __c62, 1) as any as S.Schema<StartIngestionJobResponse>,
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
  operationName: "StartIngestionJob",
}));

export type StopIngestionJobError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops a currently running data ingestion job. You can send a `StartIngestionJob` request again to ingest the rest of your data when you are ready.
 */
export const stopIngestionJob: API.OperationMethod<
  StopIngestionJobRequest,
  StopIngestionJobResponse,
  StopIngestionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2976, __c93, 0) as any as S.Schema<StopIngestionJobRequest>,
  output: __S(1985, __c62, 1) as any as S.Schema<StopIngestionJobResponse>,
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
  operationName: "StopIngestionJob",
}));

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
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
  input: __S(3008, __c94, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<TagResourceResponse>,
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
 * Remove tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3040, __c95, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(192, __c6, 0) as any as S.Schema<UntagResourceResponse>,
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

export type UpdateAgentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of an agent.
 */
export const updateAgent: API.OperationMethod<
  UpdateAgentRequest,
  UpdateAgentResponse,
  UpdateAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3072, __c96, 0) as any as S.Schema<UpdateAgentRequest>,
  output: __S(3651, __c114, 3) as any as S.Schema<UpdateAgentResponse>,
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
  operationName: "UpdateAgent",
}));

export type UpdateAgentActionGroupError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration for an action group for an agent.
 */
export const updateAgentActionGroup: API.OperationMethod<
  UpdateAgentActionGroupRequest,
  UpdateAgentActionGroupResponse,
  UpdateAgentActionGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3104, __c97, 0) as any as S.Schema<UpdateAgentActionGroupRequest>,
  output: __S(41, __c1, 9) as any as S.Schema<UpdateAgentActionGroupResponse>,
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
  operationName: "UpdateAgentActionGroup",
}));

export type UpdateAgentAliasError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates configurations for an alias of an agent.
 */
export const updateAgentAlias: API.OperationMethod<
  UpdateAgentAliasRequest,
  UpdateAgentAliasResponse,
  UpdateAgentAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3136, __c98, 0) as any as S.Schema<UpdateAgentAliasRequest>,
  output: __S(131, __c4, 3) as any as S.Schema<UpdateAgentAliasResponse>,
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
  operationName: "UpdateAgentAlias",
}));

export type UpdateAgentCollaboratorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates an agent's collaborator.
 */
export const updateAgentCollaborator: API.OperationMethod<
  UpdateAgentCollaboratorRequest,
  UpdateAgentCollaboratorResponse,
  UpdateAgentCollaboratorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3168, __c99, 0) as any as S.Schema<UpdateAgentCollaboratorRequest>,
  output: __S(2881, __c90, 1) as any as S.Schema<UpdateAgentCollaboratorResponse>,
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
  operationName: "UpdateAgentCollaborator",
}));

export type UpdateAgentKnowledgeBaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration for a knowledge base that has been associated with an agent.
 */
export const updateAgentKnowledgeBase: API.OperationMethod<
  UpdateAgentKnowledgeBaseRequest,
  UpdateAgentKnowledgeBaseResponse,
  UpdateAgentKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3200, __c100, 0) as any as S.Schema<UpdateAgentKnowledgeBaseRequest>,
  output: __S(3265, __c102, 1) as any as S.Schema<UpdateAgentKnowledgeBaseResponse>,
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
  operationName: "UpdateAgentKnowledgeBase",
}));

export type UpdateDataSourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configurations for a data source connector.
 *
 * You can't change the `chunkingConfiguration` after you create the data source connector. Specify the existing `chunkingConfiguration`.
 */
export const updateDataSource: API.OperationMethod<
  UpdateDataSourceRequest,
  UpdateDataSourceResponse,
  UpdateDataSourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3296, __c103, 0) as any as S.Schema<UpdateDataSourceRequest>,
  output: __S(401, __c12, 17) as any as S.Schema<UpdateDataSourceResponse>,
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
  operationName: "UpdateDataSource",
}));

export type UpdateFlowError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies a flow. Include both fields that you want to keep and fields that you want to change. For more information, see How it works and Create a flow in Amazon Bedrock in the Amazon Bedrock User Guide.
 */
export const updateFlow: API.OperationMethod<
  UpdateFlowRequest,
  UpdateFlowResponse,
  UpdateFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3328, __c104, 0) as any as S.Schema<UpdateFlowRequest>,
  output: __S(544, __c17, 0) as any as S.Schema<UpdateFlowResponse>,
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
  operationName: "UpdateFlow",
}));

export type UpdateFlowAliasError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies the alias of a flow. Include both fields that you want to keep and ones that you want to change. For more information, see Deploy a flow in Amazon Bedrock in the Amazon Bedrock User Guide.
 */
export const updateFlowAlias: API.OperationMethod<
  UpdateFlowAliasRequest,
  UpdateFlowAliasResponse,
  UpdateFlowAliasError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3360, __c105, 0) as any as S.Schema<UpdateFlowAliasRequest>,
  output: __S(611, __c19, 3) as any as S.Schema<UpdateFlowAliasResponse>,
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
  operationName: "UpdateFlowAlias",
}));

export type UpdateKnowledgeBaseError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the configuration of a knowledge base with the fields that you specify. Because all fields will be overwritten, you must include the same values for fields that you want to keep the same.
 *
 * You can change the following fields:
 *
 * - `name`
 *
 * - `description`
 *
 * - `roleArn`
 *
 * You can't change the `knowledgeBaseConfiguration` or `storageConfiguration` fields, so you must specify the same configurations as when you created the knowledge base. You can send a GetKnowledgeBase request and copy the same configurations.
 */
export const updateKnowledgeBase: API.OperationMethod<
  UpdateKnowledgeBaseRequest,
  UpdateKnowledgeBaseResponse,
  UpdateKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3392, __c106, 0) as any as S.Schema<UpdateKnowledgeBaseRequest>,
  output: __S(780, __c24, 12) as any as S.Schema<UpdateKnowledgeBaseResponse>,
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
  operationName: "UpdateKnowledgeBase",
}));

export type UpdatePromptError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Modifies a prompt in your prompt library. Include both fields that you want to keep and fields that you want to replace. For more information, see Prompt management in Amazon Bedrock and Edit prompts in your prompt library in the Amazon Bedrock User Guide.
 */
export const updatePrompt: API.OperationMethod<
  UpdatePromptRequest,
  UpdatePromptResponse,
  UpdatePromptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3424, __c107, 0) as any as S.Schema<UpdatePromptRequest>,
  output: __S(838, __c26, 6) as any as S.Schema<UpdatePromptResponse>,
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
  operationName: "UpdatePrompt",
}));

export type ValidateFlowDefinitionError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Validates the definition of a flow.
 */
export const validateFlowDefinition: API.OperationMethod<
  ValidateFlowDefinitionRequest,
  ValidateFlowDefinitionResponse,
  ValidateFlowDefinitionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3456, __c108, 0) as any as S.Schema<ValidateFlowDefinitionRequest>,
  output: __S(3457, __c108, 1) as any as S.Schema<ValidateFlowDefinitionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ValidateFlowDefinition",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          actionGroupName: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          description: S.optional(S.String),
          parentActionGroupSignature: S.optional(S.String),
          parentActionGroupSignatureParams: S.optional(__S(3520, __c110, 0)),
          actionGroupExecutor: S.optional(__S(32, __c1, 0)),
          apiSchema: S.optional(__S(34, __c1, 2)),
          actionGroupState: S.optional(S.String),
          functionSchema: S.optional(__S(39, __c1, 7)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/agents/{agentId}/agentversions/{agentVersion}/actiongroups/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAgentActionGroupRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ lambda: S.String }),
        /*@__PURE__*/ S.Struct({ customControl: S.String }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({ s3BucketName: S.optional(S.String), s3ObjectKey: S.optional(S.String) }),
      ).annotate({ identifier: "S3Identifier" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ s3: __S(33, __c1, 1) }),
        /*@__PURE__*/ S.Struct({ payload: SensitiveString }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          description: S.optional(S.String),
          type: S.String,
          required: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ParameterDetail" });
    case 4:
      return S.Record(S.String, /*@__PURE__*/ __S(35, __c1, 3).pipe(S.optional));
    case 5:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          parameters: S.optional(__S(36, __c1, 4)),
          requireConfirmation: S.optional(S.String),
        }),
      ).annotate({ identifier: "Function" });
    case 6:
      return S.Array(__S(37, __c1, 5));
    case 7:
      return S.Union([/*@__PURE__*/ S.Struct({ functions: __S(38, __c1, 6) })]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String,
          agentVersion: S.String,
          actionGroupId: S.String,
          actionGroupName: S.String,
          clientToken: S.optional(S.String),
          description: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          parentActionSignature: S.optional(S.String),
          parentActionGroupSignatureParams: S.optional(__S(3520, __c110, 0)),
          actionGroupExecutor: S.optional(__S(32, __c1, 0)),
          apiSchema: S.optional(__S(34, __c1, 2)),
          functionSchema: S.optional(__S(39, __c1, 7)),
          actionGroupState: S.String,
        }),
      ).annotate({ identifier: "AgentActionGroup" });
    case 9:
      return S.suspend(() => S.Struct({ agentActionGroup: __S(40, __c1, 8) })).annotate({
        identifier: "CreateAgentActionGroupResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentAliasName: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          description: S.optional(S.String),
          routingConfiguration: S.optional(__S(97, __c3, 1)),
          tags: S.optional(__S(3520, __c110, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/agents/{agentId}/agentaliases/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAgentAliasRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentVersion: S.optional(S.String),
          provisionedThroughput: S.optional(S.String),
        }),
      ).annotate({ identifier: "AgentAliasRoutingConfigurationListItem" });
    case 1:
      return S.Array(__S(96, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          routingConfiguration: S.optional(__S(97, __c3, 1)),
          endDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          startDate: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "AgentAliasHistoryEvent" });
    case 1:
      return S.Array(__S(128, __c4, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String,
          agentAliasId: S.String,
          agentAliasName: S.String,
          agentAliasArn: S.String,
          clientToken: S.optional(S.String),
          description: S.optional(S.String),
          routingConfiguration: __S(97, __c3, 1),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          agentAliasHistoryEvents: S.optional(__S(129, __c4, 1)),
          agentAliasStatus: S.String,
          failureReasons: S.optional(__S(3552, __c111, 0)),
          aliasInvocationState: S.optional(S.String),
        }),
      ).annotate({ identifier: "AgentAlias" });
    case 3:
      return S.suspend(() => S.Struct({ agentAlias: __S(130, __c4, 2) })).annotate({
        identifier: "CreateAgentAliasResponse",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          name: S.String,
          description: S.optional(S.String),
          dataSourceConfiguration: __S(381, __c11, 29),
          dataDeletionPolicy: S.optional(S.String),
          serverSideEncryptionConfiguration: S.optional(__S(288, __c9, 0)),
          vectorIngestionConfiguration: S.optional(__S(399, __c12, 15)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/knowledgebases/{knowledgeBaseId}/datasources/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateDataSourceRequest" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DailySchedule" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ lambdaArn: S.String })).annotate({
        identifier: "TransformationLambdaConfiguration",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ uri: S.String })).annotate({ identifier: "S3Location" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ kmsKeyArn: S.optional(S.String) })).annotate({
        identifier: "ServerSideEncryptionConfiguration",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
    case 1:
      return S.suspend(() => S.Struct({ s3Location: __S(256, __c8, 0) })).annotate({
        identifier: "IntermediateStorage",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          deletionProtectionStatus: S.String,
          deletionProtectionThreshold: S.optional(S.Number),
        }),
      ).annotate({ identifier: "DeletionProtectionConfiguration" });
    case 1:
      return S.suspend(() => S.Struct({ imageExtractionStatus: S.String })).annotate({
        identifier: "ImageExtractionConfiguration",
      });
    case 2:
      return S.suspend(() => S.Struct({ audioExtractionStatus: S.String })).annotate({
        identifier: "AudioExtractionConfiguration",
      });
    case 3:
      return S.suspend(() => S.Struct({ videoExtractionStatus: S.String })).annotate({
        identifier: "VideoExtractionConfiguration",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          imageExtractionConfiguration: S.optional(__S(353, __c11, 1)),
          audioExtractionConfiguration: S.optional(__S(354, __c11, 2)),
          videoExtractionConfiguration: S.optional(__S(355, __c11, 3)),
        }),
      ).annotate({ identifier: "MediaExtractionConfiguration" });
    case 5:
      return S.suspend(() => S.Struct({ dayOfWeek: S.String })).annotate({
        identifier: "WeeklySchedule",
      });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ dayNumber: S.Number }),
        /*@__PURE__*/ S.Struct({ lastDayOfMonth: __S(192, __c6, 0) }),
      ]);
    case 7:
      return S.suspend(() => S.Struct({ dayOfMonth: __S(358, __c11, 6) })).annotate({
        identifier: "MonthlySchedule",
      });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ daily: __S(192, __c6, 0) }),
        /*@__PURE__*/ S.Struct({ weekly: __S(357, __c11, 5) }),
        /*@__PURE__*/ S.Struct({ monthly: __S(359, __c11, 7) }),
      ]);
    case 9:
      return S.suspend(() =>
        S.Struct({
          deletionProtectionConfiguration: S.optional(__S(352, __c11, 0)),
          mediaExtractionConfiguration: S.optional(__S(356, __c11, 4)),
          connectorParameters: S.optional(S.Any),
          syncSchedule: S.optional(__S(360, __c11, 8)),
        }),
      ).annotate({ identifier: "ManagedKnowledgeBaseConnectorConfiguration" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          bucketArn: S.String,
          inclusionPrefixes: S.optional(__S(320, __c10, 0)),
          bucketOwnerAccountId: S.optional(S.String),
        }),
      ).annotate({ identifier: "S3DataSourceConfiguration" });
    case 11:
      return S.suspend(() => S.Struct({ url: S.optional(S.String) })).annotate({
        identifier: "SeedUrl",
      });
    case 12:
      return S.Array(__S(363, __c11, 11));
    case 13:
      return S.suspend(() => S.Struct({ seedUrls: S.optional(__S(364, __c11, 12)) })).annotate({
        identifier: "UrlConfiguration",
      });
    case 14:
      return S.suspend(() => S.Struct({ urlConfiguration: __S(365, __c11, 13) })).annotate({
        identifier: "WebSourceConfiguration",
      });
    case 15:
      return S.suspend(() =>
        S.Struct({ rateLimit: S.optional(S.Number), maxPages: S.optional(S.Number) }),
      ).annotate({ identifier: "WebCrawlerLimits" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          crawlerLimits: S.optional(__S(367, __c11, 15)),
          inclusionFilters: S.optional(__S(320, __c10, 0)),
          exclusionFilters: S.optional(__S(320, __c10, 0)),
          scope: S.optional(S.String),
          userAgent: S.optional(SensitiveString),
          userAgentHeader: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "WebCrawlerConfiguration" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          sourceConfiguration: __S(366, __c11, 14),
          crawlerConfiguration: S.optional(__S(368, __c11, 16)),
        }),
      ).annotate({ identifier: "WebDataSourceConfiguration" });
    case 18:
      return S.suspend(() =>
        S.Struct({
          hostUrl: S.String,
          hostType: S.String,
          authType: S.String,
          credentialsSecretArn: S.String,
        }),
      ).annotate({ identifier: "ConfluenceSourceConfiguration" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          objectType: SensitiveString,
          inclusionFilters: S.optional(__S(320, __c10, 0)),
          exclusionFilters: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "PatternObjectFilter" });
    case 20:
      return S.Array(__S(371, __c11, 19));
    case 21:
      return S.suspend(() => S.Struct({ filters: __S(372, __c11, 20) })).annotate({
        identifier: "PatternObjectFilterConfiguration",
      });
    case 22:
      return S.suspend(() =>
        S.Struct({ type: S.String, patternObjectFilter: S.optional(__S(373, __c11, 21)) }),
      ).annotate({ identifier: "CrawlFilterConfiguration" });
    case 23:
      return S.suspend(() =>
        S.Struct({ filterConfiguration: S.optional(__S(374, __c11, 22)) }),
      ).annotate({ identifier: "ConfluenceCrawlerConfiguration" });
    case 24:
      return S.suspend(() =>
        S.Struct({
          sourceConfiguration: __S(370, __c11, 18),
          crawlerConfiguration: S.optional(__S(375, __c11, 23)),
        }),
      ).annotate({ identifier: "ConfluenceDataSourceConfiguration" });
    case 25:
      return S.suspend(() =>
        S.Struct({ hostUrl: S.String, authType: S.String, credentialsSecretArn: S.String }),
      ).annotate({ identifier: "SalesforceSourceConfiguration" });
    case 26:
      return S.suspend(() =>
        S.Struct({
          sourceConfiguration: __S(377, __c11, 25),
          crawlerConfiguration: S.optional(__S(375, __c11, 23)),
        }),
      ).annotate({ identifier: "SalesforceDataSourceConfiguration" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          tenantId: S.optional(S.String),
          domain: S.String,
          siteUrls: __S(3552, __c111, 0),
          hostType: S.String,
          authType: S.String,
          credentialsSecretArn: S.String,
        }),
      ).annotate({ identifier: "SharePointSourceConfiguration" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          sourceConfiguration: __S(379, __c11, 27),
          crawlerConfiguration: S.optional(__S(375, __c11, 23)),
        }),
      ).annotate({ identifier: "SharePointDataSourceConfiguration" });
    case 29:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          managedKnowledgeBaseConnectorConfiguration: S.optional(__S(361, __c11, 9)),
          s3Configuration: S.optional(__S(362, __c11, 10)),
          webConfiguration: S.optional(__S(369, __c11, 17)),
          confluenceConfiguration: S.optional(__S(376, __c11, 24)),
          salesforceConfiguration: S.optional(__S(378, __c11, 26)),
          sharePointConfiguration: S.optional(__S(380, __c11, 28)),
        }),
      ).annotate({ identifier: "DataSourceConfiguration" });
    case 30:
      return S.suspend(() =>
        S.Struct({ maxTokens: S.Number, overlapPercentage: S.Number }),
      ).annotate({ identifier: "FixedSizeChunkingConfiguration" });
    case 31:
      return S.suspend(() => S.Struct({ maxTokens: S.Number })).annotate({
        identifier: "HierarchicalChunkingLevelConfiguration",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(383, __c11, 31));
    case 1:
      return S.suspend(() =>
        S.Struct({ levelConfigurations: __S(384, __c12, 0), overlapTokens: S.Number }),
      ).annotate({ identifier: "HierarchicalChunkingConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          maxTokens: S.Number,
          bufferSize: S.Number,
          breakpointPercentileThreshold: S.Number,
        }),
      ).annotate({ identifier: "SemanticChunkingConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          chunkingStrategy: S.String,
          fixedSizeChunkingConfiguration: S.optional(__S(382, __c11, 30)),
          hierarchicalChunkingConfiguration: S.optional(__S(385, __c12, 1)),
          semanticChunkingConfiguration: S.optional(__S(386, __c12, 2)),
        }),
      ).annotate({ identifier: "ChunkingConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({ transformationLambdaConfiguration: __S(224, __c7, 0) }),
      ).annotate({ identifier: "TransformationFunction" });
    case 5:
      return S.suspend(() =>
        S.Struct({ transformationFunction: __S(388, __c12, 4), stepToApply: S.String }),
      ).annotate({ identifier: "Transformation" });
    case 6:
      return S.Array(__S(389, __c12, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ intermediateStorage: __S(321, __c10, 1), transformations: __S(390, __c12, 6) }),
      ).annotate({ identifier: "CustomTransformationConfiguration" });
    case 8:
      return S.suspend(() => S.Struct({ parsingPromptText: S.String })).annotate({
        identifier: "ParsingPrompt",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          modelArn: S.String,
          parsingPrompt: S.optional(__S(392, __c12, 8)),
          parsingModality: S.optional(S.String),
        }),
      ).annotate({ identifier: "BedrockFoundationModelConfiguration" });
    case 10:
      return S.suspend(() => S.Struct({ parsingModality: S.optional(S.String) })).annotate({
        identifier: "BedrockDataAutomationConfiguration",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          parsingStrategy: S.String,
          bedrockFoundationModelConfiguration: S.optional(__S(393, __c12, 9)),
          bedrockDataAutomationConfiguration: S.optional(__S(394, __c12, 10)),
        }),
      ).annotate({ identifier: "ParsingConfiguration" });
    case 12:
      return S.suspend(() => S.Struct({ method: S.String })).annotate({
        identifier: "EnrichmentStrategyConfiguration",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({ enrichmentStrategyConfiguration: __S(396, __c12, 12), modelArn: S.String }),
      ).annotate({ identifier: "BedrockFoundationModelContextEnrichmentConfiguration" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          bedrockFoundationModelConfiguration: S.optional(__S(397, __c12, 13)),
        }),
      ).annotate({ identifier: "ContextEnrichmentConfiguration" });
    case 15:
      return S.suspend(() =>
        S.Struct({
          chunkingConfiguration: S.optional(__S(387, __c12, 3)),
          customTransformationConfiguration: S.optional(__S(391, __c12, 7)),
          parsingConfiguration: S.optional(__S(395, __c12, 11)),
          contextEnrichmentConfiguration: S.optional(__S(398, __c12, 14)),
        }),
      ).annotate({ identifier: "VectorIngestionConfiguration" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          dataSourceId: S.String,
          name: S.String,
          status: S.String,
          description: S.optional(S.String),
          dataSourceConfiguration: __S(381, __c11, 29),
          serverSideEncryptionConfiguration: S.optional(__S(288, __c9, 0)),
          vectorIngestionConfiguration: S.optional(__S(399, __c12, 15)),
          dataDeletionPolicy: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          failureReasons: S.optional(__S(3552, __c111, 0)),
        }),
      ).annotate({ identifier: "DataSource" });
    case 17:
      return S.suspend(() => S.Struct({ dataSource: __S(400, __c12, 16) })).annotate({
        identifier: "CreateDataSourceResponse",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          executionRoleArn: S.String,
          customerEncryptionKeyArn: S.optional(S.String),
          definition: S.optional(__S(519, __c16, 7)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(3520, __c110, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/flows/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFlowRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          temperature: S.optional(S.Number),
          topP: S.optional(S.Number),
          maxTokens: S.optional(S.Number),
          stopSequences: S.optional(__S(3552, __c111, 0)),
        }),
      ).annotate({ identifier: "PromptModelInferenceConfiguration" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ text: __S(448, __c14, 0) })]);
    case 2:
      return S.suspend(() => S.Struct({ type: S.String })).annotate({
        identifier: "CachePointBlock",
      });
    case 3:
      return S.suspend(() => S.Struct({ name: S.optional(S.String) })).annotate({
        identifier: "PromptInputVariable",
      });
    case 4:
      return S.Array(__S(451, __c14, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          text: SensitiveString,
          cachePoint: S.optional(__S(450, __c14, 2)),
          inputVariables: S.optional(__S(452, __c14, 4)),
        }),
      ).annotate({ identifier: "TextPromptTemplateConfiguration" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: S.String }),
        /*@__PURE__*/ S.Struct({ cachePoint: __S(450, __c14, 2) }),
      ]);
    case 7:
      return S.Array(__S(454, __c14, 6));
    case 8:
      return S.suspend(() => S.Struct({ role: S.String, content: __S(455, __c14, 7) })).annotate({
        identifier: "Message",
      });
    case 9:
      return S.Array(__S(456, __c14, 8));
    case 10:
      return S.Union([/*@__PURE__*/ S.Struct({ json: S.Any })]);
    case 11:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          inputSchema: __S(458, __c14, 10),
          strict: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "ToolSpecification" });
    case 12:
      return S.Union([
        /*@__PURE__*/ S.Struct({ toolSpec: __S(459, __c14, 11) }),
        /*@__PURE__*/ S.Struct({ cachePoint: __S(450, __c14, 2) }),
      ]);
    case 13:
      return S.Array(__S(460, __c14, 12));
    case 14:
      return S.suspend(() => S.Struct({ name: S.String })).annotate({
        identifier: "SpecificToolChoice",
      });
    case 15:
      return S.Union([
        /*@__PURE__*/ S.Struct({ auto: __S(192, __c6, 0) }),
        /*@__PURE__*/ S.Struct({ any: __S(192, __c6, 0) }),
        /*@__PURE__*/ S.Struct({ tool: __S(462, __c14, 14) }),
      ]);
    case 16:
      return S.suspend(() =>
        S.Struct({ tools: __S(461, __c14, 13), toolChoice: S.optional(__S(463, __c14, 15)) }),
      ).annotate({ identifier: "ToolConfiguration" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          messages: __S(457, __c14, 9),
          system: S.optional(__S(455, __c14, 7)),
          inputVariables: S.optional(__S(452, __c14, 4)),
          toolConfiguration: S.optional(__S(464, __c14, 16)),
        }),
      ).annotate({ identifier: "ChatPromptTemplateConfiguration" });
    case 18:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: __S(453, __c14, 5) }),
        /*@__PURE__*/ S.Struct({ chat: __S(465, __c14, 17) }),
      ]);
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ textPromptTemplate: S.optional(SensitiveString) }),
      ).annotate({ identifier: "KnowledgeBasePromptTemplate" });
    case 1:
      return S.Record(S.String, /*@__PURE__*/ S.Any.pipe(S.optional));
    case 2:
      return S.suspend(() =>
        S.Struct({
          modelArn: S.String,
          additionalModelRequestFields: S.optional(__S(481, __c15, 1)),
        }),
      ).annotate({ identifier: "VectorSearchBedrockRerankingModelConfiguration" });
    case 3:
      return S.suspend(() => S.Struct({ fieldName: S.String })).annotate({
        identifier: "FieldForReranking",
      });
    case 4:
      return S.Array(__S(483, __c15, 3));
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ fieldsToInclude: __S(484, __c15, 4) }),
        /*@__PURE__*/ S.Struct({ fieldsToExclude: __S(484, __c15, 4) }),
      ]);
    case 6:
      return S.suspend(() =>
        S.Struct({
          selectionMode: S.String,
          selectiveModeConfiguration: S.optional(__S(485, __c15, 5)),
        }),
      ).annotate({ identifier: "MetadataConfigurationForReranking" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          modelConfiguration: __S(482, __c15, 2),
          numberOfRerankedResults: S.optional(S.Number),
          metadataConfiguration: S.optional(__S(486, __c15, 6)),
        }),
      ).annotate({ identifier: "VectorSearchBedrockRerankingConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({ type: S.String, bedrockRerankingConfiguration: S.optional(__S(487, __c15, 7)) }),
      ).annotate({ identifier: "VectorSearchRerankingConfiguration" });
    case 9:
      return S.suspend(() => S.Struct({ latency: S.optional(S.String) })).annotate({
        identifier: "PerformanceConfiguration",
      });
    case 10:
      return S.suspend(() =>
        S.Struct({
          promptTemplate: S.optional(__S(480, __c15, 0)),
          inferenceConfig: S.optional(__S(449, __c14, 1)),
          additionalModelRequestFields: S.optional(__S(481, __c15, 1)),
          performanceConfig: S.optional(__S(489, __c15, 9)),
        }),
      ).annotate({ identifier: "KnowledgeBaseOrchestrationConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          modelId: S.optional(S.String),
          guardrailConfiguration: S.optional(__S(3584, __c112, 0)),
          numberOfResults: S.optional(S.Number),
          promptTemplate: S.optional(__S(480, __c15, 0)),
          inferenceConfiguration: S.optional(__S(449, __c14, 1)),
          rerankingConfiguration: S.optional(__S(488, __c15, 8)),
          orchestrationConfiguration: S.optional(__S(490, __c15, 10)),
        }),
      ).annotate({ identifier: "KnowledgeBaseFlowNodeConfiguration" });
    case 12:
      return S.suspend(() =>
        S.Struct({ name: S.String, expression: S.optional(SensitiveString) }),
      ).annotate({ identifier: "FlowCondition" });
    case 13:
      return S.Array(__S(492, __c15, 12));
    case 14:
      return S.suspend(() => S.Struct({ conditions: __S(493, __c15, 13) })).annotate({
        identifier: "ConditionFlowNodeConfiguration",
      });
    case 15:
      return S.suspend(() => S.Struct({ botAliasArn: S.String, localeId: S.String })).annotate({
        identifier: "LexFlowNodeConfiguration",
      });
    case 16:
      return S.suspend(() => S.Struct({ promptArn: S.String })).annotate({
        identifier: "PromptFlowNodeResourceConfiguration",
      });
    case 17:
      return S.suspend(() =>
        S.Struct({
          templateType: S.String,
          templateConfiguration: __S(466, __c14, 18),
          modelId: S.String,
          inferenceConfiguration: S.optional(__S(449, __c14, 1)),
          additionalModelRequestFields: S.optional(S.Any),
        }),
      ).annotate({ identifier: "PromptFlowNodeInlineConfiguration" });
    case 18:
      return S.Union([
        /*@__PURE__*/ S.Struct({ resource: __S(496, __c15, 16) }),
        /*@__PURE__*/ S.Struct({ inline: __S(497, __c15, 17) }),
      ]);
    case 19:
      return S.suspend(() =>
        S.Struct({
          sourceConfiguration: __S(498, __c15, 18),
          guardrailConfiguration: S.optional(__S(3584, __c112, 0)),
        }),
      ).annotate({ identifier: "PromptFlowNodeConfiguration" });
    case 20:
      return S.suspend(() => S.Struct({ bucketName: S.String })).annotate({
        identifier: "StorageFlowNodeS3Configuration",
      });
    case 21:
      return S.Union([/*@__PURE__*/ S.Struct({ s3: __S(500, __c15, 20) })]);
    case 22:
      return S.suspend(() => S.Struct({ serviceConfiguration: __S(501, __c15, 21) })).annotate({
        identifier: "StorageFlowNodeConfiguration",
      });
    case 23:
      return S.suspend(() => S.Struct({ agentAliasArn: S.String })).annotate({
        identifier: "AgentFlowNodeConfiguration",
      });
    case 24:
      return S.suspend(() => S.Struct({ code: SensitiveString, language: S.String })).annotate({
        identifier: "InlineCodeFlowNodeConfiguration",
      });
    case 25:
      return S.suspend(() =>
        S.Struct({
          definition: S.suspend((): S.Schema<FlowDefinition> => __S(519, __c16, 7)).annotate({
            identifier: "FlowDefinition",
          }),
        }),
      ).annotate({ identifier: "LoopFlowNodeConfiguration" });
    case 26:
      return S.suspend(() =>
        S.Struct({ continueCondition: __S(492, __c15, 12), maxIterations: S.optional(S.Number) }),
      ).annotate({ identifier: "LoopControllerFlowNodeConfiguration" });
    case 27:
      return S.Union([
        /*@__PURE__*/ S.Struct({
          input: __S(192, __c6, 0) as any as S.Schema<InputFlowNodeConfiguration>,
        }),
        /*@__PURE__*/ S.Struct({
          output: __S(192, __c6, 0) as any as S.Schema<OutputFlowNodeConfiguration>,
        }),
        /*@__PURE__*/ S.Struct({ knowledgeBase: __S(491, __c15, 11) }),
        /*@__PURE__*/ S.Struct({ condition: __S(494, __c15, 14) }),
        /*@__PURE__*/ S.Struct({ lex: __S(495, __c15, 15) }),
        /*@__PURE__*/ S.Struct({ prompt: __S(499, __c15, 19) }),
        /*@__PURE__*/ S.Struct({ lambdaFunction: __S(224, __c7, 0) }),
        /*@__PURE__*/ S.Struct({ storage: __S(502, __c15, 22) }),
        /*@__PURE__*/ S.Struct({ agent: __S(503, __c15, 23) }),
        /*@__PURE__*/ S.Struct({ retrieval: __S(502, __c15, 22) }),
        /*@__PURE__*/ S.Struct({ iterator: __S(192, __c6, 0) }),
        /*@__PURE__*/ S.Struct({ collector: __S(192, __c6, 0) }),
        /*@__PURE__*/ S.Struct({ inlineCode: __S(504, __c15, 24) }),
        /*@__PURE__*/ S.Struct({
          loop: /*@__PURE__*/ S.suspend((): S.Schema<LoopFlowNodeConfiguration> =>
            __S(505, __c15, 25),
          ).annotate({ identifier: "LoopFlowNodeConfiguration" }),
        }),
        /*@__PURE__*/ S.Struct({ loopInput: __S(192, __c6, 0) }),
        /*@__PURE__*/ S.Struct({ loopController: __S(506, __c15, 26) }),
      ]);
    case 28:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          expression: SensitiveString,
          category: S.optional(S.String),
        }),
      ).annotate({ identifier: "FlowNodeInput" });
    case 29:
      return S.Array(__S(508, __c15, 28));
    case 30:
      return S.suspend(() => S.Struct({ name: S.String, type: S.String })).annotate({
        identifier: "FlowNodeOutput",
      });
    case 31:
      return S.Array(__S(510, __c15, 30));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          type: S.String,
          configuration: S.optional(
            S.suspend(() => __S(507, __c15, 27)).annotate({ identifier: "FlowNodeConfiguration" }),
          ),
          inputs: S.optional(__S(509, __c15, 29)),
          outputs: S.optional(__S(511, __c15, 31)),
        }),
      ).annotate({ identifier: "FlowNode" });
    case 1:
      return S.Array(
        /*@__PURE__*/ S.suspend((): S.Schema<FlowNode> => __S(512, __c16, 0)).annotate({
          identifier: "FlowNode",
        }),
      );
    case 2:
      return S.suspend(() => S.Struct({ sourceOutput: S.String, targetInput: S.String })).annotate({
        identifier: "FlowDataConnectionConfiguration",
      });
    case 3:
      return S.suspend(() => S.Struct({ condition: S.String })).annotate({
        identifier: "FlowConditionalConnectionConfiguration",
      });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ data: __S(514, __c16, 2) }),
        /*@__PURE__*/ S.Struct({ conditional: __S(515, __c16, 3) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          name: S.String,
          source: S.String,
          target: S.String,
          configuration: S.optional(__S(516, __c16, 4)),
        }),
      ).annotate({ identifier: "FlowConnection" });
    case 6:
      return S.Array(__S(517, __c16, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          nodes: S.optional(
            S.suspend(() => __S(513, __c16, 1)).annotate({ identifier: "FlowNodes" }),
          ),
          connections: S.optional(__S(518, __c16, 6)),
        }),
      ).annotate({ identifier: "FlowDefinition" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          executionRoleArn: S.String,
          customerEncryptionKeyArn: S.optional(S.String),
          id: S.String,
          arn: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          version: S.String,
          definition: S.optional(__S(519, __c16, 7)),
        }),
      ).annotate({ identifier: "CreateFlowResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          routingConfiguration: __S(609, __c19, 1),
          concurrencyConfiguration: S.optional(__S(610, __c19, 2)),
          flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(3520, __c110, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/flows/{flowIdentifier}/aliases" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFlowAliasRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ flowVersion: S.optional(S.String) })).annotate({
        identifier: "FlowAliasRoutingConfigurationListItem",
      });
    case 1:
      return S.Array(__S(608, __c19, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ type: S.String, maxConcurrency: S.optional(S.Number) }),
      ).annotate({ identifier: "FlowAliasConcurrencyConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          routingConfiguration: __S(609, __c19, 1),
          concurrencyConfiguration: S.optional(__S(610, __c19, 2)),
          flowId: S.String,
          id: S.String,
          arn: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreateFlowAliasResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
          description: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/flows/{flowIdentifier}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateFlowVersionRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          executionRoleArn: S.String,
          customerEncryptionKeyArn: S.optional(S.String),
          id: S.String,
          arn: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          version: S.String,
          definition: S.optional(__S(519, __c16, 7)),
        }),
      ).annotate({ identifier: "CreateFlowVersionResponse" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          name: S.String,
          description: S.optional(S.String),
          roleArn: S.String,
          knowledgeBaseConfiguration: __S(766, __c23, 30),
          storageConfiguration: S.optional(__S(778, __c24, 10)),
          tags: S.optional(__S(3520, __c110, 0)),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/knowledgebases/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateKnowledgeBaseRequest" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ fixedLengthDuration: S.Number })).annotate({
        identifier: "AudioSegmentationConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ segmentationConfiguration: __S(736, __c23, 0) })).annotate({
        identifier: "AudioConfiguration",
      });
    case 2:
      return S.Array(__S(737, __c23, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          dimensions: S.optional(S.Number),
          embeddingDataType: S.optional(S.String),
          audio: S.optional(__S(738, __c23, 2)),
          video: S.optional(__S(738, __c23, 2)),
          modelConfiguration: S.optional(S.Any),
        }),
      ).annotate({ identifier: "BedrockEmbeddingModelConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({ bedrockEmbeddingModelConfiguration: S.optional(__S(739, __c23, 3)) }),
      ).annotate({ identifier: "EmbeddingModelConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({ type: S.String, s3Location: S.optional(__S(256, __c8, 0)) }),
      ).annotate({ identifier: "SupplementalDataStorageLocation" });
    case 6:
      return S.Array(__S(741, __c23, 5));
    case 7:
      return S.suspend(() => S.Struct({ storageLocations: __S(742, __c23, 6) })).annotate({
        identifier: "SupplementalDataStorageConfiguration",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          embeddingModelArn: S.String,
          embeddingModelConfiguration: S.optional(__S(740, __c23, 4)),
          supplementalDataStorageConfiguration: S.optional(__S(743, __c23, 7)),
        }),
      ).annotate({ identifier: "VectorKnowledgeBaseConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          embeddingModelType: S.optional(S.String),
          embeddingModelArn: S.optional(S.String),
          embeddingModelConfiguration: S.optional(__S(740, __c23, 4)),
          serverSideEncryptionConfiguration: S.optional(__S(288, __c9, 0)),
          supplementalDataStorageConfiguration: S.optional(__S(743, __c23, 7)),
        }),
      ).annotate({ identifier: "ManagedKnowledgeBaseConfiguration" });
    case 10:
      return S.suspend(() => S.Struct({ kendraIndexArn: S.String })).annotate({
        identifier: "KendraKnowledgeBaseConfiguration",
      });
    case 11:
      return S.suspend(() => S.Struct({ tableNames: __S(3552, __c111, 0) })).annotate({
        identifier: "RedshiftQueryEngineAwsDataCatalogStorageConfiguration",
      });
    case 12:
      return S.suspend(() => S.Struct({ databaseName: S.String })).annotate({
        identifier: "RedshiftQueryEngineRedshiftStorageConfiguration",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          awsDataCatalogConfiguration: S.optional(__S(747, __c23, 11)),
          redshiftConfiguration: S.optional(__S(748, __c23, 12)),
        }),
      ).annotate({ identifier: "RedshiftQueryEngineStorageConfiguration" });
    case 14:
      return S.Array(__S(749, __c23, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({ type: S.String, usernamePasswordSecretArn: S.optional(S.String) }),
      ).annotate({ identifier: "RedshiftServerlessAuthConfiguration" });
    case 16:
      return S.suspend(() =>
        S.Struct({ workgroupArn: S.String, authConfiguration: __S(751, __c23, 15) }),
      ).annotate({ identifier: "RedshiftServerlessConfiguration" });
    case 17:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          databaseUser: S.optional(S.String),
          usernamePasswordSecretArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "RedshiftProvisionedAuthConfiguration" });
    case 18:
      return S.suspend(() =>
        S.Struct({ clusterIdentifier: S.String, authConfiguration: __S(753, __c23, 17) }),
      ).annotate({ identifier: "RedshiftProvisionedConfiguration" });
    case 19:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          serverlessConfiguration: S.optional(__S(752, __c23, 16)),
          provisionedConfiguration: S.optional(__S(754, __c23, 18)),
        }),
      ).annotate({ identifier: "RedshiftQueryEngineConfiguration" });
    case 20:
      return S.suspend(() =>
        S.Struct({
          name: S.optional(S.String),
          description: S.optional(S.String),
          inclusion: S.optional(S.String),
        }),
      ).annotate({ identifier: "QueryGenerationColumn" });
    case 21:
      return S.Array(__S(756, __c23, 20));
    case 22:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          inclusion: S.optional(S.String),
          columns: S.optional(__S(757, __c23, 21)),
        }),
      ).annotate({ identifier: "QueryGenerationTable" });
    case 23:
      return S.Array(__S(758, __c23, 22));
    case 24:
      return S.suspend(() => S.Struct({ naturalLanguage: S.String, sql: S.String })).annotate({
        identifier: "CuratedQuery",
      });
    case 25:
      return S.Array(__S(760, __c23, 24));
    case 26:
      return S.suspend(() =>
        S.Struct({
          tables: S.optional(__S(759, __c23, 23)),
          curatedQueries: S.optional(__S(761, __c23, 25)),
        }),
      ).annotate({ identifier: "QueryGenerationContext" });
    case 27:
      return S.suspend(() =>
        S.Struct({
          executionTimeoutSeconds: S.optional(S.Number),
          generationContext: S.optional(__S(762, __c23, 26)),
        }),
      ).annotate({ identifier: "QueryGenerationConfiguration" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          storageConfigurations: __S(750, __c23, 14),
          queryEngineConfiguration: __S(755, __c23, 19),
          queryGenerationConfiguration: S.optional(__S(763, __c23, 27)),
        }),
      ).annotate({ identifier: "RedshiftConfiguration" });
    case 29:
      return S.suspend(() =>
        S.Struct({ type: S.String, redshiftConfiguration: S.optional(__S(764, __c23, 28)) }),
      ).annotate({ identifier: "SqlKnowledgeBaseConfiguration" });
    case 30:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          vectorKnowledgeBaseConfiguration: S.optional(__S(744, __c23, 8)),
          managedKnowledgeBaseConfiguration: S.optional(__S(745, __c23, 9)),
          kendraKnowledgeBaseConfiguration: S.optional(__S(746, __c23, 10)),
          sqlKnowledgeBaseConfiguration: S.optional(__S(765, __c23, 29)),
        }),
      ).annotate({ identifier: "KnowledgeBaseConfiguration" });
    case 31:
      return S.suspend(() =>
        S.Struct({ vectorField: S.String, textField: S.String, metadataField: S.String }),
      ).annotate({ identifier: "OpenSearchServerlessFieldMapping" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          collectionArn: S.String,
          vectorIndexName: S.String,
          fieldMapping: __S(767, __c23, 31),
        }),
      ).annotate({ identifier: "OpenSearchServerlessConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          domainEndpoint: S.String,
          domainArn: S.String,
          vectorIndexName: SensitiveString,
          fieldMapping: __S(767, __c23, 31),
        }),
      ).annotate({ identifier: "OpenSearchManagedClusterConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ textField: S.String, metadataField: S.String })).annotate({
        identifier: "PineconeFieldMapping",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          connectionString: S.String,
          credentialsSecretArn: S.String,
          namespace: S.optional(S.String),
          fieldMapping: __S(770, __c24, 2),
        }),
      ).annotate({ identifier: "PineconeConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          endpoint: S.String,
          vectorIndexName: S.String,
          credentialsSecretArn: S.String,
          fieldMapping: __S(767, __c23, 31),
        }),
      ).annotate({ identifier: "RedisEnterpriseCloudConfiguration" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          primaryKeyField: S.String,
          vectorField: S.String,
          textField: S.String,
          metadataField: S.String,
          customMetadataField: S.optional(S.String),
        }),
      ).annotate({ identifier: "RdsFieldMapping" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String,
          credentialsSecretArn: S.String,
          databaseName: S.String,
          tableName: S.String,
          fieldMapping: __S(773, __c24, 5),
        }),
      ).annotate({ identifier: "RdsConfiguration" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          endpoint: S.String,
          databaseName: S.String,
          collectionName: S.String,
          vectorIndexName: S.String,
          credentialsSecretArn: S.String,
          fieldMapping: __S(767, __c23, 31),
          endpointServiceName: S.optional(S.String),
          textIndexName: S.optional(S.String),
        }),
      ).annotate({ identifier: "MongoDbAtlasConfiguration" });
    case 8:
      return S.suspend(() =>
        S.Struct({ graphArn: SensitiveString, fieldMapping: __S(770, __c24, 2) }),
      ).annotate({ identifier: "NeptuneAnalyticsConfiguration" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          vectorBucketArn: S.optional(SensitiveString),
          indexArn: S.optional(SensitiveString),
          indexName: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "S3VectorsConfiguration" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          opensearchServerlessConfiguration: S.optional(__S(768, __c24, 0)),
          opensearchManagedClusterConfiguration: S.optional(__S(769, __c24, 1)),
          pineconeConfiguration: S.optional(__S(771, __c24, 3)),
          redisEnterpriseCloudConfiguration: S.optional(__S(772, __c24, 4)),
          rdsConfiguration: S.optional(__S(774, __c24, 6)),
          mongoDbAtlasConfiguration: S.optional(__S(775, __c24, 7)),
          neptuneAnalyticsConfiguration: S.optional(__S(776, __c24, 8)),
          s3VectorsConfiguration: S.optional(__S(777, __c24, 9)),
        }),
      ).annotate({ identifier: "StorageConfiguration" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          name: S.String,
          knowledgeBaseArn: S.String,
          description: S.optional(S.String),
          roleArn: S.String,
          knowledgeBaseConfiguration: __S(766, __c23, 30),
          storageConfiguration: S.optional(__S(778, __c24, 10)),
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          failureReasons: S.optional(__S(3552, __c111, 0)),
        }),
      ).annotate({ identifier: "KnowledgeBase" });
    case 12:
      return S.suspend(() => S.Struct({ knowledgeBase: __S(779, __c24, 11) })).annotate({
        identifier: "CreateKnowledgeBaseResponse",
      });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          customerEncryptionKeyArn: S.optional(S.String),
          defaultVariant: S.optional(S.String),
          variants: S.optional(__S(837, __c26, 5)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(3520, __c110, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/prompts/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreatePromptRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: SensitiveString, value: SensitiveString })).annotate({
        identifier: "PromptMetadataEntry",
      });
    case 1:
      return S.Array(__S(832, __c26, 0));
    case 2:
      return S.suspend(() => S.Struct({ agentIdentifier: S.String })).annotate({
        identifier: "PromptAgentResource",
      });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ agent: __S(834, __c26, 2) })]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          templateType: S.String,
          templateConfiguration: __S(466, __c14, 18),
          modelId: S.optional(S.String),
          inferenceConfiguration: S.optional(__S(449, __c14, 1)),
          metadata: S.optional(__S(833, __c26, 1)),
          additionalModelRequestFields: S.optional(S.Any),
          genAiResource: S.optional(__S(835, __c26, 3)),
        }),
      ).annotate({ identifier: "PromptVariant" });
    case 5:
      return S.Array(__S(836, __c26, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          customerEncryptionKeyArn: S.optional(S.String),
          defaultVariant: S.optional(S.String),
          variants: S.optional(__S(837, __c26, 5)),
          id: S.String,
          arn: S.String,
          version: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "CreatePromptResponse" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          promptIdentifier: S.String.pipe(T.HttpLabel("promptIdentifier")),
          description: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(3520, __c110, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/prompts/{promptIdentifier}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePromptVersionRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          vpcId: S.String,
          subnetIds: __S(3552, __c111, 0),
          resourceTarget: S.String,
          port: S.Number,
          protocol: S.String,
          resolutionMode: S.String,
          hostHeader: S.optional(S.String),
          tlsServerName: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/knowledgebases/{knowledgeBaseId}/vpcconfigurations/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateVpcConfigurationRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ vpcConfigurationId: S.String, status: S.String })).annotate(
        { identifier: "CreateVpcConfigurationResponse" },
      );
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          skipResourceInUseCheck: S.optional(S.Boolean).pipe(T.HttpQuery("skipResourceInUseCheck")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/agents/{agentId}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAgentRequest" });
    case 1:
      return S.suspend(() => S.Struct({ agentId: S.String, agentStatus: S.String })).annotate({
        identifier: "DeleteAgentResponse",
      });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          actionGroupId: S.String.pipe(T.HttpLabel("actionGroupId")),
          skipResourceInUseCheck: S.optional(S.Boolean).pipe(T.HttpQuery("skipResourceInUseCheck")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/agents/{agentId}/agentversions/{agentVersion}/actiongroups/{actionGroupId}/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAgentActionGroupRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentAliasId: S.String.pipe(T.HttpLabel("agentAliasId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/agents/{agentId}/agentaliases/{agentAliasId}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAgentAliasRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ agentId: S.String, agentAliasId: S.String, agentAliasStatus: S.String }),
      ).annotate({ identifier: "DeleteAgentAliasResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          skipResourceInUseCheck: S.optional(S.Boolean).pipe(T.HttpQuery("skipResourceInUseCheck")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/agents/{agentId}/agentversions/{agentVersion}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAgentVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ agentId: S.String, agentVersion: S.String, agentStatus: S.String }),
      ).annotate({ identifier: "DeleteAgentVersionResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDataSourceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ knowledgeBaseId: S.String, dataSourceId: S.String, status: S.String }),
      ).annotate({ identifier: "DeleteDataSourceResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
          skipResourceInUseCheck: S.optional(S.Boolean).pipe(T.HttpQuery("skipResourceInUseCheck")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/flows/{flowIdentifier}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFlowRequest" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ id: S.String })).annotate({
        identifier: "DeleteFlowResponse",
      });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
          aliasIdentifier: S.String.pipe(T.HttpLabel("aliasIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/flows/{flowIdentifier}/aliases/{aliasIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFlowAliasRequest" });
    case 1:
      return S.suspend(() => S.Struct({ flowId: S.String, id: S.String })).annotate({
        identifier: "DeleteFlowAliasResponse",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
          flowVersion: S.String.pipe(T.HttpLabel("flowVersion")),
          skipResourceInUseCheck: S.optional(S.Boolean).pipe(T.HttpQuery("skipResourceInUseCheck")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/flows/{flowIdentifier}/versions/{flowVersion}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFlowVersionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ id: S.String, version: S.String })).annotate({
        identifier: "DeleteFlowVersionResponse",
      });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/knowledgebases/{knowledgeBaseId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKnowledgeBaseRequest" });
    case 1:
      return S.suspend(() => S.Struct({ knowledgeBaseId: S.String, status: S.String })).annotate({
        identifier: "DeleteKnowledgeBaseResponse",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          documentIdentifiers: __S(1312, __c41, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/documents/deleteDocuments",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKnowledgeBaseDocumentsRequest" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(1376, __c43, 0));
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ documentDetails: S.optional(__S(1378, __c43, 2)) }),
      ).annotate({ identifier: "DeleteKnowledgeBaseDocumentsResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          dataSourceType: S.String,
          s3: S.optional(__S(256, __c8, 0)),
          custom: S.optional(__S(1152, __c36, 0)),
        }),
      ).annotate({ identifier: "DocumentIdentifier" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          dataSourceId: S.String,
          status: S.String,
          identifier: __S(1376, __c43, 0),
          statusReason: S.optional(S.String),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "KnowledgeBaseDocumentDetail" });
    case 2:
      return S.Array(__S(1377, __c43, 1));
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          promptIdentifier: S.String.pipe(T.HttpLabel("promptIdentifier")),
          promptVersion: S.optional(S.String).pipe(T.HttpQuery("promptVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/prompts/{promptIdentifier}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePromptRequest" });
    case 1:
      return S.suspend(() => S.Struct({ id: S.String, version: S.optional(S.String) })).annotate({
        identifier: "DeletePromptResponse",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          expectedRevisionId: S.optional(S.String).pipe(T.HttpQuery("expectedRevisionId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/resourcepolicy/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteResourcePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, revisionId: S.optional(S.String) }),
      ).annotate({ identifier: "DeleteResourcePolicyResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          vpcConfigurationId: S.String.pipe(T.HttpLabel("vpcConfigurationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/knowledgebases/{knowledgeBaseId}/vpcconfigurations/{vpcConfigurationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteVpcConfigurationRequest" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          collaboratorId: S.String.pipe(T.HttpLabel("collaboratorId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/agents/{agentId}/agentversions/{agentVersion}/agentcollaborators/{collaboratorId}/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateAgentCollaboratorRequest" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/agents/{agentId}/agentversions/{agentVersion}/knowledgebases/{knowledgeBaseId}/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateAgentKnowledgeBaseRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentId: S.String.pipe(T.HttpLabel("agentId")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/agents/{agentId}/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetAgentRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          actionGroupId: S.String.pipe(T.HttpLabel("actionGroupId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/agents/{agentId}/agentversions/{agentVersion}/actiongroups/{actionGroupId}/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAgentActionGroupRequest" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentAliasId: S.String.pipe(T.HttpLabel("agentAliasId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/agents/{agentId}/agentaliases/{agentAliasId}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAgentAliasRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          collaboratorId: S.String.pipe(T.HttpLabel("collaboratorId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/agents/{agentId}/agentversions/{agentVersion}/agentcollaborators/{collaboratorId}/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAgentCollaboratorRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/agents/{agentId}/agentversions/{agentVersion}/knowledgebases/{knowledgeBaseId}/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAgentKnowledgeBaseRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/agents/{agentId}/agentversions/{agentVersion}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAgentVersionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String,
          agentName: S.String,
          agentArn: S.String,
          version: S.String,
          instruction: S.optional(SensitiveString),
          agentStatus: S.String,
          foundationModel: S.optional(S.String),
          description: S.optional(S.String),
          idleSessionTTLInSeconds: S.Number,
          agentResourceRoleArn: S.String,
          customerEncryptionKeyArn: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          failureReasons: S.optional(__S(3552, __c111, 0)),
          recommendedActions: S.optional(__S(3552, __c111, 0)),
          promptOverrideConfiguration: S.optional(__S(3619, __c113, 3)),
          guardrailConfiguration: S.optional(__S(3584, __c112, 0)),
          memoryConfiguration: S.optional(__S(3622, __c113, 6)),
          agentCollaboration: S.optional(S.String),
        }),
      ).annotate({ identifier: "AgentVersion" });
    case 2:
      return S.suspend(() => S.Struct({ agentVersion: __S(1729, __c54, 1) })).annotate({
        identifier: "GetAgentVersionResponse",
      });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDataSourceRequest" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
          includedData: S.optional(S.String).pipe(T.HttpQuery("includedData")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/flows/{flowIdentifier}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFlowRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          executionRoleArn: S.String,
          customerEncryptionKeyArn: S.optional(S.String),
          id: S.String,
          arn: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          version: S.String,
          definition: S.optional(__S(519, __c16, 7)),
          validations: S.optional(__S(1839, __c57, 15)),
        }),
      ).annotate({ identifier: "GetFlowResponse" });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ connection: S.String })).annotate({
        identifier: "CyclicConnectionFlowValidationDetails",
      });
    case 1:
      return S.suspend(() => S.Struct({ source: S.String, target: S.String })).annotate({
        identifier: "DuplicateConnectionsFlowValidationDetails",
      });
    case 2:
      return S.suspend(() => S.Struct({ node: S.String, expression: SensitiveString })).annotate({
        identifier: "DuplicateConditionExpressionFlowValidationDetails",
      });
    case 3:
      return S.suspend(() => S.Struct({ node: S.String })).annotate({
        identifier: "UnreachableNodeFlowValidationDetails",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({ node: S.String, condition: S.String, cause: S.String }),
      ).annotate({ identifier: "MalformedConditionExpressionFlowValidationDetails" });
    case 5:
      return S.suspend(() =>
        S.Struct({ node: S.String, input: S.String, cause: S.String }),
      ).annotate({ identifier: "MalformedNodeInputExpressionFlowValidationDetails" });
    case 6:
      return S.suspend(() =>
        S.Struct({ node: S.String, input: S.String, expectedType: S.String }),
      ).annotate({ identifier: "MismatchedNodeInputTypeFlowValidationDetails" });
    case 7:
      return S.suspend(() =>
        S.Struct({ node: S.String, output: S.String, expectedType: S.String }),
      ).annotate({ identifier: "MismatchedNodeOutputTypeFlowValidationDetails" });
    case 8:
      return S.suspend(() => S.Struct({ node: S.String, input: S.String })).annotate({
        identifier: "MissingNodeInputFlowValidationDetails",
      });
    case 9:
      return S.suspend(() => S.Struct({ node: S.String, output: S.String })).annotate({
        identifier: "MissingNodeOutputFlowValidationDetails",
      });
    case 10:
      return S.suspend(() => S.Struct({ loopNode: S.String })).annotate({
        identifier: "MissingLoopInputNodeFlowValidationDetails",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({
          node: S.String,
          incompatibleNodeType: S.String,
          incompatibleNodeName: S.String,
        }),
      ).annotate({ identifier: "LoopIncompatibleNodeTypeFlowValidationDetails" });
    case 12:
      return S.suspend(() =>
        S.Struct({ connection: S.String, source: S.String, target: S.String }),
      ).annotate({ identifier: "InvalidLoopBoundaryFlowValidationDetails" });
    case 13:
      return S.Union([
        /*@__PURE__*/ S.Struct({ cyclicConnection: __S(1824, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ duplicateConnections: __S(1825, __c57, 1) }),
        /*@__PURE__*/ S.Struct({ duplicateConditionExpression: __S(1826, __c57, 2) }),
        /*@__PURE__*/ S.Struct({ unreachableNode: __S(1827, __c57, 3) }),
        /*@__PURE__*/ S.Struct({ unknownConnectionSource: __S(1824, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ unknownConnectionSourceOutput: __S(1824, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ unknownConnectionTarget: __S(1824, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ unknownConnectionTargetInput: __S(1824, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ unknownConnectionCondition: __S(1824, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ malformedConditionExpression: __S(1828, __c57, 4) }),
        /*@__PURE__*/ S.Struct({ malformedNodeInputExpression: __S(1829, __c57, 5) }),
        /*@__PURE__*/ S.Struct({ mismatchedNodeInputType: __S(1830, __c57, 6) }),
        /*@__PURE__*/ S.Struct({ mismatchedNodeOutputType: __S(1831, __c57, 7) }),
        /*@__PURE__*/ S.Struct({ incompatibleConnectionDataType: __S(1824, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ missingConnectionConfiguration: __S(1824, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ missingDefaultCondition: __S(1827, __c57, 3) }),
        /*@__PURE__*/ S.Struct({ missingEndingNodes: __S(192, __c6, 0) }),
        /*@__PURE__*/ S.Struct({ missingNodeConfiguration: __S(1827, __c57, 3) }),
        /*@__PURE__*/ S.Struct({ missingNodeInput: __S(1832, __c57, 8) }),
        /*@__PURE__*/ S.Struct({ missingNodeOutput: __S(1833, __c57, 9) }),
        /*@__PURE__*/ S.Struct({ missingStartingNodes: __S(192, __c6, 0) }),
        /*@__PURE__*/ S.Struct({ multipleNodeInputConnections: __S(1832, __c57, 8) }),
        /*@__PURE__*/ S.Struct({ unfulfilledNodeInput: __S(1832, __c57, 8) }),
        /*@__PURE__*/ S.Struct({ unsatisfiedConnectionConditions: __S(1824, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ unspecified: __S(192, __c6, 0) }),
        /*@__PURE__*/ S.Struct({ unknownNodeInput: __S(1832, __c57, 8) }),
        /*@__PURE__*/ S.Struct({ unknownNodeOutput: __S(1833, __c57, 9) }),
        /*@__PURE__*/ S.Struct({ missingLoopInputNode: __S(1834, __c57, 10) }),
        /*@__PURE__*/ S.Struct({ missingLoopControllerNode: __S(1834, __c57, 10) }),
        /*@__PURE__*/ S.Struct({ multipleLoopInputNodes: __S(1834, __c57, 10) }),
        /*@__PURE__*/ S.Struct({ multipleLoopControllerNodes: __S(1834, __c57, 10) }),
        /*@__PURE__*/ S.Struct({ loopIncompatibleNodeType: __S(1835, __c57, 11) }),
        /*@__PURE__*/ S.Struct({ invalidLoopBoundary: __S(1836, __c57, 12) }),
      ]);
    case 14:
      return S.suspend(() =>
        S.Struct({
          message: S.String,
          severity: S.String,
          details: S.optional(__S(1837, __c57, 13)),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "FlowValidation" });
    case 15:
      return S.Array(__S(1838, __c57, 14));
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
          aliasIdentifier: S.String.pipe(T.HttpLabel("aliasIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/flows/{flowIdentifier}/aliases/{aliasIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFlowAliasRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
          flowVersion: S.String.pipe(T.HttpLabel("flowVersion")),
          includedData: S.optional(S.String).pipe(T.HttpQuery("includedData")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/flows/{flowIdentifier}/versions/{flowVersion}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFlowVersionRequest" });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
          ingestionJobId: S.String.pipe(T.HttpLabel("ingestionJobId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/ingestionjobs/{ingestionJobId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetIngestionJobRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          numberOfDocumentsScanned: S.optional(S.Number),
          numberOfMetadataDocumentsScanned: S.optional(S.Number),
          numberOfNewDocumentsIndexed: S.optional(S.Number),
          numberOfModifiedDocumentsIndexed: S.optional(S.Number),
          numberOfMetadataDocumentsModified: S.optional(S.Number),
          numberOfDocumentsDeleted: S.optional(S.Number),
          numberOfDocumentsFailed: S.optional(S.Number),
          numberOfDocumentsSkipped: S.optional(S.Number),
        }),
      ).annotate({ identifier: "IngestionJobStatistics" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          dataSourceId: S.String,
          ingestionJobId: S.String,
          description: S.optional(S.String),
          status: S.String,
          statistics: S.optional(__S(1952, __c61, 0)),
          failureReasons: S.optional(__S(3552, __c111, 0)),
          startedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          textReadyAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "IngestionJob" });
    case 1:
      return S.suspend(() => S.Struct({ ingestionJob: __S(1984, __c62, 0) })).annotate({
        identifier: "GetIngestionJobResponse",
      });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/knowledgebases/{knowledgeBaseId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKnowledgeBaseRequest" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
          documentIdentifiers: __S(1312, __c41, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/documents/getDocuments",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetKnowledgeBaseDocumentsRequest" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          promptIdentifier: S.String.pipe(T.HttpLabel("promptIdentifier")),
          promptVersion: S.optional(S.String).pipe(T.HttpQuery("promptVersion")),
          includedData: S.optional(S.String).pipe(T.HttpQuery("includedData")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/prompts/{promptIdentifier}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPromptRequest" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/resourcepolicy/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcePolicyRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, policy: S.String, revisionId: S.String }),
      ).annotate({ identifier: "GetResourcePolicyResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          vpcConfigurationId: S.String.pipe(T.HttpLabel("vpcConfigurationId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/knowledgebases/{knowledgeBaseId}/vpcconfigurations/{vpcConfigurationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetVpcConfigurationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vpcConfigurationId: S.String,
          status: S.String,
          statusMessage: S.optional(S.String),
          vpcId: S.String,
          subnetIds: __S(3552, __c111, 0),
          resourceTarget: S.String,
          port: S.Number,
          protocol: S.String,
          resolutionMode: S.String,
          hostHeader: S.optional(S.String),
          tlsServerName: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "VpcConfiguration" });
    case 2:
      return S.suspend(() => S.Struct({ vpcConfiguration: __S(2145, __c67, 1) })).annotate({
        identifier: "GetVpcConfigurationResponse",
      });
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          numberValue: S.optional(S.Number),
          booleanValue: S.optional(S.Boolean),
          stringValue: S.optional(SensitiveString),
          stringListValue: S.optional(__S(320, __c10, 0)),
        }),
      ).annotate({ identifier: "MetadataAttributeValue" });
    case 1:
      return S.suspend(() =>
        S.Struct({ key: SensitiveString, value: __S(2176, __c68, 0) }),
      ).annotate({ identifier: "MetadataAttribute" });
    case 2:
      return S.Array(__S(2177, __c68, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ uri: S.String, bucketOwnerAccountId: S.optional(S.String) }),
      ).annotate({ identifier: "CustomS3Location" });
    case 4:
      return S.suspend(() =>
        S.Struct({ name: S.String, type: S.String, access: S.String }),
      ).annotate({ identifier: "DocumentAccessControlEntry" });
    case 5:
      return S.Array(__S(2180, __c68, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          inlineAttributes: S.optional(__S(2178, __c68, 2)),
          s3Location: S.optional(__S(2179, __c68, 3)),
          accessControlList: S.optional(__S(2181, __c68, 5)),
        }),
      ).annotate({ identifier: "DocumentMetadata" });
    case 7:
      return S.suspend(() => S.Struct({ mimeType: S.String, data: SensitiveBlob })).annotate({
        identifier: "ByteContentDoc",
      });
    case 8:
      return S.suspend(() => S.Struct({ data: SensitiveString })).annotate({
        identifier: "TextContentDoc",
      });
    case 9:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          byteContent: S.optional(__S(2183, __c68, 7)),
          textContent: S.optional(__S(2184, __c68, 8)),
        }),
      ).annotate({ identifier: "InlineContent" });
    case 10:
      return S.suspend(() =>
        S.Struct({
          customDocumentIdentifier: __S(1152, __c36, 0),
          sourceType: S.String,
          s3Location: S.optional(__S(2179, __c68, 3)),
          inlineContent: S.optional(__S(2185, __c68, 9)),
        }),
      ).annotate({ identifier: "CustomContent" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          dataSourceType: S.String,
          custom: S.optional(__S(2186, __c68, 10)),
          s3: S.optional(__S(321, __c10, 1)),
        }),
      ).annotate({ identifier: "DocumentContent" });
    case 12:
      return S.suspend(() =>
        S.Struct({ metadata: S.optional(__S(2182, __c68, 6)), content: __S(2187, __c68, 11) }),
      ).annotate({ identifier: "KnowledgeBaseDocument" });
    case 13:
      return S.Array(__S(2188, __c68, 12));
    case 14:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          documents: __S(2189, __c68, 13),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/documents",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "IngestKnowledgeBaseDocumentsRequest" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/agents/{agentId}/agentversions/{agentVersion}/actiongroups/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAgentActionGroupsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          actionGroupId: S.String,
          actionGroupName: S.String,
          actionGroupState: S.String,
          description: S.optional(S.String),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ActionGroupSummary" });
    case 2:
      return S.Array(__S(2209, __c69, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ actionGroupSummaries: __S(2210, __c69, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAgentActionGroupsResponse" });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/agents/{agentId}/agentaliases/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAgentAliasesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentAliasId: S.String,
          agentAliasName: S.String,
          description: S.optional(S.String),
          routingConfiguration: S.optional(__S(97, __c3, 1)),
          agentAliasStatus: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          aliasInvocationState: S.optional(S.String),
        }),
      ).annotate({ identifier: "AgentAliasSummary" });
    case 2:
      return S.Array(__S(2241, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ agentAliasSummaries: __S(2242, __c70, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAgentAliasesResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/agents/{agentId}/agentversions/{agentVersion}/agentcollaborators/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAgentCollaboratorsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String,
          agentVersion: S.String,
          collaboratorId: S.String,
          agentDescriptor: __S(2848, __c89, 0),
          collaborationInstruction: SensitiveString,
          relayConversationHistory: S.String,
          collaboratorName: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "AgentCollaboratorSummary" });
    case 2:
      return S.Array(__S(2273, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          agentCollaboratorSummaries: __S(2274, __c71, 2),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAgentCollaboratorsResponse" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/agents/{agentId}/agentversions/{agentVersion}/knowledgebases/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAgentKnowledgeBasesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          description: S.optional(S.String),
          knowledgeBaseState: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "AgentKnowledgeBaseSummary" });
    case 2:
      return S.Array(__S(2305, __c72, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          agentKnowledgeBaseSummaries: __S(2306, __c72, 2),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAgentKnowledgeBasesResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/agents/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListAgentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String,
          agentName: S.String,
          agentStatus: S.String,
          description: S.optional(S.String),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          latestAgentVersion: S.optional(S.String),
          guardrailConfiguration: S.optional(__S(3584, __c112, 0)),
        }),
      ).annotate({ identifier: "AgentSummary" });
    case 2:
      return S.Array(__S(2337, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ agentSummaries: __S(2338, __c73, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAgentsResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/agents/{agentId}/agentversions/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAgentVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentName: S.String,
          agentStatus: S.String,
          agentVersion: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          description: S.optional(S.String),
          guardrailConfiguration: S.optional(__S(3584, __c112, 0)),
        }),
      ).annotate({ identifier: "AgentVersionSummary" });
    case 2:
      return S.Array(__S(2369, __c74, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ agentVersionSummaries: __S(2370, __c74, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAgentVersionsResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/knowledgebases/{knowledgeBaseId}/datasources/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListDataSourcesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          dataSourceId: S.String,
          name: S.String,
          status: S.String,
          description: S.optional(S.String),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "DataSourceSummary" });
    case 2:
      return S.Array(__S(2401, __c75, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ dataSourceSummaries: __S(2402, __c75, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDataSourcesResponse" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/flows/{flowIdentifier}/aliases" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFlowAliasesRequest" });
    case 1:
      return S.Array(__S(611, __c19, 3));
    case 2:
      return S.suspend(() =>
        S.Struct({ flowAliasSummaries: __S(2433, __c76, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFlowAliasesResponse" });
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(2464, __c77, 0));
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/flows/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFlowsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          id: S.String,
          arn: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          version: S.String,
        }),
      ).annotate({ identifier: "FlowSummary" });
    case 2:
      return S.Array(__S(2497, __c78, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ flowSummaries: __S(2498, __c78, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFlowsResponse" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/flows/{flowIdentifier}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListFlowVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          arn: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          version: S.String,
        }),
      ).annotate({ identifier: "FlowVersionSummary" });
    case 2:
      return S.Array(__S(2529, __c79, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ flowVersionSummaries: __S(2530, __c79, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFlowVersionsResponse" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ attribute: S.String, operator: S.String, values: __S(3552, __c111, 0) }),
      ).annotate({ identifier: "IngestionJobFilter" });
    case 1:
      return S.Array(__S(2560, __c80, 0));
    case 2:
      return S.suspend(() => S.Struct({ attribute: S.String, order: S.String })).annotate({
        identifier: "IngestionJobSortBy",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
          filters: S.optional(__S(2561, __c80, 1)),
          sortBy: S.optional(__S(2562, __c80, 2)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/ingestionjobs/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListIngestionJobsRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          dataSourceId: S.String,
          ingestionJobId: S.String,
          description: S.optional(S.String),
          status: S.String,
          startedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          textReadyAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          statistics: S.optional(__S(1952, __c61, 0)),
        }),
      ).annotate({ identifier: "IngestionJobSummary" });
    case 5:
      return S.Array(__S(2564, __c80, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ ingestionJobSummaries: __S(2565, __c80, 5), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListIngestionJobsResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/documents",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListKnowledgeBaseDocumentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ documentDetails: __S(1378, __c43, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListKnowledgeBaseDocumentsResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/knowledgebases/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListKnowledgeBasesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          name: S.String,
          description: S.optional(S.String),
          status: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "KnowledgeBaseSummary" });
    case 2:
      return S.Array(__S(2625, __c82, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ knowledgeBaseSummaries: __S(2626, __c82, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListKnowledgeBasesResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          promptIdentifier: S.optional(S.String).pipe(T.HttpQuery("promptIdentifier")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/prompts/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListPromptsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          id: S.String,
          arn: S.String,
          version: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "PromptSummary" });
    case 2:
      return S.Array(__S(2657, __c83, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ promptSummaries: __S(2658, __c83, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPromptsResponse" });
  }
}
function __c84(j: number): any {
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
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(3520, __c110, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          statusFilter: S.optional(S.String).pipe(T.HttpQuery("status")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/knowledgebases/{knowledgeBaseId}/vpcconfigurations/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListVpcConfigurationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          vpcConfigurationId: S.String,
          status: S.String,
          statusMessage: S.optional(S.String),
          vpcId: S.String,
          resourceTarget: S.String,
          port: S.Number,
          protocol: S.String,
          resolutionMode: S.String,
          hostHeader: S.optional(S.String),
          tlsServerName: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "VpcConfigurationSummary" });
    case 2:
      return S.Array(__S(2721, __c85, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(2722, __c85, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListVpcConfigurationsResponse" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ agentId: S.String.pipe(T.HttpLabel("agentId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/agents/{agentId}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PrepareAgentRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String,
          agentStatus: S.String,
          agentVersion: S.String,
          preparedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "PrepareAgentResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/flows/{flowIdentifier}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PrepareFlowRequest" });
    case 1:
      return S.suspend(() => S.Struct({ id: S.String, status: S.String })).annotate({
        identifier: "PrepareFlowResponse",
      });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          agentDescriptor: __S(2848, __c89, 0),
          collaboratorName: S.String,
          collaborationInstruction: SensitiveString,
          relayConversationHistory: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/agents/{agentId}/agentversions/{agentVersion}/agentcollaborators/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateAgentCollaboratorRequest" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ aliasArn: S.optional(S.String) })).annotate({
        identifier: "AgentDescriptor",
      });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String,
          agentVersion: S.String,
          agentDescriptor: __S(2848, __c89, 0),
          collaboratorId: S.String,
          collaborationInstruction: SensitiveString,
          collaboratorName: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          relayConversationHistory: S.optional(S.String),
          clientToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "AgentCollaborator" });
    case 1:
      return S.suspend(() => S.Struct({ agentCollaborator: __S(2880, __c90, 0) })).annotate({
        identifier: "AssociateAgentCollaboratorResponse",
      });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          policy: S.String,
          expectedRevisionId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/resourcepolicy/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutResourcePolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ resourceArn: S.String, revisionId: S.String })).annotate({
        identifier: "PutResourcePolicyResponse",
      });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/ingestionjobs/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartIngestionJobRequest" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
          ingestionJobId: S.String.pipe(T.HttpLabel("ingestionJobId")),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/ingestionjobs/{ingestionJobId}/stop",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopIngestionJobRequest" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(3520, __c110, 0),
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
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(3552, __c111, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentName: S.String,
          instruction: S.optional(SensitiveString),
          foundationModel: S.optional(S.String),
          description: S.optional(S.String),
          orchestrationType: S.optional(S.String),
          customOrchestration: S.optional(__S(3649, __c114, 1)),
          idleSessionTTLInSeconds: S.optional(S.Number),
          agentResourceRoleArn: S.String,
          customerEncryptionKeyArn: S.optional(S.String),
          promptOverrideConfiguration: S.optional(__S(3619, __c113, 3)),
          guardrailConfiguration: S.optional(__S(3584, __c112, 0)),
          memoryConfiguration: S.optional(__S(3622, __c113, 6)),
          agentCollaboration: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/agents/{agentId}/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateAgentRequest" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          actionGroupId: S.String.pipe(T.HttpLabel("actionGroupId")),
          actionGroupName: S.String,
          description: S.optional(S.String),
          parentActionGroupSignature: S.optional(S.String),
          parentActionGroupSignatureParams: S.optional(__S(3520, __c110, 0)),
          actionGroupExecutor: S.optional(__S(32, __c1, 0)),
          actionGroupState: S.optional(S.String),
          apiSchema: S.optional(__S(34, __c1, 2)),
          functionSchema: S.optional(__S(39, __c1, 7)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/agents/{agentId}/agentversions/{agentVersion}/actiongroups/{actionGroupId}/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAgentActionGroupRequest" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentAliasId: S.String.pipe(T.HttpLabel("agentAliasId")),
          agentAliasName: S.String,
          description: S.optional(S.String),
          routingConfiguration: S.optional(__S(97, __c3, 1)),
          aliasInvocationState: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/agents/{agentId}/agentaliases/{agentAliasId}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAgentAliasRequest" });
  }
}
function __c99(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          collaboratorId: S.String.pipe(T.HttpLabel("collaboratorId")),
          agentDescriptor: __S(2848, __c89, 0),
          collaboratorName: S.String,
          collaborationInstruction: SensitiveString,
          relayConversationHistory: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/agents/{agentId}/agentversions/{agentVersion}/agentcollaborators/{collaboratorId}/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAgentCollaboratorRequest" });
  }
}
function __c100(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          description: S.optional(S.String),
          knowledgeBaseState: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/agents/{agentId}/agentversions/{agentVersion}/knowledgebases/{knowledgeBaseId}/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAgentKnowledgeBaseRequest" });
  }
}
function __c101(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String.pipe(T.HttpLabel("agentId")),
          agentVersion: S.String.pipe(T.HttpLabel("agentVersion")),
          knowledgeBaseId: S.String,
          description: S.String,
          knowledgeBaseState: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/agents/{agentId}/agentversions/{agentVersion}/knowledgebases/",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateAgentKnowledgeBaseRequest" });
  }
}
function __c102(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String,
          agentVersion: S.String,
          knowledgeBaseId: S.String,
          description: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          knowledgeBaseState: S.String,
        }),
      ).annotate({ identifier: "AgentKnowledgeBase" });
    case 1:
      return S.suspend(() => S.Struct({ agentKnowledgeBase: __S(3264, __c102, 0) })).annotate({
        identifier: "AssociateAgentKnowledgeBaseResponse",
      });
  }
}
function __c103(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          dataSourceId: S.String.pipe(T.HttpLabel("dataSourceId")),
          name: S.String,
          description: S.optional(S.String),
          dataSourceConfiguration: __S(381, __c11, 29),
          dataDeletionPolicy: S.optional(S.String),
          serverSideEncryptionConfiguration: S.optional(__S(288, __c9, 0)),
          vectorIngestionConfiguration: S.optional(__S(399, __c12, 15)),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDataSourceRequest" });
  }
}
function __c104(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          executionRoleArn: S.String,
          customerEncryptionKeyArn: S.optional(S.String),
          definition: S.optional(__S(519, __c16, 7)),
          flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/flows/{flowIdentifier}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFlowRequest" });
  }
}
function __c105(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          routingConfiguration: __S(609, __c19, 1),
          concurrencyConfiguration: S.optional(__S(610, __c19, 2)),
          flowIdentifier: S.String.pipe(T.HttpLabel("flowIdentifier")),
          aliasIdentifier: S.String.pipe(T.HttpLabel("aliasIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/flows/{flowIdentifier}/aliases/{aliasIdentifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFlowAliasRequest" });
  }
}
function __c106(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          name: S.String,
          description: S.optional(S.String),
          roleArn: S.String,
          knowledgeBaseConfiguration: __S(766, __c23, 30),
          storageConfiguration: S.optional(__S(778, __c24, 10)),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/knowledgebases/{knowledgeBaseId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateKnowledgeBaseRequest" });
  }
}
function __c107(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          customerEncryptionKeyArn: S.optional(S.String),
          defaultVariant: S.optional(S.String),
          variants: S.optional(__S(837, __c26, 5)),
          promptIdentifier: S.String.pipe(T.HttpLabel("promptIdentifier")),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/prompts/{promptIdentifier}/" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdatePromptRequest" });
  }
}
function __c108(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ definition: __S(519, __c16, 7) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/flows/validate-definition" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ValidateFlowDefinitionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ validations: __S(1839, __c57, 15) })).annotate({
        identifier: "ValidateFlowDefinitionResponse",
      });
  }
}
function __c109(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          agentName: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          instruction: S.optional(SensitiveString),
          foundationModel: S.optional(S.String),
          description: S.optional(S.String),
          orchestrationType: S.optional(S.String),
          customOrchestration: S.optional(__S(3649, __c114, 1)),
          idleSessionTTLInSeconds: S.optional(S.Number),
          agentResourceRoleArn: S.optional(S.String),
          customerEncryptionKeyArn: S.optional(S.String),
          tags: S.optional(__S(3520, __c110, 0)),
          promptOverrideConfiguration: S.optional(__S(3619, __c113, 3)),
          guardrailConfiguration: S.optional(__S(3584, __c112, 0)),
          memoryConfiguration: S.optional(__S(3622, __c113, 6)),
          agentCollaboration: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "PUT", uri: "/agents/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateAgentRequest" });
  }
}
function __c110(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c111(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c112(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          guardrailIdentifier: S.optional(S.String),
          guardrailVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "GuardrailConfiguration" });
  }
}
function __c113(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          temperature: S.optional(S.Number),
          topP: S.optional(S.Number),
          topK: S.optional(S.Number),
          maximumLength: S.optional(S.Number),
          stopSequences: S.optional(__S(3552, __c111, 0)),
        }),
      ).annotate({ identifier: "InferenceConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          promptType: S.optional(S.String),
          promptCreationMode: S.optional(S.String),
          promptState: S.optional(S.String),
          basePromptTemplate: S.optional(SensitiveString),
          inferenceConfiguration: S.optional(__S(3616, __c113, 0)),
          parserMode: S.optional(S.String),
          foundationModel: S.optional(S.String),
          additionalModelRequestFields: S.optional(S.Any),
        }),
      ).annotate({ identifier: "PromptConfiguration" });
    case 2:
      return S.Array(__S(3617, __c113, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          promptConfigurations: __S(3618, __c113, 2),
          overrideLambda: S.optional(S.String),
        }),
      ).annotate({ identifier: "PromptOverrideConfiguration" });
    case 4:
      return S.Array(S.String);
    case 5:
      return S.suspend(() => S.Struct({ maxRecentSessions: S.optional(S.Number) })).annotate({
        identifier: "SessionSummaryConfiguration",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          enabledMemoryTypes: __S(3620, __c113, 4),
          storageDays: S.optional(S.Number),
          sessionSummaryConfiguration: S.optional(__S(3621, __c113, 5)),
        }),
      ).annotate({ identifier: "MemoryConfiguration" });
  }
}
function __c114(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ lambda: S.String })]);
    case 1:
      return S.suspend(() => S.Struct({ executor: S.optional(__S(3648, __c114, 0)) })).annotate({
        identifier: "CustomOrchestration",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          agentId: S.String,
          agentName: S.String,
          agentArn: S.String,
          agentVersion: S.optional(S.String),
          clientToken: S.optional(S.String),
          instruction: S.optional(SensitiveString),
          agentStatus: S.String,
          foundationModel: S.optional(S.String),
          description: S.optional(S.String),
          orchestrationType: S.optional(S.String),
          customOrchestration: S.optional(__S(3649, __c114, 1)),
          idleSessionTTLInSeconds: S.Number,
          agentResourceRoleArn: S.String,
          customerEncryptionKeyArn: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          preparedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          failureReasons: S.optional(__S(3552, __c111, 0)),
          recommendedActions: S.optional(__S(3552, __c111, 0)),
          promptOverrideConfiguration: S.optional(__S(3619, __c113, 3)),
          guardrailConfiguration: S.optional(__S(3584, __c112, 0)),
          memoryConfiguration: S.optional(__S(3622, __c113, 6)),
          agentCollaboration: S.optional(S.String),
        }),
      ).annotate({ identifier: "Agent" });
    case 3:
      return S.suspend(() => S.Struct({ agent: __S(3650, __c114, 2) })).annotate({
        identifier: "CreateAgentResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
