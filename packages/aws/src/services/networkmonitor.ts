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
  sdkId: "NetworkMonitor",
  serviceShapeName: "NetworkMonitor",
});
const auth = /*@__PURE__*/ T.AwsAuthSigv4({ name: "networkmonitor" });
const ver = /*@__PURE__*/ T.ServiceVersion("2023-08-01");
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
          return err("FIPS is enabled but this partition does not support FIPS");
        }
        if (UseDualStack === true) {
          if (true === _.getAttr(PartitionResult, "supportsDualStack")) {
            return e(
              `https://networkmonitor.${Region}.${_.getAttr(PartitionResult, "dualStackDnsSuffix")}`,
            );
          }
          return err("DualStack is enabled but this partition does not support DualStack");
        }
        return e(`https://networkmonitor.${Region}.${_.getAttr(PartitionResult, "dnsSuffix")}`);
      }
    }
  }
  return err("Invalid Configuration: Missing Region");
}, '{"url":"https://networkmonitor.{R}.{D}","properties":{},"headers":{}}');

export class AccessDeniedException
  extends /*@__PURE__*/ S.TaggedError<AccessDeniedException>()(
    "AccessDeniedException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(403),
  ).pipe(C.withAuthError) {}
export class ConflictException
  extends /*@__PURE__*/ S.TaggedError<ConflictException>()(
    "ConflictException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(409),
  ).pipe(C.withConflictError) {}
export class InternalServerException
  extends /*@__PURE__*/ S.TaggedError<InternalServerException>()(
    "InternalServerException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(/*@__PURE__*/ T.HttpError(500), /*@__PURE__*/ T.Retryable()),
  ).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException
  extends /*@__PURE__*/ S.TaggedError<ResourceNotFoundException>()(
    "ResourceNotFoundException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(404),
  ).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException
  extends /*@__PURE__*/ S.TaggedError<ServiceQuotaExceededException>()(
    "ServiceQuotaExceededException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(402),
  ).pipe(C.withQuotaError) {}
export class ThrottlingException
  extends /*@__PURE__*/ S.TaggedError<ThrottlingException>()(
    "ThrottlingException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.all(
      /*@__PURE__*/ T.HttpError(429),
      /*@__PURE__*/ T.Retryable({ throttling: true }),
    ),
  ).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException
  extends /*@__PURE__*/ S.TaggedError<ValidationException>()(
    "ValidationException",
    { message: /*@__PURE__*/ S.optional(S.String).pipe(/*@__PURE__*/ T.ErrorMessage()) },
    /*@__PURE__*/ T.HttpError(400),
  ).pipe(C.withBadRequestError) {}
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
export type MonitorState = "PENDING" | "ACTIVE" | "INACTIVE" | "ERROR" | "DELETING" | (string & {});
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
 * - `source`--The subnet IDs where the probes will be created.
 *
 * - `destination`-- The target destination IP address for the
 * probe.
 *
 * - `destinationPort`--Required only if the protocol is
 * `TCP`.
 *
 * - `protocol`--The communication protocol between the source and
 * destination. This will be either `TCP` or `ICMP`.
 *
 * - `packetSize`--The size of the packets. This must be a number between
 * `56` and `8500`.
 *
 * - (Optional) `tags` --Key-value pairs created and assigned to the
 * probe.
 */
