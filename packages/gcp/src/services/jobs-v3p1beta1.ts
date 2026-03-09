// ==========================================================================
// Cloud Talent Solution API (jobs v3p1beta1)
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
  name: "jobs",
  version: "v3p1beta1",
  rootUrl: "https://jobs.googleapis.com/",
  servicePath: "",
});

// ==========================================================================
// Schemas
// ==========================================================================

export interface LatLng {
  /** The longitude in degrees. It must be in the range [-180.0, +180.0]. */
  longitude?: number;
  /** The latitude in degrees. It must be in the range [-90.0, +90.0]. */
  latitude?: number;
}

export const LatLng: Schema.Schema<LatLng> = Schema.suspend(() =>
  Schema.Struct({
    longitude: Schema.optional(Schema.Number),
    latitude: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "LatLng" }) as any as Schema.Schema<LatLng>;

export interface PostalAddress {
  /** Optional. Generally refers to the city or town portion of the address. Examples: US city, IT comune, UK post town. In regions of the world where localities are not well defined or do not fit into this structure well, leave `locality` empty and use `address_lines`. */
  locality?: string;
  /** Optional. Additional, country-specific, sorting code. This is not used in most regions. Where it is used, the value is either a string like "CEDEX", optionally followed by a number (for example, "CEDEX 7"), or just a number alone, representing the "sector code" (Jamaica), "delivery area indicator" (Malawi) or "post office indicator" (Côte d'Ivoire). */
  sortingCode?: string;
  /** Optional. Highest administrative subdivision which is used for postal addresses of a country or region. For example, this can be a state, a province, an oblast, or a prefecture. For Spain, this is the province and not the autonomous community (for example, "Barcelona" and not "Catalonia"). Many countries don't use an administrative area in postal addresses. For example, in Switzerland, this should be left unpopulated. */
  administrativeArea?: string;
  /** Unstructured address lines describing the lower levels of an address. Because values in `address_lines` do not have type information and may sometimes contain multiple values in a single field (for example, "Austin, TX"), it is important that the line order is clear. The order of address lines should be "envelope order" for the country or region of the address. In places where this can vary (for example, Japan), `address_language` is used to make it explicit (for example, "ja" for large-to-small ordering and "ja-Latn" or "en" for small-to-large). In this way, the most specific line of an address can be selected based on the language. The minimum permitted structural representation of an address consists of a `region_code` with all remaining information placed in the `address_lines`. It would be possible to format such an address very approximately without geocoding, but no semantic reasoning could be made about any of the address components until it was at least partially resolved. Creating an address only containing a `region_code` and `address_lines` and then geocoding is the recommended way to handle completely unstructured addresses (as opposed to guessing which parts of the address should be localities or administrative areas). */
  addressLines?: Array<string>;
  /** Optional. The name of the organization at the address. */
  organization?: string;
  /** Optional. Postal code of the address. Not all countries use or require postal codes to be present, but where they are used, they may trigger additional validation with other parts of the address (for example, state or zip code validation in the United States). */
  postalCode?: string;
  /** The schema revision of the `PostalAddress`. This must be set to 0, which is the latest revision. All new revisions **must** be backward compatible with old revisions. */
  revision?: number;
  /** Optional. BCP-47 language code of the contents of this address (if known). This is often the UI language of the input form or is expected to match one of the languages used in the address' country/region, or their transliterated equivalents. This can affect formatting in certain countries, but is not critical to the correctness of the data and will never affect any validation or other non-formatting related operations. If this value is not known, it should be omitted (rather than specifying a possibly incorrect default). Examples: "zh-Hant", "ja", "ja-Latn", "en". */
  languageCode?: string;
  /** Required. CLDR region code of the country/region of the address. This is never inferred and it is up to the user to ensure the value is correct. See https://cldr.unicode.org/ and https://www.unicode.org/cldr/charts/30/supplemental/territory_information.html for details. Example: "CH" for Switzerland. */
  regionCode?: string;
  /** Optional. Sublocality of the address. For example, this can be a neighborhood, borough, or district. */
  sublocality?: string;
  /** Optional. The recipient at the address. This field may, under certain circumstances, contain multiline information. For example, it might contain "care of" information. */
  recipients?: Array<string>;
}

export const PostalAddress: Schema.Schema<PostalAddress> = Schema.suspend(() =>
  Schema.Struct({
    locality: Schema.optional(Schema.String),
    sortingCode: Schema.optional(Schema.String),
    administrativeArea: Schema.optional(Schema.String),
    addressLines: Schema.optional(Schema.Array(Schema.String)),
    organization: Schema.optional(Schema.String),
    postalCode: Schema.optional(Schema.String),
    revision: Schema.optional(Schema.Number),
    languageCode: Schema.optional(Schema.String),
    regionCode: Schema.optional(Schema.String),
    sublocality: Schema.optional(Schema.String),
    recipients: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({
  identifier: "PostalAddress",
}) as any as Schema.Schema<PostalAddress>;

export interface Location {
  /** The type of a location, which corresponds to the address lines field of PostalAddress. For example, "Downtown, Atlanta, GA, USA" has a type of LocationType#NEIGHBORHOOD, and "Kansas City, KS, USA" has a type of LocationType#LOCALITY. */
  locationType?:
    | "LOCATION_TYPE_UNSPECIFIED"
    | "COUNTRY"
    | "ADMINISTRATIVE_AREA"
    | "SUB_ADMINISTRATIVE_AREA"
    | "LOCALITY"
    | "POSTAL_CODE"
    | "SUB_LOCALITY"
    | "SUB_LOCALITY_1"
    | "SUB_LOCALITY_2"
    | "NEIGHBORHOOD"
    | "STREET_ADDRESS"
    | (string & {});
  /** An object representing a latitude/longitude pair. */
  latLng?: LatLng;
  /** Radius in miles of the job location. This value is derived from the location bounding box in which a circle with the specified radius centered from LatLng covers the area associated with the job location. For example, currently, "Mountain View, CA, USA" has a radius of 6.17 miles. */
  radiusInMiles?: number;
  /** Postal address of the location that includes human readable information, such as postal delivery and payments addresses. Given a postal address, a postal service can deliver items to a premises, P.O. Box, or other delivery location. */
  postalAddress?: PostalAddress;
}

export const Location: Schema.Schema<Location> = Schema.suspend(() =>
  Schema.Struct({
    locationType: Schema.optional(Schema.String),
    latLng: Schema.optional(LatLng),
    radiusInMiles: Schema.optional(Schema.Number),
    postalAddress: Schema.optional(PostalAddress),
  }),
).annotate({ identifier: "Location" }) as any as Schema.Schema<Location>;

export interface CompanyDerivedInfo {
  /** A structured headquarters location of the company, resolved from Company.hq_location if provided. */
  headquartersLocation?: Location;
}

export const CompanyDerivedInfo: Schema.Schema<CompanyDerivedInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      headquartersLocation: Schema.optional(Location),
    }),
  ).annotate({
    identifier: "CompanyDerivedInfo",
  }) as any as Schema.Schema<CompanyDerivedInfo>;

export interface Company {
  /** Optional. The street address of the company's main headquarters, which may be different from the job location. The service attempts to geolocate the provided address, and populates a more specific location wherever possible in DerivedInfo.headquarters_location. */
  headquartersAddress?: string;
  /** Optional. Set to true if it is the hiring agency that post jobs for other employers. Defaults to false if not provided. */
  hiringAgency?: boolean;
  /** Required. The display name of the company, for example, "Google LLC". */
  displayName?: string;
  /** Optional. The employer's company size. */
  size?:
    | "COMPANY_SIZE_UNSPECIFIED"
    | "MINI"
    | "SMALL"
    | "SMEDIUM"
    | "MEDIUM"
    | "BIG"
    | "BIGGER"
    | "GIANT"
    | (string & {});
  /** Optional. A URI that hosts the employer's company logo. */
  imageUri?: string;
  /** Required during company update. The resource name for a company. This is generated by the service when a company is created. The format is "projects/{project_id}/companies/{company_id}", for example, "projects/api-test-project/companies/foo". */
  name?: string;
  /** Required. Client side company identifier, used to uniquely identify the company. The maximum number of allowed characters is 255. */
  externalId?: string;
  /** Optional. The URI representing the company's primary web site or home page, for example, "https://www.google.com". The maximum number of allowed characters is 255. */
  websiteUri?: string;
  /** Optional. Equal Employment Opportunity legal disclaimer text to be associated with all jobs, and typically to be displayed in all roles. The maximum number of allowed characters is 500. */
  eeoText?: string;
  /** Optional. This field is deprecated. Please set the searchability of the custom attribute in the Job.custom_attributes going forward. A list of keys of filterable Job.custom_attributes, whose corresponding `string_values` are used in keyword search. Jobs with `string_values` under these specified field keys are returned if any of the values matches the search keyword. Custom field values with parenthesis, brackets and special symbols won't be properly searchable, and those keyword queries need to be surrounded by quotes. */
  keywordSearchableJobCustomAttributes?: Array<string>;
  /** Optional. The URI to employer's career site or careers page on the employer's web site, for example, "https://careers.google.com". */
  careerSiteUri?: string;
  /** Output only. Derived details about the company. */
  derivedInfo?: CompanyDerivedInfo;
  /** Output only. Indicates whether a company is flagged to be suspended from public availability by the service when job content appears suspicious, abusive, or spammy. */
  suspended?: boolean;
}

export const Company: Schema.Schema<Company> = Schema.suspend(() =>
  Schema.Struct({
    headquartersAddress: Schema.optional(Schema.String),
    hiringAgency: Schema.optional(Schema.Boolean),
    displayName: Schema.optional(Schema.String),
    size: Schema.optional(Schema.String),
    imageUri: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    externalId: Schema.optional(Schema.String),
    websiteUri: Schema.optional(Schema.String),
    eeoText: Schema.optional(Schema.String),
    keywordSearchableJobCustomAttributes: Schema.optional(
      Schema.Array(Schema.String),
    ),
    careerSiteUri: Schema.optional(Schema.String),
    derivedInfo: Schema.optional(CompanyDerivedInfo),
    suspended: Schema.optional(Schema.Boolean),
  }),
).annotate({ identifier: "Company" }) as any as Schema.Schema<Company>;

export interface CreateCompanyRequest {
  /** Required. The company to be created. */
  company?: Company;
}

export const CreateCompanyRequest: Schema.Schema<CreateCompanyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      company: Schema.optional(Company),
    }),
  ).annotate({
    identifier: "CreateCompanyRequest",
  }) as any as Schema.Schema<CreateCompanyRequest>;

export interface JobEvent {
  /** Required. The type of the event (see JobEventType). */
  type?:
    | "JOB_EVENT_TYPE_UNSPECIFIED"
    | "IMPRESSION"
    | "VIEW"
    | "VIEW_REDIRECT"
    | "APPLICATION_START"
    | "APPLICATION_FINISH"
    | "APPLICATION_QUICK_SUBMISSION"
    | "APPLICATION_REDIRECT"
    | "APPLICATION_START_FROM_SEARCH"
    | "APPLICATION_REDIRECT_FROM_SEARCH"
    | "APPLICATION_COMPANY_SUBMIT"
    | "BOOKMARK"
    | "NOTIFICATION"
    | "HIRED"
    | "SENT_CV"
    | "INTERVIEW_GRANTED"
    | "NOT_INTERESTED"
    | (string & {});
  /** Required. The job name(s) associated with this event. For example, if this is an impression event, this field contains the identifiers of all jobs shown to the job seeker. If this was a view event, this field contains the identifier of the viewed job. */
  jobs?: Array<string>;
}

