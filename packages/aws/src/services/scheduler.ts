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
  sdkId: "Scheduler",
  target: "AWSChronosService",
  version: "2021-06-30",
  sigv4: "scheduler",
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
                `https://scheduler-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://scheduler-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://scheduler.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://scheduler.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
          );
        }
      }
    }
    return err("Invalid Configuration: Missing Region");
  },
};

export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError(
    "ConflictException",
    ["ConflictError", "RetryableError"],
    { status: 409 },
  )<{ readonly message: string }> {}
export class ExecutionRoleNotAssumable
  extends /*@__PURE__*/ TE.TaggedError("ExecutionRoleNotAssumable", [], {
    synthetic: {
      from: "ValidationException",
      message: {
        includes: "must allow AWS EventBridge Scheduler to assume the role",
      },
    },
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError"],
    { status: 500 },
  )<{ readonly message: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type Name = string;
export type ScheduleGroupName = string;
export type ScheduleExpression = string;
export type StartDate = Date;
export type EndDate = Date;
export type Description = string;
export type ScheduleExpressionTimezone = string;
export type ScheduleState = string;
export type KmsKeyArn = string;
export type TargetArn = string;
export type RoleArn = string;
export type ResourceArn = string;
export interface DeadLetterConfig {
  Arn?: string;
}
export type MaximumEventAgeInSeconds = number;
export type MaximumRetryAttempts = number;
export interface RetryPolicy {
  MaximumEventAgeInSeconds?: number;
  MaximumRetryAttempts?: number;
}
export type TargetInput = string;
export type TaskDefinitionArn = string;
export type TaskCount = number;
export type LaunchType = string;
export type Subnet = string;
export type Subnets = string[];
export type SecurityGroup = string;
export type SecurityGroups = string[];
export type AssignPublicIp = string;
export interface AwsVpcConfiguration {
  Subnets: string[];
  SecurityGroups?: string[];
  AssignPublicIp?: string;
}
export interface NetworkConfiguration {
  awsvpcConfiguration?: AwsVpcConfiguration;
}
export type PlatformVersion = string;
export type Group = string;
export type CapacityProvider = string;
export type CapacityProviderStrategyItemWeight = number;
export type CapacityProviderStrategyItemBase = number;
export interface CapacityProviderStrategyItem {
  capacityProvider: string;
  weight?: number;
  base?: number;
}
export type CapacityProviderStrategy = CapacityProviderStrategyItem[];
export type EnableECSManagedTags = boolean;
export type EnableExecuteCommand = boolean;
export type PlacementConstraintType = string;
export type PlacementConstraintExpression = string;
export interface PlacementConstraint {
  type?: string;
  expression?: string;
}
export type PlacementConstraints = PlacementConstraint[];
export type PlacementStrategyType = string;
export type PlacementStrategyField = string;
export interface PlacementStrategy {
  type?: string;
  field?: string;
}
export type PlacementStrategies = PlacementStrategy[];
export type PropagateTags = string;
export type ReferenceId = string;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export type Tags = { [key: string]: string | undefined }[];
export interface EcsParameters {
  TaskDefinitionArn: string;
  TaskCount?: number;
  LaunchType?: string;
  NetworkConfiguration?: NetworkConfiguration;
  PlatformVersion?: string;
  Group?: string;
  CapacityProviderStrategy?: CapacityProviderStrategyItem[];
  EnableECSManagedTags?: boolean;
  EnableExecuteCommand?: boolean;
  PlacementConstraints?: PlacementConstraint[];
  PlacementStrategy?: PlacementStrategy[];
  PropagateTags?: string;
  ReferenceId?: string;
  Tags?: { [key: string]: string | undefined }[];
}
export type DetailType = string;
export type Source = string;
export interface EventBridgeParameters {
  DetailType: string;
  Source: string;
}
export type TargetPartitionKey = string;
export interface KinesisParameters {
  PartitionKey: string;
}
export type SageMakerPipelineParameterName = string;
export type SageMakerPipelineParameterValue = string;
export interface SageMakerPipelineParameter {
  Name: string;
  Value: string;
}
export type SageMakerPipelineParameterList = SageMakerPipelineParameter[];
export interface SageMakerPipelineParameters {
  PipelineParameterList?: SageMakerPipelineParameter[];
}
export type MessageGroupId = string;
export interface SqsParameters {
  MessageGroupId?: string;
}
export interface Target {
  Arn: string;
  RoleArn: string;
  DeadLetterConfig?: DeadLetterConfig;
  RetryPolicy?: RetryPolicy;
  Input?: string;
  EcsParameters?: EcsParameters;
  EventBridgeParameters?: EventBridgeParameters;
  KinesisParameters?: KinesisParameters;
  SageMakerPipelineParameters?: SageMakerPipelineParameters;
  SqsParameters?: SqsParameters;
}
export type FlexibleTimeWindowMode = string;
export type MaximumWindowInMinutes = number;
export interface FlexibleTimeWindow {
  Mode: string;
  MaximumWindowInMinutes?: number;
}
export type ClientToken = string;
export type ActionAfterCompletion = string;
export interface CreateScheduleInput {
  Name: string;
  GroupName?: string;
  ScheduleExpression: string;
  StartDate?: Date;
  EndDate?: Date;
  Description?: string;
  ScheduleExpressionTimezone?: string;
  State?: string;
  KmsKeyArn?: string;
  Target: Target;
  FlexibleTimeWindow: FlexibleTimeWindow;
  ClientToken?: string;
  ActionAfterCompletion?: string;
}
export type ScheduleArn = string;
export interface CreateScheduleOutput {
  ScheduleArn: string;
}
export interface Tag {
  Key: string;
  Value: string;
}
export type TagList = Tag[];
export interface CreateScheduleGroupInput {
  Name: string;
  Tags?: Tag[];
  ClientToken?: string;
}
export type ScheduleGroupArn = string;
export interface CreateScheduleGroupOutput {
  ScheduleGroupArn: string;
}
export interface DeleteScheduleInput {
  Name: string;
  GroupName?: string;
  ClientToken?: string;
}
export interface DeleteScheduleOutput {}
export interface DeleteScheduleGroupInput {
  Name: string;
  ClientToken?: string;
}
export interface DeleteScheduleGroupOutput {}
export interface GetScheduleInput {
  Name: string;
  GroupName?: string;
}
export type CreationDate = Date;
export type LastModificationDate = Date;
export interface GetScheduleOutput {
  Arn?: string;
  GroupName?: string;
  Name?: string;
  ScheduleExpression?: string;
  StartDate?: Date;
  EndDate?: Date;
  Description?: string;
  ScheduleExpressionTimezone?: string;
  State?: string;
  CreationDate?: Date;
  LastModificationDate?: Date;
  KmsKeyArn?: string;
  Target?: Target;
  FlexibleTimeWindow?: FlexibleTimeWindow;
  ActionAfterCompletion?: string;
}
export interface GetScheduleGroupInput {
  Name: string;
}
export type ScheduleGroupState = string;
export interface GetScheduleGroupOutput {
  Arn?: string;
  Name?: string;
  State?: string;
  CreationDate?: Date;
  LastModificationDate?: Date;
}
export type ScheduleGroupNamePrefix = string;
export type NextToken = string;
export type MaxResults = number;
export interface ListScheduleGroupsInput {
  NamePrefix?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface ScheduleGroupSummary {
  Arn?: string;
  Name?: string;
  State?: string;
  CreationDate?: Date;
  LastModificationDate?: Date;
}
export type ScheduleGroupList = ScheduleGroupSummary[];
export interface ListScheduleGroupsOutput {
  NextToken?: string;
  ScheduleGroups: ScheduleGroupSummary[];
}
export type NamePrefix = string;
export interface ListSchedulesInput {
  GroupName?: string;
  NamePrefix?: string;
  State?: string;
  NextToken?: string;
  MaxResults?: number;
}
export interface TargetSummary {
  Arn: string;
}
export interface ScheduleSummary {
  Arn?: string;
  Name?: string;
  GroupName?: string;
  State?: string;
  CreationDate?: Date;
  LastModificationDate?: Date;
  Target?: TargetSummary;
}
export type ScheduleList = ScheduleSummary[];
export interface ListSchedulesOutput {
  NextToken?: string;
  Schedules: ScheduleSummary[];
}
export type TagResourceArn = string;
export interface ListTagsForResourceInput {
  ResourceArn: string;
}
export interface ListTagsForResourceOutput {
  Tags?: Tag[];
}
export interface TagResourceInput {
  ResourceArn: string;
  Tags: Tag[];
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  ResourceArn: string;
  TagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateScheduleInput {
  Name: string;
  GroupName?: string;
  ScheduleExpression: string;
  StartDate?: Date;
  EndDate?: Date;
  Description?: string;
  ScheduleExpressionTimezone?: string;
  State?: string;
  KmsKeyArn?: string;
  Target: Target;
  FlexibleTimeWindow: FlexibleTimeWindow;
  ClientToken?: string;
  ActionAfterCompletion?: string;
}
export interface UpdateScheduleOutput {
  ScheduleArn: string;
}
export type CreateScheduleError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | ExecutionRoleNotAssumable
  | CommonErrors;
/**
 * Creates the specified schedule.
 */
export const createSchedule: API.OperationMethod<
  CreateScheduleInput,
  CreateScheduleOutput,
  CreateScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /schedules/{Name}",
    input: {
      Name: 0,
      GroupName: 0,
      ScheduleExpression: 0,
      StartDate: 0,
      EndDate: 0,
      Description: 0,
      ScheduleExpressionTimezone: 0,
      State: 0,
      KmsKeyArn: 0,
      Target: i_Target,
      FlexibleTimeWindow: i_FlexibleTimeWindow,
      ClientToken: D.m({ idempotency: true }),
      ActionAfterCompletion: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
    ExecutionRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateSchedule",
})) as any;

export type CreateScheduleGroupError =
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates the specified schedule group.
 */
export const createScheduleGroup: API.OperationMethod<
  CreateScheduleGroupInput,
  CreateScheduleGroupOutput,
  CreateScheduleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /schedule-groups/{Name}",
    input: {
      Name: 0,
      Tags: D.list(i_Tag),
      ClientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateScheduleGroup",
})) as any;

export type DeleteScheduleError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified schedule.
 */
export const deleteSchedule: API.OperationMethod<
  DeleteScheduleInput,
  DeleteScheduleOutput,
  DeleteScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /schedules/{Name}",
    input: {
      Name: 0,
      GroupName: D.m({ query: "groupName" }),
      ClientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteSchedule",
})) as any;

export type DeleteScheduleGroupError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified schedule group. Deleting a schedule group results in EventBridge Scheduler deleting all schedules associated with the group.
 * When you delete a group, it remains in a `DELETING` state until all of its associated schedules are deleted.
 * Schedules associated with the group that are set to run while the schedule group is in the process of being deleted might continue to invoke their targets
 * until the schedule group and its associated schedules are deleted.
 *
 * This operation is eventually consistent.
 */
export const deleteScheduleGroup: API.OperationMethod<
  DeleteScheduleGroupInput,
  DeleteScheduleGroupOutput,
  DeleteScheduleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /schedule-groups/{Name}",
    input: {
      Name: 0,
      ClientToken: D.m({ query: "clientToken", idempotency: true }),
    },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DeleteScheduleGroup",
})) as any;

export type GetScheduleError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified schedule.
 */
export const getSchedule: API.OperationMethod<
  GetScheduleInput,
  GetScheduleOutput,
  GetScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /schedules/{Name}",
    input: { Name: 0, GroupName: D.m({ query: "groupName" }) },
    output: {
      StartDate: D.ts,
      EndDate: D.ts,
      CreationDate: D.ts,
      LastModificationDate: D.ts,
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchedule",
})) as any;

export type GetScheduleGroupError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Retrieves the specified schedule group.
 */
export const getScheduleGroup: API.OperationMethod<
  GetScheduleGroupInput,
  GetScheduleGroupOutput,
  GetScheduleGroupError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /schedule-groups/{Name}",
    input: { Name: 0 },
    output: { CreationDate: D.ts, LastModificationDate: D.ts },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScheduleGroup",
})) as any;

export type ListScheduleGroupsError =
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of your schedule groups.
 */
export const listScheduleGroups: API.PaginatedOperationMethod<
  ListScheduleGroupsInput,
  ListScheduleGroupsOutput,
  ListScheduleGroupsError,
  Credentials | HttpClient.HttpClient,
  ScheduleGroupSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /schedule-groups",
    input: {
      NamePrefix: D.m({ query: "NamePrefix" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: {
      ScheduleGroups: D.list({
        CreationDate: D.ts,
        LastModificationDate: D.ts,
      }),
    },
  },
  errors: [InternalServerException, ThrottlingException, ValidationException],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListScheduleGroups",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "ScheduleGroups",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListSchedulesError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a paginated list of your EventBridge Scheduler schedules.
 */
export const listSchedules: API.PaginatedOperationMethod<
  ListSchedulesInput,
  ListSchedulesOutput,
  ListSchedulesError,
  Credentials | HttpClient.HttpClient,
  ScheduleSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /schedules",
    input: {
      GroupName: D.m({ query: "ScheduleGroup" }),
      NamePrefix: D.m({ query: "NamePrefix" }),
      State: D.m({ query: "State" }),
      NextToken: D.m({ query: "NextToken" }),
      MaxResults: D.m({ query: "MaxResults" }),
    },
    output: {
      Schedules: D.list({ CreationDate: D.ts, LastModificationDate: D.ts }),
    },
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListSchedules",
  pagination: {
    inputToken: "NextToken",
    outputToken: "NextToken",
    items: "Schedules",
    pageSize: "MaxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags associated with the Scheduler resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
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
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
})) as any;

export type TagResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Assigns one or more tags (key-value pairs) to the specified EventBridge Scheduler resource. You can only assign tags to schedule groups.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
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
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes one or more tags from the specified EventBridge Scheduler schedule group.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{ResourceArn}",
    input: { ResourceArn: 0, TagKeys: D.m({ query: "TagKeys" }) },
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UntagResource",
})) as any;

export type UpdateScheduleError =
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | ExecutionRoleNotAssumable
  | CommonErrors;
/**
 * Updates the specified schedule. When you call `UpdateSchedule`, EventBridge Scheduler uses all values, including empty values, specified in the request and
 * overrides the existing schedule. This is by design. This means that if you do not set an optional field in your request, that field will be set to
 * its system-default value after the update.
 *
 * Before calling this operation, we recommend that you call the `GetSchedule` API operation and make a note of all optional parameters
 * for your `UpdateSchedule` call.
 */
export const updateSchedule: API.OperationMethod<
  UpdateScheduleInput,
  UpdateScheduleOutput,
  UpdateScheduleError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PUT /schedules/{Name}",
    input: {
      Name: 0,
      GroupName: 0,
      ScheduleExpression: 0,
      StartDate: 0,
      EndDate: 0,
      Description: 0,
      ScheduleExpressionTimezone: 0,
      State: 0,
      KmsKeyArn: 0,
      Target: i_Target,
      FlexibleTimeWindow: i_FlexibleTimeWindow,
      ClientToken: D.m({ idempotency: true }),
      ActionAfterCompletion: 0,
    },
    body: true,
  },
  errors: [
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
    ExecutionRoleNotAssumable,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "UpdateSchedule",
})) as any;

const i_FlexibleTimeWindow: D.LazyStruct = () => ({
  Mode: 0,
  MaximumWindowInMinutes: 0,
});
const i_Tag: D.LazyStruct = () => ({ Key: 0, Value: 0 });
const i_Target: D.LazyStruct = () => ({
  Arn: 0,
  RoleArn: 0,
  DeadLetterConfig: { Arn: 0 },
  RetryPolicy: { MaximumEventAgeInSeconds: 0, MaximumRetryAttempts: 0 },
  Input: 0,
  EcsParameters: {
    TaskDefinitionArn: 0,
    TaskCount: 0,
    LaunchType: 0,
    NetworkConfiguration: {
      awsvpcConfiguration: { Subnets: 0, SecurityGroups: 0, AssignPublicIp: 0 },
    },
    PlatformVersion: 0,
    Group: 0,
    CapacityProviderStrategy: D.list({
      capacityProvider: 0,
      weight: 0,
      base: 0,
    }),
    EnableECSManagedTags: 0,
    EnableExecuteCommand: 0,
    PlacementConstraints: D.list({ type: 0, expression: 0 }),
    PlacementStrategy: D.list({ type: 0, field: 0 }),
    PropagateTags: 0,
    ReferenceId: 0,
    Tags: 0,
  },
  EventBridgeParameters: { DetailType: 0, Source: 0 },
  KinesisParameters: { PartitionKey: 0 },
  SageMakerPipelineParameters: {
    PipelineParameterList: D.list({ Name: 0, Value: 0 }),
  },
  SqsParameters: { MessageGroupId: 0 },
});
