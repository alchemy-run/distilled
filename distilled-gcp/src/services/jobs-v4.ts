// ==========================================================================
// Cloud Talent Solution API (jobs v4)
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
  name: "jobs",
  version: "v4",
  rootUrl: "https://jobs.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface PostalAddress {
  /** Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland. */
  regionCode?: string;
  /** Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States). */
  postalCode?: string;
  /** Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`. */
  locality?: string;
  /** Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d'Ivoire). */
  sortingCode?: string;
  /** Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information. */
  recipients?: Array<string>;
  /** Optional. The name of the organization at the address. */
  organization?: string;
  /** Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district. */
  sublocality?: string;
  /** The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions. */
  revision?: number;
  /** Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en". */
  languageCode?: string;
  /** Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don't use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated. */
  administrativeArea?: string;
  /** Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas). */
  addressLines?: Array<string>;
}

export const PostalAddress: Schema.Schema<PostalAddress> = Schema.suspend(() => Schema.Struct({
  regionCode: Schema.optional(Schema.String),
  postalCode: Schema.optional(Schema.String),
  locality: Schema.optional(Schema.String),
  sortingCode: Schema.optional(Schema.String),
  recipients: Schema.optional(Schema.Array(Schema.String)),
  organization: Schema.optional(Schema.String),
  sublocality: Schema.optional(Schema.String),
  revision: Schema.optional(Schema.Number),
  languageCode: Schema.optional(Schema.String),
  administrativeArea: Schema.optional(Schema.String),
  addressLines: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "PostalAddress" }) as any as Schema.Schema<PostalAddress>;

export interface LatLng {
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  longitude?: number;
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  latitude?: number;
}

export const LatLng: Schema.Schema<LatLng> = Schema.suspend(() => Schema.Struct({
  longitude: Schema.optional(Schema.Number),
  latitude: Schema.optional(Schema.Number),
})).annotate({ identifier: "LatLng" }) as any as Schema.Schema<LatLng>;

export interface Location {
  /** Radius in miles of the job location. This value is derived from the location bounding box in which a circle with the specified radius centered from google.type.LatLng covers the area associated with the job location. For example, currently, "Mountain View, CA, USA" has a radius of 6.17 miles. */
  radiusMiles?: number;
  /** Postal address of the location that includes human readable information, such as postal delivery and payments addresses. Given a postal address, a postal service can deliver items to a premises, P.O. Box, or other delivery location. */
  postalAddress?: PostalAddress;
  /** The type of a location, which corresponds to the address lines field of google.type.PostalAddress. For example, "Downtown, Atlanta, GA, USA" has a type of LocationType.NEIGHBORHOOD, and "Kansas City, KS, USA" has a type of LocationType.LOCALITY. */
  locationType?: "LOCATION_TYPE_UNSPECIFIED" | "COUNTRY" | "ADMINISTRATIVE_AREA" | "SUB_ADMINISTRATIVE_AREA" | "LOCALITY" | "POSTAL_CODE" | "SUB_LOCALITY" | "SUB_LOCALITY_1" | "SUB_LOCALITY_2" | "NEIGHBORHOOD" | "STREET_ADDRESS" | (string & {});
  /** An object representing a latitude/longitude pair. */
  latLng?: LatLng;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() => Schema.Struct({
  radiusMiles: Schema.optional(Schema.Number),
  postalAddress: Schema.optional(PostalAddress),
  locationType: Schema.optional(Schema.String),
  latLng: Schema.optional(LatLng),
})).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface JobDerivedInfo {
  /** Job categories derived from Job.title and Job.description. */
  jobCategories?: Array<"JOB_CATEGORY_UNSPECIFIED" | "ACCOUNTING_AND_FINANCE" | "ADMINISTRATIVE_AND_OFFICE" | "ADVERTISING_AND_MARKETING" | "ANIMAL_CARE" | "ART_FASHION_AND_DESIGN" | "BUSINESS_OPERATIONS" | "CLEANING_AND_FACILITIES" | "COMPUTER_AND_IT" | "CONSTRUCTION" | "CUSTOMER_SERVICE" | "EDUCATION" | "ENTERTAINMENT_AND_TRAVEL" | "FARMING_AND_OUTDOORS" | "HEALTHCARE" | "HUMAN_RESOURCES" | "INSTALLATION_MAINTENANCE_AND_REPAIR" | "LEGAL" | "MANAGEMENT" | "MANUFACTURING_AND_WAREHOUSE" | "MEDIA_COMMUNICATIONS_AND_WRITING" | "OIL_GAS_AND_MINING" | "PERSONAL_CARE_AND_SERVICES" | "PROTECTIVE_SERVICES" | "REAL_ESTATE" | "RESTAURANT_AND_HOSPITALITY" | "SALES_AND_RETAIL" | "SCIENCE_AND_ENGINEERING" | "SOCIAL_SERVICES_AND_NON_PROFIT" | "SPORTS_FITNESS_AND_RECREATION" | "TRANSPORTATION_AND_LOGISTICS" | (string & {})>;
  /** Structured locations of the job, resolved from Job.addresses. locations are exactly matched to Job.addresses in the same order. */
  locations?: Array<Location>;
}

export const JobDerivedInfo: Schema.Schema<JobDerivedInfo> = Schema.suspend(() => Schema.Struct({
  jobCategories: Schema.optional(Schema.Array(Schema.String)),
  locations: Schema.optional(Schema.Array(Location)),
})).annotate({ identifier: "JobDerivedInfo" }) as any as Schema.Schema<JobDerivedInfo>;

export interface BatchDeleteJobsRequest {
  /** The names of the jobs to delete. The format is "projects/{project_id}/tenants/{tenant_id}/jobs/{job_id}". For example, "projects/foo/tenants/bar/jobs/baz". A maximum of 200 jobs can be deleted in a batch. */
  names?: Array<string>;
}

export const BatchDeleteJobsRequest: Schema.Schema<BatchDeleteJobsRequest> = Schema.suspend(() => Schema.Struct({
  names: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "BatchDeleteJobsRequest" }) as any as Schema.Schema<BatchDeleteJobsRequest>;

export interface CommuteInfo {
  /** The number of seconds required to travel to the job location from the query location. A duration of 0 seconds indicates that the job isn't reachable within the requested duration, but was returned as part of an expanded query. */
  travelDuration?: string;
  /** Location used as the destination in the commute calculation. */
  jobLocation?: Location;
}

export const CommuteInfo: Schema.Schema<CommuteInfo> = Schema.suspend(() => Schema.Struct({
  travelDuration: Schema.optional(Schema.String),
  jobLocation: Schema.optional(Location),
})).annotate({ identifier: "CommuteInfo" }) as any as Schema.Schema<CommuteInfo>;

export interface HistogramQueryResult {
  /** Requested histogram expression. */
  histogramQuery?: string;
  /** A map from the values of the facet associated with distinct values to the number of matching entries with corresponding value. The key format is: * (for string histogram) string values stored in the field. * (for named numeric bucket) name specified in `bucket()` function, like for `bucket(0, MAX, "non-negative")`, the key will be `non-negative`. * (for anonymous numeric bucket) range formatted as `-`, for example, `0-1000`, `MIN-0`, and `0-MAX`. */
  histogram?: Record<string, string>;
}

export const HistogramQueryResult: Schema.Schema<HistogramQueryResult> = Schema.suspend(() => Schema.Struct({
  histogramQuery: Schema.optional(Schema.String),
  histogram: Schema.optional(Schema.Record(Schema.String, Schema.String)),
})).annotate({ identifier: "HistogramQueryResult" }) as any as Schema.Schema<HistogramQueryResult>;

export interface Money {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
}

export const Money: Schema.Schema<Money> = Schema.suspend(() => Schema.Struct({
  currencyCode: Schema.optional(Schema.String),
  nanos: Schema.optional(Schema.Number),
  units: Schema.optional(Schema.String),
})).annotate({ identifier: "Money" }) as any as Schema.Schema<Money>;

export interface CompensationRange {
  /** The maximum amount of compensation. If left empty, the value is set to a maximal compensation value and the currency code is set to match the currency code of min_compensation. */
  maxCompensation?: Money;
  /** The minimum amount of compensation. If left empty, the value is set to zero and the currency code is set to match the currency code of max_compensation. */
  minCompensation?: Money;
}

export const CompensationRange: Schema.Schema<CompensationRange> = Schema.suspend(() => Schema.Struct({
  maxCompensation: Schema.optional(Money),
  minCompensation: Schema.optional(Money),
})).annotate({ identifier: "CompensationRange" }) as any as Schema.Schema<CompensationRange>;

export interface ResponseMetadata {
  /** A unique id associated with this call. This id is logged for tracking purposes. */
  requestId?: string;
}

export const ResponseMetadata: Schema.Schema<ResponseMetadata> = Schema.suspend(() => Schema.Struct({
  requestId: Schema.optional(Schema.String),
})).annotate({ identifier: "ResponseMetadata" }) as any as Schema.Schema<ResponseMetadata>;

export interface ApplicationInfo {
  /** Use this field to provide instructions, such as "Mail your application to ...", that a candidate can follow to apply for the job. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 3,000. */
  instruction?: string;
  /** Use this URI field to direct an applicant to a website, for example to link to an online application form. The maximum number of allowed characters for each entry is 2,000. */
  uris?: Array<string>;
  /** Use this field to specify email address(es) to which resumes or applications can be sent. The maximum number of allowed characters for each entry is 255. */
  emails?: Array<string>;
}

export const ApplicationInfo: Schema.Schema<ApplicationInfo> = Schema.suspend(() => Schema.Struct({
  instruction: Schema.optional(Schema.String),
  uris: Schema.optional(Schema.Array(Schema.String)),
  emails: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "ApplicationInfo" }) as any as Schema.Schema<ApplicationInfo>;

export interface TimestampRange {
  /** End of the period (exclusive). */
  endTime?: string;
  /** Begin of the period (inclusive). */
  startTime?: string;
}

export const TimestampRange: Schema.Schema<TimestampRange> = Schema.suspend(() => Schema.Struct({
  endTime: Schema.optional(Schema.String),
  startTime: Schema.optional(Schema.String),
})).annotate({ identifier: "TimestampRange" }) as any as Schema.Schema<TimestampRange>;

export interface TimeOfDay {
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() => Schema.Struct({
  nanos: Schema.optional(Schema.Number),
  minutes: Schema.optional(Schema.Number),
  hours: Schema.optional(Schema.Number),
  seconds: Schema.optional(Schema.Number),
})).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface CommuteFilter {
  /** Required. The method of transportation to calculate the commute time for. */
  commuteMethod?: "COMMUTE_METHOD_UNSPECIFIED" | "DRIVING" | "TRANSIT" | "WALKING" | "CYCLING" | "TRANSIT_ACCESSIBLE" | (string & {});
  /** Required. The maximum travel time in seconds. The maximum allowed value is `3600s` (one hour). Format is `123s`. */
  travelDuration?: string;
  /** Required. The latitude and longitude of the location to calculate the commute time from. */
  startCoordinates?: LatLng;
  /** If `true`, jobs without street level addresses may also be returned. For city level addresses, the city center is used. For state and coarser level addresses, text matching is used. If this field is set to `false` or isn't specified, only jobs that include street level addresses will be returned by commute search. */
  allowImpreciseAddresses?: boolean;
  /** Specifies the traffic density to use when calculating commute time. */
  roadTraffic?: "ROAD_TRAFFIC_UNSPECIFIED" | "TRAFFIC_FREE" | "BUSY_HOUR" | (string & {});
  /** The departure time used to calculate traffic impact, represented as google.type.TimeOfDay in local time zone. Currently traffic model is restricted to hour level resolution. */
  departureTime?: TimeOfDay;
}

export const CommuteFilter: Schema.Schema<CommuteFilter> = Schema.suspend(() => Schema.Struct({
  commuteMethod: Schema.optional(Schema.String),
  travelDuration: Schema.optional(Schema.String),
  startCoordinates: Schema.optional(LatLng),
  allowImpreciseAddresses: Schema.optional(Schema.Boolean),
  roadTraffic: Schema.optional(Schema.String),
  departureTime: Schema.optional(TimeOfDay),
})).annotate({ identifier: "CommuteFilter" }) as any as Schema.Schema<CommuteFilter>;

export interface CompensationFilter {
  /** Required. Type of filter. */
  type?: "FILTER_TYPE_UNSPECIFIED" | "UNIT_ONLY" | "UNIT_AND_AMOUNT" | "ANNUALIZED_BASE_AMOUNT" | "ANNUALIZED_TOTAL_AMOUNT" | (string & {});
  /** If set to true, jobs with unspecified compensation range fields are included. */
  includeJobsWithUnspecifiedCompensationRange?: boolean;
  /** Required. Specify desired `base compensation entry's` CompensationInfo.CompensationUnit. */
  units?: Array<"COMPENSATION_UNIT_UNSPECIFIED" | "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "ONE_TIME" | "OTHER_COMPENSATION_UNIT" | (string & {})>;
  /** Compensation range. */
  range?: CompensationRange;
}

export const CompensationFilter: Schema.Schema<CompensationFilter> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  includeJobsWithUnspecifiedCompensationRange: Schema.optional(Schema.Boolean),
  units: Schema.optional(Schema.Array(Schema.String)),
  range: Schema.optional(CompensationRange),
})).annotate({ identifier: "CompensationFilter" }) as any as Schema.Schema<CompensationFilter>;

