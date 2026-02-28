// ==========================================================================
// Cloud Bigtable Admin API (bigtableadmin v2)
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
  name: "bigtableadmin",
  version: "v2",
  rootUrl: "https://bigtableadmin.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface DataBoostIsolationReadOnly {
  /** The Compute Billing Owner for this Data Boost App Profile. */
  computeBillingOwner?: "COMPUTE_BILLING_OWNER_UNSPECIFIED" | "HOST_PAYS" | (string & {});
}

export const DataBoostIsolationReadOnly: Schema.Schema<DataBoostIsolationReadOnly> = Schema.suspend(() => Schema.Struct({
  computeBillingOwner: Schema.optional(Schema.String),
})).annotate({ identifier: "DataBoostIsolationReadOnly" }) as any as Schema.Schema<DataBoostIsolationReadOnly>;

export interface RowAffinity {
}

export const RowAffinity: Schema.Schema<RowAffinity> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RowAffinity" }) as any as Schema.Schema<RowAffinity>;

export interface MultiClusterRoutingUseAny {
  /** Row affinity sticky routing based on the row key of the request. Requests that span multiple rows are routed non-deterministically. */
  rowAffinity?: RowAffinity;
  /** The set of clusters to route to. The order is ignored; clusters will be tried in order of distance. If left empty, all clusters are eligible. */
  clusterIds?: Array<string>;
}

