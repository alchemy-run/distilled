// ==========================================================================
// Cloud Tasks API (cloudtasks v2)
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
  name: "cloudtasks",
  version: "v2",
  rootUrl: "https://cloudtasks.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(Location)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface AppEngineRouting {
  /** App service. By default, the task is sent to the service which is the default service when the task is attempted. For some queues or tasks which were created using the App Engine Task Queue API, host is not parsable into service, version, and instance. For example, some tasks which were created using the App Engine SDK use a custom domain name; custom domains are not parsed by Cloud Tasks. If host is not parsable, then service, version, and instance are the empty string. */
  service?: string;
  /** App version. By default, the task is sent to the version which is the default version when the task is attempted. For some queues or tasks which were created using the App Engine Task Queue API, host is not parsable into service, version, and instance. For example, some tasks which were created using the App Engine SDK use a custom domain name; custom domains are not parsed by Cloud Tasks. If host is not parsable, then service, version, and instance are the empty string. */
  version?: string;
  /** App instance. By default, the task is sent to an instance which is available when the task is attempted. Requests can only be sent to a specific instance if [manual scaling is used in App Engine Standard](https://cloud.google.com/appengine/docs/python/an-overview-of-app-engine?hl=en_US#scaling_types_and_instance_classes). App Engine Flex does not support instances. For more information, see [App Engine Standard request routing](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed) and [App Engine Flex request routing](https://cloud.google.com/appengine/docs/flexible/python/how-requests-are-routed). */
  instance?: string;
  /** Output only. The host that the task is sent to. The host is constructed from the domain name of the app associated with the queue's project ID (for example .appspot.com), and the service, version, and instance. Tasks which were created using the App Engine SDK might have a custom domain name. For more information, see [How Requests are Routed](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed). */
  host?: string;
}

export const AppEngineRouting: Schema.Schema<AppEngineRouting> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  instance: Schema.optional(Schema.String),
  host: Schema.optional(Schema.String),
})).annotate({ identifier: "AppEngineRouting" }) as any as Schema.Schema<AppEngineRouting>;

export interface PathOverride {
  /** The URI path (e.g., /users/1234). Default is an empty string. */
  path?: string;
}

export const PathOverride: Schema.Schema<PathOverride> = Schema.suspend(() => Schema.Struct({
  path: Schema.optional(Schema.String),
})).annotate({ identifier: "PathOverride" }) as any as Schema.Schema<PathOverride>;

export interface QueryOverride {
  /** The query parameters (e.g., qparam1=123&qparam2=456). Default is an empty string. */
  queryParams?: string;
}

