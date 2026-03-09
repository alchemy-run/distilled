// ==========================================================================
// Cloud Pub/Sub API (pubsub v1beta2)
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
  version: "v1beta2",
  rootUrl: "https://pubsub.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const Expr: Schema.Schema<Expr> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      expression: Schema.optional(Schema.String),
      title: Schema.optional(Schema.String),
      description: Schema.optional(Schema.String),
      location: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      role: Schema.optional(Schema.String),
      members: Schema.optional(Schema.Array(Schema.String)),
      condition: Schema.optional(Expr),
    }),
  ).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      version: Schema.optional(Schema.Number),
      bindings: Schema.optional(Schema.Array(Binding)),
      etag: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      policy: Schema.optional(Policy),
    }),
  ).annotate({
    identifier: "SetIamPolicyRequest",
  }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsRequest",
  }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      permissions: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "TestIamPermissionsResponse",
  }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface Topic {
  /** The name of the topic. It must have the format `"projects/{project}/topics/{topic}"`. `{topic}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. */
  name?: string;
}

export const Topic: Schema.Schema<Topic> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "Topic" }) as any as Schema.Schema<Topic>;

export interface PubsubMessage {
  /** The message payload. For JSON requests, the value of this field must be [base64-encoded](https://tools.ietf.org/html/rfc4648). */
  data?: string;
  /** Optional attributes for this message. */
  attributes?: Record<string, string>;
  /** ID of this message, assigned by the server when the message is published. Guaranteed to be unique within the topic. This value may be read by a subscriber that receives a `PubsubMessage` via a `Pull` call or a push delivery. It must not be populated by the publisher in a `Publish` call. */
  messageId?: string;
  /** The time at which the message was published, populated by the server when it receives the `Publish` call. It must not be populated by the publisher in a `Publish` call. */
  publishTime?: string;
}

export const PubsubMessage: Schema.Schema<PubsubMessage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      data: Schema.optional(Schema.String),
      attributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      messageId: Schema.optional(Schema.String),
      publishTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PubsubMessage",
  }) as any as Schema.Schema<PubsubMessage>;

export interface PublishRequest {
  /** The messages to publish. */
  messages?: Array<PubsubMessage>;
}

export const PublishRequest: Schema.Schema<PublishRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messages: Schema.optional(Schema.Array(PubsubMessage)),
    }),
  ).annotate({
    identifier: "PublishRequest",
  }) as any as Schema.Schema<PublishRequest>;

export interface PublishResponse {
  /** The server-assigned ID of each published message, in the same order as the messages in the request. IDs are guaranteed to be unique within the topic. */
  messageIds?: Array<string>;
}

export const PublishResponse: Schema.Schema<PublishResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      messageIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "PublishResponse",
  }) as any as Schema.Schema<PublishResponse>;

export interface ListTopicsResponse {
  /** The resulting topics. */
  topics?: Array<Topic>;
  /** If not empty, indicates that there may be more topics that match the request; this value should be passed in a new `ListTopicsRequest`. */
  nextPageToken?: string;
}

export const ListTopicsResponse: Schema.Schema<ListTopicsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      topics: Schema.optional(Schema.Array(Topic)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListTopicsResponse",
  }) as any as Schema.Schema<ListTopicsResponse>;

export interface ListTopicSubscriptionsResponse {
  /** The names of the subscriptions that match the request. */
  subscriptions?: Array<string>;
  /** If not empty, indicates that there may be more subscriptions that match the request; this value should be passed in a new `ListTopicSubscriptionsRequest` to get more subscriptions. */
  nextPageToken?: string;
}

export const ListTopicSubscriptionsResponse: Schema.Schema<ListTopicSubscriptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      subscriptions: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListTopicSubscriptionsResponse",
  }) as any as Schema.Schema<ListTopicSubscriptionsResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "Empty",
  }) as any as Schema.Schema<Empty>;

