// ==========================================================================
// Pub/Sub Lite API (pubsublite v1)
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
  name: "pubsublite",
  version: "v1",
  rootUrl: "https://pubsublite.googleapis.com/",
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

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface Capacity {
  /** Publish throughput capacity per partition in MiB/s. Must be >= 4 and <= 16. */
  publishMibPerSec?: number;
  /** Subscribe throughput capacity per partition in MiB/s. Must be >= 4 and <= 32. */
  subscribeMibPerSec?: number;
}

export const Capacity: Schema.Schema<Capacity> = Schema.suspend(() => Schema.Struct({
  publishMibPerSec: Schema.optional(Schema.Number),
  subscribeMibPerSec: Schema.optional(Schema.Number),
})).annotate({ identifier: "Capacity" }) as any as Schema.Schema<Capacity>;

export interface PartitionConfig {
  /** The number of partitions in the topic. Must be at least 1. Once a topic has been created the number of partitions can be increased but not decreased. Message ordering is not guaranteed across a topic resize. For more information see https://cloud.google.com/pubsub/lite/docs/topics#scaling_capacity */
  count?: string;
  /** DEPRECATED: Use capacity instead which can express a superset of configurations. Every partition in the topic is allocated throughput equivalent to `scale` times the standard partition throughput (4 MiB/s). This is also reflected in the cost of this topic; a topic with `scale` of 2 and count of 10 is charged for 20 partitions. This value must be in the range [1,4]. */
  scale?: number;
  /** The capacity configuration. */
  capacity?: Capacity;
}

export const PartitionConfig: Schema.Schema<PartitionConfig> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.String),
  scale: Schema.optional(Schema.Number),
  capacity: Schema.optional(Capacity),
})).annotate({ identifier: "PartitionConfig" }) as any as Schema.Schema<PartitionConfig>;

export interface RetentionConfig {
  /** The provisioned storage, in bytes, per partition. If the number of bytes stored in any of the topic's partitions grows beyond this value, older messages will be dropped to make room for newer ones, regardless of the value of `period`. */
  perPartitionBytes?: string;
  /** How long a published message is retained. If unset, messages will be retained as long as the bytes retained for each partition is below `per_partition_bytes`. */
  period?: string;
}

export const RetentionConfig: Schema.Schema<RetentionConfig> = Schema.suspend(() => Schema.Struct({
  perPartitionBytes: Schema.optional(Schema.String),
  period: Schema.optional(Schema.String),
})).annotate({ identifier: "RetentionConfig" }) as any as Schema.Schema<RetentionConfig>;

export interface ReservationConfig {
  /** The Reservation to use for this topic's throughput capacity. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id} */
  throughputReservation?: string;
}

export const ReservationConfig: Schema.Schema<ReservationConfig> = Schema.suspend(() => Schema.Struct({
  throughputReservation: Schema.optional(Schema.String),
})).annotate({ identifier: "ReservationConfig" }) as any as Schema.Schema<ReservationConfig>;

export interface Topic {
  /** The name of the topic. Structured like: projects/{project_number}/locations/{location}/topics/{topic_id} */
  name?: string;
  /** The settings for this topic's partitions. */
  partitionConfig?: PartitionConfig;
  /** The settings for this topic's message retention. */
  retentionConfig?: RetentionConfig;
  /** The settings for this topic's Reservation usage. */
  reservationConfig?: ReservationConfig;
}

export const Topic: Schema.Schema<Topic> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  partitionConfig: Schema.optional(PartitionConfig),
  retentionConfig: Schema.optional(RetentionConfig),
  reservationConfig: Schema.optional(ReservationConfig),
})).annotate({ identifier: "Topic" }) as any as Schema.Schema<Topic>;

export interface TopicPartitions {
  /** The number of partitions in the topic. */
  partitionCount?: string;
}

export const TopicPartitions: Schema.Schema<TopicPartitions> = Schema.suspend(() => Schema.Struct({
  partitionCount: Schema.optional(Schema.String),
})).annotate({ identifier: "TopicPartitions" }) as any as Schema.Schema<TopicPartitions>;

export interface ListTopicsResponse {
  /** The list of topic in the requested parent. The order of the topics is unspecified. */
  topics?: Array<Topic>;
  /** A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. */
  nextPageToken?: string;
}

