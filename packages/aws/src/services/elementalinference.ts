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

/** Span facts shared by every operation (com.distilled.telemetry#service). */
const TELEMETRY = {
  system: "aws-api",
  responseHeaders: [
    { header: "x-amzn-requestid", name: "aws.request_id" },
    { header: "x-amz-request-id", name: "aws.request_id" },
    { header: "x-amzn-request-id", name: "aws.request_id" },
    { header: "x-amz-id-2", name: "aws.extended_request_id" },
  ],
  prefix: "ElementalInference",
  service: "ElementalInference",
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
  templateGroups?: TemplateGroup[] | undefined;
}
export type ResourceDescription = string;
export type FixtureId = string;
export interface DataSourceConfiguration {
  fixtureId: string;
}
export interface ClippingConfig {
  callbackMetadata?: string | undefined;
  dataSourceConfiguration?: DataSourceConfiguration | undefined;
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
  aspectRatio?: AspectRatio | undefined;
  dictionary?: string | undefined;
  profanityFilter?: ProfanityFilterMode | undefined;
}
export type SummaryGenerationMode = "ENABLED" | "DISABLED" | (string & {});
export type ExtendedAnalysisMode = "ENABLED" | "DISABLED" | (string & {});
export type QuestionSetId = string;
export type QuestionSetVersion = string;
export interface QuestionSetReference {
  questionSetId: string;
  version: string;
}
export interface CustomQuestionsConfig {
  shot?: QuestionSetReference | undefined;
  scene?: QuestionSetReference | undefined;
}
export interface ContextualMetadataConfig {
  summaryGeneration?: SummaryGenerationMode | undefined;
  extendedAnalysis?: ExtendedAnalysisMode | undefined;
  customQuestions?: CustomQuestionsConfig | undefined;
}
export type FunctionArn = string;
export interface FixedIntervalTrigger {
  intervalSeconds: number;
}
export interface ShotTrigger {}
export interface SceneTrigger {}
export interface ClipTrigger {}
export type Trigger =
  | {
      fixedInterval: FixedIntervalTrigger;
      perShot?: undefined;
      perScene?: undefined;
      perClip?: undefined;
    }
  | { fixedInterval?: undefined; perShot: ShotTrigger; perScene?: undefined; perClip?: undefined }
  | { fixedInterval?: undefined; perShot?: undefined; perScene: SceneTrigger; perClip?: undefined }
  | { fixedInterval?: undefined; perShot?: undefined; perScene?: undefined; perClip: ClipTrigger };
export type FrameSamplingMode = "FIRST" | "UNIFORM" | "LAST" | (string & {});
export interface FrameSamplingStrategy {
  mode: FrameSamplingMode;
  count?: number | undefined;
}
export interface FrameSize {
  widthPixels: number;
  heightPixels: number;
}
export interface FrameSettings {
  frameSampling: FrameSamplingStrategy;
  frameSize?: FrameSize | undefined;
}
export interface SubtitlingSettings {
  outputName: string;
}
export interface ContextualMetadataSettings {
  outputName: string;
}
export interface ClippingSettings {
  outputName: string;
}
export interface FunctionConfig {
  functionArn: string;
  trigger: Trigger;
  frameSettings?: FrameSettings | undefined;
  subtitlingSettings?: SubtitlingSettings | undefined;
  contextualMetadataSettings?: ContextualMetadataSettings | undefined;
  clippingSettings?: ClippingSettings | undefined;
}
export type OutputConfig =
  | {
      cropping: CroppingConfig;
      clipping?: undefined;
      subtitling?: undefined;
      contextualMetadata?: undefined;
      function?: undefined;
    }
  | {
      cropping?: undefined;
      clipping: ClippingConfig;
      subtitling?: undefined;
      contextualMetadata?: undefined;
      function?: undefined;
    }
  | {
      cropping?: undefined;
      clipping?: undefined;
      subtitling: SubtitlingConfig;
      contextualMetadata?: undefined;
      function?: undefined;
    }
  | {
      cropping?: undefined;
      clipping?: undefined;
      subtitling?: undefined;
      contextualMetadata: ContextualMetadataConfig;
      function?: undefined;
    }
  | {
      cropping?: undefined;
      clipping?: undefined;
      subtitling?: undefined;
      contextualMetadata?: undefined;
      function: FunctionConfig;
    };
