// ==========================================================================
// Analytics Hub API (analyticshub v1)
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
  name: "analyticshub",
  version: "v1",
  rootUrl: "https://analyticshub.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface JavaScriptUDF {
  /** Required. JavaScript code that contains a function `function_name` with the below signature: ``` /** * Transforms a Pub/Sub message. * @return {(Object)>|null)} - To * filter a message, return `null`. To transform a message return a map * with the following keys: * - (required) 'data' : {string} * - (optional) 'attributes' : {Object} * Returning empty `attributes` will remove all attributes from the * message. * * @param {(Object)>} Pub/Sub * message. Keys: * - (required) 'data' : {string} * - (required) 'attributes' : {Object} * * @param {Object} metadata - Pub/Sub message metadata. * Keys: * - (required) 'message_id' : {string} * - (optional) 'publish_time': {string} YYYY-MM-DDTHH:MM:SSZ format * - (optional) 'ordering_key': {string} * / function (message, metadata) { } ``` */
  code?: string;
  /** Required. Name of the JavasScript function that should applied to Pub/Sub messages. */
  functionName?: string;
}

export const JavaScriptUDF: Schema.Schema<JavaScriptUDF> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.String),
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "JavaScriptUDF" }) as any as Schema.Schema<JavaScriptUDF>;

export interface SubmitQueryTemplateRequest {
}

export const SubmitQueryTemplateRequest: Schema.Schema<SubmitQueryTemplateRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "SubmitQueryTemplateRequest" }) as any as Schema.Schema<SubmitQueryTemplateRequest>;

export interface DataProvider {
  /** Optional. Email or URL of the data provider. Max Length: 1000 bytes. */
  primaryContact?: string;
  /** Optional. Name of the data provider. */
  name?: string;
}

export const DataProvider: Schema.Schema<DataProvider> = Schema.suspend(() => Schema.Struct({
  primaryContact: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "DataProvider" }) as any as Schema.Schema<DataProvider>;

export interface RestrictedExportConfig {
  /** Optional. If true, enable restricted export. */
  enabled?: boolean;
  /** Optional. If true, restrict export of query result derived from restricted linked dataset table. */
  restrictQueryResult?: boolean;
  /** Output only. If true, restrict direct table access(read api/tabledata.list) on linked table. */
  restrictDirectTableAccess?: boolean;
}

export const RestrictedExportConfig: Schema.Schema<RestrictedExportConfig> = Schema.suspend(() => Schema.Struct({
  enabled: Schema.optional(Schema.Boolean),
  restrictQueryResult: Schema.optional(Schema.Boolean),
  restrictDirectTableAccess: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RestrictedExportConfig" }) as any as Schema.Schema<RestrictedExportConfig>;

export interface StoredProcedureConfig {
  /** Output only. Types of stored procedure supported to share. */
  allowedStoredProcedureTypes?: Array<"STORED_PROCEDURE_TYPE_UNSPECIFIED" | "SQL_PROCEDURE" | (string & {})>;
  /** Optional. If true, enable sharing of stored procedure. */
  enabled?: boolean;
}

export const StoredProcedureConfig: Schema.Schema<StoredProcedureConfig> = Schema.suspend(() => Schema.Struct({
  allowedStoredProcedureTypes: Schema.optional(Schema.Array(Schema.String)),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "StoredProcedureConfig" }) as any as Schema.Schema<StoredProcedureConfig>;

export interface GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfoGoogleCloudMarketplaceInfo {
  /** Output only. Resource name of the commercial service associated with the Marketplace Data Product. e.g. example.com */
  service?: string;
  /** Output only. Commercial state of the Marketplace Data Product. */
  commercialState?: "COMMERCIAL_STATE_UNSPECIFIED" | "ONBOARDING" | "ACTIVE" | (string & {});
}

export const GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfoGoogleCloudMarketplaceInfo: Schema.Schema<GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfoGoogleCloudMarketplaceInfo> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
  commercialState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfoGoogleCloudMarketplaceInfo" }) as any as Schema.Schema<GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfoGoogleCloudMarketplaceInfo>;

export interface GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfo {
  /** Output only. Details of the Marketplace Data Product associated with the Listing. */
  cloudMarketplace?: GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfoGoogleCloudMarketplaceInfo;
}

export const GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfo: Schema.Schema<GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfo> = Schema.suspend(() => Schema.Struct({
  cloudMarketplace: Schema.optional(GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfoGoogleCloudMarketplaceInfo),
})).annotate({ identifier: "GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfo" }) as any as Schema.Schema<GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfo>;

export interface SelectedResource {
  /** Optional. Format: For table: `projects/{projectId}/datasets/{datasetId}/tables/{tableId}` Example:"projects/test_project/datasets/test_dataset/tables/test_table" */
  table?: string;
  /** Optional. Format: For routine: `projects/{projectId}/datasets/{datasetId}/routines/{routineId}` Example:"projects/test_project/datasets/test_dataset/routines/test_routine" */
  routine?: string;
}

export const SelectedResource: Schema.Schema<SelectedResource> = Schema.suspend(() => Schema.Struct({
  table: Schema.optional(Schema.String),
  routine: Schema.optional(Schema.String),
})).annotate({ identifier: "SelectedResource" }) as any as Schema.Schema<SelectedResource>;

export interface Replica {
  /** Output only. Assigned by Analytics Hub based on real BigQuery replication state. */
  replicaState?: "REPLICA_STATE_UNSPECIFIED" | "READY_TO_USE" | "UNAVAILABLE" | (string & {});
  /** Output only. The geographic location where the replica resides. See [BigQuery locations](https://cloud.google.com/bigquery/docs/locations) for supported locations. Eg. "us-central1". */
  location?: string;
  /** Output only. Indicates that this replica is the primary replica. */
  primaryState?: "PRIMARY_STATE_UNSPECIFIED" | "PRIMARY_REPLICA" | (string & {});
}

export const Replica: Schema.Schema<Replica> = Schema.suspend(() => Schema.Struct({
  replicaState: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  primaryState: Schema.optional(Schema.String),
})).annotate({ identifier: "Replica" }) as any as Schema.Schema<Replica>;

export interface RestrictedExportPolicy {
  /** Optional. If true, restrict direct table access (read api/tabledata.list) on linked table. */
  restrictDirectTableAccess?: boolean;
  /** Optional. If true, restrict export of query result derived from restricted linked dataset table. */
  restrictQueryResult?: boolean;
  /** Optional. If true, enable restricted export. */
  enabled?: boolean;
}

export const RestrictedExportPolicy: Schema.Schema<RestrictedExportPolicy> = Schema.suspend(() => Schema.Struct({
  restrictDirectTableAccess: Schema.optional(Schema.Boolean),
  restrictQueryResult: Schema.optional(Schema.Boolean),
  enabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RestrictedExportPolicy" }) as any as Schema.Schema<RestrictedExportPolicy>;

export interface BigQueryDatasetSource {
  /** Optional. Resource in this dataset that is selectively shared. This field is required for data clean room exchanges. */
  selectedResources?: Array<SelectedResource>;
  /** Optional. Resource name of the dataset source for this listing. e.g. `projects/myproject/datasets/123` */
  dataset?: string;
  /** Optional. A list of regions where the publisher has created shared dataset replicas. */
  replicaLocations?: Array<string>;
  /** Output only. Server-owned effective state of replicas. Contains both primary and secondary replicas. Each replica includes a system-computed (output-only) state and primary designation. */
  effectiveReplicas?: Array<Replica>;
  /** Optional. If set, restricted export policy will be propagated and enforced on the linked dataset. */
  restrictedExportPolicy?: RestrictedExportPolicy;
}

export const BigQueryDatasetSource: Schema.Schema<BigQueryDatasetSource> = Schema.suspend(() => Schema.Struct({
  selectedResources: Schema.optional(Schema.Array(SelectedResource)),
  dataset: Schema.optional(Schema.String),
  replicaLocations: Schema.optional(Schema.Array(Schema.String)),
  effectiveReplicas: Schema.optional(Schema.Array(Replica)),
  restrictedExportPolicy: Schema.optional(RestrictedExportPolicy),
})).annotate({ identifier: "BigQueryDatasetSource" }) as any as Schema.Schema<BigQueryDatasetSource>;

export interface PubSubTopicSource {
  /** Required. Resource name of the Pub/Sub topic source for this listing. e.g. projects/myproject/topics/topicId */
  topic?: string;
  /** Optional. Region hint on where the data might be published. Data affinity regions are modifiable. See https://cloud.google.com/about/locations for full listing of possible Cloud regions. */
  dataAffinityRegions?: Array<string>;
}

export const PubSubTopicSource: Schema.Schema<PubSubTopicSource> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
  dataAffinityRegions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PubSubTopicSource" }) as any as Schema.Schema<PubSubTopicSource>;

export interface Publisher {
  /** Optional. Name of the listing publisher. */
  name?: string;
  /** Optional. Email or URL of the listing publisher. Max Length: 1000 bytes. */
  primaryContact?: string;
}

export const Publisher: Schema.Schema<Publisher> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  primaryContact: Schema.optional(Schema.String),
})).annotate({ identifier: "Publisher" }) as any as Schema.Schema<Publisher>;

export interface Listing {
  /** Optional. Type of discovery of the listing on the discovery page. */
  discoveryType?: "DISCOVERY_TYPE_UNSPECIFIED" | "DISCOVERY_TYPE_PRIVATE" | "DISCOVERY_TYPE_PUBLIC" | (string & {});
  /** Optional. Details of the data provider who owns the source data. */
  dataProvider?: DataProvider;
  /** Optional. Email or URL of the request access of the listing. Subscribers can use this reference to request access. Max Length: 1000 bytes. */
  requestAccess?: string;
  /** Output only. The resource name of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456` */
  name?: string;
  /** Optional. If set, restricted export configuration will be propagated and enforced on the linked dataset. */
  restrictedExportConfig?: RestrictedExportConfig;
  /** Optional. Short description of the listing. The description must not contain Unicode non-characters and C0 and C1 control codes except tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF). Default value is an empty string. Max length: 2000 bytes. */
  description?: string;
  /** Optional. Email or URL of the primary point of contact of the listing. Max Length: 1000 bytes. */
  primaryContact?: string;
  /** Optional. If set, stored procedure configuration will be propagated and enforced on the linked dataset. */
  storedProcedureConfig?: StoredProcedureConfig;
  /** Output only. Commercial info contains the information about the commercial data products associated with the listing. */
  commercialInfo?: GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfo;
  /** Output only. Listing shared asset type. */
  resourceType?: "SHARED_RESOURCE_TYPE_UNSPECIFIED" | "BIGQUERY_DATASET" | "PUBSUB_TOPIC" | (string & {});
  /** Shared dataset i.e. BigQuery dataset source. */
  bigqueryDataset?: BigQueryDatasetSource;
  /** Output only. Current state of the listing. */
  state?: "STATE_UNSPECIFIED" | "ACTIVE" | (string & {});
  /** Required. Human-readable display name of the listing. The display name must contain only Unicode letters, numbers (0-9), underscores (_), dashes (-), spaces ( ), ampersands (&) and can't start or end with spaces. Default value is an empty string. Max length: 63 bytes. */
  displayName?: string;
  /** Optional. Base64 encoded image representing the listing. Max Size: 3.0MiB Expected image dimensions are 512x512 pixels, however the API only performs validation on size of the encoded data. Note: For byte fields, the contents of the field are base64-encoded (which increases the size of the data by 33-36%) when using JSON on the wire. */
  icon?: string;
  /** Optional. Categories of the listing. Up to five categories are allowed. */
  categories?: Array<"CATEGORY_UNSPECIFIED" | "CATEGORY_OTHERS" | "CATEGORY_ADVERTISING_AND_MARKETING" | "CATEGORY_COMMERCE" | "CATEGORY_CLIMATE_AND_ENVIRONMENT" | "CATEGORY_DEMOGRAPHICS" | "CATEGORY_ECONOMICS" | "CATEGORY_EDUCATION" | "CATEGORY_ENERGY" | "CATEGORY_FINANCIAL" | "CATEGORY_GAMING" | "CATEGORY_GEOSPATIAL" | "CATEGORY_HEALTHCARE_AND_LIFE_SCIENCE" | "CATEGORY_MEDIA" | "CATEGORY_PUBLIC_SECTOR" | "CATEGORY_RETAIL" | "CATEGORY_SPORTS" | "CATEGORY_SCIENCE_AND_RESEARCH" | "CATEGORY_TRANSPORTATION_AND_LOGISTICS" | "CATEGORY_TRAVEL_AND_TOURISM" | "CATEGORY_GOOGLE_EARTH_ENGINE" | (string & {})>;
  /** Pub/Sub topic source. */
  pubsubTopic?: PubSubTopicSource;
  /** Optional. By default, false. If true, the Listing has an email sharing mandate enabled. */
  logLinkedDatasetQueryUserEmail?: boolean;
  /** Optional. If true, the listing is only available to get the resource metadata. Listing is non subscribable. */
  allowOnlyMetadataSharing?: boolean;
  /** Optional. Documentation describing the listing. */
  documentation?: string;
  /** Optional. Details of the publisher who owns the listing and who can share the source data. */
  publisher?: Publisher;
}

export const Listing: Schema.Schema<Listing> = Schema.suspend(() => Schema.Struct({
  discoveryType: Schema.optional(Schema.String),
  dataProvider: Schema.optional(DataProvider),
  requestAccess: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  restrictedExportConfig: Schema.optional(RestrictedExportConfig),
  description: Schema.optional(Schema.String),
  primaryContact: Schema.optional(Schema.String),
  storedProcedureConfig: Schema.optional(StoredProcedureConfig),
  commercialInfo: Schema.optional(GoogleCloudBigqueryAnalyticshubV1ListingCommercialInfo),
  resourceType: Schema.optional(Schema.String),
  bigqueryDataset: Schema.optional(BigQueryDatasetSource),
  state: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  icon: Schema.optional(Schema.String),
  categories: Schema.optional(Schema.Array(Schema.String)),
  pubsubTopic: Schema.optional(PubSubTopicSource),
  logLinkedDatasetQueryUserEmail: Schema.optional(Schema.Boolean),
  allowOnlyMetadataSharing: Schema.optional(Schema.Boolean),
  documentation: Schema.optional(Schema.String),
  publisher: Schema.optional(Publisher),
})).annotate({ identifier: "Listing" }) as any as Schema.Schema<Listing>;

export interface PubsubWrapper {
}

export const PubsubWrapper: Schema.Schema<PubsubWrapper> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "PubsubWrapper" }) as any as Schema.Schema<PubsubWrapper>;

export interface UnstructuredInference {
  /** Optional. A parameters object to be included in each inference request. The parameters object is combined with the data field of the Pub/Sub message to form the inference request. */
  parameters?: Record<string, unknown>;
}

export const UnstructuredInference: Schema.Schema<UnstructuredInference> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "UnstructuredInference" }) as any as Schema.Schema<UnstructuredInference>;

export interface AIInference {
  /** Required. An endpoint to a Vertex AI model of the form `projects/{project}/locations/{location}/endpoints/{endpoint}` or `projects/{project}/locations/{location}/publishers/{publisher}/models/{model}`. Vertex AI API requests will be sent to this endpoint. */
  endpoint?: string;
  /** Optional. Requests and responses can be any arbitrary JSON object. */
  unstructuredInference?: UnstructuredInference;
  /** Optional. The service account to use to make prediction requests against endpoints. The resource creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent]({$universe.dns_names.final_documentation_domain}/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used. */
  serviceAccountEmail?: string;
}

export const AIInference: Schema.Schema<AIInference> = Schema.suspend(() => Schema.Struct({
  endpoint: Schema.optional(Schema.String),
  unstructuredInference: Schema.optional(UnstructuredInference),
  serviceAccountEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "AIInference" }) as any as Schema.Schema<AIInference>;

export interface DefaultExchangeConfig {
}

export const DefaultExchangeConfig: Schema.Schema<DefaultExchangeConfig> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "DefaultExchangeConfig" }) as any as Schema.Schema<DefaultExchangeConfig>;

