// ==========================================================================
// HomeGraph API (homegraph v1)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits.ts";
import * as C from "../category.ts";
import type { GCPAuth } from "../auth.ts";
import type { CommonErrors } from "../errors.ts";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "homegraph",
  version: "v1",
  rootUrl: "https://homegraph.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface RequestSyncDevicesRequest {
  /** Required. Third-party user ID. */
  agentUserId?: string;
  /** Optional. If set, the request will be added to a queue and a response will be returned immediately. This enables concurrent requests for the given `agent_user_id`, but the caller will not receive any error responses. */
  async?: boolean;
}

export const RequestSyncDevicesRequest: Schema.Schema<RequestSyncDevicesRequest> = Schema.suspend(() => Schema.Struct({
  agentUserId: Schema.optional(Schema.String),
  async: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RequestSyncDevicesRequest" }) as any as Schema.Schema<RequestSyncDevicesRequest>;

export interface RequestSyncDevicesResponse {
}

export const RequestSyncDevicesResponse: Schema.Schema<RequestSyncDevicesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RequestSyncDevicesResponse" }) as any as Schema.Schema<RequestSyncDevicesResponse>;

export interface ReportStateAndNotificationDevice {
  /** States of devices to update. See the **Device STATES** section of the individual trait [reference guides](https://developers.home.google.com/cloud-to-cloud/traits). */
  states?: Record<string, unknown>;
  /** Notifications metadata for devices. See the **Device NOTIFICATIONS** section of the individual trait [reference guides](https://developers.home.google.com/cloud-to-cloud/traits). */
  notifications?: Record<string, unknown>;
}

export const ReportStateAndNotificationDevice: Schema.Schema<ReportStateAndNotificationDevice> = Schema.suspend(() => Schema.Struct({
  states: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  notifications: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "ReportStateAndNotificationDevice" }) as any as Schema.Schema<ReportStateAndNotificationDevice>;

export interface StateAndNotificationPayload {
  /** The devices for updating state and sending notifications. */
  devices?: ReportStateAndNotificationDevice;
}

export const StateAndNotificationPayload: Schema.Schema<StateAndNotificationPayload> = Schema.suspend(() => Schema.Struct({
  devices: Schema.optional(ReportStateAndNotificationDevice),
})).annotate({ identifier: "StateAndNotificationPayload" }) as any as Schema.Schema<StateAndNotificationPayload>;

export interface ReportStateAndNotificationRequest {
  /** Request ID used for debugging. */
  requestId?: string;
  /** Unique identifier per event (for example, a doorbell press). */
  eventId?: string;
  /** Required. Third-party user ID. */
  agentUserId?: string;
  /** Deprecated. */
  followUpToken?: string;
  /** Required. State of devices to update and notification metadata for devices. */
  payload?: StateAndNotificationPayload;
}

export const ReportStateAndNotificationRequest: Schema.Schema<ReportStateAndNotificationRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  eventId: Schema.optional(Schema.String),
  agentUserId: Schema.optional(Schema.String),
  followUpToken: Schema.optional(Schema.String),
  payload: Schema.optional(StateAndNotificationPayload),
})).annotate({ identifier: "ReportStateAndNotificationRequest" }) as any as Schema.Schema<ReportStateAndNotificationRequest>;

export interface ReportStateAndNotificationResponse {
  /** Request ID copied from ReportStateAndNotificationRequest. */
  requestId?: string;
}

export const ReportStateAndNotificationResponse: Schema.Schema<ReportStateAndNotificationResponse> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "ReportStateAndNotificationResponse" }) as any as Schema.Schema<ReportStateAndNotificationResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface AgentDeviceId {
  /** Third-party device ID. */
  id?: string;
}

export const AgentDeviceId: Schema.Schema<AgentDeviceId> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "AgentDeviceId" }) as any as Schema.Schema<AgentDeviceId>;

export interface QueryRequestPayload {
  /** Third-party device IDs for which to get the device states. */
  devices?: Array<AgentDeviceId>;
}

export const QueryRequestPayload: Schema.Schema<QueryRequestPayload> = Schema.suspend(() => Schema.Struct({
  devices: Schema.optional(Schema.Array(AgentDeviceId)),
})).annotate({ identifier: "QueryRequestPayload" }) as any as Schema.Schema<QueryRequestPayload>;