export interface OidcToken {
  /** [Service account email](https://cloud.google.com/iam/docs/service-accounts) to be used for generating the OIDC token. The caller (for CreateSubscription, UpdateSubscription, and ModifyPushConfig RPCs) must have the iam.serviceAccounts.actAs permission for the service account. */
  serviceAccountEmail?: string;
  /** Audience to be used when generating OIDC token. The audience claim identifies the recipients that the JWT is intended for. The audience value is a single case-sensitive string. Having multiple values (array) for the audience field is not supported. More info about the OIDC JWT token audience here: https://tools.ietf.org/html/rfc7519#section-4.1.3 Note: if not specified, the Push endpoint URL will be used. */
  audience?: string;
}

export const OidcToken: Schema.Schema<OidcToken> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      serviceAccountEmail: Schema.optional(Schema.String),
      audience: Schema.optional(Schema.String),
    }),
  ).annotate({ identifier: "OidcToken" }) as any as Schema.Schema<OidcToken>;

export interface PushConfig {
  /** A URL locating the endpoint to which messages should be pushed. For example, a Webhook endpoint might use "https://example.com/push". */
  pushEndpoint?: string;
  /** Endpoint configuration attributes. Every endpoint has a set of API supported attributes that can be used to control different aspects of the message delivery. The currently supported attribute is `x-goog-version`, which you can use to change the format of the push message. This attribute indicates the version of the data expected by the endpoint. This controls the shape of the envelope (i.e. its fields and metadata). The endpoint version is based on the version of the Pub/Sub API. If not present during the `CreateSubscription` call, it will default to the version of the API used to make such call. If not present during a `ModifyPushConfig` call, its value will not be changed. `GetSubscription` calls will always return a valid version, even if the subscription was created without this attribute. The possible values for this attribute are: * `v1beta1`: uses the push format defined in the v1beta1 Pub/Sub API. * `v1` or `v1beta2`: uses the push format defined in the v1 Pub/Sub API. */
  attributes?: Record<string, string>;
  /** If specified, Pub/Sub will generate and attach an OIDC JWT token as an `Authorization` header in the HTTP request for every pushed message. */
  oidcToken?: OidcToken;
}

export const PushConfig: Schema.Schema<PushConfig> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pushEndpoint: Schema.optional(Schema.String),
      attributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      oidcToken: Schema.optional(OidcToken),
    }),
  ).annotate({ identifier: "PushConfig" }) as any as Schema.Schema<PushConfig>;

export interface Subscription {
  /** The name of the subscription. It must have the format `"projects/{project}/subscriptions/{subscription}"`. `{subscription}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. */
  name?: string;
  /** The name of the topic from which this subscription is receiving messages. The value of this field will be `_deleted-topic_` if the topic has been deleted. */
  topic?: string;
  /** If push delivery is used with this subscription, this field is used to configure it. An empty `pushConfig` signifies that the subscriber will pull and ack messages using API methods. */
  pushConfig?: PushConfig;
  /** This value is the maximum time after a subscriber receives a message before the subscriber should acknowledge the message. After message delivery but before the ack deadline expires and before the message is acknowledged, it is an outstanding message and will not be delivered again during that time (on a best-effort basis). For pull subscriptions, this value is used as the initial value for the ack deadline. To override this value for a given message, call `ModifyAckDeadline` with the corresponding `ack_id` if using pull. The maximum custom deadline you can specify is 600 seconds (10 minutes). For push delivery, this value is also used to set the request timeout for the call to the push endpoint. If the subscriber never acknowledges the message, the Pub/Sub system will eventually redeliver the message. If this parameter is 0, a default value of 10 seconds is used. */
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
  subscriptions?: Array<Subscription>;
  /** If not empty, indicates that there may be more subscriptions that match the request; this value should be passed in a new `ListSubscriptionsRequest` to get more subscriptions. */
  nextPageToken?: string;
}

export const ListSubscriptionsResponse: Schema.Schema<ListSubscriptionsResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      subscriptions: Schema.optional(Schema.Array(Subscription)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListSubscriptionsResponse",
  }) as any as Schema.Schema<ListSubscriptionsResponse>;

