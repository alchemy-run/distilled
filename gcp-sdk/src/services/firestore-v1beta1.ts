// ==========================================================================
// Cloud Firestore API (firestore v1beta1)
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
  name: "firestore",
  version: "v1beta1",
  rootUrl: "https://firestore.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleFirestoreAdminV1beta1IndexField {
  /** The path of the field. Must match the field path specification described by google.firestore.v1beta1.Document.fields. Special field path `__name__` may be used by itself or at the end of a path. `__type__` may be used only at the end of path. */
  fieldPath?: string;
  /** The field's mode. */
  mode?:
    | "MODE_UNSPECIFIED"
    | "ASCENDING"
    | "DESCENDING"
    | "ARRAY_CONTAINS"
    | (string & {});
}

export const GoogleFirestoreAdminV1beta1IndexField: Schema.Schema<GoogleFirestoreAdminV1beta1IndexField> =
  Schema.suspend(() =>
    Schema.Struct({
      fieldPath: Schema.optional(Schema.String),
      mode: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta1IndexField",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta1IndexField>;

export interface GoogleFirestoreAdminV1beta1Index {
  /** The resource name of the index. Output only. */
  name?: string;
  /** The collection ID to which this index applies. Required. */
  collectionId?: string;
  /** The fields to index. */
  fields?: Array<GoogleFirestoreAdminV1beta1IndexField>;
  /** The state of the index. Output only. */
  state?: "STATE_UNSPECIFIED" | "CREATING" | "READY" | "ERROR" | (string & {});
}

export const GoogleFirestoreAdminV1beta1Index: Schema.Schema<GoogleFirestoreAdminV1beta1Index> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      collectionId: Schema.optional(Schema.String),
      fields: Schema.optional(
        Schema.Array(GoogleFirestoreAdminV1beta1IndexField),
      ),
      state: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta1Index",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta1Index>;

export interface Status {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface GoogleLongrunningOperation {
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

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
      done: Schema.optional(Schema.Boolean),
      error: Schema.optional(Status),
      response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
  ).annotate({
    identifier: "GoogleLongrunningOperation",
  }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleFirestoreAdminV1beta1ListIndexesResponse {
  /** The indexes. */
  indexes?: Array<GoogleFirestoreAdminV1beta1Index>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const GoogleFirestoreAdminV1beta1ListIndexesResponse: Schema.Schema<GoogleFirestoreAdminV1beta1ListIndexesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      indexes: Schema.optional(Schema.Array(GoogleFirestoreAdminV1beta1Index)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta1ListIndexesResponse",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta1ListIndexesResponse>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface GoogleFirestoreAdminV1beta1ExportDocumentsRequest {
  /** Which collection ids to export. Unspecified means all collections. */
  collectionIds?: Array<string>;
  /** The output URI. Currently only supports Google Cloud Storage URIs of the form: `gs://BUCKET_NAME[/NAMESPACE_PATH]`, where `BUCKET_NAME` is the name of the Google Cloud Storage bucket and `NAMESPACE_PATH` is an optional Google Cloud Storage namespace path. When choosing a name, be sure to consider Google Cloud Storage naming guidelines: https://cloud.google.com/storage/docs/naming. If the URI is a bucket (without a namespace path), a prefix will be generated based on the start time. */
  outputUriPrefix?: string;
}

export const GoogleFirestoreAdminV1beta1ExportDocumentsRequest: Schema.Schema<GoogleFirestoreAdminV1beta1ExportDocumentsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      collectionIds: Schema.optional(Schema.Array(Schema.String)),
      outputUriPrefix: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta1ExportDocumentsRequest",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta1ExportDocumentsRequest>;

export interface GoogleFirestoreAdminV1beta1ImportDocumentsRequest {
  /** Which collection ids to import. Unspecified means all collections included in the import. */
  collectionIds?: Array<string>;
  /** Location of the exported files. This must match the output_uri_prefix of an ExportDocumentsResponse from an export that has completed successfully. See: google.firestore.admin.v1beta1.ExportDocumentsResponse.output_uri_prefix. */
  inputUriPrefix?: string;
}

export const GoogleFirestoreAdminV1beta1ImportDocumentsRequest: Schema.Schema<GoogleFirestoreAdminV1beta1ImportDocumentsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      collectionIds: Schema.optional(Schema.Array(Schema.String)),
      inputUriPrefix: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta1ImportDocumentsRequest",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta1ImportDocumentsRequest>;

export interface LatLng {
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  latitude?: number;
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  longitude?: number;
}

export const LatLng: Schema.Schema<LatLng> = Schema.suspend(() =>
  Schema.Struct({
    latitude: Schema.optional(Schema.Number),
    longitude: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "LatLng" }) as any as Schema.Schema<LatLng>;

export interface ArrayValue {
  /** Values in the array. */
  values?: Array<Value>;
}

export const ArrayValue: Schema.Schema<ArrayValue> = Schema.suspend(() =>
  Schema.Struct({
    values: Schema.optional(Schema.Array(Value)),
  }),
).annotate({ identifier: "ArrayValue" }) as any as Schema.Schema<ArrayValue>;

export interface MapValue {
  /** The map's fields. The map keys represent field names. Field names matching the regular expression `__.*__` are reserved. Reserved field names are forbidden except in certain documented contexts. The map keys, represented as UTF-8, must not exceed 1,500 bytes and cannot be empty. */
  fields?: Record<string, Value>;
}

export const MapValue: Schema.Schema<MapValue> = Schema.suspend(() =>
  Schema.Struct({
    fields: Schema.optional(Schema.Record(Schema.String, Value)),
  }),
).annotate({ identifier: "MapValue" }) as any as Schema.Schema<MapValue>;

export interface Firestore_Function {
  /** Required. The name of the function to evaluate. **Requires:** * must be in snake case (lower case with underscore separator). */
  name?: string;
  /** Optional. Ordered list of arguments the given function expects. */
  args?: Array<Value>;
  /** Optional. Optional named arguments that certain functions may support. */
  options?: Record<string, Value>;
}

export const Firestore_Function: Schema.Schema<Firestore_Function> =
  Schema.suspend(() =>
    Schema.Struct({
      name: Schema.optional(Schema.String),
      args: Schema.optional(Schema.Array(Value)),
      options: Schema.optional(Schema.Record(Schema.String, Value)),
    }),
  ).annotate({
    identifier: "Firestore_Function",
  }) as any as Schema.Schema<Firestore_Function>;

export interface Stage {
  /** Required. The name of the stage to evaluate. **Requires:** * must be in snake case (lower case with underscore separator). */
  name?: string;
  /** Optional. Ordered list of arguments the given stage expects. */
  args?: Array<Value>;
  /** Optional. Optional named arguments that certain functions may support. */
  options?: Record<string, Value>;
}

export const Stage: Schema.Schema<Stage> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    args: Schema.optional(Schema.Array(Value)),
    options: Schema.optional(Schema.Record(Schema.String, Value)),
  }),
).annotate({ identifier: "Stage" }) as any as Schema.Schema<Stage>;

export interface Pipeline {
  /** Required. Ordered list of stages to evaluate. */
  stages?: Array<Stage>;
}

export const Pipeline: Schema.Schema<Pipeline> = Schema.suspend(() =>
  Schema.Struct({
    stages: Schema.optional(Schema.Array(Stage)),
  }),
).annotate({ identifier: "Pipeline" }) as any as Schema.Schema<Pipeline>;

export interface Value {
  /** A null value. */
  nullValue?: "NULL_VALUE" | (string & {});
  /** A boolean value. */
  booleanValue?: boolean;
  /** An integer value. */
  integerValue?: string;
  /** A double value. */
  doubleValue?: number;
  /** A timestamp value. Precise only to microseconds. When stored, any additional precision is rounded down. */
  timestampValue?: string;
  /** A string value. The string, represented as UTF-8, must not exceed 1 MiB - 89 bytes. Only the first 1,500 bytes of the UTF-8 representation are considered by queries. */
  stringValue?: string;
  /** A bytes value. Must not exceed 1 MiB - 89 bytes. Only the first 1,500 bytes are considered by queries. */
  bytesValue?: string;
  /** A reference to a document. For example: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. */
  referenceValue?: string;
  /** A geo point value representing a point on the surface of Earth. */
  geoPointValue?: LatLng;
  /** An array value. Cannot directly contain another array value, though can contain a map which contains another array. */
  arrayValue?: ArrayValue;
  /** A map value. */
  mapValue?: MapValue;
  /** Value which references a field. This is considered relative (vs absolute) since it only refers to a field and not a field within a particular document. **Requires:** * Must follow field reference limitations. * Not allowed to be used when writing documents. */
  fieldReferenceValue?: string;
  /** A value that represents an unevaluated expression. **Requires:** * Not allowed to be used when writing documents. */
  functionValue?: Firestore_Function;
  /** A value that represents an unevaluated pipeline. **Requires:** * Not allowed to be used when writing documents. */
  pipelineValue?: Pipeline;
}

export const Value: Schema.Schema<Value> = Schema.suspend(() =>
  Schema.Struct({
    nullValue: Schema.optional(Schema.String),
    booleanValue: Schema.optional(Schema.Boolean),
    integerValue: Schema.optional(Schema.String),
    doubleValue: Schema.optional(Schema.Number),
    timestampValue: Schema.optional(Schema.String),
    stringValue: Schema.optional(Schema.String),
    bytesValue: Schema.optional(Schema.String),
    referenceValue: Schema.optional(Schema.String),
    geoPointValue: Schema.optional(LatLng),
    arrayValue: Schema.optional(ArrayValue),
    mapValue: Schema.optional(MapValue),
    fieldReferenceValue: Schema.optional(Schema.String),
    functionValue: Schema.optional(Firestore_Function),
    pipelineValue: Schema.optional(Pipeline),
  }),
).annotate({ identifier: "Value" }) as any as Schema.Schema<Value>;

export interface Document {
  /** The resource name of the document, for example `projects/{project_id}/databases/{database_id}/documents/{document_path}`. */
  name?: string;
  /** The document's fields. The map keys represent field names. Field names matching the regular expression `__.*__` are reserved. Reserved field names are forbidden except in certain documented contexts. The field names, represented as UTF-8, must not exceed 1,500 bytes and cannot be empty. Field paths may be used in other contexts to refer to structured fields defined here. For `map_value`, the field path is represented by a dot-delimited (`.`) string of segments. Each segment is either a simple field name (defined below) or a quoted field name. For example, the structured field `"foo" : { map_value: { "x&y" : { string_value: "hello" }}}` would be represented by the field path `` foo.`x&y` ``. A simple field name contains only characters `a` to `z`, `A` to `Z`, `0` to `9`, or `_`, and must not start with `0` to `9`. For example, `foo_bar_17`. A quoted field name starts and ends with `` ` `` and may contain any character. Some characters, including `` ` ``, must be escaped using a `\`. For example, `` `x&y` `` represents `x&y` and `` `bak\`tik` `` represents `` bak`tik ``. */
  fields?: Record<string, Value>;
  /** Output only. The time at which the document was created. This value increases monotonically when a document is deleted then recreated. It can also be compared to values from other documents and the `read_time` of a query. */
  createTime?: string;
  /** Output only. The time at which the document was last changed. This value is initially set to the `create_time` then increases monotonically with each change to the document. It can also be compared to values from other documents and the `read_time` of a query. */
  updateTime?: string;
}

export const Document: Schema.Schema<Document> = Schema.suspend(() =>
  Schema.Struct({
    name: Schema.optional(Schema.String),
    fields: Schema.optional(Schema.Record(Schema.String, Value)),
    createTime: Schema.optional(Schema.String),
    updateTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Document" }) as any as Schema.Schema<Document>;

export interface ListDocumentsResponse {
  /** The Documents found. */
  documents?: Array<Document>;
  /** A token to retrieve the next page of documents. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListDocumentsResponse: Schema.Schema<ListDocumentsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      documents: Schema.optional(Schema.Array(Document)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListDocumentsResponse",
  }) as any as Schema.Schema<ListDocumentsResponse>;

export interface DocumentMask {
  /** The list of field paths in the mask. See Document.fields for a field path syntax reference. */
  fieldPaths?: Array<string>;
}

export const DocumentMask: Schema.Schema<DocumentMask> = Schema.suspend(() =>
  Schema.Struct({
    fieldPaths: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({
  identifier: "DocumentMask",
}) as any as Schema.Schema<DocumentMask>;

export interface ReadOnly {
  /** Reads documents at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
}

export const ReadOnly: Schema.Schema<ReadOnly> = Schema.suspend(() =>
  Schema.Struct({
    readTime: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ReadOnly" }) as any as Schema.Schema<ReadOnly>;

export interface ReadWrite {
  /** An optional transaction to retry. */
  retryTransaction?: string;
}

export const ReadWrite: Schema.Schema<ReadWrite> = Schema.suspend(() =>
  Schema.Struct({
    retryTransaction: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ReadWrite" }) as any as Schema.Schema<ReadWrite>;

export interface TransactionOptions {
  /** The transaction can only be used for read operations. */
  readOnly?: ReadOnly;
  /** The transaction can be used for both read and write operations. */
  readWrite?: ReadWrite;
}

export const TransactionOptions: Schema.Schema<TransactionOptions> =
  Schema.suspend(() =>
    Schema.Struct({
      readOnly: Schema.optional(ReadOnly),
      readWrite: Schema.optional(ReadWrite),
    }),
  ).annotate({
    identifier: "TransactionOptions",
  }) as any as Schema.Schema<TransactionOptions>;

export interface BatchGetDocumentsRequest {
  /** The names of the documents to retrieve. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. The request will fail if any of the document is not a child resource of the given `database`. Duplicate names will be elided. */
  documents?: Array<string>;
  /** The fields to return. If not set, returns all fields. If a document has a field that is not present in this mask, that field will not be returned in the response. */
  mask?: DocumentMask;
  /** Reads documents in a transaction. */
  transaction?: string;
  /** Starts a new transaction and reads the documents. Defaults to a read-only transaction. The new transaction ID will be returned as the first response in the stream. */
  newTransaction?: TransactionOptions;
  /** Reads documents as they were at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
}

export const BatchGetDocumentsRequest: Schema.Schema<BatchGetDocumentsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      documents: Schema.optional(Schema.Array(Schema.String)),
      mask: Schema.optional(DocumentMask),
      transaction: Schema.optional(Schema.String),
      newTransaction: Schema.optional(TransactionOptions),
      readTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BatchGetDocumentsRequest",
  }) as any as Schema.Schema<BatchGetDocumentsRequest>;

export interface BatchGetDocumentsResponse {
  /** A document that was requested. */
  found?: Document;
  /** A document name that was requested but does not exist. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. */
  missing?: string;
  /** The transaction that was started as part of this request. Will only be set in the first response, and only if BatchGetDocumentsRequest.new_transaction was set in the request. */
  transaction?: string;
  /** The time at which the document was read. This may be monotically increasing, in this case the previous documents in the result stream are guaranteed not to have changed between their read_time and this one. */
  readTime?: string;
}

export const BatchGetDocumentsResponse: Schema.Schema<BatchGetDocumentsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      found: Schema.optional(Document),
      missing: Schema.optional(Schema.String),
      transaction: Schema.optional(Schema.String),
      readTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BatchGetDocumentsResponse",
  }) as any as Schema.Schema<BatchGetDocumentsResponse>;

export interface BeginTransactionRequest {
  /** The options for the transaction. Defaults to a read-write transaction. */
  options?: TransactionOptions;
}

export const BeginTransactionRequest: Schema.Schema<BeginTransactionRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      options: Schema.optional(TransactionOptions),
    }),
  ).annotate({
    identifier: "BeginTransactionRequest",
  }) as any as Schema.Schema<BeginTransactionRequest>;

export interface BeginTransactionResponse {
  /** The transaction that was started. */
  transaction?: string;
}

export const BeginTransactionResponse: Schema.Schema<BeginTransactionResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      transaction: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BeginTransactionResponse",
  }) as any as Schema.Schema<BeginTransactionResponse>;

export interface FieldTransform {
  /** The path of the field. See Document.fields for the field path syntax reference. */
  fieldPath?: string;
  /** Sets the field to the given server value. */
  setToServerValue?:
    | "SERVER_VALUE_UNSPECIFIED"
    | "REQUEST_TIME"
    | (string & {});
  /** Adds the given value to the field's current value. This must be an integer or a double value. If the field is not an integer or double, or if the field does not yet exist, the transformation will set the field to the given value. If either of the given value or the current field value are doubles, both values will be interpreted as doubles. Double arithmetic and representation of double values follow IEEE 754 semantics. If there is positive/negative integer overflow, the field is resolved to the largest magnitude positive/negative integer. */
  increment?: Value;
  /** Sets the field to the maximum of its current value and the given value. This must be an integer or a double value. If the field is not an integer or double, or if the field does not yet exist, the transformation will set the field to the given value. If a maximum operation is applied where the field and the input value are of mixed types (that is - one is an integer and one is a double) the field takes on the type of the larger operand. If the operands are equivalent (e.g. 3 and 3.0), the field does not change. 0, 0.0, and -0.0 are all zero. The maximum of a zero stored value and zero input value is always the stored value. The maximum of any numeric value x and NaN is NaN. */
  maximum?: Value;
  /** Sets the field to the minimum of its current value and the given value. This must be an integer or a double value. If the field is not an integer or double, or if the field does not yet exist, the transformation will set the field to the input value. If a minimum operation is applied where the field and the input value are of mixed types (that is - one is an integer and one is a double) the field takes on the type of the smaller operand. If the operands are equivalent (e.g. 3 and 3.0), the field does not change. 0, 0.0, and -0.0 are all zero. The minimum of a zero stored value and zero input value is always the stored value. The minimum of any numeric value x and NaN is NaN. */
  minimum?: Value;
  /** Append the given elements in order if they are not already present in the current field value. If the field is not an array, or if the field does not yet exist, it is first set to the empty array. Equivalent numbers of different types (e.g. 3L and 3.0) are considered equal when checking if a value is missing. NaN is equal to NaN, and Null is equal to Null. If the input contains multiple equivalent values, only the first will be considered. The corresponding transform_result will be the null value. */
  appendMissingElements?: ArrayValue;
  /** Remove all of the given elements from the array in the field. If the field is not an array, or if the field does not yet exist, it is set to the empty array. Equivalent numbers of the different types (e.g. 3L and 3.0) are considered equal when deciding whether an element should be removed. NaN is equal to NaN, and Null is equal to Null. This will remove all equivalent values if there are duplicates. The corresponding transform_result will be the null value. */
  removeAllFromArray?: ArrayValue;
}

export const FieldTransform: Schema.Schema<FieldTransform> = Schema.suspend(
  () =>
    Schema.Struct({
      fieldPath: Schema.optional(Schema.String),
      setToServerValue: Schema.optional(Schema.String),
      increment: Schema.optional(Value),
      maximum: Schema.optional(Value),
      minimum: Schema.optional(Value),
      appendMissingElements: Schema.optional(ArrayValue),
      removeAllFromArray: Schema.optional(ArrayValue),
    }),
).annotate({
  identifier: "FieldTransform",
}) as any as Schema.Schema<FieldTransform>;

export interface DocumentTransform {
  /** The name of the document to transform. */
  document?: string;
  /** The list of transformations to apply to the fields of the document, in order. This must not be empty. */
  fieldTransforms?: Array<FieldTransform>;
}

export const DocumentTransform: Schema.Schema<DocumentTransform> =
  Schema.suspend(() =>
    Schema.Struct({
      document: Schema.optional(Schema.String),
      fieldTransforms: Schema.optional(Schema.Array(FieldTransform)),
    }),
  ).annotate({
    identifier: "DocumentTransform",
  }) as any as Schema.Schema<DocumentTransform>;

export interface Precondition {
  /** When set to `true`, the target document must exist. When set to `false`, the target document must not exist. */
  exists?: boolean;
  /** When set, the target document must exist and have been last updated at that time. Timestamp must be microsecond aligned. */
  updateTime?: string;
}

export const Precondition: Schema.Schema<Precondition> = Schema.suspend(() =>
  Schema.Struct({
    exists: Schema.optional(Schema.Boolean),
    updateTime: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "Precondition",
}) as any as Schema.Schema<Precondition>;

export interface Write {
  /** A document to write. */
  update?: Document;
  /** A document name to delete. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. */
  delete?: string;
  /** Applies a transformation to a document. */
  transform?: DocumentTransform;
  /** The fields to update in this write. This field can be set only when the operation is `update`. If the mask is not set for an `update` and the document exists, any existing data will be overwritten. If the mask is set and the document on the server has fields not covered by the mask, they are left unchanged. Fields referenced in the mask, but not present in the input document, are deleted from the document on the server. The field paths in this mask must not contain a reserved field name. */
  updateMask?: DocumentMask;
  /** The transforms to perform after update. This field can be set only when the operation is `update`. If present, this write is equivalent to performing `update` and `transform` to the same document atomically and in order. */
  updateTransforms?: Array<FieldTransform>;
  /** An optional precondition on the document. The write will fail if this is set and not met by the target document. */
  currentDocument?: Precondition;
}

export const Write: Schema.Schema<Write> = Schema.suspend(() =>
  Schema.Struct({
    update: Schema.optional(Document),
    delete: Schema.optional(Schema.String),
    transform: Schema.optional(DocumentTransform),
    updateMask: Schema.optional(DocumentMask),
    updateTransforms: Schema.optional(Schema.Array(FieldTransform)),
    currentDocument: Schema.optional(Precondition),
  }),
).annotate({ identifier: "Write" }) as any as Schema.Schema<Write>;

export interface CommitRequest {
  /** The writes to apply. Always executed atomically and in order. */
  writes?: Array<Write>;
  /** If set, applies all writes in this transaction, and commits it. */
  transaction?: string;
}

export const CommitRequest: Schema.Schema<CommitRequest> = Schema.suspend(() =>
  Schema.Struct({
    writes: Schema.optional(Schema.Array(Write)),
    transaction: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "CommitRequest",
}) as any as Schema.Schema<CommitRequest>;

export interface WriteResult {
  /** The last update time of the document after applying the write. Not set after a `delete`. If the write did not actually change the document, this will be the previous update_time. */
  updateTime?: string;
  /** The results of applying each DocumentTransform.FieldTransform, in the same order. */
  transformResults?: Array<Value>;
}

export const WriteResult: Schema.Schema<WriteResult> = Schema.suspend(() =>
  Schema.Struct({
    updateTime: Schema.optional(Schema.String),
    transformResults: Schema.optional(Schema.Array(Value)),
  }),
).annotate({ identifier: "WriteResult" }) as any as Schema.Schema<WriteResult>;

export interface CommitResponse {
  /** The result of applying the writes. This i-th write result corresponds to the i-th write in the request. */
  writeResults?: Array<WriteResult>;
  /** The time at which the commit occurred. Any read with an equal or greater `read_time` is guaranteed to see the effects of the commit. */
  commitTime?: string;
}

export const CommitResponse: Schema.Schema<CommitResponse> = Schema.suspend(
  () =>
    Schema.Struct({
      writeResults: Schema.optional(Schema.Array(WriteResult)),
      commitTime: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "CommitResponse",
}) as any as Schema.Schema<CommitResponse>;

export interface RollbackRequest {
  /** Required. The transaction to roll back. */
  transaction?: string;
}

export const RollbackRequest: Schema.Schema<RollbackRequest> = Schema.suspend(
  () =>
    Schema.Struct({
      transaction: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "RollbackRequest",
}) as any as Schema.Schema<RollbackRequest>;

export interface FieldReference {
  /** A reference to a field in a document. Requires: * MUST be a dot-delimited (`.`) string of segments, where each segment conforms to document field name limitations. */
  fieldPath?: string;
}

export const FieldReference: Schema.Schema<FieldReference> = Schema.suspend(
  () =>
    Schema.Struct({
      fieldPath: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "FieldReference",
}) as any as Schema.Schema<FieldReference>;

export interface Projection {
  /** The fields to return. If empty, all fields are returned. To only return the name of the document, use `['__name__']`. */
  fields?: Array<FieldReference>;
}

export const Projection: Schema.Schema<Projection> = Schema.suspend(() =>
  Schema.Struct({
    fields: Schema.optional(Schema.Array(FieldReference)),
  }),
).annotate({ identifier: "Projection" }) as any as Schema.Schema<Projection>;

export interface CollectionSelector {
  /** The collection ID. When set, selects only collections with this ID. */
  collectionId?: string;
  /** When false, selects only collections that are immediate children of the `parent` specified in the containing `RunQueryRequest`. When true, selects all descendant collections. */
  allDescendants?: boolean;
}

export const CollectionSelector: Schema.Schema<CollectionSelector> =
  Schema.suspend(() =>
    Schema.Struct({
      collectionId: Schema.optional(Schema.String),
      allDescendants: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "CollectionSelector",
  }) as any as Schema.Schema<CollectionSelector>;

export interface CompositeFilter {
  /** The operator for combining multiple filters. */
  op?: "OPERATOR_UNSPECIFIED" | "AND" | "OR" | (string & {});
  /** The list of filters to combine. Requires: * At least one filter is present. */
  filters?: Array<Filter>;
}

export const CompositeFilter: Schema.Schema<CompositeFilter> = Schema.suspend(
  () =>
    Schema.Struct({
      op: Schema.optional(Schema.String),
      filters: Schema.optional(Schema.Array(Filter)),
    }),
).annotate({
  identifier: "CompositeFilter",
}) as any as Schema.Schema<CompositeFilter>;

export interface FieldFilter {
  /** The field to filter by. */
  field?: FieldReference;
  /** The operator to filter by. */
  op?:
    | "OPERATOR_UNSPECIFIED"
    | "LESS_THAN"
    | "LESS_THAN_OR_EQUAL"
    | "GREATER_THAN"
    | "GREATER_THAN_OR_EQUAL"
    | "EQUAL"
    | "NOT_EQUAL"
    | "ARRAY_CONTAINS"
    | "IN"
    | "ARRAY_CONTAINS_ANY"
    | "NOT_IN"
    | (string & {});
  /** The value to compare to. */
  value?: Value;
}

export const FieldFilter: Schema.Schema<FieldFilter> = Schema.suspend(() =>
  Schema.Struct({
    field: Schema.optional(FieldReference),
    op: Schema.optional(Schema.String),
    value: Schema.optional(Value),
  }),
).annotate({ identifier: "FieldFilter" }) as any as Schema.Schema<FieldFilter>;

export interface UnaryFilter {
  /** The unary operator to apply. */
  op?:
    | "OPERATOR_UNSPECIFIED"
    | "IS_NAN"
    | "IS_NULL"
    | "IS_NOT_NAN"
    | "IS_NOT_NULL"
    | (string & {});
  /** The field to which to apply the operator. */
  field?: FieldReference;
}

export const UnaryFilter: Schema.Schema<UnaryFilter> = Schema.suspend(() =>
  Schema.Struct({
    op: Schema.optional(Schema.String),
    field: Schema.optional(FieldReference),
  }),
).annotate({ identifier: "UnaryFilter" }) as any as Schema.Schema<UnaryFilter>;

export interface Filter {
  /** A composite filter. */
  compositeFilter?: CompositeFilter;
  /** A filter on a document field. */
  fieldFilter?: FieldFilter;
  /** A filter that takes exactly one argument. */
  unaryFilter?: UnaryFilter;
}

export const Filter: Schema.Schema<Filter> = Schema.suspend(() =>
  Schema.Struct({
    compositeFilter: Schema.optional(CompositeFilter),
    fieldFilter: Schema.optional(FieldFilter),
    unaryFilter: Schema.optional(UnaryFilter),
  }),
).annotate({ identifier: "Filter" }) as any as Schema.Schema<Filter>;

export interface Order {
  /** The field to order by. */
  field?: FieldReference;
  /** The direction to order by. Defaults to `ASCENDING`. */
  direction?:
    | "DIRECTION_UNSPECIFIED"
    | "ASCENDING"
    | "DESCENDING"
    | (string & {});
}

export const Order: Schema.Schema<Order> = Schema.suspend(() =>
  Schema.Struct({
    field: Schema.optional(FieldReference),
    direction: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Order" }) as any as Schema.Schema<Order>;

export interface Cursor {
  /** The values that represent a position, in the order they appear in the order by clause of a query. Can contain fewer values than specified in the order by clause. */
  values?: Array<Value>;
  /** If the position is just before or just after the given values, relative to the sort order defined by the query. */
  before?: boolean;
}

export const Cursor: Schema.Schema<Cursor> = Schema.suspend(() =>
  Schema.Struct({
    values: Schema.optional(Schema.Array(Value)),
    before: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "Cursor" }) as any as Schema.Schema<Cursor>;

export interface FindNearest {
  /** Required. An indexed vector field to search upon. Only documents which contain vectors whose dimensionality match the query_vector can be returned. */
  vectorField?: FieldReference;
  /** Required. The query vector that we are searching on. Must be a vector of no more than 2048 dimensions. */
  queryVector?: Value;
  /** Required. The distance measure to use, required. */
  distanceMeasure?:
    | "DISTANCE_MEASURE_UNSPECIFIED"
    | "EUCLIDEAN"
    | "COSINE"
    | "DOT_PRODUCT"
    | (string & {});
  /** Required. The number of nearest neighbors to return. Must be a positive integer of no more than 1000. */
  limit?: number;
  /** Optional. Optional name of the field to output the result of the vector distance calculation. Must conform to document field name limitations. */
  distanceResultField?: string;
  /** Optional. Option to specify a threshold for which no less similar documents will be returned. The behavior of the specified `distance_measure` will affect the meaning of the distance threshold. Since DOT_PRODUCT distances increase when the vectors are more similar, the comparison is inverted. * For EUCLIDEAN, COSINE: `WHERE distance <= distance_threshold` * For DOT_PRODUCT: `WHERE distance >= distance_threshold` */
  distanceThreshold?: number;
}

export const FindNearest: Schema.Schema<FindNearest> = Schema.suspend(() =>
  Schema.Struct({
    vectorField: Schema.optional(FieldReference),
    queryVector: Schema.optional(Value),
    distanceMeasure: Schema.optional(Schema.String),
    limit: Schema.optional(Schema.Number),
    distanceResultField: Schema.optional(Schema.String),
    distanceThreshold: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "FindNearest" }) as any as Schema.Schema<FindNearest>;

export interface StructuredQuery {
  /** Optional sub-set of the fields to return. This acts as a DocumentMask over the documents returned from a query. When not set, assumes that the caller wants all fields returned. */
  select?: Projection;
  /** The collections to query. */
  from?: Array<CollectionSelector>;
  /** The filter to apply. */
  where?: Filter;
  /** The order to apply to the query results. Firestore allows callers to provide a full ordering, a partial ordering, or no ordering at all. In all cases, Firestore guarantees a stable ordering through the following rules: * The `order_by` is required to reference all fields used with an inequality filter. * All fields that are required to be in the `order_by` but are not already present are appended in lexicographical ordering of the field name. * If an order on `__name__` is not specified, it is appended by default. Fields are appended with the same sort direction as the last order specified, or 'ASCENDING' if no order was specified. For example: * `ORDER BY a` becomes `ORDER BY a ASC, __name__ ASC` * `ORDER BY a DESC` becomes `ORDER BY a DESC, __name__ DESC` * `WHERE a > 1` becomes `WHERE a > 1 ORDER BY a ASC, __name__ ASC` * `WHERE __name__ > ... AND a > 1` becomes `WHERE __name__ > ... AND a > 1 ORDER BY a ASC, __name__ ASC` */
  orderBy?: Array<Order>;
  /** A potential prefix of a position in the result set to start the query at. The ordering of the result set is based on the `ORDER BY` clause of the original query. ``` SELECT * FROM k WHERE a = 1 AND b > 2 ORDER BY b ASC, __name__ ASC; ``` This query's results are ordered by `(b ASC, __name__ ASC)`. Cursors can reference either the full ordering or a prefix of the location, though it cannot reference more fields than what are in the provided `ORDER BY`. Continuing off the example above, attaching the following start cursors will have varying impact: - `START BEFORE (2, /k/123)`: start the query right before `a = 1 AND b > 2 AND __name__ > /k/123`. - `START AFTER (10)`: start the query right after `a = 1 AND b > 10`. Unlike `OFFSET` which requires scanning over the first N results to skip, a start cursor allows the query to begin at a logical position. This position is not required to match an actual result, it will scan forward from this position to find the next document. Requires: * The number of values cannot be greater than the number of fields specified in the `ORDER BY` clause. */
  startAt?: Cursor;
  /** A potential prefix of a position in the result set to end the query at. This is similar to `START_AT` but with it controlling the end position rather than the start position. Requires: * The number of values cannot be greater than the number of fields specified in the `ORDER BY` clause. */
  endAt?: Cursor;
  /** The number of documents to skip before returning the first result. This applies after the constraints specified by the `WHERE`, `START AT`, & `END AT` but before the `LIMIT` clause. Requires: * The value must be greater than or equal to zero if specified. */
  offset?: number;
  /** The maximum number of results to return. Applies after all other constraints. Requires: * The value must be greater than or equal to zero if specified. */
  limit?: number;
  /** Optional. A potential nearest neighbors search. Applies after all other filters and ordering. Finds the closest vector embeddings to the given query vector. */
  findNearest?: FindNearest;
}

export const StructuredQuery: Schema.Schema<StructuredQuery> = Schema.suspend(
  () =>
    Schema.Struct({
      select: Schema.optional(Projection),
      from: Schema.optional(Schema.Array(CollectionSelector)),
      where: Schema.optional(Filter),
      orderBy: Schema.optional(Schema.Array(Order)),
      startAt: Schema.optional(Cursor),
      endAt: Schema.optional(Cursor),
      offset: Schema.optional(Schema.Number),
      limit: Schema.optional(Schema.Number),
      findNearest: Schema.optional(FindNearest),
    }),
).annotate({
  identifier: "StructuredQuery",
}) as any as Schema.Schema<StructuredQuery>;

export interface ExplainOptions {
  /** Optional. Whether to execute this query. When false (the default), the query will be planned, returning only metrics from the planning stages. When true, the query will be planned and executed, returning the full query results along with both planning and execution stage metrics. */
  analyze?: boolean;
}

export const ExplainOptions: Schema.Schema<ExplainOptions> = Schema.suspend(
  () =>
    Schema.Struct({
      analyze: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "ExplainOptions",
}) as any as Schema.Schema<ExplainOptions>;

export interface RunQueryRequest {
  /** A structured query. */
  structuredQuery?: StructuredQuery;
  /** Run the query within an already active transaction. The value here is the opaque transaction ID to execute the query in. */
  transaction?: string;
  /** Starts a new transaction and reads the documents. Defaults to a read-only transaction. The new transaction ID will be returned as the first response in the stream. */
  newTransaction?: TransactionOptions;
  /** Reads documents as they were at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
  /** Optional. Explain options for the query. If set, additional query statistics will be returned. If not, only query results will be returned. */
  explainOptions?: ExplainOptions;
}

export const RunQueryRequest: Schema.Schema<RunQueryRequest> = Schema.suspend(
  () =>
    Schema.Struct({
      structuredQuery: Schema.optional(StructuredQuery),
      transaction: Schema.optional(Schema.String),
      newTransaction: Schema.optional(TransactionOptions),
      readTime: Schema.optional(Schema.String),
      explainOptions: Schema.optional(ExplainOptions),
    }),
).annotate({
  identifier: "RunQueryRequest",
}) as any as Schema.Schema<RunQueryRequest>;

export interface PlanSummary {
  /** The indexes selected for the query. For example: [ {"query_scope": "Collection", "properties": "(foo ASC, __name__ ASC)"}, {"query_scope": "Collection", "properties": "(bar ASC, __name__ ASC)"} ] */
  indexesUsed?: Array<Record<string, unknown>>;
}

export const PlanSummary: Schema.Schema<PlanSummary> = Schema.suspend(() =>
  Schema.Struct({
    indexesUsed: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
  }),
).annotate({ identifier: "PlanSummary" }) as any as Schema.Schema<PlanSummary>;

export interface ExecutionStats {
  /** Total number of results returned, including documents, projections, aggregation results, keys. */
  resultsReturned?: string;
  /** Total time to execute the query in the backend. */
  executionDuration?: string;
  /** Total billable read operations. */
  readOperations?: string;
  /** Debugging statistics from the execution of the query. Note that the debugging stats are subject to change as Firestore evolves. It could include: { "indexes_entries_scanned": "1000", "documents_scanned": "20", "billing_details" : { "documents_billable": "20", "index_entries_billable": "1000", "min_query_cost": "0" } } */
  debugStats?: Record<string, unknown>;
}

export const ExecutionStats: Schema.Schema<ExecutionStats> = Schema.suspend(
  () =>
    Schema.Struct({
      resultsReturned: Schema.optional(Schema.String),
      executionDuration: Schema.optional(Schema.String),
      readOperations: Schema.optional(Schema.String),
      debugStats: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    }),
).annotate({
  identifier: "ExecutionStats",
}) as any as Schema.Schema<ExecutionStats>;

export interface ExplainMetrics {
  /** Planning phase information for the query. */
  planSummary?: PlanSummary;
  /** Aggregated stats from the execution of the query. Only present when ExplainOptions.analyze is set to true. */
  executionStats?: ExecutionStats;
}

export const ExplainMetrics: Schema.Schema<ExplainMetrics> = Schema.suspend(
  () =>
    Schema.Struct({
      planSummary: Schema.optional(PlanSummary),
      executionStats: Schema.optional(ExecutionStats),
    }),
).annotate({
  identifier: "ExplainMetrics",
}) as any as Schema.Schema<ExplainMetrics>;

export interface RunQueryResponse {
  /** The transaction that was started as part of this request. Can only be set in the first response, and only if RunQueryRequest.new_transaction was set in the request. If set, no other fields will be set in this response. */
  transaction?: string;
  /** A query result, not set when reporting partial progress. */
  document?: Document;
  /** The time at which the document was read. This may be monotonically increasing; in this case, the previous documents in the result stream are guaranteed not to have changed between their `read_time` and this one. If the query returns no results, a response with `read_time` and no `document` will be sent, and this represents the time at which the query was run. */
  readTime?: string;
  /** The number of results that have been skipped due to an offset between the last response and the current response. */
  skippedResults?: number;
  /** If present, Firestore has completely finished the request and no more documents will be returned. */
  done?: boolean;
  /** Query explain metrics. This is only present when the RunQueryRequest.explain_options is provided, and it is sent only once with the last response in the stream. */
  explainMetrics?: ExplainMetrics;
}

export const RunQueryResponse: Schema.Schema<RunQueryResponse> = Schema.suspend(
  () =>
    Schema.Struct({
      transaction: Schema.optional(Schema.String),
      document: Schema.optional(Document),
      readTime: Schema.optional(Schema.String),
      skippedResults: Schema.optional(Schema.Number),
      done: Schema.optional(Schema.Boolean),
      explainMetrics: Schema.optional(ExplainMetrics),
    }),
).annotate({
  identifier: "RunQueryResponse",
}) as any as Schema.Schema<RunQueryResponse>;

export interface StructuredPipeline {
  /** Required. The pipeline query to execute. */
  pipeline?: Pipeline;
  /** Optional. Optional query-level arguments. */
  options?: Record<string, Value>;
}

export const StructuredPipeline: Schema.Schema<StructuredPipeline> =
  Schema.suspend(() =>
    Schema.Struct({
      pipeline: Schema.optional(Pipeline),
      options: Schema.optional(Schema.Record(Schema.String, Value)),
    }),
  ).annotate({
    identifier: "StructuredPipeline",
  }) as any as Schema.Schema<StructuredPipeline>;

export interface ExecutePipelineRequest {
  /** A pipelined operation. */
  structuredPipeline?: StructuredPipeline;
  /** Run the query within an already active transaction. The value here is the opaque transaction ID to execute the query in. */
  transaction?: string;
  /** Execute the pipeline in a new transaction. The identifier of the newly created transaction will be returned in the first response on the stream. This defaults to a read-only transaction. */
  newTransaction?: TransactionOptions;
  /** Execute the pipeline in a snapshot transaction at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
}

export const ExecutePipelineRequest: Schema.Schema<ExecutePipelineRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      structuredPipeline: Schema.optional(StructuredPipeline),
      transaction: Schema.optional(Schema.String),
      newTransaction: Schema.optional(TransactionOptions),
      readTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ExecutePipelineRequest",
  }) as any as Schema.Schema<ExecutePipelineRequest>;

export interface ExplainStats {
  /** The format depends on the `output_format` options in the request. Currently there are two supported options: `TEXT` and `JSON`. Both supply a `google.protobuf.StringValue`. */
  data?: Record<string, unknown>;
}

export const ExplainStats: Schema.Schema<ExplainStats> = Schema.suspend(() =>
  Schema.Struct({
    data: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  }),
).annotate({
  identifier: "ExplainStats",
}) as any as Schema.Schema<ExplainStats>;

export interface ExecutePipelineResponse {
  /** Newly created transaction identifier. This field is only specified as part of the first response from the server, alongside the `results` field when the original request specified ExecuteRequest.new_transaction. */
  transaction?: string;
  /** An ordered batch of results returned executing a pipeline. The batch size is variable, and can even be zero for when only a partial progress message is returned. The fields present in the returned documents are only those that were explicitly requested in the pipeline, this includes those like `__name__` and `__update_time__`. This is explicitly a divergence from `Firestore.RunQuery` / `Firestore.GetDocument` RPCs which always return such fields even when they are not specified in the `mask`. */
  results?: Array<Document>;
  /** The time at which the results are valid. This is a (not strictly) monotonically increasing value across multiple responses in the same stream. The API guarantees that all previously returned results are still valid at the latest `execution_time`. This allows the API consumer to treat the query if it ran at the latest `execution_time` returned. If the query returns no results, a response with `execution_time` and no `results` will be sent, and this represents the time at which the operation was run. */
  executionTime?: string;
  /** Query explain stats. This is present on the **last** response if the request configured explain to run in 'analyze' or 'explain' mode in the pipeline options. If the query does not return any results, a response with `explain_stats` and no `results` will still be sent. */
  explainStats?: ExplainStats;
}

export const ExecutePipelineResponse: Schema.Schema<ExecutePipelineResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      transaction: Schema.optional(Schema.String),
      results: Schema.optional(Schema.Array(Document)),
      executionTime: Schema.optional(Schema.String),
      explainStats: Schema.optional(ExplainStats),
    }),
  ).annotate({
    identifier: "ExecutePipelineResponse",
  }) as any as Schema.Schema<ExecutePipelineResponse>;

export interface Count {
  /** Optional. Optional constraint on the maximum number of documents to count. This provides a way to set an upper bound on the number of documents to scan, limiting latency, and cost. Unspecified is interpreted as no bound. High-Level Example: ``` AGGREGATE COUNT_UP_TO(1000) OVER ( SELECT * FROM k ); ``` Requires: * Must be greater than zero when present. */
  upTo?: string;
}

export const Count: Schema.Schema<Count> = Schema.suspend(() =>
  Schema.Struct({
    upTo: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Count" }) as any as Schema.Schema<Count>;

export interface Sum {
  /** The field to aggregate on. */
  field?: FieldReference;
}

export const Sum: Schema.Schema<Sum> = Schema.suspend(() =>
  Schema.Struct({
    field: Schema.optional(FieldReference),
  }),
).annotate({ identifier: "Sum" }) as any as Schema.Schema<Sum>;

export interface Avg {
  /** The field to aggregate on. */
  field?: FieldReference;
}

export const Avg: Schema.Schema<Avg> = Schema.suspend(() =>
  Schema.Struct({
    field: Schema.optional(FieldReference),
  }),
).annotate({ identifier: "Avg" }) as any as Schema.Schema<Avg>;

export interface Aggregation {
  /** Count aggregator. */
  count?: Count;
  /** Sum aggregator. */
  sum?: Sum;
  /** Average aggregator. */
  avg?: Avg;
  /** Optional. Optional name of the field to store the result of the aggregation into. If not provided, Firestore will pick a default name following the format `field_`. For example: ``` AGGREGATE COUNT_UP_TO(1) AS count_up_to_1, COUNT_UP_TO(2), COUNT_UP_TO(3) AS count_up_to_3, COUNT(*) OVER ( ... ); ``` becomes: ``` AGGREGATE COUNT_UP_TO(1) AS count_up_to_1, COUNT_UP_TO(2) AS field_1, COUNT_UP_TO(3) AS count_up_to_3, COUNT(*) AS field_2 OVER ( ... ); ``` Requires: * Must be unique across all aggregation aliases. * Conform to document field name limitations. */
  alias?: string;
}

export const Aggregation: Schema.Schema<Aggregation> = Schema.suspend(() =>
  Schema.Struct({
    count: Schema.optional(Count),
    sum: Schema.optional(Sum),
    avg: Schema.optional(Avg),
    alias: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Aggregation" }) as any as Schema.Schema<Aggregation>;

export interface StructuredAggregationQuery {
  /** Nested structured query. */
  structuredQuery?: StructuredQuery;
  /** Optional. Series of aggregations to apply over the results of the `structured_query`. Requires: * A minimum of one and maximum of five aggregations per query. */
  aggregations?: Array<Aggregation>;
}

export const StructuredAggregationQuery: Schema.Schema<StructuredAggregationQuery> =
  Schema.suspend(() =>
    Schema.Struct({
      structuredQuery: Schema.optional(StructuredQuery),
      aggregations: Schema.optional(Schema.Array(Aggregation)),
    }),
  ).annotate({
    identifier: "StructuredAggregationQuery",
  }) as any as Schema.Schema<StructuredAggregationQuery>;

export interface RunAggregationQueryRequest {
  /** An aggregation query. */
  structuredAggregationQuery?: StructuredAggregationQuery;
  /** Run the aggregation within an already active transaction. The value here is the opaque transaction ID to execute the query in. */
  transaction?: string;
  /** Starts a new transaction as part of the query, defaulting to read-only. The new transaction ID will be returned as the first response in the stream. */
  newTransaction?: TransactionOptions;
  /** Executes the query at the given timestamp. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
  /** Optional. Explain options for the query. If set, additional query statistics will be returned. If not, only query results will be returned. */
  explainOptions?: ExplainOptions;
}

export const RunAggregationQueryRequest: Schema.Schema<RunAggregationQueryRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      structuredAggregationQuery: Schema.optional(StructuredAggregationQuery),
      transaction: Schema.optional(Schema.String),
      newTransaction: Schema.optional(TransactionOptions),
      readTime: Schema.optional(Schema.String),
      explainOptions: Schema.optional(ExplainOptions),
    }),
  ).annotate({
    identifier: "RunAggregationQueryRequest",
  }) as any as Schema.Schema<RunAggregationQueryRequest>;

export interface AggregationResult {
  /** The result of the aggregation functions, ex: `COUNT(*) AS total_docs`. The key is the alias assigned to the aggregation function on input and the size of this map equals the number of aggregation functions in the query. */
  aggregateFields?: Record<string, Value>;
}

export const AggregationResult: Schema.Schema<AggregationResult> =
  Schema.suspend(() =>
    Schema.Struct({
      aggregateFields: Schema.optional(Schema.Record(Schema.String, Value)),
    }),
  ).annotate({
    identifier: "AggregationResult",
  }) as any as Schema.Schema<AggregationResult>;

export interface RunAggregationQueryResponse {
  /** A single aggregation result. Not present when reporting partial progress. */
  result?: AggregationResult;
  /** The transaction that was started as part of this request. Only present on the first response when the request requested to start a new transaction. */
  transaction?: string;
  /** The time at which the aggregate result was computed. This is always monotonically increasing; in this case, the previous AggregationResult in the result stream are guaranteed not to have changed between their `read_time` and this one. If the query returns no results, a response with `read_time` and no `result` will be sent, and this represents the time at which the query was run. */
  readTime?: string;
  /** Query explain metrics. This is only present when the RunAggregationQueryRequest.explain_options is provided, and it is sent only once with the last response in the stream. */
  explainMetrics?: ExplainMetrics;
}

export const RunAggregationQueryResponse: Schema.Schema<RunAggregationQueryResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      result: Schema.optional(AggregationResult),
      transaction: Schema.optional(Schema.String),
      readTime: Schema.optional(Schema.String),
      explainMetrics: Schema.optional(ExplainMetrics),
    }),
  ).annotate({
    identifier: "RunAggregationQueryResponse",
  }) as any as Schema.Schema<RunAggregationQueryResponse>;

export interface PartitionQueryRequest {
  /** A structured query. Query must specify collection with all descendants and be ordered by name ascending. Other filters, order bys, limits, offsets, and start/end cursors are not supported. */
  structuredQuery?: StructuredQuery;
  /** The desired maximum number of partition points. The partitions may be returned across multiple pages of results. The number must be positive. The actual number of partitions returned may be fewer. For example, this may be set to one fewer than the number of parallel queries to be run, or in running a data pipeline job, one fewer than the number of workers or compute instances available. */
  partitionCount?: string;
  /** The `next_page_token` value returned from a previous call to PartitionQuery that may be used to get an additional set of results. There are no ordering guarantees between sets of results. Thus, using multiple sets of results will require merging the different result sets. For example, two subsequent calls using a page_token may return: * cursor B, cursor M, cursor Q * cursor A, cursor U, cursor W To obtain a complete result set ordered with respect to the results of the query supplied to PartitionQuery, the results sets should be merged: cursor A, cursor B, cursor M, cursor Q, cursor U, cursor W */
  pageToken?: string;
  /** The maximum number of partitions to return in this call, subject to `partition_count`. For example, if `partition_count` = 10 and `page_size` = 8, the first call to PartitionQuery will return up to 8 partitions and a `next_page_token` if more results exist. A second call to PartitionQuery will return up to 2 partitions, to complete the total of 10 specified in `partition_count`. */
  pageSize?: number;
  /** Reads documents as they were at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
}

export const PartitionQueryRequest: Schema.Schema<PartitionQueryRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      structuredQuery: Schema.optional(StructuredQuery),
      partitionCount: Schema.optional(Schema.String),
      pageToken: Schema.optional(Schema.String),
      pageSize: Schema.optional(Schema.Number),
      readTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PartitionQueryRequest",
  }) as any as Schema.Schema<PartitionQueryRequest>;

export interface PartitionQueryResponse {
  /** Partition results. Each partition is a split point that can be used by RunQuery as a starting or end point for the query results. The RunQuery requests must be made with the same query supplied to this PartitionQuery request. The partition cursors will be ordered according to same ordering as the results of the query supplied to PartitionQuery. For example, if a PartitionQuery request returns partition cursors A and B, running the following three queries will return the entire result set of the original query: * query, end_at A * query, start_at A, end_at B * query, start_at B An empty result may indicate that the query has too few results to be partitioned, or that the query is not yet supported for partitioning. */
  partitions?: Array<Cursor>;
  /** A page token that may be used to request an additional set of results, up to the number specified by `partition_count` in the PartitionQuery request. If blank, there are no more results. */
  nextPageToken?: string;
}

export const PartitionQueryResponse: Schema.Schema<PartitionQueryResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      partitions: Schema.optional(Schema.Array(Cursor)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PartitionQueryResponse",
  }) as any as Schema.Schema<PartitionQueryResponse>;

export interface WriteRequest {
  /** The ID of the write stream to resume. This may only be set in the first message. When left empty, a new write stream will be created. */
  streamId?: string;
  /** The writes to apply. Always executed atomically and in order. This must be empty on the first request. This may be empty on the last request. This must not be empty on all other requests. */
  writes?: Array<Write>;
  /** A stream token that was previously sent by the server. The client should set this field to the token from the most recent WriteResponse it has received. This acknowledges that the client has received responses up to this token. After sending this token, earlier tokens may not be used anymore. The server may close the stream if there are too many unacknowledged responses. Leave this field unset when creating a new stream. To resume a stream at a specific point, set this field and the `stream_id` field. Leave this field unset when creating a new stream. */
  streamToken?: string;
  /** Labels associated with this write request. */
  labels?: Record<string, string>;
}

export const WriteRequest: Schema.Schema<WriteRequest> = Schema.suspend(() =>
  Schema.Struct({
    streamId: Schema.optional(Schema.String),
    writes: Schema.optional(Schema.Array(Write)),
    streamToken: Schema.optional(Schema.String),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }),
).annotate({
  identifier: "WriteRequest",
}) as any as Schema.Schema<WriteRequest>;

export interface WriteResponse {
  /** The ID of the stream. Only set on the first message, when a new stream was created. */
  streamId?: string;
  /** A token that represents the position of this response in the stream. This can be used by a client to resume the stream at this point. This field is always set. */
  streamToken?: string;
  /** The result of applying the writes. This i-th write result corresponds to the i-th write in the request. */
  writeResults?: Array<WriteResult>;
  /** The time at which the commit occurred. Any read with an equal or greater `read_time` is guaranteed to see the effects of the write. */
  commitTime?: string;
}

export const WriteResponse: Schema.Schema<WriteResponse> = Schema.suspend(() =>
  Schema.Struct({
    streamId: Schema.optional(Schema.String),
    streamToken: Schema.optional(Schema.String),
    writeResults: Schema.optional(Schema.Array(WriteResult)),
    commitTime: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "WriteResponse",
}) as any as Schema.Schema<WriteResponse>;

export interface QueryTarget {
  /** The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` */
  parent?: string;
  /** A structured query. */
  structuredQuery?: StructuredQuery;
}

export const QueryTarget: Schema.Schema<QueryTarget> = Schema.suspend(() =>
  Schema.Struct({
    parent: Schema.optional(Schema.String),
    structuredQuery: Schema.optional(StructuredQuery),
  }),
).annotate({ identifier: "QueryTarget" }) as any as Schema.Schema<QueryTarget>;

export interface DocumentsTarget {
  /** The names of the documents to retrieve. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. The request will fail if any of the document is not a child resource of the given `database`. Duplicate names will be elided. */
  documents?: Array<string>;
}

export const DocumentsTarget: Schema.Schema<DocumentsTarget> = Schema.suspend(
  () =>
    Schema.Struct({
      documents: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "DocumentsTarget",
}) as any as Schema.Schema<DocumentsTarget>;

export interface Target {
  /** A target specified by a query. */
  query?: QueryTarget;
  /** A target specified by a set of document names. */
  documents?: DocumentsTarget;
  /** A resume token from a prior TargetChange for an identical target. Using a resume token with a different target is unsupported and may fail. */
  resumeToken?: string;
  /** Start listening after a specific `read_time`. The client must know the state of matching documents at this time. */
  readTime?: string;
  /** The target ID that identifies the target on the stream. Must be a positive number and non-zero. If `target_id` is 0 (or unspecified), the server will assign an ID for this target and return that in a `TargetChange::ADD` event. Once a target with `target_id=0` is added, all subsequent targets must also have `target_id=0`. If an `AddTarget` request with `target_id != 0` is sent to the server after a target with `target_id=0` is added, the server will immediately send a response with a `TargetChange::Remove` event. Note that if the client sends multiple `AddTarget` requests without an ID, the order of IDs returned in `TargetChange.target_ids` are undefined. Therefore, clients should provide a target ID instead of relying on the server to assign one. If `target_id` is non-zero, there must not be an existing active target on this stream with the same ID. */
  targetId?: number;
  /** If the target should be removed once it is current and consistent. */
  once?: boolean;
  /** The number of documents that last matched the query at the resume token or read time. This value is only relevant when a `resume_type` is provided. This value being present and greater than zero signals that the client wants `ExistenceFilter.unchanged_names` to be included in the response. */
  expectedCount?: number;
}

export const Target: Schema.Schema<Target> = Schema.suspend(() =>
  Schema.Struct({
    query: Schema.optional(QueryTarget),
    documents: Schema.optional(DocumentsTarget),
    resumeToken: Schema.optional(Schema.String),
    readTime: Schema.optional(Schema.String),
    targetId: Schema.optional(Schema.Number),
    once: Schema.optional(Schema.Boolean),
    expectedCount: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Target" }) as any as Schema.Schema<Target>;

export interface ListenRequest {
  /** A target to add to this stream. */
  addTarget?: Target;
  /** The ID of a target to remove from this stream. */
  removeTarget?: number;
  /** Labels associated with this target change. */
  labels?: Record<string, string>;
}

export const ListenRequest: Schema.Schema<ListenRequest> = Schema.suspend(() =>
  Schema.Struct({
    addTarget: Schema.optional(Target),
    removeTarget: Schema.optional(Schema.Number),
    labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  }),
).annotate({
  identifier: "ListenRequest",
}) as any as Schema.Schema<ListenRequest>;

export interface TargetChange {
  /** The type of change that occurred. */
  targetChangeType?:
    | "NO_CHANGE"
    | "ADD"
    | "REMOVE"
    | "CURRENT"
    | "RESET"
    | (string & {});
  /** The target IDs of targets that have changed. If empty, the change applies to all targets. The order of the target IDs is not defined. */
  targetIds?: Array<number>;
  /** The error that resulted in this change, if applicable. */
  cause?: Status;
  /** A token that can be used to resume the stream for the given `target_ids`, or all targets if `target_ids` is empty. Not set on every target change. */
  resumeToken?: string;
  /** The consistent `read_time` for the given `target_ids` (omitted when the target_ids are not at a consistent snapshot). The stream is guaranteed to send a `read_time` with `target_ids` empty whenever the entire stream reaches a new consistent snapshot. ADD, CURRENT, and RESET messages are guaranteed to (eventually) result in a new consistent snapshot (while NO_CHANGE and REMOVE messages are not). For a given stream, `read_time` is guaranteed to be monotonically increasing. */
  readTime?: string;
}

export const TargetChange: Schema.Schema<TargetChange> = Schema.suspend(() =>
  Schema.Struct({
    targetChangeType: Schema.optional(Schema.String),
    targetIds: Schema.optional(Schema.Array(Schema.Number)),
    cause: Schema.optional(Status),
    resumeToken: Schema.optional(Schema.String),
    readTime: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "TargetChange",
}) as any as Schema.Schema<TargetChange>;

export interface DocumentChange {
  /** The new state of the Document. If `mask` is set, contains only fields that were updated or added. */
  document?: Document;
  /** A set of target IDs of targets that match this document. */
  targetIds?: Array<number>;
  /** A set of target IDs for targets that no longer match this document. */
  removedTargetIds?: Array<number>;
}

export const DocumentChange: Schema.Schema<DocumentChange> = Schema.suspend(
  () =>
    Schema.Struct({
      document: Schema.optional(Document),
      targetIds: Schema.optional(Schema.Array(Schema.Number)),
      removedTargetIds: Schema.optional(Schema.Array(Schema.Number)),
    }),
).annotate({
  identifier: "DocumentChange",
}) as any as Schema.Schema<DocumentChange>;

export interface DocumentDelete {
  /** The resource name of the Document that was deleted. */
  document?: string;
  /** A set of target IDs for targets that previously matched this entity. */
  removedTargetIds?: Array<number>;
  /** The read timestamp at which the delete was observed. Greater or equal to the `commit_time` of the delete. */
  readTime?: string;
}

export const DocumentDelete: Schema.Schema<DocumentDelete> = Schema.suspend(
  () =>
    Schema.Struct({
      document: Schema.optional(Schema.String),
      removedTargetIds: Schema.optional(Schema.Array(Schema.Number)),
      readTime: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "DocumentDelete",
}) as any as Schema.Schema<DocumentDelete>;

export interface DocumentRemove {
  /** The resource name of the Document that has gone out of view. */
  document?: string;
  /** A set of target IDs for targets that previously matched this document. */
  removedTargetIds?: Array<number>;
  /** The read timestamp at which the remove was observed. Greater or equal to the `commit_time` of the change/delete/remove. */
  readTime?: string;
}

export const DocumentRemove: Schema.Schema<DocumentRemove> = Schema.suspend(
  () =>
    Schema.Struct({
      document: Schema.optional(Schema.String),
      removedTargetIds: Schema.optional(Schema.Array(Schema.Number)),
      readTime: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "DocumentRemove",
}) as any as Schema.Schema<DocumentRemove>;

export interface BitSequence {
  /** The bytes that encode the bit sequence. May have a length of zero. */
  bitmap?: string;
  /** The number of bits of the last byte in `bitmap` to ignore as "padding". If the length of `bitmap` is zero, then this value must be `0`. Otherwise, this value must be between 0 and 7, inclusive. */
  padding?: number;
}

export const BitSequence: Schema.Schema<BitSequence> = Schema.suspend(() =>
  Schema.Struct({
    bitmap: Schema.optional(Schema.String),
    padding: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "BitSequence" }) as any as Schema.Schema<BitSequence>;

export interface BloomFilter {
  /** The bloom filter data. */
  bits?: BitSequence;
  /** The number of hashes used by the algorithm. */
  hashCount?: number;
}

export const BloomFilter: Schema.Schema<BloomFilter> = Schema.suspend(() =>
  Schema.Struct({
    bits: Schema.optional(BitSequence),
    hashCount: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "BloomFilter" }) as any as Schema.Schema<BloomFilter>;

export interface ExistenceFilter {
  /** The target ID to which this filter applies. */
  targetId?: number;
  /** The total count of documents that match target_id. If different from the count of documents in the client that match, the client must manually determine which documents no longer match the target. The client can use the `unchanged_names` bloom filter to assist with this determination by testing ALL the document names against the filter; if the document name is NOT in the filter, it means the document no longer matches the target. */
  count?: number;
  /** A bloom filter that, despite its name, contains the UTF-8 byte encodings of the resource names of ALL the documents that match target_id, in the form `projects/{project_id}/databases/{database_id}/documents/{document_path}`. This bloom filter may be omitted at the server's discretion, such as if it is deemed that the client will not make use of it or if it is too computationally expensive to calculate or transmit. Clients must gracefully handle this field being absent by falling back to the logic used before this field existed; that is, re-add the target without a resume token to figure out which documents in the client's cache are out of sync. */
  unchangedNames?: BloomFilter;
}

export const ExistenceFilter: Schema.Schema<ExistenceFilter> = Schema.suspend(
  () =>
    Schema.Struct({
      targetId: Schema.optional(Schema.Number),
      count: Schema.optional(Schema.Number),
      unchangedNames: Schema.optional(BloomFilter),
    }),
).annotate({
  identifier: "ExistenceFilter",
}) as any as Schema.Schema<ExistenceFilter>;

export interface ListenResponse {
  /** Targets have changed. */
  targetChange?: TargetChange;
  /** A Document has changed. */
  documentChange?: DocumentChange;
  /** A Document has been deleted. */
  documentDelete?: DocumentDelete;
  /** A Document has been removed from a target (because it is no longer relevant to that target). */
  documentRemove?: DocumentRemove;
  /** A filter to apply to the set of documents previously returned for the given target. Returned when documents may have been removed from the given target, but the exact documents are unknown. */
  filter?: ExistenceFilter;
}

export const ListenResponse: Schema.Schema<ListenResponse> = Schema.suspend(
  () =>
    Schema.Struct({
      targetChange: Schema.optional(TargetChange),
      documentChange: Schema.optional(DocumentChange),
      documentDelete: Schema.optional(DocumentDelete),
      documentRemove: Schema.optional(DocumentRemove),
      filter: Schema.optional(ExistenceFilter),
    }),
).annotate({
  identifier: "ListenResponse",
}) as any as Schema.Schema<ListenResponse>;

export interface ListCollectionIdsRequest {
  /** The maximum number of results to return. */
  pageSize?: number;
  /** A page token. Must be a value from ListCollectionIdsResponse. */
  pageToken?: string;
  /** Reads documents as they were at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
}

export const ListCollectionIdsRequest: Schema.Schema<ListCollectionIdsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      pageSize: Schema.optional(Schema.Number),
      pageToken: Schema.optional(Schema.String),
      readTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCollectionIdsRequest",
  }) as any as Schema.Schema<ListCollectionIdsRequest>;

export interface ListCollectionIdsResponse {
  /** The collection ids. */
  collectionIds?: Array<string>;
  /** A page token that may be used to continue the list. */
  nextPageToken?: string;
}

export const ListCollectionIdsResponse: Schema.Schema<ListCollectionIdsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      collectionIds: Schema.optional(Schema.Array(Schema.String)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListCollectionIdsResponse",
  }) as any as Schema.Schema<ListCollectionIdsResponse>;

export interface BatchWriteRequest {
  /** The writes to apply. Method does not apply writes atomically and does not guarantee ordering. Each write succeeds or fails independently. You cannot write to the same document more than once per request. */
  writes?: Array<Write>;
  /** Labels associated with this batch write. */
  labels?: Record<string, string>;
}

export const BatchWriteRequest: Schema.Schema<BatchWriteRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      writes: Schema.optional(Schema.Array(Write)),
      labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    }),
  ).annotate({
    identifier: "BatchWriteRequest",
  }) as any as Schema.Schema<BatchWriteRequest>;

export interface BatchWriteResponse {
  /** The result of applying the writes. This i-th write result corresponds to the i-th write in the request. */
  writeResults?: Array<WriteResult>;
  /** The status of applying the writes. This i-th write status corresponds to the i-th write in the request. */
  status?: Array<Status>;
}

export const BatchWriteResponse: Schema.Schema<BatchWriteResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      writeResults: Schema.optional(Schema.Array(WriteResult)),
      status: Schema.optional(Schema.Array(Status)),
    }),
  ).annotate({
    identifier: "BatchWriteResponse",
  }) as any as Schema.Schema<BatchWriteResponse>;

export interface GoogleFirestoreAdminV1beta1Progress {
  /** An estimate of how much work has been completed. Note that this may be greater than `work_estimated`. */
  workCompleted?: string;
  /** An estimate of how much work needs to be performed. Zero if the work estimate is unavailable. May change as work progresses. */
  workEstimated?: string;
}

export const GoogleFirestoreAdminV1beta1Progress: Schema.Schema<GoogleFirestoreAdminV1beta1Progress> =
  Schema.suspend(() =>
    Schema.Struct({
      workCompleted: Schema.optional(Schema.String),
      workEstimated: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta1Progress",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta1Progress>;

export interface GoogleFirestoreAdminV1beta1IndexOperationMetadata {
  /** The time that work began on the operation. */
  startTime?: string;
  /** The time the operation ended, either successfully or otherwise. Unset if the operation is still active. */
  endTime?: string;
  /** The index resource that this operation is acting on. For example: `projects/{project_id}/databases/{database_id}/indexes/{index_id}` */
  index?: string;
  /** The type of index operation. */
  operationType?:
    | "OPERATION_TYPE_UNSPECIFIED"
    | "CREATING_INDEX"
    | (string & {});
  /** True if the [google.longrunning.Operation] was cancelled. If the cancellation is in progress, cancelled will be true but google.longrunning.Operation.done will be false. */
  cancelled?: boolean;
  /** Progress of the existing operation, measured in number of documents. */
  documentProgress?: GoogleFirestoreAdminV1beta1Progress;
}

export const GoogleFirestoreAdminV1beta1IndexOperationMetadata: Schema.Schema<GoogleFirestoreAdminV1beta1IndexOperationMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      index: Schema.optional(Schema.String),
      operationType: Schema.optional(Schema.String),
      cancelled: Schema.optional(Schema.Boolean),
      documentProgress: Schema.optional(GoogleFirestoreAdminV1beta1Progress),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta1IndexOperationMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta1IndexOperationMetadata>;

export interface GoogleFirestoreAdminV1beta1LocationMetadata {}

export const GoogleFirestoreAdminV1beta1LocationMetadata: Schema.Schema<GoogleFirestoreAdminV1beta1LocationMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleFirestoreAdminV1beta1LocationMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta1LocationMetadata>;

export interface GoogleFirestoreAdminV1beta1ExportDocumentsMetadata {
  /** The time that work began on the operation. */
  startTime?: string;
  /** The time the operation ended, either successfully or otherwise. Unset if the operation is still active. */
  endTime?: string;
  /** The state of the export operation. */
  operationState?:
    | "STATE_UNSPECIFIED"
    | "INITIALIZING"
    | "PROCESSING"
    | "CANCELLING"
    | "FINALIZING"
    | "SUCCESSFUL"
    | "FAILED"
    | "CANCELLED"
    | (string & {});
  /** An estimate of the number of documents processed. */
  progressDocuments?: GoogleFirestoreAdminV1beta1Progress;
  /** An estimate of the number of bytes processed. */
  progressBytes?: GoogleFirestoreAdminV1beta1Progress;
  /** Which collection ids are being exported. */
  collectionIds?: Array<string>;
  /** Where the entities are being exported to. */
  outputUriPrefix?: string;
}

export const GoogleFirestoreAdminV1beta1ExportDocumentsMetadata: Schema.Schema<GoogleFirestoreAdminV1beta1ExportDocumentsMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      operationState: Schema.optional(Schema.String),
      progressDocuments: Schema.optional(GoogleFirestoreAdminV1beta1Progress),
      progressBytes: Schema.optional(GoogleFirestoreAdminV1beta1Progress),
      collectionIds: Schema.optional(Schema.Array(Schema.String)),
      outputUriPrefix: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta1ExportDocumentsMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta1ExportDocumentsMetadata>;

export interface GoogleFirestoreAdminV1beta1ImportDocumentsMetadata {
  /** The time that work began on the operation. */
  startTime?: string;
  /** The time the operation ended, either successfully or otherwise. Unset if the operation is still active. */
  endTime?: string;
  /** The state of the import operation. */
  operationState?:
    | "STATE_UNSPECIFIED"
    | "INITIALIZING"
    | "PROCESSING"
    | "CANCELLING"
    | "FINALIZING"
    | "SUCCESSFUL"
    | "FAILED"
    | "CANCELLED"
    | (string & {});
  /** An estimate of the number of documents processed. */
  progressDocuments?: GoogleFirestoreAdminV1beta1Progress;
  /** An estimate of the number of bytes processed. */
  progressBytes?: GoogleFirestoreAdminV1beta1Progress;
  /** Which collection ids are being imported. */
  collectionIds?: Array<string>;
  /** The location of the documents being imported. */
  inputUriPrefix?: string;
}

export const GoogleFirestoreAdminV1beta1ImportDocumentsMetadata: Schema.Schema<GoogleFirestoreAdminV1beta1ImportDocumentsMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      operationState: Schema.optional(Schema.String),
      progressDocuments: Schema.optional(GoogleFirestoreAdminV1beta1Progress),
      progressBytes: Schema.optional(GoogleFirestoreAdminV1beta1Progress),
      collectionIds: Schema.optional(Schema.Array(Schema.String)),
      inputUriPrefix: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta1ImportDocumentsMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta1ImportDocumentsMetadata>;

export interface GoogleFirestoreAdminV1beta1ExportDocumentsResponse {
  /** Location of the output files. This can be used to begin an import into Cloud Firestore (this project or another project) after the operation completes successfully. */
  outputUriPrefix?: string;
}

export const GoogleFirestoreAdminV1beta1ExportDocumentsResponse: Schema.Schema<GoogleFirestoreAdminV1beta1ExportDocumentsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      outputUriPrefix: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1beta1ExportDocumentsResponse",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1beta1ExportDocumentsResponse>;

export interface GoogleFirestoreAdminV1Progress {
  /** The amount of work estimated. */
  estimatedWork?: string;
  /** The amount of work completed. */
  completedWork?: string;
}

export const GoogleFirestoreAdminV1Progress: Schema.Schema<GoogleFirestoreAdminV1Progress> =
  Schema.suspend(() =>
    Schema.Struct({
      estimatedWork: Schema.optional(Schema.String),
      completedWork: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1Progress",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1Progress>;

export interface GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata {
  /** The time this operation started. */
  startTime?: string;
  /** The time this operation completed. Will be unset if operation still in progress. */
  endTime?: string;
  /** The state of the operation. */
  operationState?:
    | "OPERATION_STATE_UNSPECIFIED"
    | "INITIALIZING"
    | "PROCESSING"
    | "CANCELLING"
    | "FINALIZING"
    | "SUCCESSFUL"
    | "FAILED"
    | "CANCELLED"
    | (string & {});
  /** The progress, in documents, of this operation. */
  progressDocuments?: GoogleFirestoreAdminV1Progress;
  /** The progress, in bytes, of this operation. */
  progressBytes?: GoogleFirestoreAdminV1Progress;
  /** The IDs of the collection groups that are being deleted. */
  collectionIds?: Array<string>;
  /** Which namespace IDs are being deleted. */
  namespaceIds?: Array<string>;
  /** The timestamp that corresponds to the version of the database that is being read to get the list of documents to delete. This time can also be used as the timestamp of PITR in case of disaster recovery (subject to PITR window limit). */
  snapshotTime?: string;
}

export const GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata: Schema.Schema<GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      operationState: Schema.optional(Schema.String),
      progressDocuments: Schema.optional(GoogleFirestoreAdminV1Progress),
      progressBytes: Schema.optional(GoogleFirestoreAdminV1Progress),
      collectionIds: Schema.optional(Schema.Array(Schema.String)),
      namespaceIds: Schema.optional(Schema.Array(Schema.String)),
      snapshotTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata>;

export interface GoogleFirestoreAdminV1CreateDatabaseMetadata {}

export const GoogleFirestoreAdminV1CreateDatabaseMetadata: Schema.Schema<GoogleFirestoreAdminV1CreateDatabaseMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleFirestoreAdminV1CreateDatabaseMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1CreateDatabaseMetadata>;

export interface GoogleFirestoreAdminV1DeleteDatabaseMetadata {}

export const GoogleFirestoreAdminV1DeleteDatabaseMetadata: Schema.Schema<GoogleFirestoreAdminV1DeleteDatabaseMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleFirestoreAdminV1DeleteDatabaseMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1DeleteDatabaseMetadata>;

export interface GoogleFirestoreAdminV1UpdateDatabaseMetadata {}

export const GoogleFirestoreAdminV1UpdateDatabaseMetadata: Schema.Schema<GoogleFirestoreAdminV1UpdateDatabaseMetadata> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "GoogleFirestoreAdminV1UpdateDatabaseMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1UpdateDatabaseMetadata>;

export interface GoogleFirestoreAdminV1RestoreDatabaseMetadata {
  /** The time the restore was started. */
  startTime?: string;
  /** The time the restore finished, unset for ongoing restores. */
  endTime?: string;
  /** The operation state of the restore. */
  operationState?:
    | "OPERATION_STATE_UNSPECIFIED"
    | "INITIALIZING"
    | "PROCESSING"
    | "CANCELLING"
    | "FINALIZING"
    | "SUCCESSFUL"
    | "FAILED"
    | "CANCELLED"
    | (string & {});
  /** The name of the database being restored to. */
  database?: string;
  /** The name of the backup restoring from. */
  backup?: string;
  /** How far along the restore is as an estimated percentage of remaining time. */
  progressPercentage?: GoogleFirestoreAdminV1Progress;
}

export const GoogleFirestoreAdminV1RestoreDatabaseMetadata: Schema.Schema<GoogleFirestoreAdminV1RestoreDatabaseMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      operationState: Schema.optional(Schema.String),
      database: Schema.optional(Schema.String),
      backup: Schema.optional(Schema.String),
      progressPercentage: Schema.optional(GoogleFirestoreAdminV1Progress),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1RestoreDatabaseMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1RestoreDatabaseMetadata>;

export interface GoogleFirestoreAdminV1PitrSnapshot {
  /** Required. The name of the database that this was a snapshot of. Format: `projects/{project}/databases/{database}`. */
  database?: string;
  /** Output only. Public UUID of the database the snapshot was associated with. */
  databaseUid?: string;
  /** Required. Snapshot time of the database. */
  snapshotTime?: string;
}

export const GoogleFirestoreAdminV1PitrSnapshot: Schema.Schema<GoogleFirestoreAdminV1PitrSnapshot> =
  Schema.suspend(() =>
    Schema.Struct({
      database: Schema.optional(Schema.String),
      databaseUid: Schema.optional(Schema.String),
      snapshotTime: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1PitrSnapshot",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1PitrSnapshot>;

export interface GoogleFirestoreAdminV1CloneDatabaseMetadata {
  /** The time the clone was started. */
  startTime?: string;
  /** The time the clone finished, unset for ongoing clones. */
  endTime?: string;
  /** The operation state of the clone. */
  operationState?:
    | "OPERATION_STATE_UNSPECIFIED"
    | "INITIALIZING"
    | "PROCESSING"
    | "CANCELLING"
    | "FINALIZING"
    | "SUCCESSFUL"
    | "FAILED"
    | "CANCELLED"
    | (string & {});
  /** The name of the database being cloned to. */
  database?: string;
  /** The snapshot from which this database was cloned. */
  pitrSnapshot?: GoogleFirestoreAdminV1PitrSnapshot;
  /** How far along the clone is as an estimated percentage of remaining time. */
  progressPercentage?: GoogleFirestoreAdminV1Progress;
}

export const GoogleFirestoreAdminV1CloneDatabaseMetadata: Schema.Schema<GoogleFirestoreAdminV1CloneDatabaseMetadata> =
  Schema.suspend(() =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
      operationState: Schema.optional(Schema.String),
      database: Schema.optional(Schema.String),
      pitrSnapshot: Schema.optional(GoogleFirestoreAdminV1PitrSnapshot),
      progressPercentage: Schema.optional(GoogleFirestoreAdminV1Progress),
    }),
  ).annotate({
    identifier: "GoogleFirestoreAdminV1CloneDatabaseMetadata",
  }) as any as Schema.Schema<GoogleFirestoreAdminV1CloneDatabaseMetadata>;

// ==========================================================================
// Operations
// ==========================================================================

export interface ExportDocumentsProjectsDatabasesRequest {
  /** Database to export. Should be of the form: `projects/{project_id}/databases/{database_id}`. */
  name: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1beta1ExportDocumentsRequest;
}

export const ExportDocumentsProjectsDatabasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleFirestoreAdminV1beta1ExportDocumentsRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}:exportDocuments",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ExportDocumentsProjectsDatabasesRequest>;

export type ExportDocumentsProjectsDatabasesResponse =
  GoogleLongrunningOperation;
export const ExportDocumentsProjectsDatabasesResponse =
  GoogleLongrunningOperation;

export type ExportDocumentsProjectsDatabasesError = DefaultErrors;

/** Exports a copy of all or a subset of documents from Google Cloud Firestore to another storage system, such as Google Cloud Storage. Recent updates to documents may not be reflected in the export. The export occurs in the background and its progress can be monitored and managed via the Operation resource that is created. The output of an export may only be used once the associated operation is done. If an export operation is cancelled before completion it may leave partial data behind in Google Cloud Storage. */
export const exportDocumentsProjectsDatabases: API.OperationMethod<
  ExportDocumentsProjectsDatabasesRequest,
  ExportDocumentsProjectsDatabasesResponse,
  ExportDocumentsProjectsDatabasesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ExportDocumentsProjectsDatabasesRequest,
  output: ExportDocumentsProjectsDatabasesResponse,
  errors: [],
}));

export interface ImportDocumentsProjectsDatabasesRequest {
  /** Database to import into. Should be of the form: `projects/{project_id}/databases/{database_id}`. */
  name: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1beta1ImportDocumentsRequest;
}

export const ImportDocumentsProjectsDatabasesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleFirestoreAdminV1beta1ImportDocumentsRequest).pipe(
    T.HttpBody(),
  ),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}:importDocuments",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ImportDocumentsProjectsDatabasesRequest>;

export type ImportDocumentsProjectsDatabasesResponse =
  GoogleLongrunningOperation;
export const ImportDocumentsProjectsDatabasesResponse =
  GoogleLongrunningOperation;

export type ImportDocumentsProjectsDatabasesError = DefaultErrors;

/** Imports documents into Google Cloud Firestore. Existing documents with the same name are overwritten. The import occurs in the background and its progress can be monitored and managed via the Operation resource that is created. If an ImportDocuments operation is cancelled, it is possible that a subset of the data has already been imported to Cloud Firestore. */
export const importDocumentsProjectsDatabases: API.OperationMethod<
  ImportDocumentsProjectsDatabasesRequest,
  ImportDocumentsProjectsDatabasesResponse,
  ImportDocumentsProjectsDatabasesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ImportDocumentsProjectsDatabasesRequest,
  output: ImportDocumentsProjectsDatabasesResponse,
  errors: [],
}));

export interface CreateProjectsDatabasesIndexesRequest {
  /** The name of the database this index will apply to. For example: `projects/{project_id}/databases/{database_id}` */
  parent: string;
  /** Request body */
  body?: GoogleFirestoreAdminV1beta1Index;
}

export const CreateProjectsDatabasesIndexesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleFirestoreAdminV1beta1Index).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/indexes",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsDatabasesIndexesRequest>;

export type CreateProjectsDatabasesIndexesResponse = GoogleLongrunningOperation;
export const CreateProjectsDatabasesIndexesResponse =
  GoogleLongrunningOperation;

export type CreateProjectsDatabasesIndexesError = DefaultErrors;

/** Creates the specified index. A newly created index's initial state is `CREATING`. On completion of the returned google.longrunning.Operation, the state will be `READY`. If the index already exists, the call will return an `ALREADY_EXISTS` status. During creation, the process could result in an error, in which case the index will move to the `ERROR` state. The process can be recovered by fixing the data that caused the error, removing the index with delete, then re-creating the index with create. Indexes with a single field cannot be created. */
export const createProjectsDatabasesIndexes: API.OperationMethod<
  CreateProjectsDatabasesIndexesRequest,
  CreateProjectsDatabasesIndexesResponse,
  CreateProjectsDatabasesIndexesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsDatabasesIndexesRequest,
  output: CreateProjectsDatabasesIndexesResponse,
  errors: [],
}));

export interface ListProjectsDatabasesIndexesRequest {
  /** The database name. For example: `projects/{project_id}/databases/{database_id}` */
  parent: string;
  filter?: string;
  /** The standard List page size. */
  pageSize?: number;
  /** The standard List page token. */
  pageToken?: string;
}

export const ListProjectsDatabasesIndexesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/indexes",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsDatabasesIndexesRequest>;

export type ListProjectsDatabasesIndexesResponse =
  GoogleFirestoreAdminV1beta1ListIndexesResponse;
export const ListProjectsDatabasesIndexesResponse =
  GoogleFirestoreAdminV1beta1ListIndexesResponse;

export type ListProjectsDatabasesIndexesError = DefaultErrors;

/** Lists the indexes that match the specified filters. */
export const listProjectsDatabasesIndexes: API.PaginatedOperationMethod<
  ListProjectsDatabasesIndexesRequest,
  ListProjectsDatabasesIndexesResponse,
  ListProjectsDatabasesIndexesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsDatabasesIndexesRequest,
  output: ListProjectsDatabasesIndexesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsDatabasesIndexesRequest {
  /** The name of the index. For example: `projects/{project_id}/databases/{database_id}/indexes/{index_id}` */
  name: string;
}

export const GetProjectsDatabasesIndexesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/indexes/{indexesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsDatabasesIndexesRequest>;

export type GetProjectsDatabasesIndexesResponse =
  GoogleFirestoreAdminV1beta1Index;
export const GetProjectsDatabasesIndexesResponse =
  GoogleFirestoreAdminV1beta1Index;

export type GetProjectsDatabasesIndexesError = DefaultErrors;

/** Gets an index. */
export const getProjectsDatabasesIndexes: API.OperationMethod<
  GetProjectsDatabasesIndexesRequest,
  GetProjectsDatabasesIndexesResponse,
  GetProjectsDatabasesIndexesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsDatabasesIndexesRequest,
  output: GetProjectsDatabasesIndexesResponse,
  errors: [],
}));

export interface DeleteProjectsDatabasesIndexesRequest {
  /** The index name. For example: `projects/{project_id}/databases/{database_id}/indexes/{index_id}` */
  name: string;
}

export const DeleteProjectsDatabasesIndexesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/indexes/{indexesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsDatabasesIndexesRequest>;

export type DeleteProjectsDatabasesIndexesResponse = Empty;
export const DeleteProjectsDatabasesIndexesResponse = Empty;

export type DeleteProjectsDatabasesIndexesError = DefaultErrors;

/** Deletes an index. */
export const deleteProjectsDatabasesIndexes: API.OperationMethod<
  DeleteProjectsDatabasesIndexesRequest,
  DeleteProjectsDatabasesIndexesResponse,
  DeleteProjectsDatabasesIndexesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsDatabasesIndexesRequest,
  output: DeleteProjectsDatabasesIndexesResponse,
  errors: [],
}));

export interface GetProjectsDatabasesDocumentsRequest {
  /** Required. The resource name of the Document to get. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. */
  name: string;
  /** The list of field paths in the mask. See Document.fields for a field path syntax reference. */
  "mask.fieldPaths"?: string[];
  /** Reads the document in a transaction. */
  transaction?: string;
  /** Reads the version of the document at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
}

export const GetProjectsDatabasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "mask.fieldPaths": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("mask.fieldPaths"),
  ),
  transaction: Schema.optional(Schema.String).pipe(T.HttpQuery("transaction")),
  readTime: Schema.optional(Schema.String).pipe(T.HttpQuery("readTime")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsDatabasesDocumentsRequest>;

export type GetProjectsDatabasesDocumentsResponse = Document;
export const GetProjectsDatabasesDocumentsResponse = Document;

export type GetProjectsDatabasesDocumentsError = DefaultErrors;

/** Gets a single document. */
export const getProjectsDatabasesDocuments: API.OperationMethod<
  GetProjectsDatabasesDocumentsRequest,
  GetProjectsDatabasesDocumentsResponse,
  GetProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsDatabasesDocumentsRequest,
  output: GetProjectsDatabasesDocumentsResponse,
  errors: [],
}));

export interface ListProjectsDatabasesDocumentsRequest {
  /** Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` */
  parent: string;
  /** Optional. The collection ID, relative to `parent`, to list. For example: `chatrooms` or `messages`. This is optional, and when not provided, Firestore will list documents from all collections under the provided `parent`. */
  collectionId: string;
  /** Optional. The maximum number of documents to return in a single response. Firestore may return fewer than this value. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListDocuments` response. Provide this to retrieve the subsequent page. When paginating, all other parameters (with the exception of `page_size`) must match the values set in the request that generated the page token. */
  pageToken?: string;
  /** Optional. The optional ordering of the documents to return. For example: `priority desc, __name__ desc`. This mirrors the `ORDER BY` used in Firestore queries but in a string representation. When absent, documents are ordered based on `__name__ ASC`. */
  orderBy?: string;
  /** The list of field paths in the mask. See Document.fields for a field path syntax reference. */
  "mask.fieldPaths"?: string[];
  /** Perform the read as part of an already active transaction. */
  transaction?: string;
  /** Perform the read at the provided time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
  /** If the list should show missing documents. A document is missing if it does not exist, but there are sub-documents nested underneath it. When true, such missing documents will be returned with a key but will not have fields, `create_time`, or `update_time` set. Requests with `show_missing` may not specify `where` or `order_by`. */
  showMissing?: boolean;
}

export const ListProjectsDatabasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  collectionId: Schema.String.pipe(T.HttpPath("collectionId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  "mask.fieldPaths": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("mask.fieldPaths"),
  ),
  transaction: Schema.optional(Schema.String).pipe(T.HttpQuery("transaction")),
  readTime: Schema.optional(Schema.String).pipe(T.HttpQuery("readTime")),
  showMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showMissing")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}/{collectionId}",
  }),
  svc,
) as unknown as Schema.Schema<ListProjectsDatabasesDocumentsRequest>;

export type ListProjectsDatabasesDocumentsResponse = ListDocumentsResponse;
export const ListProjectsDatabasesDocumentsResponse = ListDocumentsResponse;

export type ListProjectsDatabasesDocumentsError = DefaultErrors;

/** Lists documents. */
export const listProjectsDatabasesDocuments: API.PaginatedOperationMethod<
  ListProjectsDatabasesDocumentsRequest,
  ListProjectsDatabasesDocumentsResponse,
  ListProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsDatabasesDocumentsRequest,
  output: ListProjectsDatabasesDocumentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface ListDocumentsProjectsDatabasesDocumentsRequest {
  /** Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` */
  parent: string;
  /** Optional. The collection ID, relative to `parent`, to list. For example: `chatrooms` or `messages`. This is optional, and when not provided, Firestore will list documents from all collections under the provided `parent`. */
  collectionId: string;
  /** Optional. The maximum number of documents to return in a single response. Firestore may return fewer than this value. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListDocuments` response. Provide this to retrieve the subsequent page. When paginating, all other parameters (with the exception of `page_size`) must match the values set in the request that generated the page token. */
  pageToken?: string;
  /** Optional. The optional ordering of the documents to return. For example: `priority desc, __name__ desc`. This mirrors the `ORDER BY` used in Firestore queries but in a string representation. When absent, documents are ordered based on `__name__ ASC`. */
  orderBy?: string;
  /** The list of field paths in the mask. See Document.fields for a field path syntax reference. */
  "mask.fieldPaths"?: string[];
  /** Perform the read as part of an already active transaction. */
  transaction?: string;
  /** Perform the read at the provided time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. */
  readTime?: string;
  /** If the list should show missing documents. A document is missing if it does not exist, but there are sub-documents nested underneath it. When true, such missing documents will be returned with a key but will not have fields, `create_time`, or `update_time` set. Requests with `show_missing` may not specify `where` or `order_by`. */
  showMissing?: boolean;
}

export const ListDocumentsProjectsDatabasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  collectionId: Schema.String.pipe(T.HttpPath("collectionId")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  "mask.fieldPaths": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("mask.fieldPaths"),
  ),
  transaction: Schema.optional(Schema.String).pipe(T.HttpQuery("transaction")),
  readTime: Schema.optional(Schema.String).pipe(T.HttpQuery("readTime")),
  showMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showMissing")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents/{collectionId}",
  }),
  svc,
) as unknown as Schema.Schema<ListDocumentsProjectsDatabasesDocumentsRequest>;