export interface LocationFilter {
  /** The latitude and longitude of the geographic center to search from. This field is ignored if `address` is provided. */
  latLng?: LatLng;
  /** Allows the client to return jobs without a set location, specifically, telecommuting jobs (telecommuting is considered by the service as a special location). Job.posting_region indicates if a job permits telecommuting. If this field is set to TelecommutePreference.TELECOMMUTE_ALLOWED, telecommuting jobs are searched, and address and lat_lng are ignored. If not set or set to TelecommutePreference.TELECOMMUTE_EXCLUDED, the telecommute status of the jobs is ignored. Jobs that have PostingRegion.TELECOMMUTE and have additional Job.addresses may still be matched based on other location filters using address or lat_lng. This filter can be used by itself to search exclusively for telecommuting jobs, or it can be combined with another location filter to search for a combination of job locations, such as "Mountain View" or "telecommuting" jobs. However, when used in combination with other location filters, telecommuting jobs can be treated as less relevant than other jobs in the search response. This field is only used for job search requests. */
  telecommutePreference?: "TELECOMMUTE_PREFERENCE_UNSPECIFIED" | "TELECOMMUTE_EXCLUDED" | "TELECOMMUTE_ALLOWED" | "TELECOMMUTE_JOBS_EXCLUDED" | (string & {});
  /** CLDR region code of the country/region. This field may be used in two ways: 1) If telecommute preference is not set, this field is used address ambiguity of the user-input address. For example, "Liverpool" may refer to "Liverpool, NY, US" or "Liverpool, UK". This region code biases the address resolution toward a specific country or territory. If this field is not set, address resolution is biased toward the United States by default. 2) If telecommute preference is set to TELECOMMUTE_ALLOWED, the telecommute location filter will be limited to the region specified in this field. If this field is not set, the telecommute job locations will not be See https://unicode-org.github.io/cldr-staging/charts/latest/supplemental/territory_information.html for details. Example: "CH" for Switzerland. */
  regionCode?: string;
  /** The distance_in_miles is applied when the location being searched for is identified as a city or smaller. This field is ignored if the location being searched for is a state or larger. */
  distanceInMiles?: number;
  /** The address name, such as "Mountain View" or "Bay Area". */
  address?: string;
}

export const LocationFilter: Schema.Schema<LocationFilter> = Schema.suspend(() => Schema.Struct({
  latLng: Schema.optional(LatLng),
  telecommutePreference: Schema.optional(Schema.String),
  regionCode: Schema.optional(Schema.String),
  distanceInMiles: Schema.optional(Schema.Number),
  address: Schema.optional(Schema.String),
})).annotate({ identifier: "LocationFilter" }) as any as Schema.Schema<LocationFilter>;

export interface JobQuery {
  /** The language code of query. For example, "en-US". This field helps to better interpret the query. If a value isn't specified, the query language code is automatically detected, which may not be accurate. Language code should be in BCP-47 format, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47). */
  queryLanguageCode?: string;
  /** This filter specifies the company Company.display_name of the jobs to search against. The company name must match the value exactly. Alternatively, the value being searched for can be wrapped in different match operators. `SUBSTRING_MATCH([value])` The company name must contain a case insensitive substring match of the value. Using this function may increase latency. Sample Value: `SUBSTRING_MATCH(google)` `MULTI_WORD_TOKEN_MATCH([value])` The value will be treated as a multi word token and the company name must contain a case insensitive match of the value. Using this function may increase latency. Sample Value: `MULTI_WORD_TOKEN_MATCH(google)` If a value isn't specified, jobs within the search results are associated with any company. If multiple values are specified, jobs within the search results may be associated with any of the specified companies. At most 20 company display name filters are allowed. */
  companyDisplayNames?: Array<string>;
  /** The query string that matches against the job title, description, and location fields. The maximum number of allowed characters is 255. */
  query?: string;
  /** Jobs published within a range specified by this filter are searched against. */
  publishTimeRange?: TimestampRange;
  /** This filter specifies the company entities to search against. If a value isn't specified, jobs are searched for against all companies. If multiple values are specified, jobs are searched against the companies specified. The format is "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}". For example, "projects/foo/tenants/bar/companies/baz". At most 20 company filters are allowed. */
  companies?: Array<string>;
  /** This filter specifies the locale of jobs to search against, for example, "en-US". If a value isn't specified, the search results can contain jobs in any locale. Language codes should be in BCP-47 format, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47). At most 10 language code filters are allowed. */
  languageCodes?: Array<string>;
  /** This filter specifies a list of job names to be excluded during search. At most 400 excluded job names are allowed. */
  excludedJobs?: Array<string>;
  /** The category filter specifies the categories of jobs to search against. See JobCategory for more information. If a value isn't specified, jobs from any category are searched against. If multiple values are specified, jobs from any of the specified categories are searched against. */
  jobCategories?: Array<"JOB_CATEGORY_UNSPECIFIED" | "ACCOUNTING_AND_FINANCE" | "ADMINISTRATIVE_AND_OFFICE" | "ADVERTISING_AND_MARKETING" | "ANIMAL_CARE" | "ART_FASHION_AND_DESIGN" | "BUSINESS_OPERATIONS" | "CLEANING_AND_FACILITIES" | "COMPUTER_AND_IT" | "CONSTRUCTION" | "CUSTOMER_SERVICE" | "EDUCATION" | "ENTERTAINMENT_AND_TRAVEL" | "FARMING_AND_OUTDOORS" | "HEALTHCARE" | "HUMAN_RESOURCES" | "INSTALLATION_MAINTENANCE_AND_REPAIR" | "LEGAL" | "MANAGEMENT" | "MANUFACTURING_AND_WAREHOUSE" | "MEDIA_COMMUNICATIONS_AND_WRITING" | "OIL_GAS_AND_MINING" | "PERSONAL_CARE_AND_SERVICES" | "PROTECTIVE_SERVICES" | "REAL_ESTATE" | "RESTAURANT_AND_HOSPITALITY" | "SALES_AND_RETAIL" | "SCIENCE_AND_ENGINEERING" | "SOCIAL_SERVICES_AND_NON_PROFIT" | "SPORTS_FITNESS_AND_RECREATION" | "TRANSPORTATION_AND_LOGISTICS" | (string & {})>;
  /** Allows filtering jobs by commute time with different travel methods (for example, driving or public transit). Note: This only works when you specify a CommuteMethod. In this case, location_filters is ignored. Currently we don't support sorting by commute time. */
  commuteFilter?: CommuteFilter;
  /** This flag controls the spell-check feature. If false, the service attempts to correct a misspelled query, for example, "enginee" is corrected to "engineer". Defaults to false: a spell check is performed. */
  disableSpellCheck?: boolean;
  /** This filter specifies a structured syntax to match against the Job.custom_attributes marked as `filterable`. The syntax for this expression is a subset of SQL syntax. Supported operators are: `=`, `!=`, `<`, `<=`, `>`, and `>=` where the left of the operator is a custom field key and the right of the operator is a number or a quoted string. You must escape backslash (\\) and quote (\") characters. Supported functions are `LOWER([field_name])` to perform a case insensitive match and `EMPTY([field_name])` to filter on the existence of a key. Boolean expressions (AND/OR/NOT) are supported up to 3 levels of nesting (for example, "((A AND B AND C) OR NOT D) AND E"), a maximum of 100 comparisons or functions are allowed in the expression. The expression must be < 10000 bytes in length. Sample Query: `(LOWER(driving_license)="class \"a\"" OR EMPTY(driving_license)) AND driving_years > 10` */
  customAttributeFilter?: string;
  /** The employment type filter specifies the employment type of jobs to search against, such as EmploymentType.FULL_TIME. If a value isn't specified, jobs in the search results includes any employment type. If multiple values are specified, jobs in the search results include any of the specified employment types. */
  employmentTypes?: Array<"EMPLOYMENT_TYPE_UNSPECIFIED" | "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "CONTRACT_TO_HIRE" | "TEMPORARY" | "INTERN" | "VOLUNTEER" | "PER_DIEM" | "FLY_IN_FLY_OUT" | "OTHER_EMPLOYMENT_TYPE" | (string & {})>;
  /** This search filter is applied only to Job.compensation_info. For example, if the filter is specified as "Hourly job with per-hour compensation > $15", only jobs meeting these criteria are searched. If a filter isn't defined, all open jobs are searched. */
  compensationFilter?: CompensationFilter;
  /** The location filter specifies geo-regions containing the jobs to search against. See LocationFilter for more information. If a location value isn't specified, jobs fitting the other search criteria are retrieved regardless of where they're located. If multiple values are specified, jobs are retrieved from any of the specified locations. If different values are specified for the LocationFilter.distance_in_miles parameter, the maximum provided distance is used for all locations. At most 5 location filters are allowed. */
  locationFilters?: Array<LocationFilter>;
}

export const JobQuery: Schema.Schema<JobQuery> = Schema.suspend(() => Schema.Struct({
  queryLanguageCode: Schema.optional(Schema.String),
  companyDisplayNames: Schema.optional(Schema.Array(Schema.String)),
  query: Schema.optional(Schema.String),
  publishTimeRange: Schema.optional(TimestampRange),
  companies: Schema.optional(Schema.Array(Schema.String)),
  languageCodes: Schema.optional(Schema.Array(Schema.String)),
  excludedJobs: Schema.optional(Schema.Array(Schema.String)),
  jobCategories: Schema.optional(Schema.Array(Schema.String)),
  commuteFilter: Schema.optional(CommuteFilter),
  disableSpellCheck: Schema.optional(Schema.Boolean),
  customAttributeFilter: Schema.optional(Schema.String),
  employmentTypes: Schema.optional(Schema.Array(Schema.String)),
  compensationFilter: Schema.optional(CompensationFilter),
  locationFilters: Schema.optional(Schema.Array(LocationFilter)),
})).annotate({ identifier: "JobQuery" }) as any as Schema.Schema<JobQuery>;

export interface CompensationEntry {
  /** Frequency of the specified amount. Default is CompensationUnit.COMPENSATION_UNIT_UNSPECIFIED. */
  unit?: "COMPENSATION_UNIT_UNSPECIFIED" | "HOURLY" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | "ONE_TIME" | "OTHER_COMPENSATION_UNIT" | (string & {});
  /** Compensation amount. */
  amount?: Money;
  /** Compensation range. */
  range?: CompensationRange;
  /** Expected number of units paid each year. If not specified, when Job.employment_types is FULLTIME, a default value is inferred based on unit. Default values: - HOURLY: 2080 - DAILY: 260 - WEEKLY: 52 - MONTHLY: 12 - ANNUAL: 1 */
  expectedUnitsPerYear?: number;
  /** Compensation description. For example, could indicate equity terms or provide additional context to an estimated bonus. */
  description?: string;
  /** Compensation type. Default is CompensationType.COMPENSATION_TYPE_UNSPECIFIED. */
  type?: "COMPENSATION_TYPE_UNSPECIFIED" | "BASE" | "BONUS" | "SIGNING_BONUS" | "EQUITY" | "PROFIT_SHARING" | "COMMISSIONS" | "TIPS" | "OTHER_COMPENSATION_TYPE" | (string & {});
}

