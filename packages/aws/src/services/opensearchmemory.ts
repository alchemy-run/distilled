import * as API from "@distilled.cloud/core/api";
import * as S from "@distilled.cloud/core/schema-lite";
import * as __L from "@distilled.cloud/core/schema-lite";
import * as TxXray from "@distilled.cloud/core/telemetry-xray";
import type * as HttpClient from "effect/http/HttpClient";
import type * as redacted from "effect/Redacted";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import { AwsServiceErrors } from "../errors.ts";
import { AwsProtocol } from "../protocol.ts";
import type { RegionInput } from "../region.ts";
import { Retry } from "../retry.ts";
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "OpenSearchMemory",
  serviceShapeName: "OpenSearchMemory",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "osm" });
const ver = /*@__PURE__*/ T.ServiceVersion("2026-08-24");
const proto = /*@__PURE__*/ T.AwsProtocolsAwsJson1_0();
const rules = /*@__PURE__*/ T.EndpointResolver((p, _) => {
  const { Region, Endpoint, SpaceId, UseFIPS = false } = p;
  const e = (u: unknown, p = {}, h = {}): T.EndpointResolverResult => ({
    type: "endpoint" as const,
    endpoint: { url: u as string, properties: p, headers: h },
  });
  const err = (m: unknown): T.EndpointResolverResult => ({
    type: "error" as const,
    message: m as string,
  });
  if (Endpoint != null && UseFIPS === true) {
    return err("Invalid Configuration: FIPS and custom endpoint are not supported");
  }
  if (Endpoint != null) {
    return e(`${Endpoint}`);
  }
  if (UseFIPS === true) {
    return err("Invalid Configuration: FIPS is not supported with OpenSearch Memory.");
  }
  if (!_.isValidHostLabel(Region, true)) {
    return err("Invalid Configuration: Region must be a valid host label");
  }
  if (SpaceId != null && _.isValidHostLabel(SpaceId, false)) {
    return e(`https://${SpaceId}.osm.${Region}.on.aws`);
  }
  if (SpaceId != null) {
    return err("Invalid SpaceId: must be a valid host label");
  }
  return e(`https://osm.${Region}.api.aws`);
}, '{"url":"https://osm.{R}.api.aws","properties":{},"headers":{}}');

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "OpenSearchMemory",
  service: "OpenSearchMemory",
  templates: false,
  propagate: TxXray.propagate,
} as const;

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceId: /*@__PURE__*/ S.optional(S.String),
      resourceType: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      quotaCode: /*@__PURE__*/ S.optional(S.String),
      serviceCode: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      retryAfterSeconds: /*@__PURE__*/ S.optional(S.Number),
    },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()),
      reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
      fieldList: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => __S(417, __c26, 1)).annotate({
          identifier: "ValidationExceptionFieldList",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type SpaceId = string;
export type ActorId = string;
export type SessionId = string;
export type EventId = string;
export type BatchGetEventIdList = string[];
export interface BatchGetEventInput {
  spaceId: string;
  actorId?: string | undefined;
  sessionId?: string | undefined;
  eventIds: string[];
}
export type MessageRole = "USER" | "ASSISTANT" | "SYSTEM" | (string & {});
export type MessageText = string | redacted.Redacted<string>;
export interface MessageContent {
  text: string | redacted.Redacted<string>;
}
export interface Message {
  role: MessageRole;
  content: MessageContent;
}
export type MessageList = Message[];
export interface UnifiedConversationalObject {
  messages: Message[];
}
export type UnifiedConversationalSource = { object: UnifiedConversationalObject };
export interface UnifiedConversational {
  source: UnifiedConversationalSource;
}
export type ConversationalPayload = { unified: UnifiedConversational };
export type StructuredDataSource = { json: any };
export interface StructuredDataPayload {
  source: StructuredDataSource;
}
export type BlobContentType = "application/pdf" | "image/png" | "image/jpeg" | (string & {});
export interface S3Location {
  uri: string;
}
export type BlobSource = { s3Location: S3Location };
export interface BlobPayload {
  contentType: BlobContentType;
  source: BlobSource;
}
export type EventPayload =
  | { conversational: ConversationalPayload; structuredData?: undefined; blob?: undefined }
  | { conversational?: undefined; structuredData: StructuredDataPayload; blob?: undefined }
  | { conversational?: undefined; structuredData?: undefined; blob: BlobPayload };
export type MetadataKey = string;
export type MetadataValue = string;
export type MetadataMap = { [key: string]: string | undefined };
export type EventTimestamp = Date;
export interface Event {
  eventId: string;
  spaceId: string;
  actorId: string;
  sessionId: string;
  payload: EventPayload;
  metadata?: { [key: string]: string | undefined } | undefined;
  eventTimestamp: Date;
}
export type EventList = Event[];
export type BatchGetEventErrorCode =
  | "RESOURCE_NOT_FOUND"
  | "THROTTLING"
  | "ACCESS_DENIED"
  | "INTERNAL_SERVER"
  | (string & {});
export interface BatchGetEventError_ {
  eventId: string;
  errorCode: BatchGetEventErrorCode;
  message: string;
}
export type BatchGetEventErrorList = BatchGetEventError_[];
export interface BatchGetEventOutput {
  events: Event[];
  errors: BatchGetEventError_[];
}
export type ClientToken = string;
export interface CreateEventInput {
  spaceId: string;
  actorId: string;
  sessionId?: string | undefined;
  eventTimestamp?: Date | undefined;
  payload: EventPayload;
  metadata?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
  infer?: boolean | undefined;
}
export interface EventDetail {
  eventId: string;
  spaceId: string;
  actorId: string;
  sessionId: string;
  eventTimestamp: Date;
}
export interface CreateEventOutput {
  event: EventDetail;
}
export type StrategyName = string;
export type CreateMemoryContent = string | redacted.Redacted<string>;
export interface CreateMemoryInput {
  spaceId: string;
  name: string;
  content: string | redacted.Redacted<string>;
  actorId: string;
  sessionId?: string | undefined;
  metadata?: { [key: string]: string | undefined } | undefined;
  clientToken?: string | undefined;
}
export type MemoryId = string;
export interface CreateMemoryDetail {
  memoryId: string;
  spaceId: string;
  name: string;
  actorId: string;
  sessionId: string;
}
export interface CreateMemoryOutput {
  memory: CreateMemoryDetail;
}
export type SpaceName = string;
export type MemoryStrategyType = "SEMANTIC" | "SUMMARY" | "CUSTOM" | (string & {});
export type MemoryStrategyName = string;
export type MemoryStrategyDescription = string;
export type ExtractionPrompt = string | redacted.Redacted<string>;
export type TriggerEveryNMessages = number;
export type TokenCount = number;
export type IdleTimeoutSeconds = number;
export type SeedMemoryCount = number;
export interface MemoryStrategyConfiguration {
  extractionPrompt?: string | redacted.Redacted<string> | undefined;
  extractEveryNMessages?: number | undefined;
  extractEveryNTokens?: number | undefined;
  idleTimeoutSeconds?: number | undefined;
  extractionSeedTopK?: number | undefined;
  extractionSeedRecentN?: number | undefined;
  consolidationEnabled?: boolean | undefined;
}
export interface MemoryStrategy {
  type: MemoryStrategyType;
  name?: string | undefined;
  description?: string | undefined;
  configuration?: MemoryStrategyConfiguration | undefined;
}
export type MemoryStrategyList = MemoryStrategy[];
export type EventExpiryDays = number;
export type MemoryExpiryDays = number;
export type ExtractionModelId = string;
export interface EncryptionConfiguration {
  kmsKeyArn?: string | undefined;
}
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  key: string;
  value: string;
}
export type TagList = Tag[];
export interface CreateSpaceRequest {
  name: string;
  memoryStrategies?: MemoryStrategy[] | undefined;
  eventExpiryDays?: number | undefined;
  memoryExpiryDays?: number | undefined;
  extractionModelId?: string | undefined;
  encryptionConfiguration?: EncryptionConfiguration | undefined;
  tags?: Tag[] | undefined;
  clientToken?: string | undefined;
}
export type SpaceArn = string;
export type SpaceStatus =
  | "CREATING"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "FAILED"
  | (string & {});
export interface CreateSpaceResponse {
  spaceId: string;
  arn: string;
  name: string;
  status: SpaceStatus;
  createdAt: Date;
}
export interface DeleteEventInput {
  spaceId: string;
  eventId: string;
  actorId?: string | undefined;
  sessionId?: string | undefined;
}
export interface DeleteEventOutput {
  eventId: string;
}
export interface DeleteMemoryInput {
  spaceId: string;
  memoryId: string;
  actorId?: string | undefined;
  strategyName?: string | undefined;
}
export interface DeleteMemoryOutput {
  memoryId: string;
}
export interface DeleteSpaceRequest {
  spaceId: string;
}
export interface DeleteSpaceResponse {
  spaceId: string;
  status: SpaceStatus;
}
export interface GetEventInput {
  spaceId: string;
  eventId: string;
  actorId?: string | undefined;
  sessionId?: string | undefined;
}
export interface GetEventOutput {
  event: Event;
}
export interface GetMemoryInput {
  spaceId: string;
  memoryId: string;
  actorId?: string | undefined;
  strategyName?: string | undefined;
}
export type MemoryType = "SEMANTIC" | "SUMMARY" | "CUSTOM" | (string & {});
export type SensitiveContent = string | redacted.Redacted<string>;
export interface SystemMetadata {
  actorId?: string | undefined;
  sessionId?: string | undefined;
  createdAt?: Date | undefined;
  updatedAt?: Date | undefined;
}
export interface Memory {
  memoryId: string;
  memoryType: MemoryType;
  strategyName?: string | undefined;
  content: string | redacted.Redacted<string>;
  systemMetadata: SystemMetadata;
  metadata?: { [key: string]: string | undefined } | undefined;
}
export interface GetMemoryOutput {
  memory: Memory;
}
export interface GetSpaceRequest {
  spaceId: string;
}
export interface GetSpaceResponse {
  spaceId: string;
  arn: string;
  name: string;
  status: SpaceStatus;
  statusReason?: string | undefined;
  createdAt: Date;
  memoryStrategies?: MemoryStrategy[] | undefined;
  eventExpiryDays?: number | undefined;
  memoryExpiryDays?: number | undefined;
  extractionModelId?: string | undefined;
  encryptionConfiguration?: EncryptionConfiguration | undefined;
}
export type SortOrder = "ASC" | "DESC" | (string & {});
export type MaxResults = number;
export type PaginationToken = string;
export interface ListEventsInput {
  spaceId: string;
  actorId: string;
  sessionId: string;
  eventTimestampBefore?: Date | undefined;
  eventTimestampAfter?: Date | undefined;
  sortOrder?: SortOrder | undefined;
  metadataFilters?: { [key: string]: string | undefined } | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface EventSummary {
  eventId: string;
  metadata?: { [key: string]: string | undefined } | undefined;
  eventTimestamp: Date;
}
export type EventSummaryList = EventSummary[];
export interface ListEventsOutput {
  events: EventSummary[];
  nextToken?: string | undefined;
}
export type StrategyNameList = string[];
export interface StrategySelector {
  memoryType: MemoryType;
  memoryStrategyNames?: string[] | undefined;
}
export type StrategySelectorList = StrategySelector[];
export type ActorIdList = string[];
export type SessionIdList = string[];
export type MemorySortField = "CREATED_AT" | "UPDATED_AT" | (string & {});
export interface ListMemoriesInput {
  spaceId: string;
  memoryStrategies?: StrategySelector[] | undefined;
  actorIds?: string[] | undefined;
  sessionIds?: string[] | undefined;
  sortBy?: MemorySortField | undefined;
  sortOrder?: SortOrder | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface MemoryListSummary {
  memoryId: string;
  memoryType: MemoryType;
  strategyName?: string | undefined;
  systemMetadata: SystemMetadata;
  metadata?: { [key: string]: string | undefined } | undefined;
}
export type MemoryListSummaryList = MemoryListSummary[];
export interface ListMemoriesOutput {
  memories: MemoryListSummary[];
  nextToken?: string | undefined;
}
export type NextToken = string;
export interface ListSpacesRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface SpaceSummary {
  spaceId: string;
  arn: string;
  name: string;
  status: SpaceStatus;
  createdAt: Date;
}
export type SpaceSummaryList = SpaceSummary[];
export interface ListSpacesResponse {
  spaces: SpaceSummary[];
  nextToken?: string | undefined;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: Tag[] | undefined;
}
export type SearchQuery = unknown;
export type SearchSort = unknown;
export interface SearchEventsInput {
  spaceId: string;
  actorId: string;
  sessionIds?: string[] | undefined;
  query: any;
  sort?: any | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface EventSearchSummary {
  eventId: string;
  score?: number | undefined;
  systemMetadata?: SystemMetadata | undefined;
  metadata?: { [key: string]: string | undefined } | undefined;
  matchedContent?: string | redacted.Redacted<string> | undefined;
}
export type EventSearchSummaryList = EventSearchSummary[];
export interface SearchEventsOutput {
  events: EventSearchSummary[];
  nextToken?: string | undefined;
}
export interface SearchMemoriesInput {
  spaceId: string;
  memoryStrategies?: StrategySelector[] | undefined;
  actorId: string;
  query: any;
  sort?: any | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export type SourceEventIdList = string[];
export interface MemorySearchSummary {
  memoryId: string;
  memoryType?: MemoryType | undefined;
  strategyName?: string | undefined;
  content?: string | redacted.Redacted<string> | undefined;
  score?: number | undefined;
  systemMetadata?: SystemMetadata | undefined;
  metadata?: { [key: string]: string | undefined } | undefined;
  sourceEventIds?: string[] | undefined;
}
export type MemorySearchSummaryList = MemorySearchSummary[];
export interface SearchMemoriesOutput {
  memories: MemorySearchSummary[];
  nextToken?: string | undefined;
}
export interface TagResourceRequest {
  resourceArn: string;
  tags: Tag[];
}
export interface TagResourceResponse {}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type MemoryUpdateContent = string | redacted.Redacted<string>;
export type MetadataMode = "REPLACE" | "MERGE" | (string & {});
export interface UpdateMemoryInput {
  spaceId: string;
  memoryId: string;
  content?: string | redacted.Redacted<string> | undefined;
  metadata?: { [key: string]: string | undefined } | undefined;
  metadataMode?: MetadataMode | undefined;
  actorId?: string | undefined;
  strategyName?: string | undefined;
}
export interface UpdateMemoryOutput {
  memory: Memory;
}
export interface UpdateSpaceRequest {
  spaceId: string;
  memoryStrategies?: MemoryStrategy[] | undefined;
  eventExpiryDays?: number | undefined;
  memoryExpiryDays?: number | undefined;
  extractionModelId?: string | undefined;
}
export interface UpdateSpaceResponse {
  spaceId: string;
  status: SpaceStatus;
}
export type ValidationExceptionReason =
  | "disallowedQueryType"
  | "nonFilterableField"
  | "unknownField"
  | "fieldIndexMismatch"
  | "queryNestingTooDeep"
  | "unboundedPattern"
  | "queryBodyTooLarge"
  | "malformedQueryBody"
  | "invalidNextToken"
  | "fieldValidationFailed"
  | "unsupportedParameter"
  | "unsupportedField"
  | "other"
  | (string & {});
export interface ValidationExceptionField {
  name: string;
  message: string;
}
export type ValidationExceptionFieldList = ValidationExceptionField[];
export type BatchGetEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets up to 10 events by ID, each as `GetEvent` returns it, including its payload.
 *
 * If you supply `actorId` or `sessionId`, every requested event must match it. Each event has its own outcome. The operation reports an event that it can't return in `errors` instead of failing, with an error code named for the exception that `GetEvent` would return for it. The operation reports both an event that doesn't exist and an event outside the supplied scope as `RESOURCE_NOT_FOUND`.
 *
 * The exception is the space's customer managed AWS KMS key: if it is disabled, pending deletion, can't be used for decryption, or was deleted, the whole call fails with `ValidationException`, as `GetEvent` does.
 */
export const batchGetEvent: API.OperationMethod<
  BatchGetEventInput & RegionInput,
  BatchGetEventOutput,
  BatchGetEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<BatchGetEventInput>,
  output: __S(436, __c27, 4) as any as S.Schema<BatchGetEventOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "BatchGetEvent",
  telemetry: TELEMETRY,
  span: "BatchGetEvent",
}));

export type CreateEventError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Submits an event (conversation turns, structured data, or a PDF document stored in Amazon S3) to a session in a space.
 *
 * The operation returns as soon as the event is saved. `GetEvent` and `ListEvents` return it immediately. `SearchEvents` returns it after it's indexed. `SearchMemories` returns memories extracted from it only after a strategy's extraction trigger fires and the memories are indexed.
 *
 * If the space uses a customer managed AWS KMS key, the call can also fail because of the key. It fails with `AccessDeniedException` if you aren't allowed to use the key, and with `ThrottlingException` if AWS KMS throttles the request. It fails with `ValidationException` if the key is disabled, pending deletion, or deleted.
 */
export const createEvent: API.OperationMethod<
  CreateEventInput & RegionInput,
  CreateEventOutput,
  CreateEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<CreateEventInput>,
  output: __S(514, __c32, 2) as any as S.Schema<CreateEventOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateEvent",
  telemetry: TELEMETRY,
  span: "CreateEvent",
}));