export type ListDocumentsProjectsDatabasesDocumentsResponse =
  ListDocumentsResponse;
export const ListDocumentsProjectsDatabasesDocumentsResponse =
  ListDocumentsResponse;

export type ListDocumentsProjectsDatabasesDocumentsError = DefaultErrors;

/** Lists documents. */
export const listDocumentsProjectsDatabasesDocuments: API.PaginatedOperationMethod<
  ListDocumentsProjectsDatabasesDocumentsRequest,
  ListDocumentsProjectsDatabasesDocumentsResponse,
  ListDocumentsProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListDocumentsProjectsDatabasesDocumentsRequest,
  output: ListDocumentsProjectsDatabasesDocumentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface PatchProjectsDatabasesDocumentsRequest {
  /** The resource name of the document, for example `projects/{project_id}/databases/{database_id}/documents/{document_path}`. */
  name: string;
  /** The list of field paths in the mask. See Document.fields for a field path syntax reference. */
  "updateMask.fieldPaths"?: string[];
  /** The list of field paths in the mask. See Document.fields for a field path syntax reference. */
  "mask.fieldPaths"?: string[];
  /** When set to `true`, the target document must exist. When set to `false`, the target document must not exist. */
  "currentDocument.exists"?: boolean;
  /** When set, the target document must exist and have been last updated at that time. Timestamp must be microsecond aligned. */
  "currentDocument.updateTime"?: string;
  /** Request body */
  body?: Document;
}

