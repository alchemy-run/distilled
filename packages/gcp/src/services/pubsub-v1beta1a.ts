// ==========================================================================
// Cloud Pub/Sub API (pubsub v1beta1a)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import * as API from "../client/api.ts";
import * as T from "../traits";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "pubsub",
  version: "v1beta1a",
  rootUrl: "https://pubsub.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Label {
  /** A string value. */
  strValue?: string;
  /** An integer value. */
  numValue?: string;
  /** The key of a label is a syntactically valid URL (as per RFC 1738) with the "scheme" and initial slashes omitted and with the additional restrictions noted below. Each key should be globally unique. The "host" portion is called the "namespace" and is not necessarily resolvable to a network endpoint. Instead, the namespace indicates what system or entity defines the semantics of the label. Namespaces do not restrict the set of objects to which a label may be associated. Keys are defined by the following grammar: key = hostname "/" kpath kpath = ksegment *[ "/" ksegment ] ksegment = alphadigit | *[ alphadigit | "-" | "_" | "." ] where "hostname" and "alphadigit" are defined as in RFC 1738. Example key: spanner.google.com/universe */
  key?: string;
}

export const Label: Schema.Schema<Label> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      strValue: Schema.optional(Schema.String),
      numValue: Schema.optional(Schema.String),
      key: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Label" }) as any as Schema.Schema<Label>;

export interface PubsubMessage {
  /** Optional list of labels for this message. Keys in this collection must be unique. */
  label?: Array<Label>;
  /** ID of this message assigned by the server at publication time. Guaranteed to be unique within the topic. This value may be read by a subscriber that receives a PubsubMessage via a Pull call or a push delivery. It must not be populated by a publisher in a Publish call. */
  messageId?: string;
  /** The time at which the message was published. The time is milliseconds since the UNIX epoch. */
  publishTime?: string;
  /** The message payload. */
  data?: string;
}

export const PubsubMessage: Schema.Schema<PubsubMessage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      label: Schema.optional(Schema.Array(Label)),
      messageId: Schema.optional(Schema.String),
      publishTime: Schema.optional(Schema.String),
      data: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PubsubMessage",
  }) as any as Schema.Schema<PubsubMessage>;

export interface PubsubEvent {
  /** The subscription that received the event. */
  subscription?: string;
  /** A received message. */
  message?: PubsubMessage;
  /** Indicates that this subscription has been deleted. (Note that pull subscribers will always receive NOT_FOUND in response in their pull request on the subscription, rather than seeing this boolean.) */
  deleted?: boolean;
  /** Indicates that this subscription has been truncated. */
  truncated?: boolean;
}

export const PubsubEvent: Schema.Schema<PubsubEvent> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      subscription: Schema.optional(Schema.String),
      message: Schema.optional(PubsubMessage),
      deleted: Schema.optional(Schema.Boolean),
      truncated: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "PubsubEvent",
  }) as any as Schema.Schema<PubsubEvent>;

export interface PushConfig {
  /** A URL locating the endpoint to which messages should be pushed. For example, a Webhook endpoint might use "https://example.com/push". */
  pushEndpoint?: string;
}

export const PushConfig: Schema.Schema<PushConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pushEndpoint: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "PushConfig" }) as any as Schema.Schema<PushConfig>;

export interface ModifyPushConfigRequest {
  /** The name of the subscription. */
  subscription?: string;
  /** An empty push_config indicates that the Pub/Sub system should pause pushing messages from the given subscription. */
  pushConfig?: PushConfig;
}

export const ModifyPushConfigRequest: Schema.Schema<ModifyPushConfigRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      subscription: Schema.optional(Schema.String),
      pushConfig: Schema.optional(PushConfig),
    }),
  ).annotate({
    identifier: "ModifyPushConfigRequest",
  }) as any as Schema.Schema<ModifyPushConfigRequest>;

export interface AcknowledgeRequest {
  /** The acknowledgment ID for the message being acknowledged. This was returned by the Pub/Sub system in the Pull response. */
  ackId?: Array<string>;
  /** The subscription whose message is being acknowledged. */
  subscription?: string;
}

