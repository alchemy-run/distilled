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
  sdkId: "Snow Device Management",
  serviceShapeName: "SnowDeviceManagement",
});
const auth = T.AwsAuthSigv4({ name: "snow-device-management" });
const ver = T.ServiceVersion("2021-08-04");
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
});

//# Newtypes
export type ManagedDeviceId = string;
export type UnlockState = string;
export type PhysicalConnectorType = string;
export type IpAddressAssignment = string;
export type JobId = string;
export type MaxResults = number;
export type NextToken = string;
export type InstanceStateName = string;
export type AttachmentStatus = string;
export type TaskDescriptionString = string;
export type IdempotencyToken = string;
export type TaskId = string;
export type TaskState = string;
export type ExecutionId = string;
export type ExecutionState = string;

//# Schemas
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export const ListTagsForResourceInput = S.suspend(() =>
  S.Struct({ resourceArn: S.String.pipe(T.HttpLabel("resourceArn")) }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListTagsForResourceInput",
}) as any as S.Schema<ListTagsForResourceInput>;
export type TagMap = { [key: string]: string | undefined };
export const TagMap = S.Record(S.String, S.String.pipe(S.optional));
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export const ListTagsForResourceOutput = S.suspend(() =>
  S.Struct({ tags: S.optional(TagMap) }),
).annotate({
  identifier: "ListTagsForResourceOutput",
}) as any as S.Schema<ListTagsForResourceOutput>;
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export const TagResourceInput = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tags: TagMap,
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "TagResourceInput",
}) as any as S.Schema<TagResourceInput>;
export interface TagResourceResponse {}
export const TagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceResponse",
}) as any as S.Schema<TagResourceResponse>;
export type TagKeys = string[];
export const TagKeys = S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeys.pipe(T.HttpQuery("tagKeys")),
  }).pipe(
    T.all(
      T.Http({ method: "DELETE", uri: "/tags/{resourceArn}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UntagResourceInput",
}) as any as S.Schema<UntagResourceInput>;
export interface UntagResourceResponse {}
export const UntagResourceResponse = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceResponse",
}) as any as S.Schema<UntagResourceResponse>;
export interface DescribeDeviceInput {
  managedDeviceId: string;
}
export const DescribeDeviceInput = S.suspend(() =>
  S.Struct({
    managedDeviceId: S.String.pipe(T.HttpLabel("managedDeviceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/managed-device/{managedDeviceId}/describe",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDeviceInput",
}) as any as S.Schema<DescribeDeviceInput>;
export interface PhysicalNetworkInterface {
  physicalNetworkInterfaceId?: string;
  physicalConnectorType?: string;
  ipAddressAssignment?: string;
  ipAddress?: string;
  netmask?: string;
  defaultGateway?: string;
  macAddress?: string;
}
export const PhysicalNetworkInterface = S.suspend(() =>
  S.Struct({
    physicalNetworkInterfaceId: S.optional(S.String),
    physicalConnectorType: S.optional(S.String),
    ipAddressAssignment: S.optional(S.String),
    ipAddress: S.optional(S.String),
    netmask: S.optional(S.String),
    defaultGateway: S.optional(S.String),
    macAddress: S.optional(S.String),
  }),
).annotate({
  identifier: "PhysicalNetworkInterface",
}) as any as S.Schema<PhysicalNetworkInterface>;
export type PhysicalNetworkInterfaceList = PhysicalNetworkInterface[];
export const PhysicalNetworkInterfaceList = S.Array(PhysicalNetworkInterface);
export interface Capacity {
  name?: string;
  unit?: string;
  total?: number;
  used?: number;
  available?: number;
}
export const Capacity = S.suspend(() =>
  S.Struct({
    name: S.optional(S.String),
    unit: S.optional(S.String),
    total: S.optional(S.Number),
    used: S.optional(S.Number),
    available: S.optional(S.Number),
  }),
).annotate({ identifier: "Capacity" }) as any as S.Schema<Capacity>;
export type CapacityList = Capacity[];
export const CapacityList = S.Array(Capacity);
export interface SoftwareInformation {
  installedVersion?: string;
  installingVersion?: string;
  installState?: string;
}
export const SoftwareInformation = S.suspend(() =>
  S.Struct({
    installedVersion: S.optional(S.String),
    installingVersion: S.optional(S.String),
    installState: S.optional(S.String),
  }),
).annotate({
  identifier: "SoftwareInformation",
}) as any as S.Schema<SoftwareInformation>;
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
export const DescribeDeviceOutput = S.suspend(() =>
  S.Struct({
    lastReachedOutAt: S.optional(
      S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    ),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagMap),
    managedDeviceId: S.optional(S.String),
    managedDeviceArn: S.optional(S.String),
    deviceType: S.optional(S.String),
    associatedWithJob: S.optional(S.String),
    deviceState: S.optional(S.String),
    physicalNetworkInterfaces: S.optional(PhysicalNetworkInterfaceList),
    deviceCapacities: S.optional(CapacityList),
    software: S.optional(SoftwareInformation),
  }),
).annotate({
  identifier: "DescribeDeviceOutput",
}) as any as S.Schema<DescribeDeviceOutput>;
export interface ListDevicesInput {
  jobId?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListDevicesInput = S.suspend(() =>
  S.Struct({
    jobId: S.optional(S.String).pipe(T.HttpQuery("jobId")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/managed-devices" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDevicesInput",
}) as any as S.Schema<ListDevicesInput>;
export interface DeviceSummary {
  managedDeviceId?: string;
  managedDeviceArn?: string;
  associatedWithJob?: string;
  tags?: { [key: string]: string | undefined };
}
export const DeviceSummary = S.suspend(() =>
  S.Struct({
    managedDeviceId: S.optional(S.String),
    managedDeviceArn: S.optional(S.String),
    associatedWithJob: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "DeviceSummary" }) as any as S.Schema<DeviceSummary>;
export type DeviceSummaryList = DeviceSummary[];
export const DeviceSummaryList = S.Array(DeviceSummary);
export interface ListDevicesOutput {
  devices?: DeviceSummary[];
  nextToken?: string;
}
export const ListDevicesOutput = S.suspend(() =>
  S.Struct({
    devices: S.optional(DeviceSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDevicesOutput",
}) as any as S.Schema<ListDevicesOutput>;
export type InstanceIdsList = string[];
export const InstanceIdsList = S.Array(S.String);
export interface DescribeDeviceEc2Input {
  managedDeviceId: string;
  instanceIds: string[];
}
export const DescribeDeviceEc2Input = S.suspend(() =>
  S.Struct({
    managedDeviceId: S.String.pipe(T.HttpLabel("managedDeviceId")),
    instanceIds: InstanceIdsList,
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/managed-device/{managedDeviceId}/resources/ec2/describe",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeDeviceEc2Input",
}) as any as S.Schema<DescribeDeviceEc2Input>;
export interface InstanceState {
  code?: number;
  name?: string;
}
export const InstanceState = S.suspend(() =>
  S.Struct({ code: S.optional(S.Number), name: S.optional(S.String) }),
).annotate({ identifier: "InstanceState" }) as any as S.Schema<InstanceState>;
export interface EbsInstanceBlockDevice {
  attachTime?: Date;
  deleteOnTermination?: boolean;
  status?: string;
  volumeId?: string;
}
export const EbsInstanceBlockDevice = S.suspend(() =>
  S.Struct({
    attachTime: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    deleteOnTermination: S.optional(S.Boolean),
    status: S.optional(S.String),
    volumeId: S.optional(S.String),
  }),
).annotate({
  identifier: "EbsInstanceBlockDevice",
}) as any as S.Schema<EbsInstanceBlockDevice>;
export interface InstanceBlockDeviceMapping {
  deviceName?: string;
  ebs?: EbsInstanceBlockDevice;
}
export const InstanceBlockDeviceMapping = S.suspend(() =>
  S.Struct({
    deviceName: S.optional(S.String),
    ebs: S.optional(EbsInstanceBlockDevice),
  }),
).annotate({
  identifier: "InstanceBlockDeviceMapping",
}) as any as S.Schema<InstanceBlockDeviceMapping>;
export type InstanceBlockDeviceMappingList = InstanceBlockDeviceMapping[];
export const InstanceBlockDeviceMappingList = S.Array(
  InstanceBlockDeviceMapping,
);
export interface SecurityGroupIdentifier {
  groupId?: string;
  groupName?: string;
}
export const SecurityGroupIdentifier = S.suspend(() =>
  S.Struct({ groupId: S.optional(S.String), groupName: S.optional(S.String) }),
).annotate({
  identifier: "SecurityGroupIdentifier",
}) as any as S.Schema<SecurityGroupIdentifier>;
export type SecurityGroupIdentifierList = SecurityGroupIdentifier[];
export const SecurityGroupIdentifierList = S.Array(SecurityGroupIdentifier);
export interface CpuOptions {
  coreCount?: number;
  threadsPerCore?: number;
}
export const CpuOptions = S.suspend(() =>
  S.Struct({
    coreCount: S.optional(S.Number),
    threadsPerCore: S.optional(S.Number),
  }),
).annotate({ identifier: "CpuOptions" }) as any as S.Schema<CpuOptions>;
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
export const Instance = S.suspend(() =>
  S.Struct({
    imageId: S.optional(S.String),
    amiLaunchIndex: S.optional(S.Number),
    instanceId: S.optional(S.String),
    state: S.optional(InstanceState),
    instanceType: S.optional(S.String),
    privateIpAddress: S.optional(S.String),
    publicIpAddress: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    updatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    blockDeviceMappings: S.optional(InstanceBlockDeviceMappingList),
    securityGroups: S.optional(SecurityGroupIdentifierList),
    cpuOptions: S.optional(CpuOptions),
    rootDeviceName: S.optional(S.String),
  }),
).annotate({ identifier: "Instance" }) as any as S.Schema<Instance>;
export interface InstanceSummary {
  instance?: Instance;
  lastUpdatedAt?: Date;
}
export const InstanceSummary = S.suspend(() =>
  S.Struct({
    instance: S.optional(Instance),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "InstanceSummary",
}) as any as S.Schema<InstanceSummary>;
export type InstanceSummaryList = InstanceSummary[];
export const InstanceSummaryList = S.Array(InstanceSummary);
export interface DescribeDeviceEc2Output {
  instances?: InstanceSummary[];
}
export const DescribeDeviceEc2Output = S.suspend(() =>
  S.Struct({ instances: S.optional(InstanceSummaryList) }),
).annotate({
  identifier: "DescribeDeviceEc2Output",
}) as any as S.Schema<DescribeDeviceEc2Output>;
export interface ListDeviceResourcesInput {
  managedDeviceId: string;
  type?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListDeviceResourcesInput = S.suspend(() =>
  S.Struct({
    managedDeviceId: S.String.pipe(T.HttpLabel("managedDeviceId")),
    type: S.optional(S.String).pipe(T.HttpQuery("type")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/managed-device/{managedDeviceId}/resources",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListDeviceResourcesInput",
}) as any as S.Schema<ListDeviceResourcesInput>;
export interface ResourceSummary {
  resourceType: string;
  arn?: string;
  id?: string;
}
export const ResourceSummary = S.suspend(() =>
  S.Struct({
    resourceType: S.String,
    arn: S.optional(S.String),
    id: S.optional(S.String),
  }),
).annotate({
  identifier: "ResourceSummary",
}) as any as S.Schema<ResourceSummary>;
export type ResourceSummaryList = ResourceSummary[];
export const ResourceSummaryList = S.Array(ResourceSummary);
export interface ListDeviceResourcesOutput {
  resources?: ResourceSummary[];
  nextToken?: string;
}
export const ListDeviceResourcesOutput = S.suspend(() =>
  S.Struct({
    resources: S.optional(ResourceSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListDeviceResourcesOutput",
}) as any as S.Schema<ListDeviceResourcesOutput>;
export type TargetList = string[];
export const TargetList = S.Array(S.String);
export interface Unlock {}
export const Unlock = S.suspend(() => S.Struct({})).annotate({
  identifier: "Unlock",
}) as any as S.Schema<Unlock>;
export interface Reboot {}
export const Reboot = S.suspend(() => S.Struct({})).annotate({
  identifier: "Reboot",
}) as any as S.Schema<Reboot>;
export type Command =
  | { unlock: Unlock; reboot?: never }
  | { unlock?: never; reboot: Reboot };
export const Command = S.Union([
  S.Struct({ unlock: Unlock }),
  S.Struct({ reboot: Reboot }),
]);
export interface CreateTaskInput {
  targets: string[];
  command: Command;
  description?: string;
  tags?: { [key: string]: string | undefined };
  clientToken?: string;
}
export const CreateTaskInput = S.suspend(() =>
  S.Struct({
    targets: TargetList,
    command: Command,
    description: S.optional(S.String),
    tags: S.optional(TagMap),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/task" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateTaskInput",
}) as any as S.Schema<CreateTaskInput>;
export interface CreateTaskOutput {
  taskId?: string;
  taskArn?: string;
}
export const CreateTaskOutput = S.suspend(() =>
  S.Struct({ taskId: S.optional(S.String), taskArn: S.optional(S.String) }),
).annotate({
  identifier: "CreateTaskOutput",
}) as any as S.Schema<CreateTaskOutput>;
export interface DescribeTaskInput {
  taskId: string;
}
export const DescribeTaskInput = S.suspend(() =>
  S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/task/{taskId}" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeTaskInput",
}) as any as S.Schema<DescribeTaskInput>;
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
export const DescribeTaskOutput = S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    taskArn: S.optional(S.String),
    targets: S.optional(TargetList),
    state: S.optional(S.String),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    completedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    description: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "DescribeTaskOutput",
}) as any as S.Schema<DescribeTaskOutput>;
export interface ListTasksInput {
  state?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListTasksInput = S.suspend(() =>
  S.Struct({
    state: S.optional(S.String).pipe(T.HttpQuery("state")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/tasks" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "ListTasksInput" }) as any as S.Schema<ListTasksInput>;
export interface TaskSummary {
  taskId: string;
  taskArn?: string;
  state?: string;
  tags?: { [key: string]: string | undefined };
}
export const TaskSummary = S.suspend(() =>
  S.Struct({
    taskId: S.String,
    taskArn: S.optional(S.String),
    state: S.optional(S.String),
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "TaskSummary" }) as any as S.Schema<TaskSummary>;
export type TaskSummaryList = TaskSummary[];
export const TaskSummaryList = S.Array(TaskSummary);
export interface ListTasksOutput {
  tasks?: TaskSummary[];
  nextToken?: string;
}
export const ListTasksOutput = S.suspend(() =>
  S.Struct({
    tasks: S.optional(TaskSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListTasksOutput",
}) as any as S.Schema<ListTasksOutput>;
export interface CancelTaskInput {
  taskId: string;
}
export const CancelTaskInput = S.suspend(() =>
  S.Struct({ taskId: S.String.pipe(T.HttpLabel("taskId")) }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/task/{taskId}/cancel" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CancelTaskInput",
}) as any as S.Schema<CancelTaskInput>;
export interface CancelTaskOutput {
  taskId?: string;
}
export const CancelTaskOutput = S.suspend(() =>
  S.Struct({ taskId: S.optional(S.String) }),
).annotate({
  identifier: "CancelTaskOutput",
}) as any as S.Schema<CancelTaskOutput>;
export interface DescribeExecutionInput {
  taskId: string;
  managedDeviceId: string;
}
export const DescribeExecutionInput = S.suspend(() =>
  S.Struct({
    taskId: S.String.pipe(T.HttpLabel("taskId")),
    managedDeviceId: S.String.pipe(T.HttpLabel("managedDeviceId")),
  }).pipe(
    T.all(
      T.Http({
        method: "POST",
        uri: "/task/{taskId}/execution/{managedDeviceId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DescribeExecutionInput",
}) as any as S.Schema<DescribeExecutionInput>;
export interface DescribeExecutionOutput {
  taskId?: string;
  executionId?: string;
  managedDeviceId?: string;
  state?: string;
  startedAt?: Date;
  lastUpdatedAt?: Date;
}
export const DescribeExecutionOutput = S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    executionId: S.optional(S.String),
    managedDeviceId: S.optional(S.String),
    state: S.optional(S.String),
    startedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    lastUpdatedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
  }),
).annotate({
  identifier: "DescribeExecutionOutput",
}) as any as S.Schema<DescribeExecutionOutput>;
export interface ListExecutionsInput {
  taskId: string;
  state?: string;
  maxResults?: number;
  nextToken?: string;
}
export const ListExecutionsInput = S.suspend(() =>
  S.Struct({
    taskId: S.String.pipe(T.HttpQuery("taskId")),
    state: S.optional(S.String).pipe(T.HttpQuery("state")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/executions" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListExecutionsInput",
}) as any as S.Schema<ListExecutionsInput>;
export interface ExecutionSummary {
  taskId?: string;
  executionId?: string;
  managedDeviceId?: string;
  state?: string;
}
export const ExecutionSummary = S.suspend(() =>
  S.Struct({
    taskId: S.optional(S.String),
    executionId: S.optional(S.String),
    managedDeviceId: S.optional(S.String),
    state: S.optional(S.String),
  }),
).annotate({
  identifier: "ExecutionSummary",
}) as any as S.Schema<ExecutionSummary>;
export type ExecutionSummaryList = ExecutionSummary[];
export const ExecutionSummaryList = S.Array(ExecutionSummary);
export interface ListExecutionsOutput {
  executions?: ExecutionSummary[];
  nextToken?: string;
}
export const ListExecutionsOutput = S.suspend(() =>
  S.Struct({
    executions: S.optional(ExecutionSummaryList),
    nextToken: S.optional(S.String),
  }),
).annotate({
  identifier: "ListExecutionsOutput",
}) as any as S.Schema<ListExecutionsOutput>;

//# Errors
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { message: S.String },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.String },
).pipe(C.withBadRequestError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.String },
).pipe(C.withBadRequestError) {}
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.String },
).pipe(C.withAuthError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { message: S.String },
  T.Retryable({ throttling: true }),
).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.String },
).pipe(C.withQuotaError) {}

//# Operations
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceResponse,
  errors: [
    InternalServerException,
    ResourceNotFoundException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeDeviceInput,
  output: DescribeDeviceOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
export const listDevices: API.OperationMethod<
  ListDevicesInput,
  ListDevicesOutput,
  ListDevicesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDevicesInput,
  ) => stream.Stream<
    ListDevicesOutput,
    ListDevicesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDevicesInput,
  ) => stream.Stream<
    DeviceSummary,
    ListDevicesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDevicesInput,
  output: ListDevicesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "devices",
    pageSize: "maxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeDeviceEc2Input,
  output: DescribeDeviceEc2Output,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
export const listDeviceResources: API.OperationMethod<
  ListDeviceResourcesInput,
  ListDeviceResourcesOutput,
  ListDeviceResourcesError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListDeviceResourcesInput,
  ) => stream.Stream<
    ListDeviceResourcesOutput,
    ListDeviceResourcesError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListDeviceResourcesInput,
  ) => stream.Stream<
    ResourceSummary,
    ListDeviceResourcesError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListDeviceResourcesInput,
  output: ListDeviceResourcesOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "resources",
    pageSize: "maxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateTaskInput,
  output: CreateTaskOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeTaskInput,
  output: DescribeTaskOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
export type ListTasksError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of tasks that can be filtered by state.
 */
export const listTasks: API.OperationMethod<
  ListTasksInput,
  ListTasksOutput,
  ListTasksError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListTasksInput,
  ) => stream.Stream<
    ListTasksOutput,
    ListTasksError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListTasksInput,
  ) => stream.Stream<
    TaskSummary,
    ListTasksError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTasksInput,
  output: ListTasksOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "tasks",
    pageSize: "maxResults",
  } as const,
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CancelTaskInput,
  output: CancelTaskOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DescribeExecutionInput,
  output: DescribeExecutionOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
export const listExecutions: API.OperationMethod<
  ListExecutionsInput,
  ListExecutionsOutput,
  ListExecutionsError,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListExecutionsInput,
  ) => stream.Stream<
    ListExecutionsOutput,
    ListExecutionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListExecutionsInput,
  ) => stream.Stream<
    ExecutionSummary,
    ListExecutionsError,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListExecutionsInput,
  output: ListExecutionsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "executions",
    pageSize: "maxResults",
  } as const,
}));