export interface DcrExchangeConfig {
  /** Output only. If True, when subscribing to this DCR, it will create only one linked dataset containing all resources shared within the cleanroom. If False, when subscribing to this DCR, it will create 1 linked dataset per listing. This is not configurable, and by default, all new DCRs will have the restriction set to True. */
  singleLinkedDatasetPerCleanroom?: boolean;
  /** Output only. If True, this DCR restricts the contributors to sharing only a single resource in a Listing. And no two resources should have the same IDs. So if a contributor adds a view with a conflicting name, the CreateListing API will reject the request. if False, the data contributor can publish an entire dataset (as before). This is not configurable, and by default, all new DCRs will have the restriction set to True. */
  singleSelectedResourceSharingRestriction?: boolean;
}

export const DcrExchangeConfig: Schema.Schema<DcrExchangeConfig> = Schema.suspend(() => Schema.Struct({
  singleLinkedDatasetPerCleanroom: Schema.optional(Schema.Boolean),
  singleSelectedResourceSharingRestriction: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "DcrExchangeConfig" }) as any as Schema.Schema<DcrExchangeConfig>;

export interface SharingEnvironmentConfig {
  /** Default Analytics Hub data exchange, used for secured data sharing. */
  defaultExchangeConfig?: DefaultExchangeConfig;
  /** Data Clean Room (DCR), used for privacy-safe and secured data sharing. */
  dcrExchangeConfig?: DcrExchangeConfig;
}

export const SharingEnvironmentConfig: Schema.Schema<SharingEnvironmentConfig> = Schema.suspend(() => Schema.Struct({
  defaultExchangeConfig: Schema.optional(DefaultExchangeConfig),
  dcrExchangeConfig: Schema.optional(DcrExchangeConfig),
})).annotate({ identifier: "SharingEnvironmentConfig" }) as any as Schema.Schema<SharingEnvironmentConfig>;

export interface DataExchange {
  /** Optional. Description of the data exchange. The description must not contain Unicode non-characters as well as C0 and C1 control codes except tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF). Default value is an empty string. Max length: 2000 bytes. */
  description?: string;
  /** Optional. Base64 encoded image representing the data exchange. Max Size: 3.0MiB Expected image dimensions are 512x512 pixels, however the API only performs validation on size of the encoded data. Note: For byte fields, the content of the fields are base64-encoded (which increases the size of the data by 33-36%) when using JSON on the wire. */
  icon?: string;
  /** Required. Human-readable display name of the data exchange. The display name must contain only Unicode letters, numbers (0-9), underscores (_), dashes (-), spaces ( ), ampersands (&) and must not start or end with spaces. Default value is an empty string. Max length: 63 bytes. */
  displayName?: string;
  /** Output only. The resource name of the data exchange. e.g. `projects/myproject/locations/us/dataExchanges/123`. */
  name?: string;
  /** Optional. Configurable data sharing environment option for a data exchange. */
  sharingEnvironmentConfig?: SharingEnvironmentConfig;
  /** Optional. By default, false. If true, the DataExchange has an email sharing mandate enabled. */
  logLinkedDatasetQueryUserEmail?: boolean;
  /** Output only. Number of listings contained in the data exchange. */
  listingCount?: number;
  /** Optional. Email or URL of the primary point of contact of the data exchange. Max Length: 1000 bytes. */
  primaryContact?: string;
  /** Optional. Type of discovery on the discovery page for all the listings under this exchange. Updating this field also updates (overwrites) the discovery_type field for all the listings under this exchange. */
  discoveryType?: "DISCOVERY_TYPE_UNSPECIFIED" | "DISCOVERY_TYPE_PRIVATE" | "DISCOVERY_TYPE_PUBLIC" | (string & {});
  /** Optional. Documentation describing the data exchange. */
  documentation?: string;
}

export const DataExchange: Schema.Schema<DataExchange> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  icon: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  sharingEnvironmentConfig: Schema.optional(SharingEnvironmentConfig),
  logLinkedDatasetQueryUserEmail: Schema.optional(Schema.Boolean),
  listingCount: Schema.optional(Schema.Number),
  primaryContact: Schema.optional(Schema.String),
  discoveryType: Schema.optional(Schema.String),
  documentation: Schema.optional(Schema.String),
})).annotate({ identifier: "DataExchange" }) as any as Schema.Schema<DataExchange>;

export interface ListOrgDataExchangesResponse {
  /** The list of data exchanges. */
  dataExchanges?: Array<DataExchange>;
  /** A token to request the next page of results. */
  nextPageToken?: string;
}