export const AcknowledgeRequest: Schema.Schema<AcknowledgeRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      ackId: Schema.optional(Schema.Array(Schema.String)),
      subscription: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AcknowledgeRequest",
  }) as any as Schema.Schema<AcknowledgeRequest>;

export interface PublishBatchResponse {
  /** The server-assigned ID of each published message, in the same order as the messages in the request. IDs are guaranteed to be unique within the topic. */
  messageIds?: Array<string>;
}

export const PublishBatchResponse: Schema.Schema<PublishBatchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messageIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "PublishBatchResponse",
  }) as any as Schema.Schema<PublishBatchResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface PublishBatchRequest {
  /** The messages in the request will be published on this topic. */
  topic?: string;
  /** The messages to publish. */
  messages?: Array<PubsubMessage>;
}

export const PublishBatchRequest: Schema.Schema<PublishBatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      topic: Schema.optional(Schema.String),
      messages: Schema.optional(Schema.Array(PubsubMessage)),
    }),
  ).annotate({
    identifier: "PublishBatchRequest",
  }) as any as Schema.Schema<PublishBatchRequest>;

export interface ModifyAckDeadlineRequest {
  /** Next Index: 5 The name of the subscription from which messages are being pulled. */
  subscription?: string;
  /** The new ack deadline with respect to the time this request was sent to the Pub/Sub system. Must be >= 0. For example, if the value is 10, the new ack deadline will expire 10 seconds after the ModifyAckDeadline call was made. Specifying zero may immediately make the message available for another pull request. */
  ackDeadlineSeconds?: number;
  /** The acknowledgment ID. Either this or ack_ids must be populated, not both. */
  ackId?: string;
  /** List of acknowledgment IDs. Either this field or ack_id should be populated, not both. */
  ackIds?: Array<string>;
}

export const ModifyAckDeadlineRequest: Schema.Schema<ModifyAckDeadlineRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      subscription: Schema.optional(Schema.String),
      ackDeadlineSeconds: Schema.optional(Schema.Number),
      ackId: Schema.optional(Schema.String),
      ackIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "ModifyAckDeadlineRequest",
  }) as any as Schema.Schema<ModifyAckDeadlineRequest>;

export interface PublishRequest {
  /** The message in the request will be published on this topic. */
  topic?: string;
  /** The message to publish. */
  message?: PubsubMessage;
}

export const PublishRequest: Schema.Schema<PublishRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      topic: Schema.optional(Schema.String),
      message: Schema.optional(PubsubMessage),
    }),
  ).annotate({
    identifier: "PublishRequest",
  }) as any as Schema.Schema<PublishRequest>;

export interface PullResponse {
  /** This ID must be used to acknowledge the received event or message. */
  ackId?: string;
  /** A pubsub message or truncation event. */
  pubsubEvent?: PubsubEvent;
}

export const PullResponse: Schema.Schema<PullResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      ackId: Schema.optional(Schema.String),
      pubsubEvent: Schema.optional(PubsubEvent),
    }),
  ).annotate({
    identifier: "PullResponse",
  }) as any as Schema.Schema<PullResponse>;

export interface PullBatchResponse {
  /** Received Pub/Sub messages or status events. The Pub/Sub system will return zero messages if there are no more messages available in the backlog. The Pub/Sub system may return fewer than the max_events requested even if there are more messages available in the backlog. */
  pullResponses?: Array<PullResponse>;
}

export const PullBatchResponse: Schema.Schema<PullBatchResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pullResponses: Schema.optional(Schema.Array(PullResponse)),
    }),
  ).annotate({
    identifier: "PullBatchResponse",
  }) as any as Schema.Schema<PullBatchResponse>;