export const createMonitor: API.OperationMethod<
  CreateMonitorInput,
  CreateMonitorOutput,
  CreateMonitorError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(38, __c9, 2) as any as S.Schema<CreateMonitorInput>,
  output: __S(40, __c10, 0) as any as S.Schema<CreateMonitorOutput>,
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
}));

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
  input: __S(49, __c12, 1) as any as S.Schema<CreateProbeInput>,
  output: __S(52, __c13, 0) as any as S.Schema<CreateProbeOutput>,
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
}));

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
  input: __S(56, __c14, 0) as any as S.Schema<DeleteMonitorInput>,
  output: __S(60, __c15, 0) as any as S.Schema<DeleteMonitorOutput>,
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
}));

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
  input: __S(0, __c0, 0) as any as S.Schema<DeleteProbeInput>,
  output: __S(60, __c15, 0) as any as S.Schema<DeleteProbeOutput>,
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
}));

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
  input: __S(4, __c1, 0) as any as S.Schema<GetMonitorInput>,
  output: __S(6, __c1, 2) as any as S.Schema<GetMonitorOutput>,
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
}));

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
  input: __S(8, __c2, 0) as any as S.Schema<GetProbeInput>,
  output: __S(52, __c13, 0) as any as S.Schema<GetProbeOutput>,
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
}));

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
  input: __S(12, __c3, 0) as any as S.Schema<ListMonitorsInput>,
  output: __S(14, __c3, 2) as any as S.Schema<ListMonitorsOutput>,
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
  input: __S(16, __c4, 0) as any as S.Schema<ListTagsForResourceInput>,
  output: __S(17, __c4, 1) as any as S.Schema<ListTagsForResourceOutput>,
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
}));

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
  input: __S(20, __c5, 0) as any as S.Schema<TagResourceInput>,
  output: __S(60, __c15, 0) as any as S.Schema<TagResourceOutput>,
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
}));

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
  input: __S(25, __c6, 1) as any as S.Schema<UntagResourceInput>,
  output: __S(60, __c15, 0) as any as S.Schema<UntagResourceOutput>,
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
}));

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
  input: __S(28, __c7, 0) as any as S.Schema<UpdateMonitorInput>,
  output: __S(40, __c10, 0) as any as S.Schema<UpdateMonitorOutput>,
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
}));

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
 * - `state`--The state of the probe.
 *
 * - `destination`-- The target destination IP address for the
 * probe.
 *
 * - `destinationPort`--Required only if the protocol is
 * `TCP`.
 *
 * - `protocol`--The communication protocol between the source and
 * destination. This will be either `TCP` or `ICMP`.
 *
 * - `packetSize`--The size of the packets. This must be a number between
 * `56` and `8500`.
 *
 * - (Optional) `tags` --Key-value pairs created and assigned to the
 * probe.
 */
export const updateProbe: API.OperationMethod<
  UpdateProbeInput,
  UpdateProbeOutput,
  UpdateProbeError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ API.make(() => ({
  input: __S(32, __c8, 0) as any as S.Schema<UpdateProbeInput>,
  output: __S(52, __c13, 0) as any as S.Schema<UpdateProbeOutput>,
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
}));

