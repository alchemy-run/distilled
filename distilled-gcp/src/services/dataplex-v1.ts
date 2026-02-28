// ==========================================================================
// Cloud Dataplex API (dataplex v1)
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
  name: "dataplex",
  version: "v1",
  rootUrl: "https://dataplex.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleCloudDataplexV1LakeMetastore {
  /** Optional. A relative reference to the Dataproc Metastore (https://cloud.google.com/dataproc-metastore/docs) service associated with the lake: projects/{project_id}/locations/{location_id}/services/{service_id} */
  service?: string;
}

export const GoogleCloudDataplexV1LakeMetastore: Schema.Schema<GoogleCloudDataplexV1LakeMetastore> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1LakeMetastore" }) as any as Schema.Schema<GoogleCloudDataplexV1LakeMetastore>;

export interface GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue {
  /** Output only. String value of a top N non-null value. */
  value?: string;
  /** Output only. Ratio of the corresponding value in the field against the total number of rows in the scanned data. */
  ratio?: number;
  /** Output only. Count of the corresponding value in the scanned data. */
  count?: string;
}

export const GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue: Schema.Schema<GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  ratio: Schema.optional(Schema.Number),
  count: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue>;

export interface GoogleCloudDataplexV1SchemaSchemaField {
  /** Required. Additional field semantics. */
  mode?: "MODE_UNSPECIFIED" | "REQUIRED" | "NULLABLE" | "REPEATED" | (string & {});
  /** Optional. User friendly field description. Must be less than or equal to 1024 characters. */
  description?: string;
  /** Optional. Any nested field for complex types. */
  fields?: Array<GoogleCloudDataplexV1SchemaSchemaField>;
  /** Required. The type of field. */
  type?: "TYPE_UNSPECIFIED" | "BOOLEAN" | "BYTE" | "INT16" | "INT32" | "INT64" | "FLOAT" | "DOUBLE" | "DECIMAL" | "STRING" | "BINARY" | "TIMESTAMP" | "DATE" | "TIME" | "RECORD" | "NULL" | (string & {});
  /** Required. The name of the field. Must contain only letters, numbers and underscores, with a maximum length of 767 characters, and must begin with a letter or underscore. */
  name?: string;
}

export const GoogleCloudDataplexV1SchemaSchemaField: Schema.Schema<GoogleCloudDataplexV1SchemaSchemaField> = Schema.suspend(() => Schema.Struct({
  mode: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(GoogleCloudDataplexV1SchemaSchemaField)),
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1SchemaSchemaField" }) as any as Schema.Schema<GoogleCloudDataplexV1SchemaSchemaField>;

export interface GoogleCloudDataplexV1DataScanEventDataQualityAppliedConfigs {
  /** The percentage of the records selected from the dataset for DataScan. Value ranges between 0.0 and 100.0. Value 0.0 or 100.0 imply that sampling was not applied. */
  samplingPercent?: number;
  /** Boolean indicating whether a row filter was applied in the DataScan job. */
  rowFilterApplied?: boolean;
}

export const GoogleCloudDataplexV1DataScanEventDataQualityAppliedConfigs: Schema.Schema<GoogleCloudDataplexV1DataScanEventDataQualityAppliedConfigs> = Schema.suspend(() => Schema.Struct({
  samplingPercent: Schema.optional(Schema.Number),
  rowFilterApplied: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDataplexV1DataScanEventDataQualityAppliedConfigs" }) as any as Schema.Schema<GoogleCloudDataplexV1DataScanEventDataQualityAppliedConfigs>;

export interface GoogleCloudDataplexV1ScannedDataIncrementalField {
  /** Output only. The field that contains values which monotonically increases over time (e.g. a timestamp column). */
  field?: string;
  /** Output only. Value that marks the end of the range. */
  end?: string;
  /** Output only. Value that marks the start of the range. */
  start?: string;
}

export const GoogleCloudDataplexV1ScannedDataIncrementalField: Schema.Schema<GoogleCloudDataplexV1ScannedDataIncrementalField> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  end: Schema.optional(Schema.String),
  start: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ScannedDataIncrementalField" }) as any as Schema.Schema<GoogleCloudDataplexV1ScannedDataIncrementalField>;

export interface GoogleCloudDataplexV1ScannedData {
  /** The range denoted by values of an incremental field */
  incrementalField?: GoogleCloudDataplexV1ScannedDataIncrementalField;
}

export const GoogleCloudDataplexV1ScannedData: Schema.Schema<GoogleCloudDataplexV1ScannedData> = Schema.suspend(() => Schema.Struct({
  incrementalField: Schema.optional(GoogleCloudDataplexV1ScannedDataIncrementalField),
})).annotate({ identifier: "GoogleCloudDataplexV1ScannedData" }) as any as Schema.Schema<GoogleCloudDataplexV1ScannedData>;

export interface GoogleCloudDataplexV1AspectTypeMetadataTemplateEnumValue {
  /** Optional. You can set this message if you need to deprecate an enum value. */
  deprecated?: string;
  /** Required. Name of the enumvalue. This is the actual value that the aspect can contain. */
  name?: string;
  /** Required. Index for the enum value. It can't be modified. */
  index?: number;
}

export const GoogleCloudDataplexV1AspectTypeMetadataTemplateEnumValue: Schema.Schema<GoogleCloudDataplexV1AspectTypeMetadataTemplateEnumValue> = Schema.suspend(() => Schema.Struct({
  deprecated: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  index: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDataplexV1AspectTypeMetadataTemplateEnumValue" }) as any as Schema.Schema<GoogleCloudDataplexV1AspectTypeMetadataTemplateEnumValue>;

export interface GoogleCloudDataplexV1AspectTypeMetadataTemplateAnnotations {
  /** Optional. Display order for a field. You can use this to reorder where a field is rendered. */
  displayOrder?: number;
  /** Optional. Marks a field as deprecated. You can include a deprecation message. */
  deprecated?: string;
  /** Optional. Description for a field. */
  description?: string;
  /** Optional. Display name for a field. */
  displayName?: string;
  /** Optional. Suggested hints for string fields. You can use them to suggest values to users through console. */
  stringValues?: Array<string>;
  /** Optional. You can use String Type annotations to specify special meaning to string fields. The following values are supported: richText: The field must be interpreted as a rich text field. url: A fully qualified URL link. resource: A service qualified resource reference. */
  stringType?: string;
}

export const GoogleCloudDataplexV1AspectTypeMetadataTemplateAnnotations: Schema.Schema<GoogleCloudDataplexV1AspectTypeMetadataTemplateAnnotations> = Schema.suspend(() => Schema.Struct({
  displayOrder: Schema.optional(Schema.Number),
  deprecated: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  stringValues: Schema.optional(Schema.Array(Schema.String)),
  stringType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1AspectTypeMetadataTemplateAnnotations" }) as any as Schema.Schema<GoogleCloudDataplexV1AspectTypeMetadataTemplateAnnotations>;

export interface GoogleCloudDataplexV1AspectTypeMetadataTemplateConstraints {
  /** Optional. Marks this field as optional or required. */
  required?: boolean;
}

export const GoogleCloudDataplexV1AspectTypeMetadataTemplateConstraints: Schema.Schema<GoogleCloudDataplexV1AspectTypeMetadataTemplateConstraints> = Schema.suspend(() => Schema.Struct({
  required: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDataplexV1AspectTypeMetadataTemplateConstraints" }) as any as Schema.Schema<GoogleCloudDataplexV1AspectTypeMetadataTemplateConstraints>;

export interface GoogleCloudDataplexV1AspectTypeMetadataTemplate {
  /** Required. The datatype of this field. The following values are supported:Primitive types: string int bool double datetime. Must be of the format RFC3339 UTC "Zulu" (Examples: "2014-10-02T15:01:23Z" and "2014-10-02T15:01:23.045123456Z").Complex types: enum array map record */
  type?: string;
  /** Optional. If the type is map, set map_items. map_items can refer to a primitive field or a complex (record only) field. To specify a primitive field, you only need to set name and type in the nested MetadataTemplate. The recommended value for the name field is item, as this isn't used in the actual payload. */
  mapItems?: GoogleCloudDataplexV1AspectTypeMetadataTemplate;
  /** Optional. Field definition. You must specify it if the type is record. It defines the nested fields. */
  recordFields?: Array<GoogleCloudDataplexV1AspectTypeMetadataTemplate>;
  /** Optional. A reference to another field definition (not an inline definition). The value must be equal to the value of an id field defined elsewhere in the MetadataTemplate. Only fields with record type can refer to other fields. */
  typeRef?: string;
  /** Optional. Index is used to encode Template messages. The value of index can range between 1 and 2,147,483,647. Index must be unique within all fields in a Template. (Nested Templates can reuse indexes). Once a Template is defined, the index cannot be changed, because it identifies the field in the actual storage format. Index is a mandatory field, but it is optional for top level fields, and map/array "values" definitions. */
  index?: number;
  /** Optional. The list of values for an enum type. You must define it if the type is enum. */
  enumValues?: Array<GoogleCloudDataplexV1AspectTypeMetadataTemplateEnumValue>;
  /** Optional. Specifies annotations on this field. */
  annotations?: GoogleCloudDataplexV1AspectTypeMetadataTemplateAnnotations;
  /** Optional. Specifies the constraints on this field. */
  constraints?: GoogleCloudDataplexV1AspectTypeMetadataTemplateConstraints;
  /** Optional. You can use type id if this definition of the field needs to be reused later. The type id must be unique across the entire template. You can only specify it if the field type is record. */
  typeId?: string;
  /** Optional. If the type is array, set array_items. array_items can refer to a primitive field or a complex (record only) field. To specify a primitive field, you only need to set name and type in the nested MetadataTemplate. The recommended value for the name field is item, as this isn't used in the actual payload. */
  arrayItems?: GoogleCloudDataplexV1AspectTypeMetadataTemplate;
  /** Required. The name of the field. */
  name?: string;
}

export const GoogleCloudDataplexV1AspectTypeMetadataTemplate: Schema.Schema<GoogleCloudDataplexV1AspectTypeMetadataTemplate> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  mapItems: Schema.optional(GoogleCloudDataplexV1AspectTypeMetadataTemplate),
  recordFields: Schema.optional(Schema.Array(GoogleCloudDataplexV1AspectTypeMetadataTemplate)),
  typeRef: Schema.optional(Schema.String),
  index: Schema.optional(Schema.Number),
  enumValues: Schema.optional(Schema.Array(GoogleCloudDataplexV1AspectTypeMetadataTemplateEnumValue)),
  annotations: Schema.optional(GoogleCloudDataplexV1AspectTypeMetadataTemplateAnnotations),
  constraints: Schema.optional(GoogleCloudDataplexV1AspectTypeMetadataTemplateConstraints),
  typeId: Schema.optional(Schema.String),
  arrayItems: Schema.optional(GoogleCloudDataplexV1AspectTypeMetadataTemplate),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1AspectTypeMetadataTemplate" }) as any as Schema.Schema<GoogleCloudDataplexV1AspectTypeMetadataTemplate>;

export interface GoogleCloudDataplexV1DataProfileSpecPostScanActionsBigQueryExport {
  /** Optional. The BigQuery table to export DataProfileScan results to. Format: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID */
  resultsTable?: string;
}

export const GoogleCloudDataplexV1DataProfileSpecPostScanActionsBigQueryExport: Schema.Schema<GoogleCloudDataplexV1DataProfileSpecPostScanActionsBigQueryExport> = Schema.suspend(() => Schema.Struct({
  resultsTable: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProfileSpecPostScanActionsBigQueryExport" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProfileSpecPostScanActionsBigQueryExport>;

export interface GoogleCloudDataplexV1DataDiscoverySpecStorageConfigCsvOptions {
  /** Optional. The number of rows to interpret as header rows that should be skipped when reading data rows. */
  headerRows?: number;
  /** Optional. Whether to disable the inference of data types for CSV data. If true, all columns are registered as strings. */
  typeInferenceDisabled?: boolean;
  /** Optional. The delimiter that is used to separate values. The default is , (comma). */
  delimiter?: string;
  /** Optional. The character encoding of the data. The default is UTF-8. */
  encoding?: string;
  /** Optional. The character used to quote column values. Accepts " (double quotation mark) or ' (single quotation mark). If unspecified, defaults to " (double quotation mark). */
  quote?: string;
}

export const GoogleCloudDataplexV1DataDiscoverySpecStorageConfigCsvOptions: Schema.Schema<GoogleCloudDataplexV1DataDiscoverySpecStorageConfigCsvOptions> = Schema.suspend(() => Schema.Struct({
  headerRows: Schema.optional(Schema.Number),
  typeInferenceDisabled: Schema.optional(Schema.Boolean),
  delimiter: Schema.optional(Schema.String),
  encoding: Schema.optional(Schema.String),
  quote: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataDiscoverySpecStorageConfigCsvOptions" }) as any as Schema.Schema<GoogleCloudDataplexV1DataDiscoverySpecStorageConfigCsvOptions>;

export interface GoogleCloudDataplexV1DataDiscoverySpecStorageConfigJsonOptions {
  /** Optional. Whether to disable the inference of data types for JSON data. If true, all columns are registered as their primitive types (strings, number, or boolean). */
  typeInferenceDisabled?: boolean;
  /** Optional. The character encoding of the data. The default is UTF-8. */
  encoding?: string;
}

export const GoogleCloudDataplexV1DataDiscoverySpecStorageConfigJsonOptions: Schema.Schema<GoogleCloudDataplexV1DataDiscoverySpecStorageConfigJsonOptions> = Schema.suspend(() => Schema.Struct({
  typeInferenceDisabled: Schema.optional(Schema.Boolean),
  encoding: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataDiscoverySpecStorageConfigJsonOptions" }) as any as Schema.Schema<GoogleCloudDataplexV1DataDiscoverySpecStorageConfigJsonOptions>;

export interface GoogleCloudDataplexV1DataDiscoverySpecStorageConfig {
  /** Optional. Configuration for CSV data. */
  csvOptions?: GoogleCloudDataplexV1DataDiscoverySpecStorageConfigCsvOptions;
  /** Optional. Defines the data to exclude during discovery. Provide a list of patterns that identify the data to exclude. For Cloud Storage bucket assets, these patterns are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these patterns are interpreted as patterns to match table names. */
  excludePatterns?: Array<string>;
  /** Optional. Defines the data to include during discovery when only a subset of the data should be considered. Provide a list of patterns that identify the data to include. For Cloud Storage bucket assets, these patterns are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these patterns are interpreted as patterns to match table names. */
  includePatterns?: Array<string>;
  /** Optional. Configuration for JSON data. */
  jsonOptions?: GoogleCloudDataplexV1DataDiscoverySpecStorageConfigJsonOptions;
}

export const GoogleCloudDataplexV1DataDiscoverySpecStorageConfig: Schema.Schema<GoogleCloudDataplexV1DataDiscoverySpecStorageConfig> = Schema.suspend(() => Schema.Struct({
  csvOptions: Schema.optional(GoogleCloudDataplexV1DataDiscoverySpecStorageConfigCsvOptions),
  excludePatterns: Schema.optional(Schema.Array(Schema.String)),
  includePatterns: Schema.optional(Schema.Array(Schema.String)),
  jsonOptions: Schema.optional(GoogleCloudDataplexV1DataDiscoverySpecStorageConfigJsonOptions),
})).annotate({ identifier: "GoogleCloudDataplexV1DataDiscoverySpecStorageConfig" }) as any as Schema.Schema<GoogleCloudDataplexV1DataDiscoverySpecStorageConfig>;

export interface GoogleCloudDataplexV1GlossaryTerm {
  /** Output only. Identifier. The resource name of the GlossaryTerm. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id} */
  name?: string;
  /** Output only. The time at which the GlossaryTerm was last updated. */
  updateTime?: string;
  /** Output only. The time at which the GlossaryTerm was created. */
  createTime?: string;
  /** Optional. The user-mutable description of the GlossaryTerm. */
  description?: string;
  /** Optional. User-defined labels for the GlossaryTerm. */
  labels?: Record<string, string>;
  /** Optional. User friendly display name of the GlossaryTerm. This is user-mutable. This will be same as the GlossaryTermId, if not specified. */
  displayName?: string;
  /** Output only. System generated unique id for the GlossaryTerm. This ID will be different if the GlossaryTerm is deleted and re-created with the same name. */
  uid?: string;
  /** Required. The immediate parent of the GlossaryTerm in the resource-hierarchy. It can either be a Glossary or a GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} OR projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id} */
  parent?: string;
}

export const GoogleCloudDataplexV1GlossaryTerm: Schema.Schema<GoogleCloudDataplexV1GlossaryTerm> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  parent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1GlossaryTerm" }) as any as Schema.Schema<GoogleCloudDataplexV1GlossaryTerm>;

export interface GoogleCloudDataplexV1ListGlossaryTermsResponse {
  /** Lists the GlossaryTerms in the specified parent. */
  terms?: Array<GoogleCloudDataplexV1GlossaryTerm>;
  /** Locations that the service couldn't reach. */
  unreachableLocations?: Array<string>;
  /** A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudDataplexV1ListGlossaryTermsResponse: Schema.Schema<GoogleCloudDataplexV1ListGlossaryTermsResponse> = Schema.suspend(() => Schema.Struct({
  terms: Schema.optional(Schema.Array(GoogleCloudDataplexV1GlossaryTerm)),
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ListGlossaryTermsResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListGlossaryTermsResponse>;

export interface GoogleCloudDataplexV1GovernanceEventEntity {
  /** The Entity resource the log event is associated with. Format: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id} */
  entity?: string;
  /** Type of entity. */
  entityType?: "ENTITY_TYPE_UNSPECIFIED" | "TABLE" | "FILESET" | (string & {});
}

export const GoogleCloudDataplexV1GovernanceEventEntity: Schema.Schema<GoogleCloudDataplexV1GovernanceEventEntity> = Schema.suspend(() => Schema.Struct({
  entity: Schema.optional(Schema.String),
  entityType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1GovernanceEventEntity" }) as any as Schema.Schema<GoogleCloudDataplexV1GovernanceEventEntity>;

export interface GoogleCloudDataplexV1GovernanceEvent {
  /** The type of the event. */
  eventType?: "EVENT_TYPE_UNSPECIFIED" | "RESOURCE_IAM_POLICY_UPDATE" | "BIGQUERY_TABLE_CREATE" | "BIGQUERY_TABLE_UPDATE" | "BIGQUERY_TABLE_DELETE" | "BIGQUERY_CONNECTION_CREATE" | "BIGQUERY_CONNECTION_UPDATE" | "BIGQUERY_CONNECTION_DELETE" | "BIGQUERY_TAXONOMY_CREATE" | "BIGQUERY_POLICY_TAG_CREATE" | "BIGQUERY_POLICY_TAG_DELETE" | "BIGQUERY_POLICY_TAG_SET_IAM_POLICY" | "ACCESS_POLICY_UPDATE" | "GOVERNANCE_RULE_MATCHED_RESOURCES" | "GOVERNANCE_RULE_SEARCH_LIMIT_EXCEEDS" | "GOVERNANCE_RULE_ERRORS" | "GOVERNANCE_RULE_PROCESSING" | (string & {});
  /** The log message. */
  message?: string;
  /** Entity resource information if the log event is associated with a specific entity. */
  entity?: GoogleCloudDataplexV1GovernanceEventEntity;
}

export const GoogleCloudDataplexV1GovernanceEvent: Schema.Schema<GoogleCloudDataplexV1GovernanceEvent> = Schema.suspend(() => Schema.Struct({
  eventType: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  entity: Schema.optional(GoogleCloudDataplexV1GovernanceEventEntity),
})).annotate({ identifier: "GoogleCloudDataplexV1GovernanceEvent" }) as any as Schema.Schema<GoogleCloudDataplexV1GovernanceEvent>;

export interface GoogleCloudDataplexV1Partition {
  /** Required. Immutable. The set of values representing the partition, which correspond to the partition schema defined in the parent entity. */
  values?: Array<string>;
  /** Optional. The etag for this partition. */
  etag?: string;
  /** Required. Immutable. The location of the entity data within the partition, for example, gs://bucket/path/to/entity/key1=value1/key2=value2. Or projects//datasets//tables/ */
  location?: string;
  /** Output only. Partition values used in the HTTP URL must be double encoded. For example, url_encode(url_encode(value)) can be used to encode "US:CA/CA#Sunnyvale so that the request URL ends with "/partitions/US%253ACA/CA%2523Sunnyvale". The name field in the response retains the encoded format. */
  name?: string;
}

export const GoogleCloudDataplexV1Partition: Schema.Schema<GoogleCloudDataplexV1Partition> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
  etag: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1Partition" }) as any as Schema.Schema<GoogleCloudDataplexV1Partition>;

export interface GoogleCloudDataplexV1EntityCompatibilityStatusCompatibility {
  /** Output only. Whether the entity is compatible and can be represented in the metadata store. */
  compatible?: boolean;
  /** Output only. Provides additional detail if the entity is incompatible with the metadata store. */
  reason?: string;
}

export const GoogleCloudDataplexV1EntityCompatibilityStatusCompatibility: Schema.Schema<GoogleCloudDataplexV1EntityCompatibilityStatusCompatibility> = Schema.suspend(() => Schema.Struct({
  compatible: Schema.optional(Schema.Boolean),
  reason: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1EntityCompatibilityStatusCompatibility" }) as any as Schema.Schema<GoogleCloudDataplexV1EntityCompatibilityStatusCompatibility>;

export interface GoogleCloudDataplexV1EntityCompatibilityStatus {
  /** Output only. Whether this entity is compatible with Hive Metastore. */
  hiveMetastore?: GoogleCloudDataplexV1EntityCompatibilityStatusCompatibility;
  /** Output only. Whether this entity is compatible with BigQuery. */
  bigquery?: GoogleCloudDataplexV1EntityCompatibilityStatusCompatibility;
}

export const GoogleCloudDataplexV1EntityCompatibilityStatus: Schema.Schema<GoogleCloudDataplexV1EntityCompatibilityStatus> = Schema.suspend(() => Schema.Struct({
  hiveMetastore: Schema.optional(GoogleCloudDataplexV1EntityCompatibilityStatusCompatibility),
  bigquery: Schema.optional(GoogleCloudDataplexV1EntityCompatibilityStatusCompatibility),
})).annotate({ identifier: "GoogleCloudDataplexV1EntityCompatibilityStatus" }) as any as Schema.Schema<GoogleCloudDataplexV1EntityCompatibilityStatus>;

export interface GoogleCloudDataplexV1OperationMetadata {
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED. */
  requestedCancellation?: boolean;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
}

export const GoogleCloudDataplexV1OperationMetadata: Schema.Schema<GoogleCloudDataplexV1OperationMetadata> = Schema.suspend(() => Schema.Struct({
  apiVersion: Schema.optional(Schema.String),
  verb: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  statusMessage: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1OperationMetadata" }) as any as Schema.Schema<GoogleCloudDataplexV1OperationMetadata>;

export interface GoogleCloudDataplexV1DataAttributeBindingPath {
  /** Optional. List of attributes to be associated with the path of the resource, provided in the form: projects/{project}/locations/{location}/dataTaxonomies/{dataTaxonomy}/attributes/{data_attribute_id} */
  attributes?: Array<string>;
  /** Required. The name identifier of the path. Nested columns should be of the form: 'address.city'. */
  name?: string;
}

export const GoogleCloudDataplexV1DataAttributeBindingPath: Schema.Schema<GoogleCloudDataplexV1DataAttributeBindingPath> = Schema.suspend(() => Schema.Struct({
  attributes: Schema.optional(Schema.Array(Schema.String)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataAttributeBindingPath" }) as any as Schema.Schema<GoogleCloudDataplexV1DataAttributeBindingPath>;

export interface GoogleCloudDataplexV1DataAttributeBinding {
  /** Output only. System generated globally unique ID for the DataAttributeBinding. This ID will be different if the DataAttributeBinding is deleted and re-created with the same name. */
  uid?: string;
  /** Optional. The list of paths for items within the associated resource (eg. columns and partitions within a table) along with attribute bindings. */
  paths?: Array<GoogleCloudDataplexV1DataAttributeBindingPath>;
  /** Optional. List of attributes to be associated with the resource, provided in the form: projects/{project}/locations/{location}/dataTaxonomies/{dataTaxonomy}/attributes/{data_attribute_id} */
  attributes?: Array<string>;
  /** Optional. User-defined labels for the DataAttributeBinding. */
  labels?: Record<string, string>;
  /** Optional. User friendly display name. */
  displayName?: string;
  /** Output only. The time when the DataAttributeBinding was last updated. */
  updateTime?: string;
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. Etags must be used when calling the DeleteDataAttributeBinding and the UpdateDataAttributeBinding method. */
  etag?: string;
  /** Optional. Description of the DataAttributeBinding. */
  description?: string;
  /** Output only. The time when the DataAttributeBinding was created. */
  createTime?: string;
  /** Output only. The relative resource name of the Data Attribute Binding, of the form: projects/{project_number}/locations/{location}/dataAttributeBindings/{data_attribute_binding_id} */
  name?: string;
  /** Optional. Immutable. The resource name of the resource that is associated to attributes. Presently, only entity resource is supported in the form: projects/{project}/locations/{location}/lakes/{lake}/zones/{zone}/entities/{entity_id} Must belong in the same project and region as the attribute binding, and there can only exist one active binding for a resource. */
  resource?: string;
}

export const GoogleCloudDataplexV1DataAttributeBinding: Schema.Schema<GoogleCloudDataplexV1DataAttributeBinding> = Schema.suspend(() => Schema.Struct({
  uid: Schema.optional(Schema.String),
  paths: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataAttributeBindingPath)),
  attributes: Schema.optional(Schema.Array(Schema.String)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataAttributeBinding" }) as any as Schema.Schema<GoogleCloudDataplexV1DataAttributeBinding>;

export interface GoogleCloudDataplexV1ListDataAttributeBindingsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachableLocations?: Array<string>;
  /** DataAttributeBindings under the given parent Location. */
  dataAttributeBindings?: Array<GoogleCloudDataplexV1DataAttributeBinding>;
}

export const GoogleCloudDataplexV1ListDataAttributeBindingsResponse: Schema.Schema<GoogleCloudDataplexV1ListDataAttributeBindingsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
  dataAttributeBindings: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataAttributeBinding)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListDataAttributeBindingsResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListDataAttributeBindingsResponse>;

export interface GoogleCloudDataplexV1EntryTypeAspectInfo {
  /** Required aspect type for the entry type. */
  type?: string;
}

export const GoogleCloudDataplexV1EntryTypeAspectInfo: Schema.Schema<GoogleCloudDataplexV1EntryTypeAspectInfo> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1EntryTypeAspectInfo" }) as any as Schema.Schema<GoogleCloudDataplexV1EntryTypeAspectInfo>;

export interface GoogleCloudDataplexV1StorageFormatIcebergOptions {
  /** Optional. The location of where the iceberg metadata is present, must be within the table path */
  metadataLocation?: string;
}

export const GoogleCloudDataplexV1StorageFormatIcebergOptions: Schema.Schema<GoogleCloudDataplexV1StorageFormatIcebergOptions> = Schema.suspend(() => Schema.Struct({
  metadataLocation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1StorageFormatIcebergOptions" }) as any as Schema.Schema<GoogleCloudDataplexV1StorageFormatIcebergOptions>;

export interface GoogleCloudDataplexV1TaskInfrastructureSpecBatchComputeResources {
  /** Optional. Total number of job executors. Executor Count should be between 2 and 100. Default=2 */
  executorsCount?: number;
  /** Optional. Max configurable executors. If max_executors_count > executors_count, then auto-scaling is enabled. Max Executor Count should be between 2 and 1000. Default=1000 */
  maxExecutorsCount?: number;
}

export const GoogleCloudDataplexV1TaskInfrastructureSpecBatchComputeResources: Schema.Schema<GoogleCloudDataplexV1TaskInfrastructureSpecBatchComputeResources> = Schema.suspend(() => Schema.Struct({
  executorsCount: Schema.optional(Schema.Number),
  maxExecutorsCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDataplexV1TaskInfrastructureSpecBatchComputeResources" }) as any as Schema.Schema<GoogleCloudDataplexV1TaskInfrastructureSpecBatchComputeResources>;

export interface GoogleCloudDataplexV1DataQualityResultPostScanActionsResultBigQueryExportResult {
  /** Output only. Execution state for the BigQuery exporting. */
  state?: "STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "SKIPPED" | (string & {});
  /** Output only. Additional information about the BigQuery exporting. */
  message?: string;
}

export const GoogleCloudDataplexV1DataQualityResultPostScanActionsResultBigQueryExportResult: Schema.Schema<GoogleCloudDataplexV1DataQualityResultPostScanActionsResultBigQueryExportResult> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityResultPostScanActionsResultBigQueryExportResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityResultPostScanActionsResultBigQueryExportResult>;

export interface GoogleCloudDataplexV1MetadataFeedScope {
  /** Optional. The projects whose entries you want to listen to. Must be in the same organization as the feed. Must be in the format: projects/{project_id_or_number}. */
  projects?: Array<string>;
  /** Optional. The entry groups whose entries you want to listen to. Must be in the format: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}. */
  entryGroups?: Array<string>;
  /** Optional. Whether the metadata feed is at the organization-level. If true, all changes happened to the entries in the same organization as the feed are published. If false, you must specify a list of projects or a list of entry groups whose entries you want to listen to.The default is false. */
  organizationLevel?: boolean;
}

export const GoogleCloudDataplexV1MetadataFeedScope: Schema.Schema<GoogleCloudDataplexV1MetadataFeedScope> = Schema.suspend(() => Schema.Struct({
  projects: Schema.optional(Schema.Array(Schema.String)),
  entryGroups: Schema.optional(Schema.Array(Schema.String)),
  organizationLevel: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDataplexV1MetadataFeedScope" }) as any as Schema.Schema<GoogleCloudDataplexV1MetadataFeedScope>;

export interface GoogleCloudDataplexV1MetadataFeedFilters {
  /** Optional. The type of change that you want to listen to. If not specified, all changes are published. */
  changeTypes?: Array<"CHANGE_TYPE_UNSPECIFIED" | "CREATE" | "UPDATE" | "DELETE" | (string & {})>;
  /** Optional. The aspect types that you want to listen to. Depending on how the aspect is attached to the entry, in the format: projects/{project_id_or_number}/locations/{location}/aspectTypes/{aspect_type_id}. */
  aspectTypes?: Array<string>;
  /** Optional. The entry types that you want to listen to, specified as relative resource names in the format projects/{project_id_or_number}/locations/{location}/entryTypes/{entry_type_id}. Only entries that belong to the specified entry types are published. */
  entryTypes?: Array<string>;
}

export const GoogleCloudDataplexV1MetadataFeedFilters: Schema.Schema<GoogleCloudDataplexV1MetadataFeedFilters> = Schema.suspend(() => Schema.Struct({
  changeTypes: Schema.optional(Schema.Array(Schema.String)),
  aspectTypes: Schema.optional(Schema.Array(Schema.String)),
  entryTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1MetadataFeedFilters" }) as any as Schema.Schema<GoogleCloudDataplexV1MetadataFeedFilters>;

export interface GoogleCloudDataplexV1MetadataFeed {
  /** Required. The scope of the metadata feed. Only the in scope changes are published. */
  scope?: GoogleCloudDataplexV1MetadataFeedScope;
  /** Optional. The pubsub topic that you want the metadata feed messages to publish to. Please grant Dataplex service account the permission to publish messages to the topic. The service account is: service-{PROJECT_NUMBER}@gcp-sa-dataplex.iam.gserviceaccount.com. */
  pubsubTopic?: string;
  /** Output only. The time when the feed was created. */
  createTime?: string;
  /** Optional. The filters of the metadata feed. Only the changes that match the filters are published. */
  filters?: GoogleCloudDataplexV1MetadataFeedFilters;
  /** Output only. A system-generated, globally unique ID for the metadata job. If the metadata job is deleted and then re-created with the same name, this ID is different. */
  uid?: string;
  /** Identifier. The resource name of the metadata feed, in the format projects/{project_id_or_number}/locations/{location_id}/metadataFeeds/{metadata_feed_id}. */
  name?: string;
  /** Output only. The time when the feed was updated. */
  updateTime?: string;
  /** Optional. User-defined labels. */
  labels?: Record<string, string>;
}

export const GoogleCloudDataplexV1MetadataFeed: Schema.Schema<GoogleCloudDataplexV1MetadataFeed> = Schema.suspend(() => Schema.Struct({
  scope: Schema.optional(GoogleCloudDataplexV1MetadataFeedScope),
  pubsubTopic: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  filters: Schema.optional(GoogleCloudDataplexV1MetadataFeedFilters),
  uid: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1MetadataFeed" }) as any as Schema.Schema<GoogleCloudDataplexV1MetadataFeed>;

export interface GoogleCloudDataplexV1EnvironmentEndpoints {
  /** Output only. URI to serve notebook APIs */
  notebooks?: string;
  /** Output only. URI to serve SQL APIs */
  sql?: string;
}

export const GoogleCloudDataplexV1EnvironmentEndpoints: Schema.Schema<GoogleCloudDataplexV1EnvironmentEndpoints> = Schema.suspend(() => Schema.Struct({
  notebooks: Schema.optional(Schema.String),
  sql: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1EnvironmentEndpoints" }) as any as Schema.Schema<GoogleCloudDataplexV1EnvironmentEndpoints>;

export interface GoogleCloudDataplexV1DataProfileSpecPostScanActions {
  /** Optional. If set, results will be exported to the provided BigQuery table. */
  bigqueryExport?: GoogleCloudDataplexV1DataProfileSpecPostScanActionsBigQueryExport;
}

export const GoogleCloudDataplexV1DataProfileSpecPostScanActions: Schema.Schema<GoogleCloudDataplexV1DataProfileSpecPostScanActions> = Schema.suspend(() => Schema.Struct({
  bigqueryExport: Schema.optional(GoogleCloudDataplexV1DataProfileSpecPostScanActionsBigQueryExport),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProfileSpecPostScanActions" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProfileSpecPostScanActions>;

export interface GoogleCloudDataplexV1LakeMetastoreStatus {
  /** Last update time of the metastore status of the lake. */
  updateTime?: string;
  /** The URI of the endpoint used to access the Metastore service. */
  endpoint?: string;
  /** Additional information about the current status. */
  message?: string;
  /** Current state of association. */
  state?: "STATE_UNSPECIFIED" | "NONE" | "READY" | "UPDATING" | "ERROR" | (string & {});
}

export const GoogleCloudDataplexV1LakeMetastoreStatus: Schema.Schema<GoogleCloudDataplexV1LakeMetastoreStatus> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  endpoint: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1LakeMetastoreStatus" }) as any as Schema.Schema<GoogleCloudDataplexV1LakeMetastoreStatus>;

export interface GoogleCloudDataplexV1AssetStatus {
  /** Number of active assets. */
  activeAssets?: number;
  /** Last update time of the status. */
  updateTime?: string;
  /** Number of assets that are in process of updating the security policy on attached resources. */
  securityPolicyApplyingAssets?: number;
}

export const GoogleCloudDataplexV1AssetStatus: Schema.Schema<GoogleCloudDataplexV1AssetStatus> = Schema.suspend(() => Schema.Struct({
  activeAssets: Schema.optional(Schema.Number),
  updateTime: Schema.optional(Schema.String),
  securityPolicyApplyingAssets: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDataplexV1AssetStatus" }) as any as Schema.Schema<GoogleCloudDataplexV1AssetStatus>;

export interface GoogleCloudDataplexV1Lake {
  /** Output only. Metastore status of the lake. */
  metastoreStatus?: GoogleCloudDataplexV1LakeMetastoreStatus;
  /** Output only. Current state of the lake. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "ACTION_REQUIRED" | (string & {});
  /** Optional. User-defined labels for the lake. */
  labels?: Record<string, string>;
  /** Optional. User friendly display name. */
  displayName?: string;
  /** Optional. Settings to manage lake and Dataproc Metastore service instance association. */
  metastore?: GoogleCloudDataplexV1LakeMetastore;
  /** Optional. Description of the lake. */
  description?: string;
  /** Output only. Service account associated with this lake. This service account must be authorized to access or operate on resources managed by the lake. */
  serviceAccount?: string;
  /** Output only. The relative resource name of the lake, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. */
  name?: string;
  /** Output only. Aggregated status of the underlying assets of the lake. */
  assetStatus?: GoogleCloudDataplexV1AssetStatus;
  /** Output only. The time when the lake was created. */
  createTime?: string;
  /** Output only. The time when the lake was last updated. */
  updateTime?: string;
  /** Output only. System generated globally unique ID for the lake. This ID will be different if the lake is deleted and re-created with the same name. */
  uid?: string;
}

export const GoogleCloudDataplexV1Lake: Schema.Schema<GoogleCloudDataplexV1Lake> = Schema.suspend(() => Schema.Struct({
  metastoreStatus: Schema.optional(GoogleCloudDataplexV1LakeMetastoreStatus),
  state: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  metastore: Schema.optional(GoogleCloudDataplexV1LakeMetastore),
  description: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  assetStatus: Schema.optional(GoogleCloudDataplexV1AssetStatus),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1Lake" }) as any as Schema.Schema<GoogleCloudDataplexV1Lake>;

export interface GoogleCloudDataplexV1ListLakesResponse {
  /** Lakes under the given parent location. */
  lakes?: Array<GoogleCloudDataplexV1Lake>;
  /** Locations that could not be reached. */
  unreachableLocations?: Array<string>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const GoogleCloudDataplexV1ListLakesResponse: Schema.Schema<GoogleCloudDataplexV1ListLakesResponse> = Schema.suspend(() => Schema.Struct({
  lakes: Schema.optional(Schema.Array(GoogleCloudDataplexV1Lake)),
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ListLakesResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListLakesResponse>;

export interface GoogleCloudDataplexV1DataProfileResultPostScanActionsResultBigQueryExportResult {
  /** Output only. Execution state for the BigQuery exporting. */
  state?: "STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "SKIPPED" | (string & {});
  /** Output only. Additional information about the BigQuery exporting. */
  message?: string;
}

export const GoogleCloudDataplexV1DataProfileResultPostScanActionsResultBigQueryExportResult: Schema.Schema<GoogleCloudDataplexV1DataProfileResultPostScanActionsResultBigQueryExportResult> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProfileResultPostScanActionsResultBigQueryExportResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProfileResultPostScanActionsResultBigQueryExportResult>;

export interface GoogleCloudDataplexV1DiscoveryEventConfigDetails {
  /** A list of discovery configuration parameters in effect. The keys are the field paths within DiscoverySpec. Eg. includePatterns, excludePatterns, csvOptions.disableTypeInference, etc. */
  parameters?: Record<string, string>;
}

export const GoogleCloudDataplexV1DiscoveryEventConfigDetails: Schema.Schema<GoogleCloudDataplexV1DiscoveryEventConfigDetails> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1DiscoveryEventConfigDetails" }) as any as Schema.Schema<GoogleCloudDataplexV1DiscoveryEventConfigDetails>;

export interface GoogleCloudDataplexV1StorageFormatCsvOptions {
  /** Optional. The delimiter used to separate values. Defaults to ','. */
  delimiter?: string;
  /** Optional. The character encoding of the data. Accepts "US-ASCII", "UTF-8", and "ISO-8859-1". Defaults to UTF-8 if unspecified. */
  encoding?: string;
  /** Optional. The number of rows to interpret as header rows that should be skipped when reading data rows. Defaults to 0. */
  headerRows?: number;
  /** Optional. The character used to quote column values. Accepts '"' (double quotation mark) or ''' (single quotation mark). Defaults to '"' (double quotation mark) if unspecified. */
  quote?: string;
}

export const GoogleCloudDataplexV1StorageFormatCsvOptions: Schema.Schema<GoogleCloudDataplexV1StorageFormatCsvOptions> = Schema.suspend(() => Schema.Struct({
  delimiter: Schema.optional(Schema.String),
  encoding: Schema.optional(Schema.String),
  headerRows: Schema.optional(Schema.Number),
  quote: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1StorageFormatCsvOptions" }) as any as Schema.Schema<GoogleCloudDataplexV1StorageFormatCsvOptions>;

export interface GoogleCloudDataplexV1AspectSource {
  /** The time the aspect was last updated in the source system. */
  updateTime?: string;
  /** The version of the data format used to produce this data. This field is used to indicated when the underlying data format changes (e.g., schema modifications, changes to the source URL format definition, etc). */
  dataVersion?: string;
  /** The time the aspect was created in the source system. */
  createTime?: string;
}

export const GoogleCloudDataplexV1AspectSource: Schema.Schema<GoogleCloudDataplexV1AspectSource> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  dataVersion: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1AspectSource" }) as any as Schema.Schema<GoogleCloudDataplexV1AspectSource>;

export interface GoogleCloudDataplexV1Aspect {
  /** Output only. The time when the Aspect was last updated. */
  updateTime?: string;
  /** Output only. The resource name of the type used to create this Aspect. */
  aspectType?: string;
  /** Output only. The time when the Aspect was created. */
  createTime?: string;
  /** Required. The content of the aspect, according to its aspect type schema. The maximum size of the field is 120KB (encoded as UTF-8). */
  data?: Record<string, unknown>;
  /** Output only. The path in the entry under which the aspect is attached. */
  path?: string;
  /** Optional. Information related to the source system of the aspect. */
  aspectSource?: GoogleCloudDataplexV1AspectSource;
}

export const GoogleCloudDataplexV1Aspect: Schema.Schema<GoogleCloudDataplexV1Aspect> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  aspectType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  data: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  path: Schema.optional(Schema.String),
  aspectSource: Schema.optional(GoogleCloudDataplexV1AspectSource),
})).annotate({ identifier: "GoogleCloudDataplexV1Aspect" }) as any as Schema.Schema<GoogleCloudDataplexV1Aspect>;

export interface GoogleCloudDataplexV1EntrySourceAncestor {
  /** Optional. The name of the ancestor resource. */
  name?: string;
  /** Optional. The type of the ancestor resource. */
  type?: string;
}

export const GoogleCloudDataplexV1EntrySourceAncestor: Schema.Schema<GoogleCloudDataplexV1EntrySourceAncestor> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1EntrySourceAncestor" }) as any as Schema.Schema<GoogleCloudDataplexV1EntrySourceAncestor>;

export interface GoogleCloudDataplexV1EntrySource {
  /** The name of the resource in the source system. Maximum length is 4,000 characters. */
  resource?: string;
  /** Output only. Location of the resource in the source system. You can search the entry by this location. By default, this should match the location of the entry group containing this entry. A different value allows capturing the source location for data external to Google Cloud. */
  location?: string;
  /** The time when the resource was last updated in the source system. If the entry exists in the system and its EntrySource has update_time populated, further updates to the EntrySource of the entry must provide incremental updates to its update_time. */
  updateTime?: string;
  /** The name of the source system. Maximum length is 64 characters. */
  system?: string;
  /** The platform containing the source system. Maximum length is 64 characters. */
  platform?: string;
  /** User-defined labels. The maximum size of keys and values is 128 characters each. */
  labels?: Record<string, string>;
  /** A description of the data resource. Maximum length is 2,000 characters. */
  description?: string;
  /** The time when the resource was created in the source system. */
  createTime?: string;
  /** A user-friendly display name. Maximum length is 500 characters. */
  displayName?: string;
  /** Immutable. The entries representing the ancestors of the data resource in the source system. */
  ancestors?: Array<GoogleCloudDataplexV1EntrySourceAncestor>;
}

export const GoogleCloudDataplexV1EntrySource: Schema.Schema<GoogleCloudDataplexV1EntrySource> = Schema.suspend(() => Schema.Struct({
  resource: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  system: Schema.optional(Schema.String),
  platform: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  ancestors: Schema.optional(Schema.Array(GoogleCloudDataplexV1EntrySourceAncestor)),
})).annotate({ identifier: "GoogleCloudDataplexV1EntrySource" }) as any as Schema.Schema<GoogleCloudDataplexV1EntrySource>;

export interface GoogleCloudDataplexV1Entry {
  /** Output only. The time when the entry was last updated in Dataplex Universal Catalog. */
  updateTime?: string;
  /** Required. Immutable. The relative resource name of the entry type that was used to create this entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryTypes/{entry_type_id}. */
  entryType?: string;
  /** Output only. The time when the entry was created in Dataplex Universal Catalog. */
  createTime?: string;
  /** Identifier. The relative resource name of the entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}. */
  name?: string;
  /** Optional. Immutable. The resource name of the parent entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}. */
  parentEntry?: string;
  /** Optional. The aspects that are attached to the entry. Depending on how the aspect is attached to the entry, the format of the aspect key can be one of the following: If the aspect is attached directly to the entry: {project_id_or_number}.{location_id}.{aspect_type_id} If the aspect is attached to an entry's path: {project_id_or_number}.{location_id}.{aspect_type_id}@{path} */
  aspects?: Record<string, GoogleCloudDataplexV1Aspect>;
  /** Optional. A name for the entry that can be referenced by an external system. For more information, see Fully qualified names (https://cloud.google.com/data-catalog/docs/fully-qualified-names). The maximum size of the field is 4000 characters. */
  fullyQualifiedName?: string;
  /** Optional. Information related to the source system of the data resource that is represented by the entry. */
  entrySource?: GoogleCloudDataplexV1EntrySource;
}

export const GoogleCloudDataplexV1Entry: Schema.Schema<GoogleCloudDataplexV1Entry> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  entryType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  parentEntry: Schema.optional(Schema.String),
  aspects: Schema.optional(Schema.Record(Schema.String, GoogleCloudDataplexV1Aspect)),
  fullyQualifiedName: Schema.optional(Schema.String),
  entrySource: Schema.optional(GoogleCloudDataplexV1EntrySource),
})).annotate({ identifier: "GoogleCloudDataplexV1Entry" }) as any as Schema.Schema<GoogleCloudDataplexV1Entry>;

export interface GoogleCloudDataplexV1SearchEntriesResultSnippets {
  /** Entry */
  dataplexEntry?: GoogleCloudDataplexV1Entry;
}

export const GoogleCloudDataplexV1SearchEntriesResultSnippets: Schema.Schema<GoogleCloudDataplexV1SearchEntriesResultSnippets> = Schema.suspend(() => Schema.Struct({
  dataplexEntry: Schema.optional(GoogleCloudDataplexV1Entry),
})).annotate({ identifier: "GoogleCloudDataplexV1SearchEntriesResultSnippets" }) as any as Schema.Schema<GoogleCloudDataplexV1SearchEntriesResultSnippets>;

export interface GoogleCloudDataplexV1SearchEntriesResult {
  /** Snippets. */
  snippets?: GoogleCloudDataplexV1SearchEntriesResultSnippets;
  /** Linked resource name. */
  linkedResource?: string;
  dataplexEntry?: GoogleCloudDataplexV1Entry;
}

export const GoogleCloudDataplexV1SearchEntriesResult: Schema.Schema<GoogleCloudDataplexV1SearchEntriesResult> = Schema.suspend(() => Schema.Struct({
  snippets: Schema.optional(GoogleCloudDataplexV1SearchEntriesResultSnippets),
  linkedResource: Schema.optional(Schema.String),
  dataplexEntry: Schema.optional(GoogleCloudDataplexV1Entry),
})).annotate({ identifier: "GoogleCloudDataplexV1SearchEntriesResult" }) as any as Schema.Schema<GoogleCloudDataplexV1SearchEntriesResult>;

export interface GoogleCloudDataplexV1SearchEntriesResponse {
  /** The estimated total number of matching entries. This number isn't guaranteed to be accurate. */
  totalSize?: number;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** The results matching the search query. */
  results?: Array<GoogleCloudDataplexV1SearchEntriesResult>;
  /** Locations that the service couldn't reach. Search results don't include data from these locations. */
  unreachable?: Array<string>;
}

export const GoogleCloudDataplexV1SearchEntriesResponse: Schema.Schema<GoogleCloudDataplexV1SearchEntriesResponse> = Schema.suspend(() => Schema.Struct({
  totalSize: Schema.optional(Schema.Number),
  nextPageToken: Schema.optional(Schema.String),
  results: Schema.optional(Schema.Array(GoogleCloudDataplexV1SearchEntriesResult)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1SearchEntriesResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1SearchEntriesResponse>;

export interface GoogleCloudDataplexV1DataDocumentationResultField {
  /** Output only. The name of the column. */
  name?: string;
  /** Output only. Nested fields. */
  fields?: Array<GoogleCloudDataplexV1DataDocumentationResultField>;
  /** Output only. Generated description for columns and fields. */
  description?: string;
}

export const GoogleCloudDataplexV1DataDocumentationResultField: Schema.Schema<GoogleCloudDataplexV1DataDocumentationResultField> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataDocumentationResultField)),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataDocumentationResultField" }) as any as Schema.Schema<GoogleCloudDataplexV1DataDocumentationResultField>;

export interface GoogleCloudDataplexV1DataDocumentationResultSchema {
  /** Output only. The list of columns. */
  fields?: Array<GoogleCloudDataplexV1DataDocumentationResultField>;
}

export const GoogleCloudDataplexV1DataDocumentationResultSchema: Schema.Schema<GoogleCloudDataplexV1DataDocumentationResultSchema> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataDocumentationResultField)),
})).annotate({ identifier: "GoogleCloudDataplexV1DataDocumentationResultSchema" }) as any as Schema.Schema<GoogleCloudDataplexV1DataDocumentationResultSchema>;

export interface GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo {
  /** Output only. Average of non-null values in the scanned data. NaN, if the field has a NaN. */
  average?: number;
  /** Output only. Standard deviation of non-null values in the scanned data. NaN, if the field has a NaN. */
  standardDeviation?: number;
  /** Output only. A quartile divides the number of data points into four parts, or quarters, of more-or-less equal size. Three main quartiles used are: The first quartile (Q1) splits off the lowest 25% of data from the highest 75%. It is also known as the lower or 25th empirical quartile, as 25% of the data is below this point. The second quartile (Q2) is the median of a data set. So, 50% of the data lies below this point. The third quartile (Q3) splits off the highest 25% of data from the lowest 75%. It is known as the upper or 75th empirical quartile, as 75% of the data lies below this point. Here, the quartiles is provided as an ordered list of approximate quartile values for the scanned data, occurring in order Q1, median, Q3. */
  quartiles?: Array<string>;
  /** Output only. Minimum of non-null values in the scanned data. NaN, if the field has a NaN. */
  min?: string;
  /** Output only. Maximum of non-null values in the scanned data. NaN, if the field has a NaN. */
  max?: string;
}

export const GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo: Schema.Schema<GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo> = Schema.suspend(() => Schema.Struct({
  average: Schema.optional(Schema.Number),
  standardDeviation: Schema.optional(Schema.Number),
  quartiles: Schema.optional(Schema.Array(Schema.String)),
  min: Schema.optional(Schema.String),
  max: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo>;

export interface GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoDoubleFieldInfo {
  /** Output only. A quartile divides the number of data points into four parts, or quarters, of more-or-less equal size. Three main quartiles used are: The first quartile (Q1) splits off the lowest 25% of data from the highest 75%. It is also known as the lower or 25th empirical quartile, as 25% of the data is below this point. The second quartile (Q2) is the median of a data set. So, 50% of the data lies below this point. The third quartile (Q3) splits off the highest 25% of data from the lowest 75%. It is known as the upper or 75th empirical quartile, as 75% of the data lies below this point. Here, the quartiles is provided as an ordered list of quartile values for the scanned data, occurring in order Q1, median, Q3. */
  quartiles?: Array<number>;
  /** Output only. Minimum of non-null values in the scanned data. NaN, if the field has a NaN. */
  min?: number;
  /** Output only. Average of non-null values in the scanned data. NaN, if the field has a NaN. */
  average?: number;
  /** Output only. Maximum of non-null values in the scanned data. NaN, if the field has a NaN. */
  max?: number;
  /** Output only. Standard deviation of non-null values in the scanned data. NaN, if the field has a NaN. */
  standardDeviation?: number;
}

export const GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoDoubleFieldInfo: Schema.Schema<GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoDoubleFieldInfo> = Schema.suspend(() => Schema.Struct({
  quartiles: Schema.optional(Schema.Array(Schema.Number)),
  min: Schema.optional(Schema.Number),
  average: Schema.optional(Schema.Number),
  max: Schema.optional(Schema.Number),
  standardDeviation: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoDoubleFieldInfo" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoDoubleFieldInfo>;

export interface GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo {
  /** Output only. Maximum length of non-null values in the scanned data. */
  maxLength?: string;
  /** Output only. Minimum length of non-null values in the scanned data. */
  minLength?: string;
  /** Output only. Average length of non-null values in the scanned data. */
  averageLength?: number;
}

export const GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo: Schema.Schema<GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo> = Schema.suspend(() => Schema.Struct({
  maxLength: Schema.optional(Schema.String),
  minLength: Schema.optional(Schema.String),
  averageLength: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo>;

export interface GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo {
  /** Output only. Ratio of rows with null value against total scanned rows. */
  nullRatio?: number;
  /** Output only. Ratio of rows with distinct values against total scanned rows. Not available for complex non-groupable field type, including RECORD, ARRAY, GEOGRAPHY, and JSON, as well as fields with REPEATABLE mode. */
  distinctRatio?: number;
  /** Output only. The list of top N non-null values, frequency and ratio with which they occur in the scanned data. N is 10 or equal to the number of distinct values in the field, whichever is smaller. Not available for complex non-groupable field type, including RECORD, ARRAY, GEOGRAPHY, and JSON, as well as fields with REPEATABLE mode. */
  topNValues?: Array<GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue>;
  /** Integer type field information. */
  integerProfile?: GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo;
  /** Double type field information. */
  doubleProfile?: GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoDoubleFieldInfo;
  /** String type field information. */
  stringProfile?: GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo;
}

export const GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo: Schema.Schema<GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo> = Schema.suspend(() => Schema.Struct({
  nullRatio: Schema.optional(Schema.Number),
  distinctRatio: Schema.optional(Schema.Number),
  topNValues: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoTopNValue)),
  integerProfile: Schema.optional(GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoIntegerFieldInfo),
  doubleProfile: Schema.optional(GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoDoubleFieldInfo),
  stringProfile: Schema.optional(GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfoStringFieldInfo),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo>;

export interface GoogleCloudDataplexV1TriggerOneTime {
  /** Optional. Time to live for OneTime scans. default value is 24 hours, minimum value is 0 seconds, and maximum value is 365 days. The time is calculated from the data scan job completion time. If value is set as 0 seconds, the scan will be immediately deleted upon job completion, regardless of whether the job succeeded or failed. */
  ttlAfterScanCompletion?: string;
}

export const GoogleCloudDataplexV1TriggerOneTime: Schema.Schema<GoogleCloudDataplexV1TriggerOneTime> = Schema.suspend(() => Schema.Struct({
  ttlAfterScanCompletion: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1TriggerOneTime" }) as any as Schema.Schema<GoogleCloudDataplexV1TriggerOneTime>;

export interface GoogleCloudDataplexV1DataScanExecutionStatus {
  /** Optional. The time when the latest DataScanJob ended. */
  latestJobEndTime?: string;
  /** Optional. The time when the DataScanJob execution was created. */
  latestJobCreateTime?: string;
  /** Optional. The time when the latest DataScanJob started. */
  latestJobStartTime?: string;
}

export const GoogleCloudDataplexV1DataScanExecutionStatus: Schema.Schema<GoogleCloudDataplexV1DataScanExecutionStatus> = Schema.suspend(() => Schema.Struct({
  latestJobEndTime: Schema.optional(Schema.String),
  latestJobCreateTime: Schema.optional(Schema.String),
  latestJobStartTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataScanExecutionStatus" }) as any as Schema.Schema<GoogleCloudDataplexV1DataScanExecutionStatus>;

export interface GoogleCloudDataplexV1Session {
  /** Output only. The relative resource name of the content, of the form: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/environment/{environment_id}/sessions/{session_id} */
  name?: string;
  /** Output only. Session start time. */
  createTime?: string;
  /** Output only. Email of user running the session. */
  userId?: string;
  /** Output only. State of Session */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "ACTION_REQUIRED" | (string & {});
}

export const GoogleCloudDataplexV1Session: Schema.Schema<GoogleCloudDataplexV1Session> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1Session" }) as any as Schema.Schema<GoogleCloudDataplexV1Session>;

export interface GoogleCloudDataplexV1ListSessionsResponse {
  /** Sessions under a given environment. */
  sessions?: Array<GoogleCloudDataplexV1Session>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const GoogleCloudDataplexV1ListSessionsResponse: Schema.Schema<GoogleCloudDataplexV1ListSessionsResponse> = Schema.suspend(() => Schema.Struct({
  sessions: Schema.optional(Schema.Array(GoogleCloudDataplexV1Session)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ListSessionsResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListSessionsResponse>;

export interface GoogleCloudDataplexV1ActionMissingResource {
}

export const GoogleCloudDataplexV1ActionMissingResource: Schema.Schema<GoogleCloudDataplexV1ActionMissingResource> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDataplexV1ActionMissingResource" }) as any as Schema.Schema<GoogleCloudDataplexV1ActionMissingResource>;

export interface GoogleCloudDataplexV1ActionInvalidDataOrganization {
}

export const GoogleCloudDataplexV1ActionInvalidDataOrganization: Schema.Schema<GoogleCloudDataplexV1ActionInvalidDataOrganization> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDataplexV1ActionInvalidDataOrganization" }) as any as Schema.Schema<GoogleCloudDataplexV1ActionInvalidDataOrganization>;

export interface GoogleCloudDataplexV1ActionUnauthorizedResource {
}

export const GoogleCloudDataplexV1ActionUnauthorizedResource: Schema.Schema<GoogleCloudDataplexV1ActionUnauthorizedResource> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDataplexV1ActionUnauthorizedResource" }) as any as Schema.Schema<GoogleCloudDataplexV1ActionUnauthorizedResource>;

export interface GoogleCloudDataplexV1ActionMissingData {
}

export const GoogleCloudDataplexV1ActionMissingData: Schema.Schema<GoogleCloudDataplexV1ActionMissingData> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDataplexV1ActionMissingData" }) as any as Schema.Schema<GoogleCloudDataplexV1ActionMissingData>;

export interface GoogleCloudDataplexV1ActionIncompatibleDataSchema {
  /** The new and incompatible schema within the table. The schema is provided as a JSON formatted structured listing columns and data types. */
  newSchema?: string;
  /** Whether the action relates to a schema that is incompatible or modified. */
  schemaChange?: "SCHEMA_CHANGE_UNSPECIFIED" | "INCOMPATIBLE" | "MODIFIED" | (string & {});
  /** The list of data locations sampled and used for format/schema inference. */
  sampledDataLocations?: Array<string>;
  /** The existing and expected schema of the table. The schema is provided as a JSON formatted structure listing columns and data types. */
  existingSchema?: string;
  /** The name of the table containing invalid data. */
  table?: string;
}

export const GoogleCloudDataplexV1ActionIncompatibleDataSchema: Schema.Schema<GoogleCloudDataplexV1ActionIncompatibleDataSchema> = Schema.suspend(() => Schema.Struct({
  newSchema: Schema.optional(Schema.String),
  schemaChange: Schema.optional(Schema.String),
  sampledDataLocations: Schema.optional(Schema.Array(Schema.String)),
  existingSchema: Schema.optional(Schema.String),
  table: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ActionIncompatibleDataSchema" }) as any as Schema.Schema<GoogleCloudDataplexV1ActionIncompatibleDataSchema>;

export interface GoogleCloudDataplexV1ActionInvalidDataFormat {
  /** The list of data locations sampled and used for format/schema inference. */
  sampledDataLocations?: Array<string>;
  /** The expected data format of the entity. */
  expectedFormat?: string;
  /** The new unexpected data format within the entity. */
  newFormat?: string;
}

export const GoogleCloudDataplexV1ActionInvalidDataFormat: Schema.Schema<GoogleCloudDataplexV1ActionInvalidDataFormat> = Schema.suspend(() => Schema.Struct({
  sampledDataLocations: Schema.optional(Schema.Array(Schema.String)),
  expectedFormat: Schema.optional(Schema.String),
  newFormat: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ActionInvalidDataFormat" }) as any as Schema.Schema<GoogleCloudDataplexV1ActionInvalidDataFormat>;

export interface GoogleCloudDataplexV1ActionFailedSecurityPolicyApply {
  /** Resource name of one of the assets with failing security policy application. Populated for a lake or zone resource only. */
  asset?: string;
}

export const GoogleCloudDataplexV1ActionFailedSecurityPolicyApply: Schema.Schema<GoogleCloudDataplexV1ActionFailedSecurityPolicyApply> = Schema.suspend(() => Schema.Struct({
  asset: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ActionFailedSecurityPolicyApply" }) as any as Schema.Schema<GoogleCloudDataplexV1ActionFailedSecurityPolicyApply>;

export interface GoogleCloudDataplexV1ActionInvalidDataPartition {
  /** The issue type of InvalidDataPartition. */
  expectedStructure?: "PARTITION_STRUCTURE_UNSPECIFIED" | "CONSISTENT_KEYS" | "HIVE_STYLE_KEYS" | (string & {});
}

export const GoogleCloudDataplexV1ActionInvalidDataPartition: Schema.Schema<GoogleCloudDataplexV1ActionInvalidDataPartition> = Schema.suspend(() => Schema.Struct({
  expectedStructure: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ActionInvalidDataPartition" }) as any as Schema.Schema<GoogleCloudDataplexV1ActionInvalidDataPartition>;

export interface GoogleCloudDataplexV1Action {
  /** Details for issues related to absence of a managed resource. */
  missingResource?: GoogleCloudDataplexV1ActionMissingResource;
  /** Details for issues related to invalid data arrangement. */
  invalidDataOrganization?: GoogleCloudDataplexV1ActionInvalidDataOrganization;
  /** Details for issues related to lack of permissions to access data resources. */
  unauthorizedResource?: GoogleCloudDataplexV1ActionUnauthorizedResource;
  /** Output only. The relative resource name of the lake, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. */
  lake?: string;
  /** Details for issues related to absence of data within managed resources. */
  missingData?: GoogleCloudDataplexV1ActionMissingData;
  /** Detailed description of the issue requiring action. */
  issue?: string;
  /** Details for issues related to incompatible schemas detected within data. */
  incompatibleDataSchema?: GoogleCloudDataplexV1ActionIncompatibleDataSchema;
  /** Details for issues related to invalid or unsupported data formats. */
  invalidDataFormat?: GoogleCloudDataplexV1ActionInvalidDataFormat;
  /** Output only. The relative resource name of the asset, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}. */
  asset?: string;
  /** Output only. The relative resource name of the action, of the form: projects/{project}/locations/{location}/lakes/{lake}/actions/{action} projects/{project}/locations/{location}/lakes/{lake}/zones/{zone}/actions/{action} projects/{project}/locations/{location}/lakes/{lake}/zones/{zone}/assets/{asset}/actions/{action}. */
  name?: string;
  /** The time that the issue was detected. */
  detectTime?: string;
  /** The category of issue associated with the action. */
  category?: "CATEGORY_UNSPECIFIED" | "RESOURCE_MANAGEMENT" | "SECURITY_POLICY" | "DATA_DISCOVERY" | (string & {});
  /** The list of data locations associated with this action. Cloud Storage locations are represented as URI paths(E.g. gs://bucket/table1/year=2020/month=Jan/). BigQuery locations refer to resource names(E.g. bigquery.googleapis.com/projects/project-id/datasets/dataset-id). */
  dataLocations?: Array<string>;
  /** Output only. The relative resource name of the zone, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. */
  zone?: string;
  /** Details for issues related to applying security policy. */
  failedSecurityPolicyApply?: GoogleCloudDataplexV1ActionFailedSecurityPolicyApply;
  /** Details for issues related to invalid or unsupported data partition structure. */
  invalidDataPartition?: GoogleCloudDataplexV1ActionInvalidDataPartition;
}

export const GoogleCloudDataplexV1Action: Schema.Schema<GoogleCloudDataplexV1Action> = Schema.suspend(() => Schema.Struct({
  missingResource: Schema.optional(GoogleCloudDataplexV1ActionMissingResource),
  invalidDataOrganization: Schema.optional(GoogleCloudDataplexV1ActionInvalidDataOrganization),
  unauthorizedResource: Schema.optional(GoogleCloudDataplexV1ActionUnauthorizedResource),
  lake: Schema.optional(Schema.String),
  missingData: Schema.optional(GoogleCloudDataplexV1ActionMissingData),
  issue: Schema.optional(Schema.String),
  incompatibleDataSchema: Schema.optional(GoogleCloudDataplexV1ActionIncompatibleDataSchema),
  invalidDataFormat: Schema.optional(GoogleCloudDataplexV1ActionInvalidDataFormat),
  asset: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  detectTime: Schema.optional(Schema.String),
  category: Schema.optional(Schema.String),
  dataLocations: Schema.optional(Schema.Array(Schema.String)),
  zone: Schema.optional(Schema.String),
  failedSecurityPolicyApply: Schema.optional(GoogleCloudDataplexV1ActionFailedSecurityPolicyApply),
  invalidDataPartition: Schema.optional(GoogleCloudDataplexV1ActionInvalidDataPartition),
})).annotate({ identifier: "GoogleCloudDataplexV1Action" }) as any as Schema.Schema<GoogleCloudDataplexV1Action>;

export interface GoogleCloudDataplexV1ListActionsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Actions under the given parent lake/zone/asset. */
  actions?: Array<GoogleCloudDataplexV1Action>;
}

export const GoogleCloudDataplexV1ListActionsResponse: Schema.Schema<GoogleCloudDataplexV1ListActionsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  actions: Schema.optional(Schema.Array(GoogleCloudDataplexV1Action)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListActionsResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListActionsResponse>;

export interface GoogleCloudDataplexV1DataAccessSpec {
  /** Optional. The format of strings follows the pattern followed by IAM in the bindings. user:{email}, serviceAccount:{email} group:{email}. The set of principals to be granted reader role on data stored within resources. */
  readers?: Array<string>;
}

export const GoogleCloudDataplexV1DataAccessSpec: Schema.Schema<GoogleCloudDataplexV1DataAccessSpec> = Schema.suspend(() => Schema.Struct({
  readers: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1DataAccessSpec" }) as any as Schema.Schema<GoogleCloudDataplexV1DataAccessSpec>;

export interface GoogleCloudDataplexV1EntryLinkEntryReference {
  /** Required. Immutable. The relative resource name of the referenced Entry, of the form: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id} */
  name?: string;
  /** Immutable. The path in the Entry that is referenced in the Entry Link. Empty path denotes that the Entry itself is referenced in the Entry Link. */
  path?: string;
  /** Required. Immutable. The reference type of the Entry. */
  type?: "UNSPECIFIED" | "SOURCE" | "TARGET" | (string & {});
}

export const GoogleCloudDataplexV1EntryLinkEntryReference: Schema.Schema<GoogleCloudDataplexV1EntryLinkEntryReference> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  path: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1EntryLinkEntryReference" }) as any as Schema.Schema<GoogleCloudDataplexV1EntryLinkEntryReference>;

export interface GoogleCloudDataplexV1AssetDiscoveryStatusStats {
  /** The count of fileset entities within the referenced resource. */
  filesets?: string;
  /** The count of data items within the referenced resource. */
  dataItems?: string;
  /** The number of stored data bytes within the referenced resource. */
  dataSize?: string;
  /** The count of table entities within the referenced resource. */
  tables?: string;
}

export const GoogleCloudDataplexV1AssetDiscoveryStatusStats: Schema.Schema<GoogleCloudDataplexV1AssetDiscoveryStatusStats> = Schema.suspend(() => Schema.Struct({
  filesets: Schema.optional(Schema.String),
  dataItems: Schema.optional(Schema.String),
  dataSize: Schema.optional(Schema.String),
  tables: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1AssetDiscoveryStatusStats" }) as any as Schema.Schema<GoogleCloudDataplexV1AssetDiscoveryStatusStats>;

export interface GoogleCloudDataplexV1DataDiscoveryResultBigQueryPublishing {
  /** Output only. The BigQuery dataset the discovered tables are published to. */
  dataset?: string;
  /** Output only. The location of the BigQuery publishing dataset. */
  location?: string;
}

export const GoogleCloudDataplexV1DataDiscoveryResultBigQueryPublishing: Schema.Schema<GoogleCloudDataplexV1DataDiscoveryResultBigQueryPublishing> = Schema.suspend(() => Schema.Struct({
  dataset: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataDiscoveryResultBigQueryPublishing" }) as any as Schema.Schema<GoogleCloudDataplexV1DataDiscoveryResultBigQueryPublishing>;

export interface GoogleCloudDataplexV1DataDiscoveryResultScanStatistics {
  /** The number of filesets deleted. */
  filesetsDeleted?: number;
  /** The number of tables created. */
  tablesCreated?: number;
  /** The number of filesets created. */
  filesetsCreated?: number;
  /** The number of filesets updated. */
  filesetsUpdated?: number;
  /** The number of tables deleted. */
  tablesDeleted?: number;
  /** The number of files scanned. */
  scannedFileCount?: number;
  /** The data processed in bytes. */
  dataProcessedBytes?: string;
  /** The number of files excluded. */
  filesExcluded?: number;
  /** The number of tables updated. */
  tablesUpdated?: number;
}

export const GoogleCloudDataplexV1DataDiscoveryResultScanStatistics: Schema.Schema<GoogleCloudDataplexV1DataDiscoveryResultScanStatistics> = Schema.suspend(() => Schema.Struct({
  filesetsDeleted: Schema.optional(Schema.Number),
  tablesCreated: Schema.optional(Schema.Number),
  filesetsCreated: Schema.optional(Schema.Number),
  filesetsUpdated: Schema.optional(Schema.Number),
  tablesDeleted: Schema.optional(Schema.Number),
  scannedFileCount: Schema.optional(Schema.Number),
  dataProcessedBytes: Schema.optional(Schema.String),
  filesExcluded: Schema.optional(Schema.Number),
  tablesUpdated: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDataplexV1DataDiscoveryResultScanStatistics" }) as any as Schema.Schema<GoogleCloudDataplexV1DataDiscoveryResultScanStatistics>;

export interface GoogleCloudDataplexV1DataDiscoveryResult {
  /** Output only. Configuration for metadata publishing. */
  bigqueryPublishing?: GoogleCloudDataplexV1DataDiscoveryResultBigQueryPublishing;
  /** Output only. Describes result statistics of a data scan discovery job. */
  scanStatistics?: GoogleCloudDataplexV1DataDiscoveryResultScanStatistics;
}

export const GoogleCloudDataplexV1DataDiscoveryResult: Schema.Schema<GoogleCloudDataplexV1DataDiscoveryResult> = Schema.suspend(() => Schema.Struct({
  bigqueryPublishing: Schema.optional(GoogleCloudDataplexV1DataDiscoveryResultBigQueryPublishing),
  scanStatistics: Schema.optional(GoogleCloudDataplexV1DataDiscoveryResultScanStatistics),
})).annotate({ identifier: "GoogleCloudDataplexV1DataDiscoveryResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataDiscoveryResult>;

export interface GoogleCloudDataplexV1DataQualitySpecPostScanActionsRecipients {
  /** Optional. The email recipients who will receive the DataQualityScan results report. */
  emails?: Array<string>;
}

export const GoogleCloudDataplexV1DataQualitySpecPostScanActionsRecipients: Schema.Schema<GoogleCloudDataplexV1DataQualitySpecPostScanActionsRecipients> = Schema.suspend(() => Schema.Struct({
  emails: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualitySpecPostScanActionsRecipients" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualitySpecPostScanActionsRecipients>;

export interface GoogleCloudDataplexV1DataDocumentationResultQuery {
  /** Output only. The description for the query. */
  description?: string;
  /** Output only. The SQL query string which can be executed. */
  sql?: string;
}

export const GoogleCloudDataplexV1DataDocumentationResultQuery: Schema.Schema<GoogleCloudDataplexV1DataDocumentationResultQuery> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  sql: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataDocumentationResultQuery" }) as any as Schema.Schema<GoogleCloudDataplexV1DataDocumentationResultQuery>;

export interface GoogleCloudDataplexV1GenerateDataQualityRulesRequest {
}

export const GoogleCloudDataplexV1GenerateDataQualityRulesRequest: Schema.Schema<GoogleCloudDataplexV1GenerateDataQualityRulesRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDataplexV1GenerateDataQualityRulesRequest" }) as any as Schema.Schema<GoogleCloudDataplexV1GenerateDataQualityRulesRequest>;

export interface GoogleCloudDataplexV1DataProfileResultProfileField {
  /** Output only. The data type retrieved from the schema of the data source. For instance, for a BigQuery native table, it is the BigQuery Table Schema (https://cloud.google.com/bigquery/docs/reference/rest/v2/tables#tablefieldschema). For a Dataplex Universal Catalog Entity, it is the Entity Schema (https://cloud.google.com/dataplex/docs/reference/rpc/google.cloud.dataplex.v1#type_3). */
  type?: string;
  /** Output only. The name of the field. */
  name?: string;
  /** Output only. The mode of the field. Possible values include: REQUIRED, if it is a required field. NULLABLE, if it is an optional field. REPEATED, if it is a repeated field. */
  mode?: string;
  /** Output only. Profile information for the corresponding field. */
  profile?: GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo;
}

export const GoogleCloudDataplexV1DataProfileResultProfileField: Schema.Schema<GoogleCloudDataplexV1DataProfileResultProfileField> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  mode: Schema.optional(Schema.String),
  profile: Schema.optional(GoogleCloudDataplexV1DataProfileResultProfileFieldProfileInfo),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProfileResultProfileField" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProfileResultProfileField>;

export interface GoogleCloudDataplexV1DataProfileResultProfile {
  /** Output only. List of fields with structural and profile information for each field. */
  fields?: Array<GoogleCloudDataplexV1DataProfileResultProfileField>;
}

export const GoogleCloudDataplexV1DataProfileResultProfile: Schema.Schema<GoogleCloudDataplexV1DataProfileResultProfile> = Schema.suspend(() => Schema.Struct({
  fields: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataProfileResultProfileField)),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProfileResultProfile" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProfileResultProfile>;

export interface GoogleCloudDataplexV1AssetDiscoverySpecJsonOptions {
  /** Optional. The character encoding of the data. The default is UTF-8. */
  encoding?: string;
  /** Optional. Whether to disable the inference of data type for Json data. If true, all columns will be registered as their primitive types (strings, number or boolean). */
  disableTypeInference?: boolean;
}

export const GoogleCloudDataplexV1AssetDiscoverySpecJsonOptions: Schema.Schema<GoogleCloudDataplexV1AssetDiscoverySpecJsonOptions> = Schema.suspend(() => Schema.Struct({
  encoding: Schema.optional(Schema.String),
  disableTypeInference: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDataplexV1AssetDiscoverySpecJsonOptions" }) as any as Schema.Schema<GoogleCloudDataplexV1AssetDiscoverySpecJsonOptions>;

export interface GoogleCloudDataplexV1StorageFormatJsonOptions {
  /** Optional. The character encoding of the data. Accepts "US-ASCII", "UTF-8" and "ISO-8859-1". Defaults to UTF-8 if not specified. */
  encoding?: string;
}

export const GoogleCloudDataplexV1StorageFormatJsonOptions: Schema.Schema<GoogleCloudDataplexV1StorageFormatJsonOptions> = Schema.suspend(() => Schema.Struct({
  encoding: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1StorageFormatJsonOptions" }) as any as Schema.Schema<GoogleCloudDataplexV1StorageFormatJsonOptions>;

export interface GoogleCloudDataplexV1StorageFormat {
  /** Optional. Additional information about CSV formatted data. */
  json?: GoogleCloudDataplexV1StorageFormatJsonOptions;
  /** Output only. The data format associated with the stored data, which represents content type values. The value is inferred from mime type. */
  format?: "FORMAT_UNSPECIFIED" | "PARQUET" | "AVRO" | "ORC" | "CSV" | "JSON" | "IMAGE" | "AUDIO" | "VIDEO" | "TEXT" | "TFRECORD" | "OTHER" | "UNKNOWN" | (string & {});
  /** Optional. The compression type associated with the stored data. If unspecified, the data is uncompressed. */
  compressionFormat?: "COMPRESSION_FORMAT_UNSPECIFIED" | "GZIP" | "BZIP2" | (string & {});
  /** Optional. Additional information about CSV formatted data. */
  csv?: GoogleCloudDataplexV1StorageFormatCsvOptions;
  /** Required. The mime type descriptor for the data. Must match the pattern {type}/{subtype}. Supported values: application/x-parquet application/x-avro application/x-orc application/x-tfrecord application/x-parquet+iceberg application/x-avro+iceberg application/x-orc+iceberg application/json application/{subtypes} text/csv text/ image/{image subtype} video/{video subtype} audio/{audio subtype} */
  mimeType?: string;
  /** Optional. Additional information about iceberg tables. */
  iceberg?: GoogleCloudDataplexV1StorageFormatIcebergOptions;
}

export const GoogleCloudDataplexV1StorageFormat: Schema.Schema<GoogleCloudDataplexV1StorageFormat> = Schema.suspend(() => Schema.Struct({
  json: Schema.optional(GoogleCloudDataplexV1StorageFormatJsonOptions),
  format: Schema.optional(Schema.String),
  compressionFormat: Schema.optional(Schema.String),
  csv: Schema.optional(GoogleCloudDataplexV1StorageFormatCsvOptions),
  mimeType: Schema.optional(Schema.String),
  iceberg: Schema.optional(GoogleCloudDataplexV1StorageFormatIcebergOptions),
})).annotate({ identifier: "GoogleCloudDataplexV1StorageFormat" }) as any as Schema.Schema<GoogleCloudDataplexV1StorageFormat>;

export interface GoogleCloudDataplexV1StorageAccess {
  /** Output only. Describes the read access mechanism of the data. Not user settable. */
  read?: "ACCESS_MODE_UNSPECIFIED" | "DIRECT" | "MANAGED" | (string & {});
}

export const GoogleCloudDataplexV1StorageAccess: Schema.Schema<GoogleCloudDataplexV1StorageAccess> = Schema.suspend(() => Schema.Struct({
  read: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1StorageAccess" }) as any as Schema.Schema<GoogleCloudDataplexV1StorageAccess>;

export interface GoogleCloudDataplexV1SchemaPartitionField {
  /** Required. Partition field name must consist of letters, numbers, and underscores only, with a maximum of length of 256 characters, and must begin with a letter or underscore.. */
  name?: string;
  /** Required. Immutable. The type of field. */
  type?: "TYPE_UNSPECIFIED" | "BOOLEAN" | "BYTE" | "INT16" | "INT32" | "INT64" | "FLOAT" | "DOUBLE" | "DECIMAL" | "STRING" | "BINARY" | "TIMESTAMP" | "DATE" | "TIME" | "RECORD" | "NULL" | (string & {});
}

export const GoogleCloudDataplexV1SchemaPartitionField: Schema.Schema<GoogleCloudDataplexV1SchemaPartitionField> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1SchemaPartitionField" }) as any as Schema.Schema<GoogleCloudDataplexV1SchemaPartitionField>;

export interface GoogleCloudDataplexV1Schema {
  /** Optional. The sequence of fields describing the partition structure in entities. If this field is empty, there are no partitions within the data. */
  partitionFields?: Array<GoogleCloudDataplexV1SchemaPartitionField>;
  /** Optional. The structure of paths containing partition data within the entity. */
  partitionStyle?: "PARTITION_STYLE_UNSPECIFIED" | "HIVE_COMPATIBLE" | (string & {});
  /** Optional. The sequence of fields describing data in table entities. Note: BigQuery SchemaFields are immutable. */
  fields?: Array<GoogleCloudDataplexV1SchemaSchemaField>;
  /** Required. Set to true if user-managed or false if managed by Dataplex Universal Catalog. The default is false (managed by Dataplex Universal Catalog). Set to falseto enable Dataplex Universal Catalog discovery to update the schema. including new data discovery, schema inference, and schema evolution. Users retain the ability to input and edit the schema. Dataplex Universal Catalog treats schema input by the user as though produced by a previous Dataplex Universal Catalog discovery operation, and it will evolve the schema and take action based on that treatment. Set to true to fully manage the entity schema. This setting guarantees that Dataplex Universal Catalog will not change schema fields. */
  userManaged?: boolean;
}

export const GoogleCloudDataplexV1Schema: Schema.Schema<GoogleCloudDataplexV1Schema> = Schema.suspend(() => Schema.Struct({
  partitionFields: Schema.optional(Schema.Array(GoogleCloudDataplexV1SchemaPartitionField)),
  partitionStyle: Schema.optional(Schema.String),
  fields: Schema.optional(Schema.Array(GoogleCloudDataplexV1SchemaSchemaField)),
  userManaged: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDataplexV1Schema" }) as any as Schema.Schema<GoogleCloudDataplexV1Schema>;

export interface GoogleCloudDataplexV1Entity {
  /** Optional. User friendly longer description text. Must be shorter than or equal to 1024 characters. */
  description?: string;
  /** Required. Identifies the storage format of the entity data. It does not apply to entities with data stored in BigQuery. */
  format?: GoogleCloudDataplexV1StorageFormat;
  /** Output only. Identifies the access mechanism to the entity. Not user settable. */
  access?: GoogleCloudDataplexV1StorageAccess;
  /** Output only. System generated unique ID for the Entity. This ID will be different if the Entity is deleted and re-created with the same name. */
  uid?: string;
  /** Output only. The time when the entity was created. */
  createTime?: string;
  /** Output only. The resource name of the entity, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{id}. */
  name?: string;
  /** Output only. The name of the associated Data Catalog entry. */
  catalogEntry?: string;
  /** Optional. The set of items within the data path constituting the data in the entity, represented as a glob path. Example: gs://bucket/path/to/data/** /*.csv. */
  dataPathPattern?: string;
  /** Optional. The etag associated with the entity, which can be retrieved with a GetEntity request. Required for update and delete requests. */
  etag?: string;
  /** Required. The description of the data structure and layout. The schema is not included in list responses. It is only included in SCHEMA and FULL entity views of a GetEntity response. */
  schema?: GoogleCloudDataplexV1Schema;
  /** Required. Immutable. The ID of the asset associated with the storage location containing the entity data. The entity must be with in the same zone with the asset. */
  asset?: string;
  /** Required. Immutable. Identifies the storage system of the entity data. */
  system?: "STORAGE_SYSTEM_UNSPECIFIED" | "CLOUD_STORAGE" | "BIGQUERY" | (string & {});
  /** Required. A user-provided entity ID. It is mutable, and will be used as the published table name. Specifying a new ID in an update entity request will override the existing value. The ID must contain only letters (a-z, A-Z), numbers (0-9), and underscores, and consist of 256 or fewer characters. */
  id?: string;
  /** Output only. The time when the entity was last updated. */
  updateTime?: string;
  /** Required. Immutable. The storage path of the entity data. For Cloud Storage data, this is the fully-qualified path to the entity, such as gs://bucket/path/to/data. For BigQuery data, this is the name of the table resource, such as projects/project_id/datasets/dataset_id/tables/table_id. */
  dataPath?: string;
  /** Output only. Metadata stores that the entity is compatible with. */
  compatibility?: GoogleCloudDataplexV1EntityCompatibilityStatus;
  /** Optional. Display name must be shorter than or equal to 256 characters. */
  displayName?: string;
  /** Required. Immutable. The type of entity. */
  type?: "TYPE_UNSPECIFIED" | "TABLE" | "FILESET" | (string & {});
}

export const GoogleCloudDataplexV1Entity: Schema.Schema<GoogleCloudDataplexV1Entity> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  format: Schema.optional(GoogleCloudDataplexV1StorageFormat),
  access: Schema.optional(GoogleCloudDataplexV1StorageAccess),
  uid: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  catalogEntry: Schema.optional(Schema.String),
  dataPathPattern: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  schema: Schema.optional(GoogleCloudDataplexV1Schema),
  asset: Schema.optional(Schema.String),
  system: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  dataPath: Schema.optional(Schema.String),
  compatibility: Schema.optional(GoogleCloudDataplexV1EntityCompatibilityStatus),
  displayName: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1Entity" }) as any as Schema.Schema<GoogleCloudDataplexV1Entity>;

export interface GoogleCloudDataplexV1DataQualityRuleRowConditionExpectation {
  /** Optional. The SQL expression. */
  sqlExpression?: string;
}

export const GoogleCloudDataplexV1DataQualityRuleRowConditionExpectation: Schema.Schema<GoogleCloudDataplexV1DataQualityRuleRowConditionExpectation> = Schema.suspend(() => Schema.Struct({
  sqlExpression: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityRuleRowConditionExpectation" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityRuleRowConditionExpectation>;

export interface GoogleCloudDataplexV1EnvironmentInfrastructureSpecComputeResources {
  /** Optional. Max configurable nodes. If max_node_count > node_count, then auto-scaling is enabled. */
  maxNodeCount?: number;
  /** Optional. Total number of nodes in the sessions created for this environment. */
  nodeCount?: number;
  /** Optional. Size in GB of the disk. Default is 100 GB. */
  diskSizeGb?: number;
}

export const GoogleCloudDataplexV1EnvironmentInfrastructureSpecComputeResources: Schema.Schema<GoogleCloudDataplexV1EnvironmentInfrastructureSpecComputeResources> = Schema.suspend(() => Schema.Struct({
  maxNodeCount: Schema.optional(Schema.Number),
  nodeCount: Schema.optional(Schema.Number),
  diskSizeGb: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDataplexV1EnvironmentInfrastructureSpecComputeResources" }) as any as Schema.Schema<GoogleCloudDataplexV1EnvironmentInfrastructureSpecComputeResources>;

export interface GoogleCloudDataplexV1DiscoveryEventTableDetails {
  /** The fully-qualified resource name of the table resource. */
  table?: string;
  /** The type of the table resource. */
  type?: "TABLE_TYPE_UNSPECIFIED" | "EXTERNAL_TABLE" | "BIGLAKE_TABLE" | "OBJECT_TABLE" | (string & {});
}

export const GoogleCloudDataplexV1DiscoveryEventTableDetails: Schema.Schema<GoogleCloudDataplexV1DiscoveryEventTableDetails> = Schema.suspend(() => Schema.Struct({
  table: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DiscoveryEventTableDetails" }) as any as Schema.Schema<GoogleCloudDataplexV1DiscoveryEventTableDetails>;

export interface GoogleCloudDataplexV1TaskExecutionSpec {
  /** Optional. The arguments to pass to the task. The args can use placeholders of the format ${placeholder} as part of key/value string. These will be interpolated before passing the args to the driver. Currently supported placeholders: - ${task_id} - ${job_time} To pass positional args, set the key as TASK_ARGS. The value should be a comma-separated string of all the positional arguments. To use a delimiter other than comma, refer to https://cloud.google.com/sdk/gcloud/reference/topic/escaping. In case of other keys being present in the args, then TASK_ARGS will be passed as the last argument. */
  args?: Record<string, string>;
  /** Optional. The project in which jobs are run. By default, the project containing the Lake is used. If a project is provided, the ExecutionSpec.service_account must belong to this project. */
  project?: string;
  /** Optional. The Cloud KMS key to use for encryption, of the form: projects/{project_number}/locations/{location_id}/keyRings/{key-ring-name}/cryptoKeys/{key-name}. */
  kmsKey?: string;
  /** Required. Service account to use to execute a task. If not provided, the default Compute service account for the project is used. */
  serviceAccount?: string;
  /** Optional. The maximum duration after which the job execution is expired. */
  maxJobExecutionLifetime?: string;
}

export const GoogleCloudDataplexV1TaskExecutionSpec: Schema.Schema<GoogleCloudDataplexV1TaskExecutionSpec> = Schema.suspend(() => Schema.Struct({
  args: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  project: Schema.optional(Schema.String),
  kmsKey: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  maxJobExecutionLifetime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1TaskExecutionSpec" }) as any as Schema.Schema<GoogleCloudDataplexV1TaskExecutionSpec>;

export interface GoogleCloudDataplexV1Job {
  /** Output only. System generated globally unique ID for the job. */
  uid?: string;
  /** Output only. The number of times the job has been retried (excluding the initial attempt). */
  retryCount?: number;
  /** Output only. Spec related to how a task is executed. */
  executionSpec?: GoogleCloudDataplexV1TaskExecutionSpec;
  /** Output only. User-defined labels for the task. */
  labels?: Record<string, string>;
  /** Output only. Additional information about the current state. */
  message?: string;
  /** Output only. The underlying service running a job. */
  service?: "SERVICE_UNSPECIFIED" | "DATAPROC" | (string & {});
  /** Output only. Execution state for the job. */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "CANCELLING" | "CANCELLED" | "SUCCEEDED" | "FAILED" | "ABORTED" | (string & {});
  /** Output only. Job execution trigger. */
  trigger?: "TRIGGER_UNSPECIFIED" | "TASK_CONFIG" | "RUN_REQUEST" | (string & {});
  /** Output only. The full resource name for the job run under a particular service. */
  serviceJob?: string;
  /** Output only. The time when the job ended. */
  endTime?: string;
  /** Output only. The time when the job was started. */
  startTime?: string;
  /** Output only. The relative resource name of the job, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}/jobs/{job_id}. */
  name?: string;
}

export const GoogleCloudDataplexV1Job: Schema.Schema<GoogleCloudDataplexV1Job> = Schema.suspend(() => Schema.Struct({
  uid: Schema.optional(Schema.String),
  retryCount: Schema.optional(Schema.Number),
  executionSpec: Schema.optional(GoogleCloudDataplexV1TaskExecutionSpec),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  message: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  trigger: Schema.optional(Schema.String),
  serviceJob: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1Job" }) as any as Schema.Schema<GoogleCloudDataplexV1Job>;

export interface GoogleCloudDataplexV1TaskExecutionStatus {
  /** Output only. Last update time of the status. */
  updateTime?: string;
  /** Output only. latest job execution */
  latestJob?: GoogleCloudDataplexV1Job;
}

export const GoogleCloudDataplexV1TaskExecutionStatus: Schema.Schema<GoogleCloudDataplexV1TaskExecutionStatus> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  latestJob: Schema.optional(GoogleCloudDataplexV1Job),
})).annotate({ identifier: "GoogleCloudDataplexV1TaskExecutionStatus" }) as any as Schema.Schema<GoogleCloudDataplexV1TaskExecutionStatus>;

export interface GoogleCloudDataplexV1EntryGroup {
  /** Output only. Denotes the transfer status of the Entry Group. It is unspecified for Entry Group created from Dataplex API. */
  transferStatus?: "TRANSFER_STATUS_UNSPECIFIED" | "TRANSFER_STATUS_MIGRATED" | "TRANSFER_STATUS_TRANSFERRED" | (string & {});
  /** Optional. User friendly display name. */
  displayName?: string;
  /** Output only. System generated globally unique ID for the EntryGroup. If you delete and recreate the EntryGroup with the same name, this ID will be different. */
  uid?: string;
  /** Output only. The time when the EntryGroup was last updated. */
  updateTime?: string;
  /** This checksum is computed by the service, and might be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. User-defined labels for the EntryGroup. */
  labels?: Record<string, string>;
  /** Optional. Description of the EntryGroup. */
  description?: string;
  /** Output only. The relative resource name of the EntryGroup, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}. */
  name?: string;
  /** Output only. The time when the EntryGroup was created. */
  createTime?: string;
}

export const GoogleCloudDataplexV1EntryGroup: Schema.Schema<GoogleCloudDataplexV1EntryGroup> = Schema.suspend(() => Schema.Struct({
  transferStatus: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1EntryGroup" }) as any as Schema.Schema<GoogleCloudDataplexV1EntryGroup>;

export interface GoogleCloudDataplexV1ListEntryGroupsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Entry groups under the given parent location. */
  entryGroups?: Array<GoogleCloudDataplexV1EntryGroup>;
  /** Locations that the service couldn't reach. */
  unreachableLocations?: Array<string>;
}

export const GoogleCloudDataplexV1ListEntryGroupsResponse: Schema.Schema<GoogleCloudDataplexV1ListEntryGroupsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  entryGroups: Schema.optional(Schema.Array(GoogleCloudDataplexV1EntryGroup)),
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListEntryGroupsResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListEntryGroupsResponse>;

export interface GoogleCloudDataplexV1DataDocumentationResultTableResult {
  /** Output only. Generated description of the table. */
  overview?: string;
  /** Output only. Schema of the table with generated metadata of the columns in the schema. */
  schema?: GoogleCloudDataplexV1DataDocumentationResultSchema;
  /** Output only. Sample SQL queries for the table. */
  queries?: Array<GoogleCloudDataplexV1DataDocumentationResultQuery>;
  /** Output only. The service-qualified full resource name of the cloud resource. Ex: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID */
  name?: string;
}

export const GoogleCloudDataplexV1DataDocumentationResultTableResult: Schema.Schema<GoogleCloudDataplexV1DataDocumentationResultTableResult> = Schema.suspend(() => Schema.Struct({
  overview: Schema.optional(Schema.String),
  schema: Schema.optional(GoogleCloudDataplexV1DataDocumentationResultSchema),
  queries: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataDocumentationResultQuery)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataDocumentationResultTableResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataDocumentationResultTableResult>;

export interface GoogleCloudDataplexV1DataDocumentationResult {
  /** Output only. Table result for insights. */
  tableResult?: GoogleCloudDataplexV1DataDocumentationResultTableResult;
}

export const GoogleCloudDataplexV1DataDocumentationResult: Schema.Schema<GoogleCloudDataplexV1DataDocumentationResult> = Schema.suspend(() => Schema.Struct({
  tableResult: Schema.optional(GoogleCloudDataplexV1DataDocumentationResultTableResult),
})).annotate({ identifier: "GoogleCloudDataplexV1DataDocumentationResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataDocumentationResult>;

export interface GoogleTypeExpr {
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
}

export const GoogleTypeExpr: Schema.Schema<GoogleTypeExpr> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypeExpr" }) as any as Schema.Schema<GoogleTypeExpr>;

export interface GoogleIamV1Binding {
  /** Role that is assigned to the list of members, or principals. For example, roles/viewer, roles/editor, or roles/owner.For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). */
  role?: string;
  /** Specifies the principals requesting access for a Google Cloud resource. members can have the following values: allUsers: A special identifier that represents anyone who is on the internet; with or without a Google account. allAuthenticatedUsers: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. user:{emailid}: An email address that represents a specific Google account. For example, alice@example.com . serviceAccount:{emailid}: An email address that represents a Google service account. For example, my-other-app@appspot.gserviceaccount.com. serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, my-project.svc.id.goog[my-namespace/my-kubernetes-sa]. group:{emailid}: An email address that represents a Google group. For example, admins@example.com. domain:{domain}: The G Suite domain (primary) that represents all the users of that domain. For example, google.com or example.com. principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}: A single identity in a workforce identity pool. principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}: All workforce identities in a group. principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}: All workforce identities with a specific attribute value. principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*: All identities in a workforce identity pool. principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}: A single identity in a workload identity pool. principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}: A workload identity pool group. principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}: All identities in a workload identity pool with a certain attribute. principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*: All identities in a workload identity pool. deleted:user:{emailid}?uid={uniqueid}: An email address (plus unique identifier) representing a user that has been recently deleted. For example, alice@example.com?uid=123456789012345678901. If the user is recovered, this value reverts to user:{emailid} and the recovered user retains the role in the binding. deleted:serviceAccount:{emailid}?uid={uniqueid}: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901. If the service account is undeleted, this value reverts to serviceAccount:{emailid} and the undeleted service account retains the role in the binding. deleted:group:{emailid}?uid={uniqueid}: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, admins@example.com?uid=123456789012345678901. If the group is recovered, this value reverts to group:{emailid} and the recovered group retains the role in the binding. deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}: Deleted single identity in a workforce identity pool. For example, deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value. */
  members?: Array<string>;
  /** The condition that is associated with this binding.If the condition evaluates to true, then this binding applies to the current request.If the condition evaluates to false, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  condition?: GoogleTypeExpr;
}

export const GoogleIamV1Binding: Schema.Schema<GoogleIamV1Binding> = Schema.suspend(() => Schema.Struct({
  role: Schema.optional(Schema.String),
  members: Schema.optional(Schema.Array(Schema.String)),
  condition: Schema.optional(GoogleTypeExpr),
})).annotate({ identifier: "GoogleIamV1Binding" }) as any as Schema.Schema<GoogleIamV1Binding>;

export interface GoogleCloudDataplexV1MetadataJobExportJobSpecExportJobScope {
  /** The aspect types that are in scope for the export job, specified as relative resource names in the format projects/{project_id_or_number}/locations/{location}/aspectTypes/{aspect_type_id}. Only aspects that belong to the specified aspect types are affected by the job. */
  aspectTypes?: Array<string>;
  /** Whether the metadata export job is an organization-level export job. If true, the job exports the entries from the same organization and VPC Service Controls perimeter as the job. The project that the job belongs to determines the VPC Service Controls perimeter. If you set the job scope to be at the organization level, then don't provide a list of projects or entry groups. If false, you must specify a list of projects or a list of entry groups whose entries you want to export.The default is false. */
  organizationLevel?: boolean;
  /** The entry types that are in scope for the export job, specified as relative resource names in the format projects/{project_id_or_number}/locations/{location}/entryTypes/{entry_type_id}. Only entries that belong to the specified entry types are affected by the job. */
  entryTypes?: Array<string>;
  /** The projects whose metadata you want to export, in the format projects/{project_id_or_number}. Only the entries from the specified projects are exported.The projects must be in the same organization and VPC Service Controls perimeter as the job.If you set the job scope to be a list of projects, then set the organization-level export flag to false and don't provide a list of entry groups. */
  projects?: Array<string>;
  /** The entry groups whose metadata you want to export, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}. Only the entries in the specified entry groups are exported.The entry groups must be in the same location and the same VPC Service Controls perimeter as the job.If you set the job scope to be a list of entry groups, then set the organization-level export flag to false and don't provide a list of projects. */
  entryGroups?: Array<string>;
}

export const GoogleCloudDataplexV1MetadataJobExportJobSpecExportJobScope: Schema.Schema<GoogleCloudDataplexV1MetadataJobExportJobSpecExportJobScope> = Schema.suspend(() => Schema.Struct({
  aspectTypes: Schema.optional(Schema.Array(Schema.String)),
  organizationLevel: Schema.optional(Schema.Boolean),
  entryTypes: Schema.optional(Schema.Array(Schema.String)),
  projects: Schema.optional(Schema.Array(Schema.String)),
  entryGroups: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1MetadataJobExportJobSpecExportJobScope" }) as any as Schema.Schema<GoogleCloudDataplexV1MetadataJobExportJobSpecExportJobScope>;

export interface GoogleCloudDataplexV1MetadataJobExportJobSpec {
  /** Required. The root path of the Cloud Storage bucket to export the metadata to, in the format gs://{bucket}/. You can optionally specify a custom prefix after the bucket name, in the format gs://{bucket}/{prefix}/. The maximum length of the custom prefix is 128 characters. Dataplex Universal Catalog constructs the object path for the exported files by using the bucket name and prefix that you provide, followed by a system-generated path.The bucket must be in the same VPC Service Controls perimeter as the job. */
  outputPath?: string;
  /** Required. The scope of the export job. */
  scope?: GoogleCloudDataplexV1MetadataJobExportJobSpecExportJobScope;
}

export const GoogleCloudDataplexV1MetadataJobExportJobSpec: Schema.Schema<GoogleCloudDataplexV1MetadataJobExportJobSpec> = Schema.suspend(() => Schema.Struct({
  outputPath: Schema.optional(Schema.String),
  scope: Schema.optional(GoogleCloudDataplexV1MetadataJobExportJobSpecExportJobScope),
})).annotate({ identifier: "GoogleCloudDataplexV1MetadataJobExportJobSpec" }) as any as Schema.Schema<GoogleCloudDataplexV1MetadataJobExportJobSpec>;

export interface GoogleCloudDataplexV1AssetResourceSpec {
  /** Required. Immutable. Type of resource. */
  type?: "TYPE_UNSPECIFIED" | "STORAGE_BUCKET" | "BIGQUERY_DATASET" | (string & {});
  /** Immutable. Relative name of the cloud resource that contains the data that is being managed within a lake. For example: projects/{project_number}/buckets/{bucket_id} projects/{project_number}/datasets/{dataset_id} */
  name?: string;
  /** Optional. Determines how read permissions are handled for each asset and their associated tables. Only available to storage buckets assets. */
  readAccessMode?: "ACCESS_MODE_UNSPECIFIED" | "DIRECT" | "MANAGED" | (string & {});
}

export const GoogleCloudDataplexV1AssetResourceSpec: Schema.Schema<GoogleCloudDataplexV1AssetResourceSpec> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  readAccessMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1AssetResourceSpec" }) as any as Schema.Schema<GoogleCloudDataplexV1AssetResourceSpec>;

export interface GoogleCloudDataplexV1DataDiscoverySpecBigQueryPublishingConfig {
  /** Optional. The location of the BigQuery dataset to publish BigLake external or non-BigLake external tables to. 1. If the Cloud Storage bucket is located in a multi-region bucket, then BigQuery dataset can be in the same multi-region bucket or any single region that is included in the same multi-region bucket. The datascan can be created in any single region that is included in the same multi-region bucket 2. If the Cloud Storage bucket is located in a dual-region bucket, then BigQuery dataset can be located in regions that are included in the dual-region bucket, or in a multi-region that includes the dual-region. The datascan can be created in any single region that is included in the same dual-region bucket. 3. If the Cloud Storage bucket is located in a single region, then BigQuery dataset can be in the same single region or any multi-region bucket that includes the same single region. The datascan will be created in the same single region as the bucket. 4. If the BigQuery dataset is in single region, it must be in the same single region as the datascan.For supported values, refer to https://cloud.google.com/bigquery/docs/locations#supported_locations. */
  location?: string;
  /** Optional. The project of the BigQuery dataset to publish BigLake external or non-BigLake external tables to. If not specified, the project of the Cloud Storage bucket will be used. The format is "projects/{project_id_or_number}". */
  project?: string;
  /** Optional. The BigQuery connection used to create BigLake tables. Must be in the form projects/{project_id}/locations/{location_id}/connections/{connection_id} */
  connection?: string;
  /** Optional. Determines whether to publish discovered tables as BigLake external tables or non-BigLake external tables. */
  tableType?: "TABLE_TYPE_UNSPECIFIED" | "EXTERNAL" | "BIGLAKE" | (string & {});
}

export const GoogleCloudDataplexV1DataDiscoverySpecBigQueryPublishingConfig: Schema.Schema<GoogleCloudDataplexV1DataDiscoverySpecBigQueryPublishingConfig> = Schema.suspend(() => Schema.Struct({
  location: Schema.optional(Schema.String),
  project: Schema.optional(Schema.String),
  connection: Schema.optional(Schema.String),
  tableType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataDiscoverySpecBigQueryPublishingConfig" }) as any as Schema.Schema<GoogleCloudDataplexV1DataDiscoverySpecBigQueryPublishingConfig>;

export interface GoogleCloudDataplexV1DataDiscoverySpec {
  /** Optional. Configuration for metadata publishing. */
  bigqueryPublishingConfig?: GoogleCloudDataplexV1DataDiscoverySpecBigQueryPublishingConfig;
  /** Cloud Storage related configurations. */
  storageConfig?: GoogleCloudDataplexV1DataDiscoverySpecStorageConfig;
}

export const GoogleCloudDataplexV1DataDiscoverySpec: Schema.Schema<GoogleCloudDataplexV1DataDiscoverySpec> = Schema.suspend(() => Schema.Struct({
  bigqueryPublishingConfig: Schema.optional(GoogleCloudDataplexV1DataDiscoverySpecBigQueryPublishingConfig),
  storageConfig: Schema.optional(GoogleCloudDataplexV1DataDiscoverySpecStorageConfig),
})).annotate({ identifier: "GoogleCloudDataplexV1DataDiscoverySpec" }) as any as Schema.Schema<GoogleCloudDataplexV1DataDiscoverySpec>;

export interface GoogleIamV1TestIamPermissionsRequest {
  /** The set of permissions to check for the resource. Permissions with wildcards (such as * or storage.*) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const GoogleIamV1TestIamPermissionsRequest: Schema.Schema<GoogleIamV1TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIamV1TestIamPermissionsRequest" }) as any as Schema.Schema<GoogleIamV1TestIamPermissionsRequest>;

export interface GoogleCloudDataplexV1DataQualitySpecPostScanActionsBigQueryExport {
  /** Optional. The BigQuery table to export DataQualityScan results to. Format: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID or projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID */
  resultsTable?: string;
}

export const GoogleCloudDataplexV1DataQualitySpecPostScanActionsBigQueryExport: Schema.Schema<GoogleCloudDataplexV1DataQualitySpecPostScanActionsBigQueryExport> = Schema.suspend(() => Schema.Struct({
  resultsTable: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualitySpecPostScanActionsBigQueryExport" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualitySpecPostScanActionsBigQueryExport>;

export interface GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobEndTrigger {
}

export const GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobEndTrigger: Schema.Schema<GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobEndTrigger> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobEndTrigger" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobEndTrigger>;

export interface GoogleCloudDataplexV1DataQualitySpecPostScanActionsScoreThresholdTrigger {
  /** Optional. The score range is in 0,100. */
  scoreThreshold?: number;
}

export const GoogleCloudDataplexV1DataQualitySpecPostScanActionsScoreThresholdTrigger: Schema.Schema<GoogleCloudDataplexV1DataQualitySpecPostScanActionsScoreThresholdTrigger> = Schema.suspend(() => Schema.Struct({
  scoreThreshold: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualitySpecPostScanActionsScoreThresholdTrigger" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualitySpecPostScanActionsScoreThresholdTrigger>;

export interface GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobFailureTrigger {
}

export const GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobFailureTrigger: Schema.Schema<GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobFailureTrigger> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobFailureTrigger" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobFailureTrigger>;

export interface GoogleCloudDataplexV1DataQualitySpecPostScanActionsNotificationReport {
  /** Optional. If set, report will be sent when a scan job ends. */
  jobEndTrigger?: GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobEndTrigger;
  /** Optional. If set, report will be sent when score threshold is met. */
  scoreThresholdTrigger?: GoogleCloudDataplexV1DataQualitySpecPostScanActionsScoreThresholdTrigger;
  /** Optional. If set, report will be sent when a scan job fails. */
  jobFailureTrigger?: GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobFailureTrigger;
  /** Required. The recipients who will receive the notification report. */
  recipients?: GoogleCloudDataplexV1DataQualitySpecPostScanActionsRecipients;
}

export const GoogleCloudDataplexV1DataQualitySpecPostScanActionsNotificationReport: Schema.Schema<GoogleCloudDataplexV1DataQualitySpecPostScanActionsNotificationReport> = Schema.suspend(() => Schema.Struct({
  jobEndTrigger: Schema.optional(GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobEndTrigger),
  scoreThresholdTrigger: Schema.optional(GoogleCloudDataplexV1DataQualitySpecPostScanActionsScoreThresholdTrigger),
  jobFailureTrigger: Schema.optional(GoogleCloudDataplexV1DataQualitySpecPostScanActionsJobFailureTrigger),
  recipients: Schema.optional(GoogleCloudDataplexV1DataQualitySpecPostScanActionsRecipients),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualitySpecPostScanActionsNotificationReport" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualitySpecPostScanActionsNotificationReport>;

export interface GoogleCloudDataplexV1DataQualitySpecPostScanActions {
  /** Optional. If set, results will be exported to the provided BigQuery table. */
  bigqueryExport?: GoogleCloudDataplexV1DataQualitySpecPostScanActionsBigQueryExport;
  /** Optional. If set, results will be sent to the provided notification receipts upon triggers. */
  notificationReport?: GoogleCloudDataplexV1DataQualitySpecPostScanActionsNotificationReport;
}

export const GoogleCloudDataplexV1DataQualitySpecPostScanActions: Schema.Schema<GoogleCloudDataplexV1DataQualitySpecPostScanActions> = Schema.suspend(() => Schema.Struct({
  bigqueryExport: Schema.optional(GoogleCloudDataplexV1DataQualitySpecPostScanActionsBigQueryExport),
  notificationReport: Schema.optional(GoogleCloudDataplexV1DataQualitySpecPostScanActionsNotificationReport),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualitySpecPostScanActions" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualitySpecPostScanActions>;

export interface GoogleCloudDataplexV1EntryTypeAuthorization {
  /** Immutable. The IAM permission grantable on the Entry Group to allow access to instantiate Entries of Dataplex Universal Catalog owned Entry Types, only settable for Dataplex Universal Catalog owned Types. */
  alternateUsePermission?: string;
}

export const GoogleCloudDataplexV1EntryTypeAuthorization: Schema.Schema<GoogleCloudDataplexV1EntryTypeAuthorization> = Schema.suspend(() => Schema.Struct({
  alternateUsePermission: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1EntryTypeAuthorization" }) as any as Schema.Schema<GoogleCloudDataplexV1EntryTypeAuthorization>;

export interface GoogleCloudDataplexV1ZoneDiscoverySpecJsonOptions {
  /** Optional. The character encoding of the data. The default is UTF-8. */
  encoding?: string;
  /** Optional. Whether to disable the inference of data type for Json data. If true, all columns will be registered as their primitive types (strings, number or boolean). */
  disableTypeInference?: boolean;
}

export const GoogleCloudDataplexV1ZoneDiscoverySpecJsonOptions: Schema.Schema<GoogleCloudDataplexV1ZoneDiscoverySpecJsonOptions> = Schema.suspend(() => Schema.Struct({
  encoding: Schema.optional(Schema.String),
  disableTypeInference: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDataplexV1ZoneDiscoverySpecJsonOptions" }) as any as Schema.Schema<GoogleCloudDataplexV1ZoneDiscoverySpecJsonOptions>;

export interface GoogleCloudDataplexV1DiscoveryEventPartitionDetails {
  /** The locations of the data items (e.g., a Cloud Storage objects) sampled for metadata inference. */
  sampledDataLocations?: Array<string>;
  /** The name to the containing entity resource. The name is the fully-qualified resource name. */
  entity?: string;
  /** The name to the partition resource. The name is the fully-qualified resource name. */
  partition?: string;
  /** The type of the containing entity resource. */
  type?: "ENTITY_TYPE_UNSPECIFIED" | "TABLE" | "FILESET" | (string & {});
}

export const GoogleCloudDataplexV1DiscoveryEventPartitionDetails: Schema.Schema<GoogleCloudDataplexV1DiscoveryEventPartitionDetails> = Schema.suspend(() => Schema.Struct({
  sampledDataLocations: Schema.optional(Schema.Array(Schema.String)),
  entity: Schema.optional(Schema.String),
  partition: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DiscoveryEventPartitionDetails" }) as any as Schema.Schema<GoogleCloudDataplexV1DiscoveryEventPartitionDetails>;

export interface GoogleCloudDataplexV1EnvironmentSessionStatus {
  /** Output only. Queries over sessions to mark whether the environment is currently active or not */
  active?: boolean;
}

export const GoogleCloudDataplexV1EnvironmentSessionStatus: Schema.Schema<GoogleCloudDataplexV1EnvironmentSessionStatus> = Schema.suspend(() => Schema.Struct({
  active: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDataplexV1EnvironmentSessionStatus" }) as any as Schema.Schema<GoogleCloudDataplexV1EnvironmentSessionStatus>;

export interface GoogleCloudDataplexV1EnvironmentInfrastructureSpecOsImageRuntime {
  /** Optional. Spark properties to provide configuration for use in sessions created for this environment. The properties to set on daemon config files. Property keys are specified in prefix:property format. The prefix must be "spark". */
  properties?: Record<string, string>;
  /** Required. Dataplex Universal Catalog Image version. */
  imageVersion?: string;
  /** Optional. A list of python packages to be installed. Valid formats include Cloud Storage URI to a PIP installable library. For example, gs://bucket-name/my/path/to/lib.tar.gz */
  pythonPackages?: Array<string>;
  /** Optional. List of Java jars to be included in the runtime environment. Valid input includes Cloud Storage URIs to Jar binaries. For example, gs://bucket-name/my/path/to/file.jar */
  javaLibraries?: Array<string>;
}

export const GoogleCloudDataplexV1EnvironmentInfrastructureSpecOsImageRuntime: Schema.Schema<GoogleCloudDataplexV1EnvironmentInfrastructureSpecOsImageRuntime> = Schema.suspend(() => Schema.Struct({
  properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  imageVersion: Schema.optional(Schema.String),
  pythonPackages: Schema.optional(Schema.Array(Schema.String)),
  javaLibraries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1EnvironmentInfrastructureSpecOsImageRuntime" }) as any as Schema.Schema<GoogleCloudDataplexV1EnvironmentInfrastructureSpecOsImageRuntime>;

export interface GoogleCloudDataplexV1EnvironmentInfrastructureSpec {
  /** Required. Software Runtime Configuration for analyze interactive workloads. */
  osImage?: GoogleCloudDataplexV1EnvironmentInfrastructureSpecOsImageRuntime;
  /** Optional. Compute resources needed for analyze interactive workloads. */
  compute?: GoogleCloudDataplexV1EnvironmentInfrastructureSpecComputeResources;
}

export const GoogleCloudDataplexV1EnvironmentInfrastructureSpec: Schema.Schema<GoogleCloudDataplexV1EnvironmentInfrastructureSpec> = Schema.suspend(() => Schema.Struct({
  osImage: Schema.optional(GoogleCloudDataplexV1EnvironmentInfrastructureSpecOsImageRuntime),
  compute: Schema.optional(GoogleCloudDataplexV1EnvironmentInfrastructureSpecComputeResources),
})).annotate({ identifier: "GoogleCloudDataplexV1EnvironmentInfrastructureSpec" }) as any as Schema.Schema<GoogleCloudDataplexV1EnvironmentInfrastructureSpec>;

export interface GoogleCloudDataplexV1EnvironmentSessionSpec {
  /** Optional. The idle time configuration of the session. The session will be auto-terminated at the end of this period. */
  maxIdleDuration?: string;
  /** Optional. If True, this causes sessions to be pre-created and available for faster startup to enable interactive exploration use-cases. This defaults to False to avoid additional billed charges. These can only be set to True for the environment with name set to "default", and with default configuration. */
  enableFastStartup?: boolean;
}

export const GoogleCloudDataplexV1EnvironmentSessionSpec: Schema.Schema<GoogleCloudDataplexV1EnvironmentSessionSpec> = Schema.suspend(() => Schema.Struct({
  maxIdleDuration: Schema.optional(Schema.String),
  enableFastStartup: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDataplexV1EnvironmentSessionSpec" }) as any as Schema.Schema<GoogleCloudDataplexV1EnvironmentSessionSpec>;

export interface GoogleCloudDataplexV1Environment {
  /** Output only. Current state of the environment. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "ACTION_REQUIRED" | (string & {});
  /** Output only. URI Endpoints to access sessions associated with the Environment. */
  endpoints?: GoogleCloudDataplexV1EnvironmentEndpoints;
  /** Optional. User defined labels for the environment. */
  labels?: Record<string, string>;
  /** Optional. User friendly display name. */
  displayName?: string;
  /** Output only. Status of sessions created for this environment. */
  sessionStatus?: GoogleCloudDataplexV1EnvironmentSessionStatus;
  /** Optional. Description of the environment. */
  description?: string;
  /** Output only. System generated globally unique ID for the environment. This ID will be different if the environment is deleted and re-created with the same name. */
  uid?: string;
  /** Output only. The time when the environment was last updated. */
  updateTime?: string;
  /** Required. Infrastructure specification for the Environment. */
  infrastructureSpec?: GoogleCloudDataplexV1EnvironmentInfrastructureSpec;
  /** Output only. The relative resource name of the environment, of the form: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/environment/{environment_id} */
  name?: string;
  /** Output only. Environment creation time. */
  createTime?: string;
  /** Optional. Configuration for sessions created for this environment. */
  sessionSpec?: GoogleCloudDataplexV1EnvironmentSessionSpec;
}

export const GoogleCloudDataplexV1Environment: Schema.Schema<GoogleCloudDataplexV1Environment> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  endpoints: Schema.optional(GoogleCloudDataplexV1EnvironmentEndpoints),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  sessionStatus: Schema.optional(GoogleCloudDataplexV1EnvironmentSessionStatus),
  description: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  infrastructureSpec: Schema.optional(GoogleCloudDataplexV1EnvironmentInfrastructureSpec),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  sessionSpec: Schema.optional(GoogleCloudDataplexV1EnvironmentSessionSpec),
})).annotate({ identifier: "GoogleCloudDataplexV1Environment" }) as any as Schema.Schema<GoogleCloudDataplexV1Environment>;

export interface GoogleCloudDataplexV1ListEnvironmentsResponse {
  /** Environments under the given parent lake. */
  environments?: Array<GoogleCloudDataplexV1Environment>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const GoogleCloudDataplexV1ListEnvironmentsResponse: Schema.Schema<GoogleCloudDataplexV1ListEnvironmentsResponse> = Schema.suspend(() => Schema.Struct({
  environments: Schema.optional(Schema.Array(GoogleCloudDataplexV1Environment)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ListEnvironmentsResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListEnvironmentsResponse>;

export interface GoogleCloudLocationLocation {
  /** Resource name for the location, which may vary between implementations. For example: "projects/example-project/locations/us-east1" */
  name?: string;
  /** The friendly name for this location, typically a nearby city name. For example, "Tokyo". */
  displayName?: string;
  /** Service-specific metadata. For example the available capacity at the given location. */
  metadata?: Record<string, unknown>;
  /** The canonical id for this location. For example: "us-east1". */
  locationId?: string;
  /** Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} */
  labels?: Record<string, string>;
}

export const GoogleCloudLocationLocation: Schema.Schema<GoogleCloudLocationLocation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  locationId: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudLocationLocation" }) as any as Schema.Schema<GoogleCloudLocationLocation>;

export interface GoogleCloudDataplexV1AssetDiscoverySpecCsvOptions {
  /** Optional. Whether to disable the inference of data type for CSV data. If true, all columns will be registered as strings. */
  disableTypeInference?: boolean;
  /** Optional. The delimiter being used to separate values. This defaults to ','. */
  delimiter?: string;
  /** Optional. The character encoding of the data. The default is UTF-8. */
  encoding?: string;
  /** Optional. The number of rows to interpret as header rows that should be skipped when reading data rows. */
  headerRows?: number;
}

export const GoogleCloudDataplexV1AssetDiscoverySpecCsvOptions: Schema.Schema<GoogleCloudDataplexV1AssetDiscoverySpecCsvOptions> = Schema.suspend(() => Schema.Struct({
  disableTypeInference: Schema.optional(Schema.Boolean),
  delimiter: Schema.optional(Schema.String),
  encoding: Schema.optional(Schema.String),
  headerRows: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDataplexV1AssetDiscoverySpecCsvOptions" }) as any as Schema.Schema<GoogleCloudDataplexV1AssetDiscoverySpecCsvOptions>;

export interface GoogleCloudDataplexV1AssetDiscoverySpec {
  /** Optional. Whether discovery is enabled. */
  enabled?: boolean;
  /** Optional. Configuration for CSV data. */
  csvOptions?: GoogleCloudDataplexV1AssetDiscoverySpecCsvOptions;
  /** Optional. Configuration for Json data. */
  jsonOptions?: GoogleCloudDataplexV1AssetDiscoverySpecJsonOptions;
  /** Optional. The list of patterns to apply for selecting data to exclude during discovery. For Cloud Storage bucket assets, these are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these are interpreted as patterns to match table names. */
  excludePatterns?: Array<string>;
  /** Optional. The list of patterns to apply for selecting data to include during discovery if only a subset of the data should considered. For Cloud Storage bucket assets, these are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these are interpreted as patterns to match table names. */
  includePatterns?: Array<string>;
  /** Optional. Cron schedule (https://en.wikipedia.org/wiki/Cron) for running discovery periodically. Successive discovery runs must be scheduled at least 60 minutes apart. The default value is to run discovery every 60 minutes.To explicitly set a timezone to the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database. For example, CRON_TZ=America/New_York 1 * * * *, or TZ=America/New_York 1 * * * *. */
  schedule?: string;
}

export const GoogleCloudDataplexV1AssetDiscoverySpec: Schema.Schema<GoogleCloudDataplexV1AssetDiscoverySpec> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  csvOptions: Schema.optional(GoogleCloudDataplexV1AssetDiscoverySpecCsvOptions),
  jsonOptions: Schema.optional(GoogleCloudDataplexV1AssetDiscoverySpecJsonOptions),
  excludePatterns: Schema.optional(Schema.Array(Schema.String)),
  includePatterns: Schema.optional(Schema.Array(Schema.String)),
  schedule: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1AssetDiscoverySpec" }) as any as Schema.Schema<GoogleCloudDataplexV1AssetDiscoverySpec>;

export interface GoogleCloudDataplexV1DiscoveryEventEntityDetails {
  /** The type of the entity resource. */
  type?: "ENTITY_TYPE_UNSPECIFIED" | "TABLE" | "FILESET" | (string & {});
  /** The name of the entity resource. The name is the fully-qualified resource name. */
  entity?: string;
}

export const GoogleCloudDataplexV1DiscoveryEventEntityDetails: Schema.Schema<GoogleCloudDataplexV1DiscoveryEventEntityDetails> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  entity: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DiscoveryEventEntityDetails" }) as any as Schema.Schema<GoogleCloudDataplexV1DiscoveryEventEntityDetails>;

export interface GoogleCloudDataplexV1DiscoveryEventActionDetails {
  /** The human readable issue associated with the action. */
  issue?: string;
  /** The type of action. Eg. IncompatibleDataSchema, InvalidDataFormat */
  type?: string;
}

export const GoogleCloudDataplexV1DiscoveryEventActionDetails: Schema.Schema<GoogleCloudDataplexV1DiscoveryEventActionDetails> = Schema.suspend(() => Schema.Struct({
  issue: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DiscoveryEventActionDetails" }) as any as Schema.Schema<GoogleCloudDataplexV1DiscoveryEventActionDetails>;

export interface GoogleCloudDataplexV1DiscoveryEvent {
  /** Details about discovery configuration in effect. */
  config?: GoogleCloudDataplexV1DiscoveryEventConfigDetails;
  /** The id of the associated asset. */
  assetId?: string;
  /** Details about the entity associated with the event. */
  entity?: GoogleCloudDataplexV1DiscoveryEventEntityDetails;
  /** The id of the associated datascan for standalone discovery. */
  datascanId?: string;
  /** Details about the action associated with the event. */
  action?: GoogleCloudDataplexV1DiscoveryEventActionDetails;
  /** The id of the associated lake. */
  lakeId?: string;
  /** The log message. */
  message?: string;
  /** Details about the BigQuery table publishing associated with the event. */
  table?: GoogleCloudDataplexV1DiscoveryEventTableDetails;
  /** Details about the partition associated with the event. */
  partition?: GoogleCloudDataplexV1DiscoveryEventPartitionDetails;
  /** The id of the associated zone. */
  zoneId?: string;
  /** The type of the event being logged. */
  type?: "EVENT_TYPE_UNSPECIFIED" | "CONFIG" | "ENTITY_CREATED" | "ENTITY_UPDATED" | "ENTITY_DELETED" | "PARTITION_CREATED" | "PARTITION_UPDATED" | "PARTITION_DELETED" | "TABLE_PUBLISHED" | "TABLE_UPDATED" | "TABLE_IGNORED" | "TABLE_DELETED" | (string & {});
  /** The data location associated with the event. */
  dataLocation?: string;
}

export const GoogleCloudDataplexV1DiscoveryEvent: Schema.Schema<GoogleCloudDataplexV1DiscoveryEvent> = Schema.suspend(() => Schema.Struct({
  config: Schema.optional(GoogleCloudDataplexV1DiscoveryEventConfigDetails),
  assetId: Schema.optional(Schema.String),
  entity: Schema.optional(GoogleCloudDataplexV1DiscoveryEventEntityDetails),
  datascanId: Schema.optional(Schema.String),
  action: Schema.optional(GoogleCloudDataplexV1DiscoveryEventActionDetails),
  lakeId: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  table: Schema.optional(GoogleCloudDataplexV1DiscoveryEventTableDetails),
  partition: Schema.optional(GoogleCloudDataplexV1DiscoveryEventPartitionDetails),
  zoneId: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  dataLocation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DiscoveryEvent" }) as any as Schema.Schema<GoogleCloudDataplexV1DiscoveryEvent>;

export interface GoogleCloudDataplexV1ZoneResourceSpec {
  /** Required. Immutable. The location type of the resources that are allowed to be attached to the assets within this zone. */
  locationType?: "LOCATION_TYPE_UNSPECIFIED" | "SINGLE_REGION" | "MULTI_REGION" | (string & {});
}

export const GoogleCloudDataplexV1ZoneResourceSpec: Schema.Schema<GoogleCloudDataplexV1ZoneResourceSpec> = Schema.suspend(() => Schema.Struct({
  locationType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ZoneResourceSpec" }) as any as Schema.Schema<GoogleCloudDataplexV1ZoneResourceSpec>;

export interface GoogleCloudDataplexV1ListMetadataFeedsResponse {
  /** Unordered list. Locations that the service couldn't reach. */
  unreachable?: Array<string>;
  /** List of metadata feeds under the specified parent location. */
  metadataFeeds?: Array<GoogleCloudDataplexV1MetadataFeed>;
  /** A token to retrieve the next page of results. If there are no more results in the list, the value is empty. */
  nextPageToken?: string;
}

export const GoogleCloudDataplexV1ListMetadataFeedsResponse: Schema.Schema<GoogleCloudDataplexV1ListMetadataFeedsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  metadataFeeds: Schema.optional(Schema.Array(GoogleCloudDataplexV1MetadataFeed)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ListMetadataFeedsResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListMetadataFeedsResponse>;

export interface GoogleCloudDataplexV1DataQualityRuleRegexExpectation {
  /** Optional. A regular expression the column value is expected to match. */
  regex?: string;
}

export const GoogleCloudDataplexV1DataQualityRuleRegexExpectation: Schema.Schema<GoogleCloudDataplexV1DataQualityRuleRegexExpectation> = Schema.suspend(() => Schema.Struct({
  regex: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityRuleRegexExpectation" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityRuleRegexExpectation>;

export interface GoogleCloudDataplexV1ContentSqlScript {
  /** Required. Query Engine to be used for the Sql Query. */
  engine?: "QUERY_ENGINE_UNSPECIFIED" | "SPARK" | (string & {});
}

export const GoogleCloudDataplexV1ContentSqlScript: Schema.Schema<GoogleCloudDataplexV1ContentSqlScript> = Schema.suspend(() => Schema.Struct({
  engine: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ContentSqlScript" }) as any as Schema.Schema<GoogleCloudDataplexV1ContentSqlScript>;

export interface GoogleCloudDataplexV1ContentNotebook {
  /** Required. Kernel Type of the notebook. */
  kernelType?: "KERNEL_TYPE_UNSPECIFIED" | "PYTHON3" | (string & {});
}

export const GoogleCloudDataplexV1ContentNotebook: Schema.Schema<GoogleCloudDataplexV1ContentNotebook> = Schema.suspend(() => Schema.Struct({
  kernelType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ContentNotebook" }) as any as Schema.Schema<GoogleCloudDataplexV1ContentNotebook>;

export interface GoogleCloudDataplexV1Content {
  /** Optional. Description of the content. */
  description?: string;
  /** Output only. The time when the content was last updated. */
  updateTime?: string;
  /** Optional. User defined labels for the content. */
  labels?: Record<string, string>;
  /** Required. The path for the Content file, represented as directory structure. Unique within a lake. Limited to alphanumerics, hyphens, underscores, dots and slashes. */
  path?: string;
  /** Output only. Content creation time. */
  createTime?: string;
  /** Sql Script related configurations. */
  sqlScript?: GoogleCloudDataplexV1ContentSqlScript;
  /** Required. Content data in string format. */
  dataText?: string;
  /** Notebook related configurations. */
  notebook?: GoogleCloudDataplexV1ContentNotebook;
  /** Output only. System generated globally unique ID for the content. This ID will be different if the content is deleted and re-created with the same name. */
  uid?: string;
  /** Output only. The relative resource name of the content, of the form: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/content/{content_id} */
  name?: string;
}

export const GoogleCloudDataplexV1Content: Schema.Schema<GoogleCloudDataplexV1Content> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  path: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  sqlScript: Schema.optional(GoogleCloudDataplexV1ContentSqlScript),
  dataText: Schema.optional(Schema.String),
  notebook: Schema.optional(GoogleCloudDataplexV1ContentNotebook),
  uid: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1Content" }) as any as Schema.Schema<GoogleCloudDataplexV1Content>;

export interface GoogleCloudDataplexV1DataQualityRuleNonNullExpectation {
}

export const GoogleCloudDataplexV1DataQualityRuleNonNullExpectation: Schema.Schema<GoogleCloudDataplexV1DataQualityRuleNonNullExpectation> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityRuleNonNullExpectation" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityRuleNonNullExpectation>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface GoogleCloudDataplexV1DataAssetAccessGroupConfig {
  /** Optional. IAM roles granted on the resource to this access group. Role name follows https://cloud.google.com/iam/docs/reference/rest/v1/roles.Example: [ "roles/bigquery.dataViewer" ] */
  iamRoles?: Array<string>;
}

export const GoogleCloudDataplexV1DataAssetAccessGroupConfig: Schema.Schema<GoogleCloudDataplexV1DataAssetAccessGroupConfig> = Schema.suspend(() => Schema.Struct({
  iamRoles: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1DataAssetAccessGroupConfig" }) as any as Schema.Schema<GoogleCloudDataplexV1DataAssetAccessGroupConfig>;

export interface GoogleCloudDataplexV1DataAsset {
  /** Output only. The time at which the data asset was created. */
  createTime?: string;
  /** Required. Immutable. Full resource name of the cloud resource represented by the data asset. This must follow https://cloud.google.com/iam/docs/full-resource-names. Example: //bigquery.googleapis.com/projects/my_project_123/datasets/dataset_456/tables/table_789 Only BigQuery tables and datasets are currently supported. Data asset creator must have getIamPolicy and setIamPolicy permissions on the resource. Data asset creator must also have resource specific get permission, for instance, bigquery.tables.get for BigQuery tables. */
  resource?: string;
  /** Identifier. Resource name of the data asset. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}/dataAssets/{data_asset_id} */
  name?: string;
  /** Output only. The time at which the data asset was last updated. */
  updateTime?: string;
  /** Optional. Access groups configurations for this data asset.The key is DataProduct.AccessGroup.id and the value is AccessGroupConfig.Example: { "analyst": { "iamRoles": ["roles/bigquery.dataViewer"] } } Currently, at most one IAM role is allowed per access group. For providing multiple predefined IAM roles, wrap them in a custom IAM role as per https://cloud.google.com/iam/docs/creating-custom-roles. */
  accessGroupConfigs?: Record<string, GoogleCloudDataplexV1DataAssetAccessGroupConfig>;
  /** Optional. User-defined labels for the data asset.Example: { "environment": "production", "billing": "marketing-department" } */
  labels?: Record<string, string>;
  /** Output only. System generated globally unique ID for the data asset. This ID will be different if the data asset is deleted and re-created with the same name. */
  uid?: string;
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const GoogleCloudDataplexV1DataAsset: Schema.Schema<GoogleCloudDataplexV1DataAsset> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  accessGroupConfigs: Schema.optional(Schema.Record(Schema.String, GoogleCloudDataplexV1DataAssetAccessGroupConfig)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  uid: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataAsset" }) as any as Schema.Schema<GoogleCloudDataplexV1DataAsset>;

export interface GoogleCloudDataplexV1DataQualityRuleSetExpectation {
  /** Optional. Expected values for the column value. */
  values?: Array<string>;
}

export const GoogleCloudDataplexV1DataQualityRuleSetExpectation: Schema.Schema<GoogleCloudDataplexV1DataQualityRuleSetExpectation> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityRuleSetExpectation" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityRuleSetExpectation>;

export interface GoogleCloudDataplexV1TriggerSchedule {
  /** Required. Cron (https://en.wikipedia.org/wiki/Cron) schedule for running scans periodically.To explicitly set a timezone in the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database (wikipedia (https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List)). For example, CRON_TZ=America/New_York 1 * * * *, or TZ=America/New_York 1 * * * *.This field is required for Schedule scans. */
  cron?: string;
}

export const GoogleCloudDataplexV1TriggerSchedule: Schema.Schema<GoogleCloudDataplexV1TriggerSchedule> = Schema.suspend(() => Schema.Struct({
  cron: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1TriggerSchedule" }) as any as Schema.Schema<GoogleCloudDataplexV1TriggerSchedule>;

export interface GoogleCloudDataplexV1DataTaxonomy {
  /** Optional. User-defined labels for the DataTaxonomy. */
  labels?: Record<string, string>;
  /** Output only. The time when the DataTaxonomy was last updated. */
  updateTime?: string;
  /** Optional. Description of the DataTaxonomy. */
  description?: string;
  /** Output only. The number of attributes in the DataTaxonomy. */
  attributeCount?: number;
  /** Output only. System generated globally unique ID for the dataTaxonomy. This ID will be different if the DataTaxonomy is deleted and re-created with the same name. */
  uid?: string;
  /** Output only. The relative resource name of the DataTaxonomy, of the form: projects/{project_number}/locations/{location_id}/dataTaxonomies/{data_taxonomy_id}. */
  name?: string;
  /** Output only. The time when the DataTaxonomy was created. */
  createTime?: string;
  /** Optional. User friendly display name. */
  displayName?: string;
  /** Output only. The number of classes in the DataTaxonomy. */
  classCount?: number;
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
}

export const GoogleCloudDataplexV1DataTaxonomy: Schema.Schema<GoogleCloudDataplexV1DataTaxonomy> = Schema.suspend(() => Schema.Struct({
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  updateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  attributeCount: Schema.optional(Schema.Number),
  uid: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  classCount: Schema.optional(Schema.Number),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataTaxonomy" }) as any as Schema.Schema<GoogleCloudDataplexV1DataTaxonomy>;

export interface GoogleCloudDataplexV1ListDataTaxonomiesResponse {
  /** DataTaxonomies under the given parent location. */
  dataTaxonomies?: Array<GoogleCloudDataplexV1DataTaxonomy>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachableLocations?: Array<string>;
}

export const GoogleCloudDataplexV1ListDataTaxonomiesResponse: Schema.Schema<GoogleCloudDataplexV1ListDataTaxonomiesResponse> = Schema.suspend(() => Schema.Struct({
  dataTaxonomies: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataTaxonomy)),
  nextPageToken: Schema.optional(Schema.String),
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListDataTaxonomiesResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListDataTaxonomiesResponse>;

export interface GoogleCloudDataplexV1ListDataAssetsResponse {
  /** A token, which can be sent as page_token to retrieve the next page. If this field is empty, then there are no subsequent pages. */
  nextPageToken?: string;
  /** The data assets for the requested filter criteria. */
  dataAssets?: Array<GoogleCloudDataplexV1DataAsset>;
}

export const GoogleCloudDataplexV1ListDataAssetsResponse: Schema.Schema<GoogleCloudDataplexV1ListDataAssetsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  dataAssets: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataAsset)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListDataAssetsResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListDataAssetsResponse>;

export interface GoogleCloudDataplexV1EntryLink {
  /** Output only. The time when the Entry Link was last updated. */
  updateTime?: string;
  /** Output only. The time when the Entry Link was created. */
  createTime?: string;
  /** Output only. Immutable. Identifier. The relative resource name of the Entry Link, of the form: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id} */
  name?: string;
  /** Required. Specifies the Entries referenced in the Entry Link. There should be exactly two entry references. */
  entryReferences?: Array<GoogleCloudDataplexV1EntryLinkEntryReference>;
  /** Required. Immutable. Relative resource name of the Entry Link Type used to create this Entry Link. For example: Entry link between synonym terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/synonym Entry link between related terms in a glossary: projects/dataplex-types/locations/global/entryLinkTypes/related Entry link between glossary terms and data assets: projects/dataplex-types/locations/global/entryLinkTypes/definition */
  entryLinkType?: string;
}

export const GoogleCloudDataplexV1EntryLink: Schema.Schema<GoogleCloudDataplexV1EntryLink> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  entryReferences: Schema.optional(Schema.Array(GoogleCloudDataplexV1EntryLinkEntryReference)),
  entryLinkType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1EntryLink" }) as any as Schema.Schema<GoogleCloudDataplexV1EntryLink>;

export interface GoogleCloudDataplexV1DataScanEventDataProfileAppliedConfigs {
  /** Boolean indicating whether a column filter was applied in the DataScan job. */
  columnFilterApplied?: boolean;
  /** Boolean indicating whether a row filter was applied in the DataScan job. */
  rowFilterApplied?: boolean;
  /** The percentage of the records selected from the dataset for DataScan. Value ranges between 0.0 and 100.0. Value 0.0 or 100.0 imply that sampling was not applied. */
  samplingPercent?: number;
}

export const GoogleCloudDataplexV1DataScanEventDataProfileAppliedConfigs: Schema.Schema<GoogleCloudDataplexV1DataScanEventDataProfileAppliedConfigs> = Schema.suspend(() => Schema.Struct({
  columnFilterApplied: Schema.optional(Schema.Boolean),
  rowFilterApplied: Schema.optional(Schema.Boolean),
  samplingPercent: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDataplexV1DataScanEventDataProfileAppliedConfigs" }) as any as Schema.Schema<GoogleCloudDataplexV1DataScanEventDataProfileAppliedConfigs>;

export interface GoogleCloudDataplexV1EncryptionConfigFailureDetails {
  /** Output only. The error message will be shown to the user. Set only if the error code is REQUIRE_USER_ACTION. */
  errorMessage?: string;
  /** Output only. The error code for the failure. */
  errorCode?: "UNKNOWN" | "INTERNAL_ERROR" | "REQUIRE_USER_ACTION" | (string & {});
}

export const GoogleCloudDataplexV1EncryptionConfigFailureDetails: Schema.Schema<GoogleCloudDataplexV1EncryptionConfigFailureDetails> = Schema.suspend(() => Schema.Struct({
  errorMessage: Schema.optional(Schema.String),
  errorCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1EncryptionConfigFailureDetails" }) as any as Schema.Schema<GoogleCloudDataplexV1EncryptionConfigFailureDetails>;

export interface GoogleCloudDataplexV1DataQualityRuleSqlAssertion {
  /** Optional. The SQL statement. */
  sqlStatement?: string;
}

export const GoogleCloudDataplexV1DataQualityRuleSqlAssertion: Schema.Schema<GoogleCloudDataplexV1DataQualityRuleSqlAssertion> = Schema.suspend(() => Schema.Struct({
  sqlStatement: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityRuleSqlAssertion" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityRuleSqlAssertion>;

export interface GoogleCloudDataplexV1DataQualityRuleRangeExpectation {
  /** Optional. Whether each value needs to be strictly lesser than ('<') the maximum, or if equality is allowed.Only relevant if a max_value has been defined. Default = false. */
  strictMaxEnabled?: boolean;
  /** Optional. Whether each value needs to be strictly greater than ('>') the minimum, or if equality is allowed.Only relevant if a min_value has been defined. Default = false. */
  strictMinEnabled?: boolean;
  /** Optional. The minimum column value allowed for a row to pass this validation. At least one of min_value and max_value need to be provided. */
  minValue?: string;
  /** Optional. The maximum column value allowed for a row to pass this validation. At least one of min_value and max_value need to be provided. */
  maxValue?: string;
}

export const GoogleCloudDataplexV1DataQualityRuleRangeExpectation: Schema.Schema<GoogleCloudDataplexV1DataQualityRuleRangeExpectation> = Schema.suspend(() => Schema.Struct({
  strictMaxEnabled: Schema.optional(Schema.Boolean),
  strictMinEnabled: Schema.optional(Schema.Boolean),
  minValue: Schema.optional(Schema.String),
  maxValue: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityRuleRangeExpectation" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityRuleRangeExpectation>;

export interface GoogleCloudDataplexV1DataProfileSpecSelectedFields {
  /** Optional. Expected input is a list of fully qualified names of fields as in the schema.Only top-level field names for nested fields are supported. For instance, if 'x' is of nested field type, listing 'x' is supported but 'x.y.z' is not supported. Here 'y' and 'y.z' are nested fields of 'x'. */
  fieldNames?: Array<string>;
}

export const GoogleCloudDataplexV1DataProfileSpecSelectedFields: Schema.Schema<GoogleCloudDataplexV1DataProfileSpecSelectedFields> = Schema.suspend(() => Schema.Struct({
  fieldNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProfileSpecSelectedFields" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProfileSpecSelectedFields>;

export interface GoogleCloudDataplexV1TriggerOnDemand {
}

export const GoogleCloudDataplexV1TriggerOnDemand: Schema.Schema<GoogleCloudDataplexV1TriggerOnDemand> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDataplexV1TriggerOnDemand" }) as any as Schema.Schema<GoogleCloudDataplexV1TriggerOnDemand>;

export interface GoogleCloudDataplexV1Trigger {
  /** The scan runs once, and does not create an associated ScanJob child resource. */
  oneTime?: GoogleCloudDataplexV1TriggerOneTime;
  /** The scan is scheduled to run periodically. */
  schedule?: GoogleCloudDataplexV1TriggerSchedule;
  /** The scan runs once via RunDataScan API. */
  onDemand?: GoogleCloudDataplexV1TriggerOnDemand;
}

export const GoogleCloudDataplexV1Trigger: Schema.Schema<GoogleCloudDataplexV1Trigger> = Schema.suspend(() => Schema.Struct({
  oneTime: Schema.optional(GoogleCloudDataplexV1TriggerOneTime),
  schedule: Schema.optional(GoogleCloudDataplexV1TriggerSchedule),
  onDemand: Schema.optional(GoogleCloudDataplexV1TriggerOnDemand),
})).annotate({ identifier: "GoogleCloudDataplexV1Trigger" }) as any as Schema.Schema<GoogleCloudDataplexV1Trigger>;

export interface GoogleCloudDataplexV1AssetResourceStatus {
  /** The current state of the managed resource. */
  state?: "STATE_UNSPECIFIED" | "READY" | "ERROR" | (string & {});
  /** Last update time of the status. */
  updateTime?: string;
  /** Additional information about the current state. */
  message?: string;
  /** Output only. Service account associated with the BigQuery Connection. */
  managedAccessIdentity?: string;
}

export const GoogleCloudDataplexV1AssetResourceStatus: Schema.Schema<GoogleCloudDataplexV1AssetResourceStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  managedAccessIdentity: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1AssetResourceStatus" }) as any as Schema.Schema<GoogleCloudDataplexV1AssetResourceStatus>;

export interface GoogleCloudDataplexV1AssetSecurityStatus {
  /** The current state of the security policy applied to the attached resource. */
  state?: "STATE_UNSPECIFIED" | "READY" | "APPLYING" | "ERROR" | (string & {});
  /** Additional information about the current state. */
  message?: string;
  /** Last update time of the status. */
  updateTime?: string;
}

export const GoogleCloudDataplexV1AssetSecurityStatus: Schema.Schema<GoogleCloudDataplexV1AssetSecurityStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1AssetSecurityStatus" }) as any as Schema.Schema<GoogleCloudDataplexV1AssetSecurityStatus>;

export interface GoogleCloudDataplexV1AssetDiscoveryStatus {
  /** The current status of the discovery feature. */
  state?: "STATE_UNSPECIFIED" | "SCHEDULED" | "IN_PROGRESS" | "PAUSED" | "DISABLED" | (string & {});
  /** Last update time of the status. */
  updateTime?: string;
  /** The duration of the last discovery run. */
  lastRunDuration?: string;
  /** The start time of the last discovery run. */
  lastRunTime?: string;
  /** Data Stats of the asset reported by discovery. */
  stats?: GoogleCloudDataplexV1AssetDiscoveryStatusStats;
  /** Additional information about the current state. */
  message?: string;
}

export const GoogleCloudDataplexV1AssetDiscoveryStatus: Schema.Schema<GoogleCloudDataplexV1AssetDiscoveryStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  lastRunDuration: Schema.optional(Schema.String),
  lastRunTime: Schema.optional(Schema.String),
  stats: Schema.optional(GoogleCloudDataplexV1AssetDiscoveryStatusStats),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1AssetDiscoveryStatus" }) as any as Schema.Schema<GoogleCloudDataplexV1AssetDiscoveryStatus>;

export interface GoogleCloudDataplexV1Asset {
  /** Output only. Current state of the asset. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "ACTION_REQUIRED" | (string & {});
  /** Optional. Specification of the discovery feature applied to data referenced by this asset. When this spec is left unset, the asset will use the spec set on the parent zone. */
  discoverySpec?: GoogleCloudDataplexV1AssetDiscoverySpec;
  /** Output only. System generated globally unique ID for the asset. This ID will be different if the asset is deleted and re-created with the same name. */
  uid?: string;
  /** Optional. User friendly display name. */
  displayName?: string;
  /** Output only. Status of the resource referenced by this asset. */
  resourceStatus?: GoogleCloudDataplexV1AssetResourceStatus;
  /** Output only. The relative resource name of the asset, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}. */
  name?: string;
  /** Output only. Status of the security policy applied to resource referenced by this asset. */
  securityStatus?: GoogleCloudDataplexV1AssetSecurityStatus;
  /** Output only. The time when the asset was last updated. */
  updateTime?: string;
  /** Output only. The time when the asset was created. */
  createTime?: string;
  /** Optional. User defined labels for the asset. */
  labels?: Record<string, string>;
  /** Required. Specification of the resource that is referenced by this asset. */
  resourceSpec?: GoogleCloudDataplexV1AssetResourceSpec;
  /** Optional. Description of the asset. */
  description?: string;
  /** Output only. Status of the discovery feature applied to data referenced by this asset. */
  discoveryStatus?: GoogleCloudDataplexV1AssetDiscoveryStatus;
}

export const GoogleCloudDataplexV1Asset: Schema.Schema<GoogleCloudDataplexV1Asset> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  discoverySpec: Schema.optional(GoogleCloudDataplexV1AssetDiscoverySpec),
  uid: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  resourceStatus: Schema.optional(GoogleCloudDataplexV1AssetResourceStatus),
  name: Schema.optional(Schema.String),
  securityStatus: Schema.optional(GoogleCloudDataplexV1AssetSecurityStatus),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  resourceSpec: Schema.optional(GoogleCloudDataplexV1AssetResourceSpec),
  description: Schema.optional(Schema.String),
  discoveryStatus: Schema.optional(GoogleCloudDataplexV1AssetDiscoveryStatus),
})).annotate({ identifier: "GoogleCloudDataplexV1Asset" }) as any as Schema.Schema<GoogleCloudDataplexV1Asset>;

export interface GoogleCloudDataplexV1ListAssetsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Asset under the given parent zone. */
  assets?: Array<GoogleCloudDataplexV1Asset>;
}

export const GoogleCloudDataplexV1ListAssetsResponse: Schema.Schema<GoogleCloudDataplexV1ListAssetsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  assets: Schema.optional(Schema.Array(GoogleCloudDataplexV1Asset)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListAssetsResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListAssetsResponse>;

export interface GoogleCloudDataplexV1BusinessGlossaryEvent {
  /** The type of the event. */
  eventType?: "EVENT_TYPE_UNSPECIFIED" | "GLOSSARY_CREATE" | "GLOSSARY_UPDATE" | "GLOSSARY_DELETE" | "GLOSSARY_CATEGORY_CREATE" | "GLOSSARY_CATEGORY_UPDATE" | "GLOSSARY_CATEGORY_DELETE" | "GLOSSARY_TERM_CREATE" | "GLOSSARY_TERM_UPDATE" | "GLOSSARY_TERM_DELETE" | (string & {});
  /** The log message. */
  message?: string;
  /** Name of the resource. */
  resource?: string;
}

export const GoogleCloudDataplexV1BusinessGlossaryEvent: Schema.Schema<GoogleCloudDataplexV1BusinessGlossaryEvent> = Schema.suspend(() => Schema.Struct({
  eventType: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1BusinessGlossaryEvent" }) as any as Schema.Schema<GoogleCloudDataplexV1BusinessGlossaryEvent>;

export interface GoogleCloudDataplexV1EntryLinkEvent {
  /** Name of the resource. */
  resource?: string;
  /** The log message. */
  message?: string;
  /** The type of the event. */
  eventType?: "EVENT_TYPE_UNSPECIFIED" | "ENTRY_LINK_CREATE" | "ENTRY_LINK_DELETE" | (string & {});
}

export const GoogleCloudDataplexV1EntryLinkEvent: Schema.Schema<GoogleCloudDataplexV1EntryLinkEvent> = Schema.suspend(() => Schema.Struct({
  resource: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1EntryLinkEvent" }) as any as Schema.Schema<GoogleCloudDataplexV1EntryLinkEvent>;

export interface GoogleIamV1AuditLogConfig {
  /** Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. */
  exemptedMembers?: Array<string>;
  /** The log type that this config enables. */
  logType?: "LOG_TYPE_UNSPECIFIED" | "ADMIN_READ" | "DATA_WRITE" | "DATA_READ" | (string & {});
}

export const GoogleIamV1AuditLogConfig: Schema.Schema<GoogleIamV1AuditLogConfig> = Schema.suspend(() => Schema.Struct({
  exemptedMembers: Schema.optional(Schema.Array(Schema.String)),
  logType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV1AuditLogConfig" }) as any as Schema.Schema<GoogleIamV1AuditLogConfig>;

export interface GoogleIamV1AuditConfig {
  /** Specifies a service that will be enabled for audit logging. For example, storage.googleapis.com, cloudsql.googleapis.com. allServices is a special value that covers all services. */
  service?: string;
  /** The configuration for logging of each type of permission. */
  auditLogConfigs?: Array<GoogleIamV1AuditLogConfig>;
}

export const GoogleIamV1AuditConfig: Schema.Schema<GoogleIamV1AuditConfig> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  auditLogConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditLogConfig)),
})).annotate({ identifier: "GoogleIamV1AuditConfig" }) as any as Schema.Schema<GoogleIamV1AuditConfig>;

export interface GoogleIamV1Policy {
  /** etag is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An etag is returned in the response to getIamPolicy, and systems are expected to put that etag in the request to setIamPolicy to ensure that their change will be applied to the same version of the policy.Important: If you use IAM Conditions, you must include the etag field whenever you call setIamPolicy. If you omit this field, then IAM allows you to overwrite a version 3 policy with a version 1 policy, and all of the conditions in the version 3 policy are lost. */
  etag?: string;
  /** Specifies the format of the policy.Valid values are 0, 1, and 3. Requests that specify an invalid value are rejected.Any operation that affects conditional role bindings must specify version 3. This requirement applies to the following operations: Getting a policy that includes a conditional role binding Adding a conditional role binding to a policy Changing a conditional role binding in a policy Removing any role binding, with or without a condition, from a policy that includes conditionsImportant: If you use IAM Conditions, you must include the etag field whenever you call setIamPolicy. If you omit this field, then IAM allows you to overwrite a version 3 policy with a version 1 policy, and all of the conditions in the version 3 policy are lost.If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
  /** Associates a list of members, or principals, with a role. Optionally, may specify a condition that determines how and when the bindings are applied. Each of the bindings must contain at least one principal.The bindings in a Policy can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the bindings grant 50 different roles to user:alice@example.com, and not to any other principal, then you can add another 1,450 principals to the bindings in the Policy. */
  bindings?: Array<GoogleIamV1Binding>;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<GoogleIamV1AuditConfig>;
}

export const GoogleIamV1Policy: Schema.Schema<GoogleIamV1Policy> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  version: Schema.optional(Schema.Number),
  bindings: Schema.optional(Schema.Array(GoogleIamV1Binding)),
  auditConfigs: Schema.optional(Schema.Array(GoogleIamV1AuditConfig)),
})).annotate({ identifier: "GoogleIamV1Policy" }) as any as Schema.Schema<GoogleIamV1Policy>;

export interface GoogleIamV1SetIamPolicyRequest {
  /** REQUIRED: The complete policy to be applied to the resource. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: GoogleIamV1Policy;
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used:paths: "bindings, etag" */
  updateMask?: string;
}

export const GoogleIamV1SetIamPolicyRequest: Schema.Schema<GoogleIamV1SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  policy: Schema.optional(GoogleIamV1Policy),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleIamV1SetIamPolicyRequest" }) as any as Schema.Schema<GoogleIamV1SetIamPolicyRequest>;

export interface GoogleCloudDataplexV1ZoneDiscoverySpecCsvOptions {
  /** Optional. The character encoding of the data. The default is UTF-8. */
  encoding?: string;
  /** Optional. The delimiter being used to separate values. This defaults to ','. */
  delimiter?: string;
  /** Optional. The number of rows to interpret as header rows that should be skipped when reading data rows. */
  headerRows?: number;
  /** Optional. Whether to disable the inference of data type for CSV data. If true, all columns will be registered as strings. */
  disableTypeInference?: boolean;
}

export const GoogleCloudDataplexV1ZoneDiscoverySpecCsvOptions: Schema.Schema<GoogleCloudDataplexV1ZoneDiscoverySpecCsvOptions> = Schema.suspend(() => Schema.Struct({
  encoding: Schema.optional(Schema.String),
  delimiter: Schema.optional(Schema.String),
  headerRows: Schema.optional(Schema.Number),
  disableTypeInference: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDataplexV1ZoneDiscoverySpecCsvOptions" }) as any as Schema.Schema<GoogleCloudDataplexV1ZoneDiscoverySpecCsvOptions>;

export interface GoogleCloudDataplexV1ZoneDiscoverySpec {
  /** Optional. Configuration for Json data. */
  jsonOptions?: GoogleCloudDataplexV1ZoneDiscoverySpecJsonOptions;
  /** Optional. Cron schedule (https://en.wikipedia.org/wiki/Cron) for running discovery periodically. Successive discovery runs must be scheduled at least 60 minutes apart. The default value is to run discovery every 60 minutes.To explicitly set a timezone to the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database. For example, CRON_TZ=America/New_York 1 * * * *, or TZ=America/New_York 1 * * * *. */
  schedule?: string;
  /** Optional. Configuration for CSV data. */
  csvOptions?: GoogleCloudDataplexV1ZoneDiscoverySpecCsvOptions;
  /** Optional. The list of patterns to apply for selecting data to exclude during discovery. For Cloud Storage bucket assets, these are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these are interpreted as patterns to match table names. */
  excludePatterns?: Array<string>;
  /** Optional. The list of patterns to apply for selecting data to include during discovery if only a subset of the data should considered. For Cloud Storage bucket assets, these are interpreted as glob patterns used to match object names. For BigQuery dataset assets, these are interpreted as patterns to match table names. */
  includePatterns?: Array<string>;
  /** Required. Whether discovery is enabled. */
  enabled?: boolean;
}

export const GoogleCloudDataplexV1ZoneDiscoverySpec: Schema.Schema<GoogleCloudDataplexV1ZoneDiscoverySpec> = Schema.suspend(() => Schema.Struct({
  jsonOptions: Schema.optional(GoogleCloudDataplexV1ZoneDiscoverySpecJsonOptions),
  schedule: Schema.optional(Schema.String),
  csvOptions: Schema.optional(GoogleCloudDataplexV1ZoneDiscoverySpecCsvOptions),
  excludePatterns: Schema.optional(Schema.Array(Schema.String)),
  includePatterns: Schema.optional(Schema.Array(Schema.String)),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDataplexV1ZoneDiscoverySpec" }) as any as Schema.Schema<GoogleCloudDataplexV1ZoneDiscoverySpec>;

export interface GoogleCloudDataplexV1Zone {
  /** Optional. Specification of the discovery feature applied to data in this zone. */
  discoverySpec?: GoogleCloudDataplexV1ZoneDiscoverySpec;
  /** Required. Specification of the resources that are referenced by the assets within this zone. */
  resourceSpec?: GoogleCloudDataplexV1ZoneResourceSpec;
  /** Output only. The relative resource name of the zone, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. */
  name?: string;
  /** Output only. Aggregated status of the underlying assets of the zone. */
  assetStatus?: GoogleCloudDataplexV1AssetStatus;
  /** Output only. System generated globally unique ID for the zone. This ID will be different if the zone is deleted and re-created with the same name. */
  uid?: string;
  /** Output only. Current state of the zone. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "ACTION_REQUIRED" | (string & {});
  /** Required. Immutable. The type of the zone. */
  type?: "TYPE_UNSPECIFIED" | "RAW" | "CURATED" | (string & {});
  /** Output only. The time when the zone was created. */
  createTime?: string;
  /** Output only. The time when the zone was last updated. */
  updateTime?: string;
  /** Optional. User defined labels for the zone. */
  labels?: Record<string, string>;
  /** Optional. User friendly display name. */
  displayName?: string;
  /** Optional. Description of the zone. */
  description?: string;
}

export const GoogleCloudDataplexV1Zone: Schema.Schema<GoogleCloudDataplexV1Zone> = Schema.suspend(() => Schema.Struct({
  discoverySpec: Schema.optional(GoogleCloudDataplexV1ZoneDiscoverySpec),
  resourceSpec: Schema.optional(GoogleCloudDataplexV1ZoneResourceSpec),
  name: Schema.optional(Schema.String),
  assetStatus: Schema.optional(GoogleCloudDataplexV1AssetStatus),
  uid: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1Zone" }) as any as Schema.Schema<GoogleCloudDataplexV1Zone>;

export interface GoogleCloudDataplexV1ListZonesResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Zones under the given parent lake. */
  zones?: Array<GoogleCloudDataplexV1Zone>;
}

export const GoogleCloudDataplexV1ListZonesResponse: Schema.Schema<GoogleCloudDataplexV1ListZonesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  zones: Schema.optional(Schema.Array(GoogleCloudDataplexV1Zone)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListZonesResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListZonesResponse>;

export interface GoogleCloudDataplexV1DataProfileResultPostScanActionsResult {
  /** Output only. The result of BigQuery export post scan action. */
  bigqueryExportResult?: GoogleCloudDataplexV1DataProfileResultPostScanActionsResultBigQueryExportResult;
}

export const GoogleCloudDataplexV1DataProfileResultPostScanActionsResult: Schema.Schema<GoogleCloudDataplexV1DataProfileResultPostScanActionsResult> = Schema.suspend(() => Schema.Struct({
  bigqueryExportResult: Schema.optional(GoogleCloudDataplexV1DataProfileResultPostScanActionsResultBigQueryExportResult),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProfileResultPostScanActionsResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProfileResultPostScanActionsResult>;

export interface GoogleCloudDataplexV1ResourceAccessSpec {
  /** Optional. The format of strings follows the pattern followed by IAM in the bindings. user:{email}, serviceAccount:{email} group:{email}. The set of principals to be granted reader role on the resource. */
  readers?: Array<string>;
  /** Optional. The set of principals to be granted writer role on the resource. */
  writers?: Array<string>;
  /** Optional. The set of principals to be granted owner role on the resource. */
  owners?: Array<string>;
}

export const GoogleCloudDataplexV1ResourceAccessSpec: Schema.Schema<GoogleCloudDataplexV1ResourceAccessSpec> = Schema.suspend(() => Schema.Struct({
  readers: Schema.optional(Schema.Array(Schema.String)),
  writers: Schema.optional(Schema.Array(Schema.String)),
  owners: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1ResourceAccessSpec" }) as any as Schema.Schema<GoogleCloudDataplexV1ResourceAccessSpec>;

export interface GoogleCloudDataplexV1DataAttribute {
  /** Optional. User friendly display name. */
  displayName?: string;
  /** Optional. User-defined labels for the DataAttribute. */
  labels?: Record<string, string>;
  /** Output only. The time when the DataAttribute was created. */
  createTime?: string;
  /** Output only. The number of child attributes present for this attribute. */
  attributeCount?: number;
  /** Optional. Specified when applied to data stored on the resource (eg: rows, columns in BigQuery Tables). */
  dataAccessSpec?: GoogleCloudDataplexV1DataAccessSpec;
  /** This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. The ID of the parent DataAttribute resource, should belong to the same data taxonomy. Circular dependency in parent chain is not valid. Maximum depth of the hierarchy allowed is 4. a -> b -> c -> d -> e, depth = 4 */
  parentId?: string;
  /** Output only. System generated globally unique ID for the DataAttribute. This ID will be different if the DataAttribute is deleted and re-created with the same name. */
  uid?: string;
  /** Optional. Description of the DataAttribute. */
  description?: string;
  /** Output only. The time when the DataAttribute was last updated. */
  updateTime?: string;
  /** Output only. The relative resource name of the dataAttribute, of the form: projects/{project_number}/locations/{location_id}/dataTaxonomies/{dataTaxonomy}/attributes/{data_attribute_id}. */
  name?: string;
  /** Optional. Specified when applied to a resource (eg: Cloud Storage bucket, BigQuery dataset, BigQuery table). */
  resourceAccessSpec?: GoogleCloudDataplexV1ResourceAccessSpec;
}

export const GoogleCloudDataplexV1DataAttribute: Schema.Schema<GoogleCloudDataplexV1DataAttribute> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  createTime: Schema.optional(Schema.String),
  attributeCount: Schema.optional(Schema.Number),
  dataAccessSpec: Schema.optional(GoogleCloudDataplexV1DataAccessSpec),
  etag: Schema.optional(Schema.String),
  parentId: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  resourceAccessSpec: Schema.optional(GoogleCloudDataplexV1ResourceAccessSpec),
})).annotate({ identifier: "GoogleCloudDataplexV1DataAttribute" }) as any as Schema.Schema<GoogleCloudDataplexV1DataAttribute>;

export interface GoogleCloudDataplexV1ListDataAttributesResponse {
  /** Locations that could not be reached. */
  unreachableLocations?: Array<string>;
  /** DataAttributes under the given parent DataTaxonomy. */
  dataAttributes?: Array<GoogleCloudDataplexV1DataAttribute>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const GoogleCloudDataplexV1ListDataAttributesResponse: Schema.Schema<GoogleCloudDataplexV1ListDataAttributesResponse> = Schema.suspend(() => Schema.Struct({
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
  dataAttributes: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataAttribute)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ListDataAttributesResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListDataAttributesResponse>;

export interface GoogleCloudDataplexV1TaskInfrastructureSpecContainerImageRuntime {
  /** Optional. Container image to use. */
  image?: string;
  /** Optional. A list of python packages to be installed. Valid formats include Cloud Storage URI to a PIP installable library. For example, gs://bucket-name/my/path/to/lib.tar.gz */
  pythonPackages?: Array<string>;
  /** Optional. A list of Java JARS to add to the classpath. Valid input includes Cloud Storage URIs to Jar binaries. For example, gs://bucket-name/my/path/to/file.jar */
  javaJars?: Array<string>;
  /** Optional. Override to common configuration of open source components installed on the Dataproc cluster. The properties to set on daemon config files. Property keys are specified in prefix:property format, for example core:hadoop.tmp.dir. For more information, see Cluster properties (https://cloud.google.com/dataproc/docs/concepts/cluster-properties). */
  properties?: Record<string, string>;
}

export const GoogleCloudDataplexV1TaskInfrastructureSpecContainerImageRuntime: Schema.Schema<GoogleCloudDataplexV1TaskInfrastructureSpecContainerImageRuntime> = Schema.suspend(() => Schema.Struct({
  image: Schema.optional(Schema.String),
  pythonPackages: Schema.optional(Schema.Array(Schema.String)),
  javaJars: Schema.optional(Schema.Array(Schema.String)),
  properties: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1TaskInfrastructureSpecContainerImageRuntime" }) as any as Schema.Schema<GoogleCloudDataplexV1TaskInfrastructureSpecContainerImageRuntime>;

export interface GoogleCloudDataplexV1TaskInfrastructureSpecVpcNetwork {
  /** Optional. List of network tags to apply to the job. */
  networkTags?: Array<string>;
  /** Optional. The Cloud VPC sub-network in which the job is run. */
  subNetwork?: string;
  /** Optional. The Cloud VPC network in which the job is run. By default, the Cloud VPC network named Default within the project is used. */
  network?: string;
}

export const GoogleCloudDataplexV1TaskInfrastructureSpecVpcNetwork: Schema.Schema<GoogleCloudDataplexV1TaskInfrastructureSpecVpcNetwork> = Schema.suspend(() => Schema.Struct({
  networkTags: Schema.optional(Schema.Array(Schema.String)),
  subNetwork: Schema.optional(Schema.String),
  network: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1TaskInfrastructureSpecVpcNetwork" }) as any as Schema.Schema<GoogleCloudDataplexV1TaskInfrastructureSpecVpcNetwork>;

export interface GoogleCloudDataplexV1TaskInfrastructureSpec {
  /** Compute resources needed for a Task when using Dataproc Serverless. */
  batch?: GoogleCloudDataplexV1TaskInfrastructureSpecBatchComputeResources;
  /** Container Image Runtime Configuration. */
  containerImage?: GoogleCloudDataplexV1TaskInfrastructureSpecContainerImageRuntime;
  /** Vpc network. */
  vpcNetwork?: GoogleCloudDataplexV1TaskInfrastructureSpecVpcNetwork;
}

export const GoogleCloudDataplexV1TaskInfrastructureSpec: Schema.Schema<GoogleCloudDataplexV1TaskInfrastructureSpec> = Schema.suspend(() => Schema.Struct({
  batch: Schema.optional(GoogleCloudDataplexV1TaskInfrastructureSpecBatchComputeResources),
  containerImage: Schema.optional(GoogleCloudDataplexV1TaskInfrastructureSpecContainerImageRuntime),
  vpcNetwork: Schema.optional(GoogleCloudDataplexV1TaskInfrastructureSpecVpcNetwork),
})).annotate({ identifier: "GoogleCloudDataplexV1TaskInfrastructureSpec" }) as any as Schema.Schema<GoogleCloudDataplexV1TaskInfrastructureSpec>;

export interface GoogleCloudDataplexV1TaskNotebookTaskConfig {
  /** Optional. Infrastructure specification for the execution. */
  infrastructureSpec?: GoogleCloudDataplexV1TaskInfrastructureSpec;
  /** Optional. Cloud Storage URIs of files to be placed in the working directory of each executor. */
  fileUris?: Array<string>;
  /** Required. Path to input notebook. This can be the Cloud Storage URI of the notebook file or the path to a Notebook Content. The execution args are accessible as environment variables (TASK_key=value). */
  notebook?: string;
  /** Optional. Cloud Storage URIs of archives to be extracted into the working directory of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and .zip. */
  archiveUris?: Array<string>;
}

export const GoogleCloudDataplexV1TaskNotebookTaskConfig: Schema.Schema<GoogleCloudDataplexV1TaskNotebookTaskConfig> = Schema.suspend(() => Schema.Struct({
  infrastructureSpec: Schema.optional(GoogleCloudDataplexV1TaskInfrastructureSpec),
  fileUris: Schema.optional(Schema.Array(Schema.String)),
  notebook: Schema.optional(Schema.String),
  archiveUris: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1TaskNotebookTaskConfig" }) as any as Schema.Schema<GoogleCloudDataplexV1TaskNotebookTaskConfig>;

export interface GoogleCloudDataplexV1DataQualityDimension {
  /** Output only. The dimension name a rule belongs to. Custom dimension name is supported with all uppercase letters and maximum length of 30 characters. */
  name?: string;
}

export const GoogleCloudDataplexV1DataQualityDimension: Schema.Schema<GoogleCloudDataplexV1DataQualityDimension> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityDimension" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityDimension>;

export interface GoogleCloudDataplexV1DataQualityDimensionResult {
  /** Output only. Whether the dimension passed or failed. */
  passed?: boolean;
  /** Output only. The dimension config specified in the DataQualitySpec, as is. */
  dimension?: GoogleCloudDataplexV1DataQualityDimension;
  /** Output only. The dimension-level data quality score for this data scan job if and only if the 'dimension' field is set.The score ranges between 0, 100 (up to two decimal points). */
  score?: number;
}

export const GoogleCloudDataplexV1DataQualityDimensionResult: Schema.Schema<GoogleCloudDataplexV1DataQualityDimensionResult> = Schema.suspend(() => Schema.Struct({
  passed: Schema.optional(Schema.Boolean),
  dimension: Schema.optional(GoogleCloudDataplexV1DataQualityDimension),
  score: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityDimensionResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityDimensionResult>;

export interface GoogleCloudDataplexV1DataQualityColumnResult {
  /** Output only. The column-level data quality score for this data scan job if and only if the 'column' field is set.The score ranges between between 0, 100 (up to two decimal points). */
  score?: number;
  /** Output only. The column specified in the DataQualityRule. */
  column?: string;
  /** Output only. Whether the column passed or failed. */
  passed?: boolean;
  /** Output only. The dimension-level results for this column. */
  dimensions?: Array<GoogleCloudDataplexV1DataQualityDimensionResult>;
}

export const GoogleCloudDataplexV1DataQualityColumnResult: Schema.Schema<GoogleCloudDataplexV1DataQualityColumnResult> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  column: Schema.optional(Schema.String),
  passed: Schema.optional(Schema.Boolean),
  dimensions: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataQualityDimensionResult)),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityColumnResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityColumnResult>;

export interface GoogleCloudDataplexV1MetadataJobImportJobResult {
  /** Output only. The total number of entry links that were successfully deleted. */
  deletedEntryLinks?: string;
  /** Output only. The total number of entries that were recreated. */
  recreatedEntries?: string;
  /** Output only. The total number of entry links that were left unchanged. */
  unchangedEntryLinks?: string;
  /** Output only. The total number of entries that were unchanged. */
  unchangedEntries?: string;
  /** Output only. The total number of entries that were created. */
  createdEntries?: string;
  /** Output only. The total number of entries that were deleted. */
  deletedEntries?: string;
  /** Output only. The total number of entries that were updated. */
  updatedEntries?: string;
  /** Output only. The time when the status was updated. */
  updateTime?: string;
  /** Output only. The total number of entry links that were successfully created. */
  createdEntryLinks?: string;
}

export const GoogleCloudDataplexV1MetadataJobImportJobResult: Schema.Schema<GoogleCloudDataplexV1MetadataJobImportJobResult> = Schema.suspend(() => Schema.Struct({
  deletedEntryLinks: Schema.optional(Schema.String),
  recreatedEntries: Schema.optional(Schema.String),
  unchangedEntryLinks: Schema.optional(Schema.String),
  unchangedEntries: Schema.optional(Schema.String),
  createdEntries: Schema.optional(Schema.String),
  deletedEntries: Schema.optional(Schema.String),
  updatedEntries: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  createdEntryLinks: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1MetadataJobImportJobResult" }) as any as Schema.Schema<GoogleCloudDataplexV1MetadataJobImportJobResult>;

export interface GoogleCloudDataplexV1DataSource {
  /** Immutable. The Dataplex Universal Catalog entity that represents the data source (e.g. BigQuery table) for DataScan, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}. */
  entity?: string;
  /** Immutable. The service-qualified full resource name of the cloud resource for a DataScan job to scan against. The field could either be: Cloud Storage bucket for DataDiscoveryScan Format: //storage.googleapis.com/projects/PROJECT_ID/buckets/BUCKET_ID or BigQuery table of type "TABLE" for DataProfileScan/DataQualityScan/DataDocumentationScan Format: //bigquery.googleapis.com/projects/PROJECT_ID/datasets/DATASET_ID/tables/TABLE_ID */
  resource?: string;
}

export const GoogleCloudDataplexV1DataSource: Schema.Schema<GoogleCloudDataplexV1DataSource> = Schema.suspend(() => Schema.Struct({
  entity: Schema.optional(Schema.String),
  resource: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataSource" }) as any as Schema.Schema<GoogleCloudDataplexV1DataSource>;

export interface GoogleCloudDataplexV1EntryType {
  /** Optional. This checksum is computed by the service, and might be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. The platform that Entries of this type belongs to. */
  platform?: string;
  /** Optional. Description of the EntryType. */
  description?: string;
  /** AspectInfo for the entry type. */
  requiredAspects?: Array<GoogleCloudDataplexV1EntryTypeAspectInfo>;
  /** Output only. The relative resource name of the EntryType, of the form: projects/{project_number}/locations/{location_id}/entryTypes/{entry_type_id}. */
  name?: string;
  /** Immutable. Authorization defined for this type. */
  authorization?: GoogleCloudDataplexV1EntryTypeAuthorization;
  /** Output only. The time when the EntryType was created. */
  createTime?: string;
  /** Output only. System generated globally unique ID for the EntryType. This ID will be different if the EntryType is deleted and re-created with the same name. */
  uid?: string;
  /** Optional. Indicates the classes this Entry Type belongs to, for example, TABLE, DATABASE, MODEL. */
  typeAliases?: Array<string>;
  /** Output only. The time when the EntryType was last updated. */
  updateTime?: string;
  /** Optional. The system that Entries of this type belongs to. Examples include CloudSQL, MariaDB etc */
  system?: string;
  /** Optional. User-defined labels for the EntryType. */
  labels?: Record<string, string>;
  /** Optional. User friendly display name. */
  displayName?: string;
}

export const GoogleCloudDataplexV1EntryType: Schema.Schema<GoogleCloudDataplexV1EntryType> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  platform: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  requiredAspects: Schema.optional(Schema.Array(GoogleCloudDataplexV1EntryTypeAspectInfo)),
  name: Schema.optional(Schema.String),
  authorization: Schema.optional(GoogleCloudDataplexV1EntryTypeAuthorization),
  createTime: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  typeAliases: Schema.optional(Schema.Array(Schema.String)),
  updateTime: Schema.optional(Schema.String),
  system: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1EntryType" }) as any as Schema.Schema<GoogleCloudDataplexV1EntryType>;

export interface GoogleCloudDataplexV1ListEntryTypesResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Locations that the service couldn't reach. */
  unreachableLocations?: Array<string>;
  /** EntryTypes under the given parent location. */
  entryTypes?: Array<GoogleCloudDataplexV1EntryType>;
}

export const GoogleCloudDataplexV1ListEntryTypesResponse: Schema.Schema<GoogleCloudDataplexV1ListEntryTypesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
  entryTypes: Schema.optional(Schema.Array(GoogleCloudDataplexV1EntryType)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListEntryTypesResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListEntryTypesResponse>;

export interface GoogleLongrunningCancelOperationRequest {
}

export const GoogleLongrunningCancelOperationRequest: Schema.Schema<GoogleLongrunningCancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleLongrunningCancelOperationRequest" }) as any as Schema.Schema<GoogleLongrunningCancelOperationRequest>;

export interface GoogleCloudDataplexV1DataQualityRuleStatisticRangeExpectation {
  /** Optional. Whether column statistic needs to be strictly greater than ('>') the minimum, or if equality is allowed.Only relevant if a min_value has been defined. Default = false. */
  strictMinEnabled?: boolean;
  /** Optional. The minimum column statistic value allowed for a row to pass this validation.At least one of min_value and max_value need to be provided. */
  minValue?: string;
  /** Optional. The maximum column statistic value allowed for a row to pass this validation.At least one of min_value and max_value need to be provided. */
  maxValue?: string;
  /** Optional. The aggregate metric to evaluate. */
  statistic?: "STATISTIC_UNDEFINED" | "MEAN" | "MIN" | "MAX" | (string & {});
  /** Optional. Whether column statistic needs to be strictly lesser than ('<') the maximum, or if equality is allowed.Only relevant if a max_value has been defined. Default = false. */
  strictMaxEnabled?: boolean;
}

export const GoogleCloudDataplexV1DataQualityRuleStatisticRangeExpectation: Schema.Schema<GoogleCloudDataplexV1DataQualityRuleStatisticRangeExpectation> = Schema.suspend(() => Schema.Struct({
  strictMinEnabled: Schema.optional(Schema.Boolean),
  minValue: Schema.optional(Schema.String),
  maxValue: Schema.optional(Schema.String),
  statistic: Schema.optional(Schema.String),
  strictMaxEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityRuleStatisticRangeExpectation" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityRuleStatisticRangeExpectation>;

export interface GoogleCloudDataplexV1DataDocumentationSpec {
  /** Optional. Whether to publish result to Dataplex Catalog. */
  catalogPublishingEnabled?: boolean;
  /** Optional. Specifies which components of the data documentation to generate. Any component that is required to generate the specified components will also be generated. If no generation scope is specified, all available documentation components will be generated. */
  generationScopes?: Array<"GENERATION_SCOPE_UNSPECIFIED" | "ALL" | "TABLE_AND_COLUMN_DESCRIPTIONS" | "SQL_QUERIES" | (string & {})>;
}

export const GoogleCloudDataplexV1DataDocumentationSpec: Schema.Schema<GoogleCloudDataplexV1DataDocumentationSpec> = Schema.suspend(() => Schema.Struct({
  catalogPublishingEnabled: Schema.optional(Schema.Boolean),
  generationScopes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1DataDocumentationSpec" }) as any as Schema.Schema<GoogleCloudDataplexV1DataDocumentationSpec>;

export interface GoogleCloudDataplexV1DataScanEventDataQualityResult {
  /** The table-level data quality score for the data scan job.The data quality score ranges between 0, 100 (up to two decimal points). */
  score?: number;
  /** The result of each dimension for data quality result. The key of the map is the name of the dimension. The value is the bool value depicting whether the dimension result was pass or not. */
  dimensionPassed?: Record<string, boolean>;
  /** The score of each dimension for data quality result. The key of the map is the name of the dimension. The value is the data quality score for the dimension.The score ranges between 0, 100 (up to two decimal points). */
  dimensionScore?: Record<string, number>;
  /** The count of rows processed in the data scan job. */
  rowCount?: string;
  /** The score of each column scanned in the data scan job. The key of the map is the name of the column. The value is the data quality score for the column.The score ranges between 0, 100 (up to two decimal points). */
  columnScore?: Record<string, number>;
  /** Whether the data quality result was pass or not. */
  passed?: boolean;
}

export const GoogleCloudDataplexV1DataScanEventDataQualityResult: Schema.Schema<GoogleCloudDataplexV1DataScanEventDataQualityResult> = Schema.suspend(() => Schema.Struct({
  score: Schema.optional(Schema.Number),
  dimensionPassed: Schema.optional(Schema.Record(Schema.String, Schema.Boolean)),
  dimensionScore: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
  rowCount: Schema.optional(Schema.String),
  columnScore: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
  passed: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDataplexV1DataScanEventDataQualityResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataScanEventDataQualityResult>;

export interface GoogleCloudDataplexV1DataScanEventPostScanActionsResultBigQueryExportResult {
  /** Execution state for the BigQuery exporting. */
  state?: "STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "SKIPPED" | (string & {});
  /** Additional information about the BigQuery exporting. */
  message?: string;
}

export const GoogleCloudDataplexV1DataScanEventPostScanActionsResultBigQueryExportResult: Schema.Schema<GoogleCloudDataplexV1DataScanEventPostScanActionsResultBigQueryExportResult> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataScanEventPostScanActionsResultBigQueryExportResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataScanEventPostScanActionsResultBigQueryExportResult>;

export interface GoogleCloudDataplexV1DataScanEventPostScanActionsResult {
  /** The result of BigQuery export post scan action. */
  bigqueryExportResult?: GoogleCloudDataplexV1DataScanEventPostScanActionsResultBigQueryExportResult;
}

export const GoogleCloudDataplexV1DataScanEventPostScanActionsResult: Schema.Schema<GoogleCloudDataplexV1DataScanEventPostScanActionsResult> = Schema.suspend(() => Schema.Struct({
  bigqueryExportResult: Schema.optional(GoogleCloudDataplexV1DataScanEventPostScanActionsResultBigQueryExportResult),
})).annotate({ identifier: "GoogleCloudDataplexV1DataScanEventPostScanActionsResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataScanEventPostScanActionsResult>;

export interface GoogleCloudDataplexV1DataScanEventDataProfileResult {
  /** The count of rows processed in the data scan job. */
  rowCount?: string;
}

export const GoogleCloudDataplexV1DataScanEventDataProfileResult: Schema.Schema<GoogleCloudDataplexV1DataScanEventDataProfileResult> = Schema.suspend(() => Schema.Struct({
  rowCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataScanEventDataProfileResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataScanEventDataProfileResult>;

export interface GoogleCloudDataplexV1DataScanCatalogPublishingStatus {
  /** Output only. Execution state for publishing. */
  state?: "STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "SKIPPED" | (string & {});
}

export const GoogleCloudDataplexV1DataScanCatalogPublishingStatus: Schema.Schema<GoogleCloudDataplexV1DataScanCatalogPublishingStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataScanCatalogPublishingStatus" }) as any as Schema.Schema<GoogleCloudDataplexV1DataScanCatalogPublishingStatus>;

export interface GoogleCloudDataplexV1DataScanEvent {
  /** The trigger type of the data scan job. */
  trigger?: "TRIGGER_UNSPECIFIED" | "ON_DEMAND" | "SCHEDULE" | "ONE_TIME" | (string & {});
  /** A version identifier of the spec which was used to execute this job. */
  specVersion?: string;
  /** Data quality result for data quality type data scan. */
  dataQuality?: GoogleCloudDataplexV1DataScanEventDataQualityResult;
  /** Applied configs for data quality type data scan. */
  dataQualityConfigs?: GoogleCloudDataplexV1DataScanEventDataQualityAppliedConfigs;
  /** The time when the data scan job started to run. */
  startTime?: string;
  /** The result of post scan actions. */
  postScanActionsResult?: GoogleCloudDataplexV1DataScanEventPostScanActionsResult;
  /** Data profile result for data profile type data scan. */
  dataProfile?: GoogleCloudDataplexV1DataScanEventDataProfileResult;
  /** The time when the data scan job finished. */
  endTime?: string;
  /** The type of the data scan. */
  type?: "SCAN_TYPE_UNSPECIFIED" | "DATA_PROFILE" | "DATA_QUALITY" | "DATA_DISCOVERY" | (string & {});
  /** The identifier of the specific data scan job this log entry is for. */
  jobId?: string;
  /** The message describing the data scan job event. */
  message?: string;
  /** The status of the data scan job. */
  state?: "STATE_UNSPECIFIED" | "STARTED" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "CREATED" | (string & {});
  /** The data source of the data scan */
  dataSource?: string;
  /** The scope of the data scan (e.g. full, incremental). */
  scope?: "SCOPE_UNSPECIFIED" | "FULL" | "INCREMENTAL" | (string & {});
  /** The status of publishing the data scan as Dataplex Universal Catalog metadata. */
  catalogPublishingStatus?: GoogleCloudDataplexV1DataScanCatalogPublishingStatus;
  /** The time when the data scan job was created. */
  createTime?: string;
  /** Applied configs for data profile type data scan. */
  dataProfileConfigs?: GoogleCloudDataplexV1DataScanEventDataProfileAppliedConfigs;
}

export const GoogleCloudDataplexV1DataScanEvent: Schema.Schema<GoogleCloudDataplexV1DataScanEvent> = Schema.suspend(() => Schema.Struct({
  trigger: Schema.optional(Schema.String),
  specVersion: Schema.optional(Schema.String),
  dataQuality: Schema.optional(GoogleCloudDataplexV1DataScanEventDataQualityResult),
  dataQualityConfigs: Schema.optional(GoogleCloudDataplexV1DataScanEventDataQualityAppliedConfigs),
  startTime: Schema.optional(Schema.String),
  postScanActionsResult: Schema.optional(GoogleCloudDataplexV1DataScanEventPostScanActionsResult),
  dataProfile: Schema.optional(GoogleCloudDataplexV1DataScanEventDataProfileResult),
  endTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  jobId: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  dataSource: Schema.optional(Schema.String),
  scope: Schema.optional(Schema.String),
  catalogPublishingStatus: Schema.optional(GoogleCloudDataplexV1DataScanCatalogPublishingStatus),
  createTime: Schema.optional(Schema.String),
  dataProfileConfigs: Schema.optional(GoogleCloudDataplexV1DataScanEventDataProfileAppliedConfigs),
})).annotate({ identifier: "GoogleCloudDataplexV1DataScanEvent" }) as any as Schema.Schema<GoogleCloudDataplexV1DataScanEvent>;

export interface GoogleCloudDataplexV1Glossary {
  /** Optional. Needed for resource freshness validation. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. User-defined labels for the Glossary. */
  labels?: Record<string, string>;
  /** Output only. Identifier. The resource name of the Glossary. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} */
  name?: string;
  /** Output only. The time at which the Glossary was last updated. */
  updateTime?: string;
  /** Optional. The user-mutable description of the Glossary. */
  description?: string;
  /** Output only. The number of GlossaryTerms in the Glossary. */
  termCount?: number;
  /** Optional. User friendly display name of the Glossary. This is user-mutable. This will be same as the GlossaryId, if not specified. */
  displayName?: string;
  /** Output only. System generated unique id for the Glossary. This ID will be different if the Glossary is deleted and re-created with the same name. */
  uid?: string;
  /** Output only. The number of GlossaryCategories in the Glossary. */
  categoryCount?: number;
  /** Output only. The time at which the Glossary was created. */
  createTime?: string;
}

export const GoogleCloudDataplexV1Glossary: Schema.Schema<GoogleCloudDataplexV1Glossary> = Schema.suspend(() => Schema.Struct({
  etag: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  termCount: Schema.optional(Schema.Number),
  displayName: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  categoryCount: Schema.optional(Schema.Number),
  createTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1Glossary" }) as any as Schema.Schema<GoogleCloudDataplexV1Glossary>;

export interface GoogleCloudDataplexV1ListGlossariesResponse {
  /** Lists the Glossaries in the specified parent. */
  glossaries?: Array<GoogleCloudDataplexV1Glossary>;
  /** A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that the service couldn't reach. */
  unreachableLocations?: Array<string>;
}

export const GoogleCloudDataplexV1ListGlossariesResponse: Schema.Schema<GoogleCloudDataplexV1ListGlossariesResponse> = Schema.suspend(() => Schema.Struct({
  glossaries: Schema.optional(Schema.Array(GoogleCloudDataplexV1Glossary)),
  nextPageToken: Schema.optional(Schema.String),
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListGlossariesResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListGlossariesResponse>;

export interface GoogleCloudDataplexV1RunDataScanRequest {
}

export const GoogleCloudDataplexV1RunDataScanRequest: Schema.Schema<GoogleCloudDataplexV1RunDataScanRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDataplexV1RunDataScanRequest" }) as any as Schema.Schema<GoogleCloudDataplexV1RunDataScanRequest>;

export interface GoogleCloudDataplexV1ListContentResponse {
  /** Content under the given parent lake. */
  content?: Array<GoogleCloudDataplexV1Content>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const GoogleCloudDataplexV1ListContentResponse: Schema.Schema<GoogleCloudDataplexV1ListContentResponse> = Schema.suspend(() => Schema.Struct({
  content: Schema.optional(Schema.Array(GoogleCloudDataplexV1Content)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ListContentResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListContentResponse>;

export interface GoogleCloudDataplexV1LookupEntryLinksResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** List of entry links that reference the specified entry. */
  entryLinks?: Array<GoogleCloudDataplexV1EntryLink>;
}

export const GoogleCloudDataplexV1LookupEntryLinksResponse: Schema.Schema<GoogleCloudDataplexV1LookupEntryLinksResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  entryLinks: Schema.optional(Schema.Array(GoogleCloudDataplexV1EntryLink)),
})).annotate({ identifier: "GoogleCloudDataplexV1LookupEntryLinksResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1LookupEntryLinksResponse>;

export interface GoogleCloudDataplexV1MetadataJobStatus {
  /** Output only. State of the metadata job. */
  state?: "STATE_UNSPECIFIED" | "QUEUED" | "RUNNING" | "CANCELING" | "CANCELED" | "SUCCEEDED" | "FAILED" | "SUCCEEDED_WITH_ERRORS" | (string & {});
  /** Output only. Message relating to the progression of a metadata job. */
  message?: string;
  /** Output only. The time when the status was updated. */
  updateTime?: string;
  /** Output only. Progress tracking. */
  completionPercent?: number;
}

export const GoogleCloudDataplexV1MetadataJobStatus: Schema.Schema<GoogleCloudDataplexV1MetadataJobStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  completionPercent: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDataplexV1MetadataJobStatus" }) as any as Schema.Schema<GoogleCloudDataplexV1MetadataJobStatus>;

export interface GoogleCloudDataplexV1MetadataJobImportJobSpecImportJobScope {
  /** Required. The entry groups that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/entryGroups/{entry_group_id}. Only entries and aspects that belong to the specified entry groups are affected by the job.The entry groups and the job must be in the same location. */
  entryGroups?: Array<string>;
  /** Optional. Defines the scope of entries that can be referenced in the entry links.Currently, projects are supported as valid scopes. Format: projects/{project_number_or_id}If the metadata import file attempts to create an entry link which references an entry that is not in the scope, the import job will skip that entry link. */
  referencedEntryScopes?: Array<string>;
  /** Optional. The entry link types that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/entryLinkTypes/{entry_link_type_id}. The job modifies only the entryLinks that belong to these entry link types.If the metadata import file attempts to create or delete an entry link whose entry link type isn't included in this list, the import job will skip those entry links. */
  entryLinkTypes?: Array<string>;
  /** Optional. The aspect types that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/aspectTypes/{aspect_type_id}. The job modifies only the aspects that belong to these aspect types.This field is required when creating an aspect-only import job.If the metadata import file attempts to modify an aspect whose type isn't included in this list, the import job is halted before modifying any entries or aspects.The location of an aspect type must either match the location of the job, or the aspect type must be global. */
  aspectTypes?: Array<string>;
  /** Required. The entry types that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/entryTypes/{entry_type_id}. The job modifies only the entries and aspects that belong to these entry types.If the metadata import file attempts to modify an entry whose type isn't included in this list, the import job is halted before modifying any entries or aspects.The location of an entry type must either match the location of the job, or the entry type must be global. */
  entryTypes?: Array<string>;
  /** Optional. The glossaries that are in scope for the import job, specified as relative resource names in the format projects/{project_number_or_id}/locations/{location_id}/glossaries/{glossary_id}.While importing Business Glossary entries, the user must provide glossaries. While importing entries, the user does not have to provide glossaries. If the metadata import file attempts to modify Business Glossary entries whose glossary isn't included in this list, the import job will skip those entries.The location of a glossary must either match the location of the job, or the glossary must be global. */
  glossaries?: Array<string>;
}

export const GoogleCloudDataplexV1MetadataJobImportJobSpecImportJobScope: Schema.Schema<GoogleCloudDataplexV1MetadataJobImportJobSpecImportJobScope> = Schema.suspend(() => Schema.Struct({
  entryGroups: Schema.optional(Schema.Array(Schema.String)),
  referencedEntryScopes: Schema.optional(Schema.Array(Schema.String)),
  entryLinkTypes: Schema.optional(Schema.Array(Schema.String)),
  aspectTypes: Schema.optional(Schema.Array(Schema.String)),
  entryTypes: Schema.optional(Schema.Array(Schema.String)),
  glossaries: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1MetadataJobImportJobSpecImportJobScope" }) as any as Schema.Schema<GoogleCloudDataplexV1MetadataJobImportJobSpecImportJobScope>;

export interface GoogleCloudDataplexV1TaskSparkTaskConfig {
  /** The query text. The execution args are used to declare a set of script variables (set key="value";). */
  sqlScript?: string;
  /** Optional. Infrastructure specification for the execution. */
  infrastructureSpec?: GoogleCloudDataplexV1TaskInfrastructureSpec;
  /** Optional. Cloud Storage URIs of files to be placed in the working directory of each executor. */
  fileUris?: Array<string>;
  /** The name of the driver's main class. The jar file that contains the class must be in the default CLASSPATH or specified in jar_file_uris. The execution args are passed in as a sequence of named process arguments (--key=value). */
  mainClass?: string;
  /** The Gcloud Storage URI of the main Python file to use as the driver. Must be a .py file. The execution args are passed in as a sequence of named process arguments (--key=value). */
  pythonScriptFile?: string;
  /** The Cloud Storage URI of the jar file that contains the main class. The execution args are passed in as a sequence of named process arguments (--key=value). */
  mainJarFileUri?: string;
  /** Optional. Cloud Storage URIs of archives to be extracted into the working directory of each executor. Supported file types: .jar, .tar, .tar.gz, .tgz, and .zip. */
  archiveUris?: Array<string>;
  /** A reference to a query file. This should be the Cloud Storage URI of the query file. The execution args are used to declare a set of script variables (set key="value";). */
  sqlScriptFile?: string;
}

export const GoogleCloudDataplexV1TaskSparkTaskConfig: Schema.Schema<GoogleCloudDataplexV1TaskSparkTaskConfig> = Schema.suspend(() => Schema.Struct({
  sqlScript: Schema.optional(Schema.String),
  infrastructureSpec: Schema.optional(GoogleCloudDataplexV1TaskInfrastructureSpec),
  fileUris: Schema.optional(Schema.Array(Schema.String)),
  mainClass: Schema.optional(Schema.String),
  pythonScriptFile: Schema.optional(Schema.String),
  mainJarFileUri: Schema.optional(Schema.String),
  archiveUris: Schema.optional(Schema.Array(Schema.String)),
  sqlScriptFile: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1TaskSparkTaskConfig" }) as any as Schema.Schema<GoogleCloudDataplexV1TaskSparkTaskConfig>;

export interface GoogleRpcStatus {
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  code: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleLongrunningOperation {
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the name should be a resource name ending with operations/{unique_id}. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is false, it means the operation is still in progress. If true, the operation is completed, and either error or response is available. */
  done?: boolean;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as Delete, the response is google.protobuf.Empty. If the original method is standard Get/Create/Update, the response should be the resource. For other methods, the response should have the type XxxResponse, where Xxx is the original method name. For example, if the original method name is TakeSnapshot(), the inferred response type is TakeSnapshotResponse. */
  response?: Record<string, unknown>;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  error: Schema.optional(GoogleRpcStatus),
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleLongrunningListOperationsResponse {
  /** Unordered list. Unreachable resources. Populated when the request sets ListOperationsRequest.return_partial_success and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunningOperation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  unreachable: Schema.optional(Schema.Array(Schema.String)),
  operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleLongrunningListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface GoogleCloudDataplexV1GlossaryCategory {
  /** Output only. The time at which the GlossaryCategory was created. */
  createTime?: string;
  /** Output only. The time at which the GlossaryCategory was last updated. */
  updateTime?: string;
  /** Output only. System generated unique id for the GlossaryCategory. This ID will be different if the GlossaryCategory is deleted and re-created with the same name. */
  uid?: string;
  /** Optional. User-defined labels for the GlossaryCategory. */
  labels?: Record<string, string>;
  /** Required. The immediate parent of the GlossaryCategory in the resource-hierarchy. It can either be a Glossary or a GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} OR projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id} */
  parent?: string;
  /** Output only. Identifier. The resource name of the GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id} */
  name?: string;
  /** Optional. The user-mutable description of the GlossaryCategory. */
  description?: string;
  /** Optional. User friendly display name of the GlossaryCategory. This is user-mutable. This will be same as the GlossaryCategoryId, if not specified. */
  displayName?: string;
}

export const GoogleCloudDataplexV1GlossaryCategory: Schema.Schema<GoogleCloudDataplexV1GlossaryCategory> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  parent: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1GlossaryCategory" }) as any as Schema.Schema<GoogleCloudDataplexV1GlossaryCategory>;

export interface GoogleCloudDataplexV1ListGlossaryCategoriesResponse {
  /** Lists the GlossaryCategories in the specified parent. */
  categories?: Array<GoogleCloudDataplexV1GlossaryCategory>;
  /** A token, which can be sent as page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Locations that the service couldn't reach. */
  unreachableLocations?: Array<string>;
}

export const GoogleCloudDataplexV1ListGlossaryCategoriesResponse: Schema.Schema<GoogleCloudDataplexV1ListGlossaryCategoriesResponse> = Schema.suspend(() => Schema.Struct({
  categories: Schema.optional(Schema.Array(GoogleCloudDataplexV1GlossaryCategory)),
  nextPageToken: Schema.optional(Schema.String),
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListGlossaryCategoriesResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListGlossaryCategoriesResponse>;

export interface GoogleCloudDataplexV1ListJobsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Jobs under a given task. */
  jobs?: Array<GoogleCloudDataplexV1Job>;
}

export const GoogleCloudDataplexV1ListJobsResponse: Schema.Schema<GoogleCloudDataplexV1ListJobsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  jobs: Schema.optional(Schema.Array(GoogleCloudDataplexV1Job)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListJobsResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListJobsResponse>;

export interface GoogleCloudDataplexV1SessionEventQueryDetail {
  /** Query Execution engine. */
  engine?: "ENGINE_UNSPECIFIED" | "SPARK_SQL" | "BIGQUERY" | (string & {});
  /** The size of results the query produced. */
  resultSizeBytes?: string;
  /** The query text executed. */
  queryText?: string;
  /** The unique Query id identifying the query. */
  queryId?: string;
  /** Time taken for execution of the query. */
  duration?: string;
  /** The data processed by the query. */
  dataProcessedBytes?: string;
}

export const GoogleCloudDataplexV1SessionEventQueryDetail: Schema.Schema<GoogleCloudDataplexV1SessionEventQueryDetail> = Schema.suspend(() => Schema.Struct({
  engine: Schema.optional(Schema.String),
  resultSizeBytes: Schema.optional(Schema.String),
  queryText: Schema.optional(Schema.String),
  queryId: Schema.optional(Schema.String),
  duration: Schema.optional(Schema.String),
  dataProcessedBytes: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1SessionEventQueryDetail" }) as any as Schema.Schema<GoogleCloudDataplexV1SessionEventQueryDetail>;

export interface GoogleCloudDataplexV1SessionEvent {
  /** The status of the event. */
  eventSucceeded?: boolean;
  /** If the session is associated with an environment with fast startup enabled, and was created before being assigned to a user. */
  fastStartupEnabled?: boolean;
  /** The idle duration of a warm pooled session before it is assigned to user. */
  unassignedDuration?: string;
  /** The type of the event. */
  type?: "EVENT_TYPE_UNSPECIFIED" | "START" | "STOP" | "QUERY" | "CREATE" | (string & {});
  /** The information about the user that created the session. It will be the email address of the user. */
  userId?: string;
  /** The log message. */
  message?: string;
  /** Unique identifier for the session. */
  sessionId?: string;
  /** The execution details of the query. */
  query?: GoogleCloudDataplexV1SessionEventQueryDetail;
}

export const GoogleCloudDataplexV1SessionEvent: Schema.Schema<GoogleCloudDataplexV1SessionEvent> = Schema.suspend(() => Schema.Struct({
  eventSucceeded: Schema.optional(Schema.Boolean),
  fastStartupEnabled: Schema.optional(Schema.Boolean),
  unassignedDuration: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  userId: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  sessionId: Schema.optional(Schema.String),
  query: Schema.optional(GoogleCloudDataplexV1SessionEventQueryDetail),
})).annotate({ identifier: "GoogleCloudDataplexV1SessionEvent" }) as any as Schema.Schema<GoogleCloudDataplexV1SessionEvent>;

export interface GoogleCloudDataplexV1AspectTypeAuthorization {
  /** Immutable. The IAM permission grantable on the EntryGroup to allow access to instantiate Aspects of Dataplex Universal Catalog owned AspectTypes, only settable for Dataplex Universal Catalog owned Types. */
  alternateUsePermission?: string;
}

export const GoogleCloudDataplexV1AspectTypeAuthorization: Schema.Schema<GoogleCloudDataplexV1AspectTypeAuthorization> = Schema.suspend(() => Schema.Struct({
  alternateUsePermission: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1AspectTypeAuthorization" }) as any as Schema.Schema<GoogleCloudDataplexV1AspectTypeAuthorization>;

export interface GoogleCloudDataplexV1AspectType {
  /** Output only. The time when the AspectType was last updated. */
  updateTime?: string;
  /** Output only. The time when the AspectType was created. */
  createTime?: string;
  /** Optional. Immutable. Stores data classification of the aspect. */
  dataClassification?: "DATA_CLASSIFICATION_UNSPECIFIED" | "METADATA_AND_DATA" | (string & {});
  /** Optional. User-defined labels for the AspectType. */
  labels?: Record<string, string>;
  /** Required. MetadataTemplate of the aspect. */
  metadataTemplate?: GoogleCloudDataplexV1AspectTypeMetadataTemplate;
  /** Output only. System generated globally unique ID for the AspectType. If you delete and recreate the AspectType with the same name, then this ID will be different. */
  uid?: string;
  /** Output only. The relative resource name of the AspectType, of the form: projects/{project_number}/locations/{location_id}/aspectTypes/{aspect_type_id}. */
  name?: string;
  /** Output only. Denotes the transfer status of the Aspect Type. It is unspecified for Aspect Types created from Dataplex API. */
  transferStatus?: "TRANSFER_STATUS_UNSPECIFIED" | "TRANSFER_STATUS_MIGRATED" | "TRANSFER_STATUS_TRANSFERRED" | (string & {});
  /** Optional. Description of the AspectType. */
  description?: string;
  /** Immutable. Defines the Authorization for this type. */
  authorization?: GoogleCloudDataplexV1AspectTypeAuthorization;
  /** Optional. User friendly display name. */
  displayName?: string;
  /** The service computes this checksum. The client may send it on update and delete requests to ensure it has an up-to-date value before proceeding. */
  etag?: string;
}

export const GoogleCloudDataplexV1AspectType: Schema.Schema<GoogleCloudDataplexV1AspectType> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  dataClassification: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  metadataTemplate: Schema.optional(GoogleCloudDataplexV1AspectTypeMetadataTemplate),
  uid: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  transferStatus: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  authorization: Schema.optional(GoogleCloudDataplexV1AspectTypeAuthorization),
  displayName: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1AspectType" }) as any as Schema.Schema<GoogleCloudDataplexV1AspectType>;

export interface GoogleCloudDataplexV1ListAspectTypesResponse {
  /** Locations that the service couldn't reach. */
  unreachableLocations?: Array<string>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** AspectTypes under the given parent location. */
  aspectTypes?: Array<GoogleCloudDataplexV1AspectType>;
}

export const GoogleCloudDataplexV1ListAspectTypesResponse: Schema.Schema<GoogleCloudDataplexV1ListAspectTypesResponse> = Schema.suspend(() => Schema.Struct({
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  aspectTypes: Schema.optional(Schema.Array(GoogleCloudDataplexV1AspectType)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListAspectTypesResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListAspectTypesResponse>;

export interface GoogleCloudLocationListLocationsResponse {
  /** A list of locations that matches the specified filter in the request. */
  locations?: Array<GoogleCloudLocationLocation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
}

export const GoogleCloudLocationListLocationsResponse: Schema.Schema<GoogleCloudLocationListLocationsResponse> = Schema.suspend(() => Schema.Struct({
  locations: Schema.optional(Schema.Array(GoogleCloudLocationLocation)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudLocationListLocationsResponse" }) as any as Schema.Schema<GoogleCloudLocationListLocationsResponse>;

export interface GoogleCloudDataplexV1DataQualityRuleUniquenessExpectation {
}

export const GoogleCloudDataplexV1DataQualityRuleUniquenessExpectation: Schema.Schema<GoogleCloudDataplexV1DataQualityRuleUniquenessExpectation> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityRuleUniquenessExpectation" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityRuleUniquenessExpectation>;

export interface GoogleCloudDataplexV1DataScanExecutionSpec {
  /** Immutable. The unnested field (of type Date or Timestamp) that contains values which monotonically increase over time.If not specified, a data scan will run for all data in the table. */
  field?: string;
  /** Optional. Spec related to how often and when a scan should be triggered.If not specified, the default is OnDemand, which means the scan will not run until the user calls RunDataScan API. */
  trigger?: GoogleCloudDataplexV1Trigger;
}

export const GoogleCloudDataplexV1DataScanExecutionSpec: Schema.Schema<GoogleCloudDataplexV1DataScanExecutionSpec> = Schema.suspend(() => Schema.Struct({
  field: Schema.optional(Schema.String),
  trigger: Schema.optional(GoogleCloudDataplexV1Trigger),
})).annotate({ identifier: "GoogleCloudDataplexV1DataScanExecutionSpec" }) as any as Schema.Schema<GoogleCloudDataplexV1DataScanExecutionSpec>;

export interface GoogleCloudDataplexV1ListPartitionsResponse {
  /** Partitions under the specified parent entity. */
  partitions?: Array<GoogleCloudDataplexV1Partition>;
  /** Token to retrieve the next page of results, or empty if there are no remaining results in the list. */
  nextPageToken?: string;
}

export const GoogleCloudDataplexV1ListPartitionsResponse: Schema.Schema<GoogleCloudDataplexV1ListPartitionsResponse> = Schema.suspend(() => Schema.Struct({
  partitions: Schema.optional(Schema.Array(GoogleCloudDataplexV1Partition)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ListPartitionsResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListPartitionsResponse>;

export interface GoogleCloudDataplexV1DataQualityRuleDebugQuery {
  /** Required. Specifies the SQL statement to be executed. */
  sqlStatement?: string;
  /** Optional. Specifies the description of the debug query. The maximum length is 1,024 characters. */
  description?: string;
}

export const GoogleCloudDataplexV1DataQualityRuleDebugQuery: Schema.Schema<GoogleCloudDataplexV1DataQualityRuleDebugQuery> = Schema.suspend(() => Schema.Struct({
  sqlStatement: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityRuleDebugQuery" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityRuleDebugQuery>;

export interface GoogleCloudDataplexV1RunTaskRequest {
  /** Optional. Execution spec arguments. If the map is left empty, the task will run with existing execution spec args from task definition. If the map contains an entry with a new key, the same will be added to existing set of args. If the map contains an entry with an existing arg key in task definition, the task will run with new arg value for that entry. Clearing an existing arg will require arg value to be explicitly set to a hyphen "-". The arg value cannot be empty. */
  args?: Record<string, string>;
  /** Optional. User-defined labels for the task. If the map is left empty, the task will run with existing labels from task definition. If the map contains an entry with a new key, the same will be added to existing set of labels. If the map contains an entry with an existing label key in task definition, the task will run with new label value for that entry. Clearing an existing label will require label value to be explicitly set to a hyphen "-". The label value cannot be empty. */
  labels?: Record<string, string>;
}

export const GoogleCloudDataplexV1RunTaskRequest: Schema.Schema<GoogleCloudDataplexV1RunTaskRequest> = Schema.suspend(() => Schema.Struct({
  args: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1RunTaskRequest" }) as any as Schema.Schema<GoogleCloudDataplexV1RunTaskRequest>;

export interface GoogleCloudDataplexV1DataQualityRuleTableConditionExpectation {
  /** Optional. The SQL expression. */
  sqlExpression?: string;
}

export const GoogleCloudDataplexV1DataQualityRuleTableConditionExpectation: Schema.Schema<GoogleCloudDataplexV1DataQualityRuleTableConditionExpectation> = Schema.suspend(() => Schema.Struct({
  sqlExpression: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityRuleTableConditionExpectation" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityRuleTableConditionExpectation>;

export interface GoogleCloudDataplexV1DataQualityRule {
  /** Row-level rule which evaluates whether each column value matches a specified regex. */
  regexExpectation?: GoogleCloudDataplexV1DataQualityRuleRegexExpectation;
  /** Row-level rule which evaluates whether each column value is contained by a specified set. */
  setExpectation?: GoogleCloudDataplexV1DataQualityRuleSetExpectation;
  /** Optional. Description of the rule. The maximum length is 1,024 characters. */
  description?: string;
  /** Optional. A mutable name for the rule. The name must contain only letters (a-z, A-Z), numbers (0-9), or hyphens (-). The maximum length is 63 characters. Must start with a letter. Must end with a number or a letter. */
  name?: string;
  /** Aggregate rule which evaluates the number of rows returned for the provided statement. If any rows are returned, this rule fails. */
  sqlAssertion?: GoogleCloudDataplexV1DataQualityRuleSqlAssertion;
  /** Optional. The unnested column which this rule is evaluated against. */
  column?: string;
  /** Aggregate rule which evaluates whether the provided expression is true for a table. */
  tableConditionExpectation?: GoogleCloudDataplexV1DataQualityRuleTableConditionExpectation;
  /** Optional. Rows with null values will automatically fail a rule, unless ignore_null is true. In that case, such null rows are trivially considered passing.This field is only valid for the following type of rules: RangeExpectation RegexExpectation SetExpectation UniquenessExpectation */
  ignoreNull?: boolean;
  /** Optional. Specifies the debug queries for this rule. Currently, only one query is supported, but this may be expanded in the future. */
  debugQueries?: Array<GoogleCloudDataplexV1DataQualityRuleDebugQuery>;
  /** Optional. The minimum ratio of passing_rows / total_rows required to pass this rule, with a range of 0.0, 1.0.0 indicates default value (i.e. 1.0).This field is only valid for row-level type rules. */
  threshold?: number;
  /** Optional. Whether the Rule is active or suspended. Default is false. */
  suspended?: boolean;
  /** Row-level rule which evaluates whether each row in a table passes the specified condition. */
  rowConditionExpectation?: GoogleCloudDataplexV1DataQualityRuleRowConditionExpectation;
  /** Row-level rule which evaluates whether each column value is unique. */
  uniquenessExpectation?: GoogleCloudDataplexV1DataQualityRuleUniquenessExpectation;
  /** Row-level rule which evaluates whether each column value lies between a specified range. */
  rangeExpectation?: GoogleCloudDataplexV1DataQualityRuleRangeExpectation;
  /** Optional. The dimension a rule belongs to. Results are also aggregated at the dimension level. Custom dimension name is supported with all uppercase letters and maximum length of 30 characters. */
  dimension?: string;
  /** Aggregate rule which evaluates whether the column aggregate statistic lies between a specified range. */
  statisticRangeExpectation?: GoogleCloudDataplexV1DataQualityRuleStatisticRangeExpectation;
  /** Row-level rule which evaluates whether each column value is null. */
  nonNullExpectation?: GoogleCloudDataplexV1DataQualityRuleNonNullExpectation;
}

export const GoogleCloudDataplexV1DataQualityRule: Schema.Schema<GoogleCloudDataplexV1DataQualityRule> = Schema.suspend(() => Schema.Struct({
  regexExpectation: Schema.optional(GoogleCloudDataplexV1DataQualityRuleRegexExpectation),
  setExpectation: Schema.optional(GoogleCloudDataplexV1DataQualityRuleSetExpectation),
  description: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  sqlAssertion: Schema.optional(GoogleCloudDataplexV1DataQualityRuleSqlAssertion),
  column: Schema.optional(Schema.String),
  tableConditionExpectation: Schema.optional(GoogleCloudDataplexV1DataQualityRuleTableConditionExpectation),
  ignoreNull: Schema.optional(Schema.Boolean),
  debugQueries: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataQualityRuleDebugQuery)),
  threshold: Schema.optional(Schema.Number),
  suspended: Schema.optional(Schema.Boolean),
  rowConditionExpectation: Schema.optional(GoogleCloudDataplexV1DataQualityRuleRowConditionExpectation),
  uniquenessExpectation: Schema.optional(GoogleCloudDataplexV1DataQualityRuleUniquenessExpectation),
  rangeExpectation: Schema.optional(GoogleCloudDataplexV1DataQualityRuleRangeExpectation),
  dimension: Schema.optional(Schema.String),
  statisticRangeExpectation: Schema.optional(GoogleCloudDataplexV1DataQualityRuleStatisticRangeExpectation),
  nonNullExpectation: Schema.optional(GoogleCloudDataplexV1DataQualityRuleNonNullExpectation),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityRule" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityRule>;

export interface GoogleCloudDataplexV1DataProductPrincipal {
  /** Optional. Email of the Google Group, as per https://cloud.google.com/iam/docs/principals-overview#google-group. */
  googleGroup?: string;
}

export const GoogleCloudDataplexV1DataProductPrincipal: Schema.Schema<GoogleCloudDataplexV1DataProductPrincipal> = Schema.suspend(() => Schema.Struct({
  googleGroup: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProductPrincipal" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProductPrincipal>;

export interface GoogleCloudDataplexV1DataProfileSpec {
  /** Optional. Actions to take upon job completion.. */
  postScanActions?: GoogleCloudDataplexV1DataProfileSpecPostScanActions;
  /** Optional. The fields to include in data profile.If not specified, all fields at the time of profile scan job execution are included, except for ones listed in exclude_fields. */
  includeFields?: GoogleCloudDataplexV1DataProfileSpecSelectedFields;
  /** Optional. A filter applied to all rows in a single DataScan job. The filter needs to be a valid SQL expression for a WHERE clause in BigQuery standard SQL syntax. Example: col1 >= 0 AND col2 < 10 */
  rowFilter?: string;
  /** Optional. The fields to exclude from data profile.If specified, the fields will be excluded from data profile, regardless of include_fields value. */
  excludeFields?: GoogleCloudDataplexV1DataProfileSpecSelectedFields;
  /** Optional. If set, the latest DataScan job result will be published as Dataplex Universal Catalog metadata. */
  catalogPublishingEnabled?: boolean;
  /** Optional. The percentage of the records to be selected from the dataset for DataScan. Value can range between 0.0 and 100.0 with up to 3 significant decimal digits. Sampling is not applied if sampling_percent is not specified, 0 or 100. */
  samplingPercent?: number;
}

export const GoogleCloudDataplexV1DataProfileSpec: Schema.Schema<GoogleCloudDataplexV1DataProfileSpec> = Schema.suspend(() => Schema.Struct({
  postScanActions: Schema.optional(GoogleCloudDataplexV1DataProfileSpecPostScanActions),
  includeFields: Schema.optional(GoogleCloudDataplexV1DataProfileSpecSelectedFields),
  rowFilter: Schema.optional(Schema.String),
  excludeFields: Schema.optional(GoogleCloudDataplexV1DataProfileSpecSelectedFields),
  catalogPublishingEnabled: Schema.optional(Schema.Boolean),
  samplingPercent: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProfileSpec" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProfileSpec>;

export interface GoogleCloudDataplexV1EncryptionConfig {
  /** Optional. Represent the state of CMEK opt-in for metastore. */
  enableMetastoreEncryption?: boolean;
  /** Output only. Details of the failure if anything related to Cmek db fails. */
  failureDetails?: GoogleCloudDataplexV1EncryptionConfigFailureDetails;
  /** Identifier. The resource name of the EncryptionConfig. Format: organizations/{organization}/locations/{location}/encryptionConfigs/{encryption_config} Global location is not supported. */
  name?: string;
  /** Etag of the EncryptionConfig. This is a strong etag. */
  etag?: string;
  /** Optional. If a key is chosen, it means that the customer is using CMEK. If a key is not chosen, it means that the customer is using Google managed encryption. */
  key?: string;
  /** Output only. The time when the Encryption configuration was last updated. */
  updateTime?: string;
  /** Output only. The time when the Encryption configuration was created. */
  createTime?: string;
  /** Output only. The state of encryption of the databases. */
  encryptionState?: "ENCRYPTION_STATE_UNSPECIFIED" | "ENCRYPTING" | "COMPLETED" | "FAILED" | (string & {});
}

export const GoogleCloudDataplexV1EncryptionConfig: Schema.Schema<GoogleCloudDataplexV1EncryptionConfig> = Schema.suspend(() => Schema.Struct({
  enableMetastoreEncryption: Schema.optional(Schema.Boolean),
  failureDetails: Schema.optional(GoogleCloudDataplexV1EncryptionConfigFailureDetails),
  name: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  key: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  encryptionState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1EncryptionConfig" }) as any as Schema.Schema<GoogleCloudDataplexV1EncryptionConfig>;

export interface GoogleCloudDataplexV1DataProfileResult {
  /** Output only. The count of rows scanned. */
  rowCount?: string;
  /** Output only. The status of publishing the data scan as Dataplex Universal Catalog metadata. */
  catalogPublishingStatus?: GoogleCloudDataplexV1DataScanCatalogPublishingStatus;
  /** Output only. The result of post scan actions. */
  postScanActionsResult?: GoogleCloudDataplexV1DataProfileResultPostScanActionsResult;
  /** Output only. The data scanned for this result. */
  scannedData?: GoogleCloudDataplexV1ScannedData;
  /** Output only. The profile information per field. */
  profile?: GoogleCloudDataplexV1DataProfileResultProfile;
}

export const GoogleCloudDataplexV1DataProfileResult: Schema.Schema<GoogleCloudDataplexV1DataProfileResult> = Schema.suspend(() => Schema.Struct({
  rowCount: Schema.optional(Schema.String),
  catalogPublishingStatus: Schema.optional(GoogleCloudDataplexV1DataScanCatalogPublishingStatus),
  postScanActionsResult: Schema.optional(GoogleCloudDataplexV1DataProfileResultPostScanActionsResult),
  scannedData: Schema.optional(GoogleCloudDataplexV1ScannedData),
  profile: Schema.optional(GoogleCloudDataplexV1DataProfileResultProfile),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProfileResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProfileResult>;

export interface GoogleCloudDataplexV1DataQualitySpec {
  /** Required. The list of rules to evaluate against a data source. At least one rule is required. */
  rules?: Array<GoogleCloudDataplexV1DataQualityRule>;
  /** Optional. A filter applied to all rows in a single DataScan job. The filter needs to be a valid SQL expression for a WHERE clause in GoogleSQL syntax (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#where_clause).Example: col1 >= 0 AND col2 < 10 */
  rowFilter?: string;
  /** Optional. Actions to take upon job completion. */
  postScanActions?: GoogleCloudDataplexV1DataQualitySpecPostScanActions;
  /** Optional. The percentage of the records to be selected from the dataset for DataScan. Value can range between 0.0 and 100.0 with up to 3 significant decimal digits. Sampling is not applied if sampling_percent is not specified, 0 or 100. */
  samplingPercent?: number;
  /** Optional. If set, the latest DataScan job result will be published as Dataplex Universal Catalog metadata. */
  catalogPublishingEnabled?: boolean;
}

export const GoogleCloudDataplexV1DataQualitySpec: Schema.Schema<GoogleCloudDataplexV1DataQualitySpec> = Schema.suspend(() => Schema.Struct({
  rules: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataQualityRule)),
  rowFilter: Schema.optional(Schema.String),
  postScanActions: Schema.optional(GoogleCloudDataplexV1DataQualitySpecPostScanActions),
  samplingPercent: Schema.optional(Schema.Number),
  catalogPublishingEnabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualitySpec" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualitySpec>;

export interface GoogleCloudDataplexV1DataQualityResultPostScanActionsResult {
  /** Output only. The result of BigQuery export post scan action. */
  bigqueryExportResult?: GoogleCloudDataplexV1DataQualityResultPostScanActionsResultBigQueryExportResult;
}

export const GoogleCloudDataplexV1DataQualityResultPostScanActionsResult: Schema.Schema<GoogleCloudDataplexV1DataQualityResultPostScanActionsResult> = Schema.suspend(() => Schema.Struct({
  bigqueryExportResult: Schema.optional(GoogleCloudDataplexV1DataQualityResultPostScanActionsResultBigQueryExportResult),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityResultPostScanActionsResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityResultPostScanActionsResult>;

export interface GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResult {
  /** Indicates the data type of the result. For more information, see BigQuery data types (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types). */
  type?: string;
  /** Specifies the name of the result. Available if provided with an explicit alias using [AS] alias. */
  name?: string;
  /** Represents the value of the result as a string. */
  value?: string;
}

export const GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResult: Schema.Schema<GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResult> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResult>;

export interface GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResultSet {
  /** Output only. Contains all results. Up to 10 results can be returned. */
  results?: Array<GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResult>;
}

export const GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResultSet: Schema.Schema<GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResultSet> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResult)),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResultSet" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResultSet>;

export interface GoogleCloudDataplexV1DataQualityRuleResult {
  /** Output only. The query to find rows that did not pass this rule.This field is only valid for row-level type rules. */
  failingRowsQuery?: string;
  /** Output only. The number of rows returned by the SQL statement in a SQL assertion rule.This field is only valid for SQL assertion rules. */
  assertionRowCount?: string;
  /** Output only. Contains the results of all debug queries for this rule. The number of result sets will correspond to the number of debug_queries. */
  debugQueriesResultSets?: Array<GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResultSet>;
  /** Output only. The number of rows which passed a rule evaluation.This field is only valid for row-level type rules.This field is not set for rule SqlAssertion. */
  passedCount?: string;
  /** Output only. The ratio of passed_count / evaluated_count.This field is only valid for row-level type rules. */
  passRatio?: number;
  /** Output only. The number of rows a rule was evaluated against.This field is only valid for row-level type rules.Evaluated count can be configured to either include all rows (default) - with null rows automatically failing rule evaluation, or exclude null rows from the evaluated_count, by setting ignore_nulls = true.This field is not set for rule SqlAssertion. */
  evaluatedCount?: string;
  /** Output only. The rule specified in the DataQualitySpec, as is. */
  rule?: GoogleCloudDataplexV1DataQualityRule;
  /** Output only. Whether the rule passed or failed. */
  passed?: boolean;
  /** Output only. The number of rows with null values in the specified column. */
  nullCount?: string;
}

export const GoogleCloudDataplexV1DataQualityRuleResult: Schema.Schema<GoogleCloudDataplexV1DataQualityRuleResult> = Schema.suspend(() => Schema.Struct({
  failingRowsQuery: Schema.optional(Schema.String),
  assertionRowCount: Schema.optional(Schema.String),
  debugQueriesResultSets: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataQualityRuleResultDebugQueryResultSet)),
  passedCount: Schema.optional(Schema.String),
  passRatio: Schema.optional(Schema.Number),
  evaluatedCount: Schema.optional(Schema.String),
  rule: Schema.optional(GoogleCloudDataplexV1DataQualityRule),
  passed: Schema.optional(Schema.Boolean),
  nullCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityRuleResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityRuleResult>;

export interface GoogleCloudDataplexV1DataQualityResultAnomalyDetectionGeneratedAssets {
  /** Output only. The intermediate table for data anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID */
  dataIntermediateTable?: string;
  /** Output only. The intermediate table for freshness anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID */
  freshnessIntermediateTable?: string;
  /** Output only. The result table for anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID If the result table is set at AnomalyDetectionAssets, the result table here would be the same as the one set in the AnomalyDetectionAssets.result_table. */
  resultTable?: string;
  /** Output only. The intermediate table for volume anomaly detection. Format: PROJECT_ID.DATASET_ID.TABLE_ID */
  volumeIntermediateTable?: string;
}

export const GoogleCloudDataplexV1DataQualityResultAnomalyDetectionGeneratedAssets: Schema.Schema<GoogleCloudDataplexV1DataQualityResultAnomalyDetectionGeneratedAssets> = Schema.suspend(() => Schema.Struct({
  dataIntermediateTable: Schema.optional(Schema.String),
  freshnessIntermediateTable: Schema.optional(Schema.String),
  resultTable: Schema.optional(Schema.String),
  volumeIntermediateTable: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityResultAnomalyDetectionGeneratedAssets" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityResultAnomalyDetectionGeneratedAssets>;

export interface GoogleCloudDataplexV1DataQualityResult {
  /** Output only. The count of rows processed. */
  rowCount?: string;
  /** Output only. The result of post scan actions. */
  postScanActionsResult?: GoogleCloudDataplexV1DataQualityResultPostScanActionsResult;
  /** Output only. The overall data quality score.The score ranges between 0, 100 (up to two decimal points). */
  score?: number;
  /** Output only. Overall data quality result -- true if all rules passed. */
  passed?: boolean;
  /** Output only. A list of results at the dimension level.A dimension will have a corresponding DataQualityDimensionResult if and only if there is at least one rule with the 'dimension' field set to it. */
  dimensions?: Array<GoogleCloudDataplexV1DataQualityDimensionResult>;
  /** Output only. The data scanned for this result. */
  scannedData?: GoogleCloudDataplexV1ScannedData;
  /** Output only. A list of all the rules in a job, and their results. */
  rules?: Array<GoogleCloudDataplexV1DataQualityRuleResult>;
  /** Output only. The generated assets for anomaly detection. */
  anomalyDetectionGeneratedAssets?: GoogleCloudDataplexV1DataQualityResultAnomalyDetectionGeneratedAssets;
  /** Output only. A list of results at the column level.A column will have a corresponding DataQualityColumnResult if and only if there is at least one rule with the 'column' field set to it. */
  columns?: Array<GoogleCloudDataplexV1DataQualityColumnResult>;
  /** Output only. The status of publishing the data scan as Dataplex Universal Catalog metadata. */
  catalogPublishingStatus?: GoogleCloudDataplexV1DataScanCatalogPublishingStatus;
}

export const GoogleCloudDataplexV1DataQualityResult: Schema.Schema<GoogleCloudDataplexV1DataQualityResult> = Schema.suspend(() => Schema.Struct({
  rowCount: Schema.optional(Schema.String),
  postScanActionsResult: Schema.optional(GoogleCloudDataplexV1DataQualityResultPostScanActionsResult),
  score: Schema.optional(Schema.Number),
  passed: Schema.optional(Schema.Boolean),
  dimensions: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataQualityDimensionResult)),
  scannedData: Schema.optional(GoogleCloudDataplexV1ScannedData),
  rules: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataQualityRuleResult)),
  anomalyDetectionGeneratedAssets: Schema.optional(GoogleCloudDataplexV1DataQualityResultAnomalyDetectionGeneratedAssets),
  columns: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataQualityColumnResult)),
  catalogPublishingStatus: Schema.optional(GoogleCloudDataplexV1DataScanCatalogPublishingStatus),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityResult>;

export interface GoogleCloudDataplexV1DataScanJob {
  /** Output only. Execution state for the DataScanJob. */
  state?: "STATE_UNSPECIFIED" | "RUNNING" | "CANCELING" | "CANCELLED" | "SUCCEEDED" | "FAILED" | "PENDING" | (string & {});
  /** Output only. The time when the DataScanJob was started. */
  startTime?: string;
  /** Output only. Settings for a data documentation scan. */
  dataDocumentationSpec?: GoogleCloudDataplexV1DataDocumentationSpec;
  /** Output only. The result of a data profile scan. */
  dataProfileResult?: GoogleCloudDataplexV1DataProfileResult;
  /** Output only. Settings for a data quality scan. */
  dataQualitySpec?: GoogleCloudDataplexV1DataQualitySpec;
  /** Output only. Additional information about the current state. */
  message?: string;
  /** Output only. The time when the DataScanJob ended. */
  endTime?: string;
  /** Output only. The result of a data discovery scan. */
  dataDiscoveryResult?: GoogleCloudDataplexV1DataDiscoveryResult;
  /** Output only. System generated globally unique ID for the DataScanJob. */
  uid?: string;
  /** Output only. Settings for a data profile scan. */
  dataProfileSpec?: GoogleCloudDataplexV1DataProfileSpec;
  /** Output only. Settings for a data discovery scan. */
  dataDiscoverySpec?: GoogleCloudDataplexV1DataDiscoverySpec;
  /** Output only. The type of the parent DataScan. */
  type?: "DATA_SCAN_TYPE_UNSPECIFIED" | "DATA_QUALITY" | "DATA_PROFILE" | "DATA_DISCOVERY" | "DATA_DOCUMENTATION" | (string & {});
  /** Output only. The result of a data quality scan. */
  dataQualityResult?: GoogleCloudDataplexV1DataQualityResult;
  /** Output only. The time when the DataScanJob was created. */
  createTime?: string;
  /** Output only. Identifier. The relative resource name of the DataScanJob, of the form: projects/{project}/locations/{location_id}/dataScans/{datascan_id}/jobs/{job_id}, where project refers to a project_id or project_number and location_id refers to a Google Cloud region. */
  name?: string;
  /** Output only. The result of a data documentation scan. */
  dataDocumentationResult?: GoogleCloudDataplexV1DataDocumentationResult;
}

export const GoogleCloudDataplexV1DataScanJob: Schema.Schema<GoogleCloudDataplexV1DataScanJob> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  dataDocumentationSpec: Schema.optional(GoogleCloudDataplexV1DataDocumentationSpec),
  dataProfileResult: Schema.optional(GoogleCloudDataplexV1DataProfileResult),
  dataQualitySpec: Schema.optional(GoogleCloudDataplexV1DataQualitySpec),
  message: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  dataDiscoveryResult: Schema.optional(GoogleCloudDataplexV1DataDiscoveryResult),
  uid: Schema.optional(Schema.String),
  dataProfileSpec: Schema.optional(GoogleCloudDataplexV1DataProfileSpec),
  dataDiscoverySpec: Schema.optional(GoogleCloudDataplexV1DataDiscoverySpec),
  type: Schema.optional(Schema.String),
  dataQualityResult: Schema.optional(GoogleCloudDataplexV1DataQualityResult),
  createTime: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  dataDocumentationResult: Schema.optional(GoogleCloudDataplexV1DataDocumentationResult),
})).annotate({ identifier: "GoogleCloudDataplexV1DataScanJob" }) as any as Schema.Schema<GoogleCloudDataplexV1DataScanJob>;

export interface GoogleCloudDataplexV1RunDataScanResponse {
  /** DataScanJob created by RunDataScan request. */
  job?: GoogleCloudDataplexV1DataScanJob;
}

export const GoogleCloudDataplexV1RunDataScanResponse: Schema.Schema<GoogleCloudDataplexV1RunDataScanResponse> = Schema.suspend(() => Schema.Struct({
  job: Schema.optional(GoogleCloudDataplexV1DataScanJob),
})).annotate({ identifier: "GoogleCloudDataplexV1RunDataScanResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1RunDataScanResponse>;

export interface GoogleCloudDataplexV1DataQualityScanRuleResult {
  /** The number of rows with null values in the specified column. */
  nullRowCount?: string;
  /** The name of the data quality rule. */
  ruleName?: string;
  /** The column which this rule is evaluated against. */
  column?: string;
  /** The passing threshold (0.0, 100.0) of the data quality rule. */
  thresholdPercent?: number;
  /** The result of the data quality rule. */
  result?: "RESULT_UNSPECIFIED" | "PASSED" | "FAILED" | (string & {});
  /** Identifier of the specific data scan job this log entry is for. */
  jobId?: string;
  /** The dimension of the data quality rule. */
  ruleDimension?: string;
  /** The number of rows evaluated against the data quality rule. This field is only valid for rules of PER_ROW evaluation type. */
  evaluatedRowCount?: string;
  /** The type of the data quality rule. */
  ruleType?: "RULE_TYPE_UNSPECIFIED" | "NON_NULL_EXPECTATION" | "RANGE_EXPECTATION" | "REGEX_EXPECTATION" | "ROW_CONDITION_EXPECTATION" | "SET_EXPECTATION" | "STATISTIC_RANGE_EXPECTATION" | "TABLE_CONDITION_EXPECTATION" | "UNIQUENESS_EXPECTATION" | "SQL_ASSERTION" | (string & {});
  /** The data source of the data scan (e.g. BigQuery table name). */
  dataSource?: string;
  /** The evaluation type of the data quality rule. */
  evalutionType?: "EVALUATION_TYPE_UNSPECIFIED" | "PER_ROW" | "AGGREGATE" | (string & {});
  /** The number of rows which passed a rule evaluation. This field is only valid for rules of PER_ROW evaluation type. */
  passedRowCount?: string;
  /** The number of rows returned by the SQL statement in a SQL assertion rule. This field is only valid for SQL assertion rules. */
  assertionRowCount?: string;
}

export const GoogleCloudDataplexV1DataQualityScanRuleResult: Schema.Schema<GoogleCloudDataplexV1DataQualityScanRuleResult> = Schema.suspend(() => Schema.Struct({
  nullRowCount: Schema.optional(Schema.String),
  ruleName: Schema.optional(Schema.String),
  column: Schema.optional(Schema.String),
  thresholdPercent: Schema.optional(Schema.Number),
  result: Schema.optional(Schema.String),
  jobId: Schema.optional(Schema.String),
  ruleDimension: Schema.optional(Schema.String),
  evaluatedRowCount: Schema.optional(Schema.String),
  ruleType: Schema.optional(Schema.String),
  dataSource: Schema.optional(Schema.String),
  evalutionType: Schema.optional(Schema.String),
  passedRowCount: Schema.optional(Schema.String),
  assertionRowCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataQualityScanRuleResult" }) as any as Schema.Schema<GoogleCloudDataplexV1DataQualityScanRuleResult>;

export interface GoogleCloudDataplexV1ListEntriesResponse {
  /** The list of entries under the given parent location. */
  entries?: Array<GoogleCloudDataplexV1Entry>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const GoogleCloudDataplexV1ListEntriesResponse: Schema.Schema<GoogleCloudDataplexV1ListEntriesResponse> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(GoogleCloudDataplexV1Entry)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ListEntriesResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListEntriesResponse>;

export interface GoogleCloudDataplexV1JobEvent {
  /** The time when the job ended running. */
  endTime?: string;
  /** The unique id identifying the job. */
  jobId?: string;
  /** The service used to execute the job. */
  service?: "SERVICE_UNSPECIFIED" | "DATAPROC" | (string & {});
  /** The number of retries. */
  retries?: number;
  /** The reference to the job within the service. */
  serviceJob?: string;
  /** The type of the job. */
  type?: "TYPE_UNSPECIFIED" | "SPARK" | "NOTEBOOK" | (string & {});
  /** The log message. */
  message?: string;
  /** The time when the job started running. */
  startTime?: string;
  /** The job state on completion. */
  state?: "STATE_UNSPECIFIED" | "SUCCEEDED" | "FAILED" | "CANCELLED" | "ABORTED" | (string & {});
  /** Job execution trigger. */
  executionTrigger?: "EXECUTION_TRIGGER_UNSPECIFIED" | "TASK_CONFIG" | "RUN_REQUEST" | (string & {});
}

export const GoogleCloudDataplexV1JobEvent: Schema.Schema<GoogleCloudDataplexV1JobEvent> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  jobId: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  retries: Schema.optional(Schema.Number),
  serviceJob: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  message: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  executionTrigger: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1JobEvent" }) as any as Schema.Schema<GoogleCloudDataplexV1JobEvent>;

export interface GoogleCloudDataplexV1MetadataJobExportJobResult {
  /** Output only. The number of entries that were exported. */
  exportedEntries?: string;
  /** Output only. The error message if the metadata export job failed. */
  errorMessage?: string;
}

export const GoogleCloudDataplexV1MetadataJobExportJobResult: Schema.Schema<GoogleCloudDataplexV1MetadataJobExportJobResult> = Schema.suspend(() => Schema.Struct({
  exportedEntries: Schema.optional(Schema.String),
  errorMessage: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1MetadataJobExportJobResult" }) as any as Schema.Schema<GoogleCloudDataplexV1MetadataJobExportJobResult>;

export interface GoogleCloudDataplexV1MetadataJobImportJobSpec {
  /** Required. A boundary on the scope of impact that the metadata import job can have. */
  scope?: GoogleCloudDataplexV1MetadataJobImportJobSpecImportJobScope;
  /** Optional. The level of logs to write to Cloud Logging for this job.Debug-level logs provide highly-detailed information for troubleshooting, but their increased verbosity could incur additional costs (https://cloud.google.com/stackdriver/pricing) that might not be merited for all jobs.If unspecified, defaults to INFO. */
  logLevel?: "LOG_LEVEL_UNSPECIFIED" | "DEBUG" | "INFO" | (string & {});
  /** Required. The sync mode for entries. */
  entrySyncMode?: "SYNC_MODE_UNSPECIFIED" | "FULL" | "INCREMENTAL" | "NONE" | (string & {});
  /** Optional. The URI of a Cloud Storage bucket or folder (beginning with gs:// and ending with /) that contains the metadata import files for this job.A metadata import file defines the values to set for each of the entries and aspects in a metadata import job. For more information about how to create a metadata import file and the file requirements, see Metadata import file (https://cloud.google.com/dataplex/docs/import-metadata#metadata-import-file).You can provide multiple metadata import files in the same metadata job. The bucket or folder must contain at least one metadata import file, in JSON Lines format (either .json or .jsonl file extension).In FULL entry sync mode, don't save the metadata import file in a folder named SOURCE_STORAGE_URI/deletions/.Caution: If the metadata import file contains no data, all entries and aspects that belong to the job's scope are deleted. */
  sourceStorageUri?: string;
  /** Required. The sync mode for aspects. */
  aspectSyncMode?: "SYNC_MODE_UNSPECIFIED" | "FULL" | "INCREMENTAL" | "NONE" | (string & {});
  /** Optional. The time when the process that created the metadata import files began. */
  sourceCreateTime?: string;
}

export const GoogleCloudDataplexV1MetadataJobImportJobSpec: Schema.Schema<GoogleCloudDataplexV1MetadataJobImportJobSpec> = Schema.suspend(() => Schema.Struct({
  scope: Schema.optional(GoogleCloudDataplexV1MetadataJobImportJobSpecImportJobScope),
  logLevel: Schema.optional(Schema.String),
  entrySyncMode: Schema.optional(Schema.String),
  sourceStorageUri: Schema.optional(Schema.String),
  aspectSyncMode: Schema.optional(Schema.String),
  sourceCreateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1MetadataJobImportJobSpec" }) as any as Schema.Schema<GoogleCloudDataplexV1MetadataJobImportJobSpec>;

export interface GoogleCloudDataplexV1MetadataJob {
  /** Output only. Identifier. The name of the resource that the configuration is applied to, in the format projects/{project_number}/locations/{location_id}/metadataJobs/{metadata_job_id}. */
  name?: string;
  /** Output only. The time when the metadata job was updated. */
  updateTime?: string;
  /** Optional. User-defined labels. */
  labels?: Record<string, string>;
  /** Output only. Import job result. */
  importResult?: GoogleCloudDataplexV1MetadataJobImportJobResult;
  /** Output only. A system-generated, globally unique ID for the metadata job. If the metadata job is deleted and then re-created with the same name, this ID is different. */
  uid?: string;
  /** Output only. Export job result. */
  exportResult?: GoogleCloudDataplexV1MetadataJobExportJobResult;
  /** Output only. The time when the metadata job was created. */
  createTime?: string;
  /** Import job specification. */
  importSpec?: GoogleCloudDataplexV1MetadataJobImportJobSpec;
  /** Output only. Metadata job status. */
  status?: GoogleCloudDataplexV1MetadataJobStatus;
  /** Required. Metadata job type. */
  type?: "TYPE_UNSPECIFIED" | "IMPORT" | "EXPORT" | (string & {});
  /** Export job specification. */
  exportSpec?: GoogleCloudDataplexV1MetadataJobExportJobSpec;
}

export const GoogleCloudDataplexV1MetadataJob: Schema.Schema<GoogleCloudDataplexV1MetadataJob> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  importResult: Schema.optional(GoogleCloudDataplexV1MetadataJobImportJobResult),
  uid: Schema.optional(Schema.String),
  exportResult: Schema.optional(GoogleCloudDataplexV1MetadataJobExportJobResult),
  createTime: Schema.optional(Schema.String),
  importSpec: Schema.optional(GoogleCloudDataplexV1MetadataJobImportJobSpec),
  status: Schema.optional(GoogleCloudDataplexV1MetadataJobStatus),
  type: Schema.optional(Schema.String),
  exportSpec: Schema.optional(GoogleCloudDataplexV1MetadataJobExportJobSpec),
})).annotate({ identifier: "GoogleCloudDataplexV1MetadataJob" }) as any as Schema.Schema<GoogleCloudDataplexV1MetadataJob>;

export interface GoogleIamV1TestIamPermissionsResponse {
  /** A subset of TestPermissionsRequest.permissions that the caller is allowed. */
  permissions?: Array<string>;
}

export const GoogleIamV1TestIamPermissionsResponse: Schema.Schema<GoogleIamV1TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleIamV1TestIamPermissionsResponse" }) as any as Schema.Schema<GoogleIamV1TestIamPermissionsResponse>;

export interface GoogleCloudDataplexV1ListMetadataJobsResponse {
  /** Locations that the service couldn't reach. */
  unreachableLocations?: Array<string>;
  /** A token to retrieve the next page of results. If there are no more results in the list, the value is empty. */
  nextPageToken?: string;
  /** Metadata jobs under the specified parent location. */
  metadataJobs?: Array<GoogleCloudDataplexV1MetadataJob>;
}

export const GoogleCloudDataplexV1ListMetadataJobsResponse: Schema.Schema<GoogleCloudDataplexV1ListMetadataJobsResponse> = Schema.suspend(() => Schema.Struct({
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
  metadataJobs: Schema.optional(Schema.Array(GoogleCloudDataplexV1MetadataJob)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListMetadataJobsResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListMetadataJobsResponse>;

export interface GoogleCloudDataplexV1DataProductAccessGroup {
  /** Required. Unique identifier of the access group within the data product. User defined. Eg. "analyst", "developer", etc. */
  id?: string;
  /** Required. User friendly display name of the access group. Eg. "Analyst", "Developer", etc. */
  displayName?: string;
  /** Optional. Description of the access group. */
  description?: string;
  /** Required. The principal entity associated with this access group. */
  principal?: GoogleCloudDataplexV1DataProductPrincipal;
}

export const GoogleCloudDataplexV1DataProductAccessGroup: Schema.Schema<GoogleCloudDataplexV1DataProductAccessGroup> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  principal: Schema.optional(GoogleCloudDataplexV1DataProductPrincipal),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProductAccessGroup" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProductAccessGroup>;

export interface GoogleCloudDataplexV1ImportItem {
  /** The fields to update, in paths that are relative to the Entry resource. Separate each field with a comma.In FULL entry sync mode, Dataplex Universal Catalog includes the paths of all of the fields for an entry that can be modified, including aspects. This means that Dataplex Universal Catalog replaces the existing entry with the entry in the metadata import file. All modifiable fields are updated, regardless of the fields that are listed in the update mask, and regardless of whether a field is present in the entry object.The update_mask field is ignored when an entry is created or re-created.In an aspect-only metadata job (when entry sync mode is NONE), set this value to aspects.Dataplex Universal Catalog also determines which entries and aspects to modify by comparing the values and timestamps that you provide in the metadata import file with the values and timestamps that exist in your project. For more information, see Comparison logic (https://cloud.google.com/dataplex/docs/import-metadata#data-modification-logic). */
  updateMask?: string;
  /** The aspects to modify. Supports the following syntaxes: {aspect_type_reference}: matches aspects that belong to the specified aspect type and are attached directly to the entry. {aspect_type_reference}@{path}: matches aspects that belong to the specified aspect type and path. {aspect_type_reference}@* : matches aspects of the given type for all paths. *@path : matches aspects of all types on the given path.Replace {aspect_type_reference} with a reference to the aspect type, in the format {project_id_or_number}.{location_id}.{aspect_type_id}.In FULL entry sync mode, if you leave this field empty, it is treated as specifying exactly those aspects that are present within the specified entry. Dataplex Universal Catalog implicitly adds the keys for all of the required aspects of an entry. */
  aspectKeys?: Array<string>;
  /** Information about an entry and its attached aspects. */
  entry?: GoogleCloudDataplexV1Entry;
  /** Information about the entry link. User should provide either one of the entry or entry_link. While providing entry_link, user should not provide update_mask and aspect_keys. */
  entryLink?: GoogleCloudDataplexV1EntryLink;
}

export const GoogleCloudDataplexV1ImportItem: Schema.Schema<GoogleCloudDataplexV1ImportItem> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  aspectKeys: Schema.optional(Schema.Array(Schema.String)),
  entry: Schema.optional(GoogleCloudDataplexV1Entry),
  entryLink: Schema.optional(GoogleCloudDataplexV1EntryLink),
})).annotate({ identifier: "GoogleCloudDataplexV1ImportItem" }) as any as Schema.Schema<GoogleCloudDataplexV1ImportItem>;

export interface GoogleCloudDataplexV1CancelMetadataJobRequest {
}

export const GoogleCloudDataplexV1CancelMetadataJobRequest: Schema.Schema<GoogleCloudDataplexV1CancelMetadataJobRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDataplexV1CancelMetadataJobRequest" }) as any as Schema.Schema<GoogleCloudDataplexV1CancelMetadataJobRequest>;

export interface GoogleCloudDataplexV1ListDataScanJobsResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** DataScanJobs (BASIC view only) under a given dataScan. */
  dataScanJobs?: Array<GoogleCloudDataplexV1DataScanJob>;
}

export const GoogleCloudDataplexV1ListDataScanJobsResponse: Schema.Schema<GoogleCloudDataplexV1ListDataScanJobsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  dataScanJobs: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataScanJob)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListDataScanJobsResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListDataScanJobsResponse>;

export interface GoogleCloudDataplexV1GenerateDataQualityRulesResponse {
  /** The data quality rules that Dataplex Universal Catalog generates based on the results of a data profiling scan. */
  rule?: Array<GoogleCloudDataplexV1DataQualityRule>;
}

export const GoogleCloudDataplexV1GenerateDataQualityRulesResponse: Schema.Schema<GoogleCloudDataplexV1GenerateDataQualityRulesResponse> = Schema.suspend(() => Schema.Struct({
  rule: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataQualityRule)),
})).annotate({ identifier: "GoogleCloudDataplexV1GenerateDataQualityRulesResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1GenerateDataQualityRulesResponse>;

export interface GoogleCloudDataplexV1TaskTriggerSpec {
  /** Optional. The first run of the task will be after this time. If not specified, the task will run shortly after being submitted if ON_DEMAND and based on the schedule if RECURRING. */
  startTime?: string;
  /** Required. Immutable. Trigger type of the user-specified Task. */
  type?: "TYPE_UNSPECIFIED" | "ON_DEMAND" | "RECURRING" | (string & {});
  /** Optional. Cron schedule (https://en.wikipedia.org/wiki/Cron) for running tasks periodically. To explicitly set a timezone to the cron tab, apply a prefix in the cron tab: "CRON_TZ=${IANA_TIME_ZONE}" or "TZ=${IANA_TIME_ZONE}". The ${IANA_TIME_ZONE} may only be a valid string from IANA time zone database. For example, CRON_TZ=America/New_York 1 * * * *, or TZ=America/New_York 1 * * * *. This field is required for RECURRING tasks. */
  schedule?: string;
  /** Optional. Prevent the task from executing. This does not cancel already running tasks. It is intended to temporarily disable RECURRING tasks. */
  disabled?: boolean;
  /** Optional. Number of retry attempts before aborting. Set to zero to never attempt to retry a failed task. */
  maxRetries?: number;
}

export const GoogleCloudDataplexV1TaskTriggerSpec: Schema.Schema<GoogleCloudDataplexV1TaskTriggerSpec> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  schedule: Schema.optional(Schema.String),
  disabled: Schema.optional(Schema.Boolean),
  maxRetries: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudDataplexV1TaskTriggerSpec" }) as any as Schema.Schema<GoogleCloudDataplexV1TaskTriggerSpec>;

export interface GoogleCloudDataplexV1Task {
  /** Output only. The relative resource name of the task, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/ tasks/{task_id}. */
  name?: string;
  /** Config related to running scheduled Notebooks. */
  notebook?: GoogleCloudDataplexV1TaskNotebookTaskConfig;
  /** Optional. Description of the task. */
  description?: string;
  /** Output only. The time when the task was created. */
  createTime?: string;
  /** Config related to running custom Spark tasks. */
  spark?: GoogleCloudDataplexV1TaskSparkTaskConfig;
  /** Optional. User-defined labels for the task. */
  labels?: Record<string, string>;
  /** Optional. User friendly display name. */
  displayName?: string;
  /** Output only. System generated globally unique ID for the task. This ID will be different if the task is deleted and re-created with the same name. */
  uid?: string;
  /** Output only. The time when the task was last updated. */
  updateTime?: string;
  /** Output only. Current state of the task. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "ACTION_REQUIRED" | (string & {});
  /** Output only. Status of the latest task executions. */
  executionStatus?: GoogleCloudDataplexV1TaskExecutionStatus;
  /** Required. Spec related to how often and when a task should be triggered. */
  triggerSpec?: GoogleCloudDataplexV1TaskTriggerSpec;
  /** Required. Spec related to how a task is executed. */
  executionSpec?: GoogleCloudDataplexV1TaskExecutionSpec;
}

export const GoogleCloudDataplexV1Task: Schema.Schema<GoogleCloudDataplexV1Task> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  notebook: Schema.optional(GoogleCloudDataplexV1TaskNotebookTaskConfig),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  spark: Schema.optional(GoogleCloudDataplexV1TaskSparkTaskConfig),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  displayName: Schema.optional(Schema.String),
  uid: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  executionStatus: Schema.optional(GoogleCloudDataplexV1TaskExecutionStatus),
  triggerSpec: Schema.optional(GoogleCloudDataplexV1TaskTriggerSpec),
  executionSpec: Schema.optional(GoogleCloudDataplexV1TaskExecutionSpec),
})).annotate({ identifier: "GoogleCloudDataplexV1Task" }) as any as Schema.Schema<GoogleCloudDataplexV1Task>;

export interface GoogleCloudDataplexV1DataScan {
  /** Output only. System generated globally unique ID for the scan. This ID will be different if the scan is deleted and re-created with the same name. */
  uid?: string;
  /** Optional. DataScan execution settings.If not specified, the fields in it will use their default values. */
  executionSpec?: GoogleCloudDataplexV1DataScanExecutionSpec;
  /** Output only. Status of the data scan execution. */
  executionStatus?: GoogleCloudDataplexV1DataScanExecutionStatus;
  /** Optional. User friendly display name. Must be between 1-256 characters. */
  displayName?: string;
  /** Settings for a data discovery scan. */
  dataDiscoverySpec?: GoogleCloudDataplexV1DataDiscoverySpec;
  /** Output only. The time when the scan was last updated. */
  updateTime?: string;
  /** Output only. The type of DataScan. */
  type?: "DATA_SCAN_TYPE_UNSPECIFIED" | "DATA_QUALITY" | "DATA_PROFILE" | "DATA_DISCOVERY" | "DATA_DOCUMENTATION" | (string & {});
  /** Output only. Identifier. The relative resource name of the scan, of the form: projects/{project}/locations/{location_id}/dataScans/{datascan_id}, where project refers to a project_id or project_number and location_id refers to a Google Cloud region. */
  name?: string;
  /** Output only. The time when the scan was created. */
  createTime?: string;
  /** Output only. The result of a data discovery scan. */
  dataDiscoveryResult?: GoogleCloudDataplexV1DataDiscoveryResult;
  /** Output only. The result of a data documentation scan. */
  dataDocumentationResult?: GoogleCloudDataplexV1DataDocumentationResult;
  /** Settings for a data quality scan. */
  dataQualitySpec?: GoogleCloudDataplexV1DataQualitySpec;
  /** Output only. The result of a data profile scan. */
  dataProfileResult?: GoogleCloudDataplexV1DataProfileResult;
  /** Output only. The result of a data quality scan. */
  dataQualityResult?: GoogleCloudDataplexV1DataQualityResult;
  /** Settings for a data documentation scan. */
  dataDocumentationSpec?: GoogleCloudDataplexV1DataDocumentationSpec;
  /** Optional. User-defined labels for the scan. */
  labels?: Record<string, string>;
  /** Settings for a data profile scan. */
  dataProfileSpec?: GoogleCloudDataplexV1DataProfileSpec;
  /** Optional. Description of the scan. Must be between 1-1024 characters. */
  description?: string;
  /** Required. The data source for DataScan. */
  data?: GoogleCloudDataplexV1DataSource;
  /** Output only. Current state of the DataScan. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | "CREATING" | "DELETING" | "ACTION_REQUIRED" | (string & {});
}

export const GoogleCloudDataplexV1DataScan: Schema.Schema<GoogleCloudDataplexV1DataScan> = Schema.suspend(() => Schema.Struct({
  uid: Schema.optional(Schema.String),
  executionSpec: Schema.optional(GoogleCloudDataplexV1DataScanExecutionSpec),
  executionStatus: Schema.optional(GoogleCloudDataplexV1DataScanExecutionStatus),
  displayName: Schema.optional(Schema.String),
  dataDiscoverySpec: Schema.optional(GoogleCloudDataplexV1DataDiscoverySpec),
  updateTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  dataDiscoveryResult: Schema.optional(GoogleCloudDataplexV1DataDiscoveryResult),
  dataDocumentationResult: Schema.optional(GoogleCloudDataplexV1DataDocumentationResult),
  dataQualitySpec: Schema.optional(GoogleCloudDataplexV1DataQualitySpec),
  dataProfileResult: Schema.optional(GoogleCloudDataplexV1DataProfileResult),
  dataQualityResult: Schema.optional(GoogleCloudDataplexV1DataQualityResult),
  dataDocumentationSpec: Schema.optional(GoogleCloudDataplexV1DataDocumentationSpec),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  dataProfileSpec: Schema.optional(GoogleCloudDataplexV1DataProfileSpec),
  description: Schema.optional(Schema.String),
  data: Schema.optional(GoogleCloudDataplexV1DataSource),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1DataScan" }) as any as Schema.Schema<GoogleCloudDataplexV1DataScan>;

export interface GoogleCloudDataplexV1ListDataScansResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** DataScans (BASIC view only) under the given parent location. */
  dataScans?: Array<GoogleCloudDataplexV1DataScan>;
  /** Locations that could not be reached. */
  unreachable?: Array<string>;
}

export const GoogleCloudDataplexV1ListDataScansResponse: Schema.Schema<GoogleCloudDataplexV1ListDataScansResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  dataScans: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataScan)),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListDataScansResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListDataScansResponse>;

export interface GoogleCloudDataplexV1DataProduct {
  /** Output only. The time at which the data product was last updated. */
  updateTime?: string;
  /** Required. User-friendly display name of the data product. */
  displayName?: string;
  /** Optional. Base64 encoded image representing the data product. Max Size: 3.0MiB Expected image dimensions are 512x512 pixels, however the API only performs validation on size of the encoded data. Note: For byte fields, the content of the fields are base64-encoded (which increases the size of the data by 33-36%) when using JSON on the wire. */
  icon?: string;
  /** Output only. Number of data assets associated with this data product. */
  assetCount?: number;
  /** Output only. System generated unique ID for the data product. This ID will be different if the data product is deleted and re-created with the same name. */
  uid?: string;
  /** Identifier. Resource name of the data product. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}. */
  name?: string;
  /** Optional. User-defined labels for the data product.Example: { "environment": "production", "billing": "marketing-department" } */
  labels?: Record<string, string>;
  /** Optional. Description of the data product. */
  description?: string;
  /** Output only. The time at which the data product was created. */
  createTime?: string;
  /** Optional. This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. */
  etag?: string;
  /** Optional. Data product access groups by access group id as key. If data product is used only for packaging data assets, then access groups may be empty. However, if a data product is used for sharing data assets, then at least one access group must be specified.Example: { "analyst": { "id": "analyst", "displayName": "Analyst", "description": "Access group for analysts", "principal": { "googleGroup": "analysts@example.com" } } } */
  accessGroups?: Record<string, GoogleCloudDataplexV1DataProductAccessGroup>;
  /** Required. Emails of the data product owners. */
  ownerEmails?: Array<string>;
}

export const GoogleCloudDataplexV1DataProduct: Schema.Schema<GoogleCloudDataplexV1DataProduct> = Schema.suspend(() => Schema.Struct({
  updateTime: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  icon: Schema.optional(Schema.String),
  assetCount: Schema.optional(Schema.Number),
  uid: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  description: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  etag: Schema.optional(Schema.String),
  accessGroups: Schema.optional(Schema.Record(Schema.String, GoogleCloudDataplexV1DataProductAccessGroup)),
  ownerEmails: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1DataProduct" }) as any as Schema.Schema<GoogleCloudDataplexV1DataProduct>;

export interface GoogleCloudDataplexV1ListEncryptionConfigsResponse {
  /** Locations that could not be reached. */
  unreachableLocations?: Array<string>;
  /** The list of EncryptionConfigs under the given parent location. */
  encryptionConfigs?: Array<GoogleCloudDataplexV1EncryptionConfig>;
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
}

export const GoogleCloudDataplexV1ListEncryptionConfigsResponse: Schema.Schema<GoogleCloudDataplexV1ListEncryptionConfigsResponse> = Schema.suspend(() => Schema.Struct({
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
  encryptionConfigs: Schema.optional(Schema.Array(GoogleCloudDataplexV1EncryptionConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ListEncryptionConfigsResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListEncryptionConfigsResponse>;

export interface GoogleCloudDataplexV1RunTaskResponse {
  /** Jobs created by RunTask API. */
  job?: GoogleCloudDataplexV1Job;
}

export const GoogleCloudDataplexV1RunTaskResponse: Schema.Schema<GoogleCloudDataplexV1RunTaskResponse> = Schema.suspend(() => Schema.Struct({
  job: Schema.optional(GoogleCloudDataplexV1Job),
})).annotate({ identifier: "GoogleCloudDataplexV1RunTaskResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1RunTaskResponse>;

export interface GoogleCloudDataplexV1ListTasksResponse {
  /** Token to retrieve the next page of results, or empty if there are no more results in the list. */
  nextPageToken?: string;
  /** Locations that could not be reached. */
  unreachableLocations?: Array<string>;
  /** Tasks under the given parent lake. */
  tasks?: Array<GoogleCloudDataplexV1Task>;
}

export const GoogleCloudDataplexV1ListTasksResponse: Schema.Schema<GoogleCloudDataplexV1ListTasksResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  unreachableLocations: Schema.optional(Schema.Array(Schema.String)),
  tasks: Schema.optional(Schema.Array(GoogleCloudDataplexV1Task)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListTasksResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListTasksResponse>;

export interface GoogleCloudDataplexV1ListDataProductsResponse {
  /** The data products for the requested filter criteria. */
  dataProducts?: Array<GoogleCloudDataplexV1DataProduct>;
  /** A token, which can be sent as page_token to retrieve the next page. If this field is empty, then there are no subsequent pages. */
  nextPageToken?: string;
  /** Unordered list. Locations that the service couldn't reach. */
  unreachable?: Array<string>;
}

export const GoogleCloudDataplexV1ListDataProductsResponse: Schema.Schema<GoogleCloudDataplexV1ListDataProductsResponse> = Schema.suspend(() => Schema.Struct({
  dataProducts: Schema.optional(Schema.Array(GoogleCloudDataplexV1DataProduct)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudDataplexV1ListDataProductsResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListDataProductsResponse>;

export interface GoogleCloudDataplexV1ListEntitiesResponse {
  /** Entities in the specified parent zone. */
  entities?: Array<GoogleCloudDataplexV1Entity>;
  /** Token to retrieve the next page of results, or empty if there are no remaining results in the list. */
  nextPageToken?: string;
}

export const GoogleCloudDataplexV1ListEntitiesResponse: Schema.Schema<GoogleCloudDataplexV1ListEntitiesResponse> = Schema.suspend(() => Schema.Struct({
  entities: Schema.optional(Schema.Array(GoogleCloudDataplexV1Entity)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudDataplexV1ListEntitiesResponse" }) as any as Schema.Schema<GoogleCloudDataplexV1ListEntitiesResponse>;

export interface GoogleCloudDataplexV1CancelJobRequest {
}

export const GoogleCloudDataplexV1CancelJobRequest: Schema.Schema<GoogleCloudDataplexV1CancelJobRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudDataplexV1CancelJobRequest" }) as any as Schema.Schema<GoogleCloudDataplexV1CancelJobRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Looks up an entry by name using the permission on the source system. */
export interface LookupEntryProjectsLocationsRequest {
  /** Optional. Limits the aspects returned to the provided aspect types. It only works for CUSTOM view. */
  aspectTypes?: string[];
  /** Optional. View to control which parts of an entry the service should return. */
  view?: "ENTRY_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | "CUSTOM" | "ALL" | (string & {});
  /** Required. The resource name of the Entry: projects/{project}/locations/{location}/entryGroups/{entry_group}/entries/{entry}. */
  entry?: string;
  /** Required. The project to which the request should be attributed in the following form: projects/{project}/locations/{location}. */
  name: string;
  /** Optional. Limits the aspects returned to those associated with the provided paths within the Entry. It only works for CUSTOM view. */
  paths?: string[];
}

export const LookupEntryProjectsLocationsRequest = Schema.Struct({
  aspectTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("aspectTypes")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  entry: Schema.optional(Schema.String).pipe(T.HttpQuery("entry")),
  name: Schema.String.pipe(T.HttpPath("name")),
  paths: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("paths")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}:lookupEntry" }),
  svc,
) as unknown as Schema.Schema<LookupEntryProjectsLocationsRequest>;

export type LookupEntryProjectsLocationsResponse = GoogleCloudDataplexV1Entry;
export const LookupEntryProjectsLocationsResponse = GoogleCloudDataplexV1Entry;

export type LookupEntryProjectsLocationsError = CommonErrors;

export const lookupEntryProjectsLocations: API.OperationMethod<LookupEntryProjectsLocationsRequest, LookupEntryProjectsLocationsResponse, LookupEntryProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupEntryProjectsLocationsRequest,
  output: LookupEntryProjectsLocationsResponse,
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

export type GetProjectsLocationsResponse = GoogleCloudLocationLocation;
export const GetProjectsLocationsResponse = GoogleCloudLocationLocation;

export type GetProjectsLocationsError = CommonErrors;

export const getProjectsLocations: API.OperationMethod<GetProjectsLocationsRequest, GetProjectsLocationsResponse, GetProjectsLocationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsRequest,
  output: GetProjectsLocationsResponse,
  errors: [],
}));

/** Searches for Entries matching the given query and scope. */
export interface SearchEntriesProjectsLocationsRequest {
  /** Optional. Specifies whether the search should understand the meaning and intent behind the query, rather than just matching keywords. */
  semanticSearch?: boolean;
  /** Optional. Specifies the ordering of results. Supported values are: relevance last_modified_timestamp last_modified_timestamp asc */
  orderBy?: string;
  /** Required. The project to which the request should be attributed in the following form: projects/{project}/locations/global. */
  name: string;
  /** Optional. Number of results in the search page. If <=0, then defaults to 10. Max limit for page_size is 1000. Throws an invalid argument for page_size > 1000. */
  pageSize?: number;
  /** Optional. Page token received from a previous SearchEntries call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. The scope under which the search should be operating. It must either be organizations/ or projects/. If it is unspecified, it defaults to the organization where the project provided in name is located. */
  scope?: string;
  /** Required. The query against which entries in scope should be matched. The query syntax is defined in Search syntax for Dataplex Universal Catalog (https://cloud.google.com/dataplex/docs/search-syntax). */
  query?: string;
}

export const SearchEntriesProjectsLocationsRequest = Schema.Struct({
  semanticSearch: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("semanticSearch")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  scope: Schema.optional(Schema.String).pipe(T.HttpQuery("scope")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}:searchEntries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchEntriesProjectsLocationsRequest>;

export type SearchEntriesProjectsLocationsResponse = GoogleCloudDataplexV1SearchEntriesResponse;
export const SearchEntriesProjectsLocationsResponse = GoogleCloudDataplexV1SearchEntriesResponse;

export type SearchEntriesProjectsLocationsError = CommonErrors;

export const searchEntriesProjectsLocations = API.makePaginated(() => ({
  input: SearchEntriesProjectsLocationsRequest,
  output: SearchEntriesProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Looks up Entry Links referencing the specified Entry. */
export interface LookupEntryLinksProjectsLocationsRequest {
  /** Entry link types to filter the response by. If empty, all entry link types will be returned. At most 10 entry link types can be specified. */
  entryLinkTypes?: string[];
  /** Mode of entry reference. */
  entryMode?: "ENTRY_MODE_UNSPECIFIED" | "SOURCE" | "TARGET" | (string & {});
  /** Required. The project to which the request should be attributed to Format: projects/{project_id_or_number}/locations/{location_id}. */
  name: string;
  /** Page token received from a previous LookupEntryLinks call. Provide this to retrieve the subsequent page. When paginating, all other parameters that are provided to the LookupEntryLinks request must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The resource name of the referred Entry. Format: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}. Entry Links which references this entry will be returned in the response. */
  entry?: string;
  /** Maximum number of EntryLinks to return. The service may return fewer than this value. If unspecified, at most 10 EntryLinks will be returned. The maximum value is 10; values above 10 will be coerced to 10. */
  pageSize?: number;
}

export const LookupEntryLinksProjectsLocationsRequest = Schema.Struct({
  entryLinkTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("entryLinkTypes")),
  entryMode: Schema.optional(Schema.String).pipe(T.HttpQuery("entryMode")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  entry: Schema.optional(Schema.String).pipe(T.HttpQuery("entry")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}:lookupEntryLinks" }),
  svc,
) as unknown as Schema.Schema<LookupEntryLinksProjectsLocationsRequest>;

export type LookupEntryLinksProjectsLocationsResponse = GoogleCloudDataplexV1LookupEntryLinksResponse;
export const LookupEntryLinksProjectsLocationsResponse = GoogleCloudDataplexV1LookupEntryLinksResponse;

export type LookupEntryLinksProjectsLocationsError = CommonErrors;

export const lookupEntryLinksProjectsLocations = API.makePaginated(() => ({
  input: LookupEntryLinksProjectsLocationsRequest,
  output: LookupEntryLinksProjectsLocationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists information about the supported locations for this service. This method can be called in two ways: List all public locations: Use the path GET /v1/locations. List project-visible locations: Use the path GET /v1/projects/{project_id}/locations. This may include public locations as well as private or other locations specifically visible to the project. */
export interface ListProjectsLocationsRequest {
  /** A filter to narrow down results to a preferred subset. The filtering language accepts strings like "displayName=tokyo", and is documented in more detail in AIP-160 (https://google.aip.dev/160). */
  filter?: string;
  /** The resource that owns the locations collection, if applicable. */
  name: string;
  /** Optional. Do not use this field. It is unsupported and is ignored unless explicitly documented otherwise. This is primarily for internal usage. */
  extraLocationTypes?: string[];
  /** The maximum number of results to return. If not set, the service selects a default. */
  pageSize?: number;
  /** A page token received from the next_page_token field in the response. Send that page token to receive the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  name: Schema.String.pipe(T.HttpPath("name")),
  extraLocationTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("extraLocationTypes")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsRequest>;

export type ListProjectsLocationsResponse = GoogleCloudLocationListLocationsResponse;
export const ListProjectsLocationsResponse = GoogleCloudLocationListLocationsResponse;

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

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsDataScansRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDataScansRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataScans/{dataScansId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDataScansRequest>;

export type SetIamPolicyProjectsLocationsDataScansResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsDataScansResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsDataScansError = CommonErrors;

export const setIamPolicyProjectsLocationsDataScans: API.OperationMethod<SetIamPolicyProjectsLocationsDataScansRequest, SetIamPolicyProjectsLocationsDataScansResponse, SetIamPolicyProjectsLocationsDataScansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDataScansRequest,
  output: SetIamPolicyProjectsLocationsDataScansResponse,
  errors: [],
}));

/** Gets a DataScan resource. */
export interface GetProjectsLocationsDataScansRequest {
  /** Optional. Select the DataScan view to return. Defaults to BASIC. */
  view?: "DATA_SCAN_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Required. The resource name of the dataScan: projects/{project}/locations/{location_id}/dataScans/{data_scan_id} where project refers to a project_id or project_number and location_id refers to a Google Cloud region. */
  name: string;
}

export const GetProjectsLocationsDataScansRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataScans/{dataScansId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDataScansRequest>;

export type GetProjectsLocationsDataScansResponse = GoogleCloudDataplexV1DataScan;
export const GetProjectsLocationsDataScansResponse = GoogleCloudDataplexV1DataScan;

export type GetProjectsLocationsDataScansError = CommonErrors;

export const getProjectsLocationsDataScans: API.OperationMethod<GetProjectsLocationsDataScansRequest, GetProjectsLocationsDataScansResponse, GetProjectsLocationsDataScansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDataScansRequest,
  output: GetProjectsLocationsDataScansResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsDataScansRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDataScansRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataScans/{dataScansId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDataScansRequest>;

export type TestIamPermissionsProjectsLocationsDataScansResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDataScansResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDataScansError = CommonErrors;

export const testIamPermissionsProjectsLocationsDataScans: API.OperationMethod<TestIamPermissionsProjectsLocationsDataScansRequest, TestIamPermissionsProjectsLocationsDataScansResponse, TestIamPermissionsProjectsLocationsDataScansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDataScansRequest,
  output: TestIamPermissionsProjectsLocationsDataScansResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsDataScansRequest {
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsDataScansRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataScans/{dataScansId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDataScansRequest>;

export type GetIamPolicyProjectsLocationsDataScansResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsDataScansResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsDataScansError = CommonErrors;

export const getIamPolicyProjectsLocationsDataScans: API.OperationMethod<GetIamPolicyProjectsLocationsDataScansRequest, GetIamPolicyProjectsLocationsDataScansResponse, GetIamPolicyProjectsLocationsDataScansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDataScansRequest,
  output: GetIamPolicyProjectsLocationsDataScansResponse,
  errors: [],
}));

/** Updates a DataScan resource. */
export interface PatchProjectsLocationsDataScansRequest {
  /** Optional. Mask of fields to update. */
  updateMask?: string;
  /** Output only. Identifier. The relative resource name of the scan, of the form: projects/{project}/locations/{location_id}/dataScans/{datascan_id}, where project refers to a project_id or project_number and location_id refers to a Google Cloud region. */
  name: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1DataScan;
}

export const PatchProjectsLocationsDataScansRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1DataScan).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/dataScans/{dataScansId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDataScansRequest>;

export type PatchProjectsLocationsDataScansResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsDataScansResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsDataScansError = CommonErrors;

export const patchProjectsLocationsDataScans: API.OperationMethod<PatchProjectsLocationsDataScansRequest, PatchProjectsLocationsDataScansResponse, PatchProjectsLocationsDataScansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDataScansRequest,
  output: PatchProjectsLocationsDataScansResponse,
  errors: [],
}));

/** Deletes a DataScan resource. */
export interface DeleteProjectsLocationsDataScansRequest {
  /** Optional. If set to true, any child resources of this data scan will also be deleted. (Otherwise, the request will only work if the data scan has no child resources.) */
  force?: boolean;
  /** Required. The resource name of the dataScan: projects/{project}/locations/{location_id}/dataScans/{data_scan_id} where project refers to a project_id or project_number and location_id refers to a Google Cloud region. */
  name: string;
}

export const DeleteProjectsLocationsDataScansRequest = Schema.Struct({
  force: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("force")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/dataScans/{dataScansId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDataScansRequest>;

export type DeleteProjectsLocationsDataScansResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsDataScansResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsDataScansError = CommonErrors;

export const deleteProjectsLocationsDataScans: API.OperationMethod<DeleteProjectsLocationsDataScansRequest, DeleteProjectsLocationsDataScansResponse, DeleteProjectsLocationsDataScansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDataScansRequest,
  output: DeleteProjectsLocationsDataScansResponse,
  errors: [],
}));

/** Generates recommended data quality rules based on the results of a data profiling scan.Use the recommendations to build rules for a data quality scan. */
export interface GenerateDataQualityRulesProjectsLocationsDataScansRequest {
  /** Required. The name must be one of the following: The name of a data scan with at least one successful, completed data profiling job The name of a successful, completed data profiling job (a data scan job where the job type is data profiling) */
  name: string;
  /** Request body */
  body?: GoogleCloudDataplexV1GenerateDataQualityRulesRequest;
}

export const GenerateDataQualityRulesProjectsLocationsDataScansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDataplexV1GenerateDataQualityRulesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataScans/{dataScansId}:generateDataQualityRules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateDataQualityRulesProjectsLocationsDataScansRequest>;

export type GenerateDataQualityRulesProjectsLocationsDataScansResponse = GoogleCloudDataplexV1GenerateDataQualityRulesResponse;
export const GenerateDataQualityRulesProjectsLocationsDataScansResponse = GoogleCloudDataplexV1GenerateDataQualityRulesResponse;

export type GenerateDataQualityRulesProjectsLocationsDataScansError = CommonErrors;

export const generateDataQualityRulesProjectsLocationsDataScans: API.OperationMethod<GenerateDataQualityRulesProjectsLocationsDataScansRequest, GenerateDataQualityRulesProjectsLocationsDataScansResponse, GenerateDataQualityRulesProjectsLocationsDataScansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateDataQualityRulesProjectsLocationsDataScansRequest,
  output: GenerateDataQualityRulesProjectsLocationsDataScansResponse,
  errors: [],
}));

/** Runs an on-demand execution of a DataScan */
export interface RunProjectsLocationsDataScansRequest {
  /** Required. The resource name of the DataScan: projects/{project}/locations/{location_id}/dataScans/{data_scan_id}. where project refers to a project_id or project_number and location_id refers to a Google Cloud region.Only OnDemand data scans are allowed. */
  name: string;
  /** Request body */
  body?: GoogleCloudDataplexV1RunDataScanRequest;
}

export const RunProjectsLocationsDataScansRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDataplexV1RunDataScanRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataScans/{dataScansId}:run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunProjectsLocationsDataScansRequest>;

export type RunProjectsLocationsDataScansResponse = GoogleCloudDataplexV1RunDataScanResponse;
export const RunProjectsLocationsDataScansResponse = GoogleCloudDataplexV1RunDataScanResponse;

export type RunProjectsLocationsDataScansError = CommonErrors;

export const runProjectsLocationsDataScans: API.OperationMethod<RunProjectsLocationsDataScansRequest, RunProjectsLocationsDataScansResponse, RunProjectsLocationsDataScansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunProjectsLocationsDataScansRequest,
  output: RunProjectsLocationsDataScansResponse,
  errors: [],
}));

/** Creates a DataScan resource. */
export interface CreateProjectsLocationsDataScansRequest {
  /** Required. The resource name of the parent location: projects/{project}/locations/{location_id} where project refers to a project_id or project_number and location_id refers to a Google Cloud region. */
  parent: string;
  /** Required. DataScan identifier. Must contain only lowercase letters, numbers and hyphens. Must start with a letter. Must end with a number or a letter. Must be between 1-63 characters. Must be unique within the customer project / location. */
  dataScanId?: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1DataScan;
}

export const CreateProjectsLocationsDataScansRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dataScanId: Schema.optional(Schema.String).pipe(T.HttpQuery("dataScanId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1DataScan).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataScans", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDataScansRequest>;

export type CreateProjectsLocationsDataScansResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsDataScansResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsDataScansError = CommonErrors;

export const createProjectsLocationsDataScans: API.OperationMethod<CreateProjectsLocationsDataScansRequest, CreateProjectsLocationsDataScansResponse, CreateProjectsLocationsDataScansError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDataScansRequest,
  output: CreateProjectsLocationsDataScansResponse,
  errors: [],
}));

/** Lists DataScans. */
export interface ListProjectsLocationsDataScansRequest {
  /** Optional. Order by fields (name or create_time) for the result. If not specified, the ordering is undefined. */
  orderBy?: string;
  /** Optional. Filter request. */
  filter?: string;
  /** Optional. Page token received from a previous ListDataScans call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListDataScans must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Maximum number of dataScans to return. The service may return fewer than this value. If unspecified, at most 500 scans will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. The resource name of the parent location: projects/{project}/locations/{location_id} where project refers to a project_id or project_number and location_id refers to a Google Cloud region. */
  parent: string;
}

export const ListProjectsLocationsDataScansRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataScans" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDataScansRequest>;

export type ListProjectsLocationsDataScansResponse = GoogleCloudDataplexV1ListDataScansResponse;
export const ListProjectsLocationsDataScansResponse = GoogleCloudDataplexV1ListDataScansResponse;

export type ListProjectsLocationsDataScansError = CommonErrors;

export const listProjectsLocationsDataScans = API.makePaginated(() => ({
  input: ListProjectsLocationsDataScansRequest,
  output: ListProjectsLocationsDataScansResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Generates recommended data quality rules based on the results of a data profiling scan.Use the recommendations to build rules for a data quality scan. */
export interface GenerateDataQualityRulesProjectsLocationsDataScansJobsRequest {
  /** Required. The name must be one of the following: The name of a data scan with at least one successful, completed data profiling job The name of a successful, completed data profiling job (a data scan job where the job type is data profiling) */
  name: string;
  /** Request body */
  body?: GoogleCloudDataplexV1GenerateDataQualityRulesRequest;
}

export const GenerateDataQualityRulesProjectsLocationsDataScansJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDataplexV1GenerateDataQualityRulesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataScans/{dataScansId}/jobs/{jobsId}:generateDataQualityRules", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GenerateDataQualityRulesProjectsLocationsDataScansJobsRequest>;

export type GenerateDataQualityRulesProjectsLocationsDataScansJobsResponse = GoogleCloudDataplexV1GenerateDataQualityRulesResponse;
export const GenerateDataQualityRulesProjectsLocationsDataScansJobsResponse = GoogleCloudDataplexV1GenerateDataQualityRulesResponse;

export type GenerateDataQualityRulesProjectsLocationsDataScansJobsError = CommonErrors;

export const generateDataQualityRulesProjectsLocationsDataScansJobs: API.OperationMethod<GenerateDataQualityRulesProjectsLocationsDataScansJobsRequest, GenerateDataQualityRulesProjectsLocationsDataScansJobsResponse, GenerateDataQualityRulesProjectsLocationsDataScansJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GenerateDataQualityRulesProjectsLocationsDataScansJobsRequest,
  output: GenerateDataQualityRulesProjectsLocationsDataScansJobsResponse,
  errors: [],
}));

/** Lists DataScanJobs under the given DataScan. */
export interface ListProjectsLocationsDataScansJobsRequest {
  /** Optional. Maximum number of DataScanJobs to return. The service may return fewer than this value. If unspecified, at most 10 DataScanJobs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Page token received from a previous ListDataScanJobs call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListDataScanJobs must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. An expression for filtering the results of the ListDataScanJobs request.If unspecified, all datascan jobs will be returned. Multiple filters can be applied (with AND, OR logical operators). Filters are case-sensitive.Allowed fields are: start_time end_timestart_time and end_time expect RFC-3339 formatted strings (e.g. 2018-10-08T18:30:00-07:00).For instance, 'start_time > 2018-10-08T00:00:00.123456789Z AND end_time < 2018-10-09T00:00:00.123456789Z' limits results to DataScanJobs between specified start and end times. */
  filter?: string;
  /** Required. The resource name of the parent environment: projects/{project}/locations/{location_id}/dataScans/{data_scan_id} where project refers to a project_id or project_number and location_id refers to a Google Cloud region. */
  parent: string;
}

export const ListProjectsLocationsDataScansJobsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataScans/{dataScansId}/jobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDataScansJobsRequest>;

export type ListProjectsLocationsDataScansJobsResponse = GoogleCloudDataplexV1ListDataScanJobsResponse;
export const ListProjectsLocationsDataScansJobsResponse = GoogleCloudDataplexV1ListDataScanJobsResponse;

export type ListProjectsLocationsDataScansJobsError = CommonErrors;

export const listProjectsLocationsDataScansJobs = API.makePaginated(() => ({
  input: ListProjectsLocationsDataScansJobsRequest,
  output: ListProjectsLocationsDataScansJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a DataScanJob resource. */
export interface GetProjectsLocationsDataScansJobsRequest {
  /** Optional. Select the DataScanJob view to return. Defaults to BASIC. */
  view?: "DATA_SCAN_JOB_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
  /** Required. The resource name of the DataScanJob: projects/{project}/locations/{location_id}/dataScans/{data_scan_id}/jobs/{data_scan_job_id} where project refers to a project_id or project_number and location_id refers to a Google Cloud region. */
  name: string;
}

export const GetProjectsLocationsDataScansJobsRequest = Schema.Struct({
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataScans/{dataScansId}/jobs/{jobsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDataScansJobsRequest>;

export type GetProjectsLocationsDataScansJobsResponse = GoogleCloudDataplexV1DataScanJob;
export const GetProjectsLocationsDataScansJobsResponse = GoogleCloudDataplexV1DataScanJob;

export type GetProjectsLocationsDataScansJobsError = CommonErrors;

export const getProjectsLocationsDataScansJobs: API.OperationMethod<GetProjectsLocationsDataScansJobsRequest, GetProjectsLocationsDataScansJobsResponse, GetProjectsLocationsDataScansJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDataScansJobsRequest,
  output: GetProjectsLocationsDataScansJobsResponse,
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

export type GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsOperationsError = CommonErrors;

export const getProjectsLocationsOperations: API.OperationMethod<GetProjectsLocationsOperationsRequest, GetProjectsLocationsOperationsResponse, GetProjectsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsOperationsRequest,
  output: GetProjectsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED. */
export interface CancelProjectsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: GoogleLongrunningCancelOperationRequest;
}

export const CancelProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleLongrunningCancelOperationRequest).pipe(T.HttpBody()),
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

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. */
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

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED. */
export interface ListProjectsLocationsOperationsRequest {
  /** The standard list filter. */
  filter?: string;
  /** When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list page token. */
  pageToken?: string;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsOperationsRequest>;

export type ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;

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

/** Updates a Glossary resource. */
export interface PatchProjectsLocationsGlossariesRequest {
  /** Output only. Identifier. The resource name of the Glossary. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} */
  name: string;
  /** Optional. Validates the request without actually updating the Glossary. Default: false. */
  validateOnly?: boolean;
  /** Required. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1Glossary;
}

export const PatchProjectsLocationsGlossariesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDataplexV1Glossary).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGlossariesRequest>;

export type PatchProjectsLocationsGlossariesResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsGlossariesResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsGlossariesError = CommonErrors;

export const patchProjectsLocationsGlossaries: API.OperationMethod<PatchProjectsLocationsGlossariesRequest, PatchProjectsLocationsGlossariesResponse, PatchProjectsLocationsGlossariesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsGlossariesRequest,
  output: PatchProjectsLocationsGlossariesResponse,
  errors: [],
}));

/** Lists Glossary resources in a project and location. */
export interface ListProjectsLocationsGlossariesRequest {
  /** Optional. Filter expression that filters Glossaries listed in the response. Filters on proto fields of Glossary are supported. Examples of using a filter are: - display_name="my-glossary" - categoryCount=1 - termCount=0 */
  filter?: string;
  /** Optional. A page token, received from a previous ListGlossaries call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListGlossaries must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The maximum number of Glossaries to return. The service may return fewer than this value. If unspecified, at most 50 Glossaries will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Order by expression that orders Glossaries listed in the response. Order by fields are: name or create_time for the result. If not specified, the ordering is undefined. */
  orderBy?: string;
  /** Required. The parent, which has this collection of Glossaries. Format: projects/{project_id_or_number}/locations/{location_id} where location_id refers to a Google Cloud region. */
  parent: string;
}

export const ListProjectsLocationsGlossariesRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlossariesRequest>;

export type ListProjectsLocationsGlossariesResponse = GoogleCloudDataplexV1ListGlossariesResponse;
export const ListProjectsLocationsGlossariesResponse = GoogleCloudDataplexV1ListGlossariesResponse;

export type ListProjectsLocationsGlossariesError = CommonErrors;

export const listProjectsLocationsGlossaries = API.makePaginated(() => ({
  input: ListProjectsLocationsGlossariesRequest,
  output: ListProjectsLocationsGlossariesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsGlossariesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsGlossariesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsGlossariesRequest>;

export type SetIamPolicyProjectsLocationsGlossariesResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsGlossariesResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsGlossariesError = CommonErrors;

export const setIamPolicyProjectsLocationsGlossaries: API.OperationMethod<SetIamPolicyProjectsLocationsGlossariesRequest, SetIamPolicyProjectsLocationsGlossariesResponse, SetIamPolicyProjectsLocationsGlossariesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsGlossariesRequest,
  output: SetIamPolicyProjectsLocationsGlossariesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsGlossariesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsGlossariesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsGlossariesRequest>;

export type TestIamPermissionsProjectsLocationsGlossariesResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsGlossariesResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsGlossariesError = CommonErrors;

export const testIamPermissionsProjectsLocationsGlossaries: API.OperationMethod<TestIamPermissionsProjectsLocationsGlossariesRequest, TestIamPermissionsProjectsLocationsGlossariesResponse, TestIamPermissionsProjectsLocationsGlossariesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsGlossariesRequest,
  output: TestIamPermissionsProjectsLocationsGlossariesResponse,
  errors: [],
}));

/** Gets a Glossary resource. */
export interface GetProjectsLocationsGlossariesRequest {
  /** Required. The name of the Glossary to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} */
  name: string;
}

export const GetProjectsLocationsGlossariesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlossariesRequest>;

export type GetProjectsLocationsGlossariesResponse = GoogleCloudDataplexV1Glossary;
export const GetProjectsLocationsGlossariesResponse = GoogleCloudDataplexV1Glossary;

export type GetProjectsLocationsGlossariesError = CommonErrors;

export const getProjectsLocationsGlossaries: API.OperationMethod<GetProjectsLocationsGlossariesRequest, GetProjectsLocationsGlossariesResponse, GetProjectsLocationsGlossariesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGlossariesRequest,
  output: GetProjectsLocationsGlossariesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsGlossariesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsGlossariesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsGlossariesRequest>;

export type GetIamPolicyProjectsLocationsGlossariesResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsGlossariesResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsGlossariesError = CommonErrors;

export const getIamPolicyProjectsLocationsGlossaries: API.OperationMethod<GetIamPolicyProjectsLocationsGlossariesRequest, GetIamPolicyProjectsLocationsGlossariesResponse, GetIamPolicyProjectsLocationsGlossariesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsGlossariesRequest,
  output: GetIamPolicyProjectsLocationsGlossariesResponse,
  errors: [],
}));

/** Creates a new Glossary resource. */
export interface CreateProjectsLocationsGlossariesRequest {
  /** Required. The parent resource where this Glossary will be created. Format: projects/{project_id_or_number}/locations/{location_id} where location_id refers to a Google Cloud region. */
  parent: string;
  /** Optional. Validates the request without actually creating the Glossary. Default: false. */
  validateOnly?: boolean;
  /** Required. Glossary ID: Glossary identifier. */
  glossaryId?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1Glossary;
}

export const CreateProjectsLocationsGlossariesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  glossaryId: Schema.optional(Schema.String).pipe(T.HttpQuery("glossaryId")),
  body: Schema.optional(GoogleCloudDataplexV1Glossary).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGlossariesRequest>;

export type CreateProjectsLocationsGlossariesResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsGlossariesResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsGlossariesError = CommonErrors;

export const createProjectsLocationsGlossaries: API.OperationMethod<CreateProjectsLocationsGlossariesRequest, CreateProjectsLocationsGlossariesResponse, CreateProjectsLocationsGlossariesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGlossariesRequest,
  output: CreateProjectsLocationsGlossariesResponse,
  errors: [],
}));

/** Deletes a Glossary resource. All the categories and terms within the Glossary must be deleted before the Glossary can be deleted. */
export interface DeleteProjectsLocationsGlossariesRequest {
  /** Required. The name of the Glossary to delete. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} */
  name: string;
  /** Optional. The etag of the Glossary. If this is provided, it must match the server's etag. If the etag is provided and does not match the server-computed etag, the request must fail with a ABORTED error code. */
  etag?: string;
}

export const DeleteProjectsLocationsGlossariesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGlossariesRequest>;

export type DeleteProjectsLocationsGlossariesResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsGlossariesResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsGlossariesError = CommonErrors;

export const deleteProjectsLocationsGlossaries: API.OperationMethod<DeleteProjectsLocationsGlossariesRequest, DeleteProjectsLocationsGlossariesResponse, DeleteProjectsLocationsGlossariesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGlossariesRequest,
  output: DeleteProjectsLocationsGlossariesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsGlossariesCategoriesRequest {
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsGlossariesCategoriesRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/categories/{categoriesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsGlossariesCategoriesRequest>;

export type GetIamPolicyProjectsLocationsGlossariesCategoriesResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsGlossariesCategoriesResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsGlossariesCategoriesError = CommonErrors;

export const getIamPolicyProjectsLocationsGlossariesCategories: API.OperationMethod<GetIamPolicyProjectsLocationsGlossariesCategoriesRequest, GetIamPolicyProjectsLocationsGlossariesCategoriesResponse, GetIamPolicyProjectsLocationsGlossariesCategoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsGlossariesCategoriesRequest,
  output: GetIamPolicyProjectsLocationsGlossariesCategoriesResponse,
  errors: [],
}));

/** Lists GlossaryCategory resources in a Glossary. */
export interface ListProjectsLocationsGlossariesCategoriesRequest {
  /** Optional. A page token, received from a previous ListGlossaryCategories call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListGlossaryCategories must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The parent, which has this collection of GlossaryCategories. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} Location is the Google Cloud region. */
  parent: string;
  /** Optional. Filter expression that filters GlossaryCategories listed in the response. Filters are supported on the following fields: - immediate_parentExamples of using a filter are: - immediate_parent="projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}" - immediate_parent="projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}"This will only return the GlossaryCategories that are directly nested under the specified parent. */
  filter?: string;
  /** Optional. The maximum number of GlossaryCategories to return. The service may return fewer than this value. If unspecified, at most 50 GlossaryCategories will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Order by expression that orders GlossaryCategories listed in the response. Order by fields are: name or create_time for the result. If not specified, the ordering is undefined. */
  orderBy?: string;
}

export const ListProjectsLocationsGlossariesCategoriesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/categories" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlossariesCategoriesRequest>;

export type ListProjectsLocationsGlossariesCategoriesResponse = GoogleCloudDataplexV1ListGlossaryCategoriesResponse;
export const ListProjectsLocationsGlossariesCategoriesResponse = GoogleCloudDataplexV1ListGlossaryCategoriesResponse;

export type ListProjectsLocationsGlossariesCategoriesError = CommonErrors;

export const listProjectsLocationsGlossariesCategories = API.makePaginated(() => ({
  input: ListProjectsLocationsGlossariesCategoriesRequest,
  output: ListProjectsLocationsGlossariesCategoriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a GlossaryCategory resource. */
export interface GetProjectsLocationsGlossariesCategoriesRequest {
  /** Required. The name of the GlossaryCategory to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id} */
  name: string;
}

export const GetProjectsLocationsGlossariesCategoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/categories/{categoriesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlossariesCategoriesRequest>;

export type GetProjectsLocationsGlossariesCategoriesResponse = GoogleCloudDataplexV1GlossaryCategory;
export const GetProjectsLocationsGlossariesCategoriesResponse = GoogleCloudDataplexV1GlossaryCategory;

export type GetProjectsLocationsGlossariesCategoriesError = CommonErrors;

export const getProjectsLocationsGlossariesCategories: API.OperationMethod<GetProjectsLocationsGlossariesCategoriesRequest, GetProjectsLocationsGlossariesCategoriesResponse, GetProjectsLocationsGlossariesCategoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGlossariesCategoriesRequest,
  output: GetProjectsLocationsGlossariesCategoriesResponse,
  errors: [],
}));

/** Updates a GlossaryCategory resource. */
export interface PatchProjectsLocationsGlossariesCategoriesRequest {
  /** Output only. Identifier. The resource name of the GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id} */
  name: string;
  /** Required. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1GlossaryCategory;
}

export const PatchProjectsLocationsGlossariesCategoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDataplexV1GlossaryCategory).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/categories/{categoriesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGlossariesCategoriesRequest>;

export type PatchProjectsLocationsGlossariesCategoriesResponse = GoogleCloudDataplexV1GlossaryCategory;
export const PatchProjectsLocationsGlossariesCategoriesResponse = GoogleCloudDataplexV1GlossaryCategory;

export type PatchProjectsLocationsGlossariesCategoriesError = CommonErrors;

export const patchProjectsLocationsGlossariesCategories: API.OperationMethod<PatchProjectsLocationsGlossariesCategoriesRequest, PatchProjectsLocationsGlossariesCategoriesResponse, PatchProjectsLocationsGlossariesCategoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsGlossariesCategoriesRequest,
  output: PatchProjectsLocationsGlossariesCategoriesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsGlossariesCategoriesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsGlossariesCategoriesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/categories/{categoriesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsGlossariesCategoriesRequest>;

export type TestIamPermissionsProjectsLocationsGlossariesCategoriesResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsGlossariesCategoriesResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsGlossariesCategoriesError = CommonErrors;

export const testIamPermissionsProjectsLocationsGlossariesCategories: API.OperationMethod<TestIamPermissionsProjectsLocationsGlossariesCategoriesRequest, TestIamPermissionsProjectsLocationsGlossariesCategoriesResponse, TestIamPermissionsProjectsLocationsGlossariesCategoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsGlossariesCategoriesRequest,
  output: TestIamPermissionsProjectsLocationsGlossariesCategoriesResponse,
  errors: [],
}));

/** Deletes a GlossaryCategory resource. All the GlossaryCategories and GlossaryTerms nested directly under the specified GlossaryCategory will be moved one level up to the parent in the hierarchy. */
export interface DeleteProjectsLocationsGlossariesCategoriesRequest {
  /** Required. The name of the GlossaryCategory to delete. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id} */
  name: string;
}

export const DeleteProjectsLocationsGlossariesCategoriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/categories/{categoriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGlossariesCategoriesRequest>;

export type DeleteProjectsLocationsGlossariesCategoriesResponse = Empty;
export const DeleteProjectsLocationsGlossariesCategoriesResponse = Empty;

export type DeleteProjectsLocationsGlossariesCategoriesError = CommonErrors;

export const deleteProjectsLocationsGlossariesCategories: API.OperationMethod<DeleteProjectsLocationsGlossariesCategoriesRequest, DeleteProjectsLocationsGlossariesCategoriesResponse, DeleteProjectsLocationsGlossariesCategoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGlossariesCategoriesRequest,
  output: DeleteProjectsLocationsGlossariesCategoriesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsGlossariesCategoriesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsGlossariesCategoriesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/categories/{categoriesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsGlossariesCategoriesRequest>;

export type SetIamPolicyProjectsLocationsGlossariesCategoriesResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsGlossariesCategoriesResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsGlossariesCategoriesError = CommonErrors;

export const setIamPolicyProjectsLocationsGlossariesCategories: API.OperationMethod<SetIamPolicyProjectsLocationsGlossariesCategoriesRequest, SetIamPolicyProjectsLocationsGlossariesCategoriesResponse, SetIamPolicyProjectsLocationsGlossariesCategoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsGlossariesCategoriesRequest,
  output: SetIamPolicyProjectsLocationsGlossariesCategoriesResponse,
  errors: [],
}));

/** Creates a new GlossaryCategory resource. */
export interface CreateProjectsLocationsGlossariesCategoriesRequest {
  /** Required. GlossaryCategory identifier. */
  categoryId?: string;
  /** Required. The parent resource where this GlossaryCategory will be created. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} where locationId refers to a Google Cloud region. */
  parent: string;
  /** Request body */
  body?: GoogleCloudDataplexV1GlossaryCategory;
}

export const CreateProjectsLocationsGlossariesCategoriesRequest = Schema.Struct({
  categoryId: Schema.optional(Schema.String).pipe(T.HttpQuery("categoryId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDataplexV1GlossaryCategory).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/categories", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGlossariesCategoriesRequest>;

export type CreateProjectsLocationsGlossariesCategoriesResponse = GoogleCloudDataplexV1GlossaryCategory;
export const CreateProjectsLocationsGlossariesCategoriesResponse = GoogleCloudDataplexV1GlossaryCategory;

export type CreateProjectsLocationsGlossariesCategoriesError = CommonErrors;

export const createProjectsLocationsGlossariesCategories: API.OperationMethod<CreateProjectsLocationsGlossariesCategoriesRequest, CreateProjectsLocationsGlossariesCategoriesResponse, CreateProjectsLocationsGlossariesCategoriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGlossariesCategoriesRequest,
  output: CreateProjectsLocationsGlossariesCategoriesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsGlossariesTermsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsGlossariesTermsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/terms/{termsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsGlossariesTermsRequest>;

export type GetIamPolicyProjectsLocationsGlossariesTermsResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsGlossariesTermsResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsGlossariesTermsError = CommonErrors;

export const getIamPolicyProjectsLocationsGlossariesTerms: API.OperationMethod<GetIamPolicyProjectsLocationsGlossariesTermsRequest, GetIamPolicyProjectsLocationsGlossariesTermsResponse, GetIamPolicyProjectsLocationsGlossariesTermsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsGlossariesTermsRequest,
  output: GetIamPolicyProjectsLocationsGlossariesTermsResponse,
  errors: [],
}));

/** Lists GlossaryTerm resources in a Glossary. */
export interface ListProjectsLocationsGlossariesTermsRequest {
  /** Optional. Filter expression that filters GlossaryTerms listed in the response. Filters are supported on the following fields: - immediate_parentExamples of using a filter are: - immediate_parent="projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}" - immediate_parent="projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}"This will only return the GlossaryTerms that are directly nested under the specified parent. */
  filter?: string;
  /** Optional. Order by expression that orders GlossaryTerms listed in the response. Order by fields are: name or create_time for the result. If not specified, the ordering is undefined. */
  orderBy?: string;
  /** Optional. A page token, received from a previous ListGlossaryTerms call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListGlossaryTerms must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The parent, which has this collection of GlossaryTerms. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} where location_id refers to a Google Cloud region. */
  parent: string;
  /** Optional. The maximum number of GlossaryTerms to return. The service may return fewer than this value. If unspecified, at most 50 GlossaryTerms will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsGlossariesTermsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/terms" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsGlossariesTermsRequest>;

export type ListProjectsLocationsGlossariesTermsResponse = GoogleCloudDataplexV1ListGlossaryTermsResponse;
export const ListProjectsLocationsGlossariesTermsResponse = GoogleCloudDataplexV1ListGlossaryTermsResponse;

export type ListProjectsLocationsGlossariesTermsError = CommonErrors;

export const listProjectsLocationsGlossariesTerms = API.makePaginated(() => ({
  input: ListProjectsLocationsGlossariesTermsRequest,
  output: ListProjectsLocationsGlossariesTermsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a GlossaryTerm resource. */
export interface GetProjectsLocationsGlossariesTermsRequest {
  /** Required. The name of the GlossaryTerm to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id} */
  name: string;
}

export const GetProjectsLocationsGlossariesTermsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/terms/{termsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsGlossariesTermsRequest>;

export type GetProjectsLocationsGlossariesTermsResponse = GoogleCloudDataplexV1GlossaryTerm;
export const GetProjectsLocationsGlossariesTermsResponse = GoogleCloudDataplexV1GlossaryTerm;

export type GetProjectsLocationsGlossariesTermsError = CommonErrors;

export const getProjectsLocationsGlossariesTerms: API.OperationMethod<GetProjectsLocationsGlossariesTermsRequest, GetProjectsLocationsGlossariesTermsResponse, GetProjectsLocationsGlossariesTermsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsGlossariesTermsRequest,
  output: GetProjectsLocationsGlossariesTermsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsGlossariesTermsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsGlossariesTermsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/terms/{termsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsGlossariesTermsRequest>;

export type SetIamPolicyProjectsLocationsGlossariesTermsResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsGlossariesTermsResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsGlossariesTermsError = CommonErrors;

export const setIamPolicyProjectsLocationsGlossariesTerms: API.OperationMethod<SetIamPolicyProjectsLocationsGlossariesTermsRequest, SetIamPolicyProjectsLocationsGlossariesTermsResponse, SetIamPolicyProjectsLocationsGlossariesTermsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsGlossariesTermsRequest,
  output: SetIamPolicyProjectsLocationsGlossariesTermsResponse,
  errors: [],
}));

/** Creates a new GlossaryTerm resource. */
export interface CreateProjectsLocationsGlossariesTermsRequest {
  /** Required. The parent resource where the GlossaryTerm will be created. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} where location_id refers to a Google Cloud region. */
  parent: string;
  /** Required. GlossaryTerm identifier. */
  termId?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1GlossaryTerm;
}

export const CreateProjectsLocationsGlossariesTermsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  termId: Schema.optional(Schema.String).pipe(T.HttpQuery("termId")),
  body: Schema.optional(GoogleCloudDataplexV1GlossaryTerm).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/terms", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsGlossariesTermsRequest>;

export type CreateProjectsLocationsGlossariesTermsResponse = GoogleCloudDataplexV1GlossaryTerm;
export const CreateProjectsLocationsGlossariesTermsResponse = GoogleCloudDataplexV1GlossaryTerm;

export type CreateProjectsLocationsGlossariesTermsError = CommonErrors;

export const createProjectsLocationsGlossariesTerms: API.OperationMethod<CreateProjectsLocationsGlossariesTermsRequest, CreateProjectsLocationsGlossariesTermsResponse, CreateProjectsLocationsGlossariesTermsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsGlossariesTermsRequest,
  output: CreateProjectsLocationsGlossariesTermsResponse,
  errors: [],
}));

/** Updates a GlossaryTerm resource. */
export interface PatchProjectsLocationsGlossariesTermsRequest {
  /** Output only. Identifier. The resource name of the GlossaryTerm. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id} */
  name: string;
  /** Required. The list of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1GlossaryTerm;
}

export const PatchProjectsLocationsGlossariesTermsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDataplexV1GlossaryTerm).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/terms/{termsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsGlossariesTermsRequest>;

export type PatchProjectsLocationsGlossariesTermsResponse = GoogleCloudDataplexV1GlossaryTerm;
export const PatchProjectsLocationsGlossariesTermsResponse = GoogleCloudDataplexV1GlossaryTerm;

export type PatchProjectsLocationsGlossariesTermsError = CommonErrors;

export const patchProjectsLocationsGlossariesTerms: API.OperationMethod<PatchProjectsLocationsGlossariesTermsRequest, PatchProjectsLocationsGlossariesTermsResponse, PatchProjectsLocationsGlossariesTermsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsGlossariesTermsRequest,
  output: PatchProjectsLocationsGlossariesTermsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsGlossariesTermsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsGlossariesTermsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/terms/{termsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsGlossariesTermsRequest>;

export type TestIamPermissionsProjectsLocationsGlossariesTermsResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsGlossariesTermsResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsGlossariesTermsError = CommonErrors;

export const testIamPermissionsProjectsLocationsGlossariesTerms: API.OperationMethod<TestIamPermissionsProjectsLocationsGlossariesTermsRequest, TestIamPermissionsProjectsLocationsGlossariesTermsResponse, TestIamPermissionsProjectsLocationsGlossariesTermsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsGlossariesTermsRequest,
  output: TestIamPermissionsProjectsLocationsGlossariesTermsResponse,
  errors: [],
}));

/** Deletes a GlossaryTerm resource. */
export interface DeleteProjectsLocationsGlossariesTermsRequest {
  /** Required. The name of the GlossaryTerm to delete. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/terms/{term_id} */
  name: string;
}

export const DeleteProjectsLocationsGlossariesTermsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/glossaries/{glossariesId}/terms/{termsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsGlossariesTermsRequest>;

export type DeleteProjectsLocationsGlossariesTermsResponse = Empty;
export const DeleteProjectsLocationsGlossariesTermsResponse = Empty;

export type DeleteProjectsLocationsGlossariesTermsError = CommonErrors;

export const deleteProjectsLocationsGlossariesTerms: API.OperationMethod<DeleteProjectsLocationsGlossariesTermsRequest, DeleteProjectsLocationsGlossariesTermsResponse, DeleteProjectsLocationsGlossariesTermsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsGlossariesTermsRequest,
  output: DeleteProjectsLocationsGlossariesTermsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsLakesRequest {
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsLakesRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsLakesRequest>;

export type GetIamPolicyProjectsLocationsLakesResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsLakesResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsLakesError = CommonErrors;

export const getIamPolicyProjectsLocationsLakes: API.OperationMethod<GetIamPolicyProjectsLocationsLakesRequest, GetIamPolicyProjectsLocationsLakesResponse, GetIamPolicyProjectsLocationsLakesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsLakesRequest,
  output: GetIamPolicyProjectsLocationsLakesResponse,
  errors: [],
}));

/** Creates a lake resource. */
export interface CreateProjectsLocationsLakesRequest {
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Required. Lake identifier. This ID will be used to generate names such as database and dataset names when publishing metadata to Hive Metastore and BigQuery. * Must contain only lowercase letters, numbers and hyphens. * Must start with a letter. * Must end with a number or a letter. * Must be between 1-63 characters. * Must be unique within the customer project / location. */
  lakeId?: string;
  /** Required. The resource name of the lake location, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. */
  parent: string;
  /** Request body */
  body?: GoogleCloudDataplexV1Lake;
}

export const CreateProjectsLocationsLakesRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  lakeId: Schema.optional(Schema.String).pipe(T.HttpQuery("lakeId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDataplexV1Lake).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsLakesRequest>;

export type CreateProjectsLocationsLakesResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsLakesResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsLakesError = CommonErrors;

export const createProjectsLocationsLakes: API.OperationMethod<CreateProjectsLocationsLakesRequest, CreateProjectsLocationsLakesResponse, CreateProjectsLocationsLakesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsLakesRequest,
  output: CreateProjectsLocationsLakesResponse,
  errors: [],
}));

/** Lists lake resources in a project and location. */
export interface ListProjectsLocationsLakesRequest {
  /** Required. The resource name of the lake location, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. */
  parent: string;
  /** Optional. Filter request. */
  filter?: string;
  /** Optional. Page token received from a previous ListLakes call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListLakes must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Maximum number of Lakes to return. The service may return fewer than this value. If unspecified, at most 10 lakes will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Order by fields for the result. */
  orderBy?: string;
}

export const ListProjectsLocationsLakesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsLakesRequest>;

export type ListProjectsLocationsLakesResponse = GoogleCloudDataplexV1ListLakesResponse;
export const ListProjectsLocationsLakesResponse = GoogleCloudDataplexV1ListLakesResponse;

export type ListProjectsLocationsLakesError = CommonErrors;

export const listProjectsLocationsLakes = API.makePaginated(() => ({
  input: ListProjectsLocationsLakesRequest,
  output: ListProjectsLocationsLakesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a lake resource. All zones within the lake must be deleted before the lake can be deleted. */
export interface DeleteProjectsLocationsLakesRequest {
  /** Required. The resource name of the lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. */
  name: string;
}

export const DeleteProjectsLocationsLakesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsLakesRequest>;

export type DeleteProjectsLocationsLakesResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsLakesResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsLakesError = CommonErrors;

export const deleteProjectsLocationsLakes: API.OperationMethod<DeleteProjectsLocationsLakesRequest, DeleteProjectsLocationsLakesResponse, DeleteProjectsLocationsLakesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsLakesRequest,
  output: DeleteProjectsLocationsLakesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsLakesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsLakesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsLakesRequest>;

export type SetIamPolicyProjectsLocationsLakesResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsLakesResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsLakesError = CommonErrors;

export const setIamPolicyProjectsLocationsLakes: API.OperationMethod<SetIamPolicyProjectsLocationsLakesRequest, SetIamPolicyProjectsLocationsLakesResponse, SetIamPolicyProjectsLocationsLakesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsLakesRequest,
  output: SetIamPolicyProjectsLocationsLakesResponse,
  errors: [],
}));

/** Updates a lake resource. */
export interface PatchProjectsLocationsLakesRequest {
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Output only. The relative resource name of the lake, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. */
  name: string;
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1Lake;
}

export const PatchProjectsLocationsLakesRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDataplexV1Lake).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsLakesRequest>;

export type PatchProjectsLocationsLakesResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsLakesResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsLakesError = CommonErrors;

export const patchProjectsLocationsLakes: API.OperationMethod<PatchProjectsLocationsLakesRequest, PatchProjectsLocationsLakesResponse, PatchProjectsLocationsLakesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsLakesRequest,
  output: PatchProjectsLocationsLakesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsLakesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsLakesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsLakesRequest>;

export type TestIamPermissionsProjectsLocationsLakesResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsLakesResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsLakesError = CommonErrors;

export const testIamPermissionsProjectsLocationsLakes: API.OperationMethod<TestIamPermissionsProjectsLocationsLakesRequest, TestIamPermissionsProjectsLocationsLakesResponse, TestIamPermissionsProjectsLocationsLakesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsLakesRequest,
  output: TestIamPermissionsProjectsLocationsLakesResponse,
  errors: [],
}));

/** Retrieves a lake resource. */
export interface GetProjectsLocationsLakesRequest {
  /** Required. The resource name of the lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. */
  name: string;
}

export const GetProjectsLocationsLakesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsLakesRequest>;

export type GetProjectsLocationsLakesResponse = GoogleCloudDataplexV1Lake;
export const GetProjectsLocationsLakesResponse = GoogleCloudDataplexV1Lake;

export type GetProjectsLocationsLakesError = CommonErrors;

export const getProjectsLocationsLakes: API.OperationMethod<GetProjectsLocationsLakesRequest, GetProjectsLocationsLakesResponse, GetProjectsLocationsLakesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsLakesRequest,
  output: GetProjectsLocationsLakesResponse,
  errors: [],
}));

/** Update a content. Only supports full resource update. */
export interface PatchProjectsLocationsLakesContentitemsRequest {
  /** Output only. The relative resource name of the content, of the form: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/content/{content_id} */
  name: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1Content;
}

export const PatchProjectsLocationsLakesContentitemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDataplexV1Content).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/contentitems/{contentitemsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsLakesContentitemsRequest>;

export type PatchProjectsLocationsLakesContentitemsResponse = GoogleCloudDataplexV1Content;
export const PatchProjectsLocationsLakesContentitemsResponse = GoogleCloudDataplexV1Content;

export type PatchProjectsLocationsLakesContentitemsError = CommonErrors;

export const patchProjectsLocationsLakesContentitems: API.OperationMethod<PatchProjectsLocationsLakesContentitemsRequest, PatchProjectsLocationsLakesContentitemsResponse, PatchProjectsLocationsLakesContentitemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsLakesContentitemsRequest,
  output: PatchProjectsLocationsLakesContentitemsResponse,
  errors: [],
}));

/** List content. */
export interface ListProjectsLocationsLakesContentitemsRequest {
  /** Optional. Page token received from a previous ListContent call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListContent must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The resource name of the parent lake: projects/{project_id}/locations/{location_id}/lakes/{lake_id} */
  parent: string;
  /** Optional. Filter request. Filters are case-sensitive. The following formats are supported:labels.key1 = "value1" labels:key1 type = "NOTEBOOK" type = "SQL_SCRIPT"These restrictions can be coinjoined with AND, OR and NOT conjunctions. */
  filter?: string;
  /** Optional. Maximum number of content to return. The service may return fewer than this value. If unspecified, at most 10 content will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsLakesContentitemsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/contentitems" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsLakesContentitemsRequest>;

export type ListProjectsLocationsLakesContentitemsResponse = GoogleCloudDataplexV1ListContentResponse;
export const ListProjectsLocationsLakesContentitemsResponse = GoogleCloudDataplexV1ListContentResponse;

export type ListProjectsLocationsLakesContentitemsError = CommonErrors;

export const listProjectsLocationsLakesContentitems = API.makePaginated(() => ({
  input: ListProjectsLocationsLakesContentitemsRequest,
  output: ListProjectsLocationsLakesContentitemsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Create a content. */
export interface CreateProjectsLocationsLakesContentitemsRequest {
  /** Required. The resource name of the parent lake: projects/{project_id}/locations/{location_id}/lakes/{lake_id} */
  parent: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1Content;
}

export const CreateProjectsLocationsLakesContentitemsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1Content).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/contentitems", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsLakesContentitemsRequest>;

export type CreateProjectsLocationsLakesContentitemsResponse = GoogleCloudDataplexV1Content;
export const CreateProjectsLocationsLakesContentitemsResponse = GoogleCloudDataplexV1Content;

export type CreateProjectsLocationsLakesContentitemsError = CommonErrors;

export const createProjectsLocationsLakesContentitems: API.OperationMethod<CreateProjectsLocationsLakesContentitemsRequest, CreateProjectsLocationsLakesContentitemsResponse, CreateProjectsLocationsLakesContentitemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsLakesContentitemsRequest,
  output: CreateProjectsLocationsLakesContentitemsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified contentitem resource. Replaces any existing policy.Caller must have Google IAM dataplex.content.setIamPolicy permission on the resource. */
export interface SetIamPolicyProjectsLocationsLakesContentitemsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsLakesContentitemsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/contentitems/{contentitemsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsLakesContentitemsRequest>;

export type SetIamPolicyProjectsLocationsLakesContentitemsResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsLakesContentitemsResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsLakesContentitemsError = CommonErrors;

export const setIamPolicyProjectsLocationsLakesContentitems: API.OperationMethod<SetIamPolicyProjectsLocationsLakesContentitemsRequest, SetIamPolicyProjectsLocationsLakesContentitemsResponse, SetIamPolicyProjectsLocationsLakesContentitemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsLakesContentitemsRequest,
  output: SetIamPolicyProjectsLocationsLakesContentitemsResponse,
  errors: [],
}));

/** Get a content resource. */
export interface GetProjectsLocationsLakesContentitemsRequest {
  /** Required. The resource name of the content: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/content/{content_id} */
  name: string;
  /** Optional. Specify content view to make a partial request. */
  view?: "CONTENT_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetProjectsLocationsLakesContentitemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/contentitems/{contentitemsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsLakesContentitemsRequest>;

export type GetProjectsLocationsLakesContentitemsResponse = GoogleCloudDataplexV1Content;
export const GetProjectsLocationsLakesContentitemsResponse = GoogleCloudDataplexV1Content;

export type GetProjectsLocationsLakesContentitemsError = CommonErrors;

export const getProjectsLocationsLakesContentitems: API.OperationMethod<GetProjectsLocationsLakesContentitemsRequest, GetProjectsLocationsLakesContentitemsResponse, GetProjectsLocationsLakesContentitemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsLakesContentitemsRequest,
  output: GetProjectsLocationsLakesContentitemsResponse,
  errors: [],
}));

/** Gets the access control policy for a contentitem resource. A NOT_FOUND error is returned if the resource does not exist. An empty policy is returned if the resource exists but does not have a policy set on it.Caller must have Google IAM dataplex.content.getIamPolicy permission on the resource. */
export interface GetIamPolicyProjectsLocationsLakesContentitemsRequest {
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsLakesContentitemsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/contentitems/{contentitemsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsLakesContentitemsRequest>;

export type GetIamPolicyProjectsLocationsLakesContentitemsResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsLakesContentitemsResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsLakesContentitemsError = CommonErrors;

export const getIamPolicyProjectsLocationsLakesContentitems: API.OperationMethod<GetIamPolicyProjectsLocationsLakesContentitemsRequest, GetIamPolicyProjectsLocationsLakesContentitemsResponse, GetIamPolicyProjectsLocationsLakesContentitemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsLakesContentitemsRequest,
  output: GetIamPolicyProjectsLocationsLakesContentitemsResponse,
  errors: [],
}));

/** Returns the caller's permissions on a resource. If the resource does not exist, an empty set of permissions is returned (a NOT_FOUND error is not returned).A caller is not required to have Google IAM permission to make this request.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsLakesContentitemsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsLakesContentitemsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/contentitems/{contentitemsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsLakesContentitemsRequest>;

export type TestIamPermissionsProjectsLocationsLakesContentitemsResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsLakesContentitemsResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsLakesContentitemsError = CommonErrors;

export const testIamPermissionsProjectsLocationsLakesContentitems: API.OperationMethod<TestIamPermissionsProjectsLocationsLakesContentitemsRequest, TestIamPermissionsProjectsLocationsLakesContentitemsResponse, TestIamPermissionsProjectsLocationsLakesContentitemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsLakesContentitemsRequest,
  output: TestIamPermissionsProjectsLocationsLakesContentitemsResponse,
  errors: [],
}));

/** Delete a content. */
export interface DeleteProjectsLocationsLakesContentitemsRequest {
  /** Required. The resource name of the content: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/content/{content_id} */
  name: string;
}

export const DeleteProjectsLocationsLakesContentitemsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/contentitems/{contentitemsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsLakesContentitemsRequest>;

export type DeleteProjectsLocationsLakesContentitemsResponse = Empty;
export const DeleteProjectsLocationsLakesContentitemsResponse = Empty;

export type DeleteProjectsLocationsLakesContentitemsError = CommonErrors;

export const deleteProjectsLocationsLakesContentitems: API.OperationMethod<DeleteProjectsLocationsLakesContentitemsRequest, DeleteProjectsLocationsLakesContentitemsResponse, DeleteProjectsLocationsLakesContentitemsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsLakesContentitemsRequest,
  output: DeleteProjectsLocationsLakesContentitemsResponse,
  errors: [],
}));

/** Lists environments under the given lake. */
export interface ListProjectsLocationsLakesEnvironmentsRequest {
  /** Required. The resource name of the parent lake: projects/{project_id}/locations/{location_id}/lakes/{lake_id}. */
  parent: string;
  /** Optional. Page token received from a previous ListEnvironments call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListEnvironments must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filter request. */
  filter?: string;
  /** Optional. Maximum number of environments to return. The service may return fewer than this value. If unspecified, at most 10 environments will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Order by fields for the result. */
  orderBy?: string;
}

export const ListProjectsLocationsLakesEnvironmentsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/environments" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsLakesEnvironmentsRequest>;

export type ListProjectsLocationsLakesEnvironmentsResponse = GoogleCloudDataplexV1ListEnvironmentsResponse;
export const ListProjectsLocationsLakesEnvironmentsResponse = GoogleCloudDataplexV1ListEnvironmentsResponse;

export type ListProjectsLocationsLakesEnvironmentsError = CommonErrors;

export const listProjectsLocationsLakesEnvironments = API.makePaginated(() => ({
  input: ListProjectsLocationsLakesEnvironmentsRequest,
  output: ListProjectsLocationsLakesEnvironmentsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get environment resource. */
export interface GetProjectsLocationsLakesEnvironmentsRequest {
  /** Required. The resource name of the environment: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/environments/{environment_id}. */
  name: string;
}

export const GetProjectsLocationsLakesEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/environments/{environmentsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsLakesEnvironmentsRequest>;

export type GetProjectsLocationsLakesEnvironmentsResponse = GoogleCloudDataplexV1Environment;
export const GetProjectsLocationsLakesEnvironmentsResponse = GoogleCloudDataplexV1Environment;

export type GetProjectsLocationsLakesEnvironmentsError = CommonErrors;

export const getProjectsLocationsLakesEnvironments: API.OperationMethod<GetProjectsLocationsLakesEnvironmentsRequest, GetProjectsLocationsLakesEnvironmentsResponse, GetProjectsLocationsLakesEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsLakesEnvironmentsRequest,
  output: GetProjectsLocationsLakesEnvironmentsResponse,
  errors: [],
}));

/** Update the environment resource. */
export interface PatchProjectsLocationsLakesEnvironmentsRequest {
  /** Output only. The relative resource name of the environment, of the form: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/environment/{environment_id} */
  name: string;
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1Environment;
}

export const PatchProjectsLocationsLakesEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/environments/{environmentsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsLakesEnvironmentsRequest>;

export type PatchProjectsLocationsLakesEnvironmentsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsLakesEnvironmentsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsLakesEnvironmentsError = CommonErrors;

export const patchProjectsLocationsLakesEnvironments: API.OperationMethod<PatchProjectsLocationsLakesEnvironmentsRequest, PatchProjectsLocationsLakesEnvironmentsResponse, PatchProjectsLocationsLakesEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsLakesEnvironmentsRequest,
  output: PatchProjectsLocationsLakesEnvironmentsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsLakesEnvironmentsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsLakesEnvironmentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/environments/{environmentsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsLakesEnvironmentsRequest>;

export type TestIamPermissionsProjectsLocationsLakesEnvironmentsResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsLakesEnvironmentsResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsLakesEnvironmentsError = CommonErrors;

export const testIamPermissionsProjectsLocationsLakesEnvironments: API.OperationMethod<TestIamPermissionsProjectsLocationsLakesEnvironmentsRequest, TestIamPermissionsProjectsLocationsLakesEnvironmentsResponse, TestIamPermissionsProjectsLocationsLakesEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsLakesEnvironmentsRequest,
  output: TestIamPermissionsProjectsLocationsLakesEnvironmentsResponse,
  errors: [],
}));

/** Delete the environment resource. All the child resources must have been deleted before environment deletion can be initiated. */
export interface DeleteProjectsLocationsLakesEnvironmentsRequest {
  /** Required. The resource name of the environment: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/environments/{environment_id}. */
  name: string;
}

export const DeleteProjectsLocationsLakesEnvironmentsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/environments/{environmentsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsLakesEnvironmentsRequest>;

export type DeleteProjectsLocationsLakesEnvironmentsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsLakesEnvironmentsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsLakesEnvironmentsError = CommonErrors;

export const deleteProjectsLocationsLakesEnvironments: API.OperationMethod<DeleteProjectsLocationsLakesEnvironmentsRequest, DeleteProjectsLocationsLakesEnvironmentsResponse, DeleteProjectsLocationsLakesEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsLakesEnvironmentsRequest,
  output: DeleteProjectsLocationsLakesEnvironmentsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsLakesEnvironmentsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsLakesEnvironmentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/environments/{environmentsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsLakesEnvironmentsRequest>;

export type SetIamPolicyProjectsLocationsLakesEnvironmentsResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsLakesEnvironmentsResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsLakesEnvironmentsError = CommonErrors;

export const setIamPolicyProjectsLocationsLakesEnvironments: API.OperationMethod<SetIamPolicyProjectsLocationsLakesEnvironmentsRequest, SetIamPolicyProjectsLocationsLakesEnvironmentsResponse, SetIamPolicyProjectsLocationsLakesEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsLakesEnvironmentsRequest,
  output: SetIamPolicyProjectsLocationsLakesEnvironmentsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsLakesEnvironmentsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsLakesEnvironmentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/environments/{environmentsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsLakesEnvironmentsRequest>;

export type GetIamPolicyProjectsLocationsLakesEnvironmentsResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsLakesEnvironmentsResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsLakesEnvironmentsError = CommonErrors;

export const getIamPolicyProjectsLocationsLakesEnvironments: API.OperationMethod<GetIamPolicyProjectsLocationsLakesEnvironmentsRequest, GetIamPolicyProjectsLocationsLakesEnvironmentsResponse, GetIamPolicyProjectsLocationsLakesEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsLakesEnvironmentsRequest,
  output: GetIamPolicyProjectsLocationsLakesEnvironmentsResponse,
  errors: [],
}));

/** Create an environment resource. */
export interface CreateProjectsLocationsLakesEnvironmentsRequest {
  /** Required. Environment identifier. * Must contain only lowercase letters, numbers and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the lake. */
  environmentId?: string;
  /** Required. The resource name of the parent lake: projects/{project_id}/locations/{location_id}/lakes/{lake_id}. */
  parent: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1Environment;
}

export const CreateProjectsLocationsLakesEnvironmentsRequest = Schema.Struct({
  environmentId: Schema.optional(Schema.String).pipe(T.HttpQuery("environmentId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1Environment).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/environments", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsLakesEnvironmentsRequest>;

export type CreateProjectsLocationsLakesEnvironmentsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsLakesEnvironmentsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsLakesEnvironmentsError = CommonErrors;

export const createProjectsLocationsLakesEnvironments: API.OperationMethod<CreateProjectsLocationsLakesEnvironmentsRequest, CreateProjectsLocationsLakesEnvironmentsResponse, CreateProjectsLocationsLakesEnvironmentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsLakesEnvironmentsRequest,
  output: CreateProjectsLocationsLakesEnvironmentsResponse,
  errors: [],
}));

/** Lists session resources in an environment. */
export interface ListProjectsLocationsLakesEnvironmentsSessionsRequest {
  /** Optional. Page token received from a previous ListSessions call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListSessions must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filter request. The following mode filter is supported to return only the sessions belonging to the requester when the mode is USER and return sessions of all the users when the mode is ADMIN. When no filter is sent default to USER mode. NOTE: When the mode is ADMIN, the requester should have dataplex.environments.listAllSessions permission to list all sessions, in absence of the permission, the request fails.mode = ADMIN | USER */
  filter?: string;
  /** Required. The resource name of the parent environment: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/environment/{environment_id}. */
  parent: string;
  /** Optional. Maximum number of sessions to return. The service may return fewer than this value. If unspecified, at most 10 sessions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsLakesEnvironmentsSessionsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/environments/{environmentsId}/sessions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsLakesEnvironmentsSessionsRequest>;

export type ListProjectsLocationsLakesEnvironmentsSessionsResponse = GoogleCloudDataplexV1ListSessionsResponse;
export const ListProjectsLocationsLakesEnvironmentsSessionsResponse = GoogleCloudDataplexV1ListSessionsResponse;

export type ListProjectsLocationsLakesEnvironmentsSessionsError = CommonErrors;

export const listProjectsLocationsLakesEnvironmentsSessions = API.makePaginated(() => ({
  input: ListProjectsLocationsLakesEnvironmentsSessionsRequest,
  output: ListProjectsLocationsLakesEnvironmentsSessionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists tasks under the given lake. */
export interface ListProjectsLocationsLakesTasksRequest {
  /** Required. The resource name of the parent lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. */
  parent: string;
  /** Optional. Maximum number of tasks to return. The service may return fewer than this value. If unspecified, at most 10 tasks will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Order by fields for the result. */
  orderBy?: string;
  /** Optional. Filter request. */
  filter?: string;
  /** Optional. Page token received from a previous ListZones call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListZones must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsLakesTasksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/tasks" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsLakesTasksRequest>;

export type ListProjectsLocationsLakesTasksResponse = GoogleCloudDataplexV1ListTasksResponse;
export const ListProjectsLocationsLakesTasksResponse = GoogleCloudDataplexV1ListTasksResponse;

export type ListProjectsLocationsLakesTasksError = CommonErrors;

export const listProjectsLocationsLakesTasks = API.makePaginated(() => ({
  input: ListProjectsLocationsLakesTasksRequest,
  output: ListProjectsLocationsLakesTasksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsLakesTasksRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsLakesTasksRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/tasks/{tasksId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsLakesTasksRequest>;

export type SetIamPolicyProjectsLocationsLakesTasksResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsLakesTasksResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsLakesTasksError = CommonErrors;

export const setIamPolicyProjectsLocationsLakesTasks: API.OperationMethod<SetIamPolicyProjectsLocationsLakesTasksRequest, SetIamPolicyProjectsLocationsLakesTasksResponse, SetIamPolicyProjectsLocationsLakesTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsLakesTasksRequest,
  output: SetIamPolicyProjectsLocationsLakesTasksResponse,
  errors: [],
}));

/** Delete the task resource. */
export interface DeleteProjectsLocationsLakesTasksRequest {
  /** Required. The resource name of the task: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/task/{task_id}. */
  name: string;
}

export const DeleteProjectsLocationsLakesTasksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/tasks/{tasksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsLakesTasksRequest>;

export type DeleteProjectsLocationsLakesTasksResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsLakesTasksResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsLakesTasksError = CommonErrors;

export const deleteProjectsLocationsLakesTasks: API.OperationMethod<DeleteProjectsLocationsLakesTasksRequest, DeleteProjectsLocationsLakesTasksResponse, DeleteProjectsLocationsLakesTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsLakesTasksRequest,
  output: DeleteProjectsLocationsLakesTasksResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsLakesTasksRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsLakesTasksRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/tasks/{tasksId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsLakesTasksRequest>;

export type TestIamPermissionsProjectsLocationsLakesTasksResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsLakesTasksResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsLakesTasksError = CommonErrors;

export const testIamPermissionsProjectsLocationsLakesTasks: API.OperationMethod<TestIamPermissionsProjectsLocationsLakesTasksRequest, TestIamPermissionsProjectsLocationsLakesTasksResponse, TestIamPermissionsProjectsLocationsLakesTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsLakesTasksRequest,
  output: TestIamPermissionsProjectsLocationsLakesTasksResponse,
  errors: [],
}));

/** Run an on demand execution of a Task. */
export interface RunProjectsLocationsLakesTasksRequest {
  /** Required. The resource name of the task: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}. */
  name: string;
  /** Request body */
  body?: GoogleCloudDataplexV1RunTaskRequest;
}

export const RunProjectsLocationsLakesTasksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDataplexV1RunTaskRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/tasks/{tasksId}:run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunProjectsLocationsLakesTasksRequest>;

export type RunProjectsLocationsLakesTasksResponse = GoogleCloudDataplexV1RunTaskResponse;
export const RunProjectsLocationsLakesTasksResponse = GoogleCloudDataplexV1RunTaskResponse;

export type RunProjectsLocationsLakesTasksError = CommonErrors;

export const runProjectsLocationsLakesTasks: API.OperationMethod<RunProjectsLocationsLakesTasksRequest, RunProjectsLocationsLakesTasksResponse, RunProjectsLocationsLakesTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunProjectsLocationsLakesTasksRequest,
  output: RunProjectsLocationsLakesTasksResponse,
  errors: [],
}));

/** Get task resource. */
export interface GetProjectsLocationsLakesTasksRequest {
  /** Required. The resource name of the task: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{tasks_id}. */
  name: string;
}

export const GetProjectsLocationsLakesTasksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/tasks/{tasksId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsLakesTasksRequest>;

export type GetProjectsLocationsLakesTasksResponse = GoogleCloudDataplexV1Task;
export const GetProjectsLocationsLakesTasksResponse = GoogleCloudDataplexV1Task;

export type GetProjectsLocationsLakesTasksError = CommonErrors;

export const getProjectsLocationsLakesTasks: API.OperationMethod<GetProjectsLocationsLakesTasksRequest, GetProjectsLocationsLakesTasksResponse, GetProjectsLocationsLakesTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsLakesTasksRequest,
  output: GetProjectsLocationsLakesTasksResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsLakesTasksRequest {
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsLakesTasksRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/tasks/{tasksId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsLakesTasksRequest>;

export type GetIamPolicyProjectsLocationsLakesTasksResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsLakesTasksResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsLakesTasksError = CommonErrors;

export const getIamPolicyProjectsLocationsLakesTasks: API.OperationMethod<GetIamPolicyProjectsLocationsLakesTasksRequest, GetIamPolicyProjectsLocationsLakesTasksResponse, GetIamPolicyProjectsLocationsLakesTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsLakesTasksRequest,
  output: GetIamPolicyProjectsLocationsLakesTasksResponse,
  errors: [],
}));

/** Update the task resource. */
export interface PatchProjectsLocationsLakesTasksRequest {
  /** Output only. The relative resource name of the task, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/ tasks/{task_id}. */
  name: string;
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1Task;
}

export const PatchProjectsLocationsLakesTasksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1Task).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/tasks/{tasksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsLakesTasksRequest>;

export type PatchProjectsLocationsLakesTasksResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsLakesTasksResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsLakesTasksError = CommonErrors;

export const patchProjectsLocationsLakesTasks: API.OperationMethod<PatchProjectsLocationsLakesTasksRequest, PatchProjectsLocationsLakesTasksResponse, PatchProjectsLocationsLakesTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsLakesTasksRequest,
  output: PatchProjectsLocationsLakesTasksResponse,
  errors: [],
}));

/** Creates a task resource within a lake. */
export interface CreateProjectsLocationsLakesTasksRequest {
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Required. The resource name of the parent lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. */
  parent: string;
  /** Required. Task identifier. */
  taskId?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1Task;
}

export const CreateProjectsLocationsLakesTasksRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  taskId: Schema.optional(Schema.String).pipe(T.HttpQuery("taskId")),
  body: Schema.optional(GoogleCloudDataplexV1Task).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/tasks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsLakesTasksRequest>;

export type CreateProjectsLocationsLakesTasksResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsLakesTasksResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsLakesTasksError = CommonErrors;

export const createProjectsLocationsLakesTasks: API.OperationMethod<CreateProjectsLocationsLakesTasksRequest, CreateProjectsLocationsLakesTasksResponse, CreateProjectsLocationsLakesTasksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsLakesTasksRequest,
  output: CreateProjectsLocationsLakesTasksResponse,
  errors: [],
}));

/** Get job resource. */
export interface GetProjectsLocationsLakesTasksJobsRequest {
  /** Required. The resource name of the job: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}/jobs/{job_id}. */
  name: string;
}

export const GetProjectsLocationsLakesTasksJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/tasks/{tasksId}/jobs/{jobsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsLakesTasksJobsRequest>;

export type GetProjectsLocationsLakesTasksJobsResponse = GoogleCloudDataplexV1Job;
export const GetProjectsLocationsLakesTasksJobsResponse = GoogleCloudDataplexV1Job;

export type GetProjectsLocationsLakesTasksJobsError = CommonErrors;

export const getProjectsLocationsLakesTasksJobs: API.OperationMethod<GetProjectsLocationsLakesTasksJobsRequest, GetProjectsLocationsLakesTasksJobsResponse, GetProjectsLocationsLakesTasksJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsLakesTasksJobsRequest,
  output: GetProjectsLocationsLakesTasksJobsResponse,
  errors: [],
}));

/** Cancel jobs running for the task resource. */
export interface CancelProjectsLocationsLakesTasksJobsRequest {
  /** Required. The resource name of the job: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/task/{task_id}/job/{job_id}. */
  name: string;
  /** Request body */
  body?: GoogleCloudDataplexV1CancelJobRequest;
}

export const CancelProjectsLocationsLakesTasksJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDataplexV1CancelJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/tasks/{tasksId}/jobs/{jobsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsLakesTasksJobsRequest>;

export type CancelProjectsLocationsLakesTasksJobsResponse = Empty;
export const CancelProjectsLocationsLakesTasksJobsResponse = Empty;

export type CancelProjectsLocationsLakesTasksJobsError = CommonErrors;

export const cancelProjectsLocationsLakesTasksJobs: API.OperationMethod<CancelProjectsLocationsLakesTasksJobsRequest, CancelProjectsLocationsLakesTasksJobsResponse, CancelProjectsLocationsLakesTasksJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsLakesTasksJobsRequest,
  output: CancelProjectsLocationsLakesTasksJobsResponse,
  errors: [],
}));

/** Lists Jobs under the given task. */
export interface ListProjectsLocationsLakesTasksJobsRequest {
  /** Optional. Maximum number of jobs to return. The service may return fewer than this value. If unspecified, at most 10 jobs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. The resource name of the parent environment: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/tasks/{task_id}. */
  parent: string;
  /** Optional. Page token received from a previous ListJobs call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListJobs must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsLakesTasksJobsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/tasks/{tasksId}/jobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsLakesTasksJobsRequest>;

export type ListProjectsLocationsLakesTasksJobsResponse = GoogleCloudDataplexV1ListJobsResponse;
export const ListProjectsLocationsLakesTasksJobsResponse = GoogleCloudDataplexV1ListJobsResponse;

export type ListProjectsLocationsLakesTasksJobsError = CommonErrors;

export const listProjectsLocationsLakesTasksJobs = API.makePaginated(() => ({
  input: ListProjectsLocationsLakesTasksJobsRequest,
  output: ListProjectsLocationsLakesTasksJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsLakesZonesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsLakesZonesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsLakesZonesRequest>;

export type TestIamPermissionsProjectsLocationsLakesZonesResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsLakesZonesResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsLakesZonesError = CommonErrors;

export const testIamPermissionsProjectsLocationsLakesZones: API.OperationMethod<TestIamPermissionsProjectsLocationsLakesZonesRequest, TestIamPermissionsProjectsLocationsLakesZonesResponse, TestIamPermissionsProjectsLocationsLakesZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsLakesZonesRequest,
  output: TestIamPermissionsProjectsLocationsLakesZonesResponse,
  errors: [],
}));

/** Deletes a zone resource. All assets within a zone must be deleted before the zone can be deleted. */
export interface DeleteProjectsLocationsLakesZonesRequest {
  /** Required. The resource name of the zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. */
  name: string;
}

export const DeleteProjectsLocationsLakesZonesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsLakesZonesRequest>;

export type DeleteProjectsLocationsLakesZonesResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsLakesZonesResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsLakesZonesError = CommonErrors;

export const deleteProjectsLocationsLakesZones: API.OperationMethod<DeleteProjectsLocationsLakesZonesRequest, DeleteProjectsLocationsLakesZonesResponse, DeleteProjectsLocationsLakesZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsLakesZonesRequest,
  output: DeleteProjectsLocationsLakesZonesResponse,
  errors: [],
}));

/** Creates a zone resource within a lake. */
export interface CreateProjectsLocationsLakesZonesRequest {
  /** Required. Zone identifier. This ID will be used to generate names such as database and dataset names when publishing metadata to Hive Metastore and BigQuery. * Must contain only lowercase letters, numbers and hyphens. * Must start with a letter. * Must end with a number or a letter. * Must be between 1-63 characters. * Must be unique across all lakes from all locations in a project. * Must not be one of the reserved IDs (i.e. "default", "global-temp") */
  zoneId?: string;
  /** Required. The resource name of the parent lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. */
  parent: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1Zone;
}

export const CreateProjectsLocationsLakesZonesRequest = Schema.Struct({
  zoneId: Schema.optional(Schema.String).pipe(T.HttpQuery("zoneId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1Zone).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsLakesZonesRequest>;

export type CreateProjectsLocationsLakesZonesResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsLakesZonesResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsLakesZonesError = CommonErrors;

export const createProjectsLocationsLakesZones: API.OperationMethod<CreateProjectsLocationsLakesZonesRequest, CreateProjectsLocationsLakesZonesResponse, CreateProjectsLocationsLakesZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsLakesZonesRequest,
  output: CreateProjectsLocationsLakesZonesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsLakesZonesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsLakesZonesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsLakesZonesRequest>;

export type SetIamPolicyProjectsLocationsLakesZonesResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsLakesZonesResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsLakesZonesError = CommonErrors;

export const setIamPolicyProjectsLocationsLakesZones: API.OperationMethod<SetIamPolicyProjectsLocationsLakesZonesRequest, SetIamPolicyProjectsLocationsLakesZonesResponse, SetIamPolicyProjectsLocationsLakesZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsLakesZonesRequest,
  output: SetIamPolicyProjectsLocationsLakesZonesResponse,
  errors: [],
}));

/** Lists zone resources in a lake. */
export interface ListProjectsLocationsLakesZonesRequest {
  /** Optional. Page token received from a previous ListZones call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListZones must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The resource name of the parent lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. */
  parent: string;
  /** Optional. Order by fields for the result. */
  orderBy?: string;
  /** Optional. Maximum number of zones to return. The service may return fewer than this value. If unspecified, at most 10 zones will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Filter request. */
  filter?: string;
}

export const ListProjectsLocationsLakesZonesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsLakesZonesRequest>;

export type ListProjectsLocationsLakesZonesResponse = GoogleCloudDataplexV1ListZonesResponse;
export const ListProjectsLocationsLakesZonesResponse = GoogleCloudDataplexV1ListZonesResponse;

export type ListProjectsLocationsLakesZonesError = CommonErrors;

export const listProjectsLocationsLakesZones = API.makePaginated(() => ({
  input: ListProjectsLocationsLakesZonesRequest,
  output: ListProjectsLocationsLakesZonesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsLakesZonesRequest {
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsLakesZonesRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsLakesZonesRequest>;

export type GetIamPolicyProjectsLocationsLakesZonesResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsLakesZonesResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsLakesZonesError = CommonErrors;

export const getIamPolicyProjectsLocationsLakesZones: API.OperationMethod<GetIamPolicyProjectsLocationsLakesZonesRequest, GetIamPolicyProjectsLocationsLakesZonesResponse, GetIamPolicyProjectsLocationsLakesZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsLakesZonesRequest,
  output: GetIamPolicyProjectsLocationsLakesZonesResponse,
  errors: [],
}));

/** Updates a zone resource. */
export interface PatchProjectsLocationsLakesZonesRequest {
  /** Output only. The relative resource name of the zone, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. */
  name: string;
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1Zone;
}

export const PatchProjectsLocationsLakesZonesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1Zone).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsLakesZonesRequest>;

export type PatchProjectsLocationsLakesZonesResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsLakesZonesResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsLakesZonesError = CommonErrors;

export const patchProjectsLocationsLakesZones: API.OperationMethod<PatchProjectsLocationsLakesZonesRequest, PatchProjectsLocationsLakesZonesResponse, PatchProjectsLocationsLakesZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsLakesZonesRequest,
  output: PatchProjectsLocationsLakesZonesResponse,
  errors: [],
}));

/** Retrieves a zone resource. */
export interface GetProjectsLocationsLakesZonesRequest {
  /** Required. The resource name of the zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. */
  name: string;
}

export const GetProjectsLocationsLakesZonesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsLakesZonesRequest>;

export type GetProjectsLocationsLakesZonesResponse = GoogleCloudDataplexV1Zone;
export const GetProjectsLocationsLakesZonesResponse = GoogleCloudDataplexV1Zone;

export type GetProjectsLocationsLakesZonesError = CommonErrors;

export const getProjectsLocationsLakesZones: API.OperationMethod<GetProjectsLocationsLakesZonesRequest, GetProjectsLocationsLakesZonesResponse, GetProjectsLocationsLakesZonesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsLakesZonesRequest,
  output: GetProjectsLocationsLakesZonesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsLakesZonesAssetsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsLakesZonesAssetsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/assets/{assetsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsLakesZonesAssetsRequest>;

export type GetIamPolicyProjectsLocationsLakesZonesAssetsResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsLakesZonesAssetsResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsLakesZonesAssetsError = CommonErrors;

export const getIamPolicyProjectsLocationsLakesZonesAssets: API.OperationMethod<GetIamPolicyProjectsLocationsLakesZonesAssetsRequest, GetIamPolicyProjectsLocationsLakesZonesAssetsResponse, GetIamPolicyProjectsLocationsLakesZonesAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsLakesZonesAssetsRequest,
  output: GetIamPolicyProjectsLocationsLakesZonesAssetsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsLakesZonesAssetsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsLakesZonesAssetsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/assets/{assetsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsLakesZonesAssetsRequest>;

export type SetIamPolicyProjectsLocationsLakesZonesAssetsResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsLakesZonesAssetsResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsLakesZonesAssetsError = CommonErrors;

export const setIamPolicyProjectsLocationsLakesZonesAssets: API.OperationMethod<SetIamPolicyProjectsLocationsLakesZonesAssetsRequest, SetIamPolicyProjectsLocationsLakesZonesAssetsResponse, SetIamPolicyProjectsLocationsLakesZonesAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsLakesZonesAssetsRequest,
  output: SetIamPolicyProjectsLocationsLakesZonesAssetsResponse,
  errors: [],
}));

/** Retrieves an asset resource. */
export interface GetProjectsLocationsLakesZonesAssetsRequest {
  /** Required. The resource name of the asset: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}. */
  name: string;
}

export const GetProjectsLocationsLakesZonesAssetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/assets/{assetsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsLakesZonesAssetsRequest>;

export type GetProjectsLocationsLakesZonesAssetsResponse = GoogleCloudDataplexV1Asset;
export const GetProjectsLocationsLakesZonesAssetsResponse = GoogleCloudDataplexV1Asset;

export type GetProjectsLocationsLakesZonesAssetsError = CommonErrors;

export const getProjectsLocationsLakesZonesAssets: API.OperationMethod<GetProjectsLocationsLakesZonesAssetsRequest, GetProjectsLocationsLakesZonesAssetsResponse, GetProjectsLocationsLakesZonesAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsLakesZonesAssetsRequest,
  output: GetProjectsLocationsLakesZonesAssetsResponse,
  errors: [],
}));

/** Deletes an asset resource. The referenced storage resource is detached (default) or deleted based on the associated Lifecycle policy. */
export interface DeleteProjectsLocationsLakesZonesAssetsRequest {
  /** Required. The resource name of the asset: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}. */
  name: string;
}

export const DeleteProjectsLocationsLakesZonesAssetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/assets/{assetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsLakesZonesAssetsRequest>;

export type DeleteProjectsLocationsLakesZonesAssetsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsLakesZonesAssetsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsLakesZonesAssetsError = CommonErrors;

export const deleteProjectsLocationsLakesZonesAssets: API.OperationMethod<DeleteProjectsLocationsLakesZonesAssetsRequest, DeleteProjectsLocationsLakesZonesAssetsResponse, DeleteProjectsLocationsLakesZonesAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsLakesZonesAssetsRequest,
  output: DeleteProjectsLocationsLakesZonesAssetsResponse,
  errors: [],
}));

/** Creates an asset resource. */
export interface CreateProjectsLocationsLakesZonesAssetsRequest {
  /** Required. Asset identifier. This ID will be used to generate names such as table names when publishing metadata to Hive Metastore and BigQuery. * Must contain only lowercase letters, numbers and hyphens. * Must start with a letter. * Must end with a number or a letter. * Must be between 1-63 characters. * Must be unique within the zone. */
  assetId?: string;
  /** Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. */
  parent: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1Asset;
}

export const CreateProjectsLocationsLakesZonesAssetsRequest = Schema.Struct({
  assetId: Schema.optional(Schema.String).pipe(T.HttpQuery("assetId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1Asset).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/assets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsLakesZonesAssetsRequest>;

export type CreateProjectsLocationsLakesZonesAssetsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsLakesZonesAssetsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsLakesZonesAssetsError = CommonErrors;

export const createProjectsLocationsLakesZonesAssets: API.OperationMethod<CreateProjectsLocationsLakesZonesAssetsRequest, CreateProjectsLocationsLakesZonesAssetsResponse, CreateProjectsLocationsLakesZonesAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsLakesZonesAssetsRequest,
  output: CreateProjectsLocationsLakesZonesAssetsResponse,
  errors: [],
}));

/** Updates an asset resource. */
export interface PatchProjectsLocationsLakesZonesAssetsRequest {
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** Output only. The relative resource name of the asset, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}. */
  name: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1Asset;
}

export const PatchProjectsLocationsLakesZonesAssetsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1Asset).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/assets/{assetsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsLakesZonesAssetsRequest>;

export type PatchProjectsLocationsLakesZonesAssetsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsLakesZonesAssetsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsLakesZonesAssetsError = CommonErrors;

export const patchProjectsLocationsLakesZonesAssets: API.OperationMethod<PatchProjectsLocationsLakesZonesAssetsRequest, PatchProjectsLocationsLakesZonesAssetsResponse, PatchProjectsLocationsLakesZonesAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsLakesZonesAssetsRequest,
  output: PatchProjectsLocationsLakesZonesAssetsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsLakesZonesAssetsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsLakesZonesAssetsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/assets/{assetsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsLakesZonesAssetsRequest>;

export type TestIamPermissionsProjectsLocationsLakesZonesAssetsResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsLakesZonesAssetsResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsLakesZonesAssetsError = CommonErrors;

export const testIamPermissionsProjectsLocationsLakesZonesAssets: API.OperationMethod<TestIamPermissionsProjectsLocationsLakesZonesAssetsRequest, TestIamPermissionsProjectsLocationsLakesZonesAssetsResponse, TestIamPermissionsProjectsLocationsLakesZonesAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsLakesZonesAssetsRequest,
  output: TestIamPermissionsProjectsLocationsLakesZonesAssetsResponse,
  errors: [],
}));

/** Lists asset resources in a zone. */
export interface ListProjectsLocationsLakesZonesAssetsRequest {
  /** Optional. Order by fields for the result. */
  orderBy?: string;
  /** Optional. Filter request. */
  filter?: string;
  /** Optional. Page token received from a previous ListAssets call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListAssets must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Maximum number of asset to return. The service may return fewer than this value. If unspecified, at most 10 assets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. */
  parent: string;
}

export const ListProjectsLocationsLakesZonesAssetsRequest = Schema.Struct({
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/assets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsLakesZonesAssetsRequest>;

export type ListProjectsLocationsLakesZonesAssetsResponse = GoogleCloudDataplexV1ListAssetsResponse;
export const ListProjectsLocationsLakesZonesAssetsResponse = GoogleCloudDataplexV1ListAssetsResponse;

export type ListProjectsLocationsLakesZonesAssetsError = CommonErrors;

export const listProjectsLocationsLakesZonesAssets = API.makePaginated(() => ({
  input: ListProjectsLocationsLakesZonesAssetsRequest,
  output: ListProjectsLocationsLakesZonesAssetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists action resources in an asset. */
export interface ListProjectsLocationsLakesZonesAssetsActionsRequest {
  /** Optional. Maximum number of actions to return. The service may return fewer than this value. If unspecified, at most 10 actions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Required. The resource name of the parent asset: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/assets/{asset_id}. */
  parent: string;
  /** Optional. Page token received from a previous ListAssetActions call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListAssetActions must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsLakesZonesAssetsActionsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/assets/{assetsId}/actions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsLakesZonesAssetsActionsRequest>;

export type ListProjectsLocationsLakesZonesAssetsActionsResponse = GoogleCloudDataplexV1ListActionsResponse;
export const ListProjectsLocationsLakesZonesAssetsActionsResponse = GoogleCloudDataplexV1ListActionsResponse;

export type ListProjectsLocationsLakesZonesAssetsActionsError = CommonErrors;

export const listProjectsLocationsLakesZonesAssetsActions = API.makePaginated(() => ({
  input: ListProjectsLocationsLakesZonesAssetsActionsRequest,
  output: ListProjectsLocationsLakesZonesAssetsActionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Delete a metadata entity. */
export interface DeleteProjectsLocationsLakesZonesEntitiesRequest {
  /** Required. The resource name of the entity: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}. */
  name: string;
  /** Required. The etag associated with the entity, which can be retrieved with a GetEntity request. */
  etag?: string;
}

export const DeleteProjectsLocationsLakesZonesEntitiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/entities/{entitiesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsLakesZonesEntitiesRequest>;

export type DeleteProjectsLocationsLakesZonesEntitiesResponse = Empty;
export const DeleteProjectsLocationsLakesZonesEntitiesResponse = Empty;

export type DeleteProjectsLocationsLakesZonesEntitiesError = CommonErrors;

export const deleteProjectsLocationsLakesZonesEntities: API.OperationMethod<DeleteProjectsLocationsLakesZonesEntitiesRequest, DeleteProjectsLocationsLakesZonesEntitiesResponse, DeleteProjectsLocationsLakesZonesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsLakesZonesEntitiesRequest,
  output: DeleteProjectsLocationsLakesZonesEntitiesResponse,
  errors: [],
}));

/** Create a metadata entity. */
export interface CreateProjectsLocationsLakesZonesEntitiesRequest {
  /** Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. */
  parent: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1Entity;
}

export const CreateProjectsLocationsLakesZonesEntitiesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1Entity).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/entities", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsLakesZonesEntitiesRequest>;

export type CreateProjectsLocationsLakesZonesEntitiesResponse = GoogleCloudDataplexV1Entity;
export const CreateProjectsLocationsLakesZonesEntitiesResponse = GoogleCloudDataplexV1Entity;

export type CreateProjectsLocationsLakesZonesEntitiesError = CommonErrors;

export const createProjectsLocationsLakesZonesEntities: API.OperationMethod<CreateProjectsLocationsLakesZonesEntitiesRequest, CreateProjectsLocationsLakesZonesEntitiesResponse, CreateProjectsLocationsLakesZonesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsLakesZonesEntitiesRequest,
  output: CreateProjectsLocationsLakesZonesEntitiesResponse,
  errors: [],
}));

/** Get a metadata entity. */
export interface GetProjectsLocationsLakesZonesEntitiesRequest {
  /** Required. The resource name of the entity: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}. */
  name: string;
  /** Optional. Used to select the subset of entity information to return. Defaults to BASIC. */
  view?: "ENTITY_VIEW_UNSPECIFIED" | "BASIC" | "SCHEMA" | "FULL" | (string & {});
}

export const GetProjectsLocationsLakesZonesEntitiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/entities/{entitiesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsLakesZonesEntitiesRequest>;

export type GetProjectsLocationsLakesZonesEntitiesResponse = GoogleCloudDataplexV1Entity;
export const GetProjectsLocationsLakesZonesEntitiesResponse = GoogleCloudDataplexV1Entity;

export type GetProjectsLocationsLakesZonesEntitiesError = CommonErrors;

export const getProjectsLocationsLakesZonesEntities: API.OperationMethod<GetProjectsLocationsLakesZonesEntitiesRequest, GetProjectsLocationsLakesZonesEntitiesResponse, GetProjectsLocationsLakesZonesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsLakesZonesEntitiesRequest,
  output: GetProjectsLocationsLakesZonesEntitiesResponse,
  errors: [],
}));

/** Update a metadata entity. Only supports full resource update. */
export interface UpdateProjectsLocationsLakesZonesEntitiesRequest {
  /** Output only. The resource name of the entity, of the form: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{id}. */
  name: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1Entity;
}

export const UpdateProjectsLocationsLakesZonesEntitiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1Entity).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PUT", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/entities/{entitiesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateProjectsLocationsLakesZonesEntitiesRequest>;

export type UpdateProjectsLocationsLakesZonesEntitiesResponse = GoogleCloudDataplexV1Entity;
export const UpdateProjectsLocationsLakesZonesEntitiesResponse = GoogleCloudDataplexV1Entity;

export type UpdateProjectsLocationsLakesZonesEntitiesError = CommonErrors;

export const updateProjectsLocationsLakesZonesEntities: API.OperationMethod<UpdateProjectsLocationsLakesZonesEntitiesRequest, UpdateProjectsLocationsLakesZonesEntitiesResponse, UpdateProjectsLocationsLakesZonesEntitiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateProjectsLocationsLakesZonesEntitiesRequest,
  output: UpdateProjectsLocationsLakesZonesEntitiesResponse,
  errors: [],
}));

/** List metadata entities in a zone. */
export interface ListProjectsLocationsLakesZonesEntitiesRequest {
  /** Optional. Page token received from a previous ListEntities call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListEntities must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. */
  parent: string;
  /** Optional. The following filter parameters can be added to the URL to limit the entities returned by the API: Entity ID: ?filter="id=entityID" Asset ID: ?filter="asset=assetID" Data path ?filter="data_path=gs://my-bucket" Is HIVE compatible: ?filter="hive_compatible=true" Is BigQuery compatible: ?filter="bigquery_compatible=true" */
  filter?: string;
  /** Required. Specify the entity view to make a partial list request. */
  view?: "ENTITY_VIEW_UNSPECIFIED" | "TABLES" | "FILESETS" | (string & {});
  /** Optional. Maximum number of entities to return. The service may return fewer than this value. If unspecified, 100 entities will be returned by default. The maximum value is 500; larger values will will be truncated to 500. */
  pageSize?: number;
}

export const ListProjectsLocationsLakesZonesEntitiesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/entities" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsLakesZonesEntitiesRequest>;

export type ListProjectsLocationsLakesZonesEntitiesResponse = GoogleCloudDataplexV1ListEntitiesResponse;
export const ListProjectsLocationsLakesZonesEntitiesResponse = GoogleCloudDataplexV1ListEntitiesResponse;

export type ListProjectsLocationsLakesZonesEntitiesError = CommonErrors;

export const listProjectsLocationsLakesZonesEntities = API.makePaginated(() => ({
  input: ListProjectsLocationsLakesZonesEntitiesRequest,
  output: ListProjectsLocationsLakesZonesEntitiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Create a metadata partition. */
export interface CreateProjectsLocationsLakesZonesEntitiesPartitionsRequest {
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}. */
  parent: string;
  /** Request body */
  body?: GoogleCloudDataplexV1Partition;
}

export const CreateProjectsLocationsLakesZonesEntitiesPartitionsRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDataplexV1Partition).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/entities/{entitiesId}/partitions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsLakesZonesEntitiesPartitionsRequest>;

export type CreateProjectsLocationsLakesZonesEntitiesPartitionsResponse = GoogleCloudDataplexV1Partition;
export const CreateProjectsLocationsLakesZonesEntitiesPartitionsResponse = GoogleCloudDataplexV1Partition;

export type CreateProjectsLocationsLakesZonesEntitiesPartitionsError = CommonErrors;

export const createProjectsLocationsLakesZonesEntitiesPartitions: API.OperationMethod<CreateProjectsLocationsLakesZonesEntitiesPartitionsRequest, CreateProjectsLocationsLakesZonesEntitiesPartitionsResponse, CreateProjectsLocationsLakesZonesEntitiesPartitionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsLakesZonesEntitiesPartitionsRequest,
  output: CreateProjectsLocationsLakesZonesEntitiesPartitionsResponse,
  errors: [],
}));

/** List metadata partitions of an entity. */
export interface ListProjectsLocationsLakesZonesEntitiesPartitionsRequest {
  /** Required. The resource name of the parent entity: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}. */
  parent: string;
  /** Optional. Page token received from a previous ListPartitions call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListPartitions must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filter the partitions returned to the caller using a key value pair expression. Supported operators and syntax: logic operators: AND, OR comparison operators: <, >, >=, <= ,=, != LIKE operators: The right hand of a LIKE operator supports "." and "*" for wildcard searches, for example "value1 LIKE ".*oo.*" parenthetical grouping: ( )Sample filter expression: `?filter="key1 < value1 OR key2 > value2"Notes: Keys to the left of operators are case insensitive. Partition results are sorted first by creation time, then by lexicographic order. Up to 20 key value filter pairs are allowed, but due to performance considerations, only the first 10 will be used as a filter. */
  filter?: string;
  /** Optional. Maximum number of partitions to return. The service may return fewer than this value. If unspecified, 100 partitions will be returned by default. The maximum page size is 500; larger values will will be truncated to 500. */
  pageSize?: number;
}

export const ListProjectsLocationsLakesZonesEntitiesPartitionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/entities/{entitiesId}/partitions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsLakesZonesEntitiesPartitionsRequest>;

export type ListProjectsLocationsLakesZonesEntitiesPartitionsResponse = GoogleCloudDataplexV1ListPartitionsResponse;
export const ListProjectsLocationsLakesZonesEntitiesPartitionsResponse = GoogleCloudDataplexV1ListPartitionsResponse;

export type ListProjectsLocationsLakesZonesEntitiesPartitionsError = CommonErrors;

export const listProjectsLocationsLakesZonesEntitiesPartitions = API.makePaginated(() => ({
  input: ListProjectsLocationsLakesZonesEntitiesPartitionsRequest,
  output: ListProjectsLocationsLakesZonesEntitiesPartitionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a metadata partition of an entity. */
export interface GetProjectsLocationsLakesZonesEntitiesPartitionsRequest {
  /** Required. The resource name of the partition: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}/partitions/{partition_value_path}. The {partition_value_path} segment consists of an ordered sequence of partition values separated by "/". All values must be provided. */
  name: string;
}

export const GetProjectsLocationsLakesZonesEntitiesPartitionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/entities/{entitiesId}/partitions/{partitionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsLakesZonesEntitiesPartitionsRequest>;

export type GetProjectsLocationsLakesZonesEntitiesPartitionsResponse = GoogleCloudDataplexV1Partition;
export const GetProjectsLocationsLakesZonesEntitiesPartitionsResponse = GoogleCloudDataplexV1Partition;

export type GetProjectsLocationsLakesZonesEntitiesPartitionsError = CommonErrors;

export const getProjectsLocationsLakesZonesEntitiesPartitions: API.OperationMethod<GetProjectsLocationsLakesZonesEntitiesPartitionsRequest, GetProjectsLocationsLakesZonesEntitiesPartitionsResponse, GetProjectsLocationsLakesZonesEntitiesPartitionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsLakesZonesEntitiesPartitionsRequest,
  output: GetProjectsLocationsLakesZonesEntitiesPartitionsResponse,
  errors: [],
}));

/** Delete a metadata partition. */
export interface DeleteProjectsLocationsLakesZonesEntitiesPartitionsRequest {
  /** Optional. The etag associated with the partition. */
  etag?: string;
  /** Required. The resource name of the partition. format: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}/entities/{entity_id}/partitions/{partition_value_path}. The {partition_value_path} segment consists of an ordered sequence of partition values separated by "/". All values must be provided. */
  name: string;
}

export const DeleteProjectsLocationsLakesZonesEntitiesPartitionsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/entities/{entitiesId}/partitions/{partitionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsLakesZonesEntitiesPartitionsRequest>;

export type DeleteProjectsLocationsLakesZonesEntitiesPartitionsResponse = Empty;
export const DeleteProjectsLocationsLakesZonesEntitiesPartitionsResponse = Empty;

export type DeleteProjectsLocationsLakesZonesEntitiesPartitionsError = CommonErrors;

export const deleteProjectsLocationsLakesZonesEntitiesPartitions: API.OperationMethod<DeleteProjectsLocationsLakesZonesEntitiesPartitionsRequest, DeleteProjectsLocationsLakesZonesEntitiesPartitionsResponse, DeleteProjectsLocationsLakesZonesEntitiesPartitionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsLakesZonesEntitiesPartitionsRequest,
  output: DeleteProjectsLocationsLakesZonesEntitiesPartitionsResponse,
  errors: [],
}));

/** Lists action resources in a zone. */
export interface ListProjectsLocationsLakesZonesActionsRequest {
  /** Required. The resource name of the parent zone: projects/{project_number}/locations/{location_id}/lakes/{lake_id}/zones/{zone_id}. */
  parent: string;
  /** Optional. Page token received from a previous ListZoneActions call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListZoneActions must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Maximum number of actions to return. The service may return fewer than this value. If unspecified, at most 10 actions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsLakesZonesActionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/zones/{zonesId}/actions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsLakesZonesActionsRequest>;

export type ListProjectsLocationsLakesZonesActionsResponse = GoogleCloudDataplexV1ListActionsResponse;
export const ListProjectsLocationsLakesZonesActionsResponse = GoogleCloudDataplexV1ListActionsResponse;

export type ListProjectsLocationsLakesZonesActionsError = CommonErrors;

export const listProjectsLocationsLakesZonesActions = API.makePaginated(() => ({
  input: ListProjectsLocationsLakesZonesActionsRequest,
  output: ListProjectsLocationsLakesZonesActionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists action resources in a lake. */
export interface ListProjectsLocationsLakesActionsRequest {
  /** Optional. Maximum number of actions to return. The service may return fewer than this value. If unspecified, at most 10 actions will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Page token received from a previous ListLakeActions call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListLakeActions must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The resource name of the parent lake: projects/{project_number}/locations/{location_id}/lakes/{lake_id}. */
  parent: string;
}

export const ListProjectsLocationsLakesActionsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/actions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsLakesActionsRequest>;

export type ListProjectsLocationsLakesActionsResponse = GoogleCloudDataplexV1ListActionsResponse;
export const ListProjectsLocationsLakesActionsResponse = GoogleCloudDataplexV1ListActionsResponse;

export type ListProjectsLocationsLakesActionsError = CommonErrors;

export const listProjectsLocationsLakesActions = API.makePaginated(() => ({
  input: ListProjectsLocationsLakesActionsRequest,
  output: ListProjectsLocationsLakesActionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the access control policy on the specified contentitem resource. Replaces any existing policy.Caller must have Google IAM dataplex.content.setIamPolicy permission on the resource. */
export interface SetIamPolicyProjectsLocationsLakesContentRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsLakesContentRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/content/{contentId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsLakesContentRequest>;

export type SetIamPolicyProjectsLocationsLakesContentResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsLakesContentResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsLakesContentError = CommonErrors;

export const setIamPolicyProjectsLocationsLakesContent: API.OperationMethod<SetIamPolicyProjectsLocationsLakesContentRequest, SetIamPolicyProjectsLocationsLakesContentResponse, SetIamPolicyProjectsLocationsLakesContentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsLakesContentRequest,
  output: SetIamPolicyProjectsLocationsLakesContentResponse,
  errors: [],
}));

/** List content. */
export interface ListProjectsLocationsLakesContentRequest {
  /** Required. The resource name of the parent lake: projects/{project_id}/locations/{location_id}/lakes/{lake_id} */
  parent: string;
  /** Optional. Page token received from a previous ListContent call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListContent must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filter request. Filters are case-sensitive. The following formats are supported:labels.key1 = "value1" labels:key1 type = "NOTEBOOK" type = "SQL_SCRIPT"These restrictions can be coinjoined with AND, OR and NOT conjunctions. */
  filter?: string;
  /** Optional. Maximum number of content to return. The service may return fewer than this value. If unspecified, at most 10 content will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsLakesContentRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/content" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsLakesContentRequest>;

export type ListProjectsLocationsLakesContentResponse = GoogleCloudDataplexV1ListContentResponse;
export const ListProjectsLocationsLakesContentResponse = GoogleCloudDataplexV1ListContentResponse;

export type ListProjectsLocationsLakesContentError = CommonErrors;

export const listProjectsLocationsLakesContent = API.makePaginated(() => ({
  input: ListProjectsLocationsLakesContentRequest,
  output: ListProjectsLocationsLakesContentResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Get a content resource. */
export interface GetProjectsLocationsLakesContentRequest {
  /** Required. The resource name of the content: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/content/{content_id} */
  name: string;
  /** Optional. Specify content view to make a partial request. */
  view?: "CONTENT_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetProjectsLocationsLakesContentRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/content/{contentId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsLakesContentRequest>;

export type GetProjectsLocationsLakesContentResponse = GoogleCloudDataplexV1Content;
export const GetProjectsLocationsLakesContentResponse = GoogleCloudDataplexV1Content;

export type GetProjectsLocationsLakesContentError = CommonErrors;

export const getProjectsLocationsLakesContent: API.OperationMethod<GetProjectsLocationsLakesContentRequest, GetProjectsLocationsLakesContentResponse, GetProjectsLocationsLakesContentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsLakesContentRequest,
  output: GetProjectsLocationsLakesContentResponse,
  errors: [],
}));

/** Returns the caller's permissions on a resource. If the resource does not exist, an empty set of permissions is returned (a NOT_FOUND error is not returned).A caller is not required to have Google IAM permission to make this request.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsLakesContentRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsLakesContentRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/content/{contentId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsLakesContentRequest>;

export type TestIamPermissionsProjectsLocationsLakesContentResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsLakesContentResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsLakesContentError = CommonErrors;

export const testIamPermissionsProjectsLocationsLakesContent: API.OperationMethod<TestIamPermissionsProjectsLocationsLakesContentRequest, TestIamPermissionsProjectsLocationsLakesContentResponse, TestIamPermissionsProjectsLocationsLakesContentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsLakesContentRequest,
  output: TestIamPermissionsProjectsLocationsLakesContentResponse,
  errors: [],
}));

/** Create a content. */
export interface CreateProjectsLocationsLakesContentRequest {
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Required. The resource name of the parent lake: projects/{project_id}/locations/{location_id}/lakes/{lake_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudDataplexV1Content;
}

export const CreateProjectsLocationsLakesContentRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDataplexV1Content).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/content", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsLakesContentRequest>;

export type CreateProjectsLocationsLakesContentResponse = GoogleCloudDataplexV1Content;
export const CreateProjectsLocationsLakesContentResponse = GoogleCloudDataplexV1Content;

export type CreateProjectsLocationsLakesContentError = CommonErrors;

export const createProjectsLocationsLakesContent: API.OperationMethod<CreateProjectsLocationsLakesContentRequest, CreateProjectsLocationsLakesContentResponse, CreateProjectsLocationsLakesContentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsLakesContentRequest,
  output: CreateProjectsLocationsLakesContentResponse,
  errors: [],
}));

/** Gets the access control policy for a contentitem resource. A NOT_FOUND error is returned if the resource does not exist. An empty policy is returned if the resource exists but does not have a policy set on it.Caller must have Google IAM dataplex.content.getIamPolicy permission on the resource. */
export interface GetIamPolicyProjectsLocationsLakesContentRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsLakesContentRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/content/{contentId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsLakesContentRequest>;

export type GetIamPolicyProjectsLocationsLakesContentResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsLakesContentResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsLakesContentError = CommonErrors;

export const getIamPolicyProjectsLocationsLakesContent: API.OperationMethod<GetIamPolicyProjectsLocationsLakesContentRequest, GetIamPolicyProjectsLocationsLakesContentResponse, GetIamPolicyProjectsLocationsLakesContentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsLakesContentRequest,
  output: GetIamPolicyProjectsLocationsLakesContentResponse,
  errors: [],
}));

/** Delete a content. */
export interface DeleteProjectsLocationsLakesContentRequest {
  /** Required. The resource name of the content: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/content/{content_id} */
  name: string;
}

export const DeleteProjectsLocationsLakesContentRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/content/{contentId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsLakesContentRequest>;

export type DeleteProjectsLocationsLakesContentResponse = Empty;
export const DeleteProjectsLocationsLakesContentResponse = Empty;

export type DeleteProjectsLocationsLakesContentError = CommonErrors;

export const deleteProjectsLocationsLakesContent: API.OperationMethod<DeleteProjectsLocationsLakesContentRequest, DeleteProjectsLocationsLakesContentResponse, DeleteProjectsLocationsLakesContentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsLakesContentRequest,
  output: DeleteProjectsLocationsLakesContentResponse,
  errors: [],
}));

/** Update a content. Only supports full resource update. */
export interface PatchProjectsLocationsLakesContentRequest {
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** Output only. The relative resource name of the content, of the form: projects/{project_id}/locations/{location_id}/lakes/{lake_id}/content/{content_id} */
  name: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1Content;
}

export const PatchProjectsLocationsLakesContentRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1Content).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/lakes/{lakesId}/content/{contentId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsLakesContentRequest>;

export type PatchProjectsLocationsLakesContentResponse = GoogleCloudDataplexV1Content;
export const PatchProjectsLocationsLakesContentResponse = GoogleCloudDataplexV1Content;

export type PatchProjectsLocationsLakesContentError = CommonErrors;

export const patchProjectsLocationsLakesContent: API.OperationMethod<PatchProjectsLocationsLakesContentRequest, PatchProjectsLocationsLakesContentResponse, PatchProjectsLocationsLakesContentError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsLakesContentRequest,
  output: PatchProjectsLocationsLakesContentResponse,
  errors: [],
}));

/** Deletes a MetadataFeed. */
export interface DeleteProjectsLocationsMetadataFeedsRequest {
  /** Required. The resource name of the metadata feed, in the format projects/{project_id_or_number}/locations/{location_id}/MetadataFeeds/{metadata_feed_id}. */
  name: string;
}

export const DeleteProjectsLocationsMetadataFeedsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/metadataFeeds/{metadataFeedsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsMetadataFeedsRequest>;

export type DeleteProjectsLocationsMetadataFeedsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsMetadataFeedsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsMetadataFeedsError = CommonErrors;

export const deleteProjectsLocationsMetadataFeeds: API.OperationMethod<DeleteProjectsLocationsMetadataFeedsRequest, DeleteProjectsLocationsMetadataFeedsResponse, DeleteProjectsLocationsMetadataFeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsMetadataFeedsRequest,
  output: DeleteProjectsLocationsMetadataFeedsResponse,
  errors: [],
}));

/** Creates a MetadataFeed. */
export interface CreateProjectsLocationsMetadataFeedsRequest {
  /** Optional. The service validates the request without performing any mutations. The default is false. */
  validateOnly?: boolean;
  /** Optional. The metadata job ID. If not provided, a unique ID is generated with the prefix metadata-job-. */
  metadataFeedId?: string;
  /** Required. The resource name of the parent location, in the format projects/{project_id_or_number}/locations/{location_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudDataplexV1MetadataFeed;
}

export const CreateProjectsLocationsMetadataFeedsRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  metadataFeedId: Schema.optional(Schema.String).pipe(T.HttpQuery("metadataFeedId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDataplexV1MetadataFeed).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/metadataFeeds", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsMetadataFeedsRequest>;

export type CreateProjectsLocationsMetadataFeedsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsMetadataFeedsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsMetadataFeedsError = CommonErrors;

export const createProjectsLocationsMetadataFeeds: API.OperationMethod<CreateProjectsLocationsMetadataFeedsRequest, CreateProjectsLocationsMetadataFeedsResponse, CreateProjectsLocationsMetadataFeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsMetadataFeedsRequest,
  output: CreateProjectsLocationsMetadataFeedsResponse,
  errors: [],
}));

/** Gets a MetadataFeed. */
export interface GetProjectsLocationsMetadataFeedsRequest {
  /** Required. The resource name of the metadata feed, in the format projects/{project_id_or_number}/locations/{location_id}/MetadataFeeds/{metadata_feed_id}. */
  name: string;
}

export const GetProjectsLocationsMetadataFeedsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/metadataFeeds/{metadataFeedsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsMetadataFeedsRequest>;

export type GetProjectsLocationsMetadataFeedsResponse = GoogleCloudDataplexV1MetadataFeed;
export const GetProjectsLocationsMetadataFeedsResponse = GoogleCloudDataplexV1MetadataFeed;

export type GetProjectsLocationsMetadataFeedsError = CommonErrors;

export const getProjectsLocationsMetadataFeeds: API.OperationMethod<GetProjectsLocationsMetadataFeedsRequest, GetProjectsLocationsMetadataFeedsResponse, GetProjectsLocationsMetadataFeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsMetadataFeedsRequest,
  output: GetProjectsLocationsMetadataFeedsResponse,
  errors: [],
}));

/** Retrieve a list of MetadataFeeds. */
export interface ListProjectsLocationsMetadataFeedsRequest {
  /** Required. The resource name of the parent location, in the format projects/{project_id_or_number}/locations/{location_id} */
  parent: string;
  /** Optional. Filter request. Filters are case-sensitive. The service supports the following formats: labels.key1 = "value1" labels:key1 name = "value"You can combine filters with AND, OR, and NOT operators. */
  filter?: string;
  /** Optional. The page token received from a previous ListMetadataFeeds call. Provide this token to retrieve the subsequent page of results. When paginating, all other parameters that are provided to the ListMetadataFeeds request must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. The maximum number of metadata feeds to return. The service might return fewer feeds than this value. If unspecified, at most 10 feeds are returned. The maximum value is 1,000. */
  pageSize?: number;
  /** Optional. The field to sort the results by, either name or create_time. If not specified, the ordering is undefined. */
  orderBy?: string;
}

export const ListProjectsLocationsMetadataFeedsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/metadataFeeds" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsMetadataFeedsRequest>;

export type ListProjectsLocationsMetadataFeedsResponse = GoogleCloudDataplexV1ListMetadataFeedsResponse;
export const ListProjectsLocationsMetadataFeedsResponse = GoogleCloudDataplexV1ListMetadataFeedsResponse;

export type ListProjectsLocationsMetadataFeedsError = CommonErrors;

export const listProjectsLocationsMetadataFeeds = API.makePaginated(() => ({
  input: ListProjectsLocationsMetadataFeedsRequest,
  output: ListProjectsLocationsMetadataFeedsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a MetadataFeed. */
export interface PatchProjectsLocationsMetadataFeedsRequest {
  /** Optional. Mask of fields to update. */
  updateMask?: string;
  /** Identifier. The resource name of the metadata feed, in the format projects/{project_id_or_number}/locations/{location_id}/metadataFeeds/{metadata_feed_id}. */
  name: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1MetadataFeed;
}

export const PatchProjectsLocationsMetadataFeedsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1MetadataFeed).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/metadataFeeds/{metadataFeedsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsMetadataFeedsRequest>;

export type PatchProjectsLocationsMetadataFeedsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsMetadataFeedsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsMetadataFeedsError = CommonErrors;

export const patchProjectsLocationsMetadataFeeds: API.OperationMethod<PatchProjectsLocationsMetadataFeedsRequest, PatchProjectsLocationsMetadataFeedsResponse, PatchProjectsLocationsMetadataFeedsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsMetadataFeedsRequest,
  output: PatchProjectsLocationsMetadataFeedsResponse,
  errors: [],
}));

/** Lists AspectType resources in a project and location. */
export interface ListProjectsLocationsAspectTypesRequest {
  /** Required. The resource name of the AspectType location, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. */
  parent: string;
  /** Optional. Orders the result by name or create_time fields. If not specified, the ordering is undefined. */
  orderBy?: string;
  /** Optional. Page token received from a previous ListAspectTypes call. Provide this to retrieve the subsequent page. When paginating, all other parameters you provide to ListAspectTypes must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filter request. Filters are case-sensitive. The service supports the following formats: labels.key1 = "value1" labels:key1 name = "value"These restrictions can be conjoined with AND, OR, and NOT conjunctions. */
  filter?: string;
  /** Optional. Maximum number of AspectTypes to return. The service may return fewer than this value. If unspecified, the service returns at most 10 AspectTypes. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsAspectTypesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/aspectTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsAspectTypesRequest>;

export type ListProjectsLocationsAspectTypesResponse = GoogleCloudDataplexV1ListAspectTypesResponse;
export const ListProjectsLocationsAspectTypesResponse = GoogleCloudDataplexV1ListAspectTypesResponse;

export type ListProjectsLocationsAspectTypesError = CommonErrors;

export const listProjectsLocationsAspectTypes = API.makePaginated(() => ({
  input: ListProjectsLocationsAspectTypesRequest,
  output: ListProjectsLocationsAspectTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsAspectTypesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsAspectTypesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/aspectTypes/{aspectTypesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsAspectTypesRequest>;

export type GetIamPolicyProjectsLocationsAspectTypesResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsAspectTypesResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsAspectTypesError = CommonErrors;

export const getIamPolicyProjectsLocationsAspectTypes: API.OperationMethod<GetIamPolicyProjectsLocationsAspectTypesRequest, GetIamPolicyProjectsLocationsAspectTypesResponse, GetIamPolicyProjectsLocationsAspectTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsAspectTypesRequest,
  output: GetIamPolicyProjectsLocationsAspectTypesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsAspectTypesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsAspectTypesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/aspectTypes/{aspectTypesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsAspectTypesRequest>;

export type SetIamPolicyProjectsLocationsAspectTypesResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsAspectTypesResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsAspectTypesError = CommonErrors;

export const setIamPolicyProjectsLocationsAspectTypes: API.OperationMethod<SetIamPolicyProjectsLocationsAspectTypesRequest, SetIamPolicyProjectsLocationsAspectTypesResponse, SetIamPolicyProjectsLocationsAspectTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsAspectTypesRequest,
  output: SetIamPolicyProjectsLocationsAspectTypesResponse,
  errors: [],
}));

/** Gets an AspectType. */
export interface GetProjectsLocationsAspectTypesRequest {
  /** Required. The resource name of the AspectType: projects/{project_number}/locations/{location_id}/aspectTypes/{aspect_type_id}. */
  name: string;
}

export const GetProjectsLocationsAspectTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/aspectTypes/{aspectTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsAspectTypesRequest>;

export type GetProjectsLocationsAspectTypesResponse = GoogleCloudDataplexV1AspectType;
export const GetProjectsLocationsAspectTypesResponse = GoogleCloudDataplexV1AspectType;

export type GetProjectsLocationsAspectTypesError = CommonErrors;

export const getProjectsLocationsAspectTypes: API.OperationMethod<GetProjectsLocationsAspectTypesRequest, GetProjectsLocationsAspectTypesResponse, GetProjectsLocationsAspectTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsAspectTypesRequest,
  output: GetProjectsLocationsAspectTypesResponse,
  errors: [],
}));

/** Deletes an AspectType. */
export interface DeleteProjectsLocationsAspectTypesRequest {
  /** Optional. If the client provided etag value does not match the current etag value, the DeleteAspectTypeRequest method returns an ABORTED error response. */
  etag?: string;
  /** Required. The resource name of the AspectType: projects/{project_number}/locations/{location_id}/aspectTypes/{aspect_type_id}. */
  name: string;
}

export const DeleteProjectsLocationsAspectTypesRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/aspectTypes/{aspectTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsAspectTypesRequest>;

export type DeleteProjectsLocationsAspectTypesResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsAspectTypesResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsAspectTypesError = CommonErrors;

export const deleteProjectsLocationsAspectTypes: API.OperationMethod<DeleteProjectsLocationsAspectTypesRequest, DeleteProjectsLocationsAspectTypesResponse, DeleteProjectsLocationsAspectTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsAspectTypesRequest,
  output: DeleteProjectsLocationsAspectTypesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsAspectTypesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsAspectTypesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/aspectTypes/{aspectTypesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsAspectTypesRequest>;

export type TestIamPermissionsProjectsLocationsAspectTypesResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsAspectTypesResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsAspectTypesError = CommonErrors;

export const testIamPermissionsProjectsLocationsAspectTypes: API.OperationMethod<TestIamPermissionsProjectsLocationsAspectTypesRequest, TestIamPermissionsProjectsLocationsAspectTypesResponse, TestIamPermissionsProjectsLocationsAspectTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsAspectTypesRequest,
  output: TestIamPermissionsProjectsLocationsAspectTypesResponse,
  errors: [],
}));

/** Updates an AspectType. */
export interface PatchProjectsLocationsAspectTypesRequest {
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** Output only. The relative resource name of the AspectType, of the form: projects/{project_number}/locations/{location_id}/aspectTypes/{aspect_type_id}. */
  name: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1AspectType;
}

export const PatchProjectsLocationsAspectTypesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1AspectType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/aspectTypes/{aspectTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsAspectTypesRequest>;

export type PatchProjectsLocationsAspectTypesResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsAspectTypesResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsAspectTypesError = CommonErrors;

export const patchProjectsLocationsAspectTypes: API.OperationMethod<PatchProjectsLocationsAspectTypesRequest, PatchProjectsLocationsAspectTypesResponse, PatchProjectsLocationsAspectTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsAspectTypesRequest,
  output: PatchProjectsLocationsAspectTypesResponse,
  errors: [],
}));

/** Creates an AspectType. */
export interface CreateProjectsLocationsAspectTypesRequest {
  /** Required. AspectType identifier. */
  aspectTypeId?: string;
  /** Required. The resource name of the AspectType, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. */
  parent: string;
  /** Optional. The service validates the request without performing any mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1AspectType;
}

export const CreateProjectsLocationsAspectTypesRequest = Schema.Struct({
  aspectTypeId: Schema.optional(Schema.String).pipe(T.HttpQuery("aspectTypeId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1AspectType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/aspectTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsAspectTypesRequest>;

export type CreateProjectsLocationsAspectTypesResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsAspectTypesResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsAspectTypesError = CommonErrors;

export const createProjectsLocationsAspectTypes: API.OperationMethod<CreateProjectsLocationsAspectTypesRequest, CreateProjectsLocationsAspectTypesResponse, CreateProjectsLocationsAspectTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsAspectTypesRequest,
  output: CreateProjectsLocationsAspectTypesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsChangeRequestsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsChangeRequestsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/changeRequests/{changeRequestsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsChangeRequestsRequest>;

export type SetIamPolicyProjectsLocationsChangeRequestsResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsChangeRequestsResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsChangeRequestsError = CommonErrors;

export const setIamPolicyProjectsLocationsChangeRequests: API.OperationMethod<SetIamPolicyProjectsLocationsChangeRequestsRequest, SetIamPolicyProjectsLocationsChangeRequestsResponse, SetIamPolicyProjectsLocationsChangeRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsChangeRequestsRequest,
  output: SetIamPolicyProjectsLocationsChangeRequestsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsChangeRequestsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsChangeRequestsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/changeRequests/{changeRequestsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsChangeRequestsRequest>;

export type TestIamPermissionsProjectsLocationsChangeRequestsResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsChangeRequestsResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsChangeRequestsError = CommonErrors;

export const testIamPermissionsProjectsLocationsChangeRequests: API.OperationMethod<TestIamPermissionsProjectsLocationsChangeRequestsRequest, TestIamPermissionsProjectsLocationsChangeRequestsResponse, TestIamPermissionsProjectsLocationsChangeRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsChangeRequestsRequest,
  output: TestIamPermissionsProjectsLocationsChangeRequestsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsChangeRequestsRequest {
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsChangeRequestsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/changeRequests/{changeRequestsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsChangeRequestsRequest>;

export type GetIamPolicyProjectsLocationsChangeRequestsResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsChangeRequestsResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsChangeRequestsError = CommonErrors;

export const getIamPolicyProjectsLocationsChangeRequests: API.OperationMethod<GetIamPolicyProjectsLocationsChangeRequestsRequest, GetIamPolicyProjectsLocationsChangeRequestsResponse, GetIamPolicyProjectsLocationsChangeRequestsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsChangeRequestsRequest,
  output: GetIamPolicyProjectsLocationsChangeRequestsResponse,
  errors: [],
}));

/** Lists metadata jobs. */
export interface ListProjectsLocationsMetadataJobsRequest {
  /** Required. The resource name of the parent location, in the format projects/{project_id_or_number}/locations/{location_id} */
  parent: string;
  /** Optional. The page token received from a previous ListMetadataJobs call. Provide this token to retrieve the subsequent page of results. When paginating, all other parameters that are provided to the ListMetadataJobs request must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filter request. Filters are case-sensitive. The service supports the following formats: labels.key1 = "value1" labels:key1 name = "value"You can combine filters with AND, OR, and NOT operators. */
  filter?: string;
  /** Optional. The field to sort the results by, either name or create_time. If not specified, the ordering is undefined. */
  orderBy?: string;
  /** Optional. The maximum number of metadata jobs to return. The service might return fewer jobs than this value. If unspecified, at most 10 jobs are returned. The maximum value is 1,000. */
  pageSize?: number;
}

export const ListProjectsLocationsMetadataJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/metadataJobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsMetadataJobsRequest>;

export type ListProjectsLocationsMetadataJobsResponse = GoogleCloudDataplexV1ListMetadataJobsResponse;
export const ListProjectsLocationsMetadataJobsResponse = GoogleCloudDataplexV1ListMetadataJobsResponse;

export type ListProjectsLocationsMetadataJobsError = CommonErrors;

export const listProjectsLocationsMetadataJobs = API.makePaginated(() => ({
  input: ListProjectsLocationsMetadataJobsRequest,
  output: ListProjectsLocationsMetadataJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a metadata job. */
export interface GetProjectsLocationsMetadataJobsRequest {
  /** Required. The resource name of the metadata job, in the format projects/{project_id_or_number}/locations/{location_id}/metadataJobs/{metadata_job_id}. */
  name: string;
}

export const GetProjectsLocationsMetadataJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/metadataJobs/{metadataJobsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsMetadataJobsRequest>;

export type GetProjectsLocationsMetadataJobsResponse = GoogleCloudDataplexV1MetadataJob;
export const GetProjectsLocationsMetadataJobsResponse = GoogleCloudDataplexV1MetadataJob;

export type GetProjectsLocationsMetadataJobsError = CommonErrors;

export const getProjectsLocationsMetadataJobs: API.OperationMethod<GetProjectsLocationsMetadataJobsRequest, GetProjectsLocationsMetadataJobsResponse, GetProjectsLocationsMetadataJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsMetadataJobsRequest,
  output: GetProjectsLocationsMetadataJobsResponse,
  errors: [],
}));

/** Creates a metadata job. For example, use a metadata job to import metadata from a third-party system into Dataplex Universal Catalog. */
export interface CreateProjectsLocationsMetadataJobsRequest {
  /** Required. The resource name of the parent location, in the format projects/{project_id_or_number}/locations/{location_id} */
  parent: string;
  /** Optional. The service validates the request without performing any mutations. The default is false. */
  validateOnly?: boolean;
  /** Optional. The metadata job ID. If not provided, a unique ID is generated with the prefix metadata-job-. */
  metadataJobId?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1MetadataJob;
}

export const CreateProjectsLocationsMetadataJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  metadataJobId: Schema.optional(Schema.String).pipe(T.HttpQuery("metadataJobId")),
  body: Schema.optional(GoogleCloudDataplexV1MetadataJob).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/metadataJobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsMetadataJobsRequest>;

export type CreateProjectsLocationsMetadataJobsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsMetadataJobsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsMetadataJobsError = CommonErrors;

export const createProjectsLocationsMetadataJobs: API.OperationMethod<CreateProjectsLocationsMetadataJobsRequest, CreateProjectsLocationsMetadataJobsResponse, CreateProjectsLocationsMetadataJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsMetadataJobsRequest,
  output: CreateProjectsLocationsMetadataJobsResponse,
  errors: [],
}));

/** Cancels a metadata job.If you cancel a metadata import job that is in progress, the changes in the job might be partially applied. We recommend that you reset the state of the entry groups in your project by running another metadata job that reverts the changes from the canceled job. */
export interface CancelProjectsLocationsMetadataJobsRequest {
  /** Required. The resource name of the job, in the format projects/{project_id_or_number}/locations/{location_id}/metadataJobs/{metadata_job_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudDataplexV1CancelMetadataJobRequest;
}

export const CancelProjectsLocationsMetadataJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDataplexV1CancelMetadataJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/metadataJobs/{metadataJobsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelProjectsLocationsMetadataJobsRequest>;

export type CancelProjectsLocationsMetadataJobsResponse = Empty;
export const CancelProjectsLocationsMetadataJobsResponse = Empty;

export type CancelProjectsLocationsMetadataJobsError = CommonErrors;

export const cancelProjectsLocationsMetadataJobs: API.OperationMethod<CancelProjectsLocationsMetadataJobsRequest, CancelProjectsLocationsMetadataJobsResponse, CancelProjectsLocationsMetadataJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelProjectsLocationsMetadataJobsRequest,
  output: CancelProjectsLocationsMetadataJobsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsGovernanceRulesRequest {
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsGovernanceRulesRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/governanceRules/{governanceRulesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsGovernanceRulesRequest>;

export type GetIamPolicyProjectsLocationsGovernanceRulesResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsGovernanceRulesResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsGovernanceRulesError = CommonErrors;

export const getIamPolicyProjectsLocationsGovernanceRules: API.OperationMethod<GetIamPolicyProjectsLocationsGovernanceRulesRequest, GetIamPolicyProjectsLocationsGovernanceRulesResponse, GetIamPolicyProjectsLocationsGovernanceRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsGovernanceRulesRequest,
  output: GetIamPolicyProjectsLocationsGovernanceRulesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsGovernanceRulesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsGovernanceRulesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/governanceRules/{governanceRulesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsGovernanceRulesRequest>;

export type TestIamPermissionsProjectsLocationsGovernanceRulesResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsGovernanceRulesResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsGovernanceRulesError = CommonErrors;

export const testIamPermissionsProjectsLocationsGovernanceRules: API.OperationMethod<TestIamPermissionsProjectsLocationsGovernanceRulesRequest, TestIamPermissionsProjectsLocationsGovernanceRulesResponse, TestIamPermissionsProjectsLocationsGovernanceRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsGovernanceRulesRequest,
  output: TestIamPermissionsProjectsLocationsGovernanceRulesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsGovernanceRulesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsGovernanceRulesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/governanceRules/{governanceRulesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsGovernanceRulesRequest>;

export type SetIamPolicyProjectsLocationsGovernanceRulesResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsGovernanceRulesResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsGovernanceRulesError = CommonErrors;

export const setIamPolicyProjectsLocationsGovernanceRules: API.OperationMethod<SetIamPolicyProjectsLocationsGovernanceRulesRequest, SetIamPolicyProjectsLocationsGovernanceRulesResponse, SetIamPolicyProjectsLocationsGovernanceRulesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsGovernanceRulesRequest,
  output: SetIamPolicyProjectsLocationsGovernanceRulesResponse,
  errors: [],
}));

/** Gets an EntryType. */
export interface GetProjectsLocationsEntryTypesRequest {
  /** Required. The resource name of the EntryType: projects/{project_number}/locations/{location_id}/entryTypes/{entry_type_id}. */
  name: string;
}

export const GetProjectsLocationsEntryTypesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/entryTypes/{entryTypesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsEntryTypesRequest>;

export type GetProjectsLocationsEntryTypesResponse = GoogleCloudDataplexV1EntryType;
export const GetProjectsLocationsEntryTypesResponse = GoogleCloudDataplexV1EntryType;

export type GetProjectsLocationsEntryTypesError = CommonErrors;

export const getProjectsLocationsEntryTypes: API.OperationMethod<GetProjectsLocationsEntryTypesRequest, GetProjectsLocationsEntryTypesResponse, GetProjectsLocationsEntryTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsEntryTypesRequest,
  output: GetProjectsLocationsEntryTypesResponse,
  errors: [],
}));

/** Updates an EntryType. */
export interface PatchProjectsLocationsEntryTypesRequest {
  /** Optional. The service validates the request without performing any mutations. The default is false. */
  validateOnly?: boolean;
  /** Output only. The relative resource name of the EntryType, of the form: projects/{project_number}/locations/{location_id}/entryTypes/{entry_type_id}. */
  name: string;
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1EntryType;
}

export const PatchProjectsLocationsEntryTypesRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDataplexV1EntryType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/entryTypes/{entryTypesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsEntryTypesRequest>;

export type PatchProjectsLocationsEntryTypesResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsEntryTypesResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsEntryTypesError = CommonErrors;

export const patchProjectsLocationsEntryTypes: API.OperationMethod<PatchProjectsLocationsEntryTypesRequest, PatchProjectsLocationsEntryTypesResponse, PatchProjectsLocationsEntryTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsEntryTypesRequest,
  output: PatchProjectsLocationsEntryTypesResponse,
  errors: [],
}));

/** Creates an EntryType. */
export interface CreateProjectsLocationsEntryTypesRequest {
  /** Optional. The service validates the request without performing any mutations. The default is false. */
  validateOnly?: boolean;
  /** Required. The resource name of the EntryType, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. */
  parent: string;
  /** Required. EntryType identifier. */
  entryTypeId?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1EntryType;
}

export const CreateProjectsLocationsEntryTypesRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  entryTypeId: Schema.optional(Schema.String).pipe(T.HttpQuery("entryTypeId")),
  body: Schema.optional(GoogleCloudDataplexV1EntryType).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/entryTypes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsEntryTypesRequest>;

export type CreateProjectsLocationsEntryTypesResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsEntryTypesResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsEntryTypesError = CommonErrors;

export const createProjectsLocationsEntryTypes: API.OperationMethod<CreateProjectsLocationsEntryTypesRequest, CreateProjectsLocationsEntryTypesResponse, CreateProjectsLocationsEntryTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsEntryTypesRequest,
  output: CreateProjectsLocationsEntryTypesResponse,
  errors: [],
}));

/** Deletes an EntryType. */
export interface DeleteProjectsLocationsEntryTypesRequest {
  /** Optional. If the client provided etag value does not match the current etag value, the DeleteEntryTypeRequest method returns an ABORTED error response. */
  etag?: string;
  /** Required. The resource name of the EntryType: projects/{project_number}/locations/{location_id}/entryTypes/{entry_type_id}. */
  name: string;
}

export const DeleteProjectsLocationsEntryTypesRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/entryTypes/{entryTypesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsEntryTypesRequest>;

export type DeleteProjectsLocationsEntryTypesResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsEntryTypesResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsEntryTypesError = CommonErrors;

export const deleteProjectsLocationsEntryTypes: API.OperationMethod<DeleteProjectsLocationsEntryTypesRequest, DeleteProjectsLocationsEntryTypesResponse, DeleteProjectsLocationsEntryTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsEntryTypesRequest,
  output: DeleteProjectsLocationsEntryTypesResponse,
  errors: [],
}));

/** Lists EntryType resources in a project and location. */
export interface ListProjectsLocationsEntryTypesRequest {
  /** Optional. Maximum number of EntryTypes to return. The service may return fewer than this value. If unspecified, the service returns at most 10 EntryTypes. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Orders the result by name or create_time fields. If not specified, the ordering is undefined. */
  orderBy?: string;
  /** Required. The resource name of the EntryType location, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. */
  parent: string;
  /** Optional. Filter request. Filters are case-sensitive. The service supports the following formats: labels.key1 = "value1" labels:key1 name = "value"These restrictions can be conjoined with AND, OR, and NOT conjunctions. */
  filter?: string;
  /** Optional. Page token received from a previous ListEntryTypes call. Provide this to retrieve the subsequent page. When paginating, all other parameters you provided to ListEntryTypes must match the call that provided the page token. */
  pageToken?: string;
}

export const ListProjectsLocationsEntryTypesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/entryTypes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsEntryTypesRequest>;

export type ListProjectsLocationsEntryTypesResponse = GoogleCloudDataplexV1ListEntryTypesResponse;
export const ListProjectsLocationsEntryTypesResponse = GoogleCloudDataplexV1ListEntryTypesResponse;

export type ListProjectsLocationsEntryTypesError = CommonErrors;

export const listProjectsLocationsEntryTypes = API.makePaginated(() => ({
  input: ListProjectsLocationsEntryTypesRequest,
  output: ListProjectsLocationsEntryTypesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsEntryTypesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsEntryTypesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/entryTypes/{entryTypesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsEntryTypesRequest>;

export type TestIamPermissionsProjectsLocationsEntryTypesResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsEntryTypesResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsEntryTypesError = CommonErrors;

export const testIamPermissionsProjectsLocationsEntryTypes: API.OperationMethod<TestIamPermissionsProjectsLocationsEntryTypesRequest, TestIamPermissionsProjectsLocationsEntryTypesResponse, TestIamPermissionsProjectsLocationsEntryTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsEntryTypesRequest,
  output: TestIamPermissionsProjectsLocationsEntryTypesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsEntryTypesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsEntryTypesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/entryTypes/{entryTypesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsEntryTypesRequest>;

export type GetIamPolicyProjectsLocationsEntryTypesResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsEntryTypesResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsEntryTypesError = CommonErrors;

export const getIamPolicyProjectsLocationsEntryTypes: API.OperationMethod<GetIamPolicyProjectsLocationsEntryTypesRequest, GetIamPolicyProjectsLocationsEntryTypesResponse, GetIamPolicyProjectsLocationsEntryTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsEntryTypesRequest,
  output: GetIamPolicyProjectsLocationsEntryTypesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsEntryTypesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsEntryTypesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/entryTypes/{entryTypesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsEntryTypesRequest>;

export type SetIamPolicyProjectsLocationsEntryTypesResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsEntryTypesResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsEntryTypesError = CommonErrors;

export const setIamPolicyProjectsLocationsEntryTypes: API.OperationMethod<SetIamPolicyProjectsLocationsEntryTypesRequest, SetIamPolicyProjectsLocationsEntryTypesResponse, SetIamPolicyProjectsLocationsEntryTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsEntryTypesRequest,
  output: SetIamPolicyProjectsLocationsEntryTypesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsEntryLinkTypesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsEntryLinkTypesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/entryLinkTypes/{entryLinkTypesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsEntryLinkTypesRequest>;

export type GetIamPolicyProjectsLocationsEntryLinkTypesResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsEntryLinkTypesResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsEntryLinkTypesError = CommonErrors;

export const getIamPolicyProjectsLocationsEntryLinkTypes: API.OperationMethod<GetIamPolicyProjectsLocationsEntryLinkTypesRequest, GetIamPolicyProjectsLocationsEntryLinkTypesResponse, GetIamPolicyProjectsLocationsEntryLinkTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsEntryLinkTypesRequest,
  output: GetIamPolicyProjectsLocationsEntryLinkTypesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsEntryLinkTypesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsEntryLinkTypesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/entryLinkTypes/{entryLinkTypesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsEntryLinkTypesRequest>;

export type SetIamPolicyProjectsLocationsEntryLinkTypesResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsEntryLinkTypesResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsEntryLinkTypesError = CommonErrors;

export const setIamPolicyProjectsLocationsEntryLinkTypes: API.OperationMethod<SetIamPolicyProjectsLocationsEntryLinkTypesRequest, SetIamPolicyProjectsLocationsEntryLinkTypesResponse, SetIamPolicyProjectsLocationsEntryLinkTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsEntryLinkTypesRequest,
  output: SetIamPolicyProjectsLocationsEntryLinkTypesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsEntryLinkTypesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsEntryLinkTypesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/entryLinkTypes/{entryLinkTypesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsEntryLinkTypesRequest>;

export type TestIamPermissionsProjectsLocationsEntryLinkTypesResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsEntryLinkTypesResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsEntryLinkTypesError = CommonErrors;

export const testIamPermissionsProjectsLocationsEntryLinkTypes: API.OperationMethod<TestIamPermissionsProjectsLocationsEntryLinkTypesRequest, TestIamPermissionsProjectsLocationsEntryLinkTypesResponse, TestIamPermissionsProjectsLocationsEntryLinkTypesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsEntryLinkTypesRequest,
  output: TestIamPermissionsProjectsLocationsEntryLinkTypesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsDataAttributeBindingsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsDataAttributeBindingsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataAttributeBindings/{dataAttributeBindingsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDataAttributeBindingsRequest>;

export type GetIamPolicyProjectsLocationsDataAttributeBindingsResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsDataAttributeBindingsResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsDataAttributeBindingsError = CommonErrors;

export const getIamPolicyProjectsLocationsDataAttributeBindings: API.OperationMethod<GetIamPolicyProjectsLocationsDataAttributeBindingsRequest, GetIamPolicyProjectsLocationsDataAttributeBindingsResponse, GetIamPolicyProjectsLocationsDataAttributeBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDataAttributeBindingsRequest,
  output: GetIamPolicyProjectsLocationsDataAttributeBindingsResponse,
  errors: [],
}));

/** Create a DataAttributeBinding resource. */
export interface CreateProjectsLocationsDataAttributeBindingsRequest {
  /** Required. DataAttributeBinding identifier. * Must contain only lowercase letters, numbers and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the Location. */
  dataAttributeBindingId?: string;
  /** Required. The resource name of the parent data taxonomy projects/{project_number}/locations/{location_id} */
  parent: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1DataAttributeBinding;
}

export const CreateProjectsLocationsDataAttributeBindingsRequest = Schema.Struct({
  dataAttributeBindingId: Schema.optional(Schema.String).pipe(T.HttpQuery("dataAttributeBindingId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1DataAttributeBinding).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataAttributeBindings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDataAttributeBindingsRequest>;

export type CreateProjectsLocationsDataAttributeBindingsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsDataAttributeBindingsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsDataAttributeBindingsError = CommonErrors;

export const createProjectsLocationsDataAttributeBindings: API.OperationMethod<CreateProjectsLocationsDataAttributeBindingsRequest, CreateProjectsLocationsDataAttributeBindingsResponse, CreateProjectsLocationsDataAttributeBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDataAttributeBindingsRequest,
  output: CreateProjectsLocationsDataAttributeBindingsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsDataAttributeBindingsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDataAttributeBindingsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataAttributeBindings/{dataAttributeBindingsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDataAttributeBindingsRequest>;

export type SetIamPolicyProjectsLocationsDataAttributeBindingsResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsDataAttributeBindingsResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsDataAttributeBindingsError = CommonErrors;

export const setIamPolicyProjectsLocationsDataAttributeBindings: API.OperationMethod<SetIamPolicyProjectsLocationsDataAttributeBindingsRequest, SetIamPolicyProjectsLocationsDataAttributeBindingsResponse, SetIamPolicyProjectsLocationsDataAttributeBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDataAttributeBindingsRequest,
  output: SetIamPolicyProjectsLocationsDataAttributeBindingsResponse,
  errors: [],
}));

/** Retrieves a DataAttributeBinding resource. */
export interface GetProjectsLocationsDataAttributeBindingsRequest {
  /** Required. The resource name of the DataAttributeBinding: projects/{project_number}/locations/{location_id}/dataAttributeBindings/{data_attribute_binding_id} */
  name: string;
}

export const GetProjectsLocationsDataAttributeBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataAttributeBindings/{dataAttributeBindingsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDataAttributeBindingsRequest>;

export type GetProjectsLocationsDataAttributeBindingsResponse = GoogleCloudDataplexV1DataAttributeBinding;
export const GetProjectsLocationsDataAttributeBindingsResponse = GoogleCloudDataplexV1DataAttributeBinding;

export type GetProjectsLocationsDataAttributeBindingsError = CommonErrors;

export const getProjectsLocationsDataAttributeBindings: API.OperationMethod<GetProjectsLocationsDataAttributeBindingsRequest, GetProjectsLocationsDataAttributeBindingsResponse, GetProjectsLocationsDataAttributeBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDataAttributeBindingsRequest,
  output: GetProjectsLocationsDataAttributeBindingsResponse,
  errors: [],
}));

/** Deletes a DataAttributeBinding resource. All attributes within the DataAttributeBinding must be deleted before the DataAttributeBinding can be deleted. */
export interface DeleteProjectsLocationsDataAttributeBindingsRequest {
  /** Required. The resource name of the DataAttributeBinding: projects/{project_number}/locations/{location_id}/dataAttributeBindings/{data_attribute_binding_id} */
  name: string;
  /** Required. If the client provided etag value does not match the current etag value, the DeleteDataAttributeBindingRequest method returns an ABORTED error response. Etags must be used when calling the DeleteDataAttributeBinding. */
  etag?: string;
}

export const DeleteProjectsLocationsDataAttributeBindingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/dataAttributeBindings/{dataAttributeBindingsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDataAttributeBindingsRequest>;

export type DeleteProjectsLocationsDataAttributeBindingsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsDataAttributeBindingsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsDataAttributeBindingsError = CommonErrors;

export const deleteProjectsLocationsDataAttributeBindings: API.OperationMethod<DeleteProjectsLocationsDataAttributeBindingsRequest, DeleteProjectsLocationsDataAttributeBindingsResponse, DeleteProjectsLocationsDataAttributeBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDataAttributeBindingsRequest,
  output: DeleteProjectsLocationsDataAttributeBindingsResponse,
  errors: [],
}));

/** Lists DataAttributeBinding resources in a project and location. */
export interface ListProjectsLocationsDataAttributeBindingsRequest {
  /** Optional. Page token received from a previous ListDataAttributeBindings call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListDataAttributeBindings must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Maximum number of DataAttributeBindings to return. The service may return fewer than this value. If unspecified, at most 10 DataAttributeBindings will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Filter request. Filter using resource: filter=resource:"resource-name" Filter using attribute: filter=attributes:"attribute-name" Filter using attribute in paths list: filter=paths.attributes:"attribute-name" */
  filter?: string;
  /** Optional. Order by fields for the result. */
  orderBy?: string;
  /** Required. The resource name of the Location: projects/{project_number}/locations/{location_id} */
  parent: string;
}

export const ListProjectsLocationsDataAttributeBindingsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataAttributeBindings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDataAttributeBindingsRequest>;

export type ListProjectsLocationsDataAttributeBindingsResponse = GoogleCloudDataplexV1ListDataAttributeBindingsResponse;
export const ListProjectsLocationsDataAttributeBindingsResponse = GoogleCloudDataplexV1ListDataAttributeBindingsResponse;

export type ListProjectsLocationsDataAttributeBindingsError = CommonErrors;

export const listProjectsLocationsDataAttributeBindings = API.makePaginated(() => ({
  input: ListProjectsLocationsDataAttributeBindingsRequest,
  output: ListProjectsLocationsDataAttributeBindingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsDataAttributeBindingsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDataAttributeBindingsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataAttributeBindings/{dataAttributeBindingsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDataAttributeBindingsRequest>;

export type TestIamPermissionsProjectsLocationsDataAttributeBindingsResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDataAttributeBindingsResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDataAttributeBindingsError = CommonErrors;

export const testIamPermissionsProjectsLocationsDataAttributeBindings: API.OperationMethod<TestIamPermissionsProjectsLocationsDataAttributeBindingsRequest, TestIamPermissionsProjectsLocationsDataAttributeBindingsResponse, TestIamPermissionsProjectsLocationsDataAttributeBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDataAttributeBindingsRequest,
  output: TestIamPermissionsProjectsLocationsDataAttributeBindingsResponse,
  errors: [],
}));

/** Updates a DataAttributeBinding resource. */
export interface PatchProjectsLocationsDataAttributeBindingsRequest {
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** Output only. The relative resource name of the Data Attribute Binding, of the form: projects/{project_number}/locations/{location}/dataAttributeBindings/{data_attribute_binding_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudDataplexV1DataAttributeBinding;
}

export const PatchProjectsLocationsDataAttributeBindingsRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDataplexV1DataAttributeBinding).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/dataAttributeBindings/{dataAttributeBindingsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDataAttributeBindingsRequest>;

export type PatchProjectsLocationsDataAttributeBindingsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsDataAttributeBindingsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsDataAttributeBindingsError = CommonErrors;

export const patchProjectsLocationsDataAttributeBindings: API.OperationMethod<PatchProjectsLocationsDataAttributeBindingsRequest, PatchProjectsLocationsDataAttributeBindingsResponse, PatchProjectsLocationsDataAttributeBindingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDataAttributeBindingsRequest,
  output: PatchProjectsLocationsDataAttributeBindingsResponse,
  errors: [],
}));

/** Lists EntryGroup resources in a project and location. */
export interface ListProjectsLocationsEntryGroupsRequest {
  /** Optional. Page token received from a previous ListEntryGroups call. Provide this to retrieve the subsequent page. When paginating, all other parameters you provide to ListEntryGroups must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The resource name of the entryGroup location, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. */
  parent: string;
  /** Optional. Order by fields for the result. */
  orderBy?: string;
  /** Optional. Filter request. */
  filter?: string;
  /** Optional. Maximum number of EntryGroups to return. The service may return fewer than this value. If unspecified, the service returns at most 10 EntryGroups. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsEntryGroupsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsEntryGroupsRequest>;

export type ListProjectsLocationsEntryGroupsResponse = GoogleCloudDataplexV1ListEntryGroupsResponse;
export const ListProjectsLocationsEntryGroupsResponse = GoogleCloudDataplexV1ListEntryGroupsResponse;

export type ListProjectsLocationsEntryGroupsError = CommonErrors;

export const listProjectsLocationsEntryGroups = API.makePaginated(() => ({
  input: ListProjectsLocationsEntryGroupsRequest,
  output: ListProjectsLocationsEntryGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsEntryGroupsRequest {
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsEntryGroupsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups/{entryGroupsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsEntryGroupsRequest>;

export type GetIamPolicyProjectsLocationsEntryGroupsResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsEntryGroupsResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsEntryGroupsError = CommonErrors;

export const getIamPolicyProjectsLocationsEntryGroups: API.OperationMethod<GetIamPolicyProjectsLocationsEntryGroupsRequest, GetIamPolicyProjectsLocationsEntryGroupsResponse, GetIamPolicyProjectsLocationsEntryGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsEntryGroupsRequest,
  output: GetIamPolicyProjectsLocationsEntryGroupsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsEntryGroupsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsEntryGroupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups/{entryGroupsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsEntryGroupsRequest>;

export type SetIamPolicyProjectsLocationsEntryGroupsResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsEntryGroupsResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsEntryGroupsError = CommonErrors;

export const setIamPolicyProjectsLocationsEntryGroups: API.OperationMethod<SetIamPolicyProjectsLocationsEntryGroupsRequest, SetIamPolicyProjectsLocationsEntryGroupsResponse, SetIamPolicyProjectsLocationsEntryGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsEntryGroupsRequest,
  output: SetIamPolicyProjectsLocationsEntryGroupsResponse,
  errors: [],
}));

/** Creates an EntryGroup. */
export interface CreateProjectsLocationsEntryGroupsRequest {
  /** Required. EntryGroup identifier. */
  entryGroupId?: string;
  /** Required. The resource name of the entryGroup, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. */
  parent: string;
  /** Optional. The service validates the request without performing any mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1EntryGroup;
}

export const CreateProjectsLocationsEntryGroupsRequest = Schema.Struct({
  entryGroupId: Schema.optional(Schema.String).pipe(T.HttpQuery("entryGroupId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1EntryGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsEntryGroupsRequest>;

export type CreateProjectsLocationsEntryGroupsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsEntryGroupsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsEntryGroupsError = CommonErrors;

export const createProjectsLocationsEntryGroups: API.OperationMethod<CreateProjectsLocationsEntryGroupsRequest, CreateProjectsLocationsEntryGroupsResponse, CreateProjectsLocationsEntryGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsEntryGroupsRequest,
  output: CreateProjectsLocationsEntryGroupsResponse,
  errors: [],
}));

/** Deletes an EntryGroup. */
export interface DeleteProjectsLocationsEntryGroupsRequest {
  /** Optional. If the client provided etag value does not match the current etag value, the DeleteEntryGroupRequest method returns an ABORTED error response. */
  etag?: string;
  /** Required. The resource name of the EntryGroup: projects/{project_number}/locations/{location_id}/entryGroups/{entry_group_id}. */
  name: string;
}

export const DeleteProjectsLocationsEntryGroupsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups/{entryGroupsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsEntryGroupsRequest>;

export type DeleteProjectsLocationsEntryGroupsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsEntryGroupsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsEntryGroupsError = CommonErrors;

export const deleteProjectsLocationsEntryGroups: API.OperationMethod<DeleteProjectsLocationsEntryGroupsRequest, DeleteProjectsLocationsEntryGroupsResponse, DeleteProjectsLocationsEntryGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsEntryGroupsRequest,
  output: DeleteProjectsLocationsEntryGroupsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsEntryGroupsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsEntryGroupsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups/{entryGroupsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsEntryGroupsRequest>;

export type TestIamPermissionsProjectsLocationsEntryGroupsResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsEntryGroupsResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsEntryGroupsError = CommonErrors;

export const testIamPermissionsProjectsLocationsEntryGroups: API.OperationMethod<TestIamPermissionsProjectsLocationsEntryGroupsRequest, TestIamPermissionsProjectsLocationsEntryGroupsResponse, TestIamPermissionsProjectsLocationsEntryGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsEntryGroupsRequest,
  output: TestIamPermissionsProjectsLocationsEntryGroupsResponse,
  errors: [],
}));

/** Updates an EntryGroup. */
export interface PatchProjectsLocationsEntryGroupsRequest {
  /** Optional. The service validates the request, without performing any mutations. The default is false. */
  validateOnly?: boolean;
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** Output only. The relative resource name of the EntryGroup, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}. */
  name: string;
  /** Request body */
  body?: GoogleCloudDataplexV1EntryGroup;
}

export const PatchProjectsLocationsEntryGroupsRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudDataplexV1EntryGroup).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups/{entryGroupsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsEntryGroupsRequest>;

export type PatchProjectsLocationsEntryGroupsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsEntryGroupsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsEntryGroupsError = CommonErrors;

export const patchProjectsLocationsEntryGroups: API.OperationMethod<PatchProjectsLocationsEntryGroupsRequest, PatchProjectsLocationsEntryGroupsResponse, PatchProjectsLocationsEntryGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsEntryGroupsRequest,
  output: PatchProjectsLocationsEntryGroupsResponse,
  errors: [],
}));

/** Gets an EntryGroup. */
export interface GetProjectsLocationsEntryGroupsRequest {
  /** Required. The resource name of the EntryGroup: projects/{project_number}/locations/{location_id}/entryGroups/{entry_group_id}. */
  name: string;
}

export const GetProjectsLocationsEntryGroupsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups/{entryGroupsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsEntryGroupsRequest>;

export type GetProjectsLocationsEntryGroupsResponse = GoogleCloudDataplexV1EntryGroup;
export const GetProjectsLocationsEntryGroupsResponse = GoogleCloudDataplexV1EntryGroup;

export type GetProjectsLocationsEntryGroupsError = CommonErrors;

export const getProjectsLocationsEntryGroups: API.OperationMethod<GetProjectsLocationsEntryGroupsRequest, GetProjectsLocationsEntryGroupsResponse, GetProjectsLocationsEntryGroupsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsEntryGroupsRequest,
  output: GetProjectsLocationsEntryGroupsResponse,
  errors: [],
}));

/** Gets an Entry. */
export interface GetProjectsLocationsEntryGroupsEntriesRequest {
  /** Required. The resource name of the Entry: projects/{project}/locations/{location}/entryGroups/{entry_group}/entries/{entry}. */
  name: string;
  /** Optional. View to control which parts of an entry the service should return. */
  view?: "ENTRY_VIEW_UNSPECIFIED" | "BASIC" | "FULL" | "CUSTOM" | "ALL" | (string & {});
  /** Optional. Limits the aspects returned to the provided aspect types. It only works for CUSTOM view. */
  aspectTypes?: string[];
  /** Optional. Limits the aspects returned to those associated with the provided paths within the Entry. It only works for CUSTOM view. */
  paths?: string[];
}

export const GetProjectsLocationsEntryGroupsEntriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
  aspectTypes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("aspectTypes")),
  paths: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("paths")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups/{entryGroupsId}/entries/{entriesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsEntryGroupsEntriesRequest>;

export type GetProjectsLocationsEntryGroupsEntriesResponse = GoogleCloudDataplexV1Entry;
export const GetProjectsLocationsEntryGroupsEntriesResponse = GoogleCloudDataplexV1Entry;

export type GetProjectsLocationsEntryGroupsEntriesError = CommonErrors;

export const getProjectsLocationsEntryGroupsEntries: API.OperationMethod<GetProjectsLocationsEntryGroupsEntriesRequest, GetProjectsLocationsEntryGroupsEntriesResponse, GetProjectsLocationsEntryGroupsEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsEntryGroupsEntriesRequest,
  output: GetProjectsLocationsEntryGroupsEntriesResponse,
  errors: [],
}));

/** Lists Entries within an EntryGroup. */
export interface ListProjectsLocationsEntryGroupsEntriesRequest {
  /** Optional. Page token received from a previous ListEntries call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. Number of items to return per page. If there are remaining results, the service returns a next_page_token. If unspecified, the service returns at most 10 Entries. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A filter on the entries to return. Filters are case-sensitive. You can filter the request by the following fields: entry_type entry_source.display_name parent_entryThe comparison operators are =, !=, <, >, <=, >=. The service compares strings according to lexical order.You can use the logical operators AND, OR, NOT in the filter.You can use Wildcard "*", but for entry_type and parent_entry you need to provide the full project id or number.You cannot use parent_entry in conjunction with other fields.Example filter expressions: "entry_source.display_name=AnExampleDisplayName" "entry_type=projects/example-project/locations/global/entryTypes/example-entry_type" "entry_type=projects/example-project/locations/us/entryTypes/a* OR entry_type=projects/another-project/locations/*" "NOT entry_source.display_name=AnotherExampleDisplayName" "parent_entry=projects/example-project/locations/us/entryGroups/example-entry-group/entries/example-entry" */
  filter?: string;
  /** Required. The resource name of the parent Entry Group: projects/{project}/locations/{location}/entryGroups/{entry_group}. */
  parent: string;
}

export const ListProjectsLocationsEntryGroupsEntriesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups/{entryGroupsId}/entries" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsEntryGroupsEntriesRequest>;

export type ListProjectsLocationsEntryGroupsEntriesResponse = GoogleCloudDataplexV1ListEntriesResponse;
export const ListProjectsLocationsEntryGroupsEntriesResponse = GoogleCloudDataplexV1ListEntriesResponse;

export type ListProjectsLocationsEntryGroupsEntriesError = CommonErrors;

export const listProjectsLocationsEntryGroupsEntries = API.makePaginated(() => ({
  input: ListProjectsLocationsEntryGroupsEntriesRequest,
  output: ListProjectsLocationsEntryGroupsEntriesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes an Entry. */
export interface DeleteProjectsLocationsEntryGroupsEntriesRequest {
  /** Required. The resource name of the Entry: projects/{project}/locations/{location}/entryGroups/{entry_group}/entries/{entry}. */
  name: string;
}

export const DeleteProjectsLocationsEntryGroupsEntriesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups/{entryGroupsId}/entries/{entriesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsEntryGroupsEntriesRequest>;

export type DeleteProjectsLocationsEntryGroupsEntriesResponse = GoogleCloudDataplexV1Entry;
export const DeleteProjectsLocationsEntryGroupsEntriesResponse = GoogleCloudDataplexV1Entry;

export type DeleteProjectsLocationsEntryGroupsEntriesError = CommonErrors;

export const deleteProjectsLocationsEntryGroupsEntries: API.OperationMethod<DeleteProjectsLocationsEntryGroupsEntriesRequest, DeleteProjectsLocationsEntryGroupsEntriesResponse, DeleteProjectsLocationsEntryGroupsEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsEntryGroupsEntriesRequest,
  output: DeleteProjectsLocationsEntryGroupsEntriesResponse,
  errors: [],
}));

/** Updates an Entry. */
export interface PatchProjectsLocationsEntryGroupsEntriesRequest {
  /** Optional. The map keys of the Aspects which the service should modify. It supports the following syntaxes: - matches an aspect of the given type and empty path. @path - matches an aspect of the given type and specified path. For example, to attach an aspect to a field that is specified by the schema aspect, the path should have the format Schema.. @* - matches aspects of the given type for all paths. *@path - matches aspects of all types on the given path.The service will not remove existing aspects matching the syntax unless delete_missing_aspects is set to true.If this field is left empty, the service treats it as specifying exactly those Aspects present in the request. */
  aspectKeys?: string[];
  /** Optional. Mask of fields to update. To update Aspects, the update_mask must contain the value "aspects".If the update_mask is empty, the service will update all modifiable fields present in the request. */
  updateMask?: string;
  /** Optional. If set to true and the aspect_keys specify aspect ranges, the service deletes any existing aspects from that range that weren't provided in the request. */
  deleteMissingAspects?: boolean;
  /** Identifier. The relative resource name of the entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}. */
  name: string;
  /** Optional. If set to true and the entry doesn't exist, the service will create it. */
  allowMissing?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1Entry;
}

export const PatchProjectsLocationsEntryGroupsEntriesRequest = Schema.Struct({
  aspectKeys: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("aspectKeys")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  deleteMissingAspects: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleteMissingAspects")),
  name: Schema.String.pipe(T.HttpPath("name")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  body: Schema.optional(GoogleCloudDataplexV1Entry).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups/{entryGroupsId}/entries/{entriesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsEntryGroupsEntriesRequest>;

export type PatchProjectsLocationsEntryGroupsEntriesResponse = GoogleCloudDataplexV1Entry;
export const PatchProjectsLocationsEntryGroupsEntriesResponse = GoogleCloudDataplexV1Entry;

export type PatchProjectsLocationsEntryGroupsEntriesError = CommonErrors;

export const patchProjectsLocationsEntryGroupsEntries: API.OperationMethod<PatchProjectsLocationsEntryGroupsEntriesRequest, PatchProjectsLocationsEntryGroupsEntriesResponse, PatchProjectsLocationsEntryGroupsEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsEntryGroupsEntriesRequest,
  output: PatchProjectsLocationsEntryGroupsEntriesResponse,
  errors: [],
}));

/** Creates an Entry. */
export interface CreateProjectsLocationsEntryGroupsEntriesRequest {
  /** Required. The resource name of the parent Entry Group: projects/{project}/locations/{location}/entryGroups/{entry_group}. */
  parent: string;
  /** Required. Entry identifier. It has to be unique within an Entry Group.Entries corresponding to Google Cloud resources use an Entry ID format based on full resource names (https://cloud.google.com/apis/design/resource_names#full_resource_name). The format is a full resource name of the resource without the prefix double slashes in the API service name part of the full resource name. This allows retrieval of entries using their associated resource name.For example, if the full resource name of a resource is //library.googleapis.com/shelves/shelf1/books/book2, then the suggested entry_id is library.googleapis.com/shelves/shelf1/books/book2.It is also suggested to follow the same convention for entries corresponding to resources from providers or systems other than Google Cloud.The maximum size of the field is 4000 characters. */
  entryId?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1Entry;
}

export const CreateProjectsLocationsEntryGroupsEntriesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  entryId: Schema.optional(Schema.String).pipe(T.HttpQuery("entryId")),
  body: Schema.optional(GoogleCloudDataplexV1Entry).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups/{entryGroupsId}/entries", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsEntryGroupsEntriesRequest>;

export type CreateProjectsLocationsEntryGroupsEntriesResponse = GoogleCloudDataplexV1Entry;
export const CreateProjectsLocationsEntryGroupsEntriesResponse = GoogleCloudDataplexV1Entry;

export type CreateProjectsLocationsEntryGroupsEntriesError = CommonErrors;

export const createProjectsLocationsEntryGroupsEntries: API.OperationMethod<CreateProjectsLocationsEntryGroupsEntriesRequest, CreateProjectsLocationsEntryGroupsEntriesResponse, CreateProjectsLocationsEntryGroupsEntriesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsEntryGroupsEntriesRequest,
  output: CreateProjectsLocationsEntryGroupsEntriesResponse,
  errors: [],
}));

/** Deletes an Entry Link. */
export interface DeleteProjectsLocationsEntryGroupsEntryLinksRequest {
  /** Required. The resource name of the Entry Link: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id}. */
  name: string;
}

export const DeleteProjectsLocationsEntryGroupsEntryLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups/{entryGroupsId}/entryLinks/{entryLinksId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsEntryGroupsEntryLinksRequest>;

export type DeleteProjectsLocationsEntryGroupsEntryLinksResponse = GoogleCloudDataplexV1EntryLink;
export const DeleteProjectsLocationsEntryGroupsEntryLinksResponse = GoogleCloudDataplexV1EntryLink;

export type DeleteProjectsLocationsEntryGroupsEntryLinksError = CommonErrors;

export const deleteProjectsLocationsEntryGroupsEntryLinks: API.OperationMethod<DeleteProjectsLocationsEntryGroupsEntryLinksRequest, DeleteProjectsLocationsEntryGroupsEntryLinksResponse, DeleteProjectsLocationsEntryGroupsEntryLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsEntryGroupsEntryLinksRequest,
  output: DeleteProjectsLocationsEntryGroupsEntryLinksResponse,
  errors: [],
}));

/** Gets an Entry Link. */
export interface GetProjectsLocationsEntryGroupsEntryLinksRequest {
  /** Required. The resource name of the Entry Link: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id}. */
  name: string;
}

export const GetProjectsLocationsEntryGroupsEntryLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups/{entryGroupsId}/entryLinks/{entryLinksId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsEntryGroupsEntryLinksRequest>;

export type GetProjectsLocationsEntryGroupsEntryLinksResponse = GoogleCloudDataplexV1EntryLink;
export const GetProjectsLocationsEntryGroupsEntryLinksResponse = GoogleCloudDataplexV1EntryLink;

export type GetProjectsLocationsEntryGroupsEntryLinksError = CommonErrors;

export const getProjectsLocationsEntryGroupsEntryLinks: API.OperationMethod<GetProjectsLocationsEntryGroupsEntryLinksRequest, GetProjectsLocationsEntryGroupsEntryLinksResponse, GetProjectsLocationsEntryGroupsEntryLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsEntryGroupsEntryLinksRequest,
  output: GetProjectsLocationsEntryGroupsEntryLinksResponse,
  errors: [],
}));

/** Creates an Entry Link. */
export interface CreateProjectsLocationsEntryGroupsEntryLinksRequest {
  /** Required. Entry Link identifier * Must contain only lowercase letters, numbers and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the EntryGroup. */
  entryLinkId?: string;
  /** Required. The resource name of the parent Entry Group: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}. */
  parent: string;
  /** Request body */
  body?: GoogleCloudDataplexV1EntryLink;
}

export const CreateProjectsLocationsEntryGroupsEntryLinksRequest = Schema.Struct({
  entryLinkId: Schema.optional(Schema.String).pipe(T.HttpQuery("entryLinkId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDataplexV1EntryLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/entryGroups/{entryGroupsId}/entryLinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsEntryGroupsEntryLinksRequest>;

export type CreateProjectsLocationsEntryGroupsEntryLinksResponse = GoogleCloudDataplexV1EntryLink;
export const CreateProjectsLocationsEntryGroupsEntryLinksResponse = GoogleCloudDataplexV1EntryLink;

export type CreateProjectsLocationsEntryGroupsEntryLinksError = CommonErrors;

export const createProjectsLocationsEntryGroupsEntryLinks: API.OperationMethod<CreateProjectsLocationsEntryGroupsEntryLinksRequest, CreateProjectsLocationsEntryGroupsEntryLinksResponse, CreateProjectsLocationsEntryGroupsEntryLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsEntryGroupsEntryLinksRequest,
  output: CreateProjectsLocationsEntryGroupsEntryLinksResponse,
  errors: [],
}));

/** Retrieves a DataTaxonomy resource. */
export interface GetProjectsLocationsDataTaxonomiesRequest {
  name: string;
}

export const GetProjectsLocationsDataTaxonomiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies/{dataTaxonomiesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDataTaxonomiesRequest>;

export type GetProjectsLocationsDataTaxonomiesResponse = GoogleCloudDataplexV1DataTaxonomy;
export const GetProjectsLocationsDataTaxonomiesResponse = GoogleCloudDataplexV1DataTaxonomy;

export type GetProjectsLocationsDataTaxonomiesError = CommonErrors;

export const getProjectsLocationsDataTaxonomies: API.OperationMethod<GetProjectsLocationsDataTaxonomiesRequest, GetProjectsLocationsDataTaxonomiesResponse, GetProjectsLocationsDataTaxonomiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDataTaxonomiesRequest,
  output: GetProjectsLocationsDataTaxonomiesResponse,
  errors: [],
}));

/** Lists DataTaxonomy resources in a project and location. */
export interface ListProjectsLocationsDataTaxonomiesRequest {
  /** Optional. Maximum number of DataTaxonomies to return. The service may return fewer than this value. If unspecified, at most 10 DataTaxonomies will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Order by fields for the result. */
  orderBy?: string;
  /** Optional. Page token received from a previous ListDataTaxonomies call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListDataTaxonomies must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The resource name of the DataTaxonomy location, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. */
  parent: string;
  /** Optional. Filter request. */
  filter?: string;
}

export const ListProjectsLocationsDataTaxonomiesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDataTaxonomiesRequest>;

export type ListProjectsLocationsDataTaxonomiesResponse = GoogleCloudDataplexV1ListDataTaxonomiesResponse;
export const ListProjectsLocationsDataTaxonomiesResponse = GoogleCloudDataplexV1ListDataTaxonomiesResponse;

export type ListProjectsLocationsDataTaxonomiesError = CommonErrors;

export const listProjectsLocationsDataTaxonomies = API.makePaginated(() => ({
  input: ListProjectsLocationsDataTaxonomiesRequest,
  output: ListProjectsLocationsDataTaxonomiesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsDataTaxonomiesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDataTaxonomiesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies/{dataTaxonomiesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDataTaxonomiesRequest>;

export type SetIamPolicyProjectsLocationsDataTaxonomiesResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsDataTaxonomiesResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsDataTaxonomiesError = CommonErrors;

export const setIamPolicyProjectsLocationsDataTaxonomies: API.OperationMethod<SetIamPolicyProjectsLocationsDataTaxonomiesRequest, SetIamPolicyProjectsLocationsDataTaxonomiesResponse, SetIamPolicyProjectsLocationsDataTaxonomiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDataTaxonomiesRequest,
  output: SetIamPolicyProjectsLocationsDataTaxonomiesResponse,
  errors: [],
}));

/** Deletes a DataTaxonomy resource. All attributes within the DataTaxonomy must be deleted before the DataTaxonomy can be deleted. */
export interface DeleteProjectsLocationsDataTaxonomiesRequest {
  /** Optional. If the client provided etag value does not match the current etag value,the DeleteDataTaxonomy method returns an ABORTED error. */
  etag?: string;
  /** Required. The resource name of the DataTaxonomy: projects/{project_number}/locations/{location_id}/dataTaxonomies/{data_taxonomy_id} */
  name: string;
}

export const DeleteProjectsLocationsDataTaxonomiesRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies/{dataTaxonomiesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDataTaxonomiesRequest>;

export type DeleteProjectsLocationsDataTaxonomiesResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsDataTaxonomiesResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsDataTaxonomiesError = CommonErrors;

export const deleteProjectsLocationsDataTaxonomies: API.OperationMethod<DeleteProjectsLocationsDataTaxonomiesRequest, DeleteProjectsLocationsDataTaxonomiesResponse, DeleteProjectsLocationsDataTaxonomiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDataTaxonomiesRequest,
  output: DeleteProjectsLocationsDataTaxonomiesResponse,
  errors: [],
}));

/** Updates a DataTaxonomy resource. */
export interface PatchProjectsLocationsDataTaxonomiesRequest {
  /** Output only. The relative resource name of the DataTaxonomy, of the form: projects/{project_number}/locations/{location_id}/dataTaxonomies/{data_taxonomy_id}. */
  name: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1DataTaxonomy;
}

export const PatchProjectsLocationsDataTaxonomiesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDataplexV1DataTaxonomy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies/{dataTaxonomiesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDataTaxonomiesRequest>;

export type PatchProjectsLocationsDataTaxonomiesResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsDataTaxonomiesResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsDataTaxonomiesError = CommonErrors;

export const patchProjectsLocationsDataTaxonomies: API.OperationMethod<PatchProjectsLocationsDataTaxonomiesRequest, PatchProjectsLocationsDataTaxonomiesResponse, PatchProjectsLocationsDataTaxonomiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDataTaxonomiesRequest,
  output: PatchProjectsLocationsDataTaxonomiesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsDataTaxonomiesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsDataTaxonomiesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies/{dataTaxonomiesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDataTaxonomiesRequest>;

export type GetIamPolicyProjectsLocationsDataTaxonomiesResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsDataTaxonomiesResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsDataTaxonomiesError = CommonErrors;

export const getIamPolicyProjectsLocationsDataTaxonomies: API.OperationMethod<GetIamPolicyProjectsLocationsDataTaxonomiesRequest, GetIamPolicyProjectsLocationsDataTaxonomiesResponse, GetIamPolicyProjectsLocationsDataTaxonomiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDataTaxonomiesRequest,
  output: GetIamPolicyProjectsLocationsDataTaxonomiesResponse,
  errors: [],
}));

/** Create a DataTaxonomy resource. */
export interface CreateProjectsLocationsDataTaxonomiesRequest {
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  parent: string;
  /** Required. DataTaxonomy identifier. * Must contain only lowercase letters, numbers and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the Project. */
  dataTaxonomyId?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1DataTaxonomy;
}

export const CreateProjectsLocationsDataTaxonomiesRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dataTaxonomyId: Schema.optional(Schema.String).pipe(T.HttpQuery("dataTaxonomyId")),
  body: Schema.optional(GoogleCloudDataplexV1DataTaxonomy).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDataTaxonomiesRequest>;

export type CreateProjectsLocationsDataTaxonomiesResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsDataTaxonomiesResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsDataTaxonomiesError = CommonErrors;

export const createProjectsLocationsDataTaxonomies: API.OperationMethod<CreateProjectsLocationsDataTaxonomiesRequest, CreateProjectsLocationsDataTaxonomiesResponse, CreateProjectsLocationsDataTaxonomiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDataTaxonomiesRequest,
  output: CreateProjectsLocationsDataTaxonomiesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsDataTaxonomiesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDataTaxonomiesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies/{dataTaxonomiesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDataTaxonomiesRequest>;

export type TestIamPermissionsProjectsLocationsDataTaxonomiesResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDataTaxonomiesResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDataTaxonomiesError = CommonErrors;

export const testIamPermissionsProjectsLocationsDataTaxonomies: API.OperationMethod<TestIamPermissionsProjectsLocationsDataTaxonomiesRequest, TestIamPermissionsProjectsLocationsDataTaxonomiesResponse, TestIamPermissionsProjectsLocationsDataTaxonomiesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDataTaxonomiesRequest,
  output: TestIamPermissionsProjectsLocationsDataTaxonomiesResponse,
  errors: [],
}));

/** Updates a DataAttribute resource. */
export interface PatchProjectsLocationsDataTaxonomiesAttributesRequest {
  /** Required. Mask of fields to update. */
  updateMask?: string;
  /** Output only. The relative resource name of the dataAttribute, of the form: projects/{project_number}/locations/{location_id}/dataTaxonomies/{dataTaxonomy}/attributes/{data_attribute_id}. */
  name: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1DataAttribute;
}

export const PatchProjectsLocationsDataTaxonomiesAttributesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1DataAttribute).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies/{dataTaxonomiesId}/attributes/{attributesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDataTaxonomiesAttributesRequest>;

export type PatchProjectsLocationsDataTaxonomiesAttributesResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsDataTaxonomiesAttributesResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsDataTaxonomiesAttributesError = CommonErrors;

export const patchProjectsLocationsDataTaxonomiesAttributes: API.OperationMethod<PatchProjectsLocationsDataTaxonomiesAttributesRequest, PatchProjectsLocationsDataTaxonomiesAttributesResponse, PatchProjectsLocationsDataTaxonomiesAttributesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDataTaxonomiesAttributesRequest,
  output: PatchProjectsLocationsDataTaxonomiesAttributesResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsDataTaxonomiesAttributesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDataTaxonomiesAttributesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies/{dataTaxonomiesId}/attributes/{attributesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDataTaxonomiesAttributesRequest>;

export type TestIamPermissionsProjectsLocationsDataTaxonomiesAttributesResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDataTaxonomiesAttributesResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDataTaxonomiesAttributesError = CommonErrors;

export const testIamPermissionsProjectsLocationsDataTaxonomiesAttributes: API.OperationMethod<TestIamPermissionsProjectsLocationsDataTaxonomiesAttributesRequest, TestIamPermissionsProjectsLocationsDataTaxonomiesAttributesResponse, TestIamPermissionsProjectsLocationsDataTaxonomiesAttributesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDataTaxonomiesAttributesRequest,
  output: TestIamPermissionsProjectsLocationsDataTaxonomiesAttributesResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsDataTaxonomiesAttributesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDataTaxonomiesAttributesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies/{dataTaxonomiesId}/attributes/{attributesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDataTaxonomiesAttributesRequest>;

export type SetIamPolicyProjectsLocationsDataTaxonomiesAttributesResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsDataTaxonomiesAttributesResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsDataTaxonomiesAttributesError = CommonErrors;

export const setIamPolicyProjectsLocationsDataTaxonomiesAttributes: API.OperationMethod<SetIamPolicyProjectsLocationsDataTaxonomiesAttributesRequest, SetIamPolicyProjectsLocationsDataTaxonomiesAttributesResponse, SetIamPolicyProjectsLocationsDataTaxonomiesAttributesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDataTaxonomiesAttributesRequest,
  output: SetIamPolicyProjectsLocationsDataTaxonomiesAttributesResponse,
  errors: [],
}));

/** Retrieves a Data Attribute resource. */
export interface GetProjectsLocationsDataTaxonomiesAttributesRequest {
  /** Required. The resource name of the dataAttribute: projects/{project_number}/locations/{location_id}/dataTaxonomies/{dataTaxonomy}/attributes/{data_attribute_id} */
  name: string;
}

export const GetProjectsLocationsDataTaxonomiesAttributesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies/{dataTaxonomiesId}/attributes/{attributesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDataTaxonomiesAttributesRequest>;

export type GetProjectsLocationsDataTaxonomiesAttributesResponse = GoogleCloudDataplexV1DataAttribute;
export const GetProjectsLocationsDataTaxonomiesAttributesResponse = GoogleCloudDataplexV1DataAttribute;

export type GetProjectsLocationsDataTaxonomiesAttributesError = CommonErrors;

export const getProjectsLocationsDataTaxonomiesAttributes: API.OperationMethod<GetProjectsLocationsDataTaxonomiesAttributesRequest, GetProjectsLocationsDataTaxonomiesAttributesResponse, GetProjectsLocationsDataTaxonomiesAttributesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDataTaxonomiesAttributesRequest,
  output: GetProjectsLocationsDataTaxonomiesAttributesResponse,
  errors: [],
}));

/** Deletes a Data Attribute resource. */
export interface DeleteProjectsLocationsDataTaxonomiesAttributesRequest {
  /** Optional. If the client provided etag value does not match the current etag value, the DeleteDataAttribute method returns an ABORTED error response. */
  etag?: string;
  /** Required. The resource name of the DataAttribute: projects/{project_number}/locations/{location_id}/dataTaxonomies/{dataTaxonomy}/attributes/{data_attribute_id} */
  name: string;
}

export const DeleteProjectsLocationsDataTaxonomiesAttributesRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies/{dataTaxonomiesId}/attributes/{attributesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDataTaxonomiesAttributesRequest>;

export type DeleteProjectsLocationsDataTaxonomiesAttributesResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsDataTaxonomiesAttributesResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsDataTaxonomiesAttributesError = CommonErrors;

export const deleteProjectsLocationsDataTaxonomiesAttributes: API.OperationMethod<DeleteProjectsLocationsDataTaxonomiesAttributesRequest, DeleteProjectsLocationsDataTaxonomiesAttributesResponse, DeleteProjectsLocationsDataTaxonomiesAttributesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDataTaxonomiesAttributesRequest,
  output: DeleteProjectsLocationsDataTaxonomiesAttributesResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsDataTaxonomiesAttributesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyProjectsLocationsDataTaxonomiesAttributesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies/{dataTaxonomiesId}/attributes/{attributesId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDataTaxonomiesAttributesRequest>;

export type GetIamPolicyProjectsLocationsDataTaxonomiesAttributesResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsDataTaxonomiesAttributesResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsDataTaxonomiesAttributesError = CommonErrors;

export const getIamPolicyProjectsLocationsDataTaxonomiesAttributes: API.OperationMethod<GetIamPolicyProjectsLocationsDataTaxonomiesAttributesRequest, GetIamPolicyProjectsLocationsDataTaxonomiesAttributesResponse, GetIamPolicyProjectsLocationsDataTaxonomiesAttributesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDataTaxonomiesAttributesRequest,
  output: GetIamPolicyProjectsLocationsDataTaxonomiesAttributesResponse,
  errors: [],
}));

/** Create a DataAttribute resource. */
export interface CreateProjectsLocationsDataTaxonomiesAttributesRequest {
  /** Required. DataAttribute identifier. * Must contain only lowercase letters, numbers and hyphens. * Must start with a letter. * Must be between 1-63 characters. * Must end with a number or a letter. * Must be unique within the DataTaxonomy. */
  dataAttributeId?: string;
  /** Required. The resource name of the parent data taxonomy projects/{project_number}/locations/{location_id}/dataTaxonomies/{data_taxonomy_id} */
  parent: string;
  /** Optional. Only validate the request, but do not perform mutations. The default is false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1DataAttribute;
}

export const CreateProjectsLocationsDataTaxonomiesAttributesRequest = Schema.Struct({
  dataAttributeId: Schema.optional(Schema.String).pipe(T.HttpQuery("dataAttributeId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1DataAttribute).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies/{dataTaxonomiesId}/attributes", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDataTaxonomiesAttributesRequest>;

export type CreateProjectsLocationsDataTaxonomiesAttributesResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsDataTaxonomiesAttributesResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsDataTaxonomiesAttributesError = CommonErrors;

export const createProjectsLocationsDataTaxonomiesAttributes: API.OperationMethod<CreateProjectsLocationsDataTaxonomiesAttributesRequest, CreateProjectsLocationsDataTaxonomiesAttributesResponse, CreateProjectsLocationsDataTaxonomiesAttributesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDataTaxonomiesAttributesRequest,
  output: CreateProjectsLocationsDataTaxonomiesAttributesResponse,
  errors: [],
}));

/** Lists Data Attribute resources in a DataTaxonomy. */
export interface ListProjectsLocationsDataTaxonomiesAttributesRequest {
  /** Optional. Maximum number of DataAttributes to return. The service may return fewer than this value. If unspecified, at most 10 dataAttributes will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Filter request. */
  filter?: string;
  /** Optional. Order by fields for the result. */
  orderBy?: string;
  /** Optional. Page token received from a previous ListDataAttributes call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListDataAttributes must match the call that provided the page token. */
  pageToken?: string;
  /** Required. The resource name of the DataTaxonomy: projects/{project_number}/locations/{location_id}/dataTaxonomies/{data_taxonomy_id} */
  parent: string;
}

export const ListProjectsLocationsDataTaxonomiesAttributesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataTaxonomies/{dataTaxonomiesId}/attributes" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDataTaxonomiesAttributesRequest>;

export type ListProjectsLocationsDataTaxonomiesAttributesResponse = GoogleCloudDataplexV1ListDataAttributesResponse;
export const ListProjectsLocationsDataTaxonomiesAttributesResponse = GoogleCloudDataplexV1ListDataAttributesResponse;

export type ListProjectsLocationsDataTaxonomiesAttributesError = CommonErrors;

export const listProjectsLocationsDataTaxonomiesAttributes = API.makePaginated(() => ({
  input: ListProjectsLocationsDataTaxonomiesAttributesRequest,
  output: ListProjectsLocationsDataTaxonomiesAttributesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsPolicyIntentsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsPolicyIntentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/policyIntents/{policyIntentsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsPolicyIntentsRequest>;

export type SetIamPolicyProjectsLocationsPolicyIntentsResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsPolicyIntentsResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsPolicyIntentsError = CommonErrors;

export const setIamPolicyProjectsLocationsPolicyIntents: API.OperationMethod<SetIamPolicyProjectsLocationsPolicyIntentsRequest, SetIamPolicyProjectsLocationsPolicyIntentsResponse, SetIamPolicyProjectsLocationsPolicyIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsPolicyIntentsRequest,
  output: SetIamPolicyProjectsLocationsPolicyIntentsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsPolicyIntentsRequest {
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsPolicyIntentsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/policyIntents/{policyIntentsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsPolicyIntentsRequest>;

export type GetIamPolicyProjectsLocationsPolicyIntentsResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsPolicyIntentsResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsPolicyIntentsError = CommonErrors;

export const getIamPolicyProjectsLocationsPolicyIntents: API.OperationMethod<GetIamPolicyProjectsLocationsPolicyIntentsRequest, GetIamPolicyProjectsLocationsPolicyIntentsResponse, GetIamPolicyProjectsLocationsPolicyIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsPolicyIntentsRequest,
  output: GetIamPolicyProjectsLocationsPolicyIntentsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsPolicyIntentsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsPolicyIntentsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/policyIntents/{policyIntentsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsPolicyIntentsRequest>;

export type TestIamPermissionsProjectsLocationsPolicyIntentsResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsPolicyIntentsResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsPolicyIntentsError = CommonErrors;

export const testIamPermissionsProjectsLocationsPolicyIntents: API.OperationMethod<TestIamPermissionsProjectsLocationsPolicyIntentsRequest, TestIamPermissionsProjectsLocationsPolicyIntentsResponse, TestIamPermissionsProjectsLocationsPolicyIntentsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsPolicyIntentsRequest,
  output: TestIamPermissionsProjectsLocationsPolicyIntentsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyProjectsLocationsDataProductsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDataProductsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataProducts/{dataProductsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDataProductsRequest>;

export type SetIamPolicyProjectsLocationsDataProductsResponse = GoogleIamV1Policy;
export const SetIamPolicyProjectsLocationsDataProductsResponse = GoogleIamV1Policy;

export type SetIamPolicyProjectsLocationsDataProductsError = CommonErrors;

export const setIamPolicyProjectsLocationsDataProducts: API.OperationMethod<SetIamPolicyProjectsLocationsDataProductsRequest, SetIamPolicyProjectsLocationsDataProductsResponse, SetIamPolicyProjectsLocationsDataProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDataProductsRequest,
  output: SetIamPolicyProjectsLocationsDataProductsResponse,
  errors: [],
}));

/** Creates a data product. */
export interface CreateProjectsLocationsDataProductsRequest {
  /** Optional. The ID of the data product to create.The ID must conform to RFC-1034 and contain only lower-case letters (a-z), numbers (0-9), or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum. Characters outside of ASCII are not permitted. Valid format regex: ^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$ If not provided, a system generated ID will be used. */
  dataProductId?: string;
  /** Optional. Validates the request without actually creating the data product. Default: false. */
  validateOnly?: boolean;
  /** Required. The parent resource where this data product will be created. Format: projects/{project_id_or_number}/locations/{location_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudDataplexV1DataProduct;
}

export const CreateProjectsLocationsDataProductsRequest = Schema.Struct({
  dataProductId: Schema.optional(Schema.String).pipe(T.HttpQuery("dataProductId")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudDataplexV1DataProduct).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataProducts", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDataProductsRequest>;

export type CreateProjectsLocationsDataProductsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsDataProductsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsDataProductsError = CommonErrors;

export const createProjectsLocationsDataProducts: API.OperationMethod<CreateProjectsLocationsDataProductsRequest, CreateProjectsLocationsDataProductsResponse, CreateProjectsLocationsDataProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDataProductsRequest,
  output: CreateProjectsLocationsDataProductsResponse,
  errors: [],
}));

/** Deletes a data product. The deletion will fail if the data product is not empty (i.e. contains at least one data asset). */
export interface DeleteProjectsLocationsDataProductsRequest {
  /** Optional. The etag of the data product.If an etag is provided and does not match the current etag of the data product, then the deletion will be blocked and an ABORTED error will be returned. */
  etag?: string;
  /** Optional. Validates the request without actually deleting the data product. Default: false. */
  validateOnly?: boolean;
  /** Required. The name of the data product to delete. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id} */
  name: string;
}

export const DeleteProjectsLocationsDataProductsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/dataProducts/{dataProductsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDataProductsRequest>;

export type DeleteProjectsLocationsDataProductsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsDataProductsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsDataProductsError = CommonErrors;

export const deleteProjectsLocationsDataProducts: API.OperationMethod<DeleteProjectsLocationsDataProductsRequest, DeleteProjectsLocationsDataProductsResponse, DeleteProjectsLocationsDataProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDataProductsRequest,
  output: DeleteProjectsLocationsDataProductsResponse,
  errors: [],
}));

/** Lists data products for a given project. */
export interface ListProjectsLocationsDataProductsRequest {
  /** Required. The parent, which has this collection of data products.Format: projects/{project_id_or_number}/locations/{location_id}.Supports listing across all locations with the wildcard - (hyphen) character. Example: projects/{project_id_or_number}/locations/- */
  parent: string;
  /** Optional. Filter expression that filters data products listed in the response.Example of using this filter is: display_name="my-data-product" */
  filter?: string;
  /** Optional. The maximum number of data products to return. The service may return fewer than this value. If unspecified, at most 50 data products will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous ListDataProducts call. Provide this to retrieve the subsequent page.When paginating, all other parameters provided to ListDataProducts must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Order by expression that orders data products listed in the response.Supported Order by fields are: name or create_time.If not specified, the ordering is undefined.Ordering by create_time is not supported when listing resources across locations (i.e. when request contains /locations/-). */
  orderBy?: string;
}

export const ListProjectsLocationsDataProductsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataProducts" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDataProductsRequest>;

export type ListProjectsLocationsDataProductsResponse = GoogleCloudDataplexV1ListDataProductsResponse;
export const ListProjectsLocationsDataProductsResponse = GoogleCloudDataplexV1ListDataProductsResponse;

export type ListProjectsLocationsDataProductsError = CommonErrors;

export const listProjectsLocationsDataProducts = API.makePaginated(() => ({
  input: ListProjectsLocationsDataProductsRequest,
  output: ListProjectsLocationsDataProductsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a data product. */
export interface PatchProjectsLocationsDataProductsRequest {
  /** Optional. The list of fields to update. If this is empty or not set, then all the fields will be updated. */
  updateMask?: string;
  /** Identifier. Resource name of the data product. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}. */
  name: string;
  /** Optional. Validates the request without actually updating the data product. Default: false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1DataProduct;
}

export const PatchProjectsLocationsDataProductsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1DataProduct).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/dataProducts/{dataProductsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDataProductsRequest>;

export type PatchProjectsLocationsDataProductsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsDataProductsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsDataProductsError = CommonErrors;

export const patchProjectsLocationsDataProducts: API.OperationMethod<PatchProjectsLocationsDataProductsRequest, PatchProjectsLocationsDataProductsResponse, PatchProjectsLocationsDataProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDataProductsRequest,
  output: PatchProjectsLocationsDataProductsResponse,
  errors: [],
}));

/** Gets a data product. */
export interface GetProjectsLocationsDataProductsRequest {
  /** Required. The name of the data product to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id} */
  name: string;
}

export const GetProjectsLocationsDataProductsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataProducts/{dataProductsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDataProductsRequest>;

export type GetProjectsLocationsDataProductsResponse = GoogleCloudDataplexV1DataProduct;
export const GetProjectsLocationsDataProductsResponse = GoogleCloudDataplexV1DataProduct;

export type GetProjectsLocationsDataProductsError = CommonErrors;

export const getProjectsLocationsDataProducts: API.OperationMethod<GetProjectsLocationsDataProductsRequest, GetProjectsLocationsDataProductsResponse, GetProjectsLocationsDataProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDataProductsRequest,
  output: GetProjectsLocationsDataProductsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsProjectsLocationsDataProductsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDataProductsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataProducts/{dataProductsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDataProductsRequest>;

export type TestIamPermissionsProjectsLocationsDataProductsResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDataProductsResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDataProductsError = CommonErrors;

export const testIamPermissionsProjectsLocationsDataProducts: API.OperationMethod<TestIamPermissionsProjectsLocationsDataProductsRequest, TestIamPermissionsProjectsLocationsDataProductsResponse, TestIamPermissionsProjectsLocationsDataProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDataProductsRequest,
  output: TestIamPermissionsProjectsLocationsDataProductsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyProjectsLocationsDataProductsRequest {
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
}

export const GetIamPolicyProjectsLocationsDataProductsRequest = Schema.Struct({
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataProducts/{dataProductsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDataProductsRequest>;

export type GetIamPolicyProjectsLocationsDataProductsResponse = GoogleIamV1Policy;
export const GetIamPolicyProjectsLocationsDataProductsResponse = GoogleIamV1Policy;

export type GetIamPolicyProjectsLocationsDataProductsError = CommonErrors;

export const getIamPolicyProjectsLocationsDataProducts: API.OperationMethod<GetIamPolicyProjectsLocationsDataProductsRequest, GetIamPolicyProjectsLocationsDataProductsResponse, GetIamPolicyProjectsLocationsDataProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDataProductsRequest,
  output: GetIamPolicyProjectsLocationsDataProductsResponse,
  errors: [],
}));

/** Deletes a data asset. */
export interface DeleteProjectsLocationsDataProductsDataAssetsRequest {
  /** Optional. Validates the request without actually deleting the data asset. Defaults to false. */
  validateOnly?: boolean;
  /** Required. The name of the data asset to delete. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}/dataAssets/{data_asset_id} */
  name: string;
  /** Optional. The etag of the data asset. If this is provided, it must match the server's etag. If the etag is provided and does not match the server-computed etag, the request must fail with a ABORTED error code. */
  etag?: string;
}

export const DeleteProjectsLocationsDataProductsDataAssetsRequest = Schema.Struct({
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  name: Schema.String.pipe(T.HttpPath("name")),
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/dataProducts/{dataProductsId}/dataAssets/{dataAssetsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDataProductsDataAssetsRequest>;

export type DeleteProjectsLocationsDataProductsDataAssetsResponse = GoogleLongrunningOperation;
export const DeleteProjectsLocationsDataProductsDataAssetsResponse = GoogleLongrunningOperation;

export type DeleteProjectsLocationsDataProductsDataAssetsError = CommonErrors;

export const deleteProjectsLocationsDataProductsDataAssets: API.OperationMethod<DeleteProjectsLocationsDataProductsDataAssetsRequest, DeleteProjectsLocationsDataProductsDataAssetsResponse, DeleteProjectsLocationsDataProductsDataAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDataProductsDataAssetsRequest,
  output: DeleteProjectsLocationsDataProductsDataAssetsResponse,
  errors: [],
}));

/** Lists data assets for a given data product. */
export interface ListProjectsLocationsDataProductsDataAssetsRequest {
  /** Optional. Filter expression that filters data assets listed in the response. */
  filter?: string;
  /** Required. The parent, which has this collection of data assets. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id} */
  parent: string;
  /** Optional. A page token, received from a previous ListDataAssets call. Provide this to retrieve the subsequent page.When paginating, all other parameters provided to ListDataAssets must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Order by expression that orders data assets listed in the response.Supported order_by fields are: name or create_time.If not specified, the ordering is undefined. */
  orderBy?: string;
  /** Optional. The maximum number of data assets to return. The service may return fewer than this value. If unspecified, at most 50 data assets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
}

export const ListProjectsLocationsDataProductsDataAssetsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataProducts/{dataProductsId}/dataAssets" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDataProductsDataAssetsRequest>;

export type ListProjectsLocationsDataProductsDataAssetsResponse = GoogleCloudDataplexV1ListDataAssetsResponse;
export const ListProjectsLocationsDataProductsDataAssetsResponse = GoogleCloudDataplexV1ListDataAssetsResponse;

export type ListProjectsLocationsDataProductsDataAssetsError = CommonErrors;

export const listProjectsLocationsDataProductsDataAssets = API.makePaginated(() => ({
  input: ListProjectsLocationsDataProductsDataAssetsRequest,
  output: ListProjectsLocationsDataProductsDataAssetsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets a data asset. */
export interface GetProjectsLocationsDataProductsDataAssetsRequest {
  /** Required. The name of the data asset to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}/dataAssets/{data_asset_id} */
  name: string;
}

export const GetProjectsLocationsDataProductsDataAssetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataProducts/{dataProductsId}/dataAssets/{dataAssetsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDataProductsDataAssetsRequest>;

export type GetProjectsLocationsDataProductsDataAssetsResponse = GoogleCloudDataplexV1DataAsset;
export const GetProjectsLocationsDataProductsDataAssetsResponse = GoogleCloudDataplexV1DataAsset;

export type GetProjectsLocationsDataProductsDataAssetsError = CommonErrors;

export const getProjectsLocationsDataProductsDataAssets: API.OperationMethod<GetProjectsLocationsDataProductsDataAssetsRequest, GetProjectsLocationsDataProductsDataAssetsResponse, GetProjectsLocationsDataProductsDataAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDataProductsDataAssetsRequest,
  output: GetProjectsLocationsDataProductsDataAssetsResponse,
  errors: [],
}));

/** Creates a data asset. */
export interface CreateProjectsLocationsDataProductsDataAssetsRequest {
  /** Optional. The ID of the data asset to create.The ID must conform to RFC-1034 and contain only lower-case letters (a-z), numbers (0-9), or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum. Characters outside of ASCII are not permitted. Valid format regex: ^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$ If not provided, a system generated ID will be used. */
  dataAssetId?: string;
  /** Required. The parent resource where this data asset will be created. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id} */
  parent: string;
  /** Optional. Validates the request without actually creating the data asset. Defaults to false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1DataAsset;
}

export const CreateProjectsLocationsDataProductsDataAssetsRequest = Schema.Struct({
  dataAssetId: Schema.optional(Schema.String).pipe(T.HttpQuery("dataAssetId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1DataAsset).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataProducts/{dataProductsId}/dataAssets", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDataProductsDataAssetsRequest>;

export type CreateProjectsLocationsDataProductsDataAssetsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsDataProductsDataAssetsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsDataProductsDataAssetsError = CommonErrors;

export const createProjectsLocationsDataProductsDataAssets: API.OperationMethod<CreateProjectsLocationsDataProductsDataAssetsRequest, CreateProjectsLocationsDataProductsDataAssetsResponse, CreateProjectsLocationsDataProductsDataAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDataProductsDataAssetsRequest,
  output: CreateProjectsLocationsDataProductsDataAssetsResponse,
  errors: [],
}));

/** Updates a data asset. */
export interface PatchProjectsLocationsDataProductsDataAssetsRequest {
  /** Identifier. Resource name of the data asset. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}/dataAssets/{data_asset_id} */
  name: string;
  /** Optional. The list of fields to update. If this is empty or not set, then all the fields will be updated. */
  updateMask?: string;
  /** Optional. Validates the request without actually updating the data asset. Defaults to false. */
  validateOnly?: boolean;
  /** Request body */
  body?: GoogleCloudDataplexV1DataAsset;
}

export const PatchProjectsLocationsDataProductsDataAssetsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  validateOnly: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("validateOnly")),
  body: Schema.optional(GoogleCloudDataplexV1DataAsset).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/dataProducts/{dataProductsId}/dataAssets/{dataAssetsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDataProductsDataAssetsRequest>;

export type PatchProjectsLocationsDataProductsDataAssetsResponse = GoogleLongrunningOperation;
export const PatchProjectsLocationsDataProductsDataAssetsResponse = GoogleLongrunningOperation;

export type PatchProjectsLocationsDataProductsDataAssetsError = CommonErrors;

export const patchProjectsLocationsDataProductsDataAssets: API.OperationMethod<PatchProjectsLocationsDataProductsDataAssetsRequest, PatchProjectsLocationsDataProductsDataAssetsResponse, PatchProjectsLocationsDataProductsDataAssetsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDataProductsDataAssetsRequest,
  output: PatchProjectsLocationsDataProductsDataAssetsResponse,
  errors: [],
}));

/** Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set. */
export interface GetIamPolicyOrganizationsLocationsEncryptionConfigsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). */
  "options.requestedPolicyVersion"?: number;
}

export const GetIamPolicyOrganizationsLocationsEncryptionConfigsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  "options.requestedPolicyVersion": Schema.optional(Schema.Number).pipe(T.HttpQuery("options.requestedPolicyVersion")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/encryptionConfigs/{encryptionConfigsId}:getIamPolicy" }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyOrganizationsLocationsEncryptionConfigsRequest>;

export type GetIamPolicyOrganizationsLocationsEncryptionConfigsResponse = GoogleIamV1Policy;
export const GetIamPolicyOrganizationsLocationsEncryptionConfigsResponse = GoogleIamV1Policy;

export type GetIamPolicyOrganizationsLocationsEncryptionConfigsError = CommonErrors;

export const getIamPolicyOrganizationsLocationsEncryptionConfigs: API.OperationMethod<GetIamPolicyOrganizationsLocationsEncryptionConfigsRequest, GetIamPolicyOrganizationsLocationsEncryptionConfigsResponse, GetIamPolicyOrganizationsLocationsEncryptionConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyOrganizationsLocationsEncryptionConfigsRequest,
  output: GetIamPolicyOrganizationsLocationsEncryptionConfigsResponse,
  errors: [],
}));

/** Get an EncryptionConfig. */
export interface GetOrganizationsLocationsEncryptionConfigsRequest {
  /** Required. The name of the EncryptionConfig to fetch. */
  name: string;
}

export const GetOrganizationsLocationsEncryptionConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/encryptionConfigs/{encryptionConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsEncryptionConfigsRequest>;

export type GetOrganizationsLocationsEncryptionConfigsResponse = GoogleCloudDataplexV1EncryptionConfig;
export const GetOrganizationsLocationsEncryptionConfigsResponse = GoogleCloudDataplexV1EncryptionConfig;

export type GetOrganizationsLocationsEncryptionConfigsError = CommonErrors;

export const getOrganizationsLocationsEncryptionConfigs: API.OperationMethod<GetOrganizationsLocationsEncryptionConfigsRequest, GetOrganizationsLocationsEncryptionConfigsResponse, GetOrganizationsLocationsEncryptionConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsEncryptionConfigsRequest,
  output: GetOrganizationsLocationsEncryptionConfigsResponse,
  errors: [],
}));

/** Delete an EncryptionConfig. */
export interface DeleteOrganizationsLocationsEncryptionConfigsRequest {
  /** Optional. Etag of the EncryptionConfig. This is a strong etag. */
  etag?: string;
  /** Required. The name of the EncryptionConfig to delete. */
  name: string;
}

export const DeleteOrganizationsLocationsEncryptionConfigsRequest = Schema.Struct({
  etag: Schema.optional(Schema.String).pipe(T.HttpQuery("etag")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/locations/{locationsId}/encryptionConfigs/{encryptionConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsEncryptionConfigsRequest>;

export type DeleteOrganizationsLocationsEncryptionConfigsResponse = GoogleLongrunningOperation;
export const DeleteOrganizationsLocationsEncryptionConfigsResponse = GoogleLongrunningOperation;

export type DeleteOrganizationsLocationsEncryptionConfigsError = CommonErrors;

export const deleteOrganizationsLocationsEncryptionConfigs: API.OperationMethod<DeleteOrganizationsLocationsEncryptionConfigsRequest, DeleteOrganizationsLocationsEncryptionConfigsResponse, DeleteOrganizationsLocationsEncryptionConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsEncryptionConfigsRequest,
  output: DeleteOrganizationsLocationsEncryptionConfigsResponse,
  errors: [],
}));

/** Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning. */
export interface TestIamPermissionsOrganizationsLocationsEncryptionConfigsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1TestIamPermissionsRequest;
}

export const TestIamPermissionsOrganizationsLocationsEncryptionConfigsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/encryptionConfigs/{encryptionConfigsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsOrganizationsLocationsEncryptionConfigsRequest>;

export type TestIamPermissionsOrganizationsLocationsEncryptionConfigsResponse = GoogleIamV1TestIamPermissionsResponse;
export const TestIamPermissionsOrganizationsLocationsEncryptionConfigsResponse = GoogleIamV1TestIamPermissionsResponse;

export type TestIamPermissionsOrganizationsLocationsEncryptionConfigsError = CommonErrors;

export const testIamPermissionsOrganizationsLocationsEncryptionConfigs: API.OperationMethod<TestIamPermissionsOrganizationsLocationsEncryptionConfigsRequest, TestIamPermissionsOrganizationsLocationsEncryptionConfigsResponse, TestIamPermissionsOrganizationsLocationsEncryptionConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsOrganizationsLocationsEncryptionConfigsRequest,
  output: TestIamPermissionsOrganizationsLocationsEncryptionConfigsResponse,
  errors: [],
}));

/** Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors. */
export interface SetIamPolicyOrganizationsLocationsEncryptionConfigsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GoogleIamV1SetIamPolicyRequest;
}

export const SetIamPolicyOrganizationsLocationsEncryptionConfigsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GoogleIamV1SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/encryptionConfigs/{encryptionConfigsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyOrganizationsLocationsEncryptionConfigsRequest>;

export type SetIamPolicyOrganizationsLocationsEncryptionConfigsResponse = GoogleIamV1Policy;
export const SetIamPolicyOrganizationsLocationsEncryptionConfigsResponse = GoogleIamV1Policy;

export type SetIamPolicyOrganizationsLocationsEncryptionConfigsError = CommonErrors;

export const setIamPolicyOrganizationsLocationsEncryptionConfigs: API.OperationMethod<SetIamPolicyOrganizationsLocationsEncryptionConfigsRequest, SetIamPolicyOrganizationsLocationsEncryptionConfigsResponse, SetIamPolicyOrganizationsLocationsEncryptionConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyOrganizationsLocationsEncryptionConfigsRequest,
  output: SetIamPolicyOrganizationsLocationsEncryptionConfigsResponse,
  errors: [],
}));

/** Create an EncryptionConfig. */
export interface CreateOrganizationsLocationsEncryptionConfigsRequest {
  /** Required. The location at which the EncryptionConfig is to be created. */
  parent: string;
  /** Required. The ID of the EncryptionConfig to create. Currently, only a value of "default" is supported. */
  encryptionConfigId?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1EncryptionConfig;
}

export const CreateOrganizationsLocationsEncryptionConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  encryptionConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("encryptionConfigId")),
  body: Schema.optional(GoogleCloudDataplexV1EncryptionConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/encryptionConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateOrganizationsLocationsEncryptionConfigsRequest>;

export type CreateOrganizationsLocationsEncryptionConfigsResponse = GoogleLongrunningOperation;
export const CreateOrganizationsLocationsEncryptionConfigsResponse = GoogleLongrunningOperation;

export type CreateOrganizationsLocationsEncryptionConfigsError = CommonErrors;

export const createOrganizationsLocationsEncryptionConfigs: API.OperationMethod<CreateOrganizationsLocationsEncryptionConfigsRequest, CreateOrganizationsLocationsEncryptionConfigsResponse, CreateOrganizationsLocationsEncryptionConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateOrganizationsLocationsEncryptionConfigsRequest,
  output: CreateOrganizationsLocationsEncryptionConfigsResponse,
  errors: [],
}));

/** Update an EncryptionConfig. */
export interface PatchOrganizationsLocationsEncryptionConfigsRequest {
  /** Identifier. The resource name of the EncryptionConfig. Format: organizations/{organization}/locations/{location}/encryptionConfigs/{encryption_config} Global location is not supported. */
  name: string;
  /** Optional. Mask of fields to update. The service treats an omitted field mask as an implied field mask equivalent to all fields that are populated (have a non-empty value). */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudDataplexV1EncryptionConfig;
}

export const PatchOrganizationsLocationsEncryptionConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudDataplexV1EncryptionConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/organizations/{organizationsId}/locations/{locationsId}/encryptionConfigs/{encryptionConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchOrganizationsLocationsEncryptionConfigsRequest>;

export type PatchOrganizationsLocationsEncryptionConfigsResponse = GoogleLongrunningOperation;
export const PatchOrganizationsLocationsEncryptionConfigsResponse = GoogleLongrunningOperation;

export type PatchOrganizationsLocationsEncryptionConfigsError = CommonErrors;

export const patchOrganizationsLocationsEncryptionConfigs: API.OperationMethod<PatchOrganizationsLocationsEncryptionConfigsRequest, PatchOrganizationsLocationsEncryptionConfigsResponse, PatchOrganizationsLocationsEncryptionConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchOrganizationsLocationsEncryptionConfigsRequest,
  output: PatchOrganizationsLocationsEncryptionConfigsResponse,
  errors: [],
}));

/** List EncryptionConfigs. */
export interface ListOrganizationsLocationsEncryptionConfigsRequest {
  /** Required. The location for which the EncryptionConfig is to be listed. */
  parent: string;
  /** Optional. Filter the EncryptionConfigs to be returned. Using bare literals: (These values will be matched anywhere it may appear in the object's field values) * filter=some_value Using fields: (These values will be matched only in the specified field) * filter=some_field=some_value Supported fields: * name, key, create_time, update_time, encryption_state Example: * filter=name=organizations/123/locations/us-central1/encryptionConfigs/test-config conjunctions: (AND, OR, NOT) * filter=name=organizations/123/locations/us-central1/encryptionConfigs/test-config AND mode=CMEK logical operators: (>, <, >=, <=, !=, =, :), * filter=create_time>2024-05-01T00:00:00.000Z */
  filter?: string;
  /** Optional. Page token received from a previous ListEncryptionConfigs call. Provide this to retrieve the subsequent page. When paginating, the parameters - filter and order_by provided to ListEncryptionConfigs must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Maximum number of EncryptionConfigs to return. The service may return fewer than this value. If unspecified, at most 10 EncryptionConfigs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. Order by fields for the result. */
  orderBy?: string;
}

export const ListOrganizationsLocationsEncryptionConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  orderBy: Schema.optional(Schema.String).pipe(T.HttpQuery("orderBy")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/encryptionConfigs" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsEncryptionConfigsRequest>;

export type ListOrganizationsLocationsEncryptionConfigsResponse = GoogleCloudDataplexV1ListEncryptionConfigsResponse;
export const ListOrganizationsLocationsEncryptionConfigsResponse = GoogleCloudDataplexV1ListEncryptionConfigsResponse;

export type ListOrganizationsLocationsEncryptionConfigsError = CommonErrors;

export const listOrganizationsLocationsEncryptionConfigs = API.makePaginated(() => ({
  input: ListOrganizationsLocationsEncryptionConfigsRequest,
  output: ListOrganizationsLocationsEncryptionConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. */
export interface DeleteOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOrganizationsLocationsOperationsRequest>;

export type DeleteOrganizationsLocationsOperationsResponse = Empty;
export const DeleteOrganizationsLocationsOperationsResponse = Empty;

export type DeleteOrganizationsLocationsOperationsError = CommonErrors;

export const deleteOrganizationsLocationsOperations: API.OperationMethod<DeleteOrganizationsLocationsOperationsRequest, DeleteOrganizationsLocationsOperationsResponse, DeleteOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOrganizationsLocationsOperationsRequest,
  output: DeleteOrganizationsLocationsOperationsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED. */
export interface ListOrganizationsLocationsOperationsRequest {
  /** When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page token. */
  pageToken?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The name of the operation's parent resource. */
  name: string;
}

export const ListOrganizationsLocationsOperationsRequest = Schema.Struct({
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsOperationsRequest>;

export type ListOrganizationsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListOrganizationsLocationsOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListOrganizationsLocationsOperationsError = CommonErrors;

export const listOrganizationsLocationsOperations = API.makePaginated(() => ({
  input: ListOrganizationsLocationsOperationsRequest,
  output: ListOrganizationsLocationsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOrganizationsLocationsOperationsRequest>;

export type GetOrganizationsLocationsOperationsResponse = GoogleLongrunningOperation;
export const GetOrganizationsLocationsOperationsResponse = GoogleLongrunningOperation;

export type GetOrganizationsLocationsOperationsError = CommonErrors;

export const getOrganizationsLocationsOperations: API.OperationMethod<GetOrganizationsLocationsOperationsRequest, GetOrganizationsLocationsOperationsResponse, GetOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOrganizationsLocationsOperationsRequest,
  output: GetOrganizationsLocationsOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED. */
export interface CancelOrganizationsLocationsOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: GoogleLongrunningCancelOperationRequest;
}

export const CancelOrganizationsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleLongrunningCancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/organizations/{organizationsId}/locations/{locationsId}/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOrganizationsLocationsOperationsRequest>;

export type CancelOrganizationsLocationsOperationsResponse = Empty;
export const CancelOrganizationsLocationsOperationsResponse = Empty;

export type CancelOrganizationsLocationsOperationsError = CommonErrors;

export const cancelOrganizationsLocationsOperations: API.OperationMethod<CancelOrganizationsLocationsOperationsRequest, CancelOrganizationsLocationsOperationsResponse, CancelOrganizationsLocationsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOrganizationsLocationsOperationsRequest,
  output: CancelOrganizationsLocationsOperationsResponse,
  errors: [],
}));