export interface QueryRequestInput {
  /** Payload containing third-party device IDs. */
  payload?: QueryRequestPayload;
}

export const QueryRequestInput: Schema.Schema<QueryRequestInput> = Schema.suspend(() => Schema.Struct({
  payload: Schema.optional(QueryRequestPayload),
})).annotate({ identifier: "QueryRequestInput" }) as any as Schema.Schema<QueryRequestInput>;

export interface QueryRequest {
  /** Request ID used for debugging. */
  requestId?: string;
  /** Required. Third-party user ID. */
  agentUserId?: string;
  /** Required. Inputs containing third-party device IDs for which to get the device states. */
  inputs?: Array<QueryRequestInput>;
}

export const QueryRequest: Schema.Schema<QueryRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  agentUserId: Schema.optional(Schema.String),
  inputs: Schema.optional(Schema.Array(QueryRequestInput)),
})).annotate({ identifier: "QueryRequest" }) as any as Schema.Schema<QueryRequest>;

export interface QueryResponsePayload {
  /** States of the devices. Map of third-party device ID to struct of device states. */
  devices?: Record<string, Record<string, unknown>>;
}

export const QueryResponsePayload: Schema.Schema<QueryResponsePayload> = Schema.suspend(() => Schema.Struct({
  devices: Schema.optional(Schema.Record(Schema.String, Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "QueryResponsePayload" }) as any as Schema.Schema<QueryResponsePayload>;

export interface QueryResponse {
  /** Request ID used for debugging. Copied from the request. */
  requestId?: string;
  /** Device states for the devices given in the request. */
  payload?: QueryResponsePayload;
}

export const QueryResponse: Schema.Schema<QueryResponse> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  payload: Schema.optional(QueryResponsePayload),
})).annotate({ identifier: "QueryResponse" }) as any as Schema.Schema<QueryResponse>;

export interface SyncRequest {
  /** Request ID used for debugging. */
  requestId?: string;
  /** Required. Third-party user ID. */
  agentUserId?: string;
}

export const SyncRequest: Schema.Schema<SyncRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  agentUserId: Schema.optional(Schema.String),
})).annotate({ identifier: "SyncRequest" }) as any as Schema.Schema<SyncRequest>;

export interface DeviceNames {
  /** Primary name of the device, generally provided by the user. Names will be truncated if over the 60 Unicode code point (character) limit and no errors will be thrown. Developers are responsible for handling long names. */
  name?: string;
  /** Additional names provided by the user for the device. */
  nicknames?: Array<string>;
  /** List of names provided by the manufacturer rather than the user, such as serial numbers, SKUs, etc. */
  defaultNames?: Array<string>;
}

export const DeviceNames: Schema.Schema<DeviceNames> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  nicknames: Schema.optional(Schema.Array(Schema.String)),
  defaultNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "DeviceNames" }) as any as Schema.Schema<DeviceNames>;

export interface DeviceInfo {
  /** Device manufacturer. */
  manufacturer?: string;
  /** Device model. */
  model?: string;
  /** Device hardware version. */
  hwVersion?: string;
  /** Device software version. */
  swVersion?: string;
}

export const DeviceInfo: Schema.Schema<DeviceInfo> = Schema.suspend(() => Schema.Struct({
  manufacturer: Schema.optional(Schema.String),
  model: Schema.optional(Schema.String),
  hwVersion: Schema.optional(Schema.String),
  swVersion: Schema.optional(Schema.String),
})).annotate({ identifier: "DeviceInfo" }) as any as Schema.Schema<DeviceInfo>;

export interface AgentOtherDeviceId {
  /** Project ID for your smart home Action. */
  agentId?: string;
  /** Unique third-party device ID. */
  deviceId?: string;
}

export const AgentOtherDeviceId: Schema.Schema<AgentOtherDeviceId> = Schema.suspend(() => Schema.Struct({
  agentId: Schema.optional(Schema.String),
  deviceId: Schema.optional(Schema.String),
})).annotate({ identifier: "AgentOtherDeviceId" }) as any as Schema.Schema<AgentOtherDeviceId>;