export const CompensationEntry: Schema.Schema<CompensationEntry> = Schema.suspend(() => Schema.Struct({
  unit: Schema.optional(Schema.String),
  amount: Schema.optional(Money),
  range: Schema.optional(CompensationRange),
  expectedUnitsPerYear: Schema.optional(Schema.Number),
  description: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "CompensationEntry" }) as any as Schema.Schema<CompensationEntry>;

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

export interface CustomRankingInfo {
  /** Required. Controls over how job documents get ranked on top of existing relevance score (determined by API algorithm). A combination of the ranking expression and relevance score is used to determine job's final ranking position. The syntax for this expression is a subset of Google SQL syntax. Supported operators are: +, -, *, /, where the left and right side of the operator is either a numeric Job.custom_attributes key, integer/double value or an expression that can be evaluated to a number. Parenthesis are supported to adjust calculation precedence. The expression must be < 200 characters in length. The expression is considered invalid for a job if the expression references custom attributes that are not populated on the job or if the expression results in a divide by zero. If an expression is invalid for a job, that job is demoted to the end of the results. Sample ranking expression (year + 25) * 0.25 - (freshness / 0.5) */
  rankingExpression?: string;
  /** Required. Controls over how important the score of CustomRankingInfo.ranking_expression gets applied to job's final ranking position. An error is thrown if not specified. */
  importanceLevel?: "IMPORTANCE_LEVEL_UNSPECIFIED" | "NONE" | "LOW" | "MILD" | "MEDIUM" | "HIGH" | "EXTREME" | (string & {});
}

export const CustomRankingInfo: Schema.Schema<CustomRankingInfo> = Schema.suspend(() => Schema.Struct({
  rankingExpression: Schema.optional(Schema.String),
  importanceLevel: Schema.optional(Schema.String),
})).annotate({ identifier: "CustomRankingInfo" }) as any as Schema.Schema<CustomRankingInfo>;

export interface ProcessingOptions {
  /** Option for job HTML content sanitization. Applied fields are: * description * applicationInfo.instruction * incentives * qualifications * responsibilities HTML tags in these fields may be stripped if sanitiazation isn't disabled. Defaults to HtmlSanitization.SIMPLE_FORMATTING_ONLY. */
  htmlSanitization?: "HTML_SANITIZATION_UNSPECIFIED" | "HTML_SANITIZATION_DISABLED" | "SIMPLE_FORMATTING_ONLY" | (string & {});
  /** If set to `true`, the service does not attempt to resolve a more precise address for the job. */
  disableStreetAddressResolution?: boolean;
}

export const ProcessingOptions: Schema.Schema<ProcessingOptions> = Schema.suspend(() => Schema.Struct({
  htmlSanitization: Schema.optional(Schema.String),
  disableStreetAddressResolution: Schema.optional(Schema.Boolean),
})).annotate({ identifier: "ProcessingOptions" }) as any as Schema.Schema<ProcessingOptions>;

export interface CustomAttribute {
  /** If the `keyword_searchable` flag is true, the keywords in custom fields are searchable by keyword match. If false, the values are not searchable by keyword match. Default is false. */
  keywordSearchable?: boolean;
  /** If the `filterable` flag is true, the custom field values may be used for custom attribute filters JobQuery.custom_attribute_filter. If false, these values may not be used for custom attribute filters. Default is false. */
  filterable?: boolean;
  /** Exactly one of string_values or long_values must be specified. This field is used to perform a string match (`CASE_SENSITIVE_MATCH` or `CASE_INSENSITIVE_MATCH`) search. For filterable `string_value`s, a maximum total number of 200 values is allowed, with each `string_value` has a byte size of no more than 500B. For unfilterable `string_values`, the maximum total byte size of unfilterable `string_values` is 50KB. Empty string isn't allowed. */
  stringValues?: Array<string>;
  /** Exactly one of string_values or long_values must be specified. This field is used to perform number range search. (`EQ`, `GT`, `GE`, `LE`, `LT`) over filterable `long_value`. Currently at most 1 long_values is supported. */
  longValues?: Array<string>;
}

export const CustomAttribute: Schema.Schema<CustomAttribute> = Schema.suspend(() => Schema.Struct({
  keywordSearchable: Schema.optional(Schema.Boolean),
  filterable: Schema.optional(Schema.Boolean),
  stringValues: Schema.optional(Schema.Array(Schema.String)),
  longValues: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "CustomAttribute" }) as any as Schema.Schema<CustomAttribute>;

export interface CompensationInfo {
  /** Job compensation information. At most one entry can be of type CompensationInfo.CompensationType.BASE, which is referred as **base compensation entry** for the job. */
  entries?: Array<CompensationEntry>;
  /** Output only. Annualized base compensation range. Computed as base compensation entry's CompensationEntry.amount times CompensationEntry.expected_units_per_year. See CompensationEntry for explanation on compensation annualization. */
  annualizedBaseCompensationRange?: CompensationRange;
  /** Output only. Annualized total compensation range. Computed as all compensation entries' CompensationEntry.amount times CompensationEntry.expected_units_per_year. See CompensationEntry for explanation on compensation annualization. */
  annualizedTotalCompensationRange?: CompensationRange;
}

export const CompensationInfo: Schema.Schema<CompensationInfo> = Schema.suspend(() => Schema.Struct({
  entries: Schema.optional(Schema.Array(CompensationEntry)),
  annualizedBaseCompensationRange: Schema.optional(CompensationRange),
  annualizedTotalCompensationRange: Schema.optional(CompensationRange),
})).annotate({ identifier: "CompensationInfo" }) as any as Schema.Schema<CompensationInfo>;

export interface Job {
  /** Output only. Derived details about the job posting. */
  derivedInfo?: JobDerivedInfo;
  /** Output only. The timestamp when this job posting was created. */
  postingCreateTime?: string;
  /** Required. The requisition ID, also referred to as the posting ID, is assigned by the client to identify a job. This field is intended to be used by clients for client identification and tracking of postings. A job isn't allowed to be created if there is another job with the same company, language_code and requisition_id. The maximum number of allowed characters is 255. */
  requisitionId?: string;
  /** The job PostingRegion (for example, state, country) throughout which the job is available. If this field is set, a LocationFilter in a search query within the job region finds this job posting if an exact location match isn't specified. If this field is set to PostingRegion.NATION or PostingRegion.ADMINISTRATIVE_AREA, setting job Job.addresses to the same location level as this field is strongly recommended. */
  postingRegion?: "POSTING_REGION_UNSPECIFIED" | "ADMINISTRATIVE_AREA" | "NATION" | "TELECOMMUTE" | (string & {});
  /** Deprecated. The job is only visible to the owner. The visibility of the job. Defaults to Visibility.ACCOUNT_ONLY if not specified. */
  visibility?: "VISIBILITY_UNSPECIFIED" | "ACCOUNT_ONLY" | "SHARED_WITH_GOOGLE" | "SHARED_WITH_PUBLIC" | (string & {});
  /** Required during job update. The resource name for the job. This is generated by the service when a job is created. The format is "projects/{project_id}/tenants/{tenant_id}/jobs/{job_id}". For example, "projects/foo/tenants/bar/jobs/baz". Use of this field in job queries and API calls is preferred over the use of requisition_id since this value is unique. */
  name?: string;
  /** The desired education degrees for the job, such as Bachelors, Masters. */
  degreeTypes?: Array<"DEGREE_TYPE_UNSPECIFIED" | "PRIMARY_EDUCATION" | "LOWER_SECONDARY_EDUCATION" | "UPPER_SECONDARY_EDUCATION" | "ADULT_REMEDIAL_EDUCATION" | "ASSOCIATES_OR_EQUIVALENT" | "BACHELORS_OR_EQUIVALENT" | "MASTERS_OR_EQUIVALENT" | "DOCTORAL_OR_EQUIVALENT" | (string & {})>;
  /** A description of bonus, commission, and other compensation incentives associated with the job not including salary or pay. The maximum number of allowed characters is 10,000. */
  incentives?: string;
  /** Job application information. */
  applicationInfo?: ApplicationInfo;
  /** Required. The description of the job, which typically includes a multi-paragraph description of the company and related information. Separate fields are provided on the job object for responsibilities, qualifications, and other job characteristics. Use of these separate job fields is recommended. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 100,000. */
  description?: string;
  /** Strongly recommended for the best service experience. The expiration timestamp of the job. After this timestamp, the job is marked as expired, and it no longer appears in search results. The expired job can't be listed by the ListJobs API, but it can be retrieved with the GetJob API or updated with the UpdateJob API or deleted with the DeleteJob API. An expired job can be updated and opened again by using a future expiration timestamp. Updating an expired job fails if there is another existing open job with same company, language_code and requisition_id. The expired jobs are retained in our system for 90 days. However, the overall expired job count cannot exceed 3 times the maximum number of open jobs over previous 7 days. If this threshold is exceeded, expired jobs are cleaned out in order of earliest expire time. Expired jobs are no longer accessible after they are cleaned out. Invalid timestamps are ignored, and treated as expire time not provided. If the timestamp is before the instant request is made, the job is treated as expired immediately on creation. This kind of job can not be updated. And when creating a job with past timestamp, the posting_publish_time must be set before posting_expire_time. The purpose of this feature is to allow other objects, such as ApplicationInfo, to refer a job that didn't exist in the system prior to becoming expired. If you want to modify a job that was expired on creation, delete it and create a new one. If this value isn't provided at the time of job creation or is invalid, the job posting expires after 30 days from the job's creation time. For example, if the job was created on 2017/01/01 13:00AM UTC with an unspecified expiration date, the job expires after 2017/01/31 13:00AM UTC. If this value isn't provided on job update, it depends on the field masks set by UpdateJobRequest.update_mask. If the field masks include job_end_time, or the masks are empty meaning that every field is updated, the job posting expires after 30 days from the job's last update time. Otherwise the expiration date isn't updated. */
  postingExpireTime?: string;
  /** The end timestamp of the job. Typically this field is used for contracting engagements. Invalid timestamps are ignored. */
  jobEndTime?: string;
  /** Required. The resource name of the company listing the job. The format is "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}". For example, "projects/foo/tenants/bar/companies/baz". */
  company?: string;
  /** Output only. Display name of the company listing the job. */
  companyDisplayName?: string;
  /** Options for job processing. */
  processingOptions?: ProcessingOptions;
  /** Required. The title of the job, such as "Software Engineer" The maximum number of allowed characters is 500. */
  title?: string;
  /** A promotion value of the job, as determined by the client. The value determines the sort order of the jobs returned when searching for jobs using the featured jobs search call, with higher promotional values being returned first and ties being resolved by relevance sort. Only the jobs with a promotionValue >0 are returned in a FEATURED_JOB_SEARCH. Default value is 0, and negative values are treated as 0. */
  promotionValue?: number;
  /** The language of the posting. This field is distinct from any requirements for fluency that are associated with the job. Language codes must be in BCP-47 format, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47){: class="external" target="_blank" }. If this field is unspecified and Job.description is present, detected language code based on Job.description is assigned, otherwise defaults to 'en_US'. */
  languageCode?: string;
  /** The department or functional area within the company with the open position. The maximum number of allowed characters is 255. */
  department?: string;
  /** The benefits included with the job. */
  jobBenefits?: Array<"JOB_BENEFIT_UNSPECIFIED" | "CHILD_CARE" | "DENTAL" | "DOMESTIC_PARTNER" | "FLEXIBLE_HOURS" | "MEDICAL" | "LIFE_INSURANCE" | "PARENTAL_LEAVE" | "RETIREMENT_PLAN" | "SICK_DAYS" | "VACATION" | "VISION" | (string & {})>;
  /** A description of job responsibilities. The use of this field is recommended as an alternative to using the more general description field. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 10,000. */
  responsibilities?: string;
  /** The experience level associated with the job, such as "Entry Level". */
  jobLevel?: "JOB_LEVEL_UNSPECIFIED" | "ENTRY_LEVEL" | "EXPERIENCED" | "MANAGER" | "DIRECTOR" | "EXECUTIVE" | (string & {});
  /** Strongly recommended for the best service experience. Location(s) where the employer is looking to hire for this job posting. Specifying the full street address(es) of the hiring location enables better API results, especially job searches by commute time. At most 50 locations are allowed for best search performance. If a job has more locations, it is suggested to split it into multiple jobs with unique requisition_ids (e.g. 'ReqA' becomes 'ReqA-1', 'ReqA-2', and so on.) as multiple jobs with the same company, language_code and requisition_id are not allowed. If the original requisition_id must be preserved, a custom field should be used for storage. It is also suggested to group the locations that close to each other in the same job for better search experience. Jobs with multiple addresses must have their addresses with the same LocationType to allow location filtering to work properly. (For example, a Job with addresses "1600 Amphitheatre Parkway, Mountain View, CA, USA" and "London, UK" may not have location filters applied correctly at search time since the first is a LocationType.STREET_ADDRESS and the second is a LocationType.LOCALITY.) If a job needs to have multiple addresses, it is suggested to split it into multiple jobs with same LocationTypes. The maximum number of allowed characters is 500. */
  addresses?: Array<string>;
  /** The timestamp this job posting was most recently published. The default value is the time the request arrives at the server. Invalid timestamps are ignored. */
  postingPublishTime?: string;
  /** A map of fields to hold both filterable and non-filterable custom job attributes that are not covered by the provided structured fields. The keys of the map are strings up to 64 bytes and must match the pattern: `a-zA-Z*`. For example, key0LikeThis or KEY_1_LIKE_THIS. At most 100 filterable and at most 100 unfilterable keys are supported. For filterable `string_values`, across all keys at most 200 values are allowed, with each string no more than 255 characters. For unfilterable `string_values`, the maximum total size of `string_values` across all keys is 50KB. */
  customAttributes?: Record<string, CustomAttribute>;
  /** The employment type(s) of a job, for example, full time or part time. */
  employmentTypes?: Array<"EMPLOYMENT_TYPE_UNSPECIFIED" | "FULL_TIME" | "PART_TIME" | "CONTRACTOR" | "CONTRACT_TO_HIRE" | "TEMPORARY" | "INTERN" | "VOLUNTEER" | "PER_DIEM" | "FLY_IN_FLY_OUT" | "OTHER_EMPLOYMENT_TYPE" | (string & {})>;
  /** The start timestamp of the job in UTC time zone. Typically this field is used for contracting engagements. Invalid timestamps are ignored. */
  jobStartTime?: string;
  /** Job compensation information (a.k.a. "pay rate") i.e., the compensation that will paid to the employee. */
  compensationInfo?: CompensationInfo;
  /** A description of the qualifications required to perform the job. The use of this field is recommended as an alternative to using the more general description field. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 10,000. */
  qualifications?: string;
  /** Output only. The timestamp when this job posting was last updated. */
  postingUpdateTime?: string;
}

export const Job: Schema.Schema<Job> = Schema.suspend(() => Schema.Struct({
  derivedInfo: Schema.optional(JobDerivedInfo),
  postingCreateTime: Schema.optional(Schema.String),
  requisitionId: Schema.optional(Schema.String),
  postingRegion: Schema.optional(Schema.String),
  visibility: Schema.optional(Schema.String),
  name: Schema.optional(Schema.String),
  degreeTypes: Schema.optional(Schema.Array(Schema.String)),
  incentives: Schema.optional(Schema.String),
  applicationInfo: Schema.optional(ApplicationInfo),
  description: Schema.optional(Schema.String),
  postingExpireTime: Schema.optional(Schema.String),
  jobEndTime: Schema.optional(Schema.String),
  company: Schema.optional(Schema.String),
  companyDisplayName: Schema.optional(Schema.String),
  processingOptions: Schema.optional(ProcessingOptions),
  title: Schema.optional(Schema.String),
  promotionValue: Schema.optional(Schema.Number),
  languageCode: Schema.optional(Schema.String),
  department: Schema.optional(Schema.String),
  jobBenefits: Schema.optional(Schema.Array(Schema.String)),
  responsibilities: Schema.optional(Schema.String),
  jobLevel: Schema.optional(Schema.String),
  addresses: Schema.optional(Schema.Array(Schema.String)),
  postingPublishTime: Schema.optional(Schema.String),
  customAttributes: Schema.optional(Schema.Record(Schema.String, CustomAttribute)),
  employmentTypes: Schema.optional(Schema.Array(Schema.String)),
  jobStartTime: Schema.optional(Schema.String),
  compensationInfo: Schema.optional(CompensationInfo),
  qualifications: Schema.optional(Schema.String),
  postingUpdateTime: Schema.optional(Schema.String),
})).annotate({ identifier: "Job" }) as any as Schema.Schema<Job>;

export interface BatchCreateJobsRequest {
  /** Required. The jobs to be created. A maximum of 200 jobs can be created in a batch. */
  jobs?: Array<Job>;
}

export const BatchCreateJobsRequest: Schema.Schema<BatchCreateJobsRequest> = Schema.suspend(() => Schema.Struct({
  jobs: Schema.optional(Schema.Array(Job)),
})).annotate({ identifier: "BatchCreateJobsRequest" }) as any as Schema.Schema<BatchCreateJobsRequest>;

export interface SpellingCorrection {
  /** Indicates if the query was corrected by the spell checker. */
  corrected?: boolean;
  /** Correction output consisting of the corrected keyword string. */
  correctedText?: string;
  /** Corrected output with html tags to highlight the corrected words. Corrected words are called out with the "*...*" html tags. For example, the user input query is "software enginear", where the second word, "enginear," is incorrect. It should be "engineer". When spelling correction is enabled, this value is "software *engineer*". */
  correctedHtml?: string;
}

export const SpellingCorrection: Schema.Schema<SpellingCorrection> = Schema.suspend(() => Schema.Struct({
  corrected: Schema.optional(Schema.Boolean),
  correctedText: Schema.optional(Schema.String),
  correctedHtml: Schema.optional(Schema.String),
})).annotate({ identifier: "SpellingCorrection" }) as any as Schema.Schema<SpellingCorrection>;

export interface DeviceInfo {
  /** Type of the device. */
  deviceType?: "DEVICE_TYPE_UNSPECIFIED" | "WEB" | "MOBILE_WEB" | "ANDROID" | "IOS" | "BOT" | "OTHER" | (string & {});
  /** A device-specific ID. The ID must be a unique identifier that distinguishes the device from other devices. */
  id?: string;
}

export const DeviceInfo: Schema.Schema<DeviceInfo> = Schema.suspend(() => Schema.Struct({
  deviceType: Schema.optional(Schema.String),
  id: Schema.optional(Schema.String),
})).annotate({ identifier: "DeviceInfo" }) as any as Schema.Schema<DeviceInfo>;

export interface RequestMetadata {
  /** Required if allow_missing_ids is unset or `false`. The client-defined scope or source of the service call, which typically is the domain on which the service has been implemented and is currently being run. For example, if the service is being run by client *Foo, Inc.*, on job board www.foo.com and career site www.bar.com, then this field is set to "foo.com" for use on the job board, and "bar.com" for use on the career site. Note that any improvements to the model for a particular tenant site rely on this field being set correctly to a unique domain. The maximum number of allowed characters is 255. */
  domain?: string;
  /** Required if allow_missing_ids is unset or `false`. A unique session identification string. A session is defined as the duration of an end user's interaction with the service over a certain period. Obfuscate this field for privacy concerns before providing it to the service. Note that any improvements to the model for a particular tenant site rely on this field being set correctly to a unique session ID. The maximum number of allowed characters is 255. */
  sessionId?: string;
  /** Only set when any of domain, session_id and user_id isn't available for some reason. It is highly recommended not to set this field and provide accurate domain, session_id and user_id for the best service experience. */
  allowMissingIds?: boolean;
  /** Required if allow_missing_ids is unset or `false`. A unique user identification string, as determined by the client. To have the strongest positive impact on search quality make sure the client-level is unique. Obfuscate this field for privacy concerns before providing it to the service. Note that any improvements to the model for a particular tenant site rely on this field being set correctly to a unique user ID. The maximum number of allowed characters is 255. */
  userId?: string;
  /** The type of device used by the job seeker at the time of the call to the service. */
  deviceInfo?: DeviceInfo;
}

export const RequestMetadata: Schema.Schema<RequestMetadata> = Schema.suspend(() => Schema.Struct({
  domain: Schema.optional(Schema.String),
  sessionId: Schema.optional(Schema.String),
  allowMissingIds: Schema.optional(Schema.Boolean),
  userId: Schema.optional(Schema.String),
  deviceInfo: Schema.optional(DeviceInfo),
})).annotate({ identifier: "RequestMetadata" }) as any as Schema.Schema<RequestMetadata>;

export interface JobResult {
  /** Here Job only contains basic information including name, company, language_code and requisition_id, use getJob method to retrieve detailed information of the created/updated job. */
  job?: Job;
  /** The status of the job processed. This field is populated if the processing of the job fails. */
  status?: Status;
}

export const JobResult: Schema.Schema<JobResult> = Schema.suspend(() => Schema.Struct({
  job: Schema.optional(Job),
  status: Schema.optional(Status),
})).annotate({ identifier: "JobResult" }) as any as Schema.Schema<JobResult>;

export interface BatchUpdateJobsResponse {
  /** List of job mutation results from a batch update operation. It can change until operation status is FINISHED, FAILED or CANCELLED. */
  jobResults?: Array<JobResult>;
}

export const BatchUpdateJobsResponse: Schema.Schema<BatchUpdateJobsResponse> = Schema.suspend(() => Schema.Struct({
  jobResults: Schema.optional(Schema.Array(JobResult)),
})).annotate({ identifier: "BatchUpdateJobsResponse" }) as any as Schema.Schema<BatchUpdateJobsResponse>;

export interface HistogramQuery {
  /** An expression specifies a histogram request against matching jobs for searches. See SearchJobsRequest.histogram_queries for details about syntax. */
  histogramQuery?: string;
}

export const HistogramQuery: Schema.Schema<HistogramQuery> = Schema.suspend(() => Schema.Struct({
  histogramQuery: Schema.optional(Schema.String),
})).annotate({ identifier: "HistogramQuery" }) as any as Schema.Schema<HistogramQuery>;

export interface SearchJobsRequest {
  /** An expression specifies a histogram request against matching jobs. Expression syntax is an aggregation function call with histogram facets and other options. Available aggregation function calls are: * `count(string_histogram_facet)`: Count the number of matching entities, for each distinct attribute value. * `count(numeric_histogram_facet, list of buckets)`: Count the number of matching entities within each bucket. A maximum of 200 histogram buckets are supported. Data types: * Histogram facet: facet names with format `a-zA-Z+`. * String: string like "any string with backslash escape for quote(\")." * Number: whole number and floating point number like 10, -1 and -0.01. * List: list of elements with comma(,) separator surrounded by square brackets, for example, [1, 2, 3] and ["one", "two", "three"]. Built-in constants: * MIN (minimum number similar to java Double.MIN_VALUE) * MAX (maximum number similar to java Double.MAX_VALUE) Built-in functions: * bucket(start, end[, label]): bucket built-in function creates a bucket with range of start, end). Note that the end is exclusive, for example, bucket(1, MAX, "positive number") or bucket(1, 10). Job histogram facets: * company_display_name: histogram by [Job.company_display_name. * employment_type: histogram by Job.employment_types, for example, "FULL_TIME", "PART_TIME". * company_size (DEPRECATED): histogram by CompanySize, for example, "SMALL", "MEDIUM", "BIG". * publish_time_in_day: histogram by the Job.posting_publish_time in days. Must specify list of numeric buckets in spec. * publish_time_in_month: histogram by the Job.posting_publish_time in months. Must specify list of numeric buckets in spec. * publish_time_in_year: histogram by the Job.posting_publish_time in years. Must specify list of numeric buckets in spec. * degree_types: histogram by the Job.degree_types, for example, "Bachelors", "Masters". * job_level: histogram by the Job.job_level, for example, "Entry Level". * country: histogram by the country code of jobs, for example, "US", "FR". * admin1: histogram by the admin1 code of jobs, which is a global placeholder referring to the state, province, or the particular term a country uses to define the geographic structure below the country level, for example, "CA", "IL". * city: histogram by a combination of the "city name, admin1 code". For example, "Mountain View, CA", "New York, NY". * admin1_country: histogram by a combination of the "admin1 code, country", for example, "CA, US", "IL, US". * city_coordinate: histogram by the city center's GPS coordinates (latitude and longitude), for example, 37.4038522,-122.0987765. Since the coordinates of a city center can change, customers may need to refresh them periodically. * locale: histogram by the Job.language_code, for example, "en-US", "fr-FR". * language: histogram by the language subtag of the Job.language_code, for example, "en", "fr". * category: histogram by the JobCategory, for example, "COMPUTER_AND_IT", "HEALTHCARE". * base_compensation_unit: histogram by the CompensationInfo.CompensationUnit of base salary, for example, "WEEKLY", "MONTHLY". * base_compensation: histogram by the base salary. Must specify list of numeric buckets to group results by. * annualized_base_compensation: histogram by the base annualized salary. Must specify list of numeric buckets to group results by. * annualized_total_compensation: histogram by the total annualized salary. Must specify list of numeric buckets to group results by. * string_custom_attribute: histogram by string Job.custom_attributes. Values can be accessed via square bracket notations like string_custom_attribute["key1"]. * numeric_custom_attribute: histogram by numeric Job.custom_attributes. Values can be accessed via square bracket notations like numeric_custom_attribute["key1"]. Must specify list of numeric buckets to group results by. Example expressions: * `count(admin1)` * `count(base_compensation, [bucket(1000, 10000), bucket(10000, 100000), bucket(100000, MAX)])` * `count(string_custom_attribute["some-string-custom-attribute"])` * `count(numeric_custom_attribute["some-numeric-custom-attribute"], [bucket(MIN, 0, "negative"), bucket(0, MAX, "non-negative")])` */
  histogramQueries?: Array<HistogramQuery>;
  /** A limit on the number of jobs returned in the search results. Increasing this value above the default value of 10 can increase search response time. The value can be between 1 and 100. */
  maxPageSize?: number;
  /** The token specifying the current offset within search results. See SearchJobsResponse.next_page_token for an explanation of how to obtain the next set of query results. */
  pageToken?: string;
  /** Controls what keyword match options to use. If both keyword_match_mode and disable_keyword_match are set, keyword_match_mode will take precedence. Defaults to KeywordMatchMode.KEYWORD_MATCH_ALL if no value is specified. */
  keywordMatchMode?: "KEYWORD_MATCH_MODE_UNSPECIFIED" | "KEYWORD_MATCH_DISABLED" | "KEYWORD_MATCH_ALL" | "KEYWORD_MATCH_TITLE_ONLY" | (string & {});
  /** Controls whether to broaden the search when it produces sparse results. Broadened queries append results to the end of the matching results list. Defaults to false. */
  enableBroadening?: boolean;
  /** Controls whether highly similar jobs are returned next to each other in the search results. Jobs are identified as highly similar based on their titles, job categories, and locations. Highly similar results are clustered so that only one representative job of the cluster is displayed to the job seeker higher up in the results, with the other jobs being displayed lower down in the results. Defaults to DiversificationLevel.SIMPLE if no value is specified. */
  diversificationLevel?: "DIVERSIFICATION_LEVEL_UNSPECIFIED" | "DISABLED" | "SIMPLE" | "ONE_PER_COMPANY" | "TWO_PER_COMPANY" | "MAX_THREE_PER_COMPANY" | "DIVERSIFY_BY_LOOSER_SIMILARITY" | (string & {});
  /** Controls over how job documents get ranked on top of existing relevance score (determined by API algorithm). */
  customRankingInfo?: CustomRankingInfo;
  /** Optional. The relevance threshold of the search results. Default to Google defined threshold, leveraging a balance of precision and recall to deliver both highly accurate results and comprehensive coverage of relevant information. */
  relevanceThreshold?: "RELEVANCE_THRESHOLD_UNSPECIFIED" | "LOWEST" | "LOW" | "MEDIUM" | "HIGH" | (string & {});
  /** Required. The meta information collected about the job searcher, used to improve the search quality of the service. The identifiers (such as `user_id`) are provided by users, and must be unique and consistent. */
  requestMetadata?: RequestMetadata;
  /** The desired job attributes returned for jobs in the search response. Defaults to JobView.JOB_VIEW_SMALL if no value is specified. */
  jobView?: "JOB_VIEW_UNSPECIFIED" | "JOB_VIEW_ID_ONLY" | "JOB_VIEW_MINIMAL" | "JOB_VIEW_SMALL" | "JOB_VIEW_FULL" | (string & {});
  /** An integer that specifies the current offset (that is, starting result location, amongst the jobs deemed by the API as relevant) in search results. This field is only considered if page_token is unset. The maximum allowed value is 5000. Otherwise an error is thrown. For example, 0 means to return results starting from the first matching job, and 10 means to return from the 11th job. This can be used for pagination, (for example, pageSize = 10 and offset = 10 means to return from the second page). */
  offset?: number;
  /** The criteria determining how search results are sorted. Default is `"relevance desc"`. Supported options are: * `"relevance desc"`: By relevance descending, as determined by the API algorithms. Relevance thresholding of query results is only available with this ordering. * `"posting_publish_time desc"`: By Job.posting_publish_time descending. * `"posting_update_time desc"`: By Job.posting_update_time descending. * `"title"`: By Job.title ascending. * `"title desc"`: By Job.title descending. * `"annualized_base_compensation"`: By job's CompensationInfo.annualized_base_compensation_range ascending. Jobs whose annualized base compensation is unspecified are put at the end of search results. * `"annualized_base_compensation desc"`: By job's CompensationInfo.annualized_base_compensation_range descending. Jobs whose annualized base compensation is unspecified are put at the end of search results. * `"annualized_total_compensation"`: By job's CompensationInfo.annualized_total_compensation_range ascending. Jobs whose annualized base compensation is unspecified are put at the end of search results. * `"annualized_total_compensation desc"`: By job's CompensationInfo.annualized_total_compensation_range descending. Jobs whose annualized base compensation is unspecified are put at the end of search results. * `"custom_ranking desc"`: By the relevance score adjusted to the SearchJobsRequest.CustomRankingInfo.ranking_expression with weight factor assigned by SearchJobsRequest.CustomRankingInfo.importance_level in descending order. * Location sorting: Use the special syntax to order jobs by distance: `"distance_from('Hawaii')"`: Order by distance from Hawaii. `"distance_from(19.89, 155.5)"`: Order by distance from a coordinate. `"distance_from('Hawaii'), distance_from('Puerto Rico')"`: Order by multiple locations. See details below. `"distance_from('Hawaii'), distance_from(19.89, 155.5)"`: Order by multiple locations. See details below. The string can have a maximum of 256 characters. When multiple distance centers are provided, a job that is close to any of the distance centers would have a high rank. When a job has multiple locations, the job location closest to one of the distance centers will be used. Jobs that don't have locations will be ranked at the bottom. Distance is calculated with a precision of 11.3 meters (37.4 feet). Diversification strategy is still applied unless explicitly disabled in diversification_level. */
  orderBy?: string;
  /** This field is deprecated. Please use SearchJobsRequest.keyword_match_mode going forward. To migrate, disable_keyword_match set to false maps to KeywordMatchMode.KEYWORD_MATCH_ALL, and disable_keyword_match set to true maps to KeywordMatchMode.KEYWORD_MATCH_DISABLED. If SearchJobsRequest.keyword_match_mode is set, this field is ignored. Controls whether to disable exact keyword match on Job.title, Job.description, Job.company_display_name, Job.addresses, Job.qualifications. When disable keyword match is turned off, a keyword match returns jobs that do not match given category filters when there are matching keywords. For example, for the query "program manager," a result is returned even if the job posting has the title "software developer," which doesn't fall into "program manager" ontology, but does have "program manager" appearing in its description. For queries like "cloud" that don't contain title or location specific ontology, jobs with "cloud" keyword matches are returned regardless of this flag's value. Use Company.keyword_searchable_job_custom_attributes if company-specific globally matched custom field/attribute string values are needed. Enabling keyword match improves recall of subsequent search requests. Defaults to false. */
  disableKeywordMatch?: boolean;
  /** Query used to search against jobs, such as keyword, location filters, etc. */
  jobQuery?: JobQuery;
  /** Mode of a search. Defaults to SearchMode.JOB_SEARCH. */
  searchMode?: "SEARCH_MODE_UNSPECIFIED" | "JOB_SEARCH" | "FEATURED_JOB_SEARCH" | (string & {});
}

export const SearchJobsRequest: Schema.Schema<SearchJobsRequest> = Schema.suspend(() => Schema.Struct({
  histogramQueries: Schema.optional(Schema.Array(HistogramQuery)),
  maxPageSize: Schema.optional(Schema.Number),
  pageToken: Schema.optional(Schema.String),
  keywordMatchMode: Schema.optional(Schema.String),
  enableBroadening: Schema.optional(Schema.Boolean),
  diversificationLevel: Schema.optional(Schema.String),
  customRankingInfo: Schema.optional(CustomRankingInfo),
  relevanceThreshold: Schema.optional(Schema.String),
  requestMetadata: Schema.optional(RequestMetadata),
  jobView: Schema.optional(Schema.String),
  offset: Schema.optional(Schema.Number),
  orderBy: Schema.optional(Schema.String),
  disableKeywordMatch: Schema.optional(Schema.Boolean),
  jobQuery: Schema.optional(JobQuery),
  searchMode: Schema.optional(Schema.String),
})).annotate({ identifier: "SearchJobsRequest" }) as any as Schema.Schema<SearchJobsRequest>;

export interface CompanyDerivedInfo {
  /** A structured headquarters location of the company, resolved from Company.headquarters_address if provided. */
  headquartersLocation?: Location;
}

export const CompanyDerivedInfo: Schema.Schema<CompanyDerivedInfo> = Schema.suspend(() => Schema.Struct({
  headquartersLocation: Schema.optional(Location),
})).annotate({ identifier: "CompanyDerivedInfo" }) as any as Schema.Schema<CompanyDerivedInfo>;

export interface Empty {
}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() => Schema.Struct({
})).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface ListJobsResponse {
  /** A token to retrieve the next page of results. */
  nextPageToken?: string;
  /** The Jobs for a given company. The maximum number of items returned is based on the limit field provided in the request. */
  jobs?: Array<Job>;
  /** Additional information for the API invocation, such as the request tracking id. */
  metadata?: ResponseMetadata;
}

export const ListJobsResponse: Schema.Schema<ListJobsResponse> = Schema.suspend(() => Schema.Struct({
  nextPageToken: Schema.optional(Schema.String),
  jobs: Schema.optional(Schema.Array(Job)),
  metadata: Schema.optional(ResponseMetadata),
})).annotate({ identifier: "ListJobsResponse" }) as any as Schema.Schema<ListJobsResponse>;

export interface BatchDeleteJobsResponse {
  /** List of job mutation results from a batch delete operation. It can change until operation status is FINISHED, FAILED or CANCELLED. */
  jobResults?: Array<JobResult>;
}

export const BatchDeleteJobsResponse: Schema.Schema<BatchDeleteJobsResponse> = Schema.suspend(() => Schema.Struct({
  jobResults: Schema.optional(Schema.Array(JobResult)),
})).annotate({ identifier: "BatchDeleteJobsResponse" }) as any as Schema.Schema<BatchDeleteJobsResponse>;

export interface JobEvent {
  /** Required. The type of the event (see JobEventType). */
  type?: "JOB_EVENT_TYPE_UNSPECIFIED" | "IMPRESSION" | "VIEW" | "VIEW_REDIRECT" | "APPLICATION_START" | "APPLICATION_FINISH" | "APPLICATION_QUICK_SUBMISSION" | "APPLICATION_REDIRECT" | "APPLICATION_START_FROM_SEARCH" | "APPLICATION_REDIRECT_FROM_SEARCH" | "APPLICATION_COMPANY_SUBMIT" | "BOOKMARK" | "NOTIFICATION" | "HIRED" | "SENT_CV" | "INTERVIEW_GRANTED" | (string & {});
  /** Required. The job name(s) associated with this event. For example, if this is an impression event, this field contains the identifiers of all jobs shown to the job seeker. If this was a view event, this field contains the identifier of the viewed job. The format is "projects/{project_id}/tenants/{tenant_id}/jobs/{job_id}", for example, "projects/foo/tenants/bar/jobs/baz". */
  jobs?: Array<string>;
}

export const JobEvent: Schema.Schema<JobEvent> = Schema.suspend(() => Schema.Struct({
  type: Schema.optional(Schema.String),
  jobs: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "JobEvent" }) as any as Schema.Schema<JobEvent>;

export interface ClientEvent {
  /** Required. A unique identifier, generated by the client application. */
  eventId?: string;
  /** Required. The timestamp of the event. */
  createTime?: string;
  /** An event issued when a job seeker interacts with the application that implements Cloud Talent Solution. */
  jobEvent?: JobEvent;
  /** Strongly recommended for the best service experience. A unique ID generated in the API responses. It can be found in ResponseMetadata.request_id. */
  requestId?: string;
  /** Notes about the event provided by recruiters or other users, for example, feedback on why a job was bookmarked. */
  eventNotes?: string;
}

export const ClientEvent: Schema.Schema<ClientEvent> = Schema.suspend(() => Schema.Struct({
  eventId: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  jobEvent: Schema.optional(JobEvent),
  requestId: Schema.optional(Schema.String),
  eventNotes: Schema.optional(Schema.String),
})).annotate({ identifier: "ClientEvent" }) as any as Schema.Schema<ClientEvent>;

export interface Tenant {
  /** Required during tenant update. The resource name for a tenant. This is generated by the service when a tenant is created. The format is "projects/{project_id}/tenants/{tenant_id}", for example, "projects/foo/tenants/bar". */
  name?: string;
  /** Required. Client side tenant identifier, used to uniquely identify the tenant. The maximum number of allowed characters is 255. */
  externalId?: string;
}

export const Tenant: Schema.Schema<Tenant> = Schema.suspend(() => Schema.Struct({
  name: Schema.optional(Schema.String),
  externalId: Schema.optional(Schema.String),
})).annotate({ identifier: "Tenant" }) as any as Schema.Schema<Tenant>;

export interface ListTenantsResponse {
  /** Tenants for the current client. */
  tenants?: Array<Tenant>;
  /** Additional information for the API invocation, such as the request tracking id. */
  metadata?: ResponseMetadata;
  /** A token to retrieve the next page of results. */
  nextPageToken?: string;
}

export const ListTenantsResponse: Schema.Schema<ListTenantsResponse> = Schema.suspend(() => Schema.Struct({
  tenants: Schema.optional(Schema.Array(Tenant)),
  metadata: Schema.optional(ResponseMetadata),
  nextPageToken: Schema.optional(Schema.String),
})).annotate({ identifier: "ListTenantsResponse" }) as any as Schema.Schema<ListTenantsResponse>;

export interface MatchingJob {
  /** A summary of the job with core information that's displayed on the search results listing page. */
  jobSummary?: string;
  /** Job resource that matches the specified SearchJobsRequest. */
  job?: Job;
  /** Contains snippets of text from the Job.description and similar fields that most closely match a search query's keywords, if available. All HTML tags in the original fields are stripped when returned in this field, and matching query keywords are enclosed in HTML bold tags. */
  searchTextSnippet?: string;
  /** Commute information which is generated based on specified CommuteFilter. */
  commuteInfo?: CommuteInfo;
  /** Contains snippets of text from the Job.title field most closely matching a search query's keywords, if available. The matching query keywords are enclosed in HTML bold tags. */
  jobTitleSnippet?: string;
}

export const MatchingJob: Schema.Schema<MatchingJob> = Schema.suspend(() => Schema.Struct({
  jobSummary: Schema.optional(Schema.String),
  job: Schema.optional(Job),
  searchTextSnippet: Schema.optional(Schema.String),
  commuteInfo: Schema.optional(CommuteInfo),
  jobTitleSnippet: Schema.optional(Schema.String),
})).annotate({ identifier: "MatchingJob" }) as any as Schema.Schema<MatchingJob>;

export interface SearchJobsResponse {
  /** The Job entities that match the specified SearchJobsRequest. */
  matchingJobs?: Array<MatchingJob>;
  /** The token that specifies the starting position of the next page of results. This field is empty if there are no more results. */
  nextPageToken?: string;
  /** Number of jobs that match the specified query. Note: This size is precise only if the total is less than 100,000. */
  totalSize?: number;
  /** The location filters that the service applied to the specified query. If any filters are lat-lng based, the Location.location_type is Location.LocationType.LOCATION_TYPE_UNSPECIFIED. */
  locationFilters?: Array<Location>;
  /** Additional information for the API invocation, such as the request tracking id. */
  metadata?: ResponseMetadata;
  /** The histogram results that match with specified SearchJobsRequest.histogram_queries. */
  histogramQueryResults?: Array<HistogramQueryResult>;
  /** The spell checking result, and correction. */
  spellCorrection?: SpellingCorrection;
  /** If query broadening is enabled, we may append additional results from the broadened query. This number indicates how many of the jobs returned in the jobs field are from the broadened query. These results are always at the end of the jobs list. In particular, a value of 0, or if the field isn't set, all the jobs in the jobs list are from the original (without broadening) query. If this field is non-zero, subsequent requests with offset after this result set should contain all broadened results. */
  broadenedQueryJobsCount?: number;
}

export const SearchJobsResponse: Schema.Schema<SearchJobsResponse> = Schema.suspend(() => Schema.Struct({
  matchingJobs: Schema.optional(Schema.Array(MatchingJob)),
  nextPageToken: Schema.optional(Schema.String),
  totalSize: Schema.optional(Schema.Number),
  locationFilters: Schema.optional(Schema.Array(Location)),
  metadata: Schema.optional(ResponseMetadata),
  histogramQueryResults: Schema.optional(Schema.Array(HistogramQueryResult)),
  spellCorrection: Schema.optional(SpellingCorrection),
  broadenedQueryJobsCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "SearchJobsResponse" }) as any as Schema.Schema<SearchJobsResponse>;

export interface BatchCreateJobsResponse {
  /** List of job mutation results from a batch create operation. It can change until operation status is FINISHED, FAILED or CANCELLED. */
  jobResults?: Array<JobResult>;
}

export const BatchCreateJobsResponse: Schema.Schema<BatchCreateJobsResponse> = Schema.suspend(() => Schema.Struct({
  jobResults: Schema.optional(Schema.Array(JobResult)),
})).annotate({ identifier: "BatchCreateJobsResponse" }) as any as Schema.Schema<BatchCreateJobsResponse>;

export interface Company {
  /** Required. Client side company identifier, used to uniquely identify the company. The maximum number of allowed characters is 255. */
  externalId?: string;
  /** Equal Employment Opportunity legal disclaimer text to be associated with all jobs, and typically to be displayed in all roles. The maximum number of allowed characters is 500. */
  eeoText?: string;
  /** The street address of the company's main headquarters, which may be different from the job location. The service attempts to geolocate the provided address, and populates a more specific location wherever possible in DerivedInfo.headquarters_location. */
  headquartersAddress?: string;
  /** The employer's company size. */
  size?: "COMPANY_SIZE_UNSPECIFIED" | "MINI" | "SMALL" | "SMEDIUM" | "MEDIUM" | "BIG" | "BIGGER" | "GIANT" | (string & {});
  /** The URI representing the company's primary web site or home page, for example, "https://www.google.com". The maximum number of allowed characters is 255. */
  websiteUri?: string;
  /** Required. The display name of the company, for example, "Google LLC". */
  displayName?: string;
  /** A URI that hosts the employer's company logo. */
  imageUri?: string;
  /** Output only. Derived details about the company. */
  derivedInfo?: CompanyDerivedInfo;
  /** Required during company update. The resource name for a company. This is generated by the service when a company is created. The format is "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}", for example, "projects/foo/tenants/bar/companies/baz". */
  name?: string;
  /** Set to true if it is the hiring agency that post jobs for other employers. Defaults to false if not provided. */
  hiringAgency?: boolean;
  /** The URI to employer's career site or careers page on the employer's web site, for example, "https://careers.google.com". */
  careerSiteUri?: string;
  /** Output only. Indicates whether a company is flagged to be suspended from public availability by the service when job content appears suspicious, abusive, or spammy. */
  suspended?: boolean;
  /** This field is deprecated. Please set the searchability of the custom attribute in the Job.custom_attributes going forward. A list of keys of filterable Job.custom_attributes, whose corresponding `string_values` are used in keyword searches. Jobs with `string_values` under these specified field keys are returned if any of the values match the search keyword. Custom field values with parenthesis, brackets and special symbols are not searchable as-is, and those keyword queries must be surrounded by quotes. */
  keywordSearchableJobCustomAttributes?: Array<string>;
}

export const Company: Schema.Schema<Company> = Schema.suspend(() => Schema.Struct({
  externalId: Schema.optional(Schema.String),
  eeoText: Schema.optional(Schema.String),
  headquartersAddress: Schema.optional(Schema.String),
  size: Schema.optional(Schema.String),
  websiteUri: Schema.optional(Schema.String),
  displayName: Schema.optional(Schema.String),
  imageUri: Schema.optional(Schema.String),
  derivedInfo: Schema.optional(CompanyDerivedInfo),
  name: Schema.optional(Schema.String),
  hiringAgency: Schema.optional(Schema.Boolean),
  careerSiteUri: Schema.optional(Schema.String),
  suspended: Schema.optional(Schema.Boolean),
  keywordSearchableJobCustomAttributes: Schema.optional(Schema.Array(Schema.String)),
})).annotate({ identifier: "Company" }) as any as Schema.Schema<Company>;

export interface BatchUpdateJobsRequest {
  /** Required. The jobs to be updated. A maximum of 200 jobs can be updated in a batch. */
  jobs?: Array<Job>;
  /** Strongly recommended for the best service experience. Be aware that it will also increase latency when checking the status of a batch operation. If update_mask is provided, only the specified fields in Job are updated. Otherwise all the fields are updated. A field mask to restrict the fields that are updated. Only top level fields of Job are supported. If update_mask is provided, The Job inside JobResult will only contains fields that is updated, plus the Id of the Job. Otherwise, Job will include all fields, which can yield a very large response. */
  updateMask?: string;
}

export const BatchUpdateJobsRequest: Schema.Schema<BatchUpdateJobsRequest> = Schema.suspend(() => Schema.Struct({
  jobs: Schema.optional(Schema.Array(Job)),
  updateMask: Schema.optional(Schema.String),
})).annotate({ identifier: "BatchUpdateJobsRequest" }) as any as Schema.Schema<BatchUpdateJobsRequest>;

export interface CompletionResult {
  /** The URI of the company image for COMPANY_NAME. */
  imageUri?: string;
  /** The suggestion for the query. */
  suggestion?: string;
  /** The completion topic. */
  type?: "COMPLETION_TYPE_UNSPECIFIED" | "JOB_TITLE" | "COMPANY_NAME" | "COMBINED" | (string & {});
}

export const CompletionResult: Schema.Schema<CompletionResult> = Schema.suspend(() => Schema.Struct({
  imageUri: Schema.optional(Schema.String),
  suggestion: Schema.optional(Schema.String),
  type: Schema.optional(Schema.String),
})).annotate({ identifier: "CompletionResult" }) as any as Schema.Schema<CompletionResult>;

export interface CompleteQueryResponse {
  /** Additional information for the API invocation, such as the request tracking id. */
  metadata?: ResponseMetadata;
  /** Results of the matching job/company candidates. */
  completionResults?: Array<CompletionResult>;
}

export const CompleteQueryResponse: Schema.Schema<CompleteQueryResponse> = Schema.suspend(() => Schema.Struct({
  metadata: Schema.optional(ResponseMetadata),
  completionResults: Schema.optional(Schema.Array(CompletionResult)),
})).annotate({ identifier: "CompleteQueryResponse" }) as any as Schema.Schema<CompleteQueryResponse>;

export interface BatchOperationMetadata {
  /** Count of successful item(s) inside an operation. */
  successCount?: number;
  /** The time when the batch operation status is updated. The metadata and the update_time is refreshed every minute otherwise cached data is returned. */
  updateTime?: string;
  /** Count of failed item(s) inside an operation. */
  failureCount?: number;
  /** The state of a long running operation. */
  state?: "STATE_UNSPECIFIED" | "INITIALIZING" | "PROCESSING" | "SUCCEEDED" | "FAILED" | "CANCELLING" | "CANCELLED" | (string & {});
  /** The time when the batch operation is created. */
  createTime?: string;
  /** More detailed information about operation state. */
  stateDescription?: string;
  /** The time when the batch operation is finished and google.longrunning.Operation.done is set to `true`. */
  endTime?: string;
  /** Count of total item(s) inside an operation. */
  totalCount?: number;
}

export const BatchOperationMetadata: Schema.Schema<BatchOperationMetadata> = Schema.suspend(() => Schema.Struct({
  successCount: Schema.optional(Schema.Number),
  updateTime: Schema.optional(Schema.String),
  failureCount: Schema.optional(Schema.Number),
  state: Schema.optional(Schema.String),
  createTime: Schema.optional(Schema.String),
  stateDescription: Schema.optional(Schema.String),
  endTime: Schema.optional(Schema.String),
  totalCount: Schema.optional(Schema.Number),
})).annotate({ identifier: "BatchOperationMetadata" }) as any as Schema.Schema<BatchOperationMetadata>;

export interface Operation {
  /** If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. */
  done?: boolean;
  /** The error result of the operation in case of failure or cancellation. */
  error?: Status;
  /** Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. */
  metadata?: Record<string, unknown>;
  /** The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. */
  response?: Record<string, unknown>;
  /** The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. */
  name?: string;
}

export const Operation: Schema.Schema<Operation> = Schema.suspend(() => Schema.Struct({
  done: Schema.optional(Schema.Boolean),
  error: Schema.optional(Status),
  metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
  name: Schema.optional(Schema.String),
})).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ListCompaniesResponse {
  /** Companies for the current client. */
  companies?: Array<Company>;
  /** A token to retrieve the next page of results. */
  nextPageToken?: string;
  /** Additional information for the API invocation, such as the request tracking id. */
  metadata?: ResponseMetadata;
}

export const ListCompaniesResponse: Schema.Schema<ListCompaniesResponse> = Schema.suspend(() => Schema.Struct({
  companies: Schema.optional(Schema.Array(Company)),
  nextPageToken: Schema.optional(Schema.String),
  metadata: Schema.optional(ResponseMetadata),
})).annotate({ identifier: "ListCompaniesResponse" }) as any as Schema.Schema<ListCompaniesResponse>;

// ==========================================================================
// Operations
// ==========================================================================

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export interface GetProjectsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v4/projects/{projectsId}/operations/{operationsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsOperationsRequest>;

export type GetProjectsOperationsResponse = Operation;
export const GetProjectsOperationsResponse = Operation;

export type GetProjectsOperationsError = CommonErrors;

export const getProjectsOperations: API.OperationMethod<GetProjectsOperationsRequest, GetProjectsOperationsResponse, GetProjectsOperationsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsOperationsRequest,
  output: GetProjectsOperationsResponse,
  errors: [],
}));

/** Completes the specified prefix with keyword suggestions. Intended for use by a job search auto-complete search box. */
export interface CompleteQueryProjectsTenantsRequest {
  /** Required. The query used to generate suggestions. The maximum number of allowed characters is 255. */
  query?: string;
  /** The completion topic. The default is CompletionType.COMBINED. */
  type?: "COMPLETION_TYPE_UNSPECIFIED" | "JOB_TITLE" | "COMPANY_NAME" | "COMBINED" | (string & {});
  /** Required. Resource name of tenant the completion is performed within. The format is "projects/{project_id}/tenants/{tenant_id}", for example, "projects/foo/tenants/bar". */
  tenant: string;
  /** If provided, restricts completion to specified company. The format is "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}", for example, "projects/foo/tenants/bar/companies/baz". */
  company?: string;
  /** Required. Completion result count. The maximum allowed page size is 10. */
  pageSize?: number;
  /** The scope of the completion. The defaults is CompletionScope.PUBLIC. */
  scope?: "COMPLETION_SCOPE_UNSPECIFIED" | "TENANT" | "PUBLIC" | (string & {});
  /** The list of languages of the query. This is the BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47). The maximum number of allowed characters is 255. */
  languageCodes?: string[];
}

export const CompleteQueryProjectsTenantsRequest = Schema.Struct({
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  tenant: Schema.String.pipe(T.HttpPath("tenant")),
  company: Schema.optional(Schema.String).pipe(T.HttpQuery("company")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  scope: Schema.optional(Schema.String).pipe(T.HttpQuery("scope")),
  languageCodes: Schema.optional(Schema.Array(Schema.String)).pipe(T.HttpQuery("languageCodes")),
}).pipe(
  T.Http({ method: "GET", path: "v4/projects/{projectsId}/tenants/{tenantsId}:completeQuery" }),
  svc,
) as unknown as Schema.Schema<CompleteQueryProjectsTenantsRequest>;

export type CompleteQueryProjectsTenantsResponse = CompleteQueryResponse;
export const CompleteQueryProjectsTenantsResponse = CompleteQueryResponse;

export type CompleteQueryProjectsTenantsError = CommonErrors;

export const completeQueryProjectsTenants: API.OperationMethod<CompleteQueryProjectsTenantsRequest, CompleteQueryProjectsTenantsResponse, CompleteQueryProjectsTenantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CompleteQueryProjectsTenantsRequest,
  output: CompleteQueryProjectsTenantsResponse,
  errors: [],
}));