export type OutputStatus = "ENABLED" | "DISABLED" | (string & {});
export interface CreateOutput {
  name: string;
  outputConfig: OutputConfig;
  status: OutputStatus;
  description?: string | undefined;
}
export type CreateOutputList = CreateOutput[];
export interface AssociateFeedRequest {
  id: string;
  associatedResourceName?: string | undefined;
  outputs: CreateOutput[];
  dryRun?: boolean | undefined;
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
  entries?: string | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
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
  references?: string[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type IamRoleArn = string;
export interface CreateFeedRequest {
  name: string;
  accessRoleArn?: string | undefined;
  outputs: CreateOutput[];
  tags?: { [key: string]: string | undefined } | undefined;
}
export type StringList = string[];
export interface GetOutput {
  name: string;
  outputConfig: OutputConfig;
  status: OutputStatus;
  description?: string | undefined;
  fromAssociation?: boolean | undefined;
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
  accessRoleArn?: string | undefined;
  status: FeedStatus;
  association?: FeedAssociation | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type BedrockApi = "INVOKE_MODEL" | (string & {});
export interface BedrockFunctionTarget {
  api: BedrockApi;
  model: string;
}
export interface PassthroughFunctionTarget {}
export type FunctionTarget =
  | { bedrock: BedrockFunctionTarget; passthrough?: undefined }
  | { bedrock?: undefined; passthrough: PassthroughFunctionTarget };
export type JsonataExpression = string | redacted.Redacted<string>;
export type FunctionDescription = string | redacted.Redacted<string>;
export type EventBridgeDeliveryMode = "ENABLED" | "DISABLED" | (string & {});
export interface CreateFunctionRequest {
  name: string;
  target: FunctionTarget;
  requestExpression: string | redacted.Redacted<string>;
  responseExpression?: string | redacted.Redacted<string> | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  eventBridgeDelivery?: EventBridgeDeliveryMode | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type FunctionId = string;
export type FunctionStatus =
  | "CREATING"
  | "AVAILABLE"
  | "REFERENCED"
  | "DELETING"
  | "DELETED"
  | (string & {});
export type ContextType =
  | "FRAMES"
  | "SUBTITLES"
  | "CONTEXTUAL_METADATA"
  | "CLIP_METADATA"
  | (string & {});
export type ContextTypeList = ContextType[];
export interface CreateFunctionResponse {
  name: string;
  target: FunctionTarget;
  requestExpression: string | redacted.Redacted<string>;
  responseExpression?: string | redacted.Redacted<string> | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  eventBridgeDelivery?: EventBridgeDeliveryMode | undefined;
  arn: string;
  id: string;
  status: FunctionStatus;
  references?: string[] | undefined;
  contextTypes?: ContextType[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type QuestionName = string;
export type QuestionText = string;
export interface YesNoQuestion {
  name: string;
  question: string;
}
export type YesNoQuestionList = YesNoQuestion[];
export type OptionName = string;
export type OptionText = string;
export interface QuestionOption {
  name: string;
  text: string;
}
export type YesNoPerOptionOptionList = QuestionOption[];
export interface YesNoPerOptionQuestion {
  name: string;
  question: string;
  options: QuestionOption[];
}
export type YesNoPerOptionQuestionList = YesNoPerOptionQuestion[];
export type ChooseOneOptionList = QuestionOption[];
export interface ChooseOneQuestion {
  name: string;
  question: string;
  options: QuestionOption[];
}
export type ChooseOneQuestionList = ChooseOneQuestion[];
export interface CreateQuestionSetRequest {
  yesNo?: YesNoQuestion[] | undefined;
  yesNoPerOption?: YesNoPerOptionQuestion[] | undefined;
  chooseOne?: ChooseOneQuestion[] | undefined;
  name: string;
  tags?: { [key: string]: string | undefined } | undefined;
}
export type QuestionSetArn = string;
export type QuestionSetVersionDescription = string;
export type QuestionSetSha256 = string;
export interface CreateQuestionSetResponse {
  yesNo?: YesNoQuestion[] | undefined;
  yesNoPerOption?: YesNoPerOptionQuestion[] | undefined;
  chooseOne?: ChooseOneQuestion[] | undefined;
  arn: string;
  id: string;
  name: string;
  version: string;
  description?: string | undefined;
  latestVersion?: string | undefined;
  sha256: string;
  references?: string[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface CreateQuestionSetVersionRequest {
  id: string;
  sha256?: string | undefined;
  description?: string | undefined;
}
export interface CreateQuestionSetVersionResponse {
  yesNo?: YesNoQuestion[] | undefined;
  yesNoPerOption?: YesNoPerOptionQuestion[] | undefined;
  chooseOne?: ChooseOneQuestion[] | undefined;
  arn: string;
  id: string;
  name: string;
  version: string;
  description?: string | undefined;
  latestVersion?: string | undefined;
  sha256: string;
  references?: string[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface FixedModeScheduleActionStartSettings {
  scheduledAt: Date;
}
export type ScheduleActionStartConfiguration = {
  fixedModeScheduleActionStartSettings: FixedModeScheduleActionStartSettings;
};
export interface UpdateOutputStatus {
  outputName: string;
  status: OutputStatus;
}
export interface UpdateClippingDataSourceConfiguration {
  outputName: string;
  dataSourceConfiguration: DataSourceConfiguration;
}
export interface RemoveClippingDataSourceConfiguration {
  outputName: string;
}
export type ScheduleActionOperation =
  | {
      updateOutputStatus: UpdateOutputStatus;
      updateClippingDataSourceConfiguration?: undefined;
      removeClippingDataSourceConfiguration?: undefined;
    }
  | {
      updateOutputStatus?: undefined;
      updateClippingDataSourceConfiguration: UpdateClippingDataSourceConfiguration;
      removeClippingDataSourceConfiguration?: undefined;
    }
  | {
      updateOutputStatus?: undefined;
      updateClippingDataSourceConfiguration?: undefined;
      removeClippingDataSourceConfiguration: RemoveClippingDataSourceConfiguration;
    };
export type ScheduleActionOperations = ScheduleActionOperation[];
export interface CreateScheduleActionRequest {
  id: string;
  actionName: string;
  startConfiguration: ScheduleActionStartConfiguration;
  operations: ScheduleActionOperation[];
}
export type ScheduleActionStatus = "PENDING" | "COMPLETED" | "FAILED" | (string & {});
export type ScheduleActionErrorCode = "INVALID_ACTION_TARGET" | "INTERNAL_ERROR" | (string & {});
export interface ScheduleActionError {
  errorCode: ScheduleActionErrorCode;
  errorMessage: string;
}
export interface CreateScheduleActionResponse {
  actionName: string;
  startConfiguration: ScheduleActionStartConfiguration;
  operations: ScheduleActionOperation[];
  status: ScheduleActionStatus;
  error?: ScheduleActionError | undefined;
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
export interface DeleteFunctionRequest {
  id: string;
}
export interface DeleteFunctionResponse {
  arn: string;
  id: string;
  status: FunctionStatus;
}
export interface DeleteQuestionSetRequest {
  id: string;
}
export interface DeleteQuestionSetResponse {
  arn: string;
  id: string;
}
export type PublishedQuestionSetVersion = string;
export interface DeleteQuestionSetVersionRequest {
  id: string;
  questionSetVersion: string;
}
export interface DeleteQuestionSetVersionResponse {}
export interface DeleteScheduleActionRequest {
  id: string;
  actionName: string;
}
export interface DeleteScheduleActionResponse {
  actionName: string;
}
export interface DisassociateFeedRequest {
  id: string;
  associatedResourceName?: string | undefined;
  dryRun?: boolean | undefined;
}
export interface DisassociateFeedResponse {
  arn: string;
  id: string;
}
export interface ExportDictionaryEntriesRequest {
  id: string;
}
export interface ExportDictionaryEntriesResponse {
  entries?: string | undefined;
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
  references?: string[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
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
  accessRoleArn?: string | undefined;
  status: FeedStatus;
  association?: FeedAssociation | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
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
  name?: string | undefined;
  isHome?: boolean | undefined;
}
export type CompetitorList = Competitor[];
export interface GetFixtureResponse {
  fixtureId: string;
  name: string;
  fixtureGroup?: string | undefined;
  scheduledStart?: Date | undefined;
  status: string;
  competitors: Competitor[];
}
export interface GetFunctionRequest {
  id: string;
}
export interface GetFunctionResponse {
  name: string;
  target: FunctionTarget;
  requestExpression: string | redacted.Redacted<string>;
  responseExpression?: string | redacted.Redacted<string> | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  eventBridgeDelivery?: EventBridgeDeliveryMode | undefined;
  arn: string;
  id: string;
  status: FunctionStatus;
  references?: string[] | undefined;
  contextTypes?: ContextType[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface GetQuestionSetRequest {
  id: string;
  questionSetVersion?: string | undefined;
}
export interface GetQuestionSetResponse {
  yesNo?: YesNoQuestion[] | undefined;
  yesNoPerOption?: YesNoPerOptionQuestion[] | undefined;
  chooseOne?: ChooseOneQuestion[] | undefined;
  arn: string;
  id: string;
  name: string;
  version: string;
  description?: string | undefined;
  latestVersion?: string | undefined;
  sha256: string;
  references?: string[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface ListDictionariesRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
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
  nextToken?: string | undefined;
}
export interface ListFeedsRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface FeedSummary {
  arn: string;
  id: string;
  name: string;
  association?: FeedAssociation | undefined;
  status: FeedStatus;
}
export type FeedSummaryList = FeedSummary[];
export interface ListFeedsResponse {
  feeds: FeedSummary[];
  nextToken?: string | undefined;
}
export interface ListFunctionsRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface FunctionSummary {
  arn: string;
  id: string;
  name: string;
  description?: string | redacted.Redacted<string> | undefined;
  status: FunctionStatus;
  target?: FunctionTarget | undefined;
  contextTypes?: ContextType[] | undefined;
}
export type FunctionSummaryList = FunctionSummary[];
export interface ListFunctionsResponse {
  functions: FunctionSummary[];
  nextToken?: string | undefined;
}
export interface ListQuestionSetsRequest {
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface QuestionSetSummary {
  arn: string;
  id: string;
  name: string;
  latestVersion?: string | undefined;
}
export type QuestionSetSummaryList = QuestionSetSummary[];
export interface ListQuestionSetsResponse {
  questionSets: QuestionSetSummary[];
  nextToken?: string | undefined;
}
export interface ListQuestionSetVersionsRequest {
  id: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface QuestionSetVersionSummary {
  version: string;
  description?: string | undefined;
  sha256: string;
  lastModifiedAt: Date;
}
export type QuestionSetVersionSummaryList = QuestionSetVersionSummary[];
export interface ListQuestionSetVersionsResponse {
  versions: QuestionSetVersionSummary[];
  nextToken?: string | undefined;
}
export interface ListScheduleActionsRequest {
  id: string;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface ScheduleAction {
  actionName: string;
  startConfiguration: ScheduleActionStartConfiguration;
  operations: ScheduleActionOperation[];
  status: ScheduleActionStatus;
  error?: ScheduleActionError | undefined;
}
export type ScheduleActionList = ScheduleAction[];
export interface ListScheduleActionsResponse {
  scheduleActions: ScheduleAction[];
  nextToken?: string | undefined;
}
export type ResourceArn = string;
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined } | undefined;
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
  endDate?: string | undefined;
  filters?: SearchFilter[] | undefined;
  maxResults?: number | undefined;
  nextToken?: string | undefined;
}
export interface FixtureSummary {
  fixtureId: string;
  name: string;
  fixtureGroup?: string | undefined;
  scheduledStart?: Date | undefined;
  status: string;
  competitors: Competitor[];
}
export type FixtureSummaryList = FixtureSummary[];
export interface SearchFixturesResponse {
  fixtures: FixtureSummary[];
  nextToken?: string | undefined;
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
  name?: string | undefined;
  language?: DictionaryLanguage | undefined;
  entries?: string | undefined;
}
export interface UpdateDictionaryResponse {
  name: string;
  arn: string;
  id: string;
  language: DictionaryLanguage;
  status: DictionaryStatus;
  references?: string[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface UpdateOutput {
  name: string;
  outputConfig: OutputConfig;
  status: OutputStatus;
  description?: string | undefined;
  fromAssociation?: boolean | undefined;
}
export type UpdateOutputList = UpdateOutput[];
export interface UpdateFeedRequest {
  name: string;
  accessRoleArn?: string | undefined;
  id: string;
  outputs: UpdateOutput[];
}
export interface UpdateFeedResponse {
  arn: string;
  name: string;
  id: string;
  dataEndpoints: string[];
  outputs: GetOutput[];
  accessRoleArn?: string | undefined;
  status: FeedStatus;
  association?: FeedAssociation | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface UpdateFunctionRequest {
  id: string;
  name?: string | undefined;
  target?: FunctionTarget | undefined;
  requestExpression?: string | redacted.Redacted<string> | undefined;
  responseExpression?: string | redacted.Redacted<string> | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  eventBridgeDelivery?: EventBridgeDeliveryMode | undefined;
}
export interface UpdateFunctionResponse {
  name: string;
  target: FunctionTarget;
  requestExpression: string | redacted.Redacted<string>;
  responseExpression?: string | redacted.Redacted<string> | undefined;
  description?: string | redacted.Redacted<string> | undefined;
  eventBridgeDelivery?: EventBridgeDeliveryMode | undefined;
  arn: string;
  id: string;
  status: FunctionStatus;
  references?: string[] | undefined;
  contextTypes?: ContextType[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
}
export interface UpdateQuestionSetRequest {
  id: string;
  yesNo?: YesNoQuestion[] | undefined;
  yesNoPerOption?: YesNoPerOptionQuestion[] | undefined;
  chooseOne?: ChooseOneQuestion[] | undefined;
  name?: string | undefined;
}
export interface UpdateQuestionSetResponse {
  yesNo?: YesNoQuestion[] | undefined;
  yesNoPerOption?: YesNoPerOptionQuestion[] | undefined;
  chooseOne?: ChooseOneQuestion[] | undefined;
  arn: string;
  id: string;
  name: string;
  version: string;
  description?: string | undefined;
  latestVersion?: string | undefined;
  sha256: string;
  references?: string[] | undefined;
  tags?: { [key: string]: string | undefined } | undefined;
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
  AssociateFeedRequest & RegionInput,
  AssociateFeedResponse,
  AssociateFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(736, __c46, 0) as any as S.Schema<AssociateFeedRequest>,
  output: __S(832, __c52, 0) as any as S.Schema<AssociateFeedResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "AssociateFeed",
  telemetry: TELEMETRY,
  span: "AssociateFeed",
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
  CreateDictionaryRequest & RegionInput,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateDictionary",
  telemetry: TELEMETRY,
  span: "CreateDictionary",
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
  CreateFeedRequest & RegionInput,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFeed",
  telemetry: TELEMETRY,
  span: "CreateFeed",
}));

export type CreateFunctionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ServiceQuotaExceededException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Creates a function. A function analyzes a feed by building a request from the feed's media and metadata, optionally sending that request to an Amazon Bedrock model in your account, and publishing the result to the feed's metadata timeline.
 *
 * A function runs only after you attach it to a feed as a function output. For more information, see Using functions in the *AWS Elemental Inference User Guide*.
 */
export const createFunction: API.OperationMethod<
  CreateFunctionRequest & RegionInput,
  CreateFunctionResponse,
  CreateFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c6, 0) as any as S.Schema<CreateFunctionRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<CreateFunctionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateFunction",
  telemetry: TELEMETRY,
  span: "CreateFunction",
}));

export type CreateQuestionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ServiceQuotaExceededException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Creates a question set. Use a question set to get answers about content that's specific to your business, in addition to the built-in contextual metadata classifications. A question set contains your own questions. You ask Elemental Inference these questions about each shot or scene of the media in a contextual metadata output, and Elemental Inference answers each question with scores. To use a question set, reference it in the customQuestions property of the contextual metadata configuration of a feed output.
 *
 * CreateQuestionSet creates the question set with a DRAFT version that contains the questions in the request. To change DRAFT, use UpdateQuestionSet. To publish DRAFT as a numbered version, use CreateQuestionSetVersion. You can't change a published version.
 *
 * A question set can contain the following types of questions. You must specify at least one question.
 *
 * - yesNo - Elemental Inference answers yes or no.
 *
 * - yesNoPerOption - Elemental Inference answers yes or no for each option.
 *
 * - chooseOne - Elemental Inference chooses one of the options.
 *
 * A version can contain up to 100 scored items, where each yesNo question, each option of a yesNoPerOption question, and each chooseOne question counts as one item. The name of each question must be unique across all three types.
 */
export const createQuestionSet: API.OperationMethod<
  CreateQuestionSetRequest & RegionInput,
  CreateQuestionSetResponse,
  CreateQuestionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(144, __c9, 0) as any as S.Schema<CreateQuestionSetRequest>,
  output: __S(166, __c10, 6) as any as S.Schema<CreateQuestionSetResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQuestionSet",
  telemetry: TELEMETRY,
  span: "CreateQuestionSet",
}));

export type CreateQuestionSetVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Publishes the DRAFT version of the specified question set as a new version. The new version has the same name and questions as DRAFT, and you can't change it. DRAFT doesn't change, so you can continue to update it.
 *
 * Version numbers start at 1, and each new version has the next number. Elemental Inference never reuses a version number, even after you delete that version.
 *
 * If DRAFT hasn't changed since the latest published version, Elemental Inference doesn't create a version. Instead, it returns the latest version. A change to the name of the question set counts as a change to DRAFT.
 *
 * A question set can have a limited number of versions. If the question set already has the maximum number of versions, Elemental Inference returns ServiceQuotaExceededException. To free space for a new version, delete a version that you no longer need, or create a new question set.
 */
export const createQuestionSetVersion: API.OperationMethod<
  CreateQuestionSetVersionRequest & RegionInput,
  CreateQuestionSetVersionResponse,
  CreateQuestionSetVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c11, 0) as any as S.Schema<CreateQuestionSetVersionRequest>,
  output: __S(166, __c10, 6) as any as S.Schema<CreateQuestionSetVersionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateQuestionSetVersion",
  telemetry: TELEMETRY,
  span: "CreateQuestionSetVersion",
}));

export type CreateScheduleActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Creates a schedule action on a feed. A schedule action applies configuration changes to the feed at a time that you specify, in the same way as an UpdateFeed request.
 *
 * Elemental Inference validates the targets of the action when you create it.
 */
export const createScheduleAction: API.OperationMethod<
  CreateScheduleActionRequest & RegionInput,
  CreateScheduleActionResponse,
  CreateScheduleActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c12, 0) as any as S.Schema<CreateScheduleActionRequest>,
  output: __S(215, __c13, 7) as any as S.Schema<CreateScheduleActionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScheduleAction",
  telemetry: TELEMETRY,
  span: "CreateScheduleAction",
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
  DeleteDictionaryRequest & RegionInput,
  DeleteDictionaryResponse,
  DeleteDictionaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c14, 0) as any as S.Schema<DeleteDictionaryRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<DeleteDictionaryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteDictionary",
  telemetry: TELEMETRY,
  span: "DeleteDictionary",
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
  DeleteFeedRequest & RegionInput,
  DeleteFeedResponse,
  DeleteFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(256, __c16, 0) as any as S.Schema<DeleteFeedRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<DeleteFeedResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFeed",
  telemetry: TELEMETRY,
  span: "DeleteFeed",
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
  DeleteFeedPolicyRequest & RegionInput,
  DeleteFeedPolicyResponse,
  DeleteFeedPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(272, __c17, 0) as any as S.Schema<DeleteFeedPolicyRequest>,
  output: __S(784, __c49, 0) as any as S.Schema<DeleteFeedPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFeedPolicy",
  telemetry: TELEMETRY,
  span: "DeleteFeedPolicy",
}));

export type DeleteFunctionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a function. If any feed still references the function, the operation returns a ConflictException. A disabled function output still references the function. Use GetFunction to find those feeds, then remove the function output from each one with UpdateFeed, or delete the feed, before retrying.
 *
 * Deleting a function doesn't delete the metadata that it has already produced.
 */
export const deleteFunction: API.OperationMethod<
  DeleteFunctionRequest & RegionInput,
  DeleteFunctionResponse,
  DeleteFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(288, __c18, 0) as any as S.Schema<DeleteFunctionRequest>,
  output: __S(240, __c15, 0) as any as S.Schema<DeleteFunctionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteFunction",
  telemetry: TELEMETRY,
  span: "DeleteFunction",
}));