export const ListOrgDataExchangesResponse: Schema.Schema<ListOrgDataExchangesResponse> = Schema.suspend(() => Schema.Struct({
  dataExchanges: Schema.optional(Schema.Array(DataExchange)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListOrgDataExchangesResponse" }) as any as Schema.Schema<ListOrgDataExchangesResponse>;

export interface BigQueryConfig {
  /** Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key to additional columns in the table. The subscription name, message_id, and publish_time fields are put in their own columns while all other message properties (other than data) are written to a JSON object in the attributes column. */
  writeMetadata?: boolean;
  /** Optional. When true, use the BigQuery table's schema as the columns to write to in BigQuery. `use_table_schema` and `use_topic_schema` cannot be enabled at the same time. */
  useTableSchema?: boolean;
  /** Optional. The service account to use to write to BigQuery. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used. */
  serviceAccountEmail?: string;
  /** Optional. The name of the table to which to write data, of the form {projectId}.{datasetId}.{tableId} */
  table?: string;
  /** Optional. When true and use_topic_schema is true, any fields that are a part of the topic schema that are not part of the BigQuery table schema are dropped when writing to BigQuery. Otherwise, the schemas must be kept in sync and any messages with extra fields are not written and remain in the subscription's backlog. */
  dropUnknownFields?: boolean;
  /** Optional. When true, use the topic's schema as the columns to write to in BigQuery, if it exists. `use_topic_schema` and `use_table_schema` cannot be enabled at the same time. */
  useTopicSchema?: boolean;
}

export const BigQueryConfig: Schema.Schema<BigQueryConfig> = Schema.suspend(() => Schema.Struct({
  writeMetadata: Schema.optional(Schema.Boolean),
  useTableSchema: Schema.optional(Schema.Boolean),
  serviceAccountEmail: Schema.optional(Schema.String),
  table: Schema.optional(Schema.String),
  dropUnknownFields: Schema.optional(Schema.Boolean),
  useTopicSchema: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "BigQueryConfig" }) as any as Schema.Schema<BigQueryConfig>;

export interface Routine {
  /** Required. The type of routine. */
  routineType?: "ROUTINE_TYPE_UNSPECIFIED" | "TABLE_VALUED_FUNCTION" | (string & {});
  /** Optional. The definition body of the routine. */
  definitionBody?: string;
}

export const Routine: Schema.Schema<Routine> = Schema.suspend(() => Schema.Struct({
  routineType: Schema.optional(Schema.String),
  definitionBody: Schema.optional(Schema.String),
})).annotate({ identifier: "Routine" }) as any as Schema.Schema<Routine>;

export interface QueryTemplate {
  /** Optional. Email or URL of the primary point of contact of the QueryTemplate. Max Length: 1000 bytes. */
  primaryContact?: string;
  /** Output only. The QueryTemplate lifecycle state. */
  state?: "STATE_UNSPECIFIED" | "DRAFTED" | "PENDING" | "DELETED" | "APPROVED" | (string & {});
  /** Optional. The routine associated with the QueryTemplate. */
  routine?: Routine;
  /** Output only. The resource name of the QueryTemplate. e.g. `projects/myproject/locations/us/dataExchanges/123/queryTemplates/456` */
  name?: string;
  /** Optional. Short description of the QueryTemplate. The description must not contain Unicode non-characters and C0 and C1 control codes except tabs (HT), new lines (LF), carriage returns (CR), and page breaks (FF). Default value is an empty string. Max length: 2000 bytes. */
  description?: string;
  /** Required. Human-readable display name of the QueryTemplate. The display name must contain only Unicode letters, numbers (0-9), underscores (_), dashes (-), spaces ( ), ampersands (&) and can't start or end with spaces. Default value is an empty string. Max length: 63 bytes. */
  displayName?: string;
  /** Output only. Timestamp when the QueryTemplate was created. */
  createTime?: string;
  /** Optional. Documentation describing the QueryTemplate. */
  documentation?: string;
  /** Output only. Timestamp when the QueryTemplate was last modified. */
  updateTime?: string;
  /** Optional. Will be deprecated. Email or URL of the primary point of contact of the QueryTemplate. Max Length: 1000 bytes. */
  proposer?: string;
}

export const QueryTemplate: Schema.Schema<QueryTemplate> = Schema.suspend(() => Schema.Struct({
  primaryContact: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  routine: Schema.optional(Routine),
  name: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  documentation: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  proposer: Schema.optional(Schema.String),
})).annotate({ identifier: "QueryTemplate" }) as any as Schema.Schema<QueryTemplate>;

export interface ListQueryTemplatesResponse {
  /** The list of QueryTemplates. */
  queryTemplates?: Array<QueryTemplate>;
  /** A token to request the next page of results. */
  nextPageToken?: string;
}

export const ListQueryTemplatesResponse: Schema.Schema<ListQueryTemplatesResponse> = Schema.suspend(() => Schema.Struct({
  queryTemplates: Schema.optional(Schema.Array(QueryTemplate)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListQueryTemplatesResponse" }) as any as Schema.Schema<ListQueryTemplatesResponse>;

export interface NoWrapper {
  /** Optional. When true, writes the Pub/Sub message metadata to `x-goog-pubsub-:` headers of the HTTP request. Writes the Pub/Sub message attributes to `:` headers of the HTTP request. */
  writeMetadata?: boolean;
}

export const NoWrapper: Schema.Schema<NoWrapper> = Schema.suspend(() => Schema.Struct({
  writeMetadata: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "NoWrapper" }) as any as Schema.Schema<NoWrapper>;

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

export interface GetPolicyOptions {
  /** Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  requestedPolicyVersion?: number;
}

export const GetPolicyOptions: Schema.Schema<GetPolicyOptions> = Schema.suspend(() => Schema.Struct({
  requestedPolicyVersion: Schema.optional(Schema.Number),
})).annotate({ identifier: "GetPolicyOptions" }) as any as Schema.Schema<GetPolicyOptions>;

export interface DeadLetterPolicy {
  /** Optional. The name of the topic to which dead letter messages should be published. Format is `projects/{project}/topics/{topic}`.The Pub/Sub service account associated with the enclosing subscription's parent project (i.e., service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com) must have permission to Publish() to this topic. The operation will fail if the topic does not exist. Users should ensure that there is a subscription attached to this topic since messages published to a topic with no subscriptions are lost. */
  deadLetterTopic?: string;
  /** Optional. The maximum number of delivery attempts for any message. The value must be between 5 and 100. The number of delivery attempts is defined as 1 + (the sum of number of NACKs and number of times the acknowledgement deadline has been exceeded for the message). A NACK is any call to ModifyAckDeadline with a 0 deadline. Note that client libraries may automatically extend ack_deadlines. This field will be honored on a best effort basis. If this parameter is 0, a default value of 5 is used. */
  maxDeliveryAttempts?: number;
}

export const DeadLetterPolicy: Schema.Schema<DeadLetterPolicy> = Schema.suspend(() => Schema.Struct({
  deadLetterTopic: Schema.optional(Schema.String),
  maxDeliveryAttempts: Schema.optional(Schema.Number),
})).annotate({ identifier: "DeadLetterPolicy" }) as any as Schema.Schema<DeadLetterPolicy>;

export interface ExpirationPolicy {
  /** Optional. Specifies the "time-to-live" duration for an associated resource. The resource expires if it is not active for a period of `ttl`. The definition of "activity" depends on the type of the associated resource. The minimum and maximum allowed values for `ttl` depend on the type of the associated resource, as well. If `ttl` is not set, the associated resource never expires. */
  ttl?: string;
}

export const ExpirationPolicy: Schema.Schema<ExpirationPolicy> = Schema.suspend(() => Schema.Struct({
  ttl: Schema.optional(Schema.String),
})).annotate({ identifier: "ExpirationPolicy" }) as any as Schema.Schema<ExpirationPolicy>;

export interface TestIamPermissionsRequest {
  /** The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see [IAM Overview](https://cloud.google.com/iam/docs/overview#permissions). */
  permissions?: Array<string>;
}

export const TestIamPermissionsRequest: Schema.Schema<TestIamPermissionsRequest> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsRequest" }) as any as Schema.Schema<TestIamPermissionsRequest>;

export interface OidcToken {
  /** Optional. Audience to be used when generating OIDC token. The audience claim identifies the recipients that the JWT is intended for. The audience value is a single case-sensitive string. Having multiple values (array) for the audience field is not supported. More info about the OIDC JWT token audience here: https://tools.ietf.org/html/rfc7519#section-4.1.3 Note: if not specified, the Push endpoint URL will be used. */
  audience?: string;
  /** Optional. [Service account email](https://cloud.google.com/iam/docs/service-accounts) used for generating the OIDC token. For more information on setting up authentication, see [Push subscriptions](https://cloud.google.com/pubsub/docs/push). */
  serviceAccountEmail?: string;
}

export const OidcToken: Schema.Schema<OidcToken> = Schema.suspend(() => Schema.Struct({
  audience: Schema.optional(Schema.String),
  serviceAccountEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "OidcToken" }) as any as Schema.Schema<OidcToken>;

export interface LinkedResource {
  /** Output only. Name of the Pub/Sub subscription, e.g. projects/subscriberproject/subscriptions/subscriptions/sub_id */
  linkedPubsubSubscription?: string;
  /** Output only. Name of the linked dataset, e.g. projects/subscriberproject/datasets/linked_dataset */
  linkedDataset?: string;
  /** Output only. Listing for which linked resource is created. */
  listing?: string;
}

export const LinkedResource: Schema.Schema<LinkedResource> = Schema.suspend(() => Schema.Struct({
  linkedPubsubSubscription: Schema.optional(Schema.String),
  linkedDataset: Schema.optional(Schema.String),
  listing: Schema.optional(Schema.String),
})).annotate({ identifier: "LinkedResource" }) as any as Schema.Schema<LinkedResource>;

export interface GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfoGoogleCloudMarketplaceInfo {
  /** Resource name of the Marketplace Order. */
  order?: string;
}

export const GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfoGoogleCloudMarketplaceInfo: Schema.Schema<GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfoGoogleCloudMarketplaceInfo> = Schema.suspend(() => Schema.Struct({
  order: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfoGoogleCloudMarketplaceInfo" }) as any as Schema.Schema<GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfoGoogleCloudMarketplaceInfo>;

export interface GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfo {
  /** Output only. This is set when the subscription is commercialised via Cloud Marketplace. */
  cloudMarketplace?: GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfoGoogleCloudMarketplaceInfo;
}

export const GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfo: Schema.Schema<GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfo> = Schema.suspend(() => Schema.Struct({
  cloudMarketplace: Schema.optional(GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfoGoogleCloudMarketplaceInfo),
})).annotate({ identifier: "GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfo" }) as any as Schema.Schema<GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfo>;

export interface DestinationDatasetReference {
  /** Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (_). The maximum length is 1,024 characters. */
  datasetId?: string;
  /** Required. The ID of the project containing this dataset. */
  projectId?: string;
}

export const DestinationDatasetReference: Schema.Schema<DestinationDatasetReference> = Schema.suspend(() => Schema.Struct({
  datasetId: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
})).annotate({ identifier: "DestinationDatasetReference" }) as any as Schema.Schema<DestinationDatasetReference>;

export interface DestinationDataset {
  /** Optional. A user-friendly description of the dataset. */
  description?: string;
  /** Required. A reference that identifies the destination dataset. */
  datasetReference?: DestinationDatasetReference;
  /** Optional. The labels associated with this dataset. You can use these to organize and group your datasets. You can set this property when inserting or updating a dataset. See https://cloud.google.com/resource-manager/docs/creating-managing-labels for more information. */
  labels?: Record<string, string>;
  /** Optional. A descriptive name for the dataset. */
  friendlyName?: string;
  /** Optional. The geographic locations where the dataset should be replicated. See [BigQuery locations](https://cloud.google.com/bigquery/docs/locations) for supported locations. */
  replicaLocations?: Array<string>;
  /** Required. The geographic location where the dataset should reside. See https://cloud.google.com/bigquery/docs/locations for supported locations. */
  location?: string;
}

export const DestinationDataset: Schema.Schema<DestinationDataset> = Schema.suspend(() => Schema.Struct({
  description: Schema.optional(Schema.String),
  datasetReference: Schema.optional(DestinationDatasetReference),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  friendlyName: Schema.optional(Schema.String),
  replicaLocations: Schema.optional(Schema.Array(Schema.String)),
  location: Schema.optional(Schema.String),
})).annotate({ identifier: "DestinationDataset" }) as any as Schema.Schema<DestinationDataset>;

export interface Subscription {
  /** Output only. Map of listing resource names to associated linked resource, e.g. projects/123/locations/us/dataExchanges/456/listings/789 -> projects/123/datasets/my_dataset For listing-level subscriptions, this is a map of size 1. Only contains values if state == STATE_ACTIVE. */
  linkedDatasetMap?: Record<string, LinkedResource>;
  /** Output only. Timestamp when the subscription was last modified. */
  lastModifyTime?: string;
  /** Output only. Linked resources created in the subscription. Only contains values if state = STATE_ACTIVE. */
  linkedResources?: Array<LinkedResource>;
  /** Output only. This is set if this is a commercial subscription i.e. if this subscription was created from subscribing to a commercial listing. */
  commercialInfo?: GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfo;
  /** Optional. BigQuery destination dataset to create for the subscriber. */
  destinationDataset?: DestinationDataset;
  /** Output only. Timestamp when the subscription was created. */
  creationTime?: string;
  /** Output only. Organization of the project this subscription belongs to. */
  organizationId?: string;
  /** Output only. Email of the subscriber. */
  subscriberContact?: string;
  /** Output only. Display name of the project of this subscription. */
  organizationDisplayName?: string;
  /** Output only. Listing shared asset type. */
  resourceType?: "SHARED_RESOURCE_TYPE_UNSPECIFIED" | "BIGQUERY_DATASET" | "PUBSUB_TOPIC" | (string & {});
  /** Output only. Current state of the subscription. */
  state?: "STATE_UNSPECIFIED" | "STATE_ACTIVE" | "STATE_STALE" | "STATE_INACTIVE" | (string & {});
  /** Output only. By default, false. If true, the Subscriber agreed to the email sharing mandate that is enabled for DataExchange/Listing. */
  logLinkedDatasetQueryUserEmail?: boolean;
  /** Output only. Resource name of the source Data Exchange. e.g. projects/123/locations/us/dataExchanges/456 */
  dataExchange?: string;
  /** Output only. The resource name of the subscription. e.g. `projects/myproject/locations/us/subscriptions/123`. */
  name?: string;
  /** Output only. Resource name of the source Listing. e.g. projects/123/locations/us/dataExchanges/456/listings/789 */
  listing?: string;
}

export const Subscription: Schema.Schema<Subscription> = Schema.suspend(() => Schema.Struct({
  linkedDatasetMap: Schema.optional(Schema.Record(Schema.String, LinkedResource)),
  lastModifyTime: Schema.optional(Schema.String),
  linkedResources: Schema.optional(Schema.Array(LinkedResource)),
  commercialInfo: Schema.optional(GoogleCloudBigqueryAnalyticshubV1SubscriptionCommercialInfo),
  destinationDataset: Schema.optional(DestinationDataset),
  creationTime: Schema.optional(Schema.String),
  organizationId: Schema.optional(Schema.String),
  subscriberContact: Schema.optional(Schema.String),
  organizationDisplayName: Schema.optional(Schema.String),
  resourceType: Schema.optional(Schema.String),
  state: Schema.optional(Schema.String),
  logLinkedDatasetQueryUserEmail: Schema.optional(Schema.Boolean),
  dataExchange: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  listing: Schema.optional(Schema.String),
})).annotate({ identifier: "Subscription" }) as any as Schema.Schema<Subscription>;

export interface RefreshSubscriptionResponse {
  /** The refreshed subscription resource. */
  subscription?: Subscription;
}

export const RefreshSubscriptionResponse: Schema.Schema<RefreshSubscriptionResponse> = Schema.suspend(() => Schema.Struct({
  subscription: Schema.optional(Subscription),
})).annotate({ identifier: "RefreshSubscriptionResponse" }) as any as Schema.Schema<RefreshSubscriptionResponse>;

export interface SubscribeListingResponse {
  /** Subscription object created from this subscribe action. */
  subscription?: Subscription;
}

export const SubscribeListingResponse: Schema.Schema<SubscribeListingResponse> = Schema.suspend(() => Schema.Struct({
  subscription: Schema.optional(Subscription),
})).annotate({ identifier: "SubscribeListingResponse" }) as any as Schema.Schema<SubscribeListingResponse>;

export interface SubscribeDataExchangeResponse {
  /** Subscription object created from this subscribe action. */
  subscription?: Subscription;
}

export const SubscribeDataExchangeResponse: Schema.Schema<SubscribeDataExchangeResponse> = Schema.suspend(() => Schema.Struct({
  subscription: Schema.optional(Subscription),
})).annotate({ identifier: "SubscribeDataExchangeResponse" }) as any as Schema.Schema<SubscribeDataExchangeResponse>;

export interface SubscribeDataExchangeRequest {
  /** Optional. BigQuery destination dataset to create for the subscriber. */
  destinationDataset?: DestinationDataset;
  /** Email of the subscriber. */
  subscriberContact?: string;
  /** Required. Name of the subscription to create. e.g. `subscription1` */
  subscription?: string;
  /** Required. The parent resource path of the Subscription. e.g. `projects/subscriberproject/locations/us` */
  destination?: string;
}

export const SubscribeDataExchangeRequest: Schema.Schema<SubscribeDataExchangeRequest> = Schema.suspend(() => Schema.Struct({
  destinationDataset: Schema.optional(DestinationDataset),
  subscriberContact: Schema.optional(Schema.String),
  subscription: Schema.optional(Schema.String),
  destination: Schema.optional(Schema.String),
})).annotate({ identifier: "SubscribeDataExchangeRequest" }) as any as Schema.Schema<SubscribeDataExchangeRequest>;

export interface RevokeSubscriptionRequest {
  /** Optional. If the subscription is commercial then this field must be set to true, otherwise a failure is thrown. This acts as a safety guard to avoid revoking commercial subscriptions accidentally. */
  revokeCommercial?: boolean;
}

export const RevokeSubscriptionRequest: Schema.Schema<RevokeSubscriptionRequest> = Schema.suspend(() => Schema.Struct({
  revokeCommercial: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "RevokeSubscriptionRequest" }) as any as Schema.Schema<RevokeSubscriptionRequest>;

export interface OperationMetadata {
  /** Output only. Name of the verb executed by the operation. */
  verb?: string;
  /** Output only. The time the operation was created. */
  createTime?: string;
  /** Output only. The time the operation finished running. */
  endTime?: string;
  /** Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. */
  requestedCancellation?: boolean;
  /** Output only. API version used to start the operation. */
  apiVersion?: string;
  /** Output only. Human-readable status of the operation, if any. */
  statusMessage?: string;
  /** Output only. Server-defined resource path for the target of the operation. */
  target?: string;
}

export const OperationMetadata: Schema.Schema<OperationMetadata> = Schema.suspend(() => Schema.Struct({
  verb: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  requestedCancellation: Schema.optional(Schema.Boolean),
  apiVersion: Schema.optional(Schema.String),
  statusMessage: Schema.optional(Schema.String),
  target: Schema.optional(Schema.String),
})).annotate({ identifier: "OperationMetadata" }) as any as Schema.Schema<OperationMetadata>;

export interface ListSubscriptionsResponse {
  /** The list of subscriptions. */
  subscriptions?: Array<Subscription>;
  /** Next page token. */
  nextPageToken?: string;
}

export const ListSubscriptionsResponse: Schema.Schema<ListSubscriptionsResponse> = Schema.suspend(() => Schema.Struct({
  subscriptions: Schema.optional(Schema.Array(Subscription)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSubscriptionsResponse" }) as any as Schema.Schema<ListSubscriptionsResponse>;

export interface MessageTransform {
  /** Optional. JavaScript User Defined Function. If multiple JavaScriptUDF's are specified on a resource, each must have a unique `function_name`. */
  javascriptUdf?: JavaScriptUDF;
  /** Optional. AI Inference. Specifies the Vertex AI endpoint that inference requests built from the Pub/Sub message data and provided parameters will be sent to. */
  aiInference?: AIInference;
  /** Optional. This field is deprecated, use the `disabled` field to disable transforms. */
  enabled?: boolean;
  /** Optional. If true, the transform is disabled and will not be applied to messages. Defaults to `false`. */
  disabled?: boolean;
}

export const MessageTransform: Schema.Schema<MessageTransform> = Schema.suspend(() => Schema.Struct({
  javascriptUdf: Schema.optional(JavaScriptUDF),
  aiInference: Schema.optional(AIInference),
  enabled: Schema.optional(Schema.Boolean),
  disabled: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "MessageTransform" }) as any as Schema.Schema<MessageTransform>;

export interface GetIamPolicyRequest {
  /** OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. */
  options?: GetPolicyOptions;
}

export const GetIamPolicyRequest: Schema.Schema<GetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  options: Schema.optional(GetPolicyOptions),
})).annotate({ identifier: "GetIamPolicyRequest" }) as any as Schema.Schema<GetIamPolicyRequest>;

export interface AvroConfig {
  /** Optional. When true, write the subscription name, message_id, publish_time, attributes, and ordering_key as additional fields in the output. The subscription name, message_id, and publish_time fields are put in their own fields while all other message properties other than data (for example, an ordering_key, if present) are added as entries in the attributes map. */
  writeMetadata?: boolean;
  /** Optional. When true, the output Cloud Storage file will be serialized using the topic schema, if it exists. */
  useTopicSchema?: boolean;
}

export const AvroConfig: Schema.Schema<AvroConfig> = Schema.suspend(() => Schema.Struct({
  writeMetadata: Schema.optional(Schema.Boolean),
  useTopicSchema: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "AvroConfig" }) as any as Schema.Schema<AvroConfig>;

export interface TextConfig {
}

export const TextConfig: Schema.Schema<TextConfig> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "TextConfig" }) as any as Schema.Schema<TextConfig>;

export interface CloudStorageConfig {
  /** Optional. User-provided suffix for Cloud Storage filename. See the [object naming requirements](https://cloud.google.com/storage/docs/objects#naming). Must not end in "/". */
  filenameSuffix?: string;
  /** Optional. If set, message data will be written to Cloud Storage in Avro format. */
  avroConfig?: AvroConfig;
  /** Required. User-provided name for the Cloud Storage bucket. The bucket must be created by the user. The bucket name must be without any prefix like "gs://". See the [bucket naming requirements] (https://cloud.google.com/storage/docs/buckets#naming). */
  bucket?: string;
  /** Optional. The maximum bytes that can be written to a Cloud Storage file before a new file is created. Min 1 KB, max 10 GiB. The max_bytes limit may be exceeded in cases where messages are larger than the limit. */
  maxBytes?: string;
  /** Optional. File batching settings. If no max_duration setting is specified, a max_duration of 5 minutes will be set by default. max_duration is required regardless of whether other file batching settings are specified. The maximum duration that can elapse before a new Cloud Storage file is created. Min 1 minute, max 10 minutes, default 5 minutes. May not exceed the subscription's acknowledgement deadline. */
  maxDuration?: string;
  /** Optional. The service account to use to write to Cloud Storage. The subscription creator or updater that specifies this field must have `iam.serviceAccounts.actAs` permission on the service account. If not specified, the Pub/Sub [service agent](https://cloud.google.com/iam/docs/service-agents), service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com, is used. */
  serviceAccountEmail?: string;
  /** Optional. If set, message data will be written to Cloud Storage in text format. */
  textConfig?: TextConfig;
  /** Optional. User-provided format string specifying how to represent datetimes in Cloud Storage filenames. See the [datetime format guidance](https://cloud.google.com/pubsub/docs/create-cloudstorage-subscription#file_names). */
  filenameDatetimeFormat?: string;
  /** Optional. User-provided prefix for Cloud Storage filename. See the [object naming requirements](https://cloud.google.com/storage/docs/objects#naming). */
  filenamePrefix?: string;
  /** Optional. The maximum number of messages that can be written to a Cloud Storage file before a new file is created. Min 1000 messages. */
  maxMessages?: string;
}

export const CloudStorageConfig: Schema.Schema<CloudStorageConfig> = Schema.suspend(() => Schema.Struct({
  filenameSuffix: Schema.optional(Schema.String),
  avroConfig: Schema.optional(AvroConfig),
  bucket: Schema.optional(Schema.String),
  maxBytes: Schema.optional(Schema.String),
  maxDuration: Schema.optional(Schema.String),
  serviceAccountEmail: Schema.optional(Schema.String),
  textConfig: Schema.optional(TextConfig),
  filenameDatetimeFormat: Schema.optional(Schema.String),
  filenamePrefix: Schema.optional(Schema.String),
  maxMessages: Schema.optional(Schema.String),
})).annotate({ identifier: "CloudStorageConfig" }) as any as Schema.Schema<CloudStorageConfig>;

export interface PushConfig {
  /** Optional. Endpoint configuration attributes that can be used to control different aspects of the message delivery. The only currently supported attribute is `x-goog-version`, which you can use to change the format of the pushed message. This attribute indicates the version of the data expected by the endpoint. This controls the shape of the pushed message (i.e., its fields and metadata). If not present during the `CreateSubscription` call, it will default to the version of the Pub/Sub API used to make such call. If not present in a `ModifyPushConfig` call, its value will not be changed. `GetSubscription` calls will always return a valid version, even if the subscription was created without this attribute. The only supported values for the `x-goog-version` attribute are: * `v1beta1`: uses the push format defined in the v1beta1 Pub/Sub API. * `v1` or `v1beta2`: uses the push format defined in the v1 Pub/Sub API. For example: `attributes { "x-goog-version": "v1" }` */
  attributes?: Record<string, string>;
  /** Optional. If specified, Pub/Sub will generate and attach an OIDC JWT token as an `Authorization` header in the HTTP request for every pushed message. */
  oidcToken?: OidcToken;
  /** Optional. When set, the payload to the push endpoint is not wrapped. */
  noWrapper?: NoWrapper;
  /** Optional. A URL locating the endpoint to which messages should be pushed. For example, a Webhook endpoint might use `https://example.com/push`. */
  pushEndpoint?: string;
  /** Optional. When set, the payload to the push endpoint is in the form of the JSON representation of a PubsubMessage (https://cloud.google.com/pubsub/docs/reference/rpc/google.pubsub.v1#pubsubmessage). */
  pubsubWrapper?: PubsubWrapper;
}

export const PushConfig: Schema.Schema<PushConfig> = Schema.suspend(() => Schema.Struct({
  attributes: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  oidcToken: Schema.optional(OidcToken),
  noWrapper: Schema.optional(NoWrapper),
  pushEndpoint: Schema.optional(Schema.String),
  pubsubWrapper: Schema.optional(PubsubWrapper),
})).annotate({ identifier: "PushConfig" }) as any as Schema.Schema<PushConfig>;

export interface RetryPolicy {
  /** Optional. The minimum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 10 seconds. */
  minimumBackoff?: string;
  /** Optional. The maximum delay between consecutive deliveries of a given message. Value should be between 0 and 600 seconds. Defaults to 600 seconds. */
  maximumBackoff?: string;
}

export const RetryPolicy: Schema.Schema<RetryPolicy> = Schema.suspend(() => Schema.Struct({
  minimumBackoff: Schema.optional(Schema.String),
  maximumBackoff: Schema.optional(Schema.String),
})).annotate({ identifier: "RetryPolicy" }) as any as Schema.Schema<RetryPolicy>;

export interface GooglePubsubV1Subscription {
  /** Optional. If true, Pub/Sub provides the following guarantees for the delivery of a message with a given value of `message_id` on this subscription: * The message sent to a subscriber is guaranteed not to be resent before the message's acknowledgement deadline expires. * An acknowledged message will not be resent to a subscriber. Note that subscribers may still receive multiple copies of a message when `enable_exactly_once_delivery` is true if the message was published multiple times by a publisher client. These copies are considered distinct by Pub/Sub and have distinct `message_id` values. */
  enableExactlyOnceDelivery?: boolean;
  /** Optional. A policy that specifies the conditions for dead lettering messages in this subscription. If dead_letter_policy is not set, dead lettering is disabled. The Pub/Sub service account associated with this subscriptions's parent project (i.e., service-{project_number}@gcp-sa-pubsub.iam.gserviceaccount.com) must have permission to Acknowledge() messages on this subscription. */
  deadLetterPolicy?: DeadLetterPolicy;
  /** Optional. A policy that specifies the conditions for this subscription's expiration. A subscription is considered active as long as any connected subscriber is successfully consuming messages from the subscription or is issuing operations on the subscription. If `expiration_policy` is not set, a *default policy* with `ttl` of 31 days will be used. The minimum allowed value for `expiration_policy.ttl` is 1 day. If `expiration_policy` is set, but `expiration_policy.ttl` is not set, the subscription never expires. */
  expirationPolicy?: ExpirationPolicy;
  /** Optional. Indicates whether to retain acknowledged messages. If true, then messages are not expunged from the subscription's backlog, even if they are acknowledged, until they fall out of the `message_retention_duration` window. This must be true if you would like to [`Seek` to a timestamp] (https://cloud.google.com/pubsub/docs/replay-overview#seek_to_a_time) in the past to replay previously-acknowledged messages. */
  retainAckedMessages?: boolean;
  /** Optional. How long to retain unacknowledged messages in the subscription's backlog, from the moment a message is published. If `retain_acked_messages` is true, then this also configures the retention of acknowledged messages, and thus configures how far back in time a `Seek` can be done. Defaults to 7 days. Cannot be more than 31 days or less than 10 minutes. */
  messageRetentionDuration?: string;
  /** Optional. Transforms to be applied to messages before they are delivered to subscribers. Transforms are applied in the order specified. */
  messageTransforms?: Array<MessageTransform>;
  /** Optional. Indicates whether the subscription is detached from its topic. Detached subscriptions don't receive messages from their topic and don't retain any backlog. `Pull` and `StreamingPull` requests will return FAILED_PRECONDITION. If the subscription is a push subscription, pushes to the endpoint will not be made. */
  detached?: boolean;
  /** Optional. If true, messages published with the same `ordering_key` in `PubsubMessage` will be delivered to the subscribers in the order in which they are received by the Pub/Sub system. Otherwise, they may be delivered in any order. */
  enableMessageOrdering?: boolean;
  /** Optional. The approximate amount of time (on a best-effort basis) Pub/Sub waits for the subscriber to acknowledge receipt before resending the message. In the interval after the message is delivered and before it is acknowledged, it is considered to be _outstanding_. During that time period, the message will not be redelivered (on a best-effort basis). For pull subscriptions, this value is used as the initial value for the ack deadline. To override this value for a given message, call `ModifyAckDeadline` with the corresponding `ack_id` if using non-streaming pull or send the `ack_id` in a `StreamingModifyAckDeadlineRequest` if using streaming pull. The minimum custom deadline you can specify is 10 seconds. The maximum custom deadline you can specify is 600 seconds (10 minutes). If this parameter is 0, a default value of 10 seconds is used. For push delivery, this value is also used to set the request timeout for the call to the push endpoint. If the subscriber never acknowledges the message, the Pub/Sub system will eventually redeliver the message. */
  ackDeadlineSeconds?: number;
  /** Optional. If delivery to Google Cloud Storage is used with this subscription, this field is used to configure it. */
  cloudStorageConfig?: CloudStorageConfig;
  /** Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" */
  tags?: Record<string, string>;
  /** Required. Identifier. Name of the subscription. Format is `projects/{project}/subscriptions/{sub}`. */
  name?: string;
  /** Optional. An expression written in the Pub/Sub [filter language](https://cloud.google.com/pubsub/docs/filtering). If non-empty, then only `PubsubMessage`s whose `attributes` field matches the filter are delivered on this subscription. If empty, then no messages are filtered out. */
  filter?: string;
  /** Optional. If push delivery is used with this subscription, this field is used to configure it. */
  pushConfig?: PushConfig;
  /** Optional. If delivery to BigQuery is used with this subscription, this field is used to configure it. */
  bigqueryConfig?: BigQueryConfig;
  /** Optional. See [Creating and managing labels](https://cloud.google.com/pubsub/docs/labels). */
  labels?: Record<string, string>;
  /** Optional. A policy that specifies how Pub/Sub retries message delivery for this subscription. If not set, the default retry policy is applied. This generally implies that messages will be retried as soon as possible for healthy subscribers. RetryPolicy will be triggered on NACKs or acknowledgement deadline exceeded events for a given message. */
  retryPolicy?: RetryPolicy;
}

export const GooglePubsubV1Subscription: Schema.Schema<GooglePubsubV1Subscription> = Schema.suspend(() => Schema.Struct({
  enableExactlyOnceDelivery: Schema.optional(Schema.Boolean),
  deadLetterPolicy: Schema.optional(DeadLetterPolicy),
  expirationPolicy: Schema.optional(ExpirationPolicy),
  retainAckedMessages: Schema.optional(Schema.Boolean),
  messageRetentionDuration: Schema.optional(Schema.String),
  messageTransforms: Schema.optional(Schema.Array(MessageTransform)),
  detached: Schema.optional(Schema.Boolean),
  enableMessageOrdering: Schema.optional(Schema.Boolean),
  ackDeadlineSeconds: Schema.optional(Schema.Number),
  cloudStorageConfig: Schema.optional(CloudStorageConfig),
  tags: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  name: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
  pushConfig: Schema.optional(PushConfig),
  bigqueryConfig: Schema.optional(BigQueryConfig),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  retryPolicy: Schema.optional(RetryPolicy),
})).annotate({ identifier: "GooglePubsubV1Subscription" }) as any as Schema.Schema<GooglePubsubV1Subscription>;

export interface Expr {
  /** Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. */
  title?: string;
  /** Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. */
  location?: string;
  /** Textual representation of an expression in Common Expression Language syntax. */
  expression?: string;
  /** Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. */
  description?: string;
}

export const Expr: Schema.Schema<Expr> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  location: Schema.optional(Schema.String),
  expression: Schema.optional(Schema.String),
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

export interface ListSharedResourceSubscriptionsResponse {
  /** The list of subscriptions. */
  sharedResourceSubscriptions?: Array<Subscription>;
  /** Next page token. */
  nextPageToken?: string;
}

export const ListSharedResourceSubscriptionsResponse: Schema.Schema<ListSharedResourceSubscriptionsResponse> = Schema.suspend(() => Schema.Struct({
  sharedResourceSubscriptions: Schema.optional(Schema.Array(Subscription)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListSharedResourceSubscriptionsResponse" }) as any as Schema.Schema<ListSharedResourceSubscriptionsResponse>;

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

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() => Schema.Struct({
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
  message: Schema.optional(Schema.String),
  code: Schema.optional(Schema.Number),
})).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

export interface Operation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  error: Schema.optional(Status),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface TestIamPermissionsResponse {
  /** A subset of `TestPermissionsRequest.permissions` that the caller is allowed. */
  permissions?: Array<string>;
}

export const TestIamPermissionsResponse: Schema.Schema<TestIamPermissionsResponse> = Schema.suspend(() => Schema.Struct({
  permissions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "TestIamPermissionsResponse" }) as any as Schema.Schema<TestIamPermissionsResponse>;

export interface ListDataExchangesResponse {
  /** A token to request the next page of results. */
  nextPageToken?: string;
  /** The list of data exchanges. */
  dataExchanges?: Array<DataExchange>;
}

export const ListDataExchangesResponse: Schema.Schema<ListDataExchangesResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  dataExchanges: Schema.optional(Schema.Array(DataExchange)),
})).annotate({ identifier: "ListDataExchangesResponse" }) as any as Schema.Schema<ListDataExchangesResponse>;

export interface ApproveQueryTemplateRequest {
}

export const ApproveQueryTemplateRequest: Schema.Schema<ApproveQueryTemplateRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "ApproveQueryTemplateRequest" }) as any as Schema.Schema<ApproveQueryTemplateRequest>;

export interface DestinationPubSubSubscription {
  /** Required. Destination Pub/Sub subscription resource. */
  pubsubSubscription?: GooglePubsubV1Subscription;
}

export const DestinationPubSubSubscription: Schema.Schema<DestinationPubSubSubscription> = Schema.suspend(() => Schema.Struct({
  pubsubSubscription: Schema.optional(GooglePubsubV1Subscription),
})).annotate({ identifier: "DestinationPubSubSubscription" }) as any as Schema.Schema<DestinationPubSubSubscription>;

export interface Policy {
  /** Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. */
  bindings?: Array<Binding>;
  /** `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. */
  etag?: string;
  /** Specifies cloud audit logging configuration for this policy. */
  auditConfigs?: Array<AuditConfig>;
  /** Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: * Getting a policy that includes a conditional role binding * Adding a conditional role binding to a policy * Changing a conditional role binding in a policy * Removing any role binding, with or without a condition, from a policy that includes conditions **Important:** If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the [IAM documentation](https://cloud.google.com/iam/help/conditions/resource-policies). */
  version?: number;
}

export const Policy: Schema.Schema<Policy> = Schema.suspend(() => Schema.Struct({
  bindings: Schema.optional(Schema.Array(Binding)),
  etag: Schema.optional(Schema.String),
  auditConfigs: Schema.optional(Schema.Array(AuditConfig)),
  version: Schema.optional(Schema.Number),
})).annotate({ identifier: "Policy" }) as any as Schema.Schema<Policy>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface SubscribeListingRequest {
  /** Input only. Destination Pub/Sub subscription to create for the subscriber. */
  destinationPubsubSubscription?: DestinationPubSubSubscription;
  /** Input only. BigQuery destination dataset to create for the subscriber. */
  destinationDataset?: DestinationDataset;
}

export const SubscribeListingRequest: Schema.Schema<SubscribeListingRequest> = Schema.suspend(() => Schema.Struct({
  destinationPubsubSubscription: Schema.optional(DestinationPubSubSubscription),
  destinationDataset: Schema.optional(DestinationDataset),
})).annotate({ identifier: "SubscribeListingRequest" }) as any as Schema.Schema<SubscribeListingRequest>;

export interface ListListingsResponse {
  /** The list of Listing. */
  listings?: Array<Listing>;
  /** A token to request the next page of results. */
  nextPageToken?: string;
}

export const ListListingsResponse: Schema.Schema<ListListingsResponse> = Schema.suspend(() => Schema.Struct({
  listings: Schema.optional(Schema.Array(Listing)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListListingsResponse" }) as any as Schema.Schema<ListListingsResponse>;

export interface RevokeSubscriptionResponse {
}

export const RevokeSubscriptionResponse: Schema.Schema<RevokeSubscriptionResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RevokeSubscriptionResponse" }) as any as Schema.Schema<RevokeSubscriptionResponse>;

export interface SetIamPolicyRequest {
  /** OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` */
  updateMask?: string;
  /** REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. */
  policy?: Policy;
}

export const SetIamPolicyRequest: Schema.Schema<SetIamPolicyRequest> = Schema.suspend(() => Schema.Struct({
  updateMask: Schema.optional(Schema.String),
  policy: Schema.optional(Policy),
})).annotate({ identifier: "SetIamPolicyRequest" }) as any as Schema.Schema<SetIamPolicyRequest>;

export interface RefreshSubscriptionRequest {
}

export const RefreshSubscriptionRequest: Schema.Schema<RefreshSubscriptionRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "RefreshSubscriptionRequest" }) as any as Schema.Schema<RefreshSubscriptionRequest>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists all subscriptions in a given project and location. */
export interface ListProjectsLocationsSubscriptionsRequest {
  /** Required. The parent resource path of the subscription. e.g. projects/myproject/locations/us */
  parent: string;
  /** The maximum number of results to return in a single response page. */
  pageSize?: number;
  /** Page token, returned by a previous call. */
  pageToken?: string;
  /** An expression for filtering the results of the request. Eligible fields for filtering are: + `listing` + `data_exchange` Alternatively, a literal wrapped in double quotes may be provided. This will be checked for an exact match against both fields above. In all cases, the full Data Exchange or Listing resource name must be provided. Some example of using filters: + data_exchange="projects/myproject/locations/us/dataExchanges/123" + listing="projects/123/locations/us/dataExchanges/456/listings/789" + "projects/myproject/locations/us/dataExchanges/123" */
  filter?: string;
}

export const ListProjectsLocationsSubscriptionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/subscriptions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsSubscriptionsRequest>;

export type ListProjectsLocationsSubscriptionsResponse = ListSubscriptionsResponse;
export const ListProjectsLocationsSubscriptionsResponse = ListSubscriptionsResponse;

export type ListProjectsLocationsSubscriptionsError = CommonErrors;

export const listProjectsLocationsSubscriptions = API.makePaginated(() => ({
  input: ListProjectsLocationsSubscriptionsRequest,
  output: ListProjectsLocationsSubscriptionsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Revokes a given subscription. */
export interface RevokeProjectsLocationsSubscriptionsRequest {
  /** Required. Resource name of the subscription to revoke. e.g. projects/123/locations/us/subscriptions/456 */
  name: string;
  /** Request body */
  body?: RevokeSubscriptionRequest;
}

export const RevokeProjectsLocationsSubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RevokeSubscriptionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/subscriptions/{subscriptionsId}:revoke", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RevokeProjectsLocationsSubscriptionsRequest>;

export type RevokeProjectsLocationsSubscriptionsResponse = RevokeSubscriptionResponse;
export const RevokeProjectsLocationsSubscriptionsResponse = RevokeSubscriptionResponse;

export type RevokeProjectsLocationsSubscriptionsError = CommonErrors;

export const revokeProjectsLocationsSubscriptions: API.OperationMethod<RevokeProjectsLocationsSubscriptionsRequest, RevokeProjectsLocationsSubscriptionsResponse, RevokeProjectsLocationsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RevokeProjectsLocationsSubscriptionsRequest,
  output: RevokeProjectsLocationsSubscriptionsResponse,
  errors: [],
}));

/** Gets the IAM policy. */
export interface GetIamPolicyProjectsLocationsSubscriptionsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsSubscriptionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/subscriptions/{subscriptionsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsSubscriptionsRequest>;

export type GetIamPolicyProjectsLocationsSubscriptionsResponse = Policy;
export const GetIamPolicyProjectsLocationsSubscriptionsResponse = Policy;

export type GetIamPolicyProjectsLocationsSubscriptionsError = CommonErrors;

export const getIamPolicyProjectsLocationsSubscriptions: API.OperationMethod<GetIamPolicyProjectsLocationsSubscriptionsRequest, GetIamPolicyProjectsLocationsSubscriptionsResponse, GetIamPolicyProjectsLocationsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsSubscriptionsRequest,
  output: GetIamPolicyProjectsLocationsSubscriptionsResponse,
  errors: [],
}));

/** Sets the IAM policy. */
export interface SetIamPolicyProjectsLocationsSubscriptionsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsSubscriptionsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/subscriptions/{subscriptionsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsSubscriptionsRequest>;

export type SetIamPolicyProjectsLocationsSubscriptionsResponse = Policy;
export const SetIamPolicyProjectsLocationsSubscriptionsResponse = Policy;

export type SetIamPolicyProjectsLocationsSubscriptionsError = CommonErrors;

export const setIamPolicyProjectsLocationsSubscriptions: API.OperationMethod<SetIamPolicyProjectsLocationsSubscriptionsRequest, SetIamPolicyProjectsLocationsSubscriptionsResponse, SetIamPolicyProjectsLocationsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsSubscriptionsRequest,
  output: SetIamPolicyProjectsLocationsSubscriptionsResponse,
  errors: [],
}));

/** Gets the details of a Subscription. */
export interface GetProjectsLocationsSubscriptionsRequest {
  /** Required. Resource name of the subscription. e.g. projects/123/locations/us/subscriptions/456 */
  name: string;
}

export const GetProjectsLocationsSubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/subscriptions/{subscriptionsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsSubscriptionsRequest>;

export type GetProjectsLocationsSubscriptionsResponse = Subscription;
export const GetProjectsLocationsSubscriptionsResponse = Subscription;

export type GetProjectsLocationsSubscriptionsError = CommonErrors;

export const getProjectsLocationsSubscriptions: API.OperationMethod<GetProjectsLocationsSubscriptionsRequest, GetProjectsLocationsSubscriptionsResponse, GetProjectsLocationsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsSubscriptionsRequest,
  output: GetProjectsLocationsSubscriptionsResponse,
  errors: [],
}));

/** Refreshes a Subscription to a Data Exchange. A Data Exchange can become stale when a publisher adds or removes data. This is a long-running operation as it may create many linked datasets. */
export interface RefreshProjectsLocationsSubscriptionsRequest {
  /** Required. Resource name of the Subscription to refresh. e.g. `projects/subscriberproject/locations/us/subscriptions/123` */
  name: string;
  /** Request body */
  body?: RefreshSubscriptionRequest;
}

export const RefreshProjectsLocationsSubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(RefreshSubscriptionRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/subscriptions/{subscriptionsId}:refresh", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RefreshProjectsLocationsSubscriptionsRequest>;

export type RefreshProjectsLocationsSubscriptionsResponse = Operation;
export const RefreshProjectsLocationsSubscriptionsResponse = Operation;

export type RefreshProjectsLocationsSubscriptionsError = CommonErrors;

export const refreshProjectsLocationsSubscriptions: API.OperationMethod<RefreshProjectsLocationsSubscriptionsRequest, RefreshProjectsLocationsSubscriptionsResponse, RefreshProjectsLocationsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RefreshProjectsLocationsSubscriptionsRequest,
  output: RefreshProjectsLocationsSubscriptionsResponse,
  errors: [],
}));

/** Deletes a subscription. */
export interface DeleteProjectsLocationsSubscriptionsRequest {
  /** Required. Resource name of the subscription to delete. e.g. projects/123/locations/us/subscriptions/456 */
  name: string;
}

export const DeleteProjectsLocationsSubscriptionsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/subscriptions/{subscriptionsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsSubscriptionsRequest>;

export type DeleteProjectsLocationsSubscriptionsResponse = Operation;
export const DeleteProjectsLocationsSubscriptionsResponse = Operation;

export type DeleteProjectsLocationsSubscriptionsError = CommonErrors;

export const deleteProjectsLocationsSubscriptions: API.OperationMethod<DeleteProjectsLocationsSubscriptionsRequest, DeleteProjectsLocationsSubscriptionsResponse, DeleteProjectsLocationsSubscriptionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsSubscriptionsRequest,
  output: DeleteProjectsLocationsSubscriptionsResponse,
  errors: [],
}));

/** Gets the details of a data exchange. */
export interface GetProjectsLocationsDataExchangesRequest {
  /** Required. The resource name of the data exchange. e.g. `projects/myproject/locations/us/dataExchanges/123`. */
  name: string;
}

export const GetProjectsLocationsDataExchangesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDataExchangesRequest>;

export type GetProjectsLocationsDataExchangesResponse = DataExchange;
export const GetProjectsLocationsDataExchangesResponse = DataExchange;

export type GetProjectsLocationsDataExchangesError = CommonErrors;

export const getProjectsLocationsDataExchanges: API.OperationMethod<GetProjectsLocationsDataExchangesRequest, GetProjectsLocationsDataExchangesResponse, GetProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDataExchangesRequest,
  output: GetProjectsLocationsDataExchangesResponse,
  errors: [],
}));

/** Lists all subscriptions on a given Data Exchange or Listing. */
export interface ListSubscriptionsProjectsLocationsDataExchangesRequest {
  /** Required. Resource name of the requested target. This resource may be either a Listing or a DataExchange. e.g. projects/123/locations/us/dataExchanges/456 OR e.g. projects/123/locations/us/dataExchanges/456/listings/789 */
  resource: string;
  /** Page token, returned by a previous call. */
  pageToken?: string;
  /** The maximum number of results to return in a single response page. */
  pageSize?: number;
  /** If selected, includes deleted subscriptions in the response (up to 63 days after deletion). */
  includeDeletedSubscriptions?: boolean;
}

export const ListSubscriptionsProjectsLocationsDataExchangesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  includeDeletedSubscriptions: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeDeletedSubscriptions")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}:listSubscriptions" }),
  svc,
) as unknown as Schema.Schema<ListSubscriptionsProjectsLocationsDataExchangesRequest>;

export type ListSubscriptionsProjectsLocationsDataExchangesResponse = ListSharedResourceSubscriptionsResponse;
export const ListSubscriptionsProjectsLocationsDataExchangesResponse = ListSharedResourceSubscriptionsResponse;

export type ListSubscriptionsProjectsLocationsDataExchangesError = CommonErrors;

export const listSubscriptionsProjectsLocationsDataExchanges = API.makePaginated(() => ({
  input: ListSubscriptionsProjectsLocationsDataExchangesRequest,
  output: ListSubscriptionsProjectsLocationsDataExchangesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Sets the IAM policy. */
export interface SetIamPolicyProjectsLocationsDataExchangesRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDataExchangesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDataExchangesRequest>;

export type SetIamPolicyProjectsLocationsDataExchangesResponse = Policy;
export const SetIamPolicyProjectsLocationsDataExchangesResponse = Policy;

export type SetIamPolicyProjectsLocationsDataExchangesError = CommonErrors;

export const setIamPolicyProjectsLocationsDataExchanges: API.OperationMethod<SetIamPolicyProjectsLocationsDataExchangesRequest, SetIamPolicyProjectsLocationsDataExchangesResponse, SetIamPolicyProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDataExchangesRequest,
  output: SetIamPolicyProjectsLocationsDataExchangesResponse,
  errors: [],
}));

/** Lists all data exchanges in a given project and location. */
export interface ListProjectsLocationsDataExchangesRequest {
  /** The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. */
  pageSize?: number;
  /** Page token, returned by a previous call, to request the next page of results. */
  pageToken?: string;
  /** Required. The parent resource path of the data exchanges. e.g. `projects/myproject/locations/us`. */
  parent: string;
}

export const ListProjectsLocationsDataExchangesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDataExchangesRequest>;

export type ListProjectsLocationsDataExchangesResponse = ListDataExchangesResponse;
export const ListProjectsLocationsDataExchangesResponse = ListDataExchangesResponse;

export type ListProjectsLocationsDataExchangesError = CommonErrors;

export const listProjectsLocationsDataExchanges = API.makePaginated(() => ({
  input: ListProjectsLocationsDataExchangesRequest,
  output: ListProjectsLocationsDataExchangesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the permissions that a caller has. */
export interface TestIamPermissionsProjectsLocationsDataExchangesRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDataExchangesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDataExchangesRequest>;

export type TestIamPermissionsProjectsLocationsDataExchangesResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDataExchangesResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDataExchangesError = CommonErrors;

export const testIamPermissionsProjectsLocationsDataExchanges: API.OperationMethod<TestIamPermissionsProjectsLocationsDataExchangesRequest, TestIamPermissionsProjectsLocationsDataExchangesResponse, TestIamPermissionsProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDataExchangesRequest,
  output: TestIamPermissionsProjectsLocationsDataExchangesResponse,
  errors: [],
}));

/** Creates a Subscription to a Data Clean Room. This is a long-running operation as it will create one or more linked datasets. Throws a Bad Request error if the Data Exchange does not contain any listings. */
export interface SubscribeProjectsLocationsDataExchangesRequest {
  /** Required. Resource name of the Data Exchange. e.g. `projects/publisherproject/locations/us/dataExchanges/123` */
  name: string;
  /** Request body */
  body?: SubscribeDataExchangeRequest;
}

export const SubscribeProjectsLocationsDataExchangesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SubscribeDataExchangeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}:subscribe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SubscribeProjectsLocationsDataExchangesRequest>;

