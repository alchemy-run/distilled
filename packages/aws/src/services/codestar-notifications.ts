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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "codestar notifications",
  serviceShapeName: "CodeStarNotifications_20191015",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "codestar-notifications" });
const ver = /*@__PURE__*/ T.ServiceVersion("2019-10-15");
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
              `https://codestar-notifications-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(
              `https://codestar-notifications-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://codestar-notifications.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(
          `https://codestar-notifications.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
        );
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://codestar-notifications.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConcurrentModificationException
  extends /*@__PURE__*/ S.TaggedError<ConcurrentModificationException>()(
    "ConcurrentModificationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ConfigurationException
  extends /*@__PURE__*/ S.TaggedError<ConfigurationException>()(
    "ConfigurationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ S.TaggedError<InvalidNextTokenException>()(
    "InvalidNextTokenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class LimitExceededException
  extends /*@__PURE__*/ S.TaggedError<LimitExceededException>()(
    "LimitExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ S.TaggedError<ResourceAlreadyExistsException>()(
    "ResourceAlreadyExistsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withAlreadyExistsError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export type NotificationRuleName = string | redacted.Redacted<string>;
export type EventTypeId = string;
export type EventTypeIds = string[];
export type NotificationRuleResource = string;
export type TargetType = string;
export type TargetAddress = string | redacted.Redacted<string>;
export interface Target {
  TargetType?: string;
  TargetAddress?: string | redacted.Redacted<string>;
}
export type Targets = Target[];
export type DetailType = "BASIC" | "FULL" | (string & {});
export type ClientRequestToken = string;
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export type NotificationRuleStatus = "ENABLED" | "DISABLED" | (string & {});
export interface CreateNotificationRuleRequest {
  Name: string | redacted.Redacted<string>;
  EventTypeIds: string[];
  Resource: string;
  Targets: Target[];
  DetailType: DetailType;
  ClientRequestToken?: string;
  Tags?: { [key: string]: string | undefined };
  Status?: NotificationRuleStatus;
}
export type NotificationRuleArn = string;
export interface CreateNotificationRuleResult {
  Arn?: string;
}
export interface DeleteNotificationRuleRequest {
  Arn: string;
}
export interface DeleteNotificationRuleResult {
  Arn?: string;
}
export type ForceUnsubscribeAll = boolean;
export interface DeleteTargetRequest {
  TargetAddress: string | redacted.Redacted<string>;
  ForceUnsubscribeAll?: boolean;
}
export interface DeleteTargetResult {}
export interface DescribeNotificationRuleRequest {
  Arn: string;
}
export type ServiceName = string;
export type EventTypeName = string;
export type ResourceType = string;
export interface EventTypeSummary {
  EventTypeId?: string;
  ServiceName?: string;
  EventTypeName?: string;
  ResourceType?: string;
}
export type EventTypeBatch = EventTypeSummary[];
export type TargetStatus =
  | "PENDING"
  | "ACTIVE"
  | "UNREACHABLE"
  | "INACTIVE"
  | "DEACTIVATED"
  | (string & {});
export interface TargetSummary {
  TargetAddress?: string | redacted.Redacted<string>;
  TargetType?: string;
  TargetStatus?: TargetStatus;
}
export type TargetsBatch = TargetSummary[];
export type NotificationRuleCreatedBy = string;
export type CreatedTimestamp = Date;
export type LastModifiedTimestamp = Date;
export interface DescribeNotificationRuleResult {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  EventTypes?: EventTypeSummary[];
  Resource?: string;
  Targets?: TargetSummary[];
  DetailType?: DetailType;
  CreatedBy?: string;
  Status?: NotificationRuleStatus;
  CreatedTimestamp?: Date;
  LastModifiedTimestamp?: Date;
  Tags?: { [key: string]: string | undefined };
}
export type ListEventTypesFilterName = "RESOURCE_TYPE" | "SERVICE_NAME" | (string & {});
export type ListEventTypesFilterValue = string;
export interface ListEventTypesFilter {
  Name: ListEventTypesFilterName;
  Value: string;
}
export type ListEventTypesFilters = ListEventTypesFilter[];
export type NextToken = string;
export type MaxResults = number;
export interface ListEventTypesRequest {
  Filters?: ListEventTypesFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface ListEventTypesResult {
  EventTypes?: EventTypeSummary[];
  NextToken?: string;
}
export type ListNotificationRulesFilterName =
  | "EVENT_TYPE_ID"
  | "CREATED_BY"
  | "RESOURCE"
  | "TARGET_ADDRESS"
  | (string & {});
export type ListNotificationRulesFilterValue = string;
export interface ListNotificationRulesFilter {
  Name: ListNotificationRulesFilterName;
  Value: string;
}
export type ListNotificationRulesFilters = ListNotificationRulesFilter[];
export interface ListNotificationRulesRequest {
  Filters?: ListNotificationRulesFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export type NotificationRuleId = string;
export interface NotificationRuleSummary {
  Id?: string;
  Arn?: string;
}
export type NotificationRuleBatch = NotificationRuleSummary[];
export interface ListNotificationRulesResult {
  NextToken?: string;
  NotificationRules?: NotificationRuleSummary[];
}
export interface ListTagsForResourceRequest {
  Arn: string;
}
export interface ListTagsForResourceResult {
  Tags?: { [key: string]: string | undefined };
}
export type ListTargetsFilterName =
  | "TARGET_TYPE"
  | "TARGET_ADDRESS"
  | "TARGET_STATUS"
  | (string & {});
export type ListTargetsFilterValue = string;
export interface ListTargetsFilter {
  Name: ListTargetsFilterName;
  Value: string;
}
export type ListTargetsFilters = ListTargetsFilter[];
export interface ListTargetsRequest {
  Filters?: ListTargetsFilter[];
  NextToken?: string;
  MaxResults?: number;
}
export interface ListTargetsResult {
  Targets?: TargetSummary[];
  NextToken?: string;
}
export interface SubscribeRequest {
  Arn: string;
  Target: Target;
  ClientRequestToken?: string;
}
export interface SubscribeResult {
  Arn?: string;
}
export interface TagResourceRequest {
  Arn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagResourceResult {
  Tags?: { [key: string]: string | undefined };
}
export interface UnsubscribeRequest {
  Arn: string;
  TargetAddress: string | redacted.Redacted<string>;
}
export interface UnsubscribeResult {
  Arn: string;
}
export type TagKeys = string[];
export interface UntagResourceRequest {
  Arn: string;
  TagKeys: string[];
}
export interface UntagResourceResult {}
export interface UpdateNotificationRuleRequest {
  Arn: string;
  Name?: string | redacted.Redacted<string>;
  Status?: NotificationRuleStatus;
  EventTypeIds?: string[];
  Targets?: Target[];
  DetailType?: DetailType;
}
export interface UpdateNotificationRuleResult {}
export type Message = string;
export type CreateNotificationRuleError =
  | AccessDeniedException
  | ConcurrentModificationException
  | ConfigurationException
  | LimitExceededException
  | ResourceAlreadyExistsException
  | ValidationException
  | CommonErrors;
/**
 * Creates a notification rule for a resource. The rule specifies the events you want
 * notifications about and the targets (such as Amazon Q Developer in chat applications topics or Amazon Q Developer in chat applications clients configured for Slack) where you want to receive
 * them.
 */
export const createNotificationRule: API.OperationMethod<
  CreateNotificationRuleRequest,
  CreateNotificationRuleResult,
  CreateNotificationRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c16, 0) as any as S.Schema<CreateNotificationRuleRequest>,
  output: __S(84, __c21, 0) as any as S.Schema<CreateNotificationRuleResult>,
  errors: [
    AccessDeniedException,
    ConcurrentModificationException,
    ConfigurationException,
    LimitExceededException,
    ResourceAlreadyExistsException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateNotificationRule",
}));

export type DeleteNotificationRuleError =
  | ConcurrentModificationException
  | LimitExceededException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a notification rule for a resource.
 */
export const deleteNotificationRule: API.OperationMethod<
  DeleteNotificationRuleRequest,
  DeleteNotificationRuleResult,
  DeleteNotificationRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(88, __c22, 0) as any as S.Schema<DeleteNotificationRuleRequest>,
  output: __S(84, __c21, 0) as any as S.Schema<DeleteNotificationRuleResult>,
  errors: [ConcurrentModificationException, LimitExceededException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotificationRule",
}));

export type DeleteTargetError = ValidationException | CommonErrors;
/**
 * Deletes a specified target for notifications.
 */
export const deleteTarget: API.OperationMethod<
  DeleteTargetRequest,
  DeleteTargetResult,
  DeleteTargetError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteTargetRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<DeleteTargetResult>,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTarget",
}));

export type DescribeNotificationRuleError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns information about a specified notification rule.
 */
export const describeNotificationRule: API.OperationMethod<
  DescribeNotificationRuleRequest,
  DescribeNotificationRuleResult,
  DescribeNotificationRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(8, __c2, 0) as any as S.Schema<DescribeNotificationRuleRequest>,
  output: __S(9, __c2, 1) as any as S.Schema<DescribeNotificationRuleResult>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotificationRule",
}));

export type ListEventTypesError = InvalidNextTokenException | ValidationException | CommonErrors;
/**
 * Returns information about the event types available for configuring notifications.
 */
export const listEventTypes: API.PaginatedOperationMethod<
  ListEventTypesRequest,
  ListEventTypesResult,
  ListEventTypesError,
  Credentials | HttpClient.HttpClient,
  EventTypeSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(20, __c5, 0) as any as S.Schema<ListEventTypesRequest>,
  output: __S(21, __c5, 1) as any as S.Schema<ListEventTypesResult>,
  errors: [InvalidNextTokenException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListEventTypes",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "EventTypes",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListNotificationRulesError =
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the notification rules for an Amazon Web Services account.
 */
export const listNotificationRules: API.PaginatedOperationMethod<
  ListNotificationRulesRequest,
  ListNotificationRulesResult,
  ListNotificationRulesError,
  Credentials | HttpClient.HttpClient,
  NotificationRuleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(28, __c7, 0) as any as S.Schema<ListNotificationRulesRequest>,
  output: __S(31, __c7, 3) as any as S.Schema<ListNotificationRulesResult>,
  errors: [InvalidNextTokenException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListNotificationRules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "NotificationRules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the tags associated with a notification rule.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceRequest,
  ListTagsForResourceResult,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c8, 0) as any as S.Schema<ListTagsForResourceRequest>,
  output: __S(36, __c9, 0) as any as S.Schema<ListTagsForResourceResult>,
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

export type ListTargetsError = InvalidNextTokenException | ValidationException | CommonErrors;
/**
 * Returns a list of the notification rule targets for an Amazon Web Services account.
 */
export const listTargets: API.PaginatedOperationMethod<
  ListTargetsRequest,
  ListTargetsResult,
  ListTargetsError,
  Credentials | HttpClient.HttpClient,
  TargetSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(40, __c10, 0) as any as S.Schema<ListTargetsRequest>,
  output: __S(41, __c10, 1) as any as S.Schema<ListTargetsResult>,
  errors: [InvalidNextTokenException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTargets",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Targets",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type SubscribeError =
  | ConfigurationException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Creates an association between a notification rule and an Amazon Q Developer in chat applications topic or Amazon Q Developer in chat applications client so that the
 * associated target can receive notifications when the events described in the rule are
 * triggered.
 */
export const subscribe: API.OperationMethod<
  SubscribeRequest,
  SubscribeResult,
  SubscribeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(44, __c11, 0) as any as S.Schema<SubscribeRequest>,
  output: __S(84, __c21, 0) as any as S.Schema<SubscribeResult>,
  errors: [ConfigurationException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Subscribe",
}));

export type TagResourceError =
  | ConcurrentModificationException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Associates a set of provided tags with a notification rule.
 */
export const tagResource: API.OperationMethod<
  TagResourceRequest,
  TagResourceResult,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c12, 0) as any as S.Schema<TagResourceRequest>,
  output: __S(36, __c9, 0) as any as S.Schema<TagResourceResult>,
  errors: [
    ConcurrentModificationException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
}));

export type UnsubscribeError = ValidationException | CommonErrors;
/**
 * Removes an association between a notification rule and an Amazon Q Developer in chat applications topic so that
 * subscribers to that topic stop receiving notifications when the events described in the
 * rule are triggered.
 */
export const unsubscribe: API.OperationMethod<
  UnsubscribeRequest,
  UnsubscribeResult,
  UnsubscribeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(52, __c13, 0) as any as S.Schema<UnsubscribeRequest>,
  output: __S(53, __c13, 1) as any as S.Schema<UnsubscribeResult>,
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Unsubscribe",
}));

export type UntagResourceError =
  | ConcurrentModificationException
  | LimitExceededException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes the association between one or more provided tags and a notification
 * rule.
 */
export const untagResource: API.OperationMethod<
  UntagResourceRequest,
  UntagResourceResult,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(56, __c14, 0) as any as S.Schema<UntagResourceRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<UntagResourceResult>,
  errors: [
    ConcurrentModificationException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
}));

export type UpdateNotificationRuleError =
  | ConfigurationException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Updates a notification rule for a resource. You can change the events that trigger the
 * notification rule, the status of the rule, and the targets that receive the
 * notifications.
 *
 * To add or remove tags for a notification rule, you must use TagResource and UntagResource.
 */
export const updateNotificationRule: API.OperationMethod<
  UpdateNotificationRuleRequest,
  UpdateNotificationRuleResult,
  UpdateNotificationRuleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(60, __c15, 0) as any as S.Schema<UpdateNotificationRuleRequest>,
  output: __S(4, __c1, 0) as any as S.Schema<UpdateNotificationRuleResult>,
  errors: [ConfigurationException, ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotificationRule",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetAddress: SensitiveString,
          ForceUnsubscribeAll: S.optional(S.Boolean),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/deleteTarget" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteTargetRequest" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteTargetResult" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/describeNotificationRule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DescribeNotificationRuleRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.optional(SensitiveString),
          EventTypes: S.optional(__S(13, __c3, 1)),
          Resource: S.optional(S.String),
          Targets: S.optional(__S(17, __c4, 1)),
          DetailType: S.optional(S.String),
          CreatedBy: S.optional(S.String),
          Status: S.optional(S.String),
          CreatedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModifiedTimestamp: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Tags: S.optional(__S(68, __c17, 0)),
        }),
      ).annotate({ identifier: "DescribeNotificationRuleResult" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          EventTypeId: S.optional(S.String),
          ServiceName: S.optional(S.String),
          EventTypeName: S.optional(S.String),
          ResourceType: S.optional(S.String),
        }),
      ).annotate({ identifier: "EventTypeSummary" });
    case 1:
      return S.Array(__S(12, __c3, 0));
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          TargetAddress: S.optional(SensitiveString),
          TargetType: S.optional(S.String),
          TargetStatus: S.optional(S.String),
        }),
      ).annotate({ identifier: "TargetSummary" });
    case 1:
      return S.Array(__S(16, __c4, 0));
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(25, __c6, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/listEventTypes" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListEventTypesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ EventTypes: S.optional(__S(13, __c3, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListEventTypesResult" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Value: S.String })).annotate({
        identifier: "ListEventTypesFilter",
      });
    case 1:
      return S.Array(__S(24, __c6, 0));
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(25, __c6, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listNotificationRules" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListNotificationRulesRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Id: S.optional(S.String), Arn: S.optional(S.String) }),
      ).annotate({ identifier: "NotificationRuleSummary" });
    case 2:
      return S.Array(__S(29, __c7, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          NextToken: S.optional(S.String),
          NotificationRules: S.optional(__S(30, __c7, 2)),
        }),
      ).annotate({ identifier: "ListNotificationRulesResult" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/listTagsForResource" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagsForResourceRequest" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(68, __c17, 0)) })).annotate({
        identifier: "ListTagsForResourceResult",
      });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(25, __c6, 1)),
          NextToken: S.optional(S.String),
          MaxResults: S.optional(S.Number),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/listTargets" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListTargetsRequest" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Targets: S.optional(__S(17, __c4, 1)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTargetsResult" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Target: __S(72, __c18, 0),
          ClientRequestToken: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/subscribe" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "SubscribeRequest" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, Tags: __S(68, __c17, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/tagResource" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "TagResourceRequest" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String, TargetAddress: SensitiveString }).pipe(
          T.all(T.Http({ method: "POST", uri: "/unsubscribe" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UnsubscribeRequest" });
    case 1:
      return S.suspend(() => S.Struct({ Arn: S.String })).annotate({
        identifier: "UnsubscribeResult",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String.pipe(T.HttpLabel("Arn")),
          TagKeys: __S(76, __c19, 0).pipe(T.HttpQuery("tagKeys")),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/untagResource/{Arn}" }),
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
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          Name: S.optional(SensitiveString),
          Status: S.optional(S.String),
          EventTypeIds: S.optional(__S(76, __c19, 0)),
          Targets: S.optional(__S(80, __c20, 0)),
          DetailType: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/updateNotificationRule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateNotificationRuleRequest" });
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: SensitiveString,
          EventTypeIds: __S(76, __c19, 0),
          Resource: S.String,
          Targets: __S(80, __c20, 0),
          DetailType: S.String,
          ClientRequestToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          Tags: S.optional(__S(68, __c17, 0)),
          Status: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/createNotificationRule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateNotificationRuleRequest" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TargetType: S.optional(S.String), TargetAddress: S.optional(SensitiveString) }),
      ).annotate({ identifier: "Target" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.Array(__S(72, __c18, 0));
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Arn: S.optional(S.String) })).annotate({
        identifier: "CreateNotificationRuleResult",
      });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/deleteNotificationRule" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteNotificationRuleRequest" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