export type DeleteQuestionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified question set, including its DRAFT version and all its published versions. You can't delete a question set while any feed references any of its versions, including an archived feed. You must first remove the question set from the customQuestions configuration of each feed output that references it, or delete those feeds.
 */
export const deleteQuestionSet: API.OperationMethod<
  DeleteQuestionSetRequest & RegionInput,
  DeleteQuestionSetResponse,
  DeleteQuestionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(304, __c19, 0) as any as S.Schema<DeleteQuestionSetRequest>,
  output: __S(832, __c52, 0) as any as S.Schema<DeleteQuestionSetResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQuestionSet",
  telemetry: TELEMETRY,
  span: "DeleteQuestionSet",
}));

export type DeleteQuestionSetVersionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a published version of the specified question set. You can't delete a version while a feed references it, including an archived feed. You can't restore a deleted version, and Elemental Inference doesn't reuse its number.
 *
 * You can't delete the DRAFT version on its own. To delete DRAFT, delete the question set by using DeleteQuestionSet.
 *
 * Deleting a version doesn't change the latestVersion of the question set, even if you delete the highest version.
 */
export const deleteQuestionSetVersion: API.OperationMethod<
  DeleteQuestionSetVersionRequest & RegionInput,
  DeleteQuestionSetVersionResponse,
  DeleteQuestionSetVersionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(320, __c20, 0) as any as S.Schema<DeleteQuestionSetVersionRequest>,
  output: __S(784, __c49, 0) as any as S.Schema<DeleteQuestionSetVersionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteQuestionSetVersion",
  telemetry: TELEMETRY,
  span: "DeleteQuestionSetVersion",
}));