export const JobEvent: Schema.Schema<JobEvent> = Schema.suspend(() =>
  Schema.Struct({
    type: Schema.optional(Schema.String),
    jobs: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "JobEvent" }) as any as Schema.Schema<JobEvent>;

export interface ClientEvent {
  /** Required. A unique ID generated in the API responses. It can be found in ResponseMetadata.request_id. */
  requestId?: string;
  /** Required. A unique identifier, generated by the client application. This `event_id` is used to establish the relationship between different events (see parent_event_id). */
  eventId?: string;
  /** Required. The timestamp of the event. */
  createTime?: string;
  /** A event issued when a job seeker interacts with the application that implements Cloud Talent Solution. */
  jobEvent?: JobEvent;
  /** Optional. Extra information about this event. Used for storing information with no matching field in event payload, for example, user application specific context or details. At most 20 keys are supported. The maximum total size of all keys and values is 2 KB. */
  extraInfo?: Record<string, string>;
  /** Optional. The event_id of an event that resulted in the current event. For example, a Job view event usually follows a parent impression event: A job seeker first does a search where a list of jobs appears (impression). The job seeker then selects a result and views the description of a particular job (Job view). */
  parentEventId?: string;
}

export const ClientEvent: Schema.Schema<ClientEvent> = Schema.suspend(() =>
  Schema.Struct({
    requestId: Schema.optional(Schema.String),
    eventId: Schema.optional(Schema.String),
    createTime: Schema.optional(Schema.String),
    jobEvent: Schema.optional(JobEvent),
    extraInfo: Schema.optional(Schema.Record(Schema.String, Schema.String)),
    parentEventId: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "ClientEvent" }) as any as Schema.Schema<ClientEvent>;

export interface Status {
  /** A list of messages that carry the error details. There is a common set of message types for APIs to use. */
  details?: Array<Record<string, unknown>>;
  /** The status code, which should be an enum value of google.rpc.Code. */
  code?: number;
  /** A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. */
  message?: string;
}

export const Status: Schema.Schema<Status> = Schema.suspend(() =>
  Schema.Struct({
    details: Schema.optional(
      Schema.Array(Schema.Record(Schema.String, Schema.Unknown)),
    ),
    code: Schema.optional(Schema.Number),
    message: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Status" }) as any as Schema.Schema<Status>;

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

export const Operation: Schema.Schema<Operation> = Schema.suspend(() =>
  Schema.Struct({
    error: Schema.optional(Status),
    response: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    done: Schema.optional(Schema.Boolean),
    metadata: Schema.optional(Schema.Record(Schema.String, Schema.Unknown)),
    name: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "Operation" }) as any as Schema.Schema<Operation>;

export interface ResponseMetadata {
  /** A unique id associated with this call. This id is logged for tracking purposes. */
  requestId?: string;
}

export const ResponseMetadata: Schema.Schema<ResponseMetadata> = Schema.suspend(
  () =>
    Schema.Struct({
      requestId: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ResponseMetadata",
}) as any as Schema.Schema<ResponseMetadata>;

export interface HistogramResult {
  /** The Histogram search filters. */
  searchType?:
    | "SEARCH_TYPE_UNSPECIFIED"
    | "COMPANY_ID"
    | "EMPLOYMENT_TYPE"
    | "COMPANY_SIZE"
    | "DATE_PUBLISHED"
    | "EDUCATION_LEVEL"
    | "EXPERIENCE_LEVEL"
    | "ADMIN_1"
    | "COUNTRY"
    | "CITY"
    | "LOCALE"
    | "LANGUAGE"
    | "CATEGORY"
    | "CITY_COORDINATE"
    | "ADMIN_1_COUNTRY"
    | "COMPANY_DISPLAY_NAME"
    | "BASE_COMPENSATION_UNIT"
    | (string & {});
  /** A map from the values of field to the number of jobs with that value in this search result. Key: search type (filter names, such as the companyName). Values: the count of jobs that match the filter for this search. */
  values?: Record<string, number>;
}

export const HistogramResult: Schema.Schema<HistogramResult> = Schema.suspend(
  () =>
    Schema.Struct({
      searchType: Schema.optional(Schema.String),
      values: Schema.optional(Schema.Record(Schema.String, Schema.Number)),
    }),
).annotate({
  identifier: "HistogramResult",
}) as any as Schema.Schema<HistogramResult>;

export interface BucketRange {
  /** Starting value of the bucket range. */
  from?: number;
  /** Ending value of the bucket range. */
  to?: number;
}

export const BucketRange: Schema.Schema<BucketRange> = Schema.suspend(() =>
  Schema.Struct({
    from: Schema.optional(Schema.Number),
    to: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "BucketRange" }) as any as Schema.Schema<BucketRange>;

export interface BucketizedCount {
  /** Number of jobs whose numeric field value fall into `range`. */
  count?: number;
  /** Bucket range on which histogram was performed for the numeric field, that is, the count represents number of jobs in this range. */
  range?: BucketRange;
}

export const BucketizedCount: Schema.Schema<BucketizedCount> = Schema.suspend(
  () =>
    Schema.Struct({
      count: Schema.optional(Schema.Number),
      range: Schema.optional(BucketRange),
    }),
).annotate({
  identifier: "BucketizedCount",
}) as any as Schema.Schema<BucketizedCount>;

export interface NumericBucketingResult {
  /** Stores the maximum value of the numeric field. Is populated only if [NumericBucketingOption.requires_min_max] is set to true. */
  maxValue?: number;
  /** Count within each bucket. Its size is the length of NumericBucketingOption.bucket_bounds plus 1. */
  counts?: Array<BucketizedCount>;
  /** Stores the minimum value of the numeric field. Will be populated only if [NumericBucketingOption.requires_min_max] is set to true. */
  minValue?: number;
}

export const NumericBucketingResult: Schema.Schema<NumericBucketingResult> =
  Schema.suspend(() =>
    Schema.Struct({
      maxValue: Schema.optional(Schema.Number),
      counts: Schema.optional(Schema.Array(BucketizedCount)),
      minValue: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "NumericBucketingResult",
  }) as any as Schema.Schema<NumericBucketingResult>;

export interface CustomAttributeHistogramResult {
  /** Stores a map from the values of string custom field associated with `key` to the number of jobs with that value in this histogram result. */
  stringValueHistogramResult?: Record<string, number>;
  /** Stores bucketed histogram counting result or min/max values for custom attribute long values associated with `key`. */
  longValueHistogramResult?: NumericBucketingResult;
  /** Stores the key of custom attribute the histogram is performed on. */
  key?: string;
}

export const CustomAttributeHistogramResult: Schema.Schema<CustomAttributeHistogramResult> =
  Schema.suspend(() =>
    Schema.Struct({
      stringValueHistogramResult: Schema.optional(
        Schema.Record(Schema.String, Schema.Number),
      ),
      longValueHistogramResult: Schema.optional(NumericBucketingResult),
      key: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomAttributeHistogramResult",
  }) as any as Schema.Schema<CustomAttributeHistogramResult>;

export interface CompensationHistogramResult {
  /** Histogram result. */
  result?: NumericBucketingResult;
  /** Type of the request, corresponding to CompensationHistogramRequest.type. */
  type?:
    | "COMPENSATION_HISTOGRAM_REQUEST_TYPE_UNSPECIFIED"
    | "BASE"
    | "ANNUALIZED_BASE"
    | "ANNUALIZED_TOTAL"
    | (string & {});
}

export const CompensationHistogramResult: Schema.Schema<CompensationHistogramResult> =
  Schema.suspend(() =>
    Schema.Struct({
      result: Schema.optional(NumericBucketingResult),
      type: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CompensationHistogramResult",
  }) as any as Schema.Schema<CompensationHistogramResult>;

export interface HistogramResults {
  /** Specifies histogram results that matches HistogramFacets.simple_histogram_facets. */
  simpleHistogramResults?: Array<HistogramResult>;
  /** Specifies histogram results for custom attributes that match HistogramFacets.custom_attribute_histogram_facets. */
  customAttributeHistogramResults?: Array<CustomAttributeHistogramResult>;
  /** Specifies compensation field-based histogram results that match HistogramFacets.compensation_histogram_requests. */
  compensationHistogramResults?: Array<CompensationHistogramResult>;
}

export const HistogramResults: Schema.Schema<HistogramResults> = Schema.suspend(
  () =>
    Schema.Struct({
      simpleHistogramResults: Schema.optional(Schema.Array(HistogramResult)),
      customAttributeHistogramResults: Schema.optional(
        Schema.Array(CustomAttributeHistogramResult),
      ),
      compensationHistogramResults: Schema.optional(
        Schema.Array(CompensationHistogramResult),
      ),
    }),
).annotate({
  identifier: "HistogramResults",
}) as any as Schema.Schema<HistogramResults>;

export interface CommuteInfo {
  /** Location used as the destination in the commute calculation. */
  jobLocation?: Location;
  /** The number of seconds required to travel to the job location from the query location. A duration of 0 seconds indicates that the job is not reachable within the requested duration, but was returned as part of an expanded query. */
  travelDuration?: string;
}

export const CommuteInfo: Schema.Schema<CommuteInfo> = Schema.suspend(() =>
  Schema.Struct({
    jobLocation: Schema.optional(Location),
    travelDuration: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "CommuteInfo" }) as any as Schema.Schema<CommuteInfo>;

export interface JobDerivedInfo {
  /** Structured locations of the job, resolved from Job.addresses. locations are exactly matched to Job.addresses in the same order. */
  locations?: Array<Location>;
  /** Job categories derived from Job.title and Job.description. */
  jobCategories?: Array<
    | "JOB_CATEGORY_UNSPECIFIED"
    | "ACCOUNTING_AND_FINANCE"
    | "ADMINISTRATIVE_AND_OFFICE"
    | "ADVERTISING_AND_MARKETING"
    | "ANIMAL_CARE"
    | "ART_FASHION_AND_DESIGN"
    | "BUSINESS_OPERATIONS"
    | "CLEANING_AND_FACILITIES"
    | "COMPUTER_AND_IT"
    | "CONSTRUCTION"
    | "CUSTOMER_SERVICE"
    | "EDUCATION"
    | "ENTERTAINMENT_AND_TRAVEL"
    | "FARMING_AND_OUTDOORS"
    | "HEALTHCARE"
    | "HUMAN_RESOURCES"
    | "INSTALLATION_MAINTENANCE_AND_REPAIR"
    | "LEGAL"
    | "MANAGEMENT"
    | "MANUFACTURING_AND_WAREHOUSE"
    | "MEDIA_COMMUNICATIONS_AND_WRITING"
    | "OIL_GAS_AND_MINING"
    | "PERSONAL_CARE_AND_SERVICES"
    | "PROTECTIVE_SERVICES"
    | "REAL_ESTATE"
    | "RESTAURANT_AND_HOSPITALITY"
    | "SALES_AND_RETAIL"
    | "SCIENCE_AND_ENGINEERING"
    | "SOCIAL_SERVICES_AND_NON_PROFIT"
    | "SPORTS_FITNESS_AND_RECREATION"
    | "TRANSPORTATION_AND_LOGISTICS"
    | (string & {})
  >;
}

export const JobDerivedInfo: Schema.Schema<JobDerivedInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      locations: Schema.optional(Schema.Array(Location)),
      jobCategories: Schema.optional(Schema.Array(Schema.String)),
    }),
).annotate({
  identifier: "JobDerivedInfo",
}) as any as Schema.Schema<JobDerivedInfo>;

export interface Money {
  /** The three-letter currency code defined in ISO 4217. */
  currencyCode?: string;
  /** The whole units of the amount. For example if `currencyCode` is `"USD"`, then 1 unit is one US dollar. */
  units?: string;
  /** Number of nano (10^-9) units of the amount. The value must be between -999,999,999 and +999,999,999 inclusive. If `units` is positive, `nanos` must be positive or zero. If `units` is zero, `nanos` can be positive, zero, or negative. If `units` is negative, `nanos` must be negative or zero. For example $-1.75 is represented as `units`=-1 and `nanos`=-750,000,000. */
  nanos?: number;
}

export const Money: Schema.Schema<Money> = Schema.suspend(() =>
  Schema.Struct({
    currencyCode: Schema.optional(Schema.String),
    units: Schema.optional(Schema.String),
    nanos: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "Money" }) as any as Schema.Schema<Money>;

export interface CompensationRange {
  /** Optional. The minimum amount of compensation. If left empty, the value is set to zero and the currency code is set to match the currency code of max_compensation. */
  minCompensation?: Money;
  /** Optional. The maximum amount of compensation. If left empty, the value is set to a maximal compensation value and the currency code is set to match the currency code of min_compensation. */
  maxCompensation?: Money;
}

export const CompensationRange: Schema.Schema<CompensationRange> =
  Schema.suspend(() =>
    Schema.Struct({
      minCompensation: Schema.optional(Money),
      maxCompensation: Schema.optional(Money),
    }),
  ).annotate({
    identifier: "CompensationRange",
  }) as any as Schema.Schema<CompensationRange>;

export interface CompensationEntry {
  /** Optional. Frequency of the specified amount. Default is CompensationUnit.COMPENSATION_UNIT_UNSPECIFIED. */
  unit?:
    | "COMPENSATION_UNIT_UNSPECIFIED"
    | "HOURLY"
    | "DAILY"
    | "WEEKLY"
    | "MONTHLY"
    | "YEARLY"
    | "ONE_TIME"
    | "OTHER_COMPENSATION_UNIT"
    | (string & {});
  /** Optional. Compensation range. */
  range?: CompensationRange;
  /** Optional. Compensation amount. */
  amount?: Money;
  /** Optional. Compensation type. Default is CompensationUnit.COMPENSATION_TYPE_UNSPECIFIED. */
  type?:
    | "COMPENSATION_TYPE_UNSPECIFIED"
    | "BASE"
    | "BONUS"
    | "SIGNING_BONUS"
    | "EQUITY"
    | "PROFIT_SHARING"
    | "COMMISSIONS"
    | "TIPS"
    | "OTHER_COMPENSATION_TYPE"
    | (string & {});
  /** Optional. Expected number of units paid each year. If not specified, when Job.employment_types is FULLTIME, a default value is inferred based on unit. Default values: - HOURLY: 2080 - DAILY: 260 - WEEKLY: 52 - MONTHLY: 12 - ANNUAL: 1 */
  expectedUnitsPerYear?: number;
  /** Optional. Compensation description. For example, could indicate equity terms or provide additional context to an estimated bonus. */
  description?: string;
}

export const CompensationEntry: Schema.Schema<CompensationEntry> =
  Schema.suspend(() =>
    Schema.Struct({
      unit: Schema.optional(Schema.String),
      range: Schema.optional(CompensationRange),
      amount: Schema.optional(Money),
      type: Schema.optional(Schema.String),
      expectedUnitsPerYear: Schema.optional(Schema.Number),
      description: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CompensationEntry",
  }) as any as Schema.Schema<CompensationEntry>;

export interface CompensationInfo {
  /** Output only. Annualized total compensation range. Computed as all compensation entries' CompensationEntry.compensation times CompensationEntry.expected_units_per_year. See CompensationEntry for explanation on compensation annualization. */
  annualizedTotalCompensationRange?: CompensationRange;
  /** Optional. Job compensation information. At most one entry can be of type CompensationInfo.CompensationType.BASE, which is referred as ** base compensation entry ** for the job. */
  entries?: Array<CompensationEntry>;
  /** Output only. Annualized base compensation range. Computed as base compensation entry's CompensationEntry.compensation times CompensationEntry.expected_units_per_year. See CompensationEntry for explanation on compensation annualization. */
  annualizedBaseCompensationRange?: CompensationRange;
}

export const CompensationInfo: Schema.Schema<CompensationInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      annualizedTotalCompensationRange: Schema.optional(CompensationRange),
      entries: Schema.optional(Schema.Array(CompensationEntry)),
      annualizedBaseCompensationRange: Schema.optional(CompensationRange),
    }),
).annotate({
  identifier: "CompensationInfo",
}) as any as Schema.Schema<CompensationInfo>;

export interface ApplicationInfo {
  /** Optional but at least one of uris, emails or instruction must be specified. Use this URI field to direct an applicant to a website, for example to link to an online application form. The maximum number of allowed characters for each entry is 2,000. */
  uris?: Array<string>;
  /** Optional but at least one of uris, emails or instruction must be specified. Use this field to specify email address(es) to which resumes or applications can be sent. The maximum number of allowed characters for each entry is 255. */
  emails?: Array<string>;
  /** Optional but at least one of uris, emails or instruction must be specified. Use this field to provide instructions, such as "Mail your application to ...", that a candidate can follow to apply for the job. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 3,000. */
  instruction?: string;
}

export const ApplicationInfo: Schema.Schema<ApplicationInfo> = Schema.suspend(
  () =>
    Schema.Struct({
      uris: Schema.optional(Schema.Array(Schema.String)),
      emails: Schema.optional(Schema.Array(Schema.String)),
      instruction: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "ApplicationInfo",
}) as any as Schema.Schema<ApplicationInfo>;

export interface CustomAttribute {
  /** Optional but exactly one of string_values or long_values must be specified. This field is used to perform a string match (`CASE_SENSITIVE_MATCH` or `CASE_INSENSITIVE_MATCH`) search. For filterable `string_value`s, a maximum total number of 200 values is allowed, with each `string_value` has a byte size of no more than 500B. For unfilterable `string_values`, the maximum total byte size of unfilterable `string_values` is 50KB. Empty string is not allowed. */
  stringValues?: Array<string>;
  /** Optional but exactly one of string_values or long_values must be specified. This field is used to perform number range search. (`EQ`, `GT`, `GE`, `LE`, `LT`) over filterable `long_value`. Currently at most 1 long_values is supported. */
  longValues?: Array<string>;
  /** Optional. If the `filterable` flag is true, the custom field values may be used for custom attribute filters JobQuery.custom_attribute_filter. If false, these values may not be used for custom attribute filters. Default is false. */
  filterable?: boolean;
}

export const CustomAttribute: Schema.Schema<CustomAttribute> = Schema.suspend(
  () =>
    Schema.Struct({
      stringValues: Schema.optional(Schema.Array(Schema.String)),
      longValues: Schema.optional(Schema.Array(Schema.String)),
      filterable: Schema.optional(Schema.Boolean),
    }),
).annotate({
  identifier: "CustomAttribute",
}) as any as Schema.Schema<CustomAttribute>;

export interface ProcessingOptions {
  /** Optional. Option for job HTML content sanitization. Applied fields are: * description * applicationInfo.instruction * incentives * qualifications * responsibilities HTML tags in these fields may be stripped if sanitiazation is not disabled. Defaults to HtmlSanitization.SIMPLE_FORMATTING_ONLY. */
  htmlSanitization?:
    | "HTML_SANITIZATION_UNSPECIFIED"
    | "HTML_SANITIZATION_DISABLED"
    | "SIMPLE_FORMATTING_ONLY"
    | (string & {});
  /** Optional. If set to `true`, the service does not attempt to resolve a more precise address for the job. */
  disableStreetAddressResolution?: boolean;
}

export const ProcessingOptions: Schema.Schema<ProcessingOptions> =
  Schema.suspend(() =>
    Schema.Struct({
      htmlSanitization: Schema.optional(Schema.String),
      disableStreetAddressResolution: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "ProcessingOptions",
  }) as any as Schema.Schema<ProcessingOptions>;

export interface Job {
  /** Optional. A description of job responsibilities. The use of this field is recommended as an alternative to using the more general description field. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 10,000. */
  responsibilities?: string;
  /** Optional. The end timestamp of the job. Typically this field is used for contracting engagements. Invalid timestamps are ignored. */
  jobEndTime?: string;
  /** Required. The resource name of the company listing the job, such as "projects/api-test-project/companies/foo". */
  companyName?: string;
  /** Output only. The timestamp when this job posting was last updated. */
  postingUpdateTime?: string;
  /** Optional. The language of the posting. This field is distinct from any requirements for fluency that are associated with the job. Language codes must be in BCP-47 format, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47){: class="external" target="_blank" }. If this field is unspecified and Job.description is present, detected language code based on Job.description is assigned, otherwise defaults to 'en_US'. */
  languageCode?: string;
  /** Optional. The start timestamp of the job in UTC time zone. Typically this field is used for contracting engagements. Invalid timestamps are ignored. */
  jobStartTime?: string;
  /** Optional. The benefits included with the job. */
  jobBenefits?: Array<
    | "JOB_BENEFIT_UNSPECIFIED"
    | "CHILD_CARE"
    | "DENTAL"
    | "DOMESTIC_PARTNER"
    | "FLEXIBLE_HOURS"
    | "MEDICAL"
    | "LIFE_INSURANCE"
    | "PARENTAL_LEAVE"
    | "RETIREMENT_PLAN"
    | "SICK_DAYS"
    | "VACATION"
    | "VISION"
    | (string & {})
  >;
  /** Output only. The timestamp when this job posting was created. */
  postingCreateTime?: string;
  /** Required. The requisition ID, also referred to as the posting ID, assigned by the client to identify a job. This field is intended to be used by clients for client identification and tracking of postings. A job is not allowed to be created if there is another job with the same [company_name], language_code and requisition_id. The maximum number of allowed characters is 255. */
  requisitionId?: string;
  /** Optional. A description of bonus, commission, and other compensation incentives associated with the job not including salary or pay. The maximum number of allowed characters is 10,000. */
  incentives?: string;
  /** Optional. A description of the qualifications required to perform the job. The use of this field is recommended as an alternative to using the more general description field. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 10,000. */
  qualifications?: string;
  /** Optional. The employment type(s) of a job, for example, full time or part time. */
  employmentTypes?: Array<
    | "EMPLOYMENT_TYPE_UNSPECIFIED"
    | "FULL_TIME"
    | "PART_TIME"
    | "CONTRACTOR"
    | "CONTRACT_TO_HIRE"
    | "TEMPORARY"
    | "INTERN"
    | "VOLUNTEER"
    | "PER_DIEM"
    | "FLY_IN_FLY_OUT"
    | "OTHER_EMPLOYMENT_TYPE"
    | (string & {})
  >;
  /** Optional but strongly recommended for the best service experience. The expiration timestamp of the job. After this timestamp, the job is marked as expired, and it no longer appears in search results. The expired job can't be deleted or listed by the DeleteJob and ListJobs APIs, but it can be retrieved with the GetJob API or updated with the UpdateJob API. An expired job can be updated and opened again by using a future expiration timestamp. Updating an expired job fails if there is another existing open job with same company_name, language_code and requisition_id. The expired jobs are retained in our system for 90 days. However, the overall expired job count cannot exceed 3 times the maximum of open jobs count over the past week, otherwise jobs with earlier expire time are cleaned first. Expired jobs are no longer accessible after they are cleaned out. Invalid timestamps are ignored, and treated as expire time not provided. Timestamp before the instant request is made is considered valid, the job will be treated as expired immediately. If this value is not provided at the time of job creation or is invalid, the job posting expires after 30 days from the job's creation time. For example, if the job was created on 2017/01/01 13:00AM UTC with an unspecified expiration date, the job expires after 2017/01/31 13:00AM UTC. If this value is not provided on job update, it depends on the field masks set by UpdateJobRequest.update_mask. If the field masks include expiry_time, or the masks are empty meaning that every field is updated, the job posting expires after 30 days from the job's last update time. Otherwise the expiration date isn't updated. */
  postingExpireTime?: string;
  /** Optional. The department or functional area within the company with the open position. The maximum number of allowed characters is 255. */
  department?: string;
  /** Optional. The desired education degrees for the job, such as Bachelors, Masters. */
  degreeTypes?: Array<
    | "DEGREE_TYPE_UNSPECIFIED"
    | "PRIMARY_EDUCATION"
    | "LOWER_SECONDARY_EDUCATION"
    | "UPPER_SECONDARY_EDUCATION"
    | "ADULT_REMEDIAL_EDUCATION"
    | "ASSOCIATES_OR_EQUIVALENT"
    | "BACHELORS_OR_EQUIVALENT"
    | "MASTERS_OR_EQUIVALENT"
    | "DOCTORAL_OR_EQUIVALENT"
    | (string & {})
  >;
  /** Optional. The experience level associated with the job, such as "Entry Level". */
  jobLevel?:
    | "JOB_LEVEL_UNSPECIFIED"
    | "ENTRY_LEVEL"
    | "EXPERIENCED"
    | "MANAGER"
    | "DIRECTOR"
    | "EXECUTIVE"
    | (string & {});
  /** Required. The title of the job, such as "Software Engineer" The maximum number of allowed characters is 500. */
  title?: string;
  /** Optional. The timestamp this job posting was most recently published. The default value is the time the request arrives at the server. Invalid timestamps are ignored. */
  postingPublishTime?: string;
  /** Output only. Derived details about the job posting. */
  derivedInfo?: JobDerivedInfo;
  /** Optional. Job compensation information. */
  compensationInfo?: CompensationInfo;
  /** Required. At least one field within ApplicationInfo must be specified. Job application information. */
  applicationInfo?: ApplicationInfo;
  /** Optional. A map of fields to hold both filterable and non-filterable custom job attributes that are not covered by the provided structured fields. The keys of the map are strings up to 64 bytes and must match the pattern: a-zA-Z*. For example, key0LikeThis or KEY_1_LIKE_THIS. At most 100 filterable and at most 100 unfilterable keys are supported. For filterable `string_values`, across all keys at most 200 values are allowed, with each string no more than 255 characters. For unfilterable `string_values`, the maximum total size of `string_values` across all keys is 50KB. */
  customAttributes?: Record<string, CustomAttribute>;
  /** Optional. A promotion value of the job, as determined by the client. The value determines the sort order of the jobs returned when searching for jobs using the featured jobs search call, with higher promotional values being returned first and ties being resolved by relevance sort. Only the jobs with a promotionValue >0 are returned in a FEATURED_JOB_SEARCH. Default value is 0, and negative values are treated as 0. */
  promotionValue?: number;
  /** Output only. Display name of the company listing the job. */
  companyDisplayName?: string;
  /** Optional. The job PostingRegion (for example, state, country) throughout which the job is available. If this field is set, a LocationFilter in a search query within the job region finds this job posting if an exact location match isn't specified. If this field is set to PostingRegion.NATION or PostingRegion.ADMINISTRATIVE_AREA, setting job Job.addresses to the same location level as this field is strongly recommended. */
  postingRegion?:
    | "POSTING_REGION_UNSPECIFIED"
    | "ADMINISTRATIVE_AREA"
    | "NATION"
    | "TELECOMMUTE"
    | (string & {});
  /** Optional but strongly recommended for the best service experience. Location(s) where the employer is looking to hire for this job posting. Specifying the full street address(es) of the hiring location enables better API results, especially job searches by commute time. At most 50 locations are allowed for best search performance. If a job has more locations, it is suggested to split it into multiple jobs with unique requisition_ids (e.g. 'ReqA' becomes 'ReqA-1', 'ReqA-2', etc.) as multiple jobs with the same company_name, language_code and requisition_id are not allowed. If the original requisition_id must be preserved, a custom field should be used for storage. It is also suggested to group the locations that close to each other in the same job for better search experience. Jobs with multiple addresses must have their addresses with the same LocationType to allow location filtering to work properly. (For example, a Job with addresses "1600 Amphitheatre Parkway, Mountain View, CA, USA" and "London, UK" may not have location filters applied correctly at search time since the first is a LocationType.STREET_ADDRESS and the second is a LocationType.LOCALITY.) If a job needs to have multiple addresses, it is suggested to split it into multiple jobs with same LocationTypes. The maximum number of allowed characters is 500. */
  addresses?: Array<string>;
  /** Deprecated. The job is only visible to the owner. The visibility of the job. Defaults to Visibility.ACCOUNT_ONLY if not specified. */
  visibility?:
    | "VISIBILITY_UNSPECIFIED"
    | "ACCOUNT_ONLY"
    | "SHARED_WITH_GOOGLE"
    | "SHARED_WITH_PUBLIC"
    | (string & {});
  /** Required during job update. The resource name for the job. This is generated by the service when a job is created. The format is "projects/{project_id}/jobs/{job_id}", for example, "projects/api-test-project/jobs/1234". Use of this field in job queries and API calls is preferred over the use of requisition_id since this value is unique. */
  name?: string;
  /** Required. The description of the job, which typically includes a multi-paragraph description of the company and related information. Separate fields are provided on the job object for responsibilities, qualifications, and other job characteristics. Use of these separate job fields is recommended. This field accepts and sanitizes HTML input, and also accepts bold, italic, ordered list, and unordered list markup tags. The maximum number of allowed characters is 100,000. */
  description?: string;
  /** Optional. Options for job processing. */
  processingOptions?: ProcessingOptions;
}

export const Job: Schema.Schema<Job> = Schema.suspend(() =>
  Schema.Struct({
    responsibilities: Schema.optional(Schema.String),
    jobEndTime: Schema.optional(Schema.String),
    companyName: Schema.optional(Schema.String),
    postingUpdateTime: Schema.optional(Schema.String),
    languageCode: Schema.optional(Schema.String),
    jobStartTime: Schema.optional(Schema.String),
    jobBenefits: Schema.optional(Schema.Array(Schema.String)),
    postingCreateTime: Schema.optional(Schema.String),
    requisitionId: Schema.optional(Schema.String),
    incentives: Schema.optional(Schema.String),
    qualifications: Schema.optional(Schema.String),
    employmentTypes: Schema.optional(Schema.Array(Schema.String)),
    postingExpireTime: Schema.optional(Schema.String),
    department: Schema.optional(Schema.String),
    degreeTypes: Schema.optional(Schema.Array(Schema.String)),
    jobLevel: Schema.optional(Schema.String),
    title: Schema.optional(Schema.String),
    postingPublishTime: Schema.optional(Schema.String),
    derivedInfo: Schema.optional(JobDerivedInfo),
    compensationInfo: Schema.optional(CompensationInfo),
    applicationInfo: Schema.optional(ApplicationInfo),
    customAttributes: Schema.optional(
      Schema.Record(Schema.String, CustomAttribute),
    ),
    promotionValue: Schema.optional(Schema.Number),
    companyDisplayName: Schema.optional(Schema.String),
    postingRegion: Schema.optional(Schema.String),
    addresses: Schema.optional(Schema.Array(Schema.String)),
    visibility: Schema.optional(Schema.String),
    name: Schema.optional(Schema.String),
    description: Schema.optional(Schema.String),
    processingOptions: Schema.optional(ProcessingOptions),
  }),
).annotate({ identifier: "Job" }) as any as Schema.Schema<Job>;

export interface MatchingJob {
  /** Commute information which is generated based on specified CommuteFilter. */
  commuteInfo?: CommuteInfo;
  /** A summary of the job with core information that's displayed on the search results listing page. */
  jobSummary?: string;
  /** Contains snippets of text from the Job.description and similar fields that most closely match a search query's keywords, if available. All HTML tags in the original fields are stripped when returned in this field, and matching query keywords are enclosed in HTML bold tags. */
  searchTextSnippet?: string;
  /** Job resource that matches the specified SearchJobsRequest. */
  job?: Job;
  /** Contains snippets of text from the Job.job_title field most closely matching a search query's keywords, if available. The matching query keywords are enclosed in HTML bold tags. */
  jobTitleSnippet?: string;
}

export const MatchingJob: Schema.Schema<MatchingJob> = Schema.suspend(() =>
  Schema.Struct({
    commuteInfo: Schema.optional(CommuteInfo),
    jobSummary: Schema.optional(Schema.String),
    searchTextSnippet: Schema.optional(Schema.String),
    job: Schema.optional(Job),
    jobTitleSnippet: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "MatchingJob" }) as any as Schema.Schema<MatchingJob>;

export interface SpellingCorrection {
  /** Indicates if the query was corrected by the spell checker. */
  corrected?: boolean;
  /** Correction output consisting of the corrected keyword string. */
  correctedText?: string;
}

export const SpellingCorrection: Schema.Schema<SpellingCorrection> =
  Schema.suspend(() =>
    Schema.Struct({
      corrected: Schema.optional(Schema.Boolean),
      correctedText: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "SpellingCorrection",
  }) as any as Schema.Schema<SpellingCorrection>;

export interface HistogramQueryResult {
  /** A map from the values of the facet associated with distinct values to the number of matching entries with corresponding value. The key format is: * (for string histogram) string values stored in the field. * (for named numeric bucket) name specified in `bucket()` function, like for `bucket(0, MAX, "non-negative")`, the key will be `non-negative`. * (for anonymous numeric bucket) range formatted as `-`, for example, `0-1000`, `MIN-0`, and `0-MAX`. */
  histogram?: Record<string, string>;
  /** Requested histogram expression. */
  histogramQuery?: string;
}

export const HistogramQueryResult: Schema.Schema<HistogramQueryResult> =
  Schema.suspend(() =>
    Schema.Struct({
      histogram: Schema.optional(Schema.Record(Schema.String, Schema.String)),
      histogramQuery: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "HistogramQueryResult",
  }) as any as Schema.Schema<HistogramQueryResult>;

export interface SearchJobsResponse {
  /** Additional information for the API invocation, such as the request tracking id. */
  metadata?: ResponseMetadata;
  /** The precise result count with limit 100,000. */
  totalSize?: number;
  /** If query broadening is enabled, we may append additional results from the broadened query. This number indicates how many of the jobs returned in the jobs field are from the broadened query. These results are always at the end of the jobs list. In particular, a value of 0, or if the field isn't set, all the jobs in the jobs list are from the original (without broadening) query. If this field is non-zero, subsequent requests with offset after this result set should contain all broadened results. */
  broadenedQueryJobsCount?: number;
  /** The location filters that the service applied to the specified query. If any filters are lat-lng based, the JobLocation.location_type is JobLocation.LocationType#LOCATION_TYPE_UNSPECIFIED. */
  locationFilters?: Array<Location>;
  /** The histogram results that match specified SearchJobsRequest.histogram_facets. */
  histogramResults?: HistogramResults;
  /** An estimation of the number of jobs that match the specified query. This number is not guaranteed to be accurate. For accurate results, see SearchJobsResponse.total_size. */
  estimatedTotalSize?: number;
  /** The Job entities that match the specified SearchJobsRequest. */
  matchingJobs?: Array<MatchingJob>;
  /** The token that specifies the starting position of the next page of results. This field is empty if there are no more results. */
  nextPageToken?: string;
  /** The spell checking result, and correction. */
  spellCorrection?: SpellingCorrection;
  /** The histogram results that match with specified SearchJobsRequest.histogram_queries. */
  histogramQueryResults?: Array<HistogramQueryResult>;
}

export const SearchJobsResponse: Schema.Schema<SearchJobsResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      metadata: Schema.optional(ResponseMetadata),
      totalSize: Schema.optional(Schema.Number),
      broadenedQueryJobsCount: Schema.optional(Schema.Number),
      locationFilters: Schema.optional(Schema.Array(Location)),
      histogramResults: Schema.optional(HistogramResults),
      estimatedTotalSize: Schema.optional(Schema.Number),
      matchingJobs: Schema.optional(Schema.Array(MatchingJob)),
      nextPageToken: Schema.optional(Schema.String),
      spellCorrection: Schema.optional(SpellingCorrection),
      histogramQueryResults: Schema.optional(
        Schema.Array(HistogramQueryResult),
      ),
    }),
  ).annotate({
    identifier: "SearchJobsResponse",
  }) as any as Schema.Schema<SearchJobsResponse>;

export interface CompletionResult {
  /** The URI of the company image for CompletionType.COMPANY_NAME. */
  imageUri?: string;
  /** The suggestion for the query. */
  suggestion?: string;
  /** The completion topic. */
  type?:
    | "COMPLETION_TYPE_UNSPECIFIED"
    | "JOB_TITLE"
    | "COMPANY_NAME"
    | "COMBINED"
    | (string & {});
}

export const CompletionResult: Schema.Schema<CompletionResult> = Schema.suspend(
  () =>
    Schema.Struct({
      imageUri: Schema.optional(Schema.String),
      suggestion: Schema.optional(Schema.String),
      type: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "CompletionResult",
}) as any as Schema.Schema<CompletionResult>;

export interface ListJobsResponse {
  /** Additional information for the API invocation, such as the request tracking id. */
  metadata?: ResponseMetadata;
  /** A token to retrieve the next page of results. */
  nextPageToken?: string;
  /** The Jobs for a given company. The maximum number of items returned is based on the limit field provided in the request. */
  jobs?: Array<Job>;
}

export const ListJobsResponse: Schema.Schema<ListJobsResponse> = Schema.suspend(
  () =>
    Schema.Struct({
      metadata: Schema.optional(ResponseMetadata),
      nextPageToken: Schema.optional(Schema.String),
      jobs: Schema.optional(Schema.Array(Job)),
    }),
).annotate({
  identifier: "ListJobsResponse",
}) as any as Schema.Schema<ListJobsResponse>;

export interface HistogramQuery {
  /** An expression specifies a histogram request against matching resources (for example, jobs) for searches. Expression syntax is a aggregation function call with histogram facets and other options. Available aggregation function calls are: * `count(string_histogram_facet)`: Count the number of matching entity, for each distinct attribute value. * `count(numeric_histogram_facet, list of buckets)`: Count the number of matching entity within each bucket. A maximum of 200 histogram buckets are supported. Data types: * Histogram facet: facet names with format a-zA-Z+. * String: string like "any string with backslash escape for quote(\")." * Number: whole number and floating point number like 10, -1 and -0.01. * List: list of elements with comma(,) separator surrounded by square brackets. For example, [1, 2, 3] and ["one", "two", "three"]. Built-in constants: * MIN (minimum number similar to java Double.MIN_VALUE) * MAX (maximum number similar to java Double.MAX_VALUE) Built-in functions: * bucket(start, end[, label]): bucket built-in function creates a bucket with range of start, end). Note that the end is exclusive. For example, bucket(1, MAX, "positive number") or bucket(1, 10). Job histogram facets: * company_id: histogram by [Job.distributor_company_id. * company_display_name: histogram by Job.company_display_name. * employment_type: histogram by Job.employment_types. For example, "FULL_TIME", "PART_TIME". * company_size (DEPRECATED): histogram by CompanySize, for example, "SMALL", "MEDIUM", "BIG". * publish_time_in_day: histogram by the Job.publish_time in days. Must specify list of numeric buckets in spec. * publish_time_in_month: histogram by the Job.publish_time in months. Must specify list of numeric buckets in spec. * publish_time_in_year: histogram by the Job.publish_time in years. Must specify list of numeric buckets in spec. * degree_type: histogram by the Job.degree_type. For example, "Bachelors", "Masters". * job_level: histogram by the Job.job_level. For example, "Entry Level". * country: histogram by the country code of jobs. For example, "US", "FR". * admin1: histogram by the admin1 code of jobs, which is a global placeholder referring to the state, province, or the particular term a country uses to define the geographic structure below the country level. For example, "CA", "IL". * city: histogram by a combination of the "city name, admin1 code". For example, "Mountain View, CA", "New York, NY". * admin1_country: histogram by a combination of the "admin1 code, country". For example, "CA, US", "IL, US". * city_coordinate: histogram by the city center's GPS coordinates (latitude and longitude). For example, 37.4038522,-122.0987765. Since the coordinates of a city center can change, customers may need to refresh them periodically. * locale: histogram by the Job.language_code. For example, "en-US", "fr-FR". * language: histogram by the language subtag of the Job.language_code. For example, "en", "fr". * category: histogram by the JobCategory. For example, "COMPUTER_AND_IT", "HEALTHCARE". * base_compensation_unit: histogram by the CompensationUnit of base salary. For example, "WEEKLY", "MONTHLY". * base_compensation: histogram by the base salary. Must specify list of numeric buckets to group results by. * annualized_base_compensation: histogram by the base annualized salary. Must specify list of numeric buckets to group results by. * annualized_total_compensation: histogram by the total annualized salary. Must specify list of numeric buckets to group results by. * string_custom_attribute: histogram by string Job.custom_attributes. Values can be accessed via square bracket notations like string_custom_attribute["key1"]. * numeric_custom_attribute: histogram by numeric Job.custom_attributes. Values can be accessed via square bracket notations like numeric_custom_attribute["key1"]. Must specify list of numeric buckets to group results by. Example expressions: * count(admin1) * count(base_compensation, [bucket(1000, 10000), bucket(10000, 100000), bucket(100000, MAX)]) * count(string_custom_attribute["some-string-custom-attribute"]) * count(numeric_custom_attribute["some-numeric-custom-attribute"], [bucket(MIN, 0, "negative"), bucket(0, MAX, "non-negative")]) */
  histogramQuery?: string;
}

export const HistogramQuery: Schema.Schema<HistogramQuery> = Schema.suspend(
  () =>
    Schema.Struct({
      histogramQuery: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "HistogramQuery",
}) as any as Schema.Schema<HistogramQuery>;

export interface NumericBucketingOption {
  /** Required. Two adjacent values form a histogram bucket. Values should be in ascending order. For example, if [5, 10, 15] are provided, four buckets are created: (-inf, 5), 5, 10), [10, 15), [15, inf). At most 20 [buckets_bound is supported. */
  bucketBounds?: Array<number>;
  /** Optional. If set to true, the histogram result includes minimum/maximum value of the numeric field. */
  requiresMinMax?: boolean;
}

export const NumericBucketingOption: Schema.Schema<NumericBucketingOption> =
  Schema.suspend(() =>
    Schema.Struct({
      bucketBounds: Schema.optional(Schema.Array(Schema.Number)),
      requiresMinMax: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "NumericBucketingOption",
  }) as any as Schema.Schema<NumericBucketingOption>;

export interface UpdateJobRequest {
  /** Required. The Job to be updated. */
  job?: Job;
  /** Optional but strongly recommended to be provided for the best service experience. If update_mask is provided, only the specified fields in job are updated. Otherwise all the fields are updated. A field mask to restrict the fields that are updated. Only top level fields of Job are supported. */
  updateMask?: string;
}

export const UpdateJobRequest: Schema.Schema<UpdateJobRequest> = Schema.suspend(
  () =>
    Schema.Struct({
      job: Schema.optional(Job),
      updateMask: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "UpdateJobRequest",
}) as any as Schema.Schema<UpdateJobRequest>;

export interface CompensationHistogramRequest {
  /** Required. Type of the request, representing which field the histogramming should be performed over. A single request can only specify one histogram of each `CompensationHistogramRequestType`. */
  type?:
    | "COMPENSATION_HISTOGRAM_REQUEST_TYPE_UNSPECIFIED"
    | "BASE"
    | "ANNUALIZED_BASE"
    | "ANNUALIZED_TOTAL"
    | (string & {});
  /** Required. Numeric histogram options, like buckets, whether include min or max value. */
  bucketingOption?: NumericBucketingOption;
}

export const CompensationHistogramRequest: Schema.Schema<CompensationHistogramRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      type: Schema.optional(Schema.String),
      bucketingOption: Schema.optional(NumericBucketingOption),
    }),
  ).annotate({
    identifier: "CompensationHistogramRequest",
  }) as any as Schema.Schema<CompensationHistogramRequest>;

export interface CustomRankingInfo {
  /** Required. Controls over how important the score of CustomRankingInfo.ranking_expression gets applied to job's final ranking position. An error is thrown if not specified. */
  importanceLevel?:
    | "IMPORTANCE_LEVEL_UNSPECIFIED"
    | "NONE"
    | "LOW"
    | "MILD"
    | "MEDIUM"
    | "HIGH"
    | "EXTREME"
    | (string & {});
  /** Required. Controls over how job documents get ranked on top of existing relevance score (determined by API algorithm). A combination of the ranking expression and relevance score is used to determine job's final ranking position. The syntax for this expression is a subset of Google SQL syntax. Supported operators are: +, -, *, /, where the left and right side of the operator is either a numeric Job.custom_attributes key, integer/double value or an expression that can be evaluated to a number. Parenthesis are supported to adjust calculation precedence. The expression must be < 200 characters in length. The expression is considered invalid for a job if the expression references custom attributes that are not populated on the job or if the expression results in a divide by zero. If an expression is invalid for a job, that job is demoted to the end of the results. Sample ranking expression (year + 25) * 0.25 - (freshness / 0.5) */
  rankingExpression?: string;
}

export const CustomRankingInfo: Schema.Schema<CustomRankingInfo> =
  Schema.suspend(() =>
    Schema.Struct({
      importanceLevel: Schema.optional(Schema.String),
      rankingExpression: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "CustomRankingInfo",
  }) as any as Schema.Schema<CustomRankingInfo>;

export interface Empty {}

export const Empty: Schema.Schema<Empty> = Schema.suspend(() =>
  Schema.Struct({}),
).annotate({ identifier: "Empty" }) as any as Schema.Schema<Empty>;

export interface CompensationFilter {
  /** Optional. If set to true, jobs with unspecified compensation range fields are included. */
  includeJobsWithUnspecifiedCompensationRange?: boolean;
  /** Required. Type of filter. */
  type?:
    | "FILTER_TYPE_UNSPECIFIED"
    | "UNIT_ONLY"
    | "UNIT_AND_AMOUNT"
    | "ANNUALIZED_BASE_AMOUNT"
    | "ANNUALIZED_TOTAL_AMOUNT"
    | (string & {});
  /** Required. Specify desired `base compensation entry's` CompensationInfo.CompensationUnit. */
  units?: Array<
    | "COMPENSATION_UNIT_UNSPECIFIED"
    | "HOURLY"
    | "DAILY"
    | "WEEKLY"
    | "MONTHLY"
    | "YEARLY"
    | "ONE_TIME"
    | "OTHER_COMPENSATION_UNIT"
    | (string & {})
  >;
  /** Optional. Compensation range. */
  range?: CompensationRange;
}

export const CompensationFilter: Schema.Schema<CompensationFilter> =
  Schema.suspend(() =>
    Schema.Struct({
      includeJobsWithUnspecifiedCompensationRange: Schema.optional(
        Schema.Boolean,
      ),
      type: Schema.optional(Schema.String),
      units: Schema.optional(Schema.Array(Schema.String)),
      range: Schema.optional(CompensationRange),
    }),
  ).annotate({
    identifier: "CompensationFilter",
  }) as any as Schema.Schema<CompensationFilter>;

export interface TimeOfDay {
  /** Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. */
  hours?: number;
  /** Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. */
  minutes?: number;
  /** Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. */
  nanos?: number;
  /** Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. */
  seconds?: number;
}

export const TimeOfDay: Schema.Schema<TimeOfDay> = Schema.suspend(() =>
  Schema.Struct({
    hours: Schema.optional(Schema.Number),
    minutes: Schema.optional(Schema.Number),
    nanos: Schema.optional(Schema.Number),
    seconds: Schema.optional(Schema.Number),
  }),
).annotate({ identifier: "TimeOfDay" }) as any as Schema.Schema<TimeOfDay>;

export interface ListCompaniesResponse {
  /** Additional information for the API invocation, such as the request tracking id. */
  metadata?: ResponseMetadata;
  /** A token to retrieve the next page of results. */
  nextPageToken?: string;
  /** Companies for the current client. */
  companies?: Array<Company>;
}

export const ListCompaniesResponse: Schema.Schema<ListCompaniesResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      metadata: Schema.optional(ResponseMetadata),
      nextPageToken: Schema.optional(Schema.String),
      companies: Schema.optional(Schema.Array(Company)),
    }),
  ).annotate({
    identifier: "ListCompaniesResponse",
  }) as any as Schema.Schema<ListCompaniesResponse>;

export interface BatchDeleteJobsRequest {
  /** Required. The filter string specifies the jobs to be deleted. Supported operator: =, AND The fields eligible for filtering are: * `companyName` (Required) * `requisitionId` (Required) Sample Query: companyName = "projects/api-test-project/companies/123" AND requisitionId = "req-1" */
  filter?: string;
}

export const BatchDeleteJobsRequest: Schema.Schema<BatchDeleteJobsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      filter: Schema.optional(Schema.String),
    }),
  ).annotate({
    identifier: "BatchDeleteJobsRequest",
  }) as any as Schema.Schema<BatchDeleteJobsRequest>;

export interface TimestampRange {
  /** Begin of the period. */
  startTime?: string;
  /** End of the period. */
  endTime?: string;
}

export const TimestampRange: Schema.Schema<TimestampRange> = Schema.suspend(
  () =>
    Schema.Struct({
      startTime: Schema.optional(Schema.String),
      endTime: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "TimestampRange",
}) as any as Schema.Schema<TimestampRange>;

export interface CommuteFilter {
  /** Optional. The departure time used to calculate traffic impact, represented as google.type.TimeOfDay in local time zone. Currently traffic model is restricted to hour level resolution. */
  departureTime?: TimeOfDay;
  /** Required. The method of transportation for which to calculate the commute time. */
  commuteMethod?:
    | "COMMUTE_METHOD_UNSPECIFIED"
    | "DRIVING"
    | "TRANSIT"
    | "WALKING"
    | "CYCLING"
    | (string & {});
  /** Required. The latitude and longitude of the location from which to calculate the commute time. */
  startCoordinates?: LatLng;
  /** Optional. If true, jobs without "precise" addresses (street level addresses or GPS coordinates) might also be returned. For city and coarser level addresses, text matching is used. If this field is set to false or is not specified, only jobs that include precise addresses are returned by Commute Search. Note: If `allow_imprecise_addresses` is set to true, Commute Search is not able to calculate accurate commute times to jobs with city level and coarser address information. Jobs with imprecise addresses will return a `travel_duration` time of 0 regardless of distance from the job seeker. */
  allowImpreciseAddresses?: boolean;
  /** Optional. Specifies the traffic density to use when calculating commute time. */
  roadTraffic?:
    | "ROAD_TRAFFIC_UNSPECIFIED"
    | "TRAFFIC_FREE"
    | "BUSY_HOUR"
    | (string & {});
  /** Required. The maximum travel time in seconds. The maximum allowed value is `3600s` (one hour). Format is `123s`. */
  travelDuration?: string;
}

export const CommuteFilter: Schema.Schema<CommuteFilter> = Schema.suspend(() =>
  Schema.Struct({
    departureTime: Schema.optional(TimeOfDay),
    commuteMethod: Schema.optional(Schema.String),
    startCoordinates: Schema.optional(LatLng),
    allowImpreciseAddresses: Schema.optional(Schema.Boolean),
    roadTraffic: Schema.optional(Schema.String),
    travelDuration: Schema.optional(Schema.String),
  }),
).annotate({
  identifier: "CommuteFilter",
}) as any as Schema.Schema<CommuteFilter>;

export interface CustomAttributeHistogramRequest {
  /** Optional. Specifies buckets used to perform a range histogram on Job's filterable long custom field values, or min/max value requirements. */
  longValueHistogramBucketingOption?: NumericBucketingOption;
  /** Required. Specifies the custom field key to perform a histogram on. If specified without `long_value_histogram_bucketing_option`, histogram on string values of the given `key` is triggered, otherwise histogram is performed on long values. */
  key?: string;
  /** Optional. If set to true, the response includes the histogram value for each key as a string. */
  stringValueHistogram?: boolean;
}

export const CustomAttributeHistogramRequest: Schema.Schema<CustomAttributeHistogramRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      longValueHistogramBucketingOption: Schema.optional(
        NumericBucketingOption,
      ),
      key: Schema.optional(Schema.String),
      stringValueHistogram: Schema.optional(Schema.Boolean),
    }),
  ).annotate({
    identifier: "CustomAttributeHistogramRequest",
  }) as any as Schema.Schema<CustomAttributeHistogramRequest>;

export interface HistogramFacets {
  /** Optional. Specifies compensation field-based histogram requests. Duplicate values of CompensationHistogramRequest.type are not allowed. */
  compensationHistogramFacets?: Array<CompensationHistogramRequest>;
  /** Optional. Specifies the simple type of histogram facets, for example, `COMPANY_SIZE`, `EMPLOYMENT_TYPE` etc. */
  simpleHistogramFacets?: Array<
    | "SEARCH_TYPE_UNSPECIFIED"
    | "COMPANY_ID"
    | "EMPLOYMENT_TYPE"
    | "COMPANY_SIZE"
    | "DATE_PUBLISHED"
    | "EDUCATION_LEVEL"
    | "EXPERIENCE_LEVEL"
    | "ADMIN_1"
    | "COUNTRY"
    | "CITY"
    | "LOCALE"
    | "LANGUAGE"
    | "CATEGORY"
    | "CITY_COORDINATE"
    | "ADMIN_1_COUNTRY"
    | "COMPANY_DISPLAY_NAME"
    | "BASE_COMPENSATION_UNIT"
    | (string & {})
  >;
  /** Optional. Specifies the custom attributes histogram requests. Duplicate values of CustomAttributeHistogramRequest.key are not allowed. */
  customAttributeHistogramFacets?: Array<CustomAttributeHistogramRequest>;
}

export const HistogramFacets: Schema.Schema<HistogramFacets> = Schema.suspend(
  () =>
    Schema.Struct({
      compensationHistogramFacets: Schema.optional(
        Schema.Array(CompensationHistogramRequest),
      ),
      simpleHistogramFacets: Schema.optional(Schema.Array(Schema.String)),
      customAttributeHistogramFacets: Schema.optional(
        Schema.Array(CustomAttributeHistogramRequest),
      ),
    }),
).annotate({
  identifier: "HistogramFacets",
}) as any as Schema.Schema<HistogramFacets>;

export interface CreateClientEventRequest {
  /** Required. Events issued when end user interacts with customer's application that uses Cloud Talent Solution. */
  clientEvent?: ClientEvent;
}

export const CreateClientEventRequest: Schema.Schema<CreateClientEventRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      clientEvent: Schema.optional(ClientEvent),
    }),
  ).annotate({
    identifier: "CreateClientEventRequest",
  }) as any as Schema.Schema<CreateClientEventRequest>;

export interface CreateJobRequest {
  /** Required. The Job to be created. */
  job?: Job;
}

export const CreateJobRequest: Schema.Schema<CreateJobRequest> = Schema.suspend(
  () =>
    Schema.Struct({
      job: Schema.optional(Job),
    }),
).annotate({
  identifier: "CreateJobRequest",
}) as any as Schema.Schema<CreateJobRequest>;

export interface DeviceInfo {
  /** Optional. Type of the device. */
  deviceType?:
    | "DEVICE_TYPE_UNSPECIFIED"
    | "WEB"
    | "MOBILE_WEB"
    | "ANDROID"
    | "IOS"
    | "BOT"
    | "OTHER"
    | (string & {});
  /** Optional. A device-specific ID. The ID must be a unique identifier that distinguishes the device from other devices. */
  id?: string;
}

export const DeviceInfo: Schema.Schema<DeviceInfo> = Schema.suspend(() =>
  Schema.Struct({
    deviceType: Schema.optional(Schema.String),
    id: Schema.optional(Schema.String),
  }),
).annotate({ identifier: "DeviceInfo" }) as any as Schema.Schema<DeviceInfo>;

export interface RequestMetadata {
  /** Optional. The type of device used by the job seeker at the time of the call to the service. */
  deviceInfo?: DeviceInfo;
  /** Required. The client-defined scope or source of the service call, which typically is the domain on which the service has been implemented and is currently being run. For example, if the service is being run by client *Foo, Inc.*, on job board www.foo.com and career site www.bar.com, then this field is set to "foo.com" for use on the job board, and "bar.com" for use on the career site. If this field isn't available for some reason, send "UNKNOWN". Any improvements to the model for a particular tenant site rely on this field being set correctly to a domain. The maximum number of allowed characters is 255. */
  domain?: string;
  /** Required. A unique session identification string. A session is defined as the duration of an end user's interaction with the service over a certain period. Obfuscate this field for privacy concerns before providing it to the service. If this field is not available for some reason, send "UNKNOWN". Note that any improvements to the model for a particular tenant site, rely on this field being set correctly to some unique session_id. The maximum number of allowed characters is 255. */
  sessionId?: string;
  /** Required. A unique user identification string, as determined by the client. To have the strongest positive impact on search quality make sure the client-level is unique. Obfuscate this field for privacy concerns before providing it to the service. If this field is not available for some reason, send "UNKNOWN". Note that any improvements to the model for a particular tenant site, rely on this field being set correctly to a unique user_id. The maximum number of allowed characters is 255. */
  userId?: string;
}

export const RequestMetadata: Schema.Schema<RequestMetadata> = Schema.suspend(
  () =>
    Schema.Struct({
      deviceInfo: Schema.optional(DeviceInfo),
      domain: Schema.optional(Schema.String),
      sessionId: Schema.optional(Schema.String),
      userId: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "RequestMetadata",
}) as any as Schema.Schema<RequestMetadata>;

export interface LocationFilter {
  /** Optional. The distance_in_miles is applied when the location being searched for is identified as a city or smaller. When the location being searched for is a state or larger, this field is ignored. */
  distanceInMiles?: number;
  /** Optional. The address name, such as "Mountain View" or "Bay Area". */
  address?: string;
  /** Optional. Allows the client to return jobs without a set location, specifically, telecommuting jobs (telecommuting is considered by the service as a special location). Job.posting_region indicates if a job permits telecommuting. If this field is set to TelecommutePreference.TELECOMMUTE_ALLOWED, telecommuting jobs are searched, and address and lat_lng are ignored. If not set or set to TelecommutePreference.TELECOMMUTE_EXCLUDED, the telecommute status of the jobs is ignored. Jobs that have PostingRegion.TELECOMMUTE and have additional Job.addresses may still be matched based on other location filters using address or latlng. This filter can be used by itself to search exclusively for telecommuting jobs, or it can be combined with another location filter to search for a combination of job locations, such as "Mountain View" or "telecommuting" jobs. However, when used in combination with other location filters, telecommuting jobs can be treated as less relevant than other jobs in the search response. */
  telecommutePreference?:
    | "TELECOMMUTE_PREFERENCE_UNSPECIFIED"
    | "TELECOMMUTE_EXCLUDED"
    | "TELECOMMUTE_ALLOWED"
    | "TELECOMMUTE_JOBS_EXCLUDED"
    | (string & {});
  /** Optional. The latitude and longitude of the geographic center from which to search. This field's ignored if `address` is provided. */
  latLng?: LatLng;
  /** Optional. CLDR region code of the country/region. This field may be used in two ways: 1) If telecommute preference is not set, this field is used address ambiguity of the user-input address. For example, "Liverpool" may refer to "Liverpool, NY, US" or "Liverpool, UK". This region code biases the address resolution toward a specific country or territory. If this field is not set, address resolution is biased toward the United States by default. 2) If telecommute preference is set to TELECOMMUTE_ALLOWED, the telecommute location filter will be limited to the region specified in this field. If this field is not set, the telecommute job locations will not be limited. See https://unicode-org.github.io/cldr-staging/charts/latest/supplemental/territory_information.html for details. Example: "CH" for Switzerland. */
  regionCode?: string;
}

export const LocationFilter: Schema.Schema<LocationFilter> = Schema.suspend(
  () =>
    Schema.Struct({
      distanceInMiles: Schema.optional(Schema.Number),
      address: Schema.optional(Schema.String),
      telecommutePreference: Schema.optional(Schema.String),
      latLng: Schema.optional(LatLng),
      regionCode: Schema.optional(Schema.String),
    }),
).annotate({
  identifier: "LocationFilter",
}) as any as Schema.Schema<LocationFilter>;

export interface JobQuery {
  /** Optional. This filter specifies the company Company.display_name of the jobs to search against. The company name must match the value exactly. Alternatively, the value being searched for can be wrapped in different match operators. `SUBSTRING_MATCH([value])` The company name must contain a case insensitive substring match of the value. Using this function may increase latency. Sample Value: `SUBSTRING_MATCH(google)` `MULTI_WORD_TOKEN_MATCH([value])` The value will be treated as a multi word token and the company name must contain a case insensitive match of the value. Using this function may increase latency. Sample Value: `MULTI_WORD_TOKEN_MATCH(google)` If a value isn't specified, jobs within the search results are associated with any company. If multiple values are specified, jobs within the search results may be associated with any of the specified companies. At most 20 company display name filters are allowed. */
  companyDisplayNames?: Array<string>;
  /** Optional. The category filter specifies the categories of jobs to search against. See Category for more information. If a value is not specified, jobs from any category are searched against. If multiple values are specified, jobs from any of the specified categories are searched against. */
  jobCategories?: Array<
    | "JOB_CATEGORY_UNSPECIFIED"
    | "ACCOUNTING_AND_FINANCE"
    | "ADMINISTRATIVE_AND_OFFICE"
    | "ADVERTISING_AND_MARKETING"
    | "ANIMAL_CARE"
    | "ART_FASHION_AND_DESIGN"
    | "BUSINESS_OPERATIONS"
    | "CLEANING_AND_FACILITIES"
    | "COMPUTER_AND_IT"
    | "CONSTRUCTION"
    | "CUSTOMER_SERVICE"
    | "EDUCATION"
    | "ENTERTAINMENT_AND_TRAVEL"
    | "FARMING_AND_OUTDOORS"
    | "HEALTHCARE"
    | "HUMAN_RESOURCES"
    | "INSTALLATION_MAINTENANCE_AND_REPAIR"
    | "LEGAL"
    | "MANAGEMENT"
    | "MANUFACTURING_AND_WAREHOUSE"
    | "MEDIA_COMMUNICATIONS_AND_WRITING"
    | "OIL_GAS_AND_MINING"
    | "PERSONAL_CARE_AND_SERVICES"
    | "PROTECTIVE_SERVICES"
    | "REAL_ESTATE"
    | "RESTAURANT_AND_HOSPITALITY"
    | "SALES_AND_RETAIL"
    | "SCIENCE_AND_ENGINEERING"
    | "SOCIAL_SERVICES_AND_NON_PROFIT"
    | "SPORTS_FITNESS_AND_RECREATION"
    | "TRANSPORTATION_AND_LOGISTICS"
    | (string & {})
  >;
  /** Optional. This search filter is applied only to Job.compensation_info. For example, if the filter is specified as "Hourly job with per-hour compensation > $15", only jobs meeting these criteria are searched. If a filter isn't defined, all open jobs are searched. */
  compensationFilter?: CompensationFilter;
  /** Optional. This filter specifies the locale of jobs to search against, for example, "en-US". If a value isn't specified, the search results can contain jobs in any locale. Language codes should be in BCP-47 format, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47). At most 10 language code filters are allowed. */
  languageCodes?: Array<string>;
  /** Optional. Jobs published within a range specified by this filter are searched against. */
  publishTimeRange?: TimestampRange;
  /** Optional. Allows filtering jobs by commute time with different travel methods (for example, driving or public transit). Note: This only works with COMMUTE MODE. When specified, [JobQuery.location_filters] is ignored. Currently we don't support sorting by commute time. */
  commuteFilter?: CommuteFilter;
  /** The language code of query. For example, "en-US". This field helps to better interpret the query. If a value isn't specified, the query language code is automatically detected, which may not be accurate. Language code should be in BCP-47 format, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47). */
  queryLanguageCode?: string;
  /** Optional. This filter specifies a structured syntax to match against the Job.custom_attributes marked as `filterable`. The syntax for this expression is a subset of SQL syntax. Supported operators are: `=`, `!=`, `<`, `<=`, `>`, and `>=` where the left of the operator is a custom field key and the right of the operator is a number or a quoted string. You must escape backslash (\\) and quote (\") characters. Supported functions are `LOWER([field_name])` to perform a case insensitive match and `EMPTY([field_name])` to filter on the existence of a key. Boolean expressions (AND/OR/NOT) are supported up to 3 levels of nesting (for example, "((A AND B AND C) OR NOT D) AND E"), a maximum of 100 comparisons or functions are allowed in the expression. The expression must be < 10000 bytes in length. Sample Query: `(LOWER(driving_license)="class \"a\"" OR EMPTY(driving_license)) AND driving_years > 10` */
  customAttributeFilter?: string;
  /** Optional. This flag controls the spell-check feature. If false, the service attempts to correct a misspelled query, for example, "enginee" is corrected to "engineer". Defaults to false: a spell check is performed. */
  disableSpellCheck?: boolean;
  /** Optional. This filter specifies the company entities to search against. If a value isn't specified, jobs are searched for against all companies. If multiple values are specified, jobs are searched against the companies specified. The format is "projects/{project_id}/companies/{company_id}", for example, "projects/api-test-project/companies/foo". At most 20 company filters are allowed. */
  companyNames?: Array<string>;
  /** Optional. The location filter specifies geo-regions containing the jobs to search against. See LocationFilter for more information. If a location value isn't specified, jobs fitting the other search criteria are retrieved regardless of where they're located. If multiple values are specified, jobs are retrieved from any of the specified locations. If different values are specified for the LocationFilter.distance_in_miles parameter, the maximum provided distance is used for all locations. At most 5 location filters are allowed. */
  locationFilters?: Array<LocationFilter>;
  /** Optional. The employment type filter specifies the employment type of jobs to search against, such as EmploymentType.FULL_TIME. If a value is not specified, jobs in the search results includes any employment type. If multiple values are specified, jobs in the search results include any of the specified employment types. */
  employmentTypes?: Array<
    | "EMPLOYMENT_TYPE_UNSPECIFIED"
    | "FULL_TIME"
    | "PART_TIME"
    | "CONTRACTOR"
    | "CONTRACT_TO_HIRE"
    | "TEMPORARY"
    | "INTERN"
    | "VOLUNTEER"
    | "PER_DIEM"
    | "FLY_IN_FLY_OUT"
    | "OTHER_EMPLOYMENT_TYPE"
    | (string & {})
  >;
  /** Optional. The query string that matches against the job title, description, and location fields. The maximum number of allowed characters is 255. */
  query?: string;
  /** Optional. This filter specifies a list of job names to be excluded during search. At most 400 excluded job names are allowed. */
  excludedJobs?: Array<string>;
}

export const JobQuery: Schema.Schema<JobQuery> = Schema.suspend(() =>
  Schema.Struct({
    companyDisplayNames: Schema.optional(Schema.Array(Schema.String)),
    jobCategories: Schema.optional(Schema.Array(Schema.String)),
    compensationFilter: Schema.optional(CompensationFilter),
    languageCodes: Schema.optional(Schema.Array(Schema.String)),
    publishTimeRange: Schema.optional(TimestampRange),
    commuteFilter: Schema.optional(CommuteFilter),
    queryLanguageCode: Schema.optional(Schema.String),
    customAttributeFilter: Schema.optional(Schema.String),
    disableSpellCheck: Schema.optional(Schema.Boolean),
    companyNames: Schema.optional(Schema.Array(Schema.String)),
    locationFilters: Schema.optional(Schema.Array(LocationFilter)),
    employmentTypes: Schema.optional(Schema.Array(Schema.String)),
    query: Schema.optional(Schema.String),
    excludedJobs: Schema.optional(Schema.Array(Schema.String)),
  }),
).annotate({ identifier: "JobQuery" }) as any as Schema.Schema<JobQuery>;

export interface SearchJobsRequest {
  /** Optional. Expression based histogram requests for jobs matching JobQuery. */
  histogramQueries?: Array<HistogramQuery>;
  /** Required. The meta information collected about the job searcher, used to improve the search quality of the service. The identifiers (such as `user_id`) are provided by users, and must be unique and consistent. */
  requestMetadata?: RequestMetadata;
  /** This field is deprecated. */
  requirePreciseResultSize?: boolean;
  /** Optional. Query used to search against jobs, such as keyword, location filters, etc. */
  jobQuery?: JobQuery;
  /** Optional. An integer that specifies the current offset (that is, starting result location, amongst the jobs deemed by the API as relevant) in search results. This field is only considered if page_token is unset. The maximum allowed value is 5000. Otherwise an error is thrown. For example, 0 means to return results starting from the first matching job, and 10 means to return from the 11th job. This can be used for pagination, (for example, pageSize = 10 and offset = 10 means to return from the second page). */
  offset?: number;
  /** Optional. Controls whether to disable exact keyword match on Job.job_title, Job.description, Job.company_display_name, Job.locations, Job.qualifications. When disable keyword match is turned off, a keyword match returns jobs that do not match given category filters when there are matching keywords. For example, the query "program manager," a result is returned even if the job posting has the title "software developer," which does not fall into "program manager" ontology, but does have "program manager" appearing in its description. For queries like "cloud" that does not contain title or location specific ontology, jobs with "cloud" keyword matches are returned regardless of this flag's value. Please use Company.keyword_searchable_custom_fields or Company.keyword_searchable_custom_attributes if company specific globally matched custom field/attribute string values is needed. Enabling keyword match improves recall of subsequent search requests. Defaults to false. */
  disableKeywordMatch?: boolean;
  /** Optional. Mode of a search. Defaults to SearchMode.JOB_SEARCH. */
  searchMode?:
    | "SEARCH_MODE_UNSPECIFIED"
    | "JOB_SEARCH"
    | "FEATURED_JOB_SEARCH"
    | (string & {});
  /** Optional. Controls over how job documents get ranked on top of existing relevance score (determined by API algorithm). */
  customRankingInfo?: CustomRankingInfo;
  /** Optional. Histogram requests for jobs matching JobQuery. */
  histogramFacets?: HistogramFacets;
  /** Optional. Controls whether highly similar jobs are returned next to each other in the search results. Jobs are identified as highly similar based on their titles, job categories, and locations. Highly similar results are clustered so that only one representative job of the cluster is displayed to the job seeker higher up in the results, with the other jobs being displayed lower down in the results. Defaults to DiversificationLevel.SIMPLE if no value is specified. */
  diversificationLevel?:
    | "DIVERSIFICATION_LEVEL_UNSPECIFIED"
    | "DISABLED"
    | "SIMPLE"
    | (string & {});
  /** Optional. Controls whether to broaden the search when it produces sparse results. Broadened queries append results to the end of the matching results list. Defaults to false. */
  enableBroadening?: boolean;
  /** Optional. The token specifying the current offset within search results. See SearchJobsResponse.next_page_token for an explanation of how to obtain the next set of query results. */
  pageToken?: string;
  /** Optional. The desired job attributes returned for jobs in the search response. Defaults to JobView.SMALL if no value is specified. */
  jobView?:
    | "JOB_VIEW_UNSPECIFIED"
    | "JOB_VIEW_ID_ONLY"
    | "JOB_VIEW_MINIMAL"
    | "JOB_VIEW_SMALL"
    | "JOB_VIEW_FULL"
    | (string & {});
  /** Optional. The criteria determining how search results are sorted. Default is "relevance desc". Supported options are: * `"relevance desc"`: By relevance descending, as determined by the API algorithms. Relevance thresholding of query results is only available with this ordering. * `"posting_publish_time desc"`: By Job.posting_publish_time descending. * `"posting_update_time desc"`: By Job.posting_update_time descending. * `"title"`: By Job.title ascending. * `"title desc"`: By Job.title descending. * `"annualized_base_compensation"`: By job's CompensationInfo.annualized_base_compensation_range ascending. Jobs whose annualized base compensation is unspecified are put at the end of search results. * `"annualized_base_compensation desc"`: By job's CompensationInfo.annualized_base_compensation_range descending. Jobs whose annualized base compensation is unspecified are put at the end of search results. * `"annualized_total_compensation"`: By job's CompensationInfo.annualized_total_compensation_range ascending. Jobs whose annualized base compensation is unspecified are put at the end of search results. * `"annualized_total_compensation desc"`: By job's CompensationInfo.annualized_total_compensation_range descending. Jobs whose annualized base compensation is unspecified are put at the end of search results. * `"custom_ranking desc"`: By the relevance score adjusted to the SearchJobsRequest.custom_ranking_info.ranking_expression with weight factor assigned by SearchJobsRequest.custom_ranking_info.importance_level in descending order. * Location sorting: Use the special syntax to order jobs by distance: "`distance_from('Hawaii')`": Order by distance from Hawaii. "`distance_from(19.89, 155.5)`": Order by distance from a coordinate. "`distance_from('Hawaii'), distance_from('Puerto Rico')`": Order by multiple locations. See details below. "`distance_from('Hawaii'), distance_from(19.89, 155.5)`": Order by multiple locations. See details below. The string can have a maximum of 256 characters. When multiple distance centers are provided, a job that is close to any of the distance centers would have a high rank. When a job has multiple locations, the job location closest to one of the distance centers will be used. Jobs that don't have locations will be ranked at the bottom. Distance is calculated with a precision of 11.3 meters (37.4 feet). Diversification strategy is still applied unless explicitly disabled in diversification_level. */
  orderBy?: string;
  /** Optional. A limit on the number of jobs returned in the search results. Increasing this value above the default value of 10 can increase search response time. The value can be between 1 and 100. */
  pageSize?: number;
}

export const SearchJobsRequest: Schema.Schema<SearchJobsRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      histogramQueries: Schema.optional(Schema.Array(HistogramQuery)),
      requestMetadata: Schema.optional(RequestMetadata),
      requirePreciseResultSize: Schema.optional(Schema.Boolean),
      jobQuery: Schema.optional(JobQuery),
      offset: Schema.optional(Schema.Number),
      disableKeywordMatch: Schema.optional(Schema.Boolean),
      searchMode: Schema.optional(Schema.String),
      customRankingInfo: Schema.optional(CustomRankingInfo),
      histogramFacets: Schema.optional(HistogramFacets),
      diversificationLevel: Schema.optional(Schema.String),
      enableBroadening: Schema.optional(Schema.Boolean),
      pageToken: Schema.optional(Schema.String),
      jobView: Schema.optional(Schema.String),
      orderBy: Schema.optional(Schema.String),
      pageSize: Schema.optional(Schema.Number),
    }),
  ).annotate({
    identifier: "SearchJobsRequest",
  }) as any as Schema.Schema<SearchJobsRequest>;