export const MultiClusterRoutingUseAny: Schema.Schema<MultiClusterRoutingUseAny> = Schema.suspend(() => Schema.Struct({
  rowAffinity: Schema.optional(RowAffinity),
  clusterIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "MultiClusterRoutingUseAny" }) as any as Schema.Schema<MultiClusterRoutingUseAny>;

export interface SingleClusterRouting {
  /** The cluster to which read/write requests should be routed. */
  clusterId?: string;
  /** Whether or not `CheckAndMutateRow` and `ReadModifyWriteRow` requests are allowed by this app profile. It is unsafe to send these requests to the same table/row/column in multiple clusters. */
  allowTransactionalWrites?: boolean;
}

export const SingleClusterRouting: Schema.Schema<SingleClusterRouting> = Schema.suspend(() => Schema.Struct({
  clusterId: Schema.optional(Schema.String),
  allowTransactionalWrites: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SingleClusterRouting" }) as any as Schema.Schema<SingleClusterRouting>;

export interface StandardIsolation {
  /** The priority of requests sent using this app profile. */
  priority?: "PRIORITY_UNSPECIFIED" | "PRIORITY_LOW" | "PRIORITY_MEDIUM" | "PRIORITY_HIGH" | (string & {});
}

export const StandardIsolation: Schema.Schema<StandardIsolation> = Schema.suspend(() => Schema.Struct({
  priority: Schema.optional(Schema.String),
})).annotate({ identifier: "StandardIsolation" }) as any as Schema.Schema<StandardIsolation>;

export interface AppProfile {
  /** This field has been deprecated in favor of `standard_isolation.priority`. If you set this field, `standard_isolation.priority` will be set instead. The priority of requests sent using this app profile. */
  priority?: "PRIORITY_UNSPECIFIED" | "PRIORITY_LOW" | "PRIORITY_MEDIUM" | "PRIORITY_HIGH" | (string & {});
  /** Specifies that this app profile is intended for read-only usage via the Data Boost feature. */
  dataBoostIsolationReadOnly?: DataBoostIsolationReadOnly;
  /** Strongly validated etag for optimistic concurrency control. Preserve the value returned from `GetAppProfile` when calling `UpdateAppProfile` to fail the request if there has been a modification in the mean time. The `update_mask` of the request need not include `etag` for this protection to apply. See [Wikipedia](https://en.wikipedia.org/wiki/HTTP_ETag) and [RFC 7232](https://tools.ietf.org/html/rfc7232#section-2.3) for more details. */
  etag?: string;
  /** Use a multi-cluster routing policy. */
  multiClusterRoutingUseAny?: MultiClusterRoutingUseAny;
  /** Long form description of the use case for this AppProfile. */
  description?: string;
  /** Use a single-cluster routing policy. */
  singleClusterRouting?: SingleClusterRouting;
  /** The unique name of the app profile, up to 50 characters long. Values are of the form `projects/{project}/instances/{instance}/appProfiles/_a-zA-Z0-9*`. */
  name?: string;
  /** The standard options used for isolating this app profile's traffic from other use cases. */
  standardIsolation?: StandardIsolation;
}

export const AppProfile: Schema.Schema<AppProfile> = Schema.suspend(() => Schema.Struct({
  priority: Schema.optional(Schema.String),
  dataBoostIsolationReadOnly: Schema.optional(DataBoostIsolationReadOnly),
  etag: Schema.optional(Schema.String),
  multiClusterRoutingUseAny: Schema.optional(MultiClusterRoutingUseAny),
  description: Schema.optional(Schema.String),
  singleClusterRouting: Schema.optional(SingleClusterRouting),
  name: Schema.optional(Schema.String),
  standardIsolation: Schema.optional(StandardIsolation),
})).annotate({ identifier: "AppProfile" }) as any as Schema.Schema<AppProfile>;

export interface ListAppProfilesResponse {
  /** The list of requested app profiles. */
  appProfiles?: Array<AppProfile>;
  /** Locations from which AppProfile information could not be retrieved, due to an outage or some other transient condition. AppProfiles from these locations may be missing from `app_profiles`. Values are of the form `projects//locations/` */
  failedLocations?: Array<string>;
  /** Set if not all app profiles could be returned in a single response. Pass this value to `page_token` in another request to get the next page of results. */
  nextPageToken?: string;
}

export const ListAppProfilesResponse: Schema.Schema<ListAppProfilesResponse> = Schema.suspend(() => Schema.Struct({
  appProfiles: Schema.optional(Schema.Array(AppProfile)),
  failedLocations: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAppProfilesResponse" }) as any as Schema.Schema<ListAppProfilesResponse>;

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(() => Schema.Struct({
  requestedPolicyVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GetPolicyOptions" }) as any as Schema.Schema<GetPolicyOptions>;

export interface GoogleBigtableAdminV2TypeInt64EncodingOrderedCodeBytes {
}

export const GoogleBigtableAdminV2TypeInt64EncodingOrderedCodeBytes: Schema.Schema<GoogleBigtableAdminV2TypeInt64EncodingOrderedCodeBytes> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleBigtableAdminV2TypeInt64EncodingOrderedCodeBytes" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeInt64EncodingOrderedCodeBytes>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface GoogleBigtableAdminV2TypeBytesEncodingRaw {
  /** If set, allows NULL values to be encoded as the empty string "". The actual empty string, or any value which only contains the null byte `0x00`, has one more null byte appended. */
  escapeNulls?: boolean;
}

export const GoogleBigtableAdminV2TypeBytesEncodingRaw: Schema.Schema<GoogleBigtableAdminV2TypeBytesEncodingRaw> = Schema.suspend(() => Schema.Struct({
  escapeNulls: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeBytesEncodingRaw" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeBytesEncodingRaw>;

export interface GoogleBigtableAdminV2TypeBytesEncoding {
  /** Use `Raw` encoding. */
  raw?: GoogleBigtableAdminV2TypeBytesEncodingRaw;
}

export const GoogleBigtableAdminV2TypeBytesEncoding: Schema.Schema<GoogleBigtableAdminV2TypeBytesEncoding> = Schema.suspend(() => Schema.Struct({
  raw: Schema.optional(GoogleBigtableAdminV2TypeBytesEncodingRaw),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeBytesEncoding" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeBytesEncoding>;

export interface GoogleBigtableAdminV2TypeBytes {
  /** The encoding to use when converting to or from lower level types. */
  encoding?: GoogleBigtableAdminV2TypeBytesEncoding;
}

export const GoogleBigtableAdminV2TypeBytes: Schema.Schema<GoogleBigtableAdminV2TypeBytes> = Schema.suspend(() => Schema.Struct({
  encoding: Schema.optional(GoogleBigtableAdminV2TypeBytesEncoding),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeBytes" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeBytes>;

export interface GoogleBigtableAdminV2TypeInt64EncodingBigEndianBytes {
  /** Deprecated: ignored if set. */
  bytesType?: GoogleBigtableAdminV2TypeBytes;
}

export const GoogleBigtableAdminV2TypeInt64EncodingBigEndianBytes: Schema.Schema<GoogleBigtableAdminV2TypeInt64EncodingBigEndianBytes> = Schema.suspend(() => Schema.Struct({
  bytesType: Schema.optional(GoogleBigtableAdminV2TypeBytes),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeInt64EncodingBigEndianBytes" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeInt64EncodingBigEndianBytes>;

export interface GoogleBigtableAdminV2TypeInt64Encoding {
  /** Use `OrderedCodeBytes` encoding. */
  orderedCodeBytes?: GoogleBigtableAdminV2TypeInt64EncodingOrderedCodeBytes;
  /** Use `BigEndianBytes` encoding. */
  bigEndianBytes?: GoogleBigtableAdminV2TypeInt64EncodingBigEndianBytes;
}

export const GoogleBigtableAdminV2TypeInt64Encoding: Schema.Schema<GoogleBigtableAdminV2TypeInt64Encoding> = Schema.suspend(() => Schema.Struct({
  orderedCodeBytes: Schema.optional(GoogleBigtableAdminV2TypeInt64EncodingOrderedCodeBytes),
  bigEndianBytes: Schema.optional(GoogleBigtableAdminV2TypeInt64EncodingBigEndianBytes),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeInt64Encoding" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeInt64Encoding>;

export interface GoogleBigtableAdminV2TypeInt64 {
  /** The encoding to use when converting to or from lower level types. */
  encoding?: GoogleBigtableAdminV2TypeInt64Encoding;
}

export const GoogleBigtableAdminV2TypeInt64: Schema.Schema<GoogleBigtableAdminV2TypeInt64> = Schema.suspend(() => Schema.Struct({
  encoding: Schema.optional(GoogleBigtableAdminV2TypeInt64Encoding),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeInt64" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeInt64>;

export interface GoogleBigtableAdminV2TypeFloat64 {
}

export const GoogleBigtableAdminV2TypeFloat64: Schema.Schema<GoogleBigtableAdminV2TypeFloat64> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleBigtableAdminV2TypeFloat64" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeFloat64>;

export interface GoogleBigtableAdminV2TypeAggregateMin {
}

export const GoogleBigtableAdminV2TypeAggregateMin: Schema.Schema<GoogleBigtableAdminV2TypeAggregateMin> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleBigtableAdminV2TypeAggregateMin" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeAggregateMin>;

export interface GoogleBigtableAdminV2TypeAggregateHyperLogLogPlusPlusUniqueCount {
}

export const GoogleBigtableAdminV2TypeAggregateHyperLogLogPlusPlusUniqueCount: Schema.Schema<GoogleBigtableAdminV2TypeAggregateHyperLogLogPlusPlusUniqueCount> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleBigtableAdminV2TypeAggregateHyperLogLogPlusPlusUniqueCount" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeAggregateHyperLogLogPlusPlusUniqueCount>;

export interface GoogleBigtableAdminV2TypeAggregateSum {
}

export const GoogleBigtableAdminV2TypeAggregateSum: Schema.Schema<GoogleBigtableAdminV2TypeAggregateSum> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleBigtableAdminV2TypeAggregateSum" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeAggregateSum>;

export interface GoogleBigtableAdminV2TypeAggregateMax {
}

export const GoogleBigtableAdminV2TypeAggregateMax: Schema.Schema<GoogleBigtableAdminV2TypeAggregateMax> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleBigtableAdminV2TypeAggregateMax" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeAggregateMax>;

export interface GoogleBigtableAdminV2TypeAggregate {
  /** Min aggregator. */
  min?: GoogleBigtableAdminV2TypeAggregateMin;
  /** Type of the inputs that are accumulated by this `Aggregate`. Use `AddInput` mutations to accumulate new inputs. */
  inputType?: Type;
  /** HyperLogLogPlusPlusUniqueCount aggregator. */
  hllppUniqueCount?: GoogleBigtableAdminV2TypeAggregateHyperLogLogPlusPlusUniqueCount;
  /** Sum aggregator. */
  sum?: GoogleBigtableAdminV2TypeAggregateSum;
  /** Output only. Type that holds the internal accumulator state for the `Aggregate`. This is a function of the `input_type` and `aggregator` chosen. */
  stateType?: Type;
  /** Max aggregator. */
  max?: GoogleBigtableAdminV2TypeAggregateMax;
}

export const GoogleBigtableAdminV2TypeAggregate: Schema.Schema<GoogleBigtableAdminV2TypeAggregate> = Schema.suspend(() => Schema.Struct({
  min: Schema.optional(GoogleBigtableAdminV2TypeAggregateMin),
  inputType: Schema.optional(Type),
  hllppUniqueCount: Schema.optional(GoogleBigtableAdminV2TypeAggregateHyperLogLogPlusPlusUniqueCount),
  sum: Schema.optional(GoogleBigtableAdminV2TypeAggregateSum),
  stateType: Schema.optional(Type),
  max: Schema.optional(GoogleBigtableAdminV2TypeAggregateMax),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeAggregate" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeAggregate>;

export interface GoogleBigtableAdminV2TypeTimestampEncoding {
  /** Encodes the number of microseconds since the Unix epoch using the given `Int64` encoding. Values must be microsecond-aligned. Compatible with: - Java `Instant.truncatedTo()` with `ChronoUnit.MICROS` */
  unixMicrosInt64?: GoogleBigtableAdminV2TypeInt64Encoding;
}

export const GoogleBigtableAdminV2TypeTimestampEncoding: Schema.Schema<GoogleBigtableAdminV2TypeTimestampEncoding> = Schema.suspend(() => Schema.Struct({
  unixMicrosInt64: Schema.optional(GoogleBigtableAdminV2TypeInt64Encoding),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeTimestampEncoding" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeTimestampEncoding>;

export interface GoogleBigtableAdminV2TypeTimestamp {
  /** The encoding to use when converting to or from lower level types. */
  encoding?: GoogleBigtableAdminV2TypeTimestampEncoding;
}

export const GoogleBigtableAdminV2TypeTimestamp: Schema.Schema<GoogleBigtableAdminV2TypeTimestamp> = Schema.suspend(() => Schema.Struct({
  encoding: Schema.optional(GoogleBigtableAdminV2TypeTimestampEncoding),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeTimestamp" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeTimestamp>;

export interface GoogleBigtableAdminV2TypeStructEncodingSingleton {
}

export const GoogleBigtableAdminV2TypeStructEncodingSingleton: Schema.Schema<GoogleBigtableAdminV2TypeStructEncodingSingleton> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleBigtableAdminV2TypeStructEncodingSingleton" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeStructEncodingSingleton>;

export interface GoogleBigtableAdminV2TypeStructEncodingDelimitedBytes {
  /** Byte sequence used to delimit concatenated fields. The delimiter must contain at least 1 character and at most 50 characters. */
  delimiter?: string;
}

export const GoogleBigtableAdminV2TypeStructEncodingDelimitedBytes: Schema.Schema<GoogleBigtableAdminV2TypeStructEncodingDelimitedBytes> = Schema.suspend(() => Schema.Struct({
  delimiter: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeStructEncodingDelimitedBytes" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeStructEncodingDelimitedBytes>;

export interface GoogleBigtableAdminV2TypeStructEncodingOrderedCodeBytes {
}

export const GoogleBigtableAdminV2TypeStructEncodingOrderedCodeBytes: Schema.Schema<GoogleBigtableAdminV2TypeStructEncodingOrderedCodeBytes> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleBigtableAdminV2TypeStructEncodingOrderedCodeBytes" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeStructEncodingOrderedCodeBytes>;

export interface GoogleBigtableAdminV2TypeStructEncoding {
  /** Use `Singleton` encoding. */
  singleton?: GoogleBigtableAdminV2TypeStructEncodingSingleton;
  /** Use `DelimitedBytes` encoding. */
  delimitedBytes?: GoogleBigtableAdminV2TypeStructEncodingDelimitedBytes;
  /** User `OrderedCodeBytes` encoding. */
  orderedCodeBytes?: GoogleBigtableAdminV2TypeStructEncodingOrderedCodeBytes;
}

export const GoogleBigtableAdminV2TypeStructEncoding: Schema.Schema<GoogleBigtableAdminV2TypeStructEncoding> = Schema.suspend(() => Schema.Struct({
  singleton: Schema.optional(GoogleBigtableAdminV2TypeStructEncodingSingleton),
  delimitedBytes: Schema.optional(GoogleBigtableAdminV2TypeStructEncodingDelimitedBytes),
  orderedCodeBytes: Schema.optional(GoogleBigtableAdminV2TypeStructEncodingOrderedCodeBytes),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeStructEncoding" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeStructEncoding>;

export interface GoogleBigtableAdminV2TypeStructField {
  /** The type of values in this field. */
  type?: Type;
  /** The field name (optional). Fields without a `field_name` are considered anonymous and cannot be referenced by name. */
  fieldName?: string;
}

export const GoogleBigtableAdminV2TypeStructField: Schema.Schema<GoogleBigtableAdminV2TypeStructField> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Type),
  fieldName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeStructField" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeStructField>;

export interface GoogleBigtableAdminV2TypeStruct {
  /** The encoding to use when converting to or from lower level types. */
  encoding?: GoogleBigtableAdminV2TypeStructEncoding;
  /** The names and types of the fields in this struct. */
  fields?: Array<GoogleBigtableAdminV2TypeStructField>;
}

export const GoogleBigtableAdminV2TypeStruct: Schema.Schema<GoogleBigtableAdminV2TypeStruct> = Schema.suspend(() => Schema.Struct({
  encoding: Schema.optional(GoogleBigtableAdminV2TypeStructEncoding),
  fields: Schema.optional(Schema.Array(GoogleBigtableAdminV2TypeStructField)),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeStruct" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeStruct>;

export interface GoogleBigtableAdminV2TypeDate {
}

export const GoogleBigtableAdminV2TypeDate: Schema.Schema<GoogleBigtableAdminV2TypeDate> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleBigtableAdminV2TypeDate" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeDate>;

export interface GoogleBigtableAdminV2TypeFloat32 {
}

export const GoogleBigtableAdminV2TypeFloat32: Schema.Schema<GoogleBigtableAdminV2TypeFloat32> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleBigtableAdminV2TypeFloat32" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeFloat32>;

export interface GoogleBigtableAdminV2TypeBool {
}

export const GoogleBigtableAdminV2TypeBool: Schema.Schema<GoogleBigtableAdminV2TypeBool> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleBigtableAdminV2TypeBool" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeBool>;

export interface GoogleBigtableAdminV2TypeStringEncodingUtf8Bytes {
  /** Single-character escape sequence used to support NULL values. If set, allows NULL values to be encoded as the empty string "". The actual empty string, or any value where every character equals `null_escape_char`, has one more `null_escape_char` appended. If `null_escape_char` is set and does not equal the ASCII null character `0x00`, then the encoding will not support sorted mode. . */
  nullEscapeChar?: string;
}

export const GoogleBigtableAdminV2TypeStringEncodingUtf8Bytes: Schema.Schema<GoogleBigtableAdminV2TypeStringEncodingUtf8Bytes> = Schema.suspend(() => Schema.Struct({
  nullEscapeChar: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeStringEncodingUtf8Bytes" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeStringEncodingUtf8Bytes>;

export interface GoogleBigtableAdminV2TypeStringEncodingUtf8Raw {
}

export const GoogleBigtableAdminV2TypeStringEncodingUtf8Raw: Schema.Schema<GoogleBigtableAdminV2TypeStringEncodingUtf8Raw> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleBigtableAdminV2TypeStringEncodingUtf8Raw" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeStringEncodingUtf8Raw>;

export interface GoogleBigtableAdminV2TypeStringEncoding {
  /** Use `Utf8Bytes` encoding. */
  utf8Bytes?: GoogleBigtableAdminV2TypeStringEncodingUtf8Bytes;
  /** Deprecated: if set, converts to an empty `utf8_bytes`. */
  utf8Raw?: GoogleBigtableAdminV2TypeStringEncodingUtf8Raw;
}

export const GoogleBigtableAdminV2TypeStringEncoding: Schema.Schema<GoogleBigtableAdminV2TypeStringEncoding> = Schema.suspend(() => Schema.Struct({
  utf8Bytes: Schema.optional(GoogleBigtableAdminV2TypeStringEncodingUtf8Bytes),
  utf8Raw: Schema.optional(GoogleBigtableAdminV2TypeStringEncodingUtf8Raw),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeStringEncoding" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeStringEncoding>;

export interface GoogleBigtableAdminV2TypeString {
  /** The encoding to use when converting to or from lower level types. */
  encoding?: GoogleBigtableAdminV2TypeStringEncoding;
}

export const GoogleBigtableAdminV2TypeString: Schema.Schema<GoogleBigtableAdminV2TypeString> = Schema.suspend(() => Schema.Struct({
  encoding: Schema.optional(GoogleBigtableAdminV2TypeStringEncoding),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeString" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeString>;

export interface GoogleBigtableAdminV2TypeProto {
  /** The fully qualified name of the protobuf message, including package. In the format of "foo.bar.Message". */
  messageName?: string;
  /** The ID of the schema bundle that this proto is defined in. */
  schemaBundleId?: string;
}

export const GoogleBigtableAdminV2TypeProto: Schema.Schema<GoogleBigtableAdminV2TypeProto> = Schema.suspend(() => Schema.Struct({
  messageName: Schema.optional(Schema.String),
  schemaBundleId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeProto" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeProto>;

export interface GoogleBigtableAdminV2TypeEnum {
  /** The fully qualified name of the protobuf enum message, including package. In the format of "foo.bar.EnumMessage". */
  enumName?: string;
  /** The ID of the schema bundle that this enum is defined in. */
  schemaBundleId?: string;
}

export const GoogleBigtableAdminV2TypeEnum: Schema.Schema<GoogleBigtableAdminV2TypeEnum> = Schema.suspend(() => Schema.Struct({
  enumName: Schema.optional(Schema.String),
  schemaBundleId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeEnum" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeEnum>;

export interface GoogleBigtableAdminV2TypeMap {
  /** The type of the values in a map. */
  valueType?: Type;
  /** The type of a map key. Only `Bytes`, `String`, and `Int64` are allowed as key types. */
  keyType?: Type;
}

export const GoogleBigtableAdminV2TypeMap: Schema.Schema<GoogleBigtableAdminV2TypeMap> = Schema.suspend(() => Schema.Struct({
  valueType: Schema.optional(Type),
  keyType: Schema.optional(Type),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeMap" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeMap>;

export interface GoogleBigtableAdminV2TypeGeography {
}

export const GoogleBigtableAdminV2TypeGeography: Schema.Schema<GoogleBigtableAdminV2TypeGeography> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleBigtableAdminV2TypeGeography" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeGeography>;

export interface Type {
  /** Int64 */
  int64Type?: GoogleBigtableAdminV2TypeInt64;
  /** Array */
  arrayType?: GoogleBigtableAdminV2TypeArray;
  /** Float64 */
  float64Type?: GoogleBigtableAdminV2TypeFloat64;
  /** Aggregate */
  aggregateType?: GoogleBigtableAdminV2TypeAggregate;
  /** Timestamp */
  timestampType?: GoogleBigtableAdminV2TypeTimestamp;
  /** Struct */
  structType?: GoogleBigtableAdminV2TypeStruct;
  /** Date */
  dateType?: GoogleBigtableAdminV2TypeDate;
  /** Bytes */
  bytesType?: GoogleBigtableAdminV2TypeBytes;
  /** Float32 */
  float32Type?: GoogleBigtableAdminV2TypeFloat32;
  /** Bool */
  boolType?: GoogleBigtableAdminV2TypeBool;
  /** String */
  stringType?: GoogleBigtableAdminV2TypeString;
  /** Proto */
  protoType?: GoogleBigtableAdminV2TypeProto;
  /** Enum */
  enumType?: GoogleBigtableAdminV2TypeEnum;
  /** Map */
  mapType?: GoogleBigtableAdminV2TypeMap;
  /** Geography */
  geographyType?: GoogleBigtableAdminV2TypeGeography;
}

export const Type: Schema.Schema<Type> = Schema.suspend(() => Schema.Struct({
  int64Type: Schema.optional(GoogleBigtableAdminV2TypeInt64),
  arrayType: Schema.optional(GoogleBigtableAdminV2TypeArray),
  float64Type: Schema.optional(GoogleBigtableAdminV2TypeFloat64),
  aggregateType: Schema.optional(GoogleBigtableAdminV2TypeAggregate),
  timestampType: Schema.optional(GoogleBigtableAdminV2TypeTimestamp),
  structType: Schema.optional(GoogleBigtableAdminV2TypeStruct),
  dateType: Schema.optional(GoogleBigtableAdminV2TypeDate),
  bytesType: Schema.optional(GoogleBigtableAdminV2TypeBytes),
  float32Type: Schema.optional(GoogleBigtableAdminV2TypeFloat32),
  boolType: Schema.optional(GoogleBigtableAdminV2TypeBool),
  stringType: Schema.optional(GoogleBigtableAdminV2TypeString),
  protoType: Schema.optional(GoogleBigtableAdminV2TypeProto),
  enumType: Schema.optional(GoogleBigtableAdminV2TypeEnum),
  mapType: Schema.optional(GoogleBigtableAdminV2TypeMap),
  geographyType: Schema.optional(GoogleBigtableAdminV2TypeGeography),
})).annotate({ identifier: "Type" }) as any as Schema.Schema<Type>;

export interface GoogleBigtableAdminV2TypeArray {
  /** The type of the elements in the array. This must not be `Array`. */
  elementType?: Type;
}

export const GoogleBigtableAdminV2TypeArray: Schema.Schema<GoogleBigtableAdminV2TypeArray> = Schema.suspend(() => Schema.Struct({
  elementType: Schema.optional(Type),
})).annotate({ identifier: "GoogleBigtableAdminV2TypeArray" }) as any as Schema.Schema<GoogleBigtableAdminV2TypeArray>;

export interface Union {
  /** Delete cells which would be deleted by any element of `rules`. */
  rules?: Array<GcRule>;
}

export const Union: Schema.Schema<Union> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(GcRule)),
})).annotate({ identifier: "Union" }) as any as Schema.Schema<Union>;

export interface Intersection {
  /** Only delete cells which would be deleted by every element of `rules`. */
  rules?: Array<GcRule>;
}

export const Intersection: Schema.Schema<Intersection> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(GcRule)),
})).annotate({ identifier: "Intersection" }) as any as Schema.Schema<Intersection>;

export interface GcRule {
  /** Delete cells that would be deleted by any nested rule. */
  union?: Union;
  /** Delete cells in a column older than the given age. Values must be at least one millisecond, and will be truncated to microsecond granularity. */
  maxAge?: string;
  /** Delete cells that would be deleted by every nested rule. */
  intersection?: Intersection;
  /** Delete all cells in a column except the most recent N. */
  maxNumVersions?: number;
}

export const GcRule: Schema.Schema<GcRule> = Schema.suspend(() => Schema.Struct({
  union: Schema.optional(Union),
  maxAge: Schema.optional(Schema.String),
  intersection: Schema.optional(Intersection),
  maxNumVersions: Schema.optional(Schema.Number),
})).annotate({ identifier: "GcRule" }) as any as Schema.Schema<GcRule>;

export interface GoogleBigtableAdminV2AuthorizedViewFamilySubsets {
  /** Prefixes for qualifiers to be included in the AuthorizedView. Every qualifier starting with one of these prefixes is included in the AuthorizedView. To provide access to all qualifiers, include the empty string as a prefix (""). */
  qualifierPrefixes?: Array<string>;
  /** Individual exact column qualifiers to be included in the AuthorizedView. */
  qualifiers?: Array<string>;
}

export const GoogleBigtableAdminV2AuthorizedViewFamilySubsets: Schema.Schema<GoogleBigtableAdminV2AuthorizedViewFamilySubsets> = Schema.suspend(() => Schema.Struct({
  qualifierPrefixes: Schema.optional(Schema.Array(Schema.String)),
  qualifiers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleBigtableAdminV2AuthorizedViewFamilySubsets" }) as any as Schema.Schema<GoogleBigtableAdminV2AuthorizedViewFamilySubsets>;

export interface GoogleBigtableAdminV2MaterializedViewClusterState {
  /** Output only. The state of the materialized view in this cluster. */
  replicationState?: "STATE_NOT_KNOWN" | "INITIALIZING" | "READY" | (string & {});
}

export const GoogleBigtableAdminV2MaterializedViewClusterState: Schema.Schema<GoogleBigtableAdminV2MaterializedViewClusterState> = Schema.suspend(() => Schema.Struct({
  replicationState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleBigtableAdminV2MaterializedViewClusterState" }) as any as Schema.Schema<GoogleBigtableAdminV2MaterializedViewClusterState>;

export interface MaterializedView {
  /** Optional. The etag for this materialized view. This may be sent on update requests to ensure that the client has an up-to-date value before proceeding. The server returns an ABORTED error on a mismatched etag. Views: `SCHEMA_VIEW`, `REPLICATION_VIEW`, `FULL`. */
  etag?: string;
  /** Required. Immutable. The materialized view's select query. Views: `SCHEMA_VIEW`, `FULL`. */
  query?: string;
  /** Output only. Map from cluster ID to per-cluster materialized view state. If it could not be determined whether or not the materialized view has data in a particular cluster (for example, if its zone is unavailable), then there will be an entry for the cluster with `STATE_NOT_KNOWN` state. Views: `REPLICATION_VIEW`, `FULL`. */
  clusterStates?: Record<string, GoogleBigtableAdminV2MaterializedViewClusterState>;
  /** Set to true to make the MaterializedView protected against deletion. Views: `SCHEMA_VIEW`, `REPLICATION_VIEW`, `FULL`. */
  deletionProtection?: boolean;
  /** Identifier. The unique name of the materialized view. Format: `projects/{project}/instances/{instance}/materializedViews/{materialized_view}` Views: `SCHEMA_VIEW`, `REPLICATION_VIEW`, `FULL`. */
  name?: string;
}

export const MaterializedView: Schema.Schema<MaterializedView> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
  clusterStates: Schema.optional(Schema.Record(Schema.String, GoogleBigtableAdminV2MaterializedViewClusterState)),
  deletionProtection: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "MaterializedView" }) as any as Schema.Schema<MaterializedView>;

export interface ListMaterializedViewsResponse {
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** The list of requested materialized views. */
  materializedViews?: Array<MaterializedView>;
}

export const ListMaterializedViewsResponse: Schema.Schema<ListMaterializedViewsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  materializedViews: Schema.optional(Schema.Array(MaterializedView)),
})).annotate({ identifier: "ListMaterializedViewsResponse" }) as any as Schema.Schema<ListMaterializedViewsResponse>;

export interface GoogleBigtableAdminV2AuthorizedViewSubsetView {
  /** Map from column family name to the columns in this family to be included in the AuthorizedView. */
  familySubsets?: Record<string, GoogleBigtableAdminV2AuthorizedViewFamilySubsets>;
  /** Row prefixes to be included in the AuthorizedView. To provide access to all rows, include the empty string as a prefix (""). */
  rowPrefixes?: Array<string>;
}

export const GoogleBigtableAdminV2AuthorizedViewSubsetView: Schema.Schema<GoogleBigtableAdminV2AuthorizedViewSubsetView> = Schema.suspend(() => Schema.Struct({
  familySubsets: Schema.optional(Schema.Record(Schema.String, GoogleBigtableAdminV2AuthorizedViewFamilySubsets)),
  rowPrefixes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleBigtableAdminV2AuthorizedViewSubsetView" }) as any as Schema.Schema<GoogleBigtableAdminV2AuthorizedViewSubsetView>;

export interface AuthorizedView {
  /** Set to true to make the AuthorizedView protected against deletion. The parent Table and containing Instance cannot be deleted if an AuthorizedView has this bit set. */
  deletionProtection?: boolean;
  /** An AuthorizedView permitting access to an explicit subset of a Table. */
  subsetView?: GoogleBigtableAdminV2AuthorizedViewSubsetView;
  /** Identifier. The name of this AuthorizedView. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/authorizedViews/{authorized_view}` */
  name?: string;
  /** The etag for this AuthorizedView. If this is provided on update, it must match the server's etag. The server returns ABORTED error on a mismatched etag. */
  etag?: string;
}

export const AuthorizedView: Schema.Schema<AuthorizedView> = Schema.suspend(() => Schema.Struct({
  deletionProtection: Schema.optional(Schema.Boolean),
  subsetView: Schema.optional(GoogleBigtableAdminV2AuthorizedViewSubsetView),
  name: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "AuthorizedView" }) as any as Schema.Schema<AuthorizedView>;

export interface UpdateAuthorizedViewRequest {
  /** Optional. The list of fields to update. A mask specifying which fields in the AuthorizedView resource should be updated. This mask is relative to the AuthorizedView resource, not to the request message. A field will be overwritten if it is in the mask. If empty, all fields set in the request will be overwritten. A special value `*` means to overwrite all fields (including fields not set in the request). */
  updateMask?: string;
  /** Optional. If true, ignore the safety checks when updating the AuthorizedView. */
  ignoreWarnings?: boolean;
  /** Required. The AuthorizedView to update. The `name` in `authorized_view` is used to identify the AuthorizedView. AuthorizedView name must in this format: `projects/{project}/instances/{instance}/tables/{table}/authorizedViews/{authorized_view}`. */
  authorizedView?: AuthorizedView;
}

export const UpdateAuthorizedViewRequest: Schema.Schema<UpdateAuthorizedViewRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  ignoreWarnings: Schema.optional(Schema.Boolean),
  authorizedView: Schema.optional(AuthorizedView),
})).annotate({ identifier: "UpdateAuthorizedViewRequest" }) as any as Schema.Schema<UpdateAuthorizedViewRequest>;

export interface UpdateAuthorizedViewMetadata {
  /** The time at which the original request was received. */
  requestTime?: string;
  /** The time at which the operation failed or was completed successfully. */
  finishTime?: string;
  /** The request that prompted the initiation of this UpdateAuthorizedView operation. */
  originalRequest?: UpdateAuthorizedViewRequest;
}

export const UpdateAuthorizedViewMetadata: Schema.Schema<UpdateAuthorizedViewMetadata> = Schema.suspend(() => Schema.Struct({
  requestTime: Schema.optional(Schema.String),
  finishTime: Schema.optional(Schema.String),
  originalRequest: Schema.optional(UpdateAuthorizedViewRequest),
})).annotate({ identifier: "UpdateAuthorizedViewMetadata" }) as any as Schema.Schema<UpdateAuthorizedViewMetadata>;

export interface CreateMaterializedViewRequest {
  /** Required. The parent instance where this materialized view will be created. Format: `projects/{project}/instances/{instance}`. */
  parent?: string;
  /** Required. The materialized view to create. */
  materializedView?: MaterializedView;
  /** Required. The ID to use for the materialized view, which will become the final component of the materialized view's resource name. */
  materializedViewId?: string;
}

export const CreateMaterializedViewRequest: Schema.Schema<CreateMaterializedViewRequest> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  materializedView: Schema.optional(MaterializedView),
  materializedViewId: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateMaterializedViewRequest" }) as any as Schema.Schema<CreateMaterializedViewRequest>;

export interface Instance {
  /** Output only. Reserved for future use. */
  satisfiesPzs?: boolean;
  /** Output only. The current state of the instance. */
  state?: "STATE_NOT_KNOWN" | "READY" | "CREATING" | (string & {});
  /** Output only. Reserved for future use. */
  satisfiesPzi?: boolean;
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: - "123/environment": "production", - "123/costCenter": "marketing" Tags and Labels (above) are both used to bind metadata to resources, with different use-cases. See https://cloud.google.com/resource-manager/docs/tags/tags-overview for an in-depth overview on the difference between tags and labels. */
  tags?: Record<string, string>;
  /** The type of the instance. Defaults to `PRODUCTION`. */
  type?: "TYPE_UNSPECIFIED" | "PRODUCTION" | "DEVELOPMENT" | (string & {});
  /** Required. The descriptive name for this instance as it appears in UIs. Can be changed at any time, but should be kept globally unique to avoid confusion. */
  displayName?: string;
  /** The unique name of the instance. Values are of the form `projects/{project}/instances/a-z+[a-z0-9]`. */
  name?: string;
  /** Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer's organizational needs and deployment strategies. They can be used to filter resources and aggregate metrics. * Label keys must be between 1 and 63 characters long and must conform to the regular expression: `\p{Ll}\p{Lo}{0,62}`. * Label values must be between 0 and 63 characters long and must conform to the regular expression: `[\p{Ll}\p{Lo}\p{N}_-]{0,63}`. * No more than 64 labels can be associated with a given resource. * Keys and values must both be under 128 bytes. */
  labels?: Record<string, string>;
  /** Output only. A commit timestamp representing when this Instance was created. For instances created before this field was added (August 2021), this value is `seconds: 0, nanos: 1`. */
  createTime?: string;
}

export const Instance: Schema.Schema<Instance> = Schema.suspend(() => Schema.Struct({
  satisfiesPzs: Schema.optional(Schema.Boolean),
  state: Schema.optional(Schema.String),
  satisfiesPzi: Schema.optional(Schema.Boolean),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  type: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Instance" }) as any as Schema.Schema<Instance>;

export interface PartialUpdateInstanceRequest {
  /** Required. The subset of Instance fields which should be replaced. Must be explicitly set. */
  updateMask?: string;
  /** Required. The Instance which will (partially) replace the current value. */
  instance?: Instance;
}

export const PartialUpdateInstanceRequest: Schema.Schema<PartialUpdateInstanceRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  instance: Schema.optional(Instance),
})).annotate({ identifier: "PartialUpdateInstanceRequest" }) as any as Schema.Schema<PartialUpdateInstanceRequest>;

export interface UpdateInstanceMetadata {
  /** The time at which the operation failed or was completed successfully. */
  finishTime?: string;
  /** The request that prompted the initiation of this UpdateInstance operation. */
  originalRequest?: PartialUpdateInstanceRequest;
  /** The time at which the original request was received. */
  requestTime?: string;
}

export const UpdateInstanceMetadata: Schema.Schema<UpdateInstanceMetadata> = Schema.suspend(() => Schema.Struct({
  finishTime: Schema.optional(Schema.String),
  originalRequest: Schema.optional(PartialUpdateInstanceRequest),
  requestTime: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateInstanceMetadata" }) as any as Schema.Schema<UpdateInstanceMetadata>;

export interface ColumnFamilyStats {
  /** How many column qualifiers are present in this column family, averaged over all rows in the table. e.g. For column family "family" in a table with 3 rows: * A row with cells in "family:col" and "other:col" (1 column in "family") * A row with cells in "family:col", "family:other_col", and "other:data" (2 columns in "family") * A row with cells in "other:col" (0 columns in "family", "family" not present) would report (1 + 2 + 0)/3 = 1.5 in this field. */
  averageColumnsPerRow?: number;
  /** How much space the data in the column family occupies. This is roughly how many bytes would be needed to read the contents of the entire column family (e.g. by streaming all contents out). */
  logicalDataBytes?: string;
  /** How many cells are present per column qualifier in this column family, averaged over all rows containing any column in the column family. e.g. For column family "family" in a table with 3 rows: * A row with 3 cells in "family:col" and 1 cell in "other:col" (3 cells / 1 column in "family") * A row with 1 cell in "family:col", 7 cells in "family:other_col", and 7 cells in "other:data" (8 cells / 2 columns in "family") * A row with 3 cells in "other:col" (0 columns in "family", "family" not present) would report (3 + 8 + 0)/(1 + 2 + 0) = 3.66 in this field. */
  averageCellsPerColumn?: number;
}

export const ColumnFamilyStats: Schema.Schema<ColumnFamilyStats> = Schema.suspend(() => Schema.Struct({
  averageColumnsPerRow: Schema.optional(Schema.Number),
  logicalDataBytes: Schema.optional(Schema.String),
  averageCellsPerColumn: Schema.optional(Schema.Number),
})).annotate({ identifier: "ColumnFamilyStats" }) as any as Schema.Schema<ColumnFamilyStats>;

export interface ColumnFamily {
  /** Output only. Only available with STATS_VIEW, this includes summary statistics about column family contents. For statistics over an entire table, see TableStats above. */
  stats?: ColumnFamilyStats;
  /** Garbage collection rule specified as a protobuf. Must serialize to at most 500 bytes. NOTE: Garbage collection executes opportunistically in the background, and so it's possible for reads to return a cell even if it matches the active GC expression for its family. */
  gcRule?: GcRule;
  /** The type of data stored in each of this family's cell values, including its full encoding. If omitted, the family only serves raw untyped bytes. For now, only the `Aggregate` type is supported. `Aggregate` can only be set at family creation and is immutable afterwards. This field is mutually exclusive with `sql_type`. If `value_type` is `Aggregate`, written data must be compatible with: * `value_type.input_type` for `AddInput` mutations */
  valueType?: Type;
}

export const ColumnFamily: Schema.Schema<ColumnFamily> = Schema.suspend(() => Schema.Struct({
  stats: Schema.optional(ColumnFamilyStats),
  gcRule: Schema.optional(GcRule),
  valueType: Schema.optional(Type),
})).annotate({ identifier: "ColumnFamily" }) as any as Schema.Schema<ColumnFamily>;

export interface BackupInfo {
  /** Output only. This time that the backup was finished. Row data in the backup will be no newer than this timestamp. */
  endTime?: string;
  /** Output only. Name of the backup from which this backup was copied. If a backup is not created by copying a backup, this field will be empty. Values are of the form: projects//instances//clusters//backups/ */
  sourceBackup?: string;
  /** Output only. The time that the backup was started. Row data in the backup will be no older than this timestamp. */
  startTime?: string;
  /** Output only. Name of the backup. */
  backup?: string;
  /** Output only. Name of the table the backup was created from. */
  sourceTable?: string;
}

export const BackupInfo: Schema.Schema<BackupInfo> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  sourceBackup: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  backup: Schema.optional(Schema.String),
  sourceTable: Schema.optional(Schema.String),
})).annotate({ identifier: "BackupInfo" }) as any as Schema.Schema<BackupInfo>;

export interface RestoreInfo {
  /** The type of the restore source. */
  sourceType?: "RESTORE_SOURCE_TYPE_UNSPECIFIED" | "BACKUP" | (string & {});
  /** Information about the backup used to restore the table. The backup may no longer exist. */
  backupInfo?: BackupInfo;
}

export const RestoreInfo: Schema.Schema<RestoreInfo> = Schema.suspend(() => Schema.Struct({
  sourceType: Schema.optional(Schema.String),
  backupInfo: Schema.optional(BackupInfo),
})).annotate({ identifier: "RestoreInfo" }) as any as Schema.Schema<RestoreInfo>;

export interface CreateAuthorizedViewRequest {
  /** Required. This is the name of the table the AuthorizedView belongs to. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. */
  parent?: string;
  /** Required. The AuthorizedView to create. */
  authorizedView?: AuthorizedView;
  /** Required. The id of the AuthorizedView to create. This AuthorizedView must not already exist. The `authorized_view_id` appended to `parent` forms the full AuthorizedView name of the form `projects/{project}/instances/{instance}/tables/{table}/authorizedView/{authorized_view}`. */
  authorizedViewId?: string;
}

export const CreateAuthorizedViewRequest: Schema.Schema<CreateAuthorizedViewRequest> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  authorizedView: Schema.optional(AuthorizedView),
  authorizedViewId: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateAuthorizedViewRequest" }) as any as Schema.Schema<CreateAuthorizedViewRequest>;

export interface CreateAuthorizedViewMetadata {
  /** The time at which the original request was received. */
  requestTime?: string;
  /** The request that prompted the initiation of this CreateAuthorizedView operation. */
  originalRequest?: CreateAuthorizedViewRequest;
  /** The time at which the operation failed or was completed successfully. */
  finishTime?: string;
}

export const CreateAuthorizedViewMetadata: Schema.Schema<CreateAuthorizedViewMetadata> = Schema.suspend(() => Schema.Struct({
  requestTime: Schema.optional(Schema.String),
  originalRequest: Schema.optional(CreateAuthorizedViewRequest),
  finishTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateAuthorizedViewMetadata" }) as any as Schema.Schema<CreateAuthorizedViewMetadata>;

export interface TableStats {
  /** How many rows are in the table. */
  rowCount?: string;
  /** How many cells are present per column (column family, column qualifier) combinations, averaged over all columns in all rows in the table. e.g. A table with 2 rows: * A row with 3 cells in "family:col" and 1 cell in "other:col" (4 cells / 2 columns) * A row with 1 cell in "family:col", 7 cells in "family:other_col", and 7 cells in "other:data" (15 cells / 3 columns) would report (4 + 15)/(2 + 3) = 3.8 in this field. */
  averageCellsPerColumn?: number;
  /** How many (column family, column qualifier) combinations are present per row in the table, averaged over all rows in the table. e.g. A table with 2 rows: * A row with cells in "family:col" and "other:col" (2 distinct columns) * A row with cells in "family:col", "family:other_col", and "other:data" (3 distinct columns) would report (2 + 3)/2 = 2.5 in this field. */
  averageColumnsPerRow?: number;
  /** This is roughly how many bytes would be needed to read the entire table (e.g. by streaming all contents out). */
  logicalDataBytes?: string;
}

export const TableStats: Schema.Schema<TableStats> = Schema.suspend(() => Schema.Struct({
  rowCount: Schema.optional(Schema.String),
  averageCellsPerColumn: Schema.optional(Schema.Number),
  averageColumnsPerRow: Schema.optional(Schema.Number),
  logicalDataBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "TableStats" }) as any as Schema.Schema<TableStats>;

export interface OperationProgress {
  /** Percent completion of the operation. Values are between 0 and 100 inclusive. */
  progressPercent?: number;
  /** If set, the time at which this operation failed or was completed successfully. */
  endTime?: string;
  /** Time the request was received. */
  startTime?: string;
}

export const OperationProgress: Schema.Schema<OperationProgress> = Schema.suspend(() => Schema.Struct({
  progressPercent: Schema.optional(Schema.Number),
  endTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationProgress" }) as any as Schema.Schema<OperationProgress>;

export interface CopyBackupMetadata {
  /** The progress of the CopyBackup operation. */
  progress?: OperationProgress;
  /** Information about the source backup that is being copied from. */
  sourceBackupInfo?: BackupInfo;
  /** The name of the backup being created through the copy operation. Values are of the form `projects//instances//clusters//backups/`. */
  name?: string;
}

export const CopyBackupMetadata: Schema.Schema<CopyBackupMetadata> = Schema.suspend(() => Schema.Struct({
  progress: Schema.optional(OperationProgress),
  sourceBackupInfo: Schema.optional(BackupInfo),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "CopyBackupMetadata" }) as any as Schema.Schema<CopyBackupMetadata>;

export interface EncryptionConfig {
  /** Describes the Cloud KMS encryption key that will be used to protect the destination Bigtable cluster. The requirements for this key are: 1) The Cloud Bigtable service account associated with the project that contains this cluster must be granted the `cloudkms.cryptoKeyEncrypterDecrypter` role on the CMEK key. 2) Only regional keys can be used and the region of the CMEK key must match the region of the cluster. Values are of the form `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}` */
  kmsKeyName?: string;
}

export const EncryptionConfig: Schema.Schema<EncryptionConfig> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "EncryptionConfig" }) as any as Schema.Schema<EncryptionConfig>;

export interface AutoscalingLimits {
  /** Required. Minimum number of nodes to scale down to. */
  minServeNodes?: number;
  /** Required. Maximum number of nodes to scale up to. */
  maxServeNodes?: number;
}

export const AutoscalingLimits: Schema.Schema<AutoscalingLimits> = Schema.suspend(() => Schema.Struct({
  minServeNodes: Schema.optional(Schema.Number),
  maxServeNodes: Schema.optional(Schema.Number),
})).annotate({ identifier: "AutoscalingLimits" }) as any as Schema.Schema<AutoscalingLimits>;

export interface AutoscalingTargets {
  /** The cpu utilization that the Autoscaler should be trying to achieve. This number is on a scale from 0 (no utilization) to 100 (total utilization), and is limited between 10 and 80, otherwise it will return INVALID_ARGUMENT error. */
  cpuUtilizationPercent?: number;
  /** The storage utilization that the Autoscaler should be trying to achieve. This number is limited between 2560 (2.5TiB) and 5120 (5TiB) for a SSD cluster and between 8192 (8TiB) and 16384 (16TiB) for an HDD cluster, otherwise it will return INVALID_ARGUMENT error. If this value is set to 0, it will be treated as if it were set to the default value: 2560 for SSD, 8192 for HDD. */
  storageUtilizationGibPerNode?: number;
}

export const AutoscalingTargets: Schema.Schema<AutoscalingTargets> = Schema.suspend(() => Schema.Struct({
  cpuUtilizationPercent: Schema.optional(Schema.Number),
  storageUtilizationGibPerNode: Schema.optional(Schema.Number),
})).annotate({ identifier: "AutoscalingTargets" }) as any as Schema.Schema<AutoscalingTargets>;

export interface ClusterAutoscalingConfig {
  /** Required. Autoscaling limits for this cluster. */
  autoscalingLimits?: AutoscalingLimits;
  /** Required. Autoscaling targets for this cluster. */
  autoscalingTargets?: AutoscalingTargets;
}

export const ClusterAutoscalingConfig: Schema.Schema<ClusterAutoscalingConfig> = Schema.suspend(() => Schema.Struct({
  autoscalingLimits: Schema.optional(AutoscalingLimits),
  autoscalingTargets: Schema.optional(AutoscalingTargets),
})).annotate({ identifier: "ClusterAutoscalingConfig" }) as any as Schema.Schema<ClusterAutoscalingConfig>;

export interface ClusterConfig {
  /** Autoscaling configuration for this cluster. */
  clusterAutoscalingConfig?: ClusterAutoscalingConfig;
}

export const ClusterConfig: Schema.Schema<ClusterConfig> = Schema.suspend(() => Schema.Struct({
  clusterAutoscalingConfig: Schema.optional(ClusterAutoscalingConfig),
})).annotate({ identifier: "ClusterConfig" }) as any as Schema.Schema<ClusterConfig>;

export interface Cluster {
  /** Immutable. The location where this cluster's nodes and storage reside. For best performance, clients should be located as close as possible to this cluster. Currently only zones are supported, so values should be of the form `projects/{project}/locations/{zone}`. */
  location?: string;
  /** Immutable. The type of storage used by this cluster to serve its parent instance's tables, unless explicitly overridden. */
  defaultStorageType?: "STORAGE_TYPE_UNSPECIFIED" | "SSD" | "HDD" | (string & {});
  /** Immutable. The encryption configuration for CMEK-protected clusters. */
  encryptionConfig?: EncryptionConfig;
  /** Immutable. The node scaling factor of this cluster. */
  nodeScalingFactor?: "NODE_SCALING_FACTOR_UNSPECIFIED" | "NODE_SCALING_FACTOR_1X" | "NODE_SCALING_FACTOR_2X" | (string & {});
  /** Output only. The current state of the cluster. */
  state?: "STATE_NOT_KNOWN" | "READY" | "CREATING" | "RESIZING" | "DISABLED" | (string & {});
  /** The number of nodes in the cluster. If no value is set, Cloud Bigtable automatically allocates nodes based on your data footprint and optimized for 50% storage utilization. */
  serveNodes?: number;
  /** Configuration for this cluster. */
  clusterConfig?: ClusterConfig;
  /** The unique name of the cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/a-z*`. */
  name?: string;
}

export const Cluster: Schema.Schema<Cluster> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  defaultStorageType: Schema.optional(Schema.String),
  encryptionConfig: Schema.optional(EncryptionConfig),
  nodeScalingFactor: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  serveNodes: Schema.optional(Schema.Number),
  clusterConfig: Schema.optional(ClusterConfig),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Cluster" }) as any as Schema.Schema<Cluster>;

export interface CreateInstanceRequest {
  /** Required. The clusters to be created within the instance, mapped by desired cluster ID, e.g., just `mycluster` rather than `projects/myproject/instances/myinstance/clusters/mycluster`. Fields marked `OutputOnly` must be left blank. */
  clusters?: Record<string, Cluster>;
  /** Required. The ID to be used when referring to the new instance within its project, e.g., just `myinstance` rather than `projects/myproject/instances/myinstance`. */
  instanceId?: string;
  /** Required. The unique name of the project in which to create the new instance. Values are of the form `projects/{project}`. */
  parent?: string;
  /** Required. The instance to create. Fields marked `OutputOnly` must be left blank. */
  instance?: Instance;
}

export const CreateInstanceRequest: Schema.Schema<CreateInstanceRequest> = Schema.suspend(() => Schema.Struct({
  clusters: Schema.optional(Schema.Record(Schema.String, Cluster)),
  instanceId: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
  instance: Schema.optional(Instance),
})).annotate({ identifier: "CreateInstanceRequest" }) as any as Schema.Schema<CreateInstanceRequest>;

export interface CreateInstanceMetadata {
  /** The time at which the original request was received. */
  requestTime?: string;
  /** The request that prompted the initiation of this CreateInstance operation. */
  originalRequest?: CreateInstanceRequest;
  /** The time at which the operation failed or was completed successfully. */
  finishTime?: string;
}

export const CreateInstanceMetadata: Schema.Schema<CreateInstanceMetadata> = Schema.suspend(() => Schema.Struct({
  requestTime: Schema.optional(Schema.String),
  originalRequest: Schema.optional(CreateInstanceRequest),
  finishTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateInstanceMetadata" }) as any as Schema.Schema<CreateInstanceMetadata>;

export interface OptimizeRestoredTableMetadata {
  /** Name of the restored table being optimized. */
  name?: string;
  /** The progress of the post-restore optimizations. */
  progress?: OperationProgress;
}

export const OptimizeRestoredTableMetadata: Schema.Schema<OptimizeRestoredTableMetadata> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  progress: Schema.optional(OperationProgress),
})).annotate({ identifier: "OptimizeRestoredTableMetadata" }) as any as Schema.Schema<OptimizeRestoredTableMetadata>;

export interface LogicalView {
  /** Required. The logical view's select query. */
  query?: string;
  /** Optional. The etag for this logical view. This may be sent on update requests to ensure that the client has an up-to-date value before proceeding. The server returns an ABORTED error on a mismatched etag. */
  etag?: string;
  /** Identifier. The unique name of the logical view. Format: `projects/{project}/instances/{instance}/logicalViews/{logical_view}` */
  name?: string;
  /** Optional. Set to true to make the LogicalView protected against deletion. */
  deletionProtection?: boolean;
}

export const LogicalView: Schema.Schema<LogicalView> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  deletionProtection: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "LogicalView" }) as any as Schema.Schema<LogicalView>;

export interface UpdateLogicalViewRequest {
  /** Required. The logical view to update. The logical view's `name` field is used to identify the view to update. Format: `projects/{project}/instances/{instance}/logicalViews/{logical_view}`. */
  logicalView?: LogicalView;
  /** Optional. The list of fields to update. */
  updateMask?: string;
}

export const UpdateLogicalViewRequest: Schema.Schema<UpdateLogicalViewRequest> = Schema.suspend(() => Schema.Struct({
  logicalView: Schema.optional(LogicalView),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateLogicalViewRequest" }) as any as Schema.Schema<UpdateLogicalViewRequest>;

export interface ProtoSchema {
  /** Required. Contains a protobuf-serialized [google.protobuf.FileDescriptorSet](https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto), which could include multiple proto files. To generate it, [install](https://grpc.io/docs/protoc-installation/) and run `protoc` with `--include_imports` and `--descriptor_set_out`. For example, to generate for moon/shot/app.proto, run ``` $protoc --proto_path=/app_path --proto_path=/lib_path \ --include_imports \ --descriptor_set_out=descriptors.pb \ moon/shot/app.proto ``` For more details, see protobuffer [self description](https://developers.google.com/protocol-buffers/docs/techniques#self-description). */
  protoDescriptors?: string;
}

export const ProtoSchema: Schema.Schema<ProtoSchema> = Schema.suspend(() => Schema.Struct({
  protoDescriptors: Schema.optional(Schema.String),
})).annotate({ identifier: "ProtoSchema" }) as any as Schema.Schema<ProtoSchema>;

export interface SchemaBundle {
  /** Optional. The etag for this schema bundle. This may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. The server returns an ABORTED error on a mismatched etag. */
  etag?: string;
  /** Identifier. The unique name identifying this schema bundle. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/{schema_bundle}` */
  name?: string;
  /** Schema for Protobufs. */
  protoSchema?: ProtoSchema;
}

export const SchemaBundle: Schema.Schema<SchemaBundle> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  protoSchema: Schema.optional(ProtoSchema),
})).annotate({ identifier: "SchemaBundle" }) as any as Schema.Schema<SchemaBundle>;

export interface ListSchemaBundlesResponse {
  /** The schema bundles from the specified table. */
  schemaBundles?: Array<SchemaBundle>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListSchemaBundlesResponse: Schema.Schema<ListSchemaBundlesResponse> = Schema.suspend(() => Schema.Struct({
  schemaBundles: Schema.optional(Schema.Array(SchemaBundle)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSchemaBundlesResponse" }) as any as Schema.Schema<ListSchemaBundlesResponse>;

export interface UpdateSchemaBundleMetadata {
  /** The time at which the operation failed or was completed successfully. */
  finishTime?: string;
  /** The unique name identifying this schema bundle. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/{schema_bundle}` */
  name?: string;
  /** The time at which the original request was received. */
  requestTime?: string;
}

export const UpdateSchemaBundleMetadata: Schema.Schema<UpdateSchemaBundleMetadata> = Schema.suspend(() => Schema.Struct({
  finishTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  requestTime: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateSchemaBundleMetadata" }) as any as Schema.Schema<UpdateSchemaBundleMetadata>;

export interface ListInstancesResponse {
  /** Locations from which Instance information could not be retrieved, due to an outage or some other transient condition. Instances whose Clusters are all in one of the failed locations may be missing from `instances`, and Instances with at least one Cluster in a failed location may only have partial information returned. Values are of the form `projects//locations/` */
  failedLocations?: Array<string>;
  /** The list of requested instances. */
  instances?: Array<Instance>;
  /** DEPRECATED: This field is unused and ignored. */
  nextPageToken?: string;
}

export const ListInstancesResponse: Schema.Schema<ListInstancesResponse> = Schema.suspend(() => Schema.Struct({
  failedLocations: Schema.optional(Schema.Array(Schema.String)),
  instances: Schema.optional(Schema.Array(Instance)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListInstancesResponse" }) as any as Schema.Schema<ListInstancesResponse>;

export interface AuditLogConfig {
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
  logType: Schema.optional(Schema.String),
})).annotate({ identifier: "AuditLogConfig" }) as any as Schema.Schema<AuditLogConfig>;

export interface AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<AuditLogConfig>;
}

export const AuditConfig: Schema.Schema<AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(AuditLogConfig)),
})).annotate({ identifier: "AuditConfig" }) as any as Schema.Schema<AuditConfig>;

export interface Expr {
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  expression: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface Binding {
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  condition: Schema.optional(Expr),
  members: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface Policy {
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
  bindings: Schema.optional(Schema.Array(Binding)),
  version: Schema.optional(Schema.Number),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface UpdateAppProfileMetadata {
}

export const UpdateAppProfileMetadata: Schema.Schema<UpdateAppProfileMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UpdateAppProfileMetadata" }) as any as Schema.Schema<UpdateAppProfileMetadata>;

export interface Split {
  /** Row key to use as an initial tablet boundary. */
  key?: string;
}

export const Split: Schema.Schema<Split> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "Split" }) as any as Schema.Schema<Split>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface CreateBackupMetadata {
  /** The name of the table the backup is created from. */
  sourceTable?: string;
  /** If set, the time at which this operation finished or was cancelled. DEPRECATED: Use finish_time instead. */
  endTime?: string;
  /** The name of the backup being created. */
  name?: string;
  /** The time at which the operation failed or was completed successfully. */
  finishTime?: string;
  /** The time at which the original request was received. */
  requestTime?: string;
  /** The time at which this operation started. DEPRECATED: Use request_time instead. */
  startTime?: string;
}

export const CreateBackupMetadata: Schema.Schema<CreateBackupMetadata> = Schema.suspend(() => Schema.Struct({
  sourceTable: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  finishTime: Schema.optional(Schema.String),
  requestTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateBackupMetadata" }) as any as Schema.Schema<CreateBackupMetadata>;

export interface CheckConsistencyResponse {
  /** True only if the token is consistent. A token is consistent if replication has caught up with the restrictions specified in the request. */
  consistent?: boolean;
}

export const CheckConsistencyResponse: Schema.Schema<CheckConsistencyResponse> = Schema.suspend(() => Schema.Struct({
  consistent: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "CheckConsistencyResponse" }) as any as Schema.Schema<CheckConsistencyResponse>;

export interface TieredStorageRule {
  /** Include cells older than the given age. For the infrequent access tier, this value must be at least 30 days. */
  includeIfOlderThan?: string;
}

export const TieredStorageRule: Schema.Schema<TieredStorageRule> = Schema.suspend(() => Schema.Struct({
  includeIfOlderThan: Schema.optional(Schema.String),
})).annotate({ identifier: "TieredStorageRule" }) as any as Schema.Schema<TieredStorageRule>;

export interface TieredStorageConfig {
  /** Rule to specify what data is stored in the infrequent access(IA) tier. The IA tier allows storing more data per node with reduced performance. */
  infrequentAccess?: TieredStorageRule;
}

export const TieredStorageConfig: Schema.Schema<TieredStorageConfig> = Schema.suspend(() => Schema.Struct({
  infrequentAccess: Schema.optional(TieredStorageRule),
})).annotate({ identifier: "TieredStorageConfig" }) as any as Schema.Schema<TieredStorageConfig>;

export interface GenerateConsistencyTokenRequest {
}

export const GenerateConsistencyTokenRequest: Schema.Schema<GenerateConsistencyTokenRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GenerateConsistencyTokenRequest" }) as any as Schema.Schema<GenerateConsistencyTokenRequest>;

export interface EncryptionInfo {
  /** Output only. The status of encrypt/decrypt calls on underlying data for this resource. Regardless of status, the existing data is always encrypted at rest. */
  encryptionStatus?: Status;
  /** Output only. The version of the Cloud KMS key specified in the parent cluster that is in use for the data underlying this table. */
  kmsKeyVersion?: string;
  /** Output only. The type of encryption used to protect this resource. */
  encryptionType?: "ENCRYPTION_TYPE_UNSPECIFIED" | "GOOGLE_DEFAULT_ENCRYPTION" | "CUSTOMER_MANAGED_ENCRYPTION" | (string & {});
}

export const EncryptionInfo: Schema.Schema<EncryptionInfo> = Schema.suspend(() => Schema.Struct({
  encryptionStatus: Schema.optional(Status),
  kmsKeyVersion: Schema.optional(Schema.String),
  encryptionType: Schema.optional(Schema.String),
})).annotate({ identifier: "EncryptionInfo" }) as any as Schema.Schema<EncryptionInfo>;

export interface Backup {
  /** Output only. `start_time` is the time that the backup was started (i.e. approximately the time the CreateBackup request is received). The row data in this backup will be no older than this timestamp. */
  startTime?: string;
  /** Output only. Name of the backup from which this backup was copied. If a backup is not created by copying a backup, this field will be empty. Values are of the form: projects//instances//clusters//backups/ */
  sourceBackup?: string;
  /** The time at which the hot backup will be converted to a standard backup. Once the `hot_to_standard_time` has passed, Cloud Bigtable will convert the hot backup to a standard backup. This value must be greater than the backup creation time by: - At least 24 hours This field only applies for hot backups. When creating or updating a standard backup, attempting to set this field will fail the request. */
  hotToStandardTime?: string;
  /** Output only. `end_time` is the time that the backup was finished. The row data in the backup will be no newer than this timestamp. */
  endTime?: string;
  /** Output only. The encryption information for the backup. */
  encryptionInfo?: EncryptionInfo;
  /** A globally unique identifier for the backup which cannot be changed. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}/ backups/_a-zA-Z0-9*` The final segment of the name must be between 1 and 50 characters in length. The backup is stored in the cluster identified by the prefix of the backup name of the form `projects/{project}/instances/{instance}/clusters/{cluster}`. */
  name?: string;
  /** Required. The expiration time of the backup. When creating a backup or updating its `expire_time`, the value must be greater than the backup creation time by: - At least 6 hours - At most 90 days Once the `expire_time` has passed, Cloud Bigtable will delete the backup. */
  expireTime?: string;
  /** Output only. Size of the backup in bytes. */
  sizeBytes?: string;
  /** Indicates the backup type of the backup. */
  backupType?: "BACKUP_TYPE_UNSPECIFIED" | "STANDARD" | "HOT" | (string & {});
  /** Required. Immutable. Name of the table from which this backup was created. This needs to be in the same instance as the backup. Values are of the form `projects/{project}/instances/{instance}/tables/{source_table}`. */
  sourceTable?: string;
  /** Output only. The current state of the backup. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | (string & {});
}

export const Backup: Schema.Schema<Backup> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  sourceBackup: Schema.optional(Schema.String),
  hotToStandardTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  encryptionInfo: Schema.optional(EncryptionInfo),
  name: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  sizeBytes: Schema.optional(Schema.String),
  backupType: Schema.optional(Schema.String),
  sourceTable: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "Backup" }) as any as Schema.Schema<Backup>;

export interface ListBackupsResponse {
  /** The list of matching backups. */
  backups?: Array<Backup>;
  /** `next_page_token` can be sent in a subsequent ListBackups call to fetch more of the matching backups. */
  nextPageToken?: string;
}

export const ListBackupsResponse: Schema.Schema<ListBackupsResponse> = Schema.suspend(() => Schema.Struct({
  backups: Schema.optional(Schema.Array(Backup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListBackupsResponse" }) as any as Schema.Schema<ListBackupsResponse>;

export interface Modification {
  /** Update an existing column family to the specified schema, or fail if no column family exists with the given ID. */
  update?: ColumnFamily;
  /** Drop (delete) the column family with the given ID, or fail if no such family exists. */
  drop?: boolean;
  /** Optional. A mask specifying which fields (e.g. `gc_rule`) in the `update` mod should be updated, ignored for other modification types. If unset or empty, we treat it as updating `gc_rule` to be backward compatible. */
  updateMask?: string;
  /** Create a new column family with the specified schema, or fail if one already exists with the given ID. */
  create?: ColumnFamily;
  /** The ID of the column family to be modified. */
  id?: string;
}

export const Modification: Schema.Schema<Modification> = Schema.suspend(() => Schema.Struct({
  update: Schema.optional(ColumnFamily),
  drop: Schema.optional(Schema.Boolean),
  updateMask: Schema.optional(Schema.String),
  create: Schema.optional(ColumnFamily),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "Modification" }) as any as Schema.Schema<Modification>;

export interface AutomatedBackupPolicy {
  /** Required. How long the automated backups should be retained. Values must be at least 3 days and at most 90 days. */
  retentionPeriod?: string;
  /** How frequently automated backups should occur. The only supported value at this time is 24 hours. An undefined frequency is treated as 24 hours. */
  frequency?: string;
}

export const AutomatedBackupPolicy: Schema.Schema<AutomatedBackupPolicy> = Schema.suspend(() => Schema.Struct({
  retentionPeriod: Schema.optional(Schema.String),
  frequency: Schema.optional(Schema.String),
})).annotate({ identifier: "AutomatedBackupPolicy" }) as any as Schema.Schema<AutomatedBackupPolicy>;

export interface ClusterState {
  /** Output only. The state of replication for the table in this cluster. */
  replicationState?: "STATE_NOT_KNOWN" | "INITIALIZING" | "PLANNED_MAINTENANCE" | "UNPLANNED_MAINTENANCE" | "READY" | "READY_OPTIMIZING" | (string & {});
  /** Output only. The encryption information for the table in this cluster. If the encryption key protecting this resource is customer managed, then its version can be rotated in Cloud Key Management Service (Cloud KMS). The primary version of the key and its status will be reflected here when changes propagate from Cloud KMS. */
  encryptionInfo?: Array<EncryptionInfo>;
}

export const ClusterState: Schema.Schema<ClusterState> = Schema.suspend(() => Schema.Struct({
  replicationState: Schema.optional(Schema.String),
  encryptionInfo: Schema.optional(Schema.Array(EncryptionInfo)),
})).annotate({ identifier: "ClusterState" }) as any as Schema.Schema<ClusterState>;

export interface ChangeStreamConfig {
  /** How long the change stream should be retained. Change stream data older than the retention period will not be returned when reading the change stream from the table. Values must be at least 1 day and at most 7 days, and will be truncated to microsecond granularity. */
  retentionPeriod?: string;
}

export const ChangeStreamConfig: Schema.Schema<ChangeStreamConfig> = Schema.suspend(() => Schema.Struct({
  retentionPeriod: Schema.optional(Schema.String),
})).annotate({ identifier: "ChangeStreamConfig" }) as any as Schema.Schema<ChangeStreamConfig>;

export interface Table {
  /** If specified, automated backups are enabled for this table. Otherwise, automated backups are disabled. */
  automatedBackupPolicy?: AutomatedBackupPolicy;
  /** The column families configured for this table, mapped by column family ID. Views: `SCHEMA_VIEW`, `STATS_VIEW`, `FULL` */
  columnFamilies?: Record<string, ColumnFamily>;
  /** Set to true to make the table protected against data loss. i.e. deleting the following resources through Admin APIs are prohibited: * The table. * The column families in the table. * The instance containing the table. Note one can still delete the data stored in the table through Data APIs. */
  deletionProtection?: boolean;
  /** Output only. If this table was restored from another data source (e.g. a backup), this field will be populated with information about the restore. */
  restoreInfo?: RestoreInfo;
  /** Immutable. The granularity (i.e. `MILLIS`) at which timestamps are stored in this table. Timestamps not matching the granularity will be rejected. If unspecified at creation time, the value will be set to `MILLIS`. Views: `SCHEMA_VIEW`, `FULL`. */
  granularity?: "TIMESTAMP_GRANULARITY_UNSPECIFIED" | "MILLIS" | (string & {});
  /** Rules to specify what data is stored in each storage tier. Different tiers store data differently, providing different trade-offs between cost and performance. Different parts of a table can be stored separately on different tiers. If a config is specified, tiered storage is enabled for this table. Otherwise, tiered storage is disabled. Only SSD instances can configure tiered storage. */
  tieredStorageConfig?: TieredStorageConfig;
  /** The row key schema for this table. The schema is used to decode the raw row key bytes into a structured format. The order of field declarations in this schema is important, as it reflects how the raw row key bytes are structured. Currently, this only affects how the key is read via a GoogleSQL query from the ExecuteQuery API. For a SQL query, the _key column is still read as raw bytes. But queries can reference the key fields by name, which will be decoded from _key using provided type and encoding. Queries that reference key fields will fail if they encounter an invalid row key. For example, if _key = "some_id#2024-04-30#\x00\x13\x00\xf3" with the following schema: { fields { field_name: "id" type { string { encoding: utf8_bytes {} } } } fields { field_name: "date" type { string { encoding: utf8_bytes {} } } } fields { field_name: "product_code" type { int64 { encoding: big_endian_bytes {} } } } encoding { delimited_bytes { delimiter: "#" } } } The decoded key parts would be: id = "some_id", date = "2024-04-30", product_code = 1245427 The query "SELECT _key, product_code FROM table" will return two columns: /------------------------------------------------------\ | _key | product_code | | --------------------------------------|--------------| | "some_id#2024-04-30#\x00\x13\x00\xf3" | 1245427 | \------------------------------------------------------/ The schema has the following invariants: (1) The decoded field values are order-preserved. For read, the field values will be decoded in sorted mode from the raw bytes. (2) Every field in the schema must specify a non-empty name. (3) Every field must specify a type with an associated encoding. The type is limited to scalar types only: Array, Map, Aggregate, and Struct are not allowed. (4) The field names must not collide with existing column family names and reserved keywords "_key" and "_timestamp". The following update operations are allowed for row_key_schema: - Update from an empty schema to a new schema. - Remove the existing schema. This operation requires setting the `ignore_warnings` flag to `true`, since it might be a backward incompatible change. Without the flag, the update request will fail with an INVALID_ARGUMENT error. Any other row key schema update operation (e.g. update existing schema columns names or types) is currently unsupported. */
  rowKeySchema?: GoogleBigtableAdminV2TypeStruct;
  /** Output only. Only available with STATS_VIEW, this includes summary statistics about the entire table contents. For statistics about a specific column family, see ColumnFamilyStats in the mapped ColumnFamily collection above. */
  stats?: TableStats;
  /** The unique name of the table. Values are of the form `projects/{project}/instances/{instance}/tables/_a-zA-Z0-9*`. Views: `NAME_ONLY`, `SCHEMA_VIEW`, `REPLICATION_VIEW`, `STATS_VIEW`, `FULL` */
  name?: string;
  /** Output only. Map from cluster ID to per-cluster table state. If it could not be determined whether or not the table has data in a particular cluster (for example, if its zone is unavailable), then there will be an entry for the cluster with UNKNOWN `replication_status`. Views: `REPLICATION_VIEW`, `ENCRYPTION_VIEW`, `FULL` */
  clusterStates?: Record<string, ClusterState>;
  /** If specified, enable the change stream on this table. Otherwise, the change stream is disabled and the change stream is not retained. */
  changeStreamConfig?: ChangeStreamConfig;
}

export const Table: Schema.Schema<Table> = Schema.suspend(() => Schema.Struct({
  automatedBackupPolicy: Schema.optional(AutomatedBackupPolicy),
  columnFamilies: Schema.optional(Schema.Record(Schema.String, ColumnFamily)),
  deletionProtection: Schema.optional(Schema.Boolean),
  restoreInfo: Schema.optional(RestoreInfo),
  granularity: Schema.optional(Schema.String),
  tieredStorageConfig: Schema.optional(TieredStorageConfig),
  rowKeySchema: Schema.optional(GoogleBigtableAdminV2TypeStruct),
  stats: Schema.optional(TableStats),
  name: Schema.optional(Schema.String),
  clusterStates: Schema.optional(Schema.Record(Schema.String, ClusterState)),
  changeStreamConfig: Schema.optional(ChangeStreamConfig),
})).annotate({ identifier: "Table" }) as any as Schema.Schema<Table>;

export interface ListTablesResponse {
  /** Set if not all tables could be returned in a single response. Pass this value to `page_token` in another request to get the next page of results. */
  nextPageToken?: string;
  /** The tables present in the requested instance. */
  tables?: Array<Table>;
}

export const ListTablesResponse: Schema.Schema<ListTablesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  tables: Schema.optional(Schema.Array(Table)),
})).annotate({ identifier: "ListTablesResponse" }) as any as Schema.Schema<ListTablesResponse>;

export interface UpdateClusterMetadata {
  /** The time at which the operation failed or was completed successfully. */
  finishTime?: string;
  /** The time at which the original request was received. */
  requestTime?: string;
  /** The request that prompted the initiation of this UpdateCluster operation. */
  originalRequest?: Cluster;
}

export const UpdateClusterMetadata: Schema.Schema<UpdateClusterMetadata> = Schema.suspend(() => Schema.Struct({
  finishTime: Schema.optional(Schema.String),
  requestTime: Schema.optional(Schema.String),
  originalRequest: Schema.optional(Cluster),
})).annotate({ identifier: "UpdateClusterMetadata" }) as any as Schema.Schema<UpdateClusterMetadata>;

export interface UndeleteTableRequest {
}

export const UndeleteTableRequest: Schema.Schema<UndeleteTableRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "UndeleteTableRequest" }) as any as Schema.Schema<UndeleteTableRequest>;

export interface ListLogicalViewsResponse {
  /** The list of requested logical views. */
  logicalViews?: Array<LogicalView>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListLogicalViewsResponse: Schema.Schema<ListLogicalViewsResponse> = Schema.suspend(() => Schema.Struct({
  logicalViews: Schema.optional(Schema.Array(LogicalView)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListLogicalViewsResponse" }) as any as Schema.Schema<ListLogicalViewsResponse>;

export interface CreateClusterRequest {
  /** Required. The unique name of the instance in which to create the new cluster. Values are of the form `projects/{project}/instances/{instance}`. */
  parent?: string;
  /** Required. The cluster to be created. Fields marked `OutputOnly` must be left blank. */
  cluster?: Cluster;
  /** Required. The ID to be used when referring to the new cluster within its instance, e.g., just `mycluster` rather than `projects/myproject/instances/myinstance/clusters/mycluster`. */
  clusterId?: string;
}

export const CreateClusterRequest: Schema.Schema<CreateClusterRequest> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  cluster: Schema.optional(Cluster),
  clusterId: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateClusterRequest" }) as any as Schema.Schema<CreateClusterRequest>;

export interface Location {
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
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

export interface SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface GenerateConsistencyTokenResponse {
  /** The generated consistency token. */
  consistencyToken?: string;
}

export const GenerateConsistencyTokenResponse: Schema.Schema<GenerateConsistencyTokenResponse> = Schema.suspend(() => Schema.Struct({
  consistencyToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GenerateConsistencyTokenResponse" }) as any as Schema.Schema<GenerateConsistencyTokenResponse>;

export interface StandardReadRemoteWrites {
}

export const StandardReadRemoteWrites: Schema.Schema<StandardReadRemoteWrites> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "StandardReadRemoteWrites" }) as any as Schema.Schema<StandardReadRemoteWrites>;

export interface HotTablet {
  /** Output only. The average CPU usage spent by a node on this tablet over the start_time to end_time time range. The percentage is the amount of CPU used by the node to serve the tablet, from 0% (tablet was not interacted with) to 100% (the node spent all cycles serving the hot tablet). */
  nodeCpuUsagePercent?: number;
  /** Output only. The end time of the hot tablet. */
  endTime?: string;
  /** The unique name of the hot tablet. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}/hotTablets/[a-zA-Z0-9_-]*`. */
  name?: string;
  /** Output only. The start time of the hot tablet. */
  startTime?: string;
  /** Tablet Start Key (inclusive). */
  startKey?: string;
  /** Tablet End Key (inclusive). */
  endKey?: string;
  /** Name of the table that contains the tablet. Values are of the form `projects/{project}/instances/{instance}/tables/_a-zA-Z0-9*`. */
  tableName?: string;
}

export const HotTablet: Schema.Schema<HotTablet> = Schema.suspend(() => Schema.Struct({
  nodeCpuUsagePercent: Schema.optional(Schema.Number),
  endTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  startKey: Schema.optional(Schema.String),
  endKey: Schema.optional(Schema.String),
  tableName: Schema.optional(Schema.String),
})).annotate({ identifier: "HotTablet" }) as any as Schema.Schema<HotTablet>;

export interface CreateMaterializedViewMetadata {
  /** The time at which this operation started. DEPRECATED: Use request_time instead. */
  startTime?: string;
  /** The time at which the operation failed or was completed successfully. */
  finishTime?: string;
  /** The request that prompted the initiation of this CreateMaterializedView operation. */
  originalRequest?: CreateMaterializedViewRequest;
  /** The time at which the original request was received. */
  requestTime?: string;
  /** If set, the time at which this operation finished or was canceled. DEPRECATED: Use finish_time instead. */
  endTime?: string;
}

export const CreateMaterializedViewMetadata: Schema.Schema<CreateMaterializedViewMetadata> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  finishTime: Schema.optional(Schema.String),
  originalRequest: Schema.optional(CreateMaterializedViewRequest),
  requestTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateMaterializedViewMetadata" }) as any as Schema.Schema<CreateMaterializedViewMetadata>;

export interface RestoreTableRequest {
  /** Required. The id of the table to create and restore to. This table must not already exist. The `table_id` appended to `parent` forms the full table name of the form `projects//instances//tables/`. */
  tableId?: string;
  /** Name of the backup from which to restore. Values are of the form `projects//instances//clusters//backups/`. */
  backup?: string;
}

export const RestoreTableRequest: Schema.Schema<RestoreTableRequest> = Schema.suspend(() => Schema.Struct({
  tableId: Schema.optional(Schema.String),
  backup: Schema.optional(Schema.String),
})).annotate({ identifier: "RestoreTableRequest" }) as any as Schema.Schema<RestoreTableRequest>;

export interface CopyBackupRequest {
  /** Required. The source backup to be copied from. The source backup needs to be in READY state for it to be copied. Copying a copied backup is not allowed. Once CopyBackup is in progress, the source backup cannot be deleted or cleaned up on expiration until CopyBackup is finished. Values are of the form: `projects//instances//clusters//backups/`. */
  sourceBackup?: string;
  /** Required. The id of the new backup. The `backup_id` along with `parent` are combined as {parent}/backups/{backup_id} to create the full backup name, of the form: `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup_id}`. This string must be between 1 and 50 characters in length and match the regex _a-zA-Z0-9*. */
  backupId?: string;
  /** Required. Required. The expiration time of the copied backup with microsecond granularity that must be at least 6 hours and at most 30 days from the time the request is received. Once the `expire_time` has passed, Cloud Bigtable will delete the backup and free the resources used by the backup. */
  expireTime?: string;
}

export const CopyBackupRequest: Schema.Schema<CopyBackupRequest> = Schema.suspend(() => Schema.Struct({
  sourceBackup: Schema.optional(Schema.String),
  backupId: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CopyBackupRequest" }) as any as Schema.Schema<CopyBackupRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CreateLogicalViewRequest {
  /** Required. The parent instance where this logical view will be created. Format: `projects/{project}/instances/{instance}`. */
  parent?: string;
  /** Required. The ID to use for the logical view, which will become the final component of the logical view's resource name. */
  logicalViewId?: string;
  /** Required. The logical view to create. */
  logicalView?: LogicalView;
}

export const CreateLogicalViewRequest: Schema.Schema<CreateLogicalViewRequest> = Schema.suspend(() => Schema.Struct({
  parent: Schema.optional(Schema.String),
  logicalViewId: Schema.optional(Schema.String),
  logicalView: Schema.optional(LogicalView),
})).annotate({ identifier: "CreateLogicalViewRequest" }) as any as Schema.Schema<CreateLogicalViewRequest>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface DropRowRangeRequest {
  /** Delete all rows in the table. Setting this to false is a no-op. */
  deleteAllDataFromTable?: boolean;
  /** Delete all rows that start with this row key prefix. Prefix cannot be zero length. */
  rowKeyPrefix?: string;
}

export const DropRowRangeRequest: Schema.Schema<DropRowRangeRequest> = Schema.suspend(() => Schema.Struct({
  deleteAllDataFromTable: Schema.optional(Schema.Boolean),
  rowKeyPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "DropRowRangeRequest" }) as any as Schema.Schema<DropRowRangeRequest>;

export interface ListAuthorizedViewsResponse {
  /** Set if not all tables could be returned in a single response. Pass this value to `page_token` in another request to get the next page of results. */
  nextPageToken?: string;
  /** The AuthorizedViews present in the requested table. */
  authorizedViews?: Array<AuthorizedView>;
}

export const ListAuthorizedViewsResponse: Schema.Schema<ListAuthorizedViewsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  authorizedViews: Schema.optional(Schema.Array(AuthorizedView)),
})).annotate({ identifier: "ListAuthorizedViewsResponse" }) as any as Schema.Schema<ListAuthorizedViewsResponse>;

export interface RestoreTableMetadata {
  /** The progress of the RestoreTable operation. */
  progress?: OperationProgress;
  /** The type of the restore source. */
  sourceType?: "RESTORE_SOURCE_TYPE_UNSPECIFIED" | "BACKUP" | (string & {});
  /** If exists, the name of the long-running operation that will be used to track the post-restore optimization process to optimize the performance of the restored table. The metadata type of the long-running operation is OptimizeRestoredTableMetadata. The response type is Empty. This long-running operation may be automatically created by the system if applicable after the RestoreTable long-running operation completes successfully. This operation may not be created if the table is already optimized or the restore was not successful. */
  optimizeTableOperationName?: string;
  backupInfo?: BackupInfo;
  /** Name of the table being created and restored to. */
  name?: string;
}

export const RestoreTableMetadata: Schema.Schema<RestoreTableMetadata> = Schema.suspend(() => Schema.Struct({
  progress: Schema.optional(OperationProgress),
  sourceType: Schema.optional(Schema.String),
  optimizeTableOperationName: Schema.optional(Schema.String),
  backupInfo: Schema.optional(BackupInfo),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "RestoreTableMetadata" }) as any as Schema.Schema<RestoreTableMetadata>;

export interface ModifyColumnFamiliesRequest {
  /** Optional. If true, ignore safety checks when modifying the column families. */
  ignoreWarnings?: boolean;
  /** Required. Modifications to be atomically applied to the specified table's families. Entries are applied in order, meaning that earlier modifications can be masked by later ones (in the case of repeated updates to the same family, for example). */
  modifications?: Array<Modification>;
}

export const ModifyColumnFamiliesRequest: Schema.Schema<ModifyColumnFamiliesRequest> = Schema.suspend(() => Schema.Struct({
  ignoreWarnings: Schema.optional(Schema.Boolean),
  modifications: Schema.optional(Schema.Array(Modification)),
})).annotate({ identifier: "ModifyColumnFamiliesRequest" }) as any as Schema.Schema<ModifyColumnFamiliesRequest>;

export interface ListClustersResponse {
  /** DEPRECATED: This field is unused and ignored. */
  nextPageToken?: string;
  /** The list of requested clusters. */
  clusters?: Array<Cluster>;
  /** Locations from which Cluster information could not be retrieved, due to an outage or some other transient condition. Clusters from these locations may be missing from `clusters`, or may only have partial information returned. Values are of the form `projects//locations/` */
  failedLocations?: Array<string>;
}

export const ListClustersResponse: Schema.Schema<ListClustersResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  clusters: Schema.optional(Schema.Array(Cluster)),
  failedLocations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListClustersResponse" }) as any as Schema.Schema<ListClustersResponse>;

export interface DataBoostReadLocalWrites {
}

export const DataBoostReadLocalWrites: Schema.Schema<DataBoostReadLocalWrites> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DataBoostReadLocalWrites" }) as any as Schema.Schema<DataBoostReadLocalWrites>;

export interface CheckConsistencyRequest {
  /** Checks that reads using an app profile with `StandardIsolation` can see all writes committed before the token was created, even if the read and write target different clusters. */
  standardReadRemoteWrites?: StandardReadRemoteWrites;
  /** Required. The token created using GenerateConsistencyToken for the Table. */
  consistencyToken?: string;
  /** Checks that reads using an app profile with `DataBoostIsolationReadOnly` can see all writes committed before the token was created, but only if the read and write target the same cluster. */
  dataBoostReadLocalWrites?: DataBoostReadLocalWrites;
}

export const CheckConsistencyRequest: Schema.Schema<CheckConsistencyRequest> = Schema.suspend(() => Schema.Struct({
  standardReadRemoteWrites: Schema.optional(StandardReadRemoteWrites),
  consistencyToken: Schema.optional(Schema.String),
  dataBoostReadLocalWrites: Schema.optional(DataBoostReadLocalWrites),
})).annotate({ identifier: "CheckConsistencyRequest" }) as any as Schema.Schema<CheckConsistencyRequest>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(GetPolicyOptions),
})).annotate({ identifier: "GetIamPolicyRequest" }) as any as Schema.Schema<GetIamPolicyRequest>;

export interface UpdateLogicalViewMetadata {
  /** The time at which the operation failed or was completed successfully. */
  finishTime?: string;
  /** The time at which the original request was received. */
  requestTime?: string;
  /** The request that prompted the initiation of this UpdateLogicalView operation. */
  originalRequest?: UpdateLogicalViewRequest;
  /** DEPRECATED: Use finish_time instead. */
  endTime?: string;
  /** DEPRECATED: Use request_time instead. */
  startTime?: string;
}

export const UpdateLogicalViewMetadata: Schema.Schema<UpdateLogicalViewMetadata> = Schema.suspend(() => Schema.Struct({
  finishTime: Schema.optional(Schema.String),
  requestTime: Schema.optional(Schema.String),
  originalRequest: Schema.optional(UpdateLogicalViewRequest),
  endTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateLogicalViewMetadata" }) as any as Schema.Schema<UpdateLogicalViewMetadata>;

export interface TableProgress {
  /** Estimate of the number of bytes copied so far for this table. This will eventually reach 'estimated_size_bytes' unless the table copy is CANCELLED. */
  estimatedCopiedBytes?: string;
  /** Estimate of the size of the table to be copied. */
  estimatedSizeBytes?: string;
  state?: "STATE_UNSPECIFIED" | "PENDING" | "COPYING" | "COMPLETED" | "CANCELLED" | (string & {});
}

export const TableProgress: Schema.Schema<TableProgress> = Schema.suspend(() => Schema.Struct({
  estimatedCopiedBytes: Schema.optional(Schema.String),
  estimatedSizeBytes: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "TableProgress" }) as any as Schema.Schema<TableProgress>;

export interface PartialUpdateClusterRequest {
  /** Required. The subset of Cluster fields which should be replaced. */
  updateMask?: string;
  /** Required. The Cluster which contains the partial updates to be applied, subject to the update_mask. */
  cluster?: Cluster;
}

export const PartialUpdateClusterRequest: Schema.Schema<PartialUpdateClusterRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  cluster: Schema.optional(Cluster),
})).annotate({ identifier: "PartialUpdateClusterRequest" }) as any as Schema.Schema<PartialUpdateClusterRequest>;

export interface PartialUpdateClusterMetadata {
  /** The time at which the operation failed or was completed successfully. */
  finishTime?: string;
  /** The time at which the original request was received. */
  requestTime?: string;
  /** The original request for PartialUpdateCluster. */
  originalRequest?: PartialUpdateClusterRequest;
}

export const PartialUpdateClusterMetadata: Schema.Schema<PartialUpdateClusterMetadata> = Schema.suspend(() => Schema.Struct({
  finishTime: Schema.optional(Schema.String),
  requestTime: Schema.optional(Schema.String),
  originalRequest: Schema.optional(PartialUpdateClusterRequest),
})).annotate({ identifier: "PartialUpdateClusterMetadata" }) as any as Schema.Schema<PartialUpdateClusterMetadata>;

export interface CreateClusterMetadata {
  /** The time at which the original request was received. */
  requestTime?: string;
  /** The request that prompted the initiation of this CreateCluster operation. */
  originalRequest?: CreateClusterRequest;
  /** Keys: the full `name` of each table that existed in the instance when CreateCluster was first called, i.e. `projects//instances//tables/`. Any table added to the instance by a later API call will be created in the new cluster by that API call, not this one. Values: information on how much of a table's data has been copied to the newly-created cluster so far. */
  tables?: Record<string, TableProgress>;
  /** The time at which the operation failed or was completed successfully. */
  finishTime?: string;
}

export const CreateClusterMetadata: Schema.Schema<CreateClusterMetadata> = Schema.suspend(() => Schema.Struct({
  requestTime: Schema.optional(Schema.String),
  originalRequest: Schema.optional(CreateClusterRequest),
  tables: Schema.optional(Schema.Record(Schema.String, TableProgress)),
  finishTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateClusterMetadata" }) as any as Schema.Schema<CreateClusterMetadata>;

export interface UndeleteTableMetadata {
  /** If set, the time at which this operation finished or was cancelled. DEPRECATED: Use finish_time instead. */
  endTime?: string;
  /** The time at which the original request was received. */
  requestTime?: string;
  /** The name of the table being restored. */
  name?: string;
  /** The time at which the operation failed or was completed successfully. */
  finishTime?: string;
  /** The time at which this operation started. DEPRECATED: Use request_time instead. */
  startTime?: string;
}

export const UndeleteTableMetadata: Schema.Schema<UndeleteTableMetadata> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  requestTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  finishTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "UndeleteTableMetadata" }) as any as Schema.Schema<UndeleteTableMetadata>;

export interface UpdateTableMetadata {
  /** The time at which the operation failed or was completed successfully. */
  finishTime?: string;
  /** The time at which this operation started. DEPRECATED: Use request_time instead. */
  startTime?: string;
  /** The time at which the original request was received. */
  requestTime?: string;
  /** The name of the table being updated. */
  name?: string;
  /** If set, the time at which this operation finished or was canceled. DEPRECATED: Use finish_time instead. */
  endTime?: string;
}

export const UpdateTableMetadata: Schema.Schema<UpdateTableMetadata> = Schema.suspend(() => Schema.Struct({
  finishTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  requestTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "UpdateTableMetadata" }) as any as Schema.Schema<UpdateTableMetadata>;

export interface CreateTableRequest {
  /** Required. The name by which the new table should be referred to within the parent instance, e.g., `foobar` rather than `{parent}/tables/foobar`. Maximum 50 characters. */
  tableId?: string;
  /** Required. The Table to create. */
  table?: Table;
  /** The optional list of row keys that will be used to initially split the table into several tablets (tablets are similar to HBase regions). Given two split keys, `s1` and `s2`, three tablets will be created, spanning the key ranges: `[, s1), [s1, s2), [s2, )`. Example: * Row keys := `["a", "apple", "custom", "customer_1", "customer_2",` `"other", "zz"]` * initial_split_keys := `["apple", "customer_1", "customer_2", "other"]` * Key assignment: - Tablet 1 `[, apple) => {"a"}.` - Tablet 2 `[apple, customer_1) => {"apple", "custom"}.` - Tablet 3 `[customer_1, customer_2) => {"customer_1"}.` - Tablet 4 `[customer_2, other) => {"customer_2"}.` - Tablet 5 `[other, ) => {"other", "zz"}.` */
  initialSplits?: Array<Split>;
}

export const CreateTableRequest: Schema.Schema<CreateTableRequest> = Schema.suspend(() => Schema.Struct({
  tableId: Schema.optional(Schema.String),
  table: Schema.optional(Table),
  initialSplits: Schema.optional(Schema.Array(Split)),
})).annotate({ identifier: "CreateTableRequest" }) as any as Schema.Schema<CreateTableRequest>;

export interface CreateLogicalViewMetadata {
  /** The request that prompted the initiation of this CreateLogicalView operation. */
  originalRequest?: CreateLogicalViewRequest;
  /** DEPRECATED: Use request_time instead. */
  startTime?: string;
  /** DEPRECATED: Use finish_time instead. */
  endTime?: string;
  /** The time at which the operation failed or was completed successfully. */
  finishTime?: string;
  /** The time at which the original request was received. */
  requestTime?: string;
}

export const CreateLogicalViewMetadata: Schema.Schema<CreateLogicalViewMetadata> = Schema.suspend(() => Schema.Struct({
  originalRequest: Schema.optional(CreateLogicalViewRequest),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  finishTime: Schema.optional(Schema.String),
  requestTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateLogicalViewMetadata" }) as any as Schema.Schema<CreateLogicalViewMetadata>;

export interface ListHotTabletsResponse {
  /** List of hot tablets in the tables of the requested cluster that fall within the requested time range. Hot tablets are ordered by node cpu usage percent. If there are multiple hot tablets that correspond to the same tablet within a 15-minute interval, only the hot tablet with the highest node cpu usage will be included in the response. */
  hotTablets?: Array<HotTablet>;
  /** Set if not all hot tablets could be returned in a single response. Pass this value to `page_token` in another request to get the next page of results. */
  nextPageToken?: string;
}

export const ListHotTabletsResponse: Schema.Schema<ListHotTabletsResponse> = Schema.suspend(() => Schema.Struct({
  hotTablets: Schema.optional(Schema.Array(HotTablet)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListHotTabletsResponse" }) as any as Schema.Schema<ListHotTabletsResponse>;

export interface CreateSchemaBundleMetadata {
  /** The unique name identifying this schema bundle. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/{schema_bundle}` */
  name?: string;
  /** The time at which the operation failed or was completed successfully. */
  finishTime?: string;
  /** The time at which the original request was received. */
  requestTime?: string;
}

export const CreateSchemaBundleMetadata: Schema.Schema<CreateSchemaBundleMetadata> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  finishTime: Schema.optional(Schema.String),
  requestTime: Schema.optional(Schema.String),
})).annotate({ identifier: "CreateSchemaBundleMetadata" }) as any as Schema.Schema<CreateSchemaBundleMetadata>;

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
  T.Http({ method: "GET", path: "v2/operations/{operationsId}" }),
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

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOperationsProjectsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListOperationsProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v2/operations/projects/{projectsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListOperationsProjectsOperationsRequest>;

export type ListOperationsProjectsOperationsResponse = ListOperationsResponse;
export const ListOperationsProjectsOperationsResponse = ListOperationsResponse;

export type ListOperationsProjectsOperationsError = CommonErrors;

export const listOperationsProjectsOperations = API.makePaginated(() => ({
  input: ListOperationsProjectsOperationsRequest,
  output: ListOperationsProjectsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Create an instance within a project. Note that exactly one of Cluster.serve_nodes and Cluster.cluster_config.cluster_autoscaling_config can be set. If serve_nodes is set to non-zero, then the cluster is manually scaled. If cluster_config.cluster_autoscaling_config is non-empty, then autoscaling is enabled. */
export interface CreateProjectsInstancesRequest {
  /** Required. The unique name of the project in which to create the new instance. Values are of the form `projects/{project}`. */
  parent: string;
  /** Request body */
  body?: CreateInstanceRequest;
}

export const CreateProjectsInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateInstanceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstancesRequest>;

export type CreateProjectsInstancesResponse = Operation;
export const CreateProjectsInstancesResponse = Operation;

export type CreateProjectsInstancesError = CommonErrors;

export const createProjectsInstances: API.OperationMethod<CreateProjectsInstancesRequest, CreateProjectsInstancesResponse, CreateProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstancesRequest,
  output: CreateProjectsInstancesResponse,
  errors: [],
}));

/** Updates an instance within a project. This method updates only the display name and type for an Instance. To update other Instance properties, such as labels, use PartialUpdateInstance. */
export interface UpdateProjectsInstancesRequest {
  /** The unique name of the instance. Values are of the form `projects/{project}/instances/a-z+[a-z0-9]`. */
  name: string;
  /** Request body */
  body?: Instance;
}

export const UpdateProjectsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Instance).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v2/projects/{projectsId}/instances/{instancesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsInstancesRequest>;

export type UpdateProjectsInstancesResponse = Instance;
export const UpdateProjectsInstancesResponse = Instance;

export type UpdateProjectsInstancesError = CommonErrors;

export const updateProjectsInstances: API.OperationMethod<UpdateProjectsInstancesRequest, UpdateProjectsInstancesResponse, UpdateProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsInstancesRequest,
  output: UpdateProjectsInstancesResponse,
  errors: [],
}));

/** Delete an instance from a project. */
export interface DeleteProjectsInstancesRequest {
  /** Required. The unique name of the instance to be deleted. Values are of the form `projects/{project}/instances/{instance}`. */
  name: string;
}

export const DeleteProjectsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesRequest>;

export type DeleteProjectsInstancesResponse = Empty;
export const DeleteProjectsInstancesResponse = Empty;

export type DeleteProjectsInstancesError = CommonErrors;

export const deleteProjectsInstances: API.OperationMethod<DeleteProjectsInstancesRequest, DeleteProjectsInstancesResponse, DeleteProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesRequest,
  output: DeleteProjectsInstancesResponse,
  errors: [],
}));

/** Lists information about instances in a project. */
export interface ListProjectsInstancesRequest {
  /** DEPRECATED: This field is unused and ignored. */
  pageToken?: string;
  /** Required. The unique name of the project for which a list of instances is requested. Values are of the form `projects/{project}`. */
  parent: string;
}

export const ListProjectsInstancesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesRequest>;

export type ListProjectsInstancesResponse = ListInstancesResponse;
export const ListProjectsInstancesResponse = ListInstancesResponse;

export type ListProjectsInstancesError = CommonErrors;

export const listProjectsInstances = API.makePaginated(() => ({
  input: ListProjectsInstancesRequest,
  output: ListProjectsInstancesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the access control policy on an instance resource. Replaces any existing policy. */
export interface SetIamPolicyProjectsInstancesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsInstancesRequest>;

export type SetIamPolicyProjectsInstancesResponse = Policy;
export const SetIamPolicyProjectsInstancesResponse = Policy;

export type SetIamPolicyProjectsInstancesError = CommonErrors;

export const setIamPolicyProjectsInstances: API.OperationMethod<SetIamPolicyProjectsInstancesRequest, SetIamPolicyProjectsInstancesResponse, SetIamPolicyProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsInstancesRequest,
  output: SetIamPolicyProjectsInstancesResponse,
  errors: [],
}));

/** Gets the access control policy for an instance resource. Returns an empty policy if an instance exists but does not have a policy set. */
export interface GetIamPolicyProjectsInstancesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsInstancesRequest>;

export type GetIamPolicyProjectsInstancesResponse = Policy;
export const GetIamPolicyProjectsInstancesResponse = Policy;

export type GetIamPolicyProjectsInstancesError = CommonErrors;

export const getIamPolicyProjectsInstances: API.OperationMethod<GetIamPolicyProjectsInstancesRequest, GetIamPolicyProjectsInstancesResponse, GetIamPolicyProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsInstancesRequest,
  output: GetIamPolicyProjectsInstancesResponse,
  errors: [],
}));

/** Partially updates an instance within a project. This method can modify all fields of an Instance and is the preferred way to update an Instance. */
export interface PartialUpdateInstanceProjectsInstancesRequest {
  /** Required. The subset of Instance fields which should be replaced. Must be explicitly set. */
  updateMask?: string;
  /** The unique name of the instance. Values are of the form `projects/{project}/instances/a-z+[a-z0-9]`. */
  name: string;
  /** Request body */
  body?: Instance;
}

export const PartialUpdateInstanceProjectsInstancesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Instance).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/instances/{instancesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PartialUpdateInstanceProjectsInstancesRequest>;

export type PartialUpdateInstanceProjectsInstancesResponse = Operation;
export const PartialUpdateInstanceProjectsInstancesResponse = Operation;

export type PartialUpdateInstanceProjectsInstancesError = CommonErrors;

export const partialUpdateInstanceProjectsInstances: API.OperationMethod<PartialUpdateInstanceProjectsInstancesRequest, PartialUpdateInstanceProjectsInstancesResponse, PartialUpdateInstanceProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PartialUpdateInstanceProjectsInstancesRequest,
  output: PartialUpdateInstanceProjectsInstancesResponse,
  errors: [],
}));

/** Gets information about an instance. */
export interface GetProjectsInstancesRequest {
  /** Required. The unique name of the requested instance. Values are of the form `projects/{project}/instances/{instance}`. */
  name: string;
}

export const GetProjectsInstancesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesRequest>;

export type GetProjectsInstancesResponse = Instance;
export const GetProjectsInstancesResponse = Instance;

export type GetProjectsInstancesError = CommonErrors;

export const getProjectsInstances: API.OperationMethod<GetProjectsInstancesRequest, GetProjectsInstancesResponse, GetProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesRequest,
  output: GetProjectsInstancesResponse,
  errors: [],
}));

/** Returns permissions that the caller has on the specified instance resource. */
export interface TestIamPermissionsProjectsInstancesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsInstancesRequest>;

export type TestIamPermissionsProjectsInstancesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsInstancesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsInstancesError = CommonErrors;

export const testIamPermissionsProjectsInstances: API.OperationMethod<TestIamPermissionsProjectsInstancesRequest, TestIamPermissionsProjectsInstancesResponse, TestIamPermissionsProjectsInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsInstancesRequest,
  output: TestIamPermissionsProjectsInstancesResponse,
  errors: [],
}));

/** Restores a specified table which was accidentally deleted. */
export interface UndeleteProjectsInstancesTablesRequest {
  /** Required. The unique name of the table to be restored. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. */
  name: string;
  /** Request body */
  body?: UndeleteTableRequest;
}

export const UndeleteProjectsInstancesTablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UndeleteTableRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}:undelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UndeleteProjectsInstancesTablesRequest>;

export type UndeleteProjectsInstancesTablesResponse = Operation;
export const UndeleteProjectsInstancesTablesResponse = Operation;

export type UndeleteProjectsInstancesTablesError = CommonErrors;

export const undeleteProjectsInstancesTables: API.OperationMethod<UndeleteProjectsInstancesTablesRequest, UndeleteProjectsInstancesTablesResponse, UndeleteProjectsInstancesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UndeleteProjectsInstancesTablesRequest,
  output: UndeleteProjectsInstancesTablesResponse,
  errors: [],
}));

/** Create a new table by restoring from a completed backup. The returned table long-running operation can be used to track the progress of the operation, and to cancel it. The metadata field type is RestoreTableMetadata. The response type is Table, if successful. */
export interface RestoreProjectsInstancesTablesRequest {
  /** Required. The name of the instance in which to create the restored table. Values are of the form `projects//instances/`. */
  parent: string;
  /** Request body */
  body?: RestoreTableRequest;
}

export const RestoreProjectsInstancesTablesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RestoreTableRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables:restore", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RestoreProjectsInstancesTablesRequest>;

export type RestoreProjectsInstancesTablesResponse = Operation;
export const RestoreProjectsInstancesTablesResponse = Operation;

export type RestoreProjectsInstancesTablesError = CommonErrors;

export const restoreProjectsInstancesTables: API.OperationMethod<RestoreProjectsInstancesTablesRequest, RestoreProjectsInstancesTablesResponse, RestoreProjectsInstancesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RestoreProjectsInstancesTablesRequest,
  output: RestoreProjectsInstancesTablesResponse,
  errors: [],
}));

/** Permanently deletes a specified table and all of its data. */
export interface DeleteProjectsInstancesTablesRequest {
  /** Required. The unique name of the table to be deleted. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. */
  name: string;
}

export const DeleteProjectsInstancesTablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesTablesRequest>;

export type DeleteProjectsInstancesTablesResponse = Empty;
export const DeleteProjectsInstancesTablesResponse = Empty;

export type DeleteProjectsInstancesTablesError = CommonErrors;

export const deleteProjectsInstancesTables: API.OperationMethod<DeleteProjectsInstancesTablesRequest, DeleteProjectsInstancesTablesResponse, DeleteProjectsInstancesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesTablesRequest,
  output: DeleteProjectsInstancesTablesResponse,
  errors: [],
}));

/** Checks replication consistency based on a consistency token, that is, if replication has caught up based on the conditions specified in the token and the check request. */
export interface CheckConsistencyProjectsInstancesTablesRequest {
  /** Required. The unique name of the Table for which to check replication consistency. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. */
  name: string;
  /** Request body */
  body?: CheckConsistencyRequest;
}

export const CheckConsistencyProjectsInstancesTablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CheckConsistencyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}:checkConsistency", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CheckConsistencyProjectsInstancesTablesRequest>;

export type CheckConsistencyProjectsInstancesTablesResponse = CheckConsistencyResponse;
export const CheckConsistencyProjectsInstancesTablesResponse = CheckConsistencyResponse;

export type CheckConsistencyProjectsInstancesTablesError = CommonErrors;

export const checkConsistencyProjectsInstancesTables: API.OperationMethod<CheckConsistencyProjectsInstancesTablesRequest, CheckConsistencyProjectsInstancesTablesResponse, CheckConsistencyProjectsInstancesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckConsistencyProjectsInstancesTablesRequest,
  output: CheckConsistencyProjectsInstancesTablesResponse,
  errors: [],
}));

/** Gets the access control policy for a Bigtable resource. Returns an empty policy if the resource exists but does not have a policy set. */
export interface GetIamPolicyProjectsInstancesTablesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsInstancesTablesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsInstancesTablesRequest>;

export type GetIamPolicyProjectsInstancesTablesResponse = Policy;
export const GetIamPolicyProjectsInstancesTablesResponse = Policy;

export type GetIamPolicyProjectsInstancesTablesError = CommonErrors;

export const getIamPolicyProjectsInstancesTables: API.OperationMethod<GetIamPolicyProjectsInstancesTablesRequest, GetIamPolicyProjectsInstancesTablesResponse, GetIamPolicyProjectsInstancesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsInstancesTablesRequest,
  output: GetIamPolicyProjectsInstancesTablesResponse,
  errors: [],
}));

/** Permanently drop/delete a row range from a specified table. The request can specify whether to delete all rows in a table, or only those that match a particular prefix. Note that row key prefixes used here are treated as service data. For more information about how service data is handled, see the [Google Cloud Privacy Notice](https://cloud.google.com/terms/cloud-privacy-notice). */
export interface DropRowRangeProjectsInstancesTablesRequest {
  /** Required. The unique name of the table on which to drop a range of rows. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. */
  name: string;
  /** Request body */
  body?: DropRowRangeRequest;
}

export const DropRowRangeProjectsInstancesTablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DropRowRangeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}:dropRowRange", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DropRowRangeProjectsInstancesTablesRequest>;

export type DropRowRangeProjectsInstancesTablesResponse = Empty;
export const DropRowRangeProjectsInstancesTablesResponse = Empty;

export type DropRowRangeProjectsInstancesTablesError = CommonErrors;

export const dropRowRangeProjectsInstancesTables: API.OperationMethod<DropRowRangeProjectsInstancesTablesRequest, DropRowRangeProjectsInstancesTablesResponse, DropRowRangeProjectsInstancesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DropRowRangeProjectsInstancesTablesRequest,
  output: DropRowRangeProjectsInstancesTablesResponse,
  errors: [],
}));

/** Returns permissions that the caller has on the specified Bigtable resource. */
export interface TestIamPermissionsProjectsInstancesTablesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsInstancesTablesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsInstancesTablesRequest>;

export type TestIamPermissionsProjectsInstancesTablesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsInstancesTablesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsInstancesTablesError = CommonErrors;

export const testIamPermissionsProjectsInstancesTables: API.OperationMethod<TestIamPermissionsProjectsInstancesTablesRequest, TestIamPermissionsProjectsInstancesTablesResponse, TestIamPermissionsProjectsInstancesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsInstancesTablesRequest,
  output: TestIamPermissionsProjectsInstancesTablesResponse,
  errors: [],
}));

/** Updates a specified table. */
export interface PatchProjectsInstancesTablesRequest {
  /** The unique name of the table. Values are of the form `projects/{project}/instances/{instance}/tables/_a-zA-Z0-9*`. Views: `NAME_ONLY`, `SCHEMA_VIEW`, `REPLICATION_VIEW`, `STATS_VIEW`, `FULL` */
  name: string;
  /** Required. The list of fields to update. A mask specifying which fields (e.g. `change_stream_config`) in the `table` field should be updated. This mask is relative to the `table` field, not to the request message. The wildcard (*) path is currently not supported. Currently UpdateTable is only supported for the following fields: * `change_stream_config` * `change_stream_config.retention_period` * `deletion_protection` * `automated_backup_policy` * `automated_backup_policy.retention_period` * `automated_backup_policy.frequency` * `row_key_schema` If `column_families` is set in `update_mask`, it will return an UNIMPLEMENTED error. */
  updateMask?: string;
  /** Optional. If true, ignore safety checks when updating the table. */
  ignoreWarnings?: boolean;
  /** Request body */
  body?: Table;
}

export const PatchProjectsInstancesTablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  ignoreWarnings: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreWarnings")),
  body: Schema.optional(Table).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsInstancesTablesRequest>;

export type PatchProjectsInstancesTablesResponse = Operation;
export const PatchProjectsInstancesTablesResponse = Operation;

export type PatchProjectsInstancesTablesError = CommonErrors;

export const patchProjectsInstancesTables: API.OperationMethod<PatchProjectsInstancesTablesRequest, PatchProjectsInstancesTablesResponse, PatchProjectsInstancesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsInstancesTablesRequest,
  output: PatchProjectsInstancesTablesResponse,
  errors: [],
}));

/** Generates a consistency token for a Table, which can be used in CheckConsistency to check whether mutations to the table that finished before this call started have been replicated. The tokens will be available for 90 days. */
export interface GenerateConsistencyTokenProjectsInstancesTablesRequest {
  /** Required. The unique name of the Table for which to create a consistency token. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. */
  name: string;
  /** Request body */
  body?: GenerateConsistencyTokenRequest;
}

export const GenerateConsistencyTokenProjectsInstancesTablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GenerateConsistencyTokenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}:generateConsistencyToken", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateConsistencyTokenProjectsInstancesTablesRequest>;

export type GenerateConsistencyTokenProjectsInstancesTablesResponse = GenerateConsistencyTokenResponse;
export const GenerateConsistencyTokenProjectsInstancesTablesResponse = GenerateConsistencyTokenResponse;

export type GenerateConsistencyTokenProjectsInstancesTablesError = CommonErrors;

export const generateConsistencyTokenProjectsInstancesTables: API.OperationMethod<GenerateConsistencyTokenProjectsInstancesTablesRequest, GenerateConsistencyTokenProjectsInstancesTablesResponse, GenerateConsistencyTokenProjectsInstancesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateConsistencyTokenProjectsInstancesTablesRequest,
  output: GenerateConsistencyTokenProjectsInstancesTablesResponse,
  errors: [],
}));

/** Gets metadata information about the specified table. */
export interface GetProjectsInstancesTablesRequest {
  /** Required. The unique name of the requested table. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. */
  name: string;
  /** The view to be applied to the returned table's fields. Defaults to `SCHEMA_VIEW` if unspecified. */
  view?: "VIEW_UNSPECIFIED" | "NAME_ONLY" | "SCHEMA_VIEW" | "REPLICATION_VIEW" | "ENCRYPTION_VIEW" | "STATS_VIEW" | "FULL" | (string & {});
}

export const GetProjectsInstancesTablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesTablesRequest>;

export type GetProjectsInstancesTablesResponse = Table;
export const GetProjectsInstancesTablesResponse = Table;

export type GetProjectsInstancesTablesError = CommonErrors;

export const getProjectsInstancesTables: API.OperationMethod<GetProjectsInstancesTablesRequest, GetProjectsInstancesTablesResponse, GetProjectsInstancesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesTablesRequest,
  output: GetProjectsInstancesTablesResponse,
  errors: [],
}));

/** Sets the access control policy on a Bigtable resource. Replaces any existing policy. */
export interface SetIamPolicyProjectsInstancesTablesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsInstancesTablesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsInstancesTablesRequest>;

export type SetIamPolicyProjectsInstancesTablesResponse = Policy;
export const SetIamPolicyProjectsInstancesTablesResponse = Policy;

export type SetIamPolicyProjectsInstancesTablesError = CommonErrors;

export const setIamPolicyProjectsInstancesTables: API.OperationMethod<SetIamPolicyProjectsInstancesTablesRequest, SetIamPolicyProjectsInstancesTablesResponse, SetIamPolicyProjectsInstancesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsInstancesTablesRequest,
  output: SetIamPolicyProjectsInstancesTablesResponse,
  errors: [],
}));

/** Creates a new table in the specified instance. The table can be created with a full set of initial column families, specified in the request. */
export interface CreateProjectsInstancesTablesRequest {
  /** Required. The unique name of the instance in which to create the table. Values are of the form `projects/{project}/instances/{instance}`. */
  parent: string;
  /** Request body */
  body?: CreateTableRequest;
}

export const CreateProjectsInstancesTablesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateTableRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstancesTablesRequest>;

export type CreateProjectsInstancesTablesResponse = Table;
export const CreateProjectsInstancesTablesResponse = Table;

export type CreateProjectsInstancesTablesError = CommonErrors;

export const createProjectsInstancesTables: API.OperationMethod<CreateProjectsInstancesTablesRequest, CreateProjectsInstancesTablesResponse, CreateProjectsInstancesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstancesTablesRequest,
  output: CreateProjectsInstancesTablesResponse,
  errors: [],
}));

/** Lists all tables served from a specified instance. */
export interface ListProjectsInstancesTablesRequest {
  /** Maximum number of results per page. A page_size of zero lets the server choose the number of items to return. A page_size which is strictly positive will return at most that many items. A negative page_size will cause an error. Following the first request, subsequent paginated calls are not required to pass a page_size. If a page_size is set in subsequent calls, it must match the page_size given in the first request. */
  pageSize?: number;
  /** Required. The unique name of the instance for which tables should be listed. Values are of the form `projects/{project}/instances/{instance}`. */
  parent: string;
  /** The value of `next_page_token` returned by a previous call. */
  pageToken?: string;
  /** The view to be applied to the returned tables' fields. Only NAME_ONLY view (default), REPLICATION_VIEW and ENCRYPTION_VIEW are supported. */
  view?: "VIEW_UNSPECIFIED" | "NAME_ONLY" | "SCHEMA_VIEW" | "REPLICATION_VIEW" | "ENCRYPTION_VIEW" | "STATS_VIEW" | "FULL" | (string & {});
}

export const ListProjectsInstancesTablesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/tables" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesTablesRequest>;

export type ListProjectsInstancesTablesResponse = ListTablesResponse;
export const ListProjectsInstancesTablesResponse = ListTablesResponse;

export type ListProjectsInstancesTablesError = CommonErrors;

export const listProjectsInstancesTables = API.makePaginated(() => ({
  input: ListProjectsInstancesTablesRequest,
  output: ListProjectsInstancesTablesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Performs a series of column family modifications on the specified table. Either all or none of the modifications will occur before this method returns, but data requests received prior to that point may see a table where only some modifications have taken effect. */
export interface ModifyColumnFamiliesProjectsInstancesTablesRequest {
  /** Required. The unique name of the table whose families should be modified. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. */
  name: string;
  /** Request body */
  body?: ModifyColumnFamiliesRequest;
}

export const ModifyColumnFamiliesProjectsInstancesTablesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ModifyColumnFamiliesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}:modifyColumnFamilies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ModifyColumnFamiliesProjectsInstancesTablesRequest>;

export type ModifyColumnFamiliesProjectsInstancesTablesResponse = Table;
export const ModifyColumnFamiliesProjectsInstancesTablesResponse = Table;

export type ModifyColumnFamiliesProjectsInstancesTablesError = CommonErrors;

export const modifyColumnFamiliesProjectsInstancesTables: API.OperationMethod<ModifyColumnFamiliesProjectsInstancesTablesRequest, ModifyColumnFamiliesProjectsInstancesTablesResponse, ModifyColumnFamiliesProjectsInstancesTablesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ModifyColumnFamiliesProjectsInstancesTablesRequest,
  output: ModifyColumnFamiliesProjectsInstancesTablesResponse,
  errors: [],
}));

/** Creates a new AuthorizedView in a table. */
export interface CreateProjectsInstancesTablesAuthorizedViewsRequest {
  /** Required. This is the name of the table the AuthorizedView belongs to. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. */
  parent: string;
  /** Required. The id of the AuthorizedView to create. This AuthorizedView must not already exist. The `authorized_view_id` appended to `parent` forms the full AuthorizedView name of the form `projects/{project}/instances/{instance}/tables/{table}/authorizedView/{authorized_view}`. */
  authorizedViewId?: string;
  /** Request body */
  body?: AuthorizedView;
}

export const CreateProjectsInstancesTablesAuthorizedViewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  authorizedViewId: Schema.optional(Schema.String).pipe(T.HttpQuery("authorizedViewId")),
  body: Schema.optional(AuthorizedView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/authorizedViews", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstancesTablesAuthorizedViewsRequest>;

export type CreateProjectsInstancesTablesAuthorizedViewsResponse = Operation;
export const CreateProjectsInstancesTablesAuthorizedViewsResponse = Operation;

export type CreateProjectsInstancesTablesAuthorizedViewsError = CommonErrors;

export const createProjectsInstancesTablesAuthorizedViews: API.OperationMethod<CreateProjectsInstancesTablesAuthorizedViewsRequest, CreateProjectsInstancesTablesAuthorizedViewsResponse, CreateProjectsInstancesTablesAuthorizedViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstancesTablesAuthorizedViewsRequest,
  output: CreateProjectsInstancesTablesAuthorizedViewsResponse,
  errors: [],
}));

/** Gets information from a specified AuthorizedView. */
export interface GetProjectsInstancesTablesAuthorizedViewsRequest {
  /** Required. The unique name of the requested AuthorizedView. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/authorizedViews/{authorized_view}`. */
  name: string;
  /** Optional. The resource_view to be applied to the returned AuthorizedView's fields. Default to BASIC. */
  view?: "RESPONSE_VIEW_UNSPECIFIED" | "NAME_ONLY" | "BASIC" | "FULL" | (string & {});
}

export const GetProjectsInstancesTablesAuthorizedViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/authorizedViews/{authorizedViewsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesTablesAuthorizedViewsRequest>;

export type GetProjectsInstancesTablesAuthorizedViewsResponse = AuthorizedView;
export const GetProjectsInstancesTablesAuthorizedViewsResponse = AuthorizedView;

export type GetProjectsInstancesTablesAuthorizedViewsError = CommonErrors;

export const getProjectsInstancesTablesAuthorizedViews: API.OperationMethod<GetProjectsInstancesTablesAuthorizedViewsRequest, GetProjectsInstancesTablesAuthorizedViewsResponse, GetProjectsInstancesTablesAuthorizedViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesTablesAuthorizedViewsRequest,
  output: GetProjectsInstancesTablesAuthorizedViewsResponse,
  errors: [],
}));

/** Updates an AuthorizedView in a table. */
export interface PatchProjectsInstancesTablesAuthorizedViewsRequest {
  /** Identifier. The name of this AuthorizedView. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/authorizedViews/{authorized_view}` */
  name: string;
  /** Optional. The list of fields to update. A mask specifying which fields in the AuthorizedView resource should be updated. This mask is relative to the AuthorizedView resource, not to the request message. A field will be overwritten if it is in the mask. If empty, all fields set in the request will be overwritten. A special value `*` means to overwrite all fields (including fields not set in the request). */
  updateMask?: string;
  /** Optional. If true, ignore the safety checks when updating the AuthorizedView. */
  ignoreWarnings?: boolean;
  /** Request body */
  body?: AuthorizedView;
}

export const PatchProjectsInstancesTablesAuthorizedViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  ignoreWarnings: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreWarnings")),
  body: Schema.optional(AuthorizedView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/authorizedViews/{authorizedViewsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsInstancesTablesAuthorizedViewsRequest>;

export type PatchProjectsInstancesTablesAuthorizedViewsResponse = Operation;
export const PatchProjectsInstancesTablesAuthorizedViewsResponse = Operation;

export type PatchProjectsInstancesTablesAuthorizedViewsError = CommonErrors;

export const patchProjectsInstancesTablesAuthorizedViews: API.OperationMethod<PatchProjectsInstancesTablesAuthorizedViewsRequest, PatchProjectsInstancesTablesAuthorizedViewsResponse, PatchProjectsInstancesTablesAuthorizedViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsInstancesTablesAuthorizedViewsRequest,
  output: PatchProjectsInstancesTablesAuthorizedViewsResponse,
  errors: [],
}));

/** Permanently deletes a specified AuthorizedView. */
export interface DeleteProjectsInstancesTablesAuthorizedViewsRequest {
  /** Optional. The current etag of the AuthorizedView. If an etag is provided and does not match the current etag of the AuthorizedView, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Required. The unique name of the AuthorizedView to be deleted. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/authorizedViews/{authorized_view}`. */
  name: string;
}

export const DeleteProjectsInstancesTablesAuthorizedViewsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/authorizedViews/{authorizedViewsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesTablesAuthorizedViewsRequest>;

export type DeleteProjectsInstancesTablesAuthorizedViewsResponse = Empty;
export const DeleteProjectsInstancesTablesAuthorizedViewsResponse = Empty;

export type DeleteProjectsInstancesTablesAuthorizedViewsError = CommonErrors;

export const deleteProjectsInstancesTablesAuthorizedViews: API.OperationMethod<DeleteProjectsInstancesTablesAuthorizedViewsRequest, DeleteProjectsInstancesTablesAuthorizedViewsResponse, DeleteProjectsInstancesTablesAuthorizedViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesTablesAuthorizedViewsRequest,
  output: DeleteProjectsInstancesTablesAuthorizedViewsResponse,
  errors: [],
}));

/** Sets the access control policy on a Bigtable resource. Replaces any existing policy. */
export interface SetIamPolicyProjectsInstancesTablesAuthorizedViewsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsInstancesTablesAuthorizedViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/authorizedViews/{authorizedViewsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsInstancesTablesAuthorizedViewsRequest>;

export type SetIamPolicyProjectsInstancesTablesAuthorizedViewsResponse = Policy;
export const SetIamPolicyProjectsInstancesTablesAuthorizedViewsResponse = Policy;

export type SetIamPolicyProjectsInstancesTablesAuthorizedViewsError = CommonErrors;

export const setIamPolicyProjectsInstancesTablesAuthorizedViews: API.OperationMethod<SetIamPolicyProjectsInstancesTablesAuthorizedViewsRequest, SetIamPolicyProjectsInstancesTablesAuthorizedViewsResponse, SetIamPolicyProjectsInstancesTablesAuthorizedViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsInstancesTablesAuthorizedViewsRequest,
  output: SetIamPolicyProjectsInstancesTablesAuthorizedViewsResponse,
  errors: [],
}));

/** Returns permissions that the caller has on the specified Bigtable resource. */
export interface TestIamPermissionsProjectsInstancesTablesAuthorizedViewsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsInstancesTablesAuthorizedViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/authorizedViews/{authorizedViewsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsInstancesTablesAuthorizedViewsRequest>;

export type TestIamPermissionsProjectsInstancesTablesAuthorizedViewsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsInstancesTablesAuthorizedViewsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsInstancesTablesAuthorizedViewsError = CommonErrors;

export const testIamPermissionsProjectsInstancesTablesAuthorizedViews: API.OperationMethod<TestIamPermissionsProjectsInstancesTablesAuthorizedViewsRequest, TestIamPermissionsProjectsInstancesTablesAuthorizedViewsResponse, TestIamPermissionsProjectsInstancesTablesAuthorizedViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsInstancesTablesAuthorizedViewsRequest,
  output: TestIamPermissionsProjectsInstancesTablesAuthorizedViewsResponse,
  errors: [],
}));

/** Gets the access control policy for a Bigtable resource. Returns an empty policy if the resource exists but does not have a policy set. */
export interface GetIamPolicyProjectsInstancesTablesAuthorizedViewsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsInstancesTablesAuthorizedViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/authorizedViews/{authorizedViewsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsInstancesTablesAuthorizedViewsRequest>;

export type GetIamPolicyProjectsInstancesTablesAuthorizedViewsResponse = Policy;
export const GetIamPolicyProjectsInstancesTablesAuthorizedViewsResponse = Policy;

export type GetIamPolicyProjectsInstancesTablesAuthorizedViewsError = CommonErrors;

export const getIamPolicyProjectsInstancesTablesAuthorizedViews: API.OperationMethod<GetIamPolicyProjectsInstancesTablesAuthorizedViewsRequest, GetIamPolicyProjectsInstancesTablesAuthorizedViewsResponse, GetIamPolicyProjectsInstancesTablesAuthorizedViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsInstancesTablesAuthorizedViewsRequest,
  output: GetIamPolicyProjectsInstancesTablesAuthorizedViewsResponse,
  errors: [],
}));

/** Lists all AuthorizedViews from a specific table. */
export interface ListProjectsInstancesTablesAuthorizedViewsRequest {
  /** Optional. The resource_view to be applied to the returned AuthorizedViews' fields. Default to NAME_ONLY. */
  view?: "RESPONSE_VIEW_UNSPECIFIED" | "NAME_ONLY" | "BASIC" | "FULL" | (string & {});
  /** Required. The unique name of the table for which AuthorizedViews should be listed. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. */
  parent: string;
  /** Optional. The value of `next_page_token` returned by a previous call. */
  pageToken?: string;
  /** Optional. Maximum number of results per page. A page_size of zero lets the server choose the number of items to return. A page_size which is strictly positive will return at most that many items. A negative page_size will cause an error. Following the first request, subsequent paginated calls are not required to pass a page_size. If a page_size is set in subsequent calls, it must match the page_size given in the first request. */
  pageSize?: number;
}

export const ListProjectsInstancesTablesAuthorizedViewsRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/authorizedViews" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesTablesAuthorizedViewsRequest>;

export type ListProjectsInstancesTablesAuthorizedViewsResponse = ListAuthorizedViewsResponse;
export const ListProjectsInstancesTablesAuthorizedViewsResponse = ListAuthorizedViewsResponse;

export type ListProjectsInstancesTablesAuthorizedViewsError = CommonErrors;

export const listProjectsInstancesTablesAuthorizedViews = API.makePaginated(() => ({
  input: ListProjectsInstancesTablesAuthorizedViewsRequest,
  output: ListProjectsInstancesTablesAuthorizedViewsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a schema bundle in the specified table. */
export interface PatchProjectsInstancesTablesSchemaBundlesRequest {
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Identifier. The unique name identifying this schema bundle. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/{schema_bundle}` */
  name: string;
  /** Optional. If set, ignore the safety checks when updating the Schema Bundle. The safety checks are: - The new Schema Bundle is backwards compatible with the existing Schema Bundle. */
  ignoreWarnings?: boolean;
  /** Request body */
  body?: SchemaBundle;
}

export const PatchProjectsInstancesTablesSchemaBundlesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  ignoreWarnings: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreWarnings")),
  body: Schema.optional(SchemaBundle).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/schemaBundles/{schemaBundlesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsInstancesTablesSchemaBundlesRequest>;

export type PatchProjectsInstancesTablesSchemaBundlesResponse = Operation;
export const PatchProjectsInstancesTablesSchemaBundlesResponse = Operation;

export type PatchProjectsInstancesTablesSchemaBundlesError = CommonErrors;

export const patchProjectsInstancesTablesSchemaBundles: API.OperationMethod<PatchProjectsInstancesTablesSchemaBundlesRequest, PatchProjectsInstancesTablesSchemaBundlesResponse, PatchProjectsInstancesTablesSchemaBundlesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsInstancesTablesSchemaBundlesRequest,
  output: PatchProjectsInstancesTablesSchemaBundlesResponse,
  errors: [],
}));

/** Sets the access control policy on a Bigtable resource. Replaces any existing policy. */
export interface SetIamPolicyProjectsInstancesTablesSchemaBundlesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsInstancesTablesSchemaBundlesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/schemaBundles/{schemaBundlesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsInstancesTablesSchemaBundlesRequest>;

export type SetIamPolicyProjectsInstancesTablesSchemaBundlesResponse = Policy;
export const SetIamPolicyProjectsInstancesTablesSchemaBundlesResponse = Policy;

export type SetIamPolicyProjectsInstancesTablesSchemaBundlesError = CommonErrors;

export const setIamPolicyProjectsInstancesTablesSchemaBundles: API.OperationMethod<SetIamPolicyProjectsInstancesTablesSchemaBundlesRequest, SetIamPolicyProjectsInstancesTablesSchemaBundlesResponse, SetIamPolicyProjectsInstancesTablesSchemaBundlesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsInstancesTablesSchemaBundlesRequest,
  output: SetIamPolicyProjectsInstancesTablesSchemaBundlesResponse,
  errors: [],
}));

/** Returns permissions that the caller has on the specified Bigtable resource. */
export interface TestIamPermissionsProjectsInstancesTablesSchemaBundlesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsInstancesTablesSchemaBundlesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/schemaBundles/{schemaBundlesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsInstancesTablesSchemaBundlesRequest>;

export type TestIamPermissionsProjectsInstancesTablesSchemaBundlesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsInstancesTablesSchemaBundlesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsInstancesTablesSchemaBundlesError = CommonErrors;

export const testIamPermissionsProjectsInstancesTablesSchemaBundles: API.OperationMethod<TestIamPermissionsProjectsInstancesTablesSchemaBundlesRequest, TestIamPermissionsProjectsInstancesTablesSchemaBundlesResponse, TestIamPermissionsProjectsInstancesTablesSchemaBundlesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsInstancesTablesSchemaBundlesRequest,
  output: TestIamPermissionsProjectsInstancesTablesSchemaBundlesResponse,
  errors: [],
}));

/** Lists all schema bundles associated with the specified table. */
export interface ListProjectsInstancesTablesSchemaBundlesRequest {
  /** The maximum number of schema bundles to return. If the value is positive, the server may return at most this value. If unspecified, the server will return the maximum allowed page size. */
  pageSize?: number;
  /** A page token, received from a previous `ListSchemaBundles` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSchemaBundles` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The resource_view to be applied to the returned SchemaBundles' fields. Defaults to NAME_ONLY. */
  view?: "SCHEMA_BUNDLE_VIEW_UNSPECIFIED" | "NAME_ONLY" | "BASIC" | "FULL" | (string & {});
  /** Required. The parent, which owns this collection of schema bundles. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. */
  parent: string;
}

export const ListProjectsInstancesTablesSchemaBundlesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/schemaBundles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesTablesSchemaBundlesRequest>;

export type ListProjectsInstancesTablesSchemaBundlesResponse = ListSchemaBundlesResponse;
export const ListProjectsInstancesTablesSchemaBundlesResponse = ListSchemaBundlesResponse;

export type ListProjectsInstancesTablesSchemaBundlesError = CommonErrors;

export const listProjectsInstancesTablesSchemaBundles = API.makePaginated(() => ({
  input: ListProjectsInstancesTablesSchemaBundlesRequest,
  output: ListProjectsInstancesTablesSchemaBundlesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets metadata information about the specified schema bundle. */
export interface GetProjectsInstancesTablesSchemaBundlesRequest {
  /** Required. The unique name of the schema bundle to retrieve. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/{schema_bundle}` */
  name: string;
}

export const GetProjectsInstancesTablesSchemaBundlesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/schemaBundles/{schemaBundlesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesTablesSchemaBundlesRequest>;

export type GetProjectsInstancesTablesSchemaBundlesResponse = SchemaBundle;
export const GetProjectsInstancesTablesSchemaBundlesResponse = SchemaBundle;

export type GetProjectsInstancesTablesSchemaBundlesError = CommonErrors;

export const getProjectsInstancesTablesSchemaBundles: API.OperationMethod<GetProjectsInstancesTablesSchemaBundlesRequest, GetProjectsInstancesTablesSchemaBundlesResponse, GetProjectsInstancesTablesSchemaBundlesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesTablesSchemaBundlesRequest,
  output: GetProjectsInstancesTablesSchemaBundlesResponse,
  errors: [],
}));

/** Deletes a schema bundle in the specified table. */
export interface DeleteProjectsInstancesTablesSchemaBundlesRequest {
  /** Required. The unique name of the schema bundle to delete. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/{schema_bundle}` */
  name: string;
  /** Optional. The etag of the schema bundle. If this is provided, it must match the server's etag. The server returns an ABORTED error on a mismatched etag. */
  etag?: string;
}

export const DeleteProjectsInstancesTablesSchemaBundlesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/schemaBundles/{schemaBundlesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesTablesSchemaBundlesRequest>;

export type DeleteProjectsInstancesTablesSchemaBundlesResponse = Empty;
export const DeleteProjectsInstancesTablesSchemaBundlesResponse = Empty;

export type DeleteProjectsInstancesTablesSchemaBundlesError = CommonErrors;

export const deleteProjectsInstancesTablesSchemaBundles: API.OperationMethod<DeleteProjectsInstancesTablesSchemaBundlesRequest, DeleteProjectsInstancesTablesSchemaBundlesResponse, DeleteProjectsInstancesTablesSchemaBundlesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesTablesSchemaBundlesRequest,
  output: DeleteProjectsInstancesTablesSchemaBundlesResponse,
  errors: [],
}));

/** Creates a new schema bundle in the specified table. */
export interface CreateProjectsInstancesTablesSchemaBundlesRequest {
  /** Required. The unique ID to use for the schema bundle, which will become the final component of the schema bundle's resource name. */
  schemaBundleId?: string;
  /** Required. The parent resource where this schema bundle will be created. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. */
  parent: string;
  /** Request body */
  body?: SchemaBundle;
}

export const CreateProjectsInstancesTablesSchemaBundlesRequest = Schema.Struct({
  schemaBundleId: Schema.optional(Schema.String).pipe(T.HttpQuery("schemaBundleId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SchemaBundle).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/schemaBundles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstancesTablesSchemaBundlesRequest>;

export type CreateProjectsInstancesTablesSchemaBundlesResponse = Operation;
export const CreateProjectsInstancesTablesSchemaBundlesResponse = Operation;

export type CreateProjectsInstancesTablesSchemaBundlesError = CommonErrors;

export const createProjectsInstancesTablesSchemaBundles: API.OperationMethod<CreateProjectsInstancesTablesSchemaBundlesRequest, CreateProjectsInstancesTablesSchemaBundlesResponse, CreateProjectsInstancesTablesSchemaBundlesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstancesTablesSchemaBundlesRequest,
  output: CreateProjectsInstancesTablesSchemaBundlesResponse,
  errors: [],
}));

/** Gets the access control policy for a Bigtable resource. Returns an empty policy if the resource exists but does not have a policy set. */
export interface GetIamPolicyProjectsInstancesTablesSchemaBundlesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsInstancesTablesSchemaBundlesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/tables/{tablesId}/schemaBundles/{schemaBundlesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsInstancesTablesSchemaBundlesRequest>;

export type GetIamPolicyProjectsInstancesTablesSchemaBundlesResponse = Policy;
export const GetIamPolicyProjectsInstancesTablesSchemaBundlesResponse = Policy;

export type GetIamPolicyProjectsInstancesTablesSchemaBundlesError = CommonErrors;

export const getIamPolicyProjectsInstancesTablesSchemaBundles: API.OperationMethod<GetIamPolicyProjectsInstancesTablesSchemaBundlesRequest, GetIamPolicyProjectsInstancesTablesSchemaBundlesResponse, GetIamPolicyProjectsInstancesTablesSchemaBundlesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsInstancesTablesSchemaBundlesRequest,
  output: GetIamPolicyProjectsInstancesTablesSchemaBundlesResponse,
  errors: [],
}));

/** Creates a cluster within an instance. Note that exactly one of Cluster.serve_nodes and Cluster.cluster_config.cluster_autoscaling_config can be set. If serve_nodes is set to non-zero, then the cluster is manually scaled. If cluster_config.cluster_autoscaling_config is non-empty, then autoscaling is enabled. */
export interface CreateProjectsInstancesClustersRequest {
  /** Required. The unique name of the instance in which to create the new cluster. Values are of the form `projects/{project}/instances/{instance}`. */
  parent: string;
  /** Required. The ID to be used when referring to the new cluster within its instance, e.g., just `mycluster` rather than `projects/myproject/instances/myinstance/clusters/mycluster`. */
  clusterId?: string;
  /** Request body */
  body?: Cluster;
}

export const CreateProjectsInstancesClustersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  clusterId: Schema.optional(Schema.String).pipe(T.HttpQuery("clusterId")),
  body: Schema.optional(Cluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstancesClustersRequest>;

export type CreateProjectsInstancesClustersResponse = Operation;
export const CreateProjectsInstancesClustersResponse = Operation;

export type CreateProjectsInstancesClustersError = CommonErrors;

export const createProjectsInstancesClusters: API.OperationMethod<CreateProjectsInstancesClustersRequest, CreateProjectsInstancesClustersResponse, CreateProjectsInstancesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstancesClustersRequest,
  output: CreateProjectsInstancesClustersResponse,
  errors: [],
}));

/** Partially updates a cluster within a project. This method is the preferred way to update a Cluster. To enable and update autoscaling, set cluster_config.cluster_autoscaling_config. When autoscaling is enabled, serve_nodes is treated as an OUTPUT_ONLY field, meaning that updates to it are ignored. Note that an update cannot simultaneously set serve_nodes to non-zero and cluster_config.cluster_autoscaling_config to non-empty, and also specify both in the update_mask. To disable autoscaling, clear cluster_config.cluster_autoscaling_config, and explicitly set a serve_node count via the update_mask. */
export interface PartialUpdateClusterProjectsInstancesClustersRequest {
  /** The unique name of the cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/a-z*`. */
  name: string;
  /** Required. The subset of Cluster fields which should be replaced. */
  updateMask?: string;
  /** Request body */
  body?: Cluster;
}

export const PartialUpdateClusterProjectsInstancesClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Cluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters/{clustersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PartialUpdateClusterProjectsInstancesClustersRequest>;

export type PartialUpdateClusterProjectsInstancesClustersResponse = Operation;
export const PartialUpdateClusterProjectsInstancesClustersResponse = Operation;

export type PartialUpdateClusterProjectsInstancesClustersError = CommonErrors;

export const partialUpdateClusterProjectsInstancesClusters: API.OperationMethod<PartialUpdateClusterProjectsInstancesClustersRequest, PartialUpdateClusterProjectsInstancesClustersResponse, PartialUpdateClusterProjectsInstancesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PartialUpdateClusterProjectsInstancesClustersRequest,
  output: PartialUpdateClusterProjectsInstancesClustersResponse,
  errors: [],
}));

/** Lists information about clusters in an instance. */
export interface ListProjectsInstancesClustersRequest {
  /** DEPRECATED: This field is unused and ignored. */
  pageToken?: string;
  /** Required. The unique name of the instance for which a list of clusters is requested. Values are of the form `projects/{project}/instances/{instance}`. Use `{instance} = '-'` to list Clusters for all Instances in a project, e.g., `projects/myproject/instances/-`. */
  parent: string;
}

export const ListProjectsInstancesClustersRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesClustersRequest>;

export type ListProjectsInstancesClustersResponse = ListClustersResponse;
export const ListProjectsInstancesClustersResponse = ListClustersResponse;

export type ListProjectsInstancesClustersError = CommonErrors;

export const listProjectsInstancesClusters = API.makePaginated(() => ({
  input: ListProjectsInstancesClustersRequest,
  output: ListProjectsInstancesClustersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a cluster from an instance. */
export interface DeleteProjectsInstancesClustersRequest {
  /** Required. The unique name of the cluster to be deleted. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}`. */
  name: string;
}

export const DeleteProjectsInstancesClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters/{clustersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesClustersRequest>;

export type DeleteProjectsInstancesClustersResponse = Empty;
export const DeleteProjectsInstancesClustersResponse = Empty;

export type DeleteProjectsInstancesClustersError = CommonErrors;

export const deleteProjectsInstancesClusters: API.OperationMethod<DeleteProjectsInstancesClustersRequest, DeleteProjectsInstancesClustersResponse, DeleteProjectsInstancesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesClustersRequest,
  output: DeleteProjectsInstancesClustersResponse,
  errors: [],
}));

/** Updates a cluster within an instance. Note that UpdateCluster does not support updating cluster_config.cluster_autoscaling_config. In order to update it, you must use PartialUpdateCluster. */
export interface UpdateProjectsInstancesClustersRequest {
  /** The unique name of the cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/a-z*`. */
  name: string;
  /** Request body */
  body?: Cluster;
}

export const UpdateProjectsInstancesClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Cluster).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters/{clustersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsInstancesClustersRequest>;

export type UpdateProjectsInstancesClustersResponse = Operation;
export const UpdateProjectsInstancesClustersResponse = Operation;

export type UpdateProjectsInstancesClustersError = CommonErrors;

export const updateProjectsInstancesClusters: API.OperationMethod<UpdateProjectsInstancesClustersRequest, UpdateProjectsInstancesClustersResponse, UpdateProjectsInstancesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsInstancesClustersRequest,
  output: UpdateProjectsInstancesClustersResponse,
  errors: [],
}));

/** Gets information about a cluster. */
export interface GetProjectsInstancesClustersRequest {
  /** Required. The unique name of the requested cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}`. */
  name: string;
}

export const GetProjectsInstancesClustersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters/{clustersId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesClustersRequest>;

export type GetProjectsInstancesClustersResponse = Cluster;
export const GetProjectsInstancesClustersResponse = Cluster;

export type GetProjectsInstancesClustersError = CommonErrors;

export const getProjectsInstancesClusters: API.OperationMethod<GetProjectsInstancesClustersRequest, GetProjectsInstancesClustersResponse, GetProjectsInstancesClustersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesClustersRequest,
  output: GetProjectsInstancesClustersResponse,
  errors: [],
}));

/** Lists hot tablets in a cluster, within the time range provided. Hot tablets are ordered based on CPU usage. */
export interface ListProjectsInstancesClustersHotTabletsRequest {
  /** Required. The cluster name to list hot tablets. Value is in the following form: `projects/{project}/instances/{instance}/clusters/{cluster}`. */
  parent: string;
  /** The end time to list hot tablets. */
  endTime?: string;
  /** The start time to list hot tablets. The hot tablets in the response will have start times between the requested start time and end time. Start time defaults to Now if it is unset, and end time defaults to Now - 24 hours if it is unset. The start time should be less than the end time, and the maximum allowed time range between start time and end time is 48 hours. Start time and end time should have values between Now and Now - 14 days. */
  startTime?: string;
  /** The value of `next_page_token` returned by a previous call. */
  pageToken?: string;
  /** Maximum number of results per page. A page_size that is empty or zero lets the server choose the number of items to return. A page_size which is strictly positive will return at most that many items. A negative page_size will cause an error. Following the first request, subsequent paginated calls do not need a page_size field. If a page_size is set in subsequent calls, it must match the page_size given in the first request. */
  pageSize?: number;
}

export const ListProjectsInstancesClustersHotTabletsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  endTime: Schema.optional(Schema.String).pipe(T.HttpQuery("endTime")),
  startTime: Schema.optional(Schema.String).pipe(T.HttpQuery("startTime")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters/{clustersId}/hotTablets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesClustersHotTabletsRequest>;

export type ListProjectsInstancesClustersHotTabletsResponse = ListHotTabletsResponse;
export const ListProjectsInstancesClustersHotTabletsResponse = ListHotTabletsResponse;

export type ListProjectsInstancesClustersHotTabletsError = CommonErrors;

export const listProjectsInstancesClustersHotTablets = API.makePaginated(() => ({
  input: ListProjectsInstancesClustersHotTabletsRequest,
  output: ListProjectsInstancesClustersHotTabletsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Copy a Cloud Bigtable backup to a new backup in the destination cluster located in the destination instance and project. */
export interface CopyProjectsInstancesClustersBackupsRequest {
  /** Required. The name of the destination cluster that will contain the backup copy. The cluster must already exist. Values are of the form: `projects/{project}/instances/{instance}/clusters/{cluster}`. */
  parent: string;
  /** Request body */
  body?: CopyBackupRequest;
}

export const CopyProjectsInstancesClustersBackupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CopyBackupRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters/{clustersId}/backups:copy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CopyProjectsInstancesClustersBackupsRequest>;

export type CopyProjectsInstancesClustersBackupsResponse = Operation;
export const CopyProjectsInstancesClustersBackupsResponse = Operation;

export type CopyProjectsInstancesClustersBackupsError = CommonErrors;

export const copyProjectsInstancesClustersBackups: API.OperationMethod<CopyProjectsInstancesClustersBackupsRequest, CopyProjectsInstancesClustersBackupsResponse, CopyProjectsInstancesClustersBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CopyProjectsInstancesClustersBackupsRequest,
  output: CopyProjectsInstancesClustersBackupsResponse,
  errors: [],
}));

/** Updates a pending or completed Cloud Bigtable Backup. */
export interface PatchProjectsInstancesClustersBackupsRequest {
  /** Required. A mask specifying which fields (e.g. `expire_time`) in the Backup resource should be updated. This mask is relative to the Backup resource, not to the request message. The field mask must always be specified; this prevents any future fields from being erased accidentally by clients that do not know about them. */
  updateMask?: string;
  /** A globally unique identifier for the backup which cannot be changed. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}/ backups/_a-zA-Z0-9*` The final segment of the name must be between 1 and 50 characters in length. The backup is stored in the cluster identified by the prefix of the backup name of the form `projects/{project}/instances/{instance}/clusters/{cluster}`. */
  name: string;
  /** Request body */
  body?: Backup;
}

export const PatchProjectsInstancesClustersBackupsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Backup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters/{clustersId}/backups/{backupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsInstancesClustersBackupsRequest>;

export type PatchProjectsInstancesClustersBackupsResponse = Backup;
export const PatchProjectsInstancesClustersBackupsResponse = Backup;

export type PatchProjectsInstancesClustersBackupsError = CommonErrors;

export const patchProjectsInstancesClustersBackups: API.OperationMethod<PatchProjectsInstancesClustersBackupsRequest, PatchProjectsInstancesClustersBackupsResponse, PatchProjectsInstancesClustersBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsInstancesClustersBackupsRequest,
  output: PatchProjectsInstancesClustersBackupsResponse,
  errors: [],
}));

/** Lists Cloud Bigtable backups. Returns both completed and pending backups. */
export interface ListProjectsInstancesClustersBackupsRequest {
  /** A filter expression that filters backups listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The value must be a string, a number, or a boolean. The comparison operator must be <, >, <=, >=, !=, =, or :. Colon ':' represents a HAS operator which is roughly synonymous with equality. Filter rules are case insensitive. The fields eligible for filtering are: * `name` * `source_table` * `state` * `start_time` (and values are of the format YYYY-MM-DDTHH:MM:SSZ) * `end_time` (and values are of the format YYYY-MM-DDTHH:MM:SSZ) * `expire_time` (and values are of the format YYYY-MM-DDTHH:MM:SSZ) * `size_bytes` To filter on multiple expressions, provide each separate expression within parentheses. By default, each expression is an AND expression. However, you can include AND, OR, and NOT expressions explicitly. Some examples of using filters are: * `name:"exact"` --> The backup's name is the string "exact". * `name:howl` --> The backup's name contains the string "howl". * `source_table:prod` --> The source_table's name contains the string "prod". * `state:CREATING` --> The backup is pending creation. * `state:READY` --> The backup is fully created and ready for use. * `(name:howl) AND (start_time < \"2018-03-28T14:50:00Z\")` --> The backup name contains the string "howl" and start_time of the backup is before 2018-03-28T14:50:00Z. * `size_bytes > 10000000000` --> The backup's size is greater than 10GB */
  filter?: string;
  /** Required. The cluster to list backups from. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}`. Use `{cluster} = '-'` to list backups for all clusters in an instance, e.g., `projects/{project}/instances/{instance}/clusters/-`. */
  parent: string;
  /** If non-empty, `page_token` should contain a next_page_token from a previous ListBackupsResponse to the same `parent` and with the same `filter`. */
  pageToken?: string;
  /** Number of backups to be returned in the response. If 0 or less, defaults to the server's maximum allowed page size. */
  pageSize?: number;
  /** An expression for specifying the sort order of the results of the request. The string value should specify one or more fields in Backup. The full syntax is described at https://aip.dev/132#ordering. Fields supported are: * name * source_table * expire_time * start_time * end_time * size_bytes * state For example, "start_time". The default sorting order is ascending. To specify descending order for the field, a suffix " desc" should be appended to the field name. For example, "start_time desc". Redundant space characters in the syntax are insigificant. If order_by is empty, results will be sorted by `start_time` in descending order starting from the most recently created backup. */
  orderBy?: string;
}

export const ListProjectsInstancesClustersBackupsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters/{clustersId}/backups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesClustersBackupsRequest>;

export type ListProjectsInstancesClustersBackupsResponse = ListBackupsResponse;
export const ListProjectsInstancesClustersBackupsResponse = ListBackupsResponse;

export type ListProjectsInstancesClustersBackupsError = CommonErrors;

export const listProjectsInstancesClustersBackups = API.makePaginated(() => ({
  input: ListProjectsInstancesClustersBackupsRequest,
  output: ListProjectsInstancesClustersBackupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the access control policy on a Bigtable resource. Replaces any existing policy. */
export interface SetIamPolicyProjectsInstancesClustersBackupsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsInstancesClustersBackupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters/{clustersId}/backups/{backupsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsInstancesClustersBackupsRequest>;

export type SetIamPolicyProjectsInstancesClustersBackupsResponse = Policy;
export const SetIamPolicyProjectsInstancesClustersBackupsResponse = Policy;

export type SetIamPolicyProjectsInstancesClustersBackupsError = CommonErrors;

export const setIamPolicyProjectsInstancesClustersBackups: API.OperationMethod<SetIamPolicyProjectsInstancesClustersBackupsRequest, SetIamPolicyProjectsInstancesClustersBackupsResponse, SetIamPolicyProjectsInstancesClustersBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsInstancesClustersBackupsRequest,
  output: SetIamPolicyProjectsInstancesClustersBackupsResponse,
  errors: [],
}));

/** Gets the access control policy for a Bigtable resource. Returns an empty policy if the resource exists but does not have a policy set. */
export interface GetIamPolicyProjectsInstancesClustersBackupsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsInstancesClustersBackupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters/{clustersId}/backups/{backupsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsInstancesClustersBackupsRequest>;

export type GetIamPolicyProjectsInstancesClustersBackupsResponse = Policy;
export const GetIamPolicyProjectsInstancesClustersBackupsResponse = Policy;

export type GetIamPolicyProjectsInstancesClustersBackupsError = CommonErrors;

export const getIamPolicyProjectsInstancesClustersBackups: API.OperationMethod<GetIamPolicyProjectsInstancesClustersBackupsRequest, GetIamPolicyProjectsInstancesClustersBackupsResponse, GetIamPolicyProjectsInstancesClustersBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsInstancesClustersBackupsRequest,
  output: GetIamPolicyProjectsInstancesClustersBackupsResponse,
  errors: [],
}));

/** Starts creating a new Cloud Bigtable Backup. The returned backup long-running operation can be used to track creation of the backup. The metadata field type is CreateBackupMetadata. The response field type is Backup, if successful. Cancelling the returned operation will stop the creation and delete the backup. */
export interface CreateProjectsInstancesClustersBackupsRequest {
  /** Required. The id of the backup to be created. The `backup_id` along with the parent `parent` are combined as {parent}/backups/{backup_id} to create the full backup name, of the form: `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup_id}`. This string must be between 1 and 50 characters in length and match the regex _a-zA-Z0-9*. */
  backupId?: string;
  /** Required. This must be one of the clusters in the instance in which this table is located. The backup will be stored in this cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}`. */
  parent: string;
  /** Request body */
  body?: Backup;
}

export const CreateProjectsInstancesClustersBackupsRequest = Schema.Struct({
  backupId: Schema.optional(Schema.String).pipe(T.HttpQuery("backupId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Backup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters/{clustersId}/backups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstancesClustersBackupsRequest>;

export type CreateProjectsInstancesClustersBackupsResponse = Operation;
export const CreateProjectsInstancesClustersBackupsResponse = Operation;

export type CreateProjectsInstancesClustersBackupsError = CommonErrors;

export const createProjectsInstancesClustersBackups: API.OperationMethod<CreateProjectsInstancesClustersBackupsRequest, CreateProjectsInstancesClustersBackupsResponse, CreateProjectsInstancesClustersBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstancesClustersBackupsRequest,
  output: CreateProjectsInstancesClustersBackupsResponse,
  errors: [],
}));

/** Returns permissions that the caller has on the specified Bigtable resource. */
export interface TestIamPermissionsProjectsInstancesClustersBackupsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsInstancesClustersBackupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters/{clustersId}/backups/{backupsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsInstancesClustersBackupsRequest>;

export type TestIamPermissionsProjectsInstancesClustersBackupsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsInstancesClustersBackupsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsInstancesClustersBackupsError = CommonErrors;

export const testIamPermissionsProjectsInstancesClustersBackups: API.OperationMethod<TestIamPermissionsProjectsInstancesClustersBackupsRequest, TestIamPermissionsProjectsInstancesClustersBackupsResponse, TestIamPermissionsProjectsInstancesClustersBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsInstancesClustersBackupsRequest,
  output: TestIamPermissionsProjectsInstancesClustersBackupsResponse,
  errors: [],
}));

/** Gets metadata on a pending or completed Cloud Bigtable Backup. */
export interface GetProjectsInstancesClustersBackupsRequest {
  /** Required. Name of the backup. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup}`. */
  name: string;
}

export const GetProjectsInstancesClustersBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters/{clustersId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesClustersBackupsRequest>;

export type GetProjectsInstancesClustersBackupsResponse = Backup;
export const GetProjectsInstancesClustersBackupsResponse = Backup;

export type GetProjectsInstancesClustersBackupsError = CommonErrors;

export const getProjectsInstancesClustersBackups: API.OperationMethod<GetProjectsInstancesClustersBackupsRequest, GetProjectsInstancesClustersBackupsResponse, GetProjectsInstancesClustersBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesClustersBackupsRequest,
  output: GetProjectsInstancesClustersBackupsResponse,
  errors: [],
}));

