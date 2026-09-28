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
  sdkId: "Bedrock Agent",
  target: "AmazonBedrockAgentBuildTimeLambda",
  version: "2023-06-05",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://bedrock-agent.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://bedrock-agent.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
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
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
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
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type Id = string;
export type DraftVersion = string;
export type AgentAliasArn = string;
export interface AgentDescriptor {
  aliasArn?: string;
}
export type Name = string;
export type CollaborationInstruction = string | redacted.Redacted<string>;
export type RelayConversationHistory =
  | "TO_COLLABORATOR"
  | "DISABLED"
  | (string & {});
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
export type OrchestrationType =
  | "DEFAULT"
  | "CUSTOM_ORCHESTRATION"
  | (string & {});
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
export type AgentCollaboration =
  | "SUPERVISOR"
  | "SUPERVISOR_ROUTER"
  | "DISABLED"
  | (string & {});
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
export type Type =
  | "string"
  | "number"
  | "integer"
  | "boolean"
  | "array"
  | (string & {});
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
export type AgentAliasRoutingConfiguration =
  AgentAliasRoutingConfigurationListItem[];
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
export type AliasInvocationState =
  | "ACCEPT_INVOCATIONS"
  | "REJECT_INVOCATIONS"
  | (string & {});
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
export type ConfluenceAuthType =
  | "BASIC"
  | "OAUTH2_CLIENT_CREDENTIALS"
  | (string & {});
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
export type ChunkingStrategy =
  | "FIXED_SIZE"
  | "NONE"
  | "HIERARCHICAL"
  | "SEMANTIC"
  | (string & {});
export interface FixedSizeChunkingConfiguration {
  maxTokens: number;
  overlapPercentage: number;
}
export interface HierarchicalChunkingLevelConfiguration {
  maxTokens: number;
}
export type HierarchicalChunkingLevelConfigurations =
  HierarchicalChunkingLevelConfiguration[];
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
export type EnrichmentStrategyMethod =
  | "CHUNK_ENTITY_EXTRACTION"
  | (string & {});
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
export type PromptInferenceConfiguration = {
  text: PromptModelInferenceConfiguration;
};
export type VectorSearchRerankingConfigurationType =
  | "BEDROCK_RERANKING_MODEL"
  | (string & {});
export type BedrockRerankingModelArn = string;
export type AdditionalModelRequestFieldsKey = string;
export type AdditionalModelRequestFieldsValue = unknown;
export type AdditionalModelRequestFields = { [key: string]: any | undefined };
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
export type StorageFlowNodeServiceConfiguration = {
  s3: StorageFlowNodeS3Configuration;
};
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
export type RetrievalFlowNodeServiceConfiguration = {
  s3: RetrievalFlowNodeS3Configuration;
};
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
export type FlowStatus =
  | "Failed"
  | "Prepared"
  | "Preparing"
  | "NotPrepared"
  | (string & {});
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
export type FlowAliasRoutingConfiguration =
  FlowAliasRoutingConfigurationListItem[];
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
export type KnowledgeBaseType =
  | "VECTOR"
  | "KENDRA"
  | "SQL"
  | "MANAGED"
  | (string & {});
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
}
export interface EmbeddingModelConfiguration {
  bedrockEmbeddingModelConfiguration?: BedrockEmbeddingModelConfiguration;
}
export type SupplementalDataStorageLocationType = "S3" | (string & {});
export interface SupplementalDataStorageLocation {
  type: SupplementalDataStorageLocationType;
  s3Location?: S3Location;
}
export type SupplementalDataStorageLocations =
  SupplementalDataStorageLocation[];
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
}
export type KendraIndexArn = string;
export interface KendraKnowledgeBaseConfiguration {
  kendraIndexArn: string;
}
export type QueryEngineType = "REDSHIFT" | (string & {});
export type RedshiftQueryEngineStorageType =
  | "REDSHIFT"
  | "AWS_DATA_CATALOG"
  | (string & {});
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
export type RedshiftQueryEngineStorageConfigurations =
  RedshiftQueryEngineStorageConfiguration[];
export type RedshiftQueryEngineType =
  | "SERVERLESS"
  | "PROVISIONED"
  | (string & {});
export type WorkgroupArn = string;
export type RedshiftServerlessAuthType =
  | "IAM"
  | "USERNAME_PASSWORD"
  | (string & {});
export interface RedshiftServerlessAuthConfiguration {
  type: RedshiftServerlessAuthType;
  usernamePasswordSecretArn?: string;
}
export interface RedshiftServerlessConfiguration {
  workgroupArn: string;
  authConfiguration: RedshiftServerlessAuthConfiguration;
}
export type RedshiftClusterIdentifier = string;
export type RedshiftProvisionedAuthType =
  | "IAM"
  | "USERNAME_PASSWORD"
  | "USERNAME"
  | (string & {});
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
export type OpenSearchManagedClusterIndexName =
  | string
  | redacted.Redacted<string>;
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
export type MetadataSourceType =
  | "IN_LINE_ATTRIBUTE"
  | "S3_LOCATION"
  | (string & {});
export type Key = string | redacted.Redacted<string>;
export type MetadataValueType =
  | "BOOLEAN"
  | "NUMBER"
  | "STRING"
  | "STRING_LIST"
  | (string & {});
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
export type IngestionJobSortByAttribute =
  | "STATUS"
  | "STARTED_AT"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "PUT /agents/{agentId}/agentversions/{agentVersion}/agentcollaborators/",
    input: {
      agentId: 0,
      agentVersion: 0,
      agentDescriptor: i_AgentDescriptor,
      collaboratorName: 0,
      collaborationInstruction: 0,
      relayConversationHistory: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { agentCollaborator: o_AgentCollaborator },
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
  operationName: "AssociateAgentCollaborator",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /agents/{agentId}/agentversions/{agentVersion}/knowledgebases/",
    input: {
      agentId: 0,
      agentVersion: 0,
      knowledgeBaseId: 0,
      description: 0,
      knowledgeBaseState: 0,
    },
    output: { agentKnowledgeBase: o_AgentKnowledgeBase },
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
  operationName: "AssociateAgentKnowledgeBase",
})) as any;