export interface ModifyAckDeadlineRequest {
  /** The acknowledgment ID. Either this or ack_ids must be populated, but not both. */
  ackId?: string;
  /** List of acknowledgment IDs. */
  ackIds?: Array<string>;
  /** The new ack deadline with respect to the time this request was sent to the Pub/Sub system. Must be >= 0. For example, if the value is 10, the new ack deadline will expire 10 seconds after the `ModifyAckDeadline` call was made. Specifying zero may immediately make the message available for another pull request. */
  ackDeadlineSeconds?: number;
}

export const ModifyAckDeadlineRequest: Schema.Schema<ModifyAckDeadlineRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      ackId: Schema.optional(Schema.String),
      ackIds: Schema.optional(Schema.Array(Schema.String)),
      ackDeadlineSeconds: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ModifyAckDeadlineRequest",
  }) as any as Schema.Schema<ModifyAckDeadlineRequest>;

export interface AcknowledgeRequest {
  /** The acknowledgment ID for the messages being acknowledged that was returned by the Pub/Sub system in the `Pull` response. Must not be empty. */
  ackIds?: Array<string>;
}

export const AcknowledgeRequest: Schema.Schema<AcknowledgeRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      ackIds: Schema.optional(Schema.Array(Schema.String)),
    }),
  ).annotate({
    identifier: "AcknowledgeRequest",
  }) as any as Schema.Schema<AcknowledgeRequest>;

export interface PullRequest {
  /** Optional. If this is specified as true the system will respond immediately even if it is not able to return a message in the `Pull` response. Otherwise the system is allowed to wait until at least one message is available rather than returning no messages. The client may cancel the request if it does not wish to wait any longer for the response. Warning: setting this field to `true` is discouraged because it adversely impacts the performance of `Pull` operations. We recommend that users do not set this field. */
  returnImmediately?: boolean;
  /** The maximum number of messages returned for this request. The Pub/Sub system may return fewer than the number specified. */
  maxMessages?: number;
}

export const PullRequest: Schema.Schema<PullRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      returnImmediately: Schema.optional(Schema.Boolean),
      maxMessages: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "PullRequest",
  }) as any as Schema.Schema<PullRequest>;

export interface ReceivedMessage {
  /** This ID can be used to acknowledge the received message. */
  ackId?: string;
  /** The message. */
  message?: PubsubMessage;
}

export const ReceivedMessage: Schema.Schema<ReceivedMessage> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      ackId: Schema.optional(Schema.String),
      message: Schema.optional(PubsubMessage),
    }),
  ).annotate({
    identifier: "ReceivedMessage",
  }) as any as Schema.Schema<ReceivedMessage>;

export interface PullResponse {
  /** Received Pub/Sub messages. The Pub/Sub system will return zero messages if there are no more available in the backlog. The Pub/Sub system may return fewer than the `maxMessages` requested even if there are more messages available in the backlog. */
  receivedMessages?: Array<ReceivedMessage>;
}

export const PullResponse: Schema.Schema<PullResponse> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      receivedMessages: Schema.optional(Schema.Array(ReceivedMessage)),
    }),
  ).annotate({
    identifier: "PullResponse",
  }) as any as Schema.Schema<PullResponse>;

export interface ModifyPushConfigRequest {
  /** The push configuration for future deliveries. An empty `pushConfig` indicates that the Pub/Sub system should stop pushing messages from the given subscription and allow messages to be pulled and acknowledged - effectively pausing the subscription if `Pull` is not called. */
  pushConfig?: PushConfig;
}