/** Deletes a pending or completed Cloud Bigtable backup. */
export interface DeleteProjectsInstancesClustersBackupsRequest {
  /** Required. Name of the backup to delete. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup}`. */
  name: string;
}

export const DeleteProjectsInstancesClustersBackupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/instances/{instancesId}/clusters/{clustersId}/backups/{backupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesClustersBackupsRequest>;

export type DeleteProjectsInstancesClustersBackupsResponse = Empty;
export const DeleteProjectsInstancesClustersBackupsResponse = Empty;

export type DeleteProjectsInstancesClustersBackupsError = CommonErrors;

export const deleteProjectsInstancesClustersBackups: API.OperationMethod<DeleteProjectsInstancesClustersBackupsRequest, DeleteProjectsInstancesClustersBackupsResponse, DeleteProjectsInstancesClustersBackupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesClustersBackupsRequest,
  output: DeleteProjectsInstancesClustersBackupsResponse,
  errors: [],
}));

/** Gets information about an app profile. */
export interface GetProjectsInstancesAppProfilesRequest {
  /** Required. The unique name of the requested app profile. Values are of the form `projects/{project}/instances/{instance}/appProfiles/{app_profile}`. */
  name: string;
}

export const GetProjectsInstancesAppProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/appProfiles/{appProfilesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesAppProfilesRequest>;

export type GetProjectsInstancesAppProfilesResponse = AppProfile;
export const GetProjectsInstancesAppProfilesResponse = AppProfile;

export type GetProjectsInstancesAppProfilesError = CommonErrors;

export const getProjectsInstancesAppProfiles: API.OperationMethod<GetProjectsInstancesAppProfilesRequest, GetProjectsInstancesAppProfilesResponse, GetProjectsInstancesAppProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesAppProfilesRequest,
  output: GetProjectsInstancesAppProfilesResponse,
  errors: [],
}));