export const QueryOverride: Schema.Schema<QueryOverride> = Schema.suspend(() => Schema.Struct({
  queryParams: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryOverride" }) as any as Schema.Schema<QueryOverride>;

export interface UriOverride {
  /** Scheme override. When specified, the task URI scheme is replaced by the provided value (HTTP or HTTPS). */
  scheme?: "SCHEME_UNSPECIFIED" | "HTTP" | "HTTPS" | (string & {});
  /** Host override. When specified, replaces the host part of the task URL. For example, if the task URL is "https://www.google.com," and host value is set to "example.net", the overridden URI will be changed to "https://example.net." Host value cannot be an empty string (INVALID_ARGUMENT). */
  host?: string;
  /** Port override. When specified, replaces the port part of the task URI. For instance, for a URI "https://www.example.com/example" and port=123, the overridden URI becomes "https://www.example.com:123/example". Note that the port value must be a positive integer. Setting the port to 0 (Zero) clears the URI port. */
  port?: string;
  /** URI path. When specified, replaces the existing path of the task URL. Setting the path value to an empty string clears the URI path segment. */
  pathOverride?: PathOverride;
  /** URI query. When specified, replaces the query part of the task URI. Setting the query value to an empty string clears the URI query segment. */
  queryOverride?: QueryOverride;
  /** URI Override Enforce Mode When specified, determines the Target UriOverride mode. If not specified, it defaults to ALWAYS. */
  uriOverrideEnforceMode?: "URI_OVERRIDE_ENFORCE_MODE_UNSPECIFIED" | "IF_NOT_EXISTS" | "ALWAYS" | (string & {});
}

export const UriOverride: Schema.Schema<UriOverride> = Schema.suspend(() => Schema.Struct({
  scheme: Schema.optional(Schema.String),
  host: Schema.optional(Schema.String),
  port: Schema.optional(Schema.String),
  pathOverride: Schema.optional(PathOverride),
  queryOverride: Schema.optional(QueryOverride),
  uriOverrideEnforceMode: Schema.optional(Schema.String),
})).annotate({ identifier: "UriOverride" }) as any as Schema.Schema<UriOverride>;

export interface Header {
  /** The Key of the header. */
  key?: string;
  /** The Value of the header. */
  value?: string;
}

export const Header: Schema.Schema<Header> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "Header" }) as any as Schema.Schema<Header>;

export interface HeaderOverride {
  /** Header embodying a key and a value. Do not put business sensitive or personally identifying data in the HTTP Header Override Configuration or other similar fields in accordance with Section 12 (Resource Fields) of the [Service Specific Terms](https://cloud.google.com/terms/service-terms). */
  header?: Header;
}

export const HeaderOverride: Schema.Schema<HeaderOverride> = Schema.suspend(() => Schema.Struct({
  header: Schema.optional(Header),
})).annotate({ identifier: "HeaderOverride" }) as any as Schema.Schema<HeaderOverride>;

export interface OAuthToken {
  /** [Service account email](https://cloud.google.com/iam/docs/service-accounts) to be used for generating OAuth token. The service account must be within the same project as the queue. The caller must have iam.serviceAccounts.actAs permission for the service account. */
  serviceAccountEmail?: string;
  /** OAuth scope to be used for generating OAuth access token. If not specified, "https://www.googleapis.com/auth/cloud-platform" will be used. */
  scope?: string;
}

export const OAuthToken: Schema.Schema<OAuthToken> = Schema.suspend(() => Schema.Struct({
  serviceAccountEmail: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
})).annotate({ identifier: "OAuthToken" }) as any as Schema.Schema<OAuthToken>;

export interface OidcToken {
  /** [Service account email](https://cloud.google.com/iam/docs/service-accounts) to be used for generating OIDC token. The service account must be within the same project as the queue. The caller must have iam.serviceAccounts.actAs permission for the service account. */
  serviceAccountEmail?: string;
  /** Audience to be used when generating OIDC token. If not specified, the URI specified in target will be used. */
  audience?: string;
}

export const OidcToken: Schema.Schema<OidcToken> = Schema.suspend(() => Schema.Struct({
  serviceAccountEmail: Schema.optional(Schema.String),
  audience: Schema.optional(Schema.String),
})).annotate({ identifier: "OidcToken" }) as any as Schema.Schema<OidcToken>;

export interface HttpTarget {
  /** URI override. When specified, overrides the execution URI for all the tasks in the queue. */
  uriOverride?: UriOverride;
  /** The HTTP method to use for the request. When specified, it overrides HttpRequest for the task. Note that if the value is set to HttpMethod the HttpRequest of the task will be ignored at execution time. */
  httpMethod?: "HTTP_METHOD_UNSPECIFIED" | "POST" | "GET" | "HEAD" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | (string & {});
  /** HTTP target headers. This map contains the header field names and values. Headers will be set when running the CreateTask and/or BufferTask. These headers represent a subset of the headers that will be configured for the task's HTTP request. Some HTTP request headers will be ignored or replaced. A partial list of headers that will be ignored or replaced is: * Several predefined headers, prefixed with "X-CloudTasks-", can be used to define properties of the task. * Host: This will be computed by Cloud Tasks and derived from HttpRequest.url. * Content-Length: This will be computed by Cloud Tasks. `Content-Type` won't be set by Cloud Tasks. You can explicitly set `Content-Type` to a media type when the task is created. For example,`Content-Type` can be set to `"application/octet-stream"` or `"application/json"`. The default value is set to "application/json"`. * User-Agent: This will be set to `"Google-Cloud-Tasks"`. Headers which can have multiple values (according to RFC2616) can be specified using comma-separated values. The size of the headers must be less than 80KB. Queue-level headers to override headers of all the tasks in the queue. Do not put business sensitive or personally identifying data in the HTTP Header Override Configuration or other similar fields in accordance with Section 12 (Resource Fields) of the [Service Specific Terms](https://cloud.google.com/terms/service-terms). */
  headerOverrides?: Array<HeaderOverride>;
  /** If specified, an [OAuth token](https://developers.google.com/identity/protocols/OAuth2) is generated and attached as the `Authorization` header in the HTTP request. This type of authorization should generally be used only when calling Google APIs hosted on *.googleapis.com. Note that both the service account email and the scope MUST be specified when using the queue-level authorization override. */
  oauthToken?: OAuthToken;
  /** If specified, an [OIDC](https://developers.google.com/identity/protocols/OpenIDConnect) token is generated and attached as an `Authorization` header in the HTTP request. This type of authorization can be used for many scenarios, including calling Cloud Run, or endpoints where you intend to validate the token yourself. Note that both the service account email and the audience MUST be specified when using the queue-level authorization override. */
  oidcToken?: OidcToken;
}

export const HttpTarget: Schema.Schema<HttpTarget> = Schema.suspend(() => Schema.Struct({
  uriOverride: Schema.optional(UriOverride),
  httpMethod: Schema.optional(Schema.String),
  headerOverrides: Schema.optional(Schema.Array(HeaderOverride)),
  oauthToken: Schema.optional(OAuthToken),
  oidcToken: Schema.optional(OidcToken),
})).annotate({ identifier: "HttpTarget" }) as any as Schema.Schema<HttpTarget>;

export interface RateLimits {
  /** The maximum rate at which tasks are dispatched from this queue. If unspecified when the queue is created, Cloud Tasks will pick the default. * The maximum allowed value is 500. This field has the same meaning as [rate in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#rate). */
  maxDispatchesPerSecond?: number;
  /** Output only. The max burst size. Max burst size limits how fast tasks in queue are processed when many tasks are in the queue and the rate is high. This field allows the queue to have a high rate so processing starts shortly after a task is enqueued, but still limits resource usage when many tasks are enqueued in a short period of time. The [token bucket](https://wikipedia.org/wiki/Token_Bucket) algorithm is used to control the rate of task dispatches. Each queue has a token bucket that holds tokens, up to the maximum specified by `max_burst_size`. Each time a task is dispatched, a token is removed from the bucket. Tasks will be dispatched until the queue's bucket runs out of tokens. The bucket will be continuously refilled with new tokens based on max_dispatches_per_second. Cloud Tasks will pick the value of `max_burst_size` based on the value of max_dispatches_per_second. For queues that were created or updated using `queue.yaml/xml`, `max_burst_size` is equal to [bucket_size](https://cloud.google.com/appengine/docs/standard/python/config/queueref#bucket_size). Since `max_burst_size` is output only, if UpdateQueue is called on a queue created by `queue.yaml/xml`, `max_burst_size` will be reset based on the value of max_dispatches_per_second, regardless of whether max_dispatches_per_second is updated. */
  maxBurstSize?: number;
  /** The maximum number of concurrent tasks that Cloud Tasks allows to be dispatched for this queue. After this threshold has been reached, Cloud Tasks stops dispatching tasks until the number of concurrent requests decreases. If unspecified when the queue is created, Cloud Tasks will pick the default. The maximum allowed value is 5,000. This field has the same meaning as [max_concurrent_requests in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#max_concurrent_requests). */
  maxConcurrentDispatches?: number;
}

export const RateLimits: Schema.Schema<RateLimits> = Schema.suspend(() => Schema.Struct({
  maxDispatchesPerSecond: Schema.optional(Schema.Number),
  maxBurstSize: Schema.optional(Schema.Number),
  maxConcurrentDispatches: Schema.optional(Schema.Number),
})).annotate({ identifier: "RateLimits" }) as any as Schema.Schema<RateLimits>;

export interface RetryConfig {
  /** Number of attempts per task. Cloud Tasks will attempt the task `max_attempts` times (that is, if the first attempt fails, then there will be `max_attempts - 1` retries). Must be >= -1. If unspecified when the queue is created, Cloud Tasks will pick the default. -1 indicates unlimited attempts. This field has the same meaning as [task_retry_limit in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters). Note: Cloud Tasks stops retrying only when `max_attempts` and `max_retry_duration` are both satisfied. When the task has been attempted `max_attempts` times and when the `max_retry_duration` time has passed, no further attempts are made, and the task is deleted. If you want your task to retry infinitely, you must set `max_attempts` to -1 and `max_retry_duration` to 0. */
  maxAttempts?: number;
  /** If positive, `max_retry_duration` specifies the time limit for retrying a failed task, measured from when the task was first attempted. Once `max_retry_duration` time has passed *and* the task has been attempted max_attempts times, no further attempts will be made and the task will be deleted. If zero, then the task age is unlimited. If unspecified when the queue is created, Cloud Tasks will pick the default. The value must be given as a string that indicates the length of time (in seconds) followed by `s` (for "seconds"). For the maximum possible value or the format, see the documentation for [Duration](https://protobuf.dev/reference/protobuf/google.protobuf/#duration). `max_retry_duration` will be truncated to the nearest second. This field has the same meaning as [task_age_limit in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters). */
  maxRetryDuration?: string;
  /** A task will be scheduled for retry between min_backoff and max_backoff duration after it fails, if the queue's RetryConfig specifies that the task should be retried. If unspecified when the queue is created, Cloud Tasks will pick the default. The value must be given as a string that indicates the length of time (in seconds) followed by `s` (for "seconds"). For more information on the format, see the documentation for [Duration](https://protobuf.dev/reference/protobuf/google.protobuf/#duration). `min_backoff` will be truncated to the nearest second. This field has the same meaning as [min_backoff_seconds in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters). */
  minBackoff?: string;
  /** A task will be scheduled for retry between min_backoff and max_backoff duration after it fails, if the queue's RetryConfig specifies that the task should be retried. If unspecified when the queue is created, Cloud Tasks will pick the default. The value must be given as a string that indicates the length of time (in seconds) followed by `s` (for "seconds"). For more information on the format, see the documentation for [Duration](https://protobuf.dev/reference/protobuf/google.protobuf/#duration). `max_backoff` will be truncated to the nearest second. This field has the same meaning as [max_backoff_seconds in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters). */
  maxBackoff?: string;
  /** The time between retries will double `max_doublings` times. A task's retry interval starts at min_backoff, then doubles `max_doublings` times, then increases linearly, and finally retries at intervals of max_backoff up to max_attempts times. For example, if min_backoff is 10s, max_backoff is 300s, and `max_doublings` is 3, then the a task will first be retried in 10s. The retry interval will double three times, and then increase linearly by 2^3 * 10s. Finally, the task will retry at intervals of max_backoff until the task has been attempted max_attempts times. Thus, the requests will retry at 10s, 20s, 40s, 80s, 160s, 240s, 300s, 300s, .... If unspecified when the queue is created, Cloud Tasks will pick the default. This field has the same meaning as [max_doublings in queue.yaml/xml](https://cloud.google.com/appengine/docs/standard/python/config/queueref#retry_parameters). */
  maxDoublings?: number;
}

export const RetryConfig: Schema.Schema<RetryConfig> = Schema.suspend(() => Schema.Struct({
  maxAttempts: Schema.optional(Schema.Number),
  maxRetryDuration: Schema.optional(Schema.String),
  minBackoff: Schema.optional(Schema.String),
  maxBackoff: Schema.optional(Schema.String),
  maxDoublings: Schema.optional(Schema.Number),
})).annotate({ identifier: "RetryConfig" }) as any as Schema.Schema<RetryConfig>;

export interface StackdriverLoggingConfig {
  /** Specifies the fraction of operations to write to [Stackdriver Logging](https://cloud.google.com/logging/docs/). This field may contain any value between 0.0 and 1.0, inclusive. 0.0 is the default and means that no operations are logged. */
  samplingRatio?: number;
}

export const StackdriverLoggingConfig: Schema.Schema<StackdriverLoggingConfig> = Schema.suspend(() => Schema.Struct({
  samplingRatio: Schema.optional(Schema.Number),
})).annotate({ identifier: "StackdriverLoggingConfig" }) as any as Schema.Schema<StackdriverLoggingConfig>;

export interface Queue {
  /** Caller-specified and required in CreateQueue, after which it becomes output only. The queue name. The queue name must have the following format: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID` * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]), hyphens (-), colons (:), or periods (.). For more information, see [Identifying projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects) * `LOCATION_ID` is the canonical ID for the queue's location. The list of available locations can be obtained by calling ListLocations. For more information, see https://cloud.google.com/about/locations/. * `QUEUE_ID` can contain letters ([A-Za-z]), numbers ([0-9]), or hyphens (-). The maximum length is 100 characters. */
  name?: string;
  /** Overrides for task-level app_engine_routing. These settings apply only to App Engine tasks in this queue. Http tasks are not affected. If set, `app_engine_routing_override` is used for all App Engine tasks in the queue, no matter what the setting is for the task-level app_engine_routing. */
  appEngineRoutingOverride?: AppEngineRouting;
  /** Modifies HTTP target for HTTP tasks. */
  httpTarget?: HttpTarget;
  /** Rate limits for task dispatches. rate_limits and retry_config are related because they both control task attempts. However they control task attempts in different ways: * rate_limits controls the total rate of dispatches from a queue (i.e. all traffic dispatched from the queue, regardless of whether the dispatch is from a first attempt or a retry). * retry_config controls what happens to particular a task after its first attempt fails. That is, retry_config controls task retries (the second attempt, third attempt, etc). The queue's actual dispatch rate is the result of: * Number of tasks in the queue * User-specified throttling: rate_limits, retry_config, and the queue's state. * System throttling due to `429` (Too Many Requests) or `503` (Service Unavailable) responses from the worker, high error rates, or to smooth sudden large traffic spikes. */
  rateLimits?: RateLimits;
  /** Settings that determine the retry behavior. * For tasks created using Cloud Tasks: the queue-level retry settings apply to all tasks in the queue that were created using Cloud Tasks. Retry settings cannot be set on individual tasks. * For tasks created using the App Engine SDK: the queue-level retry settings apply to all tasks in the queue which do not have retry settings explicitly set on the task and were created by the App Engine SDK. See [App Engine documentation](https://cloud.google.com/appengine/docs/standard/python/taskqueue/push/retrying-tasks). */
  retryConfig?: RetryConfig;
  /** Output only. The state of the queue. `state` can only be changed by calling PauseQueue, ResumeQueue, or uploading [queue.yaml/xml](https://cloud.google.com/appengine/docs/python/config/queueref). UpdateQueue cannot be used to change `state`. */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "PAUSED" | "DISABLED" | (string & {});
  /** Output only. The last time this queue was purged. All tasks that were created before this time were purged. A queue can be purged using PurgeQueue, the [App Engine Task Queue SDK, or the Cloud Console](https://cloud.google.com/appengine/docs/standard/python/taskqueue/push/deleting-tasks-and-queues#purging_all_tasks_from_a_queue). Purge time will be truncated to the nearest microsecond. Purge time will be unset if the queue has never been purged. */
  purgeTime?: string;
  /** Configuration options for writing logs to [Stackdriver Logging](https://cloud.google.com/logging/docs/). If this field is unset, then no logs are written. */
  stackdriverLoggingConfig?: StackdriverLoggingConfig;
}

export const Queue: Schema.Schema<Queue> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  appEngineRoutingOverride: Schema.optional(AppEngineRouting),
  httpTarget: Schema.optional(HttpTarget),
  rateLimits: Schema.optional(RateLimits),
  retryConfig: Schema.optional(RetryConfig),
  state: Schema.optional(Schema.String),
  purgeTime: Schema.optional(Schema.String),
  stackdriverLoggingConfig: Schema.optional(StackdriverLoggingConfig),
})).annotate({ identifier: "Queue" }) as any as Schema.Schema<Queue>;

