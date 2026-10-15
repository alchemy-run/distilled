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
const svc = /*@__PURE__*/ T.AwsApiService({ sdkId: "Resource Groups", serviceShapeName: "Ardi" });
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "resource-groups" });
const ver = /*@__PURE__*/ T.ServiceVersion("2017-11-27");
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
              `https://resource-groups-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            if (_.getAttr(PartitionResult, "name") === "aws-us-gov") {
              return e(`https://resource-groups.${Region}.amazonaws.com`);
            }
            return e(
              `https://resource-groups-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
            );
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://resource-groups.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://resource-groups.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://resource-groups.{R}.{D}","properties":{},"headers":{}}');

export class BadRequestException
  extends /*@__PURE__*/ S.TaggedError<BadRequestException>()(
    "BadRequestException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
export class ForbiddenException
  extends /*@__PURE__*/ S.TaggedError<ForbiddenException>()(
    "ForbiddenException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class GroupAlreadyExists
  extends /*@__PURE__*/ S.TaggedError<GroupAlreadyExists>()(
    "GroupAlreadyExists",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "BadRequestException",
      message: { includes: "group already exists" },
    }),
  ).pipe(C.withAlreadyExistsError) {}
export class InternalServerErrorException
  extends /*@__PURE__*/ S.TaggedError<InternalServerErrorException>()(
    "InternalServerErrorException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
export class MethodNotAllowedException
  extends /*@__PURE__*/ S.TaggedError<MethodNotAllowedException>()(
    "MethodNotAllowedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(405),
  ).pipe(C.withBadRequestError) {}
export class NotFoundException
  extends /*@__PURE__*/ S.TaggedError<NotFoundException>()(
    "NotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class TooManyRequestsException
  extends /*@__PURE__*/ S.TaggedError<TooManyRequestsException>()(
    "TooManyRequestsException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class UnauthorizedException
  extends /*@__PURE__*/ S.TaggedError<UnauthorizedException>()(
    "UnauthorizedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(401),
  ).pipe(C.withAuthError) {}
export type TagSyncTaskArn = string;
export interface CancelTagSyncTaskInput {
  TaskArn: string;
}
export interface CancelTagSyncTaskResponse {}
export type CreateGroupName = string;
export type Description = string;
export type QueryType = "TAG_FILTERS_1_0" | "CLOUDFORMATION_STACK_1_0" | (string & {});
export type Query = string;
export interface ResourceQuery {
  Type: QueryType;
  Query: string;
}
export type TagKey = string;
export type TagValue = string;
export type Tags = { [key: string]: string | undefined };
export type GroupConfigurationType = string;
export type GroupConfigurationParameterName = string;
export type GroupConfigurationParameterValue = string;
export type GroupConfigurationParameterValueList = string[];
export interface GroupConfigurationParameter {
  Name: string;
  Values?: string[];
}
export type GroupParameterList = GroupConfigurationParameter[];
export interface GroupConfigurationItem {
  Type: string;
  Parameters?: GroupConfigurationParameter[];
}
export type GroupConfigurationList = GroupConfigurationItem[];
export type Criticality = number;
export type Owner = string;
export type DisplayName = string;
export interface CreateGroupInput {
  Name: string;
  Description?: string;
  ResourceQuery?: ResourceQuery;
  Tags?: { [key: string]: string | undefined };
  Configuration?: GroupConfigurationItem[];
  Criticality?: number;
  Owner?: string;
  DisplayName?: string;
}
export type GroupArnV2 = string;
export type GroupName = string;
export type ApplicationTagKey = string;
export type ApplicationArn = string;
export type ApplicationTag = { [key: string]: string | undefined };
export interface Group {
  GroupArn: string;
  Name: string;
  Description?: string;
  Criticality?: number;
  Owner?: string;
  DisplayName?: string;
  ApplicationTag?: { [key: string]: string | undefined };
}
export type GroupConfigurationStatus =
  | "UPDATING"
  | "UPDATE_COMPLETE"
  | "UPDATE_FAILED"
  | (string & {});
export type GroupConfigurationFailureReason = string;
export interface GroupConfiguration {
  Configuration?: GroupConfigurationItem[];
  ProposedConfiguration?: GroupConfigurationItem[];
  Status?: GroupConfigurationStatus;
  FailureReason?: string;
}
export interface CreateGroupOutput {
  Group: Group;
  ResourceQuery?: ResourceQuery;
  Tags?: { [key: string]: string | undefined };
  GroupConfiguration?: GroupConfiguration;
}
export type GroupStringV2 = string;
export interface DeleteGroupInput {
  GroupName?: string;
  Group?: string;
}
export interface DeleteGroupOutput {
  Group?: Group;
}
export interface GetAccountSettingsRequest {}
export type GroupLifecycleEventsDesiredStatus = "ACTIVE" | "INACTIVE" | (string & {});
export type GroupLifecycleEventsStatus =
  | "ACTIVE"
  | "INACTIVE"
  | "IN_PROGRESS"
  | "ERROR"
  | (string & {});
export type GroupLifecycleEventsStatusMessage = string;
export interface AccountSettings {
  GroupLifecycleEventsDesiredStatus?: GroupLifecycleEventsDesiredStatus;
  GroupLifecycleEventsStatus?: GroupLifecycleEventsStatus;
  GroupLifecycleEventsStatusMessage?: string;
}
export interface GetAccountSettingsOutput {
  AccountSettings?: AccountSettings;
}
export interface GetGroupInput {
  GroupName?: string;
  Group?: string;
}
export interface GetGroupOutput {
  Group: Group;
}
export type GroupString = string;
export interface GetGroupConfigurationInput {
  Group?: string;
}
export interface GetGroupConfigurationOutput {
  GroupConfiguration?: GroupConfiguration;
}
export interface GetGroupQueryInput {
  GroupName?: string;
  Group?: string;
}
export interface GroupQuery {
  GroupName: string;
  ResourceQuery: ResourceQuery;
}
export interface GetGroupQueryOutput {
  GroupQuery?: GroupQuery;
}
export interface GetTagsInput {
  Arn: string;
}
export interface GetTagsOutput {
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface GetTagSyncTaskInput {
  TaskArn: string;
}
export type RoleArn = string;
export type TagSyncTaskStatus = "ACTIVE" | "ERROR" | (string & {});
export type ErrorMessage = string;
export interface GetTagSyncTaskOutput {
  GroupArn?: string;
  GroupName?: string;
  TaskArn?: string;
  TagKey?: string;
  TagValue?: string;
  ResourceQuery?: ResourceQuery;
  RoleArn?: string;
  Status?: TagSyncTaskStatus;
  ErrorMessage?: string;
  CreatedAt?: Date;
}
export type ResourceArn = string;
export type ResourceArnList = string[];
export interface GroupResourcesInput {
  Group: string;
  ResourceArns: string[];
}
export type ErrorCode = string;
export interface FailedResource {
  ResourceArn?: string;
  ErrorMessage?: string;
  ErrorCode?: string;
}
export type FailedResourceList = FailedResource[];
export interface PendingResource {
  ResourceArn?: string;
}
export type PendingResourceList = PendingResource[];
export interface GroupResourcesOutput {
  Succeeded?: string[];
  Failed?: FailedResource[];
  Pending?: PendingResource[];
}
export type MaxResults = number;
export type ListGroupingStatusesFilterName = "status" | "resource-arn" | (string & {});
export type ListGroupingStatusesFilterValue = string;
export type ListGroupingStatusesFilterValues = string[];
export interface ListGroupingStatusesFilter {
  Name: ListGroupingStatusesFilterName;
  Values: string[];
}
export type ListGroupingStatusesFilterList = ListGroupingStatusesFilter[];
export type NextToken = string;
export interface ListGroupingStatusesInput {
  Group: string;
  MaxResults?: number;
  Filters?: ListGroupingStatusesFilter[];
  NextToken?: string;
}
export type GroupingType = "GROUP" | "UNGROUP" | (string & {});
export type GroupingStatus = "SUCCESS" | "FAILED" | "IN_PROGRESS" | "SKIPPED" | (string & {});
export interface GroupingStatusesItem {
  ResourceArn?: string;
  Action?: GroupingType;
  Status?: GroupingStatus;
  ErrorMessage?: string;
  ErrorCode?: string;
  UpdatedAt?: Date;
}
export type GroupingStatusesList = GroupingStatusesItem[];
export interface ListGroupingStatusesOutput {
  Group?: string;
  GroupingStatuses?: GroupingStatusesItem[];
  NextToken?: string;
}
export type ResourceFilterName = "resource-type" | (string & {});
export type ResourceFilterValue = string;
export type ResourceFilterValues = string[];
export interface ResourceFilter {
  Name: ResourceFilterName;
  Values: string[];
}
export type ResourceFilterList = ResourceFilter[];
export interface ListGroupResourcesInput {
  GroupName?: string;
  Group?: string;
  Filters?: ResourceFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type ResourceType = string;
export interface ResourceIdentifier {
  ResourceArn?: string;
  ResourceType?: string;
}
export type ResourceStatusValue = "PENDING" | (string & {});
export interface ResourceStatus {
  Name?: ResourceStatusValue;
}
export interface ListGroupResourcesItem {
  Identifier?: ResourceIdentifier;
  Status?: ResourceStatus;
}
export type ListGroupResourcesItemList = ListGroupResourcesItem[];
export type ResourceIdentifierList = ResourceIdentifier[];
export type QueryErrorCode =
  | "CLOUDFORMATION_STACK_INACTIVE"
  | "CLOUDFORMATION_STACK_NOT_EXISTING"
  | "CLOUDFORMATION_STACK_UNASSUMABLE_ROLE"
  | "RESOURCE_TYPE_NOT_SUPPORTED"
  | (string & {});
export type QueryErrorMessage = string;
export interface QueryError {
  ErrorCode?: QueryErrorCode;
  Message?: string;
}
export type QueryErrorList = QueryError[];
export interface ListGroupResourcesOutput {
  Resources?: ListGroupResourcesItem[];
  ResourceIdentifiers?: ResourceIdentifier[];
  NextToken?: string;
  QueryErrors?: QueryError[];
}
export type GroupFilterName =
  | "resource-type"
  | "configuration-type"
  | "owner"
  | "display-name"
  | "criticality"
  | (string & {});
export type GroupFilterValue = string;
export type GroupFilterValues = string[];
export interface GroupFilter {
  Name: GroupFilterName;
  Values: string[];
}
export type GroupFilterList = GroupFilter[];
export interface ListGroupsInput {
  Filters?: GroupFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export type GroupArn = string;
export interface GroupIdentifier {
  GroupName?: string;
  GroupArn?: string;
  Description?: string;
  Criticality?: number;
  Owner?: string;
  DisplayName?: string;
}
export type GroupIdentifierList = GroupIdentifier[];
export type GroupList = Group[];
export interface ListGroupsOutput {
  GroupIdentifiers?: GroupIdentifier[];
  Groups?: Group[];
  NextToken?: string;
}
export interface ListTagSyncTasksFilter {
  GroupArn?: string;
  GroupName?: string;
}
export type ListTagSyncTasksFilterList = ListTagSyncTasksFilter[];
export interface ListTagSyncTasksInput {
  Filters?: ListTagSyncTasksFilter[];
  MaxResults?: number;
  NextToken?: string;
}
export interface TagSyncTaskItem {
  GroupArn?: string;
  GroupName?: string;
  TaskArn?: string;
  TagKey?: string;
  TagValue?: string;
  ResourceQuery?: ResourceQuery;
  RoleArn?: string;
  Status?: TagSyncTaskStatus;
  ErrorMessage?: string;
  CreatedAt?: Date;
}
export type TagSyncTaskList = TagSyncTaskItem[];
export interface ListTagSyncTasksOutput {
  TagSyncTasks?: TagSyncTaskItem[];
  NextToken?: string;
}
export interface PutGroupConfigurationInput {
  Group?: string;
  Configuration?: GroupConfigurationItem[];
}
export interface PutGroupConfigurationOutput {}
export interface SearchResourcesInput {
  ResourceQuery: ResourceQuery;
  MaxResults?: number;
  NextToken?: string;
}
export interface SearchResourcesOutput {
  ResourceIdentifiers?: ResourceIdentifier[];
  NextToken?: string;
  QueryErrors?: QueryError[];
}
export interface StartTagSyncTaskInput {
  Group: string;
  TagKey?: string;
  TagValue?: string;
  ResourceQuery?: ResourceQuery;
  RoleArn: string;
}
export interface StartTagSyncTaskOutput {
  GroupArn?: string;
  GroupName?: string;
  TaskArn?: string;
  TagKey?: string;
  TagValue?: string;
  ResourceQuery?: ResourceQuery;
  RoleArn?: string;
}
export interface TagInput {
  Arn: string;
  Tags: { [key: string]: string | undefined };
}
export interface TagOutput {
  Arn?: string;
  Tags?: { [key: string]: string | undefined };
}
export interface UngroupResourcesInput {
  Group: string;
  ResourceArns: string[];
}
export interface UngroupResourcesOutput {
  Succeeded?: string[];
  Failed?: FailedResource[];
  Pending?: PendingResource[];
}
export type TagKeyList = string[];
export interface UntagInput {
  Arn: string;
  Keys: string[];
}
export interface UntagOutput {
  Arn?: string;
  Keys?: string[];
}
export interface UpdateAccountSettingsInput {
  GroupLifecycleEventsDesiredStatus?: GroupLifecycleEventsDesiredStatus;
}
export interface UpdateAccountSettingsOutput {
  AccountSettings?: AccountSettings;
}
export interface UpdateGroupInput {
  GroupName?: string;
  Group?: string;
  Description?: string;
  Criticality?: number;
  Owner?: string;
  DisplayName?: string;
}
export interface UpdateGroupOutput {
  Group?: Group;
}
export interface UpdateGroupQueryInput {
  GroupName?: string;
  Group?: string;
  ResourceQuery: ResourceQuery;
}
export interface UpdateGroupQueryOutput {
  GroupQuery?: GroupQuery;
}
export type CancelTagSyncTaskError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Cancels the specified tag-sync task.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:CancelTagSyncTask` on the application group
 *
 * - `resource-groups:DeleteGroup`
 */
export const cancelTagSyncTask: API.OperationMethod<
  CancelTagSyncTaskInput,
  CancelTagSyncTaskResponse,
  CancelTagSyncTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(232, __c29, 0) as any as S.Schema<CancelTagSyncTaskInput>,
  output: __S(240, __c30, 0) as any as S.Schema<CancelTagSyncTaskResponse>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTagSyncTask",
}));

