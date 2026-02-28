// ==========================================================================
// Vertex AI Search for commerce API (retail v2)
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
  name: "retail",
  version: "v2",
  rootUrl: "https://retail.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface GoogleRpcStatus {
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
}

export const GoogleRpcStatus: Schema.Schema<GoogleRpcStatus> = Schema.suspend(() => Schema.Struct({
  code: Schema.optional(Schema.Number),
  message: Schema.optional(Schema.String),
  details: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "GoogleRpcStatus" }) as any as Schema.Schema<GoogleRpcStatus>;

export interface GoogleLongrunningOperation {
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: GoogleRpcStatus;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
}

export const GoogleLongrunningOperation: Schema.Schema<GoogleLongrunningOperation> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(GoogleRpcStatus),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleLongrunningOperation" }) as any as Schema.Schema<GoogleLongrunningOperation>;

export interface GoogleLongrunningListOperationsResponse {
  /** A list of operations that matches the specified filter in the request. */
  operations?: Array<GoogleLongrunningOperation>;
  /** The standard List next-page token. */
  nextPageToken?: string;
  /** Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. */
  unreachable?: Array<string>;
}

export const GoogleLongrunningListOperationsResponse: Schema.Schema<GoogleLongrunningListOperationsResponse> = Schema.suspend(() => Schema.Struct({
  operations: Schema.optional(Schema.Array(GoogleLongrunningOperation)),
  nextPageToken: Schema.optional(Schema.String),
  unreachable: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleLongrunningListOperationsResponse" }) as any as Schema.Schema<GoogleLongrunningListOperationsResponse>;

export interface GoogleCloudRetailV2OutputConfigGcsDestination {
  /** Required. The output uri prefix for saving output data to json files. Some mapping examples are as follows: output_uri_prefix sample output(assuming the object is foo.json) ======================== ============================================= gs://bucket/ gs://bucket/foo.json gs://bucket/folder/ gs://bucket/folder/foo.json gs://bucket/folder/item_ gs://bucket/folder/item_foo.json */
  outputUriPrefix?: string;
}

export const GoogleCloudRetailV2OutputConfigGcsDestination: Schema.Schema<GoogleCloudRetailV2OutputConfigGcsDestination> = Schema.suspend(() => Schema.Struct({
  outputUriPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2OutputConfigGcsDestination" }) as any as Schema.Schema<GoogleCloudRetailV2OutputConfigGcsDestination>;

export interface GoogleCloudRetailV2OutputConfigBigQueryDestination {
  /** Required. The ID of a BigQuery Dataset. */
  datasetId?: string;
  /** Required. The prefix of exported BigQuery tables. */
  tableIdPrefix?: string;
  /** Required. Describes the table type. The following values are supported: * `table`: A BigQuery native table. * `view`: A virtual table defined by a SQL query. */
  tableType?: string;
}

export const GoogleCloudRetailV2OutputConfigBigQueryDestination: Schema.Schema<GoogleCloudRetailV2OutputConfigBigQueryDestination> = Schema.suspend(() => Schema.Struct({
  datasetId: Schema.optional(Schema.String),
  tableIdPrefix: Schema.optional(Schema.String),
  tableType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2OutputConfigBigQueryDestination" }) as any as Schema.Schema<GoogleCloudRetailV2OutputConfigBigQueryDestination>;

export interface GoogleCloudRetailV2OutputConfig {
  /** The Google Cloud Storage location where the output is to be written to. */
  gcsDestination?: GoogleCloudRetailV2OutputConfigGcsDestination;
  /** The BigQuery location where the output is to be written to. */
  bigqueryDestination?: GoogleCloudRetailV2OutputConfigBigQueryDestination;
}

export const GoogleCloudRetailV2OutputConfig: Schema.Schema<GoogleCloudRetailV2OutputConfig> = Schema.suspend(() => Schema.Struct({
  gcsDestination: Schema.optional(GoogleCloudRetailV2OutputConfigGcsDestination),
  bigqueryDestination: Schema.optional(GoogleCloudRetailV2OutputConfigBigQueryDestination),
})).annotate({ identifier: "GoogleCloudRetailV2OutputConfig" }) as any as Schema.Schema<GoogleCloudRetailV2OutputConfig>;

export interface GoogleCloudRetailV2ExportAnalyticsMetricsRequest {
  /** Required. The output location of the data. Only `bigquery_destination` is supported, and `bigquery_destination.table_type` must be set to `view`. */
  outputConfig?: GoogleCloudRetailV2OutputConfig;
  /** A filtering expression to specify restrictions on returned metrics. The expression is a sequence of terms. Each term applies a restriction to the returned metrics. Use this expression to restrict results to a specific time range. Currently we expect only one types of fields: * `timestamp`: This can be specified twice, once with a less than operator and once with a greater than operator. The `timestamp` restriction should result in one, contiguous, valid, `timestamp` range. Some examples of valid filters expressions: * Example 1: `timestamp > "2012-04-23T18:25:43.511Z" timestamp < "2012-04-23T18:30:43.511Z"` * Example 2: `timestamp > "2012-04-23T18:25:43.511Z"` */
  filter?: string;
}

export const GoogleCloudRetailV2ExportAnalyticsMetricsRequest: Schema.Schema<GoogleCloudRetailV2ExportAnalyticsMetricsRequest> = Schema.suspend(() => Schema.Struct({
  outputConfig: Schema.optional(GoogleCloudRetailV2OutputConfig),
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ExportAnalyticsMetricsRequest" }) as any as Schema.Schema<GoogleCloudRetailV2ExportAnalyticsMetricsRequest>;

export interface GoogleCloudRetailV2ProductLevelConfig {
  /** The type of Products allowed to be ingested into the catalog. Acceptable values are: * `primary` (default): You can ingest Products of all types. When ingesting a Product, its type will default to Product.Type.PRIMARY if unset. * `variant` (incompatible with Retail Search): You can only ingest Product.Type.VARIANT Products. This means Product.primary_product_id cannot be empty. If this field is set to an invalid value other than these, an INVALID_ARGUMENT error is returned. If this field is `variant` and merchant_center_product_id_field is `itemGroupId`, an INVALID_ARGUMENT error is returned. See [Product levels](https://cloud.google.com/retail/docs/catalog#product-levels) for more details. */
  ingestionProductType?: string;
  /** Which field of [Merchant Center Product](/bigquery-transfer/docs/merchant-center-products-schema) should be imported as Product.id. Acceptable values are: * `offerId` (default): Import `offerId` as the product ID. * `itemGroupId`: Import `itemGroupId` as the product ID. Notice that Retail API will choose one item from the ones with the same `itemGroupId`, and use it to represent the item group. If this field is set to an invalid value other than these, an INVALID_ARGUMENT error is returned. If this field is `itemGroupId` and ingestion_product_type is `variant`, an INVALID_ARGUMENT error is returned. See [Product levels](https://cloud.google.com/retail/docs/catalog#product-levels) for more details. */
  merchantCenterProductIdField?: string;
}

export const GoogleCloudRetailV2ProductLevelConfig: Schema.Schema<GoogleCloudRetailV2ProductLevelConfig> = Schema.suspend(() => Schema.Struct({
  ingestionProductType: Schema.optional(Schema.String),
  merchantCenterProductIdField: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ProductLevelConfig" }) as any as Schema.Schema<GoogleCloudRetailV2ProductLevelConfig>;

export interface GoogleCloudRetailV2Catalog {
  /** Required. Immutable. The fully qualified resource name of the catalog. */
  name?: string;
  /** Required. Immutable. The catalog display name. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. */
  displayName?: string;
  /** Required. The product level configuration. */
  productLevelConfig?: GoogleCloudRetailV2ProductLevelConfig;
}

export const GoogleCloudRetailV2Catalog: Schema.Schema<GoogleCloudRetailV2Catalog> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  productLevelConfig: Schema.optional(GoogleCloudRetailV2ProductLevelConfig),
})).annotate({ identifier: "GoogleCloudRetailV2Catalog" }) as any as Schema.Schema<GoogleCloudRetailV2Catalog>;

export interface GoogleCloudRetailV2ListCatalogsResponse {
  /** All the customer's Catalogs. */
  catalogs?: Array<GoogleCloudRetailV2Catalog>;
  /** A token that can be sent as ListCatalogsRequest.page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudRetailV2ListCatalogsResponse: Schema.Schema<GoogleCloudRetailV2ListCatalogsResponse> = Schema.suspend(() => Schema.Struct({
  catalogs: Schema.optional(Schema.Array(GoogleCloudRetailV2Catalog)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ListCatalogsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2ListCatalogsResponse>;

export interface GoogleCloudRetailV2SetDefaultBranchRequest {
  /** The final component of the resource name of a branch. This field must be one of "0", "1" or "2". Otherwise, an INVALID_ARGUMENT error is returned. If there are no sufficient active products in the targeted branch and force is not set, a FAILED_PRECONDITION error is returned. */
  branchId?: string;
  /** Some note on this request, this can be retrieved by CatalogService.GetDefaultBranch before next valid default branch set occurs. This field must be a UTF-8 encoded string with a length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. */
  note?: string;
  /** If set to true, it permits switching to a branch with branch_id even if it has no sufficient active products. */
  force?: boolean;
}

export const GoogleCloudRetailV2SetDefaultBranchRequest: Schema.Schema<GoogleCloudRetailV2SetDefaultBranchRequest> = Schema.suspend(() => Schema.Struct({
  branchId: Schema.optional(Schema.String),
  note: Schema.optional(Schema.String),
  force: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2SetDefaultBranchRequest" }) as any as Schema.Schema<GoogleCloudRetailV2SetDefaultBranchRequest>;

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleCloudRetailV2GetDefaultBranchResponse {
  /** Full resource name of the branch id currently set as default branch. */
  branch?: string;
  /** The time when this branch is set to default. */
  setTime?: string;
  /** This corresponds to SetDefaultBranchRequest.note field, when this branch was set as default. */
  note?: string;
}

export const GoogleCloudRetailV2GetDefaultBranchResponse: Schema.Schema<GoogleCloudRetailV2GetDefaultBranchResponse> = Schema.suspend(() => Schema.Struct({
  branch: Schema.optional(Schema.String),
  setTime: Schema.optional(Schema.String),
  note: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2GetDefaultBranchResponse" }) as any as Schema.Schema<GoogleCloudRetailV2GetDefaultBranchResponse>;

export interface GoogleTypeDate {
  /** Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. */
  year?: number;
  /** Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. */
  month?: number;
  /** Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. */
  day?: number;
}

export const GoogleTypeDate: Schema.Schema<GoogleTypeDate> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeDate" }) as any as Schema.Schema<GoogleTypeDate>;

export interface GoogleCloudRetailV2BigQuerySource {
  /** BigQuery time partitioned table's _PARTITIONDATE in YYYY-MM-DD format. */
  partitionDate?: GoogleTypeDate;
  /** The project ID (can be project # or ID) that the BigQuery source is in with a length limit of 128 characters. If not specified, inherits the project ID from the parent request. */
  projectId?: string;
  /** Required. The BigQuery data set to copy the data from with a length limit of 1,024 characters. */
  datasetId?: string;
  /** Required. The BigQuery table to copy the data from with a length limit of 1,024 characters. */
  tableId?: string;
  /** Intermediate Cloud Storage directory used for the import with a length limit of 2,000 characters. Can be specified if one wants to have the BigQuery export to a specific Cloud Storage directory. */
  gcsStagingDir?: string;
  /** The schema to use when parsing the data from the source. Supported values for product imports: * `product` (default): One JSON Product per line. Each product must have a valid Product.id. * `product_merchant_center`: See [Importing catalog data from Merchant Center](https://cloud.google.com/retail/recommendations-ai/docs/upload-catalog#mc). Supported values for user events imports: * `user_event` (default): One JSON UserEvent per line. * `user_event_ga360`: The schema is available here: https://support.google.com/analytics/answer/3437719. * `user_event_ga4`: The schema is available here: https://support.google.com/analytics/answer/7029846. Supported values for autocomplete imports: * `suggestions` (default): One JSON completion suggestion per line. * `denylist`: One JSON deny suggestion per line. * `allowlist`: One JSON allow suggestion per line. */
  dataSchema?: string;
}

export const GoogleCloudRetailV2BigQuerySource: Schema.Schema<GoogleCloudRetailV2BigQuerySource> = Schema.suspend(() => Schema.Struct({
  partitionDate: Schema.optional(GoogleTypeDate),
  projectId: Schema.optional(Schema.String),
  datasetId: Schema.optional(Schema.String),
  tableId: Schema.optional(Schema.String),
  gcsStagingDir: Schema.optional(Schema.String),
  dataSchema: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2BigQuerySource" }) as any as Schema.Schema<GoogleCloudRetailV2BigQuerySource>;

export interface GoogleCloudRetailV2CompletionDataInputConfig {
  /** Required. BigQuery input source. Add the IAM permission "BigQuery Data Viewer" for cloud-retail-customer-data-access@system.gserviceaccount.com before using this feature otherwise an error is thrown. */
  bigQuerySource?: GoogleCloudRetailV2BigQuerySource;
}

export const GoogleCloudRetailV2CompletionDataInputConfig: Schema.Schema<GoogleCloudRetailV2CompletionDataInputConfig> = Schema.suspend(() => Schema.Struct({
  bigQuerySource: Schema.optional(GoogleCloudRetailV2BigQuerySource),
})).annotate({ identifier: "GoogleCloudRetailV2CompletionDataInputConfig" }) as any as Schema.Schema<GoogleCloudRetailV2CompletionDataInputConfig>;

export interface GoogleCloudRetailV2CompletionConfig {
  /** Required. Immutable. Fully qualified name `projects/* /locations/* /catalogs/* /completionConfig` */
  name?: string;
  /** Specifies the matching order for autocomplete suggestions, e.g., a query consisting of 'sh' with 'out-of-order' specified would suggest "women's shoes", whereas a query of 'red s' with 'exact-prefix' specified would suggest "red shoes". Currently supported values: * 'out-of-order' * 'exact-prefix' Default value: 'exact-prefix'. */
  matchingOrder?: string;
  /** The maximum number of autocomplete suggestions returned per term. Default value is 20. If left unset or set to 0, then will fallback to default value. Value range is 1 to 20. */
  maxSuggestions?: number;
  /** The minimum number of characters needed to be typed in order to get suggestions. Default value is 2. If left unset or set to 0, then will fallback to default value. Value range is 1 to 20. */
  minPrefixLength?: number;
  /** If set to true, the auto learning function is enabled. Auto learning uses user data to generate suggestions using ML techniques. Default value is false. Only after enabling auto learning can users use `cloud-retail` data in CompleteQueryRequest. */
  autoLearning?: boolean;
  /** Output only. The source data for the latest import of the autocomplete suggestion phrases. */
  suggestionsInputConfig?: GoogleCloudRetailV2CompletionDataInputConfig;
  /** Output only. Name of the LRO corresponding to the latest suggestion terms list import. Can use GetOperation API method to retrieve the latest state of the Long Running Operation. */
  lastSuggestionsImportOperation?: string;
  /** Output only. The source data for the latest import of the autocomplete denylist phrases. */
  denylistInputConfig?: GoogleCloudRetailV2CompletionDataInputConfig;
  /** Output only. Name of the LRO corresponding to the latest denylist import. Can use GetOperation API to retrieve the latest state of the Long Running Operation. */
  lastDenylistImportOperation?: string;
  /** Output only. The source data for the latest import of the autocomplete allowlist phrases. */
  allowlistInputConfig?: GoogleCloudRetailV2CompletionDataInputConfig;
  /** Output only. Name of the LRO corresponding to the latest allowlist import. Can use GetOperation API to retrieve the latest state of the Long Running Operation. */
  lastAllowlistImportOperation?: string;
}

export const GoogleCloudRetailV2CompletionConfig: Schema.Schema<GoogleCloudRetailV2CompletionConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  matchingOrder: Schema.optional(Schema.String),
  maxSuggestions: Schema.optional(Schema.Number),
  minPrefixLength: Schema.optional(Schema.Number),
  autoLearning: Schema.optional(Schema.Boolean),
  suggestionsInputConfig: Schema.optional(GoogleCloudRetailV2CompletionDataInputConfig),
  lastSuggestionsImportOperation: Schema.optional(Schema.String),
  denylistInputConfig: Schema.optional(GoogleCloudRetailV2CompletionDataInputConfig),
  lastDenylistImportOperation: Schema.optional(Schema.String),
  allowlistInputConfig: Schema.optional(GoogleCloudRetailV2CompletionDataInputConfig),
  lastAllowlistImportOperation: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2CompletionConfig" }) as any as Schema.Schema<GoogleCloudRetailV2CompletionConfig>;

export interface GoogleCloudRetailV2Interval {
  /** Inclusive lower bound. */
  minimum?: number;
  /** Exclusive lower bound. */
  exclusiveMinimum?: number;
  /** Inclusive upper bound. */
  maximum?: number;
  /** Exclusive upper bound. */
  exclusiveMaximum?: number;
}

export const GoogleCloudRetailV2Interval: Schema.Schema<GoogleCloudRetailV2Interval> = Schema.suspend(() => Schema.Struct({
  minimum: Schema.optional(Schema.Number),
  exclusiveMinimum: Schema.optional(Schema.Number),
  maximum: Schema.optional(Schema.Number),
  exclusiveMaximum: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRetailV2Interval" }) as any as Schema.Schema<GoogleCloudRetailV2Interval>;

export interface GoogleCloudRetailV2CatalogAttributeFacetConfigIgnoredFacetValues {
  /** List of facet values to ignore for the following time range. The facet values are the same as the attribute values. There is a limit of 10 values per instance of IgnoredFacetValues. Each value can have at most 128 characters. */
  values?: Array<string>;
  /** Time range for the current list of facet values to ignore. If multiple time ranges are specified for an facet value for the current attribute, consider all of them. If both are empty, ignore always. If start time and end time are set, then start time must be before end time. If start time is not empty and end time is empty, then will ignore these facet values after the start time. */
  startTime?: string;
  /** If start time is empty and end time is not empty, then ignore these facet values before end time. */
  endTime?: string;
}

export const GoogleCloudRetailV2CatalogAttributeFacetConfigIgnoredFacetValues: Schema.Schema<GoogleCloudRetailV2CatalogAttributeFacetConfigIgnoredFacetValues> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2CatalogAttributeFacetConfigIgnoredFacetValues" }) as any as Schema.Schema<GoogleCloudRetailV2CatalogAttributeFacetConfigIgnoredFacetValues>;

export interface GoogleCloudRetailV2CatalogAttributeFacetConfigMergedFacetValue {
  /** All the facet values that are replaces by the same merged_value that follows. The maximum number of values per MergedFacetValue is 25. Each value can have up to 128 characters. */
  values?: Array<string>;
  /** All the previous values are replaced by this merged facet value. This merged_value must be non-empty and can have up to 128 characters. */
  mergedValue?: string;
}

export const GoogleCloudRetailV2CatalogAttributeFacetConfigMergedFacetValue: Schema.Schema<GoogleCloudRetailV2CatalogAttributeFacetConfigMergedFacetValue> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
  mergedValue: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2CatalogAttributeFacetConfigMergedFacetValue" }) as any as Schema.Schema<GoogleCloudRetailV2CatalogAttributeFacetConfigMergedFacetValue>;

export interface GoogleCloudRetailV2CatalogAttributeFacetConfigMergedFacet {
  /** The merged facet key should be a valid facet key that is different than the facet key of the current catalog attribute. We refer this is merged facet key as the child of the current catalog attribute. This merged facet key can't be a parent of another facet key (i.e. no directed path of length 2). This merged facet key needs to be either a textual custom attribute or a numerical custom attribute. */
  mergedFacetKey?: string;
}

export const GoogleCloudRetailV2CatalogAttributeFacetConfigMergedFacet: Schema.Schema<GoogleCloudRetailV2CatalogAttributeFacetConfigMergedFacet> = Schema.suspend(() => Schema.Struct({
  mergedFacetKey: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2CatalogAttributeFacetConfigMergedFacet" }) as any as Schema.Schema<GoogleCloudRetailV2CatalogAttributeFacetConfigMergedFacet>;

export interface GoogleCloudRetailV2CatalogAttributeFacetConfigRerankConfig {
  /** If set to true, then we also rerank the dynamic facets based on the facet values engaged by the user for the current attribute key during serving. */
  rerankFacet?: boolean;
  /** If empty, rerank on all facet values for the current key. Otherwise, will rerank on the facet values from this list only. */
  facetValues?: Array<string>;
}

export const GoogleCloudRetailV2CatalogAttributeFacetConfigRerankConfig: Schema.Schema<GoogleCloudRetailV2CatalogAttributeFacetConfigRerankConfig> = Schema.suspend(() => Schema.Struct({
  rerankFacet: Schema.optional(Schema.Boolean),
  facetValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2CatalogAttributeFacetConfigRerankConfig" }) as any as Schema.Schema<GoogleCloudRetailV2CatalogAttributeFacetConfigRerankConfig>;

export interface GoogleCloudRetailV2CatalogAttributeFacetConfig {
  /** If you don't set the facet SearchRequest.FacetSpec.FacetKey.intervals in the request to a numerical attribute, then we use the computed intervals with rounded bounds obtained from all its product numerical attribute values. The computed intervals might not be ideal for some attributes. Therefore, we give you the option to overwrite them with the facet_intervals field. The maximum of facet intervals per CatalogAttribute is 40. Each interval must have a lower bound or an upper bound. If both bounds are provided, then the lower bound must be smaller or equal than the upper bound. */
  facetIntervals?: Array<GoogleCloudRetailV2Interval>;
  /** Each instance represents a list of attribute values to ignore as facet values for a specific time range. The maximum number of instances per CatalogAttribute is 25. */
  ignoredFacetValues?: Array<GoogleCloudRetailV2CatalogAttributeFacetConfigIgnoredFacetValues>;
  /** Each instance replaces a list of facet values by a merged facet value. If a facet value is not in any list, then it will stay the same. To avoid conflicts, only paths of length 1 are accepted. In other words, if "dark_blue" merged into "BLUE", then the latter can't merge into "blues" because this would create a path of length 2. The maximum number of instances of MergedFacetValue per CatalogAttribute is 100. This feature is available only for textual custom attributes. */
  mergedFacetValues?: Array<GoogleCloudRetailV2CatalogAttributeFacetConfigMergedFacetValue>;
  /** Use this field only if you want to merge a facet key into another facet key. */
  mergedFacet?: GoogleCloudRetailV2CatalogAttributeFacetConfigMergedFacet;
  /** Set this field only if you want to rerank based on facet values engaged by the user for the current key. This option is only possible for custom facetable textual keys. */
  rerankConfig?: GoogleCloudRetailV2CatalogAttributeFacetConfigRerankConfig;
}

export const GoogleCloudRetailV2CatalogAttributeFacetConfig: Schema.Schema<GoogleCloudRetailV2CatalogAttributeFacetConfig> = Schema.suspend(() => Schema.Struct({
  facetIntervals: Schema.optional(Schema.Array(GoogleCloudRetailV2Interval)),
  ignoredFacetValues: Schema.optional(Schema.Array(GoogleCloudRetailV2CatalogAttributeFacetConfigIgnoredFacetValues)),
  mergedFacetValues: Schema.optional(Schema.Array(GoogleCloudRetailV2CatalogAttributeFacetConfigMergedFacetValue)),
  mergedFacet: Schema.optional(GoogleCloudRetailV2CatalogAttributeFacetConfigMergedFacet),
  rerankConfig: Schema.optional(GoogleCloudRetailV2CatalogAttributeFacetConfigRerankConfig),
})).annotate({ identifier: "GoogleCloudRetailV2CatalogAttributeFacetConfig" }) as any as Schema.Schema<GoogleCloudRetailV2CatalogAttributeFacetConfig>;

export interface GoogleCloudRetailV2CatalogAttribute {
  /** Required. Attribute name. For example: `color`, `brands`, `attributes.custom_attribute`, such as `attributes.xyz`. To be indexable, the attribute name can contain only alpha-numeric characters and underscores. For example, an attribute named `attributes.abc_xyz` can be indexed, but an attribute named `attributes.abc-xyz` cannot be indexed. If the attribute key starts with `attributes.`, then the attribute is a custom attribute. Attributes such as `brands`, `patterns`, and `title` are built-in and called system attributes. */
  key?: string;
  /** Output only. Indicates whether this attribute has been used by any products. `True` if at least one Product is using this attribute in Product.attributes. Otherwise, this field is `False`. CatalogAttribute can be pre-loaded by using CatalogService.AddCatalogAttribute or CatalogService.UpdateAttributesConfig APIs. This field is `False` for pre-loaded CatalogAttributes. Only pre-loaded catalog attributes that are neither in use by products nor predefined can be deleted. Catalog attributes that are either in use by products or are predefined attributes cannot be deleted; however, their configuration properties will reset to default values upon removal request. After catalog changes, it takes about 10 minutes for this field to update. */
  inUse?: boolean;
  /** Output only. The type of this attribute. This is derived from the attribute in Product.attributes. */
  type?: "UNKNOWN" | "TEXTUAL" | "NUMERICAL" | (string & {});
  /** When AttributesConfig.attribute_config_level is CATALOG_LEVEL_ATTRIBUTE_CONFIG, if INDEXABLE_ENABLED attribute values are indexed so that it can be filtered, faceted, or boosted in SearchService.Search. Must be specified when AttributesConfig.attribute_config_level is CATALOG_LEVEL_ATTRIBUTE_CONFIG, otherwise throws INVALID_FORMAT error. */
  indexableOption?: "INDEXABLE_OPTION_UNSPECIFIED" | "INDEXABLE_ENABLED" | "INDEXABLE_DISABLED" | (string & {});
  /** If DYNAMIC_FACETABLE_ENABLED, attribute values are available for dynamic facet. Could only be DYNAMIC_FACETABLE_DISABLED if CatalogAttribute.indexable_option is INDEXABLE_DISABLED. Otherwise, an INVALID_ARGUMENT error is returned. Must be specified, otherwise throws INVALID_FORMAT error. */
  dynamicFacetableOption?: "DYNAMIC_FACETABLE_OPTION_UNSPECIFIED" | "DYNAMIC_FACETABLE_ENABLED" | "DYNAMIC_FACETABLE_DISABLED" | (string & {});
  /** When AttributesConfig.attribute_config_level is CATALOG_LEVEL_ATTRIBUTE_CONFIG, if SEARCHABLE_ENABLED, attribute values are searchable by text queries in SearchService.Search. If SEARCHABLE_ENABLED but attribute type is numerical, attribute values will not be searchable by text queries in SearchService.Search, as there are no text values associated to numerical attributes. Must be specified, when AttributesConfig.attribute_config_level is CATALOG_LEVEL_ATTRIBUTE_CONFIG, otherwise throws INVALID_FORMAT error. */
  searchableOption?: "SEARCHABLE_OPTION_UNSPECIFIED" | "SEARCHABLE_ENABLED" | "SEARCHABLE_DISABLED" | (string & {});
  /** If EXACT_SEARCHABLE_ENABLED, attribute values will be exact searchable. This property only applies to textual custom attributes and requires indexable set to enabled to enable exact-searchable. If unset, the server behavior defaults to EXACT_SEARCHABLE_DISABLED. */
  exactSearchableOption?: "EXACT_SEARCHABLE_OPTION_UNSPECIFIED" | "EXACT_SEARCHABLE_ENABLED" | "EXACT_SEARCHABLE_DISABLED" | (string & {});
  /** If RETRIEVABLE_ENABLED, attribute values are retrievable in the search results. If unset, the server behavior defaults to RETRIEVABLE_DISABLED. */
  retrievableOption?: "RETRIEVABLE_OPTION_UNSPECIFIED" | "RETRIEVABLE_ENABLED" | "RETRIEVABLE_DISABLED" | (string & {});
  /** Contains facet options. */
  facetConfig?: GoogleCloudRetailV2CatalogAttributeFacetConfig;
}

export const GoogleCloudRetailV2CatalogAttribute: Schema.Schema<GoogleCloudRetailV2CatalogAttribute> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  inUse: Schema.optional(Schema.Boolean),
  type: Schema.optional(Schema.String),
  indexableOption: Schema.optional(Schema.String),
  dynamicFacetableOption: Schema.optional(Schema.String),
  searchableOption: Schema.optional(Schema.String),
  exactSearchableOption: Schema.optional(Schema.String),
  retrievableOption: Schema.optional(Schema.String),
  facetConfig: Schema.optional(GoogleCloudRetailV2CatalogAttributeFacetConfig),
})).annotate({ identifier: "GoogleCloudRetailV2CatalogAttribute" }) as any as Schema.Schema<GoogleCloudRetailV2CatalogAttribute>;

export interface GoogleCloudRetailV2AttributesConfig {
  /** Required. Immutable. The fully qualified resource name of the attribute config. Format: `projects/* /locations/* /catalogs/* /attributesConfig` */
  name?: string;
  /** Enable attribute(s) config at catalog level. For example, indexable, dynamic_facetable, or searchable for each attribute. The key is catalog attribute's name. For example: `color`, `brands`, `attributes.custom_attribute`, such as `attributes.xyz`. The maximum number of catalog attributes allowed in a request is 1000. */
  catalogAttributes?: Record<string, GoogleCloudRetailV2CatalogAttribute>;
  /** Output only. The AttributeConfigLevel used for this catalog. */
  attributeConfigLevel?: "ATTRIBUTE_CONFIG_LEVEL_UNSPECIFIED" | "PRODUCT_LEVEL_ATTRIBUTE_CONFIG" | "CATALOG_LEVEL_ATTRIBUTE_CONFIG" | (string & {});
}

export const GoogleCloudRetailV2AttributesConfig: Schema.Schema<GoogleCloudRetailV2AttributesConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  catalogAttributes: Schema.optional(Schema.Record(Schema.String, GoogleCloudRetailV2CatalogAttribute)),
  attributeConfigLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2AttributesConfig" }) as any as Schema.Schema<GoogleCloudRetailV2AttributesConfig>;

export interface GoogleCloudRetailV2AddCatalogAttributeRequest {
  /** Required. The CatalogAttribute to add. */
  catalogAttribute?: GoogleCloudRetailV2CatalogAttribute;
}

export const GoogleCloudRetailV2AddCatalogAttributeRequest: Schema.Schema<GoogleCloudRetailV2AddCatalogAttributeRequest> = Schema.suspend(() => Schema.Struct({
  catalogAttribute: Schema.optional(GoogleCloudRetailV2CatalogAttribute),
})).annotate({ identifier: "GoogleCloudRetailV2AddCatalogAttributeRequest" }) as any as Schema.Schema<GoogleCloudRetailV2AddCatalogAttributeRequest>;

export interface GoogleCloudRetailV2RemoveCatalogAttributeRequest {
  /** Required. The attribute name key of the CatalogAttribute to remove. */
  key?: string;
}

export const GoogleCloudRetailV2RemoveCatalogAttributeRequest: Schema.Schema<GoogleCloudRetailV2RemoveCatalogAttributeRequest> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2RemoveCatalogAttributeRequest" }) as any as Schema.Schema<GoogleCloudRetailV2RemoveCatalogAttributeRequest>;

export interface GoogleCloudRetailV2ReplaceCatalogAttributeRequest {
  /** Required. The updated CatalogAttribute. */
  catalogAttribute?: GoogleCloudRetailV2CatalogAttribute;
  /** Indicates which fields in the provided CatalogAttribute to update. The following are NOT supported: * CatalogAttribute.key If not set, all supported fields are updated. */
  updateMask?: string;
}

export const GoogleCloudRetailV2ReplaceCatalogAttributeRequest: Schema.Schema<GoogleCloudRetailV2ReplaceCatalogAttributeRequest> = Schema.suspend(() => Schema.Struct({
  catalogAttribute: Schema.optional(GoogleCloudRetailV2CatalogAttribute),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ReplaceCatalogAttributeRequest" }) as any as Schema.Schema<GoogleCloudRetailV2ReplaceCatalogAttributeRequest>;

export interface GoogleCloudRetailV2UserInfo {
  /** Highly recommended for logged-in users. Unique identifier for logged-in user, such as a user name. Don't set for anonymous users. Always use a hashed value for this ID. Don't set the field to the same fixed ID for different users. This mixes the event history of those users together, which results in degraded model quality. The field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. */
  userId?: string;
  /** The end user's IP address. This field is used to extract location information for personalization. This field must be either an IPv4 address (e.g. "104.133.9.80") or an IPv6 address (e.g. "2001:0db8:85a3:0000:0000:8a2e:0370:7334"). Otherwise, an INVALID_ARGUMENT error is returned. This should not be set when: * setting SearchRequest.user_info. * using the JavaScript tag in UserEventService.CollectUserEvent or if direct_user_request is set. */
  ipAddress?: string;
  /** User agent as included in the HTTP header. The field must be a UTF-8 encoded string with a length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. This should not be set when using the client side event reporting with GTM or JavaScript tag in UserEventService.CollectUserEvent or if direct_user_request is set. */
  userAgent?: string;
  /** True if the request is made directly from the end user, in which case the ip_address and user_agent can be populated from the HTTP request. This flag should be set only if the API request is made directly from the end user such as a mobile app (and not if a gateway or a server is processing and pushing the user events). This should not be set when using the JavaScript tag in UserEventService.CollectUserEvent. */
  directUserRequest?: boolean;
}

export const GoogleCloudRetailV2UserInfo: Schema.Schema<GoogleCloudRetailV2UserInfo> = Schema.suspend(() => Schema.Struct({
  userId: Schema.optional(Schema.String),
  ipAddress: Schema.optional(Schema.String),
  userAgent: Schema.optional(Schema.String),
  directUserRequest: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2UserInfo" }) as any as Schema.Schema<GoogleCloudRetailV2UserInfo>;

export interface GoogleCloudRetailV2SearchRequestFacetSpecFacetKey {
  /** Required. Supported textual and numerical facet keys in Product object, over which the facet values are computed. Facet key is case-sensitive. Allowed facet keys when FacetKey.query is not specified: * textual_field = * "brands" * "categories" * "genders" * "ageGroups" * "availability" * "colorFamilies" * "colors" * "sizes" * "materials" * "patterns" * "conditions" * "attributes.key" * "pickupInStore" * "shipToStore" * "sameDayDelivery" * "nextDayDelivery" * "customFulfillment1" * "customFulfillment2" * "customFulfillment3" * "customFulfillment4" * "customFulfillment5" * "inventory(place_id,attributes.key)" * numerical_field = * "price" * "discount" * "rating" * "ratingCount" * "attributes.key" * "inventory(place_id,price)" * "inventory(place_id,original_price)" * "inventory(place_id,attributes.key)" */
  key?: string;
  /** Set only if values should be bucketized into intervals. Must be set for facets with numerical values. Must not be set for facet with text values. Maximum number of intervals is 40. For all numerical facet keys that appear in the list of products from the catalog, the percentiles 0, 10, 30, 50, 70, 90, and 100 are computed from their distribution weekly. If the model assigns a high score to a numerical facet key and its intervals are not specified in the search request, these percentiles become the bounds for its intervals and are returned in the response. If the facet key intervals are specified in the request, then the specified intervals are returned instead. */
  intervals?: Array<GoogleCloudRetailV2Interval>;
  /** Only get facet for the given restricted values. For example, when using "pickupInStore" as key and set restricted values to ["store123", "store456"], only facets for "store123" and "store456" are returned. Only supported on predefined textual fields, custom textual attributes and fulfillments. Maximum is 20. Must be set for the fulfillment facet keys: * pickupInStore * shipToStore * sameDayDelivery * nextDayDelivery * customFulfillment1 * customFulfillment2 * customFulfillment3 * customFulfillment4 * customFulfillment5 */
  restrictedValues?: Array<string>;
  /** Only get facet values that start with the given string prefix. For example, suppose "categories" has three values "Women > Shoe", "Women > Dress" and "Men > Shoe". If set "prefixes" to "Women", the "categories" facet gives only "Women > Shoe" and "Women > Dress". Only supported on textual fields. Maximum is 10. */
  prefixes?: Array<string>;
  /** Only get facet values that contains the given strings. For example, suppose "categories" has three values "Women > Shoe", "Women > Dress" and "Men > Shoe". If set "contains" to "Shoe", the "categories" facet gives only "Women > Shoe" and "Men > Shoe". Only supported on textual fields. Maximum is 10. */
  contains?: Array<string>;
  /** True to make facet keys case insensitive when getting faceting values with prefixes or contains; false otherwise. */
  caseInsensitive?: boolean;
  /** The order in which SearchResponse.Facet.values are returned. Allowed values are: * "count desc", which means order by SearchResponse.Facet.values.count descending. * "value desc", which means order by SearchResponse.Facet.values.value descending. Only applies to textual facets. If not set, textual values are sorted in [natural order](https://en.wikipedia.org/wiki/Natural_sort_order); numerical intervals are sorted in the order given by FacetSpec.FacetKey.intervals; FulfillmentInfo.place_ids are sorted in the order given by FacetSpec.FacetKey.restricted_values. */
  orderBy?: string;
  /** The query that is used to compute facet for the given facet key. When provided, it overrides the default behavior of facet computation. The query syntax is the same as a filter expression. See SearchRequest.filter for detail syntax and limitations. Notice that there is no limitation on FacetKey.key when query is specified. In the response, SearchResponse.Facet.values.value is always "1" and SearchResponse.Facet.values.count is the number of results that match the query. For example, you can set a customized facet for "shipToStore", where FacetKey.key is "customizedShipToStore", and FacetKey.query is "availability: ANY(\"IN_STOCK\") AND shipToStore: ANY(\"123\")". Then the facet counts the products that are both in stock and ship to store "123". */
  query?: string;
  /** Returns the min and max value for each numerical facet intervals. Ignored for textual facets. */
  returnMinMax?: boolean;
}

export const GoogleCloudRetailV2SearchRequestFacetSpecFacetKey: Schema.Schema<GoogleCloudRetailV2SearchRequestFacetSpecFacetKey> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  intervals: Schema.optional(Schema.Array(GoogleCloudRetailV2Interval)),
  restrictedValues: Schema.optional(Schema.Array(Schema.String)),
  prefixes: Schema.optional(Schema.Array(Schema.String)),
  contains: Schema.optional(Schema.Array(Schema.String)),
  caseInsensitive: Schema.optional(Schema.Boolean),
  orderBy: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
  returnMinMax: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2SearchRequestFacetSpecFacetKey" }) as any as Schema.Schema<GoogleCloudRetailV2SearchRequestFacetSpecFacetKey>;

export interface GoogleCloudRetailV2SearchRequestFacetSpec {
  /** Required. The facet key specification. */
  facetKey?: GoogleCloudRetailV2SearchRequestFacetSpecFacetKey;
  /** Maximum of facet values that should be returned for this facet. If unspecified, defaults to 50. The maximum allowed value is 300. Values above 300 will be coerced to 300. If this field is negative, an INVALID_ARGUMENT is returned. */
  limit?: number;
  /** List of keys to exclude when faceting. By default, FacetKey.key is not excluded from the filter unless it is listed in this field. Listing a facet key in this field allows its values to appear as facet results, even when they are filtered out of search results. Using this field does not affect what search results are returned. For example, suppose there are 100 products with the color facet "Red" and 200 products with the color facet "Blue". A query containing the filter "colorFamilies:ANY("Red")" and having "colorFamilies" as FacetKey.key would by default return only "Red" products in the search results, and also return "Red" with count 100 as the only color facet. Although there are also blue products available, "Blue" would not be shown as an available facet value. If "colorFamilies" is listed in "excludedFilterKeys", then the query returns the facet values "Red" with count 100 and "Blue" with count 200, because the "colorFamilies" key is now excluded from the filter. Because this field doesn't affect search results, the search results are still correctly filtered to return only "Red" products. A maximum of 100 values are allowed. Otherwise, an INVALID_ARGUMENT error is returned. */
  excludedFilterKeys?: Array<string>;
  /** Enables dynamic position for this facet. If set to true, the position of this facet among all facets in the response is determined by Google Retail Search. It is ordered together with dynamic facets if dynamic facets is enabled. If set to false, the position of this facet in the response is the same as in the request, and it is ranked before the facets with dynamic position enable and all dynamic facets. For example, you may always want to have rating facet returned in the response, but it's not necessarily to always display the rating facet at the top. In that case, you can set enable_dynamic_position to true so that the position of rating facet in response is determined by Google Retail Search. Another example, assuming you have the following facets in the request: * "rating", enable_dynamic_position = true * "price", enable_dynamic_position = false * "brands", enable_dynamic_position = false And also you have a dynamic facets enable, which generates a facet "gender". Then, the final order of the facets in the response can be ("price", "brands", "rating", "gender") or ("price", "brands", "gender", "rating") depends on how Google Retail Search orders "gender" and "rating" facets. However, notice that "price" and "brands" are always ranked at first and second position because their enable_dynamic_position values are false. */
  enableDynamicPosition?: boolean;
}

export const GoogleCloudRetailV2SearchRequestFacetSpec: Schema.Schema<GoogleCloudRetailV2SearchRequestFacetSpec> = Schema.suspend(() => Schema.Struct({
  facetKey: Schema.optional(GoogleCloudRetailV2SearchRequestFacetSpecFacetKey),
  limit: Schema.optional(Schema.Number),
  excludedFilterKeys: Schema.optional(Schema.Array(Schema.String)),
  enableDynamicPosition: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2SearchRequestFacetSpec" }) as any as Schema.Schema<GoogleCloudRetailV2SearchRequestFacetSpec>;

export interface GoogleCloudRetailV2SearchRequestDynamicFacetSpec {
  /** Mode of the DynamicFacet feature. Defaults to Mode.DISABLED if it's unset. */
  mode?: "MODE_UNSPECIFIED" | "DISABLED" | "ENABLED" | (string & {});
}

export const GoogleCloudRetailV2SearchRequestDynamicFacetSpec: Schema.Schema<GoogleCloudRetailV2SearchRequestDynamicFacetSpec> = Schema.suspend(() => Schema.Struct({
  mode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2SearchRequestDynamicFacetSpec" }) as any as Schema.Schema<GoogleCloudRetailV2SearchRequestDynamicFacetSpec>;

export interface GoogleCloudRetailV2SearchRequestBoostSpecConditionBoostSpec {
  /** An expression which specifies a boost condition. The syntax and supported fields are the same as a filter expression. See SearchRequest.filter for detail syntax and limitations. Examples: * To boost products with product ID "product_1" or "product_2", and color "Red" or "Blue": * (id: ANY("product_1", "product_2")) AND (colorFamilies: ANY("Red","Blue")) */
  condition?: string;
  /** Strength of the condition boost, which should be in [-1, 1]. Negative boost means demotion. Default is 0.0. Setting to 1.0 gives the item a big promotion. However, it does not necessarily mean that the boosted item will be the top result at all times, nor that other items will be excluded. Results could still be shown even when none of them matches the condition. And results that are significantly more relevant to the search query can still trump your heavily favored but irrelevant items. Setting to -1.0 gives the item a big demotion. However, results that are deeply relevant might still be shown. The item will have an upstream battle to get a fairly high ranking, but it is not blocked out completely. Setting to 0.0 means no boost applied. The boosting condition is ignored. */
  boost?: number;
}

export const GoogleCloudRetailV2SearchRequestBoostSpecConditionBoostSpec: Schema.Schema<GoogleCloudRetailV2SearchRequestBoostSpecConditionBoostSpec> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Schema.String),
  boost: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRetailV2SearchRequestBoostSpecConditionBoostSpec" }) as any as Schema.Schema<GoogleCloudRetailV2SearchRequestBoostSpecConditionBoostSpec>;

export interface GoogleCloudRetailV2SearchRequestBoostSpec {
  /** Condition boost specifications. If a product matches multiple conditions in the specifications, boost scores from these specifications are all applied and combined in a non-linear way. Maximum number of specifications is 20. */
  conditionBoostSpecs?: Array<GoogleCloudRetailV2SearchRequestBoostSpecConditionBoostSpec>;
  /** Whether to skip boostspec validation. If this field is set to true, invalid BoostSpec.condition_boost_specs will be ignored and valid BoostSpec.condition_boost_specs will still be applied. */
  skipBoostSpecValidation?: boolean;
}

export const GoogleCloudRetailV2SearchRequestBoostSpec: Schema.Schema<GoogleCloudRetailV2SearchRequestBoostSpec> = Schema.suspend(() => Schema.Struct({
  conditionBoostSpecs: Schema.optional(Schema.Array(GoogleCloudRetailV2SearchRequestBoostSpecConditionBoostSpec)),
  skipBoostSpecValidation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2SearchRequestBoostSpec" }) as any as Schema.Schema<GoogleCloudRetailV2SearchRequestBoostSpec>;

export interface GoogleCloudRetailV2SearchRequestQueryExpansionSpec {
  /** The condition under which query expansion should occur. Default to Condition.DISABLED. */
  condition?: "CONDITION_UNSPECIFIED" | "DISABLED" | "AUTO" | (string & {});
  /** Whether to pin unexpanded results. The default value is false. If this field is set to true, unexpanded products are always at the top of the search results, followed by the expanded results. */
  pinUnexpandedResults?: boolean;
}

export const GoogleCloudRetailV2SearchRequestQueryExpansionSpec: Schema.Schema<GoogleCloudRetailV2SearchRequestQueryExpansionSpec> = Schema.suspend(() => Schema.Struct({
  condition: Schema.optional(Schema.String),
  pinUnexpandedResults: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2SearchRequestQueryExpansionSpec" }) as any as Schema.Schema<GoogleCloudRetailV2SearchRequestQueryExpansionSpec>;

export interface GoogleCloudRetailV2SearchRequestPersonalizationSpec {
  /** Defaults to Mode.AUTO. */
  mode?: "MODE_UNSPECIFIED" | "AUTO" | "DISABLED" | (string & {});
}

export const GoogleCloudRetailV2SearchRequestPersonalizationSpec: Schema.Schema<GoogleCloudRetailV2SearchRequestPersonalizationSpec> = Schema.suspend(() => Schema.Struct({
  mode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2SearchRequestPersonalizationSpec" }) as any as Schema.Schema<GoogleCloudRetailV2SearchRequestPersonalizationSpec>;

export interface GoogleCloudRetailV2SearchRequestSpellCorrectionSpec {
  /** The mode under which spell correction should take effect to replace the original search query. Default to Mode.AUTO. */
  mode?: "MODE_UNSPECIFIED" | "SUGGESTION_ONLY" | "AUTO" | (string & {});
}

export const GoogleCloudRetailV2SearchRequestSpellCorrectionSpec: Schema.Schema<GoogleCloudRetailV2SearchRequestSpellCorrectionSpec> = Schema.suspend(() => Schema.Struct({
  mode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2SearchRequestSpellCorrectionSpec" }) as any as Schema.Schema<GoogleCloudRetailV2SearchRequestSpellCorrectionSpec>;

export interface GoogleCloudRetailV2ProductAttributeValue {
  /** The attribute name. */
  name?: string;
  /** The attribute value. */
  value?: string;
}

export const GoogleCloudRetailV2ProductAttributeValue: Schema.Schema<GoogleCloudRetailV2ProductAttributeValue> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ProductAttributeValue" }) as any as Schema.Schema<GoogleCloudRetailV2ProductAttributeValue>;

export interface GoogleCloudRetailV2SearchRequestConversationalSearchSpecUserAnswerSelectedAnswer {
  /** This field is deprecated and should not be set. */
  productAttributeValues?: Array<GoogleCloudRetailV2ProductAttributeValue>;
  /** This field specifies the selected answer which is a attribute key-value. */
  productAttributeValue?: GoogleCloudRetailV2ProductAttributeValue;
}

export const GoogleCloudRetailV2SearchRequestConversationalSearchSpecUserAnswerSelectedAnswer: Schema.Schema<GoogleCloudRetailV2SearchRequestConversationalSearchSpecUserAnswerSelectedAnswer> = Schema.suspend(() => Schema.Struct({
  productAttributeValues: Schema.optional(Schema.Array(GoogleCloudRetailV2ProductAttributeValue)),
  productAttributeValue: Schema.optional(GoogleCloudRetailV2ProductAttributeValue),
})).annotate({ identifier: "GoogleCloudRetailV2SearchRequestConversationalSearchSpecUserAnswerSelectedAnswer" }) as any as Schema.Schema<GoogleCloudRetailV2SearchRequestConversationalSearchSpecUserAnswerSelectedAnswer>;

export interface GoogleCloudRetailV2SearchRequestConversationalSearchSpecUserAnswer {
  /** This field specifies the incremental input text from the user during the conversational search. */
  textAnswer?: string;
  /** This field specifies the selected attributes during the conversational search. This should be a subset of SearchResponse.ConversationalSearchResult.suggested_answers. */
  selectedAnswer?: GoogleCloudRetailV2SearchRequestConversationalSearchSpecUserAnswerSelectedAnswer;
}

export const GoogleCloudRetailV2SearchRequestConversationalSearchSpecUserAnswer: Schema.Schema<GoogleCloudRetailV2SearchRequestConversationalSearchSpecUserAnswer> = Schema.suspend(() => Schema.Struct({
  textAnswer: Schema.optional(Schema.String),
  selectedAnswer: Schema.optional(GoogleCloudRetailV2SearchRequestConversationalSearchSpecUserAnswerSelectedAnswer),
})).annotate({ identifier: "GoogleCloudRetailV2SearchRequestConversationalSearchSpecUserAnswer" }) as any as Schema.Schema<GoogleCloudRetailV2SearchRequestConversationalSearchSpecUserAnswer>;

export interface GoogleCloudRetailV2SearchRequestConversationalSearchSpec {
  /** This field specifies whether the customer would like to do conversational search. If this field is set to true, conversational related extra information will be returned from server side, including follow-up question, answer options, etc. */
  followupConversationRequested?: boolean;
  /** This field specifies the conversation id, which maintains the state of the conversation between client side and server side. Use the value from the previous SearchResponse.ConversationalSearchResult.conversation_id. For the initial request, this should be empty. */
  conversationId?: string;
  /** This field specifies the current user answer during the conversational search. This can be either user selected from suggested answers or user input plain text. */
  userAnswer?: GoogleCloudRetailV2SearchRequestConversationalSearchSpecUserAnswer;
}

export const GoogleCloudRetailV2SearchRequestConversationalSearchSpec: Schema.Schema<GoogleCloudRetailV2SearchRequestConversationalSearchSpec> = Schema.suspend(() => Schema.Struct({
  followupConversationRequested: Schema.optional(Schema.Boolean),
  conversationId: Schema.optional(Schema.String),
  userAnswer: Schema.optional(GoogleCloudRetailV2SearchRequestConversationalSearchSpecUserAnswer),
})).annotate({ identifier: "GoogleCloudRetailV2SearchRequestConversationalSearchSpec" }) as any as Schema.Schema<GoogleCloudRetailV2SearchRequestConversationalSearchSpec>;

export interface GoogleCloudRetailV2ProductAttributeInterval {
  /** The attribute name (e.g. "length") */
  name?: string;
  /** The numeric interval (e.g. [10, 20)) */
  interval?: GoogleCloudRetailV2Interval;
}

export const GoogleCloudRetailV2ProductAttributeInterval: Schema.Schema<GoogleCloudRetailV2ProductAttributeInterval> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  interval: Schema.optional(GoogleCloudRetailV2Interval),
})).annotate({ identifier: "GoogleCloudRetailV2ProductAttributeInterval" }) as any as Schema.Schema<GoogleCloudRetailV2ProductAttributeInterval>;

export interface GoogleCloudRetailV2Tile {
  /** The product attribute key-value. */
  productAttributeValue?: GoogleCloudRetailV2ProductAttributeValue;
  /** The product attribute key-numeric interval. */
  productAttributeInterval?: GoogleCloudRetailV2ProductAttributeInterval;
  /** The representative product id for this tile. */
  representativeProductId?: string;
}

export const GoogleCloudRetailV2Tile: Schema.Schema<GoogleCloudRetailV2Tile> = Schema.suspend(() => Schema.Struct({
  productAttributeValue: Schema.optional(GoogleCloudRetailV2ProductAttributeValue),
  productAttributeInterval: Schema.optional(GoogleCloudRetailV2ProductAttributeInterval),
  representativeProductId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2Tile" }) as any as Schema.Schema<GoogleCloudRetailV2Tile>;

export interface GoogleCloudRetailV2SearchRequestTileNavigationSpec {
  /** This field specifies whether the customer would like to request tile navigation. */
  tileNavigationRequested?: boolean;
  /** This optional field specifies the tiles which are already clicked in client side. While the feature works without this field set, particularly for an initial query, it is highly recommended to set this field because it can improve the quality of the search response and removes possible duplicate tiles. NOTE: This field is not being used for filtering search products. Client side should also put all the applied tiles in SearchRequest.filter. */
  appliedTiles?: Array<GoogleCloudRetailV2Tile>;
}

export const GoogleCloudRetailV2SearchRequestTileNavigationSpec: Schema.Schema<GoogleCloudRetailV2SearchRequestTileNavigationSpec> = Schema.suspend(() => Schema.Struct({
  tileNavigationRequested: Schema.optional(Schema.Boolean),
  appliedTiles: Schema.optional(Schema.Array(GoogleCloudRetailV2Tile)),
})).annotate({ identifier: "GoogleCloudRetailV2SearchRequestTileNavigationSpec" }) as any as Schema.Schema<GoogleCloudRetailV2SearchRequestTileNavigationSpec>;

export interface GoogleCloudRetailV2StringList {
  /** String values. */
  values?: Array<string>;
}

export const GoogleCloudRetailV2StringList: Schema.Schema<GoogleCloudRetailV2StringList> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2StringList" }) as any as Schema.Schema<GoogleCloudRetailV2StringList>;

export interface GoogleCloudRetailV2SearchRequest {
  /** The branch resource name, such as `projects/* /locations/global/catalogs/default_catalog/branches/0`. Use "default_branch" as the branch ID or leave this field empty, to search products under the default branch. */
  branch?: string;
  /** Raw search query. If this field is empty, the request is considered a category browsing request and returned results are based on filter and page_categories. */
  query?: string;
  /** Required. A unique identifier for tracking visitors. For example, this could be implemented with an HTTP cookie, which should be able to uniquely identify a visitor on a single device. This unique identifier should not change if the visitor logs in or out of the website. This should be the same identifier as UserEvent.visitor_id. The field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. */
  visitorId?: string;
  /** User information. */
  userInfo?: GoogleCloudRetailV2UserInfo;
  /** Maximum number of Products to return. If unspecified, defaults to a reasonable value. The maximum allowed value is 120. Values above 120 will be coerced to 120. If this field is negative, an INVALID_ARGUMENT is returned. */
  pageSize?: number;
  /** A page token SearchResponse.next_page_token, received from a previous SearchService.Search call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to SearchService.Search must match the call that provided the page token. Otherwise, an INVALID_ARGUMENT error is returned. */
  pageToken?: string;
  /** A 0-indexed integer that specifies the current offset (that is, starting result location, amongst the Products deemed by the API as relevant) in search results. This field is only considered if page_token is unset. If this field is negative, an INVALID_ARGUMENT is returned. */
  offset?: number;
  /** The filter syntax consists of an expression language for constructing a predicate from one or more fields of the products being filtered. Filter expression is case-sensitive. For more information, see [Filter](https://cloud.google.com/retail/docs/filter-and-order#filter). If this field is unrecognizable, an INVALID_ARGUMENT is returned. */
  filter?: string;
  /** The default filter that is applied when a user performs a search without checking any filters on the search page. The filter applied to every search request when quality improvement such as query expansion is needed. In the case a query does not have a sufficient amount of results this filter will be used to determine whether or not to enable the query expansion flow. The original filter will still be used for the query expanded search. This field is strongly recommended to achieve high search quality. For more information about filter syntax, see SearchRequest.filter. */
  canonicalFilter?: string;
  /** The order in which products are returned. Products can be ordered by a field in an Product object. Leave it unset if ordered by relevance. OrderBy expression is case-sensitive. For more information, see [Order](https://cloud.google.com/retail/docs/filter-and-order#order). If this field is unrecognizable, an INVALID_ARGUMENT is returned. */
  orderBy?: string;
  /** Facet specifications for faceted search. If empty, no facets are returned. A maximum of 200 values are allowed. Otherwise, an INVALID_ARGUMENT error is returned. */
  facetSpecs?: Array<GoogleCloudRetailV2SearchRequestFacetSpec>;
  /** Deprecated. Refer to https://cloud.google.com/retail/docs/configs#dynamic to enable dynamic facets. Do not set this field. The specification for dynamically generated facets. Notice that only textual facets can be dynamically generated. */
  dynamicFacetSpec?: GoogleCloudRetailV2SearchRequestDynamicFacetSpec;
  /** Boost specification to boost certain products. For more information, see [Boost results](https://cloud.google.com/retail/docs/boosting). Notice that if both ServingConfig.boost_control_ids and SearchRequest.boost_spec are set, the boost conditions from both places are evaluated. If a search request matches multiple boost conditions, the final boost score is equal to the sum of the boost scores from all matched boost conditions. */
  boostSpec?: GoogleCloudRetailV2SearchRequestBoostSpec;
  /** The query expansion specification that specifies the conditions under which query expansion occurs. For more information, see [Query expansion](https://cloud.google.com/retail/docs/result-size#query_expansion). */
  queryExpansionSpec?: GoogleCloudRetailV2SearchRequestQueryExpansionSpec;
  /** The keys to fetch and rollup the matching variant Products attributes, FulfillmentInfo or LocalInventorys attributes. The attributes from all the matching variant Products or LocalInventorys are merged and de-duplicated. Notice that rollup attributes will lead to extra query latency. Maximum number of keys is 30. For FulfillmentInfo, a fulfillment type and a fulfillment ID must be provided in the format of "fulfillmentType.fulfillmentId". E.g., in "pickupInStore.store123", "pickupInStore" is fulfillment type and "store123" is the store ID. Supported keys are: * colorFamilies * price * originalPrice * discount * variantId * inventory(place_id,price) * inventory(place_id,original_price) * inventory(place_id,attributes.key), where key is any key in the Product.local_inventories.attributes map. * attributes.key, where key is any key in the Product.attributes map. * pickupInStore.id, where id is any FulfillmentInfo.place_ids for FulfillmentInfo.type "pickup-in-store". * shipToStore.id, where id is any FulfillmentInfo.place_ids for FulfillmentInfo.type "ship-to-store". * sameDayDelivery.id, where id is any FulfillmentInfo.place_ids for FulfillmentInfo.type "same-day-delivery". * nextDayDelivery.id, where id is any FulfillmentInfo.place_ids for FulfillmentInfo.type "next-day-delivery". * customFulfillment1.id, where id is any FulfillmentInfo.place_ids for FulfillmentInfo.type "custom-type-1". * customFulfillment2.id, where id is any FulfillmentInfo.place_ids for FulfillmentInfo.type "custom-type-2". * customFulfillment3.id, where id is any FulfillmentInfo.place_ids for FulfillmentInfo.type "custom-type-3". * customFulfillment4.id, where id is any FulfillmentInfo.place_ids for FulfillmentInfo.type "custom-type-4". * customFulfillment5.id, where id is any FulfillmentInfo.place_ids for FulfillmentInfo.type "custom-type-5". If this field is set to an invalid value other than these, an INVALID_ARGUMENT error is returned. */
  variantRollupKeys?: Array<string>;
  /** Optional. The categories associated with a category page. Must be set for category navigation queries to achieve good search quality. The format should be the same as UserEvent.page_categories; To represent the full path of category, use '>' sign, with one space on each side, to separate different hierarchies. If '>' is part of the category name, replace it with other character(s). Category pages include special pages such as sales or promotions. For instance, a special sale page may have the category hierarchy: "pageCategories" : ["Sales > 2017 Black Friday Deals"]. */
  pageCategories?: Array<string>;
  /** The search mode of the search request. If not specified, a single search request triggers both product search and faceted search. */
  searchMode?: "SEARCH_MODE_UNSPECIFIED" | "PRODUCT_SEARCH_ONLY" | "FACETED_SEARCH_ONLY" | (string & {});
  /** The specification for personalization. Notice that if both ServingConfig.personalization_spec and SearchRequest.personalization_spec are set. SearchRequest.personalization_spec will override ServingConfig.personalization_spec. */
  personalizationSpec?: GoogleCloudRetailV2SearchRequestPersonalizationSpec;
  /** The labels applied to a resource must meet the following requirements: * Each resource can have multiple labels, up to a maximum of 64. * Each label must be a key-value pair. * Keys have a minimum length of 1 character and a maximum length of 63 characters and cannot be empty. Values can be empty and have a maximum length of 63 characters. * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. All characters must use UTF-8 encoding, and international characters are allowed. * The key portion of a label must be unique. However, you can use the same key with multiple resources. * Keys must start with a lowercase letter or international character. For more information, see [Requirements for labels](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements) in the Resource Manager documentation. */
  labels?: Record<string, string>;
  /** The spell correction specification that specifies the mode under which spell correction will take effect. */
  spellCorrectionSpec?: GoogleCloudRetailV2SearchRequestSpellCorrectionSpec;
  /** The entity for customers that may run multiple different entities, domains, sites or regions, for example, `Google US`, `Google Ads`, `Waymo`, `google.com`, `youtube.com`, etc. If this is set, it should be exactly matched with UserEvent.entity to get search results boosted by entity. */
  entity?: string;
  /** Optional. This field specifies all conversational related parameters addition to traditional retail search. */
  conversationalSearchSpec?: GoogleCloudRetailV2SearchRequestConversationalSearchSpec;
  /** Optional. This field specifies tile navigation related parameters. */
  tileNavigationSpec?: GoogleCloudRetailV2SearchRequestTileNavigationSpec;
  /** Optional. The BCP-47 language code, such as "en-US" or "sr-Latn" [list](https://www.unicode.org/cldr/charts/46/summary/root.html). For more information, see [Standardized codes](https://google.aip.dev/143). This field helps to better interpret the query. If a value isn't specified, the query language code is automatically detected, which may not be accurate. */
  languageCode?: string;
  /** Optional. The Unicode country/region code (CLDR) of a location, such as "US" and "419" [list](https://www.unicode.org/cldr/charts/46/supplemental/territory_information.html). For more information, see [Standardized codes](https://google.aip.dev/143). If set, then results will be boosted based on the region_code provided. */
  regionCode?: string;
  /** Optional. An id corresponding to a place, such as a store id or region id. When specified, we use the price from the local inventory with the matching product's LocalInventory.place_id for revenue optimization. Note, the currency of the local inventory's price must match the currency of the product's price. */
  placeId?: string;
  /** Optional. The user attributes that could be used for personalization of search results. * Populate at most 100 key-value pairs per query. * Only supports string keys and repeated string values. * Duplicate keys are not allowed within a single query. Example: user_attributes: [ { key: "pets" value { values: "dog" values: "cat" } }, { key: "state" value { values: "CA" } } ] */
  userAttributes?: Record<string, GoogleCloudRetailV2StringList>;
}

export const GoogleCloudRetailV2SearchRequest: Schema.Schema<GoogleCloudRetailV2SearchRequest> = Schema.suspend(() => Schema.Struct({
  branch: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
  visitorId: Schema.optional(Schema.String),
  userInfo: Schema.optional(GoogleCloudRetailV2UserInfo),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  offset: Schema.optional(Schema.Number),
  filter: Schema.optional(Schema.String),
  canonicalFilter: Schema.optional(Schema.String),
  orderBy: Schema.optional(Schema.String),
  facetSpecs: Schema.optional(Schema.Array(GoogleCloudRetailV2SearchRequestFacetSpec)),
  dynamicFacetSpec: Schema.optional(GoogleCloudRetailV2SearchRequestDynamicFacetSpec),
  boostSpec: Schema.optional(GoogleCloudRetailV2SearchRequestBoostSpec),
  queryExpansionSpec: Schema.optional(GoogleCloudRetailV2SearchRequestQueryExpansionSpec),
  variantRollupKeys: Schema.optional(Schema.Array(Schema.String)),
  pageCategories: Schema.optional(Schema.Array(Schema.String)),
  searchMode: Schema.optional(Schema.String),
  personalizationSpec: Schema.optional(GoogleCloudRetailV2SearchRequestPersonalizationSpec),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  spellCorrectionSpec: Schema.optional(GoogleCloudRetailV2SearchRequestSpellCorrectionSpec),
  entity: Schema.optional(Schema.String),
  conversationalSearchSpec: Schema.optional(GoogleCloudRetailV2SearchRequestConversationalSearchSpec),
  tileNavigationSpec: Schema.optional(GoogleCloudRetailV2SearchRequestTileNavigationSpec),
  languageCode: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  placeId: Schema.optional(Schema.String),
  userAttributes: Schema.optional(Schema.Record(Schema.String, GoogleCloudRetailV2StringList)),
})).annotate({ identifier: "GoogleCloudRetailV2SearchRequest" }) as any as Schema.Schema<GoogleCloudRetailV2SearchRequest>;

export interface GoogleCloudRetailV2CustomAttribute {
  /** The textual values of this custom attribute. For example, `["yellow", "green"]` when the key is "color". Empty string is not allowed. Otherwise, an INVALID_ARGUMENT error is returned. Exactly one of text or numbers should be set. Otherwise, an INVALID_ARGUMENT error is returned. */
  text?: Array<string>;
  /** The numerical values of this custom attribute. For example, `[2.3, 15.4]` when the key is "lengths_cm". Exactly one of text or numbers should be set. Otherwise, an INVALID_ARGUMENT error is returned. */
  numbers?: Array<number>;
  /** This field is normally ignored unless AttributesConfig.attribute_config_level of the Catalog is set to the deprecated 'PRODUCT_LEVEL_ATTRIBUTE_CONFIG' mode. For information about product-level attribute configuration, see [Configuration modes](https://cloud.google.com/retail/docs/attribute-config#config-modes). If true, custom attribute values are searchable by text queries in SearchService.Search. This field is ignored in a UserEvent. Only set if type text is set. Otherwise, a INVALID_ARGUMENT error is returned. */
  searchable?: boolean;
  /** This field is normally ignored unless AttributesConfig.attribute_config_level of the Catalog is set to the deprecated 'PRODUCT_LEVEL_ATTRIBUTE_CONFIG' mode. For information about product-level attribute configuration, see [Configuration modes](https://cloud.google.com/retail/docs/attribute-config#config-modes). If true, custom attribute values are indexed, so that they can be filtered, faceted or boosted in SearchService.Search. This field is ignored in a UserEvent. See SearchRequest.filter, SearchRequest.facet_specs and SearchRequest.boost_spec for more details. */
  indexable?: boolean;
}

export const GoogleCloudRetailV2CustomAttribute: Schema.Schema<GoogleCloudRetailV2CustomAttribute> = Schema.suspend(() => Schema.Struct({
  text: Schema.optional(Schema.Array(Schema.String)),
  numbers: Schema.optional(Schema.Array(Schema.Number)),
  searchable: Schema.optional(Schema.Boolean),
  indexable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2CustomAttribute" }) as any as Schema.Schema<GoogleCloudRetailV2CustomAttribute>;

export interface GoogleCloudRetailV2PriceInfoPriceRange {
  /** The inclusive Product.pricing_info.price interval of all variant Product having the same Product.primary_product_id. */
  price?: GoogleCloudRetailV2Interval;
  /** The inclusive Product.pricing_info.original_price internal of all variant Product having the same Product.primary_product_id. */
  originalPrice?: GoogleCloudRetailV2Interval;
}

export const GoogleCloudRetailV2PriceInfoPriceRange: Schema.Schema<GoogleCloudRetailV2PriceInfoPriceRange> = Schema.suspend(() => Schema.Struct({
  price: Schema.optional(GoogleCloudRetailV2Interval),
  originalPrice: Schema.optional(GoogleCloudRetailV2Interval),
})).annotate({ identifier: "GoogleCloudRetailV2PriceInfoPriceRange" }) as any as Schema.Schema<GoogleCloudRetailV2PriceInfoPriceRange>;

export interface GoogleCloudRetailV2PriceInfo {
  /** The 3-letter currency code defined in [ISO 4217](https://www.iso.org/iso-4217-currency-codes.html). If this field is an unrecognizable currency code, an INVALID_ARGUMENT error is returned. The Product.Type.VARIANT Products with the same Product.primary_product_id must share the same currency_code. Otherwise, a FAILED_PRECONDITION error is returned. */
  currencyCode?: string;
  /** Price of the product. Google Merchant Center property [price](https://support.google.com/merchants/answer/6324371). Schema.org property [Offer.price](https://schema.org/price). */
  price?: number;
  /** Price of the product without any discount. If zero, by default set to be the price. If set, original_price should be greater than or equal to price, otherwise an INVALID_ARGUMENT error is thrown. */
  originalPrice?: number;
  /** The costs associated with the sale of a particular product. Used for gross profit reporting. * Profit = price - cost Google Merchant Center property [cost_of_goods_sold](https://support.google.com/merchants/answer/9017895). */
  cost?: number;
  /** The timestamp when the price starts to be effective. This can be set as a future timestamp, and the price is only used for search after price_effective_time. If so, the original_price must be set and original_price is used before price_effective_time. Do not set if price is always effective because it will cause additional latency during search. */
  priceEffectiveTime?: string;
  /** The timestamp when the price stops to be effective. The price is used for search before price_expire_time. If this field is set, the original_price must be set and original_price is used after price_expire_time. Do not set if price is always effective because it will cause additional latency during search. */
  priceExpireTime?: string;
  /** Output only. The price range of all the child Product.Type.VARIANT Products grouped together on the Product.Type.PRIMARY Product. Only populated for Product.Type.PRIMARY Products. Note: This field is OUTPUT_ONLY for ProductService.GetProduct. Do not set this field in API requests. */
  priceRange?: GoogleCloudRetailV2PriceInfoPriceRange;
}

export const GoogleCloudRetailV2PriceInfo: Schema.Schema<GoogleCloudRetailV2PriceInfo> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
  price: Schema.optional(Schema.Number),
  originalPrice: Schema.optional(Schema.Number),
  cost: Schema.optional(Schema.Number),
  priceEffectiveTime: Schema.optional(Schema.String),
  priceExpireTime: Schema.optional(Schema.String),
  priceRange: Schema.optional(GoogleCloudRetailV2PriceInfoPriceRange),
})).annotate({ identifier: "GoogleCloudRetailV2PriceInfo" }) as any as Schema.Schema<GoogleCloudRetailV2PriceInfo>;

export interface GoogleCloudRetailV2Rating {
  /** The total number of ratings. This value is independent of the value of rating_histogram. This value must be nonnegative. Otherwise, an INVALID_ARGUMENT error is returned. */
  ratingCount?: number;
  /** The average rating of the Product. The rating is scaled at 1-5. Otherwise, an INVALID_ARGUMENT error is returned. */
  averageRating?: number;
  /** List of rating counts per rating value (index = rating - 1). The list is empty if there is no rating. If the list is non-empty, its size is always 5. Otherwise, an INVALID_ARGUMENT error is returned. For example, [41, 14, 13, 47, 303]. It means that the Product got 41 ratings with 1 star, 14 ratings with 2 star, and so on. */
  ratingHistogram?: Array<number>;
}

export const GoogleCloudRetailV2Rating: Schema.Schema<GoogleCloudRetailV2Rating> = Schema.suspend(() => Schema.Struct({
  ratingCount: Schema.optional(Schema.Number),
  averageRating: Schema.optional(Schema.Number),
  ratingHistogram: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudRetailV2Rating" }) as any as Schema.Schema<GoogleCloudRetailV2Rating>;

export interface GoogleCloudRetailV2FulfillmentInfo {
  /** The fulfillment type, including commonly used types (such as pickup in store and same day delivery), and custom types. Customers have to map custom types to their display names before rendering UI. Supported values: * "pickup-in-store" * "ship-to-store" * "same-day-delivery" * "next-day-delivery" * "custom-type-1" * "custom-type-2" * "custom-type-3" * "custom-type-4" * "custom-type-5" If this field is set to an invalid value other than these, an INVALID_ARGUMENT error is returned. */
  type?: string;
  /** The IDs for this type, such as the store IDs for FulfillmentInfo.type.pickup-in-store or the region IDs for FulfillmentInfo.type.same-day-delivery. A maximum of 3000 values are allowed. Each value must be a string with a length limit of 30 characters, matching the pattern `[a-zA-Z0-9_-]+`, such as "store1" or "REGION-2". Otherwise, an INVALID_ARGUMENT error is returned. */
  placeIds?: Array<string>;
}

export const GoogleCloudRetailV2FulfillmentInfo: Schema.Schema<GoogleCloudRetailV2FulfillmentInfo> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  placeIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2FulfillmentInfo" }) as any as Schema.Schema<GoogleCloudRetailV2FulfillmentInfo>;

export interface GoogleCloudRetailV2Image {
  /** Required. URI of the image. This field must be a valid UTF-8 encoded URI with a length limit of 5,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center property [image_link](https://support.google.com/merchants/answer/6324350). Schema.org property [Product.image](https://schema.org/image). */
  uri?: string;
  /** Height of the image in number of pixels. This field must be nonnegative. Otherwise, an INVALID_ARGUMENT error is returned. */
  height?: number;
  /** Width of the image in number of pixels. This field must be nonnegative. Otherwise, an INVALID_ARGUMENT error is returned. */
  width?: number;
}

export const GoogleCloudRetailV2Image: Schema.Schema<GoogleCloudRetailV2Image> = Schema.suspend(() => Schema.Struct({
  uri: Schema.optional(Schema.String),
  height: Schema.optional(Schema.Number),
  width: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRetailV2Image" }) as any as Schema.Schema<GoogleCloudRetailV2Image>;

export interface GoogleCloudRetailV2Audience {
  /** The genders of the audience. Strongly encouraged to use the standard values: "male", "female", "unisex". At most 5 values are allowed. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center property [gender](https://support.google.com/merchants/answer/6324479). Schema.org property [Product.audience.suggestedGender](https://schema.org/suggestedGender). */
  genders?: Array<string>;
  /** The age groups of the audience. Strongly encouraged to use the standard values: "newborn" (up to 3 months old), "infant" (3–12 months old), "toddler" (1–5 years old), "kids" (5–13 years old), "adult" (typically teens or older). At most 5 values are allowed. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center property [age_group](https://support.google.com/merchants/answer/6324463). Schema.org property [Product.audience.suggestedMinAge](https://schema.org/suggestedMinAge) and [Product.audience.suggestedMaxAge](https://schema.org/suggestedMaxAge). */
  ageGroups?: Array<string>;
}

export const GoogleCloudRetailV2Audience: Schema.Schema<GoogleCloudRetailV2Audience> = Schema.suspend(() => Schema.Struct({
  genders: Schema.optional(Schema.Array(Schema.String)),
  ageGroups: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2Audience" }) as any as Schema.Schema<GoogleCloudRetailV2Audience>;

export interface GoogleCloudRetailV2ColorInfo {
  /** The standard color families. Strongly recommended to use the following standard color groups: "Red", "Pink", "Orange", "Yellow", "Purple", "Green", "Cyan", "Blue", "Brown", "White", "Gray", "Black" and "Mixed". Normally it is expected to have only 1 color family. May consider using single "Mixed" instead of multiple values. A maximum of 5 values are allowed. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center property [color](https://support.google.com/merchants/answer/6324487). Schema.org property [Product.color](https://schema.org/color). The colorFamilies field as a system attribute is not a required field but strongly recommended to be specified. Google Search models treat this field as more important than a custom product attribute when specified. */
  colorFamilies?: Array<string>;
  /** The color display names, which may be different from standard color family names, such as the color aliases used in the website frontend. Normally it is expected to have only 1 color. May consider using single "Mixed" instead of multiple values. A maximum of 75 colors are allowed. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Google Merchant Center property [color](https://support.google.com/merchants/answer/6324487). Schema.org property [Product.color](https://schema.org/color). */
  colors?: Array<string>;
}

export const GoogleCloudRetailV2ColorInfo: Schema.Schema<GoogleCloudRetailV2ColorInfo> = Schema.suspend(() => Schema.Struct({
  colorFamilies: Schema.optional(Schema.Array(Schema.String)),
  colors: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2ColorInfo" }) as any as Schema.Schema<GoogleCloudRetailV2ColorInfo>;

export interface GoogleCloudRetailV2Promotion {
  /** Promotion identifier, which is the final component of name. For example, this field is "free_gift", if name is `projects/* /locations/global/catalogs/default_catalog/promotions/free_gift`. The value must be a UTF-8 encoded string with a length limit of 128 characters, and match the pattern: `a-zA-Z*`. For example, id0LikeThis or ID_1_LIKE_THIS. Otherwise, an INVALID_ARGUMENT error is returned. Corresponds to Google Merchant Center property [promotion_id](https://support.google.com/merchants/answer/7050148). */
  promotionId?: string;
}

export const GoogleCloudRetailV2Promotion: Schema.Schema<GoogleCloudRetailV2Promotion> = Schema.suspend(() => Schema.Struct({
  promotionId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2Promotion" }) as any as Schema.Schema<GoogleCloudRetailV2Promotion>;

export interface GoogleCloudRetailV2LocalInventory {
  /** Optional. The place ID for the current set of inventory information. */
  placeId?: string;
  /** Optional. Product price and cost information. Google Merchant Center property [price](https://support.google.com/merchants/answer/6324371). */
  priceInfo?: GoogleCloudRetailV2PriceInfo;
  /** Optional. Additional local inventory attributes, for example, store name, promotion tags, etc. This field needs to pass all below criteria, otherwise an INVALID_ARGUMENT error is returned: * At most 30 attributes are allowed. * The key must be a UTF-8 encoded string with a length limit of 32 characters. * The key must match the pattern: `a-zA-Z0-9*`. For example, key0LikeThis or KEY_1_LIKE_THIS. * The attribute values must be of the same type (text or number). * Only 1 value is allowed for each attribute. * For text values, the length limit is 256 UTF-8 characters. * The attribute does not support search. The `searchable` field should be unset or set to false. * The max summed total bytes of custom attribute keys and values per product is 5MiB. */
  attributes?: Record<string, GoogleCloudRetailV2CustomAttribute>;
  /** Optional. Supported fulfillment types. Valid fulfillment type values include commonly used types (such as pickup in store and same day delivery), and custom types. Customers have to map custom types to their display names before rendering UI. Supported values: * "pickup-in-store" * "ship-to-store" * "same-day-delivery" * "next-day-delivery" * "custom-type-1" * "custom-type-2" * "custom-type-3" * "custom-type-4" * "custom-type-5" If this field is set to an invalid value other than these, an INVALID_ARGUMENT error is returned. All the elements must be distinct. Otherwise, an INVALID_ARGUMENT error is returned. */
  fulfillmentTypes?: Array<string>;
}

export const GoogleCloudRetailV2LocalInventory: Schema.Schema<GoogleCloudRetailV2LocalInventory> = Schema.suspend(() => Schema.Struct({
  placeId: Schema.optional(Schema.String),
  priceInfo: Schema.optional(GoogleCloudRetailV2PriceInfo),
  attributes: Schema.optional(Schema.Record(Schema.String, GoogleCloudRetailV2CustomAttribute)),
  fulfillmentTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2LocalInventory" }) as any as Schema.Schema<GoogleCloudRetailV2LocalInventory>;

export interface GoogleCloudRetailV2Product {
  /** Note that this field is applied in the following ways: * If the Product is already expired when it is uploaded, this product is not indexed for search. * If the Product is not expired when it is uploaded, only the Type.PRIMARY's and Type.COLLECTION's expireTime is respected, and Type.VARIANT's expireTime is not used. In general, we suggest the users to delete the stale products explicitly, instead of using this field to determine staleness. expire_time must be later than available_time and publish_time, otherwise an INVALID_ARGUMENT error is thrown. Corresponding properties: Google Merchant Center property [expiration_date](https://support.google.com/merchants/answer/6324499). */
  expireTime?: string;
  /** Input only. The TTL (time to live) of the product. Note that this is only applicable to Type.PRIMARY and Type.COLLECTION, and ignored for Type.VARIANT. In general, we suggest the users to delete the stale products explicitly, instead of using this field to determine staleness. If it is set, it must be a non-negative value, and expire_time is set as current timestamp plus ttl. The derived expire_time is returned in the output and ttl is left blank when retrieving the Product. If it is set, the product is not available for SearchService.Search after current timestamp plus ttl. However, the product can still be retrieved by ProductService.GetProduct and ProductService.ListProducts. */
  ttl?: string;
  /** Immutable. Full resource name of the product, such as `projects/* /locations/global/catalogs/default_catalog/branches/default_branch/products/product_id`. */
  name?: string;
  /** Immutable. Product identifier, which is the final component of name. For example, this field is "id_1", if name is `projects/* /locations/global/catalogs/default_catalog/branches/default_branch/products/id_1`. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [id](https://support.google.com/merchants/answer/6324405). Schema.org property [Product.sku](https://schema.org/sku). */
  id?: string;
  /** Immutable. The type of the product. Default to Catalog.product_level_config.ingestion_product_type if unset. */
  type?: "TYPE_UNSPECIFIED" | "PRIMARY" | "VARIANT" | "COLLECTION" | (string & {});
  /** Variant group identifier. Must be an id, with the same parent branch with this product. Otherwise, an error is thrown. For Type.PRIMARY Products, this field can only be empty or set to the same value as id. For VARIANT Products, this field cannot be empty. A maximum of 2,000 products are allowed to share the same Type.PRIMARY Product. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [item_group_id](https://support.google.com/merchants/answer/6324507). Schema.org property [Product.inProductGroupWithID](https://schema.org/inProductGroupWithID). */
  primaryProductId?: string;
  /** The id of the collection members when type is Type.COLLECTION. Non-existent product ids are allowed. The type of the members must be either Type.PRIMARY or Type.VARIANT otherwise an INVALID_ARGUMENT error is thrown. Should not set it for other types. A maximum of 1000 values are allowed. Otherwise, an INVALID_ARGUMENT error is return. */
  collectionMemberIds?: Array<string>;
  /** The Global Trade Item Number (GTIN) of the product. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. This field must be a Unigram. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [gtin](https://support.google.com/merchants/answer/6324461). Schema.org property [Product.isbn](https://schema.org/isbn), [Product.gtin8](https://schema.org/gtin8), [Product.gtin12](https://schema.org/gtin12), [Product.gtin13](https://schema.org/gtin13), or [Product.gtin14](https://schema.org/gtin14). If the value is not a valid GTIN, an INVALID_ARGUMENT error is returned. */
  gtin?: string;
  /** Optional. Product categories. This field is repeated for supporting one product belonging to several parallel categories. Strongly recommended using the full path for better search / recommendation quality. To represent the full path of category, use the '>' sign, with one space on each side, to separate different hierarchies. If '>' is part of the category name, replace it with other character(s). For example, if a shoes product belongs to both ["Shoes & Accessories" -> "Shoes"] and ["Sports & Fitness" -> "Athletic Clothing" -> "Shoes"], it could be represented as: "categories": [ "Shoes & Accessories > Shoes", "Sports & Fitness > Athletic Clothing > Shoes" ] Must be set for Type.PRIMARY Product otherwise an INVALID_ARGUMENT error is returned. At most 250 values are allowed per Product unless overridden through the Google Cloud console. Empty values are not allowed. Each value must be a UTF-8 encoded string with a length limit of 5,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property google_product_category. Schema.org property [Product.category] (https://schema.org/category). [mc_google_product_category]: https://support.google.com/merchants/answer/6324436 */
  categories?: Array<string>;
  /** Required. Product title. This field must be a UTF-8 encoded string with a length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [title](https://support.google.com/merchants/answer/6324415). Schema.org property [Product.name](https://schema.org/name). */
  title?: string;
  /** The brands of the product. A maximum of 30 brands are allowed unless overridden through the Google Cloud console. Each brand must be a UTF-8 encoded string with a length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [brand](https://support.google.com/merchants/answer/6324351). Schema.org property [Product.brand](https://schema.org/brand). */
  brands?: Array<string>;
  /** Product description. This field must be a UTF-8 encoded string with a length limit of 5,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [description](https://support.google.com/merchants/answer/6324468). Schema.org property [Product.description](https://schema.org/description). */
  description?: string;
  /** Language of the title/description and other string attributes. Use language tags defined by [BCP 47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). For product prediction, this field is ignored and the model automatically detects the text language. The Product can include text in different languages, but duplicating Products to provide text in multiple languages can result in degraded model performance. For product search this field is in use. It defaults to "en-US" if unset. */
  languageCode?: string;
  /** Highly encouraged. Extra product attributes to be included. For example, for products, this could include the store name, vendor, style, color, etc. These are very strong signals for recommendation model, thus we highly recommend providing the attributes here. Features that can take on one of a limited number of possible values. Two types of features can be set are: Textual features. some examples would be the brand/maker of a product, or country of a customer. Numerical features. Some examples would be the height/weight of a product, or age of a customer. For example: `{ "vendor": {"text": ["vendor123", "vendor456"]}, "lengths_cm": {"numbers":[2.3, 15.4]}, "heights_cm": {"numbers":[8.1, 6.4]} }`. This field needs to pass all below criteria, otherwise an INVALID_ARGUMENT error is returned: * Max entries count: 200. * The key must be a UTF-8 encoded string with a length limit of 128 characters. * For indexable attribute, the key must match the pattern: `a-zA-Z0-9*`. For example, `key0LikeThis` or `KEY_1_LIKE_THIS`. * For text attributes, at most 400 values are allowed. Empty values are not allowed. Each value must be a non-empty UTF-8 encoded string with a length limit of 256 characters. * For number attributes, at most 400 values are allowed. */
  attributes?: Record<string, GoogleCloudRetailV2CustomAttribute>;
  /** Custom tags associated with the product. At most 250 values are allowed per Product. This value must be a UTF-8 encoded string with a length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. This tag can be used for filtering recommendation results by passing the tag as part of the PredictRequest.filter. Corresponding properties: Google Merchant Center property [custom_label_0–4](https://support.google.com/merchants/answer/6324473). */
  tags?: Array<string>;
  /** Product price and cost information. Corresponding properties: Google Merchant Center property [price](https://support.google.com/merchants/answer/6324371). */
  priceInfo?: GoogleCloudRetailV2PriceInfo;
  /** The rating of this product. */
  rating?: GoogleCloudRetailV2Rating;
  /** The timestamp when this Product becomes available for SearchService.Search. Note that this is only applicable to Type.PRIMARY and Type.COLLECTION, and ignored for Type.VARIANT. */
  availableTime?: string;
  /** The online availability of the Product. Default to Availability.IN_STOCK. For primary products with variants set the availability of the primary as Availability.OUT_OF_STOCK and set the true availability at the variant level. This way the primary product will be considered "in stock" as long as it has at least one variant in stock. For primary products with no variants set the true availability at the primary level. Corresponding properties: Google Merchant Center property [availability](https://support.google.com/merchants/answer/6324448). Schema.org property [Offer.availability](https://schema.org/availability). */
  availability?: "AVAILABILITY_UNSPECIFIED" | "IN_STOCK" | "OUT_OF_STOCK" | "PREORDER" | "BACKORDER" | (string & {});
  /** The available quantity of the item. */
  availableQuantity?: number;
  /** Fulfillment information, such as the store IDs for in-store pickup or region IDs for different shipping methods. All the elements must have distinct FulfillmentInfo.type. Otherwise, an INVALID_ARGUMENT error is returned. */
  fulfillmentInfo?: Array<GoogleCloudRetailV2FulfillmentInfo>;
  /** Canonical URL directly linking to the product detail page. It is strongly recommended to provide a valid uri for the product, otherwise the service performance could be significantly degraded. This field must be a UTF-8 encoded string with a length limit of 5,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [link](https://support.google.com/merchants/answer/6324416). Schema.org property [Offer.url](https://schema.org/url). */
  uri?: string;
  /** Product images for the product. We highly recommend putting the main image first. A maximum of 300 images are allowed. Corresponding properties: Google Merchant Center property [image_link](https://support.google.com/merchants/answer/6324350). Schema.org property [Product.image](https://schema.org/image). */
  images?: Array<GoogleCloudRetailV2Image>;
  /** The target group associated with a given audience (e.g. male, veterans, car owners, musicians, etc.) of the product. */
  audience?: GoogleCloudRetailV2Audience;
  /** The color of the product. Corresponding properties: Google Merchant Center property [color](https://support.google.com/merchants/answer/6324487). Schema.org property [Product.color](https://schema.org/color). */
  colorInfo?: GoogleCloudRetailV2ColorInfo;
  /** The size of the product. To represent different size systems or size types, consider using this format: [[[size_system:]size_type:]size_value]. For example, in "US:MENS:M", "US" represents size system; "MENS" represents size type; "M" represents size value. In "GIRLS:27", size system is empty; "GIRLS" represents size type; "27" represents size value. In "32 inches", both size system and size type are empty, while size value is "32 inches". A maximum of 20 values are allowed per Product. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [size](https://support.google.com/merchants/answer/6324492), [size_type](https://support.google.com/merchants/answer/6324497), and [size_system](https://support.google.com/merchants/answer/6324502). Schema.org property [Product.size](https://schema.org/size). */
  sizes?: Array<string>;
  /** The material of the product. For example, "leather", "wooden". A maximum of 20 values are allowed. Each value must be a UTF-8 encoded string with a length limit of 200 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [material](https://support.google.com/merchants/answer/6324410). Schema.org property [Product.material](https://schema.org/material). */
  materials?: Array<string>;
  /** The pattern or graphic print of the product. For example, "striped", "polka dot", "paisley". A maximum of 20 values are allowed per Product. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [pattern](https://support.google.com/merchants/answer/6324483). Schema.org property [Product.pattern](https://schema.org/pattern). */
  patterns?: Array<string>;
  /** The condition of the product. Strongly encouraged to use the standard values: "new", "refurbished", "used". A maximum of 1 value is allowed per Product. Each value must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. Corresponding properties: Google Merchant Center property [condition](https://support.google.com/merchants/answer/6324469). Schema.org property [Offer.itemCondition](https://schema.org/itemCondition). */
  conditions?: Array<string>;
  /** The promotions applied to the product. A maximum of 10 values are allowed per Product. Only Promotion.promotion_id will be used, other fields will be ignored if set. */
  promotions?: Array<GoogleCloudRetailV2Promotion>;
  /** The timestamp when the product is published by the retailer for the first time, which indicates the freshness of the products. Note that this field is different from available_time, given it purely describes product freshness regardless of when it is available on search and recommendation. */
  publishTime?: string;
  /** Indicates which fields in the Products are returned in SearchResponse. Supported fields for all types: * audience * availability * brands * color_info * conditions * gtin * materials * name * patterns * price_info * rating * sizes * title * uri Supported fields only for Type.PRIMARY and Type.COLLECTION: * categories * description * images Supported fields only for Type.VARIANT: * Only the first image in images To mark attributes as retrievable, include paths of the form "attributes.key" where "key" is the key of a custom attribute, as specified in attributes. For Type.PRIMARY and Type.COLLECTION, the following fields are always returned in SearchResponse by default: * name For Type.VARIANT, the following fields are always returned in by default: * name * color_info Note: Returning more fields in SearchResponse can increase response payload size and serving latency. This field is deprecated. Use the retrievable site-wide control instead. */
  retrievableFields?: string;
  /** Output only. Product variants grouped together on primary product which share similar product attributes. It's automatically grouped by primary_product_id for all the product variants. Only populated for Type.PRIMARY Products. Note: This field is OUTPUT_ONLY for ProductService.GetProduct. Do not set this field in API requests. */
  variants?: Array<GoogleCloudRetailV2Product>;
  /** Output only. A list of local inventories specific to different places. This field can be managed by ProductService.AddLocalInventories and ProductService.RemoveLocalInventories APIs if fine-grained, high-volume updates are necessary. */
  localInventories?: Array<GoogleCloudRetailV2LocalInventory>;
}

export const GoogleCloudRetailV2Product: Schema.Schema<GoogleCloudRetailV2Product> = Schema.suspend(() => Schema.Struct({
  expireTime: Schema.optional(Schema.String),
  ttl: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  primaryProductId: Schema.optional(Schema.String),
  collectionMemberIds: Schema.optional(Schema.Array(Schema.String)),
  gtin: Schema.optional(Schema.String),
  categories: Schema.optional(Schema.Array(Schema.String)),
  title: Schema.optional(Schema.String),
  brands: Schema.optional(Schema.Array(Schema.String)),
  description: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  attributes: Schema.optional(Schema.Record(Schema.String, GoogleCloudRetailV2CustomAttribute)),
  tags: Schema.optional(Schema.Array(Schema.String)),
  priceInfo: Schema.optional(GoogleCloudRetailV2PriceInfo),
  rating: Schema.optional(GoogleCloudRetailV2Rating),
  availableTime: Schema.optional(Schema.String),
  availability: Schema.optional(Schema.String),
  availableQuantity: Schema.optional(Schema.Number),
  fulfillmentInfo: Schema.optional(Schema.Array(GoogleCloudRetailV2FulfillmentInfo)),
  uri: Schema.optional(Schema.String),
  images: Schema.optional(Schema.Array(GoogleCloudRetailV2Image)),
  audience: Schema.optional(GoogleCloudRetailV2Audience),
  colorInfo: Schema.optional(GoogleCloudRetailV2ColorInfo),
  sizes: Schema.optional(Schema.Array(Schema.String)),
  materials: Schema.optional(Schema.Array(Schema.String)),
  patterns: Schema.optional(Schema.Array(Schema.String)),
  conditions: Schema.optional(Schema.Array(Schema.String)),
  promotions: Schema.optional(Schema.Array(GoogleCloudRetailV2Promotion)),
  publishTime: Schema.optional(Schema.String),
  retrievableFields: Schema.optional(Schema.String),
  variants: Schema.optional(Schema.Array(GoogleCloudRetailV2Product)),
  localInventories: Schema.optional(Schema.Array(GoogleCloudRetailV2LocalInventory)),
})).annotate({ identifier: "GoogleCloudRetailV2Product" }) as any as Schema.Schema<GoogleCloudRetailV2Product>;

export interface GoogleCloudRetailV2DoubleList {
  /** The list of double values. */
  values?: Array<number>;
}

export const GoogleCloudRetailV2DoubleList: Schema.Schema<GoogleCloudRetailV2DoubleList> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(Schema.Number)),
})).annotate({ identifier: "GoogleCloudRetailV2DoubleList" }) as any as Schema.Schema<GoogleCloudRetailV2DoubleList>;

export interface GoogleCloudRetailV2SearchResponseSearchResult {
  /** Product.id of the searched Product. */
  id?: string;
  /** The product data snippet in the search response. Only Product.name is guaranteed to be populated. Product.variants contains the product variants that match the search query. If there are multiple product variants matching the query, top 5 most relevant product variants are returned and ordered by relevancy. If relevancy can be deternmined, use matching_variant_fields to look up matched product variants fields. If relevancy cannot be determined, e.g. when searching "shoe" all products in a shoe product can be a match, 5 product variants are returned but order is meaningless. */
  product?: GoogleCloudRetailV2Product;
  /** The count of matched variant Products. */
  matchingVariantCount?: number;
  /** If a variant Product matches the search query, this map indicates which Product fields are matched. The key is the Product.name, the value is a field mask of the matched Product fields. If matched attributes cannot be determined, this map will be empty. For example, a key "sku1" with field mask "products.color_info" indicates there is a match between "sku1" ColorInfo and the query. */
  matchingVariantFields?: Record<string, string>;
  /** The rollup matching variant Product attributes. The key is one of the SearchRequest.variant_rollup_keys. The values are the merged and de-duplicated Product attributes. Notice that the rollup values are respect filter. For example, when filtering by "colorFamilies:ANY(\"red\")" and rollup "colorFamilies", only "red" is returned. For textual and numerical attributes, the rollup values is a list of string or double values with type google.protobuf.ListValue. For example, if there are two variants with colors "red" and "blue", the rollup values are { key: "colorFamilies" value { list_value { values { string_value: "red" } values { string_value: "blue" } } } } For FulfillmentInfo, the rollup values is a double value with type google.protobuf.Value. For example, `{key: "pickupInStore.store1" value { number_value: 10 }}` means a there are 10 variants in this product are available in the store "store1". */
  variantRollupValues?: Record<string, unknown>;
  /** Specifies previous events related to this product for this user based on UserEvent with same SearchRequest.visitor_id or UserInfo.user_id. This is set only when SearchRequest.PersonalizationSpec.mode is SearchRequest.PersonalizationSpec.Mode.AUTO. Possible values: * `purchased`: Indicates that this product has been purchased before. */
  personalLabels?: Array<string>;
  /** Google provided available scores. */
  modelScores?: Record<string, GoogleCloudRetailV2DoubleList>;
}

export const GoogleCloudRetailV2SearchResponseSearchResult: Schema.Schema<GoogleCloudRetailV2SearchResponseSearchResult> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  product: Schema.optional(GoogleCloudRetailV2Product),
  matchingVariantCount: Schema.optional(Schema.Number),
  matchingVariantFields: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  variantRollupValues: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  personalLabels: Schema.optional(Schema.Array(Schema.String)),
  modelScores: Schema.optional(Schema.Record(Schema.String, GoogleCloudRetailV2DoubleList)),
})).annotate({ identifier: "GoogleCloudRetailV2SearchResponseSearchResult" }) as any as Schema.Schema<GoogleCloudRetailV2SearchResponseSearchResult>;

export interface GoogleCloudRetailV2SearchResponseFacetFacetValue {
  /** Text value of a facet, such as "Black" for facet "colorFamilies". */
  value?: string;
  /** Interval value for a facet, such as [10, 20) for facet "price". */
  interval?: GoogleCloudRetailV2Interval;
  /** Number of items that have this facet value. */
  count?: string;
  /** The minimum value in the FacetValue.interval. Only supported on numerical facets and returned if SearchRequest.FacetSpec.FacetKey.return_min_max is true. */
  minValue?: number;
  /** The maximum value in the FacetValue.interval. Only supported on numerical facets and returned if SearchRequest.FacetSpec.FacetKey.return_min_max is true. */
  maxValue?: number;
}

export const GoogleCloudRetailV2SearchResponseFacetFacetValue: Schema.Schema<GoogleCloudRetailV2SearchResponseFacetFacetValue> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  interval: Schema.optional(GoogleCloudRetailV2Interval),
  count: Schema.optional(Schema.String),
  minValue: Schema.optional(Schema.Number),
  maxValue: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRetailV2SearchResponseFacetFacetValue" }) as any as Schema.Schema<GoogleCloudRetailV2SearchResponseFacetFacetValue>;

export interface GoogleCloudRetailV2SearchResponseFacet {
  /** The key for this facet. E.g., "colorFamilies" or "price" or "attributes.attr1". */
  key?: string;
  /** The facet values for this field. */
  values?: Array<GoogleCloudRetailV2SearchResponseFacetFacetValue>;
  /** Whether the facet is dynamically generated. */
  dynamicFacet?: boolean;
}

export const GoogleCloudRetailV2SearchResponseFacet: Schema.Schema<GoogleCloudRetailV2SearchResponseFacet> = Schema.suspend(() => Schema.Struct({
  key: Schema.optional(Schema.String),
  values: Schema.optional(Schema.Array(GoogleCloudRetailV2SearchResponseFacetFacetValue)),
  dynamicFacet: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2SearchResponseFacet" }) as any as Schema.Schema<GoogleCloudRetailV2SearchResponseFacet>;

export interface GoogleCloudRetailV2SearchResponseQueryExpansionInfo {
  /** Bool describing whether query expansion has occurred. */
  expandedQuery?: boolean;
  /** Number of pinned results. This field will only be set when expansion happens and SearchRequest.QueryExpansionSpec.pin_unexpanded_results is set to true. */
  pinnedResultCount?: string;
}

export const GoogleCloudRetailV2SearchResponseQueryExpansionInfo: Schema.Schema<GoogleCloudRetailV2SearchResponseQueryExpansionInfo> = Schema.suspend(() => Schema.Struct({
  expandedQuery: Schema.optional(Schema.Boolean),
  pinnedResultCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2SearchResponseQueryExpansionInfo" }) as any as Schema.Schema<GoogleCloudRetailV2SearchResponseQueryExpansionInfo>;

export interface GoogleCloudRetailV2PinControlMetadataProductPins {
  /** List of product ids which have associated pins. */
  productId?: Array<string>;
}

export const GoogleCloudRetailV2PinControlMetadataProductPins: Schema.Schema<GoogleCloudRetailV2PinControlMetadataProductPins> = Schema.suspend(() => Schema.Struct({
  productId: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2PinControlMetadataProductPins" }) as any as Schema.Schema<GoogleCloudRetailV2PinControlMetadataProductPins>;

export interface GoogleCloudRetailV2PinControlMetadata {
  /** Map of all matched pins, keyed by pin position. */
  allMatchedPins?: Record<string, GoogleCloudRetailV2PinControlMetadataProductPins>;
  /** Map of pins that were dropped due to overlap with other matching pins, keyed by pin position. */
  droppedPins?: Record<string, GoogleCloudRetailV2PinControlMetadataProductPins>;
}

export const GoogleCloudRetailV2PinControlMetadata: Schema.Schema<GoogleCloudRetailV2PinControlMetadata> = Schema.suspend(() => Schema.Struct({
  allMatchedPins: Schema.optional(Schema.Record(Schema.String, GoogleCloudRetailV2PinControlMetadataProductPins)),
  droppedPins: Schema.optional(Schema.Record(Schema.String, GoogleCloudRetailV2PinControlMetadataProductPins)),
})).annotate({ identifier: "GoogleCloudRetailV2PinControlMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2PinControlMetadata>;

export interface GoogleCloudRetailV2ExperimentInfoServingConfigExperiment {
  /** The fully qualified resource name of the original SearchRequest.placement in the search request prior to reassignment by experiment API. For example: `projects/* /locations/* /catalogs/* /servingConfigs/*`. */
  originalServingConfig?: string;
  /** The fully qualified resource name of the serving config `Experiment.VariantArm.serving_config_id` responsible for generating the search response. For example: `projects/* /locations/* /catalogs/* /servingConfigs/*`. */
  experimentServingConfig?: string;
}

export const GoogleCloudRetailV2ExperimentInfoServingConfigExperiment: Schema.Schema<GoogleCloudRetailV2ExperimentInfoServingConfigExperiment> = Schema.suspend(() => Schema.Struct({
  originalServingConfig: Schema.optional(Schema.String),
  experimentServingConfig: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ExperimentInfoServingConfigExperiment" }) as any as Schema.Schema<GoogleCloudRetailV2ExperimentInfoServingConfigExperiment>;

export interface GoogleCloudRetailV2ExperimentInfo {
  /** A/B test between existing Cloud Retail Search ServingConfigs. */
  servingConfigExperiment?: GoogleCloudRetailV2ExperimentInfoServingConfigExperiment;
  /** The fully qualified resource name of the experiment that provides the serving config under test, should an active experiment exist. For example: `projects/* /locations/global/catalogs/default_catalog/experiments/experiment_id` */
  experiment?: string;
}

export const GoogleCloudRetailV2ExperimentInfo: Schema.Schema<GoogleCloudRetailV2ExperimentInfo> = Schema.suspend(() => Schema.Struct({
  servingConfigExperiment: Schema.optional(GoogleCloudRetailV2ExperimentInfoServingConfigExperiment),
  experiment: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ExperimentInfo" }) as any as Schema.Schema<GoogleCloudRetailV2ExperimentInfo>;

export interface GoogleCloudRetailV2SearchResponseConversationalSearchResultAdditionalFilter {
  /** Product attribute value, including an attribute key and an attribute value. Other types can be added here in the future. */
  productAttributeValue?: GoogleCloudRetailV2ProductAttributeValue;
}

export const GoogleCloudRetailV2SearchResponseConversationalSearchResultAdditionalFilter: Schema.Schema<GoogleCloudRetailV2SearchResponseConversationalSearchResultAdditionalFilter> = Schema.suspend(() => Schema.Struct({
  productAttributeValue: Schema.optional(GoogleCloudRetailV2ProductAttributeValue),
})).annotate({ identifier: "GoogleCloudRetailV2SearchResponseConversationalSearchResultAdditionalFilter" }) as any as Schema.Schema<GoogleCloudRetailV2SearchResponseConversationalSearchResultAdditionalFilter>;

export interface GoogleCloudRetailV2SearchResponseConversationalSearchResultSuggestedAnswer {
  /** Product attribute value, including an attribute key and an attribute value. Other types can be added here in the future. */
  productAttributeValue?: GoogleCloudRetailV2ProductAttributeValue;
}

export const GoogleCloudRetailV2SearchResponseConversationalSearchResultSuggestedAnswer: Schema.Schema<GoogleCloudRetailV2SearchResponseConversationalSearchResultSuggestedAnswer> = Schema.suspend(() => Schema.Struct({
  productAttributeValue: Schema.optional(GoogleCloudRetailV2ProductAttributeValue),
})).annotate({ identifier: "GoogleCloudRetailV2SearchResponseConversationalSearchResultSuggestedAnswer" }) as any as Schema.Schema<GoogleCloudRetailV2SearchResponseConversationalSearchResultSuggestedAnswer>;

export interface GoogleCloudRetailV2SearchResponseConversationalSearchResult {
  /** Conversation UUID. This field will be stored in client side storage to maintain the conversation session with server and will be used for next search request's SearchRequest.ConversationalSearchSpec.conversation_id to restore conversation state in server. */
  conversationId?: string;
  /** The current refined query for the conversational search. This field will be used in customer UI that the query in the search bar should be replaced with the refined query. For example, if SearchRequest.query is `dress` and next SearchRequest.ConversationalSearchSpec.UserAnswer.text_answer is `red color`, which does not match any product attribute value filters, the refined query will be `dress, red color`. */
  refinedQuery?: string;
  /** This field is deprecated but will be kept for backward compatibility. There is expected to have only one additional filter and the value will be the same to the same as field `additional_filter`. */
  additionalFilters?: Array<GoogleCloudRetailV2SearchResponseConversationalSearchResultAdditionalFilter>;
  /** The follow-up question. e.g., `What is the color?` */
  followupQuestion?: string;
  /** The answer options provided to client for the follow-up question. */
  suggestedAnswers?: Array<GoogleCloudRetailV2SearchResponseConversationalSearchResultSuggestedAnswer>;
  /** This is the incremental additional filters implied from the current user answer. User should add the suggested addition filters to the previous SearchRequest.filter, and use the merged filter in the follow up search request. */
  additionalFilter?: GoogleCloudRetailV2SearchResponseConversationalSearchResultAdditionalFilter;
}

export const GoogleCloudRetailV2SearchResponseConversationalSearchResult: Schema.Schema<GoogleCloudRetailV2SearchResponseConversationalSearchResult> = Schema.suspend(() => Schema.Struct({
  conversationId: Schema.optional(Schema.String),
  refinedQuery: Schema.optional(Schema.String),
  additionalFilters: Schema.optional(Schema.Array(GoogleCloudRetailV2SearchResponseConversationalSearchResultAdditionalFilter)),
  followupQuestion: Schema.optional(Schema.String),
  suggestedAnswers: Schema.optional(Schema.Array(GoogleCloudRetailV2SearchResponseConversationalSearchResultSuggestedAnswer)),
  additionalFilter: Schema.optional(GoogleCloudRetailV2SearchResponseConversationalSearchResultAdditionalFilter),
})).annotate({ identifier: "GoogleCloudRetailV2SearchResponseConversationalSearchResult" }) as any as Schema.Schema<GoogleCloudRetailV2SearchResponseConversationalSearchResult>;

export interface GoogleCloudRetailV2SearchResponseTileNavigationResult {
  /** The current tiles that are used for tile navigation, sorted by engagement. */
  tiles?: Array<GoogleCloudRetailV2Tile>;
}

export const GoogleCloudRetailV2SearchResponseTileNavigationResult: Schema.Schema<GoogleCloudRetailV2SearchResponseTileNavigationResult> = Schema.suspend(() => Schema.Struct({
  tiles: Schema.optional(Schema.Array(GoogleCloudRetailV2Tile)),
})).annotate({ identifier: "GoogleCloudRetailV2SearchResponseTileNavigationResult" }) as any as Schema.Schema<GoogleCloudRetailV2SearchResponseTileNavigationResult>;

export interface GoogleCloudRetailV2SearchResponse {
  /** A list of matched items. The order represents the ranking. */
  results?: Array<GoogleCloudRetailV2SearchResponseSearchResult>;
  /** Results of facets requested by user. */
  facets?: Array<GoogleCloudRetailV2SearchResponseFacet>;
  /** The estimated total count of matched items irrespective of pagination. The count of results returned by pagination may be less than the total_size that matches. */
  totalSize?: number;
  /** Contains the spell corrected query, if found. If the spell correction type is AUTOMATIC, then the search results are based on corrected_query. Otherwise the original query is used for search. */
  correctedQuery?: string;
  /** A unique search token. This should be included in the UserEvent logs resulting from this search, which enables accurate attribution of search model performance. */
  attributionToken?: string;
  /** A token that can be sent as SearchRequest.page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
  /** Query expansion information for the returned results. */
  queryExpansionInfo?: GoogleCloudRetailV2SearchResponseQueryExpansionInfo;
  /** The URI of a customer-defined redirect page. If redirect action is triggered, no search is performed, and only redirect_uri and attribution_token are set in the response. */
  redirectUri?: string;
  /** The fully qualified resource name of applied [controls](https://cloud.google.com/retail/docs/serving-control-rules). */
  appliedControls?: Array<string>;
  /** Metadata for pin controls which were applicable to the request. This contains two map fields, one for all matched pins and one for pins which were matched but not applied. The two maps are keyed by pin position, and the values are the product ids which were matched to that pin. */
  pinControlMetadata?: GoogleCloudRetailV2PinControlMetadata;
  /** The invalid SearchRequest.BoostSpec.condition_boost_specs that are not applied during serving. */
  invalidConditionBoostSpecs?: Array<GoogleCloudRetailV2SearchRequestBoostSpecConditionBoostSpec>;
  /** Metadata related to A/B testing experiment associated with this response. Only exists when an experiment is triggered. */
  experimentInfo?: Array<GoogleCloudRetailV2ExperimentInfo>;
  /** This field specifies all related information that is needed on client side for UI rendering of conversational retail search. */
  conversationalSearchResult?: GoogleCloudRetailV2SearchResponseConversationalSearchResult;
  /** This field specifies all related information for tile navigation that will be used in client side. */
  tileNavigationResult?: GoogleCloudRetailV2SearchResponseTileNavigationResult;
}

export const GoogleCloudRetailV2SearchResponse: Schema.Schema<GoogleCloudRetailV2SearchResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(GoogleCloudRetailV2SearchResponseSearchResult)),
  facets: Schema.optional(Schema.Array(GoogleCloudRetailV2SearchResponseFacet)),
  totalSize: Schema.optional(Schema.Number),
  correctedQuery: Schema.optional(Schema.String),
  attributionToken: Schema.optional(Schema.String),
  nextPageToken: Schema.optional(Schema.String),
  queryExpansionInfo: Schema.optional(GoogleCloudRetailV2SearchResponseQueryExpansionInfo),
  redirectUri: Schema.optional(Schema.String),
  appliedControls: Schema.optional(Schema.Array(Schema.String)),
  pinControlMetadata: Schema.optional(GoogleCloudRetailV2PinControlMetadata),
  invalidConditionBoostSpecs: Schema.optional(Schema.Array(GoogleCloudRetailV2SearchRequestBoostSpecConditionBoostSpec)),
  experimentInfo: Schema.optional(Schema.Array(GoogleCloudRetailV2ExperimentInfo)),
  conversationalSearchResult: Schema.optional(GoogleCloudRetailV2SearchResponseConversationalSearchResult),
  tileNavigationResult: Schema.optional(GoogleCloudRetailV2SearchResponseTileNavigationResult),
})).annotate({ identifier: "GoogleCloudRetailV2SearchResponse" }) as any as Schema.Schema<GoogleCloudRetailV2SearchResponse>;

export interface GoogleCloudRetailV2CompleteQueryResponseCompletionResult {
  /** The suggestion for the query. */
  suggestion?: string;
  /** Custom attributes for the suggestion term. * For `user-data`, the attributes are additional custom attributes ingested through BigQuery. * For `cloud-retail`, the attributes are product attributes generated by Cloud Retail. It requires UserEvent.product_details is imported properly. */
  attributes?: Record<string, GoogleCloudRetailV2CustomAttribute>;
}

export const GoogleCloudRetailV2CompleteQueryResponseCompletionResult: Schema.Schema<GoogleCloudRetailV2CompleteQueryResponseCompletionResult> = Schema.suspend(() => Schema.Struct({
  suggestion: Schema.optional(Schema.String),
  attributes: Schema.optional(Schema.Record(Schema.String, GoogleCloudRetailV2CustomAttribute)),
})).annotate({ identifier: "GoogleCloudRetailV2CompleteQueryResponseCompletionResult" }) as any as Schema.Schema<GoogleCloudRetailV2CompleteQueryResponseCompletionResult>;

export interface GoogleCloudRetailV2CompleteQueryResponseRecentSearchResult {
  /** The recent search query. */
  recentSearch?: string;
}

export const GoogleCloudRetailV2CompleteQueryResponseRecentSearchResult: Schema.Schema<GoogleCloudRetailV2CompleteQueryResponseRecentSearchResult> = Schema.suspend(() => Schema.Struct({
  recentSearch: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2CompleteQueryResponseRecentSearchResult" }) as any as Schema.Schema<GoogleCloudRetailV2CompleteQueryResponseRecentSearchResult>;

export interface GoogleCloudRetailV2CompleteQueryResponseAttributeResult {
  /** The list of suggestions for the attribute. */
  suggestions?: Array<string>;
}

export const GoogleCloudRetailV2CompleteQueryResponseAttributeResult: Schema.Schema<GoogleCloudRetailV2CompleteQueryResponseAttributeResult> = Schema.suspend(() => Schema.Struct({
  suggestions: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2CompleteQueryResponseAttributeResult" }) as any as Schema.Schema<GoogleCloudRetailV2CompleteQueryResponseAttributeResult>;

export interface GoogleCloudRetailV2CompleteQueryResponse {
  /** Results of the matching suggestions. The result list is ordered and the first result is top suggestion. */
  completionResults?: Array<GoogleCloudRetailV2CompleteQueryResponseCompletionResult>;
  /** A unique complete token. This should be included in the UserEvent.completion_detail for search events resulting from this completion, which enables accurate attribution of complete model performance. */
  attributionToken?: string;
  /** Deprecated. Matched recent searches of this user. The maximum number of recent searches is 10. This field is a restricted feature. If you want to enable it, contact Retail Search support. This feature is only available when CompleteQueryRequest.visitor_id field is set and UserEvent is imported. The recent searches satisfy the follow rules: * They are ordered from latest to oldest. * They are matched with CompleteQueryRequest.query case insensitively. * They are transformed to lower case. * They are UTF-8 safe. Recent searches are deduplicated. More recent searches will be reserved when duplication happens. */
  recentSearchResults?: Array<GoogleCloudRetailV2CompleteQueryResponseRecentSearchResult>;
  /** A map of matched attribute suggestions. This field is only available for `cloud-retail` dataset. Current supported keys: * `brands` * `categories` */
  attributeResults?: Record<string, GoogleCloudRetailV2CompleteQueryResponseAttributeResult>;
}

export const GoogleCloudRetailV2CompleteQueryResponse: Schema.Schema<GoogleCloudRetailV2CompleteQueryResponse> = Schema.suspend(() => Schema.Struct({
  completionResults: Schema.optional(Schema.Array(GoogleCloudRetailV2CompleteQueryResponseCompletionResult)),
  attributionToken: Schema.optional(Schema.String),
  recentSearchResults: Schema.optional(Schema.Array(GoogleCloudRetailV2CompleteQueryResponseRecentSearchResult)),
  attributeResults: Schema.optional(Schema.Record(Schema.String, GoogleCloudRetailV2CompleteQueryResponseAttributeResult)),
})).annotate({ identifier: "GoogleCloudRetailV2CompleteQueryResponse" }) as any as Schema.Schema<GoogleCloudRetailV2CompleteQueryResponse>;

export interface GoogleCloudRetailV2ImportCompletionDataRequest {
  /** Required. The desired input location of the data. */
  inputConfig?: GoogleCloudRetailV2CompletionDataInputConfig;
  /** Pub/Sub topic for receiving notification. If this field is set, when the import is finished, a notification is sent to specified Pub/Sub topic. The message data is JSON string of a Operation. Format of the Pub/Sub topic is `projects/{project}/topics/{topic}`. */
  notificationPubsubTopic?: string;
}

export const GoogleCloudRetailV2ImportCompletionDataRequest: Schema.Schema<GoogleCloudRetailV2ImportCompletionDataRequest> = Schema.suspend(() => Schema.Struct({
  inputConfig: Schema.optional(GoogleCloudRetailV2CompletionDataInputConfig),
  notificationPubsubTopic: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ImportCompletionDataRequest" }) as any as Schema.Schema<GoogleCloudRetailV2ImportCompletionDataRequest>;

export interface GoogleCloudRetailV2RuleBoostAction {
  /** Strength of the condition boost, which must be in [-1, 1]. Negative boost means demotion. Default is 0.0. Setting to 1.0 gives the item a big promotion. However, it does not necessarily mean that the boosted item will be the top result at all times, nor that other items will be excluded. Results could still be shown even when none of them matches the condition. And results that are significantly more relevant to the search query can still trump your heavily favored but irrelevant items. Setting to -1.0 gives the item a big demotion. However, results that are deeply relevant might still be shown. The item will have an upstream battle to get a fairly high ranking, but it is not blocked out completely. Setting to 0.0 means no boost applied. The boosting condition is ignored. */
  boost?: number;
  /** The filter can have a max size of 5000 characters. An expression which specifies which products to apply an action to. The syntax and supported fields are the same as a filter expression. See SearchRequest.filter for detail syntax and limitations. Examples: * To boost products with product ID "product_1" or "product_2", and color "Red" or "Blue": *(id: ANY("product_1", "product_2")) * *AND * *(colorFamilies: ANY("Red", "Blue")) * */
  productsFilter?: string;
}

export const GoogleCloudRetailV2RuleBoostAction: Schema.Schema<GoogleCloudRetailV2RuleBoostAction> = Schema.suspend(() => Schema.Struct({
  boost: Schema.optional(Schema.Number),
  productsFilter: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2RuleBoostAction" }) as any as Schema.Schema<GoogleCloudRetailV2RuleBoostAction>;

export interface GoogleCloudRetailV2RuleRedirectAction {
  /** URL must have length equal or less than 2000 characters. */
  redirectUri?: string;
}

export const GoogleCloudRetailV2RuleRedirectAction: Schema.Schema<GoogleCloudRetailV2RuleRedirectAction> = Schema.suspend(() => Schema.Struct({
  redirectUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2RuleRedirectAction" }) as any as Schema.Schema<GoogleCloudRetailV2RuleRedirectAction>;

export interface GoogleCloudRetailV2RuleOnewaySynonymsAction {
  /** Terms from the search query. Will treat synonyms as their synonyms. Not themselves synonyms of the synonyms. Can specify up to 100 terms. */
  queryTerms?: Array<string>;
  /** Defines a set of synonyms. Cannot contain duplicates. Can specify up to 100 synonyms. */
  synonyms?: Array<string>;
  /** Will be [deprecated = true] post migration; */
  onewayTerms?: Array<string>;
}

export const GoogleCloudRetailV2RuleOnewaySynonymsAction: Schema.Schema<GoogleCloudRetailV2RuleOnewaySynonymsAction> = Schema.suspend(() => Schema.Struct({
  queryTerms: Schema.optional(Schema.Array(Schema.String)),
  synonyms: Schema.optional(Schema.Array(Schema.String)),
  onewayTerms: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2RuleOnewaySynonymsAction" }) as any as Schema.Schema<GoogleCloudRetailV2RuleOnewaySynonymsAction>;

export interface GoogleCloudRetailV2RuleDoNotAssociateAction {
  /** Terms from the search query. Will not consider do_not_associate_terms for search if in search query. Can specify up to 100 terms. */
  queryTerms?: Array<string>;
  /** Cannot contain duplicates or the query term. Can specify up to 100 terms. */
  doNotAssociateTerms?: Array<string>;
  /** Will be [deprecated = true] post migration; */
  terms?: Array<string>;
}

export const GoogleCloudRetailV2RuleDoNotAssociateAction: Schema.Schema<GoogleCloudRetailV2RuleDoNotAssociateAction> = Schema.suspend(() => Schema.Struct({
  queryTerms: Schema.optional(Schema.Array(Schema.String)),
  doNotAssociateTerms: Schema.optional(Schema.Array(Schema.String)),
  terms: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2RuleDoNotAssociateAction" }) as any as Schema.Schema<GoogleCloudRetailV2RuleDoNotAssociateAction>;

export interface GoogleCloudRetailV2RuleReplacementAction {
  /** Terms from the search query. Will be replaced by replacement term. Can specify up to 100 terms. */
  queryTerms?: Array<string>;
  /** Term that will be used for replacement. */
  replacementTerm?: string;
  /** Will be [deprecated = true] post migration; */
  term?: string;
}

export const GoogleCloudRetailV2RuleReplacementAction: Schema.Schema<GoogleCloudRetailV2RuleReplacementAction> = Schema.suspend(() => Schema.Struct({
  queryTerms: Schema.optional(Schema.Array(Schema.String)),
  replacementTerm: Schema.optional(Schema.String),
  term: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2RuleReplacementAction" }) as any as Schema.Schema<GoogleCloudRetailV2RuleReplacementAction>;

export interface GoogleCloudRetailV2RuleIgnoreAction {
  /** Terms to ignore in the search query. */
  ignoreTerms?: Array<string>;
}

export const GoogleCloudRetailV2RuleIgnoreAction: Schema.Schema<GoogleCloudRetailV2RuleIgnoreAction> = Schema.suspend(() => Schema.Struct({
  ignoreTerms: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2RuleIgnoreAction" }) as any as Schema.Schema<GoogleCloudRetailV2RuleIgnoreAction>;

export interface GoogleCloudRetailV2RuleFilterAction {
  /** A filter to apply on the matching condition results. Supported features: * filter must be set. * Filter syntax is identical to SearchRequest.filter. For more information, see [Filter](/retail/docs/filter-and-order#filter). * To filter products with product ID "product_1" or "product_2", and color "Red" or "Blue": *(id: ANY("product_1", "product_2")) * *AND * *(colorFamilies: ANY("Red", "Blue")) * */
  filter?: string;
}

export const GoogleCloudRetailV2RuleFilterAction: Schema.Schema<GoogleCloudRetailV2RuleFilterAction> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2RuleFilterAction" }) as any as Schema.Schema<GoogleCloudRetailV2RuleFilterAction>;

export interface GoogleCloudRetailV2RuleTwowaySynonymsAction {
  /** Defines a set of synonyms. Can specify up to 100 synonyms. Must specify at least 2 synonyms. */
  synonyms?: Array<string>;
}

export const GoogleCloudRetailV2RuleTwowaySynonymsAction: Schema.Schema<GoogleCloudRetailV2RuleTwowaySynonymsAction> = Schema.suspend(() => Schema.Struct({
  synonyms: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2RuleTwowaySynonymsAction" }) as any as Schema.Schema<GoogleCloudRetailV2RuleTwowaySynonymsAction>;

export interface GoogleCloudRetailV2RuleForceReturnFacetActionFacetPositionAdjustment {
  /** The attribute name to force return as a facet. Each attribute name should be a valid attribute name, be non-empty and contain at most 80 characters long. */
  attributeName?: string;
  /** This is the position in the request as explained above. It should be strictly positive be at most 100. */
  position?: number;
}

export const GoogleCloudRetailV2RuleForceReturnFacetActionFacetPositionAdjustment: Schema.Schema<GoogleCloudRetailV2RuleForceReturnFacetActionFacetPositionAdjustment> = Schema.suspend(() => Schema.Struct({
  attributeName: Schema.optional(Schema.String),
  position: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRetailV2RuleForceReturnFacetActionFacetPositionAdjustment" }) as any as Schema.Schema<GoogleCloudRetailV2RuleForceReturnFacetActionFacetPositionAdjustment>;

export interface GoogleCloudRetailV2RuleForceReturnFacetAction {
  /** Each instance corresponds to a force return attribute for the given condition. There can't be more 15 instances here. */
  facetPositionAdjustments?: Array<GoogleCloudRetailV2RuleForceReturnFacetActionFacetPositionAdjustment>;
}

export const GoogleCloudRetailV2RuleForceReturnFacetAction: Schema.Schema<GoogleCloudRetailV2RuleForceReturnFacetAction> = Schema.suspend(() => Schema.Struct({
  facetPositionAdjustments: Schema.optional(Schema.Array(GoogleCloudRetailV2RuleForceReturnFacetActionFacetPositionAdjustment)),
})).annotate({ identifier: "GoogleCloudRetailV2RuleForceReturnFacetAction" }) as any as Schema.Schema<GoogleCloudRetailV2RuleForceReturnFacetAction>;

export interface GoogleCloudRetailV2RuleRemoveFacetAction {
  /** The attribute names (i.e. facet keys) to remove from the dynamic facets (if present in the request). There can't be more 3 attribute names. Each attribute name should be a valid attribute name, be non-empty and contain at most 80 characters. */
  attributeNames?: Array<string>;
}

export const GoogleCloudRetailV2RuleRemoveFacetAction: Schema.Schema<GoogleCloudRetailV2RuleRemoveFacetAction> = Schema.suspend(() => Schema.Struct({
  attributeNames: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2RuleRemoveFacetAction" }) as any as Schema.Schema<GoogleCloudRetailV2RuleRemoveFacetAction>;

export interface GoogleCloudRetailV2RulePinAction {
  /** Required. A map of positions to product_ids. Partial matches per action are allowed, if a certain position in the map is already filled that `[position, product_id]` pair will be ignored but the rest may still be applied. This case will only occur if multiple pin actions are matched to a single request, as the map guarantees that pin positions are unique within the same action. Duplicate product_ids are not permitted within a single pin map. The max size of this map is 120, equivalent to the max [request page size](https://cloud.google.com/retail/docs/reference/rest/v2/projects.locations.catalogs.placements/search#request-body). */
  pinMap?: Record<string, string>;
}

export const GoogleCloudRetailV2RulePinAction: Schema.Schema<GoogleCloudRetailV2RulePinAction> = Schema.suspend(() => Schema.Struct({
  pinMap: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2RulePinAction" }) as any as Schema.Schema<GoogleCloudRetailV2RulePinAction>;

export interface GoogleCloudRetailV2ConditionQueryTerm {
  /** The value of the term to match on. Value cannot be empty. Value can have at most 3 terms if specified as a partial match. Each space separated string is considered as one term. For example, "a b c" is 3 terms and allowed, but " a b c d" is 4 terms and not allowed for a partial match. */
  value?: string;
  /** Whether this is supposed to be a full or partial match. */
  fullMatch?: boolean;
}

export const GoogleCloudRetailV2ConditionQueryTerm: Schema.Schema<GoogleCloudRetailV2ConditionQueryTerm> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
  fullMatch: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2ConditionQueryTerm" }) as any as Schema.Schema<GoogleCloudRetailV2ConditionQueryTerm>;

export interface GoogleCloudRetailV2ConditionTimeRange {
  /** Start of time range. Range is inclusive. */
  startTime?: string;
  /** End of time range. Range is inclusive. */
  endTime?: string;
}

export const GoogleCloudRetailV2ConditionTimeRange: Schema.Schema<GoogleCloudRetailV2ConditionTimeRange> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ConditionTimeRange" }) as any as Schema.Schema<GoogleCloudRetailV2ConditionTimeRange>;

export interface GoogleCloudRetailV2Condition {
  /** A list (up to 10 entries) of terms to match the query on. If not specified, match all queries. If many query terms are specified, the condition is matched if any of the terms is a match (i.e. using the OR operator). */
  queryTerms?: Array<GoogleCloudRetailV2ConditionQueryTerm>;
  /** Range of time(s) specifying when Condition is active. Condition true if any time range matches. */
  activeTimeRange?: Array<GoogleCloudRetailV2ConditionTimeRange>;
  /** Used to support browse uses cases. A list (up to 10 entries) of categories or departments. The format should be the same as UserEvent.page_categories; */
  pageCategories?: Array<string>;
}

export const GoogleCloudRetailV2Condition: Schema.Schema<GoogleCloudRetailV2Condition> = Schema.suspend(() => Schema.Struct({
  queryTerms: Schema.optional(Schema.Array(GoogleCloudRetailV2ConditionQueryTerm)),
  activeTimeRange: Schema.optional(Schema.Array(GoogleCloudRetailV2ConditionTimeRange)),
  pageCategories: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2Condition" }) as any as Schema.Schema<GoogleCloudRetailV2Condition>;

export interface GoogleCloudRetailV2Rule {
  /** A boost action. */
  boostAction?: GoogleCloudRetailV2RuleBoostAction;
  /** Redirects a shopper to a specific page. */
  redirectAction?: GoogleCloudRetailV2RuleRedirectAction;
  /** Treats specific term as a synonym with a group of terms. Group of terms will not be treated as synonyms with the specific term. */
  onewaySynonymsAction?: GoogleCloudRetailV2RuleOnewaySynonymsAction;
  /** Prevents term from being associated with other terms. */
  doNotAssociateAction?: GoogleCloudRetailV2RuleDoNotAssociateAction;
  /** Replaces specific terms in the query. */
  replacementAction?: GoogleCloudRetailV2RuleReplacementAction;
  /** Ignores specific terms from query during search. */
  ignoreAction?: GoogleCloudRetailV2RuleIgnoreAction;
  /** Filters results. */
  filterAction?: GoogleCloudRetailV2RuleFilterAction;
  /** Treats a set of terms as synonyms of one another. */
  twowaySynonymsAction?: GoogleCloudRetailV2RuleTwowaySynonymsAction;
  /** Force returns an attribute as a facet in the request. */
  forceReturnFacetAction?: GoogleCloudRetailV2RuleForceReturnFacetAction;
  /** Remove an attribute as a facet in the request (if present). */
  removeFacetAction?: GoogleCloudRetailV2RuleRemoveFacetAction;
  /** Pins one or more specified products to a specific position in the results. */
  pinAction?: GoogleCloudRetailV2RulePinAction;
  /** Required. The condition that triggers the rule. If the condition is empty, the rule will always apply. */
  condition?: GoogleCloudRetailV2Condition;
}

export const GoogleCloudRetailV2Rule: Schema.Schema<GoogleCloudRetailV2Rule> = Schema.suspend(() => Schema.Struct({
  boostAction: Schema.optional(GoogleCloudRetailV2RuleBoostAction),
  redirectAction: Schema.optional(GoogleCloudRetailV2RuleRedirectAction),
  onewaySynonymsAction: Schema.optional(GoogleCloudRetailV2RuleOnewaySynonymsAction),
  doNotAssociateAction: Schema.optional(GoogleCloudRetailV2RuleDoNotAssociateAction),
  replacementAction: Schema.optional(GoogleCloudRetailV2RuleReplacementAction),
  ignoreAction: Schema.optional(GoogleCloudRetailV2RuleIgnoreAction),
  filterAction: Schema.optional(GoogleCloudRetailV2RuleFilterAction),
  twowaySynonymsAction: Schema.optional(GoogleCloudRetailV2RuleTwowaySynonymsAction),
  forceReturnFacetAction: Schema.optional(GoogleCloudRetailV2RuleForceReturnFacetAction),
  removeFacetAction: Schema.optional(GoogleCloudRetailV2RuleRemoveFacetAction),
  pinAction: Schema.optional(GoogleCloudRetailV2RulePinAction),
  condition: Schema.optional(GoogleCloudRetailV2Condition),
})).annotate({ identifier: "GoogleCloudRetailV2Rule" }) as any as Schema.Schema<GoogleCloudRetailV2Rule>;

export interface GoogleCloudRetailV2Control {
  /** Immutable. Fully qualified name `projects/* /locations/global/catalogs/* /controls/*` */
  name?: string;
  /** Required. The human readable control display name. Used in Retail UI. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is thrown. */
  displayName?: string;
  /** A rule control - a condition-action pair. Enacts a set action when the condition is triggered. For example: Boost "gShoe" when query full matches "Running Shoes". */
  rule?: GoogleCloudRetailV2Rule;
  /** Output only. List of serving config ids that are associated with this control in the same Catalog. Note the association is managed via the ServingConfig, this is an output only denormalized view. */
  associatedServingConfigIds?: Array<string>;
  /** Required. Immutable. The solution types that the control is used for. Currently we support setting only one type of solution at creation time. Only `SOLUTION_TYPE_SEARCH` value is supported at the moment. If no solution type is provided at creation time, will default to SOLUTION_TYPE_SEARCH. */
  solutionTypes?: Array<"SOLUTION_TYPE_UNSPECIFIED" | "SOLUTION_TYPE_RECOMMENDATION" | "SOLUTION_TYPE_SEARCH" | (string & {})>;
  /** Specifies the use case for the control. Affects what condition fields can be set. Only settable by search controls. Will default to SEARCH_SOLUTION_USE_CASE_SEARCH if not specified. Currently only allow one search_solution_use_case per control. */
  searchSolutionUseCase?: Array<"SEARCH_SOLUTION_USE_CASE_UNSPECIFIED" | "SEARCH_SOLUTION_USE_CASE_SEARCH" | "SEARCH_SOLUTION_USE_CASE_BROWSE" | (string & {})>;
}

export const GoogleCloudRetailV2Control: Schema.Schema<GoogleCloudRetailV2Control> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  rule: Schema.optional(GoogleCloudRetailV2Rule),
  associatedServingConfigIds: Schema.optional(Schema.Array(Schema.String)),
  solutionTypes: Schema.optional(Schema.Array(Schema.String)),
  searchSolutionUseCase: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2Control" }) as any as Schema.Schema<GoogleCloudRetailV2Control>;

export interface GoogleCloudRetailV2ListControlsResponse {
  /** All the Controls for a given catalog. */
  controls?: Array<GoogleCloudRetailV2Control>;
  /** Pagination token, if not returned indicates the last page. */
  nextPageToken?: string;
}

export const GoogleCloudRetailV2ListControlsResponse: Schema.Schema<GoogleCloudRetailV2ListControlsResponse> = Schema.suspend(() => Schema.Struct({
  controls: Schema.optional(Schema.Array(GoogleCloudRetailV2Control)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ListControlsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2ListControlsResponse>;

export interface GoogleCloudRetailV2ConversationalSearchRequestSearchParams {
  /** Optional. The filter string to restrict search results. The syntax of the filter string is the same as SearchRequest.filter. */
  filter?: string;
  /** Optional. The canonical filter string to restrict search results. The syntax of the canonical filter string is the same as SearchRequest.canonical_filter. */
  canonicalFilter?: string;
  /** Optional. The sort string to specify the sorting of search results. The syntax of the sort string is the same as SearchRequest.order_by. */
  sortBy?: string;
  /** Optional. The boost spec to specify the boosting of search results. The syntax of the boost spec is the same as SearchRequest.boost_spec. */
  boostSpec?: GoogleCloudRetailV2SearchRequestBoostSpec;
}

export const GoogleCloudRetailV2ConversationalSearchRequestSearchParams: Schema.Schema<GoogleCloudRetailV2ConversationalSearchRequestSearchParams> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  canonicalFilter: Schema.optional(Schema.String),
  sortBy: Schema.optional(Schema.String),
  boostSpec: Schema.optional(GoogleCloudRetailV2SearchRequestBoostSpec),
})).annotate({ identifier: "GoogleCloudRetailV2ConversationalSearchRequestSearchParams" }) as any as Schema.Schema<GoogleCloudRetailV2ConversationalSearchRequestSearchParams>;

export interface GoogleCloudRetailV2ConversationalSearchRequestUserAnswerSelectedAnswer {
  /** Optional. This field specifies the selected answer which is a attribute key-value. */
  productAttributeValue?: GoogleCloudRetailV2ProductAttributeValue;
}

export const GoogleCloudRetailV2ConversationalSearchRequestUserAnswerSelectedAnswer: Schema.Schema<GoogleCloudRetailV2ConversationalSearchRequestUserAnswerSelectedAnswer> = Schema.suspend(() => Schema.Struct({
  productAttributeValue: Schema.optional(GoogleCloudRetailV2ProductAttributeValue),
})).annotate({ identifier: "GoogleCloudRetailV2ConversationalSearchRequestUserAnswerSelectedAnswer" }) as any as Schema.Schema<GoogleCloudRetailV2ConversationalSearchRequestUserAnswerSelectedAnswer>;

export interface GoogleCloudRetailV2ConversationalSearchRequestUserAnswer {
  /** This field specifies the incremental input text from the user during the conversational search. */
  textAnswer?: string;
  /** Optional. This field specifies the selected answer during the conversational search. This should be a subset of ConversationalSearchResponse.FollowupQuestion.SuggestedAnswer. */
  selectedAnswer?: GoogleCloudRetailV2ConversationalSearchRequestUserAnswerSelectedAnswer;
}

export const GoogleCloudRetailV2ConversationalSearchRequestUserAnswer: Schema.Schema<GoogleCloudRetailV2ConversationalSearchRequestUserAnswer> = Schema.suspend(() => Schema.Struct({
  textAnswer: Schema.optional(Schema.String),
  selectedAnswer: Schema.optional(GoogleCloudRetailV2ConversationalSearchRequestUserAnswerSelectedAnswer),
})).annotate({ identifier: "GoogleCloudRetailV2ConversationalSearchRequestUserAnswer" }) as any as Schema.Schema<GoogleCloudRetailV2ConversationalSearchRequestUserAnswer>;

export interface GoogleCloudRetailV2ConversationalSearchRequestConversationalFilteringSpec {
  /** Optional. This field is deprecated. Please use ConversationalFilteringSpec.conversational_filtering_mode instead. */
  enableConversationalFiltering?: boolean;
  /** Optional. This field specifies the current user answer during the conversational filtering search. It can be either user selected from suggested answers or user input plain text. */
  userAnswer?: GoogleCloudRetailV2ConversationalSearchRequestUserAnswer;
  /** Optional. Mode to control Conversational Filtering. Defaults to Mode.DISABLED if it's unset. */
  conversationalFilteringMode?: "MODE_UNSPECIFIED" | "DISABLED" | "ENABLED" | "CONVERSATIONAL_FILTER_ONLY" | (string & {});
}

export const GoogleCloudRetailV2ConversationalSearchRequestConversationalFilteringSpec: Schema.Schema<GoogleCloudRetailV2ConversationalSearchRequestConversationalFilteringSpec> = Schema.suspend(() => Schema.Struct({
  enableConversationalFiltering: Schema.optional(Schema.Boolean),
  userAnswer: Schema.optional(GoogleCloudRetailV2ConversationalSearchRequestUserAnswer),
  conversationalFilteringMode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ConversationalSearchRequestConversationalFilteringSpec" }) as any as Schema.Schema<GoogleCloudRetailV2ConversationalSearchRequestConversationalFilteringSpec>;

export interface GoogleCloudRetailV2SafetySetting {
  /** Harm category. */
  category?: "HARM_CATEGORY_UNSPECIFIED" | "HARM_CATEGORY_HATE_SPEECH" | "HARM_CATEGORY_DANGEROUS_CONTENT" | "HARM_CATEGORY_HARASSMENT" | "HARM_CATEGORY_SEXUALLY_EXPLICIT" | "HARM_CATEGORY_CIVIC_INTEGRITY" | (string & {});
  /** The harm block threshold. */
  threshold?: "HARM_BLOCK_THRESHOLD_UNSPECIFIED" | "BLOCK_LOW_AND_ABOVE" | "BLOCK_MEDIUM_AND_ABOVE" | "BLOCK_ONLY_HIGH" | "BLOCK_NONE" | "OFF" | (string & {});
  /** Optional. Specify if the threshold is used for probability or severity score. If not specified, the threshold is used for probability score. */
  method?: "HARM_BLOCK_METHOD_UNSPECIFIED" | "SEVERITY" | "PROBABILITY" | (string & {});
}

export const GoogleCloudRetailV2SafetySetting: Schema.Schema<GoogleCloudRetailV2SafetySetting> = Schema.suspend(() => Schema.Struct({
  category: Schema.optional(Schema.String),
  threshold: Schema.optional(Schema.String),
  method: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2SafetySetting" }) as any as Schema.Schema<GoogleCloudRetailV2SafetySetting>;

export interface GoogleCloudRetailV2ConversationalSearchRequest {
  /** Required. The branch resource name, such as `projects/* /locations/global/catalogs/default_catalog/branches/0`. Use "default_branch" as the branch ID or leave this field empty, to search products under the default branch. */
  branch?: string;
  /** Optional. Raw search query to be searched for. If this field is empty, the request is considered a category browsing request. */
  query?: string;
  /** Optional. The categories associated with a category page. Must be set for category navigation queries to achieve good search quality. The format should be the same as UserEvent.page_categories; To represent the full path of category, use the '>' sign, with one space on each side, to separate different hierarchies. If '>' is part of the category name, replace it with other character(s). Category pages include special pages such as sales or promotions. For instance, a special sale page may have the category hierarchy: "pageCategories" : ["Sales > 2017 Black Friday Deals"]. */
  pageCategories?: Array<string>;
  /** Optional. This field specifies the conversation id, which maintains the state of the conversation between client side and server side. Use the value from the previous ConversationalSearchResponse.conversation_id. For the initial request, this should be empty. */
  conversationId?: string;
  /** Optional. Search parameters. */
  searchParams?: GoogleCloudRetailV2ConversationalSearchRequestSearchParams;
  /** Required. A unique identifier for tracking visitors. For example, this could be implemented with an HTTP cookie, which should be able to uniquely identify a visitor on a single device. This unique identifier should not change if the visitor logs in or out of the website. This should be the same identifier as UserEvent.visitor_id. The field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. */
  visitorId?: string;
  /** Optional. User information. */
  userInfo?: GoogleCloudRetailV2UserInfo;
  /** Optional. This field specifies all conversational filtering related parameters. */
  conversationalFilteringSpec?: GoogleCloudRetailV2ConversationalSearchRequestConversationalFilteringSpec;
  /** Optional. The user labels applied to a resource must meet the following requirements: * Each resource can have multiple labels, up to a maximum of 64. * Each label must be a key-value pair. * Keys have a minimum length of 1 character and a maximum length of 63 characters and cannot be empty. Values can be empty and have a maximum length of 63 characters. * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. All characters must use UTF-8 encoding, and international characters are allowed. * The key portion of a label must be unique. However, you can use the same key with multiple resources. * Keys must start with a lowercase letter or international character. See [Google Cloud Document](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements) for more details. */
  userLabels?: Record<string, string>;
  /** Optional. The safety settings to be applied to the generated content. */
  safetySettings?: Array<GoogleCloudRetailV2SafetySetting>;
}

export const GoogleCloudRetailV2ConversationalSearchRequest: Schema.Schema<GoogleCloudRetailV2ConversationalSearchRequest> = Schema.suspend(() => Schema.Struct({
  branch: Schema.optional(Schema.String),
  query: Schema.optional(Schema.String),
  pageCategories: Schema.optional(Schema.Array(Schema.String)),
  conversationId: Schema.optional(Schema.String),
  searchParams: Schema.optional(GoogleCloudRetailV2ConversationalSearchRequestSearchParams),
  visitorId: Schema.optional(Schema.String),
  userInfo: Schema.optional(GoogleCloudRetailV2UserInfo),
  conversationalFilteringSpec: Schema.optional(GoogleCloudRetailV2ConversationalSearchRequestConversationalFilteringSpec),
  userLabels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
  safetySettings: Schema.optional(Schema.Array(GoogleCloudRetailV2SafetySetting)),
})).annotate({ identifier: "GoogleCloudRetailV2ConversationalSearchRequest" }) as any as Schema.Schema<GoogleCloudRetailV2ConversationalSearchRequest>;

export interface GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestionSuggestedAnswer {
  /** Product attribute value, including an attribute key and an attribute value. Other types can be added here in the future. */
  productAttributeValue?: GoogleCloudRetailV2ProductAttributeValue;
}

export const GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestionSuggestedAnswer: Schema.Schema<GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestionSuggestedAnswer> = Schema.suspend(() => Schema.Struct({
  productAttributeValue: Schema.optional(GoogleCloudRetailV2ProductAttributeValue),
})).annotate({ identifier: "GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestionSuggestedAnswer" }) as any as Schema.Schema<GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestionSuggestedAnswer>;

export interface GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestion {
  /** The conversational followup question generated for Intent refinement. */
  followupQuestion?: string;
  /** The answer options provided to client for the follow-up question. */
  suggestedAnswers?: Array<GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestionSuggestedAnswer>;
}

export const GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestion: Schema.Schema<GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestion> = Schema.suspend(() => Schema.Struct({
  followupQuestion: Schema.optional(Schema.String),
  suggestedAnswers: Schema.optional(Schema.Array(GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestionSuggestedAnswer)),
})).annotate({ identifier: "GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestion" }) as any as Schema.Schema<GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestion>;

export interface GoogleCloudRetailV2ConversationalSearchResponseRefinedSearch {
  /** The query to be used for search. */
  query?: string;
}

export const GoogleCloudRetailV2ConversationalSearchResponseRefinedSearch: Schema.Schema<GoogleCloudRetailV2ConversationalSearchResponseRefinedSearch> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ConversationalSearchResponseRefinedSearch" }) as any as Schema.Schema<GoogleCloudRetailV2ConversationalSearchResponseRefinedSearch>;

export interface GoogleCloudRetailV2ConversationalSearchResponseConversationalFilteringResultAdditionalFilter {
  /** Product attribute value, including an attribute key and an attribute value. Other types can be added here in the future. */
  productAttributeValue?: GoogleCloudRetailV2ProductAttributeValue;
}

export const GoogleCloudRetailV2ConversationalSearchResponseConversationalFilteringResultAdditionalFilter: Schema.Schema<GoogleCloudRetailV2ConversationalSearchResponseConversationalFilteringResultAdditionalFilter> = Schema.suspend(() => Schema.Struct({
  productAttributeValue: Schema.optional(GoogleCloudRetailV2ProductAttributeValue),
})).annotate({ identifier: "GoogleCloudRetailV2ConversationalSearchResponseConversationalFilteringResultAdditionalFilter" }) as any as Schema.Schema<GoogleCloudRetailV2ConversationalSearchResponseConversationalFilteringResultAdditionalFilter>;

export interface GoogleCloudRetailV2ConversationalSearchResponseConversationalFilteringResult {
  /** The conversational filtering question. */
  followupQuestion?: GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestion;
  /** This is the incremental additional filters implied from the current user answer. User should add the suggested addition filters to the previous ConversationalSearchRequest.SearchParams.filter and SearchRequest.filter, and use the merged filter in the follow up requests. */
  additionalFilter?: GoogleCloudRetailV2ConversationalSearchResponseConversationalFilteringResultAdditionalFilter;
}

export const GoogleCloudRetailV2ConversationalSearchResponseConversationalFilteringResult: Schema.Schema<GoogleCloudRetailV2ConversationalSearchResponseConversationalFilteringResult> = Schema.suspend(() => Schema.Struct({
  followupQuestion: Schema.optional(GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestion),
  additionalFilter: Schema.optional(GoogleCloudRetailV2ConversationalSearchResponseConversationalFilteringResultAdditionalFilter),
})).annotate({ identifier: "GoogleCloudRetailV2ConversationalSearchResponseConversationalFilteringResult" }) as any as Schema.Schema<GoogleCloudRetailV2ConversationalSearchResponseConversationalFilteringResult>;

export interface GoogleCloudRetailV2ConversationalSearchResponse {
  /** The types Retail classifies the search query as. Supported values are: - "ORDER_SUPPORT" - "SIMPLE_PRODUCT_SEARCH" - "INTENT_REFINEMENT" - "PRODUCT_DETAILS" - "PRODUCT_COMPARISON" - "DEALS_AND_COUPONS" - "STORE_RELEVANT" - "BLOCKLISTED" - "BEST_PRODUCT" - "RETAIL_SUPPORT" - "DISABLED" */
  userQueryTypes?: Array<string>;
  /** The conversational answer-based text response generated by the Server. */
  conversationalTextResponse?: string;
  /** The conversational followup question generated for Intent refinement. */
  followupQuestion?: GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestion;
  /** Conversation UUID. This field will be stored in client side storage to maintain the conversation session with server and will be used for next search request's ConversationalSearchRequest.conversation_id to restore conversation state in server. */
  conversationId?: string;
  /** The proposed refined search queries. They can be used to fetch the relevant search results. When using CONVERSATIONAL_FILTER_ONLY mode, the refined_query from search response will be populated here. */
  refinedSearch?: Array<GoogleCloudRetailV2ConversationalSearchResponseRefinedSearch>;
  /** This field specifies all related information that is needed on client side for UI rendering of conversational filtering search. */
  conversationalFilteringResult?: GoogleCloudRetailV2ConversationalSearchResponseConversationalFilteringResult;
  /** Output only. The state of the response generation. */
  state?: "STATE_UNSPECIFIED" | "STREAMING" | "SUCCEEDED" | (string & {});
}

export const GoogleCloudRetailV2ConversationalSearchResponse: Schema.Schema<GoogleCloudRetailV2ConversationalSearchResponse> = Schema.suspend(() => Schema.Struct({
  userQueryTypes: Schema.optional(Schema.Array(Schema.String)),
  conversationalTextResponse: Schema.optional(Schema.String),
  followupQuestion: Schema.optional(GoogleCloudRetailV2ConversationalSearchResponseFollowupQuestion),
  conversationId: Schema.optional(Schema.String),
  refinedSearch: Schema.optional(Schema.Array(GoogleCloudRetailV2ConversationalSearchResponseRefinedSearch)),
  conversationalFilteringResult: Schema.optional(GoogleCloudRetailV2ConversationalSearchResponseConversationalFilteringResult),
  state: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ConversationalSearchResponse" }) as any as Schema.Schema<GoogleCloudRetailV2ConversationalSearchResponse>;

export interface GoogleCloudRetailV2GenerativeQuestionsFeatureConfig {
  /** Required. Resource name of the affected catalog. Format: projects/{project}/locations/{location}/catalogs/{catalog} */
  catalog?: string;
  /** Optional. Determines whether questions will be used at serving time. Note: This feature cannot be enabled until initial data requirements are satisfied. */
  featureEnabled?: boolean;
  /** Optional. Minimum number of products in the response to trigger follow-up questions. Value must be 0 or positive. */
  minimumProducts?: number;
}

export const GoogleCloudRetailV2GenerativeQuestionsFeatureConfig: Schema.Schema<GoogleCloudRetailV2GenerativeQuestionsFeatureConfig> = Schema.suspend(() => Schema.Struct({
  catalog: Schema.optional(Schema.String),
  featureEnabled: Schema.optional(Schema.Boolean),
  minimumProducts: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRetailV2GenerativeQuestionsFeatureConfig" }) as any as Schema.Schema<GoogleCloudRetailV2GenerativeQuestionsFeatureConfig>;

export interface GoogleCloudRetailV2GenerativeQuestionConfig {
  /** Required. Resource name of the catalog. Format: projects/{project}/locations/{location}/catalogs/{catalog} */
  catalog?: string;
  /** Required. The facet to which the question is associated. */
  facet?: string;
  /** Output only. The LLM generated question. */
  generatedQuestion?: string;
  /** Optional. The question that will be used at serving time. Question can have a max length of 300 bytes. When not populated, generated_question should be used. */
  finalQuestion?: string;
  /** Output only. Values that can be used to answer the question. */
  exampleValues?: Array<string>;
  /** Output only. The ratio of how often a question was asked. */
  frequency?: number;
  /** Optional. Whether the question is asked at serving time. */
  allowedInConversation?: boolean;
}

export const GoogleCloudRetailV2GenerativeQuestionConfig: Schema.Schema<GoogleCloudRetailV2GenerativeQuestionConfig> = Schema.suspend(() => Schema.Struct({
  catalog: Schema.optional(Schema.String),
  facet: Schema.optional(Schema.String),
  generatedQuestion: Schema.optional(Schema.String),
  finalQuestion: Schema.optional(Schema.String),
  exampleValues: Schema.optional(Schema.Array(Schema.String)),
  frequency: Schema.optional(Schema.Number),
  allowedInConversation: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2GenerativeQuestionConfig" }) as any as Schema.Schema<GoogleCloudRetailV2GenerativeQuestionConfig>;

export interface GoogleCloudRetailV2ListGenerativeQuestionConfigsResponse {
  /** All the questions for a given catalog. */
  generativeQuestionConfigs?: Array<GoogleCloudRetailV2GenerativeQuestionConfig>;
}

export const GoogleCloudRetailV2ListGenerativeQuestionConfigsResponse: Schema.Schema<GoogleCloudRetailV2ListGenerativeQuestionConfigsResponse> = Schema.suspend(() => Schema.Struct({
  generativeQuestionConfigs: Schema.optional(Schema.Array(GoogleCloudRetailV2GenerativeQuestionConfig)),
})).annotate({ identifier: "GoogleCloudRetailV2ListGenerativeQuestionConfigsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2ListGenerativeQuestionConfigsResponse>;

export interface GoogleCloudRetailV2UpdateGenerativeQuestionConfigRequest {
  /** Required. The question to update. */
  generativeQuestionConfig?: GoogleCloudRetailV2GenerativeQuestionConfig;
  /** Optional. Indicates which fields in the provided GenerativeQuestionConfig to update. The following are NOT supported: * GenerativeQuestionConfig.frequency If not set or empty, all supported fields are updated. */
  updateMask?: string;
}

export const GoogleCloudRetailV2UpdateGenerativeQuestionConfigRequest: Schema.Schema<GoogleCloudRetailV2UpdateGenerativeQuestionConfigRequest> = Schema.suspend(() => Schema.Struct({
  generativeQuestionConfig: Schema.optional(GoogleCloudRetailV2GenerativeQuestionConfig),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2UpdateGenerativeQuestionConfigRequest" }) as any as Schema.Schema<GoogleCloudRetailV2UpdateGenerativeQuestionConfigRequest>;

export interface GoogleCloudRetailV2BatchUpdateGenerativeQuestionConfigsRequest {
  /** Required. The updates question configs. */
  requests?: Array<GoogleCloudRetailV2UpdateGenerativeQuestionConfigRequest>;
}

export const GoogleCloudRetailV2BatchUpdateGenerativeQuestionConfigsRequest: Schema.Schema<GoogleCloudRetailV2BatchUpdateGenerativeQuestionConfigsRequest> = Schema.suspend(() => Schema.Struct({
  requests: Schema.optional(Schema.Array(GoogleCloudRetailV2UpdateGenerativeQuestionConfigRequest)),
})).annotate({ identifier: "GoogleCloudRetailV2BatchUpdateGenerativeQuestionConfigsRequest" }) as any as Schema.Schema<GoogleCloudRetailV2BatchUpdateGenerativeQuestionConfigsRequest>;

export interface GoogleCloudRetailV2BatchUpdateGenerativeQuestionConfigsResponse {
  /** Optional. The updates question configs. */
  generativeQuestionConfigs?: Array<GoogleCloudRetailV2GenerativeQuestionConfig>;
}

export const GoogleCloudRetailV2BatchUpdateGenerativeQuestionConfigsResponse: Schema.Schema<GoogleCloudRetailV2BatchUpdateGenerativeQuestionConfigsResponse> = Schema.suspend(() => Schema.Struct({
  generativeQuestionConfigs: Schema.optional(Schema.Array(GoogleCloudRetailV2GenerativeQuestionConfig)),
})).annotate({ identifier: "GoogleCloudRetailV2BatchUpdateGenerativeQuestionConfigsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2BatchUpdateGenerativeQuestionConfigsResponse>;

export interface GoogleCloudRetailV2IntentClassificationConfigInlineForceIntent {
  /** Optional. A example query. */
  query?: string;
  /** Optional. The operation to perform for the query. */
  operation?: "OPERATION_UNSPECIFIED" | "EXACT_MATCH" | "CONTAINS" | (string & {});
  /** Optional. The intent_type must match one of the predefined intent types defined at https://cloud.google.com/retail/docs/reference/rpc/google.cloud.retail.v2alpha#querytype */
  intentType?: string;
}

export const GoogleCloudRetailV2IntentClassificationConfigInlineForceIntent: Schema.Schema<GoogleCloudRetailV2IntentClassificationConfigInlineForceIntent> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
  operation: Schema.optional(Schema.String),
  intentType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2IntentClassificationConfigInlineForceIntent" }) as any as Schema.Schema<GoogleCloudRetailV2IntentClassificationConfigInlineForceIntent>;

export interface GoogleCloudRetailV2IntentClassificationConfigInlineSource {
  /** Optional. A list of inline force intent classifications. */
  inlineForceIntents?: Array<GoogleCloudRetailV2IntentClassificationConfigInlineForceIntent>;
}

export const GoogleCloudRetailV2IntentClassificationConfigInlineSource: Schema.Schema<GoogleCloudRetailV2IntentClassificationConfigInlineSource> = Schema.suspend(() => Schema.Struct({
  inlineForceIntents: Schema.optional(Schema.Array(GoogleCloudRetailV2IntentClassificationConfigInlineForceIntent)),
})).annotate({ identifier: "GoogleCloudRetailV2IntentClassificationConfigInlineSource" }) as any as Schema.Schema<GoogleCloudRetailV2IntentClassificationConfigInlineSource>;

export interface GoogleCloudRetailV2IntentClassificationConfigExample {
  /** Required. Example query. */
  query?: string;
  /** Optional. The intent_type must match one of the predefined intent types defined at https://cloud.google.com/retail/docs/reference/rpc/google.cloud.retail.v2alpha#querytype */
  intentType?: string;
  /** Optional. The reason for the intent classification. This is used to explain the intent classification decision. */
  reason?: string;
  /** Required. Whether the example is classified positively. */
  classifiedPositive?: boolean;
}

export const GoogleCloudRetailV2IntentClassificationConfigExample: Schema.Schema<GoogleCloudRetailV2IntentClassificationConfigExample> = Schema.suspend(() => Schema.Struct({
  query: Schema.optional(Schema.String),
  intentType: Schema.optional(Schema.String),
  reason: Schema.optional(Schema.String),
  classifiedPositive: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2IntentClassificationConfigExample" }) as any as Schema.Schema<GoogleCloudRetailV2IntentClassificationConfigExample>;

export interface GoogleCloudRetailV2IntentClassificationConfig {
  /** Optional. Inline source for intent classifications. */
  inlineSource?: GoogleCloudRetailV2IntentClassificationConfigInlineSource;
  /** Optional. Customers can use the preamble to specify any requirements for blocklisting intent classification. This preamble will be added to the blocklisting intent classification model prompt. */
  modelPreamble?: string;
  /** Optional. A list of examples for intent classification. */
  example?: Array<GoogleCloudRetailV2IntentClassificationConfigExample>;
  /** Optional. A list of keywords that will be used to classify the query to the "BLOCKLISTED" intent type. The keywords are case insensitive. */
  blocklistKeywords?: Array<string>;
  /** Optional. A list of intent types that will be disabled for this customer. The intent types must match one of the predefined intent types defined at https://cloud.google.com/retail/docs/reference/rpc/google.cloud.retail.v2alpha#querytype */
  disabledIntentTypes?: Array<string>;
}

export const GoogleCloudRetailV2IntentClassificationConfig: Schema.Schema<GoogleCloudRetailV2IntentClassificationConfig> = Schema.suspend(() => Schema.Struct({
  inlineSource: Schema.optional(GoogleCloudRetailV2IntentClassificationConfigInlineSource),
  modelPreamble: Schema.optional(Schema.String),
  example: Schema.optional(Schema.Array(GoogleCloudRetailV2IntentClassificationConfigExample)),
  blocklistKeywords: Schema.optional(Schema.Array(Schema.String)),
  disabledIntentTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2IntentClassificationConfig" }) as any as Schema.Schema<GoogleCloudRetailV2IntentClassificationConfig>;

export interface GoogleCloudRetailV2ConversationalSearchCustomizationConfig {
  /** Optional. The retailer's display name that could be used in our LLM answers. Example - "Google" */
  retailerDisplayName?: string;
  /** Optional. The configs for intent classification. */
  intentClassificationConfig?: GoogleCloudRetailV2IntentClassificationConfig;
  /** Required. Resource name of the catalog. Format: projects/{project}/locations/{location}/catalogs/{catalog} */
  catalog?: string;
}

export const GoogleCloudRetailV2ConversationalSearchCustomizationConfig: Schema.Schema<GoogleCloudRetailV2ConversationalSearchCustomizationConfig> = Schema.suspend(() => Schema.Struct({
  retailerDisplayName: Schema.optional(Schema.String),
  intentClassificationConfig: Schema.optional(GoogleCloudRetailV2IntentClassificationConfig),
  catalog: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ConversationalSearchCustomizationConfig" }) as any as Schema.Schema<GoogleCloudRetailV2ConversationalSearchCustomizationConfig>;

export interface GoogleCloudRetailV2ModelServingConfigList {
  /** Optional. A set of valid serving configs that may be used for `PAGE_OPTIMIZATION`. */
  servingConfigIds?: Array<string>;
}

export const GoogleCloudRetailV2ModelServingConfigList: Schema.Schema<GoogleCloudRetailV2ModelServingConfigList> = Schema.suspend(() => Schema.Struct({
  servingConfigIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2ModelServingConfigList" }) as any as Schema.Schema<GoogleCloudRetailV2ModelServingConfigList>;

export interface GoogleCloudRetailV2ModelFrequentlyBoughtTogetherFeaturesConfig {
  /** Optional. Specifies the context of the model when it is used in predict requests. Can only be set for the `frequently-bought-together` type. If it isn't specified, it defaults to MULTIPLE_CONTEXT_PRODUCTS. */
  contextProductsType?: "CONTEXT_PRODUCTS_TYPE_UNSPECIFIED" | "SINGLE_CONTEXT_PRODUCT" | "MULTIPLE_CONTEXT_PRODUCTS" | (string & {});
}

export const GoogleCloudRetailV2ModelFrequentlyBoughtTogetherFeaturesConfig: Schema.Schema<GoogleCloudRetailV2ModelFrequentlyBoughtTogetherFeaturesConfig> = Schema.suspend(() => Schema.Struct({
  contextProductsType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ModelFrequentlyBoughtTogetherFeaturesConfig" }) as any as Schema.Schema<GoogleCloudRetailV2ModelFrequentlyBoughtTogetherFeaturesConfig>;

export interface GoogleCloudRetailV2ModelModelFeaturesConfig {
  /** Additional configs for frequently-bought-together models. */
  frequentlyBoughtTogetherConfig?: GoogleCloudRetailV2ModelFrequentlyBoughtTogetherFeaturesConfig;
}

export const GoogleCloudRetailV2ModelModelFeaturesConfig: Schema.Schema<GoogleCloudRetailV2ModelModelFeaturesConfig> = Schema.suspend(() => Schema.Struct({
  frequentlyBoughtTogetherConfig: Schema.optional(GoogleCloudRetailV2ModelFrequentlyBoughtTogetherFeaturesConfig),
})).annotate({ identifier: "GoogleCloudRetailV2ModelModelFeaturesConfig" }) as any as Schema.Schema<GoogleCloudRetailV2ModelModelFeaturesConfig>;

export interface GoogleCloudRetailV2Model {
  /** Required. The fully qualified resource name of the model. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}` catalog_id has char limit of 50. recommendation_model_id has char limit of 40. */
  name?: string;
  /** Required. The display name of the model. Should be human readable, used to display Recommendation Models in the Retail Cloud Console Dashboard. UTF-8 encoded string with limit of 1024 characters. */
  displayName?: string;
  /** Optional. The training state that the model is in (e.g. `TRAINING` or `PAUSED`). Since part of the cost of running the service is frequency of training - this can be used to determine when to train model in order to control cost. If not specified: the default value for `CreateModel` method is `TRAINING`. The default value for `UpdateModel` method is to keep the state the same as before. */
  trainingState?: "TRAINING_STATE_UNSPECIFIED" | "PAUSED" | "TRAINING" | (string & {});
  /** Output only. The serving state of the model: `ACTIVE`, `NOT_ACTIVE`. */
  servingState?: "SERVING_STATE_UNSPECIFIED" | "INACTIVE" | "ACTIVE" | "TUNED" | (string & {});
  /** Output only. Timestamp the Recommendation Model was created at. */
  createTime?: string;
  /** Output only. Timestamp the Recommendation Model was last updated. E.g. if a Recommendation Model was paused - this would be the time the pause was initiated. */
  updateTime?: string;
  /** Required. The type of model e.g. `home-page`. Currently supported values: `recommended-for-you`, `others-you-may-like`, `frequently-bought-together`, `page-optimization`, `similar-items`, `buy-it-again`, `on-sale-items`, and `recently-viewed`(readonly value). This field together with optimization_objective describe model metadata to use to control model training and serving. See https://cloud.google.com/retail/docs/models for more details on what the model metadata control and which combination of parameters are valid. For invalid combinations of parameters (e.g. type = `frequently-bought-together` and optimization_objective = `ctr`), you receive an error 400 if you try to create/update a recommendation with this set of knobs. */
  type?: string;
  /** Optional. The optimization objective e.g. `cvr`. Currently supported values: `ctr`, `cvr`, `revenue-per-order`. If not specified, we choose default based on model type. Default depends on type of recommendation: `recommended-for-you` => `ctr` `others-you-may-like` => `ctr` `frequently-bought-together` => `revenue_per_order` This field together with optimization_objective describe model metadata to use to control model training and serving. See https://cloud.google.com/retail/docs/models for more details on what the model metadata control and which combination of parameters are valid. For invalid combinations of parameters (e.g. type = `frequently-bought-together` and optimization_objective = `ctr`), you receive an error 400 if you try to create/update a recommendation with this set of knobs. */
  optimizationObjective?: string;
  /** Optional. The state of periodic tuning. The period we use is 3 months - to do a one-off tune earlier use the `TuneModel` method. Default value is `PERIODIC_TUNING_ENABLED`. */
  periodicTuningState?: "PERIODIC_TUNING_STATE_UNSPECIFIED" | "PERIODIC_TUNING_DISABLED" | "ALL_TUNING_DISABLED" | "PERIODIC_TUNING_ENABLED" | (string & {});
  /** Output only. The timestamp when the latest successful tune finished. */
  lastTuneTime?: string;
  /** Output only. The tune operation associated with the model. Can be used to determine if there is an ongoing tune for this recommendation. Empty field implies no tune is goig on. */
  tuningOperation?: string;
  /** Output only. The state of data requirements for this model: `DATA_OK` and `DATA_ERROR`. Recommendation model cannot be trained if the data is in `DATA_ERROR` state. Recommendation model can have `DATA_ERROR` state even if serving state is `ACTIVE`: models were trained successfully before, but cannot be refreshed because model no longer has sufficient data for training. */
  dataState?: "DATA_STATE_UNSPECIFIED" | "DATA_OK" | "DATA_ERROR" | (string & {});
  /** Optional. If `RECOMMENDATIONS_FILTERING_ENABLED`, recommendation filtering by attributes is enabled for the model. */
  filteringOption?: "RECOMMENDATIONS_FILTERING_OPTION_UNSPECIFIED" | "RECOMMENDATIONS_FILTERING_DISABLED" | "RECOMMENDATIONS_FILTERING_ENABLED" | (string & {});
  /** Output only. The list of valid serving configs associated with the PageOptimizationConfig. */
  servingConfigLists?: Array<GoogleCloudRetailV2ModelServingConfigList>;
  /** Optional. Additional model features config. */
  modelFeaturesConfig?: GoogleCloudRetailV2ModelModelFeaturesConfig;
}

export const GoogleCloudRetailV2Model: Schema.Schema<GoogleCloudRetailV2Model> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  trainingState: Schema.optional(Schema.String),
  servingState: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  optimizationObjective: Schema.optional(Schema.String),
  periodicTuningState: Schema.optional(Schema.String),
  lastTuneTime: Schema.optional(Schema.String),
  tuningOperation: Schema.optional(Schema.String),
  dataState: Schema.optional(Schema.String),
  filteringOption: Schema.optional(Schema.String),
  servingConfigLists: Schema.optional(Schema.Array(GoogleCloudRetailV2ModelServingConfigList)),
  modelFeaturesConfig: Schema.optional(GoogleCloudRetailV2ModelModelFeaturesConfig),
})).annotate({ identifier: "GoogleCloudRetailV2Model" }) as any as Schema.Schema<GoogleCloudRetailV2Model>;

export interface GoogleCloudRetailV2PauseModelRequest {
}

export const GoogleCloudRetailV2PauseModelRequest: Schema.Schema<GoogleCloudRetailV2PauseModelRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2PauseModelRequest" }) as any as Schema.Schema<GoogleCloudRetailV2PauseModelRequest>;

export interface GoogleCloudRetailV2ResumeModelRequest {
}

export const GoogleCloudRetailV2ResumeModelRequest: Schema.Schema<GoogleCloudRetailV2ResumeModelRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2ResumeModelRequest" }) as any as Schema.Schema<GoogleCloudRetailV2ResumeModelRequest>;

export interface GoogleCloudRetailV2ListModelsResponse {
  /** List of Models. */
  models?: Array<GoogleCloudRetailV2Model>;
  /** Pagination token, if not returned indicates the last page. */
  nextPageToken?: string;
}

export const GoogleCloudRetailV2ListModelsResponse: Schema.Schema<GoogleCloudRetailV2ListModelsResponse> = Schema.suspend(() => Schema.Struct({
  models: Schema.optional(Schema.Array(GoogleCloudRetailV2Model)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ListModelsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2ListModelsResponse>;

export interface GoogleCloudRetailV2TuneModelRequest {
}

export const GoogleCloudRetailV2TuneModelRequest: Schema.Schema<GoogleCloudRetailV2TuneModelRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2TuneModelRequest" }) as any as Schema.Schema<GoogleCloudRetailV2TuneModelRequest>;

export interface GoogleCloudRetailV2ProductDetail {
  /** Required. Product information. Required field(s): * Product.id Optional override field(s): * Product.price_info If any supported optional fields are provided, we will treat them as a full override when looking up product information from the catalog. Thus, it is important to ensure that the overriding fields are accurate and complete. All other product fields are ignored and instead populated via catalog lookup after event ingestion. */
  product?: GoogleCloudRetailV2Product;
  /** Quantity of the product associated with the user event. For example, this field will be 2 if two products are added to the shopping cart for `purchase-complete` event. Required for `add-to-cart` and `purchase-complete` event types. */
  quantity?: number;
}

export const GoogleCloudRetailV2ProductDetail: Schema.Schema<GoogleCloudRetailV2ProductDetail> = Schema.suspend(() => Schema.Struct({
  product: Schema.optional(GoogleCloudRetailV2Product),
  quantity: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRetailV2ProductDetail" }) as any as Schema.Schema<GoogleCloudRetailV2ProductDetail>;

export interface GoogleCloudRetailV2CompletionDetail {
  /** Completion attribution token in CompleteQueryResponse.attribution_token. */
  completionAttributionToken?: string;
  /** End user selected CompleteQueryResponse.CompletionResult.suggestion. */
  selectedSuggestion?: string;
  /** End user selected CompleteQueryResponse.CompletionResult.suggestion position, starting from 0. */
  selectedPosition?: number;
}

export const GoogleCloudRetailV2CompletionDetail: Schema.Schema<GoogleCloudRetailV2CompletionDetail> = Schema.suspend(() => Schema.Struct({
  completionAttributionToken: Schema.optional(Schema.String),
  selectedSuggestion: Schema.optional(Schema.String),
  selectedPosition: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRetailV2CompletionDetail" }) as any as Schema.Schema<GoogleCloudRetailV2CompletionDetail>;

export interface GoogleCloudRetailV2PurchaseTransaction {
  /** The transaction ID with a length limit of 128 characters. */
  id?: string;
  /** Required. Total non-zero revenue or grand total associated with the transaction. This value include shipping, tax, or other adjustments to total revenue that you want to include as part of your revenue calculations. */
  revenue?: number;
  /** All the taxes associated with the transaction. */
  tax?: number;
  /** All the costs associated with the products. These can be manufacturing costs, shipping expenses not borne by the end user, or any other costs, such that: * Profit = revenue - tax - cost */
  cost?: number;
  /** Required. Currency code. Use three-character ISO-4217 code. */
  currencyCode?: string;
}

export const GoogleCloudRetailV2PurchaseTransaction: Schema.Schema<GoogleCloudRetailV2PurchaseTransaction> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  revenue: Schema.optional(Schema.Number),
  tax: Schema.optional(Schema.Number),
  cost: Schema.optional(Schema.Number),
  currencyCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2PurchaseTransaction" }) as any as Schema.Schema<GoogleCloudRetailV2PurchaseTransaction>;

export interface GoogleCloudRetailV2PanelInfo {
  /** Required. The panel ID. */
  panelId?: string;
  /** Optional. The display name of the panel. */
  displayName?: string;
  /** Optional. The product details associated with the panel. */
  productDetails?: Array<GoogleCloudRetailV2ProductDetail>;
  /** Optional. The total number of panels, including this one, shown to the user. Must be set if panel_position is set. */
  totalPanels?: number;
  /** Optional. The ordered position of the panel, if shown to the user with other panels. If set, then total_panels must also be set. */
  panelPosition?: number;
  /** Optional. The attribution token of the panel. */
  attributionToken?: string;
}

export const GoogleCloudRetailV2PanelInfo: Schema.Schema<GoogleCloudRetailV2PanelInfo> = Schema.suspend(() => Schema.Struct({
  panelId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  productDetails: Schema.optional(Schema.Array(GoogleCloudRetailV2ProductDetail)),
  totalPanels: Schema.optional(Schema.Number),
  panelPosition: Schema.optional(Schema.Number),
  attributionToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2PanelInfo" }) as any as Schema.Schema<GoogleCloudRetailV2PanelInfo>;

export interface GoogleCloudRetailV2UserEvent {
  /** Required. User event type. Allowed values are: * `add-to-cart`: Products being added to cart. * `remove-from-cart`: Products being removed from cart. * `category-page-view`: Special pages such as sale or promotion pages viewed. * `detail-page-view`: Products detail page viewed. * `home-page-view`: Homepage viewed. * `purchase-complete`: User finishing a purchase. * `search`: Product search. * `shopping-cart-page-view`: User viewing a shopping cart. */
  eventType?: string;
  /** Required. A unique identifier for tracking visitors. For example, this could be implemented with an HTTP cookie, which should be able to uniquely identify a visitor on a single device. This unique identifier should not change if the visitor log in/out of the website. Don't set the field to the same fixed ID for different users. This mixes the event history of those users together, which results in degraded model quality. The field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. The field should not contain PII or user-data. We recommend to use Google Analytics [Client ID](https://developers.google.com/analytics/devguides/collection/analyticsjs/field-reference#clientId) for this field. */
  visitorId?: string;
  /** A unique identifier for tracking a visitor session with a length limit of 128 bytes. A session is an aggregation of an end user behavior in a time span. A general guideline to populate the session_id: 1. If user has no activity for 30 min, a new session_id should be assigned. 2. The session_id should be unique across users, suggest use uuid or add visitor_id as prefix. */
  sessionId?: string;
  /** Only required for UserEventService.ImportUserEvents method. Timestamp of when the user event happened. */
  eventTime?: string;
  /** A list of identifiers for the independent experiment groups this user event belongs to. This is used to distinguish between user events associated with different experiment setups (e.g. using Retail API, using different recommendation models). */
  experimentIds?: Array<string>;
  /** Highly recommended for user events that are the result of PredictionService.Predict. This field enables accurate attribution of recommendation model performance. The value must be a valid PredictResponse.attribution_token for user events that are the result of PredictionService.Predict. The value must be a valid SearchResponse.attribution_token for user events that are the result of SearchService.Search. This token enables us to accurately attribute page view or purchase back to the event and the particular predict response containing this clicked/purchased product. If user clicks on product K in the recommendation results, pass PredictResponse.attribution_token as a URL parameter to product K's page. When recording events on product K's page, log the PredictResponse.attribution_token to this field. */
  attributionToken?: string;
  /** The main product details related to the event. This field is optional except for the following event types: * `add-to-cart` * `detail-page-view` * `purchase-complete` In a `search` event, this field represents the products returned to the end user on the current page (the end user may have not finished browsing the whole page yet). When a new page is returned to the end user, after pagination/filtering/ordering even for the same query, a new `search` event with different product_details is desired. The end user may have not finished browsing the whole page yet. */
  productDetails?: Array<GoogleCloudRetailV2ProductDetail>;
  /** The main auto-completion details related to the event. This field should be set for `search` event when autocomplete function is enabled and the user clicks a suggestion for search. */
  completionDetail?: GoogleCloudRetailV2CompletionDetail;
  /** Extra user event features to include in the recommendation model. If you provide custom attributes for ingested user events, also include them in the user events that you associate with prediction requests. Custom attribute formatting must be consistent between imported events and events provided with prediction requests. This lets the Retail API use those custom attributes when training models and serving predictions, which helps improve recommendation quality. This field needs to pass all below criteria, otherwise an INVALID_ARGUMENT error is returned: * The key must be a UTF-8 encoded string with a length limit of 5,000 characters. * For text attributes, at most 400 values are allowed. Empty values are not allowed. Each value must be a UTF-8 encoded string with a length limit of 256 characters. * For number attributes, at most 400 values are allowed. For product recommendations, an example of extra user information is traffic_channel, which is how a user arrives at the site. Users can arrive at the site by coming to the site directly, coming through Google search, or in other ways. */
  attributes?: Record<string, GoogleCloudRetailV2CustomAttribute>;
  /** The ID or name of the associated shopping cart. This ID is used to associate multiple items added or present in the cart before purchase. This can only be set for `add-to-cart`, `purchase-complete`, or `shopping-cart-page-view` events. */
  cartId?: string;
  /** A transaction represents the entire purchase transaction. Required for `purchase-complete` events. Other event types should not set this field. Otherwise, an INVALID_ARGUMENT error is returned. */
  purchaseTransaction?: GoogleCloudRetailV2PurchaseTransaction;
  /** The user's search query. See SearchRequest.query for definition. The value must be a UTF-8 encoded string with a length limit of 5,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. At least one of search_query or page_categories is required for `search` events. Other event types should not set this field. Otherwise, an INVALID_ARGUMENT error is returned. */
  searchQuery?: string;
  /** The filter syntax consists of an expression language for constructing a predicate from one or more fields of the products being filtered. See SearchRequest.filter for definition and syntax. The value must be a UTF-8 encoded string with a length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. */
  filter?: string;
  /** The order in which products are returned. See SearchRequest.order_by for definition and syntax. The value must be a UTF-8 encoded string with a length limit of 1,000 characters. Otherwise, an INVALID_ARGUMENT error is returned. This can only be set for `search` events. Other event types should not set this field. Otherwise, an INVALID_ARGUMENT error is returned. */
  orderBy?: string;
  /** An integer that specifies the current offset for pagination (the 0-indexed starting location, amongst the products deemed by the API as relevant). See SearchRequest.offset for definition. If this field is negative, an INVALID_ARGUMENT is returned. This can only be set for `search` events. Other event types should not set this field. Otherwise, an INVALID_ARGUMENT error is returned. */
  offset?: number;
  /** Optional. The categories associated with a category page. To represent the full path of category, use the '>' sign, with one space on each side, to separate different hierarchies. If '>' is part of the category name, replace it with other character(s). Category pages include special pages such as sales or promotions. For instance, a special sale page may have the category hierarchy: "pageCategories" : ["Sales > 2017 Black Friday Deals"]. Required for `category-page-view` events. At least one of search_query or page_categories is required for `search` events. Other event types should not set this field. Otherwise, an INVALID_ARGUMENT error is returned. */
  pageCategories?: Array<string>;
  /** User information. */
  userInfo?: GoogleCloudRetailV2UserInfo;
  /** Complete URL (window.location.href) of the user's current page. When using the client side event reporting with JavaScript pixel and Google Tag Manager, this value is filled in automatically. Maximum length 5,000 characters. */
  uri?: string;
  /** The referrer URL of the current page. When using the client side event reporting with JavaScript pixel and Google Tag Manager, this value is filled in automatically. */
  referrerUri?: string;
  /** A unique ID of a web page view. This should be kept the same for all user events triggered from the same pageview. For example, an item detail page view could trigger multiple events as the user is browsing the page. The `pageViewId` property should be kept the same for all these events so that they can be grouped together properly. When using the client side event reporting with JavaScript pixel and Google Tag Manager, this value is filled in automatically. */
  pageViewId?: string;
  /** The entity for customers that may run multiple different entities, domains, sites or regions, for example, `Google US`, `Google Ads`, `Waymo`, `google.com`, `youtube.com`, etc. We recommend that you set this field to get better per-entity search, completion, and prediction results. */
  entity?: string;
  /** Optional. List of panels associated with this event. Used for panel-level impression data. */
  panels?: Array<GoogleCloudRetailV2PanelInfo>;
}

export const GoogleCloudRetailV2UserEvent: Schema.Schema<GoogleCloudRetailV2UserEvent> = Schema.suspend(() => Schema.Struct({
  eventType: Schema.optional(Schema.String),
  visitorId: Schema.optional(Schema.String),
  sessionId: Schema.optional(Schema.String),
  eventTime: Schema.optional(Schema.String),
  experimentIds: Schema.optional(Schema.Array(Schema.String)),
  attributionToken: Schema.optional(Schema.String),
  productDetails: Schema.optional(Schema.Array(GoogleCloudRetailV2ProductDetail)),
  completionDetail: Schema.optional(GoogleCloudRetailV2CompletionDetail),
  attributes: Schema.optional(Schema.Record(Schema.String, GoogleCloudRetailV2CustomAttribute)),
  cartId: Schema.optional(Schema.String),
  purchaseTransaction: Schema.optional(GoogleCloudRetailV2PurchaseTransaction),
  searchQuery: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
  orderBy: Schema.optional(Schema.String),
  offset: Schema.optional(Schema.Number),
  pageCategories: Schema.optional(Schema.Array(Schema.String)),
  userInfo: Schema.optional(GoogleCloudRetailV2UserInfo),
  uri: Schema.optional(Schema.String),
  referrerUri: Schema.optional(Schema.String),
  pageViewId: Schema.optional(Schema.String),
  entity: Schema.optional(Schema.String),
  panels: Schema.optional(Schema.Array(GoogleCloudRetailV2PanelInfo)),
})).annotate({ identifier: "GoogleCloudRetailV2UserEvent" }) as any as Schema.Schema<GoogleCloudRetailV2UserEvent>;

export interface GoogleApiHttpBody {
  /** The HTTP Content-Type header value specifying the content type of the body. */
  contentType?: string;
  /** The HTTP request/response body as raw binary. */
  data?: string;
  /** Application specific response metadata. Must be set in the first response for streaming APIs. */
  extensions?: Array<Record<string, unknown>>;
}

export const GoogleApiHttpBody: Schema.Schema<GoogleApiHttpBody> = Schema.suspend(() => Schema.Struct({
  contentType: Schema.optional(Schema.String),
  data: Schema.optional(Schema.String),
  extensions: Schema.optional(Schema.Array(Schema.Record(Schema.String, Schema.Unknown))),
})).annotate({ identifier: "GoogleApiHttpBody" }) as any as Schema.Schema<GoogleApiHttpBody>;

export interface GoogleCloudRetailV2CollectUserEventRequest {
  /** The prebuilt rule name that can convert a specific type of raw_json. For example: "ga4_bq" rule for the GA4 user event schema. */
  prebuiltRule?: string;
  /** Required. URL encoded UserEvent proto with a length limit of 2,000,000 characters. */
  userEvent?: string;
  /** The URL including cgi-parameters but excluding the hash fragment with a length limit of 5,000 characters. This is often more useful than the referer URL, because many browsers only send the domain for 3rd party requests. */
  uri?: string;
  /** The event timestamp in milliseconds. This prevents browser caching of otherwise identical get requests. The name is abbreviated to reduce the payload bytes. */
  ets?: string;
  /** An arbitrary serialized JSON string that contains necessary information that can comprise a user event. When this field is specified, the user_event field will be ignored. Note: line-delimited JSON is not supported, a single JSON only. */
  rawJson?: string;
}

export const GoogleCloudRetailV2CollectUserEventRequest: Schema.Schema<GoogleCloudRetailV2CollectUserEventRequest> = Schema.suspend(() => Schema.Struct({
  prebuiltRule: Schema.optional(Schema.String),
  userEvent: Schema.optional(Schema.String),
  uri: Schema.optional(Schema.String),
  ets: Schema.optional(Schema.String),
  rawJson: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2CollectUserEventRequest" }) as any as Schema.Schema<GoogleCloudRetailV2CollectUserEventRequest>;

export interface GoogleCloudRetailV2PurgeUserEventsRequest {
  /** Required. The filter string to specify the events to be deleted with a length limit of 5,000 characters. Empty string filter is not allowed. The eligible fields for filtering are: * `eventType`: Double quoted UserEvent.event_type string. * `eventTime`: in ISO 8601 "zulu" format. * `visitorId`: Double quoted string. Specifying this will delete all events associated with a visitor. * `userId`: Double quoted string. Specifying this will delete all events associated with a user. Examples: * Deleting all events in a time range: `eventTime > "2012-04-23T18:25:43.511Z" eventTime < "2012-04-23T18:30:43.511Z"` * Deleting specific eventType in time range: `eventTime > "2012-04-23T18:25:43.511Z" eventType = "detail-page-view"` * Deleting all events for a specific visitor: `visitorId = "visitor1024"` The filtering fields are assumed to have an implicit AND. */
  filter?: string;
  /** Actually perform the purge. If `force` is set to false, the method will return the expected purge count without deleting any user events. */
  force?: boolean;
}

export const GoogleCloudRetailV2PurgeUserEventsRequest: Schema.Schema<GoogleCloudRetailV2PurgeUserEventsRequest> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  force: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2PurgeUserEventsRequest" }) as any as Schema.Schema<GoogleCloudRetailV2PurgeUserEventsRequest>;

export interface GoogleCloudRetailV2UserEventInlineSource {
  /** Required. A list of user events to import. Recommended max of 10k items. */
  userEvents?: Array<GoogleCloudRetailV2UserEvent>;
}

export const GoogleCloudRetailV2UserEventInlineSource: Schema.Schema<GoogleCloudRetailV2UserEventInlineSource> = Schema.suspend(() => Schema.Struct({
  userEvents: Schema.optional(Schema.Array(GoogleCloudRetailV2UserEvent)),
})).annotate({ identifier: "GoogleCloudRetailV2UserEventInlineSource" }) as any as Schema.Schema<GoogleCloudRetailV2UserEventInlineSource>;

export interface GoogleCloudRetailV2GcsSource {
  /** Required. Google Cloud Storage URIs to input files. URI can be up to 2000 characters long. URIs can match the full object path (for example, `gs://bucket/directory/object.json`) or a pattern matching one or more files, such as `gs://bucket/directory/*.json`. A request can contain at most 100 files, and each file can be up to 2 GB. See [Importing product information](https://cloud.google.com/retail/recommendations-ai/docs/upload-catalog) for the expected file format and setup instructions. */
  inputUris?: Array<string>;
  /** The schema to use when parsing the data from the source. Supported values for product imports: * `product` (default): One JSON Product per line. Each product must have a valid Product.id. * `product_merchant_center`: See [Importing catalog data from Merchant Center](https://cloud.google.com/retail/recommendations-ai/docs/upload-catalog#mc). Supported values for user events imports: * `user_event` (default): One JSON UserEvent per line. * `user_event_ga360`: Using https://support.google.com/analytics/answer/3437719. Supported values for control imports: * `control` (default): One JSON Control per line. Supported values for catalog attribute imports: * `catalog_attribute` (default): One CSV CatalogAttribute per line. */
  dataSchema?: string;
}

export const GoogleCloudRetailV2GcsSource: Schema.Schema<GoogleCloudRetailV2GcsSource> = Schema.suspend(() => Schema.Struct({
  inputUris: Schema.optional(Schema.Array(Schema.String)),
  dataSchema: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2GcsSource" }) as any as Schema.Schema<GoogleCloudRetailV2GcsSource>;

export interface GoogleCloudRetailV2UserEventInputConfig {
  /** Required. The Inline source for the input content for UserEvents. */
  userEventInlineSource?: GoogleCloudRetailV2UserEventInlineSource;
  /** Required. Google Cloud Storage location for the input content. */
  gcsSource?: GoogleCloudRetailV2GcsSource;
  /** Required. BigQuery input source. */
  bigQuerySource?: GoogleCloudRetailV2BigQuerySource;
}

export const GoogleCloudRetailV2UserEventInputConfig: Schema.Schema<GoogleCloudRetailV2UserEventInputConfig> = Schema.suspend(() => Schema.Struct({
  userEventInlineSource: Schema.optional(GoogleCloudRetailV2UserEventInlineSource),
  gcsSource: Schema.optional(GoogleCloudRetailV2GcsSource),
  bigQuerySource: Schema.optional(GoogleCloudRetailV2BigQuerySource),
})).annotate({ identifier: "GoogleCloudRetailV2UserEventInputConfig" }) as any as Schema.Schema<GoogleCloudRetailV2UserEventInputConfig>;

export interface GoogleCloudRetailV2ImportErrorsConfig {
  /** Google Cloud Storage prefix for import errors. This must be an empty, existing Cloud Storage directory. Import errors are written to sharded files in this directory, one per line, as a JSON-encoded `google.rpc.Status` message. */
  gcsPrefix?: string;
}

export const GoogleCloudRetailV2ImportErrorsConfig: Schema.Schema<GoogleCloudRetailV2ImportErrorsConfig> = Schema.suspend(() => Schema.Struct({
  gcsPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ImportErrorsConfig" }) as any as Schema.Schema<GoogleCloudRetailV2ImportErrorsConfig>;

export interface GoogleCloudRetailV2ImportUserEventsRequest {
  /** Required. The desired input location of the data. */
  inputConfig?: GoogleCloudRetailV2UserEventInputConfig;
  /** The desired location of errors incurred during the Import. Cannot be set for inline user event imports. */
  errorsConfig?: GoogleCloudRetailV2ImportErrorsConfig;
}

export const GoogleCloudRetailV2ImportUserEventsRequest: Schema.Schema<GoogleCloudRetailV2ImportUserEventsRequest> = Schema.suspend(() => Schema.Struct({
  inputConfig: Schema.optional(GoogleCloudRetailV2UserEventInputConfig),
  errorsConfig: Schema.optional(GoogleCloudRetailV2ImportErrorsConfig),
})).annotate({ identifier: "GoogleCloudRetailV2ImportUserEventsRequest" }) as any as Schema.Schema<GoogleCloudRetailV2ImportUserEventsRequest>;

export interface GoogleCloudRetailV2RejoinUserEventsRequest {
  /** The type of the user event rejoin to define the scope and range of the user events to be rejoined with the latest product catalog. Defaults to `USER_EVENT_REJOIN_SCOPE_UNSPECIFIED` if this field is not set, or set to an invalid integer value. */
  userEventRejoinScope?: "USER_EVENT_REJOIN_SCOPE_UNSPECIFIED" | "JOINED_EVENTS" | "UNJOINED_EVENTS" | (string & {});
}

export const GoogleCloudRetailV2RejoinUserEventsRequest: Schema.Schema<GoogleCloudRetailV2RejoinUserEventsRequest> = Schema.suspend(() => Schema.Struct({
  userEventRejoinScope: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2RejoinUserEventsRequest" }) as any as Schema.Schema<GoogleCloudRetailV2RejoinUserEventsRequest>;

export interface GoogleCloudRetailV2PredictRequest {
  /** Required. Context about the user, what they are looking at and what action they took to trigger the predict request. Note that this user event detail won't be ingested to userEvent logs. Thus, a separate userEvent write request is required for event logging. Don't set UserEvent.visitor_id or UserInfo.user_id to the same fixed ID for different users. If you are trying to receive non-personalized recommendations (not recommended; this can negatively impact model performance), instead set UserEvent.visitor_id to a random unique ID and leave UserInfo.user_id unset. */
  userEvent?: GoogleCloudRetailV2UserEvent;
  /** Maximum number of results to return. Set this property to the number of prediction results needed. If zero, the service will choose a reasonable default. The maximum allowed value is 100. Values above 100 will be coerced to 100. */
  pageSize?: number;
  /** This field is not used; leave it unset. */
  pageToken?: string;
  /** Filter for restricting prediction results with a length limit of 5,000 characters. Accepts values for tags and the `filterOutOfStockItems` flag. * Tag expressions. Restricts predictions to products that match all of the specified tags. Boolean operators `OR` and `NOT` are supported if the expression is enclosed in parentheses, and must be separated from the tag values by a space. `-"tagA"` is also supported and is equivalent to `NOT "tagA"`. Tag values must be double quoted UTF-8 encoded strings with a size limit of 1,000 characters. Note: "Recently viewed" models don't support tag filtering at the moment. * filterOutOfStockItems. Restricts predictions to products that do not have a stockState value of OUT_OF_STOCK. Examples: * tag=("Red" OR "Blue") tag="New-Arrival" tag=(NOT "promotional") * filterOutOfStockItems tag=(-"promotional") * filterOutOfStockItems If your filter blocks all prediction results, the API will return *no* results. If instead you want empty result sets to return generic (unfiltered) popular products, set `strictFiltering` to False in `PredictRequest.params`. Note that the API will never return items with storageStatus of "EXPIRED" or "DELETED" regardless of filter choices. If `filterSyntaxV2` is set to true under the `params` field, then attribute-based expressions are expected instead of the above described tag-based syntax. Examples: * (colors: ANY("Red", "Blue")) AND NOT (categories: ANY("Phones")) * (availability: ANY("IN_STOCK")) AND (colors: ANY("Red") OR categories: ANY("Phones")) For more information, see [Filter recommendations](https://cloud.google.com/retail/docs/filter-recs). */
  filter?: string;
  /** Use validate only mode for this prediction query. If set to true, a dummy model will be used that returns arbitrary products. Note that the validate only mode should only be used for testing the API, or if the model is not ready. */
  validateOnly?: boolean;
  /** Additional domain specific parameters for the predictions. Allowed values: * `returnProduct`: Boolean. If set to true, the associated product object will be returned in the `results.metadata` field in the prediction response. * `returnScore`: Boolean. If set to true, the prediction 'score' corresponding to each returned product will be set in the `results.metadata` field in the prediction response. The given 'score' indicates the probability of a product being clicked/purchased given the user's context and history. * `strictFiltering`: Boolean. True by default. If set to false, the service will return generic (unfiltered) popular products instead of empty if your filter blocks all prediction results. * `priceRerankLevel`: String. Default empty. If set to be non-empty, then it needs to be one of {'no-price-reranking', 'low-price-reranking', 'medium-price-reranking', 'high-price-reranking'}. This gives request-level control and adjusts prediction results based on product price. * `diversityLevel`: String. Default empty. If set to be non-empty, then it needs to be one of {'no-diversity', 'low-diversity', 'medium-diversity', 'high-diversity', 'auto-diversity'}. This gives request-level control and adjusts prediction results based on product category. * `filterSyntaxV2`: Boolean. False by default. If set to true, the `filter` field is interpreteted according to the new, attribute-based syntax. */
  params?: Record<string, unknown>;
  /** The labels applied to a resource must meet the following requirements: * Each resource can have multiple labels, up to a maximum of 64. * Each label must be a key-value pair. * Keys have a minimum length of 1 character and a maximum length of 63 characters and cannot be empty. Values can be empty and have a maximum length of 63 characters. * Keys and values can contain only lowercase letters, numeric characters, underscores, and dashes. All characters must use UTF-8 encoding, and international characters are allowed. * The key portion of a label must be unique. However, you can use the same key with multiple resources. * Keys must start with a lowercase letter or international character. See [Google Cloud Document](https://cloud.google.com/resource-manager/docs/creating-managing-labels#requirements) for more details. */
  labels?: Record<string, string>;
}

export const GoogleCloudRetailV2PredictRequest: Schema.Schema<GoogleCloudRetailV2PredictRequest> = Schema.suspend(() => Schema.Struct({
  userEvent: Schema.optional(GoogleCloudRetailV2UserEvent),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  filter: Schema.optional(Schema.String),
  validateOnly: Schema.optional(Schema.Boolean),
  params: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  labels: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2PredictRequest" }) as any as Schema.Schema<GoogleCloudRetailV2PredictRequest>;

export interface GoogleCloudRetailV2PredictResponsePredictionResult {
  /** ID of the recommended product */
  id?: string;
  /** Additional product metadata / annotations. Possible values: * `product`: JSON representation of the product. Is set if `returnProduct` is set to true in `PredictRequest.params`. * `score`: Prediction score in double value. Is set if `returnScore` is set to true in `PredictRequest.params`. */
  metadata?: Record<string, unknown>;
}

export const GoogleCloudRetailV2PredictResponsePredictionResult: Schema.Schema<GoogleCloudRetailV2PredictResponsePredictionResult> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
})).annotate({ identifier: "GoogleCloudRetailV2PredictResponsePredictionResult" }) as any as Schema.Schema<GoogleCloudRetailV2PredictResponsePredictionResult>;

export interface GoogleCloudRetailV2PredictResponse {
  /** A list of recommended products. The order represents the ranking (from the most relevant product to the least). */
  results?: Array<GoogleCloudRetailV2PredictResponsePredictionResult>;
  /** A unique attribution token. This should be included in the UserEvent logs resulting from this recommendation, which enables accurate attribution of recommendation model performance. */
  attributionToken?: string;
  /** IDs of products in the request that were missing from the inventory. */
  missingIds?: Array<string>;
  /** True if the validateOnly property was set in the request. */
  validateOnly?: boolean;
}

export const GoogleCloudRetailV2PredictResponse: Schema.Schema<GoogleCloudRetailV2PredictResponse> = Schema.suspend(() => Schema.Struct({
  results: Schema.optional(Schema.Array(GoogleCloudRetailV2PredictResponsePredictionResult)),
  attributionToken: Schema.optional(Schema.String),
  missingIds: Schema.optional(Schema.Array(Schema.String)),
  validateOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2PredictResponse" }) as any as Schema.Schema<GoogleCloudRetailV2PredictResponse>;

export interface GoogleCloudRetailV2ListProductsResponse {
  /** The Products. */
  products?: Array<GoogleCloudRetailV2Product>;
  /** A token that can be sent as ListProductsRequest.page_token to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudRetailV2ListProductsResponse: Schema.Schema<GoogleCloudRetailV2ListProductsResponse> = Schema.suspend(() => Schema.Struct({
  products: Schema.optional(Schema.Array(GoogleCloudRetailV2Product)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ListProductsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2ListProductsResponse>;

export interface GoogleCloudRetailV2PurgeProductsRequest {
  /** Required. The filter string to specify the products to be deleted with a length limit of 5,000 characters. Empty string filter is not allowed. "*" implies delete all items in a branch. The eligible fields for filtering are: * `availability`: Double quoted Product.availability string. * `create_time` : in ISO 8601 "zulu" format. Supported syntax: * Comparators (">", "<", ">=", "<=", "="). Examples: * create_time <= "2015-02-13T17:05:46Z" * availability = "IN_STOCK" * Conjunctions ("AND") Examples: * create_time <= "2015-02-13T17:05:46Z" AND availability = "PREORDER" * Disjunctions ("OR") Examples: * create_time <= "2015-02-13T17:05:46Z" OR availability = "IN_STOCK" * Can support nested queries. Examples: * (create_time <= "2015-02-13T17:05:46Z" AND availability = "PREORDER") OR (create_time >= "2015-02-14T13:03:32Z" AND availability = "IN_STOCK") * Filter Limits: * Filter should not contain more than 6 conditions. * Max nesting depth should not exceed 2 levels. Examples queries: * Delete back order products created before a timestamp. create_time <= "2015-02-13T17:05:46Z" OR availability = "BACKORDER" */
  filter?: string;
  /** Actually perform the purge. If `force` is set to false, the method will return the expected purge count without deleting any products. */
  force?: boolean;
}

export const GoogleCloudRetailV2PurgeProductsRequest: Schema.Schema<GoogleCloudRetailV2PurgeProductsRequest> = Schema.suspend(() => Schema.Struct({
  filter: Schema.optional(Schema.String),
  force: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2PurgeProductsRequest" }) as any as Schema.Schema<GoogleCloudRetailV2PurgeProductsRequest>;

export interface GoogleCloudRetailV2ProductInlineSource {
  /** Required. A list of products to update/create. Each product must have a valid Product.id. Recommended max of 100 items. */
  products?: Array<GoogleCloudRetailV2Product>;
}

export const GoogleCloudRetailV2ProductInlineSource: Schema.Schema<GoogleCloudRetailV2ProductInlineSource> = Schema.suspend(() => Schema.Struct({
  products: Schema.optional(Schema.Array(GoogleCloudRetailV2Product)),
})).annotate({ identifier: "GoogleCloudRetailV2ProductInlineSource" }) as any as Schema.Schema<GoogleCloudRetailV2ProductInlineSource>;

export interface GoogleCloudRetailV2ProductInputConfig {
  /** The Inline source for the input content for products. */
  productInlineSource?: GoogleCloudRetailV2ProductInlineSource;
  /** Google Cloud Storage location for the input content. */
  gcsSource?: GoogleCloudRetailV2GcsSource;
  /** BigQuery input source. */
  bigQuerySource?: GoogleCloudRetailV2BigQuerySource;
}

export const GoogleCloudRetailV2ProductInputConfig: Schema.Schema<GoogleCloudRetailV2ProductInputConfig> = Schema.suspend(() => Schema.Struct({
  productInlineSource: Schema.optional(GoogleCloudRetailV2ProductInlineSource),
  gcsSource: Schema.optional(GoogleCloudRetailV2GcsSource),
  bigQuerySource: Schema.optional(GoogleCloudRetailV2BigQuerySource),
})).annotate({ identifier: "GoogleCloudRetailV2ProductInputConfig" }) as any as Schema.Schema<GoogleCloudRetailV2ProductInputConfig>;

export interface GoogleCloudRetailV2ImportProductsRequest {
  /** Deprecated. This field has no effect. */
  requestId?: string;
  /** Required. The desired input location of the data. */
  inputConfig?: GoogleCloudRetailV2ProductInputConfig;
  /** The desired location of errors incurred during the Import. */
  errorsConfig?: GoogleCloudRetailV2ImportErrorsConfig;
  /** Indicates which fields in the provided imported `products` to update. If not set, all fields are updated. If provided, only the existing product fields are updated. Missing products will not be created. */
  updateMask?: string;
  /** The mode of reconciliation between existing products and the products to be imported. Defaults to ReconciliationMode.INCREMENTAL. */
  reconciliationMode?: "RECONCILIATION_MODE_UNSPECIFIED" | "INCREMENTAL" | "FULL" | (string & {});
  /** Full Pub/Sub topic name for receiving notification. If this field is set, when the import is finished, a notification is sent to specified Pub/Sub topic. The message data is JSON string of a Operation. Format of the Pub/Sub topic is `projects/{project}/topics/{topic}`. It has to be within the same project as ImportProductsRequest.parent. Make sure that both `cloud-retail-customer-data-access@system.gserviceaccount.com` and `service-@gcp-sa-retail.iam.gserviceaccount.com` have the `pubsub.topics.publish` IAM permission on the topic. Only supported when ImportProductsRequest.reconciliation_mode is set to `FULL`. */
  notificationPubsubTopic?: string;
}

export const GoogleCloudRetailV2ImportProductsRequest: Schema.Schema<GoogleCloudRetailV2ImportProductsRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
  inputConfig: Schema.optional(GoogleCloudRetailV2ProductInputConfig),
  errorsConfig: Schema.optional(GoogleCloudRetailV2ImportErrorsConfig),
  updateMask: Schema.optional(Schema.String),
  reconciliationMode: Schema.optional(Schema.String),
  notificationPubsubTopic: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ImportProductsRequest" }) as any as Schema.Schema<GoogleCloudRetailV2ImportProductsRequest>;

export interface GoogleCloudRetailV2SetInventoryRequest {
  /** Required. The inventory information to update. The allowable fields to update are: * Product.price_info * Product.availability * Product.available_quantity * Product.fulfillment_info The updated inventory fields must be specified in SetInventoryRequest.set_mask. If SetInventoryRequest.inventory.name is empty or invalid, an INVALID_ARGUMENT error is returned. If the caller does not have permission to update the Product named in Product.name, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. If the Product to update does not have existing inventory information, the provided inventory information will be inserted. If the Product to update has existing inventory information, the provided inventory information will be merged while respecting the last update time for each inventory field, using the provided or default value for SetInventoryRequest.set_time. The caller can replace place IDs for a subset of fulfillment types in the following ways: * Adds "fulfillment_info" in SetInventoryRequest.set_mask * Specifies only the desired fulfillment types and corresponding place IDs to update in SetInventoryRequest.inventory.fulfillment_info The caller can clear all place IDs from a subset of fulfillment types in the following ways: * Adds "fulfillment_info" in SetInventoryRequest.set_mask * Specifies only the desired fulfillment types to clear in SetInventoryRequest.inventory.fulfillment_info * Checks that only the desired fulfillment info types have empty SetInventoryRequest.inventory.fulfillment_info.place_ids The last update time is recorded for the following inventory fields: * Product.price_info * Product.availability * Product.available_quantity * Product.fulfillment_info If a full overwrite of inventory information while ignoring timestamps is needed, ProductService.UpdateProduct should be invoked instead. */
  inventory?: GoogleCloudRetailV2Product;
  /** Indicates which inventory fields in the provided Product to update. At least one field must be provided. If an unsupported or unknown field is provided, an INVALID_ARGUMENT error is returned and the entire update will be ignored. */
  setMask?: string;
  /** The time when the request is issued, used to prevent out-of-order updates on inventory fields with the last update time recorded. If not provided, the internal system time will be used. */
  setTime?: string;
  /** If set to true, and the Product with name Product.name is not found, the inventory update will still be processed and retained for at most 1 day until the Product is created. If set to false, a NOT_FOUND error is returned if the Product is not found. */
  allowMissing?: boolean;
}

export const GoogleCloudRetailV2SetInventoryRequest: Schema.Schema<GoogleCloudRetailV2SetInventoryRequest> = Schema.suspend(() => Schema.Struct({
  inventory: Schema.optional(GoogleCloudRetailV2Product),
  setMask: Schema.optional(Schema.String),
  setTime: Schema.optional(Schema.String),
  allowMissing: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2SetInventoryRequest" }) as any as Schema.Schema<GoogleCloudRetailV2SetInventoryRequest>;

export interface GoogleCloudRetailV2AddFulfillmentPlacesRequest {
  /** Required. The fulfillment type, including commonly used types (such as pickup in store and same day delivery), and custom types. Supported values: * "pickup-in-store" * "ship-to-store" * "same-day-delivery" * "next-day-delivery" * "custom-type-1" * "custom-type-2" * "custom-type-3" * "custom-type-4" * "custom-type-5" If this field is set to an invalid value other than these, an INVALID_ARGUMENT error is returned. This field directly corresponds to Product.fulfillment_info.type. */
  type?: string;
  /** Required. The IDs for this type, such as the store IDs for "pickup-in-store" or the region IDs for "same-day-delivery" to be added for this type. Duplicate IDs will be automatically ignored. At least 1 value is required, and a maximum of 2000 values are allowed. Each value must be a string with a length limit of 10 characters, matching the pattern `[a-zA-Z0-9_-]+`, such as "store1" or "REGION-2". Otherwise, an INVALID_ARGUMENT error is returned. If the total number of place IDs exceeds 2000 for this type after adding, then the update will be rejected. */
  placeIds?: Array<string>;
  /** The time when the fulfillment updates are issued, used to prevent out-of-order updates on fulfillment information. If not provided, the internal system time will be used. */
  addTime?: string;
  /** If set to true, and the Product is not found, the fulfillment information will still be processed and retained for at most 1 day and processed once the Product is created. If set to false, a NOT_FOUND error is returned if the Product is not found. */
  allowMissing?: boolean;
}

export const GoogleCloudRetailV2AddFulfillmentPlacesRequest: Schema.Schema<GoogleCloudRetailV2AddFulfillmentPlacesRequest> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  placeIds: Schema.optional(Schema.Array(Schema.String)),
  addTime: Schema.optional(Schema.String),
  allowMissing: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2AddFulfillmentPlacesRequest" }) as any as Schema.Schema<GoogleCloudRetailV2AddFulfillmentPlacesRequest>;

export interface GoogleCloudRetailV2RemoveFulfillmentPlacesRequest {
  /** Required. The fulfillment type, including commonly used types (such as pickup in store and same day delivery), and custom types. Supported values: * "pickup-in-store" * "ship-to-store" * "same-day-delivery" * "next-day-delivery" * "custom-type-1" * "custom-type-2" * "custom-type-3" * "custom-type-4" * "custom-type-5" If this field is set to an invalid value other than these, an INVALID_ARGUMENT error is returned. This field directly corresponds to Product.fulfillment_info.type. */
  type?: string;
  /** Required. The IDs for this type, such as the store IDs for "pickup-in-store" or the region IDs for "same-day-delivery", to be removed for this type. At least 1 value is required, and a maximum of 2000 values are allowed. Each value must be a string with a length limit of 10 characters, matching the pattern `[a-zA-Z0-9_-]+`, such as "store1" or "REGION-2". Otherwise, an INVALID_ARGUMENT error is returned. */
  placeIds?: Array<string>;
  /** The time when the fulfillment updates are issued, used to prevent out-of-order updates on fulfillment information. If not provided, the internal system time will be used. */
  removeTime?: string;
  /** If set to true, and the Product is not found, the fulfillment information will still be processed and retained for at most 1 day and processed once the Product is created. If set to false, a NOT_FOUND error is returned if the Product is not found. */
  allowMissing?: boolean;
}

export const GoogleCloudRetailV2RemoveFulfillmentPlacesRequest: Schema.Schema<GoogleCloudRetailV2RemoveFulfillmentPlacesRequest> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  placeIds: Schema.optional(Schema.Array(Schema.String)),
  removeTime: Schema.optional(Schema.String),
  allowMissing: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2RemoveFulfillmentPlacesRequest" }) as any as Schema.Schema<GoogleCloudRetailV2RemoveFulfillmentPlacesRequest>;

export interface GoogleCloudRetailV2AddLocalInventoriesRequest {
  /** Required. A list of inventory information at difference places. Each place is identified by its place ID. At most 3000 inventories are allowed per request. */
  localInventories?: Array<GoogleCloudRetailV2LocalInventory>;
  /** Indicates which inventory fields in the provided list of LocalInventory to update. The field is updated to the provided value. If a field is set while the place does not have a previous local inventory, the local inventory at that store is created. If a field is set while the value of that field is not provided, the original field value, if it exists, is deleted. If the mask is not set or set with empty paths, all inventory fields will be updated. If an unsupported or unknown field is provided, an INVALID_ARGUMENT error is returned and the entire update will be ignored. */
  addMask?: string;
  /** The time when the inventory updates are issued. Used to prevent out-of-order updates on local inventory fields. If not provided, the internal system time will be used. */
  addTime?: string;
  /** If set to true, and the Product is not found, the local inventory will still be processed and retained for at most 1 day and processed once the Product is created. If set to false, a NOT_FOUND error is returned if the Product is not found. */
  allowMissing?: boolean;
}

export const GoogleCloudRetailV2AddLocalInventoriesRequest: Schema.Schema<GoogleCloudRetailV2AddLocalInventoriesRequest> = Schema.suspend(() => Schema.Struct({
  localInventories: Schema.optional(Schema.Array(GoogleCloudRetailV2LocalInventory)),
  addMask: Schema.optional(Schema.String),
  addTime: Schema.optional(Schema.String),
  allowMissing: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2AddLocalInventoriesRequest" }) as any as Schema.Schema<GoogleCloudRetailV2AddLocalInventoriesRequest>;

export interface GoogleCloudRetailV2RemoveLocalInventoriesRequest {
  /** Required. A list of place IDs to have their inventory deleted. At most 3000 place IDs are allowed per request. */
  placeIds?: Array<string>;
  /** The time when the inventory deletions are issued. Used to prevent out-of-order updates and deletions on local inventory fields. If not provided, the internal system time will be used. */
  removeTime?: string;
  /** If set to true, and the Product is not found, the local inventory removal request will still be processed and retained for at most 1 day and processed once the Product is created. If set to false, a NOT_FOUND error is returned if the Product is not found. */
  allowMissing?: boolean;
}

export const GoogleCloudRetailV2RemoveLocalInventoriesRequest: Schema.Schema<GoogleCloudRetailV2RemoveLocalInventoriesRequest> = Schema.suspend(() => Schema.Struct({
  placeIds: Schema.optional(Schema.Array(Schema.String)),
  removeTime: Schema.optional(Schema.String),
  allowMissing: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudRetailV2RemoveLocalInventoriesRequest" }) as any as Schema.Schema<GoogleCloudRetailV2RemoveLocalInventoriesRequest>;

export interface GoogleCloudRetailV2ServingConfig {
  /** Immutable. Fully qualified name `projects/* /locations/global/catalogs/* /servingConfig/*` */
  name?: string;
  /** Required. The human readable serving config display name. Used in Retail UI. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. */
  displayName?: string;
  /** The id of the model in the same Catalog to use at serving time. Currently only RecommendationModels are supported: https://cloud.google.com/retail/recommendations-ai/docs/create-models Can be changed but only to a compatible model (e.g. others-you-may-like CTR to others-you-may-like CVR). Required when solution_types is SOLUTION_TYPE_RECOMMENDATION. */
  modelId?: string;
  /** How much price ranking we want in serving results. Price reranking causes product items with a similar recommendation probability to be ordered by price, with the highest-priced items first. This setting could result in a decrease in click-through and conversion rates. Allowed values are: * `no-price-reranking` * `low-price-reranking` * `medium-price-reranking` * `high-price-reranking` If not specified, we choose default based on model type. Default value: `no-price-reranking`. Can only be set if solution_types is SOLUTION_TYPE_RECOMMENDATION. */
  priceRerankingLevel?: string;
  /** Facet specifications for faceted search. If empty, no facets are returned. The ids refer to the ids of Control resources with only the Facet control set. These controls are assumed to be in the same Catalog as the ServingConfig. A maximum of 100 values are allowed. Otherwise, an INVALID_ARGUMENT error is returned. Can only be set if solution_types is SOLUTION_TYPE_SEARCH. */
  facetControlIds?: Array<string>;
  /** The specification for dynamically generated facets. Notice that only textual facets can be dynamically generated. Can only be set if solution_types is SOLUTION_TYPE_SEARCH. */
  dynamicFacetSpec?: GoogleCloudRetailV2SearchRequestDynamicFacetSpec;
  /** Condition boost specifications. If a product matches multiple conditions in the specifications, boost scores from these specifications are all applied and combined in a non-linear way. Maximum number of specifications is 100. Notice that if both ServingConfig.boost_control_ids and SearchRequest.boost_spec are set, the boost conditions from both places are evaluated. If a search request matches multiple boost conditions, the final boost score is equal to the sum of the boost scores from all matched boost conditions. Can only be set if solution_types is SOLUTION_TYPE_SEARCH. */
  boostControlIds?: Array<string>;
  /** Condition filter specifications. If a product matches multiple conditions in the specifications, filters from these specifications are all applied and combined via the AND operator. Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH. */
  filterControlIds?: Array<string>;
  /** Condition redirect specifications. Only the first triggered redirect action is applied, even if multiple apply. Maximum number of specifications is 1000. Can only be set if solution_types is SOLUTION_TYPE_SEARCH. */
  redirectControlIds?: Array<string>;
  /** Condition synonyms specifications. If multiple syonyms conditions match, all matching synonyms control in the list will execute. Order of controls in the list will not matter. Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH. */
  twowaySynonymsControlIds?: Array<string>;
  /** Condition oneway synonyms specifications. If multiple oneway synonyms conditions match, all matching oneway synonyms controls in the list will execute. Order of controls in the list will not matter. Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH. */
  onewaySynonymsControlIds?: Array<string>;
  /** Condition do not associate specifications. If multiple do not associate conditions match, all matching do not associate controls in the list will execute. - Order does not matter. - Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH. */
  doNotAssociateControlIds?: Array<string>;
  /** Condition replacement specifications. - Applied according to the order in the list. - A previously replaced term can not be re-replaced. - Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH. */
  replacementControlIds?: Array<string>;
  /** Condition ignore specifications. If multiple ignore conditions match, all matching ignore controls in the list will execute. - Order does not matter. - Maximum number of specifications is 100. Can only be set if solution_types is SOLUTION_TYPE_SEARCH. */
  ignoreControlIds?: Array<string>;
  /** How much diversity to use in recommendation model results e.g. `medium-diversity` or `high-diversity`. Currently supported values: * `no-diversity` * `low-diversity` * `medium-diversity` * `high-diversity` * `auto-diversity` If not specified, we choose default based on recommendation model type. Default value: `no-diversity`. Can only be set if solution_types is SOLUTION_TYPE_RECOMMENDATION. */
  diversityLevel?: string;
  /** What kind of diversity to use - data driven or rule based. If unset, the server behavior defaults to RULE_BASED_DIVERSITY. */
  diversityType?: "DIVERSITY_TYPE_UNSPECIFIED" | "RULE_BASED_DIVERSITY" | "DATA_DRIVEN_DIVERSITY" | (string & {});
  /** Whether to add additional category filters on the `similar-items` model. If not specified, we enable it by default. Allowed values are: * `no-category-match`: No additional filtering of original results from the model and the customer's filters. * `relaxed-category-match`: Only keep results with categories that match at least one item categories in the PredictRequests's context item. * If customer also sends filters in the PredictRequest, then the results will satisfy both conditions (user given and category match). Can only be set if solution_types is SOLUTION_TYPE_RECOMMENDATION. */
  enableCategoryFilterLevel?: string;
  /** When the flag is enabled, the products in the denylist will not be filtered out in the recommendation filtering results. */
  ignoreRecsDenylist?: boolean;
  /** The specification for personalization spec. Can only be set if solution_types is SOLUTION_TYPE_SEARCH. Notice that if both ServingConfig.personalization_spec and SearchRequest.personalization_spec are set. SearchRequest.personalization_spec will override ServingConfig.personalization_spec. */
  personalizationSpec?: GoogleCloudRetailV2SearchRequestPersonalizationSpec;
  /** Required. Immutable. Specifies the solution types that a serving config can be associated with. Currently we support setting only one type of solution. */
  solutionTypes?: Array<"SOLUTION_TYPE_UNSPECIFIED" | "SOLUTION_TYPE_RECOMMENDATION" | "SOLUTION_TYPE_SEARCH" | (string & {})>;
}

export const GoogleCloudRetailV2ServingConfig: Schema.Schema<GoogleCloudRetailV2ServingConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  modelId: Schema.optional(Schema.String),
  priceRerankingLevel: Schema.optional(Schema.String),
  facetControlIds: Schema.optional(Schema.Array(Schema.String)),
  dynamicFacetSpec: Schema.optional(GoogleCloudRetailV2SearchRequestDynamicFacetSpec),
  boostControlIds: Schema.optional(Schema.Array(Schema.String)),
  filterControlIds: Schema.optional(Schema.Array(Schema.String)),
  redirectControlIds: Schema.optional(Schema.Array(Schema.String)),
  twowaySynonymsControlIds: Schema.optional(Schema.Array(Schema.String)),
  onewaySynonymsControlIds: Schema.optional(Schema.Array(Schema.String)),
  doNotAssociateControlIds: Schema.optional(Schema.Array(Schema.String)),
  replacementControlIds: Schema.optional(Schema.Array(Schema.String)),
  ignoreControlIds: Schema.optional(Schema.Array(Schema.String)),
  diversityLevel: Schema.optional(Schema.String),
  diversityType: Schema.optional(Schema.String),
  enableCategoryFilterLevel: Schema.optional(Schema.String),
  ignoreRecsDenylist: Schema.optional(Schema.Boolean),
  personalizationSpec: Schema.optional(GoogleCloudRetailV2SearchRequestPersonalizationSpec),
  solutionTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2ServingConfig" }) as any as Schema.Schema<GoogleCloudRetailV2ServingConfig>;

export interface GoogleCloudRetailV2ListServingConfigsResponse {
  /** All the ServingConfigs for a given catalog. */
  servingConfigs?: Array<GoogleCloudRetailV2ServingConfig>;
  /** Pagination token, if not returned indicates the last page. */
  nextPageToken?: string;
}

export const GoogleCloudRetailV2ListServingConfigsResponse: Schema.Schema<GoogleCloudRetailV2ListServingConfigsResponse> = Schema.suspend(() => Schema.Struct({
  servingConfigs: Schema.optional(Schema.Array(GoogleCloudRetailV2ServingConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ListServingConfigsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2ListServingConfigsResponse>;

export interface GoogleCloudRetailV2AddControlRequest {
  /** Required. The id of the control to apply. Assumed to be in the same catalog as the serving config - if id is not found a NOT_FOUND error is returned. */
  controlId?: string;
}

export const GoogleCloudRetailV2AddControlRequest: Schema.Schema<GoogleCloudRetailV2AddControlRequest> = Schema.suspend(() => Schema.Struct({
  controlId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2AddControlRequest" }) as any as Schema.Schema<GoogleCloudRetailV2AddControlRequest>;

export interface GoogleCloudRetailV2RemoveControlRequest {
  /** Required. The id of the control to apply. Assumed to be in the same catalog as the serving config. */
  controlId?: string;
}

export const GoogleCloudRetailV2RemoveControlRequest: Schema.Schema<GoogleCloudRetailV2RemoveControlRequest> = Schema.suspend(() => Schema.Struct({
  controlId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2RemoveControlRequest" }) as any as Schema.Schema<GoogleCloudRetailV2RemoveControlRequest>;

export interface GoogleCloudRetailLoggingServiceContext {
  /** An identifier of the service. For example, "retail.googleapis.com". */
  service?: string;
}

export const GoogleCloudRetailLoggingServiceContext: Schema.Schema<GoogleCloudRetailLoggingServiceContext> = Schema.suspend(() => Schema.Struct({
  service: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailLoggingServiceContext" }) as any as Schema.Schema<GoogleCloudRetailLoggingServiceContext>;

export interface GoogleCloudRetailLoggingHttpRequestContext {
  /** The HTTP response status code for the request. */
  responseStatusCode?: number;
}

export const GoogleCloudRetailLoggingHttpRequestContext: Schema.Schema<GoogleCloudRetailLoggingHttpRequestContext> = Schema.suspend(() => Schema.Struct({
  responseStatusCode: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleCloudRetailLoggingHttpRequestContext" }) as any as Schema.Schema<GoogleCloudRetailLoggingHttpRequestContext>;

export interface GoogleCloudRetailLoggingSourceLocation {
  /** Human-readable name of a function or method. For example, "google.cloud.retail.v2.UserEventService.ImportUserEvents". */
  functionName?: string;
}

export const GoogleCloudRetailLoggingSourceLocation: Schema.Schema<GoogleCloudRetailLoggingSourceLocation> = Schema.suspend(() => Schema.Struct({
  functionName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailLoggingSourceLocation" }) as any as Schema.Schema<GoogleCloudRetailLoggingSourceLocation>;

export interface GoogleCloudRetailLoggingErrorContext {
  /** The HTTP request which was processed when the error was triggered. */
  httpRequest?: GoogleCloudRetailLoggingHttpRequestContext;
  /** The location in the source code where the decision was made to report the error, usually the place where it was logged. */
  reportLocation?: GoogleCloudRetailLoggingSourceLocation;
}

export const GoogleCloudRetailLoggingErrorContext: Schema.Schema<GoogleCloudRetailLoggingErrorContext> = Schema.suspend(() => Schema.Struct({
  httpRequest: Schema.optional(GoogleCloudRetailLoggingHttpRequestContext),
  reportLocation: Schema.optional(GoogleCloudRetailLoggingSourceLocation),
})).annotate({ identifier: "GoogleCloudRetailLoggingErrorContext" }) as any as Schema.Schema<GoogleCloudRetailLoggingErrorContext>;

export interface GoogleCloudRetailLoggingImportErrorContext {
  /** The operation resource name of the LRO. */
  operationName?: string;
  /** Cloud Storage file path of the import source. Can be set for batch operation error. */
  gcsPath?: string;
  /** Line number of the content in file. Should be empty for permission or batch operation error. */
  lineNumber?: string;
  /** The detailed content which caused the error on importing a catalog item. */
  catalogItem?: string;
  /** The detailed content which caused the error on importing a product. */
  product?: string;
  /** The detailed content which caused the error on importing a user event. */
  userEvent?: string;
}

export const GoogleCloudRetailLoggingImportErrorContext: Schema.Schema<GoogleCloudRetailLoggingImportErrorContext> = Schema.suspend(() => Schema.Struct({
  operationName: Schema.optional(Schema.String),
  gcsPath: Schema.optional(Schema.String),
  lineNumber: Schema.optional(Schema.String),
  catalogItem: Schema.optional(Schema.String),
  product: Schema.optional(Schema.String),
  userEvent: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailLoggingImportErrorContext" }) as any as Schema.Schema<GoogleCloudRetailLoggingImportErrorContext>;

export interface GoogleCloudRetailLoggingErrorLog {
  /** The service context in which this error has occurred. */
  serviceContext?: GoogleCloudRetailLoggingServiceContext;
  /** A description of the context in which the error occurred. */
  context?: GoogleCloudRetailLoggingErrorContext;
  /** A message describing the error. */
  message?: string;
  /** The RPC status associated with the error log. */
  status?: GoogleRpcStatus;
  /** The API request payload, represented as a protocol buffer. Most API request types are supported. For example: "type.googleapis.com/google.cloud.retail.v2.ProductService.CreateProductRequest" "type.googleapis.com/google.cloud.retail.v2.UserEventService.WriteUserEventRequest" */
  requestPayload?: Record<string, unknown>;
  /** The API response payload, represented as a protocol buffer. This is used to log some "soft errors", where the response is valid but we consider there are some quality issues like unjoined events. The following API responses are supported and no PII is included: "google.cloud.retail.v2.PredictionService.Predict" "google.cloud.retail.v2.UserEventService.WriteUserEvent" "google.cloud.retail.v2.UserEventService.CollectUserEvent" */
  responsePayload?: Record<string, unknown>;
  /** The error payload that is populated on LRO import APIs. */
  importPayload?: GoogleCloudRetailLoggingImportErrorContext;
}

export const GoogleCloudRetailLoggingErrorLog: Schema.Schema<GoogleCloudRetailLoggingErrorLog> = Schema.suspend(() => Schema.Struct({
  serviceContext: Schema.optional(GoogleCloudRetailLoggingServiceContext),
  context: Schema.optional(GoogleCloudRetailLoggingErrorContext),
  message: Schema.optional(Schema.String),
  status: Schema.optional(GoogleRpcStatus),
  requestPayload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  responsePayload: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  importPayload: Schema.optional(GoogleCloudRetailLoggingImportErrorContext),
})).annotate({ identifier: "GoogleCloudRetailLoggingErrorLog" }) as any as Schema.Schema<GoogleCloudRetailLoggingErrorLog>;

export interface GoogleCloudRetailV2AddFulfillmentPlacesMetadata {
}

export const GoogleCloudRetailV2AddFulfillmentPlacesMetadata: Schema.Schema<GoogleCloudRetailV2AddFulfillmentPlacesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2AddFulfillmentPlacesMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2AddFulfillmentPlacesMetadata>;

export interface GoogleCloudRetailV2AddFulfillmentPlacesResponse {
}

export const GoogleCloudRetailV2AddFulfillmentPlacesResponse: Schema.Schema<GoogleCloudRetailV2AddFulfillmentPlacesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2AddFulfillmentPlacesResponse" }) as any as Schema.Schema<GoogleCloudRetailV2AddFulfillmentPlacesResponse>;

export interface GoogleCloudRetailV2AddLocalInventoriesMetadata {
}

export const GoogleCloudRetailV2AddLocalInventoriesMetadata: Schema.Schema<GoogleCloudRetailV2AddLocalInventoriesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2AddLocalInventoriesMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2AddLocalInventoriesMetadata>;

export interface GoogleCloudRetailV2AddLocalInventoriesResponse {
}

export const GoogleCloudRetailV2AddLocalInventoriesResponse: Schema.Schema<GoogleCloudRetailV2AddLocalInventoriesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2AddLocalInventoriesResponse" }) as any as Schema.Schema<GoogleCloudRetailV2AddLocalInventoriesResponse>;

export interface GoogleCloudRetailV2CreateModelMetadata {
  /** The resource name of the model that this create applies to. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}` */
  model?: string;
}

export const GoogleCloudRetailV2CreateModelMetadata: Schema.Schema<GoogleCloudRetailV2CreateModelMetadata> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2CreateModelMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2CreateModelMetadata>;

export interface GoogleCloudRetailV2ExportErrorsConfig {
  /** Google Cloud Storage path for import errors. This must be an empty, existing Cloud Storage bucket. Export errors will be written to a file in this bucket, one per line, as a JSON-encoded `google.rpc.Status` message. */
  gcsPrefix?: string;
}

export const GoogleCloudRetailV2ExportErrorsConfig: Schema.Schema<GoogleCloudRetailV2ExportErrorsConfig> = Schema.suspend(() => Schema.Struct({
  gcsPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ExportErrorsConfig" }) as any as Schema.Schema<GoogleCloudRetailV2ExportErrorsConfig>;

export interface GoogleCloudRetailV2BigQueryOutputResult {
  /** The ID of a BigQuery Dataset. */
  datasetId?: string;
  /** The ID of a BigQuery Table. */
  tableId?: string;
}

export const GoogleCloudRetailV2BigQueryOutputResult: Schema.Schema<GoogleCloudRetailV2BigQueryOutputResult> = Schema.suspend(() => Schema.Struct({
  datasetId: Schema.optional(Schema.String),
  tableId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2BigQueryOutputResult" }) as any as Schema.Schema<GoogleCloudRetailV2BigQueryOutputResult>;

export interface GoogleCloudRetailV2GcsOutputResult {
  /** The uri of Gcs output */
  outputUri?: string;
}

export const GoogleCloudRetailV2GcsOutputResult: Schema.Schema<GoogleCloudRetailV2GcsOutputResult> = Schema.suspend(() => Schema.Struct({
  outputUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2GcsOutputResult" }) as any as Schema.Schema<GoogleCloudRetailV2GcsOutputResult>;

export interface GoogleCloudRetailV2OutputResult {
  /** The BigQuery location where the result is stored. */
  bigqueryResult?: Array<GoogleCloudRetailV2BigQueryOutputResult>;
  /** The Google Cloud Storage location where the result is stored. */
  gcsResult?: Array<GoogleCloudRetailV2GcsOutputResult>;
}

export const GoogleCloudRetailV2OutputResult: Schema.Schema<GoogleCloudRetailV2OutputResult> = Schema.suspend(() => Schema.Struct({
  bigqueryResult: Schema.optional(Schema.Array(GoogleCloudRetailV2BigQueryOutputResult)),
  gcsResult: Schema.optional(Schema.Array(GoogleCloudRetailV2GcsOutputResult)),
})).annotate({ identifier: "GoogleCloudRetailV2OutputResult" }) as any as Schema.Schema<GoogleCloudRetailV2OutputResult>;

export interface GoogleCloudRetailV2ExportAnalyticsMetricsResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
  /** This field is never set. */
  errorsConfig?: GoogleCloudRetailV2ExportErrorsConfig;
  /** Output result indicating where the data were exported to. */
  outputResult?: GoogleCloudRetailV2OutputResult;
}

export const GoogleCloudRetailV2ExportAnalyticsMetricsResponse: Schema.Schema<GoogleCloudRetailV2ExportAnalyticsMetricsResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
  errorsConfig: Schema.optional(GoogleCloudRetailV2ExportErrorsConfig),
  outputResult: Schema.optional(GoogleCloudRetailV2OutputResult),
})).annotate({ identifier: "GoogleCloudRetailV2ExportAnalyticsMetricsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2ExportAnalyticsMetricsResponse>;

export interface GoogleCloudRetailV2ExportMetadata {
  /** Operation create time. */
  createTime?: string;
  /** Operation last update time. If the operation is done, this is also the finish time. */
  updateTime?: string;
}

export const GoogleCloudRetailV2ExportMetadata: Schema.Schema<GoogleCloudRetailV2ExportMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ExportMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2ExportMetadata>;

export interface GoogleCloudRetailV2ImportCompletionDataResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
}

export const GoogleCloudRetailV2ImportCompletionDataResponse: Schema.Schema<GoogleCloudRetailV2ImportCompletionDataResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
})).annotate({ identifier: "GoogleCloudRetailV2ImportCompletionDataResponse" }) as any as Schema.Schema<GoogleCloudRetailV2ImportCompletionDataResponse>;

export interface GoogleCloudRetailV2ImportMetadata {
  /** Operation create time. */
  createTime?: string;
  /** Operation last update time. If the operation is done, this is also the finish time. */
  updateTime?: string;
  /** Count of entries that were processed successfully. */
  successCount?: string;
  /** Count of entries that encountered errors while processing. */
  failureCount?: string;
  /** Deprecated. This field is never set. */
  requestId?: string;
  /** Pub/Sub topic for receiving notification. If this field is set, when the import is finished, a notification is sent to specified Pub/Sub topic. The message data is JSON string of a Operation. Format of the Pub/Sub topic is `projects/{project}/topics/{topic}`. */
  notificationPubsubTopic?: string;
}

export const GoogleCloudRetailV2ImportMetadata: Schema.Schema<GoogleCloudRetailV2ImportMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  successCount: Schema.optional(Schema.String),
  failureCount: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  notificationPubsubTopic: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2ImportMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2ImportMetadata>;

export interface GoogleCloudRetailV2ImportProductsResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
  /** Echoes the destination for the complete errors in the request if set. */
  errorsConfig?: GoogleCloudRetailV2ImportErrorsConfig;
}

export const GoogleCloudRetailV2ImportProductsResponse: Schema.Schema<GoogleCloudRetailV2ImportProductsResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
  errorsConfig: Schema.optional(GoogleCloudRetailV2ImportErrorsConfig),
})).annotate({ identifier: "GoogleCloudRetailV2ImportProductsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2ImportProductsResponse>;

export interface GoogleCloudRetailV2UserEventImportSummary {
  /** Count of user events imported with complete existing catalog information. */
  joinedEventsCount?: string;
  /** Count of user events imported, but with catalog information not found in the imported catalog. */
  unjoinedEventsCount?: string;
}

export const GoogleCloudRetailV2UserEventImportSummary: Schema.Schema<GoogleCloudRetailV2UserEventImportSummary> = Schema.suspend(() => Schema.Struct({
  joinedEventsCount: Schema.optional(Schema.String),
  unjoinedEventsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2UserEventImportSummary" }) as any as Schema.Schema<GoogleCloudRetailV2UserEventImportSummary>;

export interface GoogleCloudRetailV2ImportUserEventsResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
  /** Echoes the destination for the complete errors if this field was set in the request. */
  errorsConfig?: GoogleCloudRetailV2ImportErrorsConfig;
  /** Aggregated statistics of user event import status. */
  importSummary?: GoogleCloudRetailV2UserEventImportSummary;
}

export const GoogleCloudRetailV2ImportUserEventsResponse: Schema.Schema<GoogleCloudRetailV2ImportUserEventsResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
  errorsConfig: Schema.optional(GoogleCloudRetailV2ImportErrorsConfig),
  importSummary: Schema.optional(GoogleCloudRetailV2UserEventImportSummary),
})).annotate({ identifier: "GoogleCloudRetailV2ImportUserEventsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2ImportUserEventsResponse>;

export interface GoogleCloudRetailV2PurgeMetadata {
}

export const GoogleCloudRetailV2PurgeMetadata: Schema.Schema<GoogleCloudRetailV2PurgeMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2PurgeMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2PurgeMetadata>;

export interface GoogleCloudRetailV2PurgeProductsMetadata {
  /** Operation create time. */
  createTime?: string;
  /** Operation last update time. If the operation is done, this is also the finish time. */
  updateTime?: string;
  /** Count of entries that were deleted successfully. */
  successCount?: string;
  /** Count of entries that encountered errors while processing. */
  failureCount?: string;
}

export const GoogleCloudRetailV2PurgeProductsMetadata: Schema.Schema<GoogleCloudRetailV2PurgeProductsMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  successCount: Schema.optional(Schema.String),
  failureCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2PurgeProductsMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2PurgeProductsMetadata>;

export interface GoogleCloudRetailV2PurgeProductsResponse {
  /** The total count of products purged as a result of the operation. */
  purgeCount?: string;
  /** A sample of the product names that will be deleted. Only populated if `force` is set to false. A max of 100 names will be returned and the names are chosen at random. */
  purgeSample?: Array<string>;
}

export const GoogleCloudRetailV2PurgeProductsResponse: Schema.Schema<GoogleCloudRetailV2PurgeProductsResponse> = Schema.suspend(() => Schema.Struct({
  purgeCount: Schema.optional(Schema.String),
  purgeSample: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2PurgeProductsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2PurgeProductsResponse>;

export interface GoogleCloudRetailV2PurgeUserEventsResponse {
  /** The total count of events purged as a result of the operation. */
  purgedEventsCount?: string;
}

export const GoogleCloudRetailV2PurgeUserEventsResponse: Schema.Schema<GoogleCloudRetailV2PurgeUserEventsResponse> = Schema.suspend(() => Schema.Struct({
  purgedEventsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2PurgeUserEventsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2PurgeUserEventsResponse>;

export interface GoogleCloudRetailV2RejoinUserEventsMetadata {
}

export const GoogleCloudRetailV2RejoinUserEventsMetadata: Schema.Schema<GoogleCloudRetailV2RejoinUserEventsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2RejoinUserEventsMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2RejoinUserEventsMetadata>;

export interface GoogleCloudRetailV2RejoinUserEventsResponse {
  /** Number of user events that were joined with latest product catalog. */
  rejoinedUserEventsCount?: string;
}

export const GoogleCloudRetailV2RejoinUserEventsResponse: Schema.Schema<GoogleCloudRetailV2RejoinUserEventsResponse> = Schema.suspend(() => Schema.Struct({
  rejoinedUserEventsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2RejoinUserEventsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2RejoinUserEventsResponse>;

export interface GoogleCloudRetailV2RemoveFulfillmentPlacesMetadata {
}

export const GoogleCloudRetailV2RemoveFulfillmentPlacesMetadata: Schema.Schema<GoogleCloudRetailV2RemoveFulfillmentPlacesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2RemoveFulfillmentPlacesMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2RemoveFulfillmentPlacesMetadata>;

export interface GoogleCloudRetailV2RemoveFulfillmentPlacesResponse {
}

export const GoogleCloudRetailV2RemoveFulfillmentPlacesResponse: Schema.Schema<GoogleCloudRetailV2RemoveFulfillmentPlacesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2RemoveFulfillmentPlacesResponse" }) as any as Schema.Schema<GoogleCloudRetailV2RemoveFulfillmentPlacesResponse>;

export interface GoogleCloudRetailV2RemoveLocalInventoriesMetadata {
}

export const GoogleCloudRetailV2RemoveLocalInventoriesMetadata: Schema.Schema<GoogleCloudRetailV2RemoveLocalInventoriesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2RemoveLocalInventoriesMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2RemoveLocalInventoriesMetadata>;

export interface GoogleCloudRetailV2RemoveLocalInventoriesResponse {
}

export const GoogleCloudRetailV2RemoveLocalInventoriesResponse: Schema.Schema<GoogleCloudRetailV2RemoveLocalInventoriesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2RemoveLocalInventoriesResponse" }) as any as Schema.Schema<GoogleCloudRetailV2RemoveLocalInventoriesResponse>;

export interface GoogleCloudRetailV2SetInventoryMetadata {
}

export const GoogleCloudRetailV2SetInventoryMetadata: Schema.Schema<GoogleCloudRetailV2SetInventoryMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2SetInventoryMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2SetInventoryMetadata>;

export interface GoogleCloudRetailV2SetInventoryResponse {
}

export const GoogleCloudRetailV2SetInventoryResponse: Schema.Schema<GoogleCloudRetailV2SetInventoryResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2SetInventoryResponse" }) as any as Schema.Schema<GoogleCloudRetailV2SetInventoryResponse>;

export interface GoogleCloudRetailV2TuneModelMetadata {
  /** The resource name of the model that this tune applies to. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}` */
  model?: string;
}

export const GoogleCloudRetailV2TuneModelMetadata: Schema.Schema<GoogleCloudRetailV2TuneModelMetadata> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2TuneModelMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2TuneModelMetadata>;

export interface GoogleCloudRetailV2TuneModelResponse {
}

export const GoogleCloudRetailV2TuneModelResponse: Schema.Schema<GoogleCloudRetailV2TuneModelResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2TuneModelResponse" }) as any as Schema.Schema<GoogleCloudRetailV2TuneModelResponse>;

export interface GoogleCloudRetailV2alphaAddFulfillmentPlacesMetadata {
}

export const GoogleCloudRetailV2alphaAddFulfillmentPlacesMetadata: Schema.Schema<GoogleCloudRetailV2alphaAddFulfillmentPlacesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2alphaAddFulfillmentPlacesMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2alphaAddFulfillmentPlacesMetadata>;

export interface GoogleCloudRetailV2alphaAddFulfillmentPlacesResponse {
}

export const GoogleCloudRetailV2alphaAddFulfillmentPlacesResponse: Schema.Schema<GoogleCloudRetailV2alphaAddFulfillmentPlacesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2alphaAddFulfillmentPlacesResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaAddFulfillmentPlacesResponse>;

export interface GoogleCloudRetailV2alphaAddLocalInventoriesMetadata {
}

export const GoogleCloudRetailV2alphaAddLocalInventoriesMetadata: Schema.Schema<GoogleCloudRetailV2alphaAddLocalInventoriesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2alphaAddLocalInventoriesMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2alphaAddLocalInventoriesMetadata>;

export interface GoogleCloudRetailV2alphaAddLocalInventoriesResponse {
}

export const GoogleCloudRetailV2alphaAddLocalInventoriesResponse: Schema.Schema<GoogleCloudRetailV2alphaAddLocalInventoriesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2alphaAddLocalInventoriesResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaAddLocalInventoriesResponse>;

export interface GoogleCloudRetailV2alphaCreateMerchantCenterAccountLinkMetadata {
  /** Operation create time. */
  createTime?: string;
  /** Operation last update time. If the operation is done, this is also the finish time. */
  updateTime?: string;
}

export const GoogleCloudRetailV2alphaCreateMerchantCenterAccountLinkMetadata: Schema.Schema<GoogleCloudRetailV2alphaCreateMerchantCenterAccountLinkMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaCreateMerchantCenterAccountLinkMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2alphaCreateMerchantCenterAccountLinkMetadata>;

export interface GoogleCloudRetailV2alphaCreateModelMetadata {
  /** The resource name of the model that this create applies to. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}` */
  model?: string;
}

export const GoogleCloudRetailV2alphaCreateModelMetadata: Schema.Schema<GoogleCloudRetailV2alphaCreateModelMetadata> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaCreateModelMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2alphaCreateModelMetadata>;

export interface GoogleCloudRetailV2alphaEnrollSolutionMetadata {
}

export const GoogleCloudRetailV2alphaEnrollSolutionMetadata: Schema.Schema<GoogleCloudRetailV2alphaEnrollSolutionMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2alphaEnrollSolutionMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2alphaEnrollSolutionMetadata>;

export interface GoogleCloudRetailV2alphaEnrollSolutionResponse {
  /** Retail API solution that the project has enrolled. */
  enrolledSolution?: "SOLUTION_TYPE_UNSPECIFIED" | "SOLUTION_TYPE_RECOMMENDATION" | "SOLUTION_TYPE_SEARCH" | (string & {});
}

export const GoogleCloudRetailV2alphaEnrollSolutionResponse: Schema.Schema<GoogleCloudRetailV2alphaEnrollSolutionResponse> = Schema.suspend(() => Schema.Struct({
  enrolledSolution: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaEnrollSolutionResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaEnrollSolutionResponse>;

export interface GoogleCloudRetailV2alphaExportErrorsConfig {
  /** Google Cloud Storage path for import errors. This must be an empty, existing Cloud Storage bucket. Export errors will be written to a file in this bucket, one per line, as a JSON-encoded `google.rpc.Status` message. */
  gcsPrefix?: string;
}

export const GoogleCloudRetailV2alphaExportErrorsConfig: Schema.Schema<GoogleCloudRetailV2alphaExportErrorsConfig> = Schema.suspend(() => Schema.Struct({
  gcsPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaExportErrorsConfig" }) as any as Schema.Schema<GoogleCloudRetailV2alphaExportErrorsConfig>;

export interface GoogleCloudRetailV2alphaBigQueryOutputResult {
  /** The ID of a BigQuery Dataset. */
  datasetId?: string;
  /** The ID of a BigQuery Table. */
  tableId?: string;
}

export const GoogleCloudRetailV2alphaBigQueryOutputResult: Schema.Schema<GoogleCloudRetailV2alphaBigQueryOutputResult> = Schema.suspend(() => Schema.Struct({
  datasetId: Schema.optional(Schema.String),
  tableId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaBigQueryOutputResult" }) as any as Schema.Schema<GoogleCloudRetailV2alphaBigQueryOutputResult>;

export interface GoogleCloudRetailV2alphaGcsOutputResult {
  /** The uri of Gcs output */
  outputUri?: string;
}

export const GoogleCloudRetailV2alphaGcsOutputResult: Schema.Schema<GoogleCloudRetailV2alphaGcsOutputResult> = Schema.suspend(() => Schema.Struct({
  outputUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaGcsOutputResult" }) as any as Schema.Schema<GoogleCloudRetailV2alphaGcsOutputResult>;

export interface GoogleCloudRetailV2alphaOutputResult {
  /** The BigQuery location where the result is stored. */
  bigqueryResult?: Array<GoogleCloudRetailV2alphaBigQueryOutputResult>;
  /** The Google Cloud Storage location where the result is stored. */
  gcsResult?: Array<GoogleCloudRetailV2alphaGcsOutputResult>;
}

export const GoogleCloudRetailV2alphaOutputResult: Schema.Schema<GoogleCloudRetailV2alphaOutputResult> = Schema.suspend(() => Schema.Struct({
  bigqueryResult: Schema.optional(Schema.Array(GoogleCloudRetailV2alphaBigQueryOutputResult)),
  gcsResult: Schema.optional(Schema.Array(GoogleCloudRetailV2alphaGcsOutputResult)),
})).annotate({ identifier: "GoogleCloudRetailV2alphaOutputResult" }) as any as Schema.Schema<GoogleCloudRetailV2alphaOutputResult>;

export interface GoogleCloudRetailV2alphaExportAnalyticsMetricsResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
  /** This field is never set. */
  errorsConfig?: GoogleCloudRetailV2alphaExportErrorsConfig;
  /** Output result indicating where the data were exported to. */
  outputResult?: GoogleCloudRetailV2alphaOutputResult;
}

export const GoogleCloudRetailV2alphaExportAnalyticsMetricsResponse: Schema.Schema<GoogleCloudRetailV2alphaExportAnalyticsMetricsResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
  errorsConfig: Schema.optional(GoogleCloudRetailV2alphaExportErrorsConfig),
  outputResult: Schema.optional(GoogleCloudRetailV2alphaOutputResult),
})).annotate({ identifier: "GoogleCloudRetailV2alphaExportAnalyticsMetricsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaExportAnalyticsMetricsResponse>;

export interface GoogleCloudRetailV2alphaExportMetadata {
  /** Operation create time. */
  createTime?: string;
  /** Operation last update time. If the operation is done, this is also the finish time. */
  updateTime?: string;
}

export const GoogleCloudRetailV2alphaExportMetadata: Schema.Schema<GoogleCloudRetailV2alphaExportMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaExportMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2alphaExportMetadata>;

export interface GoogleCloudRetailV2alphaExportProductsResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
  /** This field is never set. */
  errorsConfig?: GoogleCloudRetailV2alphaExportErrorsConfig;
  /** Output result indicating where the data were exported to. */
  outputResult?: GoogleCloudRetailV2alphaOutputResult;
}

export const GoogleCloudRetailV2alphaExportProductsResponse: Schema.Schema<GoogleCloudRetailV2alphaExportProductsResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
  errorsConfig: Schema.optional(GoogleCloudRetailV2alphaExportErrorsConfig),
  outputResult: Schema.optional(GoogleCloudRetailV2alphaOutputResult),
})).annotate({ identifier: "GoogleCloudRetailV2alphaExportProductsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaExportProductsResponse>;

export interface GoogleCloudRetailV2alphaExportUserEventsResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
  /** This field is never set. */
  errorsConfig?: GoogleCloudRetailV2alphaExportErrorsConfig;
  /** Output result indicating where the data were exported to. */
  outputResult?: GoogleCloudRetailV2alphaOutputResult;
}

export const GoogleCloudRetailV2alphaExportUserEventsResponse: Schema.Schema<GoogleCloudRetailV2alphaExportUserEventsResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
  errorsConfig: Schema.optional(GoogleCloudRetailV2alphaExportErrorsConfig),
  outputResult: Schema.optional(GoogleCloudRetailV2alphaOutputResult),
})).annotate({ identifier: "GoogleCloudRetailV2alphaExportUserEventsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaExportUserEventsResponse>;

export interface GoogleCloudRetailV2alphaImportCompletionDataResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
}

export const GoogleCloudRetailV2alphaImportCompletionDataResponse: Schema.Schema<GoogleCloudRetailV2alphaImportCompletionDataResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
})).annotate({ identifier: "GoogleCloudRetailV2alphaImportCompletionDataResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaImportCompletionDataResponse>;

export interface GoogleCloudRetailV2alphaImportErrorsConfig {
  /** Google Cloud Storage prefix for import errors. This must be an empty, existing Cloud Storage directory. Import errors are written to sharded files in this directory, one per line, as a JSON-encoded `google.rpc.Status` message. */
  gcsPrefix?: string;
}

export const GoogleCloudRetailV2alphaImportErrorsConfig: Schema.Schema<GoogleCloudRetailV2alphaImportErrorsConfig> = Schema.suspend(() => Schema.Struct({
  gcsPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaImportErrorsConfig" }) as any as Schema.Schema<GoogleCloudRetailV2alphaImportErrorsConfig>;

export interface GoogleCloudRetailV2alphaTransformedUserEventsMetadata {
  /** Count of entries in the source user events BigQuery table. */
  sourceEventsCount?: string;
  /** Count of entries in the transformed user events BigQuery table, which could be different from the actually imported number of user events. */
  transformedEventsCount?: string;
}

export const GoogleCloudRetailV2alphaTransformedUserEventsMetadata: Schema.Schema<GoogleCloudRetailV2alphaTransformedUserEventsMetadata> = Schema.suspend(() => Schema.Struct({
  sourceEventsCount: Schema.optional(Schema.String),
  transformedEventsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaTransformedUserEventsMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2alphaTransformedUserEventsMetadata>;

export interface GoogleCloudRetailV2alphaImportMetadata {
  /** Operation create time. */
  createTime?: string;
  /** Operation last update time. If the operation is done, this is also the finish time. */
  updateTime?: string;
  /** Count of entries that were processed successfully. */
  successCount?: string;
  /** Count of entries that encountered errors while processing. */
  failureCount?: string;
  /** Deprecated. This field is never set. */
  requestId?: string;
  /** Pub/Sub topic for receiving notification. If this field is set, when the import is finished, a notification is sent to specified Pub/Sub topic. The message data is JSON string of a Operation. Format of the Pub/Sub topic is `projects/{project}/topics/{topic}`. */
  notificationPubsubTopic?: string;
  /** Metadata related to transform user events. */
  transformedUserEventsMetadata?: GoogleCloudRetailV2alphaTransformedUserEventsMetadata;
}

export const GoogleCloudRetailV2alphaImportMetadata: Schema.Schema<GoogleCloudRetailV2alphaImportMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  successCount: Schema.optional(Schema.String),
  failureCount: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  notificationPubsubTopic: Schema.optional(Schema.String),
  transformedUserEventsMetadata: Schema.optional(GoogleCloudRetailV2alphaTransformedUserEventsMetadata),
})).annotate({ identifier: "GoogleCloudRetailV2alphaImportMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2alphaImportMetadata>;

export interface GoogleCloudRetailV2alphaImportProductsResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
  /** Echoes the destination for the complete errors in the request if set. */
  errorsConfig?: GoogleCloudRetailV2alphaImportErrorsConfig;
}

export const GoogleCloudRetailV2alphaImportProductsResponse: Schema.Schema<GoogleCloudRetailV2alphaImportProductsResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
  errorsConfig: Schema.optional(GoogleCloudRetailV2alphaImportErrorsConfig),
})).annotate({ identifier: "GoogleCloudRetailV2alphaImportProductsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaImportProductsResponse>;

export interface GoogleCloudRetailV2alphaUserEventImportSummary {
  /** Count of user events imported with complete existing catalog information. */
  joinedEventsCount?: string;
  /** Count of user events imported, but with catalog information not found in the imported catalog. */
  unjoinedEventsCount?: string;
}

export const GoogleCloudRetailV2alphaUserEventImportSummary: Schema.Schema<GoogleCloudRetailV2alphaUserEventImportSummary> = Schema.suspend(() => Schema.Struct({
  joinedEventsCount: Schema.optional(Schema.String),
  unjoinedEventsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaUserEventImportSummary" }) as any as Schema.Schema<GoogleCloudRetailV2alphaUserEventImportSummary>;

export interface GoogleCloudRetailV2alphaImportUserEventsResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
  /** Echoes the destination for the complete errors if this field was set in the request. */
  errorsConfig?: GoogleCloudRetailV2alphaImportErrorsConfig;
  /** Aggregated statistics of user event import status. */
  importSummary?: GoogleCloudRetailV2alphaUserEventImportSummary;
}

export const GoogleCloudRetailV2alphaImportUserEventsResponse: Schema.Schema<GoogleCloudRetailV2alphaImportUserEventsResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
  errorsConfig: Schema.optional(GoogleCloudRetailV2alphaImportErrorsConfig),
  importSummary: Schema.optional(GoogleCloudRetailV2alphaUserEventImportSummary),
})).annotate({ identifier: "GoogleCloudRetailV2alphaImportUserEventsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaImportUserEventsResponse>;

export interface GoogleCloudRetailV2alphaMerchantCenterAccountLinkMerchantCenterFeedFilter {
  /** Merchant Center primary feed ID. Deprecated: use data_source_id instead. */
  primaryFeedId?: string;
  /** AFM data source ID. */
  dataSourceId?: string;
  /** Merchant Center primary feed name. The name is used for the display purposes only. */
  primaryFeedName?: string;
}

export const GoogleCloudRetailV2alphaMerchantCenterAccountLinkMerchantCenterFeedFilter: Schema.Schema<GoogleCloudRetailV2alphaMerchantCenterAccountLinkMerchantCenterFeedFilter> = Schema.suspend(() => Schema.Struct({
  primaryFeedId: Schema.optional(Schema.String),
  dataSourceId: Schema.optional(Schema.String),
  primaryFeedName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaMerchantCenterAccountLinkMerchantCenterFeedFilter" }) as any as Schema.Schema<GoogleCloudRetailV2alphaMerchantCenterAccountLinkMerchantCenterFeedFilter>;

export interface GoogleCloudRetailV2alphaMerchantCenterAccountLink {
  /** Output only. Immutable. Full resource name of the Merchant Center Account Link, such as `projects/* /locations/global/catalogs/default_catalog/merchantCenterAccountLinks/merchant_center_account_link`. */
  name?: string;
  /** Output only. Immutable. MerchantCenterAccountLink identifier, which is the final component of name. This field is auto generated and follows the convention: `BranchId_MerchantCenterAccountId`. `projects/* /locations/global/catalogs/default_catalog/merchantCenterAccountLinks/id_1`. */
  id?: string;
  /** Required. The linked [Merchant center account id](https://developers.google.com/shopping-content/guides/accountstatuses). The account must be a standalone account or a sub-account of a MCA. */
  merchantCenterAccountId?: string;
  /** Required. The branch ID (e.g. 0/1/2) within the catalog that products from merchant_center_account_id are streamed to. When updating this field, an empty value will use the currently configured default branch. However, changing the default branch later on won't change the linked branch here. A single branch ID can only have one linked Merchant Center account ID. */
  branchId?: string;
  /** The FeedLabel used to perform filtering. Note: this replaces [region_id](https://developers.google.com/shopping-content/reference/rest/v2.1/products#Product.FIELDS.feed_label). Example value: `US`. Example value: `FeedLabel1`. */
  feedLabel?: string;
  /** Language of the title/description and other string attributes. Use language tags defined by [BCP 47](https://www.rfc-editor.org/rfc/bcp/bcp47.txt). ISO 639-1. This specifies the language of offers in Merchant Center that will be accepted. If empty, no language filtering will be performed. Example value: `en`. */
  languageCode?: string;
  /** Criteria for the Merchant Center feeds to be ingested via the link. All offers will be ingested if the list is empty. Otherwise the offers will be ingested from selected feeds. */
  feedFilters?: Array<GoogleCloudRetailV2alphaMerchantCenterAccountLinkMerchantCenterFeedFilter>;
  /** Output only. Represents the state of the link. */
  state?: "STATE_UNSPECIFIED" | "PENDING" | "ACTIVE" | "FAILED" | (string & {});
  /** Output only. Google Cloud project ID. */
  projectId?: string;
  /** Optional. An optional arbitrary string that could be used as a tag for tracking link source. */
  source?: string;
}

export const GoogleCloudRetailV2alphaMerchantCenterAccountLink: Schema.Schema<GoogleCloudRetailV2alphaMerchantCenterAccountLink> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
  merchantCenterAccountId: Schema.optional(Schema.String),
  branchId: Schema.optional(Schema.String),
  feedLabel: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  feedFilters: Schema.optional(Schema.Array(GoogleCloudRetailV2alphaMerchantCenterAccountLinkMerchantCenterFeedFilter)),
  state: Schema.optional(Schema.String),
  projectId: Schema.optional(Schema.String),
  source: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaMerchantCenterAccountLink" }) as any as Schema.Schema<GoogleCloudRetailV2alphaMerchantCenterAccountLink>;

export interface GoogleCloudRetailV2alphaModelPageOptimizationConfigCandidate {
  /** This has to be a valid ServingConfig identifier. For example, for a ServingConfig with full name: `projects/* /locations/global/catalogs/default_catalog/servingConfigs/my_candidate_config`, this would be `my_candidate_config`. */
  servingConfigId?: string;
}

export const GoogleCloudRetailV2alphaModelPageOptimizationConfigCandidate: Schema.Schema<GoogleCloudRetailV2alphaModelPageOptimizationConfigCandidate> = Schema.suspend(() => Schema.Struct({
  servingConfigId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaModelPageOptimizationConfigCandidate" }) as any as Schema.Schema<GoogleCloudRetailV2alphaModelPageOptimizationConfigCandidate>;

export interface GoogleCloudRetailV2alphaModelPageOptimizationConfigPanel {
  /** Optional. The name to display for the panel. */
  displayName?: string;
  /** Required. The candidates to consider on the panel. */
  candidates?: Array<GoogleCloudRetailV2alphaModelPageOptimizationConfigCandidate>;
  /** Required. The default candidate. If the model fails at serving time, we fall back to the default. */
  defaultCandidate?: GoogleCloudRetailV2alphaModelPageOptimizationConfigCandidate;
}

export const GoogleCloudRetailV2alphaModelPageOptimizationConfigPanel: Schema.Schema<GoogleCloudRetailV2alphaModelPageOptimizationConfigPanel> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  candidates: Schema.optional(Schema.Array(GoogleCloudRetailV2alphaModelPageOptimizationConfigCandidate)),
  defaultCandidate: Schema.optional(GoogleCloudRetailV2alphaModelPageOptimizationConfigCandidate),
})).annotate({ identifier: "GoogleCloudRetailV2alphaModelPageOptimizationConfigPanel" }) as any as Schema.Schema<GoogleCloudRetailV2alphaModelPageOptimizationConfigPanel>;

export interface GoogleCloudRetailV2alphaModelPageOptimizationConfig {
  /** Required. The type of UserEvent this page optimization is shown for. Each page has an associated event type - this will be the corresponding event type for the page that the page optimization model is used on. Supported types: * `add-to-cart`: Products being added to cart. * `detail-page-view`: Products detail page viewed. * `home-page-view`: Homepage viewed * `category-page-view`: Homepage viewed * `shopping-cart-page-view`: User viewing a shopping cart. `home-page-view` only allows models with type `recommended-for-you`. All other page_optimization_event_type allow all Model.types. */
  pageOptimizationEventType?: string;
  /** Required. A list of panel configurations. Limit = 5. */
  panels?: Array<GoogleCloudRetailV2alphaModelPageOptimizationConfigPanel>;
  /** Optional. How to restrict results across panels e.g. can the same ServingConfig be shown on multiple panels at once. If unspecified, default to `UNIQUE_MODEL_RESTRICTION`. */
  restriction?: "RESTRICTION_UNSPECIFIED" | "NO_RESTRICTION" | "UNIQUE_SERVING_CONFIG_RESTRICTION" | "UNIQUE_MODEL_RESTRICTION" | "UNIQUE_MODEL_TYPE_RESTRICTION" | (string & {});
}

export const GoogleCloudRetailV2alphaModelPageOptimizationConfig: Schema.Schema<GoogleCloudRetailV2alphaModelPageOptimizationConfig> = Schema.suspend(() => Schema.Struct({
  pageOptimizationEventType: Schema.optional(Schema.String),
  panels: Schema.optional(Schema.Array(GoogleCloudRetailV2alphaModelPageOptimizationConfigPanel)),
  restriction: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaModelPageOptimizationConfig" }) as any as Schema.Schema<GoogleCloudRetailV2alphaModelPageOptimizationConfig>;

export interface GoogleCloudRetailV2alphaModelServingConfigList {
  /** Optional. A set of valid serving configs that may be used for `PAGE_OPTIMIZATION`. */
  servingConfigIds?: Array<string>;
}

export const GoogleCloudRetailV2alphaModelServingConfigList: Schema.Schema<GoogleCloudRetailV2alphaModelServingConfigList> = Schema.suspend(() => Schema.Struct({
  servingConfigIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2alphaModelServingConfigList" }) as any as Schema.Schema<GoogleCloudRetailV2alphaModelServingConfigList>;

export interface GoogleCloudRetailV2alphaModelFrequentlyBoughtTogetherFeaturesConfig {
  /** Optional. Specifies the context of the model when it is used in predict requests. Can only be set for the `frequently-bought-together` type. If it isn't specified, it defaults to MULTIPLE_CONTEXT_PRODUCTS. */
  contextProductsType?: "CONTEXT_PRODUCTS_TYPE_UNSPECIFIED" | "SINGLE_CONTEXT_PRODUCT" | "MULTIPLE_CONTEXT_PRODUCTS" | (string & {});
}

export const GoogleCloudRetailV2alphaModelFrequentlyBoughtTogetherFeaturesConfig: Schema.Schema<GoogleCloudRetailV2alphaModelFrequentlyBoughtTogetherFeaturesConfig> = Schema.suspend(() => Schema.Struct({
  contextProductsType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaModelFrequentlyBoughtTogetherFeaturesConfig" }) as any as Schema.Schema<GoogleCloudRetailV2alphaModelFrequentlyBoughtTogetherFeaturesConfig>;

export interface GoogleCloudRetailV2alphaModelModelFeaturesConfig {
  /** Additional configs for frequently-bought-together models. */
  frequentlyBoughtTogetherConfig?: GoogleCloudRetailV2alphaModelFrequentlyBoughtTogetherFeaturesConfig;
}

export const GoogleCloudRetailV2alphaModelModelFeaturesConfig: Schema.Schema<GoogleCloudRetailV2alphaModelModelFeaturesConfig> = Schema.suspend(() => Schema.Struct({
  frequentlyBoughtTogetherConfig: Schema.optional(GoogleCloudRetailV2alphaModelFrequentlyBoughtTogetherFeaturesConfig),
})).annotate({ identifier: "GoogleCloudRetailV2alphaModelModelFeaturesConfig" }) as any as Schema.Schema<GoogleCloudRetailV2alphaModelModelFeaturesConfig>;

export interface GoogleCloudRetailV2alphaModel {
  /** Optional. The page optimization config. */
  pageOptimizationConfig?: GoogleCloudRetailV2alphaModelPageOptimizationConfig;
  /** Required. The fully qualified resource name of the model. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}` catalog_id has char limit of 50. recommendation_model_id has char limit of 40. */
  name?: string;
  /** Required. The display name of the model. Should be human readable, used to display Recommendation Models in the Retail Cloud Console Dashboard. UTF-8 encoded string with limit of 1024 characters. */
  displayName?: string;
  /** Optional. The training state that the model is in (e.g. `TRAINING` or `PAUSED`). Since part of the cost of running the service is frequency of training - this can be used to determine when to train model in order to control cost. If not specified: the default value for `CreateModel` method is `TRAINING`. The default value for `UpdateModel` method is to keep the state the same as before. */
  trainingState?: "TRAINING_STATE_UNSPECIFIED" | "PAUSED" | "TRAINING" | (string & {});
  /** Output only. The serving state of the model: `ACTIVE`, `NOT_ACTIVE`. */
  servingState?: "SERVING_STATE_UNSPECIFIED" | "INACTIVE" | "ACTIVE" | "TUNED" | (string & {});
  /** Output only. Timestamp the Recommendation Model was created at. */
  createTime?: string;
  /** Output only. Timestamp the Recommendation Model was last updated. E.g. if a Recommendation Model was paused - this would be the time the pause was initiated. */
  updateTime?: string;
  /** Required. The type of model e.g. `home-page`. Currently supported values: `recommended-for-you`, `others-you-may-like`, `frequently-bought-together`, `page-optimization`, `similar-items`, `buy-it-again`, `on-sale-items`, and `recently-viewed`(readonly value). This field together with optimization_objective describe model metadata to use to control model training and serving. See https://cloud.google.com/retail/docs/models for more details on what the model metadata control and which combination of parameters are valid. For invalid combinations of parameters (e.g. type = `frequently-bought-together` and optimization_objective = `ctr`), you receive an error 400 if you try to create/update a recommendation with this set of knobs. */
  type?: string;
  /** Optional. The optimization objective e.g. `cvr`. Currently supported values: `ctr`, `cvr`, `revenue-per-order`. If not specified, we choose default based on model type. Default depends on type of recommendation: `recommended-for-you` => `ctr` `others-you-may-like` => `ctr` `frequently-bought-together` => `revenue_per_order` This field together with optimization_objective describe model metadata to use to control model training and serving. See https://cloud.google.com/retail/docs/models for more details on what the model metadata control and which combination of parameters are valid. For invalid combinations of parameters (e.g. type = `frequently-bought-together` and optimization_objective = `ctr`), you receive an error 400 if you try to create/update a recommendation with this set of knobs. */
  optimizationObjective?: string;
  /** Optional. The state of periodic tuning. The period we use is 3 months - to do a one-off tune earlier use the `TuneModel` method. Default value is `PERIODIC_TUNING_ENABLED`. */
  periodicTuningState?: "PERIODIC_TUNING_STATE_UNSPECIFIED" | "PERIODIC_TUNING_DISABLED" | "ALL_TUNING_DISABLED" | "PERIODIC_TUNING_ENABLED" | (string & {});
  /** Output only. The timestamp when the latest successful tune finished. */
  lastTuneTime?: string;
  /** Output only. The tune operation associated with the model. Can be used to determine if there is an ongoing tune for this recommendation. Empty field implies no tune is goig on. */
  tuningOperation?: string;
  /** Output only. The state of data requirements for this model: `DATA_OK` and `DATA_ERROR`. Recommendation model cannot be trained if the data is in `DATA_ERROR` state. Recommendation model can have `DATA_ERROR` state even if serving state is `ACTIVE`: models were trained successfully before, but cannot be refreshed because model no longer has sufficient data for training. */
  dataState?: "DATA_STATE_UNSPECIFIED" | "DATA_OK" | "DATA_ERROR" | (string & {});
  /** Optional. If `RECOMMENDATIONS_FILTERING_ENABLED`, recommendation filtering by attributes is enabled for the model. */
  filteringOption?: "RECOMMENDATIONS_FILTERING_OPTION_UNSPECIFIED" | "RECOMMENDATIONS_FILTERING_DISABLED" | "RECOMMENDATIONS_FILTERING_ENABLED" | (string & {});
  /** Output only. The list of valid serving configs associated with the PageOptimizationConfig. */
  servingConfigLists?: Array<GoogleCloudRetailV2alphaModelServingConfigList>;
  /** Optional. Additional model features config. */
  modelFeaturesConfig?: GoogleCloudRetailV2alphaModelModelFeaturesConfig;
}

export const GoogleCloudRetailV2alphaModel: Schema.Schema<GoogleCloudRetailV2alphaModel> = Schema.suspend(() => Schema.Struct({
  pageOptimizationConfig: Schema.optional(GoogleCloudRetailV2alphaModelPageOptimizationConfig),
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  trainingState: Schema.optional(Schema.String),
  servingState: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  optimizationObjective: Schema.optional(Schema.String),
  periodicTuningState: Schema.optional(Schema.String),
  lastTuneTime: Schema.optional(Schema.String),
  tuningOperation: Schema.optional(Schema.String),
  dataState: Schema.optional(Schema.String),
  filteringOption: Schema.optional(Schema.String),
  servingConfigLists: Schema.optional(Schema.Array(GoogleCloudRetailV2alphaModelServingConfigList)),
  modelFeaturesConfig: Schema.optional(GoogleCloudRetailV2alphaModelModelFeaturesConfig),
})).annotate({ identifier: "GoogleCloudRetailV2alphaModel" }) as any as Schema.Schema<GoogleCloudRetailV2alphaModel>;

export interface GoogleCloudRetailV2alphaPurgeMetadata {
}

export const GoogleCloudRetailV2alphaPurgeMetadata: Schema.Schema<GoogleCloudRetailV2alphaPurgeMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2alphaPurgeMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2alphaPurgeMetadata>;

export interface GoogleCloudRetailV2alphaPurgeProductsMetadata {
  /** Operation create time. */
  createTime?: string;
  /** Operation last update time. If the operation is done, this is also the finish time. */
  updateTime?: string;
  /** Count of entries that were deleted successfully. */
  successCount?: string;
  /** Count of entries that encountered errors while processing. */
  failureCount?: string;
}

export const GoogleCloudRetailV2alphaPurgeProductsMetadata: Schema.Schema<GoogleCloudRetailV2alphaPurgeProductsMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  successCount: Schema.optional(Schema.String),
  failureCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaPurgeProductsMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2alphaPurgeProductsMetadata>;

export interface GoogleCloudRetailV2alphaPurgeProductsResponse {
  /** The total count of products purged as a result of the operation. */
  purgeCount?: string;
  /** A sample of the product names that will be deleted. Only populated if `force` is set to false. A max of 100 names will be returned and the names are chosen at random. */
  purgeSample?: Array<string>;
}

export const GoogleCloudRetailV2alphaPurgeProductsResponse: Schema.Schema<GoogleCloudRetailV2alphaPurgeProductsResponse> = Schema.suspend(() => Schema.Struct({
  purgeCount: Schema.optional(Schema.String),
  purgeSample: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2alphaPurgeProductsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaPurgeProductsResponse>;

export interface GoogleCloudRetailV2alphaPurgeUserEventsResponse {
  /** The total count of events purged as a result of the operation. */
  purgedEventsCount?: string;
}

export const GoogleCloudRetailV2alphaPurgeUserEventsResponse: Schema.Schema<GoogleCloudRetailV2alphaPurgeUserEventsResponse> = Schema.suspend(() => Schema.Struct({
  purgedEventsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaPurgeUserEventsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaPurgeUserEventsResponse>;

export interface GoogleCloudRetailV2alphaRejoinUserEventsMetadata {
}

export const GoogleCloudRetailV2alphaRejoinUserEventsMetadata: Schema.Schema<GoogleCloudRetailV2alphaRejoinUserEventsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2alphaRejoinUserEventsMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2alphaRejoinUserEventsMetadata>;

export interface GoogleCloudRetailV2alphaRejoinUserEventsResponse {
  /** Number of user events that were joined with latest product catalog. */
  rejoinedUserEventsCount?: string;
}

export const GoogleCloudRetailV2alphaRejoinUserEventsResponse: Schema.Schema<GoogleCloudRetailV2alphaRejoinUserEventsResponse> = Schema.suspend(() => Schema.Struct({
  rejoinedUserEventsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaRejoinUserEventsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaRejoinUserEventsResponse>;

export interface GoogleCloudRetailV2alphaRemoveFulfillmentPlacesMetadata {
}

export const GoogleCloudRetailV2alphaRemoveFulfillmentPlacesMetadata: Schema.Schema<GoogleCloudRetailV2alphaRemoveFulfillmentPlacesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2alphaRemoveFulfillmentPlacesMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2alphaRemoveFulfillmentPlacesMetadata>;

export interface GoogleCloudRetailV2alphaRemoveFulfillmentPlacesResponse {
}

export const GoogleCloudRetailV2alphaRemoveFulfillmentPlacesResponse: Schema.Schema<GoogleCloudRetailV2alphaRemoveFulfillmentPlacesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2alphaRemoveFulfillmentPlacesResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaRemoveFulfillmentPlacesResponse>;

export interface GoogleCloudRetailV2alphaRemoveLocalInventoriesMetadata {
}

export const GoogleCloudRetailV2alphaRemoveLocalInventoriesMetadata: Schema.Schema<GoogleCloudRetailV2alphaRemoveLocalInventoriesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2alphaRemoveLocalInventoriesMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2alphaRemoveLocalInventoriesMetadata>;

export interface GoogleCloudRetailV2alphaRemoveLocalInventoriesResponse {
}

export const GoogleCloudRetailV2alphaRemoveLocalInventoriesResponse: Schema.Schema<GoogleCloudRetailV2alphaRemoveLocalInventoriesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2alphaRemoveLocalInventoriesResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaRemoveLocalInventoriesResponse>;

export interface GoogleCloudRetailV2alphaSetInventoryMetadata {
}

export const GoogleCloudRetailV2alphaSetInventoryMetadata: Schema.Schema<GoogleCloudRetailV2alphaSetInventoryMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2alphaSetInventoryMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2alphaSetInventoryMetadata>;

export interface GoogleCloudRetailV2alphaSetInventoryResponse {
}

export const GoogleCloudRetailV2alphaSetInventoryResponse: Schema.Schema<GoogleCloudRetailV2alphaSetInventoryResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2alphaSetInventoryResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaSetInventoryResponse>;

export interface GoogleCloudRetailV2alphaTuneModelMetadata {
  /** The resource name of the model that this tune applies to. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}` */
  model?: string;
}

export const GoogleCloudRetailV2alphaTuneModelMetadata: Schema.Schema<GoogleCloudRetailV2alphaTuneModelMetadata> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2alphaTuneModelMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2alphaTuneModelMetadata>;

export interface GoogleCloudRetailV2alphaTuneModelResponse {
}

export const GoogleCloudRetailV2alphaTuneModelResponse: Schema.Schema<GoogleCloudRetailV2alphaTuneModelResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2alphaTuneModelResponse" }) as any as Schema.Schema<GoogleCloudRetailV2alphaTuneModelResponse>;

export interface GoogleCloudRetailV2betaAddFulfillmentPlacesMetadata {
}

export const GoogleCloudRetailV2betaAddFulfillmentPlacesMetadata: Schema.Schema<GoogleCloudRetailV2betaAddFulfillmentPlacesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2betaAddFulfillmentPlacesMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2betaAddFulfillmentPlacesMetadata>;

export interface GoogleCloudRetailV2betaAddFulfillmentPlacesResponse {
}

export const GoogleCloudRetailV2betaAddFulfillmentPlacesResponse: Schema.Schema<GoogleCloudRetailV2betaAddFulfillmentPlacesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2betaAddFulfillmentPlacesResponse" }) as any as Schema.Schema<GoogleCloudRetailV2betaAddFulfillmentPlacesResponse>;

export interface GoogleCloudRetailV2betaAddLocalInventoriesMetadata {
}

export const GoogleCloudRetailV2betaAddLocalInventoriesMetadata: Schema.Schema<GoogleCloudRetailV2betaAddLocalInventoriesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2betaAddLocalInventoriesMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2betaAddLocalInventoriesMetadata>;

export interface GoogleCloudRetailV2betaAddLocalInventoriesResponse {
}

export const GoogleCloudRetailV2betaAddLocalInventoriesResponse: Schema.Schema<GoogleCloudRetailV2betaAddLocalInventoriesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2betaAddLocalInventoriesResponse" }) as any as Schema.Schema<GoogleCloudRetailV2betaAddLocalInventoriesResponse>;

export interface GoogleCloudRetailV2betaCreateModelMetadata {
  /** The resource name of the model that this create applies to. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}` */
  model?: string;
}

export const GoogleCloudRetailV2betaCreateModelMetadata: Schema.Schema<GoogleCloudRetailV2betaCreateModelMetadata> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2betaCreateModelMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2betaCreateModelMetadata>;

export interface GoogleCloudRetailV2betaExportErrorsConfig {
  /** Google Cloud Storage path for import errors. This must be an empty, existing Cloud Storage bucket. Export errors will be written to a file in this bucket, one per line, as a JSON-encoded `google.rpc.Status` message. */
  gcsPrefix?: string;
}

export const GoogleCloudRetailV2betaExportErrorsConfig: Schema.Schema<GoogleCloudRetailV2betaExportErrorsConfig> = Schema.suspend(() => Schema.Struct({
  gcsPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2betaExportErrorsConfig" }) as any as Schema.Schema<GoogleCloudRetailV2betaExportErrorsConfig>;

export interface GoogleCloudRetailV2betaBigQueryOutputResult {
  /** The ID of a BigQuery Dataset. */
  datasetId?: string;
  /** The ID of a BigQuery Table. */
  tableId?: string;
}

export const GoogleCloudRetailV2betaBigQueryOutputResult: Schema.Schema<GoogleCloudRetailV2betaBigQueryOutputResult> = Schema.suspend(() => Schema.Struct({
  datasetId: Schema.optional(Schema.String),
  tableId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2betaBigQueryOutputResult" }) as any as Schema.Schema<GoogleCloudRetailV2betaBigQueryOutputResult>;

export interface GoogleCloudRetailV2betaGcsOutputResult {
  /** The uri of Gcs output */
  outputUri?: string;
}

export const GoogleCloudRetailV2betaGcsOutputResult: Schema.Schema<GoogleCloudRetailV2betaGcsOutputResult> = Schema.suspend(() => Schema.Struct({
  outputUri: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2betaGcsOutputResult" }) as any as Schema.Schema<GoogleCloudRetailV2betaGcsOutputResult>;

export interface GoogleCloudRetailV2betaOutputResult {
  /** The BigQuery location where the result is stored. */
  bigqueryResult?: Array<GoogleCloudRetailV2betaBigQueryOutputResult>;
  /** The Google Cloud Storage location where the result is stored. */
  gcsResult?: Array<GoogleCloudRetailV2betaGcsOutputResult>;
}

export const GoogleCloudRetailV2betaOutputResult: Schema.Schema<GoogleCloudRetailV2betaOutputResult> = Schema.suspend(() => Schema.Struct({
  bigqueryResult: Schema.optional(Schema.Array(GoogleCloudRetailV2betaBigQueryOutputResult)),
  gcsResult: Schema.optional(Schema.Array(GoogleCloudRetailV2betaGcsOutputResult)),
})).annotate({ identifier: "GoogleCloudRetailV2betaOutputResult" }) as any as Schema.Schema<GoogleCloudRetailV2betaOutputResult>;

export interface GoogleCloudRetailV2betaExportAnalyticsMetricsResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
  /** This field is never set. */
  errorsConfig?: GoogleCloudRetailV2betaExportErrorsConfig;
  /** Output result indicating where the data were exported to. */
  outputResult?: GoogleCloudRetailV2betaOutputResult;
}

export const GoogleCloudRetailV2betaExportAnalyticsMetricsResponse: Schema.Schema<GoogleCloudRetailV2betaExportAnalyticsMetricsResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
  errorsConfig: Schema.optional(GoogleCloudRetailV2betaExportErrorsConfig),
  outputResult: Schema.optional(GoogleCloudRetailV2betaOutputResult),
})).annotate({ identifier: "GoogleCloudRetailV2betaExportAnalyticsMetricsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2betaExportAnalyticsMetricsResponse>;

export interface GoogleCloudRetailV2betaExportMetadata {
  /** Operation create time. */
  createTime?: string;
  /** Operation last update time. If the operation is done, this is also the finish time. */
  updateTime?: string;
}

export const GoogleCloudRetailV2betaExportMetadata: Schema.Schema<GoogleCloudRetailV2betaExportMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2betaExportMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2betaExportMetadata>;

export interface GoogleCloudRetailV2betaExportProductsResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
  /** This field is never set. */
  errorsConfig?: GoogleCloudRetailV2betaExportErrorsConfig;
  /** Output result indicating where the data were exported to. */
  outputResult?: GoogleCloudRetailV2betaOutputResult;
}

export const GoogleCloudRetailV2betaExportProductsResponse: Schema.Schema<GoogleCloudRetailV2betaExportProductsResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
  errorsConfig: Schema.optional(GoogleCloudRetailV2betaExportErrorsConfig),
  outputResult: Schema.optional(GoogleCloudRetailV2betaOutputResult),
})).annotate({ identifier: "GoogleCloudRetailV2betaExportProductsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2betaExportProductsResponse>;

export interface GoogleCloudRetailV2betaExportUserEventsResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
  /** This field is never set. */
  errorsConfig?: GoogleCloudRetailV2betaExportErrorsConfig;
  /** Output result indicating where the data were exported to. */
  outputResult?: GoogleCloudRetailV2betaOutputResult;
}

export const GoogleCloudRetailV2betaExportUserEventsResponse: Schema.Schema<GoogleCloudRetailV2betaExportUserEventsResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
  errorsConfig: Schema.optional(GoogleCloudRetailV2betaExportErrorsConfig),
  outputResult: Schema.optional(GoogleCloudRetailV2betaOutputResult),
})).annotate({ identifier: "GoogleCloudRetailV2betaExportUserEventsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2betaExportUserEventsResponse>;

export interface GoogleCloudRetailV2betaImportCompletionDataResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
}

export const GoogleCloudRetailV2betaImportCompletionDataResponse: Schema.Schema<GoogleCloudRetailV2betaImportCompletionDataResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
})).annotate({ identifier: "GoogleCloudRetailV2betaImportCompletionDataResponse" }) as any as Schema.Schema<GoogleCloudRetailV2betaImportCompletionDataResponse>;

export interface GoogleCloudRetailV2betaImportErrorsConfig {
  /** Google Cloud Storage prefix for import errors. This must be an empty, existing Cloud Storage directory. Import errors are written to sharded files in this directory, one per line, as a JSON-encoded `google.rpc.Status` message. */
  gcsPrefix?: string;
}

export const GoogleCloudRetailV2betaImportErrorsConfig: Schema.Schema<GoogleCloudRetailV2betaImportErrorsConfig> = Schema.suspend(() => Schema.Struct({
  gcsPrefix: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2betaImportErrorsConfig" }) as any as Schema.Schema<GoogleCloudRetailV2betaImportErrorsConfig>;

export interface GoogleCloudRetailV2betaImportMetadata {
  /** Operation create time. */
  createTime?: string;
  /** Operation last update time. If the operation is done, this is also the finish time. */
  updateTime?: string;
  /** Count of entries that were processed successfully. */
  successCount?: string;
  /** Count of entries that encountered errors while processing. */
  failureCount?: string;
  /** Deprecated. This field is never set. */
  requestId?: string;
  /** Pub/Sub topic for receiving notification. If this field is set, when the import is finished, a notification is sent to specified Pub/Sub topic. The message data is JSON string of a Operation. Format of the Pub/Sub topic is `projects/{project}/topics/{topic}`. */
  notificationPubsubTopic?: string;
}

export const GoogleCloudRetailV2betaImportMetadata: Schema.Schema<GoogleCloudRetailV2betaImportMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  successCount: Schema.optional(Schema.String),
  failureCount: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  notificationPubsubTopic: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2betaImportMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2betaImportMetadata>;

export interface GoogleCloudRetailV2betaImportProductsResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
  /** Echoes the destination for the complete errors in the request if set. */
  errorsConfig?: GoogleCloudRetailV2betaImportErrorsConfig;
}

export const GoogleCloudRetailV2betaImportProductsResponse: Schema.Schema<GoogleCloudRetailV2betaImportProductsResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
  errorsConfig: Schema.optional(GoogleCloudRetailV2betaImportErrorsConfig),
})).annotate({ identifier: "GoogleCloudRetailV2betaImportProductsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2betaImportProductsResponse>;

export interface GoogleCloudRetailV2betaUserEventImportSummary {
  /** Count of user events imported with complete existing catalog information. */
  joinedEventsCount?: string;
  /** Count of user events imported, but with catalog information not found in the imported catalog. */
  unjoinedEventsCount?: string;
}

export const GoogleCloudRetailV2betaUserEventImportSummary: Schema.Schema<GoogleCloudRetailV2betaUserEventImportSummary> = Schema.suspend(() => Schema.Struct({
  joinedEventsCount: Schema.optional(Schema.String),
  unjoinedEventsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2betaUserEventImportSummary" }) as any as Schema.Schema<GoogleCloudRetailV2betaUserEventImportSummary>;

export interface GoogleCloudRetailV2betaImportUserEventsResponse {
  /** A sample of errors encountered while processing the request. */
  errorSamples?: Array<GoogleRpcStatus>;
  /** Echoes the destination for the complete errors if this field was set in the request. */
  errorsConfig?: GoogleCloudRetailV2betaImportErrorsConfig;
  /** Aggregated statistics of user event import status. */
  importSummary?: GoogleCloudRetailV2betaUserEventImportSummary;
}

export const GoogleCloudRetailV2betaImportUserEventsResponse: Schema.Schema<GoogleCloudRetailV2betaImportUserEventsResponse> = Schema.suspend(() => Schema.Struct({
  errorSamples: Schema.optional(Schema.Array(GoogleRpcStatus)),
  errorsConfig: Schema.optional(GoogleCloudRetailV2betaImportErrorsConfig),
  importSummary: Schema.optional(GoogleCloudRetailV2betaUserEventImportSummary),
})).annotate({ identifier: "GoogleCloudRetailV2betaImportUserEventsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2betaImportUserEventsResponse>;

export interface GoogleCloudRetailV2betaModelServingConfigList {
  /** Optional. A set of valid serving configs that may be used for `PAGE_OPTIMIZATION`. */
  servingConfigIds?: Array<string>;
}

export const GoogleCloudRetailV2betaModelServingConfigList: Schema.Schema<GoogleCloudRetailV2betaModelServingConfigList> = Schema.suspend(() => Schema.Struct({
  servingConfigIds: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2betaModelServingConfigList" }) as any as Schema.Schema<GoogleCloudRetailV2betaModelServingConfigList>;

export interface GoogleCloudRetailV2betaModelFrequentlyBoughtTogetherFeaturesConfig {
  /** Optional. Specifies the context of the model when it is used in predict requests. Can only be set for the `frequently-bought-together` type. If it isn't specified, it defaults to MULTIPLE_CONTEXT_PRODUCTS. */
  contextProductsType?: "CONTEXT_PRODUCTS_TYPE_UNSPECIFIED" | "SINGLE_CONTEXT_PRODUCT" | "MULTIPLE_CONTEXT_PRODUCTS" | (string & {});
}

export const GoogleCloudRetailV2betaModelFrequentlyBoughtTogetherFeaturesConfig: Schema.Schema<GoogleCloudRetailV2betaModelFrequentlyBoughtTogetherFeaturesConfig> = Schema.suspend(() => Schema.Struct({
  contextProductsType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2betaModelFrequentlyBoughtTogetherFeaturesConfig" }) as any as Schema.Schema<GoogleCloudRetailV2betaModelFrequentlyBoughtTogetherFeaturesConfig>;

export interface GoogleCloudRetailV2betaModelModelFeaturesConfig {
  /** Additional configs for frequently-bought-together models. */
  frequentlyBoughtTogetherConfig?: GoogleCloudRetailV2betaModelFrequentlyBoughtTogetherFeaturesConfig;
}

export const GoogleCloudRetailV2betaModelModelFeaturesConfig: Schema.Schema<GoogleCloudRetailV2betaModelModelFeaturesConfig> = Schema.suspend(() => Schema.Struct({
  frequentlyBoughtTogetherConfig: Schema.optional(GoogleCloudRetailV2betaModelFrequentlyBoughtTogetherFeaturesConfig),
})).annotate({ identifier: "GoogleCloudRetailV2betaModelModelFeaturesConfig" }) as any as Schema.Schema<GoogleCloudRetailV2betaModelModelFeaturesConfig>;

export interface GoogleCloudRetailV2betaModel {
  /** Required. The fully qualified resource name of the model. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}` catalog_id has char limit of 50. recommendation_model_id has char limit of 40. */
  name?: string;
  /** Required. The display name of the model. Should be human readable, used to display Recommendation Models in the Retail Cloud Console Dashboard. UTF-8 encoded string with limit of 1024 characters. */
  displayName?: string;
  /** Optional. The training state that the model is in (e.g. `TRAINING` or `PAUSED`). Since part of the cost of running the service is frequency of training - this can be used to determine when to train model in order to control cost. If not specified: the default value for `CreateModel` method is `TRAINING`. The default value for `UpdateModel` method is to keep the state the same as before. */
  trainingState?: "TRAINING_STATE_UNSPECIFIED" | "PAUSED" | "TRAINING" | (string & {});
  /** Output only. The serving state of the model: `ACTIVE`, `NOT_ACTIVE`. */
  servingState?: "SERVING_STATE_UNSPECIFIED" | "INACTIVE" | "ACTIVE" | "TUNED" | (string & {});
  /** Output only. Timestamp the Recommendation Model was created at. */
  createTime?: string;
  /** Output only. Timestamp the Recommendation Model was last updated. E.g. if a Recommendation Model was paused - this would be the time the pause was initiated. */
  updateTime?: string;
  /** Required. The type of model e.g. `home-page`. Currently supported values: `recommended-for-you`, `others-you-may-like`, `frequently-bought-together`, `page-optimization`, `similar-items`, `buy-it-again`, `on-sale-items`, and `recently-viewed`(readonly value). This field together with optimization_objective describe model metadata to use to control model training and serving. See https://cloud.google.com/retail/docs/models for more details on what the model metadata control and which combination of parameters are valid. For invalid combinations of parameters (e.g. type = `frequently-bought-together` and optimization_objective = `ctr`), you receive an error 400 if you try to create/update a recommendation with this set of knobs. */
  type?: string;
  /** Optional. The optimization objective e.g. `cvr`. Currently supported values: `ctr`, `cvr`, `revenue-per-order`. If not specified, we choose default based on model type. Default depends on type of recommendation: `recommended-for-you` => `ctr` `others-you-may-like` => `ctr` `frequently-bought-together` => `revenue_per_order` This field together with optimization_objective describe model metadata to use to control model training and serving. See https://cloud.google.com/retail/docs/models for more details on what the model metadata control and which combination of parameters are valid. For invalid combinations of parameters (e.g. type = `frequently-bought-together` and optimization_objective = `ctr`), you receive an error 400 if you try to create/update a recommendation with this set of knobs. */
  optimizationObjective?: string;
  /** Optional. The state of periodic tuning. The period we use is 3 months - to do a one-off tune earlier use the `TuneModel` method. Default value is `PERIODIC_TUNING_ENABLED`. */
  periodicTuningState?: "PERIODIC_TUNING_STATE_UNSPECIFIED" | "PERIODIC_TUNING_DISABLED" | "ALL_TUNING_DISABLED" | "PERIODIC_TUNING_ENABLED" | (string & {});
  /** Output only. The timestamp when the latest successful tune finished. */
  lastTuneTime?: string;
  /** Output only. The tune operation associated with the model. Can be used to determine if there is an ongoing tune for this recommendation. Empty field implies no tune is goig on. */
  tuningOperation?: string;
  /** Output only. The state of data requirements for this model: `DATA_OK` and `DATA_ERROR`. Recommendation model cannot be trained if the data is in `DATA_ERROR` state. Recommendation model can have `DATA_ERROR` state even if serving state is `ACTIVE`: models were trained successfully before, but cannot be refreshed because model no longer has sufficient data for training. */
  dataState?: "DATA_STATE_UNSPECIFIED" | "DATA_OK" | "DATA_ERROR" | (string & {});
  /** Optional. If `RECOMMENDATIONS_FILTERING_ENABLED`, recommendation filtering by attributes is enabled for the model. */
  filteringOption?: "RECOMMENDATIONS_FILTERING_OPTION_UNSPECIFIED" | "RECOMMENDATIONS_FILTERING_DISABLED" | "RECOMMENDATIONS_FILTERING_ENABLED" | (string & {});
  /** Output only. The list of valid serving configs associated with the PageOptimizationConfig. */
  servingConfigLists?: Array<GoogleCloudRetailV2betaModelServingConfigList>;
  /** Optional. Additional model features config. */
  modelFeaturesConfig?: GoogleCloudRetailV2betaModelModelFeaturesConfig;
}

export const GoogleCloudRetailV2betaModel: Schema.Schema<GoogleCloudRetailV2betaModel> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  trainingState: Schema.optional(Schema.String),
  servingState: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
  optimizationObjective: Schema.optional(Schema.String),
  periodicTuningState: Schema.optional(Schema.String),
  lastTuneTime: Schema.optional(Schema.String),
  tuningOperation: Schema.optional(Schema.String),
  dataState: Schema.optional(Schema.String),
  filteringOption: Schema.optional(Schema.String),
  servingConfigLists: Schema.optional(Schema.Array(GoogleCloudRetailV2betaModelServingConfigList)),
  modelFeaturesConfig: Schema.optional(GoogleCloudRetailV2betaModelModelFeaturesConfig),
})).annotate({ identifier: "GoogleCloudRetailV2betaModel" }) as any as Schema.Schema<GoogleCloudRetailV2betaModel>;

export interface GoogleCloudRetailV2betaPurgeMetadata {
}

export const GoogleCloudRetailV2betaPurgeMetadata: Schema.Schema<GoogleCloudRetailV2betaPurgeMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2betaPurgeMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2betaPurgeMetadata>;

export interface GoogleCloudRetailV2betaPurgeProductsMetadata {
  /** Operation create time. */
  createTime?: string;
  /** Operation last update time. If the operation is done, this is also the finish time. */
  updateTime?: string;
  /** Count of entries that were deleted successfully. */
  successCount?: string;
  /** Count of entries that encountered errors while processing. */
  failureCount?: string;
}

export const GoogleCloudRetailV2betaPurgeProductsMetadata: Schema.Schema<GoogleCloudRetailV2betaPurgeProductsMetadata> = Schema.suspend(() => Schema.Struct({
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  successCount: Schema.optional(Schema.String),
  failureCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2betaPurgeProductsMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2betaPurgeProductsMetadata>;

export interface GoogleCloudRetailV2betaPurgeProductsResponse {
  /** The total count of products purged as a result of the operation. */
  purgeCount?: string;
  /** A sample of the product names that will be deleted. Only populated if `force` is set to false. A max of 100 names will be returned and the names are chosen at random. */
  purgeSample?: Array<string>;
}

export const GoogleCloudRetailV2betaPurgeProductsResponse: Schema.Schema<GoogleCloudRetailV2betaPurgeProductsResponse> = Schema.suspend(() => Schema.Struct({
  purgeCount: Schema.optional(Schema.String),
  purgeSample: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudRetailV2betaPurgeProductsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2betaPurgeProductsResponse>;

export interface GoogleCloudRetailV2betaPurgeUserEventsResponse {
  /** The total count of events purged as a result of the operation. */
  purgedEventsCount?: string;
}

export const GoogleCloudRetailV2betaPurgeUserEventsResponse: Schema.Schema<GoogleCloudRetailV2betaPurgeUserEventsResponse> = Schema.suspend(() => Schema.Struct({
  purgedEventsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2betaPurgeUserEventsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2betaPurgeUserEventsResponse>;

export interface GoogleCloudRetailV2betaRejoinUserEventsMetadata {
}

export const GoogleCloudRetailV2betaRejoinUserEventsMetadata: Schema.Schema<GoogleCloudRetailV2betaRejoinUserEventsMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2betaRejoinUserEventsMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2betaRejoinUserEventsMetadata>;

export interface GoogleCloudRetailV2betaRejoinUserEventsResponse {
  /** Number of user events that were joined with latest product catalog. */
  rejoinedUserEventsCount?: string;
}

export const GoogleCloudRetailV2betaRejoinUserEventsResponse: Schema.Schema<GoogleCloudRetailV2betaRejoinUserEventsResponse> = Schema.suspend(() => Schema.Struct({
  rejoinedUserEventsCount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2betaRejoinUserEventsResponse" }) as any as Schema.Schema<GoogleCloudRetailV2betaRejoinUserEventsResponse>;

export interface GoogleCloudRetailV2betaRemoveFulfillmentPlacesMetadata {
}

export const GoogleCloudRetailV2betaRemoveFulfillmentPlacesMetadata: Schema.Schema<GoogleCloudRetailV2betaRemoveFulfillmentPlacesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2betaRemoveFulfillmentPlacesMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2betaRemoveFulfillmentPlacesMetadata>;

export interface GoogleCloudRetailV2betaRemoveFulfillmentPlacesResponse {
}

export const GoogleCloudRetailV2betaRemoveFulfillmentPlacesResponse: Schema.Schema<GoogleCloudRetailV2betaRemoveFulfillmentPlacesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2betaRemoveFulfillmentPlacesResponse" }) as any as Schema.Schema<GoogleCloudRetailV2betaRemoveFulfillmentPlacesResponse>;

export interface GoogleCloudRetailV2betaRemoveLocalInventoriesMetadata {
}

export const GoogleCloudRetailV2betaRemoveLocalInventoriesMetadata: Schema.Schema<GoogleCloudRetailV2betaRemoveLocalInventoriesMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2betaRemoveLocalInventoriesMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2betaRemoveLocalInventoriesMetadata>;

export interface GoogleCloudRetailV2betaRemoveLocalInventoriesResponse {
}

export const GoogleCloudRetailV2betaRemoveLocalInventoriesResponse: Schema.Schema<GoogleCloudRetailV2betaRemoveLocalInventoriesResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2betaRemoveLocalInventoriesResponse" }) as any as Schema.Schema<GoogleCloudRetailV2betaRemoveLocalInventoriesResponse>;

export interface GoogleCloudRetailV2betaSetInventoryMetadata {
}

export const GoogleCloudRetailV2betaSetInventoryMetadata: Schema.Schema<GoogleCloudRetailV2betaSetInventoryMetadata> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2betaSetInventoryMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2betaSetInventoryMetadata>;

export interface GoogleCloudRetailV2betaSetInventoryResponse {
}

export const GoogleCloudRetailV2betaSetInventoryResponse: Schema.Schema<GoogleCloudRetailV2betaSetInventoryResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2betaSetInventoryResponse" }) as any as Schema.Schema<GoogleCloudRetailV2betaSetInventoryResponse>;

export interface GoogleCloudRetailV2betaTuneModelMetadata {
  /** The resource name of the model that this tune applies to. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}` */
  model?: string;
}

export const GoogleCloudRetailV2betaTuneModelMetadata: Schema.Schema<GoogleCloudRetailV2betaTuneModelMetadata> = Schema.suspend(() => Schema.Struct({
  model: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudRetailV2betaTuneModelMetadata" }) as any as Schema.Schema<GoogleCloudRetailV2betaTuneModelMetadata>;

export interface GoogleCloudRetailV2betaTuneModelResponse {
}

export const GoogleCloudRetailV2betaTuneModelResponse: Schema.Schema<GoogleCloudRetailV2betaTuneModelResponse> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudRetailV2betaTuneModelResponse" }) as any as Schema.Schema<GoogleCloudRetailV2betaTuneModelResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/operations" }),
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

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/operations/{operationsId}" }),
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

/** Exports analytics metrics. `Operation.response` is of type `ExportAnalyticsMetricsResponse`. `Operation.metadata` is of type `ExportMetadata`. */
export interface ExportAnalyticsMetricsProjectsLocationsCatalogsRequest {
  /** Required. Full resource name of the parent catalog. Expected format: `projects/* /locations/* /catalogs/*` */
  catalog: string;
  /** Request body */
  body?: GoogleCloudRetailV2ExportAnalyticsMetricsRequest;
}

export const ExportAnalyticsMetricsProjectsLocationsCatalogsRequest = Schema.Struct({
  catalog: Schema.String.pipe(T.HttpPath("catalog")),
  body: Schema.optional(GoogleCloudRetailV2ExportAnalyticsMetricsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}:exportAnalyticsMetrics", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ExportAnalyticsMetricsProjectsLocationsCatalogsRequest>;

export type ExportAnalyticsMetricsProjectsLocationsCatalogsResponse = GoogleLongrunningOperation;
export const ExportAnalyticsMetricsProjectsLocationsCatalogsResponse = GoogleLongrunningOperation;

export type ExportAnalyticsMetricsProjectsLocationsCatalogsError = CommonErrors;

export const exportAnalyticsMetricsProjectsLocationsCatalogs: API.OperationMethod<ExportAnalyticsMetricsProjectsLocationsCatalogsRequest, ExportAnalyticsMetricsProjectsLocationsCatalogsResponse, ExportAnalyticsMetricsProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ExportAnalyticsMetricsProjectsLocationsCatalogsRequest,
  output: ExportAnalyticsMetricsProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Lists all the Catalogs associated with the project. */
export interface ListProjectsLocationsCatalogsRequest {
  /** Required. The account resource name with an associated location. If the caller does not have permission to list Catalogs under this location, regardless of whether or not this location exists, a PERMISSION_DENIED error is returned. */
  parent: string;
  /** Maximum number of Catalogs to return. If unspecified, defaults to 50. The maximum allowed value is 1000. Values above 1000 will be coerced to 1000. If this field is negative, an INVALID_ARGUMENT is returned. */
  pageSize?: number;
  /** A page token ListCatalogsResponse.next_page_token, received from a previous CatalogService.ListCatalogs call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to CatalogService.ListCatalogs must match the call that provided the page token. Otherwise, an INVALID_ARGUMENT error is returned. */
  pageToken?: string;
}

export const ListProjectsLocationsCatalogsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsRequest>;

export type ListProjectsLocationsCatalogsResponse = GoogleCloudRetailV2ListCatalogsResponse;
export const ListProjectsLocationsCatalogsResponse = GoogleCloudRetailV2ListCatalogsResponse;

export type ListProjectsLocationsCatalogsError = CommonErrors;

export const listProjectsLocationsCatalogs = API.makePaginated(() => ({
  input: ListProjectsLocationsCatalogsRequest,
  output: ListProjectsLocationsCatalogsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates the Catalogs. */
export interface PatchProjectsLocationsCatalogsRequest {
  /** Required. Immutable. The fully qualified resource name of the catalog. */
  name: string;
  /** Indicates which fields in the provided Catalog to update. If an unsupported or unknown field is provided, an INVALID_ARGUMENT error is returned. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudRetailV2Catalog;
}

export const PatchProjectsLocationsCatalogsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudRetailV2Catalog).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCatalogsRequest>;

export type PatchProjectsLocationsCatalogsResponse = GoogleCloudRetailV2Catalog;
export const PatchProjectsLocationsCatalogsResponse = GoogleCloudRetailV2Catalog;

export type PatchProjectsLocationsCatalogsError = CommonErrors;

export const patchProjectsLocationsCatalogs: API.OperationMethod<PatchProjectsLocationsCatalogsRequest, PatchProjectsLocationsCatalogsResponse, PatchProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCatalogsRequest,
  output: PatchProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Set a specified branch id as default branch. API methods such as SearchService.Search, ProductService.GetProduct, ProductService.ListProducts will treat requests using "default_branch" to the actual branch id set as default. For example, if `projects/* /locations/* /catalogs/* /branches/1` is set as default, setting SearchRequest.branch to `projects/* /locations/* /catalogs/* /branches/default_branch` is equivalent to setting SearchRequest.branch to `projects/* /locations/* /catalogs/* /branches/1`. Using multiple branches can be useful when developers would like to have a staging branch to test and verify for future usage. When it becomes ready, developers switch on the staging branch using this API while keeping using `projects/* /locations/* /catalogs/* /branches/default_branch` as SearchRequest.branch to route the traffic to this staging branch. CAUTION: If you have live predict/search traffic, switching the default branch could potentially cause outages if the ID space of the new branch is very different from the old one. More specifically: * PredictionService will only return product IDs from branch {newBranch}. * SearchService will only return product IDs from branch {newBranch} (if branch is not explicitly set). * UserEventService will only join events with products from branch {newBranch}. */
export interface SetDefaultBranchProjectsLocationsCatalogsRequest {
  /** Full resource name of the catalog, such as `projects/* /locations/global/catalogs/default_catalog`. */
  catalog: string;
  /** Request body */
  body?: GoogleCloudRetailV2SetDefaultBranchRequest;
}

export const SetDefaultBranchProjectsLocationsCatalogsRequest = Schema.Struct({
  catalog: Schema.String.pipe(T.HttpPath("catalog")),
  body: Schema.optional(GoogleCloudRetailV2SetDefaultBranchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}:setDefaultBranch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetDefaultBranchProjectsLocationsCatalogsRequest>;

export type SetDefaultBranchProjectsLocationsCatalogsResponse = GoogleProtobufEmpty;
export const SetDefaultBranchProjectsLocationsCatalogsResponse = GoogleProtobufEmpty;

export type SetDefaultBranchProjectsLocationsCatalogsError = CommonErrors;

export const setDefaultBranchProjectsLocationsCatalogs: API.OperationMethod<SetDefaultBranchProjectsLocationsCatalogsRequest, SetDefaultBranchProjectsLocationsCatalogsResponse, SetDefaultBranchProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetDefaultBranchProjectsLocationsCatalogsRequest,
  output: SetDefaultBranchProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Get which branch is currently default branch set by CatalogService.SetDefaultBranch method under a specified parent catalog. */
export interface GetDefaultBranchProjectsLocationsCatalogsRequest {
  /** The parent catalog resource name, such as `projects/* /locations/global/catalogs/default_catalog`. */
  catalog: string;
}

export const GetDefaultBranchProjectsLocationsCatalogsRequest = Schema.Struct({
  catalog: Schema.String.pipe(T.HttpPath("catalog")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}:getDefaultBranch" }),
  svc,
) as unknown as Schema.Schema<GetDefaultBranchProjectsLocationsCatalogsRequest>;

export type GetDefaultBranchProjectsLocationsCatalogsResponse = GoogleCloudRetailV2GetDefaultBranchResponse;
export const GetDefaultBranchProjectsLocationsCatalogsResponse = GoogleCloudRetailV2GetDefaultBranchResponse;

export type GetDefaultBranchProjectsLocationsCatalogsError = CommonErrors;

export const getDefaultBranchProjectsLocationsCatalogs: API.OperationMethod<GetDefaultBranchProjectsLocationsCatalogsRequest, GetDefaultBranchProjectsLocationsCatalogsResponse, GetDefaultBranchProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetDefaultBranchProjectsLocationsCatalogsRequest,
  output: GetDefaultBranchProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Gets a CompletionConfig. */
export interface GetCompletionConfigProjectsLocationsCatalogsRequest {
  /** Required. Full CompletionConfig resource name. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/completionConfig` */
  name: string;
}

export const GetCompletionConfigProjectsLocationsCatalogsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/completionConfig" }),
  svc,
) as unknown as Schema.Schema<GetCompletionConfigProjectsLocationsCatalogsRequest>;

export type GetCompletionConfigProjectsLocationsCatalogsResponse = GoogleCloudRetailV2CompletionConfig;
export const GetCompletionConfigProjectsLocationsCatalogsResponse = GoogleCloudRetailV2CompletionConfig;

export type GetCompletionConfigProjectsLocationsCatalogsError = CommonErrors;

export const getCompletionConfigProjectsLocationsCatalogs: API.OperationMethod<GetCompletionConfigProjectsLocationsCatalogsRequest, GetCompletionConfigProjectsLocationsCatalogsResponse, GetCompletionConfigProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetCompletionConfigProjectsLocationsCatalogsRequest,
  output: GetCompletionConfigProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Updates the CompletionConfigs. */
export interface UpdateCompletionConfigProjectsLocationsCatalogsRequest {
  /** Required. Immutable. Fully qualified name `projects/* /locations/* /catalogs/* /completionConfig` */
  name: string;
  /** Indicates which fields in the provided CompletionConfig to update. The following are the only supported fields: * CompletionConfig.matching_order * CompletionConfig.max_suggestions * CompletionConfig.min_prefix_length * CompletionConfig.auto_learning If not set, all supported fields are updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudRetailV2CompletionConfig;
}

export const UpdateCompletionConfigProjectsLocationsCatalogsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudRetailV2CompletionConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/completionConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateCompletionConfigProjectsLocationsCatalogsRequest>;

export type UpdateCompletionConfigProjectsLocationsCatalogsResponse = GoogleCloudRetailV2CompletionConfig;
export const UpdateCompletionConfigProjectsLocationsCatalogsResponse = GoogleCloudRetailV2CompletionConfig;

export type UpdateCompletionConfigProjectsLocationsCatalogsError = CommonErrors;

export const updateCompletionConfigProjectsLocationsCatalogs: API.OperationMethod<UpdateCompletionConfigProjectsLocationsCatalogsRequest, UpdateCompletionConfigProjectsLocationsCatalogsResponse, UpdateCompletionConfigProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateCompletionConfigProjectsLocationsCatalogsRequest,
  output: UpdateCompletionConfigProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Gets an AttributesConfig. */
export interface GetAttributesConfigProjectsLocationsCatalogsRequest {
  /** Required. Full AttributesConfig resource name. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/attributesConfig` */
  name: string;
}

export const GetAttributesConfigProjectsLocationsCatalogsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/attributesConfig" }),
  svc,
) as unknown as Schema.Schema<GetAttributesConfigProjectsLocationsCatalogsRequest>;

export type GetAttributesConfigProjectsLocationsCatalogsResponse = GoogleCloudRetailV2AttributesConfig;
export const GetAttributesConfigProjectsLocationsCatalogsResponse = GoogleCloudRetailV2AttributesConfig;

export type GetAttributesConfigProjectsLocationsCatalogsError = CommonErrors;

export const getAttributesConfigProjectsLocationsCatalogs: API.OperationMethod<GetAttributesConfigProjectsLocationsCatalogsRequest, GetAttributesConfigProjectsLocationsCatalogsResponse, GetAttributesConfigProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAttributesConfigProjectsLocationsCatalogsRequest,
  output: GetAttributesConfigProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Updates the AttributesConfig. The catalog attributes in the request will be updated in the catalog, or inserted if they do not exist. Existing catalog attributes not included in the request will remain unchanged. Attributes that are assigned to products, but do not exist at the catalog level, are always included in the response. The product attribute is assigned default values for missing catalog attribute fields, e.g., searchable and dynamic facetable options. */
export interface UpdateAttributesConfigProjectsLocationsCatalogsRequest {
  /** Required. Immutable. The fully qualified resource name of the attribute config. Format: `projects/* /locations/* /catalogs/* /attributesConfig` */
  name: string;
  /** Indicates which fields in the provided AttributesConfig to update. The following is the only supported field: * AttributesConfig.catalog_attributes If not set, all supported fields are updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudRetailV2AttributesConfig;
}

export const UpdateAttributesConfigProjectsLocationsCatalogsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudRetailV2AttributesConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/attributesConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateAttributesConfigProjectsLocationsCatalogsRequest>;

export type UpdateAttributesConfigProjectsLocationsCatalogsResponse = GoogleCloudRetailV2AttributesConfig;
export const UpdateAttributesConfigProjectsLocationsCatalogsResponse = GoogleCloudRetailV2AttributesConfig;

export type UpdateAttributesConfigProjectsLocationsCatalogsError = CommonErrors;

export const updateAttributesConfigProjectsLocationsCatalogs: API.OperationMethod<UpdateAttributesConfigProjectsLocationsCatalogsRequest, UpdateAttributesConfigProjectsLocationsCatalogsResponse, UpdateAttributesConfigProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateAttributesConfigProjectsLocationsCatalogsRequest,
  output: UpdateAttributesConfigProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Completes the specified prefix with keyword suggestions. This feature is only available for users who have Retail Search enabled. Enable Retail Search on Cloud Console before using this feature. */
export interface CompleteQueryProjectsLocationsCatalogsRequest {
  /** Required. Catalog for which the completion is performed. Full resource name of catalog, such as `projects/* /locations/global/catalogs/default_catalog`. */
  catalog: string;
  /** Required. The query used to generate suggestions. The maximum number of allowed characters is 255. */
  query?: string;
  /** Recommended field. A unique identifier for tracking visitors. For example, this could be implemented with an HTTP cookie, which should be able to uniquely identify a visitor on a single device. This unique identifier should not change if the visitor logs in or out of the website. The field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. */
  visitorId?: string;
  /** Note that this field applies for `user-data` dataset only. For requests with `cloud-retail` dataset, setting this field has no effect. The language filters applied to the output suggestions. If set, it should contain the language of the query. If not set, suggestions are returned without considering language restrictions. This is the BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47). The maximum number of language codes is 3. */
  languageCodes?: string[];
  /** The device type context for completion suggestions. We recommend that you leave this field empty. It can apply different suggestions on different device types, e.g. `DESKTOP`, `MOBILE`. If it is empty, the suggestions are across all device types. Supported formats: * `UNKNOWN_DEVICE_TYPE` * `DESKTOP` * `MOBILE` * A customized string starts with `OTHER_`, e.g. `OTHER_IPHONE`. */
  deviceType?: string;
  /** Determines which dataset to use for fetching completion. "user-data" will use the dataset imported through CompletionService.ImportCompletionData. `cloud-retail` will use the dataset generated by Cloud Retail based on user events. If left empty, completions will be fetched from the `user-data` dataset. Current supported values: * user-data * cloud-retail: This option requires enabling auto-learning function first. See [guidelines](https://cloud.google.com/retail/docs/completion-overview#generated-completion-dataset). */
  dataset?: string;
  /** Completion max suggestions. If left unset or set to 0, then will fallback to the configured value CompletionConfig.max_suggestions. The maximum allowed max suggestions is 20. If it is set higher, it will be capped by 20. */
  maxSuggestions?: number;
  /** If true, attribute suggestions are enabled and provided in the response. This field is only available for the `cloud-retail` dataset. */
  enableAttributeSuggestions?: boolean;
  /** The entity for customers who run multiple entities, domains, sites, or regions, for example, `Google US`, `Google Ads`, `Waymo`, `google.com`, `youtube.com`, etc. If this is set, it must be an exact match with UserEvent.entity to get per-entity autocomplete results. This field will be applied to `completion_results` only. It has no effect on the `attribute_results`. Also, this entity should be limited to 256 characters, if too long, it will be truncated to 256 characters in both generation and serving time, and may lead to mis-match. To ensure it works, please set the entity with string within 256 characters. */
  entity?: string;
}

export const CompleteQueryProjectsLocationsCatalogsRequest = Schema.Struct({
  catalog: Schema.String.pipe(T.HttpPath("catalog")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  visitorId: Schema.optional(Schema.String).pipe(T.HttpQuery("visitorId")),
  languageCodes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("languageCodes")),
  deviceType: Schema.optional(Schema.String).pipe(T.HttpQuery("deviceType")),
  dataset: Schema.optional(Schema.String).pipe(T.HttpQuery("dataset")),
  maxSuggestions: Schema.optional(Schema.Number).pipe(T.HttpQuery("maxSuggestions")),
  enableAttributeSuggestions: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("enableAttributeSuggestions")),
  entity: Schema.optional(Schema.String).pipe(T.HttpQuery("entity")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}:completeQuery" }),
  svc,
) as unknown as Schema.Schema<CompleteQueryProjectsLocationsCatalogsRequest>;

export type CompleteQueryProjectsLocationsCatalogsResponse = GoogleCloudRetailV2CompleteQueryResponse;
export const CompleteQueryProjectsLocationsCatalogsResponse = GoogleCloudRetailV2CompleteQueryResponse;

export type CompleteQueryProjectsLocationsCatalogsError = CommonErrors;

export const completeQueryProjectsLocationsCatalogs: API.OperationMethod<CompleteQueryProjectsLocationsCatalogsRequest, CompleteQueryProjectsLocationsCatalogsResponse, CompleteQueryProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompleteQueryProjectsLocationsCatalogsRequest,
  output: CompleteQueryProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Manages overal generative question feature state -- enables toggling feature on and off. */
export interface UpdateGenerativeQuestionFeatureProjectsLocationsCatalogsRequest {
  /** Required. Resource name of the affected catalog. Format: projects/{project}/locations/{location}/catalogs/{catalog} */
  catalog: string;
  /** Optional. Indicates which fields in the provided GenerativeQuestionsFeatureConfig to update. If not set or empty, all supported fields are updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudRetailV2GenerativeQuestionsFeatureConfig;
}

export const UpdateGenerativeQuestionFeatureProjectsLocationsCatalogsRequest = Schema.Struct({
  catalog: Schema.String.pipe(T.HttpPath("catalog")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudRetailV2GenerativeQuestionsFeatureConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/generativeQuestionFeature", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateGenerativeQuestionFeatureProjectsLocationsCatalogsRequest>;

export type UpdateGenerativeQuestionFeatureProjectsLocationsCatalogsResponse = GoogleCloudRetailV2GenerativeQuestionsFeatureConfig;
export const UpdateGenerativeQuestionFeatureProjectsLocationsCatalogsResponse = GoogleCloudRetailV2GenerativeQuestionsFeatureConfig;

export type UpdateGenerativeQuestionFeatureProjectsLocationsCatalogsError = CommonErrors;

export const updateGenerativeQuestionFeatureProjectsLocationsCatalogs: API.OperationMethod<UpdateGenerativeQuestionFeatureProjectsLocationsCatalogsRequest, UpdateGenerativeQuestionFeatureProjectsLocationsCatalogsResponse, UpdateGenerativeQuestionFeatureProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateGenerativeQuestionFeatureProjectsLocationsCatalogsRequest,
  output: UpdateGenerativeQuestionFeatureProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Manages overal generative question feature state -- enables toggling feature on and off. */
export interface GetGenerativeQuestionFeatureProjectsLocationsCatalogsRequest {
  /** Required. Resource name of the parent catalog. Format: projects/{project}/locations/{location}/catalogs/{catalog} */
  catalog: string;
}

export const GetGenerativeQuestionFeatureProjectsLocationsCatalogsRequest = Schema.Struct({
  catalog: Schema.String.pipe(T.HttpPath("catalog")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/generativeQuestionFeature" }),
  svc,
) as unknown as Schema.Schema<GetGenerativeQuestionFeatureProjectsLocationsCatalogsRequest>;

export type GetGenerativeQuestionFeatureProjectsLocationsCatalogsResponse = GoogleCloudRetailV2GenerativeQuestionsFeatureConfig;
export const GetGenerativeQuestionFeatureProjectsLocationsCatalogsResponse = GoogleCloudRetailV2GenerativeQuestionsFeatureConfig;

export type GetGenerativeQuestionFeatureProjectsLocationsCatalogsError = CommonErrors;

export const getGenerativeQuestionFeatureProjectsLocationsCatalogs: API.OperationMethod<GetGenerativeQuestionFeatureProjectsLocationsCatalogsRequest, GetGenerativeQuestionFeatureProjectsLocationsCatalogsResponse, GetGenerativeQuestionFeatureProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetGenerativeQuestionFeatureProjectsLocationsCatalogsRequest,
  output: GetGenerativeQuestionFeatureProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Allows management of individual questions. */
export interface UpdateGenerativeQuestionProjectsLocationsCatalogsRequest {
  /** Required. Resource name of the catalog. Format: projects/{project}/locations/{location}/catalogs/{catalog} */
  catalog: string;
  /** Optional. Indicates which fields in the provided GenerativeQuestionConfig to update. The following are NOT supported: * GenerativeQuestionConfig.frequency If not set or empty, all supported fields are updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudRetailV2GenerativeQuestionConfig;
}

export const UpdateGenerativeQuestionProjectsLocationsCatalogsRequest = Schema.Struct({
  catalog: Schema.String.pipe(T.HttpPath("catalog")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudRetailV2GenerativeQuestionConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/generativeQuestion", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateGenerativeQuestionProjectsLocationsCatalogsRequest>;

export type UpdateGenerativeQuestionProjectsLocationsCatalogsResponse = GoogleCloudRetailV2GenerativeQuestionConfig;
export const UpdateGenerativeQuestionProjectsLocationsCatalogsResponse = GoogleCloudRetailV2GenerativeQuestionConfig;

export type UpdateGenerativeQuestionProjectsLocationsCatalogsError = CommonErrors;

export const updateGenerativeQuestionProjectsLocationsCatalogs: API.OperationMethod<UpdateGenerativeQuestionProjectsLocationsCatalogsRequest, UpdateGenerativeQuestionProjectsLocationsCatalogsResponse, UpdateGenerativeQuestionProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateGenerativeQuestionProjectsLocationsCatalogsRequest,
  output: UpdateGenerativeQuestionProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Returns the conversational search customization config for a given catalog. */
export interface GetConversationalSearchCustomizationConfigProjectsLocationsCatalogsRequest {
  /** Required. Resource name of the parent catalog. Format: projects/{project}/locations/{location}/catalogs/{catalog} */
  name: string;
}

export const GetConversationalSearchCustomizationConfigProjectsLocationsCatalogsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/conversationalSearchCustomizationConfig" }),
  svc,
) as unknown as Schema.Schema<GetConversationalSearchCustomizationConfigProjectsLocationsCatalogsRequest>;

export type GetConversationalSearchCustomizationConfigProjectsLocationsCatalogsResponse = GoogleCloudRetailV2ConversationalSearchCustomizationConfig;
export const GetConversationalSearchCustomizationConfigProjectsLocationsCatalogsResponse = GoogleCloudRetailV2ConversationalSearchCustomizationConfig;

export type GetConversationalSearchCustomizationConfigProjectsLocationsCatalogsError = CommonErrors;

export const getConversationalSearchCustomizationConfigProjectsLocationsCatalogs: API.OperationMethod<GetConversationalSearchCustomizationConfigProjectsLocationsCatalogsRequest, GetConversationalSearchCustomizationConfigProjectsLocationsCatalogsResponse, GetConversationalSearchCustomizationConfigProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetConversationalSearchCustomizationConfigProjectsLocationsCatalogsRequest,
  output: GetConversationalSearchCustomizationConfigProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Updates the conversational search customization config for a given catalog. */
export interface UpdateConversationalSearchCustomizationConfigProjectsLocationsCatalogsRequest {
  /** Required. Resource name of the catalog. Format: projects/{project}/locations/{location}/catalogs/{catalog} */
  catalog: string;
  /** Optional. Indicates which fields in the provided ConversationalSearchCustomizationConfig to update. If not set or empty, all supported fields are updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudRetailV2ConversationalSearchCustomizationConfig;
}

export const UpdateConversationalSearchCustomizationConfigProjectsLocationsCatalogsRequest = Schema.Struct({
  catalog: Schema.String.pipe(T.HttpPath("catalog")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudRetailV2ConversationalSearchCustomizationConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/conversationalSearchCustomizationConfig", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UpdateConversationalSearchCustomizationConfigProjectsLocationsCatalogsRequest>;

export type UpdateConversationalSearchCustomizationConfigProjectsLocationsCatalogsResponse = GoogleCloudRetailV2ConversationalSearchCustomizationConfig;
export const UpdateConversationalSearchCustomizationConfigProjectsLocationsCatalogsResponse = GoogleCloudRetailV2ConversationalSearchCustomizationConfig;

export type UpdateConversationalSearchCustomizationConfigProjectsLocationsCatalogsError = CommonErrors;

export const updateConversationalSearchCustomizationConfigProjectsLocationsCatalogs: API.OperationMethod<UpdateConversationalSearchCustomizationConfigProjectsLocationsCatalogsRequest, UpdateConversationalSearchCustomizationConfigProjectsLocationsCatalogsResponse, UpdateConversationalSearchCustomizationConfigProjectsLocationsCatalogsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UpdateConversationalSearchCustomizationConfigProjectsLocationsCatalogsRequest,
  output: UpdateConversationalSearchCustomizationConfigProjectsLocationsCatalogsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsLocationsCatalogsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsLocationsCatalogsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsOperationsRequest>;

export type ListProjectsLocationsCatalogsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsLocationsCatalogsOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsLocationsCatalogsOperationsError = CommonErrors;

export const listProjectsLocationsCatalogsOperations = API.makePaginated(() => ({
  input: ListProjectsLocationsCatalogsOperationsRequest,
  output: ListProjectsLocationsCatalogsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsCatalogsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsCatalogsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCatalogsOperationsRequest>;

export type GetProjectsLocationsCatalogsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsCatalogsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsCatalogsOperationsError = CommonErrors;

export const getProjectsLocationsCatalogsOperations: API.OperationMethod<GetProjectsLocationsCatalogsOperationsRequest, GetProjectsLocationsCatalogsOperationsResponse, GetProjectsLocationsCatalogsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCatalogsOperationsRequest,
  output: GetProjectsLocationsCatalogsOperationsResponse,
  errors: [],
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsLocationsCatalogsBranchesOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsLocationsCatalogsBranchesOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/branches/{branchesId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCatalogsBranchesOperationsRequest>;

export type GetProjectsLocationsCatalogsBranchesOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsLocationsCatalogsBranchesOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsLocationsCatalogsBranchesOperationsError = CommonErrors;

export const getProjectsLocationsCatalogsBranchesOperations: API.OperationMethod<GetProjectsLocationsCatalogsBranchesOperationsRequest, GetProjectsLocationsCatalogsBranchesOperationsResponse, GetProjectsLocationsCatalogsBranchesOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCatalogsBranchesOperationsRequest,
  output: GetProjectsLocationsCatalogsBranchesOperationsResponse,
  errors: [],
}));

/** Creates a Product. */
export interface CreateProjectsLocationsCatalogsBranchesProductsRequest {
  /** Required. The parent catalog resource name, such as `projects/* /locations/global/catalogs/default_catalog/branches/default_branch`. */
  parent: string;
  /** Required. The ID to use for the Product, which will become the final component of the Product.name. If the caller does not have permission to create the Product, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. This field must be unique among all Products with the same parent. Otherwise, an ALREADY_EXISTS error is returned. This field must be a UTF-8 encoded string with a length limit of 128 characters. Otherwise, an INVALID_ARGUMENT error is returned. */
  productId?: string;
  /** Request body */
  body?: GoogleCloudRetailV2Product;
}

export const CreateProjectsLocationsCatalogsBranchesProductsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  productId: Schema.optional(Schema.String).pipe(T.HttpQuery("productId")),
  body: Schema.optional(GoogleCloudRetailV2Product).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/branches/{branchesId}/products", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCatalogsBranchesProductsRequest>;

export type CreateProjectsLocationsCatalogsBranchesProductsResponse = GoogleCloudRetailV2Product;
export const CreateProjectsLocationsCatalogsBranchesProductsResponse = GoogleCloudRetailV2Product;

export type CreateProjectsLocationsCatalogsBranchesProductsError = CommonErrors;

export const createProjectsLocationsCatalogsBranchesProducts: API.OperationMethod<CreateProjectsLocationsCatalogsBranchesProductsRequest, CreateProjectsLocationsCatalogsBranchesProductsResponse, CreateProjectsLocationsCatalogsBranchesProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCatalogsBranchesProductsRequest,
  output: CreateProjectsLocationsCatalogsBranchesProductsResponse,
  errors: [],
}));

/** Gets a Product. */
export interface GetProjectsLocationsCatalogsBranchesProductsRequest {
  /** Required. Full resource name of Product, such as `projects/* /locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id`. If the caller does not have permission to access the Product, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. If the requested Product does not exist, a NOT_FOUND error is returned. */
  name: string;
}

export const GetProjectsLocationsCatalogsBranchesProductsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/branches/{branchesId}/products/{productsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCatalogsBranchesProductsRequest>;

export type GetProjectsLocationsCatalogsBranchesProductsResponse = GoogleCloudRetailV2Product;
export const GetProjectsLocationsCatalogsBranchesProductsResponse = GoogleCloudRetailV2Product;

export type GetProjectsLocationsCatalogsBranchesProductsError = CommonErrors;

export const getProjectsLocationsCatalogsBranchesProducts: API.OperationMethod<GetProjectsLocationsCatalogsBranchesProductsRequest, GetProjectsLocationsCatalogsBranchesProductsResponse, GetProjectsLocationsCatalogsBranchesProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCatalogsBranchesProductsRequest,
  output: GetProjectsLocationsCatalogsBranchesProductsResponse,
  errors: [],
}));

/** Gets a list of Products. */
export interface ListProjectsLocationsCatalogsBranchesProductsRequest {
  /** Required. The parent branch resource name, such as `projects/* /locations/global/catalogs/default_catalog/branches/0`. Use `default_branch` as the branch ID, to list products under the default branch. If the caller does not have permission to list Products under this branch, regardless of whether or not this branch exists, a PERMISSION_DENIED error is returned. */
  parent: string;
  /** Maximum number of Products to return. If unspecified, defaults to 100. The maximum allowed value is 1000. Values above 1000 will be coerced to 1000. If this field is negative, an INVALID_ARGUMENT error is returned. */
  pageSize?: number;
  /** A page token ListProductsResponse.next_page_token, received from a previous ProductService.ListProducts call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ProductService.ListProducts must match the call that provided the page token. Otherwise, an INVALID_ARGUMENT error is returned. */
  pageToken?: string;
  /** A filter to apply on the list results. Supported features: * List all the products under the parent branch if filter is unset. * List Product.Type.VARIANT Products sharing the same Product.Type.PRIMARY Product. For example: `primary_product_id = "some_product_id"` * List Products bundled in a Product.Type.COLLECTION Product. For example: `collection_product_id = "some_product_id"` * List Products with a partibular type. For example: `type = "PRIMARY"` `type = "VARIANT"` `type = "COLLECTION"` If the field is unrecognizable, an INVALID_ARGUMENT error is returned. If the specified Product.Type.PRIMARY Product or Product.Type.COLLECTION Product does not exist, a NOT_FOUND error is returned. */
  filter?: string;
  /** The fields of Product to return in the responses. If not set or empty, the following fields are returned: * Product.name * Product.id * Product.title * Product.uri * Product.images * Product.price_info * Product.brands If "*" is provided, all fields are returned. Product.name is always returned no matter what mask is set. If an unsupported or unknown field is provided, an INVALID_ARGUMENT error is returned. */
  readMask?: string;
}

export const ListProjectsLocationsCatalogsBranchesProductsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  readMask: Schema.optional(Schema.String).pipe(T.HttpQuery("readMask")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/branches/{branchesId}/products" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsBranchesProductsRequest>;

export type ListProjectsLocationsCatalogsBranchesProductsResponse = GoogleCloudRetailV2ListProductsResponse;
export const ListProjectsLocationsCatalogsBranchesProductsResponse = GoogleCloudRetailV2ListProductsResponse;

export type ListProjectsLocationsCatalogsBranchesProductsError = CommonErrors;

export const listProjectsLocationsCatalogsBranchesProducts = API.makePaginated(() => ({
  input: ListProjectsLocationsCatalogsBranchesProductsRequest,
  output: ListProjectsLocationsCatalogsBranchesProductsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Updates a Product. */
export interface PatchProjectsLocationsCatalogsBranchesProductsRequest {
  /** Immutable. Full resource name of the product, such as `projects/* /locations/global/catalogs/default_catalog/branches/default_branch/products/product_id`. */
  name: string;
  /** Indicates which fields in the provided Product to update. The immutable and output only fields are NOT supported. If not set, all supported fields (the fields that are neither immutable nor output only) are updated. If an unsupported or unknown field is provided, an INVALID_ARGUMENT error is returned. The attribute key can be updated by setting the mask path as "attributes.${key_name}". If a key name is present in the mask but not in the patching product from the request, this key will be deleted after the update. */
  updateMask?: string;
  /** If set to true, and the Product is not found, a new Product will be created. In this situation, `update_mask` is ignored. */
  allowMissing?: boolean;
  /** Request body */
  body?: GoogleCloudRetailV2Product;
}

export const PatchProjectsLocationsCatalogsBranchesProductsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  allowMissing: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("allowMissing")),
  body: Schema.optional(GoogleCloudRetailV2Product).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/branches/{branchesId}/products/{productsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCatalogsBranchesProductsRequest>;

export type PatchProjectsLocationsCatalogsBranchesProductsResponse = GoogleCloudRetailV2Product;
export const PatchProjectsLocationsCatalogsBranchesProductsResponse = GoogleCloudRetailV2Product;

export type PatchProjectsLocationsCatalogsBranchesProductsError = CommonErrors;

export const patchProjectsLocationsCatalogsBranchesProducts: API.OperationMethod<PatchProjectsLocationsCatalogsBranchesProductsRequest, PatchProjectsLocationsCatalogsBranchesProductsResponse, PatchProjectsLocationsCatalogsBranchesProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCatalogsBranchesProductsRequest,
  output: PatchProjectsLocationsCatalogsBranchesProductsResponse,
  errors: [],
}));

/** Deletes a Product. */
export interface DeleteProjectsLocationsCatalogsBranchesProductsRequest {
  /** Required. Full resource name of Product, such as `projects/* /locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id`. If the caller does not have permission to delete the Product, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. If the Product to delete does not exist, a NOT_FOUND error is returned. The Product to delete can neither be a Product.Type.COLLECTION Product member nor a Product.Type.PRIMARY Product with more than one variants. Otherwise, an INVALID_ARGUMENT error is returned. All inventory information for the named Product will be deleted. */
  name: string;
}

export const DeleteProjectsLocationsCatalogsBranchesProductsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/branches/{branchesId}/products/{productsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCatalogsBranchesProductsRequest>;

export type DeleteProjectsLocationsCatalogsBranchesProductsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsCatalogsBranchesProductsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsCatalogsBranchesProductsError = CommonErrors;

export const deleteProjectsLocationsCatalogsBranchesProducts: API.OperationMethod<DeleteProjectsLocationsCatalogsBranchesProductsRequest, DeleteProjectsLocationsCatalogsBranchesProductsResponse, DeleteProjectsLocationsCatalogsBranchesProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCatalogsBranchesProductsRequest,
  output: DeleteProjectsLocationsCatalogsBranchesProductsResponse,
  errors: [],
}));

/** Permanently deletes all selected Products under a branch. This process is asynchronous. If the request is valid, the removal will be enqueued and processed offline. Depending on the number of Products, this operation could take hours to complete. Before the operation completes, some Products may still be returned by ProductService.GetProduct or ProductService.ListProducts. Depending on the number of Products, this operation could take hours to complete. To get a sample of Products that would be deleted, set PurgeProductsRequest.force to false. */
export interface PurgeProjectsLocationsCatalogsBranchesProductsRequest {
  /** Required. The resource name of the branch under which the products are created. The format is `projects/${projectId}/locations/global/catalogs/${catalogId}/branches/${branchId}` */
  parent: string;
  /** Request body */
  body?: GoogleCloudRetailV2PurgeProductsRequest;
}

export const PurgeProjectsLocationsCatalogsBranchesProductsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRetailV2PurgeProductsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/branches/{branchesId}/products:purge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PurgeProjectsLocationsCatalogsBranchesProductsRequest>;

export type PurgeProjectsLocationsCatalogsBranchesProductsResponse = GoogleLongrunningOperation;
export const PurgeProjectsLocationsCatalogsBranchesProductsResponse = GoogleLongrunningOperation;

export type PurgeProjectsLocationsCatalogsBranchesProductsError = CommonErrors;

export const purgeProjectsLocationsCatalogsBranchesProducts: API.OperationMethod<PurgeProjectsLocationsCatalogsBranchesProductsRequest, PurgeProjectsLocationsCatalogsBranchesProductsResponse, PurgeProjectsLocationsCatalogsBranchesProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PurgeProjectsLocationsCatalogsBranchesProductsRequest,
  output: PurgeProjectsLocationsCatalogsBranchesProductsResponse,
  errors: [],
}));

/** Bulk import of multiple Products. Request processing may be synchronous. Non-existing items are created. Note that it is possible for a subset of the Products to be successfully updated. */
export interface ImportProjectsLocationsCatalogsBranchesProductsRequest {
  /** Required. `projects/1234/locations/global/catalogs/default_catalog/branches/default_branch` If no updateMask is specified, requires products.create permission. If updateMask is specified, requires products.update permission. */
  parent: string;
  /** Request body */
  body?: GoogleCloudRetailV2ImportProductsRequest;
}

export const ImportProjectsLocationsCatalogsBranchesProductsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRetailV2ImportProductsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/branches/{branchesId}/products:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsCatalogsBranchesProductsRequest>;

export type ImportProjectsLocationsCatalogsBranchesProductsResponse = GoogleLongrunningOperation;
export const ImportProjectsLocationsCatalogsBranchesProductsResponse = GoogleLongrunningOperation;

export type ImportProjectsLocationsCatalogsBranchesProductsError = CommonErrors;

export const importProjectsLocationsCatalogsBranchesProducts: API.OperationMethod<ImportProjectsLocationsCatalogsBranchesProductsRequest, ImportProjectsLocationsCatalogsBranchesProductsResponse, ImportProjectsLocationsCatalogsBranchesProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsCatalogsBranchesProductsRequest,
  output: ImportProjectsLocationsCatalogsBranchesProductsResponse,
  errors: [],
}));

/** Updates inventory information for a Product while respecting the last update timestamps of each inventory field. This process is asynchronous and does not require the Product to exist before updating fulfillment information. If the request is valid, the update is enqueued and processed downstream. As a consequence, when a response is returned, updates are not immediately manifested in the Product queried by ProductService.GetProduct or ProductService.ListProducts. When inventory is updated with ProductService.CreateProduct and ProductService.UpdateProduct, the specified inventory field value(s) overwrite any existing value(s) while ignoring the last update time for this field. Furthermore, the last update times for the specified inventory fields are overwritten by the times of the ProductService.CreateProduct or ProductService.UpdateProduct request. If no inventory fields are set in CreateProductRequest.product, then any pre-existing inventory information for this product is used. If no inventory fields are set in SetInventoryRequest.set_mask, then any existing inventory information is preserved. Pre-existing inventory information can only be updated with ProductService.SetInventory, ProductService.AddFulfillmentPlaces, and ProductService.RemoveFulfillmentPlaces. The returned Operations is obsolete after one day, and the GetOperation API returns `NOT_FOUND` afterwards. If conflicting updates are issued, the Operations associated with the stale updates are not marked as done until they are obsolete. */
export interface SetInventoryProjectsLocationsCatalogsBranchesProductsRequest {
  /** Immutable. Full resource name of the product, such as `projects/* /locations/global/catalogs/default_catalog/branches/default_branch/products/product_id`. */
  name: string;
  /** Request body */
  body?: GoogleCloudRetailV2SetInventoryRequest;
}

export const SetInventoryProjectsLocationsCatalogsBranchesProductsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRetailV2SetInventoryRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/branches/{branchesId}/products/{productsId}:setInventory", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SetInventoryProjectsLocationsCatalogsBranchesProductsRequest>;

export type SetInventoryProjectsLocationsCatalogsBranchesProductsResponse = GoogleLongrunningOperation;
export const SetInventoryProjectsLocationsCatalogsBranchesProductsResponse = GoogleLongrunningOperation;

export type SetInventoryProjectsLocationsCatalogsBranchesProductsError = CommonErrors;

export const setInventoryProjectsLocationsCatalogsBranchesProducts: API.OperationMethod<SetInventoryProjectsLocationsCatalogsBranchesProductsRequest, SetInventoryProjectsLocationsCatalogsBranchesProductsResponse, SetInventoryProjectsLocationsCatalogsBranchesProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SetInventoryProjectsLocationsCatalogsBranchesProductsRequest,
  output: SetInventoryProjectsLocationsCatalogsBranchesProductsResponse,
  errors: [],
}));

/** We recommend that you use the ProductService.AddLocalInventories method instead of the ProductService.AddFulfillmentPlaces method. ProductService.AddLocalInventories achieves the same results but provides more fine-grained control over ingesting local inventory data. Incrementally adds place IDs to Product.fulfillment_info.place_ids. This process is asynchronous and does not require the Product to exist before updating fulfillment information. If the request is valid, the update will be enqueued and processed downstream. As a consequence, when a response is returned, the added place IDs are not immediately manifested in the Product queried by ProductService.GetProduct or ProductService.ListProducts. The returned Operations will be obsolete after 1 day, and GetOperation API will return NOT_FOUND afterwards. If conflicting updates are issued, the Operations associated with the stale updates will not be marked as done until being obsolete. */
export interface AddFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsRequest {
  /** Required. Full resource name of Product, such as `projects/* /locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id`. If the caller does not have permission to access the Product, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. */
  product: string;
  /** Request body */
  body?: GoogleCloudRetailV2AddFulfillmentPlacesRequest;
}

export const AddFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsRequest = Schema.Struct({
  product: Schema.String.pipe(T.HttpPath("product")),
  body: Schema.optional(GoogleCloudRetailV2AddFulfillmentPlacesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/branches/{branchesId}/products/{productsId}:addFulfillmentPlaces", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsRequest>;

export type AddFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsResponse = GoogleLongrunningOperation;
export const AddFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsResponse = GoogleLongrunningOperation;

export type AddFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsError = CommonErrors;

export const addFulfillmentPlacesProjectsLocationsCatalogsBranchesProducts: API.OperationMethod<AddFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsRequest, AddFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsResponse, AddFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsRequest,
  output: AddFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsResponse,
  errors: [],
}));

/** We recommend that you use the ProductService.RemoveLocalInventories method instead of the ProductService.RemoveFulfillmentPlaces method. ProductService.RemoveLocalInventories achieves the same results but provides more fine-grained control over ingesting local inventory data. Incrementally removes place IDs from a Product.fulfillment_info.place_ids. This process is asynchronous and does not require the Product to exist before updating fulfillment information. If the request is valid, the update will be enqueued and processed downstream. As a consequence, when a response is returned, the removed place IDs are not immediately manifested in the Product queried by ProductService.GetProduct or ProductService.ListProducts. The returned Operations will be obsolete after 1 day, and GetOperation API will return NOT_FOUND afterwards. If conflicting updates are issued, the Operations associated with the stale updates will not be marked as done until being obsolete. */
export interface RemoveFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsRequest {
  /** Required. Full resource name of Product, such as `projects/* /locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id`. If the caller does not have permission to access the Product, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. */
  product: string;
  /** Request body */
  body?: GoogleCloudRetailV2RemoveFulfillmentPlacesRequest;
}

export const RemoveFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsRequest = Schema.Struct({
  product: Schema.String.pipe(T.HttpPath("product")),
  body: Schema.optional(GoogleCloudRetailV2RemoveFulfillmentPlacesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/branches/{branchesId}/products/{productsId}:removeFulfillmentPlaces", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsRequest>;

export type RemoveFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsResponse = GoogleLongrunningOperation;
export const RemoveFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsResponse = GoogleLongrunningOperation;

export type RemoveFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsError = CommonErrors;

export const removeFulfillmentPlacesProjectsLocationsCatalogsBranchesProducts: API.OperationMethod<RemoveFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsRequest, RemoveFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsResponse, RemoveFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsRequest,
  output: RemoveFulfillmentPlacesProjectsLocationsCatalogsBranchesProductsResponse,
  errors: [],
}));

/** Updates local inventory information for a Product at a list of places, while respecting the last update timestamps of each inventory field. This process is asynchronous and does not require the Product to exist before updating inventory information. If the request is valid, the update will be enqueued and processed downstream. As a consequence, when a response is returned, updates are not immediately manifested in the Product queried by ProductService.GetProduct or ProductService.ListProducts. Local inventory information can only be modified using this method. ProductService.CreateProduct and ProductService.UpdateProduct has no effect on local inventories. The returned Operations will be obsolete after 1 day, and GetOperation API will return NOT_FOUND afterwards. If conflicting updates are issued, the Operations associated with the stale updates will not be marked as done until being obsolete. */
export interface AddLocalInventoriesProjectsLocationsCatalogsBranchesProductsRequest {
  /** Required. Full resource name of Product, such as `projects/* /locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id`. If the caller does not have permission to access the Product, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. */
  product: string;
  /** Request body */
  body?: GoogleCloudRetailV2AddLocalInventoriesRequest;
}

export const AddLocalInventoriesProjectsLocationsCatalogsBranchesProductsRequest = Schema.Struct({
  product: Schema.String.pipe(T.HttpPath("product")),
  body: Schema.optional(GoogleCloudRetailV2AddLocalInventoriesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/branches/{branchesId}/products/{productsId}:addLocalInventories", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddLocalInventoriesProjectsLocationsCatalogsBranchesProductsRequest>;

export type AddLocalInventoriesProjectsLocationsCatalogsBranchesProductsResponse = GoogleLongrunningOperation;
export const AddLocalInventoriesProjectsLocationsCatalogsBranchesProductsResponse = GoogleLongrunningOperation;

export type AddLocalInventoriesProjectsLocationsCatalogsBranchesProductsError = CommonErrors;

export const addLocalInventoriesProjectsLocationsCatalogsBranchesProducts: API.OperationMethod<AddLocalInventoriesProjectsLocationsCatalogsBranchesProductsRequest, AddLocalInventoriesProjectsLocationsCatalogsBranchesProductsResponse, AddLocalInventoriesProjectsLocationsCatalogsBranchesProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddLocalInventoriesProjectsLocationsCatalogsBranchesProductsRequest,
  output: AddLocalInventoriesProjectsLocationsCatalogsBranchesProductsResponse,
  errors: [],
}));

/** Remove local inventory information for a Product at a list of places at a removal timestamp. This process is asynchronous. If the request is valid, the removal will be enqueued and processed downstream. As a consequence, when a response is returned, removals are not immediately manifested in the Product queried by ProductService.GetProduct or ProductService.ListProducts. Local inventory information can only be removed using this method. ProductService.CreateProduct and ProductService.UpdateProduct has no effect on local inventories. The returned Operations will be obsolete after 1 day, and GetOperation API will return NOT_FOUND afterwards. If conflicting updates are issued, the Operations associated with the stale updates will not be marked as done until being obsolete. */
export interface RemoveLocalInventoriesProjectsLocationsCatalogsBranchesProductsRequest {
  /** Required. Full resource name of Product, such as `projects/* /locations/global/catalogs/default_catalog/branches/default_branch/products/some_product_id`. If the caller does not have permission to access the Product, regardless of whether or not it exists, a PERMISSION_DENIED error is returned. */
  product: string;
  /** Request body */
  body?: GoogleCloudRetailV2RemoveLocalInventoriesRequest;
}

export const RemoveLocalInventoriesProjectsLocationsCatalogsBranchesProductsRequest = Schema.Struct({
  product: Schema.String.pipe(T.HttpPath("product")),
  body: Schema.optional(GoogleCloudRetailV2RemoveLocalInventoriesRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/branches/{branchesId}/products/{productsId}:removeLocalInventories", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveLocalInventoriesProjectsLocationsCatalogsBranchesProductsRequest>;

export type RemoveLocalInventoriesProjectsLocationsCatalogsBranchesProductsResponse = GoogleLongrunningOperation;
export const RemoveLocalInventoriesProjectsLocationsCatalogsBranchesProductsResponse = GoogleLongrunningOperation;

export type RemoveLocalInventoriesProjectsLocationsCatalogsBranchesProductsError = CommonErrors;

export const removeLocalInventoriesProjectsLocationsCatalogsBranchesProducts: API.OperationMethod<RemoveLocalInventoriesProjectsLocationsCatalogsBranchesProductsRequest, RemoveLocalInventoriesProjectsLocationsCatalogsBranchesProductsResponse, RemoveLocalInventoriesProjectsLocationsCatalogsBranchesProductsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveLocalInventoriesProjectsLocationsCatalogsBranchesProductsRequest,
  output: RemoveLocalInventoriesProjectsLocationsCatalogsBranchesProductsResponse,
  errors: [],
}));

/** Adds the specified CatalogAttribute to the AttributesConfig. If the CatalogAttribute to add already exists, an ALREADY_EXISTS error is returned. */
export interface AddCatalogAttributeProjectsLocationsCatalogsAttributesConfigRequest {
  /** Required. Full AttributesConfig resource name. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/attributesConfig` */
  attributesConfig: string;
  /** Request body */
  body?: GoogleCloudRetailV2AddCatalogAttributeRequest;
}

export const AddCatalogAttributeProjectsLocationsCatalogsAttributesConfigRequest = Schema.Struct({
  attributesConfig: Schema.String.pipe(T.HttpPath("attributesConfig")),
  body: Schema.optional(GoogleCloudRetailV2AddCatalogAttributeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/attributesConfig:addCatalogAttribute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddCatalogAttributeProjectsLocationsCatalogsAttributesConfigRequest>;

export type AddCatalogAttributeProjectsLocationsCatalogsAttributesConfigResponse = GoogleCloudRetailV2AttributesConfig;
export const AddCatalogAttributeProjectsLocationsCatalogsAttributesConfigResponse = GoogleCloudRetailV2AttributesConfig;

export type AddCatalogAttributeProjectsLocationsCatalogsAttributesConfigError = CommonErrors;

export const addCatalogAttributeProjectsLocationsCatalogsAttributesConfig: API.OperationMethod<AddCatalogAttributeProjectsLocationsCatalogsAttributesConfigRequest, AddCatalogAttributeProjectsLocationsCatalogsAttributesConfigResponse, AddCatalogAttributeProjectsLocationsCatalogsAttributesConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddCatalogAttributeProjectsLocationsCatalogsAttributesConfigRequest,
  output: AddCatalogAttributeProjectsLocationsCatalogsAttributesConfigResponse,
  errors: [],
}));

/** Removes the specified CatalogAttribute from the AttributesConfig. If the CatalogAttribute to remove does not exist, a NOT_FOUND error is returned. */
export interface RemoveCatalogAttributeProjectsLocationsCatalogsAttributesConfigRequest {
  /** Required. Full AttributesConfig resource name. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/attributesConfig` */
  attributesConfig: string;
  /** Request body */
  body?: GoogleCloudRetailV2RemoveCatalogAttributeRequest;
}

export const RemoveCatalogAttributeProjectsLocationsCatalogsAttributesConfigRequest = Schema.Struct({
  attributesConfig: Schema.String.pipe(T.HttpPath("attributesConfig")),
  body: Schema.optional(GoogleCloudRetailV2RemoveCatalogAttributeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/attributesConfig:removeCatalogAttribute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveCatalogAttributeProjectsLocationsCatalogsAttributesConfigRequest>;

export type RemoveCatalogAttributeProjectsLocationsCatalogsAttributesConfigResponse = GoogleCloudRetailV2AttributesConfig;
export const RemoveCatalogAttributeProjectsLocationsCatalogsAttributesConfigResponse = GoogleCloudRetailV2AttributesConfig;

export type RemoveCatalogAttributeProjectsLocationsCatalogsAttributesConfigError = CommonErrors;

export const removeCatalogAttributeProjectsLocationsCatalogsAttributesConfig: API.OperationMethod<RemoveCatalogAttributeProjectsLocationsCatalogsAttributesConfigRequest, RemoveCatalogAttributeProjectsLocationsCatalogsAttributesConfigResponse, RemoveCatalogAttributeProjectsLocationsCatalogsAttributesConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveCatalogAttributeProjectsLocationsCatalogsAttributesConfigRequest,
  output: RemoveCatalogAttributeProjectsLocationsCatalogsAttributesConfigResponse,
  errors: [],
}));

/** Replaces the specified CatalogAttribute in the AttributesConfig by updating the catalog attribute with the same CatalogAttribute.key. If the CatalogAttribute to replace does not exist, a NOT_FOUND error is returned. */
export interface ReplaceCatalogAttributeProjectsLocationsCatalogsAttributesConfigRequest {
  /** Required. Full AttributesConfig resource name. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/attributesConfig` */
  attributesConfig: string;
  /** Request body */
  body?: GoogleCloudRetailV2ReplaceCatalogAttributeRequest;
}

export const ReplaceCatalogAttributeProjectsLocationsCatalogsAttributesConfigRequest = Schema.Struct({
  attributesConfig: Schema.String.pipe(T.HttpPath("attributesConfig")),
  body: Schema.optional(GoogleCloudRetailV2ReplaceCatalogAttributeRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/attributesConfig:replaceCatalogAttribute", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ReplaceCatalogAttributeProjectsLocationsCatalogsAttributesConfigRequest>;

export type ReplaceCatalogAttributeProjectsLocationsCatalogsAttributesConfigResponse = GoogleCloudRetailV2AttributesConfig;
export const ReplaceCatalogAttributeProjectsLocationsCatalogsAttributesConfigResponse = GoogleCloudRetailV2AttributesConfig;

export type ReplaceCatalogAttributeProjectsLocationsCatalogsAttributesConfigError = CommonErrors;

export const replaceCatalogAttributeProjectsLocationsCatalogsAttributesConfig: API.OperationMethod<ReplaceCatalogAttributeProjectsLocationsCatalogsAttributesConfigRequest, ReplaceCatalogAttributeProjectsLocationsCatalogsAttributesConfigResponse, ReplaceCatalogAttributeProjectsLocationsCatalogsAttributesConfigError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ReplaceCatalogAttributeProjectsLocationsCatalogsAttributesConfigRequest,
  output: ReplaceCatalogAttributeProjectsLocationsCatalogsAttributesConfigResponse,
  errors: [],
}));

/** Performs a search. This feature is only available for users who have Retail Search enabled. Enable Retail Search on Cloud Console before using this feature. */
export interface SearchProjectsLocationsCatalogsPlacementsRequest {
  /** Required. The resource name of the Retail Search serving config, such as `projects/* /locations/global/catalogs/default_catalog/servingConfigs/default_serving_config` or the name of the legacy placement resource, such as `projects/* /locations/global/catalogs/default_catalog/placements/default_search`. This field is used to identify the serving config name and the set of models that are used to make the search. */
  placement: string;
  /** Request body */
  body?: GoogleCloudRetailV2SearchRequest;
}

export const SearchProjectsLocationsCatalogsPlacementsRequest = Schema.Struct({
  placement: Schema.String.pipe(T.HttpPath("placement")),
  body: Schema.optional(GoogleCloudRetailV2SearchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/placements/{placementsId}:search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchProjectsLocationsCatalogsPlacementsRequest>;

export type SearchProjectsLocationsCatalogsPlacementsResponse = GoogleCloudRetailV2SearchResponse;
export const SearchProjectsLocationsCatalogsPlacementsResponse = GoogleCloudRetailV2SearchResponse;

export type SearchProjectsLocationsCatalogsPlacementsError = CommonErrors;

export const searchProjectsLocationsCatalogsPlacements: API.OperationMethod<SearchProjectsLocationsCatalogsPlacementsRequest, SearchProjectsLocationsCatalogsPlacementsResponse, SearchProjectsLocationsCatalogsPlacementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchProjectsLocationsCatalogsPlacementsRequest,
  output: SearchProjectsLocationsCatalogsPlacementsResponse,
  errors: [],
}));

/** Performs a conversational search. This feature is only available for users who have Conversational Search enabled. */
export interface ConversationalSearchProjectsLocationsCatalogsPlacementsRequest {
  /** Required. The resource name of the search engine placement, such as `projects/* /locations/global/catalogs/default_catalog/placements/default_search` or `projects/* /locations/global/catalogs/default_catalog/servingConfigs/default_serving_config` This field is used to identify the serving config name and the set of models that will be used to make the search. */
  placement: string;
  /** Request body */
  body?: GoogleCloudRetailV2ConversationalSearchRequest;
}

export const ConversationalSearchProjectsLocationsCatalogsPlacementsRequest = Schema.Struct({
  placement: Schema.String.pipe(T.HttpPath("placement")),
  body: Schema.optional(GoogleCloudRetailV2ConversationalSearchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/placements/{placementsId}:conversationalSearch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ConversationalSearchProjectsLocationsCatalogsPlacementsRequest>;

export type ConversationalSearchProjectsLocationsCatalogsPlacementsResponse = GoogleCloudRetailV2ConversationalSearchResponse;
export const ConversationalSearchProjectsLocationsCatalogsPlacementsResponse = GoogleCloudRetailV2ConversationalSearchResponse;

export type ConversationalSearchProjectsLocationsCatalogsPlacementsError = CommonErrors;

export const conversationalSearchProjectsLocationsCatalogsPlacements: API.OperationMethod<ConversationalSearchProjectsLocationsCatalogsPlacementsRequest, ConversationalSearchProjectsLocationsCatalogsPlacementsResponse, ConversationalSearchProjectsLocationsCatalogsPlacementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ConversationalSearchProjectsLocationsCatalogsPlacementsRequest,
  output: ConversationalSearchProjectsLocationsCatalogsPlacementsResponse,
  errors: [],
}));

/** Makes a recommendation prediction. */
export interface PredictProjectsLocationsCatalogsPlacementsRequest {
  /** Required. Full resource name of the format: `{placement=projects/* /locations/global/catalogs/default_catalog/servingConfigs/*}` or `{placement=projects/* /locations/global/catalogs/default_catalog/placements/*}`. We recommend using the `servingConfigs` resource. `placements` is a legacy resource. The ID of the Recommendations AI serving config or placement. Before you can request predictions from your model, you must create at least one serving config or placement for it. For more information, see [Manage serving configs] (https://cloud.google.com/retail/docs/manage-configs). The full list of available serving configs can be seen at https://console.cloud.google.com/ai/retail/catalogs/default_catalog/configs */
  placement: string;
  /** Request body */
  body?: GoogleCloudRetailV2PredictRequest;
}

export const PredictProjectsLocationsCatalogsPlacementsRequest = Schema.Struct({
  placement: Schema.String.pipe(T.HttpPath("placement")),
  body: Schema.optional(GoogleCloudRetailV2PredictRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/placements/{placementsId}:predict", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PredictProjectsLocationsCatalogsPlacementsRequest>;

export type PredictProjectsLocationsCatalogsPlacementsResponse = GoogleCloudRetailV2PredictResponse;
export const PredictProjectsLocationsCatalogsPlacementsResponse = GoogleCloudRetailV2PredictResponse;

export type PredictProjectsLocationsCatalogsPlacementsError = CommonErrors;

export const predictProjectsLocationsCatalogsPlacements: API.OperationMethod<PredictProjectsLocationsCatalogsPlacementsRequest, PredictProjectsLocationsCatalogsPlacementsResponse, PredictProjectsLocationsCatalogsPlacementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PredictProjectsLocationsCatalogsPlacementsRequest,
  output: PredictProjectsLocationsCatalogsPlacementsResponse,
  errors: [],
}));

/** Performs a search. This feature is only available for users who have Retail Search enabled. Enable Retail Search on Cloud Console before using this feature. */
export interface SearchProjectsLocationsCatalogsServingConfigsRequest {
  /** Required. The resource name of the Retail Search serving config, such as `projects/* /locations/global/catalogs/default_catalog/servingConfigs/default_serving_config` or the name of the legacy placement resource, such as `projects/* /locations/global/catalogs/default_catalog/placements/default_search`. This field is used to identify the serving config name and the set of models that are used to make the search. */
  placement: string;
  /** Request body */
  body?: GoogleCloudRetailV2SearchRequest;
}

export const SearchProjectsLocationsCatalogsServingConfigsRequest = Schema.Struct({
  placement: Schema.String.pipe(T.HttpPath("placement")),
  body: Schema.optional(GoogleCloudRetailV2SearchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/servingConfigs/{servingConfigsId}:search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchProjectsLocationsCatalogsServingConfigsRequest>;

export type SearchProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2SearchResponse;
export const SearchProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2SearchResponse;

export type SearchProjectsLocationsCatalogsServingConfigsError = CommonErrors;

export const searchProjectsLocationsCatalogsServingConfigs: API.OperationMethod<SearchProjectsLocationsCatalogsServingConfigsRequest, SearchProjectsLocationsCatalogsServingConfigsResponse, SearchProjectsLocationsCatalogsServingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchProjectsLocationsCatalogsServingConfigsRequest,
  output: SearchProjectsLocationsCatalogsServingConfigsResponse,
  errors: [],
}));

/** Performs a conversational search. This feature is only available for users who have Conversational Search enabled. */
export interface ConversationalSearchProjectsLocationsCatalogsServingConfigsRequest {
  /** Required. The resource name of the search engine placement, such as `projects/* /locations/global/catalogs/default_catalog/placements/default_search` or `projects/* /locations/global/catalogs/default_catalog/servingConfigs/default_serving_config` This field is used to identify the serving config name and the set of models that will be used to make the search. */
  placement: string;
  /** Request body */
  body?: GoogleCloudRetailV2ConversationalSearchRequest;
}

export const ConversationalSearchProjectsLocationsCatalogsServingConfigsRequest = Schema.Struct({
  placement: Schema.String.pipe(T.HttpPath("placement")),
  body: Schema.optional(GoogleCloudRetailV2ConversationalSearchRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/servingConfigs/{servingConfigsId}:conversationalSearch", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ConversationalSearchProjectsLocationsCatalogsServingConfigsRequest>;

export type ConversationalSearchProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2ConversationalSearchResponse;
export const ConversationalSearchProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2ConversationalSearchResponse;

export type ConversationalSearchProjectsLocationsCatalogsServingConfigsError = CommonErrors;

export const conversationalSearchProjectsLocationsCatalogsServingConfigs: API.OperationMethod<ConversationalSearchProjectsLocationsCatalogsServingConfigsRequest, ConversationalSearchProjectsLocationsCatalogsServingConfigsResponse, ConversationalSearchProjectsLocationsCatalogsServingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ConversationalSearchProjectsLocationsCatalogsServingConfigsRequest,
  output: ConversationalSearchProjectsLocationsCatalogsServingConfigsResponse,
  errors: [],
}));

/** Makes a recommendation prediction. */
export interface PredictProjectsLocationsCatalogsServingConfigsRequest {
  /** Required. Full resource name of the format: `{placement=projects/* /locations/global/catalogs/default_catalog/servingConfigs/*}` or `{placement=projects/* /locations/global/catalogs/default_catalog/placements/*}`. We recommend using the `servingConfigs` resource. `placements` is a legacy resource. The ID of the Recommendations AI serving config or placement. Before you can request predictions from your model, you must create at least one serving config or placement for it. For more information, see [Manage serving configs] (https://cloud.google.com/retail/docs/manage-configs). The full list of available serving configs can be seen at https://console.cloud.google.com/ai/retail/catalogs/default_catalog/configs */
  placement: string;
  /** Request body */
  body?: GoogleCloudRetailV2PredictRequest;
}

export const PredictProjectsLocationsCatalogsServingConfigsRequest = Schema.Struct({
  placement: Schema.String.pipe(T.HttpPath("placement")),
  body: Schema.optional(GoogleCloudRetailV2PredictRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/servingConfigs/{servingConfigsId}:predict", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PredictProjectsLocationsCatalogsServingConfigsRequest>;

export type PredictProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2PredictResponse;
export const PredictProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2PredictResponse;

export type PredictProjectsLocationsCatalogsServingConfigsError = CommonErrors;

export const predictProjectsLocationsCatalogsServingConfigs: API.OperationMethod<PredictProjectsLocationsCatalogsServingConfigsRequest, PredictProjectsLocationsCatalogsServingConfigsResponse, PredictProjectsLocationsCatalogsServingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PredictProjectsLocationsCatalogsServingConfigsRequest,
  output: PredictProjectsLocationsCatalogsServingConfigsResponse,
  errors: [],
}));

/** Creates a ServingConfig. A maximum of 100 ServingConfigs are allowed in a Catalog, otherwise a FAILED_PRECONDITION error is returned. */
export interface CreateProjectsLocationsCatalogsServingConfigsRequest {
  /** Required. Full resource name of parent. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}` */
  parent: string;
  /** Required. The ID to use for the ServingConfig, which will become the final component of the ServingConfig's resource name. This value should be 4-63 characters, and valid characters are /a-z-_/. */
  servingConfigId?: string;
  /** Request body */
  body?: GoogleCloudRetailV2ServingConfig;
}

export const CreateProjectsLocationsCatalogsServingConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  servingConfigId: Schema.optional(Schema.String).pipe(T.HttpQuery("servingConfigId")),
  body: Schema.optional(GoogleCloudRetailV2ServingConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/servingConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCatalogsServingConfigsRequest>;

export type CreateProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2ServingConfig;
export const CreateProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2ServingConfig;

export type CreateProjectsLocationsCatalogsServingConfigsError = CommonErrors;

export const createProjectsLocationsCatalogsServingConfigs: API.OperationMethod<CreateProjectsLocationsCatalogsServingConfigsRequest, CreateProjectsLocationsCatalogsServingConfigsResponse, CreateProjectsLocationsCatalogsServingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCatalogsServingConfigsRequest,
  output: CreateProjectsLocationsCatalogsServingConfigsResponse,
  errors: [],
}));

/** Deletes a ServingConfig. Returns a NotFound error if the ServingConfig does not exist. */
export interface DeleteProjectsLocationsCatalogsServingConfigsRequest {
  /** Required. The resource name of the ServingConfig to delete. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/servingConfigs/{serving_config_id}` */
  name: string;
}

export const DeleteProjectsLocationsCatalogsServingConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/servingConfigs/{servingConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCatalogsServingConfigsRequest>;

export type DeleteProjectsLocationsCatalogsServingConfigsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsCatalogsServingConfigsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsCatalogsServingConfigsError = CommonErrors;

export const deleteProjectsLocationsCatalogsServingConfigs: API.OperationMethod<DeleteProjectsLocationsCatalogsServingConfigsRequest, DeleteProjectsLocationsCatalogsServingConfigsResponse, DeleteProjectsLocationsCatalogsServingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCatalogsServingConfigsRequest,
  output: DeleteProjectsLocationsCatalogsServingConfigsResponse,
  errors: [],
}));

/** Updates a ServingConfig. */
export interface PatchProjectsLocationsCatalogsServingConfigsRequest {
  /** Immutable. Fully qualified name `projects/* /locations/global/catalogs/* /servingConfig/*` */
  name: string;
  /** Indicates which fields in the provided ServingConfig to update. The following are NOT supported: * ServingConfig.name If not set, all supported fields are updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudRetailV2ServingConfig;
}

export const PatchProjectsLocationsCatalogsServingConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudRetailV2ServingConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/servingConfigs/{servingConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCatalogsServingConfigsRequest>;

export type PatchProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2ServingConfig;
export const PatchProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2ServingConfig;

export type PatchProjectsLocationsCatalogsServingConfigsError = CommonErrors;

export const patchProjectsLocationsCatalogsServingConfigs: API.OperationMethod<PatchProjectsLocationsCatalogsServingConfigsRequest, PatchProjectsLocationsCatalogsServingConfigsResponse, PatchProjectsLocationsCatalogsServingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCatalogsServingConfigsRequest,
  output: PatchProjectsLocationsCatalogsServingConfigsResponse,
  errors: [],
}));

/** Gets a ServingConfig. Returns a NotFound error if the ServingConfig does not exist. */
export interface GetProjectsLocationsCatalogsServingConfigsRequest {
  /** Required. The resource name of the ServingConfig to get. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/servingConfigs/{serving_config_id}` */
  name: string;
}

export const GetProjectsLocationsCatalogsServingConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/servingConfigs/{servingConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCatalogsServingConfigsRequest>;

export type GetProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2ServingConfig;
export const GetProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2ServingConfig;

export type GetProjectsLocationsCatalogsServingConfigsError = CommonErrors;

export const getProjectsLocationsCatalogsServingConfigs: API.OperationMethod<GetProjectsLocationsCatalogsServingConfigsRequest, GetProjectsLocationsCatalogsServingConfigsResponse, GetProjectsLocationsCatalogsServingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCatalogsServingConfigsRequest,
  output: GetProjectsLocationsCatalogsServingConfigsResponse,
  errors: [],
}));

/** Lists all ServingConfigs linked to this catalog. */
export interface ListProjectsLocationsCatalogsServingConfigsRequest {
  /** Required. The catalog resource name. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}` */
  parent: string;
  /** Optional. Maximum number of results to return. If unspecified, defaults to 100. If a value greater than 100 is provided, at most 100 results are returned. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListServingConfigs` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsCatalogsServingConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/servingConfigs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsServingConfigsRequest>;

export type ListProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2ListServingConfigsResponse;
export const ListProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2ListServingConfigsResponse;

export type ListProjectsLocationsCatalogsServingConfigsError = CommonErrors;

export const listProjectsLocationsCatalogsServingConfigs = API.makePaginated(() => ({
  input: ListProjectsLocationsCatalogsServingConfigsRequest,
  output: ListProjectsLocationsCatalogsServingConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Enables a Control on the specified ServingConfig. The control is added in the last position of the list of controls it belongs to (e.g. if it's a facet spec control it will be applied in the last position of servingConfig.facetSpecIds) Returns a ALREADY_EXISTS error if the control has already been applied. Returns a FAILED_PRECONDITION error if the addition could exceed maximum number of control allowed for that type of control. */
export interface AddControlProjectsLocationsCatalogsServingConfigsRequest {
  /** Required. The source ServingConfig resource name . Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/servingConfigs/{serving_config_id}` */
  servingConfig: string;
  /** Request body */
  body?: GoogleCloudRetailV2AddControlRequest;
}

export const AddControlProjectsLocationsCatalogsServingConfigsRequest = Schema.Struct({
  servingConfig: Schema.String.pipe(T.HttpPath("servingConfig")),
  body: Schema.optional(GoogleCloudRetailV2AddControlRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/servingConfigs/{servingConfigsId}:addControl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<AddControlProjectsLocationsCatalogsServingConfigsRequest>;

export type AddControlProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2ServingConfig;
export const AddControlProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2ServingConfig;

export type AddControlProjectsLocationsCatalogsServingConfigsError = CommonErrors;

export const addControlProjectsLocationsCatalogsServingConfigs: API.OperationMethod<AddControlProjectsLocationsCatalogsServingConfigsRequest, AddControlProjectsLocationsCatalogsServingConfigsResponse, AddControlProjectsLocationsCatalogsServingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: AddControlProjectsLocationsCatalogsServingConfigsRequest,
  output: AddControlProjectsLocationsCatalogsServingConfigsResponse,
  errors: [],
}));

/** Disables a Control on the specified ServingConfig. The control is removed from the ServingConfig. Returns a NOT_FOUND error if the Control is not enabled for the ServingConfig. */
export interface RemoveControlProjectsLocationsCatalogsServingConfigsRequest {
  /** Required. The source ServingConfig resource name . Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/servingConfigs/{serving_config_id}` */
  servingConfig: string;
  /** Request body */
  body?: GoogleCloudRetailV2RemoveControlRequest;
}

export const RemoveControlProjectsLocationsCatalogsServingConfigsRequest = Schema.Struct({
  servingConfig: Schema.String.pipe(T.HttpPath("servingConfig")),
  body: Schema.optional(GoogleCloudRetailV2RemoveControlRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/servingConfigs/{servingConfigsId}:removeControl", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RemoveControlProjectsLocationsCatalogsServingConfigsRequest>;

export type RemoveControlProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2ServingConfig;
export const RemoveControlProjectsLocationsCatalogsServingConfigsResponse = GoogleCloudRetailV2ServingConfig;

export type RemoveControlProjectsLocationsCatalogsServingConfigsError = CommonErrors;

export const removeControlProjectsLocationsCatalogsServingConfigs: API.OperationMethod<RemoveControlProjectsLocationsCatalogsServingConfigsRequest, RemoveControlProjectsLocationsCatalogsServingConfigsResponse, RemoveControlProjectsLocationsCatalogsServingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RemoveControlProjectsLocationsCatalogsServingConfigsRequest,
  output: RemoveControlProjectsLocationsCatalogsServingConfigsResponse,
  errors: [],
}));

/** Bulk import of processed completion dataset. Request processing is asynchronous. Partial updating is not supported. The operation is successfully finished only after the imported suggestions are indexed successfully and ready for serving. The process takes hours. This feature is only available for users who have Retail Search enabled. Enable Retail Search on Cloud Console before using this feature. */
export interface ImportProjectsLocationsCatalogsCompletionDataRequest {
  /** Required. The catalog which the suggestions dataset belongs to. Format: `projects/1234/locations/global/catalogs/default_catalog`. */
  parent: string;
  /** Request body */
  body?: GoogleCloudRetailV2ImportCompletionDataRequest;
}

export const ImportProjectsLocationsCatalogsCompletionDataRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRetailV2ImportCompletionDataRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/completionData:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsCatalogsCompletionDataRequest>;

export type ImportProjectsLocationsCatalogsCompletionDataResponse = GoogleLongrunningOperation;
export const ImportProjectsLocationsCatalogsCompletionDataResponse = GoogleLongrunningOperation;

export type ImportProjectsLocationsCatalogsCompletionDataError = CommonErrors;

export const importProjectsLocationsCatalogsCompletionData: API.OperationMethod<ImportProjectsLocationsCatalogsCompletionDataRequest, ImportProjectsLocationsCatalogsCompletionDataResponse, ImportProjectsLocationsCatalogsCompletionDataError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsCatalogsCompletionDataRequest,
  output: ImportProjectsLocationsCatalogsCompletionDataResponse,
  errors: [],
}));

/** Creates a Control. If the Control to create already exists, an ALREADY_EXISTS error is returned. */
export interface CreateProjectsLocationsCatalogsControlsRequest {
  /** Required. Full resource name of parent catalog. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}` */
  parent: string;
  /** Required. The ID to use for the Control, which will become the final component of the Control's resource name. This value should be 4-63 characters, and valid characters are /a-z-_/. */
  controlId?: string;
  /** Request body */
  body?: GoogleCloudRetailV2Control;
}

export const CreateProjectsLocationsCatalogsControlsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  controlId: Schema.optional(Schema.String).pipe(T.HttpQuery("controlId")),
  body: Schema.optional(GoogleCloudRetailV2Control).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/controls", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCatalogsControlsRequest>;

export type CreateProjectsLocationsCatalogsControlsResponse = GoogleCloudRetailV2Control;
export const CreateProjectsLocationsCatalogsControlsResponse = GoogleCloudRetailV2Control;

export type CreateProjectsLocationsCatalogsControlsError = CommonErrors;

export const createProjectsLocationsCatalogsControls: API.OperationMethod<CreateProjectsLocationsCatalogsControlsRequest, CreateProjectsLocationsCatalogsControlsResponse, CreateProjectsLocationsCatalogsControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCatalogsControlsRequest,
  output: CreateProjectsLocationsCatalogsControlsResponse,
  errors: [],
}));

/** Deletes a Control. If the Control to delete does not exist, a NOT_FOUND error is returned. */
export interface DeleteProjectsLocationsCatalogsControlsRequest {
  /** Required. The resource name of the Control to delete. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/controls/{control_id}` */
  name: string;
}

export const DeleteProjectsLocationsCatalogsControlsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/controls/{controlsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCatalogsControlsRequest>;

export type DeleteProjectsLocationsCatalogsControlsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsCatalogsControlsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsCatalogsControlsError = CommonErrors;

export const deleteProjectsLocationsCatalogsControls: API.OperationMethod<DeleteProjectsLocationsCatalogsControlsRequest, DeleteProjectsLocationsCatalogsControlsResponse, DeleteProjectsLocationsCatalogsControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCatalogsControlsRequest,
  output: DeleteProjectsLocationsCatalogsControlsResponse,
  errors: [],
}));

/** Updates a Control. Control cannot be set to a different oneof field, if so an INVALID_ARGUMENT is returned. If the Control to update does not exist, a NOT_FOUND error is returned. */
export interface PatchProjectsLocationsCatalogsControlsRequest {
  /** Immutable. Fully qualified name `projects/* /locations/global/catalogs/* /controls/*` */
  name: string;
  /** Indicates which fields in the provided Control to update. The following are NOT supported: * Control.name If not set or empty, all supported fields are updated. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudRetailV2Control;
}

export const PatchProjectsLocationsCatalogsControlsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudRetailV2Control).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/controls/{controlsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCatalogsControlsRequest>;

export type PatchProjectsLocationsCatalogsControlsResponse = GoogleCloudRetailV2Control;
export const PatchProjectsLocationsCatalogsControlsResponse = GoogleCloudRetailV2Control;

export type PatchProjectsLocationsCatalogsControlsError = CommonErrors;

export const patchProjectsLocationsCatalogsControls: API.OperationMethod<PatchProjectsLocationsCatalogsControlsRequest, PatchProjectsLocationsCatalogsControlsResponse, PatchProjectsLocationsCatalogsControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCatalogsControlsRequest,
  output: PatchProjectsLocationsCatalogsControlsResponse,
  errors: [],
}));

/** Gets a Control. */
export interface GetProjectsLocationsCatalogsControlsRequest {
  /** Required. The resource name of the Control to get. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/controls/{control_id}` */
  name: string;
}

export const GetProjectsLocationsCatalogsControlsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/controls/{controlsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCatalogsControlsRequest>;

export type GetProjectsLocationsCatalogsControlsResponse = GoogleCloudRetailV2Control;
export const GetProjectsLocationsCatalogsControlsResponse = GoogleCloudRetailV2Control;

export type GetProjectsLocationsCatalogsControlsError = CommonErrors;

export const getProjectsLocationsCatalogsControls: API.OperationMethod<GetProjectsLocationsCatalogsControlsRequest, GetProjectsLocationsCatalogsControlsResponse, GetProjectsLocationsCatalogsControlsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCatalogsControlsRequest,
  output: GetProjectsLocationsCatalogsControlsResponse,
  errors: [],
}));

/** Lists all Controls by their parent Catalog. */
export interface ListProjectsLocationsCatalogsControlsRequest {
  /** Required. The catalog resource name. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}` */
  parent: string;
  /** Optional. Maximum number of results to return. If unspecified, defaults to 50. Max allowed value is 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListControls` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
  /** Optional. A filter to apply on the list results. Supported features: * List all the products under the parent branch if filter is unset. * List controls that are used in a single ServingConfig: 'serving_config = "boosted_home_page_cvr"' */
  filter?: string;
}

export const ListProjectsLocationsCatalogsControlsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/controls" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsControlsRequest>;

export type ListProjectsLocationsCatalogsControlsResponse = GoogleCloudRetailV2ListControlsResponse;
export const ListProjectsLocationsCatalogsControlsResponse = GoogleCloudRetailV2ListControlsResponse;

export type ListProjectsLocationsCatalogsControlsError = CommonErrors;

export const listProjectsLocationsCatalogsControls = API.makePaginated(() => ({
  input: ListProjectsLocationsCatalogsControlsRequest,
  output: ListProjectsLocationsCatalogsControlsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns all questions for a given catalog. */
export interface ListProjectsLocationsCatalogsGenerativeQuestionsRequest {
  /** Required. Resource name of the parent catalog. Format: projects/{project}/locations/{location}/catalogs/{catalog} */
  parent: string;
}

export const ListProjectsLocationsCatalogsGenerativeQuestionsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/generativeQuestions" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsGenerativeQuestionsRequest>;

export type ListProjectsLocationsCatalogsGenerativeQuestionsResponse = GoogleCloudRetailV2ListGenerativeQuestionConfigsResponse;
export const ListProjectsLocationsCatalogsGenerativeQuestionsResponse = GoogleCloudRetailV2ListGenerativeQuestionConfigsResponse;

export type ListProjectsLocationsCatalogsGenerativeQuestionsError = CommonErrors;

export const listProjectsLocationsCatalogsGenerativeQuestions: API.OperationMethod<ListProjectsLocationsCatalogsGenerativeQuestionsRequest, ListProjectsLocationsCatalogsGenerativeQuestionsResponse, ListProjectsLocationsCatalogsGenerativeQuestionsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListProjectsLocationsCatalogsGenerativeQuestionsRequest,
  output: ListProjectsLocationsCatalogsGenerativeQuestionsResponse,
  errors: [],
}));

/** Allows management of multiple questions. */
export interface BatchUpdateProjectsLocationsCatalogsGenerativeQuestionRequest {
  /** Optional. Resource name of the parent catalog. Format: projects/{project}/locations/{location}/catalogs/{catalog} */
  parent: string;
  /** Request body */
  body?: GoogleCloudRetailV2BatchUpdateGenerativeQuestionConfigsRequest;
}

export const BatchUpdateProjectsLocationsCatalogsGenerativeQuestionRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRetailV2BatchUpdateGenerativeQuestionConfigsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/generativeQuestion:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateProjectsLocationsCatalogsGenerativeQuestionRequest>;

export type BatchUpdateProjectsLocationsCatalogsGenerativeQuestionResponse = GoogleCloudRetailV2BatchUpdateGenerativeQuestionConfigsResponse;
export const BatchUpdateProjectsLocationsCatalogsGenerativeQuestionResponse = GoogleCloudRetailV2BatchUpdateGenerativeQuestionConfigsResponse;

export type BatchUpdateProjectsLocationsCatalogsGenerativeQuestionError = CommonErrors;

export const batchUpdateProjectsLocationsCatalogsGenerativeQuestion: API.OperationMethod<BatchUpdateProjectsLocationsCatalogsGenerativeQuestionRequest, BatchUpdateProjectsLocationsCatalogsGenerativeQuestionResponse, BatchUpdateProjectsLocationsCatalogsGenerativeQuestionError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateProjectsLocationsCatalogsGenerativeQuestionRequest,
  output: BatchUpdateProjectsLocationsCatalogsGenerativeQuestionResponse,
  errors: [],
}));

/** Creates a new model. */
export interface CreateProjectsLocationsCatalogsModelsRequest {
  /** Required. The parent resource under which to create the model. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}` */
  parent: string;
  /** Optional. Whether to run a dry run to validate the request (without actually creating the model). */
  dryRun?: boolean;
  /** Request body */
  body?: GoogleCloudRetailV2Model;
}

export const CreateProjectsLocationsCatalogsModelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  dryRun: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("dryRun")),
  body: Schema.optional(GoogleCloudRetailV2Model).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/models", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsLocationsCatalogsModelsRequest>;

export type CreateProjectsLocationsCatalogsModelsResponse = GoogleLongrunningOperation;
export const CreateProjectsLocationsCatalogsModelsResponse = GoogleLongrunningOperation;

export type CreateProjectsLocationsCatalogsModelsError = CommonErrors;

export const createProjectsLocationsCatalogsModels: API.OperationMethod<CreateProjectsLocationsCatalogsModelsRequest, CreateProjectsLocationsCatalogsModelsResponse, CreateProjectsLocationsCatalogsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsLocationsCatalogsModelsRequest,
  output: CreateProjectsLocationsCatalogsModelsResponse,
  errors: [],
}));

/** Gets a model. */
export interface GetProjectsLocationsCatalogsModelsRequest {
  /** Required. The resource name of the Model to get. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog}/models/{model_id}` */
  name: string;
}

export const GetProjectsLocationsCatalogsModelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/models/{modelsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsLocationsCatalogsModelsRequest>;

export type GetProjectsLocationsCatalogsModelsResponse = GoogleCloudRetailV2Model;
export const GetProjectsLocationsCatalogsModelsResponse = GoogleCloudRetailV2Model;

export type GetProjectsLocationsCatalogsModelsError = CommonErrors;

export const getProjectsLocationsCatalogsModels: API.OperationMethod<GetProjectsLocationsCatalogsModelsRequest, GetProjectsLocationsCatalogsModelsResponse, GetProjectsLocationsCatalogsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsLocationsCatalogsModelsRequest,
  output: GetProjectsLocationsCatalogsModelsResponse,
  errors: [],
}));

/** Pauses the training of an existing model. */
export interface PauseProjectsLocationsCatalogsModelsRequest {
  /** Required. The name of the model to pause. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}` */
  name: string;
  /** Request body */
  body?: GoogleCloudRetailV2PauseModelRequest;
}

export const PauseProjectsLocationsCatalogsModelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRetailV2PauseModelRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/models/{modelsId}:pause", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PauseProjectsLocationsCatalogsModelsRequest>;

export type PauseProjectsLocationsCatalogsModelsResponse = GoogleCloudRetailV2Model;
export const PauseProjectsLocationsCatalogsModelsResponse = GoogleCloudRetailV2Model;

export type PauseProjectsLocationsCatalogsModelsError = CommonErrors;

export const pauseProjectsLocationsCatalogsModels: API.OperationMethod<PauseProjectsLocationsCatalogsModelsRequest, PauseProjectsLocationsCatalogsModelsResponse, PauseProjectsLocationsCatalogsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PauseProjectsLocationsCatalogsModelsRequest,
  output: PauseProjectsLocationsCatalogsModelsResponse,
  errors: [],
}));

/** Resumes the training of an existing model. */
export interface ResumeProjectsLocationsCatalogsModelsRequest {
  /** Required. The name of the model to resume. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}` */
  name: string;
  /** Request body */
  body?: GoogleCloudRetailV2ResumeModelRequest;
}

export const ResumeProjectsLocationsCatalogsModelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRetailV2ResumeModelRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/models/{modelsId}:resume", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ResumeProjectsLocationsCatalogsModelsRequest>;

export type ResumeProjectsLocationsCatalogsModelsResponse = GoogleCloudRetailV2Model;
export const ResumeProjectsLocationsCatalogsModelsResponse = GoogleCloudRetailV2Model;

export type ResumeProjectsLocationsCatalogsModelsError = CommonErrors;

export const resumeProjectsLocationsCatalogsModels: API.OperationMethod<ResumeProjectsLocationsCatalogsModelsRequest, ResumeProjectsLocationsCatalogsModelsResponse, ResumeProjectsLocationsCatalogsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ResumeProjectsLocationsCatalogsModelsRequest,
  output: ResumeProjectsLocationsCatalogsModelsResponse,
  errors: [],
}));

/** Deletes an existing model. */
export interface DeleteProjectsLocationsCatalogsModelsRequest {
  /** Required. The resource name of the Model to delete. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}` */
  name: string;
}

export const DeleteProjectsLocationsCatalogsModelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/models/{modelsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsLocationsCatalogsModelsRequest>;

export type DeleteProjectsLocationsCatalogsModelsResponse = GoogleProtobufEmpty;
export const DeleteProjectsLocationsCatalogsModelsResponse = GoogleProtobufEmpty;

export type DeleteProjectsLocationsCatalogsModelsError = CommonErrors;

export const deleteProjectsLocationsCatalogsModels: API.OperationMethod<DeleteProjectsLocationsCatalogsModelsRequest, DeleteProjectsLocationsCatalogsModelsResponse, DeleteProjectsLocationsCatalogsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsLocationsCatalogsModelsRequest,
  output: DeleteProjectsLocationsCatalogsModelsResponse,
  errors: [],
}));

/** Lists all the models linked to this event store. */
export interface ListProjectsLocationsCatalogsModelsRequest {
  /** Required. The parent for which to list models. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}` */
  parent: string;
  /** Optional. Maximum number of results to return. If unspecified, defaults to 50. Max allowed value is 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListModels` call. Provide this to retrieve the subsequent page. */
  pageToken?: string;
}

export const ListProjectsLocationsCatalogsModelsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/models" }),
  svc,
) as unknown as Schema.Schema<ListProjectsLocationsCatalogsModelsRequest>;

export type ListProjectsLocationsCatalogsModelsResponse = GoogleCloudRetailV2ListModelsResponse;
export const ListProjectsLocationsCatalogsModelsResponse = GoogleCloudRetailV2ListModelsResponse;

export type ListProjectsLocationsCatalogsModelsError = CommonErrors;

export const listProjectsLocationsCatalogsModels = API.makePaginated(() => ({
  input: ListProjectsLocationsCatalogsModelsRequest,
  output: ListProjectsLocationsCatalogsModelsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Update of model metadata. Only fields that currently can be updated are: `filtering_option` and `periodic_tuning_state`. If other values are provided, this API method ignores them. */
export interface PatchProjectsLocationsCatalogsModelsRequest {
  /** Required. The fully qualified resource name of the model. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}` catalog_id has char limit of 50. recommendation_model_id has char limit of 40. */
  name: string;
  /** Optional. Indicates which fields in the provided 'model' to update. If not set, by default updates all fields. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudRetailV2Model;
}

export const PatchProjectsLocationsCatalogsModelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudRetailV2Model).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/models/{modelsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsLocationsCatalogsModelsRequest>;

export type PatchProjectsLocationsCatalogsModelsResponse = GoogleCloudRetailV2Model;
export const PatchProjectsLocationsCatalogsModelsResponse = GoogleCloudRetailV2Model;

export type PatchProjectsLocationsCatalogsModelsError = CommonErrors;

export const patchProjectsLocationsCatalogsModels: API.OperationMethod<PatchProjectsLocationsCatalogsModelsRequest, PatchProjectsLocationsCatalogsModelsResponse, PatchProjectsLocationsCatalogsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsLocationsCatalogsModelsRequest,
  output: PatchProjectsLocationsCatalogsModelsResponse,
  errors: [],
}));

/** Tunes an existing model. */
export interface TuneProjectsLocationsCatalogsModelsRequest {
  /** Required. The resource name of the model to tune. Format: `projects/{project_number}/locations/{location_id}/catalogs/{catalog_id}/models/{model_id}` */
  name: string;
  /** Request body */
  body?: GoogleCloudRetailV2TuneModelRequest;
}

export const TuneProjectsLocationsCatalogsModelsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudRetailV2TuneModelRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/models/{modelsId}:tune", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TuneProjectsLocationsCatalogsModelsRequest>;

export type TuneProjectsLocationsCatalogsModelsResponse = GoogleLongrunningOperation;
export const TuneProjectsLocationsCatalogsModelsResponse = GoogleLongrunningOperation;

export type TuneProjectsLocationsCatalogsModelsError = CommonErrors;

export const tuneProjectsLocationsCatalogsModels: API.OperationMethod<TuneProjectsLocationsCatalogsModelsRequest, TuneProjectsLocationsCatalogsModelsResponse, TuneProjectsLocationsCatalogsModelsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TuneProjectsLocationsCatalogsModelsRequest,
  output: TuneProjectsLocationsCatalogsModelsResponse,
  errors: [],
}));

/** Writes a single user event. */
export interface WriteProjectsLocationsCatalogsUserEventsRequest {
  /** Required. The parent catalog resource name, such as `projects/1234/locations/global/catalogs/default_catalog`. */
  parent: string;
  /** If set to true, the user event will be written asynchronously after validation, and the API will respond without waiting for the write. Therefore, silent failures can occur even if the API returns success. In case of silent failures, error messages can be found in Stackdriver logs. */
  writeAsync?: boolean;
  /** Request body */
  body?: GoogleCloudRetailV2UserEvent;
}

export const WriteProjectsLocationsCatalogsUserEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  writeAsync: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("writeAsync")),
  body: Schema.optional(GoogleCloudRetailV2UserEvent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/userEvents:write", hasBody: true }),
  svc,
) as unknown as Schema.Schema<WriteProjectsLocationsCatalogsUserEventsRequest>;

export type WriteProjectsLocationsCatalogsUserEventsResponse = GoogleCloudRetailV2UserEvent;
export const WriteProjectsLocationsCatalogsUserEventsResponse = GoogleCloudRetailV2UserEvent;

export type WriteProjectsLocationsCatalogsUserEventsError = CommonErrors;

export const writeProjectsLocationsCatalogsUserEvents: API.OperationMethod<WriteProjectsLocationsCatalogsUserEventsRequest, WriteProjectsLocationsCatalogsUserEventsResponse, WriteProjectsLocationsCatalogsUserEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: WriteProjectsLocationsCatalogsUserEventsRequest,
  output: WriteProjectsLocationsCatalogsUserEventsResponse,
  errors: [],
}));

/** Writes a single user event from the browser. For larger user event payload over 16 KB, the POST method should be used instead, otherwise a 400 Bad Request error is returned. This method is used only by the Retail API JavaScript pixel and Google Tag Manager. Users should not call this method directly. */
export interface CollectProjectsLocationsCatalogsUserEventsRequest {
  /** Required. The parent catalog name, such as `projects/1234/locations/global/catalogs/default_catalog`. */
  parent: string;
  /** Request body */
  body?: GoogleCloudRetailV2CollectUserEventRequest;
}

export const CollectProjectsLocationsCatalogsUserEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRetailV2CollectUserEventRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/userEvents:collect", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CollectProjectsLocationsCatalogsUserEventsRequest>;

export type CollectProjectsLocationsCatalogsUserEventsResponse = GoogleApiHttpBody;
export const CollectProjectsLocationsCatalogsUserEventsResponse = GoogleApiHttpBody;

export type CollectProjectsLocationsCatalogsUserEventsError = CommonErrors;

export const collectProjectsLocationsCatalogsUserEvents: API.OperationMethod<CollectProjectsLocationsCatalogsUserEventsRequest, CollectProjectsLocationsCatalogsUserEventsResponse, CollectProjectsLocationsCatalogsUserEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CollectProjectsLocationsCatalogsUserEventsRequest,
  output: CollectProjectsLocationsCatalogsUserEventsResponse,
  errors: [],
}));

/** Deletes permanently all user events specified by the filter provided. Depending on the number of events specified by the filter, this operation could take hours or days to complete. To test a filter, use the list command first. */
export interface PurgeProjectsLocationsCatalogsUserEventsRequest {
  /** Required. The resource name of the catalog under which the events are created. The format is `projects/${projectId}/locations/global/catalogs/${catalogId}` */
  parent: string;
  /** Request body */
  body?: GoogleCloudRetailV2PurgeUserEventsRequest;
}

export const PurgeProjectsLocationsCatalogsUserEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRetailV2PurgeUserEventsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/userEvents:purge", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PurgeProjectsLocationsCatalogsUserEventsRequest>;

export type PurgeProjectsLocationsCatalogsUserEventsResponse = GoogleLongrunningOperation;
export const PurgeProjectsLocationsCatalogsUserEventsResponse = GoogleLongrunningOperation;

export type PurgeProjectsLocationsCatalogsUserEventsError = CommonErrors;

export const purgeProjectsLocationsCatalogsUserEvents: API.OperationMethod<PurgeProjectsLocationsCatalogsUserEventsRequest, PurgeProjectsLocationsCatalogsUserEventsResponse, PurgeProjectsLocationsCatalogsUserEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PurgeProjectsLocationsCatalogsUserEventsRequest,
  output: PurgeProjectsLocationsCatalogsUserEventsResponse,
  errors: [],
}));

/** Bulk import of User events. Request processing might be synchronous. Events that already exist are skipped. Use this method for backfilling historical user events. `Operation.response` is of type `ImportResponse`. Note that it is possible for a subset of the items to be successfully inserted. `Operation.metadata` is of type `ImportMetadata`. */
export interface ImportProjectsLocationsCatalogsUserEventsRequest {
  /** Required. `projects/1234/locations/global/catalogs/default_catalog` */
  parent: string;
  /** Request body */
  body?: GoogleCloudRetailV2ImportUserEventsRequest;
}

export const ImportProjectsLocationsCatalogsUserEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRetailV2ImportUserEventsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/userEvents:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportProjectsLocationsCatalogsUserEventsRequest>;

export type ImportProjectsLocationsCatalogsUserEventsResponse = GoogleLongrunningOperation;
export const ImportProjectsLocationsCatalogsUserEventsResponse = GoogleLongrunningOperation;

export type ImportProjectsLocationsCatalogsUserEventsError = CommonErrors;

export const importProjectsLocationsCatalogsUserEvents: API.OperationMethod<ImportProjectsLocationsCatalogsUserEventsRequest, ImportProjectsLocationsCatalogsUserEventsResponse, ImportProjectsLocationsCatalogsUserEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportProjectsLocationsCatalogsUserEventsRequest,
  output: ImportProjectsLocationsCatalogsUserEventsResponse,
  errors: [],
}));

/** Starts a user-event rejoin operation with latest product catalog. Events are not annotated with detailed product information for products that are missing from the catalog when the user event is ingested. These events are stored as unjoined events with limited usage on training and serving. You can use this method to start a join operation on specified events with the latest version of product catalog. You can also use this method to correct events joined with the wrong product catalog. A rejoin operation can take hours or days to complete. */
export interface RejoinProjectsLocationsCatalogsUserEventsRequest {
  /** Required. The parent catalog resource name, such as `projects/1234/locations/global/catalogs/default_catalog`. */
  parent: string;
  /** Request body */
  body?: GoogleCloudRetailV2RejoinUserEventsRequest;
}

export const RejoinProjectsLocationsCatalogsUserEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudRetailV2RejoinUserEventsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v2/projects/{projectsId}/locations/{locationsId}/catalogs/{catalogsId}/userEvents:rejoin", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RejoinProjectsLocationsCatalogsUserEventsRequest>;

export type RejoinProjectsLocationsCatalogsUserEventsResponse = GoogleLongrunningOperation;
export const RejoinProjectsLocationsCatalogsUserEventsResponse = GoogleLongrunningOperation;

export type RejoinProjectsLocationsCatalogsUserEventsError = CommonErrors;

export const rejoinProjectsLocationsCatalogsUserEvents: API.OperationMethod<RejoinProjectsLocationsCatalogsUserEventsRequest, RejoinProjectsLocationsCatalogsUserEventsResponse, RejoinProjectsLocationsCatalogsUserEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RejoinProjectsLocationsCatalogsUserEventsRequest,
  output: RejoinProjectsLocationsCatalogsUserEventsResponse,
  errors: [],
}));

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListProjectsOperationsRequest {
  /** The name of the operation's parent resource. */
  name: string;
  /** The standard list filter. */
  filter?: string;
  /** The standard list page size. */
  pageSize?: number;
  /** The standard list page token. */
  pageToken?: string;
  /** When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. */
  returnPartialSuccess?: boolean;
}

export const ListProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/operations" }),
  svc,
) as unknown as Schema.Schema<ListProjectsOperationsRequest>;

export type ListProjectsOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListProjectsOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListProjectsOperationsError = CommonErrors;

export const listProjectsOperations = API.makePaginated(() => ({
  input: ListProjectsOperationsRequest,
  output: ListProjectsOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v2/projects/{projectsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsOperationsRequest>;

export type GetProjectsOperationsResponse = GoogleLongrunningOperation;
export const GetProjectsOperationsResponse = GoogleLongrunningOperation;

export type GetProjectsOperationsError = CommonErrors;

export const getProjectsOperations: API.OperationMethod<GetProjectsOperationsRequest, GetProjectsOperationsResponse, GetProjectsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsOperationsRequest,
  output: GetProjectsOperationsResponse,
  errors: [],
}));