export type SubscribeProjectsLocationsDataExchangesResponse = Operation;
export const SubscribeProjectsLocationsDataExchangesResponse = Operation;

export type SubscribeProjectsLocationsDataExchangesError = CommonErrors;

export const subscribeProjectsLocationsDataExchanges: API.OperationMethod<SubscribeProjectsLocationsDataExchangesRequest, SubscribeProjectsLocationsDataExchangesResponse, SubscribeProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SubscribeProjectsLocationsDataExchangesRequest,
  output: SubscribeProjectsLocationsDataExchangesResponse,
  errors: [],
}));

/** Gets the IAM policy. */
export interface GetIamPolicyProjectsLocationsDataExchangesRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsDataExchangesRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDataExchangesRequest>;

export type GetIamPolicyProjectsLocationsDataExchangesResponse = Policy;
export const GetIamPolicyProjectsLocationsDataExchangesResponse = Policy;

export type GetIamPolicyProjectsLocationsDataExchangesError = CommonErrors;

export const getIamPolicyProjectsLocationsDataExchanges: API.OperationMethod<GetIamPolicyProjectsLocationsDataExchangesRequest, GetIamPolicyProjectsLocationsDataExchangesResponse, GetIamPolicyProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDataExchangesRequest,
  output: GetIamPolicyProjectsLocationsDataExchangesResponse,
  errors: [],
}));

