// ==========================================================================
// Error Reporting API (clouderrorreporting v1beta1)
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
  name: "clouderrorreporting",
  version: "v1beta1",
  rootUrl: "https://clouderrorreporting.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface TrackingIssue {
  /** A URL pointing to a related entry in an issue tracking system. Example: `https://github.com/user/project/issues/4` */
  url?: string;
}

export const TrackingIssue: Schema.Schema<TrackingIssue> = Schema.suspend(() => Schema.Struct({
  url: Schema.optional(Schema.String),
})).annotate({ identifier: "TrackingIssue" }) as any as Schema.Schema<TrackingIssue>;

export interface ErrorGroup {
  /** The group resource name. Written as `projects/{projectID}/groups/{group_id}` or `projects/{projectID}/locations/{location}/groups/{group_id}` Examples: `projects/my-project-123/groups/my-group`, `projects/my-project-123/locations/us-central1/groups/my-group` In the group resource name, the `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see [Google Cloud Privacy Notice](https://cloud.google.com/terms/cloud-privacy-notice). For a list of supported locations, see [Supported Regions](https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. */
  name?: string;
  /** An opaque identifier of the group. This field is assigned by the Error Reporting system and always populated. In the group resource name, the `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see [Google Cloud Privacy Notice](https://cloud.google.com/terms/cloud-privacy-notice). */
  groupId?: string;
  /** Associated tracking issues. */
  trackingIssues?: Array<TrackingIssue>;
  /** Error group's resolution status. An unspecified resolution status will be interpreted as OPEN */
  resolutionStatus?: "RESOLUTION_STATUS_UNSPECIFIED" | "OPEN" | "ACKNOWLEDGED" | "RESOLVED" | "MUTED" | (string & {});
}

export const ErrorGroup: Schema.Schema<ErrorGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  groupId: Schema.optional(Schema.String),
  trackingIssues: Schema.optional(Schema.Array(TrackingIssue)),
  resolutionStatus: Schema.optional(Schema.String),
})).annotate({ identifier: "ErrorGroup" }) as any as Schema.Schema<ErrorGroup>;

export interface TimedCount {
  /** Approximate number of occurrences in the given time period. */
  count?: string;
  /** Start of the time period to which `count` refers (included). */
  startTime?: string;
  /** End of the time period to which `count` refers (excluded). */
  endTime?: string;
}

export const TimedCount: Schema.Schema<TimedCount> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TimedCount" }) as any as Schema.Schema<TimedCount>;

export interface ServiceContext {
  /** An identifier of the service, such as the name of the executable, job, or Google App Engine service name. This field is expected to have a low number of values that are relatively stable over time, as opposed to `version`, which can be changed whenever new code is deployed. Contains the service name for error reports extracted from Google App Engine logs or `default` if the App Engine default service is used. */
  service?: string;
  /** Represents the source code version that the developer provided, which could represent a version label or a Git SHA-1 hash, for example. For App Engine standard environment, the version is set to the version of the app. */
  version?: string;
  /** Type of the MonitoredResource. List of possible values: https://cloud.google.com/monitoring/api/resources Value is set automatically for incoming errors and must not be set when reporting errors. */
  resourceType?: string;
}

export const ServiceContext: Schema.Schema<ServiceContext> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
})).annotate({ identifier: "ServiceContext" }) as any as Schema.Schema<ServiceContext>;

export interface HttpRequestContext {
  /** The type of HTTP request, such as `GET`, `POST`, etc. */
  method?: string;
  /** The URL of the request. */
  url?: string;
  /** The user agent information that is provided with the request. */
  userAgent?: string;
  /** The referrer information that is provided with the request. */
  referrer?: string;
  /** The HTTP response status code for the request. */
  responseStatusCode?: number;
  /** The IP address from which the request originated. This can be IPv4, IPv6, or a token which is derived from the IP address, depending on the data that has been provided in the error report. */
  remoteIp?: string;
}

export const HttpRequestContext: Schema.Schema<HttpRequestContext> = Schema.suspend(() => Schema.Struct({
  method: Schema.optional(Schema.String),
  url: Schema.optional(Schema.String),
  userAgent: Schema.optional(Schema.String),
  referrer: Schema.optional(Schema.String),
  responseStatusCode: Schema.optional(Schema.Number),
  remoteIp: Schema.optional(Schema.String),
})).annotate({ identifier: "HttpRequestContext" }) as any as Schema.Schema<HttpRequestContext>;

export interface SourceLocation {
  /** The source code filename, which can include a truncated relative path, or a full path from a production machine. */
  filePath?: string;
  /** 1-based. 0 indicates that the line number is unknown. */
  lineNumber?: number;
  /** Human-readable name of a function or method. The value can include optional context like the class or package name. For example, `my.package.MyClass.method` in case of Java. */
  functionName?: string;
}