export interface Subscription {
  /** Name of the subscription. */
  name?: string;
  /** The name of the topic from which this subscription is receiving messages. */
  topic?: string;
  /** If push delivery is used with this subscription, this field is used to configure it. */
  pushConfig?: PushConfig;
  /** For either push or pull delivery, the value is the maximum time after a subscriber receives a message before the subscriber should acknowledge or Nack the message. If the Ack deadline for a message passes without an Ack or a Nack, the Pub/Sub system will eventually redeliver the message. If a subscriber acknowledges after the deadline, the Pub/Sub system may accept the Ack, but it is possible that the message has been already delivered again. Multiple Acks to the message are allowed and will succeed. For push delivery, this value is used to set the request timeout for the call to the push endpoint. For pull delivery, this value is used as the initial value for the Ack deadline. It may be overridden for each message using its corresponding ack_id with ModifyAckDeadline. While a message is outstanding (i.e. it has been delivered to a pull subscriber and the subscriber has not yet Acked or Nacked), the Pub/Sub system will not deliver that message to another pull subscriber (on a best-effort basis). */
  ackDeadlineSeconds?: number;
}

export const Subscription: Schema.Schema<Subscription> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      topic: Schema.optional(Schema.String),
      pushConfig: Schema.optional(PushConfig),
      ackDeadlineSeconds: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "Subscription",
  }) as any as Schema.Schema<Subscription>;

export interface ListSubscriptionsResponse {
  /** The subscriptions that match the request. */
  subscription?: Array<Subscription>;
  /** If not empty, indicates that there are more subscriptions that match the request and this value should be passed to the next ListSubscriptionsRequest to continue. */
  nextPageToken?: string;
}

export const ListSubscriptionsResponse: Schema.Schema<ListSubscriptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      subscription: Schema.optional(Schema.Array(Subscription)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListSubscriptionsResponse",
  }) as any as Schema.Schema<ListSubscriptionsResponse>;

export interface PullRequest {
  /** The subscription from which a message should be pulled. */
  subscription?: string;
  /** If this is specified as true the system will respond immediately even if it is not able to return a message in the Pull response. Otherwise the system is allowed to wait until at least one message is available rather than returning FAILED_PRECONDITION. The client may cancel the request if it does not wish to wait any longer for the response. */
  returnImmediately?: boolean;
}

export const PullRequest: Schema.Schema<PullRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      subscription: Schema.optional(Schema.String),
      returnImmediately: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "PullRequest",
  }) as any as Schema.Schema<PullRequest>;

export interface Topic {
  /** Name of the topic. */
  name?: string;
}

export const Topic: Schema.Schema<Topic> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Topic" }) as any as Schema.Schema<Topic>;

export interface ListTopicsResponse {
  /** If not empty, indicates that there are more topics that match the request, and this value should be passed to the next ListTopicsRequest to continue. */
  nextPageToken?: string;
  /** The resulting topics. */
  topic?: Array<Topic>;
}

export const ListTopicsResponse: Schema.Schema<ListTopicsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      nextPageToken: Schema.optional(Schema.String),
      topic: Schema.optional(Schema.Array(Topic)),
    }),
  ).annotate({
    identifier: "ListTopicsResponse",
  }) as any as Schema.Schema<ListTopicsResponse>;

export interface PullBatchRequest {
  /** The subscription from which messages should be pulled. */
  subscription?: string;
  /** The maximum number of PubsubEvents returned for this request. The Pub/Sub system may return fewer than the number of events specified. */
  maxEvents?: number;
  /** If this is specified as true the system will respond immediately even if it is not able to return a message in the Pull response. Otherwise the system is allowed to wait until at least one message is available rather than returning no messages. The client may cancel the request if it does not wish to wait any longer for the response. */
  returnImmediately?: boolean;
}

export const PullBatchRequest: Schema.Schema<PullBatchRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      subscription: Schema.optional(Schema.String),
      maxEvents: Schema.optional(Schema.Number),
      returnImmediately: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "PullBatchRequest",
  }) as any as Schema.Schema<PullBatchRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface PullSubscriptionsRequest {
  /** Request body */
  body?: PullRequest;
}

