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
  sdkId: "ElementalInference",
  serviceShapeName: "ElementalInference",
});
const auth = T.AwsAuthSigv4({ name: "elemental-inference" });
const ver = T.ServiceVersion("2018-11-14");
const proto = T.AwsProtocolsRestJson1();
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
});

//# Newtypes
export type ResourceArn = string;
export type TagKey = string;
export type TagValue = string;
export type ResourceName = string;
export type ResourceDescription = string;
export type FeedArn = string;
export type FeedId = string;
export type AssociatedResourceName = string;

//# Schemas
export interface ListTagsForResourceRequest {
  resourceArn: string;
}
export const ListTagsForResourceRequest = S.suspend(() =>
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
).annotate({
  identifier: "ListTagsForResourceRequest",
}) as any as S.Schema<ListTagsForResourceRequest>;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForResourceResponse {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceResponse = S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceResponse",
}) as any as S.Schema<ListTagsForResourceResponse>;
export interface TagResourceRequest {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
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
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceRequest = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
).annotate({
  identifier: "UntagResourceRequest",
}) as any as S.Schema<UntagResourceRequest>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface CroppingConfig {}
export const CroppingConfig = S.suspend(() => S.Struct({})).annotate({
  identifier: "CroppingConfig",
}) as any as S.Schema<CroppingConfig>;
export interface ClippingConfig {
  callbackMetadata?: string;
}
export const ClippingConfig = S.suspend(() =>
  S.Struct({ callbackMetadata: S.optional(S.String) }),
).annotate({ identifier: "ClippingConfig" }) as any as S.Schema<ClippingConfig>;
export type OutputConfig =
  | { cropping: CroppingConfig; clipping?: never }
  | { cropping?: never; clipping: ClippingConfig };
export const OutputConfig = S.Union([
  S.Struct({ cropping: CroppingConfig }),
  S.Struct({ clipping: ClippingConfig }),
]);
export type OutputStatus = "ENABLED" | "DISABLED" | (string & {});
export const OutputStatus = S.String;
export interface CreateOutput {
  name: string;
  outputConfig: OutputConfig;
  status: OutputStatus;
  description?: string;
}
export const CreateOutput = S.suspend(() =>
  S.Struct({
    name: S.String,
    outputConfig: OutputConfig,
    status: OutputStatus,
    description: S.optional(S.String),
  }),
).annotate({ identifier: "CreateOutput" }) as any as S.Schema<CreateOutput>;
export type CreateOutputList = CreateOutput[];
export const CreateOutputList = S.Array(CreateOutput);
export interface CreateFeedRequest {
  name: string;
  outputs: CreateOutput[];
  tags?: { [key: string]: string | undefined };
}
export const CreateFeedRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    outputs: CreateOutputList,
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/v1/feed" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateFeedRequest",
}) as any as S.Schema<CreateFeedRequest>;
export type StringList = string[];
export const StringList = S.Array(S.String);
export interface GetOutput {
  name: string;
  outputConfig: OutputConfig;
  status: OutputStatus;
  description?: string;
  fromAssociation?: boolean;
}
export const GetOutput = S.suspend(() =>
  S.Struct({
    name: S.String,
    outputConfig: OutputConfig,
    status: OutputStatus,
    description: S.optional(S.String),
    fromAssociation: S.optional(S.Boolean),
  }),
).annotate({ identifier: "GetOutput" }) as any as S.Schema<GetOutput>;
export type GetOutputList = GetOutput[];
export const GetOutputList = S.Array(GetOutput);
export type FeedStatus =
  | "CREATING"
  | "AVAILABLE"
  | "ACTIVE"
  | "UPDATING"
  | "DELETING"
  | "DELETED"
  | "ARCHIVED"
  | (string & {});
