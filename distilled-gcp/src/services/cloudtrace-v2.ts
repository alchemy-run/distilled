// ==========================================================================
// Cloud Trace API (cloudtrace v2)
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
  name: "cloudtrace",
  version: "v2",
  rootUrl: "https://cloudtrace.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface TruncatableString {
  /** The shortened string. For example, if the original string is 500 bytes long and the limit of the string is 128 bytes, then `value` contains the first 128 bytes of the 500-byte string. Truncation always happens on a UTF8 character boundary. If there are multi-byte characters in the string, then the length of the shortened string might be less than the size limit. */
  value?: string;
  /** The number of bytes removed from the original string. If this value is 0, then the string was not shortened. */
  truncatedByteCount?: number;
}

export const TruncatableString: Schema.Schema<TruncatableString> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  truncatedByteCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "TruncatableString" }) as any as Schema.Schema<TruncatableString>;

export interface AttributeValue {
  /** A string up to 256 bytes long. */
  stringValue?: TruncatableString;
  /** A 64-bit signed integer. */
  intValue?: string;
  /** A Boolean value represented by `true` or `false`. */
  boolValue?: boolean;
}

export const AttributeValue: Schema.Schema<AttributeValue> = Schema.suspend(() => Schema.Struct({
  stringValue: Schema.optional(TruncatableString),
  intValue: Schema.optional(Schema.String),
  boolValue: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AttributeValue" }) as any as Schema.Schema<AttributeValue>;

export interface Attributes {
  /** A set of attributes. Each attribute's key can be up to 128 bytes long. The value can be a string up to 256 bytes, a signed 64-bit integer, or the boolean values `true` or `false`. For example: "/instance_id": { "string_value": { "value": "my-instance" } } "/http/request_bytes": { "int_value": 300 } "example.com/myattribute": { "bool_value": false } */
  attributeMap?: Record<string, AttributeValue>;
  /** The number of attributes that were discarded. Attributes can be discarded because their keys are too long or because there are too many attributes. If this value is 0 then all attributes are valid. */
  droppedAttributesCount?: number;
}

export const Attributes: Schema.Schema<Attributes> = Schema.suspend(() => Schema.Struct({
  attributeMap: Schema.optional(Schema.Record(Schema.String, AttributeValue)),
  droppedAttributesCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "Attributes" }) as any as Schema.Schema<Attributes>;

export interface Module {
  /** For example: main binary, kernel modules, and dynamic libraries such as libc.so, sharedlib.so (up to 256 bytes). */
  module?: TruncatableString;
  /** A unique identifier for the module, usually a hash of its contents (up to 128 bytes). */
  buildId?: TruncatableString;
}

export const Module: Schema.Schema<Module> = Schema.suspend(() => Schema.Struct({
  module: Schema.optional(TruncatableString),
  buildId: Schema.optional(TruncatableString),
})).annotate({ identifier: "Module" }) as any as Schema.Schema<Module>;

export interface StackFrame {
  /** The fully-qualified name that uniquely identifies the function or method that is active in this frame (up to 1024 bytes). */
  functionName?: TruncatableString;
  /** An un-mangled function name, if `function_name` is mangled. To get information about name mangling, run [this search](https://www.google.com/search?q=cxx+name+mangling). The name can be fully-qualified (up to 1024 bytes). */
  originalFunctionName?: TruncatableString;
  /** The name of the source file where the function call appears (up to 256 bytes). */
  fileName?: TruncatableString;
  /** The line number in `file_name` where the function call appears. */
  lineNumber?: string;
  /** The column number where the function call appears, if available. This is important in JavaScript because of its anonymous functions. */
  columnNumber?: string;
  /** The binary module from where the code was loaded. */
  loadModule?: Module;
  /** The version of the deployed source code (up to 128 bytes). */
  sourceVersion?: TruncatableString;
}

export const StackFrame: Schema.Schema<StackFrame> = Schema.suspend(() => Schema.Struct({
  functionName: Schema.optional(TruncatableString),
  originalFunctionName: Schema.optional(TruncatableString),
  fileName: Schema.optional(TruncatableString),
  lineNumber: Schema.optional(Schema.String),
  columnNumber: Schema.optional(Schema.String),
  loadModule: Schema.optional(Module),
  sourceVersion: Schema.optional(TruncatableString),
})).annotate({ identifier: "StackFrame" }) as any as Schema.Schema<StackFrame>;

export interface StackFrames {
  /** Stack frames in this call stack. */
  frame?: Array<StackFrame>;
  /** The number of stack frames that were dropped because there were too many stack frames. If this value is 0, then no stack frames were dropped. */
  droppedFramesCount?: number;
}

export const StackFrames: Schema.Schema<StackFrames> = Schema.suspend(() => Schema.Struct({
  frame: Schema.optional(Schema.Array(StackFrame)),
  droppedFramesCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "StackFrames" }) as any as Schema.Schema<StackFrames>;

export interface StackTrace {
  /** Stack frames in this stack trace. A maximum of 128 frames are allowed. */
  stackFrames?: StackFrames;
  /** The hash ID is used to conserve network bandwidth for duplicate stack traces within a single trace. Often multiple spans will have identical stack traces. The first occurrence of a stack trace should contain both the `stackFrame` content and a value in `stackTraceHashId`. Subsequent spans within the same request can refer to that stack trace by only setting `stackTraceHashId`. */
  stackTraceHashId?: string;
}

export const StackTrace: Schema.Schema<StackTrace> = Schema.suspend(() => Schema.Struct({
  stackFrames: Schema.optional(StackFrames),
  stackTraceHashId: Schema.optional(Schema.String),
})).annotate({ identifier: "StackTrace" }) as any as Schema.Schema<StackTrace>;

export interface Annotation {
  /** A user-supplied message describing the event. The maximum length for the description is 256 bytes. */
  description?: TruncatableString;
  /** A set of attributes on the annotation. You can have up to 4 attributes per Annotation. */
  attributes?: Attributes;
}

export const Annotation: Schema.Schema<Annotation> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(TruncatableString),
  attributes: Schema.optional(Attributes),
})).annotate({ identifier: "Annotation" }) as any as Schema.Schema<Annotation>;

export interface MessageEvent {
  /** Type of MessageEvent. Indicates whether the message was sent or received. */
  type?: "TYPE_UNSPECIFIED" | "SENT" | "RECEIVED" | (string & {});
  /** An identifier for the MessageEvent's message that can be used to match `SENT` and `RECEIVED` MessageEvents. */
  id?: string;
  /** The number of uncompressed bytes sent or received. */
  uncompressedSizeBytes?: string;
  /** The number of compressed bytes sent or received. If missing, the compressed size is assumed to be the same size as the uncompressed size. */
  compressedSizeBytes?: string;
}

export const MessageEvent: Schema.Schema<MessageEvent> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  uncompressedSizeBytes: Schema.optional(Schema.String),
  compressedSizeBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "MessageEvent" }) as any as Schema.Schema<MessageEvent>;