export type CreateMemoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Writes a memory that you have already formed, without extracting it from events. The service embeds the text as given and stores it as a memory of the named strategy. To have the service extract memories from conversation turns, use `CreateEvent` instead.
 *
 * The operation returns before the memory is searchable. The returned `memoryId` is final, but until the memory is indexed, `GetMemory`, `UpdateMemory`, and `DeleteMemory` return `ResourceNotFoundException` for it.
 *
 * If the request would exceed the service's rate for embedding requests, it fails with `ThrottlingException`. Retry with exponential backoff.
 *
 * If the space uses a customer managed AWS KMS key, the call can also fail because of the key. It fails with `AccessDeniedException` if you aren't allowed to use the key, and with `ThrottlingException` if AWS KMS throttles the request. It fails with `ValidationException` if the key is disabled, pending deletion, or deleted.
 */
export const createMemory: API.OperationMethod<
  CreateMemoryInput & RegionInput,
  CreateMemoryOutput,
  CreateMemoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<CreateMemoryInput>,
  output: __S(530, __c33, 2) as any as S.Schema<CreateMemoryOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMemory",
  telemetry: TELEMETRY,
  span: "CreateMemory",
}));

export type CreateSpaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a space. A space is an AWS resource that stores the events you send and the memories extracted from them, and defines the memory strategies that extract those memories.
 *
 * The operation returns before provisioning finishes, with `status` `CREATING`. Call `GetSpace` until the status is `ACTIVE`, and then use the space. If provisioning fails, the status becomes `FAILED` and `statusReason` says why.
 */
