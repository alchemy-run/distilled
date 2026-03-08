// ==========================================================================
// Service Control API (servicecontrol v1)
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
  name: "servicecontrol",
  version: "v1",
  rootUrl: "https://servicecontrol.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface ExplicitBuckets {
  /** 'bound' is a list of strictly increasing boundaries between buckets. Note that a list of length N-1 defines N buckets because of fenceposting. See comments on `bucket_options` for details. The i'th finite bucket covers the interval [bound[i-1], bound[i]) where i ranges from 1 to bound_size() - 1. Note that there are no finite buckets at all if 'bound' only contains a single element; in that special case the single bound defines the boundary between the underflow and overflow buckets. bucket number lower bound upper bound i == 0 (underflow) -inf bound[i] 0 < i < bound_size() bound[i-1] bound[i] i == bound_size() (overflow) bound[i-1] +inf */
  bounds?: Array<number>;
}

export const ExplicitBuckets: Schema.Schema<ExplicitBuckets> = Schema.suspend(
  () =>
    Schema.Struct({
      bounds: Schema.optional(Schema.Array(Schema.Number)),
    }),
).annotate({
  identifier: "ExplicitBuckets",
}) as any as Schema.Schema<ExplicitBuckets>;

export interface HttpRequest {
  /** The number of HTTP response bytes inserted into cache. Set only when a cache fill was attempted. */
  cacheFillBytes?: string;
  /** Whether or not an entity was served from cache (with or without validation). */
  cacheHit?: boolean;
  /** The IP address (IPv4 or IPv6) of the origin server that the request was sent to. */
  serverIp?: string;
  /** The IP address (IPv4 or IPv6) of the client that issued the HTTP request. Examples: `"192.168.1.1"`, `"FE80::0202:B3FF:FE1E:8329"`. */
  remoteIp?: string;
  /** Protocol used for the request. Examples: "HTTP/1.1", "HTTP/2", "websocket" */
  protocol?: string;
  /** The referer URL of the request, as defined in [HTTP/1.1 Header Field Definitions](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html). */
  referer?: string;
  /** The user agent sent by the client. Example: `"Mozilla/4.0 (compatible; MSIE 6.0; Windows 98; Q312461; .NET CLR 1.0.3705)"`. */
  userAgent?: string;
  /** The request method. Examples: `"GET"`, `"HEAD"`, `"PUT"`, `"POST"`. */
  requestMethod?: string;
  /** The request processing latency on the server, from the time the request was received until the response was sent. */
  latency?: string;
  /** The size of the HTTP request message in bytes, including the request headers and the request body. */
  requestSize?: string;
  /** The response code indicating the status of the response. Examples: 200, 404. */
  status?: number;
  /** Whether or not a cache lookup was attempted. */
  cacheLookup?: boolean;
  /** Whether or not the response was validated with the origin server before being served from cache. This field is only meaningful if `cache_hit` is True. */
  cacheValidatedWithOriginServer?: boolean;
  /** The scheme (http, https), the host name, the path, and the query portion of the URL that was requested. Example: `"http://example.com/some/info?color=red"`. */
  requestUrl?: string;
  /** The size of the HTTP response message sent back to the client, in bytes, including the response headers and the response body. */
  responseSize?: string;
}