export const PullSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(PullRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1a/subscriptions/pull",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PullSubscriptionsRequest>;

export type PullSubscriptionsResponse = PullResponse;
export const PullSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PullResponse;

export type PullSubscriptionsError = DefaultErrors;

/** Pulls a single message from the server. If return_immediately is true, and no messages are available in the subscription, this method returns FAILED_PRECONDITION. The system is free to return an UNAVAILABLE error if no messages are available in a reasonable amount of time (to reduce system load). */
export const pullSubscriptions: API.OperationMethod<
  PullSubscriptionsRequest,
  PullSubscriptionsResponse,
  PullSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PullSubscriptionsRequest,
  output: PullSubscriptionsResponse,
  errors: [],
}));

export interface GetSubscriptionsRequest {
  /** The name of the subscription to get. */
  subscription: string;
}

export const GetSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscription: Schema.String.pipe(T.HttpPath("subscription")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta1a/subscriptions/{subscriptionsId}" }),
    svc,
  ) as unknown as Schema.Schema<GetSubscriptionsRequest>;

export type GetSubscriptionsResponse = Subscription;
export const GetSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Subscription;

export type GetSubscriptionsError = DefaultErrors;

/** Gets the configuration details of a subscription. */
export const getSubscriptions: API.OperationMethod<
  GetSubscriptionsRequest,
  GetSubscriptionsResponse,
  GetSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetSubscriptionsRequest,
  output: GetSubscriptionsResponse,
  errors: [],
}));

export interface ModifyAckDeadlineSubscriptionsRequest {
  /** Request body */
  body?: ModifyAckDeadlineRequest;
}

export const ModifyAckDeadlineSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(ModifyAckDeadlineRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1a/subscriptions/modifyAckDeadline",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ModifyAckDeadlineSubscriptionsRequest>;

export type ModifyAckDeadlineSubscriptionsResponse = Empty;
export const ModifyAckDeadlineSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type ModifyAckDeadlineSubscriptionsError = DefaultErrors;

/** Modifies the Ack deadline for a message received from a pull request. */
export const modifyAckDeadlineSubscriptions: API.OperationMethod<
  ModifyAckDeadlineSubscriptionsRequest,
  ModifyAckDeadlineSubscriptionsResponse,
  ModifyAckDeadlineSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyAckDeadlineSubscriptionsRequest,
  output: ModifyAckDeadlineSubscriptionsResponse,
  errors: [],
}));

export interface DeleteSubscriptionsRequest {
  /** The subscription to delete. */
  subscription: string;
}

export const DeleteSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscription: Schema.String.pipe(T.HttpPath("subscription")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta1a/subscriptions/{subscriptionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteSubscriptionsRequest>;

export type DeleteSubscriptionsResponse = Empty;
export const DeleteSubscriptionsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteSubscriptionsError = DefaultErrors;

/** Deletes an existing subscription. All pending messages in the subscription are immediately dropped. Calls to Pull after deletion will return NOT_FOUND. */
export const deleteSubscriptions: API.OperationMethod<
  DeleteSubscriptionsRequest,
  DeleteSubscriptionsResponse,
  DeleteSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteSubscriptionsRequest,
  output: DeleteSubscriptionsResponse,
  errors: [],
}));

export interface AcknowledgeSubscriptionsRequest {
  /** Request body */
  body?: AcknowledgeRequest;
}

export const AcknowledgeSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(AcknowledgeRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1a/subscriptions/acknowledge",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<AcknowledgeSubscriptionsRequest>;

export type AcknowledgeSubscriptionsResponse = Empty;
export const AcknowledgeSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type AcknowledgeSubscriptionsError = DefaultErrors;

/** Acknowledges a particular received message: the Pub/Sub system can remove the given message from the subscription. Acknowledging a message whose Ack deadline has expired may succeed, but the message could have been already redelivered. Acknowledging a message more than once will not result in an error. This is only used for messages received via pull. */
export const acknowledgeSubscriptions: API.OperationMethod<
  AcknowledgeSubscriptionsRequest,
  AcknowledgeSubscriptionsResponse,
  AcknowledgeSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AcknowledgeSubscriptionsRequest,
  output: AcknowledgeSubscriptionsResponse,
  errors: [],
}));

export interface ListSubscriptionsRequest {
  /** A valid label query expression. */
  query?: string;
  /** The value obtained in the last ListSubscriptionsResponse for continuation. */
  pageToken?: string;
  /** Maximum number of subscriptions to return. */
  maxResults?: number;
}