export type DeleteScheduleActionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a schedule action from a feed. A deleted action never runs.
 *
 * You can delete only an action whose status is PENDING. Deleting an action doesn't reverse changes that the action already made to the feed. When you delete or archive a feed, Elemental Inference deletes all the schedule actions on that feed.
 */
export const deleteScheduleAction: API.OperationMethod<
  DeleteScheduleActionRequest & RegionInput,
  DeleteScheduleActionResponse,
  DeleteScheduleActionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(336, __c21, 0) as any as S.Schema<DeleteScheduleActionRequest>,
  output: __S(337, __c21, 1) as any as S.Schema<DeleteScheduleActionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduleAction",
  telemetry: TELEMETRY,
  span: "DeleteScheduleAction",
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
  DisassociateFeedRequest & RegionInput,
  DisassociateFeedResponse,
  DisassociateFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(352, __c22, 0) as any as S.Schema<DisassociateFeedRequest>,
  output: __S(832, __c52, 0) as any as S.Schema<DisassociateFeedResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DisassociateFeed",
  telemetry: TELEMETRY,
  span: "DisassociateFeed",
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
  ExportDictionaryEntriesRequest & RegionInput,
  ExportDictionaryEntriesResponse,
  ExportDictionaryEntriesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(368, __c23, 0) as any as S.Schema<ExportDictionaryEntriesRequest>,
  output: __S(369, __c23, 1) as any as S.Schema<ExportDictionaryEntriesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ExportDictionaryEntries",
  telemetry: TELEMETRY,
  span: "ExportDictionaryEntries",
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
  GetDictionaryRequest & RegionInput,
  GetDictionaryResponse,
  GetDictionaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(384, __c24, 0) as any as S.Schema<GetDictionaryRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<GetDictionaryResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetDictionary",
  telemetry: TELEMETRY,
  span: "GetDictionary",
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
  GetFeedRequest & RegionInput,
  GetFeedResponse,
  GetFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(400, __c25, 0) as any as S.Schema<GetFeedRequest>,
  output: __S(82, __c5, 2) as any as S.Schema<GetFeedResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFeed",
  telemetry: TELEMETRY,
  span: "GetFeed",
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
  GetFeedPolicyRequest & RegionInput,
  GetFeedPolicyResponse,
  GetFeedPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(416, __c26, 0) as any as S.Schema<GetFeedPolicyRequest>,
  output: __S(417, __c26, 1) as any as S.Schema<GetFeedPolicyResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFeedPolicy",
  telemetry: TELEMETRY,
  span: "GetFeedPolicy",
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
  GetFixtureRequest & RegionInput,
  GetFixtureResponse,
  GetFixtureError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(432, __c27, 0) as any as S.Schema<GetFixtureRequest>,
  output: __S(450, __c28, 2) as any as S.Schema<GetFixtureResponse>,
  errors: [
    AccessDeniedException,
    GatewayTimedOutException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceUnavailableException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFixture",
  telemetry: TELEMETRY,
  span: "GetFixture",
}));