export interface TimeEvent {
  /** The timestamp indicating the time the event occurred. */
  time?: string;
  /** Text annotation with a set of attributes. */
  annotation?: Annotation;
  /** An event describing a message sent/received between Spans. */
  messageEvent?: MessageEvent;
}

export const TimeEvent: Schema.Schema<TimeEvent> = Schema.suspend(() => Schema.Struct({
  time: Schema.optional(Schema.String),
  annotation: Schema.optional(Annotation),
  messageEvent: Schema.optional(MessageEvent),
})).annotate({ identifier: "TimeEvent" }) as any as Schema.Schema<TimeEvent>;

export interface TimeEvents {
  /** A collection of `TimeEvent`s. */
  timeEvent?: Array<TimeEvent>;
  /** The number of dropped annotations in all the included time events. If the value is 0, then no annotations were dropped. */
  droppedAnnotationsCount?: number;
  /** The number of dropped message events in all the included time events. If the value is 0, then no message events were dropped. */
  droppedMessageEventsCount?: number;
}

export const TimeEvents: Schema.Schema<TimeEvents> = Schema.suspend(() => Schema.Struct({
  timeEvent: Schema.optional(Schema.Array(TimeEvent)),
  droppedAnnotationsCount: Schema.optional(Schema.Number),
  droppedMessageEventsCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeEvents" }) as any as Schema.Schema<TimeEvents>;

export interface Link {
  /** The `[TRACE_ID]` for a trace within a project. */
  traceId?: string;
  /** The `[SPAN_ID]` for a span within a trace. */
  spanId?: string;
  /** The relationship of the current span relative to the linked span. */
  type?: "TYPE_UNSPECIFIED" | "CHILD_LINKED_SPAN" | "PARENT_LINKED_SPAN" | (string & {});
  /** A set of attributes on the link. Up to 32 attributes can be specified per link. */
  attributes?: Attributes;
}

export const Link: Schema.Schema<Link> = Schema.suspend(() => Schema.Struct({
  traceId: Schema.optional(Schema.String),
  spanId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  attributes: Schema.optional(Attributes),
})).annotate({ identifier: "Link" }) as any as Schema.Schema<Link>;

export interface Links {
  /** A collection of links. */
  link?: Array<Link>;
  /** The number of dropped links after the maximum size was enforced. If this value is 0, then no links were dropped. */
  droppedLinksCount?: number;
}

export const Links: Schema.Schema<Links> = Schema.suspend(() => Schema.Struct({
  link: Schema.optional(Schema.Array(Link)),
  droppedLinksCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "Links" }) as any as Schema.Schema<Links>;

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

export interface Span {
  /** Required. The resource name of the span in the following format: * `projects/[PROJECT_ID]/traces/[TRACE_ID]/spans/[SPAN_ID]` `[TRACE_ID]` is a unique identifier for a trace within a project; it is a 32-character hexadecimal encoding of a 16-byte array. It should not be zero. `[SPAN_ID]` is a unique identifier for a span within a trace; it is a 16-character hexadecimal encoding of an 8-byte array. It should not be zero. . */
  name?: string;
  /** Required. The `[SPAN_ID]` portion of the span's resource name. */
  spanId?: string;
  /** The `[SPAN_ID]` of this span's parent span. If this is a root span, then this field must be empty. */
  parentSpanId?: string;
  /** Required. A description of the span's operation (up to 128 bytes). Cloud Trace displays the description in the Cloud console. For example, the display name can be a qualified method name or a file name and a line number where the operation is called. A best practice is to use the same display name within an application and at the same call point. This makes it easier to correlate spans in different traces. */
  displayName?: TruncatableString;
  /** Required. The start time of the span. On the client side, this is the time kept by the local machine where the span execution starts. On the server side, this is the time when the server's application handler starts running. */
  startTime?: string;
  /** Required. The end time of the span. On the client side, this is the time kept by the local machine where the span execution ends. On the server side, this is the time when the server application handler stops running. */
  endTime?: string;
  /** A set of attributes on the span. You can have up to 32 attributes per span. */
  attributes?: Attributes;
  /** Stack trace captured at the start of the span. */
  stackTrace?: StackTrace;
  /** A set of time events. You can have up to 32 annotations and 128 message events per span. */
  timeEvents?: TimeEvents;
  /** Links associated with the span. You can have up to 128 links per Span. */
  links?: Links;
  /** Optional. The final status for this span. */
  status?: Status;
  /** Optional. Set this parameter to indicate whether this span is in the same process as its parent. If you do not set this parameter, Trace is unable to take advantage of this helpful information. */
  sameProcessAsParentSpan?: boolean;
  /** Optional. The number of child spans that were generated while this span was active. If set, allows implementation to detect missing child spans. */
  childSpanCount?: number;
  /** Optional. Distinguishes between spans generated in a particular context. For example, two spans with the same name may be distinguished using `CLIENT` (caller) and `SERVER` (callee) to identify an RPC call. */
  spanKind?: "SPAN_KIND_UNSPECIFIED" | "INTERNAL" | "SERVER" | "CLIENT" | "PRODUCER" | "CONSUMER" | (string & {});
}

export const Span: Schema.Schema<Span> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  spanId: Schema.optional(Schema.String),
  parentSpanId: Schema.optional(Schema.String),
  displayName: Schema.optional(TruncatableString),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  attributes: Schema.optional(Attributes),
  stackTrace: Schema.optional(StackTrace),
  timeEvents: Schema.optional(TimeEvents),
  links: Schema.optional(Links),
  status: Schema.optional(Status),
  sameProcessAsParentSpan: Schema.optional(Schema.Boolean),
  childSpanCount: Schema.optional(Schema.Number),
  spanKind: Schema.optional(Schema.String),
})).annotate({ identifier: "Span" }) as any as Schema.Schema<Span>;

export interface BatchWriteSpansRequest {
  /** Required. A list of new spans. The span names must not match existing spans, otherwise the results are undefined. */
  spans?: Array<Span>;
}

export const BatchWriteSpansRequest: Schema.Schema<BatchWriteSpansRequest> = Schema.suspend(() => Schema.Struct({
  spans: Schema.optional(Schema.Array(Span)),
})).annotate({ identifier: "BatchWriteSpansRequest" }) as any as Schema.Schema<BatchWriteSpansRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

// ==========================================================================
// Operations
// ==========================================================================

/** Batch writes new spans to new or existing traces. You cannot update existing spans. If a span ID already exists, an additional copy of the span will be stored. */
export interface BatchWriteProjectsTracesRequest {
  /** Required. The name of the project where the spans belong. The format is `projects/[PROJECT_ID]`. */
  name: string;
  /** Request body */
  body?: BatchWriteSpansRequest;
}

export const BatchWriteProjectsTracesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(BatchWriteSpansRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/traces:batchWrite", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchWriteProjectsTracesRequest>;

export type BatchWriteProjectsTracesResponse = Empty;
export const BatchWriteProjectsTracesResponse = Empty;

export type BatchWriteProjectsTracesError = CommonErrors;

export const batchWriteProjectsTraces: API.OperationMethod<BatchWriteProjectsTracesRequest, BatchWriteProjectsTracesResponse, BatchWriteProjectsTracesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchWriteProjectsTracesRequest,
  output: BatchWriteProjectsTracesResponse,
  errors: [],
}));