export const ListSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
    maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta1a/subscriptions" }),
    svc,
  ) as unknown as Schema.Schema<ListSubscriptionsRequest>;

export type ListSubscriptionsResponse_Op = ListSubscriptionsResponse;
export const ListSubscriptionsResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListSubscriptionsResponse;

export type ListSubscriptionsError = DefaultErrors;

/** Lists matching subscriptions. */
export const listSubscriptions: API.PaginatedOperationMethod<
  ListSubscriptionsRequest,
  ListSubscriptionsResponse_Op,
  ListSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListSubscriptionsRequest,
  output: ListSubscriptionsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateSubscriptionsRequest {
  /** Request body */
  body?: Subscription;
}

export const CreateSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(Subscription).pipe(T.HttpBody()),
  }).pipe(
    T.Http({ method: "POST", path: "v1beta1a/subscriptions", hasBody: true }),
    svc,
  ) as unknown as Schema.Schema<CreateSubscriptionsRequest>;

export type CreateSubscriptionsResponse = Subscription;
export const CreateSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Subscription;

export type CreateSubscriptionsError = DefaultErrors;

/** Creates a subscription on a given topic for a given subscriber. If the subscription already exists, returns ALREADY_EXISTS. If the corresponding topic doesn't exist, returns NOT_FOUND. If the name is not provided in the request, the server will assign a random name for this subscription on the same project as the topic. */
export const createSubscriptions: API.OperationMethod<
  CreateSubscriptionsRequest,
  CreateSubscriptionsResponse,
  CreateSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateSubscriptionsRequest,
  output: CreateSubscriptionsResponse,
  errors: [],
}));

export interface ModifyPushConfigSubscriptionsRequest {
  /** Request body */
  body?: ModifyPushConfigRequest;
}

export const ModifyPushConfigSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(ModifyPushConfigRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1a/subscriptions/modifyPushConfig",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ModifyPushConfigSubscriptionsRequest>;

export type ModifyPushConfigSubscriptionsResponse = Empty;
export const ModifyPushConfigSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type ModifyPushConfigSubscriptionsError = DefaultErrors;

/** Modifies the PushConfig for a specified subscription. This method can be used to suspend the flow of messages to an endpoint by clearing the PushConfig field in the request. Messages will be accumulated for delivery even if no push configuration is defined or while the configuration is modified. */
export const modifyPushConfigSubscriptions: API.OperationMethod<
  ModifyPushConfigSubscriptionsRequest,
  ModifyPushConfigSubscriptionsResponse,
  ModifyPushConfigSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyPushConfigSubscriptionsRequest,
  output: ModifyPushConfigSubscriptionsResponse,
  errors: [],
}));

export interface PullBatchSubscriptionsRequest {
  /** Request body */
  body?: PullBatchRequest;
}

export const PullBatchSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(PullBatchRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1a/subscriptions/pullBatch",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PullBatchSubscriptionsRequest>;

export type PullBatchSubscriptionsResponse = PullBatchResponse;
export const PullBatchSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PullBatchResponse;

export type PullBatchSubscriptionsError = DefaultErrors;

/** Pulls messages from the server. Returns an empty list if there are no messages available in the backlog. The system is free to return UNAVAILABLE if there are too many pull requests outstanding for the given subscription. */
export const pullBatchSubscriptions: API.OperationMethod<
  PullBatchSubscriptionsRequest,
  PullBatchSubscriptionsResponse,
  PullBatchSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PullBatchSubscriptionsRequest,
  output: PullBatchSubscriptionsResponse,
  errors: [],
}));

export interface PublishTopicsRequest {
  /** Request body */
  body?: PublishRequest;
}

export const PublishTopicsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  body: Schema.optional(PublishRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1a/topics/publish", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PublishTopicsRequest>;

export type PublishTopicsResponse = Empty;
export const PublishTopicsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type PublishTopicsError = DefaultErrors;

/** Adds a message to the topic. Returns NOT_FOUND if the topic does not exist. */
export const publishTopics: API.OperationMethod<
  PublishTopicsRequest,
  PublishTopicsResponse,
  PublishTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PublishTopicsRequest,
  output: PublishTopicsResponse,
  errors: [],
}));

