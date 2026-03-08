// ==========================================================================
// Merchant API (merchantapi datasources_v1beta)
// DO NOT EDIT - Generated from GCP Discovery Document
// ==========================================================================

import * as Schema from "effect/Schema";
import { API } from "../client";
import * as T from "../traits";
import * as C from "../category";
import type { Credentials } from "../credentials";
import type { DefaultErrors } from "../errors";
import type * as HttpClient from "effect/unstable/http/HttpClient";

// Service metadata
const svc = T.Service({
  name: "merchantapi",
  version: "datasources_v1beta",
  rootUrl: "https://merchantapi.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface TimeOfDay {
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() =>
  Schema.Struct({
    minutes: Schema.optional(Schema.Number),
    nanos: Schema.optional(Schema.Number),
    hours: Schema.optional(Schema.Number),
    seconds: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface FetchSettings {
  /** Optional. [Time zone](https://cldr.unicode.org) used for schedule. UTC by default. For example, "America/Los_Angeles". */
  timeZone?: string;
  /** Optional. The hour of the day when the data source file should be fetched. Minutes and seconds are not supported and will be ignored. */
  timeOfDay?: TimeOfDay;
  /** Optional. An optional password for fetch_uri. Used for [submitting data sources through SFTP](https://support.google.com/merchants/answer/13813117). */
  password?: string;
  /** Required. The frequency describing fetch schedule. */
  frequency?:
    | "FREQUENCY_UNSPECIFIED"
    | "FREQUENCY_DAILY"
    | "FREQUENCY_WEEKLY"
    | "FREQUENCY_MONTHLY"
    | (string & {});
  /** Optional. The day of the week when the data source file should be fetched. This field can only be set for weekly frequency. */
  dayOfWeek?:
    | "DAY_OF_WEEK_UNSPECIFIED"
    | "MONDAY"
    | "TUESDAY"
    | "WEDNESDAY"
    | "THURSDAY"
    | "FRIDAY"
    | "SATURDAY"
    | "SUNDAY"
    | (string & {});
  /** Optional. An optional user name for fetch_uri. Used for [submitting data sources through SFTP](https://support.google.com/merchants/answer/13813117). */
  username?: string;
  /** Optional. Enables or pauses the fetch schedule. */
  enabled?: boolean;
  /** Optional. The day of the month when the data source file should be fetched (1-31). This field can only be set for monthly frequency. */
  dayOfMonth?: number;
  /** Optional. The URL where the data source file can be fetched. Google Merchant Center supports automatic scheduled uploads using the HTTP, HTTPS or SFTP protocols, so the value will need to be a valid link using one of those three protocols. Immutable for Google Sheets files. */
  fetchUri?: string;
}

export const FetchSettings: Schema.Schema<FetchSettings> = Schema.suspend(() =>
  Schema.Struct({
    timeZone: Schema.optional(Schema.String),
    timeOfDay: Schema.optional(TimeOfDay),
    password: Schema.optional(Schema.String),
    frequency: Schema.optional(Schema.String),
    dayOfWeek: Schema.optional(Schema.String),
    username: Schema.optional(Schema.String),
    enabled: Schema.optional(Schema.Boolean),
    dayOfMonth: Schema.optional(Schema.Number),
    fetchUri: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "FetchSettings",
}) as any as Schema.Schema<FetchSettings>;

export interface FileInput {
  /** Optional. Fetch details to deliver the data source. It contains settings for `FETCH` and `GOOGLE_SHEETS` file input types. The required fields vary based on the frequency of fetching. */
  fetchSettings?: FetchSettings;
  /** Optional. The file name of the data source. Required for `UPLOAD` file input type. */
  fileName?: string;
  /** Output only. The type of file input. */
  fileInputType?:
    | "FILE_INPUT_TYPE_UNSPECIFIED"
    | "UPLOAD"
    | "FETCH"
    | "GOOGLE_SHEETS"
    | (string & {});
}

export const FileInput: Schema.Schema<FileInput> = Schema.suspend(() =>
  Schema.Struct({
    fetchSettings: Schema.optional(FetchSettings),
    fileName: Schema.optional(Schema.String),
    fileInputType: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "FileInput" }) as any as Schema.Schema<FileInput>;

export interface RegionalInventoryDataSource {
  /** Required. Immutable. The feed label of the offers to which the regional inventory is provided. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-). */
  feedLabel?: string;
  /** Required. Immutable. The two-letter ISO 639-1 language of the items to which the regional inventory is provided. */
  contentLanguage?: string;
}

export const RegionalInventoryDataSource: Schema.Schema<RegionalInventoryDataSource> =
  Schema.suspend(() =>
    Schema.Struct({
      feedLabel: Schema.optional(Schema.String),
      contentLanguage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "RegionalInventoryDataSource",
  }) as any as Schema.Schema<RegionalInventoryDataSource>;

export interface ProductReviewDataSource {}

export const ProductReviewDataSource: Schema.Schema<ProductReviewDataSource> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "ProductReviewDataSource",
  }) as any as Schema.Schema<ProductReviewDataSource>;

export interface Destination {
  /** [Marketing methods](https://support.google.com/merchants/answer/15130232) (also known as destination) selections. */
  destination?:
    | "DESTINATION_ENUM_UNSPECIFIED"
    | "SHOPPING_ADS"
    | "DISPLAY_ADS"
    | "LOCAL_INVENTORY_ADS"
    | "FREE_LISTINGS"
    | "FREE_LOCAL_LISTINGS"
    | "YOUTUBE_SHOPPING"
    | "YOUTUBE_SHOPPING_CHECKOUT"
    | "YOUTUBE_AFFILIATE"
    | "FREE_VEHICLE_LISTINGS"
    | "VEHICLE_ADS"
    | "CLOUD_RETAIL"
    | "LOCAL_CLOUD_RETAIL"
    | (string & {});
  /** The state of the destination. */
  state?: "STATE_UNSPECIFIED" | "ENABLED" | "DISABLED" | (string & {});
}

export const Destination: Schema.Schema<Destination> = Schema.suspend(() =>
  Schema.Struct({
    destination: Schema.optional(Schema.String),
    state: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Destination" }) as any as Schema.Schema<Destination>;

export interface DataSourceReference {
  /** Self should be used to reference the primary data source itself. */
  self?: boolean;
  /** Optional. The name of the primary data source. Format: `accounts/{account}/dataSources/{datasource}` */
  primaryDataSourceName?: string;
  /** Optional. The name of the supplemental data source. Format: `accounts/{account}/dataSources/{datasource}` */
  supplementalDataSourceName?: string;
}

export const DataSourceReference: Schema.Schema<DataSourceReference> =
  Schema.suspend(() =>
    Schema.Struct({
      self: Schema.optional(Schema.Boolean),
      primaryDataSourceName: Schema.optional(Schema.String),
      supplementalDataSourceName: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "DataSourceReference",
  }) as any as Schema.Schema<DataSourceReference>;

export interface DefaultRule {
  /** Required. The list of data sources linked in the [default rule](https://support.google.com/merchants/answer/7450276). This list is ordered by the default rule priority of joining the data. It might include none or multiple references to `self` and supplemental data sources. The list must not be empty. To link the data source to the default rule, you need to add a new reference to this list (in sequential order). To unlink the data source from the default rule, you need to remove the given reference from this list. Changing the order of this list will result in changing the priority of data sources in the default rule. For example, providing the following list: [`1001`, `self`] will take attribute values from supplemental data source `1001`, and fallback to `self` if the attribute is not set in `1001`. */
  takeFromDataSources?: Array<DataSourceReference>;
}

export const DefaultRule: Schema.Schema<DefaultRule> = Schema.suspend(() =>
  Schema.Struct({
    takeFromDataSources: Schema.optional(Schema.Array(DataSourceReference)),
  }),
).annotate({ identifier: "DefaultRule" }) as any as Schema.Schema<DefaultRule>;

export interface PrimaryProductDataSource {
  /** Optional. A list of destinations describing where products of the data source can be shown. When retrieving the data source, the list contains all the destinations that can be used for the data source, including the ones that are disabled for the data source but enabled for the account. Only destinations that are enabled on the account, for example through program participation, can be enabled on the data source. If unset, during creation, the destinations will be inherited based on the account level program participation. If set, during creation or update, the data source will be set only for the specified destinations. Updating this field requires at least one destination. */
  destinations?: Array<Destination>;
  /** Optional. The countries where the items may be displayed. Represented as a [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml). */
  countries?: Array<string>;
  /** Optional. Immutable. The feed label that is specified on the data source level. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-). For more information about feed label, see [Create a primary data source for products](https://developers.google.com/merchant/api/guides/data-sources/api-sources#create-primary-data-source). `feedLabel` and `contentLanguage` must be either both set or unset for data sources with product content type. They must be set for data sources with a file input. If set, the data source will only accept products matching this combination. If unset, the data source will accept products without that restriction. */
  feedLabel?: string;
  /** Optional. Default rule management of the data source. If set, the linked data sources will be replaced. */
  defaultRule?: DefaultRule;
  /** Optional. Immutable. Specifies the type of data source channel. */
  channel?:
    | "CHANNEL_UNSPECIFIED"
    | "ONLINE_PRODUCTS"
    | "LOCAL_PRODUCTS"
    | "PRODUCTS"
    | (string & {});
  /** Optional. Immutable. The two-letter ISO 639-1 language of the items in the data source. `feedLabel` and `contentLanguage` must be either both set or unset. The fields can only be unset for data sources without file input. If set, the data source will only accept products matching this combination. If unset, the data source will accept products without that restriction. */
  contentLanguage?: string;
}

export const PrimaryProductDataSource: Schema.Schema<PrimaryProductDataSource> =
  Schema.suspend(() =>
    Schema.Struct({
      destinations: Schema.optional(Schema.Array(Destination)),
      countries: Schema.optional(Schema.Array(Schema.String)),
      feedLabel: Schema.optional(Schema.String),
      defaultRule: Schema.optional(DefaultRule),
      channel: Schema.optional(Schema.String),
      contentLanguage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PrimaryProductDataSource",
  }) as any as Schema.Schema<PrimaryProductDataSource>;

export interface MerchantReviewDataSource {}

export const MerchantReviewDataSource: Schema.Schema<MerchantReviewDataSource> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "MerchantReviewDataSource",
  }) as any as Schema.Schema<MerchantReviewDataSource>;

export interface LocalInventoryDataSource {
  /** Required. Immutable. The feed label of the offers to which the local inventory is provided. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-). */
  feedLabel?: string;
  /** Required. Immutable. The two-letter ISO 639-1 language of the items to which the local inventory is provided. */
  contentLanguage?: string;
}

export const LocalInventoryDataSource: Schema.Schema<LocalInventoryDataSource> =
  Schema.suspend(() =>
    Schema.Struct({
      feedLabel: Schema.optional(Schema.String),
      contentLanguage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "LocalInventoryDataSource",
  }) as any as Schema.Schema<LocalInventoryDataSource>;

export interface SupplementalProductDataSource {
  /** Optional. Immutable. The two-letter ISO 639-1 language of the items in the data source. `feedLabel` and `contentLanguage` must be either both set or unset. The fields can only be unset for data sources without file input. If set, the data source will only accept products matching this combination. If unset, the data source will accept produts without that restriction. */
  contentLanguage?: string;
  /** Output only. The (unordered and deduplicated) list of all primary data sources linked to this data source in either default or custom rules. Supplemental data source cannot be deleted before all links are removed. */
  referencingPrimaryDataSources?: Array<DataSourceReference>;
  /** Optional. Immutable. The feed label that is specified on the data source level. Must be less than or equal to 20 uppercase letters (A-Z), numbers (0-9), and dashes (-). `feedLabel` and `contentLanguage` must be either both set or unset for data sources with product content type. They must be set for data sources with a file input. The fields must be unset for data sources without file input. If set, the data source will only accept products matching this combination. If unset, the data source will accept produts without that restriction. */
  feedLabel?: string;
}

export const SupplementalProductDataSource: Schema.Schema<SupplementalProductDataSource> =
  Schema.suspend(() =>
    Schema.Struct({
      contentLanguage: Schema.optional(Schema.String),
      referencingPrimaryDataSources: Schema.optional(
        Schema.Array(DataSourceReference),
      ),
      feedLabel: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SupplementalProductDataSource",
  }) as any as Schema.Schema<SupplementalProductDataSource>;

export interface PromotionDataSource {
  /** Required. Immutable. The target country used as part of the unique identifier. Represented as a [CLDR territory code](https://github.com/unicode-org/cldr/blob/latest/common/main/en.xml). Promotions are only available in selected [countries](https://support.google.com/merchants/answer/4588460). */
  targetCountry?: string;
  /** Required. Immutable. The two-letter ISO 639-1 language of the items in the data source. */
  contentLanguage?: string;
}

export const PromotionDataSource: Schema.Schema<PromotionDataSource> =
  Schema.suspend(() =>
    Schema.Struct({
      targetCountry: Schema.optional(Schema.String),
      contentLanguage: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "PromotionDataSource",
  }) as any as Schema.Schema<PromotionDataSource>;

export interface DataSource {
  /** Output only. The data source id. */
  dataSourceId?: string;
  /** Optional. The field is used only when data is managed through a file. */
  fileInput?: FileInput;
  /** The [regional inventory](https://support.google.com/merchants/answer/7439058) data source. */
  regionalInventoryDataSource?: RegionalInventoryDataSource;
  /** The [product review](https://support.google.com/merchants/answer/7045996) data source. */
  productReviewDataSource?: ProductReviewDataSource;
  /** The [primary data source](https://support.google.com/merchants/answer/7439058) for local and online products. */
  primaryProductDataSource?: PrimaryProductDataSource;
  /** The [merchant review](https://support.google.com/merchants/answer/7045996) data source. */
  merchantReviewDataSource?: MerchantReviewDataSource;
  /** Required. The displayed data source name in the Merchant Center UI. */
  displayName?: string;
  /** Output only. Determines the type of input to the data source. Based on the input some settings might not work. Only generic data sources can be created through the API. */
  input?:
    | "INPUT_UNSPECIFIED"
    | "API"
    | "FILE"
    | "UI"
    | "AUTOFEED"
    | (string & {});
  /** The [local inventory](https://support.google.com/merchants/answer/7023001) data source. */
  localInventoryDataSource?: LocalInventoryDataSource;
  /** The [supplemental data source](https://support.google.com/merchants/answer/7439058) for local and online products. */
  supplementalProductDataSource?: SupplementalProductDataSource;
  /** The [promotion](https://support.google.com/merchants/answer/2906014) data source. */
  promotionDataSource?: PromotionDataSource;
  /** Required. Identifier. The name of the data source. Format: `accounts/{account}/dataSources/{datasource}` */
  name?: string;
}

export const DataSource: Schema.Schema<DataSource> = Schema.suspend(() =>
  Schema.Struct({
    dataSourceId: Schema.optional(Schema.String),
    fileInput: Schema.optional(FileInput),
    regionalInventoryDataSource: Schema.optional(RegionalInventoryDataSource),
    productReviewDataSource: Schema.optional(ProductReviewDataSource),
    primaryProductDataSource: Schema.optional(PrimaryProductDataSource),
    merchantReviewDataSource: Schema.optional(MerchantReviewDataSource),
    displayName: Schema.optional(Schema.String),
    input: Schema.optional(Schema.String),
    localInventoryDataSource: Schema.optional(LocalInventoryDataSource),
    supplementalProductDataSource: Schema.optional(
      SupplementalProductDataSource,
    ),
    promotionDataSource: Schema.optional(PromotionDataSource),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "DataSource" }) as any as Schema.Schema<DataSource>;

export interface Issue {
  /** Output only. The number of occurrences of the error in the file upload. */
  count?: string;
  /** Output only. The severity of the issue. */
  severity?: "SEVERITY_UNSPECIFIED" | "WARNING" | "ERROR" | (string & {});
  /** Output only. The code of the error, for example, "validation/invalid_value". Returns "?" if the code is unknown. */
  code?: string;
  /** Output only. The error description, for example, "Your data source contains items which have too many attributes, or are too big. These items will be dropped". */
  description?: string;
  /** Output only. Link to the documentation explaining the issue in more details, if available. */
  documentationUri?: string;
  /** Output only. The title of the issue, for example, "Item too big". */
  title?: string;
}

export const Issue: Schema.Schema<Issue> = Schema.suspend(() =>
  Schema.Struct({
    count: Schema.optional(Schema.String),
    severity: Schema.optional(Schema.String),
    code: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    documentationUri: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Issue" }) as any as Schema.Schema<Issue>;

export interface FileUpload {
  /** Output only. The list of issues occurring in the data source. */
  issues?: Array<Issue>;
  /** Identifier. The name of the data source file upload. Format: `{datasource.name=accounts/{account}/dataSources/{datasource}/fileUploads/{fileupload}}` */
  name?: string;
  /** Output only. The date at which the file of the data source was uploaded. */
  uploadTime?: string;
  /** Output only. The data source id. */
  dataSourceId?: string;
  /** Output only. The number of items in the data source that were created. */
  itemsCreated?: string;
  /** Output only. The number of items in the data source that were updated. */
  itemsUpdated?: string;
  /** Output only. The processing state of the data source. */
  processingState?:
    | "PROCESSING_STATE_UNSPECIFIED"
    | "FAILED"
    | "IN_PROGRESS"
    | "SUCCEEDED"
    | (string & {});
  /** Output only. The number of items in the data source that were processed. */
  itemsTotal?: string;
}

export const FileUpload: Schema.Schema<FileUpload> = Schema.suspend(() =>
  Schema.Struct({
    issues: Schema.optional(Schema.Array(Issue)),
    name: Schema.optional(Schema.String),
    uploadTime: Schema.optional(Schema.String),
    dataSourceId: Schema.optional(Schema.String),
    itemsCreated: Schema.optional(Schema.String),
    itemsUpdated: Schema.optional(Schema.String),
    processingState: Schema.optional(Schema.String),
    itemsTotal: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "FileUpload" }) as any as Schema.Schema<FileUpload>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface FetchDataSourceRequest {}

export const FetchDataSourceRequest: Schema.Schema<FetchDataSourceRequest> =
  Schema.suspend(() => Schema.Struct({})).annotate({
    identifier: "FetchDataSourceRequest",
  }) as any as Schema.Schema<FetchDataSourceRequest>;

export interface ProductChange {
  /** The old value of the changed resource or attribute. If empty, it means that the product was created. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  oldValue?: string;
  /** The new value of the changed resource or attribute. If empty, it means that the product was deleted. Will have one of these values : (`approved`, `pending`, `disapproved`, ``) */
  newValue?: string;
  /** Reporting contexts that have the change (if applicable). Currently this field supports only (`SHOPPING_ADS`, `LOCAL_INVENTORY_ADS`, `YOUTUBE_SHOPPING`, `YOUTUBE_CHECKOUT`, `YOUTUBE_AFFILIATE`) from the enum value [ReportingContextEnum](/merchant/api/reference/rest/Shared.Types/ReportingContextEnum) */
  reportingContext?:
    | "REPORTING_CONTEXT_ENUM_UNSPECIFIED"
    | "SHOPPING_ADS"
    | "DISCOVERY_ADS"
    | "DEMAND_GEN_ADS"
    | "DEMAND_GEN_ADS_DISCOVER_SURFACE"
    | "VIDEO_ADS"
    | "DISPLAY_ADS"
    | "LOCAL_INVENTORY_ADS"
    | "VEHICLE_INVENTORY_ADS"
    | "FREE_LISTINGS"
    | "FREE_LISTINGS_UCP_CHECKOUT"
    | "FREE_LOCAL_LISTINGS"
    | "FREE_LOCAL_VEHICLE_LISTINGS"
    | "YOUTUBE_AFFILIATE"
    | "YOUTUBE_SHOPPING"
    | "CLOUD_RETAIL"
    | "LOCAL_CLOUD_RETAIL"
    | "PRODUCT_REVIEWS"
    | "MERCHANT_REVIEWS"
    | "YOUTUBE_CHECKOUT"
    | (string & {});
  /** Countries that have the change (if applicable). Represented in the ISO 3166 format. */
  regionCode?: string;
}

export const ProductChange: Schema.Schema<ProductChange> = Schema.suspend(() =>
  Schema.Struct({
    oldValue: Schema.optional(Schema.String),
    newValue: Schema.optional(Schema.String),
    reportingContext: Schema.optional(Schema.String),
    regionCode: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "ProductChange",
}) as any as Schema.Schema<ProductChange>;

export interface ProductStatusChangeMessage {
  /** The product name. Format: `accounts/{account}/products/{product}` */
  resource?: string;
  /** The resource that changed, in this case it will always be `Product`. */
  resourceType?: "RESOURCE_UNSPECIFIED" | "PRODUCT" | (string & {});
  /** The target account that owns the entity that changed. Format : `accounts/{merchant_id}` */
  account?: string;
  /** Optional. The product expiration time. This field will not be set if the notification is sent for a product deletion event. */
  expirationTime?: string;
  /** The time at which the event was generated. If you want to order the notification messages you receive you should rely on this field not on the order of receiving the notifications. */
  eventTime?: string;
  /** The attribute in the resource that changed, in this case it will be always `Status`. */
  attribute?: "ATTRIBUTE_UNSPECIFIED" | "STATUS" | (string & {});
  /** The account that manages the merchant's account. can be the same as merchant id if it is standalone account. Format : `accounts/{service_provider_id}` */
  managingAccount?: string;
  /** A message to describe the change that happened to the product */
  changes?: Array<ProductChange>;
  /** The product id. */
  resourceId?: string;
}

export const ProductStatusChangeMessage: Schema.Schema<ProductStatusChangeMessage> =
  Schema.suspend(() =>
    Schema.Struct({
      resource: Schema.optional(Schema.String),
      resourceType: Schema.optional(Schema.String),
      account: Schema.optional(Schema.String),
      expirationTime: Schema.optional(Schema.String),
      eventTime: Schema.optional(Schema.String),
      attribute: Schema.optional(Schema.String),
      managingAccount: Schema.optional(Schema.String),
      changes: Schema.optional(Schema.Array(ProductChange)),
      resourceId: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ProductStatusChangeMessage",
  }) as any as Schema.Schema<ProductStatusChangeMessage>;

export interface ListDataSourcesResponse {
  /** The data sources from the specified account. */
  dataSources?: Array<DataSource>;
  /** A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const ListDataSourcesResponse: Schema.Schema<ListDataSourcesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      dataSources: Schema.optional(Schema.Array(DataSource)),
      nextPageToken: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "ListDataSourcesResponse",
  }) as any as Schema.Schema<ListDataSourcesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

export interface CreateAccountsDataSourcesRequest {
  /** Required. The account where this data source will be created. Format: `accounts/{account}` */
  parent: string;
  /** Request body */
  body?: DataSource;
}

export const CreateAccountsDataSourcesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(DataSource).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "datasources/v1beta/accounts/{accountsId}/dataSources",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateAccountsDataSourcesRequest>;

export type CreateAccountsDataSourcesResponse = DataSource;
export const CreateAccountsDataSourcesResponse = DataSource;

export type CreateAccountsDataSourcesError = DefaultErrors;

/** Creates the new data source configuration for the given account. This method always creates a new data source. */
export const createAccountsDataSources: API.OperationMethod<
  CreateAccountsDataSourcesRequest,
  CreateAccountsDataSourcesResponse,
  CreateAccountsDataSourcesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateAccountsDataSourcesRequest,
  output: CreateAccountsDataSourcesResponse,
  errors: [],
}));

export interface ListAccountsDataSourcesRequest {
  /** Optional. The maximum number of data sources to return. The service may return fewer than this value. The maximum value is 1000; values above 1000 will be coerced to 1000. If unspecified, the maximum number of data sources will be returned. */
  pageSize?: number;
  /** Required. The account to list data sources for. Format: `accounts/{account}` */
  parent: string;
  /** Optional. A page token, received from a previous `ListDataSources` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDataSources` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListAccountsDataSourcesRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({
    method: "GET",
    path: "datasources/v1beta/accounts/{accountsId}/dataSources",
  }),
  svc,
) as unknown as Schema.Schema<ListAccountsDataSourcesRequest>;

export type ListAccountsDataSourcesResponse = ListDataSourcesResponse;
export const ListAccountsDataSourcesResponse = ListDataSourcesResponse;

export type ListAccountsDataSourcesError = DefaultErrors;

/** Lists the configurations for data sources for the given account. */
export const listAccountsDataSources: API.PaginatedOperationMethod<
  ListAccountsDataSourcesRequest,
  ListAccountsDataSourcesResponse,
  ListAccountsDataSourcesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListAccountsDataSourcesRequest,
  output: ListAccountsDataSourcesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetAccountsDataSourcesRequest {
  /** Required. The name of the data source to retrieve. Format: `accounts/{account}/dataSources/{datasource}` */
  name: string;
}

export const GetAccountsDataSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "datasources/v1beta/accounts/{accountsId}/dataSources/{dataSourcesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsDataSourcesRequest>;

export type GetAccountsDataSourcesResponse = DataSource;
export const GetAccountsDataSourcesResponse = DataSource;

export type GetAccountsDataSourcesError = DefaultErrors;

/** Retrieves the data source configuration for the given account. */
export const getAccountsDataSources: API.OperationMethod<
  GetAccountsDataSourcesRequest,
  GetAccountsDataSourcesResponse,
  GetAccountsDataSourcesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsDataSourcesRequest,
  output: GetAccountsDataSourcesResponse,
  errors: [],
}));

export interface PatchAccountsDataSourcesRequest {
  /** Required. Identifier. The name of the data source. Format: `accounts/{account}/dataSources/{datasource}` */
  name: string;
  /** Required. The list of data source fields to be updated. Fields specified in the update mask without a value specified in the body will be deleted from the data source. Providing special "*" value for full data source replacement is not supported. For example, If you insert `updateMask=displayName` in the request, it will only update the `displayName` leaving all other fields untouched. */
  updateMask?: string;
  /** Request body */
  body?: DataSource;
}

export const PatchAccountsDataSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(DataSource).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "datasources/v1beta/accounts/{accountsId}/dataSources/{dataSourcesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchAccountsDataSourcesRequest>;

export type PatchAccountsDataSourcesResponse = DataSource;
export const PatchAccountsDataSourcesResponse = DataSource;

export type PatchAccountsDataSourcesError = DefaultErrors;

/** Updates the existing data source configuration. The fields that are set in the update mask but not provided in the resource will be deleted. */
export const patchAccountsDataSources: API.OperationMethod<
  PatchAccountsDataSourcesRequest,
  PatchAccountsDataSourcesResponse,
  PatchAccountsDataSourcesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchAccountsDataSourcesRequest,
  output: PatchAccountsDataSourcesResponse,
  errors: [],
}));

export interface FetchAccountsDataSourcesRequest {
  /** Required. The name of the data source resource to fetch. Format: `accounts/{account}/dataSources/{datasource}` */
  name: string;
  /** Request body */
  body?: FetchDataSourceRequest;
}

export const FetchAccountsDataSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(FetchDataSourceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "datasources/v1beta/accounts/{accountsId}/dataSources/{dataSourcesId}:fetch",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<FetchAccountsDataSourcesRequest>;

export type FetchAccountsDataSourcesResponse = Empty;
export const FetchAccountsDataSourcesResponse = Empty;

export type FetchAccountsDataSourcesError = DefaultErrors;

/** Performs the data fetch immediately (even outside fetch schedule) on a data source from your Merchant Center Account. If you need to call this method more than once per day, you should use the Products service to update your product data instead. This method only works on data sources with a file input set. */
export const fetchAccountsDataSources: API.OperationMethod<
  FetchAccountsDataSourcesRequest,
  FetchAccountsDataSourcesResponse,
  FetchAccountsDataSourcesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: FetchAccountsDataSourcesRequest,
  output: FetchAccountsDataSourcesResponse,
  errors: [],
}));

export interface DeleteAccountsDataSourcesRequest {
  /** Required. The name of the data source to delete. Format: `accounts/{account}/dataSources/{datasource}` */
  name: string;
}

export const DeleteAccountsDataSourcesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "datasources/v1beta/accounts/{accountsId}/dataSources/{dataSourcesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsDataSourcesRequest>;

export type DeleteAccountsDataSourcesResponse = Empty;
export const DeleteAccountsDataSourcesResponse = Empty;

export type DeleteAccountsDataSourcesError = DefaultErrors;

/** Deletes a data source from your Merchant Center account. */
export const deleteAccountsDataSources: API.OperationMethod<
  DeleteAccountsDataSourcesRequest,
  DeleteAccountsDataSourcesResponse,
  DeleteAccountsDataSourcesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteAccountsDataSourcesRequest,
  output: DeleteAccountsDataSourcesResponse,
  errors: [],
}));

export interface GetAccountsDataSourcesFileUploadsRequest {
  /** Required. The name of the data source file upload to retrieve. Format: `accounts/{account}/dataSources/{datasource}/fileUploads/latest` */
  name: string;
}

export const GetAccountsDataSourcesFileUploadsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "datasources/v1beta/accounts/{accountsId}/dataSources/{dataSourcesId}/fileUploads/{fileUploadsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetAccountsDataSourcesFileUploadsRequest>;

export type GetAccountsDataSourcesFileUploadsResponse = FileUpload;
export const GetAccountsDataSourcesFileUploadsResponse = FileUpload;

export type GetAccountsDataSourcesFileUploadsError = DefaultErrors;

/** Gets the latest data source file upload. Only the `latest` alias is accepted for a file upload. */
export const getAccountsDataSourcesFileUploads: API.OperationMethod<
  GetAccountsDataSourcesFileUploadsRequest,
  GetAccountsDataSourcesFileUploadsResponse,
  GetAccountsDataSourcesFileUploadsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetAccountsDataSourcesFileUploadsRequest,
  output: GetAccountsDataSourcesFileUploadsResponse,
  errors: [],
}));