export const ModifyPushConfigRequest: Schema.Schema<ModifyPushConfigRequest> =
  /*@__PURE__*/ /*#__PURE__*/ Schema.suspend(() =>
    Schema.Struct({
      pushConfig: Schema.optional(PushConfig),
    }),
  ).annotate({
    identifier: "ModifyPushConfigRequest",
  }) as any as Schema.Schema<ModifyPushConfigRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface SetIamPolicyProjectsSubscriptionsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/subscriptions/{subscriptionsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsSubscriptionsRequest>;

export type SetIamPolicyProjectsSubscriptionsResponse = Policy;
export const SetIamPolicyProjectsSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsSubscriptionsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsSubscriptions: API.OperationMethod<
  SetIamPolicyProjectsSubscriptionsRequest,
  SetIamPolicyProjectsSubscriptionsResponse,
  SetIamPolicyProjectsSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsSubscriptionsRequest,
  output: SetIamPolicyProjectsSubscriptionsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsSubscriptionsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/subscriptions/{subscriptionsId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsSubscriptionsRequest>;

export type GetIamPolicyProjectsSubscriptionsResponse = Policy;
export const GetIamPolicyProjectsSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsSubscriptionsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsSubscriptions: API.OperationMethod<
  GetIamPolicyProjectsSubscriptionsRequest,
  GetIamPolicyProjectsSubscriptionsResponse,
  GetIamPolicyProjectsSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsSubscriptionsRequest,
  output: GetIamPolicyProjectsSubscriptionsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsSubscriptionsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/subscriptions/{subscriptionsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsSubscriptionsRequest>;

export type TestIamPermissionsProjectsSubscriptionsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsSubscriptionsError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsSubscriptions: API.OperationMethod<
  TestIamPermissionsProjectsSubscriptionsRequest,
  TestIamPermissionsProjectsSubscriptionsResponse,
  TestIamPermissionsProjectsSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsSubscriptionsRequest,
  output: TestIamPermissionsProjectsSubscriptionsResponse,
  errors: [],
}));

export interface CreateProjectsSubscriptionsRequest {
  /** The name of the subscription. It must have the format `"projects/{project}/subscriptions/{subscription}"`. `{subscription}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. */
  name: string;
  /** Request body */
  body?: Subscription;
}

export const CreateProjectsSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(Subscription).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "v1beta2/projects/{projectsId}/subscriptions/{subscriptionsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsSubscriptionsRequest>;

export type CreateProjectsSubscriptionsResponse = Subscription;
export const CreateProjectsSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Subscription;

export type CreateProjectsSubscriptionsError = DefaultErrors;

/** Creates a subscription to a given topic. If the subscription already exists, returns `ALREADY_EXISTS`. If the corresponding topic doesn't exist, returns `NOT_FOUND`. If the name is not provided in the request, the server will assign a random name for this subscription on the same project as the topic. Note that for REST API requests, you must specify a name. */
export const createProjectsSubscriptions: API.OperationMethod<
  CreateProjectsSubscriptionsRequest,
  CreateProjectsSubscriptionsResponse,
  CreateProjectsSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsSubscriptionsRequest,
  output: CreateProjectsSubscriptionsResponse,
  errors: [],
}));

export interface GetProjectsSubscriptionsRequest {
  /** The name of the subscription to get. */
  subscription: string;
}

export const GetProjectsSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscription: Schema.String.pipe(T.HttpPath("subscription")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/subscriptions/{subscriptionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsSubscriptionsRequest>;

export type GetProjectsSubscriptionsResponse = Subscription;
export const GetProjectsSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Subscription;

export type GetProjectsSubscriptionsError = DefaultErrors;

/** Gets the configuration details of a subscription. */
export const getProjectsSubscriptions: API.OperationMethod<
  GetProjectsSubscriptionsRequest,
  GetProjectsSubscriptionsResponse,
  GetProjectsSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsSubscriptionsRequest,
  output: GetProjectsSubscriptionsResponse,
  errors: [],
}));

export interface ListProjectsSubscriptionsRequest {
  /** The name of the cloud project that subscriptions belong to. */
  project: string;
  /** Maximum number of subscriptions to return. */
  pageSize?: number;
  /** The value returned by the last `ListSubscriptionsResponse`; indicates that this is a continuation of a prior `ListSubscriptions` call, and that the system should return the next page of data. */
  pageToken?: string;
}