/** Updates an existing data exchange. */
export interface PatchProjectsLocationsDataExchangesRequest {
  /** Required. Field mask specifies the fields to update in the data exchange resource. The fields specified in the `updateMask` are relative to the resource and are not a full request. */
  updateMask?: string;
  /** Output only. The resource name of the data exchange. e.g. `projects/myproject/locations/us/dataExchanges/123`. */
  name: string;
  /** Request body */
  body?: DataExchange;
}

export const PatchProjectsLocationsDataExchangesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(DataExchange).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDataExchangesRequest>;

export type PatchProjectsLocationsDataExchangesResponse = DataExchange;
export const PatchProjectsLocationsDataExchangesResponse = DataExchange;

export type PatchProjectsLocationsDataExchangesError = CommonErrors;

export const patchProjectsLocationsDataExchanges: API.OperationMethod<PatchProjectsLocationsDataExchangesRequest, PatchProjectsLocationsDataExchangesResponse, PatchProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDataExchangesRequest,
  output: PatchProjectsLocationsDataExchangesResponse,
  errors: [],
}));

/** Deletes an existing data exchange. */
export interface DeleteProjectsLocationsDataExchangesRequest {
  /** Required. The full name of the data exchange resource that you want to delete. For example, `projects/myproject/locations/us/dataExchanges/123`. */
  name: string;
}

export const DeleteProjectsLocationsDataExchangesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDataExchangesRequest>;

export type DeleteProjectsLocationsDataExchangesResponse = Empty;
export const DeleteProjectsLocationsDataExchangesResponse = Empty;

export type DeleteProjectsLocationsDataExchangesError = CommonErrors;

export const deleteProjectsLocationsDataExchanges: API.OperationMethod<DeleteProjectsLocationsDataExchangesRequest, DeleteProjectsLocationsDataExchangesResponse, DeleteProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDataExchangesRequest,
  output: DeleteProjectsLocationsDataExchangesResponse,
  errors: [],
}));

/** Creates a new data exchange. */
export interface CreateProjectsLocationsDataExchangesRequest {
  /** Required. The ID of the data exchange. Must contain only Unicode letters, numbers (0-9), underscores (_). Max length: 100 bytes. */
  dataExchangeId?: string;
  /** Required. The parent resource path of the data exchange. e.g. `projects/myproject/locations/us`. */
  parent: string;
  /** Request body */
  body?: DataExchange;
}

export const CreateProjectsLocationsDataExchangesRequest = Schema.Struct({
  dataExchangeId: Schema.optional(Schema.String).pipe(T.HttpQuery("dataExchangeId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(DataExchange).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDataExchangesRequest>;

export type CreateProjectsLocationsDataExchangesResponse = DataExchange;
export const CreateProjectsLocationsDataExchangesResponse = DataExchange;

export type CreateProjectsLocationsDataExchangesError = CommonErrors;

export const createProjectsLocationsDataExchanges: API.OperationMethod<CreateProjectsLocationsDataExchangesRequest, CreateProjectsLocationsDataExchangesResponse, CreateProjectsLocationsDataExchangesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDataExchangesRequest,
  output: CreateProjectsLocationsDataExchangesResponse,
  errors: [],
}));

/** Returns the permissions that a caller has. */
export interface TestIamPermissionsProjectsLocationsDataExchangesListingsRequest {
  /** REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: TestIamPermissionsRequest;
}

export const TestIamPermissionsProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(TestIamPermissionsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings/{listingsId}:testIamPermissions", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TestIamPermissionsProjectsLocationsDataExchangesListingsRequest>;

export type TestIamPermissionsProjectsLocationsDataExchangesListingsResponse = TestIamPermissionsResponse;
export const TestIamPermissionsProjectsLocationsDataExchangesListingsResponse = TestIamPermissionsResponse;

export type TestIamPermissionsProjectsLocationsDataExchangesListingsError = CommonErrors;

export const testIamPermissionsProjectsLocationsDataExchangesListings: API.OperationMethod<TestIamPermissionsProjectsLocationsDataExchangesListingsRequest, TestIamPermissionsProjectsLocationsDataExchangesListingsResponse, TestIamPermissionsProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TestIamPermissionsProjectsLocationsDataExchangesListingsRequest,
  output: TestIamPermissionsProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

/** Updates an existing listing. */
export interface PatchProjectsLocationsDataExchangesListingsRequest {
  /** Required. Field mask specifies the fields to update in the listing resource. The fields specified in the `updateMask` are relative to the resource and are not a full request. */
  updateMask?: string;
  /** Output only. The resource name of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456` */
  name: string;
  /** Request body */
  body?: Listing;
}

export const PatchProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Listing).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings/{listingsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDataExchangesListingsRequest>;

export type PatchProjectsLocationsDataExchangesListingsResponse = Listing;
export const PatchProjectsLocationsDataExchangesListingsResponse = Listing;

export type PatchProjectsLocationsDataExchangesListingsError = CommonErrors;

export const patchProjectsLocationsDataExchangesListings: API.OperationMethod<PatchProjectsLocationsDataExchangesListingsRequest, PatchProjectsLocationsDataExchangesListingsResponse, PatchProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDataExchangesListingsRequest,
  output: PatchProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

/** Lists all subscriptions on a given Data Exchange or Listing. */
export interface ListSubscriptionsProjectsLocationsDataExchangesListingsRequest {
  /** Page token, returned by a previous call. */
  pageToken?: string;
  /** The maximum number of results to return in a single response page. */
  pageSize?: number;
  /** If selected, includes deleted subscriptions in the response (up to 63 days after deletion). */
  includeDeletedSubscriptions?: boolean;
  /** Required. Resource name of the requested target. This resource may be either a Listing or a DataExchange. e.g. projects/123/locations/us/dataExchanges/456 OR e.g. projects/123/locations/us/dataExchanges/456/listings/789 */
  resource: string;
}

export const ListSubscriptionsProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  includeDeletedSubscriptions: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("includeDeletedSubscriptions")),
  resource: Schema.String.pipe(T.HttpPath("resource")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings/{listingsId}:listSubscriptions" }),
  svc,
) as unknown as Schema.Schema<ListSubscriptionsProjectsLocationsDataExchangesListingsRequest>;

export type ListSubscriptionsProjectsLocationsDataExchangesListingsResponse = ListSharedResourceSubscriptionsResponse;
export const ListSubscriptionsProjectsLocationsDataExchangesListingsResponse = ListSharedResourceSubscriptionsResponse;

export type ListSubscriptionsProjectsLocationsDataExchangesListingsError = CommonErrors;

export const listSubscriptionsProjectsLocationsDataExchangesListings = API.makePaginated(() => ({
  input: ListSubscriptionsProjectsLocationsDataExchangesListingsRequest,
  output: ListSubscriptionsProjectsLocationsDataExchangesListingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes a listing. */
export interface DeleteProjectsLocationsDataExchangesListingsRequest {
  /** Optional. If the listing is commercial then this field must be set to true, otherwise a failure is thrown. This acts as a safety guard to avoid deleting commercial listings accidentally. */
  deleteCommercial?: boolean;
  /** Required. Resource name of the listing to delete. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456`. */
  name: string;
}

export const DeleteProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  deleteCommercial: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("deleteCommercial")),
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings/{listingsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDataExchangesListingsRequest>;

export type DeleteProjectsLocationsDataExchangesListingsResponse = Empty;
export const DeleteProjectsLocationsDataExchangesListingsResponse = Empty;

export type DeleteProjectsLocationsDataExchangesListingsError = CommonErrors;

export const deleteProjectsLocationsDataExchangesListings: API.OperationMethod<DeleteProjectsLocationsDataExchangesListingsRequest, DeleteProjectsLocationsDataExchangesListingsResponse, DeleteProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDataExchangesListingsRequest,
  output: DeleteProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

/** Lists all listings in a given project and location. */
export interface ListProjectsLocationsDataExchangesListingsRequest {
  /** The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. */
  pageSize?: number;
  /** Required. The parent resource path of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123`. */
  parent: string;
  /** Page token, returned by a previous call, to request the next page of results. */
  pageToken?: string;
}

export const ListProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDataExchangesListingsRequest>;

export type ListProjectsLocationsDataExchangesListingsResponse = ListListingsResponse;
export const ListProjectsLocationsDataExchangesListingsResponse = ListListingsResponse;

export type ListProjectsLocationsDataExchangesListingsError = CommonErrors;

export const listProjectsLocationsDataExchangesListings = API.makePaginated(() => ({
  input: ListProjectsLocationsDataExchangesListingsRequest,
  output: ListProjectsLocationsDataExchangesListingsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Subscribes to a listing. Currently, with Analytics Hub, you can create listings that reference only BigQuery datasets. Upon subscription to a listing for a BigQuery dataset, Analytics Hub creates a linked dataset in the subscriber's project. */
export interface SubscribeProjectsLocationsDataExchangesListingsRequest {
  /** Required. Resource name of the listing that you want to subscribe to. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456`. */
  name: string;
  /** Request body */
  body?: SubscribeListingRequest;
}

export const SubscribeProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SubscribeListingRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings/{listingsId}:subscribe", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SubscribeProjectsLocationsDataExchangesListingsRequest>;

export type SubscribeProjectsLocationsDataExchangesListingsResponse = SubscribeListingResponse;
export const SubscribeProjectsLocationsDataExchangesListingsResponse = SubscribeListingResponse;

export type SubscribeProjectsLocationsDataExchangesListingsError = CommonErrors;

export const subscribeProjectsLocationsDataExchangesListings: API.OperationMethod<SubscribeProjectsLocationsDataExchangesListingsRequest, SubscribeProjectsLocationsDataExchangesListingsResponse, SubscribeProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SubscribeProjectsLocationsDataExchangesListingsRequest,
  output: SubscribeProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

/** Gets the IAM policy. */
export interface GetIamPolicyProjectsLocationsDataExchangesListingsRequest {
  /** REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: GetIamPolicyRequest;
}

export const GetIamPolicyProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(GetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings/{listingsId}:getIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<GetIamPolicyProjectsLocationsDataExchangesListingsRequest>;

export type GetIamPolicyProjectsLocationsDataExchangesListingsResponse = Policy;
export const GetIamPolicyProjectsLocationsDataExchangesListingsResponse = Policy;

export type GetIamPolicyProjectsLocationsDataExchangesListingsError = CommonErrors;

export const getIamPolicyProjectsLocationsDataExchangesListings: API.OperationMethod<GetIamPolicyProjectsLocationsDataExchangesListingsRequest, GetIamPolicyProjectsLocationsDataExchangesListingsResponse, GetIamPolicyProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetIamPolicyProjectsLocationsDataExchangesListingsRequest,
  output: GetIamPolicyProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

/** Gets the details of a listing. */
export interface GetProjectsLocationsDataExchangesListingsRequest {
  /** Required. The resource name of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123/listings/456`. */
  name: string;
}

export const GetProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings/{listingsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDataExchangesListingsRequest>;

export type GetProjectsLocationsDataExchangesListingsResponse = Listing;
export const GetProjectsLocationsDataExchangesListingsResponse = Listing;

export type GetProjectsLocationsDataExchangesListingsError = CommonErrors;

export const getProjectsLocationsDataExchangesListings: API.OperationMethod<GetProjectsLocationsDataExchangesListingsRequest, GetProjectsLocationsDataExchangesListingsResponse, GetProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDataExchangesListingsRequest,
  output: GetProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

/** Sets the IAM policy. */
export interface SetIamPolicyProjectsLocationsDataExchangesListingsRequest {
  /** REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. */
  resource: string;
  /** Request body */
  body?: SetIamPolicyRequest;
}

export const SetIamPolicyProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  resource: Schema.String.pipe(T.HttpPath("resource")),
  body: Schema.optional(SetIamPolicyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings/{listingsId}:setIamPolicy", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetIamPolicyProjectsLocationsDataExchangesListingsRequest>;

export type SetIamPolicyProjectsLocationsDataExchangesListingsResponse = Policy;
export const SetIamPolicyProjectsLocationsDataExchangesListingsResponse = Policy;

export type SetIamPolicyProjectsLocationsDataExchangesListingsError = CommonErrors;

export const setIamPolicyProjectsLocationsDataExchangesListings: API.OperationMethod<SetIamPolicyProjectsLocationsDataExchangesListingsRequest, SetIamPolicyProjectsLocationsDataExchangesListingsResponse, SetIamPolicyProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetIamPolicyProjectsLocationsDataExchangesListingsRequest,
  output: SetIamPolicyProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

/** Creates a new listing. */
export interface CreateProjectsLocationsDataExchangesListingsRequest {
  /** Required. The ID of the listing to create. Must contain only Unicode letters, numbers (0-9), underscores (_). Max length: 100 bytes. */
  listingId?: string;
  /** Required. The parent resource path of the listing. e.g. `projects/myproject/locations/us/dataExchanges/123`. */
  parent: string;
  /** Request body */
  body?: Listing;
}

export const CreateProjectsLocationsDataExchangesListingsRequest = Schema.Struct({
  listingId: Schema.optional(Schema.String).pipe(T.HttpQuery("listingId")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Listing).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/listings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDataExchangesListingsRequest>;

export type CreateProjectsLocationsDataExchangesListingsResponse = Listing;
export const CreateProjectsLocationsDataExchangesListingsResponse = Listing;

export type CreateProjectsLocationsDataExchangesListingsError = CommonErrors;

export const createProjectsLocationsDataExchangesListings: API.OperationMethod<CreateProjectsLocationsDataExchangesListingsRequest, CreateProjectsLocationsDataExchangesListingsResponse, CreateProjectsLocationsDataExchangesListingsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDataExchangesListingsRequest,
  output: CreateProjectsLocationsDataExchangesListingsResponse,
  errors: [],
}));

/** Gets a QueryTemplate */
export interface GetProjectsLocationsDataExchangesQueryTemplatesRequest {
  /** Required. The parent resource path of the QueryTemplate. e.g. `projects/myproject/locations/us/dataExchanges/123/queryTemplates/myqueryTemplate`. */
  name: string;
}

export const GetProjectsLocationsDataExchangesQueryTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/queryTemplates/{queryTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsDataExchangesQueryTemplatesRequest>;

export type GetProjectsLocationsDataExchangesQueryTemplatesResponse = QueryTemplate;
export const GetProjectsLocationsDataExchangesQueryTemplatesResponse = QueryTemplate;

export type GetProjectsLocationsDataExchangesQueryTemplatesError = CommonErrors;

export const getProjectsLocationsDataExchangesQueryTemplates: API.OperationMethod<GetProjectsLocationsDataExchangesQueryTemplatesRequest, GetProjectsLocationsDataExchangesQueryTemplatesResponse, GetProjectsLocationsDataExchangesQueryTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsDataExchangesQueryTemplatesRequest,
  output: GetProjectsLocationsDataExchangesQueryTemplatesResponse,
  errors: [],
}));

/** Deletes a query template. */
export interface DeleteProjectsLocationsDataExchangesQueryTemplatesRequest {
  /** Required. The resource path of the QueryTemplate. e.g. `projects/myproject/locations/us/dataExchanges/123/queryTemplates/myqueryTemplate`. */
  name: string;
}

export const DeleteProjectsLocationsDataExchangesQueryTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/queryTemplates/{queryTemplatesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsDataExchangesQueryTemplatesRequest>;

export type DeleteProjectsLocationsDataExchangesQueryTemplatesResponse = Empty;
export const DeleteProjectsLocationsDataExchangesQueryTemplatesResponse = Empty;

export type DeleteProjectsLocationsDataExchangesQueryTemplatesError = CommonErrors;

export const deleteProjectsLocationsDataExchangesQueryTemplates: API.OperationMethod<DeleteProjectsLocationsDataExchangesQueryTemplatesRequest, DeleteProjectsLocationsDataExchangesQueryTemplatesResponse, DeleteProjectsLocationsDataExchangesQueryTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsDataExchangesQueryTemplatesRequest,
  output: DeleteProjectsLocationsDataExchangesQueryTemplatesResponse,
  errors: [],
}));

/** Lists all QueryTemplates in a given project and location. */
export interface ListProjectsLocationsDataExchangesQueryTemplatesRequest {
  /** Optional. The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. */
  pageSize?: number;
  /** Required. The parent resource path of the QueryTemplates. e.g. `projects/myproject/locations/us/dataExchanges/123`. */
  parent: string;
  /** Optional. Page token, returned by a previous call, to request the next page of results. */
  pageToken?: string;
}

export const ListProjectsLocationsDataExchangesQueryTemplatesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/queryTemplates" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsDataExchangesQueryTemplatesRequest>;

export type ListProjectsLocationsDataExchangesQueryTemplatesResponse = ListQueryTemplatesResponse;
export const ListProjectsLocationsDataExchangesQueryTemplatesResponse = ListQueryTemplatesResponse;

export type ListProjectsLocationsDataExchangesQueryTemplatesError = CommonErrors;

export const listProjectsLocationsDataExchangesQueryTemplates = API.makePaginated(() => ({
  input: ListProjectsLocationsDataExchangesQueryTemplatesRequest,
  output: ListProjectsLocationsDataExchangesQueryTemplatesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a new QueryTemplate */
export interface CreateProjectsLocationsDataExchangesQueryTemplatesRequest {
  /** Required. The parent resource path of the QueryTemplate. e.g. `projects/myproject/locations/us/dataExchanges/123/queryTemplates/myQueryTemplate`. */
  parent: string;
  /** Required. The ID of the QueryTemplate to create. Must contain only Unicode letters, numbers (0-9), underscores (_). Max length: 100 bytes. */
  queryTemplateId?: string;
  /** Request body */
  body?: QueryTemplate;
}

export const CreateProjectsLocationsDataExchangesQueryTemplatesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  queryTemplateId: Schema.optional(Schema.String).pipe(T.HttpQuery("queryTemplateId")),
  body: Schema.optional(QueryTemplate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/queryTemplates", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsDataExchangesQueryTemplatesRequest>;

export type CreateProjectsLocationsDataExchangesQueryTemplatesResponse = QueryTemplate;
export const CreateProjectsLocationsDataExchangesQueryTemplatesResponse = QueryTemplate;

export type CreateProjectsLocationsDataExchangesQueryTemplatesError = CommonErrors;

export const createProjectsLocationsDataExchangesQueryTemplates: API.OperationMethod<CreateProjectsLocationsDataExchangesQueryTemplatesRequest, CreateProjectsLocationsDataExchangesQueryTemplatesResponse, CreateProjectsLocationsDataExchangesQueryTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsDataExchangesQueryTemplatesRequest,
  output: CreateProjectsLocationsDataExchangesQueryTemplatesResponse,
  errors: [],
}));

/** Submits a query template for approval. */
export interface SubmitProjectsLocationsDataExchangesQueryTemplatesRequest {
  /** Required. The resource path of the QueryTemplate. e.g. `projects/myproject/locations/us/dataExchanges/123/queryTemplates/myqueryTemplate`. */
  name: string;
  /** Request body */
  body?: SubmitQueryTemplateRequest;
}

export const SubmitProjectsLocationsDataExchangesQueryTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(SubmitQueryTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/queryTemplates/{queryTemplatesId}:submit", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SubmitProjectsLocationsDataExchangesQueryTemplatesRequest>;

export type SubmitProjectsLocationsDataExchangesQueryTemplatesResponse = QueryTemplate;
export const SubmitProjectsLocationsDataExchangesQueryTemplatesResponse = QueryTemplate;

export type SubmitProjectsLocationsDataExchangesQueryTemplatesError = CommonErrors;

export const submitProjectsLocationsDataExchangesQueryTemplates: API.OperationMethod<SubmitProjectsLocationsDataExchangesQueryTemplatesRequest, SubmitProjectsLocationsDataExchangesQueryTemplatesResponse, SubmitProjectsLocationsDataExchangesQueryTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SubmitProjectsLocationsDataExchangesQueryTemplatesRequest,
  output: SubmitProjectsLocationsDataExchangesQueryTemplatesResponse,
  errors: [],
}));

/** Approves a query template. */
export interface ApproveProjectsLocationsDataExchangesQueryTemplatesRequest {
  /** Required. The resource path of the QueryTemplate. e.g. `projects/myproject/locations/us/dataExchanges/123/queryTemplates/myqueryTemplate`. */
  name: string;
  /** Request body */
  body?: ApproveQueryTemplateRequest;
}

export const ApproveProjectsLocationsDataExchangesQueryTemplatesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(ApproveQueryTemplateRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/queryTemplates/{queryTemplatesId}:approve", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ApproveProjectsLocationsDataExchangesQueryTemplatesRequest>;

export type ApproveProjectsLocationsDataExchangesQueryTemplatesResponse = QueryTemplate;
export const ApproveProjectsLocationsDataExchangesQueryTemplatesResponse = QueryTemplate;

export type ApproveProjectsLocationsDataExchangesQueryTemplatesError = CommonErrors;

export const approveProjectsLocationsDataExchangesQueryTemplates: API.OperationMethod<ApproveProjectsLocationsDataExchangesQueryTemplatesRequest, ApproveProjectsLocationsDataExchangesQueryTemplatesResponse, ApproveProjectsLocationsDataExchangesQueryTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ApproveProjectsLocationsDataExchangesQueryTemplatesRequest,
  output: ApproveProjectsLocationsDataExchangesQueryTemplatesResponse,
  errors: [],
}));

/** Updates an existing QueryTemplate */
export interface PatchProjectsLocationsDataExchangesQueryTemplatesRequest {
  /** Optional. Field mask specifies the fields to update in the query template resource. The fields specified in the `updateMask` are relative to the resource and are not a full request. */
  updateMask?: string;
  /** Output only. The resource name of the QueryTemplate. e.g. `projects/myproject/locations/us/dataExchanges/123/queryTemplates/456` */
  name: string;
  /** Request body */
  body?: QueryTemplate;
}

export const PatchProjectsLocationsDataExchangesQueryTemplatesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(QueryTemplate).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/projects/{projectsId}/locations/{locationsId}/dataExchanges/{dataExchangesId}/queryTemplates/{queryTemplatesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsDataExchangesQueryTemplatesRequest>;

export type PatchProjectsLocationsDataExchangesQueryTemplatesResponse = QueryTemplate;
export const PatchProjectsLocationsDataExchangesQueryTemplatesResponse = QueryTemplate;

export type PatchProjectsLocationsDataExchangesQueryTemplatesError = CommonErrors;

export const patchProjectsLocationsDataExchangesQueryTemplates: API.OperationMethod<PatchProjectsLocationsDataExchangesQueryTemplatesRequest, PatchProjectsLocationsDataExchangesQueryTemplatesResponse, PatchProjectsLocationsDataExchangesQueryTemplatesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsDataExchangesQueryTemplatesRequest,
  output: PatchProjectsLocationsDataExchangesQueryTemplatesResponse,
  errors: [],
}));

/** Lists all data exchanges from projects in a given organization and location. */
export interface ListOrganizationsLocationsDataExchangesRequest {
  /** The maximum number of results to return in a single response page. Leverage the page tokens to iterate through the entire collection. */
  pageSize?: number;
  /** Required. The organization resource path of the projects containing DataExchanges. e.g. `organizations/myorg/locations/us`. */
  organization: string;
  /** Page token, returned by a previous call, to request the next page of results. */
  pageToken?: string;
}

export const ListOrganizationsLocationsDataExchangesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  organization: Schema.String.pipe(T.HttpPath("organization")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/organizations/{organizationsId}/locations/{locationsId}/dataExchanges" }),
  svc,
) as unknown as Schema.Schema<ListOrganizationsLocationsDataExchangesRequest>;

export type ListOrganizationsLocationsDataExchangesResponse = ListOrgDataExchangesResponse;
export const ListOrganizationsLocationsDataExchangesResponse = ListOrgDataExchangesResponse;

export type ListOrganizationsLocationsDataExchangesError = CommonErrors;

export const listOrganizationsLocationsDataExchanges = API.makePaginated(() => ({
  input: ListOrganizationsLocationsDataExchangesRequest,
  output: ListOrganizationsLocationsDataExchangesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

