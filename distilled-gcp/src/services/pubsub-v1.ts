// ==========================================================================
// Cloud Pub/Sub API (pubsub v1)
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
  name: "pubsub",
  version: "v1",
  rootUrl: "https://pubsub.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface TextConfig {
}

export const TextConfig: Schema.Schema<TextConfig> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "TextConfig" }) as any as Schema.Schema<TextConfig>;

export interface Snapshot {
  /** Optional. The name of the topic from which this snapshot is retaining messages. */
  topic?: string;
  /** Optional. See [Creating and managing labels] (https://cloud.google.com/pubsub/docs/labels). */
  labels?: Record<string, string>;
  /** Optional. The snapshot is guaranteed to exist up until this time. A newly-created snapshot expires no later than 7 days from the time of its creation. Its exact lifetime is determined at creation by the existing backlog in the source subscription. Specifically, the lifetime of the snapshot is `7 days - (age of oldest unacked message in the subscription)`. For example, consider a subscription whose oldest unacked message is 3 days old. If a snapshot is created from this subscription, the snapshot -- which will always capture this 3-day-old backlog as long as the snapshot exists -- will expire in 4 days. The service will refuse to create a snapshot that would expire in less than 1 hour after creation. */
  expireTime?: string;
  /** Optional. The name of the snapshot. */
  name?: string;
}

export const Snapshot: Schema.Schema<Snapshot> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  expireTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Snapshot" }) as any as Schema.Schema<Snapshot>;

export interface ListSnapshotsResponse {
  /** Optional. If not empty, indicates that there may be more snapshot that match the request; this value should be passed in a new `ListSnapshotsRequest`. */
  nextPageToken?: string;
  /** Optional. The resulting snapshots. */
  snapshots?: Array<Snapshot>;
}

export const ListSnapshotsResponse: Schema.Schema<ListSnapshotsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  snapshots: Schema.optional(Schema.Array(Snapshot)),
})).annotate({ identifier: "ListSnapshotsResponse" }) as any as Schema.Schema<ListSnapshotsResponse>;

export interface Pubsub_Schema {
  /** Output only. The timestamp that the revision was created. */
  revisionCreateTime?: string;
  /** The definition of the schema. This should contain a string representing the full definition of the schema that is a valid schema definition of the type specified in `type`. */
  definition?: string;
  /** The type of the schema definition. */
  type?: "TYPE_UNSPECIFIED" | "PROTOCOL_BUFFER" | "AVRO" | (string & {});
  /** Required. Name of the schema. Format is `projects/{project}/schemas/{schema}`. */
  name?: string;
  /** Output only. Immutable. The revision ID of the schema. */
  revisionId?: string;
}

export const Pubsub_Schema: Schema.Schema<Pubsub_Schema> = Schema.suspend(() => Schema.Struct({
  revisionCreateTime: Schema.optional(Schema.String),
  definition: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
})).annotate({ identifier: "Pubsub_Schema" }) as any as Schema.Schema<Pubsub_Schema>;

export interface ListSchemasResponse {
  /** If not empty, indicates that there may be more schemas that match the request; this value should be passed in a new `ListSchemasRequest`. */
  nextPageToken?: string;
  /** The resulting schemas. */
  schemas?: Array<Pubsub_Schema>;
}

export const ListSchemasResponse: Schema.Schema<ListSchemasResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  schemas: Schema.optional(Schema.Array(Pubsub_Schema)),
})).annotate({ identifier: "ListSchemasResponse" }) as any as Schema.Schema<ListSchemasResponse>;

export interface UpdateSnapshotRequest {
  /** Required. The updated snapshot object. */
  snapshot?: Snapshot;
  /** Required. Indicates which fields in the provided snapshot to update. Must be specified and non-empty. */
  updateMask?: string;
}

export const UpdateSnapshotRequest: Schema.Schema<UpdateSnapshotRequest> = Schema.suspend(() => Schema.Struct({
  snapshot: Schema.optional(Snapshot),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateSnapshotRequest" }) as any as Schema.Schema<UpdateSnapshotRequest>;

export interface UnstructuredInference {
  /** Optional. A parameters object to be included in each inference request. The parameters object is combined with the data field of the Pub/Sub message to form the inference request. */
  parameters?: Record<string, unknown>;
}

export const UnstructuredInference: Schema.Schema<UnstructuredInference> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "UnstructuredInference" }) as any as Schema.Schema<UnstructuredInference>;

export interface Expr {
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface AvroFormat {
}

export const AvroFormat: Schema.Schema<AvroFormat> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "AvroFormat" }) as any as Schema.Schema<AvroFormat>;

export interface TextFormat {
  /** Optional. When unset, '\n' is used. */
  delimiter?: string;
}

export const TextFormat: Schema.Schema<TextFormat> = Schema.suspend(() => Schema.Struct({
  delimiter: Schema.optional(Schema.String),
})).annotate({ identifier: "TextFormat" }) as any as Schema.Schema<TextFormat>;

export interface PubSubAvroFormat {
}

export const PubSubAvroFormat: Schema.Schema<PubSubAvroFormat> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PubSubAvroFormat" }) as any as Schema.Schema<PubSubAvroFormat>;

export interface CloudStorage {
  /** Optional. Data from Cloud Storage will be interpreted in Avro format. */
  avroFormat?: AvroFormat;
  /** Optional. Data from Cloud Storage will be interpreted as text. */
  textFormat?: TextFormat;
  /** Optional. Cloud Storage bucket. The bucket name must be without any prefix like "gs://". See the [bucket naming requirements] (https://cloud.google.com/storage/docs/buckets#naming). */
  bucket?: string;
  /** Output only. An output-only field that indicates the state of the Cloud Storage ingestion source. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CLOUD_STORAGE_PERMISSION_DENIED" | "PUBLISH_PERMISSION_DENIED" | "BUCKET_NOT_FOUND" | "TOO_MANY_OBJECTS" | (string & {});
  /** Optional. Glob pattern used to match objects that will be ingested. If unset, all objects will be ingested. See the [supported patterns](https://cloud.google.com/storage/docs/json_api/v1/objects/list#list-objects-and-prefixes-using-glob). */
  matchGlob?: string;
  /** Optional. Only objects with a larger or equal creation timestamp will be ingested. */
  minimumObjectCreateTime?: string;
  /** Optional. It will be assumed data from Cloud Storage was written via [Cloud Storage subscriptions](https://cloud.google.com/pubsub/docs/cloudstorage). */
  pubsubAvroFormat?: PubSubAvroFormat;
}

export const CloudStorage: Schema.Schema<CloudStorage> = Schema.suspend(() => Schema.Struct({
  avroFormat: Schema.optional(AvroFormat),
  textFormat: Schema.optional(TextFormat),
  bucket: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  matchGlob: Schema.optional(Schema.String),
  minimumObjectCreateTime: Schema.optional(Schema.String),
  pubsubAvroFormat: Schema.optional(PubSubAvroFormat),
})).annotate({ identifier: "CloudStorage" }) as any as Schema.Schema<CloudStorage>;

export interface PubsubMessage {
  /** The time at which the message was published, populated by the server when it receives the `Publish` call. It must not be populated by the publisher in a `Publish` call. */
  publishTime?: string;
  /** ID of this message, assigned by the server when the message is published. Guaranteed to be unique within the topic. This value may be read by a subscriber that receives a `PubsubMessage` via a `Pull` call or a push delivery. It must not be populated by the publisher in a `Publish` call. */
  messageId?: string;
  /** Optional. The message data field. If this field is empty, the message must contain at least one attribute. */
  data?: string;
  /** Optional. Attributes for this message. If this field is empty, the message must contain non-empty data. This can be used to filter messages on the subscription. */
  attributes?: Record<string, string>;
  /** Optional. If non-empty, identifies related messages for which publish order should be respected. If a `Subscription` has `enable_message_ordering` set to `true`, messages published with the same non-empty `ordering_key` value will be delivered to subscribers in the order in which they are received by the Pub/Sub system. All `PubsubMessage`s published in a given `PublishRequest` must specify the same `ordering_key` value. For more information, see [ordering messages](https://cloud.google.com/pubsub/docs/ordering). */
  orderingKey?: string;
}

export const PubsubMessage: Schema.Schema<PubsubMessage> = Schema.suspend(() => Schema.Struct({
  publishTime: Schema.optional(Schema.String),
  messageId: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
  attributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  orderingKey: Schema.optional(Schema.String),
})).annotate({ identifier: "PubsubMessage" }) as any as Schema.Schema<PubsubMessage>;

export interface ReceivedMessage {
  /** Optional. This ID can be used to acknowledge the received message. */
  ackId?: string;
  /** Optional. The message. */
  message?: PubsubMessage;
  /** Optional. The approximate number of times that Pub/Sub has attempted to deliver the associated message to a subscriber. More precisely, this is 1 + (number of NACKs) + (number of ack_deadline exceeds) for this message. A NACK is any call to ModifyAckDeadline with a 0 deadline. An ack_deadline exceeds event is whenever a message is not acknowledged within ack_deadline. Note that ack_deadline is initially Subscription.ackDeadlineSeconds, but may get extended automatically by the client library. Upon the first delivery of a given message, `delivery_attempt` will have a value of 1. The value is calculated at best effort and is approximate. If a DeadLetterPolicy is not set on the subscription, this will be 0. */
  deliveryAttempt?: number;
}

export const ReceivedMessage: Schema.Schema<ReceivedMessage> = Schema.suspend(() => Schema.Struct({
  ackId: Schema.optional(Schema.String),
  message: Schema.optional(PubsubMessage),
  deliveryAttempt: Schema.optional(Schema.Number),
})).annotate({ identifier: "ReceivedMessage" }) as any as Schema.Schema<ReceivedMessage>;

export interface BigQueryConfig {
  /** Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key to additional columns in the table. The subscription name, message_id, and publish_time fields are put in their own columns while all other message properties (other than data) are written to a JSON object in the attributes column. */
  writeMetadata?: boolean;
  /** Optional. The name of the table to which to write data, of the form {projectId}.{datasetId}.{tableId} */
  table?: string;
  /** Optional. The service account to use to write to BigQuery. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used. */
  serviceAccountEmail?: string;
  /** Output only. An output-only field that indicates whether or not the subscription can receive messages. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "PERMISSION_DENIED" | "NOT_FOUND" | "SCHEMA_MISMATCH" | "IN_TRANSIT_LOCATION_RESTRICTION" | "VERTEX_AI_LOCATION_RESTRICTION" | (string & {});
  /** Optional. When true and use_topic_schema is true, any fields that are a part of the topic schema that are not part of the BigQuery table schema are dropped when writing to BigQuery. Otherwise, the schemas must be kept in sync and any messages with extra fields are not written and remain in the subscription's backlog. */
  dropUnknownFields?: boolean;
  /** Optional. When true, use the BigQuery table's schema as the columns to write to in BigQuery. `use_table_schema` and `use_topic_schema` cannot be enabled at the same time. */
  useTableSchema?: boolean;
  /** Optional. When true, use the topic's schema as the columns to write to in BigQuery, if it exists. `use_topic_schema` and `use_table_schema` cannot be enabled at the same time. */
  useTopicSchema?: boolean;
}

