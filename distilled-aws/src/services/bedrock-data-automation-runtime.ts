import * as HttpClient from "effect/unstable/http/HttpClient";
import * as effect from "effect/Effect";
import * as redacted from "effect/Redacted";
import * as S from "effect/Schema";
import * as stream from "effect/Stream";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { Credentials } from "../credentials.ts";
import type { CommonErrors } from "../errors.ts";
import type { Region } from "../region.ts";
import { SensitiveString, SensitiveBlob } from "../sensitive.ts";
const svc = T.AwsApiService({
  sdkId: "Bedrock Data Automation Runtime",
  serviceShapeName: "AmazonBedrockKeystoneRuntimeService",
});
const auth = T.AwsAuthSigv4({ name: "bedrock" });
const ver = T.ServiceVersion("2024-06-13");
const proto = T.AwsProtocolsAwsJson1_1();
const rules = T.EndpointResolver((p, _) => {
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
              `https://bedrock-data-automation-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://bedrock-data-automation-runtime-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err(
            "FIPS is enabled but this partition does not support FIPS",
          );
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://bedrock-data-automation-runtime.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "DualStack is enabled but this partition does not support DualStack",
          );
        }
        return e(
          `https://bedrock-data-automation-runtime.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
});

//# Newtypes
export type S3Uri = string;
export type DataAutomationArn = string;
export type BlueprintArn = string;
export type BlueprintVersion = string;
export type DataAutomationProfileArn = string;
export type KMSKeyId = string;
export type EncryptionContextKey = string;
export type EncryptionContextValue = string;
export type NonBlankString = string;
export type TaggableResourceArn = string;
export type TagKey = string;
export type TagValue = string;
export type IdempotencyToken = string;
export type InvocationArn = string;