export const ListTopicsResponse: Schema.Schema<ListTopicsResponse> = Schema.suspend(() => Schema.Struct({
  topics: Schema.optional(Schema.Array(Topic)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTopicsResponse" }) as any as Schema.Schema<ListTopicsResponse>;

export interface ListTopicSubscriptionsResponse {
  /** The names of subscriptions attached to the topic. The order of the subscriptions is unspecified. */
  subscriptions?: Array<string>;
  /** A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. */
  nextPageToken?: string;
}

export const ListTopicSubscriptionsResponse: Schema.Schema<ListTopicSubscriptionsResponse> = Schema.suspend(() => Schema.Struct({
  subscriptions: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTopicSubscriptionsResponse" }) as any as Schema.Schema<ListTopicSubscriptionsResponse>;

export interface DeliveryConfig {
  /** The DeliveryRequirement for this subscription. */
  deliveryRequirement?: "DELIVERY_REQUIREMENT_UNSPECIFIED" | "DELIVER_IMMEDIATELY" | "DELIVER_AFTER_STORED" | (string & {});
}

export const DeliveryConfig: Schema.Schema<DeliveryConfig> = Schema.suspend(() => Schema.Struct({
  deliveryRequirement: Schema.optional(Schema.String),
})).annotate({ identifier: "DeliveryConfig" }) as any as Schema.Schema<DeliveryConfig>;

export interface PubSubConfig {
  /** The name of the Pub/Sub topic. Structured like: projects/{project_number}/topics/{topic_id}. The topic may be changed. */
  topic?: string;
}

export const PubSubConfig: Schema.Schema<PubSubConfig> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
})).annotate({ identifier: "PubSubConfig" }) as any as Schema.Schema<PubSubConfig>;

export interface ExportConfig {
  /** The desired state of this export. Setting this to values other than `ACTIVE` and `PAUSED` will result in an error. */
  desiredState?: "STATE_UNSPECIFIED" | "ACTIVE" | "PAUSED" | "PERMISSION_DENIED" | "NOT_FOUND" | (string & {});
  /** Output only. The current state of the export, which may be different to the desired state due to errors. This field is output only. */
  currentState?: "STATE_UNSPECIFIED" | "ACTIVE" | "PAUSED" | "PERMISSION_DENIED" | "NOT_FOUND" | (string & {});
  /** Optional. The name of an optional Pub/Sub Lite topic to publish messages that can not be exported to the destination. For example, the message can not be published to the Pub/Sub service because it does not satisfy the constraints documented at https://cloud.google.com/pubsub/docs/publisher. Structured like: projects/{project_number}/locations/{location}/topics/{topic_id}. Must be within the same project and location as the subscription. The topic may be changed or removed. */
  deadLetterTopic?: string;
  /** Messages are automatically written from the Pub/Sub Lite topic associated with this subscription to a Pub/Sub topic. */
  pubsubConfig?: PubSubConfig;
}

export const ExportConfig: Schema.Schema<ExportConfig> = Schema.suspend(() => Schema.Struct({
  desiredState: Schema.optional(Schema.String),
  currentState: Schema.optional(Schema.String),
  deadLetterTopic: Schema.optional(Schema.String),
  pubsubConfig: Schema.optional(PubSubConfig),
})).annotate({ identifier: "ExportConfig" }) as any as Schema.Schema<ExportConfig>;

export interface Subscription {
  /** The name of the subscription. Structured like: projects/{project_number}/locations/{location}/subscriptions/{subscription_id} */
  name?: string;
  /** The name of the topic this subscription is attached to. Structured like: projects/{project_number}/locations/{location}/topics/{topic_id} */
  topic?: string;
  /** The settings for this subscription's message delivery. */
  deliveryConfig?: DeliveryConfig;
  /** If present, messages are automatically written from the Pub/Sub Lite topic associated with this subscription to a destination. */
  exportConfig?: ExportConfig;
}

export const Subscription: Schema.Schema<Subscription> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  topic: Schema.optional(Schema.String),
  deliveryConfig: Schema.optional(DeliveryConfig),
  exportConfig: Schema.optional(ExportConfig),
})).annotate({ identifier: "Subscription" }) as any as Schema.Schema<Subscription>;

export interface ListSubscriptionsResponse {
  /** The list of subscriptions in the requested parent. The order of the subscriptions is unspecified. */
  subscriptions?: Array<Subscription>;
  /** A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. */
  nextPageToken?: string;
}

export const ListSubscriptionsResponse: Schema.Schema<ListSubscriptionsResponse> = Schema.suspend(() => Schema.Struct({
  subscriptions: Schema.optional(Schema.Array(Subscription)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSubscriptionsResponse" }) as any as Schema.Schema<ListSubscriptionsResponse>;

export interface TimeTarget {
  /** Request the cursor of the first message with publish time greater than or equal to `publish_time`. All messages thereafter are guaranteed to have publish times >= `publish_time`. */
  publishTime?: string;
  /** Request the cursor of the first message with event time greater than or equal to `event_time`. If messages are missing an event time, the publish time is used as a fallback. As event times are user supplied, subsequent messages may have event times less than `event_time` and should be filtered by the client, if necessary. */
  eventTime?: string;
}

export const TimeTarget: Schema.Schema<TimeTarget> = Schema.suspend(() => Schema.Struct({
  publishTime: Schema.optional(Schema.String),
  eventTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeTarget" }) as any as Schema.Schema<TimeTarget>;

export interface SeekSubscriptionRequest {
  /** Seek to a named position with respect to the message backlog. */
  namedTarget?: "NAMED_TARGET_UNSPECIFIED" | "TAIL" | "HEAD" | (string & {});
  /** Seek to the first message whose publish or event time is greater than or equal to the specified query time. If no such message can be located, will seek to the end of the message backlog. */
  timeTarget?: TimeTarget;
}

export const SeekSubscriptionRequest: Schema.Schema<SeekSubscriptionRequest> = Schema.suspend(() => Schema.Struct({
  namedTarget: Schema.optional(Schema.String),
  timeTarget: Schema.optional(TimeTarget),
})).annotate({ identifier: "SeekSubscriptionRequest" }) as any as Schema.Schema<SeekSubscriptionRequest>;

export interface Reservation {
  /** The name of the reservation. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id} */
  name?: string;
  /** The reserved throughput capacity. Every unit of throughput capacity is equivalent to 1 MiB/s of published messages or 2 MiB/s of subscribed messages. Any topics which are declared as using capacity from a Reservation will consume resources from this reservation instead of being charged individually. */
  throughputCapacity?: string;
}

export const Reservation: Schema.Schema<Reservation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  throughputCapacity: Schema.optional(Schema.String),
})).annotate({ identifier: "Reservation" }) as any as Schema.Schema<Reservation>;

export interface ListReservationsResponse {
  /** The list of reservation in the requested parent. The order of the reservations is unspecified. */
  reservations?: Array<Reservation>;
  /** A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. */
  nextPageToken?: string;
}

export const ListReservationsResponse: Schema.Schema<ListReservationsResponse> = Schema.suspend(() => Schema.Struct({
  reservations: Schema.optional(Schema.Array(Reservation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListReservationsResponse" }) as any as Schema.Schema<ListReservationsResponse>;

export interface ListReservationTopicsResponse {
  /** The names of topics attached to the reservation. The order of the topics is unspecified. */
  topics?: Array<string>;
  /** A token that can be sent as `page_token` to retrieve the next page of results. If this field is omitted, there are no more results. */
  nextPageToken?: string;
}

export const ListReservationTopicsResponse: Schema.Schema<ListReservationTopicsResponse> = Schema.suspend(() => Schema.Struct({
  topics: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListReservationTopicsResponse" }) as any as Schema.Schema<ListReservationTopicsResponse>;

export interface Cursor {
  /** The offset of a message within a topic partition. Must be greater than or equal 0. */
  offset?: string;
}

export const Cursor: Schema.Schema<Cursor> = Schema.suspend(() => Schema.Struct({
  offset: Schema.optional(Schema.String),
})).annotate({ identifier: "Cursor" }) as any as Schema.Schema<Cursor>;

export interface CommitCursorRequest {
  /** The partition for which to update the cursor. Partitions are zero indexed, so `partition` must be in the range [0, topic.num_partitions). */
  partition?: string;
  /** The new value for the committed cursor. */
  cursor?: Cursor;
}

export const CommitCursorRequest: Schema.Schema<CommitCursorRequest> = Schema.suspend(() => Schema.Struct({
  partition: Schema.optional(Schema.String),
  cursor: Schema.optional(Cursor),
})).annotate({ identifier: "CommitCursorRequest" }) as any as Schema.Schema<CommitCursorRequest>;

export interface CommitCursorResponse {
}

export const CommitCursorResponse: Schema.Schema<CommitCursorResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CommitCursorResponse" }) as any as Schema.Schema<CommitCursorResponse>;

export interface PartitionCursor {
  /** The partition this is for. */
  partition?: string;
  /** The value of the cursor. */
  cursor?: Cursor;
}

export const PartitionCursor: Schema.Schema<PartitionCursor> = Schema.suspend(() => Schema.Struct({
  partition: Schema.optional(Schema.String),
  cursor: Schema.optional(Cursor),
})).annotate({ identifier: "PartitionCursor" }) as any as Schema.Schema<PartitionCursor>;

export interface ListPartitionCursorsResponse {
  /** The partition cursors from this request. */
  partitionCursors?: Array<PartitionCursor>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListPartitionCursorsResponse: Schema.Schema<ListPartitionCursorsResponse> = Schema.suspend(() => Schema.Struct({
  partitionCursors: Schema.optional(Schema.Array(PartitionCursor)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListPartitionCursorsResponse" }) as any as Schema.Schema<ListPartitionCursorsResponse>;

export interface ComputeMessageStatsRequest {
  /** Required. The partition for which we should compute message stats. */
  partition?: string;
  /** The inclusive start of the range. */
  startCursor?: Cursor;
  /** The exclusive end of the range. The range is empty if end_cursor <= start_cursor. Specifying a start_cursor before the first message and an end_cursor after the last message will retrieve all messages. */
  endCursor?: Cursor;
}

export const ComputeMessageStatsRequest: Schema.Schema<ComputeMessageStatsRequest> = Schema.suspend(() => Schema.Struct({
  partition: Schema.optional(Schema.String),
  startCursor: Schema.optional(Cursor),
  endCursor: Schema.optional(Cursor),
})).annotate({ identifier: "ComputeMessageStatsRequest" }) as any as Schema.Schema<ComputeMessageStatsRequest>;

export interface ComputeMessageStatsResponse {
  /** The count of messages. */
  messageCount?: string;
  /** The number of quota bytes accounted to these messages. */
  messageBytes?: string;
  /** The minimum publish timestamp across these messages. Note that publish timestamps within a partition are not guaranteed to be non-decreasing. The timestamp will be unset if there are no messages. */
  minimumPublishTime?: string;
  /** The minimum event timestamp across these messages. For the purposes of this computation, if a message does not have an event time, we use the publish time. The timestamp will be unset if there are no messages. */
  minimumEventTime?: string;
}

export const ComputeMessageStatsResponse: Schema.Schema<ComputeMessageStatsResponse> = Schema.suspend(() => Schema.Struct({
  messageCount: Schema.optional(Schema.String),
  messageBytes: Schema.optional(Schema.String),
  minimumPublishTime: Schema.optional(Schema.String),
  minimumEventTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ComputeMessageStatsResponse" }) as any as Schema.Schema<ComputeMessageStatsResponse>;

export interface ComputeHeadCursorRequest {
  /** Required. The partition for which we should compute the head cursor. */
  partition?: string;
}

export const ComputeHeadCursorRequest: Schema.Schema<ComputeHeadCursorRequest> = Schema.suspend(() => Schema.Struct({
  partition: Schema.optional(Schema.String),
})).annotate({ identifier: "ComputeHeadCursorRequest" }) as any as Schema.Schema<ComputeHeadCursorRequest>;

export interface ComputeHeadCursorResponse {
  /** The head cursor. */
  headCursor?: Cursor;
}

export const ComputeHeadCursorResponse: Schema.Schema<ComputeHeadCursorResponse> = Schema.suspend(() => Schema.Struct({
  headCursor: Schema.optional(Cursor),
})).annotate({ identifier: "ComputeHeadCursorResponse" }) as any as Schema.Schema<ComputeHeadCursorResponse>;

export interface ComputeTimeCursorRequest {
  /** Required. The partition for which we should compute the cursor. */
  partition?: string;
  /** Required. The target publish or event time. Specifying a future time will return an unset cursor. */
  target?: TimeTarget;
}

export const ComputeTimeCursorRequest: Schema.Schema<ComputeTimeCursorRequest> = Schema.suspend(() => Schema.Struct({
  partition: Schema.optional(Schema.String),
  target: Schema.optional(TimeTarget),
})).annotate({ identifier: "ComputeTimeCursorRequest" }) as any as Schema.Schema<ComputeTimeCursorRequest>;

export interface ComputeTimeCursorResponse {
  /** If present, the cursor references the first message with time greater than or equal to the specified target time. If such a message cannot be found, the cursor will be unset (i.e. `cursor` is not present). */
  cursor?: Cursor;
}

export const ComputeTimeCursorResponse: Schema.Schema<ComputeTimeCursorResponse> = Schema.suspend(() => Schema.Struct({
  cursor: Schema.optional(Cursor),
})).annotate({ identifier: "ComputeTimeCursorResponse" }) as any as Schema.Schema<ComputeTimeCursorResponse>;

export interface SeekSubscriptionResponse {
}

export const SeekSubscriptionResponse: Schema.Schema<SeekSubscriptionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SeekSubscriptionResponse" }) as any as Schema.Schema<SeekSubscriptionResponse>;

export interface OperationMetadata {
  /** The time the operation was created. */
  createTime?: string;
  /** The time the operation finished running. Not set if the operation has not completed. */
  endTime?: string;
  /** Resource path for the target of the operation. For example, targets of seeks are subscription resources, structured like: projects/{project_number}/locations/{location}/subscriptions/{subscription_id} */
  target?: string;
  /** Name of the verb executed by the operation. */
  verb?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListAdminProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListAdminProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListAdminProjectsLocationsOperationsRequest>;

export type ListAdminProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListAdminProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListAdminProjectsLocationsOperationsError = CommonErrors;

export const listAdminProjectsLocationsOperations = API.makePaginated(() => ({
  input: ListAdminProjectsLocationsOperationsRequest,
  output: ListAdminProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetAdminProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetAdminProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdminProjectsLocationsOperationsRequest>;

export type GetAdminProjectsLocationsOperationsResponse = Operation;
export const GetAdminProjectsLocationsOperationsResponse = Operation;

export type GetAdminProjectsLocationsOperationsError = CommonErrors;

export const getAdminProjectsLocationsOperations: API.OperationMethod<GetAdminProjectsLocationsOperationsRequest, GetAdminProjectsLocationsOperationsResponse, GetAdminProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdminProjectsLocationsOperationsRequest,
  output: GetAdminProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteAdminProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteAdminProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdminProjectsLocationsOperationsRequest>;

export type DeleteAdminProjectsLocationsOperationsResponse = Empty;
export const DeleteAdminProjectsLocationsOperationsResponse = Empty;

export type DeleteAdminProjectsLocationsOperationsError = CommonErrors;

export const deleteAdminProjectsLocationsOperations: API.OperationMethod<DeleteAdminProjectsLocationsOperationsRequest, DeleteAdminProjectsLocationsOperationsResponse, DeleteAdminProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdminProjectsLocationsOperationsRequest,
  output: DeleteAdminProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelAdminProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelAdminProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelAdminProjectsLocationsOperationsRequest>;

export type CancelAdminProjectsLocationsOperationsResponse = Empty;
export const CancelAdminProjectsLocationsOperationsResponse = Empty;

export type CancelAdminProjectsLocationsOperationsError = CommonErrors;

export const cancelAdminProjectsLocationsOperations: API.OperationMethod<CancelAdminProjectsLocationsOperationsRequest, CancelAdminProjectsLocationsOperationsResponse, CancelAdminProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelAdminProjectsLocationsOperationsRequest,
  output: CancelAdminProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Creates a new topic. */
export interface CreateAdminProjectsLocationsTopicsRequest {
  /** Required. The parent location in which to create the topic. Structured like `projects/{project_number}/locations/{location}`. */
  parent: string;
  /** Required. The ID to use for the topic, which will become the final component of the topic's name. This value is structured like: `my-topic-name`. */
  topicId?: string;
  /** Request body */
  body?: Topic;
}

export const CreateAdminProjectsLocationsTopicsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  topicId: Schema.optional(Schema.String).pipe(T.HttpQuery("topicId")),
  body: Schema.optional(Topic).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/topics", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdminProjectsLocationsTopicsRequest>;

export type CreateAdminProjectsLocationsTopicsResponse = Topic;
export const CreateAdminProjectsLocationsTopicsResponse = Topic;

export type CreateAdminProjectsLocationsTopicsError = CommonErrors;

export const createAdminProjectsLocationsTopics: API.OperationMethod<CreateAdminProjectsLocationsTopicsRequest, CreateAdminProjectsLocationsTopicsResponse, CreateAdminProjectsLocationsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdminProjectsLocationsTopicsRequest,
  output: CreateAdminProjectsLocationsTopicsResponse,
  errors: [],
}));

/** Returns the topic configuration. */
export interface GetAdminProjectsLocationsTopicsRequest {
  /** Required. The name of the topic whose configuration to return. */
  name: string;
}

export const GetAdminProjectsLocationsTopicsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/topics/{topicsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdminProjectsLocationsTopicsRequest>;

export type GetAdminProjectsLocationsTopicsResponse = Topic;
export const GetAdminProjectsLocationsTopicsResponse = Topic;

export type GetAdminProjectsLocationsTopicsError = CommonErrors;

export const getAdminProjectsLocationsTopics: API.OperationMethod<GetAdminProjectsLocationsTopicsRequest, GetAdminProjectsLocationsTopicsResponse, GetAdminProjectsLocationsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdminProjectsLocationsTopicsRequest,
  output: GetAdminProjectsLocationsTopicsResponse,
  errors: [],
}));

/** Returns the partition information for the requested topic. */
export interface GetPartitionsAdminProjectsLocationsTopicsRequest {
  /** Required. The topic whose partition information to return. */
  name: string;
}

export const GetPartitionsAdminProjectsLocationsTopicsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/topics/{topicsId}/partitions" }),
  svc,
) as unknown as Schema.Schema<GetPartitionsAdminProjectsLocationsTopicsRequest>;

export type GetPartitionsAdminProjectsLocationsTopicsResponse = TopicPartitions;
export const GetPartitionsAdminProjectsLocationsTopicsResponse = TopicPartitions;

export type GetPartitionsAdminProjectsLocationsTopicsError = CommonErrors;

export const getPartitionsAdminProjectsLocationsTopics: API.OperationMethod<GetPartitionsAdminProjectsLocationsTopicsRequest, GetPartitionsAdminProjectsLocationsTopicsResponse, GetPartitionsAdminProjectsLocationsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetPartitionsAdminProjectsLocationsTopicsRequest,
  output: GetPartitionsAdminProjectsLocationsTopicsResponse,
  errors: [],
}));

/** Returns the list of topics for the given project. */
export interface ListAdminProjectsLocationsTopicsRequest {
  /** Required. The parent whose topics are to be listed. Structured like `projects/{project_number}/locations/{location}`. */
  parent: string;
  /** The maximum number of topics to return. The service may return fewer than this value. If unset or zero, all topics for the parent will be returned. */
  pageSize?: number;
  /** A page token, received from a previous `ListTopics` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTopics` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAdminProjectsLocationsTopicsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/topics" }),
  svc,
) as unknown as Schema.Schema<ListAdminProjectsLocationsTopicsRequest>;

export type ListAdminProjectsLocationsTopicsResponse = ListTopicsResponse;
export const ListAdminProjectsLocationsTopicsResponse = ListTopicsResponse;

export type ListAdminProjectsLocationsTopicsError = CommonErrors;

export const listAdminProjectsLocationsTopics = API.makePaginated(() => ({
  input: ListAdminProjectsLocationsTopicsRequest,
  output: ListAdminProjectsLocationsTopicsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates properties of the specified topic. */
export interface PatchAdminProjectsLocationsTopicsRequest {
  /** The name of the topic. Structured like: projects/{project_number}/locations/{location}/topics/{topic_id} */
  name: string;
  /** Required. A mask specifying the topic fields to change. */
  updateMask?: string;
  /** Request body */
  body?: Topic;
}

export const PatchAdminProjectsLocationsTopicsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Topic).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/topics/{topicsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAdminProjectsLocationsTopicsRequest>;

export type PatchAdminProjectsLocationsTopicsResponse = Topic;
export const PatchAdminProjectsLocationsTopicsResponse = Topic;

export type PatchAdminProjectsLocationsTopicsError = CommonErrors;

export const patchAdminProjectsLocationsTopics: API.OperationMethod<PatchAdminProjectsLocationsTopicsRequest, PatchAdminProjectsLocationsTopicsResponse, PatchAdminProjectsLocationsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAdminProjectsLocationsTopicsRequest,
  output: PatchAdminProjectsLocationsTopicsResponse,
  errors: [],
}));

/** Deletes the specified topic. */
export interface DeleteAdminProjectsLocationsTopicsRequest {
  /** Required. The name of the topic to delete. */
  name: string;
}

export const DeleteAdminProjectsLocationsTopicsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/topics/{topicsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdminProjectsLocationsTopicsRequest>;

export type DeleteAdminProjectsLocationsTopicsResponse = Empty;
export const DeleteAdminProjectsLocationsTopicsResponse = Empty;

export type DeleteAdminProjectsLocationsTopicsError = CommonErrors;

export const deleteAdminProjectsLocationsTopics: API.OperationMethod<DeleteAdminProjectsLocationsTopicsRequest, DeleteAdminProjectsLocationsTopicsResponse, DeleteAdminProjectsLocationsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdminProjectsLocationsTopicsRequest,
  output: DeleteAdminProjectsLocationsTopicsResponse,
  errors: [],
}));

/** Lists the subscriptions attached to the specified topic. */
export interface ListAdminProjectsLocationsTopicsSubscriptionsRequest {
  /** Required. The name of the topic whose subscriptions to list. */
  name: string;
  /** The maximum number of subscriptions to return. The service may return fewer than this value. If unset or zero, all subscriptions for the given topic will be returned. */
  pageSize?: number;
  /** A page token, received from a previous `ListTopicSubscriptions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListTopicSubscriptions` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAdminProjectsLocationsTopicsSubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/topics/{topicsId}/subscriptions" }),
  svc,
) as unknown as Schema.Schema<ListAdminProjectsLocationsTopicsSubscriptionsRequest>;

export type ListAdminProjectsLocationsTopicsSubscriptionsResponse = ListTopicSubscriptionsResponse;
export const ListAdminProjectsLocationsTopicsSubscriptionsResponse = ListTopicSubscriptionsResponse;

export type ListAdminProjectsLocationsTopicsSubscriptionsError = CommonErrors;

export const listAdminProjectsLocationsTopicsSubscriptions = API.makePaginated(() => ({
  input: ListAdminProjectsLocationsTopicsSubscriptionsRequest,
  output: ListAdminProjectsLocationsTopicsSubscriptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new subscription. */
export interface CreateAdminProjectsLocationsSubscriptionsRequest {
  /** Required. The parent location in which to create the subscription. Structured like `projects/{project_number}/locations/{location}`. */
  parent: string;
  /** Required. The ID to use for the subscription, which will become the final component of the subscription's name. This value is structured like: `my-sub-name`. */
  subscriptionId?: string;
  /** If true, the newly created subscription will only receive messages published after the subscription was created. Otherwise, the entire message backlog will be received on the subscription. Defaults to false. */
  skipBacklog?: boolean;
  /** Request body */
  body?: Subscription;
}

export const CreateAdminProjectsLocationsSubscriptionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  subscriptionId: Schema.optional(Schema.String).pipe(T.HttpQuery("subscriptionId")),
  skipBacklog: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("skipBacklog")),
  body: Schema.optional(Subscription).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/subscriptions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdminProjectsLocationsSubscriptionsRequest>;

export type CreateAdminProjectsLocationsSubscriptionsResponse = Subscription;
export const CreateAdminProjectsLocationsSubscriptionsResponse = Subscription;

export type CreateAdminProjectsLocationsSubscriptionsError = CommonErrors;

export const createAdminProjectsLocationsSubscriptions: API.OperationMethod<CreateAdminProjectsLocationsSubscriptionsRequest, CreateAdminProjectsLocationsSubscriptionsResponse, CreateAdminProjectsLocationsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdminProjectsLocationsSubscriptionsRequest,
  output: CreateAdminProjectsLocationsSubscriptionsResponse,
  errors: [],
}));

/** Returns the subscription configuration. */
export interface GetAdminProjectsLocationsSubscriptionsRequest {
  /** Required. The name of the subscription whose configuration to return. */
  name: string;
}

export const GetAdminProjectsLocationsSubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/subscriptions/{subscriptionsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdminProjectsLocationsSubscriptionsRequest>;

export type GetAdminProjectsLocationsSubscriptionsResponse = Subscription;
export const GetAdminProjectsLocationsSubscriptionsResponse = Subscription;

export type GetAdminProjectsLocationsSubscriptionsError = CommonErrors;

export const getAdminProjectsLocationsSubscriptions: API.OperationMethod<GetAdminProjectsLocationsSubscriptionsRequest, GetAdminProjectsLocationsSubscriptionsResponse, GetAdminProjectsLocationsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdminProjectsLocationsSubscriptionsRequest,
  output: GetAdminProjectsLocationsSubscriptionsResponse,
  errors: [],
}));

/** Returns the list of subscriptions for the given project. */
export interface ListAdminProjectsLocationsSubscriptionsRequest {
  /** Required. The parent whose subscriptions are to be listed. Structured like `projects/{project_number}/locations/{location}`. */
  parent: string;
  /** The maximum number of subscriptions to return. The service may return fewer than this value. If unset or zero, all subscriptions for the parent will be returned. */
  pageSize?: number;
  /** A page token, received from a previous `ListSubscriptions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSubscriptions` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAdminProjectsLocationsSubscriptionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/subscriptions" }),
  svc,
) as unknown as Schema.Schema<ListAdminProjectsLocationsSubscriptionsRequest>;

export type ListAdminProjectsLocationsSubscriptionsResponse = ListSubscriptionsResponse;
export const ListAdminProjectsLocationsSubscriptionsResponse = ListSubscriptionsResponse;

export type ListAdminProjectsLocationsSubscriptionsError = CommonErrors;

export const listAdminProjectsLocationsSubscriptions = API.makePaginated(() => ({
  input: ListAdminProjectsLocationsSubscriptionsRequest,
  output: ListAdminProjectsLocationsSubscriptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates properties of the specified subscription. */
export interface PatchAdminProjectsLocationsSubscriptionsRequest {
  /** The name of the subscription. Structured like: projects/{project_number}/locations/{location}/subscriptions/{subscription_id} */
  name: string;
  /** Required. A mask specifying the subscription fields to change. */
  updateMask?: string;
  /** Request body */
  body?: Subscription;
}

export const PatchAdminProjectsLocationsSubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Subscription).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/subscriptions/{subscriptionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAdminProjectsLocationsSubscriptionsRequest>;

export type PatchAdminProjectsLocationsSubscriptionsResponse = Subscription;
export const PatchAdminProjectsLocationsSubscriptionsResponse = Subscription;

export type PatchAdminProjectsLocationsSubscriptionsError = CommonErrors;

export const patchAdminProjectsLocationsSubscriptions: API.OperationMethod<PatchAdminProjectsLocationsSubscriptionsRequest, PatchAdminProjectsLocationsSubscriptionsResponse, PatchAdminProjectsLocationsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAdminProjectsLocationsSubscriptionsRequest,
  output: PatchAdminProjectsLocationsSubscriptionsResponse,
  errors: [],
}));

/** Deletes the specified subscription. */
export interface DeleteAdminProjectsLocationsSubscriptionsRequest {
  /** Required. The name of the subscription to delete. */
  name: string;
}

export const DeleteAdminProjectsLocationsSubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/subscriptions/{subscriptionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdminProjectsLocationsSubscriptionsRequest>;

export type DeleteAdminProjectsLocationsSubscriptionsResponse = Empty;
export const DeleteAdminProjectsLocationsSubscriptionsResponse = Empty;

export type DeleteAdminProjectsLocationsSubscriptionsError = CommonErrors;

export const deleteAdminProjectsLocationsSubscriptions: API.OperationMethod<DeleteAdminProjectsLocationsSubscriptionsRequest, DeleteAdminProjectsLocationsSubscriptionsResponse, DeleteAdminProjectsLocationsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdminProjectsLocationsSubscriptionsRequest,
  output: DeleteAdminProjectsLocationsSubscriptionsResponse,
  errors: [],
}));

/** Performs an out-of-band seek for a subscription to a specified target, which may be timestamps or named positions within the message backlog. Seek translates these targets to cursors for each partition and orchestrates subscribers to start consuming messages from these seek cursors. If an operation is returned, the seek has been registered and subscribers will eventually receive messages from the seek cursors (i.e. eventual consistency), as long as they are using a minimum supported client library version and not a system that tracks cursors independently of Pub/Sub Lite (e.g. Apache Beam, Dataflow, Spark). The seek operation will fail for unsupported clients. If clients would like to know when subscribers react to the seek (or not), they can poll the operation. The seek operation will succeed and complete once subscribers are ready to receive messages from the seek cursors for all partitions of the topic. This means that the seek operation will not complete until all subscribers come online. If the previous seek operation has not yet completed, it will be aborted and the new invocation of seek will supersede it. */
export interface SeekAdminProjectsLocationsSubscriptionsRequest {
  /** Required. The name of the subscription to seek. */
  name: string;
  /** Request body */
  body?: SeekSubscriptionRequest;
}

export const SeekAdminProjectsLocationsSubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SeekSubscriptionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/subscriptions/{subscriptionsId}:seek", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SeekAdminProjectsLocationsSubscriptionsRequest>;

export type SeekAdminProjectsLocationsSubscriptionsResponse = Operation;
export const SeekAdminProjectsLocationsSubscriptionsResponse = Operation;

export type SeekAdminProjectsLocationsSubscriptionsError = CommonErrors;

export const seekAdminProjectsLocationsSubscriptions: API.OperationMethod<SeekAdminProjectsLocationsSubscriptionsRequest, SeekAdminProjectsLocationsSubscriptionsResponse, SeekAdminProjectsLocationsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SeekAdminProjectsLocationsSubscriptionsRequest,
  output: SeekAdminProjectsLocationsSubscriptionsResponse,
  errors: [],
}));