export const ListProjectsSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    project: Schema.String.pipe(T.HttpPath("project")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/subscriptions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsSubscriptionsRequest>;

export type ListProjectsSubscriptionsResponse = ListSubscriptionsResponse;
export const ListProjectsSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListSubscriptionsResponse;

export type ListProjectsSubscriptionsError = DefaultErrors;

/** Lists matching subscriptions. */
export const listProjectsSubscriptions: API.PaginatedOperationMethod<
  ListProjectsSubscriptionsRequest,
  ListProjectsSubscriptionsResponse,
  ListProjectsSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsSubscriptionsRequest,
  output: ListProjectsSubscriptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsSubscriptionsRequest {
  /** The subscription to delete. */
  subscription: string;
}

export const DeleteProjectsSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscription: Schema.String.pipe(T.HttpPath("subscription")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta2/projects/{projectsId}/subscriptions/{subscriptionsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsSubscriptionsRequest>;

export type DeleteProjectsSubscriptionsResponse = Empty;
export const DeleteProjectsSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsSubscriptionsError = DefaultErrors;

/** Deletes an existing subscription. All pending messages in the subscription are immediately dropped. Calls to `Pull` after deletion will return `NOT_FOUND`. After a subscription is deleted, a new one may be created with the same name, but the new one has no association with the old subscription, or its topic unless the same topic is specified. */
export const deleteProjectsSubscriptions: API.OperationMethod<
  DeleteProjectsSubscriptionsRequest,
  DeleteProjectsSubscriptionsResponse,
  DeleteProjectsSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsSubscriptionsRequest,
  output: DeleteProjectsSubscriptionsResponse,
  errors: [],
}));

export interface ModifyAckDeadlineProjectsSubscriptionsRequest {
  /** The name of the subscription. */
  subscription: string;
  /** Request body */
  body?: ModifyAckDeadlineRequest;
}

export const ModifyAckDeadlineProjectsSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscription: Schema.String.pipe(T.HttpPath("subscription")),
    body: Schema.optional(ModifyAckDeadlineRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/subscriptions/{subscriptionsId}:modifyAckDeadline",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ModifyAckDeadlineProjectsSubscriptionsRequest>;

export type ModifyAckDeadlineProjectsSubscriptionsResponse = Empty;
export const ModifyAckDeadlineProjectsSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type ModifyAckDeadlineProjectsSubscriptionsError = DefaultErrors;

/** Modifies the ack deadline for a specific message. This method is useful to indicate that more time is needed to process a message by the subscriber, or to make the message available for redelivery if the processing was interrupted. Note that this does not modify the subscription-level `ackDeadlineSeconds` used for subsequent messages. */
export const modifyAckDeadlineProjectsSubscriptions: API.OperationMethod<
  ModifyAckDeadlineProjectsSubscriptionsRequest,
  ModifyAckDeadlineProjectsSubscriptionsResponse,
  ModifyAckDeadlineProjectsSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyAckDeadlineProjectsSubscriptionsRequest,
  output: ModifyAckDeadlineProjectsSubscriptionsResponse,
  errors: [],
}));

export interface AcknowledgeProjectsSubscriptionsRequest {
  /** The subscription whose message is being acknowledged. */
  subscription: string;
  /** Request body */
  body?: AcknowledgeRequest;
}

export const AcknowledgeProjectsSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscription: Schema.String.pipe(T.HttpPath("subscription")),
    body: Schema.optional(AcknowledgeRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/subscriptions/{subscriptionsId}:acknowledge",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<AcknowledgeProjectsSubscriptionsRequest>;

export type AcknowledgeProjectsSubscriptionsResponse = Empty;
export const AcknowledgeProjectsSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type AcknowledgeProjectsSubscriptionsError = DefaultErrors;

/** Acknowledges the messages associated with the `ack_ids` in the `AcknowledgeRequest`. The Pub/Sub system can remove the relevant messages from the subscription. Acknowledging a message whose ack deadline has expired may succeed, but such a message may be redelivered later. Acknowledging a message more than once will not result in an error. */
export const acknowledgeProjectsSubscriptions: API.OperationMethod<
  AcknowledgeProjectsSubscriptionsRequest,
  AcknowledgeProjectsSubscriptionsResponse,
  AcknowledgeProjectsSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: AcknowledgeProjectsSubscriptionsRequest,
  output: AcknowledgeProjectsSubscriptionsResponse,
  errors: [],
}));

export interface PullProjectsSubscriptionsRequest {
  /** The subscription from which messages should be pulled. */
  subscription: string;
  /** Request body */
  body?: PullRequest;
}