export const FeedStatus = S.String;
export interface FeedAssociation {
  associatedResourceName: string;
}
export const FeedAssociation = S.suspend(() =>
  S.Struct({ associatedResourceName: S.String }),
).annotate({
  identifier: "FeedAssociation",
}) as any as S.Schema<FeedAssociation>;
export interface CreateFeedResponse {
  arn: string;
  name: string;
  id: string;
  dataEndpoints: string[];
  outputs: GetOutput[];
  status: FeedStatus;
  association?: FeedAssociation;
  tags?: { [key: string]: string | undefined };
}
export const CreateFeedResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    id: S.String,
    dataEndpoints: StringList,
    outputs: GetOutputList,
    status: FeedStatus,
    association: S.optional(FeedAssociation),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateFeedResponse",
}) as any as S.Schema<CreateFeedResponse>;
export interface GetFeedRequest {
  id: string;
}
export const GetFeedRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/feed/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetFeedRequest" }) as any as S.Schema<GetFeedRequest>;
export interface GetFeedResponse {
  arn: string;
  name: string;
  id: string;
  dataEndpoints: string[];
  outputs: GetOutput[];
  status: FeedStatus;
  association?: FeedAssociation;
  tags?: { [key: string]: string | undefined };
}
export const GetFeedResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    id: S.String,
    dataEndpoints: StringList,
    outputs: GetOutputList,
    status: FeedStatus,
    association: S.optional(FeedAssociation),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "GetFeedResponse",
}) as any as S.Schema<GetFeedResponse>;
export interface UpdateOutput {
  name: string;
  outputConfig: OutputConfig;
  status: OutputStatus;
  description?: string;
  fromAssociation?: boolean;
}
export const UpdateOutput = S.suspend(() =>
  S.Struct({
    name: S.String,
    outputConfig: OutputConfig,
    status: OutputStatus,
    description: S.optional(S.String),
    fromAssociation: S.optional(S.Boolean),
  }),
).annotate({ identifier: "UpdateOutput" }) as any as S.Schema<UpdateOutput>;
export type UpdateOutputList = UpdateOutput[];
export const UpdateOutputList = S.Array(UpdateOutput);
export interface UpdateFeedRequest {
  name: string;
  id: string;
  outputs: UpdateOutput[];
}
export const UpdateFeedRequest = S.suspend(() =>
  S.Struct({
    name: S.String,
    id: S.String.pipe(T.HttpLabel("id")),
    outputs: UpdateOutputList,
  }).pipe(
    T.all(
      T.Http({ method: "PUT", uri: "/v1/feed/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateFeedRequest",
}) as any as S.Schema<UpdateFeedRequest>;
export interface UpdateFeedResponse {
  arn: string;
  name: string;
  id: string;
  dataEndpoints: string[];
  outputs: GetOutput[];
  status: FeedStatus;
  association?: FeedAssociation;
  tags?: { [key: string]: string | undefined };
}
export const UpdateFeedResponse = S.suspend(() =>
  S.Struct({
    arn: S.String,
    name: S.String,
    id: S.String,
    dataEndpoints: StringList,
    outputs: GetOutputList,
    status: FeedStatus,
    association: S.optional(FeedAssociation),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "UpdateFeedResponse",
}) as any as S.Schema<UpdateFeedResponse>;
export interface DeleteFeedRequest {
  id: string;
}
export const DeleteFeedRequest = S.suspend(() =>
  S.Struct({ id: S.String.pipe(T.HttpLabel("id")) }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/v1/feed/{id}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteFeedRequest",
}) as any as S.Schema<DeleteFeedRequest>;
export interface DeleteFeedResponse {
  arn: string;
  id: string;
  status: FeedStatus;
}
export const DeleteFeedResponse = S.suspend(() =>
  S.Struct({ arn: S.String, id: S.String, status: FeedStatus }),
).annotate({
  identifier: "DeleteFeedResponse",
}) as any as S.Schema<DeleteFeedResponse>;
export interface ListFeedsRequest {
  maxResults?: number;
  nextToken?: string;
}
export const ListFeedsRequest = S.suspend(() =>
  S.Struct({
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/v1/feeds" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListFeedsRequest",
}) as any as S.Schema<ListFeedsRequest>;
export interface FeedSummary {
  arn: string;
  id: string;
  name: string;
  association?: FeedAssociation;
  status: FeedStatus;
}
export const FeedSummary = S.suspend(() =>
  S.Struct({
    arn: S.String,
    id: S.String,
    name: S.String,
    association: S.optional(FeedAssociation),
    status: FeedStatus,
  }),
).annotate({ identifier: "FeedSummary" }) as any as S.Schema<FeedSummary>;
export type FeedSummaryList = FeedSummary[];
export const FeedSummaryList = S.Array(FeedSummary);
export interface ListFeedsResponse {
  feeds: FeedSummary[];
  nextToken?: string;
}
export const ListFeedsResponse = S.suspend(() =>
  S.Struct({ feeds: FeedSummaryList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListFeedsResponse",
}) as any as S.Schema<ListFeedsResponse>;
export interface AssociateFeedRequest {
  id: string;
  associatedResourceName: string;
  outputs: CreateOutput[];
  dryRun?: boolean;
}
export const AssociateFeedRequest = S.suspend(() =>
  S.Struct({
    id: S.String.pipe(T.HttpLabel("id")),
    associatedResourceName: S.String.pipe(T.IdempotencyToken()),
    outputs: CreateOutputList,
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
).annotate({
  identifier: "AssociateFeedRequest",
}) as any as S.Schema<AssociateFeedRequest>;
export interface AssociateFeedResponse {
  arn: string;
  id: string;
}
export const AssociateFeedResponse = S.suspend(() =>
  S.Struct({ arn: S.String, id: S.String }),
).annotate({
  identifier: "AssociateFeedResponse",
}) as any as S.Schema<AssociateFeedResponse>;
export interface DisassociateFeedRequest {
  id: string;
  associatedResourceName: string;
  dryRun?: boolean;
}
export const DisassociateFeedRequest = S.suspend(() =>
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
).annotate({
  identifier: "DisassociateFeedRequest",
}) as any as S.Schema<DisassociateFeedRequest>;
export interface DisassociateFeedResponse {
  arn: string;
  id: string;
}
export const DisassociateFeedResponse = S.suspend(() =>
  S.Struct({ arn: S.String, id: S.String }),
).annotate({
  identifier: "DisassociateFeedResponse",
}) as any as S.Schema<DisassociateFeedResponse>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.String },
).pipe(C.withAuthError) {}
export class InternalServerErrorException extends S.TaggedErrorClass<InternalServerErrorException>()(
  "InternalServerErrorException",
  { message: S.String },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.String },
).pipe(C.withBadRequestError) {}
export class TooManyRequestException extends S.TaggedErrorClass<TooManyRequestException>()(
  "TooManyRequestException",
  { message: S.String },
  T.Retryable(),
).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.String },
).pipe(C.withBadRequestError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.String },
  T.Retryable(),
).pipe(C.withConflictError, C.withRetryableError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.String },
).pipe(C.withQuotaError) {}

//# Operations
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceRequest,
  output: ListTagsForResourceResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceRequest,
  output: TagResourceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceRequest,
  output: UntagResourceResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
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
 * Creates a feed. The feed is the target for live streams being sent by the calling application. An example of a calling application is AWS Elemental MediaLive. After you create the feed, you can associate a resource with the feed.
 */
export const createFeed: API.OperationMethod<
  CreateFeedRequest,
  CreateFeedResponse,
  CreateFeedError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateFeedRequest,
  output: CreateFeedResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetFeedRequest,
  output: GetFeedResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
  ],
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
 */