export type CreateGroupError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | GroupAlreadyExists
  | CommonErrors;
/**
 * Creates a resource group with the specified name and description. You can optionally
 * include either a resource query or a service configuration. For more information about
 * constructing a resource query, see Build queries and groups in
 * Resource Groups in the *Resource Groups User Guide*. For more information
 * about service-linked groups and service configurations, see Service configurations for Resource Groups.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:CreateGroup`
 */
export const createGroup: API.OperationMethod<
  CreateGroupInput,
  CreateGroupOutput,
  CreateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(248, __c31, 0) as any as S.Schema<CreateGroupInput>,
  output: __S(249, __c31, 1) as any as S.Schema<CreateGroupOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
    GroupAlreadyExists,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateGroup",
}));

export type DeleteGroupError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes the specified resource group. Deleting a resource group does not delete any
 * resources that are members of the group; it only deletes the group structure.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:DeleteGroup`
 */
export const deleteGroup: API.OperationMethod<
  DeleteGroupInput,
  DeleteGroupOutput,
  DeleteGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(0, __c0, 0) as any as S.Schema<DeleteGroupInput>,
  output: __S(8, __c1, 0) as any as S.Schema<DeleteGroupOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteGroup",
}));

export type GetAccountSettingsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the current status of optional features in Resource Groups.
 */
export const getAccountSettings: API.OperationMethod<
  GetAccountSettingsRequest,
  GetAccountSettingsOutput,
  GetAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(16, __c2, 0) as any as S.Schema<GetAccountSettingsRequest>,
  output: __S(25, __c3, 1) as any as S.Schema<GetAccountSettingsOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetAccountSettings",
}));

export type GetGroupError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns information about a specified resource group.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:GetGroup`
 */