/** Creates a new reservation. */
export interface CreateAdminProjectsLocationsReservationsRequest {
  /** Required. The parent location in which to create the reservation. Structured like `projects/{project_number}/locations/{location}`. */
  parent: string;
  /** Required. The ID to use for the reservation, which will become the final component of the reservation's name. This value is structured like: `my-reservation-name`. */
  reservationId?: string;
  /** Request body */
  body?: Reservation;
}

export const CreateAdminProjectsLocationsReservationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  reservationId: Schema.optional(Schema.String).pipe(T.HttpQuery("reservationId")),
  body: Schema.optional(Reservation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/reservations", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAdminProjectsLocationsReservationsRequest>;

export type CreateAdminProjectsLocationsReservationsResponse = Reservation;
export const CreateAdminProjectsLocationsReservationsResponse = Reservation;

export type CreateAdminProjectsLocationsReservationsError = CommonErrors;

export const createAdminProjectsLocationsReservations: API.OperationMethod<CreateAdminProjectsLocationsReservationsRequest, CreateAdminProjectsLocationsReservationsResponse, CreateAdminProjectsLocationsReservationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAdminProjectsLocationsReservationsRequest,
  output: CreateAdminProjectsLocationsReservationsResponse,
  errors: [],
}));

/** Returns the reservation configuration. */
export interface GetAdminProjectsLocationsReservationsRequest {
  /** Required. The name of the reservation whose configuration to return. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id} */
  name: string;
}

export const GetAdminProjectsLocationsReservationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}" }),
  svc,
) as unknown as Schema.Schema<GetAdminProjectsLocationsReservationsRequest>;

export type GetAdminProjectsLocationsReservationsResponse = Reservation;
export const GetAdminProjectsLocationsReservationsResponse = Reservation;

export type GetAdminProjectsLocationsReservationsError = CommonErrors;

export const getAdminProjectsLocationsReservations: API.OperationMethod<GetAdminProjectsLocationsReservationsRequest, GetAdminProjectsLocationsReservationsResponse, GetAdminProjectsLocationsReservationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAdminProjectsLocationsReservationsRequest,
  output: GetAdminProjectsLocationsReservationsResponse,
  errors: [],
}));

/** Returns the list of reservations for the given project. */
export interface ListAdminProjectsLocationsReservationsRequest {
  /** Required. The parent whose reservations are to be listed. Structured like `projects/{project_number}/locations/{location}`. */
  parent: string;
  /** The maximum number of reservations to return. The service may return fewer than this value. If unset or zero, all reservations for the parent will be returned. */
  pageSize?: number;
  /** A page token, received from a previous `ListReservations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListReservations` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAdminProjectsLocationsReservationsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/reservations" }),
  svc,
) as unknown as Schema.Schema<ListAdminProjectsLocationsReservationsRequest>;

export type ListAdminProjectsLocationsReservationsResponse = ListReservationsResponse;
export const ListAdminProjectsLocationsReservationsResponse = ListReservationsResponse;

export type ListAdminProjectsLocationsReservationsError = CommonErrors;

export const listAdminProjectsLocationsReservations = API.makePaginated(() => ({
  input: ListAdminProjectsLocationsReservationsRequest,
  output: ListAdminProjectsLocationsReservationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates properties of the specified reservation. */
export interface PatchAdminProjectsLocationsReservationsRequest {
  /** The name of the reservation. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id} */
  name: string;
  /** Required. A mask specifying the reservation fields to change. */
  updateMask?: string;
  /** Request body */
  body?: Reservation;
}

export const PatchAdminProjectsLocationsReservationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Reservation).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAdminProjectsLocationsReservationsRequest>;

