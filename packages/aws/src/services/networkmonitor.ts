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
  sdkId: "NetworkMonitor",
  target: "NetworkMonitor",
  version: "2023-08-01",
  sigv4: "networkmonitor",
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
                `https://networkmonitor-fips.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "FIPS and DualStack are enabled, but this partition does not support one or both",
            );
          }
          if (UseFIPS === true) {
            if (_.getAttr(PartitionResult, "supportsFIPS") === true) {
              return e(
                `https://networkmonitor-fips.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
              );
            }
            return err(
              "FIPS is enabled but this partition does not support FIPS",
            );
          }
          if (UseDualStack === true) {
            if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
              return e(
                `https://networkmonitor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
              );
            }
            return err(
              "DualStack is enabled but this partition does not support DualStack",
            );
          }
          return e(
            `https://networkmonitor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`,
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
export class ConflictException
  extends /*@__PURE__*/ TE.TaggedError("ConflictException", ["ConflictError"], {
    status: 409,
  })<{ readonly message?: string }> {}
export class InternalServerException
  extends /*@__PURE__*/ TE.TaggedError(
    "InternalServerException",
    ["ServerError", "RetryableError"],
    { status: 500 },
  )<{ readonly message?: string }> {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ TE.TaggedError(
    "ResourceNotFoundException",
    ["BadRequestError"],
    { status: 404 },
  )<{ readonly message?: string }> {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ TE.TaggedError(
    "ServiceQuotaExceededException",
    ["QuotaError"],
    { status: 402 },
  )<{ readonly message?: string }> {}
export class ThrottlingException
  extends /*@__PURE__*/ TE.TaggedError(
    "ThrottlingException",
    ["ThrottlingError", "RetryableError"],
    { status: 429 },
  )<{ readonly message?: string }> {}
export class ValidationException
  extends /*@__PURE__*/ TE.TaggedError(
    "ValidationException",
    ["BadRequestError"],
    { status: 400 },
  )<{ readonly message?: string }> {}
export type ResourceName = string;
export type Arn = string;
export type Destination = string;
export type Port = number;
export type Protocol = "TCP" | "ICMP" | (string & {});
export type PacketSize = number;
export type TagKey = string;
export type TagValue = string;
export type TagMap = { [key: string]: string | undefined };
export interface CreateMonitorProbeInput {
  sourceArn: string;
  destination: string;
  destinationPort?: number;
  protocol: Protocol;
  packetSize?: number;
  probeTags?: { [key: string]: string | undefined };
}
export type CreateMonitorProbeInputList = CreateMonitorProbeInput[];
export type AggregationPeriod = number;
export interface CreateMonitorInput {
  monitorName: string;
  probes?: CreateMonitorProbeInput[];
  aggregationPeriod?: number;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type MonitorArn = string;
export type MonitorState =
  | "PENDING"
  | "ACTIVE"
  | "INACTIVE"
  | "ERROR"
  | "DELETING"
  | (string & {});
export interface CreateMonitorOutput {
  monitorArn: string;
  monitorName: string;
  state: MonitorState;
  aggregationPeriod?: number;
  tags?: { [key: string]: string | undefined };
}
export interface ProbeInput {
  sourceArn: string;
  destination: string;
  destinationPort?: number;
  protocol: Protocol;
  packetSize?: number;
  tags?: { [key: string]: string | undefined };
}
export interface CreateProbeInput {
  monitorName: string;
  probe: ProbeInput;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export type ProbeId = string;
export type AddressFamily = "IPV4" | "IPV6" | (string & {});
export type VpcId = string;
export type ProbeState =
  | "PENDING"
  | "ACTIVE"
  | "INACTIVE"
  | "ERROR"
  | "DELETING"
  | "DELETED"
  | (string & {});
export type Iso8601Timestamp = Date;
export interface CreateProbeOutput {
  probeId?: string;
  probeArn?: string;
  sourceArn: string;
  destination: string;
  destinationPort?: number;
  protocol: Protocol;
  packetSize?: number;
  addressFamily?: AddressFamily;
  vpcId?: string;
  state?: ProbeState;
  createdAt?: Date;
  modifiedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export interface DeleteMonitorInput {
  monitorName: string;
}
export interface DeleteMonitorOutput {}
export interface DeleteProbeInput {
  monitorName: string;
  probeId: string;
}
export interface DeleteProbeOutput {}
export interface GetMonitorInput {
  monitorName: string;
}
export interface Probe {
  probeId?: string;
  probeArn?: string;
  sourceArn: string;
  destination: string;
  destinationPort?: number;
  protocol: Protocol;
  packetSize?: number;
  addressFamily?: AddressFamily;
  vpcId?: string;
  state?: ProbeState;
  createdAt?: Date;
  modifiedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export type ProbeList = Probe[];
export interface GetMonitorOutput {
  monitorArn: string;
  monitorName: string;
  state: MonitorState;
  aggregationPeriod: number;
  tags?: { [key: string]: string | undefined };
  probes?: Probe[];
  createdAt: Date;
  modifiedAt: Date;
}
export interface GetProbeInput {
  monitorName: string;
  probeId: string;
}
export interface GetProbeOutput {
  probeId?: string;
  probeArn?: string;
  sourceArn: string;
  destination: string;
  destinationPort?: number;
  protocol: Protocol;
  packetSize?: number;
  addressFamily?: AddressFamily;
  vpcId?: string;
  state?: ProbeState;
  createdAt?: Date;
  modifiedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export type PaginationToken = string;
export type MaxResults = number;
export interface ListMonitorsInput {
  nextToken?: string;
  maxResults?: number;
  state?: string;
}
export interface MonitorSummary {
  monitorArn: string;
  monitorName: string;
  state: MonitorState;
  aggregationPeriod?: number;
  tags?: { [key: string]: string | undefined };
}
export type MonitorList = MonitorSummary[];
export interface ListMonitorsOutput {
  monitors: MonitorSummary[];
  nextToken?: string;
}
export interface ListTagsForResourceInput {
  resourceArn: string;
}
export interface ListTagsForResourceOutput {
  tags?: { [key: string]: string | undefined };
}
export interface TagResourceInput {
  resourceArn: string;
  tags: { [key: string]: string | undefined };
}
export interface TagResourceOutput {}
export type TagKeyList = string[];
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export interface UntagResourceOutput {}
export interface UpdateMonitorInput {
  monitorName: string;
  aggregationPeriod: number;
}
export interface UpdateMonitorOutput {
  monitorArn: string;
  monitorName: string;
  state: MonitorState;
  aggregationPeriod?: number;
  tags?: { [key: string]: string | undefined };
}
export interface UpdateProbeInput {
  monitorName: string;
  probeId: string;
  state?: ProbeState;
  destination?: string;
  destinationPort?: number;
  protocol?: Protocol;
  packetSize?: number;
}
export interface UpdateProbeOutput {
  probeId?: string;
  probeArn?: string;
  sourceArn: string;
  destination: string;
  destinationPort?: number;
  protocol: Protocol;
  packetSize?: number;
  addressFamily?: AddressFamily;
  vpcId?: string;
  state?: ProbeState;
  createdAt?: Date;
  modifiedAt?: Date;
  tags?: { [key: string]: string | undefined };
}
export type CreateMonitorError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Creates a monitor between a source subnet and destination IP address. Within a monitor you'll create one or more probes that monitor network traffic between your source Amazon Web Services VPC subnets and your destination IP addresses. Each probe then aggregates and sends metrics to Amazon CloudWatch.
 *
 * You can also create a monitor with probes using this command. For each probe, you
 * define the following:
 *
 * - `source`—The subnet IDs where the probes will be created.
 *
 * - `destination`— The target destination IP address for the
 * probe.
 *
 * - `destinationPort`—Required only if the protocol is
 * `TCP`.
 *
 * - `protocol`—The communication protocol between the source and
 * destination. This will be either `TCP` or `ICMP`.
 *
 * - `packetSize`—The size of the packets. This must be a number between
 * `56` and `8500`.
 *
 * - (Optional) `tags` —Key-value pairs created and assigned to the
 * probe.
 */
export const createMonitor: API.OperationMethod<
  CreateMonitorInput,
  CreateMonitorOutput,
  CreateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /monitors",
    input: {
      monitorName: 0,
      probes: D.list({
        sourceArn: 0,
        destination: 0,
        destinationPort: 0,
        protocol: 0,
        packetSize: 0,
        probeTags: 0,
      }),
      aggregationPeriod: 0,
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    body: true,
  },
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
  protocol: AwsProtocol,
  retry: Retry,
  operationName: "CreateMonitor",
})) as any;

export type CreateProbeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Create a probe within a monitor. Once you create a probe, and it begins monitoring your
 * network traffic, you'll incur billing charges for that probe. This action requires the
 * `monitorName` parameter. Run `ListMonitors` to get a list of
 * monitor names. Note the name of the `monitorName` you want to create the
 * probe for.
 */
export const createProbe: API.OperationMethod<
  CreateProbeInput,
  CreateProbeOutput,
  CreateProbeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "POST /monitors/{monitorName}/probes",
    input: {
      monitorName: 0,
      probe: {
        sourceArn: 0,
        destination: 0,
        destinationPort: 0,
        protocol: 0,
        packetSize: 0,
        tags: 0,
      },
      clientToken: D.m({ idempotency: true }),
      tags: 0,
    },
    output: { createdAt: D.ts, modifiedAt: D.ts },
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
  operationName: "CreateProbe",
})) as any;

export type DeleteMonitorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes a specified monitor.
 *
 * This action requires the `monitorName` parameter. Run
 * `ListMonitors` to get a list of monitor names.
 */
export const deleteMonitor: API.OperationMethod<
  DeleteMonitorInput,
  DeleteMonitorOutput,
  DeleteMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /monitors/{monitorName}",
    input: { monitorName: 0 },
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
  operationName: "DeleteMonitor",
})) as any;