export type GetFunctionError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the details of a function, including its expressions, the media context that Elemental Inference derived from the request expression, and the feeds that currently reference it.
 */
export const getFunction: API.OperationMethod<
  GetFunctionRequest & RegionInput,
  GetFunctionResponse,
  GetFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(464, __c29, 0) as any as S.Schema<GetFunctionRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<GetFunctionResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetFunction",
  telemetry: TELEMETRY,
  span: "GetFunction",
}));

export type GetQuestionSetError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves information about the specified question set at one version. By default, GetQuestionSet returns the DRAFT version. To retrieve a published version, specify questionSetVersion.
 */
export const getQuestionSet: API.OperationMethod<
  GetQuestionSetRequest & RegionInput,
  GetQuestionSetResponse,
  GetQuestionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(480, __c30, 0) as any as S.Schema<GetQuestionSetRequest>,
  output: __S(166, __c10, 6) as any as S.Schema<GetQuestionSetResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetQuestionSet",
  telemetry: TELEMETRY,
  span: "GetQuestionSet",
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
  ListDictionariesRequest & RegionInput,
  ListDictionariesResponse,
  ListDictionariesError,
  Credentials | HttpClient.HttpClient,
  DictionarySummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(496, __c31, 0) as any as S.Schema<ListDictionariesRequest>,
  output: __S(499, __c31, 3) as any as S.Schema<ListDictionariesResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDictionaries",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "dictionaries",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListDictionaries",
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
  ListFeedsRequest & RegionInput,
  ListFeedsResponse,
  ListFeedsError,
  Credentials | HttpClient.HttpClient,
  FeedSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(512, __c32, 0) as any as S.Schema<ListFeedsRequest>,
  output: __S(515, __c32, 3) as any as S.Schema<ListFeedsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFeeds",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "feeds",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFeeds",
})) as any;

export type ListFunctionsError =
  | AccessDeniedException
  | InternalServerErrorException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Lists the functions in this account, in this Region. Each entry is a summary. To get the expressions of a function, use GetFunction.
 */
export const listFunctions: API.PaginatedOperationMethod<
  ListFunctionsRequest & RegionInput,
  ListFunctionsResponse,
  ListFunctionsError,
  Credentials | HttpClient.HttpClient,
  FunctionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(528, __c33, 0) as any as S.Schema<ListFunctionsRequest>,
  output: __S(531, __c33, 3) as any as S.Schema<ListFunctionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListFunctions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "functions",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListFunctions",
})) as any;

export type ListQuestionSetsError =
  | AccessDeniedException
  | InternalServerErrorException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Lists the question sets in your account. The response doesn't include the questions in each question set. To retrieve them, use GetQuestionSet.
 */
export const listQuestionSets: API.PaginatedOperationMethod<
  ListQuestionSetsRequest & RegionInput,
  ListQuestionSetsResponse,
  ListQuestionSetsError,
  Credentials | HttpClient.HttpClient,
  QuestionSetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(544, __c34, 0) as any as S.Schema<ListQuestionSetsRequest>,
  output: __S(547, __c34, 3) as any as S.Schema<ListQuestionSetsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQuestionSets",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "questionSets",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListQuestionSets",
})) as any;

export type ListQuestionSetVersionsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Lists the versions of the specified question set. The list starts with the DRAFT version, followed by the published versions from the highest version number to the lowest. The list doesn't include deleted versions.
 *
 * The response doesn't include the questions in each version. To retrieve them, use GetQuestionSet and specify questionSetVersion.
 */