export const getGroup: API.OperationMethod<
  GetGroupInput,
  GetGroupOutput,
  GetGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c4, 0) as any as S.Schema<GetGroupInput>,
  output: __S(33, __c4, 1) as any as S.Schema<GetGroupOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroup",
}));

export type GetGroupConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the service configuration associated with the specified resource group. For
 * details about the service configuration syntax, see Service configurations for Resource Groups.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:GetGroupConfiguration`
 */
export const getGroupConfiguration: API.OperationMethod<
  GetGroupConfigurationInput,
  GetGroupConfigurationOutput,
  GetGroupConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(40, __c5, 0) as any as S.Schema<GetGroupConfigurationInput>,
  output: __S(41, __c5, 1) as any as S.Schema<GetGroupConfigurationOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupConfiguration",
}));

export type GetGroupQueryError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Retrieves the resource query associated with the specified resource group. For more
 * information about resource queries, see Create
 * a tag-based group in Resource Groups.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:GetGroupQuery`
 */
export const getGroupQuery: API.OperationMethod<
  GetGroupQueryInput,
  GetGroupQueryOutput,
  GetGroupQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(48, __c6, 0) as any as S.Schema<GetGroupQueryInput>,
  output: __S(57, __c7, 1) as any as S.Schema<GetGroupQueryOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetGroupQuery",
}));

