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
  sdkId: "ElementalInference",
  serviceShapeName: "ElementalInference",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "elemental-inference" });
const ver = /*@__PURE__*/ T.ServiceVersion("2018-11-14");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://elemental-inference.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://elemental-inference.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://elemental-inference.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(409), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class GatewayTimedOutException
  extends /*@__PURE__*/ S.TaggedError<GatewayTimedOutException>()(
    "GatewayTimedOutException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(504), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withTimeoutError, C.withRetryableError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ServiceUnavailableException
  extends /*@__PURE__*/ S.TaggedError<ServiceUnavailableException>()(
    "ServiceUnavailableException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(503), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class TooManyRequestException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestException>()(
    "TooManyRequestException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(429), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type ProfanityFilterMode = "DISABLED" | "CENSOR" | "DROP" | (string & {});
export interface SubtitlingConfig {
  language: TranscriptionLanguage;
  aspectRatio?: AspectRatio;
  dictionary?: string;
  profanityFilter?: ProfanityFilterMode;
}
export type SummaryGenerationMode = "ENABLED" | "DISABLED" | (string & {});
export type ExtendedAnalysisMode = "ENABLED" | "DISABLED" | (string & {});
export interface ContextualMetadataConfig {
  summaryGeneration?: SummaryGenerationMode;
  extendedAnalysis?: ExtendedAnalysisMode;
}
export type OutputConfig =
  | { cropping: CroppingConfig; clipping?: never; subtitling?: never; contextualMetadata?: never }
  | { cropping?: never; clipping: ClippingConfig; subtitling?: never; contextualMetadata?: never }
  | { cropping?: never; clipping?: never; subtitling: SubtitlingConfig; contextualMetadata?: never }
  | {
      cropping?: never;
      clipping?: never;
      subtitling?: never;
      contextualMetadata: ContextualMetadataConfig;
    };
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
export type DictionaryLanguage = "eng" | "fra" | "ita" | "deu" | "spa" | "por" | (string & {});
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
export interface DeleteFeedPolicyRequest {
  id: string;
}
export interface DeleteFeedPolicyResponse {}
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
export interface GetFeedPolicyRequest {
  id: string;
}
export type PolicyDocument = string;
export interface GetFeedPolicyResponse {
  policy: string;
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
export interface PutFeedPolicyRequest {
  id: string;
  policy: string;
}
export interface PutFeedPolicyResponse {}
export type DataSourceSport = "basketball" | "american-football" | (string & {});
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
  input: __S(432, __c27, 0) as any as S.Schema<AssociateFeedRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<AssociateFeedResponse>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<CreateDictionaryRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<CreateDictionaryResponse>,
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
}));

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
  input: __S(48, __c3, 0) as any as S.Schema<CreateFeedRequest>,
  output: __S(82, __c5, 2) as any as S.Schema<CreateFeedResponse>,
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
}));

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
  input: __S(96, __c6, 0) as any as S.Schema<DeleteDictionaryRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<DeleteDictionaryResponse>,
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
}));

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
  input: __S(128, __c8, 0) as any as S.Schema<DeleteFeedRequest>,
  output: __S(112, __c7, 0) as any as S.Schema<DeleteFeedResponse>,
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
}));

export type DeleteFeedPolicyError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the resource-based policy attached to the specified feed. After you delete the policy, the operation revokes the cross-account access that the policy granted.
 */
export const deleteFeedPolicy: API.OperationMethod<
  DeleteFeedPolicyRequest,
  DeleteFeedPolicyResponse,
  DeleteFeedPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<DeleteFeedPolicyRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<DeleteFeedPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFeedPolicy",
}));

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
  input: __S(176, __c11, 0) as any as S.Schema<DisassociateFeedRequest>,
  output: __S(496, __c31, 0) as any as S.Schema<DisassociateFeedResponse>,
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
}));

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
  input: __S(192, __c12, 0) as any as S.Schema<ExportDictionaryEntriesRequest>,
  output: __S(193, __c12, 1) as any as S.Schema<ExportDictionaryEntriesResponse>,
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
}));

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
  input: __S(208, __c13, 0) as any as S.Schema<GetDictionaryRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<GetDictionaryResponse>,
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
}));

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
  input: __S(224, __c14, 0) as any as S.Schema<GetFeedRequest>,
  output: __S(82, __c5, 2) as any as S.Schema<GetFeedResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFeed",
}));

export type GetFeedPolicyError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the resource-based policy attached to the specified feed.
 */