export const createSpace: API.OperationMethod<
  CreateSpaceRequest & RegionInput,
  CreateSpaceResponse,
  CreateSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateSpaceRequest>,
  output: __S(48, __c3, 0) as any as S.Schema<CreateSpaceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSpace",
  telemetry: TELEMETRY,
  span: "CreateSpace",
}));

export type DeleteEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an event. Deletion can't be undone. The event stops appearing in `SearchEvents` results shortly after you delete it. Deleting an event that doesn't exist returns `ResourceNotFoundException`.
 *
 * Deleting an event doesn't delete the memories derived from it, because a memory can combine content from several events. To remove them, use `DeleteMemory`.
 *
 * If the space uses a customer managed AWS KMS key, the call can also fail because of the key. It fails with `AccessDeniedException` if you aren't allowed to use the key, and with `ThrottlingException` if AWS KMS throttles the request. It fails with `ValidationException` if the key is disabled, pending deletion, or deleted.
 */
export const deleteEvent: API.OperationMethod<
  DeleteEventInput & RegionInput,
  DeleteEventOutput,
  DeleteEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c5, 0) as any as S.Schema<DeleteEventInput>,
  output: __S(81, __c5, 1) as any as S.Schema<DeleteEventOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteEvent",
  telemetry: TELEMETRY,
  span: "DeleteEvent",
}));