export const listQuestionSetVersions: API.PaginatedOperationMethod<
  ListQuestionSetVersionsRequest & RegionInput,
  ListQuestionSetVersionsResponse,
  ListQuestionSetVersionsError,
  Credentials | HttpClient.HttpClient,
  QuestionSetVersionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(560, __c35, 0) as any as S.Schema<ListQuestionSetVersionsRequest>,
  output: __S(563, __c35, 3) as any as S.Schema<ListQuestionSetVersionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListQuestionSetVersions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "versions",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListQuestionSetVersions",
})) as any;

export type ListScheduleActionsError =
  | AccessDeniedException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Displays a list of the schedule actions on a feed, including the status of each action and, for a failed action, information about why it failed.
 *
 * Elemental Inference keeps an action whose status is COMPLETED or FAILED for about 48 hours after its scheduled time, and then deletes it automatically.
 */
export const listScheduleActions: API.PaginatedOperationMethod<
  ListScheduleActionsRequest & RegionInput,
  ListScheduleActionsResponse,
  ListScheduleActionsError,
  Credentials | HttpClient.HttpClient,
  ScheduleAction
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(576, __c36, 0) as any as S.Schema<ListScheduleActionsRequest>,
  output: __S(578, __c36, 2) as any as S.Schema<ListScheduleActionsResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScheduleActions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "scheduleActions",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "ListScheduleActions",
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
  ListTagsForResourceRequest & RegionInput,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(592, __c37, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(593, __c37, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
  telemetry: TELEMETRY,
  span: "ListTagsForResource",
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
  PutFeedPolicyRequest & RegionInput,
  PutFeedPolicyResponse,
  PutFeedPolicyError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(608, __c38, 0) as any as S.Schema<PutFeedPolicyRequest>,
  output: __S(784, __c49, 0) as any as S.Schema<PutFeedPolicyResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutFeedPolicy",
  telemetry: TELEMETRY,
  span: "PutFeedPolicy",
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
  SearchFixturesRequest & RegionInput,
  SearchFixturesResponse,
  SearchFixturesError,
  Credentials | HttpClient.HttpClient,
  FixtureSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(626, __c39, 2) as any as S.Schema<SearchFixturesRequest>,
  output: __S(628, __c39, 4) as any as S.Schema<SearchFixturesResponse>,
  errors: [
    AccessDeniedException,
    GatewayTimedOutException,
    InternalServerErrorException,
    ServiceUnavailableException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchFixtures",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "fixtures",
    pageSize: "maxResults",
  } as const,
  telemetry: TELEMETRY,
  span: "SearchFixtures",
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
  TagResourceRequest & RegionInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(640, __c40, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(784, __c49, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
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
  UntagResourceRequest & RegionInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(656, __c41, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(784, __c49, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
  telemetry: TELEMETRY,
  span: "UntagResource",
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
  UpdateDictionaryRequest & RegionInput,
  UpdateDictionaryResponse,
  UpdateDictionaryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(672, __c42, 0) as any as S.Schema<UpdateDictionaryRequest>,
  output: __S(32, __c2, 0) as any as S.Schema<UpdateDictionaryResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateDictionary",
  telemetry: TELEMETRY,
  span: "UpdateDictionary",
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
  UpdateFeedRequest & RegionInput,
  UpdateFeedResponse,
  UpdateFeedError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(688, __c43, 0) as any as S.Schema<UpdateFeedRequest>,
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
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFeed",
  telemetry: TELEMETRY,
  span: "UpdateFeed",
}));

export type UpdateFunctionError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Updates a function. Include only the parameters that you want to change; parameters that you don't include aren't affected. Elemental Inference validates the updated expressions in the same way as CreateFunction.
 *
 * While a feed references the function, you can change only its expressions and its description, and you can set eventBridgeDelivery to DISABLED but not to ENABLED. The request expression must keep referencing the same media context, as reported in contextTypes. Changing an expression changes the behavior of every feed that references the function.
 */
export const updateFunction: API.OperationMethod<
  UpdateFunctionRequest & RegionInput,
  UpdateFunctionResponse,
  UpdateFunctionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(704, __c44, 0) as any as S.Schema<UpdateFunctionRequest>,
  output: __S(128, __c8, 0) as any as S.Schema<UpdateFunctionResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateFunction",
  telemetry: TELEMETRY,
  span: "UpdateFunction",
}));

export type UpdateQuestionSetError =
  | AccessDeniedException
  | ConflictException
  | InternalServerErrorException
  | ResourceNotFoundException
  | TooManyRequestException
  | ValidationException
  | CommonErrors;
/**
 * Updates the DRAFT version of the specified question set. UpdateQuestionSet doesn't create a version and doesn't change published versions. To publish the updated DRAFT as a new version, use CreateQuestionSetVersion.
 *
 * UpdateQuestionSet replaces questions one type at a time. For each of yesNo, yesNoPerOption, and chooseOne: if you omit the array, DRAFT keeps its questions of that type. If you include the array, it replaces all the questions of that type in DRAFT. If you include an empty array, DRAFT no longer has questions of that type. The updated DRAFT must follow the same rules as in CreateQuestionSet, and Elemental Inference applies those rules to the questions that DRAFT keeps as well as to the questions in the request.
 *
 * Feeds that reference the DRAFT version use the updated questions. To make sure that the questions for a feed don't change, reference a published version instead.
 */