/** Lists information about app profiles in an instance. */
export interface ListProjectsInstancesAppProfilesRequest {
  /** Required. The unique name of the instance for which a list of app profiles is requested. Values are of the form `projects/{project}/instances/{instance}`. Use `{instance} = '-'` to list AppProfiles for all Instances in a project, e.g., `projects/myproject/instances/-`. */
  parent: string;
  /** The value of `next_page_token` returned by a previous call. */
  pageToken?: string;
  /** Maximum number of results per page. A page_size of zero lets the server choose the number of items to return. A page_size which is strictly positive will return at most that many items. A negative page_size will cause an error. Following the first request, subsequent paginated calls are not required to pass a page_size. If a page_size is set in subsequent calls, it must match the page_size given in the first request. */
  pageSize?: number;
}

export const ListProjectsInstancesAppProfilesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/appProfiles" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesAppProfilesRequest>;

export type ListProjectsInstancesAppProfilesResponse = ListAppProfilesResponse;
export const ListProjectsInstancesAppProfilesResponse = ListAppProfilesResponse;

export type ListProjectsInstancesAppProfilesError = CommonErrors;

export const listProjectsInstancesAppProfiles = API.makePaginated(() => ({
  input: ListProjectsInstancesAppProfilesRequest,
  output: ListProjectsInstancesAppProfilesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates an app profile within an instance. */
export interface CreateProjectsInstancesAppProfilesRequest {
  /** Required. The ID to be used when referring to the new app profile within its instance, e.g., just `myprofile` rather than `projects/myproject/instances/myinstance/appProfiles/myprofile`. */
  appProfileId?: string;
  /** If true, ignore safety checks when creating the app profile. */
  ignoreWarnings?: boolean;
  /** Required. The unique name of the instance in which to create the new app profile. Values are of the form `projects/{project}/instances/{instance}`. */
  parent: string;
  /** Request body */
  body?: AppProfile;
}

export const CreateProjectsInstancesAppProfilesRequest = Schema.Struct({
  appProfileId: Schema.optional(Schema.String).pipe(T.HttpQuery("appProfileId")),
  ignoreWarnings: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreWarnings")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(AppProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/appProfiles", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstancesAppProfilesRequest>;

export type CreateProjectsInstancesAppProfilesResponse = AppProfile;
export const CreateProjectsInstancesAppProfilesResponse = AppProfile;

export type CreateProjectsInstancesAppProfilesError = CommonErrors;

export const createProjectsInstancesAppProfiles: API.OperationMethod<CreateProjectsInstancesAppProfilesRequest, CreateProjectsInstancesAppProfilesResponse, CreateProjectsInstancesAppProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstancesAppProfilesRequest,
  output: CreateProjectsInstancesAppProfilesResponse,
  errors: [],
}));

/** Updates an app profile within an instance. */
export interface PatchProjectsInstancesAppProfilesRequest {
  /** The unique name of the app profile, up to 50 characters long. Values are of the form `projects/{project}/instances/{instance}/appProfiles/_a-zA-Z0-9*`. */
  name: string;
  /** If true, ignore safety checks when updating the app profile. */
  ignoreWarnings?: boolean;
  /** Required. The subset of app profile fields which should be replaced. If unset, all fields will be replaced. */
  updateMask?: string;
  /** Request body */
  body?: AppProfile;
}

export const PatchProjectsInstancesAppProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  ignoreWarnings: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreWarnings")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AppProfile).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/instances/{instancesId}/appProfiles/{appProfilesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsInstancesAppProfilesRequest>;

export type PatchProjectsInstancesAppProfilesResponse = Operation;
export const PatchProjectsInstancesAppProfilesResponse = Operation;

export type PatchProjectsInstancesAppProfilesError = CommonErrors;

export const patchProjectsInstancesAppProfiles: API.OperationMethod<PatchProjectsInstancesAppProfilesRequest, PatchProjectsInstancesAppProfilesResponse, PatchProjectsInstancesAppProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsInstancesAppProfilesRequest,
  output: PatchProjectsInstancesAppProfilesResponse,
  errors: [],
}));

