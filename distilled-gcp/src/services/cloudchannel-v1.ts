// ==========================================================================
// Cloud Channel API (cloudchannel v1)
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
  name: "cloudchannel",
  version: "v1",
  rootUrl: "https://cloudchannel.googleapis.com/",
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

export interface GoogleProtobufEmpty {
}

export const GoogleProtobufEmpty: Schema.Schema<GoogleProtobufEmpty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleProtobufEmpty" }) as any as Schema.Schema<GoogleProtobufEmpty>;

export interface GoogleLongrunningCancelOperationRequest {
}

export const GoogleLongrunningCancelOperationRequest: Schema.Schema<GoogleLongrunningCancelOperationRequest> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleLongrunningCancelOperationRequest" }) as any as Schema.Schema<GoogleLongrunningCancelOperationRequest>;

export interface GoogleTypeTimeZone {
  /** IANA Time Zone Database time zone. For example "America/New_York". */
  id?: string;
  /** Optional. IANA Time Zone Database version number. For example "2019a". */
  version?: string;
}

export const GoogleTypeTimeZone: Schema.Schema<GoogleTypeTimeZone> = Schema.suspend(() => Schema.Struct({
  id: Schema.optional(Schema.String),
  version: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypeTimeZone" }) as any as Schema.Schema<GoogleTypeTimeZone>;

export interface GoogleTypeDateTime {
  /** Optional. Year of date. Must be from 1 to 9999, or 0 if specifying a datetime without a year. */
  year?: number;
  /** Optional. Month of year. Must be from 1 to 12, or 0 if specifying a datetime without a month. */
  month?: number;
  /** Optional. Day of month. Must be from 1 to 31 and valid for the year and month, or 0 if specifying a datetime without a day. */
  day?: number;
  /** Optional. Hours of day in 24 hour format. Should be from 0 to 23, defaults to 0 (midnight). An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Optional. Minutes of hour of day. Must be from 0 to 59, defaults to 0. */
  minutes?: number;
  /** Optional. Seconds of minutes of the time. Must normally be from 0 to 59, defaults to 0. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
  /** Optional. Fractions of seconds in nanoseconds. Must be from 0 to 999,999,999, defaults to 0. */
  nanos?: number;
  /** UTC offset. Must be whole seconds, between -18 hours and +18 hours. For example, a UTC offset of -4:00 would be represented as { seconds: -14400 }. */
  utcOffset?: string;
  /** Time zone. */
  timeZone?: GoogleTypeTimeZone;
}

export const GoogleTypeDateTime: Schema.Schema<GoogleTypeDateTime> = Schema.suspend(() => Schema.Struct({
  year: Schema.optional(Schema.Number),
  month: Schema.optional(Schema.Number),
  day: Schema.optional(Schema.Number),
  hours: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
  nanos: Schema.optional(Schema.Number),
  utcOffset: Schema.optional(Schema.String),
  timeZone: Schema.optional(GoogleTypeTimeZone),
})).annotate({ identifier: "GoogleTypeDateTime" }) as any as Schema.Schema<GoogleTypeDateTime>;

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

export interface GoogleCloudChannelV1DateRange {
  /** The earliest usage date time (inclusive). If you use time groupings (daily, weekly, etc), each group uses midnight to midnight (Pacific time). The usage start date is rounded down to include all usage from the specified date. We recommend that clients pass `usage_start_date_time` in Pacific time. */
  usageStartDateTime?: GoogleTypeDateTime;
  /** The latest usage date time (exclusive). If you use time groupings (daily, weekly, etc), each group uses midnight to midnight (Pacific time). The usage end date is rounded down to include all usage from the specified date. We recommend that clients pass `usage_start_date_time` in Pacific time. */
  usageEndDateTime?: GoogleTypeDateTime;
  /** The earliest invoice date (inclusive). If this value is not the first day of a month, this will move it back to the first day of the given month. */
  invoiceStartDate?: GoogleTypeDate;
  /** The latest invoice date (inclusive). If this value is not the last day of a month, this will move it forward to the last day of the given month. */
  invoiceEndDate?: GoogleTypeDate;
}

export const GoogleCloudChannelV1DateRange: Schema.Schema<GoogleCloudChannelV1DateRange> = Schema.suspend(() => Schema.Struct({
  usageStartDateTime: Schema.optional(GoogleTypeDateTime),
  usageEndDateTime: Schema.optional(GoogleTypeDateTime),
  invoiceStartDate: Schema.optional(GoogleTypeDate),
  invoiceEndDate: Schema.optional(GoogleTypeDate),
})).annotate({ identifier: "GoogleCloudChannelV1DateRange" }) as any as Schema.Schema<GoogleCloudChannelV1DateRange>;

export interface GoogleCloudChannelV1RunReportJobRequest {
  /** Optional. The range of usage or invoice dates to include in the result. */
  dateRange?: GoogleCloudChannelV1DateRange;
  /** Optional. A structured string that defines conditions on dimension columns to restrict the report output. Filters support logical operators (AND, OR, NOT) and conditional operators (=, !=, <, >, <=, and >=) using `column_id` as keys. For example: `(customer:"accounts/C123abc/customers/S456def" OR customer:"accounts/C123abc/customers/S789ghi") AND invoice_start_date.year >= 2022` */
  filter?: string;
  /** Optional. The BCP-47 language code, such as "en-US". If specified, the response is localized to the corresponding language code if the original data sources support it. Default is "en-US". */
  languageCode?: string;
}

export const GoogleCloudChannelV1RunReportJobRequest: Schema.Schema<GoogleCloudChannelV1RunReportJobRequest> = Schema.suspend(() => Schema.Struct({
  dateRange: Schema.optional(GoogleCloudChannelV1DateRange),
  filter: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1RunReportJobRequest" }) as any as Schema.Schema<GoogleCloudChannelV1RunReportJobRequest>;

export interface GoogleCloudChannelV1FetchReportResultsRequest {
  /** Optional. Requested page size of the report. The server may return fewer results than requested. If you don't specify a page size, the server uses a sensible default (may change over time). The maximum value is 30,000; the server will change larger values to 30,000. */
  pageSize?: number;
  /** Optional. A token that specifies a page of results beyond the first page. Obtained through FetchReportResultsResponse.next_page_token of the previous CloudChannelReportsService.FetchReportResults call. */
  pageToken?: string;
  /** Optional. List of keys specifying which report partitions to return. If empty, returns all partitions. */
  partitionKeys?: Array<string>;
}

export const GoogleCloudChannelV1FetchReportResultsRequest: Schema.Schema<GoogleCloudChannelV1FetchReportResultsRequest> = Schema.suspend(() => Schema.Struct({
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  partitionKeys: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudChannelV1FetchReportResultsRequest" }) as any as Schema.Schema<GoogleCloudChannelV1FetchReportResultsRequest>;

export interface GoogleCloudChannelV1Column {
  /** The unique name of the column (for example, customer_domain, channel_partner, customer_cost). You can use column IDs in RunReportJobRequest.filter. To see all reports and their columns, call CloudChannelReportsService.ListReports. */
  columnId?: string;
  /** The column's display name. */
  displayName?: string;
  /** The type of the values for this column. */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "STRING" | "INT" | "DECIMAL" | "MONEY" | "DATE" | "DATE_TIME" | (string & {});
}

export const GoogleCloudChannelV1Column: Schema.Schema<GoogleCloudChannelV1Column> = Schema.suspend(() => Schema.Struct({
  columnId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  dataType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1Column" }) as any as Schema.Schema<GoogleCloudChannelV1Column>;

export interface GoogleCloudChannelV1Report {
  /** Required. The report's resource name. Specifies the account and report used to generate report data. The report_id identifier is a UID (for example, `613bf59q`). Name uses the format: accounts/{account_id}/reports/{report_id} */
  name?: string;
  /** A human-readable name for this report. */
  displayName?: string;
  /** The list of columns included in the report. This defines the schema of the report results. */
  columns?: Array<GoogleCloudChannelV1Column>;
  /** A description of other aspects of the report, such as the products it supports. */
  description?: string;
}

export const GoogleCloudChannelV1Report: Schema.Schema<GoogleCloudChannelV1Report> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  columns: Schema.optional(Schema.Array(GoogleCloudChannelV1Column)),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1Report" }) as any as Schema.Schema<GoogleCloudChannelV1Report>;

export interface GoogleCloudChannelV1ReportResultsMetadata {
  /** Details of the completed report. */
  report?: GoogleCloudChannelV1Report;
  /** The total number of rows of data in the final report. */
  rowCount?: string;
  /** The date range of reported usage. */
  dateRange?: GoogleCloudChannelV1DateRange;
  /** The usage dates immediately preceding `date_range` with the same duration. Use this to calculate trending usage and costs. This is only populated if you request trending data. For example, if `date_range` is July 1-15, `preceding_date_range` will be June 16-30. */
  precedingDateRange?: GoogleCloudChannelV1DateRange;
}

export const GoogleCloudChannelV1ReportResultsMetadata: Schema.Schema<GoogleCloudChannelV1ReportResultsMetadata> = Schema.suspend(() => Schema.Struct({
  report: Schema.optional(GoogleCloudChannelV1Report),
  rowCount: Schema.optional(Schema.String),
  dateRange: Schema.optional(GoogleCloudChannelV1DateRange),
  precedingDateRange: Schema.optional(GoogleCloudChannelV1DateRange),
})).annotate({ identifier: "GoogleCloudChannelV1ReportResultsMetadata" }) as any as Schema.Schema<GoogleCloudChannelV1ReportResultsMetadata>;

export interface GoogleTypeDecimal {
  /** The decimal value, as a string. The string representation consists of an optional sign, `+` (`U+002B`) or `-` (`U+002D`), followed by a sequence of zero or more decimal digits ("the integer"), optionally followed by a fraction, optionally followed by an exponent. An empty string **should** be interpreted as `0`. The fraction consists of a decimal point followed by zero or more decimal digits. The string must contain at least one digit in either the integer or the fraction. The number formed by the sign, the integer and the fraction is referred to as the significand. The exponent consists of the character `e` (`U+0065`) or `E` (`U+0045`) followed by one or more decimal digits. Services **should** normalize decimal values before storing them by: - Removing an explicitly-provided `+` sign (`+2.5` -> `2.5`). - Replacing a zero-length integer value with `0` (`.5` -> `0.5`). - Coercing the exponent character to upper-case, with explicit sign (`2.5e8` -> `2.5E+8`). - Removing an explicitly-provided zero exponent (`2.5E0` -> `2.5`). Services **may** perform additional normalization based on its own needs and the internal decimal implementation selected, such as shifting the decimal point and exponent value together (example: `2.5E-1` <-> `0.25`). Additionally, services **may** preserve trailing zeroes in the fraction to indicate increased precision, but are not required to do so. Note that only the `.` character is supported to divide the integer and the fraction; `,` **should not** be supported regardless of locale. Additionally, thousand separators **should not** be supported. If a service does support them, values **must** be normalized. The ENBF grammar is: DecimalString = '' | [Sign] Significand [Exponent]; Sign = '+' | '-'; Significand = Digits '.' | [Digits] '.' Digits; Exponent = ('e' | 'E') [Sign] Digits; Digits = { '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' }; Services **should** clearly document the range of supported values, the maximum supported precision (total number of digits), and, if applicable, the scale (number of digits after the decimal point), as well as how it behaves when receiving out-of-bounds values. Services **may** choose to accept values passed as input even when the value has a higher precision or scale than the service supports, and **should** round the value to fit the supported scale. Alternatively, the service **may** error with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if precision would be lost. Services **should** error with `400 Bad Request` (`INVALID_ARGUMENT` in gRPC) if the service receives a value outside of the supported range. */
  value?: string;
}

export const GoogleTypeDecimal: Schema.Schema<GoogleTypeDecimal> = Schema.suspend(() => Schema.Struct({
  value: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypeDecimal" }) as any as Schema.Schema<GoogleTypeDecimal>;

export interface GoogleTypeMoney {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const GoogleTypeMoney: Schema.Schema<GoogleTypeMoney> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
  units: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
})).annotate({ identifier: "GoogleTypeMoney" }) as any as Schema.Schema<GoogleTypeMoney>;

export interface GoogleCloudChannelV1ReportValue {
  /** A value of type `string`. */
  stringValue?: string;
  /** A value of type `int`. */
  intValue?: string;
  /** A value of type `google.type.Decimal`, representing non-integer numeric values. */
  decimalValue?: GoogleTypeDecimal;
  /** A value of type `google.type.Money` (currency code, whole units, decimal units). */
  moneyValue?: GoogleTypeMoney;
  /** A value of type `google.type.Date` (year, month, day). */
  dateValue?: GoogleTypeDate;
  /** A value of type `google.type.DateTime` (year, month, day, hour, minute, second, and UTC offset or timezone.) */
  dateTimeValue?: GoogleTypeDateTime;
}

export const GoogleCloudChannelV1ReportValue: Schema.Schema<GoogleCloudChannelV1ReportValue> = Schema.suspend(() => Schema.Struct({
  stringValue: Schema.optional(Schema.String),
  intValue: Schema.optional(Schema.String),
  decimalValue: Schema.optional(GoogleTypeDecimal),
  moneyValue: Schema.optional(GoogleTypeMoney),
  dateValue: Schema.optional(GoogleTypeDate),
  dateTimeValue: Schema.optional(GoogleTypeDateTime),
})).annotate({ identifier: "GoogleCloudChannelV1ReportValue" }) as any as Schema.Schema<GoogleCloudChannelV1ReportValue>;

export interface GoogleCloudChannelV1Row {
  /** The list of values in the row. */
  values?: Array<GoogleCloudChannelV1ReportValue>;
  /** The key for the partition this row belongs to. This field is empty if the report is not partitioned. */
  partitionKey?: string;
}

export const GoogleCloudChannelV1Row: Schema.Schema<GoogleCloudChannelV1Row> = Schema.suspend(() => Schema.Struct({
  values: Schema.optional(Schema.Array(GoogleCloudChannelV1ReportValue)),
  partitionKey: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1Row" }) as any as Schema.Schema<GoogleCloudChannelV1Row>;

export interface GoogleCloudChannelV1FetchReportResultsResponse {
  /** The metadata for the report results (display name, columns, row count, and date ranges). */
  reportMetadata?: GoogleCloudChannelV1ReportResultsMetadata;
  /** The report's lists of values. Each row follows the settings and ordering of the columns from `report_metadata`. */
  rows?: Array<GoogleCloudChannelV1Row>;
  /** Pass this token to FetchReportResultsRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1FetchReportResultsResponse: Schema.Schema<GoogleCloudChannelV1FetchReportResultsResponse> = Schema.suspend(() => Schema.Struct({
  reportMetadata: Schema.optional(GoogleCloudChannelV1ReportResultsMetadata),
  rows: Schema.optional(Schema.Array(GoogleCloudChannelV1Row)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1FetchReportResultsResponse" }) as any as Schema.Schema<GoogleCloudChannelV1FetchReportResultsResponse>;

export interface GoogleCloudChannelV1ListReportsResponse {
  /** The reports available to the partner. */
  reports?: Array<GoogleCloudChannelV1Report>;
  /** Pass this token to FetchReportResultsRequest.page_token to retrieve the next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListReportsResponse: Schema.Schema<GoogleCloudChannelV1ListReportsResponse> = Schema.suspend(() => Schema.Struct({
  reports: Schema.optional(Schema.Array(GoogleCloudChannelV1Report)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListReportsResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListReportsResponse>;

export interface GoogleTypePostalAddress {
  /** The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions. */
  revision?: number;
  /** Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland. */
  regionCode?: string;
  /** Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en". */
  languageCode?: string;
  /** Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States). */
  postalCode?: string;
  /** Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d'Ivoire). */
  sortingCode?: string;
  /** Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don't use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated. */
  administrativeArea?: string;
  /** Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`. */
  locality?: string;
  /** Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district. */
  sublocality?: string;
  /** Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas). */
  addressLines?: Array<string>;
  /** Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information. */
  recipients?: Array<string>;
  /** Optional. The name of the organization at the address. */
  organization?: string;
}

export const GoogleTypePostalAddress: Schema.Schema<GoogleTypePostalAddress> = Schema.suspend(() => Schema.Struct({
  revision: Schema.optional(Schema.Number),
  regionCode: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
  sortingCode: Schema.optional(Schema.String),
  administrativeArea: Schema.optional(Schema.String),
  locality: Schema.optional(Schema.String),
  sublocality: Schema.optional(Schema.String),
  addressLines: Schema.optional(Schema.Array(Schema.String)),
  recipients: Schema.optional(Schema.Array(Schema.String)),
  organization: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleTypePostalAddress" }) as any as Schema.Schema<GoogleTypePostalAddress>;

export interface GoogleCloudChannelV1ContactInfo {
  /** The customer account contact's first name. Optional for Team customers. */
  firstName?: string;
  /** The customer account contact's last name. Optional for Team customers. */
  lastName?: string;
  /** Output only. The customer account contact's display name, formatted as a combination of the customer's first and last name. */
  displayName?: string;
  /** The customer account's contact email. Required for entitlements that create admin.google.com accounts, and serves as the customer's username for those accounts. Use this email to invite Team customers. */
  email?: string;
  /** Optional. The customer account contact's job title. */
  title?: string;
  /** The customer account's contact phone number. */
  phone?: string;
}

export const GoogleCloudChannelV1ContactInfo: Schema.Schema<GoogleCloudChannelV1ContactInfo> = Schema.suspend(() => Schema.Struct({
  firstName: Schema.optional(Schema.String),
  lastName: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  email: Schema.optional(Schema.String),
  title: Schema.optional(Schema.String),
  phone: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ContactInfo" }) as any as Schema.Schema<GoogleCloudChannelV1ContactInfo>;

export interface GoogleCloudChannelV1EduData {
  /** Designated institute type of customer. */
  instituteType?: "INSTITUTE_TYPE_UNSPECIFIED" | "K12" | "UNIVERSITY" | (string & {});
  /** Size of the institute. */
  instituteSize?: "INSTITUTE_SIZE_UNSPECIFIED" | "SIZE_1_100" | "SIZE_101_500" | "SIZE_501_1000" | "SIZE_1001_2000" | "SIZE_2001_5000" | "SIZE_5001_10000" | "SIZE_10001_OR_MORE" | (string & {});
  /** Web address for the edu customer's institution. */
  website?: string;
}

export const GoogleCloudChannelV1EduData: Schema.Schema<GoogleCloudChannelV1EduData> = Schema.suspend(() => Schema.Struct({
  instituteType: Schema.optional(Schema.String),
  instituteSize: Schema.optional(Schema.String),
  website: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1EduData" }) as any as Schema.Schema<GoogleCloudChannelV1EduData>;

export interface GoogleCloudChannelV1CloudIdentityInfo {
  /** CustomerType indicates verification type needed for using services. */
  customerType?: "CUSTOMER_TYPE_UNSPECIFIED" | "DOMAIN" | "TEAM" | (string & {});
  /** Output only. The primary domain name. */
  primaryDomain?: string;
  /** Output only. Whether the domain is verified. This field is not returned for a Customer's cloud_identity_info resource. Partners can use the domains.get() method of the Workspace SDK's Directory API, or listen to the PRIMARY_DOMAIN_VERIFIED Pub/Sub event in to track domain verification of their resolve Workspace customers. */
  isDomainVerified?: boolean;
  /** The alternate email. */
  alternateEmail?: string;
  /** Phone number associated with the Cloud Identity. */
  phoneNumber?: string;
  /** Language code. */
  languageCode?: string;
  /** Output only. URI of Customer's Admin console dashboard. */
  adminConsoleUri?: string;
  /** Edu information about the customer. */
  eduData?: GoogleCloudChannelV1EduData;
}

export const GoogleCloudChannelV1CloudIdentityInfo: Schema.Schema<GoogleCloudChannelV1CloudIdentityInfo> = Schema.suspend(() => Schema.Struct({
  customerType: Schema.optional(Schema.String),
  primaryDomain: Schema.optional(Schema.String),
  isDomainVerified: Schema.optional(Schema.Boolean),
  alternateEmail: Schema.optional(Schema.String),
  phoneNumber: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  adminConsoleUri: Schema.optional(Schema.String),
  eduData: Schema.optional(GoogleCloudChannelV1EduData),
})).annotate({ identifier: "GoogleCloudChannelV1CloudIdentityInfo" }) as any as Schema.Schema<GoogleCloudChannelV1CloudIdentityInfo>;

export interface GoogleCloudChannelV1Customer {
  /** Output only. Resource name of the customer. Format: accounts/{account_id}/customers/{customer_id} */
  name?: string;
  /** Required. Name of the organization that the customer entity represents. */
  orgDisplayName?: string;
  /** Required. The organization address for the customer. To enforce US laws and embargoes, we require a region, postal code, and address lines. You must provide valid addresses for every customer. To set the customer's language, use the Customer-level language code. */
  orgPostalAddress?: GoogleTypePostalAddress;
  /** Primary contact info. */
  primaryContactInfo?: GoogleCloudChannelV1ContactInfo;
  /** Secondary contact email. You need to provide an alternate email to create different domains if a primary contact email already exists. Users will receive a notification with credentials when you create an admin.google.com account. Secondary emails are also recovery email addresses. Alternate emails are optional when you create Team customers. */
  alternateEmail?: string;
  /** Required. The customer's primary domain. Must match the primary contact email's domain. */
  domain?: string;
  /** Output only. Time when the customer was created. */
  createTime?: string;
  /** Output only. Time when the customer was updated. */
  updateTime?: string;
  /** Output only. The customer's Cloud Identity ID if the customer has a Cloud Identity resource. */
  cloudIdentityId?: string;
  /** Optional. The BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see https://www.unicode.org/reports/tr35/#Unicode_locale_identifier. */
  languageCode?: string;
  /** Output only. Cloud Identity information for the customer. Populated only if a Cloud Identity account exists for this customer. */
  cloudIdentityInfo?: GoogleCloudChannelV1CloudIdentityInfo;
  /** Cloud Identity ID of the customer's channel partner. Populated only if a channel partner exists for this customer. */
  channelPartnerId?: string;
  /** Optional. External CRM ID for the customer. Populated only if a CRM ID exists for this customer. */
  correlationId?: string;
  /** Optional. Indicate if a customer is attesting about the correctness of provided information. Only required if creating a GCP Entitlement. */
  customerAttestationState?: "CUSTOMER_ATTESTATION_STATE_UNSPECIFIED" | "EXEMPT" | "NON_EXEMPT_AND_INFO_VERIFIED" | (string & {});
}

export const GoogleCloudChannelV1Customer: Schema.Schema<GoogleCloudChannelV1Customer> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  orgDisplayName: Schema.optional(Schema.String),
  orgPostalAddress: Schema.optional(GoogleTypePostalAddress),
  primaryContactInfo: Schema.optional(GoogleCloudChannelV1ContactInfo),
  alternateEmail: Schema.optional(Schema.String),
  domain: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  cloudIdentityId: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  cloudIdentityInfo: Schema.optional(GoogleCloudChannelV1CloudIdentityInfo),
  channelPartnerId: Schema.optional(Schema.String),
  correlationId: Schema.optional(Schema.String),
  customerAttestationState: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1Customer" }) as any as Schema.Schema<GoogleCloudChannelV1Customer>;

export interface GoogleCloudChannelV1ListCustomersResponse {
  /** The customers belonging to a reseller or distributor. */
  customers?: Array<GoogleCloudChannelV1Customer>;
  /** A token to retrieve the next page of results. Pass to ListCustomersRequest.page_token to obtain that page. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListCustomersResponse: Schema.Schema<GoogleCloudChannelV1ListCustomersResponse> = Schema.suspend(() => Schema.Struct({
  customers: Schema.optional(Schema.Array(GoogleCloudChannelV1Customer)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListCustomersResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListCustomersResponse>;

export interface GoogleCloudChannelV1CheckCloudIdentityAccountsExistRequest {
  /** Required. Domain to fetch for Cloud Identity account customers, including domain and team customers. For team customers, please use the domain for their emails. */
  domain?: string;
  /** Optional. Primary admin email to fetch for Cloud Identity account team customer. */
  primaryAdminEmail?: string;
}

export const GoogleCloudChannelV1CheckCloudIdentityAccountsExistRequest: Schema.Schema<GoogleCloudChannelV1CheckCloudIdentityAccountsExistRequest> = Schema.suspend(() => Schema.Struct({
  domain: Schema.optional(Schema.String),
  primaryAdminEmail: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1CheckCloudIdentityAccountsExistRequest" }) as any as Schema.Schema<GoogleCloudChannelV1CheckCloudIdentityAccountsExistRequest>;

export interface GoogleCloudChannelV1CloudIdentityCustomerAccount {
  /** Returns true if a Cloud Identity account exists for a specific domain. */
  existing?: boolean;
  /** Returns true if the Cloud Identity account is associated with a customer of the Channel Services partner (with active subscriptions or purchase consents). */
  owned?: boolean;
  /** If owned = true, the name of the customer that owns the Cloud Identity account. Customer_name uses the format: accounts/{account_id}/customers/{customer_id} */
  customerName?: string;
  /** If existing = true, the Cloud Identity ID of the customer. */
  customerCloudIdentityId?: string;
  /** If existing = true, the type of the customer. */
  customerType?: "CUSTOMER_TYPE_UNSPECIFIED" | "DOMAIN" | "TEAM" | (string & {});
  /** If existing = true, and is 2-tier customer, the channel partner of the customer. */
  channelPartnerCloudIdentityId?: string;
}

export const GoogleCloudChannelV1CloudIdentityCustomerAccount: Schema.Schema<GoogleCloudChannelV1CloudIdentityCustomerAccount> = Schema.suspend(() => Schema.Struct({
  existing: Schema.optional(Schema.Boolean),
  owned: Schema.optional(Schema.Boolean),
  customerName: Schema.optional(Schema.String),
  customerCloudIdentityId: Schema.optional(Schema.String),
  customerType: Schema.optional(Schema.String),
  channelPartnerCloudIdentityId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1CloudIdentityCustomerAccount" }) as any as Schema.Schema<GoogleCloudChannelV1CloudIdentityCustomerAccount>;

export interface GoogleCloudChannelV1CheckCloudIdentityAccountsExistResponse {
  /** The Cloud Identity accounts associated with the domain. */
  cloudIdentityAccounts?: Array<GoogleCloudChannelV1CloudIdentityCustomerAccount>;
}

export const GoogleCloudChannelV1CheckCloudIdentityAccountsExistResponse: Schema.Schema<GoogleCloudChannelV1CheckCloudIdentityAccountsExistResponse> = Schema.suspend(() => Schema.Struct({
  cloudIdentityAccounts: Schema.optional(Schema.Array(GoogleCloudChannelV1CloudIdentityCustomerAccount)),
})).annotate({ identifier: "GoogleCloudChannelV1CheckCloudIdentityAccountsExistResponse" }) as any as Schema.Schema<GoogleCloudChannelV1CheckCloudIdentityAccountsExistResponse>;

export interface GoogleCloudChannelV1ImportCustomerRequest {
  /** Required. Customer domain. */
  domain?: string;
  /** Required. Customer's Cloud Identity ID */
  cloudIdentityId?: string;
  /** Required. Customer's primary admin email. */
  primaryAdminEmail?: string;
  /** Optional. The super admin of the resold customer generates this token to authorize a reseller to access their Cloud Identity and purchase entitlements on their behalf. You can omit this token after authorization. See https://support.google.com/a/answer/7643790 for more details. */
  authToken?: string;
  /** Required. Choose to overwrite an existing customer if found. This must be set to true if there is an existing customer with a conflicting region code or domain. */
  overwriteIfExists?: boolean;
  /** Optional. Cloud Identity ID of a channel partner who will be the direct reseller for the customer's order. This field is required for 2-tier transfer scenarios and can be provided via the request Parent binding as well. */
  channelPartnerId?: string;
  /** Optional. Specifies the customer that will receive imported Cloud Identity information. Format: accounts/{account_id}/customers/{customer_id} */
  customer?: string;
}

export const GoogleCloudChannelV1ImportCustomerRequest: Schema.Schema<GoogleCloudChannelV1ImportCustomerRequest> = Schema.suspend(() => Schema.Struct({
  domain: Schema.optional(Schema.String),
  cloudIdentityId: Schema.optional(Schema.String),
  primaryAdminEmail: Schema.optional(Schema.String),
  authToken: Schema.optional(Schema.String),
  overwriteIfExists: Schema.optional(Schema.Boolean),
  channelPartnerId: Schema.optional(Schema.String),
  customer: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ImportCustomerRequest" }) as any as Schema.Schema<GoogleCloudChannelV1ImportCustomerRequest>;

export interface GoogleCloudChannelV1AdminUser {
  /** Primary email of the admin user. */
  email?: string;
  /** Given name of the admin user. */
  givenName?: string;
  /** Family name of the admin user. */
  familyName?: string;
}

export const GoogleCloudChannelV1AdminUser: Schema.Schema<GoogleCloudChannelV1AdminUser> = Schema.suspend(() => Schema.Struct({
  email: Schema.optional(Schema.String),
  givenName: Schema.optional(Schema.String),
  familyName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1AdminUser" }) as any as Schema.Schema<GoogleCloudChannelV1AdminUser>;

export interface GoogleCloudChannelV1ProvisionCloudIdentityRequest {
  /** CloudIdentity-specific customer information. */
  cloudIdentityInfo?: GoogleCloudChannelV1CloudIdentityInfo;
  /** Admin user information. */
  user?: GoogleCloudChannelV1AdminUser;
  /** Validate the request and preview the review, but do not post it. */
  validateOnly?: boolean;
}

export const GoogleCloudChannelV1ProvisionCloudIdentityRequest: Schema.Schema<GoogleCloudChannelV1ProvisionCloudIdentityRequest> = Schema.suspend(() => Schema.Struct({
  cloudIdentityInfo: Schema.optional(GoogleCloudChannelV1CloudIdentityInfo),
  user: Schema.optional(GoogleCloudChannelV1AdminUser),
  validateOnly: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudChannelV1ProvisionCloudIdentityRequest" }) as any as Schema.Schema<GoogleCloudChannelV1ProvisionCloudIdentityRequest>;

export interface GoogleCloudChannelV1Period {
  /** Total duration of Period Type defined. */
  duration?: number;
  /** Period Type. */
  periodType?: "PERIOD_TYPE_UNSPECIFIED" | "DAY" | "MONTH" | "YEAR" | (string & {});
}

export const GoogleCloudChannelV1Period: Schema.Schema<GoogleCloudChannelV1Period> = Schema.suspend(() => Schema.Struct({
  duration: Schema.optional(Schema.Number),
  periodType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1Period" }) as any as Schema.Schema<GoogleCloudChannelV1Period>;

export interface GoogleCloudChannelV1RenewalSettings {
  /** If false, the plan will be completed at the end date. */
  enableRenewal?: boolean;
  /** If true and enable_renewal = true, the unit (for example seats or licenses) will be set to the number of active units at renewal time. */
  resizeUnitCount?: boolean;
  /** Describes how a reseller will be billed. */
  paymentPlan?: "PAYMENT_PLAN_UNSPECIFIED" | "COMMITMENT" | "FLEXIBLE" | "FREE" | "TRIAL" | "OFFLINE" | (string & {});
  /** Describes how frequently the reseller will be billed, such as once per month. */
  paymentCycle?: GoogleCloudChannelV1Period;
}

export const GoogleCloudChannelV1RenewalSettings: Schema.Schema<GoogleCloudChannelV1RenewalSettings> = Schema.suspend(() => Schema.Struct({
  enableRenewal: Schema.optional(Schema.Boolean),
  resizeUnitCount: Schema.optional(Schema.Boolean),
  paymentPlan: Schema.optional(Schema.String),
  paymentCycle: Schema.optional(GoogleCloudChannelV1Period),
})).annotate({ identifier: "GoogleCloudChannelV1RenewalSettings" }) as any as Schema.Schema<GoogleCloudChannelV1RenewalSettings>;

export interface GoogleCloudChannelV1CommitmentSettings {
  /** Output only. Commitment start timestamp. */
  startTime?: string;
  /** Output only. Commitment end timestamp. */
  endTime?: string;
  /** Optional. Renewal settings applicable for a commitment-based Offer. */
  renewalSettings?: GoogleCloudChannelV1RenewalSettings;
}

export const GoogleCloudChannelV1CommitmentSettings: Schema.Schema<GoogleCloudChannelV1CommitmentSettings> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  renewalSettings: Schema.optional(GoogleCloudChannelV1RenewalSettings),
})).annotate({ identifier: "GoogleCloudChannelV1CommitmentSettings" }) as any as Schema.Schema<GoogleCloudChannelV1CommitmentSettings>;

export interface GoogleCloudChannelV1ProvisionedService {
  /** Output only. Provisioning ID of the entitlement. For Google Workspace, this is the underlying Subscription ID. For Google Cloud, this is the Billing Account ID of the billing subaccount. */
  provisioningId?: string;
  /** Output only. The product pertaining to the provisioning resource as specified in the Offer. */
  productId?: string;
  /** Output only. The SKU pertaining to the provisioning resource as specified in the Offer. */
  skuId?: string;
}

export const GoogleCloudChannelV1ProvisionedService: Schema.Schema<GoogleCloudChannelV1ProvisionedService> = Schema.suspend(() => Schema.Struct({
  provisioningId: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  skuId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ProvisionedService" }) as any as Schema.Schema<GoogleCloudChannelV1ProvisionedService>;

export interface GoogleCloudChannelV1TrialSettings {
  /** Determines if the entitlement is in a trial or not: * `true` - The entitlement is in trial. * `false` - The entitlement is not in trial. */
  trial?: boolean;
  /** Date when the trial ends. The value is in milliseconds using the UNIX Epoch format. See an example [Epoch converter](https://www.epochconverter.com). */
  endTime?: string;
}

export const GoogleCloudChannelV1TrialSettings: Schema.Schema<GoogleCloudChannelV1TrialSettings> = Schema.suspend(() => Schema.Struct({
  trial: Schema.optional(Schema.Boolean),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1TrialSettings" }) as any as Schema.Schema<GoogleCloudChannelV1TrialSettings>;

export interface GoogleCloudChannelV1AssociationInfo {
  /** The name of the base entitlement, for which this entitlement is an add-on. */
  baseEntitlement?: string;
}

export const GoogleCloudChannelV1AssociationInfo: Schema.Schema<GoogleCloudChannelV1AssociationInfo> = Schema.suspend(() => Schema.Struct({
  baseEntitlement: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1AssociationInfo" }) as any as Schema.Schema<GoogleCloudChannelV1AssociationInfo>;

export interface GoogleCloudChannelV1Value {
  /** Represents an int64 value. */
  int64Value?: string;
  /** Represents a string value. */
  stringValue?: string;
  /** Represents a double value. */
  doubleValue?: number;
  /** Represents an 'Any' proto value. */
  protoValue?: Record<string, unknown>;
  /** Represents a boolean value. */
  boolValue?: boolean;
}

export const GoogleCloudChannelV1Value: Schema.Schema<GoogleCloudChannelV1Value> = Schema.suspend(() => Schema.Struct({
  int64Value: Schema.optional(Schema.String),
  stringValue: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
  protoValue: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  boolValue: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudChannelV1Value" }) as any as Schema.Schema<GoogleCloudChannelV1Value>;

export interface GoogleCloudChannelV1Parameter {
  /** Name of the parameter. */
  name?: string;
  /** Value of the parameter. */
  value?: GoogleCloudChannelV1Value;
  /** Output only. Specifies whether this parameter is allowed to be changed. For example, for a Google Workspace Business Starter entitlement in commitment plan, num_units is editable when entitlement is active. */
  editable?: boolean;
}

export const GoogleCloudChannelV1Parameter: Schema.Schema<GoogleCloudChannelV1Parameter> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(GoogleCloudChannelV1Value),
  editable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudChannelV1Parameter" }) as any as Schema.Schema<GoogleCloudChannelV1Parameter>;

export interface GoogleCloudChannelV1Entitlement {
  /** Output only. Resource name of an entitlement in the form: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}. */
  name?: string;
  /** Output only. The time at which the entitlement is created. */
  createTime?: string;
  /** Output only. The time at which the entitlement is updated. */
  updateTime?: string;
  /** Required. The offer resource name for which the entitlement is to be created. Takes the form: accounts/{account_id}/offers/{offer_id}. */
  offer?: string;
  /** Commitment settings for a commitment-based Offer. Required for commitment based offers. */
  commitmentSettings?: GoogleCloudChannelV1CommitmentSettings;
  /** Output only. Current provisioning state of the entitlement. */
  provisioningState?: "PROVISIONING_STATE_UNSPECIFIED" | "ACTIVE" | "SUSPENDED" | (string & {});
  /** Output only. Service provisioning details for the entitlement. */
  provisionedService?: GoogleCloudChannelV1ProvisionedService;
  /** Output only. Enumerable of all current suspension reasons for an entitlement. */
  suspensionReasons?: Array<"SUSPENSION_REASON_UNSPECIFIED" | "RESELLER_INITIATED" | "TRIAL_ENDED" | "RENEWAL_WITH_TYPE_CANCEL" | "PENDING_TOS_ACCEPTANCE" | "OTHER" | (string & {})>;
  /** Optional. This purchase order (PO) information is for resellers to use for their company tracking usage. If a purchaseOrderId value is given, it appears in the API responses and shows up in the invoice. The property accepts up to 80 plain text characters. This is only supported for Google Workspace entitlements. */
  purchaseOrderId?: string;
  /** Output only. Settings for trial offers. */
  trialSettings?: GoogleCloudChannelV1TrialSettings;
  /** Association information to other entitlements. */
  associationInfo?: GoogleCloudChannelV1AssociationInfo;
  /** Extended entitlement parameters. When creating an entitlement, valid parameter names and values are defined in the Offer.parameter_definitions. For Google Workspace, the following Parameters may be accepted as input: - max_units: The maximum assignable units for a flexible offer OR - num_units: The total commitment for commitment-based offers The response may additionally include the following output-only Parameters: - assigned_units: The number of licenses assigned to users. For Google Cloud billing subaccounts, the following Parameter may be accepted as input: - display_name: The display name of the billing subaccount. */
  parameters?: Array<GoogleCloudChannelV1Parameter>;
  /** Optional. The billing account resource name that is used to pay for this entitlement. */
  billingAccount?: string;
  /** Optional. Price reference ID for the offer. Only for offers that require additional price information. Used to guarantee that the pricing is consistent between quoting the offer and placing the order. */
  priceReferenceId?: string;
}

export const GoogleCloudChannelV1Entitlement: Schema.Schema<GoogleCloudChannelV1Entitlement> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  offer: Schema.optional(Schema.String),
  commitmentSettings: Schema.optional(GoogleCloudChannelV1CommitmentSettings),
  provisioningState: Schema.optional(Schema.String),
  provisionedService: Schema.optional(GoogleCloudChannelV1ProvisionedService),
  suspensionReasons: Schema.optional(Schema.Array(Schema.String)),
  purchaseOrderId: Schema.optional(Schema.String),
  trialSettings: Schema.optional(GoogleCloudChannelV1TrialSettings),
  associationInfo: Schema.optional(GoogleCloudChannelV1AssociationInfo),
  parameters: Schema.optional(Schema.Array(GoogleCloudChannelV1Parameter)),
  billingAccount: Schema.optional(Schema.String),
  priceReferenceId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1Entitlement" }) as any as Schema.Schema<GoogleCloudChannelV1Entitlement>;

export interface GoogleCloudChannelV1ListEntitlementsResponse {
  /** The reseller customer's entitlements. */
  entitlements?: Array<GoogleCloudChannelV1Entitlement>;
  /** A token to list the next page of results. Pass to ListEntitlementsRequest.page_token to obtain that page. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListEntitlementsResponse: Schema.Schema<GoogleCloudChannelV1ListEntitlementsResponse> = Schema.suspend(() => Schema.Struct({
  entitlements: Schema.optional(Schema.Array(GoogleCloudChannelV1Entitlement)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListEntitlementsResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListEntitlementsResponse>;

export interface GoogleCloudChannelV1ListTransferableSkusRequest {
  /** Customer's Cloud Identity ID */
  cloudIdentityId?: string;
  /** A reseller is required to create a customer and use the resource name of the created customer here. Customer_name uses the format: accounts/{account_id}/customers/{customer_id} */
  customerName?: string;
  /** The requested page size. Server might return fewer results than requested. If unspecified, returns at most 100 SKUs. The maximum value is 1000; the server will coerce values above 1000. Optional. */
  pageSize?: number;
  /** A token for a page of results other than the first page. Obtained using ListTransferableSkusResponse.next_page_token of the previous CloudChannelService.ListTransferableSkus call. Optional. */
  pageToken?: string;
  /** Optional. The super admin of the resold customer generates this token to authorize a reseller to access their Cloud Identity and purchase entitlements on their behalf. You can omit this token after authorization. See https://support.google.com/a/answer/7643790 for more details. */
  authToken?: string;
  /** The BCP-47 language code. For example, "en-US". The response will localize in the corresponding language code, if specified. The default value is "en-US". Optional. */
  languageCode?: string;
}

export const GoogleCloudChannelV1ListTransferableSkusRequest: Schema.Schema<GoogleCloudChannelV1ListTransferableSkusRequest> = Schema.suspend(() => Schema.Struct({
  cloudIdentityId: Schema.optional(Schema.String),
  customerName: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  authToken: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListTransferableSkusRequest" }) as any as Schema.Schema<GoogleCloudChannelV1ListTransferableSkusRequest>;

export interface GoogleCloudChannelV1TransferEligibility {
  /** Whether reseller is eligible to transfer the SKU. */
  isEligible?: boolean;
  /** Localized description if reseller is not eligible to transfer the SKU. */
  description?: string;
  /** Specified the reason for ineligibility. */
  ineligibilityReason?: "REASON_UNSPECIFIED" | "PENDING_TOS_ACCEPTANCE" | "SKU_NOT_ELIGIBLE" | "SKU_SUSPENDED" | "CHANNEL_PARTNER_NOT_AUTHORIZED_FOR_SKU" | (string & {});
}

export const GoogleCloudChannelV1TransferEligibility: Schema.Schema<GoogleCloudChannelV1TransferEligibility> = Schema.suspend(() => Schema.Struct({
  isEligible: Schema.optional(Schema.Boolean),
  description: Schema.optional(Schema.String),
  ineligibilityReason: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1TransferEligibility" }) as any as Schema.Schema<GoogleCloudChannelV1TransferEligibility>;

export interface GoogleCloudChannelV1Media {
  /** Title of the media. */
  title?: string;
  /** URL of the media. */
  content?: string;
  /** Type of the media. */
  type?: "MEDIA_TYPE_UNSPECIFIED" | "MEDIA_TYPE_IMAGE" | (string & {});
}

export const GoogleCloudChannelV1Media: Schema.Schema<GoogleCloudChannelV1Media> = Schema.suspend(() => Schema.Struct({
  title: Schema.optional(Schema.String),
  content: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1Media" }) as any as Schema.Schema<GoogleCloudChannelV1Media>;

export interface GoogleCloudChannelV1MarketingInfo {
  /** Human readable name. */
  displayName?: string;
  /** Human readable description. Description can contain HTML. */
  description?: string;
  /** Default logo. */
  defaultLogo?: GoogleCloudChannelV1Media;
}

export const GoogleCloudChannelV1MarketingInfo: Schema.Schema<GoogleCloudChannelV1MarketingInfo> = Schema.suspend(() => Schema.Struct({
  displayName: Schema.optional(Schema.String),
  description: Schema.optional(Schema.String),
  defaultLogo: Schema.optional(GoogleCloudChannelV1Media),
})).annotate({ identifier: "GoogleCloudChannelV1MarketingInfo" }) as any as Schema.Schema<GoogleCloudChannelV1MarketingInfo>;

export interface GoogleCloudChannelV1Product {
  /** Resource Name of the Product. Format: products/{product_id} */
  name?: string;
  /** Marketing information for the product. */
  marketingInfo?: GoogleCloudChannelV1MarketingInfo;
}

export const GoogleCloudChannelV1Product: Schema.Schema<GoogleCloudChannelV1Product> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  marketingInfo: Schema.optional(GoogleCloudChannelV1MarketingInfo),
})).annotate({ identifier: "GoogleCloudChannelV1Product" }) as any as Schema.Schema<GoogleCloudChannelV1Product>;

export interface GoogleCloudChannelV1Sku {
  /** Resource Name of the SKU. Format: products/{product_id}/skus/{sku_id} */
  name?: string;
  /** Marketing information for the SKU. */
  marketingInfo?: GoogleCloudChannelV1MarketingInfo;
  /** Product the SKU is associated with. */
  product?: GoogleCloudChannelV1Product;
}

export const GoogleCloudChannelV1Sku: Schema.Schema<GoogleCloudChannelV1Sku> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  marketingInfo: Schema.optional(GoogleCloudChannelV1MarketingInfo),
  product: Schema.optional(GoogleCloudChannelV1Product),
})).annotate({ identifier: "GoogleCloudChannelV1Sku" }) as any as Schema.Schema<GoogleCloudChannelV1Sku>;

export interface GoogleCloudChannelV1TransferableSku {
  /** Describes the transfer eligibility of a SKU. */
  transferEligibility?: GoogleCloudChannelV1TransferEligibility;
  /** The SKU pertaining to the provisioning resource as specified in the Offer. */
  sku?: GoogleCloudChannelV1Sku;
  /** Optional. The customer to transfer has an entitlement with the populated legacy SKU. */
  legacySku?: GoogleCloudChannelV1Sku;
}

export const GoogleCloudChannelV1TransferableSku: Schema.Schema<GoogleCloudChannelV1TransferableSku> = Schema.suspend(() => Schema.Struct({
  transferEligibility: Schema.optional(GoogleCloudChannelV1TransferEligibility),
  sku: Schema.optional(GoogleCloudChannelV1Sku),
  legacySku: Schema.optional(GoogleCloudChannelV1Sku),
})).annotate({ identifier: "GoogleCloudChannelV1TransferableSku" }) as any as Schema.Schema<GoogleCloudChannelV1TransferableSku>;

export interface GoogleCloudChannelV1ListTransferableSkusResponse {
  /** Information about existing SKUs for a customer that needs a transfer. */
  transferableSkus?: Array<GoogleCloudChannelV1TransferableSku>;
  /** A token to retrieve the next page of results. Pass to ListTransferableSkusRequest.page_token to obtain that page. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListTransferableSkusResponse: Schema.Schema<GoogleCloudChannelV1ListTransferableSkusResponse> = Schema.suspend(() => Schema.Struct({
  transferableSkus: Schema.optional(Schema.Array(GoogleCloudChannelV1TransferableSku)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListTransferableSkusResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListTransferableSkusResponse>;

export interface GoogleCloudChannelV1ListTransferableOffersRequest {
  /** Customer's Cloud Identity ID */
  cloudIdentityId?: string;
  /** A reseller should create a customer and use the resource name of that customer here. */
  customerName?: string;
  /** Requested page size. Server might return fewer results than requested. If unspecified, returns at most 100 offers. The maximum value is 1000; the server will coerce values above 1000. */
  pageSize?: number;
  /** A token for a page of results other than the first page. Obtained using ListTransferableOffersResponse.next_page_token of the previous CloudChannelService.ListTransferableOffers call. */
  pageToken?: string;
  /** Required. The SKU to look up Offers for. */
  sku?: string;
  /** Optional. The BCP-47 language code. For example, "en-US". The response will localize in the corresponding language code, if specified. The default value is "en-US". */
  languageCode?: string;
  /** Optional. The Billing Account to look up Offers for. Format: accounts/{account_id}/billingAccounts/{billing_account_id}. This field is only relevant for multi-currency accounts. It should be left empty for single currency accounts. */
  billingAccount?: string;
}

export const GoogleCloudChannelV1ListTransferableOffersRequest: Schema.Schema<GoogleCloudChannelV1ListTransferableOffersRequest> = Schema.suspend(() => Schema.Struct({
  cloudIdentityId: Schema.optional(Schema.String),
  customerName: Schema.optional(Schema.String),
  pageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  sku: Schema.optional(Schema.String),
  languageCode: Schema.optional(Schema.String),
  billingAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListTransferableOffersRequest" }) as any as Schema.Schema<GoogleCloudChannelV1ListTransferableOffersRequest>;

export interface GoogleCloudChannelV1Plan {
  /** Describes how a reseller will be billed. */
  paymentPlan?: "PAYMENT_PLAN_UNSPECIFIED" | "COMMITMENT" | "FLEXIBLE" | "FREE" | "TRIAL" | "OFFLINE" | (string & {});
  /** Specifies when the payment needs to happen. */
  paymentType?: "PAYMENT_TYPE_UNSPECIFIED" | "PREPAY" | "POSTPAY" | (string & {});
  /** Describes how frequently the reseller will be billed, such as once per month. */
  paymentCycle?: GoogleCloudChannelV1Period;
  /** Present for Offers with a trial period. For trial-only Offers, a paid service needs to start before the trial period ends for continued service. For Regular Offers with a trial period, the regular pricing goes into effect when trial period ends, or if paid service is started before the end of the trial period. */
  trialPeriod?: GoogleCloudChannelV1Period;
  /** Reseller Billing account to charge after an offer transaction. Only present for Google Cloud offers. */
  billingAccount?: string;
}

export const GoogleCloudChannelV1Plan: Schema.Schema<GoogleCloudChannelV1Plan> = Schema.suspend(() => Schema.Struct({
  paymentPlan: Schema.optional(Schema.String),
  paymentType: Schema.optional(Schema.String),
  paymentCycle: Schema.optional(GoogleCloudChannelV1Period),
  trialPeriod: Schema.optional(GoogleCloudChannelV1Period),
  billingAccount: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1Plan" }) as any as Schema.Schema<GoogleCloudChannelV1Plan>;

export interface GoogleCloudChannelV1CustomerConstraints {
  /** Allowed geographical regions of the customer. */
  allowedRegions?: Array<string>;
  /** Allowed Customer Type. */
  allowedCustomerTypes?: Array<"CUSTOMER_TYPE_UNSPECIFIED" | "DOMAIN" | "TEAM" | (string & {})>;
  /** Allowed Promotional Order Type. Present for Promotional offers. */
  promotionalOrderTypes?: Array<"PROMOTIONAL_TYPE_UNSPECIFIED" | "NEW_UPGRADE" | "TRANSFER" | "PROMOTION_SWITCH" | (string & {})>;
}

export const GoogleCloudChannelV1CustomerConstraints: Schema.Schema<GoogleCloudChannelV1CustomerConstraints> = Schema.suspend(() => Schema.Struct({
  allowedRegions: Schema.optional(Schema.Array(Schema.String)),
  allowedCustomerTypes: Schema.optional(Schema.Array(Schema.String)),
  promotionalOrderTypes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "GoogleCloudChannelV1CustomerConstraints" }) as any as Schema.Schema<GoogleCloudChannelV1CustomerConstraints>;

export interface GoogleCloudChannelV1Constraints {
  /** Represents constraints required to purchase the Offer for a customer. */
  customerConstraints?: GoogleCloudChannelV1CustomerConstraints;
}

export const GoogleCloudChannelV1Constraints: Schema.Schema<GoogleCloudChannelV1Constraints> = Schema.suspend(() => Schema.Struct({
  customerConstraints: Schema.optional(GoogleCloudChannelV1CustomerConstraints),
})).annotate({ identifier: "GoogleCloudChannelV1Constraints" }) as any as Schema.Schema<GoogleCloudChannelV1Constraints>;

export interface GoogleCloudChannelV1DiscountComponent {
  /** Discount percentage, represented as decimal. For example, a 20% discount will be represented as 0.2. */
  discountPercentage?: number;
  /** Fixed value discount. */
  discountAbsolute?: GoogleTypeMoney;
  /** Type of the discount. */
  discountType?: "DISCOUNT_TYPE_UNSPECIFIED" | "REGIONAL_DISCOUNT" | "PROMOTIONAL_DISCOUNT" | "SALES_DISCOUNT" | "RESELLER_MARGIN" | "DEAL_CODE" | (string & {});
}

export const GoogleCloudChannelV1DiscountComponent: Schema.Schema<GoogleCloudChannelV1DiscountComponent> = Schema.suspend(() => Schema.Struct({
  discountPercentage: Schema.optional(Schema.Number),
  discountAbsolute: Schema.optional(GoogleTypeMoney),
  discountType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1DiscountComponent" }) as any as Schema.Schema<GoogleCloudChannelV1DiscountComponent>;

export interface GoogleCloudChannelV1Price {
  /** Base price. */
  basePrice?: GoogleTypeMoney;
  /** Discount percentage, represented as decimal. For example, a 20% discount will be represent as 0.2. */
  discount?: number;
  /** Effective Price after applying the discounts. */
  effectivePrice?: GoogleTypeMoney;
  /** The time period with respect to which base and effective prices are defined. Example: 1 month, 6 months, 1 year, etc. */
  pricePeriod?: GoogleCloudChannelV1Period;
  /** Link to external price list, such as link to Google Voice rate card. */
  externalPriceUri?: string;
  /** Breakdown of the discount into its components. This will be empty if there is no discount present. */
  discountComponents?: Array<GoogleCloudChannelV1DiscountComponent>;
}

export const GoogleCloudChannelV1Price: Schema.Schema<GoogleCloudChannelV1Price> = Schema.suspend(() => Schema.Struct({
  basePrice: Schema.optional(GoogleTypeMoney),
  discount: Schema.optional(Schema.Number),
  effectivePrice: Schema.optional(GoogleTypeMoney),
  pricePeriod: Schema.optional(GoogleCloudChannelV1Period),
  externalPriceUri: Schema.optional(Schema.String),
  discountComponents: Schema.optional(Schema.Array(GoogleCloudChannelV1DiscountComponent)),
})).annotate({ identifier: "GoogleCloudChannelV1Price" }) as any as Schema.Schema<GoogleCloudChannelV1Price>;

export interface GoogleCloudChannelV1PriceTier {
  /** First resource for which the tier price applies. */
  firstResource?: number;
  /** Last resource for which the tier price applies. */
  lastResource?: number;
  /** Price of the tier. */
  price?: GoogleCloudChannelV1Price;
}

export const GoogleCloudChannelV1PriceTier: Schema.Schema<GoogleCloudChannelV1PriceTier> = Schema.suspend(() => Schema.Struct({
  firstResource: Schema.optional(Schema.Number),
  lastResource: Schema.optional(Schema.Number),
  price: Schema.optional(GoogleCloudChannelV1Price),
})).annotate({ identifier: "GoogleCloudChannelV1PriceTier" }) as any as Schema.Schema<GoogleCloudChannelV1PriceTier>;

export interface GoogleCloudChannelV1PricePhase {
  /** Defines the phase period type. */
  periodType?: "PERIOD_TYPE_UNSPECIFIED" | "DAY" | "MONTH" | "YEAR" | (string & {});
  /** Defines first period for the phase. */
  firstPeriod?: number;
  /** Defines first period for the phase. */
  lastPeriod?: number;
  /** Price of the phase. Present if there are no price tiers. */
  price?: GoogleCloudChannelV1Price;
  /** Price by the resource tiers. */
  priceTiers?: Array<GoogleCloudChannelV1PriceTier>;
}

export const GoogleCloudChannelV1PricePhase: Schema.Schema<GoogleCloudChannelV1PricePhase> = Schema.suspend(() => Schema.Struct({
  periodType: Schema.optional(Schema.String),
  firstPeriod: Schema.optional(Schema.Number),
  lastPeriod: Schema.optional(Schema.Number),
  price: Schema.optional(GoogleCloudChannelV1Price),
  priceTiers: Schema.optional(Schema.Array(GoogleCloudChannelV1PriceTier)),
})).annotate({ identifier: "GoogleCloudChannelV1PricePhase" }) as any as Schema.Schema<GoogleCloudChannelV1PricePhase>;

export interface GoogleCloudChannelV1PriceByResource {
  /** Resource Type. Example: SEAT */
  resourceType?: "RESOURCE_TYPE_UNSPECIFIED" | "SEAT" | "MAU" | "GB" | "LICENSED_USER" | "MINUTES" | "IAAS_USAGE" | "SUBSCRIPTION" | (string & {});
  /** Price of the Offer. Present if there are no price phases. */
  price?: GoogleCloudChannelV1Price;
  /** Specifies the price by time range. */
  pricePhases?: Array<GoogleCloudChannelV1PricePhase>;
}

export const GoogleCloudChannelV1PriceByResource: Schema.Schema<GoogleCloudChannelV1PriceByResource> = Schema.suspend(() => Schema.Struct({
  resourceType: Schema.optional(Schema.String),
  price: Schema.optional(GoogleCloudChannelV1Price),
  pricePhases: Schema.optional(Schema.Array(GoogleCloudChannelV1PricePhase)),
})).annotate({ identifier: "GoogleCloudChannelV1PriceByResource" }) as any as Schema.Schema<GoogleCloudChannelV1PriceByResource>;

export interface GoogleCloudChannelV1ParameterDefinition {
  /** Name of the parameter. */
  name?: string;
  /** Data type of the parameter. Minimal value, Maximum value and allowed values will use specified data type here. */
  parameterType?: "PARAMETER_TYPE_UNSPECIFIED" | "INT64" | "STRING" | "DOUBLE" | "BOOLEAN" | (string & {});
  /** Minimal value of the parameter, if applicable. Inclusive. For example, minimal commitment when purchasing Anthos is 0.01. Applicable to INT64 and DOUBLE parameter types. */
  minValue?: GoogleCloudChannelV1Value;
  /** Maximum value of the parameter, if applicable. Inclusive. For example, maximum seats when purchasing Google Workspace Business Standard. Applicable to INT64 and DOUBLE parameter types. */
  maxValue?: GoogleCloudChannelV1Value;
  /** If not empty, parameter values must be drawn from this list. For example, [us-west1, us-west2, ...] Applicable to STRING parameter type. */
  allowedValues?: Array<GoogleCloudChannelV1Value>;
  /** If set to true, parameter is optional to purchase this Offer. */
  optional?: boolean;
}

export const GoogleCloudChannelV1ParameterDefinition: Schema.Schema<GoogleCloudChannelV1ParameterDefinition> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  parameterType: Schema.optional(Schema.String),
  minValue: Schema.optional(GoogleCloudChannelV1Value),
  maxValue: Schema.optional(GoogleCloudChannelV1Value),
  allowedValues: Schema.optional(Schema.Array(GoogleCloudChannelV1Value)),
  optional: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudChannelV1ParameterDefinition" }) as any as Schema.Schema<GoogleCloudChannelV1ParameterDefinition>;

export interface GoogleCloudChannelV1Offer {
  /** Resource Name of the Offer. Format: accounts/{account_id}/offers/{offer_id} */
  name?: string;
  /** Marketing information for the Offer. */
  marketingInfo?: GoogleCloudChannelV1MarketingInfo;
  /** SKU the offer is associated with. */
  sku?: GoogleCloudChannelV1Sku;
  /** Describes the payment plan for the Offer. */
  plan?: GoogleCloudChannelV1Plan;
  /** Constraints on transacting the Offer. */
  constraints?: GoogleCloudChannelV1Constraints;
  /** Price for each monetizable resource type. */
  priceByResources?: Array<GoogleCloudChannelV1PriceByResource>;
  /** Start of the Offer validity time. */
  startTime?: string;
  /** Output only. End of the Offer validity time. */
  endTime?: string;
  /** Parameters required to use current Offer to purchase. */
  parameterDefinitions?: Array<GoogleCloudChannelV1ParameterDefinition>;
  /** The deal code of the offer to get a special promotion or discount. */
  dealCode?: string;
}

export const GoogleCloudChannelV1Offer: Schema.Schema<GoogleCloudChannelV1Offer> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  marketingInfo: Schema.optional(GoogleCloudChannelV1MarketingInfo),
  sku: Schema.optional(GoogleCloudChannelV1Sku),
  plan: Schema.optional(GoogleCloudChannelV1Plan),
  constraints: Schema.optional(GoogleCloudChannelV1Constraints),
  priceByResources: Schema.optional(Schema.Array(GoogleCloudChannelV1PriceByResource)),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  parameterDefinitions: Schema.optional(Schema.Array(GoogleCloudChannelV1ParameterDefinition)),
  dealCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1Offer" }) as any as Schema.Schema<GoogleCloudChannelV1Offer>;

export interface GoogleCloudChannelV1TransferableOffer {
  /** Offer with parameter constraints updated to allow the Transfer. */
  offer?: GoogleCloudChannelV1Offer;
  /** Optional. Price reference ID for the offer. Only for offers that require additional price information. Used to guarantee that the pricing is consistent between quoting the offer and placing the order. */
  priceReferenceId?: string;
}

export const GoogleCloudChannelV1TransferableOffer: Schema.Schema<GoogleCloudChannelV1TransferableOffer> = Schema.suspend(() => Schema.Struct({
  offer: Schema.optional(GoogleCloudChannelV1Offer),
  priceReferenceId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1TransferableOffer" }) as any as Schema.Schema<GoogleCloudChannelV1TransferableOffer>;

export interface GoogleCloudChannelV1ListTransferableOffersResponse {
  /** Information about Offers for a customer that can be used for transfer. */
  transferableOffers?: Array<GoogleCloudChannelV1TransferableOffer>;
  /** A token to retrieve the next page of results. Pass to ListTransferableOffersRequest.page_token to obtain that page. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListTransferableOffersResponse: Schema.Schema<GoogleCloudChannelV1ListTransferableOffersResponse> = Schema.suspend(() => Schema.Struct({
  transferableOffers: Schema.optional(Schema.Array(GoogleCloudChannelV1TransferableOffer)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListTransferableOffersResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListTransferableOffersResponse>;

export interface GoogleCloudChannelV1CreateEntitlementRequest {
  /** Required. The entitlement to create. */
  entitlement?: GoogleCloudChannelV1Entitlement;
  /** Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). */
  requestId?: string;
}

export const GoogleCloudChannelV1CreateEntitlementRequest: Schema.Schema<GoogleCloudChannelV1CreateEntitlementRequest> = Schema.suspend(() => Schema.Struct({
  entitlement: Schema.optional(GoogleCloudChannelV1Entitlement),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1CreateEntitlementRequest" }) as any as Schema.Schema<GoogleCloudChannelV1CreateEntitlementRequest>;

export interface GoogleCloudChannelV1ChangeParametersRequest {
  /** Required. Entitlement parameters to update. You can only change editable parameters. To view the available Parameters for a request, refer to the Offer.parameter_definitions from the desired offer. */
  parameters?: Array<GoogleCloudChannelV1Parameter>;
  /** Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). */
  requestId?: string;
  /** Optional. Purchase order ID provided by the reseller. */
  purchaseOrderId?: string;
}

export const GoogleCloudChannelV1ChangeParametersRequest: Schema.Schema<GoogleCloudChannelV1ChangeParametersRequest> = Schema.suspend(() => Schema.Struct({
  parameters: Schema.optional(Schema.Array(GoogleCloudChannelV1Parameter)),
  requestId: Schema.optional(Schema.String),
  purchaseOrderId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ChangeParametersRequest" }) as any as Schema.Schema<GoogleCloudChannelV1ChangeParametersRequest>;

export interface GoogleCloudChannelV1ChangeRenewalSettingsRequest {
  /** Required. New renewal settings. */
  renewalSettings?: GoogleCloudChannelV1RenewalSettings;
  /** Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). */
  requestId?: string;
}

export const GoogleCloudChannelV1ChangeRenewalSettingsRequest: Schema.Schema<GoogleCloudChannelV1ChangeRenewalSettingsRequest> = Schema.suspend(() => Schema.Struct({
  renewalSettings: Schema.optional(GoogleCloudChannelV1RenewalSettings),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ChangeRenewalSettingsRequest" }) as any as Schema.Schema<GoogleCloudChannelV1ChangeRenewalSettingsRequest>;

export interface GoogleCloudChannelV1ChangeOfferRequest {
  /** Required. New Offer. Format: accounts/{account_id}/offers/{offer_id}. */
  offer?: string;
  /** Optional. Parameters needed to purchase the Offer. To view the available Parameters refer to the Offer.parameter_definitions from the desired offer. */
  parameters?: Array<GoogleCloudChannelV1Parameter>;
  /** Optional. Purchase order id provided by the reseller. */
  purchaseOrderId?: string;
  /** Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). */
  requestId?: string;
  /** Optional. The billing account resource name that is used to pay for this entitlement when setting up billing on a trial subscription. This field is only relevant for multi-currency accounts. It should be left empty for single currency accounts. */
  billingAccount?: string;
  /** Optional. Price reference ID for the offer. Only for offers that require additional price information. Used to guarantee that the pricing is consistent between quoting the offer and placing the order. */
  priceReferenceId?: string;
}

export const GoogleCloudChannelV1ChangeOfferRequest: Schema.Schema<GoogleCloudChannelV1ChangeOfferRequest> = Schema.suspend(() => Schema.Struct({
  offer: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Array(GoogleCloudChannelV1Parameter)),
  purchaseOrderId: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
  billingAccount: Schema.optional(Schema.String),
  priceReferenceId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ChangeOfferRequest" }) as any as Schema.Schema<GoogleCloudChannelV1ChangeOfferRequest>;

export interface GoogleCloudChannelV1StartPaidServiceRequest {
  /** Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). */
  requestId?: string;
}

export const GoogleCloudChannelV1StartPaidServiceRequest: Schema.Schema<GoogleCloudChannelV1StartPaidServiceRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1StartPaidServiceRequest" }) as any as Schema.Schema<GoogleCloudChannelV1StartPaidServiceRequest>;

export interface GoogleCloudChannelV1SuspendEntitlementRequest {
  /** Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). */
  requestId?: string;
}

export const GoogleCloudChannelV1SuspendEntitlementRequest: Schema.Schema<GoogleCloudChannelV1SuspendEntitlementRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1SuspendEntitlementRequest" }) as any as Schema.Schema<GoogleCloudChannelV1SuspendEntitlementRequest>;

export interface GoogleCloudChannelV1CancelEntitlementRequest {
  /** Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). */
  requestId?: string;
}

export const GoogleCloudChannelV1CancelEntitlementRequest: Schema.Schema<GoogleCloudChannelV1CancelEntitlementRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1CancelEntitlementRequest" }) as any as Schema.Schema<GoogleCloudChannelV1CancelEntitlementRequest>;

export interface GoogleCloudChannelV1ActivateEntitlementRequest {
  /** Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). */
  requestId?: string;
}

export const GoogleCloudChannelV1ActivateEntitlementRequest: Schema.Schema<GoogleCloudChannelV1ActivateEntitlementRequest> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ActivateEntitlementRequest" }) as any as Schema.Schema<GoogleCloudChannelV1ActivateEntitlementRequest>;

export interface GoogleCloudChannelV1TransferEntitlementsRequest {
  /** Required. The new entitlements to create or transfer. */
  entitlements?: Array<GoogleCloudChannelV1Entitlement>;
  /** The super admin of the resold customer generates this token to authorize a reseller to access their Cloud Identity and purchase entitlements on their behalf. You can omit this token after authorization. See https://support.google.com/a/answer/7643790 for more details. */
  authToken?: string;
  /** Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). */
  requestId?: string;
}

export const GoogleCloudChannelV1TransferEntitlementsRequest: Schema.Schema<GoogleCloudChannelV1TransferEntitlementsRequest> = Schema.suspend(() => Schema.Struct({
  entitlements: Schema.optional(Schema.Array(GoogleCloudChannelV1Entitlement)),
  authToken: Schema.optional(Schema.String),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1TransferEntitlementsRequest" }) as any as Schema.Schema<GoogleCloudChannelV1TransferEntitlementsRequest>;

export interface GoogleCloudChannelV1TransferEntitlementsToGoogleRequest {
  /** Required. The entitlements to transfer to Google. */
  entitlements?: Array<GoogleCloudChannelV1Entitlement>;
  /** Optional. You can specify an optional unique request ID, and if you need to retry your request, the server will know to ignore the request if it's complete. For example, you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if it received the original operation with the same request ID. If it did, it will ignore the second request. The request ID must be a valid [UUID](https://tools.ietf.org/html/rfc4122) with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). */
  requestId?: string;
}

export const GoogleCloudChannelV1TransferEntitlementsToGoogleRequest: Schema.Schema<GoogleCloudChannelV1TransferEntitlementsToGoogleRequest> = Schema.suspend(() => Schema.Struct({
  entitlements: Schema.optional(Schema.Array(GoogleCloudChannelV1Entitlement)),
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1TransferEntitlementsToGoogleRequest" }) as any as Schema.Schema<GoogleCloudChannelV1TransferEntitlementsToGoogleRequest>;

export interface GoogleCloudChannelV1ChannelPartnerLink {
  /** Output only. Resource name for the channel partner link, in the format accounts/{account_id}/channelPartnerLinks/{id}. */
  name?: string;
  /** Required. Cloud Identity ID of the linked reseller. */
  resellerCloudIdentityId?: string;
  /** Required. State of the channel partner link. */
  linkState?: "CHANNEL_PARTNER_LINK_STATE_UNSPECIFIED" | "INVITED" | "ACTIVE" | "REVOKED" | "SUSPENDED" | (string & {});
  /** Output only. URI of the web page where partner accepts the link invitation. */
  inviteLinkUri?: string;
  /** Output only. Timestamp of when the channel partner link is created. */
  createTime?: string;
  /** Output only. Timestamp of when the channel partner link is updated. */
  updateTime?: string;
  /** Output only. Public identifier that a customer must use to generate a transfer token to move to this distributor-reseller combination. */
  publicId?: string;
  /** Output only. Cloud Identity info of the channel partner (IR). */
  channelPartnerCloudIdentityInfo?: GoogleCloudChannelV1CloudIdentityInfo;
}

export const GoogleCloudChannelV1ChannelPartnerLink: Schema.Schema<GoogleCloudChannelV1ChannelPartnerLink> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  resellerCloudIdentityId: Schema.optional(Schema.String),
  linkState: Schema.optional(Schema.String),
  inviteLinkUri: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  publicId: Schema.optional(Schema.String),
  channelPartnerCloudIdentityInfo: Schema.optional(GoogleCloudChannelV1CloudIdentityInfo),
})).annotate({ identifier: "GoogleCloudChannelV1ChannelPartnerLink" }) as any as Schema.Schema<GoogleCloudChannelV1ChannelPartnerLink>;

export interface GoogleCloudChannelV1ListChannelPartnerLinksResponse {
  /** The Channel partner links for a reseller. */
  channelPartnerLinks?: Array<GoogleCloudChannelV1ChannelPartnerLink>;
  /** A token to retrieve the next page of results. Pass to ListChannelPartnerLinksRequest.page_token to obtain that page. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListChannelPartnerLinksResponse: Schema.Schema<GoogleCloudChannelV1ListChannelPartnerLinksResponse> = Schema.suspend(() => Schema.Struct({
  channelPartnerLinks: Schema.optional(Schema.Array(GoogleCloudChannelV1ChannelPartnerLink)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListChannelPartnerLinksResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListChannelPartnerLinksResponse>;

export interface GoogleCloudChannelV1UpdateChannelPartnerLinkRequest {
  /** Required. The channel partner link to update. Only channel_partner_link.link_state is allowed for updates. */
  channelPartnerLink?: GoogleCloudChannelV1ChannelPartnerLink;
  /** Required. The update mask that applies to the resource. The only allowable value for an update mask is channel_partner_link.link_state. */
  updateMask?: string;
}

export const GoogleCloudChannelV1UpdateChannelPartnerLinkRequest: Schema.Schema<GoogleCloudChannelV1UpdateChannelPartnerLinkRequest> = Schema.suspend(() => Schema.Struct({
  channelPartnerLink: Schema.optional(GoogleCloudChannelV1ChannelPartnerLink),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1UpdateChannelPartnerLinkRequest" }) as any as Schema.Schema<GoogleCloudChannelV1UpdateChannelPartnerLinkRequest>;

export interface GoogleCloudChannelV1RepricingConfigEntitlementGranularity {
  /** Resource name of the entitlement. Format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} */
  entitlement?: string;
}

export const GoogleCloudChannelV1RepricingConfigEntitlementGranularity: Schema.Schema<GoogleCloudChannelV1RepricingConfigEntitlementGranularity> = Schema.suspend(() => Schema.Struct({
  entitlement: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1RepricingConfigEntitlementGranularity" }) as any as Schema.Schema<GoogleCloudChannelV1RepricingConfigEntitlementGranularity>;

export interface GoogleCloudChannelV1RepricingConfigChannelPartnerGranularity {
}

export const GoogleCloudChannelV1RepricingConfigChannelPartnerGranularity: Schema.Schema<GoogleCloudChannelV1RepricingConfigChannelPartnerGranularity> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "GoogleCloudChannelV1RepricingConfigChannelPartnerGranularity" }) as any as Schema.Schema<GoogleCloudChannelV1RepricingConfigChannelPartnerGranularity>;

export interface GoogleCloudChannelV1PercentageAdjustment {
  /** The percentage of the bill to adjust. For example: Mark down by 1% => "-1.00" Mark up by 1% => "1.00" Pass-Through => "0.00" */
  percentage?: GoogleTypeDecimal;
}

export const GoogleCloudChannelV1PercentageAdjustment: Schema.Schema<GoogleCloudChannelV1PercentageAdjustment> = Schema.suspend(() => Schema.Struct({
  percentage: Schema.optional(GoogleTypeDecimal),
})).annotate({ identifier: "GoogleCloudChannelV1PercentageAdjustment" }) as any as Schema.Schema<GoogleCloudChannelV1PercentageAdjustment>;

export interface GoogleCloudChannelV1RepricingAdjustment {
  /** Flat markup or markdown on an entire bill. */
  percentageAdjustment?: GoogleCloudChannelV1PercentageAdjustment;
}

export const GoogleCloudChannelV1RepricingAdjustment: Schema.Schema<GoogleCloudChannelV1RepricingAdjustment> = Schema.suspend(() => Schema.Struct({
  percentageAdjustment: Schema.optional(GoogleCloudChannelV1PercentageAdjustment),
})).annotate({ identifier: "GoogleCloudChannelV1RepricingAdjustment" }) as any as Schema.Schema<GoogleCloudChannelV1RepricingAdjustment>;

export interface GoogleCloudChannelV1SkuGroupCondition {
  /** Specifies a SKU group (https://cloud.google.com/skus/sku-groups). Resource name of SKU group. Format: accounts/{account}/skuGroups/{sku_group}. Example: "accounts/C01234/skuGroups/3d50fd57-3157-4577-a5a9-a219b8490041". */
  skuGroup?: string;
}

export const GoogleCloudChannelV1SkuGroupCondition: Schema.Schema<GoogleCloudChannelV1SkuGroupCondition> = Schema.suspend(() => Schema.Struct({
  skuGroup: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1SkuGroupCondition" }) as any as Schema.Schema<GoogleCloudChannelV1SkuGroupCondition>;

export interface GoogleCloudChannelV1RepricingCondition {
  /** SKU Group condition for override. */
  skuGroupCondition?: GoogleCloudChannelV1SkuGroupCondition;
}

export const GoogleCloudChannelV1RepricingCondition: Schema.Schema<GoogleCloudChannelV1RepricingCondition> = Schema.suspend(() => Schema.Struct({
  skuGroupCondition: Schema.optional(GoogleCloudChannelV1SkuGroupCondition),
})).annotate({ identifier: "GoogleCloudChannelV1RepricingCondition" }) as any as Schema.Schema<GoogleCloudChannelV1RepricingCondition>;

export interface GoogleCloudChannelV1ConditionalOverride {
  /** Required. Information about the applied override's adjustment. */
  adjustment?: GoogleCloudChannelV1RepricingAdjustment;
  /** Required. The RebillingBasis to use for the applied override. Shows the relative cost based on your repricing costs. */
  rebillingBasis?: "REBILLING_BASIS_UNSPECIFIED" | "COST_AT_LIST" | "DIRECT_CUSTOMER_COST" | (string & {});
  /** Required. Specifies the condition which, if met, will apply the override. */
  repricingCondition?: GoogleCloudChannelV1RepricingCondition;
}

export const GoogleCloudChannelV1ConditionalOverride: Schema.Schema<GoogleCloudChannelV1ConditionalOverride> = Schema.suspend(() => Schema.Struct({
  adjustment: Schema.optional(GoogleCloudChannelV1RepricingAdjustment),
  rebillingBasis: Schema.optional(Schema.String),
  repricingCondition: Schema.optional(GoogleCloudChannelV1RepricingCondition),
})).annotate({ identifier: "GoogleCloudChannelV1ConditionalOverride" }) as any as Schema.Schema<GoogleCloudChannelV1ConditionalOverride>;

export interface GoogleCloudChannelV1RepricingConfig {
  /** Required. Applies the repricing configuration at the entitlement level. Note: If a ChannelPartnerRepricingConfig using RepricingConfig.EntitlementGranularity becomes effective, then no existing or future RepricingConfig.ChannelPartnerGranularity will apply to the RepricingConfig.EntitlementGranularity.entitlement. This is the recommended value for both CustomerRepricingConfig and ChannelPartnerRepricingConfig. */
  entitlementGranularity?: GoogleCloudChannelV1RepricingConfigEntitlementGranularity;
  /** Applies the repricing configuration at the channel partner level. Only ChannelPartnerRepricingConfig supports this value. Deprecated: This is no longer supported. Use RepricingConfig.entitlement_granularity instead. */
  channelPartnerGranularity?: GoogleCloudChannelV1RepricingConfigChannelPartnerGranularity;
  /** Required. The YearMonth when these adjustments activate. The Day field needs to be "0" since we only accept YearMonth repricing boundaries. */
  effectiveInvoiceMonth?: GoogleTypeDate;
  /** Required. Information about the adjustment. */
  adjustment?: GoogleCloudChannelV1RepricingAdjustment;
  /** Required. The RebillingBasis to use for this bill. Specifies the relative cost based on repricing costs you will apply. */
  rebillingBasis?: "REBILLING_BASIS_UNSPECIFIED" | "COST_AT_LIST" | "DIRECT_CUSTOMER_COST" | (string & {});
  /** The conditional overrides to apply for this configuration. If you list multiple overrides, only the first valid override is used. If you don't list any overrides, the API uses the normal adjustment and rebilling basis. */
  conditionalOverrides?: Array<GoogleCloudChannelV1ConditionalOverride>;
}

export const GoogleCloudChannelV1RepricingConfig: Schema.Schema<GoogleCloudChannelV1RepricingConfig> = Schema.suspend(() => Schema.Struct({
  entitlementGranularity: Schema.optional(GoogleCloudChannelV1RepricingConfigEntitlementGranularity),
  channelPartnerGranularity: Schema.optional(GoogleCloudChannelV1RepricingConfigChannelPartnerGranularity),
  effectiveInvoiceMonth: Schema.optional(GoogleTypeDate),
  adjustment: Schema.optional(GoogleCloudChannelV1RepricingAdjustment),
  rebillingBasis: Schema.optional(Schema.String),
  conditionalOverrides: Schema.optional(Schema.Array(GoogleCloudChannelV1ConditionalOverride)),
})).annotate({ identifier: "GoogleCloudChannelV1RepricingConfig" }) as any as Schema.Schema<GoogleCloudChannelV1RepricingConfig>;

export interface GoogleCloudChannelV1CustomerRepricingConfig {
  /** Output only. Resource name of the CustomerRepricingConfig. Format: accounts/{account_id}/customers/{customer_id}/customerRepricingConfigs/{id}. */
  name?: string;
  /** Required. The configuration for bill modifications made by a reseller before sending it to customers. */
  repricingConfig?: GoogleCloudChannelV1RepricingConfig;
  /** Output only. Timestamp of an update to the repricing rule. If `update_time` is after RepricingConfig.effective_invoice_month then it indicates this was set mid-month. */
  updateTime?: string;
}

export const GoogleCloudChannelV1CustomerRepricingConfig: Schema.Schema<GoogleCloudChannelV1CustomerRepricingConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  repricingConfig: Schema.optional(GoogleCloudChannelV1RepricingConfig),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1CustomerRepricingConfig" }) as any as Schema.Schema<GoogleCloudChannelV1CustomerRepricingConfig>;

export interface GoogleCloudChannelV1ListCustomerRepricingConfigsResponse {
  /** The repricing configs for this channel partner. */
  customerRepricingConfigs?: Array<GoogleCloudChannelV1CustomerRepricingConfig>;
  /** A token to retrieve the next page of results. Pass to ListCustomerRepricingConfigsRequest.page_token to obtain that page. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListCustomerRepricingConfigsResponse: Schema.Schema<GoogleCloudChannelV1ListCustomerRepricingConfigsResponse> = Schema.suspend(() => Schema.Struct({
  customerRepricingConfigs: Schema.optional(Schema.Array(GoogleCloudChannelV1CustomerRepricingConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListCustomerRepricingConfigsResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListCustomerRepricingConfigsResponse>;

export interface GoogleCloudChannelV1ChannelPartnerRepricingConfig {
  /** Output only. Resource name of the ChannelPartnerRepricingConfig. Format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id}/channelPartnerRepricingConfigs/{id}. */
  name?: string;
  /** Required. The configuration for bill modifications made by a reseller before sending it to ChannelPartner. */
  repricingConfig?: GoogleCloudChannelV1RepricingConfig;
  /** Output only. Timestamp of an update to the repricing rule. If `update_time` is after RepricingConfig.effective_invoice_month then it indicates this was set mid-month. */
  updateTime?: string;
}

export const GoogleCloudChannelV1ChannelPartnerRepricingConfig: Schema.Schema<GoogleCloudChannelV1ChannelPartnerRepricingConfig> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  repricingConfig: Schema.optional(GoogleCloudChannelV1RepricingConfig),
  updateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ChannelPartnerRepricingConfig" }) as any as Schema.Schema<GoogleCloudChannelV1ChannelPartnerRepricingConfig>;

export interface GoogleCloudChannelV1ListChannelPartnerRepricingConfigsResponse {
  /** The repricing configs for this channel partner. */
  channelPartnerRepricingConfigs?: Array<GoogleCloudChannelV1ChannelPartnerRepricingConfig>;
  /** A token to retrieve the next page of results. Pass to ListChannelPartnerRepricingConfigsRequest.page_token to obtain that page. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListChannelPartnerRepricingConfigsResponse: Schema.Schema<GoogleCloudChannelV1ListChannelPartnerRepricingConfigsResponse> = Schema.suspend(() => Schema.Struct({
  channelPartnerRepricingConfigs: Schema.optional(Schema.Array(GoogleCloudChannelV1ChannelPartnerRepricingConfig)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListChannelPartnerRepricingConfigsResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListChannelPartnerRepricingConfigsResponse>;

export interface GoogleCloudChannelV1SkuGroup {
  /** Resource name of SKU group. Format: accounts/{account}/skuGroups/{sku_group}. Example: "accounts/C01234/skuGroups/3d50fd57-3157-4577-a5a9-a219b8490041". */
  name?: string;
  /** Unique human readable identifier for the SKU group. */
  displayName?: string;
}

export const GoogleCloudChannelV1SkuGroup: Schema.Schema<GoogleCloudChannelV1SkuGroup> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1SkuGroup" }) as any as Schema.Schema<GoogleCloudChannelV1SkuGroup>;

export interface GoogleCloudChannelV1ListSkuGroupsResponse {
  /** The list of SKU groups requested. */
  skuGroups?: Array<GoogleCloudChannelV1SkuGroup>;
  /** A token to retrieve the next page of results. Pass to ListSkuGroupsRequest.page_token to obtain that page. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListSkuGroupsResponse: Schema.Schema<GoogleCloudChannelV1ListSkuGroupsResponse> = Schema.suspend(() => Schema.Struct({
  skuGroups: Schema.optional(Schema.Array(GoogleCloudChannelV1SkuGroup)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListSkuGroupsResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListSkuGroupsResponse>;

export interface GoogleCloudChannelV1BillableSku {
  /** Resource name of Billable SKU. Format: billableSkus/{sku}. Example: billableSkus/6E1B-6634-470F". */
  sku?: string;
  /** Unique human readable name for the SKU. */
  skuDisplayName?: string;
  /** Resource name of Service which contains Repricing SKU. Format: services/{service}. Example: "services/B7D9-FDCB-15D8". */
  service?: string;
  /** Unique human readable name for the Service. */
  serviceDisplayName?: string;
}

export const GoogleCloudChannelV1BillableSku: Schema.Schema<GoogleCloudChannelV1BillableSku> = Schema.suspend(() => Schema.Struct({
  sku: Schema.optional(Schema.String),
  skuDisplayName: Schema.optional(Schema.String),
  service: Schema.optional(Schema.String),
  serviceDisplayName: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1BillableSku" }) as any as Schema.Schema<GoogleCloudChannelV1BillableSku>;

export interface GoogleCloudChannelV1ListSkuGroupBillableSkusResponse {
  /** The list of billable SKUs in the requested SKU group. */
  billableSkus?: Array<GoogleCloudChannelV1BillableSku>;
  /** A token to retrieve the next page of results. Pass to ListSkuGroupBillableSkusRequest.page_token to obtain that page. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListSkuGroupBillableSkusResponse: Schema.Schema<GoogleCloudChannelV1ListSkuGroupBillableSkusResponse> = Schema.suspend(() => Schema.Struct({
  billableSkus: Schema.optional(Schema.Array(GoogleCloudChannelV1BillableSku)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListSkuGroupBillableSkusResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListSkuGroupBillableSkusResponse>;

export interface GoogleCloudChannelV1ListProductsResponse {
  /** List of Products requested. */
  products?: Array<GoogleCloudChannelV1Product>;
  /** A token to retrieve the next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListProductsResponse: Schema.Schema<GoogleCloudChannelV1ListProductsResponse> = Schema.suspend(() => Schema.Struct({
  products: Schema.optional(Schema.Array(GoogleCloudChannelV1Product)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListProductsResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListProductsResponse>;

export interface GoogleCloudChannelV1ListSkusResponse {
  /** The list of SKUs requested. */
  skus?: Array<GoogleCloudChannelV1Sku>;
  /** A token to retrieve the next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListSkusResponse: Schema.Schema<GoogleCloudChannelV1ListSkusResponse> = Schema.suspend(() => Schema.Struct({
  skus: Schema.optional(Schema.Array(GoogleCloudChannelV1Sku)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListSkusResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListSkusResponse>;

export interface GoogleCloudChannelV1ListOffersResponse {
  /** The list of Offers requested. The pricing information for each Offer only includes the base price. Effective prices and discounts aren't populated. */
  offers?: Array<GoogleCloudChannelV1Offer>;
  /** A token to retrieve the next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListOffersResponse: Schema.Schema<GoogleCloudChannelV1ListOffersResponse> = Schema.suspend(() => Schema.Struct({
  offers: Schema.optional(Schema.Array(GoogleCloudChannelV1Offer)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListOffersResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListOffersResponse>;

export interface GoogleCloudChannelV1PurchasableSku {
  /** SKU */
  sku?: GoogleCloudChannelV1Sku;
}

export const GoogleCloudChannelV1PurchasableSku: Schema.Schema<GoogleCloudChannelV1PurchasableSku> = Schema.suspend(() => Schema.Struct({
  sku: Schema.optional(GoogleCloudChannelV1Sku),
})).annotate({ identifier: "GoogleCloudChannelV1PurchasableSku" }) as any as Schema.Schema<GoogleCloudChannelV1PurchasableSku>;

export interface GoogleCloudChannelV1ListPurchasableSkusResponse {
  /** The list of SKUs requested. */
  purchasableSkus?: Array<GoogleCloudChannelV1PurchasableSku>;
  /** A token to retrieve the next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListPurchasableSkusResponse: Schema.Schema<GoogleCloudChannelV1ListPurchasableSkusResponse> = Schema.suspend(() => Schema.Struct({
  purchasableSkus: Schema.optional(Schema.Array(GoogleCloudChannelV1PurchasableSku)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListPurchasableSkusResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListPurchasableSkusResponse>;

export interface GoogleCloudChannelV1PurchasableOffer {
  /** Offer. */
  offer?: GoogleCloudChannelV1Offer;
  /** Optional. Price reference ID for the offer. Only for offers that require additional price information. Used to guarantee that the pricing is consistent between quoting the offer and placing the order. */
  priceReferenceId?: string;
}

export const GoogleCloudChannelV1PurchasableOffer: Schema.Schema<GoogleCloudChannelV1PurchasableOffer> = Schema.suspend(() => Schema.Struct({
  offer: Schema.optional(GoogleCloudChannelV1Offer),
  priceReferenceId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1PurchasableOffer" }) as any as Schema.Schema<GoogleCloudChannelV1PurchasableOffer>;

export interface GoogleCloudChannelV1ListPurchasableOffersResponse {
  /** The list of Offers requested. */
  purchasableOffers?: Array<GoogleCloudChannelV1PurchasableOffer>;
  /** A token to retrieve the next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListPurchasableOffersResponse: Schema.Schema<GoogleCloudChannelV1ListPurchasableOffersResponse> = Schema.suspend(() => Schema.Struct({
  purchasableOffers: Schema.optional(Schema.Array(GoogleCloudChannelV1PurchasableOffer)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListPurchasableOffersResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListPurchasableOffersResponse>;

export interface GoogleCloudChannelV1BillingAccount {
  /** Output only. Resource name of the billing account. Format: accounts/{account_id}/billingAccounts/{billing_account_id}. */
  name?: string;
  /** Display name of the billing account. */
  displayName?: string;
  /** Output only. The time when this billing account was created. */
  createTime?: string;
  /** Output only. The 3-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** Output only. The CLDR region code. */
  regionCode?: string;
}

export const GoogleCloudChannelV1BillingAccount: Schema.Schema<GoogleCloudChannelV1BillingAccount> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  currencyCode: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1BillingAccount" }) as any as Schema.Schema<GoogleCloudChannelV1BillingAccount>;

export interface GoogleCloudChannelV1BillingAccountPurchaseInfo {
  /** The billing account resource. */
  billingAccount?: GoogleCloudChannelV1BillingAccount;
}

export const GoogleCloudChannelV1BillingAccountPurchaseInfo: Schema.Schema<GoogleCloudChannelV1BillingAccountPurchaseInfo> = Schema.suspend(() => Schema.Struct({
  billingAccount: Schema.optional(GoogleCloudChannelV1BillingAccount),
})).annotate({ identifier: "GoogleCloudChannelV1BillingAccountPurchaseInfo" }) as any as Schema.Schema<GoogleCloudChannelV1BillingAccountPurchaseInfo>;

export interface GoogleCloudChannelV1SkuPurchaseGroup {
  /** Resource names of the SKUs included in this group. Format: products/{product_id}/skus/{sku_id}. */
  skus?: Array<string>;
  /** List of billing accounts that are eligible to purhcase these SKUs. */
  billingAccountPurchaseInfos?: Array<GoogleCloudChannelV1BillingAccountPurchaseInfo>;
}

export const GoogleCloudChannelV1SkuPurchaseGroup: Schema.Schema<GoogleCloudChannelV1SkuPurchaseGroup> = Schema.suspend(() => Schema.Struct({
  skus: Schema.optional(Schema.Array(Schema.String)),
  billingAccountPurchaseInfos: Schema.optional(Schema.Array(GoogleCloudChannelV1BillingAccountPurchaseInfo)),
})).annotate({ identifier: "GoogleCloudChannelV1SkuPurchaseGroup" }) as any as Schema.Schema<GoogleCloudChannelV1SkuPurchaseGroup>;

export interface GoogleCloudChannelV1QueryEligibleBillingAccountsResponse {
  /** List of SKU purchase groups where each group represents a set of SKUs that must be purchased using the same billing account. Each SKU from [QueryEligibleBillingAccountsRequest.skus] will appear in exactly one SKU group. */
  skuPurchaseGroups?: Array<GoogleCloudChannelV1SkuPurchaseGroup>;
}

export const GoogleCloudChannelV1QueryEligibleBillingAccountsResponse: Schema.Schema<GoogleCloudChannelV1QueryEligibleBillingAccountsResponse> = Schema.suspend(() => Schema.Struct({
  skuPurchaseGroups: Schema.optional(Schema.Array(GoogleCloudChannelV1SkuPurchaseGroup)),
})).annotate({ identifier: "GoogleCloudChannelV1QueryEligibleBillingAccountsResponse" }) as any as Schema.Schema<GoogleCloudChannelV1QueryEligibleBillingAccountsResponse>;

export interface GoogleCloudChannelV1RegisterSubscriberRequest {
  /** Optional. Resource name of the account. Required if integrator is not provided. Otherwise, leave this field empty/unset. */
  account?: string;
  /** Required. Service account that provides subscriber access to the registered topic. */
  serviceAccount?: string;
  /** Optional. Resource name of the integrator. Required if account is not provided. Otherwise, leave this field empty/unset. */
  integrator?: string;
}

export const GoogleCloudChannelV1RegisterSubscriberRequest: Schema.Schema<GoogleCloudChannelV1RegisterSubscriberRequest> = Schema.suspend(() => Schema.Struct({
  account: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  integrator: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1RegisterSubscriberRequest" }) as any as Schema.Schema<GoogleCloudChannelV1RegisterSubscriberRequest>;

export interface GoogleCloudChannelV1RegisterSubscriberResponse {
  /** Name of the topic the subscriber will listen to. */
  topic?: string;
}

export const GoogleCloudChannelV1RegisterSubscriberResponse: Schema.Schema<GoogleCloudChannelV1RegisterSubscriberResponse> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1RegisterSubscriberResponse" }) as any as Schema.Schema<GoogleCloudChannelV1RegisterSubscriberResponse>;

export interface GoogleCloudChannelV1UnregisterSubscriberRequest {
  /** Optional. Resource name of the account. Required if integrator is not provided. Otherwise, leave this field empty/unset. */
  account?: string;
  /** Required. Service account to unregister from subscriber access to the topic. */
  serviceAccount?: string;
  /** Optional. Resource name of the integrator. Required if account is not provided. Otherwise, leave this field empty/unset. */
  integrator?: string;
}

export const GoogleCloudChannelV1UnregisterSubscriberRequest: Schema.Schema<GoogleCloudChannelV1UnregisterSubscriberRequest> = Schema.suspend(() => Schema.Struct({
  account: Schema.optional(Schema.String),
  serviceAccount: Schema.optional(Schema.String),
  integrator: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1UnregisterSubscriberRequest" }) as any as Schema.Schema<GoogleCloudChannelV1UnregisterSubscriberRequest>;

export interface GoogleCloudChannelV1UnregisterSubscriberResponse {
  /** Name of the topic the service account subscriber access was removed from. */
  topic?: string;
}

export const GoogleCloudChannelV1UnregisterSubscriberResponse: Schema.Schema<GoogleCloudChannelV1UnregisterSubscriberResponse> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1UnregisterSubscriberResponse" }) as any as Schema.Schema<GoogleCloudChannelV1UnregisterSubscriberResponse>;

export interface GoogleCloudChannelV1ListSubscribersResponse {
  /** Name of the topic registered with the reseller. */
  topic?: string;
  /** List of service accounts which have subscriber access to the topic. */
  serviceAccounts?: Array<string>;
  /** A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListSubscribersResponse: Schema.Schema<GoogleCloudChannelV1ListSubscribersResponse> = Schema.suspend(() => Schema.Struct({
  topic: Schema.optional(Schema.String),
  serviceAccounts: Schema.optional(Schema.Array(Schema.String)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListSubscribersResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListSubscribersResponse>;

export interface GoogleCloudChannelV1EntitlementChange {
  /** Suspension reason for the Entitlement. */
  suspensionReason?: "SUSPENSION_REASON_UNSPECIFIED" | "RESELLER_INITIATED" | "TRIAL_ENDED" | "RENEWAL_WITH_TYPE_CANCEL" | "PENDING_TOS_ACCEPTANCE" | "OTHER" | (string & {});
  /** Cancellation reason for the Entitlement. */
  cancellationReason?: "CANCELLATION_REASON_UNSPECIFIED" | "SERVICE_TERMINATED" | "RELATIONSHIP_ENDED" | "PARTIAL_TRANSFER" | (string & {});
  /** The Entitlement's activation reason */
  activationReason?: "ACTIVATION_REASON_UNSPECIFIED" | "RESELLER_REVOKED_SUSPENSION" | "CUSTOMER_ACCEPTED_PENDING_TOS" | "RENEWAL_SETTINGS_CHANGED" | "OTHER_ACTIVATION_REASON" | (string & {});
  /** e.g. purchase_number change reason, entered by CRS. */
  otherChangeReason?: string;
  /** Required. Resource name of an entitlement in the form: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} */
  entitlement?: string;
  /** Required. Resource name of the Offer at the time of change. Takes the form: accounts/{account_id}/offers/{offer_id}. */
  offer?: string;
  /** Service provisioned for an Entitlement. */
  provisionedService?: GoogleCloudChannelV1ProvisionedService;
  /** The change action type. */
  changeType?: "CHANGE_TYPE_UNSPECIFIED" | "CREATED" | "PRICE_PLAN_SWITCHED" | "COMMITMENT_CHANGED" | "RENEWED" | "SUSPENDED" | "ACTIVATED" | "CANCELLED" | "SKU_CHANGED" | "RENEWAL_SETTING_CHANGED" | "PAID_SUBSCRIPTION_STARTED" | "LICENSE_CAP_CHANGED" | "SUSPENSION_DETAILS_CHANGED" | "TRIAL_END_DATE_EXTENDED" | "TRIAL_STARTED" | (string & {});
  /** The submitted time of the change. */
  createTime?: string;
  /** Operator type responsible for the change. */
  operatorType?: "OPERATOR_TYPE_UNSPECIFIED" | "CUSTOMER_SERVICE_REPRESENTATIVE" | "SYSTEM" | "CUSTOMER" | "RESELLER" | (string & {});
  /** Extended parameters, such as: purchase_order_number, gcp_details; internal_correlation_id, long_running_operation_id, order_id; etc. */
  parameters?: Array<GoogleCloudChannelV1Parameter>;
  /** Human-readable identifier that shows what operator made a change. When the operator_type is RESELLER, this is the user's email address. For all other operator types, this is empty. */
  operator?: string;
}

export const GoogleCloudChannelV1EntitlementChange: Schema.Schema<GoogleCloudChannelV1EntitlementChange> = Schema.suspend(() => Schema.Struct({
  suspensionReason: Schema.optional(Schema.String),
  cancellationReason: Schema.optional(Schema.String),
  activationReason: Schema.optional(Schema.String),
  otherChangeReason: Schema.optional(Schema.String),
  entitlement: Schema.optional(Schema.String),
  offer: Schema.optional(Schema.String),
  provisionedService: Schema.optional(GoogleCloudChannelV1ProvisionedService),
  changeType: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  operatorType: Schema.optional(Schema.String),
  parameters: Schema.optional(Schema.Array(GoogleCloudChannelV1Parameter)),
  operator: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1EntitlementChange" }) as any as Schema.Schema<GoogleCloudChannelV1EntitlementChange>;

export interface GoogleCloudChannelV1ListEntitlementChangesResponse {
  /** The list of entitlement changes. */
  entitlementChanges?: Array<GoogleCloudChannelV1EntitlementChange>;
  /** A token to list the next page of results. */
  nextPageToken?: string;
}

export const GoogleCloudChannelV1ListEntitlementChangesResponse: Schema.Schema<GoogleCloudChannelV1ListEntitlementChangesResponse> = Schema.suspend(() => Schema.Struct({
  entitlementChanges: Schema.optional(Schema.Array(GoogleCloudChannelV1EntitlementChange)),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ListEntitlementChangesResponse" }) as any as Schema.Schema<GoogleCloudChannelV1ListEntitlementChangesResponse>;

export interface GoogleCloudChannelV1alpha1CustomerEvent {
  /** Resource name of the customer. Format: accounts/{account_id}/customers/{customer_id} */
  customer?: string;
  /** Type of event which happened for the customer. */
  eventType?: "TYPE_UNSPECIFIED" | "PRIMARY_DOMAIN_CHANGED" | "PRIMARY_DOMAIN_VERIFIED" | (string & {});
}

export const GoogleCloudChannelV1alpha1CustomerEvent: Schema.Schema<GoogleCloudChannelV1alpha1CustomerEvent> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1CustomerEvent" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1CustomerEvent>;

export interface GoogleCloudChannelV1CustomerEvent {
  /** Resource name of the customer. Format: accounts/{account_id}/customers/{customer_id} */
  customer?: string;
  /** Type of event which happened for the customer. */
  eventType?: "TYPE_UNSPECIFIED" | "PRIMARY_DOMAIN_CHANGED" | "PRIMARY_DOMAIN_VERIFIED" | (string & {});
}

export const GoogleCloudChannelV1CustomerEvent: Schema.Schema<GoogleCloudChannelV1CustomerEvent> = Schema.suspend(() => Schema.Struct({
  customer: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1CustomerEvent" }) as any as Schema.Schema<GoogleCloudChannelV1CustomerEvent>;

export interface GoogleCloudChannelV1alpha1EntitlementEvent {
  /** Resource name of an entitlement of the form: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} */
  entitlement?: string;
  /** Type of event which happened for the entitlement. */
  eventType?: "TYPE_UNSPECIFIED" | "CREATED" | "PRICE_PLAN_SWITCHED" | "COMMITMENT_CHANGED" | "RENEWED" | "SUSPENDED" | "ACTIVATED" | "CANCELLED" | "SKU_CHANGED" | "RENEWAL_SETTING_CHANGED" | "PAID_SERVICE_STARTED" | "LICENSE_ASSIGNMENT_CHANGED" | "LICENSE_CAP_CHANGED" | (string & {});
}

export const GoogleCloudChannelV1alpha1EntitlementEvent: Schema.Schema<GoogleCloudChannelV1alpha1EntitlementEvent> = Schema.suspend(() => Schema.Struct({
  entitlement: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1EntitlementEvent" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1EntitlementEvent>;

export interface GoogleCloudChannelV1EntitlementEvent {
  /** Resource name of an entitlement of the form: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} */
  entitlement?: string;
  /** Type of event which happened for the entitlement. */
  eventType?: "TYPE_UNSPECIFIED" | "CREATED" | "PRICE_PLAN_SWITCHED" | "COMMITMENT_CHANGED" | "RENEWED" | "SUSPENDED" | "ACTIVATED" | "CANCELLED" | "SKU_CHANGED" | "RENEWAL_SETTING_CHANGED" | "PAID_SERVICE_STARTED" | "LICENSE_ASSIGNMENT_CHANGED" | "LICENSE_CAP_CHANGED" | (string & {});
}

export const GoogleCloudChannelV1EntitlementEvent: Schema.Schema<GoogleCloudChannelV1EntitlementEvent> = Schema.suspend(() => Schema.Struct({
  entitlement: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1EntitlementEvent" }) as any as Schema.Schema<GoogleCloudChannelV1EntitlementEvent>;

export interface GoogleCloudChannelV1alpha1OperationMetadata {
  /** The RPC that initiated this Long Running Operation. */
  operationType?: "OPERATION_TYPE_UNSPECIFIED" | "CREATE_ENTITLEMENT" | "CHANGE_QUANTITY" | "CHANGE_RENEWAL_SETTINGS" | "CHANGE_PLAN" | "START_PAID_SERVICE" | "CHANGE_SKU" | "ACTIVATE_ENTITLEMENT" | "SUSPEND_ENTITLEMENT" | "CANCEL_ENTITLEMENT" | "TRANSFER_ENTITLEMENTS" | "TRANSFER_ENTITLEMENTS_TO_GOOGLE" | "CHANGE_OFFER" | "CHANGE_PARAMETERS" | "PROVISION_CLOUD_IDENTITY" | (string & {});
}

export const GoogleCloudChannelV1alpha1OperationMetadata: Schema.Schema<GoogleCloudChannelV1alpha1OperationMetadata> = Schema.suspend(() => Schema.Struct({
  operationType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1OperationMetadata" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1OperationMetadata>;

export interface GoogleCloudChannelV1OperationMetadata {
  /** The RPC that initiated this Long Running Operation. */
  operationType?: "OPERATION_TYPE_UNSPECIFIED" | "CREATE_ENTITLEMENT" | "CHANGE_RENEWAL_SETTINGS" | "START_PAID_SERVICE" | "ACTIVATE_ENTITLEMENT" | "SUSPEND_ENTITLEMENT" | "CANCEL_ENTITLEMENT" | "TRANSFER_ENTITLEMENTS" | "TRANSFER_ENTITLEMENTS_TO_GOOGLE" | "CHANGE_OFFER" | "CHANGE_PARAMETERS" | "PROVISION_CLOUD_IDENTITY" | (string & {});
}

export const GoogleCloudChannelV1OperationMetadata: Schema.Schema<GoogleCloudChannelV1OperationMetadata> = Schema.suspend(() => Schema.Struct({
  operationType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1OperationMetadata" }) as any as Schema.Schema<GoogleCloudChannelV1OperationMetadata>;

export interface GoogleCloudChannelV1alpha1ChannelPartnerEvent {
  /** Resource name for the Channel Partner Link. Channel_partner uses the format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id} */
  channelPartner?: string;
  /** Type of event which happened for the channel partner. */
  eventType?: "TYPE_UNSPECIFIED" | "LINK_STATE_CHANGED" | "PARTNER_ADVANTAGE_INFO_CHANGED" | (string & {});
}

export const GoogleCloudChannelV1alpha1ChannelPartnerEvent: Schema.Schema<GoogleCloudChannelV1alpha1ChannelPartnerEvent> = Schema.suspend(() => Schema.Struct({
  channelPartner: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1ChannelPartnerEvent" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1ChannelPartnerEvent>;

export interface GoogleCloudChannelV1alpha1OpportunityEvent {
  /** Resource name of the opportunity. Format: opportunities/{opportunity} */
  opportunity?: string;
  /** Type of event which happened for the opportunity. */
  eventType?: "TYPE_UNSPECIFIED" | "CREATED" | "UPDATED" | "PARTNER_DETACHED" | (string & {});
  /** Resource name of the partner. Format: partners/{partner} */
  partner?: string;
}

export const GoogleCloudChannelV1alpha1OpportunityEvent: Schema.Schema<GoogleCloudChannelV1alpha1OpportunityEvent> = Schema.suspend(() => Schema.Struct({
  opportunity: Schema.optional(Schema.String),
  eventType: Schema.optional(Schema.String),
  partner: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1OpportunityEvent" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1OpportunityEvent>;

export interface GoogleCloudChannelV1alpha1SubscriberEvent {
  /** Customer event sent as part of Pub/Sub event to partners. */
  customerEvent?: GoogleCloudChannelV1alpha1CustomerEvent;
  /** Entitlement event sent as part of Pub/Sub event to partners. */
  entitlementEvent?: GoogleCloudChannelV1alpha1EntitlementEvent;
  /** Channel Partner event sent as part of Pub/Sub event to partners. */
  channelPartnerEvent?: GoogleCloudChannelV1alpha1ChannelPartnerEvent;
  /** Opportunity event sent as part of Pub/Sub event to partners/integrators. */
  opportunityEvent?: GoogleCloudChannelV1alpha1OpportunityEvent;
}

export const GoogleCloudChannelV1alpha1SubscriberEvent: Schema.Schema<GoogleCloudChannelV1alpha1SubscriberEvent> = Schema.suspend(() => Schema.Struct({
  customerEvent: Schema.optional(GoogleCloudChannelV1alpha1CustomerEvent),
  entitlementEvent: Schema.optional(GoogleCloudChannelV1alpha1EntitlementEvent),
  channelPartnerEvent: Schema.optional(GoogleCloudChannelV1alpha1ChannelPartnerEvent),
  opportunityEvent: Schema.optional(GoogleCloudChannelV1alpha1OpportunityEvent),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1SubscriberEvent" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1SubscriberEvent>;

export interface GoogleCloudChannelV1SubscriberEvent {
  /** Customer event sent as part of Pub/Sub event to partners. */
  customerEvent?: GoogleCloudChannelV1CustomerEvent;
  /** Entitlement event sent as part of Pub/Sub event to partners. */
  entitlementEvent?: GoogleCloudChannelV1EntitlementEvent;
}

export const GoogleCloudChannelV1SubscriberEvent: Schema.Schema<GoogleCloudChannelV1SubscriberEvent> = Schema.suspend(() => Schema.Struct({
  customerEvent: Schema.optional(GoogleCloudChannelV1CustomerEvent),
  entitlementEvent: Schema.optional(GoogleCloudChannelV1EntitlementEvent),
})).annotate({ identifier: "GoogleCloudChannelV1SubscriberEvent" }) as any as Schema.Schema<GoogleCloudChannelV1SubscriberEvent>;

export interface GoogleCloudChannelV1alpha1Period {
  /** Total duration of Period Type defined. */
  duration?: number;
  /** Period Type. */
  periodType?: "PERIOD_TYPE_UNSPECIFIED" | "DAY" | "MONTH" | "YEAR" | (string & {});
}

export const GoogleCloudChannelV1alpha1Period: Schema.Schema<GoogleCloudChannelV1alpha1Period> = Schema.suspend(() => Schema.Struct({
  duration: Schema.optional(Schema.Number),
  periodType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1Period" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1Period>;

export interface GoogleCloudChannelV1alpha1RenewalSettings {
  /** If false, the plan will be completed at the end date. */
  enableRenewal?: boolean;
  /** If true and enable_renewal = true, the unit (for example seats or licenses) will be set to the number of active units at renewal time. */
  resizeUnitCount?: boolean;
  /** If true, disables commitment-based offer on renewal and switches to flexible or pay as you go. Deprecated: Use `payment_plan` instead. */
  disableCommitment?: boolean;
  /** Set if enable_renewal=true. Deprecated: Use `payment_cycle` instead. */
  paymentOption?: "PAYMENT_OPTION_UNSPECIFIED" | "ANNUAL" | "MONTHLY" | (string & {});
  /** Describes how a reseller will be billed. */
  paymentPlan?: "PAYMENT_PLAN_UNSPECIFIED" | "COMMITMENT" | "FLEXIBLE" | "FREE" | "TRIAL" | "OFFLINE" | (string & {});
  /** Describes how frequently the reseller will be billed, such as once per month. */
  paymentCycle?: GoogleCloudChannelV1alpha1Period;
  /** Output only. The offer resource name that the entitlement will renew on at the end date. Takes the form: accounts/{account_id}/offers/{offer_id}. */
  scheduledRenewalOffer?: string;
}

export const GoogleCloudChannelV1alpha1RenewalSettings: Schema.Schema<GoogleCloudChannelV1alpha1RenewalSettings> = Schema.suspend(() => Schema.Struct({
  enableRenewal: Schema.optional(Schema.Boolean),
  resizeUnitCount: Schema.optional(Schema.Boolean),
  disableCommitment: Schema.optional(Schema.Boolean),
  paymentOption: Schema.optional(Schema.String),
  paymentPlan: Schema.optional(Schema.String),
  paymentCycle: Schema.optional(GoogleCloudChannelV1alpha1Period),
  scheduledRenewalOffer: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1RenewalSettings" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1RenewalSettings>;

export interface GoogleCloudChannelV1alpha1CommitmentSettings {
  /** Output only. Commitment start timestamp. */
  startTime?: string;
  /** Output only. Commitment end timestamp. */
  endTime?: string;
  /** Optional. Renewal settings applicable for a commitment-based Offer. */
  renewalSettings?: GoogleCloudChannelV1alpha1RenewalSettings;
}

export const GoogleCloudChannelV1alpha1CommitmentSettings: Schema.Schema<GoogleCloudChannelV1alpha1CommitmentSettings> = Schema.suspend(() => Schema.Struct({
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  renewalSettings: Schema.optional(GoogleCloudChannelV1alpha1RenewalSettings),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1CommitmentSettings" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1CommitmentSettings>;

export interface GoogleCloudChannelV1alpha1ProvisionedService {
  /** Output only. Provisioning ID of the entitlement. For Google Workspace, this is the underlying Subscription ID. For Google Cloud, this is the Billing Account ID of the billing subaccount. */
  provisioningId?: string;
  /** Output only. The product pertaining to the provisioning resource as specified in the Offer. */
  productId?: string;
  /** Output only. The SKU pertaining to the provisioning resource as specified in the Offer. */
  skuId?: string;
}

export const GoogleCloudChannelV1alpha1ProvisionedService: Schema.Schema<GoogleCloudChannelV1alpha1ProvisionedService> = Schema.suspend(() => Schema.Struct({
  provisioningId: Schema.optional(Schema.String),
  productId: Schema.optional(Schema.String),
  skuId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1ProvisionedService" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1ProvisionedService>;

export interface GoogleCloudChannelV1alpha1TrialSettings {
  /** Determines if the entitlement is in a trial or not: * `true` - The entitlement is in trial. * `false` - The entitlement is not in trial. */
  trial?: boolean;
  /** Date when the trial ends. The value is in milliseconds using the UNIX Epoch format. See an example [Epoch converter](https://www.epochconverter.com). */
  endTime?: string;
}

export const GoogleCloudChannelV1alpha1TrialSettings: Schema.Schema<GoogleCloudChannelV1alpha1TrialSettings> = Schema.suspend(() => Schema.Struct({
  trial: Schema.optional(Schema.Boolean),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1TrialSettings" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1TrialSettings>;

export interface GoogleCloudChannelV1alpha1AssociationInfo {
  /** The name of the base entitlement, for which this entitlement is an add-on. */
  baseEntitlement?: string;
}

export const GoogleCloudChannelV1alpha1AssociationInfo: Schema.Schema<GoogleCloudChannelV1alpha1AssociationInfo> = Schema.suspend(() => Schema.Struct({
  baseEntitlement: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1AssociationInfo" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1AssociationInfo>;

export interface GoogleCloudChannelV1alpha1Value {
  /** Represents an int64 value. */
  int64Value?: string;
  /** Represents a string value. */
  stringValue?: string;
  /** Represents a double value. */
  doubleValue?: number;
  /** Represents an 'Any' proto value. */
  protoValue?: Record<string, unknown>;
  /** Represents a boolean value. */
  boolValue?: boolean;
}

export const GoogleCloudChannelV1alpha1Value: Schema.Schema<GoogleCloudChannelV1alpha1Value> = Schema.suspend(() => Schema.Struct({
  int64Value: Schema.optional(Schema.String),
  stringValue: Schema.optional(Schema.String),
  doubleValue: Schema.optional(Schema.Number),
  protoValue: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  boolValue: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1Value" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1Value>;

export interface GoogleCloudChannelV1alpha1Parameter {
  /** Name of the parameter. */
  name?: string;
  /** Value of the parameter. */
  value?: GoogleCloudChannelV1alpha1Value;
  /** Output only. Specifies whether this parameter is allowed to be changed. For example, for a Google Workspace Business Starter entitlement in commitment plan, num_units is editable when entitlement is active. */
  editable?: boolean;
}

export const GoogleCloudChannelV1alpha1Parameter: Schema.Schema<GoogleCloudChannelV1alpha1Parameter> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  value: Schema.optional(GoogleCloudChannelV1alpha1Value),
  editable: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1Parameter" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1Parameter>;

export interface GoogleCloudChannelV1alpha1Entitlement {
  /** Output only. Resource name of an entitlement in the form: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id}. */
  name?: string;
  /** Output only. The time at which the entitlement is created. */
  createTime?: string;
  /** Output only. The time at which the entitlement is updated. */
  updateTime?: string;
  /** Cloud Identity ID of a channel partner who will be the direct reseller for the customer's order. This field is generally used in 2-tier ordering, where the order is placed by a top-level distributor on behalf of their channel partner or reseller. Required for distributors. Deprecated: `channel_partner_id` has been moved to the Customer. */
  channelPartnerId?: string;
  /** Required. The offer resource name for which the entitlement is to be created. Takes the form: accounts/{account_id}/offers/{offer_id}. */
  offer?: string;
  /** Number of units for a commitment-based Offer. For example, for seat-based Offers, this would be the number of seats; for license-based Offers, this would be the number of licenses. Required for creating commitment-based Offers. Deprecated: Use `parameters` instead. */
  numUnits?: number;
  /** Maximum number of units for a non commitment-based Offer, such as Flexible, Trial or Free entitlements. For commitment-based entitlements, this is a read-only field, which only the internal support team can update. Deprecated: Use `parameters` instead. */
  maxUnits?: number;
  /** The current number of users that are assigned a license for the product defined in provisioned_service.skuId. Read-only. Deprecated: Use `parameters` instead. */
  assignedUnits?: number;
  /** Commitment settings for a commitment-based Offer. Required for commitment based offers. */
  commitmentSettings?: GoogleCloudChannelV1alpha1CommitmentSettings;
  /** Output only. Current provisioning state of the entitlement. */
  provisioningState?: "PROVISIONING_STATE_UNSPECIFIED" | "ACTIVE" | "CANCELED" | "COMPLETE" | "PENDING" | "SUSPENDED" | (string & {});
  /** Output only. Service provisioning details for the entitlement. */
  provisionedService?: GoogleCloudChannelV1alpha1ProvisionedService;
  /** Output only. Enumerable of all current suspension reasons for an entitlement. */
  suspensionReasons?: Array<"SUSPENSION_REASON_UNSPECIFIED" | "RESELLER_INITIATED" | "TRIAL_ENDED" | "RENEWAL_WITH_TYPE_CANCEL" | "PENDING_TOS_ACCEPTANCE" | "OTHER" | (string & {})>;
  /** Optional. This purchase order (PO) information is for resellers to use for their company tracking usage. If a purchaseOrderId value is given, it appears in the API responses and shows up in the invoice. The property accepts up to 80 plain text characters. This is only supported for Google Workspace entitlements. */
  purchaseOrderId?: string;
  /** Output only. Settings for trial offers. */
  trialSettings?: GoogleCloudChannelV1alpha1TrialSettings;
  /** Association information to other entitlements. */
  associationInfo?: GoogleCloudChannelV1alpha1AssociationInfo;
  /** Extended entitlement parameters. When creating an entitlement, valid parameter names and values are defined in the Offer.parameter_definitions. For Google Workspace, the following Parameters may be accepted as input: - max_units: The maximum assignable units for a flexible offer OR - num_units: The total commitment for commitment-based offers The response may additionally include the following output-only Parameters: - assigned_units: The number of licenses assigned to users. For Google Cloud billing subaccounts, the following Parameter may be accepted as input: - display_name: The display name of the billing subaccount. */
  parameters?: Array<GoogleCloudChannelV1alpha1Parameter>;
  /** Optional. The billing account resource name that is used to pay for this entitlement. */
  billingAccount?: string;
  /** Optional. Price reference ID for the offer. Only for offers that require additional price information. Used to guarantee that the pricing is consistent between quoting the offer and placing the order. */
  priceReferenceId?: string;
}

export const GoogleCloudChannelV1alpha1Entitlement: Schema.Schema<GoogleCloudChannelV1alpha1Entitlement> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  updateTime: Schema.optional(Schema.String),
  channelPartnerId: Schema.optional(Schema.String),
  offer: Schema.optional(Schema.String),
  numUnits: Schema.optional(Schema.Number),
  maxUnits: Schema.optional(Schema.Number),
  assignedUnits: Schema.optional(Schema.Number),
  commitmentSettings: Schema.optional(GoogleCloudChannelV1alpha1CommitmentSettings),
  provisioningState: Schema.optional(Schema.String),
  provisionedService: Schema.optional(GoogleCloudChannelV1alpha1ProvisionedService),
  suspensionReasons: Schema.optional(Schema.Array(Schema.String)),
  purchaseOrderId: Schema.optional(Schema.String),
  trialSettings: Schema.optional(GoogleCloudChannelV1alpha1TrialSettings),
  associationInfo: Schema.optional(GoogleCloudChannelV1alpha1AssociationInfo),
  parameters: Schema.optional(Schema.Array(GoogleCloudChannelV1alpha1Parameter)),
  billingAccount: Schema.optional(Schema.String),
  priceReferenceId: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1Entitlement" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1Entitlement>;

export interface GoogleCloudChannelV1alpha1TransferEntitlementsResponse {
  /** The transferred entitlements. */
  entitlements?: Array<GoogleCloudChannelV1alpha1Entitlement>;
}

export const GoogleCloudChannelV1alpha1TransferEntitlementsResponse: Schema.Schema<GoogleCloudChannelV1alpha1TransferEntitlementsResponse> = Schema.suspend(() => Schema.Struct({
  entitlements: Schema.optional(Schema.Array(GoogleCloudChannelV1alpha1Entitlement)),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1TransferEntitlementsResponse" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1TransferEntitlementsResponse>;

export interface GoogleCloudChannelV1TransferEntitlementsResponse {
  /** The transferred entitlements. */
  entitlements?: Array<GoogleCloudChannelV1Entitlement>;
}

export const GoogleCloudChannelV1TransferEntitlementsResponse: Schema.Schema<GoogleCloudChannelV1TransferEntitlementsResponse> = Schema.suspend(() => Schema.Struct({
  entitlements: Schema.optional(Schema.Array(GoogleCloudChannelV1Entitlement)),
})).annotate({ identifier: "GoogleCloudChannelV1TransferEntitlementsResponse" }) as any as Schema.Schema<GoogleCloudChannelV1TransferEntitlementsResponse>;

export interface GoogleCloudChannelV1alpha1ReportStatus {
  /** The current state of the report generation process. */
  state?: "STATE_UNSPECIFIED" | "STARTED" | "WRITING" | "AVAILABLE" | "FAILED" | (string & {});
  /** The report generation's start time. */
  startTime?: string;
  /** The report generation's completion time. */
  endTime?: string;
}

export const GoogleCloudChannelV1alpha1ReportStatus: Schema.Schema<GoogleCloudChannelV1alpha1ReportStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1ReportStatus" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1ReportStatus>;

export interface GoogleCloudChannelV1alpha1ReportJob {
  /** Required. The resource name of a report job. Name uses the format: `accounts/{account_id}/reportJobs/{report_job_id}` */
  name?: string;
  /** The current status of report generation. */
  reportStatus?: GoogleCloudChannelV1alpha1ReportStatus;
}

export const GoogleCloudChannelV1alpha1ReportJob: Schema.Schema<GoogleCloudChannelV1alpha1ReportJob> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  reportStatus: Schema.optional(GoogleCloudChannelV1alpha1ReportStatus),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1ReportJob" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1ReportJob>;

export interface GoogleCloudChannelV1alpha1Column {
  /** The unique name of the column (for example, customer_domain, channel_partner, customer_cost). You can use column IDs in RunReportJobRequest.filter. To see all reports and their columns, call CloudChannelReportsService.ListReports. */
  columnId?: string;
  /** The column's display name. */
  displayName?: string;
  /** The type of the values for this column. */
  dataType?: "DATA_TYPE_UNSPECIFIED" | "STRING" | "INT" | "DECIMAL" | "MONEY" | "DATE" | "DATE_TIME" | (string & {});
}

export const GoogleCloudChannelV1alpha1Column: Schema.Schema<GoogleCloudChannelV1alpha1Column> = Schema.suspend(() => Schema.Struct({
  columnId: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  dataType: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1Column" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1Column>;

export interface GoogleCloudChannelV1alpha1Report {
  /** Required. The report's resource name. Specifies the account and report used to generate report data. The report_id identifier is a UID (for example, `613bf59q`). Name uses the format: accounts/{account_id}/reports/{report_id} */
  name?: string;
  /** A human-readable name for this report. */
  displayName?: string;
  /** The list of columns included in the report. This defines the schema of the report results. */
  columns?: Array<GoogleCloudChannelV1alpha1Column>;
  /** A description of other aspects of the report, such as the products it supports. */
  description?: string;
}

export const GoogleCloudChannelV1alpha1Report: Schema.Schema<GoogleCloudChannelV1alpha1Report> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  columns: Schema.optional(Schema.Array(GoogleCloudChannelV1alpha1Column)),
  description: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1Report" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1Report>;

export interface GoogleCloudChannelV1alpha1DateRange {
  /** The earliest usage date time (inclusive). If you use time groupings (daily, weekly, etc), each group uses midnight to midnight (Pacific time). The usage start date is rounded down to include all usage from the specified date. We recommend that clients pass `usage_start_date_time` in Pacific time. */
  usageStartDateTime?: GoogleTypeDateTime;
  /** The latest usage date time (exclusive). If you use time groupings (daily, weekly, etc), each group uses midnight to midnight (Pacific time). The usage end date is rounded down to include all usage from the specified date. We recommend that clients pass `usage_start_date_time` in Pacific time. */
  usageEndDateTime?: GoogleTypeDateTime;
  /** The earliest invoice date (inclusive). If this value is not the first day of a month, this will move it back to the first day of the given month. */
  invoiceStartDate?: GoogleTypeDate;
  /** The latest invoice date (inclusive). If this value is not the last day of a month, this will move it forward to the last day of the given month. */
  invoiceEndDate?: GoogleTypeDate;
}

export const GoogleCloudChannelV1alpha1DateRange: Schema.Schema<GoogleCloudChannelV1alpha1DateRange> = Schema.suspend(() => Schema.Struct({
  usageStartDateTime: Schema.optional(GoogleTypeDateTime),
  usageEndDateTime: Schema.optional(GoogleTypeDateTime),
  invoiceStartDate: Schema.optional(GoogleTypeDate),
  invoiceEndDate: Schema.optional(GoogleTypeDate),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1DateRange" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1DateRange>;

export interface GoogleCloudChannelV1alpha1ReportResultsMetadata {
  /** Details of the completed report. */
  report?: GoogleCloudChannelV1alpha1Report;
  /** The total number of rows of data in the final report. */
  rowCount?: string;
  /** The date range of reported usage. */
  dateRange?: GoogleCloudChannelV1alpha1DateRange;
  /** The usage dates immediately preceding `date_range` with the same duration. Use this to calculate trending usage and costs. This is only populated if you request trending data. For example, if `date_range` is July 1-15, `preceding_date_range` will be June 16-30. */
  precedingDateRange?: GoogleCloudChannelV1alpha1DateRange;
}

export const GoogleCloudChannelV1alpha1ReportResultsMetadata: Schema.Schema<GoogleCloudChannelV1alpha1ReportResultsMetadata> = Schema.suspend(() => Schema.Struct({
  report: Schema.optional(GoogleCloudChannelV1alpha1Report),
  rowCount: Schema.optional(Schema.String),
  dateRange: Schema.optional(GoogleCloudChannelV1alpha1DateRange),
  precedingDateRange: Schema.optional(GoogleCloudChannelV1alpha1DateRange),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1ReportResultsMetadata" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1ReportResultsMetadata>;

export interface GoogleCloudChannelV1alpha1RunReportJobResponse {
  /** Pass `report_job.name` to FetchReportResultsRequest.report_job to retrieve the report's results. */
  reportJob?: GoogleCloudChannelV1alpha1ReportJob;
  /** The metadata for the report's results (display name, columns, row count, and date range). If you view this before the operation finishes, you may see incomplete data. */
  reportMetadata?: GoogleCloudChannelV1alpha1ReportResultsMetadata;
}

export const GoogleCloudChannelV1alpha1RunReportJobResponse: Schema.Schema<GoogleCloudChannelV1alpha1RunReportJobResponse> = Schema.suspend(() => Schema.Struct({
  reportJob: Schema.optional(GoogleCloudChannelV1alpha1ReportJob),
  reportMetadata: Schema.optional(GoogleCloudChannelV1alpha1ReportResultsMetadata),
})).annotate({ identifier: "GoogleCloudChannelV1alpha1RunReportJobResponse" }) as any as Schema.Schema<GoogleCloudChannelV1alpha1RunReportJobResponse>;

export interface GoogleCloudChannelV1ReportStatus {
  /** The current state of the report generation process. */
  state?: "STATE_UNSPECIFIED" | "STARTED" | "WRITING" | "AVAILABLE" | "FAILED" | (string & {});
  /** The report generation's start time. */
  startTime?: string;
  /** The report generation's completion time. */
  endTime?: string;
}

export const GoogleCloudChannelV1ReportStatus: Schema.Schema<GoogleCloudChannelV1ReportStatus> = Schema.suspend(() => Schema.Struct({
  state: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
})).annotate({ identifier: "GoogleCloudChannelV1ReportStatus" }) as any as Schema.Schema<GoogleCloudChannelV1ReportStatus>;

export interface GoogleCloudChannelV1ReportJob {
  /** Required. The resource name of a report job. Name uses the format: `accounts/{account_id}/reportJobs/{report_job_id}` */
  name?: string;
  /** The current status of report generation. */
  reportStatus?: GoogleCloudChannelV1ReportStatus;
}

export const GoogleCloudChannelV1ReportJob: Schema.Schema<GoogleCloudChannelV1ReportJob> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  reportStatus: Schema.optional(GoogleCloudChannelV1ReportStatus),
})).annotate({ identifier: "GoogleCloudChannelV1ReportJob" }) as any as Schema.Schema<GoogleCloudChannelV1ReportJob>;

export interface GoogleCloudChannelV1RunReportJobResponse {
  /** Pass `report_job.name` to FetchReportResultsRequest.report_job to retrieve the report's results. */
  reportJob?: GoogleCloudChannelV1ReportJob;
  /** The metadata for the report's results (display name, columns, row count, and date range). If you view this before the operation finishes, you may see incomplete data. */
  reportMetadata?: GoogleCloudChannelV1ReportResultsMetadata;
}

export const GoogleCloudChannelV1RunReportJobResponse: Schema.Schema<GoogleCloudChannelV1RunReportJobResponse> = Schema.suspend(() => Schema.Struct({
  reportJob: Schema.optional(GoogleCloudChannelV1ReportJob),
  reportMetadata: Schema.optional(GoogleCloudChannelV1ReportResultsMetadata),
})).annotate({ identifier: "GoogleCloudChannelV1RunReportJobResponse" }) as any as Schema.Schema<GoogleCloudChannelV1RunReportJobResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`. */
export interface ListOperationsRequest {
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

export const ListOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  returnPartialSuccess: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("returnPartialSuccess")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations" }),
  svc,
) as unknown as Schema.Schema<ListOperationsRequest>;

export type ListOperationsResponse = GoogleLongrunningListOperationsResponse;
export const ListOperationsResponse = GoogleLongrunningListOperationsResponse;

export type ListOperationsError = CommonErrors;

export const listOperations = API.makePaginated(() => ({
  input: ListOperationsRequest,
  output: ListOperationsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetOperationsRequest>;

export type GetOperationsResponse = GoogleLongrunningOperation;
export const GetOperationsResponse = GoogleLongrunningOperation;

export type GetOperationsError = CommonErrors;

export const getOperations: API.OperationMethod<GetOperationsRequest, GetOperationsResponse, GetOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetOperationsRequest,
  output: GetOperationsResponse,
  errors: [],
}));

/** Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. */
export interface DeleteOperationsRequest {
  /** The name of the operation resource to be deleted. */
  name: string;
}

export const DeleteOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteOperationsRequest>;

export type DeleteOperationsResponse = GoogleProtobufEmpty;
export const DeleteOperationsResponse = GoogleProtobufEmpty;

export type DeleteOperationsError = CommonErrors;

export const deleteOperations: API.OperationMethod<DeleteOperationsRequest, DeleteOperationsResponse, DeleteOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteOperationsRequest,
  output: DeleteOperationsResponse,
  errors: [],
}));

/** Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. */
export interface CancelOperationsRequest {
  /** The name of the operation resource to be cancelled. */
  name: string;
  /** Request body */
  body?: GoogleLongrunningCancelOperationRequest;
}

export const CancelOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleLongrunningCancelOperationRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/operations/{operationsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelOperationsRequest>;

export type CancelOperationsResponse = GoogleProtobufEmpty;
export const CancelOperationsResponse = GoogleProtobufEmpty;

export type CancelOperationsError = CommonErrors;

export const cancelOperations: API.OperationMethod<CancelOperationsRequest, CancelOperationsResponse, CancelOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelOperationsRequest,
  output: CancelOperationsResponse,
  errors: [],
}));

/** Confirms the existence of Cloud Identity accounts based on the domain and if the Cloud Identity accounts are owned by the reseller. Possible error codes: * PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * INVALID_VALUE: Invalid domain value in the request. Return value: A list of CloudIdentityCustomerAccount resources for the domain (may be empty) Note: in the v1alpha1 version of the API, a NOT_FOUND error returns if no CloudIdentityCustomerAccount resources match the domain. */
export interface CheckCloudIdentityAccountsExistAccountsRequest {
  /** Required. The reseller account's resource name. Parent uses the format: accounts/{account_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudChannelV1CheckCloudIdentityAccountsExistRequest;
}

export const CheckCloudIdentityAccountsExistAccountsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudChannelV1CheckCloudIdentityAccountsExistRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}:checkCloudIdentityAccountsExist", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CheckCloudIdentityAccountsExistAccountsRequest>;

export type CheckCloudIdentityAccountsExistAccountsResponse = GoogleCloudChannelV1CheckCloudIdentityAccountsExistResponse;
export const CheckCloudIdentityAccountsExistAccountsResponse = GoogleCloudChannelV1CheckCloudIdentityAccountsExistResponse;

export type CheckCloudIdentityAccountsExistAccountsError = CommonErrors;

export const checkCloudIdentityAccountsExistAccounts: API.OperationMethod<CheckCloudIdentityAccountsExistAccountsRequest, CheckCloudIdentityAccountsExistAccountsResponse, CheckCloudIdentityAccountsExistAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CheckCloudIdentityAccountsExistAccountsRequest,
  output: CheckCloudIdentityAccountsExistAccountsResponse,
  errors: [],
}));

/** List TransferableSkus of a customer based on the Cloud Identity ID or Customer Name in the request. Use this method to list the entitlements information of an unowned customer. You should provide the customer's Cloud Identity ID or Customer Name. Possible error codes: * PERMISSION_DENIED: * The customer doesn't belong to the reseller and has no auth token. * The supplied auth token is invalid. * The reseller account making the request is different from the reseller account in the query. * INVALID_ARGUMENT: Required request parameters are missing or invalid. Return value: A list of the customer's TransferableSku. */
export interface ListTransferableSkusAccountsRequest {
  /** Required. The reseller account's resource name. Parent uses the format: accounts/{account_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudChannelV1ListTransferableSkusRequest;
}

export const ListTransferableSkusAccountsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudChannelV1ListTransferableSkusRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}:listTransferableSkus", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ListTransferableSkusAccountsRequest>;

export type ListTransferableSkusAccountsResponse = GoogleCloudChannelV1ListTransferableSkusResponse;
export const ListTransferableSkusAccountsResponse = GoogleCloudChannelV1ListTransferableSkusResponse;

export type ListTransferableSkusAccountsError = CommonErrors;

export const listTransferableSkusAccounts: API.OperationMethod<ListTransferableSkusAccountsRequest, ListTransferableSkusAccountsResponse, ListTransferableSkusAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListTransferableSkusAccountsRequest,
  output: ListTransferableSkusAccountsResponse,
  errors: [],
}));

/** List TransferableOffers of a customer based on Cloud Identity ID or Customer Name in the request. Use this method when a reseller gets the entitlement information of an unowned customer. The reseller should provide the customer's Cloud Identity ID or Customer Name. Possible error codes: * PERMISSION_DENIED: * The customer doesn't belong to the reseller and has no auth token. * The customer provided incorrect reseller information when generating auth token. * The reseller account making the request is different from the reseller account in the query. * The reseller is not authorized to transact on this Product. See https://support.google.com/channelservices/answer/9759265 * INVALID_ARGUMENT: Required request parameters are missing or invalid. Return value: List of TransferableOffer for the given customer and SKU. */
export interface ListTransferableOffersAccountsRequest {
  /** Required. The resource name of the reseller's account. */
  parent: string;
  /** Request body */
  body?: GoogleCloudChannelV1ListTransferableOffersRequest;
}

export const ListTransferableOffersAccountsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudChannelV1ListTransferableOffersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}:listTransferableOffers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ListTransferableOffersAccountsRequest>;

export type ListTransferableOffersAccountsResponse = GoogleCloudChannelV1ListTransferableOffersResponse;
export const ListTransferableOffersAccountsResponse = GoogleCloudChannelV1ListTransferableOffersResponse;

export type ListTransferableOffersAccountsError = CommonErrors;

export const listTransferableOffersAccounts: API.OperationMethod<ListTransferableOffersAccountsRequest, ListTransferableOffersAccountsResponse, ListTransferableOffersAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ListTransferableOffersAccountsRequest,
  output: ListTransferableOffersAccountsResponse,
  errors: [],
}));

/** Registers a service account with subscriber privileges on the Pub/Sub topic for this Channel Services account or integrator. After you create a subscriber, you get the events through SubscriberEvent Possible error codes: * PERMISSION_DENIED: The reseller account making the request and the provided reseller account are different, or the impersonated user is not a super admin. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The topic name with the registered service email address. */
export interface RegisterAccountsRequest {
  /** Optional. Resource name of the account. Required if integrator is not provided. Otherwise, leave this field empty/unset. */
  account: string;
  /** Request body */
  body?: GoogleCloudChannelV1RegisterSubscriberRequest;
}

export const RegisterAccountsRequest = Schema.Struct({
  account: Schema.String.pipe(T.HttpPath("account")),
  body: Schema.optional(GoogleCloudChannelV1RegisterSubscriberRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}:register", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RegisterAccountsRequest>;

export type RegisterAccountsResponse = GoogleCloudChannelV1RegisterSubscriberResponse;
export const RegisterAccountsResponse = GoogleCloudChannelV1RegisterSubscriberResponse;

export type RegisterAccountsError = CommonErrors;

export const registerAccounts: API.OperationMethod<RegisterAccountsRequest, RegisterAccountsResponse, RegisterAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RegisterAccountsRequest,
  output: RegisterAccountsResponse,
  errors: [],
}));

/** Unregisters a service account with subscriber privileges on the Pub/Sub topic created for this Channel Services account or integrator. If there are no service accounts left with subscriber privileges, this deletes the topic. You can call ListSubscribers to check for these accounts. Possible error codes: * PERMISSION_DENIED: The reseller account making the request and the provided reseller account are different, or the impersonated user is not a super admin. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: The topic resource doesn't exist. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The topic name that unregistered the service email address. Returns a success response if the service email address wasn't registered with the topic. */
export interface UnregisterAccountsRequest {
  /** Optional. Resource name of the account. Required if integrator is not provided. Otherwise, leave this field empty/unset. */
  account: string;
  /** Request body */
  body?: GoogleCloudChannelV1UnregisterSubscriberRequest;
}

export const UnregisterAccountsRequest = Schema.Struct({
  account: Schema.String.pipe(T.HttpPath("account")),
  body: Schema.optional(GoogleCloudChannelV1UnregisterSubscriberRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}:unregister", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnregisterAccountsRequest>;

export type UnregisterAccountsResponse = GoogleCloudChannelV1UnregisterSubscriberResponse;
export const UnregisterAccountsResponse = GoogleCloudChannelV1UnregisterSubscriberResponse;

export type UnregisterAccountsError = CommonErrors;

export const unregisterAccounts: API.OperationMethod<UnregisterAccountsRequest, UnregisterAccountsResponse, UnregisterAccountsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnregisterAccountsRequest,
  output: UnregisterAccountsResponse,
  errors: [],
}));

/** Lists service accounts with subscriber privileges on the Pub/Sub topic created for this Channel Services account or integrator. Possible error codes: * PERMISSION_DENIED: The reseller account making the request and the provided reseller account are different, or the impersonated user is not a super admin. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: The topic resource doesn't exist. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: A list of service email addresses. */
export interface ListSubscribersAccountsRequest {
  /** Optional. Resource name of the account. Required if integrator is not provided. Otherwise, leave this field empty/unset. */
  account: string;
  /** Optional. The maximum number of service accounts to return. The service may return fewer than this value. If unspecified, returns at most 100 service accounts. The maximum value is 1000; the server will coerce values above 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListSubscribers` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSubscribers` must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Resource name of the integrator. Required if account is not provided. Otherwise, leave this field empty/unset. */
  integrator?: string;
}

export const ListSubscribersAccountsRequest = Schema.Struct({
  account: Schema.String.pipe(T.HttpPath("account")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  integrator: Schema.optional(Schema.String).pipe(T.HttpQuery("integrator")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}:listSubscribers" }),
  svc,
) as unknown as Schema.Schema<ListSubscribersAccountsRequest>;

export type ListSubscribersAccountsResponse = GoogleCloudChannelV1ListSubscribersResponse;
export const ListSubscribersAccountsResponse = GoogleCloudChannelV1ListSubscribersResponse;

export type ListSubscribersAccountsError = CommonErrors;

export const listSubscribersAccounts = API.makePaginated(() => ({
  input: ListSubscribersAccountsRequest,
  output: ListSubscribersAccountsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Begins generation of data for a given report. The report identifier is a UID (for example, `613bf59q`). Possible error codes: * PERMISSION_DENIED: The user doesn't have access to this report. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: The report identifier was not found. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata contains an instance of OperationMetadata. To get the results of report generation, call CloudChannelReportsService.FetchReportResults with the RunReportJobResponse.report_job. Deprecated: Please use [Export Channel Services data to BigQuery](https://cloud.google.com/channel/docs/rebilling/export-data-to-bigquery) instead. */
export interface RunAccountsReportsRequest {
  /** Required. The report's resource name. Specifies the account and report used to generate report data. The report_id identifier is a UID (for example, `613bf59q`). Name uses the format: accounts/{account_id}/reports/{report_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudChannelV1RunReportJobRequest;
}

export const RunAccountsReportsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudChannelV1RunReportJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/reports/{reportsId}:run", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RunAccountsReportsRequest>;

export type RunAccountsReportsResponse = GoogleLongrunningOperation;
export const RunAccountsReportsResponse = GoogleLongrunningOperation;

export type RunAccountsReportsError = CommonErrors;

export const runAccountsReports: API.OperationMethod<RunAccountsReportsRequest, RunAccountsReportsResponse, RunAccountsReportsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RunAccountsReportsRequest,
  output: RunAccountsReportsResponse,
  errors: [],
}));

/** Lists the reports that RunReportJob can run. These reports include an ID, a description, and the list of columns that will be in the result. Deprecated: Please use [Export Channel Services data to BigQuery](https://cloud.google.com/channel/docs/rebilling/export-data-to-bigquery) instead. */
export interface ListAccountsReportsRequest {
  /** Required. The resource name of the partner account to list available reports for. Parent uses the format: accounts/{account_id} */
  parent: string;
  /** Optional. Requested page size of the report. The server might return fewer results than requested. If unspecified, returns 20 reports. The maximum value is 100. */
  pageSize?: number;
  /** Optional. A token that specifies a page of results beyond the first page. Obtained through ListReportsResponse.next_page_token of the previous CloudChannelReportsService.ListReports call. */
  pageToken?: string;
  /** Optional. The BCP-47 language code, such as "en-US". If specified, the response is localized to the corresponding language code if the original data sources support it. Default is "en-US". */
  languageCode?: string;
}

export const ListAccountsReportsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/reports" }),
  svc,
) as unknown as Schema.Schema<ListAccountsReportsRequest>;

export type ListAccountsReportsResponse = GoogleCloudChannelV1ListReportsResponse;
export const ListAccountsReportsResponse = GoogleCloudChannelV1ListReportsResponse;

export type ListAccountsReportsError = CommonErrors;

export const listAccountsReports = API.makePaginated(() => ({
  input: ListAccountsReportsRequest,
  output: ListAccountsReportsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves data generated by CloudChannelReportsService.RunReportJob. Deprecated: Please use [Export Channel Services data to BigQuery](https://cloud.google.com/channel/docs/rebilling/export-data-to-bigquery) instead. */
export interface FetchReportResultsAccountsReportJobsRequest {
  /** Required. The report job created by CloudChannelReportsService.RunReportJob. Report_job uses the format: accounts/{account_id}/reportJobs/{report_job_id} */
  reportJob: string;
  /** Request body */
  body?: GoogleCloudChannelV1FetchReportResultsRequest;
}

export const FetchReportResultsAccountsReportJobsRequest = Schema.Struct({
  reportJob: Schema.String.pipe(T.HttpPath("reportJob")),
  body: Schema.optional(GoogleCloudChannelV1FetchReportResultsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/reportJobs/{reportJobsId}:fetchReportResults", hasBody: true }),
  svc,
) as unknown as Schema.Schema<FetchReportResultsAccountsReportJobsRequest>;

export type FetchReportResultsAccountsReportJobsResponse = GoogleCloudChannelV1FetchReportResultsResponse;
export const FetchReportResultsAccountsReportJobsResponse = GoogleCloudChannelV1FetchReportResultsResponse;

export type FetchReportResultsAccountsReportJobsError = CommonErrors;

export const fetchReportResultsAccountsReportJobs: API.OperationMethod<FetchReportResultsAccountsReportJobsRequest, FetchReportResultsAccountsReportJobsResponse, FetchReportResultsAccountsReportJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: FetchReportResultsAccountsReportJobsRequest,
  output: FetchReportResultsAccountsReportJobsResponse,
  errors: [],
}));

/** List Customers. Possible error codes: * PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. * INVALID_ARGUMENT: Required request parameters are missing or invalid. Return value: List of Customers, or an empty list if there are no customers. */
export interface ListAccountsCustomersRequest {
  /** Required. The resource name of the reseller account to list customers from. Parent uses the format: accounts/{account_id}. */
  parent: string;
  /** Optional. The maximum number of customers to return. The service may return fewer than this value. If unspecified, returns at most 10 customers. The maximum value is 50. */
  pageSize?: number;
  /** Optional. A token identifying a page of results other than the first page. Obtained through ListCustomersResponse.next_page_token of the previous CloudChannelService.ListCustomers call. */
  pageToken?: string;
  /** Optional. Filters applied to the [CloudChannelService.ListCustomers] results. See https://cloud.google.com/channel/docs/concepts/google-cloud/filter-customers for more information. */
  filter?: string;
}

export const ListAccountsCustomersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/customers" }),
  svc,
) as unknown as Schema.Schema<ListAccountsCustomersRequest>;

export type ListAccountsCustomersResponse = GoogleCloudChannelV1ListCustomersResponse;
export const ListAccountsCustomersResponse = GoogleCloudChannelV1ListCustomersResponse;

export type ListAccountsCustomersError = CommonErrors;

export const listAccountsCustomers = API.makePaginated(() => ({
  input: ListAccountsCustomersRequest,
  output: ListAccountsCustomersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the requested Customer resource. Possible error codes: * PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: The customer resource doesn't exist. Usually the result of an invalid name parameter. Return value: The Customer resource. */
export interface GetAccountsCustomersRequest {
  /** Required. The resource name of the customer to retrieve. Name uses the format: accounts/{account_id}/customers/{customer_id} */
  name: string;
}

export const GetAccountsCustomersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/customers/{customersId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsCustomersRequest>;

export type GetAccountsCustomersResponse = GoogleCloudChannelV1Customer;
export const GetAccountsCustomersResponse = GoogleCloudChannelV1Customer;

export type GetAccountsCustomersError = CommonErrors;

export const getAccountsCustomers: API.OperationMethod<GetAccountsCustomersRequest, GetAccountsCustomersResponse, GetAccountsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsCustomersRequest,
  output: GetAccountsCustomersResponse,
  errors: [],
}));

/** Creates a new Customer resource under the reseller or distributor account. Possible error codes: * PERMISSION_DENIED: * The reseller account making the request is different from the reseller account in the API request. * You are not authorized to create a customer. See https://support.google.com/channelservices/answer/9759265 * INVALID_ARGUMENT: * Required request parameters are missing or invalid. * Domain field value doesn't match the primary email domain. Return value: The newly created Customer resource. */
export interface CreateAccountsCustomersRequest {
  /** Required. The resource name of reseller account in which to create the customer. Parent uses the format: accounts/{account_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudChannelV1Customer;
}

export const CreateAccountsCustomersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudChannelV1Customer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/customers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsCustomersRequest>;

export type CreateAccountsCustomersResponse = GoogleCloudChannelV1Customer;
export const CreateAccountsCustomersResponse = GoogleCloudChannelV1Customer;

export type CreateAccountsCustomersError = CommonErrors;

export const createAccountsCustomers: API.OperationMethod<CreateAccountsCustomersRequest, CreateAccountsCustomersResponse, CreateAccountsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsCustomersRequest,
  output: CreateAccountsCustomersResponse,
  errors: [],
}));

/** Updates an existing Customer resource for the reseller or distributor. Possible error codes: * PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: No Customer resource found for the name in the request. Return value: The updated Customer resource. */
export interface PatchAccountsCustomersRequest {
  /** Output only. Resource name of the customer. Format: accounts/{account_id}/customers/{customer_id} */
  name: string;
  /** The update mask that applies to the resource. Optional. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudChannelV1Customer;
}

export const PatchAccountsCustomersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudChannelV1Customer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accounts/{accountsId}/customers/{customersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountsCustomersRequest>;

export type PatchAccountsCustomersResponse = GoogleCloudChannelV1Customer;
export const PatchAccountsCustomersResponse = GoogleCloudChannelV1Customer;

export type PatchAccountsCustomersError = CommonErrors;

export const patchAccountsCustomers: API.OperationMethod<PatchAccountsCustomersRequest, PatchAccountsCustomersResponse, PatchAccountsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountsCustomersRequest,
  output: PatchAccountsCustomersResponse,
  errors: [],
}));

/** Deletes the given Customer permanently. Possible error codes: * PERMISSION_DENIED: The account making the request does not own this customer. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * FAILED_PRECONDITION: The customer has existing entitlements. * NOT_FOUND: No Customer resource found for the name in the request. */
export interface DeleteAccountsCustomersRequest {
  /** Required. The resource name of the customer to delete. */
  name: string;
}

export const DeleteAccountsCustomersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/accounts/{accountsId}/customers/{customersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsCustomersRequest>;

export type DeleteAccountsCustomersResponse = GoogleProtobufEmpty;
export const DeleteAccountsCustomersResponse = GoogleProtobufEmpty;

export type DeleteAccountsCustomersError = CommonErrors;

export const deleteAccountsCustomers: API.OperationMethod<DeleteAccountsCustomersRequest, DeleteAccountsCustomersResponse, DeleteAccountsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsCustomersRequest,
  output: DeleteAccountsCustomersResponse,
  errors: [],
}));

/** Imports a Customer from the Cloud Identity associated with the provided Cloud Identity ID or domain before a TransferEntitlements call. If a linked Customer already exists and overwrite_if_exists is true, it will update that Customer's data. Possible error codes: * PERMISSION_DENIED: * The reseller account making the request is different from the reseller account in the API request. * You are not authorized to import the customer. See https://support.google.com/channelservices/answer/9759265 * NOT_FOUND: Cloud Identity doesn't exist or was deleted. * INVALID_ARGUMENT: Required parameters are missing, or the auth_token is expired or invalid. * ALREADY_EXISTS: A customer already exists and has conflicting critical fields. Requires an overwrite. Return value: The Customer. */
export interface ImportAccountsCustomersRequest {
  /** Required. The resource name of the reseller's account. Parent takes the format: accounts/{account_id} or accounts/{account_id}/channelPartnerLinks/{channel_partner_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudChannelV1ImportCustomerRequest;
}

export const ImportAccountsCustomersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudChannelV1ImportCustomerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/customers:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportAccountsCustomersRequest>;

export type ImportAccountsCustomersResponse = GoogleCloudChannelV1Customer;
export const ImportAccountsCustomersResponse = GoogleCloudChannelV1Customer;

export type ImportAccountsCustomersError = CommonErrors;

export const importAccountsCustomers: API.OperationMethod<ImportAccountsCustomersRequest, ImportAccountsCustomersResponse, ImportAccountsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportAccountsCustomersRequest,
  output: ImportAccountsCustomersResponse,
  errors: [],
}));

/** Creates a Cloud Identity for the given customer using the customer's information, or the information provided here. Possible error codes: * PERMISSION_DENIED: * The customer doesn't belong to the reseller. * You are not authorized to provision cloud identity id. See https://support.google.com/channelservices/answer/9759265 * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: The customer was not found. * ALREADY_EXISTS: The customer's primary email already exists. Retry after changing the customer's primary contact email. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata contains an instance of OperationMetadata. */
export interface ProvisionCloudIdentityAccountsCustomersRequest {
  /** Required. Resource name of the customer. Format: accounts/{account_id}/customers/{customer_id} */
  customer: string;
  /** Request body */
  body?: GoogleCloudChannelV1ProvisionCloudIdentityRequest;
}

export const ProvisionCloudIdentityAccountsCustomersRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  body: Schema.optional(GoogleCloudChannelV1ProvisionCloudIdentityRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/customers/{customersId}:provisionCloudIdentity", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ProvisionCloudIdentityAccountsCustomersRequest>;

export type ProvisionCloudIdentityAccountsCustomersResponse = GoogleLongrunningOperation;
export const ProvisionCloudIdentityAccountsCustomersResponse = GoogleLongrunningOperation;

export type ProvisionCloudIdentityAccountsCustomersError = CommonErrors;

export const provisionCloudIdentityAccountsCustomers: API.OperationMethod<ProvisionCloudIdentityAccountsCustomersRequest, ProvisionCloudIdentityAccountsCustomersResponse, ProvisionCloudIdentityAccountsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ProvisionCloudIdentityAccountsCustomersRequest,
  output: ProvisionCloudIdentityAccountsCustomersResponse,
  errors: [],
}));

/** Transfers customer entitlements to new reseller. Possible error codes: * PERMISSION_DENIED: * The customer doesn't belong to the reseller. * The reseller is not authorized to transact on this Product. See https://support.google.com/channelservices/answer/9759265 * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: The customer or offer resource was not found. * ALREADY_EXISTS: The SKU was already transferred for the customer. * CONDITION_NOT_MET or FAILED_PRECONDITION: * The SKU requires domain verification to transfer, but the domain is not verified. * An Add-On SKU (example, Vault or Drive) is missing the pre-requisite SKU (example, G Suite Basic). * (Developer accounts only) Reseller and resold domain must meet the following naming requirements: * Domain names must start with goog-test. * Domain names must include the reseller domain. * Specify all transferring entitlements. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata. */
export interface TransferEntitlementsAccountsCustomersRequest {
  /** Required. The resource name of the reseller's customer account that will receive transferred entitlements. Parent uses the format: accounts/{account_id}/customers/{customer_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudChannelV1TransferEntitlementsRequest;
}

export const TransferEntitlementsAccountsCustomersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudChannelV1TransferEntitlementsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/customers/{customersId}:transferEntitlements", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TransferEntitlementsAccountsCustomersRequest>;

export type TransferEntitlementsAccountsCustomersResponse = GoogleLongrunningOperation;
export const TransferEntitlementsAccountsCustomersResponse = GoogleLongrunningOperation;

export type TransferEntitlementsAccountsCustomersError = CommonErrors;

export const transferEntitlementsAccountsCustomers: API.OperationMethod<TransferEntitlementsAccountsCustomersRequest, TransferEntitlementsAccountsCustomersResponse, TransferEntitlementsAccountsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TransferEntitlementsAccountsCustomersRequest,
  output: TransferEntitlementsAccountsCustomersResponse,
  errors: [],
}));

/** Transfers customer entitlements from their current reseller to Google. Possible error codes: * PERMISSION_DENIED: The customer doesn't belong to the reseller. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: The customer or offer resource was not found. * ALREADY_EXISTS: The SKU was already transferred for the customer. * CONDITION_NOT_MET or FAILED_PRECONDITION: * The SKU requires domain verification to transfer, but the domain is not verified. * An Add-On SKU (example, Vault or Drive) is missing the pre-requisite SKU (example, G Suite Basic). * (Developer accounts only) Reseller and resold domain must meet the following naming requirements: * Domain names must start with goog-test. * Domain names must include the reseller domain. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The response will contain google.protobuf.Empty on success. The Operation metadata will contain an instance of OperationMetadata. */
export interface TransferEntitlementsToGoogleAccountsCustomersRequest {
  /** Required. The resource name of the reseller's customer account where the entitlements transfer from. Parent uses the format: accounts/{account_id}/customers/{customer_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudChannelV1TransferEntitlementsToGoogleRequest;
}

export const TransferEntitlementsToGoogleAccountsCustomersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudChannelV1TransferEntitlementsToGoogleRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/customers/{customersId}:transferEntitlementsToGoogle", hasBody: true }),
  svc,
) as unknown as Schema.Schema<TransferEntitlementsToGoogleAccountsCustomersRequest>;

export type TransferEntitlementsToGoogleAccountsCustomersResponse = GoogleLongrunningOperation;
export const TransferEntitlementsToGoogleAccountsCustomersResponse = GoogleLongrunningOperation;

export type TransferEntitlementsToGoogleAccountsCustomersError = CommonErrors;

export const transferEntitlementsToGoogleAccountsCustomers: API.OperationMethod<TransferEntitlementsToGoogleAccountsCustomersRequest, TransferEntitlementsToGoogleAccountsCustomersResponse, TransferEntitlementsToGoogleAccountsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: TransferEntitlementsToGoogleAccountsCustomersRequest,
  output: TransferEntitlementsToGoogleAccountsCustomersResponse,
  errors: [],
}));

/** Lists the following: * SKUs that you can purchase for a customer * SKUs that you can upgrade or downgrade for an entitlement. Possible error codes: * PERMISSION_DENIED: The customer doesn't belong to the reseller. * INVALID_ARGUMENT: Required request parameters are missing or invalid. */
export interface ListPurchasableSkusAccountsCustomersRequest {
  /** Required. The resource name of the customer to list SKUs for. Format: accounts/{account_id}/customers/{customer_id}. */
  customer: string;
  /** Required. List SKUs belonging to this Product. Format: products/{product_id}. Supports products/- to retrieve SKUs for all products. */
  "createEntitlementPurchase.product"?: string;
  /** Required. Resource name of the entitlement. Format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} */
  "changeOfferPurchase.entitlement"?: string;
  /** Required. Change Type for the entitlement. */
  "changeOfferPurchase.changeType"?: "CHANGE_TYPE_UNSPECIFIED" | "UPGRADE" | "DOWNGRADE" | (string & {});
  /** Optional. Requested page size. Server might return fewer results than requested. If unspecified, returns at most 100 SKUs. The maximum value is 1000; the server will coerce values above 1000. */
  pageSize?: number;
  /** Optional. A token for a page of results other than the first page. */
  pageToken?: string;
  /** Optional. The BCP-47 language code. For example, "en-US". The response will localize in the corresponding language code, if specified. The default value is "en-US". */
  languageCode?: string;
}

export const ListPurchasableSkusAccountsCustomersRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  "createEntitlementPurchase.product": Schema.optional(Schema.String).pipe(T.HttpQuery("createEntitlementPurchase.product")),
  "changeOfferPurchase.entitlement": Schema.optional(Schema.String).pipe(T.HttpQuery("changeOfferPurchase.entitlement")),
  "changeOfferPurchase.changeType": Schema.optional(Schema.String).pipe(T.HttpQuery("changeOfferPurchase.changeType")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/customers/{customersId}:listPurchasableSkus" }),
  svc,
) as unknown as Schema.Schema<ListPurchasableSkusAccountsCustomersRequest>;

export type ListPurchasableSkusAccountsCustomersResponse = GoogleCloudChannelV1ListPurchasableSkusResponse;
export const ListPurchasableSkusAccountsCustomersResponse = GoogleCloudChannelV1ListPurchasableSkusResponse;

export type ListPurchasableSkusAccountsCustomersError = CommonErrors;

export const listPurchasableSkusAccountsCustomers = API.makePaginated(() => ({
  input: ListPurchasableSkusAccountsCustomersRequest,
  output: ListPurchasableSkusAccountsCustomersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the following: * Offers that you can purchase for a customer. * Offers that you can change for an entitlement. Possible error codes: * PERMISSION_DENIED: * The customer doesn't belong to the reseller * The reseller is not authorized to transact on this Product. See https://support.google.com/channelservices/answer/9759265 * INVALID_ARGUMENT: Required request parameters are missing or invalid. */
export interface ListPurchasableOffersAccountsCustomersRequest {
  /** Required. The resource name of the customer to list Offers for. Format: accounts/{account_id}/customers/{customer_id}. */
  customer: string;
  /** Required. SKU that the result should be restricted to. Format: products/{product_id}/skus/{sku_id}. */
  "createEntitlementPurchase.sku"?: string;
  /** Optional. Billing account that the result should be restricted to. Format: accounts/{account_id}/billingAccounts/{billing_account_id}. */
  "createEntitlementPurchase.billingAccount"?: string;
  /** Required. Resource name of the entitlement. Format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} */
  "changeOfferPurchase.entitlement"?: string;
  /** Optional. Resource name of the new target SKU. Provide this SKU when upgrading or downgrading an entitlement. Format: products/{product_id}/skus/{sku_id} */
  "changeOfferPurchase.newSku"?: string;
  /** Optional. Resource name of the new target Billing Account. Provide this Billing Account when setting up billing for a trial subscription. Format: accounts/{account_id}/billingAccounts/{billing_account_id}. This field is only relevant for multi-currency accounts. It should be left empty for single currency accounts. */
  "changeOfferPurchase.billingAccount"?: string;
  /** Optional. Requested page size. Server might return fewer results than requested. If unspecified, returns at most 100 Offers. The maximum value is 1000; the server will coerce values above 1000. */
  pageSize?: number;
  /** Optional. A token for a page of results other than the first page. */
  pageToken?: string;
  /** Optional. The BCP-47 language code. For example, "en-US". The response will localize in the corresponding language code, if specified. The default value is "en-US". */
  languageCode?: string;
}

export const ListPurchasableOffersAccountsCustomersRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  "createEntitlementPurchase.sku": Schema.optional(Schema.String).pipe(T.HttpQuery("createEntitlementPurchase.sku")),
  "createEntitlementPurchase.billingAccount": Schema.optional(Schema.String).pipe(T.HttpQuery("createEntitlementPurchase.billingAccount")),
  "changeOfferPurchase.entitlement": Schema.optional(Schema.String).pipe(T.HttpQuery("changeOfferPurchase.entitlement")),
  "changeOfferPurchase.newSku": Schema.optional(Schema.String).pipe(T.HttpQuery("changeOfferPurchase.newSku")),
  "changeOfferPurchase.billingAccount": Schema.optional(Schema.String).pipe(T.HttpQuery("changeOfferPurchase.billingAccount")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/customers/{customersId}:listPurchasableOffers" }),
  svc,
) as unknown as Schema.Schema<ListPurchasableOffersAccountsCustomersRequest>;

export type ListPurchasableOffersAccountsCustomersResponse = GoogleCloudChannelV1ListPurchasableOffersResponse;
export const ListPurchasableOffersAccountsCustomersResponse = GoogleCloudChannelV1ListPurchasableOffersResponse;

export type ListPurchasableOffersAccountsCustomersError = CommonErrors;

export const listPurchasableOffersAccountsCustomers = API.makePaginated(() => ({
  input: ListPurchasableOffersAccountsCustomersRequest,
  output: ListPurchasableOffersAccountsCustomersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the billing accounts that are eligible to purchase particular SKUs for a given customer. Possible error codes: * PERMISSION_DENIED: The customer doesn't belong to the reseller. * INVALID_ARGUMENT: Required request parameters are missing or invalid. Return value: Based on the provided list of SKUs, returns a list of SKU groups that must be purchased using the same billing account and the billing accounts eligible to purchase each SKU group. */
export interface QueryEligibleBillingAccountsAccountsCustomersRequest {
  /** Required. The resource name of the customer to list eligible billing accounts for. Format: accounts/{account_id}/customers/{customer_id}. */
  customer: string;
  /** Required. List of SKUs to list eligible billing accounts for. At least one SKU is required. Format: products/{product_id}/skus/{sku_id}. */
  skus?: string[];
}

export const QueryEligibleBillingAccountsAccountsCustomersRequest = Schema.Struct({
  customer: Schema.String.pipe(T.HttpPath("customer")),
  skus: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("skus")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/customers/{customersId}:queryEligibleBillingAccounts" }),
  svc,
) as unknown as Schema.Schema<QueryEligibleBillingAccountsAccountsCustomersRequest>;

export type QueryEligibleBillingAccountsAccountsCustomersResponse = GoogleCloudChannelV1QueryEligibleBillingAccountsResponse;
export const QueryEligibleBillingAccountsAccountsCustomersResponse = GoogleCloudChannelV1QueryEligibleBillingAccountsResponse;

export type QueryEligibleBillingAccountsAccountsCustomersError = CommonErrors;

export const queryEligibleBillingAccountsAccountsCustomers: API.OperationMethod<QueryEligibleBillingAccountsAccountsCustomersRequest, QueryEligibleBillingAccountsAccountsCustomersResponse, QueryEligibleBillingAccountsAccountsCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: QueryEligibleBillingAccountsAccountsCustomersRequest,
  output: QueryEligibleBillingAccountsAccountsCustomersResponse,
  errors: [],
}));

/** Lists Entitlements belonging to a customer. Possible error codes: * PERMISSION_DENIED: The customer doesn't belong to the reseller. * INVALID_ARGUMENT: Required request parameters are missing or invalid. Return value: A list of the customer's Entitlements. */
export interface ListAccountsCustomersEntitlementsRequest {
  /** Required. The resource name of the reseller's customer account to list entitlements for. Parent uses the format: accounts/{account_id}/customers/{customer_id} */
  parent: string;
  /** Optional. Requested page size. Server might return fewer results than requested. If unspecified, return at most 50 entitlements. The maximum value is 100; the server will coerce values above 100. */
  pageSize?: number;
  /** Optional. A token for a page of results other than the first page. Obtained using ListEntitlementsResponse.next_page_token of the previous CloudChannelService.ListEntitlements call. */
  pageToken?: string;
}

export const ListAccountsCustomersEntitlementsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/customers/{customersId}/entitlements" }),
  svc,
) as unknown as Schema.Schema<ListAccountsCustomersEntitlementsRequest>;

export type ListAccountsCustomersEntitlementsResponse = GoogleCloudChannelV1ListEntitlementsResponse;
export const ListAccountsCustomersEntitlementsResponse = GoogleCloudChannelV1ListEntitlementsResponse;

export type ListAccountsCustomersEntitlementsError = CommonErrors;

export const listAccountsCustomersEntitlements = API.makePaginated(() => ({
  input: ListAccountsCustomersEntitlementsRequest,
  output: ListAccountsCustomersEntitlementsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the requested Entitlement resource. Possible error codes: * PERMISSION_DENIED: The customer doesn't belong to the reseller. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: The customer entitlement was not found. Return value: The requested Entitlement resource. */
export interface GetAccountsCustomersEntitlementsRequest {
  /** Required. The resource name of the entitlement to retrieve. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} */
  name: string;
}

export const GetAccountsCustomersEntitlementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/customers/{customersId}/entitlements/{entitlementsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsCustomersEntitlementsRequest>;

export type GetAccountsCustomersEntitlementsResponse = GoogleCloudChannelV1Entitlement;
export const GetAccountsCustomersEntitlementsResponse = GoogleCloudChannelV1Entitlement;

export type GetAccountsCustomersEntitlementsError = CommonErrors;

export const getAccountsCustomersEntitlements: API.OperationMethod<GetAccountsCustomersEntitlementsRequest, GetAccountsCustomersEntitlementsResponse, GetAccountsCustomersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsCustomersEntitlementsRequest,
  output: GetAccountsCustomersEntitlementsResponse,
  errors: [],
}));

/** Creates an entitlement for a customer. Possible error codes: * PERMISSION_DENIED: * The customer doesn't belong to the reseller. * The reseller is not authorized to transact on this Product. See https://support.google.com/channelservices/answer/9759265 * INVALID_ARGUMENT: * Required request parameters are missing or invalid. * There is already a customer entitlement for a SKU from the same product family. * INVALID_VALUE: Make sure the OfferId is valid. If it is, contact Google Channel support for further troubleshooting. * NOT_FOUND: The customer or offer resource was not found. * ALREADY_EXISTS: * The SKU was already purchased for the customer. * The customer's primary email already exists. Retry after changing the customer's primary contact email. * CONDITION_NOT_MET or FAILED_PRECONDITION: * The domain required for purchasing a SKU has not been verified. * A pre-requisite SKU required to purchase an Add-On SKU is missing. For example, Google Workspace Business Starter is required to purchase Vault or Drive. * (Developer accounts only) Reseller and resold domain must meet the following naming requirements: * Domain names must start with goog-test. * Domain names must include the reseller domain. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata. */
export interface CreateAccountsCustomersEntitlementsRequest {
  /** Required. The resource name of the reseller's customer account in which to create the entitlement. Parent uses the format: accounts/{account_id}/customers/{customer_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudChannelV1CreateEntitlementRequest;
}

export const CreateAccountsCustomersEntitlementsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudChannelV1CreateEntitlementRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/customers/{customersId}/entitlements", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsCustomersEntitlementsRequest>;

export type CreateAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;
export const CreateAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;

export type CreateAccountsCustomersEntitlementsError = CommonErrors;

export const createAccountsCustomersEntitlements: API.OperationMethod<CreateAccountsCustomersEntitlementsRequest, CreateAccountsCustomersEntitlementsResponse, CreateAccountsCustomersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsCustomersEntitlementsRequest,
  output: CreateAccountsCustomersEntitlementsResponse,
  errors: [],
}));

/** Change parameters of the entitlement. An entitlement update is a long-running operation and it updates the entitlement as a result of fulfillment. Possible error codes: * PERMISSION_DENIED: The customer doesn't belong to the reseller. * INVALID_ARGUMENT: Required request parameters are missing or invalid. For example, the number of seats being changed is greater than the allowed number of max seats, or decreasing seats for a commitment based plan. * NOT_FOUND: Entitlement resource not found. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata. */
export interface ChangeParametersAccountsCustomersEntitlementsRequest {
  /** Required. The name of the entitlement to update. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudChannelV1ChangeParametersRequest;
}

export const ChangeParametersAccountsCustomersEntitlementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudChannelV1ChangeParametersRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/customers/{customersId}/entitlements/{entitlementsId}:changeParameters", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ChangeParametersAccountsCustomersEntitlementsRequest>;

export type ChangeParametersAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;
export const ChangeParametersAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;

export type ChangeParametersAccountsCustomersEntitlementsError = CommonErrors;

export const changeParametersAccountsCustomersEntitlements: API.OperationMethod<ChangeParametersAccountsCustomersEntitlementsRequest, ChangeParametersAccountsCustomersEntitlementsResponse, ChangeParametersAccountsCustomersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ChangeParametersAccountsCustomersEntitlementsRequest,
  output: ChangeParametersAccountsCustomersEntitlementsResponse,
  errors: [],
}));

/** Updates the renewal settings for an existing customer entitlement. An entitlement update is a long-running operation and it updates the entitlement as a result of fulfillment. Possible error codes: * PERMISSION_DENIED: The customer doesn't belong to the reseller. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: Entitlement resource not found. * NOT_COMMITMENT_PLAN: Renewal Settings are only applicable for a commitment plan. Can't enable or disable renewals for non-commitment plans. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata. */
export interface ChangeRenewalSettingsAccountsCustomersEntitlementsRequest {
  /** Required. The name of the entitlement to update. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudChannelV1ChangeRenewalSettingsRequest;
}

export const ChangeRenewalSettingsAccountsCustomersEntitlementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudChannelV1ChangeRenewalSettingsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/customers/{customersId}/entitlements/{entitlementsId}:changeRenewalSettings", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ChangeRenewalSettingsAccountsCustomersEntitlementsRequest>;

export type ChangeRenewalSettingsAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;
export const ChangeRenewalSettingsAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;

export type ChangeRenewalSettingsAccountsCustomersEntitlementsError = CommonErrors;

export const changeRenewalSettingsAccountsCustomersEntitlements: API.OperationMethod<ChangeRenewalSettingsAccountsCustomersEntitlementsRequest, ChangeRenewalSettingsAccountsCustomersEntitlementsResponse, ChangeRenewalSettingsAccountsCustomersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ChangeRenewalSettingsAccountsCustomersEntitlementsRequest,
  output: ChangeRenewalSettingsAccountsCustomersEntitlementsResponse,
  errors: [],
}));

/** Updates the Offer for an existing customer entitlement. An entitlement update is a long-running operation and it updates the entitlement as a result of fulfillment. Possible error codes: * PERMISSION_DENIED: The customer doesn't belong to the reseller. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: Offer or Entitlement resource not found. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata. */
export interface ChangeOfferAccountsCustomersEntitlementsRequest {
  /** Required. The resource name of the entitlement to update. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudChannelV1ChangeOfferRequest;
}

export const ChangeOfferAccountsCustomersEntitlementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudChannelV1ChangeOfferRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/customers/{customersId}/entitlements/{entitlementsId}:changeOffer", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ChangeOfferAccountsCustomersEntitlementsRequest>;

export type ChangeOfferAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;
export const ChangeOfferAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;

export type ChangeOfferAccountsCustomersEntitlementsError = CommonErrors;

export const changeOfferAccountsCustomersEntitlements: API.OperationMethod<ChangeOfferAccountsCustomersEntitlementsRequest, ChangeOfferAccountsCustomersEntitlementsResponse, ChangeOfferAccountsCustomersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ChangeOfferAccountsCustomersEntitlementsRequest,
  output: ChangeOfferAccountsCustomersEntitlementsResponse,
  errors: [],
}));

/** Starts paid service for a trial entitlement. Starts paid service for a trial entitlement immediately. This method is only applicable if a plan is set up for a trial entitlement but has some trial days remaining. Possible error codes: * PERMISSION_DENIED: The customer doesn't belong to the reseller. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: Entitlement resource not found. * FAILED_PRECONDITION/NOT_IN_TRIAL: This method only works for entitlement on trial plans. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata. */
export interface StartPaidServiceAccountsCustomersEntitlementsRequest {
  /** Required. The name of the entitlement to start a paid service for. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudChannelV1StartPaidServiceRequest;
}

export const StartPaidServiceAccountsCustomersEntitlementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudChannelV1StartPaidServiceRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/customers/{customersId}/entitlements/{entitlementsId}:startPaidService", hasBody: true }),
  svc,
) as unknown as Schema.Schema<StartPaidServiceAccountsCustomersEntitlementsRequest>;

export type StartPaidServiceAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;
export const StartPaidServiceAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;

export type StartPaidServiceAccountsCustomersEntitlementsError = CommonErrors;

export const startPaidServiceAccountsCustomersEntitlements: API.OperationMethod<StartPaidServiceAccountsCustomersEntitlementsRequest, StartPaidServiceAccountsCustomersEntitlementsResponse, StartPaidServiceAccountsCustomersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: StartPaidServiceAccountsCustomersEntitlementsRequest,
  output: StartPaidServiceAccountsCustomersEntitlementsResponse,
  errors: [],
}));

/** Suspends a previously fulfilled entitlement. An entitlement suspension is a long-running operation. Possible error codes: * PERMISSION_DENIED: The customer doesn't belong to the reseller. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: Entitlement resource not found. * NOT_ACTIVE: Entitlement is not active. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata. */
export interface SuspendAccountsCustomersEntitlementsRequest {
  /** Required. The resource name of the entitlement to suspend. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudChannelV1SuspendEntitlementRequest;
}

export const SuspendAccountsCustomersEntitlementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudChannelV1SuspendEntitlementRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/customers/{customersId}/entitlements/{entitlementsId}:suspend", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SuspendAccountsCustomersEntitlementsRequest>;

export type SuspendAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;
export const SuspendAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;

export type SuspendAccountsCustomersEntitlementsError = CommonErrors;

export const suspendAccountsCustomersEntitlements: API.OperationMethod<SuspendAccountsCustomersEntitlementsRequest, SuspendAccountsCustomersEntitlementsResponse, SuspendAccountsCustomersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SuspendAccountsCustomersEntitlementsRequest,
  output: SuspendAccountsCustomersEntitlementsResponse,
  errors: [],
}));

/** Cancels a previously fulfilled entitlement. An entitlement cancellation is a long-running operation. Possible error codes: * PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. * FAILED_PRECONDITION: There are Google Cloud projects linked to the Google Cloud entitlement's Cloud Billing subaccount. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: Entitlement resource not found. * DELETION_TYPE_NOT_ALLOWED: Cancel is only allowed for Google Workspace add-ons, or entitlements for Google Cloud's development platform. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The response will contain google.protobuf.Empty on success. The Operation metadata will contain an instance of OperationMetadata. */
export interface CancelAccountsCustomersEntitlementsRequest {
  /** Required. The resource name of the entitlement to cancel. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudChannelV1CancelEntitlementRequest;
}

export const CancelAccountsCustomersEntitlementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudChannelV1CancelEntitlementRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/customers/{customersId}/entitlements/{entitlementsId}:cancel", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CancelAccountsCustomersEntitlementsRequest>;

export type CancelAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;
export const CancelAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;

export type CancelAccountsCustomersEntitlementsError = CommonErrors;

export const cancelAccountsCustomersEntitlements: API.OperationMethod<CancelAccountsCustomersEntitlementsRequest, CancelAccountsCustomersEntitlementsResponse, CancelAccountsCustomersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CancelAccountsCustomersEntitlementsRequest,
  output: CancelAccountsCustomersEntitlementsResponse,
  errors: [],
}));

/** Activates a previously suspended entitlement. Entitlements suspended for pending ToS acceptance can't be activated using this method. An entitlement activation is a long-running operation and it updates the state of the customer entitlement. Possible error codes: * PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: Entitlement resource not found. * SUSPENSION_NOT_RESELLER_INITIATED: Can only activate reseller-initiated suspensions and entitlements that have accepted the TOS. * NOT_SUSPENDED: Can only activate suspended entitlements not in an ACTIVE state. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The ID of a long-running operation. To get the results of the operation, call the GetOperation method of CloudChannelOperationsService. The Operation metadata will contain an instance of OperationMetadata. */
export interface ActivateAccountsCustomersEntitlementsRequest {
  /** Required. The resource name of the entitlement to activate. Name uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} */
  name: string;
  /** Request body */
  body?: GoogleCloudChannelV1ActivateEntitlementRequest;
}

export const ActivateAccountsCustomersEntitlementsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudChannelV1ActivateEntitlementRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/customers/{customersId}/entitlements/{entitlementsId}:activate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ActivateAccountsCustomersEntitlementsRequest>;

export type ActivateAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;
export const ActivateAccountsCustomersEntitlementsResponse = GoogleLongrunningOperation;

export type ActivateAccountsCustomersEntitlementsError = CommonErrors;

export const activateAccountsCustomersEntitlements: API.OperationMethod<ActivateAccountsCustomersEntitlementsRequest, ActivateAccountsCustomersEntitlementsResponse, ActivateAccountsCustomersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ActivateAccountsCustomersEntitlementsRequest,
  output: ActivateAccountsCustomersEntitlementsResponse,
  errors: [],
}));

/** Returns the requested Offer resource. Possible error codes: * PERMISSION_DENIED: The entitlement doesn't belong to the reseller. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: Entitlement or offer was not found. Return value: The Offer resource. */
export interface LookupOfferAccountsCustomersEntitlementsRequest {
  /** Required. The resource name of the entitlement to retrieve the Offer. Entitlement uses the format: accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} */
  entitlement: string;
}

export const LookupOfferAccountsCustomersEntitlementsRequest = Schema.Struct({
  entitlement: Schema.String.pipe(T.HttpPath("entitlement")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/customers/{customersId}/entitlements/{entitlementsId}:lookupOffer" }),
  svc,
) as unknown as Schema.Schema<LookupOfferAccountsCustomersEntitlementsRequest>;

export type LookupOfferAccountsCustomersEntitlementsResponse = GoogleCloudChannelV1Offer;
export const LookupOfferAccountsCustomersEntitlementsResponse = GoogleCloudChannelV1Offer;

export type LookupOfferAccountsCustomersEntitlementsError = CommonErrors;

export const lookupOfferAccountsCustomersEntitlements: API.OperationMethod<LookupOfferAccountsCustomersEntitlementsRequest, LookupOfferAccountsCustomersEntitlementsResponse, LookupOfferAccountsCustomersEntitlementsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: LookupOfferAccountsCustomersEntitlementsRequest,
  output: LookupOfferAccountsCustomersEntitlementsResponse,
  errors: [],
}));

/** List entitlement history. Possible error codes: * PERMISSION_DENIED: The reseller account making the request and the provided reseller account are different. * INVALID_ARGUMENT: Missing or invalid required fields in the request. * NOT_FOUND: The parent resource doesn't exist. Usually the result of an invalid name parameter. * INTERNAL: Any non-user error related to a technical issue in the backend. In this case, contact CloudChannel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. In this case, contact Cloud Channel support. Return value: List of EntitlementChanges. */
export interface ListEntitlementChangesAccountsCustomersEntitlementsRequest {
  /** Required. The resource name of the entitlement for which to list entitlement changes. The `-` wildcard may be used to match entitlements across a customer. Formats: * accounts/{account_id}/customers/{customer_id}/entitlements/{entitlement_id} * accounts/{account_id}/customers/{customer_id}/entitlements/- */
  parent: string;
  /** Optional. The maximum number of entitlement changes to return. The service may return fewer than this value. If unspecified, returns at most 10 entitlement changes. The maximum value is 50; the server will coerce values above 50. */
  pageSize?: number;
  /** Optional. A page token, received from a previous CloudChannelService.ListEntitlementChanges call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to CloudChannelService.ListEntitlementChanges must match the call that provided the page token. */
  pageToken?: string;
  /** Optional. Filters applied to the list results. */
  filter?: string;
}

export const ListEntitlementChangesAccountsCustomersEntitlementsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/customers/{customersId}/entitlements/{entitlementsId}:listEntitlementChanges" }),
  svc,
) as unknown as Schema.Schema<ListEntitlementChangesAccountsCustomersEntitlementsRequest>;

export type ListEntitlementChangesAccountsCustomersEntitlementsResponse = GoogleCloudChannelV1ListEntitlementChangesResponse;
export const ListEntitlementChangesAccountsCustomersEntitlementsResponse = GoogleCloudChannelV1ListEntitlementChangesResponse;

export type ListEntitlementChangesAccountsCustomersEntitlementsError = CommonErrors;

export const listEntitlementChangesAccountsCustomersEntitlements = API.makePaginated(() => ({
  input: ListEntitlementChangesAccountsCustomersEntitlementsRequest,
  output: ListEntitlementChangesAccountsCustomersEntitlementsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Gets information about how a Reseller modifies their bill before sending it to a Customer. Possible Error Codes: * PERMISSION_DENIED: If the account making the request and the account being queried are different. * NOT_FOUND: The CustomerRepricingConfig was not found. * INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the CustomerRepricingConfig resource, otherwise returns an error. */
export interface GetAccountsCustomersCustomerRepricingConfigsRequest {
  /** Required. The resource name of the CustomerRepricingConfig. Format: accounts/{account_id}/customers/{customer_id}/customerRepricingConfigs/{id}. */
  name: string;
}

export const GetAccountsCustomersCustomerRepricingConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/customers/{customersId}/customerRepricingConfigs/{customerRepricingConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsCustomersCustomerRepricingConfigsRequest>;

export type GetAccountsCustomersCustomerRepricingConfigsResponse = GoogleCloudChannelV1CustomerRepricingConfig;
export const GetAccountsCustomersCustomerRepricingConfigsResponse = GoogleCloudChannelV1CustomerRepricingConfig;

export type GetAccountsCustomersCustomerRepricingConfigsError = CommonErrors;

export const getAccountsCustomersCustomerRepricingConfigs: API.OperationMethod<GetAccountsCustomersCustomerRepricingConfigsRequest, GetAccountsCustomersCustomerRepricingConfigsResponse, GetAccountsCustomersCustomerRepricingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsCustomersCustomerRepricingConfigsRequest,
  output: GetAccountsCustomersCustomerRepricingConfigsResponse,
  errors: [],
}));

/** Lists information about how a Reseller modifies their bill before sending it to a Customer. Possible Error Codes: * PERMISSION_DENIED: If the account making the request and the account being queried are different. * NOT_FOUND: The CustomerRepricingConfig specified does not exist or is not associated with the given account. * INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the CustomerRepricingConfig resources. The data for each resource is displayed in the ascending order of: * Customer ID * RepricingConfig.EntitlementGranularity.entitlement * RepricingConfig.effective_invoice_month * CustomerRepricingConfig.update_time If unsuccessful, returns an error. */
export interface ListAccountsCustomersCustomerRepricingConfigsRequest {
  /** Required. The resource name of the customer. Parent uses the format: accounts/{account_id}/customers/{customer_id}. Supports accounts/{account_id}/customers/- to retrieve configs for all customers. */
  parent: string;
  /** Optional. The maximum number of repricing configs to return. The service may return fewer than this value. If unspecified, returns a maximum of 50 rules. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A token identifying a page of results beyond the first page. Obtained through ListCustomerRepricingConfigsResponse.next_page_token of the previous CloudChannelService.ListCustomerRepricingConfigs call. */
  pageToken?: string;
  /** Optional. A filter for [CloudChannelService.ListCustomerRepricingConfigs] results (customer only). You can use this filter when you support a BatchGet-like query. To use the filter, you must set `parent=accounts/{account_id}/customers/-`. Example: customer = accounts/account_id/customers/c1 OR customer = accounts/account_id/customers/c2. */
  filter?: string;
}

export const ListAccountsCustomersCustomerRepricingConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/customers/{customersId}/customerRepricingConfigs" }),
  svc,
) as unknown as Schema.Schema<ListAccountsCustomersCustomerRepricingConfigsRequest>;

export type ListAccountsCustomersCustomerRepricingConfigsResponse = GoogleCloudChannelV1ListCustomerRepricingConfigsResponse;
export const ListAccountsCustomersCustomerRepricingConfigsResponse = GoogleCloudChannelV1ListCustomerRepricingConfigsResponse;

export type ListAccountsCustomersCustomerRepricingConfigsError = CommonErrors;

export const listAccountsCustomersCustomerRepricingConfigs = API.makePaginated(() => ({
  input: ListAccountsCustomersCustomerRepricingConfigsRequest,
  output: ListAccountsCustomersCustomerRepricingConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a CustomerRepricingConfig. Call this method to set modifications for a specific customer's bill. You can only create configs if the RepricingConfig.effective_invoice_month is a future month. If needed, you can create a config for the current month, with some restrictions. When creating a config for a future month, make sure there are no existing configs for that RepricingConfig.effective_invoice_month. The following restrictions are for creating configs in the current month. * This functionality is reserved for recovering from an erroneous config, and should not be used for regular business cases. * The new config will not modify exports used with other configs. Changes to the config may be immediate, but may take up to 24 hours. * There is a limit of ten configs for any RepricingConfig.EntitlementGranularity.entitlement, for any RepricingConfig.effective_invoice_month. * The contained CustomerRepricingConfig.repricing_config value must be different from the value used in the current config for a RepricingConfig.EntitlementGranularity.entitlement. Possible Error Codes: * PERMISSION_DENIED: If the account making the request and the account being queried are different. * INVALID_ARGUMENT: Missing or invalid required parameters in the request. Also displays if the updated config is for the current month or past months. * NOT_FOUND: The CustomerRepricingConfig specified does not exist or is not associated with the given account. * INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the updated CustomerRepricingConfig resource, otherwise returns an error. */
export interface CreateAccountsCustomersCustomerRepricingConfigsRequest {
  /** Required. The resource name of the customer that will receive this repricing config. Parent uses the format: accounts/{account_id}/customers/{customer_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudChannelV1CustomerRepricingConfig;
}

export const CreateAccountsCustomersCustomerRepricingConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudChannelV1CustomerRepricingConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/customers/{customersId}/customerRepricingConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsCustomersCustomerRepricingConfigsRequest>;

export type CreateAccountsCustomersCustomerRepricingConfigsResponse = GoogleCloudChannelV1CustomerRepricingConfig;
export const CreateAccountsCustomersCustomerRepricingConfigsResponse = GoogleCloudChannelV1CustomerRepricingConfig;

export type CreateAccountsCustomersCustomerRepricingConfigsError = CommonErrors;

export const createAccountsCustomersCustomerRepricingConfigs: API.OperationMethod<CreateAccountsCustomersCustomerRepricingConfigsRequest, CreateAccountsCustomersCustomerRepricingConfigsResponse, CreateAccountsCustomersCustomerRepricingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsCustomersCustomerRepricingConfigsRequest,
  output: CreateAccountsCustomersCustomerRepricingConfigsResponse,
  errors: [],
}));

/** Updates a CustomerRepricingConfig. Call this method to set modifications for a specific customer's bill. This method overwrites the existing CustomerRepricingConfig. You can only update configs if the RepricingConfig.effective_invoice_month is a future month. To make changes to configs for the current month, use CreateCustomerRepricingConfig, taking note of its restrictions. You cannot update the RepricingConfig.effective_invoice_month. When updating a config in the future: * This config must already exist. Possible Error Codes: * PERMISSION_DENIED: If the account making the request and the account being queried are different. * INVALID_ARGUMENT: Missing or invalid required parameters in the request. Also displays if the updated config is for the current month or past months. * NOT_FOUND: The CustomerRepricingConfig specified does not exist or is not associated with the given account. * INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the updated CustomerRepricingConfig resource, otherwise returns an error. */
export interface PatchAccountsCustomersCustomerRepricingConfigsRequest {
  /** Output only. Resource name of the CustomerRepricingConfig. Format: accounts/{account_id}/customers/{customer_id}/customerRepricingConfigs/{id}. */
  name: string;
  /** Request body */
  body?: GoogleCloudChannelV1CustomerRepricingConfig;
}

export const PatchAccountsCustomersCustomerRepricingConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudChannelV1CustomerRepricingConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accounts/{accountsId}/customers/{customersId}/customerRepricingConfigs/{customerRepricingConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountsCustomersCustomerRepricingConfigsRequest>;

export type PatchAccountsCustomersCustomerRepricingConfigsResponse = GoogleCloudChannelV1CustomerRepricingConfig;
export const PatchAccountsCustomersCustomerRepricingConfigsResponse = GoogleCloudChannelV1CustomerRepricingConfig;

export type PatchAccountsCustomersCustomerRepricingConfigsError = CommonErrors;

export const patchAccountsCustomersCustomerRepricingConfigs: API.OperationMethod<PatchAccountsCustomersCustomerRepricingConfigsRequest, PatchAccountsCustomersCustomerRepricingConfigsResponse, PatchAccountsCustomersCustomerRepricingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountsCustomersCustomerRepricingConfigsRequest,
  output: PatchAccountsCustomersCustomerRepricingConfigsResponse,
  errors: [],
}));

/** Deletes the given CustomerRepricingConfig permanently. You can only delete configs if their RepricingConfig.effective_invoice_month is set to a date after the current month. Possible error codes: * PERMISSION_DENIED: The account making the request does not own this customer. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * FAILED_PRECONDITION: The CustomerRepricingConfig is active or in the past. * NOT_FOUND: No CustomerRepricingConfig found for the name in the request. */
export interface DeleteAccountsCustomersCustomerRepricingConfigsRequest {
  /** Required. The resource name of the customer repricing config rule to delete. Format: accounts/{account_id}/customers/{customer_id}/customerRepricingConfigs/{id}. */
  name: string;
}

export const DeleteAccountsCustomersCustomerRepricingConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/accounts/{accountsId}/customers/{customersId}/customerRepricingConfigs/{customerRepricingConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsCustomersCustomerRepricingConfigsRequest>;

export type DeleteAccountsCustomersCustomerRepricingConfigsResponse = GoogleProtobufEmpty;
export const DeleteAccountsCustomersCustomerRepricingConfigsResponse = GoogleProtobufEmpty;

export type DeleteAccountsCustomersCustomerRepricingConfigsError = CommonErrors;

export const deleteAccountsCustomersCustomerRepricingConfigs: API.OperationMethod<DeleteAccountsCustomersCustomerRepricingConfigsRequest, DeleteAccountsCustomersCustomerRepricingConfigsResponse, DeleteAccountsCustomersCustomerRepricingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsCustomersCustomerRepricingConfigsRequest,
  output: DeleteAccountsCustomersCustomerRepricingConfigsResponse,
  errors: [],
}));

/** List ChannelPartnerLinks belonging to a distributor. You must be a distributor to call this method. Possible error codes: * PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. * INVALID_ARGUMENT: Required request parameters are missing or invalid. Return value: The list of the distributor account's ChannelPartnerLink resources. */
export interface ListAccountsChannelPartnerLinksRequest {
  /** Required. The resource name of the reseller account for listing channel partner links. Parent uses the format: accounts/{account_id} */
  parent: string;
  /** Optional. Requested page size. Server might return fewer results than requested. If unspecified, server will pick a default size (25). The maximum value is 200; the server will coerce values above 200. */
  pageSize?: number;
  /** Optional. A token for a page of results other than the first page. Obtained using ListChannelPartnerLinksResponse.next_page_token of the previous CloudChannelService.ListChannelPartnerLinks call. */
  pageToken?: string;
  /** Optional. The level of granularity the ChannelPartnerLink will display. */
  view?: "UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const ListAccountsChannelPartnerLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/channelPartnerLinks" }),
  svc,
) as unknown as Schema.Schema<ListAccountsChannelPartnerLinksRequest>;

export type ListAccountsChannelPartnerLinksResponse = GoogleCloudChannelV1ListChannelPartnerLinksResponse;
export const ListAccountsChannelPartnerLinksResponse = GoogleCloudChannelV1ListChannelPartnerLinksResponse;

export type ListAccountsChannelPartnerLinksError = CommonErrors;

export const listAccountsChannelPartnerLinks = API.makePaginated(() => ({
  input: ListAccountsChannelPartnerLinksRequest,
  output: ListAccountsChannelPartnerLinksResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the requested ChannelPartnerLink resource. You must be a distributor to call this method. Possible error codes: * PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: ChannelPartnerLink resource not found because of an invalid channel partner link name. Return value: The ChannelPartnerLink resource. */
export interface GetAccountsChannelPartnerLinksRequest {
  /** Required. The resource name of the channel partner link to retrieve. Name uses the format: accounts/{account_id}/channelPartnerLinks/{id} where {id} is the Cloud Identity ID of the partner. */
  name: string;
  /** Optional. The level of granularity the ChannelPartnerLink will display. */
  view?: "UNSPECIFIED" | "BASIC" | "FULL" | (string & {});
}

export const GetAccountsChannelPartnerLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  view: Schema.optional(Schema.String).pipe(T.HttpQuery("view")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/channelPartnerLinks/{channelPartnerLinksId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsChannelPartnerLinksRequest>;

export type GetAccountsChannelPartnerLinksResponse = GoogleCloudChannelV1ChannelPartnerLink;
export const GetAccountsChannelPartnerLinksResponse = GoogleCloudChannelV1ChannelPartnerLink;

export type GetAccountsChannelPartnerLinksError = CommonErrors;

export const getAccountsChannelPartnerLinks: API.OperationMethod<GetAccountsChannelPartnerLinksRequest, GetAccountsChannelPartnerLinksResponse, GetAccountsChannelPartnerLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsChannelPartnerLinksRequest,
  output: GetAccountsChannelPartnerLinksResponse,
  errors: [],
}));

/** Initiates a channel partner link between a distributor and a reseller, or between resellers in an n-tier reseller channel. Invited partners need to follow the invite_link_uri provided in the response to accept. After accepting the invitation, a link is set up between the two parties. You must be a distributor to call this method. Possible error codes: * PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * ALREADY_EXISTS: The ChannelPartnerLink sent in the request already exists. * NOT_FOUND: No Cloud Identity customer exists for provided domain. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The new ChannelPartnerLink resource. */
export interface CreateAccountsChannelPartnerLinksRequest {
  /** Required. Create a channel partner link for the provided reseller account's resource name. Parent uses the format: accounts/{account_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudChannelV1ChannelPartnerLink;
}

export const CreateAccountsChannelPartnerLinksRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudChannelV1ChannelPartnerLink).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/channelPartnerLinks", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsChannelPartnerLinksRequest>;

export type CreateAccountsChannelPartnerLinksResponse = GoogleCloudChannelV1ChannelPartnerLink;
export const CreateAccountsChannelPartnerLinksResponse = GoogleCloudChannelV1ChannelPartnerLink;

export type CreateAccountsChannelPartnerLinksError = CommonErrors;

export const createAccountsChannelPartnerLinks: API.OperationMethod<CreateAccountsChannelPartnerLinksRequest, CreateAccountsChannelPartnerLinksResponse, CreateAccountsChannelPartnerLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsChannelPartnerLinksRequest,
  output: CreateAccountsChannelPartnerLinksResponse,
  errors: [],
}));

/** Updates a channel partner link. Distributors call this method to change a link's status. For example, to suspend a partner link. You must be a distributor to call this method. Possible error codes: * PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. * INVALID_ARGUMENT: * Required request parameters are missing or invalid. * Link state cannot change from invited to active or suspended. * Cannot send reseller_cloud_identity_id, invite_url, or name in update mask. * NOT_FOUND: ChannelPartnerLink resource not found. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The updated ChannelPartnerLink resource. */
export interface PatchAccountsChannelPartnerLinksRequest {
  /** Required. The resource name of the channel partner link to cancel. Name uses the format: accounts/{account_id}/channelPartnerLinks/{id} where {id} is the Cloud Identity ID of the partner. */
  name: string;
  /** Request body */
  body?: GoogleCloudChannelV1UpdateChannelPartnerLinkRequest;
}

export const PatchAccountsChannelPartnerLinksRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudChannelV1UpdateChannelPartnerLinkRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accounts/{accountsId}/channelPartnerLinks/{channelPartnerLinksId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountsChannelPartnerLinksRequest>;

export type PatchAccountsChannelPartnerLinksResponse = GoogleCloudChannelV1ChannelPartnerLink;
export const PatchAccountsChannelPartnerLinksResponse = GoogleCloudChannelV1ChannelPartnerLink;

export type PatchAccountsChannelPartnerLinksError = CommonErrors;

export const patchAccountsChannelPartnerLinks: API.OperationMethod<PatchAccountsChannelPartnerLinksRequest, PatchAccountsChannelPartnerLinksResponse, PatchAccountsChannelPartnerLinksError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountsChannelPartnerLinksRequest,
  output: PatchAccountsChannelPartnerLinksResponse,
  errors: [],
}));

/** List Customers. Possible error codes: * PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. * INVALID_ARGUMENT: Required request parameters are missing or invalid. Return value: List of Customers, or an empty list if there are no customers. */
export interface ListAccountsChannelPartnerLinksCustomersRequest {
  /** Required. The resource name of the reseller account to list customers from. Parent uses the format: accounts/{account_id}. */
  parent: string;
  /** Optional. The maximum number of customers to return. The service may return fewer than this value. If unspecified, returns at most 10 customers. The maximum value is 50. */
  pageSize?: number;
  /** Optional. A token identifying a page of results other than the first page. Obtained through ListCustomersResponse.next_page_token of the previous CloudChannelService.ListCustomers call. */
  pageToken?: string;
  /** Optional. Filters applied to the [CloudChannelService.ListCustomers] results. See https://cloud.google.com/channel/docs/concepts/google-cloud/filter-customers for more information. */
  filter?: string;
}

export const ListAccountsChannelPartnerLinksCustomersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/channelPartnerLinks/{channelPartnerLinksId}/customers" }),
  svc,
) as unknown as Schema.Schema<ListAccountsChannelPartnerLinksCustomersRequest>;

export type ListAccountsChannelPartnerLinksCustomersResponse = GoogleCloudChannelV1ListCustomersResponse;
export const ListAccountsChannelPartnerLinksCustomersResponse = GoogleCloudChannelV1ListCustomersResponse;

export type ListAccountsChannelPartnerLinksCustomersError = CommonErrors;

export const listAccountsChannelPartnerLinksCustomers = API.makePaginated(() => ({
  input: ListAccountsChannelPartnerLinksCustomersRequest,
  output: ListAccountsChannelPartnerLinksCustomersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Returns the requested Customer resource. Possible error codes: * PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: The customer resource doesn't exist. Usually the result of an invalid name parameter. Return value: The Customer resource. */
export interface GetAccountsChannelPartnerLinksCustomersRequest {
  /** Required. The resource name of the customer to retrieve. Name uses the format: accounts/{account_id}/customers/{customer_id} */
  name: string;
}

export const GetAccountsChannelPartnerLinksCustomersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/channelPartnerLinks/{channelPartnerLinksId}/customers/{customersId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsChannelPartnerLinksCustomersRequest>;

export type GetAccountsChannelPartnerLinksCustomersResponse = GoogleCloudChannelV1Customer;
export const GetAccountsChannelPartnerLinksCustomersResponse = GoogleCloudChannelV1Customer;

export type GetAccountsChannelPartnerLinksCustomersError = CommonErrors;

export const getAccountsChannelPartnerLinksCustomers: API.OperationMethod<GetAccountsChannelPartnerLinksCustomersRequest, GetAccountsChannelPartnerLinksCustomersResponse, GetAccountsChannelPartnerLinksCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsChannelPartnerLinksCustomersRequest,
  output: GetAccountsChannelPartnerLinksCustomersResponse,
  errors: [],
}));

/** Creates a new Customer resource under the reseller or distributor account. Possible error codes: * PERMISSION_DENIED: * The reseller account making the request is different from the reseller account in the API request. * You are not authorized to create a customer. See https://support.google.com/channelservices/answer/9759265 * INVALID_ARGUMENT: * Required request parameters are missing or invalid. * Domain field value doesn't match the primary email domain. Return value: The newly created Customer resource. */
export interface CreateAccountsChannelPartnerLinksCustomersRequest {
  /** Required. The resource name of reseller account in which to create the customer. Parent uses the format: accounts/{account_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudChannelV1Customer;
}

export const CreateAccountsChannelPartnerLinksCustomersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudChannelV1Customer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/channelPartnerLinks/{channelPartnerLinksId}/customers", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsChannelPartnerLinksCustomersRequest>;

export type CreateAccountsChannelPartnerLinksCustomersResponse = GoogleCloudChannelV1Customer;
export const CreateAccountsChannelPartnerLinksCustomersResponse = GoogleCloudChannelV1Customer;

export type CreateAccountsChannelPartnerLinksCustomersError = CommonErrors;

export const createAccountsChannelPartnerLinksCustomers: API.OperationMethod<CreateAccountsChannelPartnerLinksCustomersRequest, CreateAccountsChannelPartnerLinksCustomersResponse, CreateAccountsChannelPartnerLinksCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsChannelPartnerLinksCustomersRequest,
  output: CreateAccountsChannelPartnerLinksCustomersResponse,
  errors: [],
}));

/** Updates an existing Customer resource for the reseller or distributor. Possible error codes: * PERMISSION_DENIED: The reseller account making the request is different from the reseller account in the API request. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: No Customer resource found for the name in the request. Return value: The updated Customer resource. */
export interface PatchAccountsChannelPartnerLinksCustomersRequest {
  /** Output only. Resource name of the customer. Format: accounts/{account_id}/customers/{customer_id} */
  name: string;
  /** The update mask that applies to the resource. Optional. */
  updateMask?: string;
  /** Request body */
  body?: GoogleCloudChannelV1Customer;
}

export const PatchAccountsChannelPartnerLinksCustomersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(GoogleCloudChannelV1Customer).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accounts/{accountsId}/channelPartnerLinks/{channelPartnerLinksId}/customers/{customersId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountsChannelPartnerLinksCustomersRequest>;

export type PatchAccountsChannelPartnerLinksCustomersResponse = GoogleCloudChannelV1Customer;
export const PatchAccountsChannelPartnerLinksCustomersResponse = GoogleCloudChannelV1Customer;

export type PatchAccountsChannelPartnerLinksCustomersError = CommonErrors;

export const patchAccountsChannelPartnerLinksCustomers: API.OperationMethod<PatchAccountsChannelPartnerLinksCustomersRequest, PatchAccountsChannelPartnerLinksCustomersResponse, PatchAccountsChannelPartnerLinksCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountsChannelPartnerLinksCustomersRequest,
  output: PatchAccountsChannelPartnerLinksCustomersResponse,
  errors: [],
}));

/** Deletes the given Customer permanently. Possible error codes: * PERMISSION_DENIED: The account making the request does not own this customer. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * FAILED_PRECONDITION: The customer has existing entitlements. * NOT_FOUND: No Customer resource found for the name in the request. */
export interface DeleteAccountsChannelPartnerLinksCustomersRequest {
  /** Required. The resource name of the customer to delete. */
  name: string;
}

export const DeleteAccountsChannelPartnerLinksCustomersRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/accounts/{accountsId}/channelPartnerLinks/{channelPartnerLinksId}/customers/{customersId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsChannelPartnerLinksCustomersRequest>;

export type DeleteAccountsChannelPartnerLinksCustomersResponse = GoogleProtobufEmpty;
export const DeleteAccountsChannelPartnerLinksCustomersResponse = GoogleProtobufEmpty;

export type DeleteAccountsChannelPartnerLinksCustomersError = CommonErrors;

export const deleteAccountsChannelPartnerLinksCustomers: API.OperationMethod<DeleteAccountsChannelPartnerLinksCustomersRequest, DeleteAccountsChannelPartnerLinksCustomersResponse, DeleteAccountsChannelPartnerLinksCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsChannelPartnerLinksCustomersRequest,
  output: DeleteAccountsChannelPartnerLinksCustomersResponse,
  errors: [],
}));

/** Imports a Customer from the Cloud Identity associated with the provided Cloud Identity ID or domain before a TransferEntitlements call. If a linked Customer already exists and overwrite_if_exists is true, it will update that Customer's data. Possible error codes: * PERMISSION_DENIED: * The reseller account making the request is different from the reseller account in the API request. * You are not authorized to import the customer. See https://support.google.com/channelservices/answer/9759265 * NOT_FOUND: Cloud Identity doesn't exist or was deleted. * INVALID_ARGUMENT: Required parameters are missing, or the auth_token is expired or invalid. * ALREADY_EXISTS: A customer already exists and has conflicting critical fields. Requires an overwrite. Return value: The Customer. */
export interface ImportAccountsChannelPartnerLinksCustomersRequest {
  /** Required. The resource name of the reseller's account. Parent takes the format: accounts/{account_id} or accounts/{account_id}/channelPartnerLinks/{channel_partner_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudChannelV1ImportCustomerRequest;
}

export const ImportAccountsChannelPartnerLinksCustomersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudChannelV1ImportCustomerRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/channelPartnerLinks/{channelPartnerLinksId}/customers:import", hasBody: true }),
  svc,
) as unknown as Schema.Schema<ImportAccountsChannelPartnerLinksCustomersRequest>;

export type ImportAccountsChannelPartnerLinksCustomersResponse = GoogleCloudChannelV1Customer;
export const ImportAccountsChannelPartnerLinksCustomersResponse = GoogleCloudChannelV1Customer;

export type ImportAccountsChannelPartnerLinksCustomersError = CommonErrors;

export const importAccountsChannelPartnerLinksCustomers: API.OperationMethod<ImportAccountsChannelPartnerLinksCustomersRequest, ImportAccountsChannelPartnerLinksCustomersResponse, ImportAccountsChannelPartnerLinksCustomersError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: ImportAccountsChannelPartnerLinksCustomersRequest,
  output: ImportAccountsChannelPartnerLinksCustomersResponse,
  errors: [],
}));

/** Gets information about how a Distributor modifies their bill before sending it to a ChannelPartner. Possible Error Codes: * PERMISSION_DENIED: If the account making the request and the account being queried are different. * NOT_FOUND: The ChannelPartnerRepricingConfig was not found. * INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the ChannelPartnerRepricingConfig resource, otherwise returns an error. */
export interface GetAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest {
  /** Required. The resource name of the ChannelPartnerRepricingConfig Format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id}/channelPartnerRepricingConfigs/{id}. */
  name: string;
}

export const GetAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/channelPartnerLinks/{channelPartnerLinksId}/channelPartnerRepricingConfigs/{channelPartnerRepricingConfigsId}" }),
  svc,
) as unknown as Schema.Schema<GetAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest>;

export type GetAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse = GoogleCloudChannelV1ChannelPartnerRepricingConfig;
export const GetAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse = GoogleCloudChannelV1ChannelPartnerRepricingConfig;

export type GetAccountsChannelPartnerLinksChannelPartnerRepricingConfigsError = CommonErrors;

export const getAccountsChannelPartnerLinksChannelPartnerRepricingConfigs: API.OperationMethod<GetAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest, GetAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse, GetAccountsChannelPartnerLinksChannelPartnerRepricingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest,
  output: GetAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse,
  errors: [],
}));

/** Lists information about how a Reseller modifies their bill before sending it to a ChannelPartner. Possible Error Codes: * PERMISSION_DENIED: If the account making the request and the account being queried are different. * NOT_FOUND: The ChannelPartnerRepricingConfig specified does not exist or is not associated with the given account. * INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the ChannelPartnerRepricingConfig resources. The data for each resource is displayed in the ascending order of: * Channel Partner ID * RepricingConfig.effective_invoice_month * ChannelPartnerRepricingConfig.update_time If unsuccessful, returns an error. */
export interface ListAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest {
  /** Required. The resource name of the account's ChannelPartnerLink. Parent uses the format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id}. Supports accounts/{account_id}/channelPartnerLinks/- to retrieve configs for all channel partners. */
  parent: string;
  /** Optional. The maximum number of repricing configs to return. The service may return fewer than this value. If unspecified, returns a maximum of 50 rules. The maximum value is 100; values above 100 will be coerced to 100. */
  pageSize?: number;
  /** Optional. A token identifying a page of results beyond the first page. Obtained through ListChannelPartnerRepricingConfigsResponse.next_page_token of the previous CloudChannelService.ListChannelPartnerRepricingConfigs call. */
  pageToken?: string;
  /** Optional. A filter for [CloudChannelService.ListChannelPartnerRepricingConfigs] results (channel_partner_link only). You can use this filter when you support a BatchGet-like query. To use the filter, you must set `parent=accounts/{account_id}/channelPartnerLinks/-`. Example: `channel_partner_link = accounts/account_id/channelPartnerLinks/c1` OR `channel_partner_link = accounts/account_id/channelPartnerLinks/c2`. */
  filter?: string;
}

export const ListAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/channelPartnerLinks/{channelPartnerLinksId}/channelPartnerRepricingConfigs" }),
  svc,
) as unknown as Schema.Schema<ListAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest>;

export type ListAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse = GoogleCloudChannelV1ListChannelPartnerRepricingConfigsResponse;
export const ListAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse = GoogleCloudChannelV1ListChannelPartnerRepricingConfigsResponse;

export type ListAccountsChannelPartnerLinksChannelPartnerRepricingConfigsError = CommonErrors;

export const listAccountsChannelPartnerLinksChannelPartnerRepricingConfigs = API.makePaginated(() => ({
  input: ListAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest,
  output: ListAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Creates a ChannelPartnerRepricingConfig. Call this method to set modifications for a specific ChannelPartner's bill. You can only create configs if the RepricingConfig.effective_invoice_month is a future month. If needed, you can create a config for the current month, with some restrictions. When creating a config for a future month, make sure there are no existing configs for that RepricingConfig.effective_invoice_month. The following restrictions are for creating configs in the current month. * This functionality is reserved for recovering from an erroneous config, and should not be used for regular business cases. * The new config will not modify exports used with other configs. Changes to the config may be immediate, but may take up to 24 hours. * There is a limit of ten configs for any ChannelPartner or RepricingConfig.EntitlementGranularity.entitlement, for any RepricingConfig.effective_invoice_month. * The contained ChannelPartnerRepricingConfig.repricing_config value must be different from the value used in the current config for a ChannelPartner. Possible Error Codes: * PERMISSION_DENIED: If the account making the request and the account being queried are different. * INVALID_ARGUMENT: Missing or invalid required parameters in the request. Also displays if the updated config is for the current month or past months. * NOT_FOUND: The ChannelPartnerRepricingConfig specified does not exist or is not associated with the given account. * INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the updated ChannelPartnerRepricingConfig resource, otherwise returns an error. */
export interface CreateAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest {
  /** Required. The resource name of the ChannelPartner that will receive the repricing config. Parent uses the format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id} */
  parent: string;
  /** Request body */
  body?: GoogleCloudChannelV1ChannelPartnerRepricingConfig;
}

export const CreateAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(GoogleCloudChannelV1ChannelPartnerRepricingConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/accounts/{accountsId}/channelPartnerLinks/{channelPartnerLinksId}/channelPartnerRepricingConfigs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest>;

export type CreateAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse = GoogleCloudChannelV1ChannelPartnerRepricingConfig;
export const CreateAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse = GoogleCloudChannelV1ChannelPartnerRepricingConfig;

export type CreateAccountsChannelPartnerLinksChannelPartnerRepricingConfigsError = CommonErrors;

export const createAccountsChannelPartnerLinksChannelPartnerRepricingConfigs: API.OperationMethod<CreateAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest, CreateAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse, CreateAccountsChannelPartnerLinksChannelPartnerRepricingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest,
  output: CreateAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse,
  errors: [],
}));

/** Updates a ChannelPartnerRepricingConfig. Call this method to set modifications for a specific ChannelPartner's bill. This method overwrites the existing CustomerRepricingConfig. You can only update configs if the RepricingConfig.effective_invoice_month is a future month. To make changes to configs for the current month, use CreateChannelPartnerRepricingConfig, taking note of its restrictions. You cannot update the RepricingConfig.effective_invoice_month. When updating a config in the future: * This config must already exist. Possible Error Codes: * PERMISSION_DENIED: If the account making the request and the account being queried are different. * INVALID_ARGUMENT: Missing or invalid required parameters in the request. Also displays if the updated config is for the current month or past months. * NOT_FOUND: The ChannelPartnerRepricingConfig specified does not exist or is not associated with the given account. * INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the updated ChannelPartnerRepricingConfig resource, otherwise returns an error. */
export interface PatchAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest {
  /** Output only. Resource name of the ChannelPartnerRepricingConfig. Format: accounts/{account_id}/channelPartnerLinks/{channel_partner_id}/channelPartnerRepricingConfigs/{id}. */
  name: string;
  /** Request body */
  body?: GoogleCloudChannelV1ChannelPartnerRepricingConfig;
}

export const PatchAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(GoogleCloudChannelV1ChannelPartnerRepricingConfig).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v1/accounts/{accountsId}/channelPartnerLinks/{channelPartnerLinksId}/channelPartnerRepricingConfigs/{channelPartnerRepricingConfigsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest>;

export type PatchAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse = GoogleCloudChannelV1ChannelPartnerRepricingConfig;
export const PatchAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse = GoogleCloudChannelV1ChannelPartnerRepricingConfig;

export type PatchAccountsChannelPartnerLinksChannelPartnerRepricingConfigsError = CommonErrors;

export const patchAccountsChannelPartnerLinksChannelPartnerRepricingConfigs: API.OperationMethod<PatchAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest, PatchAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse, PatchAccountsChannelPartnerLinksChannelPartnerRepricingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest,
  output: PatchAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse,
  errors: [],
}));

/** Deletes the given ChannelPartnerRepricingConfig permanently. You can only delete configs if their RepricingConfig.effective_invoice_month is set to a date after the current month. Possible error codes: * PERMISSION_DENIED: The account making the request does not own this customer. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * FAILED_PRECONDITION: The ChannelPartnerRepricingConfig is active or in the past. * NOT_FOUND: No ChannelPartnerRepricingConfig found for the name in the request. */
export interface DeleteAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest {
  /** Required. The resource name of the channel partner repricing config rule to delete. */
  name: string;
}

export const DeleteAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v1/accounts/{accountsId}/channelPartnerLinks/{channelPartnerLinksId}/channelPartnerRepricingConfigs/{channelPartnerRepricingConfigsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest>;

export type DeleteAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse = GoogleProtobufEmpty;
export const DeleteAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse = GoogleProtobufEmpty;

export type DeleteAccountsChannelPartnerLinksChannelPartnerRepricingConfigsError = CommonErrors;

export const deleteAccountsChannelPartnerLinksChannelPartnerRepricingConfigs: API.OperationMethod<DeleteAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest, DeleteAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse, DeleteAccountsChannelPartnerLinksChannelPartnerRepricingConfigsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteAccountsChannelPartnerLinksChannelPartnerRepricingConfigsRequest,
  output: DeleteAccountsChannelPartnerLinksChannelPartnerRepricingConfigsResponse,
  errors: [],
}));

/** Lists the Rebilling supported SKU groups the account is authorized to sell. Reference: https://cloud.google.com/skus/sku-groups Possible Error Codes: * PERMISSION_DENIED: If the account making the request and the account being queried are different, or the account doesn't exist. * INTERNAL: Any non-user error related to technical issues in the backend. In this case, contact Cloud Channel support. Return Value: If successful, the SkuGroup resources. The data for each resource is displayed in the alphabetical order of SKU group display name. The data for each resource is displayed in the ascending order of SkuGroup.display_name If unsuccessful, returns an error. */
export interface ListAccountsSkuGroupsRequest {
  /** Required. The resource name of the account from which to list SKU groups. Parent uses the format: accounts/{account}. */
  parent: string;
  /** Optional. The maximum number of SKU groups to return. The service may return fewer than this value. If unspecified, returns a maximum of 1000 SKU groups. The maximum value is 1000; values above 1000 will be coerced to 1000. */
  pageSize?: number;
  /** Optional. A token identifying a page of results beyond the first page. Obtained through ListSkuGroupsResponse.next_page_token of the previous CloudChannelService.ListSkuGroups call. */
  pageToken?: string;
}

export const ListAccountsSkuGroupsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/skuGroups" }),
  svc,
) as unknown as Schema.Schema<ListAccountsSkuGroupsRequest>;

export type ListAccountsSkuGroupsResponse = GoogleCloudChannelV1ListSkuGroupsResponse;
export const ListAccountsSkuGroupsResponse = GoogleCloudChannelV1ListSkuGroupsResponse;

export type ListAccountsSkuGroupsError = CommonErrors;

export const listAccountsSkuGroups = API.makePaginated(() => ({
  input: ListAccountsSkuGroupsRequest,
  output: ListAccountsSkuGroupsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the Billable SKUs in a given SKU group. Possible error codes: PERMISSION_DENIED: If the account making the request and the account being queried for are different, or the account doesn't exist. INVALID_ARGUMENT: Missing or invalid required parameters in the request. INTERNAL: Any non-user error related to technical issue in the backend. In this case, contact cloud channel support. Return Value: If successful, the BillableSku resources. The data for each resource is displayed in the ascending order of: * BillableSku.service_display_name * BillableSku.sku_display_name If unsuccessful, returns an error. */
export interface ListAccountsSkuGroupsBillableSkusRequest {
  /** Required. Resource name of the SKU group. Format: accounts/{account}/skuGroups/{sku_group}. */
  parent: string;
  /** Optional. The maximum number of SKUs to return. The service may return fewer than this value. If unspecified, returns a maximum of 100000 SKUs. The maximum value is 100000; values above 100000 will be coerced to 100000. */
  pageSize?: number;
  /** Optional. A token identifying a page of results beyond the first page. Obtained through ListSkuGroupBillableSkusResponse.next_page_token of the previous CloudChannelService.ListSkuGroupBillableSkus call. */
  pageToken?: string;
}

export const ListAccountsSkuGroupsBillableSkusRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/skuGroups/{skuGroupsId}/billableSkus" }),
  svc,
) as unknown as Schema.Schema<ListAccountsSkuGroupsBillableSkusRequest>;

export type ListAccountsSkuGroupsBillableSkusResponse = GoogleCloudChannelV1ListSkuGroupBillableSkusResponse;
export const ListAccountsSkuGroupsBillableSkusResponse = GoogleCloudChannelV1ListSkuGroupBillableSkusResponse;

export type ListAccountsSkuGroupsBillableSkusError = CommonErrors;

export const listAccountsSkuGroupsBillableSkus = API.makePaginated(() => ({
  input: ListAccountsSkuGroupsBillableSkusRequest,
  output: ListAccountsSkuGroupsBillableSkusResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the Offers the reseller can sell. Possible error codes: * INVALID_ARGUMENT: Required request parameters are missing or invalid. */
export interface ListAccountsOffersRequest {
  /** Required. The resource name of the reseller account from which to list Offers. Parent uses the format: accounts/{account_id}. */
  parent: string;
  /** Optional. Requested page size. Server might return fewer results than requested. If unspecified, returns at most 500 Offers. The maximum value is 1000; the server will coerce values above 1000. */
  pageSize?: number;
  /** Optional. A token for a page of results other than the first page. */
  pageToken?: string;
  /** Optional. The expression to filter results by name (name of the Offer), sku.name (name of the SKU), or sku.product.name (name of the Product). Example 1: sku.product.name=products/p1 AND sku.name!=products/p1/skus/s1 Example 2: name=accounts/a1/offers/o1 */
  filter?: string;
  /** Optional. The BCP-47 language code. For example, "en-US". The response will localize in the corresponding language code, if specified. The default value is "en-US". */
  languageCode?: string;
  /** Optional. A boolean flag that determines if a response returns future offers 30 days from now. If the show_future_offers is true, the response will only contain offers that are scheduled to be available 30 days from now. */
  showFutureOffers?: boolean;
}

export const ListAccountsOffersRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
  showFutureOffers: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("showFutureOffers")),
}).pipe(
  T.Http({ method: "GET", path: "v1/accounts/{accountsId}/offers" }),
  svc,
) as unknown as Schema.Schema<ListAccountsOffersRequest>;

export type ListAccountsOffersResponse = GoogleCloudChannelV1ListOffersResponse;
export const ListAccountsOffersResponse = GoogleCloudChannelV1ListOffersResponse;

export type ListAccountsOffersError = CommonErrors;

export const listAccountsOffers = API.makePaginated(() => ({
  input: ListAccountsOffersRequest,
  output: ListAccountsOffersResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the Products the reseller is authorized to sell. Possible error codes: * INVALID_ARGUMENT: Required request parameters are missing or invalid. */
export interface ListProductsRequest {
  /** Required. The resource name of the reseller account. Format: accounts/{account_id}. */
  account?: string;
  /** Optional. Requested page size. Server might return fewer results than requested. If unspecified, returns at most 100 Products. The maximum value is 1000; the server will coerce values above 1000. */
  pageSize?: number;
  /** Optional. A token for a page of results other than the first page. */
  pageToken?: string;
  /** Optional. The BCP-47 language code. For example, "en-US". The response will localize in the corresponding language code, if specified. The default value is "en-US". */
  languageCode?: string;
}

export const ListProductsRequest = Schema.Struct({
  account: Schema.optional(Schema.String).pipe(T.HttpQuery("account")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v1/products" }),
  svc,
) as unknown as Schema.Schema<ListProductsRequest>;

export type ListProductsResponse = GoogleCloudChannelV1ListProductsResponse;
export const ListProductsResponse = GoogleCloudChannelV1ListProductsResponse;

export type ListProductsError = CommonErrors;

export const listProducts = API.makePaginated(() => ({
  input: ListProductsRequest,
  output: ListProductsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Lists the SKUs for a product the reseller is authorized to sell. Possible error codes: * INVALID_ARGUMENT: Required request parameters are missing or invalid. */
export interface ListProductsSkusRequest {
  /** Required. The resource name of the Product to list SKUs for. Parent uses the format: products/{product_id}. Supports products/- to retrieve SKUs for all products. */
  parent: string;
  /** Required. Resource name of the reseller. Format: accounts/{account_id}. */
  account?: string;
  /** Optional. Requested page size. Server might return fewer results than requested. If unspecified, returns at most 100 SKUs. The maximum value is 1000; the server will coerce values above 1000. */
  pageSize?: number;
  /** Optional. A token for a page of results other than the first page. Optional. */
  pageToken?: string;
  /** Optional. The BCP-47 language code. For example, "en-US". The response will localize in the corresponding language code, if specified. The default value is "en-US". */
  languageCode?: string;
}

export const ListProductsSkusRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  account: Schema.optional(Schema.String).pipe(T.HttpQuery("account")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  languageCode: Schema.optional(Schema.String).pipe(T.HttpQuery("languageCode")),
}).pipe(
  T.Http({ method: "GET", path: "v1/products/{productsId}/skus" }),
  svc,
) as unknown as Schema.Schema<ListProductsSkusRequest>;

export type ListProductsSkusResponse = GoogleCloudChannelV1ListSkusResponse;
export const ListProductsSkusResponse = GoogleCloudChannelV1ListSkusResponse;

export type ListProductsSkusError = CommonErrors;

export const listProductsSkus = API.makePaginated(() => ({
  input: ListProductsSkusRequest,
  output: ListProductsSkusResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Registers a service account with subscriber privileges on the Pub/Sub topic for this Channel Services account or integrator. After you create a subscriber, you get the events through SubscriberEvent Possible error codes: * PERMISSION_DENIED: The reseller account making the request and the provided reseller account are different, or the impersonated user is not a super admin. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The topic name with the registered service email address. */
export interface RegisterSubscriberIntegratorsRequest {
  /** Optional. Resource name of the integrator. Required if account is not provided. Otherwise, leave this field empty/unset. */
  integrator: string;
  /** Request body */
  body?: GoogleCloudChannelV1RegisterSubscriberRequest;
}

export const RegisterSubscriberIntegratorsRequest = Schema.Struct({
  integrator: Schema.String.pipe(T.HttpPath("integrator")),
  body: Schema.optional(GoogleCloudChannelV1RegisterSubscriberRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/integrators/{integratorsId}:registerSubscriber", hasBody: true }),
  svc,
) as unknown as Schema.Schema<RegisterSubscriberIntegratorsRequest>;

export type RegisterSubscriberIntegratorsResponse = GoogleCloudChannelV1RegisterSubscriberResponse;
export const RegisterSubscriberIntegratorsResponse = GoogleCloudChannelV1RegisterSubscriberResponse;

export type RegisterSubscriberIntegratorsError = CommonErrors;

export const registerSubscriberIntegrators: API.OperationMethod<RegisterSubscriberIntegratorsRequest, RegisterSubscriberIntegratorsResponse, RegisterSubscriberIntegratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: RegisterSubscriberIntegratorsRequest,
  output: RegisterSubscriberIntegratorsResponse,
  errors: [],
}));

/** Unregisters a service account with subscriber privileges on the Pub/Sub topic created for this Channel Services account or integrator. If there are no service accounts left with subscriber privileges, this deletes the topic. You can call ListSubscribers to check for these accounts. Possible error codes: * PERMISSION_DENIED: The reseller account making the request and the provided reseller account are different, or the impersonated user is not a super admin. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: The topic resource doesn't exist. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: The topic name that unregistered the service email address. Returns a success response if the service email address wasn't registered with the topic. */
export interface UnregisterSubscriberIntegratorsRequest {
  /** Optional. Resource name of the integrator. Required if account is not provided. Otherwise, leave this field empty/unset. */
  integrator: string;
  /** Request body */
  body?: GoogleCloudChannelV1UnregisterSubscriberRequest;
}

export const UnregisterSubscriberIntegratorsRequest = Schema.Struct({
  integrator: Schema.String.pipe(T.HttpPath("integrator")),
  body: Schema.optional(GoogleCloudChannelV1UnregisterSubscriberRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v1/integrators/{integratorsId}:unregisterSubscriber", hasBody: true }),
  svc,
) as unknown as Schema.Schema<UnregisterSubscriberIntegratorsRequest>;

export type UnregisterSubscriberIntegratorsResponse = GoogleCloudChannelV1UnregisterSubscriberResponse;
export const UnregisterSubscriberIntegratorsResponse = GoogleCloudChannelV1UnregisterSubscriberResponse;

export type UnregisterSubscriberIntegratorsError = CommonErrors;

export const unregisterSubscriberIntegrators: API.OperationMethod<UnregisterSubscriberIntegratorsRequest, UnregisterSubscriberIntegratorsResponse, UnregisterSubscriberIntegratorsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: UnregisterSubscriberIntegratorsRequest,
  output: UnregisterSubscriberIntegratorsResponse,
  errors: [],
}));

/** Lists service accounts with subscriber privileges on the Pub/Sub topic created for this Channel Services account or integrator. Possible error codes: * PERMISSION_DENIED: The reseller account making the request and the provided reseller account are different, or the impersonated user is not a super admin. * INVALID_ARGUMENT: Required request parameters are missing or invalid. * NOT_FOUND: The topic resource doesn't exist. * INTERNAL: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. * UNKNOWN: Any non-user error related to a technical issue in the backend. Contact Cloud Channel support. Return value: A list of service email addresses. */
export interface ListSubscribersIntegratorsRequest {
  /** Optional. Resource name of the integrator. Required if account is not provided. Otherwise, leave this field empty/unset. */
  integrator: string;
  /** Optional. Resource name of the account. Required if integrator is not provided. Otherwise, leave this field empty/unset. */
  account?: string;
  /** Optional. The maximum number of service accounts to return. The service may return fewer than this value. If unspecified, returns at most 100 service accounts. The maximum value is 1000; the server will coerce values above 1000. */
  pageSize?: number;
  /** Optional. A page token, received from a previous `ListSubscribers` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSubscribers` must match the call that provided the page token. */
  pageToken?: string;
}

export const ListSubscribersIntegratorsRequest = Schema.Struct({
  integrator: Schema.String.pipe(T.HttpPath("integrator")),
  account: Schema.optional(Schema.String).pipe(T.HttpQuery("account")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
}).pipe(
  T.Http({ method: "GET", path: "v1/integrators/{integratorsId}:listSubscribers" }),
  svc,
) as unknown as Schema.Schema<ListSubscribersIntegratorsRequest>;

export type ListSubscribersIntegratorsResponse = GoogleCloudChannelV1ListSubscribersResponse;
export const ListSubscribersIntegratorsResponse = GoogleCloudChannelV1ListSubscribersResponse;

export type ListSubscribersIntegratorsError = CommonErrors;

export const listSubscribersIntegrators = API.makePaginated(() => ({
  input: ListSubscribersIntegratorsRequest,
  output: ListSubscribersIntegratorsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