export type GetTagsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of tags that are associated with a resource group, specified by an
 * Amazon resource name (ARN).
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:GetTags`
 */
export const getTags: API.OperationMethod<
  GetTagsInput,
  GetTagsOutput,
  GetTagsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(64, __c8, 0) as any as S.Schema<GetTagsInput>,
  output: __S(72, __c9, 0) as any as S.Schema<GetTagsOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTags",
}));

export type GetTagSyncTaskError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns information about a specified tag-sync task.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:GetTagSyncTask` on the application group
 */
export const getTagSyncTask: API.OperationMethod<
  GetTagSyncTaskInput,
  GetTagSyncTaskOutput,
  GetTagSyncTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(80, __c10, 0) as any as S.Schema<GetTagSyncTaskInput>,
  output: __S(88, __c11, 0) as any as S.Schema<GetTagSyncTaskOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetTagSyncTask",
}));

export type GroupResourcesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds the specified resources to the specified group.
 *
 * You can only use this operation with the following groups:
 *
 * - `AWS::EC2::HostManagement`
 *
 * - `AWS::EC2::CapacityReservationPool`
 *
 * - `AWS::ResourceGroups::ApplicationGroup`
 *
 * Other resource group types and resource types are not currently supported by this
 * operation.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:GroupResources`
 */
export const groupResources: API.OperationMethod<
  GroupResourcesInput,
  GroupResourcesOutput,
  GroupResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(96, __c12, 0) as any as S.Schema<GroupResourcesInput>,
  output: __S(108, __c13, 4) as any as S.Schema<GroupResourcesOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GroupResources",
}));

export type ListGroupingStatusesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | NotFoundException
  | CommonErrors;
/**
 * Returns the status of the last grouping or ungrouping action for
 * each resource in the specified application group.
 */
export const listGroupingStatuses: API.PaginatedOperationMethod<
  ListGroupingStatusesInput,
  ListGroupingStatusesOutput,
  ListGroupingStatusesError,
  Credentials | HttpClient.HttpClient,
  GroupingStatusesItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(112, __c14, 0) as any as S.Schema<ListGroupingStatusesInput>,
  output: __S(115, __c14, 3) as any as S.Schema<ListGroupingStatusesOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
    NotFoundException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupingStatuses",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GroupingStatuses",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupResourcesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of Amazon resource names (ARNs) of the resources that are members of a specified resource
 * group.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:ListGroupResources`
 *
 * - `cloudformation:DescribeStacks`
 *
 * - `cloudformation:ListStackResources`
 *
 * - `tag:GetResources`
 */