export type PatchAdminProjectsLocationsReservationsResponse = Reservation;
export const PatchAdminProjectsLocationsReservationsResponse = Reservation;

export type PatchAdminProjectsLocationsReservationsError = CommonErrors;

export const patchAdminProjectsLocationsReservations: API.OperationMethod<PatchAdminProjectsLocationsReservationsRequest, PatchAdminProjectsLocationsReservationsResponse, PatchAdminProjectsLocationsReservationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAdminProjectsLocationsReservationsRequest,
  output: PatchAdminProjectsLocationsReservationsResponse,
  errors: [],
}));

/** Deletes the specified reservation. */
export interface DeleteAdminProjectsLocationsReservationsRequest {
  /** Required. The name of the reservation to delete. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id} */
  name: string;
}

export const DeleteAdminProjectsLocationsReservationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAdminProjectsLocationsReservationsRequest>;

export type DeleteAdminProjectsLocationsReservationsResponse = Empty;
export const DeleteAdminProjectsLocationsReservationsResponse = Empty;

export type DeleteAdminProjectsLocationsReservationsError = CommonErrors;

export const deleteAdminProjectsLocationsReservations: API.OperationMethod<DeleteAdminProjectsLocationsReservationsRequest, DeleteAdminProjectsLocationsReservationsResponse, DeleteAdminProjectsLocationsReservationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAdminProjectsLocationsReservationsRequest,
  output: DeleteAdminProjectsLocationsReservationsResponse,
  errors: [],
}));

