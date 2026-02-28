// ==========================================================================
// Cloud Scheduler API (cloudscheduler v1)
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
  name: "cloudscheduler",
  version: "v1",
  rootUrl: "https://cloudscheduler.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface Location {
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  locationId: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface ListLocationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<Location>;
}

export const ListLocationsResponse: Schema.Schema<ListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  locations: Schema.optional(Schema.Array(Location)),
})).annotate({ identifier: "ListLocationsResponse" }) as any as Schema.Schema<ListLocationsResponse>;

export interface Status {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  code: Schema.optional(Schema.Number),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
  error: Schema.optional(Status),
  done: Schema.optional(Schema.Boolean),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface RetryConfig {
  /** The time limit for retrying a failed job, measured from the time when an execution was first attempted. If specified with retry_count, the job will be retried until both limits are reached. The default value for max_retry_duration is zero, which means retry duration is unlimited. However, if retry_count is also 0, a job attempt won't be retried if it fails. */
  maxRetryDuration?: string;
  /** The time between retries will double `max_doublings` times. A job's retry interval starts at min_backoff_duration, then doubles `max_doublings` times, then increases linearly, and finally retries at intervals of max_backoff_duration up to retry_count times. For examples, see [Retry jobs](/scheduler/docs/configuring/retry-jobs#max-doublings). The default value of this field is 5. */
  maxDoublings?: number;
  /** The number of attempts that the system will make to run a job using the exponential backoff procedure described by max_doublings. The default value of retry_count is zero. If retry_count is 0 (and if max_retry_duration is also 0), a job attempt won't be retried if it fails. Instead, Cloud Scheduler system will wait for the next scheduled execution time. Setting retry_count to 0 doesn't prevent failed jobs from running according to schedule after the failure. If retry_count is set to a non-zero number, Cloud Scheduler will retry the failed job, using exponential backoff, for retry_count times until the job succeeds or the number of retries is exhausted. Note that the next scheduled execution time might be skipped if the retries continue through that time. Values greater than 5 and negative values are not allowed. */
  retryCount?: number;
  /** The minimum amount of time to wait before retrying a job after it fails. The default value of this field is 5 seconds. */
  minBackoffDuration?: string;
  /** The maximum amount of time to wait before retrying a job after it fails. The default value of this field is 1 hour. */
  maxBackoffDuration?: string;
}

export const RetryConfig: Schema.Schema<RetryConfig> = Schema.suspend(() => Schema.Struct({
  maxRetryDuration: Schema.optional(Schema.String),
  maxDoublings: Schema.optional(Schema.Number),
  retryCount: Schema.optional(Schema.Number),
  minBackoffDuration: Schema.optional(Schema.String),
  maxBackoffDuration: Schema.optional(Schema.String),
})).annotate({ identifier: "RetryConfig" }) as any as Schema.Schema<RetryConfig>;

export interface PubsubTarget {
  /** Required. The name of the Cloud Pub/Sub topic to which messages will be published when a job is delivered. The topic name must be in the same format as required by Pub/Sub's [PublishRequest.name](https://cloud.google.com/pubsub/docs/reference/rpc/google.pubsub.v1#publishrequest), for example `projects/PROJECT_ID/topics/TOPIC_ID`. The topic must be in the same project as the Cloud Scheduler job. */
  topicName?: string;
  /** The message payload for PubsubMessage. Pubsub message must contain either non-empty data, or at least one attribute. */
  data?: string;
  /** Attributes for PubsubMessage. Pubsub message must contain either non-empty data, or at least one attribute. */
  attributes?: Record<string, string>;
}

export const PubsubTarget: Schema.Schema<PubsubTarget> = Schema.suspend(() => Schema.Struct({
  topicName: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
  attributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "PubsubTarget" }) as any as Schema.Schema<PubsubTarget>;

export interface AppEngineRouting {
  /** App version. By default, the job is sent to the version which is the default version when the job is attempted. */
  version?: string;
  /** Output only. The host that the job is sent to. For more information about how App Engine requests are routed, see [here](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed). The host is constructed as: * `host = [application_domain_name]` `| [service] + '.' + [application_domain_name]` `| [version] + '.' + [application_domain_name]` `| [version_dot_service]+ '.' + [application_domain_name]` `| [instance] + '.' + [application_domain_name]` `| [instance_dot_service] + '.' + [application_domain_name]` `| [instance_dot_version] + '.' + [application_domain_name]` `| [instance_dot_version_dot_service] + '.' + [application_domain_name]` * `application_domain_name` = The domain name of the app, for example .appspot.com, which is associated with the job's project ID. * `service =` service * `version =` version * `version_dot_service =` version `+ '.' +` service * `instance =` instance * `instance_dot_service =` instance `+ '.' +` service * `instance_dot_version =` instance `+ '.' +` version * `instance_dot_version_dot_service =` instance `+ '.' +` version `+ '.' +` service If service is empty, then the job will be sent to the service which is the default service when the job is attempted. If version is empty, then the job will be sent to the version which is the default version when the job is attempted. If instance is empty, then the job will be sent to an instance which is available when the job is attempted. If service, version, or instance is invalid, then the job will be sent to the default version of the default service when the job is attempted. */
  host?: string;
  /** App instance. By default, the job is sent to an instance which is available when the job is attempted. Requests can only be sent to a specific instance if [manual scaling is used in App Engine Standard](https://cloud.google.com/appengine/docs/python/an-overview-of-app-engine?#scaling_types_and_instance_classes). App Engine Flex does not support instances. For more information, see [App Engine Standard request routing](https://cloud.google.com/appengine/docs/standard/python/how-requests-are-routed) and [App Engine Flex request routing](https://cloud.google.com/appengine/docs/flexible/python/how-requests-are-routed). */
  instance?: string;
  /** App service. By default, the job is sent to the service which is the default service when the job is attempted. */
  service?: string;
}

export const AppEngineRouting: Schema.Schema<AppEngineRouting> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  host: Schema.optional(Schema.String),
  instance: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "AppEngineRouting" }) as any as Schema.Schema<AppEngineRouting>;