/** Deletes an app profile from an instance. */
export interface DeleteProjectsInstancesAppProfilesRequest {
  /** Required. The unique name of the app profile to be deleted. Values are of the form `projects/{project}/instances/{instance}/appProfiles/{app_profile}`. */
  name: string;
  /** Required. If true, ignore safety checks when deleting the app profile. */
  ignoreWarnings?: boolean;
}

export const DeleteProjectsInstancesAppProfilesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  ignoreWarnings: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("ignoreWarnings")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/instances/{instancesId}/appProfiles/{appProfilesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesAppProfilesRequest>;

export type DeleteProjectsInstancesAppProfilesResponse = Empty;
export const DeleteProjectsInstancesAppProfilesResponse = Empty;

export type DeleteProjectsInstancesAppProfilesError = CommonErrors;

export const deleteProjectsInstancesAppProfiles: API.OperationMethod<DeleteProjectsInstancesAppProfilesRequest, DeleteProjectsInstancesAppProfilesResponse, DeleteProjectsInstancesAppProfilesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesAppProfilesRequest,
  output: DeleteProjectsInstancesAppProfilesResponse,
  errors: [],
}));

/** Gets the access control policy for an instance resource. Returns an empty policy if an instance exists but does not have a policy set. */
export interface GetIamPolicyProjectsInstancesLogicalViewsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsInstancesLogicalViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/logicalViews/{logicalViewsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsInstancesLogicalViewsRequest>;

export type GetIamPolicyProjectsInstancesLogicalViewsResponse = Policy;
export const GetIamPolicyProjectsInstancesLogicalViewsResponse = Policy;

export type GetIamPolicyProjectsInstancesLogicalViewsError = CommonErrors;

export const getIamPolicyProjectsInstancesLogicalViews: API.OperationMethod<GetIamPolicyProjectsInstancesLogicalViewsRequest, GetIamPolicyProjectsInstancesLogicalViewsResponse, GetIamPolicyProjectsInstancesLogicalViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsInstancesLogicalViewsRequest,
  output: GetIamPolicyProjectsInstancesLogicalViewsResponse,
  errors: [],
}));