/** Lists the topics attached to the specified reservation. */
export interface ListAdminProjectsLocationsReservationsTopicsRequest {
  /** Required. The name of the reservation whose topics to list. Structured like: projects/{project_number}/locations/{location}/reservations/{reservation_id} */
  name: string;
  /** The maximum number of topics to return. The service may return fewer than this value. If unset or zero, all topics for the given reservation will be returned. */
  pageSize?: number;
  /** A page token, received from a previous `ListReservationTopics` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListReservationTopics` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAdminProjectsLocationsReservationsTopicsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/admin/projects/{projectsId}/locations/{locationsId}/reservations/{reservationsId}/topics" }),
  svc,
) as unknown as Schema.Schema<ListAdminProjectsLocationsReservationsTopicsRequest>;

export type ListAdminProjectsLocationsReservationsTopicsResponse = ListReservationTopicsResponse;
export const ListAdminProjectsLocationsReservationsTopicsResponse = ListReservationTopicsResponse;

export type ListAdminProjectsLocationsReservationsTopicsError = CommonErrors;

export const listAdminProjectsLocationsReservationsTopics = API.makePaginated(() => ({
  input: ListAdminProjectsLocationsReservationsTopicsRequest,
  output: ListAdminProjectsLocationsReservationsTopicsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the committed cursor. */
export interface CommitCursorCursorProjectsLocationsSubscriptionsRequest {
  /** The subscription for which to update the cursor. */
  subscription: string;
  /** Request body */
  body?: CommitCursorRequest;
}

export const CommitCursorCursorProjectsLocationsSubscriptionsRequest = Schema.Struct({
  subscription: Schema.String.pipe(T.HttpPath("subscription")),
  body: Schema.optional(CommitCursorRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/cursor/projects/{projectsId}/locations/{locationsId}/subscriptions/{subscriptionsId}:commitCursor", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CommitCursorCursorProjectsLocationsSubscriptionsRequest>;

export type CommitCursorCursorProjectsLocationsSubscriptionsResponse = CommitCursorResponse;
export const CommitCursorCursorProjectsLocationsSubscriptionsResponse = CommitCursorResponse;

export type CommitCursorCursorProjectsLocationsSubscriptionsError = CommonErrors;

export const commitCursorCursorProjectsLocationsSubscriptions: API.OperationMethod<CommitCursorCursorProjectsLocationsSubscriptionsRequest, CommitCursorCursorProjectsLocationsSubscriptionsResponse, CommitCursorCursorProjectsLocationsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CommitCursorCursorProjectsLocationsSubscriptionsRequest,
  output: CommitCursorCursorProjectsLocationsSubscriptionsResponse,
  errors: [],
}));

/** Returns all committed cursor information for a subscription. */
export interface ListCursorProjectsLocationsSubscriptionsCursorsRequest {
  /** Required. The subscription for which to retrieve cursors. Structured like `projects/{project_number}/locations/{location}/subscriptions/{subscription_id}`. */
  parent: string;
  /** The maximum number of cursors to return. The service may return fewer than this value. If unset or zero, all cursors for the parent will be returned. */
  pageSize?: number;
  /** A page token, received from a previous `ListPartitionCursors` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListPartitionCursors` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListCursorProjectsLocationsSubscriptionsCursorsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/cursor/projects/{projectsId}/locations/{locationsId}/subscriptions/{subscriptionsId}/cursors" }),
  svc,
) as unknown as Schema.Schema<ListCursorProjectsLocationsSubscriptionsCursorsRequest>;

export type ListCursorProjectsLocationsSubscriptionsCursorsResponse = ListPartitionCursorsResponse;
export const ListCursorProjectsLocationsSubscriptionsCursorsResponse = ListPartitionCursorsResponse;

export type ListCursorProjectsLocationsSubscriptionsCursorsError = CommonErrors;

export const listCursorProjectsLocationsSubscriptionsCursors = API.makePaginated(() => ({
  input: ListCursorProjectsLocationsSubscriptionsCursorsRequest,
  output: ListCursorProjectsLocationsSubscriptionsCursorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Compute statistics about a range of messages in a given topic and partition. */
export interface ComputeMessageStatsTopicStatsProjectsLocationsTopicsRequest {
  /** Required. The topic for which we should compute message stats. */
  topic: string;
  /** Request body */
  body?: ComputeMessageStatsRequest;
}

export const ComputeMessageStatsTopicStatsProjectsLocationsTopicsRequest = Schema.Struct({
  topic: Schema.String.pipe(T.HttpPath("topic")),
  body: Schema.optional(ComputeMessageStatsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/topicStats/projects/{projectsId}/locations/{locationsId}/topics/{topicsId}:computeMessageStats", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ComputeMessageStatsTopicStatsProjectsLocationsTopicsRequest>;

export type ComputeMessageStatsTopicStatsProjectsLocationsTopicsResponse = ComputeMessageStatsResponse;
export const ComputeMessageStatsTopicStatsProjectsLocationsTopicsResponse = ComputeMessageStatsResponse;

export type ComputeMessageStatsTopicStatsProjectsLocationsTopicsError = CommonErrors;

export const computeMessageStatsTopicStatsProjectsLocationsTopics: API.OperationMethod<ComputeMessageStatsTopicStatsProjectsLocationsTopicsRequest, ComputeMessageStatsTopicStatsProjectsLocationsTopicsResponse, ComputeMessageStatsTopicStatsProjectsLocationsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ComputeMessageStatsTopicStatsProjectsLocationsTopicsRequest,
  output: ComputeMessageStatsTopicStatsProjectsLocationsTopicsResponse,
  errors: [],
}));

/** Compute the head cursor for the partition. The head cursor's offset is guaranteed to be less than or equal to all messages which have not yet been acknowledged as published, and greater than the offset of any message whose publish has already been acknowledged. It is zero if there have never been messages in the partition. */
export interface ComputeHeadCursorTopicStatsProjectsLocationsTopicsRequest {
  /** Required. The topic for which we should compute the head cursor. */
  topic: string;
  /** Request body */
  body?: ComputeHeadCursorRequest;
}

export const ComputeHeadCursorTopicStatsProjectsLocationsTopicsRequest = Schema.Struct({
  topic: Schema.String.pipe(T.HttpPath("topic")),
  body: Schema.optional(ComputeHeadCursorRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/topicStats/projects/{projectsId}/locations/{locationsId}/topics/{topicsId}:computeHeadCursor", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ComputeHeadCursorTopicStatsProjectsLocationsTopicsRequest>;

export type ComputeHeadCursorTopicStatsProjectsLocationsTopicsResponse = ComputeHeadCursorResponse;
export const ComputeHeadCursorTopicStatsProjectsLocationsTopicsResponse = ComputeHeadCursorResponse;

export type ComputeHeadCursorTopicStatsProjectsLocationsTopicsError = CommonErrors;

export const computeHeadCursorTopicStatsProjectsLocationsTopics: API.OperationMethod<ComputeHeadCursorTopicStatsProjectsLocationsTopicsRequest, ComputeHeadCursorTopicStatsProjectsLocationsTopicsResponse, ComputeHeadCursorTopicStatsProjectsLocationsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ComputeHeadCursorTopicStatsProjectsLocationsTopicsRequest,
  output: ComputeHeadCursorTopicStatsProjectsLocationsTopicsResponse,
  errors: [],
}));

/** Compute the corresponding cursor for a publish or event time in a topic partition. */
export interface ComputeTimeCursorTopicStatsProjectsLocationsTopicsRequest {
  /** Required. The topic for which we should compute the cursor. */
  topic: string;
  /** Request body */
  body?: ComputeTimeCursorRequest;
}

export const ComputeTimeCursorTopicStatsProjectsLocationsTopicsRequest = Schema.Struct({
  topic: Schema.String.pipe(T.HttpPath("topic")),
  body: Schema.optional(ComputeTimeCursorRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/topicStats/projects/{projectsId}/locations/{locationsId}/topics/{topicsId}:computeTimeCursor", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ComputeTimeCursorTopicStatsProjectsLocationsTopicsRequest>;

export type ComputeTimeCursorTopicStatsProjectsLocationsTopicsResponse = ComputeTimeCursorResponse;
export const ComputeTimeCursorTopicStatsProjectsLocationsTopicsResponse = ComputeTimeCursorResponse;

export type ComputeTimeCursorTopicStatsProjectsLocationsTopicsError = CommonErrors;

export const computeTimeCursorTopicStatsProjectsLocationsTopics: API.OperationMethod<ComputeTimeCursorTopicStatsProjectsLocationsTopicsRequest, ComputeTimeCursorTopicStatsProjectsLocationsTopicsResponse, ComputeTimeCursorTopicStatsProjectsLocationsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ComputeTimeCursorTopicStatsProjectsLocationsTopicsRequest,
  output: ComputeTimeCursorTopicStatsProjectsLocationsTopicsResponse,
  errors: [],
}));