export interface AppEngineHttpTarget {
  /** The HTTP method to use for the request. PATCH and OPTIONS are not permitted. */
  httpMethod?: "HTTP_METHOD_UNSPECIFIED" | "POST" | "GET" | "HEAD" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | (string & {});
  /** HTTP request headers. This map contains the header field names and values. Headers can be set when the job is created. Cloud Scheduler sets some headers to default values: * `User-Agent`: By default, this header is `"AppEngine-Google; (+http://code.google.com/appengine)"`. This header can be modified, but Cloud Scheduler will append `"AppEngine-Google; (+http://code.google.com/appengine)"` to the modified `User-Agent`. * `X-CloudScheduler`: This header will be set to true. * `X-CloudScheduler-JobName`: This header will contain the job name. * `X-CloudScheduler-ScheduleTime`: For Cloud Scheduler jobs specified in the unix-cron format, this header will contain the job schedule as an offset of UTC parsed according to RFC3339. If the job has a body and the following headers are not set by the user, Cloud Scheduler sets default values: * `Content-Type`: This will be set to `"application/octet-stream"`. You can override this default by explicitly setting `Content-Type` to a particular media type when creating the job. For example, you can set `Content-Type` to `"application/json"`. The headers below are output only. They cannot be set or overridden: * `Content-Length`: This is computed by Cloud Scheduler. * `X-Google-*`: For Google internal use only. * `X-AppEngine-*`: For Google internal use only. In addition, some App Engine headers, which contain job-specific information, are also be sent to the job handler. */
  headers?: Record<string, string>;
  /** App Engine Routing setting for the job. */
  appEngineRouting?: AppEngineRouting;
  /** The relative URI. The relative URL must begin with "/" and must be a valid HTTP relative URL. It can contain a path, query string arguments, and `#` fragments. If the relative URL is empty, then the root path "/" will be used. No spaces are allowed, and the maximum length allowed is 2083 characters. */
  relativeUri?: string;
  /** Body. HTTP request body. A request body is allowed only if the HTTP method is POST or PUT. It will result in invalid argument error to set a body on a job with an incompatible HttpMethod. */
  body?: string;
}