export type DeleteProbeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Deletes the specified probe. Once a probe is deleted you'll no longer incur any billing
 * fees for that probe.
 *
 * This action requires both the `monitorName` and `probeId`
 * parameters. Run `ListMonitors` to get a list of monitor names. Run
 * `GetMonitor` to get a list of probes and probe IDs. You can only delete a
 * single probe at a time using this action.
 */
export const deleteProbe: API.OperationMethod<
  DeleteProbeInput,
  DeleteProbeOutput,
  DeleteProbeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /monitors/{monitorName}/probes/{probeId}",
    input: { monitorName: 0, probeId: 0 },
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
  operationName: "DeleteProbe",
})) as any;

export type GetMonitorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns details about a specific monitor.
 *
 * This action requires the `monitorName` parameter. Run
 * `ListMonitors` to get a list of monitor names.
 */
export const getMonitor: API.OperationMethod<
  GetMonitorInput,
  GetMonitorOutput,
  GetMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /monitors/{monitorName}",
    input: { monitorName: 0 },
    output: {
      probes: D.list({ createdAt: D.ts, modifiedAt: D.ts }),
      createdAt: D.ts,
      modifiedAt: D.ts,
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
  operationName: "GetMonitor",
})) as any;

export type GetProbeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns the details about a probe. This action requires both the
 * `monitorName` and `probeId` parameters. Run
 * `ListMonitors` to get a list of monitor names. Run
 * `GetMonitor` to get a list of probes and probe IDs.
 */