export const listGroupResources: API.PaginatedOperationMethod<
  ListGroupResourcesInput,
  ListGroupResourcesOutput,
  ListGroupResourcesError,
  Credentials | HttpClient.HttpClient,
  ResourceIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(128, __c16, 0) as any as S.Schema<ListGroupResourcesInput>,
  output: __S(132, __c16, 4) as any as S.Schema<ListGroupResourcesOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroupResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceIdentifiers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListGroupsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Returns a list of existing Resource Groups in your account.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:ListGroups`
 */
export const listGroups: API.PaginatedOperationMethod<
  ListGroupsInput,
  ListGroupsOutput,
  ListGroupsError,
  Credentials | HttpClient.HttpClient,
  GroupIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(144, __c18, 0) as any as S.Schema<ListGroupsInput>,
  output: __S(148, __c18, 4) as any as S.Schema<ListGroupsOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "GroupIdentifiers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagSyncTasksError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of tag-sync tasks.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:ListTagSyncTasks` with the group passed in the filters as the resource
 * or * if using no filters
 */
export const listTagSyncTasks: API.PaginatedOperationMethod<
  ListTagSyncTasksInput,
  ListTagSyncTasksOutput,
  ListTagSyncTasksError,
  Credentials | HttpClient.HttpClient,
  TagSyncTaskItem
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(154, __c19, 2) as any as S.Schema<ListTagSyncTasksInput>,
  output: __S(156, __c19, 4) as any as S.Schema<ListTagSyncTasksOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagSyncTasks",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "TagSyncTasks",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type PutGroupConfigurationError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Attaches a service configuration to the specified group. This occurs asynchronously,
 * and can take time to complete. You can use GetGroupConfiguration to
 * check the status of the update.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:PutGroupConfiguration`
 */
export const putGroupConfiguration: API.OperationMethod<
  PutGroupConfigurationInput,
  PutGroupConfigurationOutput,
  PutGroupConfigurationError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(160, __c20, 0) as any as S.Schema<PutGroupConfigurationInput>,
  output: __S(240, __c30, 0) as any as S.Schema<PutGroupConfigurationOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "PutGroupConfiguration",
}));

export type SearchResourcesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Returns a list of Amazon Web Services resource identifiers that matches the specified query. The
 * query uses the same format as a resource query in a CreateGroup or
 * UpdateGroupQuery operation.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:SearchResources`
 *
 * - `cloudformation:DescribeStacks`
 *
 * - `cloudformation:ListStackResources`
 *
 * - `tag:GetResources`
 */
export const searchResources: API.PaginatedOperationMethod<
  SearchResourcesInput,
  SearchResourcesOutput,
  SearchResourcesError,
  Credentials | HttpClient.HttpClient,
  ResourceIdentifier
> = /*@__PURE__*/ API.makePaginated(() => ({
  input: __S(168, __c21, 0) as any as S.Schema<SearchResourcesInput>,
  output: __S(169, __c21, 1) as any as S.Schema<SearchResourcesOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "SearchResources",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ResourceIdentifiers",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type StartTagSyncTaskError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | UnauthorizedException
  | CommonErrors;
/**
 * Creates a new tag-sync task to onboard and sync resources tagged with a specific tag key-value pair to an
 * application. To start a tag-sync task, you need a resource tagging role.
 * The resource tagging role grants permissions to tag and untag applications resources and must include a
 * trust policy that allows Resource Groups to assume the role and perform resource tagging tasks on your behalf.
 *
 * For instructions on creating a tag-sync task, see Create a tag-sync
 * using the Resource Groups API in the *Amazon Web Services Service Catalog AppRegistry Administrator Guide*.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:StartTagSyncTask` on the application group
 *
 * - `resource-groups:CreateGroup`
 *
 * - `iam:PassRole` on the role provided in the request
 */
export const startTagSyncTask: API.OperationMethod<
  StartTagSyncTaskInput,
  StartTagSyncTaskOutput,
  StartTagSyncTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(176, __c22, 0) as any as S.Schema<StartTagSyncTaskInput>,
  output: __S(177, __c22, 1) as any as S.Schema<StartTagSyncTaskOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
    UnauthorizedException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "StartTagSyncTask",
}));