export const SourceLocation: Schema.Schema<SourceLocation> = Schema.suspend(() => Schema.Struct({
  filePath: Schema.optional(Schema.String),
  lineNumber: Schema.optional(Schema.Number),
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceLocation" }) as any as Schema.Schema<SourceLocation>;

export interface SourceReference {
  /** Optional. A URI string identifying the repository. Example: "https://github.com/GoogleCloudPlatform/kubernetes.git" */
  repository?: string;
  /** The canonical and persistent identifier of the deployed revision. Example (git): "0035781c50ec7aa23385dc841529ce8a4b70db1b" */
  revisionId?: string;
}

export const SourceReference: Schema.Schema<SourceReference> = Schema.suspend(() => Schema.Struct({
  repository: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
})).annotate({ identifier: "SourceReference" }) as any as Schema.Schema<SourceReference>;

export interface ErrorContext {
  /** The HTTP request which was processed when the error was triggered. */
  httpRequest?: HttpRequestContext;
  /** The user who caused or was affected by the crash. This can be a user ID, an email address, or an arbitrary token that uniquely identifies the user. When sending an error report, leave this field empty if the user was not logged in. In this case the Error Reporting system will use other data, such as remote IP address, to distinguish affected users. See `affected_users_count` in `ErrorGroupStats`. */
  user?: string;
  /** The location in the source code where the decision was made to report the error, usually the place where it was logged. For a logged exception this would be the source line where the exception is logged, usually close to the place where it was caught. */
  reportLocation?: SourceLocation;
  /** Source code that was used to build the executable which has caused the given error message. */
  sourceReferences?: Array<SourceReference>;
}

export const ErrorContext: Schema.Schema<ErrorContext> = Schema.suspend(() => Schema.Struct({
  httpRequest: Schema.optional(HttpRequestContext),
  user: Schema.optional(Schema.String),
  reportLocation: Schema.optional(SourceLocation),
  sourceReferences: Schema.optional(Schema.Array(SourceReference)),
})).annotate({ identifier: "ErrorContext" }) as any as Schema.Schema<ErrorContext>;

export interface ErrorEvent {
  /** Time when the event occurred as provided in the error report. If the report did not contain a timestamp, the time the error was received by the Error Reporting system is used. */
  eventTime?: string;
  /** The `ServiceContext` for which this error was reported. */
  serviceContext?: ServiceContext;
  /** The stack trace that was reported or logged by the service. */
  message?: string;
  /** Data about the context in which the error occurred. */
  context?: ErrorContext;
}

export const ErrorEvent: Schema.Schema<ErrorEvent> = Schema.suspend(() => Schema.Struct({
  eventTime: Schema.optional(Schema.String),
  serviceContext: Schema.optional(ServiceContext),
  message: Schema.optional(Schema.String),
  context: Schema.optional(ErrorContext),
})).annotate({ identifier: "ErrorEvent" }) as any as Schema.Schema<ErrorEvent>;

export interface ErrorGroupStats {
  /** Group data that is independent of the filter criteria. */
  group?: ErrorGroup;
  /** Approximate total number of events in the given group that match the filter criteria. */
  count?: string;
  /** Approximate number of affected users in the given group that match the filter criteria. Users are distinguished by data in the ErrorContext of the individual error events, such as their login name or their remote IP address in case of HTTP requests. The number of affected users can be zero even if the number of errors is non-zero if no data was provided from which the affected user could be deduced. Users are counted based on data in the request context that was provided in the error report. If more users are implicitly affected, such as due to a crash of the whole service, this is not reflected here. */
  affectedUsersCount?: string;
  /** Approximate number of occurrences over time. Timed counts returned by ListGroups are guaranteed to be: - Inside the requested time interval - Non-overlapping, and - Ordered by ascending time. */
  timedCounts?: Array<TimedCount>;
  /** Approximate first occurrence that was ever seen for this group and which matches the given filter criteria, ignoring the time_range that was specified in the request. */
  firstSeenTime?: string;
  /** Approximate last occurrence that was ever seen for this group and which matches the given filter criteria, ignoring the time_range that was specified in the request. */
  lastSeenTime?: string;
  /** Service contexts with a non-zero error count for the given filter criteria. This list can be truncated if multiple services are affected. Refer to `num_affected_services` for the total count. */
  affectedServices?: Array<ServiceContext>;
  /** The total number of services with a non-zero error count for the given filter criteria. */
  numAffectedServices?: number;
  /** An arbitrary event that is chosen as representative for the whole group. The representative event is intended to be used as a quick preview for the whole group. Events in the group are usually sufficiently similar to each other such that showing an arbitrary representative provides insight into the characteristics of the group as a whole. */
  representative?: ErrorEvent;
}

export const ErrorGroupStats: Schema.Schema<ErrorGroupStats> = Schema.suspend(() => Schema.Struct({
  group: Schema.optional(ErrorGroup),
  count: Schema.optional(Schema.String),
  affectedUsersCount: Schema.optional(Schema.String),
  timedCounts: Schema.optional(Schema.Array(TimedCount)),
  firstSeenTime: Schema.optional(Schema.String),
  lastSeenTime: Schema.optional(Schema.String),
  affectedServices: Schema.optional(Schema.Array(ServiceContext)),
  numAffectedServices: Schema.optional(Schema.Number),
  representative: Schema.optional(ErrorEvent),
})).annotate({ identifier: "ErrorGroupStats" }) as any as Schema.Schema<ErrorGroupStats>;

export interface ListGroupStatsResponse {
  /** The error group stats which match the given request. */
  errorGroupStats?: Array<ErrorGroupStats>;
  /** If non-empty, more results are available. Pass this token, along with the same query parameters as the first request, to view the next page of results. */
  nextPageToken?: string;
  /** The timestamp specifies the start time to which the request was restricted. The start time is set based on the requested time range. It may be adjusted to a later time if a project has exceeded the storage quota and older data has been deleted. */
  timeRangeBegin?: string;
}

export const ListGroupStatsResponse: Schema.Schema<ListGroupStatsResponse> = Schema.suspend(() => Schema.Struct({
  errorGroupStats: Schema.optional(Schema.Array(ErrorGroupStats)),
  nextPageToken: Schema.optional(Schema.String),
  timeRangeBegin: Schema.optional(Schema.String),
})).annotate({ identifier: "ListGroupStatsResponse" }) as any as Schema.Schema<ListGroupStatsResponse>;

export interface ListEventsResponse {
  /** The error events which match the given request. */
  errorEvents?: Array<ErrorEvent>;
  /** If non-empty, more results are available. Pass this token, along with the same query parameters as the first request, to view the next page of results. */
  nextPageToken?: string;
  /** The timestamp specifies the start time to which the request was restricted. */
  timeRangeBegin?: string;
}

export const ListEventsResponse: Schema.Schema<ListEventsResponse> = Schema.suspend(() => Schema.Struct({
  errorEvents: Schema.optional(Schema.Array(ErrorEvent)),
  nextPageToken: Schema.optional(Schema.String),
  timeRangeBegin: Schema.optional(Schema.String),
})).annotate({ identifier: "ListEventsResponse" }) as any as Schema.Schema<ListEventsResponse>;

export interface DeleteEventsResponse {
}

export const DeleteEventsResponse: Schema.Schema<DeleteEventsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeleteEventsResponse" }) as any as Schema.Schema<DeleteEventsResponse>;

export interface ReportedErrorEvent {
  /** Optional. Time when the event occurred. If not provided, the time when the event was received by the Error Reporting system is used. If provided, the time must not exceed the [logs retention period](https://cloud.google.com/logging/quotas#logs_retention_periods) in the past, or be more than 24 hours in the future. If an invalid time is provided, then an error is returned. */
  eventTime?: string;
  /** Required. The service context in which this error has occurred. */
  serviceContext?: ServiceContext;
  /** Required. The error message. If no `context.reportLocation` is provided, the message must contain a header (typically consisting of the exception type name and an error message) and an exception stack trace in one of the supported programming languages and formats. Supported languages are Java, Python, JavaScript, Ruby, C#, PHP, and Go. Supported stack trace formats are: * **Java**: Must be the return value of [`Throwable.printStackTrace()`](https://docs.oracle.com/javase/7/docs/api/java/lang/Throwable.html#printStackTrace%28%29). * **Python**: Must be the return value of [`traceback.format_exc()`](https://docs.python.org/2/library/traceback.html#traceback.format_exc). * **JavaScript**: Must be the value of [`error.stack`](https://github.com/v8/v8/wiki/Stack-Trace-API) as returned by V8. * **Ruby**: Must contain frames returned by [`Exception.backtrace`](https://ruby-doc.org/core-2.2.0/Exception.html#method-i-backtrace). * **C#**: Must be the return value of [`Exception.ToString()`](https://msdn.microsoft.com/en-us/library/system.exception.tostring.aspx). * **PHP**: Must be prefixed with `"PHP (Notice|Parse error|Fatal error|Warning): "` and contain the result of [`(string)$exception`](https://php.net/manual/en/exception.tostring.php). * **Go**: Must be the return value of [`debug.Stack()`](https://pkg.go.dev/runtime/debug#Stack). */
  message?: string;
  /** Optional. A description of the context in which the error occurred. */
  context?: ErrorContext;
}

export const ReportedErrorEvent: Schema.Schema<ReportedErrorEvent> = Schema.suspend(() => Schema.Struct({
  eventTime: Schema.optional(Schema.String),
  serviceContext: Schema.optional(ServiceContext),
  message: Schema.optional(Schema.String),
  context: Schema.optional(ErrorContext),
})).annotate({ identifier: "ReportedErrorEvent" }) as any as Schema.Schema<ReportedErrorEvent>;

export interface ReportErrorEventResponse {
}

export const ReportErrorEventResponse: Schema.Schema<ReportErrorEventResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ReportErrorEventResponse" }) as any as Schema.Schema<ReportErrorEventResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Deletes all error events of a given project. */
export interface DeleteEventsProjectsRequest {
  /** Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectID}` or `projects/{projectID}/locations/{location}`, where `{projectID}` is the [Google Cloud Platform project ID](https://support.google.com/cloud/answer/6158840) and `{location}` is a Cloud region. Examples: `projects/my-project-123`, `projects/my-project-123/locations/global`. For a list of supported locations, see [Supported Regions](https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. */
  projectName: string;
}

export const DeleteEventsProjectsRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectsId}/events" }),
  svc,
) as unknown as Schema.Schema<DeleteEventsProjectsRequest>;

export type DeleteEventsProjectsResponse = DeleteEventsResponse;
export const DeleteEventsProjectsResponse = DeleteEventsResponse;

export type DeleteEventsProjectsError = CommonErrors;

export const deleteEventsProjects: API.OperationMethod<DeleteEventsProjectsRequest, DeleteEventsProjectsResponse, DeleteEventsProjectsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteEventsProjectsRequest,
  output: DeleteEventsProjectsResponse,
  errors: [],
}));