export type DeleteMemoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a memory, including its content and embedding. Deletion can't be undone. Searches stop returning the memory shortly after you delete it.
 *
 * Deleting a memory that no longer exists returns `ResourceNotFoundException`, so the operation is not idempotent. If you retry deletes, treat that error as success.
 *
 * A memory past its expiry (set from the space's `memoryExpiryDays` when the memory is written) reads as not found: the operation returns `ResourceNotFoundException`, as for a memory that was already deleted.
 *
 * If the space uses a customer managed AWS KMS key, the call can also fail because of the key. It fails with `AccessDeniedException` if you aren't allowed to use the key, and with `ThrottlingException` if AWS KMS throttles the request. It fails with `ValidationException` if the key is disabled, pending deletion, or deleted.
 */
export const deleteMemory: API.OperationMethod<
  DeleteMemoryInput & RegionInput,
  DeleteMemoryOutput,
  DeleteMemoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<DeleteMemoryInput>,
  output: __S(97, __c6, 1) as any as S.Schema<DeleteMemoryOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteMemory",
  telemetry: TELEMETRY,
  span: "DeleteMemory",
}));

export type DeleteSpaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a space and its memories. Deletion can't be undone. After you delete the space, you can't retrieve its events, and the service removes them when they reach their expiry.
 *
 * The operation returns with `status` `DELETING`. When deletion finishes, `GetSpace` returns `ResourceNotFoundException`. If deletion fails, the status becomes `FAILED`. A space that is `CREATING` or `UPDATING` can't be deleted until that finishes: the request fails with `ConflictException`. Deleting a space that is already `DELETING` returns `DELETING` again.
 */