/** Lists all tenants associated with the project. */
export interface ListProjectsTenantsRequest {
  /** Required. Resource name of the project under which the tenant is created. The format is "projects/{project_id}", for example, "projects/foo". */
  parent: string;
  /** The starting indicator from which to return results. */
  pageToken?: string;
  /** The maximum number of tenants to be returned, at most 100. Default is 100 if a non-positive number is provided. */
  pageSize?: number;
}

export const ListProjectsTenantsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v4/projects/{projectsId}/tenants" }),
  svc,
) as unknown as Schema.Schema<ListProjectsTenantsRequest>;

export type ListProjectsTenantsResponse = ListTenantsResponse;
export const ListProjectsTenantsResponse = ListTenantsResponse;

export type ListProjectsTenantsError = CommonErrors;

export const listProjectsTenants = API.makePaginated(() => ({
  input: ListProjectsTenantsRequest,
  output: ListProjectsTenantsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Deletes specified tenant. */
export interface DeleteProjectsTenantsRequest {
  /** Required. The resource name of the tenant to be deleted. The format is "projects/{project_id}/tenants/{tenant_id}", for example, "projects/foo/tenants/bar". */
  name: string;
}

export const DeleteProjectsTenantsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/projects/{projectsId}/tenants/{tenantsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsTenantsRequest>;

export type DeleteProjectsTenantsResponse = Empty;
export const DeleteProjectsTenantsResponse = Empty;

export type DeleteProjectsTenantsError = CommonErrors;

export const deleteProjectsTenants: API.OperationMethod<DeleteProjectsTenantsRequest, DeleteProjectsTenantsResponse, DeleteProjectsTenantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsTenantsRequest,
  output: DeleteProjectsTenantsResponse,
  errors: [],
}));

/** Retrieves specified tenant. */
export interface GetProjectsTenantsRequest {
  /** Required. The resource name of the tenant to be retrieved. The format is "projects/{project_id}/tenants/{tenant_id}", for example, "projects/foo/tenants/bar". */
  name: string;
}

export const GetProjectsTenantsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v4/projects/{projectsId}/tenants/{tenantsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsTenantsRequest>;

export type GetProjectsTenantsResponse = Tenant;
export const GetProjectsTenantsResponse = Tenant;

export type GetProjectsTenantsError = CommonErrors;

export const getProjectsTenants: API.OperationMethod<GetProjectsTenantsRequest, GetProjectsTenantsResponse, GetProjectsTenantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsTenantsRequest,
  output: GetProjectsTenantsResponse,
  errors: [],
}));