/** Get the specified group. */
export interface GetProjectsGroupsRequest {
  /** Required. The group resource name. Written as either `projects/{projectID}/groups/{group_id}` or `projects/{projectID}/locations/{location}/groups/{group_id}`. Call groupStats.list to return a list of groups belonging to this project. Examples: `projects/my-project-123/groups/my-group`, `projects/my-project-123/locations/global/groups/my-group` In the group resource name, the `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see [Google Cloud Privacy Notice](https://cloud.google.com/terms/cloud-privacy-notice). For a list of supported locations, see [Supported Regions](https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. */
  groupName: string;
}

export const GetProjectsGroupsRequest = Schema.Struct({
  groupName: Schema.String.pipe(T.HttpPath("groupName")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/groups/{groupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsGroupsRequest>;

export type GetProjectsGroupsResponse = ErrorGroup;
export const GetProjectsGroupsResponse = ErrorGroup;

export type GetProjectsGroupsError = CommonErrors;

export const getProjectsGroups: API.OperationMethod<GetProjectsGroupsRequest, GetProjectsGroupsResponse, GetProjectsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsGroupsRequest,
  output: GetProjectsGroupsResponse,
  errors: [],
}));

/** Replace the data for the specified group. Fails if the group does not exist. */
export interface UpdateProjectsGroupsRequest {
  /** The group resource name. Written as `projects/{projectID}/groups/{group_id}` or `projects/{projectID}/locations/{location}/groups/{group_id}` Examples: `projects/my-project-123/groups/my-group`, `projects/my-project-123/locations/us-central1/groups/my-group` In the group resource name, the `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see [Google Cloud Privacy Notice](https://cloud.google.com/terms/cloud-privacy-notice). For a list of supported locations, see [Supported Regions](https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. */
  name: string;
  /** Request body */
  body?: ErrorGroup;
}

export const UpdateProjectsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ErrorGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1beta1/projects/{projectsId}/groups/{groupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsGroupsRequest>;

export type UpdateProjectsGroupsResponse = ErrorGroup;
export const UpdateProjectsGroupsResponse = ErrorGroup;

export type UpdateProjectsGroupsError = CommonErrors;

export const updateProjectsGroups: API.OperationMethod<UpdateProjectsGroupsRequest, UpdateProjectsGroupsResponse, UpdateProjectsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsGroupsRequest,
  output: UpdateProjectsGroupsResponse,
  errors: [],
}));