export interface ListQueuesResponse {
  /** The list of queues. */
  queues?: Array<Queue>;
  /** A token to retrieve next page of results. To return the next page of results, call ListQueues with this value as the page_token. If the next_page_token is empty, there are no more results. The page token is valid for only 2 hours. */
  nextPageToken?: string;
}

export const ListQueuesResponse: Schema.Schema<ListQueuesResponse> = Schema.suspend(() => Schema.Struct({
  queues: Schema.optional(Schema.Array(Queue)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListQueuesResponse" }) as any as Schema.Schema<ListQueuesResponse>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface PurgeQueueRequest {
}

export const PurgeQueueRequest: Schema.Schema<PurgeQueueRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PurgeQueueRequest" }) as any as Schema.Schema<PurgeQueueRequest>;

export interface PauseQueueRequest {
}

export const PauseQueueRequest: Schema.Schema<PauseQueueRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PauseQueueRequest" }) as any as Schema.Schema<PauseQueueRequest>;

export interface ResumeQueueRequest {
}

export const ResumeQueueRequest: Schema.Schema<ResumeQueueRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResumeQueueRequest" }) as any as Schema.Schema<ResumeQueueRequest>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(() => Schema.Struct({
  requestedPolicyVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GetPolicyOptions" }) as any as Schema.Schema<GetPolicyOptions>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(GetPolicyOptions),
})).annotate({ identifier: "GetIamPolicyRequest" }) as any as Schema.Schema<GetIamPolicyRequest>;

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

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
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

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface AppEngineHttpRequest {
  /** The HTTP method to use for the request. The default is POST. The app's request handler for the task's target URL must be able to handle HTTP requests with this http_method, otherwise the task attempt fails with error code 405 (Method Not Allowed). See [Writing a push task request handler](https://cloud.google.com/appengine/docs/java/taskqueue/push/creating-handlers#writing_a_push_task_request_handler) and the App Engine documentation for your runtime on [How Requests are Handled](https://cloud.google.com/appengine/docs/standard/python3/how-requests-are-handled). */
  httpMethod?: "HTTP_METHOD_UNSPECIFIED" | "POST" | "GET" | "HEAD" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | (string & {});
  /** Task-level setting for App Engine routing. * If app_engine_routing_override is set on the queue, this value is used for all tasks in the queue, no matter what the setting is for the task-level app_engine_routing. */
  appEngineRouting?: AppEngineRouting;
  /** The relative URI. The relative URI must begin with "/" and must be a valid HTTP relative URI. It can contain a path and query string arguments. If the relative URI is empty, then the root path "/" will be used. No spaces are allowed, and the maximum length allowed is 2083 characters. */
  relativeUri?: string;
  /** HTTP request headers. This map contains the header field names and values. Headers can be set when the task is created. Repeated headers are not supported but a header value can contain commas. Cloud Tasks sets some headers to default values: * `User-Agent`: By default, this header is `"AppEngine-Google; (+http://code.google.com/appengine)"`. This header can be modified, but Cloud Tasks will append `"AppEngine-Google; (+http://code.google.com/appengine)"` to the modified `User-Agent`. If the task has a body, Cloud Tasks sets the following headers: * `Content-Type`: By default, the `Content-Type` header is set to `"application/octet-stream"`. The default can be overridden by explicitly setting `Content-Type` to a particular media type when the task is created. For example, `Content-Type` can be set to `"application/json"`. * `Content-Length`: This is computed by Cloud Tasks. This value is output only. It cannot be changed. The headers below cannot be set or overridden: * `Host` * `X-Google-*` * `X-AppEngine-*` In addition, Cloud Tasks sets some headers when the task is dispatched, such as headers containing information about the task; see [request headers](https://cloud.google.com/tasks/docs/creating-appengine-handlers#reading_request_headers). These headers are set only when the task is dispatched, so they are not visible when the task is returned in a Cloud Tasks response. Although there is no specific limit for the maximum number of headers or the size, there is a limit on the maximum size of the Task. For more information, see the CreateTask documentation. */
  headers?: Record<string, string>;
  /** HTTP request body. A request body is allowed only if the HTTP method is POST or PUT. It is an error to set a body on a task with an incompatible HttpMethod. */
  body?: string;
}

