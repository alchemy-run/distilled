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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "rbin", serviceShapeName: "AmazonRecycleBin" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "rbin" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-06-15");
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
              `https://rbin-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://rbin-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(`https://rbin.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`);
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://rbin.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://rbin.{R}.{D}","properties":{},"headers":{}}');

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({ identifier: "ConflictExceptionReason" }),
      ),
    },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ResourceNotFoundExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ServiceQuotaExceededExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    {
      message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()),
      Reason: /*@__PURE__*/ S.optional(
        /*@__PURE__*/ S.suspend(() => S.String).annotate({
          identifier: "ValidationExceptionReason",
        }),
      ),
    },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type RetentionPeriodValue = number;
export type RetentionPeriodUnit = "DAYS" | (string & {});
export interface RetentionPeriod {
  RetentionPeriodValue: number;
  RetentionPeriodUnit: RetentionPeriodUnit;
}
export type Description = string;
export type TagKey = string;
export type TagValue = string;
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export type ResourceType = "EBS_SNAPSHOT" | "EC2_IMAGE" | "EBS_VOLUME" | (string & {});
export type ResourceTagKey = string;
export type ResourceTagValue = string;
export interface ResourceTag {
  ResourceTagKey: string;
  ResourceTagValue?: string;
}
export type ResourceTags = ResourceTag[];
export type UnlockDelayValue = number;
export type UnlockDelayUnit = "DAYS" | (string & {});
export interface UnlockDelay {
  UnlockDelayValue: number;
  UnlockDelayUnit: UnlockDelayUnit;
}
export interface LockConfiguration {
  UnlockDelay: UnlockDelay;
}
export type ExcludeResourceTags = ResourceTag[];
export interface CreateRuleRequest {
  RetentionPeriod: RetentionPeriod;
  Description?: string;
  Tags?: Tag[];
  ResourceType: ResourceType;
  ResourceTags?: ResourceTag[];
  LockConfiguration?: LockConfiguration;
  ExcludeResourceTags?: ResourceTag[];
}
export type RuleIdentifier = string;
export type RuleStatus = "pending" | "available" | (string & {});
export type LockState = "locked" | "pending_unlock" | "unlocked" | (string & {});
export type RuleArn = string;
export interface CreateRuleResponse {
  Identifier?: string;
  RetentionPeriod?: RetentionPeriod;
  Description?: string;
  Tags?: Tag[];
  ResourceType?: ResourceType;
  ResourceTags?: ResourceTag[];
  Status?: RuleStatus;
  LockConfiguration?: LockConfiguration;
  LockState?: LockState;
  RuleArn?: string;
  ExcludeResourceTags?: ResourceTag[];
}
export interface DeleteRuleRequest {
  Identifier: string;
}
export interface DeleteRuleResponse {}
export interface GetRuleRequest {
  Identifier: string;
}
export interface GetRuleResponse {
  Identifier?: string;
  Description?: string;
  ResourceType?: ResourceType;
  RetentionPeriod?: RetentionPeriod;
  ResourceTags?: ResourceTag[];
  Status?: RuleStatus;
  LockConfiguration?: LockConfiguration;
  LockState?: LockState;
  LockEndTime?: Date;
  RuleArn?: string;
  ExcludeResourceTags?: ResourceTag[];
}
export type MaxResults = number;
export type NextToken = string;
export interface ListRulesRequest {
  MaxResults?: number;
  NextToken?: string;
  ResourceType: ResourceType;
  ResourceTags?: ResourceTag[];
  LockState?: LockState;
  ExcludeResourceTags?: ResourceTag[];
}
export interface RuleSummary {
  Identifier?: string;
  Description?: string;
  RetentionPeriod?: RetentionPeriod;
  LockState?: LockState;
  RuleArn?: string;
}
export type RuleSummaryList = RuleSummary[];
export interface ListRulesResponse {
  Rules?: RuleSummary[];
  NextToken?: string;
}
export interface ListTagsForResourceRequest {
  ResourceArn: string;
}
export interface ListTagsForResourceResponse {
  Tags?: Tag[];
}
export interface LockRuleRequest {
  Identifier: string;
  LockConfiguration: LockConfiguration;
}
export interface LockRuleResponse {
  Identifier?: string;
  Description?: string;
  ResourceType?: ResourceType;
  RetentionPeriod?: RetentionPeriod;
  ResourceTags?: ResourceTag[];
  Status?: RuleStatus;
  LockConfiguration?: LockConfiguration;
  LockState?: LockState;
  RuleArn?: string;
  ExcludeResourceTags?: ResourceTag[];
}
export interface TagResourceRequest {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceResponse {}
export interface UnlockRuleRequest {
  Identifier: string;
}
export interface UnlockRuleResponse {
  Identifier?: string;
  Description?: string;
  ResourceType?: ResourceType;
  RetentionPeriod?: RetentionPeriod;
  ResourceTags?: ResourceTag[];
  Status?: RuleStatus;
  LockConfiguration?: LockConfiguration;
  LockState?: LockState;
  LockEndTime?: Date;
  RuleArn?: string;
  ExcludeResourceTags?: ResourceTag[];
}
export type TagKeyList = string[];
export interface UntagResourceRequest {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceResponse {}
export interface UpdateRuleRequest {
  Identifier: string;
  RetentionPeriod?: RetentionPeriod;
  Description?: string;
  ResourceType?: ResourceType;
  ResourceTags?: ResourceTag[];
  ExcludeResourceTags?: ResourceTag[];
}
export interface UpdateRuleResponse {
  Identifier?: string;
  RetentionPeriod?: RetentionPeriod;
  Description?: string;
  ResourceType?: ResourceType;
  ResourceTags?: ResourceTag[];
  Status?: RuleStatus;
  LockState?: LockState;
  LockEndTime?: Date;
  RuleArn?: string;
  ExcludeResourceTags?: ResourceTag[];
}
export type ErrorMessage = string;
export type ServiceQuotaExceededExceptionReason = "SERVICE_QUOTA_EXCEEDED" | (string & {});
export type ValidationExceptionReason =
  | "INVALID_PAGE_TOKEN"
  | "INVALID_PARAMETER_VALUE"
  | (string & {});
export type ConflictExceptionReason = "INVALID_RULE_STATE" | (string & {});
export type ResourceNotFoundExceptionReason = "RULE_NOT_FOUND" | (string & {});
export type CreateRuleError =
  | InternalServerException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Creates a Recycle Bin retention rule. You can create two types of retention rules:
 *
 * - **Tag-level retention rules** - These retention rules use
 * resource tags to identify the resources to protect. For each retention rule, you specify one or
 * more tag key and value pairs. Resources (of the specified type) that have at least one of these
 * tag key and value pairs are automatically retained in the Recycle Bin upon deletion. Use this
 * type of retention rule to protect specific resources in your account based on their tags.
 *
 * - **Region-level retention rules** - These retention rules,
 * by default, apply to all of the resources (of the specified type) in the Region, even if the
 * resources are not tagged. However, you can specify exclusion tags to exclude resources that have
 * specific tags. Use this type of retention rule to protect all resources of a specific type in a
 * Region.
 *
 * For more information, see
 * Create Recycle Bin retention rules in the *Amazon EBS User Guide*.
 */
export const createRule: API.OperationMethod<
  CreateRuleRequest,
  CreateRuleResponse,
  CreateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(20, __c5, 0) as any as S.Schema<CreateRuleRequest>,
  output: __S(21, __c5, 1) as any as S.Schema<CreateRuleResponse>,
  errors: [InternalServerException, ServiceQuotaExceededException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRule",
}));