export const PatchProjectsDatabasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "updateMask.fieldPaths": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("updateMask.fieldPaths"),
  ),
  "mask.fieldPaths": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("mask.fieldPaths"),
  ),
  "currentDocument.exists": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("currentDocument.exists"),
  ),
  "currentDocument.updateTime": Schema.optional(Schema.String).pipe(
    T.HttpQuery("currentDocument.updateTime"),
  ),
  body: Schema.optional(Document).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsDatabasesDocumentsRequest>;

export type PatchProjectsDatabasesDocumentsResponse = Document;
export const PatchProjectsDatabasesDocumentsResponse = Document;

export type PatchProjectsDatabasesDocumentsError = DefaultErrors;

/** Updates or inserts a document. */
export const patchProjectsDatabasesDocuments: API.OperationMethod<
  PatchProjectsDatabasesDocumentsRequest,
  PatchProjectsDatabasesDocumentsResponse,
  PatchProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsDatabasesDocumentsRequest,
  output: PatchProjectsDatabasesDocumentsResponse,
  errors: [],
}));

export interface DeleteProjectsDatabasesDocumentsRequest {
  /** Required. The resource name of the Document to delete. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. */
  name: string;
  /** When set to `true`, the target document must exist. When set to `false`, the target document must not exist. */
  "currentDocument.exists"?: boolean;
  /** When set, the target document must exist and have been last updated at that time. Timestamp must be microsecond aligned. */
  "currentDocument.updateTime"?: string;
}

export const DeleteProjectsDatabasesDocumentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  "currentDocument.exists": Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("currentDocument.exists"),
  ),
  "currentDocument.updateTime": Schema.optional(Schema.String).pipe(
    T.HttpQuery("currentDocument.updateTime"),
  ),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsDatabasesDocumentsRequest>;

export type DeleteProjectsDatabasesDocumentsResponse = Empty;
export const DeleteProjectsDatabasesDocumentsResponse = Empty;

export type DeleteProjectsDatabasesDocumentsError = DefaultErrors;

/** Deletes a document. */
export const deleteProjectsDatabasesDocuments: API.OperationMethod<
  DeleteProjectsDatabasesDocumentsRequest,
  DeleteProjectsDatabasesDocumentsResponse,
  DeleteProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsDatabasesDocumentsRequest,
  output: DeleteProjectsDatabasesDocumentsResponse,
  errors: [],
}));

export interface BatchGetProjectsDatabasesDocumentsRequest {
  /** Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. */
  database: string;
  /** Request body */
  body?: BatchGetDocumentsRequest;
}

export const BatchGetProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(BatchGetDocumentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents:batchGet",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<BatchGetProjectsDatabasesDocumentsRequest>;

export type BatchGetProjectsDatabasesDocumentsResponse =
  BatchGetDocumentsResponse;
export const BatchGetProjectsDatabasesDocumentsResponse =
  BatchGetDocumentsResponse;

export type BatchGetProjectsDatabasesDocumentsError = DefaultErrors;

/** Gets multiple documents. Documents returned by this method are not guaranteed to be returned in the same order that they were requested. */
export const batchGetProjectsDatabasesDocuments: API.OperationMethod<
  BatchGetProjectsDatabasesDocumentsRequest,
  BatchGetProjectsDatabasesDocumentsResponse,
  BatchGetProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchGetProjectsDatabasesDocumentsRequest,
  output: BatchGetProjectsDatabasesDocumentsResponse,
  errors: [],
}));