export const PullProjectsSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscription: Schema.String.pipe(T.HttpPath("subscription")),
    body: Schema.optional(PullRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/subscriptions/{subscriptionsId}:pull",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PullProjectsSubscriptionsRequest>;

export type PullProjectsSubscriptionsResponse = PullResponse;
export const PullProjectsSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PullResponse;

export type PullProjectsSubscriptionsError = DefaultErrors;

/** Pulls messages from the server. Returns an empty list if there are no messages available in the backlog. The server may return `UNAVAILABLE` if there are too many concurrent pull requests pending for the given subscription. */
export const pullProjectsSubscriptions: API.OperationMethod<
  PullProjectsSubscriptionsRequest,
  PullProjectsSubscriptionsResponse,
  PullProjectsSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PullProjectsSubscriptionsRequest,
  output: PullProjectsSubscriptionsResponse,
  errors: [],
}));

export interface ModifyPushConfigProjectsSubscriptionsRequest {
  /** The name of the subscription. */
  subscription: string;
  /** Request body */
  body?: ModifyPushConfigRequest;
}

export const ModifyPushConfigProjectsSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    subscription: Schema.String.pipe(T.HttpPath("subscription")),
    body: Schema.optional(ModifyPushConfigRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/subscriptions/{subscriptionsId}:modifyPushConfig",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<ModifyPushConfigProjectsSubscriptionsRequest>;

export type ModifyPushConfigProjectsSubscriptionsResponse = Empty;
export const ModifyPushConfigProjectsSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Empty;

export type ModifyPushConfigProjectsSubscriptionsError = DefaultErrors;

/** Modifies the `PushConfig` for a specified subscription. This may be used to change a push subscription to a pull one (signified by an empty `PushConfig`) or vice versa, or change the endpoint URL and other attributes of a push subscription. Messages will accumulate for delivery continuously through the call regardless of changes to the `PushConfig`. */
export const modifyPushConfigProjectsSubscriptions: API.OperationMethod<
  ModifyPushConfigProjectsSubscriptionsRequest,
  ModifyPushConfigProjectsSubscriptionsResponse,
  ModifyPushConfigProjectsSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: ModifyPushConfigProjectsSubscriptionsRequest,
  output: ModifyPushConfigProjectsSubscriptionsResponse,
  errors: [],
}));

export interface SetIamPolicyProjectsTopicsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsTopicsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/topics/{topicsId}:setIamPolicy",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<SetIamPolicyProjectsTopicsRequest>;

export type SetIamPolicyProjectsTopicsResponse = Policy;
export const SetIamPolicyProjectsTopicsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type SetIamPolicyProjectsTopicsError = DefaultErrors;

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export const setIamPolicyProjectsTopics: API.OperationMethod<
  SetIamPolicyProjectsTopicsRequest,
  SetIamPolicyProjectsTopicsResponse,
  SetIamPolicyProjectsTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: SetIamPolicyProjectsTopicsRequest,
  output: SetIamPolicyProjectsTopicsResponse,
  errors: [],
}));

export interface GetIamPolicyProjectsTopicsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsTopicsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(
      T.HttpQuery("options.requestedPolicyVersion"),
    ),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/topics/{topicsId}:getIamPolicy",
    }),
    svc,
  ) as unknown as Schema.Schema<GetIamPolicyProjectsTopicsRequest>;

export type GetIamPolicyProjectsTopicsResponse = Policy;
export const GetIamPolicyProjectsTopicsResponse =
  /*@__PURE__*/ /*#__PURE__*/ Policy;

export type GetIamPolicyProjectsTopicsError = DefaultErrors;

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export const getIamPolicyProjectsTopics: API.OperationMethod<
  GetIamPolicyProjectsTopicsRequest,
  GetIamPolicyProjectsTopicsResponse,
  GetIamPolicyProjectsTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetIamPolicyProjectsTopicsRequest,
  output: GetIamPolicyProjectsTopicsResponse,
  errors: [],
}));

export interface TestIamPermissionsProjectsTopicsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsTopicsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    resource: Schema.String.pipe(T.HttpPath("resource")),
    body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/topics/{topicsId}:testIamPermissions",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<TestIamPermissionsProjectsTopicsRequest>;

export type TestIamPermissionsProjectsTopicsResponse =
  TestIamPermissionsResponse;
export const TestIamPermissionsProjectsTopicsResponse =
  /*@__PURE__*/ /*#__PURE__*/ TestIamPermissionsResponse;

export type TestIamPermissionsProjectsTopicsError = DefaultErrors;

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export const testIamPermissionsProjectsTopics: API.OperationMethod<
  TestIamPermissionsProjectsTopicsRequest,
  TestIamPermissionsProjectsTopicsResponse,
  TestIamPermissionsProjectsTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: TestIamPermissionsProjectsTopicsRequest,
  output: TestIamPermissionsProjectsTopicsResponse,
  errors: [],
}));

export interface CreateProjectsTopicsRequest {
  /** The name of the topic. It must have the format `"projects/{project}/topics/{topic}"`. `{topic}` must start with a letter, and contain only letters (`[A-Za-z]`), numbers (`[0-9]`), dashes (`-`), underscores (`_`), periods (`.`), tildes (`~`), plus (`+`) or percent signs (`%`). It must be between 3 and 255 characters in length, and it must not start with `"goog"`. */
  name: string;
  /** Request body */
  body?: Topic;
}

export const CreateProjectsTopicsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    name: Schema.String.pipe(T.HttpPath("name")),
    body: Schema.optional(Topic).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "PUT",
      path: "v1beta2/projects/{projectsId}/topics/{topicsId}",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<CreateProjectsTopicsRequest>;

export type CreateProjectsTopicsResponse = Topic;
export const CreateProjectsTopicsResponse = /*@__PURE__*/ /*#__PURE__*/ Topic;

export type CreateProjectsTopicsError = DefaultErrors;

/** Creates the given topic with the given name. */
export const createProjectsTopics: API.OperationMethod<
  CreateProjectsTopicsRequest,
  CreateProjectsTopicsResponse,
  CreateProjectsTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: CreateProjectsTopicsRequest,
  output: CreateProjectsTopicsResponse,
  errors: [],
}));

export interface PublishProjectsTopicsRequest {
  /** The messages in the request will be published on this topic. */
  topic: string;
  /** Request body */
  body?: PublishRequest;
}

export const PublishProjectsTopicsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    topic: Schema.String.pipe(T.HttpPath("topic")),
    body: Schema.optional(PublishRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta2/projects/{projectsId}/topics/{topicsId}:publish",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<PublishProjectsTopicsRequest>;

export type PublishProjectsTopicsResponse = PublishResponse;
export const PublishProjectsTopicsResponse =
  /*@__PURE__*/ /*#__PURE__*/ PublishResponse;

export type PublishProjectsTopicsError = DefaultErrors;

/** Adds one or more messages to the topic. Returns `NOT_FOUND` if the topic does not exist. The message payload must not be empty; it must contain either a non-empty data field, or at least one attribute. */
export const publishProjectsTopics: API.OperationMethod<
  PublishProjectsTopicsRequest,
  PublishProjectsTopicsResponse,
  PublishProjectsTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: PublishProjectsTopicsRequest,
  output: PublishProjectsTopicsResponse,
  errors: [],
}));

export interface GetProjectsTopicsRequest {
  /** The name of the topic to get. */
  topic: string;
}

export const GetProjectsTopicsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    topic: Schema.String.pipe(T.HttpPath("topic")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/topics/{topicsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<GetProjectsTopicsRequest>;

export type GetProjectsTopicsResponse = Topic;
export const GetProjectsTopicsResponse = /*@__PURE__*/ /*#__PURE__*/ Topic;

export type GetProjectsTopicsError = DefaultErrors;

/** Gets the configuration of a topic. */
export const getProjectsTopics: API.OperationMethod<
  GetProjectsTopicsRequest,
  GetProjectsTopicsResponse,
  GetProjectsTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: GetProjectsTopicsRequest,
  output: GetProjectsTopicsResponse,
  errors: [],
}));