export interface CompleteQueryResponse {
  /** Additional information for the API invocation, such as the request tracking id. */
  metadata?: ResponseMetadata;
  /** Results of the matching job/company candidates. */
  completionResults?: Array<CompletionResult>;
}

export const CompleteQueryResponse: Schema.Schema<CompleteQueryResponse> =
  Schema.suspend(() =>
    Schema.Struct({
      metadata: Schema.optional(ResponseMetadata),
      completionResults: Schema.optional(Schema.Array(CompletionResult)),
    }),
  ).annotate({
    identifier: "CompleteQueryResponse",
  }) as any as Schema.Schema<CompleteQueryResponse>;

export interface UpdateCompanyRequest {
  /** Optional but strongly recommended for the best service experience. If update_mask is provided, only the specified fields in company are updated. Otherwise all the fields are updated. A field mask to specify the company fields to be updated. Only top level fields of Company are supported. */
  updateMask?: string;
  /** Required. The company resource to replace the current resource in the system. */
  company?: Company;
}

export const UpdateCompanyRequest: Schema.Schema<UpdateCompanyRequest> =
  Schema.suspend(() =>
    Schema.Struct({
      updateMask: Schema.optional(Schema.String),
      company: Schema.optional(Company),
    }),
  ).annotate({
    identifier: "UpdateCompanyRequest",
  }) as any as Schema.Schema<UpdateCompanyRequest>;