/** Lists the specified groups. */
export interface ListProjectsGroupStatsRequest {
  /** Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectID}` or `projects/{projectNumber}`, where `{projectID}` and `{projectNumber}` can be found in the [Google Cloud console](https://support.google.com/cloud/answer/6158840). It may also include a location, such as `projects/{projectID}/locations/{location}` where `{location}` is a cloud region. Examples: `projects/my-project-123`, `projects/5551234`, `projects/my-project-123/locations/us-central1`, `projects/5551234/locations/us-central1`. For a list of supported locations, see [Supported Regions](https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. Use `-` as a wildcard to request group stats from all regions. */
  projectName: string;
  /** Optional. List all ErrorGroupStats with these IDs. The `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see [Google Cloud Privacy Notice] (https://cloud.google.com/terms/cloud-privacy-notice). */
  groupId?: string[];
  /** Optional. The exact value to match against [`ServiceContext.service`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.service). */
  "serviceFilter.service"?: string;
  /** Optional. The exact value to match against [`ServiceContext.version`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.version). */
  "serviceFilter.version"?: string;
  /** Optional. The exact value to match against [`ServiceContext.resource_type`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.resource_type). */
  "serviceFilter.resourceType"?: string;
  /** Restricts the query to the specified time range. */
  "timeRange.period"?: "PERIOD_UNSPECIFIED" | "PERIOD_1_HOUR" | "PERIOD_6_HOURS" | "PERIOD_1_DAY" | "PERIOD_1_WEEK" | "PERIOD_30_DAYS" | (string & {});
  /** Optional. The preferred duration for a single returned TimedCount. If not set, no timed counts are returned. */
  timedCountDuration?: string;
  /** Optional. The alignment of the timed counts to be returned. Default is `ALIGNMENT_EQUAL_AT_END`. */
  alignment?: "ERROR_COUNT_ALIGNMENT_UNSPECIFIED" | "ALIGNMENT_EQUAL_ROUNDED" | "ALIGNMENT_EQUAL_AT_END" | (string & {});
  /** Optional. Time where the timed counts shall be aligned if rounded alignment is chosen. Default is 00:00 UTC. */
  alignmentTime?: string;
  /** Optional. The sort order in which the results are returned. Default is `COUNT_DESC`. */
  order?: "GROUP_ORDER_UNSPECIFIED" | "COUNT_DESC" | "LAST_SEEN_DESC" | "CREATED_DESC" | "AFFECTED_USERS_DESC" | (string & {});
  /** Optional. The maximum number of results to return per response. Default is 20. */
  pageSize?: number;
  /** Optional. A next_page_token provided by a previous response. To view additional results, pass this token along with the identical query parameters as the first request. */
  pageToken?: string;
}

export const ListProjectsGroupStatsRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  groupId: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("groupId")),
  "serviceFilter.service": Schema.optional(Schema.String).pipe(T.HttpQuery("serviceFilter.service")),
  "serviceFilter.version": Schema.optional(Schema.String).pipe(T.HttpQuery("serviceFilter.version")),
  "serviceFilter.resourceType": Schema.optional(Schema.String).pipe(T.HttpQuery("serviceFilter.resourceType")),
  "timeRange.period": Schema.optional(Schema.String).pipe(T.HttpQuery("timeRange.period")),
  timedCountDuration: Schema.optional(Schema.String).pipe(T.HttpQuery("timedCountDuration")),
  alignment: Schema.optional(Schema.String).pipe(T.HttpQuery("alignment")),
  alignmentTime: Schema.optional(Schema.String).pipe(T.HttpQuery("alignmentTime")),
  order: Schema.optional(Schema.String).pipe(T.HttpQuery("order")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/groupStats" }),
  svc,
) as unknown as Schema.Schema<ListProjectsGroupStatsRequest>;

export type ListProjectsGroupStatsResponse = ListGroupStatsResponse;
export const ListProjectsGroupStatsResponse = ListGroupStatsResponse;

export type ListProjectsGroupStatsError = CommonErrors;