export const AppEngineHttpRequest: Schema.Schema<AppEngineHttpRequest> = Schema.suspend(() => Schema.Struct({
  httpMethod: Schema.optional(Schema.String),
  appEngineRouting: Schema.optional(AppEngineRouting),
  relativeUri: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  body: Schema.optional(Schema.String),
})).annotate({ identifier: "AppEngineHttpRequest" }) as any as Schema.Schema<AppEngineHttpRequest>;

export interface HttpRequest {
  /** Required. The full url path that the request will be sent to. This string must begin with either "http://" or "https://". Some examples are: `http://acme.com` and `https://acme.com/sales:8080`. Cloud Tasks will encode some characters for safety and compatibility. The maximum allowed URL length is 2083 characters after encoding. The `Location` header response from a redirect response [`300` - `399`] may be followed. The redirect is not counted as a separate attempt. */
  url?: string;
  /** The HTTP method to use for the request. The default is POST. */
  httpMethod?: "HTTP_METHOD_UNSPECIFIED" | "POST" | "GET" | "HEAD" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | (string & {});
  /** HTTP request headers. This map contains the header field names and values. Headers can be set when the task is created. These headers represent a subset of the headers that will accompany the task's HTTP request. Some HTTP request headers will be ignored or replaced. A partial list of headers that will be ignored or replaced is: * Host: This will be computed by Cloud Tasks and derived from HttpRequest.url. * Content-Length: This will be computed by Cloud Tasks. * User-Agent: This will be set to `"Google-Cloud-Tasks"`. * `X-Google-*`: Google use only. * `X-AppEngine-*`: Google use only. `Content-Type` won't be set by Cloud Tasks. You can explicitly set `Content-Type` to a media type when the task is created. For example, `Content-Type` can be set to `"application/octet-stream"` or `"application/json"`. Headers which can have multiple values (according to RFC2616) can be specified using comma-separated values. The size of the headers must be less than 80KB. */
  headers?: Record<string, string>;
  /** HTTP request body. A request body is allowed only if the HTTP method is POST, PUT, or PATCH. It is an error to set body on a task with an incompatible HttpMethod. */
  body?: string;
  /** If specified, an [OAuth token](https://developers.google.com/identity/protocols/OAuth2) will be generated and attached as an `Authorization` header in the HTTP request. This type of authorization should generally only be used when calling Google APIs hosted on *.googleapis.com. */
  oauthToken?: OAuthToken;
  /** If specified, an [OIDC](https://developers.google.com/identity/protocols/OpenIDConnect) token will be generated and attached as an `Authorization` header in the HTTP request. This type of authorization can be used for many scenarios, including calling Cloud Run, or endpoints where you intend to validate the token yourself. */
  oidcToken?: OidcToken;
}

export const HttpRequest: Schema.Schema<HttpRequest> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
  httpMethod: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  body: Schema.optional(Schema.String),
  oauthToken: Schema.optional(OAuthToken),
  oidcToken: Schema.optional(OidcToken),
})).annotate({ identifier: "HttpRequest" }) as any as Schema.Schema<HttpRequest>;

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

export interface Attempt {
  /** Output only. The time that this attempt was scheduled. `schedule_time` will be truncated to the nearest microsecond. */
  scheduleTime?: string;
  /** Output only. The time that this attempt was dispatched. `dispatch_time` will be truncated to the nearest microsecond. */
  dispatchTime?: string;
  /** Output only. The time that this attempt response was received. `response_time` will be truncated to the nearest microsecond. */
  responseTime?: string;
  /** Output only. The response from the worker for this attempt. If `response_time` is unset, then the task has not been attempted or is currently running and the `response_status` field is meaningless. */
  responseStatus?: Status;
}

export const Attempt: Schema.Schema<Attempt> = Schema.suspend(() => Schema.Struct({
  scheduleTime: Schema.optional(Schema.String),
  dispatchTime: Schema.optional(Schema.String),
  responseTime: Schema.optional(Schema.String),
  responseStatus: Schema.optional(Status),
})).annotate({ identifier: "Attempt" }) as any as Schema.Schema<Attempt>;

export interface Task {
  /** Optionally caller-specified in CreateTask. The task name. The task name must have the following format: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID` * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]), hyphens (-), colons (:), or periods (.). For more information, see [Identifying projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects) * `LOCATION_ID` is the canonical ID for the task's location. The list of available locations can be obtained by calling ListLocations. For more information, see https://cloud.google.com/about/locations/. * `QUEUE_ID` can contain letters ([A-Za-z]), numbers ([0-9]), or hyphens (-). The maximum length is 100 characters. * `TASK_ID` can contain only letters ([A-Za-z]), numbers ([0-9]), hyphens (-), or underscores (_). The maximum length is 500 characters. */
  name?: string;
  /** HTTP request that is sent to the App Engine app handler. An App Engine task is a task that has AppEngineHttpRequest set. */
  appEngineHttpRequest?: AppEngineHttpRequest;
  /** HTTP request that is sent to the worker. An HTTP task is a task that has HttpRequest set. */
  httpRequest?: HttpRequest;
  /** The time when the task is scheduled to be attempted or retried. `schedule_time` will be truncated to the nearest microsecond. */
  scheduleTime?: string;
  /** Output only. The time that the task was created. `create_time` will be truncated to the nearest second. */
  createTime?: string;
  /** The deadline for requests sent to the worker. If the worker does not respond by this deadline then the request is cancelled and the attempt is marked as a `DEADLINE_EXCEEDED` failure. Cloud Tasks will retry the task according to the RetryConfig. Note that when the request is cancelled, Cloud Tasks will stop listening for the response, but whether the worker stops processing depends on the worker. For example, if the worker is stuck, it may not react to cancelled requests. The default and maximum values depend on the type of request: * For HTTP tasks, the default is 10 minutes. The deadline must be in the interval [15 seconds, 30 minutes]. * For App Engine tasks, 0 indicates that the request has the default deadline. The default deadline depends on the [scaling type](https://cloud.google.com/appengine/docs/standard/go/how-instances-are-managed#instance_scaling) of the service: 10 minutes for standard apps with automatic scaling, 24 hours for standard apps with manual and basic scaling, and 60 minutes for flex apps. If the request deadline is set, it must be in the interval [15 seconds, 24 hours 15 seconds]. Regardless of the task's `dispatch_deadline`, the app handler will not run for longer than than the service's timeout. We recommend setting the `dispatch_deadline` to at most a few seconds more than the app handler's timeout. For more information see [Timeouts](https://cloud.google.com/tasks/docs/creating-appengine-handlers#timeouts). The value must be given as a string that indicates the length of time (in seconds) followed by `s` (for "seconds"). For more information on the format, see the documentation for [Duration](https://protobuf.dev/reference/protobuf/google.protobuf/#duration). `dispatch_deadline` will be truncated to the nearest millisecond. The deadline is an approximate deadline. */
  dispatchDeadline?: string;
  /** Output only. The number of attempts dispatched. This count includes attempts which have been dispatched but haven't received a response. */
  dispatchCount?: number;
  /** Output only. The number of attempts which have received a response. */
  responseCount?: number;
  /** Output only. The status of the task's first attempt. Only dispatch_time will be set. The other Attempt information is not retained by Cloud Tasks. */
  firstAttempt?: Attempt;
  /** Output only. The status of the task's last attempt. */
  lastAttempt?: Attempt;
  /** Output only. The view specifies which subset of the Task has been returned. */
  view?: "VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const Task: Schema.Schema<Task> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  appEngineHttpRequest: Schema.optional(AppEngineHttpRequest),
  httpRequest: Schema.optional(HttpRequest),
  scheduleTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  dispatchDeadline: Schema.optional(Schema.String),
  dispatchCount: Schema.optional(Schema.Number),
  responseCount: Schema.optional(Schema.Number),
  firstAttempt: Schema.optional(Attempt),
  lastAttempt: Schema.optional(Attempt),
  view: Schema.optional(Schema.String),
})).annotate({ identifier: "Task" }) as any as Schema.Schema<Task>;

