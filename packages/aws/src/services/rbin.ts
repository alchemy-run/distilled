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
  sdkId: "rbin",
  target: "AmazonRecycleBin",
  version: "2021-06-15",
  sigv4: "rbin",
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
                `https://rbin-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://rbin-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://rbin.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://rbin.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{
    readonly message?: string;
    readonly Reason?: ConflictExceptionReason;
  }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{
    readonly message?: string;
    readonly Reason?: ResourceNotFoundExceptionReason;
  }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{
    readonly message?: string;
    readonly Reason?: ServiceQuotaExceededExceptionReason;
  }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{
    readonly message?: string;
    readonly Reason?: ValidationExceptionReason;
  }> {}
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
export type ResourceType =
  | "EBS_SNAPSHOT"
  | "EC2_IMAGE"
  | "EBS_VOLUME"
  | (string & {});
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
export type LockState =
  | "locked"
  | "pending_unlock"
  | "unlocked"
  | (string & {});
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
export type ServiceQuotaExceededExceptionReason =
  | "SERVICE_QUOTA_EXCEEDED"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /rules",
    input: {
      RetentionPeriod: i_RetentionPeriod,
      Description: 0,
      Tags: D.list(i_Tag),
      ResourceType: 0,
      ResourceTags: D.list(i_ResourceTag),
      LockConfiguration: i_LockConfiguration,
      ExcludeResourceTags: D.list(i_ResourceTag),
    },
    body: true,
  },
  errors: [
    InternalServerException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateRule",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /rules/{Identifier}",
    input: { Identifier: 0 },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteRule",
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /rules/{Identifier}",
    input: { Identifier: 0 },
    output: { LockEndTime: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetRule",
})) as any;

export type ListRulesError =
  | InternalServerException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /list-rules",
    input: {
      MaxResults: 0,
      NextToken: 0,
      ResourceType: 0,
      ResourceTags: D.list(i_ResourceTag),
      LockState: 0,
      ExcludeResourceTags: D.list(i_ResourceTag),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "GET /tags/{ResourceArn}",
    input: { ResourceArn: 0 },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /rules/{Identifier}/lock",
    input: { Identifier: 0, LockConfiguration: i_LockConfiguration },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "LockRule",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tags/{ResourceArn}",
    input: { ResourceArn: 0, Tags: D.list(i_Tag) },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /rules/{Identifier}/unlock",
    input: { Identifier: 0 },
    output: { LockEndTime: D.ts },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UnlockRule",
})) as any;

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
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /rules/{Identifier}",
    input: {
      Identifier: 0,
      RetentionPeriod: i_RetentionPeriod,
      Description: 0,
      ResourceType: 0,
      ResourceTags: D.list(i_ResourceTag),
      ExcludeResourceTags: D.list(i_ResourceTag),
    },
    output: { LockEndTime: D.ts },
    body: true,
  },
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
})) as any;

const i_LockConfiguration: D.LazyStruct = () => ({
  UnlockDelay: { UnlockDelayValue: 0, UnlockDelayUnit: 0 },
});
const i_ResourceTag: D.LazyStruct = () => ({
  ResourceTagKey: 0,
  ResourceTagValue: 0,
});
const i_RetentionPeriod: D.LazyStruct = () => ({
  RetentionPeriodValue: 0,
  RetentionPeriodUnit: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
