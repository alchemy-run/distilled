// ==========================================================================
// Cloud Healthcare API (healthcare v1)
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
  name: "healthcare",
  version: "v1",
  rootUrl: "https://healthcare.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

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
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ConsentAccessorScope {
  /** An individual, group, or access role that identifies the accessor or a characteristic of the accessor. This can be a resource ID (such as `{resourceType}/{id}`) or an external URI. This value must be present. */
  actor?: string;
  /** The intent of data use. If it's not specified, it applies to all purposes. */
  purpose?: string;
  /** An abstract identifier that describes the environment or conditions under which the accessor is acting. If it's not specified, it applies to all environments. */
  environment?: string;
}

export const ConsentAccessorScope: Schema.Schema<ConsentAccessorScope> = Schema.suspend(() => Schema.Struct({
  actor: Schema.optional(Schema.String),
  purpose: Schema.optional(Schema.String),
  environment: Schema.optional(Schema.String),
})).annotate({ identifier: "ConsentAccessorScope" }) as any as Schema.Schema<ConsentAccessorScope>;

export interface ExplainDataAccessConsentInfo {
  /** A list of all the matching accessor scopes of this consent policy that enforced ExplainDataAccessConsentScope.accessor_scope. */
  matchingAccessorScopes?: Array<ConsentAccessorScope>;
  /** The consent's variant combinations. A single consent may have multiple variants. */
  variants?: Array<"CONSENT_VARIANT_UNSPECIFIED" | "CONSENT_VARIANT_STANDARD" | "CONSENT_VARIANT_CASCADE" | (string & {})>;
  /** The patient owning the consent (only applicable for patient consents), in the format: `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Patient/{patient_id}` */
  patientConsentOwner?: string;
  /** Last enforcement timestamp of this consent resource. */
  enforcementTime?: string;
  /** The resource name of this consent resource, in the format: `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{resource_id}`. */
  consentResource?: string;
  /** The policy type of consent resource (e.g. PATIENT, ADMIN). */
  type?: "CONSENT_POLICY_TYPE_UNSPECIFIED" | "CONSENT_POLICY_TYPE_PATIENT" | "CONSENT_POLICY_TYPE_ADMIN" | (string & {});
  /** The compartment base resources that matched a cascading policy. Each resource has the following format: `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/{resource_type}/{resource_id}` */
  cascadeOrigins?: Array<string>;
}

export const ExplainDataAccessConsentInfo: Schema.Schema<ExplainDataAccessConsentInfo> = Schema.suspend(() => Schema.Struct({
  matchingAccessorScopes: Schema.optional(Schema.Array(ConsentAccessorScope)),
  variants: Schema.optional(Schema.Array(Schema.String)),
  patientConsentOwner: Schema.optional(Schema.String),
  enforcementTime: Schema.optional(Schema.String),
  consentResource: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  cascadeOrigins: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ExplainDataAccessConsentInfo" }) as any as Schema.Schema<ExplainDataAccessConsentInfo>;

export interface ExplainDataAccessConsentScope {
  /** Whether the current consent scope is permitted or denied access on the requested resource. */
  decision?: "CONSENT_DECISION_TYPE_UNSPECIFIED" | "CONSENT_DECISION_TYPE_PERMIT" | "CONSENT_DECISION_TYPE_DENY" | (string & {});
  /** The accessor scope that describes who can access, for what purpose, and in which environment. */
  accessorScope?: ConsentAccessorScope;
  /** Other consent scopes that created exceptions within this scope. */
  exceptions?: Array<ExplainDataAccessConsentScope>;
  /** Metadata of the consent resources that enforce the consent scope's access. */
  enforcingConsents?: Array<ExplainDataAccessConsentInfo>;
}

export const ExplainDataAccessConsentScope: Schema.Schema<ExplainDataAccessConsentScope> = Schema.suspend(() => Schema.Struct({
  decision: Schema.optional(Schema.String),
  accessorScope: Schema.optional(ConsentAccessorScope),
  exceptions: Schema.optional(Schema.Array(ExplainDataAccessConsentScope)),
  enforcingConsents: Schema.optional(Schema.Array(ExplainDataAccessConsentInfo)),
})).annotate({ identifier: "ExplainDataAccessConsentScope" }) as any as Schema.Schema<ExplainDataAccessConsentScope>;

export interface ExplainDataAccessResponse {
  /** Warnings associated with this response. It inform user with exceeded scope limit errors. */
  warning?: string;
  /** List of applicable consent scopes. Sorted in order of actor such that scopes belonging to the same actor will be adjacent to each other in the list. */
  consentScopes?: Array<ExplainDataAccessConsentScope>;
}

export const ExplainDataAccessResponse: Schema.Schema<ExplainDataAccessResponse> = Schema.suspend(() => Schema.Struct({
  warning: Schema.optional(Schema.String),
  consentScopes: Schema.optional(Schema.Array(ExplainDataAccessConsentScope)),
})).annotate({ identifier: "ExplainDataAccessResponse" }) as any as Schema.Schema<ExplainDataAccessResponse>;

export interface ProgressCounter {
  /** The number of secondary units that failed in the operation. */
  secondaryFailure?: string;
  /** The number of units that succeeded in the operation. */
  success?: string;
  /** The number of units that failed in the operation. */
  failure?: string;
  /** The number of units that are pending in the operation. */
  pending?: string;
  /** The number of secondary units that succeeded in the operation. */
  secondarySuccess?: string;
}

export const ProgressCounter: Schema.Schema<ProgressCounter> = Schema.suspend(() => Schema.Struct({
  secondaryFailure: Schema.optional(Schema.String),
  success: Schema.optional(Schema.String),
  failure: Schema.optional(Schema.String),
  pending: Schema.optional(Schema.String),
  secondarySuccess: Schema.optional(Schema.String),
})).annotate({ identifier: "ProgressCounter" }) as any as Schema.Schema<ProgressCounter>;

export interface NotificationConfig {
  /** Indicates whether or not to send Pub/Sub notifications on bulk import. Only supported for DICOM imports. */
  sendForBulkImport?: boolean;
  /** The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that notifications of changes are published on. Supplied by the client. PubsubMessage.Data contains the resource name. PubsubMessage.MessageId is the ID of this message. It is guaranteed to be unique within the topic. PubsubMessage.PublishTime is the time at which the message was published. Notifications are only sent if the topic is non-empty. [Topic names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped to a project. Cloud Healthcare API service account must have publisher permissions on the given Pub/Sub topic. Not having adequate permissions causes the calls that send notifications to fail. If a notification can't be published to Pub/Sub, errors are logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). If the number of errors exceeds a certain rate, some aren't submitted. Note that not all operations trigger notifications, see [Configuring Pub/Sub notifications](https://cloud.google.com/healthcare/docs/how-tos/pubsub) for specific details. */
  pubsubTopic?: string;
}

export const NotificationConfig: Schema.Schema<NotificationConfig> = Schema.suspend(() => Schema.Struct({
  sendForBulkImport: Schema.optional(Schema.Boolean),
  pubsubTopic: Schema.optional(Schema.String),
})).annotate({ identifier: "NotificationConfig" }) as any as Schema.Schema<NotificationConfig>;

export interface DicomNotificationConfig {
  /** Required. The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that notifications of changes are published on. Supplied by the client. The notification is a `PubsubMessage` with the following fields: * `PubsubMessage.Data` contains the resource name. * `PubsubMessage.MessageId` is the ID of this notification. It is guaranteed to be unique within the topic. * `PubsubMessage.PublishTime` is the time when the message was published. * `PubsubMessage.Attributes` contains the following attributes: * `action`: The name of the endpoint that generated the notification. Possible values are `StoreInstances`, `SetBlobSettings`, `ImportDicomData`, etc. * `lastUpdatedTime`: The latest timestamp when the DICOM instance was updated. * `storeName`: The resource name of the DICOM store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. * `studyInstanceUID`: The study UID of the DICOM instance that was changed. * `seriesInstanceUID`: The series UID of the DICOM instance that was changed. * `sopInstanceUID`: The instance UID of the DICOM instance that was changed. * `versionId`: The version ID of the DICOM instance that was changed. * `modality`: The modality tag of the DICOM instance that was changed. * `previousStorageClass`: The storage class where the DICOM instance was previously stored if the storage class was changed. * `storageClass`: The storage class where the DICOM instance is currently stored. Note that notifications are only sent if the topic is non-empty. [Topic names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped to a project. The Cloud Healthcare API service account, service-@gcp-sa-healthcare.iam.gserviceaccount.com, must have the `pubsub.topics.publish` permission (which is typically included in `roles/pubsub.publisher` role) on the given Pub/Sub topic. Not having adequate permissions causes the calls that send notifications to fail (https://cloud.google.com/healthcare-api/docs/permissions-healthcare-api-gcp-products#dicom_fhir_and_hl7v2_store_cloud_pubsub_permissions). If a notification can't be published to Pub/Sub, errors are logged to Cloud Logging. For more information, see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare-api/docs/how-tos/logging). */
  pubsubTopic?: string;
}

export const DicomNotificationConfig: Schema.Schema<DicomNotificationConfig> = Schema.suspend(() => Schema.Struct({
  pubsubTopic: Schema.optional(Schema.String),
})).annotate({ identifier: "DicomNotificationConfig" }) as any as Schema.Schema<DicomNotificationConfig>;

export interface SchemaJSON {
}

export const SchemaJSON: Schema.Schema<SchemaJSON> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SchemaJSON" }) as any as Schema.Schema<SchemaJSON>;

export interface SchemaFlattened {
}

export const SchemaFlattened: Schema.Schema<SchemaFlattened> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SchemaFlattened" }) as any as Schema.Schema<SchemaFlattened>;

export interface GoogleCloudHealthcareV1DicomBigQueryDestination {
  /** Optional. Setting this field will store all the DICOM tags as a JSON type in a single column. */
  schemaJson?: SchemaJSON;
  /** Optional. If true, the source store name will be included as a column in the BigQuery schema. */
  includeSourceStore?: boolean;
  /** Optional. Setting this field will use flattened DICOM instances schema for the BigQuery table. The flattened schema will have one column for each DICOM tag. */
  schemaFlattened?: SchemaFlattened;
  /** Optional. BigQuery URI to a table, up to 2000 characters long, in the format `bq://projectId.bqDatasetId.tableId` */
  tableUri?: string;
  /** Optional. Determines whether the existing table in the destination is to be overwritten or appended to. If a write_disposition is specified, the `force` parameter is ignored. */
  writeDisposition?: "WRITE_DISPOSITION_UNSPECIFIED" | "WRITE_EMPTY" | "WRITE_TRUNCATE" | "WRITE_APPEND" | (string & {});
  /** Optional. Use `write_disposition` instead. If `write_disposition` is specified, this parameter is ignored. force=false is equivalent to write_disposition=WRITE_EMPTY and force=true is equivalent to write_disposition=WRITE_TRUNCATE. */
  force?: boolean;
}

export const GoogleCloudHealthcareV1DicomBigQueryDestination: Schema.Schema<GoogleCloudHealthcareV1DicomBigQueryDestination> = Schema.suspend(() => Schema.Struct({
  schemaJson: Schema.optional(SchemaJSON),
  includeSourceStore: Schema.optional(Schema.Boolean),
  schemaFlattened: Schema.optional(SchemaFlattened),
  tableUri: Schema.optional(Schema.String),
  writeDisposition: Schema.optional(Schema.String),
  force: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudHealthcareV1DicomBigQueryDestination" }) as any as Schema.Schema<GoogleCloudHealthcareV1DicomBigQueryDestination>;

export interface GoogleCloudHealthcareV1DicomStreamConfig {
  /** Results are appended to this table. The server creates a new table in the given BigQuery dataset if the specified table does not exist. To enable the Cloud Healthcare API to write to your BigQuery table, you must give the Cloud Healthcare API service account the bigquery.dataEditor role. The service account is: `service-{PROJECT_NUMBER}@gcp-sa-healthcare.iam.gserviceaccount.com`. The PROJECT_NUMBER identifies the project that the DICOM store resides in. To get the project number, go to the Cloud Console Dashboard. It is recommended to not have a custom schema in the destination table which could conflict with the schema created by the Cloud Healthcare API. Instance deletions are not applied to the destination table. The destination's table schema will be automatically updated in case a new instance's data is incompatible with the current schema. The schema should not be updated manually as this can cause incompatibilies that cannot be resolved automatically. One resolution in this case is to delete the incompatible table and let the server recreate one, though the newly created table only contains data after the table recreation. BigQuery imposes a 1 MB limit on streaming insert row size, therefore any instance that generates more than 1 MB of BigQuery data will not be streamed. If an instance cannot be streamed to BigQuery, errors will be logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). */
  bigqueryDestination?: GoogleCloudHealthcareV1DicomBigQueryDestination;
}

export const GoogleCloudHealthcareV1DicomStreamConfig: Schema.Schema<GoogleCloudHealthcareV1DicomStreamConfig> = Schema.suspend(() => Schema.Struct({
  bigqueryDestination: Schema.optional(GoogleCloudHealthcareV1DicomBigQueryDestination),
})).annotate({ identifier: "GoogleCloudHealthcareV1DicomStreamConfig" }) as any as Schema.Schema<GoogleCloudHealthcareV1DicomStreamConfig>;

export interface DicomStore {
  /** User-supplied key-value pairs used to organize DICOM stores. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: \p{Ll}\p{Lo}{0,62} Label values are optional, must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: [\p{Ll}\p{Lo}\p{N}_-]{0,63} No more than 64 labels can be associated with a given store. */
  labels?: Record<string, string>;
  /** Optional. Notification destination for new DICOM instances. Supplied by the client. */
  notificationConfig?: NotificationConfig;
  /** Optional. Specifies where and whether to send notifications upon changes to a DICOM store. */
  notificationConfigs?: Array<DicomNotificationConfig>;
  /** Optional. A list of streaming configs used to configure the destination of streaming exports for every DICOM instance insertion in this DICOM store. After a new config is added to `stream_configs`, DICOM instance insertions are streamed to the new destination. When a config is removed from `stream_configs`, the server stops streaming to that destination. Each config must contain a unique destination. */
  streamConfigs?: Array<GoogleCloudHealthcareV1DicomStreamConfig>;
  /** Identifier. Resource name of the DICOM store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  name?: string;
}

export const DicomStore: Schema.Schema<DicomStore> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  notificationConfig: Schema.optional(NotificationConfig),
  notificationConfigs: Schema.optional(Schema.Array(DicomNotificationConfig)),
  streamConfigs: Schema.optional(Schema.Array(GoogleCloudHealthcareV1DicomStreamConfig)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "DicomStore" }) as any as Schema.Schema<DicomStore>;

export interface TagFilterList {
  /** Optional. Tags to be filtered. Tags must be DICOM Data Elements, File Meta Elements, or Directory Structuring Elements, as defined at: https://dicom.nema.org/medical/dicom/current/output/html/part06.html#table_6-1,. They may be provided by "Keyword" or "Tag". For example "PatientID", "00100010". */
  tags?: Array<string>;
}

export const TagFilterList: Schema.Schema<TagFilterList> = Schema.suspend(() => Schema.Struct({
  tags: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TagFilterList" }) as any as Schema.Schema<TagFilterList>;

export interface DicomConfig {
  /** List of tags to keep. Remove all other tags. */
  keepList?: TagFilterList;
  /** List of tags to remove. Keep all other tags. */
  removeList?: TagFilterList;
  /** Tag filtering profile that determines which tags to keep/remove. */
  filterProfile?: "TAG_FILTER_PROFILE_UNSPECIFIED" | "MINIMAL_KEEP_LIST_PROFILE" | "ATTRIBUTE_CONFIDENTIALITY_BASIC_PROFILE" | "KEEP_ALL_PROFILE" | "DEIDENTIFY_TAG_CONTENTS" | (string & {});
  /** Optional. If true, skip replacing StudyInstanceUID, SeriesInstanceUID, SOPInstanceUID, and MediaStorageSOPInstanceUID and leave them untouched. The Cloud Healthcare API regenerates these UIDs by default based on the DICOM Standard's reasoning: "Whilst these UIDs cannot be mapped directly to an individual out of context, given access to the original images, or to a database of the original images containing the UIDs, it would be possible to recover the individual's identity." https://dicom.nema.org/medical/dicom/current/output/chtml/part15/sect_E.3.9.html */
  skipIdRedaction?: boolean;
}

export const DicomConfig: Schema.Schema<DicomConfig> = Schema.suspend(() => Schema.Struct({
  keepList: Schema.optional(TagFilterList),
  removeList: Schema.optional(TagFilterList),
  filterProfile: Schema.optional(Schema.String),
  skipIdRedaction: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DicomConfig" }) as any as Schema.Schema<DicomConfig>;

export interface ConsentHeaderHandling {
  /** Optional. Specifies the default server behavior when the header is empty. If not specified, the `ScopeProfile.PERMIT_EMPTY_SCOPE` option is used. */
  profile?: "SCOPE_PROFILE_UNSPECIFIED" | "PERMIT_EMPTY_SCOPE" | "REQUIRED_ON_READ" | (string & {});
}

export const ConsentHeaderHandling: Schema.Schema<ConsentHeaderHandling> = Schema.suspend(() => Schema.Struct({
  profile: Schema.optional(Schema.String),
})).annotate({ identifier: "ConsentHeaderHandling" }) as any as Schema.Schema<ConsentHeaderHandling>;

export interface ExportResourcesResponse {
}

export const ExportResourcesResponse: Schema.Schema<ExportResourcesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ExportResourcesResponse" }) as any as Schema.Schema<ExportResourcesResponse>;

export interface ConsentEvaluation {
  /** The evaluation result. */
  evaluationResult?: "EVALUATION_RESULT_UNSPECIFIED" | "NOT_APPLICABLE" | "NO_MATCHING_POLICY" | "NO_SATISFIED_POLICY" | "HAS_SATISFIED_POLICY" | (string & {});
}

export const ConsentEvaluation: Schema.Schema<ConsentEvaluation> = Schema.suspend(() => Schema.Struct({
  evaluationResult: Schema.optional(Schema.String),
})).annotate({ identifier: "ConsentEvaluation" }) as any as Schema.Schema<ConsentEvaluation>;

export interface CheckDataAccessResponse {
  /** Whether the requested resource is consented for the given use. */
  consented?: boolean;
  /** The resource names of all evaluated Consents mapped to their evaluation. */
  consentDetails?: Record<string, ConsentEvaluation>;
}

export const CheckDataAccessResponse: Schema.Schema<CheckDataAccessResponse> = Schema.suspend(() => Schema.Struct({
  consented: Schema.optional(Schema.Boolean),
  consentDetails: Schema.optional(Schema.Record(Schema.String, ConsentEvaluation)),
})).annotate({ identifier: "CheckDataAccessResponse" }) as any as Schema.Schema<CheckDataAccessResponse>;

export interface Segment {
  /** A mapping from the positional location to the value. The key string uses zero-based indexes separated by dots to identify Fields, components and sub-components. A bracket notation is also used to identify different instances of a repeated field. Regex for key: (\d+)(\[\d+\])?(.\d+)?(.\d+)? Examples of (key, value) pairs: * (0.1, "hemoglobin") denotes that the first component of Field 0 has the value "hemoglobin". * (1.1.2, "CBC") denotes that the second sub-component of the first component of Field 1 has the value "CBC". * (1[0].1, "HbA1c") denotes that the first component of the first Instance of Field 1, which is repeated, has the value "HbA1c". */
  fields?: Record<string, string>;
  /** A string that indicates the type of segment. For example, EVN or PID. */
  segmentId?: string;
  /** Set ID for segments that can be in a set. This can be empty if it's missing or isn't applicable. */
  setId?: string;
}

export const Segment: Schema.Schema<Segment> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  segmentId: Schema.optional(Schema.String),
  setId: Schema.optional(Schema.String),
})).annotate({ identifier: "Segment" }) as any as Schema.Schema<Segment>;

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

export interface TextSpan {
  /** The original text contained in this span. */
  content?: string;
  /** The unicode codepoint index of the beginning of this span. */
  beginOffset?: number;
}

export const TextSpan: Schema.Schema<TextSpan> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.String),
  beginOffset: Schema.optional(Schema.Number),
})).annotate({ identifier: "TextSpan" }) as any as Schema.Schema<TextSpan>;

export interface PatientScope {
  /** Optional. The list of patient IDs whose Consent resources will be enforced. At most 10,000 patients can be specified. An empty list is equivalent to all patients (meaning the entire FHIR store). */
  patientIds?: Array<string>;
}

export const PatientScope: Schema.Schema<PatientScope> = Schema.suspend(() => Schema.Struct({
  patientIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PatientScope" }) as any as Schema.Schema<PatientScope>;

export interface ArchiveUserDataMappingRequest {
}

export const ArchiveUserDataMappingRequest: Schema.Schema<ArchiveUserDataMappingRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ArchiveUserDataMappingRequest" }) as any as Schema.Schema<ArchiveUserDataMappingRequest>;

export interface StudyMetrics {
  /** Number of instances in the study. */
  instanceCount?: string;
  /** Total structured storage bytes for all instances in the study. */
  structuredStorageSizeBytes?: string;
  /** The study resource path. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}/dicomWeb/studies/{study_uid}`. */
  study?: string;
  /** Total blob storage bytes for all instances in the study. */
  blobStorageSizeBytes?: string;
  /** Number of series in the study. */
  seriesCount?: string;
}

export const StudyMetrics: Schema.Schema<StudyMetrics> = Schema.suspend(() => Schema.Struct({
  instanceCount: Schema.optional(Schema.String),
  structuredStorageSizeBytes: Schema.optional(Schema.String),
  study: Schema.optional(Schema.String),
  blobStorageSizeBytes: Schema.optional(Schema.String),
  seriesCount: Schema.optional(Schema.String),
})).annotate({ identifier: "StudyMetrics" }) as any as Schema.Schema<StudyMetrics>;

export interface Feature {
  /** The value of this feature annotation. Its range depends on the type of the feature. */
  value?: string;
  /** The model's confidence in this feature annotation. A number between 0 and 1. */
  confidence?: number;
}

export const Feature: Schema.Schema<Feature> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "Feature" }) as any as Schema.Schema<Feature>;

export interface LinkedEntity {
  /** entity_id is a concept unique identifier. These are prefixed by a string that identifies the entity coding system, followed by the unique identifier within that system. For example, "UMLS/C0000970". This also supports ad hoc entities, which are formed by normalizing entity mention content. */
  entityId?: string;
}

export const LinkedEntity: Schema.Schema<LinkedEntity> = Schema.suspend(() => Schema.Struct({
  entityId: Schema.optional(Schema.String),
})).annotate({ identifier: "LinkedEntity" }) as any as Schema.Schema<LinkedEntity>;

export interface ConsentErrors {
  /** The versioned name of the admin Consent resource, in the format `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{resource_id}/_history/{version_id}`. For FHIR stores with `disable_resource_versioning=true`, the format is `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{resource_id}`. */
  name?: string;
  /** The error code and message. */
  error?: Status;
}

export const ConsentErrors: Schema.Schema<ConsentErrors> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  error: Schema.optional(Status),
})).annotate({ identifier: "ConsentErrors" }) as any as Schema.Schema<ConsentErrors>;

export interface ApplyAdminConsentsErrorDetail {
  /** The list of Consent resources that are unsupported or cannot be applied and the error associated with each of them. */
  consentErrors?: Array<ConsentErrors>;
  /** The currently in progress non-validate-only ApplyAdminConsents operation ID if exist. */
  existingOperationId?: string;
}

export const ApplyAdminConsentsErrorDetail: Schema.Schema<ApplyAdminConsentsErrorDetail> = Schema.suspend(() => Schema.Struct({
  consentErrors: Schema.optional(Schema.Array(ConsentErrors)),
  existingOperationId: Schema.optional(Schema.String),
})).annotate({ identifier: "ApplyAdminConsentsErrorDetail" }) as any as Schema.Schema<ApplyAdminConsentsErrorDetail>;

export interface QueryAccessibleDataResponse {
  /** List of files, each of which contains a list of data_id(s) that are consented for a specified use in the request. */
  gcsUris?: Array<string>;
}

export const QueryAccessibleDataResponse: Schema.Schema<QueryAccessibleDataResponse> = Schema.suspend(() => Schema.Struct({
  gcsUris: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "QueryAccessibleDataResponse" }) as any as Schema.Schema<QueryAccessibleDataResponse>;

export interface VersionSource {
  /** The field to extract from the MSH segment. For example, "3.1" or "18[1].1". */
  mshField?: string;
  /** The value to match with the field. For example, "My Application Name" or "2.3". */
  value?: string;
}

export const VersionSource: Schema.Schema<VersionSource> = Schema.suspend(() => Schema.Struct({
  mshField: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "VersionSource" }) as any as Schema.Schema<VersionSource>;

export interface FieldMetadata {
  /** Optional. List of paths to FHIR fields to be redacted. Each path is a period-separated list where each component is either a field name or FHIR type name, for example: Patient, HumanName. For "choice" types (those defined in the FHIR spec with the form: field[x]) we use two separate components. For example, "deceasedAge.unit" is matched by "Deceased.Age.unit". Supported types are: AdministrativeGenderCode, Base64Binary, Boolean, Code, Date, DateTime, Decimal, HumanName, Id, Instant, Integer, LanguageCode, Markdown, Oid, PositiveInt, String, UnsignedInt, Uri, Uuid, Xhtml. */
  paths?: Array<string>;
  /** Optional. Deidentify action for one field. */
  action?: "ACTION_UNSPECIFIED" | "TRANSFORM" | "INSPECT_AND_TRANSFORM" | "DO_NOT_TRANSFORM" | (string & {});
}

export const FieldMetadata: Schema.Schema<FieldMetadata> = Schema.suspend(() => Schema.Struct({
  paths: Schema.optional(Schema.Array(Schema.String)),
  action: Schema.optional(Schema.String),
})).annotate({ identifier: "FieldMetadata" }) as any as Schema.Schema<FieldMetadata>;

export interface FhirConfig {
  /** Optional. The behaviour for handling FHIR extensions that aren't otherwise specified for de-identification. If true, all extensions are preserved during de-identification by default. If false or unspecified, all extensions are removed during de-identification by default. */
  defaultKeepExtensions?: boolean;
  /** Optional. Specifies FHIR paths to match and how to transform them. Any field that is not matched by a FieldMetadata is passed through to the output dataset unmodified. All extensions will be processed according to `default_keep_extensions`. */
  fieldMetadataList?: Array<FieldMetadata>;
}

export const FhirConfig: Schema.Schema<FhirConfig> = Schema.suspend(() => Schema.Struct({
  defaultKeepExtensions: Schema.optional(Schema.Boolean),
  fieldMetadataList: Schema.optional(Schema.Array(FieldMetadata)),
})).annotate({ identifier: "FhirConfig" }) as any as Schema.Schema<FhirConfig>;

export interface Attribute {
  /** Required. The value of the attribute. Must be an acceptable value as defined in the consent store. For example, if the consent store defines "data type" with acceptable values "questionnaire" and "step-count", when the attribute name is data type, this field must contain one of those values. */
  values?: Array<string>;
  /** Indicates the name of an attribute defined in the consent store. */
  attributeDefinitionId?: string;
}

export const Attribute: Schema.Schema<Attribute> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
  attributeDefinitionId: Schema.optional(Schema.String),
})).annotate({ identifier: "Attribute" }) as any as Schema.Schema<Attribute>;

export interface Expr {
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "Expr" }) as any as Schema.Schema<Expr>;

export interface GoogleCloudHealthcareV1ConsentPolicy {
  /** The resources that this policy applies to. A resource is a match if it matches all the attributes listed here. If empty, this policy applies to all User data mappings for the given user. */
  resourceAttributes?: Array<Attribute>;
  /** Required. The request conditions to meet to grant access. In addition to any supported comparison operators, authorization rules may have `IN` operator as well as at most 10 logical operators that are limited to `AND` (`&&`), `OR` (`||`). */
  authorizationRule?: Expr;
}

export const GoogleCloudHealthcareV1ConsentPolicy: Schema.Schema<GoogleCloudHealthcareV1ConsentPolicy> = Schema.suspend(() => Schema.Struct({
  resourceAttributes: Schema.optional(Schema.Array(Attribute)),
  authorizationRule: Schema.optional(Expr),
})).annotate({ identifier: "GoogleCloudHealthcareV1ConsentPolicy" }) as any as Schema.Schema<GoogleCloudHealthcareV1ConsentPolicy>;

export interface Consent {
  /** Required. The resource name of the Consent artifact that contains proof of the end user's consent, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consentArtifacts/{consent_artifact_id}`. */
  consentArtifact?: string;
  /** Required. Indicates the current state of this Consent. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "ARCHIVED" | "REVOKED" | "DRAFT" | "REJECTED" | (string & {});
  /** Output only. The revision ID of the Consent. The format is an 8-character hexadecimal string. Refer to a specific revision of a Consent by appending `@{revision_id}` to the Consent's resource name. */
  revisionId?: string;
  /** Required. User's UUID provided by the client. */
  userId?: string;
  /** Optional. User-supplied key-value pairs used to organize Consent resources. Metadata keys must: - be between 1 and 63 characters long - have a UTF-8 encoding of maximum 128 bytes - begin with a letter - consist of up to 63 characters including lowercase letters, numeric characters, underscores, and dashes Metadata values must be: - be between 1 and 63 characters long - have a UTF-8 encoding of maximum 128 bytes - consist of up to 63 characters including lowercase letters, numeric characters, underscores, and dashes No more than 64 metadata entries can be associated with a given consent. */
  metadata?: Record<string, string>;
  /** Input only. The time to live for this Consent from when it is created. */
  ttl?: string;
  /** Output only. The timestamp that the revision was created. */
  revisionCreateTime?: string;
  /** Timestamp in UTC of when this Consent is considered expired. */
  expireTime?: string;
  /** Identifier. Resource name of the Consent, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`. Cannot be changed after creation. */
  name?: string;
  /** Optional. Represents a user's consent in terms of the resources that can be accessed and under what conditions. */
  policies?: Array<GoogleCloudHealthcareV1ConsentPolicy>;
}

export const Consent: Schema.Schema<Consent> = Schema.suspend(() => Schema.Struct({
  consentArtifact: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  revisionId: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  ttl: Schema.optional(Schema.String),
  revisionCreateTime: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  policies: Schema.optional(Schema.Array(GoogleCloudHealthcareV1ConsentPolicy)),
})).annotate({ identifier: "Consent" }) as any as Schema.Schema<Consent>;

export interface ListConsentsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** The returned Consents. The maximum number of Consents returned is determined by the value of page_size in the ListConsentsRequest. */
  consents?: Array<Consent>;
}

export const ListConsentsResponse: Schema.Schema<ListConsentsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  consents: Schema.optional(Schema.Array(Consent)),
})).annotate({ identifier: "ListConsentsResponse" }) as any as Schema.Schema<ListConsentsResponse>;

export interface ListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<Operation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const ListOperationsResponse: Schema.Schema<ListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(Operation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ListOperationsResponse" }) as any as Schema.Schema<ListOperationsResponse>;

export interface ValidationConfig {
  /** Optional. Whether to disable required fields validation for incoming resources. The default value is false. Set this to true to disable checking incoming resources for conformance against required fields requirement defined in the FHIR specification. This property only affects resource types that do not have profiles configured for them, any rules in enabled implementation guides will still be enforced. */
  disableRequiredFieldValidation?: boolean;
  /** Optional. Whether to disable FHIRPath validation for incoming resources. The default value is false. Set this to true to disable checking incoming resources for conformance against FHIRPath requirement defined in the FHIR specification. This property only affects resource types that do not have profiles configured for them, any rules in enabled implementation guides will still be enforced. */
  disableFhirpathValidation?: boolean;
  /** Optional. Whether to disable reference type validation for incoming resources. The default value is false. Set this to true to disable checking incoming resources for conformance against reference type requirement defined in the FHIR specification. This property only affects resource types that do not have profiles configured for them, any rules in enabled implementation guides will still be enforced. */
  disableReferenceTypeValidation?: boolean;
  /** Optional. A list of implementation guide URLs in this FHIR store that are used to configure the profiles to use for validation. For example, to use the US Core profiles for validation, set `enabled_implementation_guides` to `["http://hl7.org/fhir/us/core/ImplementationGuide/ig"]`. If `enabled_implementation_guides` is empty or omitted, then incoming resources are only required to conform to the base FHIR profiles. Otherwise, a resource must conform to at least one profile listed in the `global` property of one of the enabled ImplementationGuides. The Cloud Healthcare API does not currently enforce all of the rules in a StructureDefinition. The following rules are supported: - min/max - minValue/maxValue - maxLength - type - fixed[x] - pattern[x] on simple types - slicing, when using "value" as the discriminator type - FHIRPath constraints (only when `enable_fhirpath_profile_validation` is true) When a URL cannot be resolved (for example, in a type assertion), the server does not return an error. */
  enabledImplementationGuides?: Array<string>;
  /** Optional. Whether to disable profile validation for this FHIR store. The default value is false. Set this to true to disable checking incoming resources for conformance against structure definitions in this FHIR store. */
  disableProfileValidation?: boolean;
  /** Optional. Whether to enable FHIRPath validation for incoming resource types that have profiles configured for them in the `enabled_implementation_guides` list. Set this to true to enable checking incoming resources for conformance against FHIRPath requirements defined in the configured profiles. */
  enableFhirpathProfileValidation?: boolean;
}

export const ValidationConfig: Schema.Schema<ValidationConfig> = Schema.suspend(() => Schema.Struct({
  disableRequiredFieldValidation: Schema.optional(Schema.Boolean),
  disableFhirpathValidation: Schema.optional(Schema.Boolean),
  disableReferenceTypeValidation: Schema.optional(Schema.Boolean),
  enabledImplementationGuides: Schema.optional(Schema.Array(Schema.String)),
  disableProfileValidation: Schema.optional(Schema.Boolean),
  enableFhirpathProfileValidation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ValidationConfig" }) as any as Schema.Schema<ValidationConfig>;

export interface AccessDeterminationLogConfig {
  /** Optional. Controls the amount of detail to include as part of the audit logs. */
  logLevel?: "LOG_LEVEL_UNSPECIFIED" | "DISABLED" | "MINIMUM" | "VERBOSE" | (string & {});
}

export const AccessDeterminationLogConfig: Schema.Schema<AccessDeterminationLogConfig> = Schema.suspend(() => Schema.Struct({
  logLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "AccessDeterminationLogConfig" }) as any as Schema.Schema<AccessDeterminationLogConfig>;

export interface ConsentConfig {
  /** Output only. The versioned names of the enforced admin Consent resource(s), in the format `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{resource_id}/_history/{version_id}`. For FHIR stores with `disable_resource_versioning=true`, the format is `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{resource_id}`. This field can only be updated using ApplyAdminConsents. */
  enforcedAdminConsents?: Array<string>;
  /** Optional. Different options to configure the behaviour of the server when handling the `X-Consent-Scope` header. */
  consentHeaderHandling?: ConsentHeaderHandling;
  /** Optional. The default value is false. If set to true, when accessing FHIR resources, the consent headers will be verified against consents given by patients. See the ConsentEnforcementVersion for the supported consent headers. */
  accessEnforced?: boolean;
  /** Optional. Specifies how the server logs the consent-aware requests. If not specified, the `AccessDeterminationLogConfig.LogLevel.MINIMUM` option is used. */
  accessDeterminationLogConfig?: AccessDeterminationLogConfig;
  /** Required. Specifies which consent enforcement version is being used for this FHIR store. This field can only be set once by either CreateFhirStore or UpdateFhirStore. After that, you must call ApplyConsents to change the version. */
  version?: "CONSENT_ENFORCEMENT_VERSION_UNSPECIFIED" | "V1" | (string & {});
}

export const ConsentConfig: Schema.Schema<ConsentConfig> = Schema.suspend(() => Schema.Struct({
  enforcedAdminConsents: Schema.optional(Schema.Array(Schema.String)),
  consentHeaderHandling: Schema.optional(ConsentHeaderHandling),
  accessEnforced: Schema.optional(Schema.Boolean),
  accessDeterminationLogConfig: Schema.optional(AccessDeterminationLogConfig),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "ConsentConfig" }) as any as Schema.Schema<ConsentConfig>;

export interface TimePartitioning {
  /** Type of partitioning. */
  type?: "PARTITION_TYPE_UNSPECIFIED" | "HOUR" | "DAY" | "MONTH" | "YEAR" | (string & {});
  /** Number of milliseconds for which to keep the storage for a partition. */
  expirationMs?: string;
}

export const TimePartitioning: Schema.Schema<TimePartitioning> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  expirationMs: Schema.optional(Schema.String),
})).annotate({ identifier: "TimePartitioning" }) as any as Schema.Schema<TimePartitioning>;

export interface SchemaConfig {
  /** The configuration for exported BigQuery tables to be partitioned by FHIR resource's last updated time column. */
  lastUpdatedPartitionConfig?: TimePartitioning;
  /** The depth for all recursive structures in the output analytics schema. For example, `concept` in the CodeSystem resource is a recursive structure; when the depth is 2, the CodeSystem table will have a column called `concept.concept` but not `concept.concept.concept`. If not specified or set to 0, the server will use the default value 2. The maximum depth allowed is 5. */
  recursiveStructureDepth?: string;
  /** Specifies the output schema type. Schema type is required. */
  schemaType?: "SCHEMA_TYPE_UNSPECIFIED" | "ANALYTICS" | "ANALYTICS_V2" | (string & {});
}

export const SchemaConfig: Schema.Schema<SchemaConfig> = Schema.suspend(() => Schema.Struct({
  lastUpdatedPartitionConfig: Schema.optional(TimePartitioning),
  recursiveStructureDepth: Schema.optional(Schema.String),
  schemaType: Schema.optional(Schema.String),
})).annotate({ identifier: "SchemaConfig" }) as any as Schema.Schema<SchemaConfig>;

export interface GoogleCloudHealthcareV1FhirBigQueryDestination {
  /** Optional. Determines if existing data in the destination dataset is overwritten, appended to, or not written if the tables contain data. If a write_disposition is specified, the `force` parameter is ignored. */
  writeDisposition?: "WRITE_DISPOSITION_UNSPECIFIED" | "WRITE_EMPTY" | "WRITE_TRUNCATE" | "WRITE_APPEND" | (string & {});
  /** Optional. The default value is false. If this flag is `TRUE`, all tables are deleted from the dataset before the new exported tables are written. If the flag is not set and the destination dataset contains tables, the export call returns an error. If `write_disposition` is specified, this parameter is ignored. force=false is equivalent to write_disposition=WRITE_EMPTY and force=true is equivalent to write_disposition=WRITE_TRUNCATE. */
  force?: boolean;
  /** Optional. The configuration for the exported BigQuery schema. */
  schemaConfig?: SchemaConfig;
  /** Optional. BigQuery URI to an existing dataset, up to 2000 characters long, in the format `bq://projectId.bqDatasetId`. */
  datasetUri?: string;
}

export const GoogleCloudHealthcareV1FhirBigQueryDestination: Schema.Schema<GoogleCloudHealthcareV1FhirBigQueryDestination> = Schema.suspend(() => Schema.Struct({
  writeDisposition: Schema.optional(Schema.String),
  force: Schema.optional(Schema.Boolean),
  schemaConfig: Schema.optional(SchemaConfig),
  datasetUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudHealthcareV1FhirBigQueryDestination" }) as any as Schema.Schema<GoogleCloudHealthcareV1FhirBigQueryDestination>;

export interface ImageConfig {
  /** Optional. Determines how to redact text from image. */
  textRedactionMode?: "TEXT_REDACTION_MODE_UNSPECIFIED" | "REDACT_ALL_TEXT" | "REDACT_SENSITIVE_TEXT" | "REDACT_NO_TEXT" | (string & {});
}

export const ImageConfig: Schema.Schema<ImageConfig> = Schema.suspend(() => Schema.Struct({
  textRedactionMode: Schema.optional(Schema.String),
})).annotate({ identifier: "ImageConfig" }) as any as Schema.Schema<ImageConfig>;

export interface RedactConfig {
}

export const RedactConfig: Schema.Schema<RedactConfig> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RedactConfig" }) as any as Schema.Schema<RedactConfig>;

export interface ReplaceWithInfoTypeConfig {
}

export const ReplaceWithInfoTypeConfig: Schema.Schema<ReplaceWithInfoTypeConfig> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ReplaceWithInfoTypeConfig" }) as any as Schema.Schema<ReplaceWithInfoTypeConfig>;

export interface CharacterMaskConfig {
  /** Optional. Character to mask the sensitive values. If not supplied, defaults to "*". */
  maskingCharacter?: string;
}

export const CharacterMaskConfig: Schema.Schema<CharacterMaskConfig> = Schema.suspend(() => Schema.Struct({
  maskingCharacter: Schema.optional(Schema.String),
})).annotate({ identifier: "CharacterMaskConfig" }) as any as Schema.Schema<CharacterMaskConfig>;

export interface KmsWrappedCryptoKey {
  /** Required. The resource name of the KMS CryptoKey to use for unwrapping. For example, `projects/{project_id}/locations/{location_id}/keyRings/{keyring}/cryptoKeys/{key}`. */
  cryptoKey?: string;
  /** Required. The wrapped data crypto key. */
  wrappedKey?: string;
}

export const KmsWrappedCryptoKey: Schema.Schema<KmsWrappedCryptoKey> = Schema.suspend(() => Schema.Struct({
  cryptoKey: Schema.optional(Schema.String),
  wrappedKey: Schema.optional(Schema.String),
})).annotate({ identifier: "KmsWrappedCryptoKey" }) as any as Schema.Schema<KmsWrappedCryptoKey>;

export interface DateShiftConfig {
  /** KMS wrapped key. If `kms_wrapped` is not set, then `crypto_key` is used to calculate the date shift. If neither is set, a default key is generated for each de-identify operation. Must not be set if `crypto_key` is set. */
  kmsWrapped?: KmsWrappedCryptoKey;
  /** An AES 128/192/256 bit key. The date shift is computed based on this key and the patient ID. If the patient ID is empty for a DICOM resource, the date shift is computed based on this key and the study instance UID. If `crypto_key` is not set, then `kms_wrapped` is used to calculate the date shift. If neither is set, a default key is generated for each de-identify operation. Must not be set if `kms_wrapped` is set. */
  cryptoKey?: string;
}

export const DateShiftConfig: Schema.Schema<DateShiftConfig> = Schema.suspend(() => Schema.Struct({
  kmsWrapped: Schema.optional(KmsWrappedCryptoKey),
  cryptoKey: Schema.optional(Schema.String),
})).annotate({ identifier: "DateShiftConfig" }) as any as Schema.Schema<DateShiftConfig>;

export interface CryptoHashConfig {
  /** KMS wrapped key. Must not be set if `crypto_key` is set. */
  kmsWrapped?: KmsWrappedCryptoKey;
  /** An AES 128/192/256 bit key. Causes the hash to be computed based on this key. A default key is generated for each Deidentify operation and is used when neither `crypto_key` nor `kms_wrapped` is specified. Must not be set if `kms_wrapped` is set. */
  cryptoKey?: string;
}

export const CryptoHashConfig: Schema.Schema<CryptoHashConfig> = Schema.suspend(() => Schema.Struct({
  kmsWrapped: Schema.optional(KmsWrappedCryptoKey),
  cryptoKey: Schema.optional(Schema.String),
})).annotate({ identifier: "CryptoHashConfig" }) as any as Schema.Schema<CryptoHashConfig>;

export interface InfoTypeTransformation {
  /** Config for text redaction. */
  redactConfig?: RedactConfig;
  /** Config for replace with InfoType. */
  replaceWithInfoTypeConfig?: ReplaceWithInfoTypeConfig;
  /** Config for character mask. */
  characterMaskConfig?: CharacterMaskConfig;
  /** Config for date shift. */
  dateShiftConfig?: DateShiftConfig;
  /** Optional. InfoTypes to apply this transformation to. If this is not specified, the transformation applies to any info_type. */
  infoTypes?: Array<string>;
  /** Config for crypto hash. */
  cryptoHashConfig?: CryptoHashConfig;
}

export const InfoTypeTransformation: Schema.Schema<InfoTypeTransformation> = Schema.suspend(() => Schema.Struct({
  redactConfig: Schema.optional(RedactConfig),
  replaceWithInfoTypeConfig: Schema.optional(ReplaceWithInfoTypeConfig),
  characterMaskConfig: Schema.optional(CharacterMaskConfig),
  dateShiftConfig: Schema.optional(DateShiftConfig),
  infoTypes: Schema.optional(Schema.Array(Schema.String)),
  cryptoHashConfig: Schema.optional(CryptoHashConfig),
})).annotate({ identifier: "InfoTypeTransformation" }) as any as Schema.Schema<InfoTypeTransformation>;

export interface TextConfig {
  /** Optional. InfoTypes to skip transforming, overriding `additional_transformations`. */
  excludeInfoTypes?: Array<string>;
  /** Optional. The transformations to apply to the detected data. Deprecated. Use `additional_transformations` instead. */
  transformations?: Array<InfoTypeTransformation>;
  /** Optional. Transformations to apply to the detected data, overridden by `exclude_info_types`. */
  additionalTransformations?: Array<InfoTypeTransformation>;
}

export const TextConfig: Schema.Schema<TextConfig> = Schema.suspend(() => Schema.Struct({
  excludeInfoTypes: Schema.optional(Schema.Array(Schema.String)),
  transformations: Schema.optional(Schema.Array(InfoTypeTransformation)),
  additionalTransformations: Schema.optional(Schema.Array(InfoTypeTransformation)),
})).annotate({ identifier: "TextConfig" }) as any as Schema.Schema<TextConfig>;

export interface DeidentifyConfig {
  /** Optional. Configures de-id of application/DICOM content. */
  dicom?: DicomConfig;
  /** Optional. Configures de-identification of image pixels wherever they are found in the source_dataset. */
  image?: ImageConfig;
  /** Optional. Configures de-id of application/FHIR content. */
  fhir?: FhirConfig;
  /** Optional. Configures de-identification of text wherever it is found in the source_dataset. */
  text?: TextConfig;
  /** Optional. Ensures in-flight data remains in the region of origin during de-identification. The default value is false. Using this option results in a significant reduction of throughput, and is not compatible with `LOCATION` or `ORGANIZATION_NAME` infoTypes. `LOCATION` must be excluded within TextConfig, and must also be excluded within ImageConfig if image redaction is required. */
  useRegionalDataProcessing?: boolean;
}

export const DeidentifyConfig: Schema.Schema<DeidentifyConfig> = Schema.suspend(() => Schema.Struct({
  dicom: Schema.optional(DicomConfig),
  image: Schema.optional(ImageConfig),
  fhir: Schema.optional(FhirConfig),
  text: Schema.optional(TextConfig),
  useRegionalDataProcessing: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DeidentifyConfig" }) as any as Schema.Schema<DeidentifyConfig>;

export interface DeidentifiedStoreDestination {
  /** Optional. The configuration to use when de-identifying resources that are added to this store. */
  config?: DeidentifyConfig;
  /** Optional. The full resource name of a Cloud Healthcare FHIR store, for example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`. */
  store?: string;
}

export const DeidentifiedStoreDestination: Schema.Schema<DeidentifiedStoreDestination> = Schema.suspend(() => Schema.Struct({
  config: Schema.optional(DeidentifyConfig),
  store: Schema.optional(Schema.String),
})).annotate({ identifier: "DeidentifiedStoreDestination" }) as any as Schema.Schema<DeidentifiedStoreDestination>;

export interface StreamConfig {
  /** Optional. Supply a FHIR resource type (such as "Patient" or "Observation"). See https://www.hl7.org/fhir/valueset-resource-types.html for a list of all FHIR resource types. The server treats an empty list as an intent to stream all the supported resource types in this FHIR store. */
  resourceTypes?: Array<string>;
  /** Optional. The destination BigQuery structure that contains both the dataset location and corresponding schema config. The output is organized in one table per resource type. The server reuses the existing tables (if any) that are named after the resource types. For example, "Patient", "Observation". When there is no existing table for a given resource type, the server attempts to create one. When a table schema doesn't align with the schema config, either because of existing incompatible schema or out of band incompatible modification, the server does not stream in new data. BigQuery imposes a 1 MB limit on streaming insert row size, therefore any resource mutation that generates more than 1 MB of BigQuery data is not streamed. One resolution in this case is to delete the incompatible table and let the server recreate one, though the newly created table only contains data after the table recreation. Results are written to BigQuery tables according to the parameters in BigQueryDestination.WriteDisposition. Different versions of the same resource are distinguishable by the meta.versionId and meta.lastUpdated columns. The operation (CREATE/UPDATE/DELETE) that results in the new version is recorded in the meta.tag. The tables contain all historical resource versions since streaming was enabled. For query convenience, the server also creates one view per table of the same name containing only the current resource version. The streamed data in the BigQuery dataset is not guaranteed to be completely unique. The combination of the id and meta.versionId columns should ideally identify a single unique row. But in rare cases, duplicates may exist. At query time, users may use the SQL select statement to keep only one of the duplicate rows given an id and meta.versionId pair. Alternatively, the server created view mentioned above also filters out duplicates. If a resource mutation cannot be streamed to BigQuery, errors are logged to Cloud Logging. For more information, see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). */
  bigqueryDestination?: GoogleCloudHealthcareV1FhirBigQueryDestination;
  /** The destination FHIR store for de-identified resources. After this field is added, all subsequent creates/updates/patches to the source store will be de-identified using the provided configuration and applied to the destination store. Resources deleted from the source store will be deleted from the destination store. Importing resources to the source store will not trigger the streaming. If the source store already contains resources when this option is enabled, those resources will not be copied to the destination store unless they are subsequently updated. This may result in invalid references in the destination store. Before adding this config, you must grant the healthcare.fhirResources.update permission on the destination store to your project's **Cloud Healthcare Service Agent** [service account](https://cloud.google.com/healthcare/docs/how-tos/permissions-healthcare-api-gcp-products#the_cloud_healthcare_service_agent). The destination store must set enable_update_create to true. The destination store must have disable_referential_integrity set to true. If a resource cannot be de-identified, errors will be logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). Not supported for R5 stores. */
  deidentifiedStoreDestination?: DeidentifiedStoreDestination;
}

export const StreamConfig: Schema.Schema<StreamConfig> = Schema.suspend(() => Schema.Struct({
  resourceTypes: Schema.optional(Schema.Array(Schema.String)),
  bigqueryDestination: Schema.optional(GoogleCloudHealthcareV1FhirBigQueryDestination),
  deidentifiedStoreDestination: Schema.optional(DeidentifiedStoreDestination),
})).annotate({ identifier: "StreamConfig" }) as any as Schema.Schema<StreamConfig>;

export interface FhirNotificationConfig {
  /** Optional. The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that notifications of changes are published on. Supplied by the client. The notification is a `PubsubMessage` with the following fields: * `PubsubMessage.Data` contains the resource name. * `PubsubMessage.MessageId` is the ID of this notification. It is guaranteed to be unique within the topic. * `PubsubMessage.PublishTime` is the time when the message was published. Note that notifications are only sent if the topic is non-empty. [Topic names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped to a project. The Cloud Healthcare API service account, service-@gcp-sa-healthcare.iam.gserviceaccount.com, must have publisher permissions on the given Pub/Sub topic. Not having adequate permissions causes the calls that send notifications to fail (https://cloud.google.com/healthcare-api/docs/permissions-healthcare-api-gcp-products#dicom_fhir_and_hl7v2_store_cloud_pubsub_permissions). If a notification can't be published to Pub/Sub, errors are logged to Cloud Logging. For more information, see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare-api/docs/how-tos/logging). */
  pubsubTopic?: string;
  /** Optional. Whether to send full FHIR resource to this Pub/Sub topic for deleting FHIR resource. The default value is false. Note that setting this to true does not guarantee that all previous resources will be sent in the format of full FHIR resource. When a resource change is too large or during heavy traffic, only the resource name will be sent. Clients should always check the "payloadType" label from a Pub/Sub message to determine whether it needs to fetch the full previous resource as a separate operation. */
  sendPreviousResourceOnDelete?: boolean;
  /** Optional. Whether to send full FHIR resource to this Pub/Sub topic. The default value is false. */
  sendFullResource?: boolean;
}

export const FhirNotificationConfig: Schema.Schema<FhirNotificationConfig> = Schema.suspend(() => Schema.Struct({
  pubsubTopic: Schema.optional(Schema.String),
  sendPreviousResourceOnDelete: Schema.optional(Schema.Boolean),
  sendFullResource: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "FhirNotificationConfig" }) as any as Schema.Schema<FhirNotificationConfig>;

export interface BulkExportGcsDestination {
  /** Optional. URI for a Cloud Storage directory where the server writes result files, in the format `gs://{bucket-id}/{path/to/destination/dir}`. If there is no trailing slash, the service appends one when composing the object path. The user is responsible for creating the Cloud Storage bucket referenced in `uri_prefix`. */
  uriPrefix?: string;
}

export const BulkExportGcsDestination: Schema.Schema<BulkExportGcsDestination> = Schema.suspend(() => Schema.Struct({
  uriPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "BulkExportGcsDestination" }) as any as Schema.Schema<BulkExportGcsDestination>;

export interface FhirStore {
  /** Output only. Identifier. Resource name of the FHIR store, of the form `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`. */
  name?: string;
  /** Optional. Enable parsing of references within complex FHIR data types such as Extensions. If this value is set to ENABLED, then features like referential integrity and Bundle reference rewriting apply to all references. If this flag has not been specified the behavior of the FHIR store will not change, references in complex data types will not be parsed. New stores will have this value set to ENABLED after a notification period. Warning: turning on this flag causes processing existing resources to fail if they contain references to non-existent resources. Cannot be disabled in R5. */
  complexDataTypeReferenceParsing?: "COMPLEX_DATA_TYPE_REFERENCE_PARSING_UNSPECIFIED" | "DISABLED" | "ENABLED" | (string & {});
  /** Required. Immutable. The FHIR specification version that this FHIR store supports natively. This field is immutable after store creation. Requests are rejected if they contain FHIR resources of a different version. Version is required for every FHIR store. */
  version?: "VERSION_UNSPECIFIED" | "DSTU2" | "STU3" | "R4" | "R5" | (string & {});
  /** Optional. Configuration for how to validate incoming FHIR resources against configured profiles. */
  validationConfig?: ValidationConfig;
  /** Optional. Whether this FHIR store has the [updateCreate capability](https://www.hl7.org/fhir/capabilitystatement-definitions.html#CapabilityStatement.rest.resource.updateCreate). This determines if the client can use an Update operation to create a new resource with a client-specified ID. If false, all IDs are server-assigned through the Create operation and attempts to update a non-existent resource return errors. It is strongly advised not to include or encode any sensitive data such as patient identifiers in client-specified resource IDs. Those IDs are part of the FHIR resource path recorded in Cloud audit logs and Pub/Sub notifications. Those IDs can also be contained in reference fields within other resources. Defaults to false. */
  enableUpdateCreate?: boolean;
  /** Optional. Specifies whether this store has consent enforcement. Not available for DSTU2 FHIR version due to absence of Consent resources. Not supported for R5 FHIR version. */
  consentConfig?: ConsentConfig;
  /** Deprecated. Use `notification_configs` instead. If non-empty, publish all resource modifications of this FHIR store to this destination. The Pub/Sub message attributes contain a map with a string describing the action that has triggered the notification. For example, "action":"CreateResource". Not supported in R5. Use `notification_configs` instead. */
  notificationConfig?: NotificationConfig;
  /** Immutable. Whether to disable referential integrity in this FHIR store. This field is immutable after FHIR store creation. The default value is false, meaning that the API enforces referential integrity and fails the requests that result in inconsistent state in the FHIR store. When this field is set to true, the API skips referential integrity checks. Consequently, operations that rely on references, such as GetPatientEverything, do not return all the results if broken references exist. */
  disableReferentialIntegrity?: boolean;
  /** Optional. A list of streaming configs that configure the destinations of streaming export for every resource mutation in this FHIR store. Each store is allowed to have up to 10 streaming configs. After a new config is added, the next resource mutation is streamed to the new location in addition to the existing ones. When a location is removed from the list, the server stops streaming to that location. Before adding a new config, you must add the required [`bigquery.dataEditor`](https://cloud.google.com/bigquery/docs/access-control#bigquery.dataEditor) role to your project's **Cloud Healthcare Service Agent** [service account](https://cloud.google.com/iam/docs/service-accounts). Some lag (typically on the order of dozens of seconds) is expected before the results show up in the streaming destination. */
  streamConfigs?: Array<StreamConfig>;
  /** Optional. Specifies where and whether to send notifications upon changes to a FHIR store. */
  notificationConfigs?: Array<FhirNotificationConfig>;
  /** Optional. FHIR bulk export exports resources to the specified Cloud Storage destination. A Cloud Storage destination is a URI for a Cloud Storage directory where result files will be written. Only used in the spec-defined bulk $export methods. The Cloud Healthcare Service Agent requires the `roles/storage.objectAdmin` Cloud IAM role on the destination. */
  bulkExportGcsDestination?: BulkExportGcsDestination;
  /** Immutable. Whether to disable resource versioning for this FHIR store. This field can not be changed after the creation of FHIR store. If set to false, all write operations cause historical versions to be recorded automatically. The historical versions can be fetched through the history APIs, but cannot be updated. If set to true, no historical versions are kept. The server sends errors for attempts to read the historical versions. Defaults to false. */
  disableResourceVersioning?: boolean;
  /** User-supplied key-value pairs used to organize FHIR stores. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: \p{Ll}\p{Lo}{0,62} Label values are optional, must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: [\p{Ll}\p{Lo}\p{N}_-]{0,63} No more than 64 labels can be associated with a given store. */
  labels?: Record<string, string>;
  /** Optional. If true, overrides the default search behavior for this FHIR store to `handling=strict` which returns an error for unrecognized search parameters. If false, uses the FHIR specification default `handling=lenient` which ignores unrecognized search parameters. The handling can always be changed from the default on an individual API call by setting the HTTP header `Prefer: handling=strict` or `Prefer: handling=lenient`. Defaults to false. */
  defaultSearchHandlingStrict?: boolean;
}

export const FhirStore: Schema.Schema<FhirStore> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  complexDataTypeReferenceParsing: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
  validationConfig: Schema.optional(ValidationConfig),
  enableUpdateCreate: Schema.optional(Schema.Boolean),
  consentConfig: Schema.optional(ConsentConfig),
  notificationConfig: Schema.optional(NotificationConfig),
  disableReferentialIntegrity: Schema.optional(Schema.Boolean),
  streamConfigs: Schema.optional(Schema.Array(StreamConfig)),
  notificationConfigs: Schema.optional(Schema.Array(FhirNotificationConfig)),
  bulkExportGcsDestination: Schema.optional(BulkExportGcsDestination),
  disableResourceVersioning: Schema.optional(Schema.Boolean),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  defaultSearchHandlingStrict: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "FhirStore" }) as any as Schema.Schema<FhirStore>;

export interface ListFhirStoresResponse {
  /** Token to retrieve the next page of results or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** The returned FHIR stores. Won't be more FHIR stores than the value of page_size in the request. */
  fhirStores?: Array<FhirStore>;
}

export const ListFhirStoresResponse: Schema.Schema<ListFhirStoresResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  fhirStores: Schema.optional(Schema.Array(FhirStore)),
})).annotate({ identifier: "ListFhirStoresResponse" }) as any as Schema.Schema<ListFhirStoresResponse>;

export interface SchemaSegment {
  /** The Segment type. For example, "PID". */
  type?: string;
  /** The minimum number of times this segment can be present in this group. */
  minOccurs?: number;
  /** The maximum number of times this segment can be present in this group. 0 or -1 means unbounded. */
  maxOccurs?: number;
}

export const SchemaSegment: Schema.Schema<SchemaSegment> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  minOccurs: Schema.optional(Schema.Number),
  maxOccurs: Schema.optional(Schema.Number),
})).annotate({ identifier: "SchemaSegment" }) as any as Schema.Schema<SchemaSegment>;

export interface GroupOrSegment {
  group?: SchemaGroup;
  segment?: SchemaSegment;
}

export const GroupOrSegment: Schema.Schema<GroupOrSegment> = Schema.suspend(() => Schema.Struct({
  group: Schema.optional(SchemaGroup),
  segment: Schema.optional(SchemaSegment),
})).annotate({ identifier: "GroupOrSegment" }) as any as Schema.Schema<GroupOrSegment>;

export interface SchemaGroup {
  /** Nested groups and/or segments. */
  members?: Array<GroupOrSegment>;
  /** The name of this group. For example, "ORDER_DETAIL". */
  name?: string;
  /** The maximum number of times this group can be repeated. 0 or -1 means unbounded. */
  maxOccurs?: number;
  /** The minimum number of times this group must be present/repeated. */
  minOccurs?: number;
  /** True indicates that this is a choice group, meaning that only one of its segments can exist in a given message. */
  choice?: boolean;
}

export const SchemaGroup: Schema.Schema<SchemaGroup> = Schema.suspend(() => Schema.Struct({
  members: Schema.optional(Schema.Array(GroupOrSegment)),
  name: Schema.optional(Schema.String),
  maxOccurs: Schema.optional(Schema.Number),
  minOccurs: Schema.optional(Schema.Number),
  choice: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "SchemaGroup" }) as any as Schema.Schema<SchemaGroup>;

export interface ListDicomStoresResponse {
  /** The returned DICOM stores. Won't be more DICOM stores than the value of page_size in the request. */
  dicomStores?: Array<DicomStore>;
  /** Token to retrieve the next page of results or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListDicomStoresResponse: Schema.Schema<ListDicomStoresResponse> = Schema.suspend(() => Schema.Struct({
  dicomStores: Schema.optional(Schema.Array(DicomStore)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListDicomStoresResponse" }) as any as Schema.Schema<ListDicomStoresResponse>;

export interface ConsentStore {
  /** Identifier. Resource name of the consent store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}`. Cannot be changed after creation. */
  name?: string;
  /** Optional. If `true`, UpdateConsent creates the Consent if it does not already exist. If unspecified, defaults to `false`. */
  enableConsentCreateOnUpdate?: boolean;
  /** Optional. Default time to live for Consents created in this store. Must be at least 24 hours. Updating this field will not affect the expiration time of existing consents. */
  defaultConsentTtl?: string;
  /** Optional. User-supplied key-value pairs used to organize consent stores. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: \p{Ll}\p{Lo}{0,62}. Label values must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: [\p{Ll}\p{Lo}\p{N}_-]{0,63}. No more than 64 labels can be associated with a given store. For more information: https://cloud.google.com/healthcare/docs/how-tos/labeling-resources */
  labels?: Record<string, string>;
}

export const ConsentStore: Schema.Schema<ConsentStore> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  enableConsentCreateOnUpdate: Schema.optional(Schema.Boolean),
  defaultConsentTtl: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "ConsentStore" }) as any as Schema.Schema<ConsentStore>;

export interface ListConsentStoresResponse {
  /** The returned consent stores. The maximum number of stores returned is determined by the value of page_size in the ListConsentStoresRequest. */
  consentStores?: Array<ConsentStore>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListConsentStoresResponse: Schema.Schema<ListConsentStoresResponse> = Schema.suspend(() => Schema.Struct({
  consentStores: Schema.optional(Schema.Array(ConsentStore)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListConsentStoresResponse" }) as any as Schema.Schema<ListConsentStoresResponse>;

export interface Entity {
  /** entity_id is a first class field entity_id uniquely identifies this concept and its meta-vocabulary. For example, "UMLS/C0000970". */
  entityId?: string;
  /** preferred_term is the preferred term for this concept. For example, "Acetaminophen". For ad hoc entities formed by normalization, this is the most popular unnormalized string. */
  preferredTerm?: string;
  /** Vocabulary codes are first-class fields and differentiated from the concept unique identifier (entity_id). vocabulary_codes contains the representation of this concept in particular vocabularies, such as ICD-10, SNOMED-CT and RxNORM. These are prefixed by the name of the vocabulary, followed by the unique code within that vocabulary. For example, "RXNORM/A10334543". */
  vocabularyCodes?: Array<string>;
}

export const Entity: Schema.Schema<Entity> = Schema.suspend(() => Schema.Struct({
  entityId: Schema.optional(Schema.String),
  preferredTerm: Schema.optional(Schema.String),
  vocabularyCodes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Entity" }) as any as Schema.Schema<Entity>;

export interface PubsubDestination {
  /** The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that Pub/Sub messages are published on. Supplied by the client. The `PubsubMessage` contains the following fields: * `PubsubMessage.Data` contains the resource name. * `PubsubMessage.MessageId` is the ID of this notification. It is guaranteed to be unique within the topic. * `PubsubMessage.PublishTime` is the time when the message was published. [Topic names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped to a project. The Cloud Healthcare API service account, service-PROJECT_NUMBER@gcp-sa-healthcare.iam.gserviceaccount.com, must have publisher permissions on the given Pub/Sub topic. Not having adequate permissions causes the calls that send notifications to fail. */
  pubsubTopic?: string;
}

export const PubsubDestination: Schema.Schema<PubsubDestination> = Schema.suspend(() => Schema.Struct({
  pubsubTopic: Schema.optional(Schema.String),
})).annotate({ identifier: "PubsubDestination" }) as any as Schema.Schema<PubsubDestination>;

export interface GcsSource {
  /** Points to a Cloud Storage URI containing file(s) to import. The URI must be in the following format: `gs://{bucket_id}/{object_id}`. The URI can include wildcards in `object_id` and thus identify multiple files. Supported wildcards: * `*` to match 0 or more non-separator characters * `**` to match 0 or more characters (including separators). Must be used at the end of a path and with no other wildcards in the path. Can also be used with a file extension (such as .ndjson), which imports all files with the extension in the specified directory and its sub-directories. For example, `gs://my-bucket/my-directory/**.ndjson` imports all files with `.ndjson` extensions in `my-directory/` and its sub-directories. * `?` to match 1 character Files matching the wildcard are expected to contain content only, no metadata. */
  uri?: string;
}

export const GcsSource: Schema.Schema<GcsSource> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GcsSource" }) as any as Schema.Schema<GcsSource>;

export interface ImportMessagesRequest {
  /** Cloud Storage source data location and import configuration. The Cloud Healthcare Service Agent requires the `roles/storage.objectViewer` Cloud IAM roles on the Cloud Storage location. */
  gcsSource?: GcsSource;
}

export const ImportMessagesRequest: Schema.Schema<ImportMessagesRequest> = Schema.suspend(() => Schema.Struct({
  gcsSource: Schema.optional(GcsSource),
})).annotate({ identifier: "ImportMessagesRequest" }) as any as Schema.Schema<ImportMessagesRequest>;

export interface GcsDestination {
  /** The format of the exported HL7v2 message files. */
  contentStructure?: "CONTENT_STRUCTURE_UNSPECIFIED" | "MESSAGE_JSON" | (string & {});
  /** URI of an existing Cloud Storage directory where the server writes result files, in the format `gs://{bucket-id}/{path/to/destination/dir}`. If there is no trailing slash, the service appends one when composing the object path. */
  uriPrefix?: string;
  /** Specifies the parts of the Message resource to include in the export. If not specified, FULL is used. */
  messageView?: "MESSAGE_VIEW_UNSPECIFIED" | "RAW_ONLY" | "PARSED_ONLY" | "FULL" | "SCHEMATIZED_ONLY" | "BASIC" | (string & {});
}

export const GcsDestination: Schema.Schema<GcsDestination> = Schema.suspend(() => Schema.Struct({
  contentStructure: Schema.optional(Schema.String),
  uriPrefix: Schema.optional(Schema.String),
  messageView: Schema.optional(Schema.String),
})).annotate({ identifier: "GcsDestination" }) as any as Schema.Schema<GcsDestination>;

export interface ExportMessagesRequest {
  /** Restricts messages exported to those matching a filter, only applicable to PubsubDestination and GcsDestination. The following syntax is available: * A string field value can be written as text inside quotation marks, for example `"query text"`. The only valid relational operation for text fields is equality (`=`), where text is searched within the field, rather than having the field be equal to the text. For example, `"Comment = great"` returns messages with `great` in the comment field. * A number field value can be written as an integer, a decimal, or an exponential. The valid relational operators for number fields are the equality operator (`=`), along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * A date field value must be written in the `yyyy-mm-dd` format. Fields with date and time use the RFC3339 time format. Leading zeros are required for one-digit months and days. The valid relational operators for date fields are the equality operator (`=`) , along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * Multiple field query expressions can be combined in one query by adding `AND` or `OR` operators between the expressions. If a boolean operator appears within a quoted string, it is not treated as special, and is just another part of the character string to be matched. You can prepend the `NOT` operator to an expression to negate it. The following fields and functions are available for filtering: * `message_type`, from the MSH-9.1 field. For example, `NOT message_type = "ADT"`. * `send_date` or `sendDate`, the `yyyy-mm-dd` date the message was sent in the dataset's time_zone, from the MSH-7 segment. For example, `send_date < "2017-01-02"`. * `send_time`, the timestamp when the message was sent, using the RFC3339 time format for comparisons, from the MSH-7 segment. For example, `send_time < "2017-01-02T00:00:00-05:00"`. * `create_time`, the timestamp when the message was created in the HL7v2 store. Use the RFC3339 time format for comparisons. For example, `create_time < "2017-01-02T00:00:00-05:00"`. * `send_facility`, the care center that the message came from, from the MSH-4 segment. For example, `send_facility = "ABC"`. Note: The filter will be applied to every message in the HL7v2 store whose `send_time` lies in the range defined by the `start_time` and the `end_time`. Even if the filter only matches a small set of messages, the export operation can still take a long time to finish when a lot of messages are between the specified `start_time` and `end_time` range. */
  filter?: string;
  /** The end of the range in `send_time` (MSH.7, https://www.hl7.org/documentcenter/public_temp_2E58C1F9-1C23-BA17-0C6126475344DA9D/wg/conf/HL7MSH.htm) to process. If not specified, the time when the export is scheduled is used. This value has to come after the `start_time` defined below. Only messages whose `send_time` lies in the range `start_time` (inclusive) to `end_time` (exclusive) are exported. */
  endTime?: string;
  /** Export to a Cloud Storage destination. */
  gcsDestination?: GcsDestination;
  /** Export messages to a Pub/Sub topic. */
  pubsubDestination?: PubsubDestination;
  /** The start of the range in `send_time` (MSH.7, https://www.hl7.org/documentcenter/public_temp_2E58C1F9-1C23-BA17-0C6126475344DA9D/wg/conf/HL7MSH.htm) to process. If not specified, the UNIX epoch (1970-01-01T00:00:00Z) is used. This value has to come before the `end_time` defined below. Only messages whose `send_time` lies in the range `start_time` (inclusive) to `end_time` (exclusive) are exported. */
  startTime?: string;
}

export const ExportMessagesRequest: Schema.Schema<ExportMessagesRequest> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  gcsDestination: Schema.optional(GcsDestination),
  pubsubDestination: Schema.optional(PubsubDestination),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "ExportMessagesRequest" }) as any as Schema.Schema<ExportMessagesRequest>;

export interface BlobStorageSettings {
  /** The Storage class in which the Blob data is stored. */
  blobStorageClass?: "BLOB_STORAGE_CLASS_UNSPECIFIED" | "STANDARD" | "NEARLINE" | "COLDLINE" | "ARCHIVE" | (string & {});
}

export const BlobStorageSettings: Schema.Schema<BlobStorageSettings> = Schema.suspend(() => Schema.Struct({
  blobStorageClass: Schema.optional(Schema.String),
})).annotate({ identifier: "BlobStorageSettings" }) as any as Schema.Schema<BlobStorageSettings>;

export interface GoogleCloudHealthcareV1DeidentifyDeidentifyFhirStoreSummary {
}

export const GoogleCloudHealthcareV1DeidentifyDeidentifyFhirStoreSummary: Schema.Schema<GoogleCloudHealthcareV1DeidentifyDeidentifyFhirStoreSummary> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudHealthcareV1DeidentifyDeidentifyFhirStoreSummary" }) as any as Schema.Schema<GoogleCloudHealthcareV1DeidentifyDeidentifyFhirStoreSummary>;

export interface EncryptionSpec {
  /** Required. The resource name of customer-managed encryption key that is used to secure a resource and its sub-resources. Only the key in the same location as this Dataset is allowed to be used for encryption. Format is: `projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{key}` */
  kmsKeyName?: string;
}

export const EncryptionSpec: Schema.Schema<EncryptionSpec> = Schema.suspend(() => Schema.Struct({
  kmsKeyName: Schema.optional(Schema.String),
})).annotate({ identifier: "EncryptionSpec" }) as any as Schema.Schema<EncryptionSpec>;

export interface Dataset {
  /** Output only. Whether the dataset satisfies zone isolation. */
  satisfiesPzi?: boolean;
  /** Optional. Customer-managed encryption key spec for a Dataset. If set, this Dataset and all of its sub-resources will be secured by this key. If empty, the Dataset is secured by the default Google encryption key. */
  encryptionSpec?: EncryptionSpec;
  /** Output only. Whether the dataset satisfies zone separation. */
  satisfiesPzs?: boolean;
  /** Optional. The default timezone used by this dataset. Must be a either a valid IANA time zone name such as "America/New_York" or empty, which defaults to UTC. This is used for parsing times in resources, such as HL7 messages, where no explicit timezone is specified. */
  timeZone?: string;
  /** Identifier. Resource name of the dataset, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}`. */
  name?: string;
}

export const Dataset: Schema.Schema<Dataset> = Schema.suspend(() => Schema.Struct({
  satisfiesPzi: Schema.optional(Schema.Boolean),
  encryptionSpec: Schema.optional(EncryptionSpec),
  satisfiesPzs: Schema.optional(Schema.Boolean),
  timeZone: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Dataset" }) as any as Schema.Schema<Dataset>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface ParsedData {
  segments?: Array<Segment>;
}

export const ParsedData: Schema.Schema<ParsedData> = Schema.suspend(() => Schema.Struct({
  segments: Schema.optional(Schema.Array(Segment)),
})).annotate({ identifier: "ParsedData" }) as any as Schema.Schema<ParsedData>;

export interface GoogleCloudHealthcareV1FhirGcsDestination {
  /** URI for a Cloud Storage directory where result files should be written, in the format of `gs://{bucket-id}/{path/to/destination/dir}`. If there is no trailing slash, the service appends one when composing the object path. The user is responsible for creating the Cloud Storage bucket referenced in `uri_prefix`. */
  uriPrefix?: string;
}

export const GoogleCloudHealthcareV1FhirGcsDestination: Schema.Schema<GoogleCloudHealthcareV1FhirGcsDestination> = Schema.suspend(() => Schema.Struct({
  uriPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudHealthcareV1FhirGcsDestination" }) as any as Schema.Schema<GoogleCloudHealthcareV1FhirGcsDestination>;

export interface ExportResourcesRequest {
  /** The Cloud Storage output destination. The Healthcare Service Agent account requires the `roles/storage.objectAdmin` role on the Cloud Storage location. The exported outputs are organized by FHIR resource types. The server creates one object per resource type. Each object contains newline delimited JSON, and each line is a FHIR resource. */
  gcsDestination?: GoogleCloudHealthcareV1FhirGcsDestination;
  /** String of comma-delimited FHIR resource types. If provided, only resources of the specified resource type(s) are exported. */
  _type?: string;
  /** The BigQuery output destination. The Cloud Healthcare Service Agent requires two IAM roles on the BigQuery location: `roles/bigquery.dataEditor` and `roles/bigquery.jobUser`. The output is one BigQuery table per resource type. Unlike when setting `BigQueryDestination` for `StreamConfig`, `ExportResources` does not create BigQuery views. */
  bigqueryDestination?: GoogleCloudHealthcareV1FhirBigQueryDestination;
  /** If provided, only resources updated after this time are exported. The time uses the format YYYY-MM-DDThh:mm:ss.sss+zz:zz. For example, `2015-02-07T13:28:17.239+02:00` or `2017-01-01T00:00:00Z`. The time must be specified to the second and include a time zone. */
  _since?: string;
}

export const ExportResourcesRequest: Schema.Schema<ExportResourcesRequest> = Schema.suspend(() => Schema.Struct({
  gcsDestination: Schema.optional(GoogleCloudHealthcareV1FhirGcsDestination),
  _type: Schema.optional(Schema.String),
  bigqueryDestination: Schema.optional(GoogleCloudHealthcareV1FhirBigQueryDestination),
  _since: Schema.optional(Schema.String),
})).annotate({ identifier: "ExportResourcesRequest" }) as any as Schema.Schema<ExportResourcesRequest>;

export interface Binding {
  /** Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: * `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. * `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. * `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . * `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. * `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a [Kubernetes service account](https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. * `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. * `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. * `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. * `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. * `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. * `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. * `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. * `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. * `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. * `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. */
  members?: Array<string>;
  /** Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the [IAM documentation](https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see [here](https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: Expr;
}

export const Binding: Schema.Schema<Binding> = Schema.suspend(() => Schema.Struct({
  members: Schema.optional(Schema.Array(Schema.String)),
  role: Schema.optional(Schema.String),
  condition: Schema.optional(Expr),
})).annotate({ identifier: "Binding" }) as any as Schema.Schema<Binding>;

export interface AuditLogConfig {
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
}

export const AuditLogConfig: Schema.Schema<AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  logType: Schema.optional(Schema.String),
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
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

export interface Policy {
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(Binding)),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

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

export interface DicomFilterConfig {
  /** The Cloud Storage location of the filter configuration file. The `gcs_uri` must be in the format `gs://bucket/path/to/object`. The filter configuration file must contain a list of resource paths separated by newline characters (\n or \r\n). Each resource path must be in the format "/studies/{studyUID}[/series/{seriesUID}[/instances/{instanceUID}]]" The Cloud Healthcare API service account must have the `roles/storage.objectViewer` Cloud IAM role for this Cloud Storage location. */
  resourcePathsGcsUri?: string;
}

export const DicomFilterConfig: Schema.Schema<DicomFilterConfig> = Schema.suspend(() => Schema.Struct({
  resourcePathsGcsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "DicomFilterConfig" }) as any as Schema.Schema<DicomFilterConfig>;

export interface DeidentifyDicomStoreRequest {
  /** Required. The name of the DICOM store to write the redacted data to. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. * The destination dataset and DICOM store must exist. * The source dataset and destination dataset must both reside in the same location. De-identifying data across multiple locations is not supported. * The caller must have the healthcare.dicomStores.dicomWebWrite permission to write to the destination DICOM store. */
  destinationStore?: string;
  /** Cloud Storage location to read the JSON cloud.healthcare.deidentify.DeidentifyConfig from, overriding the default config. Must be of the form `gs://{bucket_id}/path/to/object`. The Cloud Storage location must grant the Cloud IAM role `roles/storage.objectViewer` to the project's Cloud Healthcare Service Agent service account. Only one of `config` and `gcs_config_uri` can be specified. */
  gcsConfigUri?: string;
  /** Deidentify configuration. Only one of `config` and `gcs_config_uri` can be specified. */
  config?: DeidentifyConfig;
  /** Filter configuration. */
  filterConfig?: DicomFilterConfig;
}

export const DeidentifyDicomStoreRequest: Schema.Schema<DeidentifyDicomStoreRequest> = Schema.suspend(() => Schema.Struct({
  destinationStore: Schema.optional(Schema.String),
  gcsConfigUri: Schema.optional(Schema.String),
  config: Schema.optional(DeidentifyConfig),
  filterConfig: Schema.optional(DicomFilterConfig),
})).annotate({ identifier: "DeidentifyDicomStoreRequest" }) as any as Schema.Schema<DeidentifyDicomStoreRequest>;

export interface Image {
  /** Consent artifact content represented as a stream of bytes. This field is populated when returned in GetConsentArtifact response, but not included in CreateConsentArtifact and ListConsentArtifact response. */
  rawBytes?: string;
  /** Input only. Points to a Cloud Storage URI containing the consent artifact content. The URI must be in the following format: `gs://{bucket_id}/{object_id}`. The Cloud Healthcare API service account must have the `roles/storage.objectViewer` Cloud IAM role for this Cloud Storage location. The consent artifact content at this URI is copied to a Cloud Storage location managed by the Cloud Healthcare API. Responses to fetching requests return the consent artifact content in raw_bytes. */
  gcsUri?: string;
}

export const Image: Schema.Schema<Image> = Schema.suspend(() => Schema.Struct({
  rawBytes: Schema.optional(Schema.String),
  gcsUri: Schema.optional(Schema.String),
})).annotate({ identifier: "Image" }) as any as Schema.Schema<Image>;

export interface Signature {
  /** Required. User's UUID provided by the client. */
  userId?: string;
  /** Optional. Timestamp of the signature. */
  signatureTime?: string;
  /** Optional. An image of the user's signature. */
  image?: Image;
  /** Optional. Metadata associated with the user's signature. For example, the user's name or the user's title. */
  metadata?: Record<string, string>;
}

export const Signature: Schema.Schema<Signature> = Schema.suspend(() => Schema.Struct({
  userId: Schema.optional(Schema.String),
  signatureTime: Schema.optional(Schema.String),
  image: Schema.optional(Image),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "Signature" }) as any as Schema.Schema<Signature>;

export interface ConsentArtifact {
  /** Optional. User's signature. */
  userSignature?: Signature;
  /** Required. User's UUID provided by the client. */
  userId?: string;
  /** Optional. A signature from a witness. */
  witnessSignature?: Signature;
  /** Optional. Screenshots, PDFs, or other binary information documenting the user's consent. */
  consentContentScreenshots?: Array<Image>;
  /** Identifier. Resource name of the Consent artifact, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consentArtifacts/{consent_artifact_id}`. Cannot be changed after creation. */
  name?: string;
  /** Optional. Metadata associated with the Consent artifact. For example, the consent locale or user agent version. */
  metadata?: Record<string, string>;
  /** Optional. An string indicating the version of the consent information shown to the user. */
  consentContentVersion?: string;
  /** Optional. A signature from a guardian. */
  guardianSignature?: Signature;
}

export const ConsentArtifact: Schema.Schema<ConsentArtifact> = Schema.suspend(() => Schema.Struct({
  userSignature: Schema.optional(Signature),
  userId: Schema.optional(Schema.String),
  witnessSignature: Schema.optional(Signature),
  consentContentScreenshots: Schema.optional(Schema.Array(Image)),
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  consentContentVersion: Schema.optional(Schema.String),
  guardianSignature: Schema.optional(Signature),
})).annotate({ identifier: "ConsentArtifact" }) as any as Schema.Schema<ConsentArtifact>;

export interface BlobStorageInfo {
  /** The time at which the storage class was updated. This is used to compute early deletion fees of the resource. */
  storageClassUpdateTime?: string;
  /** The storage class in which the Blob data is stored. */
  storageClass?: "BLOB_STORAGE_CLASS_UNSPECIFIED" | "STANDARD" | "NEARLINE" | "COLDLINE" | "ARCHIVE" | (string & {});
  /** Size in bytes of data stored in Blob Storage. */
  sizeBytes?: string;
}

export const BlobStorageInfo: Schema.Schema<BlobStorageInfo> = Schema.suspend(() => Schema.Struct({
  storageClassUpdateTime: Schema.optional(Schema.String),
  storageClass: Schema.optional(Schema.String),
  sizeBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "BlobStorageInfo" }) as any as Schema.Schema<BlobStorageInfo>;

export interface StructuredStorageInfo {
  /** Size in bytes of data stored in structured storage. */
  sizeBytes?: string;
}

export const StructuredStorageInfo: Schema.Schema<StructuredStorageInfo> = Schema.suspend(() => Schema.Struct({
  sizeBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "StructuredStorageInfo" }) as any as Schema.Schema<StructuredStorageInfo>;

export interface StorageInfo {
  /** Info about the data stored in blob storage for the resource. */
  blobStorageInfo?: BlobStorageInfo;
  /** The resource whose storage info is returned. For example: `projects/{projectID}/locations/{locationID}/datasets/{datasetID}/dicomStores/{dicomStoreID}/dicomWeb/studies/{studyUID}/series/{seriesUID}/instances/{instanceUID}` */
  referencedResource?: string;
  /** Info about the data stored in structured storage for the resource. */
  structuredStorageInfo?: StructuredStorageInfo;
}

export const StorageInfo: Schema.Schema<StorageInfo> = Schema.suspend(() => Schema.Struct({
  blobStorageInfo: Schema.optional(BlobStorageInfo),
  referencedResource: Schema.optional(Schema.String),
  structuredStorageInfo: Schema.optional(StructuredStorageInfo),
})).annotate({ identifier: "StorageInfo" }) as any as Schema.Schema<StorageInfo>;

export interface PatientId {
  /** ID type. For example, MRN or NHS. */
  type?: string;
  /** The patient's unique identifier. */
  value?: string;
}

export const PatientId: Schema.Schema<PatientId> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "PatientId" }) as any as Schema.Schema<PatientId>;

export interface SchematizedData {
  /** JSON output of the parser. */
  data?: string;
  /** The error output of the parser. */
  error?: string;
}

export const SchematizedData: Schema.Schema<SchematizedData> = Schema.suspend(() => Schema.Struct({
  data: Schema.optional(Schema.String),
  error: Schema.optional(Schema.String),
})).annotate({ identifier: "SchematizedData" }) as any as Schema.Schema<SchematizedData>;

export interface Message {
  /** Output only. The datetime the sending application sent this message. MSH-7. */
  sendTime?: string;
  /** Output only. Resource name of the Message, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7V2Stores/{hl7_v2_store_id}/messages/{message_id}`. */
  name?: string;
  /** Required. Raw message bytes. */
  data?: string;
  /** Output only. The parsed version of the raw message data. */
  parsedData?: ParsedData;
  /** User-supplied key-value pairs used to organize HL7v2 stores. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: \p{Ll}\p{Lo}{0,62} Label values are optional, must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: [\p{Ll}\p{Lo}\p{N}_-]{0,63} No more than 64 labels can be associated with a given store. */
  labels?: Record<string, string>;
  /** Output only. All patient IDs listed in the PID-2, PID-3, and PID-4 segments of this message. */
  patientIds?: Array<PatientId>;
  /** Output only. The hospital that this message came from. MSH-4. */
  sendFacility?: string;
  /** Output only. The datetime when the message was created. Set by the server. */
  createTime?: string;
  /** Output only. The parsed version of the raw message data schematized according to this store's schemas and type definitions. */
  schematizedData?: SchematizedData;
  /** Output only. The message type for this message. MSH-9.1. */
  messageType?: string;
}

export const Message: Schema.Schema<Message> = Schema.suspend(() => Schema.Struct({
  sendTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
  parsedData: Schema.optional(ParsedData),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  patientIds: Schema.optional(Schema.Array(PatientId)),
  sendFacility: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  schematizedData: Schema.optional(SchematizedData),
  messageType: Schema.optional(Schema.String),
})).annotate({ identifier: "Message" }) as any as Schema.Schema<Message>;

export interface CreateMessageRequest {
  /** Required. HL7v2 message. */
  message?: Message;
}

export const CreateMessageRequest: Schema.Schema<CreateMessageRequest> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Message),
})).annotate({ identifier: "CreateMessageRequest" }) as any as Schema.Schema<CreateMessageRequest>;

export interface AttributeDefinition {
  /** Required. The category of the attribute. The value of this field cannot be changed after creation. */
  category?: "CATEGORY_UNSPECIFIED" | "RESOURCE" | "REQUEST" | (string & {});
  /** Identifier. Resource name of the Attribute definition, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/attributeDefinitions/{attribute_definition_id}`. Cannot be changed after creation. */
  name?: string;
  /** Optional. Default values of the attribute in Consents. If no default values are specified, it defaults to an empty value. */
  consentDefaultValues?: Array<string>;
  /** Optional. A description of the attribute. */
  description?: string;
  /** Required. Possible values for the attribute. The number of allowed values must not exceed 500. An empty list is invalid. The list can only be expanded after creation. */
  allowedValues?: Array<string>;
  /** Optional. Default value of the attribute in User data mappings. If no default value is specified, it defaults to an empty value. This field is only applicable to attributes of the category `RESOURCE`. */
  dataMappingDefaultValue?: string;
}

export const AttributeDefinition: Schema.Schema<AttributeDefinition> = Schema.suspend(() => Schema.Struct({
  category: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  consentDefaultValues: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  allowedValues: Schema.optional(Schema.Array(Schema.String)),
  dataMappingDefaultValue: Schema.optional(Schema.String),
})).annotate({ identifier: "AttributeDefinition" }) as any as Schema.Schema<AttributeDefinition>;

export interface AnalyzeEntitiesRequest {
  /** A list of licensed vocabularies to use in the request, in addition to the default unlicensed vocabularies. */
  licensedVocabularies?: Array<"LICENSED_VOCABULARY_UNSPECIFIED" | "ICD10CM" | "SNOMEDCT_US" | (string & {})>;
  /** document_content is a document to be annotated. */
  documentContent?: string;
  /** Optional. Alternative output format to be generated based on the results of analysis. */
  alternativeOutputFormat?: "ALTERNATIVE_OUTPUT_FORMAT_UNSPECIFIED" | "FHIR_BUNDLE" | (string & {});
}

export const AnalyzeEntitiesRequest: Schema.Schema<AnalyzeEntitiesRequest> = Schema.suspend(() => Schema.Struct({
  licensedVocabularies: Schema.optional(Schema.Array(Schema.String)),
  documentContent: Schema.optional(Schema.String),
  alternativeOutputFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "AnalyzeEntitiesRequest" }) as any as Schema.Schema<AnalyzeEntitiesRequest>;

export interface SeriesMetrics {
  /** Total structured storage bytes for all instances in the series. */
  structuredStorageSizeBytes?: string;
  /** The series resource path. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}/dicomWeb/studies/{study_uid}/series/{series_uid}`. */
  series?: string;
  /** Number of instances in the series. */
  instanceCount?: string;
  /** Total blob storage bytes for all instances in the series. */
  blobStorageSizeBytes?: string;
}

export const SeriesMetrics: Schema.Schema<SeriesMetrics> = Schema.suspend(() => Schema.Struct({
  structuredStorageSizeBytes: Schema.optional(Schema.String),
  series: Schema.optional(Schema.String),
  instanceCount: Schema.optional(Schema.String),
  blobStorageSizeBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "SeriesMetrics" }) as any as Schema.Schema<SeriesMetrics>;

export interface GoogleCloudHealthcareV1ConsentGcsDestination {
  /** URI for a Cloud Storage directory where the server writes result files, in the format `gs://{bucket-id}/{path/to/destination/dir}`. If there is no trailing slash, the service appends one when composing the object path. The user is responsible for creating the Cloud Storage bucket and directory referenced in `uri_prefix`. */
  uriPrefix?: string;
}

export const GoogleCloudHealthcareV1ConsentGcsDestination: Schema.Schema<GoogleCloudHealthcareV1ConsentGcsDestination> = Schema.suspend(() => Schema.Struct({
  uriPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudHealthcareV1ConsentGcsDestination" }) as any as Schema.Schema<GoogleCloudHealthcareV1ConsentGcsDestination>;

export interface ArchiveUserDataMappingResponse {
}

export const ArchiveUserDataMappingResponse: Schema.Schema<ArchiveUserDataMappingResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ArchiveUserDataMappingResponse" }) as any as Schema.Schema<ArchiveUserDataMappingResponse>;

export interface Resources {
  /** List of resources IDs. For example, "Patient/1234". */
  resources?: Array<string>;
}

export const Resources: Schema.Schema<Resources> = Schema.suspend(() => Schema.Struct({
  resources: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Resources" }) as any as Schema.Schema<Resources>;

export interface FhirFilter {
  /** List of resources to include in the output. If this list is empty or not specified, all resources are included in the output. */
  resources?: Resources;
}

export const FhirFilter: Schema.Schema<FhirFilter> = Schema.suspend(() => Schema.Struct({
  resources: Schema.optional(Resources),
})).annotate({ identifier: "FhirFilter" }) as any as Schema.Schema<FhirFilter>;

export interface DeidentifyFhirStoreRequest {
  /** Required. The name of the FHIR store to write the redacted data to. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`. * The destination dataset and FHIR store must exist. * The source dataset and destination dataset must both reside in the same location. De-identifying data across multiple locations is not supported. * The caller must have the healthcare.fhirResources.update permission to write to the destination FHIR store. */
  destinationStore?: string;
  /** Deidentify configuration. Only one of `config` and `gcs_config_uri` can be specified. */
  config?: DeidentifyConfig;
  /** A filter specifying the resources to include in the output. If not specified, all resources are included in the output. */
  resourceFilter?: FhirFilter;
  /** If true, skips resources that are created or modified after the de-identify operation is created. */
  skipModifiedResources?: boolean;
  /** Cloud Storage location to read the JSON cloud.healthcare.deidentify.DeidentifyConfig from, overriding the default config. Must be of the form `gs://{bucket_id}/path/to/object`. The Cloud Storage location must grant the Cloud IAM role `roles/storage.objectViewer` to the project's Cloud Healthcare Service Agent service account. Only one of `config` and `gcs_config_uri` can be specified. */
  gcsConfigUri?: string;
}

export const DeidentifyFhirStoreRequest: Schema.Schema<DeidentifyFhirStoreRequest> = Schema.suspend(() => Schema.Struct({
  destinationStore: Schema.optional(Schema.String),
  config: Schema.optional(DeidentifyConfig),
  resourceFilter: Schema.optional(FhirFilter),
  skipModifiedResources: Schema.optional(Schema.Boolean),
  gcsConfigUri: Schema.optional(Schema.String),
})).annotate({ identifier: "DeidentifyFhirStoreRequest" }) as any as Schema.Schema<DeidentifyFhirStoreRequest>;

export interface EntityMentionRelationship {
  /** subject_id is the id of the subject entity mention. */
  subjectId?: string;
  /** object_id is the id of the object entity mention. */
  objectId?: string;
  /** The model's confidence in this annotation. A number between 0 and 1. */
  confidence?: number;
}

export const EntityMentionRelationship: Schema.Schema<EntityMentionRelationship> = Schema.suspend(() => Schema.Struct({
  subjectId: Schema.optional(Schema.String),
  objectId: Schema.optional(Schema.String),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "EntityMentionRelationship" }) as any as Schema.Schema<EntityMentionRelationship>;

export interface Field {
  /** The minimum number of times this field must be present/repeated. */
  minOccurs?: number;
  /** The maximum number of times this field can be repeated. 0 or -1 means unbounded. */
  maxOccurs?: number;
  /** The name of the field. For example, "PID-1" or just "1". */
  name?: string;
  /** The HL7v2 table this field refers to. For example, PID-15 (Patient's Primary Language) usually refers to table "0296". */
  table?: string;
  /** The type of this field. A Type with this name must be defined in an Hl7TypesConfig. */
  type?: string;
}

export const Field: Schema.Schema<Field> = Schema.suspend(() => Schema.Struct({
  minOccurs: Schema.optional(Schema.Number),
  maxOccurs: Schema.optional(Schema.Number),
  name: Schema.optional(Schema.String),
  table: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "Field" }) as any as Schema.Schema<Field>;

export interface Type {
  /** The (sub) fields this type has (if not primitive). */
  fields?: Array<Field>;
  /** If this is a primitive type then this field is the type of the primitive For example, STRING. Leave unspecified for composite types. */
  primitive?: "PRIMITIVE_UNSPECIFIED" | "STRING" | "VARIES" | "UNESCAPED_STRING" | (string & {});
  /** The name of this type. This would be the segment or datatype name. For example, "PID" or "XPN". */
  name?: string;
}

export const Type: Schema.Schema<Type> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Array(Field)),
  primitive: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Type" }) as any as Schema.Schema<Type>;

export interface Hl7TypesConfig {
  /** The HL7v2 type definitions. */
  type?: Array<Type>;
  /** The version selectors that this config applies to. A message must match ALL version sources to apply. */
  version?: Array<VersionSource>;
}

export const Hl7TypesConfig: Schema.Schema<Hl7TypesConfig> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.Array(Type)),
  version: Schema.optional(Schema.Array(VersionSource)),
})).annotate({ identifier: "Hl7TypesConfig" }) as any as Schema.Schema<Hl7TypesConfig>;

export interface Hl7SchemaConfig {
  /** Each VersionSource is tested and only if they all match is the schema used for the message. */
  version?: Array<VersionSource>;
  /** Map from each HL7v2 message type and trigger event pair, such as ADT_A04, to its schema configuration root group. */
  messageSchemaConfigs?: Record<string, SchemaGroup>;
}

export const Hl7SchemaConfig: Schema.Schema<Hl7SchemaConfig> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.Array(VersionSource)),
  messageSchemaConfigs: Schema.optional(Schema.Record(Schema.String, SchemaGroup)),
})).annotate({ identifier: "Hl7SchemaConfig" }) as any as Schema.Schema<Hl7SchemaConfig>;

export interface SchemaPackage {
  /** Optional. Schema type definitions that are layered based on their VersionSources that match the incoming message. Type definitions present in higher indices override those in lower indices with the same type name if their VersionSources all match an incoming message. */
  types?: Array<Hl7TypesConfig>;
  /** Optional. Schema configs that are layered based on their VersionSources that match the incoming message. Schema configs present in higher indices override those in lower indices with the same message type and trigger event if their VersionSources all match an incoming message. */
  schemas?: Array<Hl7SchemaConfig>;
  /** Optional. Flag to ignore all min_occurs restrictions in the schema. This means that incoming messages can omit any group, segment, field, component, or subcomponent. */
  ignoreMinOccurs?: boolean;
  /** Optional. Determines how messages that fail to parse are handled. */
  schematizedParsingType?: "SCHEMATIZED_PARSING_TYPE_UNSPECIFIED" | "SOFT_FAIL" | "HARD_FAIL" | (string & {});
  /** Optional. Determines how unexpected segments (segments not matched to the schema) are handled. */
  unexpectedSegmentHandling?: "UNEXPECTED_SEGMENT_HANDLING_MODE_UNSPECIFIED" | "FAIL" | "SKIP" | "PARSE" | (string & {});
}

export const SchemaPackage: Schema.Schema<SchemaPackage> = Schema.suspend(() => Schema.Struct({
  types: Schema.optional(Schema.Array(Hl7TypesConfig)),
  schemas: Schema.optional(Schema.Array(Hl7SchemaConfig)),
  ignoreMinOccurs: Schema.optional(Schema.Boolean),
  schematizedParsingType: Schema.optional(Schema.String),
  unexpectedSegmentHandling: Schema.optional(Schema.String),
})).annotate({ identifier: "SchemaPackage" }) as any as Schema.Schema<SchemaPackage>;

export interface ParserConfig {
  /** Immutable. Determines the version of both the default parser to be used when `schema` is not given, as well as the schematized parser used when `schema` is specified. This field is immutable after HL7v2 store creation. */
  version?: "PARSER_VERSION_UNSPECIFIED" | "V1" | "V2" | "V3" | (string & {});
  /** Optional. Byte(s) to use as the segment terminator. If this is unset, '\r' is used as segment terminator, matching the HL7 version 2 specification. */
  segmentTerminator?: string;
  /** Optional. Determines whether messages with no header are allowed. */
  allowNullHeader?: boolean;
  /** Optional. Schemas used to parse messages in this store, if schematized parsing is desired. */
  schema?: SchemaPackage;
}

export const ParserConfig: Schema.Schema<ParserConfig> = Schema.suspend(() => Schema.Struct({
  version: Schema.optional(Schema.String),
  segmentTerminator: Schema.optional(Schema.String),
  allowNullHeader: Schema.optional(Schema.Boolean),
  schema: Schema.optional(SchemaPackage),
})).annotate({ identifier: "ParserConfig" }) as any as Schema.Schema<ParserConfig>;

export interface Hl7V2StoreMetric {
  /** The total count of HL7v2 messages in the store for the given message type. */
  count?: string;
  /** The Hl7v2 message type this metric applies to, such as `ADT` or `ORU`. */
  messageType?: string;
  /** The total amount of structured storage used by HL7v2 messages of this message type in the store. */
  structuredStorageSizeBytes?: string;
}

export const Hl7V2StoreMetric: Schema.Schema<Hl7V2StoreMetric> = Schema.suspend(() => Schema.Struct({
  count: Schema.optional(Schema.String),
  messageType: Schema.optional(Schema.String),
  structuredStorageSizeBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "Hl7V2StoreMetric" }) as any as Schema.Schema<Hl7V2StoreMetric>;

export interface Hl7V2StoreMetrics {
  /** List of HL7v2 store metrics by message type. */
  metrics?: Array<Hl7V2StoreMetric>;
  /** The resource name of the HL7v2 store to get metrics for, in the format `projects/{project_id}/datasets/{dataset_id}/hl7V2Stores/{hl7v2_store_id}`. */
  name?: string;
}

export const Hl7V2StoreMetrics: Schema.Schema<Hl7V2StoreMetrics> = Schema.suspend(() => Schema.Struct({
  metrics: Schema.optional(Schema.Array(Hl7V2StoreMetric)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Hl7V2StoreMetrics" }) as any as Schema.Schema<Hl7V2StoreMetrics>;

export interface UserDataMapping {
  /** Required. A unique identifier for the mapped resource. */
  dataId?: string;
  /** Required. User's UUID provided by the client. */
  userId?: string;
  /** Output only. Indicates whether this mapping is archived. */
  archived?: boolean;
  /** Resource name of the User data mapping, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/userDataMappings/{user_data_mapping_id}`. */
  name?: string;
  /** Output only. Indicates the time when this mapping was archived. */
  archiveTime?: string;
  /** Attributes of the resource. Only explicitly set attributes are displayed here. Attribute definitions with defaults set implicitly apply to these User data mappings. Attributes listed here must be single valued, that is, exactly one value is specified for the field "values" in each Attribute. */
  resourceAttributes?: Array<Attribute>;
}

export const UserDataMapping: Schema.Schema<UserDataMapping> = Schema.suspend(() => Schema.Struct({
  dataId: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  archived: Schema.optional(Schema.Boolean),
  name: Schema.optional(Schema.String),
  archiveTime: Schema.optional(Schema.String),
  resourceAttributes: Schema.optional(Schema.Array(Attribute)),
})).annotate({ identifier: "UserDataMapping" }) as any as Schema.Schema<UserDataMapping>;

export interface ApplyConsentsResponse {
  /** If `validate_only = false` in ApplyConsentsRequest, this counter is the number of Consent resources that were successfully applied. Otherwise, it is the number of Consent resources that are supported. */
  consentApplySuccess?: string;
  /** If `validate_only = false` in ApplyConsentsRequest, this counter is the number of Consent resources that were failed to apply. Otherwise, it is the number of Consent resources that are not supported or invalid. */
  consentApplyFailure?: string;
  /** The number of resources (including the Consent resources) that ApplyConsents failed to re-index. */
  failedResources?: string;
  /** The number of resources (including the Consent resources) that may have consensual access change. */
  affectedResources?: string;
}

export const ApplyConsentsResponse: Schema.Schema<ApplyConsentsResponse> = Schema.suspend(() => Schema.Struct({
  consentApplySuccess: Schema.optional(Schema.String),
  consentApplyFailure: Schema.optional(Schema.String),
  failedResources: Schema.optional(Schema.String),
  affectedResources: Schema.optional(Schema.String),
})).annotate({ identifier: "ApplyConsentsResponse" }) as any as Schema.Schema<ApplyConsentsResponse>;

export interface ListUserDataMappingsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** The returned User data mappings. The maximum number of User data mappings returned is determined by the value of page_size in the ListUserDataMappingsRequest. */
  userDataMappings?: Array<UserDataMapping>;
}

export const ListUserDataMappingsResponse: Schema.Schema<ListUserDataMappingsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  userDataMappings: Schema.optional(Schema.Array(UserDataMapping)),
})).annotate({ identifier: "ListUserDataMappingsResponse" }) as any as Schema.Schema<ListUserDataMappingsResponse>;

export interface ExportDicomDataResponse {
}

export const ExportDicomDataResponse: Schema.Schema<ExportDicomDataResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ExportDicomDataResponse" }) as any as Schema.Schema<ExportDicomDataResponse>;

export interface FhirStoreMetric {
  /** The FHIR resource type this metric applies to. */
  resourceType?: string;
  /** The total count of FHIR resources in the store of this resource type. */
  count?: string;
  /** The total amount of versioned storage used by versioned FHIR resources of this resource type in the store. */
  versionedStorageSizeBytes?: string;
  /** The total amount of structured storage used by FHIR resources of this resource type in the store. */
  structuredStorageSizeBytes?: string;
}

export const FhirStoreMetric: Schema.Schema<FhirStoreMetric> = Schema.suspend(() => Schema.Struct({
  resourceType: Schema.optional(Schema.String),
  count: Schema.optional(Schema.String),
  versionedStorageSizeBytes: Schema.optional(Schema.String),
  structuredStorageSizeBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "FhirStoreMetric" }) as any as Schema.Schema<FhirStoreMetric>;

export interface FhirStoreMetrics {
  /** List of FhirStoreMetric by resource type. */
  metrics?: Array<FhirStoreMetric>;
  /** The resource name of the FHIR store to get metrics for, in the format `projects/{project_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`. */
  name?: string;
}

export const FhirStoreMetrics: Schema.Schema<FhirStoreMetrics> = Schema.suspend(() => Schema.Struct({
  metrics: Schema.optional(Schema.Array(FhirStoreMetric)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "FhirStoreMetrics" }) as any as Schema.Schema<FhirStoreMetrics>;

export interface GoogleCloudHealthcareV1DicomGcsSource {
  /** Points to a Cloud Storage URI containing file(s) with content only. The URI must be in the following format: `gs://{bucket_id}/{object_id}`. The URI can include wildcards in `object_id` and thus identify multiple files. Supported wildcards: * '*' to match 0 or more non-separator characters * '**' to match 0 or more characters (including separators). Must be used at the end of a path and with no other wildcards in the path. Can also be used with a file extension (such as .dcm), which imports all files with the extension in the specified directory and its sub-directories. For example, `gs://my-bucket/my-directory/**.dcm` imports all files with .dcm extensions in `my-directory/` and its sub-directories. * '?' to match 1 character. All other URI formats are invalid. Files matching the wildcard are expected to contain content only, no metadata. */
  uri?: string;
}

export const GoogleCloudHealthcareV1DicomGcsSource: Schema.Schema<GoogleCloudHealthcareV1DicomGcsSource> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudHealthcareV1DicomGcsSource" }) as any as Schema.Schema<GoogleCloudHealthcareV1DicomGcsSource>;

export interface ImportResourcesResponse {
}

export const ImportResourcesResponse: Schema.Schema<ImportResourcesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ImportResourcesResponse" }) as any as Schema.Schema<ImportResourcesResponse>;

export interface TimeRange {
  /** Optional. The latest consent change time, in format YYYY-MM-DDThh:mm:ss.sss+zz:zz If not specified, the system uses the time when ApplyConsents was called. */
  end?: string;
  /** Optional. The earliest consent change time, in format YYYY-MM-DDThh:mm:ss.sss+zz:zz If not specified, the system uses the FHIR store creation time. */
  start?: string;
}

export const TimeRange: Schema.Schema<TimeRange> = Schema.suspend(() => Schema.Struct({
  end: Schema.optional(Schema.String),
  start: Schema.optional(Schema.String),
})).annotate({ identifier: "TimeRange" }) as any as Schema.Schema<TimeRange>;

export interface ApplyConsentsRequest {
  /** Optional. Scope down to patients whose most recent consent changes are in the time range. Can only be used with a versioning store (i.e. when disable_resource_versioning is set to false). */
  timeRange?: TimeRange;
  /** Optional. If true, the method only validates Consent resources to make sure they are supported. When the operation completes, ApplyConsentsResponse is returned where `consent_apply_success` and `consent_apply_failure` indicate supported and unsupported (or invalid) Consent resources, respectively. Otherwise, the method propagates the aggregate consensual information to the patient's resources. Upon success, `affected_resources` in the ApplyConsentsResponse indicates the number of resources that may have consensual access changed. */
  validateOnly?: boolean;
  /** Optional. Scope down to a list of patients. */
  patientScope?: PatientScope;
}

export const ApplyConsentsRequest: Schema.Schema<ApplyConsentsRequest> = Schema.suspend(() => Schema.Struct({
  timeRange: Schema.optional(TimeRange),
  validateOnly: Schema.optional(Schema.Boolean),
  patientScope: Schema.optional(PatientScope),
})).annotate({ identifier: "ApplyConsentsRequest" }) as any as Schema.Schema<ApplyConsentsRequest>;

export interface ImportDicomDataResponse {
}

export const ImportDicomDataResponse: Schema.Schema<ImportDicomDataResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ImportDicomDataResponse" }) as any as Schema.Schema<ImportDicomDataResponse>;

export interface RollbackFhirResourceFilteringFields {
  /** Optional. A filter expression that matches data in the `Resource.meta` element. Supports all filters in [AIP-160](https://google.aip.dev/160) except the "has" (`:`) operator. Supports the following custom functions: * `tag("") = ""` for tag filtering. * `extension_value_ts("") = ` for filtering extensions with a timestamp, where `` is a Unix timestamp. Supports the `>`, `<`, `<=`, `>=`, and `!=` comparison operators. */
  metadataFilter?: string;
  /** Optional. A list of operation IDs to roll back. */
  operationIds?: Array<string>;
}

export const RollbackFhirResourceFilteringFields: Schema.Schema<RollbackFhirResourceFilteringFields> = Schema.suspend(() => Schema.Struct({
  metadataFilter: Schema.optional(Schema.String),
  operationIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RollbackFhirResourceFilteringFields" }) as any as Schema.Schema<RollbackFhirResourceFilteringFields>;

export interface GoogleCloudHealthcareV1FhirGcsSource {
  /** Points to a Cloud Storage URI containing file(s) to import. The URI must be in the following format: `gs://{bucket_id}/{object_id}`. The URI can include wildcards in `object_id` and thus identify multiple files. Supported wildcards: * `*` to match 0 or more non-separator characters * `**` to match 0 or more characters (including separators). Must be used at the end of a path and with no other wildcards in the path. Can also be used with a file extension (such as .ndjson), which imports all files with the extension in the specified directory and its sub-directories. For example, `gs://my-bucket/my-directory/**.ndjson` imports all files with `.ndjson` extensions in `my-directory/` and its sub-directories. * `?` to match 1 character Files matching the wildcard are expected to contain content only, no metadata. */
  uri?: string;
}

export const GoogleCloudHealthcareV1FhirGcsSource: Schema.Schema<GoogleCloudHealthcareV1FhirGcsSource> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudHealthcareV1FhirGcsSource" }) as any as Schema.Schema<GoogleCloudHealthcareV1FhirGcsSource>;

export interface ImportResourcesRequest {
  /** The content structure in the source location. If not specified, the server treats the input source files as BUNDLE. */
  contentStructure?: "CONTENT_STRUCTURE_UNSPECIFIED" | "BUNDLE" | "RESOURCE" | "BUNDLE_PRETTY" | "RESOURCE_PRETTY" | (string & {});
  /** Cloud Storage source data location and import configuration. The Healthcare Service Agent account requires the `roles/storage.objectAdmin` role on the Cloud Storage location. Each Cloud Storage object should be a text file that contains the format specified in ContentStructure. */
  gcsSource?: GoogleCloudHealthcareV1FhirGcsSource;
}

export const ImportResourcesRequest: Schema.Schema<ImportResourcesRequest> = Schema.suspend(() => Schema.Struct({
  contentStructure: Schema.optional(Schema.String),
  gcsSource: Schema.optional(GoogleCloudHealthcareV1FhirGcsSource),
})).annotate({ identifier: "ImportResourcesRequest" }) as any as Schema.Schema<ImportResourcesRequest>;

export interface RollbackFhirResourcesResponse {
  /** The name of the FHIR store to rollback, in the format of "projects/{project_id}/locations/{location_id}/datasets/{dataset_id} /fhirStores/{fhir_store_id}". */
  fhirStore?: string;
}

export const RollbackFhirResourcesResponse: Schema.Schema<RollbackFhirResourcesResponse> = Schema.suspend(() => Schema.Struct({
  fhirStore: Schema.optional(Schema.String),
})).annotate({ identifier: "RollbackFhirResourcesResponse" }) as any as Schema.Schema<RollbackFhirResourcesResponse>;

export interface Location {
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` */
  name?: string;
  /** The canonical id for this location. For example: `"us-east1"`. */
  locationId?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  locationId: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
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

export interface ConsentList {
  /** The resource names of the Consents to evaluate against, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`. */
  consents?: Array<string>;
}

export const ConsentList: Schema.Schema<ConsentList> = Schema.suspend(() => Schema.Struct({
  consents: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ConsentList" }) as any as Schema.Schema<ConsentList>;

export interface GoogleCloudHealthcareV1DicomGcsDestination {
  /** The Cloud Storage destination to export to. URI for a Cloud Storage directory where the server writes the result files, in the format `gs://{bucket-id}/{path/to/destination/dir}`). If there is no trailing slash, the service appends one when composing the object path. The user is responsible for creating the Cloud Storage bucket referenced in `uri_prefix`. */
  uriPrefix?: string;
  /** MIME types supported by DICOM spec. Each file is written in the following format: `.../{study_id}/{series_id}/{instance_id}[/{frame_number}].{extension}` The frame_number component exists only for multi-frame instances. Supported MIME types are consistent with supported formats in DICOMweb: https://cloud.google.com/healthcare/docs/dicom#retrieve_transaction. Specifically, the following are supported: - application/dicom; transfer-syntax=1.2.840.10008.1.2 (DICOM Implicit VR Little Endian) - application/dicom; transfer-syntax=1.2.840.10008.1.2.1 (DICOM Explicit VR Little Endian) - application/dicom; transfer-syntax=1.2.840.10008.1.2.1.99 (DICOM Deflated Explicit VR Little Endian) - application/dicom; transfer-syntax=1.2.840.10008.1.2.4.50 (DICOM with embedded JPEG Baseline) - application/dicom; transfer-syntax=1.2.840.10008.1.2.4.51 (DICOM with embedded JPEG Extended) - application/dicom; transfer-syntax=1.2.840.10008.1.2.4.57 (DICOM with embedded JPEG Lossless) - application/dicom; transfer-syntax=1.2.840.10008.1.2.4.70 (DICOM with embedded JPEG Lossless First-Order Prediction) - application/dicom; transfer-syntax=1.2.840.10008.1.2.4.80 (DICOM with embedded JPEG-LS Lossless) - application/dicom; transfer-syntax=1.2.840.10008.1.2.4.81 (DICOM with embedded JPEG-LS Lossy (Near-Lossless)) - application/dicom; transfer-syntax=1.2.840.10008.1.2.4.90 (DICOM with embedded JPEG 2000 Lossless Only) - application/dicom; transfer-syntax=1.2.840.10008.1.2.4.91 (DICOM with embedded JPEG 2000) - application/dicom; transfer-syntax=1.2.840.10008.1.2.4.110 (DICOM with embedded JPEG XL Lossless) - application/dicom; transfer-syntax=1.2.840.10008.1.2.4.111 (DICOM with embedded JPEG XL JPEG Recompression) - application/dicom; transfer-syntax=1.2.840.10008.1.2.4.112 (DICOM with embedded JPEG XL) - application/dicom; transfer-syntax=1.2.840.10008.1.2.4.201 (DICOM with embedded High-Throughput JPEG 2000 Lossless) - application/dicom; transfer-syntax=1.2.840.10008.1.2.4.202 (DICOM with embedded High-Throughput JPEG 2000 with RPCL Options Lossless) - application/dicom; transfer-syntax=1.2.840.10008.1.2.4.203 (DICOM with embedded High-Throughput JPEG 2000) - application/dicom; transfer-syntax=1.2.840.10008.1.2.5 (DICOM with embedded RLE Lossless) - application/dicom; transfer-syntax=1.2.840.10008.1.2.8.1 (DICOM with embedded Deflated Image Frame Compression) - application/dicom; transfer-syntax=* (DICOM with no transcoding) - application/octet-stream; transfer-syntax=1.2.840.10008.1.2.1 (raw uncompressed PixelData) - application/octet-stream; transfer-syntax=* (raw PixelData in whatever format it was uploaded in) - image/jpeg; transfer-syntax=1.2.840.10008.1.2.4.50 (Consumer JPEG) - image/png The following extensions are used for output files: - application/dicom -> .dcm - image/jpeg -> .jpg - image/png -> .png - application/octet-stream -> no extension If unspecified, the instances are exported in the original DICOM format they were uploaded in. */
  mimeType?: string;
}

export const GoogleCloudHealthcareV1DicomGcsDestination: Schema.Schema<GoogleCloudHealthcareV1DicomGcsDestination> = Schema.suspend(() => Schema.Struct({
  uriPrefix: Schema.optional(Schema.String),
  mimeType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudHealthcareV1DicomGcsDestination" }) as any as Schema.Schema<GoogleCloudHealthcareV1DicomGcsDestination>;

export interface ExportDicomDataRequest {
  /** The Cloud Storage output destination. The Cloud Healthcare Service Agent requires the `roles/storage.objectAdmin` Cloud IAM roles on the Cloud Storage location. */
  gcsDestination?: GoogleCloudHealthcareV1DicomGcsDestination;
  /** The BigQuery output destination. You can only export to a BigQuery dataset that's in the same project as the DICOM store you're exporting from. The Cloud Healthcare Service Agent requires two IAM roles on the BigQuery location: `roles/bigquery.dataEditor` and `roles/bigquery.jobUser`. */
  bigqueryDestination?: GoogleCloudHealthcareV1DicomBigQueryDestination;
}

export const ExportDicomDataRequest: Schema.Schema<ExportDicomDataRequest> = Schema.suspend(() => Schema.Struct({
  gcsDestination: Schema.optional(GoogleCloudHealthcareV1DicomGcsDestination),
  bigqueryDestination: Schema.optional(GoogleCloudHealthcareV1DicomBigQueryDestination),
})).annotate({ identifier: "ExportDicomDataRequest" }) as any as Schema.Schema<ExportDicomDataRequest>;

export interface ListMessagesResponse {
  /** The returned Messages. Won't be more Messages than the value of page_size in the request. See view for populated fields. */
  hl7V2Messages?: Array<Message>;
  /** Token to retrieve the next page of results or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListMessagesResponse: Schema.Schema<ListMessagesResponse> = Schema.suspend(() => Schema.Struct({
  hl7V2Messages: Schema.optional(Schema.Array(Message)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListMessagesResponse" }) as any as Schema.Schema<ListMessagesResponse>;

export interface DicomStoreMetrics {
  /** Number of instances in the store. */
  instanceCount?: string;
  /** Total blob storage bytes for all instances in the store. */
  blobStorageSizeBytes?: string;
  /** Number of studies in the store. */
  studyCount?: string;
  /** Number of series in the store. */
  seriesCount?: string;
  /** Resource name of the DICOM store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  name?: string;
  /** Total structured storage bytes for all instances in the store. */
  structuredStorageSizeBytes?: string;
}

export const DicomStoreMetrics: Schema.Schema<DicomStoreMetrics> = Schema.suspend(() => Schema.Struct({
  instanceCount: Schema.optional(Schema.String),
  blobStorageSizeBytes: Schema.optional(Schema.String),
  studyCount: Schema.optional(Schema.String),
  seriesCount: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  structuredStorageSizeBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "DicomStoreMetrics" }) as any as Schema.Schema<DicomStoreMetrics>;

export interface RevokeConsentRequest {
  /** Optional. The resource name of the Consent artifact that contains proof of the user's revocation of the Consent, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consentArtifacts/{consent_artifact_id}`. */
  consentArtifact?: string;
}

export const RevokeConsentRequest: Schema.Schema<RevokeConsentRequest> = Schema.suspend(() => Schema.Struct({
  consentArtifact: Schema.optional(Schema.String),
})).annotate({ identifier: "RevokeConsentRequest" }) as any as Schema.Schema<RevokeConsentRequest>;

export interface OperationMetadata {
  /** The time at which the operation was created by the API. */
  createTime?: string;
  /** The time at which execution was completed. */
  endTime?: string;
  /** Specifies if cancellation was requested for the operation. */
  cancelRequested?: boolean;
  /** A link to audit and error logs in the log viewer. Error logs are generated only by some operations, listed at [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging). */
  logsUrl?: string;
  counter?: ProgressCounter;
  /** The name of the API method that initiated the operation. */
  apiMethodName?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  cancelRequested: Schema.optional(Schema.Boolean),
  logsUrl: Schema.optional(Schema.String),
  counter: Schema.optional(ProgressCounter),
  apiMethodName: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface ExportMessagesResponse {
}

export const ExportMessagesResponse: Schema.Schema<ExportMessagesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ExportMessagesResponse" }) as any as Schema.Schema<ExportMessagesResponse>;

export interface EntityMention {
  /** linked_entities are candidate ontological concepts that this entity mention may refer to. They are sorted by decreasing confidence. */
  linkedEntities?: Array<LinkedEntity>;
  /** mention_id uniquely identifies each entity mention in a single response. */
  mentionId?: string;
  /** text is the location of the entity mention in the document. */
  text?: TextSpan;
  /** How this entity mention relates to the subject temporally. Its value is one of: CURRENT, CLINICAL_HISTORY, FAMILY_HISTORY, UPCOMING, ALLERGY */
  temporalAssessment?: Feature;
  /** The certainty assessment of the entity mention. Its value is one of: LIKELY, SOMEWHAT_LIKELY, UNCERTAIN, SOMEWHAT_UNLIKELY, UNLIKELY, CONDITIONAL */
  certaintyAssessment?: Feature;
  /** The semantic type of the entity: UNKNOWN_ENTITY_TYPE, ALONE, ANATOMICAL_STRUCTURE, ASSISTED_LIVING, BF_RESULT, BM_RESULT, BM_UNIT, BM_VALUE, BODY_FUNCTION, BODY_MEASUREMENT, COMPLIANT, DOESNOT_FOLLOWUP, FAMILY, FOLLOWSUP, LABORATORY_DATA, LAB_RESULT, LAB_UNIT, LAB_VALUE, MEDICAL_DEVICE, MEDICINE, MED_DOSE, MED_DURATION, MED_FORM, MED_FREQUENCY, MED_ROUTE, MED_STATUS, MED_STRENGTH, MED_TOTALDOSE, MED_UNIT, NON_COMPLIANT, OTHER_LIVINGSTATUS, PROBLEM, PROCEDURE, PROCEDURE_RESULT, PROC_METHOD, REASON_FOR_NONCOMPLIANCE, SEVERITY, SUBSTANCE_ABUSE, UNCLEAR_FOLLOWUP. */
  type?: string;
  /** The subject this entity mention relates to. Its value is one of: PATIENT, FAMILY_MEMBER, OTHER */
  subject?: Feature;
  /** The model's confidence in this entity mention annotation. A number between 0 and 1. */
  confidence?: number;
}

export const EntityMention: Schema.Schema<EntityMention> = Schema.suspend(() => Schema.Struct({
  linkedEntities: Schema.optional(Schema.Array(LinkedEntity)),
  mentionId: Schema.optional(Schema.String),
  text: Schema.optional(TextSpan),
  temporalAssessment: Schema.optional(Feature),
  certaintyAssessment: Schema.optional(Feature),
  type: Schema.optional(Schema.String),
  subject: Schema.optional(Feature),
  confidence: Schema.optional(Schema.Number),
})).annotate({ identifier: "EntityMention" }) as any as Schema.Schema<EntityMention>;

export interface AnalyzeEntitiesResponse {
  /** The FHIR bundle ([`R4`](http://hl7.org/fhir/R4/bundle.html)) that includes all the entities, the entity mentions, and the relationships in JSON format. */
  fhirBundle?: string;
  /** The union of all the candidate entities that the entity_mentions in this response could link to. These are UMLS concepts or normalized mention content. */
  entities?: Array<Entity>;
  /** The `entity_mentions` field contains all the annotated medical entities that were mentioned in the provided document. */
  entityMentions?: Array<EntityMention>;
  /** relationships contains all the binary relationships that were identified between entity mentions within the provided document. */
  relationships?: Array<EntityMentionRelationship>;
}

export const AnalyzeEntitiesResponse: Schema.Schema<AnalyzeEntitiesResponse> = Schema.suspend(() => Schema.Struct({
  fhirBundle: Schema.optional(Schema.String),
  entities: Schema.optional(Schema.Array(Entity)),
  entityMentions: Schema.optional(Schema.Array(EntityMention)),
  relationships: Schema.optional(Schema.Array(EntityMentionRelationship)),
})).annotate({ identifier: "AnalyzeEntitiesResponse" }) as any as Schema.Schema<AnalyzeEntitiesResponse>;

export interface Hl7V2NotificationConfig {
  /** Optional. Restricts notifications sent for messages matching a filter. If this is empty, all messages are matched. The following syntax is available: * A string field value can be written as text inside quotation marks, for example `"query text"`. The only valid relational operation for text fields is equality (`=`), where text is searched within the field, rather than having the field be equal to the text. For example, `"Comment = great"` returns messages with `great` in the comment field. * A number field value can be written as an integer, a decimal, or an exponential. The valid relational operators for number fields are the equality operator (`=`), along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * A date field value must be written in `yyyy-mm-dd` form. Fields with date and time use the RFC3339 time format. Leading zeros are required for one-digit months and days. The valid relational operators for date fields are the equality operator (`=`) , along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * Multiple field query expressions can be combined in one query by adding `AND` or `OR` operators between the expressions. If a boolean operator appears within a quoted string, it is not treated as special, it's just another part of the character string to be matched. You can prepend the `NOT` operator to an expression to negate it. The following fields and functions are available for filtering: * `message_type`, from the MSH-9.1 field. For example, `NOT message_type = "ADT"`. * `send_date` or `sendDate`, the YYYY-MM-DD date the message was sent in the dataset's time_zone, from the MSH-7 segment. For example, `send_date < "2017-01-02"`. * `send_time`, the timestamp when the message was sent, using the RFC3339 time format for comparisons, from the MSH-7 segment. For example, `send_time < "2017-01-02T00:00:00-05:00"`. * `create_time`, the timestamp when the message was created in the HL7v2 store. Use the RFC3339 time format for comparisons. For example, `create_time < "2017-01-02T00:00:00-05:00"`. * `send_facility`, the care center that the message came from, from the MSH-4 segment. For example, `send_facility = "ABC"`. * `PatientId(value, type)`, which matches if the message lists a patient having an ID of the given value and type in the PID-2, PID-3, or PID-4 segments. For example, `PatientId("123456", "MRN")`. * `labels.x`, a string value of the label with key `x` as set using the Message.labels map. For example, `labels."priority"="high"`. The operator `:*` can be used to assert the existence of a label. For example, `labels."priority":*`. */
  filter?: string;
  /** The [Pub/Sub](https://cloud.google.com/pubsub/docs/) topic that notifications of changes are published on. Supplied by the client. The notification is a `PubsubMessage` with the following fields: * `PubsubMessage.Data` contains the resource name. * `PubsubMessage.MessageId` is the ID of this notification. It's guaranteed to be unique within the topic. * `PubsubMessage.PublishTime` is the time when the message was published. Note that notifications are only sent if the topic is non-empty. [Topic names](https://cloud.google.com/pubsub/docs/overview#names) must be scoped to a project. The Cloud Healthcare API service account, service-PROJECT_NUMBER@gcp-sa-healthcare.iam.gserviceaccount.com, must have publisher permissions on the given Pub/Sub topic. Not having adequate permissions causes the calls that send notifications to fail. If a notification cannot be published to Pub/Sub, errors are logged to Cloud Logging. For more information, see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). */
  pubsubTopic?: string;
}

export const Hl7V2NotificationConfig: Schema.Schema<Hl7V2NotificationConfig> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  pubsubTopic: Schema.optional(Schema.String),
})).annotate({ identifier: "Hl7V2NotificationConfig" }) as any as Schema.Schema<Hl7V2NotificationConfig>;

export interface Hl7V2Store {
  /** Optional. The configuration for the parser. It determines how the server parses the messages. */
  parserConfig?: ParserConfig;
  /** Optional. Determines whether to reject duplicate messages. A duplicate message is a message with the same raw bytes as a message that has already been ingested/created in this HL7v2 store. The default value is false, meaning that the store accepts the duplicate messages and it also returns the same ACK message in the IngestMessageResponse as has been returned previously. Note that only one resource is created in the store. When this field is set to true, CreateMessage/IngestMessage requests with a duplicate message will be rejected by the store, and IngestMessageErrorDetail returns a NACK message upon rejection. */
  rejectDuplicateMessage?: boolean;
  /** Optional. A list of notification configs. Each configuration uses a filter to determine whether to publish a message (both Ingest & Create) on the corresponding notification destination. Only the message name is sent as part of the notification. Supplied by the client. */
  notificationConfigs?: Array<Hl7V2NotificationConfig>;
  /** User-supplied key-value pairs used to organize HL7v2 stores. Label keys must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: \p{Ll}\p{Lo}{0,62} Label values are optional, must be between 1 and 63 characters long, have a UTF-8 encoding of maximum 128 bytes, and must conform to the following PCRE regular expression: [\p{Ll}\p{Lo}\p{N}_-]{0,63} No more than 64 labels can be associated with a given store. */
  labels?: Record<string, string>;
  /** Identifier. Resource name of the HL7v2 store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7V2Stores/{hl7v2_store_id}`. */
  name?: string;
}

export const Hl7V2Store: Schema.Schema<Hl7V2Store> = Schema.suspend(() => Schema.Struct({
  parserConfig: Schema.optional(ParserConfig),
  rejectDuplicateMessage: Schema.optional(Schema.Boolean),
  notificationConfigs: Schema.optional(Schema.Array(Hl7V2NotificationConfig)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Hl7V2Store" }) as any as Schema.Schema<Hl7V2Store>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface RollbackHL7MessagesFilteringFields {
  /** Optional. A list of operation IDs to roll back. */
  operationIds?: Array<string>;
}

export const RollbackHL7MessagesFilteringFields: Schema.Schema<RollbackHL7MessagesFilteringFields> = Schema.suspend(() => Schema.Struct({
  operationIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "RollbackHL7MessagesFilteringFields" }) as any as Schema.Schema<RollbackHL7MessagesFilteringFields>;

export interface RollbackHl7V2MessagesRequest {
  /** Optional. CREATE/UPDATE/DELETE/ALL for reverting all txns of a certain type. */
  changeType?: "CHANGE_TYPE_UNSPECIFIED" | "ALL" | "CREATE" | "UPDATE" | "DELETE" | (string & {});
  /** Optional. Cloud storage object containing list of {resourceId} lines, identifying resources to be reverted */
  inputGcsObject?: string;
  /** Optional. Specifies whether to exclude earlier rollbacks. */
  excludeRollbacks?: boolean;
  /** Required. Bucket to deposit result */
  resultGcsBucket?: string;
  /** Required. Times point to rollback to. */
  rollbackTime?: string;
  /** Optional. When enabled, changes will be reverted without explicit confirmation. */
  force?: boolean;
  /** Optional. Parameters for filtering. */
  filteringFields?: RollbackHL7MessagesFilteringFields;
}

export const RollbackHl7V2MessagesRequest: Schema.Schema<RollbackHl7V2MessagesRequest> = Schema.suspend(() => Schema.Struct({
  changeType: Schema.optional(Schema.String),
  inputGcsObject: Schema.optional(Schema.String),
  excludeRollbacks: Schema.optional(Schema.Boolean),
  resultGcsBucket: Schema.optional(Schema.String),
  rollbackTime: Schema.optional(Schema.String),
  force: Schema.optional(Schema.Boolean),
  filteringFields: Schema.optional(RollbackHL7MessagesFilteringFields),
})).annotate({ identifier: "RollbackHl7V2MessagesRequest" }) as any as Schema.Schema<RollbackHl7V2MessagesRequest>;

export interface RollbackHl7V2MessagesResponse {
  /** The name of the HL7v2 store to rollback, in the format of "projects/{project_id}/locations/{location_id}/datasets/{dataset_id} /hl7v2Stores/{hl7v2_store_id}". */
  hl7v2Store?: string;
}

export const RollbackHl7V2MessagesResponse: Schema.Schema<RollbackHl7V2MessagesResponse> = Schema.suspend(() => Schema.Struct({
  hl7v2Store: Schema.optional(Schema.String),
})).annotate({ identifier: "RollbackHl7V2MessagesResponse" }) as any as Schema.Schema<RollbackHl7V2MessagesResponse>;

export interface AdminConsents {
  /** Optional. The versioned names of the admin Consent resource(s), in the format `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{resource_id}/_history/{version_id}`. For FHIR stores with `disable_resource_versioning=true`, the format is `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{resource_id}`. */
  names?: Array<string>;
}

export const AdminConsents: Schema.Schema<AdminConsents> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "AdminConsents" }) as any as Schema.Schema<AdminConsents>;

export interface ApplyAdminConsentsRequest {
  /** A new list of admin Consent resources to be applied. Any existing enforced Consents, which are specified in `consent_config.enforced_admin_consents` of the FhirStore, that are not part of this list will be disabled. An empty list is equivalent to clearing or disabling all Consents enforced on the FHIR store. When a FHIR store has `disable_resource_versioning=true` and this list contains a Consent resource that exists in `consent_config.enforced_admin_consents`, the method enforces any updates to the existing resource since the last enforcement. If the existing resource hasn't been updated since the last enforcement, the resource is unaffected. After the method finishes, the resulting consent enforcement model is determined by the contents of the Consent resource(s) when the method was called: * When `disable_resource_versioning=true`, the result is identical to the current resource(s) in the FHIR store. * When `disable_resource_versioning=false`, the result is based on the historical version(s) of the Consent resource(s) at the point in time when the method was called. At most 200 Consents can be specified. */
  newConsentsList?: AdminConsents;
  /** Optional. If true, the method only validates Consent resources to make sure they are supported. Otherwise, the method applies the aggregate consent information to update the enforcement model and reindex the FHIR resources. If all Consent resources can be applied successfully, the ApplyAdminConsentsResponse is returned containing the following fields: * `consent_apply_success` to indicate the number of Consent resources applied. * `affected_resources` to indicate the number of resources that might have had their consent access changed. If, however, one or more Consent resources are unsupported or cannot be applied, the method fails and ApplyAdminConsentsErrorDetail is is returned with details about the unsupported Consent resources. */
  validateOnly?: boolean;
}

export const ApplyAdminConsentsRequest: Schema.Schema<ApplyAdminConsentsRequest> = Schema.suspend(() => Schema.Struct({
  newConsentsList: Schema.optional(AdminConsents),
  validateOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ApplyAdminConsentsRequest" }) as any as Schema.Schema<ApplyAdminConsentsRequest>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface DeidentifyDatasetRequest {
  /** Cloud Storage location to read the JSON cloud.healthcare.deidentify.DeidentifyConfig from, overriding the default config. Must be of the form `gs://{bucket_id}/path/to/object`. The Cloud Storage location must grant the Cloud IAM role `roles/storage.objectViewer` to the project's Cloud Healthcare Service Agent service account. Only one of `config` and `gcs_config_uri` can be specified. */
  gcsConfigUri?: string;
  /** Deidentify configuration. Only one of `config` and `gcs_config_uri` can be specified. */
  config?: DeidentifyConfig;
  /** Required. The name of the dataset resource to create and write the redacted data to. * The destination dataset must not exist. * The destination dataset must be in the same location as the source dataset. De-identifying data across multiple locations is not supported. */
  destinationDataset?: string;
}

export const DeidentifyDatasetRequest: Schema.Schema<DeidentifyDatasetRequest> = Schema.suspend(() => Schema.Struct({
  gcsConfigUri: Schema.optional(Schema.String),
  config: Schema.optional(DeidentifyConfig),
  destinationDataset: Schema.optional(Schema.String),
})).annotate({ identifier: "DeidentifyDatasetRequest" }) as any as Schema.Schema<DeidentifyDatasetRequest>;

export interface SetBlobStorageSettingsRequest {
  /** Optional. A filter configuration. If `filter_config` is specified, set the value of `resource` to the resource name of a DICOM store in the format `projects/{projectID}/locations/{locationID}/datasets/{datasetID}/dicomStores/{dicomStoreID}`. */
  filterConfig?: DicomFilterConfig;
  /** The blob storage settings to update for the specified resources. Only fields listed in `update_mask` are applied. */
  blobStorageSettings?: BlobStorageSettings;
}

export const SetBlobStorageSettingsRequest: Schema.Schema<SetBlobStorageSettingsRequest> = Schema.suspend(() => Schema.Struct({
  filterConfig: Schema.optional(DicomFilterConfig),
  blobStorageSettings: Schema.optional(BlobStorageSettings),
})).annotate({ identifier: "SetBlobStorageSettingsRequest" }) as any as Schema.Schema<SetBlobStorageSettingsRequest>;

export interface DeidentifySummary {
}

export const DeidentifySummary: Schema.Schema<DeidentifySummary> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DeidentifySummary" }) as any as Schema.Schema<DeidentifySummary>;

export interface ListDatasetsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** The first page of datasets. */
  datasets?: Array<Dataset>;
}

export const ListDatasetsResponse: Schema.Schema<ListDatasetsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  datasets: Schema.optional(Schema.Array(Dataset)),
})).annotate({ identifier: "ListDatasetsResponse" }) as any as Schema.Schema<ListDatasetsResponse>;

export interface BulkDeleteResourcesRequest {
  /** Optional. The Cloud Storage output destination. The Healthcare Service Agent account requires the `roles/storage.objectAdmin` role on the Cloud Storage location. The deleted resources outputs are organized by FHIR resource types. The server creates one or more objects per resource type. Each object contains newline delimited strings in the format {resourceType}/{resourceId}. */
  gcsDestination?: GoogleCloudHealthcareV1FhirGcsDestination;
  /** Optional. Specifies which version of the resources to delete. */
  versionConfig?: "VERSION_CONFIG_UNSPECIFIED" | "ALL" | "CURRENT_ONLY" | "HISTORY_ONLY" | (string & {});
  /** Optional. String of comma-delimited FHIR resource types. If provided, only resources of the specified resource type(s) will be deleted. */
  type?: string;
  /** Optional. If provided, only resources updated before or atthis time are deleted. The time uses the format YYYY-MM-DDThh:mm:ss.sss+zz:zz. For example, `2015-02-07T13:28:17.239+02:00` or `2017-01-01T00:00:00Z`. The time must be specified to the second and include a time zone. */
  until?: string;
}

export const BulkDeleteResourcesRequest: Schema.Schema<BulkDeleteResourcesRequest> = Schema.suspend(() => Schema.Struct({
  gcsDestination: Schema.optional(GoogleCloudHealthcareV1FhirGcsDestination),
  versionConfig: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  until: Schema.optional(Schema.String),
})).annotate({ identifier: "BulkDeleteResourcesRequest" }) as any as Schema.Schema<BulkDeleteResourcesRequest>;

export interface IngestMessageRequest {
  /** Required. HL7v2 message to ingest. */
  message?: Message;
}

export const IngestMessageRequest: Schema.Schema<IngestMessageRequest> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Message),
})).annotate({ identifier: "IngestMessageRequest" }) as any as Schema.Schema<IngestMessageRequest>;

export interface ListConsentArtifactsResponse {
  /** The returned Consent artifacts. The maximum number of artifacts returned is determined by the value of page_size in the ListConsentArtifactsRequest. */
  consentArtifacts?: Array<ConsentArtifact>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListConsentArtifactsResponse: Schema.Schema<ListConsentArtifactsResponse> = Schema.suspend(() => Schema.Struct({
  consentArtifacts: Schema.optional(Schema.Array(ConsentArtifact)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListConsentArtifactsResponse" }) as any as Schema.Schema<ListConsentArtifactsResponse>;

export interface ListConsentRevisionsResponse {
  /** The returned Consent revisions. The maximum number of revisions returned is determined by the value of `page_size` in the ListConsentRevisionsRequest. */
  consents?: Array<Consent>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListConsentRevisionsResponse: Schema.Schema<ListConsentRevisionsResponse> = Schema.suspend(() => Schema.Struct({
  consents: Schema.optional(Schema.Array(Consent)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListConsentRevisionsResponse" }) as any as Schema.Schema<ListConsentRevisionsResponse>;

export interface QueryAccessibleDataRequest {
  /** The values of request attributes associated with this access request. */
  requestAttributes?: Record<string, string>;
  /** Optional. The values of resource attributes associated with the type of resources being requested. If no values are specified, then all resource types are included in the output. */
  resourceAttributes?: Record<string, string>;
  /** The Cloud Storage destination. The Cloud Healthcare API service account must have the `roles/storage.objectAdmin` Cloud IAM role for this Cloud Storage location. */
  gcsDestination?: GoogleCloudHealthcareV1ConsentGcsDestination;
}

export const QueryAccessibleDataRequest: Schema.Schema<QueryAccessibleDataRequest> = Schema.suspend(() => Schema.Struct({
  requestAttributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  resourceAttributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  gcsDestination: Schema.optional(GoogleCloudHealthcareV1ConsentGcsDestination),
})).annotate({ identifier: "QueryAccessibleDataRequest" }) as any as Schema.Schema<QueryAccessibleDataRequest>;

export interface CheckDataAccessRequest {
  /** Required. The unique identifier of the resource to check access for. This identifier must correspond to a User data mapping in the given consent store. */
  dataId?: string;
  /** Optional. Specific Consents to evaluate the access request against. These Consents must have the same `user_id` as the evaluated User data mapping, must exist in the current `consent_store`, and have a `state` of either `ACTIVE` or `DRAFT`. A maximum of 100 Consents can be provided here. If no selection is specified, the access request is evaluated against all `ACTIVE` unexpired Consents with the same `user_id` as the evaluated User data mapping. */
  consentList?: ConsentList;
  /** The values of request attributes associated with this access request. */
  requestAttributes?: Record<string, string>;
  /** Optional. The view for CheckDataAccessResponse. If unspecified, defaults to `BASIC` and returns `consented` as `TRUE` or `FALSE`. */
  responseView?: "RESPONSE_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const CheckDataAccessRequest: Schema.Schema<CheckDataAccessRequest> = Schema.suspend(() => Schema.Struct({
  dataId: Schema.optional(Schema.String),
  consentList: Schema.optional(ConsentList),
  requestAttributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  responseView: Schema.optional(Schema.String),
})).annotate({ identifier: "CheckDataAccessRequest" }) as any as Schema.Schema<CheckDataAccessRequest>;

export interface Result {
  /** The unique identifier of the evaluated resource. */
  dataId?: string;
  /** Whether the resource is consented for the given use. */
  consented?: boolean;
  /** The resource names of all evaluated Consents mapped to their evaluation. */
  consentDetails?: Record<string, ConsentEvaluation>;
}

export const Result: Schema.Schema<Result> = Schema.suspend(() => Schema.Struct({
  dataId: Schema.optional(Schema.String),
  consented: Schema.optional(Schema.Boolean),
  consentDetails: Schema.optional(Schema.Record(Schema.String, ConsentEvaluation)),
})).annotate({ identifier: "Result" }) as any as Schema.Schema<Result>;

export interface ImportMessagesResponse {
}

export const ImportMessagesResponse: Schema.Schema<ImportMessagesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ImportMessagesResponse" }) as any as Schema.Schema<ImportMessagesResponse>;

export interface GoogleCloudHealthcareV1DeidentifyDeidentifyDicomStoreSummary {
}

export const GoogleCloudHealthcareV1DeidentifyDeidentifyDicomStoreSummary: Schema.Schema<GoogleCloudHealthcareV1DeidentifyDeidentifyDicomStoreSummary> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudHealthcareV1DeidentifyDeidentifyDicomStoreSummary" }) as any as Schema.Schema<GoogleCloudHealthcareV1DeidentifyDeidentifyDicomStoreSummary>;

export interface RollbackFhirResourcesRequest {
  /** Optional. When enabled, changes will be reverted without explicit confirmation */
  force?: boolean;
  /** Required. Bucket to deposit result */
  resultGcsBucket?: string;
  /** Optional. Specifies whether to exclude earlier rollbacks. */
  excludeRollbacks?: boolean;
  /** Optional. Cloud Storage object containing list of {resourceType}/{resourceId} lines, identifying resources to be reverted */
  inputGcsObject?: string;
  /** Optional. CREATE/UPDATE/DELETE/ALL for reverting all txns of a certain type. */
  changeType?: "CHANGE_TYPE_UNSPECIFIED" | "ALL" | "CREATE" | "UPDATE" | "DELETE" | (string & {});
  /** Optional. If specified, revert only resources of these types */
  type?: Array<string>;
  /** Required. Time point to rollback to. */
  rollbackTime?: string;
  /** Optional. Parameters for filtering resources */
  filteringFields?: RollbackFhirResourceFilteringFields;
}

export const RollbackFhirResourcesRequest: Schema.Schema<RollbackFhirResourcesRequest> = Schema.suspend(() => Schema.Struct({
  force: Schema.optional(Schema.Boolean),
  resultGcsBucket: Schema.optional(Schema.String),
  excludeRollbacks: Schema.optional(Schema.Boolean),
  inputGcsObject: Schema.optional(Schema.String),
  changeType: Schema.optional(Schema.String),
  type: Schema.optional(Schema.Array(Schema.String)),
  rollbackTime: Schema.optional(Schema.String),
  filteringFields: Schema.optional(RollbackFhirResourceFilteringFields),
})).annotate({ identifier: "RollbackFhirResourcesRequest" }) as any as Schema.Schema<RollbackFhirResourcesRequest>;

export interface IngestMessageResponse {
  /** Created message resource. */
  message?: Message;
  /** HL7v2 ACK message. */
  hl7Ack?: string;
}

export const IngestMessageResponse: Schema.Schema<IngestMessageResponse> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Message),
  hl7Ack: Schema.optional(Schema.String),
})).annotate({ identifier: "IngestMessageResponse" }) as any as Schema.Schema<IngestMessageResponse>;

export interface ApplyAdminConsentsResponse {
  /** The number of resources (including the Consent resources) that ApplyAdminConsents failed to re-index. */
  failedResources?: string;
  /** If `validate_only=false` in ApplyAdminConsentsRequest, this counter contains the number of Consent resources that were successfully applied. Otherwise, it is the number of Consent resources that are supported. */
  consentApplySuccess?: string;
  /** The number of resources (including the Consent resources) that may have consent access change. */
  affectedResources?: string;
}

export const ApplyAdminConsentsResponse: Schema.Schema<ApplyAdminConsentsResponse> = Schema.suspend(() => Schema.Struct({
  failedResources: Schema.optional(Schema.String),
  consentApplySuccess: Schema.optional(Schema.String),
  affectedResources: Schema.optional(Schema.String),
})).annotate({ identifier: "ApplyAdminConsentsResponse" }) as any as Schema.Schema<ApplyAdminConsentsResponse>;

export interface CancelOperationRequest {
}

export const CancelOperationRequest: Schema.Schema<CancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "CancelOperationRequest" }) as any as Schema.Schema<CancelOperationRequest>;

export interface ActivateConsentRequest {
  /** Required. The resource name of the Consent artifact that contains documentation of the user's consent, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consentArtifacts/{consent_artifact_id}`. If the draft Consent had a Consent artifact, this Consent artifact overwrites it. */
  consentArtifact?: string;
  /** Timestamp in UTC of when this Consent is considered expired. */
  expireTime?: string;
  /** The time to live for this Consent from when it is marked as active. */
  ttl?: string;
}

export const ActivateConsentRequest: Schema.Schema<ActivateConsentRequest> = Schema.suspend(() => Schema.Struct({
  consentArtifact: Schema.optional(Schema.String),
  expireTime: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.String),
})).annotate({ identifier: "ActivateConsentRequest" }) as any as Schema.Schema<ActivateConsentRequest>;

export interface ListAttributeDefinitionsResponse {
  /** The returned Attribute definitions. The maximum number of attributes returned is determined by the value of page_size in the ListAttributeDefinitionsRequest. */
  attributeDefinitions?: Array<AttributeDefinition>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListAttributeDefinitionsResponse: Schema.Schema<ListAttributeDefinitionsResponse> = Schema.suspend(() => Schema.Struct({
  attributeDefinitions: Schema.optional(Schema.Array(AttributeDefinition)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListAttributeDefinitionsResponse" }) as any as Schema.Schema<ListAttributeDefinitionsResponse>;

export interface ImportDicomDataRequest {
  /** Cloud Storage source data location and import configuration. The Cloud Healthcare Service Agent requires the `roles/storage.objectViewer` Cloud IAM roles on the Cloud Storage location. */
  gcsSource?: GoogleCloudHealthcareV1DicomGcsSource;
  /** Optional. The blob storage settings for the data imported by this operation. */
  blobStorageSettings?: BlobStorageSettings;
}

export const ImportDicomDataRequest: Schema.Schema<ImportDicomDataRequest> = Schema.suspend(() => Schema.Struct({
  gcsSource: Schema.optional(GoogleCloudHealthcareV1DicomGcsSource),
  blobStorageSettings: Schema.optional(BlobStorageSettings),
})).annotate({ identifier: "ImportDicomDataRequest" }) as any as Schema.Schema<ImportDicomDataRequest>;

export interface EvaluateUserConsentsResponse {
  /** The consent evaluation result for each `data_id`. */
  results?: Array<Result>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. This token is valid for 72 hours after it is created. */
  nextPageToken?: string;
}

export const EvaluateUserConsentsResponse: Schema.Schema<EvaluateUserConsentsResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(Result)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "EvaluateUserConsentsResponse" }) as any as Schema.Schema<EvaluateUserConsentsResponse>;

export interface EvaluateUserConsentsRequest {
  /** Optional. The values of resource attributes associated with the resources being requested. If no values are specified, then all resources are queried. */
  resourceAttributes?: Record<string, string>;
  /** Optional. Specific Consents to evaluate the access request against. These Consents must have the same `user_id` as the User data mappings being evalauted, must exist in the current `consent_store`, and must have a `state` of either `ACTIVE` or `DRAFT`. A maximum of 100 Consents can be provided here. If unspecified, all `ACTIVE` unexpired Consents in the current `consent_store` will be evaluated. */
  consentList?: ConsentList;
  /** Optional. The view for EvaluateUserConsentsResponse. If unspecified, defaults to `BASIC` and returns `consented` as `TRUE` or `FALSE`. */
  responseView?: "RESPONSE_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Optional. Token to retrieve the next page of results, or empty to get the first page. */
  pageToken?: string;
  /** Optional. Limit on the number of User data mappings to return in a single response. If not specified, 100 is used. May not be larger than 1000. */
  pageSize?: number;
  /** Required. User ID to evaluate consents for. */
  userId?: string;
  /** Required. The values of request attributes associated with this access request. */
  requestAttributes?: Record<string, string>;
}

export const EvaluateUserConsentsRequest: Schema.Schema<EvaluateUserConsentsRequest> = Schema.suspend(() => Schema.Struct({
  resourceAttributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  consentList: Schema.optional(ConsentList),
  responseView: Schema.optional(Schema.String),
  pageToken: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  userId: Schema.optional(Schema.String),
  requestAttributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "EvaluateUserConsentsRequest" }) as any as Schema.Schema<EvaluateUserConsentsRequest>;

export interface SetBlobStorageSettingsResponse {
}

export const SetBlobStorageSettingsResponse: Schema.Schema<SetBlobStorageSettingsResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SetBlobStorageSettingsResponse" }) as any as Schema.Schema<SetBlobStorageSettingsResponse>;

export interface ListHl7V2StoresResponse {
  /** The returned HL7v2 stores. Won't be more HL7v2 stores than the value of page_size in the request. */
  hl7V2Stores?: Array<Hl7V2Store>;
  /** Token to retrieve the next page of results or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const ListHl7V2StoresResponse: Schema.Schema<ListHl7V2StoresResponse> = Schema.suspend(() => Schema.Struct({
  hl7V2Stores: Schema.optional(Schema.Array(Hl7V2Store)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListHl7V2StoresResponse" }) as any as Schema.Schema<ListHl7V2StoresResponse>;

export interface RejectConsentRequest {
  /** Optional. The resource name of the Consent artifact that contains documentation of the user's rejection of the draft Consent, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consentArtifacts/{consent_artifact_id}`. If the draft Consent had a Consent artifact, this Consent artifact overwrites it. */
  consentArtifact?: string;
}

export const RejectConsentRequest: Schema.Schema<RejectConsentRequest> = Schema.suspend(() => Schema.Struct({
  consentArtifact: Schema.optional(Schema.String),
})).annotate({ identifier: "RejectConsentRequest" }) as any as Schema.Schema<RejectConsentRequest>;

// ==========================================================================
// Operations
// ==========================================================================

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

/** Lists information about the supported locations for this service. This method can be called in two ways: * **List all public locations:** Use the path `GET /v1/locations`. * **List project-visible locations:** Use the path `GET /v1/projects/{project_id}/locations`. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). */
  filter?: string;
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
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

/** Analyze heathcare entity in a document. Its response includes the recognized entity mentions and the relationships between them. AnalyzeEntities uses context aware models to detect entities. */
export interface AnalyzeEntitiesProjectsLocationsServicesNlpRequest {
  /** The resource name of the service of the form: "projects/{project_id}/locations/{location_id}/services/nlp". */
  nlpService: string;
  /** Request body */
  body?: AnalyzeEntitiesRequest;
}

export const AnalyzeEntitiesProjectsLocationsServicesNlpRequest = Schema.Struct({
  nlpService: Schema.String.pipe(T.HttpPath("nlpService")),
  body: Schema.optional(AnalyzeEntitiesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/services/nlp:analyzeEntities", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AnalyzeEntitiesProjectsLocationsServicesNlpRequest>;

export type AnalyzeEntitiesProjectsLocationsServicesNlpResponse = AnalyzeEntitiesResponse;
export const AnalyzeEntitiesProjectsLocationsServicesNlpResponse = AnalyzeEntitiesResponse;

export type AnalyzeEntitiesProjectsLocationsServicesNlpError = CommonErrors;

export const analyzeEntitiesProjectsLocationsServicesNlp: API.OperationMethod<AnalyzeEntitiesProjectsLocationsServicesNlpRequest, AnalyzeEntitiesProjectsLocationsServicesNlpResponse, AnalyzeEntitiesProjectsLocationsServicesNlpError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AnalyzeEntitiesProjectsLocationsServicesNlpRequest,
  output: AnalyzeEntitiesProjectsLocationsServicesNlpResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsDatasetsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsDatasetsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDatasetsRequest>;

export type GetIamPolicyProjectsLocationsDatasetsResponse = Policy;
export const GetIamPolicyProjectsLocationsDatasetsResponse = Policy;

export type GetIamPolicyProjectsLocationsDatasetsError = CommonErrors;

export const getIamPolicyProjectsLocationsDatasets: API.OperationMethod<GetIamPolicyProjectsLocationsDatasetsRequest, GetIamPolicyProjectsLocationsDatasetsResponse, GetIamPolicyProjectsLocationsDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDatasetsRequest,
  output: GetIamPolicyProjectsLocationsDatasetsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsDatasetsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDatasetsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDatasetsRequest>;

export type SetIamPolicyProjectsLocationsDatasetsResponse = Policy;
export const SetIamPolicyProjectsLocationsDatasetsResponse = Policy;

export type SetIamPolicyProjectsLocationsDatasetsError = CommonErrors;

export const setIamPolicyProjectsLocationsDatasets: API.OperationMethod<SetIamPolicyProjectsLocationsDatasetsRequest, SetIamPolicyProjectsLocationsDatasetsResponse, SetIamPolicyProjectsLocationsDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDatasetsRequest,
  output: SetIamPolicyProjectsLocationsDatasetsResponse,
  errors: [],
}));

/** Deletes the specified health dataset and all data contained in the dataset. Deleting a dataset does not affect the sources from which the dataset was imported (if any). */
export interface DeleteProjectsLocationsDatasetsRequest {
  /** Required. The name of the dataset to delete. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}`. */
  name: string;
}

export const DeleteProjectsLocationsDatasetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatasetsRequest>;

export type DeleteProjectsLocationsDatasetsResponse = Empty;
export const DeleteProjectsLocationsDatasetsResponse = Empty;

export type DeleteProjectsLocationsDatasetsError = CommonErrors;

export const deleteProjectsLocationsDatasets: API.OperationMethod<DeleteProjectsLocationsDatasetsRequest, DeleteProjectsLocationsDatasetsResponse, DeleteProjectsLocationsDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatasetsRequest,
  output: DeleteProjectsLocationsDatasetsResponse,
  errors: [],
}));

/** Gets any metadata associated with a dataset. */
export interface GetProjectsLocationsDatasetsRequest {
  /** Required. The name of the dataset to read. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}`. */
  name: string;
}

export const GetProjectsLocationsDatasetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDatasetsRequest>;

export type GetProjectsLocationsDatasetsResponse = Dataset;
export const GetProjectsLocationsDatasetsResponse = Dataset;

export type GetProjectsLocationsDatasetsError = CommonErrors;

export const getProjectsLocationsDatasets: API.OperationMethod<GetProjectsLocationsDatasetsRequest, GetProjectsLocationsDatasetsResponse, GetProjectsLocationsDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDatasetsRequest,
  output: GetProjectsLocationsDatasetsResponse,
  errors: [],
}));

/** Creates a new health dataset. Results are returned through the Operation interface which returns either an `Operation.response` which contains a Dataset or `Operation.error`. The metadata field type is OperationMetadata. */
export interface CreateProjectsLocationsDatasetsRequest {
  /** Required. The ID of the dataset that is being created. The string must match the following regex: `[\p{L}\p{N}_\-\.]{1,256}`. */
  datasetId?: string;
  /** Required. The name of the project where the server creates the dataset. For example, `projects/{project_id}/locations/{location_id}`. */
  parent: string;
  /** Request body */
  body?: Dataset;
}

export const CreateProjectsLocationsDatasetsRequest = Schema.Struct({
  datasetId: Schema.optional(Schema.String).pipe(T.HttpQuery("datasetId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Dataset).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDatasetsRequest>;

export type CreateProjectsLocationsDatasetsResponse = Operation;
export const CreateProjectsLocationsDatasetsResponse = Operation;

export type CreateProjectsLocationsDatasetsError = CommonErrors;

export const createProjectsLocationsDatasets: API.OperationMethod<CreateProjectsLocationsDatasetsRequest, CreateProjectsLocationsDatasetsResponse, CreateProjectsLocationsDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDatasetsRequest,
  output: CreateProjectsLocationsDatasetsResponse,
  errors: [],
}));

/** Updates dataset metadata. */
export interface PatchProjectsLocationsDatasetsRequest {
  /** Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Identifier. Resource name of the dataset, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}`. */
  name: string;
  /** Request body */
  body?: Dataset;
}

export const PatchProjectsLocationsDatasetsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Dataset).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDatasetsRequest>;

export type PatchProjectsLocationsDatasetsResponse = Dataset;
export const PatchProjectsLocationsDatasetsResponse = Dataset;

export type PatchProjectsLocationsDatasetsError = CommonErrors;

export const patchProjectsLocationsDatasets: API.OperationMethod<PatchProjectsLocationsDatasetsRequest, PatchProjectsLocationsDatasetsResponse, PatchProjectsLocationsDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDatasetsRequest,
  output: PatchProjectsLocationsDatasetsResponse,
  errors: [],
}));

/** Creates a new dataset containing de-identified data from the source dataset. The metadata field type is OperationMetadata. If the request is successful, the response field type is DeidentifySummary. If errors occur, error is set. The LRO result may still be successful if de-identification fails for some DICOM instances. The new de-identified dataset will not contain these failed resources. Failed resource totals are tracked in Operation.metadata. Error details are also logged to Cloud Logging. For more information, see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging). */
export interface DeidentifyProjectsLocationsDatasetsRequest {
  /** Required. Source dataset resource name. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}`. R5 FHIR stores are not supported and will be skipped. */
  sourceDataset: string;
  /** Request body */
  body?: DeidentifyDatasetRequest;
}

export const DeidentifyProjectsLocationsDatasetsRequest = Schema.Struct({
  sourceDataset: Schema.String.pipe(T.HttpPath("sourceDataset")),
  body: Schema.optional(DeidentifyDatasetRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}:deidentify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeidentifyProjectsLocationsDatasetsRequest>;

export type DeidentifyProjectsLocationsDatasetsResponse = Operation;
export const DeidentifyProjectsLocationsDatasetsResponse = Operation;

export type DeidentifyProjectsLocationsDatasetsError = CommonErrors;

export const deidentifyProjectsLocationsDatasets: API.OperationMethod<DeidentifyProjectsLocationsDatasetsRequest, DeidentifyProjectsLocationsDatasetsResponse, DeidentifyProjectsLocationsDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeidentifyProjectsLocationsDatasetsRequest,
  output: DeidentifyProjectsLocationsDatasetsResponse,
  errors: [],
}));

/** Lists the health datasets in the current project. */
export interface ListProjectsLocationsDatasetsRequest {
  /** The maximum number of items to return. If not specified, 100 is used. May not be larger than 1000. */
  pageSize?: number;
  /** Required. The name of the project whose datasets should be listed. For example, `projects/{project_id}/locations/{location_id}`. */
  parent: string;
  /** The next_page_token value returned from a previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsDatasetsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDatasetsRequest>;

export type ListProjectsLocationsDatasetsResponse = ListDatasetsResponse;
export const ListProjectsLocationsDatasetsResponse = ListDatasetsResponse;

export type ListProjectsLocationsDatasetsError = CommonErrors;

export const listProjectsLocationsDatasets = API.makePaginated(() => ({
  input: ListProjectsLocationsDatasetsRequest,
  output: ListProjectsLocationsDatasetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsDatasetsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDatasetsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDatasetsRequest>;

export type TestIamPermissionsProjectsLocationsDatasetsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDatasetsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDatasetsError = CommonErrors;

export const testIamPermissionsProjectsLocationsDatasets: API.OperationMethod<TestIamPermissionsProjectsLocationsDatasetsRequest, TestIamPermissionsProjectsLocationsDatasetsResponse, TestIamPermissionsProjectsLocationsDatasetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDatasetsRequest,
  output: TestIamPermissionsProjectsLocationsDatasetsResponse,
  errors: [],
}));

/** Rolls back resources from the FHIR store to the specified time. This method returns an Operation that can be used to track the status of the rollback by calling GetOperation. Immediate fatal errors appear in the error field, errors are also logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). Otherwise, when the operation finishes, a detailed response of type RollbackFhirResourcesResponse is returned in the response field. The metadata field type for this operation is OperationMetadata. */
export interface RollbackProjectsLocationsDatasetsFhirStoresRequest {
  /** Required. The name of the FHIR store to rollback, in the format of "projects/{project_id}/locations/{location_id}/datasets/{dataset_id} /fhirStores/{fhir_store_id}". */
  name: string;
  /** Request body */
  body?: RollbackFhirResourcesRequest;
}

export const RollbackProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RollbackFhirResourcesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}:rollback", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RollbackProjectsLocationsDatasetsFhirStoresRequest>;

export type RollbackProjectsLocationsDatasetsFhirStoresResponse = Operation;
export const RollbackProjectsLocationsDatasetsFhirStoresResponse = Operation;

export type RollbackProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const rollbackProjectsLocationsDatasetsFhirStores: API.OperationMethod<RollbackProjectsLocationsDatasetsFhirStoresRequest, RollbackProjectsLocationsDatasetsFhirStoresResponse, RollbackProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RollbackProjectsLocationsDatasetsFhirStoresRequest,
  output: RollbackProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsDatasetsFhirStoresRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDatasetsFhirStoresRequest>;

export type SetIamPolicyProjectsLocationsDatasetsFhirStoresResponse = Policy;
export const SetIamPolicyProjectsLocationsDatasetsFhirStoresResponse = Policy;

export type SetIamPolicyProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const setIamPolicyProjectsLocationsDatasetsFhirStores: API.OperationMethod<SetIamPolicyProjectsLocationsDatasetsFhirStoresRequest, SetIamPolicyProjectsLocationsDatasetsFhirStoresResponse, SetIamPolicyProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDatasetsFhirStoresRequest,
  output: SetIamPolicyProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Gets metrics associated with the FHIR store. */
export interface GetFHIRStoreMetricsProjectsLocationsDatasetsFhirStoresRequest {
  /** Required. The resource name of the FHIR store to get metrics for. */
  name: string;
}

export const GetFHIRStoreMetricsProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}:getFHIRStoreMetrics" }),
  svc,
) as unknown as Schema.Schema<GetFHIRStoreMetricsProjectsLocationsDatasetsFhirStoresRequest>;

export type GetFHIRStoreMetricsProjectsLocationsDatasetsFhirStoresResponse = FhirStoreMetrics;
export const GetFHIRStoreMetricsProjectsLocationsDatasetsFhirStoresResponse = FhirStoreMetrics;

export type GetFHIRStoreMetricsProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const getFHIRStoreMetricsProjectsLocationsDatasetsFhirStores: API.OperationMethod<GetFHIRStoreMetricsProjectsLocationsDatasetsFhirStoresRequest, GetFHIRStoreMetricsProjectsLocationsDatasetsFhirStoresResponse, GetFHIRStoreMetricsProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetFHIRStoreMetricsProjectsLocationsDatasetsFhirStoresRequest,
  output: GetFHIRStoreMetricsProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Imports resources to the FHIR store by loading data from the specified sources. This method is optimized to load large quantities of data using import semantics that ignore some FHIR store configuration options and are not suitable for all use cases. It is primarily intended to load data into an empty FHIR store that is not being used by other clients. In cases where this method is not appropriate, consider using ExecuteBundle to load data. Every resource in the input must contain a client-supplied ID. Each resource is stored using the supplied ID regardless of the enable_update_create setting on the FHIR store. It is strongly advised not to include or encode any sensitive data such as patient identifiers in client-specified resource IDs. Those IDs are part of the FHIR resource path recorded in Cloud Audit Logs and Cloud Pub/Sub notifications. Those IDs can also be contained in reference fields within other resources. The import process does not enforce referential integrity, regardless of the disable_referential_integrity setting on the FHIR store. This allows the import of resources with arbitrary interdependencies without considering grouping or ordering, but if the input data contains invalid references or if some resources fail to be imported, the FHIR store might be left in a state that violates referential integrity. The import process does not trigger Pub/Sub notification or BigQuery streaming update, regardless of how those are configured on the FHIR store. If a resource with the specified ID already exists, the most recent version of the resource is overwritten without creating a new historical version, regardless of the disable_resource_versioning setting on the FHIR store. If transient failures occur during the import, it's possible that successfully imported resources will be overwritten more than once. The import operation is idempotent unless the input data contains multiple valid resources with the same ID but different contents. In that case, after the import completes, the store contains exactly one resource with that ID but there is no ordering guarantee on which version of the contents it will have. The operation result counters do not count duplicate IDs as an error and count one success for each resource in the input, which might result in a success count larger than the number of resources in the FHIR store. This often occurs when importing data organized in bundles produced by Patient-everything where each bundle contains its own copy of a resource such as Practitioner that might be referred to by many patients. If some resources fail to import, for example due to parsing errors, successfully imported resources are not rolled back. The location and format of the input data is specified by the parameters in ImportResourcesRequest. Note that if no format is specified, this method assumes the `BUNDLE` format. When using the `BUNDLE` format this method ignores the `Bundle.type` field, except that `history` bundles are rejected, and does not apply any of the bundle processing semantics for batch or transaction bundles. Unlike in ExecuteBundle, transaction bundles are not executed as a single transaction and bundle-internal references are not rewritten. The bundle is treated as a collection of resources to be written as provided in `Bundle.entry.resource`, ignoring `Bundle.entry.request`. As an example, this allows the import of `searchset` bundles produced by a FHIR search or Patient-everything operation. This method returns an Operation that can be used to track the status of the import by calling GetOperation. Immediate fatal errors appear in the error field, errors are also logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). Otherwise, when the operation finishes, a detailed response of type ImportResourcesResponse is returned in the response field. The metadata field type for this operation is OperationMetadata. */
export interface ImportProjectsLocationsDatasetsFhirStoresRequest {
  /** Required. The name of the FHIR store to import FHIR resources to, in the format of `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`. */
  name: string;
  /** Request body */
  body?: ImportResourcesRequest;
}

export const ImportProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ImportResourcesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsDatasetsFhirStoresRequest>;

export type ImportProjectsLocationsDatasetsFhirStoresResponse = Operation;
export const ImportProjectsLocationsDatasetsFhirStoresResponse = Operation;

export type ImportProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const importProjectsLocationsDatasetsFhirStores: API.OperationMethod<ImportProjectsLocationsDatasetsFhirStoresRequest, ImportProjectsLocationsDatasetsFhirStoresResponse, ImportProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsDatasetsFhirStoresRequest,
  output: ImportProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Apply the Consent resources for the FHIR store and reindex the underlying resources in the FHIR store according to the aggregate consent. The aggregate consent of the patient in scope in this request replaces any previous call of this method. Any Consent resource change after this operation execution (including deletion) requires you to call ApplyConsents again to have effect. This method returns an Operation that can be used to track the progress of the consent resources that were processed by calling GetOperation. Upon completion, the ApplyConsentsResponse additionally contains the number of resources that was reindexed. Errors are logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). To enforce consent check for data access, `consent_config.access_enforced` must be set to true for the FhirStore. FHIR Consent is not supported in DSTU2 or R5. */
export interface ApplyConsentsProjectsLocationsDatasetsFhirStoresRequest {
  /** Required. The name of the FHIR store to enforce, in the format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`. */
  name: string;
  /** Request body */
  body?: ApplyConsentsRequest;
}

export const ApplyConsentsProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApplyConsentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}:applyConsents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApplyConsentsProjectsLocationsDatasetsFhirStoresRequest>;

export type ApplyConsentsProjectsLocationsDatasetsFhirStoresResponse = Operation;
export const ApplyConsentsProjectsLocationsDatasetsFhirStoresResponse = Operation;

export type ApplyConsentsProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const applyConsentsProjectsLocationsDatasetsFhirStores: API.OperationMethod<ApplyConsentsProjectsLocationsDatasetsFhirStoresRequest, ApplyConsentsProjectsLocationsDatasetsFhirStoresResponse, ApplyConsentsProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApplyConsentsProjectsLocationsDatasetsFhirStoresRequest,
  output: ApplyConsentsProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Explains all the permitted/denied actor, purpose and environment for a given resource. FHIR Consent is not supported in DSTU2 or R5. */
export interface ExplainDataAccessProjectsLocationsDatasetsFhirStoresRequest {
  /** Required. The ID (`{resourceType}/{id}`) of the resource to explain data access on. */
  resourceId?: string;
  /** Required. The name of the FHIR store to enforce, in the format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`. */
  name: string;
}

export const ExplainDataAccessProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  resourceId: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceId")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}:explainDataAccess" }),
  svc,
) as unknown as Schema.Schema<ExplainDataAccessProjectsLocationsDatasetsFhirStoresRequest>;

export type ExplainDataAccessProjectsLocationsDatasetsFhirStoresResponse = ExplainDataAccessResponse;
export const ExplainDataAccessProjectsLocationsDatasetsFhirStoresResponse = ExplainDataAccessResponse;

export type ExplainDataAccessProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const explainDataAccessProjectsLocationsDatasetsFhirStores: API.OperationMethod<ExplainDataAccessProjectsLocationsDatasetsFhirStoresRequest, ExplainDataAccessProjectsLocationsDatasetsFhirStoresResponse, ExplainDataAccessProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExplainDataAccessProjectsLocationsDatasetsFhirStoresRequest,
  output: ExplainDataAccessProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** De-identifies data from the source store and writes it to the destination store. The metadata field type is OperationMetadata. If the request is successful, the response field type is DeidentifyFhirStoreSummary. If errors occur, error is set. Error details are also logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). */
export interface DeidentifyProjectsLocationsDatasetsFhirStoresRequest {
  /** Required. Source FHIR store resource name. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`. R5 stores are not supported. */
  sourceStore: string;
  /** Request body */
  body?: DeidentifyFhirStoreRequest;
}

export const DeidentifyProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  sourceStore: Schema.String.pipe(T.HttpPath("sourceStore")),
  body: Schema.optional(DeidentifyFhirStoreRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}:deidentify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeidentifyProjectsLocationsDatasetsFhirStoresRequest>;

export type DeidentifyProjectsLocationsDatasetsFhirStoresResponse = Operation;
export const DeidentifyProjectsLocationsDatasetsFhirStoresResponse = Operation;

export type DeidentifyProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const deidentifyProjectsLocationsDatasetsFhirStores: API.OperationMethod<DeidentifyProjectsLocationsDatasetsFhirStoresRequest, DeidentifyProjectsLocationsDatasetsFhirStoresResponse, DeidentifyProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeidentifyProjectsLocationsDatasetsFhirStoresRequest,
  output: DeidentifyProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Applies the admin Consent resources for the FHIR store and reindexes the underlying resources in the FHIR store according to the aggregate consents. This method also updates the `consent_config.enforced_admin_consents` field of the FhirStore unless `validate_only=true` in ApplyAdminConsentsRequest. Any admin Consent resource change after this operation execution (including deletion) requires you to call ApplyAdminConsents again for the change to take effect. This method returns an Operation that can be used to track the progress of the resources that were reindexed, by calling GetOperation. Upon completion, the ApplyAdminConsentsResponse additionally contains the number of resources that were reindexed. If at least one Consent resource contains an error or fails be be enforced for any reason, the method returns an error instead of an Operation. No resources will be reindexed and the `consent_config.enforced_admin_consents` field will be unchanged. To enforce a consent check for data access, `consent_config.access_enforced` must be set to true for the FhirStore. FHIR Consent is not supported in DSTU2 or R5. */
export interface ApplyAdminConsentsProjectsLocationsDatasetsFhirStoresRequest {
  /** Required. The name of the FHIR store to enforce, in the format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`. */
  name: string;
  /** Request body */
  body?: ApplyAdminConsentsRequest;
}

export const ApplyAdminConsentsProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApplyAdminConsentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}:applyAdminConsents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApplyAdminConsentsProjectsLocationsDatasetsFhirStoresRequest>;

export type ApplyAdminConsentsProjectsLocationsDatasetsFhirStoresResponse = Operation;
export const ApplyAdminConsentsProjectsLocationsDatasetsFhirStoresResponse = Operation;

export type ApplyAdminConsentsProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const applyAdminConsentsProjectsLocationsDatasetsFhirStores: API.OperationMethod<ApplyAdminConsentsProjectsLocationsDatasetsFhirStoresRequest, ApplyAdminConsentsProjectsLocationsDatasetsFhirStoresResponse, ApplyAdminConsentsProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApplyAdminConsentsProjectsLocationsDatasetsFhirStoresRequest,
  output: ApplyAdminConsentsProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Export resources from the FHIR store to the specified destination. This method returns an Operation that can be used to track the status of the export by calling GetOperation. To improve performance, it is recommended to make the `type` filter as specific as possible, including only the resource types that are absolutely needed. This minimizes the size of the initial dataset to be processed and is the most effective way to improve performance. While post-filters like `_since` are useful for refining results, they do not speed up the initial data retrieval phase, which is primarily governed by the `type` filter. Immediate fatal errors appear in the error field, errors are also logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). Otherwise, when the operation finishes, a detailed response of type ExportResourcesResponse is returned in the response field. The metadata field type for this operation is OperationMetadata. */
export interface ExportProjectsLocationsDatasetsFhirStoresRequest {
  /** Required. The name of the FHIR store to export resource from, in the format of `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`. */
  name: string;
  /** Request body */
  body?: ExportResourcesRequest;
}

export const ExportProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ExportResourcesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}:export", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportProjectsLocationsDatasetsFhirStoresRequest>;

export type ExportProjectsLocationsDatasetsFhirStoresResponse = Operation;
export const ExportProjectsLocationsDatasetsFhirStoresResponse = Operation;

export type ExportProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const exportProjectsLocationsDatasetsFhirStores: API.OperationMethod<ExportProjectsLocationsDatasetsFhirStoresRequest, ExportProjectsLocationsDatasetsFhirStoresResponse, ExportProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportProjectsLocationsDatasetsFhirStoresRequest,
  output: ExportProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsDatasetsFhirStoresRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDatasetsFhirStoresRequest>;

export type GetIamPolicyProjectsLocationsDatasetsFhirStoresResponse = Policy;
export const GetIamPolicyProjectsLocationsDatasetsFhirStoresResponse = Policy;

export type GetIamPolicyProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const getIamPolicyProjectsLocationsDatasetsFhirStores: API.OperationMethod<GetIamPolicyProjectsLocationsDatasetsFhirStoresRequest, GetIamPolicyProjectsLocationsDatasetsFhirStoresResponse, GetIamPolicyProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDatasetsFhirStoresRequest,
  output: GetIamPolicyProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Creates a new FHIR store within the parent dataset. */
export interface CreateProjectsLocationsDatasetsFhirStoresRequest {
  /** Required. The ID of the FHIR store that is being created. The string must match the following regex: `[\p{L}\p{N}_\-\.]{1,256}`. */
  fhirStoreId?: string;
  /** Required. The name of the dataset this FHIR store belongs to. */
  parent: string;
  /** Request body */
  body?: FhirStore;
}

export const CreateProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  fhirStoreId: Schema.optional(Schema.String).pipe(T.HttpQuery("fhirStoreId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(FhirStore).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDatasetsFhirStoresRequest>;

export type CreateProjectsLocationsDatasetsFhirStoresResponse = FhirStore;
export const CreateProjectsLocationsDatasetsFhirStoresResponse = FhirStore;

export type CreateProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const createProjectsLocationsDatasetsFhirStores: API.OperationMethod<CreateProjectsLocationsDatasetsFhirStoresRequest, CreateProjectsLocationsDatasetsFhirStoresResponse, CreateProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDatasetsFhirStoresRequest,
  output: CreateProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Bulk deletes the FHIR resources from the given FHIR store. This method returns an Operation that can be used to track the progress of the deletion by calling GetOperation. The success and secondary_success counters correspond to the deleted current version and historical versions, respectively. */
export interface BulkDeleteProjectsLocationsDatasetsFhirStoresRequest {
  /** Required. The name of the FHIR store to bulk delete resources from, in the format of `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`. */
  name: string;
  /** Request body */
  body?: BulkDeleteResourcesRequest;
}

export const BulkDeleteProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(BulkDeleteResourcesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}:bulkDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BulkDeleteProjectsLocationsDatasetsFhirStoresRequest>;

export type BulkDeleteProjectsLocationsDatasetsFhirStoresResponse = Operation;
export const BulkDeleteProjectsLocationsDatasetsFhirStoresResponse = Operation;

export type BulkDeleteProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const bulkDeleteProjectsLocationsDatasetsFhirStores: API.OperationMethod<BulkDeleteProjectsLocationsDatasetsFhirStoresRequest, BulkDeleteProjectsLocationsDatasetsFhirStoresResponse, BulkDeleteProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BulkDeleteProjectsLocationsDatasetsFhirStoresRequest,
  output: BulkDeleteProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Gets the configuration of the specified FHIR store. */
export interface GetProjectsLocationsDatasetsFhirStoresRequest {
  /** Required. The resource name of the FHIR store to get. */
  name: string;
}

export const GetProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDatasetsFhirStoresRequest>;

export type GetProjectsLocationsDatasetsFhirStoresResponse = FhirStore;
export const GetProjectsLocationsDatasetsFhirStoresResponse = FhirStore;

export type GetProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const getProjectsLocationsDatasetsFhirStores: API.OperationMethod<GetProjectsLocationsDatasetsFhirStoresRequest, GetProjectsLocationsDatasetsFhirStoresResponse, GetProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDatasetsFhirStoresRequest,
  output: GetProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Updates the configuration of the specified FHIR store. */
export interface PatchProjectsLocationsDatasetsFhirStoresRequest {
  /** Output only. Identifier. Resource name of the FHIR store, of the form `projects/{project_id}/locations/{location}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`. */
  name: string;
  /** Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: FhirStore;
}

export const PatchProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(FhirStore).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDatasetsFhirStoresRequest>;

export type PatchProjectsLocationsDatasetsFhirStoresResponse = FhirStore;
export const PatchProjectsLocationsDatasetsFhirStoresResponse = FhirStore;

export type PatchProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const patchProjectsLocationsDatasetsFhirStores: API.OperationMethod<PatchProjectsLocationsDatasetsFhirStoresRequest, PatchProjectsLocationsDatasetsFhirStoresResponse, PatchProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDatasetsFhirStoresRequest,
  output: PatchProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Bulk exports a Group resource and resources in the member field, including related resources for each Patient member. The export for each Patient is identical to a GetPatientEverything request. Implements the FHIR implementation guide [$export group of patients](https://build.fhir.org/ig/HL7/bulk-data/export.html#endpoint---group-of-patients). The following headers must be set in the request: * `Accept`: specifies the format of the `OperationOutcome` response. Only `application/fhir+json` is supported. * `Prefer`: specifies whether the response is immediate or asynchronous. Must be to `respond-async` because only asynchronous responses are supported. Specify the destination for the server to write result files by setting the Cloud Storage location bulk_export_gcs_destination on the FHIR store. URI of an existing Cloud Storage directory where the server writes result files, in the format gs://{bucket-id}/{path/to/destination/dir}. If there is no trailing slash, the service appends one when composing the object path. The user is responsible for creating the Cloud Storage bucket referenced. Supports the following query parameters: * `_type`: string of comma-delimited FHIR resource types. If provided, only resources of the specified type(s) are exported. * `_since`: if provided, only resources updated after the specified time are exported. * `_outputFormat`: optional, specify ndjson to export data in NDJSON format. Exported file names use the format: {export_id}_{resource_type}.ndjson. * `organizeOutputBy`: resource type to organize the output by. Required and must be set to `Patient`. When specified, output files are organized by instances of the specified resource type, including the resource, referenced resources, and resources that contain references to that resource. On success, the `Content-Location` header of response is set to a URL that you can use to query the status of the export. The URL is in the format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/operations/{export_id}`. See get-fhir-operation-status for more information. Errors generated by the FHIR store contain a JSON-encoded `OperationOutcome` resource describing the reason for the error. */
export interface Bulk_export_groupProjectsLocationsDatasetsFhirStoresRequest {
  /** Optional. Output format of the export. This field is optional and only `application/fhir+ndjson` is supported. */
  outputFormat?: string;
  /** Optional. If provided, only resources updated after this time are exported. The time uses the format YYYY-MM-DDThh:mm:ss.sss+zz:zz. For example, `2015-02-07T13:28:17.239+02:00` or `2017-01-01T00:00:00Z`. The time must be specified to the second and include a time zone. */
  _since?: string;
  /** Required. Name of the Group resource that is exported, in format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Group/{group_id}`. */
  name: string;
  /** Required. The FHIR resource type used to organize exported resources. Only supports "Patient". When organized by Patient resource, output files are grouped as follows: * Patient file(s) containing the Patient resources. Each Patient is sequentially followed by all resources the Patient references, and all resources that reference the Patient (equivalent to a GetPatientEverything request). * Individual files grouped by resource type for resources in the Group's member field and the Group resource itself. Resources may be duplicated across multiple Patients. For example, if two Patient resources reference the same Organization resource, it will appear twice, once after each Patient. The Group resource from the request does not appear in the Patient files. */
  organizeOutputBy?: string;
  /** Optional. String of comma-delimited FHIR resource types. If provided, only resources of the specified resource type(s) are exported. */
  _type?: string;
}

export const Bulk_export_groupProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  outputFormat: Schema.optional(Schema.String).pipe(T.HttpQuery("outputFormat")),
  _since: Schema.optional(Schema.String).pipe(T.HttpQuery("_since")),
  name: Schema.String.pipe(T.HttpPath("name")),
  organizeOutputBy: Schema.optional(Schema.String).pipe(T.HttpQuery("organizeOutputBy")),
  _type: Schema.optional(Schema.String).pipe(T.HttpQuery("_type")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/Group/{GroupId}/$export" }),
  svc,
) as unknown as Schema.Schema<Bulk_export_groupProjectsLocationsDatasetsFhirStoresRequest>;

export type Bulk_export_groupProjectsLocationsDatasetsFhirStoresResponse = HttpBody;
export const Bulk_export_groupProjectsLocationsDatasetsFhirStoresResponse = HttpBody;

export type Bulk_export_groupProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const bulk_export_groupProjectsLocationsDatasetsFhirStores: API.OperationMethod<Bulk_export_groupProjectsLocationsDatasetsFhirStoresRequest, Bulk_export_groupProjectsLocationsDatasetsFhirStoresResponse, Bulk_export_groupProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Bulk_export_groupProjectsLocationsDatasetsFhirStoresRequest,
  output: Bulk_export_groupProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsDatasetsFhirStoresRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDatasetsFhirStoresRequest>;

export type TestIamPermissionsProjectsLocationsDatasetsFhirStoresResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDatasetsFhirStoresResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const testIamPermissionsProjectsLocationsDatasetsFhirStores: API.OperationMethod<TestIamPermissionsProjectsLocationsDatasetsFhirStoresRequest, TestIamPermissionsProjectsLocationsDatasetsFhirStoresResponse, TestIamPermissionsProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDatasetsFhirStoresRequest,
  output: TestIamPermissionsProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Lists the FHIR stores in the given dataset. */
export interface ListProjectsLocationsDatasetsFhirStoresRequest {
  /** Limit on the number of FHIR stores to return in a single response. If not specified, 100 is used. May not be larger than 1000. */
  pageSize?: number;
  /** Required. Name of the dataset. */
  parent: string;
  /** Restricts stores returned to those matching a filter. The following syntax is available: * A string field value can be written as text inside quotation marks, for example `"query text"`. The only valid relational operation for text fields is equality (`=`), where text is searched within the field, rather than having the field be equal to the text. For example, `"Comment = great"` returns messages with `great` in the comment field. * A number field value can be written as an integer, a decimal, or an exponential. The valid relational operators for number fields are the equality operator (`=`), along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * A date field value must be written in `yyyy-mm-dd` form. Fields with date and time use the RFC3339 time format. Leading zeros are required for one-digit months and days. The valid relational operators for date fields are the equality operator (`=`) , along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * Multiple field query expressions can be combined in one query by adding `AND` or `OR` operators between the expressions. If a boolean operator appears within a quoted string, it is not treated as special, it's just another part of the character string to be matched. You can prepend the `NOT` operator to an expression to negate it. Only filtering on labels is supported, for example `labels.key=value`. */
  filter?: string;
  /** The next_page_token value returned from the previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDatasetsFhirStoresRequest>;

export type ListProjectsLocationsDatasetsFhirStoresResponse = ListFhirStoresResponse;
export const ListProjectsLocationsDatasetsFhirStoresResponse = ListFhirStoresResponse;

export type ListProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const listProjectsLocationsDatasetsFhirStores = API.makePaginated(() => ({
  input: ListProjectsLocationsDatasetsFhirStoresRequest,
  output: ListProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes the specified FHIR store and removes all resources within it. */
export interface DeleteProjectsLocationsDatasetsFhirStoresRequest {
  /** Required. The resource name of the FHIR store to delete. */
  name: string;
}

export const DeleteProjectsLocationsDatasetsFhirStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatasetsFhirStoresRequest>;

export type DeleteProjectsLocationsDatasetsFhirStoresResponse = Empty;
export const DeleteProjectsLocationsDatasetsFhirStoresResponse = Empty;

export type DeleteProjectsLocationsDatasetsFhirStoresError = CommonErrors;

export const deleteProjectsLocationsDatasetsFhirStores: API.OperationMethod<DeleteProjectsLocationsDatasetsFhirStoresRequest, DeleteProjectsLocationsDatasetsFhirStoresResponse, DeleteProjectsLocationsDatasetsFhirStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatasetsFhirStoresRequest,
  output: DeleteProjectsLocationsDatasetsFhirStoresResponse,
  errors: [],
}));

/** Deletes operations as defined in the FHIR specification. Implements the FHIR implementation guide [bulk data delete request](https://build.fhir.org/ig/HL7/bulk-data/export.html#bulk-data-delete-request). Returns success if the operation was successfully cancelled. If the operation is complete, or has already been cancelled, returns an error response. */
export interface Delete_fhir_operationProjectsLocationsDatasetsFhirStoresOperationsRequest {
  /** Required. Name of the operation to be deleted, in the format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/operations/{operation_id}`. */
  name: string;
}

export const Delete_fhir_operationProjectsLocationsDatasetsFhirStoresOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<Delete_fhir_operationProjectsLocationsDatasetsFhirStoresOperationsRequest>;

export type Delete_fhir_operationProjectsLocationsDatasetsFhirStoresOperationsResponse = HttpBody;
export const Delete_fhir_operationProjectsLocationsDatasetsFhirStoresOperationsResponse = HttpBody;

export type Delete_fhir_operationProjectsLocationsDatasetsFhirStoresOperationsError = CommonErrors;

export const delete_fhir_operationProjectsLocationsDatasetsFhirStoresOperations: API.OperationMethod<Delete_fhir_operationProjectsLocationsDatasetsFhirStoresOperationsRequest, Delete_fhir_operationProjectsLocationsDatasetsFhirStoresOperationsResponse, Delete_fhir_operationProjectsLocationsDatasetsFhirStoresOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Delete_fhir_operationProjectsLocationsDatasetsFhirStoresOperationsRequest,
  output: Delete_fhir_operationProjectsLocationsDatasetsFhirStoresOperationsResponse,
  errors: [],
}));

/** Gets the status of operations as defined in the FHIR specification. Implements the FHIR implementation guide [bulk data status request](https://build.fhir.org/ig/HL7/bulk-data/export.html#bulk-data-status-request). Operations can have one of these states: * in-progress: response status code is `202` and `X-Progress` header is set to `in progress`. * complete: response status code is `200` and the body is a JSON-encoded operation response as defined by the spec. For a bulk export, this response is defined in https://build.fhir.org/ig/HL7/bulk-data/export.html#response---complete-status. * error: response status code is `5XX`, and the body is a JSON-encoded `OperationOutcome` resource describing the reason for the error. */
export interface Get_fhir_operation_statusProjectsLocationsDatasetsFhirStoresOperationsRequest {
  /** Required. Name of the operation to query, in the format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/operations/{operation_id}`. */
  name: string;
}

export const Get_fhir_operation_statusProjectsLocationsDatasetsFhirStoresOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<Get_fhir_operation_statusProjectsLocationsDatasetsFhirStoresOperationsRequest>;

export type Get_fhir_operation_statusProjectsLocationsDatasetsFhirStoresOperationsResponse = HttpBody;
export const Get_fhir_operation_statusProjectsLocationsDatasetsFhirStoresOperationsResponse = HttpBody;

export type Get_fhir_operation_statusProjectsLocationsDatasetsFhirStoresOperationsError = CommonErrors;

export const get_fhir_operation_statusProjectsLocationsDatasetsFhirStoresOperations: API.OperationMethod<Get_fhir_operation_statusProjectsLocationsDatasetsFhirStoresOperationsRequest, Get_fhir_operation_statusProjectsLocationsDatasetsFhirStoresOperationsResponse, Get_fhir_operation_statusProjectsLocationsDatasetsFhirStoresOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Get_fhir_operation_statusProjectsLocationsDatasetsFhirStoresOperationsRequest,
  output: Get_fhir_operation_statusProjectsLocationsDatasetsFhirStoresOperationsResponse,
  errors: [],
}));

/** Creates a FHIR Binary resource. This method can be used to create a Binary resource either by using one of the accepted FHIR JSON content types, or as a raw data stream. If a resource is created with this method using the FHIR content type this method's behavior is the same as [`fhir.create`](https://cloud.google.com/healthcare-api/docs/reference/rest/v1/projects.locations.datasets.fhirStores.fhir/create). If a resource type other than Binary is used in the request it's treated in the same way as non-FHIR data (e.g., images, zip archives, pdf files, documents). When a non-FHIR content type is used in the request, a Binary resource will be generated, and the uploaded data will be stored in the `content` field (`DSTU2` and `STU3`), or the `data` field (`R4` and `R5`). The Binary resource's `contentType` will be filled in using the value of the `Content-Type` header, and the `securityContext` field (not present in `DSTU2`) will be populated from the `X-Security-Context` header if it exists. At this time `securityContext` has no special behavior in the Cloud Healthcare API. Note: the limit on data ingested through this method is 1 GB. For best performance, use a non-FHIR data type instead of wrapping the data in a Binary resource. Some of the Healthcare API features, such as [exporting to BigQuery](https://cloud.google.com/healthcare-api/docs/how-tos/fhir-export-bigquery) or [Pub/Sub notifications](https://cloud.google.com/healthcare-api/docs/fhir-pubsub#behavior_when_a_fhir_resource_is_too_large_or_traffic_is_high) with full resource content, do not support Binary resources that are larger than 10 MB. In these cases the resource's `data` field will be omitted. Instead, the "http://hl7.org/fhir/StructureDefinition/data-absent-reason" extension will be present to indicate that including the data is `unsupported`. On success, an empty `201 Created` response is returned. The newly created resource's ID and version are returned in the Location header. Using `Prefer: representation=resource` is not allowed for this method. The definition of the Binary REST API can be found at https://hl7.org/fhir/binary.html#rest. */
export interface Binary_createProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the FHIR store this resource belongs to. */
  parent: string;
  /** Request body */
  body?: HttpBody;
}

export const Binary_createProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(HttpBody).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/Binary", hasBody: true }),
  svc,
) as unknown as Schema.Schema<Binary_createProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type Binary_createProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const Binary_createProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type Binary_createProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const Binary_createProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<Binary_createProjectsLocationsDatasetsFhirStoresFhirRequest, Binary_createProjectsLocationsDatasetsFhirStoresFhirResponse, Binary_createProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Binary_createProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: Binary_createProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Gets the contents of a FHIR Binary resource. This method can be used to retrieve a Binary resource either by using the FHIR JSON mimetype as the value for the Accept header, or as a raw data stream. If the FHIR Accept type is used this method will return a Binary resource with the data base64-encoded, regardless of how the resource was created. The resource data can be retrieved in base64-decoded form if the Accept type of the request matches the value of the resource's `contentType` field. The definition of the Binary REST API can be found at https://hl7.org/fhir/binary.html#rest. */
export interface Binary_readProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the Binary resource to retrieve. */
  name: string;
}

export const Binary_readProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/Binary/{BinaryId}" }),
  svc,
) as unknown as Schema.Schema<Binary_readProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type Binary_readProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const Binary_readProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type Binary_readProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const Binary_readProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<Binary_readProjectsLocationsDatasetsFhirStoresFhirRequest, Binary_readProjectsLocationsDatasetsFhirStoresFhirResponse, Binary_readProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Binary_readProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: Binary_readProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Bulk exports all resources from the FHIR store to the specified destination. Implements the FHIR implementation guide [system level $export](https://build.fhir.org/ig/HL7/bulk-data/export.html#endpoint---system-level-export). The following headers must be set in the request: * `Accept`: specifies the format of the `OperationOutcome` response. Only `application/fhir+json` is supported. * `Prefer`: specifies whether the response is immediate or asynchronous. Must be to `respond-async` because only asynchronous responses are supported. Specify the destination for the server to write result files by setting the Cloud Storage location bulk_export_gcs_destination on the FHIR store. URI of an existing Cloud Storage directory where the server writes result files, in the format gs://{bucket-id}/{path/to/destination/dir}. If there is no trailing slash, the service appends one when composing the object path. The user is responsible for creating the Cloud Storage bucket referenced. Supports the following query parameters: * `_type`: string of comma-delimited FHIR resource types. If provided, only the resources of the specified type(s) are exported. * `_since`: if provided, only the resources that are updated after the specified time are exported. * `_outputFormat`: optional, specify ndjson to export data in NDJSON format. Exported file names use the format: {export_id}_{resource_type}.ndjson. On success, the `Content-Location` header of the response is set to a URL that the user can use to query the status of the export. The URL is in the format: `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/operations/{export_id}`. See get-fhir-operation-status for more information. Errors generated by the FHIR store contain a JSON-encoded `OperationOutcome` resource describing the reason for the error. */
export interface Bulk_exportProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Optional. String of comma-delimited FHIR resource types. If provided, only resources of the specified resource type(s) are exported. */
  _type?: string;
  /** Required. The name of the FHIR store to export resources from, in the format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}`. */
  name: string;
  /** Optional. Output format of the export. This field is optional and only `application/fhir+ndjson` is supported. */
  outputFormat?: string;
  /** Optional. If provided, only resources updated after this time are exported. The time uses the format YYYY-MM-DDThh:mm:ss.sss+zz:zz. For example, `2015-02-07T13:28:17.239+02:00` or `2017-01-01T00:00:00Z`. The time must be specified to the second and include a time zone. */
  _since?: string;
}

export const Bulk_exportProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  _type: Schema.optional(Schema.String).pipe(T.HttpQuery("_type")),
  name: Schema.String.pipe(T.HttpPath("name")),
  outputFormat: Schema.optional(Schema.String).pipe(T.HttpQuery("outputFormat")),
  _since: Schema.optional(Schema.String).pipe(T.HttpQuery("_since")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/$export" }),
  svc,
) as unknown as Schema.Schema<Bulk_exportProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type Bulk_exportProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const Bulk_exportProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type Bulk_exportProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const bulk_exportProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<Bulk_exportProjectsLocationsDatasetsFhirStoresFhirRequest, Bulk_exportProjectsLocationsDatasetsFhirStoresFhirResponse, Bulk_exportProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Bulk_exportProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: Bulk_exportProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** If a resource is found with the identifier specified in the query parameters, updates part of that resource by applying the operations specified in a [JSON Patch](http://jsonpatch.com/) document. Implements the FHIR standard conditional patch interaction, limited to searching by resource identifier. DSTU2 doesn't define a conditional patch method, but the server supports it in the same way it supports STU3. Search term for identifier should be in the pattern `identifier=system|value` or `identifier=value` - similar to the `search` method on resources with a specific identifier. If the search criteria identify more than one match, the request returns a `412 Precondition Failed` error. If the search criteria doesn't identify any matches, the request returns a `404 Not Found` error. The request body must contain a JSON Patch document, and the request headers must contain `Content-Type: application/json-patch+json`. On success, the response body contains a JSON-encoded representation of the updated resource, including the server-assigned version ID. Errors generated by the FHIR store contain a JSON-encoded `OperationOutcome` resource describing the reason for the error. If the request cannot be mapped to a valid API method on a FHIR store, a generic GCP error might be returned instead. For samples that show how to call `conditionalPatch`, see [Conditionally patching a FHIR resource](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#conditionally_patching_a_fhir_resource). */
export interface ConditionalPatchProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the FHIR store this resource belongs to. */
  parent: string;
  /** Required. The FHIR resource type to update, such as Patient or Observation. For a complete list, see the FHIR Resource Index ([DSTU2](https://hl7.org/fhir/DSTU2/resourcelist.html), [STU3](https://hl7.org/fhir/STU3/resourcelist.html), [R4](https://hl7.org/fhir/R4/resourcelist.html), [R5](https://hl7.org/fhir/R5/resourcelist.html)). */
  type: string;
  /** Request body */
  body?: HttpBody;
}

export const ConditionalPatchProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  type: Schema.String.pipe(T.HttpPath("type")),
  body: Schema.optional(HttpBody).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/{fhirId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ConditionalPatchProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type ConditionalPatchProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const ConditionalPatchProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type ConditionalPatchProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const conditionalPatchProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<ConditionalPatchProjectsLocationsDatasetsFhirStoresFhirRequest, ConditionalPatchProjectsLocationsDatasetsFhirStoresFhirResponse, ConditionalPatchProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ConditionalPatchProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: ConditionalPatchProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Gets the FHIR capability statement ([STU3](https://hl7.org/fhir/STU3/capabilitystatement.html), [R4](https://hl7.org/fhir/R4/capabilitystatement.html), [R5](https://hl7.org/fhir/R5/capabilitystatement.html)), or the [conformance statement](https://hl7.org/fhir/DSTU2/conformance.html) in the DSTU2 case for the store, which contains a description of functionality supported by the server. Implements the FHIR standard capabilities interaction ([STU3](https://hl7.org/fhir/STU3/http.html#capabilities), [R4](https://hl7.org/fhir/R4/http.html#capabilities), [R5](https://hl7.org/fhir/R5/http.html#capabilities)), or the [conformance interaction](https://hl7.org/fhir/DSTU2/http.html#conformance) in the DSTU2 case. On success, the response body contains a JSON-encoded representation of a `CapabilityStatement` resource. */
export interface CapabilitiesProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. Name of the FHIR store to retrieve the capabilities for. */
  name: string;
}

export const CapabilitiesProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/metadata" }),
  svc,
) as unknown as Schema.Schema<CapabilitiesProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type CapabilitiesProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const CapabilitiesProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type CapabilitiesProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const capabilitiesProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<CapabilitiesProjectsLocationsDatasetsFhirStoresFhirRequest, CapabilitiesProjectsLocationsDatasetsFhirStoresFhirResponse, CapabilitiesProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CapabilitiesProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: CapabilitiesProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Gets the contents of a version (current or historical) of a FHIR Binary resource by version ID. This method can be used to retrieve a Binary resource version either by using the FHIR JSON mimetype as the value for the Accept header, or as a raw data stream. If the FHIR Accept type is used this method will return a Binary resource with the data base64-encoded, regardless of how the resource version was created. The resource data can be retrieved in base64-decoded form if the Accept type of the request matches the value of the resource version's `contentType` field. The definition of the Binary REST API can be found at https://hl7.org/fhir/binary.html#rest. */
export interface Binary_vreadProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the Binary resource version to retrieve. */
  name: string;
}

export const Binary_vreadProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/Binary/{BinaryId}/_history/{_historyId}" }),
  svc,
) as unknown as Schema.Schema<Binary_vreadProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type Binary_vreadProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const Binary_vreadProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type Binary_vreadProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const Binary_vreadProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<Binary_vreadProjectsLocationsDatasetsFhirStoresFhirRequest, Binary_vreadProjectsLocationsDatasetsFhirStoresFhirResponse, Binary_vreadProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Binary_vreadProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: Binary_vreadProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Searches for resources in the given FHIR store according to criteria specified as query parameters. Implements the FHIR standard search interaction ([DSTU2](https://hl7.org/fhir/DSTU2/http.html#search), [STU3](https://hl7.org/fhir/STU3/http.html#search), [R4](https://hl7.org/fhir/R4/http.html#search), [R5](https://hl7.org/fhir/R5/http.html#search)) using the search semantics described in the FHIR Search specification ([DSTU2](https://hl7.org/fhir/DSTU2/search.html), [STU3](https://hl7.org/fhir/STU3/search.html), [R4](https://hl7.org/fhir/R4/search.html), [R5](https://hl7.org/fhir/R5/search.html)). Supports four methods of search defined by the specification: * `GET [base]?[parameters]` to search across all resources. * `GET [base]/[type]?[parameters]` to search resources of a specified type. * `POST [base]/_search?[parameters]` as an alternate form having the same semantics as the `GET` method across all resources. * `POST [base]/[type]/_search?[parameters]` as an alternate form having the same semantics as the `GET` method for the specified type. The `GET` and `POST` methods do not support compartment searches. The `POST` method does not support `application/x-www-form-urlencoded` search parameters. On success, the response body contains a JSON-encoded representation of a `Bundle` resource of type `searchset`, containing the results of the search. Errors generated by the FHIR store contain a JSON-encoded `OperationOutcome` resource describing the reason for the error. If the request cannot be mapped to a valid API method on a FHIR store, a generic GCP error might be returned instead. The server's capability statement, retrieved through capabilities, indicates what search parameters are supported on each FHIR resource. A list of all search parameters defined by the specification can be found in the FHIR Search Parameter Registry ([STU3](https://hl7.org/fhir/STU3/searchparameter-registry.html), [R4](https://hl7.org/fhir/R4/searchparameter-registry.html), [R5](https://hl7.org/fhir/R5/searchparameter-registry.html)). FHIR search parameters for DSTU2 can be found on each resource's definition page. Supported search modifiers: `:missing`, `:exact`, `:contains`, `:text`, `:in`, `:not-in`, `:above`, `:below`, `:[type]`, `:not`, and `recurse` (DSTU2 and STU3) or `:iterate` (R4 and R5). Supported search result parameters: `_sort`, `_count`, `_include`, `_revinclude`, `_summary=text`, `_summary=data`, and `_elements`. The maximum number of search results returned defaults to 100, which can be overridden by the `_count` parameter up to a maximum limit of 1000. The server might return fewer resources than requested to prevent excessively large responses. If there are additional results, the returned `Bundle` contains a link of `relation` "next", which has a `_page_token` parameter for an opaque pagination token that can be used to retrieve the next page. Resources with a total size larger than 5MB or a field count larger than 50,000 might not be fully searchable as the server might trim its generated search index in those cases. Note: FHIR resources are indexed asynchronously, so there might be a slight delay between the time a resource is created or changed, and the time when the change reflects in search results. The only exception is resource identifier data, which is indexed synchronously as a special index. As a result, searching using resource identifier is not subject to indexing delay. To use the special synchronous index, the search term for identifier should be in the pattern `identifier=[system]|[value]` or `identifier=[value]`, and any of the following search result parameters can be used: * `_count` * `_include` * `_revinclude` * `_summary` * `_elements` If your query contains any other search parameters, the standard asynchronous index will be used instead. Note that searching against the special index is optimized for resolving a small number of matches. The search isn't optimized if your identifier search criteria matches a large number (i.e. more than 2,000) of resources. For a search query that will match a large number of resources, you can avoiding using the special synchronous index by including an additional `_sort` parameter in your query. Use `_sort=-_lastUpdated` if you want to keep the default sorting order. For samples and detailed information, see [Searching for FHIR resources](https://cloud.google.com/healthcare/docs/how-tos/fhir-search) and [Advanced FHIR search features](https://cloud.google.com/healthcare/docs/how-tos/fhir-advanced-search). */
export interface Search_typeProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. Name of the FHIR store to retrieve resources from. */
  parent: string;
  /** Optional. The FHIR resource type to search, such as Patient or Observation. For a complete list, see the FHIR Resource Index ([DSTU2](https://hl7.org/fhir/DSTU2/resourcelist.html), [STU3](https://hl7.org/fhir/STU3/resourcelist.html), [R4](https://hl7.org/fhir/R4/resourcelist.html)), [R5](https://hl7.org/fhir/R5/resourcelist.html)). */
  resourceType: string;
  /** Request body */
  body?: HttpBody;
}

export const Search_typeProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  resourceType: Schema.String.pipe(T.HttpPath("resourceType")),
  body: Schema.optional(HttpBody).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/{resourceType}/_search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<Search_typeProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type Search_typeProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const Search_typeProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type Search_typeProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const search_typeProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<Search_typeProjectsLocationsDatasetsFhirStoresFhirRequest, Search_typeProjectsLocationsDatasetsFhirStoresFhirResponse, Search_typeProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Search_typeProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: Search_typeProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Gets the contents of a FHIR resource. Implements the FHIR standard read interaction ([DSTU2](https://hl7.org/fhir/DSTU2/http.html#read), [STU3](https://hl7.org/fhir/STU3/http.html#read), [R4](https://hl7.org/fhir/R4/http.html#read), [R5](https://hl7.org/fhir/R5/http.html#read)). Also supports the FHIR standard conditional read interaction ([DSTU2](https://hl7.org/fhir/DSTU2/http.html#cread), [STU3](https://hl7.org/fhir/STU3/http.html#cread), [R4](https://hl7.org/fhir/R4/http.html#cread), [R5](https://hl7.org/fhir/R5/http.html#cread)) specified by supplying an `If-Modified-Since` header with a date/time value or an `If-None-Match` header with an ETag value. On success, the response body contains a JSON-encoded representation of the resource. Errors generated by the FHIR store contain a JSON-encoded `OperationOutcome` resource describing the reason for the error. If the request cannot be mapped to a valid API method on a FHIR store, a generic GCP error might be returned instead. For samples that show how to call `read`, see [Getting a FHIR resource](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#getting_a_fhir_resource). */
export interface ReadProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the resource to retrieve. */
  name: string;
}

export const ReadProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/{fhirId}/{fhirId1}" }),
  svc,
) as unknown as Schema.Schema<ReadProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type ReadProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const ReadProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type ReadProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const readProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<ReadProjectsLocationsDatasetsFhirStoresFhirRequest, ReadProjectsLocationsDatasetsFhirStoresFhirResponse, ReadProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReadProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: ReadProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Updates part of an existing resource by applying the operations specified in a [JSON Patch](http://jsonpatch.com/) document. Implements the FHIR standard patch interaction ([STU3](https://hl7.org/fhir/STU3/http.html#patch), [R4](https://hl7.org/fhir/R4/http.html#patch), [R5](https://hl7.org/fhir/R5/http.html#patch)). DSTU2 doesn't define a patch method, but the server supports it in the same way it supports STU3. The request body must contain a JSON Patch document, and the request headers must contain `Content-Type: application/json-patch+json`. On success, the response body contains a JSON-encoded representation of the updated resource, including the server-assigned version ID. Errors generated by the FHIR store contain a JSON-encoded `OperationOutcome` resource describing the reason for the error. If the request cannot be mapped to a valid API method on a FHIR store, a generic GCP error might be returned instead. For samples that show how to call `patch`, see [Patching a FHIR resource](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#patching_a_fhir_resource). */
export interface PatchProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the resource to update. */
  name: string;
  /** Request body */
  body?: HttpBody;
}

export const PatchProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(HttpBody).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/{fhirId}/{fhirId1}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type PatchProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const PatchProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type PatchProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const patchProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<PatchProjectsLocationsDatasetsFhirStoresFhirRequest, PatchProjectsLocationsDatasetsFhirStoresFhirResponse, PatchProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: PatchProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Retrieves a Patient resource and resources related to that patient. Implements the FHIR extended operation Patient-everything ([DSTU2](https://hl7.org/fhir/DSTU2/patient-operations.html#everything), [STU3](https://hl7.org/fhir/STU3/patient-operations.html#everything), [R4](https://hl7.org/fhir/R4/patient-operation-everything.html), [R5](https://hl7.org/fhir/R5/patient-operation-everything.html)). On success, the response body contains a JSON-encoded representation of a `Bundle` resource of type `searchset`, containing the results of the operation. Errors generated by the FHIR store contain a JSON-encoded `OperationOutcome` resource describing the reason for the error. If the request cannot be mapped to a valid API method on a FHIR store, a generic GCP error might be returned instead. The resources in scope for the response are: * The patient resource itself. * All the resources directly referenced by the patient resource. * Resources directly referencing the patient resource that meet the inclusion criteria. The inclusion criteria are based on the membership rules in the patient compartment definition ([DSTU2](http://hl7.org/fhir/DSTU2/compartment-patient.html), [STU3](http://www.hl7.org/fhir/stu3/compartmentdefinition-patient.html), [R4](http://hl7.org/fhir/R4/compartmentdefinition-patient.html), [R5](http://hl7.org/fhir/R5/compartmentdefinition-patient.html)), which details the eligible resource types and referencing search parameters. For samples that show how to call `Patient-everything`, see [Getting all patient compartment resources](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#getting_all_patient_compartment_resources). */
export interface Patient_everythingProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Optional. The response includes records prior to the end date. The date uses the format YYYY-MM-DD. If no end date is provided, all records subsequent to the start date are in scope. */
  end?: string;
  /** Used to retrieve the next or previous page of results when using pagination. Set `_page_token` to the value of _page_token set in next or previous page links' url. Next and previous page are returned in the response bundle's links field, where `link.relation` is "previous" or "next". Omit `_page_token` if no previous request has been made. */
  _page_token?: string;
  /** Optional. If provided, only resources updated after this time are returned. The time uses the format YYYY-MM-DDThh:mm:ss.sss+zz:zz. For example, `2015-02-07T13:28:17.239+02:00` or `2017-01-01T00:00:00Z`. The time must be specified to the second and include a time zone. */
  _since?: string;
  /** Optional. Maximum number of resources in a page. If not specified, 100 is used. May not be larger than 1000. */
  _count?: number;
  /** Optional. String of comma-delimited FHIR resource types. If provided, only resources of the specified resource type(s) are returned. Specifying multiple `_type` parameters isn't supported. For example, the result of `_type=Observation&_type=Encounter` is undefined. Use `_type=Observation,Encounter` instead. */
  _type?: string;
  /** Optional. The response includes records subsequent to the start date. The date uses the format YYYY-MM-DD. If no start date is provided, all records prior to the end date are in scope. */
  start?: string;
  /** Required. Name of the `Patient` resource for which the information is required. */
  name: string;
}

export const Patient_everythingProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  end: Schema.optional(Schema.String).pipe(T.HttpQuery("end")),
  _page_token: Schema.optional(Schema.String).pipe(T.HttpQuery("_page_token")),
  _since: Schema.optional(Schema.String).pipe(T.HttpQuery("_since")),
  _count: Schema.optional(Schema.Number).pipe(T.HttpQuery("_count")),
  _type: Schema.optional(Schema.String).pipe(T.HttpQuery("_type")),
  start: Schema.optional(Schema.String).pipe(T.HttpQuery("start")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/Patient/{PatientId}/$everything" }),
  svc,
) as unknown as Schema.Schema<Patient_everythingProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type Patient_everythingProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const Patient_everythingProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type Patient_everythingProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const Patient_everythingProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<Patient_everythingProjectsLocationsDatasetsFhirStoresFhirRequest, Patient_everythingProjectsLocationsDatasetsFhirStoresFhirResponse, Patient_everythingProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Patient_everythingProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: Patient_everythingProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Lists all the versions of a resource (including the current version and deleted versions) from the FHIR store. Implements the per-resource form of the FHIR standard history interaction ([DSTU2](https://hl7.org/fhir/DSTU2/http.html#history), [STU3](https://hl7.org/fhir/STU3/http.html#history), [R4](https://hl7.org/fhir/R4/http.html#history), [R5](https://hl7.org/fhir/R5/http.html#history)). On success, the response body contains a JSON-encoded representation of a `Bundle` resource of type `history`, containing the version history sorted from most recent to oldest versions. Errors generated by the FHIR store contain a JSON-encoded `OperationOutcome` resource describing the reason for the error. If the request cannot be mapped to a valid API method on a FHIR store, a generic GCP error might be returned instead. For samples that show how to call `history`, see [Listing FHIR resource versions](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#listing_fhir_resource_versions). */
export interface HistoryProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Only include resource versions that were current at some point during the time period specified in the date time value. The date parameter format is yyyy-mm-ddThh:mm:ss[Z|(+|-)hh:mm] Clients may specify any of the following: * An entire year: `_at=2019` * An entire month: `_at=2019-01` * A specific day: `_at=2019-01-20` * A specific second: `_at=2018-12-31T23:59:58Z` */
  _at?: string;
  /** Used to retrieve the first, previous, next, or last page of resource versions when using pagination. Value should be set to the value of `_page_token` set in next or previous page links' URLs. Next and previous page are returned in the response bundle's links field, where `link.relation` is "previous" or "next". Omit `_page_token` if no previous request has been made. */
  _page_token?: string;
  /** Only include resource versions that were created at or after the given instant in time. The instant in time uses the format YYYY-MM-DDThh:mm:ss.sss+zz:zz (for example 2015-02-07T13:28:17.239+02:00 or 2017-01-01T00:00:00Z). The time must be specified to the second and include a time zone. */
  _since?: string;
  /** Required. The name of the resource to retrieve. */
  name: string;
  /** The maximum number of search results on a page. If not specified, 100 is used. May not be larger than 1000. */
  _count?: number;
}

export const HistoryProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  _at: Schema.optional(Schema.String).pipe(T.HttpQuery("_at")),
  _page_token: Schema.optional(Schema.String).pipe(T.HttpQuery("_page_token")),
  _since: Schema.optional(Schema.String).pipe(T.HttpQuery("_since")),
  name: Schema.String.pipe(T.HttpPath("name")),
  _count: Schema.optional(Schema.Number).pipe(T.HttpQuery("_count")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/{fhirId}/{fhirId1}/_history" }),
  svc,
) as unknown as Schema.Schema<HistoryProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type HistoryProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const HistoryProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type HistoryProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const historyProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<HistoryProjectsLocationsDatasetsFhirStoresFhirRequest, HistoryProjectsLocationsDatasetsFhirStoresFhirResponse, HistoryProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: HistoryProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: HistoryProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Updates the entire contents of a resource. Implements the FHIR standard update interaction ([DSTU2](https://hl7.org/fhir/DSTU2/http.html#update), [STU3](https://hl7.org/fhir/STU3/http.html#update), [R4](https://hl7.org/fhir/R4/http.html#update), [R5](https://hl7.org/fhir/R5/http.html#update)). If the specified resource does not exist and the FHIR store has enable_update_create set, creates the resource with the client-specified ID. It is strongly advised not to include or encode any sensitive data such as patient identifiers in client-specified resource IDs. Those IDs are part of the FHIR resource path recorded in Cloud Audit Logs and Pub/Sub notifications. Those IDs can also be contained in reference fields within other resources. The request body must contain a JSON-encoded FHIR resource, and the request headers must contain `Content-Type: application/fhir+json`. The resource must contain an `id` element having an identical value to the ID in the REST path of the request. On success, the response body contains a JSON-encoded representation of the updated resource, including the server-assigned version ID. Errors generated by the FHIR store contain a JSON-encoded `OperationOutcome` resource describing the reason for the error. If the request cannot be mapped to a valid API method on a FHIR store, a generic GCP error might be returned instead. The conditional update interaction If-None-Match is supported, including the wildcard behaviour, as defined by the R5 spec. This functionality is supported in R4 and R5. For samples that show how to call `update`, see [Updating a FHIR resource](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#updating_a_fhir_resource). */
export interface UpdateProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the resource to update. */
  name: string;
  /** Request body */
  body?: HttpBody;
}

export const UpdateProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(HttpBody).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/{fhirId}/{fhirId1}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type UpdateProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const UpdateProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type UpdateProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const updateProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<UpdateProjectsLocationsDatasetsFhirStoresFhirRequest, UpdateProjectsLocationsDatasetsFhirStoresFhirResponse, UpdateProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: UpdateProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Creates a FHIR resource. Implements the FHIR standard create interaction ([DSTU2](https://hl7.org/fhir/DSTU2/http.html#create), [STU3](https://hl7.org/fhir/STU3/http.html#create), [R4](https://hl7.org/fhir/R4/http.html#create), [R5](https://hl7.org/fhir/R5/http.html#create)), which creates a new resource with a server-assigned resource ID. Also supports the FHIR standard conditional create interaction ([DSTU2](https://hl7.org/fhir/DSTU2/http.html#ccreate), [STU3](https://hl7.org/fhir/STU3/http.html#ccreate), [R4](https://hl7.org/fhir/R4/http.html#ccreate), [R5](https://hl7.org/fhir/R5/http.html#ccreate)), specified by supplying an `If-None-Exist` header containing a FHIR search query, limited to searching by resource identifier. If no resources match this search query, the server processes the create operation as normal. When using conditional create, the search term for identifier should be in the pattern `identifier=system|value` or `identifier=value` - similar to the `search` method on resources with a specific identifier. The request body must contain a JSON-encoded FHIR resource, and the request headers must contain `Content-Type: application/fhir+json`. On success, the response body contains a JSON-encoded representation of the resource as it was created on the server, including the server-assigned resource ID and version ID. Errors generated by the FHIR store contain a JSON-encoded `OperationOutcome` resource describing the reason for the error. If the request cannot be mapped to a valid API method on a FHIR store, a generic GCP error might be returned instead. For samples that show how to call `create`, see [Creating a FHIR resource](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#creating_a_fhir_resource). */
export interface CreateProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the FHIR store this resource belongs to. */
  parent: string;
  /** Required. The FHIR resource type to create, such as Patient or Observation. For a complete list, see the FHIR Resource Index ([DSTU2](https://hl7.org/fhir/DSTU2/resourcelist.html), [STU3](https://hl7.org/fhir/STU3/resourcelist.html), [R4](https://hl7.org/fhir/R4/resourcelist.html), [R5](https://hl7.org/fhir/R5/resourcelist.html)). Must match the resource type in the provided content. */
  type: string;
  /** Request body */
  body?: HttpBody;
}

export const CreateProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  type: Schema.String.pipe(T.HttpPath("type")),
  body: Schema.optional(HttpBody).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/{fhirId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type CreateProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const CreateProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type CreateProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const createProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<CreateProjectsLocationsDatasetsFhirStoresFhirRequest, CreateProjectsLocationsDatasetsFhirStoresFhirResponse, CreateProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: CreateProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Deletes a FHIR resource that match an identifier search query. Implements the FHIR standard conditional delete interaction, limited to searching by resource identifier. If multiple resources match, 412 Precondition Failed error will be returned. Search term for identifier should be in the pattern `identifier=system|value` or `identifier=value` - similar to the `search` method on resources with a specific identifier. Note: Unless resource versioning is disabled by setting the disable_resource_versioning flag on the FHIR store, the deleted resource is moved to a history repository that can still be retrieved through vread and related methods, unless they are removed by the purge method. For samples that show how to call `conditionalDelete`, see [Conditionally deleting a FHIR resource](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#conditionally_deleting_a_fhir_resource). */
export interface ConditionalDeleteProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the FHIR store this resource belongs to. */
  parent: string;
  /** Required. The FHIR resource type to delete, such as Patient or Observation. For a complete list, see the FHIR Resource Index ([DSTU2](https://hl7.org/fhir/DSTU2/resourcelist.html), [STU3](https://hl7.org/fhir/STU3/resourcelist.html), [R4](https://hl7.org/fhir/R4/resourcelist.html), [R5](https://hl7.org/fhir/R5/resourcelist.html)). */
  type: string;
}

export const ConditionalDeleteProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  type: Schema.String.pipe(T.HttpPath("type")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/{fhirId}" }),
  svc,
) as unknown as Schema.Schema<ConditionalDeleteProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type ConditionalDeleteProjectsLocationsDatasetsFhirStoresFhirResponse = Empty;
export const ConditionalDeleteProjectsLocationsDatasetsFhirStoresFhirResponse = Empty;

export type ConditionalDeleteProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const conditionalDeleteProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<ConditionalDeleteProjectsLocationsDatasetsFhirStoresFhirRequest, ConditionalDeleteProjectsLocationsDatasetsFhirStoresFhirResponse, ConditionalDeleteProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ConditionalDeleteProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: ConditionalDeleteProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Gets the contents of a version (current or historical) of a FHIR resource by version ID. Implements the FHIR standard vread interaction ([DSTU2](https://hl7.org/fhir/DSTU2/http.html#vread), [STU3](https://hl7.org/fhir/STU3/http.html#vread), [R4](https://hl7.org/fhir/R4/http.html#vread), [R5](https://hl7.org/fhir/R5/http.html#vread)). On success, the response body contains a JSON-encoded representation of the resource. Errors generated by the FHIR store contain a JSON-encoded `OperationOutcome` resource describing the reason for the error. If the request cannot be mapped to a valid API method on a FHIR store, a generic GCP error might be returned instead. For samples that show how to call `vread`, see [Retrieving a FHIR resource version](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#retrieving_a_fhir_resource_version). */
export interface VreadProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the resource version to retrieve. */
  name: string;
}

export const VreadProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/{fhirId}/{fhirId1}/_history/{_historyId}" }),
  svc,
) as unknown as Schema.Schema<VreadProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type VreadProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const VreadProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type VreadProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const vreadProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<VreadProjectsLocationsDatasetsFhirStoresFhirRequest, VreadProjectsLocationsDatasetsFhirStoresFhirResponse, VreadProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: VreadProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: VreadProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** If a resource is found with the identifier specified in the query parameters, updates the entire contents of that resource. Implements the FHIR standard conditional update interaction, limited to searching by resource identifier. Search term for identifier should be in the pattern `identifier=system|value` or `identifier=value` - similar to the `search` method on resources with a specific identifier. If the search criteria identify more than one match, the request returns a `412 Precondition Failed` error. If the search criteria identify zero matches, and the supplied resource body contains an `id`, and the FHIR store has enable_update_create set, creates the resource with the client-specified ID. It is strongly advised not to include or encode any sensitive data such as patient identifiers in client-specified resource IDs. Those IDs are part of the FHIR resource path recorded in Cloud Audit Logs and Pub/Sub notifications. Those IDs can also be contained in reference fields within other resources. If the search criteria identify zero matches, and the supplied resource body does not contain an `id`, the resource is created with a server-assigned ID as per the create method. The request body must contain a JSON-encoded FHIR resource, and the request headers must contain `Content-Type: application/fhir+json`. On success, the response body contains a JSON-encoded representation of the updated resource, including the server-assigned version ID. Errors generated by the FHIR store contain a JSON-encoded `OperationOutcome` resource describing the reason for the error. If the request cannot be mapped to a valid API method on a FHIR store, a generic GCP error might be returned instead. For samples that show how to call `conditionalUpdate`, see [Conditionally updating a FHIR resource](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#conditionally_updating_a_fhir_resource). */
export interface ConditionalUpdateProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The FHIR resource type to update, such as Patient or Observation. For a complete list, see the FHIR Resource Index ([DSTU2](https://hl7.org/fhir/DSTU2/resourcelist.html), [STU3](https://hl7.org/fhir/STU3/resourcelist.html), [R4](https://hl7.org/fhir/R4/resourcelist.html), [R5](https://hl7.org/fhir/R5/resourcelist.html)). Must match the resource type in the provided content. */
  type: string;
  /** Required. The name of the FHIR store this resource belongs to. */
  parent: string;
  /** Request body */
  body?: HttpBody;
}

export const ConditionalUpdateProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  type: Schema.String.pipe(T.HttpPath("type")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(HttpBody).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/{fhirId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ConditionalUpdateProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type ConditionalUpdateProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const ConditionalUpdateProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type ConditionalUpdateProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const conditionalUpdateProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<ConditionalUpdateProjectsLocationsDatasetsFhirStoresFhirRequest, ConditionalUpdateProjectsLocationsDatasetsFhirStoresFhirResponse, ConditionalUpdateProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ConditionalUpdateProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: ConditionalUpdateProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Updates the entire contents of a Binary resource. If the specified resource does not exist and the FHIR store has enable_update_create set, creates the resource with the client-specified ID. It is strongly advised not to include or encode any sensitive data such as patient identifiers in client-specified resource IDs. Those IDs are part of the FHIR resource path recorded in Cloud Audit Logs and Pub/Sub notifications. Those IDs can also be contained in reference fields within other resources. This method can be used to update a Binary resource either by using one of the accepted FHIR JSON content types, or as a raw data stream. If a resource is updated with this method using the FHIR content type this method's behavior is the same as `update`. If a resource type other than Binary is used in the request it will be treated in the same way as non-FHIR data. When a non-FHIR content type is used in the request, a Binary resource will be generated using the ID from the resource path, and the uploaded data will be stored in the `content` field (`DSTU2` and `STU3`), or the `data` field (`R4` and `R5`). The Binary resource's `contentType` will be filled in using the value of the `Content-Type` header, and the `securityContext` field (not present in `DSTU2`) will be populated from the `X-Security-Context` header if it exists. At this time `securityContext` has no special behavior in the Cloud Healthcare API. Note: the limit on data ingested through this method is 2 GB. For best performance, use a non-FHIR data type instead of wrapping the data in a Binary resource. Some of the Healthcare API features, such as [exporting to BigQuery](https://cloud.google.com/healthcare-api/docs/how-tos/fhir-export-bigquery) or [Pub/Sub notifications](https://cloud.google.com/healthcare-api/docs/fhir-pubsub#behavior_when_a_fhir_resource_is_too_large_or_traffic_is_high) with full resource content, do not support Binary resources that are larger than 10 MB. In these cases the resource's `data` field will be omitted. Instead, the "http://hl7.org/fhir/StructureDefinition/data-absent-reason" extension will be present to indicate that including the data is `unsupported`. On success, an empty 200 OK response will be returned, or a 201 Created if the resource did not exit. The resource's ID and version are returned in the Location header. Using `Prefer: representation=resource` is not allowed for this method. The definition of the Binary REST API can be found at https://hl7.org/fhir/binary.html#rest. */
export interface Binary_updateProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the resource to update. */
  name: string;
  /** Request body */
  body?: HttpBody;
}

export const Binary_updateProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(HttpBody).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/Binary/{BinaryId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<Binary_updateProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type Binary_updateProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const Binary_updateProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type Binary_updateProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const Binary_updateProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<Binary_updateProjectsLocationsDatasetsFhirStoresFhirRequest, Binary_updateProjectsLocationsDatasetsFhirStoresFhirResponse, Binary_updateProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Binary_updateProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: Binary_updateProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Returns the consent enforcement status of a single consent resource. On success, the response body contains a JSON-encoded representation of a `Parameters` (http://hl7.org/fhir/parameters.html) FHIR resource, containing the current enforcement status. Does not support DSTU2. */
export interface Consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the consent resource to find enforcement status, in the format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Consent/{consent_id}` */
  name: string;
}

export const Consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/Consent/{ConsentId}/$consent-enforcement-status" }),
  svc,
) as unknown as Schema.Schema<Consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type Consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const Consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type Consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const Consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<Consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirRequest, Consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirResponse, Consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: Consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Deletes a FHIR resource. Implements the FHIR standard delete interaction ([DSTU2](https://hl7.org/fhir/DSTU2/http.html#delete), [STU3](https://hl7.org/fhir/STU3/http.html#delete), [R4](https://hl7.org/fhir/R4/http.html#delete), [R5](https://hl7.org/fhir/R5/http.html#delete)). Note: Unless resource versioning is disabled by setting the disable_resource_versioning flag on the FHIR store, the deleted resources will be moved to a history repository that can still be retrieved through vread and related methods, unless they are removed by the purge method. For samples that show how to call `delete`, see [Deleting a FHIR resource](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#deleting_a_fhir_resource). */
export interface DeleteProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the resource to delete. */
  name: string;
}

export const DeleteProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/{fhirId}/{fhirId1}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type DeleteProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const DeleteProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type DeleteProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const deleteProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<DeleteProjectsLocationsDatasetsFhirStoresFhirRequest, DeleteProjectsLocationsDatasetsFhirStoresFhirResponse, DeleteProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: DeleteProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Deletes all the historical versions of a resource (excluding the current version) from the FHIR store. To remove all versions of a resource, first delete the current version and then call this method. This is not a FHIR standard operation. For samples that show how to call `Resource-purge`, see [Deleting historical versions of a FHIR resource](https://cloud.google.com/healthcare/docs/how-tos/fhir-resources#deleting_historical_versions_of_a_fhir_resource). */
export interface Resource_purgeProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the resource to purge. */
  name: string;
}

export const Resource_purgeProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/{fhirId}/{fhirId1}/$purge" }),
  svc,
) as unknown as Schema.Schema<Resource_purgeProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type Resource_purgeProjectsLocationsDatasetsFhirStoresFhirResponse = Empty;
export const Resource_purgeProjectsLocationsDatasetsFhirStoresFhirResponse = Empty;

export type Resource_purgeProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const Resource_purgeProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<Resource_purgeProjectsLocationsDatasetsFhirStoresFhirRequest, Resource_purgeProjectsLocationsDatasetsFhirStoresFhirResponse, Resource_purgeProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Resource_purgeProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: Resource_purgeProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Executes all the requests in the given Bundle. Implements the FHIR standard batch/transaction interaction ([DSTU2](https://hl7.org/fhir/DSTU2/http.html#transaction), [STU3](https://hl7.org/fhir/STU3/http.html#transaction), [R4](https://hl7.org/fhir/R4/http.html#transaction), [R5](https://hl7.org/fhir/R5/http.html#transaction)). Supports all interactions within a bundle, except search. This method accepts Bundles of type `batch` and `transaction`, processing them according to the batch processing rules ([DSTU2](https://hl7.org/fhir/DSTU2/http.html#2.1.0.16.1), [STU3](https://hl7.org/fhir/STU3/http.html#2.21.0.17.1), [R4](https://hl7.org/fhir/R4/http.html#brules), [R5](https://hl7.org/fhir/R5/http.html#brules)) and transaction processing rules ([DSTU2](https://hl7.org/fhir/DSTU2/http.html#2.1.0.16.2), [STU3](https://hl7.org/fhir/STU3/http.html#2.21.0.17.2), [R4](https://hl7.org/fhir/R4/http.html#trules), [R5](https://hl7.org/fhir/R5/http.html#trules)). The request body must contain a JSON-encoded FHIR `Bundle` resource, and the request headers must contain `Content-Type: application/fhir+json`. For a batch bundle or a successful transaction, the response body contains a JSON-encoded representation of a `Bundle` resource of type `batch-response` or `transaction-response` containing one entry for each entry in the request, with the outcome of processing the entry. In the case of an error for a transaction bundle, the response body contains a JSON-encoded `OperationOutcome` resource describing the reason for the error. If the request cannot be mapped to a valid API method on a FHIR store, a generic GCP error might be returned instead. This method checks permissions for each request in the bundle. The `executeBundle` permission is required to call this method, but you must also grant sufficient permissions to execute the individual requests in the bundle. For example, if the bundle contains a request to create a FHIR resource, the caller must also have been granted the `healthcare.fhirResources.create` permission. You can use audit logs to view the permissions for `executeBundle` and each request in the bundle. For more information, see [Viewing Cloud Audit logs](https://cloud.google.com/healthcare-api/docs/how-tos/audit-logging). For samples that show how to call `executeBundle`, see [Managing FHIR resources using FHIR bundles](https://cloud.google.com/healthcare/docs/how-tos/fhir-bundles). */
export interface ExecuteBundleProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. Name of the FHIR store in which this bundle will be executed. */
  parent: string;
  /** Request body */
  body?: HttpBody;
}

export const ExecuteBundleProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(HttpBody).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExecuteBundleProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type ExecuteBundleProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const ExecuteBundleProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type ExecuteBundleProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const executeBundleProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<ExecuteBundleProjectsLocationsDatasetsFhirStoresFhirRequest, ExecuteBundleProjectsLocationsDatasetsFhirStoresFhirResponse, ExecuteBundleProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExecuteBundleProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: ExecuteBundleProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Returns the consent enforcement status of all consent resources for a patient. On success, the response body contains a JSON-encoded representation of a bundle of `Parameters` (http://hl7.org/fhir/parameters.html) FHIR resources, containing the current enforcement status for each consent resource of the patient. Does not support DSTU2. */
export interface Patient_consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the patient to find enforcement statuses, in the format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/fhirStores/{fhir_store_id}/fhir/Patient/{patient_id}` */
  name: string;
  /** Optional. Used to retrieve the first, previous, next, or last page of consent enforcement statuses when using pagination. Value should be set to the value of `_page_token` set in next or previous page links' URLs. Next and previous page are returned in the response bundle's links field, where `link.relation` is "previous" or "next". Omit `_page_token` if no previous request has been made. */
  _page_token?: string;
  /** Optional. The maximum number of results on a page. If not specified, 100 is used. May not be larger than 1000. */
  _count?: number;
}

export const Patient_consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  _page_token: Schema.optional(Schema.String).pipe(T.HttpQuery("_page_token")),
  _count: Schema.optional(Schema.Number).pipe(T.HttpQuery("_count")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/Patient/{PatientId}/$consent-enforcement-status" }),
  svc,
) as unknown as Schema.Schema<Patient_consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type Patient_consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const Patient_consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type Patient_consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const Patient_consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<Patient_consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirRequest, Patient_consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirResponse, Patient_consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Patient_consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: Patient_consent_enforcement_statusProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Validates an input FHIR resource's conformance to its profiles and the profiles configured on the FHIR store. Implements the FHIR extended operation $validate ([DSTU2](https://hl7.org/fhir/DSTU2/resource-operations.html#validate), [STU3](https://hl7.org/fhir/STU3/resource-operations.html#validate), [R4](https://hl7.org/fhir/R4/resource-operation-validate.html). or [R5](https://hl7.org/fhir/R5/resource-operation-validate.html)). The request body must contain a JSON-encoded FHIR resource, and the request headers must contain `Content-Type: application/fhir+json`. The `Parameters` input syntax is not supported. The `profile` query parameter can be used to request that the resource only be validated against a specific profile. If a profile with the given URL cannot be found in the FHIR store then an error is returned. Errors generated by validation contain a JSON-encoded `OperationOutcome` resource describing the reason for the error. If the request cannot be mapped to a valid API method on a FHIR store, a generic GCP error might be returned instead. */
export interface Resource_validateProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. The name of the FHIR store that holds the profiles being used for validation. */
  parent: string;
  /** Optional. The canonical URL of a profile that this resource should be validated against. For example, to validate a Patient resource against the US Core Patient profile this parameter would be `http://hl7.org/fhir/us/core/StructureDefinition/us-core-patient`. A StructureDefinition with this canonical URL must exist in the FHIR store. */
  profile?: string;
  /** Required. The FHIR resource type of the resource being validated. For a complete list, see the FHIR Resource Index ([DSTU2](https://hl7.org/fhir/DSTU2/resourcelist.html), [STU3](https://hl7.org/fhir/STU3/resourcelist.html), [R4](https://hl7.org/fhir/R4/resourcelist.html), or [R5](https://hl7.org/fhir/R5/resourcelist.html)). Must match the resource type in the provided content. */
  type: string;
  /** Request body */
  body?: HttpBody;
}

export const Resource_validateProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  profile: Schema.optional(Schema.String).pipe(T.HttpQuery("profile")),
  type: Schema.String.pipe(T.HttpPath("type")),
  body: Schema.optional(HttpBody).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/{fhirId}/$validate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<Resource_validateProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type Resource_validateProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const Resource_validateProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type Resource_validateProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const Resource_validateProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<Resource_validateProjectsLocationsDatasetsFhirStoresFhirRequest, Resource_validateProjectsLocationsDatasetsFhirStoresFhirResponse, Resource_validateProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: Resource_validateProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: Resource_validateProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Searches for resources in the given FHIR store according to criteria specified as query parameters. Implements the FHIR standard search interaction ([DSTU2](https://hl7.org/fhir/DSTU2/http.html#search), [STU3](https://hl7.org/fhir/STU3/http.html#search), [R4](https://hl7.org/fhir/R4/http.html#search), [R5](https://hl7.org/fhir/R5/http.html#search)) using the search semantics described in the FHIR Search specification ([DSTU2](https://hl7.org/fhir/DSTU2/search.html), [STU3](https://hl7.org/fhir/STU3/search.html), [R4](https://hl7.org/fhir/R4/search.html), [R5](https://hl7.org/fhir/R5/search.html)). Supports four methods of search defined by the specification: * `GET [base]?[parameters]` to search across all resources. * `GET [base]/[type]?[parameters]` to search resources of a specified type. * `POST [base]/_search?[parameters]` as an alternate form having the same semantics as the `GET` method across all resources. * `POST [base]/[type]/_search?[parameters]` as an alternate form having the same semantics as the `GET` method for the specified type. The `GET` and `POST` methods do not support compartment searches. The `POST` method does not support `application/x-www-form-urlencoded` search parameters. On success, the response body contains a JSON-encoded representation of a `Bundle` resource of type `searchset`, containing the results of the search. Errors generated by the FHIR store contain a JSON-encoded `OperationOutcome` resource describing the reason for the error. If the request cannot be mapped to a valid API method on a FHIR store, a generic GCP error might be returned instead. The server's capability statement, retrieved through capabilities, indicates what search parameters are supported on each FHIR resource. A list of all search parameters defined by the specification can be found in the FHIR Search Parameter Registry ([STU3](https://hl7.org/fhir/STU3/searchparameter-registry.html), [R4](https://hl7.org/fhir/R4/searchparameter-registry.html), [R5](https://hl7.org/fhir/R5/searchparameter-registry.html)). FHIR search parameters for DSTU2 can be found on each resource's definition page. Supported search modifiers: `:missing`, `:exact`, `:contains`, `:text`, `:in`, `:not-in`, `:above`, `:below`, `:[type]`, `:not`, and `recurse` (DSTU2 and STU3) or `:iterate` (R4 and R5). Supported search result parameters: `_sort`, `_count`, `_include`, `_revinclude`, `_summary=text`, `_summary=data`, and `_elements`. The maximum number of search results returned defaults to 100, which can be overridden by the `_count` parameter up to a maximum limit of 1000. The server might return fewer resources than requested to prevent excessively large responses. If there are additional results, the returned `Bundle` contains a link of `relation` "next", which has a `_page_token` parameter for an opaque pagination token that can be used to retrieve the next page. Resources with a total size larger than 5MB or a field count larger than 50,000 might not be fully searchable as the server might trim its generated search index in those cases. Note: FHIR resources are indexed asynchronously, so there might be a slight delay between the time a resource is created or changed, and the time when the change reflects in search results. The only exception is resource identifier data, which is indexed synchronously as a special index. As a result, searching using resource identifier is not subject to indexing delay. To use the special synchronous index, the search term for identifier should be in the pattern `identifier=[system]|[value]` or `identifier=[value]`, and any of the following search result parameters can be used: * `_count` * `_include` * `_revinclude` * `_summary` * `_elements` If your query contains any other search parameters, the standard asynchronous index will be used instead. Note that searching against the special index is optimized for resolving a small number of matches. The search isn't optimized if your identifier search criteria matches a large number (i.e. more than 2,000) of resources. For a search query that will match a large number of resources, you can avoiding using the special synchronous index by including an additional `_sort` parameter in your query. Use `_sort=-_lastUpdated` if you want to keep the default sorting order. For samples and detailed information, see [Searching for FHIR resources](https://cloud.google.com/healthcare/docs/how-tos/fhir-search) and [Advanced FHIR search features](https://cloud.google.com/healthcare/docs/how-tos/fhir-advanced-search). */
export interface SearchProjectsLocationsDatasetsFhirStoresFhirRequest {
  /** Required. Name of the FHIR store to retrieve resources from. */
  parent: string;
  /** Optional. The FHIR resource type to search, such as Patient or Observation. For a complete list, see the FHIR Resource Index ([DSTU2](https://hl7.org/fhir/DSTU2/resourcelist.html), [STU3](https://hl7.org/fhir/STU3/resourcelist.html), [R4](https://hl7.org/fhir/R4/resourcelist.html)), [R5](https://hl7.org/fhir/R5/resourcelist.html)). */
  resourceType?: string;
  /** Request body */
  body?: HttpBody;
}

export const SearchProjectsLocationsDatasetsFhirStoresFhirRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  resourceType: Schema.optional(Schema.String).pipe(T.HttpQuery("resourceType")),
  body: Schema.optional(HttpBody).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/fhirStores/{fhirStoresId}/fhir/_search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchProjectsLocationsDatasetsFhirStoresFhirRequest>;

export type SearchProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;
export const SearchProjectsLocationsDatasetsFhirStoresFhirResponse = HttpBody;

export type SearchProjectsLocationsDatasetsFhirStoresFhirError = CommonErrors;

export const searchProjectsLocationsDatasetsFhirStoresFhir: API.OperationMethod<SearchProjectsLocationsDatasetsFhirStoresFhirRequest, SearchProjectsLocationsDatasetsFhirStoresFhirResponse, SearchProjectsLocationsDatasetsFhirStoresFhirError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchProjectsLocationsDatasetsFhirStoresFhirRequest,
  output: SearchProjectsLocationsDatasetsFhirStoresFhirResponse,
  errors: [],
}));

/** Import messages to the HL7v2 store by loading data from the specified sources. This method is optimized to load large quantities of data using import semantics that ignore some HL7v2 store configuration options and are not suitable for all use cases. It is primarily intended to load data into an empty HL7v2 store that is not being used by other clients. An existing message will be overwritten if a duplicate message is imported. A duplicate message is a message with the same raw bytes as a message that already exists in this HL7v2 store. When a message is overwritten, its labels will also be overwritten. The import operation is idempotent unless the input data contains multiple valid messages with the same raw bytes but different labels. In that case, after the import completes, the store contains exactly one message with those raw bytes but there is no ordering guarantee on which version of the labels it has. The operation result counters do not count duplicated raw bytes as an error and count one success for each message in the input, which might result in a success count larger than the number of messages in the HL7v2 store. If some messages fail to import, for example due to parsing errors, successfully imported messages are not rolled back. This method returns an Operation that can be used to track the status of the import by calling GetOperation. Immediate fatal errors appear in the error field, errors are also logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). Otherwise, when the operation finishes, a response of type ImportMessagesResponse is returned in the response field. The metadata field type for this operation is OperationMetadata. */
export interface ImportProjectsLocationsDatasetsHl7V2StoresRequest {
  /** Required. The name of the target HL7v2 store, in the format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7v2Stores/{hl7v2_store_id}` */
  name: string;
  /** Request body */
  body?: ImportMessagesRequest;
}

export const ImportProjectsLocationsDatasetsHl7V2StoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ImportMessagesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsDatasetsHl7V2StoresRequest>;

export type ImportProjectsLocationsDatasetsHl7V2StoresResponse = Operation;
export const ImportProjectsLocationsDatasetsHl7V2StoresResponse = Operation;

export type ImportProjectsLocationsDatasetsHl7V2StoresError = CommonErrors;

export const importProjectsLocationsDatasetsHl7V2Stores: API.OperationMethod<ImportProjectsLocationsDatasetsHl7V2StoresRequest, ImportProjectsLocationsDatasetsHl7V2StoresResponse, ImportProjectsLocationsDatasetsHl7V2StoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsDatasetsHl7V2StoresRequest,
  output: ImportProjectsLocationsDatasetsHl7V2StoresResponse,
  errors: [],
}));

/** Creates a new HL7v2 store within the parent dataset. */
export interface CreateProjectsLocationsDatasetsHl7V2StoresRequest {
  /** Required. The name of the dataset this HL7v2 store belongs to. */
  parent: string;
  /** Required. The ID of the HL7v2 store that is being created. The string must match the following regex: `[\p{L}\p{N}_\-\.]{1,256}`. */
  hl7V2StoreId?: string;
  /** Request body */
  body?: Hl7V2Store;
}

export const CreateProjectsLocationsDatasetsHl7V2StoresRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  hl7V2StoreId: Schema.optional(Schema.String).pipe(T.HttpQuery("hl7V2StoreId")),
  body: Schema.optional(Hl7V2Store).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDatasetsHl7V2StoresRequest>;

export type CreateProjectsLocationsDatasetsHl7V2StoresResponse = Hl7V2Store;
export const CreateProjectsLocationsDatasetsHl7V2StoresResponse = Hl7V2Store;

export type CreateProjectsLocationsDatasetsHl7V2StoresError = CommonErrors;

export const createProjectsLocationsDatasetsHl7V2Stores: API.OperationMethod<CreateProjectsLocationsDatasetsHl7V2StoresRequest, CreateProjectsLocationsDatasetsHl7V2StoresResponse, CreateProjectsLocationsDatasetsHl7V2StoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDatasetsHl7V2StoresRequest,
  output: CreateProjectsLocationsDatasetsHl7V2StoresResponse,
  errors: [],
}));

/** Gets the specified HL7v2 store. */
export interface GetProjectsLocationsDatasetsHl7V2StoresRequest {
  /** Required. The resource name of the HL7v2 store to get. */
  name: string;
}

export const GetProjectsLocationsDatasetsHl7V2StoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDatasetsHl7V2StoresRequest>;

export type GetProjectsLocationsDatasetsHl7V2StoresResponse = Hl7V2Store;
export const GetProjectsLocationsDatasetsHl7V2StoresResponse = Hl7V2Store;

export type GetProjectsLocationsDatasetsHl7V2StoresError = CommonErrors;

export const getProjectsLocationsDatasetsHl7V2Stores: API.OperationMethod<GetProjectsLocationsDatasetsHl7V2StoresRequest, GetProjectsLocationsDatasetsHl7V2StoresResponse, GetProjectsLocationsDatasetsHl7V2StoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDatasetsHl7V2StoresRequest,
  output: GetProjectsLocationsDatasetsHl7V2StoresResponse,
  errors: [],
}));

/** Exports the messages to a destination. To filter messages to be exported, define a filter using the start and end time, relative to the message generation time (MSH.7). This API returns an Operation that can be used to track the status of the job by calling GetOperation. Immediate fatal errors appear in the error field. Otherwise, when the operation finishes, a detailed response of type ExportMessagesResponse is returned in the response field. The metadata field type for this operation is OperationMetadata. */
export interface ExportProjectsLocationsDatasetsHl7V2StoresRequest {
  /** Required. The name of the source HL7v2 store, in the format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7v2Stores/{hl7v2_store_id}` */
  name: string;
  /** Request body */
  body?: ExportMessagesRequest;
}

export const ExportProjectsLocationsDatasetsHl7V2StoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ExportMessagesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}:export", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportProjectsLocationsDatasetsHl7V2StoresRequest>;

export type ExportProjectsLocationsDatasetsHl7V2StoresResponse = Operation;
export const ExportProjectsLocationsDatasetsHl7V2StoresResponse = Operation;

export type ExportProjectsLocationsDatasetsHl7V2StoresError = CommonErrors;

export const exportProjectsLocationsDatasetsHl7V2Stores: API.OperationMethod<ExportProjectsLocationsDatasetsHl7V2StoresRequest, ExportProjectsLocationsDatasetsHl7V2StoresResponse, ExportProjectsLocationsDatasetsHl7V2StoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportProjectsLocationsDatasetsHl7V2StoresRequest,
  output: ExportProjectsLocationsDatasetsHl7V2StoresResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsDatasetsHl7V2StoresRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDatasetsHl7V2StoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDatasetsHl7V2StoresRequest>;

export type SetIamPolicyProjectsLocationsDatasetsHl7V2StoresResponse = Policy;
export const SetIamPolicyProjectsLocationsDatasetsHl7V2StoresResponse = Policy;

export type SetIamPolicyProjectsLocationsDatasetsHl7V2StoresError = CommonErrors;

export const setIamPolicyProjectsLocationsDatasetsHl7V2Stores: API.OperationMethod<SetIamPolicyProjectsLocationsDatasetsHl7V2StoresRequest, SetIamPolicyProjectsLocationsDatasetsHl7V2StoresResponse, SetIamPolicyProjectsLocationsDatasetsHl7V2StoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDatasetsHl7V2StoresRequest,
  output: SetIamPolicyProjectsLocationsDatasetsHl7V2StoresResponse,
  errors: [],
}));

/** Gets metrics associated with the HL7v2 store. */
export interface GetHL7v2StoreMetricsProjectsLocationsDatasetsHl7V2StoresRequest {
  /** Required. The resource name of the HL7v2 store to get metrics for, in the format `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7V2Stores/{hl7v2_store_id}`. */
  name: string;
}

export const GetHL7v2StoreMetricsProjectsLocationsDatasetsHl7V2StoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}:getHL7v2StoreMetrics" }),
  svc,
) as unknown as Schema.Schema<GetHL7v2StoreMetricsProjectsLocationsDatasetsHl7V2StoresRequest>;

export type GetHL7v2StoreMetricsProjectsLocationsDatasetsHl7V2StoresResponse = Hl7V2StoreMetrics;
export const GetHL7v2StoreMetricsProjectsLocationsDatasetsHl7V2StoresResponse = Hl7V2StoreMetrics;

export type GetHL7v2StoreMetricsProjectsLocationsDatasetsHl7V2StoresError = CommonErrors;

export const getHL7v2StoreMetricsProjectsLocationsDatasetsHl7V2Stores: API.OperationMethod<GetHL7v2StoreMetricsProjectsLocationsDatasetsHl7V2StoresRequest, GetHL7v2StoreMetricsProjectsLocationsDatasetsHl7V2StoresResponse, GetHL7v2StoreMetricsProjectsLocationsDatasetsHl7V2StoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetHL7v2StoreMetricsProjectsLocationsDatasetsHl7V2StoresRequest,
  output: GetHL7v2StoreMetricsProjectsLocationsDatasetsHl7V2StoresResponse,
  errors: [],
}));

/** Deletes the specified HL7v2 store and removes all messages that it contains. */
export interface DeleteProjectsLocationsDatasetsHl7V2StoresRequest {
  /** Required. The resource name of the HL7v2 store to delete. */
  name: string;
}

export const DeleteProjectsLocationsDatasetsHl7V2StoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatasetsHl7V2StoresRequest>;

export type DeleteProjectsLocationsDatasetsHl7V2StoresResponse = Empty;
export const DeleteProjectsLocationsDatasetsHl7V2StoresResponse = Empty;

export type DeleteProjectsLocationsDatasetsHl7V2StoresError = CommonErrors;

export const deleteProjectsLocationsDatasetsHl7V2Stores: API.OperationMethod<DeleteProjectsLocationsDatasetsHl7V2StoresRequest, DeleteProjectsLocationsDatasetsHl7V2StoresResponse, DeleteProjectsLocationsDatasetsHl7V2StoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatasetsHl7V2StoresRequest,
  output: DeleteProjectsLocationsDatasetsHl7V2StoresResponse,
  errors: [],
}));

/** Rolls back messages from the HL7v2 store to the specified time. This method returns an Operation that can be used to track the status of the rollback by calling GetOperation. Immediate fatal errors appear in the error field, errors are also logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). Otherwise, when the operation finishes, a detailed response of type RollbackHl7V2MessagesResponse is returned in the response field. The metadata field type for this operation is OperationMetadata. */
export interface RollbackProjectsLocationsDatasetsHl7V2StoresRequest {
  /** Required. The name of the HL7v2 store to rollback, in the format of "projects/{project_id}/locations/{location_id}/datasets/{dataset_id} /hl7V2Stores/{hl7v2_store_id}". */
  name: string;
  /** Request body */
  body?: RollbackHl7V2MessagesRequest;
}

export const RollbackProjectsLocationsDatasetsHl7V2StoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RollbackHl7V2MessagesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}:rollback", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RollbackProjectsLocationsDatasetsHl7V2StoresRequest>;

export type RollbackProjectsLocationsDatasetsHl7V2StoresResponse = Operation;
export const RollbackProjectsLocationsDatasetsHl7V2StoresResponse = Operation;

export type RollbackProjectsLocationsDatasetsHl7V2StoresError = CommonErrors;

export const rollbackProjectsLocationsDatasetsHl7V2Stores: API.OperationMethod<RollbackProjectsLocationsDatasetsHl7V2StoresRequest, RollbackProjectsLocationsDatasetsHl7V2StoresResponse, RollbackProjectsLocationsDatasetsHl7V2StoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RollbackProjectsLocationsDatasetsHl7V2StoresRequest,
  output: RollbackProjectsLocationsDatasetsHl7V2StoresResponse,
  errors: [],
}));

/** Updates the HL7v2 store. */
export interface PatchProjectsLocationsDatasetsHl7V2StoresRequest {
  /** Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Identifier. Resource name of the HL7v2 store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7V2Stores/{hl7v2_store_id}`. */
  name: string;
  /** Request body */
  body?: Hl7V2Store;
}

export const PatchProjectsLocationsDatasetsHl7V2StoresRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Hl7V2Store).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDatasetsHl7V2StoresRequest>;

export type PatchProjectsLocationsDatasetsHl7V2StoresResponse = Hl7V2Store;
export const PatchProjectsLocationsDatasetsHl7V2StoresResponse = Hl7V2Store;

export type PatchProjectsLocationsDatasetsHl7V2StoresError = CommonErrors;

export const patchProjectsLocationsDatasetsHl7V2Stores: API.OperationMethod<PatchProjectsLocationsDatasetsHl7V2StoresRequest, PatchProjectsLocationsDatasetsHl7V2StoresResponse, PatchProjectsLocationsDatasetsHl7V2StoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDatasetsHl7V2StoresRequest,
  output: PatchProjectsLocationsDatasetsHl7V2StoresResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsDatasetsHl7V2StoresRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsDatasetsHl7V2StoresRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDatasetsHl7V2StoresRequest>;

export type GetIamPolicyProjectsLocationsDatasetsHl7V2StoresResponse = Policy;
export const GetIamPolicyProjectsLocationsDatasetsHl7V2StoresResponse = Policy;

export type GetIamPolicyProjectsLocationsDatasetsHl7V2StoresError = CommonErrors;

export const getIamPolicyProjectsLocationsDatasetsHl7V2Stores: API.OperationMethod<GetIamPolicyProjectsLocationsDatasetsHl7V2StoresRequest, GetIamPolicyProjectsLocationsDatasetsHl7V2StoresResponse, GetIamPolicyProjectsLocationsDatasetsHl7V2StoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDatasetsHl7V2StoresRequest,
  output: GetIamPolicyProjectsLocationsDatasetsHl7V2StoresResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsDatasetsHl7V2StoresRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDatasetsHl7V2StoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDatasetsHl7V2StoresRequest>;

export type TestIamPermissionsProjectsLocationsDatasetsHl7V2StoresResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDatasetsHl7V2StoresResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDatasetsHl7V2StoresError = CommonErrors;

export const testIamPermissionsProjectsLocationsDatasetsHl7V2Stores: API.OperationMethod<TestIamPermissionsProjectsLocationsDatasetsHl7V2StoresRequest, TestIamPermissionsProjectsLocationsDatasetsHl7V2StoresResponse, TestIamPermissionsProjectsLocationsDatasetsHl7V2StoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDatasetsHl7V2StoresRequest,
  output: TestIamPermissionsProjectsLocationsDatasetsHl7V2StoresResponse,
  errors: [],
}));

/** Lists the HL7v2 stores in the given dataset. */
export interface ListProjectsLocationsDatasetsHl7V2StoresRequest {
  /** The next_page_token value returned from the previous List request, if any. */
  pageToken?: string;
  /** Restricts stores returned to those matching a filter. The following syntax is available: * A string field value can be written as text inside quotation marks, for example `"query text"`. The only valid relational operation for text fields is equality (`=`), where text is searched within the field, rather than having the field be equal to the text. For example, `"Comment = great"` returns messages with `great` in the comment field. * A number field value can be written as an integer, a decimal, or an exponential. The valid relational operators for number fields are the equality operator (`=`), along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * A date field value must be written in `yyyy-mm-dd` form. Fields with date and time use the RFC3339 time format. Leading zeros are required for one-digit months and days. The valid relational operators for date fields are the equality operator (`=`) , along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * Multiple field query expressions can be combined in one query by adding `AND` or `OR` operators between the expressions. If a boolean operator appears within a quoted string, it is not treated as special, it's just another part of the character string to be matched. You can prepend the `NOT` operator to an expression to negate it. Only filtering on labels is supported. For example, `labels.key=value`. */
  filter?: string;
  /** Required. Name of the dataset. */
  parent: string;
  /** Limit on the number of HL7v2 stores to return in a single response. If not specified, 100 is used. May not be larger than 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsDatasetsHl7V2StoresRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDatasetsHl7V2StoresRequest>;

export type ListProjectsLocationsDatasetsHl7V2StoresResponse = ListHl7V2StoresResponse;
export const ListProjectsLocationsDatasetsHl7V2StoresResponse = ListHl7V2StoresResponse;

export type ListProjectsLocationsDatasetsHl7V2StoresError = CommonErrors;

export const listProjectsLocationsDatasetsHl7V2Stores = API.makePaginated(() => ({
  input: ListProjectsLocationsDatasetsHl7V2StoresRequest,
  output: ListProjectsLocationsDatasetsHl7V2StoresResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets an HL7v2 message. */
export interface GetProjectsLocationsDatasetsHl7V2StoresMessagesRequest {
  /** Specifies which parts of the Message resource to return in the response. When unspecified, equivalent to FULL. */
  view?: "MESSAGE_VIEW_UNSPECIFIED" | "RAW_ONLY" | "PARSED_ONLY" | "FULL" | "SCHEMATIZED_ONLY" | "BASIC" | (string & {});
  /** Required. The resource name of the HL7v2 message to retrieve. */
  name: string;
}

export const GetProjectsLocationsDatasetsHl7V2StoresMessagesRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}/messages/{messagesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDatasetsHl7V2StoresMessagesRequest>;

export type GetProjectsLocationsDatasetsHl7V2StoresMessagesResponse = Message;
export const GetProjectsLocationsDatasetsHl7V2StoresMessagesResponse = Message;

export type GetProjectsLocationsDatasetsHl7V2StoresMessagesError = CommonErrors;

export const getProjectsLocationsDatasetsHl7V2StoresMessages: API.OperationMethod<GetProjectsLocationsDatasetsHl7V2StoresMessagesRequest, GetProjectsLocationsDatasetsHl7V2StoresMessagesResponse, GetProjectsLocationsDatasetsHl7V2StoresMessagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDatasetsHl7V2StoresMessagesRequest,
  output: GetProjectsLocationsDatasetsHl7V2StoresMessagesResponse,
  errors: [],
}));

/** Parses and stores an HL7v2 message. This method triggers an asynchronous notification to any Pub/Sub topic configured in Hl7V2Store.Hl7V2NotificationConfig, if the filtering matches the message. If an MLLP adapter is configured to listen to a Pub/Sub topic, the adapter transmits the message when a notification is received. */
export interface CreateProjectsLocationsDatasetsHl7V2StoresMessagesRequest {
  /** Required. The name of the HL7v2 store this message belongs to. */
  parent: string;
  /** Request body */
  body?: CreateMessageRequest;
}

export const CreateProjectsLocationsDatasetsHl7V2StoresMessagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}/messages", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDatasetsHl7V2StoresMessagesRequest>;

export type CreateProjectsLocationsDatasetsHl7V2StoresMessagesResponse = Message;
export const CreateProjectsLocationsDatasetsHl7V2StoresMessagesResponse = Message;

export type CreateProjectsLocationsDatasetsHl7V2StoresMessagesError = CommonErrors;

export const createProjectsLocationsDatasetsHl7V2StoresMessages: API.OperationMethod<CreateProjectsLocationsDatasetsHl7V2StoresMessagesRequest, CreateProjectsLocationsDatasetsHl7V2StoresMessagesResponse, CreateProjectsLocationsDatasetsHl7V2StoresMessagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDatasetsHl7V2StoresMessagesRequest,
  output: CreateProjectsLocationsDatasetsHl7V2StoresMessagesResponse,
  errors: [],
}));

/** Update the message. The contents of the message in Message.data and data extracted from the contents such as Message.create_time cannot be altered. Only the Message.labels field is allowed to be updated. The labels in the request are merged with the existing set of labels. Existing labels with the same keys are updated. */
export interface PatchProjectsLocationsDatasetsHl7V2StoresMessagesRequest {
  /** Output only. Resource name of the Message, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/hl7V2Stores/{hl7_v2_store_id}/messages/{message_id}`. */
  name: string;
  /** Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: Message;
}

export const PatchProjectsLocationsDatasetsHl7V2StoresMessagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Message).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}/messages/{messagesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDatasetsHl7V2StoresMessagesRequest>;

export type PatchProjectsLocationsDatasetsHl7V2StoresMessagesResponse = Message;
export const PatchProjectsLocationsDatasetsHl7V2StoresMessagesResponse = Message;

export type PatchProjectsLocationsDatasetsHl7V2StoresMessagesError = CommonErrors;

export const patchProjectsLocationsDatasetsHl7V2StoresMessages: API.OperationMethod<PatchProjectsLocationsDatasetsHl7V2StoresMessagesRequest, PatchProjectsLocationsDatasetsHl7V2StoresMessagesResponse, PatchProjectsLocationsDatasetsHl7V2StoresMessagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDatasetsHl7V2StoresMessagesRequest,
  output: PatchProjectsLocationsDatasetsHl7V2StoresMessagesResponse,
  errors: [],
}));

/** Deletes an HL7v2 message. */
export interface DeleteProjectsLocationsDatasetsHl7V2StoresMessagesRequest {
  /** Required. The resource name of the HL7v2 message to delete. */
  name: string;
}

export const DeleteProjectsLocationsDatasetsHl7V2StoresMessagesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}/messages/{messagesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatasetsHl7V2StoresMessagesRequest>;

export type DeleteProjectsLocationsDatasetsHl7V2StoresMessagesResponse = Empty;
export const DeleteProjectsLocationsDatasetsHl7V2StoresMessagesResponse = Empty;

export type DeleteProjectsLocationsDatasetsHl7V2StoresMessagesError = CommonErrors;

export const deleteProjectsLocationsDatasetsHl7V2StoresMessages: API.OperationMethod<DeleteProjectsLocationsDatasetsHl7V2StoresMessagesRequest, DeleteProjectsLocationsDatasetsHl7V2StoresMessagesResponse, DeleteProjectsLocationsDatasetsHl7V2StoresMessagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatasetsHl7V2StoresMessagesRequest,
  output: DeleteProjectsLocationsDatasetsHl7V2StoresMessagesResponse,
  errors: [],
}));

/** Lists all the messages in the given HL7v2 store with support for filtering. Note: HL7v2 messages are indexed asynchronously, so there might be a slight delay between the time a message is created and when it can be found through a filter. */
export interface ListProjectsLocationsDatasetsHl7V2StoresMessagesRequest {
  /** The next_page_token value returned from the previous List request, if any. */
  pageToken?: string;
  /** Restricts messages returned to those matching a filter. The following syntax is available: * A string field value can be written as text inside quotation marks, for example `"query text"`. The only valid relational operation for text fields is equality (`=`), where text is searched within the field, rather than having the field be equal to the text. For example, `"Comment = great"` returns messages with `great` in the comment field. * A number field value can be written as an integer, a decimal, or an exponential. The valid relational operators for number fields are the equality operator (`=`), along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * A date field value must be written in `yyyy-mm-dd` form. Fields with date and time use the RFC3339 time format. Leading zeros are required for one-digit months and days. The valid relational operators for date fields are the equality operator (`=`) , along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * Multiple field query expressions can be combined in one query by adding `AND` or `OR` operators between the expressions. If a boolean operator appears within a quoted string, it is not treated as special, it's just another part of the character string to be matched. You can prepend the `NOT` operator to an expression to negate it. Fields/functions available for filtering are: * `message_type`, from the MSH-9.1 field. For example, `NOT message_type = "ADT"`. * `send_date` or `sendDate`, the YYYY-MM-DD date the message was sent in the dataset's time_zone, from the MSH-7 segment. For example, `send_date < "2017-01-02"`. * `send_time`, the timestamp when the message was sent, using the RFC3339 time format for comparisons, from the MSH-7 segment. For example, `send_time < "2017-01-02T00:00:00-05:00"`. * `create_time`, the timestamp when the message was created in the HL7v2 store. Use the RFC3339 time format for comparisons. For example, `create_time < "2017-01-02T00:00:00-05:00"`. * `send_facility`, the care center that the message came from, from the MSH-4 segment. For example, `send_facility = "ABC"`. * `PatientId(value, type)`, which matches if the message lists a patient having an ID of the given value and type in the PID-2, PID-3, or PID-4 segments. For example, `PatientId("123456", "MRN")`. * `labels.x`, a string value of the label with key `x` as set using the Message.labels map. For example, `labels."priority"="high"`. The operator `:*` can be used to assert the existence of a label. For example, `labels."priority":*`. */
  filter?: string;
  /** Required. Name of the HL7v2 store to retrieve messages from. */
  parent: string;
  /** Specifies the parts of the Message to return in the response. When unspecified, equivalent to BASIC. Setting this to anything other than BASIC with a `page_size` larger than the default can generate a large response, which impacts the performance of this method. */
  view?: "MESSAGE_VIEW_UNSPECIFIED" | "RAW_ONLY" | "PARSED_ONLY" | "FULL" | "SCHEMATIZED_ONLY" | "BASIC" | (string & {});
  /** Limit on the number of messages to return in a single response. If not specified, 100 is used. May not be larger than 1000. */
  pageSize?: number;
  /** Orders messages returned by the specified order_by clause. Syntax: https://cloud.google.com/apis/design/design_patterns#sorting_order Fields available for ordering are: * `send_time` */
  orderBy?: string;
}

export const ListProjectsLocationsDatasetsHl7V2StoresMessagesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}/messages" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDatasetsHl7V2StoresMessagesRequest>;

export type ListProjectsLocationsDatasetsHl7V2StoresMessagesResponse = ListMessagesResponse;
export const ListProjectsLocationsDatasetsHl7V2StoresMessagesResponse = ListMessagesResponse;

export type ListProjectsLocationsDatasetsHl7V2StoresMessagesError = CommonErrors;

export const listProjectsLocationsDatasetsHl7V2StoresMessages = API.makePaginated(() => ({
  input: ListProjectsLocationsDatasetsHl7V2StoresMessagesRequest,
  output: ListProjectsLocationsDatasetsHl7V2StoresMessagesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Parses and stores an HL7v2 message. This method triggers an asynchronous notification to any Pub/Sub topic configured in Hl7V2Store.Hl7V2NotificationConfig, if the filtering matches the message. If an MLLP adapter is configured to listen to a Pub/Sub topic, the adapter transmits the message when a notification is received. If the method is successful, it generates a response containing an HL7v2 acknowledgment (`ACK`) message. If the method encounters an error, it returns a negative acknowledgment (`NACK`) message. This behavior is suitable for replying to HL7v2 interface systems that expect these acknowledgments. */
export interface IngestProjectsLocationsDatasetsHl7V2StoresMessagesRequest {
  /** Required. The name of the HL7v2 store this message belongs to. */
  parent: string;
  /** Request body */
  body?: IngestMessageRequest;
}

export const IngestProjectsLocationsDatasetsHl7V2StoresMessagesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(IngestMessageRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/hl7V2Stores/{hl7V2StoresId}/messages:ingest", hasBody: true }),
  svc,
) as unknown as Schema.Schema<IngestProjectsLocationsDatasetsHl7V2StoresMessagesRequest>;

export type IngestProjectsLocationsDatasetsHl7V2StoresMessagesResponse = IngestMessageResponse;
export const IngestProjectsLocationsDatasetsHl7V2StoresMessagesResponse = IngestMessageResponse;

export type IngestProjectsLocationsDatasetsHl7V2StoresMessagesError = CommonErrors;

export const ingestProjectsLocationsDatasetsHl7V2StoresMessages: API.OperationMethod<IngestProjectsLocationsDatasetsHl7V2StoresMessagesRequest, IngestProjectsLocationsDatasetsHl7V2StoresMessagesResponse, IngestProjectsLocationsDatasetsHl7V2StoresMessagesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: IngestProjectsLocationsDatasetsHl7V2StoresMessagesRequest,
  output: IngestProjectsLocationsDatasetsHl7V2StoresMessagesResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelProjectsLocationsDatasetsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: CancelOperationRequest;
}

export const CancelProjectsLocationsDatasetsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(CancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsDatasetsOperationsRequest>;

export type CancelProjectsLocationsDatasetsOperationsResponse = Empty;
export const CancelProjectsLocationsDatasetsOperationsResponse = Empty;

export type CancelProjectsLocationsDatasetsOperationsError = CommonErrors;

export const cancelProjectsLocationsDatasetsOperations: API.OperationMethod<CancelProjectsLocationsDatasetsOperationsRequest, CancelProjectsLocationsDatasetsOperationsResponse, CancelProjectsLocationsDatasetsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsDatasetsOperationsRequest,
  output: CancelProjectsLocationsDatasetsOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsDatasetsOperationsRequest {
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

export const ListProjectsLocationsDatasetsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDatasetsOperationsRequest>;

export type ListProjectsLocationsDatasetsOperationsResponse = ListOperationsResponse;
export const ListProjectsLocationsDatasetsOperationsResponse = ListOperationsResponse;

export type ListProjectsLocationsDatasetsOperationsError = CommonErrors;

export const listProjectsLocationsDatasetsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsDatasetsOperationsRequest,
  output: ListProjectsLocationsDatasetsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsDatasetsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsDatasetsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDatasetsOperationsRequest>;

export type GetProjectsLocationsDatasetsOperationsResponse = Operation;
export const GetProjectsLocationsDatasetsOperationsResponse = Operation;

export type GetProjectsLocationsDatasetsOperationsError = CommonErrors;

export const getProjectsLocationsDatasetsOperations: API.OperationMethod<GetProjectsLocationsDatasetsOperationsRequest, GetProjectsLocationsDatasetsOperationsResponse, GetProjectsLocationsDatasetsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDatasetsOperationsRequest,
  output: GetProjectsLocationsDatasetsOperationsResponse,
  errors: [],
}));

/** Updates the specified consent store. */
export interface PatchProjectsLocationsDatasetsConsentStoresRequest {
  /** Identifier. Resource name of the consent store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}`. Cannot be changed after creation. */
  name: string;
  /** Required. The update mask that applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. Only the `labels`, `default_consent_ttl`, and `enable_consent_create_on_update` fields are allowed to be updated. */
  updateMask?: string;
  /** Request body */
  body?: ConsentStore;
}

export const PatchProjectsLocationsDatasetsConsentStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(ConsentStore).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDatasetsConsentStoresRequest>;

export type PatchProjectsLocationsDatasetsConsentStoresResponse = ConsentStore;
export const PatchProjectsLocationsDatasetsConsentStoresResponse = ConsentStore;

export type PatchProjectsLocationsDatasetsConsentStoresError = CommonErrors;

export const patchProjectsLocationsDatasetsConsentStores: API.OperationMethod<PatchProjectsLocationsDatasetsConsentStoresRequest, PatchProjectsLocationsDatasetsConsentStoresResponse, PatchProjectsLocationsDatasetsConsentStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDatasetsConsentStoresRequest,
  output: PatchProjectsLocationsDatasetsConsentStoresResponse,
  errors: [],
}));

/** Lists the consent stores in the specified dataset. */
export interface ListProjectsLocationsDatasetsConsentStoresRequest {
  /** Optional. Token to retrieve the next page of results, or empty to get the first page. */
  pageToken?: string;
  /** Optional. Limit on the number of consent stores to return in a single response. If not specified, 100 is used. May not be larger than 1000. */
  pageSize?: number;
  /** Required. Name of the dataset. */
  parent: string;
  /** Optional. Restricts the stores returned to those matching a filter. Only filtering on labels is supported. For example, `filter=labels.key=value`. */
  filter?: string;
}

export const ListProjectsLocationsDatasetsConsentStoresRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDatasetsConsentStoresRequest>;

export type ListProjectsLocationsDatasetsConsentStoresResponse = ListConsentStoresResponse;
export const ListProjectsLocationsDatasetsConsentStoresResponse = ListConsentStoresResponse;

export type ListProjectsLocationsDatasetsConsentStoresError = CommonErrors;

export const listProjectsLocationsDatasetsConsentStores = API.makePaginated(() => ({
  input: ListProjectsLocationsDatasetsConsentStoresRequest,
  output: ListProjectsLocationsDatasetsConsentStoresResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes the specified consent store and removes all the consent store's data. */
export interface DeleteProjectsLocationsDatasetsConsentStoresRequest {
  /** Required. The resource name of the consent store to delete. */
  name: string;
}

export const DeleteProjectsLocationsDatasetsConsentStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatasetsConsentStoresRequest>;

export type DeleteProjectsLocationsDatasetsConsentStoresResponse = Empty;
export const DeleteProjectsLocationsDatasetsConsentStoresResponse = Empty;

export type DeleteProjectsLocationsDatasetsConsentStoresError = CommonErrors;

export const deleteProjectsLocationsDatasetsConsentStores: API.OperationMethod<DeleteProjectsLocationsDatasetsConsentStoresRequest, DeleteProjectsLocationsDatasetsConsentStoresResponse, DeleteProjectsLocationsDatasetsConsentStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatasetsConsentStoresRequest,
  output: DeleteProjectsLocationsDatasetsConsentStoresResponse,
  errors: [],
}));

/** Gets the specified consent store. */
export interface GetProjectsLocationsDatasetsConsentStoresRequest {
  /** Required. The resource name of the consent store to get. */
  name: string;
}

export const GetProjectsLocationsDatasetsConsentStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDatasetsConsentStoresRequest>;

export type GetProjectsLocationsDatasetsConsentStoresResponse = ConsentStore;
export const GetProjectsLocationsDatasetsConsentStoresResponse = ConsentStore;

export type GetProjectsLocationsDatasetsConsentStoresError = CommonErrors;

export const getProjectsLocationsDatasetsConsentStores: API.OperationMethod<GetProjectsLocationsDatasetsConsentStoresRequest, GetProjectsLocationsDatasetsConsentStoresResponse, GetProjectsLocationsDatasetsConsentStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDatasetsConsentStoresRequest,
  output: GetProjectsLocationsDatasetsConsentStoresResponse,
  errors: [],
}));

/** Queries all data_ids that are consented for a specified use in the given consent store and writes them to a specified destination. The returned Operation includes a progress counter for the number of User data mappings processed. If the request is successful, a detailed response is returned of type QueryAccessibleDataResponse, contained in the response field when the operation finishes. The metadata field type is OperationMetadata. Errors are logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). For example, the following sample log entry shows a `failed to evaluate consent policy` error that occurred during a QueryAccessibleData call to consent store `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}`. ```json jsonPayload: { @type: "type.googleapis.com/google.cloud.healthcare.logging.QueryAccessibleDataLogEntry" error: { code: 9 message: "failed to evaluate consent policy" } resourceName: "projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}" } logName: "projects/{project_id}/logs/healthcare.googleapis.com%2Fquery_accessible_data" operation: { id: "projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/operations/{operation_id}" producer: "healthcare.googleapis.com/QueryAccessibleData" } receiveTimestamp: "TIMESTAMP" resource: { labels: { consent_store_id: "{consent_store_id}" dataset_id: "{dataset_id}" location: "{location_id}" project_id: "{project_id}" } type: "healthcare_consent_store" } severity: "ERROR" timestamp: "TIMESTAMP" ``` */
export interface QueryAccessibleDataProjectsLocationsDatasetsConsentStoresRequest {
  /** Required. Name of the consent store to retrieve User data mappings from. */
  consentStore: string;
  /** Request body */
  body?: QueryAccessibleDataRequest;
}

export const QueryAccessibleDataProjectsLocationsDatasetsConsentStoresRequest = Schema.Struct({
  consentStore: Schema.String.pipe(T.HttpPath("consentStore")),
  body: Schema.optional(QueryAccessibleDataRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}:queryAccessibleData", hasBody: true }),
  svc,
) as unknown as Schema.Schema<QueryAccessibleDataProjectsLocationsDatasetsConsentStoresRequest>;

export type QueryAccessibleDataProjectsLocationsDatasetsConsentStoresResponse = Operation;
export const QueryAccessibleDataProjectsLocationsDatasetsConsentStoresResponse = Operation;

export type QueryAccessibleDataProjectsLocationsDatasetsConsentStoresError = CommonErrors;

export const queryAccessibleDataProjectsLocationsDatasetsConsentStores: API.OperationMethod<QueryAccessibleDataProjectsLocationsDatasetsConsentStoresRequest, QueryAccessibleDataProjectsLocationsDatasetsConsentStoresResponse, QueryAccessibleDataProjectsLocationsDatasetsConsentStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryAccessibleDataProjectsLocationsDatasetsConsentStoresRequest,
  output: QueryAccessibleDataProjectsLocationsDatasetsConsentStoresResponse,
  errors: [],
}));

/** Evaluates the user's Consents for all matching User data mappings. Note: User data mappings are indexed asynchronously, which can cause a slight delay between the time mappings are created or updated and when they are included in EvaluateUserConsents results. */
export interface EvaluateUserConsentsProjectsLocationsDatasetsConsentStoresRequest {
  /** Required. Name of the consent store to retrieve User data mappings from. */
  consentStore: string;
  /** Request body */
  body?: EvaluateUserConsentsRequest;
}

export const EvaluateUserConsentsProjectsLocationsDatasetsConsentStoresRequest = Schema.Struct({
  consentStore: Schema.String.pipe(T.HttpPath("consentStore")),
  body: Schema.optional(EvaluateUserConsentsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}:evaluateUserConsents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<EvaluateUserConsentsProjectsLocationsDatasetsConsentStoresRequest>;

export type EvaluateUserConsentsProjectsLocationsDatasetsConsentStoresResponse = EvaluateUserConsentsResponse;
export const EvaluateUserConsentsProjectsLocationsDatasetsConsentStoresResponse = EvaluateUserConsentsResponse;

export type EvaluateUserConsentsProjectsLocationsDatasetsConsentStoresError = CommonErrors;

export const evaluateUserConsentsProjectsLocationsDatasetsConsentStores: API.OperationMethod<EvaluateUserConsentsProjectsLocationsDatasetsConsentStoresRequest, EvaluateUserConsentsProjectsLocationsDatasetsConsentStoresResponse, EvaluateUserConsentsProjectsLocationsDatasetsConsentStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: EvaluateUserConsentsProjectsLocationsDatasetsConsentStoresRequest,
  output: EvaluateUserConsentsProjectsLocationsDatasetsConsentStoresResponse,
  errors: [],
}));

/** Creates a new consent store in the parent dataset. Attempting to create a consent store with the same ID as an existing store fails with an ALREADY_EXISTS error. */
export interface CreateProjectsLocationsDatasetsConsentStoresRequest {
  /** Required. The ID of the consent store to create. The string must match the following regex: `[\p{L}\p{N}_\-\.]{1,256}`. Cannot be changed after creation. */
  consentStoreId?: string;
  /** Required. The name of the dataset this consent store belongs to. */
  parent: string;
  /** Request body */
  body?: ConsentStore;
}

export const CreateProjectsLocationsDatasetsConsentStoresRequest = Schema.Struct({
  consentStoreId: Schema.optional(Schema.String).pipe(T.HttpQuery("consentStoreId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ConsentStore).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDatasetsConsentStoresRequest>;

export type CreateProjectsLocationsDatasetsConsentStoresResponse = ConsentStore;
export const CreateProjectsLocationsDatasetsConsentStoresResponse = ConsentStore;

export type CreateProjectsLocationsDatasetsConsentStoresError = CommonErrors;

export const createProjectsLocationsDatasetsConsentStores: API.OperationMethod<CreateProjectsLocationsDatasetsConsentStoresRequest, CreateProjectsLocationsDatasetsConsentStoresResponse, CreateProjectsLocationsDatasetsConsentStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDatasetsConsentStoresRequest,
  output: CreateProjectsLocationsDatasetsConsentStoresResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsDatasetsConsentStoresRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsDatasetsConsentStoresRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDatasetsConsentStoresRequest>;

export type GetIamPolicyProjectsLocationsDatasetsConsentStoresResponse = Policy;
export const GetIamPolicyProjectsLocationsDatasetsConsentStoresResponse = Policy;

export type GetIamPolicyProjectsLocationsDatasetsConsentStoresError = CommonErrors;

export const getIamPolicyProjectsLocationsDatasetsConsentStores: API.OperationMethod<GetIamPolicyProjectsLocationsDatasetsConsentStoresRequest, GetIamPolicyProjectsLocationsDatasetsConsentStoresResponse, GetIamPolicyProjectsLocationsDatasetsConsentStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDatasetsConsentStoresRequest,
  output: GetIamPolicyProjectsLocationsDatasetsConsentStoresResponse,
  errors: [],
}));

/** Checks if a particular data_id of a User data mapping in the specified consent store is consented for the specified use. */
export interface CheckDataAccessProjectsLocationsDatasetsConsentStoresRequest {
  /** Required. Name of the consent store where the requested data_id is stored, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}`. */
  consentStore: string;
  /** Request body */
  body?: CheckDataAccessRequest;
}

export const CheckDataAccessProjectsLocationsDatasetsConsentStoresRequest = Schema.Struct({
  consentStore: Schema.String.pipe(T.HttpPath("consentStore")),
  body: Schema.optional(CheckDataAccessRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}:checkDataAccess", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CheckDataAccessProjectsLocationsDatasetsConsentStoresRequest>;

export type CheckDataAccessProjectsLocationsDatasetsConsentStoresResponse = CheckDataAccessResponse;
export const CheckDataAccessProjectsLocationsDatasetsConsentStoresResponse = CheckDataAccessResponse;

export type CheckDataAccessProjectsLocationsDatasetsConsentStoresError = CommonErrors;

export const checkDataAccessProjectsLocationsDatasetsConsentStores: API.OperationMethod<CheckDataAccessProjectsLocationsDatasetsConsentStoresRequest, CheckDataAccessProjectsLocationsDatasetsConsentStoresResponse, CheckDataAccessProjectsLocationsDatasetsConsentStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckDataAccessProjectsLocationsDatasetsConsentStoresRequest,
  output: CheckDataAccessProjectsLocationsDatasetsConsentStoresResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsDatasetsConsentStoresRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDatasetsConsentStoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDatasetsConsentStoresRequest>;

export type SetIamPolicyProjectsLocationsDatasetsConsentStoresResponse = Policy;
export const SetIamPolicyProjectsLocationsDatasetsConsentStoresResponse = Policy;

export type SetIamPolicyProjectsLocationsDatasetsConsentStoresError = CommonErrors;

export const setIamPolicyProjectsLocationsDatasetsConsentStores: API.OperationMethod<SetIamPolicyProjectsLocationsDatasetsConsentStoresRequest, SetIamPolicyProjectsLocationsDatasetsConsentStoresResponse, SetIamPolicyProjectsLocationsDatasetsConsentStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDatasetsConsentStoresRequest,
  output: SetIamPolicyProjectsLocationsDatasetsConsentStoresResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsDatasetsConsentStoresRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDatasetsConsentStoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDatasetsConsentStoresRequest>;

export type TestIamPermissionsProjectsLocationsDatasetsConsentStoresResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDatasetsConsentStoresResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDatasetsConsentStoresError = CommonErrors;

export const testIamPermissionsProjectsLocationsDatasetsConsentStores: API.OperationMethod<TestIamPermissionsProjectsLocationsDatasetsConsentStoresRequest, TestIamPermissionsProjectsLocationsDatasetsConsentStoresResponse, TestIamPermissionsProjectsLocationsDatasetsConsentStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDatasetsConsentStoresRequest,
  output: TestIamPermissionsProjectsLocationsDatasetsConsentStoresResponse,
  errors: [],
}));

/** Deletes the specified User data mapping. */
export interface DeleteProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest {
  /** Required. The resource name of the User data mapping to delete. */
  name: string;
}

export const DeleteProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/userDataMappings/{userDataMappingsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest>;

export type DeleteProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse = Empty;
export const DeleteProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse = Empty;

export type DeleteProjectsLocationsDatasetsConsentStoresUserDataMappingsError = CommonErrors;

export const deleteProjectsLocationsDatasetsConsentStoresUserDataMappings: API.OperationMethod<DeleteProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest, DeleteProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse, DeleteProjectsLocationsDatasetsConsentStoresUserDataMappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest,
  output: DeleteProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse,
  errors: [],
}));

/** Lists the User data mappings in the specified consent store. */
export interface ListProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest {
  /** Optional. Limit on the number of User data mappings to return in a single response. If not specified, 100 is used. May not be larger than 1000. */
  pageSize?: number;
  /** Optional. Restricts the User data mappings returned to those matching a filter. The following syntax is available: * A string field value can be written as text inside quotation marks, for example `"query text"`. The only valid relational operation for text fields is equality (`=`), where text is searched within the field, rather than having the field be equal to the text. For example, `"Comment = great"` returns messages with `great` in the comment field. * A number field value can be written as an integer, a decimal, or an exponential. The valid relational operators for number fields are the equality operator (`=`), along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * A date field value must be written in `yyyy-mm-dd` form. Fields with date and time use the RFC3339 time format. Leading zeros are required for one-digit months and days. The valid relational operators for date fields are the equality operator (`=`) , along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * Multiple field query expressions can be combined in one query by adding `AND` or `OR` operators between the expressions. If a boolean operator appears within a quoted string, it is not treated as special, it's just another part of the character string to be matched. You can prepend the `NOT` operator to an expression to negate it. The fields available for filtering are: - data_id - user_id. For example, `filter=user_id=\"user123\"`. - archived - archive_time */
  filter?: string;
  /** Required. Name of the consent store to retrieve User data mappings from. */
  parent: string;
  /** Optional. Token to retrieve the next page of results, or empty to get the first page. */
  pageToken?: string;
}

export const ListProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/userDataMappings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest>;

export type ListProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse = ListUserDataMappingsResponse;
export const ListProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse = ListUserDataMappingsResponse;

export type ListProjectsLocationsDatasetsConsentStoresUserDataMappingsError = CommonErrors;

export const listProjectsLocationsDatasetsConsentStoresUserDataMappings = API.makePaginated(() => ({
  input: ListProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest,
  output: ListProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Archives the specified User data mapping. */
export interface ArchiveProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest {
  /** Required. The resource name of the User data mapping to archive. */
  name: string;
  /** Request body */
  body?: ArchiveUserDataMappingRequest;
}

export const ArchiveProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ArchiveUserDataMappingRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/userDataMappings/{userDataMappingsId}:archive", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ArchiveProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest>;

export type ArchiveProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse = ArchiveUserDataMappingResponse;
export const ArchiveProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse = ArchiveUserDataMappingResponse;

export type ArchiveProjectsLocationsDatasetsConsentStoresUserDataMappingsError = CommonErrors;

export const archiveProjectsLocationsDatasetsConsentStoresUserDataMappings: API.OperationMethod<ArchiveProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest, ArchiveProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse, ArchiveProjectsLocationsDatasetsConsentStoresUserDataMappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ArchiveProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest,
  output: ArchiveProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse,
  errors: [],
}));

/** Creates a new User data mapping in the parent consent store. */
export interface CreateProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest {
  /** Required. Name of the consent store. */
  parent: string;
  /** Request body */
  body?: UserDataMapping;
}

export const CreateProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(UserDataMapping).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/userDataMappings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest>;

export type CreateProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse = UserDataMapping;
export const CreateProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse = UserDataMapping;

export type CreateProjectsLocationsDatasetsConsentStoresUserDataMappingsError = CommonErrors;

export const createProjectsLocationsDatasetsConsentStoresUserDataMappings: API.OperationMethod<CreateProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest, CreateProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse, CreateProjectsLocationsDatasetsConsentStoresUserDataMappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest,
  output: CreateProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse,
  errors: [],
}));

/** Updates the specified User data mapping. */
export interface PatchProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest {
  /** Required. The update mask that applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. Only the `data_id`, `user_id` and `resource_attributes` fields can be updated. */
  updateMask?: string;
  /** Resource name of the User data mapping, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/userDataMappings/{user_data_mapping_id}`. */
  name: string;
  /** Request body */
  body?: UserDataMapping;
}

export const PatchProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UserDataMapping).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/userDataMappings/{userDataMappingsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest>;

export type PatchProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse = UserDataMapping;
export const PatchProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse = UserDataMapping;

export type PatchProjectsLocationsDatasetsConsentStoresUserDataMappingsError = CommonErrors;

export const patchProjectsLocationsDatasetsConsentStoresUserDataMappings: API.OperationMethod<PatchProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest, PatchProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse, PatchProjectsLocationsDatasetsConsentStoresUserDataMappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest,
  output: PatchProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse,
  errors: [],
}));

/** Gets the specified User data mapping. */
export interface GetProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest {
  /** Required. The resource name of the User data mapping to retrieve. */
  name: string;
}

export const GetProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/userDataMappings/{userDataMappingsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest>;

export type GetProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse = UserDataMapping;
export const GetProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse = UserDataMapping;

export type GetProjectsLocationsDatasetsConsentStoresUserDataMappingsError = CommonErrors;

export const getProjectsLocationsDatasetsConsentStoresUserDataMappings: API.OperationMethod<GetProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest, GetProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse, GetProjectsLocationsDatasetsConsentStoresUserDataMappingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDatasetsConsentStoresUserDataMappingsRequest,
  output: GetProjectsLocationsDatasetsConsentStoresUserDataMappingsResponse,
  errors: [],
}));

/** Creates a new Attribute definition in the parent consent store. */
export interface CreateProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest {
  /** Required. The name of the consent store that this Attribute definition belongs to. */
  parent: string;
  /** Required. The ID of the Attribute definition to create. The string must match the following regex: `_a-zA-Z{0,255}` and must not be a reserved keyword within the Common Expression Language as listed on https://github.com/google/cel-spec/blob/master/doc/langdef.md. */
  attributeDefinitionId?: string;
  /** Request body */
  body?: AttributeDefinition;
}

export const CreateProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  attributeDefinitionId: Schema.optional(Schema.String).pipe(T.HttpQuery("attributeDefinitionId")),
  body: Schema.optional(AttributeDefinition).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/attributeDefinitions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest>;

export type CreateProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse = AttributeDefinition;
export const CreateProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse = AttributeDefinition;

export type CreateProjectsLocationsDatasetsConsentStoresAttributeDefinitionsError = CommonErrors;

export const createProjectsLocationsDatasetsConsentStoresAttributeDefinitions: API.OperationMethod<CreateProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest, CreateProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse, CreateProjectsLocationsDatasetsConsentStoresAttributeDefinitionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest,
  output: CreateProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse,
  errors: [],
}));

/** Deletes the specified Attribute definition. Fails if the Attribute definition is referenced by any User data mapping, or the latest revision of any Consent. */
export interface DeleteProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest {
  /** Required. The resource name of the Attribute definition to delete. To preserve referential integrity, Attribute definitions referenced by a User data mapping or the latest revision of a Consent cannot be deleted. */
  name: string;
}

export const DeleteProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/attributeDefinitions/{attributeDefinitionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest>;

export type DeleteProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse = Empty;
export const DeleteProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse = Empty;

export type DeleteProjectsLocationsDatasetsConsentStoresAttributeDefinitionsError = CommonErrors;

export const deleteProjectsLocationsDatasetsConsentStoresAttributeDefinitions: API.OperationMethod<DeleteProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest, DeleteProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse, DeleteProjectsLocationsDatasetsConsentStoresAttributeDefinitionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest,
  output: DeleteProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse,
  errors: [],
}));

/** Gets the specified Attribute definition. */
export interface GetProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest {
  /** Required. The resource name of the Attribute definition to get. */
  name: string;
}

export const GetProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/attributeDefinitions/{attributeDefinitionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest>;

export type GetProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse = AttributeDefinition;
export const GetProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse = AttributeDefinition;

export type GetProjectsLocationsDatasetsConsentStoresAttributeDefinitionsError = CommonErrors;

export const getProjectsLocationsDatasetsConsentStoresAttributeDefinitions: API.OperationMethod<GetProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest, GetProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse, GetProjectsLocationsDatasetsConsentStoresAttributeDefinitionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest,
  output: GetProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse,
  errors: [],
}));

/** Lists the Attribute definitions in the specified consent store. */
export interface ListProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest {
  /** Optional. Limit on the number of Attribute definitions to return in a single response. If not specified, 100 is used. May not be larger than 1000. */
  pageSize?: number;
  /** Required. Name of the consent store to retrieve Attribute definitions from. */
  parent: string;
  /** Optional. Token to retrieve the next page of results or empty to get the first page. */
  pageToken?: string;
  /** Optional. Restricts the attributes returned to those matching a filter. The only field available for filtering is `category`. For example, `filter=category=\"REQUEST\"`. */
  filter?: string;
}

export const ListProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/attributeDefinitions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest>;

export type ListProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse = ListAttributeDefinitionsResponse;
export const ListProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse = ListAttributeDefinitionsResponse;

export type ListProjectsLocationsDatasetsConsentStoresAttributeDefinitionsError = CommonErrors;

export const listProjectsLocationsDatasetsConsentStoresAttributeDefinitions = API.makePaginated(() => ({
  input: ListProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest,
  output: ListProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the specified Attribute definition. */
export interface PatchProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest {
  /** Identifier. Resource name of the Attribute definition, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/attributeDefinitions/{attribute_definition_id}`. Cannot be changed after creation. */
  name: string;
  /** Required. The update mask that applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. Only the `description`, `allowed_values`, `consent_default_values` and `data_mapping_default_value` fields can be updated. The updated `allowed_values` must contain all values from the previous `allowed_values`. */
  updateMask?: string;
  /** Request body */
  body?: AttributeDefinition;
}

export const PatchProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(AttributeDefinition).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/attributeDefinitions/{attributeDefinitionsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest>;

export type PatchProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse = AttributeDefinition;
export const PatchProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse = AttributeDefinition;

export type PatchProjectsLocationsDatasetsConsentStoresAttributeDefinitionsError = CommonErrors;

export const patchProjectsLocationsDatasetsConsentStoresAttributeDefinitions: API.OperationMethod<PatchProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest, PatchProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse, PatchProjectsLocationsDatasetsConsentStoresAttributeDefinitionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDatasetsConsentStoresAttributeDefinitionsRequest,
  output: PatchProjectsLocationsDatasetsConsentStoresAttributeDefinitionsResponse,
  errors: [],
}));

/** Gets the specified Consent artifact. */
export interface GetProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest {
  /** Required. The resource name of the Consent artifact to retrieve. */
  name: string;
}

export const GetProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/consentArtifacts/{consentArtifactsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest>;

export type GetProjectsLocationsDatasetsConsentStoresConsentArtifactsResponse = ConsentArtifact;
export const GetProjectsLocationsDatasetsConsentStoresConsentArtifactsResponse = ConsentArtifact;

export type GetProjectsLocationsDatasetsConsentStoresConsentArtifactsError = CommonErrors;

export const getProjectsLocationsDatasetsConsentStoresConsentArtifacts: API.OperationMethod<GetProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest, GetProjectsLocationsDatasetsConsentStoresConsentArtifactsResponse, GetProjectsLocationsDatasetsConsentStoresConsentArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest,
  output: GetProjectsLocationsDatasetsConsentStoresConsentArtifactsResponse,
  errors: [],
}));

/** Creates a new Consent artifact in the parent consent store. */
export interface CreateProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest {
  /** Required. The name of the consent store this Consent artifact belongs to. */
  parent: string;
  /** Request body */
  body?: ConsentArtifact;
}

export const CreateProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ConsentArtifact).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/consentArtifacts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest>;

export type CreateProjectsLocationsDatasetsConsentStoresConsentArtifactsResponse = ConsentArtifact;
export const CreateProjectsLocationsDatasetsConsentStoresConsentArtifactsResponse = ConsentArtifact;

export type CreateProjectsLocationsDatasetsConsentStoresConsentArtifactsError = CommonErrors;

export const createProjectsLocationsDatasetsConsentStoresConsentArtifacts: API.OperationMethod<CreateProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest, CreateProjectsLocationsDatasetsConsentStoresConsentArtifactsResponse, CreateProjectsLocationsDatasetsConsentStoresConsentArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest,
  output: CreateProjectsLocationsDatasetsConsentStoresConsentArtifactsResponse,
  errors: [],
}));

/** Deletes the specified Consent artifact. Fails if the artifact is referenced by the latest revision of any Consent. */
export interface DeleteProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest {
  /** Required. The resource name of the Consent artifact to delete. To preserve referential integrity, Consent artifacts referenced by the latest revision of a Consent cannot be deleted. */
  name: string;
}

export const DeleteProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/consentArtifacts/{consentArtifactsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest>;

export type DeleteProjectsLocationsDatasetsConsentStoresConsentArtifactsResponse = Empty;
export const DeleteProjectsLocationsDatasetsConsentStoresConsentArtifactsResponse = Empty;

export type DeleteProjectsLocationsDatasetsConsentStoresConsentArtifactsError = CommonErrors;

export const deleteProjectsLocationsDatasetsConsentStoresConsentArtifacts: API.OperationMethod<DeleteProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest, DeleteProjectsLocationsDatasetsConsentStoresConsentArtifactsResponse, DeleteProjectsLocationsDatasetsConsentStoresConsentArtifactsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest,
  output: DeleteProjectsLocationsDatasetsConsentStoresConsentArtifactsResponse,
  errors: [],
}));

/** Lists the Consent artifacts in the specified consent store. */
export interface ListProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest {
  /** Required. Name of the consent store to retrieve consent artifacts from. */
  parent: string;
  /** Optional. Limit on the number of consent artifacts to return in a single response. If not specified, 100 is used. May not be larger than 1000. */
  pageSize?: number;
  /** Optional. Restricts the artifacts returned to those matching a filter. The following syntax is available: * A string field value can be written as text inside quotation marks, for example `"query text"`. The only valid relational operation for text fields is equality (`=`), where text is searched within the field, rather than having the field be equal to the text. For example, `"Comment = great"` returns messages with `great` in the comment field. * A number field value can be written as an integer, a decimal, or an exponential. The valid relational operators for number fields are the equality operator (`=`), along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * A date field value must be written in `yyyy-mm-dd` form. Fields with date and time use the RFC3339 time format. Leading zeros are required for one-digit months and days. The valid relational operators for date fields are the equality operator (`=`) , along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * Multiple field query expressions can be combined in one query by adding `AND` or `OR` operators between the expressions. If a boolean operator appears within a quoted string, it is not treated as special, it's just another part of the character string to be matched. You can prepend the `NOT` operator to an expression to negate it. The fields available for filtering are: - user_id. For example, `filter=user_id=\"user123\"`. - consent_content_version - metadata. For example, `filter=Metadata(\"testkey\")=\"value\"` or `filter=HasMetadata(\"testkey\")`. */
  filter?: string;
  /** Optional. The next_page_token value returned from the previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/consentArtifacts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest>;

export type ListProjectsLocationsDatasetsConsentStoresConsentArtifactsResponse = ListConsentArtifactsResponse;
export const ListProjectsLocationsDatasetsConsentStoresConsentArtifactsResponse = ListConsentArtifactsResponse;

export type ListProjectsLocationsDatasetsConsentStoresConsentArtifactsError = CommonErrors;

export const listProjectsLocationsDatasetsConsentStoresConsentArtifacts = API.makePaginated(() => ({
  input: ListProjectsLocationsDatasetsConsentStoresConsentArtifactsRequest,
  output: ListProjectsLocationsDatasetsConsentStoresConsentArtifactsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the Consent in the given consent store, returning each Consent's latest revision. */
export interface ListProjectsLocationsDatasetsConsentStoresConsentsRequest {
  /** Optional. Restricts the Consents returned to those matching a filter. The following syntax is available: * A string field value can be written as text inside quotation marks, for example `"query text"`. The only valid relational operation for text fields is equality (`=`), where text is searched within the field, rather than having the field be equal to the text. For example, `"Comment = great"` returns messages with `great` in the comment field. * A number field value can be written as an integer, a decimal, or an exponential. The valid relational operators for number fields are the equality operator (`=`), along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * A date field value must be written in `yyyy-mm-dd` form. Fields with date and time use the RFC3339 time format. Leading zeros are required for one-digit months and days. The valid relational operators for date fields are the equality operator (`=`) , along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * Multiple field query expressions can be combined in one query by adding `AND` or `OR` operators between the expressions. If a boolean operator appears within a quoted string, it is not treated as special, it's just another part of the character string to be matched. You can prepend the `NOT` operator to an expression to negate it. The fields available for filtering are: - user_id. For example, `filter='user_id="user123"'`. - consent_artifact - state - revision_create_time - metadata. For example, `filter=Metadata(\"testkey\")=\"value\"` or `filter=HasMetadata(\"testkey\")`. */
  filter?: string;
  /** Required. Name of the consent store to retrieve Consents from. */
  parent: string;
  /** Optional. Limit on the number of Consents to return in a single response. If not specified, 100 is used. May not be larger than 1000. */
  pageSize?: number;
  /** Optional. The next_page_token value returned from the previous List request, if any. */
  pageToken?: string;
}

export const ListProjectsLocationsDatasetsConsentStoresConsentsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/consents" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDatasetsConsentStoresConsentsRequest>;

export type ListProjectsLocationsDatasetsConsentStoresConsentsResponse = ListConsentsResponse;
export const ListProjectsLocationsDatasetsConsentStoresConsentsResponse = ListConsentsResponse;

export type ListProjectsLocationsDatasetsConsentStoresConsentsError = CommonErrors;

export const listProjectsLocationsDatasetsConsentStoresConsents = API.makePaginated(() => ({
  input: ListProjectsLocationsDatasetsConsentStoresConsentsRequest,
  output: ListProjectsLocationsDatasetsConsentStoresConsentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the specified revision of a Consent, or the latest revision if `revision_id` is not specified in the resource name. */
export interface GetProjectsLocationsDatasetsConsentStoresConsentsRequest {
  /** Required. The resource name of the Consent to retrieve, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`. In order to retrieve a previous revision of the Consent, also provide the revision ID: `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}@{revision_id}` */
  name: string;
}

export const GetProjectsLocationsDatasetsConsentStoresConsentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/consents/{consentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDatasetsConsentStoresConsentsRequest>;

export type GetProjectsLocationsDatasetsConsentStoresConsentsResponse = Consent;
export const GetProjectsLocationsDatasetsConsentStoresConsentsResponse = Consent;

export type GetProjectsLocationsDatasetsConsentStoresConsentsError = CommonErrors;

export const getProjectsLocationsDatasetsConsentStoresConsents: API.OperationMethod<GetProjectsLocationsDatasetsConsentStoresConsentsRequest, GetProjectsLocationsDatasetsConsentStoresConsentsResponse, GetProjectsLocationsDatasetsConsentStoresConsentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDatasetsConsentStoresConsentsRequest,
  output: GetProjectsLocationsDatasetsConsentStoresConsentsResponse,
  errors: [],
}));

/** Deletes the Consent and its revisions. To keep a record of the Consent but mark it inactive, see [RevokeConsent]. To delete a revision of a Consent, see [DeleteConsentRevision]. This operation does not delete the related Consent artifact. */
export interface DeleteProjectsLocationsDatasetsConsentStoresConsentsRequest {
  /** Required. The resource name of the Consent to delete, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`. An INVALID_ARGUMENT error occurs if `revision_id` is specified in the name. */
  name: string;
}

export const DeleteProjectsLocationsDatasetsConsentStoresConsentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/consents/{consentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatasetsConsentStoresConsentsRequest>;

export type DeleteProjectsLocationsDatasetsConsentStoresConsentsResponse = Empty;
export const DeleteProjectsLocationsDatasetsConsentStoresConsentsResponse = Empty;

export type DeleteProjectsLocationsDatasetsConsentStoresConsentsError = CommonErrors;

export const deleteProjectsLocationsDatasetsConsentStoresConsents: API.OperationMethod<DeleteProjectsLocationsDatasetsConsentStoresConsentsRequest, DeleteProjectsLocationsDatasetsConsentStoresConsentsResponse, DeleteProjectsLocationsDatasetsConsentStoresConsentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatasetsConsentStoresConsentsRequest,
  output: DeleteProjectsLocationsDatasetsConsentStoresConsentsResponse,
  errors: [],
}));

/** Rejects the latest revision of the specified Consent by committing a new revision with `state` updated to `REJECTED`. If the latest revision of the specified Consent is in the `REJECTED` state, no new revision is committed. A FAILED_PRECONDITION error occurs if the latest revision of the specified Consent is in the `ACTIVE` or `REVOKED` state. */
export interface RejectProjectsLocationsDatasetsConsentStoresConsentsRequest {
  /** Required. The resource name of the Consent to reject, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`. An INVALID_ARGUMENT error occurs if `revision_id` is specified in the name. */
  name: string;
  /** Request body */
  body?: RejectConsentRequest;
}

export const RejectProjectsLocationsDatasetsConsentStoresConsentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RejectConsentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/consents/{consentsId}:reject", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RejectProjectsLocationsDatasetsConsentStoresConsentsRequest>;

export type RejectProjectsLocationsDatasetsConsentStoresConsentsResponse = Consent;
export const RejectProjectsLocationsDatasetsConsentStoresConsentsResponse = Consent;

export type RejectProjectsLocationsDatasetsConsentStoresConsentsError = CommonErrors;

export const rejectProjectsLocationsDatasetsConsentStoresConsents: API.OperationMethod<RejectProjectsLocationsDatasetsConsentStoresConsentsRequest, RejectProjectsLocationsDatasetsConsentStoresConsentsResponse, RejectProjectsLocationsDatasetsConsentStoresConsentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RejectProjectsLocationsDatasetsConsentStoresConsentsRequest,
  output: RejectProjectsLocationsDatasetsConsentStoresConsentsResponse,
  errors: [],
}));

/** Updates the latest revision of the specified Consent by committing a new revision with the changes. A FAILED_PRECONDITION error occurs if the latest revision of the specified Consent is in the `REJECTED` or `REVOKED` state. */
export interface PatchProjectsLocationsDatasetsConsentStoresConsentsRequest {
  /** Identifier. Resource name of the Consent, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`. Cannot be changed after creation. */
  name: string;
  /** Required. The update mask to apply to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask. Only the `user_id`, `policies`, `consent_artifact`, and `metadata` fields can be updated. */
  updateMask?: string;
  /** Request body */
  body?: Consent;
}

export const PatchProjectsLocationsDatasetsConsentStoresConsentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Consent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/consents/{consentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDatasetsConsentStoresConsentsRequest>;

export type PatchProjectsLocationsDatasetsConsentStoresConsentsResponse = Consent;
export const PatchProjectsLocationsDatasetsConsentStoresConsentsResponse = Consent;

export type PatchProjectsLocationsDatasetsConsentStoresConsentsError = CommonErrors;

export const patchProjectsLocationsDatasetsConsentStoresConsents: API.OperationMethod<PatchProjectsLocationsDatasetsConsentStoresConsentsRequest, PatchProjectsLocationsDatasetsConsentStoresConsentsResponse, PatchProjectsLocationsDatasetsConsentStoresConsentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDatasetsConsentStoresConsentsRequest,
  output: PatchProjectsLocationsDatasetsConsentStoresConsentsResponse,
  errors: [],
}));

/** Deletes the specified revision of a Consent. An INVALID_ARGUMENT error occurs if the specified revision is the latest revision. */
export interface DeleteRevisionProjectsLocationsDatasetsConsentStoresConsentsRequest {
  /** Required. The resource name of the Consent revision to delete, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}@{revision_id}`. An INVALID_ARGUMENT error occurs if `revision_id` is not specified in the name. */
  name: string;
}

export const DeleteRevisionProjectsLocationsDatasetsConsentStoresConsentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/consents/{consentsId}:deleteRevision" }),
  svc,
) as unknown as Schema.Schema<DeleteRevisionProjectsLocationsDatasetsConsentStoresConsentsRequest>;

export type DeleteRevisionProjectsLocationsDatasetsConsentStoresConsentsResponse = Empty;
export const DeleteRevisionProjectsLocationsDatasetsConsentStoresConsentsResponse = Empty;

export type DeleteRevisionProjectsLocationsDatasetsConsentStoresConsentsError = CommonErrors;

export const deleteRevisionProjectsLocationsDatasetsConsentStoresConsents: API.OperationMethod<DeleteRevisionProjectsLocationsDatasetsConsentStoresConsentsRequest, DeleteRevisionProjectsLocationsDatasetsConsentStoresConsentsResponse, DeleteRevisionProjectsLocationsDatasetsConsentStoresConsentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteRevisionProjectsLocationsDatasetsConsentStoresConsentsRequest,
  output: DeleteRevisionProjectsLocationsDatasetsConsentStoresConsentsResponse,
  errors: [],
}));

/** Revokes the latest revision of the specified Consent by committing a new revision with `state` updated to `REVOKED`. If the latest revision of the specified Consent is in the `REVOKED` state, no new revision is committed. A FAILED_PRECONDITION error occurs if the latest revision of the given consent is in `DRAFT` or `REJECTED` state. */
export interface RevokeProjectsLocationsDatasetsConsentStoresConsentsRequest {
  /** Required. The resource name of the Consent to revoke, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`. An INVALID_ARGUMENT error occurs if `revision_id` is specified in the name. */
  name: string;
  /** Request body */
  body?: RevokeConsentRequest;
}

export const RevokeProjectsLocationsDatasetsConsentStoresConsentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RevokeConsentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/consents/{consentsId}:revoke", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevokeProjectsLocationsDatasetsConsentStoresConsentsRequest>;

export type RevokeProjectsLocationsDatasetsConsentStoresConsentsResponse = Consent;
export const RevokeProjectsLocationsDatasetsConsentStoresConsentsResponse = Consent;

export type RevokeProjectsLocationsDatasetsConsentStoresConsentsError = CommonErrors;

export const revokeProjectsLocationsDatasetsConsentStoresConsents: API.OperationMethod<RevokeProjectsLocationsDatasetsConsentStoresConsentsRequest, RevokeProjectsLocationsDatasetsConsentStoresConsentsResponse, RevokeProjectsLocationsDatasetsConsentStoresConsentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevokeProjectsLocationsDatasetsConsentStoresConsentsRequest,
  output: RevokeProjectsLocationsDatasetsConsentStoresConsentsResponse,
  errors: [],
}));

/** Activates the latest revision of the specified Consent by committing a new revision with `state` updated to `ACTIVE`. If the latest revision of the specified Consent is in the `ACTIVE` state, no new revision is committed. A FAILED_PRECONDITION error occurs if the latest revision of the specified Consent is in the `REJECTED` or `REVOKED` state. */
export interface ActivateProjectsLocationsDatasetsConsentStoresConsentsRequest {
  /** Required. The resource name of the Consent to activate, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/consentStores/{consent_store_id}/consents/{consent_id}`. An INVALID_ARGUMENT error occurs if `revision_id` is specified in the name. */
  name: string;
  /** Request body */
  body?: ActivateConsentRequest;
}

export const ActivateProjectsLocationsDatasetsConsentStoresConsentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ActivateConsentRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/consents/{consentsId}:activate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ActivateProjectsLocationsDatasetsConsentStoresConsentsRequest>;

export type ActivateProjectsLocationsDatasetsConsentStoresConsentsResponse = Consent;
export const ActivateProjectsLocationsDatasetsConsentStoresConsentsResponse = Consent;

export type ActivateProjectsLocationsDatasetsConsentStoresConsentsError = CommonErrors;

export const activateProjectsLocationsDatasetsConsentStoresConsents: API.OperationMethod<ActivateProjectsLocationsDatasetsConsentStoresConsentsRequest, ActivateProjectsLocationsDatasetsConsentStoresConsentsResponse, ActivateProjectsLocationsDatasetsConsentStoresConsentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ActivateProjectsLocationsDatasetsConsentStoresConsentsRequest,
  output: ActivateProjectsLocationsDatasetsConsentStoresConsentsResponse,
  errors: [],
}));

/** Creates a new Consent in the parent consent store. */
export interface CreateProjectsLocationsDatasetsConsentStoresConsentsRequest {
  /** Required. Name of the consent store. */
  parent: string;
  /** Request body */
  body?: Consent;
}

export const CreateProjectsLocationsDatasetsConsentStoresConsentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Consent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/consents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDatasetsConsentStoresConsentsRequest>;

export type CreateProjectsLocationsDatasetsConsentStoresConsentsResponse = Consent;
export const CreateProjectsLocationsDatasetsConsentStoresConsentsResponse = Consent;

export type CreateProjectsLocationsDatasetsConsentStoresConsentsError = CommonErrors;

export const createProjectsLocationsDatasetsConsentStoresConsents: API.OperationMethod<CreateProjectsLocationsDatasetsConsentStoresConsentsRequest, CreateProjectsLocationsDatasetsConsentStoresConsentsResponse, CreateProjectsLocationsDatasetsConsentStoresConsentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDatasetsConsentStoresConsentsRequest,
  output: CreateProjectsLocationsDatasetsConsentStoresConsentsResponse,
  errors: [],
}));

/** Lists the revisions of the specified Consent in reverse chronological order. */
export interface ListRevisionsProjectsLocationsDatasetsConsentStoresConsentsRequest {
  /** Optional. Restricts the revisions returned to those matching a filter. The following syntax is available: * A string field value can be written as text inside quotation marks, for example `"query text"`. The only valid relational operation for text fields is equality (`=`), where text is searched within the field, rather than having the field be equal to the text. For example, `"Comment = great"` returns messages with `great` in the comment field. * A number field value can be written as an integer, a decimal, or an exponential. The valid relational operators for number fields are the equality operator (`=`), along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * A date field value must be written in `yyyy-mm-dd` form. Fields with date and time use the RFC3339 time format. Leading zeros are required for one-digit months and days. The valid relational operators for date fields are the equality operator (`=`) , along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * Multiple field query expressions can be combined in one query by adding `AND` or `OR` operators between the expressions. If a boolean operator appears within a quoted string, it is not treated as special, it's just another part of the character string to be matched. You can prepend the `NOT` operator to an expression to negate it. Fields available for filtering are: - user_id. For example, `filter='user_id="user123"'`. - consent_artifact - state - revision_create_time - metadata. For example, `filter=Metadata(\"testkey\")=\"value\"` or `filter=HasMetadata(\"testkey\")`. */
  filter?: string;
  /** Required. The resource name of the Consent to retrieve revisions for. */
  name: string;
  /** Optional. Token to retrieve the next page of results or empty if there are no more results in the list. */
  pageToken?: string;
  /** Optional. Limit on the number of revisions to return in a single response. If not specified, 100 is used. May not be larger than 1000. */
  pageSize?: number;
}

export const ListRevisionsProjectsLocationsDatasetsConsentStoresConsentsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/consentStores/{consentStoresId}/consents/{consentsId}:listRevisions" }),
  svc,
) as unknown as Schema.Schema<ListRevisionsProjectsLocationsDatasetsConsentStoresConsentsRequest>;

export type ListRevisionsProjectsLocationsDatasetsConsentStoresConsentsResponse = ListConsentRevisionsResponse;
export const ListRevisionsProjectsLocationsDatasetsConsentStoresConsentsResponse = ListConsentRevisionsResponse;

export type ListRevisionsProjectsLocationsDatasetsConsentStoresConsentsError = CommonErrors;

export const listRevisionsProjectsLocationsDatasetsConsentStoresConsents = API.makePaginated(() => ({
  input: ListRevisionsProjectsLocationsDatasetsConsentStoresConsentsRequest,
  output: ListRevisionsProjectsLocationsDatasetsConsentStoresConsentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the specified DICOM store. */
export interface GetProjectsLocationsDatasetsDicomStoresRequest {
  /** Required. The resource name of the DICOM store to get. */
  name: string;
}

export const GetProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDatasetsDicomStoresRequest>;

export type GetProjectsLocationsDatasetsDicomStoresResponse = DicomStore;
export const GetProjectsLocationsDatasetsDicomStoresResponse = DicomStore;

export type GetProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const getProjectsLocationsDatasetsDicomStores: API.OperationMethod<GetProjectsLocationsDatasetsDicomStoresRequest, GetProjectsLocationsDatasetsDicomStoresResponse, GetProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDatasetsDicomStoresRequest,
  output: GetProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** SearchForInstances returns a list of matching instances. See [Search Transaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6). For details on the implementation of SearchForInstances, see [Search transaction](https://cloud.google.com/healthcare/docs/dicom#search_transaction) in the Cloud Healthcare API conformance statement. For samples that show how to call SearchForInstances, see [Search for DICOM data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#search-dicom). */
export interface SearchForInstancesProjectsLocationsDatasetsDicomStoresRequest {
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
  /** Required. The path of the SearchForInstancesRequest DICOMweb request. For example, `instances`, `studies/{study_uid}/series/{series_uid}/instances`, or `studies/{study_uid}/instances`. */
  dicomWebPath: string;
}

export const SearchForInstancesProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/instances" }),
  svc,
) as unknown as Schema.Schema<SearchForInstancesProjectsLocationsDatasetsDicomStoresRequest>;

export type SearchForInstancesProjectsLocationsDatasetsDicomStoresResponse = HttpBody;
export const SearchForInstancesProjectsLocationsDatasetsDicomStoresResponse = HttpBody;

export type SearchForInstancesProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const searchForInstancesProjectsLocationsDatasetsDicomStores: API.OperationMethod<SearchForInstancesProjectsLocationsDatasetsDicomStoresRequest, SearchForInstancesProjectsLocationsDatasetsDicomStoresResponse, SearchForInstancesProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchForInstancesProjectsLocationsDatasetsDicomStoresRequest,
  output: SearchForInstancesProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** Imports data into the DICOM store by copying it from the specified source. Errors are logged to Cloud Logging. For more information, see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging). The metadata field type is OperationMetadata. */
export interface ImportProjectsLocationsDatasetsDicomStoresRequest {
  /** Required. The name of the DICOM store resource into which the data is imported. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  name: string;
  /** Request body */
  body?: ImportDicomDataRequest;
}

export const ImportProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ImportDicomDataRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsDatasetsDicomStoresRequest>;

export type ImportProjectsLocationsDatasetsDicomStoresResponse = Operation;
export const ImportProjectsLocationsDatasetsDicomStoresResponse = Operation;

export type ImportProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const importProjectsLocationsDatasetsDicomStores: API.OperationMethod<ImportProjectsLocationsDatasetsDicomStoresRequest, ImportProjectsLocationsDatasetsDicomStoresResponse, ImportProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsDatasetsDicomStoresRequest,
  output: ImportProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsDatasetsDicomStoresRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDatasetsDicomStoresRequest>;

export type TestIamPermissionsProjectsLocationsDatasetsDicomStoresResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDatasetsDicomStoresResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const testIamPermissionsProjectsLocationsDatasetsDicomStores: API.OperationMethod<TestIamPermissionsProjectsLocationsDatasetsDicomStoresRequest, TestIamPermissionsProjectsLocationsDatasetsDicomStoresResponse, TestIamPermissionsProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDatasetsDicomStoresRequest,
  output: TestIamPermissionsProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsDatasetsDicomStoresRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDatasetsDicomStoresRequest>;

export type SetIamPolicyProjectsLocationsDatasetsDicomStoresResponse = Policy;
export const SetIamPolicyProjectsLocationsDatasetsDicomStoresResponse = Policy;

export type SetIamPolicyProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const setIamPolicyProjectsLocationsDatasetsDicomStores: API.OperationMethod<SetIamPolicyProjectsLocationsDatasetsDicomStoresRequest, SetIamPolicyProjectsLocationsDatasetsDicomStoresResponse, SetIamPolicyProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDatasetsDicomStoresRequest,
  output: SetIamPolicyProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** Lists the DICOM stores in the given dataset. */
export interface ListProjectsLocationsDatasetsDicomStoresRequest {
  /** The next_page_token value returned from the previous List request, if any. */
  pageToken?: string;
  /** Restricts stores returned to those matching a filter. The following syntax is available: * A string field value can be written as text inside quotation marks, for example `"query text"`. The only valid relational operation for text fields is equality (`=`), where text is searched within the field, rather than having the field be equal to the text. For example, `"Comment = great"` returns messages with `great` in the comment field. * A number field value can be written as an integer, a decimal, or an exponential. The valid relational operators for number fields are the equality operator (`=`), along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * A date field value must be written in `yyyy-mm-dd` form. Fields with date and time use the RFC3339 time format. Leading zeros are required for one-digit months and days. The valid relational operators for date fields are the equality operator (`=`) , along with the less than/greater than operators (`<`, `<=`, `>`, `>=`). Note that there is no inequality (`!=`) operator. You can prepend the `NOT` operator to an expression to negate it. * Multiple field query expressions can be combined in one query by adding `AND` or `OR` operators between the expressions. If a boolean operator appears within a quoted string, it is not treated as special, it's just another part of the character string to be matched. You can prepend the `NOT` operator to an expression to negate it. Only filtering on labels is supported. For example, `labels.key=value`. */
  filter?: string;
  /** Required. Name of the dataset. */
  parent: string;
  /** Limit on the number of DICOM stores to return in a single response. If not specified, 100 is used. May not be larger than 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDatasetsDicomStoresRequest>;

export type ListProjectsLocationsDatasetsDicomStoresResponse = ListDicomStoresResponse;
export const ListProjectsLocationsDatasetsDicomStoresResponse = ListDicomStoresResponse;

export type ListProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const listProjectsLocationsDatasetsDicomStores = API.makePaginated(() => ({
  input: ListProjectsLocationsDatasetsDicomStoresRequest,
  output: ListProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** StoreInstances stores DICOM instances associated with study instance unique identifiers (SUID). See [Store Transaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.5). For details on the implementation of StoreInstances, see [Store transaction](https://cloud.google.com/healthcare/docs/dicom#store_transaction) in the Cloud Healthcare API conformance statement. For samples that show how to call StoreInstances, see [Store DICOM data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#store-dicom). */
export interface StoreInstancesProjectsLocationsDatasetsDicomStoresRequest {
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
  /** Required. The path of the StoreInstances DICOMweb request. For example, `studies/[{study_uid}]`. Note that the `study_uid` is optional. */
  dicomWebPath: string;
  /** Request body */
  body?: HttpBody;
}

export const StoreInstancesProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
  body: Schema.optional(HttpBody).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StoreInstancesProjectsLocationsDatasetsDicomStoresRequest>;

export type StoreInstancesProjectsLocationsDatasetsDicomStoresResponse = HttpBody;
export const StoreInstancesProjectsLocationsDatasetsDicomStoresResponse = HttpBody;

export type StoreInstancesProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const storeInstancesProjectsLocationsDatasetsDicomStores: API.OperationMethod<StoreInstancesProjectsLocationsDatasetsDicomStoresRequest, StoreInstancesProjectsLocationsDatasetsDicomStoresResponse, StoreInstancesProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StoreInstancesProjectsLocationsDatasetsDicomStoresRequest,
  output: StoreInstancesProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** SearchForSeries returns a list of matching series. See [Search Transaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6). For details on the implementation of SearchForSeries, see [Search transaction](https://cloud.google.com/healthcare/docs/dicom#search_transaction) in the Cloud Healthcare API conformance statement. For samples that show how to call SearchForSeries, see [Search for DICOM data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#search-dicom). */
export interface SearchForSeriesProjectsLocationsDatasetsDicomStoresRequest {
  /** Required. The path of the SearchForSeries DICOMweb request. For example, `series` or `studies/{study_uid}/series`. */
  dicomWebPath: string;
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
}

export const SearchForSeriesProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/series" }),
  svc,
) as unknown as Schema.Schema<SearchForSeriesProjectsLocationsDatasetsDicomStoresRequest>;

export type SearchForSeriesProjectsLocationsDatasetsDicomStoresResponse = HttpBody;
export const SearchForSeriesProjectsLocationsDatasetsDicomStoresResponse = HttpBody;

export type SearchForSeriesProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const searchForSeriesProjectsLocationsDatasetsDicomStores: API.OperationMethod<SearchForSeriesProjectsLocationsDatasetsDicomStoresRequest, SearchForSeriesProjectsLocationsDatasetsDicomStoresResponse, SearchForSeriesProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchForSeriesProjectsLocationsDatasetsDicomStoresRequest,
  output: SearchForSeriesProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** SearchForStudies returns a list of matching studies. See [Search Transaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6). For details on the implementation of SearchForStudies, see [Search transaction](https://cloud.google.com/healthcare/docs/dicom#search_transaction) in the Cloud Healthcare API conformance statement. For samples that show how to call SearchForStudies, see [Search for DICOM data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#search-dicom). */
export interface SearchForStudiesProjectsLocationsDatasetsDicomStoresRequest {
  /** Required. The path of the SearchForStudies DICOMweb request. For example, `studies`. */
  dicomWebPath: string;
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
}

export const SearchForStudiesProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies" }),
  svc,
) as unknown as Schema.Schema<SearchForStudiesProjectsLocationsDatasetsDicomStoresRequest>;

export type SearchForStudiesProjectsLocationsDatasetsDicomStoresResponse = HttpBody;
export const SearchForStudiesProjectsLocationsDatasetsDicomStoresResponse = HttpBody;

export type SearchForStudiesProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const searchForStudiesProjectsLocationsDatasetsDicomStores: API.OperationMethod<SearchForStudiesProjectsLocationsDatasetsDicomStoresRequest, SearchForStudiesProjectsLocationsDatasetsDicomStoresResponse, SearchForStudiesProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchForStudiesProjectsLocationsDatasetsDicomStoresRequest,
  output: SearchForStudiesProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** Deletes the specified DICOM store and removes all images that are contained within it. */
export interface DeleteProjectsLocationsDatasetsDicomStoresRequest {
  /** Required. The resource name of the DICOM store to delete. */
  name: string;
}

export const DeleteProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatasetsDicomStoresRequest>;

export type DeleteProjectsLocationsDatasetsDicomStoresResponse = Empty;
export const DeleteProjectsLocationsDatasetsDicomStoresResponse = Empty;

export type DeleteProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const deleteProjectsLocationsDatasetsDicomStores: API.OperationMethod<DeleteProjectsLocationsDatasetsDicomStoresRequest, DeleteProjectsLocationsDatasetsDicomStoresResponse, DeleteProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatasetsDicomStoresRequest,
  output: DeleteProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** De-identifies data from the source store and writes it to the destination store. The metadata field type is OperationMetadata. If the request is successful, the response field type is DeidentifyDicomStoreSummary. If errors occur, error is set. The LRO result may still be successful if de-identification fails for some DICOM instances. The output DICOM store will not contain these failed resources. Failed resource totals are tracked in Operation.metadata. Error details are also logged to Cloud Logging (see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging)). */
export interface DeidentifyProjectsLocationsDatasetsDicomStoresRequest {
  /** Required. Source DICOM store resource name. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  sourceStore: string;
  /** Request body */
  body?: DeidentifyDicomStoreRequest;
}

export const DeidentifyProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  sourceStore: Schema.String.pipe(T.HttpPath("sourceStore")),
  body: Schema.optional(DeidentifyDicomStoreRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}:deidentify", hasBody: true }),
  svc,
) as unknown as Schema.Schema<DeidentifyProjectsLocationsDatasetsDicomStoresRequest>;

export type DeidentifyProjectsLocationsDatasetsDicomStoresResponse = Operation;
export const DeidentifyProjectsLocationsDatasetsDicomStoresResponse = Operation;

export type DeidentifyProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const deidentifyProjectsLocationsDatasetsDicomStores: API.OperationMethod<DeidentifyProjectsLocationsDatasetsDicomStoresRequest, DeidentifyProjectsLocationsDatasetsDicomStoresResponse, DeidentifyProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeidentifyProjectsLocationsDatasetsDicomStoresRequest,
  output: DeidentifyProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** Creates a new DICOM store within the parent dataset. */
export interface CreateProjectsLocationsDatasetsDicomStoresRequest {
  /** Required. The name of the dataset this DICOM store belongs to. */
  parent: string;
  /** Required. The ID of the DICOM store that is being created. Any string value up to 256 characters in length. */
  dicomStoreId?: string;
  /** Request body */
  body?: DicomStore;
}

export const CreateProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dicomStoreId: Schema.optional(Schema.String).pipe(T.HttpQuery("dicomStoreId")),
  body: Schema.optional(DicomStore).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDatasetsDicomStoresRequest>;

export type CreateProjectsLocationsDatasetsDicomStoresResponse = DicomStore;
export const CreateProjectsLocationsDatasetsDicomStoresResponse = DicomStore;

export type CreateProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const createProjectsLocationsDatasetsDicomStores: API.OperationMethod<CreateProjectsLocationsDatasetsDicomStoresRequest, CreateProjectsLocationsDatasetsDicomStoresResponse, CreateProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDatasetsDicomStoresRequest,
  output: CreateProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** Exports data to the specified destination by copying it from the DICOM store. Errors are also logged to Cloud Logging. For more information, see [Viewing error logs in Cloud Logging](https://cloud.google.com/healthcare/docs/how-tos/logging). The metadata field type is OperationMetadata. */
export interface ExportProjectsLocationsDatasetsDicomStoresRequest {
  /** Required. The DICOM store resource name from which to export the data. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  name: string;
  /** Request body */
  body?: ExportDicomDataRequest;
}

export const ExportProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ExportDicomDataRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}:export", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportProjectsLocationsDatasetsDicomStoresRequest>;

export type ExportProjectsLocationsDatasetsDicomStoresResponse = Operation;
export const ExportProjectsLocationsDatasetsDicomStoresResponse = Operation;

export type ExportProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const exportProjectsLocationsDatasetsDicomStores: API.OperationMethod<ExportProjectsLocationsDatasetsDicomStoresRequest, ExportProjectsLocationsDatasetsDicomStoresResponse, ExportProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportProjectsLocationsDatasetsDicomStoresRequest,
  output: ExportProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** Gets metrics associated with the DICOM store. */
export interface GetDICOMStoreMetricsProjectsLocationsDatasetsDicomStoresRequest {
  /** Required. The resource name of the DICOM store to get metrics for. */
  name: string;
}

export const GetDICOMStoreMetricsProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}:getDICOMStoreMetrics" }),
  svc,
) as unknown as Schema.Schema<GetDICOMStoreMetricsProjectsLocationsDatasetsDicomStoresRequest>;

export type GetDICOMStoreMetricsProjectsLocationsDatasetsDicomStoresResponse = DicomStoreMetrics;
export const GetDICOMStoreMetricsProjectsLocationsDatasetsDicomStoresResponse = DicomStoreMetrics;

export type GetDICOMStoreMetricsProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const getDICOMStoreMetricsProjectsLocationsDatasetsDicomStores: API.OperationMethod<GetDICOMStoreMetricsProjectsLocationsDatasetsDicomStoresRequest, GetDICOMStoreMetricsProjectsLocationsDatasetsDicomStoresResponse, GetDICOMStoreMetricsProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDICOMStoreMetricsProjectsLocationsDatasetsDicomStoresRequest,
  output: GetDICOMStoreMetricsProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** SetBlobStorageSettings sets the blob storage settings of the specified resources. */
export interface SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresRequest {
  /** Required. The path of the resource to update the blob storage settings in the format of `projects/{projectID}/locations/{locationID}/datasets/{datasetID}/dicomStores/{dicomStoreID}/dicomWeb/studies/{studyUID}`, `projects/{projectID}/locations/{locationID}/datasets/{datasetID}/dicomStores/{dicomStoreID}/dicomWeb/studies/{studyUID}/series/{seriesUID}/`, or `projects/{projectID}/locations/{locationID}/datasets/{datasetID}/dicomStores/{dicomStoreID}/dicomWeb/studies/{studyUID}/series/{seriesUID}/instances/{instanceUID}`. If `filter_config` is specified, set the value of `resource` to the resource name of a DICOM store in the format `projects/{projectID}/locations/{locationID}/datasets/{datasetID}/dicomStores/{dicomStoreID}`. */
  resource: string;
  /** Request body */
  body?: SetBlobStorageSettingsRequest;
}

export const SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetBlobStorageSettingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}:setBlobStorageSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresRequest>;

export type SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresResponse = Operation;
export const SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresResponse = Operation;

export type SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const setBlobStorageSettingsProjectsLocationsDatasetsDicomStores: API.OperationMethod<SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresRequest, SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresResponse, SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresRequest,
  output: SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsDatasetsDicomStoresRequest {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDatasetsDicomStoresRequest>;

export type GetIamPolicyProjectsLocationsDatasetsDicomStoresResponse = Policy;
export const GetIamPolicyProjectsLocationsDatasetsDicomStoresResponse = Policy;

export type GetIamPolicyProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const getIamPolicyProjectsLocationsDatasetsDicomStores: API.OperationMethod<GetIamPolicyProjectsLocationsDatasetsDicomStoresRequest, GetIamPolicyProjectsLocationsDatasetsDicomStoresResponse, GetIamPolicyProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDatasetsDicomStoresRequest,
  output: GetIamPolicyProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** Updates the specified DICOM store. */
export interface PatchProjectsLocationsDatasetsDicomStoresRequest {
  /** Identifier. Resource name of the DICOM store, of the form `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  name: string;
  /** Required. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask */
  updateMask?: string;
  /** Request body */
  body?: DicomStore;
}

export const PatchProjectsLocationsDatasetsDicomStoresRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(DicomStore).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDatasetsDicomStoresRequest>;

export type PatchProjectsLocationsDatasetsDicomStoresResponse = DicomStore;
export const PatchProjectsLocationsDatasetsDicomStoresResponse = DicomStore;

export type PatchProjectsLocationsDatasetsDicomStoresError = CommonErrors;

export const patchProjectsLocationsDatasetsDicomStores: API.OperationMethod<PatchProjectsLocationsDatasetsDicomStoresRequest, PatchProjectsLocationsDatasetsDicomStoresResponse, PatchProjectsLocationsDatasetsDicomStoresError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDatasetsDicomStoresRequest,
  output: PatchProjectsLocationsDatasetsDicomStoresResponse,
  errors: [],
}));

/** RetrieveStudy returns all instances within the given study. See [RetrieveTransaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4). For details on the implementation of RetrieveStudy, see [DICOM study/series/instances](https://cloud.google.com/healthcare/docs/dicom#dicom_studyseriesinstances) in the Cloud Healthcare API conformance statement. For samples that show how to call RetrieveStudy, see [Retrieve DICOM data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieve-dicom). */
export interface RetrieveStudyProjectsLocationsDatasetsDicomStoresStudiesRequest {
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
  /** Required. The path of the RetrieveStudy DICOMweb request. For example, `studies/{study_uid}`. */
  dicomWebPath: string;
}

export const RetrieveStudyProjectsLocationsDatasetsDicomStoresStudiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}" }),
  svc,
) as unknown as Schema.Schema<RetrieveStudyProjectsLocationsDatasetsDicomStoresStudiesRequest>;

export type RetrieveStudyProjectsLocationsDatasetsDicomStoresStudiesResponse = HttpBody;
export const RetrieveStudyProjectsLocationsDatasetsDicomStoresStudiesResponse = HttpBody;

export type RetrieveStudyProjectsLocationsDatasetsDicomStoresStudiesError = CommonErrors;

export const retrieveStudyProjectsLocationsDatasetsDicomStoresStudies: API.OperationMethod<RetrieveStudyProjectsLocationsDatasetsDicomStoresStudiesRequest, RetrieveStudyProjectsLocationsDatasetsDicomStoresStudiesResponse, RetrieveStudyProjectsLocationsDatasetsDicomStoresStudiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveStudyProjectsLocationsDatasetsDicomStoresStudiesRequest,
  output: RetrieveStudyProjectsLocationsDatasetsDicomStoresStudiesResponse,
  errors: [],
}));

/** StoreInstances stores DICOM instances associated with study instance unique identifiers (SUID). See [Store Transaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.5). For details on the implementation of StoreInstances, see [Store transaction](https://cloud.google.com/healthcare/docs/dicom#store_transaction) in the Cloud Healthcare API conformance statement. For samples that show how to call StoreInstances, see [Store DICOM data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#store-dicom). */
export interface StoreInstancesProjectsLocationsDatasetsDicomStoresStudiesRequest {
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
  /** Required. The path of the StoreInstances DICOMweb request. For example, `studies/[{study_uid}]`. Note that the `study_uid` is optional. */
  dicomWebPath: string;
  /** Request body */
  body?: HttpBody;
}

export const StoreInstancesProjectsLocationsDatasetsDicomStoresStudiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
  body: Schema.optional(HttpBody).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StoreInstancesProjectsLocationsDatasetsDicomStoresStudiesRequest>;

export type StoreInstancesProjectsLocationsDatasetsDicomStoresStudiesResponse = HttpBody;
export const StoreInstancesProjectsLocationsDatasetsDicomStoresStudiesResponse = HttpBody;

export type StoreInstancesProjectsLocationsDatasetsDicomStoresStudiesError = CommonErrors;

export const storeInstancesProjectsLocationsDatasetsDicomStoresStudies: API.OperationMethod<StoreInstancesProjectsLocationsDatasetsDicomStoresStudiesRequest, StoreInstancesProjectsLocationsDatasetsDicomStoresStudiesResponse, StoreInstancesProjectsLocationsDatasetsDicomStoresStudiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StoreInstancesProjectsLocationsDatasetsDicomStoresStudiesRequest,
  output: StoreInstancesProjectsLocationsDatasetsDicomStoresStudiesResponse,
  errors: [],
}));

/** RetrieveStudyMetadata returns instance associated with the given study presented as metadata. See [RetrieveTransaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4). For details on the implementation of RetrieveStudyMetadata, see [Metadata resources](https://cloud.google.com/healthcare/docs/dicom#metadata_resources) in the Cloud Healthcare API conformance statement. For samples that show how to call RetrieveStudyMetadata, see [Retrieve metadata](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieve-metadata). */
export interface RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesRequest {
  /** Required. The path of the RetrieveStudyMetadata DICOMweb request. For example, `studies/{study_uid}/metadata`. */
  dicomWebPath: string;
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
}

export const RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesRequest = Schema.Struct({
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/metadata" }),
  svc,
) as unknown as Schema.Schema<RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesRequest>;

export type RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesResponse = HttpBody;
export const RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesResponse = HttpBody;

export type RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesError = CommonErrors;

export const retrieveMetadataProjectsLocationsDatasetsDicomStoresStudies: API.OperationMethod<RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesRequest, RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesResponse, RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesRequest,
  output: RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesResponse,
  errors: [],
}));

/** SearchForInstances returns a list of matching instances. See [Search Transaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6). For details on the implementation of SearchForInstances, see [Search transaction](https://cloud.google.com/healthcare/docs/dicom#search_transaction) in the Cloud Healthcare API conformance statement. For samples that show how to call SearchForInstances, see [Search for DICOM data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#search-dicom). */
export interface SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesRequest {
  /** Required. The path of the SearchForInstancesRequest DICOMweb request. For example, `instances`, `studies/{study_uid}/series/{series_uid}/instances`, or `studies/{study_uid}/instances`. */
  dicomWebPath: string;
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
}

export const SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesRequest = Schema.Struct({
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/instances" }),
  svc,
) as unknown as Schema.Schema<SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesRequest>;

export type SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesResponse = HttpBody;
export const SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesResponse = HttpBody;

export type SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesError = CommonErrors;

export const searchForInstancesProjectsLocationsDatasetsDicomStoresStudies: API.OperationMethod<SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesRequest, SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesResponse, SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesRequest,
  output: SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesResponse,
  errors: [],
}));

/** SearchForSeries returns a list of matching series. See [Search Transaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6). For details on the implementation of SearchForSeries, see [Search transaction](https://cloud.google.com/healthcare/docs/dicom#search_transaction) in the Cloud Healthcare API conformance statement. For samples that show how to call SearchForSeries, see [Search for DICOM data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#search-dicom). */
export interface SearchForSeriesProjectsLocationsDatasetsDicomStoresStudiesRequest {
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
  /** Required. The path of the SearchForSeries DICOMweb request. For example, `series` or `studies/{study_uid}/series`. */
  dicomWebPath: string;
}

export const SearchForSeriesProjectsLocationsDatasetsDicomStoresStudiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/series" }),
  svc,
) as unknown as Schema.Schema<SearchForSeriesProjectsLocationsDatasetsDicomStoresStudiesRequest>;

export type SearchForSeriesProjectsLocationsDatasetsDicomStoresStudiesResponse = HttpBody;
export const SearchForSeriesProjectsLocationsDatasetsDicomStoresStudiesResponse = HttpBody;

export type SearchForSeriesProjectsLocationsDatasetsDicomStoresStudiesError = CommonErrors;

export const searchForSeriesProjectsLocationsDatasetsDicomStoresStudies: API.OperationMethod<SearchForSeriesProjectsLocationsDatasetsDicomStoresStudiesRequest, SearchForSeriesProjectsLocationsDatasetsDicomStoresStudiesResponse, SearchForSeriesProjectsLocationsDatasetsDicomStoresStudiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchForSeriesProjectsLocationsDatasetsDicomStoresStudiesRequest,
  output: SearchForSeriesProjectsLocationsDatasetsDicomStoresStudiesResponse,
  errors: [],
}));

/** DeleteStudy deletes all instances within the given study. Delete requests are equivalent to the GET requests specified in the Retrieve transaction. The method returns an Operation which will be marked successful when the deletion is complete. Warning: Instances cannot be inserted into a study that is being deleted by an operation until the operation completes. For samples that show how to call DeleteStudy, see [Delete a study, series, or instance](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#delete-dicom). */
export interface DeleteProjectsLocationsDatasetsDicomStoresStudiesRequest {
  parent: string;
  /** Required. The path of the DeleteStudy request. For example, `studies/{study_uid}`. */
  dicomWebPath: string;
}

export const DeleteProjectsLocationsDatasetsDicomStoresStudiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatasetsDicomStoresStudiesRequest>;

export type DeleteProjectsLocationsDatasetsDicomStoresStudiesResponse = Operation;
export const DeleteProjectsLocationsDatasetsDicomStoresStudiesResponse = Operation;

export type DeleteProjectsLocationsDatasetsDicomStoresStudiesError = CommonErrors;

export const deleteProjectsLocationsDatasetsDicomStoresStudies: API.OperationMethod<DeleteProjectsLocationsDatasetsDicomStoresStudiesRequest, DeleteProjectsLocationsDatasetsDicomStoresStudiesResponse, DeleteProjectsLocationsDatasetsDicomStoresStudiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatasetsDicomStoresStudiesRequest,
  output: DeleteProjectsLocationsDatasetsDicomStoresStudiesResponse,
  errors: [],
}));

/** SearchForInstances returns a list of matching instances. See [Search Transaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.6). For details on the implementation of SearchForInstances, see [Search transaction](https://cloud.google.com/healthcare/docs/dicom#search_transaction) in the Cloud Healthcare API conformance statement. For samples that show how to call SearchForInstances, see [Search for DICOM data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#search-dicom). */
export interface SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest {
  /** Required. The path of the SearchForInstancesRequest DICOMweb request. For example, `instances`, `studies/{study_uid}/series/{series_uid}/instances`, or `studies/{study_uid}/instances`. */
  dicomWebPath: string;
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
}

export const SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest = Schema.Struct({
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/series/{seriesId}/instances" }),
  svc,
) as unknown as Schema.Schema<SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest>;

export type SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse = HttpBody;
export const SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse = HttpBody;

export type SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesSeriesError = CommonErrors;

export const searchForInstancesProjectsLocationsDatasetsDicomStoresStudiesSeries: API.OperationMethod<SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest, SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse, SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesSeriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest,
  output: SearchForInstancesProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse,
  errors: [],
}));

/** DeleteSeries deletes all instances within the given study and series. Delete requests are equivalent to the GET requests specified in the Retrieve transaction. The method returns an Operation which will be marked successful when the deletion is complete. Warning: Instances cannot be inserted into a series that is being deleted by an operation until the operation completes. For samples that show how to call DeleteSeries, see [Delete a study, series, or instance](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#delete-dicom). */
export interface DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest {
  /** Required. The path of the DeleteSeries request. For example, `studies/{study_uid}/series/{series_uid}`. */
  dicomWebPath: string;
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
}

export const DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest = Schema.Struct({
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/series/{seriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest>;

export type DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse = Operation;
export const DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse = Operation;

export type DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesError = CommonErrors;

export const deleteProjectsLocationsDatasetsDicomStoresStudiesSeries: API.OperationMethod<DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest, DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse, DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest,
  output: DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse,
  errors: [],
}));

/** RetrieveSeries returns all instances within the given study and series. See [RetrieveTransaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4). For details on the implementation of RetrieveSeries, see [DICOM study/series/instances](https://cloud.google.com/healthcare/docs/dicom#dicom_studyseriesinstances) in the Cloud Healthcare API conformance statement. For samples that show how to call RetrieveSeries, see [Retrieve DICOM data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieve-dicom). */
export interface RetrieveSeriesProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest {
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
  /** Required. The path of the RetrieveSeries DICOMweb request. For example, `studies/{study_uid}/series/{series_uid}`. */
  dicomWebPath: string;
}

export const RetrieveSeriesProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/series/{seriesId}" }),
  svc,
) as unknown as Schema.Schema<RetrieveSeriesProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest>;

export type RetrieveSeriesProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse = HttpBody;
export const RetrieveSeriesProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse = HttpBody;

export type RetrieveSeriesProjectsLocationsDatasetsDicomStoresStudiesSeriesError = CommonErrors;

export const retrieveSeriesProjectsLocationsDatasetsDicomStoresStudiesSeries: API.OperationMethod<RetrieveSeriesProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest, RetrieveSeriesProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse, RetrieveSeriesProjectsLocationsDatasetsDicomStoresStudiesSeriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveSeriesProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest,
  output: RetrieveSeriesProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse,
  errors: [],
}));

/** RetrieveSeriesMetadata returns instance associated with the given study and series, presented as metadata. See [RetrieveTransaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4). For details on the implementation of RetrieveSeriesMetadata, see [Metadata resources](https://cloud.google.com/healthcare/docs/dicom#metadata_resources) in the Cloud Healthcare API conformance statement. For samples that show how to call RetrieveSeriesMetadata, see [Retrieve metadata](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieve-metadata). */
export interface RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest {
  /** Required. The path of the RetrieveSeriesMetadata DICOMweb request. For example, `studies/{study_uid}/series/{series_uid}/metadata`. */
  dicomWebPath: string;
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
}

export const RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest = Schema.Struct({
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/series/{seriesId}/metadata" }),
  svc,
) as unknown as Schema.Schema<RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest>;

export type RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse = HttpBody;
export const RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse = HttpBody;

export type RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesError = CommonErrors;

export const retrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeries: API.OperationMethod<RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest, RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse, RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesRequest,
  output: RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesResponse,
  errors: [],
}));

/** RetrieveRenderedInstance returns instance associated with the given study, series, and SOP Instance UID in an acceptable Rendered Media Type. See [RetrieveTransaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4). For details on the implementation of RetrieveRenderedInstance, see [Rendered resources](https://cloud.google.com/healthcare/docs/dicom#rendered_resources) in the Cloud Healthcare API conformance statement. For samples that show how to call RetrieveRenderedInstance, see [Retrieve consumer image formats](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieve-consumer). */
export interface RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest {
  /** Required. The path of the RetrieveRenderedInstance DICOMweb request. For example, `studies/{study_uid}/series/{series_uid}/instances/{instance_uid}/rendered`. */
  dicomWebPath: string;
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
  /** Optional. The viewport setting to use as specified in https://dicom.nema.org/medical/dicom/current/output/chtml/part18/sect_8.3.5.html#sect_8.3.5.1.3 */
  viewport?: string;
}

export const RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest = Schema.Struct({
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  viewport: Schema.optional(Schema.String).pipe(T.HttpQuery("viewport")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/series/{seriesId}/instances/{instancesId}/rendered" }),
  svc,
) as unknown as Schema.Schema<RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest>;

export type RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse = HttpBody;
export const RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse = HttpBody;

export type RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesError = CommonErrors;

export const retrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstances: API.OperationMethod<RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest, RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse, RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest,
  output: RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse,
  errors: [],
}));

/** RetrieveInstance returns instance associated with the given study, series, and SOP Instance UID. See [RetrieveTransaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4). For details on the implementation of RetrieveInstance, see [DICOM study/series/instances](https://cloud.google.com/healthcare/docs/dicom#dicom_studyseriesinstances) and [DICOM instances](https://cloud.google.com/healthcare/docs/dicom#dicom_instances) in the Cloud Healthcare API conformance statement. For samples that show how to call RetrieveInstance, see [Retrieve an instance](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieve-instance). */
export interface RetrieveInstanceProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest {
  /** Required. The path of the RetrieveInstance DICOMweb request. For example, `studies/{study_uid}/series/{series_uid}/instances/{instance_uid}`. */
  dicomWebPath: string;
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
}

export const RetrieveInstanceProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest = Schema.Struct({
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/series/{seriesId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<RetrieveInstanceProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest>;

export type RetrieveInstanceProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse = HttpBody;
export const RetrieveInstanceProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse = HttpBody;

export type RetrieveInstanceProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesError = CommonErrors;

export const retrieveInstanceProjectsLocationsDatasetsDicomStoresStudiesSeriesInstances: API.OperationMethod<RetrieveInstanceProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest, RetrieveInstanceProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse, RetrieveInstanceProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveInstanceProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest,
  output: RetrieveInstanceProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse,
  errors: [],
}));

/** DeleteInstance deletes an instance associated with the given study, series, and SOP Instance UID. Delete requests are equivalent to the GET requests specified in the Retrieve transaction. Study and series search results can take a few seconds to be updated after an instance is deleted using DeleteInstance. For samples that show how to call DeleteInstance, see [Delete a study, series, or instance](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#delete-dicom). */
export interface DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest {
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
  /** Required. The path of the DeleteInstance request. For example, `studies/{study_uid}/series/{series_uid}/instances/{instance_uid}`. */
  dicomWebPath: string;
}

export const DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/series/{seriesId}/instances/{instancesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest>;

export type DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse = Empty;
export const DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse = Empty;

export type DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesError = CommonErrors;

export const deleteProjectsLocationsDatasetsDicomStoresStudiesSeriesInstances: API.OperationMethod<DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest, DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse, DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest,
  output: DeleteProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse,
  errors: [],
}));

/** RetrieveInstanceMetadata returns instance associated with the given study, series, and SOP Instance UID presented as metadata. See [RetrieveTransaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4). For details on the implementation of RetrieveInstanceMetadata, see [Metadata resources](https://cloud.google.com/healthcare/docs/dicom#metadata_resources) in the Cloud Healthcare API conformance statement. For samples that show how to call RetrieveInstanceMetadata, see [Retrieve metadata](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieve-metadata). */
export interface RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest {
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
  /** Required. The path of the RetrieveInstanceMetadata DICOMweb request. For example, `studies/{study_uid}/series/{series_uid}/instances/{instance_uid}/metadata`. */
  dicomWebPath: string;
}

export const RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/series/{seriesId}/instances/{instancesId}/metadata" }),
  svc,
) as unknown as Schema.Schema<RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest>;

export type RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse = HttpBody;
export const RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse = HttpBody;

export type RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesError = CommonErrors;

export const retrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstances: API.OperationMethod<RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest, RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse, RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesRequest,
  output: RetrieveMetadataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesResponse,
  errors: [],
}));

/** Returns uncompressed, unencoded bytes representing the referenced bulkdata tag from an instance. See [Retrieve Transaction](https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4). For details on the implementation of RetrieveBulkdata, see [Bulkdata resources](https://cloud.google.com/healthcare/docs/dicom#bulkdata-resources) in the Cloud Healthcare API conformance statement. For samples that show how to call RetrieveBulkdata, see [Retrieve bulkdata](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieve-bulkdata). */
export interface RetrieveBulkdataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesBulkdataRequest {
  /** Required. The path for the `RetrieveBulkdata` DICOMweb request. For example, `studies/{study_uid}/series/{series_uid}/instances/{instance_uid}/bukdata/{bulkdata_uri}`. */
  dicomWebPath: string;
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
}

export const RetrieveBulkdataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesBulkdataRequest = Schema.Struct({
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/series/{seriesId}/instances/{instancesId}/bulkdata/{bulkdataId}/{bulkdataId1}" }),
  svc,
) as unknown as Schema.Schema<RetrieveBulkdataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesBulkdataRequest>;

export type RetrieveBulkdataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesBulkdataResponse = HttpBody;
export const RetrieveBulkdataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesBulkdataResponse = HttpBody;

export type RetrieveBulkdataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesBulkdataError = CommonErrors;

export const retrieveBulkdataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesBulkdata: API.OperationMethod<RetrieveBulkdataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesBulkdataRequest, RetrieveBulkdataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesBulkdataResponse, RetrieveBulkdataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesBulkdataError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveBulkdataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesBulkdataRequest,
  output: RetrieveBulkdataProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesBulkdataResponse,
  errors: [],
}));

/** RetrieveRenderedFrames returns instances associated with the given study, series, SOP Instance UID and frame numbers in an acceptable Rendered Media Type. See [RetrieveTransaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4). For details on the implementation of RetrieveRenderedFrames, see [Rendered resources](https://cloud.google.com/healthcare/docs/dicom#rendered_resources) in the Cloud Healthcare API conformance statement. For samples that show how to call RetrieveRenderedFrames, see [Retrieve consumer image formats](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieve-consumer). */
export interface RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesRequest {
  /** Required. The path of the RetrieveRenderedFrames DICOMweb request. For example, `studies/{study_uid}/series/{series_uid}/instances/{instance_uid}/frames/{frame_list}/rendered`. */
  dicomWebPath: string;
  /** Optional. The viewport setting to use as specified in https://dicom.nema.org/medical/dicom/current/output/chtml/part18/sect_8.3.5.html#sect_8.3.5.1.3 */
  viewport?: string;
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
}

export const RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesRequest = Schema.Struct({
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
  viewport: Schema.optional(Schema.String).pipe(T.HttpQuery("viewport")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/series/{seriesId}/instances/{instancesId}/frames/{framesId}/rendered" }),
  svc,
) as unknown as Schema.Schema<RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesRequest>;

export type RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesResponse = HttpBody;
export const RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesResponse = HttpBody;

export type RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesError = CommonErrors;

export const retrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFrames: API.OperationMethod<RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesRequest, RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesResponse, RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesRequest,
  output: RetrieveRenderedProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesResponse,
  errors: [],
}));

/** RetrieveFrames returns instances associated with the given study, series, SOP Instance UID and frame numbers. See [RetrieveTransaction] (https://dicom.nema.org/medical/dicom/current/output/html/part18.html#sect_10.4}. For details on the implementation of RetrieveFrames, see [DICOM frames](https://cloud.google.com/healthcare/docs/dicom#dicom_frames) in the Cloud Healthcare API conformance statement. For samples that show how to call RetrieveFrames, see [Retrieve DICOM data](https://cloud.google.com/healthcare/docs/how-tos/dicomweb#retrieve-dicom). */
export interface RetrieveFramesProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesRequest {
  /** Required. The path of the RetrieveFrames DICOMweb request. For example, `studies/{study_uid}/series/{series_uid}/instances/{instance_uid}/frames/{frame_list}`. */
  dicomWebPath: string;
  /** Required. The name of the DICOM store that is being accessed. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`. */
  parent: string;
}

export const RetrieveFramesProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesRequest = Schema.Struct({
  dicomWebPath: Schema.String.pipe(T.HttpPath("dicomWebPath")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/series/{seriesId}/instances/{instancesId}/frames/{framesId}" }),
  svc,
) as unknown as Schema.Schema<RetrieveFramesProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesRequest>;

export type RetrieveFramesProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesResponse = HttpBody;
export const RetrieveFramesProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesResponse = HttpBody;

export type RetrieveFramesProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesError = CommonErrors;

export const retrieveFramesProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFrames: API.OperationMethod<RetrieveFramesProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesRequest, RetrieveFramesProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesResponse, RetrieveFramesProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RetrieveFramesProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesRequest,
  output: RetrieveFramesProjectsLocationsDatasetsDicomStoresStudiesSeriesInstancesFramesResponse,
  errors: [],
}));

/** SetBlobStorageSettings sets the blob storage settings of the specified resources. */
export interface SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresDicomWebStudiesRequest {
  /** Required. The path of the resource to update the blob storage settings in the format of `projects/{projectID}/locations/{locationID}/datasets/{datasetID}/dicomStores/{dicomStoreID}/dicomWeb/studies/{studyUID}`, `projects/{projectID}/locations/{locationID}/datasets/{datasetID}/dicomStores/{dicomStoreID}/dicomWeb/studies/{studyUID}/series/{seriesUID}/`, or `projects/{projectID}/locations/{locationID}/datasets/{datasetID}/dicomStores/{dicomStoreID}/dicomWeb/studies/{studyUID}/series/{seriesUID}/instances/{instanceUID}`. If `filter_config` is specified, set the value of `resource` to the resource name of a DICOM store in the format `projects/{projectID}/locations/{locationID}/datasets/{datasetID}/dicomStores/{dicomStoreID}`. */
  resource: string;
  /** Request body */
  body?: SetBlobStorageSettingsRequest;
}

export const SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresDicomWebStudiesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetBlobStorageSettingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}:setBlobStorageSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresDicomWebStudiesRequest>;

export type SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresDicomWebStudiesResponse = Operation;
export const SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresDicomWebStudiesResponse = Operation;

export type SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresDicomWebStudiesError = CommonErrors;

export const setBlobStorageSettingsProjectsLocationsDatasetsDicomStoresDicomWebStudies: API.OperationMethod<SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresDicomWebStudiesRequest, SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresDicomWebStudiesResponse, SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresDicomWebStudiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresDicomWebStudiesRequest,
  output: SetBlobStorageSettingsProjectsLocationsDatasetsDicomStoresDicomWebStudiesResponse,
  errors: [],
}));

/** GetStudyMetrics returns metrics for a study. */
export interface GetStudyMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesRequest {
  /** Required. The study resource path. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}/dicomWeb/studies/{study_uid}`. */
  study: string;
}

export const GetStudyMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesRequest = Schema.Struct({
  study: Schema.String.pipe(T.HttpPath("study")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}:getStudyMetrics" }),
  svc,
) as unknown as Schema.Schema<GetStudyMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesRequest>;

export type GetStudyMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesResponse = StudyMetrics;
export const GetStudyMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesResponse = StudyMetrics;

export type GetStudyMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesError = CommonErrors;

export const getStudyMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudies: API.OperationMethod<GetStudyMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesRequest, GetStudyMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesResponse, GetStudyMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetStudyMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesRequest,
  output: GetStudyMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesResponse,
  errors: [],
}));

/** GetSeriesMetrics returns metrics for a series. */
export interface GetSeriesMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesRequest {
  /** Required. The series resource path. For example, `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}/dicomWeb/studies/{study_uid}/series/{series_uid}`. */
  series: string;
}

export const GetSeriesMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesRequest = Schema.Struct({
  series: Schema.String.pipe(T.HttpPath("series")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/series/{seriesId}:getSeriesMetrics" }),
  svc,
) as unknown as Schema.Schema<GetSeriesMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesRequest>;

export type GetSeriesMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesResponse = SeriesMetrics;
export const GetSeriesMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesResponse = SeriesMetrics;

export type GetSeriesMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesError = CommonErrors;

export const getSeriesMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeries: API.OperationMethod<GetSeriesMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesRequest, GetSeriesMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesResponse, GetSeriesMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetSeriesMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesRequest,
  output: GetSeriesMetricsProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesResponse,
  errors: [],
}));

/** GetStorageInfo returns the storage info of the specified resource. */
export interface GetStorageInfoProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesInstancesRequest {
  /** Required. The path of the instance to return storage info for, in the form: `projects/{projectID}/locations/{locationID}/datasets/{datasetID}/dicomStores/{dicomStoreID}/dicomWeb/studies/{studyUID}/series/{seriesUID}/instances/{instanceUID}` */
  resource: string;
}

export const GetStorageInfoProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesInstancesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dicomStores/{dicomStoresId}/dicomWeb/studies/{studiesId}/series/{seriesId}/instances/{instancesId}:getStorageInfo" }),
  svc,
) as unknown as Schema.Schema<GetStorageInfoProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesInstancesRequest>;

export type GetStorageInfoProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesInstancesResponse = StorageInfo;
export const GetStorageInfoProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesInstancesResponse = StorageInfo;

export type GetStorageInfoProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesInstancesError = CommonErrors;

export const getStorageInfoProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesInstances: API.OperationMethod<GetStorageInfoProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesInstancesRequest, GetStorageInfoProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesInstancesResponse, GetStorageInfoProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesInstancesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetStorageInfoProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesInstancesRequest,
  output: GetStorageInfoProjectsLocationsDatasetsDicomStoresDicomWebStudiesSeriesInstancesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors. */
export interface SetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dataMapperWorkspaces/{dataMapperWorkspacesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesRequest>;

export type SetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesResponse = Policy;
export const SetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesResponse = Policy;

export type SetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesError = CommonErrors;

export const setIamPolicyProjectsLocationsDatasetsDataMapperWorkspaces: API.OperationMethod<SetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesRequest, SetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesResponse, SetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesRequest,
  output: SetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsDatasetsDataMapperWorkspacesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDatasetsDataMapperWorkspacesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dataMapperWorkspaces/{dataMapperWorkspacesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDatasetsDataMapperWorkspacesRequest>;

export type TestIamPermissionsProjectsLocationsDatasetsDataMapperWorkspacesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDatasetsDataMapperWorkspacesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDatasetsDataMapperWorkspacesError = CommonErrors;

export const testIamPermissionsProjectsLocationsDatasetsDataMapperWorkspaces: API.OperationMethod<TestIamPermissionsProjectsLocationsDatasetsDataMapperWorkspacesRequest, TestIamPermissionsProjectsLocationsDatasetsDataMapperWorkspacesResponse, TestIamPermissionsProjectsLocationsDatasetsDataMapperWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDatasetsDataMapperWorkspacesRequest,
  output: TestIamPermissionsProjectsLocationsDatasetsDataMapperWorkspacesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/datasets/{datasetsId}/dataMapperWorkspaces/{dataMapperWorkspacesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesRequest>;

export type GetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesResponse = Policy;
export const GetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesResponse = Policy;

export type GetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesError = CommonErrors;

export const getIamPolicyProjectsLocationsDatasetsDataMapperWorkspaces: API.OperationMethod<GetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesRequest, GetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesResponse, GetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesRequest,
  output: GetIamPolicyProjectsLocationsDatasetsDataMapperWorkspacesResponse,
  errors: [],
}));