// ==========================================================================
// Operations
// ==========================================================================

export interface CompleteProjectsRequest {
  /** Required. Completion result count. The maximum allowed page size is 10. */
  pageSize?: number;
  /** Required. Resource name of project the completion is performed within. The format is "projects/{project_id}", for example, "projects/api-test-project". */
  name: string;
  /** Optional. The completion topic. The default is CompletionType.COMBINED. */
  type?:
    | "COMPLETION_TYPE_UNSPECIFIED"
    | "JOB_TITLE"
    | "COMPANY_NAME"
    | "COMBINED"
    | (string & {});
  /** Optional. The list of languages of the query. This is the BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47). For CompletionType.JOB_TITLE type, only open jobs with the same language_codes are returned. For CompletionType.COMPANY_NAME type, only companies having open jobs with the same language_codes are returned. For CompletionType.COMBINED type, only open jobs with the same language_codes or companies having open jobs with the same language_codes are returned. The maximum number of allowed characters is 255. */
  languageCodes?: string[];
  /** Optional. The scope of the completion. The defaults is CompletionScope.PUBLIC. */
  scope?: "COMPLETION_SCOPE_UNSPECIFIED" | "TENANT" | "PUBLIC" | (string & {});
  /** Optional. If provided, restricts completion to specified company. The format is "projects/{project_id}/companies/{company_id}", for example, "projects/api-test-project/companies/foo". */
  companyName?: string;
  /** Required. The query used to generate suggestions. The maximum number of allowed characters is 255. */
  query?: string;
  /** Deprecated. Use language_codes instead. Optional. The language of the query. This is the BCP-47 language code, such as "en-US" or "sr-Latn". For more information, see [Tags for Identifying Languages](https://tools.ietf.org/html/bcp47). For CompletionType.JOB_TITLE type, only open jobs with the same language_code are returned. For CompletionType.COMPANY_NAME type, only companies having open jobs with the same language_code are returned. For CompletionType.COMBINED type, only open jobs with the same language_code or companies having open jobs with the same language_code are returned. The maximum number of allowed characters is 255. */
  languageCode?: string;
}