export const HttpRequest: Schema.Schema<HttpRequest> = Schema.suspend(() =>
  Schema.Struct({
    cacheFillBytes: Schema.optional(Schema.String),
    cacheHit: Schema.optional(Schema.Boolean),
    serverIp: Schema.optional(Schema.String),
    remoteIp: Schema.optional(Schema.String),
    protocol: Schema.optional(Schema.String),
    referer: Schema.optional(Schema.String),
    userAgent: Schema.optional(Schema.String),
    requestMethod: Schema.optional(Schema.String),
    latency: Schema.optional(Schema.String),
    requestSize: Schema.optional(Schema.String),
    status: Schema.optional(Schema.Number),
    cacheLookup: Schema.optional(Schema.Boolean),
    cacheValidatedWithOriginServer: Schema.optional(Schema.Boolean),
    requestUrl: Schema.optional(Schema.String),
    responseSize: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "HttpRequest" }) as any as Schema.Schema<HttpRequest>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface TruncatableString {
  /** The shortened string. For example, if the original string is 500 bytes long and the limit of the string is 128 bytes, then `value` contains the first 128 bytes of the 500-byte string. Truncation always happens on a UTF8 character boundary. If there are multi-byte characters in the string, then the length of the shortened string might be less than the size limit. */
  value?: string;
  /** The number of bytes removed from the original string. If this value is 0, then the string was not shortened. */
  truncatedByteCount?: number;
}

export const TruncatableString: Schema.Schema<TruncatableString> =
  Schema.suspend(() =>
    Schema.Struct({
      value: Schema.optional(Schema.String),
      truncatedByteCount: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "TruncatableString",
  }) as any as Schema.Schema<TruncatableString>;

export interface AttributeValue {
  /** A Boolean value represented by `true` or `false`. */
  boolValue?: boolean;
  /** A string up to 256 bytes long. */
  stringValue?: TruncatableString;
  /** A 64-bit signed integer. */
  intValue?: string;
}

export const AttributeValue: Schema.Schema<AttributeValue> = Schema.suspend(
  () =>
    Schema.Struct({
      boolValue: Schema.optional(Schema.Boolean),
      stringValue: Schema.optional(TruncatableString),
      intValue: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "AttributeValue",
}) as any as Schema.Schema<AttributeValue>;

export interface Attributes {
  /** The number of attributes that were discarded. Attributes can be discarded because their keys are too long or because there are too many attributes. If this value is 0 then all attributes are valid. */
  droppedAttributesCount?: number;
  /** The set of attributes. Each attribute's key can be up to 128 bytes long. The value can be a string up to 256 bytes, a signed 64-bit integer, or the Boolean values `true` and `false`. For example: "/instance_id": "my-instance" "/http/user_agent": "" "/http/request_bytes": 300 "example.com/myattribute": true */
  attributeMap?: Record<string, AttributeValue>;
}

export const Attributes: Schema.Schema<Attributes> = Schema.suspend(() =>
  Schema.Struct({
    droppedAttributesCount: Schema.optional(Schema.Number),
    attributeMap: Schema.optional(Schema.Record(Schema.String, AttributeValue)),
  }),
).annotate({ identifier: "Attributes" }) as any as Schema.Schema<Attributes>;

export interface TraceSpan {
  /** An optional number of child spans that were generated while this span was active. If set, allows implementation to detect missing child spans. */
  childSpanCount?: number;
  /** An optional final status for this span. */
  status?: Status;
  /** The [SPAN_ID] of this span's parent span. If this is a root span, then this field must be empty. */
  parentSpanId?: string;
  /** A set of attributes on the span. You can have up to 32 attributes per span. */
  attributes?: Attributes;
  /** Distinguishes between spans generated in a particular context. For example, two spans with the same name may be distinguished using `CLIENT` (caller) and `SERVER` (callee) to identify an RPC call. */
  spanKind?:
    | "SPAN_KIND_UNSPECIFIED"
    | "INTERNAL"
    | "SERVER"
    | "CLIENT"
    | "PRODUCER"
    | "CONSUMER"
    | (string & {});
  /** The end time of the span. On the client side, this is the time kept by the local machine where the span execution ends. On the server side, this is the time when the server application handler stops running. */
  endTime?: string;
  /** (Optional) Set this parameter to indicate whether this span is in the same process as its parent. If you do not set this parameter, Stackdriver Trace is unable to take advantage of this helpful information. */
  sameProcessAsParentSpan?: boolean;
  /** A description of the span's operation (up to 128 bytes). Stackdriver Trace displays the description in the Google Cloud Platform Console. For example, the display name can be a qualified method name or a file name and a line number where the operation is called. A best practice is to use the same display name within an application and at the same call point. This makes it easier to correlate spans in different traces. */
  displayName?: TruncatableString;
  /** The [SPAN_ID] portion of the span's resource name. */
  spanId?: string;
  /** The start time of the span. On the client side, this is the time kept by the local machine where the span execution starts. On the server side, this is the time when the server's application handler starts running. */
  startTime?: string;
  /** The resource name of the span in the following format: projects/[PROJECT_ID]/traces/[TRACE_ID]/spans/SPAN_ID is a unique identifier for a trace within a project; it is a 32-character hexadecimal encoding of a 16-byte array. [SPAN_ID] is a unique identifier for a span within a trace; it is a 16-character hexadecimal encoding of an 8-byte array. */
  name?: string;
}

export const TraceSpan: Schema.Schema<TraceSpan> = Schema.suspend(() =>
  Schema.Struct({
    childSpanCount: Schema.optional(Schema.Number),
    status: Schema.optional(Status),
    parentSpanId: Schema.optional(Schema.String),
    attributes: Schema.optional(Attributes),
    spanKind: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    sameProcessAsParentSpan: Schema.optional(Schema.Boolean),
    displayName: Schema.optional(TruncatableString),
    spanId: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "TraceSpan" }) as any as Schema.Schema<TraceSpan>;

export interface ResourceLocation {
  /** The locations of a resource prior to the execution of the operation. Requests that mutate the resource's location must populate both the 'original_locations' as well as the 'current_locations' fields. For example: "europe-west1-a" "us-east1" "nam3" */
  originalLocations?: Array<string>;
  /** The locations of a resource after the execution of the operation. Requests to create or delete a location based resource must populate the 'current_locations' field and not the 'original_locations' field. For example: "europe-west1-a" "us-east1" "nam3" */
  currentLocations?: Array<string>;
}

export const ResourceLocation: Schema.Schema<ResourceLocation> = Schema.suspend(
  () =>
    Schema.Struct({
      originalLocations: Schema.optional(Schema.Array(Schema.String)),
      currentLocations: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "ResourceLocation",
}) as any as Schema.Schema<ResourceLocation>;

export interface LinearBuckets {
  /** The number of finite buckets. With the underflow and overflow buckets, the total number of buckets is `num_finite_buckets` + 2. See comments on `bucket_options` for details. */
  numFiniteBuckets?: number;
  /** The i'th linear bucket covers the interval [offset + (i-1) * width, offset + i * width) where i ranges from 1 to num_finite_buckets, inclusive. Must be strictly positive. */
  width?: number;
  /** The i'th linear bucket covers the interval [offset + (i-1) * width, offset + i * width) where i ranges from 1 to num_finite_buckets, inclusive. */
  offset?: number;
}

export const LinearBuckets: Schema.Schema<LinearBuckets> = Schema.suspend(() =>
  Schema.Struct({
    numFiniteBuckets: Schema.optional(Schema.Number),
    width: Schema.optional(Schema.Number),
    offset: Schema.optional(Schema.Number),
  }),
).annotate({
  identifier: "LinearBuckets",
}) as any as Schema.Schema<LinearBuckets>;

export interface ReportError {
  /** Details of the error when processing the Operation. */
  status?: Status;
  /** The Operation.operation_id value from the request. */
  operationId?: string;
}

export const ReportError: Schema.Schema<ReportError> = Schema.suspend(() =>
  Schema.Struct({
    status: Schema.optional(Status),
    operationId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ReportError" }) as any as Schema.Schema<ReportError>;

export interface ReportResponse {
  /** The actual config id used to process the request. */
  serviceConfigId?: string;
  /** Partial failures, one for each `Operation` in the request that failed processing. There are three possible combinations of the RPC status: 1. The combination of a successful RPC status and an empty `report_errors` list indicates a complete success where all `Operations` in the request are processed successfully. 2. The combination of a successful RPC status and a non-empty `report_errors` list indicates a partial success where some `Operations` in the request succeeded. Each `Operation` that failed processing has a corresponding item in this list. 3. A failed RPC status indicates a general non-deterministic failure. When this happens, it's impossible to know which of the 'Operations' in the request succeeded or failed. */
  reportErrors?: Array<ReportError>;
  /** The current service rollout id used to process the request. */
  serviceRolloutId?: string;
}

export const ReportResponse: Schema.Schema<ReportResponse> = Schema.suspend(
  () =>
    Schema.Struct({
      serviceConfigId: Schema.optional(Schema.String),
      reportErrors: Schema.optional(Schema.Array(ReportError)),
      serviceRolloutId: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ReportResponse",
}) as any as Schema.Schema<ReportResponse>;

export interface Oauth {
  /** The optional OAuth client ID. This is the unique public identifier issued by an authorization server to a registered client application. Empty string is equivalent to no oauth client id. WARNING: This is for MCP tools/call and tools/list authorization and not for general use. */
  clientId?: string;
}

export const Oauth: Schema.Schema<Oauth> = Schema.suspend(() =>
  Schema.Struct({
    clientId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Oauth" }) as any as Schema.Schema<Oauth>;

export interface Auth {
  /** The authorized presenter of the credential. Reflects the optional Authorized Presenter (`azp`) claim within a JWT or the OAuth client id. For example, a Google Cloud Platform client id looks as follows: "123456789012.apps.googleusercontent.com". */
  presenter?: string;
  /** The intended audience(s) for this authentication information. Reflects the audience (`aud`) claim within a JWT. The audience value(s) depends on the `issuer`, but typically include one or more of the following pieces of information: * The services intended to receive the credential. For example, ["https://pubsub.googleapis.com/", "https://storage.googleapis.com/"]. * A set of service-based scopes. For example, ["https://www.googleapis.com/auth/cloud-platform"]. * The client id of an app, such as the Firebase project id for JWTs from Firebase Auth. Consult the documentation for the credential issuer to determine the information provided. */
  audiences?: Array<string>;
  /** The authenticated principal. Reflects the issuer (`iss`) and subject (`sub`) claims within a JWT. The issuer and subject should be `/` delimited, with `/` percent-encoded within the subject fragment. For Google accounts, the principal format is: "https://accounts.google.com/{id}" */
  principal?: string;
  /** Structured claims presented with the credential. JWTs include `{key: value}` pairs for standard and private claims. The following is a subset of the standard required and optional claims that would typically be presented for a Google-based JWT: {'iss': 'accounts.google.com', 'sub': '113289723416554971153', 'aud': ['123456789012', 'pubsub.googleapis.com'], 'azp': '123456789012.apps.googleusercontent.com', 'email': 'jsmith@example.com', 'iat': 1353601026, 'exp': 1353604926} SAML assertions are similarly specified, but with an identity provider dependent structure. */
  claims?: Record<string, unknown>;
  /** Attributes of the OAuth token associated with the request. */
  oauth?: Oauth;
  /** A list of access level resource names that allow resources to be accessed by authenticated requester. It is part of Secure GCP processing for the incoming request. An access level string has the format: "//{api_service_name}/accessPolicies/{policy_id}/accessLevels/{short_name}" Example: "//accesscontextmanager.googleapis.com/accessPolicies/MY_POLICY_ID/accessLevels/MY_LEVEL" */
  accessLevels?: Array<string>;
}

export const Auth: Schema.Schema<Auth> = Schema.suspend(() =>
  Schema.Struct({
    presenter: Schema.optional(Schema.String),
    audiences: Schema.optional(Schema.Array(Schema.String)),
    principal: Schema.optional(Schema.String),
    claims: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    oauth: Schema.optional(Oauth),
    accessLevels: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "Auth" }) as any as Schema.Schema<Auth>;

export interface Request {
  /** The HTTP request size in bytes. If unknown, it must be -1. */
  size?: string;
  /** The HTTP request headers. If multiple headers share the same key, they must be merged according to the HTTP spec. All header keys must be lowercased, because HTTP header keys are case-insensitive. */
  headers?: Record<string, string>;
  /** A special parameter for request reason. It is used by security systems to associate auditing information with a request. */
  reason?: string;
  /** The HTTP URL scheme, such as `http` and `https`. */
  scheme?: string;
  /** The request authentication. May be absent for unauthenticated requests. Derived from the HTTP request `Authorization` header or equivalent. */
  auth?: Auth;
  /** The HTTP URL path, excluding the query parameters. */
  path?: string;
  /** The HTTP request method, such as `GET`, `POST`. */
  method?: string;
  /** The unique ID for a request, which can be propagated to downstream systems. The ID should have low probability of collision within a single day for a specific service. */
  id?: string;
  /** The HTTP request `Host` header value. */
  host?: string;
  /** The values from Origin header from the HTTP request, such as "https://console.cloud.google.com". Modern browsers can only have one origin. Special browsers and/or HTTP clients may require multiple origins. */
  origin?: string;
  /** The network protocol used with the request, such as "http/1.1", "spdy/3", "h2", "h2c", "webrtc", "tcp", "udp", "quic". See https://www.iana.org/assignments/tls-extensiontype-values/tls-extensiontype-values.xhtml#alpn-protocol-ids for details. */
  protocol?: string;
  /** The HTTP URL query in the format of `name1=value1&name2=value2`, as it appears in the first line of the HTTP request. No decoding is performed. */
  query?: string;
  /** The timestamp when the `destination` service receives the last byte of the request. */
  time?: string;
}

export const Request: Schema.Schema<Request> = Schema.suspend(() =>
  Schema.Struct({
    size: Schema.optional(Schema.String),
    headers: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    reason: Schema.optional(Schema.String),
    scheme: Schema.optional(Schema.String),
    auth: Schema.optional(Auth),
    path: Schema.optional(Schema.String),
    method: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
    host: Schema.optional(Schema.String),
    origin: Schema.optional(Schema.String),
    protocol: Schema.optional(Schema.String),
    query: Schema.optional(Schema.String),
    time: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Request" }) as any as Schema.Schema<Request>;

export interface V1LogEntryOperation {
  /** Optional. Set this to True if this is the last log entry in the operation. */
  last?: boolean;
  /** Optional. An arbitrary producer identifier. The combination of `id` and `producer` must be globally unique. Examples for `producer`: `"MyDivision.MyBigCompany.com"`, `"github.com/MyProject/MyApplication"`. */
  producer?: string;
  /** Optional. An arbitrary operation identifier. Log entries with the same identifier are assumed to be part of the same operation. */
  id?: string;
  /** Optional. Set this to True if this is the first log entry in the operation. */
  first?: boolean;
}

export const V1LogEntryOperation: Schema.Schema<V1LogEntryOperation> =
  Schema.suspend(() =>
    Schema.Struct({
      last: Schema.optional(Schema.Boolean),
      producer: Schema.optional(Schema.String),
      id: Schema.optional(Schema.String),
      first: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "V1LogEntryOperation",
  }) as any as Schema.Schema<V1LogEntryOperation>;

export interface ExponentialBuckets {
  /** The i'th exponential bucket covers the interval [scale * growth_factor^(i-1), scale * growth_factor^i) where i ranges from 1 to num_finite_buckets inclusive. Must be > 0. */
  scale?: number;
  /** The i'th exponential bucket covers the interval [scale * growth_factor^(i-1), scale * growth_factor^i) where i ranges from 1 to num_finite_buckets inclusive. Must be larger than 1.0. */
  growthFactor?: number;
  /** The number of finite buckets. With the underflow and overflow buckets, the total number of buckets is `num_finite_buckets` + 2. See comments on `bucket_options` for details. */
  numFiniteBuckets?: number;
}

export const ExponentialBuckets: Schema.Schema<ExponentialBuckets> =
  Schema.suspend(() =>
    Schema.Struct({
      scale: Schema.optional(Schema.Number),
      growthFactor: Schema.optional(Schema.Number),
      numFiniteBuckets: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "ExponentialBuckets",
  }) as any as Schema.Schema<ExponentialBuckets>;

export interface Exemplar {
  /** Value of the exemplar point. This value determines to which bucket the exemplar belongs. */
  value?: number;
  /** The observation (sampling) time of the above value. */
  timestamp?: string;
  /** Contextual information about the example value. Examples are: Trace: type.googleapis.com/google.monitoring.v3.SpanContext Literal string: type.googleapis.com/google.protobuf.StringValue Labels dropped during aggregation: type.googleapis.com/google.monitoring.v3.DroppedLabels There may be only a single attachment of any given message type in a single exemplar, and this is enforced by the system. */
  attachments?: Array<Record<string, unknown>>;
}

export const Exemplar: Schema.Schema<Exemplar> = Schema.suspend(() =>
  Schema.Struct({
    value: Schema.optional(Schema.Number),
    timestamp: Schema.optional(Schema.String),
    attachments: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }),
).annotate({ identifier: "Exemplar" }) as any as Schema.Schema<Exemplar>;

export interface Distribution {
  /** Buckets with constant width. */
  linearBuckets?: LinearBuckets;
  /** The number of samples in each histogram bucket. `bucket_counts` are optional. If present, they must sum to the `count` value. The buckets are defined below in `bucket_option`. There are N buckets. `bucket_counts[0]` is the number of samples in the underflow bucket. `bucket_counts[1]` to `bucket_counts[N-1]` are the numbers of samples in each of the finite buckets. And `bucket_counts[N]` is the number of samples in the overflow bucket. See the comments of `bucket_option` below for more details. Any suffix of trailing zeros may be omitted. */
  bucketCounts?: Array<string>;
  /** The total number of samples in the distribution. Must be >= 0. */
  count?: string;
  /** Buckets with exponentially growing width. */
  exponentialBuckets?: ExponentialBuckets;
  /** The sum of squared deviations from the mean: Sum[i=1..count]((x_i - mean)^2) where each x_i is a sample values. If `count` is zero then this field must be zero, otherwise validation of the request fails. */
  sumOfSquaredDeviation?: number;
  /** Example points. Must be in increasing order of `value` field. */
  exemplars?: Array<Exemplar>;
  /** The maximum of the population of values. Ignored if `count` is zero. */
  maximum?: number;
  /** The arithmetic mean of the samples in the distribution. If `count` is zero then this field must be zero. */
  mean?: number;
  /** The minimum of the population of values. Ignored if `count` is zero. */
  minimum?: number;
  /** Buckets with arbitrary user-provided width. */
  explicitBuckets?: ExplicitBuckets;
}

export const Distribution: Schema.Schema<Distribution> = Schema.suspend(() =>
  Schema.Struct({
    linearBuckets: Schema.optional(LinearBuckets),
    bucketCounts: Schema.optional(Schema.Array(Schema.String)),
    count: Schema.optional(Schema.String),
    exponentialBuckets: Schema.optional(ExponentialBuckets),
    sumOfSquaredDeviation: Schema.optional(Schema.Number),
    exemplars: Schema.optional(Schema.Array(Exemplar)),
    maximum: Schema.optional(Schema.Number),
    mean: Schema.optional(Schema.Number),
    minimum: Schema.optional(Schema.Number),
    explicitBuckets: Schema.optional(ExplicitBuckets),
  }),
).annotate({
  identifier: "Distribution",
}) as any as Schema.Schema<Distribution>;

export interface Money {
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const Money: Schema.Schema<Money> = Schema.suspend(() =>
  Schema.Struct({
    units: Schema.optional(Schema.String),
    currencyCode: Schema.optional(Schema.String),
    nanos: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Money" }) as any as Schema.Schema<Money>;

export interface MetricValue {
  /** A signed 64-bit integer value. */
  int64Value?: string;
  /** A money value. */
  moneyValue?: Money;
  /** The labels describing the metric value. See comments on google.api.servicecontrol.v1.Operation.labels for the overriding relationship. Note that this map must not contain monitored resource labels. */
  labels?: Record<string, string>;
  /** A distribution value. */
  distributionValue?: Distribution;
  /** The end of the time period over which this metric value's measurement applies. If not specified, google.api.servicecontrol.v1.Operation.end_time will be used. */
  endTime?: string;
  /** The start of the time period over which this metric value's measurement applies. The time period has different semantics for different metric types (cumulative, delta, and gauge). See the metric definition documentation in the service configuration for details. If not specified, google.api.servicecontrol.v1.Operation.start_time will be used. */
  startTime?: string;
  /** A boolean value. */
  boolValue?: boolean;
  /** A text string value. */
  stringValue?: string;
  /** A double precision floating point value. */
  doubleValue?: number;
}

export const MetricValue: Schema.Schema<MetricValue> = Schema.suspend(() =>
  Schema.Struct({
    int64Value: Schema.optional(Schema.String),
    moneyValue: Schema.optional(Money),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    distributionValue: Schema.optional(Distribution),
    endTime: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    boolValue: Schema.optional(Schema.Boolean),
    stringValue: Schema.optional(Schema.String),
    doubleValue: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "MetricValue" }) as any as Schema.Schema<MetricValue>;

export interface MetricValueSet {
  /** The metric name defined in the service configuration. */
  metricName?: string;
  /** The values in this metric. */
  metricValues?: Array<MetricValue>;
}

export const MetricValueSet: Schema.Schema<MetricValueSet> = Schema.suspend(
  () =>
    Schema.Struct({
      metricName: Schema.optional(Schema.String),
      metricValues: Schema.optional(Schema.Array(MetricValue)),
    }),
).annotate({
  identifier: "MetricValueSet",
}) as any as Schema.Schema<MetricValueSet>;

export interface QuotaOperation {
  /** Represents information about this operation. Each MetricValueSet corresponds to a metric defined in the service configuration. The data type used in the MetricValueSet must agree with the data type specified in the metric definition. Within a single operation, it is not allowed to have more than one MetricValue instances that have the same metric names and identical label value combinations. If a request has such duplicated MetricValue instances, the entire request is rejected with an invalid argument error. This field is mutually exclusive with method_name. */
  quotaMetrics?: Array<MetricValueSet>;
  /** Identity of the operation. For Allocation Quota, this is expected to be unique within the scope of the service that generated the operation, and guarantees idempotency in case of retries. In order to ensure best performance and latency in the Quota backends, operation_ids are optimally associated with time, so that related operations can be accessed fast in storage. For this reason, the recommended token for services that intend to operate at a high QPS is Unix time in nanos + UUID */
  operationId?: string;
  /** Identity of the consumer for whom this quota operation is being performed. This can be in one of the following formats: project:, project_number:, api_key:. */
  consumerId?: string;
  /** Quota mode for this operation. */
  quotaMode?:
    | "UNSPECIFIED"
    | "NORMAL"
    | "BEST_EFFORT"
    | "CHECK_ONLY"
    | "ADJUST_ONLY"
    | (string & {});
  /** Labels describing the operation. */
  labels?: Record<string, string>;
  /** Fully qualified name of the API method for which this quota operation is requested. This name is used for matching quota rules or metric rules and billing status rules defined in service configuration. This field should not be set if any of the following is true: (1) the quota operation is performed on non-API resources. (2) quota_metrics is set because the caller is doing quota override. Example of an RPC method name: google.example.library.v1.LibraryService.CreateShelf */
  methodName?: string;
}

export const QuotaOperation: Schema.Schema<QuotaOperation> = Schema.suspend(
  () =>
    Schema.Struct({
      quotaMetrics: Schema.optional(Schema.Array(MetricValueSet)),
      operationId: Schema.optional(Schema.String),
      consumerId: Schema.optional(Schema.String),
      quotaMode: Schema.optional(Schema.String),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      methodName: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "QuotaOperation",
}) as any as Schema.Schema<QuotaOperation>;

export interface ViolationInfo {
  /** Optional. Constraint name */
  constraint?: string;
  /** Optional. Value that is being checked for the policy. This could be in encrypted form (if pii sensitive). This field will only be emitted in LIST_POLICY types */
  checkedValue?: string;
  /** Optional. Provides extra information for the specific violated constraint. See the constraint's documentation to determine if this field is populated and what the structure of the message should be. */
  constraintViolationInfo?: Record<string, unknown>;
  /** Optional. Error message that policy is indicating. */
  errorMessage?: string;
  /** Optional. Indicates the type of the policy. */
  policyType?:
    | "POLICY_TYPE_UNSPECIFIED"
    | "BOOLEAN_CONSTRAINT"
    | "LIST_CONSTRAINT"
    | "CUSTOM_CONSTRAINT"
    | (string & {});
}

export const ViolationInfo: Schema.Schema<ViolationInfo> = Schema.suspend(() =>
  Schema.Struct({
    constraint: Schema.optional(Schema.String),
    checkedValue: Schema.optional(Schema.String),
    constraintViolationInfo: Schema.optional(
      Schema.Record(Schema.String, Schema.Unknown),
    ),
    errorMessage: Schema.optional(Schema.String),
    policyType: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ViolationInfo",
}) as any as Schema.Schema<ViolationInfo>;

export interface OrgPolicyViolationInfo {
  /** Optional. Deprecated. Resource payload that is currently in scope and is subjected to orgpolicy conditions. This payload may be the subset of the actual Resource that may come in the request. */
  payload?: Record<string, unknown>;
  /** Optional. Policy violations */
  violationInfo?: Array<ViolationInfo>;
  /** Optional. Deprecated. Tags referenced on the resource at the time of evaluation. */
  resourceTags?: Record<string, string>;
  /** Optional. Resource type that the orgpolicy is checked against. Example: compute.googleapis.com/Instance, store.googleapis.com/bucket */
  resourceType?: string;
}

export const OrgPolicyViolationInfo: Schema.Schema<OrgPolicyViolationInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      violationInfo: Schema.optional(Schema.Array(ViolationInfo)),
      resourceTags: Schema.optional(
        Schema.Record(Schema.String, Schema.String),
      ),
      resourceType: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "OrgPolicyViolationInfo",
  }) as any as Schema.Schema<OrgPolicyViolationInfo>;

export interface PolicyViolationInfo {
  /** Indicates the orgpolicy violations for this resource. */
  orgPolicyViolationInfo?: OrgPolicyViolationInfo;
}

export const PolicyViolationInfo: Schema.Schema<PolicyViolationInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      orgPolicyViolationInfo: Schema.optional(OrgPolicyViolationInfo),
    }),
  ).annotate({
    identifier: "PolicyViolationInfo",
  }) as any as Schema.Schema<PolicyViolationInfo>;

export interface Resource {
  /** Immutable. The location of the resource. The location encoding is specific to the service provider, and new encoding may be introduced as the service evolves. For Google Cloud products, the encoding is what is used by Google Cloud APIs, such as `us-east1`, `aws-us-east-1`, and `azure-eastus2`. The semantics of `location` is identical to the `cloud.googleapis.com/location` label used by some Google Cloud APIs. */
  location?: string;
  /** The name of the service that this resource belongs to, such as `pubsub.googleapis.com`. The service may be different from the DNS hostname that actually serves the request. */
  service?: string;
  /** The labels or tags on the resource, such as AWS resource tags and Kubernetes resource labels. */
  labels?: Record<string, string>;
  /** Output only. The timestamp when the resource was deleted. If the resource is not deleted, this must be empty. */
  deleteTime?: string;
  /** Annotations is an unstructured key-value map stored with a resource that may be set by external tools to store and retrieve arbitrary metadata. They are not queryable and should be preserved when modifying objects. More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/ */
  annotations?: Record<string, string>;
  /** Mutable. The display name set by clients. Must be <= 63 characters. */
  displayName?: string;
  /** The unique identifier of the resource. UID is unique in the time and space for this resource within the scope of the service. It is typically generated by the server on successful creation of a resource and must not be changed. UID is used to uniquely identify resources with resource name reuses. This should be a UUID4. */
  uid?: string;
  /** Output only. An opaque value that uniquely identifies a version or generation of a resource. It can be used to confirm that the client and server agree on the ordering of a resource being written. */
  etag?: string;
  /** The stable identifier (name) of a resource on the `service`. A resource can be logically identified as "//{resource.service}/{resource.name}". The differences between a resource name and a URI are: * Resource name is a logical identifier, independent of network protocol and API version. For example, `//pubsub.googleapis.com/projects/123/topics/news-feed`. * URI often includes protocol and version information, so it can be used directly by applications. For example, `https://pubsub.googleapis.com/v1/projects/123/topics/news-feed`. See https://cloud.google.com/apis/design/resource_names for details. */
  name?: string;
  /** The type of the resource. The syntax is platform-specific because different platforms define their resources differently. For Google APIs, the type format must be "{service}/{kind}", such as "pubsub.googleapis.com/Topic". */
  type?: string;
  /** Output only. The timestamp when the resource was last updated. Any change to the resource made by users must refresh this value. Changes to a resource made by the service should refresh this value. */
  updateTime?: string;
  /** Output only. The timestamp when the resource was created. This may be either the time creation was initiated or when it was completed. */
  createTime?: string;
}

export const Resource: Schema.Schema<Resource> = Schema.suspend(() =>
  Schema.Struct({
    location: Schema.optional(Schema.String),
    service: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    deleteTime: Schema.optional(Schema.String),
    annotations: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    displayName: Schema.optional(Schema.String),
    uid: Schema.optional(Schema.String),
    etag: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    type: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Resource" }) as any as Schema.Schema<Resource>;

export interface AuthorizationInfo {
  /** The required IAM permission. */
  permission?: string;
  /** The type of the permission that was checked. For data access audit logs this corresponds with the permission type that must be enabled in the project/folder/organization IAM policy in order for the log to be written. */
  permissionType?:
    | "PERMISSION_TYPE_UNSPECIFIED"
    | "ADMIN_READ"
    | "ADMIN_WRITE"
    | "DATA_READ"
    | "DATA_WRITE"
    | (string & {});
  /** Resource attributes used in IAM condition evaluation. This field contains resource attributes like resource type and resource name. To get the whole view of the attributes used in IAM condition evaluation, the user must also look into `AuditLog.request_metadata.request_attributes`. */
  resourceAttributes?: Resource;
  /** Whether or not authorization for `resource` and `permission` was granted. */
  granted?: boolean;
  /** The resource being accessed, as a REST-style or cloud resource string. For example: bigquery.googleapis.com/projects/PROJECTID/datasets/DATASETID or projects/PROJECTID/datasets/DATASETID */
  resource?: string;
}

export const AuthorizationInfo: Schema.Schema<AuthorizationInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      permission: Schema.optional(Schema.String),
      permissionType: Schema.optional(Schema.String),
      resourceAttributes: Schema.optional(Resource),
      granted: Schema.optional(Schema.Boolean),
      resource: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AuthorizationInfo",
  }) as any as Schema.Schema<AuthorizationInfo>;

export interface ServiceMetadata {
  /** The service's fully qualified domain name, e.g. "dataproc.googleapis.com". */
  serviceDomain?: string;
  /** Additional metadata provided by service teams to describe service specific job information that was triggered by the original principal. */
  jobMetadata?: Record<string, unknown>;
  /** A string representing the principal_subject associated with the identity. For most identities, the format will be `principal://iam.googleapis.com/{identity pool name}/subject/{subject)` except for some GKE identities (GKE_WORKLOAD, FREEFORM, GKE_HUB_WORKLOAD) that are still in the legacy format `serviceAccount:{identity pool name}[{subject}]` If the identity is a Google account (e.g. workspace user account or service account), this will be the email of the prefixed by `serviceAccount:`. For example: `serviceAccount:my-service-account@project-1.iam.gserviceaccount.com`. If the identity is an individual user, the identity will be formatted as: `user:user_ABC@email.com`. */
  principalSubject?: string;
}

export const ServiceMetadata: Schema.Schema<ServiceMetadata> = Schema.suspend(
  () =>
    Schema.Struct({
      serviceDomain: Schema.optional(Schema.String),
      jobMetadata: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      principalSubject: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ServiceMetadata",
}) as any as Schema.Schema<ServiceMetadata>;

export interface ServiceDelegationHistory {
  /** Data identifying the service specific jobs or units of work that were involved in a chain of service calls. */
  serviceMetadata?: Array<ServiceMetadata>;
  /** The original end user who initiated the request to GCP. */
  originalPrincipal?: string;
}

export const ServiceDelegationHistory: Schema.Schema<ServiceDelegationHistory> =
  Schema.suspend(() =>
    Schema.Struct({
      serviceMetadata: Schema.optional(Schema.Array(ServiceMetadata)),
      originalPrincipal: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ServiceDelegationHistory",
  }) as any as Schema.Schema<ServiceDelegationHistory>;

export interface FirstPartyPrincipal {
  /** The email address of a Google account. . */
  principalEmail?: string;
  /** Metadata about the service that uses the service account. . */
  serviceMetadata?: Record<string, unknown>;
}

export const FirstPartyPrincipal: Schema.Schema<FirstPartyPrincipal> =
  Schema.suspend(() =>
    Schema.Struct({
      principalEmail: Schema.optional(Schema.String),
      serviceMetadata: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier: "FirstPartyPrincipal",
  }) as any as Schema.Schema<FirstPartyPrincipal>;

export interface ThirdPartyPrincipal {
  /** Metadata about third party identity. */
  thirdPartyClaims?: Record<string, unknown>;
}

export const ThirdPartyPrincipal: Schema.Schema<ThirdPartyPrincipal> =
  Schema.suspend(() =>
    Schema.Struct({
      thirdPartyClaims: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier: "ThirdPartyPrincipal",
  }) as any as Schema.Schema<ThirdPartyPrincipal>;

export interface ServiceAccountDelegationInfo {
  /** First party (Google) identity as the real authority. */
  firstPartyPrincipal?: FirstPartyPrincipal;
  /** A string representing the principal_subject associated with the identity. For most identities, the format will be `principal://iam.googleapis.com/{identity pool name}/subject/{subject)` except for some GKE identities (GKE_WORKLOAD, FREEFORM, GKE_HUB_WORKLOAD) that are still in the legacy format `serviceAccount:{identity pool name}[{subject}]` */
  principalSubject?: string;
  /** Third party identity as the real authority. */
  thirdPartyPrincipal?: ThirdPartyPrincipal;
}

export const ServiceAccountDelegationInfo: Schema.Schema<ServiceAccountDelegationInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      firstPartyPrincipal: Schema.optional(FirstPartyPrincipal),
      principalSubject: Schema.optional(Schema.String),
      thirdPartyPrincipal: Schema.optional(ThirdPartyPrincipal),
    }),
  ).annotate({
    identifier: "ServiceAccountDelegationInfo",
  }) as any as Schema.Schema<ServiceAccountDelegationInfo>;

export interface OAuthInfo {
  /** The OAuth client ID of the 1P or 3P application acting on behalf of the user. */
  oauthClientId?: string;
}

export const OAuthInfo: Schema.Schema<OAuthInfo> = Schema.suspend(() =>
  Schema.Struct({
    oauthClientId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "OAuthInfo" }) as any as Schema.Schema<OAuthInfo>;

export interface AuthenticationInfo {
  /** Records the history of delegated resource access across Google services. */
  serviceDelegationHistory?: ServiceDelegationHistory;
  /** String representation of identity of requesting party. Populated for both first and third party identities. */
  principalSubject?: string;
  /** Converted from "identity_cloudgaia.AuditLoggableShortLivedCredential" proto. This message will be used by security, detection and response team. For context please refer to go/cg:short-lived-credential-logging. When the JSON object represented here has a proto equivalent, the proto name will be indicated in the `@type` property. */
  loggableShortLivedCredential?: Record<string, unknown>;
  /** Identity delegation history of an authenticated service account that makes the request. It contains information on the real authorities that try to access GCP resources by delegating on a service account. When multiple authorities present, they are guaranteed to be sorted based on the original ordering of the identity delegation events. */
  serviceAccountDelegationInfo?: Array<ServiceAccountDelegationInfo>;
  /** OAuth authentication information such as the OAuth client ID. */
  oauthInfo?: OAuthInfo;
  /** The authority selector specified by the requestor, if any. It is not guaranteed that the principal was allowed to use this authority. */
  authoritySelector?: string;
  /** The name of the service account key used to create or exchange credentials for authenticating the service account making the request. This is a scheme-less URI full resource name. For example: "//iam.googleapis.com/projects/{PROJECT_ID}/serviceAccounts/{ACCOUNT}/keys/{key}" */
  serviceAccountKeyName?: string;
  /** The email address of the authenticated user (or service account on behalf of third party principal) making the request. For third party identity callers, the `principal_subject` field is populated instead of this field. For privacy reasons, the principal email address is sometimes redacted. For more information, see [Caller identities in audit logs](https://cloud.google.com/logging/docs/audit#user-id). */
  principalEmail?: string;
  /** The third party identification (if any) of the authenticated user making the request. When the JSON object represented here has a proto equivalent, the proto name will be indicated in the `@type` property. */
  thirdPartyPrincipal?: Record<string, unknown>;
}

export const AuthenticationInfo: Schema.Schema<AuthenticationInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      serviceDelegationHistory: Schema.optional(ServiceDelegationHistory),
      principalSubject: Schema.optional(Schema.String),
      loggableShortLivedCredential: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
      serviceAccountDelegationInfo: Schema.optional(
        Schema.Array(ServiceAccountDelegationInfo),
      ),
      oauthInfo: Schema.optional(OAuthInfo),
      authoritySelector: Schema.optional(Schema.String),
      serviceAccountKeyName: Schema.optional(Schema.String),
      principalEmail: Schema.optional(Schema.String),
      thirdPartyPrincipal: Schema.optional(
        Schema.Record(Schema.String, Schema.Unknown),
      ),
    }),
  ).annotate({
    identifier: "AuthenticationInfo",
  }) as any as Schema.Schema<AuthenticationInfo>;

export interface Peer {
  /** The network port of the peer. */
  port?: string;
  /** The IP address of the peer. */
  ip?: string;
  /** The labels associated with the peer. */
  labels?: Record<string, string>;
  /** The identity of this peer. Similar to `Request.auth.principal`, but relative to the peer instead of the request. For example, the identity associated with a load balancer that forwarded the request. */
  principal?: string;
  /** The CLDR country/region code associated with the above IP address. If the IP address is private, the `region_code` should reflect the physical location where this peer is running. */
  regionCode?: string;
}

export const Peer: Schema.Schema<Peer> = Schema.suspend(() =>
  Schema.Struct({
    port: Schema.optional(Schema.String),
    ip: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    principal: Schema.optional(Schema.String),
    regionCode: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Peer" }) as any as Schema.Schema<Peer>;

export interface RequestMetadata {
  /** The network of the caller. Set only if the network host project is part of the same GCP organization (or project) as the accessed resource. See https://cloud.google.com/compute/docs/vpc/ for more information. This is a scheme-less URI full resource name. For example: "//compute.googleapis.com/projects/PROJECT_ID/global/networks/NETWORK_ID" */
  callerNetwork?: string;
  /** The IP address of the caller. For a caller from the internet, this will be the public IPv4 or IPv6 address. For calls made from inside Google's internal production network from one GCP service to another, `caller_ip` will be redacted to "private". For a caller from a Compute Engine VM with a external IP address, `caller_ip` will be the VM's external IP address. For a caller from a Compute Engine VM without a external IP address, if the VM is in the same organization (or project) as the accessed resource, `caller_ip` will be the VM's internal IPv4 address, otherwise `caller_ip` will be redacted to "gce-internal-ip". See https://cloud.google.com/compute/docs/vpc/ for more information. */
  callerIp?: string;
  /** The destination of a network activity, such as accepting a TCP connection. In a multi hop network activity, the destination represents the receiver of the last hop. Only two fields are used in this message, Peer.port and Peer.ip. These fields are optionally populated by those services utilizing the IAM condition feature. */
  destinationAttributes?: Peer;
  /** Request attributes used in IAM condition evaluation. This field contains request attributes like request time and access levels associated with the request. To get the whole view of the attributes used in IAM condition evaluation, the user must also look into `AuditLog.authentication_info.resource_attributes`. */
  requestAttributes?: Request;
  /** The user agent of the caller. This information is not authenticated and should be treated accordingly. For example: + `google-api-python-client/1.4.0`: The request was made by the Google API client for Python. + `Cloud SDK Command Line Tool apitools-client/1.0 gcloud/0.9.62`: The request was made by the Google Cloud SDK CLI (gcloud). + `AppEngine-Google; (+http://code.google.com/appengine; appid: s~my-project`: The request was made from the `my-project` App Engine app. */
  callerSuppliedUserAgent?: string;
}

export const RequestMetadata: Schema.Schema<RequestMetadata> = Schema.suspend(
  () =>
    Schema.Struct({
      callerNetwork: Schema.optional(Schema.String),
      callerIp: Schema.optional(Schema.String),
      destinationAttributes: Schema.optional(Peer),
      requestAttributes: Schema.optional(Request),
      callerSuppliedUserAgent: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "RequestMetadata",
}) as any as Schema.Schema<RequestMetadata>;

export interface AuditLog {
  /** The operation response. This may not include all response elements, such as those that are too large, privacy-sensitive, or duplicated elsewhere in the log record. It should never include user-generated data, such as file contents. When the JSON object represented here has a proto equivalent, the proto name will be indicated in the `@type` property. */
  response?: Record<string, unknown>;
  /** Indicates the policy violations for this request. If the request is denied by the policy, violation information will be logged here. */
  policyViolationInfo?: PolicyViolationInfo;
  /** The status of the overall operation. */
  status?: Status;
  /** Deprecated. Use the `metadata` field instead. Other service-specific data about the request, response, and other activities. */
  serviceData?: Record<string, unknown>;
  /** The resource's original state before mutation. Present only for operations which have successfully modified the targeted resource(s). In general, this field should contain all changed fields, except those that are already been included in `request`, `response`, `metadata` or `service_data` fields. When the JSON object represented here has a proto equivalent, the proto name will be indicated in the `@type` property. */
  resourceOriginalState?: Record<string, unknown>;
  /** The name of the service method or operation. For API calls, this should be the name of the API method. For example, "google.cloud.bigquery.v2.TableService.InsertTable" "google.logging.v2.ConfigServiceV2.CreateSink" */
  methodName?: string;
  /** Authorization information. If there are multiple resources or permissions involved, then there is one AuthorizationInfo element for each {resource, permission} tuple. */
  authorizationInfo?: Array<AuthorizationInfo>;
  /** The operation request. This may not include all request parameters, such as those that are too large, privacy-sensitive, or duplicated elsewhere in the log record. It should never include user-generated data, such as file contents. When the JSON object represented here has a proto equivalent, the proto name will be indicated in the `@type` property. */
  request?: Record<string, unknown>;
  /** The name of the API service performing the operation. For example, `"compute.googleapis.com"`. */
  serviceName?: string;
  /** The resource or collection that is the target of the operation. The name is a scheme-less URI, not including the API service name. For example: "projects/PROJECT_ID/zones/us-central1-a/instances" "projects/PROJECT_ID/datasets/DATASET_ID" */
  resourceName?: string;
  /** The resource location information. */
  resourceLocation?: ResourceLocation;
  /** The number of items returned from a List or Query API method, if applicable. */
  numResponseItems?: string;
  /** Authentication information. */
  authenticationInfo?: AuthenticationInfo;
  /** Other service-specific data about the request, response, and other information associated with the current audited event. */
  metadata?: Record<string, unknown>;
  /** Metadata about the operation. */
  requestMetadata?: RequestMetadata;
}

export const AuditLog: Schema.Schema<AuditLog> = Schema.suspend(() =>
  Schema.Struct({
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    policyViolationInfo: Schema.optional(PolicyViolationInfo),
    status: Schema.optional(Status),
    serviceData: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    resourceOriginalState: Schema.optional(
      Schema.Record(Schema.String, Schema.Unknown),
    ),
    methodName: Schema.optional(Schema.String),
    authorizationInfo: Schema.optional(Schema.Array(AuthorizationInfo)),
    request: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    serviceName: Schema.optional(Schema.String),
    resourceName: Schema.optional(Schema.String),
    resourceLocation: Schema.optional(ResourceLocation),
    numResponseItems: Schema.optional(Schema.String),
    authenticationInfo: Schema.optional(AuthenticationInfo),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    requestMetadata: Schema.optional(RequestMetadata),
  }),
).annotate({ identifier: "AuditLog" }) as any as Schema.Schema<AuditLog>;

export interface QuotaError {
  /** Subject to whom this error applies. See the specific enum for more details on this field. For example, "clientip:" or "project:". */
  subject?: string;
  /** Contains additional information about the quota error. If available, `status.code` will be non zero. */
  status?: Status;
  /** Error code. */
  code?:
    | "UNSPECIFIED"
    | "RESOURCE_EXHAUSTED"
    | "OUT_OF_RANGE"
    | "BILLING_NOT_ACTIVE"
    | "PROJECT_DELETED"
    | "API_KEY_INVALID"
    | "API_KEY_EXPIRED"
    | "SPATULA_HEADER_INVALID"
    | "LOAS_ROLE_INVALID"
    | "NO_LOAS_PROJECT"
    | "PROJECT_STATUS_UNAVAILABLE"
    | "SERVICE_STATUS_UNAVAILABLE"
    | "BILLING_STATUS_UNAVAILABLE"
    | "QUOTA_SYSTEM_UNAVAILABLE"
    | (string & {});
  /** Free-form text that provides details on the cause of the error. */
  description?: string;
}

export const QuotaError: Schema.Schema<QuotaError> = Schema.suspend(() =>
  Schema.Struct({
    subject: Schema.optional(Schema.String),
    status: Schema.optional(Status),
    code: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "QuotaError" }) as any as Schema.Schema<QuotaError>;

export interface QuotaInfo {
  /** Quota Metrics that have exceeded quota limits. For QuotaGroup-based quota, this is QuotaGroup.name For QuotaLimit-based quota, this is QuotaLimit.name See: google.api.Quota Deprecated: Use quota_metrics to get per quota group limit exceeded status. */
  limitExceeded?: Array<string>;
  /** Quota metrics to indicate the usage. Depending on the check request, one or more of the following metrics will be included: 1. For rate quota, per quota group or per quota metric incremental usage will be specified using the following delta metric: "serviceruntime.googleapis.com/api/consumer/quota_used_count" 2. For allocation quota, per quota metric total usage will be specified using the following gauge metric: "serviceruntime.googleapis.com/allocation/consumer/quota_used_count" 3. For both rate quota and allocation quota, the quota limit reached condition will be specified using the following boolean metric: "serviceruntime.googleapis.com/quota/exceeded" */
  quotaMetrics?: Array<MetricValueSet>;
  /** Output only. Indicates the state of the quota extraction. */
  quotaExtractionState?:
    | "QUOTA_EXTRACTION_STATE_UNSPECIFIED"
    | "QUOTA_EXTRACTION_STATE_DARK_LAUNCH"
    | "QUOTA_EXTRACTION_STATE_TRAFFIC_MIGRATION"
    | (string & {});
  /** Map of quota group name to the actual number of tokens consumed. If the quota check was not successful, then this will not be populated due to no quota consumption. We are not merging this field with 'quota_metrics' field because of the complexity of scaling in Chemist client code base. For simplicity, we will keep this field for Castor (that scales quota usage) and 'quota_metrics' for SuperQuota (that doesn't scale quota usage). */
  quotaConsumed?: Record<string, number>;
}

export const QuotaInfo: Schema.Schema<QuotaInfo> = Schema.suspend(() =>
  Schema.Struct({
    limitExceeded: Schema.optional(Schema.Array(Schema.String)),
    quotaMetrics: Schema.optional(Schema.Array(MetricValueSet)),
    quotaExtractionState: Schema.optional(Schema.String),
    quotaConsumed: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
  }),
).annotate({ identifier: "QuotaInfo" }) as any as Schema.Schema<QuotaInfo>;

export interface ConsumerInfo {
  /** The type of the consumer which should have been defined in [Google Resource Manager](https://cloud.google.com/resource-manager/). */
  type?:
    | "CONSUMER_TYPE_UNSPECIFIED"
    | "PROJECT"
    | "FOLDER"
    | "ORGANIZATION"
    | "SERVICE_SPECIFIC"
    | (string & {});
  /** The Google cloud project number, e.g. 1234567890. A value of 0 indicates no project number is found. NOTE: This field is deprecated after Chemist support flexible consumer id. New code should not depend on this field anymore. */
  projectNumber?: string;
  /** The consumer identity number, can be Google cloud project number, folder number or organization number e.g. 1234567890. A value of 0 indicates no consumer number is found. */
  consumerNumber?: string;
}

export const ConsumerInfo: Schema.Schema<ConsumerInfo> = Schema.suspend(() =>
  Schema.Struct({
    type: Schema.optional(Schema.String),
    projectNumber: Schema.optional(Schema.String),
    consumerNumber: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ConsumerInfo",
}) as any as Schema.Schema<ConsumerInfo>;

export interface V1LogEntrySourceLocation {
  /** Optional. Human-readable name of the function or method being invoked, with optional context such as the class or package name. This information may be used in contexts such as the logs viewer, where a file and line number are less meaningful. The format can vary by language. For example: `qual.if.ied.Class.method` (Java), `dir/package.func` (Go), `function` (Python). */
  function?: string;
  /** Optional. Line within the source file. 1-based; 0 indicates no line number available. */
  line?: string;
  /** Optional. Source file name. Depending on the runtime environment, this might be a simple name or a fully-qualified name. */
  file?: string;
}

export const V1LogEntrySourceLocation: Schema.Schema<V1LogEntrySourceLocation> =
  Schema.suspend(() =>
    Schema.Struct({
      function: Schema.optional(Schema.String),
      line: Schema.optional(Schema.String),
      file: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "V1LogEntrySourceLocation",
  }) as any as Schema.Schema<V1LogEntrySourceLocation>;

export interface V1HttpRequest {
  /** The scheme (http, https), the host name, the path, and the query portion of the URL that was requested. Example: `"http://example.com/some/info?color=red"`. */
  requestUrl?: string;
  /** The IP address (IPv4 or IPv6) of the origin server that the request was sent to. */
  serverIp?: string;
  /** The referer URL of the request, as defined in [HTTP/1.1 Header Field Definitions](https://www.w3.org/Protocols/rfc2616/rfc2616-sec14.html). */
  referer?: string;
  /** The request processing latency on the server, from the time the request was received until the response was sent. */
  latency?: string;
  /** Protocol used for the request. Examples: "HTTP/1.1", "HTTP/2", "websocket" */
  protocol?: string;
  /** The user agent sent by the client. Example: `"Mozilla/4.0 (compatible; MSIE 6.0; Windows 98; Q312461; .NET CLR 1.0.3705)"`. */
  userAgent?: string;
  /** The size of the HTTP response message sent back to the client, in bytes, including the response headers and the response body. */
  responseSize?: string;
  /** The number of HTTP response bytes inserted into cache. Set only when a cache fill was attempted. */
  cacheFillBytes?: string;
  /** Whether or not an entity was served from cache (with or without validation). */
  cacheHit?: boolean;
  /** Whether or not a cache lookup was attempted. */
  cacheLookup?: boolean;
  /** Whether or not the response was validated with the origin server before being served from cache. This field is only meaningful if `cache_hit` is True. */
  cacheValidatedWithOriginServer?: boolean;
  /** The IP address (IPv4 or IPv6) of the client that issued the HTTP request. Examples: `"192.168.1.1"`, `"FE80::0202:B3FF:FE1E:8329"`. */
  remoteIp?: string;
  /** The response code indicating the status of the response. Examples: 200, 404. */
  status?: number;
  /** The size of the HTTP request message in bytes, including the request headers and the request body. */
  requestSize?: string;
  /** The request method. Examples: `"GET"`, `"HEAD"`, `"PUT"`, `"POST"`. */
  requestMethod?: string;
}

export const V1HttpRequest: Schema.Schema<V1HttpRequest> = Schema.suspend(() =>
  Schema.Struct({
    requestUrl: Schema.optional(Schema.String),
    serverIp: Schema.optional(Schema.String),
    referer: Schema.optional(Schema.String),
    latency: Schema.optional(Schema.String),
    protocol: Schema.optional(Schema.String),
    userAgent: Schema.optional(Schema.String),
    responseSize: Schema.optional(Schema.String),
    cacheFillBytes: Schema.optional(Schema.String),
    cacheHit: Schema.optional(Schema.Boolean),
    cacheLookup: Schema.optional(Schema.Boolean),
    cacheValidatedWithOriginServer: Schema.optional(Schema.Boolean),
    remoteIp: Schema.optional(Schema.String),
    status: Schema.optional(Schema.Number),
    requestSize: Schema.optional(Schema.String),
    requestMethod: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "V1HttpRequest",
}) as any as Schema.Schema<V1HttpRequest>;

export interface V1LogEntry {
  /** Required. The log to which this log entry belongs. Examples: `"syslog"`, `"book_log"`. */
  name?: string;
  /** The severity of the log entry. The default value is `LogSeverity.DEFAULT`. */
  severity?:
    | "DEFAULT"
    | "DEBUG"
    | "INFO"
    | "NOTICE"
    | "WARNING"
    | "ERROR"
    | "CRITICAL"
    | "ALERT"
    | "EMERGENCY"
    | (string & {});
  /** Optional. Information about the HTTP request associated with this log entry, if applicable. */
  httpRequest?: V1HttpRequest;
  /** A set of user-defined (key, value) data that provides additional information about the log entry. */
  labels?: Record<string, string>;
  /** The log entry payload, represented as a Unicode string (UTF-8). */
  textPayload?: string;
  /** Optional. Resource name of the trace associated with the log entry, if any. If this field contains a relative resource name, you can assume the name is relative to `//tracing.googleapis.com`. Example: `projects/my-projectid/traces/06796866738c859f2f19b7cfb3214824` */
  trace?: string;
  /** A unique ID for the log entry used for deduplication. If omitted, the implementation will generate one based on operation_id. */
  insertId?: string;
  /** The log entry payload, represented as a structure that is expressed as a JSON object. */
  structPayload?: Record<string, unknown>;
  /** The log entry payload, represented as a protocol buffer that is expressed as a JSON object. The only accepted type currently is AuditLog. */
  protoPayload?: Record<string, unknown>;
  /** A set of user-defined (key, value) data that provides additional information about the moniotored resource that the log entry belongs to. */
  monitoredResourceLabels?: Record<string, string>;
  /** Optional. Information about an operation associated with the log entry, if applicable. */
  operation?: V1LogEntryOperation;
  /** The time the event described by the log entry occurred. If omitted, defaults to operation start time. */
  timestamp?: string;
  /** Optional. Source code location information associated with the log entry, if any. */
  sourceLocation?: V1LogEntrySourceLocation;
}

export const V1LogEntry: Schema.Schema<V1LogEntry> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    severity: Schema.optional(Schema.String),
    httpRequest: Schema.optional(V1HttpRequest),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    textPayload: Schema.optional(Schema.String),
    trace: Schema.optional(Schema.String),
    insertId: Schema.optional(Schema.String),
    structPayload: Schema.optional(
      Schema.Record(Schema.String, Schema.Unknown),
    ),
    protoPayload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    monitoredResourceLabels: Schema.optional(
      Schema.Record(Schema.String, Schema.String),
    ),
    operation: Schema.optional(V1LogEntryOperation),
    timestamp: Schema.optional(Schema.String),
    sourceLocation: Schema.optional(V1LogEntrySourceLocation),
  }),
).annotate({ identifier: "V1LogEntry" }) as any as Schema.Schema<V1LogEntry>;

export interface QuotaProperties {
  /** Quota mode for this operation. */
  quotaMode?: "ACQUIRE" | "ACQUIRE_BEST_EFFORT" | "CHECK" | (string & {});
}

export const QuotaProperties: Schema.Schema<QuotaProperties> = Schema.suspend(
  () =>
    Schema.Struct({
      quotaMode: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "QuotaProperties",
}) as any as Schema.Schema<QuotaProperties>;

export interface ResourceInfo {
  /** The identifier of the parent of this resource instance. Must be in one of the following formats: - `projects/` - `folders/` - `organizations/` */
  resourceContainer?: string;
  /** Name of the resource. This is used for auditing purposes. */
  resourceName?: string;
  /** The location of the resource. If not empty, the resource will be checked against location policy. The value must be a valid zone, region or multiregion. For example: "europe-west4" or "northamerica-northeast1-a" */
  resourceLocation?: string;
  /** The resource permission required for this request. */
  permission?: string;
}

export const ResourceInfo: Schema.Schema<ResourceInfo> = Schema.suspend(() =>
  Schema.Struct({
    resourceContainer: Schema.optional(Schema.String),
    resourceName: Schema.optional(Schema.String),
    resourceLocation: Schema.optional(Schema.String),
    permission: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ResourceInfo",
}) as any as Schema.Schema<ResourceInfo>;

export interface LogEntrySourceLocation {
  /** Optional. Line within the source file. 1-based; 0 indicates no line number available. */
  line?: string;
  /** Optional. Source file name. Depending on the runtime environment, this might be a simple name or a fully-qualified name. */
  file?: string;
  /** Optional. Human-readable name of the function or method being invoked, with optional context such as the class or package name. This information may be used in contexts such as the logs viewer, where a file and line number are less meaningful. The format can vary by language. For example: `qual.if.ied.Class.method` (Java), `dir/package.func` (Go), `function` (Python). */
  function?: string;
}

export const LogEntrySourceLocation: Schema.Schema<LogEntrySourceLocation> =
  Schema.suspend(() =>
    Schema.Struct({
      line: Schema.optional(Schema.String),
      file: Schema.optional(Schema.String),
      function: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LogEntrySourceLocation",
  }) as any as Schema.Schema<LogEntrySourceLocation>;

export interface LogEntryOperation {
  /** Optional. An arbitrary producer identifier. The combination of `id` and `producer` must be globally unique. Examples for `producer`: `"MyDivision.MyBigCompany.com"`, `"github.com/MyProject/MyApplication"`. */
  producer?: string;
  /** Optional. Set this to True if this is the last log entry in the operation. */
  last?: boolean;
  /** Optional. An arbitrary operation identifier. Log entries with the same identifier are assumed to be part of the same operation. */
  id?: string;
  /** Optional. Set this to True if this is the first log entry in the operation. */
  first?: boolean;
}

export const LogEntryOperation: Schema.Schema<LogEntryOperation> =
  Schema.suspend(() =>
    Schema.Struct({
      producer: Schema.optional(Schema.String),
      last: Schema.optional(Schema.Boolean),
      id: Schema.optional(Schema.String),
      first: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "LogEntryOperation",
  }) as any as Schema.Schema<LogEntryOperation>;

export interface LogEntry {
  /** Optional. Resource name of the trace associated with the log entry, if any. If this field contains a relative resource name, you can assume the name is relative to `//tracing.googleapis.com`. Example: `projects/my-projectid/traces/06796866738c859f2f19b7cfb3214824` */
  trace?: string;
  /** The log entry payload, represented as a Unicode string (UTF-8). */
  textPayload?: string;
  /** Optional. Information about the HTTP request associated with this log entry, if applicable. */
  httpRequest?: HttpRequest;
  /** A unique ID for the log entry used for deduplication. If omitted, the implementation will generate one based on operation_id. */
  insertId?: string;
  /** A set of user-defined (key, value) data that provides additional information about the log entry. */
  labels?: Record<string, string>;
  /** Optional. Source code location information associated with the log entry, if any. */
  sourceLocation?: LogEntrySourceLocation;
  /** The log entry payload, represented as a structure that is expressed as a JSON object. */
  structPayload?: Record<string, unknown>;
  /** The severity of the log entry. The default value is `LogSeverity.DEFAULT`. */
  severity?:
    | "DEFAULT"
    | "DEBUG"
    | "INFO"
    | "NOTICE"
    | "WARNING"
    | "ERROR"
    | "CRITICAL"
    | "ALERT"
    | "EMERGENCY"
    | (string & {});
  /** Optional. Information about an operation associated with the log entry, if applicable. */
  operation?: LogEntryOperation;
  /** Required. The log to which this log entry belongs. Examples: `"syslog"`, `"book_log"`. */
  name?: string;
  /** The log entry payload, represented as a protocol buffer that is expressed as a JSON object. The only accepted type currently is AuditLog. */
  protoPayload?: Record<string, unknown>;
  /** The time the event described by the log entry occurred. If omitted, defaults to operation start time. */
  timestamp?: string;
}

export const LogEntry: Schema.Schema<LogEntry> = Schema.suspend(() =>
  Schema.Struct({
    trace: Schema.optional(Schema.String),
    textPayload: Schema.optional(Schema.String),
    httpRequest: Schema.optional(HttpRequest),
    insertId: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    sourceLocation: Schema.optional(LogEntrySourceLocation),
    structPayload: Schema.optional(
      Schema.Record(Schema.String, Schema.Unknown),
    ),
    severity: Schema.optional(Schema.String),
    operation: Schema.optional(LogEntryOperation),
    name: Schema.optional(Schema.String),
    protoPayload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    timestamp: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "LogEntry" }) as any as Schema.Schema<LogEntry>;

export interface Operation {
  /** Fully qualified name of the operation. Reserved for future use. */
  operationName?: string;
  /** Represents the properties needed for quota check. Applicable only if this operation is for a quota check request. If this is not specified, no quota check will be performed. */
  quotaProperties?: QuotaProperties;
  /** Private Preview. This feature is only available for approved services. User defined labels for the resource that this operation is associated with. */
  userLabels?: Record<string, string>;
  /** The resources that are involved in the operation. The maximum supported number of entries in this field is 100. */
  resources?: Array<ResourceInfo>;
  /** Represents information to be logged. */
  logEntries?: Array<LogEntry>;
  /** Unimplemented. A list of Cloud Trace spans. The span names shall contain the id of the destination project which can be either the produce or the consumer project. */
  traceSpans?: Array<TraceSpan>;
  /** DO NOT USE. This is an experimental field. */
  importance?: "LOW" | "HIGH" | "DEBUG" | "PROMOTED" | (string & {});
  /** Required. Start time of the operation. */
  startTime?: string;
  /** End time of the operation. Required when the operation is used in ServiceController.Report, but optional when the operation is used in ServiceController.Check. */
  endTime?: string;
  /** Identity of the operation. This must be unique within the scope of the service that generated the operation. If the service calls Check() and Report() on the same operation, the two calls should carry the same id. UUID version 4 is recommended, though not required. In scenarios where an operation is computed from existing information and an idempotent id is desirable for deduplication purpose, UUID version 5 is recommended. See RFC 4122 for details. */
  operationId?: string;
  /** Represents information about this operation. Each MetricValueSet corresponds to a metric defined in the service configuration. The data type used in the MetricValueSet must agree with the data type specified in the metric definition. Within a single operation, it is not allowed to have more than one MetricValue instances that have the same metric names and identical label value combinations. If a request has such duplicated MetricValue instances, the entire request is rejected with an invalid argument error. */
  metricValueSets?: Array<MetricValueSet>;
  /** Identity of the consumer who is using the service. This field should be filled in for the operations initiated by a consumer, but not for service-initiated operations that are not related to a specific consumer. - This can be in one of the following formats: - project:PROJECT_ID, - project`_`number:PROJECT_NUMBER, - projects/PROJECT_ID or PROJECT_NUMBER, - folders/FOLDER_NUMBER, - organizations/ORGANIZATION_NUMBER, - api`_`key:API_KEY. */
  consumerId?: string;
  /** Labels describing the operation. Only the following labels are allowed: - Labels describing monitored resources as defined in the service configuration. - Default labels of metric values. When specified, labels defined in the metric value override these default. - The following labels defined by Google Cloud Platform: - `cloud.googleapis.com/location` describing the location where the operation happened, - `servicecontrol.googleapis.com/user_agent` describing the user agent of the API request, - `servicecontrol.googleapis.com/service_agent` describing the service used to handle the API request (e.g. ESP), - `servicecontrol.googleapis.com/platform` describing the platform where the API is served, such as App Engine, Compute Engine, or Kubernetes Engine. */
  labels?: Record<string, string>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
  Schema.Struct({
    operationName: Schema.optional(Schema.String),
    quotaProperties: Schema.optional(QuotaProperties),
    userLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    resources: Schema.optional(Schema.Array(ResourceInfo)),
    logEntries: Schema.optional(Schema.Array(LogEntry)),
    traceSpans: Schema.optional(Schema.Array(TraceSpan)),
    importance: Schema.optional(Schema.String),
    startTime: Schema.optional(Schema.String),
    endTime: Schema.optional(Schema.String),
    operationId: Schema.optional(Schema.String),
    metricValueSets: Schema.optional(Schema.Array(MetricValueSet)),
    consumerId: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }),
).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ReportRequest {
  /** Specifies which version of service config should be used to process the request. If unspecified or no matching version can be found, the latest one will be used. */
  serviceConfigId?: string;
  /** Operations to be reported. Typically the service should report one operation per request. Putting multiple operations into a single request is allowed, but should be used only when multiple operations are natually available at the time of the report. There is no limit on the number of operations in the same ReportRequest, however the ReportRequest size should be no larger than 1MB. See ReportResponse.report_errors for partial failure behavior. */
  operations?: Array<Operation>;
}

export const ReportRequest: Schema.Schema<ReportRequest> = Schema.suspend(() =>
  Schema.Struct({
    serviceConfigId: Schema.optional(Schema.String),
    operations: Schema.optional(Schema.Array(Operation)),
  }),
).annotate({
  identifier: "ReportRequest",
}) as any as Schema.Schema<ReportRequest>;

export interface AllocateQuotaRequest {
  /** Operation that describes the quota allocation. */
  allocateOperation?: QuotaOperation;
  /** Specifies which version of service configuration should be used to process the request. If unspecified or no matching version can be found, the latest one will be used. */
  serviceConfigId?: string;
}

export const AllocateQuotaRequest: Schema.Schema<AllocateQuotaRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      allocateOperation: Schema.optional(QuotaOperation),
      serviceConfigId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AllocateQuotaRequest",
  }) as any as Schema.Schema<AllocateQuotaRequest>;

export interface AllocateInfo {
  /** A list of label keys that were unused by the server in processing the request. Thus, for similar requests repeated in a certain future time window, the caller can choose to ignore these labels in the requests to achieve better client-side cache hits and quota aggregation for rate quota. This field is not populated for allocation quota checks. */
  unusedArguments?: Array<string>;
}

export const AllocateInfo: Schema.Schema<AllocateInfo> = Schema.suspend(() =>
  Schema.Struct({
    unusedArguments: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({
  identifier: "AllocateInfo",
}) as any as Schema.Schema<AllocateInfo>;

export interface AllocateQuotaResponse {
  /** ID of the actual config used to process the request. */
  serviceConfigId?: string;
  /** Quota metrics to indicate the result of allocation. Depending on the request, one or more of the following metrics will be included: 1. Per quota group or per quota metric incremental usage will be specified using the following delta metric : "serviceruntime.googleapis.com/api/consumer/quota_used_count" 2. The quota limit reached condition will be specified using the following boolean metric : "serviceruntime.googleapis.com/quota/exceeded" */
  quotaMetrics?: Array<MetricValueSet>;
  /** WARNING: DO NOT use this field until this warning message is removed. */
  allocateInfo?: AllocateInfo;
  /** Indicates the decision of the allocate. */
  allocateErrors?: Array<QuotaError>;
  /** The same operation_id value used in the AllocateQuotaRequest. Used for logging and diagnostics purposes. */
  operationId?: string;
}

export const AllocateQuotaResponse: Schema.Schema<AllocateQuotaResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      serviceConfigId: Schema.optional(Schema.String),
      quotaMetrics: Schema.optional(Schema.Array(MetricValueSet)),
      allocateInfo: Schema.optional(AllocateInfo),
      allocateErrors: Schema.optional(Schema.Array(QuotaError)),
      operationId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "AllocateQuotaResponse",
  }) as any as Schema.Schema<AllocateQuotaResponse>;

export interface CheckError {
  /** Subject to whom this error applies. See the specific code enum for more details on this field. For example: - "project:" - "folder:" - "organization:" */
  subject?: string;
  /** Free-form text providing details on the error cause of the error. */
  detail?: string;
  /** The error code. */
  code?:
    | "ERROR_CODE_UNSPECIFIED"
    | "NOT_FOUND"
    | "PERMISSION_DENIED"
    | "RESOURCE_EXHAUSTED"
    | "BUDGET_EXCEEDED"
    | "DENIAL_OF_SERVICE_DETECTED"
    | "LOAD_SHEDDING"
    | "ABUSER_DETECTED"
    | "SERVICE_NOT_ACTIVATED"
    | "VISIBILITY_DENIED"
    | "BILLING_DISABLED"
    | "PROJECT_DELETED"
    | "PROJECT_INVALID"
    | "CONSUMER_INVALID"
    | "IP_ADDRESS_BLOCKED"
    | "REFERER_BLOCKED"
    | "CLIENT_APP_BLOCKED"
    | "API_TARGET_BLOCKED"
    | "API_KEY_INVALID"
    | "API_KEY_EXPIRED"
    | "API_KEY_NOT_FOUND"
    | "SPATULA_HEADER_INVALID"
    | "LOAS_ROLE_INVALID"
    | "NO_LOAS_PROJECT"
    | "LOAS_PROJECT_DISABLED"
    | "SECURITY_POLICY_VIOLATED"
    | "INVALID_CREDENTIAL"
    | "LOCATION_POLICY_VIOLATED"
    | "NAMESPACE_LOOKUP_UNAVAILABLE"
    | "SERVICE_STATUS_UNAVAILABLE"
    | "BILLING_STATUS_UNAVAILABLE"
    | "QUOTA_CHECK_UNAVAILABLE"
    | "LOAS_PROJECT_LOOKUP_UNAVAILABLE"
    | "CLOUD_RESOURCE_MANAGER_BACKEND_UNAVAILABLE"
    | "SECURITY_POLICY_BACKEND_UNAVAILABLE"
    | "LOCATION_POLICY_BACKEND_UNAVAILABLE"
    | "INJECTED_ERROR"
    | (string & {});
  /** Contains public information about the check error. If available, `status.code` will be non zero and client can propagate it out as public error. */
  status?: Status;
}

export const CheckError: Schema.Schema<CheckError> = Schema.suspend(() =>
  Schema.Struct({
    subject: Schema.optional(Schema.String),
    detail: Schema.optional(Schema.String),
    code: Schema.optional(Schema.String),
    status: Schema.optional(Status),
  }),
).annotate({ identifier: "CheckError" }) as any as Schema.Schema<CheckError>;

export interface SpanContext {
  /** The resource name of the span. The format is: projects/[PROJECT_ID_OR_NUMBER]/traces/[TRACE_ID]/spans/[SPAN_ID] `[TRACE_ID]` is a unique identifier for a trace within a project; it is a 32-character hexadecimal encoding of a 16-byte array. `[SPAN_ID]` is a unique identifier for a span within a trace; it is a 16-character hexadecimal encoding of an 8-byte array. */
  spanName?: string;
}

export const SpanContext: Schema.Schema<SpanContext> = Schema.suspend(() =>
  Schema.Struct({
    spanName: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "SpanContext" }) as any as Schema.Schema<SpanContext>;

export interface V1ResourceEvent {
  /** The resource event type determines how the backend service should process the event. */
  type?:
    | "TYPE_UNSPECIFIED"
    | "CREATE"
    | "UPDATE"
    | "DELETE"
    | "UNDELETE"
    | (string & {});
  /** The ESF unique context id of the api request, from which this resource event originated. This field is only needed for CAIS integration via api annotation. See go/cais-lro-delete for more details. */
  contextId?: string;
  /** The payload contains metadata associated with the resource event. A ResourceEventPayloadStatus is provided instead if the original payload cannot be returned due to a limitation (e.g. size limit). */
  payload?: Record<string, unknown>;
  /** The api path the resource event was created in. This should match the source of the `payload` field. For direct integrations with Chemist, this should generally be the RESPONSE. go/resource-event-pipeline-type */
  path?: "API_PATH_UNSPECIFIED" | "REQUEST" | "RESPONSE" | (string & {});
  /** The parent resource for the resource. */
  parent?: Resource;
  /** The destinations field determines which backend services should handle the event. This should be specified as a comma-delimited string. */
  destinations?: string;
  /** The resource associated with the event. */
  resource?: Resource;
}

export const V1ResourceEvent: Schema.Schema<V1ResourceEvent> = Schema.suspend(
  () =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      contextId: Schema.optional(Schema.String),
      payload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      path: Schema.optional(Schema.String),
      parent: Schema.optional(Resource),
      destinations: Schema.optional(Schema.String),
      resource: Schema.optional(Resource),
    }),
).annotate({
  identifier: "V1ResourceEvent",
}) as any as Schema.Schema<V1ResourceEvent>;

export interface CheckRequest {
  /** Specifies which version of service configuration should be used to process the request. If unspecified or no matching version can be found, the latest one will be used. */
  serviceConfigId?: string;
  /** The operation to be checked. */
  operation?: Operation;
  /** Indicates if service activation check should be skipped for this request. Default behavior is to perform the check and apply relevant quota. WARNING: Setting this flag to "true" will disable quota enforcement. */
  skipActivationCheck?: boolean;
  /** Requests the project settings to be returned as part of the check response. */
  requestProjectSettings?: boolean;
}

export const CheckRequest: Schema.Schema<CheckRequest> = Schema.suspend(() =>
  Schema.Struct({
    serviceConfigId: Schema.optional(Schema.String),
    operation: Schema.optional(Operation),
    skipActivationCheck: Schema.optional(Schema.Boolean),
    requestProjectSettings: Schema.optional(Schema.Boolean),
  }),
).annotate({
  identifier: "CheckRequest",
}) as any as Schema.Schema<CheckRequest>;

export interface CheckInfo {
  /** The unique id of the api key in the format of "apikey:". This field will be populated when the consumer passed to Chemist is an API key and all the API key related validations are successful. */
  apiKeyUid?: string;
  /** A list of fields and label keys that are ignored by the server. The client doesn't need to send them for following requests to improve performance and allow better aggregation. */
  unusedArguments?: Array<string>;
  /** Whether or not the api key should be ignored in the credential_id during reporting. */
  ignoreApiKeyUidAsCredentialId?: boolean;
  /** Consumer info of this check. */
  consumerInfo?: ConsumerInfo;
}

export const CheckInfo: Schema.Schema<CheckInfo> = Schema.suspend(() =>
  Schema.Struct({
    apiKeyUid: Schema.optional(Schema.String),
    unusedArguments: Schema.optional(Schema.Array(Schema.String)),
    ignoreApiKeyUidAsCredentialId: Schema.optional(Schema.Boolean),
    consumerInfo: Schema.optional(ConsumerInfo),
  }),
).annotate({ identifier: "CheckInfo" }) as any as Schema.Schema<CheckInfo>;

export interface CheckResponse {
  /** The same operation_id value used in the CheckRequest. Used for logging and diagnostics purposes. */
  operationId?: string;
  /** The current service rollout id used to process the request. */
  serviceRolloutId?: string;
  /** Quota information for the check request associated with this response. */
  quotaInfo?: QuotaInfo;
  /** The actual config id used to process the request. */
  serviceConfigId?: string;
  /** Feedback data returned from the server during processing a Check request. */
  checkInfo?: CheckInfo;
  /** Indicate the decision of the check. If no check errors are present, the service should process the operation. Otherwise the service should use the list of errors to determine the appropriate action. */
  checkErrors?: Array<CheckError>;
}

export const CheckResponse: Schema.Schema<CheckResponse> = Schema.suspend(() =>
  Schema.Struct({
    operationId: Schema.optional(Schema.String),
    serviceRolloutId: Schema.optional(Schema.String),
    quotaInfo: Schema.optional(QuotaInfo),
    serviceConfigId: Schema.optional(Schema.String),
    checkInfo: Schema.optional(CheckInfo),
    checkErrors: Schema.optional(Schema.Array(CheckError)),
  }),
).annotate({
  identifier: "CheckResponse",
}) as any as Schema.Schema<CheckResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface CheckServicesRequest {
  /** The service name as specified in its service configuration. For example, `"pubsub.googleapis.com"`. See [google.api.Service](https://cloud.google.com/service-management/reference/rpc/google.api#google.api.Service) for the definition of a service name. */
  serviceName: string;
  /** Request body */
  body?: CheckRequest;
}

export const CheckServicesRequest = Schema.Struct({
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
  body: Schema.optional(CheckRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/services/{serviceName}:check",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CheckServicesRequest>;

export type CheckServicesResponse = CheckResponse;
export const CheckServicesResponse = CheckResponse;

export type CheckServicesError = DefaultErrors;

/** Checks whether an operation on a service should be allowed to proceed based on the configuration of the service and related policies. It must be called before the operation is executed. If feasible, the client should cache the check results and reuse them for 60 seconds. In case of any server errors, the client should rely on the cached results for much longer time to avoid outage. WARNING: There is general 60s delay for the configuration and policy propagation, therefore callers MUST NOT depend on the `Check` method having the latest policy information. NOTE: the CheckRequest has the size limit (wire-format byte size) of 1MB. This method requires the `servicemanagement.services.check` permission on the specified service. For more information, see [Cloud IAM](https://cloud.google.com/iam). */
export const checkServices: API.OperationMethod<
  CheckServicesRequest,
  CheckServicesResponse,
  CheckServicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CheckServicesRequest,
  output: CheckServicesResponse,
  errors: [],
}));

export interface AllocateQuotaServicesRequest {
  /** Name of the service as specified in the service configuration. For example, `"pubsub.googleapis.com"`. See google.api.Service for the definition of a service name. */
  serviceName: string;
  /** Request body */
  body?: AllocateQuotaRequest;
}

export const AllocateQuotaServicesRequest = Schema.Struct({
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
  body: Schema.optional(AllocateQuotaRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/services/{serviceName}:allocateQuota",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<AllocateQuotaServicesRequest>;

export type AllocateQuotaServicesResponse = AllocateQuotaResponse;
export const AllocateQuotaServicesResponse = AllocateQuotaResponse;

export type AllocateQuotaServicesError = DefaultErrors;

/** Attempts to allocate quota for the specified consumer. It should be called before the operation is executed. This method requires the `servicemanagement.services.quota` permission on the specified service. For more information, see [Cloud IAM](https://cloud.google.com/iam). **NOTE:** The client **must** fail-open on server errors `INTERNAL`, `UNKNOWN`, `DEADLINE_EXCEEDED`, and `UNAVAILABLE`. To ensure system reliability, the server may inject these errors to prohibit any hard dependency on the quota functionality. */
export const allocateQuotaServices: API.OperationMethod<
  AllocateQuotaServicesRequest,
  AllocateQuotaServicesResponse,
  AllocateQuotaServicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: AllocateQuotaServicesRequest,
  output: AllocateQuotaServicesResponse,
  errors: [],
}));

export interface ReportServicesRequest {
  /** The service name as specified in its service configuration. For example, `"pubsub.googleapis.com"`. See [google.api.Service](https://cloud.google.com/service-management/reference/rpc/google.api#google.api.Service) for the definition of a service name. */
  serviceName: string;
  /** Request body */
  body?: ReportRequest;
}

export const ReportServicesRequest = Schema.Struct({
  serviceName: Schema.String.pipe(T.HttpPath("serviceName")),
  body: Schema.optional(ReportRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1/services/{serviceName}:report",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ReportServicesRequest>;

export type ReportServicesResponse = ReportResponse;
export const ReportServicesResponse = ReportResponse;

export type ReportServicesError = DefaultErrors;

/** Reports operation results to Google Service Control, such as logs and metrics. It should be called after an operation is completed. If feasible, the client should aggregate reporting data for up to 5 seconds to reduce API traffic. Limiting aggregation to 5 seconds is to reduce data loss during client crashes. Clients should carefully choose the aggregation time window to avoid data loss risk more than 0.01% for business and compliance reasons. NOTE: the ReportRequest has the size limit (wire-format byte size) of 1MB. This method requires the `servicemanagement.services.report` permission on the specified service. For more information, see [Google Cloud IAM](https://cloud.google.com/iam). */
export const reportServices: API.OperationMethod<
  ReportServicesRequest,
  ReportServicesResponse,
  ReportServicesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ReportServicesRequest,
  output: ReportServicesResponse,
  errors: [],
}));