export const listProjectsGroupStats = API.makePaginated(() => ({
  input: ListProjectsGroupStatsRequest,
  output: ListProjectsGroupStatsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the specified events. */
export interface ListProjectsEventsRequest {
  /** Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectID}` or `projects/{projectID}/locations/{location}`, where `{projectID}` is the [Google Cloud Platform project ID](https://support.google.com/cloud/answer/6158840) and `{location}` is a Cloud region. Examples: `projects/my-project-123`, `projects/my-project-123/locations/global`. For a list of supported locations, see [Supported Regions](https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. */
  projectName: string;
  /** Required. The group for which events shall be returned. The `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see [Google Cloud Privacy Notice](https://cloud.google.com/terms/cloud-privacy-notice). */
  groupId?: string;
  /** Optional. The exact value to match against [`ServiceContext.service`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.service). */
  "serviceFilter.service"?: string;
  /** Optional. The exact value to match against [`ServiceContext.version`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.version). */
  "serviceFilter.version"?: string;
  /** Optional. The exact value to match against [`ServiceContext.resource_type`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.resource_type). */
  "serviceFilter.resourceType"?: string;
  /** Restricts the query to the specified time range. */
  "timeRange.period"?: "PERIOD_UNSPECIFIED" | "PERIOD_1_HOUR" | "PERIOD_6_HOURS" | "PERIOD_1_DAY" | "PERIOD_1_WEEK" | "PERIOD_30_DAYS" | (string & {});
  /** Optional. The maximum number of results to return per response. */
  pageSize?: number;
  /** Optional. A `next_page_token` provided by a previous response. */
  pageToken?: string;
}

export const ListProjectsEventsRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  groupId: Schema.optional(Schema.String).pipe(T.HttpQuery("groupId")),
  "serviceFilter.service": Schema.optional(Schema.String).pipe(T.HttpQuery("serviceFilter.service")),
  "serviceFilter.version": Schema.optional(Schema.String).pipe(T.HttpQuery("serviceFilter.version")),
  "serviceFilter.resourceType": Schema.optional(Schema.String).pipe(T.HttpQuery("serviceFilter.resourceType")),
  "timeRange.period": Schema.optional(Schema.String).pipe(T.HttpQuery("timeRange.period")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/events" }),
  svc,
) as unknown as Schema.Schema<ListProjectsEventsRequest>;

export type ListProjectsEventsResponse = ListEventsResponse;
export const ListProjectsEventsResponse = ListEventsResponse;

export type ListProjectsEventsError = CommonErrors;

export const listProjectsEvents = API.makePaginated(() => ({
  input: ListProjectsEventsRequest,
  output: ListProjectsEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Report an individual error event and record the event to a log. This endpoint accepts **either** an OAuth token, **or** an [API key](https://support.google.com/cloud/answer/6158862) for authentication. To use an API key, append it to the URL as the value of a `key` parameter. For example: `POST https://clouderrorreporting.googleapis.com/v1beta1/{projectName}/events:report?key=123ABC456` **Note:** [Error Reporting] (https://cloud.google.com/error-reporting) is a service built on Cloud Logging and can analyze log entries when all of the following are true: * Customer-managed encryption keys (CMEK) are disabled on the log bucket. * The log bucket satisfies one of the following: * The log bucket is stored in the same project where the logs originated. * The logs were routed to a project, and then that project stored those logs in a log bucket that it owns. */
export interface ReportProjectsEventsRequest {
  /** Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectId}`, where `{projectId}` is the [Google Cloud Platform project ID](https://support.google.com/cloud/answer/6158840). Example: // `projects/my-project-123`. */
  projectName: string;
  /** Request body */
  body?: ReportedErrorEvent;
}

export const ReportProjectsEventsRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  body: Schema.optional(ReportedErrorEvent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1beta1/projects/{projectsId}/events:report", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReportProjectsEventsRequest>;

export type ReportProjectsEventsResponse = ReportErrorEventResponse;
export const ReportProjectsEventsResponse = ReportErrorEventResponse;

export type ReportProjectsEventsError = CommonErrors;

export const reportProjectsEvents: API.OperationMethod<ReportProjectsEventsRequest, ReportProjectsEventsResponse, ReportProjectsEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReportProjectsEventsRequest,
  output: ReportProjectsEventsResponse,
  errors: [],
}));

/** Deletes all error events of a given project. */
export interface DeleteEventsProjectsLocationsRequest {
  /** Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectID}` or `projects/{projectID}/locations/{location}`, where `{projectID}` is the [Google Cloud Platform project ID](https://support.google.com/cloud/answer/6158840) and `{location}` is a Cloud region. Examples: `projects/my-project-123`, `projects/my-project-123/locations/global`. For a list of supported locations, see [Supported Regions](https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. */
  projectName: string;
}

export const DeleteEventsProjectsLocationsRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/events" }),
  svc,
) as unknown as Schema.Schema<DeleteEventsProjectsLocationsRequest>;

export type DeleteEventsProjectsLocationsResponse = DeleteEventsResponse;
export const DeleteEventsProjectsLocationsResponse = DeleteEventsResponse;

export type DeleteEventsProjectsLocationsError = CommonErrors;

export const deleteEventsProjectsLocations: API.OperationMethod<DeleteEventsProjectsLocationsRequest, DeleteEventsProjectsLocationsResponse, DeleteEventsProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteEventsProjectsLocationsRequest,
  output: DeleteEventsProjectsLocationsResponse,
  errors: [],
}));

/** Get the specified group. */
export interface GetProjectsLocationsGroupsRequest {
  /** Required. The group resource name. Written as either `projects/{projectID}/groups/{group_id}` or `projects/{projectID}/locations/{location}/groups/{group_id}`. Call groupStats.list to return a list of groups belonging to this project. Examples: `projects/my-project-123/groups/my-group`, `projects/my-project-123/locations/global/groups/my-group` In the group resource name, the `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see [Google Cloud Privacy Notice](https://cloud.google.com/terms/cloud-privacy-notice). For a list of supported locations, see [Supported Regions](https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. */
  groupName: string;
}

export const GetProjectsLocationsGroupsRequest = Schema.Struct({
  groupName: Schema.String.pipe(T.HttpPath("groupName")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/groups/{groupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGroupsRequest>;

export type GetProjectsLocationsGroupsResponse = ErrorGroup;
export const GetProjectsLocationsGroupsResponse = ErrorGroup;

export type GetProjectsLocationsGroupsError = CommonErrors;

export const getProjectsLocationsGroups: API.OperationMethod<GetProjectsLocationsGroupsRequest, GetProjectsLocationsGroupsResponse, GetProjectsLocationsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGroupsRequest,
  output: GetProjectsLocationsGroupsResponse,
  errors: [],
}));

/** Replace the data for the specified group. Fails if the group does not exist. */
export interface UpdateProjectsLocationsGroupsRequest {
  /** The group resource name. Written as `projects/{projectID}/groups/{group_id}` or `projects/{projectID}/locations/{location}/groups/{group_id}` Examples: `projects/my-project-123/groups/my-group`, `projects/my-project-123/locations/us-central1/groups/my-group` In the group resource name, the `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see [Google Cloud Privacy Notice](https://cloud.google.com/terms/cloud-privacy-notice). For a list of supported locations, see [Supported Regions](https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. */
  name: string;
  /** Request body */
  body?: ErrorGroup;
}

export const UpdateProjectsLocationsGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ErrorGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/groups/{groupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsLocationsGroupsRequest>;

export type UpdateProjectsLocationsGroupsResponse = ErrorGroup;
export const UpdateProjectsLocationsGroupsResponse = ErrorGroup;

export type UpdateProjectsLocationsGroupsError = CommonErrors;

export const updateProjectsLocationsGroups: API.OperationMethod<UpdateProjectsLocationsGroupsRequest, UpdateProjectsLocationsGroupsResponse, UpdateProjectsLocationsGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsLocationsGroupsRequest,
  output: UpdateProjectsLocationsGroupsResponse,
  errors: [],
}));