export interface Device {
  /** Third-party device ID. */
  id?: string;
  /** Hardware type of the device. See [device types](https://developers.home.google.com/cloud-to-cloud/guides). */
  type?: string;
  /** Traits supported by the device. See [device traits](https://developers.home.google.com/cloud-to-cloud/traits). */
  traits?: Array<string>;
  /** Names given to this device by your smart home Action. */
  name?: DeviceNames;
  /** Indicates whether your smart home Action will report state of this device to Google via ReportStateAndNotification. */
  willReportState?: boolean;
  /** Suggested name for the room where this device is installed. Google attempts to use this value during user setup. */
  roomHint?: string;
  /** Suggested name for the structure where this device is installed. Google attempts to use this value during user setup. */
  structureHint?: string;
  /** Device manufacturer, model, hardware version, and software version. */
  deviceInfo?: DeviceInfo;
  /** Attributes for the traits supported by the device. */
  attributes?: Record<string, unknown>;
  /** Custom device attributes stored in Home Graph and provided to your smart home Action in each [QUERY](https://developers.home.google.com/cloud-to-cloud/intents/query) and [EXECUTE](https://developers.home.google.com/cloud-to-cloud/intents/execute) intent. Data in this object has a few constraints: No sensitive information, including but not limited to Personally Identifiable Information. */
  customData?: Record<string, unknown>;
  /** Alternate IDs associated with this device. This is used to identify cloud synced devices enabled for [local fulfillment](https://developers.home.google.com/local-home/overview). */
  otherDeviceIds?: Array<AgentOtherDeviceId>;
  /** Indicates whether your smart home Action will report notifications to Google for this device via ReportStateAndNotification. If your smart home Action enables users to control device notifications, you should update this field and call RequestSyncDevices. */
  notificationSupportedByAgent?: boolean;
}

export const Device: Schema.Schema<Device> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  traits: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(DeviceNames),
  willReportState: Schema.optional(Schema.Boolean),
  roomHint: Schema.optional(Schema.String),
  structureHint: Schema.optional(Schema.String),
  deviceInfo: Schema.optional(DeviceInfo),
  attributes: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  customData: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  otherDeviceIds: Schema.optional(Schema.Array(AgentOtherDeviceId)),
  notificationSupportedByAgent: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Device" }) as any as Schema.Schema<Device>;

export interface SyncResponsePayload {
  /** Third-party user ID */
  agentUserId?: string;
  /** Devices associated with the third-party user. */
  devices?: Array<Device>;
}

export const SyncResponsePayload: Schema.Schema<SyncResponsePayload> = Schema.suspend(() => Schema.Struct({
  agentUserId: Schema.optional(Schema.String),
  devices: Schema.optional(Schema.Array(Device)),
})).annotate({ identifier: "SyncResponsePayload" }) as any as Schema.Schema<SyncResponsePayload>;

export interface SyncResponse {
  /** Request ID used for debugging. Copied from the request. */
  requestId?: string;
  /** Devices associated with the third-party user. */
  payload?: SyncResponsePayload;
}

