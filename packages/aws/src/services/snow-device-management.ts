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
  sdkId: "Snow Device Management",
  target: "SnowDeviceManagement",
  version: "2021-08-04",
  sigv4: "snow-device-management",
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
                `https://snow-device-management-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://snow-device-management-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://snow-device-management.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://snow-device-management.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
  })<{ readonly message: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
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
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message: string }> {}
export type TaskId = string;
export interface CancelTaskInput {
  taskId: string;
}
export interface CancelTaskOutput {
  taskId?: string;
}
export type TargetList = string[];
export interface Unlock {}
export interface Reboot {}
export type Command =
  | { unlock: Unlock; reboot?: never }
  | { unlock?: never; reboot: Reboot };
export type TaskDescriptionString = string;
export type TagMap = { [key: string]: string | undefined };
export type IdempotencyToken = string;
export interface CreateTaskInput {
  targets: string[];
  command: Command;
  description?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export interface CreateTaskOutput {
  taskId?: string;
  taskArn?: string;
}
export type ManagedDeviceId = string;
export interface DescribeDeviceInput {
  managedDeviceId: string;
}
export type UnlockState = string;
export type PhysicalConnectorType = string;
export type IpAddressAssignment = string;
export interface PhysicalNetworkInterface {
  physicalNetworkInterfaceId?: string;
  physicalConnectorType?: string;
  ipAddressAssignment?: string;
  ipAddress?: string;
  netmask?: string;
  defaultGateway?: string;
  macAddress?: string;
}
export type PhysicalNetworkInterfaceList = PhysicalNetworkInterface[];
export interface Capacity {
  name?: string;
  unit?: string;
  total?: number;
  used?: number;
  available?: number;
}
export type CapacityList = Capacity[];
export interface SoftwareInformation {
  installedVersion?: string;
  installingVersion?: string;
  installState?: string;
}
export interface DescribeDeviceOutput {
  lastReachedOutAt?: Date;
  lastUpdatedAt?: Date;
  tags?: { [key: string]: string | undefined };
  managedDeviceId?: string;
  managedDeviceArn?: string;
  deviceType?: string;
  associatedWithJob?: string;
  deviceState?: string;
  physicalNetworkInterfaces?: PhysicalNetworkInterface[];
  deviceCapacities?: Capacity[];
  software?: SoftwareInformation;
}
export type InstanceIdsList = string[];
export interface DescribeDeviceEc2Input {
  managedDeviceId: string;
  instanceIds: string[];
}
export type InstanceStateName = string;
export interface InstanceState {
  code?: number;
  name?: string;
}
export type AttachmentStatus = string;
export interface EbsInstanceBlockDevice {
  attachTime?: Date;
  deleteOnTermination?: boolean;
  status?: string;
  volumeId?: string;
}
export interface InstanceBlockDeviceMapping {
  deviceName?: string;
  ebs?: EbsInstanceBlockDevice;
}
export type InstanceBlockDeviceMappingList = InstanceBlockDeviceMapping[];
export interface SecurityGroupIdentifier {
  groupId?: string;
  groupName?: string;
}
export type SecurityGroupIdentifierList = SecurityGroupIdentifier[];
export interface CpuOptions {
  coreCount?: number;
  threadsPerCore?: number;
}
export interface Instance {
  imageId?: string;
  amiLaunchIndex?: number;
  instanceId?: string;
  state?: InstanceState;
  instanceType?: string;
  privateIpAddress?: string;
  publicIpAddress?: string;
  createdAt?: Date;
  updatedAt?: Date;
  blockDeviceMappings?: InstanceBlockDeviceMapping[];
  securityGroups?: SecurityGroupIdentifier[];
  cpuOptions?: CpuOptions;
  rootDeviceName?: string;
}
export interface InstanceSummary {
  instance?: Instance;
  lastUpdatedAt?: Date;
}
export type InstanceSummaryList = InstanceSummary[];
export interface DescribeDeviceEc2Output {
  instances?: InstanceSummary[];
}
export interface DescribeExecutionInput {
  taskId: string;
  managedDeviceId: string;
}
export type ExecutionId = string;
export type ExecutionState = string;
export interface DescribeExecutionOutput {
  taskId?: string;
  executionId?: string;
  managedDeviceId?: string;
  state?: string;
  startedAt?: Date;
  lastUpdatedAt?: Date;
}
export interface DescribeTaskInput {
  taskId: string;
}
export type TaskState = string;
export interface DescribeTaskOutput {
  taskId?: string;
  taskArn?: string;
  targets?: string[];
  state?: string;
  createdAt?: Date;
  lastUpdatedAt?: Date;
  completedAt?: Date;
  description?: string;
  tags?: { [key: string]: string | undefined };
}
export type MaxResults = number;
export type NextToken = string;
export interface ListDeviceResourcesInput {
  managedDeviceId: string;
  type?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ResourceSummary {
  resourceType: string;
  arn?: string;
  id?: string;
}
export type ResourceSummaryList = ResourceSummary[];
export interface ListDeviceResourcesOutput {
  resources?: ResourceSummary[];
  nextToken?: string;
}
export type JobId = string;
export interface ListDevicesInput {
  jobId?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface DeviceSummary {
  managedDeviceId?: string;
  managedDeviceArn?: string;
  associatedWithJob?: string;
  tags?: { [key: string]: string | undefined };
}
export type DeviceSummaryList = DeviceSummary[];
export interface ListDevicesOutput {
  devices?: DeviceSummary[];
  nextToken?: string;
}
export interface ListExecutionsInput {
  taskId: string;
  state?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface ExecutionSummary {
  taskId?: string;
  executionId?: string;
  managedDeviceId?: string;
  state?: string;
}
export type ExecutionSummaryList = ExecutionSummary[];
export interface ListExecutionsOutput {
  executions?: ExecutionSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export interface ListTasksInput {
  state?: string;
  maxResults?: number;
  nextToken?: string;
}
export interface TaskSummary {
  taskId: string;
  taskArn?: string;
  state?: string;
  tags?: { [key: string]: string | undefined };
}
export type TaskSummaryList = TaskSummary[];
export interface ListTasksOutput {
  tasks?: TaskSummary[];
  nextToken?: string;
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceResponse {}
export type TagKeys = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceResponse {}
export type CancelTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Sends a cancel request for a specified task. You can cancel a task only if it's still in a
 * `QUEUED` state. Tasks that are already running can't be cancelled.
 *
 * A task might still run if it's processed from the queue before the
 * `CancelTask` operation changes the task's state.
 */
export const cancelTask: API.OperationMethod<
  CancelTaskInput,
  CancelTaskOutput,
  CancelTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /task/{taskId}/cancel",
    input: { taskId: 0 },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CancelTask",
})) as any;

export type CreateTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Instructs one or more devices to start a task, such as unlocking or rebooting.
 */
export const createTask: API.OperationMethod<
  CreateTaskInput,
  CreateTaskOutput,
  CreateTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /task",
    input: {
      targets: 0,
      command: { unlock: {}, reboot: {} },
      description: 0,
      tags: 0,
      clientToken: D.m({ idempotency: true }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateTask",
})) as any;

export type DescribeDeviceError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Checks device-specific information, such as the device type, software version, IP
 * addresses, and lock status.
 */
export const describeDevice: API.OperationMethod<
  DescribeDeviceInput,
  DescribeDeviceOutput,
  DescribeDeviceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /managed-device/{managedDeviceId}/describe",
    input: { managedDeviceId: 0 },
    output: { lastReachedOutAt: D.ts, lastUpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDevice",
})) as any;

export type DescribeDeviceEc2InstancesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Checks the current state of the Amazon EC2 instances. The output is similar to
 * `describeDevice`, but the results are sourced from the device cache in the
 * Amazon Web Services Cloud and include a subset of the available fields.
 */
export const describeDeviceEc2Instances: API.OperationMethod<
  DescribeDeviceEc2Input,
  DescribeDeviceEc2Output,
  DescribeDeviceEc2InstancesError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /managed-device/{managedDeviceId}/resources/ec2/describe",
    input: { managedDeviceId: 0, instanceIds: 0 },
    output: {
      instances: D.list({
        instance: {
          createdAt: D.ts,
          updatedAt: D.ts,
          blockDeviceMappings: D.list({ ebs: { attachTime: D.ts } }),
        },
        lastUpdatedAt: D.ts,
      }),
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeDeviceEc2Instances",
})) as any;

export type DescribeExecutionError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Checks the status of a remote task running on one or more target devices.
 */
export const describeExecution: API.OperationMethod<
  DescribeExecutionInput,
  DescribeExecutionOutput,
  DescribeExecutionError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /task/{taskId}/execution/{managedDeviceId}",
    input: { taskId: 0, managedDeviceId: 0 },
    output: { startedAt: D.ts, lastUpdatedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeExecution",
})) as any;

export type DescribeTaskError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Checks the metadata for a given task on a device.
 */
export const describeTask: API.OperationMethod<
  DescribeTaskInput,
  DescribeTaskOutput,
  DescribeTaskError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /task/{taskId}",
    input: { taskId: 0 },
    output: { createdAt: D.ts, lastUpdatedAt: D.ts, completedAt: D.ts },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "DescribeTask",
})) as any;

export type ListDeviceResourcesError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of the Amazon Web Services resources available for a device. Currently, Amazon EC2 instances are the only supported resource type.
 */
export const listDeviceResources: API.PaginatedOperationMethod<
  ListDeviceResourcesInput,
  ListDeviceResourcesOutput,
  ListDeviceResourcesError,
  Credentials | HttpClient.HttpClient,
  ResourceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /managed-device/{managedDeviceId}/resources",
    input: {
      managedDeviceId: 0,
      type: D.m({ query: "type" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDeviceResources",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resources",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListDevicesError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all devices on your Amazon Web Services account that have Amazon Web Services Snow Device Management
 * enabled in the Amazon Web Services Region where the command is run.
 */
export const listDevices: API.PaginatedOperationMethod<
  ListDevicesInput,
  ListDevicesOutput,
  ListDevicesError,
  Credentials | HttpClient.HttpClient,
  DeviceSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /managed-devices",
    input: {
      jobId: D.m({ query: "jobId" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListDevices",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "devices",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListExecutionsError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the status of tasks for one or more target devices.
 */
export const listExecutions: API.PaginatedOperationMethod<
  ListExecutionsInput,
  ListExecutionsOutput,
  ListExecutionsError,
  Credentials | HttpClient.HttpClient,
  ExecutionSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /executions",
    input: {
      taskId: D.m({ query: "taskId" }),
      state: D.m({ query: "state" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListExecutions",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "executions",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tags for a managed device or task.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  ListTagsForResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /tags/{resourceArn}",
    input: { resourceArn: 0 },
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

export type ListTasksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tasks that can be filtered by state.
 */
export const listTasks: API.PaginatedOperationMethod<
  ListTasksInput,
  ListTasksOutput,
  ListTasksError,
  Credentials | HttpClient.HttpClient,
  TaskSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /tasks",
    input: {
      state: D.m({ query: "state" }),
      maxResults: D.m({ query: "maxResults" }),
      nextToken: D.m({ query: "nextToken" }),
    },
  },
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "ListTasks",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
})) as any;

export type TagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Adds or replaces tags on a device or task.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceResponse,
  TagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /tags/{resourceArn}",
    input: { resourceArn: 0, tags: 0 },
    body: true,
  },
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "TagResource",
})) as any;

export type UntagResourceError =
  | InternalServerException
  | ResourceNotFoundException
  | ValidationException
  | CommonErrors;
/**
 * Removes a tag from a device or task.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceResponse,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
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