/** Updates specified tenant. */
export interface PatchProjectsTenantsRequest {
  /** Required during tenant update. The resource name for a tenant. This is generated by the service when a tenant is created. The format is "projects/{project_id}/tenants/{tenant_id}", for example, "projects/foo/tenants/bar". */
  name: string;
  /** Strongly recommended for the best service experience. If update_mask is provided, only the specified fields in tenant are updated. Otherwise all the fields are updated. A field mask to specify the tenant fields to be updated. Only top level fields of Tenant are supported. */
  updateMask?: string;
  /** Request body */
  body?: Tenant;
}

export const PatchProjectsTenantsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Tenant).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/projects/{projectsId}/tenants/{tenantsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsTenantsRequest>;

export type PatchProjectsTenantsResponse = Tenant;
export const PatchProjectsTenantsResponse = Tenant;

export type PatchProjectsTenantsError = CommonErrors;

export const patchProjectsTenants: API.OperationMethod<PatchProjectsTenantsRequest, PatchProjectsTenantsResponse, PatchProjectsTenantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsTenantsRequest,
  output: PatchProjectsTenantsResponse,
  errors: [],
}));

/** Creates a new tenant entity. */
export interface CreateProjectsTenantsRequest {
  /** Required. Resource name of the project under which the tenant is created. The format is "projects/{project_id}", for example, "projects/foo". */
  parent: string;
  /** Request body */
  body?: Tenant;
}

