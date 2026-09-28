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
  sdkId: "Resource Groups",
  target: "Ardi",
  version: "2017-11-27",
  sigv4: "resource-groups",
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
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://resource-groups.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://resource-groups.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class BadRequestException
  extends /*@__PURE__*/ TE.TaggedError(
    "BadRequestException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export class ForbiddenException
  extends /*@__PURE__*/ TE.TaggedError("ForbiddenException", ["AuthError"], {
    status: 403,
  })<{ readonly message?: string }> {}
export class GroupAlreadyExists
  extends /*@__PURE__*/ TE.TaggedError(
    "GroupAlreadyExists",
    ["AlreadyExistsError"],
    {
      synthetic: {
        from: "BadRequestException",
        message: { includes: "group already exists" },
      },
    },
  )<{ readonly message?: string }> {}
export class InternalServerErrorException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerErrorException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class MethodNotAllowedException
  extends /*@__PURE__*/ TE.TaggedError(
    "MethodNotAllowedException",
    ["BadRequestError"],
    { status: 405 },
  )<{ readonly message?: string }> {}
export class NotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "NotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class TooManyRequestsException
  extends /*@__PURE__*/ TE.TaggedError(
    "TooManyRequestsException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class UnauthorizedException
  extends /*@__PURE__*/ TE.TaggedError("UnauthorizedException", ["AuthError"], {
    status: 401,
  })<{ readonly message?: string }> {}
export type TagSyncTaskArn = string;
export interface CancelTagSyncTaskInput {
  TaskArn: string;
}
export interface CancelTagSyncTaskResponse {}
export type CreateGroupName = string;
export type Description = string;
export type QueryType =
  | "TAG_FILTERS_1_0"
  | "CLOUDFORMATION_STACK_1_0"
  | (string & {});
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
export type GroupLifecycleEventsDesiredStatus =
  | "ACTIVE"
  | "INACTIVE"
  | (string & {});
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
export type ListGroupingStatusesFilterName =
  | "status"
  | "resource-arn"
  | (string & {});
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
export type GroupingStatus =
  | "SUCCESS"
  | "FAILED"
  | "IN_PROGRESS"
  | "SKIPPED"
  | (string & {});
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
  descriptor: {
    service: svc,
    http: "POST /cancel-tag-sync-task",
    input: { TaskArn: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /groups",
    input: {
      Name: 0,
      Description: 0,
      ResourceQuery: i_ResourceQuery,
      Tags: 0,
      Configuration: D.list(i_GroupConfigurationItem),
      Criticality: 0,
      Owner: 0,
      DisplayName: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /delete-group",
    input: { GroupName: 0, Group: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: { service: svc, http: "POST /get-account-settings" },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /get-group",
    input: { GroupName: 0, Group: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /get-group-configuration",
    input: { Group: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /get-group-query",
    input: { GroupName: 0, Group: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "GET /resources/{Arn}/tags",
    input: { Arn: 0 },
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /get-tag-sync-task",
    input: { TaskArn: 0 },
    output: { CreatedAt: D.ts },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /group-resources",
    input: { Group: 0, ResourceArns: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /list-grouping-statuses",
    input: {
      Group: 0,
      MaxResults: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      NextToken: 0,
    },
    output: { GroupingStatuses: D.list({ UpdatedAt: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /list-group-resources",
    input: {
      GroupName: 0,
      Group: 0,
      Filters: D.list({ Name: 0, Values: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /groups-list",
    input: {
      Filters: D.list({ Name: 0, Values: 0 }),
      MaxResults: D.m({ query: "maxResults" }),
      NextToken: D.m({ query: "nextToken" }),
    },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /list-tag-sync-tasks",
    input: {
      Filters: D.list({ GroupArn: 0, GroupName: 0 }),
      MaxResults: 0,
      NextToken: 0,
    },
    output: { TagSyncTasks: D.list({ CreatedAt: D.ts }) },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /put-group-configuration",
    input: { Group: 0, Configuration: D.list(i_GroupConfigurationItem) },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /resources/search",
    input: { ResourceQuery: i_ResourceQuery, MaxResults: 0, NextToken: 0 },
    body: true,
  },
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
  descriptor: {
    service: svc,
    http: "POST /start-tag-sync-task",
    input: {
      Group: 0,
      TagKey: 0,
      TagValue: 0,
      ResourceQuery: i_ResourceQuery,
      RoleArn: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PUT /resources/{Arn}/tags",
    input: { Arn: 0, Tags: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /ungroup-resources",
    input: { Group: 0, ResourceArns: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "PATCH /resources/{Arn}/tags",
    input: { Arn: 0, Keys: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /update-account-settings",
    input: { GroupLifecycleEventsDesiredStatus: 0 },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /update-group",
    input: {
      GroupName: 0,
      Group: 0,
      Description: 0,
      Criticality: 0,
      Owner: 0,
      DisplayName: 0,
    },
    body: true,
  },
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
})) as any;

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
  descriptor: {
    service: svc,
    http: "POST /update-group-query",
    input: { GroupName: 0, Group: 0, ResourceQuery: i_ResourceQuery },
    body: true,
  },
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
})) as any;

const i_GroupConfigurationItem: D.LazyStruct = () => ({
  Type: 0,
  Parameters: D.list({ Name: 0, Values: 0 }),
});
const i_ResourceQuery: D.LazyStruct = () => ({ Type: 0, Query: 0 });
