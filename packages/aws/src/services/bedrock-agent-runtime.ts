import type * as HttpClient from "effect/unstable/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
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
  sdkId: "Bedrock Agent Runtime",
  target: "AmazonBedrockAgentRunTimeService",
  version: "2023-07-26",
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
                `https://bedrock-agent-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://bedrock-agent-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://bedrock-agent-runtime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://bedrock-agent-runtime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class BadGatewayException
  extends /*@__PURE__*/ TE.TaggedError("BadGatewayException", ["ServerError"], {
    status: 502,
  })<{ readonly message?: string; readonly resourceName?: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class DependencyFailedException
  extends /*@__PURE__*/ TE.TaggedError("DependencyFailedException", [], {
    status: 424,
  })<{ readonly message?: string; readonly resourceName?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string; readonly reason?: string }> {}
export class ModelNotReadyException
  extends /*@__PURE__*/ TE.TaggedError("ModelNotReadyException", [], {
    status: 424,
  })<{ readonly message?: string }> {}
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
  )<{ readonly message?: string }> {}
export interface AgenticRetrieveMessageContent {
  text?: string;
}
export type ConversationRole = "user" | "assistant" | (string & {});
export interface AgenticRetrieveMessage {
  content: AgenticRetrieveMessageContent;
  role: ConversationRole;
}
export type AgenticRetrieveMessages = AgenticRetrieveMessage[];
export type KnowledgeBaseId = string;
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
export interface RetrievalOverrides {
  filter?: RetrievalFilter;
  maxNumberOfResults?: number;
}
export interface KnowledgeBaseRetrieverConfiguration {
  knowledgeBaseId: string;
  retrievalOverrides?: RetrievalOverrides;
}
export type RetrieverConfiguration = {
  knowledgeBase: KnowledgeBaseRetrieverConfiguration;
};
export interface AgenticRetriever {
  description?: string;
  configuration: RetrieverConfiguration;
}
export type AgenticRetrievers = AgenticRetriever[];
export type FoundationModelType = "CUSTOM" | "MANAGED" | (string & {});
export type FoundationModelConfigurationType =
  | "BEDROCK_FOUNDATION_MODEL"
  | (string & {});
export type BedrockModelArn = string;
export interface BedrockFoundationModelModelConfiguration {
  modelArn: string;
}
export interface BedrockFoundationModelConfiguration {
  modelConfiguration: BedrockFoundationModelModelConfiguration;
}
export interface FoundationModelConfiguration {
  type: FoundationModelConfigurationType;
  bedrockFoundationModelConfiguration?: BedrockFoundationModelConfiguration;
}
export type AgenticRetrieveRerankingModelType =
  | "CUSTOM"
  | "MANAGED"
  | "NONE"
  | (string & {});
export type AgenticRetrieveRerankingConfigurationType =
  | "BEDROCK_RERANKING_MODEL"
  | (string & {});
export interface AgenticRetrieveBedrockRerankingModelConfiguration {
  modelArn: string;
}
export interface AgenticRetrieveBedrockRerankingConfiguration {
  modelConfiguration: AgenticRetrieveBedrockRerankingModelConfiguration;
}
export interface AgenticRetrieveRerankingConfiguration {
  type: AgenticRetrieveRerankingConfigurationType;
  bedrockRerankingConfiguration?: AgenticRetrieveBedrockRerankingConfiguration;
}
export interface AgenticRetrieveConfiguration {
  foundationModelType?: FoundationModelType;
  foundationModelConfiguration?: FoundationModelConfiguration;
  rerankingModelType?: AgenticRetrieveRerankingModelType;
  rerankingConfiguration?: AgenticRetrieveRerankingConfiguration;
  maxAgentIteration?: number;
}
export interface AgenticRetrieveBedrockGuardrailConfiguration {
  guardrailId: string;
  guardrailVersion: string;
}
export interface AgenticRetrievePolicyConfiguration {
  bedrockGuardrailConfiguration?: AgenticRetrieveBedrockGuardrailConfiguration;
}
export type NextToken = string;
export interface UserContext {
  userId: string;
}
export type AgentCoreMemoryId = string;
export type AgentCoreMemoryActorId = string;
export type AgentCoreMemorySessionId = string;
export interface AgenticRetrieveMemorySessionBinding {
  actorId: string;
  sessionId: string;
}
export type MemoryNamespace = string;
export type MemoryStrategyId = string;
export type AgenticRetrieveMemoryMetadataKey = string;
export type AgenticRetrieveMemoryMetadataFilterLeft = { metadataKey: string };
export type AgenticRetrieveMemoryMetadataFilterOperator =
  | "EQUALS_TO"
  | "EXISTS"
  | "NOT_EXISTS"
  | "BEFORE"
  | "AFTER"
  | "CONTAINS"
  | "GREATER_THAN"
  | "GREATER_THAN_OR_EQUALS"
  | "LESS_THAN"
  | "LESS_THAN_OR_EQUALS"
  | (string & {});
export type AgenticRetrieveMemoryMetadataStringValue = string;
export type AgenticRetrieveMemoryMetadataStringListItem = string;
export type AgenticRetrieveMemoryMetadataStringList = string[];
export type AgenticRetrieveMemoryMetadataValue =
  | {
      stringValue: string;
      numberValue?: never;
      stringListValue?: never;
      dateTimeValue?: never;
    }
  | {
      stringValue?: never;
      numberValue: number;
      stringListValue?: never;
      dateTimeValue?: never;
    }
  | {
      stringValue?: never;
      numberValue?: never;
      stringListValue: string[];
      dateTimeValue?: never;
    }
  | {
      stringValue?: never;
      numberValue?: never;
      stringListValue?: never;
      dateTimeValue: Date;
    };
export type AgenticRetrieveMemoryMetadataFilterRight = {
  metadataValue: AgenticRetrieveMemoryMetadataValue;
};
export interface AgenticRetrieveMemoryMetadataFilter {
  left: AgenticRetrieveMemoryMetadataFilterLeft;
  operator: AgenticRetrieveMemoryMetadataFilterOperator;
  right?: AgenticRetrieveMemoryMetadataFilterRight;
}
export type AgenticRetrieveMemoryMetadataFilterList =
  AgenticRetrieveMemoryMetadataFilter[];
export interface AgenticRetrieveMemoryRetrievalConfig {
  namespace?: string;
  namespacePath?: string;
  strategyId?: string;
  metadataFilters?: AgenticRetrieveMemoryMetadataFilter[];
}
export type AgenticRetrieveMemoryRetrievalConfigList =
  AgenticRetrieveMemoryRetrievalConfig[];
export type AgenticRetrieveMemoryPersistenceMode =
  | "DEFAULT"
  | "NONE"
  | (string & {});
export interface AgenticRetrieveMemoryConfiguration {
  memoryId: string;
  sessionBinding?: AgenticRetrieveMemorySessionBinding;
  retrievalConfigs?: AgenticRetrieveMemoryRetrievalConfig[];
  persistenceMode?: AgenticRetrieveMemoryPersistenceMode;
}
export interface AgenticRetrieveStreamRequest {
  messages: AgenticRetrieveMessage[];
  retrievers: AgenticRetriever[];
  agenticRetrieveConfiguration: AgenticRetrieveConfiguration;
  policyConfiguration?: AgenticRetrievePolicyConfiguration;
  nextToken?: string;
  userContext?: UserContext;
  memoryConfiguration?: AgenticRetrieveMemoryConfiguration;
  generateResponse?: boolean;
}
export type MimeType = string;
export interface RetrievalContent {
  byteContent?: Uint8Array;
  text?: string;
  mimeType: string;
}
export type AgenticRetrieveMetadata = { [key: string]: any | undefined };
export interface AgenticRetrieveSourceRetriever {
  identifier: string;
}
export interface AgenticRetrieveResultItem {
  content: RetrievalContent;
  metadata?: { [key: string]: any | undefined };
  sourceRetriever: AgenticRetrieveSourceRetriever;
}
export type AgenticRetrieveResults = AgenticRetrieveResultItem[];
export interface AgenticRetrieveCitationReference {
  resultIndex: number;
}
export type AgenticRetrieveCitationReferenceList =
  AgenticRetrieveCitationReference[];
export interface AgenticRetrieveCitation {
  startIndex: number;
  endIndex: number;
  references: AgenticRetrieveCitationReference[];
}
export type AgenticRetrieveCitationList = AgenticRetrieveCitation[];
export interface AgenticRetrieveGeneratedResponse {
  answer: string;
  citations?: AgenticRetrieveCitation[];
}
export interface AgenticRetrieveResultEvent {
  results: AgenticRetrieveResultItem[];
  generatedResponse?: AgenticRetrieveGeneratedResponse;
  nextToken?: string;
}
export type AgenticRetrieveStep =
  | "Planning"
  | "Retrieval"
  | "SpeculativeRetrieval"
  | "FullDocumentExpansion"
  | "SessionHistoryLoad"
  | (string & {});
export type AgenticRetrieveStatus =
  | "IN_PROGRESS"
  | "SUCCEEDED"
  | "FAILED"
  | (string & {});
export type AgenticRetrieveSourceRetrieverList =
  AgenticRetrieveSourceRetriever[];
export interface AgenticRetrieveActionDetails {
  inputQuery: AgenticRetrieveMessageContent;
  sourceRetrievers: AgenticRetrieveSourceRetriever[];
}
export interface AgenticRetrieveFullDocExpansionDetails {
  documentId?: string;
  sourceRetriever?: AgenticRetrieveSourceRetriever;
}
export interface AgenticRetrieveMemoryRetrieveDetails {
  inputQuery: AgenticRetrieveMessageContent;
  memoryId: string;
  namespace?: string;
  namespacePath?: string;
  strategyId?: string;
}
export interface AgenticRetrieveAction {
  retrieve?: AgenticRetrieveActionDetails;
  fullDocumentExpansion?: AgenticRetrieveFullDocExpansionDetails;
  memoryRetrieve?: AgenticRetrieveMemoryRetrieveDetails;
}
export type AgenticRetrieveActions = AgenticRetrieveAction[];
export interface AgenticRetrieveWarningMessage {
  message: string;
}
export type GuardrailAction = "INTERVENED" | "NONE" | (string & {});
export interface AgenticRetrieveGuardrailWarning {
  id: string;
  version: string;
  action: GuardrailAction;
  message?: string;
}
export type AgenticRetrieveWarning =
  | { message: AgenticRetrieveWarningMessage; guardrail?: never }
  | { message?: never; guardrail: AgenticRetrieveGuardrailWarning };
export type AgenticRetrieveWarnings = AgenticRetrieveWarning[];
export interface AgenticRetrieveFailure {
  message: string;
}
export type AgenticRetrieveFailures = AgenticRetrieveFailure[];
export type AgenticRetrieveType =
  | "BedrockKnowledgeBase"
  | "BedrockAgentCoreMemory"
  | (string & {});
export interface AgenticRetrieveSourceMetadata {
  identifier?: string;
  retrievalType?: AgenticRetrieveType;
}
export type AgenticRetrieveSourceMetadataList = AgenticRetrieveSourceMetadata[];
export interface AgenticRetrieveTraceResultItem {
  content?: RetrievalContent;
  metadata?: { [key: string]: any | undefined };
  sourceRetriever?: AgenticRetrieveSourceRetriever;
}
export type AgenticRetrieveTraceResults = AgenticRetrieveTraceResultItem[];
export interface AgenticRetrieveTraceEventAttributes {
  step: AgenticRetrieveStep;
  status: AgenticRetrieveStatus;
  message: string;
  actions?: AgenticRetrieveAction[];
  warnings?: AgenticRetrieveWarning[];
  failures?: AgenticRetrieveFailure[];
  retrievalMetadata?: AgenticRetrieveSourceMetadata[];
  retrievalResponse?: AgenticRetrieveTraceResultItem[];
}
export interface AgenticRetrieveTraceEvent {
  id: string;
  timestamp: number;
  attributes: AgenticRetrieveTraceEventAttributes;
}
export interface AgenticRetrieveResponseEvent {
  text: string;
}
export type NonBlankString = string;
export type AgenticRetrieveStreamResponseOutput =
  | {
      result: AgenticRetrieveResultEvent;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent: AgenticRetrieveTraceEvent;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent: AgenticRetrieveResponseEvent;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException: InternalServerException;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException: ValidationException;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException: ThrottlingException;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException: AccessDeniedException;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException: ConflictException;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException: DependencyFailedException;
      badGatewayException?: never;
    }
  | {
      result?: never;
      traceEvent?: never;
      responseEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException: BadGatewayException;
    };
export interface AgenticRetrieveStreamResponse {
  stream: stream.Stream<AgenticRetrieveStreamResponseOutput, Error, never>;
}
export type KnowledgeBaseIdentifier = string;
export type DataSourceId = string;
export type DocumentId = string;
export interface CheckIngestedDocumentAclRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
  documentId: string;
  userContext: UserContext;
}
export interface CheckIngestedDocumentAclResponse {
  hasAccess: boolean;
}
export type Uuid = string;
export type InvocationDescription = string;
export type SessionIdentifier = string;
export interface CreateInvocationRequest {
  invocationId?: string;
  description?: string;
  sessionIdentifier: string;
}
export interface CreateInvocationResponse {
  sessionId: string;
  invocationId: string;
  createdAt: Date;
}
export type SessionMetadataKey = string;
export type SessionMetadataValue = string;
export type SessionMetadataMap = { [key: string]: string | undefined };
export type KmsKeyArn = string;
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export interface CreateSessionRequest {
  sessionMetadata?: { [key: string]: string | undefined };
  encryptionKeyArn?: string;
  tags?: { [key: string]: string | undefined };
}
export type SessionArn = string;
export type SessionStatus = "ACTIVE" | "EXPIRED" | "ENDED" | (string & {});
export interface CreateSessionResponse {
  sessionId: string;
  sessionArn: string;
  sessionStatus: SessionStatus;
  createdAt: Date;
}
export type AgentId = string;
export type AgentAliasId = string;
export type MemoryId = string;
export type SessionId = string;
export interface DeleteAgentMemoryRequest {
  agentId: string;
  agentAliasId: string;
  memoryId?: string;
  sessionId?: string;
}
export interface DeleteAgentMemoryResponse {}
export interface DeleteSessionRequest {
  sessionIdentifier: string;
}
export interface DeleteSessionResponse {}
export interface EndSessionRequest {
  sessionIdentifier: string;
}
export interface EndSessionResponse {
  sessionId: string;
  sessionArn: string;
  sessionStatus: SessionStatus;
}
export type InputQueryType = "TEXT" | (string & {});
export interface QueryGenerationInput {
  type: InputQueryType;
  text: string;
}
export type QueryTransformationMode = "TEXT_TO_SQL" | (string & {});
export type TextToSqlConfigurationType = "KNOWLEDGE_BASE" | (string & {});
export type KnowledgeBaseArn = string;
export interface TextToSqlKnowledgeBaseConfiguration {
  knowledgeBaseArn: string;
}
export interface TextToSqlConfiguration {
  type: TextToSqlConfigurationType;
  knowledgeBaseConfiguration?: TextToSqlKnowledgeBaseConfiguration;
}
export interface TransformationConfiguration {
  mode: QueryTransformationMode;
  textToSqlConfiguration?: TextToSqlConfiguration;
}
export interface GenerateQueryRequest {
  queryGenerationInput: QueryGenerationInput;
  transformationConfiguration: TransformationConfiguration;
}
export type GeneratedQueryType = "REDSHIFT_SQL" | (string & {});
export interface GeneratedQuery {
  type?: GeneratedQueryType;
  sql?: string;
}
export type GeneratedQueries = GeneratedQuery[];
export interface GenerateQueryResponse {
  queries?: GeneratedQuery[];
}
export type MaxResults = number;
export type MemoryType = "SESSION_SUMMARY" | (string & {});
export interface GetAgentMemoryRequest {
  nextToken?: string;
  maxItems?: number;
  agentId: string;
  agentAliasId: string;
  memoryType: MemoryType;
  memoryId: string;
}
export type SummaryText = string;
export interface MemorySessionSummary {
  memoryId?: string;
  sessionId?: string;
  sessionStartTime?: Date;
  sessionExpiryTime?: Date;
  summaryText?: string;
}
export type Memory = { sessionSummary: MemorySessionSummary };
export type Memories = Memory[];
export interface GetAgentMemoryResponse {
  nextToken?: string;
  memoryContents?: Memory[];
}
export type DocumentOutputFormat = "RAW" | "EXTRACTED" | (string & {});
export interface GetDocumentContentRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
  documentId: string;
  outputFormat?: DocumentOutputFormat;
  userContext?: UserContext;
}
export type PresignedUrl = string | redacted.Redacted<string>;
export interface GetDocumentContentResponse {
  mimeType: string;
  presignedUrl: string | redacted.Redacted<string>;
  documentContentLength?: number;
}
export type FlowIdentifier = string;
export type FlowAliasIdentifier = string;
export type FlowExecutionIdentifier = string;
export interface GetExecutionFlowSnapshotRequest {
  flowIdentifier: string;
  flowAliasIdentifier: string;
  executionIdentifier: string;
}
export type Version = string;
export type FlowExecutionRoleArn = string;
export interface GetExecutionFlowSnapshotResponse {
  flowIdentifier: string;
  flowAliasIdentifier: string;
  flowVersion: string;
  executionRoleArn: string;
  definition: string;
  customerEncryptionKeyArn?: string;
}
export interface GetFlowExecutionRequest {
  flowIdentifier: string;
  flowAliasIdentifier: string;
  executionIdentifier: string;
}
export type FlowExecutionStatus =
  | "Running"
  | "Succeeded"
  | "Failed"
  | "TimedOut"
  | "Aborted"
  | (string & {});
export type NodeName = string;
export type FlowExecutionErrorType = "ExecutionTimedOut" | (string & {});
export interface FlowExecutionError {
  nodeName?: string;
  error?: FlowExecutionErrorType;
  message?: string;
}
export type FlowExecutionErrors = FlowExecutionError[];
export interface GetFlowExecutionResponse {
  executionArn: string;
  status: FlowExecutionStatus;
  startedAt: Date;
  endedAt?: Date;
  errors?: FlowExecutionError[];
  flowAliasIdentifier: string;
  flowIdentifier: string;
  flowVersion: string;
}
export interface GetIngestedDocumentAclRequest {
  knowledgeBaseId: string;
  dataSourceId: string;
  documentId: string;
}
export type DocumentAclMemberRelation = "AND" | "OR" | (string & {});
export type DocumentAclMembershipType =
  | "KNOWLEDGE_BASE"
  | "DATA_SOURCE"
  | (string & {});
export interface DocumentAclUser {
  id: string;
  type: DocumentAclMembershipType;
}
export type DocumentAclUserList = DocumentAclUser[];
export interface DocumentAclGroup {
  id: string;
  type: DocumentAclMembershipType;
}
export type DocumentAclGroupList = DocumentAclGroup[];
export interface DocumentAclCondition {
  conditionOperator?: DocumentAclMemberRelation;
  users?: DocumentAclUser[];
  groups?: DocumentAclGroup[];
}
export type DocumentAclConditionList = DocumentAclCondition[];
export interface DocumentAclMembership {
  memberRelation?: DocumentAclMemberRelation;
  conditions?: DocumentAclCondition[];
}
export interface DocumentAcl {
  allowList?: DocumentAclMembership;
  denyList?: DocumentAclMembership;
}
export interface GetIngestedDocumentAclResponse {
  documentAcl: DocumentAcl;
}
export type InvocationIdentifier = string;
export interface GetInvocationStepRequest {
  invocationIdentifier: string;
  invocationStepId: string;
  sessionIdentifier: string;
}
export type ImageFormat = "png" | "jpeg" | "gif" | "webp" | (string & {});
export type S3Uri = string;
export interface S3Location {
  uri: string;
}
export type ImageSource =
  | { bytes: Uint8Array; s3Location?: never }
  | { bytes?: never; s3Location: S3Location };
export interface ImageBlock {
  format: ImageFormat;
  source: ImageSource;
}
export type BedrockSessionContentBlock =
  | { text: string; image?: never }
  | { text?: never; image: ImageBlock };
export type BedrockSessionContentBlocks = BedrockSessionContentBlock[];
export type InvocationStepPayload = {
  contentBlocks: BedrockSessionContentBlock[];
};
export interface InvocationStep {
  sessionId: string;
  invocationId: string;
  invocationStepId: string;
  invocationStepTime: Date;
  payload: InvocationStepPayload;
}
export interface GetInvocationStepResponse {
  invocationStep: InvocationStep;
}
export interface GetSessionRequest {
  sessionIdentifier: string;
}
export interface GetSessionResponse {
  sessionId: string;
  sessionArn: string;
  sessionStatus: SessionStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
  sessionMetadata?: { [key: string]: string | undefined };
  encryptionKeyArn?: string;
}
export type SessionAttributesMap = { [key: string]: string | undefined };
export type PromptSessionAttributesMap = { [key: string]: string | undefined };
export type ApiPath = string | redacted.Redacted<string>;
export type ConfirmationState = "CONFIRM" | "DENY" | (string & {});
export type ResponseState = "FAILURE" | "REPROMPT" | (string & {});
export type ImageInputFormat = "png" | "jpeg" | "gif" | "webp" | (string & {});
export type ImageInputSource = { bytes: Uint8Array };
export interface ImageInput {
  format: ImageInputFormat;
  source: ImageInputSource;
}
export type ImageInputs = ImageInput[];
export interface ContentBody {
  body?: string;
  images?: ImageInput[];
}
export type ResponseBody = { [key: string]: ContentBody | undefined };
export interface ApiResult {
  actionGroup: string;
  httpMethod?: string;
  apiPath?: string | redacted.Redacted<string>;
  confirmationState?: ConfirmationState;
  responseState?: ResponseState;
  httpStatusCode?: number;
  responseBody?: { [key: string]: ContentBody | undefined };
  agentId?: string;
}
export interface FunctionResult {
  actionGroup: string;
  confirmationState?: ConfirmationState;
  function?: string;
  responseBody?: { [key: string]: ContentBody | undefined };
  responseState?: ResponseState;
  agentId?: string;
}
export type InvocationResultMember =
  | { apiResult: ApiResult; functionResult?: never }
  | { apiResult?: never; functionResult: FunctionResult };
export type ReturnControlInvocationResults = InvocationResultMember[];
export type FileSourceType = "S3" | "BYTE_CONTENT" | (string & {});
export interface S3ObjectFile {
  uri: string;
}
export type ByteContentBlob = Uint8Array | redacted.Redacted<Uint8Array>;
export interface ByteContentFile {
  mediaType: string;
  data: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface FileSource {
  sourceType: FileSourceType;
  s3Location?: S3ObjectFile;
  byteContent?: ByteContentFile;
}
export type FileUseCase = "CODE_INTERPRETER" | "CHAT" | (string & {});
export interface InputFile {
  name: string;
  source: FileSource;
  useCase: FileUseCase;
}
export type InputFiles = InputFile[];
export type SearchType = "HYBRID" | "SEMANTIC" | (string & {});
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
export interface ImplicitFilterConfiguration {
  metadataAttributes: MetadataAttributeSchema[];
  modelArn: string;
}
export interface KnowledgeBaseVectorSearchConfiguration {
  numberOfResults?: number;
  overrideSearchType?: SearchType;
  filter?: RetrievalFilter;
  rerankingConfiguration?: VectorSearchRerankingConfiguration;
  implicitFilterConfiguration?: ImplicitFilterConfiguration;
}
export type RerankingModelType = "CUSTOM" | "MANAGED" | "NONE" | (string & {});
export type ManagedSearchRerankingConfigurationType =
  | "BEDROCK_RERANKING_MODEL"
  | (string & {});
export interface ManagedSearchBedrockRerankingModelConfiguration {
  modelArn: string;
  additionalModelRequestFields?: { [key: string]: any | undefined };
}
export interface ManagedSearchBedrockRerankingConfiguration {
  modelConfiguration: ManagedSearchBedrockRerankingModelConfiguration;
  numberOfRerankedResults?: number;
  metadataConfiguration?: MetadataConfigurationForReranking;
}
export interface ManagedSearchRerankingConfiguration {
  type: ManagedSearchRerankingConfigurationType;
  bedrockRerankingConfiguration?: ManagedSearchBedrockRerankingConfiguration;
}
export interface ManagedSearchConfiguration {
  numberOfResults?: number;
  filter?: RetrievalFilter;
  rerankingModelType?: RerankingModelType;
  rerankingConfiguration?: ManagedSearchRerankingConfiguration;
}
export interface KnowledgeBaseRetrievalConfiguration {
  vectorSearchConfiguration?: KnowledgeBaseVectorSearchConfiguration;
  managedSearchConfiguration?: ManagedSearchConfiguration;
}
export interface KnowledgeBaseConfiguration {
  knowledgeBaseId: string;
  retrievalConfiguration: KnowledgeBaseRetrievalConfiguration;
}
export type KnowledgeBaseConfigurations = KnowledgeBaseConfiguration[];
export type ContentBlock = { text: string };
export type ContentBlocks = ContentBlock[];
export interface Message {
  role: ConversationRole;
  content: ContentBlock[];
}
export type Messages = Message[];
export interface ConversationHistory {
  messages?: Message[];
}
export interface SessionState {
  sessionAttributes?: { [key: string]: string | undefined };
  promptSessionAttributes?: { [key: string]: string | undefined };
  returnControlInvocationResults?: InvocationResultMember[];
  invocationId?: string;
  files?: InputFile[];
  knowledgeBaseConfigurations?: KnowledgeBaseConfiguration[];
  conversationHistory?: ConversationHistory;
}
export type InputText = string | redacted.Redacted<string>;
export type PerformanceConfigLatency = "standard" | "optimized" | (string & {});
export interface PerformanceConfiguration {
  latency?: PerformanceConfigLatency;
}
export interface BedrockModelConfigurations {
  performanceConfig?: PerformanceConfiguration;
}
export interface StreamingConfigurations {
  streamFinalResponse?: boolean;
  applyGuardrailInterval?: number;
}
export interface PromptCreationConfigurations {
  previousConversationTurnsToInclude?: number;
  excludePreviousThinkingSteps?: boolean;
}
export type AWSResourceARN = string;
export interface InvokeAgentRequest {
  sessionState?: SessionState;
  agentId: string;
  agentAliasId: string;
  sessionId: string;
  endSession?: boolean;
  enableTrace?: boolean;
  inputText?: string | redacted.Redacted<string>;
  memoryId?: string;
  bedrockModelConfigurations?: BedrockModelConfigurations;
  streamingConfigurations?: StreamingConfigurations;
  promptCreationConfigurations?: PromptCreationConfigurations;
  sourceArn?: string;
}
export type PartBody = Uint8Array | redacted.Redacted<Uint8Array>;
export interface Span {
  start?: number;
  end?: number;
}
export interface TextResponsePart {
  text?: string;
  span?: Span;
}
export interface GeneratedResponsePart {
  textResponsePart?: TextResponsePart;
}
export type RetrievalResultContentType =
  | "TEXT"
  | "IMAGE"
  | "ROW"
  | "AUDIO"
  | "VIDEO"
  | (string & {});
export interface VideoSegment {
  s3Uri: string;
  summary?: string;
}
export interface AudioSegment {
  s3Uri: string;
  transcription?: string;
}
export type RetrievalResultContentColumnType =
  | "BLOB"
  | "BOOLEAN"
  | "DOUBLE"
  | "NULL"
  | "LONG"
  | "STRING"
  | (string & {});
export interface RetrievalResultContentColumn {
  columnName?: string;
  columnValue?: string;
  type?: RetrievalResultContentColumnType;
}
export type RetrievalResultContentRow = RetrievalResultContentColumn[];
export interface RetrievalResultContent {
  type?: RetrievalResultContentType;
  text?: string;
  byteContent?: string;
  video?: VideoSegment;
  audio?: AudioSegment;
  row?: RetrievalResultContentColumn[];
}
export type RetrievalResultLocationType =
  | "S3"
  | "WEB"
  | "CONFLUENCE"
  | "SALESFORCE"
  | "SHAREPOINT"
  | "CUSTOM"
  | "KENDRA"
  | "SQL"
  | "ONEDRIVE"
  | "GOOGLEDRIVE"
  | (string & {});
export interface RetrievalResultS3Location {
  uri?: string;
}
export interface RetrievalResultWebLocation {
  url?: string;
}
export interface RetrievalResultConfluenceLocation {
  url?: string;
}
export interface RetrievalResultSalesforceLocation {
  url?: string;
}
export interface RetrievalResultSharePointLocation {
  url?: string;
}
export interface RetrievalResultCustomDocumentLocation {
  id?: string;
}
export interface RetrievalResultKendraDocumentLocation {
  uri?: string;
}
export interface RetrievalResultSqlLocation {
  query?: string;
}
export interface RetrievalResultOneDriveLocation {
  url?: string;
}
export interface RetrievalResultGoogleDriveLocation {
  url?: string;
}
export interface RetrievalResultLocation {
  type: RetrievalResultLocationType;
  s3Location?: RetrievalResultS3Location;
  webLocation?: RetrievalResultWebLocation;
  confluenceLocation?: RetrievalResultConfluenceLocation;
  salesforceLocation?: RetrievalResultSalesforceLocation;
  sharePointLocation?: RetrievalResultSharePointLocation;
  customDocumentLocation?: RetrievalResultCustomDocumentLocation;
  kendraDocumentLocation?: RetrievalResultKendraDocumentLocation;
  sqlLocation?: RetrievalResultSqlLocation;
  oneDriveLocation?: RetrievalResultOneDriveLocation;
  googleDriveLocation?: RetrievalResultGoogleDriveLocation;
}
export type RetrievalResultMetadataKey = string;
export type RetrievalResultMetadataValue = unknown;
export type RetrievalResultMetadata = { [key: string]: any | undefined };
export interface RetrievedReference {
  content?: RetrievalResultContent;
  location?: RetrievalResultLocation;
  metadata?: { [key: string]: any | undefined };
}
export type RetrievedReferences = RetrievedReference[];
export interface Citation {
  generatedResponsePart?: GeneratedResponsePart;
  retrievedReferences?: RetrievedReference[];
}
export type Citations = Citation[];
export interface Attribution {
  citations?: Citation[];
}
export interface PayloadPart {
  bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
  attribution?: Attribution;
}
export type TraceId = string;
export type GuardrailTopicType = "DENY" | (string & {});
export type GuardrailTopicPolicyAction = "BLOCKED" | (string & {});
export interface GuardrailTopic {
  name?: string;
  type?: GuardrailTopicType;
  action?: GuardrailTopicPolicyAction;
}
export type GuardrailTopicList = GuardrailTopic[];
export interface GuardrailTopicPolicyAssessment {
  topics?: GuardrailTopic[];
}
export type GuardrailContentFilterType =
  | "INSULTS"
  | "HATE"
  | "SEXUAL"
  | "VIOLENCE"
  | "MISCONDUCT"
  | "PROMPT_ATTACK"
  | (string & {});
export type GuardrailContentFilterConfidence =
  | "NONE"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | (string & {});
export type GuardrailContentPolicyAction = "BLOCKED" | (string & {});
export interface GuardrailContentFilter {
  type?: GuardrailContentFilterType;
  confidence?: GuardrailContentFilterConfidence;
  action?: GuardrailContentPolicyAction;
}
export type GuardrailContentFilterList = GuardrailContentFilter[];
export interface GuardrailContentPolicyAssessment {
  filters?: GuardrailContentFilter[];
}
export type GuardrailWordPolicyAction = "BLOCKED" | (string & {});
export interface GuardrailCustomWord {
  match?: string;
  action?: GuardrailWordPolicyAction;
}
export type GuardrailCustomWordList = GuardrailCustomWord[];
export type GuardrailManagedWordType = "PROFANITY" | (string & {});
export interface GuardrailManagedWord {
  match?: string;
  type?: GuardrailManagedWordType;
  action?: GuardrailWordPolicyAction;
}
export type GuardrailManagedWordList = GuardrailManagedWord[];
export interface GuardrailWordPolicyAssessment {
  customWords?: GuardrailCustomWord[];
  managedWordLists?: GuardrailManagedWord[];
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
export type GuardrailSensitiveInformationPolicyAction =
  | "BLOCKED"
  | "ANONYMIZED"
  | (string & {});
export interface GuardrailPiiEntityFilter {
  type?: GuardrailPiiEntityType;
  match?: string;
  action?: GuardrailSensitiveInformationPolicyAction;
}
export type GuardrailPiiEntityFilterList = GuardrailPiiEntityFilter[];
export interface GuardrailRegexFilter {
  name?: string;
  regex?: string;
  match?: string;
  action?: GuardrailSensitiveInformationPolicyAction;
}
export type GuardrailRegexFilterList = GuardrailRegexFilter[];
export interface GuardrailSensitiveInformationPolicyAssessment {
  piiEntities?: GuardrailPiiEntityFilter[];
  regexes?: GuardrailRegexFilter[];
}
export interface GuardrailAssessment {
  topicPolicy?: GuardrailTopicPolicyAssessment;
  contentPolicy?: GuardrailContentPolicyAssessment;
  wordPolicy?: GuardrailWordPolicyAssessment;
  sensitiveInformationPolicy?: GuardrailSensitiveInformationPolicyAssessment;
}
export type GuardrailAssessmentList = GuardrailAssessment[];
export interface Usage {
  inputTokens?: number;
  outputTokens?: number;
}
export interface Metadata {
  startTime?: Date;
  endTime?: Date;
  totalTimeMs?: number;
  operationTotalTimeMs?: number;
  clientRequestId?: string;
  usage?: Usage;
}
export interface GuardrailTrace {
  action?: GuardrailAction;
  traceId?: string;
  inputAssessments?: GuardrailAssessment[];
  outputAssessments?: GuardrailAssessment[];
  metadata?: Metadata;
}
export type PromptText = string | redacted.Redacted<string>;
export type PromptType =
  | "PRE_PROCESSING"
  | "ORCHESTRATION"
  | "KNOWLEDGE_BASE_RESPONSE_GENERATION"
  | "POST_PROCESSING"
  | "ROUTING_CLASSIFIER"
  | (string & {});
export type LambdaArn = string;
export type CreationMode = "DEFAULT" | "OVERRIDDEN" | (string & {});
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
export type ModelIdentifier = string;
export interface ModelInvocationInput {
  traceId?: string;
  text?: string | redacted.Redacted<string>;
  type?: PromptType;
  overrideLambda?: string;
  promptCreationMode?: CreationMode;
  inferenceConfiguration?: InferenceConfiguration;
  parserMode?: CreationMode;
  foundationModel?: string;
}
export type RationaleString = string | redacted.Redacted<string>;
export interface PreProcessingParsedResponse {
  rationale?: string | redacted.Redacted<string>;
  isValid?: boolean;
}
export interface RawResponse {
  content?: string;
}
export interface ReasoningTextBlock {
  text: string;
  signature?: string;
}
export type ReasoningContentBlock =
  | { reasoningText: ReasoningTextBlock; redactedContent?: never }
  | { reasoningText?: never; redactedContent: Uint8Array };
export interface PreProcessingModelInvocationOutput {
  traceId?: string;
  parsedResponse?: PreProcessingParsedResponse;
  rawResponse?: RawResponse;
  metadata?: Metadata;
  reasoningContent?: ReasoningContentBlock;
}
export type PreProcessingTrace =
  | {
      modelInvocationInput: ModelInvocationInput;
      modelInvocationOutput?: never;
    }
  | {
      modelInvocationInput?: never;
      modelInvocationOutput: PreProcessingModelInvocationOutput;
    };
export interface Rationale {
  traceId?: string;
  text?: string | redacted.Redacted<string>;
}
export type InvocationType =
  | "ACTION_GROUP"
  | "KNOWLEDGE_BASE"
  | "FINISH"
  | "ACTION_GROUP_CODE_INTERPRETER"
  | "AGENT_COLLABORATOR"
  | (string & {});
export type ActionGroupName = string | redacted.Redacted<string>;
export type Verb = string | redacted.Redacted<string>;
export interface Parameter {
  name?: string;
  type?: string;
  value?: string;
}
export type Parameters = Parameter[];
export type ContentMap = { [key: string]: Parameter[] | undefined };
export interface RequestBody {
  content?: { [key: string]: Parameter[] | undefined };
}
export type ExecutionType = "LAMBDA" | "RETURN_CONTROL" | (string & {});
export interface ActionGroupInvocationInput {
  actionGroupName?: string | redacted.Redacted<string>;
  verb?: string | redacted.Redacted<string>;
  apiPath?: string | redacted.Redacted<string>;
  parameters?: Parameter[];
  requestBody?: RequestBody;
  function?: string | redacted.Redacted<string>;
  executionType?: ExecutionType;
  invocationId?: string;
}
export type KnowledgeBaseLookupInputString = string | redacted.Redacted<string>;
export type TraceKnowledgeBaseId = string | redacted.Redacted<string>;
export interface KnowledgeBaseLookupInput {
  text?: string | redacted.Redacted<string>;
  knowledgeBaseId?: string | redacted.Redacted<string>;
}
export type Files = string[];
export interface CodeInterpreterInvocationInput {
  code?: string;
  files?: string[];
}
export type AgentAliasArn = string;
export type PayloadType = "TEXT" | "RETURN_CONTROL" | (string & {});
export type AgentCollaboratorPayloadString = string | redacted.Redacted<string>;
export interface ReturnControlResults {
  invocationId?: string;
  returnControlInvocationResults?: InvocationResultMember[];
}
export interface AgentCollaboratorInputPayload {
  type?: PayloadType;
  text?: string | redacted.Redacted<string>;
  returnControlResults?: ReturnControlResults;
}
export interface AgentCollaboratorInvocationInput {
  agentCollaboratorName?: string;
  agentCollaboratorAliasArn?: string;
  input?: AgentCollaboratorInputPayload;
}
export interface InvocationInput {
  traceId?: string;
  invocationType?: InvocationType;
  actionGroupInvocationInput?: ActionGroupInvocationInput;
  knowledgeBaseLookupInput?: KnowledgeBaseLookupInput;
  codeInterpreterInvocationInput?: CodeInterpreterInvocationInput;
  agentCollaboratorInvocationInput?: AgentCollaboratorInvocationInput;
}
export type Type =
  | "ACTION_GROUP"
  | "AGENT_COLLABORATOR"
  | "KNOWLEDGE_BASE"
  | "FINISH"
  | "ASK_USER"
  | "REPROMPT"
  | (string & {});
export type ActionGroupOutputString = string | redacted.Redacted<string>;
export interface ActionGroupInvocationOutput {
  text?: string | redacted.Redacted<string>;
  metadata?: Metadata;
}
export interface ApiParameter {
  name?: string;
  type?: string;
  value?: string;
}
export type ApiParameters = ApiParameter[];
export type ParameterList = Parameter[];
export interface PropertyParameters {
  properties?: Parameter[];
}
export type ApiContentMap = { [key: string]: PropertyParameters | undefined };
export interface ApiRequestBody {
  content?: { [key: string]: PropertyParameters | undefined };
}
export type ActionInvocationType =
  | "RESULT"
  | "USER_CONFIRMATION"
  | "USER_CONFIRMATION_AND_RESULT"
  | (string & {});
export type Name = string | redacted.Redacted<string>;
export interface ApiInvocationInput {
  actionGroup: string;
  httpMethod?: string;
  apiPath?: string | redacted.Redacted<string>;
  parameters?: ApiParameter[];
  requestBody?: ApiRequestBody;
  actionInvocationType?: ActionInvocationType;
  agentId?: string;
  collaboratorName?: string | redacted.Redacted<string>;
}
export interface FunctionParameter {
  name?: string;
  type?: string;
  value?: string;
}
export type FunctionParameters = FunctionParameter[];
export interface FunctionInvocationInput {
  actionGroup: string;
  parameters?: FunctionParameter[];
  function?: string;
  actionInvocationType?: ActionInvocationType;
  agentId?: string;
  collaboratorName?: string | redacted.Redacted<string>;
}
export type InvocationInputMember =
  | { apiInvocationInput: ApiInvocationInput; functionInvocationInput?: never }
  | {
      apiInvocationInput?: never;
      functionInvocationInput: FunctionInvocationInput;
    };
export type InvocationInputs = InvocationInputMember[];
export interface ReturnControlPayload {
  invocationInputs?: InvocationInputMember[];
  invocationId?: string;
}
export interface AgentCollaboratorOutputPayload {
  type?: PayloadType;
  text?: string | redacted.Redacted<string>;
  returnControlPayload?: ReturnControlPayload;
}
export interface AgentCollaboratorInvocationOutput {
  agentCollaboratorName?: string;
  agentCollaboratorAliasArn?: string;
  output?: AgentCollaboratorOutputPayload;
  metadata?: Metadata;
}
export interface KnowledgeBaseLookupOutput {
  retrievedReferences?: RetrievedReference[];
  metadata?: Metadata;
}
export type FinalResponseString = string | redacted.Redacted<string>;
export interface FinalResponse {
  text?: string | redacted.Redacted<string>;
  metadata?: Metadata;
}
export type Source =
  | "ACTION_GROUP"
  | "KNOWLEDGE_BASE"
  | "PARSER"
  | (string & {});
export interface RepromptResponse {
  text?: string;
  source?: Source;
}
export interface CodeInterpreterInvocationOutput {
  executionOutput?: string;
  executionError?: string;
  files?: string[];
  executionTimeout?: boolean;
  metadata?: Metadata;
}
export interface Observation {
  traceId?: string;
  type?: Type;
  actionGroupInvocationOutput?: ActionGroupInvocationOutput;
  agentCollaboratorInvocationOutput?: AgentCollaboratorInvocationOutput;
  knowledgeBaseLookupOutput?: KnowledgeBaseLookupOutput;
  finalResponse?: FinalResponse;
  repromptResponse?: RepromptResponse;
  codeInterpreterInvocationOutput?: CodeInterpreterInvocationOutput;
}
export interface OrchestrationModelInvocationOutput {
  traceId?: string;
  rawResponse?: RawResponse;
  metadata?: Metadata;
  reasoningContent?: ReasoningContentBlock;
}
export type OrchestrationTrace =
  | {
      rationale: Rationale;
      invocationInput?: never;
      observation?: never;
      modelInvocationInput?: never;
      modelInvocationOutput?: never;
    }
  | {
      rationale?: never;
      invocationInput: InvocationInput;
      observation?: never;
      modelInvocationInput?: never;
      modelInvocationOutput?: never;
    }
  | {
      rationale?: never;
      invocationInput?: never;
      observation: Observation;
      modelInvocationInput?: never;
      modelInvocationOutput?: never;
    }
  | {
      rationale?: never;
      invocationInput?: never;
      observation?: never;
      modelInvocationInput: ModelInvocationInput;
      modelInvocationOutput?: never;
    }
  | {
      rationale?: never;
      invocationInput?: never;
      observation?: never;
      modelInvocationInput?: never;
      modelInvocationOutput: OrchestrationModelInvocationOutput;
    };
export type OutputString = string | redacted.Redacted<string>;
export interface PostProcessingParsedResponse {
  text?: string | redacted.Redacted<string>;
}
export interface PostProcessingModelInvocationOutput {
  traceId?: string;
  parsedResponse?: PostProcessingParsedResponse;
  rawResponse?: RawResponse;
  metadata?: Metadata;
  reasoningContent?: ReasoningContentBlock;
}
export type PostProcessingTrace =
  | {
      modelInvocationInput: ModelInvocationInput;
      modelInvocationOutput?: never;
    }
  | {
      modelInvocationInput?: never;
      modelInvocationOutput: PostProcessingModelInvocationOutput;
    };
export interface RoutingClassifierModelInvocationOutput {
  traceId?: string;
  rawResponse?: RawResponse;
  metadata?: Metadata;
}
export type RoutingClassifierTrace =
  | {
      invocationInput: InvocationInput;
      observation?: never;
      modelInvocationInput?: never;
      modelInvocationOutput?: never;
    }
  | {
      invocationInput?: never;
      observation: Observation;
      modelInvocationInput?: never;
      modelInvocationOutput?: never;
    }
  | {
      invocationInput?: never;
      observation?: never;
      modelInvocationInput: ModelInvocationInput;
      modelInvocationOutput?: never;
    }
  | {
      invocationInput?: never;
      observation?: never;
      modelInvocationInput?: never;
      modelInvocationOutput: RoutingClassifierModelInvocationOutput;
    };
export type FailureReasonString = string | redacted.Redacted<string>;
export interface FailureTrace {
  traceId?: string;
  failureReason?: string | redacted.Redacted<string>;
  failureCode?: number;
  metadata?: Metadata;
}
export interface CustomOrchestrationTraceEvent {
  text?: string;
}
export interface CustomOrchestrationTrace {
  traceId?: string;
  event?: CustomOrchestrationTraceEvent;
}
export type Trace =
  | {
      guardrailTrace: GuardrailTrace;
      preProcessingTrace?: never;
      orchestrationTrace?: never;
      postProcessingTrace?: never;
      routingClassifierTrace?: never;
      failureTrace?: never;
      customOrchestrationTrace?: never;
    }
  | {
      guardrailTrace?: never;
      preProcessingTrace: PreProcessingTrace;
      orchestrationTrace?: never;
      postProcessingTrace?: never;
      routingClassifierTrace?: never;
      failureTrace?: never;
      customOrchestrationTrace?: never;
    }
  | {
      guardrailTrace?: never;
      preProcessingTrace?: never;
      orchestrationTrace: OrchestrationTrace;
      postProcessingTrace?: never;
      routingClassifierTrace?: never;
      failureTrace?: never;
      customOrchestrationTrace?: never;
    }
  | {
      guardrailTrace?: never;
      preProcessingTrace?: never;
      orchestrationTrace?: never;
      postProcessingTrace: PostProcessingTrace;
      routingClassifierTrace?: never;
      failureTrace?: never;
      customOrchestrationTrace?: never;
    }
  | {
      guardrailTrace?: never;
      preProcessingTrace?: never;
      orchestrationTrace?: never;
      postProcessingTrace?: never;
      routingClassifierTrace: RoutingClassifierTrace;
      failureTrace?: never;
      customOrchestrationTrace?: never;
    }
  | {
      guardrailTrace?: never;
      preProcessingTrace?: never;
      orchestrationTrace?: never;
      postProcessingTrace?: never;
      routingClassifierTrace?: never;
      failureTrace: FailureTrace;
      customOrchestrationTrace?: never;
    }
  | {
      guardrailTrace?: never;
      preProcessingTrace?: never;
      orchestrationTrace?: never;
      postProcessingTrace?: never;
      routingClassifierTrace?: never;
      failureTrace?: never;
      customOrchestrationTrace: CustomOrchestrationTrace;
    };
export type Caller = { agentAliasArn: string };
export type CallerChain = Caller[];
export type AgentVersion = string;
export interface TracePart {
  sessionId?: string;
  trace?: Trace;
  callerChain?: Caller[];
  eventTime?: Date;
  collaboratorName?: string | redacted.Redacted<string>;
  agentId?: string;
  agentAliasId?: string;
  agentVersion?: string;
}
export type FileBody = Uint8Array | redacted.Redacted<Uint8Array>;
export interface OutputFile {
  name?: string;
  type?: string;
  bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export type OutputFiles = OutputFile[];
export interface FilePart {
  files?: OutputFile[];
}
export type ResponseStream =
  | {
      chunk: PayloadPart;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace: TracePart;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl: ReturnControlPayload;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException: InternalServerException;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException: ValidationException;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException: ThrottlingException;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException: AccessDeniedException;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException: ConflictException;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException: DependencyFailedException;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException: BadGatewayException;
      modelNotReadyException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException: ModelNotReadyException;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      modelNotReadyException?: never;
      files: FilePart;
    };
export interface InvokeAgentResponse {
  completion: stream.Stream<ResponseStream, Error, never>;
  contentType: string;
  sessionId: string;
  memoryId?: string;
}
export type NodeOutputName = string;
export type FlowInputContent = { document: any };
export type NodeInputName = string;
export interface FlowInput {
  nodeName: string;
  nodeOutputName?: string;
  content: FlowInputContent;
  nodeInputName?: string;
}
export type FlowInputs = FlowInput[];
export interface ModelPerformanceConfiguration {
  performanceConfig?: PerformanceConfiguration;
}
export type FlowExecutionId = string;
export interface InvokeFlowRequest {
  flowIdentifier: string;
  flowAliasIdentifier: string;
  inputs: FlowInput[];
  enableTrace?: boolean;
  modelPerformanceConfiguration?: ModelPerformanceConfiguration;
  executionId?: string;
}
export type NodeType =
  | "FlowInputNode"
  | "FlowOutputNode"
  | "LambdaFunctionNode"
  | "KnowledgeBaseNode"
  | "PromptNode"
  | "ConditionNode"
  | "LexNode"
  | (string & {});
export type FlowOutputContent = { document: any };
export interface FlowOutputEvent {
  nodeName: string;
  nodeType: NodeType;
  content: FlowOutputContent;
}
export type FlowCompletionReason = "SUCCESS" | "INPUT_REQUIRED" | (string & {});
export interface FlowCompletionEvent {
  completionReason: FlowCompletionReason;
}
export type FlowTraceNodeInputContent = { document: any };
export type FlowNodeOutputName = string;
export type FlowNodeInputExpression = string | redacted.Redacted<string>;
export interface FlowTraceNodeInputSource {
  nodeName: string;
  outputFieldName: string;
  expression: string | redacted.Redacted<string>;
}
export type FlowNodeIODataType =
  | "String"
  | "Number"
  | "Boolean"
  | "Object"
  | "Array"
  | (string & {});
export type FlowNodeInputCategory =
  | "LoopCondition"
  | "ReturnValueToLoopStart"
  | "ExitLoop"
  | (string & {});
export type FlowControlNodeType = "Iterator" | "Loop" | (string & {});
export interface FlowTraceNodeInputExecutionChainItem {
  nodeName: string;
  index?: number;
  type: FlowControlNodeType;
}
export type FlowTraceNodeInputExecutionChain =
  FlowTraceNodeInputExecutionChainItem[];
export interface FlowTraceNodeInputField {
  nodeInputName: string;
  content: FlowTraceNodeInputContent;
  source?: FlowTraceNodeInputSource;
  type?: FlowNodeIODataType;
  category?: FlowNodeInputCategory;
  executionChain?: FlowTraceNodeInputExecutionChainItem[];
}
export type FlowTraceNodeInputFields = FlowTraceNodeInputField[];
export interface FlowTraceNodeInputEvent {
  nodeName: string;
  timestamp: Date;
  fields: FlowTraceNodeInputField[];
}
export type FlowTraceNodeOutputContent = { document: any };
export type FlowNodeInputName = string;
export interface FlowTraceNodeOutputNext {
  nodeName: string;
  inputFieldName: string;
}
export type FlowTraceNodeOutputNextList = FlowTraceNodeOutputNext[];
export interface FlowTraceNodeOutputField {
  nodeOutputName: string;
  content: FlowTraceNodeOutputContent;
  next?: FlowTraceNodeOutputNext[];
  type?: FlowNodeIODataType;
}
export type FlowTraceNodeOutputFields = FlowTraceNodeOutputField[];
export interface FlowTraceNodeOutputEvent {
  nodeName: string;
  timestamp: Date;
  fields: FlowTraceNodeOutputField[];
}
export interface FlowTraceCondition {
  conditionName: string;
}
export type FlowTraceConditions = FlowTraceCondition[];
export interface FlowTraceConditionNodeResultEvent {
  nodeName: string;
  timestamp: Date;
  satisfiedConditions: FlowTraceCondition[];
}
export interface FlowTraceNodeActionEvent {
  nodeName: string;
  timestamp: Date;
  requestId: string;
  serviceName: string;
  operationName: string;
  operationRequest?: any;
  operationResponse?: any;
}
export type AgentTraces = TracePart[];
export type TraceElements = { agentTraces: TracePart[] };
export interface FlowTraceDependencyEvent {
  nodeName: string;
  timestamp: Date;
  traceElements: TraceElements;
}
export type FlowTrace =
  | {
      nodeInputTrace: FlowTraceNodeInputEvent;
      nodeOutputTrace?: never;
      conditionNodeResultTrace?: never;
      nodeActionTrace?: never;
      nodeDependencyTrace?: never;
    }
  | {
      nodeInputTrace?: never;
      nodeOutputTrace: FlowTraceNodeOutputEvent;
      conditionNodeResultTrace?: never;
      nodeActionTrace?: never;
      nodeDependencyTrace?: never;
    }
  | {
      nodeInputTrace?: never;
      nodeOutputTrace?: never;
      conditionNodeResultTrace: FlowTraceConditionNodeResultEvent;
      nodeActionTrace?: never;
      nodeDependencyTrace?: never;
    }
  | {
      nodeInputTrace?: never;
      nodeOutputTrace?: never;
      conditionNodeResultTrace?: never;
      nodeActionTrace: FlowTraceNodeActionEvent;
      nodeDependencyTrace?: never;
    }
  | {
      nodeInputTrace?: never;
      nodeOutputTrace?: never;
      conditionNodeResultTrace?: never;
      nodeActionTrace?: never;
      nodeDependencyTrace: FlowTraceDependencyEvent;
    };
export interface FlowTraceEvent {
  trace: FlowTrace;
}
export type FlowMultiTurnInputContent = { document: any };
export interface FlowMultiTurnInputRequestEvent {
  nodeName: string;
  nodeType: NodeType;
  content: FlowMultiTurnInputContent;
}
export type FlowResponseStream =
  | {
      flowOutputEvent: FlowOutputEvent;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent: FlowCompletionEvent;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent: FlowTraceEvent;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException: InternalServerException;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException: ValidationException;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException: ThrottlingException;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException: AccessDeniedException;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException: ConflictException;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException: DependencyFailedException;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException: BadGatewayException;
      flowMultiTurnInputRequestEvent?: never;
    }
  | {
      flowOutputEvent?: never;
      flowCompletionEvent?: never;
      flowTraceEvent?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      flowMultiTurnInputRequestEvent: FlowMultiTurnInputRequestEvent;
    };
export interface InvokeFlowResponse {
  responseStream: stream.Stream<FlowResponseStream, Error, never>;
  executionId?: string;
}
export type Instruction = string | redacted.Redacted<string>;
export type SessionTTL = number;
export type ResourceName = string | redacted.Redacted<string>;
export type ResourceDescription = string | redacted.Redacted<string>;
export type ActionGroupSignature =
  | "AMAZON.UserInput"
  | "AMAZON.CodeInterpreter"
  | "ANTHROPIC.Computer"
  | "ANTHROPIC.Bash"
  | "ANTHROPIC.TextEditor"
  | (string & {});
export type LambdaResourceArn = string;
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
export type FunctionDescription = string;
export type ParameterName = string;
export type ParameterDescription = string;
export type ParameterType =
  | "string"
  | "number"
  | "integer"
  | "boolean"
  | "array"
  | (string & {});
export interface ParameterDetail {
  description?: string;
  type: ParameterType;
  required?: boolean;
}
export type ParameterMap = { [key: string]: ParameterDetail | undefined };
export type RequireConfirmation = "ENABLED" | "DISABLED" | (string & {});
export interface FunctionDefinition {
  name: string | redacted.Redacted<string>;
  description?: string;
  parameters?: { [key: string]: ParameterDetail | undefined };
  requireConfirmation?: RequireConfirmation;
}
export type Functions = FunctionDefinition[];
export type FunctionSchema = { functions: FunctionDefinition[] };
export type ActionGroupSignatureParams = { [key: string]: string | undefined };
export interface AgentActionGroup {
  actionGroupName: string | redacted.Redacted<string>;
  description?: string | redacted.Redacted<string>;
  parentActionGroupSignature?: ActionGroupSignature;
  actionGroupExecutor?: ActionGroupExecutor;
  apiSchema?: APISchema;
  functionSchema?: FunctionSchema;
  parentActionGroupSignatureParams?: { [key: string]: string | undefined };
}
export type AgentActionGroups = AgentActionGroup[];
export interface KnowledgeBase {
  knowledgeBaseId: string;
  description: string | redacted.Redacted<string>;
  retrievalConfiguration?: KnowledgeBaseRetrievalConfiguration;
}
export type KnowledgeBases = KnowledgeBase[];
export type GuardrailIdentifierWithArn = string;
export type GuardrailVersion = string;
export interface GuardrailConfigurationWithArn {
  guardrailIdentifier: string;
  guardrailVersion: string;
}
export type PromptState = "ENABLED" | "DISABLED" | (string & {});
export type BasePromptTemplate = string | redacted.Redacted<string>;
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
export type AgentCollaboration =
  | "SUPERVISOR"
  | "SUPERVISOR_ROUTER"
  | "DISABLED"
  | (string & {});
export type CollaborationInstruction = string | redacted.Redacted<string>;
export type RelayConversationHistory =
  | "TO_COLLABORATOR"
  | "DISABLED"
  | (string & {});
export interface CollaboratorConfiguration {
  collaboratorName: string | redacted.Redacted<string>;
  collaboratorInstruction: string | redacted.Redacted<string>;
  agentAliasArn?: string;
  relayConversationHistory?: RelayConversationHistory;
}
export type CollaboratorConfigurations = CollaboratorConfiguration[];
export interface InlineSessionState {
  sessionAttributes?: { [key: string]: string | undefined };
  promptSessionAttributes?: { [key: string]: string | undefined };
  returnControlInvocationResults?: InvocationResultMember[];
  invocationId?: string;
  files?: InputFile[];
  conversationHistory?: ConversationHistory;
}
export interface Collaborator {
  customerEncryptionKeyArn?: string;
  foundationModel: string;
  instruction: string | redacted.Redacted<string>;
  idleSessionTTLInSeconds?: number;
  actionGroups?: AgentActionGroup[];
  knowledgeBases?: KnowledgeBase[];
  guardrailConfiguration?: GuardrailConfigurationWithArn;
  promptOverrideConfiguration?: PromptOverrideConfiguration;
  agentCollaboration?: AgentCollaboration;
  collaboratorConfigurations?: CollaboratorConfiguration[];
  agentName?: string | redacted.Redacted<string>;
}
export type Collaborators = Collaborator[];
export interface InlineBedrockModelConfigurations {
  performanceConfig?: PerformanceConfiguration;
}
export type OrchestrationType =
  | "DEFAULT"
  | "CUSTOM_ORCHESTRATION"
  | (string & {});
export type OrchestrationExecutor = { lambda: string };
export interface CustomOrchestration {
  executor?: OrchestrationExecutor;
}
export interface InvokeInlineAgentRequest {
  customerEncryptionKeyArn?: string;
  foundationModel: string;
  instruction: string | redacted.Redacted<string>;
  idleSessionTTLInSeconds?: number;
  actionGroups?: AgentActionGroup[];
  knowledgeBases?: KnowledgeBase[];
  guardrailConfiguration?: GuardrailConfigurationWithArn;
  promptOverrideConfiguration?: PromptOverrideConfiguration;
  agentCollaboration?: AgentCollaboration;
  collaboratorConfigurations?: CollaboratorConfiguration[];
  agentName?: string | redacted.Redacted<string>;
  sessionId: string;
  endSession?: boolean;
  enableTrace?: boolean;
  inputText?: string | redacted.Redacted<string>;
  streamingConfigurations?: StreamingConfigurations;
  promptCreationConfigurations?: PromptCreationConfigurations;
  inlineSessionState?: InlineSessionState;
  collaborators?: Collaborator[];
  bedrockModelConfigurations?: InlineBedrockModelConfigurations;
  orchestrationType?: OrchestrationType;
  customOrchestration?: CustomOrchestration;
}
export interface InlineAgentPayloadPart {
  bytes?: Uint8Array | redacted.Redacted<Uint8Array>;
  attribution?: Attribution;
}
export interface InlineAgentTracePart {
  sessionId?: string;
  trace?: Trace;
  callerChain?: Caller[];
  eventTime?: Date;
  collaboratorName?: string | redacted.Redacted<string>;
}
export interface InlineAgentReturnControlPayload {
  invocationInputs?: InvocationInputMember[];
  invocationId?: string;
}
export interface InlineAgentFilePart {
  files?: OutputFile[];
}
export type InlineAgentResponseStream =
  | {
      chunk: InlineAgentPayloadPart;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace: InlineAgentTracePart;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl: InlineAgentReturnControlPayload;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException: InternalServerException;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException: ValidationException;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException: ThrottlingException;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException: AccessDeniedException;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException: ConflictException;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException: DependencyFailedException;
      badGatewayException?: never;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException: BadGatewayException;
      files?: never;
    }
  | {
      chunk?: never;
      trace?: never;
      returnControl?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
      files: InlineAgentFilePart;
    };
export interface InvokeInlineAgentResponse {
  completion: stream.Stream<InlineAgentResponseStream, Error, never>;
  contentType: string;
  sessionId: string;
}
export type FlowExecutionEventType = "Node" | "Flow" | (string & {});
export interface ListFlowExecutionEventsRequest {
  flowIdentifier: string;
  flowAliasIdentifier: string;
  executionIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  eventType: FlowExecutionEventType;
}
export type FlowExecutionContent = { document: any };
export interface FlowInputField {
  name: string;
  content: FlowExecutionContent;
}
export type FlowInputFields = FlowInputField[];
export interface FlowExecutionInputEvent {
  nodeName: string;
  timestamp: Date;
  fields: FlowInputField[];
}
export interface FlowOutputField {
  name: string;
  content: FlowExecutionContent;
}
export type FlowOutputFields = FlowOutputField[];
export interface FlowExecutionOutputEvent {
  nodeName: string;
  timestamp: Date;
  fields: FlowOutputField[];
}
export type NodeExecutionContent = { document: any };
export interface NodeInputSource {
  nodeName: string;
  outputFieldName: string;
  expression: string | redacted.Redacted<string>;
}
export interface NodeInputExecutionChainItem {
  nodeName: string;
  index?: number;
  type: FlowControlNodeType;
}
export type NodeInputExecutionChain = NodeInputExecutionChainItem[];
export interface NodeInputField {
  name: string;
  content: NodeExecutionContent;
  source?: NodeInputSource;
  type?: FlowNodeIODataType;
  category?: FlowNodeInputCategory;
  executionChain?: NodeInputExecutionChainItem[];
}
export type NodeInputFields = NodeInputField[];
export interface NodeInputEvent {
  nodeName: string;
  timestamp: Date;
  fields: NodeInputField[];
}
export interface NodeOutputNext {
  nodeName: string;
  inputFieldName: string;
}
export type NodeOutputNextList = NodeOutputNext[];
export interface NodeOutputField {
  name: string;
  content: NodeExecutionContent;
  next?: NodeOutputNext[];
  type?: FlowNodeIODataType;
}
export type NodeOutputFields = NodeOutputField[];
export interface NodeOutputEvent {
  nodeName: string;
  timestamp: Date;
  fields: NodeOutputField[];
}
export interface SatisfiedCondition {
  conditionName: string;
}
export type SatisfiedConditions = SatisfiedCondition[];
export interface ConditionResultEvent {
  nodeName: string;
  timestamp: Date;
  satisfiedConditions: SatisfiedCondition[];
}
export type NodeErrorCode =
  | "VALIDATION"
  | "DEPENDENCY_FAILED"
  | "BAD_GATEWAY"
  | "INTERNAL_SERVER"
  | (string & {});
export interface NodeFailureEvent {
  nodeName: string;
  timestamp: Date;
  errorCode: NodeErrorCode;
  errorMessage: string;
}
export type FlowErrorCode =
  | "VALIDATION"
  | "INTERNAL_SERVER"
  | "NODE_EXECUTION_FAILED"
  | (string & {});
export interface FlowFailureEvent {
  timestamp: Date;
  errorCode: FlowErrorCode;
  errorMessage: string;
}
export interface NodeActionEvent {
  nodeName: string;
  timestamp: Date;
  requestId: string;
  serviceName: string;
  operationName: string;
  operationRequest?: any;
  operationResponse?: any;
}
export type NodeTraceElements = { agentTraces: TracePart[] };
export interface NodeDependencyEvent {
  nodeName: string;
  timestamp: Date;
  traceElements: NodeTraceElements;
}
export type FlowExecutionEvent =
  | {
      flowInputEvent: FlowExecutionInputEvent;
      flowOutputEvent?: never;
      nodeInputEvent?: never;
      nodeOutputEvent?: never;
      conditionResultEvent?: never;
      nodeFailureEvent?: never;
      flowFailureEvent?: never;
      nodeActionEvent?: never;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent: FlowExecutionOutputEvent;
      nodeInputEvent?: never;
      nodeOutputEvent?: never;
      conditionResultEvent?: never;
      nodeFailureEvent?: never;
      flowFailureEvent?: never;
      nodeActionEvent?: never;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent?: never;
      nodeInputEvent: NodeInputEvent;
      nodeOutputEvent?: never;
      conditionResultEvent?: never;
      nodeFailureEvent?: never;
      flowFailureEvent?: never;
      nodeActionEvent?: never;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent?: never;
      nodeInputEvent?: never;
      nodeOutputEvent: NodeOutputEvent;
      conditionResultEvent?: never;
      nodeFailureEvent?: never;
      flowFailureEvent?: never;
      nodeActionEvent?: never;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent?: never;
      nodeInputEvent?: never;
      nodeOutputEvent?: never;
      conditionResultEvent: ConditionResultEvent;
      nodeFailureEvent?: never;
      flowFailureEvent?: never;
      nodeActionEvent?: never;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent?: never;
      nodeInputEvent?: never;
      nodeOutputEvent?: never;
      conditionResultEvent?: never;
      nodeFailureEvent: NodeFailureEvent;
      flowFailureEvent?: never;
      nodeActionEvent?: never;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent?: never;
      nodeInputEvent?: never;
      nodeOutputEvent?: never;
      conditionResultEvent?: never;
      nodeFailureEvent?: never;
      flowFailureEvent: FlowFailureEvent;
      nodeActionEvent?: never;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent?: never;
      nodeInputEvent?: never;
      nodeOutputEvent?: never;
      conditionResultEvent?: never;
      nodeFailureEvent?: never;
      flowFailureEvent?: never;
      nodeActionEvent: NodeActionEvent;
      nodeDependencyEvent?: never;
    }
  | {
      flowInputEvent?: never;
      flowOutputEvent?: never;
      nodeInputEvent?: never;
      nodeOutputEvent?: never;
      conditionResultEvent?: never;
      nodeFailureEvent?: never;
      flowFailureEvent?: never;
      nodeActionEvent?: never;
      nodeDependencyEvent: NodeDependencyEvent;
    };
export type FlowExecutionEvents = FlowExecutionEvent[];
export interface ListFlowExecutionEventsResponse {
  flowExecutionEvents: FlowExecutionEvent[];
  nextToken?: string;
}
export interface ListFlowExecutionsRequest {
  flowIdentifier: string;
  flowAliasIdentifier?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface FlowExecutionSummary {
  executionArn: string;
  flowAliasIdentifier: string;
  flowIdentifier: string;
  flowVersion: string;
  status: FlowExecutionStatus;
  createdAt: Date;
  endedAt?: Date;
}
export type FlowExecutionSummaries = FlowExecutionSummary[];
export interface ListFlowExecutionsResponse {
  flowExecutionSummaries: FlowExecutionSummary[];
  nextToken?: string;
}
export interface ListInvocationsRequest {
  nextToken?: string;
  maxResults?: number;
  sessionIdentifier: string;
}
export interface InvocationSummary {
  sessionId: string;
  invocationId: string;
  createdAt: Date;
}
export type InvocationSummaries = InvocationSummary[];
export interface ListInvocationsResponse {
  invocationSummaries: InvocationSummary[];
  nextToken?: string;
}
export interface ListInvocationStepsRequest {
  invocationIdentifier?: string;
  nextToken?: string;
  maxResults?: number;
  sessionIdentifier: string;
}
export interface InvocationStepSummary {
  sessionId: string;
  invocationId: string;
  invocationStepId: string;
  invocationStepTime: Date;
}
export type InvocationStepSummaries = InvocationStepSummary[];
export interface ListInvocationStepsResponse {
  invocationStepSummaries: InvocationStepSummary[];
  nextToken?: string;
}
export interface ListSessionsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface SessionSummary {
  sessionId: string;
  sessionArn: string;
  sessionStatus: SessionStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export type SessionSummaries = SessionSummary[];
export interface ListSessionsResponse {
  sessionSummaries: SessionSummary[];
  nextToken?: string;
}
export type TaggableResourcesArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface TextPrompt {
  text: string;
}
export type InputPrompt = { textPrompt: TextPrompt };
export interface OptimizePromptRequest {
  input: InputPrompt;
  targetModelId: string;
}
export type OptimizedPrompt = { textPrompt: TextPrompt };
export interface OptimizedPromptEvent {
  optimizedPrompt?: OptimizedPrompt;
}
export interface AnalyzePromptEvent {
  message?: string;
}
export type OptimizedPromptStream =
  | {
      optimizedPromptEvent: OptimizedPromptEvent;
      analyzePromptEvent?: never;
      internalServerException?: never;
      throttlingException?: never;
      validationException?: never;
      dependencyFailedException?: never;
      accessDeniedException?: never;
      badGatewayException?: never;
    }
  | {
      optimizedPromptEvent?: never;
      analyzePromptEvent: AnalyzePromptEvent;
      internalServerException?: never;
      throttlingException?: never;
      validationException?: never;
      dependencyFailedException?: never;
      accessDeniedException?: never;
      badGatewayException?: never;
    }
  | {
      optimizedPromptEvent?: never;
      analyzePromptEvent?: never;
      internalServerException: InternalServerException;
      throttlingException?: never;
      validationException?: never;
      dependencyFailedException?: never;
      accessDeniedException?: never;
      badGatewayException?: never;
    }
  | {
      optimizedPromptEvent?: never;
      analyzePromptEvent?: never;
      internalServerException?: never;
      throttlingException: ThrottlingException;
      validationException?: never;
      dependencyFailedException?: never;
      accessDeniedException?: never;
      badGatewayException?: never;
    }
  | {
      optimizedPromptEvent?: never;
      analyzePromptEvent?: never;
      internalServerException?: never;
      throttlingException?: never;
      validationException: ValidationException;
      dependencyFailedException?: never;
      accessDeniedException?: never;
      badGatewayException?: never;
    }
  | {
      optimizedPromptEvent?: never;
      analyzePromptEvent?: never;
      internalServerException?: never;
      throttlingException?: never;
      validationException?: never;
      dependencyFailedException: DependencyFailedException;
      accessDeniedException?: never;
      badGatewayException?: never;
    }
  | {
      optimizedPromptEvent?: never;
      analyzePromptEvent?: never;
      internalServerException?: never;
      throttlingException?: never;
      validationException?: never;
      dependencyFailedException?: never;
      accessDeniedException: AccessDeniedException;
      badGatewayException?: never;
    }
  | {
      optimizedPromptEvent?: never;
      analyzePromptEvent?: never;
      internalServerException?: never;
      throttlingException?: never;
      validationException?: never;
      dependencyFailedException?: never;
      accessDeniedException?: never;
      badGatewayException: BadGatewayException;
    };
export interface OptimizePromptResponse {
  optimizedPrompt: stream.Stream<OptimizedPromptStream, Error, never>;
}
export interface PutInvocationStepRequest {
  sessionIdentifier: string;
  invocationIdentifier: string;
  invocationStepTime: Date;
  payload: InvocationStepPayload;
  invocationStepId?: string;
}
export interface PutInvocationStepResponse {
  invocationStepId: string;
}
export type RerankQueryContentType = "TEXT" | (string & {});
export interface RerankTextDocument {
  text?: string;
}
export interface RerankQuery {
  type: RerankQueryContentType;
  textQuery: RerankTextDocument;
}
export type RerankQueriesList = RerankQuery[];
export type RerankSourceType = "INLINE" | (string & {});
export type RerankDocumentType = "TEXT" | "JSON" | (string & {});
export interface RerankDocument {
  type: RerankDocumentType;
  textDocument?: RerankTextDocument;
  jsonDocument?: any;
}
export interface RerankSource {
  type: RerankSourceType;
  inlineDocumentSource: RerankDocument;
}
export type RerankSourcesList = RerankSource[];
export type RerankingConfigurationType =
  | "BEDROCK_RERANKING_MODEL"
  | (string & {});
export interface BedrockRerankingModelConfiguration {
  modelArn: string;
  additionalModelRequestFields?: { [key: string]: any | undefined };
}
export interface BedrockRerankingConfiguration {
  numberOfResults?: number;
  modelConfiguration: BedrockRerankingModelConfiguration;
}
export interface RerankingConfiguration {
  type: RerankingConfigurationType;
  bedrockRerankingConfiguration: BedrockRerankingConfiguration;
}
export interface RerankRequest {
  queries: RerankQuery[];
  sources: RerankSource[];
  rerankingConfiguration: RerankingConfiguration;
  nextToken?: string;
}
export interface RerankResult {
  index: number;
  relevanceScore: number;
  document?: RerankDocument;
}
export type RerankResultsList = RerankResult[];
export interface RerankResponse {
  results: RerankResult[];
  nextToken?: string;
}
export type KnowledgeBaseQueryType = "TEXT" | "IMAGE" | (string & {});
export type InputImageFormat = "png" | "jpeg" | "gif" | "webp" | (string & {});
export interface InputImage {
  format: InputImageFormat;
  inlineContent: Uint8Array | redacted.Redacted<Uint8Array>;
}
export interface KnowledgeBaseQuery {
  type?: KnowledgeBaseQueryType;
  text?: string;
  image?: InputImage;
}
export interface GuardrailConfiguration {
  guardrailId: string;
  guardrailVersion: string;
}
export interface RetrieveRequest {
  knowledgeBaseId: string;
  retrievalQuery: KnowledgeBaseQuery;
  retrievalConfiguration?: KnowledgeBaseRetrievalConfiguration;
  guardrailConfiguration?: GuardrailConfiguration;
  nextToken?: string;
  userContext?: UserContext;
}
export interface KnowledgeBaseRetrievalResult {
  content: RetrievalResultContent;
  location?: RetrievalResultLocation;
  score?: number;
  metadata?: { [key: string]: any | undefined };
  documentId?: string;
}
export type KnowledgeBaseRetrievalResults = KnowledgeBaseRetrievalResult[];
export type GuadrailAction = "INTERVENED" | "NONE" | (string & {});
export interface RetrieveResponse {
  retrievalResults: KnowledgeBaseRetrievalResult[];
  guardrailAction?: GuadrailAction;
  nextToken?: string;
}
export interface RetrieveAndGenerateInput {
  text: string;
}
export type RetrieveAndGenerateType =
  | "KNOWLEDGE_BASE"
  | "EXTERNAL_SOURCES"
  | (string & {});
export type TextPromptTemplate = string | redacted.Redacted<string>;
export interface PromptTemplate {
  textPromptTemplate?: string | redacted.Redacted<string>;
}
export type MaxTokens = number;
export type RAGStopSequences = string[];
export interface TextInferenceConfig {
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  stopSequences?: string[];
}
export interface InferenceConfig {
  textInferenceConfig?: TextInferenceConfig;
}
export interface GenerationConfiguration {
  promptTemplate?: PromptTemplate;
  guardrailConfiguration?: GuardrailConfiguration;
  inferenceConfig?: InferenceConfig;
  additionalModelRequestFields?: { [key: string]: any | undefined };
  performanceConfig?: PerformanceConfiguration;
}
export type QueryTransformationType = "QUERY_DECOMPOSITION" | (string & {});
export interface QueryTransformationConfiguration {
  type: QueryTransformationType;
}
export interface OrchestrationConfiguration {
  promptTemplate?: PromptTemplate;
  inferenceConfig?: InferenceConfig;
  additionalModelRequestFields?: { [key: string]: any | undefined };
  queryTransformationConfiguration?: QueryTransformationConfiguration;
  performanceConfig?: PerformanceConfiguration;
}
export interface KnowledgeBaseRetrieveAndGenerateConfiguration {
  knowledgeBaseId: string;
  modelArn: string;
  retrievalConfiguration?: KnowledgeBaseRetrievalConfiguration;
  generationConfiguration?: GenerationConfiguration;
  orchestrationConfiguration?: OrchestrationConfiguration;
}
export type ExternalSourceType = "S3" | "BYTE_CONTENT" | (string & {});
export interface S3ObjectDoc {
  uri: string;
}
export type Identifier = string | redacted.Redacted<string>;
export type ContentType = string;
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
  inferenceConfig?: InferenceConfig;
  additionalModelRequestFields?: { [key: string]: any | undefined };
  performanceConfig?: PerformanceConfiguration;
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
export interface RetrieveAndGenerateSessionConfiguration {
  kmsKeyArn: string;
}
export interface RetrieveAndGenerateRequest {
  sessionId?: string;
  input: RetrieveAndGenerateInput;
  retrieveAndGenerateConfiguration?: RetrieveAndGenerateConfiguration;
  sessionConfiguration?: RetrieveAndGenerateSessionConfiguration;
  userContext?: UserContext;
}
export interface RetrieveAndGenerateOutput {
  text: string;
}
export interface RetrieveAndGenerateResponse {
  sessionId: string;
  output: RetrieveAndGenerateOutput;
  citations?: Citation[];
  guardrailAction?: GuadrailAction;
}
export interface RetrieveAndGenerateStreamRequest {
  sessionId?: string;
  input: RetrieveAndGenerateInput;
  retrieveAndGenerateConfiguration?: RetrieveAndGenerateConfiguration;
  sessionConfiguration?: RetrieveAndGenerateSessionConfiguration;
  userContext?: UserContext;
}
export interface RetrieveAndGenerateOutputEvent {
  text: string;
}
export interface CitationEvent {
  citation?: Citation;
  generatedResponsePart?: GeneratedResponsePart;
  retrievedReferences?: RetrievedReference[];
}
export interface GuardrailEvent {
  action?: GuadrailAction;
}
export type RetrieveAndGenerateStreamResponseOutput =
  | {
      output: RetrieveAndGenerateOutputEvent;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation: CitationEvent;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail: GuardrailEvent;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException: InternalServerException;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException: ValidationException;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException: ThrottlingException;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException: AccessDeniedException;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException: ConflictException;
      dependencyFailedException?: never;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException: DependencyFailedException;
      badGatewayException?: never;
    }
  | {
      output?: never;
      citation?: never;
      guardrail?: never;
      internalServerException?: never;
      validationException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      accessDeniedException?: never;
      conflictException?: never;
      dependencyFailedException?: never;
      badGatewayException: BadGatewayException;
    };
export interface RetrieveAndGenerateStreamResponse {
  stream: stream.Stream<RetrieveAndGenerateStreamResponseOutput, Error, never>;
  sessionId: string;
}
export type FlowExecutionName = string;
export interface StartFlowExecutionRequest {
  flowIdentifier: string;
  flowAliasIdentifier: string;
  flowExecutionName?: string;
  inputs: FlowInput[];
  modelPerformanceConfiguration?: ModelPerformanceConfiguration;
}
export interface StartFlowExecutionResponse {
  executionArn?: string;
}
export interface StopFlowExecutionRequest {
  flowIdentifier: string;
  flowAliasIdentifier: string;
  executionIdentifier: string;
}
export interface StopFlowExecutionResponse {
  executionArn?: string;
  status: FlowExecutionStatus;
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
export interface UpdateSessionRequest {
  sessionMetadata?: { [key: string]: string | undefined };
  sessionIdentifier: string;
}
export interface UpdateSessionResponse {
  sessionId: string;
  sessionArn: string;
  sessionStatus: SessionStatus;
  createdAt: Date;
  lastUpdatedAt: Date;
}
export type AgenticRetrieveStreamError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information from one or more knowledge bases using an agentic approach. Agentic retrieval uses a foundation model to intelligently decompose complex queries into sub-queries and iteratively retrieve relevant information from your knowledge bases. This approach improves retrieval accuracy for complex, multi-step questions that a single retrieval pass might not fully address.
 *
 * The operation returns results through a stream that includes retrieval results, trace events for visibility into the process, and a generated response synthesized from the results by default, which can be turned off.
 */
export const agenticRetrieveStream: API.OperationMethod<
  AgenticRetrieveStreamRequest,
  AgenticRetrieveStreamResponse,
  AgenticRetrieveStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /agenticRetrieveStream",
    input: {
      messages: D.list({ content: { text: 0 }, role: 0 }),
      retrievers: D.list({
        description: 0,
        configuration: {
          knowledgeBase: {
            knowledgeBaseId: 0,
            retrievalOverrides: {
              filter: i_RetrievalFilter,
              maxNumberOfResults: 0,
            },
          },
        },
      }),
      agenticRetrieveConfiguration: {
        foundationModelType: 0,
        foundationModelConfiguration: {
          type: 0,
          bedrockFoundationModelConfiguration: {
            modelConfiguration: { modelArn: 0 },
          },
        },
        rerankingModelType: 0,
        rerankingConfiguration: {
          type: 0,
          bedrockRerankingConfiguration: {
            modelConfiguration: { modelArn: 0 },
          },
        },
        maxAgentIteration: 0,
      },
      policyConfiguration: {
        bedrockGuardrailConfiguration: { guardrailId: 0, guardrailVersion: 0 },
      },
      nextToken: 0,
      userContext: i_UserContext,
      memoryConfiguration: {
        memoryId: 0,
        sessionBinding: { actorId: 0, sessionId: 0 },
        retrievalConfigs: D.list({
          namespace: 0,
          namespacePath: 0,
          strategyId: 0,
          metadataFilters: D.list({
            left: { metadataKey: 0 },
            operator: 0,
            right: {
              metadataValue: {
                stringValue: 0,
                numberValue: 0,
                stringListValue: 0,
                dateTimeValue: 0,
              },
            },
          }),
        }),
        persistenceMode: 0,
      },
      generateResponse: 0,
    },
    output: {
      stream: D.m({
        payload: true,
        shape: D.events({
          result: { results: D.list({ content: o_RetrievalContent }) },
          traceEvent: {
            attributes: {
              retrievalResponse: D.list({ content: o_RetrievalContent }),
            },
          },
          responseEvent: 0,
          internalServerException: 0,
          validationException: 0,
          resourceNotFoundException: 0,
          serviceQuotaExceededException: 0,
          throttlingException: 0,
          accessDeniedException: 0,
          conflictException: 0,
          dependencyFailedException: 0,
          badGatewayException: 0,
        }),
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AgenticRetrieveStream",
})) as any;

export type CheckIngestedDocumentAclError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Checks whether a user has access to a specific document by verifying against the ingested access control list (ACL) in a knowledge base. Use this operation to validate that document-level access control is working as expected after ingestion. To use this operation, you must have the `bedrock:CheckIngestedDocumentAcl` permission.
 */
export const checkIngestedDocumentAcl: API.OperationMethod<
  CheckIngestedDocumentAclRequest,
  CheckIngestedDocumentAclResponse,
  CheckIngestedDocumentAclError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/check-ingested-document-acl",
    input: {
      knowledgeBaseId: 0,
      dataSourceId: 0,
      documentId: 0,
      userContext: i_UserContext,
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
  operationName: "CheckIngestedDocumentAcl",
})) as any;

export type CreateInvocationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a new invocation within a session. An invocation groups the related invocation steps that store the content from a conversation. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 *
 * Related APIs
 *
 * - ListInvocations
 *
 * - ListSessions
 *
 * - GetSession
 */
export const createInvocation: API.OperationMethod<
  CreateInvocationRequest,
  CreateInvocationResponse,
  CreateInvocationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sessions/{sessionIdentifier}/invocations/",
    input: { invocationId: 0, description: 0, sessionIdentifier: 0 },
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateInvocation",
})) as any;

export type CreateSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a session to temporarily store conversations for generative AI (GenAI) applications built with open-source frameworks such as LangGraph and LlamaIndex. Sessions enable you to save the state of conversations at checkpoints, with the added security and infrastructure of Amazon Web Services. For more information, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 *
 * By default, Amazon Bedrock uses Amazon Web Services-managed keys for session encryption, including session metadata, or you can use your own KMS key. For more information, see Amazon Bedrock session encryption.
 *
 * You use a session to store state and conversation history for generative AI applications built with open-source frameworks. For Amazon Bedrock Agents, the service automatically manages conversation context and associates them with the agent-specific sessionId you specify in the InvokeAgent API operation.
 *
 * Related APIs:
 *
 * - ListSessions
 *
 * - GetSession
 *
 * - EndSession
 *
 * - DeleteSession
 */
export const createSession: API.OperationMethod<
  CreateSessionRequest,
  CreateSessionResponse,
  CreateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sessions/",
    input: { sessionMetadata: 0, encryptionKeyArn: 0, tags: 0 },
    output: { createdAt: D.ts },
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
  operationName: "CreateSession",
})) as any;

export type DeleteAgentMemoryError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes memory from the specified memory identifier.
 */
export const deleteAgentMemory: API.OperationMethod<
  DeleteAgentMemoryRequest,
  DeleteAgentMemoryResponse,
  DeleteAgentMemoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /agents/{agentId}/agentAliases/{agentAliasId}/memories",
    input: {
      agentId: 0,
      agentAliasId: 0,
      memoryId: D.m({ query: "memoryId" }),
      sessionId: D.m({ query: "sessionId" }),
    },
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAgentMemory",
})) as any;

export type DeleteSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a session that you ended. You can't delete a session with an `ACTIVE` status. To delete an active session, you must first end it with the EndSession API operation. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const deleteSession: API.OperationMethod<
  DeleteSessionRequest,
  DeleteSessionResponse,
  DeleteSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /sessions/{sessionIdentifier}/",
    input: { sessionIdentifier: 0 },
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
  operationName: "DeleteSession",
})) as any;

export type EndSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Ends the session. After you end a session, you can still access its content but you can’t add to it. To delete the session and it's content, you use the DeleteSession API operation. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const endSession: API.OperationMethod<
  EndSessionRequest,
  EndSessionResponse,
  EndSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /sessions/{sessionIdentifier}",
    input: { sessionIdentifier: 0 },
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
  operationName: "EndSession",
})) as any;

export type GenerateQueryError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Generates an SQL query from a natural language query. For more information, see Generate a query for structured data in the Amazon Bedrock User Guide.
 */
export const generateQuery: API.OperationMethod<
  GenerateQueryRequest,
  GenerateQueryResponse,
  GenerateQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /generateQuery",
    input: {
      queryGenerationInput: { type: 0, text: 0 },
      transformationConfiguration: {
        mode: 0,
        textToSqlConfiguration: {
          type: 0,
          knowledgeBaseConfiguration: { knowledgeBaseArn: 0 },
        },
      },
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GenerateQuery",
})) as any;

export type GetAgentMemoryError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets the sessions stored in the memory of the agent.
 */
export const getAgentMemory: API.PaginatedOperationMethod<
  GetAgentMemoryRequest,
  GetAgentMemoryResponse,
  GetAgentMemoryError,
  Credentials | HttpClient.HttpClient,
  Memory
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /agents/{agentId}/agentAliases/{agentAliasId}/memories",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxItems: D.m({ query: "maxItems" }),
      agentId: 0,
      agentAliasId: 0,
      memoryType: D.m({ query: "memoryType" }),
      memoryId: D.m({ query: "memoryId" }),
    },
    output: {
      memoryContents: D.list({
        sessionSummary: { sessionStartTime: D.ts, sessionExpiryTime: D.ts },
      }),
    },
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentMemory",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "memoryContents",
    pageSize: "maxItems",
  } as const,
})) as any;

export type GetDocumentContentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the content of an ingested document from a knowledge base. Returns a pre-signed URL for secure document access.
 */
export const getDocumentContent: API.OperationMethod<
  GetDocumentContentRequest,
  GetDocumentContentResponse,
  GetDocumentContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/documents/{documentId}/content",
    input: {
      knowledgeBaseId: 0,
      dataSourceId: 0,
      documentId: 0,
      outputFormat: 0,
      userContext: i_UserContext,
    },
    output: { presignedUrl: D.secret },
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
  operationName: "GetDocumentContent",
})) as any;

export type GetExecutionFlowSnapshotError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the flow definition snapshot used for a flow execution. The snapshot represents the flow metadata and definition as it existed at the time the execution was started. Note that even if the flow is edited after an execution starts, the snapshot connected to the execution remains unchanged.
 *
 * Flow executions is in preview release for Amazon Bedrock and is subject to change.
 */
export const getExecutionFlowSnapshot: API.OperationMethod<
  GetExecutionFlowSnapshotRequest,
  GetExecutionFlowSnapshotResponse,
  GetExecutionFlowSnapshotError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /flows/{flowIdentifier}/aliases/{flowAliasIdentifier}/executions/{executionIdentifier}/flowsnapshot",
    input: {
      flowIdentifier: 0,
      flowAliasIdentifier: 0,
      executionIdentifier: 0,
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
  operationName: "GetExecutionFlowSnapshot",
})) as any;

export type GetFlowExecutionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a specific flow execution, including its status, start and end times, and any errors that occurred during execution.
 */
export const getFlowExecution: API.OperationMethod<
  GetFlowExecutionRequest,
  GetFlowExecutionResponse,
  GetFlowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /flows/{flowIdentifier}/aliases/{flowAliasIdentifier}/executions/{executionIdentifier}",
    input: {
      flowIdentifier: 0,
      flowAliasIdentifier: 0,
      executionIdentifier: 0,
    },
    output: { startedAt: D.ts, endedAt: D.ts },
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
  operationName: "GetFlowExecution",
})) as any;

export type GetIngestedDocumentAclError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the ingested access control list (ACL) for a specific document in a knowledge base. Use this operation to inspect the allow and deny lists that were ingested for a document to troubleshoot access control issues. To use this operation, you must have the `bedrock:GetIngestedDocumentAcl` permission.
 */
export const getIngestedDocumentAcl: API.OperationMethod<
  GetIngestedDocumentAclRequest,
  GetIngestedDocumentAclResponse,
  GetIngestedDocumentAclError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgebases/{knowledgeBaseId}/datasources/{dataSourceId}/get-ingested-document-acl",
    input: { knowledgeBaseId: 0, dataSourceId: 0, documentId: 0 },
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
  operationName: "GetIngestedDocumentAcl",
})) as any;

export type GetInvocationStepError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a specific invocation step within an invocation in a session. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const getInvocationStep: API.OperationMethod<
  GetInvocationStepRequest,
  GetInvocationStepResponse,
  GetInvocationStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /sessions/{sessionIdentifier}/invocationSteps/{invocationStepId}",
    input: {
      invocationIdentifier: 0,
      invocationStepId: 0,
      sessionIdentifier: 0,
    },
    output: {
      invocationStep: {
        invocationStepTime: D.ts,
        payload: {
          contentBlocks: D.list({ image: { source: { bytes: D.blob } } }),
        },
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
  operationName: "GetInvocationStep",
})) as any;

export type GetSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves details about a specific session. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /sessions/{sessionIdentifier}/",
    input: { sessionIdentifier: 0 },
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
  operationName: "GetSession",
})) as any;

export type InvokeAgentError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ModelNotReadyException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Amazon Bedrock Agents (now Amazon Bedrock Agents Classic) is no longer open to new customers. For capabilities similar to Bedrock Agents Classic, explore Amazon Bedrock AgentCore. Existing customers can continue to use the service as normal. For more information, see Amazon Bedrock Agents Classic availability change.
 *
 * Sends a prompt for the agent to process and respond to. Note the following fields for the request:
 *
 * - To continue the same conversation with an agent, use the same `sessionId` value in the request.
 *
 * - To activate trace enablement, turn `enableTrace` to `true`. Trace enablement helps you follow the agent's reasoning process that led it to the information it processed, the actions it took, and the final result it yielded. For more information, see Trace enablement.
 *
 * - End a conversation by setting `endSession` to `true`.
 *
 * - In the `sessionState` object, you can include attributes for the session or prompt or, if you configured an action group to return control, results from invocation of the action group.
 *
 * The response contains both **chunk** and **trace** attributes.
 *
 * The final response is returned in the `bytes` field of the `chunk` object. The `InvokeAgent` returns one chunk for the entire interaction.
 *
 * - The `attribution` object contains citations for parts of the response.
 *
 * - If you set `enableTrace` to `true` in the request, you can trace the agent's steps and reasoning process that led it to the response.
 *
 * - If the action predicted was configured to return control, the response returns parameters for the action, elicited from the user, in the `returnControl` field.
 *
 * - Errors are also surfaced in the response.
 */
export const invokeAgent: API.OperationMethod<
  InvokeAgentRequest,
  InvokeAgentResponse,
  InvokeAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /agents/{agentId}/agentAliases/{agentAliasId}/sessions/{sessionId}/text",
    input: {
      sessionState: {
        sessionAttributes: 0,
        promptSessionAttributes: 0,
        returnControlInvocationResults: D.list(i_InvocationResultMember),
        invocationId: 0,
        files: D.list(i_InputFile),
        knowledgeBaseConfigurations: D.list({
          knowledgeBaseId: 0,
          retrievalConfiguration: i_KnowledgeBaseRetrievalConfiguration,
        }),
        conversationHistory: i_ConversationHistory,
      },
      agentId: 0,
      agentAliasId: 0,
      sessionId: 0,
      endSession: 0,
      enableTrace: 0,
      inputText: 0,
      memoryId: 0,
      bedrockModelConfigurations: {
        performanceConfig: i_PerformanceConfiguration,
      },
      streamingConfigurations: i_StreamingConfigurations,
      promptCreationConfigurations: i_PromptCreationConfigurations,
      sourceArn: D.m({ header: "x-amz-source-arn" }),
    },
    output: {
      completion: D.m({
        payload: true,
        shape: D.events({
          chunk: { bytes: D.secretBlob },
          trace: o_TracePart,
          returnControl: o_ReturnControlPayload,
          internalServerException: 0,
          validationException: 0,
          resourceNotFoundException: 0,
          serviceQuotaExceededException: 0,
          throttlingException: 0,
          accessDeniedException: 0,
          conflictException: 0,
          dependencyFailedException: 0,
          badGatewayException: 0,
          modelNotReadyException: 0,
          files: { files: D.list(o_OutputFile) },
        }),
      }),
      contentType: D.m({ header: "x-amzn-bedrock-agent-content-type" }),
      sessionId: D.m({ header: "x-amz-bedrock-agent-session-id" }),
      memoryId: D.m({ header: "x-amz-bedrock-agent-memory-id" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ModelNotReadyException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeAgent",
})) as any;

export type InvokeFlowError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Invokes an alias of a flow to run the inputs that you specify and return the output of each node as a stream. If there's an error, the error is returned. For more information, see Test a flow in Amazon Bedrock in the Amazon Bedrock User Guide.
 *
 * The CLI doesn't support streaming operations in Amazon Bedrock, including `InvokeFlow`.
 */
export const invokeFlow: API.OperationMethod<
  InvokeFlowRequest,
  InvokeFlowResponse,
  InvokeFlowError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /flows/{flowIdentifier}/aliases/{flowAliasIdentifier}",
    input: {
      flowIdentifier: 0,
      flowAliasIdentifier: 0,
      inputs: D.list(i_FlowInput),
      enableTrace: 0,
      modelPerformanceConfiguration: i_ModelPerformanceConfiguration,
      executionId: 0,
    },
    output: {
      responseStream: D.m({
        payload: true,
        shape: D.events({
          flowOutputEvent: 0,
          flowCompletionEvent: 0,
          flowTraceEvent: {
            trace: {
              nodeInputTrace: {
                timestamp: D.ts,
                fields: D.list({ source: { expression: D.secret } }),
              },
              nodeOutputTrace: { timestamp: D.ts },
              conditionNodeResultTrace: { timestamp: D.ts },
              nodeActionTrace: { timestamp: D.ts },
              nodeDependencyTrace: {
                timestamp: D.ts,
                traceElements: { agentTraces: D.list(o_TracePart) },
              },
            },
          },
          internalServerException: 0,
          validationException: 0,
          resourceNotFoundException: 0,
          serviceQuotaExceededException: 0,
          throttlingException: 0,
          accessDeniedException: 0,
          conflictException: 0,
          dependencyFailedException: 0,
          badGatewayException: 0,
          flowMultiTurnInputRequestEvent: 0,
        }),
      }),
      executionId: D.m({ header: "x-amz-bedrock-flow-execution-id" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeFlow",
})) as any;

export type InvokeInlineAgentError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Invokes an inline Amazon Bedrock agent using the configurations you provide with the request.
 *
 * - Specify the following fields for security purposes.
 *
 * - (Optional) `customerEncryptionKeyArn` – The Amazon Resource Name (ARN) of a KMS key to encrypt the creation of the agent.
 *
 * - (Optional) `idleSessionTTLinSeconds` – Specify the number of seconds for which the agent should maintain session information. After this time expires, the subsequent `InvokeInlineAgent` request begins a new session.
 *
 * - To override the default prompt behavior for agent orchestration and to use advanced prompts, include a `promptOverrideConfiguration` object. For more information, see Advanced prompts.
 *
 * - The agent instructions will not be honored if your agent has only one knowledge base, uses default prompts, has no action group, and user input is disabled.
 */
export const invokeInlineAgent: API.OperationMethod<
  InvokeInlineAgentRequest,
  InvokeInlineAgentResponse,
  InvokeInlineAgentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /agents/{sessionId}",
    input: {
      customerEncryptionKeyArn: 0,
      foundationModel: 0,
      instruction: 0,
      idleSessionTTLInSeconds: 0,
      actionGroups: D.list(i_AgentActionGroup),
      knowledgeBases: D.list(i_KnowledgeBase),
      guardrailConfiguration: i_GuardrailConfigurationWithArn,
      promptOverrideConfiguration: i_PromptOverrideConfiguration,
      agentCollaboration: 0,
      collaboratorConfigurations: D.list(i_CollaboratorConfiguration),
      agentName: 0,
      sessionId: 0,
      endSession: 0,
      enableTrace: 0,
      inputText: 0,
      streamingConfigurations: i_StreamingConfigurations,
      promptCreationConfigurations: i_PromptCreationConfigurations,
      inlineSessionState: {
        sessionAttributes: 0,
        promptSessionAttributes: 0,
        returnControlInvocationResults: D.list(i_InvocationResultMember),
        invocationId: 0,
        files: D.list(i_InputFile),
        conversationHistory: i_ConversationHistory,
      },
      collaborators: D.list({
        customerEncryptionKeyArn: 0,
        foundationModel: 0,
        instruction: 0,
        idleSessionTTLInSeconds: 0,
        actionGroups: D.list(i_AgentActionGroup),
        knowledgeBases: D.list(i_KnowledgeBase),
        guardrailConfiguration: i_GuardrailConfigurationWithArn,
        promptOverrideConfiguration: i_PromptOverrideConfiguration,
        agentCollaboration: 0,
        collaboratorConfigurations: D.list(i_CollaboratorConfiguration),
        agentName: 0,
      }),
      bedrockModelConfigurations: {
        performanceConfig: i_PerformanceConfiguration,
      },
      orchestrationType: 0,
      customOrchestration: { executor: { lambda: 0 } },
    },
    output: {
      completion: D.m({
        payload: true,
        shape: D.events({
          chunk: { bytes: D.secretBlob },
          trace: {
            trace: o_Trace,
            eventTime: D.ts,
            collaboratorName: D.secret,
          },
          returnControl: { invocationInputs: D.list(o_InvocationInputMember) },
          internalServerException: 0,
          validationException: 0,
          resourceNotFoundException: 0,
          serviceQuotaExceededException: 0,
          throttlingException: 0,
          accessDeniedException: 0,
          conflictException: 0,
          dependencyFailedException: 0,
          badGatewayException: 0,
          files: { files: D.list(o_OutputFile) },
        }),
      }),
      contentType: D.m({ header: "x-amzn-bedrock-agent-content-type" }),
      sessionId: D.m({ header: "x-amz-bedrock-agent-session-id" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeInlineAgent",
})) as any;

export type ListFlowExecutionEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists events that occurred during a flow execution. Events provide detailed information about the execution progress, including node inputs and outputs, flow inputs and outputs, condition results, and failure events.
 *
 * Flow executions is in preview release for Amazon Bedrock and is subject to change.
 */
export const listFlowExecutionEvents: API.PaginatedOperationMethod<
  ListFlowExecutionEventsRequest,
  ListFlowExecutionEventsResponse,
  ListFlowExecutionEventsError,
  Credentials | HttpClient.HttpClient,
  FlowExecutionEvent
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /flows/{flowIdentifier}/aliases/{flowAliasIdentifier}/executions/{executionIdentifier}/events",
    input: {
      flowIdentifier: 0,
      flowAliasIdentifier: 0,
      executionIdentifier: 0,
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      eventType: D.m({ query: "eventType" }),
    },
    output: {
      flowExecutionEvents: D.list({
        flowInputEvent: { timestamp: D.ts },
        flowOutputEvent: { timestamp: D.ts },
        nodeInputEvent: {
          timestamp: D.ts,
          fields: D.list({ source: { expression: D.secret } }),
        },
        nodeOutputEvent: { timestamp: D.ts },
        conditionResultEvent: { timestamp: D.ts },
        nodeFailureEvent: { timestamp: D.ts },
        flowFailureEvent: { timestamp: D.ts },
        nodeActionEvent: { timestamp: D.ts },
        nodeDependencyEvent: {
          timestamp: D.ts,
          traceElements: { agentTraces: D.list(o_TracePart) },
        },
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
  operationName: "ListFlowExecutionEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "flowExecutionEvents",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFlowExecutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all executions of a flow. Results can be paginated and include summary information about each execution, such as status, start and end times, and the execution's Amazon Resource Name (ARN).
 *
 * Flow executions is in preview release for Amazon Bedrock and is subject to change.
 */
export const listFlowExecutions: API.PaginatedOperationMethod<
  ListFlowExecutionsRequest,
  ListFlowExecutionsResponse,
  ListFlowExecutionsError,
  Credentials | HttpClient.HttpClient,
  FlowExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /flows/{flowIdentifier}/executions",
    input: {
      flowIdentifier: 0,
      flowAliasIdentifier: D.m({ query: "flowAliasIdentifier" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      flowExecutionSummaries: D.list({ createdAt: D.ts, endedAt: D.ts }),
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
  operationName: "ListFlowExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "flowExecutionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInvocationsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all invocations associated with a specific session. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const listInvocations: API.PaginatedOperationMethod<
  ListInvocationsRequest,
  ListInvocationsResponse,
  ListInvocationsError,
  Credentials | HttpClient.HttpClient,
  InvocationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /sessions/{sessionIdentifier}/invocations/",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      sessionIdentifier: 0,
    },
    output: { invocationSummaries: D.list({ createdAt: D.ts }) },
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
  operationName: "ListInvocations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "invocationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListInvocationStepsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all invocation steps associated with a session and optionally, an invocation within the session. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const listInvocationSteps: API.PaginatedOperationMethod<
  ListInvocationStepsRequest,
  ListInvocationStepsResponse,
  ListInvocationStepsError,
  Credentials | HttpClient.HttpClient,
  InvocationStepSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /sessions/{sessionIdentifier}/invocationSteps/",
    input: {
      invocationIdentifier: 0,
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      sessionIdentifier: 0,
    },
    output: { invocationStepSummaries: D.list({ invocationStepTime: D.ts }) },
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
  operationName: "ListInvocationSteps",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "invocationStepSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all sessions in your Amazon Web Services account. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsRequest,
  ListSessionsResponse,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /sessions/",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: {
      sessionSummaries: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }),
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
  operationName: "ListSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessionSummaries",
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

export type OptimizePromptError =
  | AccessDeniedException
  | BadGatewayException
  | DependencyFailedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Optimizes a prompt for the task that you specify. For more information, see Optimize a prompt in the Amazon Bedrock User Guide.
 */
export const optimizePrompt: API.OperationMethod<
  OptimizePromptRequest,
  OptimizePromptResponse,
  OptimizePromptError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /optimize-prompt",
    input: { input: { textPrompt: { text: 0 } }, targetModelId: 0 },
    output: {
      optimizedPrompt: D.m({
        payload: true,
        shape: D.events({
          optimizedPromptEvent: 0,
          analyzePromptEvent: 0,
          internalServerException: 0,
          throttlingException: 0,
          validationException: 0,
          dependencyFailedException: 0,
          accessDeniedException: 0,
          badGatewayException: 0,
        }),
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    DependencyFailedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "OptimizePrompt",
})) as any;

export type PutInvocationStepError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Add an invocation step to an invocation in a session. An invocation step stores fine-grained state checkpoints, including text and images, for each interaction. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 *
 * Related APIs:
 *
 * - GetInvocationStep
 *
 * - ListInvocationSteps
 *
 * - ListInvocations
 *
 * - ListSessions
 */
export const putInvocationStep: API.OperationMethod<
  PutInvocationStepRequest,
  PutInvocationStepResponse,
  PutInvocationStepError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sessions/{sessionIdentifier}/invocationSteps/",
    input: {
      sessionIdentifier: 0,
      invocationIdentifier: 0,
      invocationStepTime: D.tsAs("date-time"),
      payload: {
        contentBlocks: D.list({
          text: 0,
          image: { format: 0, source: { bytes: 0, s3Location: { uri: 0 } } },
        }),
      },
      invocationStepId: 0,
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
  operationName: "PutInvocationStep",
})) as any;

export type RerankError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Reranks the relevance of sources based on queries. For more information, see Improve the relevance of query responses with a reranker model.
 */
export const rerank: API.PaginatedOperationMethod<
  RerankRequest,
  RerankResponse,
  RerankError,
  Credentials | HttpClient.HttpClient,
  RerankResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /rerank",
    input: {
      queries: D.list({ type: 0, textQuery: i_RerankTextDocument }),
      sources: D.list({
        type: 0,
        inlineDocumentSource: {
          type: 0,
          textDocument: i_RerankTextDocument,
          jsonDocument: 0,
        },
      }),
      rerankingConfiguration: {
        type: 0,
        bedrockRerankingConfiguration: {
          numberOfResults: 0,
          modelConfiguration: { modelArn: 0, additionalModelRequestFields: 0 },
        },
      },
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Rerank",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "results",
  } as const,
})) as any;

export type RetrieveError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Queries a knowledge base and retrieves information from it.
 */
export const retrieve: API.PaginatedOperationMethod<
  RetrieveRequest,
  RetrieveResponse,
  RetrieveError,
  Credentials | HttpClient.HttpClient,
  KnowledgeBaseRetrievalResult
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /knowledgebases/{knowledgeBaseId}/retrieve",
    input: {
      knowledgeBaseId: 0,
      retrievalQuery: {
        type: 0,
        text: 0,
        image: { format: 0, inlineContent: 0 },
      },
      retrievalConfiguration: i_KnowledgeBaseRetrievalConfiguration,
      guardrailConfiguration: i_GuardrailConfiguration,
      nextToken: 0,
      userContext: i_UserContext,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Retrieve",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "retrievalResults",
  } as const,
})) as any;

export type RetrieveAndGenerateError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Queries a knowledge base and generates responses based on the retrieved results and using the specified foundation model or inference profile. The response only cites sources that are relevant to the query.
 *
 * This API cannot be used with managed knowledge bases. Use AgenticRetrieveStream or Retrieve with managed knowledge bases.
 */
export const retrieveAndGenerate: API.OperationMethod<
  RetrieveAndGenerateRequest,
  RetrieveAndGenerateResponse,
  RetrieveAndGenerateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /retrieveAndGenerate",
    input: {
      sessionId: 0,
      input: i_RetrieveAndGenerateInput,
      retrieveAndGenerateConfiguration: i_RetrieveAndGenerateConfiguration,
      sessionConfiguration: i_RetrieveAndGenerateSessionConfiguration,
      userContext: i_UserContext,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetrieveAndGenerate",
})) as any;

export type RetrieveAndGenerateStreamError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Queries a knowledge base and generates responses based on the retrieved results, with output in streaming format.
 *
 * This API cannot be used with managed knowledge bases. Use AgenticRetrieveStream or Retrieve with managed knowledge bases.
 *
 * The CLI doesn't support streaming operations in Amazon Bedrock, including `InvokeModelWithResponseStream`.
 *
 * This operation requires permission for the ` bedrock:RetrieveAndGenerate` action.
 */
export const retrieveAndGenerateStream: API.OperationMethod<
  RetrieveAndGenerateStreamRequest,
  RetrieveAndGenerateStreamResponse,
  RetrieveAndGenerateStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /retrieveAndGenerateStream",
    input: {
      sessionId: 0,
      input: i_RetrieveAndGenerateInput,
      retrieveAndGenerateConfiguration: i_RetrieveAndGenerateConfiguration,
      sessionConfiguration: i_RetrieveAndGenerateSessionConfiguration,
      userContext: i_UserContext,
    },
    output: {
      stream: D.m({
        payload: true,
        shape: D.events({
          output: 0,
          citation: 0,
          guardrail: 0,
          internalServerException: 0,
          validationException: 0,
          resourceNotFoundException: 0,
          serviceQuotaExceededException: 0,
          throttlingException: 0,
          accessDeniedException: 0,
          conflictException: 0,
          dependencyFailedException: 0,
          badGatewayException: 0,
        }),
      }),
      sessionId: D.m({ header: "x-amzn-bedrock-knowledge-base-session-id" }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetrieveAndGenerateStream",
})) as any;

export type StartFlowExecutionError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts an execution of an Amazon Bedrock flow. Unlike flows that run until completion or time out after five minutes, flow executions let you run flows asynchronously for longer durations. Flow executions also yield control so that your application can perform other tasks.
 *
 * This operation returns an Amazon Resource Name (ARN) that you can use to track and manage your flow execution.
 *
 * Flow executions is in preview release for Amazon Bedrock and is subject to change.
 */
export const startFlowExecution: API.OperationMethod<
  StartFlowExecutionRequest,
  StartFlowExecutionResponse,
  StartFlowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /flows/{flowIdentifier}/aliases/{flowAliasIdentifier}/executions",
    input: {
      flowIdentifier: 0,
      flowAliasIdentifier: 0,
      flowExecutionName: 0,
      inputs: D.list(i_FlowInput),
      modelPerformanceConfiguration: i_ModelPerformanceConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartFlowExecution",
})) as any;

export type StopFlowExecutionError =
  | AccessDeniedException
  | BadGatewayException
  | ConflictException
  | DependencyFailedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Stops an Amazon Bedrock flow's execution. This operation prevents further processing of the flow and changes the execution status to `Aborted`.
 */
export const stopFlowExecution: API.OperationMethod<
  StopFlowExecutionRequest,
  StopFlowExecutionResponse,
  StopFlowExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /flows/{flowIdentifier}/aliases/{flowAliasIdentifier}/executions/{executionIdentifier}/stop",
    input: {
      flowIdentifier: 0,
      flowAliasIdentifier: 0,
      executionIdentifier: 0,
    },
  },
  errors: [
    AccessDeniedException,
    BadGatewayException,
    ConflictException,
    DependencyFailedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopFlowExecution",
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

export type UpdateSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the metadata or encryption settings of a session. For more information about sessions, see Store and retrieve conversation history and context with Amazon Bedrock sessions.
 */
export const updateSession: API.OperationMethod<
  UpdateSessionRequest,
  UpdateSessionResponse,
  UpdateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /sessions/{sessionIdentifier}/",
    input: { sessionMetadata: 0, sessionIdentifier: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts },
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
  operationName: "UpdateSession",
})) as any;

const i_AgentActionGroup: D.LazyStruct = () => ({
  actionGroupName: 0,
  description: 0,
  parentActionGroupSignature: 0,
  actionGroupExecutor: { lambda: 0, customControl: 0 },
  apiSchema: { s3: { s3BucketName: 0, s3ObjectKey: 0 }, payload: 0 },
  functionSchema: {
    functions: D.list({
      name: 0,
      description: 0,
      parameters: D.map({ description: 0, type: 0, required: 0 }),
      requireConfirmation: 0,
    }),
  },
  parentActionGroupSignatureParams: 0,
});
const i_CollaboratorConfiguration: D.LazyStruct = () => ({
  collaboratorName: 0,
  collaboratorInstruction: 0,
  agentAliasArn: 0,
  relayConversationHistory: 0,
});
const i_ConversationHistory: D.LazyStruct = () => ({
  messages: D.list({ role: 0, content: D.list({ text: 0 }) }),
});
const i_FlowInput: D.LazyStruct = () => ({
  nodeName: 0,
  nodeOutputName: 0,
  content: { document: 0 },
  nodeInputName: 0,
});
const i_GuardrailConfiguration: D.LazyStruct = () => ({
  guardrailId: 0,
  guardrailVersion: 0,
});
const i_GuardrailConfigurationWithArn: D.LazyStruct = () => ({
  guardrailIdentifier: 0,
  guardrailVersion: 0,
});
const i_InputFile: D.LazyStruct = () => ({
  name: 0,
  source: {
    sourceType: 0,
    s3Location: { uri: 0 },
    byteContent: { mediaType: 0, data: 0 },
  },
  useCase: 0,
});
const i_InvocationResultMember: D.LazyStruct = () => ({
  apiResult: {
    actionGroup: 0,
    httpMethod: 0,
    apiPath: 0,
    confirmationState: 0,
    responseState: 0,
    httpStatusCode: 0,
    responseBody: D.map(i_ContentBody),
    agentId: 0,
  },
  functionResult: {
    actionGroup: 0,
    confirmationState: 0,
    function: 0,
    responseBody: D.map(i_ContentBody),
    responseState: 0,
    agentId: 0,
  },
});
const i_KnowledgeBase: D.LazyStruct = () => ({
  knowledgeBaseId: 0,
  description: 0,
  retrievalConfiguration: i_KnowledgeBaseRetrievalConfiguration,
});
const i_KnowledgeBaseRetrievalConfiguration: D.LazyStruct = () => ({
  vectorSearchConfiguration: {
    numberOfResults: 0,
    overrideSearchType: 0,
    filter: i_RetrievalFilter,
    rerankingConfiguration: {
      type: 0,
      bedrockRerankingConfiguration: {
        modelConfiguration: { modelArn: 0, additionalModelRequestFields: 0 },
        numberOfRerankedResults: 0,
        metadataConfiguration: i_MetadataConfigurationForReranking,
      },
    },
    implicitFilterConfiguration: {
      metadataAttributes: D.list({ key: 0, type: 0, description: 0 }),
      modelArn: 0,
    },
  },
  managedSearchConfiguration: {
    numberOfResults: 0,
    filter: i_RetrievalFilter,
    rerankingModelType: 0,
    rerankingConfiguration: {
      type: 0,
      bedrockRerankingConfiguration: {
        modelConfiguration: { modelArn: 0, additionalModelRequestFields: 0 },
        numberOfRerankedResults: 0,
        metadataConfiguration: i_MetadataConfigurationForReranking,
      },
    },
  },
});
const i_ModelPerformanceConfiguration: D.LazyStruct = () => ({
  performanceConfig: i_PerformanceConfiguration,
});
const i_PerformanceConfiguration: D.LazyStruct = () => ({ latency: 0 });
const i_PromptCreationConfigurations: D.LazyStruct = () => ({
  previousConversationTurnsToInclude: 0,
  excludePreviousThinkingSteps: 0,
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
const i_RerankTextDocument: D.LazyStruct = () => ({ text: 0 });
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
const i_RetrieveAndGenerateConfiguration: D.LazyStruct = () => ({
  type: 0,
  knowledgeBaseConfiguration: {
    knowledgeBaseId: 0,
    modelArn: 0,
    retrievalConfiguration: i_KnowledgeBaseRetrievalConfiguration,
    generationConfiguration: {
      promptTemplate: i_PromptTemplate,
      guardrailConfiguration: i_GuardrailConfiguration,
      inferenceConfig: i_InferenceConfig,
      additionalModelRequestFields: 0,
      performanceConfig: i_PerformanceConfiguration,
    },
    orchestrationConfiguration: {
      promptTemplate: i_PromptTemplate,
      inferenceConfig: i_InferenceConfig,
      additionalModelRequestFields: 0,
      queryTransformationConfiguration: { type: 0 },
      performanceConfig: i_PerformanceConfiguration,
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
      inferenceConfig: i_InferenceConfig,
      additionalModelRequestFields: 0,
      performanceConfig: i_PerformanceConfiguration,
    },
  },
});
const i_RetrieveAndGenerateInput: D.LazyStruct = () => ({ text: 0 });
const i_RetrieveAndGenerateSessionConfiguration: D.LazyStruct = () => ({
  kmsKeyArn: 0,
});
const i_StreamingConfigurations: D.LazyStruct = () => ({
  streamFinalResponse: 0,
  applyGuardrailInterval: 0,
});
const i_UserContext: D.LazyStruct = () => ({ userId: 0 });
const o_InvocationInputMember: D.LazyStruct = () => ({
  apiInvocationInput: { apiPath: D.secret, collaboratorName: D.secret },
  functionInvocationInput: { collaboratorName: D.secret },
});
const o_OutputFile: D.LazyStruct = () => ({ bytes: D.secretBlob });
const o_RetrievalContent: D.LazyStruct = () => ({ byteContent: D.blob });
const o_ReturnControlPayload: D.LazyStruct = () => ({
  invocationInputs: D.list(o_InvocationInputMember),
});
const o_Trace: D.LazyStruct = () => ({
  guardrailTrace: { metadata: o_Metadata },
  preProcessingTrace: {
    modelInvocationInput: o_ModelInvocationInput,
    modelInvocationOutput: {
      parsedResponse: { rationale: D.secret },
      metadata: o_Metadata,
      reasoningContent: o_ReasoningContentBlock,
    },
  },
  orchestrationTrace: {
    rationale: { text: D.secret },
    invocationInput: o_InvocationInput,
    observation: o_Observation,
    modelInvocationInput: o_ModelInvocationInput,
    modelInvocationOutput: {
      metadata: o_Metadata,
      reasoningContent: o_ReasoningContentBlock,
    },
  },
  postProcessingTrace: {
    modelInvocationInput: o_ModelInvocationInput,
    modelInvocationOutput: {
      parsedResponse: { text: D.secret },
      metadata: o_Metadata,
      reasoningContent: o_ReasoningContentBlock,
    },
  },
  routingClassifierTrace: {
    invocationInput: o_InvocationInput,
    observation: o_Observation,
    modelInvocationInput: o_ModelInvocationInput,
    modelInvocationOutput: { metadata: o_Metadata },
  },
  failureTrace: { failureReason: D.secret, metadata: o_Metadata },
});
const o_TracePart: D.LazyStruct = () => ({
  trace: o_Trace,
  eventTime: D.ts,
  collaboratorName: D.secret,
});
const i_ContentBody: D.LazyStruct = () => ({
  body: 0,
  images: D.list({ format: 0, source: { bytes: 0 } }),
});
const i_FilterAttribute: D.LazyStruct = () => ({ key: 0, value: 0 });
const i_InferenceConfig: D.LazyStruct = () => ({
  textInferenceConfig: {
    temperature: 0,
    topP: 0,
    maxTokens: 0,
    stopSequences: 0,
  },
});
const i_MetadataConfigurationForReranking: D.LazyStruct = () => ({
  selectionMode: 0,
  selectiveModeConfiguration: {
    fieldsToInclude: D.list(i_FieldForReranking),
    fieldsToExclude: D.list(i_FieldForReranking),
  },
});
const i_PromptTemplate: D.LazyStruct = () => ({ textPromptTemplate: 0 });
const o_InvocationInput: D.LazyStruct = () => ({
  actionGroupInvocationInput: {
    actionGroupName: D.secret,
    verb: D.secret,
    apiPath: D.secret,
    function: D.secret,
  },
  knowledgeBaseLookupInput: { text: D.secret, knowledgeBaseId: D.secret },
  agentCollaboratorInvocationInput: {
    input: {
      text: D.secret,
      returnControlResults: {
        returnControlInvocationResults: D.list({
          apiResult: { apiPath: D.secret, responseBody: D.map(o_ContentBody) },
          functionResult: { responseBody: D.map(o_ContentBody) },
        }),
      },
    },
  },
});
const o_Metadata: D.LazyStruct = () => ({ startTime: D.ts, endTime: D.ts });
const o_ModelInvocationInput: D.LazyStruct = () => ({ text: D.secret });
const o_Observation: D.LazyStruct = () => ({
  actionGroupInvocationOutput: { text: D.secret, metadata: o_Metadata },
  agentCollaboratorInvocationOutput: {
    output: { text: D.secret, returnControlPayload: o_ReturnControlPayload },
    metadata: o_Metadata,
  },
  knowledgeBaseLookupOutput: { metadata: o_Metadata },
  finalResponse: { text: D.secret, metadata: o_Metadata },
  repromptResponse: { source: D.secret },
  codeInterpreterInvocationOutput: { metadata: o_Metadata },
});
const o_ReasoningContentBlock: D.LazyStruct = () => ({
  redactedContent: D.blob,
});
const i_FieldForReranking: D.LazyStruct = () => ({ fieldName: 0 });
const o_ContentBody: D.LazyStruct = () => ({
  images: D.list({ source: { bytes: D.blob } }),
});
