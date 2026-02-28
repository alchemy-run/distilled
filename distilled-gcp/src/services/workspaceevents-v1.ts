// ==========================================================================
// Google Workspace Events API (workspaceevents v1)
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
  name: "workspaceevents",
  version: "v1",
  rootUrl: "https://workspaceevents.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface PayloadOptions {
  /** Optional. Whether the event payload includes data about the resource that changed. For example, for an event where a Google Chat message was created, whether the payload contains data about the [`Message`](https://developers.google.com/chat/api/reference/rest/v1/spaces.messages) resource. If false, the event payload only includes the name of the changed resource. */
  includeResource?: boolean;
  /** Optional. If `include_resource` is set to `true`, the list of fields to include in the event payload. Separate fields with a comma. For example, to include a Google Chat message's sender and create time, enter `message.sender,message.createTime`. If omitted, the payload includes all fields for the resource. If you specify a field that doesn't exist for the resource, the system ignores the field. */
  fieldMask?: string;
}

export const PayloadOptions: Schema.Schema<PayloadOptions> = Schema.suspend(() => Schema.Struct({
  includeResource: Schema.optional(Schema.Boolean),
  fieldMask: Schema.optional(Schema.String),
})).annotate({ identifier: "PayloadOptions" }) as any as Schema.Schema<PayloadOptions>;

export interface NotificationEndpoint {
  /** Immutable. The Pub/Sub topic that receives events for the subscription. Format: `projects/{project}/topics/{topic}` You must create the topic in the same Google Cloud project where you create this subscription. Note: The Google Workspace Events API uses [ordering keys](https://cloud.google.com/pubsub/docs/ordering) for the benefit of sequential events. If the Cloud Pub/Sub topic has a [message storage policy](https://cloud.google.com/pubsub/docs/resource-location-restriction#exceptions) configured to exclude the nearest Google Cloud region, publishing events with ordering keys will fail. When the topic receives events, the events are encoded as Pub/Sub messages. For details, see the [Google Cloud Pub/Sub Protocol Binding for CloudEvents](https://github.com/googleapis/google-cloudevents/blob/main/docs/spec/pubsub.md). */
  pubsubTopic?: string;
}

export const NotificationEndpoint: Schema.Schema<NotificationEndpoint> = Schema.suspend(() => Schema.Struct({
  pubsubTopic: Schema.optional(Schema.String),
})).annotate({ identifier: "NotificationEndpoint" }) as any as Schema.Schema<NotificationEndpoint>;