export const updateQuestionSet: API.OperationMethod<
  UpdateQuestionSetRequest & RegionInput,
  UpdateQuestionSetResponse,
  UpdateQuestionSetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(720, __c45, 0) as any as S.Schema<UpdateQuestionSetRequest>,
  output: __S(166, __c10, 6) as any as S.Schema<UpdateQuestionSetResponse>,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  serviceErrors: AwsServiceErrors,
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateQuestionSet",
  telemetry: TELEMETRY,
  span: "UpdateQuestionSet",
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
          references: S.optional(__S(752, __c47, 0)),
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
          outputs: __S(769, __c48, 1),
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
          outputConfig: __S(831, __c51, 15),
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
          dataEndpoints: __S(752, __c47, 0),
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
        S.Struct({
          name: S.String,
          target: __S(113, __c7, 1),
          requestExpression: SensitiveString,
          responseExpression: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          eventBridgeDelivery: S.optional(S.String),
          tags: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/function" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateFunctionRequest" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ api: S.String, model: S.String })).annotate({
        identifier: "BedrockFunctionTarget",
      });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ bedrock: __S(112, __c7, 0) }),
        /*@__PURE__*/ S.Struct({ passthrough: __S(784, __c49, 0) }),
      ]);
    case 2:
      return S.Array(S.String);
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          target: __S(113, __c7, 1),
          requestExpression: SensitiveString,
          responseExpression: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          eventBridgeDelivery: S.optional(S.String),
          arn: S.String,
          id: S.String,
          status: S.String,
          references: S.optional(__S(752, __c47, 0)),
          contextTypes: S.optional(__S(114, __c7, 2)),
          tags: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "CreateFunctionResponse" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          yesNo: S.optional(__S(161, __c10, 1)),
          yesNoPerOption: S.optional(__S(165, __c10, 5)),
          chooseOne: S.optional(__S(165, __c10, 5)),
          name: S.String,
          tags: S.optional(__S(16, __c1, 0)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/question-set" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateQuestionSetRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, question: S.String })).annotate({
        identifier: "YesNoQuestion",
      });
    case 1:
      return S.Array(__S(160, __c10, 0));
    case 2:
      return S.suspend(() => S.Struct({ name: S.String, text: S.String })).annotate({
        identifier: "QuestionOption",
      });
    case 3:
      return S.Array(__S(162, __c10, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ name: S.String, question: S.String, options: __S(163, __c10, 3) }),
      ).annotate({ identifier: "YesNoPerOptionQuestion" });
    case 5:
      return S.Array(__S(164, __c10, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({
          yesNo: S.optional(__S(161, __c10, 1)),
          yesNoPerOption: S.optional(__S(165, __c10, 5)),
          chooseOne: S.optional(__S(165, __c10, 5)),
          arn: S.String,
          id: S.String,
          name: S.String,
          version: S.String,
          description: S.optional(S.String),
          latestVersion: S.optional(S.String),
          sha256: S.String,
          references: S.optional(__S(752, __c47, 0)),
          tags: S.optional(__S(16, __c1, 0)),
        }),
      ).annotate({ identifier: "CreateQuestionSetResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          sha256: S.optional(S.String),
          description: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/question-set/{id}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateQuestionSetVersionRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          actionName: S.String,
          startConfiguration: __S(209, __c13, 1),
          operations: __S(213, __c13, 5),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/v1/feed/{id}/schedule-actions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateScheduleActionRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ scheduledAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")) }),
      ).annotate({ identifier: "FixedModeScheduleActionStartSettings" });
    case 1:
      return S.Union([
        /*@__PURE__*/ S.Struct({ fixedModeScheduleActionStartSettings: __S(208, __c13, 0) }),
      ]);
    case 2:
      return S.suspend(() => S.Struct({ outputName: S.String, status: S.String })).annotate({
        identifier: "UpdateOutputStatus",
      });
    case 3:
      return S.suspend(() =>
        S.Struct({ outputName: S.String, dataSourceConfiguration: __S(800, __c50, 0) }),
      ).annotate({ identifier: "UpdateClippingDataSourceConfiguration" });
    case 4:
      return S.Union([
        /*@__PURE__*/ S.Struct({ updateOutputStatus: __S(210, __c13, 2) }),
        /*@__PURE__*/ S.Struct({ updateClippingDataSourceConfiguration: __S(211, __c13, 3) }),
        /*@__PURE__*/ S.Struct({ removeClippingDataSourceConfiguration: __S(801, __c50, 1) }),
      ]);
    case 5:
      return S.Array(__S(212, __c13, 4));
    case 6:
      return S.suspend(() => S.Struct({ errorCode: S.String, errorMessage: S.String })).annotate({
        identifier: "ScheduleActionError",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({
          actionName: S.String,
          startConfiguration: __S(209, __c13, 1),
          operations: __S(213, __c13, 5),
          status: S.String,
          error: S.optional(__S(214, __c13, 6)),
        }),
      ).annotate({ identifier: "CreateScheduleActionResponse" });
  }
}
function __c14(j: number): any {
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
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ arn: S.String, id: S.String, status: S.String })).annotate({
        identifier: "DeleteDictionaryResponse",
      });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(T.Http({ method: "DELETE", uri: "/v1/feed/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteFeedRequest" });
  }
}
function __c17(j: number): any {
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
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/function/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteFunctionRequest" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/question-set/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteQuestionSetRequest" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          questionSetVersion: S.String.pipe(T.HttpLabel("questionSetVersion")),
        }).pipe(
          T.all(
            T.Http({
              method: "DELETE",
              uri: "/v1/question-set/{id}/versions/{questionSetVersion}",
            }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteQuestionSetVersionRequest" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          actionName: S.String.pipe(T.HttpQuery("actionName")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/v1/feed/{id}/schedule-actions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteScheduleActionRequest" });
    case 1:
      return S.suspend(() => S.Struct({ actionName: S.String })).annotate({
        identifier: "DeleteScheduleActionResponse",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          associatedResourceName: S.optional(S.String).pipe(T.IdempotencyToken()),
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
function __c23(j: number): any {
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
function __c24(j: number): any {
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
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/feed/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetFeedRequest" });
  }
}
function __c26(j: number): any {
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
function __c27(j: number): any {
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
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.optional(S.String), isHome: S.optional(S.Boolean) }),
      ).annotate({ identifier: "Competitor" });
    case 1:
      return S.Array(__S(448, __c28, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          fixtureId: S.String,
          name: S.String,
          fixtureGroup: S.optional(S.String),
          scheduledStart: S.optional(T.DateFromString.pipe(T.TimestampFormat("date-time"))),
          status: S.String,
          competitors: __S(449, __c28, 1),
        }),
      ).annotate({ identifier: "GetFixtureResponse" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/function/{id}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetFunctionRequest" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          questionSetVersion: S.optional(S.String).pipe(T.HttpQuery("questionSetVersion")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/question-set/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetQuestionSetRequest" });
  }
}
function __c31(j: number): any {
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
      return S.Array(__S(497, __c31, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ dictionaries: __S(498, __c31, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListDictionariesResponse" });
  }
}
function __c32(j: number): any {
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
      return S.Array(__S(513, __c32, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ feeds: __S(514, __c32, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFeedsResponse" });
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/functions" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListFunctionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          id: S.String,
          name: S.String,
          description: S.optional(SensitiveString),
          status: S.String,
          target: S.optional(__S(113, __c7, 1)),
          contextTypes: S.optional(__S(114, __c7, 2)),
        }),
      ).annotate({ identifier: "FunctionSummary" });
    case 2:
      return S.Array(__S(529, __c33, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ functions: __S(530, __c33, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListFunctionsResponse" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/v1/question-sets" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListQuestionSetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          arn: S.String,
          id: S.String,
          name: S.String,
          latestVersion: S.optional(S.String),
        }),
      ).annotate({ identifier: "QuestionSetSummary" });
    case 2:
      return S.Array(__S(545, __c34, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ questionSets: __S(546, __c34, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListQuestionSetsResponse" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/question-set/{id}/versions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListQuestionSetVersionsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          version: S.String,
          description: S.optional(S.String),
          sha256: S.String,
          lastModifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "QuestionSetVersionSummary" });
    case 2:
      return S.Array(__S(561, __c35, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ versions: __S(562, __c35, 2), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListQuestionSetVersionsResponse" });
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/v1/feed/{id}/schedule-actions" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListScheduleActionsRequest" });
    case 1:
      return S.Array(__S(215, __c13, 7));
    case 2:
      return S.suspend(() =>
        S.Struct({ scheduleActions: __S(577, __c36, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListScheduleActionsResponse" });
  }
}
function __c37(j: number): any {
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
function __c38(j: number): any {
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
function __c39(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ name: S.String, values: __S(752, __c47, 0) })).annotate({
        identifier: "SearchFilter",
      });
    case 1:
      return S.Array(__S(624, __c39, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          sport: S.String,
          startDate: S.String,
          endDate: S.optional(S.String),
          filters: S.optional(__S(625, __c39, 1)),
          maxResults: S.optional(S.Number),
          nextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/v1/fixtures" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SearchFixturesRequest" });
    case 3:
      return S.Array(__S(450, __c28, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ fixtures: __S(627, __c39, 3), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "SearchFixturesResponse" });
  }
}
function __c40(j: number): any {
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
function __c41(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(752, __c47, 0).pipe(T.HttpQuery("tagKeys")),
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
function __c42(j: number): any {
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
function __c43(j: number): any {
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
function __c44(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          name: S.optional(S.String),
          target: S.optional(__S(113, __c7, 1)),
          requestExpression: S.optional(SensitiveString),
          responseExpression: S.optional(SensitiveString),
          description: S.optional(SensitiveString),
          eventBridgeDelivery: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/v1/function/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateFunctionRequest" });
  }
}
function __c45(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          yesNo: S.optional(__S(161, __c10, 1)),
          yesNoPerOption: S.optional(__S(165, __c10, 5)),
          chooseOne: S.optional(__S(165, __c10, 5)),
          name: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/v1/question-set/{id}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateQuestionSetRequest" });
  }
}
function __c46(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          id: S.String.pipe(T.HttpLabel("id")),
          associatedResourceName: S.optional(S.String).pipe(T.IdempotencyToken()),
          outputs: __S(769, __c48, 1),
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
function __c47(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c48(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          name: S.String,
          outputConfig: __S(831, __c51, 15),
          status: S.String,
          description: S.optional(S.String),
        }),
      ).annotate({ identifier: "CreateOutput" });
    case 1:
      return S.Array(__S(768, __c48, 0));
  }
}
function __c49(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "ShotTrigger" });
  }
}
function __c50(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ fixtureId: S.String })).annotate({
        identifier: "DataSourceConfiguration",
      });
    case 1:
      return S.suspend(() => S.Struct({ outputName: S.String })).annotate({
        identifier: "SubtitlingSettings",
      });
  }
}
function __c51(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ name: S.String, templateUris: __S(752, __c47, 0) }),
      ).annotate({ identifier: "TemplateGroup" });
    case 1:
      return S.Array(__S(816, __c51, 0));
    case 2:
      return S.suspend(() => S.Struct({ templateGroups: S.optional(__S(817, __c51, 1)) })).annotate(
        { identifier: "CroppingConfig" },
      );
    case 3:
      return S.suspend(() =>
        S.Struct({
          callbackMetadata: S.optional(S.String),
          dataSourceConfiguration: S.optional(__S(800, __c50, 0)),
        }),
      ).annotate({ identifier: "ClippingConfig" });
    case 4:
      return S.suspend(() => S.Struct({ width: S.Number, height: S.Number })).annotate({
        identifier: "AspectRatio",
      });
    case 5:
      return S.suspend(() =>
        S.Struct({
          language: S.String,
          aspectRatio: S.optional(__S(820, __c51, 4)),
          dictionary: S.optional(S.String),
          profanityFilter: S.optional(S.String),
        }),
      ).annotate({ identifier: "SubtitlingConfig" });
    case 6:
      return S.suspend(() => S.Struct({ questionSetId: S.String, version: S.String })).annotate({
        identifier: "QuestionSetReference",
      });
    case 7:
      return S.suspend(() =>
        S.Struct({ shot: S.optional(__S(822, __c51, 6)), scene: S.optional(__S(822, __c51, 6)) }),
      ).annotate({ identifier: "CustomQuestionsConfig" });
    case 8:
      return S.suspend(() =>
        S.Struct({
          summaryGeneration: S.optional(S.String),
          extendedAnalysis: S.optional(S.String),
          customQuestions: S.optional(__S(823, __c51, 7)),
        }),
      ).annotate({ identifier: "ContextualMetadataConfig" });
    case 9:
      return S.suspend(() => S.Struct({ intervalSeconds: S.Number })).annotate({
        identifier: "FixedIntervalTrigger",
      });
    case 10:
      return S.Union([
        /*@__PURE__*/ S.Struct({ fixedInterval: __S(825, __c51, 9) }),
        /*@__PURE__*/ S.Struct({ perShot: __S(784, __c49, 0) }),
        /*@__PURE__*/ S.Struct({ perScene: __S(784, __c49, 0) }),
        /*@__PURE__*/ S.Struct({ perClip: __S(784, __c49, 0) }),
      ]);
    case 11:
      return S.suspend(() => S.Struct({ mode: S.String, count: S.optional(S.Number) })).annotate({
        identifier: "FrameSamplingStrategy",
      });
    case 12:
      return S.suspend(() => S.Struct({ widthPixels: S.Number, heightPixels: S.Number })).annotate({
        identifier: "FrameSize",
      });
    case 13:
      return S.suspend(() =>
        S.Struct({
          frameSampling: __S(827, __c51, 11),
          frameSize: S.optional(__S(828, __c51, 12)),
        }),
      ).annotate({ identifier: "FrameSettings" });
    case 14:
      return S.suspend(() =>
        S.Struct({
          functionArn: S.String,
          trigger: __S(826, __c51, 10),
          frameSettings: S.optional(__S(829, __c51, 13)),
          subtitlingSettings: S.optional(__S(801, __c50, 1)),
          contextualMetadataSettings: S.optional(__S(801, __c50, 1)),
          clippingSettings: S.optional(__S(801, __c50, 1)),
        }),
      ).annotate({ identifier: "FunctionConfig" });
    case 15:
      return S.Union([
        /*@__PURE__*/ S.Struct({ cropping: __S(818, __c51, 2) }),
        /*@__PURE__*/ S.Struct({ clipping: __S(819, __c51, 3) }),
        /*@__PURE__*/ S.Struct({ subtitling: __S(821, __c51, 5) }),
        /*@__PURE__*/ S.Struct({ contextualMetadata: __S(824, __c51, 8) }),
        /*@__PURE__*/ S.Struct({ function: __S(830, __c51, 14) }),
      ]);
  }
}
function __c52(j: number): any {
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
