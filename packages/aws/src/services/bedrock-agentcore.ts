import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import type * as stream from "effect/Stream";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Bedrock AgentCore",
  serviceShapeName: "AmazonBedrockAgentCore",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "bedrock-agentcore" });
const ver = /*@__PURE__*/ T.ServiceVersion("2024-02-28");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://bedrock-agentcore.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://bedrock-agentcore.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://bedrock-agentcore.{R}.{D}","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "BedrockAgentCore",
  service: "BedrockAgentCore",
  propagate: TxXray.propagate,
} as const;

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
export class DuplicateIdException
  extends /*@__PURE__*/ S.TaggedError<DuplicateIdException>()(
    "DuplicateIdException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class InvalidInputException
  extends /*@__PURE__*/ S.TaggedError<InvalidInputException>()(
    "InvalidInputException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class RetryableConflictException
  extends /*@__PURE__*/ S.TaggedError<RetryableConflictException>()(
    "RetryableConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(409), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class RuntimeClientError
  extends /*@__PURE__*/ S.TaggedError<RuntimeClientError>()(
    "RuntimeClientError",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(424),
  ) {}
export class ServiceException
  extends /*@__PURE__*/ S.TaggedError<ServiceException>()(
    "ServiceException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(503), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class SubscriptionRequiredException
  extends /*@__PURE__*/ S.TaggedError<SubscriptionRequiredException>()(
    "SubscriptionRequiredException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      subscriptionUrl: /*@__PURE__*/ S.optional(S.String),
      productName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ThrottledException
  extends /*@__PURE__*/ S.TaggedError<ThrottledException>()(
    "ThrottledException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.suspend(() => S.String).annotate({
        identifier: "ValidationExceptionReason",
      }),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(1, __c0, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
      stringListValue?: undefined;
      numberValue?: undefined;
      dateTimeValue?: undefined;
    }
  | {
      stringValue?: undefined;
      stringListValue: string[];
      numberValue?: undefined;
      dateTimeValue?: undefined;
    }
  | {
      stringValue?: undefined;
      stringListValue?: undefined;
      numberValue: number;
      dateTimeValue?: undefined;
    }
  | {
      stringValue?: undefined;
      stringListValue?: undefined;
      numberValue?: undefined;
      dateTimeValue: Date;
    };
export type MemoryRecordMetadataMap = { [key: string]: MemoryRecordMetadataValue | undefined };
export interface MemoryRecordCreateInput {
  requestIdentifier: string;
  namespaces: string[];
  content: MemoryContent;
  timestamp: Date;
  memoryStrategyId?: string | undefined;
  metadata?: { [key: string]: MemoryRecordMetadataValue | undefined } | undefined;
}
export type MemoryRecordsCreateInputList = MemoryRecordCreateInput[];
export type RecordExpiryDurationDays = number;
export type RecordExpiryAction = "REMOVE" | (string & {});
export type RecordExpirySpecification =
  | { recordExpiryDurationDays: number; action?: undefined }
  | { recordExpiryDurationDays?: undefined; action: RecordExpiryAction };
export interface BatchCreateMemoryRecordsInput {
  memoryId: string;
  records: MemoryRecordCreateInput[];
  clientToken?: string | undefined;
  recordExpirySpecification?: RecordExpirySpecification | undefined;
}
export type MemoryRecordId = string;
export type MemoryRecordStatus = "SUCCEEDED" | "FAILED" | (string & {});
export interface MemoryRecordOutput {
  memoryRecordId: string;
  status: MemoryRecordStatus;
  requestIdentifier?: string | undefined;
  errorCode?: number | undefined;
  errorMessage?: string | undefined;
}
export type MemoryRecordsOutputList = MemoryRecordOutput[];
export interface BatchCreateMemoryRecordsOutput {
  successfulRecords: MemoryRecordOutput[];
  failedRecords: MemoryRecordOutput[];
}
export interface MemoryRecordDeleteInput {
  memoryRecordId: string;
  namespace?: string | undefined;
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
  content?: MemoryContent | undefined;
  namespaces?: string[] | undefined;
  sourceNamespaces?: string[] | undefined;
  memoryStrategyId?: string | undefined;
  metadata?: { [key: string]: MemoryRecordMetadataValue | undefined } | undefined;
}
export type MemoryRecordsUpdateInputList = MemoryRecordUpdateInput[];
export interface BatchUpdateMemoryRecordsInput {
  memoryId: string;
  records: MemoryRecordUpdateInput[];
  recordExpirySpecification?: RecordExpirySpecification | undefined;
}
export interface BatchUpdateMemoryRecordsOutput {
  successfulRecords: MemoryRecordOutput[];
  failedRecords: MemoryRecordOutput[];
}
export type UserTokenType = string | redacted.Redacted<string>;
export type UserIdType = string;
export type UserIdentifier =
  | { userToken: string | redacted.Redacted<string>; userId?: undefined }
  | { userToken?: undefined; userId: string };
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
  configurationBundle?: ConfigurationBundleRef | undefined;
  target?: TargetRef | undefined;
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
  targetPaths?: string[] | undefined;
}
export type OnlineEvaluationConfigArn = string;
export interface PerVariantOnlineEvaluationConfig {
  name: string;
  onlineEvaluationConfigArn: string;
}
export type PerVariantOnlineEvaluationConfigList = PerVariantOnlineEvaluationConfig[];
export type ABTestEvaluationConfig =
  | { onlineEvaluationConfigArn: string; perVariantOnlineEvaluationConfig?: undefined }
  | {
      onlineEvaluationConfigArn?: undefined;
      perVariantOnlineEvaluationConfig: PerVariantOnlineEvaluationConfig[];
    };
export type RoleArn = string;
export type ClientToken = string;
export type TagKey = string;
export type TagValue = string;
export type TagsMap = { [key: string]: string | undefined };
export interface CreateABTestRequest {
  name: string;
  description?: string | undefined;
  gatewayArn: string;
  variants: Variant[];
  gatewayFilter?: GatewayFilter | undefined;
  evaluationConfig: ABTestEvaluationConfig;
  roleArn: string;
  enableOnCreate?: boolean | undefined;
  clientToken?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
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
  name?: string | undefined;
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
  | { conversational: Conversational; blob?: undefined; json?: undefined }
  | { conversational?: undefined; blob: any; json?: undefined }
  | { conversational?: undefined; blob?: undefined; json: MemoryJsonData };
export type PayloadTypeList = PayloadType[];
export type EventId = string;
export type BranchName = string;
export interface Branch {
  rootEventId?: string | undefined;
  name: string;
}
export type MetadataValue = { stringValue: string };
export type MetadataMap = { [key: string]: MetadataValue | undefined };
export type ExtractionMode = "SKIP" | (string & {});
export type NamespaceVariableName = string;
export type NamespaceVariableValue = string;
export type NamespaceVariablesMap = { [key: string]: string | undefined };
export interface ExtractionConfig {
  namespaceVariables?: { [key: string]: string | undefined } | undefined;
}
export interface CreateEventInput {
  memoryId: string;
  actorId: string;
  sessionId?: string | undefined;
  eventTimestamp: Date;
  payload: PayloadType[];
  branch?: Branch | undefined;
  clientToken?: string | undefined;
  metadata?: { [key: string]: MetadataValue | undefined } | undefined;
  extractionMode?: ExtractionMode | undefined;
  extractionConfig?: ExtractionConfig | undefined;
}
export interface Event {
  memoryId: string;
  actorId: string;
  sessionId: string;
  eventId: string;
  eventTimestamp: Date;
  payload?: PayloadType[] | undefined;
  branch?: Branch | undefined;
  metadata?: { [key: string]: MetadataValue | undefined } | undefined;
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
  emailAddress?: string | redacted.Redacted<string> | undefined;
  name?: string | undefined;
  username?: string | undefined;
}
export type LinkedAccountOAuth2 =
  | {
      google: OAuth2Authentication;
      apple?: undefined;
      x?: undefined;
      telegram?: undefined;
      github?: undefined;
    }
  | {
      google?: undefined;
      apple: OAuth2Authentication;
      x?: undefined;
      telegram?: undefined;
      github?: undefined;
    }
  | {
      google?: undefined;
      apple?: undefined;
      x: OAuth2Authentication;
      telegram?: undefined;
      github?: undefined;
    }
  | {
      google?: undefined;
      apple?: undefined;
      x?: undefined;
      telegram: OAuth2Authentication;
      github?: undefined;
    }
  | {
      google?: undefined;
      apple?: undefined;
      x?: undefined;
      telegram?: undefined;
      github: OAuth2Authentication;
    };
export type LinkedAccount =
  | { email: LinkedAccountEmail; sms?: undefined; developerJwt?: undefined; oAuth2?: undefined }
  | { email?: undefined; sms: LinkedAccountSms; developerJwt?: undefined; oAuth2?: undefined }
  | {
      email?: undefined;
      sms?: undefined;
      developerJwt: LinkedAccountDeveloperJwt;
      oAuth2?: undefined;
    }
  | { email?: undefined; sms?: undefined; developerJwt?: undefined; oAuth2: LinkedAccountOAuth2 };
export type LinkedAccountList = LinkedAccount[];
export interface EmbeddedCryptoWallet {
  network: CryptoWalletNetwork;
  linkedAccounts: LinkedAccount[];
  walletAddress?: string | undefined;
  redirectUrl?: string | undefined;
}
export type PaymentInstrumentDetails = { embeddedCryptoWallet: EmbeddedCryptoWallet };
export interface CreatePaymentInstrumentRequest {
  userId?: string | undefined;
  agentName?: string | undefined;
  paymentManagerArn: string;
  paymentConnectorId: string;
  paymentInstrumentType: PaymentInstrumentType;
  paymentInstrumentDetails: PaymentInstrumentDetails;
  clientToken?: string | undefined;
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
  userId?: string | undefined;
  agentName?: string | undefined;
  paymentManagerArn: string;
  limits?: SessionLimits | undefined;
  expiryTimeInMinutes: number;
  clientToken?: string | undefined;
}
export type PaymentSessionId = string;
export interface AvailableLimits {
  availableSpendAmount?: Amount | undefined;
  updatedAt?: Date | undefined;
}
export interface PaymentSession {
  paymentSessionId: string;
  paymentManagerArn: string;
  limits?: SessionLimits | undefined;
  userId: string;
  expiryTimeInMinutes: number;
  createdAt: Date;
  availableLimits?: AvailableLimits | undefined;
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
  namespace?: string | undefined;
}
export interface DeleteMemoryRecordOutput {
  memoryRecordId: string;
}
export interface DeletePaymentInstrumentRequest {
  userId?: string | undefined;
  paymentManagerArn: string;
  paymentConnectorId: string;
  paymentInstrumentId: string;
}
export interface DeletePaymentInstrumentResponse {
  status: PaymentInstrumentStatus;
}
export interface DeletePaymentSessionRequest {
  userId?: string | undefined;
  paymentManagerArn: string;
  paymentSessionId: string;
}
export type PaymentSessionStatus = "ACTIVE" | "EXPIRED" | "DELETED" | (string & {});
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
  | { spanIds: string[]; traceIds?: undefined }
  | { spanIds?: undefined; traceIds: string[] };
export interface SpanContext {
  sessionId: string;
  traceId?: string | undefined;
  spanId?: string | undefined;
}
export type Context = { spanContext: SpanContext };
export type EvaluationContent = { text: string };
export type EvaluationContentList = EvaluationContent[];
export type EvaluationToolName = string;
export type EvaluationToolNames = string[];
export interface EvaluationExpectedTrajectory {
  toolNames?: string[] | undefined;
}
export interface EvaluationReferenceInput {
  context: Context;
  expectedResponse?: EvaluationContent | undefined;
  assertions?: EvaluationContent[] | undefined;
  expectedTrajectory?: EvaluationExpectedTrajectory | undefined;
}
export type EvaluationReferenceInputs = EvaluationReferenceInput[];
export interface EvaluateRequest {
  evaluatorId: string;
  evaluationInput: EvaluationInput;
  evaluationTarget?: EvaluationTarget | undefined;
  evaluationReferenceInputs?: EvaluationReferenceInput[] | undefined;
}
export type EvaluatorArn = string;
export type EvaluatorName = string;
export type EvaluationDimensionName = string;
export type EvaluationExplanation = string | redacted.Redacted<string>;
export interface TokenUsage {
  inputTokens?: number | undefined;
  outputTokens?: number | undefined;
  totalTokens?: number | undefined;
}
export type EvaluationErrorMessage = string;
export type EvaluationErrorCode = string;
export type IgnoredReferenceInputField = string;
export type IgnoredReferenceInputFields = string[];
export interface EvaluationResultContent {
  evaluatorArn: string;
  evaluatorId: string;
  evaluatorName: string;
  evaluationDimensionName?: string | undefined;
  explanation?: string | redacted.Redacted<string> | undefined;
  context: Context;
  value?: number | undefined;
  label?: string | undefined;
  tokenUsage?: TokenUsage | undefined;
  errorMessage?: string | undefined;
  errorCode?: string | undefined;
  ignoredReferenceInputFields?: string[] | undefined;
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
  lower?: number | undefined;
  upper?: number | undefined;
}
export interface VariantResult {
  variantName: string;
  sampleSize: number;
  mean: number;
  absoluteChange?: number | undefined;
  percentChange?: number | undefined;
  pValue?: number | undefined;
  confidenceInterval?: ConfidenceInterval | undefined;
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
  analysisTimestamp?: Date | undefined;
  evaluatorMetrics: EvaluatorMetric[];
}
export interface GetABTestResponse {
  abTestId: string;
  abTestArn: string;
  name: string;
  description?: string | undefined;
  status: ABTestStatus;
  executionStatus: ABTestExecutionStatus;
  gatewayArn: string;
  variants: Variant[];
  gatewayFilter?: GatewayFilter | undefined;
  evaluationConfig: ABTestEvaluationConfig;
  roleArn?: string | undefined;
  currentRunId?: string | undefined;
  errorDetails?: string[] | undefined;
  startedAt?: Date | undefined;
  stoppedAt?: Date | undefined;
  maxDurationExpiresAt?: Date | undefined;
  createdAt: Date;
  updatedAt: Date;
  results?: ABTestResults | undefined;
}
export type SessionType = string;
export interface GetAgentCardRequest {
  runtimeSessionId?: string | undefined;
  agentRuntimeArn: string;
  qualifier?: string | undefined;
}
export type AgentCard = unknown;
export type HttpResponseCode = number;
export interface GetAgentCardResponse {
  runtimeSessionId?: string | undefined;
  agentCard: any;
  statusCode?: number | undefined;
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
export type LogGroupName = string;
export type LogGroupNameList = string[];
export type LogGroupNamePrefix = string;
export type LogGroupNamePrefixList = string[];
export interface SessionFilterConfig {
  startTime?: Date | undefined;
  endTime?: Date | undefined;
}
export type TraceIdList = string[];
export interface SessionTraceIds {
  sessionId: string;
  traceIds: string[];
}
export type SessionTraceIdsList = SessionTraceIds[];
export interface CloudWatchFilterConfig {
  sessionIds?: string[] | undefined;
  timeRange?: SessionFilterConfig | undefined;
  sessionTraceIds?: SessionTraceIds[] | undefined;
}
export interface CloudWatchLogsSource {
  serviceNames: string[];
  logGroupNames?: string[] | undefined;
  logGroupNamePrefixes?: string[] | undefined;
  filterConfig?: CloudWatchFilterConfig | undefined;
}
export interface OnlineEvaluationConfigSource {
  onlineEvaluationConfigArn: string;
  timeRange?: SessionFilterConfig | undefined;
}
export type DataSourceConfig =
  | { cloudWatchLogs: CloudWatchLogsSource; onlineEvaluationConfigSource?: undefined }
  | { cloudWatchLogs?: undefined; onlineEvaluationConfigSource: OnlineEvaluationConfigSource };
export type OptionalLogGroupName = string;
export type LogStreamName = string;
export type MetricsNamespace = string;
export type ResultDestination = "DEDICATED_LOG_GROUP" | "SOURCE_LOG_GROUP" | (string & {});
export interface CloudWatchOutputConfig {
  logGroupName?: string | undefined;
  logStreamName?: string | undefined;
  metricsNamespace?: string | undefined;
  resultDestination?: ResultDestination | undefined;
}
export type OutputConfig = { cloudWatchConfig: CloudWatchOutputConfig };
export interface EvaluatorStatistics {
  averageScore?: number | undefined;
}
export interface EvaluatorSummary {
  evaluatorId?: string | undefined;
  evaluationDimensionName?: string | undefined;
  statistics?: EvaluatorStatistics | undefined;
  totalEvaluated?: number | undefined;
  totalFailed?: number | undefined;
}
export type EvaluatorSummaryList = EvaluatorSummary[];
export interface EvaluationJobResults {
  numberOfSessionsCompleted?: number | undefined;
  numberOfSessionsInProgress?: number | undefined;
  numberOfSessionsFailed?: number | undefined;
  totalNumberOfSessions?: number | undefined;
  numberOfSessionsIgnored?: number | undefined;
  evaluatorSummaries?: EvaluatorSummary[] | undefined;
}
export type InsightType = "FAILURE" | (string & {});
export type InsightName = string | redacted.Redacted<string>;
export type InsightDescription = string | redacted.Redacted<string>;
export type FindingTargetId = string;
export type FindingTargetType = "SPAN_ID" | "TRACE_ID" | "SPAN_NAME" | (string & {});
export type FindingDescription = string | redacted.Redacted<string>;
export interface SessionFinding {
  targetId?: string | undefined;
  targetType?: FindingTargetType | undefined;
  description: string | redacted.Redacted<string>;
  category?: string | undefined;
  confidence?: number | undefined;
}
export type SessionFindingList = SessionFinding[];
export interface SampleSession {
  sessionId: string;
  lastSeenAt?: Date | undefined;
  findings?: SessionFinding[] | undefined;
}
export type InsightSampleSessionList = SampleSession[];
export type RootCauseName = string | redacted.Redacted<string>;
export type RootCauseExplanation = string | redacted.Redacted<string>;
export type SuggestedFix = string | redacted.Redacted<string>;
export interface InsightRootCause {
  name: string | redacted.Redacted<string>;
  explanation: string | redacted.Redacted<string>;
  affectedSessionCount?: number | undefined;
  suggestedFix?: string | redacted.Redacted<string> | undefined;
  sampleSessions?: SampleSession[] | undefined;
}
export type InsightRootCauseList = InsightRootCause[];
export interface InsightResult {
  type: InsightType;
  name: string | redacted.Redacted<string>;
  description: string | redacted.Redacted<string>;
  createdAt: Date;
  affectedSessionCount?: number | undefined;
  sampleSessions?: SampleSession[] | undefined;
  rootCauses?: InsightRootCause[] | undefined;
}
export type InsightResultList = InsightResult[];
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
export type ExecutionSummaryAffectedSessionList = ExecutionSummaryAffectedSession[];
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
  evaluators?: Evaluator[] | undefined;
  insights?: Insight[] | undefined;
  dataSourceConfig?: DataSourceConfig | undefined;
  outputConfig?: OutputConfig | undefined;
  evaluationResults?: EvaluationJobResults | undefined;
  insightResults?: InsightResult[] | undefined;
  failureAnalysisResult?: FailureAnalysisResultContent | undefined;
  userIntentResult?: UserIntentClusteringResultContent | undefined;
  executionSummaryResult?: ExecutionSummaryClusteringResultContent | undefined;
  errorDetails?: string[] | undefined;
  description?: string | undefined;
  updatedAt?: Date | undefined;
  kmsKeyArn?: string | undefined;
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
  versionId?: string | undefined;
}
export type ResourceLocation = { s3: S3Location };
export interface BrowserExtension {
  location: ResourceLocation;
}
export type BrowserExtensions = BrowserExtension[];
export type BrowserEnterprisePolicyType = "MANAGED" | "RECOMMENDED" | (string & {});
export interface BrowserEnterprisePolicy {
  location: ResourceLocation;
  type?: BrowserEnterprisePolicyType | undefined;
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
  streamEndpoint?: string | undefined;
}
export interface BrowserSessionStream {
  automationStream: AutomationStream;
  liveViewStream?: LiveViewStream | undefined;
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
  domainPatterns?: string[] | undefined;
  credentials?: ProxyCredentials | undefined;
}
export type Proxy = { externalProxy: ExternalProxy };
export type Proxies = Proxy[];
export interface ProxyBypass {
  domainPatterns?: string[] | undefined;
}
export interface ProxyConfiguration {
  proxies: Proxy[];
  bypass?: ProxyBypass | undefined;
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
  | { s3FilesConfiguration: S3FilesConfiguration; efsConfiguration?: undefined }
  | { s3FilesConfiguration?: undefined; efsConfiguration: EfsConfiguration };
export type ToolsFileSystemConfigurations = ToolsFileSystemConfiguration[];
export interface GetBrowserSessionResponse {
  browserIdentifier: string;
  sessionId: string;
  name?: string | undefined;
  createdAt: Date;
  viewPort?: ViewPort | undefined;
  extensions?: BrowserExtension[] | undefined;
  enterprisePolicies?: BrowserEnterprisePolicy[] | undefined;
  profileConfiguration?: BrowserProfileConfiguration | undefined;
  sessionTimeoutSeconds?: number | undefined;
  status?: BrowserSessionStatus | undefined;
  streams?: BrowserSessionStream | undefined;
  proxyConfiguration?: ProxyConfiguration | undefined;
  certificates?: Certificate[] | undefined;
  filesystemConfigurations?: ToolsFileSystemConfiguration[] | undefined;
  sessionReplayArtifact?: string | undefined;
  lastUpdatedAt?: Date | undefined;
}
export type CodeInterpreterSessionId = string;
export interface GetCodeInterpreterSessionRequest {
  codeInterpreterIdentifier: string;
  sessionId: string;
}
export type CodeInterpreterSessionTimeout = number;
export type CodeInterpreterSessionStatus = "READY" | "TERMINATED" | (string & {});
export interface GetCodeInterpreterSessionResponse {
  codeInterpreterIdentifier: string;
  sessionId: string;
  name?: string | undefined;
  createdAt: Date;
  sessionTimeoutSeconds?: number | undefined;
  status?: CodeInterpreterSessionStatus | undefined;
  certificates?: Certificate[] | undefined;
  filesystemConfigurations?: ToolsFileSystemConfiguration[] | undefined;
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
  namespace?: string | undefined;
}
export interface MemoryRecord {
  memoryRecordId: string;
  content: MemoryContent;
  memoryStrategyId?: string | undefined;
  namespaces: string[];
  createdAt: Date;
  timestamp?: Date | undefined;
  metadata?: { [key: string]: MemoryRecordMetadataValue | undefined } | undefined;
  expiresAt?: Date | undefined;
}
export interface GetMemoryRecordOutput {
  memoryRecord: MemoryRecord;
}
export interface GetPaymentInstrumentRequest {
  userId?: string | undefined;
  agentName?: string | undefined;
  paymentManagerArn: string;
  paymentConnectorId?: string | undefined;
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
  userId?: string | undefined;
  agentName?: string | undefined;
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
  userId?: string | undefined;
  agentName?: string | undefined;
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
  | { text: string | redacted.Redacted<string>; configurationBundle?: undefined }
  | { text?: undefined; configurationBundle: SystemPromptConfigurationBundle };
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
  | { stringValue: string; doubleValue?: undefined; booleanValue?: undefined }
  | { stringValue?: undefined; doubleValue: number; booleanValue?: undefined }
  | { stringValue?: undefined; doubleValue?: undefined; booleanValue: boolean };
export interface CloudWatchLogsFilter {
  key: string;
  operator: CloudWatchLogsFilterOperator;
  value: FilterValue;
}
export type CloudWatchLogsFilterList = CloudWatchLogsFilter[];
export interface CloudWatchLogsRule {
  filters?: CloudWatchLogsFilter[] | undefined;
}
export interface CloudWatchLogsTraceConfig {
  logGroupArns: string[];
  serviceNames: string[];
  startTime: Date;
  endTime: Date;
  rule?: CloudWatchLogsRule | undefined;
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
      cloudwatchLogs?: undefined;
      batchEvaluation?: undefined;
      onlineEvaluation?: undefined;
    }
  | {
      sessionSpans?: undefined;
      cloudwatchLogs: CloudWatchLogsTraceConfig;
      batchEvaluation?: undefined;
      onlineEvaluation?: undefined;
    }
  | {
      sessionSpans?: undefined;
      cloudwatchLogs?: undefined;
      batchEvaluation: BatchEvaluationTraceConfig;
      onlineEvaluation?: undefined;
    }
  | {
      sessionSpans?: undefined;
      cloudwatchLogs?: undefined;
      batchEvaluation?: undefined;
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
  evaluationConfig?: RecommendationEvaluationConfig | undefined;
}
export type RecommendationToolName = string;
export type ToolDescriptionText = string | redacted.Redacted<string>;
export type ToolDescriptionConfig = { text: string | redacted.Redacted<string> };
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
  | { toolDescriptionText: ToolDescriptionTextInput; configurationBundle?: undefined }
  | { toolDescriptionText?: undefined; configurationBundle: ToolDescriptionConfigurationBundle };
export interface ToolDescriptionRecommendationConfig {
  toolDescription: ToolDescriptionSource;
  agentTraces: AgentTracesConfig;
}
export type RecommendationConfig =
  | {
      systemPromptRecommendationConfig: SystemPromptRecommendationConfig;
      toolDescriptionRecommendationConfig?: undefined;
    }
  | {
      systemPromptRecommendationConfig?: undefined;
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
  recommendedSystemPrompt?: string | redacted.Redacted<string> | undefined;
  configurationBundle?: RecommendationResultConfigurationBundle | undefined;
  explanation?: string | undefined;
  errorCode?: string | undefined;
  errorMessage?: string | undefined;
}
export interface ToolDescriptionOutput {
  toolName: string;
  recommendedToolDescription?: string | redacted.Redacted<string> | undefined;
  explanation?: string | undefined;
}
export type ToolDescriptionResultList = ToolDescriptionOutput[];
export interface ToolDescriptionRecommendationResult {
  tools?: ToolDescriptionOutput[] | undefined;
  configurationBundle?: RecommendationResultConfigurationBundle | undefined;
  errorCode?: string | undefined;
  errorMessage?: string | undefined;
}
export type RecommendationResult =
  | {
      systemPromptRecommendationResult: SystemPromptRecommendationResult;
      toolDescriptionRecommendationResult?: undefined;
    }
  | {
      systemPromptRecommendationResult?: undefined;
      toolDescriptionRecommendationResult: ToolDescriptionRecommendationResult;
    };
export interface GetRecommendationResponse {
  recommendationId: string;
  recommendationArn: string;
  name: string;
  description?: string | undefined;
  type: RecommendationType;
  recommendationConfig: RecommendationConfig;
  status: RecommendationStatus;
  createdAt: Date;
  updatedAt: Date;
  recommendationResult?: RecommendationResult | undefined;
  kmsKeyArn?: string | undefined;
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
  sessionUri?: string | undefined;
  resourceOauth2ReturnUrl?: string | undefined;
  forceAuthentication?: boolean | undefined;
  customParameters?: { [key: string]: string | redacted.Redacted<string> | undefined } | undefined;
  customState?: string | redacted.Redacted<string> | undefined;
  resources?: string[] | undefined;
  audiences?: string[] | undefined;
}
export type AuthorizationUrlType = string | redacted.Redacted<string>;
export type AccessTokenType = string | redacted.Redacted<string>;
export type SessionStatus = "IN_PROGRESS" | "FAILED" | (string & {});
export interface GetResourceOauth2TokenResponse {
  authorizationUrl?: string | redacted.Redacted<string> | undefined;
  accessToken?: string | redacted.Redacted<string> | undefined;
  sessionUri?: string | undefined;
  sessionStatus?: SessionStatus | undefined;
}
export type PaymentHttpMethodType = "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | (string & {});
export type PaymentRequestHostType = string;
export type PaymentRequestPathType = string;
export type CoinbaseCdpPaymentRequestBodyType = string;
export interface CoinbaseCdpTokenRequestInput {
  requestMethod: PaymentHttpMethodType;
  requestHost?: string | undefined;
  requestPath: string;
  includeWalletAuthToken?: boolean | undefined;
  requestBody?: string | undefined;
}
export type StripePrivyRequestHostType = string;
export type StripePrivyRequestPathType = string;
export type StripePrivyRequestBodyType = string | redacted.Redacted<string>;
export interface StripePrivyTokenRequestInput {
  requestHost?: string | undefined;
  requestPath: string;
  requestBody: string | redacted.Redacted<string>;
  includeAuthorizationSignature?: boolean | undefined;
}
export type PaymentTokenRequestInput =
  | { coinbaseCdpTokenRequest: CoinbaseCdpTokenRequestInput; stripePrivyTokenRequest?: undefined }
  | { coinbaseCdpTokenRequest?: undefined; stripePrivyTokenRequest: StripePrivyTokenRequestInput };
export interface GetResourcePaymentTokenRequest {
  workloadIdentityToken: string | redacted.Redacted<string>;
  resourceCredentialProviderName: string;
  paymentTokenRequest: PaymentTokenRequestInput;
}
export type CoinbaseCdpPaymentJwtTokenType = string | redacted.Redacted<string>;
export interface CoinbaseCdpTokenResponseOutput {
  bearerToken: string | redacted.Redacted<string>;
  walletAuthToken?: string | redacted.Redacted<string> | undefined;
}
export type StripePrivyAuthorizationSignatureType = string | redacted.Redacted<string>;
export type StripePrivyAppIdType = string;
export type StripePrivyBasicAuthTokenType = string | redacted.Redacted<string>;
export interface StripePrivyTokenResponseOutput {
  authorizationSignature?: string | redacted.Redacted<string> | undefined;
  requestExpiry?: number | undefined;
  appId: string;
  basicAuthToken: string | redacted.Redacted<string>;
}
export type PaymentTokenResponseOutput =
  | {
      coinbaseCdpTokenResponse: CoinbaseCdpTokenResponseOutput;
      stripePrivyTokenResponse?: undefined;
    }
  | {
      coinbaseCdpTokenResponse?: undefined;
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
  | { conversational: Conversational; json?: undefined }
  | { conversational?: undefined; json: MemoryJsonData };
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
  sessionId?: string | undefined;
  extractionConfig?: ExtractionConfig | undefined;
  metadata?: { [key: string]: MetadataValue | undefined } | undefined;
  clientToken?: string | undefined;
}
export interface IngestDataOutput {
  sessionId: string;
}
export type MimeType = string;
export type StringType = string;
export type Body = Uint8Array | redacted.Redacted<Uint8Array>;
export interface InvokeAgentRuntimeRequest {
  contentType?: string | undefined;
  accept?: string | undefined;
  mcpSessionId?: string | undefined;
  runtimeSessionId?: string | undefined;
  mcpProtocolVersion?: string | undefined;
  mcpMethod?: string | undefined;
  mcpName?: string | undefined;
  runtimeUserId?: string | undefined;
  traceId?: string | undefined;
  traceParent?: string | undefined;
  traceState?: string | undefined;
  baggage?: string | undefined;
  agentRuntimeArn: string;
  qualifier?: string | undefined;
  accountId?: string | undefined;
  payload: T.StreamingInputBody;
}
export interface InvokeAgentRuntimeResponse {
  runtimeSessionId?: string | undefined;
  sessionEndpointUrl?: string | undefined;
  mcpSessionId?: string | undefined;
  mcpProtocolVersion?: string | undefined;
  traceId?: string | undefined;
  traceParent?: string | undefined;
  traceState?: string | undefined;
  baggage?: string | undefined;
  contentType: string;
  response?: T.StreamingOutputBody | undefined;
  statusCode?: number | undefined;
}
export interface InvokeAgentRuntimeCommandRequestBody {
  command: string;
  timeout?: number | undefined;
}
export interface InvokeAgentRuntimeCommandRequest {
  contentType?: string | undefined;
  accept?: string | undefined;
  runtimeSessionId?: string | undefined;
  traceId?: string | undefined;
  traceParent?: string | undefined;
  traceState?: string | undefined;
  baggage?: string | undefined;
  agentRuntimeArn: string;
  qualifier?: string | undefined;
  accountId?: string | undefined;
  body: InvokeAgentRuntimeCommandRequestBody;
}
export interface ContentStartEvent {}
export interface ContentDeltaEvent {
  stdout?: string | undefined;
  stderr?: string | undefined;
}
export type CommandExecutionStatus = "COMPLETED" | "TIMED_OUT" | (string & {});
export interface ContentStopEvent {
  exitCode: number;
  status: CommandExecutionStatus;
}
export interface ResponseChunk {
  contentStart?: ContentStartEvent | undefined;
  contentDelta?: ContentDeltaEvent | undefined;
  contentStop?: ContentStopEvent | undefined;
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
      accessDeniedException?: undefined;
      internalServerException?: undefined;
      resourceNotFoundException?: undefined;
      serviceQuotaExceededException?: undefined;
      throttlingException?: undefined;
      validationException?: undefined;
      runtimeClientError?: undefined;
    }
  | {
      chunk?: undefined;
      accessDeniedException: AccessDeniedException;
      internalServerException?: undefined;
      resourceNotFoundException?: undefined;
      serviceQuotaExceededException?: undefined;
      throttlingException?: undefined;
      validationException?: undefined;
      runtimeClientError?: undefined;
    }
  | {
      chunk?: undefined;
      accessDeniedException?: undefined;
      internalServerException: InternalServerException;
      resourceNotFoundException?: undefined;
      serviceQuotaExceededException?: undefined;
      throttlingException?: undefined;
      validationException?: undefined;
      runtimeClientError?: undefined;
    }
  | {
      chunk?: undefined;
      accessDeniedException?: undefined;
      internalServerException?: undefined;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: undefined;
      throttlingException?: undefined;
      validationException?: undefined;
      runtimeClientError?: undefined;
    }
  | {
      chunk?: undefined;
      accessDeniedException?: undefined;
      internalServerException?: undefined;
      resourceNotFoundException?: undefined;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: undefined;
      validationException?: undefined;
      runtimeClientError?: undefined;
    }
  | {
      chunk?: undefined;
      accessDeniedException?: undefined;
      internalServerException?: undefined;
      resourceNotFoundException?: undefined;
      serviceQuotaExceededException?: undefined;
      throttlingException: ThrottlingException;
      validationException?: undefined;
      runtimeClientError?: undefined;
    }
  | {
      chunk?: undefined;
      accessDeniedException?: undefined;
      internalServerException?: undefined;
      resourceNotFoundException?: undefined;
      serviceQuotaExceededException?: undefined;
      throttlingException?: undefined;
      validationException: ValidationException;
      runtimeClientError?: undefined;
    }
  | {
      chunk?: undefined;
      accessDeniedException?: undefined;
      internalServerException?: undefined;
      resourceNotFoundException?: undefined;
      serviceQuotaExceededException?: undefined;
      throttlingException?: undefined;
      validationException?: undefined;
      runtimeClientError: RuntimeClientError;
    };
export interface InvokeAgentRuntimeCommandResponse {
  runtimeSessionId?: string | undefined;
  traceId?: string | undefined;
  traceParent?: string | undefined;
  traceState?: string | undefined;
  baggage?: string | undefined;
  contentType: string;
  statusCode?: number | undefined;
  stream: stream.Stream<InvokeAgentRuntimeCommandStreamOutput, Error, never>;
}
export type MouseButton = "LEFT" | "RIGHT" | "MIDDLE" | (string & {});
export interface MouseClickArguments {
  x: number;
  y: number;
  button?: MouseButton | undefined;
  clickCount?: number | undefined;
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
  button?: MouseButton | undefined;
}
export interface MouseScrollArguments {
  x: number;
  y: number;
  deltaX?: number | undefined;
  deltaY?: number | undefined;
}
export interface KeyTypeArguments {
  text: string;
}
export interface KeyPressArguments {
  key: string;
  presses?: number | undefined;
}
export type KeyList = string[];
export interface KeyShortcutArguments {
  keys: string[];
}
export type ScreenshotFormat = "PNG" | (string & {});
export interface ScreenshotArguments {
  format?: ScreenshotFormat | undefined;
}
export type BrowserAction =
  | {
      mouseClick: MouseClickArguments;
      mouseMove?: undefined;
      mouseDrag?: undefined;
      mouseScroll?: undefined;
      keyType?: undefined;
      keyPress?: undefined;
      keyShortcut?: undefined;
      screenshot?: undefined;
    }
  | {
      mouseClick?: undefined;
      mouseMove: MouseMoveArguments;
      mouseDrag?: undefined;
      mouseScroll?: undefined;
      keyType?: undefined;
      keyPress?: undefined;
      keyShortcut?: undefined;
      screenshot?: undefined;
    }
  | {
      mouseClick?: undefined;
      mouseMove?: undefined;
      mouseDrag: MouseDragArguments;
      mouseScroll?: undefined;
      keyType?: undefined;
      keyPress?: undefined;
      keyShortcut?: undefined;
      screenshot?: undefined;
    }
  | {
      mouseClick?: undefined;
      mouseMove?: undefined;
      mouseDrag?: undefined;
      mouseScroll: MouseScrollArguments;
      keyType?: undefined;
      keyPress?: undefined;
      keyShortcut?: undefined;
      screenshot?: undefined;
    }
  | {
      mouseClick?: undefined;
      mouseMove?: undefined;
      mouseDrag?: undefined;
      mouseScroll?: undefined;
      keyType: KeyTypeArguments;
      keyPress?: undefined;
      keyShortcut?: undefined;
      screenshot?: undefined;
    }
  | {
      mouseClick?: undefined;
      mouseMove?: undefined;
      mouseDrag?: undefined;
      mouseScroll?: undefined;
      keyType?: undefined;
      keyPress: KeyPressArguments;
      keyShortcut?: undefined;
      screenshot?: undefined;
    }
  | {
      mouseClick?: undefined;
      mouseMove?: undefined;
      mouseDrag?: undefined;
      mouseScroll?: undefined;
      keyType?: undefined;
      keyPress?: undefined;
      keyShortcut: KeyShortcutArguments;
      screenshot?: undefined;
    }
  | {
      mouseClick?: undefined;
      mouseMove?: undefined;
      mouseDrag?: undefined;
      mouseScroll?: undefined;
      keyType?: undefined;
      keyPress?: undefined;
      keyShortcut?: undefined;
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
  error?: string | undefined;
}
export interface MouseMoveResult {
  status: BrowserActionStatus;
  error?: string | undefined;
}
export interface MouseDragResult {
  status: BrowserActionStatus;
  error?: string | undefined;
}
export interface MouseScrollResult {
  status: BrowserActionStatus;
  error?: string | undefined;
}
export interface KeyTypeResult {
  status: BrowserActionStatus;
  error?: string | undefined;
}
export interface KeyPressResult {
  status: BrowserActionStatus;
  error?: string | undefined;
}
export interface KeyShortcutResult {
  status: BrowserActionStatus;
  error?: string | undefined;
}
export interface ScreenshotResult {
  status: BrowserActionStatus;
  error?: string | undefined;
  data?: Uint8Array | undefined;
}
export type BrowserActionResult =
  | {
      mouseClick: MouseClickResult;
      mouseMove?: undefined;
      mouseDrag?: undefined;
      mouseScroll?: undefined;
      keyType?: undefined;
      keyPress?: undefined;
      keyShortcut?: undefined;
      screenshot?: undefined;
    }
  | {
      mouseClick?: undefined;
      mouseMove: MouseMoveResult;
      mouseDrag?: undefined;
      mouseScroll?: undefined;
      keyType?: undefined;
      keyPress?: undefined;
      keyShortcut?: undefined;
      screenshot?: undefined;
    }
  | {
      mouseClick?: undefined;
      mouseMove?: undefined;
      mouseDrag: MouseDragResult;
      mouseScroll?: undefined;
      keyType?: undefined;
      keyPress?: undefined;
      keyShortcut?: undefined;
      screenshot?: undefined;
    }
  | {
      mouseClick?: undefined;
      mouseMove?: undefined;
      mouseDrag?: undefined;
      mouseScroll: MouseScrollResult;
      keyType?: undefined;
      keyPress?: undefined;
      keyShortcut?: undefined;
      screenshot?: undefined;
    }
  | {
      mouseClick?: undefined;
      mouseMove?: undefined;
      mouseDrag?: undefined;
      mouseScroll?: undefined;
      keyType: KeyTypeResult;
      keyPress?: undefined;
      keyShortcut?: undefined;
      screenshot?: undefined;
    }
  | {
      mouseClick?: undefined;
      mouseMove?: undefined;
      mouseDrag?: undefined;
      mouseScroll?: undefined;
      keyType?: undefined;
      keyPress: KeyPressResult;
      keyShortcut?: undefined;
      screenshot?: undefined;
    }
  | {
      mouseClick?: undefined;
      mouseMove?: undefined;
      mouseDrag?: undefined;
      mouseScroll?: undefined;
      keyType?: undefined;
      keyPress?: undefined;
      keyShortcut: KeyShortcutResult;
      screenshot?: undefined;
    }
  | {
      mouseClick?: undefined;
      mouseMove?: undefined;
      mouseDrag?: undefined;
      mouseScroll?: undefined;
      keyType?: undefined;
      keyPress?: undefined;
      keyShortcut?: undefined;
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
export type ProgrammingLanguage = "python" | "javascript" | "typescript" | (string & {});
export type StringList = string[];
export interface InputContentBlock {
  path: string;
  text?: string | undefined;
  blob?: Uint8Array | redacted.Redacted<Uint8Array> | undefined;
}
export type InputContentBlockList = InputContentBlock[];
export type LanguageRuntime = "nodejs" | "deno" | "python" | (string & {});
export interface ToolArguments {
  code?: string | undefined;
  language?: ProgrammingLanguage | undefined;
  clearContext?: boolean | undefined;
  command?: string | undefined;
  path?: string | undefined;
  paths?: string[] | undefined;
  content?: InputContentBlock[] | undefined;
  directoryPath?: string | undefined;
  taskId?: string | undefined;
  runtime?: LanguageRuntime | undefined;
}
export interface InvokeCodeInterpreterRequest {
  codeInterpreterIdentifier: string;
  sessionId?: string | undefined;
  traceId?: string | undefined;
  traceParent?: string | undefined;
  name: ToolName;
  arguments?: ToolArguments | undefined;
}
export type ContentBlockType = "text" | "image" | "resource" | "resource_link" | (string & {});
export type ResourceContentType = "text" | "blob" | (string & {});
export interface ResourceContent {
  type: ResourceContentType;
  uri?: string | undefined;
  mimeType?: string | undefined;
  text?: string | undefined;
  blob?: Uint8Array | undefined;
}
export interface ContentBlock {
  type: ContentBlockType;
  text?: string | undefined;
  data?: Uint8Array | undefined;
  mimeType?: string | undefined;
  uri?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  size?: number | undefined;
  resource?: ResourceContent | undefined;
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
  taskId?: string | undefined;
  taskStatus?: TaskStatus | undefined;
  stdout?: string | undefined;
  stderr?: string | undefined;
  exitCode?: number | undefined;
  executionTime?: number | undefined;
}
export interface CodeInterpreterResult {
  content: ContentBlock[];
  structuredContent?: ToolResultStructuredContent | undefined;
  isError?: boolean | undefined;
}
export type CodeInterpreterStreamOutput =
  | {
      result: CodeInterpreterResult;
      accessDeniedException?: undefined;
      conflictException?: undefined;
      internalServerException?: undefined;
      resourceNotFoundException?: undefined;
      serviceQuotaExceededException?: undefined;
      throttlingException?: undefined;
      validationException?: undefined;
    }
  | {
      result?: undefined;
      accessDeniedException: AccessDeniedException;
      conflictException?: undefined;
      internalServerException?: undefined;
      resourceNotFoundException?: undefined;
      serviceQuotaExceededException?: undefined;
      throttlingException?: undefined;
      validationException?: undefined;
    }
  | {
      result?: undefined;
      accessDeniedException?: undefined;
      conflictException: ConflictException;
      internalServerException?: undefined;
      resourceNotFoundException?: undefined;
      serviceQuotaExceededException?: undefined;
      throttlingException?: undefined;
      validationException?: undefined;
    }
  | {
      result?: undefined;
      accessDeniedException?: undefined;
      conflictException?: undefined;
      internalServerException: InternalServerException;
      resourceNotFoundException?: undefined;
      serviceQuotaExceededException?: undefined;
      throttlingException?: undefined;
      validationException?: undefined;
    }
  | {
      result?: undefined;
      accessDeniedException?: undefined;
      conflictException?: undefined;
      internalServerException?: undefined;
      resourceNotFoundException: ResourceNotFoundException;
      serviceQuotaExceededException?: undefined;
      throttlingException?: undefined;
      validationException?: undefined;
    }
  | {
      result?: undefined;
      accessDeniedException?: undefined;
      conflictException?: undefined;
      internalServerException?: undefined;
      resourceNotFoundException?: undefined;
      serviceQuotaExceededException: ServiceQuotaExceededException;
      throttlingException?: undefined;
      validationException?: undefined;
    }
  | {
      result?: undefined;
      accessDeniedException?: undefined;
      conflictException?: undefined;
      internalServerException?: undefined;
      resourceNotFoundException?: undefined;
      serviceQuotaExceededException?: undefined;
      throttlingException: ThrottlingException;
      validationException?: undefined;
    }
  | {
      result?: undefined;
      accessDeniedException?: undefined;
      conflictException?: undefined;
      internalServerException?: undefined;
      resourceNotFoundException?: undefined;
      serviceQuotaExceededException?: undefined;
      throttlingException?: undefined;
      validationException: ValidationException;
    };
export interface InvokeCodeInterpreterResponse {
  sessionId?: string | undefined;
  stream: stream.Stream<CodeInterpreterStreamOutput, Error, never>;
}
export type HarnessArn = string;
export type HarnessEndpointName = string;
export type HarnessConversationRole = "user" | "assistant" | (string & {});
export type SensitiveText = string | redacted.Redacted<string>;
export type HarnessToolName = string;
export type HarnessToolUseId = string;
export type SensitiveJson = unknown;
export type HarnessToolUseType = "tool_use" | "server_tool_use" | "mcp_tool_use" | (string & {});
export interface HarnessToolUseBlock {
  name: string;
  toolUseId: string;
  input: any;
  type?: HarnessToolUseType | undefined;
  serverName?: string | undefined;
}
export type HarnessToolResultContentBlock =
  | { text: string | redacted.Redacted<string>; json?: undefined }
  | { text?: undefined; json: any };
export type HarnessToolResultContentBlocks = HarnessToolResultContentBlock[];
export type HarnessToolUseStatus = "success" | "error" | (string & {});
export interface HarnessToolResultBlock {
  toolUseId: string;
  content: HarnessToolResultContentBlock[];
  status?: HarnessToolUseStatus | undefined;
  type?: HarnessToolUseType | undefined;
}
export interface HarnessReasoningTextBlock {
  text: string;
  signature?: string | undefined;
}
export type HarnessReasoningContentBlock =
  | { reasoningText: HarnessReasoningTextBlock; redactedContent?: undefined }
  | { reasoningText?: undefined; redactedContent: Uint8Array };
export type HarnessContentBlock =
  | {
      text: string | redacted.Redacted<string>;
      toolUse?: undefined;
      toolResult?: undefined;
      reasoningContent?: undefined;
    }
  | {
      text?: undefined;
      toolUse: HarnessToolUseBlock;
      toolResult?: undefined;
      reasoningContent?: undefined;
    }
  | {
      text?: undefined;
      toolUse?: undefined;
      toolResult: HarnessToolResultBlock;
      reasoningContent?: undefined;
    }
  | {
      text?: undefined;
      toolUse?: undefined;
      toolResult?: undefined;
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
  maxTokens?: number | undefined;
  temperature?: number | undefined;
  topP?: number | undefined;
  apiFormat?: HarnessBedrockApiFormat | undefined;
  additionalParams?: any | undefined;
}
export type ApiKeyArn = string;
export type HarnessOpenAiApiBase = string | redacted.Redacted<string>;
export type HarnessOpenAiApiFormat = "chat_completions" | "responses" | (string & {});
export interface HarnessOpenAiModelConfig {
  modelId: string;
  apiKeyArn: string;
  apiBase?: string | redacted.Redacted<string> | undefined;
  maxTokens?: number | undefined;
  temperature?: number | undefined;
  topP?: number | undefined;
  apiFormat?: HarnessOpenAiApiFormat | undefined;
  additionalParams?: any | undefined;
}
export type TopK = number;
export interface HarnessGeminiModelConfig {
  modelId: string;
  apiKeyArn: string;
  maxTokens?: number | undefined;
  temperature?: number | undefined;
  topP?: number | undefined;
  topK?: number | undefined;
  additionalParams?: any | undefined;
}
export type HarnessLiteLlmApiBase = string | redacted.Redacted<string>;
export interface HarnessLiteLlmModelConfig {
  modelId: string;
  apiKeyArn?: string | undefined;
  apiBase?: string | redacted.Redacted<string> | undefined;
  maxTokens?: number | undefined;
  temperature?: number | undefined;
  topP?: number | undefined;
  additionalParams?: any | undefined;
}
export type HarnessModelConfiguration =
  | {
      bedrockModelConfig: HarnessBedrockModelConfig;
      openAiModelConfig?: undefined;
      geminiModelConfig?: undefined;
      liteLlmModelConfig?: undefined;
    }
  | {
      bedrockModelConfig?: undefined;
      openAiModelConfig: HarnessOpenAiModelConfig;
      geminiModelConfig?: undefined;
      liteLlmModelConfig?: undefined;
    }
  | {
      bedrockModelConfig?: undefined;
      openAiModelConfig?: undefined;
      geminiModelConfig: HarnessGeminiModelConfig;
      liteLlmModelConfig?: undefined;
    }
  | {
      bedrockModelConfig?: undefined;
      openAiModelConfig?: undefined;
      geminiModelConfig?: undefined;
      liteLlmModelConfig: HarnessLiteLlmModelConfig;
    };
export type HarnessSystemContentBlock = { text: string | redacted.Redacted<string> };
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
  headers?: { [key: string]: string | undefined } | undefined;
}
export type HarnessBrowserArn = string;
export interface HarnessAgentCoreBrowserConfig {
  browserArn?: string | undefined;
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
  customParameters?: { [key: string]: string | redacted.Redacted<string> | undefined } | undefined;
  grantType?: OAuthGrantType | undefined;
  defaultReturnUrl?: string | undefined;
}
export type HarnessGatewayOutboundAuth =
  | { awsIam: Record<string, never>; none?: undefined; oauth?: undefined }
  | { awsIam?: undefined; none: Record<string, never>; oauth?: undefined }
  | { awsIam?: undefined; none?: undefined; oauth: OAuthCredentialProvider };
export interface HarnessAgentCoreGatewayConfig {
  gatewayArn: string;
  outboundAuth?: HarnessGatewayOutboundAuth | undefined;
}
export type HarnessInlineFunctionDescription = string | redacted.Redacted<string>;
export interface HarnessInlineFunctionConfig {
  description: string | redacted.Redacted<string>;
  inputSchema: any;
}
export type HarnessCodeInterpreterArn = string;
export interface HarnessAgentCoreCodeInterpreterConfig {
  codeInterpreterArn?: string | undefined;
}
export type HarnessToolConfiguration =
  | {
      remoteMcp: HarnessRemoteMcpConfig;
      agentCoreBrowser?: undefined;
      agentCoreGateway?: undefined;
      inlineFunction?: undefined;
      agentCoreCodeInterpreter?: undefined;
    }
  | {
      remoteMcp?: undefined;
      agentCoreBrowser: HarnessAgentCoreBrowserConfig;
      agentCoreGateway?: undefined;
      inlineFunction?: undefined;
      agentCoreCodeInterpreter?: undefined;
    }
  | {
      remoteMcp?: undefined;
      agentCoreBrowser?: undefined;
      agentCoreGateway: HarnessAgentCoreGatewayConfig;
      inlineFunction?: undefined;
      agentCoreCodeInterpreter?: undefined;
    }
  | {
      remoteMcp?: undefined;
      agentCoreBrowser?: undefined;
      agentCoreGateway?: undefined;
      inlineFunction: HarnessInlineFunctionConfig;
      agentCoreCodeInterpreter?: undefined;
    }
  | {
      remoteMcp?: undefined;
      agentCoreBrowser?: undefined;
      agentCoreGateway?: undefined;
      inlineFunction?: undefined;
      agentCoreCodeInterpreter: HarnessAgentCoreCodeInterpreterConfig;
    };
export interface HarnessTool {
  type: HarnessToolType;
  name?: string | undefined;
  config?: HarnessToolConfiguration | undefined;
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
  username?: string | undefined;
}
export interface HarnessSkillGitSource {
  url: string;
  path?: string | undefined;
  auth?: HarnessSkillGitAuth | undefined;
}
export type HarnessAwsSkillPath = string;
export type HarnessAwsSkillPaths = string[];
export interface HarnessSkillAwsSkillsSource {
  paths?: string[] | undefined;
}
export type HarnessSkill =
  | { path: string; s3?: undefined; git?: undefined; awsSkills?: undefined }
  | { path?: undefined; s3: HarnessSkillS3Source; git?: undefined; awsSkills?: undefined }
  | { path?: undefined; s3?: undefined; git: HarnessSkillGitSource; awsSkills?: undefined }
  | { path?: undefined; s3?: undefined; git?: undefined; awsSkills: HarnessSkillAwsSkillsSource };
export type HarnessSkills = HarnessSkill[];
export type HarnessAllowedTool = string;
export type HarnessAllowedTools = string[];
export interface InvokeHarnessRequest {
  harnessArn: string;
  qualifier?: string | undefined;
  runtimeSessionId: string;
  runtimeUserId?: string | undefined;
  traceParent?: string | undefined;
  traceState?: string | undefined;
  traceId?: string | undefined;
  baggage?: string | undefined;
  messages: HarnessMessage[];
  model?: HarnessModelConfiguration | undefined;
  systemPrompt?: HarnessSystemContentBlock[] | undefined;
  tools?: HarnessTool[] | undefined;
  skills?: HarnessSkill[] | undefined;
  allowedTools?: string[] | undefined;
  maxIterations?: number | undefined;
  maxTokens?: number | undefined;
  timeoutSeconds?: number | undefined;
  actorId?: string | undefined;
}
export interface HarnessMessageStartEvent {
  role: HarnessConversationRole;
}
export interface HarnessToolUseBlockStart {
  toolUseId: string;
  name: string;
  type?: HarnessToolUseType | undefined;
  serverName?: string | undefined;
}
export interface HarnessToolResultBlockStart {
  toolUseId: string;
  status?: HarnessToolUseStatus | undefined;
}
export type HarnessContentBlockStart =
  | { toolUse: HarnessToolUseBlockStart; toolResult?: undefined }
  | { toolUse?: undefined; toolResult: HarnessToolResultBlockStart };
export interface HarnessContentBlockStartEvent {
  contentBlockIndex: number;
  start: HarnessContentBlockStart;
}
export interface HarnessToolUseBlockDelta {
  input: string | redacted.Redacted<string>;
}
export type HarnessToolResultBlockDelta =
  | { text: string | redacted.Redacted<string>; json?: undefined }
  | { text?: undefined; json: any };
export type HarnessToolResultBlocksDelta = HarnessToolResultBlockDelta[];
export type HarnessReasoningContentBlockDelta =
  | { text: string; redactedContent?: undefined; signature?: undefined }
  | {
      text?: undefined;
      redactedContent: Uint8Array | redacted.Redacted<Uint8Array>;
      signature?: undefined;
    }
  | { text?: undefined; redactedContent?: undefined; signature: string };
export interface HarnessToolResultMetadataBlockDelta {
  metadata: string | redacted.Redacted<string>;
}
export type HarnessContentBlockDelta =
  | {
      text: string | redacted.Redacted<string>;
      toolUse?: undefined;
      toolResult?: undefined;
      reasoningContent?: undefined;
      toolResultMetadata?: undefined;
    }
  | {
      text?: undefined;
      toolUse: HarnessToolUseBlockDelta;
      toolResult?: undefined;
      reasoningContent?: undefined;
      toolResultMetadata?: undefined;
    }
  | {
      text?: undefined;
      toolUse?: undefined;
      toolResult: HarnessToolResultBlockDelta[];
      reasoningContent?: undefined;
      toolResultMetadata?: undefined;
    }
  | {
      text?: undefined;
      toolUse?: undefined;
      toolResult?: undefined;
      reasoningContent: HarnessReasoningContentBlockDelta;
      toolResultMetadata?: undefined;
    }
  | {
      text?: undefined;
      toolUse?: undefined;
      toolResult?: undefined;
      reasoningContent?: undefined;
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
  | "hook_stopped"
  | (string & {});
export interface HarnessMessageStopEvent {
  stopReason: HarnessStopReason;
}
export interface HarnessTokenUsage {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cacheReadInputTokens?: number | undefined;
  cacheWriteInputTokens?: number | undefined;
}
export interface HarnessStreamMetrics {
  latencyMs: number;
}
export interface HarnessMetadataEvent {
  usage: HarnessTokenUsage;
  metrics: HarnessStreamMetrics;
}
export type HarnessHookEventId = string;
export type HarnessHookName = string;
export type HarnessHookEventType =
  | "before_tool_call"
  | "after_tool_call"
  | "before_invocation"
  | "after_invocation"
  | (string & {});
export type HarnessHookDecision = "allow" | "deny" | (string & {});
export interface HarnessHookEvent {
  hookEventId: string;
  name: string;
  type: HarnessHookEventType;
  decision?: HarnessHookDecision | undefined;
  reason?: string | undefined;
}
export type InvokeHarnessStreamOutput =
  | {
      messageStart: HarnessMessageStartEvent;
      contentBlockStart?: undefined;
      contentBlockDelta?: undefined;
      contentBlockStop?: undefined;
      messageStop?: undefined;
      metadata?: undefined;
      internalServerException?: undefined;
      validationException?: undefined;
      runtimeClientError?: undefined;
      hookEvent?: undefined;
    }
  | {
      messageStart?: undefined;
      contentBlockStart: HarnessContentBlockStartEvent;
      contentBlockDelta?: undefined;
      contentBlockStop?: undefined;
      messageStop?: undefined;
      metadata?: undefined;
      internalServerException?: undefined;
      validationException?: undefined;
      runtimeClientError?: undefined;
      hookEvent?: undefined;
    }
  | {
      messageStart?: undefined;
      contentBlockStart?: undefined;
      contentBlockDelta: HarnessContentBlockDeltaEvent;
      contentBlockStop?: undefined;
      messageStop?: undefined;
      metadata?: undefined;
      internalServerException?: undefined;
      validationException?: undefined;
      runtimeClientError?: undefined;
      hookEvent?: undefined;
    }
  | {
      messageStart?: undefined;
      contentBlockStart?: undefined;
      contentBlockDelta?: undefined;
      contentBlockStop: HarnessContentBlockStopEvent;
      messageStop?: undefined;
      metadata?: undefined;
      internalServerException?: undefined;
      validationException?: undefined;
      runtimeClientError?: undefined;
      hookEvent?: undefined;
    }
  | {
      messageStart?: undefined;
      contentBlockStart?: undefined;
      contentBlockDelta?: undefined;
      contentBlockStop?: undefined;
      messageStop: HarnessMessageStopEvent;
      metadata?: undefined;
      internalServerException?: undefined;
      validationException?: undefined;
      runtimeClientError?: undefined;
      hookEvent?: undefined;
    }
  | {
      messageStart?: undefined;
      contentBlockStart?: undefined;
      contentBlockDelta?: undefined;
      contentBlockStop?: undefined;
      messageStop?: undefined;
      metadata: HarnessMetadataEvent;
      internalServerException?: undefined;
      validationException?: undefined;
      runtimeClientError?: undefined;
      hookEvent?: undefined;
    }
  | {
      messageStart?: undefined;
      contentBlockStart?: undefined;
      contentBlockDelta?: undefined;
      contentBlockStop?: undefined;
      messageStop?: undefined;
      metadata?: undefined;
      internalServerException: InternalServerException;
      validationException?: undefined;
      runtimeClientError?: undefined;
      hookEvent?: undefined;
    }
  | {
      messageStart?: undefined;
      contentBlockStart?: undefined;
      contentBlockDelta?: undefined;
      contentBlockStop?: undefined;
      messageStop?: undefined;
      metadata?: undefined;
      internalServerException?: undefined;
      validationException: ValidationException;
      runtimeClientError?: undefined;
      hookEvent?: undefined;
    }
  | {
      messageStart?: undefined;
      contentBlockStart?: undefined;
      contentBlockDelta?: undefined;
      contentBlockStop?: undefined;
      messageStop?: undefined;
      metadata?: undefined;
      internalServerException?: undefined;
      validationException?: undefined;
      runtimeClientError: RuntimeClientError;
      hookEvent?: undefined;
    }
  | {
      messageStart?: undefined;
      contentBlockStart?: undefined;
      contentBlockDelta?: undefined;
      contentBlockStop?: undefined;
      messageStop?: undefined;
      metadata?: undefined;
      internalServerException?: undefined;
      validationException?: undefined;
      runtimeClientError?: undefined;
      hookEvent: HarnessHookEvent;
    };
export interface InvokeHarnessResponse {
  stream: stream.Stream<InvokeHarnessStreamOutput, Error, never>;
}
export type WebSearchId = string;
export type DomainName = string;
export type DomainList = string[];
export interface DomainFilter {
  include?: string[] | undefined;
  exclude?: string[] | undefined;
}
export interface PublishedDateFilter {
  publishedAfter?: Date | undefined;
  publishedBefore?: Date | undefined;
}
export interface WebSearchFilters {
  domainFilter?: DomainFilter | undefined;
  publishedDateFilter?: PublishedDateFilter | undefined;
}
export interface InvokeWebSearchInput {
  webSearchId: string;
  searchQuery: string;
  maxResults?: number | undefined;
  filters?: WebSearchFilters | undefined;
}
export interface WebSearchResult {
  title?: string | undefined;
  url?: string | undefined;
  text: string;
  publishedAt?: Date | undefined;
}
export type WebSearchResultList = WebSearchResult[];
export interface InvokeWebSearchOutput {
  results: WebSearchResult[];
}
export interface ListABTestsRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface ABTestSummary {
  abTestId: string;
  abTestArn: string;
  name: string;
  status: ABTestStatus;
  executionStatus: ABTestExecutionStatus;
  description?: string | undefined;
  gatewayArn?: string | undefined;
  createdAt: Date;
  updatedAt: Date;
}
export type ABTestSummaryList = ABTestSummary[];
export interface ListABTestsResponse {
  abTests: ABTestSummary[];
  nextToken?: string | undefined;
}
export type MaxResults = number;
export type PaginationToken = string;
export interface ListActorsInput {
  memoryId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface ActorSummary {
  actorId: string;
}
export type ActorSummaryList = ActorSummary[];
export interface ListActorsOutput {
  actorSummaries: ActorSummary[];
  nextToken?: string | undefined;
}
export interface ListBatchEvaluationsRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface BatchEvaluationSummary {
  batchEvaluationId: string;
  batchEvaluationArn: string;
  batchEvaluationName: string;
  status: BatchEvaluationStatus;
  createdAt: Date;
  description?: string | undefined;
  evaluators?: Evaluator[] | undefined;
  insights?: Insight[] | undefined;
  evaluationResults?: EvaluationJobResults | undefined;
  errorDetails?: string[] | undefined;
  kmsKeyArn?: string | undefined;
  updatedAt?: Date | undefined;
}
export type BatchEvaluationSummaryList = BatchEvaluationSummary[];
export interface ListBatchEvaluationsResponse {
  batchEvaluations: BatchEvaluationSummary[];
  nextToken?: string | undefined;
}
export type NextToken = string;
export interface ListBrowserSessionsRequest {
  browserIdentifier: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  status?: BrowserSessionStatus | undefined;
}
export interface BrowserSessionSummary {
  browserIdentifier: string;
  sessionId: string;
  name?: string | undefined;
  status: BrowserSessionStatus;
  createdAt: Date;
  lastUpdatedAt?: Date | undefined;
}
export type BrowserSessionSummaries = BrowserSessionSummary[];
export interface ListBrowserSessionsResponse {
  items: BrowserSessionSummary[];
  nextToken?: string | undefined;
}
export interface ListCodeInterpreterSessionsRequest {
  codeInterpreterIdentifier: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  status?: CodeInterpreterSessionStatus | undefined;
}
export interface CodeInterpreterSessionSummary {
  codeInterpreterIdentifier: string;
  sessionId: string;
  name?: string | undefined;
  status: CodeInterpreterSessionStatus;
  createdAt: Date;
  lastUpdatedAt?: Date | undefined;
}
export type CodeInterpreterSessionSummaries = CodeInterpreterSessionSummary[];
export interface ListCodeInterpreterSessionsResponse {
  items: CodeInterpreterSessionSummary[];
  nextToken?: string | undefined;
}
export interface BranchFilter {
  name: string;
  includeParentBranches?: boolean | undefined;
}
export type LeftExpression = { metadataKey: string };
export type OperatorType = "EQUALS_TO" | "EXISTS" | "NOT_EXISTS" | (string & {});
export type RightExpression = { metadataValue: MetadataValue };
export interface EventMetadataFilterExpression {
  left: LeftExpression;
  operator: OperatorType;
  right?: RightExpression | undefined;
}
export type EventMetadataFilterList = EventMetadataFilterExpression[];
export interface FilterInput {
  branch?: BranchFilter | undefined;
  eventMetadata?: EventMetadataFilterExpression[] | undefined;
}
export interface ListEventsInput {
  memoryId: string;
  sessionId: string;
  actorId: string;
  includePayloads?: boolean | undefined;
  filter?: FilterInput | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type EventList = Event[];
export interface ListEventsOutput {
  events: Event[];
  nextToken?: string | undefined;
}
export type ExtractionJobStatus = "FAILED" | (string & {});
export interface ExtractionJobFilterInput {
  strategyId?: string | undefined;
  sessionId?: string | undefined;
  actorId?: string | undefined;
  status?: ExtractionJobStatus | undefined;
}
export interface ListMemoryExtractionJobsInput {
  memoryId: string;
  maxResults?: number | undefined;
  filter?: ExtractionJobFilterInput | undefined;
  nextToken?: string | undefined;
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
  status?: ExtractionJobStatus | undefined;
  failureReason?: string | undefined;
  strategyId?: string | undefined;
  sessionId?: string | undefined;
  actorId?: string | undefined;
}
export type ExtractionJobMetadataList = ExtractionJobMetadata[];
export interface ListMemoryExtractionJobsOutput {
  jobs: ExtractionJobMetadata[];
  nextToken?: string | undefined;
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
export type MemoryRecordRightExpression = { metadataValue: MemoryRecordMetadataValue };
export interface MemoryMetadataFilterExpression {
  left: MemoryRecordLeftExpression;
  operator: MemoryRecordOperatorType;
  right?: MemoryRecordRightExpression | undefined;
}
export type MemoryMetadataFilterList = MemoryMetadataFilterExpression[];
export interface ListMemoryRecordsInput {
  memoryId: string;
  namespace?: string | undefined;
  namespacePath?: string | undefined;
  memoryStrategyId?: string | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  metadataFilters?: MemoryMetadataFilterExpression[] | undefined;
}
export interface MemoryRecordSummary {
  memoryRecordId: string;
  content: MemoryContent;
  memoryStrategyId?: string | undefined;
  namespaces: string[];
  createdAt: Date;
  score?: number | undefined;
  timestamp?: Date | undefined;
  metadata?: { [key: string]: MemoryRecordMetadataValue | undefined } | undefined;
}
export type MemoryRecordSummaryList = MemoryRecordSummary[];
export interface ListMemoryRecordsOutput {
  memoryRecordSummaries: MemoryRecordSummary[];
  nextToken?: string | undefined;
}
export interface ListPaymentInstrumentsRequest {
  userId?: string | undefined;
  agentName?: string | undefined;
  paymentManagerArn: string;
  paymentConnectorId?: string | undefined;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
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
  nextToken?: string | undefined;
}
export interface ListPaymentSessionsRequest {
  userId?: string | undefined;
  agentName?: string | undefined;
  paymentManagerArn: string;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
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
  nextToken?: string | undefined;
}
export interface ListRecommendationsRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  statusFilter?: RecommendationStatus | undefined;
}
export interface RecommendationSummary {
  recommendationId: string;
  recommendationArn: string;
  name: string;
  description?: string | undefined;
  type: RecommendationType;
  status: RecommendationStatus;
  createdAt: Date;
  updatedAt: Date;
}
export type RecommendationSummaryList = RecommendationSummary[];
export interface ListRecommendationsResponse {
  recommendationSummaries: RecommendationSummary[];
  nextToken?: string | undefined;
}
export type EventFilterCondition = "HAS_EVENTS" | (string & {});
export interface SessionFilter {
  eventFilter?: EventFilterCondition | undefined;
}
export interface ListSessionsInput {
  memoryId: string;
  actorId: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
  filter?: SessionFilter | undefined;
}
export interface SessionSummary {
  sessionId: string;
  actorId: string;
  createdAt: Date;
}
export type SessionSummaryList = SessionSummary[];
export interface ListSessionsOutput {
  sessionSummaries: SessionSummary[];
  nextToken?: string | undefined;
}
export type PaymentType = "CRYPTO_X402" | "MPP" | (string & {});
export type PaymentDocument = unknown;
export type Permit2AllowanceLimit = string;
export interface CryptoX402PaymentInput {
  version: string;
  payload: any;
  permit2AllowanceLimit?: string | undefined;
}
export type Version = string;
export type WwwAuthenticateHeader = string;
export type WwwAuthenticateHeaderList = string[];
export interface MppPaymentInput {
  version: string;
  wwwAuthenticateHeaders: string[];
  buyerPaysGasFees?: boolean | undefined;
}
export type PaymentInput =
  | { cryptoX402: CryptoX402PaymentInput; mpp?: undefined }
  | { cryptoX402?: undefined; mpp: MppPaymentInput };
export interface ProcessPaymentRequest {
  userId?: string | undefined;
  agentName?: string | undefined;
  paymentManagerArn: string;
  paymentSessionId: string;
  paymentInstrumentId: string;
  paymentType: PaymentType;
  paymentInput: PaymentInput;
  clientToken?: string | undefined;
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
  | { cryptoX402: CryptoX402PaymentOutput; mpp?: undefined }
  | { cryptoX402?: undefined; mpp: MppPaymentOutput };
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
  memoryStrategyId?: string | undefined;
  topK?: number | undefined;
  metadataFilters?: MemoryMetadataFilterExpression[] | undefined;
}
export interface RetrieveMemoryRecordsInput {
  memoryId: string;
  namespace?: string | undefined;
  namespacePath?: string | undefined;
  searchCriteria: SearchCriteria;
  nextToken?: string | undefined;
  maxResults?: number | undefined;
}
export interface RetrieveMemoryRecordsOutput {
  memoryRecordSummaries: MemoryRecordSummary[];
  nextToken?: string | undefined;
}
export interface SaveBrowserSessionProfileRequest {
  traceId?: string | undefined;
  traceParent?: string | undefined;
  profileIdentifier: string;
  browserIdentifier: string;
  sessionId: string;
  clientToken?: string | undefined;
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
  maxResults?: number | undefined;
  filters?: any | undefined;
}
export type RegistryArn = string;
export type RegistryRecordArn = string;
export type RegistryRecordId = string;
export type RegistryRecordName = string;
export type Description = string | redacted.Redacted<string>;
export type DescriptorType = "MCP" | "A2A" | "CUSTOM" | "AGENT_SKILLS" | (string & {});
export type SchemaVersion = string;
export type InlineContent = string;
export interface ServerDefinition {
  schemaVersion?: string | undefined;
  inlineContent?: string | undefined;
}
export interface ToolsDefinition {
  protocolVersion?: string | undefined;
  inlineContent?: string | undefined;
}
export interface McpDescriptor {
  server: ServerDefinition;
  tools: ToolsDefinition;
}
export interface AgentCardDefinition {
  schemaVersion?: string | undefined;
  inlineContent?: string | undefined;
}
export interface A2aDescriptor {
  agentCard: AgentCardDefinition;
}
export interface CustomDescriptor {
  inlineContent?: string | undefined;
}
export interface SkillMdDefinition {
  inlineContent?: string | undefined;
}
export interface SkillDefinition {
  schemaVersion?: string | undefined;
  inlineContent?: string | undefined;
}
export interface AgentSkillsDescriptor {
  skillMd: SkillMdDefinition;
  skillDefinition?: SkillDefinition | undefined;
}
export interface Descriptors {
  mcp?: McpDescriptor | undefined;
  a2a?: A2aDescriptor | undefined;
  custom?: CustomDescriptor | undefined;
  agentSkills?: AgentSkillsDescriptor | undefined;
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
  description?: string | redacted.Redacted<string> | undefined;
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
  input?: GroundTruthTurnInput | undefined;
  expectedResponse?: EvaluationContent | undefined;
}
export type GroundTruthTurnList = GroundTruthTurn[];
export interface InlineGroundTruth {
  assertions?: EvaluationContent[] | undefined;
  expectedTrajectory?: EvaluationExpectedTrajectory | undefined;
  turns?: GroundTruthTurn[] | undefined;
}
export type GroundTruthSource = { inline: InlineGroundTruth };
export type StringMap = { [key: string]: string | undefined };
export interface SessionMetadataShape {
  sessionId: string;
  testScenarioId?: string | undefined;
  groundTruth?: GroundTruthSource | undefined;
  metadata?: { [key: string]: string | undefined } | undefined;
}
export type SessionMetadataList = SessionMetadataShape[];
export type EvaluationMetadata = { sessionMetadata: SessionMetadataShape[] };
export interface StartBatchEvaluationRequest {
  batchEvaluationName: string;
  evaluators?: Evaluator[] | undefined;
  insights?: Insight[] | undefined;
  dataSourceConfig: DataSourceConfig;
  clientToken?: string | undefined;
  evaluationMetadata?: EvaluationMetadata | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  kmsKeyArn?: string | undefined;
  description?: string | undefined;
  outputConfig?: OutputConfig | undefined;
}
export interface StartBatchEvaluationResponse {
  batchEvaluationId: string;
  batchEvaluationArn: string;
  batchEvaluationName: string;
  evaluators?: Evaluator[] | undefined;
  insights?: Insight[] | undefined;
  status: BatchEvaluationStatus;
  createdAt: Date;
  outputConfig?: OutputConfig | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
  kmsKeyArn?: string | undefined;
  description?: string | undefined;
}
export interface StartBrowserSessionRequest {
  traceId?: string | undefined;
  traceParent?: string | undefined;
  browserIdentifier: string;
  name?: string | undefined;
  sessionTimeoutSeconds?: number | undefined;
  viewPort?: ViewPort | undefined;
  extensions?: BrowserExtension[] | undefined;
  profileConfiguration?: BrowserProfileConfiguration | undefined;
  proxyConfiguration?: ProxyConfiguration | undefined;
  enterprisePolicies?: BrowserEnterprisePolicy[] | undefined;
  certificates?: Certificate[] | undefined;
  filesystemConfigurations?: ToolsFileSystemConfiguration[] | undefined;
  clientToken?: string | undefined;
}
export interface StartBrowserSessionResponse {
  browserIdentifier: string;
  sessionId: string;
  createdAt: Date;
  streams?: BrowserSessionStream | undefined;
}
export interface StartCodeInterpreterSessionRequest {
  traceId?: string | undefined;
  traceParent?: string | undefined;
  codeInterpreterIdentifier: string;
  name?: string | undefined;
  sessionTimeoutSeconds?: number | undefined;
  certificates?: Certificate[] | undefined;
  filesystemConfigurations?: ToolsFileSystemConfiguration[] | undefined;
  clientToken?: string | undefined;
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
  clientToken?: string | undefined;
}
export interface StartMemoryExtractionJobOutput {
  jobId: string;
}
export interface StartRecommendationRequest {
  name: string;
  description?: string | undefined;
  type: RecommendationType;
  recommendationConfig: RecommendationConfig;
  kmsKeyArn?: string | undefined;
  clientToken?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface StartRecommendationResponse {
  recommendationId: string;
  recommendationArn: string;
  name: string;
  description?: string | undefined;
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
  description?: string | undefined;
}
export interface StopBrowserSessionRequest {
  traceId?: string | undefined;
  traceParent?: string | undefined;
  browserIdentifier: string;
  sessionId: string;
  clientToken?: string | undefined;
}
export interface StopBrowserSessionResponse {
  browserIdentifier: string;
  sessionId: string;
  lastUpdatedAt: Date;
}
export interface StopCodeInterpreterSessionRequest {
  traceId?: string | undefined;
  traceParent?: string | undefined;
  codeInterpreterIdentifier: string;
  sessionId: string;
  clientToken?: string | undefined;
}
export interface StopCodeInterpreterSessionResponse {
  codeInterpreterIdentifier: string;
  sessionId: string;
  lastUpdatedAt: Date;
}
export interface StopRuntimeSessionRequest {
  runtimeSessionId: string;
  agentRuntimeArn: string;
  qualifier?: string | undefined;
  clientToken?: string | undefined;
}
export interface StopRuntimeSessionResponse {
  runtimeSessionId?: string | undefined;
  statusCode?: number | undefined;
}
export interface UpdateABTestRequest {
  abTestId: string;
  clientToken?: string | undefined;
  name?: string | undefined;
  description?: string | undefined;
  variants?: Variant[] | undefined;
  gatewayFilter?: GatewayFilter | undefined;
  evaluationConfig?: ABTestEvaluationConfig | undefined;
  roleArn?: string | undefined;
  executionStatus?: ABTestExecutionStatus | undefined;
}
export interface UpdateABTestResponse {
  abTestId: string;
  abTestArn: string;
  status: ABTestStatus;
  executionStatus: ABTestExecutionStatus;
  updatedAt: Date;
}
export interface AutomationStreamUpdate {
  streamStatus?: AutomationStreamStatus | undefined;
}
export type StreamUpdate = { automationStreamUpdate: AutomationStreamUpdate };
export interface UpdateBrowserStreamRequest {
  browserIdentifier: string;
  sessionId: string;
  streamUpdate: StreamUpdate;
  clientToken?: string | undefined;
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
  BatchCreateMemoryRecordsInput & RegionInput,
  BatchCreateMemoryRecordsOutput,
  BatchCreateMemoryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(34, __c1, 2) as any as S.Schema<BatchCreateMemoryRecordsInput>,
  output: __S(66, __c2, 2) as any as S.Schema<BatchCreateMemoryRecordsOutput>,
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
  telemetry: TELEMETRY,
  span: "BatchCreateMemoryRecords",
}));

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
  BatchDeleteMemoryRecordsInput & RegionInput,
  BatchDeleteMemoryRecordsOutput,
  BatchDeleteMemoryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(226, __c7, 2) as any as S.Schema<BatchDeleteMemoryRecordsInput>,
  output: __S(66, __c2, 2) as any as S.Schema<BatchDeleteMemoryRecordsOutput>,
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
  telemetry: TELEMETRY,
  span: "BatchDeleteMemoryRecords",
}));

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
  BatchUpdateMemoryRecordsInput & RegionInput,
  BatchUpdateMemoryRecordsOutput,
  BatchUpdateMemoryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(258, __c8, 2) as any as S.Schema<BatchUpdateMemoryRecordsInput>,
  output: __S(66, __c2, 2) as any as S.Schema<BatchUpdateMemoryRecordsOutput>,
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
  telemetry: TELEMETRY,
  span: "BatchUpdateMemoryRecords",
}));

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
  CompleteResourceTokenAuthRequest & RegionInput,
  CompleteResourceTokenAuthResponse,
  CompleteResourceTokenAuthError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(289, __c9, 1) as any as S.Schema<CompleteResourceTokenAuthRequest>,
  output: __S(320, __c10, 0) as any as S.Schema<CompleteResourceTokenAuthResponse>,
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
  telemetry: TELEMETRY,
  span: "CompleteResourceTokenAuth",
}));

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
  CreateABTestRequest & RegionInput,
  CreateABTestResponse,
  CreateABTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c11, 0) as any as S.Schema<CreateABTestRequest>,
  output: __S(353, __c11, 1) as any as S.Schema<CreateABTestResponse>,
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
  telemetry: TELEMETRY,
  span: "CreateABTest",
}));

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
  CreateEventInput & RegionInput,
  CreateEventOutput,
  CreateEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c14, 0) as any as S.Schema<CreateEventInput>,
  output: __S(480, __c15, 0) as any as S.Schema<CreateEventOutput>,
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
  telemetry: TELEMETRY,
  span: "CreateEvent",
}));

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
  CreatePaymentInstrumentRequest & RegionInput,
  CreatePaymentInstrumentResponse,
  CreatePaymentInstrumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c19, 0) as any as S.Schema<CreatePaymentInstrumentRequest>,
  output: __S(650, __c20, 10) as any as S.Schema<CreatePaymentInstrumentResponse>,
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
  telemetry: TELEMETRY,
  span: "CreatePaymentInstrument",
}));

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
  CreatePaymentSessionRequest & RegionInput,
  CreatePaymentSessionResponse,
  CreatePaymentSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c21, 0) as any as S.Schema<CreatePaymentSessionRequest>,
  output: __S(708, __c22, 4) as any as S.Schema<CreatePaymentSessionResponse>,
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
  telemetry: TELEMETRY,
  span: "CreatePaymentSession",
}));

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
  DeleteABTestRequest & RegionInput,
  DeleteABTestResponse,
  DeleteABTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c23, 0) as any as S.Schema<DeleteABTestRequest>,
  output: __S(737, __c23, 1) as any as S.Schema<DeleteABTestResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteABTest",
}));

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
  DeleteBatchEvaluationRequest & RegionInput,
  DeleteBatchEvaluationResponse,
  DeleteBatchEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c24, 0) as any as S.Schema<DeleteBatchEvaluationRequest>,
  output: __S(769, __c24, 1) as any as S.Schema<DeleteBatchEvaluationResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteBatchEvaluation",
}));

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
  DeleteCapacityProviderSessionRequest & RegionInput,
  DeleteCapacityProviderSessionResponse,
  DeleteCapacityProviderSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c25, 0) as any as S.Schema<DeleteCapacityProviderSessionRequest>,
  output: __S(801, __c25, 1) as any as S.Schema<DeleteCapacityProviderSessionResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteCapacityProviderSession",
}));

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
  DeleteEventInput & RegionInput,
  DeleteEventOutput,
  DeleteEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c26, 0) as any as S.Schema<DeleteEventInput>,
  output: __S(833, __c26, 1) as any as S.Schema<DeleteEventOutput>,
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
  telemetry: TELEMETRY,
  span: "DeleteEvent",
}));

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
  DeleteMemoryRecordInput & RegionInput,
  DeleteMemoryRecordOutput,
  DeleteMemoryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c27, 0) as any as S.Schema<DeleteMemoryRecordInput>,
  output: __S(865, __c27, 1) as any as S.Schema<DeleteMemoryRecordOutput>,
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
  telemetry: TELEMETRY,
  span: "DeleteMemoryRecord",
}));

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
  DeletePaymentInstrumentRequest & RegionInput,
  DeletePaymentInstrumentResponse,
  DeletePaymentInstrumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(896, __c28, 0) as any as S.Schema<DeletePaymentInstrumentRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<DeletePaymentInstrumentResponse>,
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
  telemetry: TELEMETRY,
  span: "DeletePaymentInstrument",
}));

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
  DeletePaymentSessionRequest & RegionInput,
  DeletePaymentSessionResponse,
  DeletePaymentSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(960, __c30, 0) as any as S.Schema<DeletePaymentSessionRequest>,
  output: __S(928, __c29, 0) as any as S.Schema<DeletePaymentSessionResponse>,
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
  telemetry: TELEMETRY,
  span: "DeletePaymentSession",
}));

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
  DeleteRecommendationRequest & RegionInput,
  DeleteRecommendationResponse,
  DeleteRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(992, __c31, 0) as any as S.Schema<DeleteRecommendationRequest>,
  output: __S(993, __c31, 1) as any as S.Schema<DeleteRecommendationResponse>,
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
  telemetry: TELEMETRY,
  span: "DeleteRecommendation",
}));

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
  EvaluateRequest & RegionInput,
  EvaluateResponse,
  EvaluateError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1030, __c32, 6) as any as S.Schema<EvaluateRequest>,
  output: __S(1034, __c32, 10) as any as S.Schema<EvaluateResponse>,
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
  telemetry: TELEMETRY,
  span: "Evaluate",
}));

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
  GetABTestRequest & RegionInput,
  GetABTestResponse,
  GetABTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1120, __c35, 0) as any as S.Schema<GetABTestRequest>,
  output: __S(1128, __c35, 8) as any as S.Schema<GetABTestResponse>,
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
  telemetry: TELEMETRY,
  span: "GetABTest",
}));

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
  GetAgentCardRequest & RegionInput,
  GetAgentCardResponse,
  GetAgentCardError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1152, __c36, 0) as any as S.Schema<GetAgentCardRequest>,
  output: __S(1153, __c36, 1) as any as S.Schema<GetAgentCardResponse>,
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
  telemetry: TELEMETRY,
  span: "GetAgentCard",
}));

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
  GetBatchEvaluationRequest & RegionInput,
  GetBatchEvaluationResponse,
  GetBatchEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1184, __c37, 0) as any as S.Schema<GetBatchEvaluationRequest>,
  output: __S(1216, __c38, 0) as any as S.Schema<GetBatchEvaluationResponse>,
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
  telemetry: TELEMETRY,
  span: "GetBatchEvaluation",
}));

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
  GetBrowserSessionRequest & RegionInput,
  GetBrowserSessionResponse,
  GetBrowserSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1344, __c42, 0) as any as S.Schema<GetBrowserSessionRequest>,
  output: __S(1345, __c42, 1) as any as S.Schema<GetBrowserSessionResponse>,
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
  telemetry: TELEMETRY,
  span: "GetBrowserSession",
}));

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
  GetCodeInterpreterSessionRequest & RegionInput,
  GetCodeInterpreterSessionResponse,
  GetCodeInterpreterSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1472, __c46, 0) as any as S.Schema<GetCodeInterpreterSessionRequest>,
  output: __S(1473, __c46, 1) as any as S.Schema<GetCodeInterpreterSessionResponse>,
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
  telemetry: TELEMETRY,
  span: "GetCodeInterpreterSession",
}));

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
  GetEventInput & RegionInput,
  GetEventOutput,
  GetEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1504, __c47, 0) as any as S.Schema<GetEventInput>,
  output: __S(480, __c15, 0) as any as S.Schema<GetEventOutput>,
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
  telemetry: TELEMETRY,
  span: "GetEvent",
}));

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
  GetMemoryRecordInput & RegionInput,
  GetMemoryRecordOutput,
  GetMemoryRecordError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1536, __c48, 0) as any as S.Schema<GetMemoryRecordInput>,
  output: __S(1538, __c48, 2) as any as S.Schema<GetMemoryRecordOutput>,
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
  telemetry: TELEMETRY,
  span: "GetMemoryRecord",
}));

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
  GetPaymentInstrumentRequest & RegionInput,
  GetPaymentInstrumentResponse,
  GetPaymentInstrumentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1568, __c49, 0) as any as S.Schema<GetPaymentInstrumentRequest>,
  output: __S(650, __c20, 10) as any as S.Schema<GetPaymentInstrumentResponse>,
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
  telemetry: TELEMETRY,
  span: "GetPaymentInstrument",
}));

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
  GetPaymentInstrumentBalanceRequest & RegionInput,
  GetPaymentInstrumentBalanceResponse,
  GetPaymentInstrumentBalanceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1600, __c50, 0) as any as S.Schema<GetPaymentInstrumentBalanceRequest>,
  output: __S(1602, __c50, 2) as any as S.Schema<GetPaymentInstrumentBalanceResponse>,
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
  telemetry: TELEMETRY,
  span: "GetPaymentInstrumentBalance",
}));

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
  GetPaymentSessionRequest & RegionInput,
  GetPaymentSessionResponse,
  GetPaymentSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1632, __c51, 0) as any as S.Schema<GetPaymentSessionRequest>,
  output: __S(708, __c22, 4) as any as S.Schema<GetPaymentSessionResponse>,
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
  telemetry: TELEMETRY,
  span: "GetPaymentSession",
}));

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
  GetRecommendationRequest & RegionInput,
  GetRecommendationResponse,
  GetRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1664, __c52, 0) as any as S.Schema<GetRecommendationRequest>,
  output: __S(1671, __c52, 7) as any as S.Schema<GetRecommendationResponse>,
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
  telemetry: TELEMETRY,
  span: "GetRecommendation",
}));

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
  GetResourceApiKeyRequest & RegionInput,
  GetResourceApiKeyResponse,
  GetResourceApiKeyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1728, __c54, 0) as any as S.Schema<GetResourceApiKeyRequest>,
  output: __S(1729, __c54, 1) as any as S.Schema<GetResourceApiKeyResponse>,
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
  telemetry: TELEMETRY,
  span: "GetResourceApiKey",
}));

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
  GetResourceOauth2TokenRequest & RegionInput,
  GetResourceOauth2TokenResponse,
  GetResourceOauth2TokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1760, __c55, 0) as any as S.Schema<GetResourceOauth2TokenRequest>,
  output: __S(1761, __c55, 1) as any as S.Schema<GetResourceOauth2TokenResponse>,
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
  telemetry: TELEMETRY,
  span: "GetResourceOauth2Token",
}));

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
  GetResourcePaymentTokenRequest & RegionInput,
  GetResourcePaymentTokenResponse,
  GetResourcePaymentTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1827, __c57, 3) as any as S.Schema<GetResourcePaymentTokenRequest>,
  output: __S(1831, __c57, 7) as any as S.Schema<GetResourcePaymentTokenResponse>,
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
  telemetry: TELEMETRY,
  span: "GetResourcePaymentToken",
}));

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
  GetWorkloadAccessTokenRequest & RegionInput,
  GetWorkloadAccessTokenResponse,
  GetWorkloadAccessTokenError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1856, __c58, 0) as any as S.Schema<GetWorkloadAccessTokenRequest>,
  output: __S(1888, __c59, 0) as any as S.Schema<GetWorkloadAccessTokenResponse>,
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
  telemetry: TELEMETRY,
  span: "GetWorkloadAccessToken",
}));

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
  GetWorkloadAccessTokenForJWTRequest & RegionInput,
  GetWorkloadAccessTokenForJWTResponse,
  GetWorkloadAccessTokenForJWTError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1920, __c60, 0) as any as S.Schema<GetWorkloadAccessTokenForJWTRequest>,
  output: __S(1888, __c59, 0) as any as S.Schema<GetWorkloadAccessTokenForJWTResponse>,
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
  telemetry: TELEMETRY,
  span: "GetWorkloadAccessTokenForJWT",
}));

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
  GetWorkloadAccessTokenForUserIdRequest & RegionInput,
  GetWorkloadAccessTokenForUserIdResponse,
  GetWorkloadAccessTokenForUserIdError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1952, __c61, 0) as any as S.Schema<GetWorkloadAccessTokenForUserIdRequest>,
  output: __S(1888, __c59, 0) as any as S.Schema<GetWorkloadAccessTokenForUserIdResponse>,
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
  telemetry: TELEMETRY,
  span: "GetWorkloadAccessTokenForUserId",
}));

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
  IngestDataInput & RegionInput,
  IngestDataOutput,
  IngestDataError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(1988, __c62, 4) as any as S.Schema<IngestDataInput>,
  output: __S(1989, __c62, 5) as any as S.Schema<IngestDataOutput>,
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
  telemetry: TELEMETRY,
  span: "IngestData",
}));

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
  InvokeAgentRuntimeRequest & RegionInput,
  InvokeAgentRuntimeResponse,
  InvokeAgentRuntimeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2016, __c63, 0) as any as S.Schema<InvokeAgentRuntimeRequest>,
  output: __S(2017, __c63, 1) as any as S.Schema<InvokeAgentRuntimeResponse>,
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
  telemetry: TELEMETRY,
  span: "InvokeAgentRuntime",
}));

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
  InvokeAgentRuntimeCommandRequest & RegionInput,
  InvokeAgentRuntimeCommandResponse,
  InvokeAgentRuntimeCommandError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2049, __c64, 1) as any as S.Schema<InvokeAgentRuntimeCommandRequest>,
  output: __S(2054, __c64, 6) as any as S.Schema<InvokeAgentRuntimeCommandResponse>,
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
  telemetry: TELEMETRY,
  span: "InvokeAgentRuntimeCommand",
}));