export interface ListProjectsTopicsRequest {
  /** The name of the cloud project that topics belong to. */
  project: string;
  /** Maximum number of topics to return. */
  pageSize?: number;
  /** The value returned by the last `ListTopicsResponse`; indicates that this is a continuation of a prior `ListTopics` call, and that the system should return the next page of data. */
  pageToken?: string;
}

export const ListProjectsTopicsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    project: Schema.String.pipe(T.HttpPath("project")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({ method: "GET", path: "v1beta2/projects/{projectsId}/topics" }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsTopicsRequest>;

export type ListProjectsTopicsResponse = ListTopicsResponse;
export const ListProjectsTopicsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListTopicsResponse;

export type ListProjectsTopicsError = DefaultErrors;

/** Lists matching topics. */
export const listProjectsTopics: API.PaginatedOperationMethod<
  ListProjectsTopicsRequest,
  ListProjectsTopicsResponse,
  ListProjectsTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsTopicsRequest,
  output: ListProjectsTopicsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsTopicsRequest {
  /** Name of the topic to delete. */
  topic: string;
}

export const DeleteProjectsTopicsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    topic: Schema.String.pipe(T.HttpPath("topic")),
  }).pipe(
    T.Http({
      method: "DELETE",
      path: "v1beta2/projects/{projectsId}/topics/{topicsId}",
    }),
    svc,
  ) as unknown as Schema.Schema<DeleteProjectsTopicsRequest>;

export type DeleteProjectsTopicsResponse = Empty;
export const DeleteProjectsTopicsResponse = /*@__PURE__*/ /*#__PURE__*/ Empty;

export type DeleteProjectsTopicsError = DefaultErrors;

/** Deletes the topic with the given name. Returns `NOT_FOUND` if the topic does not exist. After a topic is deleted, a new topic may be created with the same name; this is an entirely new topic with none of the old configuration or subscriptions. Existing subscriptions to this topic are not deleted, but their `topic` field is set to `_deleted-topic_`. */
export const deleteProjectsTopics: API.OperationMethod<
  DeleteProjectsTopicsRequest,
  DeleteProjectsTopicsResponse,
  DeleteProjectsTopicsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.make(() => ({
  input: DeleteProjectsTopicsRequest,
  output: DeleteProjectsTopicsResponse,
  errors: [],
}));

export interface ListProjectsTopicsSubscriptionsRequest {
  /** The name of the topic that subscriptions are attached to. */
  topic: string;
  /** Maximum number of subscription names to return. */
  pageSize?: number;
  /** The value returned by the last `ListTopicSubscriptionsResponse`; indicates that this is a continuation of a prior `ListTopicSubscriptions` call, and that the system should return the next page of data. */
  pageToken?: string;
}

export const ListProjectsTopicsSubscriptionsRequest =
  /*@__PURE__*/ /*#__PURE__*/ Schema.Struct({
    topic: Schema.String.pipe(T.HttpPath("topic")),
    pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
    pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  }).pipe(
    T.Http({
      method: "GET",
      path: "v1beta2/projects/{projectsId}/topics/{topicsId}/subscriptions",
    }),
    svc,
  ) as unknown as Schema.Schema<ListProjectsTopicsSubscriptionsRequest>;

export type ListProjectsTopicsSubscriptionsResponse =
  ListTopicSubscriptionsResponse;
export const ListProjectsTopicsSubscriptionsResponse =
  /*@__PURE__*/ /*#__PURE__*/ ListTopicSubscriptionsResponse;

export type ListProjectsTopicsSubscriptionsError = DefaultErrors;

/** Lists the name of the subscriptions for this topic. */
export const listProjectsTopicsSubscriptions: API.PaginatedOperationMethod<
  ListProjectsTopicsSubscriptionsRequest,
  ListProjectsTopicsSubscriptionsResponse,
  ListProjectsTopicsSubscriptionsError,
  Credentials | HttpClient.HttpClient
> = /*@__PURE__*/ /*#__PURE__*/ API.makePaginated(() => ({
  input: ListProjectsTopicsSubscriptionsRequest,
  output: ListProjectsTopicsSubscriptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));