export type CreateAgentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates an agent that orchestrates interactions between foundation models, data sources, software applications, user conversations, and APIs to carry out tasks to help customers.
 *
 * - Specify the following fields for security purposes.
 *
 * - `agentResourceRoleArn` – The Amazon Resource Name (ARN) of the role with permissions to invoke API operations on an agent.
 *
 * - (Optional) `customerEncryptionKeyArn` – The Amazon Resource Name (ARN) of a KMS key to encrypt the creation of the agent.
 *
 * - (Optional) `idleSessionTTLinSeconds` – Specify the number of seconds for which the agent should maintain session information. After this time expires, the subsequent `InvokeAgent` request begins a new session.
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
  descriptor: {
    service: svc,
    http: "PUT /agents/",
    input: {
      agentName: 0,
      clientToken: D.m({ idempotency: true }),
      instruction: 0,
      foundationModel: 0,
      description: 0,
      orchestrationType: 0,
      customOrchestration: i_CustomOrchestration,
      idleSessionTTLInSeconds: 0,
      agentResourceRoleArn: 0,
      customerEncryptionKeyArn: 0,
      tags: 0,
      promptOverrideConfiguration: i_PromptOverrideConfiguration,
      guardrailConfiguration: i_GuardrailConfiguration,
      memoryConfiguration: i_MemoryConfiguration,
      agentCollaboration: 0,
    },
    output: { agent: o_Agent },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /agents/{agentId}/agentversions/{agentVersion}/actiongroups/",
    input: {
      agentId: 0,
      agentVersion: 0,
      actionGroupName: 0,
      clientToken: D.m({ idempotency: true }),
      description: 0,
      parentActionGroupSignature: 0,
      parentActionGroupSignatureParams: 0,
      actionGroupExecutor: i_ActionGroupExecutor,
      apiSchema: i_APISchema,
      actionGroupState: 0,
      functionSchema: i_FunctionSchema,
    },
    output: { agentActionGroup: o_AgentActionGroup },
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
  operationName: "CreateAgentActionGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /agents/{agentId}/agentaliases/",
    input: {
      agentId: 0,
      agentAliasName: 0,
      clientToken: D.m({ idempotency: true }),
      description: 0,
      routingConfiguration: D.list(i_AgentAliasRoutingConfigurationListItem),
      tags: 0,
    },
    output: { agentAlias: o_AgentAlias },
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
  operationName: "CreateAgentAlias",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /knowledgebases/{knowledgeBaseId}/datasources/",
    input: {
      knowledgeBaseId: 0,
      clientToken: D.m({ idempotency: true }),
      name: 0,
      description: 0,
      dataSourceConfiguration: i_DataSourceConfiguration,
      dataDeletionPolicy: 0,
      serverSideEncryptionConfiguration: i_ServerSideEncryptionConfiguration,
      vectorIngestionConfiguration: i_VectorIngestionConfiguration,
    },
    output: { dataSource: o_DataSource },
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
  operationName: "CreateDataSource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /flows/",
    input: {
      name: 0,
      description: 0,
      executionRoleArn: 0,
      customerEncryptionKeyArn: 0,
      definition: i_FlowDefinition,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts, definition: o_FlowDefinition },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /flows/{flowIdentifier}/aliases",
    input: {
      name: 0,
      description: 0,
      routingConfiguration: D.list(i_FlowAliasRoutingConfigurationListItem),
      concurrencyConfiguration: i_FlowAliasConcurrencyConfiguration,
      flowIdentifier: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "CreateFlowAlias",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /flows/{flowIdentifier}/versions",
    input: {
      flowIdentifier: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { createdAt: D.ts, definition: o_FlowDefinition },
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
  operationName: "CreateFlowVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /knowledgebases/",
    input: {
      clientToken: D.m({ idempotency: true }),
      name: 0,
      description: 0,
      roleArn: 0,
      knowledgeBaseConfiguration: i_KnowledgeBaseConfiguration,
      storageConfiguration: i_StorageConfiguration,
      tags: 0,
    },
    output: { knowledgeBase: o_KnowledgeBase },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prompts/",
    input: {
      name: 0,
      description: 0,
      customerEncryptionKeyArn: 0,
      defaultVariant: 0,
      variants: D.list(i_PromptVariant),
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: {
      variants: D.list(o_PromptVariant),
      createdAt: D.ts,
      updatedAt: D.ts,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /prompts/{promptIdentifier}/versions",
    input: {
      promptIdentifier: 0,
      description: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: {
      variants: D.list(o_PromptVariant),
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePromptVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /agents/{agentId}/",
    input: {
      agentId: 0,
      skipResourceInUseCheck: D.m({ query: "skipResourceInUseCheck" }),
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
  operationName: "DeleteAgent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /agents/{agentId}/agentversions/{agentVersion}/actiongroups/{actionGroupId}/",
    input: {
      agentId: 0,
      agentVersion: 0,
      actionGroupId: 0,
      skipResourceInUseCheck: D.m({ query: "skipResourceInUseCheck" }),
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
  operationName: "DeleteAgentActionGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /agents/{agentId}/agentaliases/{agentAliasId}/",
    input: { agentId: 0, agentAliasId: 0 },
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
  operationName: "DeleteAgentAlias",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /agents/{agentId}/agentversions/{agentVersion}/",
    input: {
      agentId: 0,
      agentVersion: 0,
      skipResourceInUseCheck: D.m({ query: "skipResourceInUseCheck" }),
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
  operationName: "DeleteAgentVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}",
    input: { knowledgeBaseId: 0, dataSourceId: 0 },
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
  operationName: "DeleteDataSource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /flows/{flowIdentifier}/",
    input: {
      flowIdentifier: 0,
      skipResourceInUseCheck: D.m({ query: "skipResourceInUseCheck" }),
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
  operationName: "DeleteFlow",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /flows/{flowIdentifier}/aliases/{aliasIdentifier}",
    input: { flowIdentifier: 0, aliasIdentifier: 0 },
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
  operationName: "DeleteFlowAlias",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /flows/{flowIdentifier}/versions/{flowVersion}/",
    input: {
      flowIdentifier: 0,
      flowVersion: 0,
      skipResourceInUseCheck: D.m({ query: "skipResourceInUseCheck" }),
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
  operationName: "DeleteFlowVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /knowledgebases/{knowledgeBaseId}",
    input: { knowledgeBaseId: 0 },
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
  operationName: "DeleteKnowledgeBase",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/documents/deleteDocuments",
    input: {
      knowledgeBaseId: 0,
      dataSourceId: 0,
      clientToken: D.m({ idempotency: true }),
      documentIdentifiers: D.list(i_DocumentIdentifier),
    },
    output: { documentDetails: D.list(o_KnowledgeBaseDocumentDetail) },
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
  operationName: "DeleteKnowledgeBaseDocuments",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /prompts/{promptIdentifier}/",
    input: {
      promptIdentifier: 0,
      promptVersion: D.m({ query: "promptVersion" }),
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
  operationName: "DeletePrompt",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /resourcepolicy/{resourceArn}",
    input: {
      resourceArn: 0,
      expectedRevisionId: D.m({ query: "expectedRevisionId" }),
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
  operationName: "DeleteResourcePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /agents/{agentId}/agentversions/{agentVersion}/agentcollaborators/{collaboratorId}/",
    input: { agentId: 0, agentVersion: 0, collaboratorId: 0 },
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
  operationName: "DisassociateAgentCollaborator",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /agents/{agentId}/agentversions/{agentVersion}/knowledgebases/{knowledgeBaseId}/",
    input: { agentId: 0, agentVersion: 0, knowledgeBaseId: 0 },
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
  operationName: "DisassociateAgentKnowledgeBase",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /agents/{agentId}/",
    input: { agentId: 0 },
    output: { agent: o_Agent },
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
  operationName: "GetAgent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /agents/{agentId}/agentversions/{agentVersion}/actiongroups/{actionGroupId}/",
    input: { agentId: 0, agentVersion: 0, actionGroupId: 0 },
    output: { agentActionGroup: o_AgentActionGroup },
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
  operationName: "GetAgentActionGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /agents/{agentId}/agentaliases/{agentAliasId}/",
    input: { agentId: 0, agentAliasId: 0 },
    output: { agentAlias: o_AgentAlias },
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
  operationName: "GetAgentAlias",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /agents/{agentId}/agentversions/{agentVersion}/agentcollaborators/{collaboratorId}/",
    input: { agentId: 0, agentVersion: 0, collaboratorId: 0 },
    output: { agentCollaborator: o_AgentCollaborator },
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
  operationName: "GetAgentCollaborator",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /agents/{agentId}/agentversions/{agentVersion}/knowledgebases/{knowledgeBaseId}/",
    input: { agentId: 0, agentVersion: 0, knowledgeBaseId: 0 },
    output: { agentKnowledgeBase: o_AgentKnowledgeBase },
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
  operationName: "GetAgentKnowledgeBase",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /agents/{agentId}/agentversions/{agentVersion}/",
    input: { agentId: 0, agentVersion: 0 },
    output: {
      agentVersion: {
        instruction: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
        promptOverrideConfiguration: o_PromptOverrideConfiguration,
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
  operationName: "GetAgentVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}",
    input: { knowledgeBaseId: 0, dataSourceId: 0 },
    output: { dataSource: o_DataSource },
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
  operationName: "GetDataSource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /flows/{flowIdentifier}/",
    input: { flowIdentifier: 0, includedData: D.m({ query: "includedData" }) },
    output: {
      createdAt: D.ts,
      updatedAt: D.ts,
      definition: o_FlowDefinition,
      validations: D.list(o_FlowValidation),
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
  operationName: "GetFlow",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /flows/{flowIdentifier}/aliases/{aliasIdentifier}",
    input: { flowIdentifier: 0, aliasIdentifier: 0 },
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
  operationName: "GetFlowAlias",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /flows/{flowIdentifier}/versions/{flowVersion}/",
    input: {
      flowIdentifier: 0,
      flowVersion: 0,
      includedData: D.m({ query: "includedData" }),
    },
    output: { createdAt: D.ts, definition: o_FlowDefinition },
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
  operationName: "GetFlowVersion",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/ingestionjobs/{ingestionJobId}",
    input: { knowledgeBaseId: 0, dataSourceId: 0, ingestionJobId: 0 },
    output: { ingestionJob: o_IngestionJob },
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
  operationName: "GetIngestionJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /knowledgebases/{knowledgeBaseId}",
    input: { knowledgeBaseId: 0 },
    output: { knowledgeBase: o_KnowledgeBase },
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
  operationName: "GetKnowledgeBase",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/documents/getDocuments",
    input: {
      knowledgeBaseId: 0,
      dataSourceId: 0,
      documentIdentifiers: D.list(i_DocumentIdentifier),
    },
    output: { documentDetails: D.list(o_KnowledgeBaseDocumentDetail) },
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
  operationName: "GetKnowledgeBaseDocuments",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /prompts/{promptIdentifier}/",
    input: {
      promptIdentifier: 0,
      promptVersion: D.m({ query: "promptVersion" }),
      includedData: D.m({ query: "includedData" }),
    },
    output: {
      variants: D.list(o_PromptVariant),
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
  operationName: "GetPrompt",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /resourcepolicy/{resourceArn}",
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
  descriptor: {
    service: svc,
    http: "PUT /knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/documents",
    input: {
      knowledgeBaseId: 0,
      dataSourceId: 0,
      clientToken: D.m({ idempotency: true }),
      documents: D.list({
        metadata: {
          type: 0,
          inlineAttributes: D.list({
            key: 0,
            value: {
              type: 0,
              numberValue: 0,
              booleanValue: 0,
              stringValue: 0,
              stringListValue: 0,
            },
          }),
          s3Location: i_CustomS3Location,
          accessControlList: D.list({ name: 0, type: 0, access: 0 }),
        },
        content: {
          dataSourceType: 0,
          custom: {
            customDocumentIdentifier: i_CustomDocumentIdentifier,
            sourceType: 0,
            s3Location: i_CustomS3Location,
            inlineContent: {
              type: 0,
              byteContent: { mimeType: 0, data: 0 },
              textContent: { data: 0 },
            },
          },
          s3: { s3Location: i_S3Location },
        },
      }),
    },
    output: { documentDetails: D.list(o_KnowledgeBaseDocumentDetail) },
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
  operationName: "IngestKnowledgeBaseDocuments",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /agents/{agentId}/agentversions/{agentVersion}/actiongroups/",
    input: { agentId: 0, agentVersion: 0, maxResults: 0, nextToken: 0 },
    output: { actionGroupSummaries: D.list({ updatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "POST /agents/{agentId}/agentaliases/",
    input: { agentId: 0, maxResults: 0, nextToken: 0 },
    output: {
      agentAliasSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    http: "POST /agents/{agentId}/agentversions/{agentVersion}/agentcollaborators/",
    input: { agentId: 0, agentVersion: 0, maxResults: 0, nextToken: 0 },
    output: {
      agentCollaboratorSummaries: D.list({
        collaborationInstruction: D.secret,
        createdAt: D.ts,
        lastUpdatedAt: D.ts,
      }),
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
  descriptor: {
    service: svc,
    http: "POST /agents/{agentId}/agentversions/{agentVersion}/knowledgebases/",
    input: { agentId: 0, agentVersion: 0, maxResults: 0, nextToken: 0 },
    output: { agentKnowledgeBaseSummaries: D.list({ updatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "POST /agents/",
    input: { maxResults: 0, nextToken: 0 },
    output: { agentSummaries: D.list({ updatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "POST /agents/{agentId}/agentversions/",
    input: { agentId: 0, maxResults: 0, nextToken: 0 },
    output: {
      agentVersionSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    http: "POST /knowledgebases/{knowledgeBaseId}/datasources/",
    input: { knowledgeBaseId: 0, maxResults: 0, nextToken: 0 },
    output: { dataSourceSummaries: D.list({ updatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "GET /flows/{flowIdentifier}/aliases",
    input: {
      flowIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      flowAliasSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    http: "GET /flows/",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { flowSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
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
  descriptor: {
    service: svc,
    http: "GET /flows/{flowIdentifier}/versions",
    input: {
      flowIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { flowVersionSummaries: D.list({ createdAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "POST /knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/ingestionjobs/",
    input: {
      knowledgeBaseId: 0,
      dataSourceId: 0,
      filters: D.list({ attribute: 0, operator: 0, values: 0 }),
      sortBy: { attribute: 0, order: 0 },
      maxResults: 0,
      nextToken: 0,
    },
    output: {
      ingestionJobSummaries: D.list({ startedAt: D.ts, updatedAt: D.ts }),
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
  descriptor: {
    service: svc,
    http: "POST /knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/documents",
    input: { knowledgeBaseId: 0, dataSourceId: 0, maxResults: 0, nextToken: 0 },
    output: { documentDetails: D.list(o_KnowledgeBaseDocumentDetail) },
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
  descriptor: {
    service: svc,
    http: "POST /knowledgebases/",
    input: { maxResults: 0, nextToken: 0 },
    output: { knowledgeBaseSummaries: D.list({ updatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "GET /prompts/",
    input: {
      promptIdentifier: D.m({ query: "promptIdentifier" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { promptSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
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
  descriptor: {
    service: svc,
    http: "POST /agents/{agentId}/",
    input: { agentId: 0 },
    output: { preparedAt: D.ts },
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
  operationName: "PrepareAgent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /flows/{flowIdentifier}/",
    input: { flowIdentifier: 0 },
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
  operationName: "PrepareFlow",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /resourcepolicy/{resourceArn}",
    input: { resourceArn: 0, policy: 0, expectedRevisionId: 0 },
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
  operationName: "PutResourcePolicy",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/ingestionjobs/",
    input: {
      knowledgeBaseId: 0,
      dataSourceId: 0,
      clientToken: D.m({ idempotency: true }),
      description: 0,
    },
    output: { ingestionJob: o_IngestionJob },
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
  operationName: "StartIngestionJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/ingestionjobs/{ingestionJobId}/stop",
    input: { knowledgeBaseId: 0, dataSourceId: 0, ingestionJobId: 0 },
    output: { ingestionJob: o_IngestionJob },
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
  operationName: "StopIngestionJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
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
 * Remove tags from a resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
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
  descriptor: {
    service: svc,
    http: "PUT /agents/{agentId}/",
    input: {
      agentId: 0,
      agentName: 0,
      instruction: 0,
      foundationModel: 0,
      description: 0,
      orchestrationType: 0,
      customOrchestration: i_CustomOrchestration,
      idleSessionTTLInSeconds: 0,
      agentResourceRoleArn: 0,
      customerEncryptionKeyArn: 0,
      promptOverrideConfiguration: i_PromptOverrideConfiguration,
      guardrailConfiguration: i_GuardrailConfiguration,
      memoryConfiguration: i_MemoryConfiguration,
      agentCollaboration: 0,
    },
    output: { agent: o_Agent },
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
  operationName: "UpdateAgent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /agents/{agentId}/agentversions/{agentVersion}/actiongroups/{actionGroupId}/",
    input: {
      agentId: 0,
      agentVersion: 0,
      actionGroupId: 0,
      actionGroupName: 0,
      description: 0,
      parentActionGroupSignature: 0,
      parentActionGroupSignatureParams: 0,
      actionGroupExecutor: i_ActionGroupExecutor,
      actionGroupState: 0,
      apiSchema: i_APISchema,
      functionSchema: i_FunctionSchema,
    },
    output: { agentActionGroup: o_AgentActionGroup },
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
  operationName: "UpdateAgentActionGroup",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /agents/{agentId}/agentaliases/{agentAliasId}/",
    input: {
      agentId: 0,
      agentAliasId: 0,
      agentAliasName: 0,
      description: 0,
      routingConfiguration: D.list(i_AgentAliasRoutingConfigurationListItem),
      aliasInvocationState: 0,
    },
    output: { agentAlias: o_AgentAlias },
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
  operationName: "UpdateAgentAlias",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /agents/{agentId}/agentversions/{agentVersion}/agentcollaborators/{collaboratorId}/",
    input: {
      agentId: 0,
      agentVersion: 0,
      collaboratorId: 0,
      agentDescriptor: i_AgentDescriptor,
      collaboratorName: 0,
      collaborationInstruction: 0,
      relayConversationHistory: 0,
    },
    output: { agentCollaborator: o_AgentCollaborator },
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
  operationName: "UpdateAgentCollaborator",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /agents/{agentId}/agentversions/{agentVersion}/knowledgebases/{knowledgeBaseId}/",
    input: {
      agentId: 0,
      agentVersion: 0,
      knowledgeBaseId: 0,
      description: 0,
      knowledgeBaseState: 0,
    },
    output: { agentKnowledgeBase: o_AgentKnowledgeBase },
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
  operationName: "UpdateAgentKnowledgeBase",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}",
    input: {
      knowledgeBaseId: 0,
      dataSourceId: 0,
      name: 0,
      description: 0,
      dataSourceConfiguration: i_DataSourceConfiguration,
      dataDeletionPolicy: 0,
      serverSideEncryptionConfiguration: i_ServerSideEncryptionConfiguration,
      vectorIngestionConfiguration: i_VectorIngestionConfiguration,
    },
    output: { dataSource: o_DataSource },
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
  operationName: "UpdateDataSource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /flows/{flowIdentifier}/",
    input: {
      name: 0,
      description: 0,
      executionRoleArn: 0,
      customerEncryptionKeyArn: 0,
      definition: i_FlowDefinition,
      flowIdentifier: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts, definition: o_FlowDefinition },
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
  operationName: "UpdateFlow",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /flows/{flowIdentifier}/aliases/{aliasIdentifier}",
    input: {
      name: 0,
      description: 0,
      routingConfiguration: D.list(i_FlowAliasRoutingConfigurationListItem),
      concurrencyConfiguration: i_FlowAliasConcurrencyConfiguration,
      flowIdentifier: 0,
      aliasIdentifier: 0,
    },
    output: { createdAt: D.ts, updatedAt: D.ts },
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
  operationName: "UpdateFlowAlias",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /knowledgebases/{knowledgeBaseId}",
    input: {
      knowledgeBaseId: 0,
      name: 0,
      description: 0,
      roleArn: 0,
      knowledgeBaseConfiguration: i_KnowledgeBaseConfiguration,
      storageConfiguration: i_StorageConfiguration,
    },
    output: { knowledgeBase: o_KnowledgeBase },
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
  operationName: "UpdateKnowledgeBase",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /prompts/{promptIdentifier}/",
    input: {
      name: 0,
      description: 0,
      customerEncryptionKeyArn: 0,
      defaultVariant: 0,
      variants: D.list(i_PromptVariant),
      promptIdentifier: 0,
    },
    output: {
      variants: D.list(o_PromptVariant),
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdatePrompt",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /flows/validate-definition",
    input: { definition: i_FlowDefinition },
    output: { validations: D.list(o_FlowValidation) },
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
  operationName: "ValidateFlowDefinition",
})) as any;

const i_APISchema: D.LazyStruct = () => ({
  s3: { s3BucketName: 0, s3ObjectKey: 0 },
  payload: 0,
});
const i_ActionGroupExecutor: D.LazyStruct = () => ({
  lambda: 0,
  customControl: 0,
});
const i_AgentAliasRoutingConfigurationListItem: D.LazyStruct = () => ({
  agentVersion: 0,
  provisionedThroughput: 0,
});
const i_AgentDescriptor: D.LazyStruct = () => ({ aliasArn: 0 });
const i_CustomDocumentIdentifier: D.LazyStruct = () => ({ id: 0 });
const i_CustomOrchestration: D.LazyStruct = () => ({ executor: { lambda: 0 } });
const i_CustomS3Location: D.LazyStruct = () => ({
  uri: 0,
  bucketOwnerAccountId: 0,
});
const i_DataSourceConfiguration: D.LazyStruct = () => ({
  type: 0,
  managedKnowledgeBaseConnectorConfiguration: {
    deletionProtectionConfiguration: {
      deletionProtectionStatus: 0,
      deletionProtectionThreshold: 0,
    },
    mediaExtractionConfiguration: {
      imageExtractionConfiguration: { imageExtractionStatus: 0 },
      audioExtractionConfiguration: { audioExtractionStatus: 0 },
      videoExtractionConfiguration: { videoExtractionStatus: 0 },
    },
    connectorParameters: 0,
    syncSchedule: {
      daily: {},
      weekly: { dayOfWeek: 0 },
      monthly: { dayOfMonth: { dayNumber: 0, lastDayOfMonth: {} } },
    },
  },
  s3Configuration: {
    bucketArn: 0,
    inclusionPrefixes: 0,
    bucketOwnerAccountId: 0,
  },
  webConfiguration: {
    sourceConfiguration: { urlConfiguration: { seedUrls: D.list({ url: 0 }) } },
    crawlerConfiguration: {
      crawlerLimits: { rateLimit: 0, maxPages: 0 },
      inclusionFilters: 0,
      exclusionFilters: 0,
      scope: 0,
      userAgent: 0,
      userAgentHeader: 0,
    },
  },
  confluenceConfiguration: {
    sourceConfiguration: {
      hostUrl: 0,
      hostType: 0,
      authType: 0,
      credentialsSecretArn: 0,
    },
    crawlerConfiguration: { filterConfiguration: i_CrawlFilterConfiguration },
  },
  salesforceConfiguration: {
    sourceConfiguration: { hostUrl: 0, authType: 0, credentialsSecretArn: 0 },
    crawlerConfiguration: { filterConfiguration: i_CrawlFilterConfiguration },
  },
  sharePointConfiguration: {
    sourceConfiguration: {
      tenantId: 0,
      domain: 0,
      siteUrls: 0,
      hostType: 0,
      authType: 0,
      credentialsSecretArn: 0,
    },
    crawlerConfiguration: { filterConfiguration: i_CrawlFilterConfiguration },
  },
});
const i_DocumentIdentifier: D.LazyStruct = () => ({
  dataSourceType: 0,
  s3: i_S3Location,
  custom: i_CustomDocumentIdentifier,
});
const i_FlowAliasConcurrencyConfiguration: D.LazyStruct = () => ({
  type: 0,
  maxConcurrency: 0,
});
const i_FlowAliasRoutingConfigurationListItem: D.LazyStruct = () => ({
  flowVersion: 0,
});
const i_FlowDefinition: D.LazyStruct = () => ({
  nodes: D.list({
    name: 0,
    type: 0,
    configuration: {
      input: {},
      output: {},
      knowledgeBase: {
        knowledgeBaseId: 0,
        modelId: 0,
        guardrailConfiguration: i_GuardrailConfiguration,
        numberOfResults: 0,
        promptTemplate: i_KnowledgeBasePromptTemplate,
        inferenceConfiguration: i_PromptInferenceConfiguration,
        rerankingConfiguration: {
          type: 0,
          bedrockRerankingConfiguration: {
            modelConfiguration: {
              modelArn: 0,
              additionalModelRequestFields: 0,
            },
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
        orchestrationConfiguration: {
          promptTemplate: i_KnowledgeBasePromptTemplate,
          inferenceConfig: i_PromptInferenceConfiguration,
          additionalModelRequestFields: 0,
          performanceConfig: { latency: 0 },
        },
      },
      condition: { conditions: D.list(i_FlowCondition) },
      lex: { botAliasArn: 0, localeId: 0 },
      prompt: {
        sourceConfiguration: {
          resource: { promptArn: 0 },
          inline: {
            templateType: 0,
            templateConfiguration: i_PromptTemplateConfiguration,
            modelId: 0,
            inferenceConfiguration: i_PromptInferenceConfiguration,
            additionalModelRequestFields: 0,
          },
        },
        guardrailConfiguration: i_GuardrailConfiguration,
      },
      lambdaFunction: { lambdaArn: 0 },
      storage: { serviceConfiguration: { s3: { bucketName: 0 } } },
      agent: { agentAliasArn: 0 },
      retrieval: { serviceConfiguration: { s3: { bucketName: 0 } } },
      iterator: {},
      collector: {},
      inlineCode: { code: 0, language: 0 },
      loop: { definition: i_FlowDefinition },
      loopInput: {},
      loopController: { continueCondition: i_FlowCondition, maxIterations: 0 },
    },
    inputs: D.list({ name: 0, type: 0, expression: 0, category: 0 }),
    outputs: D.list({ name: 0, type: 0 }),
  }),
  connections: D.list({
    type: 0,
    name: 0,
    source: 0,
    target: 0,
    configuration: {
      data: { sourceOutput: 0, targetInput: 0 },
      conditional: { condition: 0 },
    },
  }),
});
const i_FunctionSchema: D.LazyStruct = () => ({
  functions: D.list({
    name: 0,
    description: 0,
    parameters: D.map({ description: 0, type: 0, required: 0 }),
    requireConfirmation: 0,
  }),
});
const i_GuardrailConfiguration: D.LazyStruct = () => ({
  guardrailIdentifier: 0,
  guardrailVersion: 0,
});
const i_KnowledgeBaseConfiguration: D.LazyStruct = () => ({
  type: 0,
  vectorKnowledgeBaseConfiguration: {
    embeddingModelArn: 0,
    embeddingModelConfiguration: i_EmbeddingModelConfiguration,
    supplementalDataStorageConfiguration: {
      storageLocations: D.list({ type: 0, s3Location: i_S3Location }),
    },
  },
  managedKnowledgeBaseConfiguration: {
    embeddingModelType: 0,
    embeddingModelArn: 0,
    embeddingModelConfiguration: i_EmbeddingModelConfiguration,
    serverSideEncryptionConfiguration: i_ServerSideEncryptionConfiguration,
  },
  kendraKnowledgeBaseConfiguration: { kendraIndexArn: 0 },
  sqlKnowledgeBaseConfiguration: {
    type: 0,
    redshiftConfiguration: {
      storageConfigurations: D.list({
        type: 0,
        awsDataCatalogConfiguration: { tableNames: 0 },
        redshiftConfiguration: { databaseName: 0 },
      }),
      queryEngineConfiguration: {
        type: 0,
        serverlessConfiguration: {
          workgroupArn: 0,
          authConfiguration: { type: 0, usernamePasswordSecretArn: 0 },
        },
        provisionedConfiguration: {
          clusterIdentifier: 0,
          authConfiguration: {
            type: 0,
            databaseUser: 0,
            usernamePasswordSecretArn: 0,
          },
        },
      },
      queryGenerationConfiguration: {
        executionTimeoutSeconds: 0,
        generationContext: {
          tables: D.list({
            name: 0,
            description: 0,
            inclusion: 0,
            columns: D.list({ name: 0, description: 0, inclusion: 0 }),
          }),
          curatedQueries: D.list({ naturalLanguage: 0, sql: 0 }),
        },
      },
    },
  },
});
const i_MemoryConfiguration: D.LazyStruct = () => ({
  enabledMemoryTypes: 0,
  storageDays: 0,
  sessionSummaryConfiguration: { maxRecentSessions: 0 },
});
const i_PromptOverrideConfiguration: D.LazyStruct = () => ({
  promptConfigurations: D.list({
    promptType: 0,
    promptCreationMode: 0,
    promptState: 0,
    basePromptTemplate: 0,
    inferenceConfiguration: {
      temperature: 0,
      topP: 0,
      topK: 0,
      maximumLength: 0,
      stopSequences: 0,
    },
    parserMode: 0,
    foundationModel: 0,
    additionalModelRequestFields: 0,
  }),
  overrideLambda: 0,
});
const i_PromptVariant: D.LazyStruct = () => ({
  name: 0,
  templateType: 0,
  templateConfiguration: i_PromptTemplateConfiguration,
  modelId: 0,
  inferenceConfiguration: i_PromptInferenceConfiguration,
  metadata: D.list({ key: 0, value: 0 }),
  additionalModelRequestFields: 0,
  genAiResource: { agent: { agentIdentifier: 0 } },
});
const i_S3Location: D.LazyStruct = () => ({ uri: 0 });
const i_ServerSideEncryptionConfiguration: D.LazyStruct = () => ({
  kmsKeyArn: 0,
});
const i_StorageConfiguration: D.LazyStruct = () => ({
  type: 0,
  opensearchServerlessConfiguration: {
    collectionArn: 0,
    vectorIndexName: 0,
    fieldMapping: { vectorField: 0, textField: 0, metadataField: 0 },
  },
  opensearchManagedClusterConfiguration: {
    domainEndpoint: 0,
    domainArn: 0,
    vectorIndexName: 0,
    fieldMapping: { vectorField: 0, textField: 0, metadataField: 0 },
  },
  pineconeConfiguration: {
    connectionString: 0,
    credentialsSecretArn: 0,
    namespace: 0,
    fieldMapping: { textField: 0, metadataField: 0 },
  },
  redisEnterpriseCloudConfiguration: {
    endpoint: 0,
    vectorIndexName: 0,
    credentialsSecretArn: 0,
    fieldMapping: { vectorField: 0, textField: 0, metadataField: 0 },
  },
  rdsConfiguration: {
    resourceArn: 0,
    credentialsSecretArn: 0,
    databaseName: 0,
    tableName: 0,
    fieldMapping: {
      primaryKeyField: 0,
      vectorField: 0,
      textField: 0,
      metadataField: 0,
      customMetadataField: 0,
    },
  },
  mongoDbAtlasConfiguration: {
    endpoint: 0,
    databaseName: 0,
    collectionName: 0,
    vectorIndexName: 0,
    credentialsSecretArn: 0,
    fieldMapping: { vectorField: 0, textField: 0, metadataField: 0 },
    endpointServiceName: 0,
    textIndexName: 0,
  },
  neptuneAnalyticsConfiguration: {
    graphArn: 0,
    fieldMapping: { textField: 0, metadataField: 0 },
  },
  s3VectorsConfiguration: { vectorBucketArn: 0, indexArn: 0, indexName: 0 },
});
const i_VectorIngestionConfiguration: D.LazyStruct = () => ({
  chunkingConfiguration: {
    chunkingStrategy: 0,
    fixedSizeChunkingConfiguration: { maxTokens: 0, overlapPercentage: 0 },
    hierarchicalChunkingConfiguration: {
      levelConfigurations: D.list({ maxTokens: 0 }),
      overlapTokens: 0,
    },
    semanticChunkingConfiguration: {
      maxTokens: 0,
      bufferSize: 0,
      breakpointPercentileThreshold: 0,
    },
  },
  customTransformationConfiguration: {
    intermediateStorage: { s3Location: i_S3Location },
    transformations: D.list({
      transformationFunction: {
        transformationLambdaConfiguration: { lambdaArn: 0 },
      },
      stepToApply: 0,
    }),
  },
  parsingConfiguration: {
    parsingStrategy: 0,
    bedrockFoundationModelConfiguration: {
      modelArn: 0,
      parsingPrompt: { parsingPromptText: 0 },
      parsingModality: 0,
    },
    bedrockDataAutomationConfiguration: { parsingModality: 0 },
  },
  contextEnrichmentConfiguration: {
    type: 0,
    bedrockFoundationModelConfiguration: {
      enrichmentStrategyConfiguration: { method: 0 },
      modelArn: 0,
    },
  },
});
const o_Agent: D.LazyStruct = () => ({
  instruction: D.secret,
  createdAt: D.ts,
  updatedAt: D.ts,
  preparedAt: D.ts,
  promptOverrideConfiguration: o_PromptOverrideConfiguration,
});
const o_AgentActionGroup: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
  apiSchema: { payload: D.secret },
});
const o_AgentAlias: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
  agentAliasHistoryEvents: D.list({ endDate: D.ts, startDate: D.ts }),
});
const o_AgentCollaborator: D.LazyStruct = () => ({
  collaborationInstruction: D.secret,
  createdAt: D.ts,
  lastUpdatedAt: D.ts,
});
const o_AgentKnowledgeBase: D.LazyStruct = () => ({
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_DataSource: D.LazyStruct = () => ({
  dataSourceConfiguration: {
    s3Configuration: { inclusionPrefixes: D.list(D.secret) },
    webConfiguration: {
      crawlerConfiguration: {
        inclusionFilters: D.list(D.secret),
        exclusionFilters: D.list(D.secret),
        userAgent: D.secret,
        userAgentHeader: D.secret,
      },
    },
    confluenceConfiguration: {
      crawlerConfiguration: { filterConfiguration: o_CrawlFilterConfiguration },
    },
    salesforceConfiguration: {
      crawlerConfiguration: { filterConfiguration: o_CrawlFilterConfiguration },
    },
    sharePointConfiguration: {
      crawlerConfiguration: { filterConfiguration: o_CrawlFilterConfiguration },
    },
  },
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_FlowDefinition: D.LazyStruct = () => ({
  nodes: D.list({
    configuration: {
      knowledgeBase: {
        promptTemplate: o_KnowledgeBasePromptTemplate,
        orchestrationConfiguration: {
          promptTemplate: o_KnowledgeBasePromptTemplate,
        },
      },
      condition: { conditions: D.list(o_FlowCondition) },
      prompt: {
        sourceConfiguration: {
          inline: { templateConfiguration: o_PromptTemplateConfiguration },
        },
      },
      inlineCode: { code: D.secret },
      loop: { definition: o_FlowDefinition },
      loopController: { continueCondition: o_FlowCondition },
    },
    inputs: D.list({ expression: D.secret }),
  }),
});
const o_FlowValidation: D.LazyStruct = () => ({
  details: { duplicateConditionExpression: { expression: D.secret } },
});
const o_IngestionJob: D.LazyStruct = () => ({
  startedAt: D.ts,
  updatedAt: D.ts,
});
const o_KnowledgeBase: D.LazyStruct = () => ({
  storageConfiguration: {
    opensearchManagedClusterConfiguration: { vectorIndexName: D.secret },
    neptuneAnalyticsConfiguration: { graphArn: D.secret },
    s3VectorsConfiguration: {
      vectorBucketArn: D.secret,
      indexArn: D.secret,
      indexName: D.secret,
    },
  },
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_KnowledgeBaseDocumentDetail: D.LazyStruct = () => ({ updatedAt: D.ts });
const o_PromptOverrideConfiguration: D.LazyStruct = () => ({
  promptConfigurations: D.list({ basePromptTemplate: D.secret }),
});
const o_PromptVariant: D.LazyStruct = () => ({
  templateConfiguration: o_PromptTemplateConfiguration,
  metadata: D.list({ key: D.secret, value: D.secret }),
});
const i_CrawlFilterConfiguration: D.LazyStruct = () => ({
  type: 0,
  patternObjectFilter: {
    filters: D.list({
      objectType: 0,
      inclusionFilters: 0,
      exclusionFilters: 0,
    }),
  },
});
const i_EmbeddingModelConfiguration: D.LazyStruct = () => ({
  bedrockEmbeddingModelConfiguration: {
    dimensions: 0,
    embeddingDataType: 0,
    audio: D.list({ segmentationConfiguration: { fixedLengthDuration: 0 } }),
    video: D.list({ segmentationConfiguration: { fixedLengthDuration: 0 } }),
  },
});
const i_FieldForReranking: D.LazyStruct = () => ({ fieldName: 0 });
const i_FlowCondition: D.LazyStruct = () => ({ name: 0, expression: 0 });
const i_KnowledgeBasePromptTemplate: D.LazyStruct = () => ({
  textPromptTemplate: 0,
});
const i_PromptInferenceConfiguration: D.LazyStruct = () => ({
  text: { temperature: 0, topP: 0, maxTokens: 0, stopSequences: 0 },
});
const i_PromptTemplateConfiguration: D.LazyStruct = () => ({
  text: {
    text: 0,
    cachePoint: i_CachePointBlock,
    inputVariables: D.list(i_PromptInputVariable),
  },
  chat: {
    messages: D.list({
      role: 0,
      content: D.list({ text: 0, cachePoint: i_CachePointBlock }),
    }),
    system: D.list({ text: 0, cachePoint: i_CachePointBlock }),
    inputVariables: D.list(i_PromptInputVariable),
    toolConfiguration: {
      tools: D.list({
        toolSpec: {
          name: 0,
          description: 0,
          inputSchema: { json: 0 },
          strict: 0,
        },
        cachePoint: i_CachePointBlock,
      }),
      toolChoice: { auto: {}, any: {}, tool: { name: 0 } },
    },
  },
});
const o_CrawlFilterConfiguration: D.LazyStruct = () => ({
  patternObjectFilter: {
    filters: D.list({
      objectType: D.secret,
      inclusionFilters: D.list(D.secret),
      exclusionFilters: D.list(D.secret),
    }),
  },
});
const o_FlowCondition: D.LazyStruct = () => ({ expression: D.secret });
const o_KnowledgeBasePromptTemplate: D.LazyStruct = () => ({
  textPromptTemplate: D.secret,
});
const o_PromptTemplateConfiguration: D.LazyStruct = () => ({
  text: { text: D.secret },
});
const i_CachePointBlock: D.LazyStruct = () => ({ type: 0 });
const i_PromptInputVariable: D.LazyStruct = () => ({ name: 0 });