export const CreateProjectsTenantsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Tenant).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/projects/{projectsId}/tenants", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsTenantsRequest>;

export type CreateProjectsTenantsResponse = Tenant;
export const CreateProjectsTenantsResponse = Tenant;

export type CreateProjectsTenantsError = CommonErrors;

export const createProjectsTenants: API.OperationMethod<CreateProjectsTenantsRequest, CreateProjectsTenantsResponse, CreateProjectsTenantsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsTenantsRequest,
  output: CreateProjectsTenantsResponse,
  errors: [],
}));

/** Begins executing a batch update jobs operation. */
export interface BatchUpdateProjectsTenantsJobsRequest {
  /** Required. The resource name of the tenant under which the job is created. The format is "projects/{project_id}/tenants/{tenant_id}". For example, "projects/foo/tenants/bar". */
  parent: string;
  /** Request body */
  body?: BatchUpdateJobsRequest;
}

export const BatchUpdateProjectsTenantsJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchUpdateJobsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/projects/{projectsId}/tenants/{tenantsId}/jobs:batchUpdate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchUpdateProjectsTenantsJobsRequest>;

export type BatchUpdateProjectsTenantsJobsResponse = Operation;
export const BatchUpdateProjectsTenantsJobsResponse = Operation;

export type BatchUpdateProjectsTenantsJobsError = CommonErrors;