//# Schemas
export interface SyncInputConfiguration {
  bytes?: Uint8Array;
  s3Uri?: string;
}
export const SyncInputConfiguration = S.suspend(() =>
  S.Struct({ bytes: S.optional(T.Blob), s3Uri: S.optional(S.String) }),
).annotate({
  identifier: "SyncInputConfiguration",
}) as any as S.Schema<SyncInputConfiguration>;
export type DataAutomationStage = "LIVE" | "DEVELOPMENT" | (string & {});
export const DataAutomationStage = S.String;
export interface DataAutomationConfiguration {
  dataAutomationProjectArn: string;
  stage?: DataAutomationStage;
}
export const DataAutomationConfiguration = S.suspend(() =>
  S.Struct({
    dataAutomationProjectArn: S.String,
    stage: S.optional(DataAutomationStage),
  }),
).annotate({
  identifier: "DataAutomationConfiguration",
}) as any as S.Schema<DataAutomationConfiguration>;
export type BlueprintStage = "DEVELOPMENT" | "LIVE" | (string & {});
export const BlueprintStage = S.String;
export interface Blueprint {
  blueprintArn: string;
  version?: string;
  stage?: BlueprintStage;
}
export const Blueprint = S.suspend(() =>
  S.Struct({
    blueprintArn: S.String,
    version: S.optional(S.String),
    stage: S.optional(BlueprintStage),
  }),
).annotate({ identifier: "Blueprint" }) as any as S.Schema<Blueprint>;
export type BlueprintList = Blueprint[];
export const BlueprintList = S.Array(Blueprint);
export type EncryptionContextMap = { [key: string]: string | undefined };
export const EncryptionContextMap = S.Record(
  S.String,
  S.String.pipe(S.optional),
);
export interface EncryptionConfiguration {
  kmsKeyId: string;
  kmsEncryptionContext?: { [key: string]: string | undefined };
}
export const EncryptionConfiguration = S.suspend(() =>
  S.Struct({
    kmsKeyId: S.String,
    kmsEncryptionContext: S.optional(EncryptionContextMap),
  }),
).annotate({
  identifier: "EncryptionConfiguration",
}) as any as S.Schema<EncryptionConfiguration>;
export interface InvokeDataAutomationRequest {
  inputConfiguration: SyncInputConfiguration;
  dataAutomationConfiguration?: DataAutomationConfiguration;
  blueprints?: Blueprint[];
  dataAutomationProfileArn: string;
  encryptionConfiguration?: EncryptionConfiguration;
}
export const InvokeDataAutomationRequest = S.suspend(() =>
  S.Struct({
    inputConfiguration: SyncInputConfiguration,
    dataAutomationConfiguration: S.optional(DataAutomationConfiguration),
    blueprints: S.optional(BlueprintList),
    dataAutomationProfileArn: S.String,
    encryptionConfiguration: S.optional(EncryptionConfiguration),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "InvokeDataAutomationRequest",
}) as any as S.Schema<InvokeDataAutomationRequest>;
export type SemanticModality =
  | "DOCUMENT"
  | "IMAGE"
  | "AUDIO"
  | "VIDEO"
  | (string & {});
export const SemanticModality = S.String;
export type CustomOutputStatus = "MATCH" | "NO_MATCH" | (string & {});
export const CustomOutputStatus = S.String;
export interface OutputSegment {
  customOutputStatus?: CustomOutputStatus;
  customOutput?: string;
  standardOutput?: string;
}
export const OutputSegment = S.suspend(() =>
  S.Struct({
    customOutputStatus: S.optional(CustomOutputStatus),
    customOutput: S.optional(S.String),
    standardOutput: S.optional(S.String),
  }),
).annotate({ identifier: "OutputSegment" }) as any as S.Schema<OutputSegment>;
export type OutputSegmentList = OutputSegment[];
export const OutputSegmentList = S.Array(OutputSegment);
export interface InvokeDataAutomationResponse {
  semanticModality: SemanticModality;
  outputSegments: OutputSegment[];
}
export const InvokeDataAutomationResponse = S.suspend(() =>
  S.Struct({
    semanticModality: SemanticModality,
    outputSegments: OutputSegmentList,
  }),
).annotate({
  identifier: "InvokeDataAutomationResponse",
}) as any as S.Schema<InvokeDataAutomationResponse>;
export interface ListTagsForResourceRequest {
  resourceARN: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
  S.Struct({ resourceARN: S.String }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export interface Tag {
  key: string;
  value: string;
}
export const Tag = S.suspend(() =>
  S.Struct({ key: S.String, value: S.String }),
).annotate({ identifier: "Tag" }) as any as S.Schema<Tag>;
export type TagList = Tag[];
export const TagList = S.Array(Tag);
export interface ListTagsForResourceResponse {
  tags?: Tag[];
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(TagList) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  resourceARN: string;
  tags: Tag[];
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({ resourceARN: S.String, tags: TagList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "TagResourceRequest",
}) as any as S.Schema<TagResourceRequest>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceRequest {
  resourceARN: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({ resourceARN: S.String, tagKeys: TagKeyList }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface TimestampSegment {
  startTimeMillis: number;
  endTimeMillis: number;
}
export const TimestampSegment = S.suspend(() =>
  S.Struct({ startTimeMillis: S.Number, endTimeMillis: S.Number }),
).annotate({
  identifier: "TimestampSegment",
}) as any as S.Schema<TimestampSegment>;
export type VideoSegmentConfiguration = { timestampSegment: TimestampSegment };
export const VideoSegmentConfiguration = S.Union([
  S.Struct({ timestampSegment: TimestampSegment }),
]);
export interface VideoAssetProcessingConfiguration {
  segmentConfiguration?: VideoSegmentConfiguration;
}
export const VideoAssetProcessingConfiguration = S.suspend(() =>
  S.Struct({ segmentConfiguration: S.optional(VideoSegmentConfiguration) }),
).annotate({
  identifier: "VideoAssetProcessingConfiguration",
}) as any as S.Schema<VideoAssetProcessingConfiguration>;
export interface AssetProcessingConfiguration {
  video?: VideoAssetProcessingConfiguration;
}
export const AssetProcessingConfiguration = S.suspend(() =>
  S.Struct({ video: S.optional(VideoAssetProcessingConfiguration) }),
).annotate({
  identifier: "AssetProcessingConfiguration",
}) as any as S.Schema<AssetProcessingConfiguration>;
export interface InputConfiguration {
  s3Uri: string;
  assetProcessingConfiguration?: AssetProcessingConfiguration;
}
export const InputConfiguration = S.suspend(() =>
  S.Struct({
    s3Uri: S.String,
    assetProcessingConfiguration: S.optional(AssetProcessingConfiguration),
  }),
).annotate({
  identifier: "InputConfiguration",
}) as any as S.Schema<InputConfiguration>;
export interface OutputConfiguration {
  s3Uri: string;
}
export const OutputConfiguration = S.suspend(() =>
  S.Struct({ s3Uri: S.String }),
).annotate({
  identifier: "OutputConfiguration",
}) as any as S.Schema<OutputConfiguration>;
export interface EventBridgeConfiguration {
  eventBridgeEnabled: boolean;
}
export const EventBridgeConfiguration = S.suspend(() =>
  S.Struct({ eventBridgeEnabled: S.Boolean }),
).annotate({
  identifier: "EventBridgeConfiguration",
}) as any as S.Schema<EventBridgeConfiguration>;
export interface NotificationConfiguration {
  eventBridgeConfiguration: EventBridgeConfiguration;
}
export const NotificationConfiguration = S.suspend(() =>
  S.Struct({ eventBridgeConfiguration: EventBridgeConfiguration }),
).annotate({
  identifier: "NotificationConfiguration",
}) as any as S.Schema<NotificationConfiguration>;
export interface InvokeDataAutomationAsyncRequest {
  clientToken?: string;
  inputConfiguration: InputConfiguration;
  outputConfiguration: OutputConfiguration;
  dataAutomationConfiguration?: DataAutomationConfiguration;
  encryptionConfiguration?: EncryptionConfiguration;
  notificationConfiguration?: NotificationConfiguration;
  blueprints?: Blueprint[];
  dataAutomationProfileArn: string;
  tags?: Tag[];
}
export const InvokeDataAutomationAsyncRequest = S.suspend(() =>
  S.Struct({
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    inputConfiguration: InputConfiguration,
    outputConfiguration: OutputConfiguration,
    dataAutomationConfiguration: S.optional(DataAutomationConfiguration),
    encryptionConfiguration: S.optional(EncryptionConfiguration),
    notificationConfiguration: S.optional(NotificationConfiguration),
    blueprints: S.optional(BlueprintList),
    dataAutomationProfileArn: S.String,
    tags: S.optional(TagList),
  }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "InvokeDataAutomationAsyncRequest",
}) as any as S.Schema<InvokeDataAutomationAsyncRequest>;
export interface InvokeDataAutomationAsyncResponse {
  invocationArn: string;
}
export const InvokeDataAutomationAsyncResponse = S.suspend(() =>
  S.Struct({ invocationArn: S.String }),
).annotate({
  identifier: "InvokeDataAutomationAsyncResponse",
}) as any as S.Schema<InvokeDataAutomationAsyncResponse>;
export interface GetDataAutomationStatusRequest {
  invocationArn: string;
}
export const GetDataAutomationStatusRequest = S.suspend(() =>
  S.Struct({ invocationArn: S.String.pipe(T.HttpLabel("invocationArn")) }).pipe(
    T.all(T.Http({ method: "POST", uri: "/" }), svc, auth, proto, ver, rules),
  ),
).annotate({
  identifier: "GetDataAutomationStatusRequest",
}) as any as S.Schema<GetDataAutomationStatusRequest>;
export type AutomationJobStatus =
  | "Created"
  | "InProgress"
  | "Success"
  | "ServiceError"
  | "ClientError"
  | (string & {});
export const AutomationJobStatus = S.String;
export interface GetDataAutomationStatusResponse {
  status?: AutomationJobStatus;
  errorType?: string;
  errorMessage?: string;
  outputConfiguration?: OutputConfiguration;
  jobSubmissionTime?: Date;
  jobCompletionTime?: Date;
  jobDurationInSeconds?: number;
}
export const GetDataAutomationStatusResponse = S.suspend(() =>
  S.Struct({
    status: S.optional(AutomationJobStatus),
    errorType: S.optional(S.String),
    errorMessage: S.optional(S.String),
    outputConfiguration: S.optional(OutputConfiguration),
    jobSubmissionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    jobCompletionTime: S.optional(
      T.DateFromString.pipe(T.TimestampFormat("date-time")),
    ),
    jobDurationInSeconds: S.optional(S.Number),
  }),
).annotate({
  identifier: "GetDataAutomationStatusResponse",
}) as any as S.Schema<GetDataAutomationStatusResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ServiceUnavailableException extends S.TaggedErrorClass<ServiceUnavailableException>()(
  "ServiceUnavailableException",
  { message: S.optional(S.String) },
).pipe(C.withServerError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { message: S.optional(S.String) },
).pipe(C.withThrottlingError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.optional(S.String) },
).pipe(C.withQuotaError) {}

//# Operations
/**
 * Sync API: Invoke data automation.
 */
export const invokeDataAutomation: (
  input: InvokeDataAutomationRequest,
) => effect.Effect<
  InvokeDataAutomationResponse,
  | AccessDeniedException
  | InternalServerException
  | ServiceUnavailableException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InvokeDataAutomationRequest,
  output: InvokeDataAutomationResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceUnavailableException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * List tags for an Amazon Bedrock Data Automation resource
 */
export const listTagsForResource: (
  input: ListTagsForResourceRequest,
) => effect.Effect<
  ListTagsForResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Tag an Amazon Bedrock Data Automation resource
 */
export const tagResource: (
  input: TagResourceRequest,
) => effect.Effect<
  TagResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Untag an Amazon Bedrock Data Automation resource
 */
export const untagResource: (
  input: UntagResourceRequest,
) => effect.Effect<
  UntagResourceResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Async API: Invoke data automation.
 */
export const invokeDataAutomationAsync: (
  input: InvokeDataAutomationAsyncRequest,
) => effect.Effect<
  InvokeDataAutomationAsyncResponse,
  | AccessDeniedException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: InvokeDataAutomationAsyncRequest,
  output: InvokeDataAutomationAsyncResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * API used to get data automation status.
 */
export const getDataAutomationStatus: (
  input: GetDataAutomationStatusRequest,
) => effect.Effect<
  GetDataAutomationStatusResponse,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetDataAutomationStatusRequest,
  output: GetDataAutomationStatusResponse,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