export interface Subscription {
  /** Non-empty default. The timestamp in UTC when the subscription expires. Always displayed on output, regardless of what was used on input. */
  expireTime?: string;
  /** Input only. The time-to-live (TTL) or duration for the subscription. If unspecified or set to `0`, uses the maximum possible duration. */
  ttl?: string;
  /** Identifier. Resource name of the subscription. Format: `subscriptions/{subscription}` */
  name?: string;
  /** Output only. System-assigned unique identifier for the subscription. */
  uid?: string;
  /** Required. Immutable. The Google Workspace resource that's monitored for events, formatted as the [full resource name](https://google.aip.dev/122#full-resource-names). To learn about target resources and the events that they support, see [Supported Google Workspace events](https://developers.google.com/workspace/events#supported-events). A user can only authorize your app to create one subscription for a given target resource. If your app tries to create another subscription with the same user credentials, the request returns an `ALREADY_EXISTS` error. */
  targetResource?: string;
  /** Required. Unordered list. Input for creating a subscription. Otherwise, output only. One or more types of events to receive about the target resource. Formatted according to the CloudEvents specification. The supported event types depend on the target resource of your subscription. For details, see [Supported Google Workspace events](https://developers.google.com/workspace/events/guides#supported-events). By default, you also receive events about the [lifecycle of your subscription](https://developers.google.com/workspace/events/guides/events-lifecycle). You don't need to specify lifecycle events for this field. If you specify an event type that doesn't exist for the target resource, the request returns an HTTP `400 Bad Request` status code. */
  eventTypes?: Array<string>;
  /** Optional. Options about what data to include in the event payload. Only supported for Google Chat and Google Drive events. */
  payloadOptions?: PayloadOptions;
  /** Required. Immutable. The endpoint where the subscription delivers events, such as a Pub/Sub topic. */
  notificationEndpoint?: NotificationEndpoint;
  /** Output only. The state of the subscription. Determines whether the subscription can receive events and deliver them to the notification endpoint. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "SUSPENDED" | "DELETED" | (string & {});
  /** Output only. The error that suspended the subscription. To reactivate the subscription, resolve the error and call the `ReactivateSubscription` method. */
  suspensionReason?: "ERROR_TYPE_UNSPECIFIED" | "USER_SCOPE_REVOKED" | "RESOURCE_DELETED" | "USER_AUTHORIZATION_FAILURE" | "ENDPOINT_PERMISSION_DENIED" | "ENDPOINT_NOT_FOUND" | "ENDPOINT_RESOURCE_EXHAUSTED" | "OTHER" | (string & {});
  /** Output only. The user who authorized the creation of the subscription. When a user authorizes the subscription, this field and the `user_authority` field have the same value and the format is: Format: `users/{user}` For Google Workspace users, the `{user}` value is the [`user.id`](https://developers.google.com/admin-sdk/directory/reference/rest/v1/users#User.FIELDS.ids) field from the Directory API. When a Chat app authorizes the subscription, only `service_account_authority` field populates and this field is empty. */
  authority?: string;
  /** Output only. The time when the subscription is created. */
  createTime?: string;
  /** Output only. The last time that the subscription is updated. */
  updateTime?: string;
  /** Output only. If `true`, the subscription is in the process of being updated. */
  reconciling?: boolean;
  /** Optional. This checksum is computed by the server based on the value of other fields, and might be sent on update requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const Subscription: Schema.Schema<Subscription> = Schema.suspend(() => Schema.Struct({
  expireTime: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  targetResource: Schema.optional(Schema.String),
  eventTypes: Schema.optional(Schema.Array(Schema.String)),
  payloadOptions: Schema.optional(PayloadOptions),
  notificationEndpoint: Schema.optional(NotificationEndpoint),
  state: Schema.optional(Schema.String),
  suspensionReason: Schema.optional(Schema.String),
  authority: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  reconciling: Schema.optional(Schema.Boolean),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Subscription" }) as any as Schema.Schema<Subscription>;

export interface ListSubscriptionsResponse {
  /** List of subscriptions. */
  subscriptions?: Array<Subscription>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListSubscriptionsResponse: Schema.Schema<ListSubscriptionsResponse> = Schema.suspend(() => Schema.Struct({
  subscriptions: Schema.optional(Schema.Array(Subscription)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSubscriptionsResponse" }) as any as Schema.Schema<ListSubscriptionsResponse>;

export interface ReactivateSubscriptionRequest {
}

export const ReactivateSubscriptionRequest: Schema.Schema<ReactivateSubscriptionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ReactivateSubscriptionRequest" }) as any as Schema.Schema<ReactivateSubscriptionRequest>;

export interface FilePart {
  fileWithUri?: string;
  fileWithBytes?: string;
  mimeType?: string;
  name?: string;
}

export const FilePart: Schema.Schema<FilePart> = Schema.suspend(() => Schema.Struct({
  fileWithUri: Schema.optional(Schema.String),
  fileWithBytes: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "FilePart" }) as any as Schema.Schema<FilePart>;

export interface DataPart {
  data?: Record<string, unknown>;
}

export const DataPart: Schema.Schema<DataPart> = Schema.suspend(() => Schema.Struct({
  data: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "DataPart" }) as any as Schema.Schema<DataPart>;

export interface Part {
  text?: string;
  file?: FilePart;
  data?: DataPart;
  /** Optional metadata associated with this part. */
  metadata?: Record<string, unknown>;
}

export const Part: Schema.Schema<Part> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.String),
  file: Schema.optional(FilePart),
  data: Schema.optional(DataPart),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Part" }) as any as Schema.Schema<Part>;

export interface Message {
  /** The unique identifier (e.g. UUID)of the message. This is required and created by the message creator. */
  messageId?: string;
  /** The context id of the message. This is optional and if set, the message will be associated with the given context. */
  contextId?: string;
  /** The task id of the message. This is optional and if set, the message will be associated with the given task. */
  taskId?: string;
  /** A role for the message. */
  role?: "ROLE_UNSPECIFIED" | "ROLE_USER" | "ROLE_AGENT" | (string & {});
  /** protolint:disable REPEATED_FIELD_NAMES_PLURALIZED Content is the container of the message content. */
  content?: Array<Part>;
  /** protolint:enable REPEATED_FIELD_NAMES_PLURALIZED Any optional metadata to provide along with the message. */
  metadata?: Record<string, unknown>;
  /** The URIs of extensions that are present or contributed to this Message. */
  extensions?: Array<string>;
}

export const Message: Schema.Schema<Message> = Schema.suspend(() => Schema.Struct({
  messageId: Schema.optional(Schema.String),
  contextId: Schema.optional(Schema.String),
  taskId: Schema.optional(Schema.String),
  role: Schema.optional(Schema.String),
  content: Schema.optional(Schema.Array(Part)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  extensions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Message" }) as any as Schema.Schema<Message>;

export interface AuthenticationInfo {
  /** Supported authentication schemes - e.g. Basic, Bearer, etc */
  schemes?: Array<string>;
  /** Optional credentials */
  credentials?: string;
}

export const AuthenticationInfo: Schema.Schema<AuthenticationInfo> = Schema.suspend(() => Schema.Struct({
  schemes: Schema.optional(Schema.Array(Schema.String)),
  credentials: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthenticationInfo" }) as any as Schema.Schema<AuthenticationInfo>;

export interface PushNotificationConfig {
  /** A unique identifier (e.g. UUID) for this push notification. */
  id?: string;
  /** Url to send the notification too */
  url?: string;
  /** Token unique for this task/session */
  token?: string;
  /** Information about the authentication to sent with the notification */
  authentication?: AuthenticationInfo;
}

export const PushNotificationConfig: Schema.Schema<PushNotificationConfig> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  token: Schema.optional(Schema.String),
  authentication: Schema.optional(AuthenticationInfo),
})).annotate({ identifier: "PushNotificationConfig" }) as any as Schema.Schema<PushNotificationConfig>;

export interface SendMessageConfiguration {
  /** The output modes that the agent is expected to respond with. */
  acceptedOutputModes?: Array<string>;
  /** A configuration of a webhook that can be used to receive updates */
  pushNotification?: PushNotificationConfig;
  /** The maximum number of messages to include in the history. if 0, the history will be unlimited. */
  historyLength?: number;
  /** If true, the message will be blocking until the task is completed. If false, the message will be non-blocking and the task will be returned immediately. It is the caller's responsibility to check for any task updates. */
  blocking?: boolean;
}

export const SendMessageConfiguration: Schema.Schema<SendMessageConfiguration> = Schema.suspend(() => Schema.Struct({
  acceptedOutputModes: Schema.optional(Schema.Array(Schema.String)),
  pushNotification: Schema.optional(PushNotificationConfig),
  historyLength: Schema.optional(Schema.Number),
  blocking: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SendMessageConfiguration" }) as any as Schema.Schema<SendMessageConfiguration>;

export interface SendMessageRequest {
  /** Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. */
  tenant?: string;
  /** Required. The message to send to the agent. */
  message?: Message;
  /** Configuration for the send request. */
  configuration?: SendMessageConfiguration;
  /** Optional metadata for the request. */
  metadata?: Record<string, unknown>;
}

export const SendMessageRequest: Schema.Schema<SendMessageRequest> = Schema.suspend(() => Schema.Struct({
  tenant: Schema.optional(Schema.String),
  message: Schema.optional(Message),
  configuration: Schema.optional(SendMessageConfiguration),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "SendMessageRequest" }) as any as Schema.Schema<SendMessageRequest>;

export interface TaskStatus {
  /** The current state of this task */
  state?: "TASK_STATE_UNSPECIFIED" | "TASK_STATE_SUBMITTED" | "TASK_STATE_WORKING" | "TASK_STATE_COMPLETED" | "TASK_STATE_FAILED" | "TASK_STATE_CANCELLED" | "TASK_STATE_INPUT_REQUIRED" | "TASK_STATE_REJECTED" | "TASK_STATE_AUTH_REQUIRED" | (string & {});
  /** A message associated with the status. */
  message?: Message;
  /** Timestamp when the status was recorded. Example: "2023-10-27T10:00:00Z" */
  timestamp?: string;
}

export const TaskStatus: Schema.Schema<TaskStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  message: Schema.optional(Message),
  timestamp: Schema.optional(Schema.String),
})).annotate({ identifier: "TaskStatus" }) as any as Schema.Schema<TaskStatus>;

export interface Artifact {
  /** Unique identifier (e.g. UUID) for the artifact. It must be at least unique within a task. */
  artifactId?: string;
  /** A human readable name for the artifact. */
  name?: string;
  /** A human readable description of the artifact, optional. */
  description?: string;
  /** The content of the artifact. */
  parts?: Array<Part>;
  /** Optional metadata included with the artifact. */
  metadata?: Record<string, unknown>;
  /** The URIs of extensions that are present or contributed to this Artifact. */
  extensions?: Array<string>;
}

export const Artifact: Schema.Schema<Artifact> = Schema.suspend(() => Schema.Struct({
  artifactId: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  parts: Schema.optional(Schema.Array(Part)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  extensions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Artifact" }) as any as Schema.Schema<Artifact>;

export interface Task {
  /** Unique identifier (e.g. UUID) for the task, generated by the server for a new task. */
  id?: string;
  /** Unique identifier (e.g. UUID) for the contextual collection of interactions (tasks and messages). Created by the A2A server. */
  contextId?: string;
  /** The current status of a Task, including state and a message. */
  status?: TaskStatus;
  /** A set of output artifacts for a Task. */
  artifacts?: Array<Artifact>;
  /** protolint:disable REPEATED_FIELD_NAMES_PLURALIZED The history of interactions from a task. */
  history?: Array<Message>;
  /** protolint:enable REPEATED_FIELD_NAMES_PLURALIZED A key/value object to store custom metadata about a task. */
  metadata?: Record<string, unknown>;
}

export const Task: Schema.Schema<Task> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  contextId: Schema.optional(Schema.String),
  status: Schema.optional(TaskStatus),
  artifacts: Schema.optional(Schema.Array(Artifact)),
  history: Schema.optional(Schema.Array(Message)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Task" }) as any as Schema.Schema<Task>;

export interface TaskStatusUpdateEvent {
  /** The id of the task that is changed */
  taskId?: string;
  /** The id of the context that the task belongs to */
  contextId?: string;
  /** The new status of the task. */
  status?: TaskStatus;
  /** Whether this is the last status update expected for this task. */
  final?: boolean;
  /** Optional metadata to associate with the task update. */
  metadata?: Record<string, unknown>;
}

export const TaskStatusUpdateEvent: Schema.Schema<TaskStatusUpdateEvent> = Schema.suspend(() => Schema.Struct({
  taskId: Schema.optional(Schema.String),
  contextId: Schema.optional(Schema.String),
  status: Schema.optional(TaskStatus),
  final: Schema.optional(Schema.Boolean),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "TaskStatusUpdateEvent" }) as any as Schema.Schema<TaskStatusUpdateEvent>;

export interface TaskArtifactUpdateEvent {
  /** The id of the task for this artifact */
  taskId?: string;
  /** The id of the context that this task belongs too */
  contextId?: string;
  /** The artifact itself */
  artifact?: Artifact;
  /** Whether this should be appended to a prior one produced */
  append?: boolean;
  /** Whether this represents the last part of an artifact */
  lastChunk?: boolean;
  /** Optional metadata associated with the artifact update. */
  metadata?: Record<string, unknown>;
}

export const TaskArtifactUpdateEvent: Schema.Schema<TaskArtifactUpdateEvent> = Schema.suspend(() => Schema.Struct({
  taskId: Schema.optional(Schema.String),
  contextId: Schema.optional(Schema.String),
  artifact: Schema.optional(Artifact),
  append: Schema.optional(Schema.Boolean),
  lastChunk: Schema.optional(Schema.Boolean),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "TaskArtifactUpdateEvent" }) as any as Schema.Schema<TaskArtifactUpdateEvent>;

export interface StreamResponse {
  task?: Task;
  message?: Message;
  statusUpdate?: TaskStatusUpdateEvent;
  artifactUpdate?: TaskArtifactUpdateEvent;
}

export const StreamResponse: Schema.Schema<StreamResponse> = Schema.suspend(() => Schema.Struct({
  task: Schema.optional(Task),
  message: Schema.optional(Message),
  statusUpdate: Schema.optional(TaskStatusUpdateEvent),
  artifactUpdate: Schema.optional(TaskArtifactUpdateEvent),
})).annotate({ identifier: "StreamResponse" }) as any as Schema.Schema<StreamResponse>;

export interface CancelTaskRequest {
  /** Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. */
  tenant?: string;
}

export const CancelTaskRequest: Schema.Schema<CancelTaskRequest> = Schema.suspend(() => Schema.Struct({
  tenant: Schema.optional(Schema.String),
})).annotate({ identifier: "CancelTaskRequest" }) as any as Schema.Schema<CancelTaskRequest>;

export interface TaskPushNotificationConfig {
  /** The resource name of the config. Format: tasks/{task_id}/pushNotificationConfigs/{config_id} */
  name?: string;
  /** The push notification configuration details. */
  pushNotificationConfig?: PushNotificationConfig;
}

export const TaskPushNotificationConfig: Schema.Schema<TaskPushNotificationConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  pushNotificationConfig: Schema.optional(PushNotificationConfig),
})).annotate({ identifier: "TaskPushNotificationConfig" }) as any as Schema.Schema<TaskPushNotificationConfig>;

export interface ListTaskPushNotificationConfigResponse {
  /** The list of push notification configurations. */
  configs?: Array<TaskPushNotificationConfig>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListTaskPushNotificationConfigResponse: Schema.Schema<ListTaskPushNotificationConfigResponse> = Schema.suspend(() => Schema.Struct({
  configs: Schema.optional(Schema.Array(TaskPushNotificationConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTaskPushNotificationConfigResponse" }) as any as Schema.Schema<ListTaskPushNotificationConfigResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = Operation;
export const GetOperationsResponse = Operation;

export type GetOperationsError = CommonErrors;

export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

/** Creates a Google Workspace subscription. To learn how to use this method, see [Create a Google Workspace subscription](https://developers.google.com/workspace/events/guides/create-subscription). For a subscription on a [Chat target resource](https://developers.google.com/workspace/events/guides/events-chat), you can create a subscription as: - A Chat app by specifying an authorization scope that begins with `chat.app` and getting one-time administrator approval ([Developer Preview](https://developers.google.com/workspace/preview)). To learn more, see [Authorize as a Chat app with administrator approval](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app). - A user by specifying an authorization scope that doesn't include `app` in its name. To learn more, see [Authorize as a Chat user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user). */
export interface CreateSubscriptionsRequest {
  /** Optional. If set to `true`, validates and previews the request, but doesn't create the subscription. */
  validateOnly?: boolean;
  /** Request body */
  body?: Subscription;
}

export const CreateSubscriptionsRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Subscription).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/subscriptions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSubscriptionsRequest>;

export type CreateSubscriptionsResponse = Operation;
export const CreateSubscriptionsResponse = Operation;

export type CreateSubscriptionsError = CommonErrors;

export const createSubscriptions: API.OperationMethod<CreateSubscriptionsRequest, CreateSubscriptionsResponse, CreateSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSubscriptionsRequest,
  output: CreateSubscriptionsResponse,
  errors: [],
}));

/** Deletes a Google Workspace subscription. To learn how to use this method, see [Delete a Google Workspace subscription](https://developers.google.com/workspace/events/guides/delete-subscription). */
export interface DeleteSubscriptionsRequest {
  /** Required. Resource name of the subscription to delete. Format: `subscriptions/{subscription}` */
  name: string;
  /** Optional. If set to `true`, validates and previews the request, but doesn't delete the subscription. */
  validateOnly?: boolean;
  /** Optional. If set to `true` and the subscription isn't found, the request succeeds but doesn't delete the subscription. */
  allowMissing?: boolean;
  /** Optional. Etag of the subscription. If present, it must match with the server's etag. Otherwise, request fails with the status `ABORTED`. */
  etag?: string;
}

export const DeleteSubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/subscriptions/{subscriptionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteSubscriptionsRequest>;

export type DeleteSubscriptionsResponse = Operation;
export const DeleteSubscriptionsResponse = Operation;

export type DeleteSubscriptionsError = CommonErrors;

export const deleteSubscriptions: API.OperationMethod<DeleteSubscriptionsRequest, DeleteSubscriptionsResponse, DeleteSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteSubscriptionsRequest,
  output: DeleteSubscriptionsResponse,
  errors: [],
}));

/** Gets details about a Google Workspace subscription. To learn how to use this method, see [Get details about a Google Workspace subscription](https://developers.google.com/workspace/events/guides/get-subscription). */
export interface GetSubscriptionsRequest {
  /** Required. Resource name of the subscription. Format: `subscriptions/{subscription}` */
  name: string;
}

export const GetSubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/subscriptions/{subscriptionsId}" }),
  svc,
) as unknown as Schema.Schema<GetSubscriptionsRequest>;

export type GetSubscriptionsResponse = Subscription;
export const GetSubscriptionsResponse = Subscription;

export type GetSubscriptionsError = CommonErrors;

export const getSubscriptions: API.OperationMethod<GetSubscriptionsRequest, GetSubscriptionsResponse, GetSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSubscriptionsRequest,
  output: GetSubscriptionsResponse,
  errors: [],
}));

/** Lists Google Workspace subscriptions. To learn how to use this method, see [List Google Workspace subscriptions](https://developers.google.com/workspace/events/guides/list-subscriptions). */
export interface ListSubscriptionsRequest {
  /** Optional. The maximum number of subscriptions to return. The service might return fewer than this value. If unspecified or set to `0`, up to 50 subscriptions are returned. The maximum value is 100. If you specify a value more than 100, the system only returns 100 subscriptions. */
  pageSize?: number;
  /** Optional. A page token, received from a previous list subscriptions call. Provide this parameter to retrieve the subsequent page. When paginating, the filter value should match the call that provided the page token. Passing a different value might lead to unexpected results. */
  pageToken?: string;
  /** Required. A query filter. You can filter subscriptions by event type (`event_types`) and target resource (`target_resource`). You must specify at least one event type in your query. To filter for multiple event types, use the `OR` operator. To filter by both event type and target resource, use the `AND` operator and specify the full resource name, such as `//chat.googleapis.com/spaces/{space}`. For example, the following queries are valid: ``` event_types:"google.workspace.chat.membership.v1.updated" OR event_types:"google.workspace.chat.message.v1.created" event_types:"google.workspace.chat.message.v1.created" AND target_resource="//chat.googleapis.com/spaces/{space}" ( event_types:"google.workspace.chat.membership.v1.updated" OR event_types:"google.workspace.chat.message.v1.created" ) AND target_resource="//chat.googleapis.com/spaces/{space}" ``` The server rejects invalid queries with an `INVALID_ARGUMENT` error. */
  filter?: string;
}

export const ListSubscriptionsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/subscriptions" }),
  svc,
) as unknown as Schema.Schema<ListSubscriptionsRequest>;

export type ListSubscriptionsResponse_Op = ListSubscriptionsResponse;
export const ListSubscriptionsResponse_Op = ListSubscriptionsResponse;

export type ListSubscriptionsError = CommonErrors;

export const listSubscriptions = API.makePaginated(() => ({
  input: ListSubscriptionsRequest,
  output: ListSubscriptionsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates or renews a Google Workspace subscription. To learn how to use this method, see [Update or renew a Google Workspace subscription](https://developers.google.com/workspace/events/guides/update-subscription). For a subscription on a [Chat target resource](https://developers.google.com/workspace/events/guides/events-chat), you can update a subscription as: - A Chat app by specifying an authorization scope that begins with `chat.app` andgetting one-time administrator approval ([Developer Preview](https://developers.google.com/workspace/preview)). To learn more, see [Authorize as a Chat app with administrator approval](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app). - A user by specifying an authorization scope that doesn't include `app` in its name. To learn more, see [Authorize as a Chat user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user). */
export interface PatchSubscriptionsRequest {
  /** Identifier. Resource name of the subscription. Format: `subscriptions/{subscription}` */
  name: string;
  /** Optional. The field to update. If omitted, updates any fields included in the request. You can update one of the following fields in a subscription: * `expire_time`: The timestamp when the subscription expires. * `ttl`: The time-to-live (TTL) or duration of the subscription. * `event_types`: The list of event types to receive about the target resource. When using the `*` wildcard (equivalent to `PUT`), omitted fields are set to empty values and rejected if they're invalid. */
  updateMask?: string;
  /** Optional. If set to `true`, validates and previews the request, but doesn't update the subscription. */
  validateOnly?: boolean;
  /** Request body */
  body?: Subscription;
}

export const PatchSubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(Subscription).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/subscriptions/{subscriptionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchSubscriptionsRequest>;

export type PatchSubscriptionsResponse = Operation;
export const PatchSubscriptionsResponse = Operation;

export type PatchSubscriptionsError = CommonErrors;

export const patchSubscriptions: API.OperationMethod<PatchSubscriptionsRequest, PatchSubscriptionsResponse, PatchSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchSubscriptionsRequest,
  output: PatchSubscriptionsResponse,
  errors: [],
}));

/** Reactivates a suspended Google Workspace subscription. This method resets your subscription's `State` field to `ACTIVE`. Before you use this method, you must fix the error that suspended the subscription. This method will ignore or reject any subscription that isn't currently in a suspended state. To learn how to use this method, see [Reactivate a Google Workspace subscription](https://developers.google.com/workspace/events/guides/reactivate-subscription). For a subscription on a [Chat target resource](https://developers.google.com/workspace/events/guides/events-chat), you can reactivate a subscription as: - A Chat app by specifying an authorization scope that begins with `chat.app` andgetting one-time administrator approval ([Developer Preview](https://developers.google.com/workspace/preview)). To learn more, see [Authorize as a Chat app with administrator approval](https://developers.google.com/workspace/chat/authenticate-authorize-chat-app). - A user by specifying an authorization scope that doesn't include `app` in its name. To learn more, see [Authorize as a Chat user](https://developers.google.com/workspace/chat/authenticate-authorize-chat-user). */
export interface ReactivateSubscriptionsRequest {
  /** Required. Resource name of the subscription. Format: `subscriptions/{subscription}` */
  name: string;
  /** Request body */
  body?: ReactivateSubscriptionRequest;
}

export const ReactivateSubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ReactivateSubscriptionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/subscriptions/{subscriptionsId}:reactivate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReactivateSubscriptionsRequest>;

export type ReactivateSubscriptionsResponse = Operation;
export const ReactivateSubscriptionsResponse = Operation;

export type ReactivateSubscriptionsError = CommonErrors;

export const reactivateSubscriptions: API.OperationMethod<ReactivateSubscriptionsRequest, ReactivateSubscriptionsResponse, ReactivateSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReactivateSubscriptionsRequest,
  output: ReactivateSubscriptionsResponse,
  errors: [],
}));

/** SendStreamingMessage is a streaming call that will return a stream of task update events until the Task is in an interrupted or terminal state. */
export interface StreamMessageRequest {
  /** Request body */
  body?: SendMessageRequest;
}

export const StreamMessageRequest = Schema.Struct({
  body: Schema.optional(SendMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/message:stream", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StreamMessageRequest>;

export type StreamMessageResponse = StreamResponse;
export const StreamMessageResponse = StreamResponse;

export type StreamMessageError = CommonErrors;

export const streamMessage: API.OperationMethod<StreamMessageRequest, StreamMessageResponse, StreamMessageError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StreamMessageRequest,
  output: StreamMessageResponse,
  errors: [],
}));

/** Get the current state of a task from the agent. */
export interface GetTasksRequest {
  /** Required. The resource name of the task. Format: tasks/{task_id} */
  name: string;
  /** Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. */
  tenant?: string;
  /** The number of most recent messages from the task's history to retrieve. */
  historyLength?: number;
}

export const GetTasksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  tenant: Schema.optional(Schema.String).pipe(T.HttpQuery("tenant")),
  historyLength: Schema.optional(Schema.Number).pipe(T.HttpQuery("historyLength")),
}).pipe(
  T.Http({ method: "GET", path: "v1/tasks/{tasksId}" }),
  svc,
) as unknown as Schema.Schema<GetTasksRequest>;

export type GetTasksResponse = Task;
export const GetTasksResponse = Task;

export type GetTasksError = CommonErrors;

export const getTasks: API.OperationMethod<GetTasksRequest, GetTasksResponse, GetTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTasksRequest,
  output: GetTasksResponse,
  errors: [],
}));

/** Cancel a task from the agent. If supported one should expect no more task updates for the task. */
export interface CancelTasksRequest {
  /** The resource name of the task to cancel. Format: tasks/{task_id} */
  name: string;
  /** Request body */
  body?: CancelTaskRequest;
}

export const CancelTasksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelTaskRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/tasks/{tasksId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelTasksRequest>;

export type CancelTasksResponse = Task;
export const CancelTasksResponse = Task;

export type CancelTasksError = CommonErrors;

export const cancelTasks: API.OperationMethod<CancelTasksRequest, CancelTasksResponse, CancelTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelTasksRequest,
  output: CancelTasksResponse,
  errors: [],
}));

/** TaskSubscription is a streaming call that will return a stream of task update events. This attaches the stream to an existing in process task. If the task is complete the stream will return the completed task (like GetTask) and close the stream. */
export interface SubscribeTasksRequest {
  /** The resource name of the task to subscribe to. Format: tasks/{task_id} */
  name: string;
  /** Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. */
  tenant?: string;
}

export const SubscribeTasksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  tenant: Schema.optional(Schema.String).pipe(T.HttpQuery("tenant")),
}).pipe(
  T.Http({ method: "GET", path: "v1/tasks/{tasksId}:subscribe" }),
  svc,
) as unknown as Schema.Schema<SubscribeTasksRequest>;

