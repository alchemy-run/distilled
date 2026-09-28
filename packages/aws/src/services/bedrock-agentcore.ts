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
  sdkId: "Bedrock AgentCore",
  target: "AmazonBedrockAgentCore",
  version: "2024-02-28",
  sigv4: "bedrock-agentcore",
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
                `https://bedrock-agentcore-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://bedrock-agentcore-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://bedrock-agentcore.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://bedrock-agentcore.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class DuplicateIdException
  extends /*@__PURE__*/ TE.TaggedError(
    "DuplicateIdException",
    ["ConflictError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class InvalidInputException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidInputException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class RetryableConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "RetryableConflictException",
    ["ConflictError", "RetryableError"],
    { status: 409 },
  )<{ readonly message: string }> {}
export class RuntimeClientError
  extends /*@__PURE__*/ TE.TaggedError("RuntimeClientError", [], {
    status: 424,
  })<{ readonly message?: string }> {}
export class ServiceException
  extends /*@__PURE__*/ TE.TaggedError("ServiceException", ["ServerError"], {
    status: 500,
  })<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class SubscriptionRequiredException
  extends /*@__PURE__*/ TE.TaggedError(
    "SubscriptionRequiredException",
    ["AuthError"],
    { status: 403 },
  )<{
    readonly message: string;
    readonly subscriptionUrl?: string;
    readonly productName?: string;
  }> {}
export class ThrottledException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottledException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message: string;
    readonly reason: ValidationExceptionReason;
    readonly fieldList?: ValidationExceptionField[];
  }> {}
export type MemoryId = string;
export type RequestIdentifier = string;
export type Namespace = string;
export type NamespacesList = string[];
export type SensitiveString = string | redacted.Redacted<string>;
export type MemoryContent = { text: string | redacted.Redacted<string> };
export type MemoryStrategyId = string;
export type MetadataKey = string;
export type StringValue = string;
export type StringListMemberValue = string;
export type StringValueList = string[];
export type MemoryRecordMetadataValue =
  | {
      stringValue: string;
      stringListValue?: never;
      numberValue?: never;
      dateTimeValue?: never;
    }
  | {
      stringValue?: never;
      stringListValue: string[];
      numberValue?: never;
      dateTimeValue?: never;
    }
  | {
      stringValue?: never;
      stringListValue?: never;
      numberValue: number;
      dateTimeValue?: never;
    }
  | {
      stringValue?: never;
      stringListValue?: never;
      numberValue?: never;
      dateTimeValue: Date;
    };
export type MemoryRecordMetadataMap = {
  [key: string]: MemoryRecordMetadataValue | undefined;
};
export interface MemoryRecordCreateInput {
  requestIdentifier: string;
  namespaces: string[];
  content: MemoryContent;
  timestamp: Date;
  memoryStrategyId?: string;
  metadata?: { [key: string]: MemoryRecordMetadataValue | undefined };
}
export type MemoryRecordsCreateInputList = MemoryRecordCreateInput[];
export interface BatchCreateMemoryRecordsInput {
  memoryId: string;
  records: MemoryRecordCreateInput[];
  clientToken?: string;
}
export type MemoryRecordId = string;
export type MemoryRecordStatus = "SUCCEEDED" | "FAILED" | (string & {});
export interface MemoryRecordOutput {
  memoryRecordId: string;
  status: MemoryRecordStatus;
  requestIdentifier?: string;
  errorCode?: number;
  errorMessage?: string;
}
export type MemoryRecordsOutputList = MemoryRecordOutput[];
export interface BatchCreateMemoryRecordsOutput {
  successfulRecords: MemoryRecordOutput[];
  failedRecords: MemoryRecordOutput[];
}
export interface MemoryRecordDeleteInput {
  memoryRecordId: string;
  namespace?: string;
}
export type MemoryRecordsDeleteInputList = MemoryRecordDeleteInput[];
export interface BatchDeleteMemoryRecordsInput {
  memoryId: string;
  records: MemoryRecordDeleteInput[];
}
export interface BatchDeleteMemoryRecordsOutput {
  successfulRecords: MemoryRecordOutput[];
  failedRecords: MemoryRecordOutput[];
}
export interface MemoryRecordUpdateInput {
  memoryRecordId: string;
  timestamp: Date;
  content?: MemoryContent;
  namespaces?: string[];
  sourceNamespaces?: string[];
  memoryStrategyId?: string;
  metadata?: { [key: string]: MemoryRecordMetadataValue | undefined };
}
export type MemoryRecordsUpdateInputList = MemoryRecordUpdateInput[];
export interface BatchUpdateMemoryRecordsInput {
  memoryId: string;
  records: MemoryRecordUpdateInput[];
}
export interface BatchUpdateMemoryRecordsOutput {
  successfulRecords: MemoryRecordOutput[];
  failedRecords: MemoryRecordOutput[];
}
export type UserTokenType = string | redacted.Redacted<string>;
export type UserIdType = string;
export type UserIdentifier =
  | { userToken: string | redacted.Redacted<string>; userId?: never }
  | { userToken?: never; userId: string };
export type RequestUri = string;
export interface CompleteResourceTokenAuthRequest {
  userIdentifier: UserIdentifier;
  sessionUri: string;
}
export interface CompleteResourceTokenAuthResponse {}
export type ABTestName = string;
export type ABTestDescription = string;
export type GatewayArn = string;
export type VariantName = string;
export type ConfigurationBundleArn = string;
export type ConfigurationBundleVersion = string;
export interface ConfigurationBundleRef {
  bundleArn: string;
  bundleVersion: string;
}
export type TargetName = string;
export interface TargetRef {
  name: string;
}
export interface VariantConfiguration {
  configurationBundle?: ConfigurationBundleRef;
  target?: TargetRef;
}
export interface Variant {
  name: string;
  weight: number;
  variantConfiguration: VariantConfiguration;
}
export type VariantList = Variant[];
export type PathPattern = string;
export type TargetPathList = string[];
export interface GatewayFilter {
  targetPaths?: string[];
}
export type OnlineEvaluationConfigArn = string;
export interface PerVariantOnlineEvaluationConfig {
  name: string;
  onlineEvaluationConfigArn: string;
}
export type PerVariantOnlineEvaluationConfigList =
  PerVariantOnlineEvaluationConfig[];
export type ABTestEvaluationConfig =
  | {
      onlineEvaluationConfigArn: string;
      perVariantOnlineEvaluationConfig?: never;
    }
  | {
      onlineEvaluationConfigArn?: never;
      perVariantOnlineEvaluationConfig: PerVariantOnlineEvaluationConfig[];
    };
export type RoleArn = string;
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export interface CreateABTestRequest {
  name: string;
  description?: string;
  gatewayArn: string;
  variants: Variant[];
  gatewayFilter?: GatewayFilter;
  evaluationConfig: ABTestEvaluationConfig;
  roleArn: string;
  enableOnCreate?: boolean;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type ABTestId = string;
export type ABTestArn = string;
export type ABTestStatus =
  | "CREATING"
  | "ACTIVE"
  | "CREATE_FAILED"
  | "UPDATING"
  | "UPDATE_FAILED"
  | "DELETING"
  | "DELETE_FAILED"
  | "FAILED"
  | (string & {});
export type ABTestExecutionStatus =
  | "PAUSED"
  | "RUNNING"
  | "STOPPED"
  | "NOT_STARTED"
  | (string & {});
export interface CreateABTestResponse {
  abTestId: string;
  abTestArn: string;
  name?: string;
  status: ABTestStatus;
  executionStatus: ABTestExecutionStatus;
  createdAt: Date;
}
export type ActorId = string;
export type SessionId = string;
export type Content = { text: string | redacted.Redacted<string> };
export type Role = "ASSISTANT" | "USER" | "TOOL" | "OTHER" | (string & {});
export interface Conversational {
  content: Content;
  role: Role;
}
export type MemoryDocument = unknown;
export type MemoryJsonDataContent = unknown;
export interface MemoryJsonData {
  content: any;
}
export type PayloadType =
  | { conversational: Conversational; blob?: never; json?: never }
  | { conversational?: never; blob: any; json?: never }
  | { conversational?: never; blob?: never; json: MemoryJsonData };
export type PayloadTypeList = PayloadType[];
export type EventId = string;
export type BranchName = string;
export interface Branch {
  rootEventId?: string;
  name: string;
}
export type MetadataValue = { stringValue: string };
export type MetadataMap = { [key: string]: MetadataValue | undefined };
export type ExtractionMode = "SKIP" | (string & {});
export type NamespaceVariableName = string;
export type NamespaceVariableValue = string;
export type NamespaceVariablesMap = { [key: string]: string | undefined };
export interface ExtractionConfig {
  namespaceVariables?: { [key: string]: string | undefined };
}
export interface CreateEventInput {
  memoryId: string;
  actorId: string;
  sessionId?: string;
  eventTimestamp: Date;
  payload: PayloadType[];
  branch?: Branch;
  clientToken?: string;
  metadata?: { [key: string]: MetadataValue | undefined };
  extractionMode?: ExtractionMode;
  extractionConfig?: ExtractionConfig;
}
export interface Event {
  memoryId: string;
  actorId: string;
  sessionId: string;
  eventId: string;
  eventTimestamp: Date;
  payload?: PayloadType[];
  branch?: Branch;
  metadata?: { [key: string]: MetadataValue | undefined };
}
export interface CreateEventOutput {
  event: Event;
}
export type UserId = string;
export type PaymentAgentName = string;
export type PaymentManagerArn = string;
export type PaymentConnectorId = string;
export type PaymentInstrumentType = "EMBEDDED_CRYPTO_WALLET" | (string & {});
export type CryptoWalletNetwork = "ETHEREUM" | "SOLANA" | (string & {});
export type Email = string | redacted.Redacted<string>;
export interface LinkedAccountEmail {
  emailAddress: string | redacted.Redacted<string>;
}
export type PhoneNumber = string | redacted.Redacted<string>;
export interface LinkedAccountSms {
  phoneNumber: string | redacted.Redacted<string>;
}
export type JwtKeyId = string;
export interface LinkedAccountDeveloperJwt {
  kid: string;
  sub: string;
}
export interface OAuth2Authentication {
  sub: string;
  emailAddress?: string | redacted.Redacted<string>;
  name?: string;
  username?: string;
}
export type LinkedAccountOAuth2 =
  | {
      google: OAuth2Authentication;
      apple?: never;
      x?: never;
      telegram?: never;
      github?: never;
    }
  | {
      google?: never;
      apple: OAuth2Authentication;
      x?: never;
      telegram?: never;
      github?: never;
    }
  | {
      google?: never;
      apple?: never;
      x: OAuth2Authentication;
      telegram?: never;
      github?: never;
    }
  | {
      google?: never;
      apple?: never;
      x?: never;
      telegram: OAuth2Authentication;
      github?: never;
    }
  | {
      google?: never;
      apple?: never;
      x?: never;
      telegram?: never;
      github: OAuth2Authentication;
    };
export type LinkedAccount =
  | {
      email: LinkedAccountEmail;
      sms?: never;
      developerJwt?: never;
      oAuth2?: never;
    }
  | {
      email?: never;
      sms: LinkedAccountSms;
      developerJwt?: never;
      oAuth2?: never;
    }
  | {
      email?: never;
      sms?: never;
      developerJwt: LinkedAccountDeveloperJwt;
      oAuth2?: never;
    }
  | {
      email?: never;
      sms?: never;
      developerJwt?: never;
      oAuth2: LinkedAccountOAuth2;
    };
export type LinkedAccountList = LinkedAccount[];
export interface EmbeddedCryptoWallet {
  network: CryptoWalletNetwork;
  linkedAccounts: LinkedAccount[];
  walletAddress?: string;
  redirectUrl?: string;
}
export type PaymentInstrumentDetails = {
  embeddedCryptoWallet: EmbeddedCryptoWallet;
};
export interface CreatePaymentInstrumentRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  paymentConnectorId: string;
  paymentInstrumentType: PaymentInstrumentType;
  paymentInstrumentDetails: PaymentInstrumentDetails;
  clientToken?: string;
}
export type PaymentInstrumentId = string;
export type PaymentInstrumentStatus =
  | "INITIATED"
  | "ACTIVE"
  | "FAILED"
  | "DELETED"
  | "BLOCKED"
  | (string & {});
export interface PaymentInstrument {
  paymentInstrumentId: string;
  paymentManagerArn: string;
  paymentConnectorId: string;
  userId: string;
  paymentInstrumentType: PaymentInstrumentType;
  paymentInstrumentDetails: PaymentInstrumentDetails;
  createdAt: Date;
  status: PaymentInstrumentStatus;
  updatedAt: Date;
}
export interface CreatePaymentInstrumentResponse {
  paymentInstrument: PaymentInstrument;
}
export type Currency = "USD" | (string & {});
export interface Amount {
  value: string;
  currency: Currency;
}
export interface SessionLimits {
  maxSpendAmount: Amount;
}
export interface CreatePaymentSessionRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  limits?: SessionLimits;
  expiryTimeInMinutes: number;
  clientToken?: string;
}
export type PaymentSessionId = string;
export interface AvailableLimits {
  availableSpendAmount?: Amount;
  updatedAt?: Date;
}
export interface PaymentSession {
  paymentSessionId: string;
  paymentManagerArn: string;
  limits?: SessionLimits;
  userId: string;
  expiryTimeInMinutes: number;
  createdAt: Date;
  availableLimits?: AvailableLimits;
  updatedAt: Date;
}
export interface CreatePaymentSessionResponse {
  paymentSession: PaymentSession;
}
export interface DeleteABTestRequest {
  abTestId: string;
}
export interface DeleteABTestResponse {
  abTestId: string;
  abTestArn: string;
  status: ABTestStatus;
}
export type BatchEvaluationId = string;
export interface DeleteBatchEvaluationRequest {
  batchEvaluationId: string;
}
export type BatchEvaluationArn = string;
export type BatchEvaluationStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "COMPLETED_WITH_ERRORS"
  | "FAILED"
  | "STOPPING"
  | "STOPPED"
  | "DELETING"
  | (string & {});
export interface DeleteBatchEvaluationResponse {
  batchEvaluationId: string;
  batchEvaluationArn: string;
  status: BatchEvaluationStatus;
}
export type CapacityProviderId = string;
export interface DeleteCapacityProviderSessionRequest {
  capacityProviderId: string;
  sessionId: string;
}
export type CapacityProviderArn = string;
export type CapacityProviderSessionStatus =
  | "Provisioning"
  | "Deprovisioning"
  | "Active"
  | "Deleting"
  | "Deleted"
  | "Stopped"
  | (string & {});
export interface DeleteCapacityProviderSessionResponse {
  capacityProviderArn: string;
  sessionId: string;
  status: CapacityProviderSessionStatus;
}
export interface DeleteEventInput {
  memoryId: string;
  sessionId: string;
  eventId: string;
  actorId: string;
}
export interface DeleteEventOutput {
  eventId: string;
}
export interface DeleteMemoryRecordInput {
  memoryId: string;
  memoryRecordId: string;
  namespace?: string;
}
export interface DeleteMemoryRecordOutput {
  memoryRecordId: string;
}
export interface DeletePaymentInstrumentRequest {
  userId?: string;
  paymentManagerArn: string;
  paymentConnectorId: string;
  paymentInstrumentId: string;
}
export interface DeletePaymentInstrumentResponse {
  status: PaymentInstrumentStatus;
}
export interface DeletePaymentSessionRequest {
  userId?: string;
  paymentManagerArn: string;
  paymentSessionId: string;
}
export type PaymentSessionStatus =
  | "ACTIVE"
  | "EXPIRED"
  | "DELETED"
  | (string & {});
export interface DeletePaymentSessionResponse {
  status: PaymentSessionStatus;
}
export type RecommendationId = string;
export interface DeleteRecommendationRequest {
  recommendationId: string;
}
export type RecommendationStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED"
  | "DELETING"
  | (string & {});
export interface DeleteRecommendationResponse {
  recommendationId: string;
  status: RecommendationStatus;
}
export type EvaluatorId = string;
export type Span = unknown;
export type Spans = any[];
export type EvaluationInput = { sessionSpans: any[] };
export type SpanId = string;
export type SpanIds = string[];
export type TraceId = string;
export type TraceIds = string[];
export type EvaluationTarget =
  | { spanIds: string[]; traceIds?: never }
  | { spanIds?: never; traceIds: string[] };
export interface SpanContext {
  sessionId: string;
  traceId?: string;
  spanId?: string;
}
export type Context = { spanContext: SpanContext };
export type EvaluationContent = { text: string };
export type EvaluationContentList = EvaluationContent[];
export type EvaluationToolName = string;
export type EvaluationToolNames = string[];
export interface EvaluationExpectedTrajectory {
  toolNames?: string[];
}
export interface EvaluationReferenceInput {
  context: Context;
  expectedResponse?: EvaluationContent;
  assertions?: EvaluationContent[];
  expectedTrajectory?: EvaluationExpectedTrajectory;
}
export type EvaluationReferenceInputs = EvaluationReferenceInput[];
export interface EvaluateRequest {
  evaluatorId: string;
  evaluationInput: EvaluationInput;
  evaluationTarget?: EvaluationTarget;
  evaluationReferenceInputs?: EvaluationReferenceInput[];
}
export type EvaluatorArn = string;
export type EvaluatorName = string;
export type EvaluationExplanation = string | redacted.Redacted<string>;
export interface TokenUsage {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
}
export type EvaluationErrorMessage = string;
export type EvaluationErrorCode = string;
export type IgnoredReferenceInputField = string;
export type IgnoredReferenceInputFields = string[];
export interface EvaluationResultContent {
  evaluatorArn: string;
  evaluatorId: string;
  evaluatorName: string;
  explanation?: string | redacted.Redacted<string>;
  context: Context;
  value?: number;
  label?: string;
  tokenUsage?: TokenUsage;
  errorMessage?: string;
  errorCode?: string;
  ignoredReferenceInputFields?: string[];
}
export type EvaluationResults = EvaluationResultContent[];
export interface EvaluateResponse {
  evaluationResults: EvaluationResultContent[];
}
export interface GetABTestRequest {
  abTestId: string;
}
export type ErrorDetailsList = string[];
export interface ControlStats {
  variantName: string;
  sampleSize: number;
  mean: number;
}
export interface ConfidenceInterval {
  lower?: number;
  upper?: number;
}
export interface VariantResult {
  variantName: string;
  sampleSize: number;
  mean: number;
  absoluteChange?: number;
  percentChange?: number;
  pValue?: number;
  confidenceInterval?: ConfidenceInterval;
  isSignificant: boolean;
}
export type VariantResultList = VariantResult[];
export interface EvaluatorMetric {
  evaluatorArn: string;
  controlStats: ControlStats;
  variantResults: VariantResult[];
}
export type EvaluatorMetricList = EvaluatorMetric[];
export interface ABTestResults {
  analysisTimestamp?: Date;
  evaluatorMetrics: EvaluatorMetric[];
}
export interface GetABTestResponse {
  abTestId: string;
  abTestArn: string;
  name: string;
  description?: string;
  status: ABTestStatus;
  executionStatus: ABTestExecutionStatus;
  gatewayArn: string;
  variants: Variant[];
  gatewayFilter?: GatewayFilter;
  evaluationConfig: ABTestEvaluationConfig;
  roleArn?: string;
  currentRunId?: string;
  errorDetails?: string[];
  startedAt?: Date;
  stoppedAt?: Date;
  maxDurationExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  results?: ABTestResults;
}
export type SessionType = string;
export interface GetAgentCardRequest {
  runtimeSessionId?: string;
  agentRuntimeArn: string;
  qualifier?: string;
}
export type AgentCard = unknown;
export type HttpResponseCode = number;
export interface GetAgentCardResponse {
  runtimeSessionId?: string;
  agentCard: any;
  statusCode?: number;
}
export interface GetBatchEvaluationRequest {
  batchEvaluationId: string;
}
export type BatchEvaluationName = string;
export interface Evaluator {
  evaluatorId: string;
}
export type EvaluatorList = Evaluator[];
export type InsightId = string;
export interface Insight {
  insightId: string;
}
export type InsightList = Insight[];
export type EvaluationStringList = string[];
export interface SessionFilterConfig {
  startTime?: Date;
  endTime?: Date;
}
export interface CloudWatchFilterConfig {
  sessionIds?: string[];
  timeRange?: SessionFilterConfig;
}
export interface CloudWatchLogsSource {
  serviceNames: string[];
  logGroupNames: string[];
  filterConfig?: CloudWatchFilterConfig;
}
export interface OnlineEvaluationConfigSource {
  onlineEvaluationConfigArn: string;
  timeRange?: SessionFilterConfig;
}
export type DataSourceConfig =
  | {
      cloudWatchLogs: CloudWatchLogsSource;
      onlineEvaluationConfigSource?: never;
    }
  | {
      cloudWatchLogs?: never;
      onlineEvaluationConfigSource: OnlineEvaluationConfigSource;
    };
export interface CloudWatchOutputConfig {
  logGroupName: string;
  logStreamName: string;
}
export type OutputConfig = { cloudWatchConfig: CloudWatchOutputConfig };
export interface EvaluatorStatistics {
  averageScore?: number;
}
export interface EvaluatorSummary {
  evaluatorId?: string;
  statistics?: EvaluatorStatistics;
  totalEvaluated?: number;
  totalFailed?: number;
}
export type EvaluatorSummaryList = EvaluatorSummary[];
export interface EvaluationJobResults {
  numberOfSessionsCompleted?: number;
  numberOfSessionsInProgress?: number;
  numberOfSessionsFailed?: number;
  totalNumberOfSessions?: number;
  numberOfSessionsIgnored?: number;
  evaluatorSummaries?: EvaluatorSummary[];
}
export type InsightsFailureCategory =
  | "execution-error-category-authentication"
  | "execution-error-category-resource-not-found"
  | "execution-error-category-service-errors"
  | "execution-error-category-rate-limiting"
  | "execution-error-category-formatting"
  | "execution-error-category-timeout"
  | "execution-error-category-resource-exhaustion"
  | "execution-error-category-environment"
  | "execution-error-category-tool-schema"
  | "task-instruction-category-non-compliance"
  | "task-instruction-category-problem-id"
  | "incorrect-actions-category-tool-selection"
  | "incorrect-actions-category-poor-information-retrieval"
  | "incorrect-actions-category-clarification"
  | "incorrect-actions-category-inappropriate-info-request"
  | "context-handling-error-category-context-handling-failures"
  | "hallucination-category-hall-capabilities"
  | "hallucination-category-hall-misunderstand"
  | "hallucination-category-hall-usage"
  | "hallucination-category-hall-history"
  | "hallucination-category-hall-params"
  | "hallucination-category-fabricate-tool-outputs"
  | "repetitive-behavior-category-repetition-tool"
  | "repetitive-behavior-category-repetition-info"
  | "repetitive-behavior-category-step-repetition"
  | "orchestration-related-errors-category-reasoning-mismatch"
  | "orchestration-related-errors-category-goal-deviation"
  | "orchestration-related-errors-category-premature-termination"
  | "orchestration-related-errors-category-unaware-termination"
  | "llm-output-category-nonsensical"
  | "configuration-mismatch-category-tool-definition"
  | "coding-use-case-specific-failure-types-category-edge-case-oversights"
  | "coding-use-case-specific-failure-types-category-dependency-issues"
  | "other"
  | (string & {});
export interface InsightsFailureSignal {
  category: InsightsFailureCategory;
  evidence: string;
  confidence: number;
}
export type InsightsFailureSignalList = InsightsFailureSignal[];
export interface FailureSpanDetail {
  spanId: string;
  traceId: string;
  signals: InsightsFailureSignal[];
}
export type FailureSpanDetailList = FailureSpanDetail[];
export interface AffectedSession {
  sessionId: string;
  explanation: string;
  fixType: string;
  recommendation: string;
  failureSpans: FailureSpanDetail[];
}
export type AffectedSessionList = AffectedSession[];
export interface RootCauseCluster {
  clusterId: number;
  name: string;
  rootCause: string;
  recommendation: string;
  affectedSessionCount: number;
  affectedSessions: AffectedSession[];
}
export type RootCauseClusterList = RootCauseCluster[];
export interface FailureSubCategoryCluster {
  clusterId: number;
  name: string;
  description: string;
  affectedSessionCount: number;
  rootCauses: RootCauseCluster[];
}
export type FailureSubCategoryClusterList = FailureSubCategoryCluster[];
export interface FailureCategoryCluster {
  clusterId: number;
  name: string;
  description: string;
  affectedSessionCount: number;
  subCategories: FailureSubCategoryCluster[];
}
export type FailureCategoryClusterList = FailureCategoryCluster[];
export interface FailureAnalysisResultContent {
  failures: FailureCategoryCluster[];
}
export type UserIntentList = string[];
export interface UserIntentAffectedSession {
  sessionId: string;
  userMessages: string[];
}
export type UserIntentAffectedSessionList = UserIntentAffectedSession[];
export interface UserIntentCluster {
  clusterId: number;
  name: string;
  description: string;
  affectedSessionCount: number;
  affectedSessions: UserIntentAffectedSession[];
}
export type UserIntentClusterList = UserIntentCluster[];
export interface UserIntentClusteringResultContent {
  userIntents: UserIntentCluster[];
}
export interface ExecutionSummaryAffectedSession {
  sessionId: string;
  approachTaken: string;
  finalOutcome: string;
}
export type ExecutionSummaryAffectedSessionList =
  ExecutionSummaryAffectedSession[];
export interface ExecutionSummaryCluster {
  clusterId: number;
  name: string;
  description: string;
  affectedSessionCount: number;
  affectedSessions: ExecutionSummaryAffectedSession[];
}
export type ExecutionSummaryClusterList = ExecutionSummaryCluster[];
export interface ExecutionSummaryClusteringResultContent {
  executionSummaries: ExecutionSummaryCluster[];
}
export type BatchEvaluationDescription = string;
export type KmsKeyArn = string;
export interface GetBatchEvaluationResponse {
  batchEvaluationId: string;
  batchEvaluationArn: string;
  batchEvaluationName: string;
  status: BatchEvaluationStatus;
  createdAt: Date;
  evaluators?: Evaluator[];
  insights?: Insight[];
  dataSourceConfig?: DataSourceConfig;
  outputConfig?: OutputConfig;
  evaluationResults?: EvaluationJobResults;
  failureAnalysisResult?: FailureAnalysisResultContent;
  userIntentResult?: UserIntentClusteringResultContent;
  executionSummaryResult?: ExecutionSummaryClusteringResultContent;
  errorDetails?: string[];
  description?: string;
  updatedAt?: Date;
  kmsKeyArn?: string;
}
export type BrowserSessionId = string;
export interface GetBrowserSessionRequest {
  browserIdentifier: string;
  sessionId: string;
}
export type Name = string;
export type ViewPortWidth = number;
export type ViewPortHeight = number;
export interface ViewPort {
  width: number;
  height: number;
}
export interface S3Location {
  bucket: string;
  prefix: string;
  versionId?: string;
}
export type ResourceLocation = { s3: S3Location };
export interface BrowserExtension {
  location: ResourceLocation;
}
export type BrowserExtensions = BrowserExtension[];
export type BrowserEnterprisePolicyType =
  | "MANAGED"
  | "RECOMMENDED"
  | (string & {});
export interface BrowserEnterprisePolicy {
  location: ResourceLocation;
  type?: BrowserEnterprisePolicyType;
}
export type BrowserEnterprisePolicies = BrowserEnterprisePolicy[];
export type BrowserProfileId = string;
export interface BrowserProfileConfiguration {
  profileIdentifier: string;
}
export type BrowserSessionTimeout = number;
export type BrowserSessionStatus = "READY" | "TERMINATED" | (string & {});
export type BrowserStreamEndpoint = string;
export type AutomationStreamStatus = "ENABLED" | "DISABLED" | (string & {});
export interface AutomationStream {
  streamEndpoint: string;
  streamStatus: AutomationStreamStatus;
}
export interface LiveViewStream {
  streamEndpoint?: string;
}
export interface BrowserSessionStream {
  automationStream: AutomationStream;
  liveViewStream?: LiveViewStream;
}
export type HostName = string;
export type DomainPattern = string;
export type DomainPatterns = string[];
export type SecretArn = string;
export interface BasicAuth {
  secretArn: string;
}
export type ProxyCredentials = { basicAuth: BasicAuth };
export interface ExternalProxy {
  server: string;
  port: number;
  domainPatterns?: string[];
  credentials?: ProxyCredentials;
}
export type Proxy = { externalProxy: ExternalProxy };
export type Proxies = Proxy[];
export interface ProxyBypass {
  domainPatterns?: string[];
}
export interface ProxyConfiguration {
  proxies: Proxy[];
  bypass?: ProxyBypass;
}
export interface SecretsManagerLocation {
  secretArn: string;
}
export type CertificateLocation = { secretsManager: SecretsManagerLocation };
export interface Certificate {
  location: CertificateLocation;
}
export type Certificates = Certificate[];
export type S3FilesAccessPointArn = string;
export type MountPath = string;
export type S3FilesFileSystemArn = string;
export interface S3FilesConfiguration {
  accessPointArn: string;
  mountPath: string;
  fileSystemArn: string;
}
export type EfsAccessPointArn = string;
export type EfsFileSystemArn = string;
export interface EfsConfiguration {
  accessPointArn: string;
  mountPath: string;
  fileSystemArn: string;
}
export type ToolsFileSystemConfiguration =
  | { s3FilesConfiguration: S3FilesConfiguration; efsConfiguration?: never }
  | { s3FilesConfiguration?: never; efsConfiguration: EfsConfiguration };
export type ToolsFileSystemConfigurations = ToolsFileSystemConfiguration[];
export interface GetBrowserSessionResponse {
  browserIdentifier: string;
  sessionId: string;
  name?: string;
  createdAt: Date;
  viewPort?: ViewPort;
  extensions?: BrowserExtension[];
  enterprisePolicies?: BrowserEnterprisePolicy[];
  profileConfiguration?: BrowserProfileConfiguration;
  sessionTimeoutSeconds?: number;
  status?: BrowserSessionStatus;
  streams?: BrowserSessionStream;
  proxyConfiguration?: ProxyConfiguration;
  certificates?: Certificate[];
  filesystemConfigurations?: ToolsFileSystemConfiguration[];
  sessionReplayArtifact?: string;
  lastUpdatedAt?: Date;
}
export type CodeInterpreterSessionId = string;
export interface GetCodeInterpreterSessionRequest {
  codeInterpreterIdentifier: string;
  sessionId: string;
}
export type CodeInterpreterSessionTimeout = number;
export type CodeInterpreterSessionStatus =
  | "READY"
  | "TERMINATED"
  | (string & {});
export interface GetCodeInterpreterSessionResponse {
  codeInterpreterIdentifier: string;
  sessionId: string;
  name?: string;
  createdAt: Date;
  sessionTimeoutSeconds?: number;
  status?: CodeInterpreterSessionStatus;
  certificates?: Certificate[];
  filesystemConfigurations?: ToolsFileSystemConfiguration[];
}
export interface GetEventInput {
  memoryId: string;
  sessionId: string;
  actorId: string;
  eventId: string;
}
export interface GetEventOutput {
  event: Event;
}
export interface GetMemoryRecordInput {
  memoryId: string;
  memoryRecordId: string;
  namespace?: string;
}
export interface MemoryRecord {
  memoryRecordId: string;
  content: MemoryContent;
  memoryStrategyId?: string;
  namespaces: string[];
  createdAt: Date;
  metadata?: { [key: string]: MemoryRecordMetadataValue | undefined };
}
export interface GetMemoryRecordOutput {
  memoryRecord: MemoryRecord;
}
export interface GetPaymentInstrumentRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  paymentConnectorId?: string;
  paymentInstrumentId: string;
}
export interface GetPaymentInstrumentResponse {
  paymentInstrument: PaymentInstrument;
}
export type BlockchainChainId =
  | "BASE"
  | "BASE_SEPOLIA"
  | "ETHEREUM"
  | "SOLANA"
  | "SOLANA_DEVNET"
  | (string & {});
export type InstrumentBalanceToken = "USDC" | (string & {});
export interface GetPaymentInstrumentBalanceRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  paymentConnectorId: string;
  paymentInstrumentId: string;
  chain: BlockchainChainId;
  token: InstrumentBalanceToken;
}
export interface TokenBalance {
  amount: string;
  decimals: number;
  token: InstrumentBalanceToken;
  network: CryptoWalletNetwork;
  chain: BlockchainChainId;
}
export interface GetPaymentInstrumentBalanceResponse {
  paymentInstrumentId: string;
  tokenBalance: TokenBalance;
}
export interface GetPaymentSessionRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  paymentSessionId: string;
}
export interface GetPaymentSessionResponse {
  paymentSession: PaymentSession;
}
export interface GetRecommendationRequest {
  recommendationId: string;
}
export type RecommendationArn = string;
export type RecommendationName = string;
export type RecommendationDescription = string;
export type RecommendationType =
  | "SYSTEM_PROMPT_RECOMMENDATION"
  | "TOOL_DESCRIPTION_RECOMMENDATION"
  | (string & {});
export type SystemPromptText = string | redacted.Redacted<string>;
export type ConfigurationBundleVersionId = string;
export interface SystemPromptConfigurationBundle {
  bundleArn: string;
  versionId: string;
  systemPromptJsonPath: string;
}
export type SystemPromptConfig =
  | { text: string | redacted.Redacted<string>; configurationBundle?: never }
  | { text?: never; configurationBundle: SystemPromptConfigurationBundle };
export type LogGroupArnList = string[];
export type ServiceName = string;
export type ServiceNameList = string[];
export type CloudWatchLogsFilterOperator =
  | "Equals"
  | "NotEquals"
  | "GreaterThan"
  | "LessThan"
  | "GreaterThanOrEqual"
  | "LessThanOrEqual"
  | "Contains"
  | "NotContains"
  | (string & {});
export type FilterStringValue = string;
export type FilterValue =
  | { stringValue: string; doubleValue?: never; booleanValue?: never }
  | { stringValue?: never; doubleValue: number; booleanValue?: never }
  | { stringValue?: never; doubleValue?: never; booleanValue: boolean };
export interface CloudWatchLogsFilter {
  key: string;
  operator: CloudWatchLogsFilterOperator;
  value: FilterValue;
}
export type CloudWatchLogsFilterList = CloudWatchLogsFilter[];
export interface CloudWatchLogsRule {
  filters?: CloudWatchLogsFilter[];
}
export interface CloudWatchLogsTraceConfig {
  logGroupArns: string[];
  serviceNames: string[];
  startTime: Date;
  endTime: Date;
  rule?: CloudWatchLogsRule;
}
export interface BatchEvaluationTraceConfig {
  batchEvaluationArn: string;
}
export interface OnlineEvaluationTraceConfig {
  onlineEvaluationConfigArn: string;
  startTime: Date;
  endTime: Date;
}
export type AgentTracesConfig =
  | {
      sessionSpans: any[];
      cloudwatchLogs?: never;
      batchEvaluation?: never;
      onlineEvaluation?: never;
    }
  | {
      sessionSpans?: never;
      cloudwatchLogs: CloudWatchLogsTraceConfig;
      batchEvaluation?: never;
      onlineEvaluation?: never;
    }
  | {
      sessionSpans?: never;
      cloudwatchLogs?: never;
      batchEvaluation: BatchEvaluationTraceConfig;
      onlineEvaluation?: never;
    }
  | {
      sessionSpans?: never;
      cloudwatchLogs?: never;
      batchEvaluation?: never;
      onlineEvaluation: OnlineEvaluationTraceConfig;
    };
export interface RecommendationEvaluatorReference {
  evaluatorArn: string;
}
export type RecommendationEvaluatorList = RecommendationEvaluatorReference[];
export interface RecommendationEvaluationConfig {
  evaluators: RecommendationEvaluatorReference[];
}
export interface SystemPromptRecommendationConfig {
  systemPrompt: SystemPromptConfig;
  agentTraces: AgentTracesConfig;
  evaluationConfig?: RecommendationEvaluationConfig;
}
export type RecommendationToolName = string;
export type ToolDescriptionText = string | redacted.Redacted<string>;
export type ToolDescriptionConfig = {
  text: string | redacted.Redacted<string>;
};
export interface ToolDescriptionInput {
  toolName: string;
  toolDescription: ToolDescriptionConfig;
}
export type ToolDescriptionList = ToolDescriptionInput[];
export interface ToolDescriptionTextInput {
  tools: ToolDescriptionInput[];
}
export interface ConfigurationBundleToolEntry {
  toolName: string;
  toolDescriptionJsonPath: string;
}
export type ConfigurationBundleToolEntryList = ConfigurationBundleToolEntry[];
export interface ToolDescriptionConfigurationBundle {
  bundleArn: string;
  versionId: string;
  tools: ConfigurationBundleToolEntry[];
}
export type ToolDescriptionSource =
  | {
      toolDescriptionText: ToolDescriptionTextInput;
      configurationBundle?: never;
    }
  | {
      toolDescriptionText?: never;
      configurationBundle: ToolDescriptionConfigurationBundle;
    };
export interface ToolDescriptionRecommendationConfig {
  toolDescription: ToolDescriptionSource;
  agentTraces: AgentTracesConfig;
}
export type RecommendationConfig =
  | {
      systemPromptRecommendationConfig: SystemPromptRecommendationConfig;
      toolDescriptionRecommendationConfig?: never;
    }
  | {
      systemPromptRecommendationConfig?: never;
      toolDescriptionRecommendationConfig: ToolDescriptionRecommendationConfig;
    };
export interface RecommendationResultConfigurationBundle {
  bundleArn: string;
  versionId: string;
}
export type RecommendationExplanation = string;
export type RecommendationErrorCode = string;
export type RecommendationErrorMessage = string;
export interface SystemPromptRecommendationResult {
  recommendedSystemPrompt?: string | redacted.Redacted<string>;
  configurationBundle?: RecommendationResultConfigurationBundle;
  explanation?: string;
  errorCode?: string;
  errorMessage?: string;
}
export interface ToolDescriptionOutput {
  toolName: string;
  recommendedToolDescription?: string | redacted.Redacted<string>;
  explanation?: string;
}
export type ToolDescriptionResultList = ToolDescriptionOutput[];
export interface ToolDescriptionRecommendationResult {
  tools?: ToolDescriptionOutput[];
  configurationBundle?: RecommendationResultConfigurationBundle;
  errorCode?: string;
  errorMessage?: string;
}
export type RecommendationResult =
  | {
      systemPromptRecommendationResult: SystemPromptRecommendationResult;
      toolDescriptionRecommendationResult?: never;
    }
  | {
      systemPromptRecommendationResult?: never;
      toolDescriptionRecommendationResult: ToolDescriptionRecommendationResult;
    };
export interface GetRecommendationResponse {
  recommendationId: string;
  recommendationArn: string;
  name: string;
  description?: string;
  type: RecommendationType;
  recommendationConfig: RecommendationConfig;
  status: RecommendationStatus;
  createdAt: Date;
  updatedAt: Date;
  recommendationResult?: RecommendationResult;
  kmsKeyArn?: string;
}
export type WorkloadIdentityTokenType = string | redacted.Redacted<string>;
export type CredentialProviderName = string;
export interface GetResourceApiKeyRequest {
  workloadIdentityToken: string | redacted.Redacted<string>;
  resourceCredentialProviderName: string;
}
export type ApiKeyType = string | redacted.Redacted<string>;
export interface GetResourceApiKeyResponse {
  apiKey: string | redacted.Redacted<string>;
}
export type ScopeType = string;
export type ScopesListType = string[];
export type Oauth2FlowType =
  | "USER_FEDERATION"
  | "M2M"
  | "ON_BEHALF_OF_TOKEN_EXCHANGE"
  | (string & {});
export type ResourceOauth2ReturnUrlType = string;
export type CustomRequestKeyType = string;
export type CustomRequestValueType = string | redacted.Redacted<string>;
export type CustomRequestParametersType = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type State = string | redacted.Redacted<string>;
export type ResourceType = string;
export type ResourcesListType = string[];
export type AudienceType = string;
export type AudiencesListType = string[];
export interface GetResourceOauth2TokenRequest {
  workloadIdentityToken: string | redacted.Redacted<string>;
  resourceCredentialProviderName: string;
  scopes: string[];
  oauth2Flow: Oauth2FlowType;
  sessionUri?: string;
  resourceOauth2ReturnUrl?: string;
  forceAuthentication?: boolean;
  customParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  customState?: string | redacted.Redacted<string>;
  resources?: string[];
  audiences?: string[];
}
export type AuthorizationUrlType = string | redacted.Redacted<string>;
export type AccessTokenType = string | redacted.Redacted<string>;
export type SessionStatus = "IN_PROGRESS" | "FAILED" | (string & {});
export interface GetResourceOauth2TokenResponse {
  authorizationUrl?: string | redacted.Redacted<string>;
  accessToken?: string | redacted.Redacted<string>;
  sessionUri?: string;
  sessionStatus?: SessionStatus;
}
export type PaymentHttpMethodType =
  | "GET"
  | "POST"
  | "PUT"
  | "DELETE"
  | "PATCH"
  | (string & {});
export type PaymentRequestHostType = string;
export type PaymentRequestPathType = string;
export type CoinbaseCdpPaymentRequestBodyType = string;
export interface CoinbaseCdpTokenRequestInput {
  requestMethod: PaymentHttpMethodType;
  requestHost?: string;
  requestPath: string;
  includeWalletAuthToken?: boolean;
  requestBody?: string;
}
export type StripePrivyRequestHostType = string;
export type StripePrivyRequestPathType = string;
export type StripePrivyRequestBodyType = string | redacted.Redacted<string>;
export interface StripePrivyTokenRequestInput {
  requestHost?: string;
  requestPath: string;
  requestBody: string | redacted.Redacted<string>;
  includeAuthorizationSignature?: boolean;
}
export type PaymentTokenRequestInput =
  | {
      coinbaseCdpTokenRequest: CoinbaseCdpTokenRequestInput;
      stripePrivyTokenRequest?: never;
    }
  | {
      coinbaseCdpTokenRequest?: never;
      stripePrivyTokenRequest: StripePrivyTokenRequestInput;
    };
export interface GetResourcePaymentTokenRequest {
  workloadIdentityToken: string | redacted.Redacted<string>;
  resourceCredentialProviderName: string;
  paymentTokenRequest: PaymentTokenRequestInput;
}
export type CoinbaseCdpPaymentJwtTokenType = string | redacted.Redacted<string>;
export interface CoinbaseCdpTokenResponseOutput {
  bearerToken: string | redacted.Redacted<string>;
  walletAuthToken?: string | redacted.Redacted<string>;
}
export type StripePrivyAuthorizationSignatureType =
  | string
  | redacted.Redacted<string>;
export type StripePrivyAppIdType = string;
export type StripePrivyBasicAuthTokenType = string | redacted.Redacted<string>;
export interface StripePrivyTokenResponseOutput {
  authorizationSignature?: string | redacted.Redacted<string>;
  requestExpiry?: number;
  appId: string;
  basicAuthToken: string | redacted.Redacted<string>;
}
export type PaymentTokenResponseOutput =
  | {
      coinbaseCdpTokenResponse: CoinbaseCdpTokenResponseOutput;
      stripePrivyTokenResponse?: never;
    }
  | {
      coinbaseCdpTokenResponse?: never;
      stripePrivyTokenResponse: StripePrivyTokenResponseOutput;
    };
export interface GetResourcePaymentTokenResponse {
  paymentTokenResponse: PaymentTokenResponseOutput;
}
export type WorkloadIdentityNameType = string;
export interface GetWorkloadAccessTokenRequest {
  workloadName: string;
}
export interface GetWorkloadAccessTokenResponse {
  workloadAccessToken: string | redacted.Redacted<string>;
}
export interface GetWorkloadAccessTokenForJWTRequest {
  workloadName: string;
  userToken: string | redacted.Redacted<string>;
}
export interface GetWorkloadAccessTokenForJWTResponse {
  workloadAccessToken: string | redacted.Redacted<string>;
}
export interface GetWorkloadAccessTokenForUserIdRequest {
  workloadName: string;
  userId: string;
}
export interface GetWorkloadAccessTokenForUserIdResponse {
  workloadAccessToken: string | redacted.Redacted<string>;
}
export type IngestPayloadType =
  | { conversational: Conversational; json?: never }
  | { conversational?: never; json: MemoryJsonData };
export type IngestPayloadList = IngestPayloadType[];
export interface InlineMemoryContent {
  payload: IngestPayloadType[];
}
export type ContentSource = { inline: InlineMemoryContent };
export interface IngestDataInput {
  memoryId: string;
  source: ContentSource;
  contentTimestamp: Date;
  actorId: string;
  sessionId?: string;
  extractionConfig?: ExtractionConfig;
  metadata?: { [key: string]: MetadataValue | undefined };
  clientToken?: string;
}
export interface IngestDataOutput {
  sessionId: string;
}
export type MimeType = string;
export type StringType = string;
export type Body = Uint8Array | redacted.Redacted<Uint8Array>;
export interface InvokeAgentRuntimeRequest {
  contentType?: string;
  accept?: string;
  mcpSessionId?: string;
  runtimeSessionId?: string;
  mcpProtocolVersion?: string;
  mcpMethod?: string;
  mcpName?: string;
  runtimeUserId?: string;
  traceId?: string;
  traceParent?: string;
  traceState?: string;
  baggage?: string;
  agentRuntimeArn: string;
  qualifier?: string;
  accountId?: string;
  payload: T.StreamingInputBody;
}
export interface InvokeAgentRuntimeResponse {
  runtimeSessionId?: string;
  mcpSessionId?: string;
  mcpProtocolVersion?: string;
  traceId?: string;
  traceParent?: string;
  traceState?: string;
  baggage?: string;
  contentType: string;
  response?: T.StreamingOutputBody;
  statusCode?: number;
}
export interface InvokeAgentRuntimeCommandRequestBody {
  command: string;
  timeout?: number;
}
export interface InvokeAgentRuntimeCommandRequest {
  contentType?: string;
  accept?: string;
  runtimeSessionId?: string;
  traceId?: string;
  traceParent?: string;
  traceState?: string;
  baggage?: string;
  agentRuntimeArn: string;
  qualifier?: string;
  accountId?: string;
  body: InvokeAgentRuntimeCommandRequestBody;
}
export interface ContentStartEvent {}
export interface ContentDeltaEvent {
  stdout?: string;
  stderr?: string;
}
export type CommandExecutionStatus = "COMPLETED" | "TIMED_OUT" | (string & {});
export interface ContentStopEvent {
  exitCode: number;
  status: CommandExecutionStatus;
}
export interface ResponseChunk {
  contentStart?: ContentStartEvent;
  contentDelta?: ContentDeltaEvent;
  contentStop?: ContentStopEvent;
}
export type NonBlankString = string;
export type ValidationExceptionReason =
  | "CannotParse"
  | "FieldValidationFailed"
  | "IdempotentParameterMismatchException"
  | "EventInOtherSession"
  | "ResourceConflict"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type InvokeAgentRuntimeCommandStreamOutput =
  | {
      chunk: ResponseChunk;
      accessDeniedException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      chunk?: never;
      accessDeniedException: AccessDeniedException;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      chunk?: never;
      accessDeniedException?: never;
      internalServerException: InternalServerException;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      chunk?: never;
      accessDeniedException?: never;
      internalServerException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      chunk?: never;
      accessDeniedException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      chunk?: never;
      accessDeniedException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException: ThrottlingException;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      chunk?: never;
      accessDeniedException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException: ValidationException;
      runtimeClientError?: never;
    }
  | {
      chunk?: never;
      accessDeniedException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
      runtimeClientError: RuntimeClientError;
    };
export interface InvokeAgentRuntimeCommandResponse {
  runtimeSessionId?: string;
  traceId?: string;
  traceParent?: string;
  traceState?: string;
  baggage?: string;
  contentType: string;
  statusCode?: number;
  stream: stream.Stream<InvokeAgentRuntimeCommandStreamOutput, Error, never>;
}
export type MouseButton = "LEFT" | "RIGHT" | "MIDDLE" | (string & {});
export interface MouseClickArguments {
  x: number;
  y: number;
  button?: MouseButton;
  clickCount?: number;
}
export interface MouseMoveArguments {
  x: number;
  y: number;
}
export interface MouseDragArguments {
  endX: number;
  endY: number;
  startX: number;
  startY: number;
  button?: MouseButton;
}
export interface MouseScrollArguments {
  x: number;
  y: number;
  deltaX?: number;
  deltaY?: number;
}
export interface KeyTypeArguments {
  text: string;
}
export interface KeyPressArguments {
  key: string;
  presses?: number;
}
export type KeyList = string[];
export interface KeyShortcutArguments {
  keys: string[];
}
export type ScreenshotFormat = "PNG" | (string & {});
export interface ScreenshotArguments {
  format?: ScreenshotFormat;
}
export type BrowserAction =
  | {
      mouseClick: MouseClickArguments;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove: MouseMoveArguments;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag: MouseDragArguments;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll: MouseScrollArguments;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType: KeyTypeArguments;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress: KeyPressArguments;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut: KeyShortcutArguments;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot: ScreenshotArguments;
    };
export interface InvokeBrowserRequest {
  browserIdentifier: string;
  sessionId: string;
  action: BrowserAction;
}
export type BrowserActionStatus = "SUCCESS" | "FAILED" | (string & {});
export interface MouseClickResult {
  status: BrowserActionStatus;
  error?: string;
}
export interface MouseMoveResult {
  status: BrowserActionStatus;
  error?: string;
}
export interface MouseDragResult {
  status: BrowserActionStatus;
  error?: string;
}
export interface MouseScrollResult {
  status: BrowserActionStatus;
  error?: string;
}
export interface KeyTypeResult {
  status: BrowserActionStatus;
  error?: string;
}
export interface KeyPressResult {
  status: BrowserActionStatus;
  error?: string;
}
export interface KeyShortcutResult {
  status: BrowserActionStatus;
  error?: string;
}
export interface ScreenshotResult {
  status: BrowserActionStatus;
  error?: string;
  data?: Uint8Array;
}
export type BrowserActionResult =
  | {
      mouseClick: MouseClickResult;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove: MouseMoveResult;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag: MouseDragResult;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll: MouseScrollResult;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType: KeyTypeResult;
      keyPress?: never;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress: KeyPressResult;
      keyShortcut?: never;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut: KeyShortcutResult;
      screenshot?: never;
    }
  | {
      mouseClick?: never;
      mouseMove?: never;
      mouseDrag?: never;
      mouseScroll?: never;
      keyType?: never;
      keyPress?: never;
      keyShortcut?: never;
      screenshot: ScreenshotResult;
    };
export interface InvokeBrowserResponse {
  result: BrowserActionResult;
  sessionId: string;
}
export type ToolName =
  | "executeCode"
  | "executeCommand"
  | "readFiles"
  | "listFiles"
  | "removeFiles"
  | "writeFiles"
  | "startCommandExecution"
  | "getTask"
  | "stopTask"
  | (string & {});
export type MaxLenString = string;
export type ProgrammingLanguage =
  | "python"
  | "javascript"
  | "typescript"
  | (string & {});
export type StringList = string[];
export interface InputContentBlock {
  path: string;
  text?: string;
  blob?: Uint8Array | redacted.Redacted<Uint8Array>;
}
export type InputContentBlockList = InputContentBlock[];
export type LanguageRuntime = "nodejs" | "deno" | "python" | (string & {});
export interface ToolArguments {
  code?: string;
  language?: ProgrammingLanguage;
  clearContext?: boolean;
  command?: string;
  path?: string;
  paths?: string[];
  content?: InputContentBlock[];
  directoryPath?: string;
  taskId?: string;
  runtime?: LanguageRuntime;
}
export interface InvokeCodeInterpreterRequest {
  codeInterpreterIdentifier: string;
  sessionId?: string;
  traceId?: string;
  traceParent?: string;
  name: ToolName;
  arguments?: ToolArguments;
}
export type ContentBlockType =
  | "text"
  | "image"
  | "resource"
  | "resource_link"
  | (string & {});
export type ResourceContentType = "text" | "blob" | (string & {});
export interface ResourceContent {
  type: ResourceContentType;
  uri?: string;
  mimeType?: string;
  text?: string;
  blob?: Uint8Array;
}
export interface ContentBlock {
  type: ContentBlockType;
  text?: string;
  data?: Uint8Array;
  mimeType?: string;
  uri?: string;
  name?: string;
  description?: string;
  size?: number;
  resource?: ResourceContent;
}
export type ContentBlockList = ContentBlock[];
export type TaskStatus =
  | "submitted"
  | "working"
  | "completed"
  | "canceled"
  | "failed"
  | (string & {});
export interface ToolResultStructuredContent {
  taskId?: string;
  taskStatus?: TaskStatus;
  stdout?: string;
  stderr?: string;
  exitCode?: number;
  executionTime?: number;
}
export interface CodeInterpreterResult {
  content: ContentBlock[];
  structuredContent?: ToolResultStructuredContent;
  isError?: boolean;
}
export type CodeInterpreterStreamOutput =
  | {
      result: CodeInterpreterResult;
      accessDeniedException?: never;
      conflictException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
    }
  | {
      result?: never;
      accessDeniedException: AccessDeniedException;
      conflictException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
    }
  | {
      result?: never;
      accessDeniedException?: never;
      conflictException: ConflictException;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
    }
  | {
      result?: never;
      accessDeniedException?: never;
      conflictException?: never;
      internalServerException: InternalServerException;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
    }
  | {
      result?: never;
      accessDeniedException?: never;
      conflictException?: never;
      internalServerException?: never;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException?: never;
    }
  | {
      result?: never;
      accessDeniedException?: never;
      conflictException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: never;
      validationException?: never;
    }
  | {
      result?: never;
      accessDeniedException?: never;
      conflictException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException: ThrottlingException;
      validationException?: never;
    }
  | {
      result?: never;
      accessDeniedException?: never;
      conflictException?: never;
      internalServerException?: never;
      resourceNotFoundException?: never;
      serviceQuotaExceededException?: never;
      throttlingException?: never;
      validationException: ValidationException;
    };
export interface InvokeCodeInterpreterResponse {
  sessionId?: string;
  stream: stream.Stream<CodeInterpreterStreamOutput, Error, never>;
}
export type HarnessArn = string;
export type HarnessEndpointName = string;
export type HarnessConversationRole = "user" | "assistant" | (string & {});
export type SensitiveText = string | redacted.Redacted<string>;
export type HarnessToolName = string;
export type HarnessToolUseId = string;
export type SensitiveJson = unknown;
export type HarnessToolUseType =
  | "tool_use"
  | "server_tool_use"
  | "mcp_tool_use"
  | (string & {});
export interface HarnessToolUseBlock {
  name: string;
  toolUseId: string;
  input: any;
  type?: HarnessToolUseType;
  serverName?: string;
}
export type HarnessToolResultContentBlock =
  | { text: string | redacted.Redacted<string>; json?: never }
  | { text?: never; json: any };
export type HarnessToolResultContentBlocks = HarnessToolResultContentBlock[];
export type HarnessToolUseStatus = "success" | "error" | (string & {});
export interface HarnessToolResultBlock {
  toolUseId: string;
  content: HarnessToolResultContentBlock[];
  status?: HarnessToolUseStatus;
  type?: HarnessToolUseType;
}
export interface HarnessReasoningTextBlock {
  text: string;
  signature?: string;
}
export type HarnessReasoningContentBlock =
  | { reasoningText: HarnessReasoningTextBlock; redactedContent?: never }
  | { reasoningText?: never; redactedContent: Uint8Array };
export type HarnessContentBlock =
  | {
      text: string | redacted.Redacted<string>;
      toolUse?: never;
      toolResult?: never;
      reasoningContent?: never;
    }
  | {
      text?: never;
      toolUse: HarnessToolUseBlock;
      toolResult?: never;
      reasoningContent?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult: HarnessToolResultBlock;
      reasoningContent?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult?: never;
      reasoningContent: HarnessReasoningContentBlock;
    };
export type HarnessContentBlocks = HarnessContentBlock[];
export interface HarnessMessage {
  role: HarnessConversationRole;
  content: HarnessContentBlock[];
}
export type HarnessMessages = HarnessMessage[];
export type ModelId = string;
export type MaxTokens = number;
export type Temperature = number;
export type TopP = number;
export type HarnessBedrockApiFormat =
  | "converse_stream"
  | "responses"
  | "chat_completions"
  | (string & {});
export interface HarnessBedrockModelConfig {
  modelId: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  apiFormat?: HarnessBedrockApiFormat;
  additionalParams?: any;
}
export type ApiKeyArn = string;
export type HarnessOpenAiApiFormat =
  | "chat_completions"
  | "responses"
  | (string & {});
export interface HarnessOpenAiModelConfig {
  modelId: string;
  apiKeyArn: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  apiFormat?: HarnessOpenAiApiFormat;
  additionalParams?: any;
}
export type TopK = number;
export interface HarnessGeminiModelConfig {
  modelId: string;
  apiKeyArn: string;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  topK?: number;
  additionalParams?: any;
}
export type HarnessLiteLlmApiBase = string | redacted.Redacted<string>;
export interface HarnessLiteLlmModelConfig {
  modelId: string;
  apiKeyArn?: string;
  apiBase?: string | redacted.Redacted<string>;
  maxTokens?: number;
  temperature?: number;
  topP?: number;
  additionalParams?: any;
}
export type HarnessModelConfiguration =
  | {
      bedrockModelConfig: HarnessBedrockModelConfig;
      openAiModelConfig?: never;
      geminiModelConfig?: never;
      liteLlmModelConfig?: never;
    }
  | {
      bedrockModelConfig?: never;
      openAiModelConfig: HarnessOpenAiModelConfig;
      geminiModelConfig?: never;
      liteLlmModelConfig?: never;
    }
  | {
      bedrockModelConfig?: never;
      openAiModelConfig?: never;
      geminiModelConfig: HarnessGeminiModelConfig;
      liteLlmModelConfig?: never;
    }
  | {
      bedrockModelConfig?: never;
      openAiModelConfig?: never;
      geminiModelConfig?: never;
      liteLlmModelConfig: HarnessLiteLlmModelConfig;
    };
export type HarnessSystemContentBlock = {
  text: string | redacted.Redacted<string>;
};
export type HarnessSystemPrompt = HarnessSystemContentBlock[];
export type HarnessToolType =
  | "remote_mcp"
  | "agentcore_browser"
  | "agentcore_gateway"
  | "inline_function"
  | "agentcore_code_interpreter"
  | (string & {});
export type HarnessRemoteMcpUrl = string | redacted.Redacted<string>;
export type HttpHeaderKey = string;
export type HttpHeaderValue = string;
export type HttpHeadersMap = { [key: string]: string | undefined };
export interface HarnessRemoteMcpConfig {
  url: string | redacted.Redacted<string>;
  headers?: { [key: string]: string | undefined };
}
export type HarnessBrowserArn = string;
export interface HarnessAgentCoreBrowserConfig {
  browserArn?: string;
}
export type OAuthCredentialProviderArn = string;
export type OAuthScope = string;
export type OAuthScopes = string[];
export type OAuthCustomParametersKey = string;
export type OAuthCustomParametersValue = string | redacted.Redacted<string>;
export type OAuthCustomParameters = {
  [key: string]: string | redacted.Redacted<string> | undefined;
};
export type OAuthGrantType =
  | "CLIENT_CREDENTIALS"
  | "AUTHORIZATION_CODE"
  | "TOKEN_EXCHANGE"
  | (string & {});
export type OAuthDefaultReturnUrl = string;
export interface OAuthCredentialProvider {
  providerArn: string;
  scopes: string[];
  customParameters?: {
    [key: string]: string | redacted.Redacted<string> | undefined;
  };
  grantType?: OAuthGrantType;
  defaultReturnUrl?: string;
}
export type HarnessGatewayOutboundAuth =
  | { awsIam: Record<string, never>; none?: never; oauth?: never }
  | { awsIam?: never; none: Record<string, never>; oauth?: never }
  | { awsIam?: never; none?: never; oauth: OAuthCredentialProvider };
export interface HarnessAgentCoreGatewayConfig {
  gatewayArn: string;
  outboundAuth?: HarnessGatewayOutboundAuth;
}
export type HarnessInlineFunctionDescription =
  | string
  | redacted.Redacted<string>;
export interface HarnessInlineFunctionConfig {
  description: string | redacted.Redacted<string>;
  inputSchema: any;
}
export type HarnessCodeInterpreterArn = string;
export interface HarnessAgentCoreCodeInterpreterConfig {
  codeInterpreterArn?: string;
}
export type HarnessToolConfiguration =
  | {
      remoteMcp: HarnessRemoteMcpConfig;
      agentCoreBrowser?: never;
      agentCoreGateway?: never;
      inlineFunction?: never;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser: HarnessAgentCoreBrowserConfig;
      agentCoreGateway?: never;
      inlineFunction?: never;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser?: never;
      agentCoreGateway: HarnessAgentCoreGatewayConfig;
      inlineFunction?: never;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser?: never;
      agentCoreGateway?: never;
      inlineFunction: HarnessInlineFunctionConfig;
      agentCoreCodeInterpreter?: never;
    }
  | {
      remoteMcp?: never;
      agentCoreBrowser?: never;
      agentCoreGateway?: never;
      inlineFunction?: never;
      agentCoreCodeInterpreter: HarnessAgentCoreCodeInterpreterConfig;
    };
export interface HarnessTool {
  type: HarnessToolType;
  name?: string;
  config?: HarnessToolConfiguration;
}
export type HarnessTools = HarnessTool[];
export type HarnessSkillPath = string;
export type HarnessSkillS3Uri = string;
export interface HarnessSkillS3Source {
  uri: string;
}
export type HarnessSkillGitUrl = string;
export interface HarnessSkillGitAuth {
  credentialArn: string;
  username?: string;
}
export interface HarnessSkillGitSource {
  url: string;
  path?: string;
  auth?: HarnessSkillGitAuth;
}
export type HarnessAwsSkillPath = string;
export type HarnessAwsSkillPaths = string[];
export interface HarnessSkillAwsSkillsSource {
  paths?: string[];
}
export type HarnessSkill =
  | { path: string; s3?: never; git?: never; awsSkills?: never }
  | { path?: never; s3: HarnessSkillS3Source; git?: never; awsSkills?: never }
  | { path?: never; s3?: never; git: HarnessSkillGitSource; awsSkills?: never }
  | {
      path?: never;
      s3?: never;
      git?: never;
      awsSkills: HarnessSkillAwsSkillsSource;
    };
export type HarnessSkills = HarnessSkill[];
export type HarnessAllowedTool = string;
export type HarnessAllowedTools = string[];
export interface InvokeHarnessRequest {
  harnessArn: string;
  qualifier?: string;
  runtimeSessionId: string;
  runtimeUserId?: string;
  traceParent?: string;
  traceState?: string;
  traceId?: string;
  baggage?: string;
  messages: HarnessMessage[];
  model?: HarnessModelConfiguration;
  systemPrompt?: HarnessSystemContentBlock[];
  tools?: HarnessTool[];
  skills?: HarnessSkill[];
  allowedTools?: string[];
  maxIterations?: number;
  maxTokens?: number;
  timeoutSeconds?: number;
  actorId?: string;
}
export interface HarnessMessageStartEvent {
  role: HarnessConversationRole;
}
export interface HarnessToolUseBlockStart {
  toolUseId: string;
  name: string;
  type?: HarnessToolUseType;
  serverName?: string;
}
export interface HarnessToolResultBlockStart {
  toolUseId: string;
  status?: HarnessToolUseStatus;
}
export type HarnessContentBlockStart =
  | { toolUse: HarnessToolUseBlockStart; toolResult?: never }
  | { toolUse?: never; toolResult: HarnessToolResultBlockStart };
export interface HarnessContentBlockStartEvent {
  contentBlockIndex: number;
  start: HarnessContentBlockStart;
}
export interface HarnessToolUseBlockDelta {
  input: string | redacted.Redacted<string>;
}
export type HarnessToolResultBlockDelta =
  | { text: string | redacted.Redacted<string>; json?: never }
  | { text?: never; json: any };
export type HarnessToolResultBlocksDelta = HarnessToolResultBlockDelta[];
export type HarnessReasoningContentBlockDelta =
  | { text: string; redactedContent?: never; signature?: never }
  | {
      text?: never;
      redactedContent: Uint8Array | redacted.Redacted<Uint8Array>;
      signature?: never;
    }
  | { text?: never; redactedContent?: never; signature: string };
export interface HarnessToolResultMetadataBlockDelta {
  metadata: string | redacted.Redacted<string>;
}
export type HarnessContentBlockDelta =
  | {
      text: string | redacted.Redacted<string>;
      toolUse?: never;
      toolResult?: never;
      reasoningContent?: never;
      toolResultMetadata?: never;
    }
  | {
      text?: never;
      toolUse: HarnessToolUseBlockDelta;
      toolResult?: never;
      reasoningContent?: never;
      toolResultMetadata?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult: HarnessToolResultBlockDelta[];
      reasoningContent?: never;
      toolResultMetadata?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult?: never;
      reasoningContent: HarnessReasoningContentBlockDelta;
      toolResultMetadata?: never;
    }
  | {
      text?: never;
      toolUse?: never;
      toolResult?: never;
      reasoningContent?: never;
      toolResultMetadata: HarnessToolResultMetadataBlockDelta;
    };
export interface HarnessContentBlockDeltaEvent {
  contentBlockIndex: number;
  delta: HarnessContentBlockDelta;
}
export interface HarnessContentBlockStopEvent {
  contentBlockIndex: number;
}
export type HarnessStopReason =
  | "end_turn"
  | "tool_use"
  | "tool_result"
  | "max_tokens"
  | "stop_sequence"
  | "content_filtered"
  | "malformed_model_output"
  | "malformed_tool_use"
  | "interrupted"
  | "partial_turn"
  | "model_context_window_exceeded"
  | "max_iterations_exceeded"
  | "max_output_tokens_exceeded"
  | "timeout_exceeded"
  | (string & {});
export interface HarnessMessageStopEvent {
  stopReason: HarnessStopReason;
}
export interface HarnessTokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cacheReadInputTokens?: number;
  cacheWriteInputTokens?: number;
}
export interface HarnessStreamMetrics {
  latencyMs: number;
}
export interface HarnessMetadataEvent {
  usage: HarnessTokenUsage;
  metrics: HarnessStreamMetrics;
}
export type InvokeHarnessStreamOutput =
  | {
      messageStart: HarnessMessageStartEvent;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart: HarnessContentBlockStartEvent;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta: HarnessContentBlockDeltaEvent;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop: HarnessContentBlockStopEvent;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop: HarnessMessageStopEvent;
      metadata?: never;
      internalServerException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata: HarnessMetadataEvent;
      internalServerException?: never;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException: InternalServerException;
      validationException?: never;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      validationException: ValidationException;
      runtimeClientError?: never;
    }
  | {
      messageStart?: never;
      contentBlockStart?: never;
      contentBlockDelta?: never;
      contentBlockStop?: never;
      messageStop?: never;
      metadata?: never;
      internalServerException?: never;
      validationException?: never;
      runtimeClientError: RuntimeClientError;
    };
export interface InvokeHarnessResponse {
  stream: stream.Stream<InvokeHarnessStreamOutput, Error, never>;
}
export interface ListABTestsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface ABTestSummary {
  abTestId: string;
  abTestArn: string;
  name: string;
  status: ABTestStatus;
  executionStatus: ABTestExecutionStatus;
  description?: string;
  gatewayArn?: string;
  createdAt: Date;
  updatedAt: Date;
}
export type ABTestSummaryList = ABTestSummary[];
export interface ListABTestsResponse {
  abTests: ABTestSummary[];
  nextToken?: string;
}
export type MaxResults = number;
export type PaginationToken = string;
export interface ListActorsInput {
  memoryId: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ActorSummary {
  actorId: string;
}
export type ActorSummaryList = ActorSummary[];
export interface ListActorsOutput {
  actorSummaries: ActorSummary[];
  nextToken?: string;
}
export interface ListBatchEvaluationsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface BatchEvaluationSummary {
  batchEvaluationId: string;
  batchEvaluationArn: string;
  batchEvaluationName: string;
  status: BatchEvaluationStatus;
  createdAt: Date;
  description?: string;
  evaluators?: Evaluator[];
  insights?: Insight[];
  evaluationResults?: EvaluationJobResults;
  errorDetails?: string[];
  kmsKeyArn?: string;
  updatedAt?: Date;
}
export type BatchEvaluationSummaryList = BatchEvaluationSummary[];
export interface ListBatchEvaluationsResponse {
  batchEvaluations: BatchEvaluationSummary[];
  nextToken?: string;
}
export type NextToken = string;
export interface ListBrowserSessionsRequest {
  browserIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  status?: BrowserSessionStatus;
}
export interface BrowserSessionSummary {
  browserIdentifier: string;
  sessionId: string;
  name?: string;
  status: BrowserSessionStatus;
  createdAt: Date;
  lastUpdatedAt?: Date;
}
export type BrowserSessionSummaries = BrowserSessionSummary[];
export interface ListBrowserSessionsResponse {
  items: BrowserSessionSummary[];
  nextToken?: string;
}
export interface ListCodeInterpreterSessionsRequest {
  codeInterpreterIdentifier: string;
  maxResults?: number;
  nextToken?: string;
  status?: CodeInterpreterSessionStatus;
}
export interface CodeInterpreterSessionSummary {
  codeInterpreterIdentifier: string;
  sessionId: string;
  name?: string;
  status: CodeInterpreterSessionStatus;
  createdAt: Date;
  lastUpdatedAt?: Date;
}
export type CodeInterpreterSessionSummaries = CodeInterpreterSessionSummary[];
export interface ListCodeInterpreterSessionsResponse {
  items: CodeInterpreterSessionSummary[];
  nextToken?: string;
}
export interface BranchFilter {
  name: string;
  includeParentBranches?: boolean;
}
export type LeftExpression = { metadataKey: string };
export type OperatorType =
  | "EQUALS_TO"
  | "EXISTS"
  | "NOT_EXISTS"
  | (string & {});
export type RightExpression = { metadataValue: MetadataValue };
export interface EventMetadataFilterExpression {
  left: LeftExpression;
  operator: OperatorType;
  right?: RightExpression;
}
export type EventMetadataFilterList = EventMetadataFilterExpression[];
export interface FilterInput {
  branch?: BranchFilter;
  eventMetadata?: EventMetadataFilterExpression[];
}
export interface ListEventsInput {
  memoryId: string;
  sessionId: string;
  actorId: string;
  includePayloads?: boolean;
  filter?: FilterInput;
  maxResults?: number;
  nextToken?: string;
}
export type EventList = Event[];
export interface ListEventsOutput {
  events: Event[];
  nextToken?: string;
}
export type ExtractionJobStatus = "FAILED" | (string & {});
export interface ExtractionJobFilterInput {
  strategyId?: string;
  sessionId?: string;
  actorId?: string;
  status?: ExtractionJobStatus;
}
export interface ListMemoryExtractionJobsInput {
  memoryId: string;
  maxResults?: number;
  filter?: ExtractionJobFilterInput;
  nextToken?: string;
}
export interface MessageMetadata {
  eventId: string;
  messageIndex: number;
}
export type MessagesList = MessageMetadata[];
export type ExtractionJobMessages = { messagesList: MessageMetadata[] };
export interface ExtractionJobMetadata {
  jobID: string;
  messages: ExtractionJobMessages;
  status?: ExtractionJobStatus;
  failureReason?: string;
  strategyId?: string;
  sessionId?: string;
  actorId?: string;
}
export type ExtractionJobMetadataList = ExtractionJobMetadata[];
export interface ListMemoryExtractionJobsOutput {
  jobs: ExtractionJobMetadata[];
  nextToken?: string;
}
export type MemoryRecordLeftExpression = { metadataKey: string };
export type MemoryRecordOperatorType =
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
export type MemoryRecordRightExpression = {
  metadataValue: MemoryRecordMetadataValue;
};
export interface MemoryMetadataFilterExpression {
  left: MemoryRecordLeftExpression;
  operator: MemoryRecordOperatorType;
  right?: MemoryRecordRightExpression;
}
export type MemoryMetadataFilterList = MemoryMetadataFilterExpression[];
export interface ListMemoryRecordsInput {
  memoryId: string;
  namespace?: string;
  namespacePath?: string;
  memoryStrategyId?: string;
  maxResults?: number;
  nextToken?: string;
  metadataFilters?: MemoryMetadataFilterExpression[];
}
export interface MemoryRecordSummary {
  memoryRecordId: string;
  content: MemoryContent;
  memoryStrategyId?: string;
  namespaces: string[];
  createdAt: Date;
  score?: number;
  metadata?: { [key: string]: MemoryRecordMetadataValue | undefined };
}
export type MemoryRecordSummaryList = MemoryRecordSummary[];
export interface ListMemoryRecordsOutput {
  memoryRecordSummaries: MemoryRecordSummary[];
  nextToken?: string;
}
export interface ListPaymentInstrumentsRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  paymentConnectorId?: string;
  nextToken?: string;
  maxResults?: number;
}
export interface PaymentInstrumentSummary {
  paymentInstrumentId: string;
  paymentManagerArn: string;
  paymentConnectorId: string;
  userId: string;
  paymentInstrumentType: PaymentInstrumentType;
  status: PaymentInstrumentStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type PaymentInstrumentSummaryList = PaymentInstrumentSummary[];
export interface ListPaymentInstrumentsResponse {
  paymentInstruments: PaymentInstrumentSummary[];
  nextToken?: string;
}
export interface ListPaymentSessionsRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  nextToken?: string;
  maxResults?: number;
}
export interface PaymentSessionSummary {
  paymentSessionId: string;
  paymentManagerArn: string;
  userId: string;
  expiryTimeInMinutes: number;
  createdAt: Date;
  updatedAt: Date;
}
export type PaymentSessionSummaryList = PaymentSessionSummary[];
export interface ListPaymentSessionsResponse {
  paymentSessions: PaymentSessionSummary[];
  nextToken?: string;
}
export interface ListRecommendationsRequest {
  maxResults?: number;
  nextToken?: string;
  statusFilter?: RecommendationStatus;
}
export interface RecommendationSummary {
  recommendationId: string;
  recommendationArn: string;
  name: string;
  description?: string;
  type: RecommendationType;
  status: RecommendationStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type RecommendationSummaryList = RecommendationSummary[];
export interface ListRecommendationsResponse {
  recommendationSummaries: RecommendationSummary[];
  nextToken?: string;
}
export type EventFilterCondition = "HAS_EVENTS" | (string & {});
export interface SessionFilter {
  eventFilter?: EventFilterCondition;
}
export interface ListSessionsInput {
  memoryId: string;
  actorId: string;
  maxResults?: number;
  nextToken?: string;
  filter?: SessionFilter;
}
export interface SessionSummary {
  sessionId: string;
  actorId: string;
  createdAt: Date;
}
export type SessionSummaryList = SessionSummary[];
export interface ListSessionsOutput {
  sessionSummaries: SessionSummary[];
  nextToken?: string;
}
export type PaymentType = "CRYPTO_X402" | "MPP" | (string & {});
export type PaymentDocument = unknown;
export type Permit2AllowanceLimit = string;
export interface CryptoX402PaymentInput {
  version: string;
  payload: any;
  permit2AllowanceLimit?: string;
}
export type Version = string;
export type WwwAuthenticateHeader = string;
export type WwwAuthenticateHeaderList = string[];
export interface MppPaymentInput {
  version: string;
  wwwAuthenticateHeaders: string[];
  buyerPaysGasFees?: boolean;
}
export type PaymentInput =
  | { cryptoX402: CryptoX402PaymentInput; mpp?: never }
  | { cryptoX402?: never; mpp: MppPaymentInput };
export interface ProcessPaymentRequest {
  userId?: string;
  agentName?: string;
  paymentManagerArn: string;
  paymentSessionId: string;
  paymentInstrumentId: string;
  paymentType: PaymentType;
  paymentInput: PaymentInput;
  clientToken?: string;
}
export type ProcessPaymentId = string;
export type PaymentStatus = "PROOF_GENERATED" | (string & {});
export interface CryptoX402PaymentOutput {
  version: string;
  payload: any;
}
export type MppPaymentCredential = string | redacted.Redacted<string>;
export interface MppPaymentOutput {
  version: string;
  selectedPaymentId: string;
  paymentCredential: string | redacted.Redacted<string>;
}
export type PaymentOutput =
  | { cryptoX402: CryptoX402PaymentOutput; mpp?: never }
  | { cryptoX402?: never; mpp: MppPaymentOutput };
export interface ProcessPaymentResponse {
  processPaymentId: string;
  paymentManagerArn: string;
  paymentSessionId: string;
  paymentInstrumentId: string;
  paymentType: PaymentType;
  status: PaymentStatus;
  paymentOutput: PaymentOutput;
  createdAt: Date;
  updatedAt: Date;
}
export interface SearchCriteria {
  searchQuery: string | redacted.Redacted<string>;
  memoryStrategyId?: string;
  topK?: number;
  metadataFilters?: MemoryMetadataFilterExpression[];
}
export interface RetrieveMemoryRecordsInput {
  memoryId: string;
  namespace?: string;
  namespacePath?: string;
  searchCriteria: SearchCriteria;
  nextToken?: string;
  maxResults?: number;
}
export interface RetrieveMemoryRecordsOutput {
  memoryRecordSummaries: MemoryRecordSummary[];
  nextToken?: string;
}
export interface SaveBrowserSessionProfileRequest {
  traceId?: string;
  traceParent?: string;
  profileIdentifier: string;
  browserIdentifier: string;
  sessionId: string;
  clientToken?: string;
}
export interface SaveBrowserSessionProfileResponse {
  profileIdentifier: string;
  browserIdentifier: string;
  sessionId: string;
  lastUpdatedAt: Date;
}
export type RegistryIdentifier = string;
export type RegistryIdList = string[];
export type MetadataFilterExpression = unknown;
export interface SearchRegistryRecordsRequest {
  searchQuery: string;
  registryIds: string[];
  maxResults?: number;
  filters?: any;
}
export type RegistryArn = string;
export type RegistryRecordArn = string;
export type RegistryRecordId = string;
export type RegistryRecordName = string;
export type Description = string | redacted.Redacted<string>;
export type DescriptorType =
  | "MCP"
  | "A2A"
  | "CUSTOM"
  | "AGENT_SKILLS"
  | (string & {});
export type SchemaVersion = string;
export type InlineContent = string;
export interface ServerDefinition {
  schemaVersion?: string;
  inlineContent?: string;
}
export interface ToolsDefinition {
  protocolVersion?: string;
  inlineContent?: string;
}
export interface McpDescriptor {
  server: ServerDefinition;
  tools: ToolsDefinition;
}
export interface AgentCardDefinition {
  schemaVersion?: string;
  inlineContent?: string;
}
export interface A2aDescriptor {
  agentCard: AgentCardDefinition;
}
export interface CustomDescriptor {
  inlineContent?: string;
}
export interface SkillMdDefinition {
  inlineContent?: string;
}
export interface SkillDefinition {
  schemaVersion?: string;
  inlineContent?: string;
}
export interface AgentSkillsDescriptor {
  skillMd: SkillMdDefinition;
  skillDefinition?: SkillDefinition;
}
export interface Descriptors {
  mcp?: McpDescriptor;
  a2a?: A2aDescriptor;
  custom?: CustomDescriptor;
  agentSkills?: AgentSkillsDescriptor;
}
export type RegistryRecordVersion = string;
export type RegistryRecordStatus =
  | "DRAFT"
  | "PENDING_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "DEPRECATED"
  | (string & {});
export interface RegistryRecordSummary {
  registryArn: string;
  recordArn: string;
  recordId: string;
  name: string;
  description?: string | redacted.Redacted<string>;
  descriptorType: DescriptorType;
  descriptors: Descriptors;
  version: string;
  status: RegistryRecordStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type RegistryRecordSummaryList = RegistryRecordSummary[];
export interface SearchRegistryRecordsResponse {
  registryRecords: RegistryRecordSummary[];
}
export type GroundTruthTurnInput = { prompt: string };
export interface GroundTruthTurn {
  input?: GroundTruthTurnInput;
  expectedResponse?: EvaluationContent;
}
export type GroundTruthTurnList = GroundTruthTurn[];
export interface InlineGroundTruth {
  assertions?: EvaluationContent[];
  expectedTrajectory?: EvaluationExpectedTrajectory;
  turns?: GroundTruthTurn[];
}
export type GroundTruthSource = { inline: InlineGroundTruth };
export type StringMap = { [key: string]: string | undefined };
export interface SessionMetadataShape {
  sessionId: string;
  testScenarioId?: string;
  groundTruth?: GroundTruthSource;
  metadata?: { [key: string]: string | undefined };
}
export type SessionMetadataList = SessionMetadataShape[];
export type EvaluationMetadata = { sessionMetadata: SessionMetadataShape[] };
export interface StartBatchEvaluationRequest {
  batchEvaluationName: string;
  evaluators?: Evaluator[];
  insights?: Insight[];
  dataSourceConfig: DataSourceConfig;
  clientToken?: string;
  evaluationMetadata?: EvaluationMetadata;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
  description?: string;
}
export interface StartBatchEvaluationResponse {
  batchEvaluationId: string;
  batchEvaluationArn: string;
  batchEvaluationName: string;
  evaluators?: Evaluator[];
  insights?: Insight[];
  status: BatchEvaluationStatus;
  createdAt: Date;
  outputConfig?: OutputConfig;
  tags?: { [key: string]: string | undefined };
  kmsKeyArn?: string;
  description?: string;
}
export interface StartBrowserSessionRequest {
  traceId?: string;
  traceParent?: string;
  browserIdentifier: string;
  name?: string;
  sessionTimeoutSeconds?: number;
  viewPort?: ViewPort;
  extensions?: BrowserExtension[];
  profileConfiguration?: BrowserProfileConfiguration;
  proxyConfiguration?: ProxyConfiguration;
  enterprisePolicies?: BrowserEnterprisePolicy[];
  certificates?: Certificate[];
  filesystemConfigurations?: ToolsFileSystemConfiguration[];
  clientToken?: string;
}
export interface StartBrowserSessionResponse {
  browserIdentifier: string;
  sessionId: string;
  createdAt: Date;
  streams?: BrowserSessionStream;
}
export interface StartCodeInterpreterSessionRequest {
  traceId?: string;
  traceParent?: string;
  codeInterpreterIdentifier: string;
  name?: string;
  sessionTimeoutSeconds?: number;
  certificates?: Certificate[];
  filesystemConfigurations?: ToolsFileSystemConfiguration[];
  clientToken?: string;
}
export interface StartCodeInterpreterSessionResponse {
  codeInterpreterIdentifier: string;
  sessionId: string;
  createdAt: Date;
}
export interface ExtractionJob {
  jobId: string;
}
export interface StartMemoryExtractionJobInput {
  memoryId: string;
  extractionJob: ExtractionJob;
  clientToken?: string;
}
export interface StartMemoryExtractionJobOutput {
  jobId: string;
}
export interface StartRecommendationRequest {
  name: string;
  description?: string;
  type: RecommendationType;
  recommendationConfig: RecommendationConfig;
  kmsKeyArn?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface StartRecommendationResponse {
  recommendationId: string;
  recommendationArn: string;
  name: string;
  description?: string;
  type: RecommendationType;
  recommendationConfig: RecommendationConfig;
  status: RecommendationStatus;
  createdAt: Date;
  updatedAt: Date;
}
export interface StopBatchEvaluationRequest {
  batchEvaluationId: string;
}
export interface StopBatchEvaluationResponse {
  batchEvaluationId: string;
  batchEvaluationArn: string;
  status: BatchEvaluationStatus;
  description?: string;
}
export interface StopBrowserSessionRequest {
  traceId?: string;
  traceParent?: string;
  browserIdentifier: string;
  sessionId: string;
  clientToken?: string;
}
export interface StopBrowserSessionResponse {
  browserIdentifier: string;
  sessionId: string;
  lastUpdatedAt: Date;
}
export interface StopCodeInterpreterSessionRequest {
  traceId?: string;
  traceParent?: string;
  codeInterpreterIdentifier: string;
  sessionId: string;
  clientToken?: string;
}
export interface StopCodeInterpreterSessionResponse {
  codeInterpreterIdentifier: string;
  sessionId: string;
  lastUpdatedAt: Date;
}
export interface StopRuntimeSessionRequest {
  runtimeSessionId: string;
  agentRuntimeArn: string;
  qualifier?: string;
  clientToken?: string;
}
export interface StopRuntimeSessionResponse {
  runtimeSessionId?: string;
  statusCode?: number;
}
export interface UpdateABTestRequest {
  abTestId: string;
  clientToken?: string;
  name?: string;
  description?: string;
  variants?: Variant[];
  gatewayFilter?: GatewayFilter;
  evaluationConfig?: ABTestEvaluationConfig;
  roleArn?: string;
  executionStatus?: ABTestExecutionStatus;
}
export interface UpdateABTestResponse {
  abTestId: string;
  abTestArn: string;
  status: ABTestStatus;
  executionStatus: ABTestExecutionStatus;
  updatedAt: Date;
}
export interface AutomationStreamUpdate {
  streamStatus?: AutomationStreamStatus;
}
export type StreamUpdate = { automationStreamUpdate: AutomationStreamUpdate };
export interface UpdateBrowserStreamRequest {
  browserIdentifier: string;
  sessionId: string;
  streamUpdate: StreamUpdate;
  clientToken?: string;
}
export interface UpdateBrowserStreamResponse {
  browserIdentifier: string;
  sessionId: string;
  streams: BrowserSessionStream;
  updatedAt: Date;
}
export type BatchCreateMemoryRecordsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Creates multiple memory records in a single batch operation for the specified memory with custom content.
 */
export const batchCreateMemoryRecords: API.OperationMethod<
  BatchCreateMemoryRecordsInput,
  BatchCreateMemoryRecordsOutput,
  BatchCreateMemoryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memories/{memoryId}/memoryRecords/batchCreate",
    input: {
      memoryId: 0,
      records: D.list({
        requestIdentifier: 0,
        namespaces: 0,
        content: i_MemoryContent,
        timestamp: 0,
        memoryStrategyId: 0,
        metadata: D.map(i_MemoryRecordMetadataValue),
      }),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchCreateMemoryRecords",
})) as any;

export type BatchDeleteMemoryRecordsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Deletes multiple memory records in a single batch operation from the specified memory.
 */
export const batchDeleteMemoryRecords: API.OperationMethod<
  BatchDeleteMemoryRecordsInput,
  BatchDeleteMemoryRecordsOutput,
  BatchDeleteMemoryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memories/{memoryId}/memoryRecords/batchDelete",
    input: {
      memoryId: 0,
      records: D.list({ memoryRecordId: 0, namespace: 0 }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchDeleteMemoryRecords",
})) as any;

export type BatchUpdateMemoryRecordsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Updates multiple memory records with custom content in a single batch operation within the specified memory.
 */
export const batchUpdateMemoryRecords: API.OperationMethod<
  BatchUpdateMemoryRecordsInput,
  BatchUpdateMemoryRecordsOutput,
  BatchUpdateMemoryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memories/{memoryId}/memoryRecords/batchUpdate",
    input: {
      memoryId: 0,
      records: D.list({
        memoryRecordId: 0,
        timestamp: 0,
        content: i_MemoryContent,
        namespaces: 0,
        sourceNamespaces: 0,
        memoryStrategyId: 0,
        metadata: D.map(i_MemoryRecordMetadataValue),
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchUpdateMemoryRecords",
})) as any;

export type CompleteResourceTokenAuthError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Confirms the user authentication session for obtaining OAuth2.0 tokens for a resource.
 */
export const completeResourceTokenAuth: API.OperationMethod<
  CompleteResourceTokenAuthRequest,
  CompleteResourceTokenAuthResponse,
  CompleteResourceTokenAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/CompleteResourceTokenAuth",
    input: { userIdentifier: { userToken: 0, userId: 0 }, sessionUri: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CompleteResourceTokenAuth",
})) as any;

export type CreateABTestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Creates an A/B test for comparing agent configurations. A/B tests split traffic between a control variant and a treatment variant through a gateway, then evaluate performance using online evaluation configurations to determine which variant performs better.
 */
export const createABTest: API.OperationMethod<
  CreateABTestRequest,
  CreateABTestResponse,
  CreateABTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /ab-tests",
    input: {
      name: 0,
      description: 0,
      gatewayArn: 0,
      variants: D.list(i_Variant),
      gatewayFilter: i_GatewayFilter,
      evaluationConfig: i_ABTestEvaluationConfig,
      roleArn: 0,
      enableOnCreate: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { createdAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateABTest",
})) as any;

export type CreateEventError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | RetryableConflictException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Creates an event in an AgentCore Memory resource. Events represent interactions or activities that occur within a session and are associated with specific actors.
 *
 * To use this operation, you must have the `bedrock-agentcore:CreateEvent` permission.
 *
 * This operation is subject to request rate limiting.
 */
export const createEvent: API.OperationMethod<
  CreateEventInput,
  CreateEventOutput,
  CreateEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memories/{memoryId}/events",
    input: {
      memoryId: 0,
      actorId: 0,
      sessionId: 0,
      eventTimestamp: 0,
      payload: D.list({
        conversational: i_Conversational,
        blob: 0,
        json: i_MemoryJsonData,
      }),
      branch: { rootEventId: 0, name: 0 },
      clientToken: D.m({ idempotency: true }),
      metadata: D.map(i_MetadataValue),
      extractionMode: 0,
      extractionConfig: i_ExtractionConfig,
    },
    output: { event: o_Event },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    RetryableConflictException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEvent",
})) as any;

export type CreatePaymentInstrumentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | SubscriptionRequiredException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new payment instrument for a connector.
 */
export const createPaymentInstrument: API.OperationMethod<
  CreatePaymentInstrumentRequest,
  CreatePaymentInstrumentResponse,
  CreatePaymentInstrumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /payments/createPaymentInstrument",
    input: {
      userId: D.m({ header: "X-Amzn-Bedrock-AgentCore-Payments-User-Id" }),
      agentName: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Payments-Agent-Name",
      }),
      paymentManagerArn: 0,
      paymentConnectorId: 0,
      paymentInstrumentType: 0,
      paymentInstrumentDetails: {
        embeddedCryptoWallet: {
          network: 0,
          linkedAccounts: D.list({
            email: { emailAddress: 0 },
            sms: { phoneNumber: 0 },
            developerJwt: { kid: 0, sub: 0 },
            oAuth2: {
              google: i_OAuth2Authentication,
              apple: i_OAuth2Authentication,
              x: i_OAuth2Authentication,
              telegram: i_OAuth2Authentication,
              github: i_OAuth2Authentication,
            },
          }),
          walletAddress: 0,
          redirectUrl: 0,
        },
      },
      clientToken: D.m({ idempotency: true }),
    },
    output: { paymentInstrument: o_PaymentInstrument },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    SubscriptionRequiredException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePaymentInstrument",
})) as any;

export type CreatePaymentSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | SubscriptionRequiredException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a new payment session.
 */
export const createPaymentSession: API.OperationMethod<
  CreatePaymentSessionRequest,
  CreatePaymentSessionResponse,
  CreatePaymentSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /payments/createPaymentSession",
    input: {
      userId: D.m({ header: "X-Amzn-Bedrock-AgentCore-Payments-User-Id" }),
      agentName: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Payments-Agent-Name",
      }),
      paymentManagerArn: 0,
      limits: { maxSpendAmount: { value: 0, currency: 0 } },
      expiryTimeInMinutes: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { paymentSession: o_PaymentSession },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    SubscriptionRequiredException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreatePaymentSession",
})) as any;

export type DeleteABTestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an A/B test and its associated gateway rules.
 */
export const deleteABTest: API.OperationMethod<
  DeleteABTestRequest,
  DeleteABTestResponse,
  DeleteABTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /ab-tests/{abTestId}",
    input: { abTestId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteABTest",
})) as any;

export type DeleteBatchEvaluationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a batch evaluation and its associated results.
 */
export const deleteBatchEvaluation: API.OperationMethod<
  DeleteBatchEvaluationRequest,
  DeleteBatchEvaluationResponse,
  DeleteBatchEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /evaluations/batch-evaluate/{batchEvaluationId}",
    input: { batchEvaluationId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteBatchEvaluation",
})) as any;

export type DeleteCapacityProviderSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a session associated with a capacity provider in Amazon Bedrock AgentCore and makes the session unavailable for further use. To delete a capacity provider session, specify both the capacity provider identifier and the session ID. After you delete a session, you cannot restart it.
 */
export const deleteCapacityProviderSession: API.OperationMethod<
  DeleteCapacityProviderSessionRequest,
  DeleteCapacityProviderSessionResponse,
  DeleteCapacityProviderSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /capacity-providers/{capacityProviderId}/sessions/{sessionId}",
    input: { capacityProviderId: 0, sessionId: 0 },
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
  operationName: "DeleteCapacityProviderSession",
})) as any;

export type DeleteEventError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an event from an AgentCore Memory resource. When you delete an event, it is permanently removed.
 *
 * To use this operation, you must have the `bedrock-agentcore:DeleteEvent` permission.
 */
export const deleteEvent: API.OperationMethod<
  DeleteEventInput,
  DeleteEventOutput,
  DeleteEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /memories/{memoryId}/actor/{actorId}/sessions/{sessionId}/events/{eventId}",
    input: { memoryId: 0, sessionId: 0, eventId: 0, actorId: 0 },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEvent",
})) as any;

export type DeleteMemoryRecordError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a memory record from an AgentCore Memory resource. When you delete a memory record, it is permanently removed.
 *
 * To use this operation, you must have the `bedrock-agentcore:DeleteMemoryRecord` permission.
 */
export const deleteMemoryRecord: API.OperationMethod<
  DeleteMemoryRecordInput,
  DeleteMemoryRecordOutput,
  DeleteMemoryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /memories/{memoryId}/memoryRecords/{memoryRecordId}",
    input: {
      memoryId: 0,
      memoryRecordId: 0,
      namespace: D.m({ query: "namespace" }),
    },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMemoryRecord",
})) as any;

export type DeletePaymentInstrumentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a payment instrument. This is a soft delete operation that preserves the record for audit and compliance purposes.
 */
export const deletePaymentInstrument: API.OperationMethod<
  DeletePaymentInstrumentRequest,
  DeletePaymentInstrumentResponse,
  DeletePaymentInstrumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /payments/deletePaymentInstrument",
    input: {
      userId: D.m({ header: "X-Amzn-Bedrock-AgentCore-Payments-User-Id" }),
      paymentManagerArn: 0,
      paymentConnectorId: 0,
      paymentInstrumentId: 0,
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
  operationName: "DeletePaymentInstrument",
})) as any;

export type DeletePaymentSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a payment session. This permanently removes the payment session record.
 */
export const deletePaymentSession: API.OperationMethod<
  DeletePaymentSessionRequest,
  DeletePaymentSessionResponse,
  DeletePaymentSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /payments/deletePaymentSession",
    input: {
      userId: D.m({ header: "X-Amzn-Bedrock-AgentCore-Payments-User-Id" }),
      paymentManagerArn: 0,
      paymentSessionId: 0,
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
  operationName: "DeletePaymentSession",
})) as any;

export type DeleteRecommendationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a recommendation and its associated results.
 */
export const deleteRecommendation: API.OperationMethod<
  DeleteRecommendationRequest,
  DeleteRecommendationResponse,
  DeleteRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /recommendations/{recommendationId}",
    input: { recommendationId: 0 },
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
  operationName: "DeleteRecommendation",
})) as any;

export type EvaluateError =
  | AccessDeniedException
  | ConflictException
  | DuplicateIdException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Performs on-demand evaluation of agent traces using a specified evaluator. This synchronous API accepts traces in OpenTelemetry format and returns immediate scoring results with detailed explanations.
 */
export const evaluate: API.OperationMethod<
  EvaluateRequest,
  EvaluateResponse,
  EvaluateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /evaluations/evaluate/{evaluatorId}",
    input: {
      evaluatorId: 0,
      evaluationInput: { sessionSpans: 0 },
      evaluationTarget: { spanIds: 0, traceIds: 0 },
      evaluationReferenceInputs: D.list({
        context: { spanContext: { sessionId: 0, traceId: 0, spanId: 0 } },
        expectedResponse: i_EvaluationContent,
        assertions: D.list(i_EvaluationContent),
        expectedTrajectory: i_EvaluationExpectedTrajectory,
      }),
    },
    output: { evaluationResults: D.list({ explanation: D.secret }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    DuplicateIdException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Evaluate",
})) as any;

export type GetABTestError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about an A/B test, including its configuration, status, and statistical results.
 */
export const getABTest: API.OperationMethod<
  GetABTestRequest,
  GetABTestResponse,
  GetABTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /ab-tests/{abTestId}",
    input: { abTestId: 0 },
    output: {
      startedAt: D.ts,
      stoppedAt: D.ts,
      maxDurationExpiresAt: D.ts,
      createdAt: D.ts,
      updatedAt: D.ts,
      results: { analysisTimestamp: D.ts },
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetABTest",
})) as any;

export type GetAgentCardError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | RetryableConflictException
  | RuntimeClientError
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the A2A agent card associated with an AgentCore Runtime agent.
 */
export const getAgentCard: API.OperationMethod<
  GetAgentCardRequest,
  GetAgentCardResponse,
  GetAgentCardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /runtimes/{agentRuntimeArn}/invocations/.well-known/agent-card.json",
    input: {
      runtimeSessionId: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Runtime-Session-Id",
        idempotency: true,
      }),
      agentRuntimeArn: 0,
      qualifier: D.m({ query: "qualifier" }),
    },
    output: {
      runtimeSessionId: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Runtime-Session-Id",
      }),
      agentCard: D.m({ payload: true }),
      statusCode: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    RetryableConflictException,
    RuntimeClientError,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAgentCard",
})) as any;

export type GetBatchEvaluationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a batch evaluation, including its status, configuration, results, and any error details.
 */
export const getBatchEvaluation: API.OperationMethod<
  GetBatchEvaluationRequest,
  GetBatchEvaluationResponse,
  GetBatchEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /evaluations/batch-evaluate/{batchEvaluationId}",
    input: { batchEvaluationId: 0 },
    output: {
      createdAt: D.ts,
      dataSourceConfig: {
        cloudWatchLogs: { filterConfig: { timeRange: o_SessionFilterConfig } },
        onlineEvaluationConfigSource: { timeRange: o_SessionFilterConfig },
      },
      updatedAt: D.ts,
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetBatchEvaluation",
})) as any;

export type GetBrowserSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific browser session in Amazon Bedrock AgentCore. This operation returns the session's configuration, current status, associated streams, and metadata.
 *
 * To get a browser session, you must specify both the browser identifier and the session ID. The response includes information about the session's viewport configuration, timeout settings, and stream endpoints.
 *
 * The following operations are related to `GetBrowserSession`:
 *
 * - StartBrowserSession
 *
 * - ListBrowserSessions
 *
 * - StopBrowserSession
 */
export const getBrowserSession: API.OperationMethod<
  GetBrowserSessionRequest,
  GetBrowserSessionResponse,
  GetBrowserSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /browsers/{browserIdentifier}/sessions/get",
    input: { browserIdentifier: 0, sessionId: D.m({ query: "sessionId" }) },
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
  operationName: "GetBrowserSession",
})) as any;

export type GetCodeInterpreterSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a specific code interpreter session in Amazon Bedrock AgentCore. This operation returns the session's configuration, current status, and metadata.
 *
 * To get a code interpreter session, you must specify both the code interpreter identifier and the session ID. The response includes information about the session's timeout settings and current status.
 *
 * The following operations are related to `GetCodeInterpreterSession`:
 *
 * - StartCodeInterpreterSession
 *
 * - ListCodeInterpreterSessions
 *
 * - StopCodeInterpreterSession
 */
export const getCodeInterpreterSession: API.OperationMethod<
  GetCodeInterpreterSessionRequest,
  GetCodeInterpreterSessionResponse,
  GetCodeInterpreterSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /code-interpreters/{codeInterpreterIdentifier}/sessions/get",
    input: {
      codeInterpreterIdentifier: 0,
      sessionId: D.m({ query: "sessionId" }),
    },
    output: { createdAt: D.ts },
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
  operationName: "GetCodeInterpreterSession",
})) as any;

export type GetEventError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about a specific event in an AgentCore Memory resource.
 *
 * To use this operation, you must have the `bedrock-agentcore:GetEvent` permission.
 */
export const getEvent: API.OperationMethod<
  GetEventInput,
  GetEventOutput,
  GetEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memories/{memoryId}/actor/{actorId}/sessions/{sessionId}/events/{eventId}",
    input: { memoryId: 0, sessionId: 0, actorId: 0, eventId: 0 },
    output: { event: o_Event },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvent",
})) as any;

export type GetMemoryRecordError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a specific memory record from an AgentCore Memory resource.
 *
 * To use this operation, you must have the `bedrock-agentcore:GetMemoryRecord` permission.
 */
export const getMemoryRecord: API.OperationMethod<
  GetMemoryRecordInput,
  GetMemoryRecordOutput,
  GetMemoryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /memories/{memoryId}/memoryRecord/{memoryRecordId}",
    input: {
      memoryId: 0,
      memoryRecordId: 0,
      namespace: D.m({ query: "namespace" }),
    },
    output: {
      memoryRecord: {
        content: o_MemoryContent,
        createdAt: D.ts,
        metadata: D.map(o_MemoryRecordMetadataValue),
      },
    },
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMemoryRecord",
})) as any;

export type GetPaymentInstrumentError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a payment instrument by ID.
 */
export const getPaymentInstrument: API.OperationMethod<
  GetPaymentInstrumentRequest,
  GetPaymentInstrumentResponse,
  GetPaymentInstrumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /payments/getPaymentInstrument",
    input: {
      userId: D.m({ header: "X-Amzn-Bedrock-AgentCore-Payments-User-Id" }),
      agentName: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Payments-Agent-Name",
      }),
      paymentManagerArn: 0,
      paymentConnectorId: 0,
      paymentInstrumentId: 0,
    },
    output: { paymentInstrument: o_PaymentInstrument },
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
  operationName: "GetPaymentInstrument",
})) as any;

export type GetPaymentInstrumentBalanceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get the balance of a payment instrument.
 */
export const getPaymentInstrumentBalance: API.OperationMethod<
  GetPaymentInstrumentBalanceRequest,
  GetPaymentInstrumentBalanceResponse,
  GetPaymentInstrumentBalanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /payments/getPaymentInstrumentBalance",
    input: {
      userId: D.m({ header: "X-Amzn-Bedrock-AgentCore-Payments-User-Id" }),
      agentName: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Payments-Agent-Name",
      }),
      paymentManagerArn: 0,
      paymentConnectorId: 0,
      paymentInstrumentId: 0,
      chain: 0,
      token: 0,
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
  operationName: "GetPaymentInstrumentBalance",
})) as any;

export type GetPaymentSessionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Get a payment session.
 */
export const getPaymentSession: API.OperationMethod<
  GetPaymentSessionRequest,
  GetPaymentSessionResponse,
  GetPaymentSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /payments/getPaymentSession",
    input: {
      userId: D.m({ header: "X-Amzn-Bedrock-AgentCore-Payments-User-Id" }),
      agentName: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Payments-Agent-Name",
      }),
      paymentManagerArn: 0,
      paymentSessionId: 0,
    },
    output: { paymentSession: o_PaymentSession },
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
  operationName: "GetPaymentSession",
})) as any;

export type GetRecommendationError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves detailed information about a recommendation, including its configuration, status, and results.
 */
export const getRecommendation: API.OperationMethod<
  GetRecommendationRequest,
  GetRecommendationResponse,
  GetRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /recommendations/{recommendationId}",
    input: { recommendationId: 0 },
    output: {
      recommendationConfig: o_RecommendationConfig,
      createdAt: D.ts,
      updatedAt: D.ts,
      recommendationResult: {
        systemPromptRecommendationResult: { recommendedSystemPrompt: D.secret },
        toolDescriptionRecommendationResult: {
          tools: D.list({ recommendedToolDescription: D.secret }),
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
  operationName: "GetRecommendation",
})) as any;

export type GetResourceApiKeyError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the API key associated with an API key credential provider.
 */
export const getResourceApiKey: API.OperationMethod<
  GetResourceApiKeyRequest,
  GetResourceApiKeyResponse,
  GetResourceApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/api-key",
    input: { workloadIdentityToken: 0, resourceCredentialProviderName: 0 },
    output: { apiKey: D.secret },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceApiKey",
})) as any;

export type GetResourceOauth2TokenError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Returns the OAuth 2.0 token of the provided resource.
 */
export const getResourceOauth2Token: API.OperationMethod<
  GetResourceOauth2TokenRequest,
  GetResourceOauth2TokenResponse,
  GetResourceOauth2TokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/oauth2/token",
    input: {
      workloadIdentityToken: 0,
      resourceCredentialProviderName: 0,
      scopes: 0,
      oauth2Flow: 0,
      sessionUri: 0,
      resourceOauth2ReturnUrl: 0,
      forceAuthentication: 0,
      customParameters: 0,
      customState: 0,
      resources: 0,
      audiences: 0,
    },
    output: { authorizationUrl: D.secret, accessToken: D.secret },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourceOauth2Token",
})) as any;

export type GetResourcePaymentTokenError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Generates authentication tokens for payment providers that use vendor-specific authentication mechanisms.
 */
export const getResourcePaymentToken: API.OperationMethod<
  GetResourcePaymentTokenRequest,
  GetResourcePaymentTokenResponse,
  GetResourcePaymentTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/payment/token",
    input: {
      workloadIdentityToken: 0,
      resourceCredentialProviderName: 0,
      paymentTokenRequest: {
        coinbaseCdpTokenRequest: {
          requestMethod: 0,
          requestHost: 0,
          requestPath: 0,
          includeWalletAuthToken: 0,
          requestBody: 0,
        },
        stripePrivyTokenRequest: {
          requestHost: 0,
          requestPath: 0,
          requestBody: 0,
          includeAuthorizationSignature: 0,
        },
      },
    },
    output: {
      paymentTokenResponse: {
        coinbaseCdpTokenResponse: {
          bearerToken: D.secret,
          walletAuthToken: D.secret,
        },
        stripePrivyTokenResponse: {
          authorizationSignature: D.secret,
          basicAuthToken: D.secret,
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
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetResourcePaymentToken",
})) as any;

export type GetWorkloadAccessTokenError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Obtains a workload access token for agentic workloads not acting on behalf of a user.
 */
export const getWorkloadAccessToken: API.OperationMethod<
  GetWorkloadAccessTokenRequest,
  GetWorkloadAccessTokenResponse,
  GetWorkloadAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/GetWorkloadAccessToken",
    input: { workloadName: 0 },
    output: { workloadAccessToken: D.secret },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkloadAccessToken",
})) as any;

export type GetWorkloadAccessTokenForJWTError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Obtains a workload access token for agentic workloads acting on behalf of a user, using a JWT token.
 */
export const getWorkloadAccessTokenForJWT: API.OperationMethod<
  GetWorkloadAccessTokenForJWTRequest,
  GetWorkloadAccessTokenForJWTResponse,
  GetWorkloadAccessTokenForJWTError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/GetWorkloadAccessTokenForJWT",
    input: { workloadName: 0, userToken: 0 },
    output: { workloadAccessToken: D.secret },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkloadAccessTokenForJWT",
})) as any;

export type GetWorkloadAccessTokenForUserIdError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Obtains a workload access token for agentic workloads acting on behalf of a user, using the user's ID.
 */
export const getWorkloadAccessTokenForUserId: API.OperationMethod<
  GetWorkloadAccessTokenForUserIdRequest,
  GetWorkloadAccessTokenForUserIdResponse,
  GetWorkloadAccessTokenForUserIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /identities/GetWorkloadAccessTokenForUserId",
    input: { workloadName: 0, userId: 0 },
    output: { workloadAccessToken: D.secret },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetWorkloadAccessTokenForUserId",
})) as any;

export type IngestDataError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Submits content directly for ingestion to generate long-term memory records in a AgentCore Memory resource.
 *
 * To use this operation, you must have the `bedrock-agentcore:IngestData` permission.
 */
export const ingestData: API.OperationMethod<
  IngestDataInput,
  IngestDataOutput,
  IngestDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memories/{memoryId}/ingest",
    input: {
      memoryId: 0,
      source: {
        inline: {
          payload: D.list({
            conversational: i_Conversational,
            json: i_MemoryJsonData,
          }),
        },
      },
      contentTimestamp: 0,
      actorId: 0,
      sessionId: 0,
      extractionConfig: i_ExtractionConfig,
      metadata: D.map(i_MetadataValue),
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "IngestData",
})) as any;

export type InvokeAgentRuntimeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | RetryableConflictException
  | RuntimeClientError
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a request to an agent or tool hosted in an Amazon Bedrock AgentCore Runtime and receives responses in real-time.
 *
 * To invoke an agent, you can specify either the AgentCore Runtime ARN or the agent ID with an account ID, and provide a payload containing your request. When you use the agent ID instead of the full ARN, you don't need to URL-encode the identifier. You can optionally specify a qualifier to target a specific endpoint of the agent.
 *
 * This operation supports streaming responses, allowing you to receive partial responses as they become available. We recommend using pagination to ensure that the operation returns quickly and successfully when processing large responses.
 *
 * For example code, see Invoke an AgentCore Runtime agent.
 *
 * If you're integrating your agent with OAuth, you can't use the Amazon Web Services SDK to call `InvokeAgentRuntime`. Instead, make a HTTPS request to `InvokeAgentRuntime`. For an example, see Authenticate and authorize with Inbound Auth and Outbound Auth.
 *
 * To use this operation, you must have the `bedrock-agentcore:InvokeAgentRuntime` permission. If you are making a call to `InvokeAgentRuntime` on behalf of a user ID with the `X-Amzn-Bedrock-AgentCore-Runtime-User-Id` header, You require permissions to both actions (`bedrock-agentcore:InvokeAgentRuntime` and `bedrock-agentcore:InvokeAgentRuntimeForUser`).
 */
export const invokeAgentRuntime: API.OperationMethod<
  InvokeAgentRuntimeRequest,
  InvokeAgentRuntimeResponse,
  InvokeAgentRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /runtimes/{agentRuntimeArn}/invocations",
    input: {
      contentType: D.m({ header: "Content-Type" }),
      accept: D.m({ header: "Accept" }),
      mcpSessionId: D.m({ header: "Mcp-Session-Id" }),
      runtimeSessionId: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Runtime-Session-Id",
        idempotency: true,
      }),
      mcpProtocolVersion: D.m({ header: "Mcp-Protocol-Version" }),
      mcpMethod: D.m({ header: "Mcp-Method" }),
      mcpName: D.m({ header: "Mcp-Name" }),
      runtimeUserId: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Runtime-User-Id",
      }),
      traceId: D.m({ header: "X-Amzn-Trace-Id" }),
      traceParent: D.m({ header: "traceparent" }),
      traceState: D.m({ header: "tracestate" }),
      baggage: D.m({ header: "baggage" }),
      agentRuntimeArn: 0,
      qualifier: D.m({ query: "qualifier" }),
      accountId: D.m({ query: "accountId" }),
      payload: D.m({ payload: true, shape: D.stream }),
    },
    output: {
      runtimeSessionId: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Runtime-Session-Id",
      }),
      mcpSessionId: D.m({ header: "Mcp-Session-Id" }),
      mcpProtocolVersion: D.m({ header: "Mcp-Protocol-Version" }),
      traceId: D.m({ header: "X-Amzn-Trace-Id" }),
      traceParent: D.m({ header: "traceparent" }),
      traceState: D.m({ header: "tracestate" }),
      baggage: D.m({ header: "baggage" }),
      contentType: D.m({ header: "Content-Type" }),
      response: D.m({ payload: true, shape: D.stream }),
      statusCode: D.m({ status: true }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    RetryableConflictException,
    RuntimeClientError,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeAgentRuntime",
})) as any;

export type InvokeAgentRuntimeCommandError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | RetryableConflictException
  | RuntimeClientError
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Executes a command in a runtime session container and streams the output back to the caller. This operation allows you to run shell commands within the agent runtime environment and receive real-time streaming responses including standard output and standard error.
 *
 * To invoke a command, you must specify the agent runtime ARN and a runtime session ID. The command execution supports streaming responses, allowing you to receive output as it becomes available through `contentStart`, `contentDelta`, and `contentStop` events.
 *
 * To use this operation, you must have the `bedrock-agentcore:InvokeAgentRuntimeCommand` permission.
 */
export const invokeAgentRuntimeCommand: API.OperationMethod<
  InvokeAgentRuntimeCommandRequest,
  InvokeAgentRuntimeCommandResponse,
  InvokeAgentRuntimeCommandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /runtimes/{agentRuntimeArn}/commands",
    input: {
      contentType: D.m({ header: "Content-Type" }),
      accept: D.m({ header: "Accept" }),
      runtimeSessionId: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Runtime-Session-Id",
        idempotency: true,
      }),
      traceId: D.m({ header: "X-Amzn-Trace-Id" }),
      traceParent: D.m({ header: "traceparent" }),
      traceState: D.m({ header: "tracestate" }),
      baggage: D.m({ header: "baggage" }),
      agentRuntimeArn: 0,
      qualifier: D.m({ query: "qualifier" }),
      accountId: D.m({ query: "accountId" }),
      body: D.m({ payload: true, shape: { command: 0, timeout: 0 } }),
    },
    output: {
      runtimeSessionId: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Runtime-Session-Id",
      }),
      traceId: D.m({ header: "X-Amzn-Trace-Id" }),
      traceParent: D.m({ header: "traceparent" }),
      traceState: D.m({ header: "tracestate" }),
      baggage: D.m({ header: "baggage" }),
      contentType: D.m({ header: "Content-Type" }),
      statusCode: D.m({ status: true }),
      stream: D.m({
        payload: true,
        shape: D.events({
          chunk: 0,
          accessDeniedException: 0,
          internalServerException: 0,
          resourceNotFoundException: 0,
          serviceQuotaExceededException: 0,
          throttlingException: 0,
          validationException: 0,
          runtimeClientError: 0,
        }),
      }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    RetryableConflictException,
    RuntimeClientError,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeAgentRuntimeCommand",
})) as any;

export type InvokeBrowserError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Invokes an operating system-level action on a browser session in Amazon Bedrock AgentCore. This operation provides direct OS-level control over browser sessions, enabling mouse actions, keyboard input, and screenshots that the WebSocket-based Chrome DevTools Protocol (CDP) cannot handle — such as interacting with print dialogs, context menus, and JavaScript alerts.
 *
 * You send a request with exactly one action in the `BrowserAction` union, and receive a corresponding result in the `BrowserActionResult` union.
 *
 * The following operations are related to `InvokeBrowser`:
 *
 * - StartBrowserSession
 *
 * - GetBrowserSession
 *
 * - StopBrowserSession
 */
export const invokeBrowser: API.OperationMethod<
  InvokeBrowserRequest,
  InvokeBrowserResponse,
  InvokeBrowserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /browsers/{browserIdentifier}/sessions/invoke",
    input: {
      browserIdentifier: 0,
      sessionId: D.m({ header: "x-amzn-browser-session-id" }),
      action: {
        mouseClick: { x: 0, y: 0, button: 0, clickCount: 0 },
        mouseMove: { x: 0, y: 0 },
        mouseDrag: { endX: 0, endY: 0, startX: 0, startY: 0, button: 0 },
        mouseScroll: { x: 0, y: 0, deltaX: 0, deltaY: 0 },
        keyType: { text: 0 },
        keyPress: { key: 0, presses: 0 },
        keyShortcut: { keys: 0 },
        screenshot: { format: 0 },
      },
    },
    output: {
      result: { screenshot: { data: D.blob } },
      sessionId: D.m({ header: "x-amzn-browser-session-id" }),
    },
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
  operationName: "InvokeBrowser",
})) as any;

export type InvokeCodeInterpreterError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Executes code within an active code interpreter session in Amazon Bedrock AgentCore. This operation processes the provided code, runs it in a secure environment, and returns the execution results including output, errors, and generated visualizations.
 *
 * To execute code, you must specify the code interpreter identifier, session ID, and the code to run in the arguments parameter. The operation returns a stream containing the execution results, which can include text output, error messages, and data visualizations.
 *
 * This operation is subject to request rate limiting based on your account's service quotas.
 *
 * The following operations are related to `InvokeCodeInterpreter`:
 *
 * - StartCodeInterpreterSession
 *
 * - GetCodeInterpreterSession
 */
export const invokeCodeInterpreter: API.OperationMethod<
  InvokeCodeInterpreterRequest,
  InvokeCodeInterpreterResponse,
  InvokeCodeInterpreterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /code-interpreters/{codeInterpreterIdentifier}/tools/invoke",
    input: {
      codeInterpreterIdentifier: 0,
      sessionId: D.m({ header: "x-amzn-code-interpreter-session-id" }),
      traceId: D.m({ header: "X-Amzn-Trace-Id" }),
      traceParent: D.m({ header: "traceparent" }),
      name: 0,
      arguments: {
        code: 0,
        language: 0,
        clearContext: 0,
        command: 0,
        path: 0,
        paths: 0,
        content: D.list({ path: 0, text: 0, blob: 0 }),
        directoryPath: 0,
        taskId: 0,
        runtime: 0,
      },
    },
    output: {
      sessionId: D.m({ header: "x-amzn-code-interpreter-session-id" }),
      stream: D.m({
        payload: true,
        shape: D.events({
          result: {
            content: D.list({ data: D.blob, resource: { blob: D.blob } }),
          },
          accessDeniedException: 0,
          conflictException: 0,
          internalServerException: 0,
          resourceNotFoundException: 0,
          serviceQuotaExceededException: 0,
          throttlingException: 0,
          validationException: 0,
        }),
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeCodeInterpreter",
})) as any;

export type InvokeHarnessError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | RuntimeClientError
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Operation to invoke a Harness.
 */
export const invokeHarness: API.OperationMethod<
  InvokeHarnessRequest,
  InvokeHarnessResponse,
  InvokeHarnessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /harnesses/invoke",
    input: {
      harnessArn: D.m({ query: "harnessArn" }),
      qualifier: D.m({ query: "qualifier" }),
      runtimeSessionId: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Runtime-Session-Id",
      }),
      runtimeUserId: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Runtime-User-Id",
      }),
      traceParent: D.m({ header: "traceparent" }),
      traceState: D.m({ header: "tracestate" }),
      traceId: D.m({ header: "X-Amzn-Trace-Id" }),
      baggage: D.m({ header: "baggage" }),
      messages: D.list({
        role: 0,
        content: D.list({
          text: 0,
          toolUse: { name: 0, toolUseId: 0, input: 0, type: 0, serverName: 0 },
          toolResult: {
            toolUseId: 0,
            content: D.list({ text: 0, json: 0 }),
            status: 0,
            type: 0,
          },
          reasoningContent: {
            reasoningText: { text: 0, signature: 0 },
            redactedContent: 0,
          },
        }),
      }),
      model: {
        bedrockModelConfig: {
          modelId: 0,
          maxTokens: 0,
          temperature: 0,
          topP: 0,
          apiFormat: 0,
          additionalParams: 0,
        },
        openAiModelConfig: {
          modelId: 0,
          apiKeyArn: 0,
          maxTokens: 0,
          temperature: 0,
          topP: 0,
          apiFormat: 0,
          additionalParams: 0,
        },
        geminiModelConfig: {
          modelId: 0,
          apiKeyArn: 0,
          maxTokens: 0,
          temperature: 0,
          topP: 0,
          topK: 0,
          additionalParams: 0,
        },
        liteLlmModelConfig: {
          modelId: 0,
          apiKeyArn: 0,
          apiBase: 0,
          maxTokens: 0,
          temperature: 0,
          topP: 0,
          additionalParams: 0,
        },
      },
      systemPrompt: D.list({ text: 0 }),
      tools: D.list({
        type: 0,
        name: 0,
        config: {
          remoteMcp: { url: 0, headers: 0 },
          agentCoreBrowser: { browserArn: 0 },
          agentCoreGateway: {
            gatewayArn: 0,
            outboundAuth: {
              awsIam: i_Unit,
              none: i_Unit,
              oauth: {
                providerArn: 0,
                scopes: 0,
                customParameters: 0,
                grantType: 0,
                defaultReturnUrl: 0,
              },
            },
          },
          inlineFunction: { description: 0, inputSchema: 0 },
          agentCoreCodeInterpreter: { codeInterpreterArn: 0 },
        },
      }),
      skills: D.list({
        path: 0,
        s3: { uri: 0 },
        git: { url: 0, path: 0, auth: { credentialArn: 0, username: 0 } },
        awsSkills: { paths: 0 },
      }),
      allowedTools: 0,
      maxIterations: 0,
      maxTokens: 0,
      timeoutSeconds: 0,
      actorId: 0,
    },
    output: {
      stream: D.m({
        payload: true,
        shape: D.events({
          messageStart: 0,
          contentBlockStart: 0,
          contentBlockDelta: {
            delta: {
              text: D.secret,
              toolUse: { input: D.secret },
              toolResult: D.list({ text: D.secret }),
              reasoningContent: { redactedContent: D.secretBlob },
              toolResultMetadata: { metadata: D.secret },
            },
          },
          contentBlockStop: 0,
          messageStop: 0,
          metadata: 0,
          internalServerException: 0,
          validationException: 0,
          runtimeClientError: 0,
        }),
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    RuntimeClientError,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "InvokeHarness",
})) as any;

export type ListABTestsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all A/B tests in the account.
 */
export const listABTests: API.PaginatedOperationMethod<
  ListABTestsRequest,
  ListABTestsResponse,
  ListABTestsError,
  Credentials | HttpClient.HttpClient,
  ABTestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /ab-tests",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { abTests: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListABTests",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "abTests",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListActorsError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Lists all actors in an AgentCore Memory resource. We recommend using pagination to ensure that the operation returns quickly and successfully.
 *
 * To use this operation, you must have the `bedrock-agentcore:ListActors` permission.
 */
export const listActors: API.PaginatedOperationMethod<
  ListActorsInput,
  ListActorsOutput,
  ListActorsError,
  Credentials | HttpClient.HttpClient,
  ActorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /memories/{memoryId}/actors",
    input: { memoryId: 0, maxResults: 0, nextToken: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListActors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "actorSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBatchEvaluationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Lists all batch evaluations in the account, providing summary information about each evaluation's status and configuration.
 */
export const listBatchEvaluations: API.PaginatedOperationMethod<
  ListBatchEvaluationsRequest,
  ListBatchEvaluationsResponse,
  ListBatchEvaluationsError,
  Credentials | HttpClient.HttpClient,
  BatchEvaluationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /evaluations/batch-evaluate",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
    output: { batchEvaluations: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListBatchEvaluations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "batchEvaluations",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListBrowserSessionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of browser sessions in Amazon Bedrock AgentCore that match the specified criteria. This operation returns summary information about each session, including identifiers, status, and timestamps.
 *
 * You can filter the results by browser identifier and session status. The operation supports pagination to handle large result sets efficiently.
 *
 * We recommend using pagination to ensure that the operation returns quickly and successfully when retrieving large numbers of sessions.
 *
 * The following operations are related to `ListBrowserSessions`:
 *
 * - StartBrowserSession
 *
 * - GetBrowserSession
 */
export const listBrowserSessions: API.OperationMethod<
  ListBrowserSessionsRequest,
  ListBrowserSessionsResponse,
  ListBrowserSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /browsers/{browserIdentifier}/sessions/list",
    input: { browserIdentifier: 0, maxResults: 0, nextToken: 0, status: 0 },
    output: { items: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
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
  operationName: "ListBrowserSessions",
})) as any;

export type ListCodeInterpreterSessionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves a list of code interpreter sessions in Amazon Bedrock AgentCore that match the specified criteria. This operation returns summary information about each session, including identifiers, status, and timestamps.
 *
 * You can filter the results by code interpreter identifier and session status. The operation supports pagination to handle large result sets efficiently.
 *
 * We recommend using pagination to ensure that the operation returns quickly and successfully when retrieving large numbers of sessions.
 *
 * The following operations are related to `ListCodeInterpreterSessions`:
 *
 * - StartCodeInterpreterSession
 *
 * - GetCodeInterpreterSession
 */
export const listCodeInterpreterSessions: API.OperationMethod<
  ListCodeInterpreterSessionsRequest,
  ListCodeInterpreterSessionsResponse,
  ListCodeInterpreterSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /code-interpreters/{codeInterpreterIdentifier}/sessions/list",
    input: {
      codeInterpreterIdentifier: 0,
      maxResults: 0,
      nextToken: 0,
      status: 0,
    },
    output: { items: D.list({ createdAt: D.ts, lastUpdatedAt: D.ts }) },
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
  operationName: "ListCodeInterpreterSessions",
})) as any;

export type ListEventsError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Lists events in an AgentCore Memory resource based on specified criteria. We recommend using pagination to ensure that the operation returns quickly and successfully.
 *
 * To use this operation, you must have the `bedrock-agentcore:ListEvents` permission.
 */
export const listEvents: API.PaginatedOperationMethod<
  ListEventsInput,
  ListEventsOutput,
  ListEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /memories/{memoryId}/actor/{actorId}/sessions/{sessionId}",
    input: {
      memoryId: 0,
      sessionId: 0,
      actorId: 0,
      includePayloads: 0,
      filter: {
        branch: { name: 0, includeParentBranches: 0 },
        eventMetadata: D.list({
          left: { metadataKey: 0 },
          operator: 0,
          right: { metadataValue: i_MetadataValue },
        }),
      },
      maxResults: 0,
      nextToken: 0,
    },
    output: { events: D.list(o_Event) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMemoryExtractionJobsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Lists all long-term memory extraction jobs that are eligible to be started with optional filtering.
 *
 * To use this operation, you must have the `bedrock-agentcore:ListMemoryExtractionJobs` permission.
 */
export const listMemoryExtractionJobs: API.PaginatedOperationMethod<
  ListMemoryExtractionJobsInput,
  ListMemoryExtractionJobsOutput,
  ListMemoryExtractionJobsError,
  Credentials | HttpClient.HttpClient,
  ExtractionJobMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /memories/{memoryId}/extractionJobs",
    input: {
      memoryId: 0,
      maxResults: 0,
      filter: { strategyId: 0, sessionId: 0, actorId: 0, status: 0 },
      nextToken: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMemoryExtractionJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "jobs",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListMemoryRecordsError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Lists memory records in an AgentCore Memory resource based on specified criteria. We recommend using pagination to ensure that the operation returns quickly and successfully.
 *
 * To use this operation, you must have the `bedrock-agentcore:ListMemoryRecords` permission.
 */
export const listMemoryRecords: API.PaginatedOperationMethod<
  ListMemoryRecordsInput,
  ListMemoryRecordsOutput,
  ListMemoryRecordsError,
  Credentials | HttpClient.HttpClient,
  MemoryRecordSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /memories/{memoryId}/memoryRecords",
    input: {
      memoryId: 0,
      namespace: 0,
      namespacePath: 0,
      memoryStrategyId: 0,
      maxResults: 0,
      nextToken: 0,
      metadataFilters: D.list(i_MemoryMetadataFilterExpression),
    },
    output: { memoryRecordSummaries: D.list(o_MemoryRecordSummary) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMemoryRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "memoryRecordSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPaymentInstrumentsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List payment instruments for a manager.
 */
export const listPaymentInstruments: API.PaginatedOperationMethod<
  ListPaymentInstrumentsRequest,
  ListPaymentInstrumentsResponse,
  ListPaymentInstrumentsError,
  Credentials | HttpClient.HttpClient,
  PaymentInstrumentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /payments/listPaymentInstruments",
    input: {
      userId: D.m({ header: "X-Amzn-Bedrock-AgentCore-Payments-User-Id" }),
      agentName: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Payments-Agent-Name",
      }),
      paymentManagerArn: 0,
      paymentConnectorId: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: {
      paymentInstruments: D.list({ createdAt: D.ts, updatedAt: D.ts }),
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
  operationName: "ListPaymentInstruments",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "paymentInstruments",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListPaymentSessionsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * List payment sessions.
 */
export const listPaymentSessions: API.PaginatedOperationMethod<
  ListPaymentSessionsRequest,
  ListPaymentSessionsResponse,
  ListPaymentSessionsError,
  Credentials | HttpClient.HttpClient,
  PaymentSessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /payments/listPaymentSessions",
    input: {
      userId: D.m({ header: "X-Amzn-Bedrock-AgentCore-Payments-User-Id" }),
      agentName: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Payments-Agent-Name",
      }),
      paymentManagerArn: 0,
      nextToken: 0,
      maxResults: 0,
    },
    output: { paymentSessions: D.list({ createdAt: D.ts, updatedAt: D.ts }) },
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
  operationName: "ListPaymentSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "paymentSessions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListRecommendationsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists all recommendations in the account, with optional filtering by status.
 */
export const listRecommendations: API.PaginatedOperationMethod<
  ListRecommendationsRequest,
  ListRecommendationsResponse,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  RecommendationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /recommendations",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
      statusFilter: D.m({ query: "status" }),
    },
    output: {
      recommendationSummaries: D.list({ createdAt: D.ts, updatedAt: D.ts }),
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
  operationName: "ListRecommendations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "recommendationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListSessionsError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Lists sessions in an AgentCore Memory resource based on specified criteria. We recommend using pagination to ensure that the operation returns quickly and successfully.
 *
 * Empty sessions are automatically deleted after one day.
 *
 * To use this operation, you must have the `bedrock-agentcore:ListSessions` permission.
 */
export const listSessions: API.PaginatedOperationMethod<
  ListSessionsInput,
  ListSessionsOutput,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /memories/{memoryId}/actor/{actorId}/sessions",
    input: {
      memoryId: 0,
      actorId: 0,
      maxResults: 0,
      nextToken: 0,
      filter: { eventFilter: 0 },
    },
    output: { sessionSummaries: D.list({ createdAt: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
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

export type ProcessPaymentError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | SubscriptionRequiredException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Processes a payment using a payment instrument within a payment session.
 */
export const processPayment: API.OperationMethod<
  ProcessPaymentRequest,
  ProcessPaymentResponse,
  ProcessPaymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /payments/processPayment",
    input: {
      userId: D.m({ header: "X-Amzn-Bedrock-AgentCore-Payments-User-Id" }),
      agentName: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Payments-Agent-Name",
      }),
      paymentManagerArn: 0,
      paymentSessionId: 0,
      paymentInstrumentId: 0,
      paymentType: 0,
      paymentInput: {
        cryptoX402: { version: 0, payload: 0, permit2AllowanceLimit: 0 },
        mpp: { version: 0, wwwAuthenticateHeaders: 0, buyerPaysGasFees: 0 },
      },
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      paymentOutput: { mpp: { paymentCredential: D.secret } },
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
    SubscriptionRequiredException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ProcessPayment",
})) as any;

export type RetrieveMemoryRecordsError =
  | AccessDeniedException
  | InvalidInputException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Searches for and retrieves memory records from an AgentCore Memory resource based on specified search criteria. We recommend using pagination to ensure that the operation returns quickly and successfully.
 *
 * To use this operation, you must have the `bedrock-agentcore:RetrieveMemoryRecords` permission.
 */
export const retrieveMemoryRecords: API.PaginatedOperationMethod<
  RetrieveMemoryRecordsInput,
  RetrieveMemoryRecordsOutput,
  RetrieveMemoryRecordsError,
  Credentials | HttpClient.HttpClient,
  MemoryRecordSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /memories/{memoryId}/retrieve",
    input: {
      memoryId: 0,
      namespace: 0,
      namespacePath: 0,
      searchCriteria: {
        searchQuery: 0,
        memoryStrategyId: 0,
        topK: 0,
        metadataFilters: D.list(i_MemoryMetadataFilterExpression),
      },
      nextToken: 0,
      maxResults: 0,
    },
    output: { memoryRecordSummaries: D.list(o_MemoryRecordSummary) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InvalidInputException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RetrieveMemoryRecords",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "memoryRecordSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SaveBrowserSessionProfileError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Saves the current state of a browser session as a reusable profile in Amazon Bedrock AgentCore. A browser profile captures persistent browser data such as cookies and local storage from an active session, enabling you to reuse this data in future browser sessions.
 *
 * To save a browser session profile, you must specify the profile identifier, browser identifier, and session ID. The session must be active when saving the profile. Once saved, the profile can be used with the `StartBrowserSession` operation to initialize new sessions with the stored browser state.
 *
 * Browser profiles are useful for scenarios that require persistent authentication, maintaining user preferences across sessions, or continuing tasks that depend on previously stored browser data.
 *
 * The following operations are related to `SaveBrowserSessionProfile`:
 *
 * - StartBrowserSession
 *
 * - GetBrowserSession
 */
export const saveBrowserSessionProfile: API.OperationMethod<
  SaveBrowserSessionProfileRequest,
  SaveBrowserSessionProfileResponse,
  SaveBrowserSessionProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /browser-profiles/{profileIdentifier}/save",
    input: {
      traceId: D.m({ header: "X-Amzn-Trace-Id" }),
      traceParent: D.m({ header: "traceparent" }),
      profileIdentifier: 0,
      browserIdentifier: 0,
      sessionId: 0,
      clientToken: D.m({ idempotency: true }),
    },
    output: { lastUpdatedAt: D.ts },
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
  operationName: "SaveBrowserSessionProfile",
})) as any;

export type SearchRegistryRecordsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Searches for registry records using semantic, lexical, or hybrid queries. Returns metadata for matching records ordered by relevance within the specified registry.
 */
export const searchRegistryRecords: API.OperationMethod<
  SearchRegistryRecordsRequest,
  SearchRegistryRecordsResponse,
  SearchRegistryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /registry-records/search",
    input: { searchQuery: 0, registryIds: 0, maxResults: 0, filters: 0 },
    output: {
      registryRecords: D.list({
        description: D.secret,
        createdAt: D.ts,
        updatedAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchRegistryRecords",
})) as any;

export type StartBatchEvaluationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Starts a batch evaluation job that evaluates agent performance across multiple sessions. Batch evaluations pull agent traces from CloudWatch Logs or an existing online evaluation configuration and run specified evaluators and insights against them.
 */
export const startBatchEvaluation: API.OperationMethod<
  StartBatchEvaluationRequest,
  StartBatchEvaluationResponse,
  StartBatchEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /evaluations/batch-evaluate",
    input: {
      batchEvaluationName: 0,
      evaluators: D.list({ evaluatorId: 0 }),
      insights: D.list({ insightId: 0 }),
      dataSourceConfig: {
        cloudWatchLogs: {
          serviceNames: 0,
          logGroupNames: 0,
          filterConfig: { sessionIds: 0, timeRange: i_SessionFilterConfig },
        },
        onlineEvaluationConfigSource: {
          onlineEvaluationConfigArn: 0,
          timeRange: i_SessionFilterConfig,
        },
      },
      clientToken: D.m({ idempotency: true }),
      evaluationMetadata: {
        sessionMetadata: D.list({
          sessionId: 0,
          testScenarioId: 0,
          groundTruth: {
            inline: {
              assertions: D.list(i_EvaluationContent),
              expectedTrajectory: i_EvaluationExpectedTrajectory,
              turns: D.list({
                input: { prompt: 0 },
                expectedResponse: i_EvaluationContent,
              }),
            },
          },
          metadata: 0,
        }),
      },
      tags: 0,
      kmsKeyArn: 0,
      description: 0,
    },
    output: { createdAt: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBatchEvaluation",
})) as any;

export type StartBrowserSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates and initializes a browser session in Amazon Bedrock AgentCore. The session enables agents to navigate and interact with web content, extract information from websites, and perform web-based tasks as part of their response generation.
 *
 * To create a session, you must specify a browser identifier and a name. You can also configure the viewport dimensions to control the visible area of web content. The session remains active until it times out or you explicitly stop it using the `StopBrowserSession` operation.
 *
 * The following operations are related to `StartBrowserSession`:
 *
 * - GetBrowserSession
 *
 * - UpdateBrowserStream
 *
 * - SaveBrowserSessionProfile
 *
 * - StopBrowserSession
 *
 * - InvokeBrowser
 */
export const startBrowserSession: API.OperationMethod<
  StartBrowserSessionRequest,
  StartBrowserSessionResponse,
  StartBrowserSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /browsers/{browserIdentifier}/sessions/start",
    input: {
      traceId: D.m({ header: "X-Amzn-Trace-Id" }),
      traceParent: D.m({ header: "traceparent" }),
      browserIdentifier: 0,
      name: 0,
      sessionTimeoutSeconds: 0,
      viewPort: { width: 0, height: 0 },
      extensions: D.list({ location: i_ResourceLocation }),
      profileConfiguration: { profileIdentifier: 0 },
      proxyConfiguration: {
        proxies: D.list({
          externalProxy: {
            server: 0,
            port: 0,
            domainPatterns: 0,
            credentials: { basicAuth: { secretArn: 0 } },
          },
        }),
        bypass: { domainPatterns: 0 },
      },
      enterprisePolicies: D.list({ location: i_ResourceLocation, type: 0 }),
      certificates: D.list(i_Certificate),
      filesystemConfigurations: D.list(i_ToolsFileSystemConfiguration),
      clientToken: D.m({ idempotency: true }),
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartBrowserSession",
})) as any;

export type StartCodeInterpreterSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates and initializes a code interpreter session in Amazon Bedrock AgentCore. The session enables agents to execute code as part of their response generation, supporting programming languages such as Python for data analysis, visualization, and computation tasks.
 *
 * To create a session, you must specify a code interpreter identifier and a name. The session remains active until it times out or you explicitly stop it using the `StopCodeInterpreterSession` operation.
 *
 * The following operations are related to `StartCodeInterpreterSession`:
 *
 * - InvokeCodeInterpreter
 *
 * - GetCodeInterpreterSession
 *
 * - StopCodeInterpreterSession
 */
export const startCodeInterpreterSession: API.OperationMethod<
  StartCodeInterpreterSessionRequest,
  StartCodeInterpreterSessionResponse,
  StartCodeInterpreterSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /code-interpreters/{codeInterpreterIdentifier}/sessions/start",
    input: {
      traceId: D.m({ header: "X-Amzn-Trace-Id" }),
      traceParent: D.m({ header: "traceparent" }),
      codeInterpreterIdentifier: 0,
      name: 0,
      sessionTimeoutSeconds: 0,
      certificates: D.list(i_Certificate),
      filesystemConfigurations: D.list(i_ToolsFileSystemConfiguration),
      clientToken: D.m({ idempotency: true }),
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
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartCodeInterpreterSession",
})) as any;

export type StartMemoryExtractionJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ServiceException
  | ServiceQuotaExceededException
  | ThrottledException
  | ValidationException
  | CommonErrors;
/**
 * Starts a memory extraction job that processes events that failed extraction previously in an AgentCore Memory resource and produces structured memory records. When earlier extraction attempts have left events unprocessed, this job will pick up and extract those as well.
 *
 * To use this operation, you must have the `bedrock-agentcore:StartMemoryExtractionJob` permission.
 */
export const startMemoryExtractionJob: API.OperationMethod<
  StartMemoryExtractionJobInput,
  StartMemoryExtractionJobOutput,
  StartMemoryExtractionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /memories/{memoryId}/extractionJobs/start",
    input: {
      memoryId: 0,
      extractionJob: { jobId: 0 },
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ServiceException,
    ServiceQuotaExceededException,
    ThrottledException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartMemoryExtractionJob",
})) as any;

export type StartRecommendationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Starts a recommendation job that analyzes agent traces and generates optimization suggestions for system prompts or tool descriptions to improve agent performance.
 */
export const startRecommendation: API.OperationMethod<
  StartRecommendationRequest,
  StartRecommendationResponse,
  StartRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /recommendations",
    input: {
      name: 0,
      description: 0,
      type: 0,
      recommendationConfig: {
        systemPromptRecommendationConfig: {
          systemPrompt: {
            text: 0,
            configurationBundle: {
              bundleArn: 0,
              versionId: 0,
              systemPromptJsonPath: 0,
            },
          },
          agentTraces: i_AgentTracesConfig,
          evaluationConfig: { evaluators: D.list({ evaluatorArn: 0 }) },
        },
        toolDescriptionRecommendationConfig: {
          toolDescription: {
            toolDescriptionText: {
              tools: D.list({ toolName: 0, toolDescription: { text: 0 } }),
            },
            configurationBundle: {
              bundleArn: 0,
              versionId: 0,
              tools: D.list({ toolName: 0, toolDescriptionJsonPath: 0 }),
            },
          },
          agentTraces: i_AgentTracesConfig,
        },
      },
      kmsKeyArn: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: {
      recommendationConfig: o_RecommendationConfig,
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
  operationName: "StartRecommendation",
})) as any;

export type StopBatchEvaluationError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Stops a running batch evaluation. Sessions that have already been evaluated retain their results.
 */
export const stopBatchEvaluation: API.OperationMethod<
  StopBatchEvaluationRequest,
  StopBatchEvaluationResponse,
  StopBatchEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /evaluations/batch-evaluate/{batchEvaluationId}/stop",
    input: { batchEvaluationId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopBatchEvaluation",
})) as any;

export type StopBrowserSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Terminates an active browser session in Amazon Bedrock AgentCore. This operation stops the session, releases associated resources, and makes the session unavailable for further use.
 *
 * To stop a browser session, you must specify both the browser identifier and the session ID. Once stopped, a session cannot be restarted; you must create a new session using `StartBrowserSession`.
 *
 * The following operations are related to `StopBrowserSession`:
 *
 * - StartBrowserSession
 *
 * - GetBrowserSession
 */
export const stopBrowserSession: API.OperationMethod<
  StopBrowserSessionRequest,
  StopBrowserSessionResponse,
  StopBrowserSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /browsers/{browserIdentifier}/sessions/stop",
    input: {
      traceId: D.m({ header: "X-Amzn-Trace-Id" }),
      traceParent: D.m({ header: "traceparent" }),
      browserIdentifier: 0,
      sessionId: D.m({ query: "sessionId" }),
      clientToken: D.m({ idempotency: true }),
    },
    output: { lastUpdatedAt: D.ts },
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
  operationName: "StopBrowserSession",
})) as any;

export type StopCodeInterpreterSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Terminates an active code interpreter session in Amazon Bedrock AgentCore. This operation stops the session, releases associated resources, and makes the session unavailable for further use.
 *
 * To stop a code interpreter session, you must specify both the code interpreter identifier and the session ID. Once stopped, a session cannot be restarted; you must create a new session using `StartCodeInterpreterSession`.
 *
 * The following operations are related to `StopCodeInterpreterSession`:
 *
 * - StartCodeInterpreterSession
 *
 * - GetCodeInterpreterSession
 */
export const stopCodeInterpreterSession: API.OperationMethod<
  StopCodeInterpreterSessionRequest,
  StopCodeInterpreterSessionResponse,
  StopCodeInterpreterSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /code-interpreters/{codeInterpreterIdentifier}/sessions/stop",
    input: {
      traceId: D.m({ header: "X-Amzn-Trace-Id" }),
      traceParent: D.m({ header: "traceparent" }),
      codeInterpreterIdentifier: 0,
      sessionId: D.m({ query: "sessionId" }),
      clientToken: D.m({ idempotency: true }),
    },
    output: { lastUpdatedAt: D.ts },
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
  operationName: "StopCodeInterpreterSession",
})) as any;

export type StopRuntimeSessionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | RetryableConflictException
  | RuntimeClientError
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Stops a session that is running in an running AgentCore Runtime agent.
 */
export const stopRuntimeSession: API.OperationMethod<
  StopRuntimeSessionRequest,
  StopRuntimeSessionResponse,
  StopRuntimeSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /runtimes/{agentRuntimeArn}/stopruntimesession",
    input: {
      runtimeSessionId: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Runtime-Session-Id",
      }),
      agentRuntimeArn: 0,
      qualifier: D.m({ query: "qualifier" }),
      clientToken: D.m({ idempotency: true }),
    },
    output: {
      runtimeSessionId: D.m({
        header: "X-Amzn-Bedrock-AgentCore-Runtime-Session-Id",
      }),
      statusCode: D.m({ status: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    RetryableConflictException,
    RuntimeClientError,
    ServiceQuotaExceededException,
    ThrottlingException,
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StopRuntimeSession",
})) as any;

export type UpdateABTestError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | UnauthorizedException
  | ValidationException
  | CommonErrors;
/**
 * Updates an A/B test's configuration, including variants, traffic allocation, evaluation settings, or execution status.
 */
export const updateABTest: API.OperationMethod<
  UpdateABTestRequest,
  UpdateABTestResponse,
  UpdateABTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /ab-tests/{abTestId}",
    input: {
      abTestId: 0,
      clientToken: D.m({ idempotency: true }),
      name: 0,
      description: 0,
      variants: D.list(i_Variant),
      gatewayFilter: i_GatewayFilter,
      evaluationConfig: i_ABTestEvaluationConfig,
      roleArn: 0,
      executionStatus: 0,
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
    UnauthorizedException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateABTest",
})) as any;

export type UpdateBrowserStreamError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a browser stream. To use this operation, you must have permissions to perform the bedrock:UpdateBrowserStream action.
 */
export const updateBrowserStream: API.OperationMethod<
  UpdateBrowserStreamRequest,
  UpdateBrowserStreamResponse,
  UpdateBrowserStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /browsers/{browserIdentifier}/sessions/streams/update",
    input: {
      browserIdentifier: 0,
      sessionId: D.m({ query: "sessionId" }),
      streamUpdate: { automationStreamUpdate: { streamStatus: 0 } },
      clientToken: D.m({ idempotency: true }),
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
  operationName: "UpdateBrowserStream",
})) as any;

const i_ABTestEvaluationConfig: D.LazyStruct = () => ({
  onlineEvaluationConfigArn: 0,
  perVariantOnlineEvaluationConfig: D.list({
    name: 0,
    onlineEvaluationConfigArn: 0,
  }),
});
const i_AgentTracesConfig: D.LazyStruct = () => ({
  sessionSpans: 0,
  cloudwatchLogs: {
    logGroupArns: 0,
    serviceNames: 0,
    startTime: D.tsAs("date-time"),
    endTime: D.tsAs("date-time"),
    rule: {
      filters: D.list({
        key: 0,
        operator: 0,
        value: { stringValue: 0, doubleValue: 0, booleanValue: 0 },
      }),
    },
  },
  batchEvaluation: { batchEvaluationArn: 0 },
  onlineEvaluation: {
    onlineEvaluationConfigArn: 0,
    startTime: D.tsAs("date-time"),
    endTime: D.tsAs("date-time"),
  },
});
const i_Certificate: D.LazyStruct = () => ({
  location: { secretsManager: { secretArn: 0 } },
});
const i_Conversational: D.LazyStruct = () => ({
  content: { text: 0 },
  role: 0,
});
const i_EvaluationContent: D.LazyStruct = () => ({ text: 0 });
const i_EvaluationExpectedTrajectory: D.LazyStruct = () => ({ toolNames: 0 });
const i_ExtractionConfig: D.LazyStruct = () => ({ namespaceVariables: 0 });
const i_GatewayFilter: D.LazyStruct = () => ({ targetPaths: 0 });
const i_MemoryContent: D.LazyStruct = () => ({ text: 0 });
const i_MemoryJsonData: D.LazyStruct = () => ({ content: 0 });
const i_MemoryMetadataFilterExpression: D.LazyStruct = () => ({
  left: { metadataKey: 0 },
  operator: 0,
  right: { metadataValue: i_MemoryRecordMetadataValue },
});
const i_MemoryRecordMetadataValue: D.LazyStruct = () => ({
  stringValue: 0,
  stringListValue: 0,
  numberValue: 0,
  dateTimeValue: 0,
});
const i_MetadataValue: D.LazyStruct = () => ({ stringValue: 0 });
const i_OAuth2Authentication: D.LazyStruct = () => ({
  sub: 0,
  emailAddress: 0,
  name: 0,
  username: 0,
});
const i_ResourceLocation: D.LazyStruct = () => ({
  s3: { bucket: 0, prefix: 0, versionId: 0 },
});
const i_SessionFilterConfig: D.LazyStruct = () => ({
  startTime: D.tsAs("date-time"),
  endTime: D.tsAs("date-time"),
});
const i_ToolsFileSystemConfiguration: D.LazyStruct = () => ({
  s3FilesConfiguration: { accessPointArn: 0, mountPath: 0, fileSystemArn: 0 },
  efsConfiguration: { accessPointArn: 0, mountPath: 0, fileSystemArn: 0 },
});
const i_Variant: D.LazyStruct = () => ({
  name: 0,
  weight: 0,
  variantConfiguration: {
    configurationBundle: { bundleArn: 0, bundleVersion: 0 },
    target: { name: 0 },
  },
});
const i_Unit: D.LazyStruct = () => ({});
const o_Event: D.LazyStruct = () => ({
  eventTimestamp: D.ts,
  payload: D.list({ conversational: { content: { text: D.secret } } }),
});
const o_MemoryContent: D.LazyStruct = () => ({ text: D.secret });
const o_MemoryRecordMetadataValue: D.LazyStruct = () => ({
  dateTimeValue: D.ts,
});
const o_MemoryRecordSummary: D.LazyStruct = () => ({
  content: o_MemoryContent,
  createdAt: D.ts,
  metadata: D.map(o_MemoryRecordMetadataValue),
});
const o_PaymentInstrument: D.LazyStruct = () => ({
  paymentInstrumentDetails: {
    embeddedCryptoWallet: {
      linkedAccounts: D.list({
        email: { emailAddress: D.secret },
        sms: { phoneNumber: D.secret },
        oAuth2: {
          google: o_OAuth2Authentication,
          apple: o_OAuth2Authentication,
          x: o_OAuth2Authentication,
          telegram: o_OAuth2Authentication,
          github: o_OAuth2Authentication,
        },
      }),
    },
  },
  createdAt: D.ts,
  updatedAt: D.ts,
});
const o_PaymentSession: D.LazyStruct = () => ({
  createdAt: D.ts,
  availableLimits: { updatedAt: D.ts },
  updatedAt: D.ts,
});
const o_RecommendationConfig: D.LazyStruct = () => ({
  systemPromptRecommendationConfig: {
    systemPrompt: { text: D.secret },
    agentTraces: o_AgentTracesConfig,
  },
  toolDescriptionRecommendationConfig: {
    toolDescription: {
      toolDescriptionText: {
        tools: D.list({ toolDescription: { text: D.secret } }),
      },
    },
    agentTraces: o_AgentTracesConfig,
  },
});
const o_SessionFilterConfig: D.LazyStruct = () => ({
  startTime: D.ts,
  endTime: D.ts,
});
const o_AgentTracesConfig: D.LazyStruct = () => ({
  cloudwatchLogs: { startTime: D.ts, endTime: D.ts },
  onlineEvaluation: { startTime: D.ts, endTime: D.ts },
});
const o_OAuth2Authentication: D.LazyStruct = () => ({ emailAddress: D.secret });