export const getProbe: API.OperationMethod<
  GetProbeInput,
  GetProbeOutput,
  GetProbeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "GET /monitors/{monitorName}/probes/{probeId}",
    input: { monitorName: 0, probeId: 0 },
    output: { createdAt: D.ts, modifiedAt: D.ts },
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
  operationName: "GetProbe",
})) as any;

export type ListMonitorsError =
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Returns a list of all of your monitors.
 */
export const listMonitors: API.PaginatedOperationMethod<
  ListMonitorsInput,
  ListMonitorsOutput,
  ListMonitorsError,
  Credentials | HttpClient.HttpClient,
  MonitorSummary
> = /*@__PURE__*/ API.makePaginated(() => ({
  descriptor: {
    service: svc,
    http: "GET /monitors",
    input: {
      nextToken: D.m({ query: "nextToken" }),
      maxResults: D.m({ query: "maxResults" }),
      state: D.m({ query: "state" }),
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
  operationName: "ListMonitors",
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "monitors",
    pageSize: "maxResults",
  } as const,
})) as any;

export type ListTagsForResourceError =
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Lists the tags assigned to this resource.
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
    AccessDeniedException,
    ConflictException,
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
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Adds key-value pairs to a monitor or probe.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
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
    AccessDeniedException,
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
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Removes a key-value pair from a monitor or probe.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  UntagResourceError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "DELETE /tags/{resourceArn}",
    input: { resourceArn: 0, tagKeys: D.m({ query: "tagKeys" }) },
  },
  errors: [
    AccessDeniedException,
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

export type UpdateMonitorError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates the `aggregationPeriod` for a monitor. Monitors support an
 * `aggregationPeriod` of either `30` or `60` seconds.
 * This action requires the `monitorName` and `probeId` parameter.
 * Run `ListMonitors` to get a list of monitor names.
 */
export const updateMonitor: API.OperationMethod<
  UpdateMonitorInput,
  UpdateMonitorOutput,
  UpdateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /monitors/{monitorName}",
    input: { monitorName: 0, aggregationPeriod: 0 },
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
  operationName: "UpdateMonitor",
})) as any;

export type UpdateProbeError =
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors;
/**
 * Updates a monitor probe. This action requires both the `monitorName` and `probeId` parameters. Run `ListMonitors` to get a list of monitor names. Run `GetMonitor` to get a list of probes and probe IDs.
 *
 * You can update the following para create a monitor with probes using this command. For
 * each probe, you define the following:
 *
 * - `state`—The state of the probe.
 *
 * - `destination`— The target destination IP address for the
 * probe.
 *
 * - `destinationPort`—Required only if the protocol is
 * `TCP`.
 *
 * - `protocol`—The communication protocol between the source and
 * destination. This will be either `TCP` or `ICMP`.
 *
 * - `packetSize`—The size of the packets. This must be a number between
 * `56` and `8500`.
 *
 * - (Optional) `tags` —Key-value pairs created and assigned to the
 * probe.
 */
export const updateProbe: API.OperationMethod<
  UpdateProbeInput,
  UpdateProbeOutput,
  UpdateProbeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  descriptor: {
    service: svc,
    http: "PATCH /monitors/{monitorName}/probes/{probeId}",
    input: {
      monitorName: 0,
      probeId: 0,
      state: 0,
      destination: 0,
      destinationPort: 0,
      protocol: 0,
      packetSize: 0,
    },
    output: { createdAt: D.ts, modifiedAt: D.ts },
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
  operationName: "UpdateProbe",
})) as any;