/** Creates a new span. If a span ID already exists, an additional copy of the span will be stored. */
export interface CreateSpanProjectsTracesSpansRequest {
  /** Required. The resource name of the span in the following format: * `projects/[PROJECT_ID]/traces/[TRACE_ID]/spans/[SPAN_ID]` `[TRACE_ID]` is a unique identifier for a trace within a project; it is a 32-character hexadecimal encoding of a 16-byte array. It should not be zero. `[SPAN_ID]` is a unique identifier for a span within a trace; it is a 16-character hexadecimal encoding of an 8-byte array. It should not be zero. . */
  name: string;
  /** Request body */
  body?: Span;
}

export const CreateSpanProjectsTracesSpansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Span).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/traces/{tracesId}/spans/{spansId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateSpanProjectsTracesSpansRequest>;

export type CreateSpanProjectsTracesSpansResponse = Span;
export const CreateSpanProjectsTracesSpansResponse = Span;

export type CreateSpanProjectsTracesSpansError = CommonErrors;

export const createSpanProjectsTracesSpans: API.OperationMethod<CreateSpanProjectsTracesSpansRequest, CreateSpanProjectsTracesSpansResponse, CreateSpanProjectsTracesSpansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateSpanProjectsTracesSpansRequest,
  output: CreateSpanProjectsTracesSpansResponse,
  errors: [],
}));

