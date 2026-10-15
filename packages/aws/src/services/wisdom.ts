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
import { SensitiveString } from "../sensitive.ts";
import * as T from "../traits.ts";
// Schema table, filled on first reach (see __S at the end).
const __s: any[] = [];
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Wisdom", serviceShapeName: "WisdomService" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "wisdom" });
const ver = /*@__PURE__*/ T.ServiceVersion("2020-10-19");
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
              `https://wisdom-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://wisdom-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://wisdom.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://wisdom.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://wisdom.{R}.{D}","properties":{},"headers":{}}');

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
export class PreconditionFailedException
  extends /*@__PURE__*/ S.TaggedError<PreconditionFailedException>()(
    "PreconditionFailedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(412),
  ) {}
export class RequestTimeoutException
  extends /*@__PURE__*/ S.TaggedError<RequestTimeoutException>()(
    "RequestTimeoutException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(408), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withTimeoutError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class TooManyTagsException
  extends /*@__PURE__*/ S.TaggedError<TooManyTagsException>()(
    "TooManyTagsException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      resourceName: /*@__PURE__*/ S.optional(S.String),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type ClientToken = string;
export type Name = string;
export type AssistantType = string;
export type Description = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export type NonEmptyString = string;
export interface ServerSideEncryptionConfiguration {
  kmsKeyId?: string;
}
export interface CreateAssistantRequest {
  clientToken?: string;
  name: string;
  type: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
}
export type Uuid = string;
export type Arn = string;
export type AssistantStatus = string;
export type GenericArn = string;
export interface AssistantIntegrationConfiguration {
  topicIntegrationArn?: string;
}
export interface AssistantData {
  assistantId: string;
  assistantArn: string;
  name: string;
  type: string;
  status: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  integrationConfiguration?: AssistantIntegrationConfiguration;
}
export interface CreateAssistantResponse {
  assistant?: AssistantData;
}
export type UuidOrArn = string;
export type AssociationType = string;
export type AssistantAssociationInputData = { knowledgeBaseId: string };
export interface CreateAssistantAssociationRequest {
  assistantId: string;
  associationType: string;
  association: AssistantAssociationInputData;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export interface KnowledgeBaseAssociationData {
  knowledgeBaseId?: string;
  knowledgeBaseArn?: string;
}
export type AssistantAssociationOutputData = {
  knowledgeBaseAssociation: KnowledgeBaseAssociationData;
};
export interface AssistantAssociationData {
  assistantAssociationId: string;
  assistantAssociationArn: string;
  assistantId: string;
  assistantArn: string;
  associationType: string;
  associationData: AssistantAssociationOutputData;
  tags?: { [key: string]: string | undefined };
}
export interface CreateAssistantAssociationResponse {
  assistantAssociation?: AssistantAssociationData;
}
export type ContentTitle = string;
export type Uri = string;
export type ContentMetadata = { [key: string]: string | undefined };
export type UploadId = string;
export interface CreateContentRequest {
  knowledgeBaseId: string;
  name: string;
  title?: string;
  overrideLinkOutUri?: string;
  metadata?: { [key: string]: string | undefined };
  uploadId: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type ContentType = string;
export type ContentStatus = string;
export type Url = string | redacted.Redacted<string>;
export interface ContentData {
  contentArn: string;
  contentId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  revisionId: string;
  title: string;
  contentType: string;
  status: string;
  metadata: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
  linkOutUri?: string;
  url: string | redacted.Redacted<string>;
  urlExpiry: Date;
}
export interface CreateContentResponse {
  content?: ContentData;
}
export type KnowledgeBaseType = string;
export type ObjectFieldsList = string[];
export interface AppIntegrationsConfiguration {
  appIntegrationArn: string;
  objectFields?: string[];
}
export type SourceConfiguration = { appIntegrations: AppIntegrationsConfiguration };
export interface RenderingConfiguration {
  templateUri?: string;
}
export interface CreateKnowledgeBaseRequest {
  clientToken?: string;
  name: string;
  knowledgeBaseType: string;
  sourceConfiguration?: SourceConfiguration;
  renderingConfiguration?: RenderingConfiguration;
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export type KnowledgeBaseStatus = string;
export interface KnowledgeBaseData {
  knowledgeBaseId: string;
  knowledgeBaseArn: string;
  name: string;
  knowledgeBaseType: string;
  status: string;
  lastContentModificationTime?: Date;
  sourceConfiguration?: SourceConfiguration;
  renderingConfiguration?: RenderingConfiguration;
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateKnowledgeBaseResponse {
  knowledgeBase?: KnowledgeBaseData;
}
export type QuickResponseName = string;
export type QuickResponseContent = string | redacted.Redacted<string>;
export type QuickResponseDataProvider = { content: string | redacted.Redacted<string> };
export type QuickResponseType = string;
export type GroupingCriteria = string | redacted.Redacted<string>;
export type GroupingValue = string | redacted.Redacted<string>;
export type GroupingValues = (string | redacted.Redacted<string>)[];
export interface GroupingConfiguration {
  criteria?: string | redacted.Redacted<string>;
  values?: (string | redacted.Redacted<string>)[];
}
export type QuickResponseDescription = string;
export type ShortCutKey = string;
export type Channel = string | redacted.Redacted<string>;
export type Channels = (string | redacted.Redacted<string>)[];
export type LanguageCode = string;
export interface CreateQuickResponseRequest {
  knowledgeBaseId: string;
  name: string;
  content: QuickResponseDataProvider;
  contentType?: string;
  groupingConfiguration?: GroupingConfiguration;
  description?: string;
  shortcutKey?: string;
  isActive?: boolean;
  channels?: (string | redacted.Redacted<string>)[];
  language?: string;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type QuickResponseStatus = string;
export type QuickResponseContentProvider = { content: string | redacted.Redacted<string> };
export interface QuickResponseContents {
  plainText?: QuickResponseContentProvider;
  markdown?: QuickResponseContentProvider;
}
export interface QuickResponseData {
  quickResponseArn: string;
  quickResponseId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  contentType: string;
  status: string;
  createdTime: Date;
  lastModifiedTime: Date;
  contents?: QuickResponseContents;
  description?: string;
  groupingConfiguration?: GroupingConfiguration;
  shortcutKey?: string;
  lastModifiedBy?: string;
  isActive?: boolean;
  channels?: (string | redacted.Redacted<string>)[];
  language?: string;
  tags?: { [key: string]: string | undefined };
}
export interface CreateQuickResponseResponse {
  quickResponse?: QuickResponseData;
}
export interface CreateSessionRequest {
  clientToken?: string;
  assistantId: string;
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export interface SessionIntegrationConfiguration {
  topicIntegrationArn?: string;
}
export interface SessionData {
  sessionArn: string;
  sessionId: string;
  name: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  integrationConfiguration?: SessionIntegrationConfiguration;
}
export interface CreateSessionResponse {
  session?: SessionData;
}
export interface DeleteAssistantRequest {
  assistantId: string;
}
export interface DeleteAssistantResponse {}
export interface DeleteAssistantAssociationRequest {
  assistantAssociationId: string;
  assistantId: string;
}
export interface DeleteAssistantAssociationResponse {}
export interface DeleteContentRequest {
  knowledgeBaseId: string;
  contentId: string;
}
export interface DeleteContentResponse {}
export interface DeleteImportJobRequest {
  knowledgeBaseId: string;
  importJobId: string;
}
export interface DeleteImportJobResponse {}
export interface DeleteKnowledgeBaseRequest {
  knowledgeBaseId: string;
}
export interface DeleteKnowledgeBaseResponse {}
export interface DeleteQuickResponseRequest {
  knowledgeBaseId: string;
  quickResponseId: string;
}
export interface DeleteQuickResponseResponse {}
export interface GetAssistantRequest {
  assistantId: string;
}
export interface GetAssistantResponse {
  assistant?: AssistantData;
}
export interface GetAssistantAssociationRequest {
  assistantAssociationId: string;
  assistantId: string;
}
export interface GetAssistantAssociationResponse {
  assistantAssociation?: AssistantAssociationData;
}
export interface GetContentRequest {
  contentId: string;
  knowledgeBaseId: string;
}
export interface GetContentResponse {
  content?: ContentData;
}
export interface GetContentSummaryRequest {
  contentId: string;
  knowledgeBaseId: string;
}
export interface ContentSummary {
  contentArn: string;
  contentId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  revisionId: string;
  title: string;
  contentType: string;
  status: string;
  metadata: { [key: string]: string | undefined };
  tags?: { [key: string]: string | undefined };
}
export interface GetContentSummaryResponse {
  contentSummary?: ContentSummary;
}
export interface GetImportJobRequest {
  importJobId: string;
  knowledgeBaseId: string;
}
export type ImportJobType = string;
export type ImportJobStatus = string;
export type ExternalSource = string;
export interface ConnectConfiguration {
  instanceId?: string;
}
export type Configuration = { connectConfiguration: ConnectConfiguration };
export interface ExternalSourceConfiguration {
  source: string;
  configuration: Configuration;
}
export interface ImportJobData {
  importJobId: string;
  knowledgeBaseId: string;
  uploadId: string;
  knowledgeBaseArn: string;
  importJobType: string;
  status: string;
  url: string | redacted.Redacted<string>;
  failedRecordReport?: string | redacted.Redacted<string>;
  urlExpiry: Date;
  createdTime: Date;
  lastModifiedTime: Date;
  metadata?: { [key: string]: string | undefined };
  externalSourceConfiguration?: ExternalSourceConfiguration;
}
export interface GetImportJobResponse {
  importJob?: ImportJobData;
}
export interface GetKnowledgeBaseRequest {
  knowledgeBaseId: string;
}
export interface GetKnowledgeBaseResponse {
  knowledgeBase?: KnowledgeBaseData;
}
export interface GetQuickResponseRequest {
  quickResponseId: string;
  knowledgeBaseId: string;
}
export interface GetQuickResponseResponse {
  quickResponse?: QuickResponseData;
}
export type MaxResults = number;
export type WaitTimeSeconds = number;
export interface GetRecommendationsRequest {
  assistantId: string;
  sessionId: string;
  maxResults?: number;
  waitTimeSeconds?: number;
}
export interface ContentReference {
  knowledgeBaseArn?: string;
  knowledgeBaseId?: string;
  contentArn?: string;
  contentId?: string;
}
export type SensitiveString = string | redacted.Redacted<string>;
export type HighlightOffset = number;
export interface Highlight {
  beginOffsetInclusive?: number;
  endOffsetExclusive?: number;
}
export type Highlights = Highlight[];
export interface DocumentText {
  text?: string | redacted.Redacted<string>;
  highlights?: Highlight[];
}
export interface Document {
  contentReference: ContentReference;
  title?: DocumentText;
  excerpt?: DocumentText;
}
export type RelevanceScore = number;
export type RelevanceLevel = string;
export type RecommendationType = string;
export interface RecommendationData {
  recommendationId: string;
  document: Document;
  relevanceScore?: number;
  relevanceLevel?: string;
  type?: string;
}
export type RecommendationList = RecommendationData[];
export type RecommendationTriggerType = string;
export type RecommendationSourceType = string;
export type QueryText = string | redacted.Redacted<string>;
export interface QueryRecommendationTriggerData {
  text?: string | redacted.Redacted<string>;
}
export type RecommendationTriggerData = { query: QueryRecommendationTriggerData };
export type RecommendationIdList = string[];
export interface RecommendationTrigger {
  id: string;
  type: string;
  source: string;
  data: RecommendationTriggerData;
  recommendationIds: string[];
}
export type RecommendationTriggerList = RecommendationTrigger[];
export interface GetRecommendationsResponse {
  recommendations: RecommendationData[];
  triggers?: RecommendationTrigger[];
}
export interface GetSessionRequest {
  assistantId: string;
  sessionId: string;
}
export interface GetSessionResponse {
  session?: SessionData;
}
export type NextToken = string;
export interface ListAssistantAssociationsRequest {
  nextToken?: string;
  maxResults?: number;
  assistantId: string;
}
export interface AssistantAssociationSummary {
  assistantAssociationId: string;
  assistantAssociationArn: string;
  assistantId: string;
  assistantArn: string;
  associationType: string;
  associationData: AssistantAssociationOutputData;
  tags?: { [key: string]: string | undefined };
}
export type AssistantAssociationSummaryList = AssistantAssociationSummary[];
export interface ListAssistantAssociationsResponse {
  assistantAssociationSummaries: AssistantAssociationSummary[];
  nextToken?: string;
}
export interface ListAssistantsRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface AssistantSummary {
  assistantId: string;
  assistantArn: string;
  name: string;
  type: string;
  status: string;
  description?: string;
  tags?: { [key: string]: string | undefined };
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  integrationConfiguration?: AssistantIntegrationConfiguration;
}
export type AssistantList = AssistantSummary[];
export interface ListAssistantsResponse {
  assistantSummaries: AssistantSummary[];
  nextToken?: string;
}
export interface ListContentsRequest {
  nextToken?: string;
  maxResults?: number;
  knowledgeBaseId: string;
}
export type ContentSummaryList = ContentSummary[];
export interface ListContentsResponse {
  contentSummaries: ContentSummary[];
  nextToken?: string;
}
export interface ListImportJobsRequest {
  nextToken?: string;
  maxResults?: number;
  knowledgeBaseId: string;
}
export interface ImportJobSummary {
  importJobId: string;
  knowledgeBaseId: string;
  uploadId: string;
  knowledgeBaseArn: string;
  importJobType: string;
  status: string;
  createdTime: Date;
  lastModifiedTime: Date;
  metadata?: { [key: string]: string | undefined };
  externalSourceConfiguration?: ExternalSourceConfiguration;
}
export type ImportJobList = ImportJobSummary[];
export interface ListImportJobsResponse {
  importJobSummaries: ImportJobSummary[];
  nextToken?: string;
}
export interface ListKnowledgeBasesRequest {
  nextToken?: string;
  maxResults?: number;
}
export interface KnowledgeBaseSummary {
  knowledgeBaseId: string;
  knowledgeBaseArn: string;
  name: string;
  knowledgeBaseType: string;
  status: string;
  sourceConfiguration?: SourceConfiguration;
  renderingConfiguration?: RenderingConfiguration;
  serverSideEncryptionConfiguration?: ServerSideEncryptionConfiguration;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export type KnowledgeBaseList = KnowledgeBaseSummary[];
export interface ListKnowledgeBasesResponse {
  knowledgeBaseSummaries: KnowledgeBaseSummary[];
  nextToken?: string;
}
export interface ListQuickResponsesRequest {
  nextToken?: string;
  maxResults?: number;
  knowledgeBaseId: string;
}
export interface QuickResponseSummary {
  quickResponseArn: string;
  quickResponseId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  contentType: string;
  status: string;
  createdTime: Date;
  lastModifiedTime: Date;
  description?: string;
  lastModifiedBy?: string;
  isActive?: boolean;
  channels?: (string | redacted.Redacted<string>)[];
  tags?: { [key: string]: string | undefined };
}
export type QuickResponseSummaryList = QuickResponseSummary[];
export interface ListQuickResponsesResponse {
  quickResponseSummaries: QuickResponseSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export interface NotifyRecommendationsReceivedRequest {
  assistantId: string;
  sessionId: string;
  recommendationIds: string[];
}
export type NotifyRecommendationsReceivedErrorMessage = string;
export interface NotifyRecommendationsReceivedError_ {
  recommendationId?: string;
  message?: string;
}
export type NotifyRecommendationsReceivedErrorList = NotifyRecommendationsReceivedError_[];
export interface NotifyRecommendationsReceivedResponse {
  recommendationIds?: string[];
  errors?: NotifyRecommendationsReceivedError_[];
}
export interface QueryAssistantRequest {
  assistantId: string;
  queryText: string | redacted.Redacted<string>;
  nextToken?: string;
  maxResults?: number;
}
export interface ResultData {
  resultId: string;
  document: Document;
  relevanceScore?: number;
}
export type QueryResultsList = ResultData[];
export interface QueryAssistantResponse {
  results: ResultData[];
  nextToken?: string;
}
export interface RemoveKnowledgeBaseTemplateUriRequest {
  knowledgeBaseId: string;
}
export interface RemoveKnowledgeBaseTemplateUriResponse {}
export type FilterField = string;
export type FilterOperator = string;
export interface Filter {
  field: string;
  operator: string;
  value: string;
}
export type FilterList = Filter[];
export interface SearchExpression {
  filters: Filter[];
}
export interface SearchContentRequest {
  nextToken?: string;
  maxResults?: number;
  knowledgeBaseId: string;
  searchExpression: SearchExpression;
}
export interface SearchContentResponse {
  contentSummaries: ContentSummary[];
  nextToken?: string;
}
export type QuickResponseQueryValue = string;
export type QuickResponseQueryValueList = string[];
export type QuickResponseQueryOperator = string;
export type Priority = string;
export interface QuickResponseQueryField {
  name: string;
  values: string[];
  operator: string;
  allowFuzziness?: boolean;
  priority?: string;
}
export type QuickResponseQueryFieldList = QuickResponseQueryField[];
export type QuickResponseFilterValue = string;
export type QuickResponseFilterValueList = string[];
export type QuickResponseFilterOperator = string;
export interface QuickResponseFilterField {
  name: string;
  values?: string[];
  operator: string;
  includeNoExistence?: boolean;
}
export type QuickResponseFilterFieldList = QuickResponseFilterField[];
export type Order = string;
export interface QuickResponseOrderField {
  name: string;
  order?: string;
}
export interface QuickResponseSearchExpression {
  queries?: QuickResponseQueryField[];
  filters?: QuickResponseFilterField[];
  orderOnField?: QuickResponseOrderField;
}
export type ContactAttributeKey = string;
export type ContactAttributeValue = string;
export type ContactAttributes = { [key: string]: string | undefined };
export interface SearchQuickResponsesRequest {
  knowledgeBaseId: string;
  searchExpression: QuickResponseSearchExpression;
  nextToken?: string;
  maxResults?: number;
  attributes?: { [key: string]: string | undefined };
}
export type ContactAttributeKeys = string[];
export interface QuickResponseSearchResultData {
  quickResponseArn: string;
  quickResponseId: string;
  knowledgeBaseArn: string;
  knowledgeBaseId: string;
  name: string;
  contentType: string;
  status: string;
  contents: QuickResponseContents;
  createdTime: Date;
  lastModifiedTime: Date;
  isActive: boolean;
  description?: string;
  groupingConfiguration?: GroupingConfiguration;
  shortcutKey?: string;
  lastModifiedBy?: string;
  channels?: (string | redacted.Redacted<string>)[];
  language?: string;
  attributesNotInterpolated?: string[];
  attributesInterpolated?: string[];
  tags?: { [key: string]: string | undefined };
}
export type QuickResponseSearchResultsList = QuickResponseSearchResultData[];
export interface SearchQuickResponsesResponse {
  results: QuickResponseSearchResultData[];
  nextToken?: string;
}
export interface SearchSessionsRequest {
  nextToken?: string;
  maxResults?: number;
  assistantId: string;
  searchExpression: SearchExpression;
}
export interface SessionSummary {
  sessionId: string;
  sessionArn: string;
  assistantId: string;
  assistantArn: string;
}
export type SessionSummaries = SessionSummary[];
export interface SearchSessionsResponse {
  sessionSummaries: SessionSummary[];
  nextToken?: string;
}
export type TimeToLive = number;
export interface StartContentUploadRequest {
  knowledgeBaseId: string;
  contentType: string;
  presignedUrlTimeToLive?: number;
}
export type Headers = { [key: string]: string | undefined };
export interface StartContentUploadResponse {
  uploadId: string;
  url: string | redacted.Redacted<string>;
  urlExpiry: Date;
  headersToInclude: { [key: string]: string | undefined };
}
export interface StartImportJobRequest {
  knowledgeBaseId: string;
  importJobType: string;
  uploadId: string;
  clientToken?: string;
  metadata?: { [key: string]: string | undefined };
  externalSourceConfiguration?: ExternalSourceConfiguration;
}
export interface StartImportJobResponse {
  importJob?: ImportJobData;
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
export interface UpdateContentRequest {
  knowledgeBaseId: string;
  contentId: string;
  revisionId?: string;
  title?: string;
  overrideLinkOutUri?: string;
  removeOverrideLinkOutUri?: boolean;
  metadata?: { [key: string]: string | undefined };
  uploadId?: string;
}
export interface UpdateContentResponse {
  content?: ContentData;
}
export interface UpdateKnowledgeBaseTemplateUriRequest {
  knowledgeBaseId: string;
  templateUri: string;
}
export interface UpdateKnowledgeBaseTemplateUriResponse {
  knowledgeBase?: KnowledgeBaseData;
}
export interface UpdateQuickResponseRequest {
  knowledgeBaseId: string;
  quickResponseId: string;
  name?: string;
  content?: QuickResponseDataProvider;
  contentType?: string;
  groupingConfiguration?: GroupingConfiguration;
  removeGroupingConfiguration?: boolean;
  description?: string;
  removeDescription?: boolean;
  shortcutKey?: string;
  removeShortcutKey?: boolean;
  isActive?: boolean;
  channels?: (string | redacted.Redacted<string>)[];
  language?: string;
}
export interface UpdateQuickResponseResponse {
  quickResponse?: QuickResponseData;
}
export type CreateAssistantError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an Amazon Connect Wisdom assistant.
 */
export const createAssistant: API.OperationMethod<
  CreateAssistantRequest,
  CreateAssistantResponse,
  CreateAssistantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(864, __c54, 0) as any as S.Schema<CreateAssistantRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<CreateAssistantResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssistant",
}));

export type CreateAssistantAssociationError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates an association between an Amazon Connect Wisdom assistant and another resource. Currently, the
 * only supported association is with a knowledge base. An assistant can have only a single
 * association.
 */
export const createAssistantAssociation: API.OperationMethod<
  CreateAssistantAssociationRequest,
  CreateAssistantAssociationResponse,
  CreateAssistantAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(961, __c60, 1) as any as S.Schema<CreateAssistantAssociationRequest>,
  output: __S(976, __c61, 0) as any as S.Schema<CreateAssistantAssociationResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssistantAssociation",
}));

export type CreateContentError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates Wisdom content. Before to calling this API, use StartContentUpload to
 * upload an asset.
 */
export const createContent: API.OperationMethod<
  CreateContentRequest,
  CreateContentResponse,
  CreateContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<CreateContentRequest>,
  output: __S(17, __c1, 1) as any as S.Schema<CreateContentResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateContent",
}));

export type CreateKnowledgeBaseError =
  | AccessDeniedException
  | ConflictException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a knowledge base.
 *
 * When using this API, you cannot reuse Amazon AppIntegrations
 * DataIntegrations with external knowledge bases such as Salesforce and ServiceNow. If you do,
 * you'll get an `InvalidRequestException` error.
 *
 * For example, you're programmatically managing your external knowledge base, and you want
 * to add or remove one of the fields that is being ingested from Salesforce. Do the
 * following:
 *
 * - Call DeleteKnowledgeBase.
 *
 * - Call DeleteDataIntegration.
 *
 * - Call CreateDataIntegration to recreate the DataIntegration or a create different
 * one.
 *
 * - Call CreateKnowledgeBase.
 */
export const createKnowledgeBase: API.OperationMethod<
  CreateKnowledgeBaseRequest,
  CreateKnowledgeBaseResponse,
  CreateKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c2, 0) as any as S.Schema<CreateKnowledgeBaseRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<CreateKnowledgeBaseResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKnowledgeBase",
}));

export type CreateQuickResponseError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Wisdom quick response.
 */
export const createQuickResponse: API.OperationMethod<
  CreateQuickResponseRequest,
  CreateQuickResponseResponse,
  CreateQuickResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<CreateQuickResponseRequest>,
  output: __S(145, __c9, 1) as any as S.Schema<CreateQuickResponseResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQuickResponse",
}));

export type CreateSessionError =
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates a session. A session is a contextual container used for generating
 * recommendations. Amazon Connect creates a new Wisdom session for each contact on which
 * Wisdom is enabled.
 */
export const createSession: API.OperationMethod<
  CreateSessionRequest,
  CreateSessionResponse,
  CreateSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c10, 0) as any as S.Schema<CreateSessionRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<CreateSessionResponse>,
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSession",
}));

export type DeleteAssistantError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an assistant.
 */
export const deleteAssistant: API.OperationMethod<
  DeleteAssistantRequest,
  DeleteAssistantResponse,
  DeleteAssistantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<DeleteAssistantRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<DeleteAssistantResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssistant",
}));

export type DeleteAssistantAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes an assistant association.
 */
export const deleteAssistantAssociation: API.OperationMethod<
  DeleteAssistantAssociationRequest,
  DeleteAssistantAssociationResponse,
  DeleteAssistantAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DeleteAssistantAssociationRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<DeleteAssistantAssociationResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssistantAssociation",
}));

export type DeleteContentError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the content.
 */
export const deleteContent: API.OperationMethod<
  DeleteContentRequest,
  DeleteContentResponse,
  DeleteContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<DeleteContentRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<DeleteContentResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContent",
}));

export type DeleteImportJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the quick response import job.
 */
export const deleteImportJob: API.OperationMethod<
  DeleteImportJobRequest,
  DeleteImportJobResponse,
  DeleteImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<DeleteImportJobRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<DeleteImportJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImportJob",
}));

export type DeleteKnowledgeBaseError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the knowledge base.
 *
 * When you use this API to delete an external knowledge base such as Salesforce or
 * ServiceNow, you must also delete the Amazon AppIntegrations
 * DataIntegration. This is because you can't reuse the DataIntegration after it's been
 * associated with an external knowledge base. However, you can delete and recreate it. See
 * DeleteDataIntegration and CreateDataIntegration in the Amazon AppIntegrations API
 * Reference.
 */
export const deleteKnowledgeBase: API.OperationMethod<
  DeleteKnowledgeBaseRequest,
  DeleteKnowledgeBaseResponse,
  DeleteKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<DeleteKnowledgeBaseRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<DeleteKnowledgeBaseResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKnowledgeBase",
}));

export type DeleteQuickResponseError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a quick response.
 */
export const deleteQuickResponse: API.OperationMethod<
  DeleteQuickResponseRequest,
  DeleteQuickResponseResponse,
  DeleteQuickResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<DeleteQuickResponseRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<DeleteQuickResponseResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQuickResponse",
}));

export type GetAssistantError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an assistant.
 */
export const getAssistant: API.OperationMethod<
  GetAssistantRequest,
  GetAssistantResponse,
  GetAssistantError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<GetAssistantRequest>,
  output: __S(912, __c57, 0) as any as S.Schema<GetAssistantResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssistant",
}));

export type GetAssistantAssociationError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about an assistant association.
 */
export const getAssistantAssociation: API.OperationMethod<
  GetAssistantAssociationRequest,
  GetAssistantAssociationResponse,
  GetAssistantAssociationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<GetAssistantAssociationRequest>,
  output: __S(976, __c61, 0) as any as S.Schema<GetAssistantAssociationResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssistantAssociation",
}));

export type GetContentError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves content, including a pre-signed URL to download the content.
 */
export const getContent: API.OperationMethod<
  GetContentRequest,
  GetContentResponse,
  GetContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<GetContentRequest>,
  output: __S(17, __c1, 1) as any as S.Schema<GetContentResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContent",
}));

export type GetContentSummaryError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves summary information about the content.
 */
export const getContentSummary: API.OperationMethod<
  GetContentSummaryRequest,
  GetContentSummaryResponse,
  GetContentSummaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<GetContentSummaryRequest>,
  output: __S(353, __c22, 1) as any as S.Schema<GetContentSummaryResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContentSummary",
}));

export type GetImportJobError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the started import job.
 */
export const getImportJob: API.OperationMethod<
  GetImportJobRequest,
  GetImportJobResponse,
  GetImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<GetImportJobRequest>,
  output: __S(417, __c26, 1) as any as S.Schema<GetImportJobResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportJob",
}));

export type GetKnowledgeBaseError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the knowledge base.
 */
export const getKnowledgeBase: API.OperationMethod<
  GetKnowledgeBaseRequest,
  GetKnowledgeBaseResponse,
  GetKnowledgeBaseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<GetKnowledgeBaseRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<GetKnowledgeBaseResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKnowledgeBase",
}));

export type GetQuickResponseError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the quick response.
 */
export const getQuickResponse: API.OperationMethod<
  GetQuickResponseRequest,
  GetQuickResponseResponse,
  GetQuickResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(448, __c28, 0) as any as S.Schema<GetQuickResponseRequest>,
  output: __S(145, __c9, 1) as any as S.Schema<GetQuickResponseResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuickResponse",
}));

export type GetRecommendationsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves recommendations for the specified session. To avoid retrieving the same
 * recommendations in subsequent calls, use NotifyRecommendationsReceived. This API supports long-polling behavior with the
 * `waitTimeSeconds` parameter. Short poll is the default behavior and only returns
 * recommendations already available. To perform a manual query against an assistant, use QueryAssistant.
 */
export const getRecommendations: API.OperationMethod<
  GetRecommendationsRequest,
  GetRecommendationsResponse,
  GetRecommendationsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<GetRecommendationsRequest>,
  output: __S(471, __c29, 7) as any as S.Schema<GetRecommendationsResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendations",
}));

export type GetSessionError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information for a specified session.
 */
export const getSession: API.OperationMethod<
  GetSessionRequest,
  GetSessionResponse,
  GetSessionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<GetSessionRequest>,
  output: __S(177, __c11, 1) as any as S.Schema<GetSessionResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
}));

export type ListAssistantAssociationsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about assistant associations.
 */
export const listAssistantAssociations: API.PaginatedOperationMethod<
  ListAssistantAssociationsRequest,
  ListAssistantAssociationsResponse,
  ListAssistantAssociationsError,
  Credentials | HttpClient.HttpClient,
  AssistantAssociationSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<ListAssistantAssociationsRequest>,
  output: __S(514, __c32, 2) as any as S.Schema<ListAssistantAssociationsResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssistantAssociations",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assistantAssociationSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListAssistantsError = AccessDeniedException | ValidationException | CommonErrors;
/**
 * Lists information about assistants.
 */
export const listAssistants: API.PaginatedOperationMethod<
  ListAssistantsRequest,
  ListAssistantsResponse,
  ListAssistantsError,
  Credentials | HttpClient.HttpClient,
  AssistantSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<ListAssistantsRequest>,
  output: __S(530, __c33, 2) as any as S.Schema<ListAssistantsResponse>,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListAssistants",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "assistantSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListContentsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the content.
 */
export const listContents: API.PaginatedOperationMethod<
  ListContentsRequest,
  ListContentsResponse,
  ListContentsError,
  Credentials | HttpClient.HttpClient,
  ContentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<ListContentsRequest>,
  output: __S(561, __c35, 1) as any as S.Schema<ListContentsResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListContents",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "contentSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListImportJobsError = AccessDeniedException | ValidationException | CommonErrors;
/**
 * Lists information about import jobs.
 */
export const listImportJobs: API.PaginatedOperationMethod<
  ListImportJobsRequest,
  ListImportJobsResponse,
  ListImportJobsError,
  Credentials | HttpClient.HttpClient,
  ImportJobSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<ListImportJobsRequest>,
  output: __S(579, __c36, 3) as any as S.Schema<ListImportJobsResponse>,
  errors: [AccessDeniedException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListImportJobs",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "importJobSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListKnowledgeBasesError = AccessDeniedException | ValidationException | CommonErrors;
/**
 * Lists the knowledge bases.
 */
export const listKnowledgeBases: API.PaginatedOperationMethod<
  ListKnowledgeBasesRequest,
  ListKnowledgeBasesResponse,
  ListKnowledgeBasesError,
  Credentials | HttpClient.HttpClient,
  KnowledgeBaseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<ListKnowledgeBasesRequest>,
  output: __S(595, __c37, 3) as any as S.Schema<ListKnowledgeBasesResponse>,
  errors: [AccessDeniedException, ValidationException],
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

export type ListQuickResponsesError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists information about quick response.
 */
export const listQuickResponses: API.PaginatedOperationMethod<
  ListQuickResponsesRequest,
  ListQuickResponsesResponse,
  ListQuickResponsesError,
  Credentials | HttpClient.HttpClient,
  QuickResponseSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<ListQuickResponsesRequest>,
  output: __S(611, __c38, 3) as any as S.Schema<ListQuickResponsesResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQuickResponses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "quickResponseSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Lists the tags for the specified resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(624, __c39, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(625, __c39, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type NotifyRecommendationsReceivedError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the specified recommendations from the specified assistant's queue of newly
 * available recommendations. You can use this API in conjunction with GetRecommendations and a `waitTimeSeconds` input for long-polling
 * behavior and avoiding duplicate recommendations.
 */
export const notifyRecommendationsReceived: API.OperationMethod<
  NotifyRecommendationsReceivedRequest,
  NotifyRecommendationsReceivedResponse,
  NotifyRecommendationsReceivedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<NotifyRecommendationsReceivedRequest>,
  output: __S(643, __c40, 3) as any as S.Schema<NotifyRecommendationsReceivedResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyRecommendationsReceived",
}));

export type QueryAssistantError =
  | AccessDeniedException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Performs a manual search against the specified assistant. To retrieve recommendations for
 * an assistant, use GetRecommendations.
 */
export const queryAssistant: API.PaginatedOperationMethod<
  QueryAssistantRequest,
  QueryAssistantResponse,
  QueryAssistantError,
  Credentials | HttpClient.HttpClient,
  ResultData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<QueryAssistantRequest>,
  output: __S(659, __c41, 3) as any as S.Schema<QueryAssistantResponse>,
  errors: [
    AccessDeniedException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "QueryAssistant",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "results",
    pageSize: "maxResults",
  } as const,
})) as any;

export type RemoveKnowledgeBaseTemplateUriError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a URI template from a knowledge base.
 */
export const removeKnowledgeBaseTemplateUri: API.OperationMethod<
  RemoveKnowledgeBaseTemplateUriRequest,
  RemoveKnowledgeBaseTemplateUriResponse,
  RemoveKnowledgeBaseTemplateUriError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<RemoveKnowledgeBaseTemplateUriRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<RemoveKnowledgeBaseTemplateUriResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveKnowledgeBaseTemplateUri",
}));

export type SearchContentError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Searches for content in a specified knowledge base. Can be used to get a specific content
 * resource by its name.
 */
export const searchContent: API.PaginatedOperationMethod<
  SearchContentRequest,
  SearchContentResponse,
  SearchContentError,
  Credentials | HttpClient.HttpClient,
  ContentSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<SearchContentRequest>,
  output: __S(561, __c35, 1) as any as S.Schema<SearchContentResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchContent",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "contentSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchQuickResponsesError =
  | AccessDeniedException
  | RequestTimeoutException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Searches existing Wisdom quick responses in a Wisdom knowledge base.
 */
export const searchQuickResponses: API.PaginatedOperationMethod<
  SearchQuickResponsesRequest,
  SearchQuickResponsesResponse,
  SearchQuickResponsesError,
  Credentials | HttpClient.HttpClient,
  QuickResponseSearchResultData
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(726, __c45, 6) as any as S.Schema<SearchQuickResponsesRequest>,
  output: __S(729, __c45, 9) as any as S.Schema<SearchQuickResponsesResponse>,
  errors: [
    AccessDeniedException,
    RequestTimeoutException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchQuickResponses",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "results",
    pageSize: "maxResults",
  } as const,
})) as any;

export type SearchSessionsError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Searches for sessions.
 */
export const searchSessions: API.PaginatedOperationMethod<
  SearchSessionsRequest,
  SearchSessionsResponse,
  SearchSessionsError,
  Credentials | HttpClient.HttpClient,
  SessionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<SearchSessionsRequest>,
  output: __S(739, __c46, 3) as any as S.Schema<SearchSessionsResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchSessions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "sessionSummaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type StartContentUploadError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Get a URL to upload content to a knowledge base. To upload content, first make a PUT
 * request to the returned URL with your file, making sure to include the required headers. Then
 * use CreateContent to finalize the content creation process or UpdateContent to modify an existing resource. You can only upload content to a
 * knowledge base of type CUSTOM.
 */
export const startContentUpload: API.OperationMethod<
  StartContentUploadRequest,
  StartContentUploadResponse,
  StartContentUploadError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(752, __c47, 0) as any as S.Schema<StartContentUploadRequest>,
  output: __S(753, __c47, 1) as any as S.Schema<StartContentUploadResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartContentUpload",
}));

export type StartImportJobError =
  | AccessDeniedException
  | ConflictException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Start an asynchronous job to import Wisdom resources from an uploaded source file. Before calling this API, use StartContentUpload to
 * upload an asset that contains the resource data.
 *
 * - For importing Wisdom quick responses, you need to upload a csv file including the quick responses. For information about how to format the csv file for importing quick responses, see Import quick responses.
 */
export const startImportJob: API.OperationMethod<
  StartImportJobRequest,
  StartImportJobResponse,
  StartImportJobError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(768, __c48, 0) as any as S.Schema<StartImportJobRequest>,
  output: __S(417, __c26, 1) as any as S.Schema<StartImportJobResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartImportJob",
}));

export type TagResourceError = ResourceNotFoundException | TooManyTagsException | CommonErrors;
/**
 * Adds the specified tags to the specified resource.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(784, __c49, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<TagResourceResponse>,
  errors: [ResourceNotFoundException, TooManyTagsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UntagResourceError = ResourceNotFoundException | CommonErrors;
/**
 * Removes the specified tags from the specified resource.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(800, __c50, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(208, __c13, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateContentError =
  | AccessDeniedException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates information about the content.
 */
export const updateContent: API.OperationMethod<
  UpdateContentRequest,
  UpdateContentResponse,
  UpdateContentError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(816, __c51, 0) as any as S.Schema<UpdateContentRequest>,
  output: __S(17, __c1, 1) as any as S.Schema<UpdateContentResponse>,
  errors: [
    AccessDeniedException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContent",
}));

export type UpdateKnowledgeBaseTemplateUriError =
  | AccessDeniedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates the template URI of a knowledge base. This is only supported for knowledge bases
 * of type EXTERNAL. Include a single variable in `${variable}` format; this
 * interpolated by Wisdom using ingested content. For example, if you ingest a Salesforce
 * article, it has an `Id` value, and you can set the template URI to
 * `https://myInstanceName.lightning.force.com/lightning/r/Knowledge__kav/*${Id}*\/view`.
 */