export const CompleteProjectsRequest = Schema.Struct({
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  name: Schema.String.pipe(T.HttpPath("name")),
  type: Schema.optional(Schema.String).pipe(T.HttpQuery("type")),
  languageCodes: Schema.optional(Schema.Array(Schema.String)).pipe(
    T.HttpQuery("languageCodes"),
  ),
  scope: Schema.optional(Schema.String).pipe(T.HttpQuery("scope")),
  companyName: Schema.optional(Schema.String).pipe(T.HttpQuery("companyName")),
  query: Schema.optional(Schema.String).pipe(T.HttpQuery("query")),
  languageCode: Schema.optional(Schema.String).pipe(
    T.HttpQuery("languageCode"),
  ),
}).pipe(
  T.Http({ method: "GET", path: "v3p1beta1/projects/{projectsId}:complete" }),
  svc,
) as unknown as Schema.Schema<CompleteProjectsRequest>;

export type CompleteProjectsResponse = CompleteQueryResponse;
export const CompleteProjectsResponse = CompleteQueryResponse;

export type CompleteProjectsError = DefaultErrors;

/** Completes the specified prefix with keyword suggestions. Intended for use by a job search auto-complete search box. */
export const completeProjects: API.OperationMethod<
  CompleteProjectsRequest,
  CompleteProjectsResponse,
  CompleteProjectsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CompleteProjectsRequest,
  output: CompleteProjectsResponse,
  errors: [],
}));