export type DeleteRuleError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a Recycle Bin retention rule. For more information, see
 * Delete Recycle Bin retention rules in the *Amazon Elastic Compute Cloud User Guide*.
 */
export const deleteRule: API.OperationMethod<
  DeleteRuleRequest,
  DeleteRuleResponse,
  DeleteRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(36, __c9, 0) as any as S.Schema<DeleteRuleRequest>,
  output: __S(40, __c10, 0) as any as S.Schema<DeleteRuleResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRule",
}));

export type GetRuleError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Gets information about a Recycle Bin retention rule.
 */
export const getRule: API.OperationMethod<
  GetRuleRequest,
  GetRuleResponse,
  GetRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(44, __c11, 0) as any as S.Schema<GetRuleRequest>,
  output: __S(48, __c12, 0) as any as S.Schema<GetRuleResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRule",
}));

export type ListRulesError = InternalServerException | ValidationException | CommonErrors;
/**
 * Lists the Recycle Bin retention rules in the Region.
 */
export const listRules: API.PaginatedOperationMethod<
  ListRulesRequest,
  ListRulesResponse,
  ListRulesError,
  Credentials | HttpClient.HttpClient,
  RuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(52, __c13, 0) as any as S.Schema<ListRulesRequest>,
  output: __S(55, __c13, 3) as any as S.Schema<ListRulesResponse>,
  errors: [InternalServerException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Rules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags assigned to a retention rule.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResponse,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c14, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(57, __c14, 1) as any as S.Schema<ListTagsForResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type LockRuleError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Locks a Region-level retention rule. A locked retention rule can't be modified or
 * deleted.
 *
 * You can't lock tag-level retention rules, or Region-level retention rules that
 * have exclusion tags.
 */
export const lockRule: API.OperationMethod<
  LockRuleRequest,
  LockRuleResponse,
  LockRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<LockRuleRequest>,
  output: __S(1, __c0, 1) as any as S.Schema<LockRuleResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "LockRule",
}));

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Assigns tags to the specified retention rule.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(4, __c1, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(40, __c10, 0) as any as S.Schema<TagResourceResponse>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UnlockRuleError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Unlocks a retention rule. After a retention rule is unlocked, it can be modified or deleted
 * only after the unlock delay period expires.
 */
export const unlockRule: API.OperationMethod<
  UnlockRuleRequest,
  UnlockRuleResponse,
  UnlockRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c2, 0) as any as S.Schema<UnlockRuleRequest>,
  output: __S(48, __c12, 0) as any as S.Schema<UnlockRuleResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnlockRule",
}));

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Unassigns a tag from a retention rule.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(13, __c3, 1) as any as S.Schema<UntagResourceRequest>,
  output: __S(40, __c10, 0) as any as S.Schema<UntagResourceResponse>,
  errors: [InternalServerException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateRuleError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ValidationException
  | CommonErrors;
/**
 * Updates an existing Recycle Bin retention rule. You can update a retention rule's description,
 * resource tags, and retention period at any time after creation. You can't update a retention rule's
 * resource type after creation. For more information, see
 * Update Recycle Bin retention rules in the *Amazon Elastic Compute Cloud User Guide*.
 */
export const updateRule: API.OperationMethod<
  UpdateRuleRequest,
  UpdateRuleResponse,
  UpdateRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c4, 0) as any as S.Schema<UpdateRuleRequest>,
  output: __S(17, __c4, 1) as any as S.Schema<UpdateRuleResponse>,
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateRule",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          LockConfiguration: __S(25, __c6, 1),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/rules/{Identifier}/lock" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "LockRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.optional(S.String),
          Description: S.optional(S.String),
          ResourceType: S.optional(S.String),
          RetentionPeriod: S.optional(__S(28, __c7, 0)),
          ResourceTags: S.optional(__S(30, __c7, 2)),
          Status: S.optional(S.String),
          LockConfiguration: S.optional(__S(25, __c6, 1)),
          LockState: S.optional(S.String),
          RuleArn: S.optional(S.String),
          ExcludeResourceTags: S.optional(__S(30, __c7, 2)),
        }),
      ).annotate({ identifier: "LockRuleResponse" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(33, __c8, 1),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/tags/{ResourceArn}" }),
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
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/rules/{Identifier}/unlock" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UnlockRuleRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(12, __c3, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/tags/{ResourceArn}" }),
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
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.String.pipe(T.HttpLabel("Identifier")),
          RetentionPeriod: S.optional(__S(28, __c7, 0)),
          Description: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceTags: S.optional(__S(30, __c7, 2)),
          ExcludeResourceTags: S.optional(__S(30, __c7, 2)),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/rules/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.optional(S.String),
          RetentionPeriod: S.optional(__S(28, __c7, 0)),
          Description: S.optional(S.String),
          ResourceType: S.optional(S.String),
          ResourceTags: S.optional(__S(30, __c7, 2)),
          Status: S.optional(S.String),
          LockState: S.optional(S.String),
          LockEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RuleArn: S.optional(S.String),
          ExcludeResourceTags: S.optional(__S(30, __c7, 2)),
        }),
      ).annotate({ identifier: "UpdateRuleResponse" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          RetentionPeriod: __S(28, __c7, 0),
          Description: S.optional(S.String),
          Tags: S.optional(__S(33, __c8, 1)),
          ResourceType: S.String,
          ResourceTags: S.optional(__S(30, __c7, 2)),
          LockConfiguration: S.optional(__S(25, __c6, 1)),
          ExcludeResourceTags: S.optional(__S(30, __c7, 2)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/rules" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.optional(S.String),
          RetentionPeriod: S.optional(__S(28, __c7, 0)),
          Description: S.optional(S.String),
          Tags: S.optional(__S(33, __c8, 1)),
          ResourceType: S.optional(S.String),
          ResourceTags: S.optional(__S(30, __c7, 2)),
          Status: S.optional(S.String),
          LockConfiguration: S.optional(__S(25, __c6, 1)),
          LockState: S.optional(S.String),
          RuleArn: S.optional(S.String),
          ExcludeResourceTags: S.optional(__S(30, __c7, 2)),
        }),
      ).annotate({ identifier: "CreateRuleResponse" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ UnlockDelayValue: S.Number, UnlockDelayUnit: S.String }),
      ).annotate({ identifier: "UnlockDelay" });
    case 1:
      return S.suspend(() => S.Struct({ UnlockDelay: __S(24, __c6, 0) })).annotate({
        identifier: "LockConfiguration",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ RetentionPeriodValue: S.Number, RetentionPeriodUnit: S.String }),
      ).annotate({ identifier: "RetentionPeriod" });
    case 1:
      return S.suspend(() =>
        S.Struct({ ResourceTagKey: S.String, ResourceTagValue: S.optional(S.String) }),
      ).annotate({ identifier: "ResourceTag" });
    case 2:
      return S.Array(__S(29, __c7, 1));
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(32, __c8, 0));
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/rules/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteRuleRequest" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteRuleResponse" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Identifier: S.String.pipe(T.HttpLabel("Identifier")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/rules/{Identifier}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetRuleRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.optional(S.String),
          Description: S.optional(S.String),
          ResourceType: S.optional(S.String),
          RetentionPeriod: S.optional(__S(28, __c7, 0)),
          ResourceTags: S.optional(__S(30, __c7, 2)),
          Status: S.optional(S.String),
          LockConfiguration: S.optional(__S(25, __c6, 1)),
          LockState: S.optional(S.String),
          LockEndTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          RuleArn: S.optional(S.String),
          ExcludeResourceTags: S.optional(__S(30, __c7, 2)),
        }),
      ).annotate({ identifier: "GetRuleResponse" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
          ResourceType: S.String,
          ResourceTags: S.optional(__S(30, __c7, 2)),
          LockState: S.optional(S.String),
          ExcludeResourceTags: S.optional(__S(30, __c7, 2)),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/list-rules" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.optional(S.String),
          Description: S.optional(S.String),
          RetentionPeriod: S.optional(__S(28, __c7, 0)),
          LockState: S.optional(S.String),
          RuleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "RuleSummary" });
    case 2:
      return S.Array(__S(53, __c13, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({ Rules: S.optional(__S(54, __c13, 2)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListRulesResponse" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/tags/{ResourceArn}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(33, __c8, 1)) })).annotate({
        identifier: "ListTagsForResourceResponse",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