export const deleteSpace: API.OperationMethod<
  DeleteSpaceRequest & RegionInput,
  DeleteSpaceResponse,
  DeleteSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(112, __c7, 0) as any as S.Schema<DeleteSpaceRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<DeleteSpaceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSpace",
  telemetry: TELEMETRY,
  span: "DeleteSpace",
}));

export type GetEventError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets an event by ID, including its payload.
 *
 * If the space uses a customer managed AWS KMS key, the call can also fail because of the key. It fails with `AccessDeniedException` if you aren't allowed to use the key, and with `ThrottlingException` if AWS KMS throttles the request. It fails with `ValidationException` if the key is disabled, pending deletion, or deleted.
 */
export const getEvent: API.OperationMethod<
  GetEventInput & RegionInput,
  GetEventOutput,
  GetEventError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<GetEventInput>,
  output: __S(145, __c9, 1) as any as S.Schema<GetEventOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetEvent",
  telemetry: TELEMETRY,
  span: "GetEvent",
}));

export type GetMemoryError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Gets a memory by ID, as returned by `SearchMemories` or `ListMemories`. A memory that doesn't exist returns `ResourceNotFoundException`. Unlike `SearchMemories`, this operation also returns memories that consolidation has superseded.
 *
 * A memory past its expiry (set from the space's `memoryExpiryDays` when the memory is written) reads as not found: `ResourceNotFoundException`, the same answer as for an ID that does not exist.
 *
 * If the space uses a customer managed AWS KMS key, the call can also fail because of the key. It fails with `AccessDeniedException` if you aren't allowed to use the key, and with `ThrottlingException` if AWS KMS throttles the request. It fails with `ValidationException` if the key is disabled, pending deletion, or deleted.
 */
export const getMemory: API.OperationMethod<
  GetMemoryInput & RegionInput,
  GetMemoryOutput,
  GetMemoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<GetMemoryInput>,
  output: __S(193, __c12, 1) as any as S.Schema<GetMemoryOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetMemory",
  telemetry: TELEMETRY,
  span: "GetMemory",
}));

export type GetSpaceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a space's configuration and status.
 */
export const getSpace: API.OperationMethod<
  GetSpaceRequest & RegionInput,
  GetSpaceResponse,
  GetSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c13, 0) as any as S.Schema<GetSpaceRequest>,
  output: __S(209, __c13, 1) as any as S.Schema<GetSpaceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSpace",
  telemetry: TELEMETRY,
  span: "GetSpace",
}));

export type ListEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the events in a session, sorted by time. Optionally limit the results to events whose `eventTimestamp` falls between `eventTimestampAfter` and `eventTimestampBefore`. Returns event metadata only. Call `GetEvent` for the payload. For full-text or relevance search, use `SearchEvents`.
 *
 * If the space uses a customer managed AWS KMS key, the call can also fail because of the key. It fails with `AccessDeniedException` if you aren't allowed to use the key, and with `ThrottlingException` if AWS KMS throttles the request. It fails with `ValidationException` if the key is disabled, pending deletion, or deleted.
 */
export const listEvents: API.PaginatedOperationMethod<
  ListEventsInput & RegionInput,
  ListEventsOutput,
  ListEventsError,
  Credentials | HttpClient.HttpClient,
  EventSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<ListEventsInput>,
  output: __S(227, __c14, 3) as any as S.Schema<ListEventsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
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

export type ListMemoriesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists a space's memories without a query, for example the most recent memories or the memories of one strategy. Filter by strategy and optionally by owning actor or session, sort by creation or update time, and page through the results. Results have no relevance score. To query or filter by metadata, use `SearchMemories`.
 *
 * If memories are written or deleted while you page, the results can skip a memory or return it twice. You can page through only a limited number of results. A request past that limit fails with `ValidationException` (reason `invalidNextToken`), and the message gives the limit.
 *
 * Memories past their expiry (set from the space's `memoryExpiryDays` when each memory is written) are left out. Unlike `SearchMemories`, this operation also returns memories that consolidation has superseded.
 *
 * If the space uses a customer managed AWS KMS key, the call can also fail because of the key. It fails with `AccessDeniedException` if you aren't allowed to use the key, and with `ThrottlingException` if AWS KMS throttles the request. It fails with `ValidationException` if the key is disabled, pending deletion, or deleted.
 */
export const listMemories: API.PaginatedOperationMethod<
  ListMemoriesInput & RegionInput,
  ListMemoriesOutput,
  ListMemoriesError,
  Credentials | HttpClient.HttpClient,
  MemoryListSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<ListMemoriesInput>,
  output: __S(243, __c15, 3) as any as S.Schema<ListMemoriesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListMemories",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "memories",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListMemories",
})) as any;

export type ListSpacesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the spaces in your account in the current Region.
 */
export const listSpaces: API.PaginatedOperationMethod<
  ListSpacesRequest & RegionInput,
  ListSpacesResponse,
  ListSpacesError,
  Credentials | HttpClient.HttpClient,
  SpaceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<ListSpacesRequest>,
  output: __S(274, __c17, 2) as any as S.Schema<ListSpacesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSpaces",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "spaces",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListSpaces",
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags for the specified space.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(289, __c18, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
}));