export const getFeedPolicy: API.OperationMethod<
  GetFeedPolicyRequest,
  GetFeedPolicyResponse,
  GetFeedPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(240, __c15, 0) as any as S.Schema<GetFeedPolicyRequest>,
  output: __S(241, __c15, 1) as any as S.Schema<GetFeedPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFeedPolicy",
}));

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
  input: __S(256, __c16, 0) as any as S.Schema<GetFixtureRequest>,
  output: __S(274, __c17, 2) as any as S.Schema<GetFixtureResponse>,
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
}));

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
  input: __S(288, __c18, 0) as any as S.Schema<ListDictionariesRequest>,
  output: __S(291, __c18, 3) as any as S.Schema<ListDictionariesResponse>,
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
  input: __S(304, __c19, 0) as any as S.Schema<ListFeedsRequest>,
  output: __S(307, __c19, 3) as any as S.Schema<ListFeedsResponse>,
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
  input: __S(320, __c20, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(321, __c20, 1) as any as S.Schema<ListTagsForResourceResponse>,
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
}));

export type PutFeedPolicyError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Attaches or replaces a resource-based policy on the specified feed. A resource-based policy grants cross-account access to the feed.
 */
export const putFeedPolicy: API.OperationMethod<
  PutFeedPolicyRequest,
  PutFeedPolicyResponse,
  PutFeedPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<PutFeedPolicyRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<PutFeedPolicyResponse>,
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
  operationName: "PutFeedPolicy",
}));

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
  input: __S(354, __c22, 2) as any as S.Schema<SearchFixturesRequest>,
  output: __S(356, __c22, 4) as any as S.Schema<SearchFixturesResponse>,
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
  input: __S(368, __c23, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<TagResourceResponse>,
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
}));

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
  input: __S(384, __c24, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(160, __c10, 0) as any as S.Schema<UntagResourceResponse>,
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
}));

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
  input: __S(400, __c25, 0) as any as S.Schema<UpdateDictionaryRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<UpdateDictionaryResponse>,
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
}));

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
  input: __S(416, __c26, 0) as any as S.Schema<UpdateFeedRequest>,
  output: __S(82, __c5, 2) as any as S.Schema<UpdateFeedResponse>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          language: S.String,
          entries: S.optional(S.String),
          tags: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/dictionary" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateDictionaryRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          arn: S.String,
          id: S.String,
          language: S.String,
          status: S.String,
          references: S.optional(__S(448, __c28, 0)),
          tags: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "CreateDictionaryResponse" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          accessRoleArn: S.optional(S.String),
          outputs: __S(465, __c29, 1),
          tags: S.optional(__S(16, __c1, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/v1/feed" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateFeedRequest" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ associatedResourceName: S.String })).annotate({
        identifier: "FeedAssociation",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          outputConfig: __S(488, __c30, 8),
          status: S.String,
          description: S.optional(S.String),
          fromAssociation: S.optional(S.Boolean),
        }),
      ).annotate({ identifier: "GetOutput" });
    case 1:
      return S.Array(__S(80, __c5, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          name: S.String,
          id: S.String,
          dataEndpoints: __S(448, __c28, 0),
          outputs: __S(81, __c5, 1),
          accessRoleArn: S.optional(S.String),
          status: S.String,
          association: S.optional(__S(64, __c4, 0)),
          tags: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "CreateFeedResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/dictionary/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteDictionaryRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ arn: S.String, id: S.String, status: S.String })).annotate({
        identifier: "DeleteDictionaryResponse",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/v1/feed/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteFeedRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/feed/{id}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFeedPolicyRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteFeedPolicyResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          associatedResourceName: S.String.pipe(T.IdempotencyToken()),
          dryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/feed/{id}/disassociate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DisassociateFeedRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/dictionary/{id}/entries/export" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ExportDictionaryEntriesRequest" });
    case 1:
      return S.suspend(() => S.Struct({ entries: S.optional(S.String) })).annotate({
        identifier: "ExportDictionaryEntriesResponse",
      });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/dictionary/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetDictionaryRequest" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/feed/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetFeedRequest" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/feed/{id}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFeedPolicyRequest" });
    case 1:
      return S.suspend(() => S.Struct({ policy: S.String })).annotate({
        identifier: "GetFeedPolicyResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ fixtureId: S.String.pipe(T.HttpLabel("fixtureId")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/fixtures/{fixtureId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetFixtureRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), isHome: S.optional(S.Boolean) }),
      ).annotate({ identifier: "Competitor" });
    case 1:
      return S.Array(__S(272, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          fixtureId: S.String,
          name: S.String,
          fixtureGroup: S.optional(S.String),
          scheduledStart: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          status: S.String,
          competitors: __S(273, __c17, 1),
        }),
      ).annotate({ identifier: "GetFixtureResponse" });
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/dictionaries" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListDictionariesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          id: S.String,
          name: S.String,
          language: S.String,
          status: S.String,
        }),
      ).annotate({ identifier: "DictionarySummary" });
    case 2:
      return S.Array(__S(289, __c18, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ dictionaries: __S(290, __c18, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDictionariesResponse" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/v1/feeds" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListFeedsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          id: S.String,
          name: S.String,
          association: S.optional(__S(64, __c4, 0)),
          status: S.String,
        }),
      ).annotate({ identifier: "FeedSummary" });
    case 2:
      return S.Array(__S(305, __c19, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ feeds: __S(306, __c19, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFeedsResponse" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/tags/{resourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(16, __c1, 0)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")), policy: S.String }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/v1/feed/{id}/policy" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutFeedPolicyRequest" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, values: __S(448, __c28, 0) })).annotate({
        identifier: "SearchFilter",
      });
    case 1:
      return S.Array(__S(352, __c22, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          sport: S.String,
          startDate: S.String,
          endDate: S.optional(S.String),
          filters: S.optional(__S(353, __c22, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/fixtures" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SearchFixturesRequest" });
    case 3:
      return S.Array(__S(274, __c17, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ fixtures: __S(355, __c22, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchFixturesResponse" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(16, __c1, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/tags/{resourceArn}" }),
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
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(448, __c28, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/tags/{resourceArn}" }),
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
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          name: S.optional(S.String),
          language: S.optional(S.String),
          entries: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/v1/dictionary/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateDictionaryRequest" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          accessRoleArn: S.optional(S.String),
          id: S.String.pipe(T.HttpLabel("id")),
          outputs: __S(81, __c5, 1),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/v1/feed/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateFeedRequest" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          associatedResourceName: S.String.pipe(T.IdempotencyToken()),
          outputs: __S(465, __c29, 1),
          dryRun: S.optional(S.Boolean),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/feed/{id}/associate" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "AssociateFeedRequest" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          outputConfig: __S(488, __c30, 8),
          status: S.String,
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateOutput" });
    case 1:
      return S.Array(__S(464, __c29, 0));
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, templateUris: __S(448, __c28, 0) }),
      ).annotate({ identifier: "TemplateGroup" });
    case 1:
      return S.Array(__S(480, __c30, 0));
    case 2:
      return S.suspend(() => S.Struct({ templateGroups: S.optional(__S(481, __c30, 1)) })).annotate(
        { identifier: "CroppingConfig" },
      );
    case 3:
      return S.suspend(() => S.Struct({ fixtureId: S.String })).annotate({
        identifier: "DataSourceConfiguration",
      });
    case 4:
      return S.suspend(() =>
        S.Struct({
          callbackMetadata: S.optional(S.String),
          dataSourceConfiguration: S.optional(__S(483, __c30, 3)),
        }),
      ).annotate({ identifier: "ClippingConfig" });
    case 5:
      return S.suspend(() => S.Struct({ width: S.Number, height: S.Number })).annotate({
        identifier: "AspectRatio",
      });
    case 6:
      return S.suspend(() =>
        S.Struct({
          language: S.String,
          aspectRatio: S.optional(__S(485, __c30, 5)),
          dictionary: S.optional(S.String),
          profanityFilter: S.optional(S.String),
        }),
      ).annotate({ identifier: "SubtitlingConfig" });
    case 7:
      return S.suspend(() =>
        S.Struct({
          summaryGeneration: S.optional(S.String),
          extendedAnalysis: S.optional(S.String),
        }),
      ).annotate({ identifier: "ContextualMetadataConfig" });
    case 8:
      return S.Union([
        /*@__PURE__*/ S.Struct({ cropping: __S(482, __c30, 2) }),
        /*@__PURE__*/ S.Struct({ clipping: __S(484, __c30, 4) }),
        /*@__PURE__*/ S.Struct({ subtitling: __S(486, __c30, 6) }),
        /*@__PURE__*/ S.Struct({ contextualMetadata: __S(487, __c30, 7) }),
      ]);
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ arn: S.String, id: S.String })).annotate({
        identifier: "AssociateFeedResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