export const updateFeed: API.OperationMethod<
  UpdateFeedRequest,
  UpdateFeedResponse,
  UpdateFeedError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateFeedRequest,
  output: UpdateFeedResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
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
 * Deletes the specified feed. The feed can be deleted at any time.
 */
export const deleteFeed: API.OperationMethod<
  DeleteFeedRequest,
  DeleteFeedResponse,
  DeleteFeedError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteFeedRequest,
  output: DeleteFeedResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
}));
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
export const listFeeds: API.OperationMethod<
  ListFeedsRequest,
  ListFeedsResponse,
  ListFeedsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListFeedsRequest,
  ) => stream.Stream<
    ListFeedsResponse,
    ListFeedsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListFeedsRequest,
  ) => stream.Stream<
    FeedSummary,
    ListFeedsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListFeedsRequest,
  output: ListFeedsResponse,
  errors: [
    AccessDeniedException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "feeds",
    pageSize: "maxResults",
  } as const,
}));
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
 * Associates a resource with the feed. The resource provides the input that Elemental Inference needs needs in order to perform an Elemental Inference feature, such as cropping video. You always provide the resource by associating it with a feed. You can associate only one resource with each feed.
 */
export const associateFeed: API.OperationMethod<
  AssociateFeedRequest,
  AssociateFeedResponse,
  AssociateFeedError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AssociateFeedRequest,
  output: AssociateFeedResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    TooManyRequestException,
    ValidationException,
  ],
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
 * Releases the resource (for example, an MediaLive channel) that is associated with this feed. The outputs in the feed become disabled.
 */
export const disassociateFeed: API.OperationMethod<
  DisassociateFeedRequest,
  DisassociateFeedResponse,
  DisassociateFeedError,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DisassociateFeedRequest,
  output: DisassociateFeedResponse,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerErrorException,
    ResourceNotFoundException,
    TooManyRequestException,
    ValidationException,
  ],
}));