export type SubscribeTasksResponse = StreamResponse;
export const SubscribeTasksResponse = StreamResponse;

export type SubscribeTasksError = CommonErrors;

export const subscribeTasks: API.OperationMethod<SubscribeTasksRequest, SubscribeTasksResponse, SubscribeTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SubscribeTasksRequest,
  output: SubscribeTasksResponse,
  errors: [],
}));

/** Set a push notification config for a task. */
export interface CreateTasksPushNotificationConfigsRequest {
  /** Required. The parent task resource for this config. Format: tasks/{task_id} */
  parent: string;
  /** Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. */
  tenant?: string;
  /** Required. The ID for the new config. */
  configId?: string;
  /** Request body */
  body?: TaskPushNotificationConfig;
}

export const CreateTasksPushNotificationConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  tenant: Schema.optional(Schema.String).pipe(T.HttpQuery("tenant")),
  configId: Schema.optional(Schema.String).pipe(T.HttpQuery("configId")),
  body: Schema.optional(TaskPushNotificationConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/tasks/{tasksId}/pushNotificationConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateTasksPushNotificationConfigsRequest>;

export type CreateTasksPushNotificationConfigsResponse = TaskPushNotificationConfig;
export const CreateTasksPushNotificationConfigsResponse = TaskPushNotificationConfig;

export type CreateTasksPushNotificationConfigsError = CommonErrors;

export const createTasksPushNotificationConfigs: API.OperationMethod<CreateTasksPushNotificationConfigsRequest, CreateTasksPushNotificationConfigsResponse, CreateTasksPushNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateTasksPushNotificationConfigsRequest,
  output: CreateTasksPushNotificationConfigsResponse,
  errors: [],
}));