export interface ListTasksResponse {
  /** The list of tasks. */
  tasks?: Array<Task>;
  /** A token to retrieve next page of results. To return the next page of results, call ListTasks with this value as the page_token. If the next_page_token is empty, there are no more results. */
  nextPageToken?: string;
}

export const ListTasksResponse: Schema.Schema<ListTasksResponse> = Schema.suspend(() => Schema.Struct({
  tasks: Schema.optional(Schema.Array(Task)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTasksResponse" }) as any as Schema.Schema<ListTasksResponse>;

export interface CreateTaskRequest {
  /** Required. The task to add. Task names have the following format: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID`. The user can optionally specify a task name. If a name is not specified then the system will generate a random unique task id, which will be set in the task returned in the response. If schedule_time is not set or is in the past then Cloud Tasks will set it to the current time. Task De-duplication: Explicitly specifying a task ID enables task de-duplication. If a task's ID is identical to that of an existing task or a task that was deleted or executed recently then the call will fail with ALREADY_EXISTS. The IDs of deleted tasks are not immediately available for reuse. It can take up to 24 hours (or 9 days if the task's queue was created using a queue.yaml or queue.xml) for the task ID to be released and made available again. Because there is an extra lookup cost to identify duplicate task names, these CreateTask calls have significantly increased latency. Using hashed strings for the task id or for the prefix of the task id is recommended. Choosing task ids that are sequential or have sequential prefixes, for example using a timestamp, causes an increase in latency and error rates in all task commands. The infrastructure relies on an approximately uniform distribution of task ids to store and serve tasks efficiently. */
  task?: Task;
  /** The response_view specifies which subset of the Task will be returned. By default response_view is BASIC; not all information is retrieved by default because some data, such as payloads, might be desirable to return only when needed because of its large size or because of the sensitivity of data that it contains. Authorization for FULL requires `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/) permission on the Task resource. */
  responseView?: "VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const CreateTaskRequest: Schema.Schema<CreateTaskRequest> = Schema.suspend(() => Schema.Struct({
  task: Schema.optional(Task),
  responseView: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateTaskRequest" }) as any as Schema.Schema<CreateTaskRequest>;

export interface RunTaskRequest {
  /** The response_view specifies which subset of the Task will be returned. By default response_view is BASIC; not all information is retrieved by default because some data, such as payloads, might be desirable to return only when needed because of its large size or because of the sensitivity of data that it contains. Authorization for FULL requires `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/) permission on the Task resource. */
  responseView?: "VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const RunTaskRequest: Schema.Schema<RunTaskRequest> = Schema.suspend(() => Schema.Struct({
  responseView: Schema.optional(Schema.String),
})).annotate({ identifier: "RunTaskRequest" }) as any as Schema.Schema<RunTaskRequest>;

export interface CmekConfig {
  /** Output only. The config resource name which includes the project and location and must end in 'cmekConfig', in the format projects/PROJECT_ID/locations/LOCATION_ID/cmekConfig` */
  name?: string;
  /** Resource name of the Cloud KMS key, of the form `projects/PROJECT_ID/locations/LOCATION_ID/keyRings/KEY_RING_ID/cryptoKeys/KEY_ID`, that will be used to encrypt the Queues & Tasks in the region. Setting this as blank will turn off CMEK encryption. */
  kmsKey?: string;
}

export const CmekConfig: Schema.Schema<CmekConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  kmsKey: Schema.optional(Schema.String),
})).annotate({ identifier: "CmekConfig" }) as any as Schema.Schema<CmekConfig>;

export interface HttpBody {
  /** The HTTP Content-Type header value specifying the content type of the body. */
  contentType?: string;
  /** The HTTP request/response body as raw binary. */
  data?: string;
  /** Application specific response metadata. Must be set in the first response for streaming APIs. */
  extensions?: Array<Record<string, unknown>>;
}

export const HttpBody: Schema.Schema<HttpBody> = Schema.suspend(() => Schema.Struct({
  contentType: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
  extensions: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "HttpBody" }) as any as Schema.Schema<HttpBody>;

export interface BufferTaskRequest {
  /** Optional. Body of the HTTP request. The body can take any generic value. The value is written to the HttpRequest of the [Task]. */
  body?: HttpBody;
}

export const BufferTaskRequest: Schema.Schema<BufferTaskRequest> = Schema.suspend(() => Schema.Struct({
  body: Schema.optional(HttpBody),
})).annotate({ identifier: "BufferTaskRequest" }) as any as Schema.Schema<BufferTaskRequest>;

export interface BufferTaskResponse {
  /** The created task. */
  task?: Task;
}

export const BufferTaskResponse: Schema.Schema<BufferTaskResponse> = Schema.suspend(() => Schema.Struct({
  task: Schema.optional(Task),
})).annotate({ identifier: "BufferTaskResponse" }) as any as Schema.Schema<BufferTaskResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = ListLocationsResponse;
export const ListProjectsLocationsResponse = ListLocationsResponse;

export type ListProjectsLocationsError = CommonErrors;

export const listProjectsLocations = API.makePaginated(() => ({
  input: ListProjectsLocationsRequest,
  output: ListProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about a location. */
export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsRequest>;

export type GetProjectsLocationsResponse = Location;
export const GetProjectsLocationsResponse = Location;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** Creates or Updates a CMEK config. Updates the Customer Managed Encryption Key assotiated with the Cloud Tasks location (Creates if the key does not already exist). All new tasks created in the location will be encrypted at-rest with the KMS-key provided in the config. */
export interface UpdateCmekConfigProjectsLocationsRequest {
  /** Output only. The config resource name which includes the project and location and must end in 'cmekConfig', in the format projects/PROJECT_ID/locations/LOCATION_ID/cmekConfig` */
  name: string;
  /** List of fields to be updated in this request. */
  updateMask?: string;
  /** Request body */
  body?: CmekConfig;
}

export const UpdateCmekConfigProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(CmekConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/cmekConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCmekConfigProjectsLocationsRequest>;

export type UpdateCmekConfigProjectsLocationsResponse = CmekConfig;
export const UpdateCmekConfigProjectsLocationsResponse = CmekConfig;

export type UpdateCmekConfigProjectsLocationsError = CommonErrors;

export const updateCmekConfigProjectsLocations: API.OperationMethod<UpdateCmekConfigProjectsLocationsRequest, UpdateCmekConfigProjectsLocationsResponse, UpdateCmekConfigProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCmekConfigProjectsLocationsRequest,
  output: UpdateCmekConfigProjectsLocationsResponse,
  errors: [],
}));

/** Gets the CMEK config. Gets the Customer Managed Encryption Key configured with the Cloud Tasks lcoation. By default there is no kms_key configured. */
export interface GetCmekConfigProjectsLocationsRequest {
  /** Required. The config. For example: projects/PROJECT_ID/locations/LOCATION_ID/CmekConfig` */
  name: string;
}

export const GetCmekConfigProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/cmekConfig" }),
  svc,
) as unknown as Schema.Schema<GetCmekConfigProjectsLocationsRequest>;

export type GetCmekConfigProjectsLocationsResponse = CmekConfig;
export const GetCmekConfigProjectsLocationsResponse = CmekConfig;

export type GetCmekConfigProjectsLocationsError = CommonErrors;

export const getCmekConfigProjectsLocations: API.OperationMethod<GetCmekConfigProjectsLocationsRequest, GetCmekConfigProjectsLocationsResponse, GetCmekConfigProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCmekConfigProjectsLocationsRequest,
  output: GetCmekConfigProjectsLocationsResponse,
  errors: [],
}));