export const SyncResponse: Schema.Schema<SyncResponse> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  payload: Schema.optional(SyncResponsePayload),
})).annotate({ identifier: "SyncResponse" }) as any as Schema.Schema<SyncResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Requests Google to send an `action.devices.SYNC` [intent](https://developers.home.google.com/cloud-to-cloud/intents/sync) to your smart home Action to update device metadata for the given user. The third-party user's identity is passed via the `agent_user_id` (see RequestSyncDevicesRequest). This request must be authorized using service account credentials from your Actions console project. */
export interface RequestSyncDevicesRequest_Op {
  /** Request body */
  body?: RequestSyncDevicesRequest;
}

export const RequestSyncDevicesRequest_Op = Schema.Struct({
  body: Schema.optional(RequestSyncDevicesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/devices:requestSync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RequestSyncDevicesRequest_Op>;

export type RequestSyncDevicesResponse_Op = RequestSyncDevicesResponse;
export const RequestSyncDevicesResponse_Op = RequestSyncDevicesResponse;

export type RequestSyncDevicesError = CommonErrors;

export const requestSyncDevices: API.OperationMethod<RequestSyncDevicesRequest_Op, RequestSyncDevicesResponse_Op, RequestSyncDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RequestSyncDevicesRequest_Op,
  output: RequestSyncDevicesResponse_Op,
  errors: [],
}));

/** Reports device state and optionally sends device notifications. Called by your smart home Action when the state of a third-party device changes or you need to send a notification about the device. See [Implement Report State](https://developers.home.google.com/cloud-to-cloud/integration/report-state) for more information. This method updates the device state according to its declared [traits](https://developers.home.google.com/cloud-to-cloud/primer/device-types-and-traits). Publishing a new state value outside of these traits will result in an `INVALID_ARGUMENT` error response. The third-party user's identity is passed in via the `agent_user_id` (see ReportStateAndNotificationRequest). This request must be authorized using service account credentials from your Actions console project. */
export interface ReportStateAndNotificationDevicesRequest {
  /** Request body */
  body?: ReportStateAndNotificationRequest;
}

export const ReportStateAndNotificationDevicesRequest = Schema.Struct({
  body: Schema.optional(ReportStateAndNotificationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/devices:reportStateAndNotification", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReportStateAndNotificationDevicesRequest>;

export type ReportStateAndNotificationDevicesResponse = ReportStateAndNotificationResponse;
export const ReportStateAndNotificationDevicesResponse = ReportStateAndNotificationResponse;

export type ReportStateAndNotificationDevicesError = CommonErrors;

export const reportStateAndNotificationDevices: API.OperationMethod<ReportStateAndNotificationDevicesRequest, ReportStateAndNotificationDevicesResponse, ReportStateAndNotificationDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReportStateAndNotificationDevicesRequest,
  output: ReportStateAndNotificationDevicesResponse,
  errors: [],
}));

/** Gets the current states in Home Graph for the given set of the third-party user's devices. The third-party user's identity is passed in via the `agent_user_id` (see QueryRequest). This request must be authorized using service account credentials from your Actions console project. */
export interface QueryDevicesRequest {
  /** Request body */
  body?: QueryRequest;
}

export const QueryDevicesRequest = Schema.Struct({
  body: Schema.optional(QueryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/devices:query", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryDevicesRequest>;

export type QueryDevicesResponse = QueryResponse;
export const QueryDevicesResponse = QueryResponse;

export type QueryDevicesError = CommonErrors;

export const queryDevices: API.OperationMethod<QueryDevicesRequest, QueryDevicesResponse, QueryDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryDevicesRequest,
  output: QueryDevicesResponse,
  errors: [],
}));

/** Gets all the devices associated with the given third-party user. The third-party user's identity is passed in via the `agent_user_id` (see SyncRequest). This request must be authorized using service account credentials from your Actions console project. */
export interface SyncDevicesRequest {
  /** Request body */
  body?: SyncRequest;
}

export const SyncDevicesRequest = Schema.Struct({
  body: Schema.optional(SyncRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/devices:sync", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SyncDevicesRequest>;

export type SyncDevicesResponse = SyncResponse;
export const SyncDevicesResponse = SyncResponse;

export type SyncDevicesError = CommonErrors;

export const syncDevices: API.OperationMethod<SyncDevicesRequest, SyncDevicesResponse, SyncDevicesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SyncDevicesRequest,
  output: SyncDevicesResponse,
  errors: [],
}));

/** Unlinks the given third-party user from your smart home Action. All data related to this user will be deleted. For more details on how users link their accounts, see [fulfillment and authentication](https://developers.home.google.com/cloud-to-cloud/primer/fulfillment). The third-party user's identity is passed in via the `agent_user_id` (see DeleteAgentUserRequest). This request must be authorized using service account credentials from your Actions console project. */
export interface DeleteAgentUsersRequest {
  /** Required. Third-party user ID. */
  agentUserId: string;
  /** Request ID used for debugging. */
  requestId?: string;
}

export const DeleteAgentUsersRequest = Schema.Struct({
  agentUserId: Schema.String.pipe(T.HttpPath("agentUserId")),
  requestId: Schema.optional(Schema.String).pipe(T.HttpQuery("requestId")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/agentUsers/{agentUsersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAgentUsersRequest>;

export type DeleteAgentUsersResponse = Empty;
export const DeleteAgentUsersResponse = Empty;

export type DeleteAgentUsersError = CommonErrors;

export const deleteAgentUsers: API.OperationMethod<DeleteAgentUsersRequest, DeleteAgentUsersResponse, DeleteAgentUsersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAgentUsersRequest,
  output: DeleteAgentUsersResponse,
  errors: [],
}));