/** Lists the specified groups. */
export interface ListProjectsLocationsGroupStatsRequest {
  /** Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectID}` or `projects/{projectNumber}`, where `{projectID}` and `{projectNumber}` can be found in the [Google Cloud console](https://support.google.com/cloud/answer/6158840). It may also include a location, such as `projects/{projectID}/locations/{location}` where `{location}` is a cloud region. Examples: `projects/my-project-123`, `projects/5551234`, `projects/my-project-123/locations/us-central1`, `projects/5551234/locations/us-central1`. For a list of supported locations, see [Supported Regions](https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. Use `-` as a wildcard to request group stats from all regions. */
  projectName: string;
  /** Optional. List all ErrorGroupStats with these IDs. The `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see [Google Cloud Privacy Notice] (https://cloud.google.com/terms/cloud-privacy-notice). */
  groupId?: string[];
  /** Optional. The exact value to match against [`ServiceContext.service`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.service). */
  "serviceFilter.service"?: string;
  /** Optional. The exact value to match against [`ServiceContext.version`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.version). */
  "serviceFilter.version"?: string;
  /** Optional. The exact value to match against [`ServiceContext.resource_type`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.resource_type). */
  "serviceFilter.resourceType"?: string;
  /** Restricts the query to the specified time range. */
  "timeRange.period"?: "PERIOD_UNSPECIFIED" | "PERIOD_1_HOUR" | "PERIOD_6_HOURS" | "PERIOD_1_DAY" | "PERIOD_1_WEEK" | "PERIOD_30_DAYS" | (string & {});
  /** Optional. The preferred duration for a single returned TimedCount. If not set, no timed counts are returned. */
  timedCountDuration?: string;
  /** Optional. The alignment of the timed counts to be returned. Default is `ALIGNMENT_EQUAL_AT_END`. */
  alignment?: "ERROR_COUNT_ALIGNMENT_UNSPECIFIED" | "ALIGNMENT_EQUAL_ROUNDED" | "ALIGNMENT_EQUAL_AT_END" | (string & {});
  /** Optional. Time where the timed counts shall be aligned if rounded alignment is chosen. Default is 00:00 UTC. */
  alignmentTime?: string;
  /** Optional. The sort order in which the results are returned. Default is `COUNT_DESC`. */
  order?: "GROUP_ORDER_UNSPECIFIED" | "COUNT_DESC" | "LAST_SEEN_DESC" | "CREATED_DESC" | "AFFECTED_USERS_DESC" | (string & {});
  /** Optional. The maximum number of results to return per response. Default is 20. */
  pageSize?: number;
  /** Optional. A next_page_token provided by a previous response. To view additional results, pass this token along with the identical query parameters as the first request. */
  pageToken?: string;
}

export const ListProjectsLocationsGroupStatsRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  groupId: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("groupId")),
  "serviceFilter.service": Schema.optional(Schema.String).pipe(T.HttpQuery("serviceFilter.service")),
  "serviceFilter.version": Schema.optional(Schema.String).pipe(T.HttpQuery("serviceFilter.version")),
  "serviceFilter.resourceType": Schema.optional(Schema.String).pipe(T.HttpQuery("serviceFilter.resourceType")),
  "timeRange.period": Schema.optional(Schema.String).pipe(T.HttpQuery("timeRange.period")),
  timedCountDuration: Schema.optional(Schema.String).pipe(T.HttpQuery("timedCountDuration")),
  alignment: Schema.optional(Schema.String).pipe(T.HttpQuery("alignment")),
  alignmentTime: Schema.optional(Schema.String).pipe(T.HttpQuery("alignmentTime")),
  order: Schema.optional(Schema.String).pipe(T.HttpQuery("order")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/groupStats" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGroupStatsRequest>;

export type ListProjectsLocationsGroupStatsResponse = ListGroupStatsResponse;
export const ListProjectsLocationsGroupStatsResponse = ListGroupStatsResponse;

export type ListProjectsLocationsGroupStatsError = CommonErrors;

export const listProjectsLocationsGroupStats = API.makePaginated(() => ({
  input: ListProjectsLocationsGroupStatsRequest,
  output: ListProjectsLocationsGroupStatsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the specified events. */
export interface ListProjectsLocationsEventsRequest {
  /** Required. The resource name of the Google Cloud Platform project. Written as `projects/{projectID}` or `projects/{projectID}/locations/{location}`, where `{projectID}` is the [Google Cloud Platform project ID](https://support.google.com/cloud/answer/6158840) and `{location}` is a Cloud region. Examples: `projects/my-project-123`, `projects/my-project-123/locations/global`. For a list of supported locations, see [Supported Regions](https://cloud.google.com/logging/docs/region-support). `global` is the default when unspecified. */
  projectName: string;
  /** Required. The group for which events shall be returned. The `group_id` is a unique identifier for a particular error group. The identifier is derived from key parts of the error-log content and is treated as Service Data. For information about how Service Data is handled, see [Google Cloud Privacy Notice](https://cloud.google.com/terms/cloud-privacy-notice). */
  groupId?: string;
  /** Optional. The exact value to match against [`ServiceContext.service`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.service). */
  "serviceFilter.service"?: string;
  /** Optional. The exact value to match against [`ServiceContext.version`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.version). */
  "serviceFilter.version"?: string;
  /** Optional. The exact value to match against [`ServiceContext.resource_type`](/error-reporting/reference/rest/v1beta1/ServiceContext#FIELDS.resource_type). */
  "serviceFilter.resourceType"?: string;
  /** Restricts the query to the specified time range. */
  "timeRange.period"?: "PERIOD_UNSPECIFIED" | "PERIOD_1_HOUR" | "PERIOD_6_HOURS" | "PERIOD_1_DAY" | "PERIOD_1_WEEK" | "PERIOD_30_DAYS" | (string & {});
  /** Optional. The maximum number of results to return per response. */
  pageSize?: number;
  /** Optional. A `next_page_token` provided by a previous response. */
  pageToken?: string;
}

export const ListProjectsLocationsEventsRequest = Schema.Struct({
  projectName: Schema.String.pipe(T.HttpPath("projectName")),
  groupId: Schema.optional(Schema.String).pipe(T.HttpQuery("groupId")),
  "serviceFilter.service": Schema.optional(Schema.String).pipe(T.HttpQuery("serviceFilter.service")),
  "serviceFilter.version": Schema.optional(Schema.String).pipe(T.HttpQuery("serviceFilter.version")),
  "serviceFilter.resourceType": Schema.optional(Schema.String).pipe(T.HttpQuery("serviceFilter.resourceType")),
  "timeRange.period": Schema.optional(Schema.String).pipe(T.HttpQuery("timeRange.period")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1beta1/projects/{projectsId}/locations/{locationsId}/events" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsEventsRequest>;

export type ListProjectsLocationsEventsResponse = ListEventsResponse;
export const ListProjectsLocationsEventsResponse = ListEventsResponse;

export type ListProjectsLocationsEventsError = CommonErrors;

export const listProjectsLocationsEvents = API.makePaginated(() => ({
  input: ListProjectsLocationsEventsRequest,
  output: ListProjectsLocationsEventsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

