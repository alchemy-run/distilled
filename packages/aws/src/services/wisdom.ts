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
  sdkId: "Wisdom",
  target: "WisdomService",
  version: "2020-10-19",
  sigv4: "wisdom",
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
                `https://wisdom-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://wisdom-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://wisdom.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://wisdom.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class PreconditionFailedException
  extends /*@__PURE__*/ TE.TaggedError("PreconditionFailedException", [], {
    status: 412,
  })<{ readonly message?: string }> {}
export class RequestTimeoutException
  extends /*@__PURE__*/ TE.TaggedError(
    "RequestTimeoutException",
    ["TimeoutError", "RetryableError"],
    { status: 408 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string; readonly resourceName?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class TooManyTagsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyTagsException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string; readonly resourceName?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type SourceConfiguration = {
  appIntegrations: AppIntegrationsConfiguration;
};
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
export type QuickResponseDataProvider = {
  content: string | redacted.Redacted<string>;
};
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
export type QuickResponseContentProvider = {
  content: string | redacted.Redacted<string>;
};
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
export type RecommendationTriggerData = {
  query: QueryRecommendationTriggerData;
};
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
export type NotifyRecommendationsReceivedErrorList =
  NotifyRecommendationsReceivedError_[];
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
  descriptor: {
    service: svc,
    http: "POST /assistants",
    input: {
      clientToken: D.m({ idempotency: true }),
      name: 0,
      type: 0,
      description: 0,
      tags: 0,
      serverSideEncryptionConfiguration: i_ServerSideEncryptionConfiguration,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateAssistant",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/associations",
    input: {
      assistantId: 0,
      associationType: 0,
      association: { knowledgeBaseId: 0 },
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/contents",
    input: {
      knowledgeBaseId: 0,
      name: 0,
      title: 0,
      overrideLinkOutUri: 0,
      metadata: 0,
      uploadId: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { content: o_ContentData },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases",
    input: {
      clientToken: D.m({ idempotency: true }),
      name: 0,
      knowledgeBaseType: 0,
      sourceConfiguration: {
        appIntegrations: { appIntegrationArn: 0, objectFields: 0 },
      },
      renderingConfiguration: { templateUri: 0 },
      serverSideEncryptionConfiguration: i_ServerSideEncryptionConfiguration,
      description: 0,
      tags: 0,
    },
    output: { knowledgeBase: o_KnowledgeBaseData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateKnowledgeBase",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/quickResponses",
    input: {
      knowledgeBaseId: 0,
      name: 0,
      content: i_QuickResponseDataProvider,
      contentType: 0,
      groupingConfiguration: i_GroupingConfiguration,
      description: 0,
      shortcutKey: 0,
      isActive: 0,
      channels: 0,
      language: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { quickResponse: o_QuickResponseData },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/sessions",
    input: {
      clientToken: D.m({ idempotency: true }),
      assistantId: 0,
      name: 0,
      description: 0,
      tags: 0,
    },
    body: true,
  },
  errors: [ConflictException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSession",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /assistants/{assistantId}",
    input: { assistantId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssistant",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /assistants/{assistantId}/associations/{assistantAssociationId}",
    input: { assistantAssociationId: 0, assistantId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteAssistantAssociation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /knowledgeBases/{knowledgeBaseId}/contents/{contentId}",
    input: { knowledgeBaseId: 0, contentId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteContent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /knowledgeBases/{knowledgeBaseId}/importJobs/{importJobId}",
    input: { knowledgeBaseId: 0, importJobId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteImportJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /knowledgeBases/{knowledgeBaseId}",
    input: { knowledgeBaseId: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteKnowledgeBase",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /knowledgeBases/{knowledgeBaseId}/quickResponses/{quickResponseId}",
    input: { knowledgeBaseId: 0, quickResponseId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQuickResponse",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}",
    input: { assistantId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssistant",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/associations/{assistantAssociationId}",
    input: { assistantAssociationId: 0, assistantId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAssistantAssociation",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/contents/{contentId}",
    input: { contentId: 0, knowledgeBaseId: 0 },
    output: { content: o_ContentData },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/contents/{contentId}/summary",
    input: { contentId: 0, knowledgeBaseId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetContentSummary",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/importJobs/{importJobId}",
    input: { importJobId: 0, knowledgeBaseId: 0 },
    output: { importJob: o_ImportJobData },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetImportJob",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}",
    input: { knowledgeBaseId: 0 },
    output: { knowledgeBase: o_KnowledgeBaseData },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetKnowledgeBase",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/quickResponses/{quickResponseId}",
    input: { quickResponseId: 0, knowledgeBaseId: 0 },
    output: { quickResponse: o_QuickResponseData },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuickResponse",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/sessions/{sessionId}/recommendations",
    input: {
      assistantId: 0,
      sessionId: 0,
      maxResults: D.m({ query: "maxResults" }),
      waitTimeSeconds: D.m({ query: "waitTimeSeconds" }),
    },
    output: {
      recommendations: D.list({ document: o_Document }),
      triggers: D.list({ data: { query: { text: D.secret } } }),
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRecommendations",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/sessions/{sessionId}",
    input: { assistantId: 0, sessionId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSession",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /assistants/{assistantId}/associations",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      assistantId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
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

export type ListAssistantsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /assistants",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/contents",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      knowledgeBaseId: 0,
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
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

export type ListImportJobsError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/importJobs",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      knowledgeBaseId: 0,
    },
    output: {
      importJobSummaries: D.list({ createdTime: D.ts, lastModifiedTime: D.ts }),
    },
  },
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

export type ListKnowledgeBasesError =
  | AccessDeniedException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
    },
  },
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
  descriptor: {
    service: svc,
    http: "GET /knowledgeBases/{knowledgeBaseId}/quickResponses",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      knowledgeBaseId: 0,
    },
    output: {
      quickResponseSummaries: D.list({
        createdTime: D.ts,
        lastModifiedTime: D.ts,
        channels: D.list(D.secret),
      }),
    },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
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
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/sessions/{sessionId}/recommendations/notify",
    input: { assistantId: 0, sessionId: 0, recommendationIds: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "NotifyRecommendationsReceived",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/query",
    input: { assistantId: 0, queryText: 0, nextToken: 0, maxResults: 0 },
    output: { results: D.list({ document: o_Document }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "DELETE /knowledgeBases/{knowledgeBaseId}/templateUri",
    input: { knowledgeBaseId: 0 },
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "RemoveKnowledgeBaseTemplateUri",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/search",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      knowledgeBaseId: 0,
      searchExpression: i_SearchExpression,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
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
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/search/quickResponses",
    input: {
      knowledgeBaseId: 0,
      searchExpression: {
        queries: D.list({
          name: 0,
          values: 0,
          operator: 0,
          allowFuzziness: 0,
          priority: 0,
        }),
        filters: D.list({
          name: 0,
          values: 0,
          operator: 0,
          includeNoExistence: 0,
        }),
        orderOnField: { name: 0, order: 0 },
      },
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      attributes: 0,
    },
    output: {
      results: D.list({
        contents: o_QuickResponseContents,
        createdTime: D.ts,
        lastModifiedTime: D.ts,
        groupingConfiguration: o_GroupingConfiguration,
        channels: D.list(D.secret),
      }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /assistants/{assistantId}/searchSessions",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      assistantId: 0,
      searchExpression: i_SearchExpression,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
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
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/upload",
    input: { knowledgeBaseId: 0, contentType: 0, presignedUrlTimeToLive: 0 },
    output: { url: D.secret, urlExpiry: D.ts },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartContentUpload",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/importJobs",
    input: {
      knowledgeBaseId: 0,
      importJobType: 0,
      uploadId: 0,
      clientToken: D.m({ idempotency: true }),
      metadata: 0,
      externalSourceConfiguration: {
        source: 0,
        configuration: { connectConfiguration: { instanceId: 0 } },
      },
    },
    output: { importJob: o_ImportJobData },
    body: true,
  },
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
})) as any;

export type TagResourceError =
  | ResourceNotFoundException
  | TooManyTagsException
  | CommonErrors;
/**
 * Adds the specified tags to the specified resource.
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
  errors: [ResourceNotFoundException, TooManyTagsException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [ResourceNotFoundException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/contents/{contentId}",
    input: {
      knowledgeBaseId: 0,
      contentId: 0,
      revisionId: 0,
      title: 0,
      overrideLinkOutUri: 0,
      removeOverrideLinkOutUri: 0,
      metadata: 0,
      uploadId: 0,
    },
    output: { content: o_ContentData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    PreconditionFailedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateContent",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/templateUri",
    input: { knowledgeBaseId: 0, templateUri: 0 },
    output: { knowledgeBase: o_KnowledgeBaseData },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateKnowledgeBaseTemplateUri",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /knowledgeBases/{knowledgeBaseId}/quickResponses/{quickResponseId}",
    input: {
      knowledgeBaseId: 0,
      quickResponseId: 0,
      name: 0,
      content: i_QuickResponseDataProvider,
      contentType: 0,
      groupingConfiguration: i_GroupingConfiguration,
      removeGroupingConfiguration: 0,
      description: 0,
      removeDescription: 0,
      shortcutKey: 0,
      removeShortcutKey: 0,
      isActive: 0,
      channels: 0,
      language: 0,
    },
    output: { quickResponse: o_QuickResponseData },
    body: true,
  },
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
})) as any;

const i_GroupingConfiguration: D.LazyStruct = () => ({
  criteria: 0,
  values: 0,
});
const i_QuickResponseDataProvider: D.LazyStruct = () => ({ content: 0 });
const i_SearchExpression: D.LazyStruct = () => ({
  filters: D.list({ field: 0, operator: 0, value: 0 }),
});
const i_ServerSideEncryptionConfiguration: D.LazyStruct = () => ({
  kmsKeyId: 0,
});
const o_ContentData: D.LazyStruct = () => ({ url: D.secret, urlExpiry: D.ts });
const o_Document: D.LazyStruct = () => ({
  title: o_DocumentText,
  excerpt: o_DocumentText,
});
const o_GroupingConfiguration: D.LazyStruct = () => ({
  criteria: D.secret,
  values: D.list(D.secret),
});
const o_ImportJobData: D.LazyStruct = () => ({
  url: D.secret,
  failedRecordReport: D.secret,
  urlExpiry: D.ts,
  createdTime: D.ts,
  lastModifiedTime: D.ts,
});
const o_KnowledgeBaseData: D.LazyStruct = () => ({
  lastContentModificationTime: D.ts,
});
const o_QuickResponseContents: D.LazyStruct = () => ({
  plainText: o_QuickResponseContentProvider,
  markdown: o_QuickResponseContentProvider,
});
const o_QuickResponseData: D.LazyStruct = () => ({
  createdTime: D.ts,
  lastModifiedTime: D.ts,
  contents: o_QuickResponseContents,
  groupingConfiguration: o_GroupingConfiguration,
  channels: D.list(D.secret),
});
const o_DocumentText: D.LazyStruct = () => ({ text: D.secret });
const o_QuickResponseContentProvider: D.LazyStruct = () => ({
  content: D.secret,
});
