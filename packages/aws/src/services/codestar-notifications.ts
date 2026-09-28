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
  sdkId: "codestar notifications",
  target: "CodeStarNotifications_20191015",
  version: "2019-10-15",
  sigv4: "codestar-notifications",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://codestar-notifications.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://codestar-notifications.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConcurrentModificationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConcurrentModificationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ConfigurationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConfigurationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class InvalidNextTokenException
  extends /*@__PURE__*/ TE.TaggedError(
    "InvalidNextTokenException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class LimitExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "LimitExceededException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ResourceAlreadyExistsException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceAlreadyExistsException",
    ["ConflictError", "AlreadyExistsError"],
    { status: 409 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
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
export type ListEventTypesFilterName =
  | "RESOURCE_TYPE"
  | "SERVICE_NAME"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /createNotificationRule",
    input: {
      Name: 0,
      EventTypeIds: 0,
      Resource: 0,
      Targets: D.list(i_Target),
      DetailType: 0,
      ClientRequestToken: D.m({ idempotency: true }),
      Tags: 0,
      Status: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /deleteNotificationRule",
    input: { Arn: 0 },
    body: true,
  },
  errors: [
    ConcurrentModificationException,
    LimitExceededException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteNotificationRule",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /deleteTarget",
    input: { TargetAddress: 0, ForceUnsubscribeAll: 0 },
    body: true,
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteTarget",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /describeNotificationRule",
    input: { Arn: 0 },
    output: {
      Name: D.secret,
      Targets: D.list(o_TargetSummary),
      CreatedTimestamp: D.ts,
      LastModifiedTimestamp: D.ts,
    },
    body: true,
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeNotificationRule",
})) as any;

export type ListEventTypesError =
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /listEventTypes",
    input: {
      Filters: D.list({ Name: 0, Value: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /listNotificationRules",
    input: {
      Filters: D.list({ Name: 0, Value: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /listTagsForResource",
    input: { Arn: 0 },
    body: true,
  },
  errors: [ResourceNotFoundException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type ListTargetsError =
  | InvalidNextTokenException
  | ValidationException
  | CommonErrors;
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
  descriptor: {
    service: svc,
    http: "POST /listTargets",
    input: {
      Filters: D.list({ Name: 0, Value: 0 }),
      NextToken: 0,
      MaxResults: 0,
    },
    output: { Targets: D.list(o_TargetSummary) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /subscribe",
    input: { Arn: 0, Target: i_Target, ClientRequestToken: 0 },
    body: true,
  },
  errors: [
    ConfigurationException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Subscribe",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /tagResource",
    input: { Arn: 0, Tags: 0 },
    body: true,
  },
  errors: [
    ConcurrentModificationException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /unsubscribe",
    input: { Arn: 0, TargetAddress: 0 },
    body: true,
  },
  errors: [ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Unsubscribe",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /untagResource/{Arn}",
    input: { Arn: 0, TagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    ConcurrentModificationException,
    LimitExceededException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /updateNotificationRule",
    input: {
      Arn: 0,
      Name: 0,
      Status: 0,
      EventTypeIds: 0,
      Targets: D.list(i_Target),
      DetailType: 0,
    },
    body: true,
  },
  errors: [
    ConfigurationException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateNotificationRule",
})) as any;

const i_Target: D.LazyStruct = () => ({ TargetType: 0, TargetAddress: 0 });
const o_TargetSummary: D.LazyStruct = () => ({ TargetAddress: D.secret });