export const BigQueryConfig: Schema.Schema<BigQueryConfig> = Schema.suspend(() => Schema.Struct({
  writeMetadata: Schema.optional(Schema.Boolean),
  table: Schema.optional(Schema.String),
  serviceAccountEmail: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  dropUnknownFields: Schema.optional(Schema.Boolean),
  useTableSchema: Schema.optional(Schema.Boolean),
  useTopicSchema: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "BigQueryConfig" }) as any as Schema.Schema<BigQueryConfig>;

export interface AvroConfig {
  /** Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key as additional fields in the output. The subscription name, message_id, and publish_time fields are put in their own fields while all other message properties other than data (for example, an ordering_key, if present) are added as entries in the attributes map. */
  writeMetadata?: boolean;
  /** Optional. When true, the output Cloud Storage file will be serialized using the topic schema, if it exists. */
  useTopicSchema?: boolean;
}

export const AvroConfig: Schema.Schema<AvroConfig> = Schema.suspend(() => Schema.Struct({
  writeMetadata: Schema.optional(Schema.Boolean),
  useTopicSchema: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AvroConfig" }) as any as Schema.Schema<AvroConfig>;

export interface CloudStorageConfig {
  /** Optional. The maximum number of messages that can be written to a Cloud Storage file before a new file is created. Min 1000 messages. */
  maxMessages?: string;
  /** Optional. The maximum bytes that can be written to a Cloud Storage file before a new file is created. Min 1 KB, max 10 GiB. The max_bytes limit may be exceeded in cases where messages are larger than the limit. */
  maxBytes?: string;
  /** Required. User-provided name for the Cloud Storage bucket. The bucket must be created by the user. The bucket name must be without any prefix like "gs://". See the [bucket naming requirements] (https://cloud.google.com/storage/docs/buckets#naming). */
  bucket?: string;
  /** Optional. User-provided format string specifying how to represent datetimes in Cloud Storage filenames. See the [datetime format guidance](https://cloud.google.com/pubsub/docs/create-cloudstorage-subscription#file_names). */
  filenameDatetimeFormat?: string;
  /** Optional. If set, message data will be written to Cloud Storage in Avro format. */
  avroConfig?: AvroConfig;
  /** Optional. User-provided suffix for Cloud Storage filename. See the [object naming requirements](https://cloud.google.com/storage/docs/objects#naming). Must not end in "/". */
  filenameSuffix?: string;
  /** Optional. The service account to use to write to Cloud Storage. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used. */
  serviceAccountEmail?: string;
  /** Optional. User-provided prefix for Cloud Storage filename. See the [object naming requirements](https://cloud.google.com/storage/docs/objects#naming). */
  filenamePrefix?: string;
  /** Output only. An output-only field that indicates whether or not the subscription can receive messages. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "PERMISSION_DENIED" | "NOT_FOUND" | "IN_TRANSIT_LOCATION_RESTRICTION" | "SCHEMA_MISMATCH" | "VERTEX_AI_LOCATION_RESTRICTION" | (string & {});
  /** Optional. The maximum duration that can elapse before a new Cloud Storage file is created. Min 1 minute, max 10 minutes, default 5 minutes. May not exceed the subscription's acknowledgment deadline. */
  maxDuration?: string;
  /** Optional. If set, message data will be written to Cloud Storage in text format. */
  textConfig?: TextConfig;
}

export const CloudStorageConfig: Schema.Schema<CloudStorageConfig> = Schema.suspend(() => Schema.Struct({
  maxMessages: Schema.optional(Schema.String),
  maxBytes: Schema.optional(Schema.String),
  bucket: Schema.optional(Schema.String),
  filenameDatetimeFormat: Schema.optional(Schema.String),
  avroConfig: Schema.optional(AvroConfig),
  filenameSuffix: Schema.optional(Schema.String),
  serviceAccountEmail: Schema.optional(Schema.String),
  filenamePrefix: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  maxDuration: Schema.optional(Schema.String),
  textConfig: Schema.optional(TextConfig),
})).annotate({ identifier: "CloudStorageConfig" }) as any as Schema.Schema<CloudStorageConfig>;

export interface DeadLetterPolicy {
  /** Optional. The name of the topic to which dead letter messages should be published. Format is `projects/{project}/topics/{topic}`.The Pub/Sub service account associated with the enclosing subscription's parent project (i.e., service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com) must have permission to Publish() to this topic. The operation will fail if the topic does not exist. Users should ensure that there is a subscription attached to this topic since messages published to a topic with no subscriptions are lost. */
  deadLetterTopic?: string;
  /** Optional. The maximum number of delivery attempts for any message. The value must be between 5 and 100. The number of delivery attempts is defined as 1 + (the sum of number of NACKs and number of times the acknowledgment deadline has been exceeded for the message). A NACK is any call to ModifyAckDeadline with a 0 deadline. Note that client libraries may automatically extend ack_deadlines. This field will be honored on a best effort basis. If this parameter is 0, a default value of 5 is used. */
  maxDeliveryAttempts?: number;
}

export const DeadLetterPolicy: Schema.Schema<DeadLetterPolicy> = Schema.suspend(() => Schema.Struct({
  deadLetterTopic: Schema.optional(Schema.String),
  maxDeliveryAttempts: Schema.optional(Schema.Number),
})).annotate({ identifier: "DeadLetterPolicy" }) as any as Schema.Schema<DeadLetterPolicy>;

export interface ExpirationPolicy {
  /** Optional. Specifies the "time-to-live" duration for an associated resource. The resource expires if it is not active for a period of `ttl`. The definition of "activity" depends on the type of the associated resource. The minimum and maximum allowed values for `ttl` depend on the type of the associated resource, as well. If `ttl` is not set, the associated resource never expires. */
  ttl?: string;
}

export const ExpirationPolicy: Schema.Schema<ExpirationPolicy> = Schema.suspend(() => Schema.Struct({
  ttl: Schema.optional(Schema.String),
})).annotate({ identifier: "ExpirationPolicy" }) as any as Schema.Schema<ExpirationPolicy>;

export interface AnalyticsHubSubscriptionInfo {
  /** Optional. The name of the associated Analytics Hub subscription resource. Pattern: "projects/{project}/locations/{location}/subscriptions/{subscription}" */
  subscription?: string;
  /** Optional. The name of the associated Analytics Hub listing resource. Pattern: "projects/{project}/locations/{location}/dataExchanges/{data_exchange}/listings/{listing}" */
  listing?: string;
}

export const AnalyticsHubSubscriptionInfo: Schema.Schema<AnalyticsHubSubscriptionInfo> = Schema.suspend(() => Schema.Struct({
  subscription: Schema.optional(Schema.String),
  listing: Schema.optional(Schema.String),
})).annotate({ identifier: "AnalyticsHubSubscriptionInfo" }) as any as Schema.Schema<AnalyticsHubSubscriptionInfo>;

export interface RetryPolicy {
  /** Optional. The maximum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 600 seconds. */
  maximumBackoff?: string;
  /** Optional. The minimum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 10 seconds. */
  minimumBackoff?: string;
}

export const RetryPolicy: Schema.Schema<RetryPolicy> = Schema.suspend(() => Schema.Struct({
  maximumBackoff: Schema.optional(Schema.String),
  minimumBackoff: Schema.optional(Schema.String),
})).annotate({ identifier: "RetryPolicy" }) as any as Schema.Schema<RetryPolicy>;

export interface AIInference {
  /** Required. An endpoint to a Vertex AI model of the form `projects/{project}/locations/{location}/endpoints/{endpoint}` or `projects/{project}/locations/{location}/publishers/{publisher}/models/{model}`. Vertex AI API requests will be sent to this endpoint. */
  endpoint?: string;
  /** Optional. The service account to use to make prediction requests against endpoints. The resource creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent]({$universe.dns_names.final_documentation_domain}/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used. */
  serviceAccountEmail?: string;
  /** Optional. Requests and responses can be any arbitrary JSON object. */
  unstructuredInference?: UnstructuredInference;
}

export const AIInference: Schema.Schema<AIInference> = Schema.suspend(() => Schema.Struct({
  endpoint: Schema.optional(Schema.String),
  serviceAccountEmail: Schema.optional(Schema.String),
  unstructuredInference: Schema.optional(UnstructuredInference),
})).annotate({ identifier: "AIInference" }) as any as Schema.Schema<AIInference>;

export interface JavaScriptUDF {
  /** Required. Name of the JavasScript function that should applied to Pub/Sub messages. */
  functionName?: string;
  /** Required. JavaScript code that contains a function `function_name` with the below signature: ``` /** * Transforms a Pub/Sub message. * @return {(Object)>|null)} - To * filter a message, return `null`. To transform a message return a map * with the following keys: * - (required) 'data' : {string} * - (optional) 'attributes' : {Object} * Returning empty `attributes` will remove all attributes from the * message. * * @param {(Object)>} Pub/Sub * message. Keys: * - (required) 'data' : {string} * - (required) 'attributes' : {Object} * * @param {Object} metadata - Pub/Sub message metadata. * Keys: * - (optional) 'message_id' : {string} * - (optional) 'publish_time': {string} YYYY-MM-DDTHH:MM:SSZ format * - (optional) 'ordering_key': {string} * / function (message, metadata) { } ``` */
  code?: string;
}

export const JavaScriptUDF: Schema.Schema<JavaScriptUDF> = Schema.suspend(() => Schema.Struct({
  functionName: Schema.optional(Schema.String),
  code: Schema.optional(Schema.String),
})).annotate({ identifier: "JavaScriptUDF" }) as any as Schema.Schema<JavaScriptUDF>;

export interface MessageTransform {
  /** Optional. AI Inference. Specifies the Vertex AI endpoint that inference requests built from the Pub/Sub message data and provided parameters will be sent to. */
  aiInference?: AIInference;
  /** Optional. This field is deprecated, use the `disabled` field to disable transforms. */
  enabled?: boolean;
  /** Optional. JavaScript User Defined Function. If multiple JavaScriptUDF's are specified on a resource, each must have a unique `function_name`. */
  javascriptUdf?: JavaScriptUDF;
  /** Optional. If true, the transform is disabled and will not be applied to messages. Defaults to `false`. */
  disabled?: boolean;
}

export const MessageTransform: Schema.Schema<MessageTransform> = Schema.suspend(() => Schema.Struct({
  aiInference: Schema.optional(AIInference),
  enabled: Schema.optional(Schema.Boolean),
  javascriptUdf: Schema.optional(JavaScriptUDF),
  disabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "MessageTransform" }) as any as Schema.Schema<MessageTransform>;

export interface OidcToken {
  /** Optional. [Service account email](https://cloud.google.com/iam/docs/service-accounts) used for generating the OIDC token. For more information on setting up authentication, see [Push subscriptions](https://cloud.google.com/pubsub/docs/push). */
  serviceAccountEmail?: string;
  /** Optional. Audience to be used when generating OIDC token. The audience claim identifies the recipients that the JWT is intended for. The audience value is a single case-sensitive string. Having multiple values (array) for the audience field is not supported. More info about the OIDC JWT token audience here: https://tools.ietf.org/html/rfc7519#section-4.1.3 Note: if not specified, the Push endpoint URL will be used. */
  audience?: string;
}

export const OidcToken: Schema.Schema<OidcToken> = Schema.suspend(() => Schema.Struct({
  serviceAccountEmail: Schema.optional(Schema.String),
  audience: Schema.optional(Schema.String),
})).annotate({ identifier: "OidcToken" }) as any as Schema.Schema<OidcToken>;

export interface PubsubWrapper {
}

export const PubsubWrapper: Schema.Schema<PubsubWrapper> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PubsubWrapper" }) as any as Schema.Schema<PubsubWrapper>;

export interface NoWrapper {
  /** Optional. When true, writes the Pub/Sub message metadata to `x-goog-pubsub-:` headers of the HTTP request. Writes the Pub/Sub message attributes to `:` headers of the HTTP request. */
  writeMetadata?: boolean;
}

export const NoWrapper: Schema.Schema<NoWrapper> = Schema.suspend(() => Schema.Struct({
  writeMetadata: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "NoWrapper" }) as any as Schema.Schema<NoWrapper>;

export interface PushConfig {
  /** Optional. Endpoint configuration attributes that can be used to control different aspects of the message delivery. The only currently supported attribute is `x-goog-version`, which you can use to change the format of the pushed message. This attribute indicates the version of the data expected by the endpoint. This controls the shape of the pushed message (i.e., its fields and metadata). If not present during the `CreateSubscription` call, it will default to the version of the Pub/Sub API used to make such call. If not present in a `ModifyPushConfig` call, its value will not be changed. `GetSubscription` calls will always return a valid version, even if the subscription was created without this attribute. The only supported values for the `x-goog-version` attribute are: * `v1beta1`: uses the push format defined in the v1beta1 Pub/Sub API. * `v1` or `v1beta2`: uses the push format defined in the v1 Pub/Sub API. For example: `attributes { "x-goog-version": "v1" }` */
  attributes?: Record<string, string>;
  /** Optional. A URL locating the endpoint to which messages should be pushed. For example, a Webhook endpoint might use `https://example.com/push`. */
  pushEndpoint?: string;
  /** Optional. If specified, Pub/Sub will generate and attach an OIDC JWT token as an `Authorization` header in the HTTP request for every pushed message. */
  oidcToken?: OidcToken;
  /** Optional. When set, the payload to the push endpoint is in the form of the JSON representation of a PubsubMessage (https://cloud.google.com/pubsub/docs/reference/rpc/google.pubsub.v1#pubsubmessage). */
  pubsubWrapper?: PubsubWrapper;
  /** Optional. When set, the payload to the push endpoint is not wrapped. */
  noWrapper?: NoWrapper;
}

export const PushConfig: Schema.Schema<PushConfig> = Schema.suspend(() => Schema.Struct({
  attributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  pushEndpoint: Schema.optional(Schema.String),
  oidcToken: Schema.optional(OidcToken),
  pubsubWrapper: Schema.optional(PubsubWrapper),
  noWrapper: Schema.optional(NoWrapper),
})).annotate({ identifier: "PushConfig" }) as any as Schema.Schema<PushConfig>;

export interface Subscription {
  /** Optional. If delivery to BigQuery is used with this subscription, this field is used to configure it. */
  bigqueryConfig?: BigQueryConfig;
  /** Required. Identifier. The name of the subscription. It must have the format `"projects/{project}/subscriptions/{subscription}"`. `{subscription}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. */
  name?: string;
  /** Optional. If delivery to Google Cloud Storage is used with this subscription, this field is used to configure it. */
  cloudStorageConfig?: CloudStorageConfig;
  /** Optional. A policy that specifies the conditions for dead lettering messages in this subscription. If dead_letter_policy is not set, dead lettering is disabled. The Pub/Sub service account associated with this subscriptions's parent project (i.e., service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com) must have permission to Acknowledge() messages on this subscription. */
  deadLetterPolicy?: DeadLetterPolicy;
  /** Optional. If true, messages published with the same `ordering_key` in `PubsubMessage` will be delivered to the subscribers in the order in which they are received by the Pub/Sub system. Otherwise, they may be delivered in any order. */
  enableMessageOrdering?: boolean;
  /** Optional. Indicates whether to retain acknowledged messages. If true, then messages are not expunged from the subscription's backlog, even if they are acknowledged, until they fall out of the `message_retention_duration` window. This must be true if you would like to [`Seek` to a timestamp] (https://cloud.google.com/pubsub/docs/replay-overview#seek_to_a_time) in the past to replay previously-acknowledged messages. */
  retainAckedMessages?: boolean;
  /** Optional. An expression written in the Pub/Sub [filter language](https://cloud.google.com/pubsub/docs/filtering). If non-empty, then only `PubsubMessage`s whose `attributes` field matches the filter are delivered on this subscription. If empty, then no messages are filtered out. */
  filter?: string;
  /** Optional. If true, Pub/Sub provides the following guarantees for the delivery of a message with a given value of `message_id` on this subscription: * The message sent to a subscriber is guaranteed not to be resent before the message's acknowledgment deadline expires. * An acknowledged message will not be resent to a subscriber. Note that subscribers may still receive multiple copies of a message when `enable_exactly_once_delivery` is true if the message was published multiple times by a publisher client. These copies are considered distinct by Pub/Sub and have distinct `message_id` values. */
  enableExactlyOnceDelivery?: boolean;
  /** Optional. A policy that specifies the conditions for this subscription's expiration. A subscription is considered active as long as any connected subscriber is successfully consuming messages from the subscription or is issuing operations on the subscription. If `expiration_policy` is not set, a *default policy* with `ttl` of 31 days will be used. The minimum allowed value for `expiration_policy.ttl` is 1 day. If `expiration_policy` is set, but `expiration_policy.ttl` is not set, the subscription never expires. */
  expirationPolicy?: ExpirationPolicy;
  /** Optional. See [Creating and managing labels](https://cloud.google.com/pubsub/docs/labels). */
  labels?: Record<string, string>;
  /** Output only. Information about the associated Analytics Hub subscription. Only set if the subscription is created by Analytics Hub. */
  analyticsHubSubscriptionInfo?: AnalyticsHubSubscriptionInfo;
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" */
  tags?: Record<string, string>;
  /** Output only. Indicates the minimum duration for which a message is retained after it is published to the subscription's topic. If this field is set, messages published to the subscription's topic in the last `topic_message_retention_duration` are always available to subscribers. See the `message_retention_duration` field in `Topic`. This field is set only in responses from the server; it is ignored if it is set in any requests. */
  topicMessageRetentionDuration?: string;
  /** Optional. Indicates whether the subscription is detached from its topic. Detached subscriptions don't receive messages from their topic and don't retain any backlog. `Pull` and `StreamingPull` requests will return FAILED_PRECONDITION. If the subscription is a push subscription, pushes to the endpoint will not be made. */
  detached?: boolean;
  /** Required. The name of the topic from which this subscription is receiving messages. Format is `projects/{project}/topics/{topic}`. The value of this field will be `_deleted-topic_` if the topic has been deleted. */
  topic?: string;
  /** Optional. How long to retain unacknowledged messages in the subscription's backlog, from the moment a message is published. If `retain_acked_messages` is true, then this also configures the retention of acknowledged messages, and thus configures how far back in time a `Seek` can be done. Defaults to 7 days. Cannot be more than 31 days or less than 10 minutes. */
  messageRetentionDuration?: string;
  /** Optional. The approximate amount of time (on a best-effort basis) Pub/Sub waits for the subscriber to acknowledge receipt before resending the message. In the interval after the message is delivered and before it is acknowledged, it is considered to be _outstanding_. During that time period, the message will not be redelivered (on a best-effort basis). For pull subscriptions, this value is used as the initial value for the ack deadline. To override this value for a given message, call `ModifyAckDeadline` with the corresponding `ack_id` if using non-streaming pull or send the `ack_id` in a `StreamingModifyAckDeadlineRequest` if using streaming pull. The minimum custom deadline you can specify is 10 seconds. The maximum custom deadline you can specify is 600 seconds (10 minutes). If this parameter is 0, a default value of 10 seconds is used. For push delivery, this value is also used to set the request timeout for the call to the push endpoint. If the subscriber never acknowledges the message, the Pub/Sub system will eventually redeliver the message. */
  ackDeadlineSeconds?: number;
  /** Output only. An output-only field indicating whether or not the subscription can receive messages. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "RESOURCE_ERROR" | (string & {});
  /** Optional. A policy that specifies how Pub/Sub retries message delivery for this subscription. If not set, the default retry policy is applied. This generally implies that messages will be retried as soon as possible for healthy subscribers. RetryPolicy will be triggered on NACKs or acknowledgment deadline exceeded events for a given message. */
  retryPolicy?: RetryPolicy;
  /** Optional. Transforms to be applied to messages before they are delivered to subscribers. Transforms are applied in the order specified. */
  messageTransforms?: Array<MessageTransform>;
  /** Optional. If push delivery is used with this subscription, this field is used to configure it. */
  pushConfig?: PushConfig;
}

export const Subscription: Schema.Schema<Subscription> = Schema.suspend(() => Schema.Struct({
  bigqueryConfig: Schema.optional(BigQueryConfig),
  name: Schema.optional(Schema.String),
  cloudStorageConfig: Schema.optional(CloudStorageConfig),
  deadLetterPolicy: Schema.optional(DeadLetterPolicy),
  enableMessageOrdering: Schema.optional(Schema.Boolean),
  retainAckedMessages: Schema.optional(Schema.Boolean),
  filter: Schema.optional(Schema.String),
  enableExactlyOnceDelivery: Schema.optional(Schema.Boolean),
  expirationPolicy: Schema.optional(ExpirationPolicy),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  analyticsHubSubscriptionInfo: Schema.optional(AnalyticsHubSubscriptionInfo),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  topicMessageRetentionDuration: Schema.optional(Schema.String),
  detached: Schema.optional(Schema.Boolean),
  topic: Schema.optional(Schema.String),
  messageRetentionDuration: Schema.optional(Schema.String),
  ackDeadlineSeconds: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
  retryPolicy: Schema.optional(RetryPolicy),
  messageTransforms: Schema.optional(Schema.Array(MessageTransform)),
  pushConfig: Schema.optional(PushConfig),
})).annotate({ identifier: "Subscription" }) as any as Schema.Schema<Subscription>;

export interface UpdateSubscriptionRequest {
  /** Required. The updated subscription object. */
  subscription?: Subscription;
  /** Required. Indicates which fields in the provided subscription to update. Must be specified and non-empty. */
  updateMask?: string;
}

export const UpdateSubscriptionRequest: Schema.Schema<UpdateSubscriptionRequest> = Schema.suspend(() => Schema.Struct({
  subscription: Schema.optional(Subscription),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateSubscriptionRequest" }) as any as Schema.Schema<UpdateSubscriptionRequest>;

export interface AwsMsk {
  /** Output only. An output-only field that indicates the state of the Amazon MSK ingestion source. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "MSK_PERMISSION_DENIED" | "PUBLISH_PERMISSION_DENIED" | "CLUSTER_NOT_FOUND" | "TOPIC_NOT_FOUND" | (string & {});
  /** Required. AWS role ARN to be used for Federated Identity authentication with Amazon MSK. Check the Pub/Sub docs for how to set up this role and the required permissions that need to be attached to it. */
  awsRoleArn?: string;
  /** Required. The Amazon Resource Name (ARN) that uniquely identifies the cluster. */
  clusterArn?: string;
  /** Required. The name of the topic in the Amazon MSK cluster that Pub/Sub will import from. */
  topic?: string;
  /** Required. The GCP service account to be used for Federated Identity authentication with Amazon MSK (via a `AssumeRoleWithWebIdentity` call for the provided role). The `aws_role_arn` must be set up with `accounts.google.com:sub` equals to this service account number. */
  gcpServiceAccount?: string;
}

export const AwsMsk: Schema.Schema<AwsMsk> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  awsRoleArn: Schema.optional(Schema.String),
  clusterArn: Schema.optional(Schema.String),
  topic: Schema.optional(Schema.String),
  gcpServiceAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "AwsMsk" }) as any as Schema.Schema<AwsMsk>;

export interface AzureEventHubs {
  /** Optional. The tenant id of the Azure application that is being used to authenticate Pub/Sub. */
  tenantId?: string;
  /** Optional. The name of the Event Hubs namespace. */
  namespace?: string;
  /** Optional. The client id of the Azure application that is being used to authenticate Pub/Sub. */
  clientId?: string;
  /** Optional. The name of the Event Hub. */
  eventHub?: string;
  /** Optional. The Azure subscription id. */
  subscriptionId?: string;
  /** Optional. The GCP service account to be used for Federated Identity authentication. */
  gcpServiceAccount?: string;
  /** Output only. An output-only field that indicates the state of the Event Hubs ingestion source. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "EVENT_HUBS_PERMISSION_DENIED" | "PUBLISH_PERMISSION_DENIED" | "NAMESPACE_NOT_FOUND" | "EVENT_HUB_NOT_FOUND" | "SUBSCRIPTION_NOT_FOUND" | "RESOURCE_GROUP_NOT_FOUND" | (string & {});
  /** Optional. Name of the resource group within the azure subscription. */
  resourceGroup?: string;
}

export const AzureEventHubs: Schema.Schema<AzureEventHubs> = Schema.suspend(() => Schema.Struct({
  tenantId: Schema.optional(Schema.String),
  namespace: Schema.optional(Schema.String),
  clientId: Schema.optional(Schema.String),
  eventHub: Schema.optional(Schema.String),
  subscriptionId: Schema.optional(Schema.String),
  gcpServiceAccount: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  resourceGroup: Schema.optional(Schema.String),
})).annotate({ identifier: "AzureEventHubs" }) as any as Schema.Schema<AzureEventHubs>;

export interface AwsKinesis {
  /** Required. The GCP service account to be used for Federated Identity authentication with Kinesis (via a `AssumeRoleWithWebIdentity` call for the provided role). The `aws_role_arn` must be set up with `accounts.google.com:sub` equals to this service account number. */
  gcpServiceAccount?: string;
  /** Output only. An output-only field that indicates the state of the Kinesis ingestion source. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "KINESIS_PERMISSION_DENIED" | "PUBLISH_PERMISSION_DENIED" | "STREAM_NOT_FOUND" | "CONSUMER_NOT_FOUND" | (string & {});
  /** Required. The Kinesis consumer ARN to used for ingestion in Enhanced Fan-Out mode. The consumer must be already created and ready to be used. */
  consumerArn?: string;
  /** Required. AWS role ARN to be used for Federated Identity authentication with Kinesis. Check the Pub/Sub docs for how to set up this role and the required permissions that need to be attached to it. */
  awsRoleArn?: string;
  /** Required. The Kinesis stream ARN to ingest data from. */
  streamArn?: string;
}

export const AwsKinesis: Schema.Schema<AwsKinesis> = Schema.suspend(() => Schema.Struct({
  gcpServiceAccount: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  consumerArn: Schema.optional(Schema.String),
  awsRoleArn: Schema.optional(Schema.String),
  streamArn: Schema.optional(Schema.String),
})).annotate({ identifier: "AwsKinesis" }) as any as Schema.Schema<AwsKinesis>;

export interface PlatformLogsSettings {
  /** Optional. The minimum severity level of Platform Logs that will be written. */
  severity?: "SEVERITY_UNSPECIFIED" | "DISABLED" | "DEBUG" | "INFO" | "WARNING" | "ERROR" | (string & {});
}

export const PlatformLogsSettings: Schema.Schema<PlatformLogsSettings> = Schema.suspend(() => Schema.Struct({
  severity: Schema.optional(Schema.String),
})).annotate({ identifier: "PlatformLogsSettings" }) as any as Schema.Schema<PlatformLogsSettings>;

export interface ConfluentCloud {
  /** Required. The id of the cluster. */
  clusterId?: string;
  /** Required. The name of the topic in the Confluent Cloud cluster that Pub/Sub will import from. */
  topic?: string;
  /** Required. The address of the bootstrap server. The format is url:port. */
  bootstrapServer?: string;
  /** Required. The id of the identity pool to be used for Federated Identity authentication with Confluent Cloud. See https://docs.confluent.io/cloud/current/security/authenticate/workload-identities/identity-providers/oauth/identity-pools.html#add-oauth-identity-pools. */
  identityPoolId?: string;
  /** Required. The GCP service account to be used for Federated Identity authentication with `identity_pool_id`. */
  gcpServiceAccount?: string;
  /** Output only. An output-only field that indicates the state of the Confluent Cloud ingestion source. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CONFLUENT_CLOUD_PERMISSION_DENIED" | "PUBLISH_PERMISSION_DENIED" | "UNREACHABLE_BOOTSTRAP_SERVER" | "CLUSTER_NOT_FOUND" | "TOPIC_NOT_FOUND" | (string & {});
}

export const ConfluentCloud: Schema.Schema<ConfluentCloud> = Schema.suspend(() => Schema.Struct({
  clusterId: Schema.optional(Schema.String),
  topic: Schema.optional(Schema.String),
  bootstrapServer: Schema.optional(Schema.String),
  identityPoolId: Schema.optional(Schema.String),
  gcpServiceAccount: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "ConfluentCloud" }) as any as Schema.Schema<ConfluentCloud>;

export interface IngestionDataSourceSettings {
  /** Optional. Amazon MSK. */
  awsMsk?: AwsMsk;
  /** Optional. Azure Event Hubs. */
  azureEventHubs?: AzureEventHubs;
  /** Optional. Amazon Kinesis Data Streams. */
  awsKinesis?: AwsKinesis;
  /** Optional. Cloud Storage. */
  cloudStorage?: CloudStorage;
  /** Optional. Platform Logs settings. If unset, no Platform Logs will be generated. */
  platformLogsSettings?: PlatformLogsSettings;
  /** Optional. Confluent Cloud. */
  confluentCloud?: ConfluentCloud;
}

export const IngestionDataSourceSettings: Schema.Schema<IngestionDataSourceSettings> = Schema.suspend(() => Schema.Struct({
  awsMsk: Schema.optional(AwsMsk),
  azureEventHubs: Schema.optional(AzureEventHubs),
  awsKinesis: Schema.optional(AwsKinesis),
  cloudStorage: Schema.optional(CloudStorage),
  platformLogsSettings: Schema.optional(PlatformLogsSettings),
  confluentCloud: Schema.optional(ConfluentCloud),
})).annotate({ identifier: "IngestionDataSourceSettings" }) as any as Schema.Schema<IngestionDataSourceSettings>;

export interface AcknowledgeRequest {
  /** Required. The acknowledgment ID for the messages being acknowledged that was returned by the Pub/Sub system in the `Pull` response. Must not be empty. */
  ackIds?: Array<string>;
}

export const AcknowledgeRequest: Schema.Schema<AcknowledgeRequest> = Schema.suspend(() => Schema.Struct({
  ackIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AcknowledgeRequest" }) as any as Schema.Schema<AcknowledgeRequest>;

export interface ValidateSchemaResponse {
}

export const ValidateSchemaResponse: Schema.Schema<ValidateSchemaResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ValidateSchemaResponse" }) as any as Schema.Schema<ValidateSchemaResponse>;

export interface ListSchemaRevisionsResponse {
  /** The revisions of the schema. */
  schemas?: Array<Pubsub_Schema>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is empty, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListSchemaRevisionsResponse: Schema.Schema<ListSchemaRevisionsResponse> = Schema.suspend(() => Schema.Struct({
  schemas: Schema.optional(Schema.Array(Pubsub_Schema)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSchemaRevisionsResponse" }) as any as Schema.Schema<ListSchemaRevisionsResponse>;

export interface MessageStoragePolicy {
  /** Optional. If true, `allowed_persistence_regions` is also used to enforce in-transit guarantees for messages. That is, Pub/Sub will fail Publish operations on this topic and subscribe operations on any subscription attached to this topic in any region that is not in `allowed_persistence_regions`. */
  enforceInTransit?: boolean;
  /** Optional. A list of IDs of Google Cloud regions where messages that are published to the topic may be persisted in storage. Messages published by publishers running in non-allowed Google Cloud regions (or running outside of Google Cloud altogether) are routed for storage in one of the allowed regions. An empty list means that no regions are allowed, and is not a valid configuration. */
  allowedPersistenceRegions?: Array<string>;
}

export const MessageStoragePolicy: Schema.Schema<MessageStoragePolicy> = Schema.suspend(() => Schema.Struct({
  enforceInTransit: Schema.optional(Schema.Boolean),
  allowedPersistenceRegions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MessageStoragePolicy" }) as any as Schema.Schema<MessageStoragePolicy>;

export interface SchemaSettings {
  /** Optional. The minimum (inclusive) revision allowed for validating messages. If empty or not present, allow any revision to be validated against last_revision or any revision created before. */
  firstRevisionId?: string;
  /** Optional. The encoding of messages validated against `schema`. */
  encoding?: "ENCODING_UNSPECIFIED" | "JSON" | "BINARY" | (string & {});
  /** Optional. The maximum (inclusive) revision allowed for validating messages. If empty or not present, allow any revision to be validated against first_revision or any revision created after. */
  lastRevisionId?: string;
  /** Required. The name of the schema that messages published should be validated against. Format is `projects/{project}/schemas/{schema}`. The value of this field will be `_deleted-schema_` if the schema has been deleted. */
  schema?: string;
}

export const SchemaSettings: Schema.Schema<SchemaSettings> = Schema.suspend(() => Schema.Struct({
  firstRevisionId: Schema.optional(Schema.String),
  encoding: Schema.optional(Schema.String),
  lastRevisionId: Schema.optional(Schema.String),
  schema: Schema.optional(Schema.String),
})).annotate({ identifier: "SchemaSettings" }) as any as Schema.Schema<SchemaSettings>;

export interface Topic {
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" */
  tags?: Record<string, string>;
  /** Optional. Indicates the minimum duration to retain a message after it is published to the topic. If this field is set, messages published to the topic in the last `message_retention_duration` are always available to subscribers. For instance, it allows any attached subscription to [seek to a timestamp](https://cloud.google.com/pubsub/docs/replay-overview#seek_to_a_time) that is up to `message_retention_duration` in the past. If this field is not set, message retention is controlled by settings on individual subscriptions. Cannot be more than 31 days or less than 10 minutes. */
  messageRetentionDuration?: string;
  /** Required. Identifier. The name of the topic. It must have the format `"projects/{project}/topics/{topic}"`. `{topic}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. */
  name?: string;
  /** Optional. Policy constraining the set of Google Cloud Platform regions where messages published to the topic may be stored. If not present, then no constraints are in effect. */
  messageStoragePolicy?: MessageStoragePolicy;
  /** Output only. An output-only field indicating the state of the topic. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "INGESTION_RESOURCE_ERROR" | (string & {});
  /** Optional. Reserved for future use. This field is set only in responses from the server; it is ignored if it is set in any requests. */
  satisfiesPzs?: boolean;
  /** Optional. Settings for validating messages published against a schema. */
  schemaSettings?: SchemaSettings;
  /** Optional. See [Creating and managing labels] (https://cloud.google.com/pubsub/docs/labels). */
  labels?: Record<string, string>;
  /** Optional. The resource name of the Cloud KMS CryptoKey to be used to protect access to messages published on this topic. The expected format is `projects/* /locations/* /keyRings/* /cryptoKeys/*`. */
  kmsKeyName?: string;
  /** Optional. Settings for ingestion from a data source into this topic. */
  ingestionDataSourceSettings?: IngestionDataSourceSettings;
  /** Optional. Transforms to be applied to messages published to the topic. Transforms are applied in the order specified. */
  messageTransforms?: Array<MessageTransform>;
}

export const Topic: Schema.Schema<Topic> = Schema.suspend(() => Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  messageRetentionDuration: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  messageStoragePolicy: Schema.optional(MessageStoragePolicy),
  state: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  schemaSettings: Schema.optional(SchemaSettings),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  kmsKeyName: Schema.optional(Schema.String),
  ingestionDataSourceSettings: Schema.optional(IngestionDataSourceSettings),
  messageTransforms: Schema.optional(Schema.Array(MessageTransform)),
})).annotate({ identifier: "Topic" }) as any as Schema.Schema<Topic>;

export interface ListTopicsResponse {
  /** Optional. If not empty, indicates that there may be more topics that match the request; this value should be passed in a new `ListTopicsRequest`. */
  nextPageToken?: string;
  /** Optional. The resulting topics. */
  topics?: Array<Topic>;
}

export const ListTopicsResponse: Schema.Schema<ListTopicsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  topics: Schema.optional(Schema.Array(Topic)),
})).annotate({ identifier: "ListTopicsResponse" }) as any as Schema.Schema<ListTopicsResponse>;

export interface ListTopicSnapshotsResponse {
  /** Optional. The names of the snapshots that match the request. */
  snapshots?: Array<string>;
  /** Optional. If not empty, indicates that there may be more snapshots that match the request; this value should be passed in a new `ListTopicSnapshotsRequest` to get more snapshots. */
  nextPageToken?: string;
}

export const ListTopicSnapshotsResponse: Schema.Schema<ListTopicSnapshotsResponse> = Schema.suspend(() => Schema.Struct({
  snapshots: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTopicSnapshotsResponse" }) as any as Schema.Schema<ListTopicSnapshotsResponse>;

export interface CommitSchemaRequest {
  /** Required. The schema revision to commit. */
  schema?: Pubsub_Schema;
}

export const CommitSchemaRequest: Schema.Schema<CommitSchemaRequest> = Schema.suspend(() => Schema.Struct({
  schema: Schema.optional(Pubsub_Schema),
})).annotate({ identifier: "CommitSchemaRequest" }) as any as Schema.Schema<CommitSchemaRequest>;

export interface DetachSubscriptionResponse {
}

export const DetachSubscriptionResponse: Schema.Schema<DetachSubscriptionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DetachSubscriptionResponse" }) as any as Schema.Schema<DetachSubscriptionResponse>;

export interface ModifyAckDeadlineRequest {
  /** Required. List of acknowledgment IDs. */
  ackIds?: Array<string>;
  /** Required. The new ack deadline with respect to the time this request was sent to the Pub/Sub system. For example, if the value is 10, the new ack deadline will expire 10 seconds after the `ModifyAckDeadline` call was made. Specifying zero might immediately make the message available for delivery to another subscriber client. This typically results in an increase in the rate of message redeliveries (that is, duplicates). The minimum deadline you can specify is 0 seconds. The maximum deadline you can specify in a single request is 600 seconds (10 minutes). */
  ackDeadlineSeconds?: number;
}

export const ModifyAckDeadlineRequest: Schema.Schema<ModifyAckDeadlineRequest> = Schema.suspend(() => Schema.Struct({
  ackIds: Schema.optional(Schema.Array(Schema.String)),
  ackDeadlineSeconds: Schema.optional(Schema.Number),
})).annotate({ identifier: "ModifyAckDeadlineRequest" }) as any as Schema.Schema<ModifyAckDeadlineRequest>;

export interface SeekResponse {
}

export const SeekResponse: Schema.Schema<SeekResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SeekResponse" }) as any as Schema.Schema<SeekResponse>;

export interface ModifyPushConfigRequest {
  /** Required. The push configuration for future deliveries. An empty `pushConfig` indicates that the Pub/Sub system should stop pushing messages from the given subscription and allow messages to be pulled and acknowledged - effectively pausing the subscription if `Pull` or `StreamingPull` is not called. */
  pushConfig?: PushConfig;
}

export const ModifyPushConfigRequest: Schema.Schema<ModifyPushConfigRequest> = Schema.suspend(() => Schema.Struct({
  pushConfig: Schema.optional(PushConfig),
})).annotate({ identifier: "ModifyPushConfigRequest" }) as any as Schema.Schema<ModifyPushConfigRequest>;

export interface ValidateMessageResponse {
}

export const ValidateMessageResponse: Schema.Schema<ValidateMessageResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ValidateMessageResponse" }) as any as Schema.Schema<ValidateMessageResponse>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface ValidateMessageRequest {
  /** Name of the schema against which to validate. Format is `projects/{project}/schemas/{schema}`. */
  name?: string;
  /** The encoding expected for messages */
  encoding?: "ENCODING_UNSPECIFIED" | "JSON" | "BINARY" | (string & {});
  /** Ad-hoc schema against which to validate */
  schema?: Pubsub_Schema;
  /** Message to validate against the provided `schema_spec`. */
  message?: string;
}

export const ValidateMessageRequest: Schema.Schema<ValidateMessageRequest> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  encoding: Schema.optional(Schema.String),
  schema: Schema.optional(Pubsub_Schema),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "ValidateMessageRequest" }) as any as Schema.Schema<ValidateMessageRequest>;

export interface ValidateSchemaRequest {
  /** Required. The schema object to validate. */
  schema?: Pubsub_Schema;
}

export const ValidateSchemaRequest: Schema.Schema<ValidateSchemaRequest> = Schema.suspend(() => Schema.Struct({
  schema: Schema.optional(Pubsub_Schema),
})).annotate({ identifier: "ValidateSchemaRequest" }) as any as Schema.Schema<ValidateSchemaRequest>;

export interface RollbackSchemaRequest {
  /** Required. The revision ID to roll back to. It must be a revision of the same schema. Example: c7cfa2a8 */
  revisionId?: string;
}

export const RollbackSchemaRequest: Schema.Schema<RollbackSchemaRequest> = Schema.suspend(() => Schema.Struct({
  revisionId: Schema.optional(Schema.String),
})).annotate({ identifier: "RollbackSchemaRequest" }) as any as Schema.Schema<RollbackSchemaRequest>;

export interface PullResponse {
  /** Optional. Received Pub/Sub messages. The list will be empty if there are no more messages available in the backlog, or if no messages could be returned before the request timeout. For JSON, the response can be entirely empty. The Pub/Sub system may return fewer than the `maxMessages` requested even if there are more messages available in the backlog. */
  receivedMessages?: Array<ReceivedMessage>;
}

export const PullResponse: Schema.Schema<PullResponse> = Schema.suspend(() => Schema.Struct({
  receivedMessages: Schema.optional(Schema.Array(ReceivedMessage)),
})).annotate({ identifier: "PullResponse" }) as any as Schema.Schema<PullResponse>;

export interface UpdateTopicRequest {
  /** Required. Indicates which fields in the provided topic to update. Must be specified and non-empty. Note that if `update_mask` contains "message_storage_policy" but the `message_storage_policy` is not set in the `topic` provided above, then the updated value is determined by the policy configured at the project or organization level. */
  updateMask?: string;
  /** Required. The updated topic object. */
  topic?: Topic;
}

export const UpdateTopicRequest: Schema.Schema<UpdateTopicRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  topic: Schema.optional(Topic),
})).annotate({ identifier: "UpdateTopicRequest" }) as any as Schema.Schema<UpdateTopicRequest>;

export interface PublishRequest {
  /** Required. The messages to publish. */
  messages?: Array<PubsubMessage>;
}

export const PublishRequest: Schema.Schema<PublishRequest> = Schema.suspend(() => Schema.Struct({
  messages: Schema.optional(Schema.Array(PubsubMessage)),
})).annotate({ identifier: "PublishRequest" }) as any as Schema.Schema<PublishRequest>;

export interface PublishResponse {
  /** Optional. The server-assigned ID of each published message, in the same order as the messages in the request. IDs are guaranteed to be unique within the topic. */
  messageIds?: Array<string>;
}

export const PublishResponse: Schema.Schema<PublishResponse> = Schema.suspend(() => Schema.Struct({
  messageIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PublishResponse" }) as any as Schema.Schema<PublishResponse>;

export interface PullRequest {
  /** Optional. If this field set to true, the system will respond immediately even if it there are no messages available to return in the `Pull` response. Otherwise, the system may wait (for a bounded amount of time) until at least one message is available, rather than returning no messages. Warning: setting this field to `true` is discouraged because it adversely impacts the performance of `Pull` operations. We recommend that users do not set this field. */
  returnImmediately?: boolean;
  /** Required. The maximum number of messages to return for this request. Must be a positive integer. The Pub/Sub system may return fewer than the number specified. */
  maxMessages?: number;
}

export const PullRequest: Schema.Schema<PullRequest> = Schema.suspend(() => Schema.Struct({
  returnImmediately: Schema.optional(Schema.Boolean),
  maxMessages: Schema.optional(Schema.Number),
})).annotate({ identifier: "PullRequest" }) as any as Schema.Schema<PullRequest>;

export interface Policy {
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  bindings: Schema.optional(Schema.Array(Binding)),
  version: Schema.optional(Schema.Number),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SeekRequest {
  /** Optional. The snapshot to seek to. The snapshot's topic must be the same as that of the provided subscription. Format is `projects/{project}/snapshots/{snap}`. */
  snapshot?: string;
  /** Optional. The time to seek to. Messages retained in the subscription that were published before this time are marked as acknowledged, and messages retained in the subscription that were published after this time are marked as unacknowledged. Note that this operation affects only those messages retained in the subscription (configured by the combination of `message_retention_duration` and `retain_acked_messages`). For example, if `time` corresponds to a point before the message retention window (or to a point before the system's notion of the subscription creation time), only retained messages will be marked as unacknowledged, and already-expunged messages will not be restored. */
  time?: string;
}

export const SeekRequest: Schema.Schema<SeekRequest> = Schema.suspend(() => Schema.Struct({
  snapshot: Schema.optional(Schema.String),
  time: Schema.optional(Schema.String),
})).annotate({ identifier: "SeekRequest" }) as any as Schema.Schema<SeekRequest>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CreateSnapshotRequest {
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" */
  tags?: Record<string, string>;
  /** Optional. See [Creating and managing labels](https://cloud.google.com/pubsub/docs/labels). */
  labels?: Record<string, string>;
  /** Required. The subscription whose backlog the snapshot retains. Specifically, the created snapshot is guaranteed to retain: (a) The existing backlog on the subscription. More precisely, this is defined as the messages in the subscription's backlog that are unacknowledged upon the successful completion of the `CreateSnapshot` request; as well as: (b) Any messages published to the subscription's topic following the successful completion of the CreateSnapshot request. Format is `projects/{project}/subscriptions/{sub}`. */
  subscription?: string;
}

export const CreateSnapshotRequest: Schema.Schema<CreateSnapshotRequest> = Schema.suspend(() => Schema.Struct({
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  subscription: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateSnapshotRequest" }) as any as Schema.Schema<CreateSnapshotRequest>;

export interface ListSubscriptionsResponse {
  /** Optional. If not empty, indicates that there may be more subscriptions that match the request; this value should be passed in a new `ListSubscriptionsRequest` to get more subscriptions. */
  nextPageToken?: string;
  /** Optional. The subscriptions that match the request. */
  subscriptions?: Array<Subscription>;
}

export const ListSubscriptionsResponse: Schema.Schema<ListSubscriptionsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  subscriptions: Schema.optional(Schema.Array(Subscription)),
})).annotate({ identifier: "ListSubscriptionsResponse" }) as any as Schema.Schema<ListSubscriptionsResponse>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface ListTopicSubscriptionsResponse {
  /** Optional. If not empty, indicates that there may be more subscriptions that match the request; this value should be passed in a new `ListTopicSubscriptionsRequest` to get more subscriptions. */
  nextPageToken?: string;
  /** Optional. The names of subscriptions attached to the topic specified in the request. */
  subscriptions?: Array<string>;
}

export const ListTopicSubscriptionsResponse: Schema.Schema<ListTopicSubscriptionsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  subscriptions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListTopicSubscriptionsResponse" }) as any as Schema.Schema<ListTopicSubscriptionsResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Acknowledges the messages associated with the `ack_ids` in the `AcknowledgeRequest`. The Pub/Sub system can remove the relevant messages from the subscription. Acknowledging a message whose ack deadline has expired may succeed, but such a message may be redelivered later. Acknowledging a message more than once will not result in an error. */
export interface AcknowledgeProjectsSubscriptionsRequest {
  /** Required. The subscription whose message is being acknowledged. Format is `projects/{project}/subscriptions/{sub}`. */
  subscription: string;
  /** Request body */
  body?: AcknowledgeRequest;
}

export const AcknowledgeProjectsSubscriptionsRequest = Schema.Struct({
  subscription: Schema.String.pipe(T.HttpPath("subscription")),
  body: Schema.optional(AcknowledgeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/subscriptions/{subscriptionsId}:acknowledge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AcknowledgeProjectsSubscriptionsRequest>;

export type AcknowledgeProjectsSubscriptionsResponse = Empty;
export const AcknowledgeProjectsSubscriptionsResponse = Empty;

export type AcknowledgeProjectsSubscriptionsError = CommonErrors;

export const acknowledgeProjectsSubscriptions: API.OperationMethod<AcknowledgeProjectsSubscriptionsRequest, AcknowledgeProjectsSubscriptionsResponse, AcknowledgeProjectsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AcknowledgeProjectsSubscriptionsRequest,
  output: AcknowledgeProjectsSubscriptionsResponse,
  errors: [],
}));

/** Creates a subscription to a given topic. See the [resource name rules] (https://cloud.google.com/pubsub/docs/pubsub-basics#resource_names). If the subscription already exists, returns `ALREADY_EXISTS`. If the corresponding topic doesn't exist, returns `NOT_FOUND`. If the name is not provided in the request, the server will assign a random name for this subscription on the same project as the topic, conforming to the [resource name format] (https://cloud.google.com/pubsub/docs/pubsub-basics#resource_names). The generated name is populated in the returned Subscription object. Note that for REST API requests, you must specify a name in the request. */
export interface CreateProjectsSubscriptionsRequest {
  /** Required. Identifier. The name of the subscription. It must have the format `"projects/{project}/subscriptions/{subscription}"`. `{subscription}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. */
  name: string;
  /** Request body */
  body?: Subscription;
}

export const CreateProjectsSubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Subscription).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/subscriptions/{subscriptionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsSubscriptionsRequest>;

export type CreateProjectsSubscriptionsResponse = Subscription;
export const CreateProjectsSubscriptionsResponse = Subscription;

export type CreateProjectsSubscriptionsError = CommonErrors;

export const createProjectsSubscriptions: API.OperationMethod<CreateProjectsSubscriptionsRequest, CreateProjectsSubscriptionsResponse, CreateProjectsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsSubscriptionsRequest,
  output: CreateProjectsSubscriptionsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsSubscriptionsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsSubscriptionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/subscriptions/{subscriptionsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsSubscriptionsRequest>;

export type SetIamPolicyProjectsSubscriptionsResponse = Policy;
export const SetIamPolicyProjectsSubscriptionsResponse = Policy;

export type SetIamPolicyProjectsSubscriptionsError = CommonErrors;

export const setIamPolicyProjectsSubscriptions: API.OperationMethod<SetIamPolicyProjectsSubscriptionsRequest, SetIamPolicyProjectsSubscriptionsResponse, SetIamPolicyProjectsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsSubscriptionsRequest,
  output: SetIamPolicyProjectsSubscriptionsResponse,
  errors: [],
}));

/** Lists matching subscriptions. */
export interface ListProjectsSubscriptionsRequest {
  /** Optional. Maximum number of subscriptions to return. */
  pageSize?: number;
  /** Optional. The value returned by the last `ListSubscriptionsResponse`; indicates that this is a continuation of a prior `ListSubscriptions` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Required. The name of the project in which to list subscriptions. Format is `projects/{project-id}`. */
  project: string;
}

export const ListProjectsSubscriptionsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  project: Schema.String.pipe(T.HttpPath("project")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/subscriptions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsSubscriptionsRequest>;

export type ListProjectsSubscriptionsResponse = ListSubscriptionsResponse;
export const ListProjectsSubscriptionsResponse = ListSubscriptionsResponse;

export type ListProjectsSubscriptionsError = CommonErrors;

export const listProjectsSubscriptions = API.makePaginated(() => ({
  input: ListProjectsSubscriptionsRequest,
  output: ListProjectsSubscriptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsSubscriptionsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsSubscriptionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/subscriptions/{subscriptionsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsSubscriptionsRequest>;

export type TestIamPermissionsProjectsSubscriptionsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsSubscriptionsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsSubscriptionsError = CommonErrors;

export const testIamPermissionsProjectsSubscriptions: API.OperationMethod<TestIamPermissionsProjectsSubscriptionsRequest, TestIamPermissionsProjectsSubscriptionsResponse, TestIamPermissionsProjectsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsSubscriptionsRequest,
  output: TestIamPermissionsProjectsSubscriptionsResponse,
  errors: [],
}));

/** Modifies the `PushConfig` for a specified subscription. This may be used to change a push subscription to a pull one (signified by an empty `PushConfig`) or vice versa, or change the endpoint URL and other attributes of a push subscription. Messages will accumulate for delivery continuously through the call regardless of changes to the `PushConfig`. */
export interface ModifyPushConfigProjectsSubscriptionsRequest {
  /** Required. The name of the subscription. Format is `projects/{project}/subscriptions/{sub}`. */
  subscription: string;
  /** Request body */
  body?: ModifyPushConfigRequest;
}

export const ModifyPushConfigProjectsSubscriptionsRequest = Schema.Struct({
  subscription: Schema.String.pipe(T.HttpPath("subscription")),
  body: Schema.optional(ModifyPushConfigRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/subscriptions/{subscriptionsId}:modifyPushConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ModifyPushConfigProjectsSubscriptionsRequest>;

export type ModifyPushConfigProjectsSubscriptionsResponse = Empty;
export const ModifyPushConfigProjectsSubscriptionsResponse = Empty;

export type ModifyPushConfigProjectsSubscriptionsError = CommonErrors;

export const modifyPushConfigProjectsSubscriptions: API.OperationMethod<ModifyPushConfigProjectsSubscriptionsRequest, ModifyPushConfigProjectsSubscriptionsResponse, ModifyPushConfigProjectsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ModifyPushConfigProjectsSubscriptionsRequest,
  output: ModifyPushConfigProjectsSubscriptionsResponse,
  errors: [],
}));

/** Detaches a subscription from this topic. All messages retained in the subscription are dropped. Subsequent `Pull` and `StreamingPull` requests will return FAILED_PRECONDITION. If the subscription is a push subscription, pushes to the endpoint will stop. */
export interface DetachProjectsSubscriptionsRequest {
  /** Required. The subscription to detach. Format is `projects/{project}/subscriptions/{subscription}`. */
  subscription: string;
}

export const DetachProjectsSubscriptionsRequest = Schema.Struct({
  subscription: Schema.String.pipe(T.HttpPath("subscription")),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/subscriptions/{subscriptionsId}:detach", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DetachProjectsSubscriptionsRequest>;

export type DetachProjectsSubscriptionsResponse = DetachSubscriptionResponse;
export const DetachProjectsSubscriptionsResponse = DetachSubscriptionResponse;

export type DetachProjectsSubscriptionsError = CommonErrors;

export const detachProjectsSubscriptions: API.OperationMethod<DetachProjectsSubscriptionsRequest, DetachProjectsSubscriptionsResponse, DetachProjectsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DetachProjectsSubscriptionsRequest,
  output: DetachProjectsSubscriptionsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsSubscriptionsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsSubscriptionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/subscriptions/{subscriptionsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsSubscriptionsRequest>;

export type GetIamPolicyProjectsSubscriptionsResponse = Policy;
export const GetIamPolicyProjectsSubscriptionsResponse = Policy;

export type GetIamPolicyProjectsSubscriptionsError = CommonErrors;

export const getIamPolicyProjectsSubscriptions: API.OperationMethod<GetIamPolicyProjectsSubscriptionsRequest, GetIamPolicyProjectsSubscriptionsResponse, GetIamPolicyProjectsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsSubscriptionsRequest,
  output: GetIamPolicyProjectsSubscriptionsResponse,
  errors: [],
}));

/** Updates an existing subscription by updating the fields specified in the update mask. Note that certain properties of a subscription, such as its topic, are not modifiable. */
export interface PatchProjectsSubscriptionsRequest {
  /** Required. Identifier. The name of the subscription. It must have the format `"projects/{project}/subscriptions/{subscription}"`. `{subscription}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. */
  name: string;
  /** Request body */
  body?: UpdateSubscriptionRequest;
}

export const PatchProjectsSubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateSubscriptionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/subscriptions/{subscriptionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsSubscriptionsRequest>;

export type PatchProjectsSubscriptionsResponse = Subscription;
export const PatchProjectsSubscriptionsResponse = Subscription;

export type PatchProjectsSubscriptionsError = CommonErrors;

export const patchProjectsSubscriptions: API.OperationMethod<PatchProjectsSubscriptionsRequest, PatchProjectsSubscriptionsResponse, PatchProjectsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsSubscriptionsRequest,
  output: PatchProjectsSubscriptionsResponse,
  errors: [],
}));

/** Gets the configuration details of a subscription. */
export interface GetProjectsSubscriptionsRequest {
  /** Required. The name of the subscription to get. Format is `projects/{project}/subscriptions/{sub}`. */
  subscription: string;
}

export const GetProjectsSubscriptionsRequest = Schema.Struct({
  subscription: Schema.String.pipe(T.HttpPath("subscription")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/subscriptions/{subscriptionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsSubscriptionsRequest>;

export type GetProjectsSubscriptionsResponse = Subscription;
export const GetProjectsSubscriptionsResponse = Subscription;

export type GetProjectsSubscriptionsError = CommonErrors;

export const getProjectsSubscriptions: API.OperationMethod<GetProjectsSubscriptionsRequest, GetProjectsSubscriptionsResponse, GetProjectsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsSubscriptionsRequest,
  output: GetProjectsSubscriptionsResponse,
  errors: [],
}));

/** Seeks an existing subscription to a point in time or to a given snapshot, whichever is provided in the request. Snapshots are used in [Seek] (https://cloud.google.com/pubsub/docs/replay-overview) operations, which allow you to manage message acknowledgments in bulk. That is, you can set the acknowledgment state of messages in an existing subscription to the state captured by a snapshot. Note that both the subscription and the snapshot must be on the same topic. */
export interface SeekProjectsSubscriptionsRequest {
  /** Required. The subscription to affect. */
  subscription: string;
  /** Request body */
  body?: SeekRequest;
}

export const SeekProjectsSubscriptionsRequest = Schema.Struct({
  subscription: Schema.String.pipe(T.HttpPath("subscription")),
  body: Schema.optional(SeekRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/subscriptions/{subscriptionsId}:seek", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SeekProjectsSubscriptionsRequest>;

export type SeekProjectsSubscriptionsResponse = SeekResponse;
export const SeekProjectsSubscriptionsResponse = SeekResponse;

export type SeekProjectsSubscriptionsError = CommonErrors;

export const seekProjectsSubscriptions: API.OperationMethod<SeekProjectsSubscriptionsRequest, SeekProjectsSubscriptionsResponse, SeekProjectsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SeekProjectsSubscriptionsRequest,
  output: SeekProjectsSubscriptionsResponse,
  errors: [],
}));

/** Modifies the ack deadline for a specific message. This method is useful to indicate that more time is needed to process a message by the subscriber, or to make the message available for redelivery if the processing was interrupted. Note that this does not modify the subscription-level `ackDeadlineSeconds` used for subsequent messages. */
export interface ModifyAckDeadlineProjectsSubscriptionsRequest {
  /** Required. The name of the subscription. Format is `projects/{project}/subscriptions/{sub}`. */
  subscription: string;
  /** Request body */
  body?: ModifyAckDeadlineRequest;
}

export const ModifyAckDeadlineProjectsSubscriptionsRequest = Schema.Struct({
  subscription: Schema.String.pipe(T.HttpPath("subscription")),
  body: Schema.optional(ModifyAckDeadlineRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/subscriptions/{subscriptionsId}:modifyAckDeadline", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ModifyAckDeadlineProjectsSubscriptionsRequest>;

export type ModifyAckDeadlineProjectsSubscriptionsResponse = Empty;
export const ModifyAckDeadlineProjectsSubscriptionsResponse = Empty;

export type ModifyAckDeadlineProjectsSubscriptionsError = CommonErrors;

export const modifyAckDeadlineProjectsSubscriptions: API.OperationMethod<ModifyAckDeadlineProjectsSubscriptionsRequest, ModifyAckDeadlineProjectsSubscriptionsResponse, ModifyAckDeadlineProjectsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ModifyAckDeadlineProjectsSubscriptionsRequest,
  output: ModifyAckDeadlineProjectsSubscriptionsResponse,
  errors: [],
}));

/** Deletes an existing subscription. All messages retained in the subscription are immediately dropped. Calls to `Pull` after deletion will return `NOT_FOUND`. After a subscription is deleted, a new one may be created with the same name, but the new one has no association with the old subscription or its topic unless the same topic is specified. */
export interface DeleteProjectsSubscriptionsRequest {
  /** Required. The subscription to delete. Format is `projects/{project}/subscriptions/{sub}`. */
  subscription: string;
}

export const DeleteProjectsSubscriptionsRequest = Schema.Struct({
  subscription: Schema.String.pipe(T.HttpPath("subscription")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/subscriptions/{subscriptionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsSubscriptionsRequest>;

export type DeleteProjectsSubscriptionsResponse = Empty;
export const DeleteProjectsSubscriptionsResponse = Empty;

export type DeleteProjectsSubscriptionsError = CommonErrors;

export const deleteProjectsSubscriptions: API.OperationMethod<DeleteProjectsSubscriptionsRequest, DeleteProjectsSubscriptionsResponse, DeleteProjectsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsSubscriptionsRequest,
  output: DeleteProjectsSubscriptionsResponse,
  errors: [],
}));

/** Pulls messages from the server. */
export interface PullProjectsSubscriptionsRequest {
  /** Required. The subscription from which messages should be pulled. Format is `projects/{project}/subscriptions/{sub}`. */
  subscription: string;
  /** Request body */
  body?: PullRequest;
}

export const PullProjectsSubscriptionsRequest = Schema.Struct({
  subscription: Schema.String.pipe(T.HttpPath("subscription")),
  body: Schema.optional(PullRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/subscriptions/{subscriptionsId}:pull", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PullProjectsSubscriptionsRequest>;

export type PullProjectsSubscriptionsResponse = PullResponse;
export const PullProjectsSubscriptionsResponse = PullResponse;

export type PullProjectsSubscriptionsError = CommonErrors;

export const pullProjectsSubscriptions: API.OperationMethod<PullProjectsSubscriptionsRequest, PullProjectsSubscriptionsResponse, PullProjectsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PullProjectsSubscriptionsRequest,
  output: PullProjectsSubscriptionsResponse,
  errors: [],
}));

/** Validates a schema. */
export interface ValidateProjectsSchemasRequest {
  /** Required. The name of the project in which to validate schemas. Format is `projects/{project-id}`. */
  parent: string;
  /** Request body */
  body?: ValidateSchemaRequest;
}

export const ValidateProjectsSchemasRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ValidateSchemaRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/schemas:validate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateProjectsSchemasRequest>;

export type ValidateProjectsSchemasResponse = ValidateSchemaResponse;
export const ValidateProjectsSchemasResponse = ValidateSchemaResponse;

export type ValidateProjectsSchemasError = CommonErrors;

export const validateProjectsSchemas: API.OperationMethod<ValidateProjectsSchemasRequest, ValidateProjectsSchemasResponse, ValidateProjectsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateProjectsSchemasRequest,
  output: ValidateProjectsSchemasResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsSchemasRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsSchemasRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/schemas/{schemasId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsSchemasRequest>;

export type GetIamPolicyProjectsSchemasResponse = Policy;
export const GetIamPolicyProjectsSchemasResponse = Policy;

export type GetIamPolicyProjectsSchemasError = CommonErrors;

export const getIamPolicyProjectsSchemas: API.OperationMethod<GetIamPolicyProjectsSchemasRequest, GetIamPolicyProjectsSchemasResponse, GetIamPolicyProjectsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsSchemasRequest,
  output: GetIamPolicyProjectsSchemasResponse,
  errors: [],
}));

/** Lists all schema revisions for the named schema. */
export interface ListRevisionsProjectsSchemasRequest {
  /** Required. The name of the schema to list revisions for. */
  name: string;
  /** The maximum number of revisions to return per page. */
  pageSize?: number;
  /** The set of Schema fields to return in the response. If not set, returns Schemas with `name` and `type`, but not `definition`. Set to `FULL` to retrieve all fields. */
  view?: "SCHEMA_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** The page token, received from a previous ListSchemaRevisions call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListRevisionsProjectsSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/schemas/{schemasId}:listRevisions" }),
  svc,
) as unknown as Schema.Schema<ListRevisionsProjectsSchemasRequest>;

export type ListRevisionsProjectsSchemasResponse = ListSchemaRevisionsResponse;
export const ListRevisionsProjectsSchemasResponse = ListSchemaRevisionsResponse;

export type ListRevisionsProjectsSchemasError = CommonErrors;

export const listRevisionsProjectsSchemas = API.makePaginated(() => ({
  input: ListRevisionsProjectsSchemasRequest,
  output: ListRevisionsProjectsSchemasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a schema. */
export interface CreateProjectsSchemasRequest {
  /** The ID to use for the schema, which will become the final component of the schema's resource name. See https://cloud.google.com/pubsub/docs/pubsub-basics#resource_names for resource name constraints. */
  schemaId?: string;
  /** Required. The name of the project in which to create the schema. Format is `projects/{project-id}`. */
  parent: string;
  /** Request body */
  body?: Pubsub_Schema;
}

export const CreateProjectsSchemasRequest = Schema.Struct({
  schemaId: Schema.optional(Schema.String).pipe(T.HttpQuery("schemaId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Pubsub_Schema).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/schemas", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsSchemasRequest>;

export type CreateProjectsSchemasResponse = Pubsub_Schema;
export const CreateProjectsSchemasResponse = Pubsub_Schema;

export type CreateProjectsSchemasError = CommonErrors;

export const createProjectsSchemas: API.OperationMethod<CreateProjectsSchemasRequest, CreateProjectsSchemasResponse, CreateProjectsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsSchemasRequest,
  output: CreateProjectsSchemasResponse,
  errors: [],
}));

/** Deletes a specific schema revision. */
export interface DeleteRevisionProjectsSchemasRequest {
  /** Optional. This field is deprecated and should not be used for specifying the revision ID. The revision ID should be specified via the `name` parameter. */
  revisionId?: string;
  /** Required. The name of the schema revision to be deleted, with a revision ID explicitly included. Example: `projects/123/schemas/my-schema@c7cfa2a8` */
  name: string;
}

export const DeleteRevisionProjectsSchemasRequest = Schema.Struct({
  revisionId: Schema.optional(Schema.String).pipe(T.HttpQuery("revisionId")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/schemas/{schemasId}:deleteRevision" }),
  svc,
) as unknown as Schema.Schema<DeleteRevisionProjectsSchemasRequest>;

export type DeleteRevisionProjectsSchemasResponse = Pubsub_Schema;
export const DeleteRevisionProjectsSchemasResponse = Pubsub_Schema;

export type DeleteRevisionProjectsSchemasError = CommonErrors;

export const deleteRevisionProjectsSchemas: API.OperationMethod<DeleteRevisionProjectsSchemasRequest, DeleteRevisionProjectsSchemasResponse, DeleteRevisionProjectsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteRevisionProjectsSchemasRequest,
  output: DeleteRevisionProjectsSchemasResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsSchemasRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsSchemasRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/schemas/{schemasId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsSchemasRequest>;

export type SetIamPolicyProjectsSchemasResponse = Policy;
export const SetIamPolicyProjectsSchemasResponse = Policy;

export type SetIamPolicyProjectsSchemasError = CommonErrors;

export const setIamPolicyProjectsSchemas: API.OperationMethod<SetIamPolicyProjectsSchemasRequest, SetIamPolicyProjectsSchemasResponse, SetIamPolicyProjectsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsSchemasRequest,
  output: SetIamPolicyProjectsSchemasResponse,
  errors: [],
}));

/** Validates a message against a schema. */
export interface ValidateMessageProjectsSchemasRequest {
  /** Required. The name of the project in which to validate schemas. Format is `projects/{project-id}`. */
  parent: string;
  /** Request body */
  body?: ValidateMessageRequest;
}

export const ValidateMessageProjectsSchemasRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ValidateMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/schemas:validateMessage", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ValidateMessageProjectsSchemasRequest>;

export type ValidateMessageProjectsSchemasResponse = ValidateMessageResponse;
export const ValidateMessageProjectsSchemasResponse = ValidateMessageResponse;

export type ValidateMessageProjectsSchemasError = CommonErrors;

export const validateMessageProjectsSchemas: API.OperationMethod<ValidateMessageProjectsSchemasRequest, ValidateMessageProjectsSchemasResponse, ValidateMessageProjectsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ValidateMessageProjectsSchemasRequest,
  output: ValidateMessageProjectsSchemasResponse,
  errors: [],
}));

/** Lists schemas in a project. */
export interface ListProjectsSchemasRequest {
  /** Maximum number of schemas to return. */
  pageSize?: number;
  /** Required. The name of the project in which to list schemas. Format is `projects/{project-id}`. */
  parent: string;
  /** The set of Schema fields to return in the response. If not set, returns Schemas with `name` and `type`, but not `definition`. Set to `FULL` to retrieve all fields. */
  view?: "SCHEMA_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** The value returned by the last `ListSchemasResponse`; indicates that this is a continuation of a prior `ListSchemas` call, and that the system should return the next page of data. */
  pageToken?: string;
}

export const ListProjectsSchemasRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/schemas" }),
  svc,
) as unknown as Schema.Schema<ListProjectsSchemasRequest>;

export type ListProjectsSchemasResponse = ListSchemasResponse;
export const ListProjectsSchemasResponse = ListSchemasResponse;

export type ListProjectsSchemasError = CommonErrors;

export const listProjectsSchemas = API.makePaginated(() => ({
  input: ListProjectsSchemasRequest,
  output: ListProjectsSchemasResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a schema. */
export interface GetProjectsSchemasRequest {
  /** Required. The name of the schema to get. Format is `projects/{project}/schemas/{schema}`. */
  name: string;
  /** The set of fields to return in the response. If not set, returns a Schema with all fields filled out. Set to `BASIC` to omit the `definition`. */
  view?: "SCHEMA_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetProjectsSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/schemas/{schemasId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsSchemasRequest>;

export type GetProjectsSchemasResponse = Pubsub_Schema;
export const GetProjectsSchemasResponse = Pubsub_Schema;

export type GetProjectsSchemasError = CommonErrors;

export const getProjectsSchemas: API.OperationMethod<GetProjectsSchemasRequest, GetProjectsSchemasResponse, GetProjectsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsSchemasRequest,
  output: GetProjectsSchemasResponse,
  errors: [],
}));

/** Commits a new schema revision to an existing schema. */
export interface CommitProjectsSchemasRequest {
  /** Required. The name of the schema we are revising. Format is `projects/{project}/schemas/{schema}`. */
  name: string;
  /** Request body */
  body?: CommitSchemaRequest;
}

export const CommitProjectsSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CommitSchemaRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/schemas/{schemasId}:commit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CommitProjectsSchemasRequest>;

export type CommitProjectsSchemasResponse = Pubsub_Schema;
export const CommitProjectsSchemasResponse = Pubsub_Schema;

export type CommitProjectsSchemasError = CommonErrors;

export const commitProjectsSchemas: API.OperationMethod<CommitProjectsSchemasRequest, CommitProjectsSchemasResponse, CommitProjectsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CommitProjectsSchemasRequest,
  output: CommitProjectsSchemasResponse,
  errors: [],
}));

/** Creates a new schema revision that is a copy of the provided revision_id. */
export interface RollbackProjectsSchemasRequest {
  /** Required. The schema being rolled back with revision id. */
  name: string;
  /** Request body */
  body?: RollbackSchemaRequest;
}

export const RollbackProjectsSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RollbackSchemaRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/schemas/{schemasId}:rollback", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RollbackProjectsSchemasRequest>;

export type RollbackProjectsSchemasResponse = Pubsub_Schema;
export const RollbackProjectsSchemasResponse = Pubsub_Schema;

export type RollbackProjectsSchemasError = CommonErrors;

export const rollbackProjectsSchemas: API.OperationMethod<RollbackProjectsSchemasRequest, RollbackProjectsSchemasResponse, RollbackProjectsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RollbackProjectsSchemasRequest,
  output: RollbackProjectsSchemasResponse,
  errors: [],
}));

/** Deletes a schema. */
export interface DeleteProjectsSchemasRequest {
  /** Required. Name of the schema to delete. Format is `projects/{project}/schemas/{schema}`. */
  name: string;
}

export const DeleteProjectsSchemasRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/schemas/{schemasId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsSchemasRequest>;

export type DeleteProjectsSchemasResponse = Empty;
export const DeleteProjectsSchemasResponse = Empty;

export type DeleteProjectsSchemasError = CommonErrors;

export const deleteProjectsSchemas: API.OperationMethod<DeleteProjectsSchemasRequest, DeleteProjectsSchemasResponse, DeleteProjectsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsSchemasRequest,
  output: DeleteProjectsSchemasResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsSchemasRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsSchemasRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/schemas/{schemasId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsSchemasRequest>;

export type TestIamPermissionsProjectsSchemasResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsSchemasResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsSchemasError = CommonErrors;

export const testIamPermissionsProjectsSchemas: API.OperationMethod<TestIamPermissionsProjectsSchemasRequest, TestIamPermissionsProjectsSchemasResponse, TestIamPermissionsProjectsSchemasError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsSchemasRequest,
  output: TestIamPermissionsProjectsSchemasResponse,
  errors: [],
}));

/** Lists the existing snapshots. Snapshots are used in [Seek]( https://cloud.google.com/pubsub/docs/replay-overview) operations, which allow you to manage message acknowledgments in bulk. That is, you can set the acknowledgment state of messages in an existing subscription to the state captured by a snapshot. */
export interface ListProjectsSnapshotsRequest {
  /** Optional. The value returned by the last `ListSnapshotsResponse`; indicates that this is a continuation of a prior `ListSnapshots` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Required. The name of the project in which to list snapshots. Format is `projects/{project-id}`. */
  project: string;
  /** Optional. Maximum number of snapshots to return. */
  pageSize?: number;
}

export const ListProjectsSnapshotsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  project: Schema.String.pipe(T.HttpPath("project")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/snapshots" }),
  svc,
) as unknown as Schema.Schema<ListProjectsSnapshotsRequest>;

export type ListProjectsSnapshotsResponse = ListSnapshotsResponse;
export const ListProjectsSnapshotsResponse = ListSnapshotsResponse;

export type ListProjectsSnapshotsError = CommonErrors;

export const listProjectsSnapshots = API.makePaginated(() => ({
  input: ListProjectsSnapshotsRequest,
  output: ListProjectsSnapshotsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsSnapshotsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsSnapshotsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/snapshots/{snapshotsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsSnapshotsRequest>;

export type SetIamPolicyProjectsSnapshotsResponse = Policy;
export const SetIamPolicyProjectsSnapshotsResponse = Policy;

export type SetIamPolicyProjectsSnapshotsError = CommonErrors;

export const setIamPolicyProjectsSnapshots: API.OperationMethod<SetIamPolicyProjectsSnapshotsRequest, SetIamPolicyProjectsSnapshotsResponse, SetIamPolicyProjectsSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsSnapshotsRequest,
  output: SetIamPolicyProjectsSnapshotsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsSnapshotsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsSnapshotsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/snapshots/{snapshotsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsSnapshotsRequest>;

export type TestIamPermissionsProjectsSnapshotsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsSnapshotsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsSnapshotsError = CommonErrors;

export const testIamPermissionsProjectsSnapshots: API.OperationMethod<TestIamPermissionsProjectsSnapshotsRequest, TestIamPermissionsProjectsSnapshotsResponse, TestIamPermissionsProjectsSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsSnapshotsRequest,
  output: TestIamPermissionsProjectsSnapshotsResponse,
  errors: [],
}));

/** Removes an existing snapshot. Snapshots are used in [Seek] (https://cloud.google.com/pubsub/docs/replay-overview) operations, which allow you to manage message acknowledgments in bulk. That is, you can set the acknowledgment state of messages in an existing subscription to the state captured by a snapshot. When the snapshot is deleted, all messages retained in the snapshot are immediately dropped. After a snapshot is deleted, a new one may be created with the same name, but the new one has no association with the old snapshot or its subscription, unless the same subscription is specified. */
export interface DeleteProjectsSnapshotsRequest {
  /** Required. The name of the snapshot to delete. Format is `projects/{project}/snapshots/{snap}`. */
  snapshot: string;
}

export const DeleteProjectsSnapshotsRequest = Schema.Struct({
  snapshot: Schema.String.pipe(T.HttpPath("snapshot")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/snapshots/{snapshotsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsSnapshotsRequest>;

export type DeleteProjectsSnapshotsResponse = Empty;
export const DeleteProjectsSnapshotsResponse = Empty;

export type DeleteProjectsSnapshotsError = CommonErrors;

export const deleteProjectsSnapshots: API.OperationMethod<DeleteProjectsSnapshotsRequest, DeleteProjectsSnapshotsResponse, DeleteProjectsSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsSnapshotsRequest,
  output: DeleteProjectsSnapshotsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsSnapshotsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsSnapshotsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/snapshots/{snapshotsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsSnapshotsRequest>;

export type GetIamPolicyProjectsSnapshotsResponse = Policy;
export const GetIamPolicyProjectsSnapshotsResponse = Policy;

export type GetIamPolicyProjectsSnapshotsError = CommonErrors;

export const getIamPolicyProjectsSnapshots: API.OperationMethod<GetIamPolicyProjectsSnapshotsRequest, GetIamPolicyProjectsSnapshotsResponse, GetIamPolicyProjectsSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsSnapshotsRequest,
  output: GetIamPolicyProjectsSnapshotsResponse,
  errors: [],
}));

/** Gets the configuration details of a snapshot. Snapshots are used in [Seek](https://cloud.google.com/pubsub/docs/replay-overview) operations, which allow you to manage message acknowledgments in bulk. That is, you can set the acknowledgment state of messages in an existing subscription to the state captured by a snapshot. */
export interface GetProjectsSnapshotsRequest {
  /** Required. The name of the snapshot to get. Format is `projects/{project}/snapshots/{snap}`. */
  snapshot: string;
}

export const GetProjectsSnapshotsRequest = Schema.Struct({
  snapshot: Schema.String.pipe(T.HttpPath("snapshot")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/snapshots/{snapshotsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsSnapshotsRequest>;

export type GetProjectsSnapshotsResponse = Snapshot;
export const GetProjectsSnapshotsResponse = Snapshot;

export type GetProjectsSnapshotsError = CommonErrors;

export const getProjectsSnapshots: API.OperationMethod<GetProjectsSnapshotsRequest, GetProjectsSnapshotsResponse, GetProjectsSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsSnapshotsRequest,
  output: GetProjectsSnapshotsResponse,
  errors: [],
}));

/** Creates a snapshot from the requested subscription. Snapshots are used in [Seek](https://cloud.google.com/pubsub/docs/replay-overview) operations, which allow you to manage message acknowledgments in bulk. That is, you can set the acknowledgment state of messages in an existing subscription to the state captured by a snapshot. If the snapshot already exists, returns `ALREADY_EXISTS`. If the requested subscription doesn't exist, returns `NOT_FOUND`. If the backlog in the subscription is too old -- and the resulting snapshot would expire in less than 1 hour -- then `FAILED_PRECONDITION` is returned. See also the `Snapshot.expire_time` field. If the name is not provided in the request, the server will assign a random name for this snapshot on the same project as the subscription, conforming to the [resource name format] (https://cloud.google.com/pubsub/docs/pubsub-basics#resource_names). The generated name is populated in the returned Snapshot object. Note that for REST API requests, you must specify a name in the request. */
export interface CreateProjectsSnapshotsRequest {
  /** Required. User-provided name for this snapshot. If the name is not provided in the request, the server will assign a random name for this snapshot on the same project as the subscription. Note that for REST API requests, you must specify a name. See the [resource name rules](https://cloud.google.com/pubsub/docs/pubsub-basics#resource_names). Format is `projects/{project}/snapshots/{snap}`. */
  name: string;
  /** Request body */
  body?: CreateSnapshotRequest;
}

export const CreateProjectsSnapshotsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CreateSnapshotRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/snapshots/{snapshotsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsSnapshotsRequest>;

export type CreateProjectsSnapshotsResponse = Snapshot;
export const CreateProjectsSnapshotsResponse = Snapshot;

export type CreateProjectsSnapshotsError = CommonErrors;

export const createProjectsSnapshots: API.OperationMethod<CreateProjectsSnapshotsRequest, CreateProjectsSnapshotsResponse, CreateProjectsSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsSnapshotsRequest,
  output: CreateProjectsSnapshotsResponse,
  errors: [],
}));

/** Updates an existing snapshot by updating the fields specified in the update mask. Snapshots are used in [Seek](https://cloud.google.com/pubsub/docs/replay-overview) operations, which allow you to manage message acknowledgments in bulk. That is, you can set the acknowledgment state of messages in an existing subscription to the state captured by a snapshot. */
export interface PatchProjectsSnapshotsRequest {
  /** Optional. The name of the snapshot. */
  name: string;
  /** Request body */
  body?: UpdateSnapshotRequest;
}

export const PatchProjectsSnapshotsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateSnapshotRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/snapshots/{snapshotsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsSnapshotsRequest>;

export type PatchProjectsSnapshotsResponse = Snapshot;
export const PatchProjectsSnapshotsResponse = Snapshot;

export type PatchProjectsSnapshotsError = CommonErrors;

export const patchProjectsSnapshots: API.OperationMethod<PatchProjectsSnapshotsRequest, PatchProjectsSnapshotsResponse, PatchProjectsSnapshotsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsSnapshotsRequest,
  output: PatchProjectsSnapshotsResponse,
  errors: [],
}));

/** Creates the given topic with the given name. See the [resource name rules] (https://cloud.google.com/pubsub/docs/pubsub-basics#resource_names). */
export interface CreateProjectsTopicsRequest {
  /** Required. Identifier. The name of the topic. It must have the format `"projects/{project}/topics/{topic}"`. `{topic}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. */
  name: string;
  /** Request body */
  body?: Topic;
}

export const CreateProjectsTopicsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Topic).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/topics/{topicsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsTopicsRequest>;

export type CreateProjectsTopicsResponse = Topic;
export const CreateProjectsTopicsResponse = Topic;

export type CreateProjectsTopicsError = CommonErrors;

export const createProjectsTopics: API.OperationMethod<CreateProjectsTopicsRequest, CreateProjectsTopicsResponse, CreateProjectsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsTopicsRequest,
  output: CreateProjectsTopicsResponse,
  errors: [],
}));

/** Deletes the topic with the given name. Returns `NOT_FOUND` if the topic does not exist. After a topic is deleted, a new topic may be created with the same name; this is an entirely new topic with none of the old configuration or subscriptions. Existing subscriptions to this topic are not deleted, but their `topic` field is set to `_deleted-topic_`. */
export interface DeleteProjectsTopicsRequest {
  /** Required. Name of the topic to delete. Format is `projects/{project}/topics/{topic}`. */
  topic: string;
}

export const DeleteProjectsTopicsRequest = Schema.Struct({
  topic: Schema.String.pipe(T.HttpPath("topic")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/topics/{topicsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsTopicsRequest>;

export type DeleteProjectsTopicsResponse = Empty;
export const DeleteProjectsTopicsResponse = Empty;

export type DeleteProjectsTopicsError = CommonErrors;

export const deleteProjectsTopics: API.OperationMethod<DeleteProjectsTopicsRequest, DeleteProjectsTopicsResponse, DeleteProjectsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsTopicsRequest,
  output: DeleteProjectsTopicsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsTopicsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsTopicsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/topics/{topicsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsTopicsRequest>;

export type SetIamPolicyProjectsTopicsResponse = Policy;
export const SetIamPolicyProjectsTopicsResponse = Policy;

export type SetIamPolicyProjectsTopicsError = CommonErrors;

export const setIamPolicyProjectsTopics: API.OperationMethod<SetIamPolicyProjectsTopicsRequest, SetIamPolicyProjectsTopicsResponse, SetIamPolicyProjectsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsTopicsRequest,
  output: SetIamPolicyProjectsTopicsResponse,
  errors: [],
}));

/** Gets the configuration of a topic. */
export interface GetProjectsTopicsRequest {
  /** Required. The name of the topic to get. Format is `projects/{project}/topics/{topic}`. */
  topic: string;
}

export const GetProjectsTopicsRequest = Schema.Struct({
  topic: Schema.String.pipe(T.HttpPath("topic")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/topics/{topicsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsTopicsRequest>;

export type GetProjectsTopicsResponse = Topic;
export const GetProjectsTopicsResponse = Topic;

export type GetProjectsTopicsError = CommonErrors;

export const getProjectsTopics: API.OperationMethod<GetProjectsTopicsRequest, GetProjectsTopicsResponse, GetProjectsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsTopicsRequest,
  output: GetProjectsTopicsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsTopicsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsTopicsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/topics/{topicsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsTopicsRequest>;

export type TestIamPermissionsProjectsTopicsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsTopicsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsTopicsError = CommonErrors;

export const testIamPermissionsProjectsTopics: API.OperationMethod<TestIamPermissionsProjectsTopicsRequest, TestIamPermissionsProjectsTopicsResponse, TestIamPermissionsProjectsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsTopicsRequest,
  output: TestIamPermissionsProjectsTopicsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsTopicsRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsTopicsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/topics/{topicsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsTopicsRequest>;

export type GetIamPolicyProjectsTopicsResponse = Policy;
export const GetIamPolicyProjectsTopicsResponse = Policy;

export type GetIamPolicyProjectsTopicsError = CommonErrors;

export const getIamPolicyProjectsTopics: API.OperationMethod<GetIamPolicyProjectsTopicsRequest, GetIamPolicyProjectsTopicsResponse, GetIamPolicyProjectsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsTopicsRequest,
  output: GetIamPolicyProjectsTopicsResponse,
  errors: [],
}));

/** Updates an existing topic by updating the fields specified in the update mask. Note that certain properties of a topic are not modifiable. */
export interface PatchProjectsTopicsRequest {
  /** Required. Identifier. The name of the topic. It must have the format `"projects/{project}/topics/{topic}"`. `{topic}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. */
  name: string;
  /** Request body */
  body?: UpdateTopicRequest;
}

export const PatchProjectsTopicsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateTopicRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/topics/{topicsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsTopicsRequest>;

export type PatchProjectsTopicsResponse = Topic;
export const PatchProjectsTopicsResponse = Topic;

export type PatchProjectsTopicsError = CommonErrors;

export const patchProjectsTopics: API.OperationMethod<PatchProjectsTopicsRequest, PatchProjectsTopicsResponse, PatchProjectsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsTopicsRequest,
  output: PatchProjectsTopicsResponse,
  errors: [],
}));

/** Adds one or more messages to the topic. Returns `NOT_FOUND` if the topic does not exist. */
export interface PublishProjectsTopicsRequest {
  /** Required. The messages in the request will be published on this topic. Format is `projects/{project}/topics/{topic}`. */
  topic: string;
  /** Request body */
  body?: PublishRequest;
}

export const PublishProjectsTopicsRequest = Schema.Struct({
  topic: Schema.String.pipe(T.HttpPath("topic")),
  body: Schema.optional(PublishRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/topics/{topicsId}:publish", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PublishProjectsTopicsRequest>;

export type PublishProjectsTopicsResponse = PublishResponse;
export const PublishProjectsTopicsResponse = PublishResponse;

export type PublishProjectsTopicsError = CommonErrors;

export const publishProjectsTopics: API.OperationMethod<PublishProjectsTopicsRequest, PublishProjectsTopicsResponse, PublishProjectsTopicsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PublishProjectsTopicsRequest,
  output: PublishProjectsTopicsResponse,
  errors: [],
}));

/** Lists matching topics. */
export interface ListProjectsTopicsRequest {
  /** Optional. Maximum number of topics to return. */
  pageSize?: number;
  /** Required. The name of the project in which to list topics. Format is `projects/{project-id}`. */
  project: string;
  /** Optional. The value returned by the last `ListTopicsResponse`; indicates that this is a continuation of a prior `ListTopics` call, and that the system should return the next page of data. */
  pageToken?: string;
}

export const ListProjectsTopicsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  project: Schema.String.pipe(T.HttpPath("project")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/topics" }),
  svc,
) as unknown as Schema.Schema<ListProjectsTopicsRequest>;

export type ListProjectsTopicsResponse = ListTopicsResponse;
export const ListProjectsTopicsResponse = ListTopicsResponse;

export type ListProjectsTopicsError = CommonErrors;

export const listProjectsTopics = API.makePaginated(() => ({
  input: ListProjectsTopicsRequest,
  output: ListProjectsTopicsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the names of the snapshots on this topic. Snapshots are used in [Seek](https://cloud.google.com/pubsub/docs/replay-overview) operations, which allow you to manage message acknowledgments in bulk. That is, you can set the acknowledgment state of messages in an existing subscription to the state captured by a snapshot. */
export interface ListProjectsTopicsSnapshotsRequest {
  /** Optional. The value returned by the last `ListTopicSnapshotsResponse`; indicates that this is a continuation of a prior `ListTopicSnapshots` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Optional. Maximum number of snapshot names to return. */
  pageSize?: number;
  /** Required. The name of the topic that snapshots are attached to. Format is `projects/{project}/topics/{topic}`. */
  topic: string;
}

export const ListProjectsTopicsSnapshotsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  topic: Schema.String.pipe(T.HttpPath("topic")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/topics/{topicsId}/snapshots" }),
  svc,
) as unknown as Schema.Schema<ListProjectsTopicsSnapshotsRequest>;

export type ListProjectsTopicsSnapshotsResponse = ListTopicSnapshotsResponse;
export const ListProjectsTopicsSnapshotsResponse = ListTopicSnapshotsResponse;

export type ListProjectsTopicsSnapshotsError = CommonErrors;

export const listProjectsTopicsSnapshots = API.makePaginated(() => ({
  input: ListProjectsTopicsSnapshotsRequest,
  output: ListProjectsTopicsSnapshotsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the names of the attached subscriptions on this topic. */
export interface ListProjectsTopicsSubscriptionsRequest {
  /** Optional. Maximum number of subscription names to return. */
  pageSize?: number;
  /** Optional. The value returned by the last `ListTopicSubscriptionsResponse`; indicates that this is a continuation of a prior `ListTopicSubscriptions` call, and that the system should return the next page of data. */
  pageToken?: string;
  /** Required. The name of the topic that subscriptions are attached to. Format is `projects/{project}/topics/{topic}`. */
  topic: string;
}

export const ListProjectsTopicsSubscriptionsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  topic: Schema.String.pipe(T.HttpPath("topic")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/topics/{topicsId}/subscriptions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsTopicsSubscriptionsRequest>;

export type ListProjectsTopicsSubscriptionsResponse = ListTopicSubscriptionsResponse;
export const ListProjectsTopicsSubscriptionsResponse = ListTopicSubscriptionsResponse;

export type ListProjectsTopicsSubscriptionsError = CommonErrors;

export const listProjectsTopicsSubscriptions = API.makePaginated(() => ({
  input: ListProjectsTopicsSubscriptionsRequest,
  output: ListProjectsTopicsSubscriptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