export interface BeginTransactionProjectsDatabasesDocumentsRequest {
  /** Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. */
  database: string;
  /** Request body */
  body?: BeginTransactionRequest;
}

export const BeginTransactionProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(BeginTransactionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents:beginTransaction",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<BeginTransactionProjectsDatabasesDocumentsRequest>;

export type BeginTransactionProjectsDatabasesDocumentsResponse =
  BeginTransactionResponse;
export const BeginTransactionProjectsDatabasesDocumentsResponse =
  BeginTransactionResponse;

export type BeginTransactionProjectsDatabasesDocumentsError = DefaultErrors;

/** Starts a new transaction. */
export const beginTransactionProjectsDatabasesDocuments: API.OperationMethod<
  BeginTransactionProjectsDatabasesDocumentsRequest,
  BeginTransactionProjectsDatabasesDocumentsResponse,
  BeginTransactionProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BeginTransactionProjectsDatabasesDocumentsRequest,
  output: BeginTransactionProjectsDatabasesDocumentsResponse,
  errors: [],
}));

export interface CommitProjectsDatabasesDocumentsRequest {
  /** Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. */
  database: string;
  /** Request body */
  body?: CommitRequest;
}

export const CommitProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(CommitRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents:commit",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CommitProjectsDatabasesDocumentsRequest>;

export type CommitProjectsDatabasesDocumentsResponse = CommitResponse;
export const CommitProjectsDatabasesDocumentsResponse = CommitResponse;

export type CommitProjectsDatabasesDocumentsError = DefaultErrors;

/** Commits a transaction, while optionally updating documents. */
export const commitProjectsDatabasesDocuments: API.OperationMethod<
  CommitProjectsDatabasesDocumentsRequest,
  CommitProjectsDatabasesDocumentsResponse,
  CommitProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CommitProjectsDatabasesDocumentsRequest,
  output: CommitProjectsDatabasesDocumentsResponse,
  errors: [],
}));