// Schema builders: each runs one schema initializer, on that schema's first use.
function __c0(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          monitorName: S.String.pipe(T.HttpLabel("monitorName")),
          probeId: S.String.pipe(T.HttpLabel("probeId")),
        }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/monitors/{monitorName}/probes/{probeId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteProbeInput" });
  }
}
function __c1(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ monitorName: S.String.pipe(T.HttpLabel("monitorName")) }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/monitors/{monitorName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetMonitorInput" });
    case 1:
      return S.Array(__S(52, __c13, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          monitorArn: S.String,
          monitorName: S.String,
          state: S.String,
          aggregationPeriod: S.Number,
          tags: S.optional(__S(44, __c11, 0)),
          probes: S.optional(__S(5, __c1, 1)),
          createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
          modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
        }),
      ).annotate({ identifier: "GetMonitorOutput" });
  }
}
function __c2(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          monitorName: S.String.pipe(T.HttpLabel("monitorName")),
          probeId: S.String.pipe(T.HttpLabel("probeId")),
        }).pipe(
          T.all(
            T.Http({ method: "GET", uri: "/monitors/{monitorName}/probes/{probeId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "GetProbeInput" });
  }
}
function __c3(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
          maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
          state: S.optional(S.String).pipe(T.HttpQuery("state")),
        }).pipe(T.all(T.Http({ method: "GET", uri: "/monitors" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "ListMonitorsInput" });
    case 1:
      return S.Array(__S(40, __c10, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({ monitors: __S(13, __c3, 1), nextToken: S.optional(S.String) }),
      ).annotate({ identifier: "ListMonitorsOutput" });
  }
}
function __c4(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
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
      ).annotate({ identifier: "ListTagsForResourceInput" });
    case 1:
      return S.suspend(() => S.Struct({ tags: S.optional(__S(44, __c11, 0)) })).annotate({
        identifier: "ListTagsForResourceOutput",
      });
  }
}
function __c5(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tags: __S(44, __c11, 0),
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
      ).annotate({ identifier: "TagResourceInput" });
  }
}
function __c6(j: number): any {
  switch (j) {
    case 0:
      return S.Array(S.String);
    case 1:
      return S.suspend(() =>
        S.Struct({
          resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
          tagKeys: __S(24, __c6, 0).pipe(T.HttpQuery("tagKeys")),
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
      ).annotate({ identifier: "UntagResourceInput" });
  }
}
function __c7(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          monitorName: S.String.pipe(T.HttpLabel("monitorName")),
          aggregationPeriod: S.Number,
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/monitors/{monitorName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateMonitorInput" });
  }
}
function __c8(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          monitorName: S.String.pipe(T.HttpLabel("monitorName")),
          probeId: S.String.pipe(T.HttpLabel("probeId")),
          state: S.optional(S.String),
          destination: S.optional(S.String),
          destinationPort: S.optional(S.Number),
          protocol: S.optional(S.String),
          packetSize: S.optional(S.Number),
        }).pipe(
          T.all(
            T.Http({ method: "PATCH", uri: "/monitors/{monitorName}/probes/{probeId}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "UpdateProbeInput" });
  }
}
function __c9(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceArn: S.String,
          destination: S.String,
          destinationPort: S.optional(S.Number),
          protocol: S.String,
          packetSize: S.optional(S.Number),
          probeTags: S.optional(__S(44, __c11, 0)),
        }),
      ).annotate({ identifier: "CreateMonitorProbeInput" });
    case 1:
      return S.Array(__S(36, __c9, 0));
    case 2:
      return S.suspend(() =>
        S.Struct({
          monitorName: S.String,
          probes: S.optional(__S(37, __c9, 1)),
          aggregationPeriod: S.optional(S.Number),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(44, __c11, 0)),
        }).pipe(T.all(T.Http({ method: "POST", uri: "/monitors" }), svc, auth, proto, ver, rules)),
      ).annotate({ identifier: "CreateMonitorInput" });
  }
}
function __c10(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          monitorArn: S.String,
          monitorName: S.String,
          state: S.String,
          aggregationPeriod: S.optional(S.Number),
          tags: S.optional(__S(44, __c11, 0)),
        }),
      ).annotate({ identifier: "CreateMonitorOutput" });
  }
}
function __c11(j: number): any {
  switch (j) {
    case 0:
      return S.Record(S.String, /*@__PURE__*/ S.String.pipe(S.optional));
  }
}
function __c12(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          sourceArn: S.String,
          destination: S.String,
          destinationPort: S.optional(S.Number),
          protocol: S.String,
          packetSize: S.optional(S.Number),
          tags: S.optional(__S(44, __c11, 0)),
        }),
      ).annotate({ identifier: "ProbeInput" });
    case 1:
      return S.suspend(() =>
        S.Struct({
          monitorName: S.String.pipe(T.HttpLabel("monitorName")),
          probe: __S(48, __c12, 0),
          clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
          tags: S.optional(__S(44, __c11, 0)),
        }).pipe(
          T.all(
            T.Http({ method: "POST", uri: "/monitors/{monitorName}/probes" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "CreateProbeInput" });
  }
}
function __c13(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({
          probeId: S.optional(S.String),
          probeArn: S.optional(S.String),
          sourceArn: S.String,
          destination: S.String,
          destinationPort: S.optional(S.Number),
          protocol: S.String,
          packetSize: S.optional(S.Number),
          addressFamily: S.optional(S.String),
          vpcId: S.optional(S.String),
          state: S.optional(S.String),
          createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
          tags: S.optional(__S(44, __c11, 0)),
        }),
      ).annotate({ identifier: "CreateProbeOutput" });
  }
}
function __c14(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() =>
        S.Struct({ monitorName: S.String.pipe(T.HttpLabel("monitorName")) }).pipe(
          T.all(
            T.Http({ method: "DELETE", uri: "/monitors/{monitorName}" }),
            svc,
            auth,
            proto,
            ver,
            rules,
          ),
        ),
      ).annotate({ identifier: "DeleteMonitorInput" });
  }
}
function __c15(j: number): any {
  switch (j) {
    case 0:
      return S.suspend(() => S.Struct({})).annotate({ identifier: "DeleteMonitorOutput" });
  }
}
// Schema table: entry i is schema j of builder f, made on first reach.
function __S(i: number, f: (j: number) => unknown, j: number): any {
  return (__s[i] ??= __L.at(f, j));
}