export interface CreateProjectsClientEventsRequest {
  /** Parent project name. */
  parent: string;
  /** Request body */
  body?: CreateClientEventRequest;
}

export const CreateProjectsClientEventsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateClientEventRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v3p1beta1/projects/{projectsId}/clientEvents",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsClientEventsRequest>;

export type CreateProjectsClientEventsResponse = ClientEvent;
export const CreateProjectsClientEventsResponse = ClientEvent;

export type CreateProjectsClientEventsError = DefaultErrors;

/** Report events issued when end user interacts with customer's application that uses Cloud Talent Solution. You may inspect the created events in [self service tools](https://console.cloud.google.com/talent-solution/overview). [Learn more](https://cloud.google.com/talent-solution/docs/management-tools) about self service tools. */
export const createProjectsClientEvents: API.OperationMethod<
  CreateProjectsClientEventsRequest,
  CreateProjectsClientEventsResponse,
  CreateProjectsClientEventsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsClientEventsRequest,
  output: CreateProjectsClientEventsResponse,
  errors: [],
}));

export interface GetProjectsOperationsRequest {
  /** The name of the operation resource. */
  name: string;
}

export const GetProjectsOperationsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v3p1beta1/projects/{projectsId}/operations/{operationsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsOperationsRequest>;

export type GetProjectsOperationsResponse = Operation;
export const GetProjectsOperationsResponse = Operation;

export type GetProjectsOperationsError = DefaultErrors;

/** Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service. */
export const getProjectsOperations: API.OperationMethod<
  GetProjectsOperationsRequest,
  GetProjectsOperationsResponse,
  GetProjectsOperationsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsOperationsRequest,
  output: GetProjectsOperationsResponse,
  errors: [],
}));