export interface RollbackProjectsDatabasesDocumentsRequest {
  /** Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. */
  database: string;
  /** Request body */
  body?: RollbackRequest;
}

export const RollbackProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(RollbackRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents:rollback",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RollbackProjectsDatabasesDocumentsRequest>;

export type RollbackProjectsDatabasesDocumentsResponse = Empty;
export const RollbackProjectsDatabasesDocumentsResponse = Empty;

export type RollbackProjectsDatabasesDocumentsError = DefaultErrors;

/** Rolls back a transaction. */
export const rollbackProjectsDatabasesDocuments: API.OperationMethod<
  RollbackProjectsDatabasesDocumentsRequest,
  RollbackProjectsDatabasesDocumentsResponse,
  RollbackProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RollbackProjectsDatabasesDocumentsRequest,
  output: RollbackProjectsDatabasesDocumentsResponse,
  errors: [],
}));

export interface RunQueryProjectsDatabasesDocumentsRequest {
  /** Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` */
  parent: string;
  /** Request body */
  body?: RunQueryRequest;
}

export const RunQueryProjectsDatabasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(RunQueryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}:runQuery",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<RunQueryProjectsDatabasesDocumentsRequest>;

export type RunQueryProjectsDatabasesDocumentsResponse = RunQueryResponse;
export const RunQueryProjectsDatabasesDocumentsResponse = RunQueryResponse;