export type SearchEventsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches a space's events by relevance. It works like `SearchMemories` without the memory type and strategy selector. The query is a subset of the OpenSearch Query DSL. The service validates it, limits the search to the actor in `actorId` and the sessions in `sessionIds`, and returns ranked results. Each result is the matching chunk of an event, not the whole event. You can page through only a limited number of results. A request past that limit fails with `ValidationException` (reason `invalidNextToken`), and the message gives the limit.
 *
 * If the results are larger than 5 MiB, the request fails with `ValidationException` (reason `queryBodyTooLarge`). Lower `maxResults`.
 *
 * If the request would exceed the service's rate for embedding requests, it fails with `ThrottlingException`. Retry with exponential backoff.
 *
 * If the space uses a customer managed AWS KMS key, the call can also fail because of the key. It fails with `AccessDeniedException` if you aren't allowed to use the key, and with `ThrottlingException` if AWS KMS throttles the request. It fails with `ValidationException` if the key is disabled, pending deletion, or deleted.
 */
export const searchEvents: API.PaginatedOperationMethod<
  SearchEventsInput & RegionInput,
  SearchEventsOutput,
  SearchEventsError,
  Credentials | HttpClient.HttpClient,
  EventSearchSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<SearchEventsInput>,
  output: __S(307, __c19, 3) as any as S.Schema<SearchEventsOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchEvents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "events",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "SearchEvents",
})) as any;

export type SearchMemoriesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Searches a space's memories by relevance. The query is a subset of the OpenSearch Query DSL. The service validates it, limits the search to the requested strategies and to the actor in `actorId`, and returns one ranked list of memories. You can page through only a limited number of results. A request past that limit fails with `ValidationException` (reason `invalidNextToken`), and the message gives the limit.
 *
 * Memories past their expiry (set from the space's `memoryExpiryDays` when each memory is written) are left out of the results. Only current memories are returned: a memory that consolidation has superseded (an older version of a fact that a newer memory replaced) is left out.
 *
 * If the results are larger than 5 MiB, the request fails with `ValidationException` (reason `queryBodyTooLarge`). Lower `maxResults`.
 *
 * If the request would exceed the service's rate for embedding requests, it fails with `ThrottlingException`. Retry with exponential backoff.
 *
 * If the space uses a customer managed AWS KMS key, the call can also fail because of the key. It fails with `AccessDeniedException` if you aren't allowed to use the key, and with `ThrottlingException` if AWS KMS throttles the request. It fails with `ValidationException` if the key is disabled, pending deletion, or deleted.
 */
export const searchMemories: API.PaginatedOperationMethod<
  SearchMemoriesInput & RegionInput,
  SearchMemoriesOutput,
  SearchMemoriesError,
  Credentials | HttpClient.HttpClient,
  MemorySearchSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<SearchMemoriesInput>,
  output: __S(323, __c20, 3) as any as S.Schema<SearchMemoriesOutput>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchMemories",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "memories",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "SearchMemories",
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds the specified tags to the specified space.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
  telemetry: TELEMETRY,
  span: "TagResource",
}));

export type UntagResourceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified tags from the specified space.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(352, __c22, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
}));

export type UpdateMemoryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a memory in place. Supply only the fields to change. Omitted fields keep their stored values. A request must supply `content` or `metadata`, or it fails with `ValidationException`. Supplying `content` re-embeds the memory. A change to metadata alone doesn't.
 *
 * The memory keeps its `memoryId` across updates. Shortly after an update, searches stop returning the previous content.
 *
 * `memoryType` can't be changed. To change it, delete the memory and create a new one.
 *
 * A memory past its expiry (set from the space's `memoryExpiryDays` when the memory is written) reads as not found: the operation fails with `ResourceNotFoundException` and changes nothing. An update does not move the expiry.
 *
 * Concurrent updates to one memory are last-writer-wins. There is no version check. To avoid lost updates, serialize your updates to a memory.
 *
 * If you supply `content` and the request would exceed the service's rate for embedding requests, it fails with `ThrottlingException`. Retry with exponential backoff.
 *
 * If the space uses a customer managed AWS KMS key, the call can also fail because of the key. It fails with `AccessDeniedException` if you aren't allowed to use the key, and with `ThrottlingException` if AWS KMS throttles the request. It fails with `ValidationException` if the key is disabled, pending deletion, or deleted.
 */
export const updateMemory: API.OperationMethod<
  UpdateMemoryInput & RegionInput,
  UpdateMemoryOutput,
  UpdateMemoryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<UpdateMemoryInput>,
  output: __S(193, __c12, 1) as any as S.Schema<UpdateMemoryOutput>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateMemory",
  telemetry: TELEMETRY,
  span: "UpdateMemory",
}));

export type UpdateSpaceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a space's memory strategies, retention settings, or extraction model. Supply only the fields to change. Omitted fields keep their current values.
 *
 * If the request changes the set of strategies, a strategy's configuration, a retention setting, or the extraction model, the space moves to `UPDATING`. When the change is complete, the space returns to `ACTIVE`, or moves to `FAILED` if the change can't be applied. While the space is `UPDATING`, `GetSpace` returns the previous configuration. A request that only changes strategy descriptions or repeats the values the space has stored is applied immediately and doesn't change the status. Sending a retention value that the space never set also moves the space to `UPDATING`, even one that matches the behavior without it, such as 90 for `eventExpiryDays` or 0 for `memoryExpiryDays`. A space that is `CREATING`, `UPDATING`, or `DELETING` can't be updated: the request fails with `ConflictException`.
 */