export interface ListProjectsCompaniesRequest {
  /** Optional. Set to true if the companies requested must have open jobs. Defaults to false. If true, at most page_size of companies are fetched, among which only those with open jobs are returned. */
  requireOpenJobs?: boolean;
  /** Optional. The starting indicator from which to return results. */
  pageToken?: string;
  /** Optional. The maximum number of companies to be returned, at most 100. Default is 100 if a non-positive number is provided. */
  pageSize?: number;
  /** Required. Resource name of the project under which the company is created. The format is "projects/{project_id}", for example, "projects/api-test-project". */
  parent: string;
}

export const ListProjectsCompaniesRequest = Schema.Struct({
  requireOpenJobs: Schema.optional(Schema.Boolean).pipe(
    T.HttpQuery("requireOpenJobs"),
  ),
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
}).pipe(
  T.Http({ method: "GET", path: "v3p1beta1/projects/{projectsId}/companies" }),
  svc,
) as unknown as Schema.Schema<ListProjectsCompaniesRequest>;

export type ListProjectsCompaniesResponse = ListCompaniesResponse;
export const ListProjectsCompaniesResponse = ListCompaniesResponse;

export type ListProjectsCompaniesError = DefaultErrors;

/** Lists all companies associated with the service account. */
export const listProjectsCompanies: API.PaginatedOperationMethod<
  ListProjectsCompaniesRequest,
  ListProjectsCompaniesResponse,
  ListProjectsCompaniesError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsCompaniesRequest,
  output: ListProjectsCompaniesResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface DeleteProjectsCompaniesRequest {
  /** Required. The resource name of the company to be deleted. The format is "projects/{project_id}/companies/{company_id}", for example, "projects/api-test-project/companies/foo". */
  name: string;
}

export const DeleteProjectsCompaniesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v3p1beta1/projects/{projectsId}/companies/{companiesId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsCompaniesRequest>;

export type DeleteProjectsCompaniesResponse = Empty;
export const DeleteProjectsCompaniesResponse = Empty;

export type DeleteProjectsCompaniesError = DefaultErrors;

/** Deletes specified company. Prerequisite: The company has no jobs associated with it. */
export const deleteProjectsCompanies: API.OperationMethod<
  DeleteProjectsCompaniesRequest,
  DeleteProjectsCompaniesResponse,
  DeleteProjectsCompaniesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsCompaniesRequest,
  output: DeleteProjectsCompaniesResponse,
  errors: [],
}));