export type RunQueryProjectsDatabasesDocumentsError = DefaultErrors;

/** Runs a query. */
export const runQueryProjectsDatabasesDocuments: API.OperationMethod<
  RunQueryProjectsDatabasesDocumentsRequest,
  RunQueryProjectsDatabasesDocumentsResponse,
  RunQueryProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RunQueryProjectsDatabasesDocumentsRequest,
  output: RunQueryProjectsDatabasesDocumentsResponse,
  errors: [],
}));

export interface ExecutePipelineProjectsDatabasesDocumentsRequest {
  /** Required. Database identifier, in the form `projects/{project}/databases/{database}`. */
  database: string;
  /** Request body */
  body?: ExecutePipelineRequest;
}

export const ExecutePipelineProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(ExecutePipelineRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents:executePipeline",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ExecutePipelineProjectsDatabasesDocumentsRequest>;

export type ExecutePipelineProjectsDatabasesDocumentsResponse =
  ExecutePipelineResponse;
export const ExecutePipelineProjectsDatabasesDocumentsResponse =
  ExecutePipelineResponse;

export type ExecutePipelineProjectsDatabasesDocumentsError = DefaultErrors;

/** Executes a pipeline query. */
export const executePipelineProjectsDatabasesDocuments: API.OperationMethod<
  ExecutePipelineProjectsDatabasesDocumentsRequest,
  ExecutePipelineProjectsDatabasesDocumentsResponse,
  ExecutePipelineProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ExecutePipelineProjectsDatabasesDocumentsRequest,
  output: ExecutePipelineProjectsDatabasesDocumentsResponse,
  errors: [],
}));