/** Deletes a logical view from an instance. */
export interface DeleteProjectsInstancesLogicalViewsRequest {
  /** Optional. The current etag of the logical view. If an etag is provided and does not match the current etag of the logical view, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Required. The unique name of the logical view to be deleted. Format: `projects/{project}/instances/{instance}/logicalViews/{logical_view}`. */
  name: string;
}

export const DeleteProjectsInstancesLogicalViewsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/instances/{instancesId}/logicalViews/{logicalViewsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesLogicalViewsRequest>;

export type DeleteProjectsInstancesLogicalViewsResponse = Empty;
export const DeleteProjectsInstancesLogicalViewsResponse = Empty;

export type DeleteProjectsInstancesLogicalViewsError = CommonErrors;

export const deleteProjectsInstancesLogicalViews: API.OperationMethod<DeleteProjectsInstancesLogicalViewsRequest, DeleteProjectsInstancesLogicalViewsResponse, DeleteProjectsInstancesLogicalViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesLogicalViewsRequest,
  output: DeleteProjectsInstancesLogicalViewsResponse,
  errors: [],
}));

/** Returns permissions that the caller has on the specified instance resource. */
export interface TestIamPermissionsProjectsInstancesLogicalViewsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsInstancesLogicalViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/logicalViews/{logicalViewsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsInstancesLogicalViewsRequest>;

export type TestIamPermissionsProjectsInstancesLogicalViewsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsInstancesLogicalViewsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsInstancesLogicalViewsError = CommonErrors;

export const testIamPermissionsProjectsInstancesLogicalViews: API.OperationMethod<TestIamPermissionsProjectsInstancesLogicalViewsRequest, TestIamPermissionsProjectsInstancesLogicalViewsResponse, TestIamPermissionsProjectsInstancesLogicalViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsInstancesLogicalViewsRequest,
  output: TestIamPermissionsProjectsInstancesLogicalViewsResponse,
  errors: [],
}));