export interface GetProjectsCompaniesRequest {
  /** Required. The resource name of the company to be retrieved. The format is "projects/{project_id}/companies/{company_id}", for example, "projects/api-test-project/companies/foo". */
  name: string;
}

export const GetProjectsCompaniesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v3p1beta1/projects/{projectsId}/companies/{companiesId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsCompaniesRequest>;

export type GetProjectsCompaniesResponse = Company;
export const GetProjectsCompaniesResponse = Company;

export type GetProjectsCompaniesError = DefaultErrors;

/** Retrieves specified company. */
export const getProjectsCompanies: API.OperationMethod<
  GetProjectsCompaniesRequest,
  GetProjectsCompaniesResponse,
  GetProjectsCompaniesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsCompaniesRequest,
  output: GetProjectsCompaniesResponse,
  errors: [],
}));

export interface CreateProjectsCompaniesRequest {
  /** Required. Resource name of the project under which the company is created. The format is "projects/{project_id}", for example, "projects/api-test-project". */
  parent: string;
  /** Request body */
  body?: CreateCompanyRequest;
}

export const CreateProjectsCompaniesRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateCompanyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v3p1beta1/projects/{projectsId}/companies",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsCompaniesRequest>;

export type CreateProjectsCompaniesResponse = Company;
export const CreateProjectsCompaniesResponse = Company;

export type CreateProjectsCompaniesError = DefaultErrors;

/** Creates a new company entity. */
export const createProjectsCompanies: API.OperationMethod<
  CreateProjectsCompaniesRequest,
  CreateProjectsCompaniesResponse,
  CreateProjectsCompaniesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsCompaniesRequest,
  output: CreateProjectsCompaniesResponse,
  errors: [],
}));

export interface PatchProjectsCompaniesRequest {
  /** Required during company update. The resource name for a company. This is generated by the service when a company is created. The format is "projects/{project_id}/companies/{company_id}", for example, "projects/api-test-project/companies/foo". */
  name: string;
  /** Request body */
  body?: UpdateCompanyRequest;
}

export const PatchProjectsCompaniesRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateCompanyRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v3p1beta1/projects/{projectsId}/companies/{companiesId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsCompaniesRequest>;

export type PatchProjectsCompaniesResponse = Company;
export const PatchProjectsCompaniesResponse = Company;

export type PatchProjectsCompaniesError = DefaultErrors;

/** Updates specified company. Company names can't be updated. To update a company name, delete the company and all jobs associated with it, and only then re-create them. */
export const patchProjectsCompanies: API.OperationMethod<
  PatchProjectsCompaniesRequest,
  PatchProjectsCompaniesResponse,
  PatchProjectsCompaniesError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsCompaniesRequest,
  output: PatchProjectsCompaniesResponse,
  errors: [],
}));

export interface DeleteProjectsJobsRequest {
  /** Required. The resource name of the job to be deleted. The format is "projects/{project_id}/jobs/{job_id}", for example, "projects/api-test-project/jobs/1234". */
  name: string;
}

export const DeleteProjectsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "DELETE",
    path: "v3p1beta1/projects/{projectsId}/jobs/{jobsId}",
  }),
  svc,
) as unknown as Schema.Schema<DeleteProjectsJobsRequest>;

export type DeleteProjectsJobsResponse = Empty;
export const DeleteProjectsJobsResponse = Empty;

export type DeleteProjectsJobsError = DefaultErrors;

/** Deletes the specified job. Typically, the job becomes unsearchable within 10 seconds, but it may take up to 5 minutes. */
export const deleteProjectsJobs: API.OperationMethod<
  DeleteProjectsJobsRequest,
  DeleteProjectsJobsResponse,
  DeleteProjectsJobsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: DeleteProjectsJobsRequest,
  output: DeleteProjectsJobsResponse,
  errors: [],
}));

export interface PatchProjectsJobsRequest {
  /** Required during job update. The resource name for the job. This is generated by the service when a job is created. The format is "projects/{project_id}/jobs/{job_id}", for example, "projects/api-test-project/jobs/1234". Use of this field in job queries and API calls is preferred over the use of requisition_id since this value is unique. */
  name: string;
  /** Request body */
  body?: UpdateJobRequest;
}

export const PatchProjectsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
  body: Schema.optional(UpdateJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "PATCH",
    path: "v3p1beta1/projects/{projectsId}/jobs/{jobsId}",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<PatchProjectsJobsRequest>;

export type PatchProjectsJobsResponse = Job;
export const PatchProjectsJobsResponse = Job;

export type PatchProjectsJobsError = DefaultErrors;

/** Updates specified job. Typically, updated contents become visible in search results within 10 seconds, but it may take up to 5 minutes. */
export const patchProjectsJobs: API.OperationMethod<
  PatchProjectsJobsRequest,
  PatchProjectsJobsResponse,
  PatchProjectsJobsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: PatchProjectsJobsRequest,
  output: PatchProjectsJobsResponse,
  errors: [],
}));

export interface SearchForAlertProjectsJobsRequest {
  /** Required. The resource name of the project to search within. The format is "projects/{project_id}", for example, "projects/api-test-project". */
  parent: string;
  /** Request body */
  body?: SearchJobsRequest;
}

export const SearchForAlertProjectsJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SearchJobsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v3p1beta1/projects/{projectsId}/jobs:searchForAlert",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SearchForAlertProjectsJobsRequest>;

export type SearchForAlertProjectsJobsResponse = SearchJobsResponse;
export const SearchForAlertProjectsJobsResponse = SearchJobsResponse;

export type SearchForAlertProjectsJobsError = DefaultErrors;

/** Searches for jobs using the provided SearchJobsRequest. This API call is intended for the use case of targeting passive job seekers (for example, job seekers who have signed up to receive email alerts about potential job opportunities), and has different algorithmic adjustments that are targeted to passive job seekers. This call constrains the visibility of jobs present in the database, and only returns jobs the caller has permission to search against. */
export const searchForAlertProjectsJobs: API.OperationMethod<
  SearchForAlertProjectsJobsRequest,
  SearchForAlertProjectsJobsResponse,
  SearchForAlertProjectsJobsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SearchForAlertProjectsJobsRequest,
  output: SearchForAlertProjectsJobsResponse,
  errors: [],
}));

export interface ListProjectsJobsRequest {
  /** Optional. The starting point of a query result. */
  pageToken?: string;
  /** Required. The filter string specifies the jobs to be enumerated. Supported operator: =, AND The fields eligible for filtering are: * `companyName` * `requisitionId` * `status` Available values: OPEN, EXPIRED, ALL. Defaults to OPEN if no value is specified. At least one of `companyName` and `requisitionId` must present or an INVALID_ARGUMENT error is thrown. Sample Query: * companyName = "projects/api-test-project/companies/123" * companyName = "projects/api-test-project/companies/123" AND requisitionId = "req-1" * companyName = "projects/api-test-project/companies/123" AND status = "EXPIRED" * requisitionId = "req-1" * requisitionId = "req-1" AND status = "EXPIRED" */
  filter?: string;
  /** Required. The resource name of the project under which the job is created. The format is "projects/{project_id}", for example, "projects/api-test-project". */
  parent: string;
  /** Optional. The desired job attributes returned for jobs in the search response. Defaults to JobView.JOB_VIEW_FULL if no value is specified. */
  jobView?:
    | "JOB_VIEW_UNSPECIFIED"
    | "JOB_VIEW_ID_ONLY"
    | "JOB_VIEW_MINIMAL"
    | "JOB_VIEW_SMALL"
    | "JOB_VIEW_FULL"
    | (string & {});
  /** Optional. The maximum number of jobs to be returned per page of results. If job_view is set to JobView.JOB_VIEW_ID_ONLY, the maximum allowed page size is 1000. Otherwise, the maximum allowed page size is 100. Default is 100 if empty or a number < 1 is specified. */
  pageSize?: number;
}

export const ListProjectsJobsRequest = Schema.Struct({
  pageToken: Schema.optional(Schema.String).pipe(T.HttpQuery("pageToken")),
  filter: Schema.optional(Schema.String).pipe(T.HttpQuery("filter")),
  parent: Schema.String.pipe(T.HttpPath("parent")),
  jobView: Schema.optional(Schema.String).pipe(T.HttpQuery("jobView")),
  pageSize: Schema.optional(Schema.Number).pipe(T.HttpQuery("pageSize")),
}).pipe(
  T.Http({ method: "GET", path: "v3p1beta1/projects/{projectsId}/jobs" }),
  svc,
) as unknown as Schema.Schema<ListProjectsJobsRequest>;

export type ListProjectsJobsResponse = ListJobsResponse;
export const ListProjectsJobsResponse = ListJobsResponse;

export type ListProjectsJobsError = DefaultErrors;

/** Lists jobs by filter. */
export const listProjectsJobs: API.PaginatedOperationMethod<
  ListProjectsJobsRequest,
  ListProjectsJobsResponse,
  ListProjectsJobsError,
  Credentials | HttpClient.HttpClient
> = API.makePaginated(() => ({
  input: ListProjectsJobsRequest,
  output: ListProjectsJobsResponse,
  errors: [],
  pagination: {
    inputToken: "pageToken",
    outputToken: "nextPageToken",
  },
}));

export interface GetProjectsJobsRequest {
  /** Required. The resource name of the job to retrieve. The format is "projects/{project_id}/jobs/{job_id}", for example, "projects/api-test-project/jobs/1234". */
  name: string;
}

export const GetProjectsJobsRequest = Schema.Struct({
  name: Schema.String.pipe(T.HttpPath("name")),
}).pipe(
  T.Http({
    method: "GET",
    path: "v3p1beta1/projects/{projectsId}/jobs/{jobsId}",
  }),
  svc,
) as unknown as Schema.Schema<GetProjectsJobsRequest>;

export type GetProjectsJobsResponse = Job;
export const GetProjectsJobsResponse = Job;

export type GetProjectsJobsError = DefaultErrors;

/** Retrieves the specified job, whose status is OPEN or recently EXPIRED within the last 90 days. */
export const getProjectsJobs: API.OperationMethod<
  GetProjectsJobsRequest,
  GetProjectsJobsResponse,
  GetProjectsJobsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: GetProjectsJobsRequest,
  output: GetProjectsJobsResponse,
  errors: [],
}));

export interface BatchDeleteProjectsJobsRequest {
  /** Required. The resource name of the project under which the job is created. The format is "projects/{project_id}", for example, "projects/api-test-project". */
  parent: string;
  /** Request body */
  body?: BatchDeleteJobsRequest;
}

export const BatchDeleteProjectsJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(BatchDeleteJobsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v3p1beta1/projects/{projectsId}/jobs:batchDelete",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<BatchDeleteProjectsJobsRequest>;

export type BatchDeleteProjectsJobsResponse = Empty;
export const BatchDeleteProjectsJobsResponse = Empty;

export type BatchDeleteProjectsJobsError = DefaultErrors;

/** Deletes a list of Jobs by filter. */
export const batchDeleteProjectsJobs: API.OperationMethod<
  BatchDeleteProjectsJobsRequest,
  BatchDeleteProjectsJobsResponse,
  BatchDeleteProjectsJobsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: BatchDeleteProjectsJobsRequest,
  output: BatchDeleteProjectsJobsResponse,
  errors: [],
}));

export interface SearchProjectsJobsRequest {
  /** Required. The resource name of the project to search within. The format is "projects/{project_id}", for example, "projects/api-test-project". */
  parent: string;
  /** Request body */
  body?: SearchJobsRequest;
}

export const SearchProjectsJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(SearchJobsRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v3p1beta1/projects/{projectsId}/jobs:search",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<SearchProjectsJobsRequest>;

export type SearchProjectsJobsResponse = SearchJobsResponse;
export const SearchProjectsJobsResponse = SearchJobsResponse;

export type SearchProjectsJobsError = DefaultErrors;

/** Searches for jobs using the provided SearchJobsRequest. This call constrains the visibility of jobs present in the database, and only returns jobs that the caller has permission to search against. */
export const searchProjectsJobs: API.OperationMethod<
  SearchProjectsJobsRequest,
  SearchProjectsJobsResponse,
  SearchProjectsJobsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: SearchProjectsJobsRequest,
  output: SearchProjectsJobsResponse,
  errors: [],
}));

export interface CreateProjectsJobsRequest {
  /** Required. The resource name of the project under which the job is created. The format is "projects/{project_id}", for example, "projects/api-test-project". */
  parent: string;
  /** Request body */
  body?: CreateJobRequest;
}

export const CreateProjectsJobsRequest = Schema.Struct({
  parent: Schema.String.pipe(T.HttpPath("parent")),
  body: Schema.optional(CreateJobRequest).pipe(T.HttpBody()),
}).pipe(
  T.Http({
    method: "POST",
    path: "v3p1beta1/projects/{projectsId}/jobs",
    hasBody: true,
  }),
  svc,
) as unknown as Schema.Schema<CreateProjectsJobsRequest>;

export type CreateProjectsJobsResponse = Job;
export const CreateProjectsJobsResponse = Job;

export type CreateProjectsJobsError = DefaultErrors;

/** Creates a new job. Typically, the job becomes searchable within 10 seconds, but it may take up to 5 minutes. */
export const createProjectsJobs: API.OperationMethod<
  CreateProjectsJobsRequest,
  CreateProjectsJobsResponse,
  CreateProjectsJobsError,
  Credentials | HttpClient.HttpClient
> = API.make(() => ({
  input: CreateProjectsJobsRequest,
  output: CreateProjectsJobsResponse,
  errors: [],
}));