export type InvokeBrowserError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Invokes an operating system-level action on a browser session in Amazon Bedrock AgentCore. This operation provides direct OS-level control over browser sessions, enabling mouse actions, keyboard input, and screenshots that the WebSocket-based Chrome DevTools Protocol (CDP) cannot handle -- such as interacting with print dialogs, context menus, and JavaScript alerts.
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
  InvokeBrowserRequest & RegionInput,
  InvokeBrowserResponse,
  InvokeBrowserError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2089, __c65, 9) as any as S.Schema<InvokeBrowserRequest>,
  output: __S(2093, __c65, 13) as any as S.Schema<InvokeBrowserResponse>,
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
  telemetry: TELEMETRY,
  span: "InvokeBrowser",
}));

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
  InvokeCodeInterpreterRequest & RegionInput,
  InvokeCodeInterpreterResponse,
  InvokeCodeInterpreterError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2115, __c66, 3) as any as S.Schema<InvokeCodeInterpreterRequest>,
  output: __S(2122, __c66, 10) as any as S.Schema<InvokeCodeInterpreterResponse>,
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
  telemetry: TELEMETRY,
  span: "InvokeCodeInterpreter",
}));

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
  InvokeHarnessRequest & RegionInput,
  InvokeHarnessResponse,
  InvokeHarnessError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2176, __c68, 0) as any as S.Schema<InvokeHarnessRequest>,
  output: __S(2194, __c68, 18) as any as S.Schema<InvokeHarnessResponse>,
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
  telemetry: TELEMETRY,
  span: "InvokeHarness",
}));