export const updateKnowledgeBaseTemplateUri: API.OperationMethod<
  UpdateKnowledgeBaseTemplateUriRequest,
  UpdateKnowledgeBaseTemplateUriResponse,
  UpdateKnowledgeBaseTemplateUriError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(832, __c52, 0) as any as S.Schema<UpdateKnowledgeBaseTemplateUriRequest>,
  output: __S(81, __c5, 1) as any as S.Schema<UpdateKnowledgeBaseTemplateUriResponse>,
  errors: [AccessDeniedException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKnowledgeBaseTemplateUri",
}));

export type UpdateQuickResponseError =
  | AccessDeniedException
  | ConflictException
  | PreconditionFailedException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Wisdom quick response.
 */
export const updateQuickResponse: API.OperationMethod<
  UpdateQuickResponseRequest,
  UpdateQuickResponseResponse,
  UpdateQuickResponseError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(848, __c53, 0) as any as S.Schema<UpdateQuickResponseRequest>,
  output: __S(145, __c9, 1) as any as S.Schema<UpdateQuickResponseResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQuickResponse",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          name: S.String,
          title: S.optional(S.String),
          overrideLinkOutUri: S.optional(S.String),
          metadata: S.optional(__S(944, __c59, 0)),
          uploadId: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(944, __c59, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/knowledgeBases/{knowledgeBaseId}/contents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateContentRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contentArn: S.String,
          contentId: S.String,
          knowledgeBaseArn: S.String,
          knowledgeBaseId: S.String,
          name: S.String,
          revisionId: S.String,
          title: S.String,
          contentType: S.String,
          status: S.String,
          metadata: __S(944, __c59, 0),
          tags: S.optional(__S(944, __c59, 0)),
          linkOutUri: S.optional(S.String),
          url: SensitiveString,
          urlExpiry: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "ContentData" });
    case 1:
      return S.suspend(() => S.Struct({ content: S.optional(__S(16, __c1, 0)) })).annotate({
        identifier: "CreateContentResponse",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          name: S.String,
          knowledgeBaseType: S.String,
          sourceConfiguration: S.optional(__S(65, __c4, 1)),
          renderingConfiguration: S.optional(__S(66, __c4, 2)),
          serverSideEncryptionConfiguration: S.optional(__S(880, __c55, 0)),
          description: S.optional(S.String),
          tags: S.optional(__S(944, __c59, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/knowledgeBases" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateKnowledgeBaseRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ appIntegrationArn: S.String, objectFields: S.optional(__S(48, __c3, 0)) }),
      ).annotate({ identifier: "AppIntegrationsConfiguration" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ appIntegrations: __S(64, __c4, 0) })]);
    case 2:
      return S.suspend(() => S.Struct({ templateUri: S.optional(S.String) })).annotate({
        identifier: "RenderingConfiguration",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          knowledgeBaseArn: S.String,
          name: S.String,
          knowledgeBaseType: S.String,
          status: S.String,
          lastContentModificationTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          sourceConfiguration: S.optional(__S(65, __c4, 1)),
          renderingConfiguration: S.optional(__S(66, __c4, 2)),
          serverSideEncryptionConfiguration: S.optional(__S(880, __c55, 0)),
          description: S.optional(S.String),
          tags: S.optional(__S(944, __c59, 0)),
        }),
      ).annotate({ identifier: "KnowledgeBaseData" });
    case 1:
      return S.suspend(() => S.Struct({ knowledgeBase: S.optional(__S(80, __c5, 0)) })).annotate({
        identifier: "CreateKnowledgeBaseResponse",
      });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          name: S.String,
          content: __S(128, __c8, 0),
          contentType: S.optional(S.String),
          groupingConfiguration: S.optional(__S(129, __c8, 1)),
          description: S.optional(S.String),
          shortcutKey: S.optional(S.String),
          isActive: S.optional(S.Boolean),
          channels: S.optional(__S(112, __c7, 0)),
          language: S.optional(S.String),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(944, __c59, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/knowledgeBases/{knowledgeBaseId}/quickResponses" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateQuickResponseRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.Array(SensitiveString);
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ content: SensitiveString })]);
    case 1:
      return S.suspend(() =>
        S.Struct({ criteria: S.optional(SensitiveString), values: S.optional(__S(112, __c7, 0)) }),
      ).annotate({ identifier: "GroupingConfiguration" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          plainText: S.optional(__S(128, __c8, 0)),
          markdown: S.optional(__S(128, __c8, 0)),
        }),
      ).annotate({ identifier: "QuickResponseContents" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          quickResponseArn: S.String,
          quickResponseId: S.String,
          knowledgeBaseArn: S.String,
          knowledgeBaseId: S.String,
          name: S.String,
          contentType: S.String,
          status: S.String,
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          contents: S.optional(__S(130, __c8, 2)),
          description: S.optional(S.String),
          groupingConfiguration: S.optional(__S(129, __c8, 1)),
          shortcutKey: S.optional(S.String),
          lastModifiedBy: S.optional(S.String),
          isActive: S.optional(S.Boolean),
          channels: S.optional(__S(112, __c7, 0)),
          language: S.optional(S.String),
          tags: S.optional(__S(944, __c59, 0)),
        }),
      ).annotate({ identifier: "QuickResponseData" });
    case 1:
      return S.suspend(() => S.Struct({ quickResponse: S.optional(__S(144, __c9, 0)) })).annotate({
        identifier: "CreateQuickResponseResponse",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          name: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(944, __c59, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/sessions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateSessionRequest" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sessionArn: S.String,
          sessionId: S.String,
          name: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(944, __c59, 0)),
          integrationConfiguration: S.optional(__S(896, __c56, 0)),
        }),
      ).annotate({ identifier: "SessionData" });
    case 1:
      return S.suspend(() => S.Struct({ session: S.optional(__S(176, __c11, 0)) })).annotate({
        identifier: "CreateSessionResponse",
      });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assistantId: S.String.pipe(T.HttpLabel("assistantId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/assistants/{assistantId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAssistantRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteAssistantResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantAssociationId: S.String.pipe(T.HttpLabel("assistantAssociationId")),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/assistants/{assistantId}/associations/{assistantAssociationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteAssistantAssociationRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          contentId: S.String.pipe(T.HttpLabel("contentId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteContentRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          importJobId: S.String.pipe(T.HttpLabel("importJobId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/knowledgeBases/{knowledgeBaseId}/importJobs/{importJobId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteImportJobRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/knowledgeBases/{knowledgeBaseId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteKnowledgeBaseRequest" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          quickResponseId: S.String.pipe(T.HttpLabel("quickResponseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/knowledgeBases/{knowledgeBaseId}/quickResponses/{quickResponseId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteQuickResponseRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assistantId: S.String.pipe(T.HttpLabel("assistantId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/assistants/{assistantId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssistantRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantAssociationId: S.String.pipe(T.HttpLabel("assistantAssociationId")),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/assistants/{assistantId}/associations/{assistantAssociationId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAssistantAssociationRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contentId: S.String.pipe(T.HttpLabel("contentId")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContentRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contentId: S.String.pipe(T.HttpLabel("contentId")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}/summary",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetContentSummaryRequest" });
    case 1:
      return S.suspend(() => S.Struct({ contentSummary: S.optional(__S(368, __c23, 0)) })).annotate(
        { identifier: "GetContentSummaryResponse" },
      );
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          contentArn: S.String,
          contentId: S.String,
          knowledgeBaseArn: S.String,
          knowledgeBaseId: S.String,
          name: S.String,
          revisionId: S.String,
          title: S.String,
          contentType: S.String,
          status: S.String,
          metadata: __S(944, __c59, 0),
          tags: S.optional(__S(944, __c59, 0)),
        }),
      ).annotate({ identifier: "ContentSummary" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          importJobId: S.String.pipe(T.HttpLabel("importJobId")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/knowledgeBases/{knowledgeBaseId}/importJobs/{importJobId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetImportJobRequest" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ instanceId: S.optional(S.String) })).annotate({
        identifier: "ConnectConfiguration",
      });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ connectConfiguration: __S(400, __c25, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({ source: S.String, configuration: __S(401, __c25, 1) }),
      ).annotate({ identifier: "ExternalSourceConfiguration" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          importJobId: S.String,
          knowledgeBaseId: S.String,
          uploadId: S.String,
          knowledgeBaseArn: S.String,
          importJobType: S.String,
          status: S.String,
          url: SensitiveString,
          failedRecordReport: S.optional(SensitiveString),
          urlExpiry: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          metadata: S.optional(__S(944, __c59, 0)),
          externalSourceConfiguration: S.optional(__S(402, __c25, 2)),
        }),
      ).annotate({ identifier: "ImportJobData" });
    case 1:
      return S.suspend(() => S.Struct({ importJob: S.optional(__S(416, __c26, 0)) })).annotate({
        identifier: "GetImportJobResponse",
      });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/knowledgeBases/{knowledgeBaseId}" }),
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
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          quickResponseId: S.String.pipe(T.HttpLabel("quickResponseId")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/knowledgeBases/{knowledgeBaseId}/quickResponses/{quickResponseId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQuickResponseRequest" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          waitTimeSeconds: S.optional(S.Number).pipe(T.HttpQuery("waitTimeSeconds")),
        }).pipe(
          T.all(
            T.Http({
              method: "GET",
              uri: "/assistants/{assistantId}/sessions/{sessionId}/recommendations",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRecommendationsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          recommendationId: S.String,
          document: __S(484, __c30, 4),
          relevanceScore: S.optional(S.Number),
          relevanceLevel: S.optional(S.String),
          type: S.optional(S.String),
        }),
      ).annotate({ identifier: "RecommendationData" });
    case 2:
      return S.Array(__S(465, __c29, 1));
    case 3:
      return S.suspend(() => S.Struct({ text: S.optional(SensitiveString) })).annotate({
        identifier: "QueryRecommendationTriggerData",
      });
    case 4:
      return S.Union([/*@__PURE__*/ S.Struct({ query: __S(467, __c29, 3) })]);
    case 5:
      return S.suspend(() =>
        S.Struct({
          id: S.String,
          type: S.String,
          source: S.String,
          data: __S(468, __c29, 4),
          recommendationIds: __S(48, __c3, 0),
        }),
      ).annotate({ identifier: "RecommendationTrigger" });
    case 6:
      return S.Array(__S(469, __c29, 5));
    case 7:
      return S.suspend(() =>
        S.Struct({ recommendations: __S(466, __c29, 2), triggers: S.optional(__S(470, __c29, 6)) }),
      ).annotate({ identifier: "GetRecommendationsResponse" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseArn: S.optional(S.String),
          knowledgeBaseId: S.optional(S.String),
          contentArn: S.optional(S.String),
          contentId: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContentReference" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          beginOffsetInclusive: S.optional(S.Number),
          endOffsetExclusive: S.optional(S.Number),
        }),
      ).annotate({ identifier: "Highlight" });
    case 2:
      return S.Array(__S(481, __c30, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ text: S.optional(SensitiveString), highlights: S.optional(__S(482, __c30, 2)) }),
      ).annotate({ identifier: "DocumentText" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          contentReference: __S(480, __c30, 0),
          title: S.optional(__S(483, __c30, 3)),
          excerpt: S.optional(__S(483, __c30, 3)),
        }),
      ).annotate({ identifier: "Document" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/assistants/{assistantId}/sessions/{sessionId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetSessionRequest" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/assistants/{assistantId}/associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListAssistantAssociationsRequest" });
    case 1:
      return S.Array(__S(994, __c62, 2));
    case 2:
      return S.suspend(() =>
        S.Struct({
          assistantAssociationSummaries: __S(513, __c32, 1),
          nextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListAssistantAssociationsResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/assistants" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListAssistantsRequest" });
    case 1:
      return S.Array(__S(928, __c58, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ assistantSummaries: __S(529, __c33, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListAssistantsResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/knowledgeBases/{knowledgeBaseId}/contents" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListContentsRequest" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(368, __c23, 0));
    case 1:
      return S.suspend(() =>
        S.Struct({ contentSummaries: __S(560, __c35, 0), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListContentsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/knowledgeBases/{knowledgeBaseId}/importJobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListImportJobsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          importJobId: S.String,
          knowledgeBaseId: S.String,
          uploadId: S.String,
          knowledgeBaseArn: S.String,
          importJobType: S.String,
          status: S.String,
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          metadata: S.optional(__S(944, __c59, 0)),
          externalSourceConfiguration: S.optional(__S(402, __c25, 2)),
        }),
      ).annotate({ identifier: "ImportJobSummary" });
    case 2:
      return S.Array(__S(577, __c36, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ importJobSummaries: __S(578, __c36, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListImportJobsResponse" });
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/knowledgeBases" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListKnowledgeBasesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String,
          knowledgeBaseArn: S.String,
          name: S.String,
          knowledgeBaseType: S.String,
          status: S.String,
          sourceConfiguration: S.optional(__S(65, __c4, 1)),
          renderingConfiguration: S.optional(__S(66, __c4, 2)),
          serverSideEncryptionConfiguration: S.optional(__S(880, __c55, 0)),
          description: S.optional(S.String),
          tags: S.optional(__S(944, __c59, 0)),
        }),
      ).annotate({ identifier: "KnowledgeBaseSummary" });
    case 2:
      return S.Array(__S(593, __c37, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ knowledgeBaseSummaries: __S(594, __c37, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListKnowledgeBasesResponse" });
  }
}
function __c38(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/knowledgeBases/{knowledgeBaseId}/quickResponses" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListQuickResponsesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          quickResponseArn: S.String,
          quickResponseId: S.String,
          knowledgeBaseArn: S.String,
          knowledgeBaseId: S.String,
          name: S.String,
          contentType: S.String,
          status: S.String,
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          description: S.optional(S.String),
          lastModifiedBy: S.optional(S.String),
          isActive: S.optional(S.Boolean),
          channels: S.optional(__S(112, __c7, 0)),
          tags: S.optional(__S(944, __c59, 0)),
        }),
      ).annotate({ identifier: "QuickResponseSummary" });
    case 2:
      return S.Array(__S(609, __c38, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ quickResponseSummaries: __S(610, __c38, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListQuickResponsesResponse" });
  }
}
function __c39(j: number): any {
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
      return S.suspend(() => S.Struct({ tags: S.optional(__S(944, __c59, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c40(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          sessionId: S.String.pipe(T.HttpLabel("sessionId")),
          recommendationIds: __S(48, __c3, 0),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/assistants/{assistantId}/sessions/{sessionId}/recommendations/notify",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "NotifyRecommendationsReceivedRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ recommendationId: S.optional(S.String), message: S.optional(S.String) }),
      ).annotate({ identifier: "NotifyRecommendationsReceivedError" });
    case 2:
      return S.Array(__S(641, __c40, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          recommendationIds: S.optional(__S(48, __c3, 0)),
          errors: S.optional(__S(642, __c40, 2)),
        }),
      ).annotate({ identifier: "NotifyRecommendationsReceivedResponse" });
  }
}
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          queryText: SensitiveString,
          nextToken: S.optional(S.String),
          maxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/query" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "QueryAssistantRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          resultId: S.String,
          document: __S(484, __c30, 4),
          relevanceScore: S.optional(S.Number),
        }),
      ).annotate({ identifier: "ResultData" });
    case 2:
      return S.Array(__S(657, __c41, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ results: __S(658, __c41, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "QueryAssistantResponse" });
  }
}
function __c42(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/knowledgeBases/{knowledgeBaseId}/templateUri" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "RemoveKnowledgeBaseTemplateUriRequest" });
  }
}
function __c43(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          searchExpression: __S(706, __c44, 2),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/knowledgeBases/{knowledgeBaseId}/search" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchContentRequest" });
  }
}
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ field: S.String, operator: S.String, value: S.String }),
      ).annotate({ identifier: "Filter" });
    case 1:
      return S.Array(__S(704, __c44, 0));
    case 2:
      return S.suspend(() => S.Struct({ filters: __S(705, __c44, 1) })).annotate({
        identifier: "SearchExpression",
      });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          values: __S(48, __c3, 0),
          operator: S.String,
          allowFuzziness: S.optional(S.Boolean),
          priority: S.optional(S.String),
        }),
      ).annotate({ identifier: "QuickResponseQueryField" });
    case 1:
      return S.Array(__S(720, __c45, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          values: S.optional(__S(48, __c3, 0)),
          operator: S.String,
          includeNoExistence: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "QuickResponseFilterField" });
    case 3:
      return S.Array(__S(722, __c45, 2));
    case 4:
      return S.suspend(() => S.Struct({ name: S.String, order: S.optional(S.String) })).annotate({
        identifier: "QuickResponseOrderField",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          queries: S.optional(__S(721, __c45, 1)),
          filters: S.optional(__S(723, __c45, 3)),
          orderOnField: S.optional(__S(724, __c45, 4)),
        }),
      ).annotate({ identifier: "QuickResponseSearchExpression" });
    case 6:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          searchExpression: __S(725, __c45, 5),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          attributes: S.optional(__S(944, __c59, 0)),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgeBases/{knowledgeBaseId}/search/quickResponses",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchQuickResponsesRequest" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          quickResponseArn: S.String,
          quickResponseId: S.String,
          knowledgeBaseArn: S.String,
          knowledgeBaseId: S.String,
          name: S.String,
          contentType: S.String,
          status: S.String,
          contents: __S(130, __c8, 2),
          createdTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          lastModifiedTime: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          isActive: S.Boolean,
          description: S.optional(S.String),
          groupingConfiguration: S.optional(__S(129, __c8, 1)),
          shortcutKey: S.optional(S.String),
          lastModifiedBy: S.optional(S.String),
          channels: S.optional(__S(112, __c7, 0)),
          language: S.optional(S.String),
          attributesNotInterpolated: S.optional(__S(48, __c3, 0)),
          attributesInterpolated: S.optional(__S(48, __c3, 0)),
          tags: S.optional(__S(944, __c59, 0)),
        }),
      ).annotate({ identifier: "QuickResponseSearchResultData" });
    case 8:
      return S.Array(__S(727, __c45, 7));
    case 9:
      return S.suspend(() =>
        S.Struct({ results: __S(728, __c45, 8), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchQuickResponsesResponse" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          searchExpression: __S(706, __c44, 2),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/searchSessions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "SearchSessionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          sessionId: S.String,
          sessionArn: S.String,
          assistantId: S.String,
          assistantArn: S.String,
        }),
      ).annotate({ identifier: "SessionSummary" });
    case 2:
      return S.Array(__S(737, __c46, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ sessionSummaries: __S(738, __c46, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchSessionsResponse" });
  }
}
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          contentType: S.String,
          presignedUrlTimeToLive: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/knowledgeBases/{knowledgeBaseId}/upload" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartContentUploadRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          uploadId: S.String,
          url: SensitiveString,
          urlExpiry: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          headersToInclude: __S(944, __c59, 0),
        }),
      ).annotate({ identifier: "StartContentUploadResponse" });
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          importJobType: S.String,
          uploadId: S.String,
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          metadata: S.optional(__S(944, __c59, 0)),
          externalSourceConfiguration: S.optional(__S(402, __c25, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/knowledgeBases/{knowledgeBaseId}/importJobs" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartImportJobRequest" });
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(944, __c59, 0),
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
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(48, __c3, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          contentId: S.String.pipe(T.HttpLabel("contentId")),
          revisionId: S.optional(S.String),
          title: S.optional(S.String),
          overrideLinkOutUri: S.optional(S.String),
          removeOverrideLinkOutUri: S.optional(S.Boolean),
          metadata: S.optional(__S(944, __c59, 0)),
          uploadId: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgeBases/{knowledgeBaseId}/contents/{contentId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateContentRequest" });
  }
}
function __c52(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          templateUri: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/knowledgeBases/{knowledgeBaseId}/templateUri" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateKnowledgeBaseTemplateUriRequest" });
  }
}
function __c53(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          knowledgeBaseId: S.String.pipe(T.HttpLabel("knowledgeBaseId")),
          quickResponseId: S.String.pipe(T.HttpLabel("quickResponseId")),
          name: S.optional(S.String),
          content: S.optional(__S(128, __c8, 0)),
          contentType: S.optional(S.String),
          groupingConfiguration: S.optional(__S(129, __c8, 1)),
          removeGroupingConfiguration: S.optional(S.Boolean),
          description: S.optional(S.String),
          removeDescription: S.optional(S.Boolean),
          shortcutKey: S.optional(S.String),
          removeShortcutKey: S.optional(S.Boolean),
          isActive: S.optional(S.Boolean),
          channels: S.optional(__S(112, __c7, 0)),
          language: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({
              method: "POST",
              uri: "/knowledgeBases/{knowledgeBaseId}/quickResponses/{quickResponseId}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateQuickResponseRequest" });
  }
}
function __c54(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          name: S.String,
          type: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(944, __c59, 0)),
          serverSideEncryptionConfiguration: S.optional(__S(880, __c55, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/assistants" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateAssistantRequest" });
  }
}
function __c55(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ kmsKeyId: S.optional(S.String) })).annotate({
        identifier: "ServerSideEncryptionConfiguration",
      });
  }
}
function __c56(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ topicIntegrationArn: S.optional(S.String) })).annotate({
        identifier: "AssistantIntegrationConfiguration",
      });
  }
}
function __c57(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ assistant: S.optional(__S(928, __c58, 0)) })).annotate({
        identifier: "CreateAssistantResponse",
      });
  }
}
function __c58(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String,
          assistantArn: S.String,
          name: S.String,
          type: S.String,
          status: S.String,
          description: S.optional(S.String),
          tags: S.optional(__S(944, __c59, 0)),
          serverSideEncryptionConfiguration: S.optional(__S(880, __c55, 0)),
          integrationConfiguration: S.optional(__S(896, __c56, 0)),
        }),
      ).annotate({ identifier: "AssistantData" });
  }
}
function __c59(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c60(j: number): any {
  switch (j) {
    case 0:
      return S.Union([/*@__PURE__*/ S.Struct({ knowledgeBaseId: S.String })]);
    case 1:
      return S.suspend(() =>
        S.Struct({
          assistantId: S.String.pipe(T.HttpLabel("assistantId")),
          associationType: S.String,
          association: __S(960, __c60, 0),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(944, __c59, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/assistants/{assistantId}/associations" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateAssistantAssociationRequest" });
  }
}
function __c61(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ assistantAssociation: S.optional(__S(994, __c62, 2)) }),
      ).annotate({ identifier: "CreateAssistantAssociationResponse" });
  }
}
function __c62(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ knowledgeBaseId: S.optional(S.String), knowledgeBaseArn: S.optional(S.String) }),
      ).annotate({ identifier: "KnowledgeBaseAssociationData" });
    case 1:
      return S.Union([/*@__PURE__*/ S.Struct({ knowledgeBaseAssociation: __S(992, __c62, 0) })]);
    case 2:
      return S.suspend(() =>
        S.Struct({
          assistantAssociationId: S.String,
          assistantAssociationArn: S.String,
          assistantId: S.String,
          assistantArn: S.String,
          associationType: S.String,
          associationData: __S(993, __c62, 1),
          tags: S.optional(__S(944, __c59, 0)),
        }),
      ).annotate({ identifier: "AssistantAssociationData" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