export interface DeleteTopicsRequest {
  /** Name of the topic to delete. */
  topic: string;
}

export const DeleteTopicsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  topic: Schema.String.pipe(T.HttpPath("topic")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1a/topics/{topicsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteTopicsRequest>;

export type DeleteTopicsResponse = Empty;
export const DeleteTopicsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteTopicsError = DefaultErrors;

/** Deletes the topic with the given name. Returns NOT_FOUND if the topic does not exist. After a topic is deleted, a new topic may be created with the same name. */
export const deleteTopics: API.OperationMethod<
  DeleteTopicsRequest,
  DeleteTopicsResponse,
  DeleteTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteTopicsRequest,
  output: DeleteTopicsResponse,
  errors: [],
}));

export interface ListTopicsRequest {
  /** A valid label query expression. */
  query?: string;
  /** The value obtained in the last ListTopicsResponse for continuation. */
  pageToken?: string;
  /** Maximum number of topics to return. */
  maxResults?: number;
}

export const ListTopicsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  maxResults: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxResults")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1a/topics" }),
  svc,
) as unknown as Schema.Schema<ListTopicsRequest>;

export type ListTopicsResponse_Op = ListTopicsResponse;
export const ListTopicsResponse_Op =
  /*@__PURE__*/ /*#__PURE__*/ ListTopicsResponse;

export type ListTopicsError = DefaultErrors;

/** Lists matching topics. */
export const listTopics: API.PaginatedOperationMethod<
  ListTopicsRequest,
  ListTopicsResponse_Op,
  ListTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListTopicsRequest,
  output: ListTopicsResponse_Op,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface CreateTopicsRequest {
  /** Request body */
  body?: Topic;
}

export const CreateTopicsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  body: Schema.optional(Topic).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1a/topics", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateTopicsRequest>;

export type CreateTopicsResponse = Topic;
export const CreateTopicsResponse = /*@__PURE__*/ /*#__PURE__*/ Topic;

export type CreateTopicsError = DefaultErrors;

/** Creates the given topic with the given name. */
export const createTopics: API.OperationMethod<
  CreateTopicsRequest,
  CreateTopicsResponse,
  CreateTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateTopicsRequest,
  output: CreateTopicsResponse,
  errors: [],
}));

export interface GetTopicsRequest {
  /** The name of the topic to get. */
  topic: string;
}

export const GetTopicsRequest = /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
  topic: Schema.String.pipe(T.HttpPath("topic")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1a/topics/{topicsId}" }),
  svc,
) as unknown as Schema.Schema<GetTopicsRequest>;

export type GetTopicsResponse = Topic;
export const GetTopicsResponse = /*@__PURE__*/ /*#__PURE__*/ Topic;

export type GetTopicsError = DefaultErrors;

/** Gets the configuration of a topic. Since the topic only has the name attribute, this method is only useful to check the existence of a topic. If other attributes are added in the future, they will be returned here. */
export const getTopics: API.OperationMethod<
  GetTopicsRequest,
  GetTopicsResponse,
  GetTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetTopicsRequest,
  output: GetTopicsResponse,
  errors: [],
}));

export interface PublishBatchTopicsRequest {
  /** Request body */
  body?: PublishBatchRequest;
}

export const PublishBatchTopicsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    body: Schema.optional(PublishBatchRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1a/topics/publishBatch",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PublishBatchTopicsRequest>;

export type PublishBatchTopicsResponse = PublishBatchResponse;
export const PublishBatchTopicsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PublishBatchResponse;

export type PublishBatchTopicsError = DefaultErrors;

/** Adds one or more messages to the topic. Returns NOT_FOUND if the topic does not exist. */
export const publishBatchTopics: API.OperationMethod<
  PublishBatchTopicsRequest,
  PublishBatchTopicsResponse,
  PublishBatchTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PublishBatchTopicsRequest,
  output: PublishBatchTopicsResponse,
  errors: [],
}));