export type TagError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Adds tags to a resource group with the specified Amazon resource name (ARN). Existing tags on a resource
 * group are not changed if they are not specified in the request parameters.
 *
 * Do not store personally identifiable information (PII) or other confidential or
 * sensitive information in tags. We use tags to provide you with billing and
 * administration services. Tags are not intended to be used for private or sensitive
 * data.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:Tag`
 */
export const tag: API.OperationMethod<
  TagInput,
  TagOutput,
  TagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(184, __c23, 0) as any as S.Schema<TagInput>,
  output: __S(72, __c9, 0) as any as S.Schema<TagOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Tag",
}));

export type UngroupResourcesError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Removes the specified resources from the specified group. This operation works only
 * with static groups that you populated using the GroupResources
 * operation. It doesn't work with any resource groups that are automatically populated by
 * tag-based or CloudFormation stack-based queries.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:UngroupResources`
 */
export const ungroupResources: API.OperationMethod<
  UngroupResourcesInput,
  UngroupResourcesOutput,
  UngroupResourcesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(192, __c24, 0) as any as S.Schema<UngroupResourcesInput>,
  output: __S(108, __c13, 4) as any as S.Schema<UngroupResourcesOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UngroupResources",
}));

export type UntagError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Deletes tags from a specified resource group.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:Untag`
 */
export const untag: API.OperationMethod<
  UntagInput,
  UntagOutput,
  UntagError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(200, __c25, 0) as any as S.Schema<UntagInput>,
  output: __S(201, __c25, 1) as any as S.Schema<UntagOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "Untag",
}));

export type UpdateAccountSettingsError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Turns on or turns off optional features in Resource Groups.
 *
 * The preceding example shows that the request to turn on group lifecycle events is
 * `IN_PROGRESS`. You can call the GetAccountSettings
 * operation to check for completion by looking for `GroupLifecycleEventsStatus`
 * to change to `ACTIVE`.
 */
export const updateAccountSettings: API.OperationMethod<
  UpdateAccountSettingsInput,
  UpdateAccountSettingsOutput,
  UpdateAccountSettingsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(208, __c26, 0) as any as S.Schema<UpdateAccountSettingsInput>,
  output: __S(25, __c3, 1) as any as S.Schema<UpdateAccountSettingsOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateAccountSettings",
}));

export type UpdateGroupError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the description for an existing group. You cannot update the name of a
 * resource group.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:UpdateGroup`
 */
export const updateGroup: API.OperationMethod<
  UpdateGroupInput,
  UpdateGroupOutput,
  UpdateGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(216, __c27, 0) as any as S.Schema<UpdateGroupInput>,
  output: __S(8, __c1, 0) as any as S.Schema<UpdateGroupOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroup",
}));

export type UpdateGroupQueryError =
  | BadRequestException
  | ForbiddenException
  | InternalServerErrorException
  | MethodNotAllowedException
  | NotFoundException
  | TooManyRequestsException
  | CommonErrors;
/**
 * Updates the resource query of a group. For more information about resource queries,
 * see Create a tag-based group in Resource Groups.
 *
 * **Minimum permissions**
 *
 * To run this command, you must have the following permissions:
 *
 * - `resource-groups:UpdateGroupQuery`
 */