/** Updates a logical view within an instance. */
export interface PatchProjectsInstancesLogicalViewsRequest {
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Identifier. The unique name of the logical view. Format: `projects/{project}/instances/{instance}/logicalViews/{logical_view}` */
  name: string;
  /** Request body */
  body?: LogicalView;
}

export const PatchProjectsInstancesLogicalViewsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(LogicalView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/instances/{instancesId}/logicalViews/{logicalViewsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsInstancesLogicalViewsRequest>;

export type PatchProjectsInstancesLogicalViewsResponse = Operation;
export const PatchProjectsInstancesLogicalViewsResponse = Operation;

export type PatchProjectsInstancesLogicalViewsError = CommonErrors;

export const patchProjectsInstancesLogicalViews: API.OperationMethod<PatchProjectsInstancesLogicalViewsRequest, PatchProjectsInstancesLogicalViewsResponse, PatchProjectsInstancesLogicalViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsInstancesLogicalViewsRequest,
  output: PatchProjectsInstancesLogicalViewsResponse,
  errors: [],
}));

/** Lists information about logical views in an instance. */
export interface ListProjectsInstancesLogicalViewsRequest {
  /** Optional. The maximum number of logical views to return. The service may return fewer than this value */
  pageSize?: number;
  /** Required. The unique name of the instance for which the list of logical views is requested. Values are of the form `projects/{project}/instances/{instance}`. */
  parent: string;
  /** Optional. A page token, received from a previous `ListLogicalViews` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListLogicalViews` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsInstancesLogicalViewsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/logicalViews" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesLogicalViewsRequest>;

export type ListProjectsInstancesLogicalViewsResponse = ListLogicalViewsResponse;
export const ListProjectsInstancesLogicalViewsResponse = ListLogicalViewsResponse;

export type ListProjectsInstancesLogicalViewsError = CommonErrors;

export const listProjectsInstancesLogicalViews = API.makePaginated(() => ({
  input: ListProjectsInstancesLogicalViewsRequest,
  output: ListProjectsInstancesLogicalViewsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the access control policy on an instance resource. Replaces any existing policy. */
export interface SetIamPolicyProjectsInstancesLogicalViewsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsInstancesLogicalViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/logicalViews/{logicalViewsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsInstancesLogicalViewsRequest>;

export type SetIamPolicyProjectsInstancesLogicalViewsResponse = Policy;
export const SetIamPolicyProjectsInstancesLogicalViewsResponse = Policy;

export type SetIamPolicyProjectsInstancesLogicalViewsError = CommonErrors;

export const setIamPolicyProjectsInstancesLogicalViews: API.OperationMethod<SetIamPolicyProjectsInstancesLogicalViewsRequest, SetIamPolicyProjectsInstancesLogicalViewsResponse, SetIamPolicyProjectsInstancesLogicalViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsInstancesLogicalViewsRequest,
  output: SetIamPolicyProjectsInstancesLogicalViewsResponse,
  errors: [],
}));