export const batchUpdateProjectsTenantsJobs: API.OperationMethod<BatchUpdateProjectsTenantsJobsRequest, BatchUpdateProjectsTenantsJobsResponse, BatchUpdateProjectsTenantsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchUpdateProjectsTenantsJobsRequest,
  output: BatchUpdateProjectsTenantsJobsResponse,
  errors: [],
}));

/** Lists jobs by filter. */
export interface ListProjectsTenantsJobsRequest {
  /** Required. The filter string specifies the jobs to be enumerated. Supported operator: =, AND The fields eligible for filtering are: * `companyName` * `requisitionId` * `status` Available values: OPEN, EXPIRED, ALL. Defaults to OPEN if no value is specified. At least one of `companyName` and `requisitionId` must present or an INVALID_ARGUMENT error is thrown. Sample Query: * companyName = "projects/foo/tenants/bar/companies/baz" * companyName = "projects/foo/tenants/bar/companies/baz" AND requisitionId = "req-1" * companyName = "projects/foo/tenants/bar/companies/baz" AND status = "EXPIRED" * requisitionId = "req-1" * requisitionId = "req-1" AND status = "EXPIRED" */
  filter?: string;
  /** The maximum number of jobs to be returned per page of results. If job_view is set to JobView.JOB_VIEW_ID_ONLY, the maximum allowed page size is 1000. Otherwise, the maximum allowed page size is 100. Default is 100 if empty or a number < 1 is specified. */
  pageSize?: number;
  /** The starting point of a query result. */
  pageToken?: string;
  /** The desired job attributes returned for jobs in the search response. Defaults to JobView.JOB_VIEW_FULL if no value is specified. */
  jobView?: "JOB_VIEW_UNSPECIFIED" | "JOB_VIEW_ID_ONLY" | "JOB_VIEW_MINIMAL" | "JOB_VIEW_SMALL" | "JOB_VIEW_FULL" | (string & {});
  /** Required. The resource name of the tenant under which the job is created. The format is "projects/{project_id}/tenants/{tenant_id}". For example, "projects/foo/tenants/bar". */
  parent: string;
}

export const ListProjectsTenantsJobsRequest = Schema.Struct({
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  jobView: Schema.optional(Schema.String).pipe(T.HttpQuery("jobView")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v4/projects/{projectsId}/tenants/{tenantsId}/jobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsTenantsJobsRequest>;

export type ListProjectsTenantsJobsResponse = ListJobsResponse;
export const ListProjectsTenantsJobsResponse = ListJobsResponse;

export type ListProjectsTenantsJobsError = CommonErrors;

export const listProjectsTenantsJobs = API.makePaginated(() => ({
  input: ListProjectsTenantsJobsRequest,
  output: ListProjectsTenantsJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Searches for jobs using the provided SearchJobsRequest. This call constrains the visibility of jobs present in the database, and only returns jobs that the caller has permission to search against. */
export interface SearchProjectsTenantsJobsRequest {
  /** Required. The resource name of the tenant to search within. The format is "projects/{project_id}/tenants/{tenant_id}". For example, "projects/foo/tenants/bar". */
  parent: string;
  /** Request body */
  body?: SearchJobsRequest;
}

export const SearchProjectsTenantsJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SearchJobsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/projects/{projectsId}/tenants/{tenantsId}/jobs:search", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchProjectsTenantsJobsRequest>;

export type SearchProjectsTenantsJobsResponse = SearchJobsResponse;
export const SearchProjectsTenantsJobsResponse = SearchJobsResponse;

export type SearchProjectsTenantsJobsError = CommonErrors;

export const searchProjectsTenantsJobs: API.OperationMethod<SearchProjectsTenantsJobsRequest, SearchProjectsTenantsJobsResponse, SearchProjectsTenantsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchProjectsTenantsJobsRequest,
  output: SearchProjectsTenantsJobsResponse,
  errors: [],
}));

/** Begins executing a batch delete jobs operation. */
export interface BatchDeleteProjectsTenantsJobsRequest {
  /** Required. The resource name of the tenant under which the job is created. The format is "projects/{project_id}/tenants/{tenant_id}". For example, "projects/foo/tenants/bar". The parent of all of the jobs specified in `names` must match this field. */
  parent: string;
  /** Request body */
  body?: BatchDeleteJobsRequest;
}

export const BatchDeleteProjectsTenantsJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchDeleteJobsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/projects/{projectsId}/tenants/{tenantsId}/jobs:batchDelete", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchDeleteProjectsTenantsJobsRequest>;

export type BatchDeleteProjectsTenantsJobsResponse = Operation;
export const BatchDeleteProjectsTenantsJobsResponse = Operation;

export type BatchDeleteProjectsTenantsJobsError = CommonErrors;

export const batchDeleteProjectsTenantsJobs: API.OperationMethod<BatchDeleteProjectsTenantsJobsRequest, BatchDeleteProjectsTenantsJobsResponse, BatchDeleteProjectsTenantsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchDeleteProjectsTenantsJobsRequest,
  output: BatchDeleteProjectsTenantsJobsResponse,
  errors: [],
}));

/** Retrieves the specified job, whose status is OPEN or recently EXPIRED within the last 90 days. */
export interface GetProjectsTenantsJobsRequest {
  /** Required. The resource name of the job to retrieve. The format is "projects/{project_id}/tenants/{tenant_id}/jobs/{job_id}". For example, "projects/foo/tenants/bar/jobs/baz". */
  name: string;
}

export const GetProjectsTenantsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v4/projects/{projectsId}/tenants/{tenantsId}/jobs/{jobsId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsTenantsJobsRequest>;

export type GetProjectsTenantsJobsResponse = Job;
export const GetProjectsTenantsJobsResponse = Job;

export type GetProjectsTenantsJobsError = CommonErrors;

export const getProjectsTenantsJobs: API.OperationMethod<GetProjectsTenantsJobsRequest, GetProjectsTenantsJobsResponse, GetProjectsTenantsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsTenantsJobsRequest,
  output: GetProjectsTenantsJobsResponse,
  errors: [],
}));

/** Creates a new job. Typically, the job becomes searchable within 10 seconds, but it may take up to 5 minutes. */
export interface CreateProjectsTenantsJobsRequest {
  /** Required. The resource name of the tenant under which the job is created. The format is "projects/{project_id}/tenants/{tenant_id}". For example, "projects/foo/tenants/bar". */
  parent: string;
  /** Request body */
  body?: Job;
}

export const CreateProjectsTenantsJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/projects/{projectsId}/tenants/{tenantsId}/jobs", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsTenantsJobsRequest>;

export type CreateProjectsTenantsJobsResponse = Job;
export const CreateProjectsTenantsJobsResponse = Job;

export type CreateProjectsTenantsJobsError = CommonErrors;