export interface RunAggregationQueryProjectsDatabasesDocumentsRequest {
  /** Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` */
  parent: string;
  /** Request body */
  body?: RunAggregationQueryRequest;
}

export const RunAggregationQueryProjectsDatabasesDocumentsRequest =
  Schema.Struct({
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(RunAggregationQueryRequest).pipe(T.HttpBody()),
  }).pipe(
    T.Http({
      method: "POST",
      path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}:runAggregationQuery",
      hasBody: true,
    }),
    svc,
  ) as unknown as Schema.Schema<RunAggregationQueryProjectsDatabasesDocumentsRequest>;

export type RunAggregationQueryProjectsDatabasesDocumentsResponse =
  RunAggregationQueryResponse;
export const RunAggregationQueryProjectsDatabasesDocumentsResponse =
  RunAggregationQueryResponse;

export type RunAggregationQueryProjectsDatabasesDocumentsError = DefaultErrors;

/** Runs an aggregation query. Rather than producing Document results like Firestore.RunQuery, this API allows running an aggregation to produce a series of AggregationResult server-side. High-Level Example: ``` -- Return the number of documents in table given a filter. SELECT COUNT(*) FROM ( SELECT * FROM k where a = true ); ``` */
export const runAggregationQueryProjectsDatabasesDocuments: API.OperationMethod<
  RunAggregationQueryProjectsDatabasesDocumentsRequest,
  RunAggregationQueryProjectsDatabasesDocumentsResponse,
  RunAggregationQueryProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: RunAggregationQueryProjectsDatabasesDocumentsRequest,
  output: RunAggregationQueryProjectsDatabasesDocumentsResponse,
  errors: [],
}));

export interface PartitionQueryProjectsDatabasesDocumentsRequest {
  /** Required. The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents`. Document resource names are not supported; only database resource names can be specified. */
  parent: string;
  /** Request body */
  body?: PartitionQueryRequest;
}

export const PartitionQueryProjectsDatabasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(PartitionQueryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}:partitionQuery",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PartitionQueryProjectsDatabasesDocumentsRequest>;

export type PartitionQueryProjectsDatabasesDocumentsResponse =
  PartitionQueryResponse;
export const PartitionQueryProjectsDatabasesDocumentsResponse =
  PartitionQueryResponse;

export type PartitionQueryProjectsDatabasesDocumentsError = DefaultErrors;

/** Partitions a query by returning partition cursors that can be used to run the query in parallel. The returned partition cursors are split points that can be used by RunQuery as starting/end points for the query results. */
export const partitionQueryProjectsDatabasesDocuments: API.OperationMethod<
  PartitionQueryProjectsDatabasesDocumentsRequest,
  PartitionQueryProjectsDatabasesDocumentsResponse,
  PartitionQueryProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PartitionQueryProjectsDatabasesDocumentsRequest,
  output: PartitionQueryProjectsDatabasesDocumentsResponse,
  errors: [],
}));

export interface WriteProjectsDatabasesDocumentsRequest {
  /** Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. This is only required in the first message. */
  database: string;
  /** Request body */
  body?: WriteRequest;
}

export const WriteProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(WriteRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents:write",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<WriteProjectsDatabasesDocumentsRequest>;

export type WriteProjectsDatabasesDocumentsResponse = WriteResponse;
export const WriteProjectsDatabasesDocumentsResponse = WriteResponse;

export type WriteProjectsDatabasesDocumentsError = DefaultErrors;

/** Streams batches of document updates and deletes, in order. This method is only available via gRPC or WebChannel (not REST). */
export const writeProjectsDatabasesDocuments: API.OperationMethod<
  WriteProjectsDatabasesDocumentsRequest,
  WriteProjectsDatabasesDocumentsResponse,
  WriteProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: WriteProjectsDatabasesDocumentsRequest,
  output: WriteProjectsDatabasesDocumentsResponse,
  errors: [],
}));

export interface ListenProjectsDatabasesDocumentsRequest {
  /** Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. */
  database: string;
  /** Request body */
  body?: ListenRequest;
}

export const ListenProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(ListenRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents:listen",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ListenProjectsDatabasesDocumentsRequest>;

export type ListenProjectsDatabasesDocumentsResponse = ListenResponse;
export const ListenProjectsDatabasesDocumentsResponse = ListenResponse;

export type ListenProjectsDatabasesDocumentsError = DefaultErrors;

/** Listens to changes. This method is only available via gRPC or WebChannel (not REST). */
export const listenProjectsDatabasesDocuments: API.OperationMethod<
  ListenProjectsDatabasesDocumentsRequest,
  ListenProjectsDatabasesDocumentsResponse,
  ListenProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListenProjectsDatabasesDocumentsRequest,
  output: ListenProjectsDatabasesDocumentsResponse,
  errors: [],
}));

export interface ListCollectionIdsProjectsDatabasesDocumentsRequest {
  /** Required. The parent document. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` */
  parent: string;
  /** Request body */
  body?: ListCollectionIdsRequest;
}

export const ListCollectionIdsProjectsDatabasesDocumentsRequest = Schema.Struct(
  {
    parent: Schema.String.pipe(T.HttpPath("parent")),
    body: Schema.optional(ListCollectionIdsRequest).pipe(T.HttpBody()),
  },
).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{documentsId1}:listCollectionIds",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<ListCollectionIdsProjectsDatabasesDocumentsRequest>;

export type ListCollectionIdsProjectsDatabasesDocumentsResponse =
  ListCollectionIdsResponse;
export const ListCollectionIdsProjectsDatabasesDocumentsResponse =
  ListCollectionIdsResponse;

export type ListCollectionIdsProjectsDatabasesDocumentsError = DefaultErrors;

/** Lists all the collection IDs underneath a document. */
export const listCollectionIdsProjectsDatabasesDocuments: API.OperationMethod<
  ListCollectionIdsProjectsDatabasesDocumentsRequest,
  ListCollectionIdsProjectsDatabasesDocumentsResponse,
  ListCollectionIdsProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: ListCollectionIdsProjectsDatabasesDocumentsRequest,
  output: ListCollectionIdsProjectsDatabasesDocumentsResponse,
  errors: [],
}));

export interface BatchWriteProjectsDatabasesDocumentsRequest {
  /** Required. The database name. In the format: `projects/{project_id}/databases/{database_id}`. */
  database: string;
  /** Request body */
  body?: BatchWriteRequest;
}

export const BatchWriteProjectsDatabasesDocumentsRequest = Schema.Struct({
  database: Schema.String.pipe(T.HttpPath("database")),
  body: Schema.optional(BatchWriteRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents:batchWrite",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<BatchWriteProjectsDatabasesDocumentsRequest>;

export type BatchWriteProjectsDatabasesDocumentsResponse = BatchWriteResponse;
export const BatchWriteProjectsDatabasesDocumentsResponse = BatchWriteResponse;

export type BatchWriteProjectsDatabasesDocumentsError = DefaultErrors;

/** Applies a batch of write operations. The BatchWrite method does not apply the write operations atomically and can apply them out of order. Method does not allow more than one write per document. Each write succeeds or fails independently. See the BatchWriteResponse for the success status of each write. If you require an atomically applied set of writes, use Commit instead. */
export const batchWriteProjectsDatabasesDocuments: API.OperationMethod<
  BatchWriteProjectsDatabasesDocumentsRequest,
  BatchWriteProjectsDatabasesDocumentsResponse,
  BatchWriteProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchWriteProjectsDatabasesDocumentsRequest,
  output: BatchWriteProjectsDatabasesDocumentsResponse,
  errors: [],
}));

export interface CreateDocumentProjectsDatabasesDocumentsRequest {
  /** Required. The parent resource. For example: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/chatrooms/{chatroom_id}` */
  parent: string;
  /** Required. The collection ID, relative to `parent`, to list. For example: `chatrooms`. */
  collectionId: string;
  /** The client-assigned document ID to use for this document. Optional. If not specified, an ID will be assigned by the service. */
  documentId?: string;
  /** The list of field paths in the mask. See Document.fields for a field path syntax reference. */
  "mask.fieldPaths"?: string[];
  /** Request body */
  body?: Document;
}

export const CreateDocumentProjectsDatabasesDocumentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  collectionId: Schema.String.pipe(T.HttpPath("collectionId")),
  documentId: Schema.optional(Schema.String).pipe(T.HttpQuery("documentId")),
  "mask.fieldPaths": Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("mask.fieldPaths"),
  ),
  body: Schema.optional(Document).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v1beta1/projects/{projectsId}/databases/{databasesId}/documents/{documentsId}/{collectionId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateDocumentProjectsDatabasesDocumentsRequest>;

export type CreateDocumentProjectsDatabasesDocumentsResponse = Document;
export const CreateDocumentProjectsDatabasesDocumentsResponse = Document;

export type CreateDocumentProjectsDatabasesDocumentsError = DefaultErrors;

/** Creates a new document. */
export const createDocumentProjectsDatabasesDocuments: API.OperationMethod<
  CreateDocumentProjectsDatabasesDocumentsRequest,
  CreateDocumentProjectsDatabasesDocumentsResponse,
  CreateDocumentProjectsDatabasesDocumentsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateDocumentProjectsDatabasesDocumentsRequest,
  output: CreateDocumentProjectsDatabasesDocumentsResponse,
  errors: [],
}));