export const updateSpace: API.OperationMethod<
  UpdateSpaceRequest & RegionInput,
  UpdateSpaceResponse,
  UpdateSpaceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<UpdateSpaceRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<UpdateSpaceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSpace",
  telemetry: TELEMETRY,
  span: "UpdateSpace",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          memoryStrategies: S.optional(__S(34, __c2, 2)),
          eventExpiryDays: S.optional(S.Number),
          memoryExpiryDays: S.optional(S.Number),
          extractionModelId: S.optional(S.String),
          encryptionConfiguration: S.optional(__S(16, __c1, 0)),
          tags: S.optional(__S(65, __c4, 1)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateSpaceRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ kmsKeyArn: S.optional(S.String) })).annotate({
        identifier: "EncryptionConfiguration",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          extractionPrompt: S.optional(SensitiveString),
          extractEveryNMessages: S.optional(S.Number),
          extractEveryNTokens: S.optional(S.Number),
          idleTimeoutSeconds: S.optional(S.Number),
          extractionSeedTopK: S.optional(S.Number),
          extractionSeedRecentN: S.optional(S.Number),
          consolidationEnabled: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "MemoryStrategyConfiguration" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          type: S.String,
          name: S.optional(S.String),
          description: S.optional(S.String),
          configuration: S.optional(__S(32, __c2, 0)),
        }),
      ).annotate({ identifier: "MemoryStrategy" });
    case 2:
      return S.Array(__S(33, __c2, 1));
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          arn: S.String,
          name: S.String,
          status: S.String,
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "CreateSpaceResponse" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ key: S.String, value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(64, __c4, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.ContextParam("SpaceId")),
          eventId: S.String,
          actorId: S.optional(S.String),
          sessionId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteEventInput" });
    case 1:
      return S.suspend(() => S.Struct({ eventId: S.String })).annotate({
        identifier: "DeleteEventOutput",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.ContextParam("SpaceId")),
          memoryId: S.String,
          actorId: S.optional(S.String),
          strategyName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "DeleteMemoryInput" });
    case 1:
      return S.suspend(() => S.Struct({ memoryId: S.String })).annotate({
        identifier: "DeleteMemoryOutput",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ spaceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteSpaceRequest" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ spaceId: S.String, status: S.String })).annotate({
        identifier: "DeleteSpaceResponse",
      });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.ContextParam("SpaceId")),
          eventId: S.String,
          actorId: S.optional(S.String),
          sessionId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetEventInput" });
    case 1:
      return S.suspend(() => S.Struct({ event: __S(448, __c28, 0) })).annotate({
        identifier: "GetEventOutput",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.ContextParam("SpaceId")),
          memoryId: S.String,
          actorId: S.optional(S.String),
          strategyName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "GetMemoryInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          actorId: S.optional(S.String),
          sessionId: S.optional(S.String),
          createdAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          updatedAt: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
        }),
      ).annotate({ identifier: "SystemMetadata" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String,
          memoryType: S.String,
          strategyName: S.optional(S.String),
          content: SensitiveString,
          systemMetadata: __S(176, __c11, 0),
          metadata: S.optional(__S(496, __c31, 0)),
        }),
      ).annotate({ identifier: "Memory" });
    case 1:
      return S.suspend(() => S.Struct({ memory: __S(192, __c12, 0) })).annotate({
        identifier: "GetMemoryOutput",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ spaceId: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetSpaceRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          arn: S.String,
          name: S.String,
          status: S.String,
          statusReason: S.optional(S.String),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          memoryStrategies: S.optional(__S(34, __c2, 2)),
          eventExpiryDays: S.optional(S.Number),
          memoryExpiryDays: S.optional(S.Number),
          extractionModelId: S.optional(S.String),
          encryptionConfiguration: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "GetSpaceResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.ContextParam("SpaceId")),
          actorId: S.String,
          sessionId: S.String,
          eventTimestampBefore: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          eventTimestampAfter: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          sortOrder: S.optional(S.String),
          metadataFilters: S.optional(__S(496, __c31, 0)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListEventsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          metadata: S.optional(__S(496, __c31, 0)),
          eventTimestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "EventSummary" });
    case 2:
      return S.Array(__S(225, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ events: __S(226, __c14, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEventsOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.ContextParam("SpaceId")),
          memoryStrategies: S.optional(__S(257, __c16, 1)),
          actorIds: S.optional(__S(464, __c29, 0)),
          sessionIds: S.optional(__S(464, __c29, 0)),
          sortBy: S.optional(S.String),
          sortOrder: S.optional(S.String),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListMemoriesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String,
          memoryType: S.String,
          strategyName: S.optional(S.String),
          systemMetadata: __S(176, __c11, 0),
          metadata: S.optional(__S(496, __c31, 0)),
        }),
      ).annotate({ identifier: "MemoryListSummary" });
    case 2:
      return S.Array(__S(241, __c15, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ memories: __S(242, __c15, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMemoriesOutput" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ memoryType: S.String, memoryStrategyNames: S.optional(__S(464, __c29, 0)) }),
      ).annotate({ identifier: "StrategySelector" });
    case 1:
      return S.Array(__S(256, __c16, 0));
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ maxResults: S.optional(S.Number), nextToken: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListSpacesRequest" });
    case 1:
      return S.Array(__S(48, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ spaces: __S(273, __c17, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListSpacesResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(65, __c4, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.ContextParam("SpaceId")),
          actorId: S.String,
          sessionIds: S.optional(__S(464, __c29, 0)),
          query: S.Any,
          sort: S.optional(S.Any),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SearchEventsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          score: S.optional(S.Number),
          systemMetadata: S.optional(__S(176, __c11, 0)),
          metadata: S.optional(__S(496, __c31, 0)),
          matchedContent: S.optional(SensitiveString),
        }),
      ).annotate({ identifier: "EventSearchSummary" });
    case 2:
      return S.Array(__S(305, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ events: __S(306, __c19, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchEventsOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.ContextParam("SpaceId")),
          memoryStrategies: S.optional(__S(257, __c16, 1)),
          actorId: S.String,
          query: S.Any,
          sort: S.optional(S.Any),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SearchMemoriesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String,
          memoryType: S.optional(S.String),
          strategyName: S.optional(S.String),
          content: S.optional(SensitiveString),
          score: S.optional(S.Number),
          systemMetadata: S.optional(__S(176, __c11, 0)),
          metadata: S.optional(__S(496, __c31, 0)),
          sourceEventIds: S.optional(__S(464, __c29, 0)),
        }),
      ).annotate({ identifier: "MemorySearchSummary" });
    case 2:
      return S.Array(__S(321, __c20, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ memories: __S(322, __c20, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchMemoriesOutput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tags: __S(65, __c4, 1) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "TagResourceResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String, tagKeys: __S(464, __c29, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UntagResourceRequest" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.ContextParam("SpaceId")),
          memoryId: S.String,
          content: S.optional(SensitiveString),
          metadata: S.optional(__S(496, __c31, 0)),
          metadataMode: S.optional(S.String),
          actorId: S.optional(S.String),
          strategyName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateMemoryInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String,
          memoryStrategies: S.optional(__S(34, __c2, 2)),
          eventExpiryDays: S.optional(S.Number),
          memoryExpiryDays: S.optional(S.Number),
          extractionModelId: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "UpdateSpaceRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, message: S.String })).annotate({
        identifier: "ValidationExceptionField",
      });
    case 1:
      return S.Array(__S(416, __c26, 0));
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.ContextParam("SpaceId")),
          actorId: S.optional(S.String),
          sessionId: S.optional(S.String),
          eventIds: __S(464, __c29, 0),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "BatchGetEventInput" });
    case 1:
      return S.Array(__S(448, __c28, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ eventId: S.String, errorCode: S.String, message: S.String }),
      ).annotate({ identifier: "BatchGetEventError" });
    case 3:
      return S.Array(__S(434, __c27, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ events: __S(433, __c27, 1), errors: __S(435, __c27, 3) }),
      ).annotate({ identifier: "BatchGetEventOutput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          spaceId: S.String,
          actorId: S.String,
          sessionId: S.String,
          payload: __S(492, __c30, 12),
          metadata: S.optional(__S(496, __c31, 0)),
          eventTimestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "Event" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ text: SensitiveString })).annotate({
        identifier: "MessageContent",
      });
    case 1:
      return S.suspend(() => S.Struct({ role: S.String, content: __S(480, __c30, 0) })).annotate({
        identifier: "Message",
      });
    case 2:
      return S.Array(__S(481, __c30, 1));
    case 3:
      return S.suspend(() => S.Struct({ messages: __S(482, __c30, 2) })).annotate({
        identifier: "UnifiedConversationalObject",
      });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ object: __S(483, __c30, 3) })]);
    case 5:
      return S.suspend(() => S.Struct({ source: __S(484, __c30, 4) })).annotate({
        identifier: "UnifiedConversational",
      });
    case 6:
      return S.Union([/*@__PURE__*/ S.Struct({ unified: __S(485, __c30, 5) })]);
    case 7:
      return S.Union([/*@__PURE__*/ S.Struct({ json: S.Any })]);
    case 8:
      return S.suspend(() => S.Struct({ source: __S(487, __c30, 7) })).annotate({
        identifier: "StructuredDataPayload",
      });
    case 9:
      return S.suspend(() => S.Struct({ uri: S.String })).annotate({ identifier: "S3Location" });
    case 10:
      return S.Union([/*@__PURE__*/ S.Struct({ s3Location: __S(489, __c30, 9) })]);
    case 11:
      return S.suspend(() =>
        S.Struct({ contentType: S.String, source: __S(490, __c30, 10) }),
      ).annotate({ identifier: "BlobPayload" });
    case 12:
      return S.Union([
        /*@__PURE__*/ S.Struct({ conversational: __S(486, __c30, 6) }),
        /*@__PURE__*/ S.Struct({ structuredData: __S(488, __c30, 8) }),
        /*@__PURE__*/ S.Struct({ blob: __S(491, __c30, 11) }),
      ]);
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.ContextParam("SpaceId")),
          actorId: S.String,
          sessionId: S.optional(S.String),
          eventTimestamp: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          payload: __S(492, __c30, 12),
          metadata: S.optional(__S(496, __c31, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          infer: S.optional(S.Boolean),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateEventInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          eventId: S.String,
          spaceId: S.String,
          actorId: S.String,
          sessionId: S.String,
          eventTimestamp: T.DateFromString.pipe(T.TimestampFormat("date-time")),
        }),
      ).annotate({ identifier: "EventDetail" });
    case 2:
      return S.suspend(() => S.Struct({ event: __S(513, __c32, 1) })).annotate({
        identifier: "CreateEventOutput",
      });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          spaceId: S.String.pipe(T.ContextParam("SpaceId")),
          name: S.String,
          content: SensitiveString,
          actorId: S.String,
          sessionId: S.optional(S.String),
          metadata: S.optional(__S(496, __c31, 0)),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateMemoryInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          memoryId: S.String,
          spaceId: S.String,
          name: S.String,
          actorId: S.String,
          sessionId: S.String,
        }),
      ).annotate({ identifier: "CreateMemoryDetail" });
    case 2:
      return S.suspend(() => S.Struct({ memory: __S(529, __c33, 1) })).annotate({
        identifier: "CreateMemoryOutput",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