export const createProjectsTenantsJobs: API.OperationMethod<CreateProjectsTenantsJobsRequest, CreateProjectsTenantsJobsResponse, CreateProjectsTenantsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsTenantsJobsRequest,
  output: CreateProjectsTenantsJobsResponse,
  errors: [],
}));

/** Searches for jobs using the provided SearchJobsRequest. This API call is intended for the use case of targeting passive job seekers (for example, job seekers who have signed up to receive email alerts about potential job opportunities), it has different algorithmic adjustments that are designed to specifically target passive job seekers. This call constrains the visibility of jobs present in the database, and only returns jobs the caller has permission to search against. */
export interface SearchForAlertProjectsTenantsJobsRequest {
  /** Required. The resource name of the tenant to search within. The format is "projects/{project_id}/tenants/{tenant_id}". For example, "projects/foo/tenants/bar". */
  parent: string;
  /** Request body */
  body?: SearchJobsRequest;
}

export const SearchForAlertProjectsTenantsJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SearchJobsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/projects/{projectsId}/tenants/{tenantsId}/jobs:searchForAlert", hasBody: true }),
  svc,
) as unknown as Schema.Schema<SearchForAlertProjectsTenantsJobsRequest>;

export type SearchForAlertProjectsTenantsJobsResponse = SearchJobsResponse;
export const SearchForAlertProjectsTenantsJobsResponse = SearchJobsResponse;

export type SearchForAlertProjectsTenantsJobsError = CommonErrors;

export const searchForAlertProjectsTenantsJobs: API.OperationMethod<SearchForAlertProjectsTenantsJobsRequest, SearchForAlertProjectsTenantsJobsResponse, SearchForAlertProjectsTenantsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: SearchForAlertProjectsTenantsJobsRequest,
  output: SearchForAlertProjectsTenantsJobsResponse,
  errors: [],
}));

/** Begins executing a batch create jobs operation. */
export interface BatchCreateProjectsTenantsJobsRequest {
  /** Required. The resource name of the tenant under which the job is created. The format is "projects/{project_id}/tenants/{tenant_id}". For example, "projects/foo/tenants/bar". */
  parent: string;
  /** Request body */
  body?: BatchCreateJobsRequest;
}

export const BatchCreateProjectsTenantsJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchCreateJobsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/projects/{projectsId}/tenants/{tenantsId}/jobs:batchCreate", hasBody: true }),
  svc,
) as unknown as Schema.Schema<BatchCreateProjectsTenantsJobsRequest>;

export type BatchCreateProjectsTenantsJobsResponse = Operation;
export const BatchCreateProjectsTenantsJobsResponse = Operation;

export type BatchCreateProjectsTenantsJobsError = CommonErrors;

export const batchCreateProjectsTenantsJobs: API.OperationMethod<BatchCreateProjectsTenantsJobsRequest, BatchCreateProjectsTenantsJobsResponse, BatchCreateProjectsTenantsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: BatchCreateProjectsTenantsJobsRequest,
  output: BatchCreateProjectsTenantsJobsResponse,
  errors: [],
}));

/** Updates specified job. Typically, updated contents become visible in search results within 10 seconds, but it may take up to 5 minutes. */
export interface PatchProjectsTenantsJobsRequest {
  /** Required during job update. The resource name for the job. This is generated by the service when a job is created. The format is "projects/{project_id}/tenants/{tenant_id}/jobs/{job_id}". For example, "projects/foo/tenants/bar/jobs/baz". Use of this field in job queries and API calls is preferred over the use of requisition_id since this value is unique. */
  name: string;
  /** Strongly recommended for the best service experience. If update_mask is provided, only the specified fields in job are updated. Otherwise all the fields are updated. A field mask to restrict the fields that are updated. Only top level fields of Job are supported. */
  updateMask?: string;
  /** Request body */
  body?: Job;
}

export const PatchProjectsTenantsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  body: Schema.optional(Job).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/projects/{projectsId}/tenants/{tenantsId}/jobs/{jobsId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsTenantsJobsRequest>;

export type PatchProjectsTenantsJobsResponse = Job;
export const PatchProjectsTenantsJobsResponse = Job;

export type PatchProjectsTenantsJobsError = CommonErrors;

export const patchProjectsTenantsJobs: API.OperationMethod<PatchProjectsTenantsJobsRequest, PatchProjectsTenantsJobsResponse, PatchProjectsTenantsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsTenantsJobsRequest,
  output: PatchProjectsTenantsJobsResponse,
  errors: [],
}));

/** Deletes the specified job. Typically, the job becomes unsearchable within 10 seconds, but it may take up to 5 minutes. */
export interface DeleteProjectsTenantsJobsRequest {
  /** Required. The resource name of the job to be deleted. The format is "projects/{project_id}/tenants/{tenant_id}/jobs/{job_id}". For example, "projects/foo/tenants/bar/jobs/baz". */
  name: string;
}

export const DeleteProjectsTenantsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/projects/{projectsId}/tenants/{tenantsId}/jobs/{jobsId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsTenantsJobsRequest>;

export type DeleteProjectsTenantsJobsResponse = Empty;
export const DeleteProjectsTenantsJobsResponse = Empty;

export type DeleteProjectsTenantsJobsError = CommonErrors;

export const deleteProjectsTenantsJobs: API.OperationMethod<DeleteProjectsTenantsJobsRequest, DeleteProjectsTenantsJobsResponse, DeleteProjectsTenantsJobsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsTenantsJobsRequest,
  output: DeleteProjectsTenantsJobsResponse,
  errors: [],
}));

/** Lists all companies associated with the project. */
export interface ListProjectsTenantsCompaniesRequest {
  /** The starting indicator from which to return results. */
  pageToken?: string;
  /** Required. Resource name of the tenant under which the company is created. The format is "projects/{project_id}/tenants/{tenant_id}", for example, "projects/foo/tenants/bar". */
  parent: string;
  /** The maximum number of companies to be returned, at most 100. Default is 100 if a non-positive number is provided. */
  pageSize?: number;
  /** Set to true if the companies requested must have open jobs. Defaults to false. If true, at most page_size of companies are fetched, among which only those with open jobs are returned. */
  requireOpenJobs?: boolean;
}

export const ListProjectsTenantsCompaniesRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  requireOpenJobs: Schema.optional(Schema.Boolean).pipe(T.HttpQuery("requireOpenJobs")),
}).pipe(
  T.Http({ method: "GET", path: "v4/projects/{projectsId}/tenants/{tenantsId}/companies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsTenantsCompaniesRequest>;

export type ListProjectsTenantsCompaniesResponse = ListCompaniesResponse;
export const ListProjectsTenantsCompaniesResponse = ListCompaniesResponse;

export type ListProjectsTenantsCompaniesError = CommonErrors;

export const listProjectsTenantsCompanies = API.makePaginated(() => ({
  input: ListProjectsTenantsCompaniesRequest,
  output: ListProjectsTenantsCompaniesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

/** Retrieves specified company. */
export interface GetProjectsTenantsCompaniesRequest {
  /** Required. The resource name of the company to be retrieved. The format is "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}", for example, "projects/api-test-project/tenants/foo/companies/bar". */
  name: string;
}

export const GetProjectsTenantsCompaniesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "GET", path: "v4/projects/{projectsId}/tenants/{tenantsId}/companies/{companiesId}" }),
  svc,
) as unknown as Schema.Schema<GetProjectsTenantsCompaniesRequest>;

export type GetProjectsTenantsCompaniesResponse = Company;
export const GetProjectsTenantsCompaniesResponse = Company;

export type GetProjectsTenantsCompaniesError = CommonErrors;

export const getProjectsTenantsCompanies: API.OperationMethod<GetProjectsTenantsCompaniesRequest, GetProjectsTenantsCompaniesResponse, GetProjectsTenantsCompaniesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: GetProjectsTenantsCompaniesRequest,
  output: GetProjectsTenantsCompaniesResponse,
  errors: [],
}));

/** Deletes specified company. Prerequisite: The company has no jobs associated with it. */
export interface DeleteProjectsTenantsCompaniesRequest {
  /** Required. The resource name of the company to be deleted. The format is "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}", for example, "projects/foo/tenants/bar/companies/baz". */
  name: string;
}

export const DeleteProjectsTenantsCompaniesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({ method: "DELETE", path: "v4/projects/{projectsId}/tenants/{tenantsId}/companies/{companiesId}" }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsTenantsCompaniesRequest>;

export type DeleteProjectsTenantsCompaniesResponse = Empty;
export const DeleteProjectsTenantsCompaniesResponse = Empty;

export type DeleteProjectsTenantsCompaniesError = CommonErrors;

export const deleteProjectsTenantsCompanies: API.OperationMethod<DeleteProjectsTenantsCompaniesRequest, DeleteProjectsTenantsCompaniesResponse, DeleteProjectsTenantsCompaniesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: DeleteProjectsTenantsCompaniesRequest,
  output: DeleteProjectsTenantsCompaniesResponse,
  errors: [],
}));

/** Updates specified company. */
export interface PatchProjectsTenantsCompaniesRequest {
  /** Strongly recommended for the best service experience. If update_mask is provided, only the specified fields in company are updated. Otherwise all the fields are updated. A field mask to specify the company fields to be updated. Only top level fields of Company are supported. */
  updateMask?: string;
  /** Required during company update. The resource name for a company. This is generated by the service when a company is created. The format is "projects/{project_id}/tenants/{tenant_id}/companies/{company_id}", for example, "projects/foo/tenants/bar/companies/baz". */
  name: string;
  /** Request body */
  body?: Company;
}

export const PatchProjectsTenantsCompaniesRequest = Schema.Struct({
  updateMask: Schema.optional(Schema.String).pipe(T.HttpQuery("updateMask")),
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(Company).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "PATCH", path: "v4/projects/{projectsId}/tenants/{tenantsId}/companies/{companiesId}", hasBody: true }),
  svc,
) as unknown as Schema.Schema<PatchProjectsTenantsCompaniesRequest>;

export type PatchProjectsTenantsCompaniesResponse = Company;
export const PatchProjectsTenantsCompaniesResponse = Company;

export type PatchProjectsTenantsCompaniesError = CommonErrors;

export const patchProjectsTenantsCompanies: API.OperationMethod<PatchProjectsTenantsCompaniesRequest, PatchProjectsTenantsCompaniesResponse, PatchProjectsTenantsCompaniesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: PatchProjectsTenantsCompaniesRequest,
  output: PatchProjectsTenantsCompaniesResponse,
  errors: [],
}));

/** Creates a new company entity. */
export interface CreateProjectsTenantsCompaniesRequest {
  /** Required. Resource name of the tenant under which the company is created. The format is "projects/{project_id}/tenants/{tenant_id}", for example, "projects/foo/tenants/bar". */
  parent: string;
  /** Request body */
  body?: Company;
}

export const CreateProjectsTenantsCompaniesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(Company).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/projects/{projectsId}/tenants/{tenantsId}/companies", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsTenantsCompaniesRequest>;

export type CreateProjectsTenantsCompaniesResponse = Company;
export const CreateProjectsTenantsCompaniesResponse = Company;

export type CreateProjectsTenantsCompaniesError = CommonErrors;

export const createProjectsTenantsCompanies: API.OperationMethod<CreateProjectsTenantsCompaniesRequest, CreateProjectsTenantsCompaniesResponse, CreateProjectsTenantsCompaniesError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsTenantsCompaniesRequest,
  output: CreateProjectsTenantsCompaniesResponse,
  errors: [],
}));

/** Report events issued when end user interacts with customer's application that uses Cloud Talent Solution. You may inspect the created events in [self service tools](https://console.cloud.google.com/talent-solution/overview). [Learn more](https://cloud.google.com/talent-solution/docs/management-tools) about self service tools. */
export interface CreateProjectsTenantsClientEventsRequest {
  /** Required. Resource name of the tenant under which the event is created. The format is "projects/{project_id}/tenants/{tenant_id}", for example, "projects/foo/tenants/bar". */
  parent: string;
  /** Request body */
  body?: ClientEvent;
}

export const CreateProjectsTenantsClientEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(ClientEvent).pipe(T.HttpBody()),
}).pipe(
  T.Http({ method: "POST", path: "v4/projects/{projectsId}/tenants/{tenantsId}/clientEvents", hasBody: true }),
  svc,
) as unknown as Schema.Schema<CreateProjectsTenantsClientEventsRequest>;

export type CreateProjectsTenantsClientEventsResponse = ClientEvent;
export const CreateProjectsTenantsClientEventsResponse = ClientEvent;

export type CreateProjectsTenantsClientEventsError = CommonErrors;

export const createProjectsTenantsClientEvents: API.OperationMethod<CreateProjectsTenantsClientEventsRequest, CreateProjectsTenantsClientEventsResponse, CreateProjectsTenantsClientEventsError, GCPAuth | HttpClient.HttpClient> = API.make(() => ({
  input: CreateProjectsTenantsClientEventsRequest,
  output: CreateProjectsTenantsClientEventsResponse,
  errors: [],
}));

