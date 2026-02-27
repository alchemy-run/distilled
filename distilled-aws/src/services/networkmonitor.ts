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
  sdkId: "NetworkMonitor",
  serviceShapeName: "NetworkMonitor",
});
const auth = T.AwsAuthSigv4({ name: "networkmonitor" });
const ver = T.ServiceVersion("2023-08-01");
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
});

//# Newtypes
export type Arn = string;
export type TagKey = string;
export type TagValue = string;
export type ResourceName = string;
export type Destination = string;
export type Port = number;
export type PacketSize = number;
export type AggregationPeriod = number;
export type MonitorArn = string;
export type ProbeId = string;
export type VpcId = string;
export type Iso8601Timestamp = Date;
export type PaginationToken = string;
export type MaxResults = number;

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
export interface TagResourceOutput {}
export const TagResourceOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "TagResourceOutput",
}) as any as S.Schema<TagResourceOutput>;
export type TagKeyList = string[];
export const TagKeyList = S.Array(S.String);
export interface UntagResourceInput {
  resourceArn: string;
  tagKeys: string[];
}
export const UntagResourceInput = S.suspend(() =>
  S.Struct({
    resourceArn: S.String.pipe(T.HttpLabel("resourceArn")),
    tagKeys: TagKeyList.pipe(T.HttpQuery("tagKeys")),
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
export interface UntagResourceOutput {}
export const UntagResourceOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "UntagResourceOutput",
}) as any as S.Schema<UntagResourceOutput>;
export type Protocol = "TCP" | "ICMP" | (string & {});
export const Protocol = S.String;
export interface CreateMonitorProbeInput {
  sourceArn: string;
  destination: string;
  destinationPort?: number;
  protocol: Protocol;
  packetSize?: number;
  probeTags?: { [key: string]: string | undefined };
}
export const CreateMonitorProbeInput = S.suspend(() =>
  S.Struct({
    sourceArn: S.String,
    destination: S.String,
    destinationPort: S.optional(S.Number),
    protocol: Protocol,
    packetSize: S.optional(S.Number),
    probeTags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateMonitorProbeInput",
}) as any as S.Schema<CreateMonitorProbeInput>;
export type CreateMonitorProbeInputList = CreateMonitorProbeInput[];
export const CreateMonitorProbeInputList = S.Array(CreateMonitorProbeInput);
export interface CreateMonitorInput {
  monitorName: string;
  probes?: CreateMonitorProbeInput[];
  aggregationPeriod?: number;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateMonitorInput = S.suspend(() =>
  S.Struct({
    monitorName: S.String,
    probes: S.optional(CreateMonitorProbeInputList),
    aggregationPeriod: S.optional(S.Number),
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
  }).pipe(
    T.all(
      T.Http({ method: "POST", uri: "/monitors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "CreateMonitorInput",
}) as any as S.Schema<CreateMonitorInput>;
export type MonitorState =
  | "PENDING"
  | "ACTIVE"
  | "INACTIVE"
  | "ERROR"
  | "DELETING"
  | (string & {});
export const MonitorState = S.String;
export interface CreateMonitorOutput {
  monitorArn: string;
  monitorName: string;
  state: MonitorState;
  aggregationPeriod?: number;
  tags?: { [key: string]: string | undefined };
}
export const CreateMonitorOutput = S.suspend(() =>
  S.Struct({
    monitorArn: S.String,
    monitorName: S.String,
    state: MonitorState,
    aggregationPeriod: S.optional(S.Number),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateMonitorOutput",
}) as any as S.Schema<CreateMonitorOutput>;
export interface GetMonitorInput {
  monitorName: string;
}
export const GetMonitorInput = S.suspend(() =>
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
).annotate({
  identifier: "GetMonitorInput",
}) as any as S.Schema<GetMonitorInput>;
export type AddressFamily = "IPV4" | "IPV6" | (string & {});
export const AddressFamily = S.String;
export type ProbeState =
  | "PENDING"
  | "ACTIVE"
  | "INACTIVE"
  | "ERROR"
  | "DELETING"
  | "DELETED"
  | (string & {});
export const ProbeState = S.String;
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
export const Probe = S.suspend(() =>
  S.Struct({
    probeId: S.optional(S.String),
    probeArn: S.optional(S.String),
    sourceArn: S.String,
    destination: S.String,
    destinationPort: S.optional(S.Number),
    protocol: Protocol,
    packetSize: S.optional(S.Number),
    addressFamily: S.optional(AddressFamily),
    vpcId: S.optional(S.String),
    state: S.optional(ProbeState),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "Probe" }) as any as S.Schema<Probe>;
export type ProbeList = Probe[];
export const ProbeList = S.Array(Probe);
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
export const GetMonitorOutput = S.suspend(() =>
  S.Struct({
    monitorArn: S.String,
    monitorName: S.String,
    state: MonitorState,
    aggregationPeriod: S.Number,
    tags: S.optional(TagMap),
    probes: S.optional(ProbeList),
    createdAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
    modifiedAt: S.Date.pipe(T.TimestampFormat("epoch-seconds")),
  }),
).annotate({
  identifier: "GetMonitorOutput",
}) as any as S.Schema<GetMonitorOutput>;
export interface UpdateMonitorInput {
  monitorName: string;
  aggregationPeriod: number;
}
export const UpdateMonitorInput = S.suspend(() =>
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
).annotate({
  identifier: "UpdateMonitorInput",
}) as any as S.Schema<UpdateMonitorInput>;
export interface UpdateMonitorOutput {
  monitorArn: string;
  monitorName: string;
  state: MonitorState;
  aggregationPeriod?: number;
  tags?: { [key: string]: string | undefined };
}
export const UpdateMonitorOutput = S.suspend(() =>
  S.Struct({
    monitorArn: S.String,
    monitorName: S.String,
    state: MonitorState,
    aggregationPeriod: S.optional(S.Number),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "UpdateMonitorOutput",
}) as any as S.Schema<UpdateMonitorOutput>;
export interface DeleteMonitorInput {
  monitorName: string;
}
export const DeleteMonitorInput = S.suspend(() =>
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
).annotate({
  identifier: "DeleteMonitorInput",
}) as any as S.Schema<DeleteMonitorInput>;
export interface DeleteMonitorOutput {}
export const DeleteMonitorOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteMonitorOutput",
}) as any as S.Schema<DeleteMonitorOutput>;
export interface ListMonitorsInput {
  nextToken?: string;
  maxResults?: number;
  state?: string;
}
export const ListMonitorsInput = S.suspend(() =>
  S.Struct({
    nextToken: S.optional(S.String).pipe(T.HttpQuery("nextToken")),
    maxResults: S.optional(S.Number).pipe(T.HttpQuery("maxResults")),
    state: S.optional(S.String).pipe(T.HttpQuery("state")),
  }).pipe(
    T.all(
      T.Http({ method: "GET", uri: "/monitors" }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "ListMonitorsInput",
}) as any as S.Schema<ListMonitorsInput>;
export interface MonitorSummary {
  monitorArn: string;
  monitorName: string;
  state: MonitorState;
  aggregationPeriod?: number;
  tags?: { [key: string]: string | undefined };
}
export const MonitorSummary = S.suspend(() =>
  S.Struct({
    monitorArn: S.String,
    monitorName: S.String,
    state: MonitorState,
    aggregationPeriod: S.optional(S.Number),
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "MonitorSummary" }) as any as S.Schema<MonitorSummary>;
export type MonitorList = MonitorSummary[];
export const MonitorList = S.Array(MonitorSummary);
export interface ListMonitorsOutput {
  monitors: MonitorSummary[];
  nextToken?: string;
}
export const ListMonitorsOutput = S.suspend(() =>
  S.Struct({ monitors: MonitorList, nextToken: S.optional(S.String) }),
).annotate({
  identifier: "ListMonitorsOutput",
}) as any as S.Schema<ListMonitorsOutput>;
export interface ProbeInput {
  sourceArn: string;
  destination: string;
  destinationPort?: number;
  protocol: Protocol;
  packetSize?: number;
  tags?: { [key: string]: string | undefined };
}
export const ProbeInput = S.suspend(() =>
  S.Struct({
    sourceArn: S.String,
    destination: S.String,
    destinationPort: S.optional(S.Number),
    protocol: Protocol,
    packetSize: S.optional(S.Number),
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "ProbeInput" }) as any as S.Schema<ProbeInput>;
export interface CreateProbeInput {
  monitorName: string;
  probe: ProbeInput;
  clientToken?: string;
  tags?: { [key: string]: string | undefined };
}
export const CreateProbeInput = S.suspend(() =>
  S.Struct({
    monitorName: S.String.pipe(T.HttpLabel("monitorName")),
    probe: ProbeInput,
    clientToken: S.optional(S.String).pipe(T.IdempotencyToken()),
    tags: S.optional(TagMap),
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
).annotate({
  identifier: "CreateProbeInput",
}) as any as S.Schema<CreateProbeInput>;
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
export const CreateProbeOutput = S.suspend(() =>
  S.Struct({
    probeId: S.optional(S.String),
    probeArn: S.optional(S.String),
    sourceArn: S.String,
    destination: S.String,
    destinationPort: S.optional(S.Number),
    protocol: Protocol,
    packetSize: S.optional(S.Number),
    addressFamily: S.optional(AddressFamily),
    vpcId: S.optional(S.String),
    state: S.optional(ProbeState),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "CreateProbeOutput",
}) as any as S.Schema<CreateProbeOutput>;
export interface GetProbeInput {
  monitorName: string;
  probeId: string;
}
export const GetProbeInput = S.suspend(() =>
  S.Struct({
    monitorName: S.String.pipe(T.HttpLabel("monitorName")),
    probeId: S.String.pipe(T.HttpLabel("probeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "GET",
        uri: "/monitors/{monitorName}/probes/{probeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({ identifier: "GetProbeInput" }) as any as S.Schema<GetProbeInput>;
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
export const GetProbeOutput = S.suspend(() =>
  S.Struct({
    probeId: S.optional(S.String),
    probeArn: S.optional(S.String),
    sourceArn: S.String,
    destination: S.String,
    destinationPort: S.optional(S.Number),
    protocol: Protocol,
    packetSize: S.optional(S.Number),
    addressFamily: S.optional(AddressFamily),
    vpcId: S.optional(S.String),
    state: S.optional(ProbeState),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagMap),
  }),
).annotate({ identifier: "GetProbeOutput" }) as any as S.Schema<GetProbeOutput>;
export interface UpdateProbeInput {
  monitorName: string;
  probeId: string;
  state?: ProbeState;
  destination?: string;
  destinationPort?: number;
  protocol?: Protocol;
  packetSize?: number;
}
export const UpdateProbeInput = S.suspend(() =>
  S.Struct({
    monitorName: S.String.pipe(T.HttpLabel("monitorName")),
    probeId: S.String.pipe(T.HttpLabel("probeId")),
    state: S.optional(ProbeState),
    destination: S.optional(S.String),
    destinationPort: S.optional(S.Number),
    protocol: S.optional(Protocol),
    packetSize: S.optional(S.Number),
  }).pipe(
    T.all(
      T.Http({
        method: "PATCH",
        uri: "/monitors/{monitorName}/probes/{probeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "UpdateProbeInput",
}) as any as S.Schema<UpdateProbeInput>;
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
export const UpdateProbeOutput = S.suspend(() =>
  S.Struct({
    probeId: S.optional(S.String),
    probeArn: S.optional(S.String),
    sourceArn: S.String,
    destination: S.String,
    destinationPort: S.optional(S.Number),
    protocol: Protocol,
    packetSize: S.optional(S.Number),
    addressFamily: S.optional(AddressFamily),
    vpcId: S.optional(S.String),
    state: S.optional(ProbeState),
    createdAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    modifiedAt: S.optional(S.Date.pipe(T.TimestampFormat("epoch-seconds"))),
    tags: S.optional(TagMap),
  }),
).annotate({
  identifier: "UpdateProbeOutput",
}) as any as S.Schema<UpdateProbeOutput>;
export interface DeleteProbeInput {
  monitorName: string;
  probeId: string;
}
export const DeleteProbeInput = S.suspend(() =>
  S.Struct({
    monitorName: S.String.pipe(T.HttpLabel("monitorName")),
    probeId: S.String.pipe(T.HttpLabel("probeId")),
  }).pipe(
    T.all(
      T.Http({
        method: "DELETE",
        uri: "/monitors/{monitorName}/probes/{probeId}",
      }),
      svc,
      auth,
      proto,
      ver,
      rules,
    ),
  ),
).annotate({
  identifier: "DeleteProbeInput",
}) as any as S.Schema<DeleteProbeInput>;
export interface DeleteProbeOutput {}
export const DeleteProbeOutput = S.suspend(() => S.Struct({})).annotate({
  identifier: "DeleteProbeOutput",
}) as any as S.Schema<DeleteProbeOutput>;

//# Errors
export class AccessDeniedException extends S.TaggedErrorClass<AccessDeniedException>()(
  "AccessDeniedException",
  { message: S.optional(S.String) },
).pipe(C.withAuthError) {}
export class ConflictException extends S.TaggedErrorClass<ConflictException>()(
  "ConflictException",
  { message: S.optional(S.String) },
).pipe(C.withConflictError) {}
export class InternalServerException extends S.TaggedErrorClass<InternalServerException>()(
  "InternalServerException",
  { message: S.optional(S.String) },
  T.Retryable(),
).pipe(C.withServerError, C.withRetryableError) {}
export class ResourceNotFoundException extends S.TaggedErrorClass<ResourceNotFoundException>()(
  "ResourceNotFoundException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ThrottlingException extends S.TaggedErrorClass<ThrottlingException>()(
  "ThrottlingException",
  { message: S.optional(S.String) },
  T.Retryable({ throttling: true }),
).pipe(C.withThrottlingError, C.withRetryableError) {}
export class ValidationException extends S.TaggedErrorClass<ValidationException>()(
  "ValidationException",
  { message: S.optional(S.String) },
).pipe(C.withBadRequestError) {}
export class ServiceQuotaExceededException extends S.TaggedErrorClass<ServiceQuotaExceededException>()(
  "ServiceQuotaExceededException",
  { message: S.optional(S.String) },
).pipe(C.withQuotaError) {}

//# Operations
/**
 * Lists the tags assigned to this resource.
 */
export const listTagsForResource: API.OperationMethod<
  ListTagsForResourceInput,
  ListTagsForResourceOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ListTagsForResourceInput,
  output: ListTagsForResourceOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Adds key-value pairs to a monitor or probe.
 */
export const tagResource: API.OperationMethod<
  TagResourceInput,
  TagResourceOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TagResourceInput,
  output: TagResourceOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Removes a key-value pair from a monitor or probe.
 */
export const untagResource: API.OperationMethod<
  UntagResourceInput,
  UntagResourceOutput,
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UntagResourceInput,
  output: UntagResourceOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | ConflictException
  | InternalServerException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateMonitorInput,
  output: CreateMonitorOutput,
  errors: [
    AccessDeniedException,
    ConflictException,
    InternalServerException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns details about a specific monitor.
 *
 * This action requires the `monitorName` parameter. Run
 * `ListMonitors` to get a list of monitor names.
 */
export const getMonitor: API.OperationMethod<
  GetMonitorInput,
  GetMonitorOutput,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetMonitorInput,
  output: GetMonitorOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Updates the `aggregationPeriod` for a monitor. Monitors support an
 * `aggregationPeriod` of either `30` or `60` seconds.
 * This action requires the `monitorName` and `probeId` parameter.
 * Run `ListMonitors` to get a list of monitor names.
 */
export const updateMonitor: API.OperationMethod<
  UpdateMonitorInput,
  UpdateMonitorOutput,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateMonitorInput,
  output: UpdateMonitorOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Deletes a specified monitor.
 *
 * This action requires the `monitorName` parameter. Run
 * `ListMonitors` to get a list of monitor names.
 */
export const deleteMonitor: API.OperationMethod<
  DeleteMonitorInput,
  DeleteMonitorOutput,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteMonitorInput,
  output: DeleteMonitorOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns a list of all of your monitors.
 */
export const listMonitors: API.OperationMethod<
  ListMonitorsInput,
  ListMonitorsOutput,
  | AccessDeniedException
  | InternalServerException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> & {
  pages: (
    input: ListMonitorsInput,
  ) => stream.Stream<
    ListMonitorsOutput,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
  items: (
    input: ListMonitorsInput,
  ) => stream.Stream<
    MonitorSummary,
    | AccessDeniedException
    | InternalServerException
    | ThrottlingException
    | ValidationException
    | CommonErrors,
    Credentials | Region | HttpClient.HttpClient
  >;
} = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListMonitorsInput,
  output: ListMonitorsOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ThrottlingException,
    ValidationException,
  ],
  pagination: {
    inputToken: "nextToken",
    outputToken: "nextToken",
    items: "monitors",
    pageSize: "maxResults",
  } as const,
}));
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
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProbeInput,
  output: CreateProbeOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
/**
 * Returns the details about a probe. This action requires both the
 * `monitorName` and `probeId` parameters. Run
 * `ListMonitors` to get a list of monitor names. Run
 * `GetMonitor` to get a list of probes and probe IDs.
 */
export const getProbe: API.OperationMethod<
  GetProbeInput,
  GetProbeOutput,
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProbeInput,
  output: GetProbeOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: UpdateProbeInput,
  output: UpdateProbeOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
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
  | AccessDeniedException
  | InternalServerException
  | ResourceNotFoundException
  | ServiceQuotaExceededException
  | ThrottlingException
  | ValidationException
  | CommonErrors,
  Credentials | Region | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProbeInput,
  output: DeleteProbeOutput,
  errors: [
    AccessDeniedException,
    InternalServerException,
    ResourceNotFoundException,
    ServiceQuotaExceededException,
    ThrottlingException,
    ValidationException,
  ],
}));