export const AppEngineHttpTarget: Schema.Schema<AppEngineHttpTarget> = Schema.suspend(() => Schema.Struct({
  httpMethod: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  appEngineRouting: Schema.optional(AppEngineRouting),
  relativeUri: Schema.optional(Schema.String),
  body: Schema.optional(Schema.String),
})).annotate({ identifier: "AppEngineHttpTarget" }) as any as Schema.Schema<AppEngineHttpTarget>;

export interface OAuthToken {
  /** OAuth scope to be used for generating OAuth access token. If not specified, "https://www.googleapis.com/auth/cloud-platform" will be used. */
  scope?: string;
  /** [Service account email](https://cloud.google.com/iam/docs/service-accounts) to be used for generating OAuth token. The service account must be within the same project as the job. The caller must have iam.serviceAccounts.actAs permission for the service account. */
  serviceAccountEmail?: string;
}

export const OAuthToken: Schema.Schema<OAuthToken> = Schema.suspend(() => Schema.Struct({
  scope: Schema.optional(Schema.String),
  serviceAccountEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "OAuthToken" }) as any as Schema.Schema<OAuthToken>;

export interface OidcToken {
  /** Audience to be used when generating OIDC token. If not specified, the URI specified in target will be used. */
  audience?: string;
  /** [Service account email](https://cloud.google.com/iam/docs/service-accounts) to be used for generating OIDC token. The service account must be within the same project as the job. The caller must have iam.serviceAccounts.actAs permission for the service account. */
  serviceAccountEmail?: string;
}

export const OidcToken: Schema.Schema<OidcToken> = Schema.suspend(() => Schema.Struct({
  audience: Schema.optional(Schema.String),
  serviceAccountEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "OidcToken" }) as any as Schema.Schema<OidcToken>;

export interface HttpTarget {
  /** HTTP request body. A request body is allowed only if the HTTP method is POST, PUT, or PATCH. It is an error to set body on a job with an incompatible HttpMethod. */
  body?: string;
  /** If specified, an [OAuth token](https://developers.google.com/identity/protocols/OAuth2) will be generated and attached as an `Authorization` header in the HTTP request. This type of authorization should generally only be used when calling Google APIs hosted on *.googleapis.com. */
  oauthToken?: OAuthToken;
  /** If specified, an [OIDC](https://developers.google.com/identity/protocols/OpenIDConnect) token will be generated and attached as an `Authorization` header in the HTTP request. This type of authorization can be used for many scenarios, including calling Cloud Run, or endpoints where you intend to validate the token yourself. */
  oidcToken?: OidcToken;
  /** Which HTTP method to use for the request. */
  httpMethod?: "HTTP_METHOD_UNSPECIFIED" | "POST" | "GET" | "HEAD" | "PUT" | "DELETE" | "PATCH" | "OPTIONS" | (string & {});
  /** Required. The full URI path that the request will be sent to. This string must begin with either "http://" or "https://". Some examples of valid values for uri are: `http://acme.com` and `https://acme.com/sales:8080`. Cloud Scheduler will encode some characters for safety and compatibility. The maximum allowed URL length is 2083 characters after encoding. */
  uri?: string;
  /** HTTP request headers. This map contains the header field names and values. The user can specify HTTP request headers to send with the job's HTTP request. Repeated headers are not supported, but a header value can contain commas. The following headers represent a subset of the headers that accompany the job's HTTP request. Some HTTP request headers are ignored or replaced. A partial list of headers that are ignored or replaced is below: * Host: This will be computed by Cloud Scheduler and derived from uri. * `Content-Length`: This will be computed by Cloud Scheduler. * `User-Agent`: This will be set to `"Google-Cloud-Scheduler"`. * `X-Google-*`: Google internal use only. * `X-AppEngine-*`: Google internal use only. * `X-CloudScheduler`: This header will be set to true. * `X-CloudScheduler-JobName`: This header will contain the job name. * `X-CloudScheduler-ScheduleTime`: For Cloud Scheduler jobs specified in the unix-cron format, this header will contain the job schedule as an offset of UTC parsed according to RFC3339. If the job has a body and the following headers are not set by the user, Cloud Scheduler sets default values: * `Content-Type`: This will be set to `"application/octet-stream"`. You can override this default by explicitly setting `Content-Type` to a particular media type when creating the job. For example, you can set `Content-Type` to `"application/json"`. The total size of headers must be less than 80KB. */
  headers?: Record<string, string>;
}

export const HttpTarget: Schema.Schema<HttpTarget> = Schema.suspend(() => Schema.Struct({
  body: Schema.optional(Schema.String),
  oauthToken: Schema.optional(OAuthToken),
  oidcToken: Schema.optional(OidcToken),
  httpMethod: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "HttpTarget" }) as any as Schema.Schema<HttpTarget>;

export interface Job {
  /** App Engine HTTP target. */
  appEngineHttpTarget?: AppEngineHttpTarget;
  /** Output only. The time the last job attempt started. */
  lastAttemptTime?: string;
  /** Output only. The creation time of the job. */
  userUpdateTime?: string;
  /** Specifies the time zone to be used in interpreting schedule. The value of this field must be a time zone name from the [tz database](http://en.wikipedia.org/wiki/Tz_database). Note that some time zones include a provision for daylight savings time. The rules for daylight saving time are determined by the chosen tz. For UTC use the string "utc". If a time zone is not specified, the default will be in UTC (also known as GMT). */
  timeZone?: string;
  /** Pub/Sub target. */
  pubsubTarget?: PubsubTarget;
  /** HTTP target. */
  httpTarget?: HttpTarget;
  /** The deadline for job attempts. If the request handler does not respond by this deadline then the request is cancelled and the attempt is marked as a `DEADLINE_EXCEEDED` failure. The failed attempt can be viewed in execution logs. Cloud Scheduler will retry the job according to the RetryConfig. The default and the allowed values depend on the type of target: * For HTTP targets, the default is 3 minutes. The deadline must be in the interval [15 seconds, 30 minutes]. * For App Engine HTTP targets, 0 indicates that the request has the default deadline. The default deadline depends on the scaling type of the service: 10 minutes for standard apps with automatic scaling, 24 hours for standard apps with manual and basic scaling, and 60 minutes for flex apps. If the request deadline is set, it must be in the interval [15 seconds, 24 hours 15 seconds]. * For Pub/Sub targets, this field is ignored. */
  attemptDeadline?: string;
  /** Required, except when used with UpdateJob. Describes the schedule on which the job will be executed. The schedule can be either of the following types: * [Crontab](https://en.wikipedia.org/wiki/Cron#Overview) * English-like [schedule](/scheduler/docs/configuring/cron-job-schedules) As a general rule, execution `n + 1` of a job will not begin until execution `n` has finished. Cloud Scheduler will never allow two simultaneously outstanding executions. For example, this implies that if the `n+1`th execution is scheduled to run at 16:00 but the `n`th execution takes until 16:15, the `n+1`th execution will not start until `16:15`. A scheduled start time will be delayed if the previous execution has not ended when its scheduled time occurs. If retry_count > 0 and a job attempt fails, the job will be tried a total of retry_count times, with exponential backoff, until the next scheduled start time. If retry_count is 0, a job attempt will not be retried if it fails. Instead the Cloud Scheduler system will wait for the next scheduled execution time. Setting retry_count to 0 does not prevent failed jobs from running according to schedule after the failure. */
  schedule?: string;
  /** Output only. State of the job. */
  state?: "STATE_UNSPECIFIED" | "ENABLED" | "PAUSED" | "DISABLED" | "UPDATE_FAILED" | (string & {});
  /** Output only. The next time the job is scheduled. Note that this may be a retry of a previously failed attempt or the next execution time according to the schedule. */
  scheduleTime?: string;
  /** Optionally caller-specified in CreateJob, after which it becomes output only. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]), hyphens (-), colons (:), or periods (.). For more information, see [Identifying projects](/resource-manager/docs/creating-managing-projects#identifying_projects) * `LOCATION_ID` is the canonical ID for the job's location. The list of available locations can be obtained by calling [locations.list](/scheduler/docs/reference/rest/v1/projects.locations/list). For more information, see [Cloud Scheduler locations](/scheduler/docs/locations). * `JOB_ID` can contain only letters ([A-Za-z]), numbers ([0-9]), hyphens (-), or underscores (_). The maximum length is 500 characters. */
  name?: string;
  /** Output only. Whether or not this Job satisfies the requirements of physical zone separation */
  satisfiesPzs?: boolean;
  /** Optionally caller-specified in CreateJob or UpdateJob. A human-readable description for the job. This string must not contain more than 500 characters. */
  description?: string;
  /** Settings that determine the retry behavior. */
  retryConfig?: RetryConfig;
  /** Output only. The response from the target for the last attempted execution. */
  status?: Status;
}

export const Job: Schema.Schema<Job> = Schema.suspend(() => Schema.Struct({
  appEngineHttpTarget: Schema.optional(AppEngineHttpTarget),
  lastAttemptTime: Schema.optional(Schema.String),
  userUpdateTime: Schema.optional(Schema.String),
  timeZone: Schema.optional(Schema.String),
  pubsubTarget: Schema.optional(PubsubTarget),
  httpTarget: Schema.optional(HttpTarget),
  attemptDeadline: Schema.optional(Schema.String),
  schedule: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  scheduleTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  retryConfig: Schema.optional(RetryConfig),
  status: Schema.optional(Status),
})).annotate({ identifier: "Job" }) as any as Schema.Schema<Job>;

export interface ListJobsResponse {
  /** The list of jobs. */
  jobs?: Array<Job>;
  /** A token to retrieve next page of results. Pass this value in the page_token field in the subsequent call to ListJobs to retrieve the next page of results. If this is empty it indicates that there are no more results through which to paginate. The page token is valid for only 2 hours. */
  nextPageToken?: string;
}

export const ListJobsResponse: Schema.Schema<ListJobsResponse> = Schema.suspend(() => Schema.Struct({
  jobs: Schema.optional(Schema.Array(Job)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListJobsResponse" }) as any as Schema.Schema<ListJobsResponse>;

export interface ResumeJobRequest {
}

export const ResumeJobRequest: Schema.Schema<ResumeJobRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ResumeJobRequest" }) as any as Schema.Schema<ResumeJobRequest>;

export interface PubsubMessage {
  /** Optional. Attributes for this message. If this field is empty, the message must contain non-empty data. This can be used to filter messages on the subscription. */
  attributes?: Record<string, string>;
  /** Optional. The message data field. If this field is empty, the message must contain at least one attribute. */
  data?: string;
  /** ID of this message, assigned by the server when the message is published. Guaranteed to be unique within the topic. This value may be read by a subscriber that receives a `PubsubMessage` via a `Pull` call or a push delivery. It must not be populated by the publisher in a `Publish` call. */
  messageId?: string;
  /** The time at which the message was published, populated by the server when it receives the `Publish` call. It must not be populated by the publisher in a `Publish` call. */
  publishTime?: string;
  /** Optional. If non-empty, identifies related messages for which publish order should be respected. If a `Subscription` has `enable_message_ordering` set to `true`, messages published with the same non-empty `ordering_key` value will be delivered to subscribers in the order in which they are received by the Pub/Sub system. All `PubsubMessage`s published in a given `PublishRequest` must specify the same `ordering_key` value. For more information, see [ordering messages](https://cloud.google.com/pubsub/docs/ordering). */
  orderingKey?: string;
}

export const PubsubMessage: Schema.Schema<PubsubMessage> = Schema.suspend(() => Schema.Struct({
  attributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  data: Schema.optional(Schema.String),
  messageId: Schema.optional(Schema.String),
  publishTime: Schema.optional(Schema.String),
  orderingKey: Schema.optional(Schema.String),
})).annotate({ identifier: "PubsubMessage" }) as any as Schema.Schema<PubsubMessage>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface RunJobRequest {
}

export const RunJobRequest: Schema.Schema<RunJobRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RunJobRequest" }) as any as Schema.Schema<RunJobRequest>;

export interface CmekConfig {
  /** Optional. Resource name of the Cloud KMS key, of the form `projects/PROJECT_ID/locations/LOCATION_ID/keyRings/KEY_RING_ID/cryptoKeys/KEY_ID`, that will be used to encrypt Jobs in the region. Setting this as blank will turn off CMEK encryption. */
  kmsKeyName?: string;
  /** Identifier. The config resource name which includes the project and location and must end in 'cmekConfig', in the format projects/PROJECT_ID/locations/LOCATION_ID/cmekConfig` */
  name?: string;
}

export const CmekConfig: Schema.Schema<CmekConfig> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "CmekConfig" }) as any as Schema.Schema<CmekConfig>;

export interface ListOperationsResponse {
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  operations: Schema.optional(Schema.Array(Operation)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface PauseJobRequest {
}

export const PauseJobRequest: Schema.Schema<PauseJobRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PauseJobRequest" }) as any as Schema.Schema<PauseJobRequest>;

export interface OperationMetadata {
  /** Output only. Human-readable status of the operation, if any. */
  statusDetail?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
  cancelRequested?: boolean;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  statusDetail: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  apiVersion: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  cancelRequested: Schema.optional(Schema.Boolean),
  verb: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** The resource that owns the locations collection, if applicable. */
  name: string;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
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

/** Gets the Scheduler config in the project/region. */
export interface GetCmekConfigProjectsLocationsRequest {
  /** Required. The config name. For example: projects/PROJECT_ID/locations/LOCATION_ID/cmekConfig */
  name: string;
}

export const GetCmekConfigProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/cmekConfig" }),
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

/** Gets information about a location. */
export interface GetProjectsLocationsRequest {
  /** Resource name for the location. */
  name: string;
}

export const GetProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}" }),
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

/** Initializes or Updates the a scheduler config. */
export interface UpdateCmekConfigProjectsLocationsRequest {
  /** Identifier. The config resource name which includes the project and location and must end in 'cmekConfig', in the format projects/PROJECT_ID/locations/LOCATION_ID/cmekConfig` */
  name: string;
  /** Optional. List of fields to be updated in this request. */
  updateMask?: string;
  /** Request body */
  body?: CmekConfig;
}

export const UpdateCmekConfigProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(CmekConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/cmekConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCmekConfigProjectsLocationsRequest>;

export type UpdateCmekConfigProjectsLocationsResponse = Operation;
export const UpdateCmekConfigProjectsLocationsResponse = Operation;

export type UpdateCmekConfigProjectsLocationsError = CommonErrors;

export const updateCmekConfigProjectsLocations: API.OperationMethod<UpdateCmekConfigProjectsLocationsRequest, UpdateCmekConfigProjectsLocationsResponse, UpdateCmekConfigProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCmekConfigProjectsLocationsRequest,
  output: UpdateCmekConfigProjectsLocationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsOperationsRequest>;

export type DeleteProjectsLocationsOperationsResponse = Empty;
export const DeleteProjectsLocationsOperationsResponse = Empty;

export type DeleteProjectsLocationsOperationsError = CommonErrors;

export const deleteProjectsLocationsOperations: API.OperationMethod<DeleteProjectsLocationsOperationsRequest, DeleteProjectsLocationsOperationsResponse, DeleteProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsOperationsRequest,
  output: DeleteProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsOperationsRequest>;

export type CancelProjectsLocationsOperationsResponse = Empty;
export const CancelProjectsLocationsOperationsResponse = Empty;

export type CancelProjectsLocationsOperationsError = CommonErrors;

export const cancelProjectsLocationsOperations: API.OperationMethod<CancelProjectsLocationsOperationsRequest, CancelProjectsLocationsOperationsResponse, CancelProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsOperationsRequest,
  output: CancelProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsOperationsRequest>;

export type GetProjectsLocationsOperationsResponse = Operation;
export const GetProjectsLocationsOperationsResponse = Operation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The standard list page token. */
  pageToken?: string;
  /** The name of the operation's parent resource. */
  name: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list filter. */
  filter?: string;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  name: Schema.String.pipe(T.HttpPath("name")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsOperationsError = CommonErrors;

export const listProjectsLocationsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsOperationsRequest,
  output: ListProjectsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a job. */
export interface GetProjectsLocationsJobsRequest {
  /** Required. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. */
  name: string;
}

export const GetProjectsLocationsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/jobs/{jobsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsJobsRequest>;

export type GetProjectsLocationsJobsResponse = Job;
export const GetProjectsLocationsJobsResponse = Job;

export type GetProjectsLocationsJobsError = CommonErrors;

export const getProjectsLocationsJobs: API.OperationMethod<GetProjectsLocationsJobsRequest, GetProjectsLocationsJobsResponse, GetProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsJobsRequest,
  output: GetProjectsLocationsJobsResponse,
  errors: [],
}));

/** Deletes a job. */
export interface DeleteProjectsLocationsJobsRequest {
  /** Required. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. */
  name: string;
}

export const DeleteProjectsLocationsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/jobs/{jobsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsJobsRequest>;

export type DeleteProjectsLocationsJobsResponse = Empty;
export const DeleteProjectsLocationsJobsResponse = Empty;

export type DeleteProjectsLocationsJobsError = CommonErrors;

export const deleteProjectsLocationsJobs: API.OperationMethod<DeleteProjectsLocationsJobsRequest, DeleteProjectsLocationsJobsResponse, DeleteProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsJobsRequest,
  output: DeleteProjectsLocationsJobsResponse,
  errors: [],
}));

/** Updates a job. If successful, the updated Job is returned. If the job does not exist, `NOT_FOUND` is returned. If UpdateJob does not successfully return, it is possible for the job to be in an Job.State.UPDATE_FAILED state. A job in this state may not be executed. If this happens, retry the UpdateJob request until a successful response is received. */
export interface PatchProjectsLocationsJobsRequest {
  /** Optionally caller-specified in CreateJob, after which it becomes output only. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. * `PROJECT_ID` can contain letters ([A-Za-z]), numbers ([0-9]), hyphens (-), colons (:), or periods (.). For more information, see [Identifying projects](/resource-manager/docs/creating-managing-projects#identifying_projects) * `LOCATION_ID` is the canonical ID for the job's location. The list of available locations can be obtained by calling [locations.list](/scheduler/docs/reference/rest/v1/projects.locations/list). For more information, see [Cloud Scheduler locations](/scheduler/docs/locations). * `JOB_ID` can contain only letters ([A-Za-z]), numbers ([0-9]), hyphens (-), or underscores (_). The maximum length is 500 characters. */
  name: string;
  /** A mask used to specify which fields of the job are being updated. */
  updateMask?: string;
  /** Request body */
  body?: Job;
}

export const PatchProjectsLocationsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/jobs/{jobsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsJobsRequest>;

export type PatchProjectsLocationsJobsResponse = Job;
export const PatchProjectsLocationsJobsResponse = Job;

export type PatchProjectsLocationsJobsError = CommonErrors;

export const patchProjectsLocationsJobs: API.OperationMethod<PatchProjectsLocationsJobsRequest, PatchProjectsLocationsJobsResponse, PatchProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsJobsRequest,
  output: PatchProjectsLocationsJobsResponse,
  errors: [],
}));

/** Resume a job. This method reenables a job after it has been Job.State.PAUSED. The state of a job is stored in Job.state; after calling this method it will be set to Job.State.ENABLED. A job must be in Job.State.PAUSED to be resumed. */
export interface ResumeProjectsLocationsJobsRequest {
  /** Required. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. */
  name: string;
  /** Request body */
  body?: ResumeJobRequest;
}

export const ResumeProjectsLocationsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ResumeJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/jobs/{jobsId}:resume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResumeProjectsLocationsJobsRequest>;

export type ResumeProjectsLocationsJobsResponse = Job;
export const ResumeProjectsLocationsJobsResponse = Job;

export type ResumeProjectsLocationsJobsError = CommonErrors;

export const resumeProjectsLocationsJobs: API.OperationMethod<ResumeProjectsLocationsJobsRequest, ResumeProjectsLocationsJobsResponse, ResumeProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResumeProjectsLocationsJobsRequest,
  output: ResumeProjectsLocationsJobsResponse,
  errors: [],
}));