/** Get a push notification config for a task. */
export interface GetTasksPushNotificationConfigsRequest {
  /** The resource name of the config to retrieve. Format: tasks/{task_id}/pushNotificationConfigs/{config_id} */
  name: string;
  /** Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. */
  tenant?: string;
}

export const GetTasksPushNotificationConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  tenant: Schema.optional(Schema.String).pipe(T.HttpQuery("tenant")),
}).pipe(
  T.Http({ method: "GET", path: "v1/tasks/{tasksId}/pushNotificationConfigs/{pushNotificationConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetTasksPushNotificationConfigsRequest>;

export type GetTasksPushNotificationConfigsResponse = TaskPushNotificationConfig;
export const GetTasksPushNotificationConfigsResponse = TaskPushNotificationConfig;

export type GetTasksPushNotificationConfigsError = CommonErrors;

export const getTasksPushNotificationConfigs: API.OperationMethod<GetTasksPushNotificationConfigsRequest, GetTasksPushNotificationConfigsResponse, GetTasksPushNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetTasksPushNotificationConfigsRequest,
  output: GetTasksPushNotificationConfigsResponse,
  errors: [],
}));

/** Get a list of push notifications configured for a task. */
export interface ListTasksPushNotificationConfigsRequest {
  /** The parent task resource. Format: tasks/{task_id} */
  parent: string;
  /** Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. */
  tenant?: string;
  /** For AIP-158 these fields are present. Usually not used/needed. The maximum number of configurations to return. If unspecified, all configs will be returned. */
  pageSize?: number;
  /** A page token received from a previous ListTaskPushNotificationConfigRequest call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTaskPushNotificationConfigRequest` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListTasksPushNotificationConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  tenant: Schema.optional(Schema.String).pipe(T.HttpQuery("tenant")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/tasks/{tasksId}/pushNotificationConfigs" }),
  svc,
) as unknown as Schema.Schema<ListTasksPushNotificationConfigsRequest>;

export type ListTasksPushNotificationConfigsResponse = ListTaskPushNotificationConfigResponse;
export const ListTasksPushNotificationConfigsResponse = ListTaskPushNotificationConfigResponse;

export type ListTasksPushNotificationConfigsError = CommonErrors;

export const listTasksPushNotificationConfigs = API.makePaginated(() => ({
  input: ListTasksPushNotificationConfigsRequest,
  output: ListTasksPushNotificationConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Delete a push notification config for a task. */
export interface DeleteTasksPushNotificationConfigsRequest {
  /** The resource name of the config to delete. Format: tasks/{task_id}/pushNotificationConfigs/{config_id} */
  name: string;
  /** Optional tenant, provided as a path parameter. Experimental, might still change for 1.0 release. */
  tenant?: string;
}

export const DeleteTasksPushNotificationConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  tenant: Schema.optional(Schema.String).pipe(T.HttpQuery("tenant")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/tasks/{tasksId}/pushNotificationConfigs/{pushNotificationConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteTasksPushNotificationConfigsRequest>;

export type DeleteTasksPushNotificationConfigsResponse = Empty;
export const DeleteTasksPushNotificationConfigsResponse = Empty;

export type DeleteTasksPushNotificationConfigsError = CommonErrors;

export const deleteTasksPushNotificationConfigs: API.OperationMethod<DeleteTasksPushNotificationConfigsRequest, DeleteTasksPushNotificationConfigsResponse, DeleteTasksPushNotificationConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteTasksPushNotificationConfigsRequest,
  output: DeleteTasksPushNotificationConfigsResponse,
  errors: [],
}));

