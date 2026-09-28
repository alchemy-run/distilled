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
  sdkId: "ElementalInference",
  target: "ElementalInference",
  version: "2018-11-14",
  sigv4: "elemental-inference",
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
                `https://elemental-inference-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://elemental-inference-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://elemental-inference.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://elemental-inference.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConflictException",
    ["ConflictError", "RetryableError"],
    { status: 409 },
  )<{ readonly message: string }> {}
export class GatewayTimedOutException
  extends /*@__PURE__*/ TE.TaggedError(
    "GatewayTimedOutException",
    ["TimeoutError", "RetryableError"],
    { status: 504 },
  )<{ readonly message: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceUnavailableException",
    ["ServerError", "RetryableError"],
    { status: 503 },
  )<{ readonly message: string }> {}
export class TooManyRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type FeedId = string;
export type AssociatedResourceName = string;
export type ResourceName = string;
export type S3Uri = string;
export type TemplateUriList = string[];
export interface TemplateGroup {
  name: string;
  templateUris: string[];
}
export type TemplateGroupList = TemplateGroup[];
export interface CroppingConfig {
  templateGroups?: TemplateGroup[];
}
export type ResourceDescription = string;
export type FixtureId = string;
export interface DataSourceConfiguration {
  fixtureId: string;
}
export interface ClippingConfig {
  callbackMetadata?: string;
  dataSourceConfiguration?: DataSourceConfiguration;
}
export type TranscriptionLanguage =
  | "eng"
  | "eng-au"
  | "eng-gb"
  | "eng-us"
  | "fra"
  | "ita"
  | "deu"
  | "spa"
  | "por"
  | (string & {});
export interface AspectRatio {
  width: number;
  height: number;
}
export type DictionaryId = string;
export type ProfanityFilterMode =
  | "DISABLED"
  | "CENSOR"
  | "DROP"
  | (string & {});
export interface SubtitlingConfig {
  language: TranscriptionLanguage;
  aspectRatio?: AspectRatio;
  dictionary?: string;
  profanityFilter?: ProfanityFilterMode;
}
export type OutputConfig =
  | { cropping: CroppingConfig; clipping?: never; subtitling?: never }
  | { cropping?: never; clipping: ClippingConfig; subtitling?: never }
  | { cropping?: never; clipping?: never; subtitling: SubtitlingConfig };
export type OutputStatus = "ENABLED" | "DISABLED" | (string & {});
export interface CreateOutput {
  name: string;
  outputConfig: OutputConfig;
  status: OutputStatus;
  description?: string;
}
export type CreateOutputList = CreateOutput[];
export interface AssociateFeedRequest {
  id: string;
  associatedResourceName: string;
  outputs: CreateOutput[];
  dryRun?: boolean;
}
export type FeedArn = string;
export interface AssociateFeedResponse {
  arn: string;
  id: string;
}
export type DictionaryLanguage =
  | "eng"
  | "fra"
  | "ita"
  | "deu"
  | "spa"
  | "por"
  | (string & {});
export type DictionaryEntriesPayload = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateDictionaryRequest {
  name: string;
  language: DictionaryLanguage;
  entries?: string;
  tags?: { [key: string]: string | undefined };
}
export type DictionaryArn = string;
export type DictionaryStatus =
  | "CREATING"
  | "AVAILABLE"
  | "REFERENCED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export type FeedReferences = string[];
export interface CreateDictionaryResponse {
  name: string;
  arn: string;
  id: string;
  language: DictionaryLanguage;
  status: DictionaryStatus;
  references?: string[];
  tags?: { [key: string]: string | undefined };
}
export type IamRoleArn = string;
export interface CreateFeedRequest {
  name: string;
  accessRoleArn?: string;
  outputs: CreateOutput[];
  tags?: { [key: string]: string | undefined };
}
export type StringList = string[];
export interface GetOutput {
  name: string;
  outputConfig: OutputConfig;
  status: OutputStatus;
  description?: string;
  fromAssociation?: boolean;
}
export type GetOutputList = GetOutput[];
export type FeedStatus =
  | "CREATING"
  | "AVAILABLE"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "ARCHIVED"
  | (string & {});
export interface FeedAssociation {
  associatedResourceName: string;
}
export interface CreateFeedResponse {
  arn: string;
  name: string;
  id: string;
  dataEndpoints: string[];
  outputs: GetOutput[];
  accessRoleArn?: string;
  status: FeedStatus;
  association?: FeedAssociation;
  tags?: { [key: string]: string | undefined };
}
export interface DeleteDictionaryRequest {
  id: string;
}
export interface DeleteDictionaryResponse {
  arn: string;
  id: string;
  status: DictionaryStatus;
}
export interface DeleteFeedRequest {
  id: string;
}
export interface DeleteFeedResponse {
  arn: string;
  id: string;
  status: FeedStatus;
}
export interface DisassociateFeedRequest {
  id: string;
  associatedResourceName: string;
  dryRun?: boolean;
}
export interface DisassociateFeedResponse {
  arn: string;
  id: string;
}
export interface ExportDictionaryEntriesRequest {
  id: string;
}
export interface ExportDictionaryEntriesResponse {
  entries?: string;
}
export interface GetDictionaryRequest {
  id: string;
}
export interface GetDictionaryResponse {
  name: string;
  arn: string;
  id: string;
  language: DictionaryLanguage;
  status: DictionaryStatus;
  references?: string[];
  tags?: { [key: string]: string | undefined };
}
export interface GetFeedRequest {
  id: string;
}
export interface GetFeedResponse {
  arn: string;
  name: string;
  id: string;
  dataEndpoints: string[];
  outputs: GetOutput[];
  accessRoleArn?: string;
  status: FeedStatus;
  association?: FeedAssociation;
  tags?: { [key: string]: string | undefined };
}
export interface GetFixtureRequest {
  fixtureId: string;
}
export interface Competitor {
  name?: string;
  isHome?: boolean;
}
export type CompetitorList = Competitor[];
export interface GetFixtureResponse {
  fixtureId: string;
  name: string;
  fixtureGroup?: string;
  scheduledStart?: Date;
  status: string;
  competitors: Competitor[];
}
export interface ListDictionariesRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface DictionarySummary {
  arn: string;
  id: string;
  name: string;
  language: DictionaryLanguage;
  status: DictionaryStatus;
}
export type DictionarySummaryList = DictionarySummary[];
export interface ListDictionariesResponse {
  dictionaries: DictionarySummary[];
  nextToken?: string;
}
export interface ListFeedsRequest {
  maxResults?: number;
  nextToken?: string;
}
export interface FeedSummary {
  arn: string;
  id: string;
  name: string;
  association?: FeedAssociation;
  status: FeedStatus;
}
export type FeedSummaryList = FeedSummary[];
export interface ListFeedsResponse {
  feeds: FeedSummary[];
  nextToken?: string;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export type DataSourceSport =
  | "basketball"
  | "american-football"
  | (string & {});
export type FixtureDate = string;
export type FilterName = "COMPETITOR" | (string & {});
export type FilterValue = string;
export type FilterValueList = string[];
export interface SearchFilter {
  name: FilterName;
  values: string[];
}
export type SearchFilterList = SearchFilter[];
export interface SearchFixturesRequest {
  sport: DataSourceSport;
  startDate: string;
  endDate?: string;
  filters?: SearchFilter[];
  maxResults?: number;
  nextToken?: string;
}
export interface FixtureSummary {
  fixtureId: string;
  name: string;
  fixtureGroup?: string;
  scheduledStart?: Date;
  status: string;
  competitors: Competitor[];
}
export type FixtureSummaryList = FixtureSummary[];
export interface SearchFixturesResponse {
  fixtures: FixtureSummary[];
  nextToken?: string;
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
export interface UpdateDictionaryRequest {
  id: string;
  name?: string;
  language?: DictionaryLanguage;
  entries?: string;
}
export interface UpdateDictionaryResponse {
  name: string;
  arn: string;
  id: string;
  language: DictionaryLanguage;
  status: DictionaryStatus;
  references?: string[];
  tags?: { [key: string]: string | undefined };
}
export interface UpdateOutput {
  name: string;
  outputConfig: OutputConfig;
  status: OutputStatus;
  description?: string;
  fromAssociation?: boolean;
}
export type UpdateOutputList = UpdateOutput[];
export interface UpdateFeedRequest {
  name: string;
  accessRoleArn?: string;
  id: string;
  outputs: UpdateOutput[];
}
export interface UpdateFeedResponse {
  arn: string;
  name: string;
  id: string;
  dataEndpoints: string[];
  outputs: GetOutput[];
  accessRoleArn?: string;
  status: FeedStatus;
  association?: FeedAssociation;
  tags?: { [key: string]: string | undefined };
}
export type AssociateFeedError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Associates a resource with the feed. The resource provides the input that Elemental Inference needs in order to perform an Elemental Inference feature, such as cropping video. You always provide the resource by associating it with a feed. You can associate only one resource with each feed. With an association, a specific source media is claiming ownership of the feed.
 *
 * AssociateFeed is a PATCH operation, which means that you can include only parameters that you want to change. Parameters that you don't include will not be affected by the operation.
 *
 * Specifically:
 *
 * - You can add more outputs to the existing outputs. New outputs will be appended.
 *
 * - You can't modify an existing output (for example to change its name). Instead, use UpdateFeed.
 *
 * - You can't delete an existing output. Instead, use UpdateFeed.
 *
 * Also note that you can't change the feed name with AssociateFeed. Instead, use UpdateFeed.
 */
export const associateFeed: API.OperationMethod<
  AssociateFeedRequest,
  AssociateFeedResponse,
  AssociateFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/feed/{id}/associate",
    input: {
      id: 0,
      associatedResourceName: D.m({ idempotency: true }),
      outputs: D.list(i_CreateOutput),
      dryRun: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFeed",
})) as any;

export type CreateDictionaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ServiceQuotaExceededException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Creates a custom dictionary for improving transcription accuracy. A dictionary contains custom words and phrases that the ASR engine might not recognize, such as brand names, technical terms, or proper nouns. You can reference a dictionary when configuring a smart subtitles output.
 */
export const createDictionary: API.OperationMethod<
  CreateDictionaryRequest,
  CreateDictionaryResponse,
  CreateDictionaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/dictionary",
    input: { name: 0, language: 0, entries: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDictionary",
})) as any;

export type CreateFeedError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ServiceQuotaExceededException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Creates a feed. The feed is the target for the live media stream that is being sent by the calling application. An example of a calling application is AWS Elemental MediaLive.
 *
 * The key contents of the feed is an array of outputs. Each output represents an Elemental Inference feature. After you create the feed, you must associate a resource with the feed. At that point, you will have a useable feed: resource - feed - output or outputs.
 */
export const createFeed: API.OperationMethod<
  CreateFeedRequest,
  CreateFeedResponse,
  CreateFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/feed",
    input: {
      name: 0,
      accessRoleArn: 0,
      outputs: D.list(i_CreateOutput),
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFeed",
})) as any;

export type DeleteDictionaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified dictionary. You cannot delete a dictionary that is referenced by a feed. You must first remove the dictionary reference from the feed's subtitling configuration.
 */
export const deleteDictionary: API.OperationMethod<
  DeleteDictionaryRequest,
  DeleteDictionaryResponse,
  DeleteDictionaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/dictionary/{id}",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDictionary",
})) as any;

export type DeleteFeedError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified feed. You can delete the feed at any time. Elemental Inference doesn't block you from deleting a feed when the calling application is calling PutMedia or GetMetadata on that feed, although both these calls will start to fail. For more information about managing inactive feeds, see the Elemental Inference User Guide.
 */
export const deleteFeed: API.OperationMethod<
  DeleteFeedRequest,
  DeleteFeedResponse,
  DeleteFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "DELETE /v1/feed/{id}", input: { id: 0 } },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFeed",
})) as any;

export type DisassociateFeedError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Releases the resource (the source media) that is associated with this feed. The outputs in the feed become DISABLED.
 */
export const disassociateFeed: API.OperationMethod<
  DisassociateFeedRequest,
  DisassociateFeedResponse,
  DisassociateFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/feed/{id}/disassociate",
    input: {
      id: 0,
      associatedResourceName: D.m({ idempotency: true }),
      dryRun: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFeed",
})) as any;

export type ExportDictionaryEntriesError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Exports the entries from the specified dictionary.
 */
export const exportDictionaryEntries: API.OperationMethod<
  ExportDictionaryEntriesRequest,
  ExportDictionaryEntriesResponse,
  ExportDictionaryEntriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/dictionary/{id}/entries/export",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportDictionaryEntries",
})) as any;

export type GetDictionaryError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified dictionary.
 */
export const getDictionary: API.OperationMethod<
  GetDictionaryRequest,
  GetDictionaryResponse,
  GetDictionaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/dictionary/{id}",
    input: { id: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDictionary",
})) as any;

export type GetFeedError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | CommonErrors;
/**
 * Retrieves information about the specified feed.
 */
export const getFeed: API.OperationMethod<
  GetFeedRequest,
  GetFeedResponse,
  GetFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: { service: svc, http: "GET /v1/feed/{id}", input: { id: 0 } },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFeed",
})) as any;

export type GetFixtureError =
  | AccessDeniedException
  | GatewayTimedOutException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceUnavailableException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified fixture (a sports event, such as a specific basketball game). You obtain a fixtureId from SearchFixtures, or from the clipping output of a feed.
 */
export const getFixture: API.OperationMethod<
  GetFixtureRequest,
  GetFixtureResponse,
  GetFixtureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/fixtures/{fixtureId}",
    input: { fixtureId: 0 },
    output: { scheduledStart: D.ts },
  },
  errors: [
    AccessDeniedException,
    GatewayTimedOutException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFixture",
})) as any;

export type ListDictionariesError =
  | AccessDeniedException
  | InternalServerErrorException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Lists the dictionaries in your account.
 */
export const listDictionaries: API.PaginatedOperationMethod<
  ListDictionariesRequest,
  ListDictionariesResponse,
  ListDictionariesError,
  Credentials | HttpClient.HttpClient,
  DictionarySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/dictionaries",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDictionaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dictionaries",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListFeedsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Displays a list of feeds that belong to this AWS account.
 */
export const listFeeds: API.PaginatedOperationMethod<
  ListFeedsRequest,
  ListFeedsResponse,
  ListFeedsError,
  Credentials | HttpClient.HttpClient,
  FeedSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/feeds",
    input: {
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFeeds",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "feeds",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * List all tags that are on an Elemental Inference resource in the current region.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /v1/tags/{resourceArn}",
    input: { resourceArn: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type SearchFixturesError =
  | AccessDeniedException
  | GatewayTimedOutException
  | InternalServerErrorException
  | ServiceUnavailableException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Searches for the fixtures (sports events, such as a specific basketball game) that are available for a sport in a date window. Each fixture in the response includes a fixtureId that you specify in the clipping output of a feed, so that Elemental Inference maps the event data for that fixture onto the clipping metadata. This operation is paginated: if there are more fixtures than fit in one page, the response includes a nextToken that you pass in a subsequent request.
 */
export const searchFixtures: API.PaginatedOperationMethod<
  SearchFixturesRequest,
  SearchFixturesResponse,
  SearchFixturesError,
  Credentials | HttpClient.HttpClient,
  FixtureSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/fixtures",
    input: {
      sport: 0,
      startDate: 0,
      endDate: 0,
      filters: D.list({ name: 0, values: 0 }),
      maxResults: 0,
      nextToken: 0,
    },
    output: { fixtures: D.list({ scheduledStart: D.ts }) },
    body: true,
  },
  errors: [
    AccessDeniedException,
    GatewayTimedOutException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchFixtures",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fixtures",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Associates the specified tags to the resource identified by the specified resourceArn in the current region. If existing tags on a resource are not specified in the request parameters, they are not changed. When a resource is deleted, the tags associated with that resource are also deleted.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /v1/tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Deletes specified tags from the specified resource in the current region.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /v1/tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateDictionaryError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Updates the specified dictionary.
 */
export const updateDictionary: API.OperationMethod<
  UpdateDictionaryRequest,
  UpdateDictionaryResponse,
  UpdateDictionaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /v1/dictionary/{id}",
    input: { id: 0, name: 0, language: 0, entries: 0 },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDictionary",
})) as any;

export type UpdateFeedError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Updates the name and/or outputs in a feed.
 *
 * UpdateFeed is a PUT operation, which means that the payload that you specify completely overwrites the existing payload.
 *
 * This means that if you want to touch the array of outputs, you must pass in the full new list. So you must omit outputs you want to delete, and include outputs you want to add or modify.
 *
 * If you want to patch the array of outputs to make selective additions, use AssociateFeed.
 */
export const updateFeed: API.OperationMethod<
  UpdateFeedRequest,
  UpdateFeedResponse,
  UpdateFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /v1/feed/{id}",
    input: {
      name: 0,
      accessRoleArn: 0,
      id: 0,
      outputs: D.list({
        name: 0,
        outputConfig: i_OutputConfig,
        status: 0,
        description: 0,
        fromAssociation: 0,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFeed",
})) as any;

const i_CreateOutput: D.LazyStruct = () => ({
  name: 0,
  outputConfig: i_OutputConfig,
  status: 0,
  description: 0,
});
const i_OutputConfig: D.LazyStruct = () => ({
  cropping: { templateGroups: D.list({ name: 0, templateUris: 0 }) },
  clipping: { callbackMetadata: 0, dataSourceConfiguration: { fixtureId: 0 } },
  subtitling: {
    language: 0,
    aspectRatio: { width: 0, height: 0 },
    dictionary: 0,
    profanityFilter: 0,
  },
});