export const updateGroupQuery: API.OperationMethod<
  UpdateGroupQueryInput,
  UpdateGroupQueryOutput,
  UpdateGroupQueryError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(224, __c28, 0) as any as S.Schema<UpdateGroupQueryInput>,
  output: __S(57, __c7, 1) as any as S.Schema<UpdateGroupQueryOutput>,
  errors: [
    BadRequestException,
    ForbiddenException,
    InternalServerErrorException,
    MethodNotAllowedException,
    NotFoundException,
    TooManyRequestsException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateGroupQuery",
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupName: S.optional(S.String), Group: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/delete-group" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "DeleteGroupInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Group: S.optional(__S(264, __c33, 0)) })).annotate({
        identifier: "DeleteGroupOutput",
      });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({}).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-account-settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetAccountSettingsRequest" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupLifecycleEventsDesiredStatus: S.optional(S.String),
          GroupLifecycleEventsStatus: S.optional(S.String),
          GroupLifecycleEventsStatusMessage: S.optional(S.String),
        }),
      ).annotate({ identifier: "AccountSettings" });
    case 1:
      return S.suspend(() => S.Struct({ AccountSettings: S.optional(__S(24, __c3, 0)) })).annotate({
        identifier: "GetAccountSettingsOutput",
      });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupName: S.optional(S.String), Group: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/get-group" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetGroupInput" });
    case 1:
      return S.suspend(() => S.Struct({ Group: __S(264, __c33, 0) })).annotate({
        identifier: "GetGroupOutput",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Group: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-group-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetGroupConfigurationInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ GroupConfiguration: S.optional(__S(272, __c34, 0)) }),
      ).annotate({ identifier: "GetGroupConfigurationOutput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupName: S.optional(S.String), Group: S.optional(S.String) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/get-group-query" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetGroupQueryInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupName: S.String, ResourceQuery: __S(296, __c37, 0) }),
      ).annotate({ identifier: "GroupQuery" });
    case 1:
      return S.suspend(() => S.Struct({ GroupQuery: S.optional(__S(56, __c7, 0)) })).annotate({
        identifier: "GetGroupQueryOutput",
      });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/resources/{Arn}/tags" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTagsInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Tags: S.optional(__S(256, __c32, 0)) }),
      ).annotate({ identifier: "GetTagsOutput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TaskArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/get-tag-sync-task" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetTagSyncTaskInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupArn: S.optional(S.String),
          GroupName: S.optional(S.String),
          TaskArn: S.optional(S.String),
          TagKey: S.optional(S.String),
          TagValue: S.optional(S.String),
          ResourceQuery: S.optional(__S(296, __c37, 0)),
          RoleArn: S.optional(S.String),
          Status: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          CreatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetTagSyncTaskOutput" });
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Group: S.String, ResourceArns: __S(280, __c35, 0) }).pipe(
          T.all(T.Http({ method: "POST", uri: "/group-resources" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GroupResourcesInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          ErrorCode: S.optional(S.String),
        }),
      ).annotate({ identifier: "FailedResource" });
    case 1:
      return S.Array(__S(104, __c13, 0));
    case 2:
      return S.suspend(() => S.Struct({ ResourceArn: S.optional(S.String) })).annotate({
        identifier: "PendingResource",
      });
    case 3:
      return S.Array(__S(106, __c13, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Succeeded: S.optional(__S(280, __c35, 0)),
          Failed: S.optional(__S(105, __c13, 1)),
          Pending: S.optional(__S(107, __c13, 3)),
        }),
      ).annotate({ identifier: "GroupResourcesOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Group: S.String,
          MaxResults: S.optional(S.Number),
          Filters: S.optional(__S(121, __c15, 1)),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-grouping-statuses" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGroupingStatusesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.optional(S.String),
          Action: S.optional(S.String),
          Status: S.optional(S.String),
          ErrorMessage: S.optional(S.String),
          ErrorCode: S.optional(S.String),
          UpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GroupingStatusesItem" });
    case 2:
      return S.Array(__S(113, __c14, 1));
    case 3:
      return S.suspend(() =>
        S.Struct({
          Group: S.optional(S.String),
          GroupingStatuses: S.optional(__S(114, __c14, 2)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListGroupingStatusesOutput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Name: S.String, Values: __S(280, __c35, 0) })).annotate({
        identifier: "ListGroupingStatusesFilter",
      });
    case 1:
      return S.Array(__S(120, __c15, 0));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupName: S.optional(S.String),
          Group: S.optional(S.String),
          Filters: S.optional(__S(121, __c15, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-group-resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListGroupResourcesInput" });
    case 1:
      return S.suspend(() => S.Struct({ Name: S.optional(S.String) })).annotate({
        identifier: "ResourceStatus",
      });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Identifier: S.optional(__S(136, __c17, 0)),
          Status: S.optional(__S(129, __c16, 1)),
        }),
      ).annotate({ identifier: "ListGroupResourcesItem" });
    case 3:
      return S.Array(__S(130, __c16, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({
          Resources: S.optional(__S(131, __c16, 3)),
          ResourceIdentifiers: S.optional(__S(137, __c17, 1)),
          NextToken: S.optional(S.String),
          QueryErrors: S.optional(__S(139, __c17, 3)),
        }),
      ).annotate({ identifier: "ListGroupResourcesOutput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ ResourceArn: S.optional(S.String), ResourceType: S.optional(S.String) }),
      ).annotate({ identifier: "ResourceIdentifier" });
    case 1:
      return S.Array(__S(136, __c17, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ ErrorCode: S.optional(S.String), Message: S.optional(S.String) }),
      ).annotate({ identifier: "QueryError" });
    case 3:
      return S.Array(__S(138, __c17, 2));
  }
}
function __c18(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(121, __c15, 1)),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/groups-list" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListGroupsInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GroupName: S.optional(S.String),
          GroupArn: S.optional(S.String),
          Description: S.optional(S.String),
          Criticality: S.optional(S.Number),
          Owner: S.optional(S.String),
          DisplayName: S.optional(S.String),
        }),
      ).annotate({ identifier: "GroupIdentifier" });
    case 2:
      return S.Array(__S(145, __c18, 1));
    case 3:
      return S.Array(__S(264, __c33, 0));
    case 4:
      return S.suspend(() =>
        S.Struct({
          GroupIdentifiers: S.optional(__S(146, __c18, 2)),
          Groups: S.optional(__S(147, __c18, 3)),
          NextToken: S.optional(S.String),
        }),
      ).annotate({ identifier: "ListGroupsOutput" });
  }
}
function __c19(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupArn: S.optional(S.String), GroupName: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagSyncTasksFilter" });
    case 1:
      return S.Array(__S(152, __c19, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          Filters: S.optional(__S(153, __c19, 1)),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/list-tag-sync-tasks" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "ListTagSyncTasksInput" });
    case 3:
      return S.Array(__S(88, __c11, 0));
    case 4:
      return S.suspend(() =>
        S.Struct({ TagSyncTasks: S.optional(__S(155, __c19, 3)), NextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListTagSyncTasksOutput" });
  }
}
function __c20(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Group: S.optional(S.String),
          Configuration: S.optional(__S(291, __c36, 3)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/put-group-configuration" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "PutGroupConfigurationInput" });
  }
}
function __c21(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceQuery: __S(296, __c37, 0),
          MaxResults: S.optional(S.Number),
          NextToken: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/resources/search" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "SearchResourcesInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          ResourceIdentifiers: S.optional(__S(137, __c17, 1)),
          NextToken: S.optional(S.String),
          QueryErrors: S.optional(__S(139, __c17, 3)),
        }),
      ).annotate({ identifier: "SearchResourcesOutput" });
  }
}
function __c22(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Group: S.String,
          TagKey: S.optional(S.String),
          TagValue: S.optional(S.String),
          ResourceQuery: S.optional(__S(296, __c37, 0)),
          RoleArn: S.String,
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/start-tag-sync-task" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "StartTagSyncTaskInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          GroupArn: S.optional(S.String),
          GroupName: S.optional(S.String),
          TaskArn: S.optional(S.String),
          TagKey: S.optional(S.String),
          TagValue: S.optional(S.String),
          ResourceQuery: S.optional(__S(296, __c37, 0)),
          RoleArn: S.optional(S.String),
        }),
      ).annotate({ identifier: "StartTagSyncTaskOutput" });
  }
}
function __c23(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")), Tags: __S(256, __c32, 0) }).pipe(
          T.all(
            T.Http({ method: "PUT", uri: "/resources/{Arn}/tags" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "TagInput" });
  }
}
function __c24(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Group: S.String, ResourceArns: __S(280, __c35, 0) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/ungroup-resources" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UngroupResourcesInput" });
  }
}
function __c25(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Arn: S.String.pipe(T.HttpLabel("Arn")), Keys: __S(280, __c35, 0) }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/resources/{Arn}/tags" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UntagInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({ Arn: S.optional(S.String), Keys: S.optional(__S(280, __c35, 0)) }),
      ).annotate({ identifier: "UntagOutput" });
  }
}
function __c26(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ GroupLifecycleEventsDesiredStatus: S.optional(S.String) }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-account-settings" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateAccountSettingsInput" });
  }
}
function __c27(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupName: S.optional(S.String),
          Group: S.optional(S.String),
          Description: S.optional(S.String),
          Criticality: S.optional(S.Number),
          Owner: S.optional(S.String),
          DisplayName: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/update-group" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateGroupInput" });
  }
}
function __c28(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupName: S.optional(S.String),
          Group: S.optional(S.String),
          ResourceQuery: __S(296, __c37, 0),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/update-group-query" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateGroupQueryInput" });
  }
}
function __c29(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ TaskArn: S.String }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/cancel-tag-sync-task" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CancelTagSyncTaskInput" });
  }
}
function __c30(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "CancelTagSyncTaskResponse" });
  }
}
function __c31(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String,
          Description: S.optional(S.String),
          ResourceQuery: S.optional(__S(296, __c37, 0)),
          Tags: S.optional(__S(256, __c32, 0)),
          Configuration: S.optional(__S(291, __c36, 3)),
          Criticality: S.optional(S.Number),
          Owner: S.optional(S.String),
          DisplayName: S.optional(S.String),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/groups" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateGroupInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Group: __S(264, __c33, 0),
          ResourceQuery: S.optional(__S(296, __c37, 0)),
          Tags: S.optional(__S(256, __c32, 0)),
          GroupConfiguration: S.optional(__S(272, __c34, 0)),
        }),
      ).annotate({ identifier: "CreateGroupOutput" });
  }
}
function __c32(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c33(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupArn: S.String,
          Name: S.String,
          Description: S.optional(S.String),
          Criticality: S.optional(S.Number),
          Owner: S.optional(S.String),
          DisplayName: S.optional(S.String),
          ApplicationTag: S.optional(__S(256, __c32, 0)),
        }),
      ).annotate({ identifier: "Group" });
  }
}
function __c34(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Configuration: S.optional(__S(291, __c36, 3)),
          ProposedConfiguration: S.optional(__S(291, __c36, 3)),
          Status: S.optional(S.String),
          FailureReason: S.optional(S.String),
        }),
      ).annotate({ identifier: "GroupConfiguration" });
  }
}
function __c35(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c36(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String, Values: S.optional(__S(280, __c35, 0)) }),
      ).annotate({ identifier: "GroupConfigurationParameter" });
    case 1:
      return S.Array(__S(288, __c36, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ Type: S.String, Parameters: S.optional(__S(289, __c36, 1)) }),
      ).annotate({ identifier: "GroupConfigurationItem" });
    case 3:
      return S.Array(__S(290, __c36, 2));
  }
}
function __c37(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Type: S.String, Query: S.String })).annotate({
        identifier: "ResourceQuery",
      });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