/** Lists queues. Queues are returned in lexicographical order. */
export interface ListProjectsLocationsQueuesRequest {
  /** Required. The location name. For example: `projects/PROJECT_ID/locations/LOCATION_ID` */
  parent: string;
  /** `filter` can be used to specify a subset of queues. Any Queue field can be used as a filter and several operators as supported. For example: `<=, <, >=, >, !=, =, :`. The filter syntax is the same as described in [Stackdriver's Advanced Logs Filters](https://cloud.google.com/logging/docs/view/advanced_filters). Sample filter "state: PAUSED". Note that using filters might cause fewer queues than the requested page_size to be returned. */
  filter?: string;
  /** Requested page size. The maximum page size is 9800. If unspecified, the page size will be the maximum. Fewer queues than requested might be returned, even if more queues exist; use the next_page_token in the response to determine if more queues exist. */
  pageSize?: number;
  /** A token identifying the page of results to return. To request the first page results, page_token must be empty. To request the next page of results, page_token must be the value of next_page_token returned from the previous call to ListQueues method. It is an error to switch the value of the filter while iterating through pages. */
  pageToken?: string;
}

export const ListProjectsLocationsQueuesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/queues" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsQueuesRequest>;

export type ListProjectsLocationsQueuesResponse = ListQueuesResponse;
export const ListProjectsLocationsQueuesResponse = ListQueuesResponse;

export type ListProjectsLocationsQueuesError = CommonErrors;

export const listProjectsLocationsQueues = API.makePaginated(() => ({
  input: ListProjectsLocationsQueuesRequest,
  output: ListProjectsLocationsQueuesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a queue. */
export interface GetProjectsLocationsQueuesRequest {
  /** Required. The resource name of the queue. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID` */
  name: string;
}

export const GetProjectsLocationsQueuesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/queues/{queuesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsQueuesRequest>;

export type GetProjectsLocationsQueuesResponse = Queue;
export const GetProjectsLocationsQueuesResponse = Queue;

export type GetProjectsLocationsQueuesError = CommonErrors;

export const getProjectsLocationsQueues: API.OperationMethod<GetProjectsLocationsQueuesRequest, GetProjectsLocationsQueuesResponse, GetProjectsLocationsQueuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsQueuesRequest,
  output: GetProjectsLocationsQueuesResponse,
  errors: [],
}));

/** Creates a queue. Queues created with this method allow tasks to live for a maximum of 31 days. After a task is 31 days old, the task will be deleted regardless of whether it was dispatched or not. WARNING: Using this method may have unintended side effects if you are using an App Engine `queue.yaml` or `queue.xml` file to manage your queues. Read [Overview of Queue Management and queue.yaml](https://cloud.google.com/tasks/docs/queue-yaml) before using this method. */
export interface CreateProjectsLocationsQueuesRequest {
  /** Required. The location name in which the queue will be created. For example: `projects/PROJECT_ID/locations/LOCATION_ID` The list of allowed locations can be obtained by calling Cloud Tasks' implementation of ListLocations. */
  parent: string;
  /** Request body */
  body?: Queue;
}

export const CreateProjectsLocationsQueuesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Queue).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/queues", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsQueuesRequest>;

export type CreateProjectsLocationsQueuesResponse = Queue;
export const CreateProjectsLocationsQueuesResponse = Queue;

export type CreateProjectsLocationsQueuesError = CommonErrors;

export const createProjectsLocationsQueues: API.OperationMethod<CreateProjectsLocationsQueuesRequest, CreateProjectsLocationsQueuesResponse, CreateProjectsLocationsQueuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsQueuesRequest,
  output: CreateProjectsLocationsQueuesResponse,
  errors: [],
}));

/** Updates a queue. This method creates the queue if it does not exist and updates the queue if it does exist. Queues created with this method allow tasks to live for a maximum of 31 days. After a task is 31 days old, the task will be deleted regardless of whether it was dispatched or not. WARNING: Using this method may have unintended side effects if you are using an App Engine `queue.yaml` or `queue.xml` file to manage your queues. Read [Overview of Queue Management and queue.yaml](https://cloud.google.com/tasks/docs/queue-yaml) before using this method. */
export interface PatchProjectsLocationsQueuesRequest {
  /** Caller-specified and required in CreateQueue, after which it becomes output only. The queue name. The queue name must have the following format: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID` * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]), hyphens (-), colons (:), or periods (.). For more information, see [Identifying projects](https://cloud.google.com/resource-manager/docs/creating-managing-projects#identifying_projects) * `LOCATION_ID` is the canonical ID for the queue's location. The list of available locations can be obtained by calling ListLocations. For more information, see https://cloud.google.com/about/locations/. * `QUEUE_ID` can contain letters ([A-Za-z]), numbers ([0-9]), or hyphens (-). The maximum length is 100 characters. */
  name: string;
  /** A mask used to specify which fields of the queue are being updated. If empty, then all fields will be updated. */
  updateMask?: string;
  /** Request body */
  body?: Queue;
}

export const PatchProjectsLocationsQueuesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Queue).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/queues/{queuesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsQueuesRequest>;

export type PatchProjectsLocationsQueuesResponse = Queue;
export const PatchProjectsLocationsQueuesResponse = Queue;

export type PatchProjectsLocationsQueuesError = CommonErrors;

export const patchProjectsLocationsQueues: API.OperationMethod<PatchProjectsLocationsQueuesRequest, PatchProjectsLocationsQueuesResponse, PatchProjectsLocationsQueuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsQueuesRequest,
  output: PatchProjectsLocationsQueuesResponse,
  errors: [],
}));

/** Deletes a queue. This command will delete the queue even if it has tasks in it. Note: If you delete a queue, you may be prevented from creating a new queue with the same name as the deleted queue for a tombstone window of up to 3 days. During this window, the CreateQueue operation may appear to recreate the queue, but this can be misleading. If you attempt to create a queue with the same name as one that is in the tombstone window, run GetQueue to confirm that the queue creation was successful. If GetQueue returns 200 response code, your queue was successfully created with the name of the previously deleted queue. Otherwise, your queue did not successfully recreate. WARNING: Using this method may have unintended side effects if you are using an App Engine `queue.yaml` or `queue.xml` file to manage your queues. Read [Overview of Queue Management and queue.yaml](https://cloud.google.com/tasks/docs/queue-yaml) before using this method. */
export interface DeleteProjectsLocationsQueuesRequest {
  /** Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID` */
  name: string;
}

export const DeleteProjectsLocationsQueuesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/queues/{queuesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsQueuesRequest>;

export type DeleteProjectsLocationsQueuesResponse = Empty;
export const DeleteProjectsLocationsQueuesResponse = Empty;

export type DeleteProjectsLocationsQueuesError = CommonErrors;

export const deleteProjectsLocationsQueues: API.OperationMethod<DeleteProjectsLocationsQueuesRequest, DeleteProjectsLocationsQueuesResponse, DeleteProjectsLocationsQueuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsQueuesRequest,
  output: DeleteProjectsLocationsQueuesResponse,
  errors: [],
}));

/** Purges a queue by deleting all of its tasks. All tasks created before this method is called are permanently deleted. Purge operations can take up to one minute to take effect. Tasks might be dispatched before the purge takes effect. A purge is irreversible. */
export interface PurgeProjectsLocationsQueuesRequest {
  /** Required. The queue name. For example: `projects/PROJECT_ID/location/LOCATION_ID/queues/QUEUE_ID` */
  name: string;
  /** Request body */
  body?: PurgeQueueRequest;
}

export const PurgeProjectsLocationsQueuesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PurgeQueueRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/queues/{queuesId}:purge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PurgeProjectsLocationsQueuesRequest>;

export type PurgeProjectsLocationsQueuesResponse = Queue;
export const PurgeProjectsLocationsQueuesResponse = Queue;

export type PurgeProjectsLocationsQueuesError = CommonErrors;

export const purgeProjectsLocationsQueues: API.OperationMethod<PurgeProjectsLocationsQueuesRequest, PurgeProjectsLocationsQueuesResponse, PurgeProjectsLocationsQueuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PurgeProjectsLocationsQueuesRequest,
  output: PurgeProjectsLocationsQueuesResponse,
  errors: [],
}));

/** Pauses the queue. If a queue is paused then the system will stop dispatching tasks until the queue is resumed via ResumeQueue. Tasks can still be added when the queue is paused. A queue is paused if its state is PAUSED. */
export interface PauseProjectsLocationsQueuesRequest {
  /** Required. The queue name. For example: `projects/PROJECT_ID/location/LOCATION_ID/queues/QUEUE_ID` */
  name: string;
  /** Request body */
  body?: PauseQueueRequest;
}

export const PauseProjectsLocationsQueuesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PauseQueueRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/queues/{queuesId}:pause", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PauseProjectsLocationsQueuesRequest>;

export type PauseProjectsLocationsQueuesResponse = Queue;
export const PauseProjectsLocationsQueuesResponse = Queue;

export type PauseProjectsLocationsQueuesError = CommonErrors;

export const pauseProjectsLocationsQueues: API.OperationMethod<PauseProjectsLocationsQueuesRequest, PauseProjectsLocationsQueuesResponse, PauseProjectsLocationsQueuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PauseProjectsLocationsQueuesRequest,
  output: PauseProjectsLocationsQueuesResponse,
  errors: [],
}));

/** Resume a queue. This method resumes a queue after it has been PAUSED or DISABLED. The state of a queue is stored in the queue's state; after calling this method it will be set to RUNNING. WARNING: Resuming many high-QPS queues at the same time can lead to target overloading. If you are resuming high-QPS queues, follow the 500/50/5 pattern described in [Managing Cloud Tasks Scaling Risks](https://cloud.google.com/tasks/docs/manage-cloud-task-scaling). */
export interface ResumeProjectsLocationsQueuesRequest {
  /** Required. The queue name. For example: `projects/PROJECT_ID/location/LOCATION_ID/queues/QUEUE_ID` */
  name: string;
  /** Request body */
  body?: ResumeQueueRequest;
}

export const ResumeProjectsLocationsQueuesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResumeQueueRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/queues/{queuesId}:resume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResumeProjectsLocationsQueuesRequest>;

export type ResumeProjectsLocationsQueuesResponse = Queue;
export const ResumeProjectsLocationsQueuesResponse = Queue;

export type ResumeProjectsLocationsQueuesError = CommonErrors;

export const resumeProjectsLocationsQueues: API.OperationMethod<ResumeProjectsLocationsQueuesRequest, ResumeProjectsLocationsQueuesResponse, ResumeProjectsLocationsQueuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResumeProjectsLocationsQueuesRequest,
  output: ResumeProjectsLocationsQueuesResponse,
  errors: [],
}));

/** Gets the access control policy for a Queue. Returns an empty policy if the resource exists and does not have a policy set. Authorization requires the following [Google IAM](https://cloud.google.com/iam) permission on the specified resource parent: * `cloudtasks.queues.getIamPolicy` */
export interface GetIamPolicyProjectsLocationsQueuesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsQueuesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/queues/{queuesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsQueuesRequest>;

export type GetIamPolicyProjectsLocationsQueuesResponse = Policy;
export const GetIamPolicyProjectsLocationsQueuesResponse = Policy;

export type GetIamPolicyProjectsLocationsQueuesError = CommonErrors;

export const getIamPolicyProjectsLocationsQueues: API.OperationMethod<GetIamPolicyProjectsLocationsQueuesRequest, GetIamPolicyProjectsLocationsQueuesResponse, GetIamPolicyProjectsLocationsQueuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsQueuesRequest,
  output: GetIamPolicyProjectsLocationsQueuesResponse,
  errors: [],
}));

/** Sets the access control policy for a Queue. Replaces any existing policy. Note: The Cloud Console does not check queue-level IAM permissions yet. Project-level permissions are required to use the Cloud Console. Authorization requires the following [Google IAM](https://cloud.google.com/iam) permission on the specified resource parent: * `cloudtasks.queues.setIamPolicy` */
export interface SetIamPolicyProjectsLocationsQueuesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsQueuesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/queues/{queuesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsQueuesRequest>;

export type SetIamPolicyProjectsLocationsQueuesResponse = Policy;
export const SetIamPolicyProjectsLocationsQueuesResponse = Policy;

export type SetIamPolicyProjectsLocationsQueuesError = CommonErrors;

export const setIamPolicyProjectsLocationsQueues: API.OperationMethod<SetIamPolicyProjectsLocationsQueuesRequest, SetIamPolicyProjectsLocationsQueuesResponse, SetIamPolicyProjectsLocationsQueuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsQueuesRequest,
  output: SetIamPolicyProjectsLocationsQueuesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on a Queue. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsQueuesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsQueuesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/queues/{queuesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsQueuesRequest>;

export type TestIamPermissionsProjectsLocationsQueuesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsQueuesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsQueuesError = CommonErrors;

export const testIamPermissionsProjectsLocationsQueues: API.OperationMethod<TestIamPermissionsProjectsLocationsQueuesRequest, TestIamPermissionsProjectsLocationsQueuesResponse, TestIamPermissionsProjectsLocationsQueuesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsQueuesRequest,
  output: TestIamPermissionsProjectsLocationsQueuesResponse,
  errors: [],
}));

/** Lists the tasks in a queue. By default, only the BASIC view is retrieved due to performance considerations; response_view controls the subset of information which is returned. The tasks may be returned in any order. The ordering may change at any time. */
export interface ListProjectsLocationsQueuesTasksRequest {
  /** Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID` */
  parent: string;
  /** The response_view specifies which subset of the Task will be returned. By default response_view is BASIC; not all information is retrieved by default because some data, such as payloads, might be desirable to return only when needed because of its large size or because of the sensitivity of data that it contains. Authorization for FULL requires `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/) permission on the Task resource. */
  responseView?: "VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Maximum page size. Fewer tasks than requested might be returned, even if more tasks exist; use next_page_token in the response to determine if more tasks exist. The maximum page size is 1000. If unspecified, the page size will be the maximum. */
  pageSize?: number;
  /** A token identifying the page of results to return. To request the first page results, page_token must be empty. To request the next page of results, page_token must be the value of next_page_token returned from the previous call to ListTasks method. The page token is valid for only 2 hours. */
  pageToken?: string;
}

export const ListProjectsLocationsQueuesTasksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  responseView: Schema.optional(Schema.String).pipe(T.HttpQuery("responseView")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/queues/{queuesId}/tasks" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsQueuesTasksRequest>;

export type ListProjectsLocationsQueuesTasksResponse = ListTasksResponse;
export const ListProjectsLocationsQueuesTasksResponse = ListTasksResponse;

export type ListProjectsLocationsQueuesTasksError = CommonErrors;

export const listProjectsLocationsQueuesTasks = API.makePaginated(() => ({
  input: ListProjectsLocationsQueuesTasksRequest,
  output: ListProjectsLocationsQueuesTasksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a task. After a task is successfully executed or has exhausted its retry attempts, the task is deleted. A `GetTask` request for a deleted task returns a `NOT_FOUND` error. */
export interface GetProjectsLocationsQueuesTasksRequest {
  /** Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID` */
  name: string;
  /** The response_view specifies which subset of the Task will be returned. By default response_view is BASIC; not all information is retrieved by default because some data, such as payloads, might be desirable to return only when needed because of its large size or because of the sensitivity of data that it contains. Authorization for FULL requires `cloudtasks.tasks.fullView` [Google IAM](https://cloud.google.com/iam/) permission on the Task resource. */
  responseView?: "VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetProjectsLocationsQueuesTasksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  responseView: Schema.optional(Schema.String).pipe(T.HttpQuery("responseView")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/queues/{queuesId}/tasks/{tasksId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsQueuesTasksRequest>;

export type GetProjectsLocationsQueuesTasksResponse = Task;
export const GetProjectsLocationsQueuesTasksResponse = Task;

export type GetProjectsLocationsQueuesTasksError = CommonErrors;

export const getProjectsLocationsQueuesTasks: API.OperationMethod<GetProjectsLocationsQueuesTasksRequest, GetProjectsLocationsQueuesTasksResponse, GetProjectsLocationsQueuesTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsQueuesTasksRequest,
  output: GetProjectsLocationsQueuesTasksResponse,
  errors: [],
}));

/** Creates a task and adds it to a queue. Tasks cannot be updated after creation; there is no UpdateTask command. * The maximum task size is 100KB. */
export interface CreateProjectsLocationsQueuesTasksRequest {
  /** Required. The queue name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID` The queue must already exist. */
  parent: string;
  /** Request body */
  body?: CreateTaskRequest;
}

export const CreateProjectsLocationsQueuesTasksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateTaskRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/queues/{queuesId}/tasks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsQueuesTasksRequest>;

export type CreateProjectsLocationsQueuesTasksResponse = Task;
export const CreateProjectsLocationsQueuesTasksResponse = Task;

export type CreateProjectsLocationsQueuesTasksError = CommonErrors;

export const createProjectsLocationsQueuesTasks: API.OperationMethod<CreateProjectsLocationsQueuesTasksRequest, CreateProjectsLocationsQueuesTasksResponse, CreateProjectsLocationsQueuesTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsQueuesTasksRequest,
  output: CreateProjectsLocationsQueuesTasksResponse,
  errors: [],
}));

/** Deletes a task. A task can be deleted if it is scheduled or dispatched. A task cannot be deleted if it has executed successfully or permanently failed. */
export interface DeleteProjectsLocationsQueuesTasksRequest {
  /** Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID` */
  name: string;
}

export const DeleteProjectsLocationsQueuesTasksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/queues/{queuesId}/tasks/{tasksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsQueuesTasksRequest>;

export type DeleteProjectsLocationsQueuesTasksResponse = Empty;
export const DeleteProjectsLocationsQueuesTasksResponse = Empty;

export type DeleteProjectsLocationsQueuesTasksError = CommonErrors;

export const deleteProjectsLocationsQueuesTasks: API.OperationMethod<DeleteProjectsLocationsQueuesTasksRequest, DeleteProjectsLocationsQueuesTasksResponse, DeleteProjectsLocationsQueuesTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsQueuesTasksRequest,
  output: DeleteProjectsLocationsQueuesTasksResponse,
  errors: [],
}));

/** Forces a task to run now. When this method is called, Cloud Tasks will dispatch the task, even if the task is already running, the queue has reached its RateLimits or is PAUSED. This command is meant to be used for manual debugging. For example, RunTask can be used to retry a failed task after a fix has been made or to manually force a task to be dispatched now. If Cloud Tasks receives a successful response from the task's target, then the task will be deleted; otherwise the task's schedule_time will be reset to the time that RunTask was called plus the retry delay specified in the queue's RetryConfig. RunTask returns NOT_FOUND when it is called on a task that has already succeeded or permanently failed. */
export interface RunProjectsLocationsQueuesTasksRequest {
  /** Required. The task name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID` */
  name: string;
  /** Request body */
  body?: RunTaskRequest;
}

export const RunProjectsLocationsQueuesTasksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RunTaskRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/queues/{queuesId}/tasks/{tasksId}:run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunProjectsLocationsQueuesTasksRequest>;

export type RunProjectsLocationsQueuesTasksResponse = Task;
export const RunProjectsLocationsQueuesTasksResponse = Task;

export type RunProjectsLocationsQueuesTasksError = CommonErrors;

export const runProjectsLocationsQueuesTasks: API.OperationMethod<RunProjectsLocationsQueuesTasksRequest, RunProjectsLocationsQueuesTasksResponse, RunProjectsLocationsQueuesTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunProjectsLocationsQueuesTasksRequest,
  output: RunProjectsLocationsQueuesTasksResponse,
  errors: [],
}));

/** Creates and buffers a new task without the need to explicitly define a Task message. The queue must have HTTP target. To create the task with a custom ID, use the following format and set TASK_ID to your desired ID: projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks/TASK_ID:buffer To create the task with an automatically generated ID, use the following format: projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID/tasks:buffer. */
export interface BufferProjectsLocationsQueuesTasksRequest {
  /** Required. The parent queue name. For example: projects/PROJECT_ID/locations/LOCATION_ID/queues/QUEUE_ID` The queue must already exist. */
  queue: string;
  /** Optional. Task ID for the task being created. If not provided, Cloud Tasks generates an ID for the task. */
  taskId: string;
  /** Request body */
  body?: BufferTaskRequest;
}

export const BufferProjectsLocationsQueuesTasksRequest = Schema.Struct({
  queue: Schema.String.pipe(T.HttpPath("queue")),
  taskId: Schema.String.pipe(T.HttpPath("taskId")),
  body: Schema.optional(BufferTaskRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/queues/{queuesId}/tasks/{taskId}:buffer", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BufferProjectsLocationsQueuesTasksRequest>;

export type BufferProjectsLocationsQueuesTasksResponse = BufferTaskResponse;
export const BufferProjectsLocationsQueuesTasksResponse = BufferTaskResponse;

export type BufferProjectsLocationsQueuesTasksError = CommonErrors;

export const bufferProjectsLocationsQueuesTasks: API.OperationMethod<BufferProjectsLocationsQueuesTasksRequest, BufferProjectsLocationsQueuesTasksResponse, BufferProjectsLocationsQueuesTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BufferProjectsLocationsQueuesTasksRequest,
  output: BufferProjectsLocationsQueuesTasksResponse,
  errors: [],
}));

