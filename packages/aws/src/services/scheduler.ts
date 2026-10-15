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
const svc = /*@__PURE__*/ T.AwsApiService({
  sdkId: "Scheduler",
  serviceShapeName: "AWSChronosService",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "scheduler" });
const ver = /*@__PURE__*/ T.ServiceVersion("2021-06-30");
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
              `https://scheduler-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err(
            "FIPS and DualStack are enabled, but this partition does not support one or both",
          );
        }
        if (UseFIPS === true) {
          if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
            return e(`https://scheduler-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
          }
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://scheduler.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://scheduler.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://scheduler.{R}.{D}","properties":{},"headers":{}}');

export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError, C.withRetryableError) {}
export class ExecutionRoleNotAssumable
  extends /*@__PURE__*/ S.TaggedError<ExecutionRoleNotAssumable>()(
    "ExecutionRoleNotAssumable",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.SyntheticError({
      from: "ValidationException",
      message: { includes: "must allow AWS EventBridge Scheduler to assume the role" },
    }),
  ) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(500),
  ).pipe(C.withServerError) {}
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
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(429),
  ).pipe(C.withThrottlingError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.String.pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
  input: __S(320, __c10, 0) as any as S.Schema<CreateScheduleInput>,
  output: __S(416, __c13, 0) as any as S.Schema<CreateScheduleOutput>,
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
}));

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
  input: __S(448, __c14, 0) as any as S.Schema<CreateScheduleGroupInput>,
  output: __S(449, __c14, 1) as any as S.Schema<CreateScheduleGroupOutput>,
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
}));

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
  input: __S(512, __c16, 0) as any as S.Schema<DeleteScheduleInput>,
  output: __S(544, __c17, 0) as any as S.Schema<DeleteScheduleOutput>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteScheduleGroupInput>,
  output: __S(544, __c17, 0) as any as S.Schema<DeleteScheduleGroupOutput>,
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
}));

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
  input: __S(32, __c1, 0) as any as S.Schema<GetScheduleInput>,
  output: __S(33, __c1, 1) as any as S.Schema<GetScheduleOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetSchedule",
}));

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
  input: __S(64, __c2, 0) as any as S.Schema<GetScheduleGroupInput>,
  output: __S(96, __c3, 0) as any as S.Schema<GetScheduleGroupOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "GetScheduleGroup",
}));

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
  input: __S(128, __c4, 0) as any as S.Schema<ListScheduleGroupsInput>,
  output: __S(130, __c4, 2) as any as S.Schema<ListScheduleGroupsOutput>,
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
  input: __S(160, __c5, 0) as any as S.Schema<ListSchedulesInput>,
  output: __S(164, __c5, 4) as any as S.Schema<ListSchedulesOutput>,
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
  input: __S(192, __c6, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(193, __c6, 1) as any as S.Schema<ListTagsForResourceOutput>,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTagsForResource",
}));

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
  input: __S(224, __c7, 0) as any as S.Schema<TagResourceInput>,
  output: __S(544, __c17, 0) as any as S.Schema<TagResourceOutput>,
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
}));

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
  input: __S(256, __c8, 0) as any as S.Schema<UntagResourceInput>,
  output: __S(544, __c17, 0) as any as S.Schema<UntagResourceOutput>,
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
}));

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
  input: __S(288, __c9, 0) as any as S.Schema<UpdateScheduleInput>,
  output: __S(416, __c13, 0) as any as S.Schema<UpdateScheduleOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          ClientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/schedule-groups/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteScheduleGroupInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          GroupName: S.optional(S.String).pipe(T.HttpQuery("groupName")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/schedules/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "GetScheduleInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          GroupName: S.optional(S.String),
          Name: S.optional(S.String),
          ScheduleExpression: S.optional(S.String),
          StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          ScheduleExpressionTimezone: S.optional(S.String),
          State: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModificationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          KmsKeyArn: S.optional(S.String),
          Target: S.optional(__S(403, __c12, 19)),
          FlexibleTimeWindow: S.optional(__S(404, __c12, 20)),
          ActionAfterCompletion: S.optional(S.String),
        }),
      ).annotate({ identifier: "GetScheduleOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ Name: S.String.pipe(T.HttpLabel("Name")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/schedule-groups/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetScheduleGroupInput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          State: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModificationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
        }),
      ).annotate({ identifier: "GetScheduleGroupOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          NamePrefix: S.optional(S.String).pipe(T.HttpQuery("NamePrefix")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(
          T.all(T.Http({ method: "GET", uri: "/schedule-groups" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "ListScheduleGroupsInput" });
    case 1:
      return S.Array(__S(96, __c3, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), ScheduleGroups: __S(129, __c4, 1) }),
      ).annotate({ identifier: "ListScheduleGroupsOutput" });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          GroupName: S.optional(S.String).pipe(T.HttpQuery("ScheduleGroup")),
          NamePrefix: S.optional(S.String).pipe(T.HttpQuery("NamePrefix")),
          State: S.optional(S.String).pipe(T.HttpQuery("State")),
          NextToken: S.optional(S.String).pipe(T.HttpQuery("NextToken")),
          MaxResults: S.optional(S.Number).pipe(T.HttpQuery("MaxResults")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/schedules" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListSchedulesInput" });
    case 1:
      return S.suspend(() => S.Struct({ Arn: S.String })).annotate({ identifier: "TargetSummary" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Arn: S.optional(S.String),
          Name: S.optional(S.String),
          GroupName: S.optional(S.String),
          State: S.optional(S.String),
          CreationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          LastModificationDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Target: S.optional(__S(161, __c5, 1)),
        }),
      ).annotate({ identifier: "ScheduleSummary" });
    case 3:
      return S.Array(__S(162, __c5, 2));
    case 4:
      return S.suspend(() =>
        S.Struct({ NextToken: S.optional(S.String), Schedules: __S(163, __c5, 3) }),
      ).annotate({ identifier: "ListSchedulesOutput" });
  }
}
function __c6(j: number): any {
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
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ Tags: S.optional(__S(481, __c15, 1)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          Tags: __S(481, __c15, 1),
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
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          ResourceArn: S.String.pipe(T.HttpLabel("ResourceArn")),
          TagKeys: __S(352, __c11, 0).pipe(T.HttpQuery("TagKeys")),
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
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          GroupName: S.optional(S.String),
          ScheduleExpression: S.String,
          StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          ScheduleExpressionTimezone: S.optional(S.String),
          State: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
          Target: __S(403, __c12, 19),
          FlexibleTimeWindow: __S(404, __c12, 20),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ActionAfterCompletion: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "PUT", uri: "/schedules/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "UpdateScheduleInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          GroupName: S.optional(S.String),
          ScheduleExpression: S.String,
          StartDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          EndDate: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          Description: S.optional(S.String),
          ScheduleExpressionTimezone: S.optional(S.String),
          State: S.optional(S.String),
          KmsKeyArn: S.optional(S.String),
          Target: __S(403, __c12, 19),
          FlexibleTimeWindow: __S(404, __c12, 20),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          ActionAfterCompletion: S.optional(S.String),
        }).pipe(
          T.all(T.Http({ method: "POST", uri: "/schedules/{Name}" }), svc, auth, proto, ver, rules),
        ),
      ).annotate({ identifier: "CreateScheduleInput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Arn: S.optional(S.String) })).annotate({
        identifier: "DeadLetterConfig",
      });
    case 1:
      return S.suspend(() =>
        S.Struct({
          MaximumEventAgeInSeconds: S.optional(S.Number),
          MaximumRetryAttempts: S.optional(S.Number),
        }),
      ).annotate({ identifier: "RetryPolicy" });
    case 2:
      return S.suspend(() =>
        S.Struct({
          Subnets: __S(352, __c11, 0),
          SecurityGroups: S.optional(__S(352, __c11, 0)),
          AssignPublicIp: S.optional(S.String),
        }),
      ).annotate({ identifier: "AwsVpcConfiguration" });
    case 3:
      return S.suspend(() =>
        S.Struct({ awsvpcConfiguration: S.optional(__S(386, __c12, 2)) }),
      ).annotate({ identifier: "NetworkConfiguration" });
    case 4:
      return S.suspend(() =>
        S.Struct({
          capacityProvider: S.String,
          weight: S.optional(S.Number),
          base: S.optional(S.Number),
        }),
      ).annotate({ identifier: "CapacityProviderStrategyItem" });
    case 5:
      return S.Array(__S(388, __c12, 4));
    case 6:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), expression: S.optional(S.String) }),
      ).annotate({ identifier: "PlacementConstraint" });
    case 7:
      return S.Array(__S(390, __c12, 6));
    case 8:
      return S.suspend(() =>
        S.Struct({ type: S.optional(S.String), field: S.optional(S.String) }),
      ).annotate({ identifier: "PlacementStrategy" });
    case 9:
      return S.Array(__S(392, __c12, 8));
    case 10:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
    case 11:
      return S.Array(__S(394, __c12, 10));
    case 12:
      return S.suspend(() =>
        S.Struct({
          TaskDefinitionArn: S.String,
          TaskCount: S.optional(S.Number),
          LaunchType: S.optional(S.String),
          NetworkConfiguration: S.optional(__S(387, __c12, 3)),
          PlatformVersion: S.optional(S.String),
          Group: S.optional(S.String),
          CapacityProviderStrategy: S.optional(__S(389, __c12, 5)),
          EnableECSManagedTags: S.optional(S.Boolean),
          EnableExecuteCommand: S.optional(S.Boolean),
          PlacementConstraints: S.optional(__S(391, __c12, 7)),
          PlacementStrategy: S.optional(__S(393, __c12, 9)),
          PropagateTags: S.optional(S.String),
          ReferenceId: S.optional(S.String),
          Tags: S.optional(__S(395, __c12, 11)),
        }),
      ).annotate({ identifier: "EcsParameters" });
    case 13:
      return S.suspend(() => S.Struct({ DetailType: S.String, Source: S.String })).annotate({
        identifier: "EventBridgeParameters",
      });
    case 14:
      return S.suspend(() => S.Struct({ PartitionKey: S.String })).annotate({
        identifier: "KinesisParameters",
      });
    case 15:
      return S.suspend(() => S.Struct({ Name: S.String, Value: S.String })).annotate({
        identifier: "SageMakerPipelineParameter",
      });
    case 16:
      return S.Array(__S(399, __c12, 15));
    case 17:
      return S.suspend(() =>
        S.Struct({ PipelineParameterList: S.optional(__S(400, __c12, 16)) }),
      ).annotate({ identifier: "SageMakerPipelineParameters" });
    case 18:
      return S.suspend(() => S.Struct({ MessageGroupId: S.optional(S.String) })).annotate({
        identifier: "SqsParameters",
      });
    case 19:
      return S.suspend(() =>
        S.Struct({
          Arn: S.String,
          RoleArn: S.String,
          DeadLetterConfig: S.optional(__S(384, __c12, 0)),
          RetryPolicy: S.optional(__S(385, __c12, 1)),
          Input: S.optional(S.String),
          EcsParameters: S.optional(__S(396, __c12, 12)),
          EventBridgeParameters: S.optional(__S(397, __c12, 13)),
          KinesisParameters: S.optional(__S(398, __c12, 14)),
          SageMakerPipelineParameters: S.optional(__S(401, __c12, 17)),
          SqsParameters: S.optional(__S(402, __c12, 18)),
        }),
      ).annotate({ identifier: "Target" });
    case 20:
      return S.suspend(() =>
        S.Struct({ Mode: S.String, MaximumWindowInMinutes: S.optional(S.Number) }),
      ).annotate({ identifier: "FlexibleTimeWindow" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ ScheduleArn: S.String })).annotate({
        identifier: "CreateScheduleOutput",
      });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          Tags: S.optional(__S(481, __c15, 1)),
          ClientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/schedule-groups/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateScheduleGroupInput" });
    case 1:
      return S.suspend(() => S.Struct({ ScheduleGroupArn: S.String })).annotate({
        identifier: "CreateScheduleGroupOutput",
      });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({ Key: S.String, Value: S.String })).annotate({
        identifier: "Tag",
      });
    case 1:
      return S.Array(__S(480, __c15, 0));
  }
}
function __c16(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          Name: S.String.pipe(T.HttpLabel("Name")),
          GroupName: S.optional(S.String).pipe(T.HttpQuery("groupName")),
          ClientToken: S.optional(S.String).pipe(T.HttpQuery("clientToken"), T.IdempotencyToken()),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/schedules/{Name}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteScheduleInput" });
  }
}
function __c17(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteScheduleOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