/** Gets information about a logical view. */
export interface GetProjectsInstancesLogicalViewsRequest {
  /** Required. The unique name of the requested logical view. Values are of the form `projects/{project}/instances/{instance}/logicalViews/{logical_view}`. */
  name: string;
}

export const GetProjectsInstancesLogicalViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/logicalViews/{logicalViewsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesLogicalViewsRequest>;

export type GetProjectsInstancesLogicalViewsResponse = LogicalView;
export const GetProjectsInstancesLogicalViewsResponse = LogicalView;

export type GetProjectsInstancesLogicalViewsError = CommonErrors;

export const getProjectsInstancesLogicalViews: API.OperationMethod<GetProjectsInstancesLogicalViewsRequest, GetProjectsInstancesLogicalViewsResponse, GetProjectsInstancesLogicalViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesLogicalViewsRequest,
  output: GetProjectsInstancesLogicalViewsResponse,
  errors: [],
}));

/** Creates a logical view within an instance. */
export interface CreateProjectsInstancesLogicalViewsRequest {
  /** Required. The parent instance where this logical view will be created. Format: `projects/{project}/instances/{instance}`. */
  parent: string;
  /** Required. The ID to use for the logical view, which will become the final component of the logical view's resource name. */
  logicalViewId?: string;
  /** Request body */
  body?: LogicalView;
}

export const CreateProjectsInstancesLogicalViewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  logicalViewId: Schema.optional(Schema.String).pipe(T.HttpQuery("logicalViewId")),
  body: Schema.optional(LogicalView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/logicalViews", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstancesLogicalViewsRequest>;

export type CreateProjectsInstancesLogicalViewsResponse = Operation;
export const CreateProjectsInstancesLogicalViewsResponse = Operation;

export type CreateProjectsInstancesLogicalViewsError = CommonErrors;

export const createProjectsInstancesLogicalViews: API.OperationMethod<CreateProjectsInstancesLogicalViewsRequest, CreateProjectsInstancesLogicalViewsResponse, CreateProjectsInstancesLogicalViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstancesLogicalViewsRequest,
  output: CreateProjectsInstancesLogicalViewsResponse,
  errors: [],
}));

/** Deletes a materialized view from an instance. */
export interface DeleteProjectsInstancesMaterializedViewsRequest {
  /** Required. The unique name of the materialized view to be deleted. Format: `projects/{project}/instances/{instance}/materializedViews/{materialized_view}`. */
  name: string;
  /** Optional. The current etag of the materialized view. If an etag is provided and does not match the current etag of the materialized view, deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
}

export const DeleteProjectsInstancesMaterializedViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/instances/{instancesId}/materializedViews/{materializedViewsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsInstancesMaterializedViewsRequest>;

export type DeleteProjectsInstancesMaterializedViewsResponse = Empty;
export const DeleteProjectsInstancesMaterializedViewsResponse = Empty;

export type DeleteProjectsInstancesMaterializedViewsError = CommonErrors;

export const deleteProjectsInstancesMaterializedViews: API.OperationMethod<DeleteProjectsInstancesMaterializedViewsRequest, DeleteProjectsInstancesMaterializedViewsResponse, DeleteProjectsInstancesMaterializedViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsInstancesMaterializedViewsRequest,
  output: DeleteProjectsInstancesMaterializedViewsResponse,
  errors: [],
}));

/** Gets information about a materialized view. */
export interface GetProjectsInstancesMaterializedViewsRequest {
  /** Optional. Describes which of the materialized view's fields should be populated in the response. Defaults to SCHEMA_VIEW. */
  view?: "VIEW_UNSPECIFIED" | "SCHEMA_VIEW" | "REPLICATION_VIEW" | "FULL" | (string & {});
  /** Required. The unique name of the requested materialized view. Values are of the form `projects/{project}/instances/{instance}/materializedViews/{materialized_view}`. */
  name: string;
}

export const GetProjectsInstancesMaterializedViewsRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/materializedViews/{materializedViewsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsInstancesMaterializedViewsRequest>;

export type GetProjectsInstancesMaterializedViewsResponse = MaterializedView;
export const GetProjectsInstancesMaterializedViewsResponse = MaterializedView;

export type GetProjectsInstancesMaterializedViewsError = CommonErrors;

export const getProjectsInstancesMaterializedViews: API.OperationMethod<GetProjectsInstancesMaterializedViewsRequest, GetProjectsInstancesMaterializedViewsResponse, GetProjectsInstancesMaterializedViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsInstancesMaterializedViewsRequest,
  output: GetProjectsInstancesMaterializedViewsResponse,
  errors: [],
}));

/** Returns permissions that the caller has on the specified instance resource. */
export interface TestIamPermissionsProjectsInstancesMaterializedViewsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsInstancesMaterializedViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/materializedViews/{materializedViewsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsInstancesMaterializedViewsRequest>;

export type TestIamPermissionsProjectsInstancesMaterializedViewsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsInstancesMaterializedViewsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsInstancesMaterializedViewsError = CommonErrors;

export const testIamPermissionsProjectsInstancesMaterializedViews: API.OperationMethod<TestIamPermissionsProjectsInstancesMaterializedViewsRequest, TestIamPermissionsProjectsInstancesMaterializedViewsResponse, TestIamPermissionsProjectsInstancesMaterializedViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsInstancesMaterializedViewsRequest,
  output: TestIamPermissionsProjectsInstancesMaterializedViewsResponse,
  errors: [],
}));

/** Sets the access control policy on an instance resource. Replaces any existing policy. */
export interface SetIamPolicyProjectsInstancesMaterializedViewsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsInstancesMaterializedViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/materializedViews/{materializedViewsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsInstancesMaterializedViewsRequest>;

export type SetIamPolicyProjectsInstancesMaterializedViewsResponse = Policy;
export const SetIamPolicyProjectsInstancesMaterializedViewsResponse = Policy;

export type SetIamPolicyProjectsInstancesMaterializedViewsError = CommonErrors;

export const setIamPolicyProjectsInstancesMaterializedViews: API.OperationMethod<SetIamPolicyProjectsInstancesMaterializedViewsRequest, SetIamPolicyProjectsInstancesMaterializedViewsResponse, SetIamPolicyProjectsInstancesMaterializedViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsInstancesMaterializedViewsRequest,
  output: SetIamPolicyProjectsInstancesMaterializedViewsResponse,
  errors: [],
}));

/** Lists information about materialized views in an instance. */
export interface ListProjectsInstancesMaterializedViewsRequest {
  /** Optional. The maximum number of materialized views to return. The service may return fewer than this value */
  pageSize?: number;
  /** Optional. Describes which of the materialized view's fields should be populated in the response. For now, only the default value SCHEMA_VIEW is supported. */
  view?: "VIEW_UNSPECIFIED" | "SCHEMA_VIEW" | "REPLICATION_VIEW" | "FULL" | (string & {});
  /** Optional. A page token, received from a previous `ListMaterializedViews` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMaterializedViews` must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The unique name of the instance for which the list of materialized views is requested. Values are of the form `projects/{project}/instances/{instance}`. */
  parent: string;
}

export const ListProjectsInstancesMaterializedViewsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/instances/{instancesId}/materializedViews" }),
  svc,
) as unknown as Schema.Schema<ListProjectsInstancesMaterializedViewsRequest>;

export type ListProjectsInstancesMaterializedViewsResponse = ListMaterializedViewsResponse;
export const ListProjectsInstancesMaterializedViewsResponse = ListMaterializedViewsResponse;

export type ListProjectsInstancesMaterializedViewsError = CommonErrors;

export const listProjectsInstancesMaterializedViews = API.makePaginated(() => ({
  input: ListProjectsInstancesMaterializedViewsRequest,
  output: ListProjectsInstancesMaterializedViewsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a materialized view within an instance. */
export interface CreateProjectsInstancesMaterializedViewsRequest {
  /** Required. The parent instance where this materialized view will be created. Format: `projects/{project}/instances/{instance}`. */
  parent: string;
  /** Required. The ID to use for the materialized view, which will become the final component of the materialized view's resource name. */
  materializedViewId?: string;
  /** Request body */
  body?: MaterializedView;
}

export const CreateProjectsInstancesMaterializedViewsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  materializedViewId: Schema.optional(Schema.String).pipe(T.HttpQuery("materializedViewId")),
  body: Schema.optional(MaterializedView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/materializedViews", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsInstancesMaterializedViewsRequest>;

export type CreateProjectsInstancesMaterializedViewsResponse = Operation;
export const CreateProjectsInstancesMaterializedViewsResponse = Operation;

export type CreateProjectsInstancesMaterializedViewsError = CommonErrors;

export const createProjectsInstancesMaterializedViews: API.OperationMethod<CreateProjectsInstancesMaterializedViewsRequest, CreateProjectsInstancesMaterializedViewsResponse, CreateProjectsInstancesMaterializedViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsInstancesMaterializedViewsRequest,
  output: CreateProjectsInstancesMaterializedViewsResponse,
  errors: [],
}));

/** Gets the access control policy for an instance resource. Returns an empty policy if an instance exists but does not have a policy set. */
export interface GetIamPolicyProjectsInstancesMaterializedViewsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsInstancesMaterializedViewsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/instances/{instancesId}/materializedViews/{materializedViewsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsInstancesMaterializedViewsRequest>;

export type GetIamPolicyProjectsInstancesMaterializedViewsResponse = Policy;
export const GetIamPolicyProjectsInstancesMaterializedViewsResponse = Policy;

export type GetIamPolicyProjectsInstancesMaterializedViewsError = CommonErrors;

export const getIamPolicyProjectsInstancesMaterializedViews: API.OperationMethod<GetIamPolicyProjectsInstancesMaterializedViewsRequest, GetIamPolicyProjectsInstancesMaterializedViewsResponse, GetIamPolicyProjectsInstancesMaterializedViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsInstancesMaterializedViewsRequest,
  output: GetIamPolicyProjectsInstancesMaterializedViewsResponse,
  errors: [],
}));

/** Updates a materialized view within an instance. */
export interface PatchProjectsInstancesMaterializedViewsRequest {
  /** Identifier. The unique name of the materialized view. Format: `projects/{project}/instances/{instance}/materializedViews/{materialized_view}` Views: `SCHEMA_VIEW`, `REPLICATION_VIEW`, `FULL`. */
  name: string;
  /** Optional. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: MaterializedView;
}

export const PatchProjectsInstancesMaterializedViewsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(MaterializedView).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/instances/{instancesId}/materializedViews/{materializedViewsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsInstancesMaterializedViewsRequest>;

export type PatchProjectsInstancesMaterializedViewsResponse = Operation;
export const PatchProjectsInstancesMaterializedViewsResponse = Operation;

export type PatchProjectsInstancesMaterializedViewsError = CommonErrors;

export const patchProjectsInstancesMaterializedViews: API.OperationMethod<PatchProjectsInstancesMaterializedViewsRequest, PatchProjectsInstancesMaterializedViewsResponse, PatchProjectsInstancesMaterializedViewsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsInstancesMaterializedViewsRequest,
  output: PatchProjectsInstancesMaterializedViewsResponse,
  errors: [],
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
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