/** Lists jobs. */
export interface ListProjectsLocationsJobsRequest {
  /** Required. The location name. For example: `projects/PROJECT_ID/locations/LOCATION_ID`. */
  parent: string;
  /** A token identifying a page of results the server will return. To request the first page results, page_token must be empty. To request the next page of results, page_token must be the value of next_page_token returned from the previous call to ListJobs. */
  pageToken?: string;
  /** Requested page size. The maximum page size is 500. If unspecified, the page size will be the maximum. Fewer jobs than requested might be returned, even if more jobs exist; use next_page_token to determine if more jobs exist. */
  pageSize?: number;
}

export const ListProjectsLocationsJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/jobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsJobsRequest>;

export type ListProjectsLocationsJobsResponse = ListJobsResponse;
export const ListProjectsLocationsJobsResponse = ListJobsResponse;

export type ListProjectsLocationsJobsError = CommonErrors;

export const listProjectsLocationsJobs = API.makePaginated(() => ({
  input: ListProjectsLocationsJobsRequest,
  output: ListProjectsLocationsJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Pauses a job. If a job is paused then the system will stop executing the job until it is re-enabled via ResumeJob. The state of the job is stored in state; if paused it will be set to Job.State.PAUSED. A job must be in Job.State.ENABLED to be paused. */
export interface PauseProjectsLocationsJobsRequest {
  /** Required. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. */
  name: string;
  /** Request body */
  body?: PauseJobRequest;
}

export const PauseProjectsLocationsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(PauseJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/jobs/{jobsId}:pause", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PauseProjectsLocationsJobsRequest>;

export type PauseProjectsLocationsJobsResponse = Job;
export const PauseProjectsLocationsJobsResponse = Job;

export type PauseProjectsLocationsJobsError = CommonErrors;

export const pauseProjectsLocationsJobs: API.OperationMethod<PauseProjectsLocationsJobsRequest, PauseProjectsLocationsJobsResponse, PauseProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PauseProjectsLocationsJobsRequest,
  output: PauseProjectsLocationsJobsResponse,
  errors: [],
}));

/** Forces a job to run now. When this method is called, Cloud Scheduler will dispatch the job, even if the job is already running. */
export interface RunProjectsLocationsJobsRequest {
  /** Required. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. */
  name: string;
  /** Request body */
  body?: RunJobRequest;
}

export const RunProjectsLocationsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RunJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/jobs/{jobsId}:run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunProjectsLocationsJobsRequest>;

export type RunProjectsLocationsJobsResponse = Job;
export const RunProjectsLocationsJobsResponse = Job;

export type RunProjectsLocationsJobsError = CommonErrors;

export const runProjectsLocationsJobs: API.OperationMethod<RunProjectsLocationsJobsRequest, RunProjectsLocationsJobsResponse, RunProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunProjectsLocationsJobsRequest,
  output: RunProjectsLocationsJobsResponse,
  errors: [],
}));

/** Creates a job. */
export interface CreateProjectsLocationsJobsRequest {
  /** Required. The location name. For example: `projects/PROJECT_ID/locations/LOCATION_ID`. */
  parent: string;
  /** Request body */
  body?: Job;
}

export const CreateProjectsLocationsJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/jobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsJobsRequest>;

export type CreateProjectsLocationsJobsResponse = Job;
export const CreateProjectsLocationsJobsResponse = Job;

export type CreateProjectsLocationsJobsError = CommonErrors;

export const createProjectsLocationsJobs: API.OperationMethod<CreateProjectsLocationsJobsRequest, CreateProjectsLocationsJobsResponse, CreateProjectsLocationsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsJobsRequest,
  output: CreateProjectsLocationsJobsResponse,
  errors: [],
}));