export type InvokeWebSearchError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches the web and returns a ranked list of results. Each result includes a text extract from the page.
 *
 * You can filter the results by domain and by publication date.
 *
 * To use this operation, you must have the `bedrock-agentcore:InvokeWebSearch` permission on the resource `arn:${Partition}:bedrock-agentcore:${Region}:aws:tool/web-search.v1`.
 */
export const invokeWebSearch: API.OperationMethod<
  InvokeWebSearchInput & RegionInput,
  InvokeWebSearchOutput,
  InvokeWebSearchError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2211, __c69, 3) as any as S.Schema<InvokeWebSearchInput>,
  output: __S(2214, __c69, 6) as any as S.Schema<InvokeWebSearchOutput>,
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
  operationName: "InvokeWebSearch",
  telemetry: TELEMETRY,
  span: "InvokeWebSearch",
}));

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
  ListABTestsRequest & RegionInput,
  ListABTestsResponse,
  ListABTestsError,
  Credentials | HttpClient.HttpClient,
  ABTestSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2240, __c70, 0) as any as S.Schema<ListABTestsRequest>,
  output: __S(2243, __c70, 3) as any as S.Schema<ListABTestsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListABTests",
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
  ListActorsInput & RegionInput,
  ListActorsOutput,
  ListActorsError,
  Credentials | HttpClient.HttpClient,
  ActorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2272, __c71, 0) as any as S.Schema<ListActorsInput>,
  output: __S(2275, __c71, 3) as any as S.Schema<ListActorsOutput>,
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
  telemetry: TELEMETRY,
  span: "ListActors",
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
  ListBatchEvaluationsRequest & RegionInput,
  ListBatchEvaluationsResponse,
  ListBatchEvaluationsError,
  Credentials | HttpClient.HttpClient,
  BatchEvaluationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2304, __c72, 0) as any as S.Schema<ListBatchEvaluationsRequest>,
  output: __S(2307, __c72, 3) as any as S.Schema<ListBatchEvaluationsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListBatchEvaluations",
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
  ListBrowserSessionsRequest & RegionInput,
  ListBrowserSessionsResponse,
  ListBrowserSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2336, __c73, 0) as any as S.Schema<ListBrowserSessionsRequest>,
  output: __S(2339, __c73, 3) as any as S.Schema<ListBrowserSessionsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListBrowserSessions",
}));

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
  ListCodeInterpreterSessionsRequest & RegionInput,
  ListCodeInterpreterSessionsResponse,
  ListCodeInterpreterSessionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2368, __c74, 0) as any as S.Schema<ListCodeInterpreterSessionsRequest>,
  output: __S(2371, __c74, 3) as any as S.Schema<ListCodeInterpreterSessionsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListCodeInterpreterSessions",
}));

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
  ListEventsInput & RegionInput,
  ListEventsOutput,
  ListEventsError,
  Credentials | HttpClient.HttpClient,
  Event
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2405, __c75, 5) as any as S.Schema<ListEventsInput>,
  output: __S(2407, __c75, 7) as any as S.Schema<ListEventsOutput>,
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
  telemetry: TELEMETRY,
  span: "ListEvents",
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
  ListMemoryExtractionJobsInput & RegionInput,
  ListMemoryExtractionJobsOutput,
  ListMemoryExtractionJobsError,
  Credentials | HttpClient.HttpClient,
  ExtractionJobMetadata
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2465, __c77, 1) as any as S.Schema<ListMemoryExtractionJobsInput>,
  output: __S(2471, __c77, 7) as any as S.Schema<ListMemoryExtractionJobsOutput>,
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
  telemetry: TELEMETRY,
  span: "ListMemoryExtractionJobs",
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
  ListMemoryRecordsInput & RegionInput,
  ListMemoryRecordsOutput,
  ListMemoryRecordsError,
  Credentials | HttpClient.HttpClient,
  MemoryRecordSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2496, __c78, 0) as any as S.Schema<ListMemoryRecordsInput>,
  output: __S(2533, __c79, 5) as any as S.Schema<ListMemoryRecordsOutput>,
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
  telemetry: TELEMETRY,
  span: "ListMemoryRecords",
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
  ListPaymentInstrumentsRequest & RegionInput,
  ListPaymentInstrumentsResponse,
  ListPaymentInstrumentsError,
  Credentials | HttpClient.HttpClient,
  PaymentInstrumentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2560, __c80, 0) as any as S.Schema<ListPaymentInstrumentsRequest>,
  output: __S(2563, __c80, 3) as any as S.Schema<ListPaymentInstrumentsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListPaymentInstruments",
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
  ListPaymentSessionsRequest & RegionInput,
  ListPaymentSessionsResponse,
  ListPaymentSessionsError,
  Credentials | HttpClient.HttpClient,
  PaymentSessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2592, __c81, 0) as any as S.Schema<ListPaymentSessionsRequest>,
  output: __S(2595, __c81, 3) as any as S.Schema<ListPaymentSessionsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListPaymentSessions",
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
  ListRecommendationsRequest & RegionInput,
  ListRecommendationsResponse,
  ListRecommendationsError,
  Credentials | HttpClient.HttpClient,
  RecommendationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2624, __c82, 0) as any as S.Schema<ListRecommendationsRequest>,
  output: __S(2627, __c82, 3) as any as S.Schema<ListRecommendationsResponse>,
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
  telemetry: TELEMETRY,
  span: "ListRecommendations",
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
  ListSessionsInput & RegionInput,
  ListSessionsOutput,
  ListSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2657, __c83, 1) as any as S.Schema<ListSessionsInput>,
  output: __S(2660, __c83, 4) as any as S.Schema<ListSessionsOutput>,
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
  telemetry: TELEMETRY,
  span: "ListSessions",
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
  ProcessPaymentRequest & RegionInput,
  ProcessPaymentResponse,
  ProcessPaymentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2691, __c84, 3) as any as S.Schema<ProcessPaymentRequest>,
  output: __S(2695, __c84, 7) as any as S.Schema<ProcessPaymentResponse>,
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
  telemetry: TELEMETRY,
  span: "ProcessPayment",
}));

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
  RetrieveMemoryRecordsInput & RegionInput,
  RetrieveMemoryRecordsOutput,
  RetrieveMemoryRecordsError,
  Credentials | HttpClient.HttpClient,
  MemoryRecordSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(2721, __c85, 1) as any as S.Schema<RetrieveMemoryRecordsInput>,
  output: __S(2533, __c79, 5) as any as S.Schema<RetrieveMemoryRecordsOutput>,
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
  telemetry: TELEMETRY,
  span: "RetrieveMemoryRecords",
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
  SaveBrowserSessionProfileRequest & RegionInput,
  SaveBrowserSessionProfileResponse,
  SaveBrowserSessionProfileError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2752, __c86, 0) as any as S.Schema<SaveBrowserSessionProfileRequest>,
  output: __S(2753, __c86, 1) as any as S.Schema<SaveBrowserSessionProfileResponse>,
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
  telemetry: TELEMETRY,
  span: "SaveBrowserSessionProfile",
}));

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
  SearchRegistryRecordsRequest & RegionInput,
  SearchRegistryRecordsResponse,
  SearchRegistryRecordsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2784, __c87, 0) as any as S.Schema<SearchRegistryRecordsRequest>,
  output: __S(2794, __c87, 10) as any as S.Schema<SearchRegistryRecordsResponse>,
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
  telemetry: TELEMETRY,
  span: "SearchRegistryRecords",
}));

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
  StartBatchEvaluationRequest & RegionInput,
  StartBatchEvaluationResponse,
  StartBatchEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2824, __c88, 8) as any as S.Schema<StartBatchEvaluationRequest>,
  output: __S(2825, __c88, 9) as any as S.Schema<StartBatchEvaluationResponse>,
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
  telemetry: TELEMETRY,
  span: "StartBatchEvaluation",
}));

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
  StartBrowserSessionRequest & RegionInput,
  StartBrowserSessionResponse,
  StartBrowserSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2848, __c89, 0) as any as S.Schema<StartBrowserSessionRequest>,
  output: __S(2849, __c89, 1) as any as S.Schema<StartBrowserSessionResponse>,
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
  telemetry: TELEMETRY,
  span: "StartBrowserSession",
}));

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
  StartCodeInterpreterSessionRequest & RegionInput,
  StartCodeInterpreterSessionResponse,
  StartCodeInterpreterSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2880, __c90, 0) as any as S.Schema<StartCodeInterpreterSessionRequest>,
  output: __S(2881, __c90, 1) as any as S.Schema<StartCodeInterpreterSessionResponse>,
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
  telemetry: TELEMETRY,
  span: "StartCodeInterpreterSession",
}));

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
  StartMemoryExtractionJobInput & RegionInput,
  StartMemoryExtractionJobOutput,
  StartMemoryExtractionJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2913, __c91, 1) as any as S.Schema<StartMemoryExtractionJobInput>,
  output: __S(2912, __c91, 0) as any as S.Schema<StartMemoryExtractionJobOutput>,
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
  telemetry: TELEMETRY,
  span: "StartMemoryExtractionJob",
}));

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
  StartRecommendationRequest & RegionInput,
  StartRecommendationResponse,
  StartRecommendationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2944, __c92, 0) as any as S.Schema<StartRecommendationRequest>,
  output: __S(2945, __c92, 1) as any as S.Schema<StartRecommendationResponse>,
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
  telemetry: TELEMETRY,
  span: "StartRecommendation",
}));

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
  StopBatchEvaluationRequest & RegionInput,
  StopBatchEvaluationResponse,
  StopBatchEvaluationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(2976, __c93, 0) as any as S.Schema<StopBatchEvaluationRequest>,
  output: __S(2977, __c93, 1) as any as S.Schema<StopBatchEvaluationResponse>,
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
  telemetry: TELEMETRY,
  span: "StopBatchEvaluation",
}));

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
  StopBrowserSessionRequest & RegionInput,
  StopBrowserSessionResponse,
  StopBrowserSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3008, __c94, 0) as any as S.Schema<StopBrowserSessionRequest>,
  output: __S(3009, __c94, 1) as any as S.Schema<StopBrowserSessionResponse>,
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
  telemetry: TELEMETRY,
  span: "StopBrowserSession",
}));

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
  StopCodeInterpreterSessionRequest & RegionInput,
  StopCodeInterpreterSessionResponse,
  StopCodeInterpreterSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3040, __c95, 0) as any as S.Schema<StopCodeInterpreterSessionRequest>,
  output: __S(3041, __c95, 1) as any as S.Schema<StopCodeInterpreterSessionResponse>,
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
  telemetry: TELEMETRY,
  span: "StopCodeInterpreterSession",
}));

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
  StopRuntimeSessionRequest & RegionInput,
  StopRuntimeSessionResponse,
  StopRuntimeSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3072, __c96, 0) as any as S.Schema<StopRuntimeSessionRequest>,
  output: __S(3073, __c96, 1) as any as S.Schema<StopRuntimeSessionResponse>,
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
  telemetry: TELEMETRY,
  span: "StopRuntimeSession",
}));

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
  UpdateABTestRequest & RegionInput,
  UpdateABTestResponse,
  UpdateABTestError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3104, __c97, 0) as any as S.Schema<UpdateABTestRequest>,
  output: __S(3105, __c97, 1) as any as S.Schema<UpdateABTestResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateABTest",
}));

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
  UpdateBrowserStreamRequest & RegionInput,
  UpdateBrowserStreamResponse,
  UpdateBrowserStreamError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(3138, __c98, 2) as any as S.Schema<UpdateBrowserStreamRequest>,
  output: __S(3139, __c98, 3) as any as S.Schema<UpdateBrowserStreamResponse>,
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
  telemetry: TELEMETRY,
  span: "UpdateBrowserStream",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(0, __c0, 0));
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          requestIdentifier: S.String,
          namespaces: __S(128, __c4, 0),
          content: __S(160, __c5, 0),
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          memoryStrategyId: S.optional(S.String),
          metadata: S.optional(__S(193, __c6, 1)),
        }),
      ).annotate({ identifier: "MemoryRecordCreateInput" });
    case 1:
      return S.Array(__S(32, __c1, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          records: __S(33, __c1, 1),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          recordExpirySpecification: S.optional(__S(96, __c3, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/memories/{memoryId}/memoryRecords/batchCreate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchCreateMemoryRecordsInput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          memoryRecordId: S.String,
          status: S.String,
          requestIdentifier: S.optional(S.String),
          errorCode: S.optional(S.Number),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "MemoryRecordOutput" });
    case 1:
      return S.Array(__S(64, __c2, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ successfulRecords: __S(65, __c2, 1), failedRecords: __S(65, __c2, 1) }),
      ).annotate({ identifier: "BatchCreateMemoryRecordsOutput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ recordExpiryDurationDays: S.Number }),
        /*@__PURE__*/ S.Struct({ action: S.String }),
      ]);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ text: SensitiveString })]);
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ stringValue: S.String }),
        /*@__PURE__*/ S.Struct({ stringListValue: __S(128, __c4, 0) }),
        /*@__PURE__*/ S.Struct({ numberValue: S.Number }),
        /*@__PURE__*/ S.Struct({
          dateTimeValue: /*@__PURE__*/ S.Date.pipe(
            /*@__PURE__*/ T.TimestampFormat("epoch-seconds"),
          ),
        }),
      ]);
    case 1:
      return S.Record(S.String, /*@__PURE__*/ __S(192, __c6, 0).pipe(S.optional));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ memoryRecordId: S.String, namespace: S.optional(S.String) }),
      ).annotate({ identifier: "MemoryRecordDeleteInput" });
    case 1:
      return S.Array(__S(224, __c7, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          records: __S(225, __c7, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/memories/{memoryId}/memoryRecords/batchDelete" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchDeleteMemoryRecordsInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          memoryRecordId: S.String,
          timestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          content: S.optional(__S(160, __c5, 0)),
          namespaces: S.optional(__S(128, __c4, 0)),
          sourceNamespaces: S.optional(__S(128, __c4, 0)),
          memoryStrategyId: S.optional(S.String),
          metadata: S.optional(__S(193, __c6, 1)),
        }),
      ).annotate({ identifier: "MemoryRecordUpdateInput" });
    case 1:
      return S.Array(__S(256, __c8, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          records: __S(257, __c8, 1),
          recordExpirySpecification: S.optional(__S(96, __c3, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/memories/{memoryId}/memoryRecords/batchUpdate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "BatchUpdateMemoryRecordsInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ userToken: SensitiveString }),
        /*@__PURE__*/ S.Struct({ userId: S.String }),
      ]);
    case 1:
      return S.suspend(() =>
        S.Struct({ userIdentifier: __S(288, __c9, 0), sessionUri: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/identities/CompleteResourceTokenAuth" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CompleteResourceTokenAuthRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({
        identifier: "CompleteResourceTokenAuthResponse",
      });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          gatewayArn: S.String,
          variants: __S(420, __c13, 4),
          gatewayFilter: S.optional(__S(421, __c13, 5)),
          evaluationConfig: __S(424, __c13, 8),
          roleArn: S.String,
          enableOnCreate: S.optional(S.Boolean),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(384, __c12, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/ab-tests" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateABTestRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          abTestId: S.String,
          abTestArn: S.String,
          name: S.optional(S.String),
          status: S.String,
          executionStatus: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CreateABTestResponse" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ bundleArn: S.String, bundleVersion: S.String })).annotate({
        identifier: "ConfigurationBundleRef",
      });
    case 1:
      return S.suspend(() => S.Struct({ name: S.String })).annotate({ identifier: "TargetRef" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          configurationBundle: S.optional(__S(416, __c13, 0)),
          target: S.optional(__S(417, __c13, 1)),
        }),
      ).annotate({ identifier: "VariantConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ name: S.String, weight: S.Number, variantConfiguration: __S(418, __c13, 2) }),
      ).annotate({ identifier: "Variant" });
    case 4:
      return S.Array(__S(419, __c13, 3));
    case 5:
      return S.suspend(() => S.Struct({ targetPaths: S.optional(__S(128, __c4, 0)) })).annotate({
        identifier: "GatewayFilter",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({ name: S.String, onlineEvaluationConfigArn: S.String }),
      ).annotate({ identifier: "PerVariantOnlineEvaluationConfig" });
    case 7:
      return S.Array(__S(422, __c13, 6));
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ onlineEvaluationConfigArn: S.String }),
        /*@__PURE__*/ S.Struct({ perVariantOnlineEvaluationConfig: __S(423, __c13, 7) }),
      ]);
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          actorId: S.String,
          sessionId: S.optional(S.String),
          eventTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          payload: __S(545, __c17, 1),
          branch: S.optional(__S(546, __c17, 2)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          metadata: S.optional(__S(515, __c16, 3)),
          extractionMode: S.optional(S.String),
          extractionConfig: S.optional(__S(576, __c18, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/memories/{memoryId}/events" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateEventInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ event: __S(547, __c17, 3) })).annotate({
        identifier: "CreateEventOutput",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ content: __S(160, __c5, 0), role: S.String })).annotate({
        identifier: "Conversational",
      });
    case 1:
      return S.suspend(() => S.Struct({ content: S.Any })).annotate({
        identifier: "MemoryJsonData",
      });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ stringValue: S.String })]);
    case 3:
      return S.Record(S.String, /*@__PURE__*/ __S(514, __c16, 2).pipe(S.optional));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ conversational: __S(512, __c16, 0) }),
        /*@__PURE__*/ S.Struct({ blob: S.Any }),
        /*@__PURE__*/ S.Struct({ json: __S(513, __c16, 1) }),
      ]);
    case 1:
      return S.Array(__S(544, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ rootEventId: S.optional(S.String), name: S.String }),
      ).annotate({ identifier: "Branch" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String,
          actorId: S.String,
          sessionId: S.String,
          eventId: S.String,
          eventTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          payload: S.optional(__S(545, __c17, 1)),
          branch: S.optional(__S(546, __c17, 2)),
          metadata: S.optional(__S(515, __c16, 3)),
        }),
      ).annotate({ identifier: "Event" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ namespaceVariables: S.optional(__S(384, __c12, 0)) }),
      ).annotate({ identifier: "ExtractionConfig" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
          ),
          agentName: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
          ),
          paymentManagerArn: S.String,
          paymentConnectorId: S.String,
          paymentInstrumentType: S.String,
          paymentInstrumentDetails: __S(648, __c20, 8),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/payments/createPaymentInstrument" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePaymentInstrumentRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ emailAddress: SensitiveString })).annotate({
        identifier: "LinkedAccountEmail",
      });
    case 1:
      return S.suspend(() => S.Struct({ phoneNumber: SensitiveString })).annotate({
        identifier: "LinkedAccountSms",
      });
    case 2:
      return S.suspend(() => S.Struct({ kid: S.String, sub: S.String })).annotate({
        identifier: "LinkedAccountDeveloperJwt",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({
          sub: S.String,
          emailAddress: S.optional(SensitiveString),
          name: S.optional(S.String),
          username: S.optional(S.String),
        }),
      ).annotate({ identifier: "OAuth2Authentication" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ google: __S(643, __c20, 3) }),
        /*@__PURE__*/ S.Struct({ apple: __S(643, __c20, 3) }),
        /*@__PURE__*/ S.Struct({ x: __S(643, __c20, 3) }),
        /*@__PURE__*/ S.Struct({ telegram: __S(643, __c20, 3) }),
        /*@__PURE__*/ S.Struct({ github: __S(643, __c20, 3) }),
      ]);
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ email: __S(640, __c20, 0) }),
        /*@__PURE__*/ S.Struct({ sms: __S(641, __c20, 1) }),
        /*@__PURE__*/ S.Struct({ developerJwt: __S(642, __c20, 2) }),
        /*@__PURE__*/ S.Struct({ oAuth2: __S(644, __c20, 4) }),
      ]);
    case 6:
      return S.Array(__S(645, __c20, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          network: S.String,
          linkedAccounts: __S(646, __c20, 6),
          walletAddress: S.optional(S.String),
          redirectUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "EmbeddedCryptoWallet" });
    case 8:
      return S.Union([/*@__PURE__*/ S.Struct({ embeddedCryptoWallet: __S(647, __c20, 7) })]);
    case 9:
      return S.suspend(() =>
        S.Struct({
          paymentInstrumentId: S.String,
          paymentManagerArn: S.String,
          paymentConnectorId: S.String,
          userId: S.String,
          paymentInstrumentType: S.String,
          paymentInstrumentDetails: __S(648, __c20, 8),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          status: S.String,
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "PaymentInstrument" });
    case 10:
      return S.suspend(() => S.Struct({ paymentInstrument: __S(649, __c20, 9) })).annotate({
        identifier: "CreatePaymentInstrumentResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
          ),
          agentName: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
          ),
          paymentManagerArn: S.String,
          limits: S.optional(__S(705, __c22, 1)),
          expiryTimeInMinutes: S.Number,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/payments/createPaymentSession" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreatePaymentSessionRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ value: S.String, currency: S.String })).annotate({
        identifier: "Amount",
      });
    case 1:
      return S.suspend(() => S.Struct({ maxSpendAmount: __S(704, __c22, 0) })).annotate({
        identifier: "SessionLimits",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          availableSpendAmount: S.optional(__S(704, __c22, 0)),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "AvailableLimits" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          paymentSessionId: S.String,
          paymentManagerArn: S.String,
          limits: S.optional(__S(705, __c22, 1)),
          userId: S.String,
          expiryTimeInMinutes: S.Number,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          availableLimits: S.optional(__S(706, __c22, 2)),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "PaymentSession" });
    case 4:
      return S.suspend(() => S.Struct({ paymentSession: __S(707, __c22, 3) })).annotate({
        identifier: "CreatePaymentSessionResponse",
      });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ abTestId: S.String.pipe(T.HttpLabel("abTestId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/ab-tests/{abTestId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteABTestRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ abTestId: S.String, abTestArn: S.String, status: S.String }),
      ).annotate({ identifier: "DeleteABTestResponse" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ batchEvaluationId: S.String.pipe(T.HttpLabel("batchEvaluationId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/evaluations/batch-evaluate/{batchEvaluationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteBatchEvaluationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ batchEvaluationId: S.String, batchEvaluationArn: S.String, status: S.String }),
      ).annotate({ identifier: "DeleteBatchEvaluationResponse" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          capacityProviderId: S.String.pipe(T.HttpLabel("capacityProviderId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/capacity-providers/{capacityProviderId}/sessions/{sessionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteCapacityProviderSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ capacityProviderArn: S.String, sessionId: S.String, status: S.String }),
      ).annotate({ identifier: "DeleteCapacityProviderSessionResponse" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          eventId: S.String.pipe(T.HttpLabel("eventId")),
          actorId: S.String.pipe(T.HttpLabel("actorId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/memories/{memoryId}/actor/{actorId}/sessions/{sessionId}/events/{eventId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteEventInput" });
    case 1:
      return S.suspend(() => S.Struct({ eventId: S.String })).annotate({
        identifier: "DeleteEventOutput",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          memoryRecordId: S.String.pipe(T.HttpLabel("memoryRecordId")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/memories/{memoryId}/memoryRecords/{memoryRecordId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMemoryRecordInput" });
    case 1:
      return S.suspend(() => S.Struct({ memoryRecordId: S.String })).annotate({
        identifier: "DeleteMemoryRecordOutput",
      });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
          ),
          paymentManagerArn: S.String,
          paymentConnectorId: S.String,
          paymentInstrumentId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/payments/deletePaymentInstrument" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePaymentInstrumentRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ status: S.String })).annotate({
        identifier: "DeletePaymentInstrumentResponse",
      });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
          ),
          paymentManagerArn: S.String,
          paymentSessionId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/payments/deletePaymentSession" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeletePaymentSessionRequest" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ recommendationId: S.String.pipe(T.HttpLabel("recommendationId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/recommendations/{recommendationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRecommendationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ recommendationId: S.String, status: S.String })).annotate({
        identifier: "DeleteRecommendationResponse",
      });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ sessionSpans: __S(1056, __c33, 0) })]);
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ spanIds: __S(128, __c4, 0) }),
        /*@__PURE__*/ S.Struct({ traceIds: __S(128, __c4, 0) }),
      ]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.String,
          traceId: S.optional(S.String),
          spanId: S.optional(S.String),
        }),
      ).annotate({ identifier: "SpanContext" });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ spanContext: __S(1026, __c32, 2) })]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          context: __S(1027, __c32, 3),
          expectedResponse: S.optional(__S(1088, __c34, 0)),
          assertions: S.optional(__S(1089, __c34, 1)),
          expectedTrajectory: S.optional(__S(1090, __c34, 2)),
        }),
      ).annotate({ identifier: "EvaluationReferenceInput" });
    case 5:
      return S.Array(__S(1028, __c32, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          evaluatorId: S.String.pipe(T.HttpLabel("evaluatorId")),
          evaluationInput: __S(1024, __c32, 0),
          evaluationTarget: S.optional(__S(1025, __c32, 1)),
          evaluationReferenceInputs: S.optional(__S(1029, __c32, 5)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/evaluations/evaluate/{evaluatorId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "EvaluateRequest" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          inputTokens: S.optional(S.Number),
          outputTokens: S.optional(S.Number),
          totalTokens: S.optional(S.Number),
        }),
      ).annotate({ identifier: "TokenUsage" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          evaluatorArn: S.String,
          evaluatorId: S.String,
          evaluatorName: S.String,
          evaluationDimensionName: S.optional(S.String),
          explanation: S.optional(SensitiveString),
          context: __S(1027, __c32, 3),
          value: S.optional(S.Number),
          label: S.optional(S.String),
          tokenUsage: S.optional(__S(1031, __c32, 7)),
          errorMessage: S.optional(S.String),
          errorCode: S.optional(S.String),
          ignoredReferenceInputFields: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "EvaluationResultContent" });
    case 9:
      return S.Array(__S(1032, __c32, 8));
    case 10:
      return S.suspend(() => S.Struct({ evaluationResults: __S(1033, __c32, 9) })).annotate({
        identifier: "EvaluateResponse",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.Any);
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ text: S.String })]);
    case 1:
      return S.Array(__S(1088, __c34, 0));
    case 2:
      return S.suspend(() => S.Struct({ toolNames: S.optional(__S(128, __c4, 0)) })).annotate({
        identifier: "EvaluationExpectedTrajectory",
      });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ abTestId: S.String.pipe(T.HttpLabel("abTestId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/ab-tests/{abTestId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetABTestRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ variantName: S.String, sampleSize: S.Number, mean: S.Number }),
      ).annotate({ identifier: "ControlStats" });
    case 2:
      return S.suspend(() =>
        S.Struct({ lower: S.optional(S.Number), upper: S.optional(S.Number) }),
      ).annotate({ identifier: "ConfidenceInterval" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          variantName: S.String,
          sampleSize: S.Number,
          mean: S.Number,
          absoluteChange: S.optional(S.Number),
          percentChange: S.optional(S.Number),
          pValue: S.optional(S.Number),
          confidenceInterval: S.optional(__S(1122, __c35, 2)),
          isSignificant: S.Boolean,
        }),
      ).annotate({ identifier: "VariantResult" });
    case 4:
      return S.Array(__S(1123, __c35, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          evaluatorArn: S.String,
          controlStats: __S(1121, __c35, 1),
          variantResults: __S(1124, __c35, 4),
        }),
      ).annotate({ identifier: "EvaluatorMetric" });
    case 6:
      return S.Array(__S(1125, __c35, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          analysisTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          evaluatorMetrics: __S(1126, __c35, 6),
        }),
      ).annotate({ identifier: "ABTestResults" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          abTestId: S.String,
          abTestArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          status: S.String,
          executionStatus: S.String,
          gatewayArn: S.String,
          variants: __S(420, __c13, 4),
          gatewayFilter: S.optional(__S(421, __c13, 5)),
          evaluationConfig: __S(424, __c13, 8),
          roleArn: S.optional(S.String),
          currentRunId: S.optional(S.String),
          errorDetails: S.optional(__S(128, __c4, 0)),
          startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          stoppedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          maxDurationExpiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          results: S.optional(__S(1127, __c35, 7)),
        }),
      ).annotate({ identifier: "GetABTestResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          runtimeSessionId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
            T.IdempotencyToken(),
          ),
          agentRuntimeArn: S.String.pipe(T.HttpLabel("agentRuntimeArn")),
          qualifier: S.optional(S.String).pipe(T.HttpQuery("qualifier")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/runtimes/{agentRuntimeArn}/invocations/.well-known/agent-card.json",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAgentCardRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          runtimeSessionId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
          ),
          agentCard: S.Any.pipe(T.HttpPayload()),
          statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
        }),
      ).annotate({ identifier: "GetAgentCardResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ batchEvaluationId: S.String.pipe(T.HttpLabel("batchEvaluationId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/evaluations/batch-evaluate/{batchEvaluationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBatchEvaluationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          targetId: S.optional(S.String),
          targetType: S.optional(S.String),
          description: SensitiveString,
          category: S.optional(S.String),
          confidence: S.optional(S.Number),
        }),
      ).annotate({ identifier: "SessionFinding" });
    case 2:
      return S.Array(__S(1185, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.String,
          lastSeenAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          findings: S.optional(__S(1186, __c37, 2)),
        }),
      ).annotate({ identifier: "SampleSession" });
    case 4:
      return S.Array(__S(1187, __c37, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          name: SensitiveString,
          explanation: SensitiveString,
          affectedSessionCount: S.optional(S.Number),
          suggestedFix: S.optional(SensitiveString),
          sampleSessions: S.optional(__S(1188, __c37, 4)),
        }),
      ).annotate({ identifier: "InsightRootCause" });
    case 6:
      return S.Array(__S(1189, __c37, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          name: SensitiveString,
          description: SensitiveString,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          affectedSessionCount: S.optional(S.Number),
          sampleSessions: S.optional(__S(1188, __c37, 4)),
          rootCauses: S.optional(__S(1190, __c37, 6)),
        }),
      ).annotate({ identifier: "InsightResult" });
    case 8:
      return S.Array(__S(1191, __c37, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ category: S.String, evidence: S.String, confidence: S.Number }),
      ).annotate({ identifier: "InsightsFailureSignal" });
    case 10:
      return S.Array(__S(1193, __c37, 9));
    case 11:
      return S.suspend(() =>
        S.Struct({ spanId: S.String, traceId: S.String, signals: __S(1194, __c37, 10) }),
      ).annotate({ identifier: "FailureSpanDetail" });
    case 12:
      return S.Array(__S(1195, __c37, 11));
    case 13:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.String,
          explanation: S.String,
          fixType: S.String,
          recommendation: S.String,
          failureSpans: __S(1196, __c37, 12),
        }),
      ).annotate({ identifier: "AffectedSession" });
    case 14:
      return S.Array(__S(1197, __c37, 13));
    case 15:
      return S.suspend(() =>
        S.Struct({
          clusterId: S.Number,
          name: S.String,
          rootCause: S.String,
          recommendation: S.String,
          affectedSessionCount: S.Number,
          affectedSessions: __S(1198, __c37, 14),
        }),
      ).annotate({ identifier: "RootCauseCluster" });
    case 16:
      return S.Array(__S(1199, __c37, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({
          clusterId: S.Number,
          name: S.String,
          description: S.String,
          affectedSessionCount: S.Number,
          rootCauses: __S(1200, __c37, 16),
        }),
      ).annotate({ identifier: "FailureSubCategoryCluster" });
    case 18:
      return S.Array(__S(1201, __c37, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({
          clusterId: S.Number,
          name: S.String,
          description: S.String,
          affectedSessionCount: S.Number,
          subCategories: __S(1202, __c37, 18),
        }),
      ).annotate({ identifier: "FailureCategoryCluster" });
    case 20:
      return S.Array(__S(1203, __c37, 19));
    case 21:
      return S.suspend(() => S.Struct({ failures: __S(1204, __c37, 20) })).annotate({
        identifier: "FailureAnalysisResultContent",
      });
    case 22:
      return S.suspend(() =>
        S.Struct({ sessionId: S.String, userMessages: __S(128, __c4, 0) }),
      ).annotate({ identifier: "UserIntentAffectedSession" });
    case 23:
      return S.Array(__S(1206, __c37, 22));
    case 24:
      return S.suspend(() =>
        S.Struct({
          clusterId: S.Number,
          name: S.String,
          description: S.String,
          affectedSessionCount: S.Number,
          affectedSessions: __S(1207, __c37, 23),
        }),
      ).annotate({ identifier: "UserIntentCluster" });
    case 25:
      return S.Array(__S(1208, __c37, 24));
    case 26:
      return S.suspend(() => S.Struct({ userIntents: __S(1209, __c37, 25) })).annotate({
        identifier: "UserIntentClusteringResultContent",
      });
    case 27:
      return S.suspend(() =>
        S.Struct({ sessionId: S.String, approachTaken: S.String, finalOutcome: S.String }),
      ).annotate({ identifier: "ExecutionSummaryAffectedSession" });
    case 28:
      return S.Array(__S(1211, __c37, 27));
    case 29:
      return S.suspend(() =>
        S.Struct({
          clusterId: S.Number,
          name: S.String,
          description: S.String,
          affectedSessionCount: S.Number,
          affectedSessions: __S(1212, __c37, 28),
        }),
      ).annotate({ identifier: "ExecutionSummaryCluster" });
    case 30:
      return S.Array(__S(1213, __c37, 29));
    case 31:
      return S.suspend(() => S.Struct({ executionSummaries: __S(1214, __c37, 30) })).annotate({
        identifier: "ExecutionSummaryClusteringResultContent",
      });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          batchEvaluationId: S.String,
          batchEvaluationArn: S.String,
          batchEvaluationName: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          evaluators: S.optional(__S(1281, __c40, 1)),
          insights: S.optional(__S(1283, __c40, 3)),
          dataSourceConfig: S.optional(__S(1318, __c41, 6)),
          outputConfig: S.optional(__S(1320, __c41, 8)),
          evaluationResults: S.optional(__S(1251, __c39, 3)),
          insightResults: S.optional(__S(1192, __c37, 8)),
          failureAnalysisResult: S.optional(__S(1205, __c37, 21)),
          userIntentResult: S.optional(__S(1210, __c37, 26)),
          executionSummaryResult: S.optional(__S(1215, __c37, 31)),
          errorDetails: S.optional(__S(128, __c4, 0)),
          description: S.optional(S.String),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          kmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetBatchEvaluationResponse" });
  }
}
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ averageScore: S.optional(S.Number) })).annotate({
        identifier: "EvaluatorStatistics",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          evaluatorId: S.optional(S.String),
          evaluationDimensionName: S.optional(S.String),
          statistics: S.optional(__S(1248, __c39, 0)),
          totalEvaluated: S.optional(S.Number),
          totalFailed: S.optional(S.Number),
        }),
      ).annotate({ identifier: "EvaluatorSummary" });
    case 2:
      return S.Array(__S(1249, __c39, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          numberOfSessionsCompleted: S.optional(S.Number),
          numberOfSessionsInProgress: S.optional(S.Number),
          numberOfSessionsFailed: S.optional(S.Number),
          totalNumberOfSessions: S.optional(S.Number),
          numberOfSessionsIgnored: S.optional(S.Number),
          evaluatorSummaries: S.optional(__S(1250, __c39, 2)),
        }),
      ).annotate({ identifier: "EvaluationJobResults" });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ evaluatorId: S.String })).annotate({
        identifier: "Evaluator",
      });
    case 1:
      return S.Array(__S(1280, __c40, 0));
    case 2:
      return S.suspend(() => S.Struct({ insightId: S.String })).annotate({ identifier: "Insight" });
    case 3:
      return S.Array(__S(1282, __c40, 2));
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          startTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          endTime: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "SessionFilterConfig" });
    case 1:
      return S.suspend(() =>
        S.Struct({ sessionId: S.String, traceIds: __S(128, __c4, 0) }),
      ).annotate({ identifier: "SessionTraceIds" });
    case 2:
      return S.Array(__S(1313, __c41, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          sessionIds: S.optional(__S(128, __c4, 0)),
          timeRange: S.optional(__S(1312, __c41, 0)),
          sessionTraceIds: S.optional(__S(1314, __c41, 2)),
        }),
      ).annotate({ identifier: "CloudWatchFilterConfig" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          serviceNames: __S(128, __c4, 0),
          logGroupNames: S.optional(__S(128, __c4, 0)),
          logGroupNamePrefixes: S.optional(__S(128, __c4, 0)),
          filterConfig: S.optional(__S(1315, __c41, 3)),
        }),
      ).annotate({ identifier: "CloudWatchLogsSource" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          onlineEvaluationConfigArn: S.String,
          timeRange: S.optional(__S(1312, __c41, 0)),
        }),
      ).annotate({ identifier: "OnlineEvaluationConfigSource" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ cloudWatchLogs: __S(1316, __c41, 4) }),
        /*@__PURE__*/ S.Struct({ onlineEvaluationConfigSource: __S(1317, __c41, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          logGroupName: S.optional(S.String),
          logStreamName: S.optional(S.String),
          metricsNamespace: S.optional(S.String),
          resultDestination: S.optional(S.String),
        }),
      ).annotate({ identifier: "CloudWatchOutputConfig" });
    case 8:
      return S.Union([/*@__PURE__*/ S.Struct({ cloudWatchConfig: __S(1319, __c41, 7) })]);
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          browserIdentifier: S.String.pipe(T.HttpLabel("browserIdentifier")),
          sessionId: S.String.pipe(T.HttpQuery("sessionId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/browsers/{browserIdentifier}/sessions/get" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetBrowserSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          browserIdentifier: S.String,
          sessionId: S.String,
          name: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          viewPort: S.optional(__S(1408, __c44, 0)),
          extensions: S.optional(__S(1412, __c44, 4)),
          enterprisePolicies: S.optional(__S(1414, __c44, 6)),
          profileConfiguration: S.optional(__S(1415, __c44, 7)),
          sessionTimeoutSeconds: S.optional(S.Number),
          status: S.optional(S.String),
          streams: S.optional(__S(1442, __c45, 2)),
          proxyConfiguration: S.optional(__S(1421, __c44, 13)),
          certificates: S.optional(__S(1379, __c43, 3)),
          filesystemConfigurations: S.optional(__S(1382, __c43, 6)),
          sessionReplayArtifact: S.optional(S.String),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "GetBrowserSessionResponse" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ secretArn: S.String })).annotate({
        identifier: "BasicAuth",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ secretsManager: __S(1376, __c43, 0) })]);
    case 2:
      return S.suspend(() => S.Struct({ location: __S(1377, __c43, 1) })).annotate({
        identifier: "Certificate",
      });
    case 3:
      return S.Array(__S(1378, __c43, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ accessPointArn: S.String, mountPath: S.String, fileSystemArn: S.String }),
      ).annotate({ identifier: "S3FilesConfiguration" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ s3FilesConfiguration: __S(1380, __c43, 4) }),
        /*@__PURE__*/ S.Struct({ efsConfiguration: __S(1380, __c43, 4) }),
      ]);
    case 6:
      return S.Array(__S(1381, __c43, 5));
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ width: S.Number, height: S.Number })).annotate({
        identifier: "ViewPort",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({ bucket: S.String, prefix: S.String, versionId: S.optional(S.String) }),
      ).annotate({ identifier: "S3Location" });
    case 2:
      return S.Union([/*@__PURE__*/ S.Struct({ s3: __S(1409, __c44, 1) })]);
    case 3:
      return S.suspend(() => S.Struct({ location: __S(1410, __c44, 2) })).annotate({
        identifier: "BrowserExtension",
      });
    case 4:
      return S.Array(__S(1411, __c44, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ location: __S(1410, __c44, 2), type: S.optional(S.String) }),
      ).annotate({ identifier: "BrowserEnterprisePolicy" });
    case 6:
      return S.Array(__S(1413, __c44, 5));
    case 7:
      return S.suspend(() => S.Struct({ profileIdentifier: S.String })).annotate({
        identifier: "BrowserProfileConfiguration",
      });
    case 8:
      return S.Union([/*@__PURE__*/ S.Struct({ basicAuth: __S(1376, __c43, 0) })]);
    case 9:
      return S.suspend(() =>
        S.Struct({
          server: S.String,
          port: S.Number,
          domainPatterns: S.optional(__S(128, __c4, 0)),
          credentials: S.optional(__S(1416, __c44, 8)),
        }),
      ).annotate({ identifier: "ExternalProxy" });
    case 10:
      return S.Union([/*@__PURE__*/ S.Struct({ externalProxy: __S(1417, __c44, 9) })]);
    case 11:
      return S.Array(__S(1418, __c44, 10));
    case 12:
      return S.suspend(() => S.Struct({ domainPatterns: S.optional(__S(128, __c4, 0)) })).annotate({
        identifier: "ProxyBypass",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({ proxies: __S(1419, __c44, 11), bypass: S.optional(__S(1420, __c44, 12)) }),
      ).annotate({ identifier: "ProxyConfiguration" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ streamEndpoint: S.String, streamStatus: S.String }),
      ).annotate({ identifier: "AutomationStream" });
    case 1:
      return S.suspend(() => S.Struct({ streamEndpoint: S.optional(S.String) })).annotate({
        identifier: "LiveViewStream",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          automationStream: __S(1440, __c45, 0),
          liveViewStream: S.optional(__S(1441, __c45, 1)),
        }),
      ).annotate({ identifier: "BrowserSessionStream" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          codeInterpreterIdentifier: S.String.pipe(T.HttpLabel("codeInterpreterIdentifier")),
          sessionId: S.String.pipe(T.HttpQuery("sessionId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/code-interpreters/{codeInterpreterIdentifier}/sessions/get",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetCodeInterpreterSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          codeInterpreterIdentifier: S.String,
          sessionId: S.String,
          name: S.optional(S.String),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          sessionTimeoutSeconds: S.optional(S.Number),
          status: S.optional(S.String),
          certificates: S.optional(__S(1379, __c43, 3)),
          filesystemConfigurations: S.optional(__S(1382, __c43, 6)),
        }),
      ).annotate({ identifier: "GetCodeInterpreterSessionResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          actorId: S.String.pipe(T.HttpLabel("actorId")),
          eventId: S.String.pipe(T.HttpLabel("eventId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/memories/{memoryId}/actor/{actorId}/sessions/{sessionId}/events/{eventId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetEventInput" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          memoryRecordId: S.String.pipe(T.HttpLabel("memoryRecordId")),
          namespace: S.optional(S.String).pipe(T.HttpQuery("namespace")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/memories/{memoryId}/memoryRecord/{memoryRecordId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMemoryRecordInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          memoryRecordId: S.String,
          content: __S(160, __c5, 0),
          memoryStrategyId: S.optional(S.String),
          namespaces: __S(128, __c4, 0),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          metadata: S.optional(__S(193, __c6, 1)),
          expiresAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "MemoryRecord" });
    case 2:
      return S.suspend(() => S.Struct({ memoryRecord: __S(1537, __c48, 1) })).annotate({
        identifier: "GetMemoryRecordOutput",
      });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
          ),
          agentName: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
          ),
          paymentManagerArn: S.String,
          paymentConnectorId: S.optional(S.String),
          paymentInstrumentId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/payments/getPaymentInstrument" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPaymentInstrumentRequest" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
          ),
          agentName: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
          ),
          paymentManagerArn: S.String,
          paymentConnectorId: S.String,
          paymentInstrumentId: S.String,
          chain: S.String,
          token: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/payments/getPaymentInstrumentBalance" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPaymentInstrumentBalanceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          amount: S.String,
          decimals: S.Number,
          token: S.String,
          network: S.String,
          chain: S.String,
        }),
      ).annotate({ identifier: "TokenBalance" });
    case 2:
      return S.suspend(() =>
        S.Struct({ paymentInstrumentId: S.String, tokenBalance: __S(1601, __c50, 1) }),
      ).annotate({ identifier: "GetPaymentInstrumentBalanceResponse" });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
          ),
          agentName: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
          ),
          paymentManagerArn: S.String,
          paymentSessionId: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/payments/getPaymentSession" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetPaymentSessionRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ recommendationId: S.String.pipe(T.HttpLabel("recommendationId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/recommendations/{recommendationId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRecommendationRequest" });
    case 1:
      return S.suspend(() => S.Struct({ bundleArn: S.String, versionId: S.String })).annotate({
        identifier: "RecommendationResultConfigurationBundle",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          recommendedSystemPrompt: S.optional(SensitiveString),
          configurationBundle: S.optional(__S(1665, __c52, 1)),
          explanation: S.optional(S.String),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "SystemPromptRecommendationResult" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          toolName: S.String,
          recommendedToolDescription: S.optional(SensitiveString),
          explanation: S.optional(S.String),
        }),
      ).annotate({ identifier: "ToolDescriptionOutput" });
    case 4:
      return S.Array(__S(1667, __c52, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({
          tools: S.optional(__S(1668, __c52, 4)),
          configurationBundle: S.optional(__S(1665, __c52, 1)),
          errorCode: S.optional(S.String),
          errorMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "ToolDescriptionRecommendationResult" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ systemPromptRecommendationResult: __S(1666, __c52, 2) }),
        /*@__PURE__*/ S.Struct({ toolDescriptionRecommendationResult: __S(1669, __c52, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          recommendationId: S.String,
          recommendationArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          type: S.String,
          recommendationConfig: __S(1718, __c53, 22),
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          recommendationResult: S.optional(__S(1670, __c52, 6)),
          kmsKeyArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetRecommendationResponse" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ bundleArn: S.String, versionId: S.String, systemPromptJsonPath: S.String }),
      ).annotate({ identifier: "SystemPromptConfigurationBundle" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: SensitiveString }),
        /*@__PURE__*/ S.Struct({ configurationBundle: __S(1696, __c53, 0) }),
      ]);
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ stringValue: S.String }),
        /*@__PURE__*/ S.Struct({ doubleValue: S.Number }),
        /*@__PURE__*/ S.Struct({ booleanValue: S.Boolean }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({ key: S.String, operator: S.String, value: __S(1698, __c53, 2) }),
      ).annotate({ identifier: "CloudWatchLogsFilter" });
    case 4:
      return S.Array(__S(1699, __c53, 3));
    case 5:
      return S.suspend(() => S.Struct({ filters: S.optional(__S(1700, __c53, 4)) })).annotate({
        identifier: "CloudWatchLogsRule",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          logGroupArns: __S(128, __c4, 0),
          serviceNames: __S(128, __c4, 0),
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          rule: S.optional(__S(1701, __c53, 5)),
        }),
      ).annotate({ identifier: "CloudWatchLogsTraceConfig" });
    case 7:
      return S.suspend(() => S.Struct({ batchEvaluationArn: S.String })).annotate({
        identifier: "BatchEvaluationTraceConfig",
      });
    case 8:
      return S.suspend(() =>
        S.Struct({
          onlineEvaluationConfigArn: S.String,
          startTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          endTime: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "OnlineEvaluationTraceConfig" });
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ sessionSpans: __S(1056, __c33, 0) }),
        /*@__PURE__*/ S.Struct({ cloudwatchLogs: __S(1702, __c53, 6) }),
        /*@__PURE__*/ S.Struct({ batchEvaluation: __S(1703, __c53, 7) }),
        /*@__PURE__*/ S.Struct({ onlineEvaluation: __S(1704, __c53, 8) }),
      ]);
    case 10:
      return S.suspend(() => S.Struct({ evaluatorArn: S.String })).annotate({
        identifier: "RecommendationEvaluatorReference",
      });
    case 11:
      return S.Array(__S(1706, __c53, 10));
    case 12:
      return S.suspend(() => S.Struct({ evaluators: __S(1707, __c53, 11) })).annotate({
        identifier: "RecommendationEvaluationConfig",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          systemPrompt: __S(1697, __c53, 1),
          agentTraces: __S(1705, __c53, 9),
          evaluationConfig: S.optional(__S(1708, __c53, 12)),
        }),
      ).annotate({ identifier: "SystemPromptRecommendationConfig" });
    case 14:
      return S.suspend(() =>
        S.Struct({ toolName: S.String, toolDescription: __S(160, __c5, 0) }),
      ).annotate({ identifier: "ToolDescriptionInput" });
    case 15:
      return S.Array(__S(1710, __c53, 14));
    case 16:
      return S.suspend(() => S.Struct({ tools: __S(1711, __c53, 15) })).annotate({
        identifier: "ToolDescriptionTextInput",
      });
    case 17:
      return S.suspend(() =>
        S.Struct({ toolName: S.String, toolDescriptionJsonPath: S.String }),
      ).annotate({ identifier: "ConfigurationBundleToolEntry" });
    case 18:
      return S.Array(__S(1713, __c53, 17));
    case 19:
      return S.suspend(() =>
        S.Struct({ bundleArn: S.String, versionId: S.String, tools: __S(1714, __c53, 18) }),
      ).annotate({ identifier: "ToolDescriptionConfigurationBundle" });
    case 20:
      return S.Union([
        /*@__PURE__*/ S.Struct({ toolDescriptionText: __S(1712, __c53, 16) }),
        /*@__PURE__*/ S.Struct({ configurationBundle: __S(1715, __c53, 19) }),
      ]);
    case 21:
      return S.suspend(() =>
        S.Struct({ toolDescription: __S(1716, __c53, 20), agentTraces: __S(1705, __c53, 9) }),
      ).annotate({ identifier: "ToolDescriptionRecommendationConfig" });
    case 22:
      return S.Union([
        /*@__PURE__*/ S.Struct({ systemPromptRecommendationConfig: __S(1709, __c53, 13) }),
        /*@__PURE__*/ S.Struct({ toolDescriptionRecommendationConfig: __S(1717, __c53, 21) }),
      ]);
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workloadIdentityToken: SensitiveString,
          resourceCredentialProviderName: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/identities/api-key" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourceApiKeyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ apiKey: SensitiveString })).annotate({
        identifier: "GetResourceApiKeyResponse",
      });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          workloadIdentityToken: SensitiveString,
          resourceCredentialProviderName: S.String,
          scopes: __S(128, __c4, 0),
          oauth2Flow: S.String,
          sessionUri: S.optional(S.String),
          resourceOauth2ReturnUrl: S.optional(S.String),
          forceAuthentication: S.optional(S.Boolean),
          customParameters: S.optional(__S(1792, __c56, 0)),
          customState: S.optional(SensitiveString),
          resources: S.optional(__S(128, __c4, 0)),
          audiences: S.optional(__S(128, __c4, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/identities/oauth2/token" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourceOauth2TokenRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          authorizationUrl: S.optional(SensitiveString),
          accessToken: S.optional(SensitiveString),
          sessionUri: S.optional(S.String),
          sessionStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetResourceOauth2TokenResponse" });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ SensitiveString.pipe(S.optional));
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          requestMethod: S.String,
          requestHost: S.optional(S.String),
          requestPath: S.String,
          includeWalletAuthToken: S.optional(S.Boolean),
          requestBody: S.optional(S.String),
        }),
      ).annotate({ identifier: "CoinbaseCdpTokenRequestInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          requestHost: S.optional(S.String),
          requestPath: S.String,
          requestBody: SensitiveString,
          includeAuthorizationSignature: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "StripePrivyTokenRequestInput" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ coinbaseCdpTokenRequest: __S(1824, __c57, 0) }),
        /*@__PURE__*/ S.Struct({ stripePrivyTokenRequest: __S(1825, __c57, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          workloadIdentityToken: SensitiveString,
          resourceCredentialProviderName: S.String,
          paymentTokenRequest: __S(1826, __c57, 2),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/identities/payment/token" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetResourcePaymentTokenRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({ bearerToken: SensitiveString, walletAuthToken: S.optional(SensitiveString) }),
      ).annotate({ identifier: "CoinbaseCdpTokenResponseOutput" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          authorizationSignature: S.optional(SensitiveString),
          requestExpiry: S.optional(S.Number),
          appId: S.String,
          basicAuthToken: SensitiveString,
        }),
      ).annotate({ identifier: "StripePrivyTokenResponseOutput" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ coinbaseCdpTokenResponse: __S(1828, __c57, 4) }),
        /*@__PURE__*/ S.Struct({ stripePrivyTokenResponse: __S(1829, __c57, 5) }),
      ]);
    case 7:
      return S.suspend(() => S.Struct({ paymentTokenResponse: __S(1830, __c57, 6) })).annotate({
        identifier: "GetResourcePaymentTokenResponse",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workloadName: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/identities/GetWorkloadAccessToken" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkloadAccessTokenRequest" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ workloadAccessToken: SensitiveString })).annotate({
        identifier: "GetWorkloadAccessTokenResponse",
      });
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workloadName: S.String, userToken: SensitiveString }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/identities/GetWorkloadAccessTokenForJWT" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkloadAccessTokenForJWTRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ workloadName: S.String, userId: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/identities/GetWorkloadAccessTokenForUserId" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetWorkloadAccessTokenForUserIdRequest" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.Union([
        /*@__PURE__*/ S.Struct({ conversational: __S(512, __c16, 0) }),
        /*@__PURE__*/ S.Struct({ json: __S(513, __c16, 1) }),
      ]);
    case 1:
      return S.Array(__S(1984, __c62, 0));
    case 2:
      return S.suspend(() => S.Struct({ payload: __S(1985, __c62, 1) })).annotate({
        identifier: "InlineMemoryContent",
      });
    case 3:
      return S.Union([/*@__PURE__*/ S.Struct({ inline: __S(1986, __c62, 2) })]);
    case 4:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          source: __S(1987, __c62, 3),
          contentTimestamp: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          actorId: S.String,
          sessionId: S.optional(S.String),
          extractionConfig: S.optional(__S(576, __c18, 0)),
          metadata: S.optional(__S(515, __c16, 3)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/memories/{memoryId}/ingest" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "IngestDataInput" });
    case 5:
      return S.suspend(() => S.Struct({ sessionId: S.String })).annotate({
        identifier: "IngestDataOutput",
      });
  }
}
function __c63(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
          mcpSessionId: S.optional(S.String).pipe(T.HttpHeader("Mcp-Session-Id")),
          runtimeSessionId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
            T.IdempotencyToken(),
          ),
          mcpProtocolVersion: S.optional(S.String).pipe(T.HttpHeader("Mcp-Protocol-Version")),
          mcpMethod: S.optional(S.String).pipe(T.HttpHeader("Mcp-Method")),
          mcpName: S.optional(S.String).pipe(T.HttpHeader("Mcp-Name")),
          runtimeUserId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-User-Id"),
          ),
          traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
          traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
          traceState: S.optional(S.String).pipe(T.HttpHeader("tracestate")),
          baggage: S.optional(S.String).pipe(T.HttpHeader("baggage")),
          agentRuntimeArn: S.String.pipe(T.HttpLabel("agentRuntimeArn")),
          qualifier: S.optional(S.String).pipe(T.HttpQuery("qualifier")),
          accountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
          payload: T.StreamingInput.pipe(T.HttpPayload()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/runtimes/{agentRuntimeArn}/invocations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeAgentRuntimeRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          runtimeSessionId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
          ),
          sessionEndpointUrl: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Endpoint-Url"),
          ),
          mcpSessionId: S.optional(S.String).pipe(T.HttpHeader("Mcp-Session-Id")),
          mcpProtocolVersion: S.optional(S.String).pipe(T.HttpHeader("Mcp-Protocol-Version")),
          traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
          traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
          traceState: S.optional(S.String).pipe(T.HttpHeader("tracestate")),
          baggage: S.optional(S.String).pipe(T.HttpHeader("baggage")),
          contentType: S.String.pipe(T.HttpHeader("Content-Type")),
          response: S.optional(T.StreamingOutput).pipe(T.HttpPayload()),
          statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
        }),
      ).annotate({ identifier: "InvokeAgentRuntimeResponse" });
  }
}
function __c64(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ command: S.String, timeout: S.optional(S.Number) }),
      ).annotate({ identifier: "InvokeAgentRuntimeCommandRequestBody" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          contentType: S.optional(S.String).pipe(T.HttpHeader("Content-Type")),
          accept: S.optional(S.String).pipe(T.HttpHeader("Accept")),
          runtimeSessionId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
            T.IdempotencyToken(),
          ),
          traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
          traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
          traceState: S.optional(S.String).pipe(T.HttpHeader("tracestate")),
          baggage: S.optional(S.String).pipe(T.HttpHeader("baggage")),
          agentRuntimeArn: S.String.pipe(T.HttpLabel("agentRuntimeArn")),
          qualifier: S.optional(S.String).pipe(T.HttpQuery("qualifier")),
          accountId: S.optional(S.String).pipe(T.HttpQuery("accountId")),
          body: __S(2048, __c64, 0)
            .pipe(T.HttpPayload())
            .annotate({ identifier: "InvokeAgentRuntimeCommandRequestBody" }),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/runtimes/{agentRuntimeArn}/commands" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeAgentRuntimeCommandRequest" });
    case 2:
      return S.suspend(() =>
        S.Struct({ stdout: S.optional(S.String), stderr: S.optional(S.String) }),
      ).annotate({ identifier: "ContentDeltaEvent" });
    case 3:
      return S.suspend(() => S.Struct({ exitCode: S.Number, status: S.String })).annotate({
        identifier: "ContentStopEvent",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          contentStart: S.optional(__S(320, __c10, 0)),
          contentDelta: S.optional(__S(2050, __c64, 2)),
          contentStop: S.optional(__S(2051, __c64, 3)),
        }),
      ).annotate({ identifier: "ResponseChunk" });
    case 5:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ chunk: __S(2052, __c64, 4) }),
          /*@__PURE__*/ S.Struct({
            accessDeniedException: /*@__PURE__*/ S.suspend(() => AccessDeniedException).annotate({
              identifier: "AccessDeniedException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            internalServerException: /*@__PURE__*/ S.suspend(
              () => InternalServerException,
            ).annotate({ identifier: "InternalServerException" }),
          }),
          /*@__PURE__*/ S.Struct({
            resourceNotFoundException: /*@__PURE__*/ S.suspend(
              () => ResourceNotFoundException,
            ).annotate({ identifier: "ResourceNotFoundException" }),
          }),
          /*@__PURE__*/ S.Struct({
            serviceQuotaExceededException: /*@__PURE__*/ S.suspend(
              () => ServiceQuotaExceededException,
            ).annotate({ identifier: "ServiceQuotaExceededException" }),
          }),
          /*@__PURE__*/ S.Struct({
            throttlingException: /*@__PURE__*/ S.suspend(() => ThrottlingException).annotate({
              identifier: "ThrottlingException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            validationException: /*@__PURE__*/ S.suspend(() => ValidationException).annotate({
              identifier: "ValidationException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            runtimeClientError: /*@__PURE__*/ S.suspend(() => RuntimeClientError).annotate({
              identifier: "RuntimeClientError",
            }),
          }),
        ]),
      );
    case 6:
      return S.suspend(() =>
        S.Struct({
          runtimeSessionId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
          ),
          traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
          traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
          traceState: S.optional(S.String).pipe(T.HttpHeader("tracestate")),
          baggage: S.optional(S.String).pipe(T.HttpHeader("baggage")),
          contentType: S.String.pipe(T.HttpHeader("Content-Type")),
          statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
          stream: __S(2053, __c64, 5).pipe(T.HttpPayload()),
        }),
      ).annotate({ identifier: "InvokeAgentRuntimeCommandResponse" });
  }
}
function __c65(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          x: S.Number,
          y: S.Number,
          button: S.optional(S.String),
          clickCount: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MouseClickArguments" });
    case 1:
      return S.suspend(() => S.Struct({ x: S.Number, y: S.Number })).annotate({
        identifier: "MouseMoveArguments",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          endX: S.Number,
          endY: S.Number,
          startX: S.Number,
          startY: S.Number,
          button: S.optional(S.String),
        }),
      ).annotate({ identifier: "MouseDragArguments" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          x: S.Number,
          y: S.Number,
          deltaX: S.optional(S.Number),
          deltaY: S.optional(S.Number),
        }),
      ).annotate({ identifier: "MouseScrollArguments" });
    case 4:
      return S.suspend(() => S.Struct({ text: S.String })).annotate({
        identifier: "KeyTypeArguments",
      });
    case 5:
      return S.suspend(() => S.Struct({ key: S.String, presses: S.optional(S.Number) })).annotate({
        identifier: "KeyPressArguments",
      });
    case 6:
      return S.suspend(() => S.Struct({ keys: __S(128, __c4, 0) })).annotate({
        identifier: "KeyShortcutArguments",
      });
    case 7:
      return S.suspend(() => S.Struct({ format: S.optional(S.String) })).annotate({
        identifier: "ScreenshotArguments",
      });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ mouseClick: __S(2080, __c65, 0) }),
        /*@__PURE__*/ S.Struct({ mouseMove: __S(2081, __c65, 1) }),
        /*@__PURE__*/ S.Struct({ mouseDrag: __S(2082, __c65, 2) }),
        /*@__PURE__*/ S.Struct({ mouseScroll: __S(2083, __c65, 3) }),
        /*@__PURE__*/ S.Struct({ keyType: __S(2084, __c65, 4) }),
        /*@__PURE__*/ S.Struct({ keyPress: __S(2085, __c65, 5) }),
        /*@__PURE__*/ S.Struct({ keyShortcut: __S(2086, __c65, 6) }),
        /*@__PURE__*/ S.Struct({ screenshot: __S(2087, __c65, 7) }),
      ]);
    case 9:
      return S.suspend(() =>
        S.Struct({
          browserIdentifier: S.String.pipe(T.HttpLabel("browserIdentifier")),
          sessionId: S.String.pipe(T.HttpHeader("x-amzn-browser-session-id")),
          action: __S(2088, __c65, 8),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/browsers/{browserIdentifier}/sessions/invoke" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeBrowserRequest" });
    case 10:
      return S.suspend(() => S.Struct({ status: S.String, error: S.optional(S.String) })).annotate({
        identifier: "MouseClickResult",
      });
    case 11:
      return S.suspend(() =>
        S.Struct({ status: S.String, error: S.optional(S.String), data: S.optional(T.Blob) }),
      ).annotate({ identifier: "ScreenshotResult" });
    case 12:
      return S.Union([
        /*@__PURE__*/ S.Struct({ mouseClick: __S(2090, __c65, 10) }),
        /*@__PURE__*/ S.Struct({ mouseMove: __S(2090, __c65, 10) }),
        /*@__PURE__*/ S.Struct({ mouseDrag: __S(2090, __c65, 10) }),
        /*@__PURE__*/ S.Struct({ mouseScroll: __S(2090, __c65, 10) }),
        /*@__PURE__*/ S.Struct({ keyType: __S(2090, __c65, 10) }),
        /*@__PURE__*/ S.Struct({ keyPress: __S(2090, __c65, 10) }),
        /*@__PURE__*/ S.Struct({ keyShortcut: __S(2090, __c65, 10) }),
        /*@__PURE__*/ S.Struct({ screenshot: __S(2091, __c65, 11) }),
      ]);
    case 13:
      return S.suspend(() =>
        S.Struct({
          result: __S(2092, __c65, 12),
          sessionId: S.String.pipe(T.HttpHeader("x-amzn-browser-session-id")),
        }),
      ).annotate({ identifier: "InvokeBrowserResponse" });
  }
}
function __c66(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ path: S.String, text: S.optional(S.String), blob: S.optional(SensitiveBlob) }),
      ).annotate({ identifier: "InputContentBlock" });
    case 1:
      return S.Array(__S(2112, __c66, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          code: S.optional(S.String),
          language: S.optional(S.String),
          clearContext: S.optional(S.Boolean),
          command: S.optional(S.String),
          path: S.optional(S.String),
          paths: S.optional(__S(128, __c4, 0)),
          content: S.optional(__S(2113, __c66, 1)),
          directoryPath: S.optional(S.String),
          taskId: S.optional(S.String),
          runtime: S.optional(S.String),
        }),
      ).annotate({ identifier: "ToolArguments" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          codeInterpreterIdentifier: S.String.pipe(T.HttpLabel("codeInterpreterIdentifier")),
          sessionId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-code-interpreter-session-id")),
          traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
          traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
          name: S.String,
          arguments: S.optional(__S(2114, __c66, 2)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/code-interpreters/{codeInterpreterIdentifier}/tools/invoke",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeCodeInterpreterRequest" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          uri: S.optional(S.String),
          mimeType: S.optional(S.String),
          text: S.optional(S.String),
          blob: S.optional(T.Blob),
        }),
      ).annotate({ identifier: "ResourceContent" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          text: S.optional(S.String),
          data: S.optional(T.Blob),
          mimeType: S.optional(S.String),
          uri: S.optional(S.String),
          name: S.optional(S.String),
          description: S.optional(S.String),
          size: S.optional(S.Number),
          resource: S.optional(__S(2116, __c66, 4)),
        }),
      ).annotate({ identifier: "ContentBlock" });
    case 6:
      return S.Array(__S(2117, __c66, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({
          taskId: S.optional(S.String),
          taskStatus: S.optional(S.String),
          stdout: S.optional(S.String),
          stderr: S.optional(S.String),
          exitCode: S.optional(S.Number),
          executionTime: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ToolResultStructuredContent" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          content: __S(2118, __c66, 6),
          structuredContent: S.optional(__S(2119, __c66, 7)),
          isError: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "CodeInterpreterResult" });
    case 9:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ result: __S(2120, __c66, 8) }),
          /*@__PURE__*/ S.Struct({
            accessDeniedException: /*@__PURE__*/ S.suspend(() => AccessDeniedException).annotate({
              identifier: "AccessDeniedException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            conflictException: /*@__PURE__*/ S.suspend(() => ConflictException).annotate({
              identifier: "ConflictException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            internalServerException: /*@__PURE__*/ S.suspend(
              () => InternalServerException,
            ).annotate({ identifier: "InternalServerException" }),
          }),
          /*@__PURE__*/ S.Struct({
            resourceNotFoundException: /*@__PURE__*/ S.suspend(
              () => ResourceNotFoundException,
            ).annotate({ identifier: "ResourceNotFoundException" }),
          }),
          /*@__PURE__*/ S.Struct({
            serviceQuotaExceededException: /*@__PURE__*/ S.suspend(
              () => ServiceQuotaExceededException,
            ).annotate({ identifier: "ServiceQuotaExceededException" }),
          }),
          /*@__PURE__*/ S.Struct({
            throttlingException: /*@__PURE__*/ S.suspend(() => ThrottlingException).annotate({
              identifier: "ThrottlingException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            validationException: /*@__PURE__*/ S.suspend(() => ValidationException).annotate({
              identifier: "ValidationException",
            }),
          }),
        ]),
      );
    case 10:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.optional(S.String).pipe(T.HttpHeader("x-amzn-code-interpreter-session-id")),
          stream: __S(2121, __c66, 9).pipe(T.HttpPayload()),
        }),
      ).annotate({ identifier: "InvokeCodeInterpreterResponse" });
  }
}
function __c67(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          toolUseId: S.String,
          input: S.Any,
          type: S.optional(S.String),
          serverName: S.optional(S.String),
        }),
      ).annotate({ identifier: "HarnessToolUseBlock" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: SensitiveString }),
        /*@__PURE__*/ S.Struct({ json: S.Any }),
      ]);
    case 2:
      return S.Array(__S(2145, __c67, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          toolUseId: S.String,
          content: __S(2146, __c67, 2),
          status: S.optional(S.String),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "HarnessToolResultBlock" });
    case 4:
      return S.suspend(() =>
        S.Struct({ text: S.String, signature: S.optional(S.String) }),
      ).annotate({ identifier: "HarnessReasoningTextBlock" });
    case 5:
      return S.Union([
        /*@__PURE__*/ S.Struct({ reasoningText: __S(2148, __c67, 4) }),
        /*@__PURE__*/ S.Struct({ redactedContent: T.Blob }),
      ]);
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: SensitiveString }),
        /*@__PURE__*/ S.Struct({ toolUse: __S(2144, __c67, 0) }),
        /*@__PURE__*/ S.Struct({ toolResult: __S(2147, __c67, 3) }),
        /*@__PURE__*/ S.Struct({ reasoningContent: __S(2149, __c67, 5) }),
      ]);
    case 7:
      return S.Array(__S(2150, __c67, 6));
    case 8:
      return S.suspend(() => S.Struct({ role: S.String, content: __S(2151, __c67, 7) })).annotate({
        identifier: "HarnessMessage",
      });
    case 9:
      return S.Array(__S(2152, __c67, 8));
    case 10:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String,
          maxTokens: S.optional(S.Number),
          temperature: S.optional(S.Number),
          topP: S.optional(S.Number),
          apiFormat: S.optional(S.String),
          additionalParams: S.optional(S.Any),
        }),
      ).annotate({ identifier: "HarnessBedrockModelConfig" });
    case 11:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String,
          apiKeyArn: S.String,
          apiBase: S.optional(SensitiveString),
          maxTokens: S.optional(S.Number),
          temperature: S.optional(S.Number),
          topP: S.optional(S.Number),
          apiFormat: S.optional(S.String),
          additionalParams: S.optional(S.Any),
        }),
      ).annotate({ identifier: "HarnessOpenAiModelConfig" });
    case 12:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String,
          apiKeyArn: S.String,
          maxTokens: S.optional(S.Number),
          temperature: S.optional(S.Number),
          topP: S.optional(S.Number),
          topK: S.optional(S.Number),
          additionalParams: S.optional(S.Any),
        }),
      ).annotate({ identifier: "HarnessGeminiModelConfig" });
    case 13:
      return S.suspend(() =>
        S.Struct({
          modelId: S.String,
          apiKeyArn: S.optional(S.String),
          apiBase: S.optional(SensitiveString),
          maxTokens: S.optional(S.Number),
          temperature: S.optional(S.Number),
          topP: S.optional(S.Number),
          additionalParams: S.optional(S.Any),
        }),
      ).annotate({ identifier: "HarnessLiteLlmModelConfig" });
    case 14:
      return S.Union([
        /*@__PURE__*/ S.Struct({ bedrockModelConfig: __S(2154, __c67, 10) }),
        /*@__PURE__*/ S.Struct({ openAiModelConfig: __S(2155, __c67, 11) }),
        /*@__PURE__*/ S.Struct({ geminiModelConfig: __S(2156, __c67, 12) }),
        /*@__PURE__*/ S.Struct({ liteLlmModelConfig: __S(2157, __c67, 13) }),
      ]);
    case 15:
      return S.Array(__S(160, __c5, 0));
    case 16:
      return S.suspend(() =>
        S.Struct({ url: SensitiveString, headers: S.optional(__S(384, __c12, 0)) }),
      ).annotate({ identifier: "HarnessRemoteMcpConfig" });
    case 17:
      return S.suspend(() => S.Struct({ browserArn: S.optional(S.String) })).annotate({
        identifier: "HarnessAgentCoreBrowserConfig",
      });
    case 18:
      return S.suspend(() =>
        S.Struct({
          providerArn: S.String,
          scopes: __S(128, __c4, 0),
          customParameters: S.optional(__S(1792, __c56, 0)),
          grantType: S.optional(S.String),
          defaultReturnUrl: S.optional(S.String),
        }),
      ).annotate({ identifier: "OAuthCredentialProvider" });
    case 19:
      return S.Union([
        /*@__PURE__*/ S.Struct({ awsIam: /*@__PURE__*/ S.Struct({}) }),
        /*@__PURE__*/ S.Struct({ none: /*@__PURE__*/ S.Struct({}) }),
        /*@__PURE__*/ S.Struct({ oauth: __S(2162, __c67, 18) }),
      ]);
    case 20:
      return S.suspend(() =>
        S.Struct({ gatewayArn: S.String, outboundAuth: S.optional(__S(2163, __c67, 19)) }),
      ).annotate({ identifier: "HarnessAgentCoreGatewayConfig" });
    case 21:
      return S.suspend(() =>
        S.Struct({ description: SensitiveString, inputSchema: S.Any }),
      ).annotate({ identifier: "HarnessInlineFunctionConfig" });
    case 22:
      return S.suspend(() => S.Struct({ codeInterpreterArn: S.optional(S.String) })).annotate({
        identifier: "HarnessAgentCoreCodeInterpreterConfig",
      });
    case 23:
      return S.Union([
        /*@__PURE__*/ S.Struct({ remoteMcp: __S(2160, __c67, 16) }),
        /*@__PURE__*/ S.Struct({ agentCoreBrowser: __S(2161, __c67, 17) }),
        /*@__PURE__*/ S.Struct({ agentCoreGateway: __S(2164, __c67, 20) }),
        /*@__PURE__*/ S.Struct({ inlineFunction: __S(2165, __c67, 21) }),
        /*@__PURE__*/ S.Struct({ agentCoreCodeInterpreter: __S(2166, __c67, 22) }),
      ]);
    case 24:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          name: S.optional(S.String),
          config: S.optional(__S(2167, __c67, 23)),
        }),
      ).annotate({ identifier: "HarnessTool" });
    case 25:
      return S.Array(__S(2168, __c67, 24));
    case 26:
      return S.suspend(() => S.Struct({ uri: S.String })).annotate({
        identifier: "HarnessSkillS3Source",
      });
    case 27:
      return S.suspend(() =>
        S.Struct({ credentialArn: S.String, username: S.optional(S.String) }),
      ).annotate({ identifier: "HarnessSkillGitAuth" });
    case 28:
      return S.suspend(() =>
        S.Struct({
          url: S.String,
          path: S.optional(S.String),
          auth: S.optional(__S(2171, __c67, 27)),
        }),
      ).annotate({ identifier: "HarnessSkillGitSource" });
    case 29:
      return S.suspend(() => S.Struct({ paths: S.optional(__S(128, __c4, 0)) })).annotate({
        identifier: "HarnessSkillAwsSkillsSource",
      });
    case 30:
      return S.Union([
        /*@__PURE__*/ S.Struct({ path: S.String }),
        /*@__PURE__*/ S.Struct({ s3: __S(2170, __c67, 26) }),
        /*@__PURE__*/ S.Struct({ git: __S(2172, __c67, 28) }),
        /*@__PURE__*/ S.Struct({ awsSkills: __S(2173, __c67, 29) }),
      ]);
    case 31:
      return S.Array(__S(2174, __c67, 30));
  }
}
function __c68(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          harnessArn: S.String.pipe(T.HttpQuery("harnessArn")),
          qualifier: S.optional(S.String).pipe(T.HttpQuery("qualifier")),
          runtimeSessionId: S.String.pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
          ),
          runtimeUserId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-User-Id"),
          ),
          traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
          traceState: S.optional(S.String).pipe(T.HttpHeader("tracestate")),
          traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
          baggage: S.optional(S.String).pipe(T.HttpHeader("baggage")),
          messages: __S(2153, __c67, 9),
          model: S.optional(__S(2158, __c67, 14)),
          systemPrompt: S.optional(__S(2159, __c67, 15)),
          tools: S.optional(__S(2169, __c67, 25)),
          skills: S.optional(__S(2175, __c67, 31)),
          allowedTools: S.optional(__S(128, __c4, 0)),
          maxIterations: S.optional(S.Number),
          maxTokens: S.optional(S.Number),
          timeoutSeconds: S.optional(S.Number),
          actorId: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/harnesses/invoke" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "InvokeHarnessRequest" });
    case 1:
      return S.suspend(() => S.Struct({ role: S.String })).annotate({
        identifier: "HarnessMessageStartEvent",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          toolUseId: S.String,
          name: S.String,
          type: S.optional(S.String),
          serverName: S.optional(S.String),
        }),
      ).annotate({ identifier: "HarnessToolUseBlockStart" });
    case 3:
      return S.suspend(() =>
        S.Struct({ toolUseId: S.String, status: S.optional(S.String) }),
      ).annotate({ identifier: "HarnessToolResultBlockStart" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ toolUse: __S(2178, __c68, 2) }),
        /*@__PURE__*/ S.Struct({ toolResult: __S(2179, __c68, 3) }),
      ]);
    case 5:
      return S.suspend(() =>
        S.Struct({ contentBlockIndex: S.Number, start: __S(2180, __c68, 4) }),
      ).annotate({ identifier: "HarnessContentBlockStartEvent" });
    case 6:
      return S.suspend(() => S.Struct({ input: SensitiveString })).annotate({
        identifier: "HarnessToolUseBlockDelta",
      });
    case 7:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: S.String }),
        /*@__PURE__*/ S.Struct({ redactedContent: SensitiveBlob }),
        /*@__PURE__*/ S.Struct({ signature: S.String }),
      ]);
    case 8:
      return S.suspend(() => S.Struct({ metadata: SensitiveString })).annotate({
        identifier: "HarnessToolResultMetadataBlockDelta",
      });
    case 9:
      return S.Union([
        /*@__PURE__*/ S.Struct({ text: SensitiveString }),
        /*@__PURE__*/ S.Struct({ toolUse: __S(2182, __c68, 6) }),
        /*@__PURE__*/ S.Struct({ toolResult: __S(2146, __c67, 2) }),
        /*@__PURE__*/ S.Struct({ reasoningContent: __S(2183, __c68, 7) }),
        /*@__PURE__*/ S.Struct({ toolResultMetadata: __S(2184, __c68, 8) }),
      ]);
    case 10:
      return S.suspend(() =>
        S.Struct({ contentBlockIndex: S.Number, delta: __S(2185, __c68, 9) }),
      ).annotate({ identifier: "HarnessContentBlockDeltaEvent" });
    case 11:
      return S.suspend(() => S.Struct({ contentBlockIndex: S.Number })).annotate({
        identifier: "HarnessContentBlockStopEvent",
      });
    case 12:
      return S.suspend(() => S.Struct({ stopReason: S.String })).annotate({
        identifier: "HarnessMessageStopEvent",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          inputTokens: S.Number,
          outputTokens: S.Number,
          totalTokens: S.Number,
          cacheReadInputTokens: S.optional(S.Number),
          cacheWriteInputTokens: S.optional(S.Number),
        }),
      ).annotate({ identifier: "HarnessTokenUsage" });
    case 14:
      return S.suspend(() => S.Struct({ latencyMs: S.Number })).annotate({
        identifier: "HarnessStreamMetrics",
      });
    case 15:
      return S.suspend(() =>
        S.Struct({ usage: __S(2189, __c68, 13), metrics: __S(2190, __c68, 14) }),
      ).annotate({ identifier: "HarnessMetadataEvent" });
    case 16:
      return S.suspend(() =>
        S.Struct({
          hookEventId: S.String,
          name: S.String,
          type: S.String,
          decision: S.optional(S.String),
          reason: S.optional(S.String),
        }),
      ).annotate({ identifier: "HarnessHookEvent" });
    case 17:
      return T.EventStream(
        /*@__PURE__*/ S.Union([
          /*@__PURE__*/ S.Struct({ messageStart: __S(2177, __c68, 1) }),
          /*@__PURE__*/ S.Struct({ contentBlockStart: __S(2181, __c68, 5) }),
          /*@__PURE__*/ S.Struct({ contentBlockDelta: __S(2186, __c68, 10) }),
          /*@__PURE__*/ S.Struct({ contentBlockStop: __S(2187, __c68, 11) }),
          /*@__PURE__*/ S.Struct({ messageStop: __S(2188, __c68, 12) }),
          /*@__PURE__*/ S.Struct({ metadata: __S(2191, __c68, 15) }),
          /*@__PURE__*/ S.Struct({
            internalServerException: /*@__PURE__*/ S.suspend(
              () => InternalServerException,
            ).annotate({ identifier: "InternalServerException" }),
          }),
          /*@__PURE__*/ S.Struct({
            validationException: /*@__PURE__*/ S.suspend(() => ValidationException).annotate({
              identifier: "ValidationException",
            }),
          }),
          /*@__PURE__*/ S.Struct({
            runtimeClientError: /*@__PURE__*/ S.suspend(() => RuntimeClientError).annotate({
              identifier: "RuntimeClientError",
            }),
          }),
          /*@__PURE__*/ S.Struct({ hookEvent: __S(2192, __c68, 16) }),
        ]),
      );
    case 18:
      return S.suspend(() =>
        S.Struct({ stream: __S(2193, __c68, 17).pipe(T.HttpPayload()) }),
      ).annotate({ identifier: "InvokeHarnessResponse" });
  }
}
function __c69(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          include: S.optional(__S(128, __c4, 0)),
          exclude: S.optional(__S(128, __c4, 0)),
        }),
      ).annotate({ identifier: "DomainFilter" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          publishedAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          publishedBefore: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "PublishedDateFilter" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          domainFilter: S.optional(__S(2208, __c69, 0)),
          publishedDateFilter: S.optional(__S(2209, __c69, 1)),
        }),
      ).annotate({ identifier: "WebSearchFilters" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          webSearchId: S.String.pipe(T.HttpLabel("webSearchId")),
          searchQuery: S.String,
          maxResults: S.optional(S.Number),
          filters: S.optional(__S(2210, __c69, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/web-search/{webSearchId}/invoke" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "InvokeWebSearchInput" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          title: S.optional(S.String),
          url: S.optional(S.String),
          text: S.String,
          publishedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "WebSearchResult" });
    case 5:
      return S.Array(__S(2212, __c69, 4));
    case 6:
      return S.suspend(() => S.Struct({ results: __S(2213, __c69, 5) })).annotate({
        identifier: "InvokeWebSearchOutput",
      });
  }
}
function __c70(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/ab-tests" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListABTestsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          abTestId: S.String,
          abTestArn: S.String,
          name: S.String,
          status: S.String,
          executionStatus: S.String,
          description: S.optional(S.String),
          gatewayArn: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ABTestSummary" });
    case 2:
      return S.Array(__S(2241, __c70, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ abTests: __S(2242, __c70, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListABTestsResponse" });
  }
}
function __c71(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/memories/{memoryId}/actors" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListActorsInput" });
    case 1:
      return S.suspend(() => S.Struct({ actorId: S.String })).annotate({
        identifier: "ActorSummary",
      });
    case 2:
      return S.Array(__S(2273, __c71, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ actorSummaries: __S(2274, __c71, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListActorsOutput" });
  }
}
function __c72(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/evaluations/batch-evaluate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBatchEvaluationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          batchEvaluationId: S.String,
          batchEvaluationArn: S.String,
          batchEvaluationName: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          description: S.optional(S.String),
          evaluators: S.optional(__S(1281, __c40, 1)),
          insights: S.optional(__S(1283, __c40, 3)),
          evaluationResults: S.optional(__S(1251, __c39, 3)),
          errorDetails: S.optional(__S(128, __c4, 0)),
          kmsKeyArn: S.optional(S.String),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "BatchEvaluationSummary" });
    case 2:
      return S.Array(__S(2305, __c72, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ batchEvaluations: __S(2306, __c72, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBatchEvaluationsResponse" });
  }
}
function __c73(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          browserIdentifier: S.String.pipe(T.HttpLabel("browserIdentifier")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          status: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/browsers/{browserIdentifier}/sessions/list" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListBrowserSessionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          browserIdentifier: S.String,
          sessionId: S.String,
          name: S.optional(S.String),
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "BrowserSessionSummary" });
    case 2:
      return S.Array(__S(2337, __c73, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(2338, __c73, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListBrowserSessionsResponse" });
  }
}
function __c74(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          codeInterpreterIdentifier: S.String.pipe(T.HttpLabel("codeInterpreterIdentifier")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          status: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/code-interpreters/{codeInterpreterIdentifier}/sessions/list",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListCodeInterpreterSessionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          codeInterpreterIdentifier: S.String,
          sessionId: S.String,
          name: S.optional(S.String),
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          lastUpdatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "CodeInterpreterSessionSummary" });
    case 2:
      return S.Array(__S(2369, __c74, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ items: __S(2370, __c74, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListCodeInterpreterSessionsResponse" });
  }
}
function __c75(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, includeParentBranches: S.optional(S.Boolean) }),
      ).annotate({ identifier: "BranchFilter" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ metadataValue: __S(514, __c16, 2) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          left: __S(2432, __c76, 0),
          operator: S.String,
          right: S.optional(__S(2401, __c75, 1)),
        }),
      ).annotate({ identifier: "EventMetadataFilterExpression" });
    case 3:
      return S.Array(__S(2402, __c75, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          branch: S.optional(__S(2400, __c75, 0)),
          eventMetadata: S.optional(__S(2403, __c75, 3)),
        }),
      ).annotate({ identifier: "FilterInput" });
    case 5:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          actorId: S.String.pipe(T.HttpLabel("actorId")),
          includePayloads: S.optional(S.Boolean),
          filter: S.optional(__S(2404, __c75, 4)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/memories/{memoryId}/actor/{actorId}/sessions/{sessionId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListEventsInput" });
    case 6:
      return S.Array(__S(547, __c17, 3));
    case 7:
      return S.suspend(() =>
        S.Struct({ events: __S(2406, __c75, 6), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEventsOutput" });
  }
}
function __c76(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ metadataKey: S.String })]);
  }
}
function __c77(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          strategyId: S.optional(S.String),
          sessionId: S.optional(S.String),
          actorId: S.optional(S.String),
          status: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExtractionJobFilterInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          maxResults: S.optional(S.Number),
          filter: S.optional(__S(2464, __c77, 0)),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/memories/{memoryId}/extractionJobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMemoryExtractionJobsInput" });
    case 2:
      return S.suspend(() => S.Struct({ eventId: S.String, messageIndex: S.Number })).annotate({
        identifier: "MessageMetadata",
      });
    case 3:
      return S.Array(__S(2466, __c77, 2));
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ messagesList: __S(2467, __c77, 3) })]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          jobID: S.String,
          messages: __S(2468, __c77, 4),
          status: S.optional(S.String),
          failureReason: S.optional(S.String),
          strategyId: S.optional(S.String),
          sessionId: S.optional(S.String),
          actorId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ExtractionJobMetadata" });
    case 6:
      return S.Array(__S(2469, __c77, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ jobs: __S(2470, __c77, 6), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMemoryExtractionJobsOutput" });
  }
}
function __c78(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          namespace: S.optional(S.String),
          namespacePath: S.optional(S.String),
          memoryStrategyId: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          metadataFilters: S.optional(__S(2530, __c79, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/memories/{memoryId}/memoryRecords" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListMemoryRecordsInput" });
  }
}
function __c79(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ metadataValue: __S(192, __c6, 0) })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          left: __S(2432, __c76, 0),
          operator: S.String,
          right: S.optional(__S(2528, __c79, 0)),
        }),
      ).annotate({ identifier: "MemoryMetadataFilterExpression" });
    case 2:
      return S.Array(__S(2529, __c79, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          memoryRecordId: S.String,
          content: __S(160, __c5, 0),
          memoryStrategyId: S.optional(S.String),
          namespaces: __S(128, __c4, 0),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          score: S.optional(S.Number),
          timestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          metadata: S.optional(__S(193, __c6, 1)),
        }),
      ).annotate({ identifier: "MemoryRecordSummary" });
    case 4:
      return S.Array(__S(2531, __c79, 3));
    case 5:
      return S.suspend(() =>
        S.Struct({ memoryRecordSummaries: __S(2532, __c79, 4), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMemoryRecordsOutput" });
  }
}
function __c80(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
          ),
          agentName: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
          ),
          paymentManagerArn: S.String,
          paymentConnectorId: S.optional(S.String),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/payments/listPaymentInstruments" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPaymentInstrumentsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          paymentInstrumentId: S.String,
          paymentManagerArn: S.String,
          paymentConnectorId: S.String,
          userId: S.String,
          paymentInstrumentType: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "PaymentInstrumentSummary" });
    case 2:
      return S.Array(__S(2561, __c80, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ paymentInstruments: __S(2562, __c80, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPaymentInstrumentsResponse" });
  }
}
function __c81(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          userId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
          ),
          agentName: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
          ),
          paymentManagerArn: S.String,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/payments/listPaymentSessions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListPaymentSessionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          paymentSessionId: S.String,
          paymentManagerArn: S.String,
          userId: S.String,
          expiryTimeInMinutes: S.Number,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "PaymentSessionSummary" });
    case 2:
      return S.Array(__S(2593, __c81, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ paymentSessions: __S(2594, __c81, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListPaymentSessionsResponse" });
  }
}
function __c82(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          statusFilter: S.optional(S.String).pipe(T.HttpQuery("status")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/recommendations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recommendationId: S.String,
          recommendationArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          type: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "RecommendationSummary" });
    case 2:
      return S.Array(__S(2625, __c82, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ recommendationSummaries: __S(2626, __c82, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRecommendationsResponse" });
  }
}
function __c83(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ eventFilter: S.optional(S.String) })).annotate({
        identifier: "SessionFilter",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          actorId: S.String.pipe(T.HttpLabel("actorId")),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
          filter: S.optional(__S(2656, __c83, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/memories/{memoryId}/actor/{actorId}/sessions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListSessionsInput" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.String,
          actorId: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "SessionSummary" });
    case 3:
      return S.Array(__S(2658, __c83, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ sessionSummaries: __S(2659, __c83, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSessionsOutput" });
  }
}
function __c84(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          version: S.String,
          payload: S.Any,
          permit2AllowanceLimit: S.optional(S.String),
        }),
      ).annotate({ identifier: "CryptoX402PaymentInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          version: S.String,
          wwwAuthenticateHeaders: __S(128, __c4, 0),
          buyerPaysGasFees: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "MppPaymentInput" });
    case 2:
      return S.Union([
        /*@__PURE__*/ S.Struct({ cryptoX402: __S(2688, __c84, 0) }),
        /*@__PURE__*/ S.Struct({ mpp: __S(2689, __c84, 1) }),
      ]);
    case 3:
      return S.suspend(() =>
        S.Struct({
          userId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-User-Id"),
          ),
          agentName: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Payments-Agent-Name"),
          ),
          paymentManagerArn: S.String,
          paymentSessionId: S.String,
          paymentInstrumentId: S.String,
          paymentType: S.String,
          paymentInput: __S(2690, __c84, 2),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/payments/processPayment" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ProcessPaymentRequest" });
    case 4:
      return S.suspend(() => S.Struct({ version: S.String, payload: S.Any })).annotate({
        identifier: "CryptoX402PaymentOutput",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          version: S.String,
          selectedPaymentId: S.String,
          paymentCredential: SensitiveString,
        }),
      ).annotate({ identifier: "MppPaymentOutput" });
    case 6:
      return S.Union([
        /*@__PURE__*/ S.Struct({ cryptoX402: __S(2692, __c84, 4) }),
        /*@__PURE__*/ S.Struct({ mpp: __S(2693, __c84, 5) }),
      ]);
    case 7:
      return S.suspend(() =>
        S.Struct({
          processPaymentId: S.String,
          paymentManagerArn: S.String,
          paymentSessionId: S.String,
          paymentInstrumentId: S.String,
          paymentType: S.String,
          status: S.String,
          paymentOutput: __S(2694, __c84, 6),
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "ProcessPaymentResponse" });
  }
}
function __c85(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          searchQuery: SensitiveString,
          memoryStrategyId: S.optional(S.String),
          topK: S.optional(S.Number),
          metadataFilters: S.optional(__S(2530, __c79, 2)),
        }),
      ).annotate({ identifier: "SearchCriteria" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          namespace: S.optional(S.String),
          namespacePath: S.optional(S.String),
          searchCriteria: __S(2720, __c85, 0),
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/memories/{memoryId}/retrieve" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RetrieveMemoryRecordsInput" });
  }
}
function __c86(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
          traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
          profileIdentifier: S.String.pipe(T.HttpLabel("profileIdentifier")),
          browserIdentifier: S.String,
          sessionId: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/browser-profiles/{profileIdentifier}/save" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SaveBrowserSessionProfileRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          profileIdentifier: S.String,
          browserIdentifier: S.String,
          sessionId: S.String,
          lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "SaveBrowserSessionProfileResponse" });
  }
}
function __c87(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          searchQuery: S.String,
          registryIds: __S(128, __c4, 0),
          maxResults: S.optional(S.Number),
          filters: S.optional(S.Any),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/registry-records/search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchRegistryRecordsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ schemaVersion: S.optional(S.String), inlineContent: S.optional(S.String) }),
      ).annotate({ identifier: "ServerDefinition" });
    case 2:
      return S.suspend(() =>
        S.Struct({ protocolVersion: S.optional(S.String), inlineContent: S.optional(S.String) }),
      ).annotate({ identifier: "ToolsDefinition" });
    case 3:
      return S.suspend(() =>
        S.Struct({ server: __S(2785, __c87, 1), tools: __S(2786, __c87, 2) }),
      ).annotate({ identifier: "McpDescriptor" });
    case 4:
      return S.suspend(() => S.Struct({ agentCard: __S(2785, __c87, 1) })).annotate({
        identifier: "A2aDescriptor",
      });
    case 5:
      return S.suspend(() => S.Struct({ inlineContent: S.optional(S.String) })).annotate({
        identifier: "CustomDescriptor",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          skillMd: __S(2789, __c87, 5),
          skillDefinition: S.optional(__S(2785, __c87, 1)),
        }),
      ).annotate({ identifier: "AgentSkillsDescriptor" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          mcp: S.optional(__S(2787, __c87, 3)),
          a2a: S.optional(__S(2788, __c87, 4)),
          custom: S.optional(__S(2789, __c87, 5)),
          agentSkills: S.optional(__S(2790, __c87, 6)),
        }),
      ).annotate({ identifier: "Descriptors" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          registryArn: S.String,
          recordArn: S.String,
          recordId: S.String,
          name: S.String,
          description: S.optional(SensitiveString),
          descriptorType: S.String,
          descriptors: __S(2791, __c87, 7),
          version: S.String,
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "RegistryRecordSummary" });
    case 9:
      return S.Array(__S(2792, __c87, 8));
    case 10:
      return S.suspend(() => S.Struct({ registryRecords: __S(2793, __c87, 9) })).annotate({
        identifier: "SearchRegistryRecordsResponse",
      });
  }
}
function __c88(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ prompt: S.String })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          input: S.optional(__S(2816, __c88, 0)),
          expectedResponse: S.optional(__S(1088, __c34, 0)),
        }),
      ).annotate({ identifier: "GroundTruthTurn" });
    case 2:
      return S.Array(__S(2817, __c88, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          assertions: S.optional(__S(1089, __c34, 1)),
          expectedTrajectory: S.optional(__S(1090, __c34, 2)),
          turns: S.optional(__S(2818, __c88, 2)),
        }),
      ).annotate({ identifier: "InlineGroundTruth" });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ inline: __S(2819, __c88, 3) })]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.String,
          testScenarioId: S.optional(S.String),
          groundTruth: S.optional(__S(2820, __c88, 4)),
          metadata: S.optional(__S(384, __c12, 0)),
        }),
      ).annotate({ identifier: "SessionMetadataShape" });
    case 6:
      return S.Array(__S(2821, __c88, 5));
    case 7:
      return S.Union([/*@__PURE__*/ S.Struct({ sessionMetadata: __S(2822, __c88, 6) })]);
    case 8:
      return S.suspend(() =>
        S.Struct({
          batchEvaluationName: S.String,
          evaluators: S.optional(__S(1281, __c40, 1)),
          insights: S.optional(__S(1283, __c40, 3)),
          dataSourceConfig: __S(1318, __c41, 6),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          evaluationMetadata: S.optional(__S(2823, __c88, 7)),
          tags: S.optional(__S(384, __c12, 0)),
          kmsKeyArn: S.optional(S.String),
          description: S.optional(S.String),
          outputConfig: S.optional(__S(1320, __c41, 8)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/evaluations/batch-evaluate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartBatchEvaluationRequest" });
    case 9:
      return S.suspend(() =>
        S.Struct({
          batchEvaluationId: S.String,
          batchEvaluationArn: S.String,
          batchEvaluationName: S.String,
          evaluators: S.optional(__S(1281, __c40, 1)),
          insights: S.optional(__S(1283, __c40, 3)),
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          outputConfig: S.optional(__S(1320, __c41, 8)),
          tags: S.optional(__S(384, __c12, 0)),
          kmsKeyArn: S.optional(S.String),
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartBatchEvaluationResponse" });
  }
}
function __c89(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
          traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
          browserIdentifier: S.String.pipe(T.HttpLabel("browserIdentifier")),
          name: S.optional(S.String),
          sessionTimeoutSeconds: S.optional(S.Number),
          viewPort: S.optional(__S(1408, __c44, 0)),
          extensions: S.optional(__S(1412, __c44, 4)),
          profileConfiguration: S.optional(__S(1415, __c44, 7)),
          proxyConfiguration: S.optional(__S(1421, __c44, 13)),
          enterprisePolicies: S.optional(__S(1414, __c44, 6)),
          certificates: S.optional(__S(1379, __c43, 3)),
          filesystemConfigurations: S.optional(__S(1382, __c43, 6)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/browsers/{browserIdentifier}/sessions/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartBrowserSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          browserIdentifier: S.String,
          sessionId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          streams: S.optional(__S(1442, __c45, 2)),
        }),
      ).annotate({ identifier: "StartBrowserSessionResponse" });
  }
}
function __c90(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
          traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
          codeInterpreterIdentifier: S.String.pipe(T.HttpLabel("codeInterpreterIdentifier")),
          name: S.optional(S.String),
          sessionTimeoutSeconds: S.optional(S.Number),
          certificates: S.optional(__S(1379, __c43, 3)),
          filesystemConfigurations: S.optional(__S(1382, __c43, 6)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/code-interpreters/{codeInterpreterIdentifier}/sessions/start",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartCodeInterpreterSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          codeInterpreterIdentifier: S.String,
          sessionId: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "StartCodeInterpreterSessionResponse" });
  }
}
function __c91(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ jobId: S.String })).annotate({
        identifier: "ExtractionJob",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String.pipe(T.HttpLabel("memoryId")),
          extractionJob: __S(2912, __c91, 0),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/memories/{memoryId}/extractionJobs/start" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartMemoryExtractionJobInput" });
  }
}
function __c92(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          description: S.optional(S.String),
          type: S.String,
          recommendationConfig: __S(1718, __c53, 22),
          kmsKeyArn: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(384, __c12, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/recommendations" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "StartRecommendationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recommendationId: S.String,
          recommendationArn: S.String,
          name: S.String,
          description: S.optional(S.String),
          type: S.String,
          recommendationConfig: __S(1718, __c53, 22),
          status: S.String,
          createdAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "StartRecommendationResponse" });
  }
}
function __c93(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ batchEvaluationId: S.String.pipe(T.HttpLabel("batchEvaluationId")) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/evaluations/batch-evaluate/{batchEvaluationId}/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopBatchEvaluationRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          batchEvaluationId: S.String,
          batchEvaluationArn: S.String,
          status: S.String,
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "StopBatchEvaluationResponse" });
  }
}
function __c94(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
          traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
          browserIdentifier: S.String.pipe(T.HttpLabel("browserIdentifier")),
          sessionId: S.String.pipe(T.HttpQuery("sessionId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/browsers/{browserIdentifier}/sessions/stop" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopBrowserSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          browserIdentifier: S.String,
          sessionId: S.String,
          lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "StopBrowserSessionResponse" });
  }
}
function __c95(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          traceId: S.optional(S.String).pipe(T.HttpHeader("X-Amzn-Trace-Id")),
          traceParent: S.optional(S.String).pipe(T.HttpHeader("traceparent")),
          codeInterpreterIdentifier: S.String.pipe(T.HttpLabel("codeInterpreterIdentifier")),
          sessionId: S.String.pipe(T.HttpQuery("sessionId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({
              method: "PUT",
              uri: "/code-interpreters/{codeInterpreterIdentifier}/sessions/stop",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopCodeInterpreterSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          codeInterpreterIdentifier: S.String,
          sessionId: S.String,
          lastUpdatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "StopCodeInterpreterSessionResponse" });
  }
}
function __c96(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          runtimeSessionId: S.String.pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
          ),
          agentRuntimeArn: S.String.pipe(T.HttpLabel("agentRuntimeArn")),
          qualifier: S.optional(S.String).pipe(T.HttpQuery("qualifier")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/runtimes/{agentRuntimeArn}/stopruntimesession" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StopRuntimeSessionRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          runtimeSessionId: S.optional(S.String).pipe(
            T.HttpHeader("X-Amzn-Bedrock-AgentCore-Runtime-Session-Id"),
          ),
          statusCode: S.optional(S.Number).pipe(T.HttpResponseCode()),
        }),
      ).annotate({ identifier: "StopRuntimeSessionResponse" });
  }
}
function __c97(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          abTestId: S.String.pipe(T.HttpLabel("abTestId")),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          name: S.optional(S.String),
          description: S.optional(S.String),
          variants: S.optional(__S(420, __c13, 4)),
          gatewayFilter: S.optional(__S(421, __c13, 5)),
          evaluationConfig: S.optional(__S(424, __c13, 8)),
          roleArn: S.optional(S.String),
          executionStatus: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/ab-tests/{abTestId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateABTestRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          abTestId: S.String,
          abTestArn: S.String,
          status: S.String,
          executionStatus: S.String,
          updatedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "UpdateABTestResponse" });
  }
}
function __c98(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ streamStatus: S.optional(S.String) })).annotate({
        identifier: "AutomationStreamUpdate",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ automationStreamUpdate: __S(3136, __c98, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          browserIdentifier: S.String.pipe(T.HttpLabel("browserIdentifier")),
          sessionId: S.String.pipe(T.HttpQuery("sessionId")),
          streamUpdate: __S(3137, __c98, 1),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/browsers/{browserIdentifier}/sessions/streams/update" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateBrowserStreamRequest" });
    case 3:
      return S.suspend(() =>
        S.Struct({
          browserIdentifier: S.String,
          sessionId: S.String,
          streams: __S(1442, __c45, 2),
          updatedAt: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "UpdateBrowserStreamResponse" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
